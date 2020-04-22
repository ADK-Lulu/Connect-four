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

    //TODO få svar om "again" - (den css-klassen finns inte) från Thomas
    let $button = document.createElement('button');
    $button.className = 'message';
    $button.innerHTML = '<button class="again">Spela igen</button>';
    $('body').append($button);
  }
  /*Metoden ska addera en händelselyssnare/funktion för 
  click-händelser till elementet med css-klassen message i DOM:en.
  Händelselyssnaren ska detektera om man har klickat på 
  knappen med css-klassen again och i så fall anropa metoden start.'*/
  addEventListener() { }

}

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Game = Game };