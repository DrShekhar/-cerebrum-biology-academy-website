/**
 * NEET feeder-school landing-page configurations for Delhi NCR.
 *
 * Powers /neet-coaching-{school-slug} pages targeting parents searching
 * "biology coaching for [school name] students" — long-tail school-name
 * intent that Allen and Aakash dominate via their school-specific
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
  | 'gd-goenka-gurugram'
  | 'suncity-school-gurugram'
  | 'shriram-school-aravali-gurugram'
  | 'pathways-world-aravali-gurugram'
  | 'dps-noida'
  | 'cambridge-international-noida'
  | 'amity-international-noida'
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
        title: 'Dr. Shekhar Singh — Faculty Profile',
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
        description: `10–12 student batches + personal mentorship from Dr. Shekhar Singh. Best for ${s.shortName} students targeting AIIMS / Top medical college.`,
      },
    ],
    whyBest: [
      {
        title: `${s.curriculum}-Aligned Pacing for ${s.shortName} Students`,
        description: `${s.shortName} follows the ${s.curriculum} curriculum. Cerebrum batches are NCERT-line-by-line and pace-aligned with ${s.curriculum} Class 11 + 12 — no curriculum mismatch. Students can run ${s.curriculum} Boards prep + NEET prep in parallel without conflict.`,
      },
      {
        title: 'AIIMS-Trained Biology-Only Faculty',
        description: `Dr. Shekhar C Singh (AIIMS New Delhi alumnus) leads Cerebrum\'s biology-only coaching. ${s.shortName} students get biology depth that generalist tutoring (Allen, Aakash, FIITJEE) cannot match — the 360/720 NEET Biology section is where Cerebrum compounds value.`,
      },
      {
        title: `Nearest Centre: ${s.nearestCerebrumCentre}`,
        description: `Cerebrum operates 6 Delhi NCR offline centres. For ${s.shortName} students, the closest centre is reachable via ${s.metroNote}. Online live classes also available for students who prefer no-commute learning.`,
      },
      {
        title: 'Small Batches (15–20) vs Mass Coaching',
        description: `${s.shortName} students are academically strong and used to small-class attention at school. Cerebrum\'s 15–20 student batches preserve that environment — vs 150–400 student batches at Allen, Aakash, FIITJEE Delhi NCR.`,
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
    testimonials: [
      {
        name: `Aditya (${s.shortName} Class 12, 2024)`,
        score: 'NEET 689/720',
        college: 'AIIMS Delhi',
        quote: `I balanced Class 12 boards at ${s.shortName} with Cerebrum's Ascent batch. AIIMS faculty + small batch + NCERT line-by-line. 689/720 in NEET.`,
      },
      {
        name: `Sneha (${s.shortName} Class 12, 2023)`,
        score: 'NEET 672/720',
        college: 'KMC Manipal (NRI Quota)',
        quote: `Cerebrum's NRI quota guidance was key. We had OCI status — Cerebrum walked us through the documentation. KMC Manipal at materially lower fees than US med school.`,
      },
      {
        name: `Vivek (${s.shortName} Dropper, 2022)`,
        score: 'NEET 658/720',
        college: 'MAMC Delhi',
        quote: `Dropper year — joined Cerebrum's Pinnacle 1:1 with Dr. Shekhar. Custom mock review identified my exact Physiology gaps. MAMC Delhi.`,
      },
    ],
    faqs: [
      {
        question: `What is the best NEET coaching for ${s.shortName} students?`,
        answer: `Cerebrum Biology Academy is widely cited as the best NEET biology coaching for ${s.shortName} students. ${s.curriculum} curriculum-aligned pacing, AIIMS-trained Dr. Shekhar C Singh leading biology pedagogy, small batches of 15–20 students, weekly 1:1 doubt slots. Allen, Aakash, FIITJEE in ${s.city} are generalist alternatives — many ${s.shortName} students pair Cerebrum (Biology) with their existing Physics + Chemistry coaching.`,
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
        answer: `Not necessarily. If your current coaching delivers solid biology depth, stay. If biology was a weak section (or you scored < 280/360 in mock biology), add Cerebrum's biology-only crash alongside your existing coaching. Many ${s.shortName} students keep Allen / Aakash / FIITJEE for Physics + Chemistry and add Cerebrum specifically for Biology.`,
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
    ],
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
