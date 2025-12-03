/**
 * Base Agent Infrastructure for CRM AI Agents
 *
 * Provides foundational classes and utilities for all CRM agents:
 * - Lead Qualifier
 * - Nurture Agent
 * - Call Prep Agent
 * - Content Generator
 * - Call Transcription
 * - Call Summary
 * - Action Item Extractor
 */

import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/lib/prisma'
import { AgentType, AgentTaskStatus } from '@/generated/prisma'

// ============================================================================
// INTERFACES
// ============================================================================

export interface AgentContext {
  leadId?: string
  communicationId?: string
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
  metadata?: Record<string, unknown>
}

export interface AgentResponse {
  success: boolean
  message: string
  data?: Record<string, unknown>
  action?: AgentAction
  actionData?: Record<string, unknown>
  nextSteps?: string[]
  error?: string
}

export type AgentAction =
  | 'update_lead_score'
  | 'update_lead_priority'
  | 'schedule_call'
  | 'send_whatsapp'
  | 'send_email'
  | 'create_task'
  | 'escalate'
  | 'follow_up'
  | 'no_action'

export interface AgentTaskInput {
  agentType: AgentType
  leadId?: string
  communicationId?: string
  input: Record<string, unknown>
  scheduledAt?: Date
  metadata?: Record<string, unknown>
}

// ============================================================================
// BASE AGENT CLASS
// ============================================================================

export abstract class BaseAgent {
  protected client: Anthropic
  protected systemPrompt: string
  protected agentType: AgentType
  protected modelId: string = 'claude-sonnet-4-20250514'
  protected maxTokens: number = 2048

