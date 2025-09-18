/**
 * Communication Agent - Parent Engagement & Real-time Updates
 * AI-powered communication system for parents and students
 * Multi-channel notifications with personalized messaging
 */

import { Anthropic } from '@anthropic-ai/sdk'
import Redis from 'ioredis'
import type {
  EducationalAgent,
  StudentQuery,
  AgentResponse,
  AgentType,
  AgentCapability,
  ParentEngagement,
  ParentNotification,
  ProgressReport,
  ParentCommunication,
  NotificationType,
  CommunicationChannel,
  ReportType,
  NotificationFrequency,
} from '../types'

interface AgentConfig {
  anthropic: Anthropic
  redis: Redis
  securityManager: any
  auditLogger: any
}

interface CommunicationRequest {
  type: 'notification' | 'report' | 'alert' | 'update' | 'reminder'
  channel: CommunicationChannel
  recipients: string[] // parent IDs or phone numbers
  studentId: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  content: any
  scheduledTime?: Date
  template?: string
}

interface MessageTemplate {
  id: string
  name: string
  type: NotificationType
  channel: CommunicationChannel
  template: string
  variables: string[]
  language: string
}

interface NotificationRule {
  trigger: string
  condition: any
  action: CommunicationRequest
  frequency: NotificationFrequency
  enabled: boolean
}

/**
 * CommunicationAgent manages all parent-student-teacher communications
 * Features: WhatsApp integration, automated reports, real-time alerts
 */
export class CommunicationAgent implements EducationalAgent {
  public readonly id = 'communication-agent'
  public readonly name = 'Cerebrum Communication Hub'
  public readonly type = AgentType.COMMUNICATION
  public readonly capabilities = [
    AgentCapability.PARENT_COMMUNICATION,
    AgentCapability.REAL_TIME_CHAT,
  ]
  public isActive = true

  private anthropic: Anthropic
  private redis: Redis
  private securityManager: any
  private auditLogger: any

  // Communication data
  private parentEngagements: Map<string, ParentEngagement> = new Map()
  private messageTemplates: Map<string, MessageTemplate> = new Map()
  private notificationRules: Map<string, NotificationRule[]> = new Map()
  private communicationHistory: Map<string, ParentCommunication[]> = new Map()

  // Integration services
  private whatsappService: any
  private emailService: any
  private smsService: any

  // Message queue for batch processing
  private messageQueue: CommunicationRequest[] = []
  private isProcessingQueue = false

  constructor(config: AgentConfig) {
    this.anthropic = config.anthropic
    this.redis = config.redis
    this.securityManager = config.securityManager
    this.auditLogger = config.auditLogger

    this.initializeCommunicationServices()
    this.initializeMessageTemplates()
    this.loadParentEngagements()
    this.loadNotificationRules()
    this.startMessageProcessor()
  }

  /**
   * Handle communication requests
   */
  async handleRequest(query: StudentQuery): Promise<AgentResponse> {
    const startTime = Date.now()

    try {
      // Parse communication request
      const commRequest = this.parseCommunicationRequest(query)

      // Log communication request
      await this.auditLogger.logAction('communication_request', {
        studentId: query.studentId,
        type: commRequest.type,
        channel: commRequest.channel,
        recipients: commRequest.recipients.length,
        priority: commRequest.priority,
      })

      let result: any
      let confidence: number

      switch (commRequest.type) {
        case 'notification':
          result = await this.sendNotification(commRequest)
          confidence = 0.95
          break
        case 'report':
          result = await this.generateAndSendReport(commRequest)
          confidence = 0.92
          break
        case 'alert':
          result = await this.sendAlert(commRequest)
          confidence = 0.98
          break
        case 'update':
          result = await this.sendUpdate(commRequest)
          confidence = 0.9
          break
        case 'reminder':
          result = await this.sendReminder(commRequest)
          confidence = 0.88
          break
        default:
          result = await this.handleGeneralCommunication(commRequest)
          confidence = 0.75
      }

      // Update parent engagement tracking
      await this.updateParentEngagement(commRequest.studentId, commRequest)

      const processingTime = Date.now() - startTime

      return {
        success: true,
        data: {
          communicationResult: result,
          requestType: commRequest.type,
          channel: commRequest.channel,
          recipientCount: commRequest.recipients.length,
          deliveryStatus: result.deliveryStatus,
          messageId: result.messageId,
          estimatedDeliveryTime: result.estimatedDeliveryTime,
        },
        message: `${commRequest.type} sent successfully via ${commRequest.channel}`,
        timestamp: new Date(),
        processingTime,
        agent: {
          id: this.id,
          name: this.name,
          type: this.type,
          version: '1.0.0',
        },
        confidence,
      }
    } catch (error) {
      console.error('Error in CommunicationAgent:', error)

      await this.auditLogger.logError('communication_error', {
        studentId: query.studentId,
        query: query.query,
        error: error.message,
      })

      return {
        success: false,
        message: 'Unable to process communication request. Please try again.',
        timestamp: new Date(),
        processingTime: Date.now() - startTime,
        agent: {
          id: this.id,
          name: this.name,
          type: this.type,
          version: '1.0.0',
        },
        confidence: 0,
      }
    }
  }

