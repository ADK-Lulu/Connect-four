Feature: Play Connect 4, start game
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  Background:
    Given that a new Game is created
    And a new Board is created


  Scenario: A new Game creates a new board
    Then it should create a new Board

  Scenario: players can input their names
    When the players input their names a new instance of Board shall be made
    And the names shall be saved in the names array

  Scenario Outline: One or more player does not enter their name
    Given that <player> does not enter a name
    And presses enter or cancel
    Then <player> should be set to <defaultColor>

    Examples:
      | player  | defaultColor |
      | player1 | "Röd"        |
      | player2 | "Gul"        |

  