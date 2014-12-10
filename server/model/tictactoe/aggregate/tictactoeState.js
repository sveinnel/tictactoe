var _ = require('lodash');

module.exports = function(history) {
    var gridSize = 3;
    var gameFull = false;
    var gameGrid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    var gameScore = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var moveCount = 0;
    var lastMove = "";
    var won = false;
    var draw = false;
    var created = false;

    function checkIfWon(){
    	//Check for columns and rows
    	for (var i = 0; i < 3; i++) {
    		if(gameGrid[i][0] === gameGrid[i][1] && gameGrid[i][0] === gameGrid[i][2]){
    			if(gameGrid[i][0] !== ''){
    				won = true;
    				break;
    			}
    		}
    		if(gameGrid[0][i] === gameGrid[1][i] && gameGrid[0][i] === gameGrid[2][i]){
    			if(gameGrid[0][i] !== ''){
    				won = true;
    				break;
    			}
    		}
    	}
    	
    	//Check diagonally
    	if(gameGrid[0][0] === gameGrid[1][1] && gameGrid[0][0] === gameGrid[2][2]){
    		if(gameGrid[0][0] !== ''){
				won = true;
			}
    	}
    	if(gameGrid[0][2] === gameGrid[1][1] && gameGrid[0][2] === gameGrid[2][0]){
    		if(gameGrid[0][2] !== ''){
				won = true;
			}
    	}
    }

    function checkForDraw(){
    	if(moveCount >= 9){
    		draw = true;
    	}
    }

    function processEvent(event) {
        if (event.event === "GameCreated") {
            created = true;
        }

        if (event.event === "GameJoined") {
            gameFull = true;
        }

        if (event.event === "MovePlaced") {
            moveCount++;
            lastMove = event.move.side;
            gameGrid[event.move.coordinates[0]][event.move.coordinates[1]] = event.move.side;
            checkIfWon();
            checkForDraw();
        }
    }

    function processEvents(history) {
        _.each(history, processEvent);
    }

    return {
        processEvents: processEvents,
        gameFull: function() {
            return gameFull;
        },
        created: function(){
            return created;
        },
        okToMove: function(cmd) {
            return cmd.move.side !== lastMove &&
                gameGrid[cmd.move.coordinates[0]][cmd.move.coordinates[1]] === '';
        },
        gameWon: function() {
            return won;
        },
        gameDraw: function(){
        	return draw;
        }
    };
};