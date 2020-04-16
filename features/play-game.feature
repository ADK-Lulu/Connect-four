Feature: Play Connect 4
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  # Some random scenarios (out of the many needed)
  # (these have no When - but there will be plenty that have)

  Scenario: A new Game creates a new board
    Given that a new Game is created
    Then it should create a new Board

  Scenario: A board adds 42 divs to the .board element
    Given that a new Board is created
    Then it should render 42 divs as children of the board element

  #Metoden (tell-turn-player() ska ta emot inargumentet player som ska vara ett heltal (1 eller 2).
  #Om så inte är fallet ska felet “player must be 1 or 2” kastas.
  #Metoden ska ta tag i DOM-elementet med css-klassen message och byta
  #dess innehåll till texten “Röds tur…” om player har värdet 1 och till texten “Guls tur…” om player har värdet 2.

  Background:
    Given that a new Game is created
    And a new Board is created.

  Scenario: User tries to call tellTurn() with unvalid value
    When the argument is anything else but 1 or 2
    Then the machinge will throw “player must be 1 or 2”

  Scenario Outline: Machine displays <message> when it is next users time to play
    When <player> has droped a disc
    Then the machine should <message>

    Examples:
      | player   | message       |
      | player 1 | 'Röds tur...' |
      | player 2 | 'Guls tur...' |

