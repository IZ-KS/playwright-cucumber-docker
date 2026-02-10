import { Page, expect } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) {}

    private addToCartButton = (productName: string) => `#add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}`;
    private cartBadge = '.shopping_cart_badge';
    
    // Actions
    async addProductToCart(productName: string) {
        await this.page.locator(this.addToCartButton(productName)).click();
    }

    // Assertions
    async verifyProductAddedToCart(count: number) {
        if (count === 0) {
            await expect(this.page.locator(this.cartBadge)).not.toBeVisible();
        } else {
            await this.page.waitForSelector(this.cartBadge, { timeout: 5000 });
            const cartBadgeText = await this.page.locator(this.cartBadge).textContent();
            expect(Number(cartBadgeText)).toBe(count);
        }
    }
}