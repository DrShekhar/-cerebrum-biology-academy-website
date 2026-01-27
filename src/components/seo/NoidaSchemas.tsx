import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { DrShekharSinghSchema } from './StructuredData'

// Enhanced FAQ data for Noida - covers all critical topics for AEO
export const NOIDA_COMPREHENSIVE_FAQS = {
  fee: [
    {
      question: 'What is the fee for NEET coaching in Noida?',
      answer:
        'NEET Biology coaching fees in Noida: Pursuit batch (30-40 students) - Rs 48,000-70,000/year, Ascent batch (16-18 students) - Rs 76,000-90,000/year, Pinnacle batch (10-12 students) - Rs 98,000-1,56,000/year. All include AIIMS faculty, study material, and online access.',
    },
    {
      question: 'Is EMI available for NEET coaching fees in Noida?',
      answer:
        'Yes! We offer flexible EMI options for all Noida students. Pay in 3, 6, or 12 monthly installments with 0% interest. No-cost EMI available for fees above Rs 50,000. Contact us on WhatsApp for instant EMI approval.',
    },
    {
      question: 'Which is the most affordable NEET coaching in Noida?',
      answer:
        'Cerebrum Biology Academy offers the best value NEET coaching in Noida starting at Rs 48,000/year with AIIMS faculty. Compare this to Allen/Aakash (Rs 1.5-2 lakh) - we offer 98% success rate at 1/3rd the cost.',
    },
  ],
  results: [
    {
      question: 'What is the success rate of NEET coaching in Noida?',
      answer:
        'Cerebrum Biology Academy has a 98% success rate in Noida. In NEET 2025, 47 students scored 650+, 23 students got AIIMS/JIPMER, and 156 students secured government medical college seats. Our Noida toppers include Priya Sharma (698) and Rahul Verma (685).',
    },
    {
      question: 'How many students from Noida got AIIMS selection?',
      answer:
        '23 students from Noida/Greater Noida got AIIMS selection in 2025. Since 2014, 500+ Cerebrum students have been selected to AIIMS across India. Our AIIMS selection rate is 15% - highest among Noida coaching institutes.',
    },
    {
      question: 'What is the average NEET score of Cerebrum Noida students?',
      answer:
        'Average NEET Biology score of Cerebrum Noida students is 340/360 (94%). Overall average NEET score is 620+. 78% of our students score above 600, and 45% score above 650 in NEET.',
    },
  ],
  dropper: [
    {
      question: 'Is there NEET dropper batch in Noida?',
      answer:
        'Yes! We have dedicated NEET dropper batches in Noida with intensive 10-12 hours/week coaching. Dropper batch fee: Rs 75,000-98,000. Special focus on weak areas, daily tests, and 1-on-1 mentorship. Average score improvement: 150+ marks.',
    },
    {
      question: 'Can droppers join NEET coaching mid-year in Noida?',
      answer:
        'Yes, droppers can join anytime. We have rolling admissions for dropper batches. Late joiners get recorded lectures of missed classes + extra doubt sessions to catch up. No additional fee for catch-up support.',
    },
  ],
  foundation: [
    {
      question: 'Is there NEET foundation course for Class 9-10 in Noida?',
      answer:
        'Yes! NEET Foundation course for Class 9-10 students in Noida: Rs 24,000-36,000/year. Covers basic Biology concepts, NCERT fundamentals, and early NEET preparation. 4 hours/week classes with fun learning approach.',
    },
  ],
  online: [
    {
      question: 'Is online NEET coaching available for Noida students?',
      answer:
        'Yes! 70% of our Noida students prefer online mode. Live Zoom classes, recorded lectures, WhatsApp doubt support 7am-11pm, AI-powered study tools, and weekly live tests. Same fee as offline - Rs 48,000-98,000/year.',
    },
    {
      question: 'Can I switch between online and offline mode?',
      answer:
        'Yes! Noida students can switch between online and offline modes anytime. Hybrid option available: attend online on weekdays, offline at South Extension on weekends. No extra fee for mode switching.',
    },
  ],
  faculty: [
    {
      question: 'Who is the faculty for NEET Biology in Noida?',
      answer:
        'Lead faculty Dr. Shekhar C Singh - AIIMS New Delhi alumnus, 15+ years experience, former Narayana Academic Head. Has mentored 2,000+ students with 500+ AIIMS/JIPMER selections. All faculty from AIIMS/premier medical colleges.',
    },
  ],
  comparison: [
    {
      question: 'Is Cerebrum better than Allen/Aakash for NEET in Noida?',
      answer:
        'Cerebrum offers: (1) Smaller batches (10-40 vs 100+ students), (2) AIIMS faculty vs mixed faculty, (3) 98% success rate, (4) 1/3rd fee of Allen/Aakash, (5) Personal mentorship. 850+ students switched from Allen/Aakash to Cerebrum.',
    },
    {
      question: 'Should I go to Kota or stay in Noida for NEET?',
      answer:
        'Stay in Noida! With online coaching, you get Kota-quality teaching without leaving home. Benefits: (1) No hostel expenses (save Rs 1-2 lakh), (2) Home food & comfort, (3) Same syllabus & faculty quality, (4) Parents can monitor progress.',
    },
  ],
  studyMaterial: [
    {
      question: 'What study material is provided for NEET in Noida?',
      answer:
        'Comprehensive material included: NCERT-based notes (500+ pages), 10,000+ MCQs with solutions, chapter-wise tests, 50+ full-length mock tests, previous 10 years papers, AI doubt-solving app, and video lectures library.',
    },
  ],
  voice: [
    {
      question: 'Where is the best NEET coaching center in Noida?',
      answer:
        'Cerebrum Biology Academy is the best NEET coaching in Noida with 98% success rate. Online classes available for all Noida sectors. Offline center at South Extension, Delhi - 30-45 min from Noida via metro.',
    },
    {
      question: 'How much does NEET coaching cost in Noida?',
      answer:
        'NEET coaching in Noida costs Rs 48,000 to Rs 1,56,000 per year depending on batch size. Cerebrum offers: Pursuit (Rs 48,000), Ascent (Rs 76,000), Pinnacle (Rs 98,000). EMI available.',
    },
    {
      question: 'Can I prepare for NEET online from Noida?',
      answer:
        'Yes! Online NEET preparation from Noida is highly effective. Cerebrum offers live classes, doubt support, and mock tests online. 70% of our 1,200+ Noida students study online. Same results as offline coaching.',
    },
  ],
}

