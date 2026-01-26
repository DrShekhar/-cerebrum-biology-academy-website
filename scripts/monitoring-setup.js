#!/usr/bin/env node
/**
 * Continuous Monitoring Setup Script
 * Cerebrum Biology Academy - Phase 1.1 NextAuth.js Implementation
 *
 * Sets up monitoring, alerting, and analytics for authentication system
 */

const fs = require('fs')
const path = require('path')

class MonitoringSetup {
  constructor() {
    this.projectRoot = process.cwd()
    this.monitoringConfig = {
      metrics: {
        authenticationSuccessRate: { threshold: 99.9, unit: 'percentage' },
        authenticationResponseTime: { threshold: 500, unit: 'milliseconds' },
        magicLinkGenerationTime: { threshold: 200, unit: 'milliseconds' },
        sessionValidationTime: { threshold: 100, unit: 'milliseconds' },
        concurrentUsers: { threshold: 100, unit: 'count' },
        errorRate: { threshold: 0.1, unit: 'percentage' },
      },
      alerts: {
        highAuthFailureRate: {
          condition: 'auth_failure_rate > 5%',
          window: '5 minutes',
          severity: 'critical',
        },
        slowAuthentication: {
          condition: 'auth_response_time > 1000ms',
          window: '1 minute',
          severity: 'warning',
        },
        securityBreach: {
          condition: 'failed_login_attempts > 10',
          window: '1 minute',
          severity: 'critical',
        },
      },
    }
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[34m',
      success: '\x1b[32m',
      warning: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m',
    }
    console.log(`${colors[type]}${message}${colors.reset}`)
  }

  async setupWebVitalsMonitoring() {
    this.log('Setting up Web Vitals monitoring...', 'info')

    const webVitalsConfig = `
// Web Vitals Configuration for Authentication Performance
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export interface AuthMetrics {
  authenticationTime: number;
  magicLinkTime: number;
  sessionValidationTime: number;
  userExperienceScore: number;
}

export class AuthenticationMonitoring {
  private metrics: AuthMetrics = {
    authenticationTime: 0,
    magicLinkTime: 0,
    sessionValidationTime: 0,
    userExperienceScore: 0
  };

  // Track authentication performance
  trackAuthenticationStart() {
    return performance.now();
  }

  trackAuthenticationEnd(startTime: number, operation: string) {
    const duration = performance.now() - startTime;
    this.metrics[operation + 'Time' as keyof AuthMetrics] = duration;
    
    // Send to analytics
    this.sendMetric(operation + '_duration', duration);
    
    // Check if performance threshold exceeded
    if (duration > 500) {
      this.sendAlert('slow_authentication', {
        operation,
        duration,
        threshold: 500
      });
    }
    
    return duration;
  }

  // Track Web Vitals for authentication pages
  setupWebVitals() {
    getCLS(this.onWebVital);
    getFID(this.onWebVital);
    getFCP(this.onWebVital);
    getLCP(this.onWebVital);
    getTTFB(this.onWebVital);
  }

  private onWebVital = (metric: any) => {
    // Send to your analytics endpoint
    this.sendMetric('web_vitals_' + metric.name, metric.value);
  };

  private sendMetric(name: string, value: number) {
    // Send to analytics service (Vercel Analytics, Google Analytics, etc.)
    if (typeof window !== 'undefined') {
      // Client-side analytics
      console.log('Metric:', name, value);
    }
  }

  private sendAlert(type: string, data: any) {
    // Send alert to monitoring service
    console.warn('Performance Alert:', type, data);
  }
}

export const authMonitoring = new AuthenticationMonitoring();
`

    const monitoringDir = path.join(this.projectRoot, 'src/lib/monitoring')
    if (!fs.existsSync(monitoringDir)) {
      fs.mkdirSync(monitoringDir, { recursive: true })
    }

    fs.writeFileSync(path.join(monitoringDir, 'auth-monitoring.ts'), webVitalsConfig)

    this.log('✅ Web Vitals monitoring configuration created', 'success')
  }

