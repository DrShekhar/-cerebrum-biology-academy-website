import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | NEET Biology Coaching Inquiry | Cerebrum Academy Delhi',
  description:
    'Contact Cerebrum Biology Academy for NEET coaching admission. Call +91-88264-44334, visit our Delhi center, or WhatsApp. Free counseling available!',
  keywords:
    'contact NEET coaching, biology coaching contact, admission inquiry, coaching center Delhi, phone number, WhatsApp contact, visit center, free counseling',
  openGraph: {
    title: 'Contact Cerebrum Biology Academy | Get Free Counseling',
    description:
      'Reach us for NEET Biology coaching admission. Phone, WhatsApp, visit our Delhi center. Free career counseling available. We respond in 1 hour!',
    images: ['/og-images/contact.jpg'],
    url: 'https://cerebrumbiologyacademy.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Cerebrum Biology Academy Delhi',
    description: 'Call +91-88264-44334, WhatsApp, visit center, get free counseling',
    images: ['/og-images/contact.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
