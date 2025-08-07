const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../POM-Pages/loginPage');
const { InventoryPage } = require('../POM-Pages/inventoryPage');
const { CheckoutPage } = require('../POM-Pages/checkoutPage');

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goToPage();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.isLoaded();
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
  });

  test('complete checkout successfully', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.startCheckout();
    await checkoutPage.fillCustomerInfo('Jane', 'Doe', '12345');
    await checkoutPage.completeOrder();

    const success = await checkoutPage.getSuccessMsg();
    expect(success).toContain('Thank you');
  });
});
