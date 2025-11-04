'use client'

import { useState, useEffect, useCallback } from 'react'
import { TrialStatus } from './trialManager'
import { trackTrialEvent, TrialEvents } from './analytics'

export function useTrialIntegration(isAuthenticated: boolean) {
  const [freeUserId, setFreeUserId] = useState<string | null>(null)
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showTrialExpiredModal, setShowTrialExpiredModal] = useState(false)

  const initializeGuestUser = useCallback(async () => {
    if (isAuthenticated) {
      setIsLoading(false)
      return
    }

    let storedFreeUserId = localStorage.getItem('freeUserId')

    if (!storedFreeUserId) {
      try {
        const deviceId = `device_${Date.now()}_${Math.random().toString(36).substring(7)}`

        const response = await fetch('/api/auth/guest/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deviceId }),
        })

        if (response.ok) {
          const data = await response.json()
          storedFreeUserId = data.freeUserId
          localStorage.setItem('freeUserId', storedFreeUserId)
          localStorage.setItem('trialExpiry', data.trialStatus.expiryDate)
          setTrialStatus(data.trialStatus)
        }
      } catch (error) {
        console.error('Failed to create guest user:', error)
      }
    }

    setFreeUserId(storedFreeUserId)
    setIsLoading(false)
  }, [isAuthenticated])

  const fetchTrialStatus = useCallback(async () => {
    if (!freeUserId || isAuthenticated) return

    try {
      const response = await fetch(`/api/trial/status?freeUserId=${freeUserId}`)
      if (response.ok) {
        const data = await response.json()
        setTrialStatus(data.trialStatus)

        if (data.trialStatus.isExpired && !localStorage.getItem('trial-expired-shown')) {
          setShowTrialExpiredModal(true)
          localStorage.setItem('trial-expired-shown', 'true')
          await trackTrialEvent({
            eventName: TrialEvents.MODAL_OPENED,
            freeUserId,
            properties: { reason: 'expired' },
          })
        }
      }
    } catch (error) {
      console.error('Failed to fetch trial status:', error)
    }
  }, [freeUserId, isAuthenticated])

  useEffect(() => {
    initializeGuestUser()
  }, [initializeGuestUser])

  useEffect(() => {
    if (freeUserId && !isAuthenticated) {
      fetchTrialStatus()

      const interval = setInterval(fetchTrialStatus, 60000)

      return () => clearInterval(interval)
    }
  }, [freeUserId, isAuthenticated, fetchTrialStatus])

  const handleUpgrade = useCallback(() => {
    if (freeUserId) {
      trackTrialEvent({
        eventName: TrialEvents.UPGRADE_CTA_CLICKED,
        freeUserId,
        properties: { source: 'modal' },
      })
    }
    window.location.href = '/pricing'
  }, [freeUserId])

  const handleModalClose = useCallback(() => {
    setShowTrialExpiredModal(false)
    if (freeUserId) {
      trackTrialEvent({
        eventName: TrialEvents.MODAL_CLOSED,
        freeUserId,
      })
    }
  }, [freeUserId])

  return {
    freeUserId,
    trialStatus,
    isLoading,
    showTrialExpiredModal,
    setShowTrialExpiredModal,
    handleUpgrade,
    handleModalClose,
    refreshTrialStatus: fetchTrialStatus,
  }
}
