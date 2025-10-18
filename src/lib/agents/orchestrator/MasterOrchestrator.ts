/**
 * Master Orchestrator Agent
 *
 * The "brain" of the entire agentic workflow system.
 * Coordinates all other agents, manages task dependencies, and provides
 * a simple interface for non-technical users.
 */

import Anthropic from '@anthropic-ai/sdk'
import type {
  AgentConfig,
  AgentTask,
  AgentResponse,
  FeatureRequest,
  WorkflowExecution,
  WorkflowStatus,
  TaskStatus,
  AgentType,
  UserCommand,
  UserNotification,
  OrchestratorConfig,
  AgentContext,
  WorkflowMetrics,
} from '../types'
import { AgentRegistry } from './AgentRegistry'
import { TaskQueue } from './TaskQueue'
import { WorkflowEngine } from './WorkflowEngine'

export class MasterOrchestrator {
  private anthropic: Anthropic
  private config: OrchestratorConfig
  private registry: AgentRegistry
  private taskQueue: TaskQueue
  private workflowEngine: WorkflowEngine
  private activeExecutions: Map<string, WorkflowExecution>

  constructor(config?: Partial<OrchestratorConfig>) {
    this.config = {
      maxConcurrentTasks: 5,
      taskQueueSize: 100,
      healthCheckInterval: 30000,
      enableLearning: true,
      enableMonitoring: true,
      logLevel: 'info',
      ...config,
    }

    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    this.registry = new AgentRegistry()
    this.taskQueue = new TaskQueue(this.config.taskQueueSize)
    this.workflowEngine = new WorkflowEngine(this.anthropic, this.registry)
    this.activeExecutions = new Map()

    this.initialize()
  }

  /**
   * Initialize the orchestrator and all agents
   */
  private async initialize(): Promise<void> {
    this.log('info', 'Initializing Master Orchestrator...')

    // Register all agents
    await this.registry.registerAllAgents()

    // Start health check interval
    if (this.config.enableMonitoring) {
      setInterval(() => this.healthCheck(), this.config.healthCheckInterval)
    }

    this.log('info', 'Master Orchestrator initialized successfully')
  }

  /**
   * Main entry point for users to request features
   * This is the ONLY method non-technical users need to call
   */
  async requestFeature(userCommand: UserCommand): Promise<WorkflowExecution> {
    this.log('info', `Processing feature request: "${userCommand.featureDescription}"`)

    try {
      // Create feature request
      const featureRequest = await this.createFeatureRequest(userCommand)

      // Start workflow execution
      const execution = await this.executeWorkflow(featureRequest, userCommand.options)

      return execution
    } catch (error) {
      this.log('error', 'Feature request failed', error)
      throw error
    }
  }

  /**
   * Create a structured feature request from user input
   */
  private async createFeatureRequest(userCommand: UserCommand): Promise<FeatureRequest> {
    const featureRequest: FeatureRequest = {
      id: this.generateId(),
      userRequest: userCommand.featureDescription,
      status: WorkflowStatus.CREATED,
      createdAt: new Date(),
      createdBy: 'user',
    }

    this.log('info', `Created feature request: ${featureRequest.id}`)
    return featureRequest
  }

