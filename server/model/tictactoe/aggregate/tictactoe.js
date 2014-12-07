module.exports = function(history) {
    var tictactoeState = require('./tictactoeState');
    var gameState = tictactoeState(history);
    gameState.processEvents(history);

    return {
        executeCommand: function(cmd) {
            var commandHandlers = {
                "CreateGame": function(cmd) {
                    return [{
                        event: "GameCreated",
                        user: cmd.user,
                        name: cmd.name,
                        timeStamp: cmd.timeStamp
                    }];
                },
                "JoinGame": function(cmd) {
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
                },
                "PlaceMove": function(cmd) {
                    if (gameState.okToMove(cmd)) {
                        return [{
                            event: "MovePlaced",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            move: cmd.move
                        }];
                    } else {
                        return [{
                            event: "IllegalMove",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            move: cmd.move
                        }];
                    }
                }
            };
            return commandHandlers[cmd.cmd](cmd);
        }
    }
}