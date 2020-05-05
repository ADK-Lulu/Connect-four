// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  let currentPlayer;
  let game;
  

  //start() om man ska skriva in sina namn 
  this.When(/^the players input their names a new instance of Board shall be made$/, function () {
    
    let names = ['Anna', 'Jonas'];
    global.prompt = () => names.shift();
    game = new Game();
    
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
   
    //vet inte vad jag ska göra med denna.....
    //det testas ovan men jag lyckas inte bryta ut equaldelen


  });

  this.When(/^the argument is "([^"]*)"$/, function (incomingWrongValue) {

    currentPlayer = isNaN(+incomingWrongValue) ? incomingWrongValue : +incomingWrongValue;
  });

  this.Then(/^the method tellTurn will throw "([^"]*)"$/, function (messagetoThrow) {
    game = new Game();
    expect(() => game.tellTurn(currentPlayer)).to.throw(messagetoThrow,
      'The expected message is not shown'
    )
  });

  this.Given(/^that the players has not entered their names$/, function () {
    let nameToEnter = ['Klas', 'Bosse'];
    let nameToEnterCopy = nameToEnter.slice();
    global.prompt = () => nameToEnter.shift();
    game = new Game();
    expect(game.names).to.deep.equal(nameToEnterCopy, 'The names was not saved in the names property');
  });
  this.When(/^player(\d+) has droped a disc$/, function (playerNumber) {
    game = new Game();
    expect(() => game.tellTurn(+playerNumber)).to.not.throw();
  });

  
  this.Then(/^the game should display "([^"]*)"$/, async function (message) {
    game = new Game();
    //yellows turn to make a move after a new game is started and a move is made
    if (message.includes('Guls')) {
      await game.board.makeMove(3);
    }
    expect($('.message').innerHTML).to.equal(message,
      'Wrong info about taking turns'
    )
  });


}