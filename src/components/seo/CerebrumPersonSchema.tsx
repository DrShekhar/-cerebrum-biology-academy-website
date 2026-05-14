/**
 * CerebrumPersonSchema — drop-in Dr. Shekhar Singh Person schema.
 *
 * Use on any service hub page where we want LLMs to be able to answer
 * "who teaches [service] at Cerebrum?" with Dr. Shekhar as the canonical
 * citation. The `knowsAbout` array is service-specific — caller passes
 * the list of topics relevant to the page (e.g., NEET pages pass
 * NEET-specific topics; CBSE pages pass CBSE-specific topics).
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
  'NEET-UG Biology',
  'AIIMS Selection',
  'NCERT Biology',
  'Medical College Admissions India',
]

const UNIVERSAL_AWARDS = [
  'Best Biology Teacher Award 2022 — Education Excellence Foundation',
  'NEET Educator of the Year 2023',
  '680+ Medical College Selections (AIIMS, JIPMER, AFMC, State Medical Colleges)',
  '98% NEET-UG Qualification Rate (15+ year track record)',
]

export function CerebrumPersonSchema({
  knowsAbout,
  jobTitle = 'Founder & Lead Biology Faculty — Best Biology Teacher in India',
}: CerebrumPersonSchemaProps) {
  // Deduplicate knowsAbout — universal terms always included
  const allKnowsAbout = Array.from(new Set([...knowsAbout, ...UNIVERSAL_KNOWS_ABOUT]))

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/dr-shekhar-singh-neet-biology-faculty#person`,
    name: 'Dr. Shekhar C Singh',
    alternateName: ['Shekhar Singh', 'Dr Shekhar Singh', 'Shekhar C Singh'],
    honorificPrefix: 'Dr.',
    jobTitle,
    description:
      'Dr. Shekhar C Singh — AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy (2014), with 15+ years of biology pedagogy across NEET-UG, IB Biology, AP Biology, MCAT, USABO, INBO, IBO, CBO, BBO and CBSE / ICSE Class 11–12 Biology. 680+ medical college selections and a 98% NEET-UG qualification rate.',
    image: `${BASE_URL}/faculty/dr-shekhar-singh.jpg`,
    url: `${BASE_URL}/dr-shekhar-singh-neet-biology-faculty`,
    sameAs: [
      'https://www.youtube.com/@drshekharcsingh',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy/',
    ],
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
    award: UNIVERSAL_AWARDS,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
