// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let game = new Game();
  let board;
  let markWinWasCalled = false;

  class TestBoard extends Board {
    markWin() {
      markWinWasCalled = true;
    }
  }
  //Board-markWin()
  this.Given(/^that there is a combo$/, function () {
    //Vi kollar i tidigare tester om combo finns 
    //och fungerar som den ska. 
  });

  this.Then(/^there should be something with the class win$/, function () {

    let winPosition = $$('.board > div > .win');
    expect(winPosition, 'Nothing with the class win exists').to.exist;

  });

}