#!/usr/bin/env tsx

/**
 * Production Environment Variables Setup Script
 *
 * This script helps set up and validate environment variables for production deployment.
 * It checks for required variables, validates their format, and provides guidance.
 */

import * as fs from 'fs'
import * as path from 'path'

interface EnvVariable {
  key: string
  description: string
  required: boolean
  validation?: (value: string) => boolean
  example?: string
  category: string
}

const REQUIRED_ENV_VARS: EnvVariable[] = [
  // Application Settings
  {
    key: 'NODE_ENV',
    description: 'Environment mode',
    required: true,
    validation: (v) => ['production', 'staging'].includes(v),
    example: 'production',
    category: 'Application',
  },
  {
    key: 'NEXT_PUBLIC_SITE_URL',
    description: 'Public site URL',
    required: true,
    validation: (v) => v.startsWith('https://'),
    example: 'https://cerebrumbiologyacademy.com',
    category: 'Application',
  },

  // AI Services
  {
    key: 'ANTHROPIC_API_KEY',
    description: 'Claude API key for AI tutoring',
    required: true,
    validation: (v) => v.startsWith('sk-ant-'),
    example: 'sk-ant-api03-...',
    category: 'AI Services',
  },
  {
    key: 'OPENAI_API_KEY',
    description: 'OpenAI API key (fallback)',
    required: false,
    validation: (v) => v.startsWith('sk-'),
    example: 'sk-proj-...',
    category: 'AI Services',
  },

  // Database
  {
    key: 'DATABASE_URL',
    description: 'PostgreSQL connection string',
    required: true,
    validation: (v) => v.startsWith('postgresql://'),
    example: 'postgresql://user:pass@host:5432/db',
    category: 'Database',
  },

  // WhatsApp Business API
  {
    key: 'WHATSAPP_PHONE_NUMBER_ID',
    description: 'WhatsApp phone number ID',
    required: true,
    category: 'WhatsApp',
  },
  {
    key: 'WHATSAPP_ACCESS_TOKEN',
    description: 'WhatsApp permanent access token',
    required: true,
    validation: (v) => v.length > 50,
    category: 'WhatsApp',
  },
  {
    key: 'WHATSAPP_BUSINESS_ACCOUNT_ID',
    description: 'WhatsApp business account ID',
    required: true,
    category: 'WhatsApp',
  },
  {
    key: 'WHATSAPP_VERIFY_TOKEN',
    description: 'Webhook verification token',
    required: true,
    category: 'WhatsApp',
  },

  // Redis (Production)
  {
    key: 'REDIS_URL',
    description: 'Redis connection string (Upstash)',
    required: true,
    validation: (v) => v.startsWith('redis://') || v.startsWith('rediss://'),
    example: 'redis://default:password@hostname:6379',
    category: 'Caching',
  },

  // Analytics
  {
    key: 'NEXT_PUBLIC_GA_MEASUREMENT_ID',
    description: 'Google Analytics 4 measurement ID',
    required: true,
    validation: (v) => v.startsWith('G-'),
    example: 'G-XXXXXXXXXX',
    category: 'Analytics',
  },
  {
    key: 'NEXT_PUBLIC_SENTRY_DSN',
    description: 'Sentry error tracking DSN',
    required: false,
    validation: (v) => v.startsWith('https://'),
    category: 'Analytics',
  },

  // Payment Gateway
  {
    key: 'RAZORPAY_KEY_ID',
    description: 'Razorpay live key ID',
    required: true,
    validation: (v) => v.startsWith('rzp_live_'),
    example: 'rzp_live_XXXXXXXXXXXXX',
    category: 'Payment',
  },
  {
    key: 'RAZORPAY_KEY_SECRET',
    description: 'Razorpay live key secret',
    required: true,
    category: 'Payment',
  },

  // Authentication
  {
    key: 'AUTH_SECRET',
    description: 'NextAuth secret key',
    required: true,
    validation: (v) => v.length >= 32,
    category: 'Authentication',
  },
  {
    key: 'JWT_SECRET',
    description: 'JWT signing secret',
    required: true,
    validation: (v) => v.length >= 32,
    category: 'Authentication',
  },
]

class EnvSetup {
  private errors: string[] = []
  private warnings: string[] = []
  private passed: string[] = []

  async validate(): Promise<boolean> {
    console.log('\n🔍 Validating Production Environment Variables...\n')

    const categories = this.groupByCategory()

    for (const [category, vars] of Object.entries(categories)) {
      console.log(`\n📦 ${category}`)
      console.log('─'.repeat(50))

      for (const envVar of vars) {
        this.validateVariable(envVar)
      }
    }

    this.printSummary()
    return this.errors.length === 0
  }

