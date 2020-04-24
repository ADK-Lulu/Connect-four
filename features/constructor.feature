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

  #scenario för Board-constructor
  Scenario: The constructor should set the correct properties when a new game is created
    Given that game is an instance of class Game
    When game is set to the value of constructor-game
    Then matrix should be set to an array of 6 elements
    And each element should be set to a array of 7 elements
    And each element should have the value of 0
    And currentPlayer should be set to the value 1
    And playInProgress should be set to false

  Scenario: The constructor should call the correct methods when a new game is created
    When a new game is started
    Then the constructor should call addEventListener
    And the constructor should call the method render
    And it should call tellTurn with currentPlayer as a argument