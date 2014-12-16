'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GameSchema = new Schema({
  id: String,
  events: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Game', GameSchema);
