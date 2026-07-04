/**
 * /microbiology-tutor
 *
 * College Microbiology — the second big nursing/pre-health prerequisite, usually
 * paired with A&P. Distinct content: prokaryote structure, microbial metabolism
 * and genetics, immunology, host-pathogen interaction, and the heavily-tested lab
 * (aseptic technique, staining, culture, identification). Audience overlaps A&P
 * (nursing/allied health) so the two pages cross-link as a prerequisite pair.
 * ADDITIVE: new route; no existing page touched. No fabricated stats.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  Bug,
  CheckCircle2,
  ChevronRight,
  Clock,
  FlaskConical,
  HeartPulse,
  Home,
  Microscope,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/microbiology-tutor'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Microbiology Tutor (Online) — Micro for Nursing & Health | Cerebrum',
  description:
    'Specialist college Microbiology tutor for nursing and pre-health students. Master prokaryote structure, microbial metabolism and genetics, immunology, host-pathogen interaction, and the heavily-tested micro lab (staining, culture, aseptic technique, identification). Taught to your syllabus. AIIMS-trained faculty, small live online classes in your US time zone (ET/CT/MT/PT), free trial.',
  keywords: [
    'microbiology tutor',
    'microbiology tutor online',
    'micro tutor nursing',
    'microbiology help',
    'microbiology for nursing tutor',
    'immunology tutor',
    'bacterial genetics tutor',
    'microbiology lab help',
    'host pathogen tutor',
    'pass microbiology nursing',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'en-GB': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Microbiology Tutor (Online) — Micro for Nursing & Health · Cerebrum Biology Academy',
    description:
      'Specialist college Microbiology tutoring for nursing and pre-health — microbial structure, metabolism, genetics, immunology, host-pathogen, and the micro lab. AIIMS-trained faculty, your US time zone.',
    url: PAGE_URL,
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Microbiology Tutor (Online) — Micro for Nursing & Health',
    description:
      'Specialist college Microbiology tutoring for nursing and pre-health, including the micro lab. AIIMS-trained faculty, your US time zone.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const COVERS = [
  'Prokaryotic cell structure — the bacterial envelope, Gram-positive vs Gram-negative walls, capsules, flagella, endospores',
  'Microbial growth — the growth curve, requirements, control by physical and chemical agents',
  'Microbial metabolism — fermentation, aerobic/anaerobic respiration and how it drives identification',
  'Microbial genetics — mutation, transformation, transduction, conjugation and antibiotic resistance',
  'Viruses, fungi, protozoa and helminths — structure, replication and disease',
  'Immunology — innate and adaptive immunity, antibodies, the immune response and vaccination',
  'Host-pathogen interaction — pathogenicity, virulence factors, epidemiology and disease transmission',
  'The micro lab — aseptic technique, Gram and other stains, streak plates, culture and identification keys',
]

const WHY = [
  {
    icon: <ShieldCheck className="h-5 w-5 text-blue-600" />,
    title: 'A nursing & pre-health prerequisite',
    text: 'Microbiology is, with A&P, the prerequisite nursing and allied-health programs weigh most, often with a minimum grade to apply. We teach for that stake — durable understanding that protects the prerequisite GPA, not just the next quiz.',
  },
  {
    icon: <Microscope className="h-5 w-5 text-blue-600" />,
    title: 'The lab, drilled properly',
    text: 'The micro lab — Gram staining, aseptic technique, streak plates, biochemical tests and using a dichotomous key to identify an unknown — is heavily weighted and easy to lose points on. We rehearse the logic and the protocols so the practical and the unknown report go smoothly.',
  },
  {
    icon: <HeartPulse className="h-5 w-5 text-blue-600" />,
    title: 'Clinically-trained faculty',
    text: 'Faculty trained at AIIMS — India’s apex medical institute, peer to Harvard Medical School in selectivity — teach micro and immunology the way clinicians use them, so infection, resistance and the immune response connect to real patient care.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Your US time zone, around clinicals',
    text: 'Live online in ET, CT, MT or PT, scheduled around lectures, labs and rotations, every session recorded for review before the lab practical and the final. One-on-one and small-batch options.',
  },
]

const NEXT_STEPS = [
  {
    icon: HeartPulse,
    name: 'Anatomy & Physiology',
    detail:
      'The prerequisite pair to micro for nursing — A&P I & II, body systems and the practical.',
    href: '/anatomy-and-physiology-tutor',
  },
  {
    icon: BookOpen,
    name: 'College biology hub',
    detail:
      'Intro / general biology and the full college-biology track, if you need the foundation first.',
    href: '/college-biology-tutor',
  },
  {
    icon: FlaskConical,
    name: 'Biology 101',
    detail: 'The first-year general-biology sequence many micro courses assume you have completed.',
    href: '/biology-101-tutor',
  },
  {
    icon: Award,
    name: 'Cell & Molecular Biology',
    detail: 'Go deeper on the molecular machinery behind microbial genetics and gene expression.',
    href: '/cell-and-molecular-biology-tutor',
  },
]

const FAQS = [
  {
    question: 'Who is this Microbiology tutoring for?',
    answer:
      'Mainly nursing and allied-health students — pre-nursing, pre-PA, pre-PT, pre-pharmacy, paramedic, dental hygiene and public-health majors — taking the college microbiology prerequisite (often BIO 205/261 or similar), as well as biology majors taking general micro. The course content is similar across programs; what differs is the admission stake, which we factor into how we teach.',
  },
  {
    question: 'Microbiology has a huge amount to memorise — how do you make it manageable?',
    answer:
      'We replace rote memorisation with frameworks. Instead of memorising each organism in isolation, we teach you to classify by structure, metabolism and Gram reaction, then attach the diseases and the lab results to that scaffold. Immunology is taught as a connected response rather than a list of cells. That structure is what makes the volume of micro material stick.',
  },
  {
    question: 'Can you help with the microbiology lab and the unknown identification?',
    answer:
      'Yes — the lab is one of the most-requested parts. We walk through aseptic technique, the Gram stain and other differential stains, streak-plate isolation, the biochemical test battery, and the dichotomous-key logic for identifying an unknown organism (the classic unknown lab report). We rehearse the reasoning so the practical and the write-up are far less stressful.',
  },
  {
    question: 'How do you tutor my exact course and textbook?',
    answer:
      'Send us your syllabus, lab manual, past exams and textbook edition (Tortora’s Microbiology: An Introduction, Bauman, OpenStax Microbiology, and so on). We rebuild tutoring around your topic order, your lab’s specific tests and organisms, and your real exam and practical format — not a generic micro outline.',
  },
  {
    question: 'Why does my Microbiology grade matter for nursing?',
    answer:
      'Micro is a core nursing and allied-health prerequisite that admissions formulas weight heavily, frequently with a minimum grade (often a B) required to apply, and a retake can cost you an application cycle. We teach micro for durable understanding so it protects the prerequisite GPA your program admission depends on.',
  },
  {
    question: 'What is AIIMS, for a family who hasn’t heard of it?',
    answer:
      'AIIMS — India’s apex medical institute, peer to Harvard Medical School in selectivity. Faculty trained there teach microbiology and immunology clinically — the way infection, antibiotic resistance and the immune response actually present in patients — which makes the material concrete instead of abstract.',
  },
  {
    question: 'How much does Microbiology tutoring cost?',
    answer:
      'Pricing is quoted to your course, session frequency and time zone — transparently, with no obligation. Tell us where you are in the course and how often you want to meet in the free trial and we will quote exact options.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us your course, university, program goal and country, and we match you to the right tutor and a slot in your US time zone — students of any nationality welcome.',
  },
]

export default function MicrobiologyTutorPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'College Microbiology Tutoring (Online, Worldwide)',
    description:
      'Specialist tutoring for college Microbiology for nursing and pre-health students — prokaryote structure, microbial growth, metabolism and genetics, immunology, host-pathogen interaction, and the micro lab (staining, culture, aseptic technique, identification). Taught to your syllabus by AIIMS-trained, clinically-experienced faculty, live online in US time zones.',
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
      { '@type': 'ListItem', position: 3, name: 'Microbiology Tutor', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Microbiology Tutor',
          'Microbiology for Nursing',
          'Immunology',
          'Microbial Genetics',
          'Host-Pathogen Interaction',
        ]}
        jobTitle="Biology & Microbiology Specialist Faculty — Micro for Nursing & Pre-Health"
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
            <li className="text-slate-700">Microbiology Tutor</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <Bug className="h-3.5 w-3.5" />
            College micro · nursing &amp; pre-health · US time zones
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Microbiology tutor &mdash;{' '}
            <span className="text-blue-700">tame the volume and ace the lab.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            Specialist tutoring for college Microbiology &mdash; the other big nursing and
            pre-health prerequisite, usually paired with A&amp;P. We turn the firehose of organisms,
            metabolism, genetics and immunology into a structured framework you can actually recall,
            and rehearse the heavily-tested lab: Gram staining, aseptic technique, culture and
            identifying the unknown. Taught clinically by faculty trained at AIIMS &mdash;
            India&rsquo;s apex medical institute, peer to Harvard Medical School in selectivity.
            Live online in your US time zone
          </p>
          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Request a free trial
            </a>
            <Link
              href="/anatomy-and-physiology-tutor"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              Also taking A&amp;P?
            </Link>
          </div>
        </section>

        {/* What we cover */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What we cover</h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              The full microbiology course &mdash; lecture and lab &mdash; taught to your syllabus,
              your lab manual and your professor&rsquo;s emphasis.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {COVERS.map((c) => (
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
        </section>

        {/* Why us */}
        <section className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Why a specialist for Microbiology
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
              Where Microbiology leads
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Micro and A&amp;P together open the nursing and allied-health curriculum. We coach the
              courses around it &mdash; the same faculty, the same connected understanding.
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
            source="microbiology-tutor"
            title="Book a free Microbiology trial"
            subtitle="Nursing, pre-health or biology major — any nationality. Tell us your course, program goal and country; we reply within a day in your US time zone."
          />
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Microbiology tutoring &mdash; questions
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
              Pass Microbiology with the grade your program demands
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              A specialist, clinically-taught approach to micro &mdash; lecture and lab &mdash; that
              protects the prerequisite GPA nursing and allied-health admission turns on. Free trial
              first.
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
                See all biology programmes
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
