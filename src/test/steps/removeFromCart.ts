import { Given, Then, When } from '@cucumber/cucumber';
import { expect, chromium, Browser, Page } from 'playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';

When('User removes the product from the cart', async function () {
    await pageFixture.page.locator('#remove-sauce-labs-backpack').click();
});

Then('The cart icon remain unchanged', async function () {
    const cartBadge = pageFixture.page.locator('.shopping_cart_badge');
    expect(await cartBadge.count()).toBe(0);
});