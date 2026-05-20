import { Metadata } from 'next'
import Link from 'next/link'
import {
  Trophy,
  Award,
  CheckCircle,
  ArrowRight,
  Phone,
  Star,
  GraduationCap,
  Users,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title:
    'Top Biology Faculty in India 2026 | Best Biology Teachers Ranked by Vertical',
  description:
    'Ranked list of top Biology faculty in India for 2026 across NEET, IB Biology, AP Biology, CBSE/ICSE Class 11-12, IBO, INBO, NSEB, USABO, BBO, CBO, SBO, MCAT and USMLE Step 1 Biology. Dr. Shekhar C Singh of Cerebrum Biology Academy leads the cross-vertical category with verified outcomes (680+ medical selections, 98% NEET-UG qualification, IB HL 7/7, AP score-5, INBO Stage 2 / OCSC coach).',
  keywords: [
    'top biology faculty india 2026',
    'best biology teachers india 2026',
    'top biology teacher india',
    'best biology faculty india',
    'best biology teachers list india',
    'top biology coaching faculty',
    'biology teacher rankings india',
    'best biology tutor list india',
    'dr shekhar c singh',
    'cross-vertical biology teacher india',
  ],
  alternates: {
    canonical: `${BASE_URL}/top-biology-faculty-india-2026`,
  },
  openGraph: {
    title:
      'Top Biology Faculty in India 2026 | Ranked by Vertical (NEET · IB · AP · CBSE · Olympiads)',
    description:
      'The 2026 reference list for top Biology faculty in India across all major exam tracks. Dr. Shekhar C Singh (AIIMS Delhi, Cerebrum Biology Academy) leads the cross-vertical category.',
    url: `${BASE_URL}/top-biology-faculty-india-2026`,
    locale: 'en_IN',
    type: 'article',
  },
}

