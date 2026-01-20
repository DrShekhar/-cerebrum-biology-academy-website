/**
 * Manual test script to verify conditional display of Aria/Ceri
 * Run with: npx tsx test-conditional-display.ts
 */

import { chromium } from '@playwright/test'

async function testConditionalDisplay() {
  console.log('🧪 Testing Conditional Display for Aria Sales Agent...\n')

  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  })
  const page = await context.newPage()

  // Test 1: Public page (homepage) - should show Aria
  console.log('📋 Test 1: Public Page (Homepage)')
  console.log('  Expected: Aria visible, Ceri not present')
  await page.goto('http://localhost:3000')
  await page.waitForTimeout(5000) // Wait for Aria to load (3s delay + render)

  const ariaOnPublic = await page.locator('[data-testid="sales-agent-widget"]').isVisible()
  const ariaButtonOnPublic = await page
    .locator('button:has-text("Ask About Courses")')
    .isVisible()
    .catch(() => false)

  console.log(`  ✓ Aria visible: ${ariaOnPublic || ariaButtonOnPublic}`)
  console.log(`  ✓ WhatsApp button present: ${await page.locator('button[aria-label*="WhatsApp"]').isVisible()}`)
  console.log()

  // Test 2: Landing page - should also show Aria
  console.log('📋 Test 2: Landing Page (NEET Biology Coaching)')
  console.log('  Expected: Aria visible')
  await page.goto('http://localhost:3000/neet-biology-coaching-delhi-ncr')
  await page.waitForTimeout(5000)

  const ariaOnLanding = await page.locator('[data-testid="sales-agent-widget"]').isVisible()
  console.log(`  ✓ Aria visible: ${ariaOnLanding}`)
  console.log()

  // Test 3: Check authentication flow
  console.log('📋 Test 3: Authentication Check')
  console.log('  Note: To test authenticated state, manually log in and check dashboard')
  console.log('  Expected behavior after login:')
  console.log('    - Dashboard: Aria hidden, Ceri shown (if implemented)')
  console.log('    - Public pages: Aria hidden (user logged in)')
  console.log()

  console.log('✅ Tests completed!')
  console.log('\n📝 Manual verification steps:')
  console.log('1. Log in to the application')
  console.log('2. Navigate to /student/dashboard')
  console.log('3. Verify Aria is NOT visible')
  console.log('4. Verify WhatsApp button IS visible')
  console.log('5. Navigate back to homepage')
  console.log('6. Verify Aria is NOT visible (because logged in)')

  await browser.close()
}

testConditionalDisplay().catch(console.error)
