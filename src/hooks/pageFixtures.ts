// src/hooks/pageFixtures.ts

import { Page, Browser, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';

export class PageFixture {

     // Base Playwright objects
    page!: Page;
    context!: BrowserContext;
    browser!: Browser;


    // Page Objects
    loginPage!: LoginPage;
    productsPage!: ProductsPage; // Placeholder for future page objects

     // Initialize page objects
    initializePages() {
        this.loginPage = new LoginPage(this.page);
        this.productsPage = new ProductsPage(this.page); // Initialize other page objects similarly
    }
}

export const pageFixture = new PageFixture();