'use client'

import React, { useState, useEffect } from 'react'
import {
  Brain,
  Activity,
  DollarSign,
  Clock,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Cpu,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface AIMetrics {
  totalRequests: number
  successRate: number
  averageResponseTime: number
  totalCost: number
  costToday: number
  activeUsers: number
  cacheHitRate: number
  providerDistribution: Record<string, number>
  hourlyUsage: Array<{ hour: number; requests: number }>
  recentErrors: Array<{ timestamp: string; error: string; provider: string }>
}

interface ProviderStatus {
  name: string
  status: 'online' | 'degraded' | 'offline'
  responseTime: number
  successRate: number
  cost: number
  requests: number
}

export default function AIDashboard() {
  const [metrics, setMetrics] = useState<AIMetrics | null>(null)
  const [providers, setProviders] = useState<ProviderStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAIMetrics()
    const interval = setInterval(fetchAIMetrics, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchAIMetrics = async () => {
    try {
      setLoading(true)

      // Fetch from AI status endpoint
      const response = await fetch('/api/ai/unified-chat')
      if (!response.ok) throw new Error('Failed to fetch AI metrics')

      const data = await response.json()

      // Mock metrics for demonstration (in production, fetch from analytics service)
      const mockMetrics: AIMetrics = {
        totalRequests: 15847,
        successRate: 98.5,
        averageResponseTime: 2.3,
        totalCost: 247.85,
        costToday: 15.6,
        activeUsers: 342,
        cacheHitRate: 76.3,
        providerDistribution: {
          anthropic: 45,
          openai: 35,
          google: 20,
        },
        hourlyUsage: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          requests: Math.floor(Math.random() * 100) + 20,
        })),
        recentErrors: [
          { timestamp: new Date().toISOString(), error: 'Rate limit exceeded', provider: 'openai' },
          {
            timestamp: new Date(Date.now() - 300000).toISOString(),
            error: 'Timeout',
            provider: 'google',
          },
        ],
      }

      const mockProviders: ProviderStatus[] = [
        {
          name: 'Anthropic Claude',
          status: 'online',
          responseTime: 2.1,
          successRate: 99.2,
          cost: 112.45,
          requests: 7130,
        },
        {
          name: 'OpenAI GPT-4',
          status: 'online',
          responseTime: 2.8,
          successRate: 97.8,
          cost: 95.3,
          requests: 5546,
        },
        {
          name: 'Google AI',
          status: 'degraded',
          responseTime: 4.2,
          successRate: 94.5,
          cost: 40.1,
          requests: 3171,
        },
      ]

      setMetrics(mockMetrics)
      setProviders(mockProviders)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6 animate-pulse text-blue-600" />
          <span>Loading AI Dashboard...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>Error loading AI metrics: {error}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Dashboard</h2>
          <p className="text-gray-600">
            Monitor AI performance, costs, and usage across all providers
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="w-3 h-3 mr-1" />
            Live
          </Badge>
          <Badge variant="outline">Last updated: {new Date().toLocaleTimeString()}</Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">{metrics?.totalRequests.toLocaleString()}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{metrics?.successRate}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold">{metrics?.averageResponseTime}s</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold text-purple-600">${metrics?.totalCost}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Provider Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cpu className="w-5 h-5" />
            <span>AI Provider Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {providers.map((provider) => (
              <div
                key={provider.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-fadeInUp"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      provider.status === 'online'
                        ? 'bg-green-600'
                        : provider.status === 'degraded'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}
                  />
                  <div>
                    <h3 className="font-medium">{provider.name}</h3>
                    <p className="text-sm text-gray-600">
                      {provider.requests.toLocaleString()} requests • {provider.responseTime}s avg
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${provider.cost.toFixed(2)}</p>
                  <p className="text-xs text-gray-600">{provider.successRate}% success</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Provider Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Provider Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(metrics?.providerDistribution || {}).map(([provider, percentage]) => (
                <div key={provider} className="flex items-center justify-between">
                  <span className="capitalize">{provider}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Cache Hit Rate</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {metrics?.cacheHitRate}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Active Users</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {metrics?.activeUsers}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Today's Cost</span>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  ${metrics?.costToday}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Errors */}
      {metrics?.recentErrors && metrics.recentErrors.length > 0 && (
        <Card className="border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-700">
              <AlertCircle className="w-5 h-5" />
              <span>Recent Errors</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {metrics.recentErrors.map((error, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-yellow-50 rounded"
                >
                  <div>
                    <span className="text-sm font-medium text-yellow-800">{error.error}</span>
                    <span className="text-xs text-yellow-600 ml-2">({error.provider})</span>
                  </div>
                  <span className="text-xs text-yellow-600">
                    {new Date(error.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors">
              Test All Providers
            </button>
            <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200 transition-colors">
              Clear Cache
            </button>
            <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-sm hover:bg-purple-200 transition-colors">
              Export Metrics
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
              View Detailed Logs
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
