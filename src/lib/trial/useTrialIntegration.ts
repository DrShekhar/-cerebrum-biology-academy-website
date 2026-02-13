'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { TrialStatus } from './trialManager'
import { trackTrialEvent, TrialEvents } from './analytics'

export function useTrialIntegration(isAuthenticated: boolean) {
  const router = useRouter()
  const [freeUserId, setFreeUserId] = useState<string | null>(null)
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showTrialExpiredModal, setShowTrialExpiredModal] = useState(false)
  // Track consecutive errors to implement backoff and stop polling on persistent 404
  const errorCountRef = useRef(0)
  const pollingDisabledRef = useRef(false)

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
    // Don't poll if disabled due to persistent errors
    if (!freeUserId || isAuthenticated || pollingDisabledRef.current) return

    try {
      const response = await fetch(`/api/trial/status?freeUserId=${freeUserId}`)
      if (response.ok) {
        const data = await response.json()
        setTrialStatus(data.trialStatus)
        errorCountRef.current = 0 // Reset error count on success

        if (data.trialStatus.isExpired && !localStorage.getItem('trial-expired-shown')) {
          setShowTrialExpiredModal(true)
          localStorage.setItem('trial-expired-shown', 'true')
          await trackTrialEvent({
            eventName: TrialEvents.MODAL_OPENED,
            freeUserId,
            properties: { reason: 'expired' },
          })
        }
      } else if (response.status === 404) {
        // Trial not found - likely invalid freeUserId, stop polling
        errorCountRef.current++
        if (errorCountRef.current >= 3) {
          console.log('[useTrialIntegration] Trial not found after 3 attempts, stopping polling')
          pollingDisabledRef.current = true
          // Clear invalid freeUserId from localStorage
          localStorage.removeItem('freeUserId')
          setFreeUserId(null)
        }
      }
    } catch (error) {
      console.error('Failed to fetch trial status:', error)
      errorCountRef.current++
      // After 5 consecutive errors, disable polling
      if (errorCountRef.current >= 5) {
        console.log('[useTrialIntegration] Too many errors, disabling polling')
        pollingDisabledRef.current = true
      }
    }
  }, [freeUserId, isAuthenticated])

  useEffect(() => {
    initializeGuestUser()
  }, [initializeGuestUser])

  // Store fetchTrialStatus in a ref to avoid dependency issues
  const fetchTrialStatusRef = useRef(fetchTrialStatus)
  fetchTrialStatusRef.current = fetchTrialStatus

  useEffect(() => {
    if (freeUserId && !isAuthenticated && !pollingDisabledRef.current) {
      // Initial fetch
      fetchTrialStatusRef.current()

      // Poll every 60 seconds - use ref to avoid recreating interval
      const interval = setInterval(() => {
        if (!pollingDisabledRef.current) {
          fetchTrialStatusRef.current()
        }
      }, 60000)

      return () => clearInterval(interval)
    }
  }, [freeUserId, isAuthenticated]) // Remove fetchTrialStatus from deps

  const handleUpgrade = useCallback(() => {
    if (freeUserId) {
      trackTrialEvent({
        eventName: TrialEvents.UPGRADE_CTA_CLICKED,
        freeUserId,
        properties: { source: 'modal' },
      })
    }
    router.push('/pricing')
  }, [freeUserId, router])

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
