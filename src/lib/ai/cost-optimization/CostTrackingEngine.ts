/**
 * AI Cost Tracking and Alerting Engine
 * Real-time cost monitoring with intelligent alerts and budget management
 * Optimized for educational platform cost control
 */

import Redis from 'ioredis'
import { getRedisClient } from '@/lib/cache/redis'

interface CostRecord {
  id: string
  timestamp: Date
  provider: string
  model: string
  inputTokens: number
  outputTokens: number
  totalTokens: number
  cost: number
  requestType: 'chat' | 'question-generation' | 'analysis' | 'vision' | 'batch'
  userId?: string
  sessionId?: string
  educationalContext?: {
    subject?: string
    level?: string
    topic?: string
    questionType?: string
  }
  metadata: {
    latency: number
    cached: boolean
    quality: number
    confidence: number
  }
}

interface BudgetAlert {
  id: string
  timestamp: Date
  type: 'warning' | 'critical' | 'emergency'
  message: string
  currentSpend: number
  budgetLimit: number
  threshold: number
  recommendations: string[]
  autoActions?: string[]
}

interface CostMetrics {
  daily: {
    spend: number
    requests: number
    averageCost: number
    savings: number
  }
  weekly: {
    spend: number
    requests: number
    averageCost: number
    savings: number
  }
  monthly: {
    spend: number
    requests: number
    averageCost: number
    savings: number
    budgetUtilization: number
  }
  providerBreakdown: Record<
    string,
    {
      spend: number
      requests: number
      averageCost: number
      percentage: number
    }
  >
  topCostDrivers: Array<{
    category: string
    spend: number
    percentage: number
  }>
}

export class CostTrackingEngine {
  private static instance: CostTrackingEngine
  private redis: Redis
  private costRecords: CostRecord[] = []
  private alerts: BudgetAlert[] = []

  // Budget settings
  private dailyBudget = 50 // $50 per day
  private weeklyBudget = 300 // $300 per week
  private monthlyBudget = 1000 // $1000 per month

  // Alert thresholds
  private warningThreshold = 0.7 // 70%
  private criticalThreshold = 0.85 // 85%
  private emergencyThreshold = 0.95 // 95%

  // Cost optimization targets
  private targetSavingsRate = 0.5 // 50% cost reduction goal
  private maxCostPerRequest = 0.05 // $0.05 max per request

  constructor(redisUrl?: string) {
    this.redis = getRedisClient(redisUrl || process.env.REDIS_URL) as any
    this.initializeCostTracking()
  }

  static getInstance(): CostTrackingEngine {
    if (!CostTrackingEngine.instance) {
      CostTrackingEngine.instance = new CostTrackingEngine()
    }
    return CostTrackingEngine.instance
  }

  private async initializeCostTracking(): Promise<void> {
    console.log('💰 Initializing AI Cost Tracking Engine...')

    // Load existing cost records from Redis
    await this.loadHistoricalData()

    // Set up alert monitoring
    this.startAlertMonitoring()

    console.log('✅ Cost Tracking Engine initialized')
  }

  /**
   * Record a cost transaction
   */
  async recordCost(costData: {
    provider: string
    model: string
    inputTokens: number
    outputTokens: number
    cost: number
    requestType: 'chat' | 'question-generation' | 'analysis' | 'vision' | 'batch'
    userId?: string
    sessionId?: string
    educationalContext?: any
    metadata: {
      latency: number
      cached: boolean
      quality: number
      confidence: number
    }
  }): Promise<void> {
    const record: CostRecord = {
      id: this.generateRecordId(),
      timestamp: new Date(),
      ...costData,
      totalTokens: costData.inputTokens + costData.outputTokens,
    }

    // Store in memory and Redis
    this.costRecords.push(record)
    await this.saveCostRecord(record)

    // Check for budget alerts
    await this.checkBudgetAlerts()

    // Log cost information
    console.log('💳 Cost Recorded:', {
      id: record.id.substring(0, 8),
      provider: record.provider,
      cost: `$${record.cost.toFixed(4)}`,
      tokens: record.totalTokens,
      cached: record.metadata.cached ? '🎯' : '🔄',
      type: record.requestType,
    })

    // Clean up old records periodically
    if (this.costRecords.length > 10000) {
      await this.cleanupOldRecords()
    }
  }