  async setupErrorTracking() {
    this.log('Setting up error tracking...', 'info')

    const errorBoundaryComponent = `
'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError?: () => void }>;
}

export class AuthErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log to error tracking service
    this.logErrorToService(error, errorInfo);
  }

  private logErrorToService(error: Error, errorInfo: React.ErrorInfo) {
    // Send to error tracking service (Sentry, LogRocket, etc.)
    console.error('Authentication Error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    // Track specific authentication errors
    if (error.message.includes('auth') || error.message.includes('login')) {
      this.trackAuthenticationError(error);
    }
  }

  private trackAuthenticationError(error: Error) {
    // Send authentication-specific error metrics
    const authError = {
      type: 'authentication_error',
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    };

    // Send to monitoring service
    console.error('Auth Error Tracked:', authError);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error} 
          resetError={this.resetError} 
        />
      );
    }

    return this.props.children;
  }
}

// Default error fallback component
function DefaultErrorFallback({ 
  error, 
  resetError 
}: { 
  error?: Error; 
  resetError?: () => void 
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Authentication Error
          </h3>
          <p className="text-gray-600 mb-4">
            We encountered an issue with the authentication system. Please try again.
          </p>
          {resetError && (
            <button
              onClick={resetError}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
`

    const errorBoundaryPath = path.join(this.projectRoot, 'src/components/ErrorBoundary.tsx')
    fs.writeFileSync(errorBoundaryPath, errorBoundaryComponent)

    this.log('✅ Error boundary component created', 'success')
  }

  async setupPerformanceMonitoring() {
    this.log('Setting up performance monitoring...', 'info')

    const performanceConfig = `
// Performance monitoring configuration
export interface PerformanceMetrics {
  authenticationLatency: number[];
  databaseQueryTime: number[];
  apiResponseTime: number[];
  errorRate: number;
  throughput: number;
}

export class PerformanceTracker {
  private metrics: PerformanceMetrics = {
    authenticationLatency: [],
    databaseQueryTime: [],
    apiResponseTime: [],
    errorRate: 0,
    throughput: 0
  };

  private performanceObserver?: PerformanceObserver;

  constructor() {
    this.setupPerformanceObserver();
  }

  private setupPerformanceObserver() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.processPerformanceEntry(entry);
        });
      });

      this.performanceObserver.observe({ 
        entryTypes: ['measure', 'navigation', 'resource'] 
      });
    }
  }

  private processPerformanceEntry(entry: PerformanceEntry) {
    if (entry.name.includes('auth')) {
      this.metrics.authenticationLatency.push(entry.duration);
      
      // Alert if authentication is slow
      if (entry.duration > 500) {
        this.sendPerformanceAlert('slow_authentication', {
          duration: entry.duration,
          threshold: 500,
          operation: entry.name
        });
      }
    }
  }

  // Track database query performance
  trackDatabaseQuery<T>(queryName: string, queryPromise: Promise<T>): Promise<T> {
    const startTime = performance.now();
    
    return queryPromise
      .then((result) => {
        const duration = performance.now() - startTime;
        this.metrics.databaseQueryTime.push(duration);
        
        performance.mark(\`db-query-\${queryName}-end\`);
        performance.measure(\`db-query-\${queryName}\`, \`db-query-\${queryName}-start\`, \`db-query-\${queryName}-end\`);
        
        return result;
      })
      .catch((error) => {
        const duration = performance.now() - startTime;
        this.trackError('database_query_error', { queryName, duration, error: error.message });
        throw error;
      });
  }

  // Track API response times
  trackApiCall<T>(apiName: string, apiPromise: Promise<T>): Promise<T> {
    const startTime = performance.now();
    
    return apiPromise
      .then((result) => {
        const duration = performance.now() - startTime;
        this.metrics.apiResponseTime.push(duration);
        
        performance.mark(\`api-\${apiName}-end\`);
        performance.measure(\`api-\${apiName}\`, \`api-\${apiName}-start\`, \`api-\${apiName}-end\`);
        
        return result;
      })
      .catch((error) => {
        const duration = performance.now() - startTime;
        this.trackError('api_error', { apiName, duration, error: error.message });
        throw error;
      });
  }

  private trackError(type: string, data: any) {
    this.metrics.errorRate++;
    console.error('Performance Error:', type, data);
  }

  private sendPerformanceAlert(type: string, data: any) {
    console.warn('Performance Alert:', type, data);
  }

  // Get current performance statistics
  getPerformanceStats() {
    const avgAuthLatency = this.average(this.metrics.authenticationLatency);
    const avgDbTime = this.average(this.metrics.databaseQueryTime);
    const avgApiTime = this.average(this.metrics.apiResponseTime);

    return {
      averageAuthenticationLatency: avgAuthLatency,
      averageDatabaseQueryTime: avgDbTime,
      averageApiResponseTime: avgApiTime,
      errorRate: this.metrics.errorRate,
      totalRequests: this.metrics.authenticationLatency.length
    };
  }

  private average(numbers: number[]): number {
    return numbers.length > 0 ? numbers.reduce((a, b) => a + b, 0) / numbers.length : 0;
  }
}

export const performanceTracker = new PerformanceTracker();
`

    const performancePath = path.join(this.projectRoot, 'src/lib/monitoring/performance.ts')
    fs.writeFileSync(performancePath, performanceConfig)

    this.log('✅ Performance monitoring configuration created', 'success')
  }

