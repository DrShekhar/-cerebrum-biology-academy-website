/**
 * Request Batching and Queuing Engine for AI Cost Optimization
 * Intelligent batching to reduce API calls and optimize throughput
 * Specifically designed for educational content processing
 */

import { EventEmitter } from 'events'

interface BatchRequest {
  id: string
  prompt: string
  context?: any
  priority: 'low' | 'medium' | 'high' | 'critical'
  maxWaitTime: number // Maximum time to wait for batching (ms)
  userId?: string
  sessionId?: string
  educationalContext?: {
    subject?: string
    level?: string
    topic?: string
    questionType?: string
  }
  timestamp: Date
  resolve: (result: any) => void
  reject: (error: Error) => void
}

interface Batch {
  id: string
  requests: BatchRequest[]
  provider: string
  estimatedCost: number
  estimatedTokens: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  createdAt: Date
  processedAt?: Date
  results?: any[]
}

interface QueueMetrics {
  totalRequests: number
  batchesCreated: number
  averageBatchSize: number
  averageWaitTime: number
  costSavings: number
  throughputImprovement: number
  queueDepth: number
}

export class RequestBatchingEngine extends EventEmitter {
  private static instance: RequestBatchingEngine
  private requestQueue: Map<string, BatchRequest[]> = new Map() // Organized by similarity groups
  private activeBatches: Map<string, Batch> = new Map()
  private completedBatches: Batch[] = []

  // Batching configuration
  private maxBatchSize = 10 // Maximum requests per batch
  private maxWaitTime = 2000 // Maximum wait time for batching (2 seconds)
  private minBatchSize = 3 // Minimum requests to trigger batching
  private similarityThreshold = 0.8 // Similarity threshold for grouping

  // Educational content batching settings
  private educationalBatchSettings = {
    'question-generation': { maxSize: 20, maxWait: 5000 },
    explanation: { maxSize: 15, maxWait: 3000 },
    assessment: { maxSize: 25, maxWait: 4000 },
    general: { maxSize: 10, maxWait: 2000 },
  }

  // Performance tracking
  private metrics = {
    totalRequests: 0,
    batchesCreated: 0,
    totalWaitTime: 0,
    costSavings: 0,
    requestsProcessed: 0,
  }

  constructor() {
    super()
    this.startBatchProcessor()
    console.log('🔄 Request Batching Engine initialized')
  }

  static getInstance(): RequestBatchingEngine {
    if (!RequestBatchingEngine.instance) {
      RequestBatchingEngine.instance = new RequestBatchingEngine()
    }
    return RequestBatchingEngine.instance
  }

  /**
   * Add request to batching queue
   */
  async queueRequest(requestData: {
    prompt: string
    context?: any
    priority?: 'low' | 'medium' | 'high' | 'critical'
    maxWaitTime?: number
    userId?: string
    sessionId?: string
    educationalContext?: any
  }): Promise<any> {
    return new Promise((resolve, reject) => {
      const request: BatchRequest = {
        id: this.generateRequestId(),
        prompt: requestData.prompt,
        context: requestData.context,
        priority: requestData.priority || 'medium',
        maxWaitTime: this.determineMaxWaitTime(requestData),
        userId: requestData.userId,
        sessionId: requestData.sessionId,
        educationalContext: requestData.educationalContext,
        timestamp: new Date(),
        resolve,
        reject,
      }

      this.metrics.totalRequests++

      // Find appropriate queue for this request
      const queueKey = this.findOptimalQueue(request)

      if (!this.requestQueue.has(queueKey)) {
        this.requestQueue.set(queueKey, [])
      }

      this.requestQueue.get(queueKey)!.push(request)

      console.log('📥 Request queued for batching:', {
        id: request.id.substring(0, 8),
        queue: queueKey,
        priority: request.priority,
        queueSize: this.requestQueue.get(queueKey)!.length,
      })

      // Check if we should immediately process this queue
      this.evaluateQueueForBatching(queueKey)

      // Set timeout for maximum wait time
      setTimeout(() => {
        this.forceProcessRequest(request.id)
      }, request.maxWaitTime)
    })
  }

