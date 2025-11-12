Feature: Shopping Cart Functionality

    Background:
        Given User can access the application
        And User is logged in as "standard_user"

    Scenario: Add single item to cart
        When User adds "Sauce Labs Backpack" to the cart
        Then The cart icon should show 1 item

    Scenario: Add multiple items to cart
        When User adds "Sauce Labs Backpack" to the cart
        And User adds "Sauce Labs Bike Light" to the cart
        Then The cart icon should show 2 items