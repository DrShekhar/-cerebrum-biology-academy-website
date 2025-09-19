'use client'

import { ComprehensiveContactPage } from '@/components/contact/ComprehensiveContactPage'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'

export default function ContactPage() {
  const handleCallCenter = (centerPhone: string) => {
    ConversionTracker.trackPhoneCall()
    console.log(`Calling center: ${centerPhone}`)
  }

  const handleWhatsAppContact = (message: string) => {
    ConversionTracker.trackWhatsAppClick()
    console.log(`WhatsApp message: ${message}`)
  }

  const handleEmailInquiry = async (data: any) => {
    ConversionTracker.trackLeadGeneration('contact-inquiry', data)

    try {
      const response = await fetch('/api/contact/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: 'contact-page',
        }),
      })

      if (response.ok) {
        console.log('Inquiry submitted successfully')
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error)
    }
  }

  const handleBookVisit = (centerId: string) => {
    ConversionTracker.trackEngagement('center-visit-request', { centerId })
    // Redirect to visit booking page
    window.location.href = `/book-visit?center=${centerId}`
  }

  const handleBookCounseling = () => {
    ConversionTracker.trackDemoBooking()
    // Redirect to counseling booking page
    window.location.href = '/enrollment?step=counseling'
  }

  return (
    <ComprehensiveContactPage
      onCallCenter={handleCallCenter}
      onWhatsAppContact={handleWhatsAppContact}
      onEmailInquiry={handleEmailInquiry}
      onBookVisit={handleBookVisit}
      onBookCounseling={handleBookCounseling}
    />
  )
}
