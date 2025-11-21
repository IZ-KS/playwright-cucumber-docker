import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { pageFixture } from './pageFixtures';

// Declare global variable to hold the Browser
let browser: Browser;

// --- 1. Global Browser Setup (Runs ONCE before all scenarios) ---
BeforeAll(async function () {
    // Launch the browser once
    browser = await chromium.launch({ headless: true }); // Set to true for best performance/CI
    pageFixture.browser = browser;
});

// --- 2. Context/Page Setup (Runs before EACH scenario) ---
Before(async function () {
    // Create a NEW context for each scenario
    const context = await browser.newContext();
    pageFixture.context = context;
    
    // Create a NEW page in the clean context
    pageFixture.page = await context.newPage();
    
    // Initialize all page objects with the new page
    pageFixture.initializePages();
});

// --- 3. Context/Page Cleanup (Runs after EACH scenario) ---
After(async function ({ pickle, result }) {
    // Take screenshot on failure or always (depending on your preference)
    if (result?.status === Status.FAILED) {
        const img = await pageFixture.page.screenshot({
            path: `./test-results/screenshots/${pickle.name}.png`,
            type: 'png',
            fullPage: true
        });
        await this.attach(img, 'image/png');
    }
    
    // Close the context, which automatically closes the page and clears all session data
    if (pageFixture.context) {
        await pageFixture.context.close();
    }
});

// --- 4. Global Browser Cleanup (Runs ONCE after all scenarios) ---
AfterAll(async function () {
    // Close the browser once all scenarios are complete
    if (pageFixture.browser) {
        await pageFixture.browser.close();
    }
});