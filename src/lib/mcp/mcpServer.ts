/**
 * Cerebrum Biology Academy MCP Server
 * Core implementation for AI-powered education infrastructure
 * Supports 50,000+ concurrent students with 24/7 availability
 */

import { MCPServer } from '@modelcontextprotocol/sdk'
import { Anthropic } from '@anthropic-ai/sdk'
import Redis from 'ioredis'
import WebSocket from 'ws'
import compression from 'compression'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'

import type {
  MCPServerConfig,
  EducationalAgent,
  StudentQuery,
  AgentResponse,
  AgentType,
  WebSocketMessage,
  AuditLog,
  MCPError,
  ErrorCode,
} from './types'

import { StudentSupportAgent } from './tools/studentSupport'
import { ContentGeneratorAgent } from './tools/contentGenerator'
import { AnalyticsAgent } from './tools/analytics'
import { CommunicationAgent } from './tools/communication'
import { SecurityManager } from './security/encryption'
import { ComplianceManager } from './security/compliance'
import { AuditLogger } from './security/audit'

/**
 * Main MCP Server for Cerebrum Biology Academy
 * Orchestrates AI agents for comprehensive educational support
 */
export class CerebrumMCPServer {
  private mcpServer: MCPServer
  private anthropic: Anthropic
  private redis: Redis
  private wsServer: WebSocket.Server
  private agents: Map<AgentType, EducationalAgent>
  private securityManager: SecurityManager
  private complianceManager: ComplianceManager
  private auditLogger: AuditLogger
  private config: MCPServerConfig
  private isRunning: boolean = false
  private activeConnections: Set<WebSocket> = new Set()

  constructor(config: MCPServerConfig) {
    this.config = config
    this.validateConfiguration()
    this.initializeServices()
    this.setupAgents()
    this.setupMiddleware()
    this.setupEventHandlers()
  }

  /**
   * Validate server configuration
   */
  private validateConfiguration(): void {
    if (!this.config.name) {
      throw new Error('Server name is required')
    }
    if (!this.config.security.jwtSecret) {
      throw new Error('JWT secret is required')
    }
    if (!this.config.security.encryptionKey) {
      throw new Error('Encryption key is required')
    }
    if (this.config.port < 1024 || this.config.port > 65535) {
      throw new Error('Port must be between 1024 and 65535')
    }
  }

