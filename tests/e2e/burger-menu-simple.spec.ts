import { test, expect } from '@playwright/test'

test.use({
  viewport: { width: 375, height: 667 },
  isMobile: true,
})

test.describe('Burger Menu - Simple Test', () => {
  test('try different pages to find working page', async ({ page }) => {
    const pagesToTry = [
      '/courses',
      '/faculty',
      '/results',
      '/about',
      '/contact',
    ]

    for (const pagePath of pagesToTry) {
      console.log(`\n\nTrying page: ${pagePath}`)
      try {
        await page.goto(`http://localhost:3000${pagePath}`, {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })

        // Check if there's an error
        const hasError = await page.locator('text=Internal Server Error').count()
        if (hasError > 0) {
          console.log(`  ${pagePath}: Has Internal Server Error`)
          continue
        }

        // Check if burger menu exists
        const burgerButton = page.locator('button[aria-label="Toggle navigation menu"]')
        const isVisible = await burgerButton.isVisible().catch(() => false)

        if (isVisible) {
          console.log(`  ${pagePath}: Burger menu is VISIBLE!`)

          // Take screenshot
          await page.screenshot({ path: `burger-menu-visible-${pagePath.replace('/', '')}.png` })

          // Try clicking it
          await burgerButton.click()
          await page.waitForTimeout(1000)

          // Check if menu opened
          const menuPanel = page.locator('#burger-menu-panel')
          const menuVisible = await menuPanel.isVisible().catch(() => false)
          console.log(`  ${pagePath}: Menu panel visible after click: ${menuVisible}`)

          await page.screenshot({ path: `burger-menu-opened-${pagePath.replace('/', '')}.png` })

          break
        } else {
          console.log(`  ${pagePath}: Burger menu NOT visible`)
          await page.screenshot({ path: `page-${pagePath.replace('/', '')}.png` })
        }
      } catch (e) {
        console.log(`  ${pagePath}: Error navigating - ${e}`)
      }
    }
  })
})
