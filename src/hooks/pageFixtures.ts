// src/hooks/pageFixtures.ts

import { Page, Browser, BrowserContext } from '@playwright/test';

export class PageFixture {
    // Stores the single, long-running browser instance
    public browser!: Browser; 
    
    // Stores the isolated context for the current scenario
    public context!: BrowserContext; 
    
    // Stores the page created within the current context
    public page!: Page; 
}

export const pageFixture = new PageFixture();