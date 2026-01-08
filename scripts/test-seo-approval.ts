/**
 * Test script for SEO Content Approval via WhatsApp
 * Run: npx tsx scripts/test-seo-approval.ts
 */

import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

import { sendForApproval } from '../src/lib/seo-marketing/approvalService'
import { getQueueItem } from '../src/lib/seo-marketing/queueService'

const QUEUE_ITEM_ID = 'cmk4qg3sl0001il7huizqdw2k'

async function main() {
  console.log('=== SEO Content Approval Test ===\n')

  // Check queue item status
  console.log('1. Checking queue item...')
  const item = await getQueueItem(QUEUE_ITEM_ID)

  if (!item) {
    console.log('   ERROR: Queue item not found')
    process.exit(1)
  }

  console.log(`   Status: ${item.status}`)
  console.log(`   Title: ${item.generatedTitle || item.topic}`)
  console.log(`   Type: ${item.type}`)

  // Send approval request
  console.log('\n2. Sending WhatsApp approval request...')
  const result = await sendForApproval(QUEUE_ITEM_ID)

  if (result) {
    console.log('   SUCCESS: Approval message sent!')
    console.log('   Check WhatsApp for the message.')
  } else {
    console.log('   FAILED: Could not send approval message')
  }

  // Check updated status
  console.log('\n3. Checking updated status...')
  const updatedItem = await getQueueItem(QUEUE_ITEM_ID)
  console.log(`   New Status: ${updatedItem?.status}`)
  console.log(`   Approval Sent At: ${updatedItem?.approvalSentAt}`)

  console.log('\n=== Test Complete ===')
}

main().catch((err) => {
  console.error('Test failed:', err)
  process.exit(1)
})
