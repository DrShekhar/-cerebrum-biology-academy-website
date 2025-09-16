#!/usr/bin/env node

/**
 * Comprehensive Deployment Verification System
 * Ensures admin panel and all routes are properly deployed and accessible
 */

const { execSync } = require('child_process')
const fs = require('fs').promises
const path = require('path')

class DeploymentVerification {
  constructor() {
    this.projectRoot = path.join(__dirname, '..')
    this.logFile = path.join(this.projectRoot, 'deployment-verification.log')
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

  async verifyProjectStructure() {
    await this.log('Verifying project structure...')

    const requiredFiles = [
      'src/app/admin/page.tsx',
      'src/app/admin/login/page.tsx',
      'src/app/admin/enrollments/page.tsx',
      'src/components/admin/AdminLayout.tsx',
      'middleware.ts',
      'vercel.json',
      'next.config.ts',
    ]

    const requiredDirectories = [
      'src/app/admin',
      'src/app/api/admin',
      'src/components/admin',
      '.github/workflows',
    ]

    let structureValid = true

    // Check required files
    for (const file of requiredFiles) {
      const fullPath = path.join(this.projectRoot, file)
      try {
        await fs.access(fullPath)
        await this.log(`✅ Found required file: ${file}`)
      } catch (error) {
        await this.log(`❌ Missing required file: ${file}`, 'ERROR')
        structureValid = false
      }
    }

    // Check required directories
    for (const dir of requiredDirectories) {
      const fullPath = path.join(this.projectRoot, dir)
      try {
        const stat = await fs.stat(fullPath)
        if (stat.isDirectory()) {
          await this.log(`✅ Found required directory: ${dir}`)
        } else {
          await this.log(`❌ Required path is not a directory: ${dir}`, 'ERROR')
          structureValid = false
        }
      } catch (error) {
        await this.log(`❌ Missing required directory: ${dir}`, 'ERROR')
        structureValid = false
      }
    }

    return structureValid
  }

  async verifyEnvironmentConfiguration() {
    await this.log('Verifying environment configuration...')

    const requiredEnvFiles = ['.env.local', '.env.production']
    const requiredEnvVars = ['ADMIN_ACCESS_KEY']

    let envValid = true

    // Check environment files exist
    for (const envFile of requiredEnvFiles) {
      const fullPath = path.join(this.projectRoot, envFile)
      try {
        await fs.access(fullPath)
        await this.log(`✅ Found environment file: ${envFile}`)
      } catch (error) {
        await this.log(`⚠️ Environment file not found: ${envFile}`, 'WARN')
      }
    }

    // Check required environment variables
    for (const envVar of requiredEnvVars) {
      if (process.env[envVar]) {
        await this.log(`✅ Environment variable configured: ${envVar}`)
      } else {
        await this.log(`❌ Missing required environment variable: ${envVar}`, 'ERROR')
        envValid = false
      }
    }

    return envValid
  }

  async verifyBuildOutput() {
    await this.log('Verifying build output...')

    try {
      // Run build
      await this.log('Running production build...')
      execSync('npm run build', {
        cwd: this.projectRoot,
        stdio: 'inherit',
        timeout: 120000, // 2 minute timeout
      })

      // Check if admin routes were built
      const buildDir = path.join(this.projectRoot, '.next')
      const adminRoutes = [
        '.next/server/app/admin/page.js',
        '.next/server/app/admin/login/page.js',
        '.next/server/app/admin/enrollments/page.js',
      ]

      let buildValid = true

      for (const route of adminRoutes) {
        const fullPath = path.join(this.projectRoot, route)
        try {
          await fs.access(fullPath)
          await this.log(`✅ Admin route built successfully: ${route}`)
        } catch (error) {
          await this.log(`❌ Admin route not found in build: ${route}`, 'ERROR')
          buildValid = false
        }
      }

      // Check if API routes were built
      const apiRoutes = [
        '.next/server/app/api/admin/analytics/route.js',
        '.next/server/app/api/admin/demo-bookings/route.js',
        '.next/server/app/api/admin/marketing/route.js',
      ]

      for (const route of apiRoutes) {
        const fullPath = path.join(this.projectRoot, route)
        try {
          await fs.access(fullPath)
          await this.log(`✅ API route built successfully: ${route}`)
        } catch (error) {
          await this.log(`❌ API route not found in build: ${route}`, 'ERROR')
          buildValid = false
        }
      }

      return buildValid
    } catch (error) {
      await this.log(`❌ Build failed: ${error.message}`, 'ERROR')
      return false
    }
  }

  async verifyVercelConfiguration() {
    await this.log('Verifying Vercel configuration...')

    const vercelConfigPath = path.join(this.projectRoot, 'vercel.json')

    try {
      const configContent = await fs.readFile(vercelConfigPath, 'utf8')
      const config = JSON.parse(configContent)

      let configValid = true

      // Check for required configuration sections
      const requiredSections = ['functions', 'headers']
      for (const section of requiredSections) {
        if (config[section]) {
          await this.log(`✅ Vercel config has required section: ${section}`)
        } else {
          await this.log(`❌ Vercel config missing required section: ${section}`, 'ERROR')
          configValid = false
        }
      }

      // Check for admin-specific configurations
      if (config.headers && config.headers.some((h) => h.source.includes('/admin'))) {
        await this.log('✅ Vercel config includes admin-specific headers')
      } else {
        await this.log('⚠️ Vercel config may be missing admin-specific headers', 'WARN')
      }

      return configValid
    } catch (error) {
      await this.log(`❌ Failed to verify Vercel configuration: ${error.message}`, 'ERROR')
      return false
    }
  }

  async verifyGitStatus() {
    await this.log('Verifying Git status...')

    try {
      // Check if working directory is clean
      const status = execSync('git status --porcelain', {
        cwd: this.projectRoot,
        encoding: 'utf8',
      })

      if (status.trim() === '') {
        await this.log('✅ Git working directory is clean')
        return true
      } else {
        await this.log('⚠️ Git working directory has uncommitted changes', 'WARN')
        await this.log(`Uncommitted changes:\n${status}`, 'WARN')
        return false
      }
    } catch (error) {
      await this.log(`❌ Failed to check Git status: ${error.message}`, 'ERROR')
      return false
    }
  }

  async performPreDeploymentChecks() {
    await this.log('🚀 Starting pre-deployment verification...')

    const checks = [
      { name: 'Project Structure', fn: () => this.verifyProjectStructure() },
      { name: 'Environment Configuration', fn: () => this.verifyEnvironmentConfiguration() },
      { name: 'Build Output', fn: () => this.verifyBuildOutput() },
      { name: 'Vercel Configuration', fn: () => this.verifyVercelConfiguration() },
      { name: 'Git Status', fn: () => this.verifyGitStatus() },
    ]

    const results = {}
    let allChecksPass = true

    for (const check of checks) {
      await this.log(`\n--- Checking ${check.name} ---`)
      try {
        results[check.name] = await check.fn()
        if (results[check.name]) {
          await this.log(`✅ ${check.name} verification passed`)
        } else {
          await this.log(`❌ ${check.name} verification failed`, 'ERROR')
          allChecksPass = false
        }
      } catch (error) {
        await this.log(`❌ ${check.name} verification error: ${error.message}`, 'ERROR')
        results[check.name] = false
        allChecksPass = false
      }
    }

    return { results, allChecksPass }
  }

  async generateVerificationReport(results) {
    const report = {
      timestamp: new Date().toISOString(),
      overallStatus: results.allChecksPass ? 'PASS' : 'FAIL',
      checks: results.results,
      recommendations: [],
    }

    // Add recommendations based on failed checks
    Object.entries(results.results).forEach(([checkName, passed]) => {
      if (!passed) {
        switch (checkName) {
          case 'Project Structure':
            report.recommendations.push(
              'Ensure all admin panel files are present in the correct locations'
            )
            break
          case 'Environment Configuration':
            report.recommendations.push(
              'Set up required environment variables, especially ADMIN_ACCESS_KEY'
            )
            break
          case 'Build Output':
            report.recommendations.push(
              'Fix build errors to ensure admin routes are properly generated'
            )
            break
          case 'Vercel Configuration':
            report.recommendations.push('Update vercel.json with proper admin panel configuration')
            break
          case 'Git Status':
            report.recommendations.push(
              'Commit all changes before deployment to ensure consistency'
            )
            break
        }
      }
    })

    const reportPath = path.join(this.projectRoot, 'pre-deployment-report.json')
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2))

