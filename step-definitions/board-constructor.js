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
  let game;
  let board;

  //Board-constructor
  //Denna är OK 
  this.Given(/^that game is an instance of class Game$/, function () {
    game = new Game();
    expect(game).to.be.an.instanceof(Game,
      'game must be an instance of Game')
  });
  //MARIT justerat
  this.Then(/^game is set to the value of the parameter passed to the constructor in Board$/, function () {
    game = new Game();
    expect(game).to.have.property('board');
  });

  //Marit justerat
  this.Then(/^matrix should be set to an array of (\d+) elements$/, function (arrElements) {
    game = new Game();
    board = new Board(game);

    expect(board.matrix).to.have.lengthOf(+arrElements);

  });
  //Marit justerat
  this.Then(/^each element should be set to a array of (\d+) elements$/, function (columns) {
    game = new Game();
    board = new Board(game);

    for (let i = 0; i < board.matrix.length; i++) {
      for (let j = 0; j < board.matrix[i].length; j++) {

        expect(board.matrix[i], 'Wrong amount of elements in the nested array').to.have.lengthOf(+columns);

      }
    }

  });
  //Marit justerat
  this.Then(/^each element should have the value of (\d+)$/, function (element) {
    game = new Game();
    board = new Board(game);

    expect(board.matrix.flat()).to.have.members([+element]);
  });

  //Marit justerat 
  this.Then(/^currentPlayer should be set to the value (\d+)$/, function (playerOne) {
    game = new Game();
    board = new Board(game);

    expect(board.currentPlayer).to.equal(+playerOne,
      'currentPlayer should be set to 1')
  });
  //MARIT justerat
  this.Then(/^playInProgress should be set to false$/, function () {
    game = new Game();
    board = new Board(game);

    expect(board.playInProgress, 'playInProgress is not set to false').to.be.false;

  });



  //Scenario: The constructor should call the correct methods when a new game is created
  //denna är OK
  this.When(/^a new game is started\(\)$/, function () {
    testBoard = new TestBoard(testGame);
  });



  //Denna är OK av Thomas
  this.Then(/^the constructor should call addEventListener$/, function () {
    testBoard = new TestBoard(testGame);
    expect(addEventListenerBoardWasCalled,
      'the method was not called'
    ).to.be.true;
  });

  //Denna är OK av Thomas
  this.Then(/^the constructor should call the method render$/, function () {
    testBoard = new TestBoard(testGame);
    expect(renderWasCalled,
      'the method was not called'
    ).to.be.true;

  });

  //tror att denna funkar nu/jennie

  this.Then(/^it should call tellTurn with currentPlayer as an argument$/, function () {
    testGame = new TestGame();
    testBoard = new TestBoard(testGame);
    expect(tellTurnWasCalled,
      'The method was not called'
    ).to.be.true;

    expect(tellCurrentPlayer,
      'The argument should be currentPlayer'
    ).to.be.true;


  });



}