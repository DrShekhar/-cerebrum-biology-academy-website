// WhatsApp Business API Integration for NEET Coaching Platform
// Optimized for Indian market with automation and remarketing capabilities

import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export interface WhatsAppMessage {
  id: string
  to: string // Phone number with country code (+91)
  type: 'text' | 'template' | 'media' | 'interactive' | 'location'
  content: any
  status: 'queued' | 'sent' | 'delivered' | 'read' | 'failed'
  timestamp: number
  campaignId?: string
  userId?: string
  contextType?: 'enrollment' | 'demo' | 'payment' | 'support' | 'marketing'
  metadata?: Record<string, any>
}

export interface WhatsAppTemplate {
  id: string
  name: string
  category: 'marketing' | 'utility' | 'authentication'
  language: 'en' | 'hi' | 'ta' | 'te' | 'bn' // English, Hindi, Tamil, Telugu, Bengali
  status: 'approved' | 'pending' | 'rejected'
  components: TemplateComponent[]
  createdAt: number
  updatedAt: number
}

export interface TemplateComponent {
  type: 'header' | 'body' | 'footer' | 'buttons'
  format?: 'text' | 'media' | 'location'
  text?: string
  parameters?: TemplateParameter[]
  buttons?: TemplateButton[]
}

export interface TemplateParameter {
  type: 'text' | 'currency' | 'date_time'
  text?: string
  currency?: { fallback_value: string; code: string; amount_1000: number }
  date_time?: { fallback_value: string }
}

export interface TemplateButton {
  type: 'quick_reply' | 'url' | 'phone_number'
  text: string
  url?: string
  phone_number?: string
}

export interface WhatsAppCampaign {
  id: string
  name: string
  templateId: string
  targetAudience: {
    userIds?: string[]
    criteria?: {
      class?: ('11th' | '12th' | 'Dropper')[]
      enrollmentStatus?: ('enrolled' | 'demo_taken' | 'lead')[]
      city?: string[]
      lastActivity?: number // Days since last activity
    }
  }
  scheduledAt?: number
  status: 'draft' | 'scheduled' | 'running' | 'completed' | 'cancelled'
  metrics: {
    sent: number
    delivered: number
    read: number
    replied: number
    failed: number
    optedOut: number
  }
  createdAt: number
  createdBy: string
}

export interface WhatsAppAutomation {
  id: string
  name: string
  trigger: {
    event: 'demo_booking' | 'enrollment' | 'payment_pending' | 'class_missed' | 'course_completion'
    conditions?: Record<string, any>
  }
  actions: WhatsAppAutomationAction[]
  isActive: boolean
  delayMinutes?: number
  createdAt: number
}

export interface WhatsAppAutomationAction {
  type: 'send_template' | 'add_to_campaign' | 'notify_admin' | 'create_task'
  templateId?: string
  parameters?: Record<string, string>
  assignToUserId?: string
}

// WhatsApp Business API Implementation
export class WhatsAppBusinessAPI {
  private baseUrl = 'https://graph.facebook.com/v17.0'
  private phoneNumberId: string
  private accessToken: string
  private webhookSecret: string
  private messageQueue: WhatsAppMessage[] = []

  constructor(config: { phoneNumberId: string; accessToken: string; webhookSecret: string }) {
    this.phoneNumberId = config.phoneNumberId
    this.accessToken = config.accessToken
    this.webhookSecret = config.webhookSecret
  }

