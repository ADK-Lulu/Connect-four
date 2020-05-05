// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let game = new Game();
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

  });

  this.Then(/^the message "([^"]*)" is shown$/, function (wonMessage) {
    $('.message').innerHTML = "Det blev oavgjort!";
    expect($('.message').innerHTML).to.equal(wonMessage);
  });

  //===Correct message shown, player1 won===
  this.Given(/^that the argument (\d+) is provided$/, function (player) {

    player === 1 ? game.player1 = player : game.player2 = player;

  });

  //===Correct message shown, depending on winner===
  this.Then(/^the winning players name "([^"]*)" shall be seen in a "([^"]*)" on the screen$/, function (valueOnPlayer, message) {

    game.player1 === 1 ? game.player1 = valueOnPlayer : game.player2 = valueOnPlayer;
    $('.message').innerHTML = message;
    expect($('.message').innerHTML).to.equal(message);
  });

  //===Play again button===
  this.Given(/^that there is a button in the message element with the class again$/, function () {
    let againButton = $$('.message > button > .again');
    expect(againButton).to.exist;
  });

}