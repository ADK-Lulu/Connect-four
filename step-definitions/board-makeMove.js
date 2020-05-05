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

  let removeEventListenerWasCalled = false;
  let expectedSentArgumentToMarkWin;
  let expectedSentArgumentToOver;
  let expectedSentArgumentToTellTurn;
  let renderWasCalled = false;
  let makeMoveColumn;
  let makeMoveRow;

  class TestBoard extends Board {

    removeEventListener() {
      removeEventListenerWasCalled = true;
    }

    markWin(combo) {
      expectedSentArgumentToMarkWin = combo;
    }
    render() {
      renderWasCalled = true;
    }

    makeMove(column) {
      makeMoveColumn = column;
      //makeMoveRow = row;
    }

  }
  class TestGame extends Game {

    over(won) { expectedSentArgumentToOver = won; }

    tellTurn(player) { expectedSentArgumentToTellTurn = player; }
  }

  let game = new Game();
  let board = new Board(game);
  let testGame = new TestGame()
  let fejkGame = new TestGame()
  let testGameTwo = new TestGame();
  let validBoard = new TestBoard(fejkGame);
  let testBoard = new TestBoard(testGame);
  let testBoardTwo = new TestBoard(testGameTwo);

  let invalidInput;

  //===The method shall change the current player===
  this.Given(/^that a move is made$/, async function () {

    await testBoard.makeMove(4)
  });

  this.When(/^it is the next players turn$/, function () {
    //down below
  });

  this.Then(/^currentPlayer shall change change between (\d+) and (\d+) when taking turns$/, async function (one, two) {

    expect(testBoard.currentPlayer).to.equal(+two);
    await testBoard.makeMove(4);
    expect(testBoard.currentPlayer).to.equal(+one);

  });

  this.Then(/^every turn call the Game class method tellTurn with the argument currentPlayer$/, async function () {

    expect(expectedSentArgumentToTellTurn).to.equal(1)
    await testBoard.makeMove(4)
    expect(expectedSentArgumentToTellTurn).to.equal(2)
  });

  this.Then(/^playInProgress shall change to false$/, function () {
    expect(testBoard.playInProgress, 'playInProgress was not changed to false').to.be.false;
  });


  this.Then(/^the method shall return the value true$/, async function () {
    expect(await testBoard.makeMove(5)).to.be.true;
  });

  //====Throw an error if the wrong argument is provided====
  this.Given(/^that the argument "([^"]*)" is not valid$/, function (invalidInput) {

    invalidInput = isNaN(+invalidInput) ? invalidInput : +invalidInput;

  });

  this.Then(/^the method shall throw an "([^"]*)"$/, async function (expectedErrorMessage) {

    expect(await board.makeMove(invalidInput).throwCheck).to.throw(
      Error, expectedErrorMessage, 'The method did not throw an error'
    );
  });

  //===== A player makes a move====
  this.Given(/^that makeMove is called$/, function () {
    // Will do in next step
  });

  this.Given(/^playInProgress is set to true$/, function () {
    board.playInProgress = true;

  });

  this.Then(/^the method shall return null$/, async function () {


    expect(await board.makeMove(3),
      'PlayInProgress was true but the method did not return null').to.be.null;

  });
  //====A column on the board is full====
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

  this.Then(/^the makeMove method shall return false$/, async function () {
    board.playInProgress = false;
    expect(await board.makeMove(0), 'the method didnt return false as expected').to.be.false;
  });


  //=====Scenario:A valid move is made by a player===
  this.Given(/^that a player makes a valid move$/, async function () {

    testBoard.makeMove(1);

  });

  this.Given(/^playInProgress is, as it should, set to true$/, async function () {

    expect(testBoard.playInProgress, 'playInProgress was not set to true').to.be.true;
  });

  //TODO ingen aning om vad jag ska göra här
  this.When(/^the disc has been placed on the top of the column$/, function () {
    //
  });

  //TODO och hur kollar jag det?
  this.Then(/^the method should check if there are empty slots in the column$/, function () {
    //
  });

  //TODO hurdå? Frågat Thomas om sleep
  this.Then(/^call on the method sleep$/, function () {
    //
  });

  //Ullis-kollar
  this.Given(/^that there is a slot available in the column$/, function () {
    //Nollställer variabeln renderWasCalled
    renderWasCalled = false;
    testBoardTwo.matrix = [
      [0, 0, 0, 0, 0, 1, 0],
      [2, 0, 0, 0, 0, 1, 0],
      [2, 0, 0, 0, 0, 1, 0],
      [1, 0, 0, 1, 2, 2, 0],
      [2, 1, 1, 2, 1, 2, 0],
      [1, 2, 1, 2, 2, 2, 1],
    ];

    console.log('Hello there', makeMoveColumn)
    if (testBoardTwo.matrix[0][makeMoveColumn]) {
      console.log('General Kenobi');
      return false;
    } else {
      console.log('Nooooo')
    }
    console.log(makeMoveColumn)
    //Nollställer makeMove innan man går in i while-loopen
    //Använder while loop då vi använder en for-loop i program-koden
    makeMoveRow = 0;
    while (makeMoveRow < testBoardTwo.matrix.length) {
      if (testBoardTwo.matrix[makeMoveRow][makeMoveColumn] === 0) {
        testBoardTwo.matrix[makeMoveRow][makeMoveColumn] = testBoardTwo.currentPlayer;
      }
      testBoardTwo.render();
      expect(renderWasCalled).to.be.true;
      makeMoveRow++
    }

  });

  this.Then(/^the method shall move the disc one step down$/, function () {
    throw (new Error('No more tests have been written'));
    /*
    //flytta brickan ett steg ner i kolumnen
    if (row + 1 < 6) {
      if (this.matrix[row + 1][column] !== 0) {
        break;
      }
      else if (this.matrix[row][column] = 0) {
        this.playInProgress = false
      }
    }
    */
  });

  this.Then(/^repeat until the column is full$/, function () {
    throw (new Error('No more tests have been written'));
    //Anropa render?
  });


  let savedValueFromCall;
  //===The method winCheck is called upon to check if someone wins===
  this.Given(/^that the method winCheck is called$/, async function () {
    //winning game to use

    validBoard.matrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 0, 1, 0, 0],
      [2, 2, 1, 1, 1, 0, 0],
      [1, 1, 1, 2, 2, 2, 0]
    ];
    savedValueFromCall = await validBoard.makeMove(5);
  });

  let expectedReturn;
  this.When(/^it returns a truthy value$/, async function () {

    expectedReturn = { winner: 1, combo: [[4, 2], [4, 3], [4, 4], [4, 5]] }

    expect(validBoard.winCheck()).to.deep.equal(expectedReturn,
      'does not return anything truthy');

  });

  this.Then(/^it shall call the method removeEventListener$/, async function () {

    expect(removeEventListenerWasCalled).to.be.true;

  });

  //===winCheck returns an object===
  this.Given(/^if winCheck has returned an object with the value combo$/, function () {

    let expectedProp = "combo";
    expect(validBoard.winCheck()).to.have.any.keys(expectedProp,
      'winCheck did not return an object with property combo')

  });

  this.Then(/^it shall call the method markWin with combo as an argumet\.$/, function () {
    expect(expectedSentArgumentToMarkWin,
      'wrong argument was delivered as an argument to markWin').to.deep.equal(expectedReturn.combo);
  });


  this.Then(/^call the Game class method over with the value winner from the object returned from winCheck$/, function () {

    expect(expectedSentArgumentToOver).to.equal(expectedReturn.winner);
  });


  this.Then(/^return the value true$/, async function () {

    expect(savedValueFromCall).to.be.true;
  });



}

