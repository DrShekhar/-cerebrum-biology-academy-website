'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { TrialBanner, useTrialBanner } from './TrialBanner'

export function TrialBannerWrapper() {
  const router = useRouter()
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
        window.open('https://wa.me/918826444334?text=Hi!%20I%20want%20to%20enroll.%20Please%20share%20details.', '_blank')
      }}
      onDismiss={() => {
        console.log('Trial banner dismissed')
      }}
    />
  )
}
