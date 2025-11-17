import { test, expect } from '@playwright/test'

test('Burger menu - complete interaction test', async ({ page }) => {
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 812 })

  // Navigate to homepage
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  // Open burger menu
  const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
  await burgerButton.click()
  await page.waitForTimeout(500)

  // Verify menu panel is visible
  const menuPanel = page.locator('#burger-menu-panel')
  await expect(menuPanel).toBeVisible()

  // Take screenshot of opened menu
  await page.screenshot({ path: 'burger-menu-opened.png', fullPage: false })

  // Click on "Board Preparation" to expand it
  const boardPrepSection = page.locator('button:has-text("Board Preparation")')
  await boardPrepSection.click()
  await page.waitForTimeout(500)

  // Take screenshot with expanded section
  await page.screenshot({ path: 'burger-menu-expanded-section.png', fullPage: false })

  // Verify IB Biology link is now visible
  const ibLink = page.locator('a:has-text("IB (International Baccalaureate)")')
  await expect(ibLink).toBeVisible()

  // Click on Services section
  const servicesSection = page.locator('button:has-text("Services")')
  await servicesSection.click()
  await page.waitForTimeout(500)

  // Verify services items are visible
  const onlineClassesLink = page.locator('a:has-text("Online Classes")')
  await expect(onlineClassesLink).toBeVisible()

  // Take final screenshot
  await page.screenshot({ path: 'burger-menu-services-expanded.png', fullPage: false })

  console.log('✅ All burger menu interactions working correctly!')
})
