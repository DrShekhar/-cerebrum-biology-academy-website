/**
 * WhatsApp Business API Automation Service
 * Handles automated student engagement flows, drip campaigns, and quick actions
 */

import { WhatsAppBusinessService } from './whatsappBusinessService'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface AutomationTrigger {
  type: 'welcome' | 'abandoned_cart' | 'engagement' | 'reminder' | 'follow_up'
  userId: string
  metadata?: Record<string, any>
}

interface DelayedMessage {
  id: string
  userId: string
  phone: string
  triggerType: string
  scheduledTime: Date
  messageType: 'text' | 'template' | 'interactive' | 'document'
  content: any
  status: 'pending' | 'sent' | 'failed' | 'cancelled'
}

interface UserEngagementState {
  userId: string
  phone: string
  stage: 'inquiry' | 'interested' | 'enrolled' | 'active_student' | 'inactive'
  lastInteraction: Date
  engagementScore: number
  preferences: {
    dailyTips: boolean
    weeklyMotivation: boolean
    progressUpdates: boolean
    parentUpdates: boolean
  }
}

export class WhatsAppAutomationService {
  private static messageQueue: DelayedMessage[] = []
  private static userStates: Map<string, UserEngagementState> = new Map()

  /**
   * Initialize automation for a new user
   */
  static async initializeUser(userData: {
    userId: string
    phone: string
    name: string
    email?: string
    source: string
    metadata?: Record<string, any>
  }) {
    // Set initial user state
    this.userStates.set(userData.userId, {
      userId: userData.userId,
      phone: userData.phone,
      stage: 'inquiry',
      lastInteraction: new Date(),
      engagementScore: 0,
      preferences: {
        dailyTips: true,
        weeklyMotivation: true,
        progressUpdates: true,
        parentUpdates: false,
      },
    })

    // Trigger welcome series
    await this.triggerWelcomeSeries(userData)
  }

  /**
   * Welcome Series Automation Flow
   */
  static async triggerWelcomeSeries(userData: {
    userId: string
    phone: string
    name: string
    source: string
  }) {
    const baseDelay = new Date()

    // Instant welcome message
    await this.scheduleMessage({
      userId: userData.userId,
      phone: userData.phone,
      delay: 0, // Immediate
      messageType: 'template',
      templateName: 'welcome_instant',
      content: {
        name: userData.name,
        source: userData.source,
      },
    })

    // 5 minutes: Share success story video
    await this.scheduleMessage({
      userId: userData.userId,
      phone: userData.phone,
      delay: 5 * 60 * 1000, // 5 minutes
      messageType: 'text',
      content: `🎯 Hi ${userData.name}! Here's an inspiring success story from Arjun, who cleared NEET after failing twice:\n\n🎥 https://cerebrumbiologyacademy.com/success/arjun-sharma\n\n"The best time to plant a tree was 20 years ago. The second best time is now!" 🌟`,
    })

    // 1 hour: Send course brochure PDF
    await this.scheduleMessage({
      userId: userData.userId,
      phone: userData.phone,
      delay: 60 * 60 * 1000, // 1 hour
      messageType: 'document',
      content: {
        documentUrl: 'https://cerebrumbiologyacademy.com/downloads/course-brochure.pdf',
        filename: 'Cerebrum Biology Academy - Course Brochure.pdf',
        caption: `📚 ${userData.name}, here's our complete course brochure with detailed curriculum, faculty profiles, and fee structure.`,
      },
    })

    // 1 day: Counseling session booking link
    await this.scheduleMessage({
      userId: userData.userId,
      phone: userData.phone,
      delay: 24 * 60 * 60 * 1000, // 1 day
      messageType: 'interactive',
      content: {
        headerText: '🎓 Free Counseling Session',
        bodyText: `Hi ${userData.name}! Ready to start your NEET success journey? Book a FREE counseling session with our expert advisors.`,
        footerText: 'No commitment required - just guidance!',
        buttons: [
          {
            type: 'url',
            url: 'https://cerebrumbiologyacademy.com/book-counseling',
            text: 'Book Free Session',
          },
          {
            type: 'reply',
            reply: { id: 'call_request', title: 'Request Call Back' },
          },
        ],
      },
    })

    // 3 days: Limited time offer
    await this.scheduleMessage({
      userId: userData.userId,
      phone: userData.phone,
      delay: 3 * 24 * 60 * 60 * 1000, // 3 days
      messageType: 'template',
      templateName: 'limited_offer',
      content: {
        name: userData.name,
        discount: '25%',
        validTill: this.getFormattedDate(7), // Valid for 7 days from trigger
      },
    })
  }

