var _ = require('lodash');
var q = require('q');
module.exports = function(eventStore, commandHandler) {
    return {
        handleCommand: function(cmd) {
            var defer = q.defer();
            eventStore.loadEvents(cmd.id).then(function(eventStream) {
                var events = commandHandler(eventStream).executeCommand(cmd);

                eventStore.storeEvents(cmd.id, events).then(function() {
                    defer.resolve(events);
                }, function(err) {
                    defer.reject(err);
                });
            });
            return defer.promise;
        }
    }
}