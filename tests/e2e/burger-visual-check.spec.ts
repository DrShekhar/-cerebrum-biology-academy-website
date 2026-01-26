import { test, expect } from '@playwright/test'

test('Visual check - burger menu overlay issue', async ({ page }) => {
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 812 })

  // Navigate to homepage
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  // Take screenshot before opening menu
  await page.screenshot({ path: 'burger-check-1-before-open.png', fullPage: true })

  // Click burger menu button
  const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
  await burgerButton.click()
  await page.waitForTimeout(1000)

  // Take screenshot after opening
  await page.screenshot({ path: 'burger-check-2-menu-opened.png', fullPage: false })

  // Check if menu panel is visible
  const menuPanel = page.locator('#burger-menu-panel')
  const isVisible = await menuPanel.isVisible()
  console.log('Menu panel visible:', isVisible)

  // Get computed styles to check z-index
  const panelZIndex = await menuPanel.evaluate((el) => window.getComputedStyle(el).zIndex)
  const overlayZIndex = await page
    .locator('.fixed.inset-0.bg-black')
    .evaluate((el) => window.getComputedStyle(el).zIndex)

  console.log('Panel z-index:', panelZIndex)
  console.log('Overlay z-index:', overlayZIndex)

  // Check if "Services" text is visible
  const servicesText = page.getByText('Services', { exact: false })
  const servicesVisible = await servicesText.count()
  console.log('Services text found:', servicesVisible, 'times')

  // Check if "IB" text is visible
  const ibText = page.getByText('IB (International Baccalaureate)')
  const ibVisible = await ibText.isVisible().catch(() => false)
  console.log('IB text visible:', ibVisible)
})
