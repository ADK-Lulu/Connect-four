// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let addEventListenerWasCalled = false;
  let startWasCalled = false;
  
  class TestGame extends Game {
    
    addEventListener() {
      addEventListenerWasCalled = true;
    }

    start() {
      startWasCalled = true;
    }
  }

  let testGame = new TestGame();

  this.When(/^a new game is started$/, function () {
   //is already initiated above
  });
  
  this.Then(/^the constructor should call the method addEventListener$/, function () {
    
    expect(addEventListenerWasCalled, 'The method was not called'
    ).to.be.true;
  });
 
  this.Then(/^the constructor should call the method start$/, function () {
    
    expect(startWasCalled, 'The method was not called'
    ).to.be.true;
  });

}
