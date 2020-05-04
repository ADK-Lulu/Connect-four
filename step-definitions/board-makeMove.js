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

  let invalidInput;



  this.Given(/^that the argument "([^"]*)" is not valid$/, function (invalidInput) {

    invalidInput = isNaN(+invalidInput) ? invalidInput : +invalidInput;

  });

  this.Then(/^the method shall throw an "([^"]*)"$/, async function (expectedErrorMessage) {

    expect(await board.makeMove(invalidInput).throwCheck).to.throw(
      Error, expectedErrorMessage, 'The method did not throw an error'
    );
  });

  this.Given(/^that makeMove is called$/, function () {
    // Will do in next step
  });

  this.Given(/^playInProgress is set to true$/, function () {
    board.playInProgress = true;

  });

  //TODO Med setter istället Denna befintliga, kollar ifall anropet  funkar, men inte ifall jag får null på riktigt i programkoden
  this.Then(/^the method shall return null$/, async function () {


    expect(await board.makeMove(3),
      'PlayInProgress was true but the method did not return null').to.be.null;

  });

  this.Given(/^that the column has been filled with discs$/, function () {
    board.matrix[0][0] = 1
    board.matrix[1][0] = 2
    board.matrix[2][0] = 2
    board.matrix[3][0] = 1
    board.matrix[4][0] = 1
    board.matrix[5][0] = 1

  });

  this.When(/^a player tries to play an invalid move$/, function () {
    //implemented in the next step
  });
  //TODO kanske med hjälp av setter
  this.Then(/^the makeMove method shall return false$/, async function () {
    board.playInProgress = false;
    expect(await board.makeMove(0), 'the method didnt return false as expected').to.be.false;
  });


  this.Given(/^that a player makes a valid move$/, function () {
    //
  });

  this.Given(/^playInProgress is, as it should, set to true$/, function () {
    //
  });


  this.When(/^the disc has been placed on the top of the column$/, function () {
    //
  });


  this.Then(/^the method should check if there are empty slots in the column$/, function () {
    //
  });


  this.Then(/^call on the method sleep$/, function () {
    //
  });



}

