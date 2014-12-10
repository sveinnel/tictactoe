'use strict';

var express = require('express');
var controller = require('../command.controller')();

module.exports = function(app){

  var router = express.Router();

  router.post('/', controller.createGame);

  return {
    router:router 
  };
}