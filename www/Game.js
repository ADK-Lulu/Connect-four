module.exports = class Game {

  constructor() {

    this.addEventListener();
    this.start();
  }

  start() { 
    let board = new Board(this);
    
  }
  

  tellTurn(player) { 
    let $message = document.querySelector('.message');
    
    if (player !== 1 || player !== 2) {
      return 'Player must be 1 or 2';
    }
    if (player === 1) {
      return document.querySelector('.message').innerHTML = 'Röds tur';
    }
    if (player === 2) {
      return document.querySelector('.message').innerHTML = 'Guls tur';
    }
       
  }

  over(won) { }

  addEventListener() { }


}

// make it possible to test on backend
//if (typeof global !== 'undefined') { global.Game = Game };