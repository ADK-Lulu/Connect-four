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

    /*
  let orgRemoveFunc = document.removeEventListener;
  document.removeEventListener = (type, func){.... some code that changes a variable I use in my test...}
  // my excpects etc
  
  // then restore  to real method
  document.removeEventListener = orgRemoveFunc
  */
  }

  let board = new TestBoard(game);

  this.Given(/^that the removeEventListener function has been called$/, function () {
    board.removeEventListener();
    expect(removeEventListenerWasCalled).to.be.true;
  });

  this.Then(/^I should be able to change a variable$/, function () {
    throw (new Error('No more tests have been written'))
  });

}