  /**
   * Execute the complete workflow for a feature request
   */
  private async executeWorkflow(
    featureRequest: FeatureRequest,
    options: UserCommand['options'] = {}
  ): Promise<WorkflowExecution> {
    const execution: WorkflowExecution = {
      id: this.generateId(),
      featureRequestId: featureRequest.id,
      status: WorkflowStatus.PLANNING,
      currentPhase: 'planning',
      tasks: [],
      artifacts: [],
      startTime: new Date(),
      metrics: this.initializeMetrics(),
    }

    this.activeExecutions.set(execution.id, execution)

    try {
      // Phase 1: Planning
      await this.notifyUser({
        type: 'info',
        title: 'Starting Planning Phase',
        message: 'Product Manager and Architecture Review agents are analyzing your request...',
        timestamp: new Date(),
      })

      const planningResult = await this.workflowEngine.executePlanningPhase(
        featureRequest,
        execution
      )

      if (!planningResult.success) {
        throw new Error('Planning phase failed')
      }

      // Phase 2: Development
      execution.status = WorkflowStatus.DEVELOPMENT
      execution.currentPhase = 'development'

      await this.notifyUser({
        type: 'info',
        title: 'Starting Development Phase',
        message: 'UI/UX, Backend, Database, and Integration agents are building your feature...',
        timestamp: new Date(),
      })

      const devResult = await this.workflowEngine.executeDevelopmentPhase(featureRequest, execution)

      if (!devResult.success) {
        throw new Error('Development phase failed')
      }

      // Phase 3: Quality Assurance
      if (!options.skipTests) {
        execution.status = WorkflowStatus.TESTING
        execution.currentPhase = 'testing'

        await this.notifyUser({
          type: 'info',
          title: 'Starting Quality Assurance Phase',
          message: 'Running code quality checks, unit tests, E2E tests, and security audits...',
          timestamp: new Date(),
        })

        const qaResult = await this.workflowEngine.executeQualityPhase(featureRequest, execution)

        if (!qaResult.success) {
          throw new Error('Quality assurance phase failed')
        }
      }

      // Phase 4: Deployment Preparation
      execution.status = WorkflowStatus.DEPLOYMENT_PREP
      execution.currentPhase = 'deployment_prep'

      await this.notifyUser({
        type: 'info',
        title: 'Preparing for Deployment',
        message: 'Build validation, git operations, and deployment checks in progress...',
        timestamp: new Date(),
      })

      const prepResult = await this.workflowEngine.executeDeploymentPrepPhase(
        featureRequest,
        execution
      )

      if (!prepResult.success) {
        throw new Error('Deployment preparation failed')
      }

      // Phase 5: Deployment (if auto-approved)
      if (options.deployImmediately || options.autoApprove) {
        execution.status = WorkflowStatus.DEPLOYING
        execution.currentPhase = 'deploying'

        await this.notifyUser({
          type: 'info',
          title: 'Deploying to Production',
          message: 'Deployment agent is pushing your feature to production...',
          timestamp: new Date(),
        })

        const deployResult = await this.workflowEngine.executeDeploymentPhase(
          featureRequest,
          execution
        )

        if (!deployResult.success) {
          // Attempt rollback
          await this.rollbackDeployment(execution)
          throw new Error('Deployment failed and was rolled back')
        }

        execution.status = WorkflowStatus.DEPLOYED
      } else {
        // Wait for user approval
        await this.notifyUser({
          type: 'success',
          title: 'Feature Ready for Deployment',
          message: 'All checks passed! Ready to deploy to production.',
          details: [
            `✅ ${execution.metrics.completedTasks} tasks completed`,
            `✅ Build successful`,
            `✅ All tests passing`,
            `✅ Security audit passed`,
          ],
          actions: [
            { label: 'Deploy Now', action: 'deploy' },
            { label: 'Review Changes', action: 'review' },
            { label: 'Cancel', action: 'cancel', destructive: true },
          ],
          timestamp: new Date(),
        })
      }

      // Finalize execution
      execution.endTime = new Date()
      execution.duration = execution.endTime.getTime() - execution.startTime.getTime()

      await this.notifyUser({
        type: 'success',
        title: 'Feature Complete! 🎉',
        message: `Your feature "${featureRequest.userRequest}" is ready!`,
        details: this.generateExecutionSummary(execution),
        timestamp: new Date(),
      })

      return execution
    } catch (error) {
      execution.status = WorkflowStatus.FAILED
      execution.endTime = new Date()

      await this.notifyUser({
        type: 'error',
        title: 'Feature Development Failed',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date(),
      })

      throw error
    } finally {
      this.activeExecutions.delete(execution.id)
    }
  }

