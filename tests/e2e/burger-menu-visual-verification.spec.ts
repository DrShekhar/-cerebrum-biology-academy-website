import { test, expect } from '@playwright/test'

test.use({
  viewport: { width: 375, height: 667 },
  isMobile: true,
})

test.describe('Burger Menu - Visual Verification', () => {
  test('visual test - verify burger menu works correctly', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' })

    // Take screenshot of initial state
    await page.screenshot({ path: 'burger-menu-step1-initial.png', fullPage: true })

    // Find and click burger menu button
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    await expect(burgerButton).toBeVisible()
    console.log('✅ Burger menu button is visible')

    // Click to open menu
    await burgerButton.click()
    await page.waitForTimeout(1000) // Wait for animation

    // Take screenshot with menu open
    await page.screenshot({ path: 'burger-menu-step2-opened.png', fullPage: true })

    // Verify menu panel is visible
    const menuPanel = page.locator('#burger-menu-panel')
    await expect(menuPanel).toBeVisible()
    console.log('✅ Burger menu panel opened successfully')

    // Verify menu content is visible
    const navigationHeader = menuPanel.locator('h2:has-text("Navigation")')
    await expect(navigationHeader).toBeVisible()
    console.log('✅ Navigation header is visible')

    // Click close button
    const closeButton = page.locator('button[aria-label="Close navigation menu"]')
    await closeButton.click()
    await page.waitForTimeout(1000) // Wait for animation

    // Take screenshot with menu closed
    await page.screenshot({ path: 'burger-menu-step3-closed.png', fullPage: true })

    // Verify menu is closed
    await expect(menuPanel).not.toBeVisible()
    console.log('✅ Burger menu closed successfully')

    console.log('\n🎉 BURGER MENU IS FULLY FUNCTIONAL!')
    console.log('Check screenshots:')
    console.log('  - burger-menu-step1-initial.png')
    console.log('  - burger-menu-step2-opened.png')
    console.log('  - burger-menu-step3-closed.png')
  })
})
