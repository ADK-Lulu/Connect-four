// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let addEventListenerWasCalled = false;
  let renderWasCalled = false;
  

  class TestGame extends Game {

    addEventListener() {
      addEventListenerWasCalled = true;

    }
    render() {
      renderWasCalled = true; 

    }
    
    
  }
 
  let testGame;
  let currentPlayer;

  let game;
  let board;

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

  this.Then(/^matrix should be set to an array of (\d+) elements$/, function (rows) {
    game = new Game();
    board = new Board(game);

    expect(board.matrix.length).to.equal(+rows);
  });
  this.Then(/^each element should be set to a array of (\d+) elements$/, function (column) {
    game = new Game();
    board = new Board(game);

    for (let column of board.matrix) {
      column = board.matrix[0].length
      expect(column).to.equal(column);
    }

  });

  this.Then(/^each element should have the value of (\d+)$/, function (element) {
    game = new Game();
    board = new Board(game);

    for (let rows of board.matrix) {
      for (let column of board.matrix) {
        expect(+element).to.equal(0);
      }
    }
  });

  this.Then(/^currentPlayer should be set to the value (\d+)$/, function (player) {
    expect(() => (this.currentPlayer).to.equal(player))
  });

  this.Then(/^playInProgress should be set to false$/, function () {
    expect(() => (game.playInProgress()).to.equal(false))
  });

  this.Then(/^the method should call addEventListener\(\)$/, function () {
    testGame = new TestGame();
    expect(addEventListenerWasCalled,
      'the method was not called'
    ).to.be.true;
  });
  
  //vet inte varför denna inte fungerar. 
  this.Then(/^the method should call the method render\(\)$/, function () {
    testGame = new TestGame();
    expect(renderWasCalled,
      'the method was not called'
    ).to.be.true;

  });

  //TODO-denna är inte rätt.
  this.Then(/^it should call tellTurn\(\) with currentPlayer as a argument$/, function () {
    
    expect(game.tellTurn()).to.have.argument(this.currentPlayer,
      'The wrong argument is used'
    )
  });

  this.Given(/^that the argument won is not draw$/, function () {
    expect(() => game.over(won)).to.not.equal("draw");
  });

  this.Given(/^that the argument won is not (\d+)$/, function (player) {
    expect(() => game.over(won)).to.not.equal(player);
  });

  //Måste fixa i scenario till scenario outline? 
  this.Then(/^the error 'won must be "([^"]*)", (\d+) or (\d+)' will be thrown$/, function (draw, player1, player2) {
    expect(draw).to.equal("draw");
    expect(player1).to.equal(1);
    expect(player2).to.equal(2);

  });

  this.Given(/^that the argument won is draw$/, function () {
    expect(game.over(won)).to.equal("draw");

  });

  this.Given(/^that the argument won is (\d+)$/, function (player) {
    expect(game.over(won)).to.equal(player);
  });

  this.Then(/^the message "([^"]*)" is shown$/, function (message) {
    expect().to.equal(message);
  });

  this.Given(/^that the game is over$/, function () {
    expect(game.over(won)).to.be.true;
  });

  this.Given(/^that there is a button in the \.message element with the class \.again$/, function () {

  });

  this.When(/^I press the button$/, function () {

  });

  this.Then(/^the game should restart$/, function () {

  });


}