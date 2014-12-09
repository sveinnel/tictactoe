'use strict';

var _ = require('lodash');

var boundedContext = require('../model/tictactoe/tictactoeBoundedContext');
var tictactoeHandler = require('../model/tictactoe/aggregate/tictactoe');
var app = require('../app');

exports.executeCommand = function(req, res) {


  res.json([]);
};