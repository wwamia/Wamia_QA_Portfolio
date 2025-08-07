const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../POM-Pages/loginPage');

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToPage();
  });

  test('valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMsg).toBeVisible();
    const error = await loginPage.getErrorMsg();
    expect(error).toContain('locked out');
  });

  test('invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('wrong_user', 'wrong_pass');
    await expect(loginPage.errorMsg).toBeVisible();
  });
});
