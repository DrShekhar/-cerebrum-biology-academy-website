import { defineConfig, devices } from '@playwright/test'

/**
 * Simple Playwright configuration for quick mobile testing
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  timeout: 30 * 1000,
  expect: {
    timeout: 10000
  },

  reporter: [['list']],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'off',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Use existing server
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120 * 1000
  }
})
