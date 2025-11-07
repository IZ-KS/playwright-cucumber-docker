Feature: List of add to cart scenarios

    Background:
    Given User can access the application

    Scenario Outline: User adds an item to the cart
        And User enters login credentials with username as "<username>" and password as "<password>"
        When User clicks on the login button
        When User adds the product to the cart
        Then The cart icon should get updated



    Examples:
    |  username       | password        | 
    |  standard_user  | secret_sauce    | 
        