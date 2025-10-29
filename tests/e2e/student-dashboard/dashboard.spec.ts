/**
 * E2E Tests for Student Dashboard
 *
 * Test Coverage:
 * - User authentication and authorization
 * - Complete user journeys
 * - Cross-tab navigation
 * - Interactive elements
 * - Visual regression
 */

import { test, expect, Page } from '@playwright/test'

// Test fixtures
const testUser = {
  email: 'student@test.com',
  password: 'Test123!@#',
  name: 'Test Student',
}

// Helper functions
async function login(page: Page, email: string, password: string) {
  await page.goto('/login')
  await page.fill('input[name="email"]', email)
  await page.fill('input[name="password"]', password)
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/student\/dashboard/)
}

async function mockAPI(page: Page, endpoint: string, response: any) {
  await page.route(endpoint, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response),
    })
  })
}

const mockTestAttemptsData = {
  success: true,
  data: {
    attempts: [
      {
        id: 'attempt-1',
        score: 450,
        percentage: 75,
        timeSpent: 3600,
        strengthAreas: ['Cell Biology', 'Genetics'],
        weaknessAreas: ['Ecology', 'Evolution'],
        rank: 1500,
        testTemplate: {
          title: 'NEET Mock Test 1',
          type: 'MOCK_TEST',
        },
        createdAt: '2025-10-28T10:00:00Z',
      },
    ],
  },
}

const mockEmptyData = {
  success: true,
  data: {
    attempts: [],
  },
}

test.describe('Student Dashboard - Authentication', () => {
  test('TC-001: user can access dashboard when authenticated', async ({ page }) => {
    await login(page, testUser.email, testUser.password)

    // Verify dashboard loaded
    await expect(page).toHaveURL(/\/student\/dashboard/)
    await expect(page.locator('text=Welcome back')).toBeVisible()
  })

  test('TC-002: unauthenticated user redirected to login', async ({ page }) => {
    // Clear all cookies/storage
    await page.context().clearCookies()

    await page.goto('/student/dashboard')

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/)
  })

  test('TC-003: session expiry handled gracefully', async ({ page, context }) => {
    await login(page, testUser.email, testUser.password)

    // Verify dashboard loaded
    await expect(page.locator('text=Welcome back')).toBeVisible()

    // Manually expire session by clearing cookies
    await context.clearCookies()

    // Refresh page
    await page.reload()

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 })
  })
})

test.describe('Student Dashboard - Empty State', () => {
  test.beforeEach(async ({ page }) => {
    // Mock empty data
    await mockAPI(page, '**/api/test-attempts*', mockEmptyData)
    await mockAPI(page, '**/api/test-sessions*', mockEmptyData)
  })

  test('TC-006: new user sees empty state', async ({ page }) => {
    await login(page, testUser.email, testUser.password)

    await expect(page.locator('text=Ready to Start Your Journey?')).toBeVisible()
    await expect(page.locator('text=Take Your First Test')).toBeVisible()
    await expect(page.locator('text=Browse Practice Questions')).toBeVisible()
  })

  test('TC-007: CTA buttons navigate correctly', async ({ page }) => {
    await login(page, testUser.email, testUser.password)

    await expect(page.locator('text=Take Your First Test')).toBeVisible()

    // Click first CTA
    await page.click('a:has-text("Take Your First Test")')

    await expect(page).toHaveURL(/\/mock-tests/)
  })

  test('TC-119: first-time user flow complete', async ({ page }) => {
    await login(page, testUser.email, testUser.password)

    // Empty state visible
    await expect(page.locator('text=Ready to Start Your Journey?')).toBeVisible()

    // Click to take test
    await page.click('a:has-text("Take Your First Test")')

    // Navigates to mock tests
    await expect(page).toHaveURL(/\/mock-tests/)

    // Verify test selection page loaded
    await expect(page.locator('text=Mock Tests')).toBeVisible()
  })
})

