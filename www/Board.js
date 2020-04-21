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
    //Skriva kod för att spara "row"/"column" så
    //man kan återanvända dem senare för att 
    //bestämma positioner/bestämma om någon vinner etc.
    let col0;
    let col1;
    let col2;
    let col3;
    let col4;
    let col5;
    let col6;

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

    //Kod för att ändra färgen på ett div-element
    /*if (player === 1) {
    let $red = $('.red'); 
      $red.innerHTML (etc.)
    } else {
     let $yellow = $('.yellow'); 
     $yellow.innetHTML (etc.) 
    } */

    //Om spelare 1 har en bricka på en position
    //ska det div-element som motsvarar positionen
    //få css-klassen red. 
    //Om spelare 2 har en bricka på en position
    //ska det div-element som motsvarar positionen
    //få css-klassen yellow.
  }

  markWin(combo) { }

  addEventListener() { }

  removeEventListener() { }

}

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Board = Board };