import { chromium } from 'playwright'

async function checkPricingUI() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  })
  const page = await context.newPage()
  page.setDefaultTimeout(60000)

  console.log('Navigating to pricing page...')
  await page.goto('https://cerebrumbiologyacademy.com/pricing', { waitUntil: 'domcontentloaded', timeout: 60000 })

  // Wait for content to load
  await page.waitForTimeout(3000)

  // Take full page screenshot
  await page.screenshot({ path: 'pricing-desktop.png', fullPage: false })
  console.log('Desktop screenshot saved: pricing-desktop.png')

  // Take mobile screenshot
  await page.setViewportSize({ width: 375, height: 812 })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: 'pricing-mobile.png', fullPage: false })
  console.log('Mobile screenshot saved: pricing-mobile.png')

  // Take tablet screenshot
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: 'pricing-tablet.png', fullPage: false })
  console.log('Tablet screenshot saved: pricing-tablet.png')

  // Analyze the page
  console.log('\n=== UI Analysis ===')

  // Check if pricing cards are visible
  const cards = await page.locator('[class*="rounded"]').count()
  console.log(`Found ${cards} card elements`)

  // Check for text overflow issues
  const truncatedElements = await page.locator('.truncate').count()
  console.log(`Elements with truncate class: ${truncatedElements}`)

  // Get pricing card heights
  const pricingCards = page.locator('text=₹').first()
  const isVisible = await pricingCards.isVisible()
  console.log(`Price visible without scroll: ${isVisible}`)

  // Check viewport height vs content
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight)
  console.log(`Page body height: ${bodyHeight}px`)

  await browser.close()
  console.log('\nScreenshots saved. Check pricing-desktop.png, pricing-mobile.png, pricing-tablet.png')
}

checkPricingUI().catch(console.error)
