var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe')

describe('Player one first PlaceMove command', function() {
  it('should emit PlaceMove event', function(){

    var given = [
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
    
    var when = {
        cmd: "PlaceMove",
        user: {
          userName: "TestUser1"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15",
        move: {
          coordinates: [0,0],
          side: 'X'
        }
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
      },
      {
        event: "MovePlaced",
        user: {
          userName: "TestUser1"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15",
        move: {
          coordinates: [0,0],
          side: 'X'
        }
      }
    ];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(3);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
});

describe('Player two PlaceMove command', function() {
  it('should emit PlaceMove event', function(){

    var given = [
      {
        event: "MovePlaced",
        user: {
          userName: "TestUser1"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15",
        move: {
          coordinates: [0,0],
          side: 'X'
        }
      }
    ];
    
    var when = {
        cmd: "PlaceMove",
        user: {
          userName: "TestUser2"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15",
        move: {
          coordinates: [0,1],
          side: 'O'
        }
      };
    
    var then = [
      {
        event: "MovePlaced",
        user: {
          userName: "TestUser1"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15",
        move: {
          coordinates: [0,0],
          side: 'X'
        }
      },
      {
        event: "MovePlaced",
        user: {
          userName: "TestUser2"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15",
        move: {
          coordinates: [0,1],
          side: 'O'
        }
      }
    ];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(2);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
});


describe('Player one PlaceMove command when Player two move', function() {
  it('should emit not be able to play', function(){

    var given = [
      {
        event: "MovePlaced",
        user: {
          userName: "TestUser1"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15",
        move: {
          coordinates: [0,0],
          side: 'X'
        }
      }
    ];
    
    var when = {
        cmd: "PlaceMove",
        user: {
          userName: "TestUser1"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15",
        move: {
          coordinates: [0,1],
          side: 'X'
        }
      };
    
    var then = [
      {
        event: "MovePlaced",
        user: {
          userName: "TestUser1"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15",
        move: {
          coordinates: [0,0],
          side: 'X'
        }
      },
      {
        event: "IllegalMove",
        user: {
          userName: "TestUser1"
        },
        name: "TestGame1",
        timeStamp: "2014-12-04T15:15:15",
        move: {
          coordinates: [0,1],
          side: 'X'
        }
      }
    ];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(2);
    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });
});


 