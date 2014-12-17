var memoryStore = require('./memorystore');
var should = require('should');
//var q = require('q');

describe('In memory event store', function() {
    it('Should return empty array for unknown id', function() {

        var store = memoryStore();

        store.loadEvents('id-that-dows-not-exist').then(function(err, loadedEvents){
            
            should(loadedEvents.length).be.exactly(0);
            should(loadedEvents).be.instanceof(Array);
        });
            

    });

    it('Should return events previously stored', function() {

        var store = memoryStore();
        var events = [{
            id: '1'
        }]
        store.storeEvents('test-id-1', events);

        store.loadEvents('test-id-1').then(function(err, loadedEvents){
            should(loadedEvents.length).be.exactly(1);
            should(loadedEvents).be.instanceof(Array);
            should(loadedEvents).eql(events);
        });


    });

    it('Should append events to previous events in eventstore', function() {

        var store = memoryStore();
        var event1 = [{
            id: '1'
        }];
        var event2 = [{
            id: '2'
        }];

        store.storeEvents('test-id-1', event1);
        store.storeEvents('test-id-1', event2);

        store.loadEvents('test-id-1').then(function(err, loadedEvents){
            should(loadedEvents.length).be.exactly(2);
            should(loadedEvents).be.instanceof(Array);
            should(loadedEvents).eql(event1.concat(event2));
        });

    });
});