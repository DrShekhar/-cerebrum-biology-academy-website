'use client'

import { useState } from 'react'
import { getTrackingDataForAPI, isGoogleAdsLead, getLeadSource } from '@/lib/tracking/utm'

export interface DemoBookingInput {
  studentName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  courseInterest: string
  studentClass?: string
  previousKnowledge?: string
  specificTopics?: string[]
  parentName?: string
  parentPhone?: string
  hearAboutUs?: string
  message?: string
}

export interface DemoBookingResult {
  success: boolean
  message: string
  booking?: {
    id: string
    leadId: string
    meetingId?: number
    scheduledTime?: string
    joinUrl?: string
    password?: string
    assignedCounselor?: string
  }
  error?: string
}

export function useDemoBooking() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<DemoBookingResult | null>(null)

  /**
   * Book a demo class - calls the API with tracking data for Google Ads attribution
   */
  const bookDemo = async (bookingData: DemoBookingInput): Promise<DemoBookingResult> => {
    try {
      setIsLoading(true)
      setError(null)

      // Get tracking data for Google Ads and UTM attribution
      const trackingData = getTrackingDataForAPI()
      const source = getLeadSource()

      // Combine form data with tracking data
      const payload = {
        ...bookingData,
        ...trackingData,
        source,
      }

      const response = await fetch('/api/demo/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book demo')
      }

      const bookingResult: DemoBookingResult = {
        success: true,
        message: data.message || 'Demo booked successfully!',
        booking: data.booking,
      }

      setResult(bookingResult)
      return bookingResult
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to book demo'
      setError(errorMessage)
      const errorResult: DemoBookingResult = {
        success: false,
        message: errorMessage,
        error: errorMessage,
      }
      setResult(errorResult)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Check if current session is from Google Ads
   */
  const checkIsGoogleAds = () => {
    return isGoogleAdsLead()
  }

  /**
   * Get the lead source (Google Ads, Facebook, etc.)
   */
  const getCurrentSource = () => {
    return getLeadSource()
  }

  /**
   * Reset the hook state
   */
  const reset = () => {
    setError(null)
    setResult(null)
  }

  return {
    isLoading,
    error,
    result,
    bookDemo,
    checkIsGoogleAds,
    getCurrentSource,
    reset,
  }
}
