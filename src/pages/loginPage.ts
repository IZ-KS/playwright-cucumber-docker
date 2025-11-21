import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    // Locators
    private usernameInput = '#user-name';
    private passwordInput = '#password';
    private loginButton = '#login-button';
    private errorMessage = '.error-message-container';

    // Actions
    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
        await expect(this.page).toHaveURL('https://www.saucedemo.com/');
    }

    async enterUsername(username: string) {
        await this.page.locator(this.usernameInput).fill(username);
    }

    async enterPassword(password: string) {
        await this.page.locator(this.passwordInput).fill(password);
    }

    async clickLogin() {
        await this.page.locator(this.loginButton).click();
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    // Assertions
    async verifyErrorMessage() {
        const error = this.page.locator(this.errorMessage);
        await expect(error).toBeVisible();
    }
}