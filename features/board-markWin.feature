Feature: Play Connect 4, mark win
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  #Class Board method markWin(combo)
  Scenario: Mark a win
    Given that there is a combo
    Then there should be something with the class win
