import { Given, Then, When } from '@cucumber/cucumber';
import { expect, chromium, Browser, Page } from 'playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';


Given('User can access the application', async function () {
    await pageFixture.loginPage.goto();
    //expect(pageFixture.loginPage.url()).toBe('https://www.saucedemo.com/');
    //expect(await pageFixture.loginPage.title()).toBe('Swag Labs');
});

Given('User enters login credentials with username as {string} and password as {string}', 
    async function (username : string, password : string) {   
    await pageFixture.loginPage.enterUsername(username);
    await pageFixture.loginPage.enterPassword(password);
    console.log('Password entered ' + password);
});

When('User clicks on the login button', async function () {   
    await pageFixture.loginPage.clickLogin();
});

Then('User should be redirected to the homepage', async function () {
    await expect(pageFixture.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    console.log('User logged in successfully');
});

When('Login fails', async function () {
    await pageFixture.loginPage.verifyErrorMessage();
    // const errorLocator = pageFixture.page.locator('.error-message-container');
    // await expect(errorLocator).toBeVisible();
});