  private validateVariable(envVar: EnvVariable): void {
    const value = process.env[envVar.key]

    if (!value || value.trim() === '') {
      if (envVar.required) {
        this.errors.push(`❌ ${envVar.key}: MISSING (Required)`)
        console.log(`  ❌ ${envVar.key}`)
        console.log(`     ${envVar.description}`)
        if (envVar.example) {
          console.log(`     Example: ${envVar.example}`)
        }
      } else {
        this.warnings.push(`⚠️  ${envVar.key}: Optional but recommended`)
        console.log(`  ⚠️  ${envVar.key} (Optional)`)
      }
      return
    }

    // Validate format if validator exists
    if (envVar.validation && !envVar.validation(value)) {
      this.errors.push(`❌ ${envVar.key}: INVALID FORMAT`)
      console.log(`  ❌ ${envVar.key}: Invalid format`)
      if (envVar.example) {
        console.log(`     Expected format: ${envVar.example}`)
      }
      return
    }

    this.passed.push(envVar.key)
    console.log(`  ✅ ${envVar.key}`)
  }

  private groupByCategory(): Record<string, EnvVariable[]> {
    return REQUIRED_ENV_VARS.reduce(
      (acc, envVar) => {
        if (!acc[envVar.category]) {
          acc[envVar.category] = []
        }
        acc[envVar.category].push(envVar)
        return acc
      },
      {} as Record<string, EnvVariable[]>
    )
  }

  private printSummary(): void {
    console.log('\n' + '═'.repeat(50))
    console.log('\n📊 VALIDATION SUMMARY\n')
    console.log(`✅ Passed: ${this.passed.length}`)
    console.log(`⚠️  Warnings: ${this.warnings.length}`)
    console.log(`❌ Errors: ${this.errors.length}`)

    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS FOUND:\n')
      this.errors.forEach((error) => console.log(error))
      console.log('\n💡 Fix these errors before deploying to production!')
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:\n')
      this.warnings.forEach((warning) => console.log(warning))
    }

    if (this.errors.length === 0) {
      console.log('\n✅ All required environment variables are configured!')
      console.log('\n🚀 Ready for production deployment!')
    }
  }

  async generateVercelCommand(): Promise<void> {
    console.log('\n📝 Vercel Environment Variables Setup Command:\n')
    console.log('Run the following commands to set up variables in Vercel:\n')

    for (const envVar of REQUIRED_ENV_VARS) {
      const value = process.env[envVar.key]
      if (value) {
        // Mask sensitive values
        const maskedValue = this.maskSensitiveValue(envVar.key, value)
        console.log(`vercel env add ${envVar.key} production <<< "${maskedValue}"`)
      }
    }

    console.log('\n💡 Or use Vercel dashboard:')
    console.log('https://vercel.com/your-project/settings/environment-variables')
  }

  private maskSensitiveValue(key: string, value: string): string {
    const sensitiveKeys = ['SECRET', 'KEY', 'TOKEN', 'PASSWORD', 'API_KEY']

    if (sensitiveKeys.some((k) => key.includes(k))) {
      return '[REPLACE_WITH_ACTUAL_VALUE]'
    }

    return value
  }

  async checkSecurityBestPractices(): Promise<void> {
    console.log('\n🔒 Security Best Practices Check:\n')

    const checks = [
      {
        name: 'Using production API keys',
        check: () => {
          const razorpayKey = process.env.RAZORPAY_KEY_ID
          return razorpayKey?.startsWith('rzp_live_')
        },
      },
      {
        name: 'Strong JWT secret (32+ chars)',
        check: () => {
          const jwtSecret = process.env.JWT_SECRET
          return jwtSecret && jwtSecret.length >= 32
        },
      },
      {
        name: 'HTTPS site URL',
        check: () => {
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
          return siteUrl?.startsWith('https://')
        },
      },
      {
        name: 'Redis connection secured (TLS)',
        check: () => {
          const redisUrl = process.env.REDIS_URL
          return redisUrl?.startsWith('rediss://')
        },
      },
    ]

    checks.forEach(({ name, check }) => {
      const result = check()
      console.log(result ? `✅ ${name}` : `⚠️  ${name}`)
    })
  }
}

// Main execution
async function main() {
  console.log('╔═══════════════════════════════════════════════════╗')
  console.log('║   Cerebrum Biology Academy                        ║')
  console.log('║   Production Environment Setup                    ║')
  console.log('╚═══════════════════════════════════════════════════╝')

  const setup = new EnvSetup()

  // Validate environment variables
  const isValid = await setup.validate()

  // Check security best practices
  await setup.checkSecurityBestPractices()

  // Generate Vercel commands
  if (process.argv.includes('--vercel-commands')) {
    await setup.generateVercelCommand()
  }

  // Exit with error code if validation failed
  if (!isValid) {
    process.exit(1)
  }
}

main().catch(console.error)
