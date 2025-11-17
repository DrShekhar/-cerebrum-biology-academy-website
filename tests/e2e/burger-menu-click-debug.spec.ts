import { test, expect } from '@playwright/test'

test.use({
  viewport: { width: 375, height: 667 },
  isMobile: true,
})

test('debug burger menu click without force', async ({ page }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 10000 })

  // Wait for page to settle
  await page.waitForTimeout(2000)

  // Close maintenance notice if present
  try {
    await page.waitForSelector('[aria-label="Close maintenance notice"]', { timeout: 3000 })
    await page.click('[aria-label="Close maintenance notice"]')
    await page.waitForTimeout(500)
  } catch (e) {
    console.log('No maintenance notice')
  }

  const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')

  // Check if clickable
  console.log('Is button visible:', await burgerButton.isVisible())
  console.log('Is button enabled:', await burgerButton.isEnabled())

  // Try normal click (no force)
  console.log('Attempting normal click...')
  try {
    await burgerButton.click({ timeout: 5000 })
    console.log('Click successful!')
  } catch (e) {
    console.log('Click failed:', e.message)
  }

  // Wait for state change
  await page.waitForTimeout(1000)

  // Check if menu panel exists
  const menuPanel = page.locator('#burger-menu-panel')
  const count = await menuPanel.count()
  console.log('Menu panel count after click:', count)

  // Check aria-expanded
  const ariaExpanded = await burgerButton.getAttribute('aria-expanded')
  console.log('aria-expanded after click:', ariaExpanded)

  // Take screenshot
  await page.screenshot({ path: 'burger-menu-click-debug.png', fullPage: true })
})
