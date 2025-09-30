import { Page, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.click('#cartur');
    }

    async verifyProductListed(keyword: string) {
        await expect(this.page.locator('#tbodyid')).toContainText(keyword);
    }

    async getCartTotal(): Promise<number> {
        const totalText = await this.page.locator('#totalp').innerText();
        return parseInt(totalText.trim(), 10);
    }

    async getCartProductNames(): Promise<string[]> {
        return await this.page.locator('#tbodyid tr td:nth-child(2)').allInnerTexts();
    }


    async getCartProductPrices(): Promise<number[]> {
        const texts = await this.page.locator('#tbodyid tr td:nth-child(3)').allInnerTexts();
        return texts.map(t => parseInt(t.replace(/[^\d]/g, ''), 10));
    }
}