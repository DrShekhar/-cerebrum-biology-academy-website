import { chromium } from 'playwright'
import { resolve } from 'path'

async function visualCheck() {
  console.log('🎨 Starting visual check...\n')

  const browser = await chromium.launch()
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  })

  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

  const pages = [
    // Public-facing pages
    { route: '/', name: 'home', description: 'Homepage', category: 'public' },
    { route: '/courses', name: 'courses', description: 'Courses Page', category: 'public' },
    { route: '/faculty', name: 'faculty', description: 'Faculty Page', category: 'public' },
    { route: '/about', name: 'about', description: 'About Page', category: 'public' },
    { route: '/contact', name: 'contact', description: 'Contact Page', category: 'public' },

    // Course detail pages (SEO important)
    {
      route: '/courses/class-9th-foundation',
      name: 'course-detail-9th',
      description: 'Class 9th Course Detail',
      category: 'seo',
    },
    {
      route: '/courses/class-10th-foundation',
      name: 'course-detail-10th',
      description: 'Class 10th Course Detail',
      category: 'seo',
    },
    {
      route: '/courses/neet-2025-class-11th-foundation',
      name: 'course-detail-11th',
      description: 'Class 11th Course Detail',
      category: 'seo',
    },
    {
      route: '/courses/class-12th-neet-ascent',
      name: 'course-detail-12th',
      description: 'Class 12th Course Detail',
      category: 'seo',
    },
    {
      route: '/courses/neet-dropper-year',
      name: 'course-detail-dropper',
      description: 'Dropper Course Detail',
      category: 'seo',
    },

    // Internal/conversion pages
    { route: '/demo-booking', name: 'demo-booking', description: 'Demo Booking Page', category: 'internal' },
    { route: '/enrollment', name: 'enrollment', description: 'Enrollment Page', category: 'internal' },
    { route: '/results', name: 'results', description: 'Results Page', category: 'internal' },
    { route: '/tests', name: 'tests', description: 'Tests Page', category: 'internal' },

    // SEO landing pages
    { route: '/blog', name: 'blog', description: 'Blog Page', category: 'seo' },
  ]

  for (const { route, name, description, category } of pages) {
    try {
      const categoryEmoji = {
        public: '🌐',
        seo: '🔍',
        internal: '🔐',
      }[category] || '📄'
      console.log(`${categoryEmoji} Capturing: ${description} (${route})`)

      await page.goto(`${baseUrl}${route}`, {
        waitUntil: 'networkidle',
        timeout: 30000,
      })

      // Wait a bit for animations to settle
      await page.waitForTimeout(1000)

      const screenshotPath = resolve(__dirname, `../screenshots/${name}-desktop.png`)
      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
      })

      console.log(`   ✅ Saved: screenshots/${name}-desktop.png`)

      // Mobile screenshot
      await page.setViewportSize({ width: 375, height: 667 })
      await page.waitForTimeout(500)

      const mobileScreenshotPath = resolve(__dirname, `../screenshots/${name}-mobile.png`)
      await page.screenshot({
        path: mobileScreenshotPath,
        fullPage: true,
      })

      console.log(`   ✅ Saved: screenshots/${name}-mobile.png\n`)

      // Reset viewport
      await page.setViewportSize({ width: 1920, height: 1080 })
    } catch (error) {
      console.error(`   ❌ Error capturing ${description}:`, error)
    }
  }

  await browser.close()

  console.log('✨ Visual check complete!')
  console.log(`📁 Screenshots saved in: ${resolve(__dirname, '../screenshots')}`)
}

visualCheck().catch(console.error)
