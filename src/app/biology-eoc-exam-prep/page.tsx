/**
 * /biology-eoc-exam-prep
 *
 * US state Biology End-of-Course (EOC) exam prep — the standardized state
 * Biology tests that gate graduation and/or GPA in several states:
 * Florida Biology 1 EOC, Texas Biology STAAR EOC, Georgia Milestones Biology,
 * North Carolina Biology EOC, Virginia SOL Biology. Distinct intent from
 * Honors tutoring: targets the high-stakes state assessment (format, cut
 * scores, GPA/graduation impact), not the classroom grade. Feeds the
 * Honors / AP funnels.
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
  ListChecks,
  Microscope,
  Sparkles,
  Target,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/biology-eoc-exam-prep'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Biology EOC Exam Prep — FL, TX, GA, NC & VA State Biology Tests | Cerebrum',
  description:
    'Specialist prep for your state Biology End-of-Course (EOC) exam — Florida Biology 1 EOC, Texas Biology STAAR, Georgia Milestones Biology, North Carolina Biology EOC and Virginia SOL Biology. We coach to the exact state standard, format and passing score, not just your class grade. AIIMS-trained faculty, live online in your US time zone, free trial.',
  keywords: [
    'biology eoc exam prep',
    'biology eoc tutor',
    'florida biology 1 eoc prep',
    'texas biology staar eoc',
    'georgia milestones biology',
    'north carolina biology eoc',
    'virginia sol biology',
    'how to pass biology eoc',
    'biology eoc practice',
    'state biology test tutor',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Biology EOC Exam Prep (FL · TX · GA · NC · VA) · Cerebrum Biology Academy',
    description:
      'Coach to the exact state Biology EOC standard, format and passing score — Florida, Texas STAAR, Georgia Milestones, North Carolina and Virginia SOL. AIIMS-trained faculty, your US time zone.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology EOC Exam Prep — FL, TX, GA, NC, VA',
    description:
      'Specialist state Biology EOC prep — coached to the exact standard, format and passing score. AIIMS-trained faculty, live online in your US time zone.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const STATE_EXAMS = [
  {
    state: 'Florida — Biology 1 EOC',
    detail:
      'A computer-based test on the state Biology 1 standards (molecular & cellular biology, classification, heredity & evolution, organisms, populations & ecosystems). The result counts as 30% of the Biology 1 course grade in most districts, so it directly moves the final grade and GPA.',
  },
  {
    state: 'Texas — Biology STAAR EOC',
    detail:
      'The State of Texas Assessments of Academic Readiness end-of-course Biology test, built on the TEKS reporting categories: cell structure & function, mechanisms of genetics, biological evolution & classification, and biological processes & systems. Passing is required for graduation.',
  },
  {
    state: 'Georgia — Milestones Biology EOC',
    detail:
      'A Georgia Milestones end-of-course assessment covering cells, organisms, genetics, evolution and ecology. It contributes a state-set percentage to the final course grade, so a low score pulls the transcript grade down.',
  },
  {
    state: 'North Carolina — Biology EOC',
    detail:
      'A state end-of-course test on the NC Standard Course of Study for Biology — cell biology, molecular genetics, ecology and evolution. The score is folded into the final course grade and feeds the school accountability report.',
  },
  {
    state: 'Virginia — SOL Biology',
    detail:
      'The Standards of Learning Biology test on scientific investigation, cellular & molecular biology, genetics, evolution and ecology. A verified credit on a science SOL is part of the path to a standard or advanced Virginia diploma.',
  },
]

const COVERS = [
  'The exact reporting categories and standards your state weights most heavily',
  'Cells, biochemistry, photosynthesis and cellular respiration',
  'Molecular genetics, DNA, inheritance and Punnett-square reasoning',
  'Evolution, natural selection, classification and cladograms',
  'Ecology, populations, energy flow and human impact',
  'Reading data tables, graphs and experimental-design stimulus items the way each EOC asks them',
]

const WHY = [
  {
    icon: <ClipboardCheck className="h-5 w-5 text-blue-600" />,
    title: 'We prep the state standard, not just the class',
    text: 'A strong report-card grade does not guarantee an EOC pass — the test draws from a specific state blueprint. We work from your state’s reporting categories and item types so nothing on test day is a surprise.',
  },
  {
    icon: <Microscope className="h-5 w-5 text-blue-600" />,
    title: 'A biology specialist, not a multi-subject tutor',
    text: 'One subject, taught in depth by AIIMS-trained faculty — among the most selective medical training in the world. Concepts are taught for understanding, which is exactly what stimulus-based EOC questions reward.',
  },
  {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    title: 'Aimed at your score, with a diagnostic first',
    text: 'We start by mapping where you stand against the state cut score, then focus the limited time before the test on the categories that move your result the most.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Your US time zone, small live batches',
    text: 'Live online classes scheduled around your school day in ET, CT, MT or PT, with recordings. 1:1 and micro-batch options, timed to your district’s testing window.',
  },
]

const NEXT_STEPS = [
  {
    icon: GraduationCap,
    name: 'Honors / High School Biology',
    detail:
      'Want the year-long grade as strong as the EOC? Our Honors hub builds the foundation the whole course rests on.',
    href: '/honors-biology-tutor',
  },
  {
    icon: BookOpen,
    name: 'AP Biology',
    detail:
      'Cleared the EOC and want the college-credit path next? Score-5 coaching across all College Board units.',
    href: '/ap-biology-tutor-global',
  },
  {
    icon: ListChecks,
    name: 'NGSS Biology Help',
    detail:
      'In an NGSS-aligned state? Help with the three-dimensional, phenomenon-based way biology is now assessed.',
    href: '/ngss-biology-help',
  },
]

const FAQS = [
  {
    question: 'Which US states have a Biology End-of-Course exam?',
    answer:
      'A Biology EOC (or its equivalent) is used in several states. The most common we coach are Florida (Biology 1 EOC), Texas (Biology STAAR EOC), Georgia (Georgia Milestones Biology), North Carolina (NC Biology EOC) and Virginia (SOL Biology). Each is built on that state’s own standards and blueprint, so the prep is state-specific — tell us your state and we coach to the right one.',
  },
  {
    question: 'How do I pass the Florida Biology 1 EOC or the Texas Biology STAAR?',
    answer:
      'Passing comes from working to the state blueprint rather than re-reading the textbook. For Florida’s Biology 1 EOC and the Texas Biology STAAR we identify the reporting categories the test weights, drill the exact stimulus item style (data tables, graphs, experimental design), and run timed practice against the cut score with an error log. We do this with an AIIMS-trained biology specialist, live online in your US time zone, starting with a free diagnostic trial.',
  },
  {
    question: 'Does the Biology EOC affect my GPA or graduation?',
    answer:
      'It depends on the state. In Florida the Biology 1 EOC typically counts as 30% of the course grade, so it directly affects the final grade and GPA. In Texas the Biology STAAR EOC is a graduation requirement. Georgia and North Carolina fold the EOC into the final course grade by a state-set percentage. Virginia’s SOL Biology can provide a verified credit toward the diploma. Because the rules differ, tell us your state and we’ll prep accordingly.',
  },
  {
    question: 'How is EOC prep different from getting a good grade in class?',
    answer:
      'A class grade reflects homework, labs, quizzes and one teacher’s style; the EOC is a single standardized test drawn from a fixed state blueprint, with its own pacing and item types. A student can earn an A in class and still be under-prepared for the EOC item style. We bridge that gap by teaching to the state standard and rehearsing the actual test format.',
  },
  {
    question: 'What is AIIMS, for a family who hasn’t heard of it?',
    answer:
      'AIIMS New Delhi is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School and Oxford. AIIMS-trained faculty bring a depth of biology understanding that makes even a standards-based state EOC feel straightforward.',
  },
  {
    question: 'How much does Biology EOC prep cost?',
    answer:
      'EOC prep is priced per programme depending on whether you choose 1:1 or a small live batch and how many sessions you need before your testing window. Contact us for a quote and start with a free trial — tell us your state, grade and test date and we’ll match you to the right tutor, a US time-zone slot and a clear price.',
  },
]

export default function BiologyEocExamPrepPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Biology End-of-Course (EOC) Exam Prep — US State Tests',
    description:
      'Specialist preparation for US state Biology End-of-Course exams — Florida Biology 1 EOC, Texas Biology STAAR, Georgia Milestones Biology, North Carolina Biology EOC and Virginia SOL Biology. Coached to each state’s standard, format and passing score by AIIMS-trained faculty, live online.',
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
      { '@type': 'ListItem', position: 3, name: 'Biology EOC Exam Prep', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Biology EOC Exam Prep',
          'Florida Biology 1 EOC',
          'Texas Biology STAAR EOC',
          'Georgia Milestones Biology',
          'Virginia SOL Biology',
        ]}
        jobTitle="Biology Specialist Faculty — State EOC, Honors, AP, Olympiad"
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
            <li className="text-slate-700">Biology EOC Exam Prep</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <ClipboardCheck className="h-3.5 w-3.5" />
            State Biology EOC · FL · TX · GA · NC · VA
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Biology EOC exam prep &mdash;{' '}
            <span className="text-blue-700">coached to your state standard.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            Specialist preparation for your state Biology End-of-Course exam — Florida Biology 1
            EOC, Texas Biology STAAR, Georgia Milestones Biology, North Carolina Biology EOC and
            Virginia SOL Biology. We prep the exact state blueprint, item style and passing score
            that gate your grade or graduation — not just the classroom average. Faculty trained at
            AIIMS New Delhi (among the most selective medical schools in the world). Live online in
            your US time zone (ET/CT/MT/PT).
          </p>
          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Request a free diagnostic trial
            </a>
            <Link
              href="/honors-biology-tutor"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              Need the class grade strong too?
            </Link>
          </div>
        </section>

        {/* State exams */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              What each major state Biology EOC tests
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Every state writes its own blueprint and stakes. We coach to the one you sit — here is
              what the major exams cover and why they count.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {STATE_EXAMS.map((e) => (
                <div key={e.state} className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="text-sm font-semibold text-slate-900">{e.state}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we cover */}
        <section className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What we cover</h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {COVERS.map((c) => (
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
              Why a biology specialist for your EOC
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
            Where EOC prep leads next
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            A passed EOC is a milestone, not a ceiling. When you’re ready, we coach the next level
            too.
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
            source="biology-eoc-exam-prep"
            title="Book a free Biology EOC diagnostic"
            subtitle="Tell us your state, grade and test date — we’ll map you against the state cut score and reply within a day in your US time zone."
          />
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Biology EOC prep &mdash; questions
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
              Walk into your state Biology EOC ready
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              Coached to the exact standard, format and passing score for Florida, Texas, Georgia,
              North Carolina or Virginia — live online in your US time zone. Free diagnostic first.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 md:flex-row">
              <a
                href="#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold hover:bg-blue-700"
              >
                <CheckCircle2 className="h-5 w-5" />
                Request a free diagnostic trial
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
