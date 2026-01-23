import React from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { MessageCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DoubtStatsWidgetProps {
  stats: {
    total: number
    active: number
    resolved: number
    avgResponseTime: number | null
    resolutionRate: number
    unreadMessages: number
  }
  className?: string
}

export function DoubtStatsWidget({ stats, className }: DoubtStatsWidgetProps) {
  const statCards = [
    {
      label: 'Total Doubts',
      value: stats.total,
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Active',
      value: stats.active,
      icon: <Clock className="w-5 h-5" />,
      color: 'text-orange-600 bg-orange-50',
    },
    {
      label: 'Resolved',
      value: stats.resolved,
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Resolution Rate',
      value: `${stats.resolutionRate}%`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-purple-600 bg-purple-50',
    },
  ]

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {statCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.label === 'Active' && stats.unreadMessages > 0 && (
                  <p className="text-xs text-orange-600 mt-1">
                    {stats.unreadMessages} unread message{stats.unreadMessages !== 1 ? 's' : ''}
                  </p>
                )}
                {stat.label === 'Total Doubts' && stats.avgResponseTime && (
                  <p className="text-xs text-gray-500 mt-1">
                    Avg response: {Math.round(stats.avgResponseTime)} min
                  </p>
                )}
              </div>
              <div className={cn('p-3 rounded-lg', stat.color)}>{stat.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
