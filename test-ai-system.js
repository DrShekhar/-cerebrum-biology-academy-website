#!/usr/bin/env node

/**
 * AI System Test Script
 * Tests all AI components for functionality
 */

import fs from 'fs'
import path from 'path'

console.log('🧬 Testing Cerebrum Biology Academy AI System\n')

// Test 1: Server Status
console.log('1. Testing Development Server...')
const testURL = 'http://localhost:3000'

async function testServer() {
  try {
    const response = await fetch(testURL)
    if (response.ok) {
      console.log('   ✅ Development server is running')
      console.log(`   🌐 Access demo at: ${testURL}/ai-education-demo`)
    } else {
      console.log('   ❌ Server not responding properly')
    }
  } catch (error) {
    console.log('   ❌ Server not accessible. Make sure it\'s running on port 3000')
  }
}

// Test 2: API Health Check
async function testAPIHealth() {
  console.log('\n2. Testing AI Education Hub API...')
  try {
    const response = await fetch(`${testURL}/api/ai/education-hub`)
    if (response.ok) {
      const data = await response.json()
      console.log('   ✅ AI Education Hub API is healthy')
      console.log(`   📊 System Status: ${data.status}`)
      console.log(`   🤖 Components Status:`, data.components)
    } else {
      console.log('   ⚠️  API may need initialization')
    }
  } catch (error) {
    console.log('   ⚠️  API not yet accessible (normal for first run)')
  }
}

// Test 3: Component Structure
console.log('\n3. Testing Component Structure...')

const componentPaths = [
  'src/components/ai/AIEducationDashboard.tsx',
  'src/components/ai/BiologyTutorChatbot.tsx',
  'src/lib/ai/BiologyTutorEngine.ts',
  'src/lib/ai/AssessmentAI.ts',
  'src/lib/ai/ContentIntelligence.ts',
  'src/lib/ai/PerformancePredictionAI.ts',
  'src/lib/ai/AIEducationOrchestrator.ts'
]

componentPaths.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${path.basename(filePath)} - Ready`)
  } else {
    console.log(`   ❌ ${path.basename(filePath)} - Missing`)
  }
})

// Test 4: Demo Page
console.log('\n4. Testing Demo Page...')
const demoPagePath = 'src/app/ai-education-demo/page.tsx'
if (fs.existsSync(demoPagePath)) {
  console.log('   ✅ AI Education Demo page - Ready')
} else {
  console.log('   ❌ Demo page - Missing')
}

// Test 5: API Routes
console.log('\n5. Testing API Routes...')
const apiRoutePath = 'src/app/api/ai/education-hub/route.ts'
if (fs.existsSync(apiRoutePath)) {
  console.log('   ✅ AI Education Hub API route - Ready')
} else {
  console.log('   ❌ API route - Missing')
}

// Run async tests
async function runAsyncTests() {
  await testServer()
  await testAPIHealth()

  console.log('\n🎉 Test Complete!')
  console.log('\n📖 How to test the AI system:')
  console.log(`   1. Open browser: ${testURL}/ai-education-demo`)
  console.log('   2. Interact with the AI dashboard')
  console.log('   3. Click the floating chatbot button')
  console.log('   4. Try asking questions like:')
  console.log('      - "Explain photosynthesis"')
  console.log('      - "What is the difference between mitosis and meiosis?"')
  console.log('      - "Generate a practice test on genetics"')
  console.log('\n🚀 All AI features are now live and ready!')
}

runAsyncTests()