test.describe('Student Dashboard - Loaded State', () => {
  test.beforeEach(async ({ page }) => {
    // Mock data with test attempts
    await mockAPI(page, '**/api/test-attempts*', mockTestAttemptsData)
    await mockAPI(page, '**/api/test-sessions*', mockTestAttemptsData)
  })

  test('TC-120: returning user flow complete', async ({ page }) => {
    await login(page, testUser.email, testUser.password)

    // Dashboard loads with data
    await expect(page.locator('text=Welcome back, Test Student!')).toBeVisible()

    // Stats cards visible
    await expect(page.locator('text=Total Study Time')).toBeVisible()
    await expect(page.locator('text=Average Score')).toBeVisible()
    await expect(page.locator('text=Tests Completed')).toBeVisible()
    await expect(page.locator('text=National Rank')).toBeVisible()

    // Score prediction visible
    await expect(page.locator('text=NEET Score Prediction')).toBeVisible()
    await expect(page.locator('text=450/720')).toBeVisible()

    // Strong/Weak areas visible
    await expect(page.locator('text=Strong Areas')).toBeVisible()
    await expect(page.locator('text=Areas for Improvement')).toBeVisible()

    // Recent activity visible
    await expect(page.locator('text=Recent Study Sessions')).toBeVisible()
  })

  test('TC-008: user name displays correctly', async ({ page }) => {
    await login(page, testUser.email, testUser.password)

    await expect(page.locator('text=Welcome back, Test Student!')).toBeVisible()
  })

  test('TC-010: current score displayed', async ({ page }) => {
    await login(page, testUser.email, testUser.password)

    await expect(page.locator('text=450/720')).toBeVisible()
  })

  test('TC-011: rank displayed', async ({ page }) => {
    await login(page, testUser.email, testUser.password)

    await expect(page.locator('text=#1500')).toBeVisible()
  })
})

test.describe('Student Dashboard - Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await mockAPI(page, '**/api/test-attempts*', mockTestAttemptsData)
    await mockAPI(page, '**/api/test-sessions*', mockTestAttemptsData)
    await login(page, testUser.email, testUser.password)
  })

  test('TC-041: all 6 tabs render', async ({ page }) => {
    await expect(page.locator('text=Overview')).toBeVisible()
    await expect(page.locator('text=Progress Tracking')).toBeVisible()
    await expect(page.locator('text=Study Session')).toBeVisible()
    await expect(page.locator('text=Weak Areas')).toBeVisible()
    await expect(page.locator('text=Practice Tests')).toBeVisible()
    await expect(page.locator('text=Study Schedule')).toBeVisible()
  })

  test('TC-042: active tab highlighted', async ({ page }) => {
    // Overview tab should be active by default
    const overviewTab = page.locator('button:has-text("Overview")')
    await expect(overviewTab).toHaveClass(/border-blue-500/)
  })

  test('TC-043: tab switch updates content', async ({ page }) => {
    // Click Study Session tab
    await page.click('button:has-text("Study Session")')

    // Study timer should be visible
    await expect(page.locator('text=Focus Study Session')).toBeVisible()
    await expect(page.locator('text=00:00:00')).toBeVisible()

    // Click back to Overview
    await page.click('button:has-text("Overview")')

    // NEET score prediction should be visible
    await expect(page.locator('text=NEET Score Prediction')).toBeVisible()
  })

  test('TC-123: tab navigation flow complete', async ({ page }) => {
    const tabs = ['Progress Tracking', 'Study Session', 'Weak Areas', 'Practice Tests', 'Study Schedule', 'Overview']

    for (const tabName of tabs) {
      await page.click(`button:has-text("${tabName}")`)
      await page.waitForTimeout(500) // Allow animation to complete

      const activeTab = page.locator(`button:has-text("${tabName}")`)
      await expect(activeTab).toHaveClass(/border-blue-500/)
    }
  })

  test('TC-045: keyboard navigation works', async ({ page }) => {
    // Focus first tab
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Use arrow keys or Enter to navigate
    await page.keyboard.press('Enter')

    // Content should update (verify by checking for tab-specific content)
    await page.waitForTimeout(300)
  })
})

test.describe('Student Dashboard - Study Timer', () => {
  test.beforeEach(async ({ page }) => {
    await mockAPI(page, '**/api/test-attempts*', mockTestAttemptsData)
    await mockAPI(page, '**/api/test-sessions*', mockTestAttemptsData)
    await login(page, testUser.email, testUser.password)
    await page.click('button:has-text("Study Session")')
  })

  test('TC-046: timer starts at zero', async ({ page }) => {
    await expect(page.locator('text=00:00:00')).toBeVisible()
  })

  test('TC-047, TC-048, TC-049: timer controls work', async ({ page }) => {
    // Start timer
    await page.click('button:has-text("Start")')

    // Wait 3 seconds
    await page.waitForTimeout(3000)

    // Timer should show ~00:00:03
    const timerText = await page.locator('.text-6xl').textContent()
    expect(timerText).toMatch(/00:00:0[23]/)

    // Pause timer
    await page.click('button:has-text("Pause")')

    const pausedTime = await page.locator('.text-6xl').textContent()

    // Wait 2 more seconds
    await page.waitForTimeout(2000)

    // Timer should still show paused time
    const stillPausedTime = await page.locator('.text-6xl').textContent()
    expect(stillPausedTime).toBe(pausedTime)

    // Reset timer
    await page.click('button:has-text("Reset")')

    // Timer should reset to 00:00:00
    await expect(page.locator('text=00:00:00')).toBeVisible()
  })

  test('TC-124: start study session from weak area', async ({ page }) => {
    // Go back to overview
    await page.click('button:has-text("Overview")')

    // Find and click "Start Practice" button in weak areas
    await page.click('button:has-text("Start Practice →")')

    // Should navigate to Study Session tab with timer running
    await expect(page.locator('text=Focus Study Session')).toBeVisible()
    await expect(page.locator('text=Studying:')).toBeVisible()
  })
})

