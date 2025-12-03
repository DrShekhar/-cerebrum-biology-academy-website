/**
 * Action Item Extractor Agent
 *
 * AI-powered agent that extracts actionable tasks from call transcripts
 * and summaries, then creates tasks in the CRM.
 */

import { BaseAgent, AgentContext, AgentResponse } from './base'
import { prisma } from '@/lib/prisma'
import { AgentType, TaskType, TaskPriority, TaskStatus } from '@/generated/prisma'

const SYSTEM_PROMPT = `You are an AI Action Item Extractor for Cerebrum Biology Academy's CRM.

Your role is to analyze call transcripts and summaries to extract specific, actionable tasks that need to be completed.

For each action item, identify:

1. WHAT needs to be done (specific action)
2. WHO should do it (counselor, student, parent, admin)
3. WHEN it should be done (deadline if mentioned, or appropriate timeline)
4. WHY it's important (context from the conversation)
5. PRIORITY based on urgency and importance

ACTION CATEGORIES:
- FOLLOW_UP_CALL: Schedule another call
- SEND_WHATSAPP: Send information via WhatsApp
- SEND_EMAIL: Send detailed information via email
- PAYMENT_REMINDER: Follow up on payment
- DEMO_FOLLOWUP: Follow up after demo class
- SEND_OFFER: Create and send an offer
- SHARE_RESOURCES: Share study materials or information
- ESCALATE: Escalate to senior counselor or management
- INTERNAL_TASK: Internal academy task
- CUSTOM: Other specific tasks

PRIORITY RULES:
- HIGH: Commitment made, deadline mentioned, urgent request
- MEDIUM: Important but no specific deadline
- LOW: Nice to have, general follow-up

DUE DATE RULES:
- If specific date/time mentioned, use that
- "Tomorrow" = next business day
- "This week" = end of current week
- "Soon" or "ASAP" = within 24-48 hours
- No timeline = 3 business days

Respond in JSON format:
{
  "actionItems": [
    {
      "title": "<brief task title>",
      "description": "<detailed description>",
      "type": "<TaskType category>",
      "priority": "HIGH" | "MEDIUM" | "LOW",
      "dueInHours": <number of hours until due>,
      "assignTo": "COUNSELOR" | "ADMIN" | "SYSTEM",
      "context": "<why this task is needed>",
      "relatedQuote": "<relevant quote from transcript>"
    }
  ],
  "summary": "<brief summary of all action items>",
  "urgentCount": <number of urgent items>,
  "totalCount": <total number of items>
}`

interface ActionItem {
  title: string
  description: string
  type: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  dueInHours: number
  assignTo: 'COUNSELOR' | 'ADMIN' | 'SYSTEM'
  context: string
  relatedQuote?: string
}

interface ExtractionResult {
  actionItems: ActionItem[]
  summary: string
  urgentCount: number
  totalCount: number
}

export class ActionItemExtractorAgent extends BaseAgent {
  constructor() {
    super(AgentType.ACTION_EXTRACTOR, SYSTEM_PROMPT)
    this.maxTokens = 2000
  }

