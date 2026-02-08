import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface ServiceSchemaProps {
  locationName: string
  services: string[]
}

const DEFAULT_SERVICES_BY_CENTER: Record<string, string[]> = {
  'south-extension': [
    'NEET Biology Coaching in South Extension',
    'Best Biology Teacher in South Delhi',
    'NEET Online Classes South Delhi',
    'Biology Tuition Near South Extension',
    'NEET Coaching Institute South Delhi',
    'NEET Biology Coaching in Greater Kailash',
    'Best Biology Teacher in Defence Colony',
    'NEET Biology Coaching in Lajpat Nagar',
    'Biology Tuition Near Saket',
    'NEET Coaching Institute Malviya Nagar',
    'NEET Biology Coaching in Hauz Khas',
    'Biology Tuition Near Safdarjung',
    'NEET Biology Coaching in Gulmohar Park',
    'NEET Dropper Batch South Delhi',
    'NEET Biology Classes Near AIIMS',
  ],
  rohini: [
    'NEET Biology Coaching in Rohini',
    'Best Biology Teacher in North Delhi',
    'NEET Online Classes Rohini',
    'Biology Tuition Near Rohini',
    'NEET Coaching Institute Rohini',
    'NEET Biology Coaching in Pitampura',
    'Best Biology Teacher in Shalimar Bagh',
    'NEET Biology Coaching in Ashok Vihar',
    'Biology Tuition Near Paschim Vihar',
    'NEET Coaching Institute Rajouri Garden',
    'NEET Biology Coaching in Punjabi Bagh',
    'Biology Tuition Near Netaji Subhash Place',
    'NEET Biology Classes Near DC Chauk',
    'NEET Dropper Batch North Delhi',
    'NEET Biology Coaching in Prashant Vihar',
  ],
  'green-park': [
    'NEET Biology Coaching in Green Park',
    'Best Biology Teacher in Green Park',
    'NEET Online Classes Green Park',
    'Biology Tuition Near Green Park',
    'NEET Coaching Institute Green Park',
    'NEET Biology Coaching in Hauz Khas',
    'Best Biology Teacher in South Delhi',
    'NEET Biology Coaching in Noida',
    'Biology Tuition Near Greater Noida',
    'NEET Coaching Institute Ghaziabad',
    'NEET Biology Coaching in Gulmohar Park',
    'Biology Tuition Near Panchsheel Park',
    'NEET Biology Coaching in Jor Bagh',
    'NEET Biology Classes Near Kalu Sarai',
    'NEET Dropper Batch Green Park Delhi',
    'NEET Biology Coaching in New Moti Bagh',
  ],
  gurugram: [
    'NEET Biology Coaching in Gurugram',
    'Best Biology Teacher in Gurgaon',
    'NEET Online Classes Gurugram',
    'Biology Tuition Near Gurugram',
    'NEET Coaching Institute Gurugram',
    'NEET Biology Coaching in DLF Phase 1',
    'Best Biology Teacher in Golf Course Road',
    'NEET Biology Coaching in Sushant Lok',
    'Biology Tuition Near Sector 14 Gurugram',
    'NEET Coaching Institute Sector 51 Gurugram',
    'NEET Biology Coaching in Sector 56 Gurugram',
    'Biology Tuition Near South City Gurugram',
    'NEET Biology Coaching in Sohna Road',
    'NEET Biology Classes Near Manesar',
    'NEET Dropper Batch Gurugram',
    'NEET Biology Coaching in New Gurugram',
  ],
  faridabad: [
    'NEET Biology Coaching in Faridabad',
    'Best Biology Teacher in Faridabad',
    'NEET Online Classes Faridabad',
    'Biology Tuition Near Faridabad',
    'NEET Coaching Institute Faridabad',
    'NEET Biology Coaching in NIT Faridabad',
    'Best Biology Teacher in Ballabgarh',
    'NEET Biology Coaching in Old Faridabad',
    'Biology Tuition Near Greater Faridabad',
    'NEET Coaching Institute Palwal',
    'NEET Biology Coaching in Sector 15-21 Faridabad',
    'Biology Tuition Near BPTP Parklands',
    'NEET Dropper Batch Faridabad',
    'NEET Biology Classes Near Bata Chowk',
    'NEET Biology Coaching Near Faridabad Metro',
  ],
}

export function ServiceSchema({ locationName, services }: ServiceSchemaProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/locations/${locationName}#services`,
    name: `Cerebrum Biology Academy - ${locationName.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}`,
    url: `${baseUrl}/locations/${locationName}`,
    telephone: CONTACT_INFO.phone.primary,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Coaching Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy',
          },
        },
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  )
}

export function AllServicesSchema() {
  return (
    <>
      {Object.entries(DEFAULT_SERVICES_BY_CENTER).map(([locationName, services]) => (
        <ServiceSchema key={locationName} locationName={locationName} services={services} />
      ))}
    </>
  )
}

export { DEFAULT_SERVICES_BY_CENTER }
