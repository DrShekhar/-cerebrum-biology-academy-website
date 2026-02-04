'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/analytics/googleAnalytics'

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ''

export default function GoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // PERFORMANCE: Defer GA loading until browser is idle (after LCP)
    // This removes 166KB from the critical render path
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => setShouldLoad(true), { timeout: 5000 })
      return () => cancelIdleCallback(idleId)
    } else {
      const timerId = setTimeout(() => setShouldLoad(true), 3000)
      return () => clearTimeout(timerId)
    }
  }, [])

  if (!GA_MEASUREMENT_ID || !shouldLoad) {
    return null
  }

  return (
    <>
      {/* PERFORMANCE: Deferred until after LCP via requestIdleCallback */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Google Analytics 4 configuration
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: false, // Page views handled by ga4.ts singleton to avoid duplicates
            // Enhanced ecommerce for education
            custom_map: {
              'custom_parameter_1': 'course_type',
              'custom_parameter_2': 'student_level',
              'custom_parameter_3': 'enrollment_source'
            }
          });

          // Google Ads Conversion Tracking
          ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : '// Google Ads ID not configured'}
        `}
      </Script>
    </>
  )
}
