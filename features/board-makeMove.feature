#async makeMove(column)
#Metoden ska vara async.
#Metoden ska ta emot inargumentet column som ska vara ett heltal mellan 0 och 6. Om detta inte är fallet ska felmeddelandet “column must be an integer between 0 and 6” kastas.
#Metoden ska returnera null om egenskapen playInProgress är true.
#Metoden ska returnera false om draget inte går att göra p.g.a. att vald kolumn är full.
#Om draget går att göra ska metoden genomföra dessa steg i ordning:
#Sätta egenskapen playInProgress till true.
#Sätta ut brickan tillfälligt högst upp i kolumnen.
#Anropa metoden render

#Ta bort brickan om den kan falla längre ner.
#Anropa den asynkrona hjälpmetoden sleep för att pausa i 50 ms.
#Om det går: flytta brickan ett steg ner i kolumnen och upprepa från steg 3.
#Anropa metoden winCheck och om den returnerar något som är truthy:
#a) Anropa metoden removeEventListener
#b) Om winCheck har returnerat ett objekt med egenskapen combo så ska metoden markWin med combo-egenskapen från winCheck som inargument anropas.
#c) Anropa egenskapen game:s metod over med egenskapen winner från winChecks returvärde som inargument.
#d) Returnera true
#Sätta egenskapen currentPlayer till 2 om den är 1 och till 1 om den är 2.
#Anropa egenskapen game:s metod tellTurn med currentPlayer-egenskapen som inargument.
#Sätta egenskapen playInProgress till false.
#Returnera true.


Feature: Make a move
  As a connect four player I want to be able to make a move when it's my turn
  so that I can beat my friends in the game and show them that I am smarter than them

  Background:
    Given that a new Game is created
    And a new Board is created

  Scenario Outline: Throw an error if the wrong argument is provided
    Given that the argument <column> is not valid
    Then the method shall throw an <error>

    Examples:
      | column | error                                       |
      | "-1"   | "column must be an integer between 0 and 6" |
      | "8"    | "column must be an integer between 0 and 6" |
      | "hej"  | "column must be an integer between 0 and 6" |


  Scenario: A player makes a move
    Given that makeMove is called
    And playInProgress is set to true
    And the method shall return null

  #===================================
  Scenario:A column on the board is full
    Given that the column has been filled with discs
    When a player tries to play an invalid move
    Then the method shall return false

  Scenario:A valid move is made by a player
    Given that a player makes a valid move
    And playInProgress is, as i should, set to true
    And the disc has been placed on the top of the column
    Then the method should check if there are empty slots in the column
    And call on the method sleep

  Scenario: The method checks för available slots
    When there is a slot available in the column
    Then the method shall move the disc one step down
    And repeat until the column is full

  Scenario: The method winCheck is called upon to check if someone wins
    Given that the method winCheck is called
    When it returns a truthy value
    Then it shall call the method removeEventListener

  Scenario: winCheck returns an object
    Given if winCheck has returned an object with the value combo
    Then it shall call the method markWin with combo as an argumet.
    And call the Game class method over with the value winner from the object returned from winCheck
    And return the value true

  Scenario: The method shall change the current player
    Given that a move is made
    When it is the next players turn
    Then currentPlayer shall change from 1 to 2 or from 2 to 1
    And call the Game class method tellTurn with the argument currentPlayer
    And playInProgress shall change to false
    And the method shall return the value true







