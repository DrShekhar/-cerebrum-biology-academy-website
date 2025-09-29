/**
 * Performance Monitoring and Alerting System for 10,000+ Concurrent Users
 * Comprehensive monitoring, metrics collection, and real-time alerting
 */

import { EventEmitter } from 'events'
import { performance } from 'perf_hooks'

interface MetricValue {
  value: number
  timestamp: number
  tags?: Record<string, string>
}

interface Alert {
  id: string
  name: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  condition: string
  threshold: number
  currentValue: number
  message: string
  timestamp: number
  acknowledged: boolean
  resolvedAt?: number
}

interface MonitoringConfig {
  metricsRetentionDays: number
  alertingEnabled: boolean
  webhookUrl?: string
  slackWebhookUrl?: string
  emailEnabled: boolean
  smsEnabled: boolean
  samplingRate: number
}

interface PerformanceMetrics {
  // Application Performance
  responseTime: {
    p50: number
    p90: number
    p95: number
    p99: number
    avg: number
  }
  throughput: {
    requestsPerSecond: number
    requestsPerMinute: number
    requestsPerHour: number
  }
  errorRate: {
    total: number
    percentage: number
    byStatusCode: Record<string, number>
  }

  // System Resources
  cpu: {
    usage: number
    loadAverage: [number, number, number]
  }
  memory: {
    usage: number
    available: number
    total: number
    heapUsed: number
    heapTotal: number
  }

  // Database Performance
  database: {
    connections: {
      active: number
      idle: number
      total: number
      waiting: number
    }
    queries: {
      totalExecuted: number
      avgExecutionTime: number
      slowQueries: number
      failedQueries: number
    }
    cache: {
      hitRate: number
      missRate: number
      evictions: number
    }
  }

  // Network & Load Balancer
  network: {
    activeConnections: number
    newConnectionsPerSecond: number
    bandwidthIn: number
    bandwidthOut: number
  }

  // Business Metrics
  business: {
    activeUsers: number
    enrollmentsPerHour: number
    assessmentsCompleted: number
    paymentSuccessRate: number
  }
}

export class PerformanceMonitoringSystem extends EventEmitter {
  private metrics: Map<string, MetricValue[]> = new Map()
  private alerts: Map<string, Alert> = new Map()
  private config: MonitoringConfig
  private collectors: Map<string, NodeJS.Timeout> = new Map()
  private alertRules: Map<string, any> = new Map()

  constructor(config: MonitoringConfig) {
    super()
    this.config = config
    this.setupDefaultAlertRules()
    this.startPerformanceCollection()
    this.startAlertEvaluation()
  }

  /**
   * Record a custom metric
   */
  recordMetric(name: string, value: number, tags?: Record<string, string>): void {
    const metric: MetricValue = {
      value,
      timestamp: Date.now(),
      tags
    }

    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }

    const metricHistory = this.metrics.get(name)!
    metricHistory.push(metric)

    // Keep only recent metrics (last 24 hours by default)
    const cutoff = Date.now() - (this.config.metricsRetentionDays * 24 * 60 * 60 * 1000)
    this.metrics.set(name, metricHistory.filter(m => m.timestamp > cutoff))

