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
    /*if (!Number.isInteger(column) || column > 0 || column < 6) {
      throw (new Error('column must be an integer between 0 and 6'))
    }
    else if (this.playInProgress === true) {
      return null;
    }
    else if (column is full) {
      //loopa igenom olika lösningar? 
      //Skriv kod här för att kolla om column är full
      return false;
    }
    this.playInProgress = true;
    //Sätt brickan högst upp
    //this.render();
    //ta bort brickan om den kan falla längre ner 
    //Anropa sleep 
    //om det går, börja om igen från anropa render 
    //anropa this.winCheck, om den anropar något true; 
    //anropa this.removeEventListener();
    //om winCheck returnerar något med combo ska metoden this.markWin(combo) anropas 
    //game.over(winner)
    //returnera true
    //Byt spelare 
    if (player === 1) {
      player = 2;
    } else if (player === 2) {
      player = 1;
    }
    this.game.tellTurn(currentPlayer);
    this.playInProgress = false;
    return true;*/

  }

  winCheck() { }

  render() {
    //Hittar första elementet med klassen board
    //Gör matrix till en array och letar igenom den, om den hittar något som är 0, 1 eller 2
    //byter den ut det till gul, röd eller låter det vara vitt. 
    $('.board').innerHTML = `
      ${this.matrix.flat().map((x, i) => `
        <div class="${['', 'red', 'yellow'][x]}">
          <div></div>
        </div>
      `).join('')}
    `;

  }

  markWin(combo) { }

  addEventListener() { }

  removeEventListener() { }

}

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Board = Board };