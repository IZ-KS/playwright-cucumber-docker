import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';

Given('User is logged in as {string}', async function (username: string) {
    await pageFixture.loginPage.login(username, 'secret_sauce');
    await pageFixture.page.waitForURL('**/inventory.html', { timeout: 10000 });
    await pageFixture.page.waitForLoadState('networkidle');
});

When('User adds {string} to the cart', async function (productName: string) {
    await pageFixture.productsPage.addProductToCart(productName);
});

Then('The cart icon should show {int} item(s)', async function (count: number) {
    await pageFixture.productsPage.verifyProductAddedToCart(count);
});

When('User adds the second product to the cart', async function () {
    await pageFixture.productsPage.addProductToCart('Sauce Labs Bike Light');
});