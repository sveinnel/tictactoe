/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
app.appName = "TicTacToe" + new Date();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.eventStore = require('.' + config.eventstore)();//require('./eventstore/memorystore/memorystore')();

require('./config/express')(app);

var mongoose = require('mongoose');


// Connect to database
console.log("Connecting to mongoDb");
mongoose.connect(config.mongo.uri, config.mongo.options,function(err){
  console.log("connect callback", arguments);

});

require('./routes')(app);


// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

var sockets = []
io.on('connection', function (socket) {
	sockets.push(socket);
	socket.on('placeMove', function(cmd){
		for (var i = 0; i < sockets.length; i++) {
			sockets[i].emit('movePlaced', cmd);
		}
	});
	socket.on('updateGames', function(){
		var listOfGames = app.eventStore.getAllGames(); 
		for (var i = 0; i < sockets.length; i++) {
			sockets[i].emit('gamesUpdated', listOfGames);
		}
	});
	socket.on('wonGame', function(msg){
		for (var i = 0; i < sockets.length; i++) {
			sockets[i].emit('gameWon', msg);
		}
	});
	socket.on('drawGame', function(msg){
		for (var i = 0; i < sockets.length; i++) {
			sockets[i].emit('gameDraw', msg);
		}
	});
	socket.on('joinOpponent', function(msg){
		for (var i = 0; i < sockets.length; i++) {
			sockets[i].emit('opponentJoined', msg);
		}
	});
	
});
 
// Expose app
exports = module.exports = app;
//module.exports = app;