  async setupSecurityMonitoring() {
    this.log('Setting up security monitoring...', 'info')

    const securityConfig = `
// Security monitoring and threat detection
export interface SecurityEvent {
  type: 'failed_login' | 'suspicious_activity' | 'rate_limit_exceeded' | 'invalid_token';
  timestamp: number;
  ipAddress?: string;
  userAgent?: string;
  email?: string;
  metadata?: any;
}

export class SecurityMonitor {
  private securityEvents: SecurityEvent[] = [];
  private failedAttempts: Map<string, number> = new Map();
  private rateLimitTracker: Map<string, number[]> = new Map();

  // Track failed login attempts
  trackFailedLogin(email: string, ipAddress?: string, userAgent?: string) {
    const event: SecurityEvent = {
      type: 'failed_login',
      timestamp: Date.now(),
      ipAddress,
      userAgent,
      email,
      metadata: { attempt: this.getFailedAttempts(email) + 1 }
    };

    this.securityEvents.push(event);
    this.incrementFailedAttempts(email);

    // Check for brute force attempts
    if (this.getFailedAttempts(email) >= 5) {
      this.triggerSecurityAlert('brute_force_attempt', {
        email,
        attempts: this.getFailedAttempts(email),
        ipAddress,
        userAgent
      });
    }

    // Log security event
    this.logSecurityEvent(event);
  }

  // Track rate limiting
  trackRateLimit(identifier: string, windowMs: number = 60000) {
    const now = Date.now();
    const attempts = this.rateLimitTracker.get(identifier) || [];
    
    // Remove attempts outside the window
    const validAttempts = attempts.filter(time => now - time < windowMs);
    validAttempts.push(now);
    
    this.rateLimitTracker.set(identifier, validAttempts);

    // Check rate limit exceeded
    if (validAttempts.length > 10) { // 10 attempts per minute
      this.triggerSecurityAlert('rate_limit_exceeded', {
        identifier,
        attempts: validAttempts.length,
        window: windowMs
      });

      const event: SecurityEvent = {
        type: 'rate_limit_exceeded',
        timestamp: now,
        metadata: { identifier, attempts: validAttempts.length }
      };
      
      this.securityEvents.push(event);
      this.logSecurityEvent(event);
      
      return false; // Rate limit exceeded
    }

    return true; // Within rate limit
  }

  // Track suspicious activity
  trackSuspiciousActivity(type: string, metadata: any) {
    const event: SecurityEvent = {
      type: 'suspicious_activity',
      timestamp: Date.now(),
      metadata: { activityType: type, ...metadata }
    };

    this.securityEvents.push(event);
    this.logSecurityEvent(event);

    this.triggerSecurityAlert('suspicious_activity', {
      type,
      ...metadata
    });
  }

  // Track invalid token usage
  trackInvalidToken(token: string, reason: string, ipAddress?: string) {
    const event: SecurityEvent = {
      type: 'invalid_token',
      timestamp: Date.now(),
      ipAddress,
      metadata: { reason, tokenPrefix: token.substring(0, 10) + '...' }
    };

    this.securityEvents.push(event);
    this.logSecurityEvent(event);
  }

  private getFailedAttempts(email: string): number {
    return this.failedAttempts.get(email) || 0;
  }

  private incrementFailedAttempts(email: string) {
    const current = this.getFailedAttempts(email);
    this.failedAttempts.set(email, current + 1);
  }

  private triggerSecurityAlert(type: string, data: any) {
    console.warn('🚨 SECURITY ALERT:', type, data);
    
    // Send to security monitoring service
    // This would integrate with your security service (Sentry, DataDog, etc.)
  }

  private logSecurityEvent(event: SecurityEvent) {
    console.log('Security Event:', event);
    
    // Send to logging service
    // This would integrate with your logging service
  }

  // Get security statistics
  getSecurityStats() {
    const recentEvents = this.securityEvents.filter(
      event => Date.now() - event.timestamp < 24 * 60 * 60 * 1000 // Last 24 hours
    );

    return {
      totalSecurityEvents: this.securityEvents.length,
      recentEvents: recentEvents.length,
      failedLoginAttempts: recentEvents.filter(e => e.type === 'failed_login').length,
      rateLimitExceeded: recentEvents.filter(e => e.type === 'rate_limit_exceeded').length,
      suspiciousActivities: recentEvents.filter(e => e.type === 'suspicious_activity').length,
      invalidTokens: recentEvents.filter(e => e.type === 'invalid_token').length
    };
  }

  // Clear old events (cleanup)
  cleanupOldEvents(maxAgeMs: number = 7 * 24 * 60 * 60 * 1000) { // 7 days
    const cutoff = Date.now() - maxAgeMs;
    this.securityEvents = this.securityEvents.filter(event => event.timestamp > cutoff);
  }
}

export const securityMonitor = new SecurityMonitor();
`

    const securityPath = path.join(this.projectRoot, 'src/lib/monitoring/security.ts')
    fs.writeFileSync(securityPath, securityConfig)

    this.log('✅ Security monitoring configuration created', 'success')
  }

