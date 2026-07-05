/**
 * WhatsApp Business API Service
 * Handles messaging, templates, and automation for student engagement
 */

import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface WhatsAppMessage {
  to: string
  type: 'text' | 'template' | 'interactive' | 'document' | 'image'
  content: any
}

interface WhatsAppTemplate {
  name: string
  language: { code: string }
  components: TemplateComponent[]
}

interface TemplateComponent {
  type: 'header' | 'body' | 'footer' | 'button'
  parameters?: TemplateParameter[]
  sub_type?: string
  index?: string
}

interface TemplateParameter {
  type: 'text' | 'currency' | 'date_time' | 'image' | 'document'
  text?: string
  currency?: { fallback_value: string; code: string; amount_1000: number }
  date_time?: { fallback_value: string }
  image?: { link: string }
  document?: { link: string; filename: string }
}

interface QuickReplyButton {
  type: 'reply'
  reply: {
    id: string
    title: string
  }
}

interface URLButton {
  type: 'url'
  url: string
  text: string
}

export class WhatsAppBusinessService {
  // Graph API version: keep within Meta's ~2-year support window
  // (v18 expired; v25 is latest as of Jul 2026 — v24 = stable, long runway).
  private static readonly baseUrl = 'https://graph.facebook.com/v24.0'
  private static readonly phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  private static readonly accessToken = process.env.WHATSAPP_ACCESS_TOKEN

  /**
   * Send a simple text message
   */
  static async sendTextMessage(to: string, message: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: to,
          type: 'text',
          text: {
            preview_url: true,
            body: message,
          },
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(`WhatsApp API Error: ${result.error?.message || 'Unknown error'}`)
      }