  /**
   * Find optimal queue for request based on similarity
   */
  private findOptimalQueue(request: BatchRequest): string {
    const requestSignature = this.generateRequestSignature(request)

    // Check existing queues for similarity
    for (const [queueKey, queueRequests] of this.requestQueue) {
      if (queueRequests.length === 0) continue

      const sampleRequest = queueRequests[0]
      const similarity = this.calculateSimilarity(request, sampleRequest)

      if (similarity >= this.similarityThreshold) {
        return queueKey
      }
    }

    // Create new queue for this request type
    return this.generateQueueKey(requestSignature)
  }

  /**
   * Generate request signature for similarity matching
   */
  private generateRequestSignature(request: BatchRequest): string {
    const elements = []

    // Educational context
    if (request.educationalContext) {
      elements.push(`subject:${request.educationalContext.subject || 'general'}`)
      elements.push(`level:${request.educationalContext.level || 'general'}`)
      elements.push(`type:${request.educationalContext.questionType || 'general'}`)
    }

    // Request characteristics
    elements.push(`priority:${request.priority}`)

    // Content type analysis
    const contentType = this.analyzeContentType(request.prompt)
    elements.push(`content:${contentType}`)

    return elements.join('|')
  }

  /**
   * Analyze content type for batching optimization
   */
  private analyzeContentType(prompt: string): string {
    const promptLower = prompt.toLowerCase()

    if (promptLower.includes('generate') && promptLower.includes('question')) {
      return 'question-generation'
    }

    if (promptLower.includes('explain') || promptLower.includes('describe')) {
      return 'explanation'
    }

    if (promptLower.includes('assess') || promptLower.includes('evaluate')) {
      return 'assessment'
    }

    if (promptLower.includes('diagram') || promptLower.includes('image')) {
      return 'visual'
    }

    if (promptLower.includes('compare') || promptLower.includes('contrast')) {
      return 'comparison'
    }

    return 'general'
  }

  /**
   * Calculate similarity between requests
   */
  private calculateSimilarity(request1: BatchRequest, request2: BatchRequest): number {
    let similarity = 0

    // Educational context similarity
    if (request1.educationalContext && request2.educationalContext) {
      const ctx1 = request1.educationalContext
      const ctx2 = request2.educationalContext

      if (ctx1.subject === ctx2.subject) similarity += 0.3
      if (ctx1.level === ctx2.level) similarity += 0.2
      if (ctx1.questionType === ctx2.questionType) similarity += 0.2
    }

    // Priority similarity
    if (request1.priority === request2.priority) similarity += 0.1

    // Content type similarity
    const type1 = this.analyzeContentType(request1.prompt)
    const type2 = this.analyzeContentType(request2.prompt)
    if (type1 === type2) similarity += 0.2

    return similarity
  }

  /**
   * Determine maximum wait time based on request characteristics
   */
  private determineMaxWaitTime(requestData: any): number {
    const priority = requestData.priority || 'medium'
    const contentType = this.analyzeContentType(requestData.prompt || '')

    // Priority-based wait times
    const priorityMultipliers = {
      critical: 0.5, // 50% of normal wait time
      high: 0.7, // 70% of normal wait time
      medium: 1.0, // Normal wait time
      low: 1.5, // 150% of normal wait time
    }

    // Content-type specific settings
    const baseWaitTime =
      this.educationalBatchSettings[contentType as keyof typeof this.educationalBatchSettings]
        ?.maxWait || this.educationalBatchSettings.general.maxWait

    return Math.floor(baseWaitTime * priorityMultipliers[priority])
  }

  /**
   * Evaluate queue for immediate batching
   */
  private evaluateQueueForBatching(queueKey: string): void {
    const queue = this.requestQueue.get(queueKey)
    if (!queue || queue.length === 0) return

    const contentType = this.analyzeContentType(queue[0].prompt)
    const batchSettings =
      this.educationalBatchSettings[contentType as keyof typeof this.educationalBatchSettings] ||
      this.educationalBatchSettings.general

    // Check if we should create a batch
    const shouldBatch =
      queue.length >= batchSettings.maxSize ||
      (queue.length >= this.minBatchSize && this.hasWaitedLongEnough(queue))

    if (shouldBatch) {
      this.createAndProcessBatch(queueKey)
    }
  }

