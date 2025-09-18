#!/usr/bin/env node

import { execSync } from 'child_process'
import chalk from 'chalk'

const log = {
  success: (msg) => console.log(chalk.green('✅ ' + msg)),
  warning: (msg) => console.log(chalk.yellow('⚠️  ' + msg)),
  error: (msg) => console.log(chalk.red('❌ ' + msg)),
  info: (msg) => console.log(chalk.blue('📋 ' + msg)),
  step: (msg) => console.log(chalk.cyan('🔄 ' + msg)),
}

function getCurrentBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim()
  } catch (error) {
    return null
  }
}

function checkGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' })
    return status.trim().length > 0
  } catch (error) {
    return false
  }
}

function checkWorkflowStatus() {
  console.log(chalk.bold('\n🚀 Cerebrum Biology Academy - Workflow Checker\n'))

  const currentBranch = getCurrentBranch()
  const hasChanges = checkGitStatus()

  if (!currentBranch) {
    log.error('Not in a git repository or git not available')
    return
  }

  log.info(`Current branch: ${currentBranch}`)

  // Branch validation
  if (currentBranch === 'main') {
    log.warning('You are on main branch!')
    log.info('🔧 Recommended action: git checkout develop')
    log.info('📚 Then use: git start-feature your-feature-name')
    return
  }

  if (currentBranch === 'develop') {
    if (hasChanges) {
      log.warning('You have uncommitted changes on develop branch')
      log.info('🔧 Options:')
      log.info('   1. Stash changes: git stash')
      log.info('   2. Create feature branch: git start-feature emergency-fix')
    } else {
      log.success('Good: On develop branch with clean working directory')
      log.info('📝 Next step: git start-feature your-feature-name')
    }
    return
  }

  if (currentBranch.startsWith('feature/')) {
    log.success('Good: On feature branch')

    if (hasChanges) {
      log.info('📝 You have uncommitted changes')
      log.info('🔧 Next steps:')
      log.info('   1. Complete your changes')
      log.info('   2. Run: npm run dev:safe (for testing)')
      log.info('   3. Commit: git safe-commit "feat: your changes"')
      log.info('   4. Push: git finish-feature')
    } else {
      log.success('Clean working directory on feature branch')
      log.info('📝 Next step: git finish-feature (to push and create PR)')
    }
    return
  }

  log.warning('Unknown branch type')
  log.info('🔧 Recommended: Switch to develop and start fresh feature')

  console.log(chalk.bold('\n📚 Quick Workflow Reference:'))
  console.log('1. git start-feature name     - Start new feature (Steps 1-2)')
  console.log('2. npm run create:component   - Generate component')
  console.log('3. npm run dev:safe          - Safe development server')
  console.log('4. git safe-commit "msg"     - Commit with checks (Step 6)')
  console.log('5. git finish-feature        - Push and create PR (Step 7)')
  console.log('6. git workflow-status       - Check current status\n')
}

// Run the checker
checkWorkflowStatus()
