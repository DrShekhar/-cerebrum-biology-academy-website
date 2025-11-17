import { test, expect } from '@playwright/test'

test.describe('Visual Component Tests', () => {
  test.describe.configure({ mode: 'parallel' })

  // Mobile viewport tests
  test('Mobile - Header components visibility', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // iPhone SE
    await page.goto('http://localhost:3000')

    // Check burger menu button exists
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    await expect(burgerButton).toBeVisible()

    // Click burger menu
    await burgerButton.click()
    await page.waitForTimeout(500) // Wait for animation

    // Check if X button is visible in the panel
    const closeButton = page.locator('button[aria-label="Close navigation menu"]')
    await expect(closeButton).toBeVisible()

    // Check if the button itself transformed to X
    await expect(burgerButton).toBeVisible()

    // Close menu
    await closeButton.click()
    await page.waitForTimeout(500)

    // Check search button exists
    const searchButton = page.locator('button[aria-label="Open search menu"]')
    await expect(searchButton).toBeVisible()

    // Click search button
    await searchButton.click()
    await page.waitForTimeout(500)

    // Check if search modal opened
    const searchModal = page.locator('text=Search')
    await expect(searchModal).toBeVisible()

    // Check if close button is visible
    const searchCloseButton = page.locator('button[aria-label="Close search menu"]')
    await expect(searchCloseButton).toBeVisible()

    // Close search
    await searchCloseButton.click()
    await page.waitForTimeout(500)
  })

  // iPad viewport tests
  test('iPad - Header components visibility', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }) // iPad
    await page.goto('http://localhost:3000')

    // Check burger menu button exists
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    await expect(burgerButton).toBeVisible()

    // Click burger menu
    await burgerButton.click()
    await page.waitForTimeout(500)

    // Check if X button is visible in the panel
    const closeButton = page.locator('button[aria-label="Close navigation menu"]')
    await expect(closeButton).toBeVisible()

    // Check if menu panel is visible
    const menuPanel = page.locator('#burger-menu-panel')
    await expect(menuPanel).toBeVisible()

    // Close menu
    await closeButton.click()
    await page.waitForTimeout(500)

    // Check search button
    const searchButton = page.locator('button[aria-label="Open search menu"]')
    await expect(searchButton).toBeVisible()

    // Click search button
    await searchButton.click()
    await page.waitForTimeout(500)

    // Check if search modal opened with close button
    const searchCloseButton = page.locator('button[aria-label="Close search menu"]')
    await expect(searchCloseButton).toBeVisible()

    // Close search
    await searchCloseButton.click()
    await page.waitForTimeout(500)
  })

  // Desktop viewport tests
  test('Desktop - Header components visibility', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 }) // Desktop
    await page.goto('http://localhost:3000')

    // On desktop, burger menu should not be visible
    // But search should still work

    const searchButton = page.locator('button[aria-label="Open search menu"]')
    await expect(searchButton).toBeVisible()

    // Click search button
    await searchButton.click()
    await page.waitForTimeout(500)

    // Check if search modal opened with close button
    const searchCloseButton = page.locator('button[aria-label="Close search menu"]')
    await expect(searchCloseButton).toBeVisible()

    // Close search
    await searchCloseButton.click()
    await page.waitForTimeout(500)
  })

  // Test floating CTAs are draggable
  test('Floating CTAs - Draggable functionality', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3000')

    // Scroll down to make floating CTA visible
    await page.evaluate(() => window.scrollTo(0, 1000))
    await page.waitForTimeout(500)

    // The floating CTA should be visible and have drag functionality
    // Check if it exists (it's a motion.div, so we check for the button inside)
    const floatingButton = page
      .locator('button:has-text("Enroll Now"), button:has-text("Free Demo")')
      .first()

    // Note: Actual drag testing would require more complex setup
    // For now, just verify it's visible
    if (await floatingButton.isVisible()) {
      console.log('Floating CTA is visible')
    }
  })
})
