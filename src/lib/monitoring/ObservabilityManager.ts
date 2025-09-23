/**
 * Production Monitoring and Observability System
 * Comprehensive system health, performance, and business metrics tracking
 */

import Redis from 'ioredis'

interface SystemMetrics {
  timestamp: number
  cpu: {
    usage: number
    cores: number
    loadAverage: number[]
  }
  memory: {
    used: number
    free: number
    total: number
    percentage: number
  }
  disk: {
    used: number
    free: number
    total: number
    percentage: number
  }
  network: {
    bytesIn: number
    bytesOut: number
    packetsIn: number
    packetsOut: number
  }
}

interface ApplicationMetrics {
  timestamp: number
  requests: {
    total: number
    successful: number
    failed: number
    averageResponseTime: number
    p95ResponseTime: number
    p99ResponseTime: number
  }
  database: {
    connections: number
    activeQueries: number
    queryTime: number
    cacheHitRate: number
  }
  ai: {
    totalRequests: number
    successRate: number
    averageLatency: number
    costPerRequest: number
    cacheHitRate: number
    providerDistribution: Record<string, number>
  }
  collaborative: {
    activeRooms: number
    totalParticipants: number
    messagesPerSecond: number
    averageSessionDuration: number
  }
}

interface BusinessMetrics {
  timestamp: number
  students: {
    totalActive: number
    newSignups: number
    retentionRate: number
    churnRate: number
  }
  revenue: {
    daily: number
    monthly: number
    projectedMonthly: number
    arpu: number // Average Revenue Per User
  }
  engagement: {
    averageSessionDuration: number
    questionsPerUser: number
    studySessionsPerDay: number
    collaborativeParticipation: number
  }
  growth: {
    signupRate: number
    conversionRate: number
    referralRate: number
    marketingRoi: number
  }
}

interface Alert {
  id: string
  type: 'system' | 'application' | 'business' | 'security'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  metric: string
  threshold: number
  currentValue: number
  timestamp: number
  resolved: boolean
  acknowledgedBy?: string
  resolutionNotes?: string
}

interface Dashboard {
  id: string
  name: string
  description: string
  widgets: DashboardWidget[]
  refreshInterval: number
  users: string[]
}

interface DashboardWidget {
  id: string
  type: 'line_chart' | 'bar_chart' | 'pie_chart' | 'metric_card' | 'table' | 'heatmap'
  title: string
  dataSource: string
  query: string
  position: { x: number; y: number; width: number; height: number }
  config: Record<string, any>
}

interface MonitoringConfig {
  alerts: AlertConfig[]
  dashboards: Dashboard[]
  retentionPeriods: {
    metrics: number
    logs: number
    traces: number
  }
  sampling: {
    metrics: number
    traces: number
  }
}

interface AlertConfig {
  name: string
  metric: string
  operator: '>' | '<' | '=' | '>=' | '<='
  threshold: number
  duration: number
  severity: 'low' | 'medium' | 'high' | 'critical'
  channels: string[]
  enabled: boolean
}

export class ObservabilityManager {
  private redis: Redis
  private config: MonitoringConfig
  private alertHistory: Map<string, Alert[]> = new Map()
  private activeAlerts: Map<string, Alert> = new Map()
  private isCollecting = false

  constructor(redisUrl?: string) {
    this.redis = new Redis(redisUrl || process.env.REDIS_URL || 'redis://localhost:6379')
    this.config = this.getDefaultConfig()
    this.startMetricsCollection()
    this.startAlertProcessing()

    console.log('📊 Observability Manager initialized')
  }

  /**
   * Collect and store system metrics
   */
  async collectSystemMetrics(): Promise<SystemMetrics> {
    const metrics: SystemMetrics = {
      timestamp: Date.now(),
      cpu: await this.getCPUMetrics(),
      memory: await this.getMemoryMetrics(),
      disk: await this.getDiskMetrics(),
      network: await this.getNetworkMetrics(),
    }

    // Store in Redis with TTL
    await this.redis.setex(
      `metrics:system:${Date.now()}`,
      this.config.retentionPeriods.metrics,
      JSON.stringify(metrics)
    )

    // Update real-time metrics
    await this.updateRealtimeMetrics('system', metrics)

    return metrics
  }

