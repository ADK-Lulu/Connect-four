Feature: Play Connect 4, mark win
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  Scenario: Mark a win
    Given that there is a combo
    Then there should be something with the class win

  Scenario: Correct combo
    Given that a player has won the game
    And that the argument combo is an "array" with 4 elements
    And that each element is an "array" with 2 numbers