  /**
   * Check if requests have waited long enough
   */
  private hasWaitedLongEnough(queue: BatchRequest[]): boolean {
    const oldestRequest = queue.reduce((oldest, current) =>
      current.timestamp < oldest.timestamp ? current : oldest
    )

    const waitTime = Date.now() - oldestRequest.timestamp.getTime()
    return waitTime >= oldestRequest.maxWaitTime * 0.8 // 80% of max wait time
  }

  /**
   * Create and process batch from queue
   */
  private async createAndProcessBatch(queueKey: string): Promise<void> {
    const queue = this.requestQueue.get(queueKey)
    if (!queue || queue.length === 0) return

    const contentType = this.analyzeContentType(queue[0].prompt)
    const batchSettings =
      this.educationalBatchSettings[contentType as keyof typeof this.educationalBatchSettings] ||
      this.educationalBatchSettings.general

    // Take requests for batch
    const batchRequests = queue.splice(0, Math.min(queue.length, batchSettings.maxSize))

    // Create batch
    const batch: Batch = {
      id: this.generateBatchId(),
      requests: batchRequests,
      provider: this.selectOptimalProvider(batchRequests),
      estimatedCost: this.estimateBatchCost(batchRequests),
      estimatedTokens: this.estimateBatchTokens(batchRequests),
      status: 'pending',
      createdAt: new Date(),
    }

    this.activeBatches.set(batch.id, batch)
    this.metrics.batchesCreated++

    console.log('📦 Batch created:', {
      id: batch.id.substring(0, 8),
      size: batch.requests.length,
      type: contentType,
      provider: batch.provider,
      estimatedCost: `$${batch.estimatedCost.toFixed(4)}`,
    })

    // Process batch
    await this.processBatch(batch)
  }

  /**
   * Process batch of requests
   */
  private async processBatch(batch: Batch): Promise<void> {
    batch.status = 'processing'
    batch.processedAt = new Date()

    try {
      // Create optimized batch prompt
      const batchPrompt = this.createBatchPrompt(batch.requests)

      console.log('⚡ Processing batch:', {
        id: batch.id.substring(0, 8),
        requests: batch.requests.length,
        provider: batch.provider,
      })

      // Simulate batch processing (integrate with your AI Gateway)
      const batchResult = await this.executeAIBatch(batchPrompt, batch)

      // Parse and distribute results
      const individualResults = this.parseBatchResults(batchResult, batch.requests)

      batch.results = individualResults
      batch.status = 'completed'

      // Resolve individual request promises
      batch.requests.forEach((request, index) => {
        const result = individualResults[index]
        if (result.error) {
          request.reject(new Error(result.error))
        } else {
          request.resolve(result)
        }
      })

      // Update metrics
      this.updateBatchMetrics(batch)

      console.log('✅ Batch completed:', {
        id: batch.id.substring(0, 8),
        requests: batch.requests.length,
        costSavings: this.calculateBatchSavings(batch),
      })

      // Move to completed batches
      this.completedBatches.push(batch)
      this.activeBatches.delete(batch.id)

      // Clean up old completed batches
      if (this.completedBatches.length > 100) {
        this.completedBatches = this.completedBatches.slice(-100)
      }
    } catch (error) {
      console.error('❌ Batch processing failed:', error)

      batch.status = 'failed'

      // Reject all requests in the batch
      batch.requests.forEach((request) => {
        request.reject(error as Error)
      })

      this.activeBatches.delete(batch.id)
    }
  }

  /**
   * Create optimized batch prompt
   */
  private createBatchPrompt(requests: BatchRequest[]): string {
    const contentType = this.analyzeContentType(requests[0].prompt)

    let batchPrompt = ''

    if (contentType === 'question-generation') {
      batchPrompt = this.createQuestionGenerationBatch(requests)
    } else if (contentType === 'explanation') {
      batchPrompt = this.createExplanationBatch(requests)
    } else {
      batchPrompt = this.createGeneralBatch(requests)
    }

    return batchPrompt
  }

