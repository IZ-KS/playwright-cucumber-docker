import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright/test'; // Note: Used 'playwright/test' for the types
import { pageFixture } from './pageFixtures';    

// Declare global variables to hold the Browser and Context
let browser: Browser;
let context: BrowserContext; 

// --- 1. Global Browser Setup (Runs ONCE before all scenarios) ---
BeforeAll(async function () {
    // Launch the browser once
    browser = await chromium.launch({ headless: true }); // Set to true for best performance/CI
    pageFixture.browser = browser;
});

// --- 2. Context/Page Setup (Runs before EACH scenario) ---
Before(async function () {
    context = await browser.newContext();
    pageFixture.context = context; // Store the context in the fixture
    
    // Create a NEW page in the clean context
    pageFixture.page = await context.newPage();
});

// --- 3. Context/Page Cleanup (Runs after EACH scenario) ---
After(async function () {
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