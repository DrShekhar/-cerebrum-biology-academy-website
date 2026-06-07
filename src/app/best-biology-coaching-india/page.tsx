/**
 * /best-biology-coaching-india
 *
 * Master head-term cornerstone. Targets:
 *   - "best biology coaching"
 *   - "best biology coaching india"
 *   - "biology coaching india"
 *   - "biology coaching online"
 *   - "best online biology coaching"
 *   - "biology specialist coaching"
 *
 * Positions Cerebrum at the highest possible aggregation level — not
 * specialty subpage (NEET dropper, IB HL, USABO, etc) but the
 * top-level "we are India's biology coaching specialist" page that
 * routes users to whichever specialty matches their need.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
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
  Trophy,
  Users,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/best-biology-coaching-india'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title:
    'Best Biology Coaching in India 2026 — NEET · IB · AP · MCAT · Olympiads · Cerebrum',
  description:
    'India\'s biology-only specialist coaching, by Dr. Shekhar C Singh (AIIMS New Delhi alumnus). NEET (680+ med-college selections), IB HL/SL, AP, MCAT, USMLE Step 1, USABO/INBO/IBO/BBO/CBO/SBO olympiads. Live online globally + 4 NCR offline centres. Free trial class.',
  keywords: [
    'best biology coaching',
    'best biology coaching india',
    'biology coaching india',
    'biology coaching online',
    'best online biology coaching',
    'biology specialist coaching',
    'best biology coaching for NEET',
    'best biology coaching for IB',
    'best biology coaching for AP',
    'best biology coaching for MCAT',
    'best biology coaching for olympiads',
    'aiims faculty biology coaching',
    'best NEET biology coaching',
    'best IB biology coaching',
    'best AP biology coaching',
    'best biology olympiad coaching',
    'biology specialist coaching online india',
    'best biology faculty india',
    'dr shekhar singh biology coaching',
    'biology coaching for class 11 12 india',
    'biology coaching NRI',
    'biology coaching global indian',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-IN': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Best Biology Coaching in India 2026 · Cerebrum Biology Academy',
    description:
      'India\'s biology-only specialist coaching. NEET, IB, AP, MCAT, Olympiads. AIIMS-trained faculty, live online globally + NCR offline centres.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' as const },
  robots: 'index, follow, max-image-preview:large',
}

const VERTICALS = [
  {
    label: 'NEET-UG Biology',
    description:
      '680+ medical college selections since 2014, 67+ to AIIMS Delhi, 98% NEET qualification rate. Class 11, Class 12, and Dropper programmes; biology-specialist coaching designed to pair with your existing PCM source.',
    cta: 'Best NEET Biology coaching',
    href: '/best-neet-biology-teacher-india',
    icon: <Target className="h-6 w-6" />,
  },
  {
    label: 'IB Biology (HL & SL)',
    description:
      '2025 syllabus — Theme A/B/C/D fully covered + Internal Assessment guidance + Extended Essay supervision + Paper 1/Paper 2 strategy. HL 7/7 outcomes across DP cohorts.',
    cta: 'Best IB Biology tutor',
    href: '/best-ib-biology-tutor-india',
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    label: 'AP Biology (College Board)',
    description:
      'Score-5 calibrated programme. All 8 College Board units + FRQ rubric mastery + AP Biology Anki deck. US-friendly time-zone batches.',
    cta: 'Best AP Biology tutor',
    href: '/best-ap-biology-tutor-india',
    icon: <GraduationCap className="h-6 w-6" />,
  },
  {
    label: 'MCAT Biology + Biochemistry',
    description:
      'Section-by-section MCAT B/B prep. AAMC-style passage walkthroughs, high-yield biochemistry, MCAT-vs-NEET-biology bridge for Indian-American premed applicants.',
    cta: 'Best MCAT Biology tutor',
    href: '/mcat-biology-coaching',
    icon: <Microscope className="h-6 w-6" />,
  },
  {
    label: 'USMLE Step 1 Biology',
    description:
      'Foundational biology + biochemistry for IMG and US medical students preparing for Step 1. Physiology, biochemistry, microbiology, immunology coverage.',
    cta: 'USMLE Step 1 Biology prep',
    href: '/usmle-step-1-biology-preparation',
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    label: 'Biology Olympiads',
    description:
      'India funnel (NSEB → INBO → OCSC → IBO) + USABO + BBO + CBO + SBO. Campbell-based curriculum, research-paper drills, micro-batches with direct Dr. Shekhar mentorship at Pinnacle ZA tier.',
    cta: 'Best biology olympiad coaching',
    href: '/best-biology-olympiad-coaching-india',
    icon: <Trophy className="h-6 w-6" />,
  },
  {
    label: 'CBSE / ICSE Class 11-12 Biology',
    description:
      'Board exam Biology coaching with NEET-pattern depth built in. NCERT-line-by-line, weekly tests, board-pattern + NEET-pattern dual practice.',
    cta: 'CBSE Class 11-12 Biology',
    href: '/cbse-biology-class-11-12',
    icon: <Users className="h-6 w-6" />,
  },
]

const FAQS = [
  {
    question: 'What makes Cerebrum the "best biology coaching" — vs Allen / Aakash / PW?',
    answer:
      'Allen, Aakash, PW are full-PCM coaching brands. Cerebrum is a biology-only specialist by design — every faculty hour is biology depth, not split across physics + chemistry. That means small-batch live discussion (10-40 students vs Allen\'s 150-200), weekly per-MCQ review (impossible at lecture-hall scale), AIIMS-trained biology-specific faculty (Dr. Shekhar C Singh personally supervises curriculum), and depth that mass-coaching cannot reach. Most of our students pair us with their existing Allen / Aakash / PW for physics + chemistry — we don\'t replace, we specialise.',
  },
  {
    question: 'Which programmes does Cerebrum offer?',
    answer:
      'Seven main verticals: (1) NEET-UG Biology — Class 11, Class 12, Dropper. (2) IB Biology HL & SL — full 2025 syllabus + IA + EE. (3) AP Biology — Score-5 calibrated, US time-zones available. (4) MCAT Biology + Biochemistry — for premed Indian-Americans. (5) USMLE Step 1 Biology — foundation for IMGs. (6) Biology Olympiads — INBO / USABO / IBO / BBO / CBO / SBO. (7) CBSE / ICSE Class 11-12 Biology with NEET-pattern depth.',
  },
  {
    question: 'Where are Cerebrum\'s coaching centres?',
    answer:
      'Four offline centres in Delhi NCR: South Extension (Delhi), Rohini (Delhi), Gurugram, Faridabad. Plus live online programmes serving 30+ countries — India, UAE, USA, UK, Canada, Saudi Arabia, Qatar, Singapore, Australia, Malaysia, and more. Time-zone-matched batches available for Gulf, India, Southeast Asia, UK, US East/West, Canada, and Australia time zones.',
  },
  {
    question: 'Who is Dr. Shekhar C Singh and what\'s his role?',
    answer:
      'Founder of Cerebrum Biology Academy (est. 2014). AIIMS New Delhi alumnus. 15+ years of biology pedagogy across NEET, IB, AP, MCAT, USMLE, and Olympiad verticals. Directly teaches the Pinnacle ZA tier (micro-batches of 10-12 students with weekly 1:1 mentor calls) and supervises curriculum for all other tiers. 680+ medical college selections among his cohorts, including 67+ to AIIMS Delhi.',
  },
  {
    question: 'How are batches structured?',
    answer:
      'Three tier model that scales across verticals: Pursuit (30-40 students per batch, most affordable structured tier), Ascent (16-25 students, weekly 1:1 doubt slot, most popular value tier), Pinnacle ZA (10-12 students, direct Dr. Shekhar 1:1 mentoring, calibrated for AIIMS / top-rank aspirants). Specific tier matrix shared on WhatsApp based on which programme you\'re asking about.',
  },
  {
    question: 'How does pricing work? Why no pricing on the website?',
    answer:
      'We don\'t publish prices publicly because they vary by programme (NEET dropper vs IB HL vs MCAT vs Olympiad), tier (Pursuit / Ascent / Pinnacle ZA), and currency (we accept INR, USD, AED, GBP, CAD, SAR). Send a WhatsApp message describing your child\'s programme + current class + country — we share the tier matrix and currency-specific quote in the conversation. Free trial class with Dr. Shekhar comes before any pricing discussion.',
  },
  {
    question: 'How do I start with Cerebrum?',
    answer:
      'Free 60-minute live trial class with Dr. Shekhar (or relevant senior faculty for non-NEET programmes). Bring your child\'s last biology exam — school internal, NEET PT, IB IA draft, AP test, or olympiad past paper — and we walk through specific reasoning gaps live. No commitment. Most enrolment decisions happen 1-3 days after the trial.',
  },
  {
    question: 'What\'s Cerebrum\'s actual track record?',
    answer:
      'NEET: 680+ medical college selections since 2014 (AIIMS Delhi, JIPMER, AFMC, MAMC, LHMC, plus state medical colleges), 67+ to AIIMS Delhi specifically, 98% NEET qualification rate, multiple students with 100 percentile biology (Sadhna Sirin 360/360 NEET 2023). IB: HL 7/7 outcomes across DP cohorts. AP: score-5 outcomes across US/India/UAE cohorts. Olympiads: multiple INBO Stage 2 + USABO Semifinal + BBO Gold qualifiers.',
  },
  {
    question: 'Is Cerebrum available for students outside India?',
    answer:
      'Yes — live online programmes serve 30+ countries with time-zone-matched batches. Active student cohorts include UAE, USA, UK, Canada, Saudi Arabia, Qatar, Singapore, Australia, Malaysia, Bahrain, Kuwait, Oman, Nepal, and South Africa. Printed study material shipped globally. WhatsApp / Zoom / email reply within hours of your time zone.',
  },
  {
    question: 'Why "biology specialist" specifically — what\'s the actual benefit?',
    answer:
      'NEET is 360 of 720 marks on biology — half the exam. IB HL is 4 papers — most are biology depth. AP is 8 units of College Board biology. USABO is biology only. The subjects where Cerebrum operates are biology-dominated, and biology is the subject most aspirants score lowest on. By going biology-only, we get four advantages: (1) faculty don\'t split focus, (2) batch sizes stay small because we don\'t need to fill PCM seats, (3) curriculum design is biology-deep not biology-broad-but-shallow, (4) Dr. Shekhar personally supervises biology curriculum (a generalist coaching can\'t have any one founder supervise all three subjects).',
  },
]

export default function BestBiologyCoachingIndiaPage() {
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      "Hi — I'm exploring Cerebrum's biology coaching. My child is in Class [9/10/11/12/dropper], targeting [NEET / IB / AP / MCAT / USMLE / Olympiad / CBSE]. Based in [city, country]. Please share the relevant programme details."
    )

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${PAGE_URL}#org`,
    name: 'Cerebrum Biology Academy — Best Biology Coaching India',
    description:
      'India\'s biology-only specialist coaching academy. NEET, IB, AP, MCAT, USMLE, Biology Olympiads, CBSE/ICSE Class 11-12. AIIMS-trained faculty, live online globally + 4 NCR offline centres.',
    url: PAGE_URL,
    foundingDate: '2014',
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      alumniOf: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Biology Coaching for Competitive Examinations',
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
        name: 'Best Biology Coaching India',
        item: PAGE_URL,
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Best Biology Coaching India',
          'Biology Coaching for NEET',
          'Biology Coaching for IB',
          'Biology Coaching for AP',
          'Biology Coaching for MCAT',
          'Biology Coaching for Olympiads',
          'Biology Specialist Coaching',
          'AIIMS-Trained Biology Faculty',
        ]}
        jobTitle="Founder & Lead Biology Faculty — India's Biology Specialist Coaching"
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
            <li className="text-slate-700">Best Biology Coaching India</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-900">
            <Star className="h-3.5 w-3.5" />
            India\'s biology specialist · 12 years · 680+ medical selections
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-slate-900 max-w-4xl">
            Best biology coaching in India —{' '}
            <span className="text-indigo-700">
              NEET, IB, AP, MCAT, Olympiads, all on one platform.
            </span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-4xl">
            Cerebrum Biology Academy is India&rsquo;s biology-only specialist
            coaching, founded in 2014 by Dr. Shekhar C Singh (AIIMS New Delhi
            alumnus). We cover seven exam verticals where biology is the
            dominant subject &mdash; NEET, IB (HL/SL), AP, MCAT, USMLE Step 1,
            Biology Olympiads, and CBSE/ICSE Class 11-12. One faculty team,
            one founder supervising curriculum across all programmes, four
            offline centres in Delhi NCR, and live online programmes serving
            30+ countries.
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
          <p className="mt-3 text-sm text-slate-500">
            Free 60-minute trial class with Dr. Shekhar. No card required, no
            pricing pressure.
          </p>
        </section>

        {/* Track record bar */}
        <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <p className="text-4xl font-bold">680+</p>
                <p className="mt-1 text-sm text-indigo-200">
                  Medical college selections since 2014
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold">67+</p>
                <p className="mt-1 text-sm text-indigo-200">
                  AIIMS Delhi selections personally mentored
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold">98%</p>
                <p className="mt-1 text-sm text-indigo-200">
                  NEET-UG qualification rate
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold">30+</p>
                <p className="mt-1 text-sm text-indigo-200">
                  Countries served via live online
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7 verticals grid */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            7 exam verticals · one biology-specialist coaching
          </h2>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Pick the programme that matches your child&rsquo;s exam. Each
            vertical has its own dedicated landing with tier matrix, faculty,
            and curriculum detail.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {VERTICALS.map((v) => (
              <Link
                key={v.label}
                href={v.href}
                className="group block rounded-2xl border border-slate-200 bg-white p-6 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className="text-indigo-600">{v.icon}</div>
                <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  {v.label}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {v.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-indigo-700 group-hover:underline">
                  {v.cta} →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Why specialist */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Why "biology specialist" — and what it actually delivers
            </h2>
            <p className="mt-4 text-base text-slate-700 leading-relaxed">
              India\&rsquo;s biggest coaching brands &mdash; Allen, Aakash,
              Resonance, Sri Chaitanya, FIITJEE, PW &mdash; are full-PCM (or
              full-PCMB) coaching brands. They have to maintain faculty teams
              across physics, chemistry, and biology simultaneously. That
              means biology faculty depth is structurally limited because
              hiring + retaining elite biology specialists at scale is
              expensive when physics + chemistry are also competing for the
              hiring budget. The net result: in mass-coaching biology batches,
              you get a generalist NEET biology curriculum at a batch size of
              150-200 students.
            </p>
            <p className="mt-4 text-base text-slate-700 leading-relaxed">
              Cerebrum is structurally different. Every faculty hire we make
              is biology. Every curriculum decision Dr. Shekhar personally
              reviews. Batch sizes stay small because we&rsquo;re not trying
              to fill physics + chemistry seats too. The depth on biology
              specifically is what wins NEET 360/360 outcomes (Sadhna Sirin
              2023), IB HL 7/7 outcomes, AP score-5 outcomes, and
              INBO/USABO/BBO olympiad qualifications &mdash; all from the
              same faculty team across cohorts.
            </p>
            <p className="mt-4 text-base text-slate-700 leading-relaxed">
              For families, this means a simple choice: keep your existing
              full-PCM coaching for physics + chemistry, add Cerebrum for
              biology. We don&rsquo;t replace your full-package coaching. We
              specialise where it matters.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Biology-only faculty', text: 'Every teacher specialises in biology by career, not by Tuesday/Thursday schedule' },
                { title: 'Small-batch model', text: '10-40 students per batch depending on tier vs 150-200 at mass-coaching' },
                { title: 'Founder-supervised curriculum', text: 'Dr. Shekhar personally reviews syllabus + assessments across all programmes' },
                { title: 'NEET + IB + AP + Olympiad parallel', text: 'Same faculty team teaches across these verticals — knowledge cross-pollinates' },
              ].map((b) => (
                <div key={b.title} className="rounded-xl bg-white p-5 ring-1 ring-slate-200">
                  <p className="font-semibold text-slate-900">{b.title}</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Where we operate */}
        <section className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Where we operate
          </h2>
          <p className="mt-3 text-slate-600">
            Four offline centres in Delhi NCR + live online programmes serving
            30+ countries.
          </p>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                Offline centres
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {['South Extension (Delhi)', 'Rohini (Delhi)', 'Gurugram', 'Faridabad'].map(
                  (c) => (
                    <li key={c} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                Online cohorts active in
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-slate-700">
                {[
                  'India',
                  'UAE',
                  'USA',
                  'UK',
                  'Canada',
                  'Saudi Arabia',
                  'Qatar',
                  'Singapore',
                  'Australia',
                  'Malaysia',
                  'Bahrain',
                  'Kuwait',
                  'Oman',
                  'Nepal',
                  'Egypt',
                  'South Africa',
                ].map((c) => (
                  <li key={c} className="flex gap-1.5">
                    <Globe className="h-3.5 w-3.5 shrink-0 text-indigo-600 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Best biology coaching — common questions
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
            <Award className="h-10 w-10 text-amber-300 mx-auto" />
            <h2 className="mt-4 text-2xl md:text-3xl font-bold">
              Book a free trial class with Dr. Shekhar
            </h2>
            <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
              60 minutes. Live. Bring your child\&rsquo;s last biology exam.
              No card required. Most families decide 1-3 days after.
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
