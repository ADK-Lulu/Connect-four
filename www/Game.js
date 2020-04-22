class Game {

  constructor() {

    this.addEventListener();
    this.start();

  }

  start() {
    this.board = new Board(this);

  }


  tellTurn(player) {
    let $message = $('.message');

    if (player !== 1 && player !== 2) {
      throw (new Error('player must be 1 or 2'));
    }

    $message.innerHTML = player === 1 ? 'Röds tur...'
      : player === 2 ? 'Guls tur...'
        : "";
  }



  over(won) { }

  addEventListener() { }


}

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Game = Game };