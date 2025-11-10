/**
 * Counselor WhatsApp Service
 * Handles WhatsApp messaging for lead management and student communication
 */

import { WhatsAppBusinessService } from '@/lib/integrations/whatsappBusinessService'
import { db } from '@/lib/db'
import type { LeadStage } from '@/app/counselor/leads/page'

interface SendMessageParams {
  leadId: string
  phone: string
  message: string
  counselorId: string
  type?: 'MANUAL' | 'TEMPLATE' | 'AUTOMATED'
}

interface SendTemplateParams {
  leadId: string
  phone: string
  templateName: string
  studentName: string
  counselorId: string
  variables?: Record<string, string>
}

export class CounselorWhatsAppService {
  /**
   * Send a manual text message to a lead
   */
  static async sendManualMessage({
    leadId,
    phone,
    message,
    counselorId,
    type = 'MANUAL',
  }: SendMessageParams) {
    try {
      // Send via WhatsApp Business API
      const result = await WhatsAppBusinessService.sendTextMessage(phone, message)

      // Track communication in database
      await db.communication.create({
        data: {
          leadId,
          channel: 'WHATSAPP',
          direction: 'OUTBOUND',
          message,
          status: 'SENT',
          sentBy: counselorId,
          sentAt: new Date(),
          metadata: {
            whatsappMessageId: result.messages?.[0]?.id,
            type,
          },
        },
      })

      return { success: true, messageId: result.messages?.[0]?.id }
    } catch (error) {
      console.error('WhatsApp send error:', error)

      // Log failed communication
      await db.communication.create({
        data: {
          leadId,
          channel: 'WHATSAPP',
          direction: 'OUTBOUND',
          message,
          status: 'FAILED',
          sentBy: counselorId,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      })

      throw error
    }
  }

  /**
   * Pre-built message templates for common scenarios
   */
  static getQuickMessages(studentName: string, courseInterest: string) {
    return {
      initial_contact: `Hi ${studentName}! 👋

Thank you for your interest in ${courseInterest} at Cerebrum Biology Academy!

I'm your dedicated counselor, and I'm here to help you achieve your NEET dreams.

Would you like to schedule a FREE demo class? 📚

Reply "YES" or call me at +91-88264-44334`,

      demo_followup: `Hi ${studentName}! 🎓

Hope you enjoyed our demo class!

I'd love to hear your thoughts and help you with the enrollment process for ${courseInterest}.

Special offer: Enroll today and get 20% OFF! ⚡

Let's discuss your NEET preparation strategy. When can we talk?`,

      negotiation_followup: `Hi ${studentName}! 💼

I've reviewed your requirements for ${courseInterest}.

We can create a customized fee plan that works for your budget! 💰

Let me share some flexible payment options. Can we connect for 10 minutes?`,

      enrollment_confirmation: `🎉 Congratulations ${studentName}!

Welcome to the Cerebrum Biology Academy family!

Course: ${courseInterest}
✅ Enrollment Complete

Your journey to medical college starts now! 🩺

📱 Next steps:
1. Check email for login details
2. Join WhatsApp study group
3. First class details coming soon

See you in class! 🌟`,

      payment_reminder: `Hi ${studentName}! 📅

This is a friendly reminder about your upcoming installment for ${courseInterest}.

💰 Payment details sent via email
📞 Need help? Call: +91-88264-44334

We're here to support your NEET journey! 💪`,

      check_in: `Hi ${studentName}! 👋

Just checking in on your NEET preparation for ${courseInterest}.

How are your studies going? Any doubts or questions?

Our team is here to help! 📚✨`,
    }
  }

  /**
   * Send a quick template message
   */
  static async sendQuickMessage(
    leadId: string,
    phone: string,
    studentName: string,
    courseInterest: string,
    templateKey: keyof ReturnType<typeof CounselorWhatsAppService.getQuickMessages>,
    counselorId: string
  ) {
    const templates = this.getQuickMessages(studentName, courseInterest)
    const message = templates[templateKey]

    return this.sendManualMessage({
      leadId,
      phone,
      message,
      counselorId,
      type: 'TEMPLATE',
    })
  }

  /**
   * Send automated follow-up based on lead stage
   */
  static async sendStageBasedFollowup(
    leadId: string,
    phone: string,
    studentName: string,
    courseInterest: string,
    stage: LeadStage,
    counselorId: string
  ) {
    const followupMessages: Partial<Record<LeadStage, string>> = {
      NEW_LEAD: `Hi ${studentName}! 👋

Thanks for showing interest in ${courseInterest}! I'm your counselor at Cerebrum Biology Academy.

Let's schedule a FREE demo class to show you our teaching methodology. 📚

When works best for you:
• Tomorrow 6 PM
• This weekend
• Your preferred time?`,

      DEMO_SCHEDULED: `Hi ${studentName}! 🎓

Your demo class for ${courseInterest} is confirmed!

📅 Join link will be sent 30 minutes before
📚 Keep your biology doubts ready
🎯 We'll discuss your NEET strategy

Excited to meet you! See you soon! 🌟`,

      DEMO_COMPLETED: `Hi ${studentName}! 💫

Thank you for attending our demo class!

How was your experience? I'd love to hear your feedback.

Ready to join ${courseInterest}?

🎁 Special offer: Enroll within 24 hours and get 20% OFF + Free study materials worth ₹5,000!

Let's discuss! 📞`,

      OFFER_SENT: `Hi ${studentName}! 📄

I've sent you a customized offer for ${courseInterest}!

✅ Special pricing
✅ Flexible payment plans
✅ Bonus study materials

Please check your email and let me know if you have any questions.

This offer is valid for 48 hours! ⏰`,

      NEGOTIATING: `Hi ${studentName}! 💼

I understand your concerns about the fee structure.

Let's work together to find a solution that fits your budget for ${courseInterest}!

💰 Options available:
• Monthly installments
• Scholarship programs
• Sibling discounts

When can we discuss? 📞`,

      PAYMENT_PLAN_CREATED: `Hi ${studentName}! ✅

Your customized payment plan for ${courseInterest} is ready!

📧 Check your email for complete details
💳 First installment link attached
📅 Flexible due dates as discussed

Excited to start your NEET journey! 🎯

Any questions? I'm here to help! 💪`,
    }

    const message = followupMessages[stage]
    if (!message) {
      throw new Error(`No follow-up message defined for stage: ${stage}`)
    }

    return this.sendManualMessage({
      leadId,
      phone,
      message,
      counselorId,
      type: 'AUTOMATED',
    })
  }

  /**
   * Send demo class reminder
   */
  static async sendDemoReminder(
    leadId: string,
    phone: string,
    studentName: string,
    demoDateTime: Date,
    zoomLink: string,
    counselorId: string
  ) {
    const timeString = demoDateTime.toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
    })