  async setupDashboard() {
    this.log('Setting up monitoring dashboard...', 'info')

    const dashboardComponent = `
'use client';

import React, { useState, useEffect } from 'react';
import { authMonitoring } from '@/lib/monitoring/auth-monitoring';
import { performanceTracker } from '@/lib/monitoring/performance';
import { securityMonitor } from '@/lib/monitoring/security';

interface DashboardStats {
  authentication: {
    successRate: number;
    averageResponseTime: number;
    totalAttempts: number;
  };
  performance: {
    averageLatency: number;
    databaseTime: number;
    apiTime: number;
    errorRate: number;
  };
  security: {
    failedLogins: number;
    suspiciousActivities: number;
    rateLimitExceeded: number;
  };
}

export function MonitoringDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const performanceStats = performanceTracker.getPerformanceStats();
        const securityStats = securityMonitor.getSecurityStats();

        const dashboardStats: DashboardStats = {
          authentication: {
            successRate: 99.9, // This would come from actual metrics
            averageResponseTime: performanceStats.averageAuthenticationLatency,
            totalAttempts: performanceStats.totalRequests
          },
          performance: {
            averageLatency: performanceStats.averageAuthenticationLatency,
            databaseTime: performanceStats.averageDatabaseQueryTime,
            apiTime: performanceStats.averageApiResponseTime,
            errorRate: performanceStats.errorRate
          },
          security: {
            failedLogins: securityStats.failedLoginAttempts,
            suspiciousActivities: securityStats.suspiciousActivities,
            rateLimitExceeded: securityStats.rateLimitExceeded
          }
        };

        setStats(dashboardStats);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="p-6">Loading monitoring dashboard...</div>;
  }

  if (!stats) {
    return <div className="p-6">Error loading dashboard stats</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Authentication Monitoring Dashboard</h1>
      
      {/* Authentication Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Success Rate"
          value={\`\${stats.authentication.successRate}%\`}
          status={stats.authentication.successRate >= 99.9 ? 'good' : 'warning'}
        />
        <MetricCard
          title="Avg Response Time"
          value={\`\${Math.round(stats.authentication.averageResponseTime)}ms\`}
          status={stats.authentication.averageResponseTime <= 500 ? 'good' : 'warning'}
        />
        <MetricCard
          title="Total Attempts"
          value={stats.authentication.totalAttempts.toString()}
          status="neutral"
        />
      </div>

      {/* Performance Metrics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Auth Latency"
            value={\`\${Math.round(stats.performance.averageLatency)}ms\`}
            status={stats.performance.averageLatency <= 500 ? 'good' : 'warning'}
          />
          <MetricCard
            title="Database Time"
            value={\`\${Math.round(stats.performance.databaseTime)}ms\`}
            status={stats.performance.databaseTime <= 300 ? 'good' : 'warning'}
          />
          <MetricCard
            title="API Time"
            value={\`\${Math.round(stats.performance.apiTime)}ms\`}
            status={stats.performance.apiTime <= 200 ? 'good' : 'warning'}
          />
          <MetricCard
            title="Error Rate"
            value={\`\${stats.performance.errorRate}%\`}
            status={stats.performance.errorRate <= 0.1 ? 'good' : 'error'}
          />
        </div>
      </div>

      {/* Security Metrics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Security Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Failed Logins"
            value={stats.security.failedLogins.toString()}
            status={stats.security.failedLogins === 0 ? 'good' : 'warning'}
          />
          <MetricCard
            title="Suspicious Activities"
            value={stats.security.suspiciousActivities.toString()}
            status={stats.security.suspiciousActivities === 0 ? 'good' : 'error'}
          />
          <MetricCard
            title="Rate Limit Exceeded"
            value={stats.security.rateLimitExceeded.toString()}
            status={stats.security.rateLimitExceeded === 0 ? 'good' : 'warning'}
          />
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  status: 'good' | 'warning' | 'error' | 'neutral';
}

function MetricCard({ title, value, status }: MetricCardProps) {
  const statusColors = {
    good: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    neutral: 'bg-gray-50 border-gray-200 text-gray-800'
  };

  return (
    <div className={\`p-4 rounded-lg border-2 \${statusColors[status]}\`}>
      <h3 className="text-sm font-medium opacity-75">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
`

    const dashboardPath = path.join(
      this.projectRoot,
      'src/components/monitoring/MonitoringDashboard.tsx'
    )
    const componentsMonitoringDir = path.join(this.projectRoot, 'src/components/monitoring')

    if (!fs.existsSync(componentsMonitoringDir)) {
      fs.mkdirSync(componentsMonitoringDir, { recursive: true })
    }

    fs.writeFileSync(dashboardPath, dashboardComponent)

    this.log('✅ Monitoring dashboard component created', 'success')
  }

