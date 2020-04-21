class Board {

  constructor(game) {
    if (!(game instanceof Game)) {
      throw (new Error("game must be an instance of Game"))
    }
    this.game = game;
    this.matrix = [
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

  render() {
    //Tar och loopar igenom matrix, en array av arrayer, som blir spelplanen
    for (let element of this.matrix) {
      //Loopar igenom arrayerna var för sig i matrix.
      for (let $childElement of element) {
        //Hittar det första elementet med klassen board
        $childElement = $('.board');
        let $childElement2 = document.createElement('div');
        $childElement2.innerHTML = `<div></div>`;
        $childElement.append($childElement2);
      }
    }

  }

  markWin(combo) { }

  addEventListener() { }

  removeEventListener() { }

}

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Board = Board };