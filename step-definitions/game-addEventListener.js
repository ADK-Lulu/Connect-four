// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let addEventListenerWasCalled = false;

  class TestGame extends Game {

    addEventListener() {
      addEventListenerWasCalled = true;
    }
  }

  let game = new TestGame();

  this.Given(/^that the method addEventListener for game was called$/, function () {
    game.addEventListener();
    expect(addEventListenerWasCalled).to.be.true;
  });

}