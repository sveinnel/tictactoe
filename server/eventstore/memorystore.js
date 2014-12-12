module.exports = function() {
    var store = {};
    console.log("store", store);
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
        loadAllEvents: function(){
            return store;
        }
    }
}