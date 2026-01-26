/**
 * WhatsApp Drip Sequence Service
 *
 * Handles automated WhatsApp messaging sequences:
 * - Demo reminders (24h and 1h before scheduled time)
 * - Behavioral triggers (form submit → immediate follow-up)
 * - Multi-step drip campaigns
 * - Abandoned cart recovery
 *
 * Uses Interakt WhatsApp Business API
 */

import { prisma } from '@/lib/prisma'
import { sendWhatsAppMessage, trackEvent } from '@/lib/interakt'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { LeadStage } from '@/generated/prisma'

// Drip sequence types
export type DripSequenceType =
  | 'WELCOME_SEQUENCE'
  | 'DEMO_REMINDER_SEQUENCE'
  | 'POST_DEMO_SEQUENCE'
  | 'ENROLLMENT_SEQUENCE'
  | 'PAYMENT_REMINDER_SEQUENCE'
  | 'REENGAGEMENT_SEQUENCE'
  | 'ABANDONED_INQUIRY_SEQUENCE'

// Drip step configuration
interface DripStep {
  id: string
  name: string
  delayMinutes: number
  templateName?: string
  customMessage?: (lead: LeadData) => string
  condition?: (lead: LeadData) => boolean
  skipIfStageChanged?: boolean
}

// Lead data interface
interface LeadData {
  id: string
  name: string
  phone: string
  email?: string
  courseInterest: string
  stage: LeadStage
  demoDate?: Date
  source: string
  createdAt: Date
}

// Demo reminder messages
const DEMO_REMINDER_MESSAGES = {
  reminder_24h: (lead: LeadData, demoDate: Date) => {
    const dateStr = demoDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    const timeStr = demoDate.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })
    return `🎓 Demo Class Reminder!

Hi ${lead.name}!

Your FREE NEET Biology demo class is scheduled for tomorrow:

📅 Date: ${dateStr}
⏰ Time: ${timeStr}
📚 Course: ${lead.courseInterest}

Please join on time to get the full learning experience!

📞 Need to reschedule? Reply "RESCHEDULE"

See you tomorrow! 🌟
- Team Cerebrum Biology Academy`
  },

  reminder_1h: (lead: LeadData, demoDate: Date) => {
    const timeStr = demoDate.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })
    return `⏰ Starting in 1 hour!

Hi ${lead.name}!

Your NEET Biology demo class starts at ${timeStr}!

✅ Be ready 5 minutes before
✅ Keep pen & paper handy
✅ Join from a quiet place

🔗 Join Link: Will be shared shortly

Can't make it? Reply "RESCHEDULE" right now!

- Team Cerebrum Biology Academy`
  },

  reminder_15m: (lead: LeadData, demoDate: Date) => {
    return `🚀 Starting in 15 minutes!

${lead.name}, your demo class is about to begin!

Join now and experience:
✨ Expert AIIMS faculty teaching
✨ Interactive Q&A session
✨ Free study material

Don't miss this opportunity!

- Team Cerebrum Biology Academy`
  },
}