  /**
   * Abandoned Cart Recovery Flow
   */
  static async triggerAbandonedCartFlow(cartData: {
    userId: string
    phone: string
    name: string
    courseName: string
    amount: number
    cartId: string
  }) {
    // 2 hours: Complete enrollment reminder
    await this.scheduleMessage({
      userId: cartData.userId,
      phone: cartData.phone,
      delay: 2 * 60 * 60 * 1000, // 2 hours
      messageType: 'interactive',
      content: {
        headerText: '⏰ Complete Your Enrollment',
        bodyText: `Hi ${cartData.name}! You're just one step away from starting your NEET success journey with ${cartData.courseName}.`,
        footerText: 'Secure your seat before it fills up!',
        buttons: [
          {
            type: 'url',
            url: `https://cerebrumbiologyacademy.com/checkout?cart=${cartData.cartId}`,
            text: 'Complete Payment',
          },
          {
            type: 'reply',
            reply: { id: 'need_help', title: 'Need Help?' },
          },
        ],
      },
    })

    // 1 day: Exclusive discount
    await this.scheduleMessage({
      userId: cartData.userId,
      phone: cartData.phone,
      delay: 24 * 60 * 60 * 1000, // 1 day
      messageType: 'template',
      templateName: 'cart_recovery_discount',
      content: {
        name: cartData.name,
        courseName: cartData.courseName,
        discount: '10%',
        originalAmount: cartData.amount,
        discountedAmount: Math.round(cartData.amount * 0.9),
      },
    })

    // 3 days: Talk to successful students
    await this.scheduleMessage({
      userId: cartData.userId,
      phone: cartData.phone,
      delay: 3 * 24 * 60 * 60 * 1000, // 3 days
      messageType: 'text',
      content: `🗣️ Hi ${cartData.name}! Want to hear directly from students who cleared NEET with us?\n\n💬 Join our student interaction session today at 7 PM:\nhttps://cerebrumbiologyacademy.com/student-interaction\n\nOr connect one-on-one: ${CONTACT_INFO.phone.display.hyphenated.primary}\n\n"Success stories inspire success!" 🌟`,
    })

    // 7 days: Last chance offer
    await this.scheduleMessage({
      userId: cartData.userId,
      phone: cartData.phone,
      delay: 7 * 24 * 60 * 60 * 1000, // 7 days
      messageType: 'template',
      templateName: 'last_chance_offer',
      content: {
        name: cartData.name,
        courseName: cartData.courseName,
        finalDiscount: '20%',
        validTill: this.getFormattedDate(2), // Valid for 2 days
      },
    })
  }

  /**
   * Student Engagement Flow (for enrolled students)
   */
  static async triggerStudentEngagement(studentData: {
    userId: string
    phone: string
    name: string
    courseId: string
    enrollmentDate: Date
  }) {
    const userState = this.userStates.get(studentData.userId)
    if (!userState) return

    // Daily biology tip (if preference is enabled)
    if (userState.preferences.dailyTips) {
      await this.scheduleDailyTips(studentData)
    }

    // Weekly motivational message
    if (userState.preferences.weeklyMotivation) {
      await this.scheduleWeeklyMotivation(studentData)
    }

    // Bi-weekly progress check-in
    if (userState.preferences.progressUpdates) {
      await this.scheduleProgressCheckins(studentData)
    }

    // Monthly parent updates
    if (userState.preferences.parentUpdates) {
      await this.scheduleParentUpdates(studentData)
    }
  }

  /**
   * Quick Actions Menu System
   */
  static async handleQuickAction(actionData: {
    userId: string
    phone: string
    action: string
    additionalData?: Record<string, any>
  }) {
    switch (actionData.action) {
      case 'book_counseling':
        return this.handleCounselingBooking(actionData)

      case 'get_fee_structure':
        return this.handleFeeStructureRequest(actionData)

      case 'talk_to_counselor':
        return this.handleCounselorRequest(actionData)

      case 'download_material':
        return this.handleMaterialDownload(actionData)

      case 'check_batch_timing':
        return this.handleBatchTimingInquiry(actionData)

      case 'pay_fees':
        return this.handleFeePayment(actionData)

      case 'mark_attendance':
        return this.handleAttendanceMarking(actionData)

      case 'submit_doubt':
        return this.handleDoubtSubmission(actionData)

      default:
        return this.handleDefaultAction(actionData)
    }
  }

