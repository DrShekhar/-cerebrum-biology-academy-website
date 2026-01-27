/**
 * Content Lead WhatsApp Follow-up Service
 * Sends immediate welcome messages and schedules nurturing sequence
 */

import { sendWhatsAppMessage, sendTemplateMessage, trackUser } from '@/lib/interakt'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'

const ADMIN_PHONE = process.env.ADMIN_WHATSAPP_NUMBER || '+918826444334'
const COUNSELOR_PHONE = process.env.COUNSELOR_WHATSAPP_NUMBER || '+918826444334'

interface ContentLeadParams {
  phone: string
  name?: string
  email?: string
  source: string
  discountCode?: string
  leadId: string
}

/**
 * Send immediate WhatsApp welcome message to content lead
 */
export async function sendContentLeadWelcome(params: ContentLeadParams) {
  const { phone, name, source, discountCode, leadId } = params
  const firstName = name?.split(' ')[0] || 'Student'

  try {
    // Track user in Interakt CRM
    await trackUser({
      phone,
      userId: leadId,
      traits: {
        name: name || 'Unknown',
        source,
        leadType: 'content_lead',
        capturedAt: new Date().toISOString(),
      },
    })

    // Determine message based on source
    let message: string

    if (source.includes('exit_intent') || discountCode) {
      message = `🎉 Hi ${firstName}!

Thanks for your interest in Cerebrum Biology Academy!

Your exclusive *20% discount code*: *${discountCode}*
✅ Valid for 7 days on any course

📚 *Why students love us:*
• Expert faculty from AIIMS/JIPMER
• 95%+ success rate in NEET
• Personal mentorship

🎯 *Ready to start?*
Reply *DEMO* to book a FREE trial class
Reply *COURSES* to see our programs
Reply *CALL* to speak with a counselor

We're here to help you crack NEET! 💪`
    } else if (source.includes('catalog') || source.includes('study_plan')) {
      message = `📚 Hi ${firstName}!

Thanks for downloading from Cerebrum Biology Academy!

Your study material is on its way to your email.

🎯 *Want personalized guidance?*
Our expert faculty can help you create a winning NEET strategy!

Reply *DEMO* - Book FREE trial class
Reply *CALL* - Talk to counselor now

📞 Or call us directly: +91-88264-44334

Let's crack NEET together! 🏆`
    } else {
      message = `👋 Hi ${firstName}!

Thanks for connecting with Cerebrum Biology Academy - Delhi NCR's #1 NEET Biology Institute!

🎯 *How can we help you today?*

Reply with:
• *DEMO* - Book FREE trial class
• *COURSES* - View our programs
• *FEES* - Check pricing
• *CALL* - Talk to counselor

Or simply type your query and we'll help!

📞 Helpline: +91-88264-44334`
    }

    // Send welcome message
    const result = await sendWhatsAppMessage({
      phone,
      message,
    })

    if (result.success) {
      logger.info('Content lead welcome message sent', {
        service: 'content-lead-followup',
        leadId,
        phone,
        source,
      })

      // Update lead with message sent status
      try {
        await prisma.content_leads.update({
          where: { id: leadId },
          data: {
            welcomeWhatsAppSent: true,
            lastContactedAt: new Date(),
          },
        })
      } catch (e) {
        // Ignore if update fails
      }
    }

    return result
  } catch (error) {
    logger.error('Failed to send content lead welcome', {
      service: 'content-lead-followup',
      error,
      leadId,
      phone,
    })
    return { success: false, error: String(error) }
  }
}

/**
 * Notify admin/counselor about new content lead
 */
export async function notifyAdminNewContentLead(params: ContentLeadParams) {
  const { phone, name, email, source, leadId } = params

  try {
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

    const message = `🔔 *NEW LEAD ALERT*

📱 Phone: ${phone}
👤 Name: ${name || 'Not provided'}
📧 Email: ${email || 'Not provided'}
📍 Source: ${source}
🆔 Lead ID: ${leadId.slice(0, 12)}
⏰ Time: ${timestamp}

*ACTION REQUIRED:*
Call within 5 minutes for best conversion!

Quick replies:
• Reply CALLED to mark as contacted
• Reply LATER to schedule follow-up`

    // Send to admin
    const adminResult = await sendWhatsAppMessage({
      phone: ADMIN_PHONE,
      message,
    })

    // Also send to counselor if different
    if (COUNSELOR_PHONE !== ADMIN_PHONE) {
      await sendWhatsAppMessage({
        phone: COUNSELOR_PHONE,
        message,
      })
    }

    logger.info('Admin notified of new content lead', {
      service: 'content-lead-followup',
      leadId,
      adminNotified: adminResult.success,
    })

    return adminResult
  } catch (error) {
    logger.error('Failed to notify admin of content lead', {
      service: 'content-lead-followup',
      error,
      leadId,
    })
    return { success: false, error: String(error) }
  }
}

/**
 * Schedule nurturing sequence for content lead
 * Day 1: Welcome (immediate) - handled above
 * Day 2: Value content
 * Day 3: Social proof
 * Day 5: Urgency + offer
 */
