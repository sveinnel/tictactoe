module.exports = function(history){
	var gameState = history;

	return {
		executeCommand: function(cmd){
			var commandHandlers = {
				"CreateGame": function(cmd){
					return {
						event: "GameCreated",
						user: cmd.user,
						name: cmd.name,
						timeStamp: cmd.timeStamp
					};
				},
				"JoinGame": function(cmd){
					return {
					    event: "GameJoined",
					    user: cmd.user,
					    name: cmd.name,
					    timeStamp: cmd.timeStamp
					};
				},
				"PlaceMove": function(cmd){
					return {
						event: "MovePlaced",
				        user: cmd.user,
				        name: cmd.name,
				        timeStamp: cmd.timeStamp,
				        move: cmd.move
					};
				}
			};
			history.push(commandHandlers[cmd.cmd](cmd));
			return history;
		}
	}
}