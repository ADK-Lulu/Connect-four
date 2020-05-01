// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let addEventListenerWasCalled = false;
  let startWasCalled = false;
  let overWasCalled = false;
  let game = new Game();
  let won;
  let currentPlayer;
  let objectToReturnFromWinCheck = {};
  let board;
  let markWinWasCalled = false;

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

  class TestBoard extends Board {
    markWin() {
      markWinWasCalled = true;
    }
  }


  this.Given(/^that the argument won has the value true$/, function () {
    won = true;
  });

  this.Given(/^that the argument won has the value "([^"]*)"$/, function (elephant) {
    won = elephant;
  });

  this.Given(/^that the argument won has the value (\d+.\d+)$/, function (decimal) {
    won = +decimal;
  });

  this.Given(/^that the argument won has the value ''$/, function () {
    won = '';
  });

  this.Given(/^that the argument won has the value (\d+)$/, function (numberThree) {
    won = +numberThree;
  });

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

  this.Given(/^that there is a button in the message element with the class again$/, function () {
    let againButton = $$('.message > button > .again');
    expect(againButton).to.exist;
  });

}