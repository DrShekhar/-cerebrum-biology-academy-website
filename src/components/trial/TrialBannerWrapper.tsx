'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { TrialBanner, useTrialBanner } from './TrialBanner'

export function TrialBannerWrapper() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [freeUserId, setFreeUserId] = useState<string | null>(null)
  const { trialStatus, isLoading: trialLoading } = useTrialBanner(freeUserId)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFreeUserId = localStorage.getItem('freeUserId')
      setFreeUserId(storedFreeUserId)
    }
  }, [])

  if (authLoading || trialLoading) {
    return null
  }

  if (isAuthenticated) {
    return null
  }

  if (!freeUserId || !trialStatus) {
    return null
  }

  return (
    <TrialBanner
      trialStatus={trialStatus}
      onUpgradeClick={() => {
        window.location.href = '/enrollment'
      }}
      onDismiss={() => {
        console.log('Trial banner dismissed')
      }}
    />
  )
}
