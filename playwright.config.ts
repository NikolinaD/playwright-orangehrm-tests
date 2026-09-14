import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
      },
    ],
  ],

  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry' ,
  },

  projects: [

    /*
     * Authentication / setup
     */
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    /*
     * API Tests
     *
     * Only tests inside tests/APIs will run here.
     */
    {
      name: 'API Tests',
      testDir: './tests/APIs',
      testMatch: /.*\.spec\.ts/,
      use: {
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    /*
     * UI Tests - Chromium
     *
     * Only tests inside tests/UI will run here.
     */
    {
      name: 'chromium',
      testDir: './tests/UI',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
      dependencies: ['setup'],
    },

    /*
     * UI Tests - Firefox
     */
    {
      name: 'firefox',
      testDir: './tests/UI',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
      },
      dependencies: ['setup'],
    },

    /*
     * UI Tests - WebKit
     */
    {
      name: 'webkit',
      testDir: './tests/UI',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
      },
      dependencies: ['setup'],
    },
  ],

  /*
   * Run your local dev server before starting the tests
   *
   * Uncomment if you need it.
   */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
