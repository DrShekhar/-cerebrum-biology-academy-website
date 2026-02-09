// Server Component - no client-side interactivity needed
import Script from 'next/script'
import { MapPin, Phone, Clock, Mail, ExternalLink } from 'lucide-react'
import { CONTACT_INFO, getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'

interface ConsistentNAPProps {
  variant?: 'full' | 'compact' | 'schema-only'
  className?: string
}

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const BUSINESS_INFO = {
  name: 'Cerebrum Biology Academy',
  legalName: 'Cerebrum Biology Academy',
  phone: CONTACT_INFO.phone.formatted.primary,
  email: 'info@cerebrumbiologyacademy.com',
  address: {
    streetAddress: 'Block D, South Extension Part 2',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    postalCode: '110049',
    addressCountry: 'IN',
  },
  centers: [
    {
      name: 'Cerebrum Biology Academy - Rohini',
      address: '211 Vikas Surya Tower, DC Chauk, Rohini Sector 9, Delhi - 110085',
      phone: CONTACT_INFO.phone.formatted.primary,
      geo: { lat: '28.7143', lng: '77.1117' },
    },
    {
      name: 'Cerebrum Biology Academy - Gurugram',
      address: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram - 122018',
      phone: CONTACT_INFO.phone.formatted.primary,
      geo: { lat: '28.4153', lng: '77.0499' },
    },
    {
      name: 'Cerebrum Biology Academy - Green Park',
      address: 'B 113 FF Gulmohar Park, Green Park, New Delhi - 110049',
      phone: CONTACT_INFO.phone.formatted.primary,
      geo: { lat: '28.5597', lng: '77.2089' },
    },
    {
      name: 'Cerebrum Biology Academy - South Extension',
      address: 'Block D, South Extension Part 2, New Delhi - 110049',
      phone: CONTACT_INFO.phone.formatted.primary,
      geo: { lat: '28.5725', lng: '77.2217' },
    },
    {
      name: 'Cerebrum Biology Academy - Faridabad',
      address: 'Sector 17, Faridabad - 121002',
      phone: CONTACT_INFO.phone.formatted.primary,
      geo: { lat: '28.3870', lng: '77.3070' },
    },
    {
      name: 'Cerebrum Biology Academy - Noida',
      address: 'B-45, Sector 62, Noida - 201301',
      phone: CONTACT_INFO.phone.formatted.primary,
      geo: { lat: '28.6280', lng: '77.3649' },
    },
  ],
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  sameAs: [
    'https://www.facebook.com/cerebrumbiologyacademy',
    'https://www.instagram.com/cerebrumbiologyacademy',
    'https://www.youtube.com/@cerebrumbiologyacademy',
    'https://www.youtube.com/@drshekharcsingh',
    'https://www.linkedin.com/company/cerebrum-biology-academy',
    'https://g.co/kgs/cerebrum-biology-academy',
  ],
}

export function ConsistentNAP({ variant = 'full', className = '' }: ConsistentNAPProps) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    url: BASE_URL,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS_INFO.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.5678',
      longitude: '77.2234',
    },
    openingHoursSpecification: BUSINESS_INFO.openingHours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    sameAs: BUSINESS_INFO.sameAs,
    areaServed: [
      'South Extension',
      'South Delhi',
      'Greater Kailash',
      'Defence Colony',
      'Lajpat Nagar',
      'Rohini',
      'Pitampura',
      'Shalimar Bagh',
      'North Delhi',
      'Green Park',
      'Hauz Khas',
      'Gulmohar Park',
      'Gurugram',
      'DLF Phase 1',
      'Sushant Lok',
      'Faridabad',
      'Ballabgarh',
      'NIT Faridabad',
    ].map((area) => ({ '@type': 'City' as const, name: area })),
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Bank Transfer, EMI',
    image: `${BASE_URL}/og-image.jpg`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '127',
      reviewCount: '127',
    },
  }

  if (variant === 'schema-only') {
    return (
      <Script
        id="consistent-nap-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    )
  }

  if (variant === 'compact') {
    return (
      <>
        <Script
          id="consistent-nap-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <div
          className={`flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 ${className}`}
        >
          <a href={getPhoneLink()} className="flex items-center gap-1 hover:text-blue-600">
            <Phone className="h-4 w-4" />
            {getDisplayPhone()}
          </a>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Open 24/7
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            South Delhi
          </span>
        </div>
      </>
    )
  }

  return (
    <>
      <Script
        id="consistent-nap-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div className={`rounded-xl bg-white p-6 shadow-lg ${className}`}>
        <h3 className="mb-4 text-lg font-bold text-gray-900">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">{BUSINESS_INFO.name}</p>
              <p className="text-sm text-gray-600">
                {BUSINESS_INFO.address.streetAddress}, {BUSINESS_INFO.address.addressLocality}
              </p>
              <p className="text-sm text-gray-600">
                {BUSINESS_INFO.address.addressRegion} - {BUSINESS_INFO.address.postalCode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 flex-shrink-0 text-green-600" />
            <a href={getPhoneLink()} className="font-medium text-blue-600 hover:underline">
              {BUSINESS_INFO.phone}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 flex-shrink-0 text-green-600" />
            <a href={`mailto:${BUSINESS_INFO.email}`} className="text-blue-600 hover:underline">
              {BUSINESS_INFO.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 flex-shrink-0 text-green-600" />
            <span className="text-gray-700">Open 24/7</span>
          </div>
        </div>

        {/* Social Links for AI Entity Verification */}
        <div className="mt-4 border-t pt-4">
          <p className="mb-2 text-xs text-gray-500">Find us on:</p>
          <div className="flex gap-3">
            {BUSINESS_INFO.sameAs.map((url, index) => {
              const platform = url.includes('facebook')
                ? 'Facebook'
                : url.includes('instagram')
                  ? 'Instagram'
                  : url.includes('youtube')
                    ? 'YouTube'
                    : url.includes('linkedin')
                      ? 'LinkedIn'
                      : 'Google'
              return (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600"
                >
                  {platform}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ConsistentNAP
