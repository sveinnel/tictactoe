var _ = require('lodash');

module.exports = function(history){
  var gridSize = 3;
  var gameFull = false;
  var gameGrid = [['','',''],['','',''],['','','']];
  var gameScore = [0,0,0,0,0,0,0,0,0];
  var moveCount = 0;
  var lastMove = ""

  function processEvent(event) {
    if (event.event === "GameJoined") {
      gameFull = true;
    }
    
	if (event.event === "MovePlaced") {  	
	  	moveCount ++;
	  	lastMove = event.move.side;
	  	gameGrid[event.move.coordinates[0]][event.move.coordinates[1]] = event.move.side;
    }
  }
   
  function processEvents(history){
  	_.each(history,processEvent);
  }

  return {
    processEvents : processEvents,
    gameFull : function(){
    	return gameFull;
    },
    okToMove: function(cmd){
    	return  cmd.move.side !== lastMove &&
    			gameGrid[cmd.move.coordinates[0]][cmd.move.coordinates[1]] === '';
    }
  };
};