// Get all FAQs flattened
export function getAllNoidaFAQs(
  locationName: string = 'Noida'
): Array<{ question: string; answer: string }> {
  const allFAQs: Array<{ question: string; answer: string }> = []
  Object.values(NOIDA_COMPREHENSIVE_FAQS).forEach((category) => {
    category.forEach((faq) => {
      allFAQs.push({
        question: faq.question.replace(/Noida/g, locationName),
        answer: faq.answer.replace(/Noida/g, locationName),
      })
    })
  })
  return allFAQs
}

interface NoidaLocalBusinessSchemaProps {
  area?: string
  sector?: string
  society?: string
  coordinates?: { lat: string; lng: string }
}

export function NoidaLocalBusinessSchema({
  area = 'Noida',
  sector,
  society,
  coordinates = { lat: '28.5355', lng: '77.3910' },
}: NoidaLocalBusinessSchemaProps) {
  const locationName = society || (sector ? `Sector ${sector}` : area)
  const fullArea = society ? `${society}, ${area}` : sector ? `Sector ${sector}, ${area}` : area

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `https://cerebrumbiologyacademy.com/#noida-${locationName.toLowerCase().replace(/\s+/g, '-')}`,
    name: `Cerebrum Biology Academy - ${fullArea}`,
    alternateName: [
      `NEET Coaching ${fullArea}`,
      `Biology Tuition ${fullArea}`,
      `Best NEET Coaching ${locationName}`,
    ],
    description: `Premier NEET Biology coaching in ${fullArea} with AIIMS faculty. 98% success rate, small batches, online & offline classes. Serving students from ${locationName} and nearby areas.`,
    url: 'https://cerebrumbiologyacademy.com',
    telephone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.info,
    image: 'https://cerebrumbiologyacademy.com/og-image.jpg',
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    priceRange: '₹48,000 - ₹1,56,000',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Bank Transfer, EMI',
    address: {
      '@type': 'PostalAddress',
      streetAddress: sector ? `Sector ${sector}` : 'Gaur City',
      addressLocality: area.includes('Greater Noida') ? 'Greater Noida' : 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Noida',
        containedIn: { '@type': 'State', name: 'Uttar Pradesh' },
      },
      {
        '@type': 'City',
        name: 'Greater Noida',
        containedIn: { '@type': 'State', name: 'Uttar Pradesh' },
      },
      {
        '@type': 'City',
        name: 'Greater Noida West',
        alternateName: 'Noida Extension',
        containedIn: { '@type': 'State', name: 'Uttar Pradesh' },
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1200',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Priya Sharma' },
        datePublished: '2025-01-10',
        reviewBody: `Best NEET Biology coaching in ${fullArea}. Dr. Shekhar's teaching helped me score 680+ in NEET!`,
      },
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Rahul Verma' },
        datePublished: '2025-01-05',
        reviewBody: `Joined online classes from ${locationName}. Small batch size and personal attention made all the difference.`,
      },
    ],
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://g.page/cerebrumbiologyacademy',
    ],
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'Founder & Lead Faculty',
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'AIIMS New Delhi' },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `NEET Biology Courses - ${fullArea}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Pursuit - Class 11 NEET',
            description: '30-40 students batch, 6 hrs/week, AIIMS faculty',
          },
          price: '48000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Ascent - Class 11/12 NEET',
            description: '16-18 students batch, 8 hrs/week, weekly doubt sessions',
          },
          price: '76000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Pinnacle - Premium NEET',
            description: '10-12 students batch, 10-12 hrs/week, 1-on-1 mentorship',
          },
          price: '98000',
          priceCurrency: 'INR',
        },
      ],
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO.phone.primary,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '07:00',
          closes: '21:00',
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO.phone.whatsapp || CONTACT_INFO.phone.primary,
        contactType: 'sales',
        contactOption: 'TollFree',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
        description: 'WhatsApp for instant query resolution and demo booking',
      },
    ],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://cerebrumbiologyacademy.com/demo-booking',
      },
      result: { '@type': 'Reservation', name: 'Book Free Demo Class' },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface NoidaFAQSchemaProps {
  area?: string
  sector?: string
  society?: string
  customFAQs?: Array<{ question: string; answer: string }>
}

export function NoidaFAQSchema({
  area = 'Noida',
  sector,
  society,
  customFAQs = [],
}: NoidaFAQSchemaProps) {
  const locationName = society || (sector ? `Sector ${sector}, ${area}` : area)

  // Use comprehensive FAQs covering all critical topics
  const defaultFAQs = [
    // Fee FAQs
    ...NOIDA_COMPREHENSIVE_FAQS.fee.map((faq) => ({
      question: faq.question.replace(/Noida/g, locationName),
      answer: faq.answer.replace(/Noida/g, locationName),
    })),
    // Results FAQs
    ...NOIDA_COMPREHENSIVE_FAQS.results.slice(0, 2).map((faq) => ({
      question: faq.question.replace(/Noida/g, locationName),
      answer: faq.answer.replace(/Noida/g, locationName),
    })),
    // Dropper FAQ
    {
      question: `Is there NEET dropper batch in ${locationName}?`,
      answer: `Yes! We have dedicated NEET dropper batches for ${locationName} students with intensive 10-12 hours/week coaching. Dropper batch fee: Rs 75,000-98,000. Special focus on weak areas, daily tests, and 1-on-1 mentorship. Average score improvement: 150+ marks.`,
    },
    // Online FAQ
    {
      question: `Is online NEET coaching available for students in ${locationName}?`,
      answer: `Yes! 70% of our ${locationName} students prefer online mode. Live Zoom classes, recorded lectures, WhatsApp doubt support 7am-11pm, AI-powered study tools, and weekly live tests. Same fee as offline - Rs 48,000-98,000/year.`,
    },
    // Faculty FAQ
    {
      question: `Who is the faculty for NEET Biology coaching in ${locationName}?`,
      answer: `Lead faculty Dr. Shekhar C Singh - AIIMS New Delhi alumnus, 15+ years experience, former Narayana Academic Head. Has mentored 2,000+ students with 500+ AIIMS/JIPMER selections. All faculty from AIIMS/premier medical colleges.`,
    },
    // Demo FAQ
    {
      question: `Do you offer a free demo class for students in ${locationName}?`,
      answer: `Yes! FREE demo class for all ${locationName} students. Experience our teaching, meet AIIMS faculty, see our 98% success rate methodology. Book via WhatsApp at ${CONTACT_INFO.phone.display.primary} or through our website. No obligation to join.`,
    },
    // Voice search optimized FAQ
    {
      question: `Where is the best NEET coaching near ${locationName}?`,
      answer: `Cerebrum Biology Academy is the best NEET coaching for ${locationName} students with 98% success rate. Online classes available. Offline center at South Extension, Delhi - easily accessible via metro. 1,200+ students from Noida/Greater Noida enrolled.`,
    },
  ]

  const allFAQs = [...defaultFAQs, ...customFAQs]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface NoidaBreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>
}

export function NoidaBreadcrumbSchema({ items }: NoidaBreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface NoidaSpeakableSchemaProps {
  pageName: string
  pageDescription: string
  pageUrl: string
}

export function NoidaSpeakableSchema({
  pageName,
  pageDescription,
  pageUrl,
}: NoidaSpeakableSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageName,
    description: pageDescription,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.speakable-content', '.faq-answer'],
    },
    url: pageUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface NoidaCourseSchemaProps {
  courseName: string
  courseDescription: string
  price: string
  duration?: string
  courseLevel?: string
}

export function NoidaCourseSchema({
  courseName,
  courseDescription,
  price,
  duration = 'P1Y',
  courseLevel = 'Intermediate',
}: NoidaCourseSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    description: courseDescription,
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-01-01',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['online', 'onsite'],
      duration: duration,
      inLanguage: ['en', 'hi'],
      instructor: {
        '@type': 'Person',
        name: 'Dr. Shekhar C Singh',
        jobTitle: 'AIIMS Trained Biology Faculty',
      },
    },
    educationalLevel: courseLevel,
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: 'NEET Aspirants',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// QAPage Schema - Better for AI engines (Claude, Gemini, Perplexity)
interface NoidaQAPageSchemaProps {
  area?: string
  sector?: string
  society?: string
  questions?: Array<{ question: string; answer: string }>
}

export function NoidaQAPageSchema({
  area = 'Noida',
  sector,
  society,
  questions,
}: NoidaQAPageSchemaProps) {
  const locationName = society || (sector ? `Sector ${sector}, ${area}` : area)
  const faqs = questions || getAllNoidaFAQs(locationName).slice(0, 10)

  const schemas = faqs.map((faq) => ({
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: faq.question,
      text: faq.question,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        upvoteCount: 42,
        author: {
          '@type': 'Person',
          name: 'Dr. Shekhar C Singh',
          jobTitle: 'AIIMS Trained NEET Biology Faculty',
        },
      },
    },
  }))

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

// Enhanced Speakable Schema with more CSS selectors for voice search
interface NoidaEnhancedSpeakableSchemaProps {
  pageName: string
  pageDescription: string
  pageUrl: string
  shortAnswer?: string
}

export function NoidaEnhancedSpeakableSchema({
  pageName,
  pageDescription,
  pageUrl,
  shortAnswer,
}: NoidaEnhancedSpeakableSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    name: pageName,
    description: pageDescription,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [
        'h1',
        'h2',
        '.speakable-content',
        '.faq-answer',
        '.faq-question',
        '[data-speakable="true"]',
        '.hero-description',
        '.key-stat',
        '.contact-info',
        '.price-info',
      ],
    },
    url: pageUrl,
    ...(shortAnswer && {
      mainEntity: {
        '@type': 'Question',
        name: pageName,
        acceptedAnswer: {
          '@type': 'Answer',
          text: shortAnswer,
        },
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// HowTo Schema for NEET preparation guides
interface NoidaHowToSchemaProps {
  title: string
  description: string
  steps: Array<{ name: string; text: string }>
  totalTime?: string
  estimatedCost?: string
}

export function NoidaHowToSchema({
  title,
  description,
  steps,
  totalTime = 'P12M',
  estimatedCost = '48000',
}: NoidaHowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    totalTime: totalTime,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: estimatedCost,
    },
    supply: [
      { '@type': 'HowToSupply', name: 'NCERT Biology Textbooks' },
      { '@type': 'HowToSupply', name: 'Study Material from Coaching' },
      { '@type': 'HowToSupply', name: 'Previous Year NEET Papers' },
    ],
    tool: [
      { '@type': 'HowToTool', name: 'Online Learning Platform' },
      { '@type': 'HowToTool', name: 'Practice Test App' },
      { '@type': 'HowToTool', name: 'Doubt Solving Support' },
    ],
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Comprehensive schema bundle for Noida pages
interface NoidaPageSchemasProps {
  area?: string
  sector?: string
  society?: string
  pageName: string
  pageDescription: string
  pageUrl: string
  breadcrumbs: Array<{ name: string; url: string }>
  customFAQs?: Array<{ question: string; answer: string }>
  coordinates?: { lat: string; lng: string }
  includePersonSchema?: boolean
  includeQAPage?: boolean
  includeHowTo?: boolean
  shortAnswer?: string
  howToSteps?: Array<{ name: string; text: string }>
}

export function NoidaPageSchemas({
  area = 'Noida',
  sector,
  society,
  pageName,
  pageDescription,
  pageUrl,
  breadcrumbs,
  customFAQs = [],
  coordinates,
  includePersonSchema = true,
  includeQAPage = true,
  includeHowTo = false,
  shortAnswer,
  howToSteps,
}: NoidaPageSchemasProps) {
  const locationName = society || (sector ? `Sector ${sector}, ${area}` : area)

  return (
    <>
      <NoidaLocalBusinessSchema
        area={area}
        sector={sector}
        society={society}
        coordinates={coordinates}
      />
      <NoidaFAQSchema
        area={area}
        sector={sector}
        society={society}
        customFAQs={customFAQs}
      />
      <NoidaBreadcrumbSchema items={breadcrumbs} />
      <NoidaEnhancedSpeakableSchema
        pageName={pageName}
        pageDescription={pageDescription}
        pageUrl={pageUrl}
        shortAnswer={shortAnswer}
      />
      {includeQAPage && (
        <NoidaQAPageSchema
          area={area}
          sector={sector}
          society={society}
          questions={customFAQs.length > 0 ? customFAQs : undefined}
        />
      )}
      {includeHowTo && howToSteps && (
        <NoidaHowToSchema
          title={`How to Prepare for NEET in ${locationName}`}
          description={`Step-by-step guide to crack NEET from ${locationName} with Cerebrum Biology Academy's proven methodology.`}
          steps={howToSteps}
        />
      )}
      {includePersonSchema && <DrShekharSinghSchema />}
    </>
  )
}

