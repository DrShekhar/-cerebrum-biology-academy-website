'use client'

import React from 'react'
import { CheckCircle2, XCircle, AlertCircle, Clock } from 'lucide-react'

interface CertificateVerificationBadgeProps {
  status: 'ISSUED' | 'REVOKED' | 'EXPIRED' | 'DRAFT'
  revokeReason?: string | null
  validUntil?: Date | null
  className?: string
}

export default function CertificateVerificationBadge({
  status,
  revokeReason,
  validUntil,
  className = '',
}: CertificateVerificationBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'ISSUED':
        return {
          icon: CheckCircle2,
          text: 'Verified Certificate',
          description: 'This certificate is valid and authentic',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-600',
          textColor: 'text-green-900',
          descColor: 'text-green-700',
        }
      case 'REVOKED':
        return {
          icon: XCircle,
          text: 'Revoked Certificate',
          description: revokeReason || 'This certificate has been revoked and is no longer valid',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          textColor: 'text-red-900',
          descColor: 'text-red-700',
        }
      case 'EXPIRED':
        return {
          icon: Clock,
          text: 'Expired Certificate',
          description: 'This certificate has expired',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-600',
          textColor: 'text-gray-900',
          descColor: 'text-gray-700',
        }
      case 'DRAFT':
        return {
          icon: AlertCircle,
          text: 'Draft Certificate',
          description: 'This certificate is not yet issued',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
          textColor: 'text-yellow-900',
          descColor: 'text-yellow-700',
        }
      default:
        return {
          icon: AlertCircle,
          text: 'Unknown Status',
          description: 'Certificate status unknown',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-600',
          textColor: 'text-gray-900',
          descColor: 'text-gray-700',
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`${config.iconColor} mt-0.5`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold ${config.textColor} mb-1`}>{config.text}</h4>
          <p className={`text-sm ${config.descColor}`}>{config.description}</p>
          {validUntil && status === 'ISSUED' && (
            <p className={`text-xs ${config.descColor} mt-1`}>
              Valid until:{' '}
              {new Date(validUntil).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
