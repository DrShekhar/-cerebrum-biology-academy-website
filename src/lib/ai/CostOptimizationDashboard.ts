/**
 * Cost Optimization Dashboard
 * Real-time monitoring, budget controls, and cost analytics for AI services
 */

import { TaskAnalysis } from './SmartProviderSelector'
import { QualityReport } from './QualityAssurancePipeline'

interface CostMetrics {
  totalCost: number
  costByProvider: Record<string, number>
  costByModel: Record<string, number>
  costByDate: Record<string, number>
  costBySubject: Record<string, number>
  costByStudentLevel: Record<string, number>
  averageCostPerRequest: number
  totalRequests: number
  costTrend: 'increasing' | 'decreasing' | 'stable'
}

interface BudgetSettings {
  monthly: number
  daily: number
  hourly?: number
  alertThresholds: {
    warning: number // Percentage of budget (e.g., 80%)
    critical: number // Percentage of budget (e.g., 95%)
  }
  autoStop: boolean // Stop requests when budget exceeded
  emergencyReserve: number // Reserve for critical requests
}

interface CostAlert {
  id: string
  type: 'warning' | 'critical' | 'budget_exceeded' | 'unusual_spike'
  message: string
  timestamp: number
  currentSpend: number
  budgetLimit: number
  percentage: number
  recommendation: string
  acknowledged: boolean
}

interface CostOptimization {
  potentialSavings: number
  recommendations: Array<{
    type: 'provider_switch' | 'model_downgrade' | 'caching' | 'batch_processing'
    description: string
    estimatedSaving: number
    impact: 'low' | 'medium' | 'high'
    implementationEffort: 'easy' | 'moderate' | 'complex'
  }>
  efficiencyScore: number // 0-1, how efficiently we're using AI budget
}

interface RequestCostData {
  requestId: string
  timestamp: number
  prompt: string
  provider: string
  model: string
  cost: number
  tokensUsed: number
  cached: boolean
  quality?: number
  taskAnalysis?: TaskAnalysis
  studentLevel?: string
  subject?: string
}

export class CostOptimizationDashboard {
  private costHistory: RequestCostData[] = []
  private budgetSettings: BudgetSettings
  private alerts: CostAlert[] = []
  private costProjections: Map<string, number> = new Map()

  constructor(initialBudget: BudgetSettings) {
    this.budgetSettings = initialBudget
    this.startMonitoring()
    this.loadHistoricalData()
  }

  /**
   * Record a new request cost
   */
  recordRequest(data: RequestCostData): void {
    this.costHistory.push(data)

    // Keep only last 10,000 requests for performance
    if (this.costHistory.length > 10000) {
      this.costHistory = this.costHistory.slice(-10000)
    }

    // Check budget alerts
    this.checkBudgetAlerts()

    // Update cost projections
    this.updateProjections()

    console.log(`Recorded cost: $${data.cost.toFixed(4)} for ${data.provider}/${data.model}`)
  }

