'use strict';
angular.module('tictactoeApp')
    .controller('MainCtrl', function($scope, $http) {
            var socket = io();
            socket.emit('updateGames');
            $scope.gameName = '';
            $scope.showGame = false;
            $scope.listOfGames = [];
            $scope.side = '';
            $scope.cell = [
		        ['', '', ''],
		        ['', '', ''],
		        ['', '', '']
		    ];
            var gameId = '';
            var opponentJoined = false;

		    var resetGameBoard = function(){
		    	 $scope.cell = [
			        ['', '', ''],
			        ['', '', ''],
			        ['', '', '']
			    ];
			    gameId = '';
		    }

            $scope.createGame = function() {
            	resetGameBoard();
            	socket.emit('updateGames');
            	$scope.side = 'X';
                $http.post('/api/createGame', {
                    cmd: 'CreateGame',
                    user: {
                        userName: $scope.userName
                    },
                    name: $scope.gameName
                })
                .success(function(data, status, headers, config) {
                    console.log('CREATE DATA', data);
                    
                    if (data[0].event === 'GameCreated') {
                        socket.emit('updateGames');
                        $scope.showGame = true;
                        gameId = data[0].id;
                        opponentJoined = false;
                    };

                    console.log('listOfGames',$scope.listOfGames);
                })
                .error(function(data, status, headers, config) {

                });
            }

            $scope.joinGame = function(id, gameName) {

	            	if($scope.side !== 'X'){
		                $http.post('/api/joinGame', {
		                	id: id,
		                    cmd: 'JoinGame',
		                    name: gameName,
		                    user: {
		                        userName: $scope.userName
		                    }   
		                })
		                .success(function(data, status, headers, config) {
	            			resetGameBoard();
		                    console.log('joinGame DATA', data);
		            		socket.emit('updateGames'); 
		                    if(data[0].event === 'GameJoined'){
		                    	$scope.side = 'O';
		                    	$scope.showGame = true;
		                    	$scope.gameName = data[0].name;
		                    	gameId = id;
		            			socket.emit('joinOpponent', {id: id}); 
		                    }
		                    if(data[0].event === 'FullGameJoinAttempted'){
		                    	alert("Game allready full!");
		                    }
		                    if(data[0].event === 'NotExistingGameJoinAttempted'){
		                    	alert("Game does not exist!");
		                    }
		                })
		                .error(function(data, status, headers, config) {
		                });
	            	}
            };

            $scope.cellClick = function(coords) {
                if(gameId.length > 0 && opponentJoined){
	                $http.post('/api/placeMove', {
	                        id: gameId,
	                        cmd: 'PlaceMove',
	                        user: {
	                            userName: $scope.userName
	                        },
	                        name: $scope.gameName,
	                        move: {
	                            coordinates: coords,
	                            side: $scope.side
	                        }
	                })
	                .success(function(data, status, headers, config) {
	                    console.log('placeMOve DATA', data);
	                    if(data[0].event === 'MovePlaced'){
	                		$scope.cell[coords[0]][coords[1]] = $scope.side;
	                		socket.emit('placeMove', {
	                									id: gameId,
	                								  	board: $scope.cell
	                								 });
	                    }
						if(data[0].event === 'IllegalMove'){
							var oldCellvalue = $scope.cell[coords[0]][coords[1]];
	                		$scope.cell[coords[0]][coords[1]] = '!';
	                		setTimeout(function() {
	                			$scope.cell[coords[0]][coords[1]] = oldCellvalue;
	                			$scope.$apply();
	                		}, 500);
	                    }
	                    if(data.length === 2){
	                    	if(data[1].event === 'GameWon'){
	                    		socket.emit('wonGame', {
	                    									id: gameId, 
	                    									winner: data[1].user.userName
	                    								});
	                    	}
	                    	if(data[1].event === 'GameDraw'){
	                    		socket.emit('drawGame', {id: gameId});
	                    	}
	                    }                    
	                })
	                .error(function(data, status, headers, config) {

	                });
                	
                }
            };

            socket.on('movePlaced', function(cmd){
            	if(cmd.id === gameId){
            		$scope.cell = cmd.board;
            		$scope.$apply();
            	}
            });

            socket.on('opponentJoined', function(msg){
            	if(msg.id === gameId){
         			opponentJoined = true;
            	}
            });
            

            socket.on('gamesUpdated', function(games){
            	$scope.listOfGames = games;
            	$scope.$apply();
            });
            
            socket.on('gameWon', function(msg){
            	if(msg.id === gameId){
            		alert(msg.winner + ' is the Winner!');
            		resetGameBoard();
            		$scope.showGame = false;
            		$scope.$apply();
            	}
            });

            socket.on('gameDraw', function(msg){
            	if(msg.id === gameId){
            		alert('It\'s a draw!');
            		resetGameBoard();
            		$scope.showGame = false;
            		$scope.$apply();
            	}
            });				
    });