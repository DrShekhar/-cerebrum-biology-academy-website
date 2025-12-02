import { chromium } from 'playwright'

async function checkPricingCards() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  })
  const page = await context.newPage()
  page.setDefaultTimeout(60000)

  console.log('Navigating to pricing page...')
  await page.goto('https://cerebrumbiologyacademy.com/pricing', { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(2000)

  // Close the popup if visible
  const closeButton = page.locator('button:has-text("×"), [class*="close"], button:has(svg)').first()
  try {
    if (await closeButton.isVisible({ timeout: 3000 })) {
      await closeButton.click()
      console.log('Closed popup')
      await page.waitForTimeout(500)
    }
  } catch (e) {
    console.log('No popup or already closed')
  }

  // Also try clicking Continue to Success button
  try {
    const continueBtn = page.locator('text=Continue to Success')
    if (await continueBtn.isVisible({ timeout: 2000 })) {
      await continueBtn.click()
      console.log('Clicked Continue to Success')
      await page.waitForTimeout(500)
    }
  } catch (e) {
    // ignore
  }

  // Scroll to find pricing cards
  await page.evaluate(() => window.scrollTo(0, 600))
  await page.waitForTimeout(1000)

  // Desktop - full view
  await page.screenshot({ path: 'pricing-cards-desktop.png' })
  console.log('Desktop pricing cards saved')

  // Mobile view
  await page.setViewportSize({ width: 375, height: 812 })
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'pricing-cards-mobile.png' })
  console.log('Mobile pricing cards saved')

  // Tablet view
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'pricing-cards-tablet.png' })
  console.log('Tablet pricing cards saved')

  // Check specific elements
  console.log('\n=== Pricing Cards Analysis ===')

  // Count pricing cards
  const priceElements = await page.locator('text=₹').count()
  console.log(`Price elements found: ${priceElements}`)

  // Check for truncate class (text overflow fix)
  const truncateCount = await page.locator('.truncate').count()
  console.log(`Elements with truncate class: ${truncateCount}`)

  // Check stats grid
  const statsGrids = await page.locator('[class*="grid-cols-4"]').count()
  console.log(`4-column grids found: ${statsGrids}`)

  await browser.close()
}

checkPricingCards().catch(console.error)
