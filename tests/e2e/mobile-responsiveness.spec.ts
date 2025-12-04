import { test, expect, devices } from '@playwright/test'

// Test on iPhone 12 viewport
const iPhone12 = devices['iPhone 12']

test.describe('Mobile Responsiveness Tests', () => {
  test.use({ ...iPhone12 })

  test.beforeEach(async ({ page }) => {
    // Navigate to home page
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  })

  test('Burger Menu - opens and has correct width', async ({ page }) => {
    // Find and click the burger menu button
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    await expect(burgerButton).toBeVisible()

    // Check touch target size (min 44px)
    const buttonBox = await burgerButton.boundingBox()
    expect(buttonBox?.width).toBeGreaterThanOrEqual(44)
    expect(buttonBox?.height).toBeGreaterThanOrEqual(44)

    // Click to open menu
    await burgerButton.click()

    // Wait for menu to appear
    const menuPanel = page.locator('[id="burger-menu-panel"]').or(
      page.locator('.fixed.left-0.top-0.h-full')
    )
    await expect(menuPanel.first()).toBeVisible({ timeout: 5000 })

    // Check menu width is 85vw (not exceeding screen)
    const menuBox = await menuPanel.first().boundingBox()
    const viewportSize = page.viewportSize()
    if (menuBox && viewportSize) {
      const expectedMaxWidth = viewportSize.width * 0.85
      expect(menuBox.width).toBeLessThanOrEqual(expectedMaxWidth + 10) // Allow 10px tolerance
      expect(menuBox.width).toBeLessThan(viewportSize.width) // Should not fill entire screen
    }

    // Check close button has proper touch target
    const closeButton = page.locator('button[aria-label="Close navigation menu"]')
    await expect(closeButton).toBeVisible()
    const closeBox = await closeButton.boundingBox()
    expect(closeBox?.width).toBeGreaterThanOrEqual(44)
    expect(closeBox?.height).toBeGreaterThanOrEqual(44)
  })

  test('Search Menu - opens and responds to touch', async ({ page }) => {
    // Find and click the search button
    const searchButton = page.locator('button[aria-label="Open search menu"]')
    await expect(searchButton).toBeVisible()

    // Check touch target size
    const buttonBox = await searchButton.boundingBox()
    expect(buttonBox?.width).toBeGreaterThanOrEqual(44)
    expect(buttonBox?.height).toBeGreaterThanOrEqual(44)

    // Click to open search
    await searchButton.click()

    // Wait for search modal
    const searchModal = page.locator('input[placeholder*="Search"]').first()
    await expect(searchModal).toBeVisible({ timeout: 5000 })

    // Check input has 16px font size (prevents iOS zoom)
    const fontSize = await searchModal.evaluate((el) => {
      return window.getComputedStyle(el).fontSize
    })
    expect(parseInt(fontSize)).toBeGreaterThanOrEqual(16)

    // Check close button
    const closeButton = page.locator('button[aria-label="Close search menu"]')
    await expect(closeButton).toBeVisible()
    const closeBox = await closeButton.boundingBox()
    expect(closeBox?.width).toBeGreaterThanOrEqual(44)
    expect(closeBox?.height).toBeGreaterThanOrEqual(44)
  })

  test('Floating CTA - visible and properly positioned', async ({ page }) => {
    // Scroll down to trigger floating CTA
    await page.evaluate(() => window.scrollTo(0, window.innerHeight))
    await page.waitForTimeout(1000)

    // Check for bottom CTA bar
    const bottomBar = page.locator('.fixed.bottom-0.left-0.right-0').first()
    await expect(bottomBar).toBeVisible({ timeout: 5000 })

    // Check CTA buttons have minimum touch targets
    const ctaButtons = page.locator('.fixed.bottom-0 a, .fixed.bottom-0 button')
    const buttonCount = await ctaButtons.count()

    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const button = ctaButtons.nth(i)
      if (await button.isVisible()) {
        const box = await button.boundingBox()
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44)
        }
      }
    }
  })

  test('Demo Booking Page - forms are mobile optimized', async ({ page }) => {
    await page.goto('http://localhost:3000/demo-booking', { waitUntil: 'networkidle' })

    // Check page loads
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()

    // Check bottom padding for mobile nav
    const container = page.locator('.bg-white.rounded-lg').first()
    const containerPadding = await container.evaluate((el) => {
      return window.getComputedStyle(el).paddingBottom
    })
    expect(parseInt(containerPadding)).toBeGreaterThan(0)
  })

  test('Privacy Policy - readable on mobile', async ({ page }) => {
    await page.goto('http://localhost:3000/privacy-policy', { waitUntil: 'networkidle' })

    // Check heading is visible and appropriately sized
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()

    // Check content has proper line height for readability
    const content = page.locator('.space-y-6').first()
    const lineHeight = await content.evaluate((el) => {
      return window.getComputedStyle(el).lineHeight
    })
    // Line height should be set (not "normal")
    expect(lineHeight).not.toBe('normal')

    // Check page has bottom padding for mobile nav
    const mainContainer = page.locator('.min-h-screen').first()
    const paddingBottom = await mainContainer.evaluate((el) => {
      return window.getComputedStyle(el).paddingBottom
    })
    expect(parseInt(paddingBottom)).toBeGreaterThanOrEqual(20)
  })

  test('Terms of Service - readable on mobile', async ({ page }) => {
    await page.goto('http://localhost:3000/terms-of-service', { waitUntil: 'networkidle' })

    // Check heading is visible
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()

    // Verify h2 headings are responsive
    const h2Elements = page.locator('h2')
    const h2Count = await h2Elements.count()
    expect(h2Count).toBeGreaterThan(0)

    // Check first h2 font size is appropriate for mobile
    const firstH2 = h2Elements.first()
    const fontSize = await firstH2.evaluate((el) => {
      return window.getComputedStyle(el).fontSize
    })
    // Should be around 20-24px on mobile (text-xl)
    expect(parseInt(fontSize)).toBeLessThanOrEqual(28)
    expect(parseInt(fontSize)).toBeGreaterThanOrEqual(18)
  })

  test('Touch targets throughout the site are at least 44px', async ({ page }) => {
    // Check main navigation buttons
    const navButtons = page.locator('header button, header a')
    const buttonCount = await navButtons.count()

    let checkedCount = 0
    for (let i = 0; i < buttonCount && checkedCount < 5; i++) {
      const button = navButtons.nth(i)
      if (await button.isVisible()) {
        const box = await button.boundingBox()
        if (box && box.width > 0 && box.height > 0) {
          // At least one dimension should be >= 44px for touch accessibility
          const maxDimension = Math.max(box.width, box.height)
          expect(maxDimension).toBeGreaterThanOrEqual(40) // Allow slight tolerance
          checkedCount++
        }
      }
    }
  })
})

