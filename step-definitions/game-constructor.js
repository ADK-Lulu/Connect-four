// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let addEventListenerWasCalled = false;
  let startWasCalled = false;
  let tellTurnWasCalled = false;
  let tellCurrentPlayer = false;

  class TestGame extends Game {


    start() {
      this.board = new TestBoard(this);
      startWasCalled = true;
    }
    addEventListener() {
      addEventListenerWasCalled = true;

    }


    tellTurn(player) {
      tellTurnWasCalled = true;
      (player === 1 || player === 2 ? tellCurrentPlayer = true : '');
    }
  }

  addEventListenerBoardWasCalled = false;
  renderWasCalled = false;

  class TestBoard extends Board {

    addEventListener() {
      addEventListenerBoardWasCalled = true;
    }
    render() {
      renderWasCalled = true;
    }

  }

  let testBoard;
  let testGame;

  let currentPlayer;
  let playInProgress;

  let game;
  let board;

  //Här börjar step-definitions för Game-constructor
  //Denna är OK av Thomas
  this.When(/^a new game is started$/, function () {
    testGame = new TestGame();
  });
  //Denna är OK av Thomas
  this.Then(/^the constructor should call the method addEventListener$/, function () {
    expect(addEventListenerWasCalled, 'The method was not called'
    ).to.be.true;
  });
  //Denna är OK av Thomas
  this.Then(/^the constructor should call the method start$/, function () {
    expect(startWasCalled, 'The method was not called'
    ).to.be.true;
  });

}