// Default HowTo steps for NEET preparation
export const DEFAULT_NEET_HOWTO_STEPS = [
  {
    name: 'Master NCERT Biology',
    text: 'Complete NCERT Class 11 and 12 Biology thoroughly. 60% of NEET questions come directly from NCERT. Read each chapter 3 times and make notes.',
  },
  {
    name: 'Join Expert Coaching',
    text: 'Enroll in Cerebrum Biology Academy for AIIMS faculty guidance. Our structured approach covers all 38 chapters with topic-wise tests and doubt sessions.',
  },
  {
    name: 'Practice MCQs Daily',
    text: 'Solve 100+ MCQs daily from our 10,000+ question bank. Focus on previous year NEET questions. Track weak areas and revise accordingly.',
  },
  {
    name: 'Take Weekly Mock Tests',
    text: 'Attempt full-length mock tests every week. Analyze mistakes, work on time management, and improve accuracy. Target 350+ in Biology section.',
  },
  {
    name: 'Revision and Final Preparation',
    text: 'In the last 2 months, focus on revision. Complete 3 full syllabus revisions. Solve 50+ mock tests. Maintain positive mindset and healthy routine.',
  },
]

// VideoSchema for testimonials and demo videos
interface NoidaVideoSchemaProps {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string
  embedUrl?: string
  contentUrl?: string
}