// Welcome sequence messages
const WELCOME_SEQUENCE_MESSAGES = {
  welcome_immediate: (lead: LeadData) =>
    `👋 Welcome to Cerebrum Biology Academy!

Hi ${lead.name}!

Thank you for your interest in ${lead.courseInterest}.

I'm your personal NEET Biology counselor. I'm here to help you:

✅ Book a FREE demo class
✅ Answer your questions
✅ Guide your NEET preparation

Reply "DEMO" to book your free demo class now!

- Cerebrum Biology Academy Team`,

  course_info_2h: (lead: LeadData) =>
    `📚 About Our ${lead.courseInterest} Course

Hi ${lead.name}!

Here's what makes our program special:

🎯 85% of students score 300+ in Biology
👩‍🏫 Faculty from AIIMS & top medical colleges
📱 24/7 doubt resolution on WhatsApp
📝 500+ practice questions with solutions
🎥 Recorded classes for revision

Ready to start your journey?
Reply "DEMO" for a FREE demo class!`,

  social_proof_24h: (lead: LeadData) =>
    `⭐ Student Success Stories

${lead.name}, our students are cracking NEET!

Recent results:
🏆 Rahul - AIR 156 (Biology: 340/360)
🏆 Priya - AIR 312 (Biology: 335/360)
🏆 Amit - AIR 589 (Biology: 320/360)

"Cerebrum's teaching methodology is unique. Complex topics became so simple!" - Sneha, MBBS student

Want to be our next success story?

Reply "DEMO" to book now!
Limited seats available 🔥`,

  urgency_72h: (lead: LeadData) =>
    `⏰ ${lead.name}, don't miss out!

Our next batch starts soon and seats are filling fast!

🎁 Early bird benefits:
• 15% discount on enrollment
• Free study material worth ₹5,000
• Priority doubt resolution

Only 8 seats remaining!

Reply "DEMO" for your free demo
Or call: ${CONTACT_INFO.phone.display.primary}

Offer valid for 48 hours only!`,
}

// Post-demo sequence messages
const POST_DEMO_SEQUENCE_MESSAGES = {
  feedback_1h: (lead: LeadData) =>
    `🎓 How was your demo class?

Hi ${lead.name}!

Thank you for attending today's demo class!

We'd love your quick feedback:
1️⃣ Amazing - I want to enroll!
2️⃣ Good - Need more info
3️⃣ Need to think about it

Just reply with 1, 2, or 3!

Also, we've sent you a free PDF of today's class notes. Check your email!`,

  enrollment_offer_24h: (lead: LeadData) =>
    `🎁 Exclusive Demo Attendee Offer!

Hi ${lead.name}!

As a demo class attendee, you qualify for our EXCLUSIVE offer:

✅ 10% Early Bird Discount
✅ Free Study Material (₹5,000 value)
✅ 1-on-1 Doubt Resolution Sessions
✅ Priority Batch Selection

Valid for 72 hours only!

Ready to join? Reply "ENROLL"
Or call: ${CONTACT_INFO.phone.display.primary}`,

  last_chance_72h: (lead: LeadData) =>
    `⏰ Last Chance, ${lead.name}!

Your exclusive demo attendee discount expires in 24 hours!

Don't lose:
❌ 10% OFF on enrollment
❌ Free study materials
❌ Priority batch selection

Students who enrolled after their demo are already seeing 50+ marks improvement!

Reply "ENROLL" or visit:
cerebrumbiologyacademy.com/enroll

Need help? Call: ${CONTACT_INFO.phone.display.primary}`,
}

// Behavioral trigger messages
const BEHAVIORAL_TRIGGER_MESSAGES = {
  form_submit: (lead: LeadData) =>
    `✅ Received! We're on it!

Hi ${lead.name}!

Thank you for reaching out to Cerebrum Biology Academy!

Your inquiry about ${lead.courseInterest} has been received.

📞 A counselor will contact you within 2 hours.

Meanwhile, you can:
• Reply "DEMO" to book a free demo class
• Reply "FEES" to know about pricing
• Reply "COURSES" to explore all programs

We're excited to help you crack NEET! 🎯

- Team Cerebrum Biology Academy`,

  demo_booked: (lead: LeadData, demoDate?: Date) => {
    const dateStr = demoDate?.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    const timeStr = demoDate?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })
    return `🎉 Demo Booked Successfully!

Hi ${lead.name}!

Your FREE demo class is confirmed!

📅 Date: ${dateStr || 'To be scheduled'}
⏰ Time: ${timeStr || 'To be confirmed'}
📚 Course: ${lead.courseInterest}

What to expect:
✨ 45-min live interactive session
✨ Expert AIIMS faculty
✨ Q&A opportunity
✨ Free class notes

We'll remind you 24h and 1h before!

Need to reschedule? Reply "RESCHEDULE"

See you soon! 🌟`
  },

  payment_initiated: (lead: LeadData) =>
    `💳 Payment in Progress

Hi ${lead.name}!

We noticed you started a payment. If you faced any issues, we're here to help!

Common solutions:
• Try a different payment method
• Use UPI for faster processing
• Contact us for EMI options

Need assistance?
📞 Call: ${CONTACT_INFO.phone.display.primary}
💬 Reply here for help

Your seat is reserved for 30 minutes!`,

  page_viewed: (lead: LeadData, pageName: string) =>
    `👀 Hi ${lead.name}!

We noticed you were checking out our ${pageName}.

Want me to help you with:
1️⃣ Course details & curriculum
2️⃣ Fee structure & EMI options
3️⃣ Book a free demo class

Just reply with 1, 2, or 3!

Or call us: ${CONTACT_INFO.phone.display.primary}`,
}

