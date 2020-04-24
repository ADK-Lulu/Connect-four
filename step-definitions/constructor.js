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

  //Board-constructor
//Denna är OK 
  this.Given(/^that game is an instance of class Game$/, function () {
    game = new Game();
    expect(game).to.be.an.instanceof(Game,
      'game must be an instance of Game')
  });
//den här behöver nog själva beskrivningen ändras lite
  //game should be set to the value of new Game kanske eller nått
  this.When(/^game is set to the value of constructor-game$/, function () {
    expect(function () {
      
    })
  });
//den här är inte heller korrekt
  //kanske man behöver lägga in själva arrayen här? och loopa den eller nått
  // expect({ a: { b: ['x', 'y'] } }).to.have.nested.property('a.b[1]');
  this.Then(/^matrix should be set to an array of (\d+) elements$/, function (rows) {
    game = new Game();
    board = new Board(game);

    expect(board.matrix.length).to.equal(+rows);

  });
//den här är inte heller korrekt, den förutsätter att den förra är rätt
  this.Then(/^each element should be set to a array of (\d+) elements$/, function (columns) {
    game = new Game();
    board = new Board(game);

    for (let column of board.matrix) {
      column = board.matrix[0].length
      expect(column).to.equal(+columns);

    }
  });
  //DENNA ÄR INTE KLAR...har inte lyckats få den att ta tag i elementen. 
  this.Then(/^each element should have the value of (\d+)$/, function (element) {
   // game = new Game();
    //board = new Board(game);

    //expect(board.matrix).to.equal(+element);
  });
  //denna är inte heller klar.....den ska kolla så att currentPlayer byts till 1. 
  this.Then(/^currentPlayer should be set to the value (\d+)$/, function (player) {
    game = new Game();
    board = new Board(game);
    
    expect(() => (board.currentPlayer).to.equal(1,
      'currentPlayer should be set to 1'))
    
  });
//denna är inte heller klar.....
  this.Then(/^playInProgress should be set to false$/, function () {
    game = new Game();
    board = new Board(game);
   
    expect(() => (board.playInProgress).to.equal(false,
      'playInProgress is not set to false'))
    
  });

  //här är ett nytt scenario
  //denna är OK
  this.When(/^a new game is started\(\)$/, function () {
    testBoard = new TestBoard(game);
  });
//Denna är OK av Thomas
  this.Then(/^the constructor should call addEventListener$/, function () {
    testBoard = new TestBoard(game);
    expect(addEventListenerBoardWasCalled,
      'the method was not called'
    ).to.be.true;
  });

  //Denna är OK av Thomas
  this.Then(/^the constructor should call the method render$/, function () {
    testBoard = new TestBoard(game);
    expect(renderWasCalled,
      'the method was not called'
    ).to.be.true;

  });
  //denna är inte rätt heller.....
  this.Then(/^it should call tellTurn with currentPlayer as a argument$/, function () {

    expect(game.tellTurn()).to.have.argument(this.currentPlayer,
      'The wrong argument is used'
    )
  });
}
