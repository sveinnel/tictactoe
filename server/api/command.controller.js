'use strict';

module.exports = function(req, res) {


    var boundedContext = require('../model/tictactoe/tictactoeBoundedContext');
    var tictactoeHandler = require('../model/tictactoe/aggregate/tictactoe');
    var app = require('../app');
    return {
        createGame: function(req, res) {
            var uuid = require('uuid');
            try {
                if (!app.eventStore) {
                    app.eventStore = require('../eventstore/memorystore')();
                }
                req.body.id = uuid.v1();
                req.body.timeStamp = new Date;
                var context = boundedContext(app.eventStore, tictactoeHandler);
                var newEventHistory = context.handleCommand(req.body);
                res.json(newEventHistory);
            } catch (e) {
                res.json(e);
            }
        },
        joinGame: function(req, res) {
            try {
                if (!app.eventStore) {
                    app.eventStore = require('../eventstore/memorystore')();
                }
                req.body.timeStamp = new Date;
                var context = boundedContext(app.eventStore, tictactoeHandler);
                var newEventHistory = context.handleCommand(req.body);
                res.json(newEventHistory);
            } catch (e) {
                res.json(e);
            }
        },
        placeMove: function(req, res) {
            try {
                if (!app.eventStore) {
                    app.eventStore = require('../eventstore/memorystore')();
                }
                req.body.timeStamp = new Date;
                var context = boundedContext(app.eventStore, tictactoeHandler);
                var newEventHistory = context.handleCommand(req.body);
                res.json(newEventHistory);
            } catch (e) {
                res.json(e);
            }
        }
    };
};