export async function scheduleNurturingSequence(params: ContentLeadParams) {
  const { phone, name, leadId, source } = params

  try {
    // Check if nurturing sequence already exists
    const existingSequence = await prisma.whatsapp_nurturing.findFirst({
      where: { phone, status: 'ACTIVE' },
    })

    if (existingSequence) {
      logger.info('Nurturing sequence already exists', { leadId, phone })
      return { success: true, message: 'Sequence already exists' }
    }

    // Create nurturing sequence record
    await prisma.whatsapp_nurturing.create({
      data: {
        id: `nurture_${leadId}`,
        phone,
        name: name || 'Student',
        leadId,
        source,
        status: 'ACTIVE',
        currentStep: 1,
        nextMessageAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        totalSteps: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    logger.info('Nurturing sequence scheduled', {
      service: 'content-lead-followup',
      leadId,
      phone,
      nextMessage: 'Day 2',
    })

    return { success: true, message: 'Nurturing sequence scheduled' }
  } catch (error) {
    logger.error('Failed to schedule nurturing sequence', {
      service: 'content-lead-followup',
      error,
      leadId,
    })
    return { success: false, error: String(error) }
  }
}

/**
 * Process nurturing sequence messages (called by cron)
 */
export async function processNurturingMessages() {
  try {
    const pendingMessages = await prisma.whatsapp_nurturing.findMany({
      where: {
        status: 'ACTIVE',
        nextMessageAt: { lte: new Date() },
      },
      take: 50,
    })

    logger.info(`Processing ${pendingMessages.length} nurturing messages`)

    for (const sequence of pendingMessages) {
      await sendNurturingMessage(sequence)
    }

    return { success: true, processed: pendingMessages.length }
  } catch (error) {
    logger.error('Failed to process nurturing messages', { error })
    return { success: false, error: String(error) }
  }
}

async function sendNurturingMessage(sequence: {
  id: string
  phone: string
  name: string
  currentStep: number
  totalSteps: number
}) {
  const { id, phone, name, currentStep } = sequence
  const firstName = name.split(' ')[0]

  const messages: Record<number, string> = {
    2: `📖 Hi ${firstName}!

Quick tip from our NEET toppers:

*"The secret to Biology is not memorization - it's understanding concepts visually."*

🎥 That's why our classes use:
• 3D animations for complex topics
• Mnemonics that actually stick
• Real NEET question practice

Ready to experience the difference?
Reply *DEMO* for a FREE trial class!`,

    3: `🏆 Hi ${firstName}!

Meet Anjali - scored 680+ in NEET Biology after joining Cerebrum!

*"Dr. Shekhar's teaching method made Cell Biology so easy. I went from 45% to 95% in just 3 months!"*

📊 Our results speak:
• 95%+ students improve by 40+ marks
• 50+ students in top medical colleges
• Personal mentorship for every student

Your success story is waiting!
Reply *DEMO* to start your journey 🚀`,

    4: `⚡ Hi ${firstName}!

*FINAL REMINDER*

🎁 Your exclusive offer expires in 48 hours:
• 20% OFF on any course
• FREE study materials worth ₹5000
• Personal mentor assignment

Don't let this opportunity slip away!

📞 Call NOW: +91-88264-44334
Or reply *CALL* and we'll call you!

Seats are filling fast for the new batch! 🔥`,
  }

  const message = messages[currentStep]
  if (!message) {
    // Sequence complete
    await prisma.whatsapp_nurturing.update({
      where: { id },
      data: { status: 'COMPLETED', updatedAt: new Date() },
    })
    return
  }

  try {
    const result = await sendWhatsAppMessage({ phone, message })

    if (result.success) {
      // Calculate next message time
      const nextStep = currentStep + 1
      const daysUntilNext = nextStep === 3 ? 2 : nextStep === 4 ? 2 : 1
      const nextMessageAt = new Date(Date.now() + daysUntilNext * 24 * 60 * 60 * 1000)

      await prisma.whatsapp_nurturing.update({
        where: { id },
        data: {
          currentStep: nextStep,
          nextMessageAt: nextStep <= 4 ? nextMessageAt : null,
          status: nextStep > 4 ? 'COMPLETED' : 'ACTIVE',
          updatedAt: new Date(),
        },
      })

      logger.info('Nurturing message sent', {
        service: 'nurturing',
        phone,
        step: currentStep,
        nextStep,
      })
    }
  } catch (error) {
    logger.error('Failed to send nurturing message', {
      service: 'nurturing',
      error,
      phone,
      step: currentStep,
    })
  }
}

/**
 * Full content lead processing - call this from API routes
 */
export async function processContentLead(params: ContentLeadParams) {
  const results = {
    welcome: { success: false },
    adminNotify: { success: false },
    nurturing: { success: false },
  }

  // 1. Send welcome message to lead
  results.welcome = await sendContentLeadWelcome(params)

  // 2. Notify admin/counselor
  results.adminNotify = await notifyAdminNewContentLead(params)

  // 3. Schedule nurturing sequence
  results.nurturing = await scheduleNurturingSequence(params)

  return results
}
