'use client'

import { useEffect, useState } from 'react'
import {
  captureTrackingParams,
  getTrackingParams,
  getTrackingDataForAPI,
  isGoogleAdsLead,
  getLeadSource,
  type TrackingParams,
} from '@/lib/tracking/utm'

/**
 * React hook to capture and provide UTM/GCLID tracking parameters
 *
 * Usage:
 * const { trackingData, isGoogleAds, source } = useTrackingParams()
 *
 * // In form submission:
 * await fetch('/api/demo/book', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     ...formData,
 *     ...trackingData,
 *   })
 * })
 */
export function useTrackingParams() {
  const [params, setParams] = useState<TrackingParams | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Capture params on mount
    const captured = captureTrackingParams()
    setParams(captured)
    setIsLoaded(true)
  }, [])

  return {
    /** Raw tracking parameters */
    params,

    /** Whether params have been loaded */
    isLoaded,

    /** Formatted data ready for API submission */
    trackingData: isLoaded ? getTrackingDataForAPI() : {},

    /** Whether this session is from Google Ads */
    isGoogleAds: isLoaded ? isGoogleAdsLead() : false,

    /** Friendly source name for CRM */
    source: isLoaded ? getLeadSource() : 'Website',

    /** Get fresh params (useful after navigation) */
    refresh: () => {
      const fresh = getTrackingParams()
      setParams(fresh)
      return fresh
    },
  }
}

export default useTrackingParams
