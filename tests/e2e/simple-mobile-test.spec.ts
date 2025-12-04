import { test, expect, devices } from '@playwright/test'

// Test on iPhone 12 viewport
const iPhone12 = devices['iPhone 12']

// Configure mobile viewport at top level
test.use({
  viewport: { width: 390, height: 844 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
  isMobile: true,
  hasTouch: true,
})

test('Homepage loads on mobile', async ({ page }) => {
  await page.goto('http://localhost:3000', { timeout: 30000 })

  // Check page title
  await expect(page).toHaveTitle(/Cerebrum/i, { timeout: 10000 })

  console.log('Homepage loaded successfully on mobile viewport')
})

test('Burger menu button is visible and has correct size', async ({ page }) => {
  await page.goto('http://localhost:3000', { timeout: 30000 })

  // Find the burger menu button
  const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
  await expect(burgerButton).toBeVisible({ timeout: 10000 })

  // Check touch target size (should be at least 44px)
  const box = await burgerButton.boundingBox()
  console.log('Burger button dimensions:', box?.width, 'x', box?.height)

  expect(box?.width).toBeGreaterThanOrEqual(44)
  expect(box?.height).toBeGreaterThanOrEqual(44)
})

test('Burger menu opens with correct width', async ({ page }) => {
  await page.goto('http://localhost:3000', { timeout: 30000 })

  const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
  await expect(burgerButton).toBeVisible({ timeout: 10000 })

  // Click to open menu
  await burgerButton.click()
  await page.waitForTimeout(500)

  // Menu should be visible and have 85vw width (not full screen)
  const menu = page.locator('.fixed.left-0.top-0.h-full').first()
  await expect(menu).toBeVisible({ timeout: 5000 })

  const menuBox = await menu.boundingBox()
  const viewport = page.viewportSize()

  console.log('Menu width:', menuBox?.width, 'Viewport width:', viewport?.width)

  if (menuBox && viewport) {
    // Menu should be less than full viewport width (we set it to 85vw max-w-80)
    expect(menuBox.width).toBeLessThan(viewport.width)
  }
})

test('Search button has correct touch target', async ({ page }) => {
  await page.goto('http://localhost:3000', { timeout: 30000 })

  const searchButton = page.locator('button[aria-label="Open search menu"]')
  await expect(searchButton).toBeVisible({ timeout: 10000 })

  const box = await searchButton.boundingBox()
  console.log('Search button dimensions:', box?.width, 'x', box?.height)

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

test('Privacy policy is mobile friendly', async ({ page }) => {
  await page.goto('http://localhost:3000/privacy-policy', { timeout: 30000 })

  const heading = page.locator('h1').first()
  await expect(heading).toBeVisible({ timeout: 10000 })

  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth
  })

  expect(hasHorizontalScroll).toBe(false)
  console.log('Privacy policy page is mobile friendly')
})

test('Terms of service is mobile friendly', async ({ page }) => {
  await page.goto('http://localhost:3000/terms-of-service', { timeout: 30000 })

  const heading = page.locator('h1').first()
  await expect(heading).toBeVisible({ timeout: 10000 })

  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth
  })

  expect(hasHorizontalScroll).toBe(false)
  console.log('Terms of service page is mobile friendly')
})
