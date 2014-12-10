'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/joinGame', function() {
    it('should respond with event as JSON array', function(done) {

        var createCommand = {
            cmd: "CreateGame",
            user: {
                userName: "TestUser1"
            },
            name: "TestGame1",
            timeStamp: "2014-12-04T15:15:15"
        };

        request(app)
            .post('/api/createGame')
            .type('json')
            .send(createCommand)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                
                var responceId = res.body[0].id;
                
                var joinGameCommand = {
                    id: responceId,
                    cmd: "JoinGame",
                    user: {
                        userName: "TestUser2"
                    },
                    name: "TestGameForJoin",
                    timeStamp: "2014-12-04T15:15:16"
                };

                var responceEvent = [{
                    event: "GameJoined",
                    user: {
                        userName: "TestUser2"
                    },
                    name: "TestGameForJoin",
                    timeStamp: "2014-12-04T15:15:16"
                }];

                request(app)
                    .post('/api/joinGame/')
                    .type('json')
                    .send(joinGameCommand)
                    .end(function(err, res) {
                        if (err) {
                            return done(err);
                        }
                        res.body.should.be.instanceof(Array);
                        res.body.should.eql(responceEvent);
                        done();
                    });
            });
    });
});