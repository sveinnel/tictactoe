'use strict';

var express = require('express');

module.exports = function(app){
var controller = require('../command.controller')(app);

  var router = express.Router();

  router.post('/', controller.joinGame);

  return {
    router:router 
  }

}