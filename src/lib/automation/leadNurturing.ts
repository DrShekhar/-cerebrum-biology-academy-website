/**
 * Lead Nurturing Automation Service
 *
 * Handles automated WhatsApp follow-ups for leads at different stages:
 * - Demo booking inquiries
 * - Post-demo follow-ups
 * - Enrollment nudges
 * - Payment reminders
 * - Course completion celebrations
 *
 * Uses Prisma database for persistence
 */

import { prisma } from '@/lib/prisma'
import { LeadStage as PrismaLeadStage, FollowupAction, QueueStatus } from '../../generated/prisma'
import {
  sendWhatsAppMessage,
  sendFollowUpMessage,
  sendSpecialOffer,
  trackUser,
  trackEvent,
} from '../interakt'

// Map our workflow stages to Prisma LeadStage enum
const STAGE_MAPPING: Record<string, PrismaLeadStage> = {
  new_inquiry: 'NEW_LEAD',
  demo_booked: 'DEMO_SCHEDULED',
  demo_attended: 'DEMO_COMPLETED',
  demo_missed: 'NEW_LEAD', // Treat as new lead needing re-engagement
  interested: 'OFFER_SENT',
  enrolled: 'ENROLLED',
  payment_pending: 'PAYMENT_PLAN_CREATED',
  active_student: 'ACTIVE_STUDENT',
  inactive: 'LOST',
}

// Reverse mapping for workflow lookups
const REVERSE_STAGE_MAPPING: Record<PrismaLeadStage, string> = {
  NEW_LEAD: 'new_inquiry',
  DEMO_SCHEDULED: 'demo_booked',
  DEMO_COMPLETED: 'demo_attended',
  OFFER_SENT: 'interested',
  NEGOTIATING: 'interested',
  PAYMENT_PLAN_CREATED: 'payment_pending',
  ENROLLED: 'enrolled',
  ACTIVE_STUDENT: 'active_student',
  LOST: 'inactive',
}

// Lead interface for the service (maps to Prisma leads model)
export interface Lead {
  id: string
  phone: string
  name: string
  email?: string
  class?: string
  courseInterest: string
  stage: PrismaLeadStage
  source: string
  createdAt: Date
  lastContactAt?: Date
  demoDate?: Date
  demoAttended?: boolean
  enrollmentDate?: Date
  notes?: string
  assignedToId?: string
}

interface NurturingAction {
  type: 'whatsapp' | 'email' | 'call' | 'task'
  templateName?: string
  message?: string
  params?: Record<string, string>
  delayMinutes: number
  condition?: (lead: Lead) => boolean
  triggerType: string
}

// Nurturing workflows for each stage
const NURTURING_WORKFLOWS: Record<string, NurturingAction[]> = {
  NEW_LEAD: [
    {
      type: 'whatsapp',
      templateName: 'welcome_message',
      params: { '1': '{{name}}' },
      delayMinutes: 0,
      triggerType: 'STAGE_CHANGE',
    },
    {
      type: 'whatsapp',
      templateName: 'course_information',
      delayMinutes: 120, // 2 hours
      triggerType: 'TIME_BASED',
    },
    {
      type: 'whatsapp',
      message: 'follow_up',
      delayMinutes: 1440, // 24 hours
      condition: (lead) => lead.stage === 'NEW_LEAD',
      triggerType: 'TIME_BASED',
    },
    {
      type: 'whatsapp',
      message: 'special_offer',
      delayMinutes: 4320, // 72 hours
      condition: (lead) => lead.stage === 'NEW_LEAD',
      triggerType: 'TIME_BASED',
    },
  ],
  DEMO_SCHEDULED: [
    {
      type: 'whatsapp',
      templateName: 'demo_class_confirmation',
      delayMinutes: 0,
      triggerType: 'STAGE_CHANGE',
    },
    {
      type: 'whatsapp',
      templateName: 'class_reminder',
      delayMinutes: -1440, // 24 hours before demo
      triggerType: 'TIME_BASED',
    },
    {
      type: 'whatsapp',
      templateName: 'class_reminder',
      delayMinutes: -60, // 1 hour before demo
      triggerType: 'TIME_BASED',
    },
  ],
  DEMO_COMPLETED: [
    {
      type: 'whatsapp',
      message: 'demo_feedback',
      delayMinutes: 60, // 1 hour after
      triggerType: 'DEMO_COMPLETED',
    },
    {
      type: 'whatsapp',
      message: 'enrollment_offer',
      delayMinutes: 1440, // 24 hours
      condition: (lead) => lead.stage === 'DEMO_COMPLETED',
      triggerType: 'TIME_BASED',
    },
    {
      type: 'whatsapp',
      message: 'last_chance_offer',
      delayMinutes: 4320, // 72 hours
      condition: (lead) => lead.stage === 'DEMO_COMPLETED',
      triggerType: 'TIME_BASED',
    },
  ],
  OFFER_SENT: [
    {
      type: 'whatsapp',
      message: 'enrollment_benefits',
      delayMinutes: 1440, // 24 hours
      triggerType: 'OFFER_SENT',
    },
    {
      type: 'whatsapp',
      message: 'limited_seats',
      delayMinutes: 4320, // 72 hours
      triggerType: 'TIME_BASED',
    },
  ],
  ENROLLED: [
    {
      type: 'whatsapp',
      templateName: 'welcome_message',
      delayMinutes: 0,
      triggerType: 'STAGE_CHANGE',
    },
  ],
  PAYMENT_PLAN_CREATED: [
    {
      type: 'whatsapp',
      templateName: 'payment_confirmation',
      delayMinutes: 1440, // 24 hours
      triggerType: 'TIME_BASED',
    },
    {
      type: 'whatsapp',
      message: 'payment_urgent',
      delayMinutes: 4320, // 72 hours
      triggerType: 'TIME_BASED',
    },
  ],
  ACTIVE_STUDENT: [],
  LOST: [
    {
      type: 'whatsapp',
      message: 'reactivation',
      delayMinutes: 10080, // 1 week
      triggerType: 'INACTIVITY',
    },
  ],
}

