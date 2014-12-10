'use strict';

module.exports = function(req, res) {


    var boundedContext = require('../model/tictactoe/tictactoeBoundedContext');
    var tictactoeHandler = require('../model/tictactoe/aggregate/tictactoe');
    var app = require('../app');
    var uuid = require('uuid');
    return {
        createGame: function(req, res) {
            try {
                if (!app.eventStore) {
                    app.eventStore = require('../eventstore/memorystore')();
                }
                req.body.id = uuid.v1();
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
                var context = boundedContext(app.eventStore, tictactoeHandler);
                var newEventHistory = context.handleCommand(req.body);
                res.json(newEventHistory);
            } catch (e) {
                res.json(e);
            }
        }
    };
};