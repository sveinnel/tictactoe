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
            store[id] = (store[id] || []).concat(events);
        }
    }
}