#!/usr/bin/env node

/**
 * Screenshot Capture Utility for Development Reference
 * Usage: node scripts/capture-screenshots.js
 */

import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const SITE_URL = 'http://localhost:3000'
const SCREENSHOT_DIR = './screenshots'

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

const pages = [
  { name: 'homepage', url: '/', description: 'Homepage - Full page' },
  { name: 'courses', url: '/courses', description: 'Courses overview page' },
  { name: 'course-class-11', url: '/courses/class-11', description: 'Class 11 course page' },
  { name: 'course-class-12', url: '/courses/class-12', description: 'Class 12 course page' },
  {
    name: 'course-neet-dropper',
    url: '/courses/neet-dropper',
    description: 'NEET Dropper course page',
  },
  { name: 'course-foundation', url: '/courses/foundation', description: 'Foundation course page' },
  { name: 'faculty', url: '/faculty', description: 'Faculty page' },
  { name: 'about', url: '/about', description: 'About page' },
  { name: 'contact', url: '/contact', description: 'Contact page' },
  { name: 'admin-dashboard', url: '/admin', description: 'Admin dashboard' },
]

async function captureScreenshots() {
  console.log('🚀 Starting screenshot capture...')

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1920, height: 1080 },
  })

  try {
    for (const page of pages) {
      console.log(`📸 Capturing: ${page.description}`)

      const browserPage = await browser.newPage()
      await browserPage.goto(`${SITE_URL}${page.url}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      })

      // Wait for any animations to complete
      await browserPage.waitForTimeout(2000)

      // Capture full page screenshot
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const filename = `${page.name}-${timestamp}.png`
      const filepath = path.join(SCREENSHOT_DIR, filename)

      await browserPage.screenshot({
        path: filepath,
        fullPage: true,
        quality: 90,
      })

      console.log(`✅ Saved: ${filepath}`)
      await browserPage.close()
    }

    console.log('🎉 All screenshots captured successfully!')
    console.log(`📁 Screenshots saved to: ${SCREENSHOT_DIR}`)
  } catch (error) {
    console.error('❌ Error capturing screenshots:', error)
  } finally {
    await browser.close()
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  captureScreenshots()
}

export default captureScreenshots
