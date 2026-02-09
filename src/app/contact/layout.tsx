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
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Cerebrum Biology Academy Delhi',
    description: 'Call +91-88264-44334, WhatsApp, visit center, get free counseling',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/contact',
  },
}

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy',
  url: 'https://cerebrumbiologyacademy.com',
  telephone: '+91-88264-44334',
  email: 'info@cerebrumbiologyacademy.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'M-3, South Extension Part 2',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    postalCode: '110049',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.5725,
    longitude: 77.2217,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-88264-44334',
    contactType: 'admissions',
    availableLanguage: ['English', 'Hindi'],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  )
}
