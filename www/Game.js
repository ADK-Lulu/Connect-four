class Game {

  constructor() {
    this.names = [];
    this.addEventListener();
    this.start();
  }

  start() {

    this.names.push(prompt('Vad heter spelare 1?') || 'Röd');
    this.names.push(prompt('Vad heter spelare 2?') || 'Gul');
    this.board = new Board(this);
  }

  tellTurn(player) {
    
    if (player !== 1 && player !== 2) {
      throw (new Error('player must be 1 or 2'));
    }
    let $message = $('.message');
    $message.innerHTML = this.names[player - 1].replace(/s$/, '') + 's tur...';
  }

  over(won) {

    if (won !== "draw" && won !== 1 && won !== 2) {
      throw (new Error("won must be 'draw', 1 or 2"));
    }

    $('.message').innerHTML = won === "draw" ? "Det blev oavgjort!"
      : `${this.names[won - 1]} vann!`;

    let $button = document.createElement('button');
    $button.className = 'again';
    $button.innerHTML = '<button>Spela igen</button>';
    $('.message').append($button);
  }

  addEventListener() {

    $('.message').addEventListener('click', event => {
      if (event.target.closest('.again')) {
        this.start();
      }
    });
  }

}


if (typeof global !== 'undefined') { global.Game = Game };