Feature: Play Connect 4, start game
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  Background:
    Given that a new Game is created
    And a new Board is created


  Scenario: A new Game creates a new board
    Then it should create a new Board