    return report
  }

  async run() {
    try {
      await this.log('🔍 Starting comprehensive deployment verification system')

      const results = await this.performPreDeploymentChecks()
      const report = await this.generateVerificationReport(results)

      await this.log(`\n📊 Verification Summary:`)
      await this.log(`Overall Status: ${report.overallStatus}`)
      await this.log(
        `Passed Checks: ${Object.values(results.results).filter(Boolean).length}/${Object.keys(results.results).length}`
      )

      if (report.recommendations.length > 0) {
        await this.log('\n📋 Recommendations:')
        report.recommendations.forEach((rec, i) => {
          this.log(`${i + 1}. ${rec}`)
        })
      }

      if (results.allChecksPass) {
        await this.log('\n🎉 All verification checks passed! Ready for deployment.')
        return 0
      } else {
        await this.log(
          '\n❌ Some verification checks failed. Please address issues before deployment.'
        )
        return 1
      }
    } catch (error) {
      await this.log(`💥 Verification system error: ${error.message}`, 'ERROR')
      return 1
    }
  }
}

// CLI execution
if (require.main === module) {
  const verification = new DeploymentVerification()

  verification
    .run()
    .then((exitCode) => {
      process.exit(exitCode)
    })
    .catch((error) => {
      console.error('Verification failed:', error)
      process.exit(1)
    })
}

module.exports = DeploymentVerification
