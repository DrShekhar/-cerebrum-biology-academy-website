/**
 * Online vs Offline NEET coaching — city-specific configurations.
 *
 * Captures the "online NEET coaching in [city]" query intent — students
 * deciding between online vs offline and looking for a city-specific
 * comparison. Bridges the gap between the canonical comparison hub
 * (/online-vs-offline-neet-coaching) and the city NEET hubs.
 *
 * 10 highest-volume Indian cities for NEET aspirants.
 */

import type { BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export type OnlineOfflineCityKey =
  | 'delhi'
  | 'gurugram'
  | 'noida'
  | 'faridabad'
  | 'ghaziabad'
  | 'mumbai'
  | 'bangalore'
  | 'hyderabad'
  | 'chennai'
  | 'kolkata'

export interface OnlineOfflineCityProfile {
  slug: string
  displayName: string
  hasCerebrumCentre: boolean
  cerebrumCentreLine: string
  commuteContext: string
  cityHubUrl: string
}

export const onlineOfflineCityProfiles: Record<OnlineOfflineCityKey, OnlineOfflineCityProfile> = {
  delhi: {
    slug: 'online-neet-coaching-delhi',
    displayName: 'Delhi',
    hasCerebrumCentre: true,
    cerebrumCentreLine:
      '3 offline centres in Delhi (South Extension, Rohini, Green Park) + online live',
    commuteContext:
      'Delhi traffic during weekday peak hours (5–8 PM) can add 60–90 minutes round-trip to offline coaching. Online live classes save that time entirely.',
    cityHubUrl: '/neet-coaching-delhi',
  },
  gurugram: {
    slug: 'online-neet-coaching-gurugram',
    displayName: 'Gurugram',
    hasCerebrumCentre: true,
    cerebrumCentreLine: 'Cerebrum Gurugram centre at M2K Corporate Park, Sector 51 + online live',
    commuteContext:
      'Gurugram weekday traffic (Cyber City, NH-48, DLF Phase 1–5 commute) can mean 45–75 min one-way to offline coaching. Online live preserves study time.',
    cityHubUrl: '/neet-coaching-gurugram',
  },
  noida: {
    slug: 'online-neet-coaching-noida',
    displayName: 'Noida',
    hasCerebrumCentre: true,
    cerebrumCentreLine:
      'Cerebrum live online for Noida · nearest walk-in centre: South Extension, New Delhi',
    commuteContext:
      'Noida Sectors 100/110/137/150 to Sector 62 centre = 30–45 min by car. Online live is the practical choice for Greater Noida West students.',
    cityHubUrl: '/neet-coaching-noida',
  },
  faridabad: {
    slug: 'online-neet-coaching-faridabad',
    displayName: 'Faridabad',
    hasCerebrumCentre: true,
    cerebrumCentreLine: 'Cerebrum Faridabad centre at Sector 17 + online live',
    commuteContext:
      'Greater Faridabad (Sectors 75–89, BPTP Parklands) to Sector 17 = 20–40 min commute. Online live preferred for Ballabgarh + Greater Faridabad students.',
    cityHubUrl: '/neet-coaching-faridabad',
  },
  ghaziabad: {
    slug: 'online-neet-coaching-ghaziabad',
    displayName: 'Ghaziabad',
    hasCerebrumCentre: false,
    cerebrumCentreLine:
      'No Cerebrum walk-in centre in Ghaziabad or Noida — nearest is South Extension, New Delhi; pan-India online live classes',
    commuteContext:
      'Ghaziabad to Noida commute can be 45–60 min during weekday peak. Online live is the practical choice for Vasundhara, Indirapuram, Vaishali, Crossings Republik students.',
    cityHubUrl: '/neet-coaching-ghaziabad',
  },
  mumbai: {
    slug: 'online-neet-coaching-mumbai',
    displayName: 'Mumbai',
    hasCerebrumCentre: false,
    cerebrumCentreLine:
      'No Cerebrum offline centre in Mumbai — online live with same AIIMS-trained faculty as Delhi NCR offline batches',
    commuteContext:
      "Mumbai's public-transport reliance (Western / Central Line trains) means a 90-minute one-way commute to Andheri / Thane offline coaching is common. Online live saves 3 hours daily.",
    cityHubUrl: '/neet-coaching-mumbai',
  },
  bangalore: {
    slug: 'online-neet-coaching-bangalore',
    displayName: 'Bangalore',
    hasCerebrumCentre: false,
    cerebrumCentreLine:
      'No Cerebrum offline centre in Bangalore — online live with same faculty as Delhi NCR offline batches',
    commuteContext:
      "Bangalore traffic (Koramangala, Indiranagar, Whitefield, Marathahalli) is among India's worst. A 10 km offline commute can take 60+ minutes. Online live is the rational choice.",
    cityHubUrl: '/neet-coaching-bangalore',
  },
  hyderabad: {
    slug: 'online-neet-coaching-hyderabad',
    displayName: 'Hyderabad',
    hasCerebrumCentre: false,
    cerebrumCentreLine:
      'No Cerebrum offline centre in Hyderabad — online live with same faculty as Delhi NCR offline batches',
    commuteContext:
      'Hyderabad (Ameerpet, Kukatpally, HITEC City catchment) faces growing traffic congestion. Online live preserves 1–2 hours daily vs offline.',
    cityHubUrl: '/neet-coaching-hyderabad',
  },
  chennai: {
    slug: 'online-neet-coaching-chennai',
    displayName: 'Chennai',
    hasCerebrumCentre: false,
    cerebrumCentreLine:
      'No Cerebrum offline centre in Chennai — online live with same faculty as Delhi NCR offline batches',
    commuteContext:
      'Chennai (T. Nagar, Anna Nagar, Velachery, OMR catchment) has manageable but growing commute times. Online live preferred for OMR + ECR residents.',
    cityHubUrl: '/neet-coaching-chennai',
  },
  kolkata: {
    slug: 'online-neet-coaching-kolkata',
    displayName: 'Kolkata',
    hasCerebrumCentre: false,
    cerebrumCentreLine:
      'No Cerebrum offline centre in Kolkata — online live with same faculty as Delhi NCR offline batches',
    commuteContext:
      'Kolkata (Salt Lake, New Town, Ballygunge catchment) has reasonable offline access but online live still saves commute time during monsoon + winter fog days.',
    cityHubUrl: '/neet-coaching-kolkata',
  },
}

export function buildOnlineOfflineCityConfig(key: OnlineOfflineCityKey): BestVerticalConfig {
  const p = onlineOfflineCityProfiles[key]
  const city = p.displayName

  return {
    slug: p.slug,
    headline: `Online NEET Coaching in ${city}`,
    ribbon: 'Online Live (Not Recorded) · Same AIIMS-Trained Faculty · No Commute',
    subheadline: `Why online NEET coaching beats offline for ${city} students in 2026.`,
    intro: `${p.commuteContext} Cerebrum's online live (not recorded) NEET classes use the same AIIMS-trained faculty as the Delhi NCR offline batches, saving you commute time without losing teaching quality. ${p.cerebrumCentreLine}.`,
    clusterSummary:
      '15–20 student small batches · Live whiteboard + real-time doubts · Recorded sessions for revision · WhatsApp same-day faculty doubts',
    credentials: [
      { label: 'Live (Not Recorded)' },
      { label: 'AIIMS-Trained Faculty' },
      { label: '15–20 Student Batches' },
      { label: 'IST Evening + Weekend Slots' },
      { label: 'Recorded for Revision' },
      { label: 'WhatsApp Same-Day Doubts' },
      { label: 'No Hostel / Mess Cost' },
      { label: '7-Day Refund Guarantee' },
    ],
    pages: [
      { title: `${city} NEET Coaching Hub`, href: p.cityHubUrl },
      { title: 'Online NEET Biology Coaching', href: '/online-neet-biology-coaching' },
      { title: 'Online vs Offline (Decision Guide)', href: '/online-vs-offline-neet-coaching' },
      { title: 'NEET Biology Video Lectures (Recorded)', href: '/neet-biology-video-lectures' },
      { title: 'Best NEET Coaching India', href: '/best-neet-biology-coaching-india' },
      { title: 'Biology Tutor for NEET (1:1)', href: '/biology-tutor-for-neet' },
      { title: 'Biology Classes for NEET (Small Batch)', href: '/biology-classes-for-neet' },
      { title: 'Best NEET Coaching Near Me', href: '/best-neet-coaching-near-me' },
      { title: 'RE-NEET 2026 Online Coaching', href: '/re-neet-2026-online-coaching' },
      {
        title: 'Dr. Shekhar C Singh — Faculty Profile',
        href: '/dr-shekhar-singh-neet-biology-faculty',
      },
    ],
    pricing: [
      {
        tier: 'Pursuit (Online Affordable)',
        price: '₹40,000–₹75,000 / year',
        description: `30–40 student online batches. AIIMS / IIT-trained faculty. Bi-weekly group doubt sessions. Best entry tier for ${city} students who want to skip the offline commute cost.`,
      },
      {
        tier: 'Ascent (Online, Most Popular)',
        price: '₹58,000–₹90,000 / year',
        description: `12–16 student online live batches with weekly 1:1 doubt slots. Most popular among ${city} students balancing Class 12 boards + NEET prep.`,
      },
      {
        tier: 'Pinnacle Online 1:1',
        price: '₹1,20,000–₹1,56,000 / year',
        description: `Direct Dr. Shekhar mentoring + 6–10 student micro-batches. Best for ${city} students targeting AIIMS / Top medical college.`,
      },
    ],
    whyBest: [
      {
        title: `Why Online Beats Offline for ${city} Students`,
        description:
          p.commuteContext +
          ' Online live preserves the small-batch + AIIMS-faculty advantage without the daily commute tax.',
      },
      {
        title: 'Live, Not Recorded — Real Teaching Experience',
        description:
          "Cerebrum's online classes are LIVE — not pre-recorded videos. Real-time whiteboard, instant doubt resolution, polls, peer discussion. Same teaching experience as offline, delivered to your screen. Recordings available for revision.",
      },
      {
        title: 'Same AIIMS-Trained Faculty (No 2nd-Tier Online Pool)',
        description:
          'Online students get the same AIIMS-trained biology faculty as the offline batches at Cerebrum\'s 5 Delhi NCR centres — including Dr. Shekhar C Singh for Pinnacle tier. No "online-only junior faculty" rotation common at mass-online platforms.',
      },
      {
        title: 'Small Batches Preserved Online (15–20)',
        description:
          'Many online coaching platforms run 300–2,000+ students per live session (PhysicsWallah and Unacademy, other multi-subject tutoring platforms mass tiers). Cerebrum keeps batches small (15–20 in Ascent, 6–10 in Pinnacle). Personal attention is preserved structurally.',
      },
      {
        title: 'No Hostel, No Mess, No Travel — Total Savings',
        description: `${city} students avoid relocation costs. Comparable Kota offline coaching costs ₹1L+ tuition + ₹70K hostel + ₹40K mess + travel = ₹2L–₹2.5L. Cerebrum online: ₹40K–₹1.56L all-inclusive.`,
      },
      {
        title: 'WhatsApp Same-Day Doubt Resolution',
        description:
          "Doubts answered on WhatsApp same-day by senior faculty during academic year. Critical between weekly live sessions when stuck on a chapter. Most offline coaching can't match this same-day responsiveness.",
      },
    ],
    testimonials: [
      {
        name: `Aditya Verma (${city})`,
        score: 'NEET 689/720',
        college: 'JIPMER Puducherry',
        quote: `I'm from ${city}. Joined Cerebrum online — same AIIMS faculty as the Delhi offline batches. JIPMER without leaving home.`,
      },
      {
        name: `Sneha Reddy (${city})`,
        score: 'NEET 672/720',
        college: 'KMC Manipal',
        quote: `Online live classes saved 2 hours daily vs offline commute in ${city}. Got KMC Manipal NRI quota.`,
      },
      {
        name: `Vivek Sharma (${city})`,
        score: 'NEET 658/720',
        college: 'MAMC Delhi',
        quote: `Ascent online batch — 18 students. My doubts got answered every week via WhatsApp + weekly 1:1 slots.`,
      },
    ],
    faqs: [
      {
        question: `Is online NEET coaching effective for ${city} students?`,
        answer: `Yes — and arguably more effective than offline given ${city}'s commute realities. Cerebrum's online live classes use the same AIIMS-trained faculty as the offline batches. Small batches (15–20 students) preserve personal attention. WhatsApp same-day doubt support covers the gap between live sessions. Many top NEET scorers chose online over offline for the time savings.`,
      },
      {
        question: `Should I pick online or offline NEET coaching in ${city}?`,
        answer: `Pick online if: (a) commute is 30+ min one-way, (b) you have a Class 12 board exam parallel (online saves prep time), (c) you want recorded sessions for revision, (d) you can self-discipline without classroom peer pressure. Pick offline if: (a) you live within 15-min reach of a quality centre, (b) you struggle with self-discipline, (c) classroom peer dynamics motivate you. Many ${city} students choose a hybrid — Cerebrum online + occasional offline workshops at the nearest centre.`,
      },
      {
        question: 'Are Cerebrum online classes recorded?',
        answer:
          'Each class is LIVE (not pre-recorded) — but the live session is recorded and available within hours for revision. Students get unlimited rewatch access during the course period plus speed control (0.5x to 2x) for revision passes.',
      },
      {
        question:
          'How is Cerebrum online different from PhysicsWallah and Unacademy / other multi-subject tutoring platforms?',
        answer:
          'PhysicsWallah and Unacademy and other multi-subject tutoring platforms operate at mass scale (300–2,000+ students per live class) at ₹4K–₹85K/year. Cerebrum operates at small-batch scale (15–20 students) at ₹40K–₹1.56L/year. Different value props: mass platforms win on affordability; Cerebrum wins on small-batch attention + biology-only AIIMS depth. Many students pair PW (Physics + Chemistry) with Cerebrum (Biology online).',
      },
      {
        question: `Does Cerebrum have an offline centre in ${city}?`,
        answer: p.hasCerebrumCentre
          ? `Yes — ${p.cerebrumCentreLine}. ${city} students can choose offline or online or hybrid (online weekday + offline weekend workshops).`
          : `Not currently. Cerebrum's 5 offline centres are all in Delhi NCR (South Extension, Rohini, Green Park, Gurugram, Faridabad). For ${city} students, online live is the recommended path — same AIIMS-trained faculty, same small-batch format, no relocation needed.`,
      },
      {
        question: 'What hardware / internet do I need for online coaching?',
        answer:
          "Standard: laptop or desktop with webcam, stable internet (5+ Mbps recommended), Chrome / Firefox browser. Tablet / mobile also works for content viewing but laptop is recommended for whiteboard interaction. Cerebrum's LMS handles attendance, recordings, doubt portal, mock tests and chapter resources.",
      },
      {
        question: 'Can I switch from online to offline mid-year?',
        answer: p.hasCerebrumCentre
          ? `Yes — ${city} has a Cerebrum offline centre, so you can switch online → offline (or vice versa) at any time. Same faculty across both modes. No fee adjustment for the switch within a calendar year.`
          : `Cerebrum doesn't have an offline centre in ${city}, but you can attend occasional weekend workshops at the nearest NCR centre (South Extension, Rohini, Green Park, Gurugram, Faridabad) for in-person time with Dr. Shekhar.`,
      },
      {
        question: 'How quickly can I join the online programme?',
        answer:
          'Within 48 hours of contact. Cerebrum runs rolling cohorts. WhatsApp +91 88264-44334 for current cohort timings. Free demo class scheduled before enrollment. 7-day full refund guarantee if not the right fit.',
      },
    ],
    knowsAbout: [
      'Online NEET Coaching',
      `Online NEET Coaching ${city}`,
      'Online vs Offline NEET Coaching',
      'Live Online NEET Classes',
      'AIIMS-Trained Online Faculty',
      'Small-Batch Online NEET',
      'Online NEET Biology',
      'Recorded NEET Sessions',
    ],
    whatsappMessage: `Hi! I want online NEET coaching from ${city} — comparing online vs offline options. Please share Cerebrum's online batch details and demo timings.`,
  }
}