  /**
   * Get current cost metrics
   */
  getCurrentMetrics(): CostMetrics {
    const now = new Date()
    const currentMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`

    // Filter for current month
    const currentMonthData = this.costHistory.filter((item) => {
      const itemDate = new Date(item.timestamp)
      const itemMonth = `${itemDate.getFullYear()}-${(itemDate.getMonth() + 1).toString().padStart(2, '0')}`
      return itemMonth === currentMonth
    })

    // Calculate metrics
    const totalCost = currentMonthData.reduce((sum, item) => sum + item.cost, 0)
    const totalRequests = currentMonthData.length

    // Cost by provider
    const costByProvider: Record<string, number> = {}
    currentMonthData.forEach((item) => {
      costByProvider[item.provider] = (costByProvider[item.provider] || 0) + item.cost
    })

    // Cost by model
    const costByModel: Record<string, number> = {}
    currentMonthData.forEach((item) => {
      const key = `${item.provider}/${item.model}`
      costByModel[key] = (costByModel[key] || 0) + item.cost
    })

    // Cost by date (daily breakdown)
    const costByDate: Record<string, number> = {}
    currentMonthData.forEach((item) => {
      const date = new Date(item.timestamp).toISOString().split('T')[0]
      costByDate[date] = (costByDate[date] || 0) + item.cost
    })

    // Cost by subject
    const costBySubject: Record<string, number> = {}
    currentMonthData.forEach((item) => {
      if (item.subject) {
        costBySubject[item.subject] = (costBySubject[item.subject] || 0) + item.cost
      }
    })

    // Cost by student level
    const costByStudentLevel: Record<string, number> = {}
    currentMonthData.forEach((item) => {
      if (item.studentLevel) {
        costByStudentLevel[item.studentLevel] =
          (costByStudentLevel[item.studentLevel] || 0) + item.cost
      }
    })

    const averageCostPerRequest = totalRequests > 0 ? totalCost / totalRequests : 0
    const costTrend = this.calculateCostTrend()

    return {
      totalCost,
      costByProvider,
      costByModel,
      costByDate,
      costBySubject,
      costByStudentLevel,
      averageCostPerRequest,
      totalRequests,
      costTrend,
    }
  }

  /**
   * Get budget status
   */
  getBudgetStatus(): {
    monthly: {
      budget: number
      spent: number
      remaining: number
      percentage: number
      daysRemaining: number
      projectedSpend: number
      onTrack: boolean
    }
    daily: {
      budget: number
      spent: number
      remaining: number
      percentage: number
      hoursRemaining: number
    }
    alerts: CostAlert[]
  } {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const dayOfMonth = now.getDate()
    const hoursInDay = 24
    const hourOfDay = now.getHours()

    // Monthly calculations
    const monthlySpent = this.getMonthlySpend()
    const monthlyRemaining = Math.max(0, this.budgetSettings.monthly - monthlySpent)
    const monthlyPercentage = (monthlySpent / this.budgetSettings.monthly) * 100
    const daysRemaining = daysInMonth - dayOfMonth
    const projectedMonthlySpend = this.getProjectedMonthlySpend()
    const monthlyOnTrack = projectedMonthlySpend <= this.budgetSettings.monthly

    // Daily calculations
    const dailySpent = this.getDailySpend()
    const dailyRemaining = Math.max(0, this.budgetSettings.daily - dailySpent)
    const dailyPercentage = (dailySpent / this.budgetSettings.daily) * 100
    const hoursRemaining = hoursInDay - hourOfDay

    return {
      monthly: {
        budget: this.budgetSettings.monthly,
        spent: monthlySpent,
        remaining: monthlyRemaining,
        percentage: monthlyPercentage,
        daysRemaining,
        projectedSpend: projectedMonthlySpend,
        onTrack: monthlyOnTrack,
      },
      daily: {
        budget: this.budgetSettings.daily,
        spent: dailySpent,
        remaining: dailyRemaining,
        percentage: dailyPercentage,
        hoursRemaining,
      },
      alerts: this.alerts.filter((alert) => !alert.acknowledged),
    }
  }

  /**
   * Get cost optimization recommendations
   */
  getOptimizationRecommendations(): CostOptimization {
    const metrics = this.getCurrentMetrics()
    const recommendations = []
    let potentialSavings = 0

    // Analyze provider usage
    const providerCosts = metrics.costByProvider
    const totalCost = metrics.totalCost

    // Recommendation: Switch expensive providers
    const mostExpensiveProvider = Object.entries(providerCosts).sort(([, a], [, b]) => b - a)[0]

    if (mostExpensiveProvider && mostExpensiveProvider[1] > totalCost * 0.6) {
      const saving = mostExpensiveProvider[1] * 0.3 // Estimated 30% saving
      potentialSavings += saving
      recommendations.push({
        type: 'provider_switch' as const,
        description: `Consider using more cost-effective providers instead of ${mostExpensiveProvider[0]} for non-critical requests`,
        estimatedSaving: saving,
        impact: 'medium' as const,
        implementationEffort: 'easy' as const,
      })
    }

    // Recommendation: Improve caching
    const cachedRequests = this.costHistory.filter((r) => r.cached).length
    const cacheHitRate = cachedRequests / this.costHistory.length

    if (cacheHitRate < 0.5) {
      const saving = totalCost * 0.3 // Potential 30% saving from better caching
      potentialSavings += saving
      recommendations.push({
        type: 'caching' as const,
        description: `Improve caching strategy - current hit rate is ${(cacheHitRate * 100).toFixed(1)}%`,
        estimatedSaving: saving,
        impact: 'high' as const,
        implementationEffort: 'moderate' as const,
      })
    }

    // Recommendation: Model optimization
    const expensiveModels = Object.entries(metrics.costByModel)
      .filter(([model, cost]) => cost > totalCost * 0.2)
      .filter(([model]) => model.includes('premium') || model.includes('gpt-4'))

    if (expensiveModels.length > 0) {
      const saving = expensiveModels.reduce((sum, [, cost]) => sum + cost * 0.4, 0)
      potentialSavings += saving
      recommendations.push({
        type: 'model_downgrade' as const,
        description:
          'Use fast models for simple questions and premium models only for complex tasks',
        estimatedSaving: saving,
        impact: 'medium' as const,
        implementationEffort: 'easy' as const,
      })
    }

    // Calculate efficiency score
    const idealCostPerRequest = 0.001 // $0.001 per request target
    const actualCostPerRequest = metrics.averageCostPerRequest
    const efficiencyScore = Math.max(0, Math.min(1, idealCostPerRequest / actualCostPerRequest))

    return {
      potentialSavings,
      recommendations,
      efficiencyScore,
    }
  }

  /**
   * Check for budget alerts
   */
  private checkBudgetAlerts(): void {
    const budgetStatus = this.getBudgetStatus()

    // Check monthly budget
    if (budgetStatus.monthly.percentage >= this.budgetSettings.alertThresholds.critical) {
      this.createAlert({
        type: 'critical',
        message: `Monthly budget ${budgetStatus.monthly.percentage.toFixed(1)}% used`,
        currentSpend: budgetStatus.monthly.spent,
        budgetLimit: budgetStatus.monthly.budget,
        percentage: budgetStatus.monthly.percentage,
        recommendation: 'Consider stopping non-critical requests or increasing budget',
      })
    } else if (budgetStatus.monthly.percentage >= this.budgetSettings.alertThresholds.warning) {
      this.createAlert({
        type: 'warning',
        message: `Monthly budget ${budgetStatus.monthly.percentage.toFixed(1)}% used`,
        currentSpend: budgetStatus.monthly.spent,
        budgetLimit: budgetStatus.monthly.budget,
        percentage: budgetStatus.monthly.percentage,
        recommendation: 'Monitor usage closely and optimize requests',
      })
    }

    // Check daily budget
    if (budgetStatus.daily.percentage >= this.budgetSettings.alertThresholds.critical) {
      this.createAlert({
        type: 'critical',
        message: `Daily budget ${budgetStatus.daily.percentage.toFixed(1)}% used`,
        currentSpend: budgetStatus.daily.spent,
        budgetLimit: budgetStatus.daily.budget,
        percentage: budgetStatus.daily.percentage,
        recommendation: 'Switch to cheaper models or enable caching',
      })
    }

    // Check for unusual spikes
    const recentCosts = this.costHistory.slice(-100).map((r) => r.cost)
    const averageCost = recentCosts.reduce((sum, cost) => sum + cost, 0) / recentCosts.length
    const latestCosts = this.costHistory.slice(-10).map((r) => r.cost)
    const recentAverage = latestCosts.reduce((sum, cost) => sum + cost, 0) / latestCosts.length

    if (recentAverage > averageCost * 2) {
      this.createAlert({
        type: 'unusual_spike',
        message: 'Unusual cost spike detected in recent requests',
        currentSpend: recentAverage,
        budgetLimit: averageCost,
        percentage: (recentAverage / averageCost) * 100,
        recommendation: 'Check for expensive model usage or complex requests',
      })
    }
  }

  /**
   * Create a new alert
   */
  private createAlert(alertData: Omit<CostAlert, 'id' | 'timestamp' | 'acknowledged'>): void {
    // Check if similar alert already exists
    const existingAlert = this.alerts.find(
      (alert) =>
        alert.type === alertData.type && alert.message === alertData.message && !alert.acknowledged
    )

    if (existingAlert) return // Don't create duplicate alerts

    const alert: CostAlert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      timestamp: Date.now(),
      acknowledged: false,
      ...alertData,
    }

    this.alerts.push(alert)
    console.warn(`🚨 Cost Alert: ${alert.message}`)

    // Auto-stop if enabled and budget exceeded
    if (this.budgetSettings.autoStop && alert.type === 'critical') {
      console.error('🛑 Auto-stop triggered due to budget alert')
      // This would integrate with the main AI client to stop processing
    }
  }

  /**
   * Acknowledge an alert
   */
  acknowledgeAlert(alertId: string): void {
    const alert = this.alerts.find((a) => a.id === alertId)
    if (alert) {
      alert.acknowledged = true
    }
  }

  /**
   * Update budget settings
   */
  updateBudgetSettings(settings: Partial<BudgetSettings>): void {
    this.budgetSettings = { ...this.budgetSettings, ...settings }
    console.log('Budget settings updated:', this.budgetSettings)
  }

  /**
   * Get cost forecast
   */
  getCostForecast(days: number = 30): {
    dailyProjections: Array<{ date: string; projected: number; actual?: number }>
    monthlyProjection: number
    confidence: number
  } {
    const projections = []
    const today = new Date()
    const dailyAverage = this.getDailyAverageCost()

    for (let i = 0; i < days; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      const dateStr = date.toISOString().split('T')[0]

      const actual = i === 0 ? this.getDailySpend() : undefined
      const projected = dailyAverage * (1 + (Math.random() - 0.5) * 0.2) // ±10% variation

      projections.push({
        date: dateStr,
        projected,
        actual,
      })
    }

    const monthlyProjection = projections.reduce((sum, p) => sum + p.projected, 0)
    const confidence = 0.75 // Simplified confidence calculation

    return {
      dailyProjections: projections,
      monthlyProjection,
      confidence,
    }
  }

  /**
   * Get detailed analytics
   */
  getDetailedAnalytics(): {
    costEfficiency: {
      costPerQualityPoint: number
      highQualityRequestsPercentage: number
      cacheHitRate: number
    }
    providerEfficiency: Array<{
      provider: string
      totalCost: number
      requestCount: number
      averageCost: number
      averageQuality: number
      efficiency: number
    }>
    timeAnalysis: {
      peakHours: number[]
      costByHour: Record<number, number>
      weekdayVsWeekend: { weekday: number; weekend: number }
    }
  } {
    const qualityRequests = this.costHistory.filter((r) => r.quality !== undefined)
    const totalQualityPoints = qualityRequests.reduce((sum, r) => sum + (r.quality || 0), 0)
    const totalCost = this.costHistory.reduce((sum, r) => sum + r.cost, 0)

    const costPerQualityPoint = totalQualityPoints > 0 ? totalCost / totalQualityPoints : 0
    const highQualityRequestsPercentage =
      (qualityRequests.filter((r) => (r.quality || 0) > 0.8).length / qualityRequests.length) * 100
    const cacheHitRate = this.costHistory.filter((r) => r.cached).length / this.costHistory.length

    // Provider efficiency analysis
    const providerStats = new Map<string, { cost: number; count: number; quality: number[] }>()

    this.costHistory.forEach((r) => {
      const existing = providerStats.get(r.provider) || { cost: 0, count: 0, quality: [] }
      existing.cost += r.cost
      existing.count += 1
      if (r.quality !== undefined) existing.quality.push(r.quality)
      providerStats.set(r.provider, existing)
    })

    const providerEfficiency = Array.from(providerStats.entries()).map(([provider, stats]) => {
      const averageCost = stats.cost / stats.count
      const averageQuality =
        stats.quality.length > 0
          ? stats.quality.reduce((sum, q) => sum + q, 0) / stats.quality.length
          : 0.5
      const efficiency = averageQuality > 0 ? averageQuality / averageCost : 0

      return {
        provider,
        totalCost: stats.cost,
        requestCount: stats.count,
        averageCost,
        averageQuality,
        efficiency,
      }
    })

    // Time analysis
    const costByHour: Record<number, number> = {}
    let weekdayCost = 0
    let weekendCost = 0

    this.costHistory.forEach((r) => {
      const date = new Date(r.timestamp)
      const hour = date.getHours()
      costByHour[hour] = (costByHour[hour] || 0) + r.cost

      const dayOfWeek = date.getDay()
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendCost += r.cost
      } else {
        weekdayCost += r.cost
      }
    })

    const peakHours = Object.entries(costByHour)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([hour]) => parseInt(hour))

    return {
      costEfficiency: {
        costPerQualityPoint,
        highQualityRequestsPercentage,
        cacheHitRate,
      },
      providerEfficiency,
      timeAnalysis: {
        peakHours,
        costByHour,
        weekdayVsWeekend: { weekday: weekdayCost, weekend: weekendCost },
      },
    }
  }

  /**
   * Export cost data for analysis
   */
  exportData(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      const headers = 'timestamp,provider,model,cost,tokensUsed,cached,quality,subject,studentLevel'
      const rows = this.costHistory.map(
        (r) =>
          `${r.timestamp},${r.provider},${r.model},${r.cost},${r.tokensUsed},${r.cached},${r.quality || ''},${r.subject || ''},${r.studentLevel || ''}`
      )
      return [headers, ...rows].join('\n')
    }

    return JSON.stringify(
      {
        costHistory: this.costHistory,
        budgetSettings: this.budgetSettings,
        alerts: this.alerts,
        exportedAt: Date.now(),
      },
      null,
      2
    )
  }

  /**
   * Helper methods
   */
  private getMonthlySpend(): number {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    return this.costHistory
      .filter((item) => {
        const itemDate = new Date(item.timestamp)
        return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear
      })
      .reduce((sum, item) => sum + item.cost, 0)
  }

  private getDailySpend(): number {
    const today = new Date().toISOString().split('T')[0]
    return this.costHistory
      .filter((item) => new Date(item.timestamp).toISOString().split('T')[0] === today)
      .reduce((sum, item) => sum + item.cost, 0)
  }

  private getDailyAverageCost(): number {
    const dailyCosts = new Map<string, number>()

    this.costHistory.forEach((item) => {
      const date = new Date(item.timestamp).toISOString().split('T')[0]
      dailyCosts.set(date, (dailyCosts.get(date) || 0) + item.cost)
    })

    const costs = Array.from(dailyCosts.values())
    return costs.length > 0 ? costs.reduce((sum, cost) => sum + cost, 0) / costs.length : 0
  }

  private getProjectedMonthlySpend(): number {
    const dailyAverage = this.getDailyAverageCost()
    const now = new Date()
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    return dailyAverage * daysInMonth
  }

  private calculateCostTrend(): 'increasing' | 'decreasing' | 'stable' {
    const recentDays = 7
    const dailyCosts = new Map<string, number>()

    this.costHistory.forEach((item) => {
      const date = new Date(item.timestamp).toISOString().split('T')[0]
      dailyCosts.set(date, (dailyCosts.get(date) || 0) + item.cost)
    })

    const sortedDates = Array.from(dailyCosts.keys()).sort()
    const recentCosts = sortedDates.slice(-recentDays).map((date) => dailyCosts.get(date) || 0)

    if (recentCosts.length < 3) return 'stable'

    const firstHalf = recentCosts.slice(0, Math.floor(recentCosts.length / 2))
    const secondHalf = recentCosts.slice(-Math.floor(recentCosts.length / 2))

    const firstAvg = firstHalf.reduce((sum, cost) => sum + cost, 0) / firstHalf.length
    const secondAvg = secondHalf.reduce((sum, cost) => sum + cost, 0) / secondHalf.length

    const changeThreshold = 0.1 // 10% change
    const changePercentage = Math.abs(secondAvg - firstAvg) / firstAvg

    if (changePercentage < changeThreshold) return 'stable'
    return secondAvg > firstAvg ? 'increasing' : 'decreasing'
  }

  private updateProjections(): void {
    // Update cost projections based on recent patterns
    const dailyAverage = this.getDailyAverageCost()
    const today = new Date().toISOString().split('T')[0]
    this.costProjections.set(today, dailyAverage)
  }

  private startMonitoring(): void {
    // Start periodic monitoring tasks
    setInterval(
      () => {
        this.checkBudgetAlerts()
      },
      5 * 60 * 1000
    ) // Check every 5 minutes

    setInterval(
      () => {
        this.updateProjections()
      },
      60 * 60 * 1000
    ) // Update projections every hour
  }

  private loadHistoricalData(): void {
    // In a real implementation, this would load data from persistent storage
    console.log('Cost optimization dashboard initialized')
  }
}

// Export singleton instance with default budget
export const costDashboard = new CostOptimizationDashboard({
  monthly: 1000, // $1000/month
  daily: 50, // $50/day
  alertThresholds: {
    warning: 80, // 80%
    critical: 95, // 95%
  },
  autoStop: false,
  emergencyReserve: 100, // $100 emergency reserve
})
