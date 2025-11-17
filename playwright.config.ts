import { defineConfig, devices } from '@playwright/test'

/**
 * Enhanced Playwright configuration for Cerebrum Biology Academy
 * Comprehensive E2E testing for education platform
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30 * 1000, // 30 seconds per test
  expect: {
    timeout: 5000
  },

  // Global setup and teardown
  globalSetup: require.resolve('./tests/global-setup'),
  globalTeardown: require.resolve('./tests/global-teardown'),

  // Output configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/playwright-results.json' }],
    ['junit', { outputFile: 'test-results/playwright-junit.xml' }],
    process.env.CI ? ['github'] : ['list']
  ],

  outputDir: 'test-results/artifacts',

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // AI testing context
    extraHTTPHeaders: {
      'X-Test-Environment': 'playwright',
      'X-Test-Suite': 'e2e'
    }
  },

  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/*.spec.ts'
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: '**/*.spec.ts'
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: '**/*.spec.ts'
    },

    // Mobile devices (critical for education platform)
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      testMatch: '**/*.mobile.spec.ts'
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      testMatch: '**/*.mobile.spec.ts'
    },

    // Tablet testing
    {
      name: 'Tablet',
      use: { ...devices['iPad Pro'] },
      testMatch: '**/*.tablet.spec.ts'
    },

    // Accessibility testing
    {
      name: 'accessibility',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/*.accessibility.spec.ts'
    },

    // Performance testing
    {
      name: 'performance',
      use: {
        ...devices['Desktop Chrome'],
        // Throttling for performance testing
        launchOptions: {
          args: ['--disable-web-security', '--disable-features=TranslateUI']
        }
      },
      testMatch: '**/*.performance.spec.ts'
    },

    // AI functionality testing
    {
      name: 'ai-testing',
      use: {
        ...devices['Desktop Chrome'],
        extraHTTPHeaders: {
          'X-AI-Test-Mode': 'enabled',
          'X-Test-Provider': 'mock'
        }
      },
      testMatch: '**/*.ai.spec.ts'
    }
  ],

  // Local dev server
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
})