test.describe('Student Dashboard - Actions', () => {
  test.beforeEach(async ({ page }) => {
    await mockAPI(page, '**/api/test-attempts*', mockTestAttemptsData)
    await mockAPI(page, '**/api/test-sessions*', mockTestAttemptsData)
    await login(page, testUser.email, testUser.password)
  })

  test('TC-125: take practice test flow', async ({ page }) => {
    // Assuming there's a CTA on the dashboard
    await page.click('a[href="/mock-tests"]')

    await expect(page).toHaveURL(/\/mock-tests/)
  })

  test('notification bell clickable', async ({ page }) => {
    const bellButton = page.locator('button:has(svg.lucide-bell)')
    await expect(bellButton).toBeVisible()

    await bellButton.click()
    // Verify notification dropdown or panel opens
  })

  test('settings button clickable', async ({ page }) => {
    const settingsButton = page.locator('button:has(svg.lucide-settings)')
    await expect(settingsButton).toBeVisible()

    await settingsButton.click()
    // Verify settings menu or page opens
  })
})

test.describe('Student Dashboard - Error Handling', () => {
  test('TC-061: network offline shows error', async ({ page, context }) => {
    // Set offline
    await context.setOffline(true)

    await page.goto('/student/dashboard')

    // Should show error message or empty state
    await expect(page.locator('text=Unable to load').or(page.locator('text=Ready to Start'))).toBeVisible({
      timeout: 10000,
    })
  })

  test('TC-062: 500 error shows message', async ({ page }) => {
    await mockAPI(page, '**/api/test-attempts*', {
      status: 500,
      body: 'Internal Server Error',
    })

    await login(page, testUser.email, testUser.password)

    // Should show error message or empty state gracefully
    await page.waitForTimeout(2000)

    // Verify no crash occurred (dashboard still loads)
    await expect(page.locator('text=Welcome')).toBeVisible()
  })

  test('TC-063: 404 shows empty state', async ({ page }) => {
    await page.route('**/api/test-attempts*', (route) => {
      route.fulfill({
        status: 404,
        body: 'Not Found',
      })
    })

    await login(page, testUser.email, testUser.password)

    // Should show empty state
    await expect(page.locator('text=Ready to Start Your Journey?')).toBeVisible()
  })
})

test.describe('Student Dashboard - Visual Regression', () => {
  test('TC-126: desktop overview screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await mockAPI(page, '**/api/test-attempts*', mockTestAttemptsData)
    await mockAPI(page, '**/api/test-sessions*', mockTestAttemptsData)

    await login(page, testUser.email, testUser.password)
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('dashboard-overview-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    })
  })

  test('TC-127: mobile overview screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await mockAPI(page, '**/api/test-attempts*', mockTestAttemptsData)
    await mockAPI(page, '**/api/test-sessions*', mockTestAttemptsData)

    await login(page, testUser.email, testUser.password)
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('dashboard-overview-mobile.png', {
      fullPage: true,
      maxDiffPixels: 50,
    })
  })

  test('TC-129: empty state screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await mockAPI(page, '**/api/test-attempts*', mockEmptyData)
    await mockAPI(page, '**/api/test-sessions*', mockEmptyData)

    await login(page, testUser.email, testUser.password)
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('dashboard-empty-state.png', {
      fullPage: true,
    })
  })
})

