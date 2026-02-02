'use client'

import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/analytics/googleAnalytics'

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ''

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      {/* PERFORMANCE: Changed to lazyOnload for better LCP - analytics not critical for initial render */}
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
