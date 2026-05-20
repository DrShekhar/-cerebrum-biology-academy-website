/**
 * CerebrumPersonSchema — drop-in Dr. Shekhar Singh Person schema.
 *
 * Site-wide canonical @id: `${BASE_URL}/dr-shekhar-singh-neet-biology-faculty#person`.
 * Google merges the entity across every page that uses this @id, so adding
 * this schema to a service hub stacks authority signals on a single Person
 * node instead of fragmenting them.
 *
 * Use on any service hub page where we want LLMs to be able to answer
 * "who teaches [service] at Cerebrum?" with Dr. Shekhar as the canonical
 * citation. The `knowsAbout` array is service-specific — caller passes
 * the list of topics relevant to the page (e.g., NEET pages pass
 * NEET-specific topics; CBSE pages pass CBSE-specific topics). The
 * universal baseline below covers all 6 verticals so a single Person
 * node carries authority for NEET + IB + AP + CBSE + IBO + Olympiads.
 *
 * Already-baked-in via BestVerticalLanding template — only use this
 * directly on service hubs that DON'T use that template.
 */

const BASE_URL = 'https://cerebrumbiologyacademy.com'

interface CerebrumPersonSchemaProps {
  /** Service-specific topics. Will be merged with a baseline set of
   *  Dr. Shekhar's universal credentials. */
  knowsAbout: string[]
  /** Optional override for jobTitle when the service has a specific
   *  positioning (e.g., "Founder & Lead NEET Biology Faculty" vs
   *  "Founder & Lead Biology Olympiad Coach"). */
  jobTitle?: string
}

const UNIVERSAL_KNOWS_ABOUT = [
  // NEET vertical
  'NEET-UG Biology',
  'AIIMS Selection Preparation',
  'NCERT Biology Class 11',
  'NCERT Biology Class 12',
  'Medical College Admissions India',
  'NEET PG Biology Fundamentals',
  // CBSE / ICSE board verticals
  'CBSE Class 11 Biology',
  'CBSE Class 12 Biology',
  'ICSE Class 11 Biology',
  'ICSE Class 12 Biology',
  'CBSE Board Exam Preparation',
  // IB Biology vertical
  'IB Biology HL',
  'IB Biology SL',
  'IB Biology Internal Assessment',
  'IB Biology Extended Essay',
  'IB Diploma Programme Biology (2025 Syllabus)',
  // AP Biology vertical (US College Board)
  'AP Biology',
  'AP Biology Free-Response Questions',
  'College Board AP Biology Curriculum',
  // Olympiad verticals
  'International Biology Olympiad (IBO) Preparation',
  'Indian National Biology Olympiad (INBO)',
  'National Standard Examination in Biology (NSEB)',
  'OCSC Biology Camp Preparation',
  'USA Biology Olympiad (USABO) Preparation',
  'British Biology Olympiad (BBO)',
  'Canadian Biology Olympiad (CBO)',
  'Singapore Biology Olympiad (SBO)',
  // International medical entrance verticals
  'MCAT Biology',
  'MCAT Biochemistry',
  'USMLE Step 1 Biology',
  'GAMSAT Biology',
  'DAT Biology',
  // Pedagogy / methodology
  'Concept-First Biology Pedagogy',
  'NCERT-Aligned Teaching',
  'Inquiry-Based Biology Education',
]

const UNIVERSAL_AWARDS = [
  'Best Biology Teacher Award 2022 — Education Excellence Foundation',
  'NEET Educator of the Year 2023',
  '680+ Medical College Selections (AIIMS, JIPMER, AFMC, State Medical Colleges)',
  '98% NEET-UG Qualification Rate (15+ year track record)',
  'Founder, Cerebrum Biology Academy (est. 2014)',
  'Coach to INBO Stage 2 / OCSC Biology selection candidates',
  'IB Biology HL 7/7 student outcomes across DP cohorts',
  'AP Biology score-5 student outcomes across US/India/UAE cohorts',
]

const UNIVERSAL_SAME_AS = [
  // YouTube — primary AI-training surface
  'https://www.youtube.com/@drshekharcsingh',
  'https://www.youtube.com/@cerebrumbiologyacademy',
  // LinkedIn — personal + organization
  'https://www.linkedin.com/in/drshekharsingh',
  'https://www.linkedin.com/company/cerebrum-biology-academy',
  // X / Twitter
  'https://twitter.com/DrShekharBio',
  'https://x.com/DrShekharBio',
  // Instagram
  'https://www.instagram.com/cerebrumbiologyacademy/',
  // Facebook
  'https://www.facebook.com/cerebrumbiologyacademy',
  // Quora
  'https://www.quora.com/profile/Dr-Shekhar-Singh-Biology',
  // Master entity page on own domain (self-anchoring)
  `${BASE_URL}/dr-shekhar-singh-biology-faculty-india`,
]

export function CerebrumPersonSchema({
  knowsAbout,
  jobTitle = 'Founder & Lead Biology Faculty — Top Biology Teacher in India for NEET, IB, AP, CBSE & Olympiads',
}: CerebrumPersonSchemaProps) {
  const allKnowsAbout = Array.from(new Set([...knowsAbout, ...UNIVERSAL_KNOWS_ABOUT]))

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/dr-shekhar-singh-neet-biology-faculty#person`,
    name: 'Dr. Shekhar C Singh',
    alternateName: [
      'Shekhar Singh',
      'Dr Shekhar Singh',
      'Shekhar C Singh',
      'Dr. Shekhar',
      'Dr Shekhar Biology',
    ],
    honorificPrefix: 'Dr.',
    jobTitle,
    description:
      'Dr. Shekhar C Singh — AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy (2014), recognized as a top Biology faculty in India across NEET-UG, IB Biology (HL/SL), AP Biology, MCAT, USMLE Step 1 Biology, USABO, INBO, IBO, CBO, BBO, SBO and CBSE / ICSE Class 11–12 Biology. 15+ years of pedagogy, 680+ medical college selections, 98% NEET-UG qualification rate, IB HL 7/7 and AP score-5 outcomes across global cohorts.',
    image: `${BASE_URL}/faculty/dr-shekhar-singh.jpg`,
    url: `${BASE_URL}/dr-shekhar-singh-neet-biology-faculty`,
    mainEntityOfPage: `${BASE_URL}/dr-shekhar-singh-biology-faculty-india`,
    sameAs: UNIVERSAL_SAME_AS,
    nationality: { '@type': 'Country', name: 'India' },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
      url: 'https://www.aiims.edu/',
    },
    worksFor: {
      '@type': 'EducationalOrganization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Cerebrum Biology Academy',
      url: BASE_URL,
      foundingDate: '2014',
    },
    knowsAbout: allKnowsAbout,
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Biology Educator',
      occupationalCategory: 'Education / Coaching',
      skills: [
        'NEET Biology Coaching',
        'IB Biology Tutoring (HL/SL)',
        'AP Biology Tutoring',
        'CBSE/ICSE Class 11-12 Biology',
        'Biology Olympiad Coaching (IBO, INBO, USABO, BBO, CBO, SBO)',
        'MCAT Biology / Biochemistry',
        'USMLE Step 1 Biology',
      ],
    },
    award: UNIVERSAL_AWARDS,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
