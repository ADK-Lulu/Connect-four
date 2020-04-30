require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  // removes annoying fixNoSuchWindowErrors on running npm test
  // (only works if you have required the _async-helpers.js file)
  this.After(() => fixNoSuchWindowError(driver));

  

  // ... other step definitions...

  // HOW TO HANDLE ASYNC METHODS:

  // expect - to.equal, to.not.equal, to.be, to.not.be etc:
  // Add async to the step function
  // and await before the async method whose 
  // return value you want to check
  /*
  this.Then(/^some step$/, async function () {
    expect(await board.makeMove(5)).to.be.true;
  });

  // expect - to.throw, to.not.throw:
  // Add async to the step function
  // INSTEAD OF encapsulating the call to the method
  // you expect to throw (or not throw) in a function 
  // ADD await before it and .throwCheck after it
  // (only works if you have required the _async-helpers.js file)

  this.Then(/^some other step$/, async function () {
    expect(await board.makeMove(8).throwCheck).to.throw(
      Error,
      'column must be an integer between 0 and 6',
      'Expected makeMove to throw an error on out of bound column'
    );
  });*/


  let game = new Game();
  let board = new Board(game);
    
  let wrongInputArgument;

  this.Given(/^that the argument \-(\d+) is not valid$/, function (negativeNumber) {
   
   // wrongInputArgument = +negativeNumber;

  });

  this.Given(/^that the argument (\d+) is not valid$/, function (toHighNumber) {
    
    wrongInputArgument = +toHighNumber;
  });

  this.Given(/^that the argument "([^"]*)" is not valid$/, function (string) {

    wrongInputArgument = string;
  });

  this.Then(/^the method shall throw an "([^"]*)"$/, async function (expectedErrorMessage) {

    expect(await board.makeMove(wrongInputArgument).throwCheck).to.throw(
      Error, expectedErrorMessage, 'The method did not throw an error'
    );
  });

  this.Given(/^that makeMove is called$/, function () {
   
  });

  this.Then(/^playInProgress shall be set to true$/, function () {

  });

  this.Then(/^the method shall return null$/, function () {
    
  });



}