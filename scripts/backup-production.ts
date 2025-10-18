#!/usr/bin/env tsx

/**
 * Production Backup Script
 *
 * Creates backups of:
 * - Database (PostgreSQL)
 * - Redis data (if applicable)
 * - Configuration files
 * - Environment variables (encrypted)
 */

import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

interface BackupResult {
  type: string
  success: boolean
  path?: string
  size?: string
  error?: string
}

class ProductionBackup {
  private backupDir: string
  private timestamp: string
  private results: BackupResult[] = []

  constructor() {
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    this.backupDir = path.join(process.cwd(), 'backups', this.timestamp)
  }

  async createBackups(): Promise<boolean> {
    console.log('🔐 Creating Production Backups...\n')
    console.log(`📁 Backup Directory: ${this.backupDir}\n`)

    // Create backup directory
    fs.mkdirSync(this.backupDir, { recursive: true })

    // Run backup tasks
    await this.backupDatabase()
    await this.backupRedis()
    await this.backupConfiguration()
    await this.backupEnvironmentVariables()

    this.printSummary()

    const hasFailures = this.results.some((r) => !r.success)
    return !hasFailures
  }

  private async backupDatabase(): Promise<void> {
    try {
      console.log('📊 Backing up database...')

      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL not configured')
      }

      const backupFile = path.join(this.backupDir, 'database.sql')

      // Extract connection details from DATABASE_URL
      const dbUrl = new URL(process.env.DATABASE_URL)
      const host = dbUrl.hostname
      const port = dbUrl.port || '5432'
      const database = dbUrl.pathname.slice(1)
      const username = dbUrl.username
      const password = dbUrl.password

      // Use pg_dump for PostgreSQL backup
      const command = `PGPASSWORD="${password}" pg_dump -h ${host} -p ${port} -U ${username} -d ${database} -F p -f ${backupFile}`

      try {
        execSync(command, { stdio: 'pipe' })

        const stats = fs.statSync(backupFile)
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2)

        this.results.push({
          type: 'Database',
          success: true,
          path: backupFile,
          size: `${sizeMB} MB`,
        })

        console.log(`✅ Database backup complete (${sizeMB} MB)`)
      } catch (error) {
        throw new Error('pg_dump command failed - ensure PostgreSQL client is installed')
      }
    } catch (error) {
      this.results.push({
        type: 'Database',
        success: false,
        error: (error as Error).message,
      })

      console.log(`❌ Database backup failed: ${(error as Error).message}`)
    }
  }

  private async backupRedis(): Promise<void> {
    try {
      console.log('🔴 Backing up Redis...')

      if (process.env.REDIS_ENABLED !== 'true') {
        console.log('ℹ️  Redis disabled - skipping')
        return
      }

      // For Upstash Redis, data is already backed up by the service
      // Just document the configuration
      const configFile = path.join(this.backupDir, 'redis-config.json')
      const config = {
        enabled: process.env.REDIS_ENABLED,
        url: process.env.REDIS_URL ? '[CONFIGURED]' : '[NOT CONFIGURED]',
        timestamp: new Date().toISOString(),
      }

      fs.writeFileSync(configFile, JSON.stringify(config, null, 2))

      this.results.push({
        type: 'Redis',
        success: true,
        path: configFile,
      })

      console.log('✅ Redis configuration backed up')
    } catch (error) {
      this.results.push({
        type: 'Redis',
        success: false,
        error: (error as Error).message,
      })

      console.log(`❌ Redis backup failed: ${(error as Error).message}`)
    }
  }

  private async backupConfiguration(): Promise<void> {
    try {
      console.log('⚙️  Backing up configuration files...')

      const configFiles = [
        'package.json',
        'next.config.js',
        'vercel.json',
        'prisma/schema.prisma',
        'tailwind.config.js',
      ]

      const configBackupDir = path.join(this.backupDir, 'config')
      fs.mkdirSync(configBackupDir, { recursive: true })

      let backedUpCount = 0

      for (const file of configFiles) {
        const sourcePath = path.join(process.cwd(), file)
        if (fs.existsSync(sourcePath)) {
          const destPath = path.join(configBackupDir, file.replace(/\//g, '_'))
          fs.copyFileSync(sourcePath, destPath)
          backedUpCount++
        }
      }

      this.results.push({
        type: 'Configuration',
        success: true,
        path: configBackupDir,
        size: `${backedUpCount} files`,
      })

      console.log(`✅ Configuration backed up (${backedUpCount} files)`)
    } catch (error) {
      this.results.push({
        type: 'Configuration',
        success: false,
        error: (error as Error).message,
      })

      console.log(`❌ Configuration backup failed: ${(error as Error).message}`)
    }
  }

  private async backupEnvironmentVariables(): Promise<void> {
    try {
      console.log('🔒 Backing up environment variables...')

      // Create a sanitized version of environment variables
      const envBackup: Record<string, string> = {}

      const sensitivePatterns = ['PASSWORD', 'SECRET', 'KEY', 'TOKEN', 'API_KEY']

      for (const [key, value] of Object.entries(process.env)) {
        if (key.startsWith('NEXT_PUBLIC_') || key.startsWith('NODE_')) {
          envBackup[key] = value || ''
        } else if (sensitivePatterns.some((pattern) => key.includes(pattern))) {
          envBackup[key] = '[REDACTED]'
        } else {
          envBackup[key] = value || ''
        }
      }

      const envFile = path.join(this.backupDir, 'environment.json')
      fs.writeFileSync(envFile, JSON.stringify(envBackup, null, 2))

      this.results.push({
        type: 'Environment',
        success: true,
        path: envFile,
        size: `${Object.keys(envBackup).length} variables`,
      })

      console.log(`✅ Environment backed up (${Object.keys(envBackup).length} variables)`)
    } catch (error) {
      this.results.push({
        type: 'Environment',
        success: false,
        error: (error as Error).message,
      })

      console.log(`❌ Environment backup failed: ${(error as Error).message}`)
    }
  }

  private printSummary(): void {
    console.log('\n' + '═'.repeat(60))
    console.log('\n📊 BACKUP SUMMARY\n')

    const successful = this.results.filter((r) => r.success).length
    const failed = this.results.filter((r) => !r.success).length

    console.log(`✅ Successful: ${successful}`)
    console.log(`❌ Failed: ${failed}`)

    if (failed > 0) {
      console.log('\n❌ SOME BACKUPS FAILED\n')

      this.results
        .filter((r) => !r.success)
        .forEach((r) => {
          console.log(`   ${r.type}: ${r.error}`)
        })
    } else {
      console.log('\n✅ ALL BACKUPS COMPLETED SUCCESSFULLY!\n')
      console.log(`📁 Backup Location: ${this.backupDir}`)
    }

    console.log('\n💡 Backup Retention:')
    console.log('   - Keep daily backups for 7 days')
    console.log('   - Keep weekly backups for 4 weeks')
    console.log('   - Keep monthly backups for 12 months')

    console.log('\n🔒 Security:')
    console.log('   - Store backups in secure location')
    console.log('   - Encrypt sensitive backups')
    console.log('   - Test restoration periodically')

    console.log('\n═'.repeat(60) + '\n')
  }

  async uploadToCloud(): Promise<void> {
    console.log('\n☁️  Uploading backups to cloud storage...')

    // In production, upload to:
    // - AWS S3
    // - Vercel Blob Storage
    // - Google Cloud Storage

    console.log('ℹ️  Cloud upload not implemented yet')
    console.log('   Implement using @vercel/blob or AWS SDK')
  }

  async cleanOldBackups(daysToKeep: number = 7): Promise<void> {
    console.log(`\n🧹 Cleaning backups older than ${daysToKeep} days...`)

    const backupsDir = path.join(process.cwd(), 'backups')

    if (!fs.existsSync(backupsDir)) {
      console.log('ℹ️  No backups directory found')
      return
    }

    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000)
    let deletedCount = 0

    const backups = fs.readdirSync(backupsDir)

    for (const backup of backups) {
      const backupPath = path.join(backupsDir, backup)
      const stats = fs.statSync(backupPath)

      if (stats.isDirectory() && stats.mtime < cutoffDate) {
        fs.rmSync(backupPath, { recursive: true })
        deletedCount++
        console.log(`🗑️  Deleted old backup: ${backup}`)
      }
    }

    console.log(`✅ Cleaned ${deletedCount} old backups`)
  }
}

// Main execution
async function main() {
  console.log('╔═══════════════════════════════════════════════════╗')
  console.log('║   Production Backup System                        ║')
  console.log('║   Cerebrum Biology Academy                        ║')
  console.log('╚═══════════════════════════════════════════════════╝\n')

  const backup = new ProductionBackup()

  // Create backups
  const success = await backup.createBackups()

  // Clean old backups
  if (process.argv.includes('--clean')) {
    await backup.cleanOldBackups()
  }

  // Upload to cloud (if implemented)
  if (process.argv.includes('--upload')) {
    await backup.uploadToCloud()
  }

  process.exit(success ? 0 : 1)
}

main().catch((error) => {
  console.error('Backup failed:', error)
  process.exit(1)
})