  /**
   * Create question generation batch prompt
   */
  private createQuestionGenerationBatch(requests: BatchRequest[]): string {
    const topics = requests
      .map((req, index) => {
        const context = req.educationalContext
        const subject = context?.subject || 'Biology'
        const level = context?.level || 'Class 12'

        return `${index + 1}. Topic: ${this.extractTopic(req.prompt)} (${subject}, ${level})`
      })
      .join('\n')

    return `You are an expert biology educator. Generate high-quality questions for the following topics:

${topics}

For each topic, provide:
- 1 multiple choice question with 4 options and correct answer
- 1 short answer question (2-3 lines)
- 1 detailed question requiring explanation

Format: Clearly number each response (1., 2., etc.) to match the topic numbers above.

Requirements:
- Questions should be appropriate for NEET/medical entrance level
- Include clear explanations for correct answers
- Ensure questions test understanding, not just memorization
- Follow NCERT curriculum guidelines`
  }

  /**
   * Create explanation batch prompt
   */
  private createExplanationBatch(requests: BatchRequest[]): string {
    const explanations = requests
      .map((req, index) => {
        const topic = this.extractTopic(req.prompt)
        const level = req.educationalContext?.level || 'intermediate'

        return `${index + 1}. Explain: ${topic} (Level: ${level})`
      })
      .join('\n')

    return `You are an expert biology teacher. Provide clear, comprehensive explanations for the following topics:

${explanations}

For each explanation:
- Start with a simple definition
- Include relevant examples
- Explain the biological significance
- Connect to real-world applications when possible
- Use appropriate scientific terminology for the given level

Format: Number each explanation (1., 2., etc.) to match the topics above.

Requirements:
- Explanations should be accurate and scientifically sound
- Adapt complexity to the specified level
- Include diagrams descriptions where helpful
- Follow NCERT curriculum approach`
  }

  /**
   * Create general batch prompt
   */
  private createGeneralBatch(requests: BatchRequest[]): string {
    const queries = requests
      .map((req, index) => {
        return `${index + 1}. ${req.prompt}`
      })
      .join('\n\n')

    return `Please respond to the following biology-related queries. Number each response clearly (1., 2., etc.):

${queries}

Requirements:
- Provide accurate, comprehensive answers
- Use appropriate scientific terminology
- Include examples where helpful
- Keep responses focused and educational`
  }

  /**
   * Extract topic from prompt
   */
  private extractTopic(prompt: string): string {
    // Simple topic extraction - could be enhanced with NLP
    const keywords = prompt
      .toLowerCase()
      .match(/(?:explain|describe|what is|define)\s+(.+?)(?:\?|$|\.)/i)
    if (keywords && keywords[1]) {
      return keywords[1].trim()
    }

    // Fallback: take first 50 characters
    return prompt.substring(0, 50).trim()
  }

  /**
   * Execute AI batch processing (integrate with your AI Gateway)
   */
  private async executeAIBatch(batchPrompt: string, batch: Batch): Promise<string> {
    // This would integrate with your actual AI Gateway
    // For now, simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000 + batch.requests.length * 200))

    // Simulate batch response
    return (
      `Batch response for ${batch.requests.length} requests:\n\n` +
      batch.requests
        .map((_, index) => `${index + 1}. [Simulated response for request ${index + 1}]`)
        .join('\n\n')
    )
  }

  /**
   * Parse batch results into individual responses
   */
  private parseBatchResults(batchResult: string, requests: BatchRequest[]): any[] {
    // Simple parsing - in production, this would be more sophisticated
    const results = []

    for (let i = 0; i < requests.length; i++) {
      results.push({
        content: `Processed response for request ${i + 1}`,
        metadata: {
          batchProcessed: true,
          batchSize: requests.length,
          processingMethod: 'batch',
        },
      })
    }

    return results
  }

  /**
   * Select optimal provider for batch
   */
  private selectOptimalProvider(requests: BatchRequest[]): string {
    // Analyze batch characteristics to select provider
    const hasHighPriority = requests.some((r) => r.priority === 'critical' || r.priority === 'high')
    const averageComplexity = this.calculateAverageComplexity(requests)

    if (hasHighPriority && averageComplexity > 0.7) {
      return 'anthropic' // Claude for high-priority complex requests
    } else if (averageComplexity < 0.4) {
      return 'google' // Google AI for simple, cost-effective processing
    } else {
      return 'openai' // OpenAI for balanced processing
    }
  }

