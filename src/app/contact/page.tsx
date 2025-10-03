'use client'

import { ComprehensiveContactPage } from '@/components/contact/ComprehensiveContactPage'

export default function ContactPage() {
  const handleCallCenter = (centerPhone: string) => {
    console.log(`Calling center: ${centerPhone}`)
  }

  const handleWhatsAppContact = (message: string) => {
    console.log(`WhatsApp message: ${message}`)
  }

  const handleEmailInquiry = async (data: any) => {

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
    // Redirect to visit booking page
    window.location.href = `/book-visit?center=${centerId}`
  }

  const handleBookCounseling = () => {
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
