/**
 * Enrollment-season programs — single source of truth (NEET 2027 cycle).
 *
 * Drives the Biology Scholarship Test (CBST) funnel and the program landing
 * pages (dropper / class 11 / foundation). Edit fees and slabs HERE; every
 * page reads from this file so numbers can never drift apart.
 *
 * PRICING NOTE (owner): the program fees below are RECOMMENDED defaults derived
 * from the Jun 2026 market research (see ENROLLMENT_PROGRAMS_STRATEGY.md) under
 * the standing "~10% below market, slightly better service" rule. They are
 * online, biology-focused programmes — far below full-PCB offline courses
 * (₹1.3L–₹2.2L). Confirm/adjust before going live.
 *
 * SCHOLARSHIP slabs (owner-approved Jun 2026): free online test, online-rewarded,
 * up to 100% for the few top ranks, tapering 100 / 75 / 50 / 30 / 20.
 */

export interface ScholarshipSlab {
  /** display label for the rank/score band */
  band: string
  /** percent off Cerebrum online biology programmes */
  discount: number
  note: string
}

/** Transparent rank → scholarship-% table (a trust edge no major player publishes). */
export const CBST_SLABS: ScholarshipSlab[] = [
  {
    band: 'All-India Rank 1–10',
    discount: 100,
    note: 'Full scholarship — free online biology programme',
  },
  { band: 'Rank 11–50', discount: 75, note: '75% off any online biology programme' },
  { band: 'Rank 51–200', discount: 50, note: '50% off' },
  { band: 'Top 10 percentile', discount: 30, note: '30% off' },
  { band: 'Top 25 percentile', discount: 20, note: '20% off' },
  {
    band: 'All other participants',
    discount: 10,
    note: '10% participation scholarship + free diagnostic report',
  },
]

export interface ProgramTier {
  id: string
  name: string
  subtitle: string
  priceINR: number
  unit: string
  batchSize: string
  features: string[]
  highlight?: boolean
}

/**
 * NEET 2027 Biology Dropper — online, biology-focused.
 *
 * NOTE: the LIVE flagship page /neet-dropper-biology-specialist-2027 already
 * publishes the owner's real dropper pricing (Pursuit / Ascent / Pinnacle,
 * positioned as a ~6 hr/week biology add-on layer on top of an existing PCM
 * batch). THAT page is the source of truth for the dropper. The tiers below are
 * illustrative defaults for any NEW standalone-online dropper page only, and
 * must be reconciled with the live page before rendering anywhere.
 */
export const DROPPER_2027_TIERS: ProgramTier[] = [
  {
    id: 'self-paced',
    name: 'Self-Paced + Tests',
    subtitle: 'Recorded biology + full test series',
    priceINR: 15000,
    unit: '/ year',
    batchSize: 'Self-paced',
    features: [
      'Full Botany + Zoology recorded course (NEET 2027)',
      'Complete NEET biology test series + auto error analysis',
      'NCERT-line-by-line + high-yield revision',
      'Doubt support via WhatsApp',
    ],
  },
  {
    id: 'live-batch',
    name: 'Live Small Batch',
    subtitle: 'Live AIIMS-faculty classes',
    priceINR: 30000,
    unit: '/ year',
    batchSize: 'Small batch',
    highlight: true,
    features: [
      'Live small-batch Botany + Zoology with AIIMS-trained faculty',
      'Entry diagnostic of your 2026 attempt → personalised weak-chapter plan',
      'Twice-weekly full mocks with deep error analysis',
      'Spaced full-syllabus revision cycles',
      'Recordings of every session',
    ],
  },
  {
    id: 'mentorship',
    name: 'Live + 1:1 Mentorship',
    subtitle: 'Everything + personal mentor',
    priceINR: 45000,
    unit: '/ year',
    batchSize: 'Small batch + 1:1',
    features: [
      'Everything in Live Small Batch',
      'Weekly 1:1 mentorship (academic + the repeat-aspirant mindset)',
      'Personalised weekly targets and accountability',
      'Priority doubt resolution',
    ],
  },
]

/** Batch start dates for the NEET 2027 dropper (after RE-NEET 2026). */
export const DROPPER_2027_BATCHES = [
  { date: '25 June 2026', label: 'Early starter batch' },
  { date: '1 July 2026', label: 'Main batch' },
  { date: '10 July 2026', label: 'Main batch (alt slot)' },
  {
    date: 'August 2026',
    label: 'Post-result batch — for students deciding to drop after RE-NEET 2026 results',
  },
]

/** Class 11 Biology — NEET + Boards together (the biology pillar). */
export const CLASS_11_TIERS: ProgramTier[] = [
  {
    id: 'foundation',
    name: 'Class 11 Biology — Boards Focus',
    subtitle: 'CBSE/state boards + NEET fundamentals',
    priceINR: 24000,
    unit: '/ year',
    batchSize: 'Small batch',
    features: [
      'Full Class 11 NCERT biology mapped to boards AND NEET',
      'Chapter tests + board-pattern practice',
      'AIIMS-trained faculty, live small batch',
    ],
  },
  {
    id: 'neet-integrated',
    name: 'Class 11 Biology — NEET + Boards',
    subtitle: 'Both targets, no compromise',
    priceINR: 36000,
    unit: '/ year',
    batchSize: 'Small batch',
    highlight: true,
    features: [
      'Boards + NEET biology together (45 of 90 NEET bio questions are Class 11)',
      'NEET MCQ practice + board long-answer technique',
      'Continues seamlessly into Class 12',
      'Recordings + doubt support',
    ],
  },
]

/** Class 9–10 Biology Foundation — early lifecycle wedge. */
export const FOUNDATION_TIERS: ProgramTier[] = [
  {
    id: 'foundation-9-10',
    name: 'Class 9–10 Biology Foundation',
    subtitle: 'NCERT + olympiad + early-NEET concepts',
    priceINR: 18000,
    unit: '/ year',
    batchSize: 'Small batch',
    highlight: true,
    features: [
      'Strong NCERT biology base for boards',
      'Biology olympiad + early-NEET concept building',
      'AIIMS-trained faculty, live small batch',
      'Upgrades into Class 11 NEET + Boards',
    ],
  },
]

export const SITE_URL = 'https://cerebrumbiologyacademy.com'
export const CBST_WHATSAPP = '918826444334'
