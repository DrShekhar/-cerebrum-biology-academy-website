#!/usr/bin/env node

/**
 * Deployment Monitor Agent
 * Monitors Vercel deployment status and verifies admin routes accessibility
 */

const { chromium } = require('playwright')
const fs = require('fs').promises
const path = require('path')

class DeploymentMonitor {
  constructor() {
    this.baseUrl = 'https://cerebrum-biology-academy-website.vercel.app'
    this.adminRoutes = ['/admin', '/admin/login', '/admin/enrollments']
    this.apiRoutes = ['/api/admin/analytics', '/api/admin/demo-bookings', '/api/admin/marketing']
    this.logFile = path.join(__dirname, '../deployment-monitor.log')
  }

  async log(message, level = 'INFO') {
    const timestamp = new Date().toISOString()
    const logEntry = `[${timestamp}] ${level}: ${message}\n`

    console.log(logEntry.trim())

    try {
      await fs.appendFile(this.logFile, logEntry)
    } catch (error) {
      console.error('Failed to write to log file:', error)
    }
  }

  async checkRouteAccessibility(browser, route, expectRedirect = false) {
    const page = await browser.newPage()

    try {
      const response = await page.goto(`${this.baseUrl}${route}`, {
        waitUntil: 'networkidle',
        timeout: 30000,
      })

      const status = response.status()
      const finalUrl = page.url()

      // Take screenshot for visual verification
      const screenshotPath = path.join(
        __dirname,
        `../screenshots/route-${route.replace(/\//g, '-')}-${Date.now()}.png`
      )
      await page.screenshot({ path: screenshotPath, fullPage: true })

      const result = {
        route,
        status,
        finalUrl,
        accessible: status >= 200 && status < 400,
        redirected: finalUrl !== `${this.baseUrl}${route}`,
        screenshot: screenshotPath,
        timestamp: new Date().toISOString(),
      }

      if (expectRedirect && result.redirected) {
        result.accessible = result.status === 302 || result.status === 307
      }

      await this.log(
        `Route ${route}: Status ${status}, Accessible: ${result.accessible}, Final URL: ${finalUrl}`
      )

      return result
    } catch (error) {
      await this.log(`Error checking route ${route}: ${error.message}`, 'ERROR')
      return {
        route,
        status: 0,
        accessible: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      }
    } finally {
      await page.close()
    }
  }

  async testAdminLogin(browser) {
    const page = await browser.newPage()

    try {
      await page.goto(`${this.baseUrl}/admin/login`)

      // Check if login form exists
      const hasLoginForm = (await page.locator('form').count()) > 0
      const hasPasswordField = (await page.locator('input[type="password"]').count()) > 0

      const result = {
        hasLoginForm,
        hasPasswordField,
        canAccessAdminAfterAuth: false,
      }

      if (hasLoginForm && hasPasswordField && process.env.ADMIN_ACCESS_KEY) {
        try {
          // Try to login with admin key
          await page.fill('input[type="password"]', process.env.ADMIN_ACCESS_KEY)
          await page.click('button[type="submit"]')

          await page.waitForURL(`${this.baseUrl}/admin`, { timeout: 10000 })
          result.canAccessAdminAfterAuth = true

          await this.log('Admin login test successful')
        } catch (loginError) {
          await this.log(`Admin login test failed: ${loginError.message}`, 'ERROR')
        }
      }

      return result
    } catch (error) {
      await this.log(`Error testing admin login: ${error.message}`, 'ERROR')
      return { error: error.message }
    } finally {
      await page.close()
    }
  }

