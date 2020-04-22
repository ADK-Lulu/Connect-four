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
  //TODO - denna funkar inte
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
    game = new Game()
    expect(() => game.tellTurn(currentPlayer)).to.throw(messagetoThrow,

      'The expected message is not shown'
    )
  });

  this.When(/^player (\d+) has droped a disc$/, function (playerNumber) {
    game = new Game();
    expect(() => game.tellTurn(+playerNumber)).to.not.throw(

    );

  });

  this.Then(/^the machine should display "([^"]*)"$/, function (message) {
    expect($('.message').innerHTML).to.equal(message,
      'Wrong info about taking turns'
    )
  });

  //Här börjar step-difinitions för scenario constructor(game)

  this.Given(/^that game is an instance of class Game$/, function () {
    expect(game).to.be.an.instanceof(Game,
      'game must be an instance of Game')
  });

  this.When(/^game is set to the value of constructor-game$/, function () {
    expect(() => (this.game).to.equal(game))
  });

  this.When(/^matrix should be set to an array of (\d+) elements$/, function (columns) {
    matrix = game.matrix;
    expect(this.matrix.length).to.equal(columns);

  });

  this.When(/^each element should be set to a array of (\d+) elements$/, function (row) {
    for (let column of this.matrix) {
      for (let rows of column) {
        expect(rows.length).to.equal(row);
      }
    }
  });

  this.When(/^each element should have the value of (\d+)$/, function (element) {
    for (let elements of rows) {
      expect(element).to.equal(0);
    };
  });

  this.When(/^currentPlayer should be set to the value (\d+)$/, function (player) {
    expect(() => (this.currentPlayer).to.equal(player))
  });

  this.When(/^playInProgress should be set to false$/, function () {
    expect(() => (game.playInProgress()).to.equal(false))
  });

  this.Then(/^the method should call addEventListener\(\) and render\(\)$/, function () {
    game.addEventListener();
    game.render();
  });

  this.Then(/^it should call tellTurn\(\) with currentPlayer as a argument$/, function () {
    game.tellTurn(currentPlayer);
  });


}