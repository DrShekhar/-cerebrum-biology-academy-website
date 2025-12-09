/**
 * Lead Nurturing Automation Service
 *
 * Handles automated WhatsApp follow-ups for leads at different stages:
 * - Demo booking inquiries
 * - Post-demo follow-ups
 * - Enrollment nudges
 * - Payment reminders
 * - Course completion celebrations
 */

import {
  sendWhatsAppMessage,
  sendFollowUpMessage,
  sendSpecialOffer,
  trackUser,
  trackEvent,
} from '../interakt'

// Lead stages
export type LeadStage =
  | 'new_inquiry'
  | 'demo_booked'
  | 'demo_attended'
  | 'demo_missed'
  | 'interested'
  | 'enrolled'
  | 'payment_pending'
  | 'active_student'
  | 'inactive'

export interface Lead {
  id: string
  phone: string
  name: string
  email?: string
  class?: string
  courseInterest: string
  stage: LeadStage
  source: string
  createdAt: Date
  lastContactAt?: Date
  demoDate?: Date
  demoAttended?: boolean
  enrollmentDate?: Date
  notes?: string
}

interface NurturingAction {
  type: 'whatsapp' | 'email' | 'call' | 'task'
  templateName?: string
  message?: string
  params?: Record<string, string>
  delayHours: number
  condition?: (lead: Lead) => boolean
}

