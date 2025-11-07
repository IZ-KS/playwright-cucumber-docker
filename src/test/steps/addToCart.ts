import { Given, Then, When } from '@cucumber/cucumber';
import { expect, chromium, Browser, Page } from 'playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';


When('User adds the product to the cart', async function () {
    await pageFixture.page.locator('#add-to-cart-sauce-labs-backpack').click();
});

Then('The cart icon should get updated', async function () {
    const cartBadge = pageFixture.page.locator('.shopping_cart_badge');
    expect(Number(await cartBadge.textContent())).toBeGreaterThan(0);
});