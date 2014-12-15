module.exports = function() {
    var store = {};
    return {
        loadEvents: function(id) {
            if (id in store) {
                return store[id]       
            }
            else{
                return [];
            }
        },
        storeEvents: function(id, events) {
            if(id in store){
                store[id] = store[id].concat(events);
            }
            else{
                store[id] = events;
            }
        },
        getAllGames: function(){
            var listOfGames = [];
            for (var evt in store) {
                var joined = false;
                for (var i = 0; i < store[evt].length; i++) {
                    if(store[evt][i].event === 'GameJoined'){
                        joined = true;
                        break;
                    }
                }
                if(!joined){
                    listOfGames.push({
                                        id: evt,
                                        name: store[evt][0].name
                                    });
                }
            }
            return listOfGames;
        }
    };
}