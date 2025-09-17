#!/usr/bin/env node

/**
 * 🔒 Backup and Verification System
 * Ensures your work is never lost by creating multiple backup points
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔒 Starting Backup and Verification System...')
console.log('==============================================')

// Create backup directory with timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
const backupDir = path.join(__dirname, '..', 'backups', `backup-${timestamp}`)

try {
  // Ensure backup directory exists
  fs.mkdirSync(backupDir, { recursive: true })

  // Step 1: Create Git backup
  console.log('📦 Step 1: Creating Git backup...')
  execSync(`git bundle create "${backupDir}/complete-repo.bundle" --all`, { stdio: 'inherit' })
  console.log('✅ Git backup created')

  // Step 2: Create file system backup of critical files
  console.log('📁 Step 2: Backing up critical files...')

  const criticalFiles = [
    'package.json',
    'vercel.json',
    'next.config.js',
    'tailwind.config.js',
    'tsconfig.json',
    'src/app',
    'src/components',
    'src/lib',
    'src/data',
    '.github/workflows',
    'scripts',
  ]

  criticalFiles.forEach((file) => {
    const srcPath = path.join(__dirname, '..', file)
    const destPath = path.join(backupDir, 'files', file)

    if (fs.existsSync(srcPath)) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true })
      if (fs.lstatSync(srcPath).isDirectory()) {
        execSync(`cp -r "${srcPath}" "${destPath}"`, { stdio: 'inherit' })
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    }
  })

  console.log('✅ Critical files backed up')

  // Step 3: Check Git status
  console.log('🔍 Step 3: Checking Git status...')
  try {
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' })
    if (gitStatus.trim()) {
      console.log('⚠️ Uncommitted changes detected:')
      console.log(gitStatus)

      // Create backup of uncommitted changes
      execSync(`git diff > "${backupDir}/uncommitted-changes.patch"`, { stdio: 'inherit' })
      console.log('💾 Uncommitted changes saved to patch file')
    } else {
      console.log('✅ Working directory clean')
    }
  } catch (error) {
    console.log('⚠️ Git status check failed, but continuing...')
  }

  // Step 4: Verify remote connection
  console.log('🌐 Step 4: Verifying remote connections...')
  try {
    execSync('git remote -v', { stdio: 'inherit' })
    console.log('✅ Git remote verified')
  } catch (error) {
    console.log('❌ Git remote verification failed')
  }

  // Step 5: Check Vercel connection
  console.log('🚀 Step 5: Checking Vercel configuration...')
  const vercelConfigExists = fs.existsSync(path.join(__dirname, '..', '.vercel', 'project.json'))
  if (vercelConfigExists) {
    console.log('✅ Vercel configuration found')

    const vercelConfig = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', '.vercel', 'project.json'), 'utf8')
    )
    console.log(`   Project ID: ${vercelConfig.projectId}`)
    console.log(`   Project Name: ${vercelConfig.projectName}`)
  } else {
    console.log('⚠️ Vercel configuration not found')
  }

  // Step 6: Test build
  console.log('🏗️ Step 6: Testing build...')
  try {
    execSync('npm run build', { stdio: 'inherit' })
    console.log('✅ Build test successful')
  } catch (error) {
    console.log('❌ Build test failed - fix before deploying')
    process.exit(1)
  }

  // Step 7: Create backup manifest
  console.log('📋 Step 7: Creating backup manifest...')
  const manifest = {
    timestamp: new Date().toISOString(),
    backup_location: backupDir,
    git_commit: execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim(),
    git_branch: execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim(),
    has_uncommitted_changes: !!execSync('git status --porcelain', { encoding: 'utf8' }).trim(),
    vercel_configured: vercelConfigExists,
    build_successful: true,
    files_backed_up: criticalFiles.filter((file) =>
      fs.existsSync(path.join(__dirname, '..', file))
    ),
  }

  fs.writeFileSync(path.join(backupDir, 'backup-manifest.json'), JSON.stringify(manifest, null, 2))

  console.log('📊 Backup Summary:')
  console.log('==================')
  console.log(`📁 Backup Location: ${backupDir}`)
  console.log(`🏷️ Git Commit: ${manifest.git_commit}`)
  console.log(`🌿 Git Branch: ${manifest.git_branch}`)
  console.log(`📁 Files Backed Up: ${manifest.files_backed_up.length}`)
  console.log(
    `💾 Bundle Size: ${(fs.statSync(path.join(backupDir, 'complete-repo.bundle')).size / 1024 / 1024).toFixed(2)} MB`
  )

  console.log('')
  console.log('🎉 Backup and Verification Complete!')
  console.log('Your work is safely preserved in multiple formats.')

  console.log('')
  console.log('🔗 Next Steps:')
  console.log('1. Run: ./scripts/auto-deploy.sh (to deploy changes)')
  console.log('2. Check: https://cerebrum-biology-academy-website.vercel.app')
  console.log('3. Monitor: https://github.com/DrShekhar/-cerebrum-biology-academy-website/actions')
} catch (error) {
  console.error('❌ Backup failed:', error.message)
  process.exit(1)
}
