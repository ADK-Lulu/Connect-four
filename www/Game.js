class Game {

  constructor() {

    this.addEventListener();
    this.start();
    this.over(1);
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


  /*
  Dessutom ska en knapp (button-element) läggas till i DOM-elementet 
  med css-klassen message. Knappen ska ha css-klassen again och texten 
  “Spela igen”.*/

  over(won) {

    if (won !== "draw" && won !== 1 && won !== 2) {

      throw (new Error("won must be 'draw', 1 or 2"));

    }

    $('.message').innerHTML = won === "draw" ? "Det blev oavgjort!"
      : won === 1 ? "Röd vann!"
        : won === 2 ? "Gul vann!"
          : "";

    let $button = document.createElement('button');
    $button.className = 'again';
    $button.innerHTML = '<button>Spela igen</button>';
    $('.message').append($button);

  }

  addEventListener() {

    $('.message').addEventListener('click', event => {

      if (event.target.closest('again')) {
        this.start();
      }

    });

  }

}

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Game = Game };