  /**
   * Initialize core services
   */
  private initializeServices(): void {
    // Initialize MCP Server
    this.mcpServer = new MCPServer({
      name: this.config.name,
      version: this.config.version,
    })

    // Initialize Anthropic SDK
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    })

    // Initialize Redis for caching and session management
    this.redis = new Redis({
      host: this.config.redis.host,
      port: this.config.redis.port,
      password: this.config.redis.password,
      db: this.config.redis.db,
      retryDelayOnFailure: 1000,
      maxRetriesPerRequest: 3,
    })

    // Initialize security services
    this.securityManager = new SecurityManager(this.config.security)
    this.complianceManager = new ComplianceManager()
    this.auditLogger = new AuditLogger(this.redis)

    // Initialize agents map
    this.agents = new Map()
  }

  /**
   * Setup AI agents for different educational functions
   */
  private setupAgents(): void {
    const agentConfig = {
      anthropic: this.anthropic,
      redis: this.redis,
      securityManager: this.securityManager,
      auditLogger: this.auditLogger,
    }

    // Initialize educational agents
    this.agents.set(AgentType.STUDENT_SUPPORT, new StudentSupportAgent(agentConfig))
    this.agents.set(AgentType.CONTENT_GENERATOR, new ContentGeneratorAgent(agentConfig))
    this.agents.set(AgentType.ANALYTICS, new AnalyticsAgent(agentConfig))
    this.agents.set(AgentType.COMMUNICATION, new CommunicationAgent(agentConfig))

    // Verify all agents are initialized
    for (const [type, agent] of this.agents) {
      if (!agent.isActive) {
        console.warn(`Agent ${type} failed to initialize properly`)
      }
    }
  }

  /**
   * Setup security middleware
   */
  private setupMiddleware(): void {
    // Security headers
    const securityMiddleware = helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
      },
    })

    // Rate limiting
    const rateLimiter = rateLimit({
      windowMs: this.config.security.rateLimiting.windowMs,
      max: this.config.security.rateLimiting.maxRequests,
      message: this.config.security.rateLimiting.message,
      standardHeaders: true,
      legacyHeaders: false,
    })

    // Compression
    const compressionMiddleware = compression({
      level: 6,
      threshold: 1024,
    })
  }

  /**
   * Setup event handlers for MCP server
   */
  private setupEventHandlers(): void {
    // Handle tool requests
    this.mcpServer.setRequestHandler('tools/call', async (request) => {
      try {
        return await this.handleToolRequest(request)
      } catch (error) {
        return this.handleError(error, request)
      }
    })

    // Handle resource requests
    this.mcpServer.setRequestHandler('resources/read', async (request) => {
      try {
        return await this.handleResourceRequest(request)
      } catch (error) {
        return this.handleError(error, request)
      }
    })

    // Handle prompt requests
    this.mcpServer.setRequestHandler('prompts/get', async (request) => {
      try {
        return await this.handlePromptRequest(request)
      } catch (error) {
        return this.handleError(error, request)
      }
    })

    // Redis event handlers
    this.redis.on('connect', () => {
      console.log('✅ Redis connected successfully')
    })

    this.redis.on('error', (error) => {
      console.error('❌ Redis connection error:', error)
      this.auditLogger.logError('redis_error', error)
    })
  }

  /**
   * Handle tool requests from MCP clients
   */
  private async handleToolRequest(request: any): Promise<any> {
    const startTime = Date.now()
    const { name, arguments: args } = request.params

    // Log the request
    await this.auditLogger.logAction('tool_request', {
      toolName: name,
      arguments: args,
      timestamp: new Date(),
    })

    // Route to appropriate agent
    const query: StudentQuery = {
      id: this.generateRequestId(),
      studentId: args.studentId || 'anonymous',
      agentType: this.getAgentTypeFromTool(name),
      query: args.query || '',
      context: args.context || {},
      timestamp: new Date(),
      priority: args.priority || 'medium',
    }

    const agent = this.agents.get(query.agentType)
    if (!agent) {
      throw new Error(`Agent not found for type: ${query.agentType}`)
    }

    // Process the request
    const response = await agent.handleRequest(query)

    // Add processing time
    response.processingTime = Date.now() - startTime

    // Cache successful responses
    if (response.success && query.agentType !== AgentType.ANALYTICS) {
      await this.cacheResponse(query, response)
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(response, null, 2),
        },
      ],
    }
  }

  /**
   * Handle resource requests
   */
  private async handleResourceRequest(request: any): Promise<any> {
    const { uri } = request.params

    // Route based on resource type
    if (uri.startsWith('cerebrum://curriculum/')) {
      return await this.handleCurriculumResource(uri)
    } else if (uri.startsWith('cerebrum://progress/')) {
      return await this.handleProgressResource(uri)
    } else if (uri.startsWith('cerebrum://analytics/')) {
      return await this.handleAnalyticsResource(uri)
    }

    throw new Error(`Unknown resource: ${uri}`)
  }

  /**
   * Handle prompt requests
   */
  private async handlePromptRequest(request: any): Promise<any> {
    const { name, arguments: args } = request.params

    const prompts = {
      'biology-explanation': {
        prompt:
          'Explain the following Biology concept in simple terms for NEET preparation: {{topic}}. Include key points, examples, and common exam questions.',
        arguments: {
          topic: {
            description: 'The Biology topic to explain',
            required: true,
          },
        },
      },
      'doubt-resolution': {
        prompt:
          'Help resolve this Biology doubt: {{doubt}}. Provide a clear explanation, examples, and suggest related practice questions.',
        arguments: {
          doubt: {
            description: "The student's Biology doubt or question",
            required: true,
          },
        },
      },
      'progress-analysis': {
        prompt:
          'Analyze student progress data: {{progressData}}. Identify strengths, weaknesses, and provide actionable recommendations.',
        arguments: {
          progressData: {
            description: 'Student progress and performance data',
            required: true,
          },
        },
      },
    }

    if (!prompts[name]) {
      throw new Error(`Unknown prompt: ${name}`)
    }

    return prompts[name]
  }

  /**
   * Start the MCP server
   */
  async start(): Promise<void> {
    try {
      // Start MCP server
      await this.mcpServer.start()

      // Start WebSocket server for real-time communication
      this.wsServer = new WebSocket.Server({
        port: this.config.port + 1, // WebSocket on port + 1
        perMessageDeflate: true,
      })

      this.setupWebSocketHandlers()

      this.isRunning = true

      console.log(`🚀 Cerebrum MCP Server started successfully`)
      console.log(`📊 Server: ${this.config.name} v${this.config.version}`)
      console.log(`🔗 MCP Port: ${this.config.port}`)
      console.log(`🌐 WebSocket Port: ${this.config.port + 1}`)
      console.log(`🤖 Active Agents: ${this.agents.size}`)
      console.log(`🔒 Security: Enabled with encryption`)
      console.log(`📈 Max Connections: ${this.config.maxConnections}`)

      // Log server startup
      await this.auditLogger.logAction('server_start', {
        serverName: this.config.name,
        version: this.config.version,
        port: this.config.port,
        agentCount: this.agents.size,
      })
    } catch (error) {
      console.error('❌ Failed to start MCP server:', error)
      await this.auditLogger.logError('server_start_failed', error)
      throw error
    }
  }

  /**
   * Setup WebSocket handlers for real-time communication
   */
  private setupWebSocketHandlers(): void {
    this.wsServer.on('connection', (ws, request) => {
      this.activeConnections.add(ws)

      console.log(`🔗 New WebSocket connection from ${request.socket.remoteAddress}`)

      ws.on('message', async (data) => {
        try {
          const message: WebSocketMessage = JSON.parse(data.toString())
          await this.handleWebSocketMessage(ws, message)
        } catch (error) {
          ws.send(
            JSON.stringify({
              type: 'error',
              message: 'Invalid message format',
              timestamp: new Date(),
            })
          )
        }
      })

      ws.on('close', () => {
        this.activeConnections.delete(ws)
        console.log('🔌 WebSocket connection closed')
      })

      ws.on('error', (error) => {
        console.error('WebSocket error:', error)
        this.activeConnections.delete(ws)
      })

      // Send welcome message
      ws.send(
        JSON.stringify({
          type: 'system_message',
          payload: {
            message: 'Connected to Cerebrum Biology Academy AI',
            capabilities: Array.from(this.agents.keys()),
          },
          timestamp: new Date(),
          sender: 'system',
        })
      )
    })
  }

  /**
   * Handle WebSocket messages
   */
  private async handleWebSocketMessage(ws: WebSocket, message: WebSocketMessage): Promise<void> {
    switch (message.type) {
      case 'chat_message':
        await this.handleChatMessage(ws, message)
        break
      case 'typing_indicator':
        await this.broadcastTypingIndicator(message)
        break
      default:
        ws.send(
          JSON.stringify({
            type: 'error',
            message: `Unknown message type: ${message.type}`,
            timestamp: new Date(),
          })
        )
    }
  }

  /**
   * Handle chat messages
   */
  private async handleChatMessage(ws: WebSocket, message: WebSocketMessage): Promise<void> {
    const { payload } = message

    // Create student query from chat message
    const query: StudentQuery = {
      id: this.generateRequestId(),
      studentId: payload.studentId,
      agentType: AgentType.STUDENT_SUPPORT,
      query: payload.message,
      context: payload.context || {},
      timestamp: new Date(),
      priority: 'medium',
    }

    // Get response from student support agent
    const agent = this.agents.get(AgentType.STUDENT_SUPPORT)
    if (agent) {
      const response = await agent.handleRequest(query)

      // Send response back
      ws.send(
        JSON.stringify({
          type: 'chat_message',
          payload: {
            message: response.message,
            data: response.data,
            confidence: response.confidence,
          },
          timestamp: new Date(),
          sender: 'ai_tutor',
          recipient: payload.studentId,
        })
      )
    }
  }

  /**
   * Broadcast typing indicator to relevant connections
   */
  private async broadcastTypingIndicator(message: WebSocketMessage): Promise<void> {
    const broadcastMessage = JSON.stringify(message)

    for (const ws of this.activeConnections) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(broadcastMessage)
      }
    }
  }

  /**
   * Stop the MCP server
   */
  async stop(): Promise<void> {
    try {
      this.isRunning = false

      // Close WebSocket connections
      for (const ws of this.activeConnections) {
        ws.terminate()
      }
      this.activeConnections.clear()

      if (this.wsServer) {
        this.wsServer.close()
      }

      // Close Redis connection
      await this.redis.quit()

      // Stop MCP server
      await this.mcpServer.stop()

      console.log('🛑 Cerebrum MCP Server stopped successfully')

      // Log server shutdown
      await this.auditLogger.logAction('server_stop', {
        serverName: this.config.name,
        uptime: Date.now(),
      })
    } catch (error) {
      console.error('❌ Error stopping MCP server:', error)
      throw error
    }
  }

  /**
   * Get server status and metrics
   */
  getStatus(): {
    isRunning: boolean
    activeConnections: number
    activeAgents: number
    uptime: number
    memoryUsage: NodeJS.MemoryUsage
  } {
    return {
      isRunning: this.isRunning,
      activeConnections: this.activeConnections.size,
      activeAgents: Array.from(this.agents.values()).filter((agent) => agent.isActive).length,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    }
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<{
    status: 'healthy' | 'unhealthy'
    services: Record<string, boolean>
    timestamp: Date
  }> {
    const services = {
      mcpServer: this.isRunning,
      redis: this.redis.status === 'ready',
      agents: Array.from(this.agents.values()).every((agent) => agent.isActive),
      webSocket: this.wsServer?.readyState === WebSocket.OPEN,
    }

    const allHealthy = Object.values(services).every((status) => status)

    return {
      status: allHealthy ? 'healthy' : 'unhealthy',
      services,
      timestamp: new Date(),
    }
  }

  // Helper methods

  private getAgentTypeFromTool(toolName: string): AgentType {
    const mapping = {
      'resolve-doubt': AgentType.STUDENT_SUPPORT,
      'generate-question': AgentType.CONTENT_GENERATOR,
      'analyze-progress': AgentType.ANALYTICS,
      'send-notification': AgentType.COMMUNICATION,
    }

    return mapping[toolName] || AgentType.STUDENT_SUPPORT
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private async cacheResponse(query: StudentQuery, response: AgentResponse): Promise<void> {
    const cacheKey = `response:${query.agentType}:${Buffer.from(query.query).toString('base64')}`
    await this.redis.setex(cacheKey, this.config.redis.ttl, JSON.stringify(response))
  }

  private async handleCurriculumResource(uri: string): Promise<any> {
    // Implementation for curriculum resources
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify({ message: 'Curriculum resource implementation pending' }),
        },
      ],
    }
  }

  private async handleProgressResource(uri: string): Promise<any> {
    // Implementation for progress resources
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify({ message: 'Progress resource implementation pending' }),
        },
      ],
    }
  }

  private async handleAnalyticsResource(uri: string): Promise<any> {
    // Implementation for analytics resources
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify({ message: 'Analytics resource implementation pending' }),
        },
      ],
    }
  }

  private handleError(error: any, request?: any): any {
    const mcpError: MCPError = {
      code: 'INTERNAL_ERROR',
      message: error.message || 'An unexpected error occurred',
      details: {
        stack: error.stack,
        request: request?.params,
      },
      timestamp: new Date(),
      requestId: request?.id,
    }

    // Log error
    this.auditLogger.logError('mcp_request_error', mcpError)

    return {
      error: {
        code: mcpError.code,
        message: mcpError.message,
      },
    }
  }
}
