import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Demoblaze Cart Automation', () => {
  const products = [
    { name: 'Samsung galaxy s6', keyword: 'Samsung galaxy s6' },
    { name: 'Nexus 6', keyword: 'Nexus 6' },
    { name: 'Iphone 6 32gb', keyword: 'Iphone 6 32gb' },
    { name: 'Sony vaio i7', keyword: 'Sony vaio i7' },
  ];

  test('Validate cart with price rules', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    let expectedTotal = 0;

    for (const product of products) {
      await homePage.goto();
      await homePage.selectProductKeyword(product.keyword);

      const price = await productPage.getPrice();

      if (price >= 500 && price <= 1000) {
        await productPage.addToCart(1);
        expectedTotal += price;
      } else if (price < 500) {
        await productPage.addToCart(2);
        expectedTotal += price * 2;
      }
      await productPage.goHome();
    }
    await cartPage.goto();
    for (const product of products) {
      await cartPage.verifyProductListed(product.keyword);
    }
    const cartTotal = await cartPage.getCartTotal();
    expect(cartTotal).toBe(expectedTotal);
    const cartNames = await cartPage.getCartProductNames();
    for (const p of products) {
      expect(cartNames.join(' ').toLowerCase()).toContain(p.keyword.toLowerCase());
    }
    const cartPrices = await cartPage.getCartProductPrices();
    for (const price of cartPrices) {
      expect(price).toBeGreaterThan(0);
    }
    const sumOfCartPrices = cartPrices.reduce((a, b) => a + b, 0);
    const displayedTotal = await cartPage.getCartTotal();
    expect(displayedTotal).toBe(sumOfCartPrices);
  });

});