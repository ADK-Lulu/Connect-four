// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let game;

  this.Given(/^that a new Game is created$/, function () {
    game = new Game();
  });

  this.Then(/^it should create a new Board$/, function () {
    expect(game.board).to.be.an.instanceof(Board,
      'game.board is not an instance of Board'
    );
  });

  this.Given(/^that a new Board is created$/, function () {
    // Empty the contents of .board
    $('.board').innerHTML = '';
    // create a Game, it will create a Board
    new Game();
  });

  this.Then(/^it should render (\d+) divs as children of the board element$/, function (expectedNumberOfDivs) {
    let divsCreated = $$('.board > div').length;
    expect(divsCreated).to.equal(+expectedNumberOfDivs,
      expectedNumberOfDivs + ' divs were not created as children of the .board element'
    );
  });

  this.When(/^the argument is anything else but (\d+) or (\d+)$/, function (arg1, arg2) {
    // Write code here that turns the phrase above into concrete actions
  });

  this.Then(/^the machinge will throw “player must be (\d+) or (\d+)”$/, function (arg1, arg2) {
    // Write code here that turns the phrase above into concrete actions
  });

  this.When(/^player (\d+) has droped a disc$/, function (arg1) {
    // Write code here that turns the phrase above into concrete actions
  });


  this.Then(/^the machine should display 'Röds tur\.\.\.'$/, function () {
    // Write code here that turns the phrase above into concrete actions
  });

  //SKA DEN HÄR VARA MED?!
  this.Given(/^a new Board is created\.$/, function () {
    // Write code here that turns the phrase above into concrete actions
  });

  this.When(/^player (\d+) has droped a disc$/, function (arg1) {
    // Write code here that turns the phrase above into concrete actions
  });

  this.Then(/^the machine should display 'Guls tur\.\.\.'$/, function () {
    // Write code here that turns the phrase above into concrete actions
  });

}