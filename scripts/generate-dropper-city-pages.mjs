#!/usr/bin/env node
/**
 * Generate page.tsx files for new NEET dropper city pages.
 * Each city directory must already exist under src/app/neet-dropper-batch-{slug}/.
 *
 * Existing per-city pages with bespoke Content files (Faridabad/Noida/Ghaziabad/Gurugram)
 * are NOT touched — they're ranking surfaces we leave alone.
 *
 * Run: node scripts/generate-dropper-city-pages.mjs
 */

import { writeFileSync, existsSync } from 'fs'
import path from 'path'

const PROJECT_ROOT = process.cwd()

const CITIES = [
  {
    slug: 'mumbai',
    name: 'Mumbai',
    region: 'Maharashtra',
    descSnippet: 'live online from our Delhi NCR faculty + study material shipped pan-Maharashtra',
    feederCenter: 'Delhi NCR',
    competitorCue: 'a focused alternative to Aakash Andheri and Allen Bandra-Kurla',
    heroBlurb: "Mumbai droppers — whether you're in Andheri, Bandra, Powai, Thane, Navi Mumbai, or anywhere on the local rail network — can join our specialised 1-year dropper batch online. Same curriculum, same faculty, none of the commute.",
  },
  {
    slug: 'bangalore',
    name: 'Bangalore',
    region: 'Karnataka',
    descSnippet: 'live online — convenient for students across Koramangala, Whitefield, Indiranagar, Electronic City',
    feederCenter: 'Delhi NCR',
    competitorCue: 'a Biology-specialist alternative to Aakash Jayanagar and Allen Bangalore',
    heroBlurb: "Bangalore droppers from Koramangala, Indiranagar, Whitefield, Electronic City, HSR Layout, Jayanagar, or anywhere across the city can join our 1-year dropper batch online. NEET Biology-specialist faculty (AIIMS-trained) — the gap between attempt 1 and attempt 2 is exactly the depth of biology you need.",
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    region: 'Telangana',
    descSnippet: 'live online for students across Hyderabad and Secunderabad — Banjara Hills, Jubilee Hills, Hitec City, Madhapur, Kukatpally',
    feederCenter: 'Delhi NCR',
    competitorCue: 'a Biology-specialist alternative to Sri Chaitanya, Narayana, Aakash Hyderabad',
    heroBlurb: "Hyderabad droppers can move past last year's score with focused biology training. Whether you're from Banjara Hills, Jubilee Hills, Madhapur, Hitec City, Kukatpally, Secunderabad, or anywhere across the twin cities — join our 1-year dropper batch online.",
  },
  {
    slug: 'pune',
    name: 'Pune',
    region: 'Maharashtra',
    descSnippet: 'live online — for Pune & PCMC students from Kothrud, Hinjewadi, Viman Nagar, Aundh, Baner, Kharadi',
    feederCenter: 'Delhi NCR',
    competitorCue: 'a Biology-specialist alternative to Aakash JM Road and Allen Pune',
    heroBlurb: "Pune droppers from Kothrud, Hinjewadi, Viman Nagar, Aundh, Baner, Kharadi, or PCMC can join our 1-year dropper batch online. NEET Biology-focused — most droppers lose 30-40 marks specifically in biology, and that's exactly where we work.",
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    region: 'Tamil Nadu',
    descSnippet: 'live online for Chennai students from T. Nagar, Adyar, Velachery, Anna Nagar, OMR',
    feederCenter: 'Delhi NCR',
    competitorCue: 'a Biology-specialist alternative to Aakash T Nagar and Sri Chaitanya Chennai',
    heroBlurb: "Chennai droppers from T. Nagar, Adyar, Velachery, Anna Nagar, OMR, or anywhere across the city can join our specialised 1-year dropper batch online. We focus exclusively on NEET Biology — where most droppers lose the marks they need.",
  },
  {
    slug: 'kolkata',
    name: 'Kolkata',
    region: 'West Bengal',
    descSnippet: 'live online for Kolkata students from Park Street, Salt Lake, New Town, Howrah, Behala',
    feederCenter: 'Delhi NCR',
    competitorCue: 'a Biology-specialist alternative to Aakash Kolkata and FIITJEE',
    heroBlurb: "Kolkata droppers from Park Street, Salt Lake, New Town, Howrah, Behala, or anywhere across the metropolitan area can join our 1-year dropper batch online — same curriculum and faculty as our Delhi NCR offline batches.",
  },
  {
    slug: 'kota',
    name: 'Kota',
    region: 'Rajasthan',
    descSnippet: 'live online — a Biology-focused alternative for Kota droppers seeking subject-specialist coaching',
    feederCenter: 'Delhi NCR',
    competitorCue: 'a Biology-specialist supplement for Kota students already enrolled at Allen, Aakash, or Resonance who need targeted biology improvement',
    heroBlurb: "Kota droppers — already in town for your second attempt? Add a NEET Biology specialist to your prep. Most Kota droppers come back strong in physics & chemistry but lose 30+ marks in biology. Our online dropper batch fills that gap without disrupting your existing coaching schedule.",
  },
]

