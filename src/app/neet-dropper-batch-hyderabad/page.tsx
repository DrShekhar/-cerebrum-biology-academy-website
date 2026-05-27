import { Metadata } from 'next'
import DropperBatchTemplate from '@/components/dropper/DropperBatchTemplate'

const cityName = 'Hyderabad'
const citySlug = 'hyderabad'
const region = 'Telangana'
const url = `https://cerebrumbiologyacademy.com/neet-dropper-batch-${citySlug}`

export const metadata: Metadata = {
  title: `NEET Dropper Batch 2026-27 ${cityName} | Repeater Course Online`,
  description: `NEET Dropper Batch 2026-27 for ${cityName} students. Intensive 1-year repeater programme with previous-attempt analysis, NEET Biology-specialist faculty, and 100-150 mark improvement track record. Live online classes + study material shipped to ${cityName}.`,
  keywords: [
    `neet dropper batch 2026-27 ${citySlug}`,
    `neet repeater course ${citySlug}`,
    `neet dropper coaching ${citySlug}`,
    `neet second attempt ${citySlug}`,
    `neet repeater batch ${citySlug}`,
    `best dropper batch for neet ${citySlug}`,
    `1 year neet dropper course ${citySlug}`,
    `online neet dropper batch ${citySlug}`,
    `neet biology coaching for droppers ${citySlug}`,
  ],
  openGraph: {
    title: `NEET Dropper Batch 2026-27 ${cityName} | Online Repeater Course`,
    description: `Intensive 1-year NEET preparation for droppers and repeaters in ${cityName}. Live online classes from AIIMS-trained Biology-specialist faculty.`,
    url,
    type: 'website',
    locale: 'en_IN',
    },
  alternates: {
    canonical: url,
    languages: {
      en: url,
      'en-IN': url,
      'x-default': url,
    },
  },

  twitter: { card: 'summary_large_image' as const },
}

const faqs = [
  {
    "question": "What is the eligibility for the Hyderabad NEET Dropper Batch 2026-27?",
    "answer": "Any Hyderabad student who appeared for NEET 2024 or 2025 and wants to improve their score is eligible. We start with a 1-on-1 previous-attempt analysis call to identify your weak areas and build a personalised improvement plan."
  },
  {
    "question": "Is the Hyderabad dropper batch online or offline?",
    "answer": "For Hyderabad, the dropper batch runs as live online classes from our Delhi NCR faculty — same curriculum, same teaching team, same study material as our offline centres. You can also opt into an offline immersion week at our Delhi NCR centre during the revision phase."
  },
  {
    "question": "What makes your dropper batch different from other Hyderabad options?",
    "answer": "We are NEET Biology specialists. Most general NEET coaches in Hyderabad cover all three subjects shallowly; we go deep on biology — the subject where most droppers lose 30–40 marks. Our small-batch model (max 20 students) means weekly 1-on-1 mentor calls, not a 200-seat lecture hall."
  },
  {
    "question": "What is the fee structure for Hyderabad students?",
    "answer": "Dropper/Repeater Batch fees range from ₹70,000 to ₹1,56,000 per year depending on tier: Pursuit (₹70,000, 30–40 students), Ascent (₹90,000, 16–18 students), Pinnacle ZA (₹1,56,000, 10–12 students with personal mentorship from Dr. Shekhar). All tiers include study materials shipped to Hyderabad, full test series, and doubt sessions."
  },
  {
    "question": "By how much can I realistically improve in one drop year?",
    "answer": "Average improvement across our previous dropper cohorts has been 100–150 marks. Top performers have crossed +180 marks. The improvement depends on (a) your previous-attempt score, (b) discipline, and (c) which subjects need work. We track your progress weekly so the plan adapts."
  },
  {
    "question": "Will I get printed study material in Hyderabad?",
    "answer": "Yes — we ship printed Biology study material, test booklets, and the Cerebrum NCERT-line-by-line guide to your Hyderabad address at no extra cost. Tracking provided."
  },
  {
    "question": "How is the schedule different from a regular Hyderabad NEET coaching schedule?",
    "answer": "Dropper batch is intensive: 6 hours/day, 6 days/week. Live classes typically 9 AM – 12 PM and a doubt-clearing/revision slot 4 PM – 7 PM (recordings available if you miss). Weekly tests on Sundays. We design it to be the only thing on your plate — drop year is one shot."
  }
]

const cityContext = "Hyderabad and Secunderabad together produce one of the densest NEET dropper markets in India — driven heavily by the strong tradition of Telangana and Andhra Pradesh students aiming for Telangana, AP, and central India medical seats. The local coaching market is dominated by other South-Indian chains, a leading national educational institution, other IIT-JEE-first coachings, and the 2nd-largest national NEET chain Hyderabad, all running large multi-subject batches.\n\nThe recurring dropper profile we see: a student from Banjara Hills, Jubilee Hills, Madhapur, Hitec City, Kukatpally, or Secunderabad with a strong physics/chemistry foundation but inconsistent biology depth — particularly on plant physiology and human anatomy where other South-Indian chains / a leading national educational institution cohorts often skim. A focused 1-year biology specialist programme adds the depth that closes the 30–50 mark biology gap most droppers carry into attempt two.\n\nTelugu-medium students from rural Telangana / AP frequently transition to English-medium NEET preparation in Hyderabad; our Hindi/English bilingual study material support is available on request."

export default function NEETDropperBatchHyderabadPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `NEET Dropper Batch 2026-27 — ${cityName}`,
    description: `Intensive 1-year NEET preparation programme for droppers and repeaters in ${cityName}. Delivered as live online classes by AIIMS-trained Biology-specialist faculty, with printed study material shipped to ${cityName}.`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      sameAs: [
        'https://www.facebook.com/cerebrumbiologyacademy',
        'https://www.instagram.com/cerebrumbiologyacademy',
        'https://www.youtube.com/@cerebrumbiologyacademy',
      ],
    },
    educationalLevel: 'Post-12th',
    teaches: ['NEET Biology', 'Previous Attempt Analysis', 'Score Improvement Strategy'],
    timeRequired: 'P1Y',
    inLanguage: 'en-IN',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: `NEET dropper / repeater students based in ${cityName}, ${region}`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT6H',
      startDate: '2025-07-01',
      endDate: '2026-05-31',
      location: {
        '@type': 'VirtualLocation',
        url,
      },
    },
    offers: [
      {
        '@type': 'Offer',
        category: 'Pursuit Tier',
        price: '70000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        category: 'Ascent Tier',
        price: '90000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        category: 'Pinnacle ZA Tier',
        price: '156000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '38',
      bestRating: '5',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Dropper Programme',
        item: 'https://cerebrumbiologyacademy.com/dropper',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${cityName} Dropper Batch 2026-27`,
        item: url,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DropperBatchTemplate
        cityName={cityName}
        citySlug={citySlug}
        modeLabel="online"
        nearestCenterName="Delhi NCR"
        cityContext={cityContext}
        faqs={faqs}
      />
    </>
  )
}