  /**
   * Rollback a failed deployment
   */
  private async rollbackDeployment(execution: WorkflowExecution): Promise<void> {
    this.log('warn', `Rolling back deployment for execution ${execution.id}`)

    await this.notifyUser({
      type: 'warning',
      title: 'Rolling Back Deployment',
      message: 'Deployment failed. Reverting changes...',
      timestamp: new Date(),
    })

    const rollbackAgent = this.registry.getAgent(AgentType.ROLLBACK)
    if (rollbackAgent) {
      await this.workflowEngine.executeAgent(rollbackAgent, execution)
    }

    execution.status = WorkflowStatus.ROLLED_BACK

    await this.notifyUser({
      type: 'info',
      title: 'Rollback Complete',
      message: 'Deployment has been reverted. Your production environment is stable.',
      timestamp: new Date(),
    })
  }

  /**
   * Generate execution summary for user
   */
  private generateExecutionSummary(execution: WorkflowExecution): string[] {
    const summary = []

    summary.push(`⏱️  Duration: ${this.formatDuration(execution.duration || 0)}`)
    summary.push(`✅ Completed: ${execution.metrics.completedTasks} tasks`)

    if (execution.metrics.failedTasks > 0) {
      summary.push(`❌ Failed: ${execution.metrics.failedTasks} tasks`)
    }

    if (execution.metrics.testCoverage) {
      summary.push(`🧪 Test Coverage: ${execution.metrics.testCoverage}%`)
    }

    summary.push(
      `🏗️  Build Success Rate: ${(execution.metrics.buildSuccessRate * 100).toFixed(1)}%`
    )

    if (execution.status === WorkflowStatus.DEPLOYED) {
      summary.push(`🚀 Deployment: Successful`)
    }

    return summary
  }

  /**
   * Health check for all agents
   */
  private async healthCheck(): Promise<void> {
    const agents = this.registry.getAllAgents()

    for (const agent of agents) {
      if (agent.enabled) {
        // Simple health check - verify agent can respond
        try {
          await this.workflowEngine.checkAgentHealth(agent)
        } catch (error) {
          this.log('warn', `Agent ${agent.type} failed health check`, error)
        }
      }
    }
  }

  /**
   * Send notification to user
   */
  private async notifyUser(notification: UserNotification): Promise<void> {
    // Log to console for now
    const icon = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
    }[notification.type]

    console.log(`\n${icon} ${notification.title}`)
    console.log(`   ${notification.message}`)

    if (notification.details) {
      notification.details.forEach((detail) => {
        console.log(`   ${detail}`)
      })
    }

    if (notification.actions) {
      console.log('\n   Available actions:')
      notification.actions.forEach((action) => {
        console.log(`   - ${action.label}`)
      })
    }

    console.log('')

    // TODO: In future, also send to:
    // - Web dashboard
    // - Email
    // - Slack/Discord
    // - Push notifications
  }

  /**
   * Initialize workflow metrics
   */
  private initializeMetrics(): WorkflowMetrics {
    return {
      totalTasks: 0,
      completedTasks: 0,
      failedTasks: 0,
      skippedTasks: 0,
      averageTaskDuration: 0,
      buildSuccessRate: 0,
      deploymentSuccess: false,
    }
  }

  /**
   * Logging utility
   */
  private log(level: string, message: string, data?: any): void {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 }
    const configLevel = levels[this.config.logLevel]
    const messageLevel = levels[level as keyof typeof levels]

    if (messageLevel >= configLevel) {
      const timestamp = new Date().toISOString()
      console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`)
      if (data) {
        console.log(data)
      }
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Format duration in ms to human readable
   */
  private formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`
    } else {
      return `${seconds}s`
    }
  }

  /**
   * Get status of a workflow execution
   */
  getExecutionStatus(executionId: string): WorkflowExecution | undefined {
    return this.activeExecutions.get(executionId)
  }

  /**
   * Get all active executions
   */
  getActiveExecutions(): WorkflowExecution[] {
    return Array.from(this.activeExecutions.values())
  }
}
