// Server Component - State-Specific Schema for Regional SEO
// Enables state-level search queries like "best NEET coaching in UP"
import Script from 'next/script'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export interface StateData {
  name: string
  slug: string
  capital: string
  majorCities: string[]
  medicalColleges: string[]
  neetSeats: number
  population: string
  educationFocus: string[]
  localLanguage: string
  nearestOfflineCenter?: string
}

export const INDIAN_STATES: Record<string, StateData> = {
  'uttar-pradesh': {
    name: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    capital: 'Lucknow',
    majorCities: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Prayagraj', 'Meerut', 'Ghaziabad', 'Noida', 'Greater Noida'],
    medicalColleges: ['KGMU Lucknow', 'BHU Varanasi', 'GSVM Kanpur', 'SN Medical Agra'],
    neetSeats: 5200,
    population: '24 crore',
    educationFocus: ['PMT Preparation', 'AIIMS Delhi proximity', 'Kota alternative'],
    localLanguage: 'Hindi',
    nearestOfflineCenter: 'Noida/South Extension Delhi',
  },
  'bihar': {
    name: 'Bihar',
    slug: 'bihar',
    capital: 'Patna',
    majorCities: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia'],
    medicalColleges: ['PMCH Patna', 'NMCH Patna', 'ANMMCH Gaya', 'DMCH Darbhanga'],
    neetSeats: 2400,
    population: '12.4 crore',
    educationFocus: ['BPSC Medical', 'AIIMS Patna', 'Medical aspirant hub'],
    localLanguage: 'Hindi',
    nearestOfflineCenter: 'Online classes / Patna visits',
  },
  'rajasthan': {
    name: 'Rajasthan',
    slug: 'rajasthan',
    capital: 'Jaipur',
    majorCities: ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Ajmer', 'Bikaner', 'Alwar'],
    medicalColleges: ['SMS Jaipur', 'AIIMS Jodhpur', 'JLN Ajmer', 'SN Jodhpur'],
    neetSeats: 3100,
    population: '8 crore',
    educationFocus: ['Kota coaching alternative', 'AIIMS Jodhpur', 'State quota seats'],
    localLanguage: 'Hindi',
    nearestOfflineCenter: 'Online classes / Jaipur visits',
  },
  'haryana': {
    name: 'Haryana',
    slug: 'haryana',
    capital: 'Chandigarh',
    majorCities: ['Gurugram', 'Faridabad', 'Rohtak', 'Karnal', 'Panipat', 'Ambala', 'Hisar', 'Sonipat'],
    medicalColleges: ['PGIMS Rohtak', 'KGMC Karnal', 'BPS GMC Khanpur Kalan', 'AIIMS Manethi'],
    neetSeats: 1800,
    population: '3 crore',
    educationFocus: ['Delhi NCR proximity', 'PGIMS Rohtak', 'Medical entrance focus'],
    localLanguage: 'Hindi',
    nearestOfflineCenter: 'South Extension Delhi / Noida',
  },
  'madhya-pradesh': {
    name: 'Madhya Pradesh',
    slug: 'madhya-pradesh',
    capital: 'Bhopal',
    majorCities: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Rewa'],
    medicalColleges: ['AIIMS Bhopal', 'Gandhi Medical Bhopal', 'MGM Indore', 'NSCB Jabalpur'],
    neetSeats: 2800,
    population: '8.5 crore',
    educationFocus: ['AIIMS Bhopal', 'Central India medical hub', 'MP PMT'],
    localLanguage: 'Hindi',
    nearestOfflineCenter: 'Online classes / Bhopal visits',
  },
  'punjab': {
    name: 'Punjab',
    slug: 'punjab',
    capital: 'Chandigarh',
    majorCities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali'],
    medicalColleges: ['GMC Patiala', 'GMC Amritsar', 'CMC Ludhiana', 'AIIMS Bathinda'],
    neetSeats: 1500,
    population: '3.1 crore',
    educationFocus: ['CMC Ludhiana', 'AIIMS Bathinda', 'State medical entrance'],
    localLanguage: 'Punjabi',
    nearestOfflineCenter: 'Online classes / Delhi visits',
  },
}

interface StateSchemaProps {
  state: StateData
  pageUrl: string
}

