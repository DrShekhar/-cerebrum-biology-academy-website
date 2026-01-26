'use client'

import React from 'react'
import { useABTestVariant } from './ABTestProvider'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Users, Trophy, Play, Star } from 'lucide-react'

interface ABTestCTAProps {
  context: 'primary' | 'secondary' | 'footer' | 'pricing'
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ABTestCTA({ context, onClick, className = '', size = 'md' }: ABTestCTAProps) {
  const { variant, config, trackClick } = useABTestVariant('cta_buttons')

  // Default configuration
  const defaultConfig = {
    primaryText: 'Book Free Demo',
    secondaryText: 'Start Learning',
    style: 'bg-yellow-500 hover:bg-yellow-600',
    size: 'md',
    addIcon: false,
  }

  const ctaConfig = config || defaultConfig

  const handleClick = () => {
    trackClick(`${context}_cta`)
    onClick?.()
  }

  const getButtonText = () => {
    switch (context) {
      case 'primary':
        return ctaConfig.primaryText
      case 'secondary':
        return ctaConfig.secondaryText
      case 'footer':
        return 'Get Started Today'
      case 'pricing':
        return 'Enroll Now'
      default:
        return ctaConfig.primaryText
    }
  }

  const getIcon = () => {
    if (!ctaConfig.addIcon) return null

    switch (variant) {
      case 'action_oriented':
        return <Play className="h-4 w-4 ml-2" />
      case 'benefit_focused':
        return <Trophy className="h-4 w-4 ml-2" />
      case 'social_proof':
        return <Users className="h-4 w-4 ml-2" />
      default:
        return <ArrowRight className="h-4 w-4 ml-2" />
    }
  }

  const getSizeClass = () => {
    const configSize = ctaConfig.size || size
    switch (configSize) {
      case 'sm':
        return 'py-2 px-4 text-sm'
      case 'lg':
        return 'py-4 px-8 text-lg'
      default:
        return 'py-3 px-6 text-base'
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'action_oriented':
        return 'bg-green-600 hover:bg-green-600 shadow-green-500/25'
      case 'benefit_focused':
        return 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/25'
      case 'social_proof':
        return 'bg-purple-500 hover:bg-purple-600 shadow-purple-500/25'
      default:
        return 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/25'
    }
  }

  return (
    <div className="relative">
      <Button
        onClick={handleClick}
        className={`
          ${getVariantStyles()}
          ${getSizeClass()}
          font-semibold text-white rounded-lg
          transform hover:scale-105 transition-all duration-300
          shadow-lg hover:shadow-xl
          ${className}
        `}
      >
        <span className="flex items-center justify-center">
          {getButtonText()}
          {getIcon()}
        </span>
      </Button>

      {/* Social proof badge for social_proof variant */}
      {variant === 'social_proof' && context === 'primary' && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 animate-pulse">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>4.9</span>
          </div>
        </div>
      )}

      {/* Urgency indicator for action_oriented variant */}
      {variant === 'action_oriented' && context === 'pricing' && (
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <span className="text-xs text-green-600 font-medium">
            ⚡ Limited time offer - Act now!
          </span>
        </div>
      )}

      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && context === 'primary' && (
        <div className="absolute -bottom-12 left-0 bg-black text-white p-1 rounded text-xs whitespace-nowrap">
          CTA: {variant || 'control'}
        </div>
      )}
    </div>
  )
}

// Specialized CTA components for common use cases
export function DemoBookingCTA({ className, onBook }: { className?: string; onBook?: () => void }) {
  return <ABTestCTA context="primary" onClick={onBook} className={className} size="lg" />
}

export function EnrollmentCTA({
  className,
  onEnroll,
}: {
  className?: string
  onEnroll?: () => void
}) {
  return <ABTestCTA context="pricing" onClick={onEnroll} className={className} />
}

export function SecondaryCTA({ className, onClick }: { className?: string; onClick?: () => void }) {
  return <ABTestCTA context="secondary" onClick={onClick} className={className} size="sm" />
}
