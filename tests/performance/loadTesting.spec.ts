/**
 * Load Testing Suite for Cerebrum Biology Academy
 * Performance testing for high user volumes and stress scenarios
 */

import { test, expect, Page } from '@playwright/test'
import { PerformanceMonitor } from '../utils/performanceMonitor'
import { LoadTestScenarios } from '../utils/loadTestScenarios'

const PERFORMANCE_BASELINES = {
  pageLoad: parseInt(process.env.PERF_BASELINE_PAGE_LOAD || '3000'),
  apiResponse: parseInt(process.env.PERF_BASELINE_API || '500'),
  courseSearch: parseInt(process.env.PERF_BASELINE_SEARCH || '300'),
  paymentInit: parseInt(process.env.PERF_BASELINE_PAYMENT || '1000'),
}

test.describe('Performance & Load Testing', () => {
  let performanceMonitor: PerformanceMonitor
  let loadScenarios: LoadTestScenarios

  test.beforeEach(async () => {
    performanceMonitor = new PerformanceMonitor()
    loadScenarios = new LoadTestScenarios()
  })

  test.describe('Page Load Performance', () => {
    test('Homepage should load within baseline time', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/')
      await page.waitForLoadState('domcontentloaded')

      const loadTime = Date.now() - startTime
      expect(loadTime).toBeLessThan(PERFORMANCE_BASELINES.pageLoad)

      // Measure Core Web Vitals
      const metrics = await performanceMonitor.getCoreWebVitals(page)
      expect(metrics.LCP).toBeLessThan(2500) // Largest Contentful Paint
      expect(metrics.FID).toBeLessThan(100) // First Input Delay
      expect(metrics.CLS).toBeLessThan(0.1) // Cumulative Layout Shift
    })

    test('Course pages should load efficiently', async ({ page }) => {
      const coursePages = [
        '/courses/neet-biology-pinnacle',
        '/courses/class-11-biology',
        '/courses/class-12-biology',
      ]

      for (const coursePage of coursePages) {
        const startTime = Date.now()

        await page.goto(coursePage)
        await page.waitForLoadState('domcontentloaded')

        const loadTime = Date.now() - startTime
        expect(loadTime).toBeLessThan(PERFORMANCE_BASELINES.pageLoad)

        // Check for performance optimization indicators
        const images = await page.locator('img').count()
        const lazyImages = await page.locator('img[loading="lazy"]').count()
        expect(lazyImages / images).toBeGreaterThan(0.5) // At least 50% lazy loading
      }
    })

    test('Enrollment flow should maintain performance', async ({ page }) => {
      await page.goto('/enrollment')

      // Step 1: Assessment
      const step1Start = Date.now()
      await page.click('[data-testid="start-assessment"]')
      await page.waitForSelector('[data-testid="assessment-questions"]')
      const step1Time = Date.now() - step1Start
      expect(step1Time).toBeLessThan(2000)

      // Step 2: Course Selection
      const step2Start = Date.now()
      await page.click('[data-testid="select-course-pinnacle"]')
      await page.waitForSelector('[data-testid="course-details"]')
      const step2Time = Date.now() - step2Start
      expect(step2Time).toBeLessThan(1500)

      // Step 3: Payment Form
      const step3Start = Date.now()
      await page.click('[data-testid="proceed-to-payment"]')
      await page.waitForSelector('[data-testid="payment-form"]')
      const step3Time = Date.now() - step3Start
      expect(step3Time).toBeLessThan(PERFORMANCE_BASELINES.paymentInit)
    })
  })

  test.describe('API Performance', () => {
    test('Course search API should respond quickly', async ({ page }) => {
      await page.goto('/courses')

      // Monitor API calls
      const apiResponses: number[] = []

      page.on('response', (response) => {
        if (response.url().includes('/api/courses/search')) {
          const responseTime = Date.now() - response.request().timing().requestStart
          apiResponses.push(responseTime)
        }
      })

      // Perform searches
      const searchTerms = ['biology', 'neet', 'class 11', 'dropper', 'physics']

      for (const term of searchTerms) {
        await page.fill('[data-testid="course-search"]', term)
        await page.waitForResponse((response) => response.url().includes('/api/courses/search'))
      }

      // Verify all API responses were within baseline
      apiResponses.forEach((responseTime) => {
        expect(responseTime).toBeLessThan(PERFORMANCE_BASELINES.apiResponse)
      })

      // Calculate average response time
      const avgResponseTime = apiResponses.reduce((a, b) => a + b, 0) / apiResponses.length
      expect(avgResponseTime).toBeLessThan(PERFORMANCE_BASELINES.courseSearch)
    })

    test('Payment API should handle multiple concurrent requests', async ({ browser }) => {
      const contexts = await Promise.all(
        Array(5)
          .fill(null)
          .map(() => browser.newContext())
      )

      const paymentPromises = contexts.map(async (context, index) => {
        const page = await context.newPage()
        await page.goto('/enrollment/payment')

        // Fill payment form
        await page.fill('[data-testid="student-name"]', `Test Student ${index}`)
        await page.fill('[data-testid="email"]', `test${index}@test.com`)
        await page.fill('[data-testid="phone"]', `987654321${index}`)

        const startTime = Date.now()
        await page.click('[data-testid="initiate-payment"]')

        // Wait for Razorpay to initialize
        await page.waitForSelector('[data-testid="razorpay-container"]')
        const responseTime = Date.now() - startTime

        return { index, responseTime }
      })

      const results = await Promise.all(paymentPromises)

      // All payment initializations should complete within baseline
      results.forEach((result) => {
        expect(result.responseTime).toBeLessThan(PERFORMANCE_BASELINES.paymentInit)
      })

      // Clean up
      await Promise.all(contexts.map((context) => context.close()))
    })

    test('Demo booking API should handle form submissions efficiently', async ({ page }) => {
      await page.goto('/')

      // Monitor demo booking API
      let demoBookingTime = 0

      page.on('response', (response) => {
        if (response.url().includes('/api/demo-booking')) {
          demoBookingTime = Date.now() - response.request().timing().requestStart
        }
      })

      // Open demo booking modal
      await page.click('[data-testid="book-demo-button"]')
      await page.waitForSelector('[data-testid="demo-booking-modal"]')

      // Fill demo form
      await page.fill('[data-testid="demo-name"]', 'Test Student')
      await page.fill('[data-testid="demo-email"]', 'test@test.com')
      await page.fill('[data-testid="demo-phone"]', '9876543210')
      await page.selectOption('[data-testid="demo-class"]', 'class-11')

      // Submit form
      await page.click('[data-testid="submit-demo-booking"]')
      await page.waitForResponse((response) => response.url().includes('/api/demo-booking'))

      expect(demoBookingTime).toBeLessThan(PERFORMANCE_BASELINES.apiResponse)
    })
  })

  test.describe('Load Testing Scenarios', () => {
    test('Concurrent user simulation - Course browsing', async ({ browser }) => {
      const userCount = 10
      const testDuration = 30000 // 30 seconds

      const results = await loadScenarios.simulateConcurrentUsers(
        browser,
        userCount,
        testDuration,
        async (page: Page) => {
          // User journey: Browse courses
          await page.goto('/')
          await page.click('[data-testid="explore-courses"]')
          await page.waitForSelector('[data-testid="course-list"]')

          // Random course selection
          const courses = await page.locator('[data-testid^="course-card-"]').all()
          if (courses.length > 0) {
            const randomCourse = courses[Math.floor(Math.random() * courses.length)]
            await randomCourse.click()
            await page.waitForSelector('[data-testid="course-details"]')
          }

          // Search functionality
          await page.fill('[data-testid="course-search"]', 'biology')
          await page.waitForResponse((response) => response.url().includes('/api/courses/search'))
        }
      )

      // Validate results
      expect(results.successfulUsers).toBeGreaterThan(userCount * 0.9) // 90% success rate
      expect(results.averageResponseTime).toBeLessThan(2000)
      expect(results.errorRate).toBeLessThan(0.05) // Less than 5% error rate
    })

    test('Stress testing - Enrollment peak load', async ({ browser }) => {
      // Simulate enrollment rush (common during admission seasons)
      const peakUsers = 20
      const testDuration = 60000 // 1 minute

      const results = await loadScenarios.simulateEnrollmentRush(browser, peakUsers, testDuration)

      // System should handle peak load gracefully
      expect(results.successfulEnrollmentAttempts).toBeGreaterThan(peakUsers * 0.8)
      expect(results.systemStability).toBeGreaterThan(0.9) // 90% stability
      expect(results.averageEnrollmentTime).toBeLessThan(10000) // 10 seconds max
    })

    test('Memory usage during extended session', async ({ page }) => {
      await page.goto('/')

      const initialMemory = await performanceMonitor.getMemoryUsage(page)

      // Simulate 30-minute browsing session
      const sessionActions = [
        () => page.goto('/courses'),
        () => page.goto('/faculty'),
        () => page.goto('/success-stories'),
        () => page.goto('/contact'),
        () => page.goto('/about'),
        () => page.click('[data-testid="book-demo-button"]'),
        () => page.keyboard.press('Escape'), // Close modal
        () => page.goto('/enrollment'),
      ]

      // Repeat actions for 5 minutes (simulation of longer session)
      for (let i = 0; i < 20; i++) {
        const randomAction = sessionActions[Math.floor(Math.random() * sessionActions.length)]
        await randomAction()
        await page.waitForTimeout(1000) // 1 second between actions
      }

      const finalMemory = await performanceMonitor.getMemoryUsage(page)
      const memoryIncrease = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize

      // Memory increase should be reasonable (less than 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024) // 50MB
    })
  })

  test.describe('Mobile Performance', () => {
    test('Mobile course browsing performance', async ({ page }) => {
      // Simulate mobile device
      await page.setViewportSize({ width: 375, height: 667 })
      await page.emulateMedia({ media: 'screen' })

      const startTime = Date.now()
      await page.goto('/')
      await page.waitForLoadState('domcontentloaded')
      const loadTime = Date.now() - startTime

      // Mobile load time should be reasonable
      expect(loadTime).toBeLessThan(4000) // 4 seconds for mobile

      // Check mobile-specific optimizations
      const images = await page.locator('img').all()
      for (const img of images) {
        const src = await img.getAttribute('src')
        // Should use responsive images or WebP format
        expect(src).toMatch(/\.(webp|jpg|jpeg|png)$/i)
      }
    })

    test('Touch interactions should be responsive', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await page.goto('/courses')

      const touchElements = [
        '[data-testid="course-card-pinnacle"]',
        '[data-testid="filter-class-11"]',
        '[data-testid="sort-by-price"]',
      ]

      for (const selector of touchElements) {
        const startTime = Date.now()
        await page.tap(selector)
        await page.waitForTimeout(100) // Wait for interaction
        const responseTime = Date.now() - startTime

        expect(responseTime).toBeLessThan(300) // Touch response under 300ms
      }
    })
  })

  test.describe('Database Performance', () => {
    test('Course data queries should be optimized', async ({ page }) => {
      await page.goto('/api/test/db-performance')

      // Test course listing query performance
      const courseListResponse = await page.request.get('/api/courses')
      expect(courseListResponse.status()).toBe(200)

      const responseTime = await courseListResponse.headerValue('x-response-time')
      expect(parseInt(responseTime || '0')).toBeLessThan(200) // 200ms for course listing
    })

    test('Search queries should use proper indexing', async ({ page }) => {
      const searchQueries = ['biology', 'class 11', 'neet preparation', 'pinnacle series']

      for (const query of searchQueries) {
        const response = await page.request.get(
          `/api/courses/search?q=${encodeURIComponent(query)}`
        )
        expect(response.status()).toBe(200)

        const responseTime = await response.headerValue('x-response-time')
        expect(parseInt(responseTime || '0')).toBeLessThan(PERFORMANCE_BASELINES.courseSearch)
      }
    })
  })

  test.describe('CDN and Asset Performance', () => {
    test('Static assets should be optimized', async ({ page }) => {
      await page.goto('/')

      // Check CSS optimization
      const stylesheets = await page.locator('link[rel="stylesheet"]').all()
      for (const stylesheet of stylesheets) {
        const href = await stylesheet.getAttribute('href')
        if (href && href.includes('.css')) {
          const response = await page.request.get(href)
          const contentLength = parseInt((await response.headerValue('content-length')) || '0')
          expect(contentLength).toBeLessThan(100 * 1024) // CSS files under 100KB
        }
      }

      // Check JavaScript optimization
      const scripts = await page.locator('script[src]').all()
      for (const script of scripts) {
        const src = await script.getAttribute('src')
        if (src && src.includes('.js') && !src.includes('node_modules')) {
          const response = await page.request.get(src)
          const contentLength = parseInt((await response.headerValue('content-length')) || '0')
          expect(contentLength).toBeLessThan(500 * 1024) // JS files under 500KB
        }
      }
    })

    test('Images should be properly compressed', async ({ page }) => {
      await page.goto('/')

      const images = await page.locator('img[src]').all()
      for (const img of images) {
        const src = await img.getAttribute('src')
        if (src && !src.startsWith('data:')) {
          const response = await page.request.get(src)
          const contentLength = parseInt((await response.headerValue('content-length')) || '0')

          // Images should be reasonably sized
          expect(contentLength).toBeLessThan(500 * 1024) // Images under 500KB
        }
      }
    })
  })

  test.describe('Real-time Performance Monitoring', () => {
    test('Performance metrics collection', async ({ page }) => {
      await page.goto('/')

      // Collect real-time metrics
      const metrics = await performanceMonitor.collectRealTimeMetrics(page, 30000) // 30 seconds

      expect(metrics.memoryLeaks).toBe(0)
      expect(metrics.averageFPS).toBeGreaterThan(30) // Smooth animations
      expect(metrics.networkRequests.failed).toBeLessThan(5) // Less than 5% failure rate
      expect(metrics.jsErrors).toBe(0) // No JavaScript errors
    })

    test('Performance degradation detection', async ({ page }) => {
      await page.goto('/')

      const initialMetrics = await performanceMonitor.getCoreWebVitals(page)

      // Simulate heavy usage
      for (let i = 0; i < 10; i++) {
        await page.evaluate(() => {
          // Create memory pressure
          const largeArray = new Array(100000).fill('test data')
          window.testData = window.testData || []
          window.testData.push(largeArray)
        })
        await page.waitForTimeout(1000)
      }

      const finalMetrics = await performanceMonitor.getCoreWebVitals(page)

      // Performance shouldn't degrade significantly
      const lcpIncrease = finalMetrics.LCP - initialMetrics.LCP
      expect(lcpIncrease).toBeLessThan(1000) // Less than 1 second degradation
    })
  })
})
