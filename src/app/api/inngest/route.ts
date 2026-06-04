import { serve } from 'inngest/next'
import { inngest } from '@/inngest/client'
import { paymentLinkReminders } from '@/inngest/functions/paymentLinkReminders'
import { leadOnboarding } from '@/inngest/functions/onboarding'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [paymentLinkReminders, leadOnboarding],
})
