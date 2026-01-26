/**
 * Call Summary Agent
 *
 * AI-powered agent that analyzes call transcripts and generates
 * concise summaries with key insights and sentiment analysis.
 */

import { BaseAgent, AgentContext, AgentResponse, AgentTaskManager } from './base'
import { prisma } from '@/lib/prisma'
import { AgentType } from '@/generated/prisma'

const SYSTEM_PROMPT = `You are an AI Call Summary Agent for Cerebrum Biology Academy.

Your role is to analyze call transcripts between counselors and potential students/parents and generate:

1. CONCISE SUMMARY (2-3 sentences):
   - What was discussed
   - Key decisions or commitments made
   - Overall outcome

2. KEY DISCUSSION POINTS:
   - Main topics covered
   - Questions asked by the lead
   - Information provided by counselor

3. SENTIMENT ANALYSIS:
   - Overall tone: POSITIVE, NEUTRAL, or NEGATIVE
   - Interest level: HIGH, MEDIUM, or LOW
   - Specific emotional cues

4. CUSTOMER INSIGHTS:
   - Concerns or objections mentioned
   - Budget sensitivity
   - Timeline/urgency
   - Decision-making factors

5. COUNSELOR PERFORMANCE:
   - Did they address concerns effectively?
   - Value propositions mentioned
   - Areas for improvement

6. NEXT STEPS IDENTIFIED:
   - Commitments made by either party
   - Follow-up actions needed
   - Deadlines mentioned

Respond in JSON format:
{
  "summary": "<2-3 sentence summary>",
  "duration": "<call duration if mentioned>",
  "keyTopics": ["<topic1>", "<topic2>", ...],
  "questionsAsked": ["<question1>", "<question2>", ...],
  "concernsMentioned": ["<concern1>", "<concern2>", ...],
  "sentiment": {
    "overall": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
    "interestLevel": "HIGH" | "MEDIUM" | "LOW",
    "emotionalCues": ["<cue1>", "<cue2>"]
  },
  "customerInsights": {
    "budgetSensitivity": "HIGH" | "MEDIUM" | "LOW" | "NOT_DISCUSSED",
    "timeline": "<urgency/timeline if mentioned>",
    "decisionMakers": "<who makes the decision>",
    "competitorsConsidered": ["<competitor1>", "<competitor2>"]
  },
  "counselorPerformance": {
    "strengths": ["<strength1>", "<strength2>"],
    "improvements": ["<improvement1>", "<improvement2>"],
    "valuePropsUsed": ["<prop1>", "<prop2>"]
  },
  "actionItems": [
    {
      "action": "<action description>",
      "owner": "COUNSELOR" | "LEAD" | "BOTH",
      "priority": "HIGH" | "MEDIUM" | "LOW",
      "deadline": "<if mentioned>"
    }
  ],
  "recommendedFollowUp": {
    "action": "<recommended next action>",
    "timing": "<when to follow up>",
    "channel": "CALL" | "WHATSAPP" | "EMAIL"
  }
}`

interface CallSummaryResult {
  summary: string
  duration?: string
  keyTopics: string[]
  questionsAsked: string[]
  concernsMentioned: string[]
  sentiment: {
    overall: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'
    interestLevel: 'HIGH' | 'MEDIUM' | 'LOW'
    emotionalCues: string[]
  }
  customerInsights: {
    budgetSensitivity: 'HIGH' | 'MEDIUM' | 'LOW' | 'NOT_DISCUSSED'
    timeline?: string
    decisionMakers?: string
    competitorsConsidered: string[]
  }
  counselorPerformance: {
    strengths: string[]
    improvements: string[]
    valuePropsUsed: string[]
  }
  actionItems: Array<{
    action: string
    owner: 'COUNSELOR' | 'LEAD' | 'BOTH'
    priority: 'HIGH' | 'MEDIUM' | 'LOW'
    deadline?: string
  }>
  recommendedFollowUp: {
    action: string
    timing: string
    channel: 'CALL' | 'WHATSAPP' | 'EMAIL'
  }
}

export class CallSummaryAgent extends BaseAgent {
  constructor() {
    super(AgentType.CALL_SUMMARY, SYSTEM_PROMPT)
    this.maxTokens = 2500
  }

