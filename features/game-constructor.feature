Feature: Play Connect 4
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  # Some random scenarios (out of the many needed)
  # (these have no When - but there will be plenty that have)

  Background:
    Given that a new Game is created
    And a new Board is created

  #scenario för Game-constructor
  Scenario: The constructor in the Game class should call the correct methods when a new game is started
    When a new game is started
    Then the constructor should call the method addEventListener
    And the constructor should call the method start