  async execute(context: AgentContext): Promise<AgentResponse> {
    if (!context.communicationId) {
      return {
        success: false,
        message: 'Communication ID is required for action item extraction',
        error: 'MISSING_COMMUNICATION_ID',
      }
    }

    try {
      this.log('info', `Extracting action items from: ${context.communicationId}`)

      // Get the communication with transcript and summary
      const communication = await prisma.crm_communications.findUnique({
        where: { id: context.communicationId },
        select: {
          id: true,
          leadId: true,
          callTranscript: true,
          callSummary: true,
          sentById: true,
          leads: {
            select: {
              studentName: true,
              stage: true,
              assignedToId: true,
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

      if (!communication.callTranscript && !communication.callSummary) {
        return {
          success: false,
          message: 'No transcript or summary available',
          error: 'NO_CONTENT',
        }
      }

      // Build the extraction prompt
      const userMessage = this.buildExtractionPrompt(communication)

      // Get AI response
      const response = await this.chat([{ role: 'user', content: userMessage }])

      // Parse the response
      const result = this.parseJSON<ExtractionResult>(response)
      if (!result) {
        return {
          success: false,
          message: 'Failed to parse action items',
          error: 'PARSE_ERROR',
        }
      }

      // Create tasks in the database
      const createdTasks = await this.createTasks(
        communication.leadId,
        communication.leads?.assignedToId || communication.sentById,
        result.actionItems
      )

      // Update communication with action items
      await this.updateCommunication(context.communicationId, result.actionItems)

      // Log activity
      await this.logActivity(communication.leadId, result)

      this.log('info', `Extracted ${result.totalCount} action items (${result.urgentCount} urgent)`)

      return {
        success: true,
        message: `Extracted ${result.totalCount} action items`,
        data: {
          actionItems: result.actionItems,
          summary: result.summary,
          urgentCount: result.urgentCount,
          totalCount: result.totalCount,
          createdTaskIds: createdTasks,
        },
        action: result.urgentCount > 0 ? 'escalate' : 'create_task',
        nextSteps: result.actionItems.map(
          (ai) => `[${ai.priority}] ${ai.title} (Due in ${ai.dueInHours}h)`
        ),
      }
    } catch (error) {
      this.log('error', 'Action item extraction failed', error)
      return {
        success: false,
        message: 'Action item extraction failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private buildExtractionPrompt(communication: {
    callTranscript: string | null
    callSummary: string | null
    leads: {
      studentName: string
      stage: string
    } | null
  }): string {
    return `Extract all action items from this call:

LEAD CONTEXT:
- Student Name: ${communication.leads?.studentName || 'Unknown'}
- Current Stage: ${communication.leads?.stage || 'Unknown'}

${communication.callSummary ? `CALL SUMMARY:\n${communication.callSummary}\n` : ''}

${communication.callTranscript ? `FULL TRANSCRIPT:\n---\n${communication.callTranscript}\n---` : ''}

Please extract all action items that the counselor or academy needs to complete.
Be specific and actionable. Include any commitments, promises, or follow-ups mentioned.
If no specific actions are mentioned, identify logical next steps based on the conversation.`
  }

  private async createTasks(
    leadId: string,
    assignedToId: string,
    actionItems: ActionItem[]
  ): Promise<string[]> {
    const createdIds: string[] = []

    for (const item of actionItems) {
      const taskType = this.mapToTaskType(item.type)
      const priority = this.mapToPriority(item.priority)
      const dueDate = new Date(Date.now() + item.dueInHours * 60 * 60 * 1000)

      const task = await prisma.tasks.create({
        data: {
          id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          leadId,
          title: item.title,
          description: `${item.description}\n\nContext: ${item.context}${item.relatedQuote ? `\n\nFrom call: "${item.relatedQuote}"` : ''}`,
          type: taskType,
          priority,
          dueDate,
          status: TaskStatus.PENDING,
          assignedToId,
          isAutoGenerated: true,
          triggerEvent: 'AI_CALL_ANALYSIS',
          updatedAt: new Date(),
        },
      })

      createdIds.push(task.id)
    }

    return createdIds
  }

  private mapToTaskType(type: string): TaskType {
    const typeMap: Record<string, TaskType> = {
      FOLLOW_UP_CALL: TaskType.FOLLOW_UP_CALL,
      SEND_WHATSAPP: TaskType.SEND_WHATSAPP,
      SEND_EMAIL: TaskType.SEND_EMAIL,
      PAYMENT_REMINDER: TaskType.PAYMENT_REMINDER,
      DEMO_FOLLOWUP: TaskType.DEMO_FOLLOWUP,
    }

    return typeMap[type] || TaskType.CUSTOM
  }

  private mapToPriority(priority: 'HIGH' | 'MEDIUM' | 'LOW'): TaskPriority {
    const priorityMap: Record<string, TaskPriority> = {
      HIGH: TaskPriority.HIGH,
      MEDIUM: TaskPriority.MEDIUM,
      LOW: TaskPriority.LOW,
    }

    return priorityMap[priority] || TaskPriority.MEDIUM
  }

  private async updateCommunication(
    communicationId: string,
    actionItems: ActionItem[]
  ): Promise<void> {
    await prisma.crm_communications.update({
      where: { id: communicationId },
      data: {
        actionItems: actionItems.map((ai) => ai.title),
      },
    })
  }

  private async logActivity(leadId: string, result: ExtractionResult): Promise<void> {
    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: 'system',
        leadId,
        action: 'ACTION_ITEMS_EXTRACTED',
        description: `AI extracted ${result.totalCount} action items from call (${result.urgentCount} urgent). ${result.summary}`,
        metadata: {
          totalCount: result.totalCount,
          urgentCount: result.urgentCount,
          items: result.actionItems.map((ai) => ({
            title: ai.title,
            priority: ai.priority,
            dueInHours: ai.dueInHours,
          })),
        },
      },
    })
  }
}