  /**
   * Get real-time cost metrics
   */
  async getCostMetrics(): Promise<CostMetrics> {
    const now = new Date()
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Filter records by time period
    const dailyRecords = this.costRecords.filter((r) => r.timestamp >= oneDayAgo)
    const weeklyRecords = this.costRecords.filter((r) => r.timestamp >= oneWeekAgo)
    const monthlyRecords = this.costRecords.filter((r) => r.timestamp >= oneMonthAgo)

    // Calculate metrics for each period
    const daily = this.calculatePeriodMetrics(dailyRecords)
    const weekly = this.calculatePeriodMetrics(weeklyRecords)
    const monthly = this.calculatePeriodMetrics(monthlyRecords)

    // Add budget utilization for monthly
    monthly.budgetUtilization = (monthly.spend / this.monthlyBudget) * 100

    // Provider breakdown
    const providerBreakdown = this.calculateProviderBreakdown(monthlyRecords)

    // Top cost drivers
    const topCostDrivers = this.calculateTopCostDrivers(monthlyRecords)

    return {
      daily,
      weekly,
      monthly,
      providerBreakdown,
      topCostDrivers,
    }
  }

  /**
   * Calculate savings from optimization strategies
   */
  calculateSavings(): {
    cachingSavings: number
    routingOptimizationSavings: number
    modelOptimizationSavings: number
    totalSavings: number
    savingsRate: number
  } {
    const cachedRequests = this.costRecords.filter((r) => r.metadata.cached)
    const totalRequests = this.costRecords.length

    // Estimate savings from caching (cached requests would have cost full price)
    const cachingSavings = cachedRequests.reduce((sum, record) => {
      // Estimate what the request would have cost without caching
      const estimatedFullCost = record.cost > 0 ? record.cost : this.estimateRequestCost(record)
      return sum + estimatedFullCost
    }, 0)

    // Estimate savings from provider routing (comparing actual costs vs most expensive provider)
    const routingOptimizationSavings = this.costRecords.reduce((sum, record) => {
      const actualCost = record.cost
      const maxCost = this.estimateMaxProviderCost(record)
      return sum + Math.max(0, maxCost - actualCost)
    }, 0)

    // Estimate savings from model optimization
    const modelOptimizationSavings = this.costRecords.reduce((sum, record) => {
      const actualCost = record.cost
      const premiumModelCost = this.estimatePremiumModelCost(record)
      return sum + Math.max(0, premiumModelCost - actualCost)
    }, 0)

    const totalSavings = cachingSavings + routingOptimizationSavings + modelOptimizationSavings
    const totalSpend = this.costRecords.reduce((sum, r) => sum + r.cost, 0)
    const savingsRate = totalSpend > 0 ? totalSavings / (totalSpend + totalSavings) : 0

    return {
      cachingSavings,
      routingOptimizationSavings,
      modelOptimizationSavings,
      totalSavings,
      savingsRate,
    }
  }

  /**
   * Check and generate budget alerts
   */
  private async checkBudgetAlerts(): Promise<void> {
    const metrics = await this.getCostMetrics()

    // Check daily budget
    this.checkBudgetThreshold(metrics.daily.spend, this.dailyBudget, 'daily', 'Daily budget alert')

    // Check weekly budget
    this.checkBudgetThreshold(
      metrics.weekly.spend,
      this.weeklyBudget,
      'weekly',
      'Weekly budget alert'
    )

    // Check monthly budget
    this.checkBudgetThreshold(
      metrics.monthly.spend,
      this.monthlyBudget,
      'monthly',
      'Monthly budget alert'
    )

    // Check for unusual spending patterns
    await this.checkAnomalousSpending()
  }

  /**
   * Check budget threshold and generate alerts
   */
  private checkBudgetThreshold(
    currentSpend: number,
    budgetLimit: number,
    period: string,
    context: string
  ): void {
    const utilization = currentSpend / budgetLimit

    let alertType: 'warning' | 'critical' | 'emergency' | null = null
    let message = ''
    let recommendations: string[] = []

    if (utilization >= this.emergencyThreshold) {
      alertType = 'emergency'
      message = `🚨 EMERGENCY: ${period} spending at ${(utilization * 100).toFixed(1)}% of budget!`
      recommendations = [
        'Immediately enable cost-saving mode',
        'Switch to lowest-cost providers only',
        'Increase cache hit rate',
        'Review and pause non-critical requests',
      ]
    } else if (utilization >= this.criticalThreshold) {
      alertType = 'critical'
      message = `⚠️ CRITICAL: ${period} spending at ${(utilization * 100).toFixed(1)}% of budget`
      recommendations = [
        'Enable aggressive cost optimization',
        'Prioritize Google AI for new requests',
        'Increase cache TTL for educational content',
        'Review high-cost request patterns',
      ]
    } else if (utilization >= this.warningThreshold) {
      alertType = 'warning'
      message = `⚡ WARNING: ${period} spending at ${(utilization * 100).toFixed(1)}% of budget`
      recommendations = [
        'Monitor spending closely',
        'Optimize request routing',
        'Review cache effectiveness',
        'Consider batch processing for bulk requests',
      ]
    }

    if (alertType) {
      this.generateAlert({
        type: alertType,
        message,
        currentSpend,
        budgetLimit,
        threshold: utilization,
        recommendations,
      })
    }
  }