      return result
    } catch (error) {
      console.error('WhatsApp Text Message Error:', error)
      throw error
    }
  }

  /**
   * Send a template message
   */
  static async sendTemplate(
    to: string,
    templateName: string,
    languageCode: string = 'en',
    components: TemplateComponent[] = []
  ): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'template',
          template: {
            name: templateName,
            language: { code: languageCode },
            components: components,
          },
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(`WhatsApp Template Error: ${result.error?.message || 'Unknown error'}`)
      }

      return result
    } catch (error) {
      console.error('WhatsApp Template Error:', error)
      throw error
    }
  }

  /**
   * Send interactive message with buttons
   */
  static async sendInteractiveMessage(
    to: string,
    headerText: string,
    bodyText: string,
    footerText: string,
    buttons: (QuickReplyButton | URLButton)[]
  ): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: to,
          type: 'interactive',
          interactive: {
            type: 'button',
            header: {
              type: 'text',
              text: headerText,
            },
            body: {
              text: bodyText,
            },
            footer: {
              text: footerText,
            },
            action: {
              buttons: buttons.slice(0, 3), // WhatsApp allows max 3 buttons
            },
          },
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(`WhatsApp Interactive Error: ${result.error?.message || 'Unknown error'}`)
      }

      return result
    } catch (error) {
      console.error('WhatsApp Interactive Message Error:', error)
      throw error
    }
  }

  /**
   * Send document message
   */
  static async sendDocument(
    to: string,
    documentUrl: string,
    filename: string,
    caption?: string
  ): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: to,
          type: 'document',
          document: {
            link: documentUrl,
            filename: filename,
            caption: caption,
          },
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(`WhatsApp Document Error: ${result.error?.message || 'Unknown error'}`)
      }

      return result
    } catch (error) {
      console.error('WhatsApp Document Error:', error)
      throw error
    }
  }

  /**
   * Education-specific messaging methods
   */

  // Welcome message for new students
  static async sendWelcomeMessage(to: string, studentName: string, courseName: string) {
    return this.sendTemplate(to, 'student_welcome', 'en', [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: studentName },
          { type: 'text', text: courseName },
        ],
      },
    ])
  }

  // Class reminder
  static async sendClassReminder(
    to: string,
    studentName: string,
    className: string,
    classTime: string,
    zoomLink: string
  ) {
    return this.sendTemplate(to, 'class_reminder', 'en', [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: studentName },
          { type: 'text', text: className },
          { type: 'text', text: classTime },
        ],
      },
      {
        type: 'button',
        sub_type: 'url',
        index: '0',
        parameters: [{ type: 'text', text: zoomLink }],
      },
    ])
  }

  // Assignment reminder
  static async sendAssignmentReminder(
    to: string,
    studentName: string,
    assignmentName: string,
    dueDate: string
  ) {
    return this.sendTemplate(to, 'assignment_reminder', 'en', [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: studentName },
          { type: 'text', text: assignmentName },
          { type: 'text', text: dueDate },
        ],
      },
    ])
  }

  // Test results notification
  static async sendTestResults(
    to: string,
    studentName: string,
    testName: string,
    score: string,
    totalMarks: string,
    reportUrl: string
  ) {
    return this.sendTemplate(to, 'test_results', 'en', [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: studentName },
          { type: 'text', text: testName },
          { type: 'text', text: score },
          { type: 'text', text: totalMarks },
        ],
      },
      {
        type: 'button',
        sub_type: 'url',
        index: '0',
        parameters: [{ type: 'text', text: reportUrl }],
      },
    ])
  }

  // Fee reminder
  static async sendFeeReminder(
    to: string,
    studentName: string,
    amount: string,
    dueDate: string,
    paymentLink: string
  ) {
    return this.sendTemplate(to, 'fee_reminder', 'en', [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: studentName },
          {
            type: 'currency',
            currency: {
              fallback_value: `₹${amount}`,
              code: 'INR',
              amount_1000: parseInt(amount) * 1000,
            },
          },
          { type: 'text', text: dueDate },
        ],
      },
      {
        type: 'button',
        sub_type: 'url',
        index: '0',
        parameters: [{ type: 'text', text: paymentLink }],
      },
    ])
  }

  // Motivational message for NEET repeaters
  static async sendMotivationalMessage(to: string, studentName: string, daysToNEET: number) {
    const motivationalTexts = [
      `🌟 ${studentName}, you're ${daysToNEET} days away from your NEET dream! Every question you solve today brings you closer to your medical college. Keep pushing! 💪`,
      `🎯 ${studentName}, ${daysToNEET} days to show the world what you're made of! Your hard work will pay off. Trust the process! 📚`,
      `🏆 ${studentName}, with ${daysToNEET} days left, remember - every topper was once a beginner. Your comeback story starts now! ⚡`,
      `💫 ${studentName}, ${daysToNEET} days to turn your setback into a comeback! Your determination will lead you to success! 🚀`,
    ]

    const randomMessage = motivationalTexts[Math.floor(Math.random() * motivationalTexts.length)]
    return this.sendTextMessage(to, randomMessage)
  }

  // Study material sharing
  static async sendStudyMaterial(
    to: string,
    studentName: string,
    materialName: string,
    materialUrl: string,
    materialType: 'pdf' | 'video' | 'notes'
  ) {
    const message = `📚 Hi ${studentName}! Here's your ${materialType} for ${materialName}. Download and start studying right away!`

    if (materialType === 'pdf') {
      return this.sendDocument(to, materialUrl, `${materialName}.pdf`, message)
    } else {
      return this.sendTextMessage(to, `${message}\n\n🔗 ${materialUrl}`)
    }
  }

  // Interactive course selection
  static async sendCourseSelection(to: string, studentName: string) {
    return this.sendInteractiveMessage(
      to,
      '🎓 Course Selection',
      `Hi ${studentName}! Which course would you like to explore?`,
      'Choose the best option for your NEET preparation',
      [
        {
          type: 'reply',
          reply: { id: 'neet_dropper', title: 'NEET Dropper Course' },
        },
        {
          type: 'reply',
          reply: { id: 'neet_repeater', title: 'NEET Repeater Course' },
        },
        {
          type: 'reply',
          reply: { id: 'crash_course', title: 'Crash Course' },
        },
      ]
    )
  }

  // Doubt clearing support
  static async sendDoubtSupport(to: string, studentName: string) {
    return this.sendInteractiveMessage(
      to,
      '❓ Doubt Clearing Support',
      `Hi ${studentName}! Need help with your studies?`,
      'Our expert teachers are here to help',
      [
        {
          type: 'reply',
          reply: { id: 'biology_doubt', title: 'Biology Doubt' },
        },
        {
          type: 'reply',
          reply: { id: 'physics_doubt', title: 'Physics Doubt' },
        },
        {
          type: 'url',
          url: 'https://cerebrumbiologyacademy.com/doubt-clearing',
          text: 'Live Doubt Session',
        },
      ]
    )
  }

  /**
   * Webhook handling for incoming messages
   */
  static async handleIncomingMessage(messageData: any) {
    try {
      const { from, text, type, interactive } = messageData

      // Handle different message types
      switch (type) {
        case 'text':
          return this.handleTextMessage(from, text.body)

        case 'interactive':
          if (interactive.type === 'button_reply') {
            return this.handleButtonReply(from, interactive.button_reply.id)
          }
          break

        default:
          console.log('Unhandled message type:', type)
      }
    } catch (error) {
      console.error('Error handling incoming message:', error)
    }
  }

  private static async handleTextMessage(from: string, message: string) {
    const lowerMessage = message.toLowerCase()

    // Auto-responses based on keywords
    if (lowerMessage.includes('doubt') || lowerMessage.includes('help')) {
      return this.sendDoubtSupport(from, 'Student')
    }

    if (lowerMessage.includes('course') || lowerMessage.includes('admission')) {
      return this.sendCourseSelection(from, 'Student')
    }

    if (lowerMessage.includes('fee') || lowerMessage.includes('payment')) {
      return this.sendTextMessage(
        from,
        `For fee-related queries, please contact our admission team at ${CONTACT_INFO.phone.display.hyphenated.primary} or visit our office.`
      )
    }

    // Default response
    return this.sendTextMessage(
      from,
      `Thank you for contacting Cerebrum Biology Academy! Our team will get back to you shortly. For immediate assistance, call ${CONTACT_INFO.phone.display.hyphenated.primary}.`
    )
  }

  private static async handleButtonReply(from: string, buttonId: string) {
    switch (buttonId) {
      case 'neet_dropper':
        return this.sendTextMessage(
          from,
          '🎯 NEET Dropper Course - 1 Year Intensive Program\n\n✅ Complete NCERT Coverage\n✅ 5000+ Practice Questions\n✅ Weekly Mock Tests\n✅ Personal Mentoring\n\nFee: ₹75,000\n\nFor enrollment: https://cerebrumbiologyacademy.com/neet-dropper'
        )

      case 'neet_repeater':
        return this.sendTextMessage(
          from,
          '🔥 NEET Repeater Course - Focused Preparation\n\n✅ Weakness Analysis\n✅ Targeted Practice\n✅ Motivation Sessions\n✅ Success Guarantee\n\nFee: ₹60,000\n\nFor enrollment: https://cerebrumbiologyacademy.com/neet-repeater'
        )

      case 'crash_course':
        return this.sendTextMessage(
          from,
          '⚡ Crash Course - Last Minute Preparation\n\n✅ High-Yield Topics\n✅ Formula Sheets\n✅ Revision Tests\n✅ Exam Strategy\n\nFee: ₹25,000\n\nFor enrollment: https://cerebrumbiologyacademy.com/crash-course'
        )

      case 'biology_doubt':
      case 'physics_doubt':
        return this.sendTextMessage(
          from,
          `👨‍🏫 Our expert teachers are available for doubt clearing!\n\n🕐 Timings: 10 AM - 8 PM\n📱 WhatsApp: ${CONTACT_INFO.phone.display.hyphenated.primary}\n💻 Live Sessions: Daily 7-8 PM\n\nSend your doubt with the chapter name for quick resolution.`
        )

      default:
        return this.sendTextMessage(
          from,
          'Thank you for your interest! Our team will contact you soon.'
        )
    }
  }
}

export type {
  WhatsAppMessage,
  WhatsAppTemplate,
  TemplateComponent,
  TemplateParameter,
  QuickReplyButton,
  URLButton,
}
