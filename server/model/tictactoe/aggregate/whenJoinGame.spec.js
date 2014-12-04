var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe')

describe('JoinGame command', function() {
  it('should emit GameJoined event', function(){

    var given = [
      {
        event: "GameCreated",
        user: {
          userName: "TestUser1"
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
        event: "GameCreated",
        user: {
          userName: "TestUser1"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15"
      },
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
    should(actualEvents.length).be.exactly(2);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  })
});