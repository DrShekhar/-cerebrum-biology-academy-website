/**
 * Nurture Agent
 *
 * AI-powered agent that generates personalized follow-up messages
 * for leads at different stages of the enrollment journey.
 */

import { BaseAgent, AgentContext, AgentResponse, getLeadContext } from './base'
import { AgentType } from '@/generated/prisma'

const SYSTEM_PROMPT = `You are an AI Nurture Agent for Cerebrum Biology Academy, a premier NEET biology coaching institute in India.

Your role is to generate personalized, warm, and engaging follow-up messages that:
1. Feel personal and human (not robotic or salesy)
2. Provide value (study tips, exam info, motivation)
3. Build trust and rapport
4. Gently move leads toward enrollment
5. Match the appropriate communication channel (WhatsApp, Email, SMS)

IMPORTANT CONTEXT:
- Most Indian students/parents prefer WhatsApp for quick communication
- Calls are preferred for serious discussions
- Emails are for detailed information sharing
- Always be respectful of time and avoid being pushy

LEAD STAGES & APPROACH:
- NEW_LEAD: Welcome, introduce academy, offer value
- DEMO_SCHEDULED: Confirmation, excitement, preparation tips
- DEMO_COMPLETED: Thank them, gather feedback, highlight benefits
- OFFER_SENT: Gentle reminder, address concerns, create urgency
- NEGOTIATING: Flexibility, payment options, success stories
- PAYMENT_PLAN_CREATED: Confirmation, next steps, support

Respond in JSON format:
{
  "message": "<the personalized message>",
  "channel": "WHATSAPP" | "EMAIL" | "SMS",
  "subject": "<email subject if applicable>",
  "timing": "IMMEDIATE" | "TODAY" | "TOMORROW" | "NEXT_WEEK",
  "callToAction": "<what we want them to do>",
  "toneAnalysis": {
    "warmth": 1-10,
    "urgency": 1-10,
    "formality": 1-10
  },
  "alternativeMessage": "<shorter version for SMS>",
  "followUpSuggestion": "<what to do if no response>"
}`

interface NurtureResult {
  message: string
  channel: 'WHATSAPP' | 'EMAIL' | 'SMS'
  subject?: string
  timing: 'IMMEDIATE' | 'TODAY' | 'TOMORROW' | 'NEXT_WEEK'
  callToAction: string
  toneAnalysis: {
    warmth: number
    urgency: number
    formality: number
  }
  alternativeMessage?: string
  followUpSuggestion: string
}

export class NurtureAgent extends BaseAgent {
  constructor() {
    super(AgentType.NURTURE, SYSTEM_PROMPT)
  }

