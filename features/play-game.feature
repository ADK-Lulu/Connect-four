Feature: Play Connect 4
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  # Some random scenarios (out of the many needed)
  # (these have no When - but there will be plenty that have)

  Background:
    Given that a new Game is created
    And a new Board is created


  Scenario: A new Game creates a new board
    Then it should create a new Board


  Scenario: A board adds 42 divs to the .board element
    Then it should render 42 divs as children of the board element

  #(tellTurn() ska ta emot inargumentet player som ska vara ett heltal (1 eller 2).

  Scenario Outline: User tries to call tellTurn() with <unvalid> value
    When the argument is <unvalid>
    Then the machine will throw <message>

    Examples:
      | unvalid   | message                 |
      | "elefant" | "player must be 1 or 2" |
      | 3         | "player must be 1 or 2" |
      | 1.5       | "player must be 1 or 2" |

  Scenario Outline: Machine displays <message> when it is next users time to play
    When player <playerNumber> has droped a disc
    Then the machine should display <message>

    Examples:
      | playerNumber | message       |
      | 1            | "Röds tur..." |
      | 2            | "Guls tur..." |

 #scenario för constuctor(game)
  Scenario: The correct properties should be set when a new game i created
    Given that game is an instance of class Game
    When game is set to the value of constructor-game
    Then matrix should be set to an array of 6 elements
    And each element should be set to a array of 7 elements
    And each element should have the value of 0
    And currentPlayer should be set to the value 1
    And playInProgress should be set to false
    And the method should call addEventListener() 
    And the method should call the method render()
    And it should call tellTurn() with currentPlayer as a argument
    

  #Game-over(won)
  Scenario Outline: Error message when won has wrong argument
    Given that the argument won is not <value>
    Then the error 'won must be "draw", 1 or 2' will be thrown

    Examples:
      | value |
      | draw  |
      | 1     |
      | 2     |

  Scenario Outline: Correct message shown
    Given that the argument won is <value>
    Then the message <message> is shown

    Examples:
      | value | message             |
      | draw  | "Det blev oavgjort" |
      | 1     | "Röd vann!"         |
      | 2     | "Gul vann!"         |
  Scenario: Play again button
    Given that the game is over
    And that there is a button in the .message element with the class .again
    When I press the button
    Then the game should restart