export function StateSchema({ state, pageUrl }: StateSchemaProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization serving this state
      {
        '@type': 'EducationalOrganization',
        '@id': `${baseUrl}/#organization`,
        name: 'Cerebrum Biology Academy',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: `Best NEET Biology Coaching for ${state.name} students. Expert AIIMS faculty, 98% success rate, online classes available for all ${state.majorCities.join(', ')} students.`,
        areaServed: {
          '@type': 'State',
          name: state.name,
          containedInPlace: {
            '@type': 'Country',
            name: 'India',
          },
        },
        knowsAbout: [
          'NEET Biology Preparation',
          'AIIMS Entrance',
          'Medical Entrance Exams',
          ...state.educationFocus,
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: CONTACT_INFO.phone.primary,
          contactType: 'admissions',
          areaServed: state.name,
          availableLanguage: ['English', 'Hindi', state.localLanguage],
        },
      },
      // Course offering for state
      {
        '@type': 'Course',
        name: `NEET Biology Coaching for ${state.name} Students`,
        description: `Comprehensive NEET Biology preparation for students from ${state.name}. Online classes available for ${state.majorCities.slice(0, 5).join(', ')} and all other cities. Target medical colleges: ${state.medicalColleges.slice(0, 3).join(', ')}.`,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
        },
        educationalLevel: 'Class 11-12, Dropper',
        teaches: ['NEET Biology', 'Botany', 'Zoology', 'Human Physiology'],
        hasCourseInstance: [
          {
            '@type': 'CourseInstance',
            name: 'Online NEET Biology Classes',
            courseMode: 'online',
            courseWorkload: 'P1Y',
            instructor: {
              '@type': 'Person',
              name: 'Dr. Shekhar C Singh',
              jobTitle: 'NEET Biology Expert',
              alumniOf: 'AIIMS New Delhi',
            },
          },
          ...(state.nearestOfflineCenter ? [{
            '@type': 'CourseInstance',
            name: `Offline Classes (${state.nearestOfflineCenter})`,
            courseMode: 'onsite',
            location: {
              '@type': 'Place',
              name: state.nearestOfflineCenter,
            },
          }] : []),
        ],
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: 48000,
          highPrice: 90000,
          offerCount: 5,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: 4.9,
          reviewCount: 850,
          bestRating: 5,
        },
      },
      // WebPage
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        name: `Best NEET Biology Coaching in ${state.name} | Cerebrum Academy`,
        description: `Top NEET Biology coaching for ${state.name} students. AIIMS faculty, 98% success rate. Online classes for ${state.majorCities.slice(0, 3).join(', ')}. ${state.neetSeats}+ medical seats in ${state.name}.`,
        url: pageUrl,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`,
        },
        about: {
          '@type': 'Thing',
          name: `NEET Coaching in ${state.name}`,
        },
        mainEntity: {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: `What is the best NEET coaching for ${state.name} students?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `Cerebrum Biology Academy is the best NEET coaching for ${state.name} students with 98% success rate. We offer online classes accessible from ${state.majorCities.slice(0, 3).join(', ')} and all other cities. Our AIIMS-trained faculty has helped thousands of ${state.name} students crack NEET.`,
              },
            },
            {
              '@type': 'Question',
              name: `How many medical seats are available in ${state.name}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `${state.name} has approximately ${state.neetSeats}+ MBBS seats across government and private medical colleges including ${state.medicalColleges.slice(0, 3).join(', ')}. Competition is high, making quality NEET coaching essential.`,
              },
            },
            {
              '@type': 'Question',
              name: `Do you offer offline classes for ${state.name} students?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: state.nearestOfflineCenter
                  ? `Yes! Our nearest offline center is at ${state.nearestOfflineCenter}. We also offer live online classes that ${state.name} students can attend from home with full interaction.`
                  : `We offer live interactive online classes for ${state.name} students. Our online platform provides the same quality as offline coaching with 24/7 doubt support.`,
              },
            },
          ],
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: baseUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'States',
              item: `${baseUrl}/states`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: `${state.name}`,
              item: pageUrl,
            },
          ],
        },
      },
    ],
  }

  return (
    <Script
      id={`state-schema-${state.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// State landing page FAQ data generator
export function generateStateFAQs(state: StateData): Array<{ question: string; answer: string }> {
  return [
    {
      question: `What is the best NEET Biology coaching in ${state.name}?`,
      answer: `Cerebrum Biology Academy is rated the best NEET Biology coaching for ${state.name} students. We offer 98% success rate, AIIMS-trained faculty led by Dr. Shekhar C Singh, and comprehensive online/offline classes. Students from ${state.majorCities.slice(0, 4).join(', ')} have achieved top ranks with our coaching.`,
    },
    {
      question: `How can students from ${state.capital} join Cerebrum Biology Academy?`,
      answer: `Students from ${state.capital} can join through: (1) Live online classes - attend from home with full interaction, (2) ${state.nearestOfflineCenter ? `Visit our ${state.nearestOfflineCenter} center, ` : ''}(3) Hybrid mode - combine online and occasional offline sessions. Book a FREE demo: ${CONTACT_INFO.phone.display.primary}`,
    },
    {
      question: `What medical colleges can ${state.name} students get into after NEET?`,
      answer: `${state.name} students can target: ${state.medicalColleges.join(', ')} (government colleges), plus private medical colleges. With ${state.neetSeats}+ MBBS seats in ${state.name} alone, good NEET preparation opens many doors.`,
    },
    {
      question: `Is online NEET coaching effective for ${state.name} students?`,
      answer: `Absolutely! Our online NEET coaching is highly effective for ${state.name} students. Features include: live interactive classes (not recorded), real-time doubt clearing, personalized mentor support, and 24/7 WhatsApp doubt resolution. Students from ${state.majorCities[0]} and ${state.majorCities[1]} have scored 680+ using our online platform.`,
    },
    {
      question: `What is the fee structure for ${state.name} students?`,
      answer: `Our fee structure for ${state.name} students: Class 11th - ₹57,000-72,000/year, Class 12th - ₹57,000-72,000/year, Dropper Batch - ₹85,000/year. EMI options available. We're 60% more affordable than Kota coaching with better results. Special scholarships for meritorious ${state.name} students.`,
    },
    {
      question: `Why choose Cerebrum over local coaching in ${state.capital}?`,
      answer: `Cerebrum offers advantages over local ${state.capital} coaching: (1) AIIMS-trained faculty (not available locally), (2) 98% success rate, (3) Small batches (15-20 students vs 100+), (4) Structured NCERT-based curriculum, (5) Mock tests matching actual NEET pattern, (6) 24/7 doubt support. Our ${state.name} toppers prove the quality.`,
    },
  ]
}

// Export state list for sitemap
export function getAllStates(): StateData[] {
  return Object.values(INDIAN_STATES)
}
