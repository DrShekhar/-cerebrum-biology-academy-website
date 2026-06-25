/**
 * NEET feeder-school landing-page configurations for Delhi NCR.
 *
 * Powers /neet-coaching-{school-slug} pages targeting parents searching
 * "biology coaching for [school name] students" — long-tail school-name
 * intent that Aakash and Allen dominate via their school-specific
 * landing pages. Cerebrum's gap was zero feeder-school coverage.
 *
 * 15 schools across Delhi (5), Gurugram (4), Noida (3), Faridabad (2),
 * Ghaziabad (1) — the highest-volume Delhi NCR NEET aspirant feeders.
 *
 * Trademark guardrails: descriptive language only ("near X school",
 * "for X students"). Never imply endorsement or affiliation.
 */

import type { BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export type NEETFeederSchoolKey =
  | 'dps-rk-puram-delhi'
  | 'sanskriti-school-delhi'
  | 'modern-school-barakhamba-delhi'
  | 'springdales-school-delhi'
  | 'mothers-international-delhi'
  | 'dps-mathura-road-delhi'
  | 'tagore-international-delhi'
  | 'gd-goenka-gurugram'
  | 'suncity-school-gurugram'
  | 'shriram-school-aravali-gurugram'
  | 'pathways-world-aravali-gurugram'
  | 'heritage-xperiential-gurugram'
  | 'dps-sector-45-gurugram'
  | 'dps-noida'
  | 'cambridge-international-noida'
  | 'amity-international-noida'
  | 'lotus-valley-international-noida'
  | 'apeejay-school-faridabad'
  | 'delhi-public-school-faridabad'
  | 'dps-ghaziabad'

export interface NEETFeederSchool {
  slug: string
  schoolName: string
  shortName: string
  city: string
  cityHubUrl: string
  curriculum: string
  area: string
  nearestCerebrumCentre: string
  metroNote: string
  feederContext: string
  /** Tier shapes the testimonial mix + FAQ priority order. Elite schools
   *  surface AIIMS-target language + NRI quota FAQ first. Emerging
   *  feeders surface affordable pricing + state-college pathway. */
  tier: 'elite' | 'premium' | 'emerging'
}

interface FeederTestimonial {
  name: string
  score: string
  college: string
  quote: string
}

const TESTIMONIAL_POOL: FeederTestimonial[] = [
  {
    name: 'Aditya Verma',
    score: 'NEET 689/720',
    college: 'AIIMS Delhi',
    quote:
      "Balanced Class 12 boards with Cerebrum's Ascent batch. AIIMS faculty + small batch + NCERT line-by-line. 689/720 in NEET.",
  },
  {
    name: 'Sneha Reddy',
    score: 'NEET 672/720',
    college: 'KMC Manipal (NRI Quota)',
    quote:
      "Cerebrum's NRI quota guidance was key — we had OCI status. KMC Manipal at materially lower fees than US med school.",
  },
  {
    name: 'Vivek Khanna',
    score: 'NEET 658/720',
    college: 'MAMC Delhi',
    quote:
      'Dropper year — Pinnacle 1:1 with Dr. Shekhar. Custom mock review identified my exact Physiology gaps. MAMC Delhi.',
  },
  {
    name: 'Ishita Malhotra',
    score: 'NEET 702/720',
    college: 'AIIMS Delhi',
    quote:
      "Dr. Singh's clinical examples from AIIMS practice made Physiology unforgettable. 702/720 — Biology my strongest section.",
  },
  {
    name: 'Rohan Khanna',
    score: 'NEET 688/720',
    college: 'MAMC Delhi',
    quote:
      'Improved from 520 in mock to 688 in actual NEET. Personal attention in 18-student Ascent batch was the differentiator.',
  },
  {
    name: 'Kavya Reddy',
    score: 'NEET 679/720',
    college: 'AIIMS Jodhpur',
    quote:
      'As a dropper, I needed bespoke pacing. Pinnacle 1:1 identified exactly which Genetics topics I was bluffing through.',
  },
  {
    name: 'Aryan Patel',
    score: 'NEET 648/720',
    college: 'VMMC Safdarjung',
    quote:
      '17-student Ascent batch · NCERT line-by-line · weekly mocks every Saturday. Hit 320+ in Biology by November.',
  },
  {
    name: 'Tanvi Sharma',
    score: 'NEET 632/720',
    college: 'UCMS Delhi',
    quote:
      "Boards 96/100 + NEET 632 simultaneously. Cerebrum's curriculum alignment with CBSE Class 12 made dual-prep possible.",
  },
  {
    name: 'Manvi Goyal',
    score: 'NEET 615/720',
    college: 'LHMC Delhi',
    quote:
      'Tier 2 college aspirant. Cerebrum did NOT push AIIMS narrative — coached me realistically toward LHMC. 615 hit my target.',
  },
]

/** Tier-specific FAQ priority order. Elite schools surface AIIMS-target
 *  + NRI quota FAQs first. Emerging schools surface affordable pricing +
 *  state-college pathway first. */
function reorderFAQsByTier<T extends { question: string }>(
  faqs: T[],
  tier: 'elite' | 'premium' | 'emerging'
): T[] {
  if (tier === 'elite') {
    // Surface AIIMS + NRI first
    const aiimsFirst = (q: string) => (/AIIMS|NRI quota|toppers|cutoff/i.test(q) ? -1 : 0)
    return [...faqs].sort((a, b) => aiimsFirst(a.question) - aiimsFirst(b.question))
  }
  if (tier === 'emerging') {
    // Surface pricing + nearest centre first
    const pricingFirst = (q: string) => (/cost|fee|nearest|switch|free demo/i.test(q) ? -1 : 0)
    return [...faqs].sort((a, b) => pricingFirst(a.question) - pricingFirst(b.question))
  }
  return faqs
}

/** Tier-specific bonus FAQ — appended to the array based on school tier */
function tierBonusFAQs(
  tier: 'elite' | 'premium' | 'emerging',
  shortName: string
): { question: string; answer: string }[] {
  if (tier === 'elite') {
    return [
      {
        question: `Does Cerebrum produce AIIMS rankers from ${shortName}-tier schools?`,
        answer: `Yes — Cerebrum has placed 500+ students in AIIMS (Delhi, Jodhpur, Bhopal, Bhubaneswar, Patna, Raipur) across 12 years. Elite-school cohorts typically aim for AIIMS Delhi or MAMC; we coach to that bar with Pinnacle 1:1 mentoring directly from Dr. Shekhar. Recent toppers from ${shortName}-tier feeder schools include NEET 702/720 (AIIMS Delhi) and NEET 688/720 (MAMC Delhi).`,
      },
      {
        question: `Should ${shortName} students pair Cerebrum with Aakash / FIITJEE for AIIMS prep?`,
        answer: `Common pattern at elite schools: students keep Aakash / FIITJEE for Physics + Chemistry depth (especially for AIIMS-level integer/numerical questions) and add Cerebrum specifically for Biology. The 360/720 Biology section is structurally where Cerebrum's biology-only specialisation compounds vs generalist Physics + Chemistry coaching.`,
      },
    ]
  }
  if (tier === 'emerging') {
    return [
      {
        question: `Can ${shortName} students afford the Pursuit tier?`,
        answer: `Yes — Pursuit at ₹40,000/year is intentionally priced as the entry tier for students from emerging-feeder schools where AIIMS-Delhi-fee burden is unrealistic. Same AIIMS / IIT-trained faculty (30–40 student batches), same NCERT pedagogy. EMI plans available. State medical colleges (Delhi government colleges, Haryana state, UP government) are realistic targets at Pursuit-tier preparation.`,
      },
      {
        question: `What if my mock score is currently below 200/360 in Biology?`,
        answer: `Cerebrum's score-jump programmes are built for exactly this gap. Documented improvements: 180 → 320 in 6 months, 220 → 350 in 8 months. ${shortName} students typically respond well to NCERT line-by-line + weekly mock + 1:1 doubt review cycle. Start with Pursuit; upgrade to Ascent or Pinnacle mid-year if you out-grow the tier.`,
      },
    ]
  }
  // premium tier: keep neutral
  return [
    {
      question: `What's the average NEET score for ${shortName} alumni at Cerebrum?`,
      answer: `Premium-feeder Cerebrum cohorts average 320–340 / 360 in NEET Biology and 600–680 / 720 overall, placing into top-quartile government and deemed medical colleges. Specific outcomes vary by tier (Pursuit aims for state colleges; Ascent for premium government colleges; Pinnacle for AIIMS / JIPMER).`,
    },
  ]
}

function pickTestimonials(
  seed: string,
  tier: 'elite' | 'premium' | 'emerging'
): FeederTestimonial[] {
  // Deterministic but varied selection based on school slug — same school
  // always gets same 3 testimonials, but different schools get different sets.
  const hash = seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const start = hash % TESTIMONIAL_POOL.length
  const picks: FeederTestimonial[] = []
  for (let i = 0; i < 3; i++) {
    picks.push(TESTIMONIAL_POOL[(start + i * 3) % TESTIMONIAL_POOL.length])
  }
  // Tier-bias: elite schools always include the AIIMS top-scorer testimonial
  if (tier === 'elite' && !picks.some((p) => p.college.includes('AIIMS'))) {
    picks[0] = TESTIMONIAL_POOL[3] // Ishita 702
  }
  // Emerging schools surface realistic mid-tier college outcomes
  if (
    tier === 'emerging' &&
    !picks.some((p) => p.score.startsWith('NEET 6') && parseInt(p.score.slice(5, 8)) < 650)
  ) {
    picks[picks.length - 1] = TESTIMONIAL_POOL[8] // Manvi 615 / LHMC
  }
  return picks
}

export const neetFeederSchools: Record<NEETFeederSchoolKey, NEETFeederSchool> = {
  'dps-rk-puram-delhi': {
    slug: 'neet-coaching-dps-rk-puram-delhi',
    schoolName: 'Delhi Public School (DPS) R.K. Puram',
    shortName: 'DPS RK Puram',
    city: 'South-West Delhi',
    cityHubUrl: '/neet-coaching-delhi',
    curriculum: 'CBSE',
    area: 'Sector 12, RK Puram',
    nearestCerebrumCentre: 'South Extension (5 km · 15 min)',
    metroNote: 'AIIMS Metro (Yellow Line) — 4 km',
    feederContext:
      "DPS RK Puram is consistently ranked among Delhi's top CBSE schools and a major NEET feeder. Class 12 science students typically split between IIT-JEE and NEET preparation streams.",
    tier: 'elite',
  },
  'sanskriti-school-delhi': {
    slug: 'neet-coaching-sanskriti-school-delhi',
    schoolName: 'Sanskriti School',
    shortName: 'Sanskriti School',
    city: 'Chanakyapuri, New Delhi',
    cityHubUrl: '/neet-coaching-delhi',
    curriculum: 'CBSE',
    area: 'Chanakyapuri',
    nearestCerebrumCentre: 'South Extension (6 km · 18 min)',
    metroNote: 'Race Course Metro (Yellow Line) — 1 km',
    feederContext:
      "Sanskriti is one of Delhi's most prestigious CBSE schools, drawing diplomatic-family and senior-bureaucrat children. Class 12 science cohorts typically target AIIMS, JIPMER and top US/UK premed routes.",
    tier: 'elite',
  },
  'modern-school-barakhamba-delhi': {
    slug: 'neet-coaching-modern-school-barakhamba-delhi',
    schoolName: 'Modern School (Barakhamba Road)',
    shortName: 'Modern School Barakhamba',
    city: 'Central Delhi',
    cityHubUrl: '/neet-coaching-delhi',
    curriculum: 'CBSE',
    area: 'Barakhamba Road',
    nearestCerebrumCentre: 'South Extension (6 km · 20 min) · Green Park (5 km · 15 min)',
    metroNote: 'Barakhamba Road Metro (Blue Line) — adjacent',
    feederContext:
      "Modern School Barakhamba (founded 1920) is Delhi's oldest elite English-medium school. Strong NEET feeder, with annual cohorts targeting AIIMS Delhi and MAMC.",
    tier: 'elite',
  },
  'springdales-school-delhi': {
    slug: 'neet-coaching-springdales-school-delhi',
    schoolName: 'Springdales School (Pusa Road / Dhaula Kuan)',
    shortName: 'Springdales School',
    city: 'Central / South-West Delhi',
    cityHubUrl: '/neet-coaching-delhi',
    curriculum: 'CBSE',
    area: 'Pusa Road + Dhaula Kuan campuses',
    nearestCerebrumCentre: 'South Extension (4–8 km depending on campus)',
    metroNote: 'Dhaula Kuan Metro (Pink Line) — 1 km for Dhaula Kuan campus',
    feederContext:
      'Springdales is a heritage CBSE school with two Delhi campuses. Science cohorts produce annual NEET / IIT-JEE qualifiers; strong international-curriculum bridge for IB / AP Biology after Class 12.',
    tier: 'premium',
  },
  'mothers-international-delhi': {
    slug: 'neet-coaching-mothers-international-delhi',
    schoolName: "Mother's International School",
    shortName: "Mother's International",
    city: 'South Delhi',
    cityHubUrl: '/neet-coaching-delhi',
    curriculum: 'CBSE',
    area: 'Sri Aurobindo Marg, near AIIMS',
    nearestCerebrumCentre: 'South Extension (3 km · 10 min)',
    metroNote: 'AIIMS Metro (Yellow Line) — adjacent',
    feederContext:
      "Mother's International is across the road from AIIMS — symbolically the closest school to India's premier medical institution. NEET preparation is a natural fit.",
    tier: 'elite',
  },
  'dps-mathura-road-delhi': {
    slug: 'neet-coaching-dps-mathura-road-delhi',
    schoolName: 'Delhi Public School (DPS) Mathura Road',
    shortName: 'DPS Mathura Road',
    city: 'South-East Delhi',
    cityHubUrl: '/neet-coaching-delhi',
    curriculum: 'CBSE',
    area: 'New Friends Colony, Mathura Road',
    nearestCerebrumCentre: 'South Extension (5 km · 18 min)',
    metroNote: 'Nehru Place Metro (Violet Line) — 3 km',
    feederContext:
      'DPS Mathura Road serves New Friends Colony, Sukhdev Vihar and East-of-Kailash residents. Strong CBSE Class 12 science cohort with consistent annual NEET selections.',
    tier: 'premium',
  },
  'tagore-international-delhi': {
    slug: 'neet-coaching-tagore-international-delhi',
    schoolName: 'Tagore International School',
    shortName: 'Tagore International',
    city: 'Vasant Vihar, Delhi',
    cityHubUrl: '/neet-coaching-delhi',
    curriculum: 'CBSE',
    area: 'Vasant Vihar',
    nearestCerebrumCentre: 'South Extension (7 km · 22 min) · Green Park (5 km · 15 min)',
    metroNote: 'Vasant Vihar Metro (Magenta Line) — 1 km',
    feederContext:
      'Tagore International Vasant Vihar serves diplomatic-family and senior-bureaucrat children. Class 12 science cohort typically targets AIIMS Delhi, JIPMER, MAMC and overseas premed.',
    tier: 'elite',
  },
  'gd-goenka-gurugram': {
    slug: 'neet-coaching-gd-goenka-gurugram',
    schoolName: 'GD Goenka World School',
    shortName: 'GD Goenka Gurugram',
    city: 'Sohna Road, Gurugram',
    cityHubUrl: '/neet-coaching-gurugram',
    curriculum: 'CBSE + IB Diploma',
    area: 'Sohna Road, Gurugram',
    nearestCerebrumCentre: 'Gurugram Sector 51 (8 km · 20 min)',
    metroNote: 'Sohna Road bus + cab access; HUDA City Centre Metro (8 km)',
    feederContext:
      'GD Goenka offers both CBSE and IB Diploma streams. NEET aspirants are typically CBSE-stream Class 12 students; IB students often target premed in the US / UK alongside the option of NEET via NRI / OCI route.',
    tier: 'premium',
  },
  'suncity-school-gurugram': {
    slug: 'neet-coaching-suncity-school-gurugram',
    schoolName: 'Suncity School',
    shortName: 'Suncity School',
    city: 'Sector 54, Gurugram',
    cityHubUrl: '/neet-coaching-gurugram',
    curriculum: 'CBSE',
    area: 'Sector 54, Gurugram',
    nearestCerebrumCentre: 'Gurugram Sector 51 (2 km · 8 min)',
    metroNote: 'Sector 53–54 Metro (Rapid Metro) — adjacent',
    feederContext:
      "Suncity is among Gurugram's top-tier CBSE schools. Strong Class 11–12 NEET cohort drawn from DLF Phase 4–5, Sector 53–54, and Golf Course Road residential clusters.",
    tier: 'premium',
  },
  'shriram-school-aravali-gurugram': {
    slug: 'neet-coaching-shriram-school-aravali-gurugram',
    schoolName: 'Shri Ram School (Aravali Campus)',
    shortName: 'Shriram School Aravali',
    city: 'Gurugram',
    cityHubUrl: '/neet-coaching-gurugram',
    curriculum: 'CBSE + IGCSE / A-Level',
    area: 'V-37, Maruti Kunj Road, Aravali Hills',
    nearestCerebrumCentre: 'Gurugram Sector 51 (10 km · 25 min)',
    metroNote: 'Cab access; HUDA City Centre Metro 10 km',
    feederContext:
      "Shri Ram Aravali is among Delhi NCR's most academically rigorous schools. NEET cohort typically combines CBSE-stream Class 12 + IGCSE A-Level Biology students considering Indian or international premed.",
    tier: 'elite',
  },
  'pathways-world-aravali-gurugram': {
    slug: 'neet-coaching-pathways-world-aravali-gurugram',
    schoolName: 'Pathways World School (Aravali)',
    shortName: 'Pathways Aravali',
    city: 'Gurugram',
    cityHubUrl: '/neet-coaching-gurugram',
    curriculum: 'IB Diploma + IGCSE',
    area: 'Off Gurgaon-Sohna Road, Aravali Hills',
    nearestCerebrumCentre: 'Gurugram Sector 51 (12 km · 28 min)',
    metroNote: 'Cab access; HUDA City Centre Metro 12 km',
    feederContext:
      'Pathways Aravali is a fully IB school. NEET aspirants here are typically IB Biology HL students combining IB premed prep with NEET via the NRI / OCI quota route at Indian medical colleges.',
    tier: 'elite',
  },
  'heritage-xperiential-gurugram': {
    slug: 'neet-coaching-heritage-xperiential-gurugram',
    schoolName: 'Heritage Xperiential Learning School',
    shortName: 'Heritage Xperiential Gurugram',
    city: 'Sector 62, Gurugram',
    cityHubUrl: '/neet-coaching-gurugram',
    curriculum: 'CBSE + IGCSE / IB Diploma',
    area: 'Sector 62, Gurugram',
    nearestCerebrumCentre: 'Gurugram Sector 51 (3 km · 10 min)',
    metroNote: 'Sector 54 Chowk (Rapid Metro) — 3 km',
    feederContext:
      "Heritage Xperiential is among Gurugram's academically rigorous experiential-learning schools. Multi-curriculum: CBSE + IGCSE + IB Diploma streams. NEET cohort typically combines CBSE Class 12 + IB Biology HL students.",
    tier: 'premium',
  },
  'dps-sector-45-gurugram': {
    slug: 'neet-coaching-dps-sector-45-gurugram',
    schoolName: 'Delhi Public School (DPS) Sector 45',
    shortName: 'DPS Sector 45 Gurugram',
    city: 'Sector 45, Gurugram',
    cityHubUrl: '/neet-coaching-gurugram',
    curriculum: 'CBSE',
    area: 'Sector 45, Gurugram',
    nearestCerebrumCentre: 'Gurugram Sector 51 (5 km · 12 min)',
    metroNote: 'HUDA City Centre Metro (Yellow Line) — 5 km',
    feederContext:
      "DPS Sector 45 is among Gurugram's top-tier CBSE schools, serving DLF Phase 4–5 and Golf Course Road residential clusters. Strong Class 12 science cohort with consistent NEET selections.",
    tier: 'premium',
  },
  'dps-noida': {
    slug: 'neet-coaching-dps-noida',
    schoolName: 'Delhi Public School (DPS) Noida',
    shortName: 'DPS Noida',
    city: 'Sector 30, Noida',
    cityHubUrl: '/neet-coaching-noida',
    curriculum: 'CBSE',
    area: 'Sector 30, Noida',
    nearestCerebrumCentre: 'Noida Sector 62 (8 km · 18 min)',
    metroNote: 'Botanical Garden Metro (Blue Line) — 4 km',
    feederContext:
      'DPS Noida is the flagship Noida CBSE school. Annual NEET cohort consistently produces AIIMS, MAMC and KMC Manipal selections.',
    tier: 'premium',
  },
  'cambridge-international-noida': {
    slug: 'neet-coaching-cambridge-international-noida',
    schoolName: 'Cambridge International School',
    shortName: 'Cambridge International Noida',
    city: 'Sector 27, Noida',
    cityHubUrl: '/neet-coaching-noida',
    curriculum: 'CBSE + IGCSE / A-Level',
    area: 'Sector 27, Noida',
    nearestCerebrumCentre: 'Noida Sector 62 (10 km · 22 min)',
    metroNote: 'Sector 51 Metro (Aqua Line) — 5 km',
    feederContext:
      'Cambridge International runs both CBSE and Cambridge International (IGCSE / A-Level) streams. IGCSE Biology + A-Level Biology students often transition to NEET via NRI quota or US premed.',
    tier: 'premium',
  },
  'amity-international-noida': {
    slug: 'neet-coaching-amity-international-noida',
    schoolName: 'Amity International School',
    shortName: 'Amity International Noida',
    city: 'Sector 44, Noida',
    cityHubUrl: '/neet-coaching-noida',
    curriculum: 'CBSE',
    area: 'Sector 44, Noida',
    nearestCerebrumCentre: 'Noida Sector 62 (5 km · 12 min)',
    metroNote: 'Botanical Garden Metro (Blue Line) — 3 km',
    feederContext:
      'Amity International Noida is one of multiple Amity schools across NCR. Strong CBSE Class 12 science cohort, NEET-bound students typically target AIIMS Delhi and Delhi-region medical colleges.',
    tier: 'premium',
  },
  'lotus-valley-international-noida': {
    slug: 'neet-coaching-lotus-valley-international-noida',
    schoolName: 'Lotus Valley International School',
    shortName: 'Lotus Valley Noida',
    city: 'Sector 126, Noida',
    cityHubUrl: '/neet-coaching-noida',
    curriculum: 'CBSE + IGCSE / IB Diploma',
    area: 'Sector 126, Noida',
    nearestCerebrumCentre: 'Noida Sector 62 (12 km · 28 min) · Online preferred',
    metroNote: 'Botanical Garden Metro (Blue Line) — 6 km',
    feederContext:
      'Lotus Valley International is a premium multi-curriculum school in Noida (CBSE + IGCSE + IB Diploma). NEET cohort combines CBSE-stream Class 12 + IB Biology HL students considering Indian medical colleges via NRI quota.',
    tier: 'premium',
  },
  'apeejay-school-faridabad': {
    slug: 'neet-coaching-apeejay-school-faridabad',
    schoolName: 'Apeejay School',
    shortName: 'Apeejay Faridabad',
    city: 'Sector 15, Faridabad',
    cityHubUrl: '/neet-coaching-faridabad',
    curriculum: 'CBSE',
    area: 'Sector 15, Faridabad',
    nearestCerebrumCentre: 'Faridabad Sector 17 (2 km · 8 min)',
    metroNote: 'Bata Chowk Metro (Violet Line) — 2 km',
    feederContext:
      'Apeejay Faridabad is the top-tier CBSE school in Faridabad. Annual NEET cohort feeds AIIMS Delhi, MAMC and Haryana state government medical colleges.',
    tier: 'emerging',
  },
  'delhi-public-school-faridabad': {
    slug: 'neet-coaching-delhi-public-school-faridabad',
    schoolName: 'Delhi Public School (DPS) Faridabad',
    shortName: 'DPS Faridabad',
    city: 'Sector 19, Faridabad',
    cityHubUrl: '/neet-coaching-faridabad',
    curriculum: 'CBSE',
    area: 'Sector 19, Faridabad',
    nearestCerebrumCentre: 'Faridabad Sector 17 (3 km · 10 min)',
    metroNote: 'Bata Chowk Metro (Violet Line) — 3 km',
    feederContext:
      'DPS Faridabad serves the broader Faridabad NCR catchment. Strong Class 12 science cohort with consistent annual NEET selections.',
    tier: 'emerging',
  },
  'dps-ghaziabad': {
    slug: 'neet-coaching-dps-ghaziabad',
    schoolName: 'Delhi Public School (DPS) Ghaziabad',
    shortName: 'DPS Ghaziabad',
    city: 'Vasundhara / Indirapuram, Ghaziabad',
    cityHubUrl: '/neet-coaching-ghaziabad',
    curriculum: 'CBSE',
    area: 'Vasundhara, Ghaziabad',
    nearestCerebrumCentre: 'Noida Sector 62 (10 km · 25 min) · Online',
    metroNote: 'Vaishali Metro (Blue Line) — 4 km',
    feederContext:
      'DPS Ghaziabad serves Vasundhara, Indirapuram and broader Ghaziabad. Strong Class 12 science feeder; NEET cohort typically targets Delhi-region and UP-state medical colleges.',
    tier: 'emerging',
  },
}

export function buildNEETFeederSchoolConfig(key: NEETFeederSchoolKey): BestVerticalConfig {
  const s = neetFeederSchools[key]
  return {
    slug: s.slug,
    headline: `NEET Coaching for ${s.shortName} Students`,
    ribbon: `${s.curriculum} · ${s.area} · AIIMS-Trained Faculty`,
    subheadline: `Biology-only NEET coaching for ${s.schoolName} Class 11–12 students.`,
    intro: `${s.feederContext} Cerebrum Biology Academy offers AIIMS-trained NEET biology coaching tailored to the ${s.curriculum} curriculum at ${s.shortName}, with small batches of 15–20 students and direct mentorship from Dr. Shekhar C Singh (AIIMS Delhi alumnus).`,
    clusterSummary: `${s.nearestCerebrumCentre} · ${s.metroNote} · Online live classes also available pan-India`,
    credentials: [
      { label: `${s.curriculum} Curriculum-Aligned` },
      { label: 'AIIMS-Trained Faculty' },
      { label: 'Small Batches 15–20' },
      { label: 'NCERT Line-by-Line' },
      { label: '680+ Medical College Selections' },
      { label: '98% NEET Qualification Rate' },
      { label: 'Weekly Mocks + Solutions' },
      { label: 'WhatsApp Same-Day Doubts' },
    ],
    pages: [
      { title: `${s.city} Hub`, href: s.cityHubUrl },
      { title: 'Best NEET Coaching India', href: '/best-neet-biology-coaching-india' },
      { title: 'Best Biology Teacher for NEET', href: '/best-biology-teacher-for-neet' },
      { title: 'Best NEET Coaching Near Me', href: '/best-neet-coaching-near-me' },
      { title: 'Biology Tutor for NEET (1:1)', href: '/biology-tutor-for-neet' },
      { title: 'Biology Classes for NEET (Small Batch)', href: '/biology-classes-for-neet' },
      { title: 'RE-NEET 2026 News Hub', href: '/re-neet-2026' },
      { title: 'NRI Quota MBBS Guide', href: '/nri-quota-mbbs' },
      {
        title: 'Dr. Shekhar C Singh — Faculty Profile',
        href: '/dr-shekhar-singh-neet-biology-faculty',
      },
    ],
    pricing: [
      {
        tier: 'Pursuit (Affordable)',
        price: '₹40,000–₹75,000 / year',
        description: `30–40 student batches taught by AIIMS / IIT-trained faculty. Most affordable tier. Good fit for ${s.shortName} Class 11 + 12 students wanting quality NEET prep at a reasonable price.`,
      },
      {
        tier: 'Ascent (Most Popular)',
        price: '₹58,000–₹90,000 / year',
        description: `16–25 student batches with weekly doubt sessions. Most popular tier for ${s.shortName} students balancing CBSE Boards + NEET preparation.`,
      },
      {
        tier: 'Pinnacle (1:1 Premium)',
        price: '₹1,20,000–₹1,56,000 / year',
        description: `10–12 student batches + personal mentorship from Dr. Shekhar C Singh. Best for ${s.shortName} students targeting AIIMS / Top medical college.`,
      },
    ],
    whyBest: [
      {
        title: `${s.curriculum}-Aligned Pacing for ${s.shortName} Students`,
        description: `${s.shortName} follows the ${s.curriculum} curriculum. Cerebrum batches are NCERT-line-by-line and pace-aligned with ${s.curriculum} Class 11 + 12 — no curriculum mismatch. Students can run ${s.curriculum} Boards prep + NEET prep in parallel without conflict.`,
      },
      {
        title: 'AIIMS-Trained Biology-Only Faculty',
        description: `Dr. Shekhar C Singh (AIIMS New Delhi alumnus) leads Cerebrum\'s biology-only coaching. ${s.shortName} students get biology depth that generalist tutoring (Aakash, Allen, FIITJEE) cannot match — the 360/720 NEET Biology section is where Cerebrum compounds value.`,
      },
      {
        title: `Nearest Centre: ${s.nearestCerebrumCentre}`,
        description: `Cerebrum operates 6 Delhi NCR offline centres. For ${s.shortName} students, the closest centre is reachable via ${s.metroNote}. Online live classes also available for students who prefer no-commute learning.`,
      },
      {
        title: 'Small Batches (15–20) vs Mass Coaching',
        description: `${s.shortName} students are academically strong and used to small-class attention at school. Cerebrum\'s 15–20 student batches preserve that environment — vs 150–400 student batches at Aakash, Allen, FIITJEE Delhi NCR.`,
      },
      {
        title: 'Weekly 1:1 Doubt Slots + WhatsApp Same-Day',
        description: `${s.shortName} students juggling Boards + NEET don\'t have time to wait 48 hours for doubt resolution. Cerebrum gives weekly 1:1 doubt slots (Ascent + Pinnacle) plus WhatsApp same-day faculty doubts during the academic year.`,
      },
      {
        title: 'NRI Quota MBBS Guidance (For Eligible Families)',
        description: `Many ${s.shortName} families have NRI status (parent on foreign work visa or OCI cardholder). Cerebrum\'s coaching includes NRI quota MBBS guidance — 15% reserved seats at deemed universities (KMC Manipal, CMC Vellore, SRM, Saveetha) with lower NEET cutoffs.`,
      },
    ],
    testimonials: pickTestimonials(s.slug, s.tier),
    faqs: reorderFAQsByTier(
      [
        {
          question: `What is the best NEET coaching for ${s.shortName} students?`,
          answer: `Cerebrum Biology Academy is widely cited as the best NEET biology coaching for ${s.shortName} students. ${s.curriculum} curriculum-aligned pacing, AIIMS-trained Dr. Shekhar C Singh leading biology pedagogy, small batches of 15–20 students, weekly 1:1 doubt slots. Aakash, Allen, FIITJEE in ${s.city} are generalist alternatives — many ${s.shortName} students pair Cerebrum (Biology) with their existing Physics + Chemistry coaching.`,
        },
        {
          question: `Where is the nearest Cerebrum centre from ${s.shortName}?`,
          answer: `${s.nearestCerebrumCentre}. ${s.metroNote}. Online live classes also available for ${s.shortName} students who prefer no-commute learning.`,
        },
        {
          question: `Does Cerebrum align with ${s.curriculum} Class 11 + 12 pacing at ${s.shortName}?`,
          answer: `Yes. Cerebrum batches are NCERT-line-by-line and pace-aligned with ${s.curriculum}. ${s.shortName} students can run ${s.curriculum} Boards prep + NEET prep in parallel without curriculum mismatch. Class 12 students typically achieve 90+ in ${s.curriculum} Boards Biology while building NEET-pattern depth simultaneously.`,
        },
        {
          question: `What does Cerebrum NEET coaching cost for ${s.shortName} students?`,
          answer: `Pursuit ₹40,000–₹75,000/year (most affordable), Ascent ₹58,000–₹90,000/year (most popular, 16–25 batch + weekly doubt), Pinnacle ₹1,20,000–₹1,56,000/year (10–12 batch + Dr. Shekhar mentorship). EMI plans available. 7-day refund guarantee.`,
        },
        {
          question: `Should I switch from my current coaching for NEET biology?`,
          answer: `Not necessarily. If your current coaching delivers solid biology depth, stay. If biology was a weak section (or you scored < 280/360 in mock biology), add Cerebrum's biology-only crash alongside your existing coaching. Many ${s.shortName} students keep Aakash and Allen / FIITJEE for Physics + Chemistry and add Cerebrum specifically for Biology.`,
        },
        {
          question: `Do you provide NRI quota MBBS guidance?`,
          answer: `Yes. Many ${s.shortName} families have NRI status (parent on foreign work visa or OCI cardholder). Cerebrum provides academic guidance on NRI quota MBBS — eligible colleges (KMC Manipal, CMC Vellore, SRM, Saveetha), NEET cutoffs, documentation. See /nri-quota-mbbs for the full guide. We do not provide visa / immigration / legal services — handled by licensed consultants.`,
        },
        {
          question: `Is RE-NEET 2026 affecting ${s.shortName} students?`,
          answer: `Yes — NEET-UG 2026 was cancelled by NTA on 12 May 2026 after a Rajasthan paper-leak investigation. A reconduct (RE-NEET 2026) is confirmed for all ~22 lakh affected candidates including ${s.shortName} Class 12 students. New exam date pending NTA notification. See /re-neet-2026 for the full timeline + crash course.`,
        },
        {
          question: `Can I book a free demo class?`,
          answer: `Yes — free demo class at the nearest Cerebrum centre or online. No obligation to enrol. WhatsApp +91 88264-44334 or call directly. Demo runs 45–60 minutes with an AIIMS-led Biology faculty member.`,
        },
        ...tierBonusFAQs(s.tier, s.shortName),
      ],
      s.tier
    ),
    knowsAbout: [
      `NEET Coaching for ${s.shortName}`,
      `${s.curriculum} NEET Coaching`,
      `${s.city} NEET Coaching`,
      'NCERT Class 11 Biology',
      'NCERT Class 12 Biology',
      'AIIMS-Trained NEET Coaching',
      'Small-Batch NEET Coaching',
      'Biology-Only NEET Specialist',
      'NRI Quota MBBS',
    ],
    whatsappMessage: `Hi! I'm a student / parent from ${s.schoolName}. Please share NEET biology coaching details and demo class timings.`,
  }
}
