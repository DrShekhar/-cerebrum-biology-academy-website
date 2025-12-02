/**
 * WhatsApp Welcome Series Automation
 *
 * This module handles automated WhatsApp message sequences for new leads.
 * Uses Interakt API for WhatsApp Business messaging.
 */

import { prisma } from '@/lib/prisma'

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
    // Clean phone number - remove all non-digits and get last 10 digits
    const cleanPhone = phone.replace(/\D/g, '')
    const phoneNumber = cleanPhone.slice(-10)

    if (phoneNumber.length !== 10) {
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
        countryCode: '+91',
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
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    })

    if (!lead) {
      return { success: false, scheduled: 0, error: 'Lead not found' }
    }

    const leadData: LeadData = {
      id: lead.id,
      name: lead.name || '',
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

    // Schedule remaining messages in the series
    const scheduledMessages: string[] = []

    for (let i = 1; i < WELCOME_SERIES.length; i++) {
      const message = WELCOME_SERIES[i]
      const scheduledTime = new Date()
      scheduledTime.setHours(scheduledTime.getHours() + message.delayHours)

      // In production, you would use your task scheduler here
      // For now, we'll log the scheduled messages
      console.log(`WhatsApp: Scheduled ${message.templateName} for ${scheduledTime.toISOString()}`)
      scheduledMessages.push(message.templateName)
    }

    // Update lead with welcome series status
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        metadata: {
          ...((lead.metadata as object) || {}),
          welcomeSeriesStarted: new Date().toISOString(),
          welcomeSeriesMessages: scheduledMessages,
          firstMessageSent: immediateResult.success,
        },
      },
    })

    return {
      success: true,
      scheduled: scheduledMessages.length + (immediateResult.success ? 1 : 0),
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
    const lead = await prisma.lead.findUnique({
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
      name: lead.name || '',
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
      // Update lead metadata
      const metadata = (lead.metadata as Record<string, unknown>) || {}
      const sentMessages = (metadata.welcomeSeriesSent as string[]) || []
      sentMessages.push(`day${day}`)

      await prisma.lead.update({
        where: { id: leadId },
        data: {
          metadata: {
            ...metadata,
            welcomeSeriesSent: sentMessages,
            [`day${day}SentAt`]: new Date().toISOString(),
          },
        },
      })
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
    // Get leads that started welcome series but may need follow-up messages
    const leads = await prisma.lead.findMany({
      where: {
        metadata: {
          path: ['welcomeSeriesStarted'],
          not: undefined,
        },
      },
      take: 100,
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
