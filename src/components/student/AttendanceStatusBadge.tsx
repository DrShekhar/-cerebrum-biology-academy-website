/**
 * Attendance Status Badge Component
 * Displays attendance status with appropriate styling
 */

import React from 'react'
import { Badge } from '@/components/ui/Badge'
import { CheckCircle, XCircle, Clock, AlertCircle, MinusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AttendanceStatus } from '@/types/attendance'

interface AttendanceStatusBadgeProps {
  status: AttendanceStatus
  className?: string
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function AttendanceStatusBadge({
  status,
  className,
  showIcon = true,
  size = 'md',
}: AttendanceStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'PRESENT':
        return {
          label: 'Present',
          icon: CheckCircle,
          className: 'bg-green-100 text-green-800 border-green-200',
        }
      case 'ABSENT':
        return {
          label: 'Absent',
          icon: XCircle,
          className: 'bg-red-100 text-red-800 border-red-200',
        }
      case 'LATE':
        return {
          label: 'Late',
          icon: Clock,
          className: 'bg-orange-100 text-orange-800 border-orange-200',
        }
      case 'EXCUSED':
        return {
          label: 'Excused',
          icon: AlertCircle,
          className: 'bg-blue-100 text-blue-800 border-blue-200',
        }
      case 'HALF_DAY':
        return {
          label: 'Half Day',
          icon: MinusCircle,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        }
      default:
        return {
          label: status,
          icon: Clock,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  }

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }

  return (
    <Badge
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold border',
        config.className,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Icon className={iconSizeClasses[size]} />}
      <span>{config.label}</span>
    </Badge>
  )
}
