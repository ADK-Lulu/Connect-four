class Board {

  constructor(game) {
    if (!(game instanceof Game)) {
      throw (new Error("game must be an instance of Game"))
    }
    this.game = game;

    let matrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    let currentPlayer = 1;
    let playInProgress = false;
    this.addEventListener();
    this.render();
    game.tellTurn(currentPlayer);
  }
  async makeMove(column) {


  }

  winCheck() { }

  render() { }

  markWin(combo) { }

  addEventListener() { }

  removeEventListener() { }

}

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Board = Board };