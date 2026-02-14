/**
 * AI Message Handler for WhatsApp Bot
 * Connects to AI Tutor API and processes student messages
 *
 * Features:
 * - AI-powered biology tutoring
 * - Command processing (HELP, DEMO, TEST, etc.)
 * - Session management
 * - Response formatting for WhatsApp
 * - Student identification and tracking
 */

import { SessionManager } from './sessionManager'
import { DemoBookingService } from './demoBooking'
import { WhatsAppTemplates } from './templates'
import { prisma } from '@/lib/prisma'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface MessageData {
  from: string
  text: string
  messageId: string
  phoneNumberId: string
  name: string
  timestamp: string
  messageType: string
}

interface TutorResponse {
  answer: string
  relatedTopics: string[]
  suggestedQuestions: string[]
  ncertReferences: string[]
  confidence: number
  tokensUsed: number
}

export class AIMessageHandler {
  private sessionManager: SessionManager
  private demoBooking: DemoBookingService
  private templates: WhatsAppTemplates

  constructor() {
    this.sessionManager = new SessionManager()
    this.demoBooking = new DemoBookingService()
    this.templates = new WhatsAppTemplates()
  }

  /**
   * Main message processing function
   */
  async processMessage(messageData: MessageData): Promise<void> {
    const { from, text, messageId, phoneNumberId, name, timestamp } = messageData

    try {
      console.log(`🎓 Processing message from ${name}: "${text.substring(0, 50)}..."`)

      // Get or create session
      const session = await this.sessionManager.getOrCreateSession(from, name)

      // Check if user is in a conversation flow (demo booking, etc.)
      if (session.conversationContext.currentFlow) {
        await this.handleConversationFlow(messageData, session)
        return
      }

      // Check if message is a command
      const command = this.extractCommand(text)
      if (command) {
        await this.handleCommand(command, messageData)
        return
      }

      // Process as biology question
      await this.handleBiologyQuestion(messageData, session)

      // Log interaction for analytics
      await this.logInteraction(messageData, 'question')
    } catch (error) {
      console.error('❌ Error in processMessage:', error)
      throw error
    }
  }

  /**
   * Extract command from message text
   */
  private extractCommand(text: string): string | null {
    const normalizedText = text.trim().toUpperCase()

    const commands = ['HELP', 'MENU', 'START', 'DEMO', 'TEST', 'STATUS', 'SUPPORT', 'HI', 'HELLO']

    for (const cmd of commands) {
      if (normalizedText === cmd || normalizedText.startsWith(cmd + ' ')) {
        return cmd
      }
    }

    return null
  }

  /**
   * Handle commands (HELP, DEMO, TEST, etc.)
   */
  private async handleCommand(command: string, messageData: MessageData): Promise<void> {
    const { from, phoneNumberId, name } = messageData

    console.log(`🎯 Handling command: ${command} from ${name}`)

    let response = ''

    switch (command) {
      case 'HELP':
      case 'MENU':
      case 'START':
      case 'HI':
      case 'HELLO':
        response = this.templates.getWelcomeMessage(name)
        break

      case 'DEMO':
        await this.demoBooking.startDemoBooking(from, phoneNumberId, name)
        return

      case 'TEST':
        response = this.templates.getTestMessage()
        break

      case 'STATUS':
        response = await this.getEnrollmentStatus(from)
        break

      case 'SUPPORT':
        response = this.templates.getSupportMessage()
        break

      default:
        response = this.templates.getWelcomeMessage(name)
    }

    await this.sendWhatsAppMessage(from, phoneNumberId, response)
    await this.logInteraction(messageData, 'command', { command })
  }

  /**
   * Handle biology questions using AI Tutor API
   */
  private async handleBiologyQuestion(messageData: MessageData, session: any): Promise<void> {
    const { from, text, phoneNumberId, name } = messageData

    try {
      // Get student ID (if enrolled)
      const studentId = await this.getStudentId(from)

      // Call AI Tutor API
      const aiResponse = await this.callAITutorAPI(text, studentId, session)

      // Format response for WhatsApp
      const formattedResponse = this.formatAIResponse(aiResponse, name)

      // Send response
      await this.sendWhatsAppMessage(from, phoneNumberId, formattedResponse)

      // Update session context
      await this.sessionManager.addToContext(from, {
        role: 'user',
        content: text,
        timestamp: new Date(),
      })

      await this.sessionManager.addToContext(from, {
        role: 'assistant',
        content: aiResponse.answer,
        timestamp: new Date(),
      })

      // Log successful interaction
      await this.logInteraction(messageData, 'ai_response', {
        tokensUsed: aiResponse.tokensUsed,
        confidence: aiResponse.confidence,
      })
    } catch (error) {
      console.error('❌ Error handling biology question:', error)
      throw error
    }
  }

