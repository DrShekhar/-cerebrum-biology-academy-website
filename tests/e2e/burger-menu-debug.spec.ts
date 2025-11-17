import { test, expect } from '@playwright/test'

test.use({
  viewport: { width: 375, height: 667 },
  isMobile: true,
})

test('debug burger menu click', async ({ page }) => {
  // Go to page
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 10000 })

  // Wait for page to be fully loaded
  await page.waitForTimeout(2000)

  // Check console errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log('Console error:', msg.text())
    }
  })

  // Find burger button
  const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
  console.log('Button found:', await burgerButton.count())

  // Check if button is visible
  const isVisible = await burgerButton.isVisible()
  console.log('Button visible:', isVisible)

  // Check if button is enabled
  const isEnabled = await burgerButton.isEnabled()
  console.log('Button enabled:', isEnabled)

  // Get button attributes
  const ariaExpanded = await burgerButton.getAttribute('aria-expanded')
  console.log('aria-expanded before click:', ariaExpanded)

  // Try clicking with force
  await burgerButton.click({ force: true })
  await page.waitForTimeout(1000)

  // Check aria-expanded after click
  const ariaExpandedAfter = await burgerButton.getAttribute('aria-expanded')
  console.log('aria-expanded after click:', ariaExpandedAfter)

  // Check if menu panel exists in DOM
  const menuPanel = page.locator('#burger-menu-panel')
  const menuCount = await menuPanel.count()
  console.log('Menu panel count:', menuCount)

  // Check if overlay exists
  const overlay = page.locator('div.fixed.inset-0.bg-black')
  const overlayCount = await overlay.count()
  console.log('Overlay count:', overlayCount)

  // Take screenshot
  await page.screenshot({ path: 'burger-menu-debug.png', fullPage: true })

  // Check React state by evaluating
  const state = await page.evaluate(() => {
    const header = document.querySelector('header')
    return {
      headerExists: !!header,
      burgerMenuExists: !!document.querySelector('button[aria-label="Toggle navigation menu"]'),
    }
  })
  console.log('React state:', state)
})
