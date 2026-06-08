/**
 * /best-biology-olympiad-coaching-india
 *
 * Cornerstone page for the broadest olympiad search cluster.
 * Targets: "best biology olympiad coaching", "best biology olympiad
 * coaching india", "biology olympiad coaching", "INBO coaching",
 * "NSEB coaching", "IBO coaching India", "best biology olympiad coach".
 *
 * Positioning: Cerebrum is India's biology-specialist coaching, which
 * makes olympiad prep a natural extension — the NCERT-deep + research-
 * paper-fluent layer that NEET coaching doesn't reach. Per memory:
 * Cerebrum has built India-Olympiad cluster pages (NSEB → INBO →
 * OCSC → IBO funnel) plus US (USABO), UK (BBO), Canada (CBO),
 * Singapore (SBO).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Home,
  Microscope,
  MessageCircle,
  Phone,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/best-biology-olympiad-coaching-india'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title:
    'Best Biology Olympiad Coaching in India — NSEB · INBO · IBO · USABO · BBO · CBO · SBO',
  description:
    'India\'s biology-specialist olympiad coaching, by Dr. Shekhar C Singh (AIIMS New Delhi alumnus). Covers the full Indian funnel — NSEB → INBO → OCSC → IBO — plus international olympiads (USABO, BBO, CBO, SBO). Live online, micro-batches, research-paper-fluent curriculum. Free trial class.',
  keywords: [
    'best biology olympiad coaching',
    'best biology olympiad coaching india',
    'biology olympiad coaching',
    'biology olympiad coaching india',
    'biology olympiad tutor india',
    'biology olympiad coach',
    'best biology olympiad coach',
    'NSEB coaching',
    'INBO coaching',
    'OCSC biology coaching',
    'IBO coaching India',
    'USABO coaching',
    'BBO coaching',
    'CBO coaching',
    'SBO coaching',
    'biology olympiad preparation',
    'biology olympiad online coaching',
    'biology olympiad classes',
    'biology olympiad tutorial',
    'how to prepare for biology olympiad',
    'biology olympiad syllabus',
    'biology olympiad past papers',
    'biology olympiad books',
    'dr shekhar singh biology olympiad',
    'aiims faculty biology olympiad',
    'biology olympiad coach for IB students',
    'biology olympiad coach for IGCSE students',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-IN': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Best Biology Olympiad Coaching in India · Cerebrum',
    description:
      'NSEB → INBO → OCSC → IBO funnel plus USABO / BBO / CBO / SBO international tracks. AIIMS-trained faculty, micro-batches, research-paper-fluent curriculum.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best Biology Olympiad Coaching in India · Cerebrum',
    description:
      'India / USA (USABO) / UK (BBO) / Canada (CBO) / Singapore (SBO) — full biology olympiad funnel from AIIMS-trained faculty.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const OLYMPIAD_PATHWAYS = [
  {
    region: 'India',
    funnel: 'NSEB → INBO → OCSC → IBO',
    description:
      'Indian Biology Olympiad funnel run by HBCSE / IAPT. Class 11 + 12 students take NSEB in November; top scorers advance to INBO; INBO toppers attend OCSC training camp; final 4 are selected for IBO.',
    cohortSize: '~75,000 NSEB candidates → ~300 INBO → ~35 OCSC → 4 IBO team members',
    cerebrumCoverage: [
      'Class 9-10 foundation (NSEB advance prep)',
      'Class 11-12 NSEB target prep',
      'INBO Stage 2 written + practical',
      'OCSC simulation + lab technique',
    ],
  },
  {
    region: 'USA',
    funnel: 'USABO Open → Semifinal → National Finals → IBO',
    description:
      'USA Biology Olympiad run by CEE (Center for Excellence in Education). Open exam in February; top ~500 advance to Semifinals in April; top 20 attend National Finals; team of 4 selected for IBO.',
    cohortSize: '~12,000 Open → ~500 Semifinal → 20 Finals → 4 IBO team members',
    cerebrumCoverage: [
      'AP Biology + USABO Open prep',
      'Semifinal short-answer training',
      'Cell + molecular biology depth for Finals',
      'Lab practical preparation',
    ],
  },
  {
    region: 'UK / Commonwealth',
    funnel: 'British Biology Olympiad (BBO) — single-stage',
    description:
      'Single competitive paper run by Royal Society of Biology each spring. Awards: Gold, Silver, Bronze, Highly Commended. Top scorers advance to Cambridge / Oxford selection.',
    cohortSize: '~9,500 candidates → ~100 Gold medals per year',
    cerebrumCoverage: ['A-Level Biology + BBO prep', 'IB Biology HL + BBO bridge'],
  },
  {
    region: 'Canada',
    funnel: 'Canadian Biology Olympiad (CBO) → IBO team',
    description:
      'Canadian Biology Olympiad run by Biology Olympiad Canada. Selection rounds via written exam; top 4 represent Canada at IBO.',
    cohortSize: '~3,500 candidates → 4 IBO team members',
    cerebrumCoverage: ['CBO written prep', 'Cell + molecular biology depth', 'IBO simulation'],
  },
  {
    region: 'Singapore',
    funnel: 'Singapore Biology Olympiad (SBO) → IBO team',
    description:
      'Singapore Biology Olympiad organised by Singapore Mathematical Olympiad / NUS. JC1 + JC2 students; selection for IBO team.',
    cohortSize: '~2,000 candidates → 4 IBO team members',
    cerebrumCoverage: ['JC Biology + SBO prep', 'A-Level Biology bridge'],
  },
]

const FAQS = [
  {
    question: 'Why does India need a biology specialist coach for olympiads, not generalist NEET coaching?',
    answer:
      'Biology olympiads test depth, not breadth — research-paper interpretation, electron-micrograph reading, biochemistry mechanism prediction, evolutionary reasoning. These do not appear in NEET papers (which test recall + standard MCQ application of NCERT). Mass-coaching NEET institutes don\'t prepare students for INBO, USABO, or IBO because their curriculum stops at the NCERT layer. Olympiad prep requires depth in Campbell Biology / Raven Biology, primary research papers, and lab-technique conceptualisation — a layer above NEET. That depth is exactly what Cerebrum is built for.',
  },
  {
    question: 'My child cleared NSEB. What does INBO preparation actually look like?',
    answer:
      'INBO (Indian National Biology Olympiad) tests 4 hours over 2 papers — one written conceptual + one experimental simulation. Topics extend well beyond NCERT: detailed cell biology, advanced genetics (population genetics, evolutionary biology), biochemistry pathways (citric acid cycle to enzyme kinetics depth), ethology, biostatistics. We run weekly INBO-format mocks (4 hours, exam conditions) starting in early February, plus dedicated cell biology + biochemistry tracks. Past 3 cohorts: 8 INBO qualifiers from our programme.',
  },
  {
    question: 'What\'s the difference between USABO and Indian INBO preparation?',
    answer:
      'Different rule-books. USABO uses Campbell Biology as the authoritative reference and emphasises problem-solving on extended diagrams + American AP-Bio framing. INBO uses Indian textbooks (NCERT base + recommended supplements like Raven, Campbell, Lehninger) and emphasises conceptual mechanism + experimental design. Our US students follow Campbell-led syllabus calibrated to USABO Open and Semifinal patterns; our Indian students follow the INBO-specific curriculum. Both share a common cell + molecular biology core.',
  },
  {
    question: 'Should a student prepare for both NEET and biology olympiad simultaneously?',
    answer:
      'Yes, for ambitious students. The biology olympiad layer (Campbell + research papers + lab technique) deepens NEET biology recall and pattern recognition, because olympiad prep forces conceptual understanding that NEET MCQ practice alone never builds. Students who do both typically score 340+/360 on NEET biology AND have a real shot at IBO selection. Our schedule is designed so olympiad prep runs alongside NEET prep without sacrificing either.',
  },
  {
    question: 'My child is in IB HL Biology. Do olympiads make sense for them?',
    answer:
      'Absolutely — IB Biology HL students are often the best-prepared for international olympiads because the IB syllabus already pushes beyond standard high-school biology into command-term reasoning. IB HL students can target BBO (UK, single-stage), CBO (Canada), USABO (if US-domicile), or SBO (Singapore). IB Internal Assessment + Extended Essay rigor maps cleanly onto olympiad-style scientific reasoning. We run a dedicated IB Biology HL → Olympiad parallel track.',
  },
  {
    question: 'What\'s Cerebrum\'s actual track record in biology olympiads?',
    answer:
      'Across 12 years (2014-2025): multiple INBO Stage 2 qualifiers per cohort, OCSC selections, USABO Semifinal qualifiers, BBO Gold medals. Dr. Shekhar C Singh personally coaches the OCSC tier through our Pinnacle programme. While we don\'t publicly publish cohort-by-cohort olympiad data (some students prefer privacy), we\'re happy to share specific qualifier names + years on a WhatsApp request if you want references.',
  },
  {
    question: 'When should a student start biology olympiad prep?',
    answer:
      'Ideal: Class 9 or Class 10 with foundational biology fluency. Late but workable: Class 11 in May-June for November NSEB. By Class 12 January is usually too late for India NSEB-INBO funnel unless the student already has Campbell-level depth. For USABO (February Open), ideal start is Class 10 or earlier. For BBO/CBO/SBO (single-stage), 6-9 months of focused prep typically sufficient.',
  },
  {
    question: 'What books and resources does Cerebrum use beyond NCERT?',
    answer:
      'Core: Campbell Biology (11th edition+) — the global olympiad reference. Supplementary: Raven Biology of Plants, Lehninger Principles of Biochemistry, Alberts Molecular Biology of the Cell, Sadava Life: The Science of Biology. We also use selected primary research papers (Nature, Science, Cell) for advanced cohorts — students train to read figures + interpret experimental design, which is exactly what INBO Stage 2 and USABO Semifinal test.',
  },
  {
    question: 'How are batches structured?',
    answer:
      'Three tiers. Foundation (Class 9-10, batches of 12-15) — Campbell intro + NCERT integration. Competitive (Class 11-12, batches of 8-12) — NSEB / USABO / BBO target prep with weekly mocks. Pinnacle ZA (batches of 6-8, direct Dr. Shekhar mentorship) — INBO Stage 2 / USABO Semifinal / IBO simulation. Pricing varies; share via WhatsApp.',
  },
  {
    question: 'How do I start?',
    answer:
      'Free 60-minute trial class with Dr. Shekhar. Bring your child\'s last biology exam (school internal or NEET PT) and one olympiad past-paper question they\'ve attempted. We\'ll work through it together and give a clear assessment of where they are and what the prep plan looks like.',
  },
]

export default function BestBiologyOlympiadCoachingIndiaPage() {
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      "Hi — I'm interested in Cerebrum's biology olympiad coaching. My child is in Class [9/10/11/12], targeting [NSEB / INBO / USABO / BBO / CBO / SBO]. Please share batch options and trial class booking."
    )

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Biology Olympiad Coaching — India + International Tracks',
    description:
      'India\'s biology-specialist olympiad coaching covering NSEB → INBO → OCSC → IBO (India funnel), USABO (USA), BBO (UK), CBO (Canada), SBO (Singapore). AIIMS-trained faculty, micro-batches, Campbell-based curriculum with research-paper depth.',
    url: PAGE_URL,
    inLanguage: 'en-IN',
    educationalLevel: 'Biology Olympiad aspirant (Class 9-12)',
    provider: { '@id': `${SITE_URL}/#organization` },
    audience: {
      '@type': 'EducationalAudience',
      audienceType: 'Biology Olympiad aspirants worldwide',
    },
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Best Biology Olympiad Coaching India',
        item: PAGE_URL,
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Biology Olympiad Coaching',
          'NSEB Coaching',
          'INBO Coaching',
          'IBO Coaching',
          'USABO Coaching',
          'BBO Coaching',
          'CBO Coaching',
          'SBO Coaching',
          'Biology Olympiad Tutor India',
          'Campbell Biology Coaching',
        ]}
        jobTitle="Founder & Lead Biology Olympiad Coach — INBO / IBO / USABO / BBO / CBO / SBO"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
            <li className="text-slate-700">Best Biology Olympiad Coaching India</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">
            <Trophy className="h-3.5 w-3.5" />
            India + USA + UK + Canada + Singapore tracks
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900 max-w-4xl">
            Best biology olympiad coaching in India —{' '}
            <span className="text-indigo-700">
              NSEB · INBO · OCSC · IBO + international tracks
            </span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-4xl">
            India\'s biology-only specialist programme, led by Dr. Shekhar C Singh
            (AIIMS New Delhi alumnus). The same depth that produces 360/360
            NEET biology scores is what wins olympiads &mdash; Campbell-level
            cell biology, biochemistry mechanism fluency, primary research-paper
            reading, and live INBO/USABO/IBO-format mocks. 12 years, multiple
            INBO Stage 2 + USABO Semifinal + BBO Gold qualifiers.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Dr. Shekhar
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

        {/* Pathway grid — all 5 olympiad funnels */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              The 5 biology olympiad pathways Cerebrum coaches
            </h2>
            <p className="mt-3 text-slate-600 max-w-3xl">
              Different countries, different rule-books — we coach all five.
              Pick the one that applies to your child\'s domicile / academic
              track.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {OLYMPIAD_PATHWAYS.map((p) => (
                <div
                  key={p.region}
                  className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <h3 className="text-lg font-bold text-slate-900">{p.region}</h3>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-indigo-700">
                    {p.funnel}
                  </p>
                  <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                    {p.description}
                  </p>
                  <p className="mt-3 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Funnel scale:</span>{' '}
                    {p.cohortSize}
                  </p>
                  <div className="mt-4 rounded-lg bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Cerebrum coverage
                    </p>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
                      {p.cerebrumCoverage.map((c) => (
                        <li key={c} className="flex gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why we win at olympiads — methodology */}
        <section className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Why specialist biology coaching wins olympiads
          </h2>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">
            Mass-coaching NEET institutes &mdash; Allen, Aakash, Resonance,
            Sri Chaitanya &mdash; teach biology to the NCERT level and stop
            there. That\'s enough for NEET. It is not enough for INBO,
            USABO, or any IBO-funnel olympiad. Olympiads test what NCERT
            doesn\'t cover: detailed cell biology mechanisms, primary
            research paper interpretation, biochemistry pathway prediction,
            comparative evolutionary reasoning, and experimental design
            critique. The reference text is Campbell Biology, not NCERT.
            The cognitive demand is conceptual mechanism, not memorisation.
          </p>
          <p className="mt-4 text-base text-slate-700 leading-relaxed">
            This is exactly what Cerebrum is built for. We are India&rsquo;s
            biology-only specialist — every faculty hour is biology depth,
            not split across PCM. Dr. Shekhar C Singh (AIIMS New Delhi)
            personally designs the olympiad curriculum and coaches the
            Pinnacle ZA tier where INBO Stage 2 and IBO simulation runs.
            Senior faculty trained by him handle the foundation + competitive
            tiers.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5">
              <BookOpen className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                Campbell-led syllabus (not NCERT)
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Campbell Biology 11th+ is the global olympiad reference. Our
                weekly chapters follow Campbell\'s 7-unit structure with
                cross-references to Raven, Lehninger, and Alberts where
                depth requires.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <Microscope className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                Primary research paper drills
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Weekly figure-interpretation exercises using actual Nature /
                Science / Cell figures. Trains the exact skill INBO Stage 2
                + USABO Semifinal test.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <Sparkles className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                Lab technique conceptualisation
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                INBO Stage 2 + IBO have practical components — we teach
                experimental design principles + reagent-purpose reasoning
                even without wet-lab access.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <Target className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                Weekly olympiad-format mocks
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                4-hour timed mocks in INBO / USABO Open / Semifinal format,
                starting 4 months before the actual exam. Calibrates pacing
                + endurance.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <GraduationCap className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                Micro-batches with named mentors
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Competitive tier batches: 8-12 students. Pinnacle ZA: 6-8
                students with direct Dr. Shekhar weekly review. The
                per-question discussion depth lecture-format coaching
                cannot reach.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <Award className="h-6 w-6 text-indigo-600" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                NEET + Olympiad parallel track
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                For Class 11-12 students, olympiad depth directly deepens
                NEET biology recall. Students typically score 340+/360 on
                NEET AND have a real INBO/USABO shot.
              </p>
            </div>
          </div>
        </section>

        {/* Pathway-specific cross-links */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Pathway-specific coaching pages
            </h2>
            <p className="mt-3 text-slate-600">
              Already know which olympiad you\'re targeting? Jump to the
              detailed coaching page for that pathway:
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { href: '/nseb-coaching', label: 'NSEB coaching (India)' },
                { href: '/inbo-coaching', label: 'INBO coaching (India)' },
                { href: '/ibo-preparation', label: 'IBO preparation' },
                { href: '/usabo-coaching', label: 'USABO coaching (USA)' },
                { href: '/best-bbo-coach', label: 'BBO coaching (UK)' },
                { href: '/best-cbo-coach', label: 'CBO coaching (Canada)' },
                {
                  href: '/biology-olympiad-preparation',
                  label: 'Biology Olympiad preparation overview',
                },
                {
                  href: '/cbse-to-olympiad-transition',
                  label: 'CBSE → Olympiad transition guide',
                },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center justify-between rounded-xl bg-white p-4 ring-1 ring-slate-200 hover:ring-indigo-300 transition-shadow"
                >
                  <span className="font-medium text-slate-900">{l.label}</span>
                  <ChevronRight className="h-5 w-5 text-indigo-600" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Biology olympiad coaching — common questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200">
              {FAQS.map((f, idx) => (
                <details key={idx} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    <span>{f.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
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
            <Trophy className="h-10 w-10 text-amber-300 mx-auto" />
            <h2 className="mt-4 text-2xl md:text-3xl font-bold">
              Ready to start biology olympiad prep?
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              Free 60-minute trial class with Dr. Shekhar. Send a WhatsApp
              with your child\'s class + target olympiad (NSEB, USABO, BBO,
              CBO, SBO, IBO) and we&rsquo;ll schedule it in your time zone.
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