  /**
   * Calculate average complexity of batch requests
   */
  private calculateAverageComplexity(requests: BatchRequest[]): number {
    let totalComplexity = 0

    requests.forEach((request) => {
      let complexity = 0.5 // Base complexity

      // Analyze prompt for complexity indicators
      const prompt = request.prompt.toLowerCase()

      if (prompt.includes('explain') || prompt.includes('analyze')) complexity += 0.2
      if (prompt.includes('compare') || prompt.includes('evaluate')) complexity += 0.3
      if (prompt.includes('diagram') || prompt.includes('process')) complexity += 0.2
      if (prompt.length > 200) complexity += 0.1

      totalComplexity += Math.min(complexity, 1.0)
    })

    return totalComplexity / requests.length
  }

  /**
   * Estimate batch cost
   */
  private estimateBatchCost(requests: BatchRequest[]): number {
    const totalTokens = this.estimateBatchTokens(requests)

    // Provider-specific pricing (estimated)
    const providerCosts = {
      google: 0.0002,
      anthropic: 0.008,
      openai: 0.015,
    }

    const provider = this.selectOptimalProvider(requests)
    const costPerK = providerCosts[provider as keyof typeof providerCosts] || 0.01

    return (totalTokens / 1000) * costPerK
  }

  /**
   * Estimate batch token usage
   */
  private estimateBatchTokens(requests: BatchRequest[]): number {
    let totalTokens = 0

    requests.forEach((request) => {
      // Base tokens from prompt
      const promptTokens = Math.ceil(request.prompt.split(' ').length * 1.3)

      // Estimated response tokens (varies by content type)
      const contentType = this.analyzeContentType(request.prompt)
      const responseMultiplier = this.getResponseMultiplier(contentType)

      totalTokens += promptTokens + promptTokens * responseMultiplier
    })

    // Batch processing is more efficient
    return Math.floor(totalTokens * 0.8) // 20% efficiency gain from batching
  }

  /**
   * Get response multiplier for content type
   */
  private getResponseMultiplier(contentType: string): number {
    const multipliers = {
      'question-generation': 3.0,
      explanation: 2.5,
      assessment: 2.0,
      comparison: 2.5,
      visual: 1.5,
      general: 2.0,
    }

    return multipliers[contentType as keyof typeof multipliers] || 2.0
  }

  /**
   * Force process request if it has waited too long
   */
  private forceProcessRequest(requestId: string): void {
    // Find the request in queues
    for (const [queueKey, queue] of this.requestQueue) {
      const requestIndex = queue.findIndex((r) => r.id === requestId)

      if (requestIndex !== -1) {
        const request = queue[requestIndex]

        // Remove from queue and process immediately
        queue.splice(requestIndex, 1)

        console.log('⏰ Force processing request due to timeout:', {
          id: request.id.substring(0, 8),
          waitTime: Date.now() - request.timestamp.getTime(),
        })

        // Process as single request or create minimal batch
        this.processSingleRequest(request)
        break
      }
    }
  }

  /**
   * Process single request outside of batching
   */
  private async processSingleRequest(request: BatchRequest): Promise<void> {
    try {
      // This would integrate with your AI Gateway for single request processing
      const result = {
        content: `Single processed response for: ${request.prompt.substring(0, 50)}...`,
        metadata: {
          batchProcessed: false,
          processingMethod: 'single',
        },
      }

      request.resolve(result)
    } catch (error) {
      request.reject(error as Error)
    }
  }

  /**
   * Start batch processor
   */
  private startBatchProcessor(): void {
    // Process queues every 500ms
    setInterval(() => {
      for (const queueKey of this.requestQueue.keys()) {
        this.evaluateQueueForBatching(queueKey)
      }
    }, 500)

    console.log('🔄 Batch processor started')
  }

  /**
   * Update batch metrics
   */
  private updateBatchMetrics(batch: Batch): void {
    const processingTime = batch.processedAt!.getTime() - batch.createdAt.getTime()

    batch.requests.forEach((request) => {
      const waitTime = batch.createdAt.getTime() - request.timestamp.getTime()
      this.metrics.totalWaitTime += waitTime
      this.metrics.requestsProcessed++
    })

    // Calculate cost savings
    const individualCost = this.estimateIndividualCost(batch.requests)
    const savings = individualCost - batch.estimatedCost
    this.metrics.costSavings += savings
  }

