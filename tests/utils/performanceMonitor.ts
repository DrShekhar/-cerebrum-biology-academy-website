/**
 * Performance Monitoring Utilities
 * Comprehensive performance tracking for education platform
 */

import { Page } from '@playwright/test'

interface CoreWebVitals {
  LCP: number // Largest Contentful Paint
  FID: number // First Input Delay
  CLS: number // Cumulative Layout Shift
  FCP: number // First Contentful Paint
  TTFB: number // Time to First Byte
}

interface MemoryUsage {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
}

interface NetworkMetrics {
  total: number
  failed: number
  slow: number // > 2 seconds
  cached: number
}

interface RealTimeMetrics {
  memoryLeaks: number
  averageFPS: number
  networkRequests: NetworkMetrics
  jsErrors: number
  timestamp: string
}

interface PerformanceProfile {
  pageLoad: number
  domContentLoaded: number
  firstPaint: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  timeToInteractive: number
  cumulativeLayoutShift: number
  firstInputDelay: number
}

export class PerformanceMonitor {
  private metrics: any[] = []
  private startTime: number = Date.now()

  async getCoreWebVitals(page: Page): Promise<CoreWebVitals> {
    return await page.evaluate(() => {
      return new Promise<CoreWebVitals>((resolve) => {
        // Use Performance Observer API to get Core Web Vitals
        const metrics: Partial<CoreWebVitals> = {}

        // Get LCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          metrics.LCP = lastEntry.startTime
        }).observe({ entryTypes: ['largest-contentful-paint'] })

        // Get FCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
          if (fcpEntry) {
            metrics.FCP = fcpEntry.startTime
          }
        }).observe({ entryTypes: ['paint'] })

        // Get CLS
        let clsValue = 0
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
            }
          }
          metrics.CLS = clsValue
        }).observe({ entryTypes: ['layout-shift'] })

        // Get TTFB
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        metrics.TTFB = navigationEntry?.responseStart - navigationEntry?.requestStart || 0

        // FID will be 0 for automated tests (requires real user interaction)
        metrics.FID = 0

        // Return metrics after a short delay to collect data
        setTimeout(() => {
          resolve({
            LCP: metrics.LCP || 0,
            FID: metrics.FID || 0,
            CLS: metrics.CLS || 0,
            FCP: metrics.FCP || 0,
            TTFB: metrics.TTFB || 0
          })
        }, 2000)
      })
    })
  }

  async getMemoryUsage(page: Page): Promise<MemoryUsage> {
    return await page.evaluate(() => {
      if ('memory' in performance) {
        return {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
        }
      }
      return {
        usedJSHeapSize: 0,
        totalJSHeapSize: 0,
        jsHeapSizeLimit: 0
      }
    })
  }

  async collectRealTimeMetrics(page: Page, duration: number): Promise<RealTimeMetrics> {
    const startTime = Date.now()
    const metrics = {
      memoryLeaks: 0,
      averageFPS: 0,
      networkRequests: { total: 0, failed: 0, slow: 0, cached: 0 },
      jsErrors: 0,
      timestamp: new Date().toISOString()
    }

    // Monitor network requests
    const networkMetrics = { total: 0, failed: 0, slow: 0, cached: 0 }

    page.on('response', response => {
      networkMetrics.total++
      if (response.status() >= 400) {
        networkMetrics.failed++
      }
      const responseTime = Date.now() - startTime
      if (responseTime > 2000) {
        networkMetrics.slow++
      }
      if (response.fromCache()) {
        networkMetrics.cached++
      }
    })

    // Monitor JavaScript errors
    let jsErrors = 0
    page.on('pageerror', () => {
      jsErrors++
    })

    // Start FPS monitoring
    const fpsPromise = this.monitorFPS(page, duration)

    // Start memory leak detection
    const memoryLeaksPromise = this.detectMemoryLeaks(page, duration)

    // Wait for monitoring duration
    await page.waitForTimeout(duration)

    // Collect results
    const [averageFPS, memoryLeaks] = await Promise.all([
      fpsPromise,
      memoryLeaksPromise
    ])

    return {
      memoryLeaks,
      averageFPS,
      networkRequests: networkMetrics,
      jsErrors,
      timestamp: new Date().toISOString()
    }
  }

  private async monitorFPS(page: Page, duration: number): Promise<number> {
    return await page.evaluate((monitorDuration) => {
      return new Promise<number>((resolve) => {
        const frames: number[] = []
        let lastTime = performance.now()

        function frame(time: number) {
          const delta = time - lastTime
          lastTime = time
          frames.push(1000 / delta) // FPS calculation

          if (time < performance.now() + monitorDuration) {
            requestAnimationFrame(frame)
          } else {
            const averageFPS = frames.reduce((a, b) => a + b, 0) / frames.length
            resolve(averageFPS || 60) // Default to 60 if no frames recorded
          }
        }

        requestAnimationFrame(frame)
      })
    }, duration)
  }

  private async detectMemoryLeaks(page: Page, duration: number): Promise<number> {
    const initialMemory = await this.getMemoryUsage(page)

    await page.waitForTimeout(duration)

    const finalMemory = await this.getMemoryUsage(page)

    // Trigger garbage collection if possible
    try {
      await page.evaluate(() => {
        if ('gc' in window) {
          (window as any).gc()
        }
      })

      await page.waitForTimeout(1000) // Wait for GC

      const afterGCMemory = await this.getMemoryUsage(page)

      // If memory usage is still significantly higher after GC, potential leak
      const memoryIncrease = afterGCMemory.usedJSHeapSize - initialMemory.usedJSHeapSize
      const leakThreshold = 10 * 1024 * 1024 // 10MB threshold

      return memoryIncrease > leakThreshold ? 1 : 0
    } catch {
      // GC not available, use simple comparison
      const memoryIncrease = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize
      const leakThreshold = 20 * 1024 * 1024 // 20MB threshold without GC

      return memoryIncrease > leakThreshold ? 1 : 0
    }
  }

  async measurePageLoadPerformance(page: Page, url: string): Promise<PerformanceProfile> {
    const startTime = Date.now()

    await page.goto(url)

    // Wait for load events
    await page.waitForLoadState('domcontentloaded')
    const domContentLoaded = Date.now() - startTime

    await page.waitForLoadState('load')
    const pageLoad = Date.now() - startTime

    // Get detailed performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

      return {
        firstPaint: 0, // Will be filled by paint timing
        firstContentfulPaint: 0,
        timeToInteractive: 0, // Estimated
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        pageLoad: perfData.loadEventEnd - perfData.loadEventStart
      }
    })

    // Get paint timing
    const paintTimings = await page.evaluate(() => {
      const paints = performance.getEntriesByType('paint')
      const fp = paints.find(paint => paint.name === 'first-paint')
      const fcp = paints.find(paint => paint.name === 'first-contentful-paint')

      return {
        firstPaint: fp?.startTime || 0,
        firstContentfulPaint: fcp?.startTime || 0
      }
    })

    // Get Core Web Vitals
    const coreVitals = await this.getCoreWebVitals(page)

    return {
      pageLoad,
      domContentLoaded,
      firstPaint: paintTimings.firstPaint,
      firstContentfulPaint: paintTimings.firstContentfulPaint,
      largestContentfulPaint: coreVitals.LCP,
      timeToInteractive: performanceMetrics.timeToInteractive,
      cumulativeLayoutShift: coreVitals.CLS,
      firstInputDelay: coreVitals.FID
    }
  }

  async measureAPIPerformance(page: Page, apiEndpoint: string, requestCount: number = 10): Promise<{
    averageResponseTime: number
    minResponseTime: number
    maxResponseTime: number
    successRate: number
    throughput: number
  }> {
    const responseTimes: number[] = []
    let successCount = 0
    const startTime = Date.now()

    const promises = Array(requestCount).fill(null).map(async () => {
      const requestStart = Date.now()

      try {
        const response = await page.request.get(apiEndpoint)
        const responseTime = Date.now() - requestStart
        responseTimes.push(responseTime)

        if (response.status() < 400) {
          successCount++
        }
      } catch (error) {
        responseTimes.push(Date.now() - requestStart)
      }
    })

    await Promise.all(promises)

    const totalTime = Date.now() - startTime
    const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length

    return {
      averageResponseTime,
      minResponseTime: Math.min(...responseTimes),
      maxResponseTime: Math.max(...responseTimes),
      successRate: successCount / requestCount,
      throughput: requestCount / (totalTime / 1000) // requests per second
    }
  }

  async measureResourceLoadTimes(page: Page): Promise<{
    css: number[]
    javascript: number[]
    images: number[]
    fonts: number[]
    total: number
  }> {
    await page.goto(page.url()) // Reload to measure fresh

    const resourceTimings = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]

      const css: number[] = []
      const javascript: number[] = []
      const images: number[] = []
      const fonts: number[] = []

      resources.forEach(resource => {
        const loadTime = resource.responseEnd - resource.requestStart

        if (resource.name.includes('.css')) {
          css.push(loadTime)
        } else if (resource.name.includes('.js')) {
          javascript.push(loadTime)
        } else if (resource.name.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
          images.push(loadTime)
        } else if (resource.name.match(/\.(woff|woff2|ttf|otf)$/i)) {
          fonts.push(loadTime)
        }
      })

      return { css, javascript, images, fonts }
    })

    const totalResources = Object.values(resourceTimings).flat().length

    return {
      ...resourceTimings,
      total: totalResources
    }
  }

  async trackRequest<T>(requestFunction: () => Promise<T>, context?: any): Promise<T> {
    const startTime = Date.now()

    try {
      const result = await requestFunction()
      const endTime = Date.now()

      this.metrics.push({
        timestamp: new Date().toISOString(),
        duration: endTime - startTime,
        success: true,
        context
      })

      return result
    } catch (error) {
      const endTime = Date.now()

      this.metrics.push({
        timestamp: new Date().toISOString(),
        duration: endTime - startTime,
        success: false,
        error: error.message,
        context
      })

      throw error
    }
  }

  getMetrics() {
    const successful = this.metrics.filter(m => m.success)
    const failed = this.metrics.filter(m => !m.success)

    if (successful.length === 0) {
      return {
        avgResponseTime: 0,
        successRate: 0,
        failureRate: 1,
        totalRequests: this.metrics.length
      }
    }

    const avgResponseTime = successful.reduce((sum, m) => sum + m.duration, 0) / successful.length
    const successRate = successful.length / this.metrics.length

    return {
      avgResponseTime,
      successRate,
      failureRate: failed.length / this.metrics.length,
      totalRequests: this.metrics.length,
      metrics: this.metrics
    }
  }

  reset() {
    this.metrics = []
    this.startTime = Date.now()
  }

  async generatePerformanceReport(): Promise<{
    summary: any
    details: any[]
    recommendations: string[]
  }> {
    const metrics = this.getMetrics()

    const recommendations: string[] = []

    if (metrics.avgResponseTime > 2000) {
      recommendations.push('Consider implementing caching to reduce response times')
    }

    if (metrics.failureRate > 0.05) {
      recommendations.push('High failure rate detected - investigate error handling')
    }

    if (metrics.totalRequests > 1000 && metrics.avgResponseTime > 1000) {
      recommendations.push('Consider implementing load balancing for high traffic')
    }

    return {
      summary: {
        totalRequests: metrics.totalRequests,
        averageResponseTime: `${metrics.avgResponseTime.toFixed(2)}ms`,
        successRate: `${(metrics.successRate * 100).toFixed(2)}%`,
        failureRate: `${(metrics.failureRate * 100).toFixed(2)}%`,
        testDuration: `${(Date.now() - this.startTime) / 1000}s`
      },
      details: this.metrics,
      recommendations
    }
  }
}