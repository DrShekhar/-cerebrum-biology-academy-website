import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const MOBILE_VIEWPORT = {
  width: 375,
  height: 812,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
}

const PAGES_TO_TEST = [
  { url: 'https://cerebrumbiologyacademy.com', name: 'homepage' },
  { url: 'https://cerebrumbiologyacademy.com/blog', name: 'blog-list' },
  { url: 'https://cerebrumbiologyacademy.com/courses', name: 'courses' },
  { url: 'https://cerebrumbiologyacademy.com/demo-booking', name: 'demo-booking' },
]

const SCREENSHOT_DIR = './mobile-audit-screenshots'
const REPORT_FILE = './MOBILE_AUDIT_REPORT.md'

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function takeScreenshot(page, name) {
  const filename = path.join(SCREENSHOT_DIR, `${name}.png`)
  await page.screenshot({ path: filename, fullPage: true })
  console.log(`Screenshot saved: ${filename}`)
  return filename
}

async function checkElement(page, selector, description) {
  try {
    const element = await page.$(selector)
    if (!element) {
      return { status: 'missing', description, selector }
    }

    const box = await element.boundingBox()
    const styles = await page.evaluate((sel) => {
      const el = document.querySelector(sel)
      if (!el) return null
      const computed = window.getComputedStyle(el)
      return {
        display: computed.display,
        visibility: computed.visibility,
        opacity: computed.opacity,
        fontSize: computed.fontSize,
        padding: computed.padding,
        margin: computed.margin,
        width: computed.width,
        height: computed.height,
        overflow: computed.overflow,
        zIndex: computed.zIndex,
        position: computed.position,
      }
    }, selector)

    return {
      status: 'found',
      description,
      selector,
      boundingBox: box,
      styles,
    }
  } catch (error) {
    return { status: 'error', description, selector, error: error.message }
  }
}

async function getConsoleErrors(page) {
  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text())
    }
  })
  page.on('pageerror', (error) => {
    errors.push(error.toString())
  })
  return errors
}

async function checkOverflow(page) {
  return await page.evaluate(() => {
    const overflowingElements = []
    const elements = document.querySelectorAll('*')

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.width > window.innerWidth) {
        const styles = window.getComputedStyle(el)
        overflowingElements.push({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          width: rect.width,
          viewportWidth: window.innerWidth,
          overflow: styles.overflow,
          overflowX: styles.overflowX,
        })
      }
    })

    return overflowingElements
  })
}

async function checkTouchTargets(page) {
  return await page.evaluate(() => {
    const MIN_TOUCH_TARGET = 44 // iOS standard
    const smallTargets = []

    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea, [role="button"], [onclick]'
    )

    interactiveElements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (
        rect.width > 0 &&
        rect.height > 0 &&
        (rect.width < MIN_TOUCH_TARGET || rect.height < MIN_TOUCH_TARGET)
      ) {
        smallTargets.push({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          text: el.textContent?.substring(0, 50) || '',
          width: rect.width,
          height: rect.height,
          minRequired: MIN_TOUCH_TARGET,
        })
      }
    })

    return smallTargets
  })
}

async function checkTextReadability(page) {
  return await page.evaluate(() => {
    const MIN_FONT_SIZE = 16 // Recommended minimum for mobile
    const smallText = []

    const textElements = document.querySelectorAll(
      'p, span, div, h1, h2, h3, h4, h5, h6, a, button, label'
    )

    textElements.forEach((el) => {
      const styles = window.getComputedStyle(el)
      const fontSize = parseFloat(styles.fontSize)

      if (fontSize > 0 && fontSize < MIN_FONT_SIZE && el.textContent?.trim()) {
        smallText.push({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          text: el.textContent?.substring(0, 50) || '',
          fontSize: fontSize,
          minRecommended: MIN_FONT_SIZE,
        })
      }
    })

    return smallText
  })
}

