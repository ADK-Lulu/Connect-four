// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let game;
  let currentPlayer;

  this.Given(/^that a new Game is created$/, function () {
    game = new Game();
  });

  this.Given(/^a new Board is created$/, function () {
    // Empty the contents of .board
    $('.board').innerHTML = '';
    // create a Game, it will create a Board
    new Game();
  });

  this.Then(/^it should create a new Board$/, function () {
    expect(game.board).to.be.an.instanceof(Board,
      'game.board is not an instance of Board'
    );

  });

  this.Then(/^it should render (\d+) divs as children of the board element$/, function (expectedNumberOfDivs) {
    let divsCreated = $$('.board > div').length;
    expect(divsCreated).to.equal(+expectedNumberOfDivs,
      expectedNumberOfDivs + ' divs were not created as children of the .board element'
    );
  });

  this.When(/^the argument is "([^"]*)"$/, function (elefant) {
    currentPlayer = elefant;
  });

  this.When(/^the argument is (\d+)$/, function (integerThree) {
    currentPlayer = integerThree;
  });



  this.When(/^the argument is (\d+.\d+)$/, function (decimal) {
    currentPlayer = decimal;
  });


  this.Then(/^the machine will throw "([^"]*)"$/, function (messagetoThrow) {
    let playerOne = new Board()
    expect(() => playerOne.tellTurn(currentPlayer)).to.equal(messagetoThrow,

      'The expected message is not shown'
    )
  });

  let whosTurn;

  this.When(/^player (\d+) has droped a disc$/, function (player) {
    whosTurn = this.tellTurn(player);

  });

  this.Then(/^the machine should display "([^"]*)"$/, function (message) {
    expect(() => $(".message").innerHTML).to.equal(message,
      'Wrong info about taking turns'
    )
  });



}