// Custom message templates (for messages not in Interakt templates)
const CUSTOM_MESSAGES: Record<string, (lead: Lead) => string> = {
  follow_up: (lead) => `Hi ${lead.name}!

Just checking in - did you get a chance to explore our NEET Biology courses?

We have limited seats for our upcoming batch. Would you like to book a FREE demo class to experience our teaching methodology?

Reply "DEMO" to book now! 📚`,

  special_offer: (lead) => `🎁 Special offer for ${lead.name}!

Get 15% OFF on ${lead.courseInterest} enrollment!

✅ Limited time offer
✅ Only for serious NEET aspirants
✅ Expert faculty from AIIMS

Use code: NEET15
Valid for 48 hours only!

Reply to claim your offer.`,

  demo_feedback: (lead) => `Hi ${lead.name}!

Thank you for attending today's demo class! 🎓

We'd love to hear your feedback:
- How was the teaching style?
- Did you find it helpful?

Ready to start your NEET journey with us?

Reply "ENROLL" to join our next batch!`,

  enrollment_offer: (lead) => `🚀 ${lead.name}, ready to crack NEET?

As a demo attendee, you get EXCLUSIVE benefits:

🎁 10% Early Bird Discount
📚 Free Study Material (Worth ₹5,000)
👩‍🏫 1-on-1 Doubt Sessions
📱 24/7 WhatsApp Support

Limited seats available for ${lead.courseInterest}!

Reply "JOIN" or call +91 88264 44334`,

  last_chance_offer: (lead) => `⏰ Last chance, ${lead.name}!

Your exclusive demo attendee discount expires in 24 hours!

Don't miss out on:
✅ 10% OFF on enrollment
✅ Free study materials
✅ Priority batch selection

Act now: cerebrumbiologyacademy.com/enroll

Or reply "HELP" to speak with our counselor.`,

  missed_demo: (lead) => `Hi ${lead.name}!

We missed you at today's demo class 😔

Don't worry - we'd love to reschedule it for you!

Reply with your preferred:
- Date
- Time (morning/evening)

Or call us: +91 88264 44334`,

  reschedule_demo: (lead) => `${lead.name}, your spot is still reserved!

We have demo classes scheduled this week. Pick a slot:

1️⃣ Tomorrow 4 PM
2️⃣ Tomorrow 7 PM
3️⃣ Weekend 10 AM

Reply with 1, 2, or 3 to book!`,

  another_chance: (lead) => `${lead.name}, one more chance!

We're running a special FREE master class this weekend:

📚 Topic: "How to Score 300+ in NEET Biology"
👩‍🏫 By: Dr. Priya Sharma (AIIMS Graduate)
🎁 Bonus: Free NCERT Notes PDF

Reply "YES" to join!`,

  enrollment_benefits: (
    lead
  ) => `${lead.name}, here's why 85% of our students score 300+ in Biology:

✅ Small batches (15-18 students)
✅ AIIMS faculty
✅ Daily doubt resolution
✅ 500+ practice questions
✅ Weekly mock tests
✅ Personal mentorship

Ready to join? Reply "READY"`,

  limited_seats: (lead) => `🔴 ${lead.name}, only 5 seats left!

Our ${lead.courseInterest} batch is almost full.

Students who joined last month are already seeing results:
📈 Average score improvement: 60 marks

Don't wait - secure your seat now!

Reply "BOOK" or call +91 88264 44334`,

  payment_urgent: (lead) => `${lead.name}, your enrollment is pending!

Complete your payment to secure:
✅ Your batch seat
✅ Early bird discount
✅ Bonus study material

Payment link: cerebrumbiologyacademy.com/pay

Need help? Reply or call +91 88264 44334`,

  reactivation: (lead) => `Hi ${lead.name}! Long time no see 👋

We noticed you were interested in ${lead.courseInterest}.

NEET 2026 is approaching - it's the perfect time to start!

🎁 Special comeback offer: 20% OFF for returning students

Interested? Reply "YES" to learn more!`,
}

