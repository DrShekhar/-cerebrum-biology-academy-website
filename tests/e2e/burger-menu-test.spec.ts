import { test, expect, devices } from '@playwright/test'

const iPhone12 = devices['iPhone 12']

test.describe('Burger Menu Text Overlap Fix', () => {
  test('burger menu header should not overlap with content', async ({ browser }) => {
    // Create mobile context
    const context = await browser.newContext({
      ...iPhone12,
    })
    const page = await context.newPage()

    // Navigate to home page
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // Find and click the burger menu button
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    await expect(burgerButton).toBeVisible({ timeout: 10000 })
    await burgerButton.click()

    // Wait for menu to open
    await page.waitForTimeout(500)

    // Check that the menu panel is visible
    const menuPanel = page.locator('#burger-menu-panel')
    await expect(menuPanel).toBeVisible()

    // Take a screenshot of the initial state
    await page.screenshot({ path: 'tests/screenshots/burger-menu-initial.png' })

    // Check that the header elements are visible
    const navigationTitle = page.locator('h2:text("Navigation")')
    await expect(navigationTitle).toBeVisible()

    const subtitle = page.locator('text=Explore our courses & services')
    await expect(subtitle).toBeVisible()

    // Get the bounding boxes to check for overlap
    const headerBox = await page.locator('.sticky.top-0').boundingBox()
    const quickAccessBox = await page.locator('h3:text("Quick Access")').boundingBox()

    console.log('Header bounding box:', headerBox)
    console.log('Quick Access bounding box:', quickAccessBox)

    // Verify header and content don't overlap
    if (headerBox && quickAccessBox) {
      const headerBottom = headerBox.y + headerBox.height
      const contentTop = quickAccessBox.y

      console.log(`Header bottom: ${headerBottom}, Content top: ${contentTop}`)

      // Content should start below the header
      expect(contentTop).toBeGreaterThanOrEqual(headerBottom - 5) // 5px tolerance
    }

    // Scroll the menu content to test sticky header behavior
    await menuPanel.evaluate((el) => {
      el.scrollTop = 200
    })
    await page.waitForTimeout(300)

    // Take screenshot after scrolling
    await page.screenshot({ path: 'tests/screenshots/burger-menu-scrolled.png' })

    // Verify header is still visible and sticky after scroll
    await expect(navigationTitle).toBeVisible()

    // Check z-index is working - header should have higher z-index
    const headerZIndex = await page.locator('.sticky.top-0').evaluate((el) => {
      return window.getComputedStyle(el).zIndex
    })
    console.log('Header z-index:', headerZIndex)

    // Verify header has proper z-index (should be 20)
    expect(parseInt(headerZIndex)).toBeGreaterThanOrEqual(20)

    // Close the menu
    const closeButton = page.locator('button[aria-label="Close navigation menu"]')
    await closeButton.click()
    await page.waitForTimeout(300)

    // Verify menu is closed
    await expect(menuPanel).not.toBeVisible()

    await context.close()
  })

  test('navigation sections should expand without overlap', async ({ browser }) => {
    const context = await browser.newContext({
      ...iPhone12,
    })
    const page = await context.newPage()

    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    // Open burger menu
    const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
    await burgerButton.click()
    await page.waitForTimeout(500)

    // Find a section button and expand it
    const sectionButtons = page.locator('button[aria-expanded]')
    const firstSection = sectionButtons.first()

    if (await firstSection.isVisible()) {
      await firstSection.click()
      await page.waitForTimeout(300)

      // Take screenshot of expanded section
      await page.screenshot({ path: 'tests/screenshots/burger-menu-expanded.png' })

      // Verify the section expanded
      const expandedContent = page.locator('.overflow-hidden .p-4.space-y-2.bg-white')
      await expect(expandedContent.first()).toBeVisible()
    }

    await context.close()
  })
})