async function testPage(browser, pageInfo) {
  console.log(`\n=== Testing: ${pageInfo.name} (${pageInfo.url}) ===`)

  const page = await browser.newPage()
  await page.setViewport(MOBILE_VIEWPORT)

  const consoleErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text())
    }
  })
  page.on('pageerror', (error) => {
    consoleErrors.push(error.toString())
  })

  const report = {
    page: pageInfo.name,
    url: pageInfo.url,
    timestamp: new Date().toISOString(),
    issues: [],
    screenshots: [],
  }

  try {
    // Navigate and wait
    await page.goto(pageInfo.url, { waitUntil: 'networkidle2', timeout: 30000 })
    await delay(2000)

    // Initial screenshot
    const initialScreenshot = await takeScreenshot(page, `${pageInfo.name}-initial`)
    report.screenshots.push({ type: 'initial', path: initialScreenshot })

    // Check header/navigation
    console.log('Checking header/navigation...')
    const burgerMenu = await checkElement(
      page,
      '[data-testid="burger-menu"], .burger-menu, button[aria-label*="menu" i]',
      'Burger Menu Button'
    )
    const logo = await checkElement(page, 'img[alt*="logo" i], .logo, [data-testid="logo"]', 'Logo')

    if (burgerMenu.status === 'found') {
      report.issues.push({
        severity: 'info',
        category: 'header',
        element: burgerMenu.selector,
        message: `Burger menu found with dimensions: ${burgerMenu.boundingBox?.width}x${burgerMenu.boundingBox?.height}`,
        styles: burgerMenu.styles,
      })

      // Test burger menu interaction
      try {
        await page.click(burgerMenu.selector)
        await delay(1000)
        const menuOpenScreenshot = await takeScreenshot(page, `${pageInfo.name}-menu-open`)
        report.screenshots.push({ type: 'menu-open', path: menuOpenScreenshot })

        // Close menu
        await page.click(burgerMenu.selector)
        await delay(500)
      } catch (error) {
        report.issues.push({
          severity: 'error',
          category: 'header',
          element: burgerMenu.selector,
          message: `Failed to interact with burger menu: ${error.message}`,
        })
      }
    } else {
      report.issues.push({
        severity: 'warning',
        category: 'header',
        element: burgerMenu.selector,
        message: 'Burger menu not found',
      })
    }

    // Check overflow
    console.log('Checking for overflow issues...')
    const overflowElements = await checkOverflow(page)
    if (overflowElements.length > 0) {
      report.issues.push({
        severity: 'error',
        category: 'layout',
        message: `${overflowElements.length} elements overflow viewport width`,
        details: overflowElements,
      })
    }

    // Check touch targets
    console.log('Checking touch target sizes...')
    const smallTargets = await checkTouchTargets(page)
    if (smallTargets.length > 0) {
      report.issues.push({
        severity: 'warning',
        category: 'accessibility',
        message: `${smallTargets.length} interactive elements smaller than 44px minimum touch target`,
        details: smallTargets.slice(0, 10), // Limit to first 10
      })
    }

    // Check text readability
    console.log('Checking text readability...')
    const smallText = await checkTextReadability(page)
    if (smallText.length > 0) {
      report.issues.push({
        severity: 'warning',
        category: 'readability',
        message: `${smallText.length} text elements smaller than 16px recommended size`,
        details: smallText.slice(0, 10), // Limit to first 10
      })
    }

    // Check for specific page elements
    if (pageInfo.name === 'homepage') {
      console.log('Checking hero section...')
      const heroHeading = await checkElement(
        page,
        'h1, [class*="hero" i] h1, [class*="hero" i] h2',
        'Hero Heading'
      )
      const heroCTA = await checkElement(
        page,
        '[class*="hero" i] button, [class*="hero" i] a[class*="button" i]',
        'Hero CTA Button'
      )

      if (heroHeading.status === 'found') {
        const fontSize = parseFloat(heroHeading.styles.fontSize)
        if (fontSize < 24) {
          report.issues.push({
            severity: 'warning',
            category: 'hero',
            element: heroHeading.selector,
            message: `Hero heading font size too small: ${fontSize}px (recommended: 24px+)`,
          })
        }
      }
    }

    if (pageInfo.name === 'blog-list') {
      console.log('Checking blog page...')
      // Scroll to bottom to find lead capture form
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await delay(1000)

      const leadForm = await checkElement(
        page,
        'form, [class*="lead" i] form, [class*="capture" i] form, [class*="subscribe" i] form',
        'Lead Capture Form'
      )
      const bottomScreenshot = await takeScreenshot(page, `${pageInfo.name}-bottom`)
      report.screenshots.push({ type: 'bottom-form', path: bottomScreenshot })

      if (leadForm.status === 'found') {
        report.issues.push({
          severity: 'info',
          category: 'forms',
          element: leadForm.selector,
          message: 'Lead capture form found at bottom',
          styles: leadForm.styles,
        })
      }
    }

    if (pageInfo.name === 'demo-booking') {
      console.log('Checking demo booking form...')
      const formFields = await page.$$('input, select, textarea')
      report.issues.push({
        severity: 'info',
        category: 'forms',
        message: `Demo booking form has ${formFields.length} form fields`,
      })
    }

    // Console errors
    if (consoleErrors.length > 0) {
      report.issues.push({
        severity: 'error',
        category: 'console',
        message: `${consoleErrors.length} console errors detected`,
        details: consoleErrors.slice(0, 5), // Limit to first 5
      })
    }

    // Final screenshot after all interactions
    const finalScreenshot = await takeScreenshot(page, `${pageInfo.name}-final`)
    report.screenshots.push({ type: 'final', path: finalScreenshot })
  } catch (error) {
    report.issues.push({
      severity: 'critical',
      category: 'page-load',
      message: `Failed to load or test page: ${error.message}`,
    })
  } finally {
    await page.close()
  }

  return report
}