    const message = `🔔 Demo Class Reminder

Hi ${studentName}!

Your FREE NEET Biology demo starts in 30 minutes!

📅 Time: ${timeString}
🔗 Join: ${zoomLink}
📚 Topic: Cell Biology & NEET Strategy

📝 Keep ready:
• Notebook
• Questions about NEET
• Your biology doubts

See you soon! 🌟

Support: +91-88264-44334`

    return this.sendManualMessage({
      leadId,
      phone,
      message,
      counselorId,
      type: 'AUTOMATED',
    })
  }

  /**
   * Send payment link
   */
  static async sendPaymentLink(
    leadId: string,
    phone: string,
    studentName: string,
    amount: number,
    paymentLink: string,
    dueDate: Date,
    counselorId: string
  ) {
    const dueDateString = dueDate.toLocaleDateString('en-IN', { dateStyle: 'long' })

    const message = `💳 Payment Request - Cerebrum Biology Academy

Hi ${studentName}!

Your installment details:

💰 Amount: ₹${amount.toLocaleString('en-IN')}
📅 Due Date: ${dueDateString}

🔗 Pay securely: ${paymentLink}

💡 Payment Options:
• UPI / Cards / Net Banking
• EMI available on credit cards

📞 Support: +91-88264-44334

Thank you for being part of our family! 🙏

Continue your NEET journey with us! 🎯`

    return this.sendManualMessage({
      leadId,
      phone,
      message,
      counselorId,
      type: 'TEMPLATE',
    })
  }

  /**
   * Send offer document
   */
  static async sendOfferDocument(
    leadId: string,
    phone: string,
    studentName: string,
    documentUrl: string,
    courseName: string,
    totalFee: number,
    counselorId: string
  ) {
    try {
      // Send document via WhatsApp Business API
      const result = await WhatsAppBusinessService.sendDocument(
        phone,
        documentUrl,
        `Cerebrum_Offer_${studentName.replace(/\s+/g, '_')}.pdf`,
        `🎓 Special Offer for ${courseName}\n\nTotal Fee: ₹${totalFee.toLocaleString('en-IN')}\n\nThis offer is personalized for you! Review and let us know. 📄`
      )

      // Track communication
      await db.communication.create({
        data: {
          leadId,
          channel: 'WHATSAPP',
          direction: 'OUTBOUND',
          message: `Sent offer document for ${courseName}`,
          status: 'SENT',
          sentBy: counselorId,
          sentAt: new Date(),
          metadata: {
            whatsappMessageId: result.messages?.[0]?.id,
            documentUrl,
            type: 'DOCUMENT',
          },
        },
      })

      return { success: true, messageId: result.messages?.[0]?.id }
    } catch (error) {
      console.error('Error sending document:', error)
      throw error
    }
  }

  /**
   * Get communication history for a lead
   */
  static async getLeadCommunications(leadId: string) {
    return db.communication.findMany({
      where: {
        leadId,
        channel: 'WHATSAPP',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    })
  }

  /**
   * Mark lead as contacted (update lastContactedAt)
   */
  static async markLeadContacted(leadId: string) {
    return db.lead.update({
      where: { id: leadId },
      data: { lastContactedAt: new Date() },
    })
  }
}
