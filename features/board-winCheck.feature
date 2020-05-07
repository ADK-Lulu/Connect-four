Feature: Play Connect 4, win check
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  #Class Board method winCheck()
  Scenario Outline: Return an object when a player has won
    Given that a player has won
    Then the method shall return un object with player <number> on the property winner
    And also to that object adding a combo with the winning game as an array of four arrays
    And where the inner arrays contains four different <row1> <col1> <row2> <col2> <row3> <col3> <row4> <col4> positions

    Examples:
      | number | row1 | col1 | row2 | col2 | row3 | col3 | row4 | col4 |
      | 1      | 4    | 0    | 4    | 1    | 4    | 2    | 4    | 3    |
      | 1      | 0    | 2    | 1    | 2    | 2    | 2    | 3    | 2    |
      | 2      | 2    | 6    | 3    | 5    | 4    | 4    | 5    | 3    |
      | 2      | 5    | 0    | 5    | 1    | 5    | 2    | 5    | 3    |

  Scenario: Return an object when it is a draw
    Given that the game is a draw
    Then the method shall return an object with the string draw and winner as property


  Scenario: Provided the game is to continue, no winning move nor a draw
    Given that no player wins and the game is not a draw
    Then the method board-winCheck shall return false

