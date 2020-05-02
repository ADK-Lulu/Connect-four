// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let game = new Game();
  let currentPlayer;
  let objectToReturnFromWinCheck = {};
  let board;

  //Start of test av Board winCheck()
  this.Given(/^that a player has won$/, function () {
    //inget speciellt här
  });

  this.Then(/^the method shall return un object with player (\d+) on the property winner$$/, function (player) {
    //adding playerNr to my:
    currentPlayer = +player;
    objectToReturnFromWinCheck.winner = currentPlayer;
  });

  this.Then(/^also to that object adding a combo with the winning game as an array of four arrays$/, function () {
    //well nothing to do here
  });

  this.Then(/^where the inner arrays contains four different (\d+) (\d+) (\d+) (\d+) (\d+) (\d+) (\d+) (\d+) positions$/,
    function (row1, col1, row2, col2, row3, col3, row4, col4) {
      game = new Game()
      board = new Board(game)

      //tömmer arrayen och sätter allt till 0
      for (let i = 0; i < board.matrix.length; i++) {
        for (let j = 0; j < board.matrix[i].length; j++) {
          board.matrix[i][j] = 0
        }
      }

      //populerar arrayen med aktuell vinstrad och vinnare
      board.matrix[row1][col1] = currentPlayer
      board.matrix[row2][col2] = currentPlayer
      board.matrix[row3][col3] = currentPlayer
      board.matrix[row4][col4] = currentPlayer

      objectToReturnFromWinCheck.combo = [[+row1, +col1], [+row2, +col2], [+row3, +col3], [+row4, +col4]]
      expect(board.winCheck()).to.deep.equal(objectToReturnFromWinCheck,

        'Wrong object was returned from winCheck')
    });

  this.Given(/^that the game is a draw$/, function () {
    game = new Game()
    board = new Board(game)

    board.matrix = [
      [1, 1, 2, 1, 2, 2, 1],
      [2, 2, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 1, 2, 1],
      [1, 1, 2, 1, 1, 1, 2],
      [2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 1, 1, 2, 2]
    ];
  });

  this.Then(/^the method shall return an object with the string draw and winner as property$/, function () {

    let returnObject = { winner: 'draw' };
    expect(board.winCheck()).to.deep.equal(returnObject,
      'The wrong object was return, expected "draw.')
  });

  this.Given(/^that no player wins and the game is not a draw$/, function () {
    game = new Game()
    board = new Board(game)

    board.matrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0],
      [2, 2, 2, 1, 1, 0, 0],
      [1, 2, 1, 2, 1, 0, 0]
    ];

  });
  //DUBBELKOLLA DENNA - kommer matrixen åt?
  this.Then(/^the method shall return false$/, function () {

    expect(board.winCheck(), 'the method did not return false').to.be.false;
  });
}