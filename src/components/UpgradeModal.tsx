'use client'

import React, { useEffect, useCallback } from 'react'
import { X, CheckCircle, Lock, Zap, TrendingUp, Target, Award } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import FocusTrap from 'focus-trap-react'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  feature: string
  title?: string
  description?: string
  ctaText?: string
  ctaLink?: string
}

export function UpgradeModal({
  isOpen,
  onClose,
  feature,
  title,
  description,
  ctaText,
  ctaLink,
}: UpgradeModalProps) {
  const handleEscapeKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscapeKey])

  if (!isOpen) return null

  const defaultTitle = title || `Upgrade to unlock ${feature}`
  const defaultDescription =
    description || 'Get full access to NEET Prep tools, analytics, and unlimited practice tests'
  const defaultCtaText = ctaText || 'View Plans'
  const defaultCtaLink = ctaLink || '/courses'

  const features = [
    {
      icon: <Target className="w-5 h-5" />,
      title: 'NEET Score Prediction',
      description: 'Track your predicted score out of 720',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Study Timer & Sessions',
      description: 'Track study time with smart session management',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'Full Analytics',
      description: 'Deep insights with charts and performance trends',
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: 'Unlimited Practice Tests',
      description: 'Access all mock tests and practice questions',
    },
  ]

  return (
<>
{isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeInUp"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <FocusTrap>
              <div
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-fadeInUp"
                role="dialog"
                aria-modal="true"
                aria-labelledby="upgrade-modal-title"
              >
                {/* Header */}
                <div className="relative bg-blue-600 p-8 text-white">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors touch-manipulation"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 id="upgrade-modal-title" className="text-2xl font-bold">
                        {defaultTitle}
                      </h2>
                    </div>
                  </div>
                  <p className="text-blue-100">{defaultDescription}</p>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {features.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-4 rounded-lg bg-gray-50 border border-blue-100 animate-fadeInUp"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                          <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Highlight */}
                  <div className="bg-gradient-to-r from-green-50 to-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm text-gray-600">Starting from</div>
                        <div className="text-3xl font-bold text-gray-900">
                          ₹2,999
                          <span className="text-lg text-gray-600">/month</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">
                          Save 25%
                        </div>
                        <div className="text-xs text-gray-600 mt-1">with yearly plan</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Unlimited tests
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Full analytics
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Expert support
                      </span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={defaultCtaLink} className="flex-1">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full bg-indigo-500 hover:bg-indigo-600"
                      >
                        {defaultCtaText}
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg" onClick={onClose} className="flex-shrink-0">
                      Maybe Later
                    </Button>
                  </div>

                  {/* Trust Signals */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-yellow-500" />
                        98% Success Rate
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        1,50,000+ Students
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FocusTrap>
          </div>
        </>
      )}
</>
)
}

/**
 * Locked Feature Card - Shows when a feature is locked
 */
interface LockedFeatureCardProps {
  title: string
  description: string
  onUpgradeClick: () => void
}

export function LockedFeatureCard({ title, description, onUpgradeClick }: LockedFeatureCardProps) {
  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="filter blur-sm pointer-events-none select-none">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg" />
        </div>
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
        <div className="text-center p-6 max-w-sm">
          <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <Button
            onClick={onUpgradeClick}
            variant="primary"
            className="bg-indigo-500 hover:bg-indigo-600"
          >
            Unlock Feature
          </Button>
        </div>
      </div>
    </div>
  )
}
