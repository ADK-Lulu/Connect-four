Feature: Make a move
  As a connect four player I want to be able to make a move when it's my turn
  so that I can beat my friends in the game and show them that I am smarter than them

  Background:
    Given that a new Game is created
    And a new Board is created

  Scenario: The method shall change the current player
    Given that a move is made
    When it is the next players turn
    Then currentPlayer shall change change between 1 and 2 when taking turns
    And every turn call the Game class method tellTurn with the argument currentPlayer
    And playInProgress shall change to false
    And the method shall return the value true

  Scenario Outline: Throw an error if the wrong argument is provided
    Given that the argument <column> is not valid
    Then the method shall throw an <error>

    Examples:
      | column | error                                       |
      | "-1"   | "column must be an integer between 0 and 6" |
      | "8"    | "column must be an integer between 0 and 6" |
      | "hej"  | "column must be an integer between 0 and 6" |

  Scenario: A player makes a move
    Given that makeMove is called
    And playInProgress is set to true
    And the method shall return null

  Scenario:A column on the board is full
    Given that the column has been filled with discs
    When a player tries to play an invalid move
    Then the makeMove method shall return false

  Scenario:A valid move is made by a player
    Given that a player makes a valid move
    And playInProgress is, as it should, set to true

  Scenario: The method checks för available slots
    Given that there is a slot available in the column
    Then the method shall move the disc to the lowest space possible
    And the spaces above the dropped disc should be empty

  Scenario: The method winCheck is called upon to check if someone wins
    Given that the method winCheck is called
    When it returns a truthy value
    Then it shall call the method removeEventListener

  Scenario: winCheck returns an object
    Given if winCheck has returned an object with the value combo
    Then it shall call the method markWin with combo as an argumet.
    And call the Game class method over with the value winner from the object returned from winCheck
    And return the value true

