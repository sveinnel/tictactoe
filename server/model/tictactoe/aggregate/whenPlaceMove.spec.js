var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe')

describe('Player one first PlaceMove command', function() {
    it('should emit PlaceMove event', function() {

        var given = [{
            event: "GameCreated",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15"
        }, {
            event: "GameJoined",
            user: {
                userName: "TestUser2"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15"
        }];

        var when = {
            cmd: "PlaceMove",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 0],
                side: 'X'
            }
        };

        var then = [{
            event: "MovePlaced",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 0],
                side: 'X'
            }
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents.length).be.exactly(1);
        should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
    });
});

describe('Player two PlaceMove command', function() {
    it('should emit PlaceMove event', function() {

        var given = [{
            event: "MovePlaced",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 0],
                side: 'X'
            }
        }];

        var when = {
            cmd: "PlaceMove",
            user: {
                userName: "TestUser2"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 1],
                side: 'O'
            }
        };

        var then = [{
            event: "MovePlaced",
            user: {
                userName: "TestUser2"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 1],
                side: 'O'
            }
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents.length).be.exactly(1);
        should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
    });
});


describe('Player one PlaceMove command when Player two move', function() {
    it('should emit IllegalMove', function() {

        var given = [{
            event: "MovePlaced",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 0],
                side: 'X'
            }
        }];

        var when = {
            cmd: "PlaceMove",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 1],
                side: 'X'
            }
        };

        var then = [{
            event: "IllegalMove",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 1],
                side: 'X'
            }
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents.length).be.exactly(1);
        should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
    });
});

describe('Player two PlaceMove where Player one has allready placed move', function() {
    it('should emit IllegalMove', function() {

        var given = [{
            event: "MovePlaced",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 0],
                side: 'X'
            }
        }];

        var when = {
            cmd: "PlaceMove",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 0],
                side: 'O'
            }
        };

        var then = [{
            event: "IllegalMove",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 0],
                side: 'O'
            }
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents.length).be.exactly(1);
        should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
    });
});

describe('Player one won', function() {
    it('should emit player one won', function() {

        var given = [{
            event: "GameCreated",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15"
        }, {
            event: "GameJoined",
            user: {
                userName: "TestUser2"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15"
        }, {
            event: "MovePlaced",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 0],
                side: 'X'
            }
        }, {
            event: "MovePlaced",
            user: {
                userName: "TestUser2"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [1, 0],
                side: 'O'
            }
        }, {
            event: "MovePlaced",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 1],
                side: 'X'
            }
        }, {
            event: "MovePlaced",
            user: {
                userName: "TestUser2"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [1, 1],
                side: 'O'
            }
        }];

        var when = {
            cmd: "PlaceMove",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:16",
            move: {
                coordinates: [0, 2],
                side: 'X'
            }
        };

        var then = [{
            event: "MovePlaced",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:16",
            move: {
                coordinates: [0, 2],
                side: 'X'
            }
        }, {
            event: "GameWon",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:16"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents.length).be.exactly(2);
        should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
    });
});
describe('Draw', function() {
    it('should emit GamDraw', function() {

        var given = [{
            event: "GameCreated",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15"
        }, {
            event: "GameJoined",
            user: {
                userName: "TestUser2"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15"
        }, {
            event: "MovePlaced",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 0],
                side: 'X'
            }
        }, {
            event: "MovePlaced",
            user: {
                userName: "TestUser2"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [1, 0],
                side: 'O'
            }
        }, {
            event: "MovePlaced",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 1],
                side: 'X'
            }
        }, {
            event: "MovePlaced",
            user: {
                userName: "TestUser2"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [1, 1],
                side: 'O'
            }
        },{
            event: "MovePlaced",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [1, 2],
                side: 'X'
            }
        }, {
            event: "MovePlaced",
            user: {
                userName: "TestUser2"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [0, 2],
                side: 'O'
            }
          }, {
            event: "MovePlaced",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [2, 0],
                side: 'X'
            }
        }, {
            event: "MovePlaced",
            user: {
                userName: "TestUser2"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [2, 1],
                side: 'O'
            }
        }];

        var when = {
            cmd: "PlaceMove",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [2, 2],
                side: 'X'
            }
        };

        var then = [{
            event: "MovePlaced",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15",
            move: {
                coordinates: [2, 2],
                side: 'X'
            }
        }, {
            event: "GameDraw",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents.length).be.exactly(2);
        should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
    });
});