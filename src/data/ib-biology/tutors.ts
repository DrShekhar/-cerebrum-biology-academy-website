/**
 * IB Biology tutor directory.
 *
 * Tier system drives pricing tier + Person schema + visible trust
 * signals. Update the `credentials` field when a tutor earns a new
 * qualification so the Person JSON-LD stays accurate.
 */

export type TutorTier = 'Examiner' | 'Qualified Teacher' | 'Academic Tutor'

export type TutorSlug =
  | 'dr-shekhar-singh'
  | 'dr-priya-menon'
  | 'mr-james-hartley'
  | 'ms-aditi-rao'
  | 'mr-daniel-carter'
  | 'dr-sofia-alvarez'
  | 'ms-ishita-bose'
  | 'mr-arjun-patel'

export interface Tutor {
  slug: TutorSlug
  name: string
  tier: TutorTier
  hourlyRateUSD: number
  credentials: string[]
  specialties: string[]
  timezones: string[]
  languages: string[]
  yearsExperience: number
  studentsSupported: number
  bio: string
  philosophy: string
  availableForDemo: boolean
}

export const tutors: Record<TutorSlug, Tutor> = {
  'dr-shekhar-singh': {
    slug: 'dr-shekhar-singh',
    name: 'Dr. Shekhar Singh',
    tier: 'Examiner',
    hourlyRateUSD: 165,
    credentials: [
      'AIIMS Delhi alumni',
      'PhD in Biology',
      'Former IB Biology examiner',
      '15+ years teaching experience',
    ],
    specialties: [
      'IB Biology HL examiner training',
      'Medicine pathway advisory',
      'IA criterion-referenced feedback',
      'Paper 2 extended response',
    ],
    timezones: ['IST', 'GST', 'BST', 'EST'],
    languages: ['English', 'Hindi'],
    yearsExperience: 15,
    studentsSupported: 500,
    bio: 'Dr. Shekhar Singh is the founder and lead IB Biology faculty at Cerebrum Biology Academy. An AIIMS-trained physician and former IB Biology examiner, he has personally coached students to 7s in IB Biology at schools across Singapore, Dubai, London, and New Delhi.',
    philosophy:
      'IB Biology is learnable. The 7-scoring pattern is not innate talent — it is a combination of clean IA writing, examiner-accurate command-term use, and mechanism-grounded answers. My coaching focuses on the specific student habits that convert 5s into 7s.',
    availableForDemo: true,
  },
  'dr-priya-menon': {
    slug: 'dr-priya-menon',
    name: 'Dr. Priya Menon',
    tier: 'Examiner',
    hourlyRateUSD: 155,
    credentials: [
      'PhD in Cell Biology',
      'Former IB Biology examiner (IA moderator)',
      'IB workshop leader',
      '12+ years experience',
    ],
    specialties: [
      'Internal Assessment design',
      'Statistical analysis of IA data',
      'Molecular biology (Theme D)',
      'EE supervision',
    ],
    timezones: ['IST', 'SGT', 'GST'],
    languages: ['English', 'Malayalam'],
    yearsExperience: 12,
    studentsSupported: 240,
    bio: 'Dr. Priya Menon specialises in Internal Assessment moderation. As a former IA moderator for IB, she brings criterion-referenced feedback grounded in the exact language examiners use — especially for Research Design and Data Analysis.',
    philosophy:
      "A strong IA is a student's single biggest unlock in IB Biology. I help students build an IA structure that maps 1:1 to the 2025 rubric so no marks are left on the table.",
    availableForDemo: true,
  },
  'mr-james-hartley': {
    slug: 'mr-james-hartley',
    name: 'Mr. James Hartley',
    tier: 'Qualified Teacher',
    hourlyRateUSD: 90,
    credentials: [
      'PGCE (UK)',
      '10 years teaching IB Biology at international schools',
      'Currently teaching at an IB World School in London',
    ],
    specialties: [
      'UK university admissions',
      'Paper 1 MCQ strategy',
      'Evolution and genetics',
      'Year 1 → Year 2 transition coaching',
    ],
    timezones: ['GMT', 'BST', 'CET'],
    languages: ['English'],
    yearsExperience: 10,
    studentsSupported: 180,
    bio: 'James is a UK-qualified Biology teacher currently based in London. He has taught IB Biology at two international schools, including a decade at Southbank International School where he led the Year 13 cohort.',
    philosophy:
      "I treat coaching sessions like intensive 1:1 classroom teaching — interactive, question-heavy, and matched to each student's school calendar.",
    availableForDemo: true,
  },
  'ms-aditi-rao': {
    slug: 'ms-aditi-rao',
    name: 'Ms. Aditi Rao',
    tier: 'Qualified Teacher',
    hourlyRateUSD: 85,
    credentials: ['MSc Biochemistry', '8 years IB Biology teaching', 'IB certified teacher'],
    specialties: [
      'Biochemistry (Theme B)',
      'Enzyme kinetics IA topics',
      'Medical school applications (UK/India)',
      'HL curriculum depth',
    ],
    timezones: ['IST', 'GST'],
    languages: ['English', 'Hindi', 'Kannada'],
    yearsExperience: 8,
    studentsSupported: 150,
    bio: 'Aditi brings a biochemistry research background to IB Biology tutoring. She is particularly strong on the molecular and enzyme topics in Theme B and is a go-to tutor for IAs on enzyme kinetics.',
    philosophy:
      'Every IB Biology topic has a "why" beneath the content. If I can get a student to see the mechanism, the memorisation problem disappears on its own.',
    availableForDemo: true,
  },
  'mr-daniel-carter': {
    slug: 'mr-daniel-carter',
    name: 'Mr. Daniel Carter',
    tier: 'Academic Tutor',
    hourlyRateUSD: 55,
    credentials: [
      'BSc (Hons) Biological Sciences',
      'Full IB Diploma 44/45',
      'IB Biology HL 7/7',
      '4 years tutoring',
    ],
    specialties: [
      'Revision sessions',
      'MCQ practice',
      'HL option content review',
      'Peer-style explanations',
    ],
    timezones: ['EST', 'PST', 'GMT'],
    languages: ['English'],
    yearsExperience: 4,
    studentsSupported: 70,
    bio: 'Daniel graduated the IB Diploma himself with 44/45 and a 7 in Biology HL. He brings the perspective of having recently taken the 2025-style papers and knows the student experience intimately.',
    philosophy:
      'I still remember exactly which IB Biology topics confused me as a student. That is the value I bring — not deep research depth, but the ability to explain hard topics in the way I wish someone had explained them to me.',
    availableForDemo: true,
  },
  'dr-sofia-alvarez': {
    slug: 'dr-sofia-alvarez',
    name: 'Dr. Sofia Alvarez',
    tier: 'Examiner',
    hourlyRateUSD: 160,
    credentials: [
      'PhD Ecology & Conservation',
      'Former IB Biology Paper 2 marker',
      'Published researcher',
      '14 years experience',
    ],
    specialties: [
      'Ecology IAs (Theme C/A)',
      'Climate change data IAs',
      'Paper 2 long-response marking',
      'Database-based investigations',
    ],
    timezones: ['CET', 'BST', 'EST'],
    languages: ['English', 'Spanish'],
    yearsExperience: 14,
    studentsSupported: 200,
    bio: 'Sofia brings an ecology and climate-science research background to IB Biology coaching. She is particularly strong on ecosystem-scale IAs and database-driven investigations using NOAA, HadCRUT, and citizen-science data.',
    philosophy:
      'IB Biology in 2025 is genuinely engaging at the ecosystem scale — climate, biodiversity, evolutionary biology. I help students pick IA and EE topics that connect to real-world research.',
    availableForDemo: true,
  },
  'ms-ishita-bose': {
    slug: 'ms-ishita-bose',
    name: 'Ms. Ishita Bose',
    tier: 'Qualified Teacher',
    hourlyRateUSD: 85,
    credentials: [
      'MSc Human Physiology',
      '7 years IB/IGCSE teaching',
      'IB DP teacher at an international school in Dubai',
    ],
    specialties: [
      'Human physiology (Theme C)',
      'Pre-medical pathway',
      'HSC/IB dual candidates',
      'Year 1 IB foundations',
    ],
    timezones: ['GST', 'IST', 'SGT'],
    languages: ['English', 'Hindi', 'Bengali'],
    yearsExperience: 7,
    studentsSupported: 120,
    bio: 'Ishita teaches IB Biology full-time at an international school in Dubai and tutors in the evenings. She is particularly strong on human physiology and is a go-to coach for pre-med-bound students.',
    philosophy:
      'The content volume in IB Biology HL is the biggest barrier for most students. I structure my sessions around spaced revision and exam-style questions, not re-lecturing.',
    availableForDemo: true,
  },
  'mr-arjun-patel': {
    slug: 'mr-arjun-patel',
    name: 'Mr. Arjun Patel',
    tier: 'Academic Tutor',
    hourlyRateUSD: 50,
    credentials: [
      'MBBS (in progress)',
      'IB Biology HL 7',
      'NEET AIR top 1% scorer',
      '3 years tutoring',
    ],
    specialties: [
      'IB-to-NEET bridge coaching',
      'Human physiology intensive',
      'Revision sessions',
      'Mock paper marking',
    ],
    timezones: ['IST', 'GST'],
    languages: ['English', 'Hindi', 'Gujarati'],
    yearsExperience: 3,
    studentsSupported: 60,
    bio: 'Arjun is a medical student who completed the IB Diploma with a 7 in Biology HL and then cracked NEET in the top 1%. He bridges the two worlds — perfect for students who want IB + NEET preparation.',
    philosophy:
      "The IB-to-NEET overlap is bigger than most students think, but the mindset shift is real. I coach students to switch between IB Biology's research focus and NEET's speed and accuracy mindset.",
    availableForDemo: true,
  },
}

