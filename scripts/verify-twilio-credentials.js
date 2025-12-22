#!/usr/bin/env node
/**
 * Twilio Credentials Verification Script
 *
 * Run: node scripts/verify-twilio-credentials.js
 */

require('dotenv').config({ path: '.env.local' })

const twilio = require('twilio')

const REQUIRED_VARS = ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_VERIFY_SERVICE_SID']

async function verifyCredentials() {
  console.log('🔍 Verifying Twilio credentials...\n')

  // Check environment variables
  console.log('📋 Environment Variables:')
  let allSet = true
  for (const varName of REQUIRED_VARS) {
    const value = process.env[varName]
    if (value) {
      const masked = varName.includes('TOKEN')
        ? '***' + value.slice(-4)
        : value.substring(0, 10) + '...'
      console.log(`   ✅ ${varName}: ${masked}`)
    } else {
      console.log(`   ❌ ${varName}: NOT SET`)
      allSet = false
    }
  }

  if (process.env.TWILIO_PHONE_NUMBER) {
    console.log(`   ℹ️  TWILIO_PHONE_NUMBER: ${process.env.TWILIO_PHONE_NUMBER}`)
  }

  if (!allSet) {
    console.log('\n❌ Missing required environment variables. Please update .env.local\n')
    console.log('Get credentials from: https://console.twilio.com/')
    process.exit(1)
  }

  // Test API connection
  console.log('\n🔌 Testing API connection...')

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID

  try {
    const client = twilio(accountSid, authToken)

    // Verify account
    const account = await client.api.accounts(accountSid).fetch()
    console.log(`   ✅ Account: ${account.friendlyName}`)
    console.log(`   ✅ Status: ${account.status}`)

    // Verify service
    try {
      const service = await client.verify.v2.services(verifyServiceSid).fetch()
      console.log(`   ✅ Verify Service: ${service.friendlyName}`)
      console.log(`   ✅ Service SID: ${service.sid}`)
    } catch (verifyError) {
      console.log(`   ⚠️  Verify Service not found. Creating new one...`)

      // Create new verify service
      const newService = await client.verify.v2.services.create({
        friendlyName: 'Cerebrum Biology Academy OTP',
      })

      console.log(`   ✅ Created new Verify Service: ${newService.friendlyName}`)
      console.log(`   ⚠️  Update .env.local with:`)
      console.log(`      TWILIO_VERIFY_SERVICE_SID="${newService.sid}"`)
    }

    console.log('\n✅ Twilio credentials verified successfully!\n')
    console.log('You can now use Twilio for OTP verification.')
    console.log('Test endpoint: GET/POST http://localhost:3000/api/test/twilio\n')
  } catch (error) {
    console.log(`\n❌ Connection failed: ${error.message}`)

    if (error.code === 20003) {
      console.log('\n⚠️  Authentication error. Your Auth Token may be invalid or expired.')
      console.log('Steps to fix:')
      console.log('1. Go to https://console.twilio.com/')
      console.log('2. Copy the new Auth Token (click "Show" to reveal)')
      console.log('3. Update TWILIO_AUTH_TOKEN in .env.local')
      console.log('4. Run this script again\n')
    }

    process.exit(1)
  }
}

// Run verification
verifyCredentials()