  async execute(context: AgentContext): Promise<AgentResponse> {
    if (!context.leadId) {
      return {
        success: false,
        message: 'Lead ID is required for nurture message generation',
        error: 'MISSING_LEAD_ID',
      }
    }

    try {
      this.log('info', `Generating nurture message for lead: ${context.leadId}`)

      // Get lead context
      const leadData = await getLeadContext(context.leadId)
      if (!leadData) {
        return {
          success: false,
          message: 'Lead not found',
          error: 'LEAD_NOT_FOUND',
        }
      }

      // Get additional context from metadata
      const messageType = context.metadata?.messageType as string | undefined
      const specificContext = context.metadata?.context as string | undefined

      // Build the nurture prompt
      const userMessage = this.buildNurturePrompt(leadData, messageType, specificContext)

      // Get AI response
      const response = await this.chat([{ role: 'user', content: userMessage }])

      // Parse the response
      const result = this.parseJSON<NurtureResult>(response)
      if (!result) {
        return {
          success: false,
          message: 'Failed to parse nurture message result',
          error: 'PARSE_ERROR',
        }
      }

      this.log(
        'info',
        `Nurture message generated: channel=${result.channel}, timing=${result.timing}`
      )

      return {
        success: true,
        message: 'Nurture message generated successfully',
        data: {
          message: result.message,
          channel: result.channel,
          subject: result.subject,
          timing: result.timing,
          callToAction: result.callToAction,
          toneAnalysis: result.toneAnalysis,
          alternativeMessage: result.alternativeMessage,
          followUpSuggestion: result.followUpSuggestion,
        },
        action: this.mapChannelToAction(result.channel),
        actionData: {
          leadId: context.leadId,
          message: result.message,
          channel: result.channel,
          subject: result.subject,
        },
        nextSteps: [
          `Send ${result.channel.toLowerCase()} message ${result.timing.toLowerCase()}`,
          result.callToAction,
          result.followUpSuggestion,
        ],
      }
    } catch (error) {
      this.log('error', 'Nurture message generation failed', error)
      return {
        success: false,
        message: 'Nurture message generation failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private buildNurturePrompt(
    leadData: Record<string, unknown>,
    messageType?: string,
    specificContext?: string
  ): string {
    const daysSinceCreation = this.getDaysSince(leadData.createdAt as string)
    const daysSinceContact = leadData.lastContactedAt
      ? this.getDaysSince(leadData.lastContactedAt as string)
      : null

    return `Generate a personalized nurture message for this lead:

LEAD INFORMATION:
- Name: ${leadData.name}
- Stage: ${leadData.stage}
- Priority: ${leadData.priority}
- Score: ${leadData.score || 'Not scored'}
- Course Interest: ${leadData.courseInterest}
- Lead Source: ${leadData.source}

TIMELINE:
- Lead Age: ${daysSinceCreation} days
- Days Since Last Contact: ${daysSinceContact !== null ? daysSinceContact : 'Never contacted'}
- Next Follow-up Scheduled: ${leadData.nextFollowUpAt || 'Not scheduled'}

ENGAGEMENT HISTORY:
- Total Communications: ${leadData.communicationCount}
- Recent Activities: ${JSON.stringify(leadData.recentActivities)}

DEMO STATUS:
${leadData.demoBooking ? JSON.stringify(leadData.demoBooking, null, 2) : 'No demo booked yet'}

COUNSELOR NOTES:
${Array.isArray(leadData.notes) && leadData.notes.length > 0 ? leadData.notes.join('\n') : 'No notes available'}

${messageType ? `MESSAGE TYPE REQUESTED: ${messageType}` : ''}
${specificContext ? `SPECIFIC CONTEXT: ${specificContext}` : ''}

Generate a warm, personalized message that feels genuine and moves this lead forward in their journey. Remember:
- Use the student's name
- Reference their specific course interest
- Match the tone to their stage
- Include a clear but gentle call-to-action
- Keep WhatsApp messages concise (under 300 words)
- Keep SMS under 160 characters`
  }

  private getDaysSince(dateString: string): number {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  private mapChannelToAction(channel: string): AgentResponse['action'] {
    switch (channel) {
      case 'WHATSAPP':
        return 'send_whatsapp'
      case 'EMAIL':
        return 'send_email'
      case 'SMS':
        return 'send_whatsapp' // SMS handled similarly
      default:
        return 'send_whatsapp'
    }
  }

  /**
   * Generate a stage-specific nurture message
   */
  async generateForStage(
    leadId: string,
    stage: string,
    additionalContext?: string
  ): Promise<AgentResponse> {
    return this.execute({
      leadId,
      metadata: {
        messageType: `STAGE_${stage}`,
        context: additionalContext,
      },
    })
  }

  /**
   * Generate a follow-up after no response
   */
  async generateFollowUp(leadId: string, daysSinceLastContact: number): Promise<AgentResponse> {
    return this.execute({
      leadId,
      metadata: {
        messageType: 'FOLLOW_UP',
        context: `No response for ${daysSinceLastContact} days. Generate a gentle re-engagement message.`,
      },
    })
  }
}
