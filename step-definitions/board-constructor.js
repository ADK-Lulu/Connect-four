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
      startWasCalled = true;
    }

    addEventListener() {
      addEventListenerWasCalled = true;
    }

    tellTurn(player) {
      tellTurnWasCalled = true;
      player === 1 || player === 2 ? tellCurrentPlayer = true : '';
    }
  }

  let addEventListenerBoardWasCalled = false;
  let renderWasCalled = false;

  class TestBoard extends Board {

    addEventListener() {
      addEventListenerBoardWasCalled = true;
    }

    render() {
      renderWasCalled = true;
    }
  }

  let testGame = new TestGame();
  let testBoard = new TestBoard(testGame);
  let game = new Game();
  let board = new Board(game);
  let onlyTestingGame = new Game();

  this.Given(/^that game is an instance of class Game$/, function () {

    expect(onlyTestingGame).to.be.an.instanceof(Game,
      'game must be an instance of Game')
  });
  
  this.Then(/^game is set to the value of the parameter passed to the constructor in Board$/, function () {
   
    expect(onlyTestingGame).to.have.property('board');
  });

  this.Then(/^matrix should be set to an array of (\d+) elements$/, function (arrElements) {
    
    expect(board.matrix).to.have.lengthOf(+arrElements);
  });
  
  this.Then(/^each element should be set to a array of (\d+) elements$/, function (columns) {

    for (let i = 0; i < board.matrix.length; i++) {
      for (let j = 0; j < board.matrix[i].length; j++) {
        expect(board.matrix[i], 'Wrong amount of elements in the nested array').to.have.lengthOf(+columns);
      }
    }
  });
  
  this.Then(/^each element should have the value of (\d+)$/, function (element) {
    
    expect(board.matrix.flat()).to.have.members([+element]);
  });

  this.Then(/^currentPlayer should be set to the value (\d+)$/, function (playerOne) {
    
    expect(board.currentPlayer).to.equal(+playerOne,
      'currentPlayer should be set to 1')
  });
  
  this.Then(/^playInProgress should be set to false$/, function () {
    
    expect(board.playInProgress,
      'playInProgress is not set to false').to.be.false;
  });

  this.When(/^a new game is started\(\)$/, function () {
    //is called already
  });

  this.Then(/^the constructor should call addEventListener$/, function () {
   
    expect(addEventListenerBoardWasCalled,
      'the method was not called'
    ).to.be.true;
  });

  this.Then(/^the constructor should call the method render$/, function () {
   
    expect(renderWasCalled,
      'the method was not called'
    ).to.be.true;
  });

  this.Then(/^it should call tellTurn with currentPlayer as an argument$/, function () {

    expect(tellTurnWasCalled,
      'The method was not called').to.be.true;
    
    expect(tellCurrentPlayer,
      'The argument should be currentPlayer').to.be.true;
  });
  
}