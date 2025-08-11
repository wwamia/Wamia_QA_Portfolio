exports.CheckoutPage = class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page 
   */
  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.locator('#checkout');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.zipInput = page.locator('#postal-code');
    this.continueBtn = page.locator('#continue');
    this.finishBtn = page.locator('#finish');
    this.successMsg = page.locator('.complete-header');
  }

  async startCheckout() {
    await this.checkoutBtn.click();
  }

  async fillCustomerInfo(first, last, zip) {
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.zipInput.fill(zip);
    await this.continueBtn.click();
  }

  async inputFirstName(first) {
    await this.firstNameInput.fill(first);
  }

  async inputLastName(last) {
    await this.lastNameInput.fill(last);
  }

  async inputZip(zip) {
    await this.zipInput.fill(zip);  
  }

  async clickOnContinueBtn() {
    await this.continueBtn.click();
  }

  async completeOrder() {
    await this.finishBtn.click();
  }

  async getSuccessMsg() {
    return await this.successMsg.textContent();
  }

  async getErrorMsg() {
    return await this.page.locator('.error-message-container').textContent();
  }
};
