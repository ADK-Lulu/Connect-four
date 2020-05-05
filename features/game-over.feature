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
      | "3"        | "won must be 'draw', 1 or 2" |
      | "1.5"      | "won must be 'draw', 1 or 2" |
      | "true"     | "won must be 'draw', 1 or 2" |
      | ""         | "won must be 'draw', 1 or 2" |

  Scenario: Correct message shown, draw
    Given that the argument won is draw
    Then the message "Det blev oavgjort!" is shown

  Scenario Outline: Correct message shown, depending on winner
    Given that the argument <won> is provided
    Then the winning players name <value> shall be seen in a <message> on the screen

    Examples:
      | won | value    | message        |
      | 1   | "Röd"    | "Röd vann!"    |
      | 1   | "Anders" | "Anders vann!" |
      | 1   | "Sonny"  | "Sonny vann!"  |
      | 2   | "Gul"    | "Gul vann!"    |
      | 2   | "Agnes"  | "Agnes vann!"  |
      | 2   | "Sara"   | "Sara vann!"   |



  Scenario: Play again button
    Given that there is a button in the message element with the class again