export class LeadNurturingService {
  /**
   * Process a new lead and start nurturing workflow
   */
  async processNewLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'stage'>): Promise<Lead> {
    // Create lead in database
    const lead = await prisma.leads.create({
      data: {
        id: `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        studentName: leadData.name,
        email: leadData.email || null,
        phone: leadData.phone,
        courseInterest: leadData.courseInterest,
        stage: 'NEW_LEAD',
        source: (leadData.source || 'WEBSITE') as any,
        assignedToId: leadData.assignedToId || 'system',
        updatedAt: new Date(),
      },
    })

    // Track lead in Interakt CRM
    await trackUser({
      phone: lead.phone,
      userId: `lead_${lead.id}`,
      traits: {
        name: lead.studentName,
        email: lead.email,
        courseInterest: lead.courseInterest,
        stage: lead.stage,
        source: lead.source,
        createdAt: lead.createdAt.toISOString(),
      },
    })

    // Track lead creation event
    await trackEvent({
      phone: lead.phone,
      eventName: 'lead_created',
      eventData: {
        stage: lead.stage,
        source: lead.source,
        courseInterest: lead.courseInterest,
      },
    })

    // Schedule immediate and future follow-ups
    await this.scheduleWorkflowActions(this.mapToLead(lead))

    // Execute immediate actions (delayMinutes = 0)
    await this.executeImmediateActions(this.mapToLead(lead))

    return this.mapToLead(lead)
  }

  /**
   * Update lead stage and trigger relevant workflows
   */
  async updateLeadStage(leadId: string, newStage: PrismaLeadStage): Promise<Lead | null> {
    const existingLead = await prisma.leads.findUnique({ where: { id: leadId } })
    if (!existingLead) return null

    const oldStage = existingLead.stage

    // Update lead in database
    const updatedLead = await prisma.leads.update({
      where: { id: leadId },
      data: {
        stage: newStage,
        updatedAt: new Date(),
        lastContactedAt: new Date(),
      },
    })

    // Track stage change
    await trackEvent({
      phone: updatedLead.phone,
      eventName: 'lead_stage_changed',
      eventData: {
        oldStage,
        newStage,
        timestamp: new Date().toISOString(),
      },
    })

    // Update user traits in CRM
    await trackUser({
      phone: updatedLead.phone,
      userId: `lead_${updatedLead.id}`,
      traits: {
        stage: newStage,
        lastStageChange: new Date().toISOString(),
      },
    })

    // Cancel pending follow-ups for old stage
    await prisma.followup_queue.updateMany({
      where: {
        leadId,
        status: 'PENDING',
      },
      data: {
        status: 'CANCELLED',
        updatedAt: new Date(),
      },
    })

    // Schedule new follow-ups for new stage
    const lead = this.mapToLead(updatedLead)
    await this.scheduleWorkflowActions(lead)

    // Execute immediate actions for new stage
    await this.executeImmediateActions(lead)

    return lead
  }

  /**
   * Schedule workflow actions in the follow-up queue
   */
  private async scheduleWorkflowActions(lead: Lead): Promise<void> {
    const workflow = NURTURING_WORKFLOWS[lead.stage]
    if (!workflow) return

    // Get or create a default rule for tracking
    let rule = await prisma.followup_rules.findFirst({
      where: { name: `auto_${lead.stage}`, isActive: true },
    })

    if (!rule) {
      rule = await prisma.followup_rules.create({
        data: {
          name: `auto_${lead.stage}`,
          description: `Automated follow-up rule for ${lead.stage} stage`,
          isActive: true,
          triggerType: 'STAGE_CHANGE',
          triggerConditions: { stage: lead.stage },
          delayMinutes: 0,
          actionType: 'WHATSAPP',
          createdById: 'system',
          updatedAt: new Date(),
        },
      })
    }

    for (const action of workflow) {
      if (action.delayMinutes <= 0) continue // Immediate actions handled separately

      const scheduledFor = new Date(Date.now() + action.delayMinutes * 60 * 1000)

      await prisma.followup_queue.create({
        data: {
          leadId: lead.id,
          ruleId: rule.id,
          scheduledFor,
          status: 'PENDING',
          metadata: {
            actionType: action.type,
            templateName: action.templateName,
            message: action.message,
            params: action.params,
          },
          updatedAt: new Date(),
        },
      })
    }
  }

  /**
   * Execute immediate actions (delayMinutes = 0)
   */
  private async executeImmediateActions(lead: Lead): Promise<void> {
    const workflow = NURTURING_WORKFLOWS[lead.stage]
    if (!workflow) return

    for (const action of workflow) {
      if (action.delayMinutes !== 0) continue
      if (action.condition && !action.condition(lead)) continue

      await this.executeAction(lead, action)
    }
  }

  /**
   * Execute a single nurturing action
   */
  private async executeAction(lead: Lead, action: NurturingAction): Promise<void> {
    try {
      let success = false
      let content = ''

      if (action.type === 'whatsapp') {
        if (action.templateName) {
          // Use Interakt template
          const params = action.params || {}
          Object.keys(params).forEach((key) => {
            if (params[key] === '{{name}}') params[key] = lead.name
            if (params[key] === '{{course}}') params[key] = lead.courseInterest
          })

          const result = await sendWhatsAppMessage({
            phone: lead.phone,
            templateName: action.templateName,
            templateParams: params,
          })
          success = result.success
          content = `Template: ${action.templateName}`
        } else if (action.message && CUSTOM_MESSAGES[action.message]) {
          // Use custom message (within 24hr session window)
          const message = CUSTOM_MESSAGES[action.message](lead)
          const result = await sendWhatsAppMessage({
            phone: lead.phone,
            message,
          })
          success = result.success
          content = message
        }
      }

      // Record in follow-up history
      await prisma.followup_history.create({
        data: {
          leadId: lead.id,
          action: this.mapActionType(action.type),
          channel: action.type.toUpperCase(),
          content,
          status: success ? 'SENT' : 'FAILED',
          isAutomated: true,
          metadata: {
            templateName: action.templateName,
            message: action.message,
            stage: lead.stage,
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

      // Track action execution in CRM
      await trackEvent({
        phone: lead.phone,
        eventName: 'nurturing_action_sent',
        eventData: {
          actionType: action.type,
          templateName: action.templateName,
          message: action.message,
          stage: lead.stage,
          success,
        },
      })
    } catch (error) {
      console.error('Error executing nurturing action:', error, { lead, action })
    }
  }

  /**
   * Map action type to Prisma FollowupAction enum
   */
  private mapActionType(type: string): FollowupAction {
    const mapping: Record<string, FollowupAction> = {
      whatsapp: 'WHATSAPP',
      email: 'EMAIL',
      call: 'CALL_TASK',
      task: 'TASK',
    }
    return mapping[type] || 'TASK'
  }

  /**
   * Map Prisma lead to our Lead interface
   */
  private mapToLead(prismaLead: any): Lead {
    return {
      id: prismaLead.id,
      phone: prismaLead.phone,
      name: prismaLead.studentName,
      email: prismaLead.email || undefined,
      courseInterest: prismaLead.courseInterest,
      stage: prismaLead.stage,
      source: prismaLead.source,
      createdAt: prismaLead.createdAt,
      lastContactAt: prismaLead.lastContactedAt || undefined,
      assignedToId: prismaLead.assignedToId,
    }
  }

  /**
   * Send manual follow-up message
   */
  async sendManualFollowUp(
    leadId: string,
    counselorName: string,
    bookingLink: string
  ): Promise<{ success: boolean; messageId?: string }> {
    const lead = await prisma.leads.findUnique({ where: { id: leadId } })
    if (!lead) return { success: false }

    const result = await sendFollowUpMessage({
      phone: lead.phone,
      name: lead.studentName,
      courseName: lead.courseInterest,
      counselorName,
      bookingLink,
    })

    if (result.success) {
      // Record in history
      await prisma.followup_history.create({
        data: {
          leadId: lead.id,
          action: 'WHATSAPP',
          channel: 'WHATSAPP',
          content: `Manual follow-up by ${counselorName}`,
          status: 'SENT',
          isAutomated: false,
          metadata: {
            counselor: counselorName,
            bookingLink,
          },
        },
      })

      await trackEvent({
        phone: lead.phone,
        eventName: 'manual_followup_sent',
        eventData: {
          counselor: counselorName,
          timestamp: new Date().toISOString(),
        },
      })
    }

    return result
  }

  /**
   * Send promotional offer to lead
   */
  async sendPromotionalOffer(
    leadId: string,
    offerDetails: string,
    validityDate: string,
    promoCode: string,
    enrollLink: string
  ): Promise<{ success: boolean; messageId?: string }> {
    const lead = await prisma.leads.findUnique({ where: { id: leadId } })
    if (!lead) return { success: false }

    const result = await sendSpecialOffer({
      phone: lead.phone,
      name: lead.studentName,
      offerDetails,
      validityDate,
      promoCode,
      enrollLink,
    })

    if (result.success) {
      // Record in history
      await prisma.followup_history.create({
        data: {
          leadId: lead.id,
          action: 'WHATSAPP',
          channel: 'WHATSAPP',
          content: `Promo offer: ${promoCode}`,
          status: 'SENT',
          isAutomated: false,
          metadata: {
            promoCode,
            validityDate,
            offerDetails,
          },
        },
      })

      await trackEvent({
        phone: lead.phone,
        eventName: 'promo_offer_sent',
        eventData: {
          promoCode,
          validityDate,
          timestamp: new Date().toISOString(),
        },
      })
    }

    return result
  }

  /**
   * Mark demo as attended and trigger post-demo workflow
   */
  async markDemoAttended(leadId: string): Promise<Lead | null> {
    return this.updateLeadStage(leadId, 'DEMO_COMPLETED')
  }

  /**
   * Mark demo as missed and trigger recovery workflow
   */
  async markDemoMissed(leadId: string): Promise<Lead | null> {
    const lead = await prisma.leads.findUnique({ where: { id: leadId } })
    if (!lead) return null

    // Send missed demo message
    const mappedLead = this.mapToLead(lead)
    await this.executeAction(mappedLead, {
      type: 'whatsapp',
      message: 'missed_demo',
      delayMinutes: 0,
      triggerType: 'DEMO_NO_SHOW',
    })

    // Schedule reschedule messages
    const rescheduleActions: NurturingAction[] = [
      {
        type: 'whatsapp',
        message: 'reschedule_demo',
        delayMinutes: 1440, // 24 hours
        triggerType: 'DEMO_NO_SHOW',
      },
      {
        type: 'whatsapp',
        message: 'another_chance',
        delayMinutes: 4320, // 72 hours
        triggerType: 'DEMO_NO_SHOW',
      },
    ]

    // Get or create rule for demo no-show
    let rule = await prisma.followup_rules.findFirst({
      where: { name: 'demo_no_show', isActive: true },
    })

    if (!rule) {
      rule = await prisma.followup_rules.create({
        data: {
          name: 'demo_no_show',
          description: 'Follow-up for missed demo classes',
          isActive: true,
          triggerType: 'DEMO_NO_SHOW',
          triggerConditions: {},
          delayMinutes: 0,
          actionType: 'WHATSAPP',
          createdById: 'system',
          updatedAt: new Date(),
        },
      })
    }

    for (const action of rescheduleActions) {
      const scheduledFor = new Date(Date.now() + action.delayMinutes * 60 * 1000)
      await prisma.followup_queue.create({
        data: {
          leadId,
          ruleId: rule.id,
          scheduledFor,
          status: 'PENDING',
          metadata: {
            actionType: action.type,
            message: action.message,
          },
          updatedAt: new Date(),
        },
      })
    }

    return mappedLead
  }

  /**
   * Get recommended next action for a lead
   */
  async getRecommendedAction(leadId: string): Promise<string> {
    const lead = await prisma.leads.findUnique({ where: { id: leadId } })
    if (!lead) return 'Lead not found'

    const workflow = NURTURING_WORKFLOWS[lead.stage]
    if (!workflow || workflow.length === 0) {
      return 'No automated actions scheduled'
    }

    // Check pending queue items
    const nextQueued = await prisma.followup_queue.findFirst({
      where: {
        leadId,
        status: 'PENDING',
      },
      orderBy: { scheduledFor: 'asc' },
    })

    if (nextQueued) {
      const metadata = nextQueued.metadata as any
      const minutesUntil = Math.round(
        (nextQueued.scheduledFor.getTime() - Date.now()) / (60 * 1000)
      )
      return `Next: ${metadata?.templateName || metadata?.message || 'follow-up'} in ${minutesUntil} minutes`
    }

    return 'All automated actions completed'
  }

  /**
   * Get lead by ID
   */
  async getLeadById(leadId: string): Promise<Lead | null> {
    const lead = await prisma.leads.findUnique({ where: { id: leadId } })
    return lead ? this.mapToLead(lead) : null
  }

  /**
   * Get lead by phone
   */
  async getLeadByPhone(phone: string): Promise<Lead | null> {
    const normalizedPhone = phone.replace(/[^\d]/g, '').slice(-10)
    const lead = await prisma.leads.findFirst({
      where: {
        phone: { contains: normalizedPhone },
      },
    })
    return lead ? this.mapToLead(lead) : null
  }

  /**
   * Get all leads for a stage
   */
  async getLeadsByStage(stage: PrismaLeadStage): Promise<Lead[]> {
    const leads = await prisma.leads.findMany({
      where: { stage },
      orderBy: { createdAt: 'desc' },
    })
    return leads.map((l) => this.mapToLead(l))
  }
}

// Export singleton instance
export const leadNurturingService = new LeadNurturingService()

/**
 * Process scheduled nurturing tasks (called by cron job)
 * This processes the followup_queue table
 */
export async function processScheduledNurturing(): Promise<{
  processed: number
  success: number
  failed: number
}> {
  const stats = { processed: 0, success: 0, failed: 0 }

  try {
    // Get all pending queue items that are due
    const dueItems = await prisma.followup_queue.findMany({
      where: {
        status: 'PENDING',
        scheduledFor: { lte: new Date() },
      },
      include: {
        lead: true,
      },
      take: 50, // Process in batches
    })

    for (const item of dueItems) {
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

        const metadata = item.metadata as any
        const lead = leadNurturingService['mapToLead'](item.lead)

        // Check if condition still applies
        const workflow = NURTURING_WORKFLOWS[lead.stage]
        const action = workflow?.find(
          (a) =>
            (a.templateName === metadata?.templateName || a.message === metadata?.message) &&
            (!a.condition || a.condition(lead))
        )

        if (!action) {
          // Condition no longer applies, skip
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

        // Execute the action
        await leadNurturingService['executeAction'](lead, action)

        // Mark as completed
        await prisma.followup_queue.update({
          where: { id: item.id },
          data: {
            status: 'COMPLETED',
            completedAt: new Date(),
            updatedAt: new Date(),
          },
        })

        stats.success++
      } catch (error) {
        console.error('Error processing queue item:', item.id, error)

        // Check if we should retry
        if (item.attempt < item.maxAttempts) {
          await prisma.followup_queue.update({
            where: { id: item.id },
            data: {
              status: 'PENDING',
              errorMessage: error instanceof Error ? error.message : 'Unknown error',
              updatedAt: new Date(),
            },
          })
        } else {
          await prisma.followup_queue.update({
            where: { id: item.id },
            data: {
              status: 'FAILED',
              errorMessage: error instanceof Error ? error.message : 'Unknown error',
              completedAt: new Date(),
              updatedAt: new Date(),
            },
          })
        }

        stats.failed++
      }
    }

    console.log('Scheduled nurturing processed:', stats)
  } catch (error) {
    console.error('Error in processScheduledNurturing:', error)
  }

  return stats
}

/**
 * Clean up old completed/failed queue items (housekeeping)
 */
export async function cleanupFollowupQueue(daysOld: number = 30): Promise<number> {
  const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000)

  const result = await prisma.followup_queue.deleteMany({
    where: {
      status: { in: ['COMPLETED', 'FAILED', 'SKIPPED', 'CANCELLED'] },
      completedAt: { lt: cutoffDate },
    },
  })

  console.log(`Cleaned up ${result.count} old queue items`)
  return result.count
}
