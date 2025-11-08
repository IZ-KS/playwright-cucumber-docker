Feature: List of checkout complete scenarios

    Background:
        Given User can access the application

    Scenario Outline: User successfully completes checkout
        And User enters login credentials with username as "<username>" and password as "<password>"
        And User clicks on the login button
        And User adds the product to the cart
        When User proceeds to checkout
        And Users enters the necessary checkout information
        Then The order should be completed successfully
        
        Examples:
            | username      | password     | 
            | standard_user | secret_sauce | 

    Scenario Outline: User checkout fails with missing information
        And User enters login credentials with username as "<username>" and password as "<password>"
        And User clicks on the login button
        And User adds the product to the cart
        When User proceeds to checkout
        And Users did not enters the necessary checkout information
        Then The order should be failed
        
        Examples:
            | username      | password     | 
            | standard_user | secret_sauce |