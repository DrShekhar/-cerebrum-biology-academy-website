#!/usr/bin/env node

/**
 * Automated Post-Deployment Verification Script
 *
 * Comprehensive verification system that checks:
 * - Homepage and critical pages
 * - API health endpoints
 * - Database connectivity
 * - Static assets
 * - Performance metrics
 * - Security headers
 * - SEO requirements
 * - Analytics tracking
 */

const https = require('https')
const http = require('http')
const { URL } = require('url')

class DeploymentVerifier {
  constructor(options = {}) {
    this.baseUrl = options.url || 'https://cerebrumbiologyacademy.com'
    this.verbose = options.verbose || false
    this.jsonOutput = options.json || false
    this.timeout = options.timeout || 10000
    this.retries = options.retries || 3
    this.results = {
      timestamp: new Date().toISOString(),
      baseUrl: this.baseUrl,
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0,
      },
      checks: [],
    }

    // Colors for terminal output
    this.colors = {
      reset: '\x1b[0m',
      bright: '\x1b[1m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      cyan: '\x1b[36m',
    }
  }

  log(message, color = 'reset') {
    if (!this.jsonOutput) {
      console.log(`${this.colors[color]}${message}${this.colors.reset}`)
    }
  }

  verbose(message) {
    if (this.verbose && !this.jsonOutput) {
      console.log(`${this.colors.cyan}[VERBOSE] ${message}${this.colors.reset}`)
    }
  }

  addResult(category, name, passed, details = {}) {
    this.results.summary.total++
    if (passed) {
      this.results.summary.passed++
    } else if (details.warning) {
      this.results.summary.warnings++
    } else {
      this.results.summary.failed++
    }

    this.results.checks.push({
      category,
      name,
      passed,
      warning: details.warning || false,
      duration: details.duration || 0,
      error: details.error || null,
      details: details.info || null,
    })

    const icon = passed ? '✅' : details.warning ? '⚠️' : '❌'
    const color = passed ? 'green' : details.warning ? 'yellow' : 'red'
    const timing = details.duration ? ` (${details.duration}ms)` : ''

    this.log(`${icon} ${category} → ${name}${timing}`, color)

    if (details.error && !this.jsonOutput) {
      this.log(`   Error: ${details.error}`, 'red')
    }
    if (details.info && this.verbose) {
      this.verbose(`   Info: ${JSON.stringify(details.info)}`)
    }
  }