  /**
   * Call AI Tutor API
   */
  private async callAITutorAPI(
    question: string,
    studentId: string,
    session: any
  ): Promise<TutorResponse> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/ai/tutor`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question,
            studentId,
            context: {
              previousQuestions: session.conversationContext.messages
                .filter((m: any) => m.role === 'user')
                .slice(-3)
                .map((m: any) => m.content),
            },
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`AI Tutor API error: ${response.status}`)
      }

      const data: TutorResponse = await response.json()
      return data
    } catch (error) {
      console.error('❌ AI Tutor API call failed:', error)

      // Return fallback response
      return {
        answer: `I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or call our support team at ${CONTACT_INFO.phone.display.primary} for immediate help!`,
        relatedTopics: [],
        suggestedQuestions: [],
        ncertReferences: [],
        confidence: 0,
        tokensUsed: 0,
      }
    }
  }

  /**
   * Format AI response for WhatsApp (max 4096 chars)
   */
  private formatAIResponse(aiResponse: TutorResponse, studentName: string): string {
    let message = `📚 *Biology Tutor Answer for ${studentName}:*\n\n${aiResponse.answer}\n\n`

    // Add NCERT references if available
    if (aiResponse.ncertReferences.length > 0) {
      message += `📖 *NCERT References:*\n`
      aiResponse.ncertReferences.forEach((ref) => {
        message += `• ${ref}\n`
      })
      message += '\n'
    }

    // Add related topics if available
    if (aiResponse.relatedTopics.length > 0) {
      message += `🔗 *Related Topics to Explore:*\n`
      aiResponse.relatedTopics.slice(0, 3).forEach((topic) => {
        message += `• ${topic}\n`
      })
      message += '\n'
    }

    // Add suggested follow-up questions
    if (aiResponse.suggestedQuestions.length > 0) {
      message += `💡 *You might also ask:*\n`
      aiResponse.suggestedQuestions.slice(0, 2).forEach((q, i) => {
        message += `${i + 1}. ${q}\n`
      })
      message += '\n'
    }

    message += `_Powered by Cerebrum AI • Available 24/7_\n`
    message += `\nNeed more help? Send MENU to see all options.`

    // Truncate if too long (WhatsApp limit: 4096 chars)
    if (message.length > 4000) {
      message =
        message.substring(0, 3900) +
        '...\n\n_Response truncated. Ask "explain in more detail" for full answer!_\n\n_Powered by Cerebrum AI_'
    }

    return message
  }

  /**
   * Handle conversation flows (demo booking, etc.)
   */
  private async handleConversationFlow(messageData: MessageData, session: any): Promise<void> {
    const { from, text, phoneNumberId } = messageData

    if (session.currentFlow === 'demo_booking') {
      await this.demoBooking.handleDemoBookingFlow(from, phoneNumberId, text, session)
    }
    // Add more flows as needed
  }

  /**
   * Get enrollment status for a student
   */
  private async getEnrollmentStatus(phoneNumber: string): Promise<string> {
    try {
      const user = await prisma.users.findUnique({
        where: { phone: phoneNumber },
        include: {
          enrollments: {
            include: {
              course: true,
            },
            where: {
              status: 'ACTIVE',
            },
          },
        },
      })

      if (!user || user.enrollments.length === 0) {
        return this.templates.getNotEnrolledMessage()
      }

      // User has active enrollments
      let message = `👨‍🎓 *Your Enrollment Status*\n\nHi ${user.name}! You are enrolled in:\n\n`

      user.enrollments.forEach((enrollment, index) => {
        message += `${index + 1}. ${enrollment.course.name}\n`
        message += `   📊 Progress: ${enrollment.currentProgress}%\n`
        message += `   💰 Payment: ₹${enrollment.paidAmount / 100} / ₹${enrollment.totalFees / 100}\n\n`
      })

      message += `🎯 Keep going! You're doing great!\n\n`
      message += `Access your dashboard: ${process.env.NEXT_PUBLIC_SITE_URL}/student/dashboard`

      return message
    } catch (error) {
      console.error('❌ Error getting enrollment status:', error)
      return this.templates.getErrorMessage()
    }
  }

  /**
   * Get student ID from phone number
   */
  private async getStudentId(phoneNumber: string): Promise<string> {
    try {
      const user = await prisma.users.findUnique({
        where: { phone: phoneNumber },
        select: { id: true },
      })

      return user?.id || 'anonymous_' + phoneNumber
    } catch (error) {
      console.error('❌ Error getting student ID:', error)
      return 'anonymous_' + phoneNumber
    }
  }

  /**
   * Send WhatsApp message
   */
  async sendWhatsAppMessage(to: string, phoneNumberId: string, message: string): Promise<void> {
    try {
      const apiUrl = `${process.env.WHATSAPP_API_URL}/${phoneNumberId}/messages`
      const accessToken = process.env.WHATSAPP_ACCESS_TOKEN

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
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

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`WhatsApp API error: ${JSON.stringify(errorData)}`)
      }

      console.log(`✅ Message sent to ${to}`)
    } catch (error) {
      console.error('❌ Error sending WhatsApp message:', error)
      throw error
    }
  }

  /**
   * Send rate limit message
   */
  async sendRateLimitMessage(to: string, phoneNumberId: string): Promise<void> {
    const message = this.templates.getRateLimitMessage()
    await this.sendWhatsAppMessage(to, phoneNumberId, message)
  }

  /**
   * Send error message
   */
  async sendErrorMessage(to: string, phoneNumberId: string, errorMsg: string): Promise<void> {
    await this.sendWhatsAppMessage(to, phoneNumberId, errorMsg)
  }

  /**
   * Log interaction to database for analytics
   */
  private async logInteraction(
    messageData: MessageData,
    type: string,
    metadata?: any
  ): Promise<void> {
    try {
      const user = await prisma.users.findUnique({
        where: { phone: messageData.from },
      })

      await prisma.communication_logs.create({
        data: {
          userId: user?.id,
          type: type === 'command' ? 'CUSTOM_MESSAGE' : 'SUPPORT_MESSAGE',
          channel: 'WHATSAPP',
          content: messageData.text,
          subject: type === 'ai_response' ? 'AI Tutor Response' : 'WhatsApp Bot Interaction',
          status: 'SENT',
          whatsappMessageId: messageData.messageId,
          templateData: metadata,
        },
      })
    } catch (error) {
      console.error('❌ Error logging interaction:', error)
      // Don't throw - logging failure shouldn't break the flow
    }
  }
}