  /**
   * Message Scheduling System
   */
  private static async scheduleMessage(messageData: {
    userId: string
    phone: string
    delay: number
    messageType: 'text' | 'template' | 'interactive' | 'document'
    templateName?: string
    content: any
  }) {
    const scheduledTime = new Date(Date.now() + messageData.delay)
    const messageId = `${messageData.userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const delayedMessage: DelayedMessage = {
      id: messageId,
      userId: messageData.userId,
      phone: messageData.phone,
      triggerType: 'automation',
      scheduledTime,
      messageType: messageData.messageType,
      content: messageData.content,
      status: 'pending',
    }

    this.messageQueue.push(delayedMessage)

    // Schedule immediate execution for instant messages
    if (messageData.delay === 0) {
      await this.executeMessage(delayedMessage)
    } else {
      // In production, use a proper job queue like Bull or Redis
      setTimeout(async () => {
        await this.executeMessage(delayedMessage)
      }, messageData.delay)
    }

    return messageId
  }

  private static async executeMessage(message: DelayedMessage) {
    try {
      let result

      switch (message.messageType) {
        case 'text':
          result = await WhatsAppBusinessService.sendTextMessage(message.phone, message.content)
          break

        case 'template':
          result = await WhatsAppBusinessService.sendTemplate(
            message.phone,
            message.content.templateName,
            'en',
            message.content.components || []
          )
          break

        case 'interactive':
          result = await WhatsAppBusinessService.sendInteractiveMessage(
            message.phone,
            message.content.headerText,
            message.content.bodyText,
            message.content.footerText,
            message.content.buttons
          )
          break

        case 'document':
          result = await WhatsAppBusinessService.sendDocument(
            message.phone,
            message.content.documentUrl,
            message.content.filename,
            message.content.caption
          )
          break
      }

      message.status = 'sent'
      this.updateEngagementScore(message.userId, 1)

      console.log('Message sent successfully:', result)
    } catch (error) {
      message.status = 'failed'
      console.error('Failed to send scheduled message:', error)
    }
  }

  /**
   * Daily Tips Scheduling
   */
  private static async scheduleDailyTips(studentData: {
    userId: string
    phone: string
    name: string
  }) {
    const tips = [
      `🧬 Daily Biology Tip: Remember the Central Dogma - DNA → RNA → Protein. This flow is fundamental to understanding molecular biology!`,
      `🌱 Photosynthesis Tip: Light reactions occur in thylakoids, dark reactions in stroma. Remember: "Light Thylakoids, Dark Stroma"!`,
      `🩸 Circulation Tip: Systolic pressure = Heart contraction, Diastolic pressure = Heart relaxation. Normal BP is 120/80 mmHg.`,
      `🧠 Nervous System Tip: Neurons never regenerate in CNS but can regenerate in PNS. Remember this key difference!`,
      `🔬 Cell Division Tip: Mitosis = Growth, Meiosis = Gametes. "M for More cells, M for Marriage (reproduction)"!`,
    ]

    const randomTip = tips[Math.floor(Math.random() * tips.length)]

    await this.scheduleMessage({
      userId: studentData.userId,
      phone: studentData.phone,
      delay: 0, // Send immediately, then schedule for tomorrow
      messageType: 'text',
      content: `Good morning ${studentData.name}! 🌅\n\n${randomTip}\n\nKeep learning, keep growing! 💪`,
    })
  }

  /**
   * Weekly Motivation Scheduling
   */
  private static async scheduleWeeklyMotivation(studentData: {
    userId: string
    phone: string
    name: string
  }) {
    const motivationalMessages = [
      `🌟 Weekly Motivation: Success is the sum of small efforts repeated day in and day out. Keep pushing forward, ${studentData.name}!`,
      `💪 Remember: Every expert was once a beginner. Your NEET journey is unique and you're making progress every day!`,
      `🎯 This week's focus: Stay consistent with your studies. Small daily progress leads to big results!`,
    ]

