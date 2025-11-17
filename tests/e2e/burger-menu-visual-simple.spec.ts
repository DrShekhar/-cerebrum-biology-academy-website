import { test, expect } from '@playwright/test'

test.describe('Burger Menu Visual Test - Z-Index Fix', () => {
  test('verify burger menu appears on top of page content', async ({ page }) => {
    // Go to homepage
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // Wait for any initial animations to complete
    await page.waitForTimeout(2000)

    // Take screenshot before opening menu
    await page.screenshot({
      path: 'tests/screenshots/before-burger-menu.png',
      fullPage: false,
    })

    // Open the burger menu
    const burgerButton = page.locator('button[aria-controls="burger-menu-panel"]')
    await expect(burgerButton).toBeVisible()
    await burgerButton.click()

    // Wait for menu animation to complete
    await page.waitForTimeout(500)

    // Take screenshot with menu open
    await page.screenshot({
      path: 'tests/screenshots/burger-menu-open.png',
      fullPage: false,
    })

    // Verify menu panel is visible
    const menuPanel = page.locator('#burger-menu-panel')
    await expect(menuPanel).toBeVisible()

    // Get z-index values
    const buttonZIndex = await burgerButton.evaluate((el) =>
      window.getComputedStyle(el).zIndex
    )
    const overlay = page.locator('.fixed.inset-0.bg-black.bg-opacity-50').first()
    const overlayZIndex = await overlay.evaluate((el) => window.getComputedStyle(el).zIndex)
    const panelZIndex = await menuPanel.evaluate((el) => window.getComputedStyle(el).zIndex)

    console.log('=== Z-Index Values ===')
    console.log('Burger Button:', buttonZIndex)
    console.log('Overlay:', overlayZIndex)
    console.log('Menu Panel:', panelZIndex)

    // Verify z-index values
    expect(parseInt(buttonZIndex)).toBe(10100)
    expect(parseInt(overlayZIndex)).toBe(10200)
    expect(parseInt(panelZIndex)).toBe(10300)

    // Verify hierarchy
    expect(parseInt(buttonZIndex)).toBeLessThan(parseInt(overlayZIndex))
    expect(parseInt(overlayZIndex)).toBeLessThan(parseInt(panelZIndex))

    console.log('✅ Z-index hierarchy is correct!')

    // Close menu
    const closeButton = page.locator('button[aria-label="Close navigation menu"]')
    await closeButton.click()
    await page.waitForTimeout(500)

    // Take screenshot after closing
    await page.screenshot({
      path: 'tests/screenshots/burger-menu-closed.png',
      fullPage: false,
    })
  })
})
