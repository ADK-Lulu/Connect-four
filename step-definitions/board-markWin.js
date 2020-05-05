// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {
  this.After(() => fixNoSuchWindowError(driver));

  let board;
  let markWinWasCalled = false;
  let testCombo;
  let game = new Game();

  class TestBoard extends Board {
    markWin(combo) {
      markWinWasCalled = true;
      testCombo = combo;
    }
  }

  board = new TestBoard(game);

  this.Given(/^that there is a combo$/, function () {
    //Vi kollar i andra tester om combo finns 
    //och fungerar som den ska. 
  });

  this.Then(/^there should be something with the class win$/, function () {
    let winPosition = $$('.board > div > .win');
    expect(winPosition, 'Nothing with the class win exists').to.exist;

  });

  //Kommentar från Ulrika: Fick hjälp av Johnny med det här steget :)
  this.Given(/^that a player has won the game$/, async function () {
    //Gör en spelplan där spelare ett håller på att vinna
    board.matrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 2, 0, 0, 0],
      [0, 0, 1, 2, 0, 0, 0],
      [0, 0, 1, 2, 0, 0, 0]
    ];
    //Väntar på att makeMove lägger en bricka i column tre så att spelare
    //1 vinner.
    await board.makeMove(2);

  });

  this.Given(/^that the argument combo is an "([^"]*)" with (\d+) elements$/, function (outerCombo, comboLength) {
    //Kollar om combo är en array med 4 element
    expect(testCombo).to.be.an(outerCombo,
      'Combo should be an array');

    expect(testCombo).to.have.lengthOf(+comboLength,
      'Combo should have a length of 4');
  });

  this.Given(/^that each element is an "([^"]*)" with (\d+) numbers$/, function (innerCombo, comboNumber) {
    //Gör om comboNumber till ett nummer istället för string
    lengthOfCombo = +comboNumber
    //Loopar igenom testCombo för att komma åt de inre arrayerna
    for (let comboArray of testCombo) {
      expect(comboArray).to.be.an(innerCombo, 'The inner combo should be an array');
      expect(comboArray).to.have.lengthOf(lengthOfCombo, 'The array should have a length of two');
    }
  });

}