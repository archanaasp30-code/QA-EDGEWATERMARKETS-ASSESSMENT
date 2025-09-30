import { Page, Locator , expect } from '@playwright/test'

export class HomePage {
    readonly page: Page;
    readonly productLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productLinks = page.locator('.card-title a');
    }
    async goto() {
        await this.page.goto('/');
    }
    async selectProductKeyword(keyword: string) {
        await this.page.waitForSelector('.card-title a');
        const product = this.productLinks.filter({ hasText: keyword }).first();
        await expect(product).toBeVisible({ timeout: 10000 });
        await product.click();
    }
}