'use strict';
var q = require('q');
module.exports = function(app) {
    var boundedContext = require('../model/tictactoe/tictactoeBoundedContext');
    var tictactoeHandler = require('../model/tictactoe/aggregate/tictactoe');

    return {
        createGame: function(req, res) {
            var uuid = require('uuid');
            try {
                req.body.id = uuid.v1();
                req.body.timeStamp = new Date();
                var context = boundedContext(app.eventStore, tictactoeHandler);
                context.handleCommand(req.body).then(function (result) {
                    res.json(result);
                }, function (err) {
                    res.json(err);
                });
            } catch (e) {
                res.json(e);
            }
        },
        joinGame: function(req, res) {
            try {
                req.body.timeStamp = new Date();
                var context = boundedContext(app.eventStore, tictactoeHandler);
                context.handleCommand(req.body).then(function (result) {
                    res.json(result);
                }, function (err) {
                    res.json(err);
                });
            } catch (e) {
                res.json(e);
            }
        },
        placeMove: function(req, res) {
            try {
                req.body.timeStamp = new Date();
                var context = boundedContext(app.eventStore, tictactoeHandler);
                context.handleCommand(req.body).then(function (result) {
                    res.json(result);
                }, function (err) {
                    res.json(err);
                });
            } catch (e) {
                res.json(e);
            }
        }
    };
};