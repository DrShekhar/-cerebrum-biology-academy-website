/**
 * KPI Statistics Widget Component
 * Displays comprehensive KPI metrics for counselors
 */

'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle,
  Phone,
  Calendar,
  DollarSign,
  Target,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPIMetrics {
  leadsCreated: number
  leadsContacted: number
  leadsConverted: number
  demosScheduled: number
  demosCompleted: number
  demosNoShow: number
  callsMade: number
  callDurationTotal: number
  whatsappsSent: number
  emailsSent: number
  followUpsMade: number
  tasksCompleted: number
  tasksPending: number
  revenueGenerated: number
  enrollmentsGenerated: number
}

interface CalculatedMetrics {
  conversionRate: number
  avgDealValue: number
}

interface KPIStatisticsWidgetProps {
  metrics: KPIMetrics
  calculated: CalculatedMetrics
  period: string
}

export function KPIStatisticsWidget({ metrics, calculated, period }: KPIStatisticsWidgetProps) {
  const stats = [
    {
      title: 'Leads Created',
      value: metrics.leadsCreated,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Conversions',
      value: metrics.leadsConverted,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Conversion Rate',
      value: `${calculated.conversionRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Revenue Generated',
      value: `₹${metrics.revenueGenerated.toLocaleString('en-IN')}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Demos Scheduled',
      value: metrics.demosScheduled,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Calls Made',
      value: metrics.callsMade,
      icon: Phone,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ]

  const getPeriodLabel = () => {
    switch (period) {
      case 'today':
        return 'Today'
      case 'week':
        return 'This Week'
      case 'month':
        return 'This Month'
      case 'last7days':
        return 'Last 7 Days'
      case 'last30days':
        return 'Last 30 Days'
      default:
        return period
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
          <p className="text-sm text-gray-600 mt-1">{getPeriodLabel()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={cn('p-3 rounded-lg', stat.bgColor)}>
                    <Icon className={cn('w-6 h-6', stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Communication Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Calls</span>
                <span className="text-sm font-semibold text-gray-900">{metrics.callsMade}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Call Duration</span>
                <span className="text-sm font-semibold text-gray-900">
                  {Math.round(metrics.callDurationTotal / 60)}h {metrics.callDurationTotal % 60}m
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">WhatsApps Sent</span>
                <span className="text-sm font-semibold text-gray-900">{metrics.whatsappsSent}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Emails Sent</span>
                <span className="text-sm font-semibold text-gray-900">{metrics.emailsSent}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Activity Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Follow-ups Made</span>
                <span className="text-sm font-semibold text-gray-900">{metrics.followUpsMade}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tasks Completed</span>
                <span className="text-sm font-semibold text-gray-900">
                  {metrics.tasksCompleted}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tasks Pending</span>
                <span className="text-sm font-semibold text-orange-600">
                  {metrics.tasksPending}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Deal Value</span>
                <span className="text-sm font-semibold text-gray-900">
                  ₹{calculated.avgDealValue.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Demo Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{metrics.demosScheduled}</p>
              <p className="text-sm text-gray-600 mt-1">Scheduled</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{metrics.demosCompleted}</p>
              <p className="text-sm text-gray-600 mt-1">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{metrics.demosNoShow}</p>
              <p className="text-sm text-gray-600 mt-1">No-Show</p>
            </div>
          </div>
          {metrics.demosScheduled > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Demo Completion Rate</span>
                <span className="font-semibold text-gray-900">
                  {((metrics.demosCompleted / metrics.demosScheduled) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
