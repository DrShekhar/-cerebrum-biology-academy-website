import { chromium } from '@playwright/test'

async function testBurgerMenuOnProduction() {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OSX) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
  })
  const page = await context.newPage()

  console.log('🚀 Testing burger menu on production...')

  try {
    // Go to production
    await page.goto('https://cerebrumbiologyacademy.com', { waitUntil: 'domcontentloaded', timeout: 60000 })
    console.log('✅ Loaded production homepage')
    await page.waitForTimeout(2000) // Wait for initial render

    // Find burger button
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    const isBurgerVisible = await burgerButton.isVisible()
    console.log(`📍 Burger button visible: ${isBurgerVisible}`)

    if (!isBurgerVisible) {
      console.log('❌ Burger button NOT found!')
      await browser.close()
      return
    }

    // Take screenshot before click
    await page.screenshot({
      path: 'test-results/burger-menu-closed.png',
      fullPage: false,
    })
    console.log('📸 Screenshot saved: burger-menu-closed.png')

    // Click burger button
    console.log('🖱️ Clicking burger button...')
    await burgerButton.click()
    await page.waitForTimeout(500) // Wait for animation

    // Check if panel is open
    const menuPanel = page.locator('#burger-menu-panel')
    const isPanelVisible = await menuPanel.isVisible()
    console.log(`📂 Menu panel visible: ${isPanelVisible}`)

    // Check for close button in panel
    const closeButton = page.locator('button[aria-label="Close navigation menu"]')
    const isCloseButtonVisible = await closeButton.isVisible()
    console.log(`❌ Close button (X) in panel visible: ${isCloseButtonVisible}`)

    // Check burger button transform state (should show X now)
    const burgerButtonAfterClick = await burgerButton.isVisible()
    console.log(`🔄 Burger button still visible after click: ${burgerButtonAfterClick}`)

    // Take screenshot after opening
    await page.screenshot({
      path: 'test-results/burger-menu-open.png',
      fullPage: false,
    })
    console.log('📸 Screenshot saved: burger-menu-open.png')

    // Try to click close button
    if (isCloseButtonVisible) {
      console.log('🖱️ Clicking close button (X)...')
      await closeButton.click()
      await page.waitForTimeout(500)

      const isPanelStillVisible = await menuPanel.isVisible()
      console.log(`📂 Menu panel still visible after close: ${isPanelStillVisible}`)

      // Take screenshot after closing
      await page.screenshot({
        path: 'test-results/burger-menu-after-close.png',
        fullPage: false,
      })
      console.log('📸 Screenshot saved: burger-menu-after-close.png')
    }

    console.log('\n✅ Test completed!')
    console.log('Check screenshots in test-results/ folder')
  } catch (error) {
    console.error('❌ Test failed:', error)
  } finally {
    await browser.close()
  }
}

testBurgerMenuOnProduction()
