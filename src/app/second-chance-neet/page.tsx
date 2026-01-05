'use client'

import { SecondChanceNEETLanding } from '@/components/landing/SecondChanceNEETLanding'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { useEffect } from 'react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

export default function SecondChanceNEETPage() {
  useEffect(() => {
    // Initialize conversion tracking
    ConversionTracker.initialize()

    // Track landing page view (method is private, use trackConversion instead)
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'second-chance-landing',
      variantId: 'default',
      pageType: 'second-chance-neet',
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

  const handleWhatsAppContact = async () => {
    ConversionTracker.trackWhatsAppClick()

    // Google Ads conversion tracking for WhatsApp clicks
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/WHATSAPP_CONVERSION_LABEL',
      })
    }

    await trackAndOpenWhatsApp({
      source: 'second-chance-neet',
      message: 'Hi! I saw your Second Chance NEET program. I failed NEET 2024 and need guidance for my second attempt.',
      campaign: 'second-chance-neet',
    })
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
      <SecondChanceNEETLanding
        onFormSubmit={handleFormSubmit}
        onWhatsAppContact={handleWhatsAppContact}
        onCallNow={handleCallNow}
        onBookCounseling={handleBookCounseling}
        onDownloadStories={handleDownloadStories}
      />
    </>
  )
}
