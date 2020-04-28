Feature: Winning Connect 4

  As someone who wants to complete things
  I want that someone can win a game of Connect 4
  So that the perfectionist in me can be happy

  #Class Game, The method over(won)
  Scenario Outline: Error message when won has wrong argument
    Given that the argument won has the value <value>
    Then the error <error message> will be thrown
    Examples:
      | value      | error message                |
      | "elephant" | "won must be 'draw', 1 or 2" |
      | 3          | "won must be 'draw', 1 or 2" |
      | 1.5        | "won must be 'draw', 1 or 2" |
      | true       | "won must be 'draw', 1 or 2" |
      | ''         | "won must be 'draw', 1 or 2" |

  Scenario: Correct message shown, draw
    Given that the argument won is draw
    Then the message "Det blev oavgjort!" is shown

  Scenario: Correct message shown, red won
    Given that the argument won is 1 for red
    Then the message "Röd vann!" shows that red won

  Scenario: Correct message shown, yellow won
    Given that the argument won is 2 for yellow
    Then the message "Gul vann!" shows that yellow won

  Scenario: Play again button
    Given that the game is over
    And that there is a button in the message element with the class again
    Then I should be able to restart the game

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
      | 2      | 1    | 6    | 2    | 5    | 3    | 4    | 4    | 3    |



  #Denna ska fyllas på
  Scenario: Return an object when it is a draw

  #Denna ska fyllas på
  Scenario: If no one wins and there is not a draw