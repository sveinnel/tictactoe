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
	  	
    }

  	//console.log("Event", event)
  	console.log("lastMove: ", lastMove);
  	console.log("moveCount ", moveCount);
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
    	console.log("cmd in okToMove" , cmd);

    	return  cmd.move.side !== lastMove;
    }
  };
};