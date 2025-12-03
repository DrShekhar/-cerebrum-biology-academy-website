/**
 * Agent Processor
 *
 * Background processor that executes pending agent tasks from the queue.
 * Should be called periodically (e.g., via cron job or Vercel cron).
 */

import { AgentType, AgentTaskStatus } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { createAgent, AgentContext, AgentTaskManager } from './index'
import { CallTranscriptionService } from './callTranscription'

interface ProcessorConfig {
  batchSize: number
  maxRetries: number
  retryDelayMs: number
  timeoutMs: number
}

interface ProcessorResult {
  processed: number
  succeeded: number
  failed: number
  skipped: number
  errors: Array<{ taskId: string; error: string }>
}

const DEFAULT_CONFIG: ProcessorConfig = {
  batchSize: 10,
  maxRetries: 3,
  retryDelayMs: 5000,
  timeoutMs: 60000, // 1 minute per task
}

export class AgentProcessor {
  private config: ProcessorConfig
  private transcriptionService: CallTranscriptionService
  private isRunning: boolean = false

  constructor(config: Partial<ProcessorConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
    this.transcriptionService = new CallTranscriptionService()
  }

  /**
   * Process pending agent tasks
   */
  async processPendingTasks(): Promise<ProcessorResult> {
    if (this.isRunning) {
      console.log('[PROCESSOR] Already running, skipping...')
      return { processed: 0, succeeded: 0, failed: 0, skipped: 0, errors: [] }
    }

    this.isRunning = true
    const result: ProcessorResult = {
      processed: 0,
      succeeded: 0,
      failed: 0,
      skipped: 0,
      errors: [],
    }

    try {
      console.log('[PROCESSOR] Starting agent task processing...')

      // Get pending tasks
      const tasks = await this.getPendingTasks()
      console.log(`[PROCESSOR] Found ${tasks.length} pending tasks`)

      for (const task of tasks) {
        try {
          result.processed++
          await this.processTask(task)
          result.succeeded++
        } catch (error) {
          result.failed++
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          result.errors.push({ taskId: task.id, error: errorMessage })
          console.error(`[PROCESSOR] Task ${task.id} failed:`, error)
        }
      }

      console.log(`[PROCESSOR] Complete: ${result.succeeded} succeeded, ${result.failed} failed`)
    } finally {
      this.isRunning = false
    }

    return result
  }

  /**
   * Get pending tasks from the queue
   */
  private async getPendingTasks() {
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
      },
      orderBy: [{ scheduledAt: 'asc' }, { createdAt: 'asc' }],
      take: this.config.batchSize,
    })
  }

  /**
   * Process a single task
   */
  private async processTask(task: {
    id: string
    agentType: AgentType
    leadId: string | null
    communicationId: string | null
    input: unknown
    attempt: number
    maxAttempts: number
  }): Promise<void> {
    console.log(`[PROCESSOR] Processing task ${task.id} (${task.agentType})`)

    // Mark as running
    await AgentTaskManager.markRunning(task.id)

    try {
      // Handle transcription separately
      if (task.agentType === AgentType.CALL_TRANSCRIPTION) {
        await this.handleTranscription(task)
        return
      }

      // Get the appropriate agent
      const agent = createAgent(task.agentType)
      if (!agent) {
        throw new Error(`No agent available for type: ${task.agentType}`)
      }

      // Build context
      const context: AgentContext = {
        leadId: task.leadId || undefined,
        communicationId: task.communicationId || undefined,
        metadata: task.input as Record<string, unknown>,
      }

      // Execute with timeout
      const response = await Promise.race([
        agent.execute(context),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Task timeout')), this.config.timeoutMs)
        ),
      ])

      if (!response || typeof response !== 'object') {
        throw new Error('Invalid agent response')
      }

      const agentResponse = response as { success: boolean; message: string; data?: unknown }

      if (agentResponse.success) {
        await AgentTaskManager.markCompleted(task.id, {
          message: agentResponse.message,
          data: agentResponse.data,
        })
      } else {
        throw new Error(agentResponse.message || 'Agent execution failed')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      await AgentTaskManager.markFailed(task.id, errorMessage)
      throw error
    }
  }

  /**
   * Handle transcription tasks
   */
  private async handleTranscription(task: {
    id: string
    communicationId: string | null
  }): Promise<void> {
    if (!task.communicationId) {
      throw new Error('Communication ID required for transcription')
    }

    const result = await this.transcriptionService.transcribeAndStore(task.communicationId)

    if (result.success) {
      await AgentTaskManager.markCompleted(task.id, {
        transcript: result.transcript?.substring(0, 500) + '...',
        duration: result.duration,
        language: result.language,
      })
    } else {
      throw new Error(result.error || 'Transcription failed')
    }
  }

  /**
   * Get processor statistics
   */
  async getStats(): Promise<{
    queue: {
      pending: number
      running: number
      completed: number
      failed: number
    }
    byType: Record<string, number>
    recentErrors: Array<{ taskId: string; error: string; timestamp: Date }>
  }> {
    const stats = await AgentTaskManager.getStats()

    // Get recent errors
    const recentErrors = await prisma.agent_tasks.findMany({
      where: {
        status: AgentTaskStatus.FAILED,
        error: { not: null },
      },
      orderBy: { updatedAt: 'desc' },
      take: 10,
      select: {
        id: true,
        error: true,
        updatedAt: true,
      },
    })

    return {
      queue: {
        pending: stats.pending,
        running: stats.running,
        completed: stats.completed,
        failed: stats.failed,
      },
      byType: stats.byType,
      recentErrors: recentErrors.map((e) => ({
        taskId: e.id,
        error: e.error || 'Unknown error',
        timestamp: e.updatedAt,
      })),
    }
  }

  /**
   * Clean up old completed/failed tasks
   */
  async cleanup(olderThanDays: number = 30): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays)

    const result = await prisma.agent_tasks.deleteMany({
      where: {
        status: { in: [AgentTaskStatus.COMPLETED, AgentTaskStatus.FAILED] },
        updatedAt: { lt: cutoffDate },
      },
    })

    console.log(`[PROCESSOR] Cleaned up ${result.count} old tasks`)
    return result.count
  }
}

// Singleton instance for easy access
export const agentProcessor = new AgentProcessor()

/**
 * Process pending tasks (for cron jobs)
 */
export async function processPendingAgentTasks(): Promise<ProcessorResult> {
  return agentProcessor.processPendingTasks()
}