  async checkAPIEndpoints(browser) {
    const results = []

    for (const apiRoute of this.apiRoutes) {
      const page = await browser.newPage()

      try {
        // Set admin authorization header
        if (process.env.ADMIN_ACCESS_KEY) {
          await page.setExtraHTTPHeaders({
            'x-admin-key': process.env.ADMIN_ACCESS_KEY,
          })
        }

        const response = await page.goto(`${this.baseUrl}${apiRoute}`, {
          waitUntil: 'networkidle',
          timeout: 15000,
        })

        const status = response.status()
        const contentType = response.headers()['content-type'] || ''

        results.push({
          route: apiRoute,
          status,
          accessible: status >= 200 && status < 500, // API routes might return 401/403 without proper auth
          isJSON: contentType.includes('application/json'),
          timestamp: new Date().toISOString(),
        })

        await this.log(`API ${apiRoute}: Status ${status}, Content-Type: ${contentType}`)
      } catch (error) {
        await this.log(`Error checking API ${apiRoute}: ${error.message}`, 'ERROR')
        results.push({
          route: apiRoute,
          status: 0,
          accessible: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        })
      } finally {
        await page.close()
      }
    }

    return results
  }

  async generateReport(results) {
    const report = {
      timestamp: new Date().toISOString(),
      baseUrl: this.baseUrl,
      summary: {
        totalRoutes: results.adminRoutes.length,
        accessibleRoutes: results.adminRoutes.filter((r) => r.accessible).length,
        totalApiRoutes: results.apiRoutes.length,
        accessibleApiRoutes: results.apiRoutes.filter((r) => r.accessible).length,
      },
      adminRoutes: results.adminRoutes,
      apiRoutes: results.apiRoutes,
      loginTest: results.loginTest,
      overallStatus: results.adminRoutes.some((r) => r.accessible) ? 'PARTIAL' : 'FAILED',
    }

    // Determine overall status
    const allAdminRoutesAccessible = results.adminRoutes.every((r) => r.accessible)
    if (allAdminRoutesAccessible && results.loginTest && !results.loginTest.error) {
      report.overallStatus = 'SUCCESS'
    }

    const reportPath = path.join(__dirname, '../deployment-report.json')
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2))

    return report
  }

  async run() {
    await this.log('Starting deployment monitoring session')

    // Ensure screenshots directory exists
    const screenshotsDir = path.join(__dirname, '../screenshots')
    try {
      await fs.mkdir(screenshotsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    const browser = await chromium.launch({
      headless: process.env.NODE_ENV === 'production',
      timeout: 60000,
    })

    try {
      const results = {
        adminRoutes: [],
        apiRoutes: [],
        loginTest: null,
      }

      // Test admin routes
      await this.log('Testing admin routes accessibility...')
      for (const route of this.adminRoutes) {
        const result = await this.checkRouteAccessibility(browser, route, route === '/admin')
        results.adminRoutes.push(result)

        // Small delay between requests
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }

      // Test admin login functionality
      await this.log('Testing admin login functionality...')
      results.loginTest = await this.testAdminLogin(browser)

      // Test API endpoints
      await this.log('Testing API endpoints...')
      results.apiRoutes = await this.checkAPIEndpoints(browser)

      // Generate final report
      const report = await this.generateReport(results)

      await this.log(`Deployment monitoring completed. Overall status: ${report.overallStatus}`)
      await this.log(
        `Accessible admin routes: ${report.summary.accessibleRoutes}/${report.summary.totalRoutes}`
      )
      await this.log(
        `Accessible API routes: ${report.summary.accessibleApiRoutes}/${report.summary.totalApiRoutes}`
      )

      // Return exit code based on results
      return report.overallStatus === 'SUCCESS' ? 0 : 1
    } catch (error) {
      await this.log(`Fatal error during monitoring: ${error.message}`, 'ERROR')
      return 1
    } finally {
      await browser.close()
    }
  }
}

// CLI execution
if (require.main === module) {
  const monitor = new DeploymentMonitor()

  monitor
    .run()
    .then((exitCode) => {
      process.exit(exitCode)
    })
    .catch((error) => {
      console.error('Monitoring failed:', error)
      process.exit(1)
    })
}

module.exports = DeploymentMonitor
