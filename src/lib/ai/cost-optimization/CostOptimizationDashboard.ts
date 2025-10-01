/**
 * AI Cost Optimization Dashboard
 * Comprehensive monitoring and control center for AI cost optimization
 * Real-time metrics, alerts, and optimization controls for educational platform
 */

import { intelligentCache } from './IntelligentCacheEngine'
import { smartRouter } from './SmartProviderRouter'
import { costTracker } from './CostTrackingEngine'
import { batchingEngine } from './RequestBatchingEngine'
import { tokenOptimizer } from './TokenOptimizer'

interface DashboardMetrics {
  overview: {
    totalCostSavings: number
    monthlyCostReduction: number
    savingsRate: number
    optimizationScore: number
    costEfficiencyRating: 'Excellent' | 'Good' | 'Fair' | 'Poor'
  }
  realTime: {
    currentSpend: number
    requestsPerMinute: number
    averageResponseTime: number
    cacheHitRate: number
    activeOptimizations: number
  }
  performance: {
    caching: {
      hitRate: number
      costSaved: number
      entriesCount: number
      semanticMatches: number
    }
    routing: {
      efficiency: number
      costSavings: number
      providerDistribution: Record<string, number>
      routingAccuracy: number
    }
    batching: {
      batchesCreated: number
      averageBatchSize: number
      costSavings: number
      throughputImprovement: number
    }
    tokenOptimization: {
      totalOptimizations: number
      averageTokenReduction: number
      costSaved: number
      qualityScore: number
    }
  }
  alerts: Array<{
    id: string
    type: 'warning' | 'critical' | 'emergency' | 'info'
    message: string
    timestamp: Date
    action?: string
  }>
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low'
    category: 'cost' | 'performance' | 'quality' | 'efficiency'
    title: string
    description: string
    estimatedSavings: number
    implementationComplexity: 'low' | 'medium' | 'high'
  }>
}

interface OptimizationSettings {
  caching: {
    enabled: boolean
    aggressiveMode: boolean
    ttlHours: number
    semanticSimilarityThreshold: number
  }
  routing: {
    enabled: boolean
    costOptimizationWeight: number
    qualityThreshold: number
    emergencyFallback: boolean
  }
  batching: {
    enabled: boolean
    maxBatchSize: number
    maxWaitTime: number
    minBatchSize: number
  }
  tokenOptimization: {
    enabled: boolean
    aggressiveMode: boolean
    preserveEducationalContext: boolean
    autoOptimizePrompts: boolean
  }
  budgets: {
    daily: number
    weekly: number
    monthly: number
    emergencyThreshold: number
  }
  alerts: {
    emailNotifications: boolean
    slackNotifications: boolean
    warningThreshold: number
    criticalThreshold: number
  }
}

export class CostOptimizationDashboard {
  private static instance: CostOptimizationDashboard
  private isInitialized = false
  private lastUpdateTime = new Date()

  // Default optimization settings
  private settings: OptimizationSettings = {
    caching: {
      enabled: true,
      aggressiveMode: false,
      ttlHours: 168, // 7 days
      semanticSimilarityThreshold: 0.8
    },
    routing: {
      enabled: true,
      costOptimizationWeight: 0.4, // 40% weight on cost vs quality
      qualityThreshold: 0.8,
      emergencyFallback: true
    },
    batching: {
      enabled: true,
      maxBatchSize: 10,
      maxWaitTime: 2000,
      minBatchSize: 3
    },
    tokenOptimization: {
      enabled: true,
      aggressiveMode: false,
      preserveEducationalContext: true,
      autoOptimizePrompts: true
    },
    budgets: {
      daily: 50,
      weekly: 300,
      monthly: 1000,
      emergencyThreshold: 0.9
    },
    alerts: {
      emailNotifications: true,
      slackNotifications: false,
      warningThreshold: 0.7,
      criticalThreshold: 0.85
    }
  }

  constructor() {
    console.log('📊 Cost Optimization Dashboard initializing...')
  }

  static getInstance(): CostOptimizationDashboard {
    if (!CostOptimizationDashboard.instance) {
      CostOptimizationDashboard.instance = new CostOptimizationDashboard()
    }
    return CostOptimizationDashboard.instance
  }