/**
 * Helper function to parse preferredDate + preferredTime strings into a Date object
 * preferredDate format: "2026-01-15" or "January 15, 2026"
 * preferredTime format: "10:00 AM" or "14:00"
 */
function parseDemoDateTime(
  preferredDate: string | null,
  preferredTime: string | null
): Date | undefined {
  if (!preferredDate) return undefined

  try {
    // Parse the date
    const datePart = new Date(preferredDate)
    if (isNaN(datePart.getTime())) return undefined

    // Parse the time if provided
    if (preferredTime) {
      const timeMatch = preferredTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i)
      if (timeMatch) {
        let hours = parseInt(timeMatch[1], 10)
        const minutes = parseInt(timeMatch[2], 10)
        const period = timeMatch[3]?.toUpperCase()

        if (period === 'PM' && hours < 12) hours += 12
        if (period === 'AM' && hours === 12) hours = 0

        datePart.setHours(hours, minutes, 0, 0)
      }
    }

    return datePart
  } catch {
    return undefined
  }
}

// Drip sequence definitions
const DRIP_SEQUENCES: Record<DripSequenceType, DripStep[]> = {
  WELCOME_SEQUENCE: [
    {
      id: 'welcome_1',
      name: 'Welcome Message',
      delayMinutes: 0,
      customMessage: WELCOME_SEQUENCE_MESSAGES.welcome_immediate,
    },
    {
      id: 'welcome_2',
      name: 'Course Information',
      delayMinutes: 120, // 2 hours
      customMessage: WELCOME_SEQUENCE_MESSAGES.course_info_2h,
      skipIfStageChanged: true,
    },
    {
      id: 'welcome_3',
      name: 'Social Proof',
      delayMinutes: 1440, // 24 hours
      customMessage: WELCOME_SEQUENCE_MESSAGES.social_proof_24h,
      condition: (lead) => lead.stage === 'NEW_LEAD',
    },
    {
      id: 'welcome_4',
      name: 'Urgency & Offer',
      delayMinutes: 4320, // 72 hours
      customMessage: WELCOME_SEQUENCE_MESSAGES.urgency_72h,
      condition: (lead) => lead.stage === 'NEW_LEAD',
    },
  ],

  DEMO_REMINDER_SEQUENCE: [
    {
      id: 'demo_reminder_24h',
      name: '24 Hour Reminder',
      delayMinutes: -1440, // 24 hours before demo
      templateName: 'class_reminder', // Use approved template
    },
    {
      id: 'demo_reminder_1h',
      name: '1 Hour Reminder',
      delayMinutes: -60, // 1 hour before demo
      templateName: 'class_reminder', // Use approved template
    },
  ],

  POST_DEMO_SEQUENCE: [
    {
      id: 'post_demo_1',
      name: 'Demo Feedback',
      delayMinutes: 60, // 1 hour after
      customMessage: POST_DEMO_SEQUENCE_MESSAGES.feedback_1h,
    },
    {
      id: 'post_demo_2',
      name: 'Enrollment Offer',
      delayMinutes: 1440, // 24 hours after
      customMessage: POST_DEMO_SEQUENCE_MESSAGES.enrollment_offer_24h,
      condition: (lead) => lead.stage === 'DEMO_COMPLETED',
    },
    {
      id: 'post_demo_3',
      name: 'Last Chance',
      delayMinutes: 4320, // 72 hours after
      customMessage: POST_DEMO_SEQUENCE_MESSAGES.last_chance_72h,
      condition: (lead) => lead.stage === 'DEMO_COMPLETED' || lead.stage === 'OFFER_SENT',
    },
  ],

  ENROLLMENT_SEQUENCE: [
    {
      id: 'enroll_1',
      name: 'Welcome to Family',
      delayMinutes: 0,
      templateName: 'welcome_message',
    },
    {
      id: 'enroll_2',
      name: 'Getting Started Guide',
      delayMinutes: 60,
      customMessage: (lead) =>
        `🎉 Welcome to the Cerebrum Family, ${lead.name}!

Here's how to get started:

1️⃣ Download our app (link in bio)
2️⃣ Join your batch WhatsApp group
3️⃣ Access your study materials

Your first class details will be shared soon!

Questions? We're here 24/7!

Let's crack NEET together! 💪`,
    },
  ],

  PAYMENT_REMINDER_SEQUENCE: [
    {
      id: 'payment_1',
      name: 'Payment Reminder 24h',
      delayMinutes: 1440, // 24 hours
      templateName: 'payment_confirmation',
    },
    {
      id: 'payment_2',
      name: 'Payment Urgent 72h',
      delayMinutes: 4320, // 72 hours
      customMessage: (lead) =>
        `⚠️ Action Required, ${lead.name}!

Your enrollment is pending payment.

Complete now to secure:
✅ Your batch seat (only 5 remaining!)
✅ Early bird discount (expires soon)
✅ Bonus study material

Payment link: cerebrumbiologyacademy.com/pay

Need EMI options? Call: ${CONTACT_INFO.phone.display.primary}`,
    },
  ],

  REENGAGEMENT_SEQUENCE: [
    {
      id: 'reengage_1',
      name: 'We Miss You',
      delayMinutes: 10080, // 1 week
      customMessage: (lead) =>
        `👋 Hi ${lead.name}! Long time no see!

We noticed you were interested in ${lead.courseInterest}.

NEET 2026 is approaching - it's the perfect time to start!

🎁 Special comeback offer: 20% OFF for returning students!

Reply "YES" to learn more, or "CALL" for a callback!`,
    },
    {
      id: 'reengage_2',
      name: 'Last Chance Offer',
      delayMinutes: 20160, // 2 weeks
      customMessage: (lead) =>
        `🔔 Final Reminder, ${lead.name}!

Your 20% comeback discount expires in 48 hours.

Our current batch students are already scoring 50+ marks higher!

Don't let this opportunity slip away.

Reply "ENROLL" or call: ${CONTACT_INFO.phone.display.primary}`,
    },
  ],

  ABANDONED_INQUIRY_SEQUENCE: [
    {
      id: 'abandoned_1',
      name: 'Follow Up',
      delayMinutes: 30, // 30 minutes
      customMessage: (lead) =>
        `Hi ${lead.name}! 👋

Just checking - did you have any questions about ${lead.courseInterest}?

I'm here to help with:
• Course details & schedule
• Fee structure & payment options
• Demo class booking

Reply anytime - I'm always here!`,
    },
    {
      id: 'abandoned_2',
      name: 'Quick Demo Offer',
      delayMinutes: 180, // 3 hours
      customMessage: (lead) =>
        `${lead.name}, quick question! 🤔

Would you like to experience our teaching before deciding?

Book a FREE 45-min demo class:
• No commitment required
• See our teaching style
• Get your doubts cleared

Reply "DEMO" to book now!`,
    },
  ],
}

