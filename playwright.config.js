const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './Tests',                                     // Folder to look for test files
  testMatch: ['**/*.spec.{js,ts}', '**/*.test.{js,ts}'],  // Match .spec.js/.ts and test.js/.ts
  timeout: 30000,                                         // Per-test timeout

  reporter: [['html', { 
    outputFolder: 'playwright-report', 
    open: 'never' 
  }]],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});

export default defineConfig({
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile and tablet devices
    {
      name: 'iPhone 12',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'iPad Pro 11',
      use: { ...devices['iPad Pro 11'] },
    },
    {
      name: 'Galaxy Tab S4',
      use: { ...devices['Galaxy Tab S4'] },
    },
    {
      name: 'Pixel 5',
      use: { ...devices['Pixel 5'] },
    },
  ],
});