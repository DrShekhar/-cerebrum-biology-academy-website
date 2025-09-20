'use client'

import { StreamlinedEnrollmentPage } from '@/components/enrollment/StreamlinedEnrollmentPage'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'

export default function EnrollmentPage() {
  const handleEnrollmentComplete = (data: any) => {
    // Track successful enrollment
    ConversionTracker.trackEnrollment()

    // You can add additional tracking or API calls here
    console.log('Enrollment completed:', data)

    // Send enrollment data to backend/CRM
    // await submitEnrollment(data)
  }

  const handleWhatsAppContact = () => {
    ConversionTracker.trackWhatsAppClick()
    const message = 'Hi! I need help with the enrollment process. Can you assist me?'
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/918826444334?text=${encodedMessage}`, '_blank')
  }

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    window.open('tel:+918826444334', '_self')
  }

  return (
    <StreamlinedEnrollmentPage
      onEnrollmentComplete={handleEnrollmentComplete}
      onWhatsAppContact={handleWhatsAppContact}
      onCallNow={handleCallNow}
    />
  )
}
