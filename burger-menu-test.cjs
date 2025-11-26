const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...devices['iPhone 13'],
  });
  const page = await context.newPage();

  console.log('📱 Testing burger menu on mobile...\n');

  await page.goto('https://cerebrumbiologyacademy.com', { waitUntil: 'networkidle' });

  // Take initial screenshot
  await page.screenshot({ path: '/tmp/burger-1-initial.png', fullPage: false });
  console.log('1. Initial page loaded');

  // Find and click the burger menu button
  const burgerButton = await page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], [class*="burger"], [class*="hamburger"], button:has(svg)').first();

  if (await burgerButton.isVisible()) {
    console.log('2. Found burger menu button, clicking...');
    await burgerButton.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/burger-2-menu-open.png', fullPage: false });
    console.log('3. Menu opened');

    // Log CSS of the navigation heading
    const navHeading = await page.locator('text="Navigation"').first();
    if (await navHeading.isVisible()) {
      const headingBox = await navHeading.boundingBox();
      console.log('\n📍 "Navigation" heading position:', headingBox);
    }

    // Check for any overlapping elements
    const allTextInMenu = await page.evaluate(() => {
      const menu = document.querySelector('[class*="mobile-menu"], [class*="MobileNav"], [class*="nav-menu"], [role="dialog"]');
      if (menu) {
        return {
          html: menu.innerHTML.substring(0, 2000),
          classList: menu.className,
        };
      }
      return null;
    });

    if (allTextInMenu) {
      console.log('\n📋 Menu container class:', allTextInMenu.classList);
    }

    // Scroll up inside the menu to see if header becomes fixed/sticky
    console.log('\n4. Testing scroll behavior...');

    // First scroll the page down before opening menu
    await burgerButton.click(); // close menu
    await page.waitForTimeout(300);

    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);
    await page.screenshot({ path: '/tmp/burger-3-scrolled-page.png', fullPage: false });
    console.log('5. Page scrolled down 500px');

    // Open menu again after scrolling
    await burgerButton.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/burger-4-menu-after-scroll.png', fullPage: false });
    console.log('6. Menu opened after page scroll');

    // Check if there are multiple navigation headers or overlapping elements
    const overlappingCheck = await page.evaluate(() => {
      const elements = document.querySelectorAll('nav, [class*="nav"], [class*="header"], [class*="Navigation"]');
      const results = [];
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && rect.top < 200) {
          results.push({
            tag: el.tagName,
            className: el.className.substring(0, 80),
            top: rect.top,
            height: rect.height,
            zIndex: window.getComputedStyle(el).zIndex
          });
        }
      });
      return results;
    });

    console.log('\n📊 Elements near top of viewport:');
    overlappingCheck.forEach(el => {
      console.log('  - ' + el.tag + ' | class: ' + el.className + ' | top: ' + el.top + ' | z-index: ' + el.zIndex);
    });

  } else {
    console.log('❌ Could not find burger menu button');
  }

  await browser.close();
  console.log('\n✅ Screenshots saved to /tmp/burger-*.png');
})();
