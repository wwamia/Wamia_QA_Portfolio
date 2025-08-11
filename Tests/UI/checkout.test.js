const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./POM-Pages/loginPage');
const { InventoryPage } = require('./POM-Pages/inventoryPage');
const { CheckoutPage } = require('./POM-Pages/checkoutPage');

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

  // Valid checkout process
  test('complete checkout successfully', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.startCheckout();
    await checkoutPage.fillCustomerInfo('Michael', 'Jackson', '12345');
    await checkoutPage.completeOrder();

    const success = await checkoutPage.getSuccessMsg();
    expect(success).toContain('Thank you');
  });

  // Checkout fails with missing info: last name
  test('checkout fails with missing last name', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.startCheckout();
    await checkoutPage.inputFirstName('Michael');
    await checkoutPage.inputZip('12345'); 
    await checkoutPage.clickOnContinueBtn();

    const errorMsg = await checkoutPage.getErrorMsg();
    expect(errorMsg).toContain('Error'); 
  });

  // Checkout fails with missing info: first name
  test('checkout fails with missing first name', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.startCheckout();
    await checkoutPage.inputLastName('Jackson');
    await checkoutPage.inputZip('12345'); 
    await checkoutPage.clickOnContinueBtn();

    const errorMsg = await checkoutPage.getErrorMsg();
    expect(errorMsg).toContain('Error'); 
  });

  // Checkout fails with missing info: postal code
  test('checkout fails with missing postal code', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.startCheckout();
  await checkoutPage.inputFirstName('Michael');
  await checkoutPage.inputLastName('Jackson');
  await checkoutPage.clickOnContinueBtn();

  const errorMsg = await checkoutPage.getErrorMsg();
  expect(errorMsg).toContain('Error'); 
  });
});

