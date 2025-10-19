#!/usr/bin/env node

/**
 * CI/CD Agent CLI Tool
 *
 * Usage:
 *   node scripts/run-cicd-agent.js analyze build
 *   node scripts/run-cicd-agent.js fix loading-screen-stuck
 *   node scripts/run-cicd-agent.js verify vercel
 *   node scripts/run-cicd-agent.js setup full-pipeline
 */

const https = require('https')

const args = process.argv.slice(2)
const action = args[0]
const param = args[1]

if (!action) {
  console.error('Usage: node scripts/run-cicd-agent.js <action> [param]')
  console.error('')
  console.error('Actions:')
  console.error('  analyze <build|deployment|runtime|configuration>')
  console.error(
    '  fix <loading-screen-stuck|suspense-boundary|build-failure|env-vars-missing|dependency-errors|type-errors>'
  )
  console.error('  verify <vercel|netlify|aws|other>')
  console.error('  setup <build-test|deploy|full-pipeline>')
  console.error('  check <local|vercel|github-actions>')
  console.error('  build <command>')
  process.exit(1)
}

const requestData = {
  action,
  ...(param && { param }),
}

// For local development
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/agent/cicd',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
}

console.log(`🤖 Running CI/CD Agent: ${action} ${param || ''}`)
console.log('')

const req = https.request(options, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    try {
      const response = JSON.parse(data)
      console.log('✅ Agent Response:')
      console.log(JSON.stringify(response, null, 2))
    } catch (error) {
      console.error('❌ Error parsing response:', error.message)
      console.log('Raw response:', data)
    }
  })
})

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message)
  console.log('')
  console.log('💡 Tip: Make sure your development server is running:')
  console.log('   npm run dev')
})

req.write(JSON.stringify(requestData))
req.end()
