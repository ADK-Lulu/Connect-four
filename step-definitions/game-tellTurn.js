// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let currentPlayer;
  let playInProgress;
  let game;
  let board;



  this.When(/^the argument is "([^"]*)"$/, function (incomingWrongValue) {

    currentPlayer = isNaN(+incomingWrongValue) ? incomingWrongValue : +incomingWrongValue;
  });


  this.Then(/^the method tellTurn will throw "([^"]*)"$/, function (messagetoThrow) {
    game = new Game()
    expect(() => game.tellTurn(currentPlayer)).to.throw(messagetoThrow,
      'The expected message is not shown'
    )
  });

  this.When(/^player (\d+) has droped a disc$/, function (playerNumber) {
    game = new Game();
    expect(() => game.tellTurn(+playerNumber)).to.not.throw();
  });

  this.Then(/^the game should display "([^"]*)"$/, function (message) {
    //expect($('.message').innerHTML).to.equal(message,
    //'Wrong info about taking turns'
    //)
  });
  //start() om man ska skriva in sina namn 

  this.When(/^the players input their names a new instance of Board shall be made$/, function () {
    game = new Game();
    let names = ['Anna', 'Jonas'];
    global.prompt = () => names.shift();
    game.start();

  });

  this.Given(/^that player(\d+) does not enter a name$/, function (playerNumber) {
    game = new Game();
    noName = ['', 'Annelie'];
    global.prompt = () => noName.shift(playerNumber);
    game.start();
    expect(game.player1).to.equal('Röd');

  });
  this.Given(/^presses enter or cancel$/, function () {
    game = new Game();
    nameNull = ['Anna', null];
    global.prompt = () => nameNull.shift();
    game.start();
    expect(game.player2).to.equal('Gul');
  });

  this.Then(/^player(\d+) should be set to "([^"]*)"$/, function (playerNumber, defaultColor) {
    //vet inte vad jag ska göra med denna.....
    //det testas ovan men jag lyckas inte bryta ut equaldelen


  });


}