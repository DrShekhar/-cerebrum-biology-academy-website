/**
 * /ngss-biology-help
 *
 * NGSS (Next Generation Science Standards) biology help — the three-dimensional,
 * phenomenon-based way life science is now taught and assessed in NGSS-aligned
 * states. Distinct intent from Honors tutoring and from state EOC prep: the
 * confusion here is structural (DCIs + SEPs + CCCs, explaining phenomena,
 * modelling) for students used to memorising facts. Feeds the Honors / EOC
 * funnels.
 *
 * ADDITIVE: new route; no existing page touched. No fabricated stats.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  GraduationCap,
  Home,
  Layers,
  Lightbulb,
  Microscope,
  Sparkles,
  Target,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/ngss-biology-help'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'NGSS Biology Help — Three-Dimensional & Phenomenon-Based Life Science | Cerebrum',
  description:
    'Help for students and parents in NGSS-aligned states with the three-dimensional, phenomenon-based way biology is now taught — disciplinary core ideas (DCIs), science & engineering practices (SEPs) and crosscutting concepts (CCCs). We bridge the gap for students used to memorisation. AIIMS-trained faculty, live online in your US time zone, free trial.',
  keywords: [
    'ngss biology help',
    'ngss biology tutor',
    'next generation science standards biology',
    'three dimensional learning biology',
    'phenomenon based biology',
    'ngss life science help',
    'disciplinary core ideas biology',
    'science and engineering practices biology',
    'why is ngss biology hard',
    'ngss vs ap biology',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'NGSS Biology Help (Three-Dimensional, Phenomenon-Based) · Cerebrum Biology Academy',
    description:
      'Help with the three-dimensional NGSS approach to biology — DCIs, SEPs and CCCs, phenomenon-based learning and modelling. For students used to memorisation. AIIMS-trained faculty, your US time zone.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NGSS Biology Help — Three-Dimensional Life Science',
    description:
      'Help with the three-dimensional, phenomenon-based NGSS approach to biology. AIIMS-trained faculty, live online in your US time zone.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const DIMENSIONS = [
  {
    icon: <Microscope className="h-5 w-5 text-blue-600" />,
    title: 'Disciplinary Core Ideas (DCIs)',
    text: 'The life-science content itself — structure & function, inheritance & variation, matter & energy in ecosystems, and biological evolution. This is the part that looks most like traditional biology, but NGSS asks students to use it, not just recall it.',
  },
  {
    icon: <ClipboardCheck className="h-5 w-5 text-blue-600" />,
    title: 'Science & Engineering Practices (SEPs)',
    text: 'The doing of science — asking questions, developing and using models, analysing data, constructing explanations and arguing from evidence. This is where memorisers stall: the test asks them to reason, not recite.',
  },
  {
    icon: <Layers className="h-5 w-5 text-blue-600" />,
    title: 'Crosscutting Concepts (CCCs)',
    text: 'The big ideas that span all of science — cause and effect, systems and models, structure and function, stability and change. NGSS expects students to carry these lenses across topics.',
  },
]

const PERFORMANCE_EXPECTATIONS = [
  'Structure and function — from molecules to body systems explaining how organisms work',
  'Inheritance and variation of traits — DNA, gene expression and the source of variation',
  'Matter and energy in organisms and ecosystems — photosynthesis, respiration and energy flow',
  'Interdependent relationships in ecosystems — populations, carrying capacity and disturbance',
  'Natural selection and evolution — evidence, mechanisms and patterns over time',
  'Modelling, data analysis and evidence-based argument woven through every topic',
]

const WHY = [
  {
    icon: <Lightbulb className="h-5 w-5 text-blue-600" />,
    title: 'We teach the reasoning NGSS rewards',
    text: 'NGSS questions hand a student an unfamiliar phenomenon and ask them to explain it from evidence. We coach that move directly — model it, build the explanation, argue from data — rather than handing over facts to memorise.',
  },
  {
    icon: <Microscope className="h-5 w-5 text-blue-600" />,
    title: 'A biology specialist, not a multi-subject tutor',
    text: 'One subject, taught in depth by AIIMS-trained faculty — among the most selective medical training in the world. Deep content mastery is what lets us turn any phenomenon into a teachable explanation.',
  },
  {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    title: 'Bridges memorisation to three-dimensional thinking',
    text: 'Most students arrive fluent at memorising and lost at applying. We make that transition explicit, so a strong recall habit becomes a strong reasoning habit.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Your US time zone, small live batches',
    text: 'Live online classes scheduled around your school day in ET, CT, MT or PT, with recordings. 1:1 and micro-batch options.',
  },
]

const NEXT_STEPS = [
  {
    icon: GraduationCap,
    name: 'Honors / High School Biology',
    detail:
      'Want the whole course solid, NGSS or not? Our Honors hub builds the foundation everything else rests on.',
    href: '/honors-biology-tutor',
  },
  {
    icon: ClipboardCheck,
    name: 'Biology EOC Exam Prep',
    detail:
      'Facing a state Biology End-of-Course test as well? Florida, Texas, Georgia, North Carolina and Virginia EOC prep.',
    href: '/biology-eoc-exam-prep',
  },
  {
    icon: BookOpen,
    name: 'AP Biology',
    detail:
      'The college-credit path after a strong high-school year — score-5 coaching across all College Board units.',
    href: '/ap-biology-tutor-global',
  },
]

const FAQS = [
  {
    question: 'What is NGSS biology?',
    answer:
      'NGSS biology is life science taught under the Next Generation Science Standards — a three-dimensional approach that blends Disciplinary Core Ideas (the content), Science & Engineering Practices (asking questions, modelling, analysing data, arguing from evidence) and Crosscutting Concepts (cause and effect, systems, structure and function). Instead of memorising facts, students are asked to explain real phenomena using all three dimensions together.',
  },
  {
    question: 'Why is NGSS biology so hard for some students?',
    answer:
      'Because it changes what counts as knowing. A student trained to memorise vocabulary and diagrams can still be stuck when an NGSS task hands them an unfamiliar phenomenon and asks them to model it, analyse the data and build an argument from evidence. The content may be familiar but the practices are new. We coach those practices directly, so the reasoning the test wants becomes second nature.',
  },
  {
    question: 'How is NGSS biology different from AP or Honors biology?',
    answer:
      'NGSS is a framework for how science is taught and assessed across grades, built on three-dimensional, phenomenon-based learning. Honors biology is a course level, and AP Biology is a specific College Board course and exam. They overlap in content — cells, genetics, evolution, ecology — but NGSS emphasises practices and explanation, AP emphasises depth plus rubric-graded free response, and Honors builds the underlying foundation. Many students meet all three, and we coach the connections between them.',
  },
  {
    question: 'How does tutoring actually help with NGSS biology?',
    answer:
      'We make the three dimensions concrete. We take phenomena like those on NGSS assessments, model the explanation step by step, practise reading data and graphs, and rehearse evidence-based argument — while shoring up any content (DCI) gaps underneath. The result is a student who can reason through an unfamiliar prompt instead of hunting for a memorised answer. Live online with an AIIMS-trained specialist, free trial first.',
  },
  {
    question: 'What is AIIMS, for a family who hasn’t heard of it?',
    answer:
      'AIIMS New Delhi is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School and Oxford. AIIMS-trained faculty bring the deep content mastery that lets us turn any NGSS phenomenon into a clear, teachable explanation.',
  },
  {
    question: 'How much does NGSS biology help cost?',
    answer:
      'NGSS biology help is priced per programme depending on whether you choose 1:1 or a small live batch and how many sessions you need. Contact us for a quote and start with a free trial — tell us your grade, school and US state and we’ll match you to the right tutor, a US time-zone slot (ET/CT/MT/PT) and a clear price.',
  },
]

export default function NgssBiologyHelpPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'NGSS Biology Help — Three-Dimensional, Phenomenon-Based Life Science',
    description:
      'Specialist help with NGSS (Next Generation Science Standards) biology — the three-dimensional approach combining Disciplinary Core Ideas, Science & Engineering Practices and Crosscutting Concepts, plus phenomenon-based learning and modelling. Taught by AIIMS-trained faculty, live online.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'High school',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'United States',
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'details p'],
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
        name: 'Global',
        item: `${SITE_URL}/best-biology-tutor-global`,
      },
      { '@type': 'ListItem', position: 3, name: 'NGSS Biology Help', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'NGSS Biology Help',
          'Next Generation Science Standards Biology',
          'Three-Dimensional Science Learning',
          'Phenomenon-Based Biology',
          'Disciplinary Core Ideas',
        ]}
        jobTitle="Biology Specialist Faculty — NGSS, Honors, AP, Olympiad"
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
            <li className="text-slate-700">NGSS Biology Help</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <Layers className="h-3.5 w-3.5" />
            NGSS · three-dimensional · phenomenon-based
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            NGSS biology help &mdash;{' '}
            <span className="text-blue-700">from memorising to explaining.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            If your school teaches biology under the Next Generation Science Standards, the rules
            have changed: students are handed real phenomena and asked to explain them using core
            ideas, science practices and crosscutting concepts together — not to recite facts. We
            bridge that gap for students used to memorisation. Faculty trained at AIIMS New Delhi
            (among the most selective medical schools in the world). Live online in your US time
            zone (ET/CT/MT/PT).
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Request a free trial
            </a>
            <Link
              href="/honors-biology-tutor"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              In an Honors class too?
            </Link>
          </div>
        </section>

        {/* The three dimensions */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              The three dimensions, explained plainly
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              NGSS asks students to use three things at once. Most confusion comes from never having
              the three named clearly — so we start here.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {DIMENSIONS.map((d) => (
                <div key={d.title} className="rounded-xl border border-slate-200 bg-white p-5">
                  {d.icon}
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Performance expectations / what we cover */}
        <section className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            The NGSS life-science performance expectations we cover
          </h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {PERFORMANCE_EXPECTATIONS.map((c) => (
              <li
                key={c}
                className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Why us */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Why a biology specialist for NGSS biology
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

        {/* Next steps */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Where NGSS biology help leads next
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Once three-dimensional thinking clicks, every other biology path gets easier. When
            you’re ready, we coach these too.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
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
        </section>

        {/* Enquiry */}
        <section id="enquiry" className="mx-auto max-w-xl px-4 py-14">
          <GlobalEnquiryForm
            source="ngss-biology-help"
            title="Book a free NGSS biology trial"
            subtitle="Tell us your grade, school and US state — we’ll match you to a specialist who teaches the three-dimensional way and reply within a day in your US time zone."
          />
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              NGSS biology help &mdash; questions
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
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">Make NGSS biology make sense</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              Turn memorising into explaining — the reasoning the three-dimensional standards
              reward, taught by a specialist, live online in your US time zone. Free trial first.
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
                <Award className="h-5 w-5" />
                See all biology programmes
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