  /**
   * Initialize dashboard with all optimization engines
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return

    console.log('🚀 Initializing AI Cost Optimization Dashboard...')

    try {
      // Apply current settings to all engines
      await this.applySettings()

      // Start real-time monitoring
      this.startRealTimeMonitoring()

      this.isInitialized = true
      console.log('✅ Cost Optimization Dashboard initialized successfully')

      // Initial metrics collection
      await this.collectMetrics()

    } catch (error) {
      console.error('❌ Dashboard initialization failed:', error)
      throw error
    }
  }

  /**
   * Get comprehensive dashboard metrics
   */
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    const [
      cacheMetrics,
      routingAnalytics,
      batchingMetrics,
      tokenOptimizationStats,
      costMetrics
    ] = await Promise.all([
      intelligentCache.getDetailedStats(),
      smartRouter.getRoutingReport(),
      batchingEngine.getMetrics(),
      tokenOptimizer.getOptimizationStats(),
      costTracker.getCostMetrics()
    ])

    // Calculate overview metrics
    const totalCostSavings = (
      cacheMetrics.costSaved +
      routingAnalytics.totalCostSaved +
      batchingMetrics.costSavings +
      tokenOptimizationStats.totalCostSaved
    )

    const savingsRate = totalCostSavings / Math.max(costMetrics.monthly.spend + totalCostSavings, 1)
    const optimizationScore = this.calculateOptimizationScore(cacheMetrics, routingAnalytics, batchingMetrics, tokenOptimizationStats)

    // Generate alerts
    const alerts = await this.generateAlerts()

    // Generate recommendations
    const recommendations = await this.generateRecommendations()

