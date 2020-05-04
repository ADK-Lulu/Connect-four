// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let removeEventListenerWasCalled = false;
  let game = new Game();

  class TestBoard extends Board {

    removeEventListener() {
      removeEventListenerWasCalled = true;
    }
  }

  let board = new TestBoard(game);

  this.Given(/^that the removeEventListener function has been called$/, function () {
    board.removeEventListener();
    expect(removeEventListenerWasCalled).to.be.true;
  });

}

