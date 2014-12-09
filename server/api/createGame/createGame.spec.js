'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/createGame', function() {
  it('should respond with event as JSON array', function(done) {
    var command = {
      id: "test-id",
      cmd: "CreateGame",
      user: {
        userName: "TestUser1"
      },
      name: "TestGame1",
      timeStamp: "2014-12-04T15:15:15"
    };

    request(app)
      .post('/api/creategame')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
