Feature: List of User Authentication tests

    Background:
    Given User can access the application

    Scenario Outline: User adds an item to the cart
        And User enters username as "<username>"
        And User enters password as "<password>"
        When User clicks on the login button
        When User adds the product to the cart
        Then The cart icon should get updated



    Examples:
    |  username       | password        | 
    |  standard_user  | secret_sauce    | 
        