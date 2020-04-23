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
    this.currentPlayer = 1;
    this.playInProgress = false;
    this.addEventListener();
    this.render();
    game.tellTurn(this.currentPlayer);

  }

  async makeMove(column) {

    if (!Number.isInteger(column) || column < 0 || column > 6) {

      throw (new Error('column must be an integer between 0 and 6'))
    }
    else if (this.playInProgress === true) {
      return null;
    }

    //plattar ut matrixen för att sedan i switchen kolla om det finns någon 0, dvs en vit/tom plats, i aktuell column,
    //om det inte finns så returneras false

    let flatMatrix = this.matrix.flat();

    switch (column) {

      case 0: if (flatMatrix.filter((item, index) => index % 7 === 0).indexOf(0) === -1) { return false };
        break;
      case 1: if (flatMatrix.filter((item, index) => index % 7 === 1).indexOf(0) === -1) { return false };
        break;
      case 2: if (flatMatrix.filter((item, index) => index % 7 === 2).indexOf(0) === -1) { return false };
        break;
      case 3: if (flatMatrix.filter((item, index) => index % 7 === 3).indexOf(0) === -1) { return false };
        break;
      case 4: if (flatMatrix.filter((item, index) => index % 7 === 4).indexOf(0) === -1) { return false };
        break;
      case 5: if (flatMatrix.filter((item, index) => index % 7 === 5).indexOf(0) === -1) { return false };
        break;
      case 6: if (flatMatrix.filter((item, index) => index % 7 === 6).indexOf(0) === -1) { return false };
        break;
    }

    this.playInProgress = true;
    //Sätt brickan högst upp
    //this.render();
    //ta bort brickan om den kan falla längre ner 
    //Anropa sleep 
    //om det går, börja om igen från anropa render 
    //anropa this.winCheck, om den anropar något true; 
    // this.removeEventListener();
    //om winCheck returnerar något med combo ska metoden this.markWin(combo) anropas 
    //game.over(winner)
    //returnera true

    //Byt spelare
    this.currentPlayer === 1 ? this.currentPlayer = 2
      : this.currentPlayer = 1;

    this.game.tellTurn(this.currentPlayer);
    this.playInProgress = false;
    return true;

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

  /*lyssnar efter click-händelser till elementet med css-klassen board i DOM:en.
  Listar ut index för columner och skickar till makeMove. 
  */
  addEventListener() {

    this.listener = event => {
      let $clicked = event.target.closest('.board>div');
      if (!$clicked) { return }
      let $allClicked = [...$$('.board>div')];
      let index = $allClicked.indexOf($clicked);
      let column = index % 7;
      this.makeMove(column);

    }
    $('.board').addEventListener('click', this.listener);
  }
  /*Metoden ska ta bort händelselyssnaren lagrad i egenskapen listener 
  från elementet med css-klassen board i DOM:en.*/
  removeEventListener() {
    $('.board').removeEventListener('click', this.listener);
  }

}

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Board = Board };