export class WhatsAppDripService {
  /**
   * Start a drip sequence for a lead
   */
  async startSequence(
    leadId: string,
    sequenceType: DripSequenceType,
    triggerData?: Record<string, any>
  ): Promise<{ success: boolean; scheduledCount: number }> {
    try {
      const lead = await prisma.leads.findUnique({
        where: { id: leadId },
        include: {
          demo_bookings: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      })

      if (!lead) {
        console.error(`Lead not found: ${leadId}`)
        return { success: false, scheduledCount: 0 }
      }

      const latestDemo = lead.demo_bookings?.[0]
      const demoDate = latestDemo
        ? parseDemoDateTime(latestDemo.preferredDate, latestDemo.preferredTime)
        : undefined

      const leadData: LeadData = {
        id: lead.id,
        name: lead.studentName,
        phone: lead.phone,
        email: lead.email || undefined,
        courseInterest: lead.courseInterest,
        stage: lead.stage,
        demoDate,
        source: lead.source,
        createdAt: lead.createdAt,
      }

      const sequence = DRIP_SEQUENCES[sequenceType]
      if (!sequence) {
        console.error(`Unknown sequence type: ${sequenceType}`)
        return { success: false, scheduledCount: 0 }
      }

      // Cancel any existing pending messages for this sequence
      await prisma.followup_queue.updateMany({
        where: {
          leadId,
          status: 'PENDING',
          metadata: {
            path: ['sequenceType'],
            equals: sequenceType,
          },
        },
        data: {
          status: 'CANCELLED',
          updatedAt: new Date(),
        },
      })

      // Get or create a rule for this sequence
      let rule = await prisma.followup_rules.findFirst({
        where: { name: `drip_${sequenceType}`, isActive: true },
      })

      if (!rule) {
        rule = await prisma.followup_rules.create({
          data: {
            name: `drip_${sequenceType}`,
            description: `WhatsApp drip sequence: ${sequenceType}`,
            isActive: true,
            triggerType: 'STAGE_CHANGE',
            triggerConditions: { sequenceType },
            delayMinutes: 0,
            actionType: 'WHATSAPP',
            createdById: 'system',
            updatedAt: new Date(),
          },
        })
      }

      let scheduledCount = 0
      const baseTime = triggerData?.baseTime ? new Date(triggerData.baseTime) : new Date()

      for (const step of sequence) {
        // Check condition
        if (step.condition && !step.condition(leadData)) {
          continue
        }

        let scheduledFor: Date

        // Handle negative delays (before an event like demo)
        if (step.delayMinutes < 0 && leadData.demoDate) {
          scheduledFor = new Date(leadData.demoDate.getTime() + step.delayMinutes * 60 * 1000)
          // Skip if the time has already passed
          if (scheduledFor < new Date()) {
            continue
          }
        } else {
          scheduledFor = new Date(baseTime.getTime() + step.delayMinutes * 60 * 1000)
        }

        // Execute immediate actions
        if (step.delayMinutes === 0) {
          await this.executeStep(leadData, step)
          scheduledCount++
          continue
        }

        // Schedule future actions
        await prisma.followup_queue.create({
          data: {
            leadId,
            ruleId: rule.id,
            scheduledFor,
            status: 'PENDING',
            metadata: {
              sequenceType,
              stepId: step.id,
              stepName: step.name,
              templateName: step.templateName,
              hasCustomMessage: !!step.customMessage,
              skipIfStageChanged: step.skipIfStageChanged,
              originalStage: lead.stage,
              triggerData,
            },
            updatedAt: new Date(),
          },
        })

        scheduledCount++
      }

      // Track sequence start
      await trackEvent({
        phone: lead.phone,
        eventName: 'drip_sequence_started',
        eventData: {
          sequenceType,
          scheduledCount,
          leadStage: lead.stage,
        },
      })

      console.log(
        `Started ${sequenceType} sequence for lead ${leadId}: ${scheduledCount} steps scheduled`
      )

      return { success: true, scheduledCount }
    } catch (error) {
      console.error('Error starting drip sequence:', error)
      return { success: false, scheduledCount: 0 }
    }
  }

  /**
   * Execute a drip step immediately
   */
  private async executeStep(lead: LeadData, step: DripStep): Promise<boolean> {
    try {
      let success = false
      let content = ''

      if (step.templateName) {
        // Use Interakt template
        const result = await sendWhatsAppMessage({
          phone: lead.phone,
          templateName: step.templateName,
          templateParams: {
            '1': lead.name,
            '2': lead.courseInterest,
          },
        })
        success = result.success
        content = `Template: ${step.templateName}`
      } else if (step.customMessage) {
        // Use custom message (within 24hr session window)
        const message = step.customMessage(lead)
        const result = await sendWhatsAppMessage({
          phone: lead.phone,
          message,
        })
        success = result.success
        content = message.substring(0, 100) + '...'
      }

      // Record in history
      await prisma.followup_history.create({
        data: {
          leadId: lead.id,
          action: 'WHATSAPP',
          channel: 'WHATSAPP',
          content,
          status: success ? 'SENT' : 'FAILED',
          isAutomated: true,
          metadata: {
            stepId: step.id,
            stepName: step.name,
            templateName: step.templateName,
          },
        },
      })

      // Update lead's last contact time
      await prisma.leads.update({
        where: { id: lead.id },
        data: {
          lastContactedAt: new Date(),
          updatedAt: new Date(),
        },
      })

      return success
    } catch (error) {
      console.error('Error executing drip step:', error)
      return false
    }
  }

  /**
   * Process scheduled drip messages (called by cron)
   */
  async processScheduledDrips(): Promise<{ processed: number; success: number; failed: number }> {
    const stats = { processed: 0, success: 0, failed: 0 }

    try {
      // Get all pending drip queue items that are due
      // Note: We filter for drip sequence items in the loop by checking metadata.sequenceType
      const dueItems = await prisma.followup_queue.findMany({
        where: {
          status: 'PENDING',
          scheduledFor: { lte: new Date() },
        },
        include: {
          lead: true,
        },
        take: 50,
      })

      for (const item of dueItems) {
        const metadata = item.metadata as any

        // Skip non-drip sequence items (they don't have sequenceType)
        if (!metadata?.sequenceType) {
          continue
        }

        stats.processed++

        try {
          // Mark as processing
          await prisma.followup_queue.update({
            where: { id: item.id },
            data: {
              status: 'PROCESSING',
              attempt: item.attempt + 1,
              lastAttemptAt: new Date(),
              updatedAt: new Date(),
            },
          })

          // Check if stage changed and should skip
          if (metadata.skipIfStageChanged && item.lead.stage !== metadata.originalStage) {
            await prisma.followup_queue.update({
              where: { id: item.id },
              data: {
                status: 'SKIPPED',
                completedAt: new Date(),
                updatedAt: new Date(),
              },
            })
            continue
          }

          const leadData: LeadData = {
            id: item.lead.id,
            name: item.lead.studentName,
            phone: item.lead.phone,
            email: item.lead.email || undefined,
            courseInterest: item.lead.courseInterest,
            stage: item.lead.stage,
            source: item.lead.source,
            createdAt: item.lead.createdAt,
          }

          // Find the step configuration
          const sequence = DRIP_SEQUENCES[metadata.sequenceType as DripSequenceType]
          const step = sequence?.find((s) => s.id === metadata.stepId)

          if (!step) {
            console.error(`Step not found: ${metadata.stepId} in sequence ${metadata.sequenceType}`)
            stats.failed++
            continue
          }

          // Check condition
          if (step.condition && !step.condition(leadData)) {
            await prisma.followup_queue.update({
              where: { id: item.id },
              data: {
                status: 'SKIPPED',
                completedAt: new Date(),
                updatedAt: new Date(),
              },
            })
            continue
          }

          // Execute the step
          const success = await this.executeStep(leadData, step)

          // Mark as completed or failed
          await prisma.followup_queue.update({
            where: { id: item.id },
            data: {
              status: success ? 'COMPLETED' : 'FAILED',
              completedAt: new Date(),
              updatedAt: new Date(),
            },
          })

          if (success) {
            stats.success++
          } else {
            stats.failed++
          }
        } catch (error) {
          console.error(`Error processing drip item ${item.id}:`, error)
          stats.failed++

          // Mark as failed if max attempts reached
          await prisma.followup_queue.update({
            where: { id: item.id },
            data: {
              status: item.attempt >= item.maxAttempts ? 'FAILED' : 'PENDING',
              errorMessage: error instanceof Error ? error.message : 'Unknown error',
              updatedAt: new Date(),
            },
          })
        }
      }

      console.log('Drip sequence processing completed:', stats)
    } catch (error) {
      console.error('Error in processScheduledDrips:', error)
    }

    return stats
  }

  /**
   * Handle behavioral trigger (form submit, demo booked, etc.)
   */
  async handleBehavioralTrigger(
    leadId: string,
    triggerType: 'form_submit' | 'demo_booked' | 'payment_initiated' | 'page_viewed',
    triggerData?: Record<string, any>
  ): Promise<boolean> {
    try {
      const lead = await prisma.leads.findUnique({
        where: { id: leadId },
        include: {
          demo_bookings: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      })

      if (!lead) {
        console.error(`Lead not found for behavioral trigger: ${leadId}`)
        return false
      }

      const latestDemo = lead.demo_bookings?.[0]
      const demoDate = latestDemo
        ? parseDemoDateTime(latestDemo.preferredDate, latestDemo.preferredTime)
        : undefined

      const leadData: LeadData = {
        id: lead.id,
        name: lead.studentName,
        phone: lead.phone,
        email: lead.email || undefined,
        courseInterest: lead.courseInterest,
        stage: lead.stage,
        demoDate,
        source: lead.source,
        createdAt: lead.createdAt,
      }

      let message: string
      let sequenceToStart: DripSequenceType | null = null

      switch (triggerType) {
        case 'form_submit':
          message = BEHAVIORAL_TRIGGER_MESSAGES.form_submit(leadData)
          sequenceToStart = 'WELCOME_SEQUENCE'
          break

        case 'demo_booked':
          message = BEHAVIORAL_TRIGGER_MESSAGES.demo_booked(leadData, leadData.demoDate)
          sequenceToStart = 'DEMO_REMINDER_SEQUENCE'
          break

        case 'payment_initiated':
          message = BEHAVIORAL_TRIGGER_MESSAGES.payment_initiated(leadData)
          break

        case 'page_viewed':
          const pageName = triggerData?.pageName || 'course page'
          message = BEHAVIORAL_TRIGGER_MESSAGES.page_viewed(leadData, pageName)
          break

        default:
          console.error(`Unknown trigger type: ${triggerType}`)
          return false
      }

      // Send immediate message
      const result = await sendWhatsAppMessage({
        phone: lead.phone,
        message,
      })

      // Record in history
      await prisma.followup_history.create({
        data: {
          leadId: lead.id,
          action: 'WHATSAPP',
          channel: 'WHATSAPP',
          content: message.substring(0, 100) + '...',
          status: result.success ? 'SENT' : 'FAILED',
          isAutomated: true,
          metadata: {
            triggerType,
            triggerData,
          },
        },
      })

      // Start follow-up sequence if applicable
      if (sequenceToStart) {
        await this.startSequence(leadId, sequenceToStart, {
          baseTime: new Date(),
          ...triggerData,
        })
      }

      // Track event
      await trackEvent({
        phone: lead.phone,
        eventName: `behavioral_trigger_${triggerType}`,
        eventData: {
          triggerType,
          ...triggerData,
        },
      })

      return result.success
    } catch (error) {
      console.error('Error handling behavioral trigger:', error)
      return false
    }
  }

  /**
   * Process demo reminders (called by cron)
   * Finds demos scheduled for 24h, 1h, and 15m from now
   */
  async processDemoReminders(): Promise<{ sent: number; failed: number }> {
    const stats = { sent: 0, failed: 0 }

    try {
      const now = new Date()

      // Fetch all confirmed/pending demos and filter in-memory by parsed date/time
      // since demo_bookings uses preferredDate (String) + preferredTime (String) not a DateTime field
      const upcomingDemos = await prisma.demo_bookings.findMany({
        where: {
          status: { in: ['CONFIRMED', 'PENDING'] },
        },
        include: {
          lead: true,
        },
      })

      // Define time windows (in milliseconds)
      const windows = {
        reminder_24h: { target: 24 * 60 * 60 * 1000, tolerance: 7.5 * 60 * 1000 },
        reminder_1h: { target: 60 * 60 * 1000, tolerance: 7.5 * 60 * 1000 },
        reminder_15m: { target: 15 * 60 * 1000, tolerance: 7.5 * 60 * 1000 },
      }

      // Process each demo
      for (const demo of upcomingDemos) {
        const demoDateTime = parseDemoDateTime(demo.preferredDate, demo.preferredTime)
        if (!demoDateTime) continue

        const timeUntilDemo = demoDateTime.getTime() - now.getTime()

        // Check which reminder window this demo falls into
        for (const [reminderType, { target, tolerance }] of Object.entries(windows)) {
          const minTime = target - tolerance
          const maxTime = target + tolerance

          if (timeUntilDemo >= minTime && timeUntilDemo <= maxTime) {
            // Check if reminder already sent
            const hasReminder = await this.hasReminderBeenSent(demo.id, reminderType)
            if (hasReminder) continue

            const leadData: LeadData = {
              id: demo.lead.id,
              name: demo.lead.studentName,
              phone: demo.lead.phone,
              courseInterest: demo.lead.courseInterest,
              stage: demo.lead.stage,
              demoDate: demoDateTime,
              source: demo.lead.source,
              createdAt: demo.lead.createdAt,
            }

            let message: string
            if (reminderType === 'reminder_24h') {
              message = DEMO_REMINDER_MESSAGES.reminder_24h(leadData, demoDateTime)
            } else if (reminderType === 'reminder_1h') {
              message = DEMO_REMINDER_MESSAGES.reminder_1h(leadData, demoDateTime)
            } else {
              message = DEMO_REMINDER_MESSAGES.reminder_15m(leadData, demoDateTime)
            }

            const result = await sendWhatsAppMessage({
              phone: demo.lead.phone,
              message,
            })

            if (result.success) {
              stats.sent++
              await this.recordReminderSent(demo.id, demo.leadId, reminderType, message)
            } else {
              stats.failed++
            }
          }
        }
      }

      console.log('Demo reminders processed:', stats)
    } catch (error) {
      console.error('Error processing demo reminders:', error)
    }

    return stats
  }

  private async hasReminderBeenSent(demoId: string, reminderType: string): Promise<boolean> {
    const existing = await prisma.followup_history.findFirst({
      where: {
        metadata: {
          path: ['demoId'],
          equals: demoId,
        },
        action: 'WHATSAPP',
        isAutomated: true,
        content: {
          contains: reminderType,
        },
      },
    })
    return !!existing
  }

  private async recordReminderSent(
    demoId: string,
    leadId: string,
    reminderType: string,
    content: string
  ): Promise<void> {
    await prisma.followup_history.create({
      data: {
        leadId,
        action: 'WHATSAPP',
        channel: 'WHATSAPP',
        content: `${reminderType}: ${content.substring(0, 100)}...`,
        status: 'SENT',
        isAutomated: true,
        metadata: {
          demoId,
          reminderType,
        },
      },
    })
  }
}

// Export singleton instance
export const whatsappDripService = new WhatsAppDripService()
