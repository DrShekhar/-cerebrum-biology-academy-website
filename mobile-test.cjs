const { chromium, devices } = require('playwright')

const iPhone = devices['iPhone 13']
const baseUrl = 'https://cerebrumbiologyacademy.com'

const publicPages = [
  { path: '/', name: 'Home' },
  { path: '/courses', name: 'Courses' },
  { path: '/courses/class-11', name: 'Class 11' },
  { path: '/courses/class-12', name: 'Class 12' },
  { path: '/courses/neet-dropper', name: 'NEET Dropper' },
  { path: '/results', name: 'Results' },
  { path: '/faculty', name: 'Faculty' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/demo-booking', name: 'Demo Booking' },
  { path: '/admissions', name: 'Admissions' },
  { path: '/pricing', name: 'Pricing' },
  { path: '/testimonials', name: 'Testimonials' },
  { path: '/success-stories', name: 'Success Stories' },
  { path: '/auth/whatsapp', name: 'WhatsApp Auth' },
]

async function test() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ ...iPhone })
  const results = []

  for (const page of publicPages) {
    const p = await context.newPage()
    try {
      const res = await p.goto(baseUrl + page.path, {
        waitUntil: 'domcontentloaded',
        timeout: 20000,
      })
      const status = res ? res.status() : 0
      const overflow = await p.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      )
      const height = await p.evaluate(() => document.body.scrollHeight)

      let issues = []
      if (status !== 200) issues.push('HTTP ' + status)
      if (overflow) issues.push('Horizontal overflow')
      if (height < 200) issues.push('Content too short')

      results.push({
        name: page.name,
        path: page.path,
        status,
        overflow,
        height,
        issues,
        ok: issues.length === 0,
      })
      console.log(
        (issues.length === 0 ? '✅' : '❌') +
          ' ' +
          page.name +
          ' (' +
          page.path +
          ')' +
          (issues.length ? ' - ' + issues.join(', ') : '')
      )
    } catch (e) {
      results.push({ name: page.name, path: page.path, error: e.message, ok: false })
      console.log('❌ ' + page.name + ' - ERROR: ' + e.message.substring(0, 60))
    }
    await p.close()
  }

  await browser.close()

  const passed = results.filter((r) => r.ok).length
  console.log('\n========================================')
  console.log('SUMMARY: ' + passed + '/' + results.length + ' pages passed')
  console.log('========================================')
}

test()
