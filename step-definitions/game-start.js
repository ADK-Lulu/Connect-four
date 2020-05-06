// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let game;
  
  this.Given(/^that a new Game is created$/, function () {
    game = new Game();
  });

  this.Given(/^a new Board is created$/, function () {
    // Empty the contents of .board
    $('.board').innerHTML = '';
    // create a Game, it will create a Board
    new Game();
  });

  this.Then(/^it should create a new Board$/, function () {
    expect(game.board).to.be.an.instanceof(Board,
      'game.board is not an instance of Board');
  });
  
    this.Then(/^it should render (\d+) divs as children of the board element$/, function (expectedNumberOfDivs) {
      let divsCreated = $$('.board > div').length;
      expect(divsCreated).to.equal(+expectedNumberOfDivs,
        expectedNumberOfDivs + ' divs were not created as children of the .board element'
      );
   
    });
  //start() and the prompt is tested below 
  this.When(/^the players input their names a new instance of Board shall be made$/, function () {

    let names = ['Anna', 'Jonas'];
    global.prompt = () => names.shift();
    game = new Game();

  });

  this.When(/^the names shall be saved in the names array$/, function () {
    let nameToEnter = ['Klas', 'Bosse'];
    let nameToEnterCopy = nameToEnter.slice();
    global.prompt = () => nameToEnter.shift();
    game = new Game();
    expect(game.names).to.deep.equal(nameToEnterCopy, 'The names was not saved in the names property');
  });

  this.Given(/^that player(\d+) does not enter a name$/, function (playerNumber) {

    let noName = ['', 'Annelie'];
    global.prompt = () => noName.shift(playerNumber);
    game = new Game();
    expect(game.names[0]).to.equal('Röd');

  });
  this.Given(/^presses enter or cancel$/, function () {

    let nameNull = ['Anna', null];
    global.prompt = () => nameNull.shift();
    game = new Game();

    expect(game.names[1]).to.equal('Gul');
  });

  this.Then(/^player(\d+) should be set to "([^"]*)"$/, function (playerNumber, defaultColor) {

    //no need to test this it's already tested above

  });

  }  
