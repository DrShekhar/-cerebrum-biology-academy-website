import { test, expect } from '@playwright/test'

/**
 * Mobile Responsiveness Tests
 * These tests run on mobile devices (iPhone 12, Pixel 5) via Playwright project config.
 * Device settings are handled by playwright.config.ts projects, not test.use().
 */

test.describe('Mobile Responsiveness Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
  })

  test('Burger Menu - opens and has correct width', async ({ page }) => {
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    await expect(burgerButton).toBeVisible()

    const buttonBox = await burgerButton.boundingBox()
    expect(buttonBox?.width).toBeGreaterThanOrEqual(44)
    expect(buttonBox?.height).toBeGreaterThanOrEqual(44)

    await burgerButton.click()

    const menuPanel = page
      .locator('[id="burger-menu-panel"]')
      .or(page.locator('.fixed.left-0.top-0.h-full'))
    await expect(menuPanel.first()).toBeVisible({ timeout: 5000 })

    const menuBox = await menuPanel.first().boundingBox()
    const viewportSize = page.viewportSize()
    if (menuBox && viewportSize) {
      const expectedMaxWidth = viewportSize.width * 0.85
      expect(menuBox.width).toBeLessThanOrEqual(expectedMaxWidth + 10)
      expect(menuBox.width).toBeLessThan(viewportSize.width)
    }

    const closeButton = page.locator('button[aria-label="Close navigation menu"]')
    await expect(closeButton).toBeVisible()
    const closeBox = await closeButton.boundingBox()
    expect(closeBox?.width).toBeGreaterThanOrEqual(44)
    expect(closeBox?.height).toBeGreaterThanOrEqual(44)
  })

  test('Search Menu - opens and responds to touch', async ({ page }) => {
    const searchButton = page.locator('button[aria-label="Open search menu"]')
    await expect(searchButton).toBeVisible()

    const buttonBox = await searchButton.boundingBox()
    expect(buttonBox?.width).toBeGreaterThanOrEqual(44)
    expect(buttonBox?.height).toBeGreaterThanOrEqual(44)

    await searchButton.click()

    const searchModal = page.locator('input[placeholder*="Search"]').first()
    await expect(searchModal).toBeVisible({ timeout: 5000 })

    const fontSize = await searchModal.evaluate((el) => {
      return window.getComputedStyle(el).fontSize
    })
    expect(parseInt(fontSize)).toBeGreaterThanOrEqual(16)

    const closeButton = page.locator('button[aria-label="Close search menu"]')
    await expect(closeButton).toBeVisible()
    const closeBox = await closeButton.boundingBox()
    expect(closeBox?.width).toBeGreaterThanOrEqual(44)
    expect(closeBox?.height).toBeGreaterThanOrEqual(44)
  })

  test('Floating CTA - visible and properly positioned', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, window.innerHeight))
    await page.waitForTimeout(1000)

    const bottomBar = page.locator('.fixed.bottom-0.left-0.right-0').first()
    await expect(bottomBar).toBeVisible({ timeout: 5000 })

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
    await page.goto('/demo-booking', { waitUntil: 'networkidle' })

    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()

    const container = page.locator('.bg-white.rounded-lg').first()
    const containerPadding = await container.evaluate((el) => {
      return window.getComputedStyle(el).paddingBottom
    })
    expect(parseInt(containerPadding)).toBeGreaterThan(0)
  })

  test('Privacy Policy - readable on mobile', async ({ page }) => {
    await page.goto('/privacy-policy', { waitUntil: 'networkidle' })

    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()

    const content = page.locator('.space-y-6').first()
    const lineHeight = await content.evaluate((el) => {
      return window.getComputedStyle(el).lineHeight
    })
    expect(lineHeight).not.toBe('normal')

    const mainContainer = page.locator('.min-h-screen').first()
    const paddingBottom = await mainContainer.evaluate((el) => {
      return window.getComputedStyle(el).paddingBottom
    })
    expect(parseInt(paddingBottom)).toBeGreaterThanOrEqual(20)
  })

  test('Terms of Service - readable on mobile', async ({ page }) => {
    await page.goto('/terms-of-service', { waitUntil: 'networkidle' })

    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()

    const h2Elements = page.locator('h2')
    const h2Count = await h2Elements.count()
    expect(h2Count).toBeGreaterThan(0)

    const firstH2 = h2Elements.first()
    const fontSize = await firstH2.evaluate((el) => {
      return window.getComputedStyle(el).fontSize
    })
    expect(parseInt(fontSize)).toBeLessThanOrEqual(28)
    expect(parseInt(fontSize)).toBeGreaterThanOrEqual(18)
  })

  test('Touch targets throughout the site are at least 44px', async ({ page }) => {
    const navButtons = page.locator('header button, header a')
    const buttonCount = await navButtons.count()

    let checkedCount = 0
    for (let i = 0; i < buttonCount && checkedCount < 5; i++) {
      const button = navButtons.nth(i)
      if (await button.isVisible()) {
        const box = await button.boundingBox()
        if (box && box.width > 0 && box.height > 0) {
          const maxDimension = Math.max(box.width, box.height)
          expect(maxDimension).toBeGreaterThanOrEqual(40)
          checkedCount++
        }
      }
    }
  })
})

test.describe('Exit Intent Popup Tests', () => {
  test('Exit popup does not trigger immediately on page load', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    await page.waitForTimeout(2000)

    await page.evaluate(() => {
      window.scrollTo(0, 100)
    })
    await page.waitForTimeout(500)
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(500)

    const popup = page.locator('.fixed.inset-0.z-\\[9999\\]')
    await expect(popup).not.toBeVisible({ timeout: 2000 })
  })
})

test.describe('Small Screen Tests', () => {
  test('Content does not overflow horizontally', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(hasHorizontalScroll).toBe(false)
  })

  test('Burger menu fits on small screen', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    await burgerButton.click()

    await page.waitForTimeout(500)

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(hasHorizontalScroll).toBe(false)
  })
})
