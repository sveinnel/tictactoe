var q = require('q');
module.exports = function() {
    var store = {};
    return {
        loadEvents: function(id) {
            var deferred = q.defer();
            deferred.resolve(store[id] || []);
            return deferred.promise;
        },
        storeEvents: function(id, events) {
            var deferred = q.defer();
            store[id] = (store[id] || []).concat(events);
            deferred.resolve(store[id]);
            return deferred.promise;
        },
        getAllGames: function() {
            var deferred = q.defer();
            var listOfGames = [];
            for (var evt in store) {
                var joined = false;
                for (var i = 0; i < store[evt].length; i++) {
                    if (store[evt][i].event === 'GameJoined') {
                        joined = true;
                        break;
                    }
                }
                if (!joined) {
                    listOfGames.push({
                        id: evt,
                        name: store[evt][0].name
                    });
                }
            }
            deferred.resolve(listOfGames);
            return deferred.promise;
        }
    };
}