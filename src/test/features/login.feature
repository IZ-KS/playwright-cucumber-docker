Feature: List of User Authentication tests

    Background:
    Given User can access the application

  Scenario: Successful login with valid credentials
    And User enters username as "standard_user"
    And User enters password as "secret_sauce"
    And User clicks on the login button
    Then User should be redirected to the homepage

  Scenario: Unsuccessful login with locked out credentials
    Given User enters username as "locked_out_user"
    And User enters password as "secret_sauce"
    And User clicks on the login button
    Then Login fails