  /**
   * Collect and store application metrics
   */
  async collectApplicationMetrics(): Promise<ApplicationMetrics> {
    const metrics: ApplicationMetrics = {
      timestamp: Date.now(),
      requests: await this.getRequestMetrics(),
      database: await this.getDatabaseMetrics(),
      ai: await this.getAIMetrics(),
      collaborative: await this.getCollaborativeMetrics(),
    }

    await this.redis.setex(
      `metrics:application:${Date.now()}`,
      this.config.retentionPeriods.metrics,
      JSON.stringify(metrics)
    )

    await this.updateRealtimeMetrics('application', metrics)

    return metrics
  }

  /**
   * Collect and store business metrics
   */
  async collectBusinessMetrics(): Promise<BusinessMetrics> {
    const metrics: BusinessMetrics = {
      timestamp: Date.now(),
      students: await this.getStudentMetrics(),
      revenue: await this.getRevenueMetrics(),
      engagement: await this.getEngagementMetrics(),
      growth: await this.getGrowthMetrics(),
    }

    await this.redis.setex(
      `metrics:business:${Date.now()}`,
      this.config.retentionPeriods.metrics,
      JSON.stringify(metrics)
    )

    await this.updateRealtimeMetrics('business', metrics)

    return metrics
  }

  /**
   * Create and trigger alerts based on thresholds
   */
  async processAlerts(): Promise<Alert[]> {
    const triggeredAlerts: Alert[] = []

    for (const alertConfig of this.config.alerts) {
      if (!alertConfig.enabled) continue

      const currentValue = await this.getMetricValue(alertConfig.metric)
      const shouldTrigger = this.evaluateThreshold(
        currentValue,
        alertConfig.operator,
        alertConfig.threshold
      )

      if (shouldTrigger) {
        const alert = await this.createAlert(alertConfig, currentValue)
        triggeredAlerts.push(alert)
      }
    }

    return triggeredAlerts
  }

  /**
   * Get comprehensive dashboard data
   */
  async getDashboardData(dashboardId: string): Promise<any> {
    const dashboard = this.config.dashboards.find((d) => d.id === dashboardId)
    if (!dashboard) {
      throw new Error(`Dashboard ${dashboardId} not found`)
    }

    const data: any = {
      dashboard,
      widgets: {},
    }

    for (const widget of dashboard.widgets) {
      data.widgets[widget.id] = await this.getWidgetData(widget)
    }

    return data
  }

