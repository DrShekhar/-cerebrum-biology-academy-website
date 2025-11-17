import { test, expect } from '@playwright/test'

test.use({
  // Use mobile viewport to ensure burger menu is visible
  viewport: { width: 375, height: 667 },
  isMobile: true,
})

test.describe('Burger Menu Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a simple page that should work
    try {
      await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 10000 })
    } catch (e) {
      console.log('Navigation error:', e)
      // Take a screenshot to see what's on the page
      await page.screenshot({ path: 'navigation-error.png' })
      throw e
    }

    // Wait for page to fully settle (React hydration, etc.)
    await page.waitForTimeout(2000)

    // Close the maintenance notice if it appears
    try {
      await page.waitForSelector('[aria-label="Close maintenance notice"]', { timeout: 3000 })
      await page.click('[aria-label="Close maintenance notice"]')
      await page.waitForTimeout(500)
    } catch (e) {
      // Maintenance notice might not appear or already dismissed
    }
  })

  test('should display burger menu button', async ({ page }) => {
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    await expect(burgerButton).toBeVisible()
  })

  test('should be clickable and not obscured by other elements', async ({ page }) => {
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')

    // Check if button is visible
    await expect(burgerButton).toBeVisible()

    // Get bounding box to verify it's in view
    const box = await burgerButton.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.width).toBeGreaterThan(0)
    expect(box!.height).toBeGreaterThan(0)

    // Check z-index is high enough
    const zIndex = await burgerButton.evaluate((el) =>
      window.getComputedStyle(el).zIndex
    )
    console.log('Burger button z-index:', zIndex)

    // Click should work
    await burgerButton.click()

    // Wait for animation
    await page.waitForTimeout(500)

    // Menu panel should exist in DOM
    const menuPanel = page.locator('#burger-menu-panel')
    await expect(menuPanel).toHaveCount(1)
  })

  test('should open menu panel when clicked', async ({ page }) => {
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    const menuPanel = page.locator('#burger-menu-panel')

    // Click burger button
    await burgerButton.click()

    // Wait for animation to complete (300ms animation + buffer)
    await page.waitForTimeout(500)

    // Menu panel should exist in DOM
    await expect(menuPanel).toHaveCount(1)

    // Menu should have correct aria attributes
    await expect(menuPanel).toHaveAttribute('role', 'dialog')

    // Check if menu is actually visible by checking opacity and transform
    const isRendered = await menuPanel.evaluate((el) => {
      const computed = window.getComputedStyle(el)
      return computed.opacity !== '0' && computed.display !== 'none'
    })
    expect(isRendered).toBe(true)
  })

  test('should display navigation sections in menu', async ({ page }) => {
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')

    // Open menu
    await burgerButton.click()
    await page.waitForTimeout(500)

    const menuPanel = page.locator('#burger-menu-panel')
    await expect(menuPanel).toHaveCount(1)

    // Check for "Navigation" header exists in DOM
    const navHeader = menuPanel.locator('h2:has-text("Navigation")')
    await expect(navHeader).toHaveCount(1)

    // Take screenshot to verify menu appearance
    await page.screenshot({ path: 'burger-menu-open.png' })
  })

  test('should expand navigation sections when clicked', async ({ page }) => {
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')

    // Open menu
    await burgerButton.click()
    await page.waitForTimeout(500)

    // Find and click on a section (e.g., first section button)
    const sectionButtons = page.locator('#burger-menu-panel button[aria-expanded]')
    const firstSection = sectionButtons.first()

    await expect(firstSection).toHaveCount(1)
    await firstSection.click()
    await page.waitForTimeout(500)

    // Check if section expanded
    const expanded = await firstSection.getAttribute('aria-expanded')
    expect(expanded).toBe('true')

    // Take screenshot to verify expanded section
    await page.screenshot({ path: 'burger-menu-expanded-section.png' })
  })

  test('should close menu when clicking overlay', async ({ page }) => {
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    const menuPanel = page.locator('#burger-menu-panel')

    // Open menu
    await burgerButton.click()
    await page.waitForTimeout(500)
    await expect(menuPanel).toHaveCount(1)

    // Click on a point on the screen that should be the overlay (far right, away from menu panel)
    // Menu panel is 320px wide (w-80), so click at x: 340 which should be on the overlay
    await page.mouse.click(340, 300)

    // Wait for close animation
    await page.waitForTimeout(500)

    // Menu should be removed from DOM
    await expect(menuPanel).toHaveCount(0)
  })

  test('should close menu when clicking close button', async ({ page }) => {
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    const menuPanel = page.locator('#burger-menu-panel')

    // Open menu
    await burgerButton.click()
    await page.waitForTimeout(500)
    await expect(menuPanel).toHaveCount(1)

    // Click close button
    const closeButton = page.locator('button[aria-label="Close navigation menu"]')
    await closeButton.click()

    // Wait for close animation
    await page.waitForTimeout(500)

    // Menu should be removed from DOM
    await expect(menuPanel).toHaveCount(0)
  })

  test('should verify z-index hierarchy is correct', async ({ page }) => {
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')

    // Check burger button z-index
    const buttonZIndex = await burgerButton.evaluate((el) =>
      window.getComputedStyle(el).zIndex
    )
    console.log('Burger button z-index:', buttonZIndex)

    // Open menu
    await burgerButton.click()
    await page.waitForTimeout(500)

    // Check overlay z-index
    const overlay = page.locator('div.fixed.inset-0.bg-black')
    const overlayZIndex = await overlay.first().evaluate((el) =>
      window.getComputedStyle(el).zIndex
    )
    console.log('Overlay z-index:', overlayZIndex)

    // Check menu panel z-index
    const menuPanel = page.locator('#burger-menu-panel')
    const panelZIndex = await menuPanel.evaluate((el) =>
      window.getComputedStyle(el).zIndex
    )
    console.log('Menu panel z-index:', panelZIndex)

    // Check header z-index
    const header = page.locator('header')
    const headerZIndex = await header.evaluate((el) =>
      window.getComputedStyle(el).zIndex
    )
    console.log('Header z-index:', headerZIndex)

    // Verify hierarchy: panel > overlay > header
    expect(parseInt(panelZIndex)).toBeGreaterThan(parseInt(overlayZIndex))
    expect(parseInt(overlayZIndex)).toBeGreaterThan(parseInt(headerZIndex))

    // Take screenshot for visual verification
    await page.screenshot({ path: 'burger-menu-z-index-test.png' })
  })
})
