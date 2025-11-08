import { Given, Then, When } from '@cucumber/cucumber';
import { expect, chromium, Browser, Page } from 'playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';


When ('User proceeds to checkout', async function () {
    await pageFixture.page.locator('#shopping_cart_container').click();
    await pageFixture.page.locator('#checkout').click();
    console.log('User checkout clicked');
});

When ('Users enters the necessary checkout information', async function () {
    await pageFixture.page.locator('#first-name').fill('John');
    await pageFixture.page.locator('#last-name').fill('Doe');
    await pageFixture.page.locator('#postal-code').fill('12345');
    await pageFixture.page.locator('#continue').click();
});

Then ('The order should be completed successfully', async function () {
    await pageFixture.page.locator('#finish').click();
    const confirmationMessage = pageFixture.page.locator('.complete-header');
    await expect(confirmationMessage).toHaveText('Thank you for your order!');
    console.log('Order completed successfully');
});

When ('Users did not enters the necessary checkout information', async function () {
    await pageFixture.page.locator('#continue').click();
});

Then ('The order should be failed', async function () {
    const errorMessage = pageFixture.page.locator('.error-message-container');
    await expect(errorMessage).toHaveText('Error: First Name is required');
    console.log('Order failed successfully');
});