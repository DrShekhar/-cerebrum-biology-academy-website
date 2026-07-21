import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import {
  sendMetaText,
  sendMetaTemplate,
  sendMetaInteractive,
  getMetaMediaUrl,
} from '@/lib/whatsapp/metaSender'

/** Meta expects E.164 digits without '+'. Bare 10-digit numbers default to +91. */
function toMetaPhone(phone: string): string {
  const digits = (phone || '').replace(/\D/g, '')
  return digits.length === 10 ? `91${digits}` : digits
}

interface WhatsAppMessage {
  phone: string
  message: string
  type?: 'text' | 'template'
  templateName?: string
  templateParams?: string[]
}

interface LeadNurturingSequence {
  studentName: string
  phone: string
  email: string
  courseInterest: string
  stage: 'demo_booked' | 'demo_completed' | 'enrolled' | 'follow_up'
}

export class WhatsAppService {
  private apiUrl: string
  private accessToken: string

  constructor() {
    this.apiUrl = process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v24.0'
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || ''
  }

  async sendMessage(messageData: WhatsAppMessage): Promise<boolean> {
    try {
      const to = toMetaPhone(messageData.phone)
      if (!to) return false

      // Send directly via the Meta WhatsApp Cloud API. (Was a relative-URL
      // fetch to /api/whatsapp/send — which throws server-side AND is admin-
      // gated — so every auto-reply silently no-op'd.) sendMeta* return false
      // and log when the WhatsApp env is not configured; they never throw.
      const result =
        messageData.type === 'template' && messageData.templateName
          ? await sendMetaTemplate({
              to,
              templateName: messageData.templateName,
              bodyValues: messageData.templateParams,
            })
          : await sendMetaText(to, messageData.message)

      if (!result.success) {
        console.warn('WhatsApp send failed:', result.error)
      }
      return result.success
    } catch (error) {
      console.error('WhatsApp send error:', error)
      return false
    }
  }

  async sendDemoBookingConfirmation(phone: string, studentName: string, demoTime: Date) {
    const message = `🎉 Hi ${studentName}! Your NEET Biology demo class is confirmed for ${demoTime.toLocaleDateString()} at ${demoTime.toLocaleTimeString()}.

🔗 Zoom Link: [Will be sent 30 minutes before class]
📚 Topic: Cell Biology & NEET Strategy
👩‍🏫 Faculty: Dr. Priya Sharma (AIIMS Graduate)

📝 What to prepare:
• Notebook & pen
• Basic biology questions
• NEET preparation doubts

For support: ${CONTACT_INFO.phone.display.hyphenated.primary}
Website: cerebrumbiologyacademy.com

See you in class! 🌟`

    return this.sendMessage({ phone, message })
  }

  async sendEnrollmentConfirmation(phone: string, studentName: string, courseName: string) {
    const message = `🎊 Congratulations ${studentName}! Welcome to Cerebrum Biology Academy!

✅ Course Enrolled: ${courseName}
🎯 Success Rate: 98% NEET qualification
👨‍🎓 Faculty: AIIMS/JIPMER graduates

🚀 Your Learning Journey Starts Now:
• Login details sent via email
• First class: Tomorrow 6 PM
• Study materials: Available now
• Personal mentor assigned

💬 Student Support: ${CONTACT_INFO.phone.display.hyphenated.primary}
📱 Download our app: [link]

Ready to crack NEET? Let's go! 🏆`

    return this.sendMessage({ phone, message })
  }

  async sendPaymentReminder(phone: string, studentName: string, amount: number, dueDate: Date) {
    const message = `📅 Payment Reminder - Cerebrum Biology Academy

Hi ${studentName}! Your installment is due soon:

💰 Amount: ₹${amount.toLocaleString()}
📅 Due Date: ${dueDate.toLocaleDateString()}
🎯 Course: Continue your NEET preparation

💳 Pay now: [payment_link]
📞 Need help? Call: ${CONTACT_INFO.phone.display.hyphenated.primary}

Don't let anything stop your medical college dream! 🩺✨`

    return this.sendMessage({ phone, message })
  }

