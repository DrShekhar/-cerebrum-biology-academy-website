import { test, expect } from '@playwright/test'

test.describe('Burger Menu Z-Index Fix', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
  })

  test('burger menu panel should appear on top of all page content', async ({ page }) => {
    // Open the burger menu
    const burgerButton = page.locator('button[aria-controls="burger-menu-panel"]')
    await expect(burgerButton).toBeVisible()
    await burgerButton.click()

    // Wait for the menu panel to be visible
    const menuPanel = page.locator('#burger-menu-panel')
    await expect(menuPanel).toBeVisible()

    // Take a screenshot to verify menu is visible
    await page.screenshot({
      path: 'tests/screenshots/burger-menu-visible.png',
      fullPage: true,
    })

    // Check that the menu panel has the correct z-index
    const panelZIndex = await menuPanel.evaluate((el) => {
      return window.getComputedStyle(el).zIndex
    })
    console.log('Menu panel z-index:', panelZIndex)
    expect(parseInt(panelZIndex)).toBeGreaterThanOrEqual(10300)

    // Check that menu items are clickable (not hidden behind other elements)
    const servicesSection = page.locator('text=Services')
    await expect(servicesSection).toBeVisible()

    // Verify that clicking on a menu section works
    await servicesSection.click()

    // Check that the section expanded
    const ibBiologyLink = page.locator('text=IB Biology')
    await expect(ibBiologyLink).toBeVisible()

    // Verify the link is actually clickable (element at point test)
    const boundingBox = await ibBiologyLink.boundingBox()
    if (boundingBox) {
      const elementAtPoint = await page.evaluate(
        ({ x, y }) => {
          const el = document.elementFromPoint(x, y)
          return el?.textContent?.includes('IB Biology') || false
        },
        { x: boundingBox.x + 10, y: boundingBox.y + 10 }
      )
      expect(elementAtPoint).toBe(true)
    }

    // Close the menu
    const closeButton = page.locator('button[aria-label="Close navigation menu"]')
    await closeButton.click()
    await expect(menuPanel).not.toBeVisible()
  })

  test('burger menu overlay should block clicks to page content', async ({ page }) => {
    // Open the burger menu
    const burgerButton = page.locator('button[aria-controls="burger-menu-panel"]')
    await burgerButton.click()

    // Wait for overlay to appear
    const overlay = page.locator('.fixed.inset-0.bg-black.bg-opacity-50')
    await expect(overlay).toBeVisible()

    // Check overlay z-index
    const overlayZIndex = await overlay.evaluate((el) => {
      return window.getComputedStyle(el).zIndex
    })
    console.log('Overlay z-index:', overlayZIndex)
    expect(parseInt(overlayZIndex)).toBeGreaterThanOrEqual(10200)

    // Verify overlay is above the header
    const header = page.locator('header')
    const headerZIndex = await header.evaluate((el) => {
      return window.getComputedStyle(el).zIndex
    })
    console.log('Header z-index:', headerZIndex)
    expect(parseInt(overlayZIndex)).toBeGreaterThan(parseInt(headerZIndex))

    // Click overlay to close menu
    await overlay.click({ position: { x: 500, y: 300 } })
    await expect(overlay).not.toBeVisible()
  })

  test('burger menu button should have correct z-index', async ({ page }) => {
    const burgerButton = page.locator('button[aria-controls="burger-menu-panel"]')
    await expect(burgerButton).toBeVisible()

    const buttonZIndex = await burgerButton.evaluate((el) => {
      return window.getComputedStyle(el).zIndex
    })
    console.log('Burger button z-index:', buttonZIndex)
    expect(parseInt(buttonZIndex)).toBeGreaterThanOrEqual(10100)
  })

  test('verify z-index hierarchy: button < overlay < panel', async ({ page }) => {
    // Open menu
    const burgerButton = page.locator('button[aria-controls="burger-menu-panel"]')
    await burgerButton.click()

    // Get all z-index values
    const buttonZIndex = await burgerButton.evaluate((el) =>
      parseInt(window.getComputedStyle(el).zIndex)
    )
    const overlay = page.locator('.fixed.inset-0.bg-black.bg-opacity-50')
    const overlayZIndex = await overlay.evaluate((el) =>
      parseInt(window.getComputedStyle(el).zIndex)
    )
    const menuPanel = page.locator('#burger-menu-panel')
    const panelZIndex = await menuPanel.evaluate((el) =>
      parseInt(window.getComputedStyle(el).zIndex)
    )

    console.log('Z-index hierarchy:', { buttonZIndex, overlayZIndex, panelZIndex })

    // Verify hierarchy
    expect(buttonZIndex).toBeLessThan(overlayZIndex)
    expect(overlayZIndex).toBeLessThan(panelZIndex)
  })

  test('menu items should be visible and not covered by page content', async ({ page }) => {
    // Open the burger menu
    const burgerButton = page.locator('button[aria-controls="burger-menu-panel"]')
    await burgerButton.click()

    // Wait for menu to open
    const menuPanel = page.locator('#burger-menu-panel')
    await expect(menuPanel).toBeVisible()

    // Get all section buttons
    const sections = [
      'Services',
      'Courses',
      'Resources',
      'International Students',
      'Support',
    ]

    for (const sectionName of sections) {
      const section = page.locator(`text=${sectionName}`).first()
      await expect(section).toBeVisible()

      // Check that the element is actually at the expected position (not covered)
      const boundingBox = await section.boundingBox()
      if (boundingBox) {
        const elementAtPoint = await page.evaluate(
          ({ x, y }) => {
            const el = document.elementFromPoint(x, y)
            return {
              tag: el?.tagName,
              text: el?.textContent,
              className: el?.className,
            }
          },
          { x: boundingBox.x + 100, y: boundingBox.y + 10 }
        )
        console.log(`Element at ${sectionName}:`, elementAtPoint)

        // The element at this point should be part of the burger menu
        expect(elementAtPoint.text).toContain(sectionName)
      }
    }

    // Close menu
    await page.locator('button[aria-label="Close navigation menu"]').click()
  })

  test('menu should be above FloatingCTA component', async ({ page }) => {
    // Scroll down to trigger FloatingCTA
    await page.evaluate(() => window.scrollTo(0, 1000))
    await page.waitForTimeout(500)

    // Open burger menu
    const burgerButton = page.locator('button[aria-controls="burger-menu-panel"]')
    await burgerButton.click()

    // Wait for menu
    const menuPanel = page.locator('#burger-menu-panel')
    await expect(menuPanel).toBeVisible()

    // Get z-indices
    const panelZIndex = await menuPanel.evaluate((el) =>
      parseInt(window.getComputedStyle(el).zIndex)
    )

    // FloatingCTA has z-[70] for mobile and z-[60] for desktop
    // Menu panel should be much higher
    expect(panelZIndex).toBeGreaterThan(100)

    // Take screenshot
    await page.screenshot({
      path: 'tests/screenshots/burger-menu-above-floating-cta.png',
      fullPage: true,
    })
  })

  test('menu should be above SuccessTicker component', async ({ page }) => {
    // Wait for SuccessTicker to appear (it has a 3s delay)
    await page.waitForTimeout(4000)

    // Open burger menu
    const burgerButton = page.locator('button[aria-controls="burger-menu-panel"]')
    await burgerButton.click()

    // Wait for menu
    const menuPanel = page.locator('#burger-menu-panel')
    await expect(menuPanel).toBeVisible()

    // Get menu panel z-index
    const panelZIndex = await menuPanel.evaluate((el) =>
      parseInt(window.getComputedStyle(el).zIndex)
    )

    // SuccessTicker has z-50
    expect(panelZIndex).toBeGreaterThan(50)

    // Take screenshot
    await page.screenshot({
      path: 'tests/screenshots/burger-menu-above-success-ticker.png',
      fullPage: true,
    })
  })
})