// Nurturing workflows for each stage
const NURTURING_WORKFLOWS: Record<LeadStage, NurturingAction[]> = {
  new_inquiry: [
    {
      type: 'whatsapp',
      templateName: 'welcome_message',
      params: { '1': '{{name}}' },
      delayHours: 0,
    },
    {
      type: 'whatsapp',
      templateName: 'course_information',
      delayHours: 2,
    },
    {
      type: 'whatsapp',
      message: 'follow_up',
      delayHours: 24,
      condition: (lead) => lead.stage === 'new_inquiry',
    },
    {
      type: 'whatsapp',
      message: 'special_offer',
      delayHours: 72,
      condition: (lead) => lead.stage === 'new_inquiry',
    },
  ],
  demo_booked: [
    {
      type: 'whatsapp',
      templateName: 'demo_class_confirmation',
      delayHours: 0,
    },
    {
      type: 'whatsapp',
      templateName: 'class_reminder',
      delayHours: -24, // 24 hours before demo
    },
    {
      type: 'whatsapp',
      templateName: 'class_reminder',
      delayHours: -1, // 1 hour before demo
    },
  ],
  demo_attended: [
    {
      type: 'whatsapp',
      message: 'demo_feedback',
      delayHours: 1,
    },
    {
      type: 'whatsapp',
      message: 'enrollment_offer',
      delayHours: 24,
      condition: (lead) => lead.stage === 'demo_attended',
    },
    {
      type: 'whatsapp',
      message: 'last_chance_offer',
      delayHours: 72,
      condition: (lead) => lead.stage === 'demo_attended',
    },
  ],
  demo_missed: [
    {
      type: 'whatsapp',
      message: 'missed_demo',
      delayHours: 1,
    },
    {
      type: 'whatsapp',
      message: 'reschedule_demo',
      delayHours: 24,
    },
    {
      type: 'whatsapp',
      message: 'another_chance',
      delayHours: 72,
    },
  ],
  interested: [
    {
      type: 'whatsapp',
      message: 'enrollment_benefits',
      delayHours: 24,
    },
    {
      type: 'whatsapp',
      message: 'limited_seats',
      delayHours: 72,
    },
  ],
  enrolled: [
    {
      type: 'whatsapp',
      templateName: 'welcome_message',
      delayHours: 0,
    },
  ],
  payment_pending: [
    {
      type: 'whatsapp',
      templateName: 'payment_confirmation',
      delayHours: 24,
    },
    {
      type: 'whatsapp',
      message: 'payment_urgent',
      delayHours: 72,
    },
  ],
  active_student: [],
  inactive: [
    {
      type: 'whatsapp',
      message: 'reactivation',
      delayHours: 168, // 1 week
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

NEET 2025 is approaching - it's the perfect time to start!

🎁 Special comeback offer: 20% OFF for returning students

Interested? Reply "YES" to learn more!`,
}

export class LeadNurturingService {
  /**
   * Process a new lead and start nurturing workflow
   */
  async processNewLead(lead: Lead): Promise<void> {
    // Track lead in Interakt CRM
    await trackUser({
      phone: lead.phone,
      userId: `lead_${lead.id}`,
      traits: {
        name: lead.name,
        email: lead.email,
        class: lead.class,
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

    // Trigger immediate actions
    await this.executeWorkflowActions(lead, 0)
  }

  /**
   * Update lead stage and trigger relevant workflows
   */
  async updateLeadStage(lead: Lead, newStage: LeadStage): Promise<void> {
    const oldStage = lead.stage
    lead.stage = newStage

    // Track stage change
    await trackEvent({
      phone: lead.phone,
      eventName: 'lead_stage_changed',
      eventData: {
        oldStage,
        newStage,
        timestamp: new Date().toISOString(),
      },
    })

    // Update user traits
    await trackUser({
      phone: lead.phone,
      userId: `lead_${lead.id}`,
      traits: {
        stage: newStage,
        lastStageChange: new Date().toISOString(),
      },
    })

    // Trigger immediate actions for new stage
    await this.executeWorkflowActions(lead, 0)
  }

  /**
   * Execute workflow actions for a lead
   */
  private async executeWorkflowActions(lead: Lead, delayHours: number): Promise<void> {
    const workflow = NURTURING_WORKFLOWS[lead.stage]
    if (!workflow) return

    for (const action of workflow) {
      if (action.delayHours !== delayHours) continue
      if (action.condition && !action.condition(lead)) continue

      await this.executeAction(lead, action)
    }
  }

  /**
   * Execute a single nurturing action
   */
  private async executeAction(lead: Lead, action: NurturingAction): Promise<void> {
    try {
      if (action.type === 'whatsapp') {
        if (action.templateName) {
          // Use Interakt template
          const params = action.params || {}
          Object.keys(params).forEach((key) => {
            if (params[key] === '{{name}}') params[key] = lead.name
            if (params[key] === '{{course}}') params[key] = lead.courseInterest
          })

          await sendWhatsAppMessage({
            phone: lead.phone,
            templateName: action.templateName,
            templateParams: params,
          })
        } else if (action.message && CUSTOM_MESSAGES[action.message]) {
          // Use custom message (within 24hr session window)
          const message = CUSTOM_MESSAGES[action.message](lead)
          await sendWhatsAppMessage({
            phone: lead.phone,
            message,
          })
        }
      }

      // Track action execution
      await trackEvent({
        phone: lead.phone,
        eventName: 'nurturing_action_sent',
        eventData: {
          actionType: action.type,
          templateName: action.templateName,
          message: action.message,
          stage: lead.stage,
        },
      })
    } catch (error) {
      console.error('Error executing nurturing action:', error, { lead, action })
    }
  }

  /**
   * Send manual follow-up message
   */
  async sendManualFollowUp(
    lead: Lead,
    counselorName: string,
    bookingLink: string
  ): Promise<{ success: boolean; messageId?: string }> {
    const result = await sendFollowUpMessage({
      phone: lead.phone,
      name: lead.name,
      courseName: lead.courseInterest,
      counselorName,
      bookingLink,
    })

    if (result.success) {
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
    lead: Lead,
    offerDetails: string,
    validityDate: string,
    promoCode: string,
    enrollLink: string
  ): Promise<{ success: boolean; messageId?: string }> {
    const result = await sendSpecialOffer({
      phone: lead.phone,
      name: lead.name,
      offerDetails,
      validityDate,
      promoCode,
      enrollLink,
    })

    if (result.success) {
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
  async markDemoAttended(lead: Lead): Promise<void> {
    await this.updateLeadStage({ ...lead, demoAttended: true }, 'demo_attended')
  }

  /**
   * Mark demo as missed and trigger recovery workflow
   */
  async markDemoMissed(lead: Lead): Promise<void> {
    await this.updateLeadStage({ ...lead, demoAttended: false }, 'demo_missed')
  }

  /**
   * Get recommended next action for a lead
   */
  getRecommendedAction(lead: Lead): string {
    const workflow = NURTURING_WORKFLOWS[lead.stage]
    if (!workflow || workflow.length === 0) {
      return 'No automated actions scheduled'
    }

    const nextAction = workflow.find((a) => a.delayHours > 0 && (!a.condition || a.condition(lead)))

    if (!nextAction) {
      return 'All automated actions completed'
    }

    return `Next: ${nextAction.templateName || nextAction.message} in ${nextAction.delayHours} hours`
  }
}

// Export singleton instance
export const leadNurturingService = new LeadNurturingService()

// Utility function to process scheduled nurturing tasks (called by cron job)
export async function processScheduledNurturing(): Promise<void> {
  // In production, this would:
  // 1. Query database for leads that need nurturing
  // 2. Check which actions are due based on lead creation/stage change time
  // 3. Execute actions for each lead
  console.log('Processing scheduled nurturing tasks...')
}
