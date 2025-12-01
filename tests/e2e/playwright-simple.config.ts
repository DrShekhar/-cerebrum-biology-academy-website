import { defineConfig, devices } from '@playwright/test'

/**
 * Simple Playwright configuration for quick admissions page testing
 */
export default defineConfig({
  testDir: './',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  timeout: 60 * 1000,
  expect: {
    timeout: 15000,
  },

  reporter: [['list']],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'off',
    screenshot: 'only-on-failure',
    video: 'off',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