  /**
   * Estimate cost if requests were processed individually
   */
  private estimateIndividualCost(requests: BatchRequest[]): number {
    return requests.reduce((total, request) => {
      const tokens = Math.ceil(request.prompt.split(' ').length * 1.3 * 2.5) // Estimated tokens
      return total + (tokens / 1000) * 0.01 // Average cost per 1K tokens
    }, 0)
  }

  /**
   * Calculate batch savings
   */
  private calculateBatchSavings(batch: Batch): string {
    const individualCost = this.estimateIndividualCost(batch.requests)
    const savings = individualCost - batch.estimatedCost
    const savingsPercentage = (savings / individualCost) * 100

    return `$${savings.toFixed(4)} (${savingsPercentage.toFixed(1)}%)`
  }

  /**
   * Get batching metrics
   */
  getMetrics(): QueueMetrics {
    const queueDepth = Array.from(this.requestQueue.values()).reduce(
      (total, queue) => total + queue.length,
      0
    )

    return {
      totalRequests: this.metrics.totalRequests,
      batchesCreated: this.metrics.batchesCreated,
      averageBatchSize:
        this.metrics.batchesCreated > 0
          ? this.metrics.requestsProcessed / this.metrics.batchesCreated
          : 0,
      averageWaitTime:
        this.metrics.requestsProcessed > 0
          ? this.metrics.totalWaitTime / this.metrics.requestsProcessed
          : 0,
      costSavings: this.metrics.costSavings,
      throughputImprovement: this.calculateThroughputImprovement(),
      queueDepth,
    }
  }

  /**
   * Calculate throughput improvement from batching
   */
  private calculateThroughputImprovement(): number {
    if (this.metrics.batchesCreated === 0) return 0

    const batchEfficiency = this.metrics.requestsProcessed / this.metrics.batchesCreated
    return Math.max(0, (batchEfficiency - 1) * 100) // Percentage improvement
  }

  /**
   * Utility methods
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
  }

  private generateBatchId(): string {
    return `batch_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
  }

  private generateQueueKey(signature: string): string {
    return `queue_${signature.replace(/[^a-zA-Z0-9]/g, '_')}`
  }

  /**
   * Get active queues status
   */
  getQueuesStatus(): Array<{
    queueKey: string
    size: number
    oldestRequest: Date
    contentType: string
  }> {
    return Array.from(this.requestQueue.entries())
      .filter(([_, queue]) => queue.length > 0)
      .map(([queueKey, queue]) => ({
        queueKey,
        size: queue.length,
        oldestRequest: queue.reduce((oldest, current) =>
          current.timestamp < oldest.timestamp ? current : oldest
        ).timestamp,
        contentType: this.analyzeContentType(queue[0].prompt),
      }))
      .sort((a, b) => b.size - a.size)
  }

  /**
   * Get processing report
   */
  getProcessingReport(): any {
    const metrics = this.getMetrics()
    const queuesStatus = this.getQueuesStatus()

    return {
      metrics,
      queuesStatus,
      activeBatches: this.activeBatches.size,
      recentBatches: this.completedBatches.slice(-10).map((batch) => ({
        id: batch.id.substring(0, 8),
        size: batch.requests.length,
        cost: batch.estimatedCost,
        savings: this.calculateBatchSavings(batch),
        processingTime: batch.processedAt
          ? batch.processedAt.getTime() - batch.createdAt.getTime()
          : 0,
      })),
      recommendations: this.generateBatchingRecommendations(metrics),
    }
  }

  /**
   * Generate batching recommendations
   */
  private generateBatchingRecommendations(metrics: QueueMetrics): string[] {
    const recommendations = []

    if (metrics.averageBatchSize < 5) {
      recommendations.push('Consider increasing max wait time to improve batch sizes')
    }

    if (metrics.averageWaitTime > 3000) {
      recommendations.push('Reduce max wait time to improve response latency')
    }

    if (metrics.queueDepth > 20) {
      recommendations.push('High queue depth detected - consider increasing processing capacity')
    }

    if (metrics.costSavings < 100) {
      recommendations.push('Optimize batching grouping to increase cost savings')
    }

    return recommendations
  }
}

// Export singleton instance
export const batchingEngine = RequestBatchingEngine.getInstance()

export default RequestBatchingEngine