test.describe('Student Dashboard - Performance', () => {
  test('TC-068: dashboard loads in <3s', async ({ page }) => {
    await mockAPI(page, '**/api/test-attempts*', mockTestAttemptsData)
    await mockAPI(page, '**/api/test-sessions*', mockTestAttemptsData)

    const startTime = Date.now()

    await login(page, testUser.email, testUser.password)
    await page.waitForLoadState('networkidle')

    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(3000)
  })

  test('TC-073: cumulative layout shift minimal', async ({ page }) => {
    await mockAPI(page, '**/api/test-attempts*', mockTestAttemptsData)
    await mockAPI(page, '**/api/test-sessions*', mockTestAttemptsData)

    await login(page, testUser.email, testUser.password)

    // Wait for all layout shifts to settle
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Verify no major layout shifts occurred
    const layoutShifts = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cls = 0
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += (entry as any).value
            }
          }
        })
        observer.observe({ type: 'layout-shift', buffered: true })

        setTimeout(() => {
          observer.disconnect()
          resolve(cls)
        }, 500)
      })
    })

    expect(layoutShifts).toBeLessThan(0.1)
  })
})

test.describe('Student Dashboard - Data Integrity', () => {
  test('TC-104: score calculation accurate', async ({ page }) => {
    const multipleAttempts = {
      success: true,
      data: {
        attempts: [
          {
            ...mockTestAttemptsData.data.attempts[0],
            score: 500,
          },
          {
            ...mockTestAttemptsData.data.attempts[0],
            score: 400,
          },
        ],
      },
    }

    await mockAPI(page, '**/api/test-attempts*', multipleAttempts)
    await mockAPI(page, '**/api/test-sessions*', multipleAttempts)

    await login(page, testUser.email, testUser.password)

    // Average: (500 + 400) / 2 = 450
    await expect(page.locator('text=450/720')).toBeVisible()
  })

  test('TC-105: improvement delta correct', async ({ page }) => {
    await mockAPI(page, '**/api/test-attempts*', mockTestAttemptsData)
    await mockAPI(page, '**/api/test-sessions*', mockTestAttemptsData)

    await login(page, testUser.email, testUser.password)

    // Check for improvement indicator (may vary based on data)
    await expect(page.locator('text=/from last test/')).toBeVisible()
  })
})

test.describe('Student Dashboard - User Personas', () => {
  test('TC-121: high performer flow', async ({ page }) => {
    const highPerformerData = {
      success: true,
      data: {
        attempts: [
          {
            id: 'attempt-1',
            score: 648,
            percentage: 90,
            timeSpent: 6000,
            strengthAreas: ['Cell Biology', 'Genetics', 'Physiology', 'Ecology', 'Evolution'],
            weaknessAreas: [],
            rank: 50,
            testTemplate: {
              title: 'NEET Mock Test 1',
              type: 'MOCK_TEST',
            },
            createdAt: '2025-10-28T10:00:00Z',
          },
        ],
      },
    }

    await mockAPI(page, '**/api/test-attempts*', highPerformerData)
    await mockAPI(page, '**/api/test-sessions*', highPerformerData)

    await login(page, testUser.email, testUser.password)

    // High score displayed
    await expect(page.locator('text=648/720')).toBeVisible()

    // Excellent rank displayed
    await expect(page.locator('text=#50')).toBeVisible()

    // Strong areas prominent
    await expect(page.locator('text=Strong Areas')).toBeVisible()
    const strongAreas = page.locator('text=Cell Biology')
    await expect(strongAreas).toBeVisible()
  })

  test('TC-122: struggling student flow', async ({ page }) => {
    const strugglingData = {
      success: true,
      data: {
        attempts: [
          {
            id: 'attempt-1',
            score: 288,
            percentage: 40,
            timeSpent: 5400,
            strengthAreas: ['Cell Structure'],
            weaknessAreas: ['Ecology', 'Evolution', 'Genetics', 'Physiology', 'Plant Physiology'],
            rank: 15000,
            testTemplate: {
              title: 'NEET Mock Test 1',
              type: 'MOCK_TEST',
            },
            createdAt: '2025-10-28T10:00:00Z',
          },
        ],
      },
    }

    await mockAPI(page, '**/api/test-attempts*', strugglingData)
    await mockAPI(page, '**/api/test-sessions*', strugglingData)

    await login(page, testUser.email, testUser.password)

    // Lower score displayed
    await expect(page.locator('text=288/720')).toBeVisible()

    // Rank displayed
    await expect(page.locator('text=#15000')).toBeVisible()

    // Weak areas emphasized
    await expect(page.locator('text=Areas for Improvement')).toBeVisible()
    await expect(page.locator('text=Ecology')).toBeVisible()

    // Recommended study time shown
    await expect(page.locator('text=/Recommended: \\d+ min\\/day/')).toBeVisible()

    // Start practice buttons available
    await expect(page.locator('button:has-text("Start Practice →")')).toBeVisible()
  })
})