  async makeRequest(path, options = {}) {
    const url = new URL(path, this.baseUrl)
    const startTime = Date.now()

    return new Promise((resolve, reject) => {
      const protocol = url.protocol === 'https:' ? https : http

      const reqOptions = {
        method: options.method || 'GET',
        headers: {
          'User-Agent': 'Cerebrum-Deployment-Verifier/1.0',
          ...options.headers,
        },
        timeout: this.timeout,
      }

      const req = protocol.request(url, reqOptions, (res) => {
        let data = ''

        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', () => {
          const duration = Date.now() - startTime
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data,
            duration,
          })
        })
      })

      req.on('error', (error) => {
        reject(error)
      })

      req.on('timeout', () => {
        req.destroy()
        reject(new Error('Request timeout'))
      })

      if (options.body) {
        req.write(options.body)
      }

      req.end()
    })
  }

  async makeRequestWithRetry(path, options = {}) {
    let lastError

    for (let attempt = 1; attempt <= this.retries; attempt++) {
      try {
        this.verbose(`Attempt ${attempt}/${this.retries} for ${path}`)
        return await this.makeRequest(path, options)
      } catch (error) {
        lastError = error
        this.verbose(`Attempt ${attempt} failed: ${error.message}`)

        if (attempt < this.retries) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
        }
      }
    }

    throw lastError
  }

  // ========================================
  // HOMEPAGE CHECKS
  // ========================================

  async checkHomepage() {
    this.log('\n📱 Checking Homepage...', 'blue')

    try {
      const response = await this.makeRequestWithRetry('/')
      const passed = response.statusCode === 200

      this.addResult('Homepage', 'HTTP Status', passed, {
        duration: response.duration,
        error: passed ? null : `Expected 200, got ${response.statusCode}`,
        info: { statusCode: response.statusCode },
      })

      if (passed) {
        const body = response.body

        // Check for critical elements
        const checks = [
          { name: 'Title Tag', test: /<title>.*<\/title>/i.test(body) },
          { name: 'Navigation', test: body.includes('nav') || body.includes('navigation') },
          { name: 'Footer', test: body.includes('footer') },
          {
            name: 'No Error Messages',
            test:
              !body.toLowerCase().includes('error occurred') &&
              !body.toLowerCase().includes('something went wrong'),
          },
        ]

        checks.forEach((check) => {
          this.addResult('Homepage', check.name, check.test, {
            error: check.test ? null : 'Element not found or validation failed',
          })
        })

        // Check response time
        const performancePassed = response.duration < 3000
        this.addResult('Homepage', 'Load Time < 3s', performancePassed, {
          duration: response.duration,
          warning: !performancePassed,
          error: performancePassed ? null : `Load time ${response.duration}ms exceeds 3000ms`,
        })
      }
    } catch (error) {
      this.addResult('Homepage', 'Accessibility', false, {
        error: error.message,
      })
    }
  }

  // ========================================
  // API HEALTH CHECKS
  // ========================================

  async checkAPIHealth() {
    this.log('\n🏥 Checking API Health Endpoints...', 'blue')

    const endpoints = [{ path: '/api/health', name: 'Health Check' }]

    for (const endpoint of endpoints) {
      try {
        const response = await this.makeRequestWithRetry(endpoint.path)
        const passed = response.statusCode === 200 || response.statusCode === 503

        this.addResult('API Health', endpoint.name, passed, {
          duration: response.duration,
          error: passed ? null : `Unexpected status ${response.statusCode}`,
          info: { statusCode: response.statusCode },
        })

        if (passed && response.body) {
          try {
            const data = JSON.parse(response.body)

            // Verify JSON structure
            this.addResult('API Health', `${endpoint.name} - JSON Format`, true, {
              info: { status: data.status },
            })

            // Check database connectivity if available
            if (data.services && data.services.database) {
              const dbOk = data.services.database.status === 'up'
              this.addResult('API Health', 'Database Connectivity', dbOk, {
                warning: !dbOk,
                error: dbOk ? null : data.services.database.error || 'Database not available',
              })
            }

            // Check environment variables loaded
            if (data.uptime !== undefined) {
              this.addResult('API Health', 'Environment Variables', true, {
                info: { uptime: data.uptime },
              })
            }
          } catch (parseError) {
            this.addResult('API Health', `${endpoint.name} - JSON Parse`, false, {
              error: 'Invalid JSON response',
            })
          }
        }

        // Check API response time
        const apiPerformancePassed = response.duration < 500
        this.addResult('API Health', `${endpoint.name} - Response Time`, apiPerformancePassed, {
          duration: response.duration,
          warning: !apiPerformancePassed,
          error: apiPerformancePassed ? null : `Response time ${response.duration}ms exceeds 500ms`,
        })
      } catch (error) {
        this.addResult('API Health', endpoint.name, false, {
          error: error.message,
        })
      }
    }
  }

  // ========================================
  // CRITICAL PAGES CHECKS
  // ========================================

  async checkCriticalPages() {
    this.log('\n📄 Checking Critical Pages...', 'blue')

    const pages = [
      '/courses',
      '/purchase/class-11',
      '/purchase/class-12',
      '/purchase/neet-dropper',
      '/login',
      '/signup',
      '/about',
      '/contact',
    ]

    for (const page of pages) {
      try {
        const response = await this.makeRequestWithRetry(page)
        const passed =
          response.statusCode === 200 || response.statusCode === 307 || response.statusCode === 308

        this.addResult('Critical Pages', page, passed, {
          duration: response.duration,
          error: passed ? null : `Status ${response.statusCode}`,
          info: { statusCode: response.statusCode },
        })
      } catch (error) {
        this.addResult('Critical Pages', page, false, {
          error: error.message,
        })
      }
    }
  }

  // ========================================
  // API ENDPOINTS CHECKS
  // ========================================

  async checkAPIEndpoints() {
    this.log('\n🔌 Checking API Endpoints...', 'blue')

    // Check if endpoints exist (should return 400/401 not 404)
    const endpoints = [
      { path: '/api/auth/signin', method: 'POST', name: 'Auth Signin' },
      { path: '/api/courses', method: 'GET', name: 'Courses API' },
    ]

    for (const endpoint of endpoints) {
      try {
        const response = await this.makeRequestWithRetry(endpoint.path, {
          method: endpoint.method,
          headers: endpoint.method === 'POST' ? { 'Content-Type': 'application/json' } : {},
          body: endpoint.method === 'POST' ? JSON.stringify({}) : undefined,
        })

        // Endpoint exists if we don't get 404
        const passed = response.statusCode !== 404

        this.addResult('API Endpoints', endpoint.name, passed, {
          duration: response.duration,
          warning: response.statusCode >= 500,
          error: passed ? null : 'Endpoint not found (404)',
          info: { statusCode: response.statusCode },
        })
      } catch (error) {
        this.addResult('API Endpoints', endpoint.name, false, {
          error: error.message,
        })
      }
    }
  }

  // ========================================
  // STATIC ASSETS CHECKS
  // ========================================

  async checkStaticAssets() {
    this.log('\n🖼️  Checking Static Assets...', 'blue')

    const assets = [{ path: '/favicon.ico', name: 'Favicon' }]

    for (const asset of assets) {
      try {
        const response = await this.makeRequestWithRetry(asset.path)
        const passed = response.statusCode === 200

        this.addResult('Static Assets', asset.name, passed, {
          duration: response.duration,
          error: passed ? null : `Status ${response.statusCode}`,
          info: {
            statusCode: response.statusCode,
            contentType: response.headers['content-type'],
          },
        })
      } catch (error) {
        this.addResult('Static Assets', asset.name, false, {
          error: error.message,
        })
      }
    }
  }

  // ========================================
  // PERFORMANCE CHECKS
  // ========================================

  async checkPerformance() {
    this.log('\n⚡ Checking Performance Metrics...', 'blue')

    try {
      const startTime = Date.now()
      const response = await this.makeRequest('/')
      const totalTime = Date.now() - startTime

      // Time to First Byte
      const ttfb = response.duration
      const ttfbPassed = ttfb < 600
      this.addResult('Performance', 'TTFB < 600ms', ttfbPassed, {
        duration: ttfb,
        warning: !ttfbPassed && ttfb < 1000,
        error: ttfbPassed ? null : `TTFB ${ttfb}ms exceeds 600ms`,
      })

      // Total load time
      const loadTimePassed = totalTime < 3000
      this.addResult('Performance', 'Total Load Time < 3s', loadTimePassed, {
        duration: totalTime,
        warning: !loadTimePassed && totalTime < 5000,
        error: loadTimePassed ? null : `Load time ${totalTime}ms exceeds 3000ms`,
      })
    } catch (error) {
      this.addResult('Performance', 'Performance Test', false, {
        error: error.message,
      })
    }
  }

  // ========================================
  // SECURITY CHECKS
  // ========================================

  async checkSecurity() {
    this.log('\n🔒 Checking Security Headers...', 'blue')

    try {
      const response = await this.makeRequestWithRetry('/')

      // Check HTTPS
      const isHttps = this.baseUrl.startsWith('https://')
      this.addResult('Security', 'HTTPS Enabled', isHttps, {
        warning: !isHttps,
        error: isHttps ? null : 'Site not served over HTTPS',
      })

      // Check security headers
      const securityHeaders = [
        {
          name: 'Strict-Transport-Security',
          header: 'strict-transport-security',
          required: isHttps,
        },
        {
          name: 'X-Frame-Options',
          header: 'x-frame-options',
          required: true,
        },
        {
          name: 'X-Content-Type-Options',
          header: 'x-content-type-options',
          required: true,
        },
        {
          name: 'Content-Security-Policy',
          header: 'content-security-policy',
          required: false,
        },
      ]

      securityHeaders.forEach(({ name, header, required }) => {
        const present = !!response.headers[header]
        this.addResult('Security', name, present || !required, {
          warning: required && !present,
          error: required && !present ? 'Header not present' : null,
          info: { value: response.headers[header] || 'Not set' },
        })
      })

      // Check for exposed secrets in HTML
      const body = response.body.toLowerCase()
      const hasSecrets =
        body.includes('api_key') ||
        body.includes('secret') ||
        body.includes('password') ||
        body.includes('sk-')

      this.addResult('Security', 'No Exposed Secrets', !hasSecrets, {
        error: hasSecrets ? 'Potential secrets found in HTML' : null,
      })
    } catch (error) {
      this.addResult('Security', 'Security Check', false, {
        error: error.message,
      })
    }
  }

  // ========================================
  // SEO CHECKS
  // ========================================

  async checkSEO() {
    this.log('\n🎯 Checking SEO Requirements...', 'blue')

    try {
      const response = await this.makeRequestWithRetry('/')
      const body = response.body

      // Check meta tags
      const seoChecks = [
        {
          name: 'Title Tag',
          test: /<title>.*<\/title>/i.test(body) && !/<title>\s*<\/title>/i.test(body),
        },
        {
          name: 'Meta Description',
          test: /<meta[^>]*name=["']description["'][^>]*>/i.test(body),
        },
        {
          name: 'Canonical URL',
          test: /<link[^>]*rel=["']canonical["'][^>]*>/i.test(body),
        },
        {
          name: 'Open Graph Tags',
          test: /<meta[^>]*property=["']og:/i.test(body),
        },
      ]

      seoChecks.forEach((check) => {
        this.addResult('SEO', check.name, check.test, {
          warning: !check.test,
          error: check.test ? null : 'Missing or invalid',
        })
      })

      // Check robots.txt
      try {
        const robotsResponse = await this.makeRequest('/robots.txt')
        const robotsPassed = robotsResponse.statusCode === 200
        this.addResult('SEO', 'robots.txt', robotsPassed, {
          warning: !robotsPassed,
          error: robotsPassed ? null : 'robots.txt not found',
        })
      } catch (error) {
        this.addResult('SEO', 'robots.txt', false, {
          warning: true,
          error: error.message,
        })
      }

      // Check sitemap.xml
      try {
        const sitemapResponse = await this.makeRequest('/sitemap.xml')
        const sitemapPassed = sitemapResponse.statusCode === 200
        this.addResult('SEO', 'sitemap.xml', sitemapPassed, {
          warning: !sitemapPassed,
          error: sitemapPassed ? null : 'sitemap.xml not found',
        })
      } catch (error) {
        this.addResult('SEO', 'sitemap.xml', false, {
          warning: true,
          error: error.message,
        })
      }
    } catch (error) {
      this.addResult('SEO', 'SEO Check', false, {
        error: error.message,
      })
    }
  }

  // ========================================
  // ANALYTICS CHECKS
  // ========================================

  async checkAnalytics() {
    this.log('\n📊 Checking Analytics Integration...', 'blue')

    try {
      const response = await this.makeRequestWithRetry('/')
      const body = response.body

      // Check for analytics scripts
      const analyticsChecks = [
        {
          name: 'Google Analytics',
          test:
            body.includes('googletagmanager.com/gtag') ||
            body.includes('google-analytics.com/analytics.js') ||
            body.includes('gtag(') ||
            body.includes('GA_MEASUREMENT_ID'),
        },
        {
          name: 'Google Tag Manager',
          test: body.includes('googletagmanager.com/gtm.js') || body.includes('GTM-'),
        },
      ]

      analyticsChecks.forEach((check) => {
        this.addResult('Analytics', check.name, check.test, {
          warning: !check.test,
          error: check.test ? null : 'Analytics code not detected',
        })
      })
    } catch (error) {
      this.addResult('Analytics', 'Analytics Check', false, {
        error: error.message,
      })
    }
  }

  // ========================================
  // MAIN EXECUTION
  // ========================================

  async runAllChecks() {
    const startTime = Date.now()

    this.log('\n' + '='.repeat(60), 'bright')
    this.log('🚀 CEREBRUM BIOLOGY ACADEMY - POST-DEPLOYMENT VERIFICATION', 'bright')
    this.log('='.repeat(60), 'bright')
    this.log(`\n📍 Target URL: ${this.baseUrl}`, 'cyan')
    this.log(`⏰ Started at: ${new Date().toLocaleString()}`, 'cyan')
    this.log(`🔄 Retry attempts: ${this.retries}`, 'cyan')
    this.log(`⏱️  Timeout: ${this.timeout}ms\n`, 'cyan')

    await this.checkHomepage()
    await this.checkAPIHealth()
    await this.checkCriticalPages()
    await this.checkAPIEndpoints()
    await this.checkStaticAssets()
    await this.checkPerformance()
    await this.checkSecurity()
    await this.checkSEO()
    await this.checkAnalytics()

    const duration = Date.now() - startTime
    this.results.duration = duration

    this.printSummary()

    return this.results.summary.failed === 0
  }

  printSummary() {
    this.log('\n' + '='.repeat(60), 'bright')
    this.log('📊 VERIFICATION SUMMARY', 'bright')
    this.log('='.repeat(60), 'bright')

    const { total, passed, failed, warnings } = this.results.summary
    const passRate = ((passed / total) * 100).toFixed(1)

    this.log(`\n✅ Passed:   ${passed}/${total} (${passRate}%)`, 'green')
    this.log(`❌ Failed:   ${failed}/${total}`, failed > 0 ? 'red' : 'reset')
    this.log(`⚠️  Warnings: ${warnings}/${total}`, warnings > 0 ? 'yellow' : 'reset')
    this.log(`⏱️  Duration: ${this.results.duration}ms\n`, 'cyan')

    if (failed === 0 && warnings === 0) {
      this.log('🎉 All checks passed! Deployment verified successfully.', 'green')
    } else if (failed === 0) {
      this.log('✨ All critical checks passed. Review warnings for optimization.', 'yellow')
    } else {
      this.log('⚠️  Some checks failed. Please review and fix issues.', 'red')
    }

    this.log('\n' + '='.repeat(60) + '\n', 'bright')
  }

  async run() {
    try {
      const success = await this.runAllChecks()

      if (this.jsonOutput) {
        console.log(JSON.stringify(this.results, null, 2))
      }

      return success ? 0 : 1
    } catch (error) {
      this.log(`\n❌ Fatal error: ${error.message}`, 'red')
      if (this.jsonOutput) {
        console.log(
          JSON.stringify(
            {
              error: error.message,
              stack: error.stack,
            },
            null,
            2
          )
        )
      }
      return 1
    }
  }
}

// ========================================
// CLI EXECUTION
// ========================================

if (require.main === module) {
  const args = process.argv.slice(2)
  const options = {
    url: 'https://cerebrumbiologyacademy.com',
    verbose: false,
    json: false,
    timeout: 10000,
    retries: 3,
  }

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      options.url = args[i + 1]
      i++
    } else if (args[i] === '--verbose' || args[i] === '-v') {
      options.verbose = true
    } else if (args[i] === '--json') {
      options.json = true
    } else if (args[i] === '--timeout' && args[i + 1]) {
      options.timeout = parseInt(args[i + 1], 10)
      i++
    } else if (args[i] === '--retries' && args[i + 1]) {
      options.retries = parseInt(args[i + 1], 10)
      i++
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Usage: node verify-deployment.js [options]

Options:
  --url <url>        Base URL to verify (default: https://cerebrumbiologyacademy.com)
  --verbose, -v      Enable verbose logging
  --json             Output results in JSON format
  --timeout <ms>     Request timeout in milliseconds (default: 10000)
  --retries <n>      Number of retry attempts (default: 3)
  --help, -h         Show this help message

Examples:
  node verify-deployment.js
  node verify-deployment.js --url https://staging.cerebrumbiologyacademy.com
  node verify-deployment.js --verbose
  node verify-deployment.js --json > report.json
      `)
      process.exit(0)
    }
  }

  const verifier = new DeploymentVerifier(options)

  verifier
    .run()
    .then((exitCode) => {
      process.exit(exitCode)
    })
    .catch((error) => {
      console.error('Verification failed:', error)
      process.exit(1)
    })
}

module.exports = DeploymentVerifier
