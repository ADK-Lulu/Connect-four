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
    //kolla så att column är en integer mellan 0-6 annars kasta ett fel
    if (!Number.isInteger(column) || column < 0 || column > 6) {

      throw (new Error('column must be an integer between 0 and 6'))
    }
    //om playInprogress är true ska null returneras
    if (this.playInProgress === true) {
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
    //Sätta egenskapen playInProgress till true.
    this.playInProgress = true;
    
    //Sätta ut brickan tillfälligt högst upp i kolumnen.Loopar igenom matrix och om row=0 sätts det till värdet av currentPlayer.
    //Ta bort brickan om den kan falla längre ner.
    for (let row = 0; row < this.matrix.length; row++) {
      if (this.matrix[row][column] === 0) {
        this.matrix[row][column] = this.currentPlayer;
        
        //Anropa metoden render
        this.render();
        
        //Anropa den asynkrona hjälpmetoden sleep för att pausa i 50 ms.
        await sleep(50);
        
        //Om det går: flytta brickan ett steg ner i kolumnen och upprepa från steg 3.
        if (row + 1 < 6) {
          if (this.matrix[row + 1][column] !== 0) {
            break;
          }
          else if (this.matrix[row][column] = 0) {
            this.playInProgress = false
          }
        }
      }
    }
    //Anropa metoden winCheck och om den returnerar något som är truthy:
    //a) Anropa metoden removeEventListener
    let winCheck = this.winCheck();
    if (winCheck) {
      this.removeEventListener();
      //om winCheck returnerar något med combo ska metoden this.markWin(combo) anropas 
      if (winCheck.combo) {
        this.markWin(winCheck.combo);
      }
      this.game.over(winCheck.winner);
      return true;
    }
    //Byt spelare
    this.currentPlayer === 1 ? this.currentPlayer = 2
      : this.currentPlayer = 1;

    this.game.tellTurn(this.currentPlayer);
    this.playInProgress = false;
    return true;
  }
  
  //Ska titta på hela brädet och kontrollera om någon har vunnit eller om det har blivit oavgjort.
  //Om någon har vunnit ska metoden returnera ett objekt.Objektet ska ha egenskaperna winner satt till vinnaren(1 eller 2),
  //samt combo - en array av 4 arrayer, där varje inre array är en position på brädet[radnummer, kolumnnummer].
  //Om det har blivit oavgjort ska metoden returnera ett objekt med egenskapen winner satt till strängen “draw”.
  //Om ingen har vunnit och det inte har blivit oavgjort ska metoden returnera värdet false.

  winCheck() {
    let winnerObject = {};
    let combo = [];

    
    let winOffset = [
          
      [[0, 0], [0, 1], [0, 2], [0, 3]],     //en array för lodrätt
      [[0, 0], [1, 0], [2, 0], [3, 0]],      // en array för vågrätt
      [[0, 0], [1, 1], [2, 2], [3, 3]],     //en array för diagonal från vänster
      [[0, 0], [1, -1], [2, -2], [3, -3]]      //en array för diagonal från höger
    ]
    
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        for (let w of winOffset) {
          let slots = w.map(([r, c]) => this.matrix[row + r] && this.matrix[row + r][col + c]).join('');
         
          let countMoves = 0;
          let gameSlots = this.matrix.flat();
          for (let slot of gameSlots) {
            if (slot !== 0) {
              countMoves++
            }
          }    
          
          if (slots === '1111' || slots === '2222') {
            for (let win of w) {
              combo.push([row + win[0], col + win[1]]);     //jag har fått hjälp med denna 
            }
          
            return winnerObject = {
              winner: +slots[0],
              combo: combo
            }
          }
           else if (countMoves === 42) {
            return winnerObject = {
              winner: 'draw'
            }
          }
        }        
      } 
    }
      return false;
  }

      render() {
        //Hittar första elementet med klassen board
        //Gör matrix till en array och letar igenom den, om den hittar något som är 0, 1 eller 2
        //byter den ut det till klassen red, yellow eller låter det vara vitt. 
        $('.board').innerHTML = `
      ${this.matrix.flat().map((x, i) => `
        <div class="${['', 'red', 'yellow'][x]}">
          <div></div>
        </div>
      `).join('')}
    `;

      }
  
  //Metoden ska ta emot inargumentet combo - en array skapad enligt specifikationerna som finns angivna för metoden winCheck.
//Metoden ska hitta de fyra div - element som motsvarar positionerna angivna i combo och lägga till css - klassen win till vart och ett av dessa div - element.
//Metoden ska använda hjälpmetoden $ för att ta tag i rätt element i DOM: en.


  markWin(combo) {

    

  }
  
  
      //lyssnar efter click-händelser till elementet med css-klassen board i DOM:en.
      //Listar ut index för columner och skickar till makeMove. 
  
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