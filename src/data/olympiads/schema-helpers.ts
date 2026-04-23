/**
 * Shared schema.org builders for olympiad pages.
 *
 * Purpose: add richer Course + HowTo JSON-LD (instructor,
 * hasCourseInstance, courseWorkload) without shipping
 * unverifiable named-Person claims. Uses the academy as the
 * provider + instructor entity — truthful and schema-valid.
 */

import { olympiadPricingProducts } from './pricing-matrix'

const PROVIDER = {
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy',
  url: 'https://cerebrumbiologyacademy.com',
} as const

/**
 * hasCourseInstance entries for the three olympiad pricing
 * tiers — one-shot sessions vs year-long programme. Consumed
 * as an array and attached to Course schema.
 */
export function olympiadCourseInstances(pageUrl: string) {
  return [
    {
      '@type': 'CourseInstance',
      name: 'Complete Olympiad Year (Live + recorded)',
      description:
        '9-12 month structured programme. Campbell Biology coverage, weekly past-paper drills, mock exams, practical lab skills module.',
      courseMode: ['Online', 'Blended'],
      courseWorkload: 'PT6H',
      inLanguage: 'en',
      instructor: PROVIDER,
      offers: {
        '@type': 'Offer',
        price: 4500,
        priceCurrency: 'USD',
        url: `${pageUrl}#pricing`,
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'CourseInstance',
      name: '1:1 Elite Mentoring',
      description:
        'One-on-one sessions with a senior olympiad tutor. Custom sequence for score optimisation and final-phase pre-national prep.',
      courseMode: 'Online',
      courseWorkload: 'PT1H',
      inLanguage: 'en',
      instructor: PROVIDER,
      offers: {
        '@type': 'Offer',
        price: 90,
        priceCurrency: 'USD',
        url: `${pageUrl}#pricing`,
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'CourseInstance',
      name: 'Small-Batch Weekend',
      description:
        'Weekend small-group programme (4-6 students) for students balancing school with olympiad prep.',
      courseMode: 'Online',
      courseWorkload: 'PT3H',
      inLanguage: 'en',
      instructor: PROVIDER,
      offers: {
        '@type': 'Offer',
        price: 50,
        priceCurrency: 'USD',
        url: `${pageUrl}#pricing`,
        availability: 'https://schema.org/InStock',
      },
    },
  ]
}

/**
 * Full Course schema for olympiad pages. Includes instructor
 * (Organization), hasCourseInstance for the 3 delivery modes,
 * and Offers. Use from page components that want a single
 * complete JSON-LD block.
 */
export function olympiadCourseSchema(args: {
  name: string
  description: string
  url: string
  about: string
  teaches?: string[]
  areaServed?: { type: 'City' | 'Country'; name: string; containedIn?: string }
  /** BCP-47 locale for inLanguage. Defaults to 'en'; India pages
   * should pass 'en-IN' to signal regional English. */
  inLanguage?: string
}) {
  const lang = args.inLanguage ?? 'en'
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: args.name,
    description: args.description,
    url: args.url,
    provider: args.areaServed
      ? {
          ...PROVIDER,
          areaServed: {
            '@type': args.areaServed.type,
            name: args.areaServed.name,
            ...(args.areaServed.containedIn && {
              containedInPlace: { '@type': 'Country', name: args.areaServed.containedIn },
            }),
          },
        }
      : PROVIDER,
    educationalLevel: 'High School',
    about: args.about,
    inLanguage: lang,
    ...(args.teaches && args.teaches.length > 0 && { teaches: args.teaches }),
    instructor: PROVIDER,
    hasCourseInstance: olympiadCourseInstances(args.url),
    offers: olympiadPricingProducts.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      price: p.priceUSD,
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: p.priceUSD,
        priceCurrency: 'USD',
        unitText: p.schemaUnitText,
      },
      availability: 'https://schema.org/InStock',
      url: `${args.url}#pricing`,
    })),
  }
}

/**
 * HowTo schema — "How to prepare for NSEB / INBO / IBO"
 * Attached to the NSEB hub and can be reused on any Indian
 * olympiad page. Maps to the 5-step prep workflow we teach.
 */
export function nsebHowToSchema(pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to prepare for NSEB (and beyond to INBO / IBO)',
    description:
      'A 5-stage preparation plan covering Campbell Biology foundation, past-paper drills, mock exams, practical skills, and interview preparation for INBO / OCSC.',
    totalTime: 'P9M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: 4500,
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Campbell Biology foundation sweep (2-3 months)',
        text: 'Complete Campbell Biology (11th or 12th edition) end-to-end with lecture notes. Focus on the 8 core units: chemistry of life, cell biology, genetics, evolution, diversity, plant form, animal form, ecology.',
        url: `${pageUrl}#campbell-foundation`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Past-paper drills with timing (2-3 months)',
        text: 'Solve NSEB past papers from 2010 onwards under timed conditions (80 MCQs in 2 hours). After each paper, do a topic-wise error analysis to identify weak areas.',
        url: `${pageUrl}#past-papers`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Advanced topics and data analysis (2 months)',
        text: 'Deep-dive into experimental design, biostatistics basics, and data-interpretation questions. Supplement Campbell with Raven Biology for genetics and Taylor for ecology.',
        url: `${pageUrl}#advanced-topics`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Mock exams with examiner-style feedback (1-2 months)',
        text: 'Full-length mock exams at NSEB difficulty with detailed feedback on each question. Target 70-80% raw score as a safety margin above the typical INBO cutoff.',
        url: `${pageUrl}#mock-exams`,
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'INBO / practical skills preparation (post-NSEB qualifiers)',
        text: 'Practical lab skills (microscopy, biochemical assays, molecular biology techniques, anatomical dissections). Interview-style question drills for OCSC training camp.',
        url: `${pageUrl}#inbo-prep`,
      },
    ],
    tool: [
      { '@type': 'HowToTool', name: 'Campbell Biology 11th or 12th edition' },
      { '@type': 'HowToTool', name: 'NSEB past papers archive (2010 onwards)' },
      { '@type': 'HowToTool', name: 'Raven Biology (supplement for genetics)' },
    ],
  }
}

/**
 * HowTo schema for IBO practical-round preparation. Used on
 * the IBO hub and on country pages where students are
 * preparing for IBO practicals.
 */
export function iboPracticalHowToSchema(pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to prepare for the IBO practical round',
    description:
      'The IBO practical round is worth roughly 50% of medal points and covers four lab categories. A focused 8-10 week prep plan.',
    totalTime: 'P10W',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Biochemistry practical skills',
        text: 'Buffer preparation, spectrophotometry, enzyme kinetics, protein quantification, chromatography. Equipment-adjusted adaptations for home lab setups.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Plant anatomy and physiology',
        text: 'Microscopy of plant tissues, transpiration and photosynthesis experiments, plant hormone assays, basic plant taxonomy.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Animal anatomy and physiology',
        text: 'Comparative anatomy dissections (ethical equivalents), cardiovascular and respiratory physiology measurements, histology.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Bioinformatics and ecology',
        text: 'BLAST sequence analysis, phylogenetic tree construction, ecological sampling statistics, population genetics calculations.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Full practical mock under timed conditions',
        text: 'Combined 4-hour practical exam covering all 4 categories with examiner-style scoring. At least 2 full mocks before IBO.',
        url: `${pageUrl}#mock-exams`,
      },
    ],
  }
}