  // Send Text Message
  async sendTextMessage(
    to: string,
    message: string,
    context?: { userId?: string; campaignId?: string }
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const whatsappMessage: WhatsAppMessage = {
        id: this.generateMessageId(),
        to: this.formatPhoneNumber(to),
        type: 'text',
        content: { text: message },
        status: 'queued',
        timestamp: Date.now(),
        userId: context?.userId,
        campaignId: context?.campaignId,
      }

      // Add to queue for processing
      this.messageQueue.push(whatsappMessage)

      // Process immediately if queue is not busy
      const result = await this.processMessage(whatsappMessage)

      return result
    } catch (error) {
      console.error('WhatsApp send message error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Send Template Message
  async sendTemplateMessage(
    to: string,
    templateName: string,
    language: string,
    parameters: any[] = [],
    context?: { userId?: string; campaignId?: string }
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const whatsappMessage: WhatsAppMessage = {
        id: this.generateMessageId(),
        to: this.formatPhoneNumber(to),
        type: 'template',
        content: {
          template: {
            name: templateName,
            language: { code: language },
            components:
              parameters.length > 0
                ? [
                    {
                      type: 'body',
                      parameters: parameters.map((param) => ({ type: 'text', text: param })),
                    },
                  ]
                : [],
          },
        },
        status: 'queued',
        timestamp: Date.now(),
        userId: context?.userId,
        campaignId: context?.campaignId,
      }

      const result = await this.processMessage(whatsappMessage)
      return result
    } catch (error) {
      console.error('WhatsApp send template error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Send Interactive Message (Buttons/List)
  async sendInteractiveMessage(
    to: string,
    body: string,
    buttons: Array<{ id: string; title: string }>,
    context?: { userId?: string; campaignId?: string }
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const whatsappMessage: WhatsAppMessage = {
        id: this.generateMessageId(),
        to: this.formatPhoneNumber(to),
        type: 'interactive',
        content: {
          interactive: {
            type: 'button',
            body: { text: body },
            action: {
              buttons: buttons.map((btn) => ({
                type: 'reply',
                reply: { id: btn.id, title: btn.title },
              })),
            },
          },
        },
        status: 'queued',
        timestamp: Date.now(),
        userId: context?.userId,
        campaignId: context?.campaignId,
      }

      const result = await this.processMessage(whatsappMessage)
      return result
    } catch (error) {
      console.error('WhatsApp send interactive error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Process Message Queue
  private async processMessage(
    message: WhatsAppMessage
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const payload = {
        messaging_product: 'whatsapp',
        to: message.to,
        type: message.type,
        ...message.content,
      }

      const response = await fetch(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok && result.messages?.[0]) {
        message.status = 'sent'
        message.metadata = { whatsappId: result.messages[0].id }

        // Store in database
        await this.storeMessage(message)

        return { success: true, messageId: result.messages[0].id }
      } else {
        message.status = 'failed'
        message.metadata = { error: result.error }

        await this.storeMessage(message)

        return { success: false, error: result.error?.message || 'Failed to send message' }
      }
    } catch (error) {
      message.status = 'failed'
      message.metadata = { error: error instanceof Error ? error.message : 'Unknown error' }

      await this.storeMessage(message)

      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Webhook Handler for Status Updates
  async handleWebhook(webhookData: any): Promise<void> {
    try {
      if (webhookData.entry) {
        for (const entry of webhookData.entry) {
          if (entry.changes) {
            for (const change of entry.changes) {
              if (change.field === 'messages') {
                await this.processWebhookChange(change.value)
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('WhatsApp webhook error:', error)
    }
  }

  private async processWebhookChange(value: any): Promise<void> {
    // Handle message status updates
    if (value.statuses) {
      for (const status of value.statuses) {
        await this.updateMessageStatus(status.id, status.status, status.timestamp)
      }
    }

    // Handle incoming messages
    if (value.messages) {
      for (const message of value.messages) {
        await this.handleIncomingMessage(message)
      }
    }
  }

  private async updateMessageStatus(
    whatsappId: string,
    status: string,
    timestamp: string
  ): Promise<void> {
    // Update message status in database
    console.log(`Message ${whatsappId} status updated to ${status} at ${timestamp}`)
  }

  private async handleIncomingMessage(message: any): Promise<void> {
    // Process incoming messages (replies, button clicks, etc.)
    const from = message.from
    const messageType = message.type

    if (messageType === 'text') {
      await this.processTextReply(from, message.text.body)
    } else if (messageType === 'interactive') {
      await this.processInteractiveReply(from, message.interactive)
    }
  }

  private async processTextReply(from: string, text: string): Promise<void> {
    // Handle text replies - could trigger automated responses
    console.log(`Received text from ${from}: ${text}`)

    // Check for keywords and trigger appropriate responses
    const lowerText = text.toLowerCase()

    if (lowerText.includes('demo') || lowerText.includes('trial')) {
      await this.sendTemplateMessage(from, 'demo_booking_info', 'en')
    } else if (lowerText.includes('fee') || lowerText.includes('price')) {
      await this.sendTemplateMessage(from, 'course_fees', 'en')
    } else if (lowerText.includes('stop') || lowerText.includes('unsubscribe')) {
      await this.handleOptOut(from)
    }
  }

  private async processInteractiveReply(from: string, interactive: any): Promise<void> {
    const buttonId = interactive.button_reply?.id || interactive.list_reply?.id

    switch (buttonId) {
      case 'book_demo':
        await this.triggerDemoBookingFlow(from)
        break
      case 'view_courses':
        await this.sendCourseInformation(from)
        break
      case 'speak_to_counselor':
        await this.connectToCounselor(from)
        break
    }
  }

  // Automation Workflows
  async triggerDemoBookingFlow(phoneNumber: string): Promise<void> {
    // Send demo booking form link
    await this.sendTemplateMessage(phoneNumber, 'demo_booking_form', 'en', [
      'https://cerebrumbiologyacademy.com/demo-booking',
    ])
  }

  async sendCourseInformation(phoneNumber: string): Promise<void> {
    // Send course details with interactive buttons
    await this.sendInteractiveMessage(
      phoneNumber,
      'Our NEET Biology courses are designed for success:\n\n🎯 Class 11 & 12 Biology\n📚 Dropper Course\n🧬 Foundation Course\n\nChoose your course:',
      [
        { id: 'class_11_12', title: 'Class 11 & 12' },
        { id: 'dropper_course', title: 'Dropper Course' },
        { id: 'foundation', title: 'Foundation' },
      ]
    )
  }

  async connectToCounselor(phoneNumber: string): Promise<void> {
    // Notify counseling team and send acknowledgment
    await this.sendTextMessage(
      phoneNumber,
      'Thank you for your interest! Our counselor will call you within 30 minutes. You can also call us directly at ${CONTACT_INFO.phone.display.hyphenated.primary}.'
    )

    // Notify internal team
    await this.notifyTeam('counseling', {
      type: 'callback_request',
      phoneNumber,
      timestamp: Date.now(),
    })
  }

  private async handleOptOut(phoneNumber: string): Promise<void> {
    // Add to opt-out list and send confirmation
    await this.addToOptOutList(phoneNumber)
    await this.sendTextMessage(
      phoneNumber,
      'You have been unsubscribed from our WhatsApp updates. You can re-subscribe anytime by texting START.'
    )
  }

  // Campaign Management
  async executeCampaign(campaign: WhatsAppCampaign): Promise<void> {
    try {
      const targetUsers = await this.getTargetUsers(campaign.targetAudience)

      for (const user of targetUsers) {
        if (await this.isOptedIn(user.whatsappNumber)) {
          const result = await this.sendTemplateMessage(
            user.whatsappNumber,
            campaign.templateId,
            user.preferredLanguage || 'en',
            [],
            { userId: user.id, campaignId: campaign.id }
          )

          if (result.success) {
            campaign.metrics.sent++
          } else {
            campaign.metrics.failed++
          }

          // Rate limiting - respect WhatsApp limits
          await this.delay(100) // 10 messages per second max
        }
      }

      // Update campaign status
      campaign.status = 'completed'
      await this.storeCampaign(campaign)
    } catch (error) {
      console.error('Campaign execution error:', error)
      campaign.status = 'cancelled'
      await this.storeCampaign(campaign)
    }
  }

  // Template Management
  async createTemplate(
    template: Omit<WhatsAppTemplate, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    const templateId = this.generateTemplateId()

    const newTemplate: WhatsAppTemplate = {
      ...template,
      id: templateId,
      status: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    // Submit to WhatsApp for approval
    const response = await fetch(`${this.baseUrl}/message_templates`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: template.name,
        category: template.category,
        language: template.language,
        components: template.components,
      }),
    })

    if (response.ok) {
      await this.storeTemplate(newTemplate)
      return templateId
    } else {
      throw new Error('Failed to create template')
    }
  }

  // Utility Methods
  private formatPhoneNumber(phoneNumber: string): string {
    // Ensure phone number is in international format (+91xxxxxxxxxx)
    const formatted = phoneNumber.replace(/\D/g, '') // Remove non-digits

    if (formatted.startsWith('91') && formatted.length === 12) {
      return '+' + formatted
    } else if (formatted.length === 10) {
      return '+91' + formatted
    } else if (formatted.startsWith('+91')) {
      return formatted
    }

    throw new Error('Invalid phone number format')
  }

  private generateMessageId(): string {
    return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  private generateTemplateId(): string {
    return 'tpl_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // Database Operations (to be implemented with your database)
  private async storeMessage(message: WhatsAppMessage): Promise<void> {
    // Store message in database
    console.log('Storing message:', message.id)
  }

  private async storeTemplate(template: WhatsAppTemplate): Promise<void> {
    // Store template in database
    console.log('Storing template:', template.id)
  }

  private async storeCampaign(campaign: WhatsAppCampaign): Promise<void> {
    // Store campaign in database
    console.log('Storing campaign:', campaign.id)
  }

  private async getTargetUsers(audience: WhatsAppCampaign['targetAudience']): Promise<any[]> {
    // Get users based on targeting criteria
    return []
  }

  private async isOptedIn(phoneNumber: string): Promise<boolean> {
    // Check if user has opted in to WhatsApp messages
    return true
  }

  private async addToOptOutList(phoneNumber: string): Promise<void> {
    // Add user to opt-out list
    console.log('Adding to opt-out list:', phoneNumber)
  }

  private async notifyTeam(team: string, data: any): Promise<void> {
    // Notify internal team members
    console.log(`Notifying ${team} team:`, data)
  }
}

// Pre-defined Templates for NEET Coaching
export const NEETWhatsAppTemplates = {
  // Demo Booking Confirmation
  demo_booking_confirmation: {
    name: 'demo_booking_confirmation',
    category: 'utility' as const,
    language: 'en' as const,
    components: [
      {
        type: 'body' as const,
        text: 'Hi {{1}}! Your NEET Biology demo class is confirmed for {{2}} at {{3}}. Join link: {{4}}. For any queries, call ${CONTACT_INFO.phone.display.hyphenated.primary}.',
      },
      {
        type: 'buttons' as const,
        buttons: [
          { type: 'url' as const, text: 'Join Demo', url: '{{4}}' },
          { type: 'phone_number' as const, text: 'Call Support', phone_number: CONTACT_INFO.phone.primary },
        ],
      },
    ],
  },

  // Payment Reminder
  payment_reminder: {
    name: 'payment_reminder',
    category: 'utility' as const,
    language: 'en' as const,
    components: [
      {
        type: 'body' as const,
        text: 'Dear {{1}}, your NEET course payment of ₹{{2}} is pending. Complete payment by {{3}} to secure your seat. Pay now: {{4}}',
      },
      {
        type: 'buttons' as const,
        buttons: [
          { type: 'url' as const, text: 'Pay Now', url: '{{4}}' },
          { type: 'quick_reply' as const, text: 'Need Help' },
        ],
      },
    ],
  },

  // Class Reminder
  class_reminder: {
    name: 'class_reminder',
    category: 'utility' as const,
    language: 'en' as const,
    components: [
      {
        type: 'body' as const,
        text: 'Reminder: Your {{1}} class starts in 30 minutes at {{2}}. Topic: {{3}}. Join here: {{4}}',
      },
      {
        type: 'buttons' as const,
        buttons: [{ type: 'url' as const, text: 'Join Class', url: '{{4}}' }],
      },
    ],
  },

  // Course Completion
  course_completion: {
    name: 'course_completion',
    category: 'utility' as const,
    language: 'en' as const,
    components: [
      {
        type: 'body' as const,
        text: 'Congratulations {{1}}! You completed {{2}} course. Your certificate is ready. Download: {{3}}. Consider our advanced NEET preparation program!',
      },
      {
        type: 'buttons' as const,
        buttons: [
          { type: 'url' as const, text: 'Download Certificate', url: '{{3}}' },
          { type: 'quick_reply' as const, text: 'Advanced Course Info' },
        ],
      },
    ],
  },
}

// Export singleton instance
export const whatsappAPI = new WhatsAppBusinessAPI({
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
  webhookSecret: process.env.WHATSAPP_WEBHOOK_SECRET || '',
})