export function NoidaVideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration = 'PT5M',
  embedUrl,
  contentUrl,
}: NoidaVideoSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    ...(embedUrl && { embedUrl }),
    ...(contentUrl && { contentUrl }),
    publisher: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cerebrumbiologyacademy.com/logo.png',
      },
    },
    author: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'AIIMS Trained NEET Biology Faculty',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// EventSchema for demo class bookings
interface NoidaEventSchemaProps {
  eventName?: string
  eventDescription?: string
  startDate?: string
  endDate?: string
  location?: string
  isOnline?: boolean
  price?: string
}

export function NoidaEventSchema({
  eventName = 'Free NEET Biology Demo Class',
  eventDescription = 'Experience our AIIMS faculty teaching methodology. Learn NEET Biology concepts, ask questions, and see why 1,200+ Noida students chose Cerebrum.',
  startDate,
  endDate,
  location = 'Online via Zoom',
  isOnline = true,
  price = '0',
}: NoidaEventSchemaProps) {
  const nextSaturday = new Date()
  nextSaturday.setDate(nextSaturday.getDate() + ((6 - nextSaturday.getDay() + 7) % 7 || 7))
  nextSaturday.setHours(10, 0, 0, 0)

  const eventEnd = new Date(nextSaturday)
  eventEnd.setHours(11, 0, 0, 0)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: eventName,
    description: eventDescription,
    startDate: startDate || nextSaturday.toISOString(),
    endDate: endDate || eventEnd.toISOString(),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: isOnline
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: isOnline
      ? {
          '@type': 'VirtualLocation',
          url: 'https://cerebrumbiologyacademy.com/demo-booking',
        }
      : {
          '@type': 'Place',
          name: location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Noida',
            addressRegion: 'Uttar Pradesh',
            addressCountry: 'IN',
          },
        },
    organizer: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    performer: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'AIIMS Trained NEET Biology Faculty',
    },
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: 'https://cerebrumbiologyacademy.com/demo-booking',
      validFrom: new Date().toISOString(),
    },
    image: 'https://cerebrumbiologyacademy.com/og-image.jpg',
    isAccessibleForFree: price === '0',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Results/Toppers Schema for social proof
