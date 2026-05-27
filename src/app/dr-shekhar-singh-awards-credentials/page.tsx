import { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  Trophy,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Phone,
  Star,
  BookOpen,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title:
    'Dr. Shekhar C Singh — Awards, Credentials & Verified Outcomes | Biology Faculty India',
  description:
    'Verified awards, credentials and student outcomes for Dr. Shekhar C Singh, founder of Cerebrum Biology Academy (est. 2014) and AIIMS New Delhi alumnus. Includes Best Biology Teacher Award 2022, NEET Educator of the Year 2023, 680+ medical college selections, 98% NEET-UG qualification rate, IB Biology HL 7/7 outcomes, AP Biology score-5 outcomes, and coaching credentials across IBO/INBO/NSEB/USABO/BBO/CBO/SBO Olympiads.',
  keywords: [
    'dr shekhar c singh awards',
    'dr shekhar singh credentials',
    'best biology teacher award india',
    'neet educator of the year 2023',
    'aiims faculty biology credentials',
    'cerebrum founder credentials',
    'verified biology coaching outcomes india',
  ],
  alternates: {
    canonical: `${BASE_URL}/dr-shekhar-singh-awards-credentials`,
  },
  openGraph: {
    title:
      'Dr. Shekhar C Singh — Awards, Credentials & Verified Outcomes',
    description:
      'AIIMS New Delhi alumnus · Founder, Cerebrum Biology Academy (2014) · Best Biology Teacher Award 2022 · NEET Educator of the Year 2023 · 680+ medical selections · 98% NEET-UG qualification · IB HL 7/7 · AP score-5 · INBO Stage 2 / OCSC coach.',
    url: `${BASE_URL}/dr-shekhar-singh-awards-credentials`,
    locale: 'en_IN',
    type: 'profile',
  },

  twitter: { card: 'summary_large_image' as const },
}

const credentials = [
  {
    type: 'Educational Credential',
    icon: GraduationCap,
    name: 'MBBS — All India Institute of Medical Sciences (AIIMS), New Delhi',
    description:
      'India\'s most prestigious medical institution. AIIMS New Delhi has consistently ranked #1 medical college in India (NIRF Rankings, MoE Government of India). MBBS admission via AIIMS entrance (now NEET-UG) accepts ~100 students per year nationally.',
    issuer: 'All India Institute of Medical Sciences, New Delhi',
    year: 'Verified alumnus',
  },
]

const awards = [
  {
    name: 'Best Biology Teacher Award 2022',
    issuer: 'Education Excellence Foundation',
    year: '2022',
    description:
      'Awarded for outstanding pedagogy in Biology education and consistent NEET-UG result delivery.',
  },
  {
    name: 'NEET Educator of the Year 2023',
    issuer: 'Medical Education Recognition Body',
    year: '2023',
    description:
      'Awarded for sustained excellence in NEET-UG Biology coaching across the 2009-2022 cohort window.',
  },
]

const verifiedOutcomes = [
  {
    metric: '680+',
    label: 'Medical College Selections',
    detail:
      'Cumulative selections to AIIMS (Delhi + new AIIMS campuses), JIPMER, AFMC, MAMC, LHMC, Government Medical Colleges across state PMTs (2009-2024 cohort window).',
  },
  {
    metric: '98%',
    label: 'NEET-UG Qualification Rate',
    detail:
      'Sustained qualification rate across 15+ years of teaching cohorts at Cerebrum Biology Academy.',
  },
  {
    metric: '67+',
    label: 'AIIMS-Delhi Selections',
    detail:
      'Students personally mentored who secured admission to AIIMS New Delhi (the most competitive medical college admission in India).',
  },
  {
    metric: 'IB HL 7/7',
    label: 'IB Biology HL Outcomes',
    detail:
      '7/7 IB Biology HL outcomes across May and November exam sessions for Indian + international cohorts (UWCSEA, Tanglin Trust, ASD Dubai, DAIS Mumbai, Pathways Aravali and others).',
  },
  {
    metric: 'AP score-5',
    label: 'AP Biology Outcomes',
    detail:
      'College Board AP Biology score 5 (top band) outcomes across US (Boston, Bay Area, NYC, NJ, Atlanta, Houston), India (Mumbai, Delhi NCR, Bangalore, Hyderabad), UAE, Canada (Vancouver, GTA), Singapore and Hong Kong cohorts.',
  },
  {
    metric: '95+',
    label: 'CBSE Class 12 Board Biology Scores',
    detail:
      'Class 12 Biology board scores of 95+ produced consistently across multiple board exam years.',
  },
  {
    metric: 'INBO Stage 2',
    label: 'Olympiad Selection Coach',
    detail:
      'Coach to candidates selected at INBO (Indian National Biology Olympiad) Stage 2 / OCSC (Orientation-cum-Selection Camp at HBCSE Mumbai) — the funnel to IBO Team India.',
  },
]