  async sendStudyReminder(phone: string, studentName: string, topicName: string) {
    const message = `📚 Daily Study Reminder

Hi ${studentName}! Time for today's biology session:

🔬 Today's Topic: ${topicName}
⏰ Recommended Time: 2 hours
📖 Chapter: Available in student portal

💡 Quick Tip: Make diagrams for better retention!
🎯 Target: Complete 50 MCQs today

📱 Access: cerebrumbiologyacademy.com/student
💬 Doubts? Ask in our WhatsApp group!

Keep going, future doctor! 🩺🌟`

    return this.sendMessage({ phone, message })
  }

  async sendMotivationalMessage(phone: string, studentName: string) {
    const motivationalMessages = [
      `🌟 ${studentName}, every AIIMS doctor started where you are today. Keep going!`,
      `💪 ${studentName}, your dedication today = white coat tomorrow! 🩺`,
      `🎯 ${studentName}, 540+ NEET score is just consistent effort away!`,
      `🚀 ${studentName}, you're one step closer to your medical college dream!`,
      `⭐ ${studentName}, our 98% success rate includes students just like you!`,
    ]

    const randomMessage =
      motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
    return this.sendMessage({ phone, message: randomMessage })
  }

  async startLeadNurturingSequence(leadData: LeadNurturingSequence) {
    const { studentName, phone, courseInterest, stage } = leadData

    switch (stage) {
      case 'demo_booked':
        await this.sendMessage({
          phone,
          message: `🎉 Hi ${studentName}! Thanks for booking a demo for ${courseInterest}. You'll receive joining details soon. Any questions? Reply here!`,
        })
        break

      case 'demo_completed':
        setTimeout(
          async () => {
            await this.sendMessage({
              phone,
              message: `Hi ${studentName}! How was your demo class? Ready to join our ${courseInterest} program? Special offer: 20% off if you enroll today! 🎯`,
            })
          },
          2 * 60 * 60 * 1000
        ) // 2 hours after demo
        break

      case 'follow_up':
        setTimeout(
          async () => {
            await this.sendMessage({
              phone,
              message: `Hi ${studentName}! Still thinking about ${courseInterest}? Our next batch starts soon. Don't miss out on your medical college dream! 🩺`,
            })
          },
          24 * 60 * 60 * 1000
        ) // 24 hours later
        break
    }
  }

  async sendBulkMessage(phoneNumbers: string[], message: string) {
    const results = await Promise.all(
      phoneNumbers.map((phone) => this.sendMessage({ phone, message }))
    )

    return {
      sent: results.filter(Boolean).length,
      failed: results.filter((r) => !r).length,
      total: phoneNumbers.length,
    }
  }

  async sendExamUpdateToAll(message: string) {
    // This would fetch all student phone numbers from your database
    const studentPhones = await this.getAllStudentPhones()
    return this.sendBulkMessage(studentPhones, message)
  }

  private async getAllStudentPhones(): Promise<string[]> {
    // This would integrate with your database
    // For MVP, return demo data
    return [CONTACT_INFO.phone.primary, CONTACT_INFO.phone.secondary]
  }

  async getMediaUrl(mediaId: string): Promise<string> {
    // Resolve the Meta media id to its downloadable URL. Empty string when
    // unconfigured or on failure (callers already handle the empty case).
    return (await getMetaMediaUrl(mediaId)) || ''
  }

  async sendInteractiveMessage(phoneNumberId: string, message: any): Promise<boolean> {
    // The caller builds a full Meta payload; the recipient is message.to and
    // the buttons/list live in message.interactive.
    try {
      const to = toMetaPhone(message?.to || '')
      if (!to || !message?.interactive) return false
      const result = await sendMetaInteractive(to, message.interactive)
      if (!result.success) {
        console.warn('WhatsApp interactive send failed:', result.error)
      }
      return result.success
    } catch (error) {
      console.error('WhatsApp interactive send error:', error)
      return false
    }
  }
}

export const whatsappService = new WhatsAppService()
