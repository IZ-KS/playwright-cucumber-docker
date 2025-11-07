import { Page } from '@playwright/test';

export class PageFixture {
    page!: Page;
}

export const pageFixture = new PageFixture();