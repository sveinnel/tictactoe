var memoryStore = require('./memorystore');
var should = require('should');


describe('In memory event store', function() {
  it('Should return empty array for unknown id', function() {

    var store = memoryStore();

    var loadedEvents = store.loadEvents('id-that-dows-not-exist');
    console.log("loadedEvents", loadedEvents)
    should(loadedEvents.length).be.exactly(0);
    should(loadedEvents).be.instanceof(Array);

  });
});