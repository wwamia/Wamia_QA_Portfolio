const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './Tests',                                   // Folder to look for test files
  testMatch: ['**/*.spec.{js,ts}', '**/*.test.{js,ts}'],  // Match .spec.js/.ts and test.js/.ts
  timeout: 30000,                                       // Per-test timeout

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