  /**
   * Check for anomalous spending patterns
   */
  private async checkAnomalousSpending(): Promise<void> {
    const recentRecords = this.costRecords.slice(-100) // Last 100 requests

    if (recentRecords.length < 20) return // Need sufficient data

    // Check for cost spikes
    const recentCosts = recentRecords.map((r) => r.cost)
    const averageCost = recentCosts.reduce((a, b) => a + b, 0) / recentCosts.length
    const maxCost = Math.max(...recentCosts)

    if (maxCost > averageCost * 5) {
      // Cost spike > 5x average
      this.generateAlert({
        type: 'warning',
        message: `💸 Cost spike detected: Request cost $${maxCost.toFixed(4)} is ${(maxCost / averageCost).toFixed(1)}x average`,
        currentSpend: maxCost,
        budgetLimit: this.maxCostPerRequest,
        threshold: maxCost / this.maxCostPerRequest,
        recommendations: [
          'Review high-cost request details',
          'Check for inefficient prompt patterns',
          'Consider prompt optimization',
          'Verify model selection is appropriate',
        ],
      })
    }

    // Check for unusual provider distribution
    const providerCounts = recentRecords.reduce(
      (acc, record) => {
        acc[record.provider] = (acc[record.provider] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const expensiveProviderUsage = (providerCounts['openai'] || 0) / recentRecords.length
    if (expensiveProviderUsage > 0.7) {
      // More than 70% expensive provider usage
      this.generateAlert({
        type: 'warning',
        message: `📊 High expensive provider usage: ${(expensiveProviderUsage * 100).toFixed(1)}% OpenAI requests`,
        currentSpend: 0,
        budgetLimit: 0,
        threshold: expensiveProviderUsage,
        recommendations: [
          'Increase Google AI usage for cost savings',
          'Review provider routing logic',
          'Check if Claude is available for reasoning tasks',
          'Consider batch processing for bulk requests',
        ],
      })
    }
  }

  /**
   * Generate and store alert
   */
  private generateAlert(alertData: {
    type: 'warning' | 'critical' | 'emergency'
    message: string
    currentSpend: number
    budgetLimit: number
    threshold: number
    recommendations: string[]
  }): void {
    const alert: BudgetAlert = {
      id: this.generateAlertId(),
      timestamp: new Date(),
      ...alertData,
    }

    this.alerts.push(alert)

    // Save to Redis
    this.saveAlert(alert)

    // Log alert
    console.log(`${this.getAlertEmoji(alert.type)} ${alert.message}`)
    console.log('📋 Recommendations:', alert.recommendations.slice(0, 2))

    // Execute auto-actions for emergency alerts
    if (alert.type === 'emergency') {
      this.executeEmergencyActions(alert)
    }

    // Keep only last 100 alerts
    if (this.alerts.length > 100) {
      this.alerts = this.alerts.slice(-100)
    }
  }

  /**
   * Execute emergency cost reduction actions
   */
  private executeEmergencyActions(alert: BudgetAlert): void {
    console.log('🚨 EXECUTING EMERGENCY COST REDUCTION ACTIONS')

    // These would integrate with your actual AI routing system
    const autoActions = [
      'Enabled cost-saving mode',
      'Switched to Google AI as primary provider',
      'Increased cache TTL to maximum',
      'Enabled request queuing for optimization',
    ]

    alert.autoActions = autoActions

    autoActions.forEach((action) => {
      console.log(`🤖 AUTO-ACTION: ${action}`)
    })
  }

  /**
   * Calculate metrics for a time period
   */
  private calculatePeriodMetrics(records: CostRecord[]): {
    spend: number
    requests: number
    averageCost: number
    savings: number
  } {
    const spend = records.reduce((sum, r) => sum + r.cost, 0)
    const requests = records.length
    const averageCost = requests > 0 ? spend / requests : 0

    // Calculate savings from cached requests
    const cachedRequests = records.filter((r) => r.metadata.cached)
    const savings = cachedRequests.reduce((sum, r) => {
      return sum + this.estimateRequestCost(r)
    }, 0)

    return { spend, requests, averageCost, savings }
  }

  /**
   * Calculate provider breakdown
   */
  private calculateProviderBreakdown(records: CostRecord[]): Record<
    string,
    {
      spend: number
      requests: number
      averageCost: number
      percentage: number
    }
  > {
    const totalSpend = records.reduce((sum, r) => sum + r.cost, 0)
    const breakdown: Record<string, any> = {}

    records.forEach((record) => {
      if (!breakdown[record.provider]) {
        breakdown[record.provider] = {
          spend: 0,
          requests: 0,
          averageCost: 0,
          percentage: 0,
        }
      }

      breakdown[record.provider].spend += record.cost
      breakdown[record.provider].requests += 1
    })

    // Calculate averages and percentages
    Object.keys(breakdown).forEach((provider) => {
      const data = breakdown[provider]
      data.averageCost = data.spend / data.requests
      data.percentage = totalSpend > 0 ? (data.spend / totalSpend) * 100 : 0
    })

    return breakdown
  }

  /**
   * Calculate top cost drivers
   */
  private calculateTopCostDrivers(records: CostRecord[]): Array<{
    category: string
    spend: number
    percentage: number
  }> {
    const totalSpend = records.reduce((sum, r) => sum + r.cost, 0)

    // Group by request type
    const requestTypeSpend = records.reduce(
      (acc, record) => {
        acc[record.requestType] = (acc[record.requestType] || 0) + record.cost
        return acc
      },
      {} as Record<string, number>
    )

    // Convert to array and sort
    const drivers = Object.entries(requestTypeSpend)
      .map(([category, spend]) => ({
        category,
        spend,
        percentage: totalSpend > 0 ? (spend / totalSpend) * 100 : 0,
      }))
      .sort((a, b) => b.spend - a.spend)

    return drivers.slice(0, 5) // Top 5 cost drivers
  }

  /**
   * Estimate request cost for savings calculation
   */
  private estimateRequestCost(record: CostRecord): number {
    // Use provider-specific pricing to estimate cost
    const tokenCount = record.totalTokens

    // Estimated costs per 1K tokens by provider
    const providerCosts = {
      google: 0.0002,
      anthropic: 0.008,
      openai: 0.015,
    }

    const costPer1K = providerCosts[record.provider as keyof typeof providerCosts] || 0.01
    return (tokenCount / 1000) * costPer1K
  }

  /**
   * Estimate maximum provider cost for savings calculation
   */
  private estimateMaxProviderCost(record: CostRecord): number {
    // Assume OpenAI is the most expensive
    const tokenCount = record.totalTokens
    return (tokenCount / 1000) * 0.015 // OpenAI pricing
  }

  /**
   * Estimate premium model cost
   */
  private estimatePremiumModelCost(record: CostRecord): number {
    // Estimate cost if premium model was used
    const tokenCount = record.totalTokens
    return (tokenCount / 1000) * 0.03 // Premium model pricing
  }

  /**
   * Start alert monitoring
   */
  private startAlertMonitoring(): void {
    // Check for alerts every 5 minutes
    setInterval(
      async () => {
        await this.checkBudgetAlerts()
      },
      5 * 60 * 1000
    )

    console.log('🔔 Alert monitoring started')
  }

  /**
   * Load historical data from Redis
   */
  private async loadHistoricalData(): Promise<void> {
    try {
      const keys = await this.redis.keys('ai:cost:record:*')

      for (const key of keys.slice(-1000)) {
        // Load last 1000 records
        const data = await this.redis.get(key)
        if (data) {
          const record = JSON.parse(data) as CostRecord
          record.timestamp = new Date(record.timestamp) // Convert back to Date
          this.costRecords.push(record)
        }
      }

      console.log(`📊 Loaded ${this.costRecords.length} historical cost records`)
    } catch (error) {
      console.warn('Failed to load historical data:', error)
    }
  }

  /**
   * Save cost record to Redis
   */
  private async saveCostRecord(record: CostRecord): Promise<void> {
    const key = `ai:cost:record:${record.id}`
    const data = JSON.stringify(record)

    // Store with 30 day TTL
    await this.redis.setex(key, 30 * 24 * 60 * 60, data)
  }

  /**
   * Save alert to Redis
   */
  private async saveAlert(alert: BudgetAlert): Promise<void> {
    const key = `ai:cost:alert:${alert.id}`
    const data = JSON.stringify(alert)

    // Store with 7 day TTL
    await this.redis.setex(key, 7 * 24 * 60 * 60, data)
  }

  /**
   * Clean up old records
   */
  private async cleanupOldRecords(): Promise<void> {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    this.costRecords = this.costRecords.filter((record) => record.timestamp >= thirtyDaysAgo)

    console.log('🧹 Cleaned up old cost records')
  }

  /**
   * Utility methods
   */
  private generateRecordId(): string {
    return `cost_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
  }

  private generateAlertId(): string {
    return `alert_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
  }

  private getAlertEmoji(type: string): string {
    switch (type) {
      case 'emergency':
        return '🚨'
      case 'critical':
        return '⚠️'
      case 'warning':
        return '⚡'
      default:
        return '📊'
    }
  }

  /**
   * Public API methods
   */

  /**
   * Set budget limits
   */
  setBudgets(budgets: { daily?: number; weekly?: number; monthly?: number }): void {
    if (budgets.daily) this.dailyBudget = budgets.daily
    if (budgets.weekly) this.weeklyBudget = budgets.weekly
    if (budgets.monthly) this.monthlyBudget = budgets.monthly

    console.log('💰 Budget limits updated:', {
      daily: `$${this.dailyBudget}`,
      weekly: `$${this.weeklyBudget}`,
      monthly: `$${this.monthlyBudget}`,
    })
  }

  /**
   * Get recent alerts
   */
  getRecentAlerts(limit: number = 10): BudgetAlert[] {
    return this.alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, limit)
  }

  /**
   * Get cost optimization report
   */
  async getCostOptimizationReport(): Promise<any> {
    const metrics = await this.getCostMetrics()
    const savings = this.calculateSavings()
    const recentAlerts = this.getRecentAlerts(5)

    return {
      summary: {
        monthlySpend: metrics.monthly.spend,
        monthlyBudget: this.monthlyBudget,
        budgetUtilization: metrics.monthly.budgetUtilization,
        totalSavings: savings.totalSavings,
        savingsRate: savings.savingsRate * 100,
        targetSavingsRate: this.targetSavingsRate * 100,
      },
      metrics,
      savings,
      recentAlerts,
      recommendations: this.generateOptimizationRecommendations(metrics, savings),
      performance: {
        averageCostPerRequest: metrics.monthly.averageCost,
        targetCostPerRequest: this.maxCostPerRequest,
        costEfficiency:
          metrics.monthly.averageCost < this.maxCostPerRequest ? 'Good' : 'Needs Improvement',
      },
    }
  }

  /**
   * Generate optimization recommendations
   */
  private generateOptimizationRecommendations(metrics: CostMetrics, savings: any): string[] {
    const recommendations = []

    // Budget utilization recommendations
    if (metrics.monthly.budgetUtilization > 80) {
      recommendations.push('Consider increasing cache hit rate to reduce costs')
      recommendations.push('Optimize provider routing to favor cost-effective options')
    }

    // Savings rate recommendations
    if (savings.savingsRate < this.targetSavingsRate) {
      recommendations.push('Increase intelligent caching for repeated educational content')
      recommendations.push('Route more requests to Google AI for cost savings')
    }

    // Provider distribution recommendations
    const openaiUsage = metrics.providerBreakdown['openai']?.percentage || 0
    if (openaiUsage > 60) {
      recommendations.push(
        'Reduce OpenAI usage and increase Google AI for similar quality at lower cost'
      )
    }

    // Request type recommendations
    const chatCost = metrics.topCostDrivers.find((d) => d.category === 'chat')
    if (chatCost && chatCost.percentage > 70) {
      recommendations.push('Implement batch processing for similar chat requests')
      recommendations.push('Enhance semantic caching for educational Q&A')
    }

    return recommendations
  }

  /**
   * Shutdown cost tracking
   */
  async shutdown(): Promise<void> {
    await this.redis.quit()
    console.log('🛑 Cost Tracking Engine shutdown')
  }
}

// Export singleton instance
export const costTracker = CostTrackingEngine.getInstance()

export default CostTrackingEngine
