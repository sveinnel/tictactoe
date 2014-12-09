var memoryStore = require('./memorystore');
var should = require('should');


describe('In memory event store', function() {
  it('Should return empty array for unknown id', function() {

    var store = memoryStore();

    var loadedEvents = store.loadEvents('id-that-dows-not-exist');
    should(loadedEvents.length).be.exactly(0);
    should(loadedEvents).be.instanceof(Array);

  });

  it('Should return events previously stored', function() {

    var store = memoryStore();
    var events = [{id:'test-id-1'}]
  	store.storeEvents('test-id-1', events);

  	var loadedEvents = store.loadEvents('test-id-1');

    should(loadedEvents.length).be.exactly(1);
    should(loadedEvents).be.instanceof(Array);
    should(loadedEvents).eql(events);

  });
});