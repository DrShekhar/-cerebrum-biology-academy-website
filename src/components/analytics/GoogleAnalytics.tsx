'use client'

import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/analytics/googleAnalytics'

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            // Enhanced ecommerce for education
            custom_map: {
              'custom_parameter_1': 'course_type',
              'custom_parameter_2': 'student_level',
              'custom_parameter_3': 'enrollment_source'
            }
          });
        `}
      </Script>
    </>
  )
}
