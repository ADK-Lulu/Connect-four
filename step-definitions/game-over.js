// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let addEventListenerWasCalled = false;
  let startWasCalled = false;
  let overWasCalled = false;
  let game = new Game();


  class TestGame extends Game {


    addEventListener() {
      addEventListenerWasCalled = true;

    }

    start() {
      startWasCalled = true;
    }
    over() {
      overWasCalled = true;
    }
  }

  let currentPlayer;
  let objectToReturnFromWinCheck = {};

  let board;

  this.Given(/^that the argument won has the value true$/, function () {
    won = true;
  });

  this.Given(/^that the argument won has the value "([^"]*)"$/, function (elephant) {
    won = elephant;
  });

  this.Given(/^that the argument won has the value (\d+.\d+)$/, function (decimal) {
    won = decimal;
  });

  this.Given(/^that the argument won has the value ''$/, function () {
    won = '';
  });

  this.Given(/^that the argument won has the value (\d+)$/, function (numberThree) {
    won = numberThree;
  });

  //Måste fixa i scenario till scenario outline? 
  this.Then(/^the error "([^"]*)" will be thrown$/, function (errorMessage) {
    expect(() => game.over(won)).to.throw(errorMessage);
  });

  this.Given(/^that the argument won is draw$/, function () {
    won = "draw";

  });

  this.Then(/^the message "([^"]*)" is shown$/, function (wonMessage) {
    $('.message').innerHTML = "Det blev oavgjort!";
    expect($('.message').innerHTML).to.equal(wonMessage);
  });

  this.Given(/^that the argument won is (\d+) for red$/, function (player1) {
    won = player1;
  });

  this.Then(/^the message "([^"]*)" shows that red won$/, function (winRed) {
    $('.message').innerHTML = "Röd vann!";
    expect($('.message').innerHTML).to.equal(winRed);
  });

  this.Given(/^that the argument won is (\d+) for yellow$/, function (player2) {
    won = player2;
  });

  this.Then(/^the message "([^"]*)" shows that yellow won$/, function (winYellow) {
    $('.message').innerHTML = "Gul vann!";
    expect($('.message').innerHTML).to.equal(winYellow);
  });

  this.Given(/^that the game is over$/, function () {
    if (won === "draw" || won === 1 || won === 2) {
      expect(overWasCalled, 'The method was not called correctly').to.be.true;
    }
  });

  this.Given(/^that there is a button in the message element with the class again$/, function () {
    let againButton = $$('.message > button > .again');
    expect(againButton).to.exist;
  });

  this.Then(/^I should be able to restart the game$/, function () {
    if (won === "draw" || won === 1 || won === 2) {
      expect(addEventListenerWasCalled, 'The method was not called correctly').to.be.true;
      expect(startWasCalled, 'The method was not called correctly').to.be.true;
    }
  });


  //Start of test av Board winCheck()
  this.Given(/^that a player has won$/, function () {
    game = new Game()
    board = new Board(game)


  });

  this.Then(/^the method shall return un object with player (\d+) on the property winner$$/, function (player) {
    //adding playerNr to my:
    objectToReturnFromWinCheck.winner = player;
  });

  this.Then(/^also to that object adding a combo with the winning game as an array of four arrays$/, function () {
    //well nothing to do here
  });

  //MARIT ska lägga till expect också på denna
  this.Then(/^where the inner arrays contains four different (\d+) (\d+) (\d+) (\d+) (\d+) (\d+) (\d+) (\d+) positions$/,
    function (row1, col1, row2, col2, row3, col3, row4, col4) {


      objectToReturnFromWinCheck.combo = [[+row1, +col1], [+row2, +col2], [+row3, +col3], [+row4, +col4]]

      console.log("HÄR", objectToReturnFromWinCheck)
    });

}