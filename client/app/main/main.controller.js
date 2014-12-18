'use strict';
angular.module('tictactoeApp')
    .controller('MainCtrl', function($scope, $http) {
            var socket = io();
            socket.emit('updateGames');
            $scope.gameName = '';
            $scope.showGame = false;
            $scope.showResult = false;
            $scope.listOfGames = [];
            $scope.gameResultMsg = '';
            $scope.side = '';
            $scope.cell = [
		        ['', '', ''],
		        ['', '', ''],
		        ['', '', '']
		    ];
            $scope.gameId = '';
            $scope.opponentJoined = false;

		    var resetGameBoard = function(){
		    	 $scope.cell = [
			        ['', '', ''],
			        ['', '', ''],
			        ['', '', '']
			    ];
			    $scope.gameId = '';
		    };

		    var notifyGameOver = function(msg){
		    	$scope.showGame = false;
		    	$scope.showResult = true;
		    	$scope.gameResultMsg = msg;
		    };

            $scope.createGame = function() {
                $http.post('/api/createGame', {
                    cmd: 'CreateGame',
                    user: {
                        userName: $scope.userName
                    },
                    name: $scope.gameName
                })
                .success(function(data, status, headers, config) {            
                    if (data[0].event === 'GameCreated') {
            			resetGameBoard();
            			$scope.side = 'X';
                        socket.emit('updateGames');
                        $scope.showGame = true;
                        $scope.showResult = false;
                        $scope.gameId = data[0].id;
                        $scope.opponentJoined = false;
                    }
                })
                .error(function(data, status, headers, config) {

                });
            };

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
		            		socket.emit('updateGames'); 
		                    if(data[0].event === 'GameJoined'){
		                    	$scope.side = 'O';
		                    	$scope.showGame = true;
		                    	$scope.showResult = false;
		                    	$scope.gameName = data[0].name;
		                    	$scope.gameId = id;
		            			socket.emit('joinOpponent', {id: id}); 
		                    }
		                    if(data[0].event === 'FullGameJoinAttempted'){
		                    	notifyGameOver('Game allready full!');
		                    }
		                    if(data[0].event === 'NotExistingGameJoinAttempted'){
		                    	notifyGameOver('Game does not exist!');
		                    	
		                    }
		                })
		                .error(function(data, status, headers, config) {
		                });
	            	}
            };

            $scope.cellClick = function(coords) {
                if($scope.gameId.length > 0 && $scope.opponentJoined){
	                $http.post('/api/placeMove', {
	                        id: $scope.gameId,
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
	                    if(data[0].event === 'MovePlaced'){
	                		$scope.cell[coords[0]][coords[1]] = $scope.side;
	                		socket.emit('placeMove', {
	                									id: $scope.gameId,
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
	                    									id: $scope.gameId, 
	                    									winner: data[1].user.userName
	                    								});
	                    	}
	                    	if(data[1].event === 'GameDraw'){
	                    		socket.emit('drawGame', {id: $scope.gameId});
	                    	}
	                    }                    
	                })
	                .error(function(data, status, headers, config) {

	                });
                }
            };

            socket.on('movePlaced', function(cmd){
            	if(cmd.id === $scope.gameId){
            		$scope.cell = cmd.board;
            		$scope.$apply();
            	}
            });

            socket.on('opponentJoined', function(msg){
            	if(msg.id === $scope.gameId){
         			$scope.opponentJoined = true;
            	}
            });
            

            socket.on('gamesUpdated', function(games){
            	console.log("listOfGames",games);
            	$scope.listOfGames = games;
            	$scope.$apply();
            });
            
            socket.on('gameWon', function(msg){
            	if(msg.id === $scope.gameId){
            		notifyGameOver(msg.winner + ' is the Winner!');
            		resetGameBoard();
            		$scope.showGame = false;
            		$scope.$apply();
            	}
            });

            socket.on('gameDraw', function(msg){
            	if(msg.id === $scope.gameId){
            		notifyGameOver('It\'s a draw!');
            		resetGameBoard();
            		$scope.showGame = false;
            		$scope.$apply();
            	}
            });				
    });