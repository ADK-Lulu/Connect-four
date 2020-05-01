// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let currentPlayer;
  let playInProgress;
  let game;
  let board;

  this.When(/^the argument is "([^"]*)"$/, function (elefant) {
    currentPlayer = elefant;
  });

  this.When(/^the argument is (\d+)$/, function (integerThree) {
    currentPlayer = +integerThree;
  });

  this.When(/^the argument is (\d+.\d+)$/, function (decimal) {
    currentPlayer = +decimal;
  });

  this.Then(/^the machine will throw "([^"]*)"$/, function (messagetoThrow) {
    game = new Game()
    expect(() => game.tellTurn(currentPlayer)).to.throw(messagetoThrow,
      'The expected message is not shown'
    )
  });

  this.When(/^player (\d+) has droped a disc$/, function (playerNumber) {
    game = new Game();
    expect(() => game.tellTurn(+playerNumber)).to.not.throw();
  });

  this.Then(/^the machine should display "([^"]*)"$/, function (message) {
    expect($('.message').innerHTML).to.equal(message,
      'Wrong info about taking turns'
    )
  });

  this.When(/^the players input their names$/, function () {
    game = new Game();
    let names = ['Anna', 'Jonas'];
    global.prompt = () => names.shift();
    game.start();

  });
}