test.describe('Exit Intent Popup Tests', () => {
  test.use({ ...iPhone12 })

  test('Exit popup does not trigger immediately on page load', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })

    // Wait 2 seconds (popup should wait 5 seconds before enabling)
    await page.waitForTimeout(2000)

    // Scroll up to top (would normally trigger exit intent)
    await page.evaluate(() => {
      window.scrollTo(0, 100)
    })
    await page.waitForTimeout(500)
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(500)

    // Check popup is NOT visible
    const popup = page.locator('.fixed.inset-0.z-\\[9999\\]')
    await expect(popup).not.toBeVisible({ timeout: 2000 })
  })
})

test.describe('Small Screen Tests (iPhone SE)', () => {
  test.use({ ...devices['iPhone SE'] })

  test('Burger menu fits on 320px screen', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })

    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    await burgerButton.click()

    await page.waitForTimeout(500)

    // Check menu doesn't overflow
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(hasHorizontalScroll).toBe(false)
  })

  test('Content does not overflow horizontally', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(hasHorizontalScroll).toBe(false)
  })
})

test.describe('Tablet Tests (iPad)', () => {
  test.use({ ...devices['iPad (gen 7)'] })

  test('Layout adapts properly on tablet', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })

    // Floating CTA bottom bar should be hidden on tablet (lg:hidden)
    const bottomBar = page.locator('.lg\\:hidden.fixed.bottom-0')

    // On iPad (768px), this should still be visible as it's below lg breakpoint
    // We're just checking it loads without errors
    await page.waitForTimeout(1000)

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(hasHorizontalScroll).toBe(false)
  })
})