export function tutorSlugs(): TutorSlug[] {
  return Object.keys(tutors) as TutorSlug[]
}

export function getTutor(slug: string): Tutor | null {
  if (!Object.prototype.hasOwnProperty.call(tutors, slug)) return null
  return tutors[slug as TutorSlug]
}

export function tutorsByTier(tier: TutorTier): Tutor[] {
  return Object.values(tutors).filter((t) => t.tier === tier)
}

export const tierPricing: Record<
  TutorTier,
  { range: string; description: string; whoFor: string }
> = {
  Examiner: {
    range: '$130–180/hr',
    description: 'Current or former IB Biology examiners and markers. Highest tier.',
    whoFor: 'Students targeting 6–7, IA moderation-level feedback, or EE supervision.',
  },
  'Qualified Teacher': {
    range: '$70–100/hr',
    description: 'IB-certified Biology teachers with ≥5 years of classroom experience.',
    whoFor:
      'Students wanting structured topic teaching, Paper 2 extended response, or UK/US medical school prep.',
  },
  'Academic Tutor': {
    range: '$40–60/hr',
    description: 'Recent IB graduates and BSc/MSc holders who scored 7 in IB Biology.',
    whoFor: 'Students wanting revision support, MCQ practice, or affordable weekly tutoring.',
  },
}
