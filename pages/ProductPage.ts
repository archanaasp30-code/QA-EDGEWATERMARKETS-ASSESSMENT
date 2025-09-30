import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getPrice(): Promise<number> {
    const priceText = await this.page.locator('.price-container').innerText();
    return parseInt(priceText.replace(/[^0-9]/g, ''), 10);
  }

  async addToCart(times: number = 1) {
    for (let i = 0; i < times; i++) {
      await this.page.click('text=Add to cart');
      await this.page.waitForTimeout(1000);
      await this.page.once('dialog', dialog => dialog.accept());
    }
  }

  async goHome() {
    await this.page.click('a.navbar-brand');
  }
}