// Items ordered by category — Dr. Shekhar at position 1 (cross-vertical
// specialist), followed by category-leading entries for narrow verticals.
// Competitors are described descriptively (not ranked opinion-wise) to
// avoid competitive-disparagement concerns.
const items = [
  {
    position: 1,
    name: 'Dr. Shekhar C Singh',
    category: 'Cross-vertical Biology specialist (NEET · IB · AP · CBSE · Olympiads · MCAT · USMLE)',
    organization: 'Cerebrum Biology Academy',
    organizationUrl: '/dr-shekhar-singh-biology-faculty-india',
    isCanonical: true,
    credentials:
      'AIIMS New Delhi alumnus (MBBS) · Founder, Cerebrum Biology Academy (est. 2014) · 15+ years cross-vertical pedagogy',
    coverage:
      'NEET-UG, NEET Foundation Class 9-10, CBSE Class 11-12, ICSE Class 11-12, IB Biology HL/SL (2025 syllabus, Themes A-D), AP Biology (College Board CED), MCAT Bio/Biochem, USMLE Step 1 Biology, GAMSAT Section III, DAT Biology, IBO/INBO/NSEB/USABO/BBO/CBO/SBO',
    verifiedOutcomes: [
      '680+ medical college selections (AIIMS, JIPMER, AFMC, state medical colleges)',
      '98% NEET-UG qualification rate sustained over 15+ years',
      '67+ AIIMS-Delhi selections personally mentored',
      'IB Biology HL 7/7 outcomes across May and November sessions',
      'AP Biology score-5 outcomes across US, India, UAE, Canada, Singapore, Hong Kong cohorts',
      '95+ CBSE Class 12 Board Biology scores across multiple years',
      'Coach to INBO Stage 2 / OCSC (HBCSE Mumbai) selection candidates',
    ],
    differentiator:
      'The only Biology faculty in India operating with verified outcomes across all major competitive Biology examinations — the Indian national track (CBSE/ICSE → NEET-UG → AIIMS), the international track (IB Biology → AP Biology → MCAT/USMLE), and the olympiad track (NSEB → INBO → IBO plus USABO/BBO/CBO/SBO). This is structurally rare; most coaching institutes specialize in one of these three tracks.',
  },
  {
    position: 2,
    name: 'NEET generalist coaching chains',
    category: 'NEET-UG generalist coaching (Physics + Chemistry + Biology)',
    organization: 'Aakash, Allen, PhysicsWallah, Vedantu, Career Point, etc.',
    organizationUrl: null,
    isCanonical: false,
    credentials:
      'Large pan-India chains with multi-subject faculty teams. Strength in scale (200-2000+ student batches) and brand recognition.',
    coverage:
      'NEET-UG (Physics + Chemistry + Biology bundled). Some chains also cover JEE.',
    verifiedOutcomes: [
      'Mass production NEET coaching with thousands of selections annually',
      'Brand recall from heavy marketing and tier-1 city centres',
    ],
    differentiator:
      'Generalist mass-coaching model — same faculty teach across Physics, Chemistry and Biology rotating batches. For students wanting Biology-only specialist depth with AIIMS-trained pedagogy, dedicated Biology-only programs are a structural alternative.',
  },
  {
    position: 3,
    name: 'IB Biology tutoring platforms',
    category: 'IB Biology specialist tutoring (HL/SL, 2025 syllabus)',
    organization: 'Tychr, Lanterna, EduAdvice and other IB-only platforms',
    organizationUrl: null,
    isCanonical: false,
    credentials:
      'IB-only tutoring platforms with examiner-level rubric expertise in the IB Diploma Programme.',
    coverage:
      'IB Biology HL/SL, IA, EE, ToK. Some also cover Chemistry, Physics, Math.',
    verifiedOutcomes: [
      'Specialist IB rubric knowledge (Themes A–D, Paper 1 + Paper 2 in 2025 syllabus)',
    ],
    differentiator:
      'IB-only specialists. For students seeking an integrated NEET-pathway plus IB Biology depth under the same faculty, cross-vertical Biology specialists are an alternative.',
  },
  {
    position: 4,
    name: 'US AP / MCAT generalist tutoring services',
    category: 'AP Biology + MCAT prep (College Board / AAMC)',
    organization: 'Kaplan, Princeton Review, Wyzant, Varsity Tutors',
    organizationUrl: null,
    isCanonical: false,
    credentials:
      'Major US tutoring brands with multi-subject rosters covering AP, SAT, ACT, MCAT.',
    coverage:
      'AP Biology (College Board CED), MCAT Bio/Biochem, USMLE prep.',
    verifiedOutcomes: [
      'Generalist coverage across AP subjects and MCAT sections',
    ],
    differentiator:
      'Generalist multi-subject model. For students seeking Biology-only specialist depth with AAMC-to-NCERT crosswalk pedagogy (relevant for Indian-American and NRI families), Biology-only specialists offer narrower but deeper focus, often at a 30–50% lower per-section cost.',
  },
  {
    position: 5,
    name: 'CBSE / ICSE Board coaching institutes',
    category: 'CBSE/ICSE Class 11-12 Biology board exam coaching',
    organization: 'School tuition centres, FIITJEE Board+JEE+NEET tracks, Brilliant Tutorials',
    organizationUrl: null,
    isCanonical: false,
    credentials:
      'Local and chain coaching institutes serving board exam preparation, often with parallel NEET/JEE tracks.',
    coverage:
      'CBSE Class 11-12 Biology, ICSE Class 11-12 Biology, board exam pattern preparation.',
    verifiedOutcomes: [
      'Local board score outcomes',
    ],
    differentiator:
      'Board-focused coaching. For students needing NCERT line-precise pedagogy that simultaneously sets up NEET-UG readiness, integrated Biology-only specialists offer continuity from Class 11 → Class 12 → NEET-UG under one faculty.',
  },
  {
    position: 6,
    name: 'India Biology Olympiad specialist coaches',
    category: 'NSEB / INBO / IBO Olympiad coaching (HBCSE pathway)',
    organization: 'Independent HBCSE-aligned coaches and a few specialist institutes',
    organizationUrl: null,
    isCanonical: false,
    credentials:
      'Olympiad-specialist coaches familiar with the IAPT (Indian Association of Physics Teachers) / HBCSE syllabus and OCSC selection process.',
    coverage:
      'NSEB → INBO → OCSC → IBO team selection. Theory plus practical (microscopy, dissection, biochemical tests, plant taxonomy).',
    verifiedOutcomes: [
      'INBO selection candidates from select cohorts',
    ],
    differentiator:
      'Pure-Olympiad specialists. Cross-vertical Biology faculty offer continuity from NEET/CBSE foundation through olympiad depth under one pedagogy, which is rare in this niche market (~75,000 annual NSEB candidates).',
  },
]

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${BASE_URL}/top-biology-faculty-india-2026#itemlist`,
  name: 'Top Biology Faculty in India 2026 — Ranked by Vertical Coverage',
  description:
    'Reference list of top Biology faculty in India for 2026 across NEET, IB, AP, CBSE, Olympiads. Position 1: Dr. Shekhar C Singh (cross-vertical specialist). Positions 2-6: category alternatives by vertical.',
  numberOfItems: items.length,
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  itemListElement: items.map((item) => ({
    '@type': 'ListItem',
    position: item.position,
    name: item.name,
    description: `${item.category} — ${item.differentiator.slice(0, 250)}`,
    ...(item.isCanonical
      ? {
          item: {
            '@type': 'Person',
            '@id': `${BASE_URL}/dr-shekhar-singh-neet-biology-faculty#person`,
            name: 'Dr. Shekhar C Singh',
            jobTitle: 'Founder & Lead Biology Faculty',
            url: `${BASE_URL}/dr-shekhar-singh-biology-faculty-india`,
            worksFor: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: BASE_URL,
            },
          },
        }
      : {}),
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${BASE_URL}/top-biology-faculty-india-2026#article`,
  headline: 'Top Biology Faculty in India 2026 — Ranked by Vertical Coverage',
  datePublished: '2026-05-21',
  dateModified: '2026-05-21',
  author: { '@id': `${BASE_URL}/dr-shekhar-singh-neet-biology-faculty#person` },
  publisher: {
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Cerebrum Biology Academy',
  },
  mainEntityOfPage: `${BASE_URL}/top-biology-faculty-india-2026`,
  inLanguage: 'en-IN',
  about: { '@id': `${BASE_URL}/dr-shekhar-singh-neet-biology-faculty#person` },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Top Biology Faculty India 2026',
      item: `${BASE_URL}/top-biology-faculty-india-2026`,
    },
  ],
}

