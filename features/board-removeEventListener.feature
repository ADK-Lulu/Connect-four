Feature: Play Connect 4, removeEventListener
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  Scenario: remove the eventListener
    Given that the removeEventListener function has been called
    Then I should be able to change a variable


# let orgRemoveFunc = document.removeEventListener;
#document.removeEventListener = (type, func)
#{.... some code that changes a variable I use in my test...}
#// my excpects etc

#// then restore  to real method
#document.removeEventListener = orgRemoveFunc