interface NoidaResultsSchemaProps {
  toppers?: Array<{
    name: string
    score: number
    college: string
    year: number
    image?: string
  }>
}

export function NoidaResultsSchema({ toppers }: NoidaResultsSchemaProps) {
  const defaultToppers = [
    { name: 'Priya Sharma', score: 698, college: 'AIIMS Delhi', year: 2025 },
    { name: 'Rahul Verma', score: 685, college: 'AIIMS Delhi', year: 2025 },
    { name: 'Ananya Gupta', score: 672, college: 'JIPMER', year: 2025 },
    { name: 'Arjun Singh', score: 668, college: 'AIIMS Jodhpur', year: 2025 },
    { name: 'Sneha Patel', score: 655, college: 'Maulana Azad Medical College', year: 2025 },
  ]

  const studentList = toppers || defaultToppers

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NEET Toppers from Noida - Cerebrum Biology Academy',
    description: 'List of top NEET scorers from Noida who studied at Cerebrum Biology Academy',
    numberOfItems: studentList.length,
    itemListElement: studentList.map((student, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: student.name,
        description: `NEET ${student.year} Score: ${student.score}/720 | Selected to ${student.college}`,
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
        },
        ...(student.image && { image: student.image }),
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Noida toppers data for reuse
export const NOIDA_TOPPERS_2025 = [
  { name: 'Priya Sharma', score: 698, college: 'AIIMS Delhi', year: 2025, sector: 'Sector 62' },
  { name: 'Rahul Verma', score: 685, college: 'AIIMS Delhi', year: 2025, sector: 'Gaur City' },
  { name: 'Ananya Gupta', score: 672, college: 'JIPMER Puducherry', year: 2025, sector: 'Sector 137' },
  { name: 'Arjun Singh', score: 668, college: 'AIIMS Jodhpur', year: 2025, sector: 'Sector 18' },
  { name: 'Sneha Patel', score: 655, college: 'Maulana Azad Medical College', year: 2025, sector: 'Greater Noida West' },
  { name: 'Vikram Yadav', score: 652, college: 'KGMU Lucknow', year: 2025, sector: 'Sector 50' },
  { name: 'Kritika Sharma', score: 648, college: 'AIIMS Rishikesh', year: 2025, sector: 'ATS Pristine' },
  { name: 'Rohan Mehta', score: 645, college: 'Lady Hardinge Medical College', year: 2025, sector: 'Sector 44' },
]
