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
				}
			}
			return commandHandlers[cmd.cmd](cmd);
		}
	}
}