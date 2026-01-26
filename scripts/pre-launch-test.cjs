#!/usr/bin/env node

/**
 * Pre-Launch Testing Script
 * Comprehensive automated testing for launch readiness
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class PreLaunchTester {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      details: [],
    }
  }

  log(type, message, details = '') {
    const timestamp = new Date().toISOString()
    const logEntry = {
      type,
      message,
      details,
      timestamp,
    }

    this.results.details.push(logEntry)

    const colors = {
      PASS: '\x1b[32m✅',
      FAIL: '\x1b[31m❌',
      WARN: '\x1b[33m⚠️',
      INFO: '\x1b[36mℹ️',
    }

    console.log(`${colors[type]} ${message}\x1b[0m`)
    if (details) console.log(`   ${details}`)

    if (type === 'PASS') this.results.passed++
    if (type === 'FAIL') this.results.failed++
    if (type === 'WARN') this.results.warnings++
  }

  async runTest(name, testFn) {
    try {
      await testFn()
    } catch (error) {
      this.log('FAIL', name, error.message)
    }
  }

  // Test 1: Project Structure Verification
  async testProjectStructure() {
    const requiredFiles = [
      'package.json',
      'next.config.js',
      'tailwind.config.js',
      'tsconfig.json',
      '.env.local',
      'src/app/page.tsx',
      'src/app/contact/page.tsx',
      'src/app/neet-repeaters/page.tsx',
      'src/lib/analytics/gtmService.ts',
      'src/lib/integrations/whatsappBusinessService.ts',
      'src/lib/payments/razorpayService.ts',
      'PRE_LAUNCH_CHECKLIST.md',
      'TECHNICAL_ARCHITECTURE.md',
      'WHATSAPP_INTEGRATION_GUIDE.md',
    ]

    for (const file of requiredFiles) {
      if (fs.existsSync(file)) {
        this.log('PASS', `File exists: ${file}`)
      } else {
        this.log('FAIL', `Missing required file: ${file}`)
      }
    }
  }

  // Test 2: TypeScript Compilation
  async testTypeScriptCompilation() {
    try {
      execSync('npx tsc --noEmit', { stdio: 'pipe' })
      this.log('PASS', 'TypeScript compilation successful')
    } catch (error) {
      this.log('FAIL', 'TypeScript compilation failed', error.stdout?.toString())
    }
  }

  // Test 3: Linting
  async testLinting() {
    try {
      execSync('npm run lint', { stdio: 'pipe' })
      this.log('PASS', 'ESLint passed')
    } catch (error) {
      this.log('WARN', 'ESLint warnings/errors found', error.stdout?.toString())
    }
  }

  // Test 4: Environment Variables
  async testEnvironmentVariables() {
    const requiredEnvVars = [
      'NEXT_PUBLIC_SITE_URL',
      'DATABASE_URL',
      'AUTH_SECRET',
      'OPENAI_API_KEY',
      'WHATSAPP_PHONE_NUMBER_ID',
      'WHATSAPP_ACCESS_TOKEN',
      'RAZORPAY_KEY_ID',
      'RAZORPAY_KEY_SECRET',
      'NEXT_PUBLIC_GTM_ID',
      'NEXT_PUBLIC_FB_PIXEL_ID',
    ]

    const envPath = '.env.local'
    if (!fs.existsSync(envPath)) {
      this.log('FAIL', 'Environment file .env.local not found')
      return
    }

    const envContent = fs.readFileSync(envPath, 'utf8')

    for (const envVar of requiredEnvVars) {
      if (envContent.includes(`${envVar}=`)) {
        this.log('PASS', `Environment variable configured: ${envVar}`)
      } else {
        this.log('WARN', `Environment variable missing: ${envVar}`)
      }
    }
  }

  // Test 5: Core API Routes
  async testAPIRoutes() {
    const apiRoutes = [
      'src/app/api/contact/inquiry/route.ts',
      'src/app/api/whatsapp/webhook/route.ts',
      'src/app/api/whatsapp/automation/route.ts',
      'src/app/sitemap.xml/route.ts',
    ]

    for (const route of apiRoutes) {
      if (fs.existsSync(route)) {
        // Check if the route exports required methods
        const content = fs.readFileSync(route, 'utf8')
        const hasPost = content.includes('export async function POST')
        const hasGet = content.includes('export async function GET')

        if (hasPost || hasGet) {
          this.log('PASS', `API route properly configured: ${route}`)
        } else {
          this.log('WARN', `API route missing HTTP methods: ${route}`)
        }
      } else {
        this.log('FAIL', `API route missing: ${route}`)
      }
    }
  }

  // Test 6: Component Structure
  async testComponents() {
    const criticalComponents = [
      'src/components/contact/ComprehensiveContactPage.tsx',
      'src/components/forms/MultiStepForm.tsx',
      'src/components/compliance/GDPRBanner.tsx',
      'src/lib/analytics/gtmService.ts',
      'src/lib/analytics/facebookPixelService.ts',
      'src/lib/integrations/whatsappAutomationService.ts',
    ]

    for (const component of criticalComponents) {
      if (fs.existsSync(component)) {
        const content = fs.readFileSync(component, 'utf8')

        // Check for proper TypeScript exports
        if (content.includes('export') && !content.includes('any[]')) {
          this.log('PASS', `Component properly typed: ${component}`)
        } else {
          this.log('WARN', `Component may need type improvements: ${component}`)
        }
      } else {
        this.log('FAIL', `Critical component missing: ${component}`)
      }
    }
  }

  // Test 7: Package Dependencies
  async testDependencies() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
      const requiredDeps = [
        'next',
        'react',
        'typescript',
        'tailwindcss',
        'framer-motion',
        '@heroicons/react',
        'openai',
        '@anthropic-ai/sdk',
      ]

      const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies }

      for (const dep of requiredDeps) {
        if (allDeps[dep]) {
          this.log('PASS', `Required dependency found: ${dep}@${allDeps[dep]}`)
        } else {
          this.log('FAIL', `Missing required dependency: ${dep}`)
        }
      }
    } catch (error) {
      this.log('FAIL', 'Failed to read package.json', error.message)
    }
  }

  // Test 8: Build Process
  async testBuild() {
    try {
      console.log('\n🔨 Testing build process...')
      execSync('npm run build', { stdio: 'inherit' })
      this.log('PASS', 'Production build successful')
    } catch (error) {
      this.log('FAIL', 'Production build failed', 'Check build output above')
    }
  }

  // Test 9: Performance Configuration
  async testPerformanceConfig() {
    const nextConfigPath = 'next.config.js'
    if (fs.existsSync(nextConfigPath)) {
      const content = fs.readFileSync(nextConfigPath, 'utf8')

      const perfFeatures = ['images:', 'compress:', 'experimental:', 'headers:']

      let configuredFeatures = 0
      for (const feature of perfFeatures) {
        if (content.includes(feature)) {
          configuredFeatures++
        }
      }

      if (configuredFeatures >= 2) {
        this.log(
          'PASS',
          `Next.js performance configuration detected (${configuredFeatures}/4 features)`
        )
      } else {
        this.log('WARN', 'Next.js performance configuration could be enhanced')
      }
    } else {
      this.log('WARN', 'next.config.js not found - using defaults')
    }
  }

  // Test 10: Security Headers
  async testSecurityConfiguration() {
    const securityPatterns = [
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection',
      'Content-Security-Policy',
    ]

    // Check for security configurations in next.config.js or middleware
    const configFiles = ['next.config.js', 'src/middleware.ts']
    let securityConfigured = false

    for (const file of configFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8')
        for (const pattern of securityPatterns) {
          if (content.includes(pattern)) {
            securityConfigured = true
            break
          }
        }
      }
    }

    if (securityConfigured) {
      this.log('PASS', 'Security headers configuration found')
    } else {
      this.log('WARN', 'Consider adding security headers configuration')
    }
  }

  // Generate Report
  generateReport() {
    const total = this.results.passed + this.results.failed + this.results.warnings
    const passRate = ((this.results.passed / total) * 100).toFixed(1)

    console.log('\n' + '='.repeat(60))
    console.log('🚀 PRE-LAUNCH TEST RESULTS')
    console.log('='.repeat(60))
    console.log(`✅ Passed: ${this.results.passed}`)
    console.log(`❌ Failed: ${this.results.failed}`)
    console.log(`⚠️  Warnings: ${this.results.warnings}`)
    console.log(`📊 Pass Rate: ${passRate}%`)
    console.log('='.repeat(60))

    // Determine launch readiness
    let launchStatus = 'NOT READY'
    let statusColor = '\x1b[31m' // Red

    if (this.results.failed === 0 && passRate >= 85) {
      launchStatus = 'READY FOR LAUNCH'
      statusColor = '\x1b[32m' // Green
    } else if (this.results.failed <= 2 && passRate >= 70) {
      launchStatus = 'READY WITH FIXES'
      statusColor = '\x1b[33m' // Yellow
    }

    console.log(`${statusColor}🎯 LAUNCH STATUS: ${launchStatus}\x1b[0m`)

    if (this.results.failed > 0) {
      console.log('\n❌ CRITICAL ISSUES TO FIX:')
      this.results.details
        .filter((d) => d.type === 'FAIL')
        .forEach((d) => console.log(`   • ${d.message}`))
    }

    if (this.results.warnings > 0) {
      console.log('\n⚠️  RECOMMENDATIONS:')
      this.results.details
        .filter((d) => d.type === 'WARN')
        .slice(0, 5) // Show top 5 warnings
        .forEach((d) => console.log(`   • ${d.message}`))
    }

    console.log('\n📋 For complete checklist, see: PRE_LAUNCH_CHECKLIST.md')
    console.log('🏗️  For technical details, see: TECHNICAL_ARCHITECTURE.md')
    console.log('📱 For WhatsApp setup, see: WHATSAPP_INTEGRATION_GUIDE.md')
  }

  // Main test runner
  async runAllTests() {
    console.log('🚀 Starting Pre-Launch Testing Suite...\n')

    await this.runTest('Project Structure', () => this.testProjectStructure())
    await this.runTest('TypeScript Compilation', () => this.testTypeScriptCompilation())
    await this.runTest('Linting', () => this.testLinting())
    await this.runTest('Environment Variables', () => this.testEnvironmentVariables())
    await this.runTest('API Routes', () => this.testAPIRoutes())
    await this.runTest('Components', () => this.testComponents())
    await this.runTest('Dependencies', () => this.testDependencies())
    await this.runTest('Performance Config', () => this.testPerformanceConfig())
    await this.runTest('Security Config', () => this.testSecurityConfiguration())

    // Build test last as it takes longest
    await this.runTest('Build Process', () => this.testBuild())

    this.generateReport()
  }
}

// Run tests if script is executed directly
if (require.main === module) {
  const tester = new PreLaunchTester()
  tester.runAllTests().catch(console.error)
}

module.exports = PreLaunchTester
