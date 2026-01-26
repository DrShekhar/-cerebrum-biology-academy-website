#!/usr/bin/env node

/**
 * Security Check Script
 * Validates security posture before deployment
 *
 * Checks:
 * 1. Environment variables are properly configured
 * 2. No secrets in code
 * 3. Dependencies have no critical vulnerabilities
 * 4. TypeScript compilation succeeds
 * 5. Security headers are configured
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function checkEnvVariables() {
  log('\n🔍 Checking environment variables...', 'blue')

  const requiredEnvVars = ['DATABASE_URL', 'NEXTAUTH_SECRET', 'NEXT_PUBLIC_SITE_URL']

  const missing = requiredEnvVars.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    log(`❌ Missing required environment variables: ${missing.join(', ')}`, 'red')
    return false
  }

  log('✅ All required environment variables are set', 'green')
  return true
}

function checkForSecrets() {
  log('\n🔍 Checking for secrets in code...', 'blue')

  const patterns = [
    /password\s*=\s*["'][^"']+["']/gi,
    /api[_-]?key\s*=\s*["'][^"']+["']/gi,
    /secret\s*=\s*["'][^"']+["']/gi,
    /token\s*=\s*["'][^"']+["']/gi,
  ]

  const dangerousFiles = []
  const srcDir = path.join(process.cwd(), 'src')

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scanDirectory(filePath)
      } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
        const content = fs.readFileSync(filePath, 'utf-8')

        for (const pattern of patterns) {
          if (pattern.test(content)) {
            // Skip test files and examples
            if (!filePath.includes('__tests__') && !filePath.includes('example')) {
              dangerousFiles.push(filePath)
              break
            }
          }
        }
      }
    }
  }

  if (fs.existsSync(srcDir)) {
    scanDirectory(srcDir)
  }

  if (dangerousFiles.length > 0) {
    log('⚠️  Warning: Potential secrets found in code:', 'yellow')
    dangerousFiles.forEach((file) => log(`  - ${file}`, 'yellow'))
    log('  Please review these files and move secrets to .env.local', 'yellow')
  } else {
    log('✅ No obvious secrets found in code', 'green')
  }

  return true // Don't fail build, just warn
}

function checkDependencies() {
  log('\n🔍 Checking npm dependencies for vulnerabilities...', 'blue')

  try {
    execSync('npm audit --audit-level=high --json', { stdio: 'pipe' })
    log('✅ No high or critical vulnerabilities found', 'green')
    return true
  } catch (error) {
    const output = error.stdout.toString()

    try {
      const audit = JSON.parse(output)
      const { vulnerabilities } = audit.metadata

      if (vulnerabilities.high > 0 || vulnerabilities.critical > 0) {
        log('❌ Security vulnerabilities found:', 'red')
        log(`  - Critical: ${vulnerabilities.critical}`, 'red')
        log(`  - High: ${vulnerabilities.high}`, 'red')
        log('\n  Run: npm audit fix', 'yellow')
        return false
      }

      if (vulnerabilities.moderate > 0 || vulnerabilities.low > 0) {
        log('⚠️  Non-critical vulnerabilities found:', 'yellow')
        log(`  - Moderate: ${vulnerabilities.moderate}`, 'yellow')
        log(`  - Low: ${vulnerabilities.low}`, 'yellow')
      }
    } catch (parseError) {
      log('⚠️  Could not parse npm audit output', 'yellow')
    }

    return true // Don't fail on moderate/low
  }
}

function checkTypeScript() {
  log('\n🔍 Checking TypeScript compilation...', 'blue')

  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' })
    log('✅ TypeScript compilation successful', 'green')
    return true
  } catch (error) {
    log('❌ TypeScript compilation failed', 'red')
    const output = error.stdout.toString()
    log(output, 'red')
    return false
  }
}

function checkSecurityHeaders() {
  log('\n🔍 Checking security headers configuration...', 'blue')

  const nextConfigPath = path.join(process.cwd(), 'next.config.mjs')

  if (!fs.existsSync(nextConfigPath)) {
    log('⚠️  next.config.mjs not found', 'yellow')
    return true
  }

  const config = fs.readFileSync(nextConfigPath, 'utf-8')

  const securityHeaders = [
    'X-Frame-Options',
    'X-Content-Type-Options',
    'Referrer-Policy',
    'Permissions-Policy',
  ]

  const missing = securityHeaders.filter((header) => !config.includes(header))

  if (missing.length > 0) {
    log('⚠️  Missing security headers:', 'yellow')
    missing.forEach((header) => log(`  - ${header}`, 'yellow'))
  } else {
    log('✅ Security headers configured', 'green')
  }

  return true // Don't fail, just warn
}

function checkGitSecrets() {
  log('\n🔍 Checking .env files are not committed...', 'blue')

  try {
    const gitFiles = execSync('git ls-files', { encoding: 'utf-8' })
    const envFiles = gitFiles
      .split('\n')
      .filter(
        (file) =>
          file.endsWith('.env') || file.endsWith('.env.local') || file.endsWith('.env.production')
      )

    if (envFiles.length > 0) {
      log('❌ Environment files committed to git:', 'red')
      envFiles.forEach((file) => log(`  - ${file}`, 'red'))
      return false
    }

    log('✅ No .env files in git repository', 'green')
    return true
  } catch (error) {
    log('⚠️  Could not check git files', 'yellow')
    return true
  }
}

async function main() {
  log('='.repeat(60), 'blue')
  log('🔒 CEREBRUM SECURITY CHECK', 'blue')
  log('='.repeat(60), 'blue')

  const checks = [
    { name: 'Environment Variables', fn: checkEnvVariables },
    { name: 'Secrets in Code', fn: checkForSecrets },
    { name: 'Dependency Vulnerabilities', fn: checkDependencies },
    { name: 'TypeScript Compilation', fn: checkTypeScript },
    { name: 'Security Headers', fn: checkSecurityHeaders },
    { name: 'Git Secrets', fn: checkGitSecrets },
  ]

  const results = []

  for (const check of checks) {
    try {
      const passed = await check.fn()
      results.push({ name: check.name, passed })
    } catch (error) {
      log(`❌ ${check.name} check failed with error: ${error.message}`, 'red')
      results.push({ name: check.name, passed: false })
    }
  }

  // Summary
  log('\n' + '='.repeat(60), 'blue')
  log('📊 SECURITY CHECK SUMMARY', 'blue')
  log('='.repeat(60), 'blue')

  const passed = results.filter((r) => r.passed).length
  const total = results.length

  results.forEach((result) => {
    const icon = result.passed ? '✅' : '❌'
    const color = result.passed ? 'green' : 'red'
    log(`${icon} ${result.name}`, color)
  })

  log('\n' + `Result: ${passed}/${total} checks passed`, passed === total ? 'green' : 'red')

  if (passed === total) {
    log('\n🎉 All security checks passed!', 'green')
    process.exit(0)
  } else {
    log('\n⚠️  Some security checks failed. Please fix the issues above.', 'yellow')
    process.exit(1)
  }
}

main().catch((error) => {
  log(`\n❌ Security check failed with error: ${error.message}`, 'red')
  process.exit(1)
})
