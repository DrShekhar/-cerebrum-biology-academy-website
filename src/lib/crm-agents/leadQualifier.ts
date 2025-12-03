/**
 * Lead Qualifier Agent
 *
 * AI-powered lead qualification that analyzes lead data and assigns
 * scores, priorities, and recommended actions.
 */

import { BaseAgent, AgentContext, AgentResponse, getLeadContext } from './base'
import { prisma } from '@/lib/prisma'
import { AgentType, Priority } from '@/generated/prisma'

const SYSTEM_PROMPT = `You are an AI Lead Qualification Agent for Cerebrum Biology Academy, a premier NEET biology coaching institute in India.

Your role is to analyze lead data and provide qualification assessments. You must:

1. ANALYZE the lead's profile including:
   - Source quality (website, referral, walk-in, etc.)
   - Engagement level (demo booked, communications, activities)
   - Interest signals (course interest, response patterns)
   - Timeline urgency (NEET exam preparation timeline)
   - Budget alignment (based on course type interest)

2. SCORE the lead from 0-100 based on:
   - Interest Level (0-25): How interested are they in biology coaching?
   - Engagement (0-25): How actively are they interacting?
   - Fit (0-25): How well do they match our ideal student profile?
   - Urgency (0-25): How soon might they enroll?

3. ASSIGN a priority:
   - HOT: Score 70+, ready to enroll, needs immediate attention
   - WARM: Score 40-69, interested but needs nurturing
   - COLD: Score <40, low engagement or poor fit

4. RECOMMEND the best next action:
   - Schedule call
   - Send WhatsApp message
   - Send email with information
   - Book demo class
   - Wait and follow up later

Respond in JSON format:
{
  "score": <0-100>,
  "scoreBreakdown": {
    "interestLevel": <0-25>,
    "engagement": <0-25>,
    "fit": <0-25>,
    "urgency": <0-25>
  },
  "priority": "HOT" | "WARM" | "COLD",
  "qualificationReason": "<brief explanation>",
  "recommendedAction": "<action>",
  "actionReason": "<why this action>",
  "nextSteps": ["<step1>", "<step2>", ...]
}`

interface QualificationResult {
  score: number
  scoreBreakdown: {
    interestLevel: number
    engagement: number
    fit: number
    urgency: number
  }
  priority: 'HOT' | 'WARM' | 'COLD'
  qualificationReason: string
  recommendedAction: string
  actionReason: string
  nextSteps: string[]
}

export class LeadQualifierAgent extends BaseAgent {
  constructor() {
    super(AgentType.LEAD_QUALIFIER, SYSTEM_PROMPT)
  }

  async execute(context: AgentContext): Promise<AgentResponse> {
    if (!context.leadId) {
      return {
        success: false,
        message: 'Lead ID is required for qualification',
        error: 'MISSING_LEAD_ID',
      }
    }

    try {
      this.log('info', `Qualifying lead: ${context.leadId}`)

      // Get lead context
      const leadData = await getLeadContext(context.leadId)
      if (!leadData) {
        return {
          success: false,
          message: 'Lead not found',
          error: 'LEAD_NOT_FOUND',
        }
      }

      // Build the qualification prompt
      const userMessage = this.buildQualificationPrompt(leadData)

      // Get AI qualification
      const response = await this.chat([{ role: 'user', content: userMessage }])

      // Parse the response
      const result = this.parseJSON<QualificationResult>(response)
      if (!result) {
        return {
          success: false,
          message: 'Failed to parse qualification result',
          error: 'PARSE_ERROR',
        }
      }

      // Update the lead with new score and priority
      await this.updateLead(context.leadId, result)

      this.log('info', `Lead qualified: score=${result.score}, priority=${result.priority}`)

      return {
        success: true,
        message: `Lead qualified with score ${result.score} (${result.priority})`,
        data: {
          score: result.score,
          scoreBreakdown: result.scoreBreakdown,
          priority: result.priority,
          qualificationReason: result.qualificationReason,
          recommendedAction: result.recommendedAction,
        },
        action: this.mapAction(result.recommendedAction),
        actionData: {
          leadId: context.leadId,
          action: result.recommendedAction,
          reason: result.actionReason,
        },
        nextSteps: result.nextSteps,
      }
    } catch (error) {
      this.log('error', 'Lead qualification failed', error)
      return {
        success: false,
        message: 'Lead qualification failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private buildQualificationPrompt(leadData: Record<string, unknown>): string {
    return `Please qualify the following lead for Cerebrum Biology Academy:

LEAD PROFILE:
- Name: ${leadData.name}
- Email: ${leadData.email || 'Not provided'}
- Phone: ${leadData.phone}
- Course Interest: ${leadData.courseInterest}
- Current Stage: ${leadData.stage}
- Lead Source: ${leadData.source}
- Created: ${leadData.createdAt}
- Last Contacted: ${leadData.lastContactedAt || 'Never'}
- Current Score: ${leadData.score || 'Not scored'}

ENGAGEMENT METRICS:
- Total Activities: ${leadData.activityCount}
- Total Communications: ${leadData.communicationCount}

RECENT ACTIVITIES:
${JSON.stringify(leadData.recentActivities, null, 2)}

RECENT COMMUNICATIONS:
${JSON.stringify(leadData.recentCommunications, null, 2)}

NOTES FROM COUNSELORS:
${Array.isArray(leadData.notes) ? leadData.notes.join('\n') : 'No notes'}

PENDING TASKS:
${JSON.stringify(leadData.pendingTasks, null, 2)}

DEMO BOOKING:
${leadData.demoBooking ? JSON.stringify(leadData.demoBooking, null, 2) : 'No demo booked'}

Analyze this lead and provide your qualification assessment.`
  }

  private async updateLead(leadId: string, result: QualificationResult): Promise<void> {
    const priorityMap: Record<string, Priority> = {
      HOT: Priority.HOT,
      WARM: Priority.WARM,
      COLD: Priority.COLD,
    }

    await prisma.leads.update({
      where: { id: leadId },
      data: {
        score: result.score,
        scoreBreakdown: result.scoreBreakdown,
        scoreUpdatedAt: new Date(),
        priority: priorityMap[result.priority] || Priority.WARM,
      },
    })

    // Log the qualification activity
    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: 'system',
        leadId: leadId,
        action: 'AI_QUALIFICATION',
        description: `AI qualified lead: Score ${result.score} (${result.priority}). ${result.qualificationReason}`,
        metadata: {
          score: result.score,
          scoreBreakdown: result.scoreBreakdown,
          priority: result.priority,
          recommendedAction: result.recommendedAction,
        },
      },
    })
  }

  private mapAction(recommendedAction: string): AgentResponse['action'] {
    const actionLower = recommendedAction.toLowerCase()

    if (actionLower.includes('call') || actionLower.includes('phone')) {
      return 'schedule_call'
    }
    if (actionLower.includes('whatsapp')) {
      return 'send_whatsapp'
    }
    if (actionLower.includes('email')) {
      return 'send_email'
    }
    if (actionLower.includes('demo')) {
      return 'create_task'
    }
    if (actionLower.includes('wait') || actionLower.includes('later')) {
      return 'follow_up'
    }

    return 'no_action'
  }
}
