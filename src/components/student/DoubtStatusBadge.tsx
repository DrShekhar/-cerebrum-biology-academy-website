import React from 'react'
import { Badge } from '@/components/ui/Badge'
import { CheckCircle, Clock, MessageCircle, CheckCheck, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type DoubtStatus = 'OPEN' | 'IN_PROGRESS' | 'ANSWERED' | 'RESOLVED' | 'CLOSED'

interface DoubtStatusBadgeProps {
  status: DoubtStatus
  className?: string
  showIcon?: boolean
}

const statusConfig: Record<
  DoubtStatus,
  {
    label: string
    variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive'
    icon: React.ReactNode
    color: string
  }
> = {
  OPEN: {
    label: 'Open',
    variant: 'default',
    icon: <Clock className="w-3 h-3" />,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    variant: 'warning',
    icon: <MessageCircle className="w-3 h-3" />,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  ANSWERED: {
    label: 'Answered',
    variant: 'secondary',
    icon: <CheckCircle className="w-3 h-3" />,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  RESOLVED: {
    label: 'Resolved',
    variant: 'success',
    icon: <CheckCheck className="w-3 h-3" />,
    color: 'bg-green-100 text-green-800 border-green-200',
  },
  CLOSED: {
    label: 'Closed',
    variant: 'destructive',
    icon: <XCircle className="w-3 h-3" />,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
  },
}

export function DoubtStatusBadge({ status, className, showIcon = true }: DoubtStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge
      variant={config.variant}
      className={cn('inline-flex items-center gap-1.5 font-medium border', config.color, className)}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </Badge>
  )
}

export function DoubtPriorityBadge({
  priority,
  className,
}: {
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  className?: string
}) {
  const priorityConfig = {
    LOW: { label: 'Low', color: 'bg-gray-100 text-gray-700 border-gray-200' },
    MEDIUM: { label: 'Medium', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    HIGH: { label: 'High', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    URGENT: { label: 'Urgent', color: 'bg-red-100 text-red-700 border-red-200' },
  }

  const config = priorityConfig[priority]

  return (
    <Badge
      className={cn('inline-flex items-center font-medium border text-xs', config.color, className)}
    >
      {config.label}
    </Badge>
  )
}