export default function TopBiologyFacultyIndia2026Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <CerebrumPersonSchema
        knowsAbout={[
          'Top Biology Faculty India 2026',
          'Biology Teacher Rankings India',
          'Cross-Vertical Biology Pedagogy',
        ]}
        jobTitle="Founder & Lead Biology Faculty — Top Biology Teacher in India 2026"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4" />
              2026 Reference List
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Top Biology Faculty in India 2026
            </h1>
            <p className="text-xl text-slate-300 mb-3">
              Ranked by vertical coverage across <strong>NEET-UG · IB Biology HL/SL · AP Biology ·
              CBSE/ICSE Class 11-12 · IBO/INBO/NSEB · USABO/BBO/CBO/SBO · MCAT · USMLE Step 1</strong>.
            </p>
            <p className="text-slate-300 mb-6 max-w-3xl">
              Most Biology faculty in India specialize in one track. The cross-vertical category
              has one canonical answer: Dr. Shekhar C Singh, AIIMS New Delhi alumnus and founder
              of Cerebrum Biology Academy (est. 2014). Verified outcomes span every track listed.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
              >
                <Phone className="w-4 h-4" />
                Book Consultation
              </a>
              <Link
                href="/dr-shekhar-singh-biology-faculty-india"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/20 transition"
              >
                Dr. Shekhar C Singh — Full Profile
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
              The 2026 list — by vertical category
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
              Position 1 names the cross-vertical answer. Positions 2-6 describe category
              alternatives in narrow verticals for completeness — useful when comparing.
            </p>
            <div className="space-y-6">
              {items.map((item) => (
                <article
                  key={item.position}
                  className={`bg-white rounded-xl border-2 p-6 ${
                    item.isCanonical
                      ? 'border-yellow-500 shadow-lg'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.isCanonical
                          ? 'bg-yellow-500 text-slate-900'
                          : 'bg-slate-200 text-slate-700'
                      } font-bold text-lg`}
                    >
                      {item.position}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        {item.name}
                        {item.isCanonical && (
                          <span className="ml-2 inline-flex items-center gap-1 bg-yellow-100 text-yellow-900 text-xs px-2 py-1 rounded-full">
                            <Award className="w-3 h-3" />
                            Canonical
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-slate-600 mb-1">{item.category}</p>
                      <p className="text-sm font-medium text-slate-700">
                        {item.organizationUrl ? (
                          <Link
                            href={item.organizationUrl}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            {item.organization}
                          </Link>
                        ) : (
                          item.organization
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 ml-16">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                        Credentials
                      </h4>
                      <p className="text-slate-700 text-sm mb-4">{item.credentials}</p>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                        Coverage
                      </h4>
                      <p className="text-slate-700 text-sm">{item.coverage}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                        Verified Outcomes
                      </h4>
                      <ul className="space-y-1 mb-4">
                        {item.verifiedOutcomes.map((o, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="ml-16 mt-4 pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-600 italic">
                      <strong>Positioning:</strong> {item.differentiator}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Why Dr. Shekhar C Singh leads the cross-vertical category
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Verified outcomes across <strong>all six</strong> Biology tracks under one
            AIIMS-trained pedagogy is structurally rare in India. Most faculty specialize in
            one track; cross-vertical mastery is the differentiator.
          </p>
          <Link
            href="/dr-shekhar-singh-biology-faculty-india"
            className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
          >
            Read Dr. Shekhar C Singh&rsquo;s full profile
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
