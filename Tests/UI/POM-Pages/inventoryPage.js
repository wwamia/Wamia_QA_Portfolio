exports.InventoryPage = class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page 
   */
  constructor(page) {
    this.page = page;
    this.inventoryItemButton = page.locator('.inventory_item button');
    this.cartButton = page.locator('.shopping_cart_link');
  }

  async addFirstItemToCart() {
    await this.inventoryItemButton.first().click();
  }

  async goToCart() {
    await this.cartButton.click();
  }

  async isLoaded() {
    await this.page.waitForURL('**/inventory.html');
  }
};
