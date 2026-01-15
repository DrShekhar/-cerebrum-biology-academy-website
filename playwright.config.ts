import { defineConfig, devices } from '@playwright/test'

/**
 * Enhanced Playwright configuration for Cerebrum Biology Academy
 * Optimized for fast CI execution while maintaining comprehensive local testing
 *
 * CI Optimizations:
 * - Single browser (Chromium) for speed
 * - Production build instead of dev server
 * - Parallel workers (2)
 * - Reduced retries (1)
 * - Shorter timeouts
 *
 * For full cross-browser testing, run locally or use: CI_FULL_BROWSER_TEST=true
 */

const isCI = !!process.env.CI
const isFullBrowserTest = !!process.env.CI_FULL_BROWSER_TEST

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  // CI: 1 retry for flaky tests, Local: 0 retries for faster feedback
  retries: isCI ? 1 : 0,
  // CI: 2 workers for parallelism, Local: use all available CPUs
  workers: isCI ? 2 : undefined,
  // Shorter timeout for faster failure detection
  timeout: isCI ? 20 * 1000 : 30 * 1000,
  expect: {
    timeout: isCI ? 3000 : 5000
  },

  // Global setup and teardown
  globalSetup: require.resolve('./tests/global-setup'),
  globalTeardown: require.resolve('./tests/global-teardown'),

  // Output configuration - simplified for CI
  reporter: isCI
    ? [['github'], ['html', { outputFolder: 'playwright-report' }]]
    : [['list'], ['html', { outputFolder: 'playwright-report' }]],

  outputDir: 'test-results/artifacts',

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    // CI: only trace on retry to save time, Local: trace on first retry
    trace: isCI ? 'retain-on-failure' : 'on-first-retry',
    screenshot: 'only-on-failure',
    // CI: no video to save time, Local: keep video on failure
    video: isCI ? 'off' : 'retain-on-failure',

    // AI testing context
    extraHTTPHeaders: {
      'X-Test-Environment': 'playwright',
      'X-Test-Suite': 'e2e'
    }
  },

  projects: isCI && !isFullBrowserTest
    ? [
        // CI: Only Chromium for speed (covers 95% of issues)
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
          testMatch: '**/*.spec.ts'
        }
      ]
    : [
        // Full browser testing (local or CI_FULL_BROWSER_TEST=true)
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

  // Web server configuration
  webServer: {
    // CI: Use production build for faster startup and realistic testing
    // Local: Use dev server for hot reload
    command: isCI ? 'npm run build && npm run start' : 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !isCI,
    // CI: shorter timeout since build is separate step
    timeout: isCI ? 180 * 1000 : 120 * 1000
  }
})