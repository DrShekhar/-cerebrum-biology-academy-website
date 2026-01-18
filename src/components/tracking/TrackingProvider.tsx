'use client'

import { useEffect, createContext, useContext, ReactNode, useState } from 'react'
import {
  captureTrackingParams,
  getTrackingDataForAPI,
  isGoogleAdsLead,
  getLeadSource,
  type TrackingParams,
} from '@/lib/tracking/utm'

interface TrackingContextType {
  params: TrackingParams | null
  isLoaded: boolean
  trackingData: ReturnType<typeof getTrackingDataForAPI>
  isGoogleAds: boolean
  source: string
}

const TrackingContext = createContext<TrackingContextType>({
  params: null,
  isLoaded: false,
  trackingData: { source: 'Website' },
  isGoogleAds: false,
  source: 'Website',
})

export function useTracking() {
  return useContext(TrackingContext)
}

interface TrackingProviderProps {
  children: ReactNode
}

/**
 * TrackingProvider - Captures UTM parameters and GCLID from URL on app load
 *
 * Wrap your app with this provider in layout.tsx:
 *
 * ```tsx
 * import { TrackingProvider } from '@/components/tracking/TrackingProvider'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <TrackingProvider>
 *           {children}
 *         </TrackingProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 *
 * Then in forms:
 *
 * ```tsx
 * import { useTracking } from '@/components/tracking/TrackingProvider'
 *
 * function MyForm() {
 *   const { trackingData, isGoogleAds, source } = useTracking()
 *
 *   const handleSubmit = async (formData) => {
 *     await fetch('/api/leads', {
 *       method: 'POST',
 *       body: JSON.stringify({
 *         ...formData,
 *         ...trackingData, // Includes utmSource, utmMedium, gclid, etc.
 *       })
 *     })
 *   }
 * }
 * ```
 */
export function TrackingProvider({ children }: TrackingProviderProps) {
  const [params, setParams] = useState<TrackingParams | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const captured = captureTrackingParams()
    setParams(captured)
    setIsLoaded(true)

    // Log for debugging in development
    if (process.env.NODE_ENV === 'development' && captured.gclid) {
      console.log('[Tracking] Google Ads click detected:', {
        gclid: captured.gclid,
        source: captured.source,
        campaign: captured.utmCampaign,
      })
    }
  }, [])

  const value: TrackingContextType = {
    params,
    isLoaded,
    trackingData: isLoaded ? getTrackingDataForAPI() : { source: 'Website' },
    isGoogleAds: isLoaded ? isGoogleAdsLead() : false,
    source: isLoaded ? getLeadSource() : 'Website',
  }

  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>
}

export default TrackingProvider
