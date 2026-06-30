/**
 * /anatomy-and-physiology-tutor
 *
 * A&P I & II — the highest-value gap in the set. Audience is NURSING and
 * allied-health students (pre-nursing, pre-PT, pre-OT, pre-PA, paramedic,
 * radiography) for whom A&P is a make-or-break prerequisite with a hard GPA
 * cutoff for program admission. Distinct from the pre-med general-biology pages:
 * different students, different stakes (program admission, not med school),
 * different content (body systems, A&P I/II split, cadaver/model ID).
 * ADDITIVE: new route; no existing page touched. No fabricated stats.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Activity,
  BookOpen,
  Bone,
  CheckCircle2,
  ChevronRight,
  Clock,
  HeartPulse,
  Home,
  Microscope,
  Sparkles,
  Stethoscope,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/anatomy-and-physiology-tutor'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Anatomy & Physiology Tutor — A&P I & II for Nursing | Cerebrum',
  description:
    'Specialist Anatomy & Physiology tutor for nursing, pre-PT, pre-OT and allied-health students. Master A&P I and A&P II — every body system, the lab and cadaver/model ID, and the GPA cutoff your nursing-program application turns on. AIIMS-trained faculty, small live online classes in your US time zone (ET/CT/MT/PT), free trial.',
  keywords: [
    'anatomy and physiology tutor',
    'a&p tutor',
    'anatomy and physiology tutor for nursing',
    'a&p 1 tutor',
    'a&p 2 tutor',
    'anatomy and physiology help online',
    'nursing prerequisite tutor',
    'human anatomy tutor',
    'physiology tutor',
    'pass a&p nursing',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'en-GB': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Anatomy & Physiology Tutor — A&P I & II for Nursing · Cerebrum Biology Academy',
    description:
      'Specialist A&P I & II tutoring for nursing and allied-health students — body systems, lab/model ID, and the GPA your program application depends on. AIIMS-trained faculty, your US time zone.',
    url: PAGE_URL,
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Anatomy & Physiology Tutor — A&P I & II for Nursing',
    description:
      'Specialist A&P I & II tutoring for nursing and allied-health students. Body systems, lab/model ID, GPA stakes. AIIMS-trained faculty, your US time zone.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const COVERS_AP1 = [
  'A&P I — body organisation, homeostasis, anatomical terminology and directional language',
  'Chemistry review, cells and histology (the four tissue types examiners love)',
  'The integumentary system — skin layers, accessory structures, burns',
  'The skeletal system — bone classification, structure, the named bones and markings',
  'The muscular system — sliding-filament theory, muscle naming, origins/insertions',
  'The nervous system and special senses — neuron physiology, action potentials, reflex arcs',
]

const COVERS_AP2 = [
  'A&P II — the endocrine system and its hormones, targets and feedback loops',
  'The cardiovascular system — heart anatomy, the conduction system, ECG and hemodynamics',
  'Blood, the lymphatic system and immunity',
  'The respiratory system — ventilation, gas exchange and the oxygen-hemoglobin curve',
  'The digestive system — accessory organs, enzymes and absorption',
  'The urinary system, fluid/electrolyte/acid-base balance, and reproduction',
]

const WHY = [
  {
    icon: <Bone className="h-5 w-5 text-blue-600" />,
    title: 'Built for nursing & allied-health admission',
    text: 'A&P is the prerequisite a nursing, PT, OT, PA or paramedic program weighs most heavily — often with a hard GPA or grade cutoff (frequently a B or better) to even apply. We teach for that stake, not just the next quiz.',
  },
  {
    icon: <Microscope className="h-5 w-5 text-blue-600" />,
    title: 'Lab, cadaver and model identification',
    text: 'A&P is half lecture, half lab. We drill the practical: identifying structures on cadavers, models, histology slides and bone specimens — the tag-and-go practicum that wrecks otherwise strong students.',
  },
  {
    icon: <Stethoscope className="h-5 w-5 text-blue-600" />,
    title: 'Clinically-trained faculty',
    text: 'Faculty trained at AIIMS — India’s apex medical institute, peer to Harvard Medical School in selectivity — teach physiology the way clinicians actually use it, so feedback loops and the cardiac cycle make sense instead of being memorised cold.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Your US time zone, around clinicals',
    text: 'Live online in ET, CT, MT or PT, scheduled around lectures, labs and clinical rotations, every session recorded for review before the practical and the final.',
  },
]

const NEXT_STEPS = [
  {
    icon: Microscope,
    name: 'Microbiology',
    detail:
      'The other big nursing prerequisite, usually paired with A&P — micro for health-science majors.',
    href: '/microbiology-tutor',
  },
  {
    icon: BookOpen,
    name: 'College biology hub',
    detail:
      'Intro / general biology and the full college-biology track, if you need the foundation first.',
    href: '/college-biology-tutor',
  },
  {
    icon: Activity,
    name: 'Biology 101',
    detail: 'The first-year general-biology sequence that comes before A&P at many schools.',
    href: '/biology-101-tutor',
  },
  {
    icon: HeartPulse,
    name: 'Pathophysiology onward',
    detail: 'A&P is the launchpad for patho, pharmacology and the rest of the nursing curriculum.',
    href: '/college-biology-tutor',
  },
]

const FAQS = [
  {
    question: 'Who is this Anatomy & Physiology tutoring for?',
    answer:
      'Primarily nursing and allied-health students — pre-nursing, pre-PT, pre-OT, pre-PA, paramedic, respiratory therapy, radiography and exercise-science majors — taking the two-semester A&P I and A&P II sequence (sometimes BIO 201/202 or similar). It is also right for biology majors taking human A&P. The course is the same; the application stakes are what make it different, and we coach with those in mind.',
  },
  {
    question: 'Do you tutor both A&P I and A&P II?',
    answer:
      'Yes — both halves, and we treat the split deliberately. A&P I is the structural and foundational half (terminology, tissues, integumentary, skeletal, muscular, nervous and senses); A&P II is the systems-physiology half (endocrine, cardiovascular, blood/lymphatic/immune, respiratory, digestive, urinary, fluid-balance and reproduction). Many students ace one and stall on the other; we tailor the plan to whichever you are in and whichever you find harder.',
  },
  {
    question: 'Can you help with the lab practical and cadaver / model identification?',
    answer:
      'Yes, and it is one of the most-requested parts. The A&P practical — tagging structures on cadavers, plastic models, histology slides and bone specimens against a clock — is where many students lose the most points. We run identification drills, teach systematic naming, and build the visual recall that the practicum demands.',
  },
  {
    question: 'How do you tutor my exact course and textbook?',
    answer:
      'Send us your syllabus, your lab manual, your professor’s lecture material and your textbook edition (Marieb, Saladin, Tortora, OpenStax A&P, and so on). We rebuild tutoring around your topic order, your lab’s specific models and specimens, and your real exam and practical format — not a generic A&P outline.',
  },
  {
    question: 'Why does my A&P grade matter so much for nursing?',
    answer:
      'Nursing and most allied-health programs are competitive and admit on a points or GPA formula in which A&P I and II carry heavy weight; many require a minimum grade (often a B) in each just to be eligible to apply, and a retake can delay your application a whole cycle. That is why we teach A&P for durable understanding that protects the prerequisite GPA your program admission turns on.',
  },
  {
    question: 'What is AIIMS, for a family who hasn’t heard of it?',
    answer:
      'AIIMS — India’s apex medical institute, peer to Harvard Medical School in selectivity. Faculty trained there teach physiology clinically — the way it is actually used at the bedside — which is exactly the perspective that makes the cardiac cycle, renal handling and endocrine feedback loops finally make sense.',
  },
  {
    question: 'How much does A&P tutoring cost?',
    answer:
      'Pricing is quoted to your course, session frequency and time zone — transparently, with no obligation. Tell us where you are in A&P I or II and how often you want to meet in the free trial, and we will quote exact options.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us whether you are in A&P I or II, your university, your program goal (nursing, PT, OT, PA and so on) and your country, and we match you to the right tutor and a slot in your US time zone — students of any nationality welcome.',
  },
]

export default function AnatomyAndPhysiologyTutorPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Anatomy & Physiology (A&P I & II) Tutoring (Online, Worldwide)',
    description:
      'Specialist tutoring for college Anatomy & Physiology I and II for nursing and allied-health students — every body system, the lab and cadaver/model identification practical, and the prerequisite GPA that program admission depends on. AIIMS-trained, clinically-experienced faculty, live online in US time zones.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'Undergraduate',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['United States', 'Worldwide'],
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online' },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'details p'] },
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
      { '@type': 'ListItem', position: 3, name: 'Anatomy & Physiology Tutor', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Anatomy and Physiology Tutor',
          'A&P I and A&P II',
          'Human Anatomy',
          'Human Physiology',
          'Nursing Prerequisite Biology',
        ]}
        jobTitle="Biology & Physiology Specialist Faculty — A&P for Nursing & Allied Health"
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
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-blue-700">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">Anatomy &amp; Physiology Tutor</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <HeartPulse className="h-3.5 w-3.5" />
            A&amp;P I &amp; II · nursing &amp; allied health · US time zones
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Anatomy &amp; Physiology tutor &mdash;{' '}
            <span className="text-blue-700">clear the prerequisite that gates nursing school.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            Specialist tutoring for A&amp;P I and A&amp;P II &mdash; every body system, plus the lab
            and cadaver/model identification practical that loses students the most points. For
            nursing, pre-PT, pre-OT, pre-PA and allied-health majors, A&amp;P is the prerequisite
            your program application weighs most, often with a hard grade cutoff. We teach it
            clinically, taught by faculty trained at AIIMS &mdash; India&rsquo;s apex medical
            institute, peer to Harvard Medical School in selectivity. Live online in your US time
            zone
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Request a free trial
            </a>
            <Link
              href="/microbiology-tutor"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              Also taking Microbiology?
            </Link>
          </div>
        </section>

        {/* What we cover */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              What we cover &mdash; both semesters
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              A&amp;P I builds the structure; A&amp;P II runs the physiology. We teach to your
              syllabus, your lab manual and your specific models and specimens.
            </p>
            <div className="mt-7 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-900">
                  A&amp;P I
                </h3>
                <ul className="mt-3 grid gap-3">
                  {COVERS_AP1.map((c) => (
                    <li
                      key={c}
                      className="flex gap-3 rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-900">
                  A&amp;P II
                </h3>
                <ul className="mt-3 grid gap-3">
                  {COVERS_AP2.map((c) => (
                    <li
                      key={c}
                      className="flex gap-3 rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Why a specialist for Anatomy &amp; Physiology
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
        </section>

        {/* Next steps */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Where Anatomy &amp; Physiology leads
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              A&amp;P is the spine of the health-sciences prerequisite stack. We coach the courses
              around it too &mdash; the same faculty, the same connected understanding.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {NEXT_STEPS.map((e) => (
                <Link
                  key={e.name}
                  href={e.href}
                  className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
                >
                  <e.icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-3 text-base font-bold text-slate-900">{e.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{e.detail}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry */}
        <section id="enquiry" className="mx-auto max-w-xl px-4 py-14">
          <GlobalEnquiryForm
            source="anatomy-and-physiology-tutor"
            title="Book a free A&P trial"
            subtitle="Nursing, pre-PT, pre-OT, pre-PA or biology major — any nationality. Tell us whether you're in A&P I or II, your program goal and country; we reply within a day in your US time zone."
          />
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Anatomy &amp; Physiology tutoring &mdash; questions
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
              Pass A&amp;P with the grade your program demands
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              A specialist, clinically-taught approach to A&amp;P I and II &mdash; lecture and lab
              &mdash; that protects the prerequisite GPA nursing and allied-health admission turns
              on. Free trial first.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
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
                See all biology programmes
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