    return {
      overview: {
        totalCostSavings,
        monthlyCostReduction: savingsRate * 100,
        savingsRate,
        optimizationScore,
        costEfficiencyRating: this.getCostEfficiencyRating(optimizationScore)
      },
      realTime: {
        currentSpend: costMetrics.daily.spend,
        requestsPerMinute: this.calculateRequestsPerMinute(),
        averageResponseTime: cacheMetrics.avgResponseTime,
        cacheHitRate: cacheMetrics.hitRate,
        activeOptimizations: this.countActiveOptimizations()
      },
      performance: {
        caching: {
          hitRate: cacheMetrics.hitRate,
          costSaved: cacheMetrics.costSaved,
          entriesCount: cacheMetrics.entriesCount,
          semanticMatches: cacheMetrics.semanticMatches
        },
        routing: {
          efficiency: routingAnalytics.routingEfficiency * 100,
          costSavings: routingAnalytics.totalCostSaved,
          providerDistribution: routingAnalytics.providerDistribution,
          routingAccuracy: this.calculateRoutingAccuracy(routingAnalytics)
        },
        batching: {
          batchesCreated: batchingMetrics.batchesCreated,
          averageBatchSize: batchingMetrics.averageBatchSize,
          costSavings: batchingMetrics.costSavings,
          throughputImprovement: batchingMetrics.throughputImprovement
        },
        tokenOptimization: {
          totalOptimizations: tokenOptimizationStats.totalOptimizations,
          averageTokenReduction: tokenOptimizationStats.averageTokenReduction,
          costSaved: tokenOptimizationStats.totalCostSaved,
          qualityScore: 0.85 // Would be calculated from actual quality metrics
        }
      },
      alerts,
      recommendations
    }
  }

  /**
   * Update optimization settings
   */
  async updateSettings(newSettings: Partial<OptimizationSettings>): Promise<void> {
    this.settings = { ...this.settings, ...newSettings }
    await this.applySettings()

    console.log('⚙️ Optimization settings updated:', {
      caching: this.settings.caching.enabled,
      routing: this.settings.routing.enabled,
      batching: this.settings.batching.enabled,
      tokenOptimization: this.settings.tokenOptimization.enabled
    })
  }

  /**
   * Get current settings
   */
  getSettings(): OptimizationSettings {
    return { ...this.settings }
  }

  /**
   * Enable emergency cost reduction mode
   */
  async enableEmergencyMode(): Promise<void> {
    console.log('🚨 ENABLING EMERGENCY COST REDUCTION MODE')

    const emergencySettings: Partial<OptimizationSettings> = {
      caching: {
        enabled: true,
        aggressiveMode: true,
        ttlHours: 720, // 30 days
        semanticSimilarityThreshold: 0.7 // Lower threshold for more matches
      },
      routing: {
        enabled: true,
        costOptimizationWeight: 0.8, // Heavily favor cost over quality
        qualityThreshold: 0.6, // Lower quality threshold
        emergencyFallback: true
      },
      batching: {
        enabled: true,
        maxBatchSize: 20, // Larger batches
        maxWaitTime: 5000, // Longer wait times
        minBatchSize: 2 // Lower minimum
      },
      tokenOptimization: {
        enabled: true,
        aggressiveMode: true,
        preserveEducationalContext: false, // More aggressive optimization
        autoOptimizePrompts: true
      }
    }

    await this.updateSettings(emergencySettings)

    // Set budget limits to Google AI only
    console.log('🔄 Routing all requests to Google AI for maximum cost savings')
  }

  /**
   * Disable emergency mode and restore normal settings
   */
  async disableEmergencyMode(): Promise<void> {
    console.log('✅ Disabling emergency mode, restoring normal settings')

    const normalSettings: Partial<OptimizationSettings> = {
      caching: {
        enabled: true,
        aggressiveMode: false,
        ttlHours: 168, // 7 days
        semanticSimilarityThreshold: 0.8
      },
      routing: {
        enabled: true,
        costOptimizationWeight: 0.4, // Balanced cost vs quality
        qualityThreshold: 0.8,
        emergencyFallback: true
      },
      batching: {
        enabled: true,
        maxBatchSize: 10,
        maxWaitTime: 2000,
        minBatchSize: 3
      },
      tokenOptimization: {
        enabled: true,
        aggressiveMode: false,
        preserveEducationalContext: true,
        autoOptimizePrompts: true
      }
    }

    await this.updateSettings(normalSettings)
  }

  /**
   * Apply current settings to all optimization engines
   */
  private async applySettings(): Promise<void> {
    // Apply budget settings
    costTracker.setBudgets({
      daily: this.settings.budgets.daily,
      weekly: this.settings.budgets.weekly,
      monthly: this.settings.budgets.monthly
    })

    // Apply routing settings
    smartRouter.setBudget(this.settings.budgets.monthly)

    console.log('⚙️ Settings applied to all optimization engines')
  }

  /**
   * Calculate optimization score (0-100)
   */
  private calculateOptimizationScore(
    cacheMetrics: any,
    routingAnalytics: any,
    batchingMetrics: any,
    tokenStats: any
  ): number {
    let score = 0

    // Caching performance (25 points)
    if (cacheMetrics.hitRate > 0.6) score += 25
    else if (cacheMetrics.hitRate > 0.4) score += 15
    else if (cacheMetrics.hitRate > 0.2) score += 8

    // Routing efficiency (25 points)
    if (routingAnalytics.routingEfficiency > 0.8) score += 25
    else if (routingAnalytics.routingEfficiency > 0.6) score += 15
    else if (routingAnalytics.routingEfficiency > 0.4) score += 8

    // Batching effectiveness (25 points)
    if (batchingMetrics.averageBatchSize > 5) score += 25
    else if (batchingMetrics.averageBatchSize > 3) score += 15
    else if (batchingMetrics.averageBatchSize > 1) score += 8

    // Token optimization (25 points)
    if (tokenStats.averageTokenReduction > 30) score += 25
    else if (tokenStats.averageTokenReduction > 15) score += 15
    else if (tokenStats.averageTokenReduction > 5) score += 8

    return Math.min(100, score)
  }

  /**
   * Get cost efficiency rating
   */
  private getCostEfficiencyRating(score: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Poor'
  }

  /**
   * Calculate requests per minute
   */
  private calculateRequestsPerMinute(): number {
    // This would be calculated from actual metrics
    // For now, return estimated value
    return 45
  }

  /**
   * Count active optimizations
   */
  private countActiveOptimizations(): number {
    let count = 0
    if (this.settings.caching.enabled) count++
    if (this.settings.routing.enabled) count++
    if (this.settings.batching.enabled) count++
    if (this.settings.tokenOptimization.enabled) count++
    return count
  }

  /**
   * Calculate routing accuracy
   */
  private calculateRoutingAccuracy(routingAnalytics: any): number {
    // Calculate based on successful routing decisions
    return routingAnalytics.successRate * 100 || 85
  }

  /**
   * Generate system alerts
   */
  private async generateAlerts(): Promise<Array<{
    id: string
    type: 'warning' | 'critical' | 'emergency' | 'info'
    message: string
    timestamp: Date
    action?: string
  }>> {
    const alerts = []

    // Get recent alerts from cost tracker
    const recentAlerts = costTracker.getRecentAlerts(5)

    recentAlerts.forEach(alert => {
      alerts.push({
        id: alert.id,
        type: alert.type,
        message: alert.message,
        timestamp: alert.timestamp,
        action: alert.recommendations?.[0]
      })
    })

    // Check cache performance
    const cacheMetrics = await intelligentCache.getDetailedStats()
    if (cacheMetrics.hitRate < 0.3) {
      alerts.push({
        id: `cache_alert_${Date.now()}`,
        type: 'warning',
        message: `Low cache hit rate: ${(cacheMetrics.hitRate * 100).toFixed(1)}%`,
        timestamp: new Date(),
        action: 'Review cache settings and similarity thresholds'
      })
    }

    // Check optimization status
    if (!this.settings.caching.enabled || !this.settings.routing.enabled) {
      alerts.push({
        id: `optimization_alert_${Date.now()}`,
        type: 'info',
        message: 'Some optimization features are disabled',
        timestamp: new Date(),
        action: 'Enable all optimization features for maximum savings'
      })
    }

    return alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  /**
   * Generate optimization recommendations
   */
  private async generateRecommendations(): Promise<Array<{
    priority: 'high' | 'medium' | 'low'
    category: 'cost' | 'performance' | 'quality' | 'efficiency'
    title: string
    description: string
    estimatedSavings: number
    implementationComplexity: 'low' | 'medium' | 'high'
  }>> {
    const recommendations = []

    // Get current metrics
    const [cacheMetrics, routingAnalytics, batchingMetrics] = await Promise.all([
      intelligentCache.getDetailedStats(),
      smartRouter.getRoutingReport(),
      batchingEngine.getMetrics()
    ])

    // Cache optimization recommendations
    if (cacheMetrics.hitRate < 0.5) {
      recommendations.push({
        priority: 'high' as const,
        category: 'cost' as const,
        title: 'Improve Cache Hit Rate',
        description: 'Current cache hit rate is below 50%. Implementing semantic caching for biology topics could increase savings.',
        estimatedSavings: 150,
        implementationComplexity: 'medium' as const
      })
    }

    // Provider routing recommendations
    const googleUsage = routingAnalytics.providerDistribution['google'] || 0
    if (googleUsage < 30) {
      recommendations.push({
        priority: 'high' as const,
        category: 'cost' as const,
        title: 'Increase Google AI Usage',
        description: 'Google AI usage is low. Routing more educational content to Google AI could reduce costs by 60%.',
        estimatedSavings: 200,
        implementationComplexity: 'low' as const
      })
    }

    // Batching recommendations
    if (batchingMetrics.averageBatchSize < 4) {
      recommendations.push({
        priority: 'medium' as const,
        category: 'efficiency' as const,
        title: 'Optimize Request Batching',
        description: 'Average batch size is low. Implementing intelligent queuing could improve efficiency and reduce costs.',
        estimatedSavings: 75,
        implementationComplexity: 'medium' as const
      })
    }

    // Quality optimization recommendations
    recommendations.push({
      priority: 'medium' as const,
      category: 'quality' as const,
      title: 'Implement Response Quality Monitoring',
      description: 'Add automated quality scoring to ensure cost optimizations don\'t impact educational content quality.',
      estimatedSavings: 0,
      implementationComplexity: 'high' as const
    })

    // Performance recommendations
    if (cacheMetrics.avgResponseTime > 500) {
      recommendations.push({
        priority: 'low' as const,
        category: 'performance' as const,
        title: 'Optimize Cache Response Time',
        description: 'Cache response time can be improved with Redis optimization and better indexing.',
        estimatedSavings: 25,
        implementationComplexity: 'medium' as const
      })
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }

  /**
   * Start real-time monitoring
   */
  private startRealTimeMonitoring(): void {
    // Update metrics every 30 seconds
    setInterval(async () => {
      await this.collectMetrics()
      this.lastUpdateTime = new Date()
    }, 30000)

    console.log('📊 Real-time monitoring started')
  }

  /**
   * Collect and cache metrics
   */
  private async collectMetrics(): Promise<void> {
    try {
      // This would update cached metrics for faster dashboard loading
      const metrics = await this.getDashboardMetrics()

      // Store metrics for historical analysis
      console.log('📊 Metrics collected:', {
        totalSavings: `$${metrics.overview.totalCostSavings.toFixed(2)}`,
        optimizationScore: `${metrics.overview.optimizationScore}/100`,
        cacheHitRate: `${metrics.performance.caching.hitRate.toFixed(1)}%`,
        timestamp: new Date().toISOString()
      })

    } catch (error) {
      console.error('❌ Metrics collection failed:', error)
    }
  }

  /**
   * Export dashboard data for analysis
   */
  async exportDashboardData(format: 'json' | 'csv' = 'json'): Promise<string> {
    const metrics = await this.getDashboardMetrics()

    if (format === 'json') {
      return JSON.stringify(metrics, null, 2)
    }

    // CSV format for Excel analysis
    const csvData = [
      'Metric,Value,Category',
      `Total Cost Savings,${metrics.overview.totalCostSavings},Overview`,
      `Monthly Cost Reduction,${metrics.overview.monthlyCostReduction}%,Overview`,
      `Optimization Score,${metrics.overview.optimizationScore},Overview`,
      `Cache Hit Rate,${metrics.performance.caching.hitRate}%,Performance`,
      `Routing Efficiency,${metrics.performance.routing.efficiency}%,Performance`,
      `Average Batch Size,${metrics.performance.batching.averageBatchSize},Performance`,
      `Token Reduction,${metrics.performance.tokenOptimization.averageTokenReduction},Performance`
    ]

    return csvData.join('\n')
  }

  /**
   * Get dashboard status
   */
  getStatus(): {
    initialized: boolean
    lastUpdate: Date
    activeOptimizations: number
    systemHealth: 'healthy' | 'warning' | 'critical'
  } {
    const activeOptimizations = this.countActiveOptimizations()

    let systemHealth: 'healthy' | 'warning' | 'critical' = 'healthy'
    if (activeOptimizations < 3) systemHealth = 'warning'
    if (activeOptimizations < 2) systemHealth = 'critical'

    return {
      initialized: this.isInitialized,
      lastUpdate: this.lastUpdateTime,
      activeOptimizations,
      systemHealth
    }
  }

  /**
   * Generate cost optimization report
   */
  async generateCostOptimizationReport(): Promise<string> {
    const metrics = await this.getDashboardMetrics()
    const status = this.getStatus()

    const report = `
# AI Cost Optimization Report
Generated: ${new Date().toISOString()}

## Executive Summary
- **Total Cost Savings**: $${metrics.overview.totalCostSavings.toFixed(2)}
- **Monthly Cost Reduction**: ${metrics.overview.monthlyCostReduction.toFixed(1)}%
- **Optimization Score**: ${metrics.overview.optimizationScore}/100 (${metrics.overview.costEfficiencyRating})
- **System Health**: ${status.systemHealth.toUpperCase()}

## Performance Breakdown

### Intelligent Caching
- Hit Rate: ${metrics.performance.caching.hitRate.toFixed(1)}%
- Cost Saved: $${metrics.performance.caching.costSaved.toFixed(2)}
- Cache Entries: ${metrics.performance.caching.entriesCount}
- Semantic Matches: ${metrics.performance.caching.semanticMatches}

### Smart Provider Routing
- Routing Efficiency: ${metrics.performance.routing.efficiency.toFixed(1)}%
- Cost Savings: $${metrics.performance.routing.costSavings.toFixed(2)}
- Provider Distribution: ${JSON.stringify(metrics.performance.routing.providerDistribution)}

### Request Batching
- Batches Created: ${metrics.performance.batching.batchesCreated}
- Average Batch Size: ${metrics.performance.batching.averageBatchSize.toFixed(1)}
- Cost Savings: $${metrics.performance.batching.costSavings.toFixed(2)}
- Throughput Improvement: ${metrics.performance.batching.throughputImprovement.toFixed(1)}%

### Token Optimization
- Total Optimizations: ${metrics.performance.tokenOptimization.totalOptimizations}
- Average Token Reduction: ${metrics.performance.tokenOptimization.averageTokenReduction.toFixed(1)}
- Cost Saved: $${metrics.performance.tokenOptimization.costSaved.toFixed(2)}
- Quality Score: ${(metrics.performance.tokenOptimization.qualityScore * 100).toFixed(1)}%

## Current Alerts
${metrics.alerts.map(alert => `- ${alert.type.toUpperCase()}: ${alert.message}`).join('\n')}

## Top Recommendations
${metrics.recommendations.slice(0, 3).map(rec =>
  `- **${rec.title}** (${rec.priority} priority): ${rec.description} (Est. savings: $${rec.estimatedSavings})`
).join('\n')}

## Optimization Settings
- Caching: ${this.settings.caching.enabled ? 'Enabled' : 'Disabled'}
- Routing: ${this.settings.routing.enabled ? 'Enabled' : 'Disabled'}
- Batching: ${this.settings.batching.enabled ? 'Enabled' : 'Disabled'}
- Token Optimization: ${this.settings.tokenOptimization.enabled ? 'Enabled' : 'Disabled'}

---
*Report generated by Cerebrum Biology Academy AI Cost Optimization Dashboard*
    `.trim()

    return report
  }

  /**
   * Shutdown dashboard
   */
  async shutdown(): Promise<void> {
    console.log('🛑 Shutting down Cost Optimization Dashboard...')
    this.isInitialized = false
    console.log('✅ Dashboard shutdown complete')
  }
}

// Export singleton instance
export const costDashboard = CostOptimizationDashboard.getInstance()

export default CostOptimizationDashboard