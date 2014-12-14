'use strict';

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
                var newEventHistory = context.handleCommand(req.body);
                res.json(newEventHistory);
            } catch (e) {
                res.json(e);
            }
        },
        joinGame: function(req, res) {
            try {
                req.body.timeStamp = new Date();
                var context = boundedContext(app.eventStore, tictactoeHandler);
                var newEventHistory = context.handleCommand(req.body);
                res.json(newEventHistory);
            } catch (e) {
                res.json(e);
            }
        },
        placeMove: function(req, res) {
            try {
                req.body.timeStamp = new Date();
                var context = boundedContext(app.eventStore, tictactoeHandler);
                var newEventHistory = context.handleCommand(req.body);
                res.json(newEventHistory);
            } catch (e) {
                res.json(e);
            }
        }
    };
};