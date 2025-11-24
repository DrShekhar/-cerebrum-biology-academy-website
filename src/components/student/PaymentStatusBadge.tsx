/**
 * Payment Status Badge Component
 * Displays payment status with appropriate styling
 */

import React from 'react'
import { Badge } from '@/components/ui/Badge'
import { CheckCircle, Clock, XCircle, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type PaymentStatus =
  | 'COMPLETED'
  | 'PAID'
  | 'PENDING'
  | 'PROCESSING'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUNDED'
  | 'OVERDUE'

interface PaymentStatusBadgeProps {
  status: PaymentStatus | string
  className?: string
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function PaymentStatusBadge({
  status,
  className,
  showIcon = true,
  size = 'md',
}: PaymentStatusBadgeProps) {
  const getStatusConfig = () => {
    const normalizedStatus = status.toUpperCase()

    switch (normalizedStatus) {
      case 'COMPLETED':
      case 'PAID':
        return {
          label: 'Paid',
          icon: CheckCircle,
          className: 'bg-green-100 text-green-800 border-green-200',
        }
      case 'PENDING':
        return {
          label: 'Pending',
          icon: Clock,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        }
      case 'PROCESSING':
        return {
          label: 'Processing',
          icon: Loader2,
          className: 'bg-blue-100 text-blue-800 border-blue-200',
        }
      case 'FAILED':
        return {
          label: 'Failed',
          icon: XCircle,
          className: 'bg-red-100 text-red-800 border-red-200',
        }
      case 'CANCELLED':
        return {
          label: 'Cancelled',
          icon: XCircle,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        }
      case 'REFUNDED':
        return {
          label: 'Refunded',
          icon: AlertCircle,
          className: 'bg-purple-100 text-purple-800 border-purple-200',
        }
      case 'OVERDUE':
        return {
          label: 'Overdue',
          icon: AlertCircle,
          className: 'bg-red-100 text-red-800 border-red-200',
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
      {showIcon && (
        <Icon
          className={cn(iconSizeClasses[size], config.label === 'Processing' && 'animate-spin')}
        />
      )}
      <span>{config.label}</span>
    </Badge>
  )
}
