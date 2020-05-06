// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let game = new Game();
  let board = new Board(game);
  let won;


  //===Error message when won has wrong argument===
  //TODO se till att den parsar även 1.5 till nr och tar true som boolean
  this.Given(/^that the argument won has the value "([^"]*)"$/, function (incomingString) {

    incomingString === "true" ? won = true
      : incomingString === "" ? won = ""
        : isNaN(incomingString) ? won = incomingString
          : won = +incomingString;

  });

  this.Then(/^the error "([^"]*)" will be thrown$/, function (errorMessage) {
    expect(() => game.over(won)).to.throw(errorMessage);
  });

  //===Correct message shown, draw===
  this.Given(/^that the argument won is draw$/, function () {
    won = "draw";

    game.over(won)

  });

  this.Then(/^the message "([^"]*)" is shown$/, function (wonMessage) {
    // $('.message').innerHTML = "Det blev oavgjort!";
    expect($('.message').innerHTML).to.include(wonMessage);
  });

  //===Correct message shown, depending on winner===

  this.Given(/^that you have an array with two names "([^"]*)" and "([^"]*)"$/, function (playerOne, playerTwo) {
    game.names = []
    game.names.push(playerOne);
    game.names.push(playerTwo)

  });


  this.Given(/^the argument (\d+) is provided$/, function (nrOneorTwo) {
    board.game.over(+nrOneorTwo);
  });

  this.Then(/^the winning players name shall be seen in a "([^"]*)" on the screen$/, function (winningMessage) {

    expect($('.message').innerHTML).to.include(winningMessage);

  });

  //===Play again button===
  this.Given(/^that there is a button in the message element with the class again$/, function () {
    let againButton = $$('.message > button > .again');
    expect(againButton).to.exist;
  });

}