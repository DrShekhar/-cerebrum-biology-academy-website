import { test, expect } from '@playwright/test'

test.use({
  viewport: { width: 375, height: 667 },
  isMobile: true,
})

test.describe('Diagnostic Tests', () => {
  test('check homepage loads', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 })

    // Take a screenshot
    await page.screenshot({ path: 'homepage-diagnostic.png', fullPage: true })

    // Get page title
    const title = await page.title()
    console.log('Page title:', title)

    // Get page content
    const bodyText = await page.locator('body').textContent()
    console.log('Body text (first 200 chars):', bodyText?.substring(0, 200))

    // Check if there's an error
    const hasError = await page.locator('text=Internal Server Error').count()
    if (hasError > 0) {
      console.log('ERROR: Internal Server Error detected')

      // Try to get more details
      const fullText = await page.textContent('body')
      console.log('Full error page:', fullText)
    }

    // List all buttons
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()
    console.log('Number of buttons found:', buttonCount)

    for (let i = 0; i < Math.min(buttonCount, 10); i++) {
      const button = buttons.nth(i)
      const ariaLabel = await button.getAttribute('aria-label')
      const text = await button.textContent()
      console.log(`Button ${i}: aria-label="${ariaLabel}", text="${text}"`)
    }
  })
})
