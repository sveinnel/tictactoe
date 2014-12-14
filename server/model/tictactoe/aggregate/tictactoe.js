module.exports = function(history) {
    var tictactoeState = require('./tictactoeState');
    var gameState = tictactoeState(history);   
    gameState.processEvents(history);
    return {
        executeCommand: function(cmd) {
            var commandHandlers = {
                "CreateGame": function(cmd) {
                    return [{
                    	id: cmd.id,
                        event: "GameCreated",
                        user: cmd.user,
                        name: cmd.name,
                        timeStamp: cmd.timeStamp
                    }];
                },
                "JoinGame": function(cmd) {
                	if(gameState.created()){
	                    if (!gameState.gameFull()) {
	                        return [{
	                            event: "GameJoined",
	                            user: cmd.user,
	                            name: cmd.name,
	                            timeStamp: cmd.timeStamp
	                        }];
	                    } else {
	                        return [{
	                            event: "FullGameJoinAttempted",
	                            user: cmd.user,
	                            name: cmd.name,
	                            timeStamp: cmd.timeStamp
	                        }];
	                    }
                	}
                	else{
                		return [{cmd:cmd,
	                            event: "NotExistingGameJoinAttempted",
	                            user: cmd.user,
	                            name: cmd.name,
	                            timeStamp: cmd.timeStamp
	                        }];
                	}
                },
                "PlaceMove": function(cmd) {
                    var events = []
                    if (gameState.okToMove(cmd)) {
                        events.push({
                            event: "MovePlaced",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            move: cmd.move
                        });
                    } else {
                        events.push({
                            event: "IllegalMove",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            move: cmd.move
                        });
                    }

                    gameState.processEvents(events);
                    if (gameState.gameWon()) {
                        events.push({
                            event: "GameWon",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        });
                    }
                    else if (gameState.gameDraw()) {
                        events.push({
                            event: "GameDraw",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        });
                    }
                    return events;
                }
            };
            return commandHandlers[cmd.cmd](cmd);
        }
    };
}