'use client'

import { StreamlinedEnrollmentPage } from '@/components/enrollment/StreamlinedEnrollmentPage'

export default function EnrollmentPage() {
  const handleEnrollmentComplete = (data: any) => {
    // Track successful enrollment
    // Tracking removed for MVP simplification

    // You can add additional tracking or API calls here
    console.log('Enrollment completed:', data)

    // Send enrollment data to backend/CRM
    // await submitEnrollment(data)
  }

  const handleWhatsAppContact = () => {
    // Tracking removed for MVP simplification
    const message = 'Hi! I need help with the enrollment process. Can you assist me?'
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/918826444334?text=${encodedMessage}`, '_blank')
  }

  const handleCallNow = () => {
    // Tracking removed for MVP simplification
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