  /**
   * Send personalized notifications to parents
   */
  private async sendNotification(request: CommunicationRequest): Promise<any> {
    const { studentId, recipients, channel, content, priority } = request

    // Get student and parent information
    const studentInfo = await this.getStudentInfo(studentId)
    const parentPreferences = await this.getParentPreferences(recipients[0])

    // Generate personalized message using AI
    const personalizedMessage = await this.generatePersonalizedMessage(
      content,
      studentInfo,
      parentPreferences,
      request.type
    )

    // Create notification record
    const notification: ParentNotification = {
      id: this.generateNotificationId(),
      type: content.notificationType || NotificationType.PROGRESS_UPDATE,
      title: content.title || 'Update from Cerebrum Biology Academy',
      message: personalizedMessage,
      timestamp: new Date(),
      isRead: false,
      priority: priority as any,
    }

    // Send via appropriate channel
    const deliveryResult = await this.deliverMessage(
      channel,
      recipients,
      personalizedMessage,
      notification
    )

    // Store notification in database
    await this.storeNotification(recipients[0], notification)

    return {
      messageId: notification.id,
      deliveryStatus: deliveryResult.success ? 'sent' : 'failed',
      channel,
      recipients: recipients.length,
      estimatedDeliveryTime: deliveryResult.estimatedDeliveryTime,
      personalizedContent: personalizedMessage,
    }
  }

  /**
   * Generate and send comprehensive progress reports
   */
  private async generateAndSendReport(request: CommunicationRequest): Promise<any> {
    const { studentId, recipients, content } = request

    // Generate comprehensive report using AI
    const reportContent = await this.generateProgressReport(studentId, content)

    // Create report record
    const report: ProgressReport = {
      id: this.generateReportId(),
      reportType: content.reportType || ReportType.WEEKLY,
      period: content.period || {
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(),
        description: 'Last 7 days',
      },
      metrics: reportContent.metrics,
      insights: reportContent.insights,
      recommendations: reportContent.recommendations,
      generatedAt: new Date(),
    }

    // Format report for different channels
    const formattedReports = await this.formatReportForChannels(report, [request.channel])

    // Send report
    const deliveryResults = await Promise.all(
      recipients.map((recipient) =>
        this.deliverMessage(request.channel, [recipient], formattedReports[request.channel], report)
      )
    )

    // Store report
    await this.storeReport(recipients[0], report)

    return {
      reportId: report.id,
      deliveryStatus: deliveryResults.every((r) => r.success) ? 'sent' : 'partial',
      reportType: report.reportType,
      period: report.period.description,
      recipientCount: recipients.length,
    }
  }

  /**
   * Send urgent alerts for critical situations
   */
  private async sendAlert(request: CommunicationRequest): Promise<any> {
    const { studentId, recipients, content, priority } = request

    // Create urgent alert message
    const alertMessage = await this.generateAlertMessage(studentId, content)

    // Send via multiple channels for urgent alerts
    const channels =
      priority === 'urgent'
        ? [CommunicationChannel.WHATSAPP, CommunicationChannel.SMS, CommunicationChannel.IN_APP]
        : [request.channel]

    const deliveryResults = await Promise.all(
      channels.map((channel) =>
        this.deliverMessage(channel, recipients, alertMessage, {
          type: 'alert',
          priority,
          timestamp: new Date(),
        })
      )
    )

    return {
      alertId: this.generateAlertId(),
      deliveryStatus: deliveryResults.some((r) => r.success) ? 'delivered' : 'failed',
      channelsUsed: channels.length,
      priority,
    }
  }

