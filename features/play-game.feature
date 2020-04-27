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