    // Emit metric event
    this.emit('metric:recorded', { name, metric })
  }

  /**
   * Record API request metrics
   */
  recordRequest(route: string, method: string, statusCode: number, duration: number): void {
    const tags = { route, method, status: statusCode.toString() }

    this.recordMetric('http_requests_total', 1, tags)
    this.recordMetric('http_request_duration_ms', duration, tags)

    if (statusCode >= 400) {
      this.recordMetric('http_errors_total', 1, tags)
    }

    // Track slow requests
    if (duration > 1000) {
      this.recordMetric('slow_requests_total', 1, tags)
    }
  }

  /**
   * Record database query metrics
   */
  recordDatabaseQuery(query: string, duration: number, success: boolean): void {
    const tags = {
      query_type: this.extractQueryType(query),
      success: success.toString()
    }

    this.recordMetric('db_queries_total', 1, tags)
    this.recordMetric('db_query_duration_ms', duration, tags)

    if (!success) {
      this.recordMetric('db_errors_total', 1, tags)
    }

    if (duration > 100) {
      this.recordMetric('db_slow_queries_total', 1, tags)
    }
  }

  /**
   * Record business metrics
   */
  recordBusinessMetric(name: string, value: number, metadata?: any): void {
    this.recordMetric(`business_${name}`, value, metadata)

    // Special handling for critical business metrics
    switch (name) {
      case 'enrollment_created':
        this.recordMetric('business_enrollments_per_hour', 1, { period: 'hour' })
        break
      case 'payment_completed':
        this.recordMetric('business_revenue_generated', value, metadata)
        break
      case 'user_registered':
        this.recordMetric('business_new_users_per_hour', 1, { period: 'hour' })
        break
    }
  }

  /**
   * Get current performance snapshot
   */
  async getCurrentPerformance(): Promise<PerformanceMetrics> {
    const now = Date.now()
    const last5Minutes = now - (5 * 60 * 1000)
    const lastHour = now - (60 * 60 * 1000)

    return {
      responseTime: this.calculateResponseTimeMetrics(last5Minutes),
      throughput: this.calculateThroughputMetrics(last5Minutes, lastHour),
      errorRate: this.calculateErrorRateMetrics(last5Minutes),
      cpu: await this.getCPUMetrics(),
      memory: this.getMemoryMetrics(),
      database: await this.getDatabaseMetrics(),
      network: this.getNetworkMetrics(),
      business: this.getBusinessMetrics(lastHour)
    }
  }

  /**
   * Setup default alert rules
   */
  private setupDefaultAlertRules(): void {
    // Response time alerts
    this.addAlertRule({
      name: 'high_response_time_p95',
      condition: 'http_request_duration_ms:p95 > 500',
      severity: 'high',
      message: 'High response time detected: P95 is {{ value }}ms',
      evaluationWindow: 5 * 60 * 1000, // 5 minutes
      threshold: 500
    })

    this.addAlertRule({
      name: 'very_high_response_time_p95',
      condition: 'http_request_duration_ms:p95 > 1000',
      severity: 'critical',
      message: 'Very high response time detected: P95 is {{ value }}ms',
      evaluationWindow: 2 * 60 * 1000, // 2 minutes
      threshold: 1000
    })

    // Error rate alerts
    this.addAlertRule({
      name: 'high_error_rate',
      condition: 'error_rate > 5',
      severity: 'high',
      message: 'High error rate detected: {{ value }}%',
      evaluationWindow: 5 * 60 * 1000,
      threshold: 5
    })

    this.addAlertRule({
      name: 'critical_error_rate',
      condition: 'error_rate > 10',
      severity: 'critical',
      message: 'Critical error rate detected: {{ value }}%',
      evaluationWindow: 2 * 60 * 1000,
      threshold: 10
    })

    // System resource alerts
    this.addAlertRule({
      name: 'high_cpu_usage',
      condition: 'cpu_usage > 80',
      severity: 'medium',
      message: 'High CPU usage detected: {{ value }}%',
      evaluationWindow: 5 * 60 * 1000,
      threshold: 80
    })

    this.addAlertRule({
      name: 'critical_cpu_usage',
      condition: 'cpu_usage > 95',
      severity: 'critical',
      message: 'Critical CPU usage detected: {{ value }}%',
      evaluationWindow: 2 * 60 * 1000,
      threshold: 95
    })

    this.addAlertRule({
      name: 'high_memory_usage',
      condition: 'memory_usage > 85',
      severity: 'medium',
      message: 'High memory usage detected: {{ value }}%',
      evaluationWindow: 5 * 60 * 1000,
      threshold: 85
    })

    this.addAlertRule({
      name: 'critical_memory_usage',
      condition: 'memory_usage > 95',
      severity: 'critical',
      message: 'Critical memory usage detected: {{ value }}%',
      evaluationWindow: 2 * 60 * 1000,
      threshold: 95
    })

    // Database alerts
    this.addAlertRule({
      name: 'database_connection_pool_exhausted',
      condition: 'db_connections_active > 180',
      severity: 'critical',
      message: 'Database connection pool near exhaustion: {{ value }} active connections',
      evaluationWindow: 1 * 60 * 1000,
      threshold: 180
    })

    this.addAlertRule({
      name: 'slow_database_queries',
      condition: 'db_slow_queries_per_minute > 10',
      severity: 'medium',
      message: 'High number of slow database queries: {{ value }} per minute',
      evaluationWindow: 5 * 60 * 1000,
      threshold: 10
    })

    this.addAlertRule({
      name: 'database_cache_low_hit_rate',
      condition: 'db_cache_hit_rate < 80',
      severity: 'medium',
      message: 'Low database cache hit rate: {{ value }}%',
      evaluationWindow: 10 * 60 * 1000,
      threshold: 80
    })

    // Business metric alerts
    this.addAlertRule({
      name: 'low_enrollment_rate',
      condition: 'business_enrollments_per_hour < 5',
      severity: 'medium',
      message: 'Low enrollment rate detected: {{ value }} enrollments per hour',
      evaluationWindow: 60 * 60 * 1000,
      threshold: 5
    })

    this.addAlertRule({
      name: 'payment_failure_spike',
      condition: 'payment_failure_rate > 10',
      severity: 'high',
      message: 'Payment failure rate spike: {{ value }}%',
      evaluationWindow: 10 * 60 * 1000,
      threshold: 10
    })
  }

  /**
   * Add custom alert rule
   */
  addAlertRule(rule: {
    name: string
    condition: string
    severity: Alert['severity']
    message: string
    evaluationWindow: number
    threshold: number
  }): void {
    this.alertRules.set(rule.name, rule)
  }

  /**
   * Start performance data collection
   */
  private startPerformanceCollection(): void {
    // Collect system metrics every 30 seconds
    const systemCollector = setInterval(() => {
      this.collectSystemMetrics()
    }, 30000)
    this.collectors.set('system', systemCollector)

    // Collect application metrics every 15 seconds
    const appCollector = setInterval(() => {
      this.collectApplicationMetrics()
    }, 15000)
    this.collectors.set('application', appCollector)

    // Collect business metrics every 60 seconds
    const businessCollector = setInterval(() => {
      this.collectBusinessMetrics()
    }, 60000)
    this.collectors.set('business', businessCollector)

    console.log('✅ Performance monitoring collectors started')
  }

  /**
   * Start alert evaluation
   */
  private startAlertEvaluation(): void {
    if (!this.config.alertingEnabled) return

    const alertEvaluator = setInterval(() => {
      this.evaluateAlerts()
    }, 30000) // Evaluate every 30 seconds

    this.collectors.set('alerts', alertEvaluator)
    console.log('✅ Alert evaluation started')
  }

  /**
   * Collect system metrics
   */
  private async collectSystemMetrics(): Promise<void> {
    try {
      // CPU metrics
      const cpuUsage = process.cpuUsage()
      const cpuPercent = (cpuUsage.user + cpuUsage.system) / 1000000 / 30 * 100 // 30 second interval
      this.recordMetric('cpu_usage', cpuPercent)

      // Memory metrics
      const memUsage = process.memoryUsage()
      this.recordMetric('memory_heap_used', memUsage.heapUsed)
      this.recordMetric('memory_heap_total', memUsage.heapTotal)
      this.recordMetric('memory_external', memUsage.external)
      this.recordMetric('memory_rss', memUsage.rss)

      // Calculate memory usage percentage
      const totalMemory = memUsage.heapTotal
      const usedMemory = memUsage.heapUsed
      const memoryUsagePercent = (usedMemory / totalMemory) * 100
      this.recordMetric('memory_usage', memoryUsagePercent)

      // Node.js specific metrics
      this.recordMetric('nodejs_version', parseFloat(process.version.slice(1)))
      this.recordMetric('process_uptime', process.uptime())

      // Event loop lag
      const start = performance.now()
      setImmediate(() => {
        const lag = performance.now() - start
        this.recordMetric('event_loop_lag_ms', lag)
      })

    } catch (error) {
      console.error('Error collecting system metrics:', error)
    }
  }

  /**
   * Collect application metrics
   */
  private collectApplicationMetrics(): void {
    try {
      // Calculate derived metrics from recorded data
      const now = Date.now()
      const last5Minutes = now - (5 * 60 * 1000)

      // Request rate metrics
      const totalRequests = this.getMetricSum('http_requests_total', last5Minutes)
      const requestsPerSecond = totalRequests / 300 // 5 minutes = 300 seconds
      this.recordMetric('requests_per_second', requestsPerSecond)

      // Error rate metrics
      const totalErrors = this.getMetricSum('http_errors_total', last5Minutes)
      const errorRate = totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0
      this.recordMetric('error_rate', errorRate)

      // Response time metrics
      const responseTimes = this.getMetricValues('http_request_duration_ms', last5Minutes)
      if (responseTimes.length > 0) {
        responseTimes.sort((a, b) => a - b)
        const p50 = this.calculatePercentile(responseTimes, 50)
        const p90 = this.calculatePercentile(responseTimes, 90)
        const p95 = this.calculatePercentile(responseTimes, 95)
        const p99 = this.calculatePercentile(responseTimes, 99)

        this.recordMetric('response_time_p50', p50)
        this.recordMetric('response_time_p90', p90)
        this.recordMetric('response_time_p95', p95)
        this.recordMetric('response_time_p99', p99)
      }

      // Database metrics
      const dbQueries = this.getMetricSum('db_queries_total', last5Minutes)
      const dbErrors = this.getMetricSum('db_errors_total', last5Minutes)
      const dbSlowQueries = this.getMetricSum('db_slow_queries_total', last5Minutes)

      this.recordMetric('db_queries_per_second', dbQueries / 300)
      this.recordMetric('db_error_rate', dbQueries > 0 ? (dbErrors / dbQueries) * 100 : 0)
      this.recordMetric('db_slow_queries_per_minute', dbSlowQueries / 5)

    } catch (error) {
      console.error('Error collecting application metrics:', error)
    }
  }

  /**
   * Collect business metrics
   */
  private collectBusinessMetrics(): void {
    try {
      const now = Date.now()
      const lastHour = now - (60 * 60 * 1000)

      // Enrollment metrics
      const enrollments = this.getMetricSum('business_enrollment_created', lastHour)
      this.recordMetric('enrollments_per_hour', enrollments)

      // User activity metrics
      const activeUsers = this.getUniqueUsersCount(lastHour)
      this.recordMetric('active_users_hourly', activeUsers)

      // Payment metrics
      const payments = this.getMetricSum('business_payment_completed', lastHour)
      const paymentFailures = this.getMetricSum('business_payment_failed', lastHour)
      const totalPaymentAttempts = payments + paymentFailures

      if (totalPaymentAttempts > 0) {
        const paymentSuccessRate = (payments / totalPaymentAttempts) * 100
        this.recordMetric('payment_success_rate', paymentSuccessRate)
        this.recordMetric('payment_failure_rate', 100 - paymentSuccessRate)
      }

      // Assessment metrics
      const assessments = this.getMetricSum('business_assessment_completed', lastHour)
      this.recordMetric('assessments_per_hour', assessments)

    } catch (error) {
      console.error('Error collecting business metrics:', error)
    }
  }

  /**
   * Evaluate alert conditions
   */
  private async evaluateAlerts(): Promise<void> {
    for (const [ruleName, rule] of this.alertRules) {
      try {
        const currentValue = await this.evaluateCondition(rule.condition, rule.evaluationWindow)

        if (currentValue !== null && currentValue > rule.threshold) {
          await this.triggerAlert(ruleName, rule, currentValue)
        } else {
          await this.resolveAlert(ruleName)
        }
      } catch (error) {
        console.error(`Error evaluating alert rule ${ruleName}:`, error)
      }
    }
  }

  /**
   * Evaluate a condition expression
   */
  private async evaluateCondition(condition: string, evaluationWindow: number): Promise<number | null> {
    const now = Date.now()
    const windowStart = now - evaluationWindow

    // Parse condition (simplified parser for basic conditions)
    if (condition.includes('http_request_duration_ms:p95')) {
      const responseTimes = this.getMetricValues('http_request_duration_ms', windowStart)
      if (responseTimes.length === 0) return null

      responseTimes.sort((a, b) => a - b)
      return this.calculatePercentile(responseTimes, 95)
    }

    if (condition.includes('error_rate')) {
      const totalRequests = this.getMetricSum('http_requests_total', windowStart)
      const totalErrors = this.getMetricSum('http_errors_total', windowStart)

      if (totalRequests === 0) return null
      return (totalErrors / totalRequests) * 100
    }

    if (condition.includes('cpu_usage')) {
      const cpuValues = this.getMetricValues('cpu_usage', windowStart)
      if (cpuValues.length === 0) return null

      return cpuValues.reduce((sum, val) => sum + val, 0) / cpuValues.length
    }

    if (condition.includes('memory_usage')) {
      const memValues = this.getMetricValues('memory_usage', windowStart)
      if (memValues.length === 0) return null

      return memValues.reduce((sum, val) => sum + val, 0) / memValues.length
    }

    // Add more condition evaluators as needed
    return null
  }

  /**
   * Trigger an alert
   */
  private async triggerAlert(ruleName: string, rule: any, currentValue: number): Promise<void> {
    const existingAlert = this.alerts.get(ruleName)

    // Don't trigger if alert is already active and not resolved
    if (existingAlert && !existingAlert.resolvedAt) {
      return
    }

    const alert: Alert = {
      id: `${ruleName}_${Date.now()}`,
      name: ruleName,
      severity: rule.severity,
      condition: rule.condition,
      threshold: rule.threshold,
      currentValue,
      message: rule.message.replace('{{ value }}', currentValue.toFixed(2)),
      timestamp: Date.now(),
      acknowledged: false
    }

    this.alerts.set(ruleName, alert)
    this.emit('alert:triggered', alert)

    // Send notifications
    await this.sendAlertNotifications(alert)

    console.warn(`🚨 Alert triggered: ${alert.name} - ${alert.message}`)
  }

  /**
   * Resolve an alert
   */
  private async resolveAlert(ruleName: string): Promise<void> {
    const alert = this.alerts.get(ruleName)

    if (alert && !alert.resolvedAt) {
      alert.resolvedAt = Date.now()
      this.emit('alert:resolved', alert)

      console.log(`✅ Alert resolved: ${alert.name}`)
    }
  }

  /**
   * Send alert notifications
   */
  private async sendAlertNotifications(alert: Alert): Promise<void> {
    const notifications = []

    // Webhook notification
    if (this.config.webhookUrl) {
      notifications.push(this.sendWebhookNotification(alert))
    }

    // Slack notification
    if (this.config.slackWebhookUrl) {
      notifications.push(this.sendSlackNotification(alert))
    }

    // Email notification (if configured)
    if (this.config.emailEnabled) {
      notifications.push(this.sendEmailNotification(alert))
    }

    // SMS notification for critical alerts
    if (this.config.smsEnabled && alert.severity === 'critical') {
      notifications.push(this.sendSMSNotification(alert))
    }

    await Promise.allSettled(notifications)
  }

  /**
   * Send webhook notification
   */
  private async sendWebhookNotification(alert: Alert): Promise<void> {
    if (!this.config.webhookUrl) return

    try {
      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alert_name: alert.name,
          severity: alert.severity,
          message: alert.message,
          current_value: alert.currentValue,
          threshold: alert.threshold,
          timestamp: alert.timestamp,
          service: 'cerebrum-biology-academy'
        })
      })

      if (!response.ok) {
        throw new Error(`Webhook notification failed: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Failed to send webhook notification:', error)
    }
  }

  /**
   * Send Slack notification
   */
  private async sendSlackNotification(alert: Alert): Promise<void> {
    if (!this.config.slackWebhookUrl) return

    const color = {
      low: '#36a64f',
      medium: '#ff9500',
      high: '#ff0000',
      critical: '#8B0000'
    }[alert.severity]

    const payload = {
      text: `🚨 Alert: ${alert.name}`,
      attachments: [
        {
          color,
          fields: [
            {
              title: 'Service',
              value: 'Cerebrum Biology Academy',
              short: true
            },
            {
              title: 'Severity',
              value: alert.severity.toUpperCase(),
              short: true
            },
            {
              title: 'Current Value',
              value: alert.currentValue.toFixed(2),
              short: true
            },
            {
              title: 'Threshold',
              value: alert.threshold.toString(),
              short: true
            },
            {
              title: 'Message',
              value: alert.message,
              short: false
            }
          ],
          ts: Math.floor(alert.timestamp / 1000)
        }
      ]
    }

    try {
      const response = await fetch(this.config.slackWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`Slack notification failed: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Failed to send Slack notification:', error)
    }
  }

  /**
   * Send email notification (placeholder)
   */
  private async sendEmailNotification(alert: Alert): Promise<void> {
    // Implementation would depend on your email service (SendGrid, SES, etc.)
    console.log(`📧 Email notification would be sent for alert: ${alert.name}`)
  }

  /**
   * Send SMS notification (placeholder)
   */
  private async sendSMSNotification(alert: Alert): Promise<void> {
    // Implementation would depend on your SMS service (Twilio, SNS, etc.)
    console.log(`📱 SMS notification would be sent for alert: ${alert.name}`)
  }

  // Utility methods for metric calculations

  private calculateResponseTimeMetrics(since: number) {
    const responseTimes = this.getMetricValues('http_request_duration_ms', since)

    if (responseTimes.length === 0) {
      return { p50: 0, p90: 0, p95: 0, p99: 0, avg: 0 }
    }

    responseTimes.sort((a, b) => a - b)

    return {
      p50: this.calculatePercentile(responseTimes, 50),
      p90: this.calculatePercentile(responseTimes, 90),
      p95: this.calculatePercentile(responseTimes, 95),
      p99: this.calculatePercentile(responseTimes, 99),
      avg: responseTimes.reduce((sum, val) => sum + val, 0) / responseTimes.length
    }
  }

  private calculateThroughputMetrics(since5Min: number, sinceHour: number) {
    const requests5Min = this.getMetricSum('http_requests_total', since5Min)
    const requestsHour = this.getMetricSum('http_requests_total', sinceHour)

    return {
      requestsPerSecond: requests5Min / 300, // 5 minutes = 300 seconds
      requestsPerMinute: requests5Min / 5,
      requestsPerHour: requestsHour
    }
  }

  private calculateErrorRateMetrics(since: number) {
    const totalRequests = this.getMetricSum('http_requests_total', since)
    const totalErrors = this.getMetricSum('http_errors_total', since)

    const byStatusCode: Record<string, number> = {}
    const errorMetrics = this.getMetricHistory('http_errors_total', since)

    errorMetrics.forEach(metric => {
      if (metric.tags?.status) {
        byStatusCode[metric.tags.status] = (byStatusCode[metric.tags.status] || 0) + metric.value
      }
    })

    return {
      total: totalErrors,
      percentage: totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0,
      byStatusCode
    }
  }

  private async getCPUMetrics() {
    return {
      usage: this.getLatestMetricValue('cpu_usage') || 0,
      loadAverage: process.platform !== 'win32' ? require('os').loadavg() as [number, number, number] : [0, 0, 0]
    }
  }

  private getMemoryMetrics() {
    const memUsage = process.memoryUsage()

    return {
      usage: this.getLatestMetricValue('memory_usage') || 0,
      available: memUsage.heapTotal - memUsage.heapUsed,
      total: memUsage.heapTotal,
      heapUsed: memUsage.heapUsed,
      heapTotal: memUsage.heapTotal
    }
  }

  private async getDatabaseMetrics() {
    const now = Date.now()
    const last5Min = now - (5 * 60 * 1000)

    return {
      connections: {
        active: this.getLatestMetricValue('db_connections_active') || 0,
        idle: this.getLatestMetricValue('db_connections_idle') || 0,
        total: this.getLatestMetricValue('db_connections_total') || 0,
        waiting: this.getLatestMetricValue('db_connections_waiting') || 0
      },
      queries: {
        totalExecuted: this.getMetricSum('db_queries_total', last5Min),
        avgExecutionTime: this.getLatestMetricValue('db_avg_query_time') || 0,
        slowQueries: this.getMetricSum('db_slow_queries_total', last5Min),
        failedQueries: this.getMetricSum('db_errors_total', last5Min)
      },
      cache: {
        hitRate: this.getLatestMetricValue('db_cache_hit_rate') || 0,
        missRate: this.getLatestMetricValue('db_cache_miss_rate') || 0,
        evictions: this.getMetricSum('db_cache_evictions', last5Min)
      }
    }
  }

  private getNetworkMetrics() {
    return {
      activeConnections: this.getLatestMetricValue('network_active_connections') || 0,
      newConnectionsPerSecond: this.getLatestMetricValue('network_new_connections_per_second') || 0,
      bandwidthIn: this.getLatestMetricValue('network_bandwidth_in') || 0,
      bandwidthOut: this.getLatestMetricValue('network_bandwidth_out') || 0
    }
  }

  private getBusinessMetrics(sinceHour: number) {
    return {
      activeUsers: this.getLatestMetricValue('active_users_hourly') || 0,
      enrollmentsPerHour: this.getMetricSum('business_enrollment_created', sinceHour),
      assessmentsCompleted: this.getMetricSum('business_assessment_completed', sinceHour),
      paymentSuccessRate: this.getLatestMetricValue('payment_success_rate') || 0
    }
  }

  // Helper methods

  private getMetricValues(name: string, since: number): number[] {
    const metrics = this.metrics.get(name) || []
    return metrics
      .filter(m => m.timestamp >= since)
      .map(m => m.value)
  }

  private getMetricHistory(name: string, since: number): MetricValue[] {
    const metrics = this.metrics.get(name) || []
    return metrics.filter(m => m.timestamp >= since)
  }

  private getMetricSum(name: string, since: number): number {
    const values = this.getMetricValues(name, since)
    return values.reduce((sum, val) => sum + val, 0)
  }

  private getLatestMetricValue(name: string): number | null {
    const metrics = this.metrics.get(name) || []
    if (metrics.length === 0) return null

    return metrics[metrics.length - 1].value
  }

  private calculatePercentile(sortedValues: number[], percentile: number): number {
    if (sortedValues.length === 0) return 0

    const index = Math.ceil((percentile / 100) * sortedValues.length) - 1
    return sortedValues[Math.max(0, Math.min(index, sortedValues.length - 1))]
  }

  private getUniqueUsersCount(since: number): number {
    // This would need to be implemented based on how you track user sessions
    // For now, return a placeholder
    return this.getLatestMetricValue('active_users_hourly') || 0
  }

  private extractQueryType(query: string): string {
    const trimmed = query.trim().toUpperCase()
    if (trimmed.startsWith('SELECT')) return 'SELECT'
    if (trimmed.startsWith('INSERT')) return 'INSERT'
    if (trimmed.startsWith('UPDATE')) return 'UPDATE'
    if (trimmed.startsWith('DELETE')) return 'DELETE'
    return 'OTHER'
  }

  /**
   * Get comprehensive dashboard data
   */
  async getDashboardData(): Promise<any> {
    const performance = await this.getCurrentPerformance()
    const activeAlerts = Array.from(this.alerts.values()).filter(alert => !alert.resolvedAt)

    return {
      timestamp: Date.now(),
      performance,
      alerts: {
        active: activeAlerts,
        total: this.alerts.size,
        critical: activeAlerts.filter(a => a.severity === 'critical').length,
        high: activeAlerts.filter(a => a.severity === 'high').length
      },
      systemHealth: this.calculateSystemHealth(performance),
      recentMetrics: this.getRecentMetrics()
    }
  }

  private calculateSystemHealth(performance: PerformanceMetrics): {
    overall: 'healthy' | 'degraded' | 'unhealthy'
    score: number
    factors: Record<string, number>
  } {
    const factors = {
      responseTime: performance.responseTime.p95 < 500 ? 100 : Math.max(0, 100 - (performance.responseTime.p95 - 500) / 10),
      errorRate: performance.errorRate.percentage < 1 ? 100 : Math.max(0, 100 - performance.errorRate.percentage * 20),
      cpu: performance.cpu.usage < 80 ? 100 : Math.max(0, 100 - (performance.cpu.usage - 80) * 5),
      memory: performance.memory.usage < 85 ? 100 : Math.max(0, 100 - (performance.memory.usage - 85) * 10),
      database: performance.database.queries.failedQueries === 0 ? 100 : Math.max(0, 100 - performance.database.queries.failedQueries * 10)
    }

    const score = Object.values(factors).reduce((sum, val) => sum + val, 0) / Object.keys(factors).length

    let overall: 'healthy' | 'degraded' | 'unhealthy'
    if (score >= 90) overall = 'healthy'
    else if (score >= 70) overall = 'degraded'
    else overall = 'unhealthy'

    return { overall, score, factors }
  }

  private getRecentMetrics(): Record<string, number[]> {
    const now = Date.now()
    const last30Min = now - (30 * 60 * 1000)

    return {
      responseTime: this.getMetricValues('response_time_p95', last30Min),
      requestsPerSecond: this.getMetricValues('requests_per_second', last30Min),
      errorRate: this.getMetricValues('error_rate', last30Min),
      cpuUsage: this.getMetricValues('cpu_usage', last30Min),
      memoryUsage: this.getMetricValues('memory_usage', last30Min)
    }
  }

  /**
   * Graceful shutdown
   */
  async shutdown(): Promise<void> {
    console.log('🔄 Shutting down performance monitoring system...')

    // Clear all collectors
    for (const [name, interval] of this.collectors) {
      clearInterval(interval)
      console.log(`✅ Stopped ${name} collector`)
    }

    this.collectors.clear()
    console.log('✅ Performance monitoring system shutdown complete')
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitoringSystem({
  metricsRetentionDays: 7,
  alertingEnabled: process.env.NODE_ENV === 'production',
  webhookUrl: process.env.MONITORING_WEBHOOK_URL,
  slackWebhookUrl: process.env.SLACK_WEBHOOK_URL,
  emailEnabled: process.env.EMAIL_ALERTS_ENABLED === 'true',
  smsEnabled: process.env.SMS_ALERTS_ENABLED === 'true',
  samplingRate: 1.0
})

// Setup graceful shutdown
process.on('SIGTERM', () => performanceMonitor.shutdown())
process.on('SIGINT', () => performanceMonitor.shutdown())

export default performanceMonitor