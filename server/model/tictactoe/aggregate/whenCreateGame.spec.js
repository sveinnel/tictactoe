var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe')

describe('CreateGame command', function() {
  it('should emit GameCreated event', function(){

    var given = [];
    var when = {
      cmd: "CreateGame",
      user: {
        userName: "TestUser1"
      },
      name: "TestGame1",
      timeStamp: "2014-12-04T15:15:15"
    };
    var then = [{
        event: "GameCreated",
        user: {
          userName: "TestUser1"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15"
      }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  })
});
