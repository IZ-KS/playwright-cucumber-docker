import { Given, Then, When } from '@cucumber/cucumber';
import { expect, chromium, Browser, Page } from 'playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';

Given('User is logged in as {string}', async function (username: string) {
    await pageFixture.page.locator('#user-name').fill(username);
    await pageFixture.page.locator('#password').fill('secret_sauce');
    await pageFixture.page.locator('#login-button').click();
    await pageFixture.page.waitForURL('**/inventory.html', { timeout: 10000 });
    await pageFixture.page.waitForLoadState('networkidle');
});

When('User adds {string} to the cart', async function (productName: string) {
    // Convert product name to ID format
    // "Sauce Labs Backpack" → "sauce-labs-backpack"
    const productId = productName.toLowerCase().replace(/\s+/g, '-');
    
    await pageFixture.page.waitForSelector(`#add-to-cart-${productId}`, { 
        state: 'visible',
        timeout: 10000 
    });
    await pageFixture.page.locator(`#add-to-cart-${productId}`).click();
});

Then('The cart icon should show {int} item(s)', async function (count: number) {
    if (count === 0) {
        await expect(pageFixture.page.locator('.shopping_cart_badge')).not.toBeVisible();
    } else {
        await pageFixture.page.waitForSelector('.shopping_cart_badge', { timeout: 5000 });
        const cartBadge = await pageFixture.page.locator('.shopping_cart_badge').textContent();
        expect(Number(cartBadge)).toBe(count);
    }
});

When('User adds the second product to the cart', async function () {
    await pageFixture.page.waitForSelector('#add-to-cart-sauce-labs-bike-light', { 
        state: 'visible',
        timeout: 10000 
    });
    await pageFixture.page.locator('#add-to-cart-sauce-labs-bike-light').click();
});