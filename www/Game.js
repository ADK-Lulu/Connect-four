class Game {

  constructor() {

    this.addEventListener();
    this.start();
  }

  start() {

    this.player1 = prompt('Vad heter spelare 1?');
    if (this.player1 === '' || this.player1 === null) { this.player1 = 'Röd' }

    this.player2 = prompt('Vad heter spelare 2?');
    if (this.player2 === '' || this.player2 === null) { this.player2 = 'Gul' }

    this.board = new Board(this);

  }

  tellTurn(player) {
    let $message = $('.message');
    let playerWithoutS;
    let playerTwoWithoutS;

    if (player !== 1 && player !== 2) {
      throw (new Error('player must be 1 or 2'));
    }

    if ([...this.player1].pop() === 's') {
      playerWithoutS = this.player1.slice(0, -1)
    } else { playerWithoutS = this.player1; }

    if ([...this.player2].pop() === 's') {
      playerTwoWithoutS = this.player2.slice(0, -1)
    } else { playerTwoWithoutS = this.player2; }

    $message.innerHTML = player === 1 ? `${playerWithoutS}s tur...`
      : player === 2 ? `${playerTwoWithoutS}s tur...`
        : "";
  }

  over(won) {

    if (won !== "draw" && won !== 1 && won !== 2) {

      throw (new Error("won must be 'draw', 1 or 2"));

    }

    $('.message').innerHTML = won === "draw" ? "Det blev oavgjort!"
      : won === 1 ? `${this.player1} vann!`
        : won === 2 ? `${this.player2} vann!`
          : "";

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

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Game = Game };