  async run() {
    this.log('🔧 Setting up continuous monitoring system...', 'info')
    this.log('', 'info')

    try {
      await this.setupWebVitalsMonitoring()
      await this.setupErrorTracking()
      await this.setupPerformanceMonitoring()
      await this.setupSecurityMonitoring()
      await this.setupDashboard()

      this.log('', 'info')
      this.log('✅ Monitoring setup completed successfully!', 'success')
      this.log('', 'info')
      this.log('📊 Monitoring Components Created:', 'info')
      this.log(
        '  • src/lib/monitoring/auth-monitoring.ts - Authentication performance tracking',
        'info'
      )
      this.log('  • src/lib/monitoring/performance.ts - Performance metrics and alerts', 'info')
      this.log('  • src/lib/monitoring/security.ts - Security event tracking', 'info')
      this.log('  • src/components/ErrorBoundary.tsx - Error boundary for authentication', 'info')
      this.log(
        '  • src/components/monitoring/MonitoringDashboard.tsx - Real-time dashboard',
        'info'
      )
      this.log('', 'info')
      this.log('🎯 Next Steps:', 'info')
      this.log('  1. Integrate monitoring components into your authentication flows', 'info')
      this.log('  2. Configure alerts for your preferred monitoring service', 'info')
      this.log('  3. Set up the monitoring dashboard in admin area', 'info')
      this.log('  4. Test all monitoring functionality', 'info')
    } catch (error) {
      this.log(`❌ Error setting up monitoring: ${error.message}`, 'error')
      process.exit(1)
    }
  }
}

// Run the monitoring setup
const monitoringSetup = new MonitoringSetup()
monitoringSetup.run().catch((error) => {
  console.error('Monitoring setup failed:', error)
  process.exit(1)
})