  async execute(context: AgentContext): Promise<AgentResponse> {
    if (!context.communicationId) {
      return {
        success: false,
        message: 'Communication ID is required for call summary',
        error: 'MISSING_COMMUNICATION_ID',
      }
    }

    try {
      this.log('info', `Summarizing call: ${context.communicationId}`)

      // Get the communication with transcript
      const communication = await prisma.crm_communications.findUnique({
        where: { id: context.communicationId },
        select: {
          id: true,
          leadId: true,
          callTranscript: true,
          callDuration: true,
          sentAt: true,
          leads: {
            select: {
              studentName: true,
              stage: true,
              courseInterest: true,
            },
          },
        },
      })

      if (!communication) {
        return {
          success: false,
          message: 'Communication not found',
          error: 'COMMUNICATION_NOT_FOUND',
        }
      }

      if (!communication.callTranscript) {
        return {
          success: false,
          message: 'No transcript available for this call',
          error: 'NO_TRANSCRIPT',
        }
      }

      // Build the summary prompt
      const userMessage = this.buildSummaryPrompt(communication)

      // Get AI response
      const response = await this.chat([{ role: 'user', content: userMessage }])

      // Parse the response
      const result = this.parseJSON<CallSummaryResult>(response)
      if (!result) {
        return {
          success: false,
          message: 'Failed to parse call summary result',
          error: 'PARSE_ERROR',
        }
      }

      // Update the communication record
      await this.updateCommunication(context.communicationId, result)

      // Log activity
      await this.logActivity(communication.leadId, result)

      // Queue action item extractor
      await this.queueActionExtractor(context.communicationId, communication.leadId)

      this.log('info', `Call summarized: sentiment=${result.sentiment.overall}`)

      return {
        success: true,
        message: 'Call summary generated successfully',
        data: {
          summary: result.summary,
          keyTopics: result.keyTopics,
          sentiment: result.sentiment,
          customerInsights: result.customerInsights,
          actionItems: result.actionItems,
          recommendedFollowUp: result.recommendedFollowUp,
        },
        action: this.mapFollowUpToAction(result.recommendedFollowUp.channel),
        actionData: {
          leadId: communication.leadId,
          communicationId: context.communicationId,
          followUp: result.recommendedFollowUp,
        },
        nextSteps: result.actionItems.map((ai) => `${ai.action} (${ai.owner}, ${ai.priority})`),
      }
    } catch (error) {
      this.log('error', 'Call summary generation failed', error)
      return {
        success: false,
        message: 'Call summary generation failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private buildSummaryPrompt(communication: {
    callTranscript: string | null
    callDuration: number | null
    leads: {
      studentName: string
      stage: string
      courseInterest: string
    } | null
  }): string {
    return `Analyze this call transcript and generate a comprehensive summary:

CALL CONTEXT:
- Student Name: ${communication.leads?.studentName || 'Unknown'}
- Current Stage: ${communication.leads?.stage || 'Unknown'}
- Course Interest: ${communication.leads?.courseInterest || 'Unknown'}
- Call Duration: ${communication.callDuration ? `${Math.round(communication.callDuration / 60)} minutes` : 'Unknown'}

TRANSCRIPT:
---
${communication.callTranscript}
---

Please analyze this conversation and provide:
1. A concise summary
2. Key topics discussed
3. Sentiment analysis
4. Customer insights
5. Counselor performance evaluation
6. Action items and recommended follow-up`
  }

  private async updateCommunication(
    communicationId: string,
    result: CallSummaryResult
  ): Promise<void> {
    await prisma.crm_communications.update({
      where: { id: communicationId },
      data: {
        callSummary: result.summary,
        sentiment: result.sentiment.overall,
        keyTopics: result.keyTopics,
        summarizedAt: new Date(),
      },
    })
  }

  private async logActivity(leadId: string, result: CallSummaryResult): Promise<void> {
    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: 'system',
        leadId,
        action: 'CALL_SUMMARIZED',
        description: `Call analyzed: ${result.sentiment.overall} sentiment, ${result.sentiment.interestLevel} interest. ${result.summary}`,
        metadata: {
          sentiment: result.sentiment,
          keyTopics: result.keyTopics,
          actionItemsCount: result.actionItems.length,
        },
      },
    })
  }

  private async queueActionExtractor(communicationId: string, leadId: string): Promise<void> {
    await AgentTaskManager.createTask({
      agentType: AgentType.ACTION_EXTRACTOR,
      leadId,
      communicationId,
      input: {
        trigger: 'SUMMARY_COMPLETE',
      },
    })

    this.log('info', `Queued ACTION_EXTRACTOR agent for communication: ${communicationId}`)
  }

  private mapFollowUpToAction(channel: string): AgentResponse['action'] {
    switch (channel) {
      case 'CALL':
        return 'schedule_call'
      case 'WHATSAPP':
        return 'send_whatsapp'
      case 'EMAIL':
        return 'send_email'
      default:
        return 'follow_up'
    }
  }
}
