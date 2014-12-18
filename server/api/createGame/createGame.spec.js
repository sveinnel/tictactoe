'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/createGame', function() {
  it('should respond with event as JSON array', function(done) {
    this.timeout(5000);
    var command = {
      cmd: "CreateGame",
      user: {
        userName: "TestUser1"
      },
      name: "TestGame1",
    };

    var responceEvent = [{
      event: "GameCreated",
      user: {
        userName: "TestUser1"
      },
      name: "TestGame1",
    }];

    request(app)
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function(err, res) {

        if(err){
          return done(err);
        }
        res.body.should.be.instanceof(Array);

        res.body[0].event.should.be.exactly('GameCreated');
        done();
      });
  });
});


