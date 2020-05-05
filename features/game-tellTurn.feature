Feature: Play Connect 4, tell turn game
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  #(tellTurn() ska ta emot inargumentet player som ska vara ett heltal (1 eller 2).

  

  Scenario: players can input their names
    When the players input their names a new instance of Board shall be made

  Scenario Outline: One or more player does not enter their name
    Given that <player> does not enter a name
    And presses enter or cancel
    Then <player> should be set to <defaultColor>

    Examples:
      | player  | defaultColor |
      | player1 | "Röd"        |
      | player2 | "Gul"        |
      
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