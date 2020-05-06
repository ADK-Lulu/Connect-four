require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {
  this.After(() => fixNoSuchWindowError(driver));

  let removeEventListenerWasCalled = false;
  let renderWasCalled = false;
  let expectedSentArgumentToMarkWin;
  let expectedSentArgumentToOver;
  let expectedSentArgumentToTellTurn;
  let invalidInput;
  let renderCount;
  let savedValueFromCall;
  let expectedReturn;

  //Mock-class to check....
  class TestBoard extends Board {
    removeEventListener() {
      removeEventListenerWasCalled = true;
    }

    markWin(combo) {
      expectedSentArgumentToMarkWin = combo;
    }
  }

  //Mock-class to check if a disc lands correctly 
  class TestBoardTwo extends Board {
    render() {
      renderCount++;
      renderWasCalled = true;
    }
  }

  //Mock-class to check....
  class TestGame extends Game {
    over(won) {
      expectedSentArgumentToOver = won;
    }

    tellTurn(player) {
      expectedSentArgumentToTellTurn = player;
    }
  }
  class TestGameTwo extends Game {

  }

  //We have different instances of Game/Board for different tests in order to 
  //save the test-data so that it doesn't get destroyed by other tests
  let game = new Game();
  let board = new Board(game);
  let testGame = new TestGame()
  let testBoard = new TestBoard(testGame);
  let fejkGame = new TestGame()
  let validBoard = new TestBoard(fejkGame);
  let testGameTwo = new TestGameTwo();
  let testBoardTwo = new TestBoardTwo(testGameTwo);

  this.Given(/^that a move is made$/, async function () {
    await testBoard.makeMove(4);
  });

  this.When(/^it is the next players turn$/, function () {
    //Gets tested in the next step
  });

  this.Then(/^currentPlayer shall change change between (\d+) and (\d+) when taking turns$/, async function (one, two) {
    expect(testBoard.currentPlayer).to.equal(+two);
    await testBoard.makeMove(4);
    expect(testBoard.currentPlayer).to.equal(+one);
  });

  this.Then(/^every turn call the Game class method tellTurn with the argument currentPlayer$/, async function () {
    expect(expectedSentArgumentToTellTurn).to.equal(1);
    await testBoard.makeMove(4);
    expect(expectedSentArgumentToTellTurn).to.equal(2);
  });

  this.Then(/^playInProgress shall change to false$/, function () {
    expect(testBoard.playInProgress, 'playInProgress was not changed to false').to.be.false;
  });

  this.Then(/^the method shall return the value true$/, async function () {
    expect(await testBoard.makeMove(5)).to.be.true;
  });

  this.Given(/^that the argument "([^"]*)" is not valid$/, function (invalidInput) {
    invalidInput = isNaN(+invalidInput) ? invalidInput : +invalidInput;
  });

  this.Then(/^the method shall throw an "([^"]*)"$/, async function (expectedErrorMessage) {
    expect(await testBoard.makeMove(invalidInput).throwCheck).to.throw(
      Error, expectedErrorMessage, 'The method did not throw an error'
    );
  });

  this.Given(/^that makeMove is called$/, function () {
    //Implemented in next step
  });

  this.Given(/^playInProgress is set to true$/, function () {
    board.playInProgress = true;
  });

  this.Then(/^the method shall return null$/, async function () {
    expect(await board.makeMove(3),
      'The method did not return null').to.be.null;
  });

  this.Given(/^that the column has been filled with discs$/, function () {
    //resets playInProgress
    board.playInProgress = false;
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
    expect(await board.makeMove(0), 'The method didnt return false as expected').to.be.false;
  });

  this.Given(/^that a player makes a valid move$/, async function () {
    board.makeMove(1);
  });

  this.Given(/^playInProgress is, as it should, set to true$/, async function () {
    expect(board.playInProgress, 'playInProgress was not set to true').to.be.true;
  });

  this.Given(/^that there is a slot available in the column$/, function () {
    testBoardTwo.matrix = [
      [0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [1, 0, 0, 1, 2, 2, 0],
      [2, 1, 1, 2, 1, 2, 0],
      [1, 2, 1, 2, 2, 2, 1]
    ];
  });

  this.Then(/^the method shall move the disc to the lowest space possible$/, async function () {
    //resetting currentPlayer to 1 and the renderCount to 0
    testBoardTwo.currentPlayer = 1;
    renderCount = 0;

    expect(testBoardTwo.matrix[2][0]).to.equal(0);
    await testBoardTwo.makeMove(0);
    //makeMove calls on render for each step the disc can move down
    expect(renderWasCalled,
      'Render was not called properly').to.be.true;
    expect(testBoardTwo.matrix[2][0]).to.equal(1);

    //render is called 3 times because the disc dropped
    //3 spaces and therefore the renderCount should equal 3 
    expect(renderCount,
      'Render was not called correct amount of times, should be called 3 times').to.equal(3);
  });

  this.Then(/^the spaces above the dropped disc should be empty$/, function () {
    expect(testBoardTwo.matrix[0][0]).to.equal(0);
    expect(testBoardTwo.matrix[1][0]).to.equal(0);
  });

  this.Given(/^that the method winCheck is called$/, async function () {
    //new instance with a prepared board for a win for player 1 
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

  this.When(/^it returns a truthy value$/, function () {
    expectedReturn = { winner: 1, combo: [[4, 2], [4, 3], [4, 4], [4, 5]] }

    expect(validBoard.winCheck()).to.deep.equal(expectedReturn,
      'winCheck does not return anything truthy');
  });

  this.Then(/^it shall call the method removeEventListener$/, function () {
    expect(removeEventListenerWasCalled).to.be.true;
  });

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

