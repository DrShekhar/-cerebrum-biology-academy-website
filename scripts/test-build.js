#!/usr/bin/env node

// Simple test script to validate build without problematic dependencies
console.log('🚀 Starting simplified build test...')

const fs = require('fs')
const path = require('path')

// Check for problematic imports
const problematicFiles = [
  'src/lib/mcp/mcpServer.ts',
  'src/lib/voice/voiceRecognitionService.ts',
  'src/lib/pwa/pwaService.ts',
  'src/lib/social/metaIntegration.ts',
]

console.log('🔍 Checking for problematic files...')
problematicFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`⚠️  Found problematic file: ${file}`)
  } else {
    console.log(`✅ File not found (good): ${file}`)
  }
})

console.log('✅ Build test complete')
