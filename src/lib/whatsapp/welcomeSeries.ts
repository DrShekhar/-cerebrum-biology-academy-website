/**
 * WhatsApp Welcome Series Automation
 *
 * This module handles automated WhatsApp message sequences for new leads.
 * Uses Interakt API for WhatsApp Business messaging.
 */

import { prisma } from '@/lib/prisma'
import { formatPhoneNumber } from '@/lib/interakt'

interface WelcomeSeriesMessage {
  day: number
  templateName: string
  bodyValues: (leadData: LeadData) => string[]
  delayHours: number
}

interface LeadData {
  id: string
  name: string
  phone: string
  email: string
  source: string
  stage: string
}

// Welcome Series Templates - Configure in Interakt dashboard
const WELCOME_SERIES: WelcomeSeriesMessage[] = [
  {
    day: 0,
    templateName: 'welcome_lead',
    bodyValues: (lead) => [
      lead.name || 'Student',
      '20%', // Discount percentage
      'https://cerebrumbiologyacademy.com/demo-booking',
    ],
    delayHours: 0, // Immediate
  },
  {
    day: 1,
    templateName: 'welcome_day1_tips',
    bodyValues: (lead) => [
      lead.name || 'Student',
      'Download our free NEET Biology study material',
      'https://cerebrumbiologyacademy.com/resources/free',
    ],
    delayHours: 24,
  },
  {
    day: 3,
    templateName: 'welcome_day3_demo',
    bodyValues: (lead) => [
      lead.name || 'Student',
      'Book a free demo class with Dr. Shekhar',
      'https://cerebrumbiologyacademy.com/demo-booking',
    ],
    delayHours: 72,
  },
  {
    day: 7,
    templateName: 'welcome_day7_offer',
    bodyValues: (lead) => [
      lead.name || 'Student',
      'Last chance: 20% off expires soon!',
      'https://cerebrumbiologyacademy.com/courses',
    ],
    delayHours: 168,
  },
]

/**
 * Send a single WhatsApp message via Interakt API
 */
