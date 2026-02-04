'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || ''

export default function FacebookPixel() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // PERFORMANCE: Defer FB Pixel until browser is idle (after LCP)
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => setShouldLoad(true), { timeout: 6000 })
      return () => cancelIdleCallback(idleId)
    } else {
      const timerId = setTimeout(() => setShouldLoad(true), 4000)
      return () => clearTimeout(timerId)
    }
  }, [])

  if (!FB_PIXEL_ID || FB_PIXEL_ID === 'XXXXXXXXXXXXXXXXX' || !shouldLoad) {
    return null
  }

  return (
    <>
      <Script id="facebook-pixel" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');

          // Enhanced tracking for education
          fbq('trackCustom', 'EducationLanding', {
            content_category: 'Education',
            content_type: 'NEET Biology Coaching',
            content_name: document.title,
            page_type: 'landing'
          });
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
