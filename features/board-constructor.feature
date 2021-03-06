Feature: Play Connect 4, constructor board
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  Background:
    Given that a new Game is created
    And a new Board is created

  #scenario för Board-constructor
  Scenario: The constructor should set the correct properties when a new game is created
    Given that game is an instance of class Game
    Then game is set to the value of the parameter passed to the constructor in Board
    And matrix should be set to an array of 6 elements
    And each element should be set to a array of 7 elements
    And each element should have the value of 0
    And currentPlayer should be set to the value 1
    And playInProgress should be set to false

  Scenario: The constructor should call the correct methods when a new game is created
    When a new game is started
    Then the constructor should call addEventListener
    And the constructor should call the method render
    And it should call tellTurn with currentPlayer as an argument

