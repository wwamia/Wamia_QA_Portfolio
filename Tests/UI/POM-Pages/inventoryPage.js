exports.InventoryPage = class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page 
   */
  constructor(page) {
    this.page = page;
    this.inventoryItemBtn = page.locator('.inventory_item button');
    this.cartBtn = page.locator('.shopping_cart_link');
  }

  async addFirstItemToCart() {
    await this.inventoryItemBtn.first().click();
  }

  async goToCart() {
    await this.cartBtn.click();
  }

  async isLoaded() {
    await this.page.waitForURL('**/inventory.html');
  }
};