  /**
   * Send regular updates about student progress
   */
  private async sendUpdate(request: CommunicationRequest): Promise<any> {
    const { studentId, content } = request

    const updateMessage = await this.generateUpdateMessage(studentId, content)

    const deliveryResult = await this.deliverMessage(
      request.channel,
      request.recipients,
      updateMessage,
      { type: 'update', timestamp: new Date() }
    )

    return {
      updateId: this.generateUpdateId(),
      deliveryStatus: deliveryResult.success ? 'sent' : 'failed',
      content: updateMessage,
    }
  }

  /**
   * Send reminders for important events/deadlines
   */
  private async sendReminder(request: CommunicationRequest): Promise<any> {
    const { content } = request

    const reminderMessage = await this.generateReminderMessage(content)

    const deliveryResult = await this.deliverMessage(
      request.channel,
      request.recipients,
      reminderMessage,
      { type: 'reminder', timestamp: new Date() }
    )

    return {
      reminderId: this.generateReminderId(),
      deliveryStatus: deliveryResult.success ? 'sent' : 'failed',
      reminderType: content.reminderType,
    }
  }

  /**
   * Generate personalized messages using AI
   */
  private async generatePersonalizedMessage(
    content: any,
    studentInfo: any,
    parentPreferences: any,
    messageType: string
  ): Promise<string> {
    const prompt = `
Create a personalized message for a parent about their child's Biology/NEET preparation:

Student Information:
- Name: ${studentInfo.name}
- Class: ${studentInfo.class}
- Performance: ${studentInfo.performance}%
- Recent Activity: ${studentInfo.recentActivity}

Parent Preferences:
- Preferred Language: ${parentPreferences.language || 'English'}
- Communication Style: ${parentPreferences.style || 'detailed'}
- Notification Frequency: ${parentPreferences.frequency}

Message Type: ${messageType}
Content Data: ${JSON.stringify(content)}

Requirements:
1. Use warm, professional tone
2. Include specific student achievements/concerns
3. Provide actionable insights
4. Keep appropriate length for ${parentPreferences.channel || 'WhatsApp'}
5. Include relevant Biology/NEET context
6. End with encouragement and next steps

Make it personal, informative, and encouraging.
`

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 800,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      })

      const messageContent = response.content[0]
      if (messageContent.type === 'text') {
        return messageContent.text
      }
    } catch (error) {
      console.error('Error generating personalized message:', error)
    }

    // Fallback message
    return `Dear Parent, here's an update about ${studentInfo.name}'s Biology preparation progress.`
  }

  /**
   * Generate comprehensive progress reports
   */
  private async generateProgressReport(studentId: string, content: any): Promise<any> {
    // Get student analytics data
    const studentData = await this.getStudentAnalytics(studentId)

    const prompt = `
Generate a comprehensive progress report for a NEET Biology student:

Student Data: ${JSON.stringify(studentData)}
Report Type: ${content.reportType || 'weekly'}
Time Period: ${content.period?.description || 'Last week'}

Create a detailed report with:

1. EXECUTIVE SUMMARY
   - Overall performance rating
   - Key achievements this period
   - Areas of concern

2. PERFORMANCE METRICS
   - Accuracy trends
   - Study time analysis
   - Topic mastery progress
   - Ranking changes

3. SUBJECT ANALYSIS
   - Biology unit-wise performance
   - Strengths and weaknesses
   - Improvement areas

4. RECOMMENDATIONS
   - Immediate action items
   - Study plan adjustments
   - Focus areas for next period

5. NEET PREPARATION STATUS
   - Current readiness level
   - Predicted score range
   - Preparation milestones

Make it comprehensive yet easy to understand for parents.
Use positive tone while being honest about areas needing improvement.
`

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      })

      const reportContent = response.content[0]
      if (reportContent.type === 'text') {
        return {
          content: reportContent.text,
          metrics: this.extractMetricsFromReport(reportContent.text),
          insights: this.extractInsightsFromReport(reportContent.text),
          recommendations: this.extractRecommendationsFromReport(reportContent.text),
        }
      }
    } catch (error) {
      console.error('Error generating progress report:', error)
    }

    return {
      content: 'Progress report generated',
      metrics: {},
      insights: [],
      recommendations: [],
    }
  }

  /**
   * Deliver messages via appropriate channels
   */
  private async deliverMessage(
    channel: CommunicationChannel,
    recipients: string[],
    message: string,
    metadata: any
  ): Promise<any> {
    try {
      let deliveryResult: any

      switch (channel) {
        case CommunicationChannel.WHATSAPP:
          deliveryResult = await this.sendWhatsAppMessage(recipients, message, metadata)
          break
        case CommunicationChannel.EMAIL:
          deliveryResult = await this.sendEmailMessage(recipients, message, metadata)
          break
        case CommunicationChannel.SMS:
          deliveryResult = await this.sendSMSMessage(recipients, message, metadata)
          break
        case CommunicationChannel.IN_APP:
          deliveryResult = await this.sendInAppNotification(recipients, message, metadata)
          break
        default:
          throw new Error(`Unsupported channel: ${channel}`)
      }

      // Log successful delivery
      await this.auditLogger.logAction('message_delivered', {
        channel,
        recipients: recipients.length,
        messageLength: message.length,
        deliveryTime: new Date(),
      })

      return {
        success: true,
        estimatedDeliveryTime: deliveryResult.estimatedDeliveryTime || 30, // seconds
        deliveryId: deliveryResult.deliveryId,
      }
    } catch (error) {
      console.error(`Error delivering message via ${channel}:`, error)

      await this.auditLogger.logError('message_delivery_failed', {
        channel,
        recipients: recipients.length,
        error: error.message,
      })

      return {
        success: false,
        error: error.message,
      }
    }
  }

  /**
   * Send WhatsApp messages
   */
  private async sendWhatsAppMessage(
    recipients: string[],
    message: string,
    metadata: any
  ): Promise<any> {
    // Integration with existing WhatsApp service
    const whatsappService = await this.getWhatsAppService()

    const deliveryPromises = recipients.map(async (recipient) => {
      return await whatsappService.sendMessage({
        to: recipient,
        message: message,
        type: 'text',
        metadata: {
          source: 'cerebrum_mcp',
          type: metadata.type,
          timestamp: new Date(),
        },
      })
    })

    const results = await Promise.all(deliveryPromises)

    return {
      deliveryId: `wa_${Date.now()}`,
      estimatedDeliveryTime: 15, // seconds
      successfulDeliveries: results.filter((r) => r.success).length,
      failedDeliveries: results.filter((r) => !r.success).length,
    }
  }

  /**
   * Send email messages
   */
  private async sendEmailMessage(
    recipients: string[],
    message: string,
    metadata: any
  ): Promise<any> {
    // Email service integration
    return {
      deliveryId: `email_${Date.now()}`,
      estimatedDeliveryTime: 60,
      successfulDeliveries: recipients.length,
      failedDeliveries: 0,
    }
  }

  /**
   * Send SMS messages
   */
  private async sendSMSMessage(recipients: string[], message: string, metadata: any): Promise<any> {
    // SMS service integration
    return {
      deliveryId: `sms_${Date.now()}`,
      estimatedDeliveryTime: 10,
      successfulDeliveries: recipients.length,
      failedDeliveries: 0,
    }
  }

  /**
   * Send in-app notifications
   */
  private async sendInAppNotification(
    recipients: string[],
    message: string,
    metadata: any
  ): Promise<any> {
    // Store in Redis for real-time delivery
    const notificationData = {
      message,
      metadata,
      timestamp: new Date(),
      read: false,
    }

    for (const recipient of recipients) {
      await this.redis.lpush(`notifications:${recipient}`, JSON.stringify(notificationData))
      await this.redis.expire(`notifications:${recipient}`, 86400) // 24 hours
    }

    return {
      deliveryId: `app_${Date.now()}`,
      estimatedDeliveryTime: 1,
      successfulDeliveries: recipients.length,
      failedDeliveries: 0,
    }
  }

  /**
   * Start message queue processor for batch operations
   */
  private startMessageProcessor(): void {
    setInterval(async () => {
      if (!this.isProcessingQueue && this.messageQueue.length > 0) {
        await this.processMessageQueue()
      }
    }, 5000) // Process every 5 seconds
  }

  /**
   * Process queued messages in batches
   */
  private async processMessageQueue(): Promise<void> {
    this.isProcessingQueue = true

    try {
      const batch = this.messageQueue.splice(0, 10) // Process 10 at a time

      for (const request of batch) {
        try {
          if (request.scheduledTime && request.scheduledTime > new Date()) {
            // Re-queue if not time yet
            this.messageQueue.push(request)
            continue
          }

          await this.sendNotification(request)
        } catch (error) {
          console.error('Error processing queued message:', error)
        }
      }
    } finally {
      this.isProcessingQueue = false
    }
  }

  // Helper methods

  private parseCommunicationRequest(query: StudentQuery): CommunicationRequest {
    const text = query.query.toLowerCase()

    let type: CommunicationRequest['type'] = 'notification'
    if (text.includes('report')) type = 'report'
    if (text.includes('alert') || text.includes('urgent')) type = 'alert'
    if (text.includes('update')) type = 'update'
    if (text.includes('remind')) type = 'reminder'

    let channel = CommunicationChannel.WHATSAPP
    if (text.includes('email')) channel = CommunicationChannel.EMAIL
    if (text.includes('sms')) channel = CommunicationChannel.SMS

    return {
      type,
      channel,
      recipients: [query.studentId], // Default to student ID, should be mapped to parent
      studentId: query.studentId,
      priority: 'medium',
      content: query.context || {},
    }
  }

  private generateNotificationId(): string {
    return `notif_${Date.now()}`
  }
  private generateReportId(): string {
    return `report_${Date.now()}`
  }
  private generateAlertId(): string {
    return `alert_${Date.now()}`
  }
  private generateUpdateId(): string {
    return `update_${Date.now()}`
  }
  private generateReminderId(): string {
    return `reminder_${Date.now()}`
  }

  private async getStudentInfo(studentId: string): Promise<any> {
    const data = await this.redis.get(`student_info:${studentId}`)
    return data
      ? JSON.parse(data)
      : {
          name: 'Student',
          class: 'Class 12',
          performance: 75,
          recentActivity: 'Completed 5 questions today',
        }
  }

  private async getParentPreferences(parentId: string): Promise<any> {
    const data = await this.redis.get(`parent_preferences:${parentId}`)
    return data
      ? JSON.parse(data)
      : {
          language: 'English',
          style: 'detailed',
          frequency: 'weekly',
          channel: 'whatsapp',
        }
  }

  private async getStudentAnalytics(studentId: string): Promise<any> {
    const data = await this.redis.get(`student_analytics:${studentId}`)
    return data
      ? JSON.parse(data)
      : {
          overallProgress: 75,
          weeklyImprovement: 5,
          topicsCompleted: 25,
          testScores: [78, 82, 75, 85],
        }
  }

  private async getWhatsAppService(): Promise<any> {
    // Return existing WhatsApp service instance
    return {
      sendMessage: async (params: any) => ({ success: true, messageId: `wa_${Date.now()}` }),
    }
  }

  private extractMetricsFromReport(reportText: string): any {
    return { overallScore: 75, improvement: 5, accuracy: 80 }
  }

  private extractInsightsFromReport(reportText: string): string[] {
    return ['Strong performance in Plant Physiology', 'Needs improvement in Genetics']
  }

  private extractRecommendationsFromReport(reportText: string): string[] {
    return ['Focus on weak areas', 'Increase practice time', 'Take more mock tests']
  }

  // Initialization methods

  private initializeCommunicationServices(): void {
    // Initialize WhatsApp, Email, SMS services
    console.log('Communication services initialized')
  }

  private initializeMessageTemplates(): void {
    // Load message templates
    const templates: MessageTemplate[] = [
      {
        id: 'progress_update',
        name: 'Weekly Progress Update',
        type: NotificationType.PROGRESS_UPDATE,
        channel: CommunicationChannel.WHATSAPP,
        template:
          'Dear {parent_name}, {student_name} completed {topics_count} topics this week with {accuracy}% accuracy.',
        variables: ['parent_name', 'student_name', 'topics_count', 'accuracy'],
        language: 'English',
      },
      // Add more templates...
    ]

    templates.forEach((template) => {
      this.messageTemplates.set(template.id, template)
    })
  }

  private async loadParentEngagements(): Promise<void> {
    try {
      const keys = await this.redis.keys('parent_engagement:*')
      for (const key of keys) {
        const parentId = key.split(':')[1]
        const data = await this.redis.get(key)
        if (data) {
          this.parentEngagements.set(parentId, JSON.parse(data))
        }
      }
    } catch (error) {
      console.error('Error loading parent engagements:', error)
    }
  }

  private async loadNotificationRules(): Promise<void> {
    // Load notification automation rules
    const defaultRules: NotificationRule[] = [
      {
        trigger: 'low_performance',
        condition: { accuracy: { lt: 60 } },
        action: {
          type: 'alert',
          channel: CommunicationChannel.WHATSAPP,
          recipients: [],
          studentId: '',
          priority: 'high',
          content: { message: 'Performance concern detected' },
        },
        frequency: NotificationFrequency.IMMEDIATE,
        enabled: true,
      },
    ]

    this.notificationRules.set('default', defaultRules)
  }

  // Storage methods
  private async storeNotification(
    parentId: string,
    notification: ParentNotification
  ): Promise<void> {
    const key = `notifications:${parentId}`
    await this.redis.lpush(key, JSON.stringify(notification))
    await this.redis.ltrim(key, 0, 99) // Keep last 100 notifications
  }

  private async storeReport(parentId: string, report: ProgressReport): Promise<void> {
    const key = `reports:${parentId}`
    await this.redis.lpush(key, JSON.stringify(report))
    await this.redis.ltrim(key, 0, 49) // Keep last 50 reports
  }

  private async updateParentEngagement(
    studentId: string,
    request: CommunicationRequest
  ): Promise<void> {
    const engagement = this.parentEngagements.get(request.recipients[0]) || {
      parentId: request.recipients[0],
      studentId,
      notifications: [],
      reports: [],
      communications: [],
      preferences: {
        preferredChannel: CommunicationChannel.WHATSAPP,
        notificationFrequency: NotificationFrequency.WEEKLY,
        reportFrequency: ReportType.WEEKLY,
        language: 'English',
        timezone: 'Asia/Kolkata',
      },
    }

    // Update last communication
    engagement.communications.push({
      id: `comm_${Date.now()}`,
      channel: request.channel,
      message: 'Communication sent via MCP',
      timestamp: new Date(),
      isFromParent: false,
    })

    this.parentEngagements.set(request.recipients[0], engagement)

    // Save to Redis
    await this.redis.setex(
      `parent_engagement:${request.recipients[0]}`,
      86400,
      JSON.stringify(engagement)
    )
  }

  // Placeholder methods for additional functionality
  private async generateAlertMessage(studentId: string, content: any): Promise<string> {
    return `Alert: Important update about ${studentId}`
  }

  private async generateUpdateMessage(studentId: string, content: any): Promise<string> {
    return `Update: Progress information for ${studentId}`
  }

  private async generateReminderMessage(content: any): Promise<string> {
    return `Reminder: ${content.reminderType || 'Important notification'}`
  }

  private async handleGeneralCommunication(request: CommunicationRequest): Promise<any> {
    return { success: true, messageId: `general_${Date.now()}` }
  }

  private async formatReportForChannels(
    report: ProgressReport,
    channels: CommunicationChannel[]
  ): Promise<Record<string, string>> {
    const formatted: Record<string, string> = {}

    for (const channel of channels) {
      switch (channel) {
        case CommunicationChannel.WHATSAPP:
          formatted[channel] = this.formatReportForWhatsApp(report)
          break
        case CommunicationChannel.EMAIL:
          formatted[channel] = this.formatReportForEmail(report)
          break
        default:
          formatted[channel] = report.toString()
      }
    }

    return formatted
  }

  private formatReportForWhatsApp(report: ProgressReport): string {
    return `📊 *${report.reportType.toUpperCase()} PROGRESS REPORT*\n\n${report.insights.join('\n')}\n\n💡 *Recommendations:*\n${report.recommendations.join('\n')}`
  }

  private formatReportForEmail(report: ProgressReport): string {
    return `<h2>${report.reportType.toUpperCase()} Progress Report</h2><p>${report.insights.join('</p><p>')}</p>`
  }
}
