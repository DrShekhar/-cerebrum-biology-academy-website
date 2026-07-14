/**
 * /best-biology-tutor-usa
 *
 * USA country authority hub (Phase 0 of the US/UK dominance plan). Crowns the
 * existing deep US biology content — AP Biology, USABO, IBO (Team USA), IB,
 * Brain Bee, MCAT, USMLE, DAT — into a single "US students start here" entry
 * point with US-tuned SEO/AEO/GEO.
 *
 * ADDITIVE: a new route; does not touch any existing page/layout.
 * Universal framing (any nationality, US-based) — AIIMS translated for a US
 * audience. Links only verified existing routes. No fabricated stats.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  Home,
  MapPin,
  Microscope,
  Sparkles,
  Stethoscope,
  Target,
  Trophy,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/best-biology-tutor-usa'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Best Biology Tutor in the USA — AP Biology · USABO · IBO · Brain Bee · IB',
  description:
    'Specialist US biology coaching for any student: AP Biology (score-5 + FRQ), USABO & IBO Team USA, the Brain Bee, IB Biology HL/SL, plus MCAT, USMLE and DAT. AIIMS-trained faculty (apex medical school, peer to Harvard Med), small live online batches in your US time zone, free trial.',
  keywords: [
    'best biology tutor USA',
    'AP Biology tutor',
    'AP Biology tutor online',
    'AP Biology score 5',
    'USABO coaching',
    'USABO tutor',
    'IBO Team USA coaching',
    'Brain Bee coaching USA',
    'IB Biology tutor USA',
    'MCAT biology tutor',
    'USMLE Step 1 biology',
    'DAT biology tutor',
    'online biology tutor USA',
    'biology tutor for US high school',
    'biology tutor near me USA',
    'pre-med biology tutor USA',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Best Biology Tutor in the USA · Cerebrum Biology Academy',
    description:
      'AP Biology · USABO · IBO · Brain Bee · IB · MCAT · USMLE · DAT. AIIMS-trained faculty, small live online batches in your US time zone.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best Biology Tutor in the USA — AP · USABO · IBO · Brain Bee · IB',
    description:
      'Specialist US biology coaching for any student. AIIMS-trained faculty, score-5 / olympiad / pre-med focus, US time zones.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const EXAMS = [
  {
    icon: BookOpen,
    name: 'AP Biology',
    detail:
      'All 8 units of the College Board CED, FRQ rubric mastery, and score-5 targeting for the May exam.',
    href: '/ap-biology-tutor',
  },
  {
    icon: Trophy,
    name: 'USABO',
    detail:
      'USA Biology Olympiad — Open exam, Semifinal, and National Finals, the selection route to Team USA.',
    href: '/usabo-coaching',
  },
  {
    icon: Award,
    name: 'IBO — Team USA',
    detail: 'The International Biology Olympiad route for US students, through the USABO ladder.',
    href: '/ibo-coaching-usa',
  },
  {
    icon: Brain,
    name: 'Brain Bee (Neuroscience)',
    detail:
      'USA & International Brain Bee — neuroanatomy, patient diagnosis and the live-oral rounds free material skips.',
    href: '/brain-bee-coaching',
  },
  {
    icon: GraduationCap,
    name: 'IB Biology (HL & SL)',
    detail:
      'For US IB World Schools — IA & EE mentorship and Paper 1/2 technique on the 2025 syllabus.',
    href: '/ib-biology-tuition',
  },
  {
    icon: Stethoscope,
    name: 'MCAT · USMLE · DAT',
    detail:
      'Pre-med biology depth — MCAT Bio/Biochem, USMLE Step 1 foundations, and DAT survey of natural sciences.',
    href: '/best-mcat-biology-tutor',
  },
  {
    icon: GraduationCap,
    name: 'Honors Biology',
    detail:
      'High-school honors / Pre-AP biology — concept mastery, lab reasoning, and a runway into AP and olympiad tracks.',
    href: '/honors-biology-tutor',
  },
  {
    icon: BookOpen,
    name: 'College Biology',
    detail:
      'Undergraduate general & cell/molecular biology, genetics and physiology — exam technique and pre-med GPA support.',
    href: '/college-biology-tutor',
  },
]

const WHY = [
  {
    icon: <Stethoscope className="h-5 w-5 text-blue-600" />,
    title: 'AIIMS-trained clinical depth',
    text: 'Faculty trained at AIIMS New Delhi — among the most selective medical schools in the world, peer to Harvard Medical School, Johns Hopkins and Oxford. That clinical depth maps straight onto AP/USABO/MCAT-style reasoning.',
  },
  {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    title: 'Built around how each exam scores',
    text: 'AP FRQ rubrics, USABO past-paper saturation, Brain Bee practical/oral rounds — we coach where the marks actually are, not generic content review.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Your US time zone',
    text: 'Live classes in ET / CT / MT / PT, scheduled around the US school day. Recordings for every session. No 4 a.m. calls.',
  },
  {
    icon: <Microscope className="h-5 w-5 text-blue-600" />,
    title: 'Small live batches, not a video library',
    text: '1:1 and micro-batch with weekly written feedback. A biology-only specialist, not a multi-subject test-prep mill.',
  },
]

const METROS = [
  { label: 'New York & Long Island', href: '/usabo-coaching-new-york' },
  { label: 'SF Bay Area', href: '/usabo-coaching-bay-area' },
  { label: 'Boston', href: '/usabo-coaching-boston' },
  { label: 'Northern Virginia / DC', href: '/usabo-coaching-northern-virginia-dc' },
  { label: 'Houston', href: '/usabo-coaching-houston' },
  { label: 'Dallas & Austin', href: '/usabo-coaching-dallas-austin' },
  { label: 'Chicago', href: '/usabo-coaching-chicago' },
  { label: 'Los Angeles', href: '/usabo-coaching-los-angeles' },
  { label: 'Atlanta', href: '/usabo-coaching-atlanta' },
  { label: 'Seattle', href: '/usabo-coaching-seattle' },
  { label: 'New Jersey', href: '/usabo-coaching-new-jersey' },
  { label: 'Philadelphia', href: '/usabo-coaching-philadelphia' },
  { label: 'Miami', href: '/usabo-coaching-miami' },
  { label: 'Portland', href: '/usabo-coaching-portland' },
]

const FAQS = [
  {
    question: 'Is Cerebrum only for Indian or NRI students in the US?',
    answer:
      'No. Cerebrum coaches any student in the United States, of any nationality, preparing for any biology exam — AP Biology, USABO, the Brain Bee, IB Biology, MCAT, USMLE or DAT. These are universal exams; our biology-only specialization and AIIMS-trained faculty apply to every US student.',
  },
  {
    question: 'What is AIIMS, for a US family who hasn’t heard of it?',
    answer:
      'AIIMS New Delhi (All India Institute of Medical Sciences) is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School, Johns Hopkins and Oxford in selectivity. AIIMS-trained faculty bring clinical and research depth that directly strengthens AP Biology, USABO, MCAT and Brain Bee preparation.',
  },
  {
    question: 'Which US biology exams do you coach?',
    answer:
      'AP Biology (all 8 units, FRQ, score-5), USABO (Open / Semifinal / National Finals → Team USA), the International Biology Olympiad route, the USA & International Brain Bee, IB Biology HL/SL for US IB schools, and the pre-medical layer: MCAT Bio/Biochem, USMLE Step 1 biology, and DAT.',
  },
  {
    question: 'How do US time zones and scheduling work?',
    answer:
      'Live online classes run in your US time zone — Eastern, Central, Mountain or Pacific — scheduled around the school day, with every session recorded for revision. 1:1 tutoring is booked to your calendar.',
  },
  {
    question: 'How does pricing work for US students?',
    answer:
      'Pricing depends on the exam, tier (1:1 vs small batch) and hours, quoted in US dollars. We don’t publish a flat price sheet because the right plan varies by student — a free trial class comes first, then we share the USD quote. Pay securely by international debit or credit card.',
  },
  {
    question: 'How much does it cost, and is online as good as in-person?',
    answer:
      'Cost depends on the exam, the tier (1:1 vs small batch) and the hours, and is quoted in US dollars after a free trial — typically well below a US in-person specialist tutor because our faculty are based in India and teach live online. Online is the format we recommend, not a compromise: every session is live and interactive (not a video library), recorded for revision, and run in your US time zone, which also gives you access to AIIMS-trained biology specialists you would rarely find in-person locally.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us your exam (AP, USABO, Brain Bee, IB, MCAT…), grade and US state, and we match you to the right tutor and time-zone slot. Use the form on this page or WhatsApp +1-friendly via +91 88264 44334.',
  },
]

export default function BestBiologyTutorUSAPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Biology Coaching for US Students — AP, USABO, IBO, Brain Bee, IB, MCAT',
    description:
      'Specialist biology coaching for US students across AP Biology, USABO, IBO (Team USA), the Brain Bee, IB Biology HL/SL, MCAT, USMLE and DAT. AIIMS-trained faculty, live online in US time zones.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'US high school + pre-medical',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'United States' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'details p'],
    },
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'US biology exams coached by Cerebrum',
    itemListElement: EXAMS.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.name,
      url: `${SITE_URL}${e.href}`,
    })),
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
        name: 'Global',
        item: `${SITE_URL}/best-biology-tutor-global`,
      },
      { '@type': 'ListItem', position: 3, name: 'USA', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Best Biology Tutor USA',
          'AP Biology Tutor',
          'USABO Coach',
          'IBO Team USA Coach',
          'Brain Bee Coach',
          'IB Biology Tutor',
          'MCAT Bio/Biochem Tutor',
          'USMLE Step 1 Biology Tutor',
        ]}
        jobTitle="US Biology Specialist Faculty — AP / USABO / IBO / Brain Bee / MCAT"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
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
              <Link href="/" className="hover:text-blue-700 flex items-center gap-1">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/best-biology-tutor-global" className="hover:text-blue-700">
                Global
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">USA</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            🇺🇸 Biology coaching for US students · any nationality
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            The best biology tutor in the USA &mdash;{' '}
            <span className="text-blue-700">AP, USABO, IBO, Brain Bee &amp; IB.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            One subject, taught by specialists. Cerebrum coaches US students for AP Biology (score-5
            + FRQ), the USA Biology Olympiad and IBO Team USA, the Brain Bee, IB Biology HL/SL, and
            the pre-med layer (MCAT, USMLE, DAT). Faculty are trained at AIIMS New Delhi &mdash;
            among the most selective medical schools in the world, peer to Harvard Medical School
            and Oxford &mdash; so the depth applies to every US biology exam. Live online in your
            time zone.
          </p>
          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Request a free trial
            </a>
            <Link
              href="/best-ap-biology-tutor-usa"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              AP Biology by city &amp; school
            </Link>
          </div>
        </section>

        {/* Exams */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Every US biology exam &mdash; one specialist faculty
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {EXAMS.map((e) => (
                <Link
                  key={e.name}
                  href={e.href}
                  className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
                >
                  <e.icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{e.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{e.detail}</p>
                  <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
                    Explore <ChevronRight className="h-3.5 w-3.5" />
                  </p>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Deep-dive guides:{' '}
              <Link href="/ap-biology-score-5-study-guide" className="text-blue-700 underline">
                AP score-5 study guide
              </Link>{' '}
              ·{' '}
              <Link href="/ap-biology-frq-rubric-mastery" className="text-blue-700 underline">
                AP FRQ rubric mastery
              </Link>{' '}
              ·{' '}
              <Link href="/ap-biology-vs-usabo" className="text-blue-700 underline">
                AP vs USABO
              </Link>{' '}
              ·{' '}
              <Link href="/usabo-past-papers" className="text-blue-700 underline">
                USABO past papers
              </Link>{' '}
              ·{' '}
              <Link href="/best-dat-biology-tutor" className="text-blue-700 underline">
                DAT biology
              </Link>{' '}
              ·{' '}
              <Link href="/usmle-step-1-biology-preparation" className="text-blue-700 underline">
                USMLE Step 1 biology
              </Link>
              .
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Global exam hubs (open to any nationality):{' '}
              <Link href="/ap-biology-tutor-global" className="text-blue-700 underline">
                AP Biology
              </Link>{' '}
              ·{' '}
              <Link href="/mcat-biology-tutor-global" className="text-blue-700 underline">
                MCAT Bio/Biochem
              </Link>{' '}
              ·{' '}
              <Link href="/biology-olympiad-tutor-global" className="text-blue-700 underline">
                Biology Olympiad
              </Link>{' '}
              ·{' '}
              <Link href="/ib-biology-tutor-global" className="text-blue-700 underline">
                IB Biology
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Why us */}
        <section>
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Why US families choose a biology specialist
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {WHY.map((c) => (
                <div key={c.title} className="rounded-xl border border-slate-200 bg-white p-5">
                  {c.icon}
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GEO — by metro */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 md:text-3xl">
              <MapPin className="h-6 w-6 text-blue-600" /> Coaching by US metro
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Local context, your time zone. Don&rsquo;t see your city? We coach students anywhere
              in the US online &mdash; just ask. (Full AP-by-city directory on the{' '}
              <Link href="/best-ap-biology-tutor-usa" className="text-blue-700 underline">
                AP Biology USA
              </Link>{' '}
              page.)
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {METROS.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                >
                  {m.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* By state + pathway/competition hubs */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Explore by state &amp; pathway
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              State-by-state coverage, the full biology pathway, and the US competition track.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: 'The US biology pathway', href: '/us-biology-pathway' },
                { label: 'US biology competitions', href: '/us-biology-competitions-hub' },
                { label: 'California', href: '/biology-tutor-california' },
                { label: 'Texas', href: '/biology-tutor-texas' },
                { label: 'New York', href: '/biology-tutor-new-york' },
                { label: 'New Jersey', href: '/biology-tutor-new-jersey' },
                { label: 'Massachusetts', href: '/biology-tutor-massachusetts' },
                { label: 'Virginia', href: '/biology-tutor-virginia' },
                { label: 'Illinois', href: '/biology-tutor-illinois' },
                { label: 'Florida', href: '/biology-tutor-florida' },
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry form */}
        <section id="enquiry">
          <div className="mx-auto max-w-xl px-4 py-14">
            <GlobalEnquiryForm
              source="usa-hub"
              title="Book a free trial — US biology coaching"
              subtitle="Any US student, any nationality, any biology exam. Tell us your exam, grade and state — we reply within a day in your time zone."
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Biology coaching in the USA &mdash; common questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200">
              {FAQS.map((f, idx) => (
                <details key={idx} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    <span>{f.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
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
            <Sparkles className="mx-auto h-10 w-10 text-amber-300" />
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              The #1 biology specialist for US students
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              AP · USABO · IBO · Brain Bee · IB · MCAT · USMLE · DAT — one faculty, your time zone,
              a free trial first.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 md:flex-row">
              <a
                href="#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold hover:bg-blue-700"
              >
                <CheckCircle2 className="h-5 w-5" />
                Request a free trial
              </a>
              <Link
                href="/best-biology-tutor-global"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                Outside the US? See global
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
