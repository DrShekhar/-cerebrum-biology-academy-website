const twilio = require('twilio')
require('dotenv').config({ path: '.env.local' })

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

if (!accountSid || !authToken) {
  console.error('❌ Error: TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN must be set in .env.local')
  process.exit(1)
}

const client = twilio(accountSid, authToken)

async function createVerifyService() {
  try {
    console.log('🔍 Checking existing Verify services...\n')

    const services = await client.verify.v2.services.list({ limit: 20 })

    if (services.length > 0) {
      console.log('✅ Found existing Verify services:\n')
      services.forEach((service, index) => {
        console.log(`${index + 1}. Name: ${service.friendlyName}`)
        console.log(`   SID: ${service.sid}`)
        console.log(`   Status: ${service.status}`)
        console.log('')
      })

      console.log('📋 Use any of the above Service SIDs in your .env.local file')
      console.log('\nOr create a new service by running this script with --create flag')
      return
    }

    console.log('📝 No existing services found. Creating a new Verify service...\n')

    const service = await client.verify.v2.services.create({
      friendlyName: 'Cerebrum Biology Academy WhatsApp OTP',
    })

    console.log('✅ Verify service created successfully!\n')
    console.log('📋 Service Details:')
    console.log(`   Name: ${service.friendlyName}`)
    console.log(`   SID: ${service.sid}`)
    console.log(`   Status: ${service.status}`)
    console.log('\n🔑 Copy this SID to your .env.local file:')
    console.log(`   TWILIO_VERIFY_SERVICE_SID="${service.sid}"`)
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.error('\nPlease check your Twilio credentials are correct.')
  }
}

createVerifyService()
