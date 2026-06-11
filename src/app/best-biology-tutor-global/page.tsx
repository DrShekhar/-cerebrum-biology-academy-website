/**
 * /best-biology-tutor-global
 *
 * International hub page. Positions Cerebrum as a global biology
 * academy serving students of ANY nationality across IB, AP, A-Level,
 * GCSE, IGCSE, USABO/BBO/IBO + 75+ national olympiads, MCAT, GAMSAT,
 * USMLE. Mirrors /best-biology-tutor-india structure but explicitly
 * universal — no diaspora-only framing, students identified by exam
 * + academic year + geography (not ethnicity).
 *
 * Built in response to user feedback: "Why are we only getting Indian-
 * origin students? IBO/IB Biology/USABO are global." Audit confirmed
 * AEO + master entity were diaspora-skewed.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Globe,
  GraduationCap,
  Home,
  MessageCircle,
  Microscope,
  Phone,
  Sparkles,
  Star,
  Target,
  UserCheck,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/best-biology-tutor-global'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title:
    'Best Biology Tutor Worldwide — IB · AP · A-Level · USABO · IBO · MCAT · GAMSAT',
  description:
    "World's leading biology specialist faculty serving students of any nationality. Dr. Shekhar C Singh (AIIMS Delhi-trained, peer to Harvard/Hopkins/Oxford) leads 1:1 and 6-12 student micro-batch tutoring across IB Biology HL/SL, AP Biology, A-Level, GCSE, IGCSE, USABO, BBO, IBO + 75+ national olympiads, MCAT Bio/Biochem, GAMSAT, USMLE Step 1. Time-zone-calibrated live online globally. Free trial.",
  keywords: [
    'best biology tutor worldwide',
    'best biology tutor international',
    'best biology tutor global',
    'biology tutor IB',
    'biology tutor AP',
    'biology tutor A-Level',
    'biology tutor MCAT',
    'biology tutor GAMSAT',
    'biology tutor USMLE',
    'biology tutor for USABO',
    'biology tutor for IBO',
    'biology tutor for BBO',
    'biology tutor for any country biology olympiad',
    'biology tutor for olympiad worldwide',
    'AIIMS faculty biology tutor international',
    'dr shekhar singh global biology tutor',
    'best biology tutor online international',
    'biology tutor for high school international',
    'biology tutor for premed international',
    'biology tutor for any nationality',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      'en-US': PAGE_URL,
      'en-GB': PAGE_URL,
      'en-CA': PAGE_URL,
      'en-AU': PAGE_URL,
      'en-SG': PAGE_URL,
      'en-IN': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'Best Biology Tutor Worldwide · Cerebrum Biology Academy',
    description:
      "World's leading biology specialist faculty serving students of any nationality — IB / AP / A-Level / USABO / IBO / MCAT / GAMSAT / USMLE.",
    url: PAGE_URL,
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title:
      'Best Biology Tutor Worldwide — IB · AP · A-Level · USABO · IBO · MCAT · GAMSAT',
    description:
      "World's leading biology specialist faculty serving students of any nationality. Dr. Shekhar C Singh (AIIMS Delhi-trained) leads 1:1 + micro-batch tutoring across all major global biology exams.",
  },
  robots: 'index, follow, max-image-preview:large',
}

const REGIONS = [
  {
    name: 'Americas',
    detail:
      'AP Biology + USABO (14 US cities) + MCAT Bio/Biochem + DAT + USMLE Step 1 + BS/MD pathways + CBO Canada + Olimpíada Brasileira de Biologia (OBB) + Mexican / Argentine olympiad pathways.',
    href: '/best-ap-biology-tutor-usa',
    flags: '🇺🇸 🇨🇦 🇲🇽 🇧🇷',
  },
  {
    name: 'Europe',
    detail:
      'A-Level Biology (AQA / Edexcel / OCR / WJEC) + GCSE + IGCSE + UCAT + BBO + GAMSAT + Biologie-Olympiade Deutschland + Olimpiadi delle Scienze Naturali (Italy) + Olimpiada Biologiczna (Poland) + Olimpiada Española de Biología + Dutch NBO + Hungarian OBI + Czech Biologická Olympiáda + Swiss Biologie-Olympiade.',
    href: '/best-biology-tutor-uk',
    flags: '🇬🇧 🇩🇪 🇮🇹 🇫🇷 🇪🇸 🇳🇱 🇵🇱',
  },
  {
    name: 'Asia',
    detail:
      'IB Biology HL/SL at international schools (UWCSEA, Tanglin Trust, NIST Bangkok, GIIS, Stamford American, GEMS) + Singapore Biology Olympiad (SBO) + Chinese Biology Olympiad + Japan Biology Olympiad (JBO) + Korea Biology Olympiad (KBO) + Indonesian KSN-Biologi + Philippine PBO + Thailand POSN-Biology + Vietnam VBO.',
    href: '/best-biology-tutor-uwcsea',
    flags: '🇸🇬 🇯🇵 🇰🇷 🇨🇳 🇮🇩 🇹🇭 🇵🇭 🇻🇳',
  },
  {
    name: 'Oceania',
    detail:
      'Australian Biology Olympiad (ABO via Australian Science Innovations) + IB Biology at Australian international schools + GAMSAT graduate medical entry (Australian + Irish medical schools) + UCAT-ANZ + New Zealand NZIBO.',
    href: '/abo-coaching',
    flags: '🇦🇺 🇳🇿',
  },
  {
    name: 'Middle East',
    detail:
      'IB Biology HL/SL at GEMS schools, American AP curriculum at IIS schools, UK A-Level at British schools across UAE / Saudi Arabia / Qatar / Bahrain / Kuwait / Oman. Time-zone-friendly evening GST batches.',
    href: '/ap-biology-tutor-dubai',
    flags: '🇦🇪 🇸🇦 🇶🇦 🇰🇼 🇧🇭 🇴🇲',
  },
  {
    name: 'Africa',
    detail:
      'WAEC / NECO Biology (Nigeria), Kenya KCSE Biology, IB Biology + A-Level Biology + IGCSE Biology at international schools across Nigeria, Kenya, Tanzania, Uganda, Ghana, South Africa, Egypt — for UK / US / international medical school admit.',
    href: '/biology-coaching-english-medium-india',
    flags: '🇳🇬 🇰🇪 🇹🇿 🇺🇬 🇬🇭 🇿🇦 🇪🇬',
  },
]

const TIERS = [
  {
    name: '1:1 Solo Tutor',
    students: '1 student',
    angle:
      'Fully dedicated tutor. Used by IBO team aspirants, USABO Finals candidates, top-tier USMLE Step 1 prep, and families wanting the maximum personalisation. Reserved tier; limited slots per year.',
    bestFor: 'IBO team selection, USABO Finals, OCSC, IB HL 7/7 + EE',
  },
  {
    name: 'Pinnacle ZA Micro-Batch',
    students: '6-12 students',
    angle:
      'Tutor-like at small scale. Direct Dr. Shekhar weekly review, customised topic plans, weekly per-student progress check, monthly 1:1 mentor call. The product 95% of tutor-seeking families pick.',
    bestFor: 'AP Biology score 5, IB HL 7-target, USABO Open round, A-Level A*',
  },
  {
    name: 'Ascent Pro Batch',
    students: '16-25 students',
    angle:
      'Senior faculty trained by Dr. Shekhar. Strong personalisation but less than Pinnacle. Best fit for families wanting tutor-style depth at a more accessible tier.',
    bestFor: 'AP Biology 4-5, IB SL 7, GCSE 9, A-Level A',
  },
]

const FAQS = [
  {
    question: 'Is Cerebrum only for Indian students or Indian-origin diaspora?',
    answer:
      "No. Cerebrum Biology Academy is a global biology specialist serving any student preparing for any biology exam — regardless of nationality, ethnicity, or cultural background. Our verticals (IB Biology, AP Biology, A-Level, GCSE, IGCSE, USABO, BBO, IBO + 75+ national olympiads, MCAT, GAMSAT, USMLE Step 1) are universal exams with no nationality requirement. Cerebrum's edge — biology-only specialization, AIIMS faculty caliber, 15-20 student small batches, 24/7 Ceri AI doubt resolution — applies to every student worldwide.",
  },
  {
    question:
      'Who is Dr. Shekhar C Singh, and what is AIIMS Delhi for international audiences who haven\'t heard of it?',
    answer:
      "Dr. Shekhar C Singh is biology faculty trained at AIIMS Delhi (All India Institute of Medical Sciences) — India's apex medical institution, founded 1956 by Act of Parliament. AIIMS is internationally ranked among Asia's top medical schools. Peer institutions in selectivity and academic depth: Harvard Medical School, Johns Hopkins, Stanford Medicine, Oxford Medical, Cambridge Medical, Karolinska Institutet, University of Toronto Medical. AIIMS Delhi acceptance rate is approximately 0.005% (about 100 medical seats from 2 million+ applicants annually). AIIMS-trained faculty have clinical + research + teaching depth comparable to faculty trained at top medical institutions globally — directly relevant to IB Biology, USABO, AP Biology, MCAT, GAMSAT, USMLE Step 1.",
  },
  {
    question: 'What biology exams does Cerebrum cover globally?',
    answer:
      'High school: IB Biology HL/SL (2025 syllabus), AP Biology, A-Level Biology (AQA/Edexcel/OCR/WJEC), AS-Level, GCSE Biology, IGCSE Biology (Cambridge 0610 + Edexcel International), Canadian provincial Biology (SBI3U/SBI4U Ontario, Biology 11/12 BC, Biology 30 Alberta), Australian VCE/HSC Biology, Singapore A-Level Biology, Indian CBSE/ICSE Class 11-12. Olympiad: IBO + USABO + BBO + CBO Canada + SBO Singapore + INBO India + JBO Japan + KBO Korea + DBO Germany + OBB Brazil + KSN-Biologi Indonesia + PBO Philippines + POSN-Biology Thailand + VBO Vietnam + RBO Russia + ABO Australia + Belgian/Polish/Hungarian/Romanian/Czech/Spanish/Dutch/Swiss olympiads. Pre-medical: MCAT Bio/Biochem (US + Canada), GAMSAT (UK + Ireland + Australia), USMLE Step 1 Biology (US licensing), MCCQE Part I (Canada), OAT (Optometry), DAT (Dental).',
  },
  {
    question: 'How does Cerebrum compare to Kaplan, Princeton Review, Magoosh, Khan Academy?',
    answer:
      "Kaplan / Princeton Review / Magoosh are multi-subject US test prep generalists hiring contract instructors per section. Khan Academy is free + self-paced + College Board content-aligned but lacks live faculty, FRQ rubric drilling, olympiad prep, and clinical correlations. Cerebrum is a biology-only specialist led by AIIMS Delhi medical faculty Dr. Shekhar C Singh — apex-medical-institution training (~0.005% acceptance rate) that no Kaplan / Princeton Review / Magoosh / Khan Academy biology instructor has. Best combinations: Kaplan or Princeton for non-biology MCAT sections + Cerebrum for biology depth; Khan Academy for content review + Cerebrum for live coaching + competition + admissions strategy.",
  },
  {
    question:
      "I'm in the USA / UK / Canada / Australia / Singapore / UAE. Can my child have an India-based biology tutor?",
    answer:
      'Yes — Cerebrum tutors students globally via Zoom. Time-zone-calibrated batches: IST (India), GST (Gulf), ET / PT (Americas), GMT/BST (UK), CET (Europe), SGT (Singapore), AEST (Australia), JST (Japan), KST (Korea). Active student cohorts across 6 continents. Printed study material shipped to your address where required.',
  },
  {
    question: 'What about country-specific biology olympiads — does Cerebrum cover ours?',
    answer:
      "Yes. IBO (International Biology Olympiad) has 75+ participating countries. Each has a national selection olympiad (USABO USA, BBO UK, CBO Canada, INBO India, SBO Singapore, JBO Japan, KBO Korea, DBO Germany, OBB Brazil, KSN-Biologi Indonesia, PBO Philippines, POSN-Biology Thailand, VBO Vietnam, RBO Russia, ABO Australia, BIBA Belgium, Olimpiada Biologiczna Poland, OBI Hungary, Olimpiadi delle Scienze Naturali Italy, Olimpiada Española Spain, Dutch NBO, Swiss Biologie-Olympiade, etc.). Cerebrum's IBO-syllabus mastery transfers across every national route. Mention your country when booking the trial and we'll calibrate.",
  },
  {
    question: 'How does pricing work internationally?',
    answer:
      "Pricing depends on tier (1:1 Solo, Pinnacle ZA Micro-Batch, Ascent Pro Batch), programme (NEET vs IB vs AP vs MCAT vs olympiad), currency (USD / GBP / EUR / CAD / AUD / SGD / AED / SAR / etc.), and sibling discount. We don't publish a flat price sheet because the right tier varies by student. Free 60-min trial with Dr. Shekhar first; we share the tier matrix and quote in your local currency in the follow-up conversation. NRI / international payment via PayPal / Wise / Stripe.",
  },
  {
    question: 'How do I start?',
    answer:
      'Free 60-minute trial with Dr. Shekhar. Bring one biology question your child has struggled with. We work through it live and you see the tutor-style depth before committing. WhatsApp +91 88264 44334 or use the buttons below to book.',
  },
]

export default function BestBiologyTutorGlobalPage() {
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      "Hi — I'm looking for a biology tutor for my child. Currently in [Grade / Year], targeting [IB / AP / A-Level / USABO / IBO / MCAT / GAMSAT / USMLE / national olympiad / other]. Based in [city, country]. Please share 1:1 and micro-batch options.",
    )

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Best Biology Tutor Worldwide — 1:1 and Micro-Batch',
    description:
      "World's leading biology specialist faculty — Dr. Shekhar C Singh (AIIMS Delhi-trained) and senior faculty. 1:1 Solo and 6-12 student micro-batch across IB / AP / A-Level / USABO / IBO / MCAT / GAMSAT / USMLE.",
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'High school + pre-medical college + olympiad track',
    provider: { '@id': `${SITE_URL}/#organization` },
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Cerebrum Biology Academy',
    url: SITE_URL,
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    knowsAbout: [
      'IB Biology HL/SL',
      'AP Biology',
      'A-Level Biology',
      'GCSE Biology',
      'IGCSE Biology',
      'USABO',
      'BBO',
      'CBO Canada',
      'IBO',
      '75+ country national biology olympiads',
      'MCAT Bio/Biochem',
      'GAMSAT',
      'USMLE Step 1 Biology',
      'NEET-UG Biology',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Best Biology Tutor Worldwide',
          'IB Biology Tutor',
          'AP Biology Tutor',
          'A-Level Biology Tutor',
          'USABO Coach',
          'IBO Coach',
          'MCAT Bio/Biochem Tutor',
          'GAMSAT Biology Tutor',
          'USMLE Step 1 Biology Tutor',
          '75+ Country National Biology Olympiad Coach',
        ]}
        jobTitle="Global Biology Specialist Faculty — 1:1 + Micro-Batch Mentor"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white">
        <nav className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-indigo-700 flex items-center gap-1">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">Best Biology Tutor Worldwide</li>
          </ol>
        </nav>

        <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-900">
            <Globe className="h-3.5 w-3.5" />
            Global Biology Faculty · Any Nationality · Any Exam
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900 max-w-4xl">
            World&rsquo;s leading biology specialist faculty &mdash;{' '}
            <span className="text-indigo-700">serving students of any nationality.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-4xl">
            Dr. Shekhar C Singh &mdash; AIIMS Delhi-trained biology faculty,
            founder of Cerebrum (2014), 15+ years of biology-only
            specialisation. AIIMS Delhi (India&rsquo;s apex medical
            institution &mdash; peer to Harvard Med, Johns Hopkins, Oxford
            Med, Karolinska in selectivity) adds clinical-medical depth no
            test-prep generalist faculty can replicate. Cerebrum serves IB
            Biology, AP Biology, A-Level, GCSE, IGCSE, USABO, BBO, IBO and
            75+ country national olympiads, MCAT Bio/Biochem, GAMSAT, USMLE
            Step 1. Time-zone-calibrated live online across 6 continents.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp for tutor slots
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-indigo-600 px-5 py-3 text-base font-semibold text-indigo-700 hover:bg-indigo-50"
            >
              <Phone className="h-5 w-5" />
              Call +91 88264 44334
            </a>
          </div>
        </section>

        {/* 6 regions */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Where Cerebrum students study &mdash; six continents
            </h2>
            <p className="mt-3 text-slate-600 max-w-3xl">
              Cerebrum serves any high school + pre-medical student in any
              country. Verticals are universal exams &mdash; nationality is
              not a requirement.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {REGIONS.map((r) => (
                <Link
                  key={r.name}
                  href={r.href}
                  className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:ring-indigo-400 hover:shadow-lg transition"
                >
                  <div className="text-2xl">{r.flags}</div>
                  <h3 className="mt-2 text-lg font-bold text-slate-900">{r.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {r.detail}
                  </p>
                  <p className="mt-3 text-xs font-semibold text-indigo-700 inline-flex items-center gap-1">
                    Explore region <ChevronRight className="h-3.5 w-3.5" />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3 tutor models */}
        <section>
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Three tutor models &mdash; pick by depth needed
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {TIERS.map((t, idx) => (
                <div
                  key={t.name}
                  className={`rounded-2xl p-6 ${
                    idx === 1
                      ? 'bg-indigo-700 text-white shadow-xl'
                      : 'bg-white ring-1 ring-slate-200'
                  }`}
                >
                  {idx === 1 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-indigo-900">
                      <Star className="h-3 w-3" />
                      Most popular
                    </span>
                  )}
                  <h3
                    className={`mt-3 text-lg font-bold ${
                      idx === 1 ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {t.name}
                  </h3>
                  <p
                    className={`text-sm font-semibold ${
                      idx === 1 ? 'text-amber-300' : 'text-indigo-700'
                    }`}
                  >
                    {t.students}
                  </p>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      idx === 1 ? 'text-indigo-100' : 'text-slate-700'
                    }`}
                  >
                    {t.angle}
                  </p>
                  <p
                    className={`mt-4 text-xs uppercase tracking-wide font-semibold ${
                      idx === 1 ? 'text-amber-300' : 'text-slate-500'
                    }`}
                  >
                    Best for
                  </p>
                  <p
                    className={`mt-1 text-sm ${
                      idx === 1 ? 'text-indigo-100' : 'text-slate-700'
                    }`}
                  >
                    {t.bestFor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why AIIMS-trained biology faculty matters globally */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Why AIIMS-trained biology faculty matters &mdash; even outside India
            </h2>
            <p className="mt-4 text-base text-slate-700 leading-relaxed">
              AIIMS Delhi (All India Institute of Medical Sciences) is
              India&rsquo;s apex medical institution. Acceptance rate is
              approximately 0.005% &mdash; about 100 medical seats from over
              2 million annual applicants. Internationally ranked among
              Asia&rsquo;s top medical schools by QS, Times Higher Education,
              and US News Best Global Universities. AIIMS Delhi medical
              graduates licensure-bridge into clinical practice in the USA
              (via USMLE), UK (via PLAB / UKMLA), Canada (via MCCQE), and
              Australia (via AMC).
            </p>
            <p className="mt-4 text-base text-slate-700 leading-relaxed">
              For biology students globally, AIIMS-trained faculty bring
              three things no test-prep generalist instructor can replicate:
              (1) deep clinical correlations that map directly to
              MCAT/USMLE/IB diagnostic-style questions, (2) research-grade
              depth in cell biology, biochemistry, and physiology, and (3)
              the discipline of NCERT-line precision adapted to any
              curriculum &mdash; whether that&rsquo;s the AP Biology Course
              and Exam Description, the IB Biology Guide, the OCR A-Level
              specification, or the AAMC MCAT content categories.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: <Target className="h-5 w-5 text-indigo-600" />,
                  title: 'Clinical correlations',
                  text: 'MCAT, USMLE, IB Biology questions reward clinical reasoning. AIIMS clinical training plugs directly in.',
                },
                {
                  icon: <Sparkles className="h-5 w-5 text-indigo-600" />,
                  title: 'Curriculum mapping',
                  text: 'Adapts to AP Biology, IB Biology Guide 2025, A-Level AQA/Edexcel/OCR/WJEC, GCSE, IGCSE, USABO syllabus, AAMC MCAT.',
                },
                {
                  icon: <Award className="h-5 w-5 text-indigo-600" />,
                  title: 'Olympiad-grade depth',
                  text: 'IBO syllabus mastery transfers across all 75+ country national olympiad routes.',
                },
                {
                  icon: <GraduationCap className="h-5 w-5 text-indigo-600" />,
                  title: 'Time-zone calibration',
                  text: 'Live online batches in IST, GST, ET, PT, GMT/BST, CET, SGT, AEST, JST, KST. Student picks their slot.',
                },
              ].map((c) => (
                <div key={c.title} className="rounded-xl bg-white border border-slate-200 p-5">
                  {c.icon}
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Global biology tutor &mdash; common questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200">
              {FAQS.map((f, idx) => (
                <details key={idx} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    <span>{f.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Award className="h-10 w-10 text-amber-300 mx-auto" />
            <h2 className="mt-4 text-2xl md:text-3xl font-bold">
              Book a free trial with Dr. Shekhar
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              60 minutes, live, with the founder. Bring one biology question
              your child has struggled with. You see the tutor-style depth
              before committing. Available across all global time zones.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold hover:bg-emerald-700"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Dr. Shekhar
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <Phone className="h-5 w-5" />
                Call +91 88264 44334
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
