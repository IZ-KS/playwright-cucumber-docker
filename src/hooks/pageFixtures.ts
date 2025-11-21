// src/hooks/pageFixtures.ts

import { Page, Browser, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

export class PageFixture {

     // Base Playwright objects
    page!: Page;
    context!: BrowserContext;
    browser!: Browser;


    // Page Objects
    loginPage!: LoginPage;

     // Initialize page objects
    initializePages() {
        this.loginPage = new LoginPage(this.page);
    }
}

export const pageFixture = new PageFixture();