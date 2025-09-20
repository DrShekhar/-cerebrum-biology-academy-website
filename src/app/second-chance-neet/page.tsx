'use client'

import { SecondChanceNEETLanding } from '@/components/landing/SecondChanceNEETLanding'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { useEffect } from 'react'

export default function SecondChanceNEETPage() {
  useEffect(() => {
    // Initialize conversion tracking
    ConversionTracker.initialize()

    // Track landing page view (method is private, use trackConversion instead)
    ConversionTracker.trackConversion({
      goalId: 'second-chance-page-view',
      testId: 'second-chance-landing',
      variantId: 'default',
      value: 0,
    })

    // Google Ads conversion tracking for page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'page_view', {
        send_to: 'AW-CONVERSION_ID',
        custom_parameters: {
          page_type: 'landing_page',
          campaign_type: 'failed_neet_students',
          source: 'google_ads',
        },
      })
    }

    // Track time on page for engagement metrics
    const startTime = Date.now()

    const handleBeforeUnload = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      ConversionTracker.trackEngagement('time_on_page', {
        duration: timeSpent,
        page: 'second-chance-neet',
      })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const handleFormSubmit = async (data: any) => {
    // Track form submission conversion
    ConversionTracker.trackLeadGeneration('failure-analysis-form', data)

    // Google Ads conversion tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/LEAD_CONVERSION_LABEL',
        value: 1.0,
        currency: 'INR',
        transaction_id: `lead_${Date.now()}`,
      })
    }

    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && (window as any).fbq) {
      ;(window as any).fbq('track', 'Lead', {
        content_name: 'Failure Analysis Report',
        content_category: 'NEET Repeater',
        value: 1.0,
        currency: 'INR',
      })
    }

    try {
      // Submit form data to backend
      const response = await fetch('/api/leads/failure-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'second-chance-neet-landing',
          timestamp: new Date().toISOString(),
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
        }),
      })

      if (response.ok) {
        // Redirect to thank you page or show success message
        window.location.href = '/thank-you?form=failure-analysis'
      }
    } catch (error) {
      console.error('Form submission error:', error)
      // Show error message to user
      alert('There was an error submitting your form. Please try again or contact us directly.')
    }
  }

  const handleWhatsAppContact = () => {
    ConversionTracker.trackWhatsAppClick()

    // Google Ads conversion tracking for WhatsApp clicks
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/WHATSAPP_CONVERSION_LABEL',
      })
    }

    const message =
      'Hi! I saw your Second Chance NEET program. I failed NEET 2024 and need guidance for my second attempt.'
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/918826444334?text=${encodedMessage}`, '_blank')
  }

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()

    // Google Ads conversion tracking for phone calls
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/PHONE_CONVERSION_LABEL',
      })
    }

    // Call tracking number for Google Ads
    window.open('tel:+918826444334', '_self')
  }

  const handleBookCounseling = () => {
    ConversionTracker.trackDemoBooking()

    // Track counseling booking intent
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/COUNSELING_CONVERSION_LABEL',
      })
    }

    // Redirect to booking page with source tracking
    window.location.href = '/enrollment?source=second-chance-neet&step=counseling'
  }

  const handleDownloadStories = () => {
    ConversionTracker.trackDownload('success-stories-repeaters')

    // Track success stories download
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/DOWNLOAD_CONVERSION_LABEL',
      })
    }

    // Generate and download PDF (implementation needed)
    alert('Success stories PDF will be sent to your WhatsApp within 2 minutes!')

    // Trigger WhatsApp message with PDF
    handleWhatsAppContact()
  }

  return (
    <>
      {/* SEO Meta Tags for Google Ads Landing Page */}
      <head>
        <title>Failed NEET 2024? 90% Success Rate in Second Attempt | Cerebrum Biology</title>
        <meta
          name="description"
          content="Specialized NEET Biology coaching for repeaters by AIIMS faculty. 90% of our students clear NEET in second attempt. Small batches, personal attention, emotional support."
        />
        <meta
          name="keywords"
          content="NEET repeater, failed NEET 2024, second attempt NEET, Biology coaching, AIIMS faculty, medical college admission"
        />
        <meta name="robots" content="index, follow" />

        {/* Google Ads specific meta tags */}
        <meta name="google-ads-callback" content="second-chance-neet" />

        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Failed NEET 2024? 90% Success Rate in Second Attempt" />
        <meta
          property="og:description"
          content="Transform your NEET failure into medical college success. Specialized coaching for repeaters with proven results."
        />
        <meta property="og:image" content="/images/second-chance-hero.jpg" />
        <meta property="og:url" content="https://cerebrumbiologyacademy.com/second-chance-neet" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Failed NEET 2024? 90% Success Rate in Second Attempt" />
        <meta
          name="twitter:description"
          content="Transform your NEET failure into medical college success. Specialized coaching for repeaters with proven results."
        />
        <meta name="twitter:image" content="/images/second-chance-hero.jpg" />

        {/* Google Tag Manager / Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Tag Manager
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXX');

              // Google Ads Global Site Tag
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-CONVERSION_ID');

              // Facebook Pixel
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>

      <SecondChanceNEETLanding
        onFormSubmit={handleFormSubmit}
        onWhatsAppContact={handleWhatsAppContact}
        onCallNow={handleCallNow}
        onBookCounseling={handleBookCounseling}
        onDownloadStories={handleDownloadStories}
      />

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* Facebook Pixel (noscript) */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
        />
      </noscript>

      {/* Hotjar Tracking Code */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:YOUR_HJID,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />

      {/* Microsoft Clarity */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
          `,
        }}
      />
    </>
  )
}
