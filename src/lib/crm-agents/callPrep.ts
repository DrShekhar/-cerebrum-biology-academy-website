/**
 * Call Prep Agent
 *
 * AI-powered agent that prepares counselors for calls by summarizing
 * lead history, suggesting talking points, and recommending offers.
 */

import { BaseAgent, AgentContext, AgentResponse, getLeadContext } from './base'
import { prisma } from '@/lib/prisma'
import { AgentType } from '@/generated/prisma'

const SYSTEM_PROMPT = `You are an AI Call Preparation Agent for Cerebrum Biology Academy, a premier NEET biology coaching institute.

Your role is to prepare counselors for successful phone calls with leads. You must:

1. SUMMARIZE the lead's journey:
   - How they found us
   - What interactions they've had
   - Their current stage and interest level
   - Any concerns or objections mentioned

2. IDENTIFY key talking points:
   - Their specific course interest
   - Previous questions or concerns
   - Family involvement (parents often make decisions)
   - Timeline and urgency for NEET preparation

3. SUGGEST personalized approaches:
   - Rapport building openers
   - Value propositions that match their needs
   - Objection handling strategies
   - Closing techniques appropriate for their stage

4. RECOMMEND offers (if appropriate):
   - Discounts based on timing
   - Payment plan options
   - Free resources or trial classes
   - Special promotions

5. ANTICIPATE objections:
   - Common concerns for their profile
   - Prepared responses
   - Success stories to share

Respond in JSON format:
{
  "leadSummary": {
    "name": "<name>",
    "joinedAgo": "<X days ago>",
    "stage": "<current stage>",
    "interestLevel": "High | Medium | Low",
    "keyFacts": ["<fact1>", "<fact2>"]
  },
  "callObjective": "<primary goal of this call>",
  "openingScript": "<suggested opening>",
  "talkingPoints": [
    {
      "topic": "<topic>",
      "approach": "<how to discuss>",
      "keyMessage": "<what to convey>"
    }
  ],
  "anticipatedObjections": [
    {
      "objection": "<possible objection>",
      "response": "<suggested response>",
      "proofPoint": "<evidence to support>"
    }
  ],
  "offersToMention": [
    {
      "offer": "<offer description>",
      "condition": "<when to mention>",
      "urgency": "<any deadline>"
    }
  ],
  "closingStrategy": "<how to end the call>",
  "redFlags": ["<warning signs to watch for>"],
  "nextStepsAfterCall": ["<what to do after>"]
}`

interface CallPrepResult {
  leadSummary: {
    name: string
    joinedAgo: string
    stage: string
    interestLevel: 'High' | 'Medium' | 'Low'
    keyFacts: string[]
  }
  callObjective: string
  openingScript: string
  talkingPoints: Array<{
    topic: string
    approach: string
    keyMessage: string
  }>
  anticipatedObjections: Array<{
    objection: string
    response: string
    proofPoint: string
  }>
  offersToMention: Array<{
    offer: string
    condition: string
    urgency: string
  }>
  closingStrategy: string
  redFlags: string[]
  nextStepsAfterCall: string[]
}

export class CallPrepAgent extends BaseAgent {
  constructor() {
    super(AgentType.CALL_PREP, SYSTEM_PROMPT)
    this.maxTokens = 3000 // Need more tokens for comprehensive prep
  }

