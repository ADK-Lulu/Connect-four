Feature: Play Connect 4, tell turn game
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  Background:
    Given that a new Game is created
    And a new Board is created

 
  Scenario Outline: CurrentPlayer is set to <unvalid>
    When the argument is <unvalid>
    Then the method tellTurn will throw <message>

    Examples:
      | unvalid   | message                 |
      | "elefant" | "player must be 1 or 2" |
      | "3"       | "player must be 1 or 2" |
      | "1.5"     | "player must be 1 or 2" |

  Scenario Outline: Game displays <message> when it is next users time to play
    Given that the players has not entered their names 
    When <playerNumber> has droped a disc
    Then the game should display <message>

    Examples:
      | playerNumber | message       |
      | player1      | "Röds tur..." |
      | player2      | "Guls tur..." |

  Scenario: A players name ends with s
  When a players name ends with the letter 's'
  Then the letter shall be replaced with an empty string