export async function sendWhatsAppMessage(
  phone: string,
  templateName: string,
  bodyValues: string[],
  callbackData?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!process.env.INTERAKT_API_KEY) {
    console.log('WhatsApp: Interakt API key not configured')
    return { success: false, error: 'not_configured' }
  }

  try {
    // Detect the real country code (NRI students in UAE/UK/US/etc. must NOT be
    // forced to +91) via the shared formatter instead of a hardcoded +91.
    const { countryCode, phoneNumber } = formatPhoneNumber(phone)

    if (phoneNumber.length < 7) {
      console.error('WhatsApp: Invalid phone number format:', phone)
      return { success: false, error: 'invalid_phone' }
    }

    const response = await fetch('https://api.interakt.ai/v1/public/message/', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.INTERAKT_API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryCode,
        phoneNumber: phoneNumber,
        callbackData: callbackData || `welcome_series_${Date.now()}`,
        type: 'Template',
        template: {
          name: templateName,
          languageCode: 'en',
          bodyValues: bodyValues,
        },
      }),
    })

    const result = await response.json()

    if (response.ok) {
      console.log('WhatsApp: Message sent successfully:', result.result?.messageId)
      return { success: true, messageId: result.result?.messageId }
    } else {
      console.error('WhatsApp: Interakt API error:', result)
      return { success: false, error: JSON.stringify(result) }
    }
  } catch (error) {
    console.error('WhatsApp: Send error:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Start the welcome series for a new lead
 */
export async function startWelcomeSeries(leadId: string): Promise<{
  success: boolean
  scheduled: number
  error?: string
}> {
  try {
    const lead = await prisma.leads.findUnique({
      where: { id: leadId },
    })

    if (!lead) {
      return { success: false, scheduled: 0, error: 'Lead not found' }
    }

    const leadData: LeadData = {
      id: lead.id,
      name: lead.studentName || '',
      phone: lead.phone,
      email: lead.email,
      source: lead.source || '',
      stage: lead.stage || 'NEW',
    }

    // Send immediate welcome message (Day 0)
    const firstMessage = WELCOME_SERIES[0]
    const immediateResult = await sendWhatsAppMessage(
      lead.phone,
      firstMessage.templateName,
      firstMessage.bodyValues(leadData),
      `welcome_series_${lead.id}_day0`
    )

    // Persist series state on the lead so the cron-driven queue processor can
    // send the day-1/3/7 messages on schedule (serverless — no setTimeout).
    const existingMetadata = (lead.metadata as Record<string, unknown>) || {}
    await prisma.leads.update({
      where: { id: lead.id },
      data: {
        metadata: {
          ...existingMetadata,
          welcomeSeriesStarted: new Date().toISOString(),
          welcomeSeriesSent: immediateResult.success ? ['day0'] : [],
        },
        updatedAt: new Date(),
      },
    })

    const remaining = WELCOME_SERIES.length - 1

    return {
      success: true,
      scheduled: remaining + (immediateResult.success ? 1 : 0),
    }
  } catch (error) {
    console.error('WhatsApp: Welcome series error:', error)
    return { success: false, scheduled: 0, error: String(error) }
  }
}

/**
 * Send a specific message in the welcome series
 */
export async function sendWelcomeSeriesMessage(
  leadId: string,
  day: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const lead = await prisma.leads.findUnique({
      where: { id: leadId },
    })

    if (!lead) {
      return { success: false, error: 'Lead not found' }
    }

    const message = WELCOME_SERIES.find((m) => m.day === day)
    if (!message) {
      return { success: false, error: `No message configured for day ${day}` }
    }

    const leadData: LeadData = {
      id: lead.id,
      name: lead.studentName || '',
      phone: lead.phone,
      email: lead.email,
      source: lead.source || '',
      stage: lead.stage || 'NEW',
    }

    const result = await sendWhatsAppMessage(
      lead.phone,
      message.templateName,
      message.bodyValues(leadData),
      `welcome_series_${lead.id}_day${day}`
    )

    if (result.success) {
      const metadata = (lead.metadata as Record<string, unknown>) || {}
      const sent = Array.isArray(metadata.welcomeSeriesSent)
        ? (metadata.welcomeSeriesSent as string[])
        : []
      const dayKey = `day${day}`
      if (!sent.includes(dayKey)) {
        await prisma.leads.update({
          where: { id: lead.id },
          data: {
            metadata: { ...metadata, welcomeSeriesSent: [...sent, dayKey] },
            updatedAt: new Date(),
          },
        })
      }
    }

    return result
  } catch (error) {
    console.error('WhatsApp: Welcome series message error:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Check which leads need welcome series messages sent
 */
export async function processWelcomeSeriesQueue(): Promise<{
  processed: number
  sent: number
  errors: number
}> {
  const stats = { processed: 0, sent: 0, errors: 0 }

  try {
    // The series spans 7 days; look at recent leads only and read the state
    // persisted by startWelcomeSeries. In-code filtering avoids fragile JSON
    // path queries at this volume.
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    const leads = await prisma.leads.findMany({
      where: { createdAt: { gte: tenDaysAgo } },
      take: 500,
      orderBy: { createdAt: 'desc' },
    })

    for (const lead of leads) {
      const metadata = (lead.metadata as Record<string, unknown>) || {}
      const startDate = metadata.welcomeSeriesStarted as string

      if (!startDate) continue

      const daysSinceStart = Math.floor(
        (Date.now() - new Date(startDate).getTime()) / (24 * 60 * 60 * 1000)
      )

      const sentMessages = (metadata.welcomeSeriesSent as string[]) || []

      for (const message of WELCOME_SERIES) {
        const dayKey = `day${message.day}`

        if (message.day <= daysSinceStart && !sentMessages.includes(dayKey)) {
          stats.processed++

          const result = await sendWelcomeSeriesMessage(lead.id, message.day)

          if (result.success) {
            stats.sent++
          } else {
            stats.errors++
          }

          // Add small delay between messages to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      }
    }
  } catch (error) {
    console.error('WhatsApp: Process queue error:', error)
  }

  return stats
}
