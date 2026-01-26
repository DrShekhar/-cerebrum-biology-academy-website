import { test, expect } from '@playwright/test'

test.use({
  viewport: { width: 375, height: 667 },
  isMobile: true,
})

test('debug burger menu visibility', async ({ page }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 10000 })
  await page.waitForTimeout(1000)

  const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')

  // Check state before click
  console.log('Clicking burger button...')
  await burgerButton.click()
  console.log('Clicked!')

  // Wait for animation to complete
  console.log('Waiting for animation...')
  await page.waitForTimeout(1000)
  console.log('Animation wait complete')

  const menuPanel = page.locator('#burger-menu-panel')

  // Check if element exists
  const exists = (await menuPanel.count()) > 0
  console.log('Menu panel exists:', exists)

  // Check computed styles
  const styles = await menuPanel.evaluate((el) => {
    const computed = window.getComputedStyle(el)
    return {
      display: computed.display,
      visibility: computed.visibility,
      opacity: computed.opacity,
      transform: computed.transform,
      pointerEvents: computed.pointerEvents,
      width: computed.width,
      height: computed.height,
      left: computed.left,
      top: computed.top,
    }
  })
  console.log('Menu panel styles:', styles)

  // Check bounding box
  const box = await menuPanel.boundingBox()
  console.log('Menu panel bounding box:', box)

  // Check visibility with Playwright
  const isVisible = await menuPanel.isVisible()
  console.log('Playwright isVisible:', isVisible)

  // Check if element is in viewport
  const isInViewport = await menuPanel.evaluate((el) => {
    const rect = el.getBoundingClientRect()
    return {
      inViewport:
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth,
      rect: {
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
        width: rect.width,
        height: rect.height,
      },
    }
  })
  console.log('In viewport:', isInViewport)

  await page.screenshot({ path: 'burger-menu-visibility-debug.png', fullPage: true })
})
