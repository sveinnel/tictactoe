'use strict';
angular.module('tictactoeApp')
    .controller('MainCtrl', function($scope, $http) {
            $scope.gameName = "";
            $scope.showGame = false;
            $scope.listOfGames = [];
            $scope.side = "";
            $scope.cell = [
		        ['', '', ''],
		        ['', '', ''],
		        ['', '', '']
		    ];
            var gameId = "";
            $scope.createGame = function() {
            	$scope.side = "X";
                $http.post('/api/createGame', {
                    cmd: "CreateGame",
                    user: {
                        userName: $scope.userName
                    },
                    name: $scope.gameName
                })
                .success(function(data, status, headers, config) {
                    console.log("CREATE DATA", data);
                    
                    if (data[0].event === "GameCreated") {
                        $scope.listOfGames.push({
                            name: data[0].name,
                            id: data[0].id
                        });
                        $scope.showGame = true;
                        gameId = data[0].id;
                    };

                    console.log("listOfGames",$scope.listOfGames);
                })
                .error(function(data, status, headers, config) {

                });
            }

            $scope.joinGame = function(id, gameName) {                
                $http.post('/api/joinGame', {
                	id: gameId,
                    cmd: "JoinGame",
                    name: gameName,
                    user: {
                        userName: $scope.userName
                    }   
                })
                .success(function(data, status, headers, config) {
                    
                    console.log("joinGame DATA", data);
                    if(data[0].event === "GameJoined"){
                    	$scope.side = "O";
                    	$scope.showGame = true;
                    	$scope.gameName = data[0].name;
                    }
                })
                .error(function(data, status, headers, config) {
                });

            };

            $scope.cellClick = function(coords) {
                console.log(coords);

                $http.post('/api/placeMove', {
                        id: gameId,
                        cmd: "PlaceMove",
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
                    console.log("placeMOve DATA", data);
                    if(data[0].event === "MovePlaced"){
                		$scope.cell[coords[0]][coords[1]] = $scope.side;
                    }
					if(data[0].event === "IllegalMove"){
						var oldCellvalue = $scope.cell[coords[0]][coords[1]];
                		$scope.cell[coords[0]][coords[1]] = "!";
                		setTimeout(function() {
                			$scope.cell[coords[0]][coords[1]] = oldCellvalue;
                			$scope.$apply();
                		}, 500);
                    }
                    if(data.length === 2){
                    	if(data[1].event === "GameWon"){
                    		$scope.gameName = data[1].user.userName + "is the Winner!" 
                    	}
                    	if(data[1].event === "GameDraw"){
                    		$scope.gameName = "It\'s a draw!" 
                    	}
                    }                    
                })
                .error(function(data, status, headers, config) {

                });

            };
    });