// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let addEventListenerWasCalled = false;
  let game = new Game();

  class TestBoard extends Board {

    addEventListener() {
      addEventListenerWasCalled = true;
    }
  }

  let board = new TestBoard(game);

  this.Given(/^that the method addEventListener for board was called$/, function () {
    board.addEventListener();
    expect(addEventListenerWasCalled).to.be.true;
  });

}