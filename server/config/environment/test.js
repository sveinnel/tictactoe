'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://tictactoe:tictactoe@ds063870.mongolab.com:63870/tictactoe-test'
  },
  seedDB: true,
  eventstore:'/eventstore/mongostore/mongostore'
};