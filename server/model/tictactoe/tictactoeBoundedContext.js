var _ = require('lodash');

module.exports = function(eventStore, commandHandler){
	return {
		handleCommand: function(cmd){
			var history = eventStore.loadEvents(cmd.id);
			var events = commandHandler(history).executeCommand(cmd);
			eventStore.storeEvents(cmd.id, events);
			return events;
		}
	}
}