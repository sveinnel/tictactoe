var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe')

describe('create game command', function() {
  it('should emit game created event', function(){

    var given = [
      {
        event: "GameCreated",
        user: {
          userName: "TestUser"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15"
      }
    ];
    var when =
    {
      cmd: "JoinGame",
      user: {
        userName: "TestUser2"
      },
      name: "TestGame1",
      timeStamp: "2014-12-04T15:15:15"
    };
    var then = [
      {
        event: "GameJoined",
        user: {
          userName: "TestUser2"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15"
      }
    ];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  })
});