async function generateMarkdownReport(reports) {
  let markdown = `# Mobile UX Audit Report\n\n`
  markdown += `**Generated:** ${new Date().toISOString()}\n\n`
  markdown += `**Viewport:** ${MOBILE_VIEWPORT.width}x${MOBILE_VIEWPORT.height} (iPhone X/11/12)\n\n`
  markdown += `## Summary\n\n`

  const totalIssues = reports.reduce((sum, r) => sum + r.issues.length, 0)
  const criticalIssues = reports.reduce(
    (sum, r) => sum + r.issues.filter((i) => i.severity === 'critical').length,
    0
  )
  const errorIssues = reports.reduce(
    (sum, r) => sum + r.issues.filter((i) => i.severity === 'error').length,
    0
  )
  const warningIssues = reports.reduce(
    (sum, r) => sum + r.issues.filter((i) => i.severity === 'warning').length,
    0
  )

  markdown += `- **Total Issues:** ${totalIssues}\n`
  markdown += `- **Critical:** ${criticalIssues}\n`
  markdown += `- **Errors:** ${errorIssues}\n`
  markdown += `- **Warnings:** ${warningIssues}\n\n`

  markdown += `---\n\n`

  for (const report of reports) {
    markdown += `## Page: ${report.page}\n\n`
    markdown += `**URL:** ${report.url}\n\n`

    if (report.screenshots.length > 0) {
      markdown += `### Screenshots\n\n`
      for (const screenshot of report.screenshots) {
        markdown += `- **${screenshot.type}:** \`${screenshot.path}\`\n`
      }
      markdown += `\n`
    }

    if (report.issues.length === 0) {
      markdown += `✅ **No issues found**\n\n`
    } else {
      markdown += `### Issues Found (${report.issues.length})\n\n`

      const grouped = {
        critical: report.issues.filter((i) => i.severity === 'critical'),
        error: report.issues.filter((i) => i.severity === 'error'),
        warning: report.issues.filter((i) => i.severity === 'warning'),
        info: report.issues.filter((i) => i.severity === 'info'),
      }

      for (const [severity, issues] of Object.entries(grouped)) {
        if (issues.length > 0) {
          markdown += `#### ${severity.toUpperCase()} (${issues.length})\n\n`

          for (const issue of issues) {
            markdown += `**Category:** ${issue.category}\n\n`
            markdown += `**Message:** ${issue.message}\n\n`

            if (issue.element) {
              markdown += `**Element:** \`${issue.element}\`\n\n`
            }

            if (issue.styles) {
              markdown += `**Styles:**\n\`\`\`json\n${JSON.stringify(issue.styles, null, 2)}\n\`\`\`\n\n`
            }

            if (issue.details) {
              markdown += `**Details:**\n\`\`\`json\n${JSON.stringify(issue.details, null, 2)}\n\`\`\`\n\n`
            }

            markdown += `---\n\n`
          }
        }
      }
    }

    markdown += `\n---\n\n`
  }

  markdown += `## Recommendations\n\n`
  markdown += `### Critical Fixes\n`
  markdown += `1. Address all overflow issues - elements should not exceed viewport width\n`
  markdown += `2. Ensure all interactive elements meet 44x44px minimum touch target size\n`
  markdown += `3. Fix any console errors that may affect functionality\n\n`

  markdown += `### UX Improvements\n`
  markdown += `1. Increase font sizes for better readability on mobile (minimum 16px)\n`
  markdown += `2. Add adequate padding/spacing between interactive elements\n`
  markdown += `3. Test all forms for mobile usability\n`
  markdown += `4. Verify burger menu animations and transitions\n\n`

  markdown += `### Testing Notes\n`
  markdown += `- All tests performed on simulated iPhone X viewport (375x812)\n`
  markdown += `- Screenshots saved to \`${SCREENSHOT_DIR}\`\n`
  markdown += `- Manual testing recommended for touch interactions and gestures\n`

  return markdown
}

async function main() {
  console.log('Starting mobile UX audit...')

  // Create screenshot directory
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const reports = []

    for (const pageInfo of PAGES_TO_TEST) {
      const report = await testPage(browser, pageInfo)
      reports.push(report)
    }

    // Generate markdown report
    const markdownReport = await generateMarkdownReport(reports)
    fs.writeFileSync(REPORT_FILE, markdownReport)
    console.log(`\n✅ Report generated: ${REPORT_FILE}`)

    // Also save JSON for programmatic access
    fs.writeFileSync('./mobile-audit-report.json', JSON.stringify(reports, null, 2))
    console.log(`✅ JSON data saved: ./mobile-audit-report.json`)
  } finally {
    await browser.close()
  }

  console.log('\n✅ Mobile audit complete!')
}

main().catch(console.error)
