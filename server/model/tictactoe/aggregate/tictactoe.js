module.exports = function(history){
	var gameState = history;

	return {
		executeCommand: function(cmd){
			var commandHandlers = {
				"CreateGame": function(cmd){
					return [
						{
							event: "GameCreated",
							user: cmd.user,
							name: cmd.name,
							timeStamp: cmd.timeStamp
						}
					]
				},
				"JoinGame": function(cmd){
					return [
						{
					        event: "GameJoined",
					        user: {
					          userName: "TestUser2"
					        },
					        name: "TestGame1",
					        timeStamp: "2014-12-04T15:15:15"
					    }
					]
				}
			}
			return commandHandlers[cmd.cmd](cmd);
		}
	}
}