  constructor(agentType: AgentType, systemPrompt: string) {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    })
    this.agentType = agentType
    this.systemPrompt = systemPrompt
  }

  /**
   * Execute the agent's main logic
   */
  abstract execute(context: AgentContext): Promise<AgentResponse>

  /**
   * Send a message to Claude and get a response
   */
  protected async chat(
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
    overrideSystemPrompt?: string
  ): Promise<string> {
    try {
      const response = await this.client.messages.create({
        model: this.modelId,
        max_tokens: this.maxTokens,
        system: overrideSystemPrompt || this.systemPrompt,
        messages: messages,
      })

      const content = response.content[0]
      return content.type === 'text' ? content.text : ''
    } catch (error) {
      console.error(`[${this.agentType}] Chat error:`, error)
      throw error
    }
  }

  /**
   * Parse JSON from agent response
   */
  protected parseJSON<T>(text: string): T | null {
    try {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1].trim())
      }

      // Try direct JSON parse
      return JSON.parse(text)
    } catch {
      console.error(`[${this.agentType}] Failed to parse JSON:`, text)
      return null
    }
  }

  /**
   * Extract action from response text
   */
  protected extractAction(message: string): AgentAction {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('schedule call') || lowerMessage.includes('schedule a call')) {
      return 'schedule_call'
    }
    if (lowerMessage.includes('send whatsapp') || lowerMessage.includes('whatsapp message')) {
      return 'send_whatsapp'
    }
    if (lowerMessage.includes('send email') || lowerMessage.includes('email them')) {
      return 'send_email'
    }
    if (lowerMessage.includes('escalate') || lowerMessage.includes('urgent attention')) {
      return 'escalate'
    }
    if (lowerMessage.includes('follow up') || lowerMessage.includes('follow-up')) {
      return 'follow_up'
    }
    if (lowerMessage.includes('create task') || lowerMessage.includes('add task')) {
      return 'create_task'
    }
    if (lowerMessage.includes('update score') || lowerMessage.includes('lead score')) {
      return 'update_lead_score'
    }
    if (
      lowerMessage.includes('priority') &&
      (lowerMessage.includes('hot') ||
        lowerMessage.includes('warm') ||
        lowerMessage.includes('cold'))
    ) {
      return 'update_lead_priority'
    }

    return 'no_action'
  }

  /**
   * Extract next steps from response
   */
  protected extractNextSteps(message: string): string[] {
    const lines = message.split('\n')
    const steps: string[] = []

    for (const line of lines) {
      const trimmed = line.trim()
      // Match bullet points or numbered lists
      if (trimmed.match(/^[-*•]\s+/) || trimmed.match(/^\d+[.)]\s+/)) {
        steps.push(trimmed.replace(/^[-*•]\s+/, '').replace(/^\d+[.)]\s+/, ''))
      }
    }

    return steps
  }

  /**
   * Log agent activity
   */
  protected log(level: 'info' | 'warn' | 'error', message: string, data?: unknown): void {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] [${this.agentType}] [${level.toUpperCase()}] ${message}`

    switch (level) {
      case 'error':
        console.error(logMessage, data || '')
        break
      case 'warn':
        console.warn(logMessage, data || '')
        break
      default:
        console.log(logMessage, data || '')
    }
  }
}

// ============================================================================
// AGENT TASK MANAGER
// ============================================================================

export class AgentTaskManager {
  /**
   * Create a new agent task
   */
  static async createTask(input: AgentTaskInput): Promise<string> {
    const task = await prisma.agent_tasks.create({
      data: {
        agentType: input.agentType,
        leadId: input.leadId,
        communicationId: input.communicationId,
        status: input.scheduledAt ? AgentTaskStatus.SCHEDULED : AgentTaskStatus.PENDING,
        input: input.input as object,
        scheduledAt: input.scheduledAt,
        metadata: input.metadata as object,
      },
    })

    return task.id
  }

  /**
   * Get pending tasks for processing
   */
  static async getPendingTasks(limit: number = 50): Promise<
    Array<{
      id: string
      agentType: AgentType
      leadId: string | null
      communicationId: string | null
      input: unknown
      attempt: number
      maxAttempts: number
    }>
  > {
    const now = new Date()

    return prisma.agent_tasks.findMany({
      where: {
        OR: [
          { status: AgentTaskStatus.PENDING },
          {
            status: AgentTaskStatus.SCHEDULED,
            scheduledAt: { lte: now },
          },
        ],
        attempt: { lt: prisma.agent_tasks.fields.maxAttempts },
      },
      orderBy: [{ scheduledAt: 'asc' }, { createdAt: 'asc' }],
      take: limit,
      select: {
        id: true,
        agentType: true,
        leadId: true,
        communicationId: true,
        input: true,
        attempt: true,
        maxAttempts: true,
      },
    })
  }

  /**
   * Mark task as running
   */
  static async markRunning(taskId: string): Promise<void> {
    await prisma.agent_tasks.update({
      where: { id: taskId },
      data: {
        status: AgentTaskStatus.RUNNING,
        startedAt: new Date(),
        attempt: { increment: 1 },
      },
    })
  }

  /**
   * Mark task as completed
   */
  static async markCompleted(taskId: string, output: Record<string, unknown>): Promise<void> {
    await prisma.agent_tasks.update({
      where: { id: taskId },
      data: {
        status: AgentTaskStatus.COMPLETED,
        completedAt: new Date(),
        output: output as object,
      },
    })
  }

  /**
   * Mark task as failed
   */
  static async markFailed(taskId: string, error: string): Promise<void> {
    const task = await prisma.agent_tasks.findUnique({
      where: { id: taskId },
      select: { attempt: true, maxAttempts: true },
    })

    const shouldRetry = task && task.attempt < task.maxAttempts

    await prisma.agent_tasks.update({
      where: { id: taskId },
      data: {
        status: shouldRetry ? AgentTaskStatus.PENDING : AgentTaskStatus.FAILED,
        error: error,
      },
    })
  }

  /**
   * Cancel a task
   */
  static async cancelTask(taskId: string): Promise<void> {
    await prisma.agent_tasks.update({
      where: { id: taskId },
      data: {
        status: AgentTaskStatus.CANCELLED,
      },
    })
  }

  /**
   * Get task statistics
   */
  static async getStats(): Promise<{
    pending: number
    running: number
    completed: number
    failed: number
    byType: Record<string, number>
  }> {
    const [pending, running, completed, failed, byType] = await Promise.all([
      prisma.agent_tasks.count({ where: { status: AgentTaskStatus.PENDING } }),
      prisma.agent_tasks.count({ where: { status: AgentTaskStatus.RUNNING } }),
      prisma.agent_tasks.count({ where: { status: AgentTaskStatus.COMPLETED } }),
      prisma.agent_tasks.count({ where: { status: AgentTaskStatus.FAILED } }),
      prisma.agent_tasks.groupBy({
        by: ['agentType'],
        _count: true,
      }),
    ])

    const typeStats: Record<string, number> = {}
    for (const item of byType) {
      typeStats[item.agentType] = item._count
    }

    return { pending, running, completed, failed, byType: typeStats }
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Format lead data for agent context
 */
export async function getLeadContext(leadId: string): Promise<Record<string, unknown> | null> {
  const lead = await prisma.leads.findUnique({
    where: { id: leadId },
    include: {
      activities: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      crm_communications: {
        orderBy: { sentAt: 'desc' },
        take: 10,
      },
      notes: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      tasks: {
        where: { status: { in: ['PENDING', 'IN_PROGRESS'] } },
        orderBy: { dueDate: 'asc' },
      },
      demo_bookings: true,
    },
  })

  if (!lead) return null

  return {
    id: lead.id,
    name: lead.studentName,
    email: lead.email,
    phone: lead.phone,
    courseInterest: lead.courseInterest,
    stage: lead.stage,
    priority: lead.priority,
    score: lead.score,
    source: lead.source,
    createdAt: lead.createdAt,
    lastContactedAt: lead.lastContactedAt,
    nextFollowUpAt: lead.nextFollowUpAt,
    activityCount: lead.activities.length,
    recentActivities: lead.activities.slice(0, 5).map((a) => ({
      action: a.action,
      description: a.description,
      date: a.createdAt,
    })),
    communicationCount: lead.crm_communications.length,
    recentCommunications: lead.crm_communications.slice(0, 5).map((c) => ({
      type: c.type,
      direction: c.direction,
      message: c.message.substring(0, 200),
      date: c.sentAt,
    })),
    notes: lead.notes.map((n) => n.content),
    pendingTasks: lead.tasks.map((t) => ({
      title: t.title,
      type: t.type,
      dueDate: t.dueDate,
      priority: t.priority,
    })),
    demoBooking: lead.demo_bookings
      ? {
          status: lead.demo_bookings.status,
          date: lead.demo_bookings.preferredDate,
          time: lead.demo_bookings.preferredTime,
          completed: lead.demo_bookings.demoCompleted,
          rating: lead.demo_bookings.demoRating,
        }
      : null,
  }
}

/**
 * Format communication data for agent context
 */
export async function getCommunicationContext(
  communicationId: string
): Promise<Record<string, unknown> | null> {
  const comm = await prisma.crm_communications.findUnique({
    where: { id: communicationId },
    include: {
      leads: {
        select: {
          id: true,
          studentName: true,
          stage: true,
          priority: true,
        },
      },
    },
  })

  if (!comm) return null

  return {
    id: comm.id,
    type: comm.type,
    direction: comm.direction,
    message: comm.message,
    callDuration: comm.callDuration,
    callRecordingUrl: comm.callRecordingUrl,
    sentAt: comm.sentAt,
    lead: comm.leads
      ? {
          id: comm.leads.id,
          name: comm.leads.studentName,
          stage: comm.leads.stage,
          priority: comm.leads.priority,
        }
      : null,
  }
}
