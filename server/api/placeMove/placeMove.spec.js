'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/placeMove', function() {
    it('should respond with event as JSON array', function(done) {

        var PlaceMoveCommand = {
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



        request(app)
            .post('/api/placeMove/')
            .type('json')
            .send(PlaceMoveCommand)
            .end(function(err, res) {
                console.log("RESPOND: ", res.body);
                if (err) {
                    return done(err);
                }
                res.body.should.be.instanceof(Array);
                done();
            });

    });
});