  async execute(context: AgentContext): Promise<AgentResponse> {
    if (!context.leadId) {
      return {
        success: false,
        message: 'Lead ID is required for call preparation',
        error: 'MISSING_LEAD_ID',
      }
    }

    try {
      this.log('info', `Preparing call brief for lead: ${context.leadId}`)

      // Get lead context with full history
      const leadData = await getLeadContext(context.leadId)
      if (!leadData) {
        return {
          success: false,
          message: 'Lead not found',
          error: 'LEAD_NOT_FOUND',
        }
      }

      // Get additional context - active offers, course pricing
      const additionalContext = await this.getAdditionalContext(context.leadId)

      // Build the prep prompt
      const userMessage = this.buildPrepPrompt(leadData, additionalContext)

      // Get AI response
      const response = await this.chat([{ role: 'user', content: userMessage }])

      // Parse the response
      const result = this.parseJSON<CallPrepResult>(response)
      if (!result) {
        return {
          success: false,
          message: 'Failed to parse call prep result',
          error: 'PARSE_ERROR',
        }
      }

      // Store the prep as a task note
      await this.storeCallPrep(context.leadId, result)

      this.log('info', `Call prep completed: objective=${result.callObjective}`)

      return {
        success: true,
        message: 'Call preparation brief generated',
        data: {
          leadSummary: result.leadSummary,
          callObjective: result.callObjective,
          openingScript: result.openingScript,
          talkingPoints: result.talkingPoints,
          anticipatedObjections: result.anticipatedObjections,
          offersToMention: result.offersToMention,
          closingStrategy: result.closingStrategy,
          redFlags: result.redFlags,
        },
        nextSteps: result.nextStepsAfterCall,
      }
    } catch (error) {
      this.log('error', 'Call preparation failed', error)
      return {
        success: false,
        message: 'Call preparation failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private async getAdditionalContext(leadId: string): Promise<Record<string, unknown>> {
    // Get active offers for this lead
    const activeOffers = await prisma.offers.findMany({
      where: {
        leadId,
        isActive: true,
        validUntil: { gte: new Date() },
      },
      select: {
        offerName: true,
        courseName: true,
        discountValue: true,
        discountType: true,
        validUntil: true,
        status: true,
      },
    })

    // Get fee plans
    const feePlans = await prisma.fee_plans.findMany({
      where: { leadId },
      select: {
        courseName: true,
        totalFee: true,
        discount: true,
        status: true,
      },
    })

    // Get course pricing
    const courses = await prisma.courses.findMany({
      where: { isActive: true },
      select: {
        name: true,
        type: true,
        totalFees: true,
        duration: true,
      },
    })

    return {
      activeOffers,
      feePlans,
      availableCourses: courses,
    }
  }

  private buildPrepPrompt(
    leadData: Record<string, unknown>,
    additionalContext: Record<string, unknown>
  ): string {
    return `Prepare a comprehensive call brief for the counselor:

LEAD PROFILE:
- Name: ${leadData.name}
- Phone: ${leadData.phone}
- Email: ${leadData.email || 'Not provided'}
- Course Interest: ${leadData.courseInterest}
- Current Stage: ${leadData.stage}
- Priority: ${leadData.priority}
- Lead Score: ${leadData.score || 'Not scored'}
- Source: ${leadData.source}
- Created: ${leadData.createdAt}
- Last Contact: ${leadData.lastContactedAt || 'Never'}

ENGAGEMENT HISTORY:
- Total Activities: ${leadData.activityCount}
- Total Communications: ${leadData.communicationCount}

RECENT ACTIVITIES:
${JSON.stringify(leadData.recentActivities, null, 2)}

COMMUNICATION HISTORY:
${JSON.stringify(leadData.recentCommunications, null, 2)}

COUNSELOR NOTES:
${Array.isArray(leadData.notes) && leadData.notes.length > 0 ? leadData.notes.join('\n\n') : 'No previous notes'}

PENDING TASKS:
${JSON.stringify(leadData.pendingTasks, null, 2)}

DEMO BOOKING STATUS:
${leadData.demoBooking ? JSON.stringify(leadData.demoBooking, null, 2) : 'No demo booked'}

ACTIVE OFFERS:
${JSON.stringify(additionalContext.activeOffers, null, 2)}

FEE PLANS CREATED:
${JSON.stringify(additionalContext.feePlans, null, 2)}

AVAILABLE COURSES & PRICING:
${JSON.stringify(additionalContext.availableCourses, null, 2)}

Based on all this information, prepare a comprehensive call brief that will help the counselor have a successful conversation. Consider:
- The lead's journey so far
- Their likely concerns based on their stage
- Offers that might interest them
- How to build rapport quickly
- The best way to move them forward`
  }

  private async storeCallPrep(leadId: string, result: CallPrepResult): Promise<void> {
    // Create a note with the call prep
    const prepSummary = `
📞 AI CALL PREP BRIEF

🎯 OBJECTIVE: ${result.callObjective}

📝 OPENING: ${result.openingScript}

💡 KEY TALKING POINTS:
${result.talkingPoints.map((tp) => `• ${tp.topic}: ${tp.keyMessage}`).join('\n')}

⚠️ ANTICIPATED OBJECTIONS:
${result.anticipatedObjections.map((obj) => `• "${obj.objection}" → ${obj.response}`).join('\n')}

🎁 OFFERS TO MENTION:
${result.offersToMention.map((o) => `• ${o.offer} (${o.condition})`).join('\n')}

🏁 CLOSING: ${result.closingStrategy}

🚩 RED FLAGS: ${result.redFlags.join(', ')}
    `.trim()

    await prisma.notes.create({
      data: {
        id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        leadId,
        content: prepSummary,
        createdById: 'system',
        updatedAt: new Date(),
      },
    })
  }
}
