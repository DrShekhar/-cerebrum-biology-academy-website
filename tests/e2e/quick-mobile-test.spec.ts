import { test, expect, devices } from '@playwright/test'

const iPhone12 = devices['iPhone 12']

// Configure mobile viewport at top level (cannot be inside describe)
test.use({ ...iPhone12 })

test.describe('Quick Mobile Tests', () => {
  test('Homepage loads and burger menu works', async ({ page }) => {
    await page.goto('http://localhost:3000', { timeout: 30000 })

    // Check burger button exists and has good touch target
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    await expect(burgerButton).toBeVisible({ timeout: 10000 })

    const buttonBox = await burgerButton.boundingBox()
    console.log('Burger button size:', buttonBox?.width, 'x', buttonBox?.height)
    expect(buttonBox?.width).toBeGreaterThanOrEqual(44)
    expect(buttonBox?.height).toBeGreaterThanOrEqual(44)

    // Click burger menu
    await burgerButton.click()
    await page.waitForTimeout(500)

    // Menu should be visible
    const menuVisible = await page.locator('.fixed.left-0.top-0.h-full').isVisible()
    console.log('Menu visible after click:', menuVisible)
    expect(menuVisible).toBe(true)

    // Check menu width is reasonable (85% of viewport)
    const menu = page.locator('.fixed.left-0.top-0.h-full').first()
    const menuBox = await menu.boundingBox()
    const viewport = page.viewportSize()
    console.log('Menu width:', menuBox?.width, 'Viewport:', viewport?.width)

    if (menuBox && viewport) {
      expect(menuBox.width).toBeLessThan(viewport.width)
    }
  })

  test('Search button has proper touch target', async ({ page }) => {
    await page.goto('http://localhost:3000', { timeout: 30000 })

    const searchButton = page.locator('button[aria-label="Open search menu"]')
    await expect(searchButton).toBeVisible({ timeout: 10000 })

    const box = await searchButton.boundingBox()
    console.log('Search button size:', box?.width, 'x', box?.height)
    expect(box?.width).toBeGreaterThanOrEqual(44)
    expect(box?.height).toBeGreaterThanOrEqual(44)
  })

  test('No horizontal scroll on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000', { timeout: 30000 })
    await page.waitForTimeout(1000)

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    console.log('Has horizontal scroll:', hasHorizontalScroll)
    expect(hasHorizontalScroll).toBe(false)
  })

  test('Privacy policy page is mobile friendly', async ({ page }) => {
    await page.goto('http://localhost:3000/privacy-policy', { timeout: 30000 })

    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible({ timeout: 10000 })

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })
    expect(hasHorizontalScroll).toBe(false)
  })
})
