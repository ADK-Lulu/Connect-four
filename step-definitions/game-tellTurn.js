// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  let currentPlayer;
  let game;
  

  this.When(/^the argument is "([^"]*)"$/, function (incomingWrongValue) {

    currentPlayer = isNaN(+incomingWrongValue) ? incomingWrongValue : +incomingWrongValue;
  });

  this.Then(/^the method tellTurn will throw "([^"]*)"$/, function (messagetoThrow) {
    game = new Game();
    expect(() => game.tellTurn(currentPlayer)).to.throw(messagetoThrow,
      'The expected message is not shown'
    )
  });
  this.Given(/^that the players has not entered their names$/, function () {
   //alredy tested in start()
  });
 
  this.When(/^player(\d+) has droped a disc$/, function (playerNumber) {
    game = new Game();
    expect(() => game.tellTurn(+playerNumber)).to.not.throw();
  });

  
  this.Then(/^the game should display "([^"]*)"$/, async function (message) {
    game = new Game();
    //yellows turn to make a move after a new game is started and a move is made
    if (message.includes('Guls')) {
      await game.board.makeMove(3);
    }
  
    expect($('.message').innerHTML).to.equal(message,
      'Wrong info about taking turns'
    )
  });


}