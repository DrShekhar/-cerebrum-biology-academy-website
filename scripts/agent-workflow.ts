#!/usr/bin/env tsx

/**
 * Agent Workflow CLI
 *
 * Simple command-line interface for non-technical users to request features.
 * This is the ONLY interface you need to use!
 *
 * Usage:
 *   npm run agent "I want students to be able to bookmark questions"
 *   npm run agent "Add a dark mode toggle to settings"
 *   npm run agent "Create a leaderboard showing top students"
 */

import { MasterOrchestrator } from '../src/lib/agents/orchestrator/MasterOrchestrator'
import type { UserCommand } from '../src/lib/agents/types'

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    printHelp()
    process.exit(0)
  }

  const command = args.join(' ')

  // Parse special flags
  const skipTests = command.includes('--skip-tests')
  const autoApprove = command.includes('--auto-approve')
  const deployImmediately = command.includes('--deploy-now')

  // Remove flags from feature description
  const featureDescription = command
    .replace('--skip-tests', '')
    .replace('--auto-approve', '')
    .replace('--deploy-now', '')
    .trim()

  if (!featureDescription) {
    console.error('❌ Please provide a feature description\n')
    printHelp()
    process.exit(1)
  }

  console.log('\n🚀 Cerebrum Biology Academy - Agent Workflow System\n')
  console.log(`📝 Feature Request: "${featureDescription}"\n`)

  if (skipTests) {
    console.log('⚠️  Skipping tests (not recommended)')
  }
  if (autoApprove) {
    console.log('✅ Auto-approve enabled')
  }
  if (deployImmediately) {
    console.log('🚀 Deploy immediately after build')
  }

  console.log('\n' + '='.repeat(70) + '\n')

  // Create orchestrator
  const orchestrator = new MasterOrchestrator({
    maxConcurrentTasks: 5,
    enableLearning: true,
    enableMonitoring: true,
    logLevel: 'info',
  })

  // Create user command
  const userCommand: UserCommand = {
    command: 'feature',
    featureDescription,
    options: {
      skipTests,
      autoApprove,
      deployImmediately,
    },
  }

  try {
    // Execute workflow
    const execution = await orchestrator.requestFeature(userCommand)

    console.log('\n' + '='.repeat(70) + '\n')
    console.log('✅ Feature development completed!\n')
    console.log(`📊 Execution ID: ${execution.id}`)
    console.log(`⏱️  Duration: ${formatDuration(execution.duration || 0)}`)
    console.log(`📈 Status: ${execution.status}`)
    console.log(`✅ Completed Tasks: ${execution.metrics.completedTasks}`)

    if (execution.metrics.failedTasks > 0) {
      console.log(`❌ Failed Tasks: ${execution.metrics.failedTasks}`)
    }

    console.log('\n')

    if (execution.status === 'deployed') {
      console.log('🎉 Your feature is now live in production!')
      console.log('🌐 Visit: https://cerebrum-biology-academy.vercel.app')
    } else {
      console.log('✅ Feature is ready for review and deployment')
      console.log('\nNext steps:')
      console.log('  1. Review the changes in your code editor')
      console.log('  2. Test locally with: npm run dev')
      console.log('  3. Deploy with: npm run agent "deploy previous feature" --deploy-now')
    }

    console.log('\n')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Feature development failed\n')
    console.error(error instanceof Error ? error.message : error)
    console.log('\n💡 Tip: Review the error message and try again')
    console.log('    If the issue persists, check the logs or contact support\n')
    process.exit(1)
  }
}

function printHelp() {
  console.log(`
🤖 Cerebrum Biology Academy - Agent Workflow System

A simple way to develop features without writing code!

USAGE:
  npm run agent "<feature description>"

EXAMPLES:
  npm run agent "I want students to be able to bookmark questions"
  npm run agent "Add a dark mode toggle to the settings page"
  npm run agent "Create a leaderboard showing top students by score"
  npm run agent "Allow teachers to create custom quizzes"

OPTIONS:
  --skip-tests          Skip running tests (not recommended)
  --auto-approve        Automatically approve deployment without review
  --deploy-now          Deploy immediately after successful build

EXAMPLES WITH OPTIONS:
  npm run agent "Add bookmark feature" --deploy-now
  npm run agent "Fix typo on homepage" --auto-approve --deploy-now
  npm run agent "WIP: New analytics" --skip-tests

WHAT HAPPENS:
  1. 📋 Product Manager Agent analyzes your request
  2. 🏗️  Architecture Review Agent validates the approach
  3. 💻 Development Agents build the feature (UI, Backend, Database)
  4. ✅ Quality Agents test everything (Code Quality, Unit Tests, E2E)
  5. 🔒 Security Agent audits for vulnerabilities
  6. 🏗️  Build Agent ensures successful build
  7. 📝 Git Agent creates professional commit
  8. 🚀 Deployment Agent deploys to production (if approved)

FEATURES:
  ✅ Zero build failures (validation before deployment)
  ✅ Automated testing (unit + E2E + security)
  ✅ Professional git commits
  ✅ Learning from past development
  ✅ Complete documentation
  ✅ Real-time progress updates

TIPS:
  - Be specific in your feature description
  - Describe WHAT you want, not HOW to build it
  - Mention the user role (student, teacher, admin)
  - Include expected behavior

  Good: "I want students to bookmark questions so they can review them later"
  Bad: "Add a bookmark table to the database"

NEED HELP?
  - Check the documentation: /docs/agent-workflow.md
  - View agent status: npm run agent:status
  - List all agents: npm run agent:list
  - Report issues: https://github.com/your-repo/issues
`)
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  } else {
    return `${seconds}s`
  }
}

// Run the CLI
main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
