var _ = require('lodash');

module.exports = function(history){
  var gridSize = 3;
  var gameFull = false;
  var gameGrid = [['','',''],['','',''],['','','']];
  var gameScore = [0,0,0,0,0,0,0,0,0];
  var moveCount=0;

  function processEvent(event) {
    if (event.event === "GameJoined") {
      gameFull = true;
    }
  }
   
  function processEvents(history){
  	_.each(history,processEvent);
  }

  return {
    processEvents : processEvents,
    gameFull : function(){
      return gameFull;
    }
  };
};