  /**
   * Get system health status
   */
  async getSystemHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy'
    score: number
    checks: Array<{ name: string; status: boolean; latency?: number; error?: string }>
  }> {
    const checks = [
      await this.checkDatabaseHealth(),
      await this.checkRedisHealth(),
      await this.checkAIGatewayHealth(),
      await this.checkMemoryHealth(),
      await this.checkDiskHealth(),
      await this.checkResponseTimeHealth(),
    ]

    const healthyChecks = checks.filter((check) => check.status).length
    const score = (healthyChecks / checks.length) * 100

    let status: 'healthy' | 'degraded' | 'unhealthy'
    if (score >= 90) status = 'healthy'
    else if (score >= 70) status = 'degraded'
    else status = 'unhealthy'

    return { status, score, checks }
  }

  /**
   * Log custom events for tracking
   */
  async logEvent(event: {
    type: string
    category: string
    action: string
    label?: string
    value?: number
    userId?: string
    metadata?: Record<string, any>
  }): Promise<void> {
    const logEntry = {
      ...event,
      timestamp: Date.now(),
      id: `event_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    }

    // Store event
    await this.redis.lpush('events:log', JSON.stringify(logEntry))
    await this.redis.expire('events:log', this.config.retentionPeriods.logs)

    // Update real-time counters
    await this.redis.hincrby('events:counters', `${event.category}:${event.action}`, 1)
    await this.redis.expire('events:counters', 86400) // 24 hours
  }

  /**
   * Get performance analytics
   */
  async getPerformanceAnalytics(timeRange: string = '24h'): Promise<{
    responseTime: { average: number; p95: number; p99: number }
    throughput: { requestsPerSecond: number; peakRps: number }
    errorRate: number
    availability: number
    trends: Array<{ timestamp: number; responseTime: number; throughput: number }>
  }> {
    const endTime = Date.now()
    const startTime = this.getStartTime(timeRange, endTime)

    const metrics = await this.getMetricsInRange('application', startTime, endTime)

    const responseTimes = metrics.map((m) => m.requests.averageResponseTime).filter(Boolean)
    const throughputs = metrics.map((m) => m.requests.total).filter(Boolean)
    const errors = metrics.map((m) => m.requests.failed).filter(Boolean)
    const successes = metrics.map((m) => m.requests.successful).filter(Boolean)

    const totalRequests = successes.reduce((a, b) => a + b, 0) + errors.reduce((a, b) => a + b, 0)
    const totalErrors = errors.reduce((a, b) => a + b, 0)

    return {
      responseTime: {
        average: this.calculateAverage(responseTimes),
        p95: this.calculatePercentile(responseTimes.sort(), 0.95),
        p99: this.calculatePercentile(responseTimes.sort(), 0.99),
      },
      throughput: {
        requestsPerSecond: this.calculateAverage(throughputs),
        peakRps: Math.max(...throughputs),
      },
      errorRate: totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0,
      availability: totalRequests > 0 ? ((totalRequests - totalErrors) / totalRequests) * 100 : 100,
      trends: metrics.slice(-24).map((m) => ({
        timestamp: m.timestamp,
        responseTime: m.requests.averageResponseTime,
        throughput: m.requests.total,
      })),
    }
  }

  /**
   * Get business intelligence dashboard
   */
  async getBusinessIntelligence(): Promise<{
    revenue: { daily: number; monthly: number; growth: number }
    users: { active: number; new: number; retention: number }
    engagement: { avgSession: number; questionsPerUser: number; collaborativeRate: number }
    costs: { aiCosts: number; infrastructure: number; roi: number }
    forecasts: { revenue: number; users: number; costs: number }
  }> {
    const businessMetrics = await this.getLatestBusinessMetrics()
    const lastMonthMetrics = await this.getBusinessMetricsFromRange('30d', '60d')

    const revenueGrowth = lastMonthMetrics
      ? ((businessMetrics.revenue.monthly - lastMonthMetrics.revenue.monthly) /
          lastMonthMetrics.revenue.monthly) *
        100
      : 0

    const aiCosts = await this.getAICosts()
    const infrastructureCosts = await this.getInfrastructureCosts()
    const roi =
      businessMetrics.revenue.monthly > 0
        ? ((businessMetrics.revenue.monthly - aiCosts - infrastructureCosts) /
            (aiCosts + infrastructureCosts)) *
          100
        : 0

    return {
      revenue: {
        daily: businessMetrics.revenue.daily,
        monthly: businessMetrics.revenue.monthly,
        growth: revenueGrowth,
      },
      users: {
        active: businessMetrics.students.totalActive,
        new: businessMetrics.students.newSignups,
        retention: businessMetrics.students.retentionRate,
      },
      engagement: {
        avgSession: businessMetrics.engagement.averageSessionDuration,
        questionsPerUser: businessMetrics.engagement.questionsPerUser,
        collaborativeRate: businessMetrics.engagement.collaborativeParticipation,
      },
      costs: {
        aiCosts,
        infrastructure: infrastructureCosts,
        roi,
      },
      forecasts: {
        revenue: this.forecastRevenue(businessMetrics),
        users: this.forecastUsers(businessMetrics),
        costs: this.forecastCosts(aiCosts, infrastructureCosts),
      },
    }
  }

  // Private methods for metrics collection

  private async getCPUMetrics() {
    // Mock implementation - in production, use actual system metrics
    return {
      usage: Math.random() * 80 + 10, // 10-90%
      cores: 4,
      loadAverage: [1.2, 1.5, 1.8],
    }
  }

  private async getMemoryMetrics() {
    const total = 8 * 1024 * 1024 * 1024 // 8GB
    const used = Math.random() * total * 0.7 + total * 0.2 // 20-90% usage
    return {
      used,
      free: total - used,
      total,
      percentage: (used / total) * 100,
    }
  }

  private async getDiskMetrics() {
    const total = 100 * 1024 * 1024 * 1024 // 100GB
    const used = Math.random() * total * 0.6 + total * 0.1 // 10-70% usage
    return {
      used,
      free: total - used,
      total,
      percentage: (used / total) * 100,
    }
  }

  private async getNetworkMetrics() {
    return {
      bytesIn: Math.random() * 1000000,
      bytesOut: Math.random() * 1000000,
      packetsIn: Math.random() * 10000,
      packetsOut: Math.random() * 10000,
    }
  }

  private async getRequestMetrics() {
    const total = Math.floor(Math.random() * 1000) + 100
    const failed = Math.floor(total * (Math.random() * 0.05)) // 0-5% failure rate
    return {
      total,
      successful: total - failed,
      failed,
      averageResponseTime: Math.random() * 500 + 100, // 100-600ms
      p95ResponseTime: Math.random() * 1000 + 500, // 500-1500ms
      p99ResponseTime: Math.random() * 2000 + 1000, // 1000-3000ms
    }
  }

  private async getDatabaseMetrics() {
    return {
      connections: Math.floor(Math.random() * 20) + 5,
      activeQueries: Math.floor(Math.random() * 10),
      queryTime: Math.random() * 100 + 10, // 10-110ms
      cacheHitRate: Math.random() * 0.3 + 0.7, // 70-100%
    }
  }

  private async getAIMetrics() {
    return {
      totalRequests: Math.floor(Math.random() * 500) + 100,
      successRate: Math.random() * 0.1 + 0.9, // 90-100%
      averageLatency: Math.random() * 2000 + 1000, // 1000-3000ms
      costPerRequest: Math.random() * 0.01 + 0.005, // $0.005-0.015
      cacheHitRate: Math.random() * 0.2 + 0.6, // 60-80%
      providerDistribution: {
        claude: Math.random() * 0.4 + 0.3, // 30-70%
        openai: Math.random() * 0.4 + 0.3, // 30-70%
      },
    }
  }

  private async getCollaborativeMetrics() {
    return {
      activeRooms: Math.floor(Math.random() * 20) + 5,
      totalParticipants: Math.floor(Math.random() * 100) + 20,
      messagesPerSecond: Math.random() * 10 + 1,
      averageSessionDuration: Math.random() * 3600 + 1800, // 30-90 minutes
    }
  }

  private async getStudentMetrics() {
    return {
      totalActive: Math.floor(Math.random() * 1000) + 500,
      newSignups: Math.floor(Math.random() * 50) + 10,
      retentionRate: Math.random() * 0.2 + 0.75, // 75-95%
      churnRate: Math.random() * 0.05 + 0.02, // 2-7%
    }
  }

  private async getRevenueMetrics() {
    const daily = Math.random() * 5000 + 1000 // $1000-6000
    return {
      daily,
      monthly: daily * 30,
      projectedMonthly: daily * 30 * 1.1, // 10% growth projection
      arpu: Math.random() * 100 + 50, // $50-150 per user
    }
  }

  private async getEngagementMetrics() {
    return {
      averageSessionDuration: Math.random() * 1800 + 900, // 15-45 minutes
      questionsPerUser: Math.random() * 20 + 5, // 5-25 questions
      studySessionsPerDay: Math.random() * 3 + 1, // 1-4 sessions
      collaborativeParticipation: Math.random() * 0.3 + 0.4, // 40-70%
    }
  }

  private async getGrowthMetrics() {
    return {
      signupRate: Math.random() * 0.05 + 0.02, // 2-7% daily signup rate
      conversionRate: Math.random() * 0.1 + 0.05, // 5-15% conversion
      referralRate: Math.random() * 0.2 + 0.1, // 10-30% referral rate
      marketingRoi: Math.random() * 2 + 1, // 1-3x ROI
    }
  }

  private async updateRealtimeMetrics(type: string, metrics: any): Promise<void> {
    await this.redis.setex(`realtime:${type}`, 300, JSON.stringify(metrics))
  }

  private evaluateThreshold(value: number, operator: string, threshold: number): boolean {
    switch (operator) {
      case '>':
        return value > threshold
      case '<':
        return value < threshold
      case '>=':
        return value >= threshold
      case '<=':
        return value <= threshold
      case '=':
        return value === threshold
      default:
        return false
    }
  }

  private async createAlert(config: AlertConfig, currentValue: number): Promise<Alert> {
    const alert: Alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      type: 'system',
      severity: config.severity,
      title: `${config.name} Alert`,
      description: `${config.metric} is ${currentValue}, threshold: ${config.threshold}`,
      metric: config.metric,
      threshold: config.threshold,
      currentValue,
      timestamp: Date.now(),
      resolved: false,
    }

    this.activeAlerts.set(alert.id, alert)

    // Store alert
    await this.redis.setex(`alert:${alert.id}`, 86400, JSON.stringify(alert))

    // Send notifications
    await this.sendAlertNotifications(alert, config.channels)

    return alert
  }

  private async sendAlertNotifications(alert: Alert, channels: string[]): Promise<void> {
    // Implementation would send to Slack, email, SMS, etc.
    console.log(`🚨 ALERT [${alert.severity.toUpperCase()}]: ${alert.title}`)
    console.log(`   ${alert.description}`)
  }

  private async getMetricValue(metric: string): Promise<number> {
    // Get latest metric value from Redis
    const latest = await this.redis.get(`realtime:${metric.split('.')[0]}`)
    if (!latest) return 0

    const data = JSON.parse(latest)
    return this.getNestedValue(data, metric)
  }

  private getNestedValue(obj: any, path: string): number {
    return path.split('.').reduce((current, key) => current?.[key], obj) || 0
  }

  private getDefaultConfig(): MonitoringConfig {
    return {
      alerts: [
        {
          name: 'High Memory Usage',
          metric: 'system.memory.percentage',
          operator: '>',
          threshold: 85,
          duration: 300,
          severity: 'high',
          channels: ['slack', 'email'],
          enabled: true,
        },
        {
          name: 'High Response Time',
          metric: 'application.requests.averageResponseTime',
          operator: '>',
          threshold: 1000,
          duration: 180,
          severity: 'medium',
          channels: ['slack'],
          enabled: true,
        },
        {
          name: 'AI Gateway High Error Rate',
          metric: 'application.ai.successRate',
          operator: '<',
          threshold: 0.95,
          duration: 120,
          severity: 'high',
          channels: ['slack', 'email'],
          enabled: true,
        },
      ],
      dashboards: [],
      retentionPeriods: {
        metrics: 604800, // 7 days
        logs: 86400, // 1 day
        traces: 86400, // 1 day
      },
      sampling: {
        metrics: 1.0, // 100% sampling
        traces: 0.1, // 10% sampling
      },
    }
  }

  private async getWidgetData(widget: DashboardWidget): Promise<any> {
    // Mock widget data - in production, execute actual queries
    return {
      labels: ['00:00', '06:00', '12:00', '18:00'],
      datasets: [
        {
          label: widget.title,
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
          ],
        },
      ],
    }
  }

  private startMetricsCollection(): void {
    if (this.isCollecting) return

    this.isCollecting = true

    // Collect system metrics every 30 seconds
    setInterval(() => this.collectSystemMetrics(), 30000)

    // Collect application metrics every 60 seconds
    setInterval(() => this.collectApplicationMetrics(), 60000)

    // Collect business metrics every 5 minutes
    setInterval(() => this.collectBusinessMetrics(), 300000)
  }

  private startAlertProcessing(): void {
    // Process alerts every minute
    setInterval(() => this.processAlerts(), 60000)
  }

  private calculateAverage(numbers: number[]): number {
    if (numbers.length === 0) return 0
    return numbers.reduce((sum, n) => sum + n, 0) / numbers.length
  }

  private calculatePercentile(sortedNumbers: number[], percentile: number): number {
    if (sortedNumbers.length === 0) return 0
    const index = Math.ceil(sortedNumbers.length * percentile) - 1
    return sortedNumbers[Math.max(0, index)]
  }

  private getStartTime(timeRange: string, endTime: number): number {
    const ranges: Record<string, number> = {
      '1h': 3600000,
      '6h': 21600000,
      '24h': 86400000,
      '7d': 604800000,
      '30d': 2592000000,
    }
    return endTime - (ranges[timeRange] || ranges['24h'])
  }

  private async getMetricsInRange(
    type: string,
    startTime: number,
    endTime: number
  ): Promise<any[]> {
    // Mock implementation - in production, query actual metrics
    return []
  }

  private async getLatestBusinessMetrics(): Promise<BusinessMetrics> {
    const latest = await this.redis.get('realtime:business')
    return latest ? JSON.parse(latest) : ({} as BusinessMetrics)
  }

  private async getBusinessMetricsFromRange(
    start: string,
    end: string
  ): Promise<BusinessMetrics | null> {
    // Mock implementation
    return null
  }

  private async getAICosts(): Promise<number> {
    return Math.random() * 500 + 100 // $100-600
  }

  private async getInfrastructureCosts(): Promise<number> {
    return Math.random() * 200 + 50 // $50-250
  }

  private forecastRevenue(metrics: BusinessMetrics): number {
    return metrics.revenue.monthly * 1.15 // 15% growth projection
  }

  private forecastUsers(metrics: BusinessMetrics): number {
    return metrics.students.totalActive * 1.1 // 10% growth projection
  }

  private forecastCosts(aiCosts: number, infraCosts: number): number {
    return (aiCosts + infraCosts) * 1.05 // 5% cost increase projection
  }

  // Health check implementations
  private async checkDatabaseHealth() {
    try {
      // Mock database check
      await new Promise((resolve) => setTimeout(resolve, 10))
      return { name: 'Database', status: true, latency: 10 }
    } catch (error) {
      return { name: 'Database', status: false, error: 'Connection failed' }
    }
  }

  private async checkRedisHealth() {
    try {
      const start = Date.now()
      await this.redis.ping()
      const latency = Date.now() - start
      return { name: 'Redis', status: true, latency }
    } catch (error) {
      return { name: 'Redis', status: false, error: 'Connection failed' }
    }
  }

  private async checkAIGatewayHealth() {
    try {
      // Mock AI Gateway check
      await new Promise((resolve) => setTimeout(resolve, 50))
      return { name: 'AI Gateway', status: true, latency: 50 }
    } catch (error) {
      return { name: 'AI Gateway', status: false, error: 'Gateway unreachable' }
    }
  }

  private async checkMemoryHealth() {
    const metrics = await this.getMemoryMetrics()
    return {
      name: 'Memory',
      status: metrics.percentage < 90,
      latency: 1,
    }
  }

  private async checkDiskHealth() {
    const metrics = await this.getDiskMetrics()
    return {
      name: 'Disk Space',
      status: metrics.percentage < 85,
      latency: 1,
    }
  }

  private async checkResponseTimeHealth() {
    const metrics = await this.getRequestMetrics()
    return {
      name: 'Response Time',
      status: metrics.averageResponseTime < 1000,
      latency: metrics.averageResponseTime,
    }
  }
}
