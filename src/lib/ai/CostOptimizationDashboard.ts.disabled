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
    warning: number    // Percentage of budget (e.g., 80%)
    critical: number   // Percentage of budget (e.g., 95%)
  }
  autoStop: boolean   // Stop requests when budget exceeded
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
    const currentMonthData = this.costHistory.filter(item => {
      const itemDate = new Date(item.timestamp)
      const itemMonth = `${itemDate.getFullYear()}-${(itemDate.getMonth() + 1).toString().padStart(2, '0')}`
      return itemMonth === currentMonth
    })

    // Calculate metrics
    const totalCost = currentMonthData.reduce((sum, item) => sum + item.cost, 0)
    const totalRequests = currentMonthData.length

    // Cost by provider
    const costByProvider: Record<string, number> = {}
    currentMonthData.forEach(item => {
      costByProvider[item.provider] = (costByProvider[item.provider] || 0) + item.cost
    })

    // Cost by model
    const costByModel: Record<string, number> = {}
    currentMonthData.forEach(item => {
      const key = `${item.provider}/${item.model}`
      costByModel[key] = (costByModel[key] || 0) + item.cost
    })

    // Cost by date (daily breakdown)
    const costByDate: Record<string, number> = {}
    currentMonthData.forEach(item => {
      const date = new Date(item.timestamp).toISOString().split('T')[0]
      costByDate[date] = (costByDate[date] || 0) + item.cost
    })

    // Cost by subject
    const costBySubject: Record<string, number> = {}
    currentMonthData.forEach(item => {
      if (item.subject) {
        costBySubject[item.subject] = (costBySubject[item.subject] || 0) + item.cost
      }
    })

    // Cost by student level
    const costByStudentLevel: Record<string, number> = {}
    currentMonthData.forEach(item => {
      if (item.studentLevel) {
        costByStudentLevel[item.studentLevel] = (costByStudentLevel[item.studentLevel] || 0) + item.cost
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
      costTrend
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
        onTrack: monthlyOnTrack
      },
      daily: {
        budget: this.budgetSettings.daily,
        spent: dailySpent,
        remaining: dailyRemaining,
        percentage: dailyPercentage,
        hoursRemaining
      },
      alerts: this.alerts.filter(alert => !alert.acknowledged)
    }
  }

  /**
   * Get cost optimization recommendations
   */
  getOptimizationRecommendations(): CostOptimization {\n    const metrics = this.getCurrentMetrics()\n    const recommendations = []\n    let potentialSavings = 0\n\n    // Analyze provider usage\n    const providerCosts = metrics.costByProvider\n    const totalCost = metrics.totalCost\n\n    // Recommendation: Switch expensive providers\n    const mostExpensiveProvider = Object.entries(providerCosts)\n      .sort(([, a], [, b]) => b - a)[0]\n\n    if (mostExpensiveProvider && mostExpensiveProvider[1] > totalCost * 0.6) {\n      const saving = mostExpensiveProvider[1] * 0.3 // Estimated 30% saving\n      potentialSavings += saving\n      recommendations.push({\n        type: 'provider_switch' as const,\n        description: `Consider using more cost-effective providers instead of ${mostExpensiveProvider[0]} for non-critical requests`,\n        estimatedSaving: saving,\n        impact: 'medium' as const,\n        implementationEffort: 'easy' as const\n      })\n    }\n\n    // Recommendation: Improve caching\n    const cachedRequests = this.costHistory.filter(r => r.cached).length\n    const cacheHitRate = cachedRequests / this.costHistory.length\n\n    if (cacheHitRate < 0.5) {\n      const saving = totalCost * 0.3 // Potential 30% saving from better caching\n      potentialSavings += saving\n      recommendations.push({\n        type: 'caching' as const,\n        description: `Improve caching strategy - current hit rate is ${(cacheHitRate * 100).toFixed(1)}%`,\n        estimatedSaving: saving,\n        impact: 'high' as const,\n        implementationEffort: 'moderate' as const\n      })\n    }\n\n    // Recommendation: Model optimization\n    const expensiveModels = Object.entries(metrics.costByModel)\n      .filter(([model, cost]) => cost > totalCost * 0.2)\n      .filter(([model]) => model.includes('premium') || model.includes('gpt-4'))\n\n    if (expensiveModels.length > 0) {\n      const saving = expensiveModels.reduce((sum, [, cost]) => sum + cost * 0.4, 0)\n      potentialSavings += saving\n      recommendations.push({\n        type: 'model_downgrade' as const,\n        description: 'Use fast models for simple questions and premium models only for complex tasks',\n        estimatedSaving: saving,\n        impact: 'medium' as const,\n        implementationEffort: 'easy' as const\n      })\n    }\n\n    // Calculate efficiency score\n    const idealCostPerRequest = 0.001 // $0.001 per request target\n    const actualCostPerRequest = metrics.averageCostPerRequest\n    const efficiencyScore = Math.max(0, Math.min(1, idealCostPerRequest / actualCostPerRequest))\n\n    return {\n      potentialSavings,\n      recommendations,\n      efficiencyScore\n    }\n  }\n\n  /**\n   * Check for budget alerts\n   */\n  private checkBudgetAlerts(): void {\n    const budgetStatus = this.getBudgetStatus()\n\n    // Check monthly budget\n    if (budgetStatus.monthly.percentage >= this.budgetSettings.alertThresholds.critical) {\n      this.createAlert({\n        type: 'critical',\n        message: `Monthly budget ${budgetStatus.monthly.percentage.toFixed(1)}% used`,\n        currentSpend: budgetStatus.monthly.spent,\n        budgetLimit: budgetStatus.monthly.budget,\n        percentage: budgetStatus.monthly.percentage,\n        recommendation: 'Consider stopping non-critical requests or increasing budget'\n      })\n    } else if (budgetStatus.monthly.percentage >= this.budgetSettings.alertThresholds.warning) {\n      this.createAlert({\n        type: 'warning',\n        message: `Monthly budget ${budgetStatus.monthly.percentage.toFixed(1)}% used`,\n        currentSpend: budgetStatus.monthly.spent,\n        budgetLimit: budgetStatus.monthly.budget,\n        percentage: budgetStatus.monthly.percentage,\n        recommendation: 'Monitor usage closely and optimize requests'\n      })\n    }\n\n    // Check daily budget\n    if (budgetStatus.daily.percentage >= this.budgetSettings.alertThresholds.critical) {\n      this.createAlert({\n        type: 'critical',\n        message: `Daily budget ${budgetStatus.daily.percentage.toFixed(1)}% used`,\n        currentSpend: budgetStatus.daily.spent,\n        budgetLimit: budgetStatus.daily.budget,\n        percentage: budgetStatus.daily.percentage,\n        recommendation: 'Switch to cheaper models or enable caching'\n      })\n    }\n\n    // Check for unusual spikes\n    const recentCosts = this.costHistory.slice(-100).map(r => r.cost)\n    const averageCost = recentCosts.reduce((sum, cost) => sum + cost, 0) / recentCosts.length\n    const latestCosts = this.costHistory.slice(-10).map(r => r.cost)\n    const recentAverage = latestCosts.reduce((sum, cost) => sum + cost, 0) / latestCosts.length\n\n    if (recentAverage > averageCost * 2) {\n      this.createAlert({\n        type: 'unusual_spike',\n        message: 'Unusual cost spike detected in recent requests',\n        currentSpend: recentAverage,\n        budgetLimit: averageCost,\n        percentage: (recentAverage / averageCost) * 100,\n        recommendation: 'Check for expensive model usage or complex requests'\n      })\n    }\n  }\n\n  /**\n   * Create a new alert\n   */\n  private createAlert(alertData: Omit<CostAlert, 'id' | 'timestamp' | 'acknowledged'>): void {\n    // Check if similar alert already exists\n    const existingAlert = this.alerts.find(alert => \n      alert.type === alertData.type && \n      alert.message === alertData.message &&\n      !alert.acknowledged\n    )\n\n    if (existingAlert) return // Don't create duplicate alerts\n\n    const alert: CostAlert = {\n      id: `alert_${Date.now()}_${Math.random().toString(36).substring(7)}`,\n      timestamp: Date.now(),\n      acknowledged: false,\n      ...alertData\n    }\n\n    this.alerts.push(alert)\n    console.warn(`🚨 Cost Alert: ${alert.message}`)    \n\n    // Auto-stop if enabled and budget exceeded\n    if (this.budgetSettings.autoStop && alert.type === 'critical') {\n      console.error('🛑 Auto-stop triggered due to budget alert')\n      // This would integrate with the main AI client to stop processing\n    }\n  }\n\n  /**\n   * Acknowledge an alert\n   */\n  acknowledgeAlert(alertId: string): void {\n    const alert = this.alerts.find(a => a.id === alertId)\n    if (alert) {\n      alert.acknowledged = true\n    }\n  }\n\n  /**\n   * Update budget settings\n   */\n  updateBudgetSettings(settings: Partial<BudgetSettings>): void {\n    this.budgetSettings = { ...this.budgetSettings, ...settings }\n    console.log('Budget settings updated:', this.budgetSettings)\n  }\n\n  /**\n   * Get cost forecast\n   */\n  getCostForecast(days: number = 30): {\n    dailyProjections: Array<{ date: string; projected: number; actual?: number }>\n    monthlyProjection: number\n    confidence: number\n  } {\n    const projections = []\n    const today = new Date()\n    const dailyAverage = this.getDailyAverageCost()\n\n    for (let i = 0; i < days; i++) {\n      const date = new Date(today)\n      date.setDate(date.getDate() + i)\n      const dateStr = date.toISOString().split('T')[0]\n\n      const actual = i === 0 ? this.getDailySpend() : undefined\n      const projected = dailyAverage * (1 + (Math.random() - 0.5) * 0.2) // ±10% variation\n\n      projections.push({\n        date: dateStr,\n        projected,\n        actual\n      })\n    }\n\n    const monthlyProjection = projections.reduce((sum, p) => sum + p.projected, 0)\n    const confidence = 0.75 // Simplified confidence calculation\n\n    return {\n      dailyProjections: projections,\n      monthlyProjection,\n      confidence\n    }\n  }\n\n  /**\n   * Get detailed analytics\n   */\n  getDetailedAnalytics(): {\n    costEfficiency: {\n      costPerQualityPoint: number\n      highQualityRequestsPercentage: number\n      cacheHitRate: number\n    }\n    providerEfficiency: Array<{\n      provider: string\n      totalCost: number\n      requestCount: number\n      averageCost: number\n      averageQuality: number\n      efficiency: number\n    }>\n    timeAnalysis: {\n      peakHours: number[]\n      costByHour: Record<number, number>\n      weekdayVsWeekend: { weekday: number; weekend: number }\n    }\n  } {\n    const qualityRequests = this.costHistory.filter(r => r.quality !== undefined)\n    const totalQualityPoints = qualityRequests.reduce((sum, r) => sum + (r.quality || 0), 0)\n    const totalCost = this.costHistory.reduce((sum, r) => sum + r.cost, 0)\n\n    const costPerQualityPoint = totalQualityPoints > 0 ? totalCost / totalQualityPoints : 0\n    const highQualityRequestsPercentage = qualityRequests.filter(r => (r.quality || 0) > 0.8).length / qualityRequests.length * 100\n    const cacheHitRate = this.costHistory.filter(r => r.cached).length / this.costHistory.length\n\n    // Provider efficiency analysis\n    const providerStats = new Map<string, { cost: number; count: number; quality: number[] }>()\n    \n    this.costHistory.forEach(r => {\n      const existing = providerStats.get(r.provider) || { cost: 0, count: 0, quality: [] }\n      existing.cost += r.cost\n      existing.count += 1\n      if (r.quality !== undefined) existing.quality.push(r.quality)\n      providerStats.set(r.provider, existing)\n    })\n\n    const providerEfficiency = Array.from(providerStats.entries()).map(([provider, stats]) => {\n      const averageCost = stats.cost / stats.count\n      const averageQuality = stats.quality.length > 0 \n        ? stats.quality.reduce((sum, q) => sum + q, 0) / stats.quality.length \n        : 0.5\n      const efficiency = averageQuality > 0 ? averageQuality / averageCost : 0\n\n      return {\n        provider,\n        totalCost: stats.cost,\n        requestCount: stats.count,\n        averageCost,\n        averageQuality,\n        efficiency\n      }\n    })\n\n    // Time analysis\n    const costByHour: Record<number, number> = {}\n    let weekdayCost = 0\n    let weekendCost = 0\n\n    this.costHistory.forEach(r => {\n      const date = new Date(r.timestamp)\n      const hour = date.getHours()\n      costByHour[hour] = (costByHour[hour] || 0) + r.cost\n\n      const dayOfWeek = date.getDay()\n      if (dayOfWeek === 0 || dayOfWeek === 6) {\n        weekendCost += r.cost\n      } else {\n        weekdayCost += r.cost\n      }\n    })\n\n    const peakHours = Object.entries(costByHour)\n      .sort(([, a], [, b]) => b - a)\n      .slice(0, 3)\n      .map(([hour]) => parseInt(hour))\n\n    return {\n      costEfficiency: {\n        costPerQualityPoint,\n        highQualityRequestsPercentage,\n        cacheHitRate\n      },\n      providerEfficiency,\n      timeAnalysis: {\n        peakHours,\n        costByHour,\n        weekdayVsWeekend: { weekday: weekdayCost, weekend: weekendCost }\n      }\n    }\n  }\n\n  /**\n   * Export cost data for analysis\n   */\n  exportData(format: 'json' | 'csv' = 'json'): string {\n    if (format === 'csv') {\n      const headers = 'timestamp,provider,model,cost,tokensUsed,cached,quality,subject,studentLevel'\n      const rows = this.costHistory.map(r => \n        `${r.timestamp},${r.provider},${r.model},${r.cost},${r.tokensUsed},${r.cached},${r.quality || ''},${r.subject || ''},${r.studentLevel || ''}`\n      )\n      return [headers, ...rows].join('\\n')\n    }\n\n    return JSON.stringify({\n      costHistory: this.costHistory,\n      budgetSettings: this.budgetSettings,\n      alerts: this.alerts,\n      exportedAt: Date.now()\n    }, null, 2)\n  }\n\n  /**\n   * Helper methods\n   */\n  private getMonthlySpend(): number {\n    const now = new Date()\n    const currentMonth = now.getMonth()\n    const currentYear = now.getFullYear()\n\n    return this.costHistory\n      .filter(item => {\n        const itemDate = new Date(item.timestamp)\n        return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear\n      })\n      .reduce((sum, item) => sum + item.cost, 0)\n  }\n\n  private getDailySpend(): number {\n    const today = new Date().toISOString().split('T')[0]\n    return this.costHistory\n      .filter(item => new Date(item.timestamp).toISOString().split('T')[0] === today)\n      .reduce((sum, item) => sum + item.cost, 0)\n  }\n\n  private getDailyAverageCost(): number {\n    const dailyCosts = new Map<string, number>()\n    \n    this.costHistory.forEach(item => {\n      const date = new Date(item.timestamp).toISOString().split('T')[0]\n      dailyCosts.set(date, (dailyCosts.get(date) || 0) + item.cost)\n    })\n\n    const costs = Array.from(dailyCosts.values())\n    return costs.length > 0 ? costs.reduce((sum, cost) => sum + cost, 0) / costs.length : 0\n  }\n\n  private getProjectedMonthlySpend(): number {\n    const dailyAverage = this.getDailyAverageCost()\n    const now = new Date()\n    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()\n    return dailyAverage * daysInMonth\n  }\n\n  private calculateCostTrend(): 'increasing' | 'decreasing' | 'stable' {\n    const recentDays = 7\n    const dailyCosts = new Map<string, number>()\n    \n    this.costHistory.forEach(item => {\n      const date = new Date(item.timestamp).toISOString().split('T')[0]\n      dailyCosts.set(date, (dailyCosts.get(date) || 0) + item.cost)\n    })\n\n    const sortedDates = Array.from(dailyCosts.keys()).sort()\n    const recentCosts = sortedDates.slice(-recentDays).map(date => dailyCosts.get(date) || 0)\n    \n    if (recentCosts.length < 3) return 'stable'\n\n    const firstHalf = recentCosts.slice(0, Math.floor(recentCosts.length / 2))\n    const secondHalf = recentCosts.slice(-Math.floor(recentCosts.length / 2))\n\n    const firstAvg = firstHalf.reduce((sum, cost) => sum + cost, 0) / firstHalf.length\n    const secondAvg = secondHalf.reduce((sum, cost) => sum + cost, 0) / secondHalf.length\n\n    const changeThreshold = 0.1 // 10% change\n    const changePercentage = Math.abs(secondAvg - firstAvg) / firstAvg\n\n    if (changePercentage < changeThreshold) return 'stable'\n    return secondAvg > firstAvg ? 'increasing' : 'decreasing'\n  }\n\n  private updateProjections(): void {\n    // Update cost projections based on recent patterns\n    const dailyAverage = this.getDailyAverageCost()\n    const today = new Date().toISOString().split('T')[0]\n    this.costProjections.set(today, dailyAverage)\n  }\n\n  private startMonitoring(): void {\n    // Start periodic monitoring tasks\n    setInterval(() => {\n      this.checkBudgetAlerts()\n    }, 5 * 60 * 1000) // Check every 5 minutes\n\n    setInterval(() => {\n      this.updateProjections()\n    }, 60 * 60 * 1000) // Update projections every hour\n  }\n\n  private loadHistoricalData(): void {\n    // In a real implementation, this would load data from persistent storage\n    console.log('Cost optimization dashboard initialized')\n  }\n}\n\n// Export singleton instance with default budget\nexport const costDashboard = new CostOptimizationDashboard({\n  monthly: 1000, // $1000/month\n  daily: 50,     // $50/day  \n  alertThresholds: {\n    warning: 80,   // 80%\n    critical: 95   // 95%\n  },\n  autoStop: false,\n  emergencyReserve: 100 // $100 emergency reserve\n})"