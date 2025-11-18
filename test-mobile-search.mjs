import { chromium } from 'playwright'

async function testMobileSearch() {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  })

  const page = await context.newPage()

  console.log('📱 Opening homepage in mobile viewport (375x667 - iPhone SE)...')
  await page.goto('https://cerebrumbiologyacademy.com', {
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  })

  console.log('📸 Taking initial screenshot...')
  await page.screenshot({ path: 'mobile-search-before.png', fullPage: false })

  console.log('🔍 Locating search button...')
  const searchButton = page.locator('button[aria-label="Open search menu"]')

  const isVisible = await searchButton.isVisible()
  console.log(`✅ Search button visible: ${isVisible}`)

  if (isVisible) {
    const box = await searchButton.boundingBox()
    console.log('📐 Search button position:', box)

    console.log('🎯 Highlighting search button...')
    await searchButton.evaluate((el) => {
      el.style.border = '3px solid red'
      el.style.boxShadow = '0 0 10px red'
    })

    await page.screenshot({ path: 'mobile-search-highlighted.png', fullPage: false })

    console.log('👆 Clicking search button...')
    await searchButton.click()

    await page.waitForTimeout(1000)

    console.log('📸 Taking screenshot after click...')
    await page.screenshot({ path: 'mobile-search-after-click.png', fullPage: false })

    console.log('🔍 Checking if search modal opened...')
    const searchModal = page.locator('div.fixed.inset-0.bg-black.bg-opacity-50')
    const modalVisible = await searchModal.isVisible()
    console.log(`✅ Search modal visible: ${modalVisible}`)

    if (modalVisible) {
      console.log('✅ SUCCESS: Search button is working on mobile!')
    } else {
      console.log('❌ ISSUE: Search modal did not open after clicking button')

      console.log('\n📊 Checking console errors...')
      page.on('console', (msg) => console.log('BROWSER CONSOLE:', msg.text()))
      page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message))

      await searchButton.click()
      await page.waitForTimeout(1000)
    }

    console.log('\n🔍 Inspecting DOM state...')
    const headerState = await page.evaluate(() => {
      const searchBtn = document.querySelector('button[aria-label="Open search menu"]')
      const modal = document.querySelector('.fixed.inset-0')
      return {
        buttonExists: !!searchBtn,
        buttonClasses: searchBtn?.className,
        modalExists: !!modal,
        modalClasses: modal?.className,
        bodyOverflow: document.body.style.overflow,
      }
    })

    console.log('DOM State:', JSON.stringify(headerState, null, 2))
  } else {
    console.log('❌ ISSUE: Search button is not visible on mobile!')
  }

  console.log('\n✅ Test complete. Screenshots saved:')
  console.log('   - mobile-search-before.png')
  console.log('   - mobile-search-highlighted.png')
  console.log('   - mobile-search-after-click.png')

  await page.waitForTimeout(5000)
  await browser.close()
}

testMobileSearch().catch(console.error)