function generatePageTsx(city) {
  const cityName = city.name
  const slug = city.slug
  const region = city.region

  // City-specific FAQs — vary the answers slightly so each page isn't a template clone
  const faqs = [
    {
      question: `What is the eligibility for the ${cityName} NEET Dropper Batch 2026-27?`,
      answer: `Any ${cityName} student who appeared for NEET 2024 or 2025 and wants to improve their score is eligible. We start with a 1-on-1 previous-attempt analysis call to identify your weak areas and build a personalised improvement plan.`,
    },
    {
      question: `Is the ${cityName} dropper batch online or offline?`,
      answer: `For ${cityName}, the dropper batch runs as live online classes from our Delhi NCR faculty — same curriculum, same teaching team, same study material as our offline centres. You can also opt into an offline immersion week at our Delhi NCR centre during the revision phase.`,
    },
    {
      question: `What makes your dropper batch different from other ${cityName} options?`,
      answer: `We are NEET Biology specialists. Most general NEET coaches in ${cityName} cover all three subjects shallowly; we go deep on biology — the subject where most droppers lose 30–40 marks. Our small-batch model (max 20 students) means weekly 1-on-1 mentor calls, not a 200-seat lecture hall.`,
    },
    {
      question: `What is the fee structure for ${cityName} students?`,
      answer: `Dropper/Repeater Batch fees range from ₹70,000 to ₹1,56,000 per year depending on tier: Pursuit (₹70,000, 30–40 students), Ascent (₹90,000, 16–18 students), Pinnacle ZA (₹1,56,000, 10–12 students with personal mentorship from Dr. Shekhar). All tiers include study materials shipped to ${cityName}, full test series, and doubt sessions.`,
    },
    {
      question: `By how much can I realistically improve in one drop year?`,
      answer: `Average improvement across our previous dropper cohorts has been 100–150 marks. Top performers have crossed +180 marks. The improvement depends on (a) your previous-attempt score, (b) discipline, and (c) which subjects need work. We track your progress weekly so the plan adapts.`,
    },
    {
      question: `Will I get printed study material in ${cityName}?`,
      answer: `Yes — we ship printed Biology study material, test booklets, and the Cerebrum NCERT-line-by-line guide to your ${cityName} address at no extra cost. Tracking provided.`,
    },
    {
      question: `How is the schedule different from a regular ${cityName} NEET coaching schedule?`,
      answer: `Dropper batch is intensive: 6 hours/day, 6 days/week. Live classes typically 9 AM – 12 PM and a doubt-clearing/revision slot 4 PM – 7 PM (recordings available if you miss). Weekly tests on Sundays. We design it to be the only thing on your plate — drop year is one shot.`,
    },
  ]

  // Programme schema with city-specific provider area + appropriate offers
  // We declare the offering in the dropper price range; CourseInstance is online
  return `import { Metadata } from 'next'
import DropperBatchTemplate from '@/components/dropper/DropperBatchTemplate'

const cityName = '${cityName}'
const citySlug = '${slug}'
const region = '${region}'
const url = \`https://cerebrumbiologyacademy.com/neet-dropper-batch-\${citySlug}\`

export const metadata: Metadata = {
  title: \`NEET Dropper Batch 2026-27 \${cityName} | Repeater Course Online\`,
  description: \`NEET Dropper Batch 2026-27 for \${cityName} students. Intensive 1-year repeater programme with previous-attempt analysis, NEET Biology-specialist faculty, and 100-150 mark improvement track record. Live online classes + study material shipped to \${cityName}.\`,
  keywords: [
    \`neet dropper batch 2026-27 \${citySlug}\`,
    \`neet repeater course \${citySlug}\`,
    \`neet dropper coaching \${citySlug}\`,
    \`neet second attempt \${citySlug}\`,
    \`neet repeater batch \${citySlug}\`,
    \`best dropper batch for neet \${citySlug}\`,
    \`1 year neet dropper course \${citySlug}\`,
    \`online neet dropper batch \${citySlug}\`,
    \`neet biology coaching for droppers \${citySlug}\`,
  ],
  openGraph: {
    title: \`NEET Dropper Batch 2026-27 \${cityName} | Online Repeater Course\`,
    description: \`Intensive 1-year NEET preparation for droppers and repeaters in \${cityName}. Live online classes from AIIMS-trained Biology-specialist faculty.\`,
    url,
    type: 'website',
  },
  alternates: {
    canonical: url,
  },
}

const faqs = ${JSON.stringify(faqs, null, 2).replace(/^/gm, '')}

export default function NEETDropperBatch${cityName.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: \`NEET Dropper Batch 2026-27 — \${cityName}\`,
    description: \`Intensive 1-year NEET preparation programme for droppers and repeaters in \${cityName}. Delivered as live online classes by AIIMS-trained Biology-specialist faculty, with printed study material shipped to \${cityName}.\`,
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
      audienceType: \`NEET dropper / repeater students based in \${cityName}, \${region}\`,
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
        name: \`\${cityName} Dropper Batch 2026-27\`,
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
        faqs={faqs}
      />
    </>
  )
}
`
}

let count = 0
for (const city of CITIES) {
  const dir = path.join(PROJECT_ROOT, 'src', 'app', `neet-dropper-batch-${city.slug}`)
  if (!existsSync(dir)) {
    console.log(`✗ Skipping ${city.slug} — directory missing`)
    continue
  }
  const filePath = path.join(dir, 'page.tsx')
  if (existsSync(filePath)) {
    console.log(`⊘ Skipping ${city.slug} — page.tsx already exists`)
    continue
  }
  writeFileSync(filePath, generatePageTsx(city), 'utf8')
  count++
  console.log(`✓ Created ${path.relative(PROJECT_ROOT, filePath)}`)
}
console.log(`\nGenerated ${count} new dropper city pages.`)
