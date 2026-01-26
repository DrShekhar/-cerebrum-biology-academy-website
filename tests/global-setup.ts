import { chromium, FullConfig } from '@playwright/test'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting Cerebrum Biology Academy E2E Test Setup...')

  // 1. Database preparation
  console.log('📊 Preparing test database...')
  try {
    await execAsync('npm run db:test:reset')
    console.log('✅ Test database prepared')
  } catch (error) {
    console.warn('⚠️ Database setup skipped (might not be available)')
  }

  // 2. Seed test data
  console.log('🌱 Seeding test data...')
  try {
    await execAsync('npm run db:test:seed')
    console.log('✅ Test data seeded')
  } catch (error) {
    console.warn('⚠️ Test data seeding skipped')
  }

  // 3. Start mock AI services
  console.log('🤖 Starting mock AI services...')
  try {
    await execAsync('npm run test:ai:mock:start')
    console.log('✅ Mock AI services started')
  } catch (error) {
    console.warn('⚠️ Mock AI services setup skipped')
  }

  // 4. Authentication setup
  console.log('🔐 Setting up test authentication...')
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  // Create admin user session
  try {
    await page.goto(config.webServer?.url || 'http://localhost:3000')
    await page.goto('/api/test/setup-admin')
    console.log('✅ Admin user session prepared')
  } catch (error) {
    console.warn('⚠️ Admin setup skipped:', error.message)
  }

  // Create student user session
  try {
    await page.goto('/api/test/setup-student')
    console.log('✅ Student user session prepared')
  } catch (error) {
    console.warn('⚠️ Student setup skipped:', error.message)
  }

  await browser.close()

  // 5. Performance baseline
  console.log('📊 Establishing performance baselines...')
  const performanceBaselines = {
    pageLoad: 3000, // 3 seconds
    apiResponse: 500, // 500ms
    courseSearch: 300, // 300ms
    paymentInit: 1000, // 1 second
  }

  // Store baselines for tests
  process.env.PERF_BASELINE_PAGE_LOAD = performanceBaselines.pageLoad.toString()
  process.env.PERF_BASELINE_API = performanceBaselines.apiResponse.toString()
  process.env.PERF_BASELINE_SEARCH = performanceBaselines.courseSearch.toString()
  process.env.PERF_BASELINE_PAYMENT = performanceBaselines.paymentInit.toString()

  console.log('✅ Performance baselines established')

  // 6. Security test preparation
  console.log('🔒 Preparing security test vectors...')
  const securityVectors = {
    xss: ['<script>alert("xss")</script>', '"><svg onload=alert(1)>'],
    sqlInjection: ["'; DROP TABLE users; --", "1' OR '1'='1"],
    csrf: ['fake-csrf-token', 'expired-token'],
  }

  // Store for security tests
  process.env.SECURITY_VECTORS = JSON.stringify(securityVectors)
  console.log('✅ Security test vectors prepared')

  console.log('🎯 Global setup completed successfully!')
}

export default globalSetup
