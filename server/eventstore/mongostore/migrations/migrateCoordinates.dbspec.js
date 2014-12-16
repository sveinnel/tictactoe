'use strict';

var app = require('../../../app');
var should = require('should');
var Game = require('./../storeschema');
var _ = require('lodash');

var nodescribe = function(){

};
nodescribe('coordinates migration', function () {

  beforeEach(function () {
    Game.remove().exec();
  });

  var sampleGame = {
    id: '999',
    events: [{
      "id": "312cefae-20a3-d597-d850-61dd9c0dd736",
      "event": "MovePlaced",
      "user": {"userName": "Tom", "side": "O"},
      "name": null,
      "timeStamp": "2014-12-02T11:29:29",
      "move": {
        "coordinates": [1, 1],
        "side": "O"
      }
    }]
  };

  beforeEach(function (done) {

    Game.create(sampleGame, function (err, game) {
      if (err) {
        return handleError(res, err);
      }
      return done();
    });

  });

  it('should migrate up', function (done) {

    var migrateCoordinatesToXY = require('./migrateCoordinatesToXY').up;

    migrateCoordinatesToXY(function (err, games) {
      _.each(games, function (game) {

        game.events[0].move.should.have.property('xy');
      })
      done();
    });
  });
});
