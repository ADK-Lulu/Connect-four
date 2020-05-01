// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let currentPlayer;
  let game = new Game();
  let board;

  //Scenario: Render shall change color on the div-elements in DOM depending on which player is the current one
  this.When(/^(\d+) is the value of the currentPlayer$/, function (value) {
    currentPlayer = value;
  });

  let nodeBoard;
  this.When(/^the currentPlayer has made a move and placed a disc on index (\d+) and (\d+)$/, function (row, col) {
    board = new Board(game)
    board.matrix[row][col] = currentPlayer; //sätter gul/röd plupp på vald position
    board.render()
    nodeBoard = [...$$('.board > div')][col];
  });

  this.Then(/^"([^"]*)" will be the chosen color on the div by help from the css\-class board$/, function (color) {
    //Kollar att rgbvärdet är rätt
    let expectedColor = nodeBoard.className.includes(color)

    expect(expectedColor, 'Wrong color displayed on the disc').to.be.true;

  });

  this.When(/^the matrix is rendered it should have empty div elements inside of a div$/, function () {
    let divInside = $('.board > div>div').innerHTML === "";
    expect(divInside, 'There are not any empty divs inside the matrix').to.be.true;
  });
}