Feature: List of remove from cart scenarios

    Background:
    Given User can access the application   
   
    Scenario Outline: User adds an item to the cart
        And User enters login credentials with username as "<username>" and password as "<password>"
        And User clicks on the login button
        When User adds "Sauce Labs Backpack" to the cart
        And User removes the product from the cart
        Then The cart icon remain unchanged
        
    Examples:
    |  username       | password        | 
    |  standard_user  | secret_sauce    | 
        