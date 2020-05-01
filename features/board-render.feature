Feature: Play Connect 4, render board
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  # Some random scenarios (out of the many needed)
  # (these have no When - but there will be plenty that have)

  Background:
    Given that a new Game is created
    And a new Board is created

  #Scenario för render() i Board
  Scenario Outline: Render shall change color on the div-elements in DOM depending on which player is the current one
    When <number> is the value of the currentPlayer
    And the currentPlayer has made a move and placed a disc on index <row> and <col>
    Then <color> will be the chosen color on the div by help from the css-class board

    Examples:
      | number | row | col | color    |
      | 1      | 0   | 0   | "red"    |
      | 2      | 0   | 1   | "yellow" |

  Scenario: A board adds 42 divs to the .board element
    Then it should render 42 divs as children of the board element

  Scenario: Render should make 42 empty div elements inside of every element
    When the matrix is rendered it should have empty div elements inside of a div

