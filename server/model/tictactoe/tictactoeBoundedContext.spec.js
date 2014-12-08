var should = require('should');

describe('tictactoe game context using stubs.', function() {
    it('should route command to instantiated tictactoe game with event stream from store and return and store generated events.', function() {

        var calledWithEventStoreId;
        var storedEvents;

        var eventStoreStub = {
            loadEvents: function(aggregateId) {
                calledWithEventStoreId = aggregateId;
                return [];
            },
            storeEvents: function(aggregateId, events) {
                storedEvents = events;
            }
        };

        var executedCommand = {};

        var tictactoe = function(history) {
            return {
                executeCommand: function(cmd) {
                    executedCommand = cmd;
                    return [];
                }
            }
        };

        var boundedContext = require('./tictactoeBoundedContext')(eventStoreStub, tictactoe);

        var emptyCommand = {
            id: "123"
        };

        var events = boundedContext.handleCommand(emptyCommand);

        should(executedCommand.id).be.exactly("123");
        should(calledWithEventStoreId).be.exactly("123");
        should(events.length).be.exactly(0);
        should(storedEvents).be.exactly(events);
    });
});