    const randomMessage =
      motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]

    await this.scheduleMessage({
      userId: studentData.userId,
      phone: studentData.phone,
      delay: 0,
      messageType: 'text',
      content: randomMessage,
    })
  }

  /**
   * Progress Check-ins Scheduling
   */
  private static async scheduleProgressCheckins(studentData: {
    userId: string
    phone: string
    name: string
  }) {
    await this.scheduleMessage({
      userId: studentData.userId,
      phone: studentData.phone,
      delay: 0,
      messageType: 'text',
      content: `Hi ${studentData.name}! 📊\n\nTime for your bi-weekly progress check-in. How are your studies going?\n\nReply with:\n1 - Excellent\n2 - Good\n3 - Need help\n\nWe're here to support you! 💪`,
    })
  }

  /**
   * Parent Updates Scheduling
   */
  private static async scheduleParentUpdates(studentData: {
    userId: string
    phone: string
    name: string
  }) {
    await this.scheduleMessage({
      userId: studentData.userId,
      phone: studentData.phone,
      delay: 0,
      messageType: 'text',
      content: `📈 Monthly Progress Update for ${studentData.name}\n\nDear Parents,\n\nYour child is making steady progress in their NEET preparation. Detailed report will be shared soon.\n\nFor queries, contact: ${CONTACT_INFO.phone.display.hyphenated.primary}`,
    })
  }

  /**
   * Quick Action Handlers
   */
  private static async handleCounselingBooking(actionData: any) {
    return WhatsAppBusinessService.sendInteractiveMessage(
      actionData.phone,
      '🎓 Book Counseling Session',
      'Choose your preferred counseling option:',
      'Our expert counselors are here to guide you',
      [
        {
          type: 'url',
          url: 'https://cerebrumbiologyacademy.com/book-counseling',
          text: 'Online Booking',
        },
        {
          type: 'reply',
          reply: { id: 'immediate_call', title: 'Call Now' },
        },
      ]
    )
  }

  private static async handleFeeStructureRequest(actionData: any) {
    return WhatsAppBusinessService.sendDocument(
      actionData.phone,
      'https://cerebrumbiologyacademy.com/downloads/fee-structure.pdf',
      'Fee Structure 2024-25.pdf',
      "💰 Here's our complete fee structure with all courses and payment options. We also offer flexible EMI plans!"
    )
  }

  private static async handleCounselorRequest(actionData: any) {
    return WhatsAppBusinessService.sendTextMessage(
      actionData.phone,
      '👨‍🏫 Connect with our expert counselor immediately!\n\n📞 Call: ${CONTACT_INFO.phone.display.hyphenated.primary}\n📱 WhatsApp: ${CONTACT_INFO.phone.display.hyphenated.primary}\n\n🕐 Available: 9 AM - 8 PM (Mon-Sat)\n\nOur counselors will help you choose the right course and create a personalized study plan! 🎯'
    )
  }

  private static async handleMaterialDownload(actionData: any) {
    return WhatsAppBusinessService.sendInteractiveMessage(
      actionData.phone,
      '📚 Download Study Materials',
      'Choose the study material you need:',
      'All materials are updated as per latest NEET pattern',
      [
        {
          type: 'reply',
          reply: { id: 'biology_notes', title: 'Biology Notes' },
        },
        {
          type: 'reply',
          reply: { id: 'previous_papers', title: 'Previous Papers' },
        },
        {
          type: 'url',
          url: 'https://cerebrumbiologyacademy.com/downloads',
          text: 'All Materials',
        },
      ]
    )
  }

  private static async handleBatchTimingInquiry(actionData: any) {
    return WhatsAppBusinessService.sendInteractiveMessage(
      actionData.phone,
      '⏰ Batch Timings',
      'Our batches are scheduled at convenient times:',
      'Choose the batch that suits you best',
      [
        {
          type: 'reply',
          reply: { id: 'morning_batch', title: 'Morning 6-8 AM' },
        },
        {
          type: 'reply',
          reply: { id: 'evening_batch', title: 'Evening 6-8 PM' },
        },
        {
          type: 'url',
          url: 'https://cerebrumbiologyacademy.com/batches',
          text: 'View All Batches',
        },
      ]
    )
  }

  private static async handleFeePayment(actionData: any) {
    return WhatsAppBusinessService.sendInteractiveMessage(
      actionData.phone,
      '💰 Fee Payment',
      'Multiple payment options available:',
      'Choose your preferred payment method',
      [
        {
          type: 'url',
          url: 'https://cerebrumbiologyacademy.com/payment',
          text: 'Pay Online',
        },
        {
          type: 'reply',
          reply: { id: 'emi_option', title: 'EMI Options' },
        },
        {
          type: 'reply',
          reply: { id: 'fee_structure', title: 'Fee Structure' },
        },
      ]
    )
  }

  private static async handleAttendanceMarking(actionData: any) {
    return WhatsAppBusinessService.sendTextMessage(
      actionData.phone,
      "✅ Attendance Marked Successfully!\n\nYour attendance has been recorded for today's session.\n\nAttendance: 95%\nClasses Attended: 38/40\n\nKeep up the great work! 🎯"
    )
  }

  private static async handleDoubtSubmission(actionData: any) {
    return WhatsAppBusinessService.sendTextMessage(
      actionData.phone,
      "❓ Submit Your Doubt\n\nPlease type your Biology doubt and our expert faculty will resolve it within 24 hours.\n\nYou can also:\n📸 Send images of your question\n🎥 Schedule a live doubt session\n\nWe're here to help! 👨‍🏫"
    )
  }

  private static async handleDefaultAction(actionData: any) {
    return WhatsAppBusinessService.sendTextMessage(
      actionData.phone,
      'Thank you for reaching out! Our team will assist you shortly. For immediate help, call ${CONTACT_INFO.phone.display.hyphenated.primary}.'
    )
  }

  /**
   * Engagement Tracking
   */
  private static updateEngagementScore(userId: string, points: number) {
    const userState = this.userStates.get(userId)
    if (userState) {
      userState.engagementScore += points
      userState.lastInteraction = new Date()
      this.userStates.set(userId, userState)
    }
  }

  private static getFormattedDate(daysFromNow: number): string {
    const date = new Date()
    date.setDate(date.getDate() + daysFromNow)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  /**
   * Webhook Handler for Real-time Responses
   */
  static async handleWebhook(webhookData: any) {
    const { entry } = webhookData

    for (const entryItem of entry) {
      const { changes } = entryItem

      for (const change of changes) {
        if (change.field === 'messages') {
          const { messages } = change.value

          for (const message of messages) {
            await this.processIncomingMessage(message)
          }
        }
      }
    }
  }

  private static async processIncomingMessage(message: any) {
    const { from, text, interactive, type } = message

    // Update engagement score for any incoming message
    this.updateEngagementScore(from, 2)

    // Handle different message types
    if (type === 'text' && text) {
      await this.handleTextResponse(from, text.body)
    } else if (type === 'interactive' && interactive) {
      await this.handleInteractiveResponse(from, interactive)
    }
  }

  private static async handleTextResponse(phone: string, messageText: string) {
    const lowerText = messageText.toLowerCase()

    // Intent detection and appropriate responses
    if (lowerText.includes('fee') || lowerText.includes('cost') || lowerText.includes('price')) {
      await this.handleQuickAction({ userId: phone, phone, action: 'get_fee_structure' })
    } else if (lowerText.includes('counseling') || lowerText.includes('guidance')) {
      await this.handleQuickAction({ userId: phone, phone, action: 'book_counseling' })
    } else if (
      lowerText.includes('material') ||
      lowerText.includes('notes') ||
      lowerText.includes('books')
    ) {
      await this.handleQuickAction({ userId: phone, phone, action: 'download_material' })
    } else if (
      lowerText.includes('timing') ||
      lowerText.includes('schedule') ||
      lowerText.includes('batch')
    ) {
      await this.handleQuickAction({ userId: phone, phone, action: 'check_batch_timing' })
    } else {
      // Default helpful response
      await WhatsAppBusinessService.sendTextMessage(
        phone,
        'Thank you for your message! How can I help you today?\n\n🎓 Book counseling\n💰 Get fee structure\n📚 Download materials\n⏰ Check batch timings\n📞 Call: ${CONTACT_INFO.phone.display.hyphenated.primary}'
      )
    }
  }

  private static async handleInteractiveResponse(phone: string, interactive: any) {
    if (interactive.type === 'button_reply') {
      const buttonId = interactive.button_reply.id
      await this.handleQuickAction({ userId: phone, phone, action: buttonId })
    }
  }
}

export type { AutomationTrigger, DelayedMessage, UserEngagementState }