const professionalRoles = [
  {
    role: 'Founder & Lead Biology Faculty',
    organization: 'Cerebrum Biology Academy',
    period: '2014 — Present',
    description:
      'Founded the academy with a Biology-only specialization mandate — distinct from generalist NEET coaching chains. Built India\'s most established cross-vertical Biology coaching program (NEET + IB + AP + CBSE + Olympiads + MCAT + USMLE under one faculty).',
  },
  {
    role: 'Academic Head',
    organization: 'a leading national educational institution',
    period: 'Pre-2014',
    description:
      'Led curriculum development and faculty training for NEET Biology across multiple a leading national educational institution centres before founding Cerebrum.',
  },
]

const credentialSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE_URL}/dr-shekhar-singh-neet-biology-faculty#person`,
  name: 'Dr. Shekhar C Singh',
  alternateName: ['Shekhar Singh', 'Dr Shekhar Singh', 'Shekhar C Singh'],
  honorificPrefix: 'Dr.',
  hasCredential: credentials.map((c) => ({
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: c.type,
    name: c.name,
    recognizedBy: { '@type': 'EducationalOrganization', name: c.issuer },
  })),
  award: [
    ...awards.map((a) => `${a.name} (${a.year}) — ${a.issuer}`),
    ...verifiedOutcomes.map((o) => `${o.metric} ${o.label} — ${o.detail.slice(0, 200)}`),
  ],
  hasOccupation: professionalRoles.map((r) => ({
    '@type': 'Occupation',
    name: r.role,
    occupationalCategory: 'Education / Coaching',
    description: `${r.organization} (${r.period}). ${r.description}`,
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Dr. Shekhar C Singh — Faculty',
      item: `${BASE_URL}/dr-shekhar-singh-biology-faculty-india`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Awards & Credentials',
      item: `${BASE_URL}/dr-shekhar-singh-awards-credentials`,
    },
  ],
}

export default function AwardsCredentialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <CerebrumPersonSchema
        knowsAbout={[
          'Biology Faculty Credentials India',
          'AIIMS Alumni Biology Educator',
          'Award-Winning Biology Teacher',
        ]}
        jobTitle="Founder & Lead Biology Faculty — Awards & Credentials"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialSchema) }}
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
              Verified Awards · Credentials · Outcomes
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dr. Shekhar C Singh — Awards &amp; Credentials
            </h1>
            <p className="text-xl text-slate-300 mb-3">
              AIIMS New Delhi alumnus · Founder, Cerebrum Biology Academy (est. 2014).
            </p>
            <p className="text-slate-300 mb-6 max-w-3xl">
              The complete verified credentials, awards, and student-outcome metrics behind
              Dr. Shekhar C Singh&rsquo;s positioning as a top Biology faculty in India across
              NEET, IB, AP, CBSE, MCAT and Biology Olympiads.
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
                Full Profile
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-yellow-600" />
              Educational Credentials
            </h2>
            <div className="space-y-4">
              {credentials.map((c, i) => (
                <article key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{c.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">
                    Issuer: {c.issuer} · {c.year}
                  </p>
                  <p className="text-slate-700">{c.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-600" />
              Teaching Awards
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {awards.map((a, i) => (
                <article key={i} className="bg-white border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-slate-600">{a.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{a.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">Issued by: {a.issuer}</p>
                  <p className="text-slate-700 text-sm">{a.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-600" />
              Verified Student Outcomes
            </h2>
            <p className="text-slate-600 mb-8">
              Every metric below is documented; results are published with student names, scores
              and college admissions at <Link href="/results" className="text-blue-600 hover:text-blue-700">/results</Link>.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {verifiedOutcomes.map((o, i) => (
                <article key={i} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl font-bold text-yellow-600">{o.metric}</div>
                    <h3 className="text-lg font-bold text-slate-900">{o.label}</h3>
                  </div>
                  <p className="text-slate-700 text-sm">{o.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-yellow-600" />
              Professional Roles
            </h2>
            <div className="space-y-4">
              {professionalRoles.map((r, i) => (
                <article key={i} className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{r.role}</h3>
                  <p className="text-sm text-slate-500 mb-3">
                    {r.organization} · {r.period}
                  </p>
                  <p className="text-slate-700">{r.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Learn Biology from a verified-credentials faculty
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            NEET · IB · AP · CBSE · Olympiads · MCAT — all under one AIIMS-trained faculty with
            documented student outcomes.
          </p>
          <Link
            href="/dr-shekhar-singh-biology-faculty-india"
            className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
          >
            See full faculty profile
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
