'use strict';

var app = require('../../app');
var should = require('should');
var Game = require('./storeschema');

describe('game store', function() {
  it('should store game history in database', function(done) {

    var Game = require('./storeschema');

    var sampleGame = {
      id:'999',
      events:[{event:"sampleevent"}]
    };

    Game.create(sampleGame, function(err, game) {
      if(err) {
        return handleError(res, err);
      }
      game._id.should.not.be.empty;
      return done();
    });


  });

});


