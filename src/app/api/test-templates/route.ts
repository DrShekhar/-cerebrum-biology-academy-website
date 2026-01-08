/**
 * Test endpoint to check which templates are approved on Interakt
 * DELETE AFTER TESTING
 */

import { NextResponse } from 'next/server'
import { sendTemplateMessage } from '@/lib/interakt'

const TEMPLATES_TO_TEST = [
  { name: 'welcome_message', vars: 1 },
  { name: 'otp_verification', vars: 1 },
  { name: 'demo_class_confirmation', vars: 3 },
  { name: 'payment_confirmation', vars: 6 },
  { name: 'new_lead_alert', vars: 6 },
  { name: 'class_reminder', vars: 6 },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== 'test123approval') {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const OWNER_PHONE = process.env.OWNER_WHATSAPP_NUMBER || '919999744334'
  const results: Record<string, { success: boolean; error?: string }> = {}

  for (const template of TEMPLATES_TO_TEST) {
    const testValues = Array(template.vars).fill('test')
    try {
      const result = await sendTemplateMessage({
        phone: OWNER_PHONE,
        templateName: template.name,
        bodyValues: testValues,
      })
      results[template.name] = { success: result.success, error: result.error }
    } catch (error) {
      results[template.name] = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
    // Small delay between requests
    await new Promise((r) => setTimeout(r, 500))
  }

  return NextResponse.json({
    templates: results,
    summary: {
      tested: TEMPLATES_TO_TEST.length,
      approved: Object.values(results).filter((r) => r.success).length,
    },
  })
}
