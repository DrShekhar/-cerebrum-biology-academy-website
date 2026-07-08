/**
 * /campbell-biology-summer-program  (GLOBAL audience)
 *
 * Summer intensive built around Campbell Biology — the canonical
 * university-level text used in AP Biology, IB HL, US college intro bio,
 * pre-med and biology-olympiad prep. Targets international high-schoolers
 * and pre-meds who want to master the standard text over the summer break.
 * The India-audience sibling lives at /campbell-biology-summer-program-india.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Globe,
  GraduationCap,
  Microscope,
  Phone,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/campbell-biology-summer-program'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Campbell Biology Summer Program (Online) — AP · IB · Pre-Med · Olympiad | Cerebrum',
  description:
    'Intensive online summer program built chapter-by-chapter around Campbell Biology — the standard university text. For AP Biology, IB HL, pre-med, USABO/IBO olympiad and college intro-bio students worldwide. Live 1:1 and 6–12 student micro-batches with AIIMS-trained faculty Dr. Shekhar C Singh, time-zone calibrated. Free trial class.',
  keywords: [
    'campbell biology summer program',
    'campbell biology online course',
    'campbell biology tutor',
    'campbell biology summer intensive',
    'AP biology summer program campbell',
    'campbell biology for pre-med',
    'campbell biology for IB',
    'campbell biology olympiad prep',
    'campbell biology chapter by chapter course',
    'summer biology program international students',
    'college intro biology summer prep',
    'campbell biology 12th edition course',
    'online biology summer program high school',
    'pre-med summer biology course',
    'USABO IBO summer prep campbell',
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
      'en-AE': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'Campbell Biology Summer Program (Online) · Cerebrum Biology Academy',
    description:
      'Master Campbell Biology over the summer — AP, IB HL, pre-med, olympiad. Live online, time-zone calibrated, AIIMS-trained faculty.',
    url: PAGE_URL,
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Campbell Biology Summer Program (Online) — AP · IB · Pre-Med · Olympiad',
    description:
      'Chapter-by-chapter summer intensive on the standard university biology text, live online with AIIMS-trained faculty. Free trial.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const UNITS = [
  { n: '1', title: 'The Chemistry of Life', ch: 'Ch 1–5', focus: 'Atoms, water, carbon, macromolecules' },
  { n: '2', title: 'The Cell', ch: 'Ch 6–12', focus: 'Membranes, respiration, photosynthesis, cell cycle' },
  { n: '3', title: 'Genetics', ch: 'Ch 13–21', focus: 'Meiosis, Mendel, molecular genetics, genomics' },
  { n: '4', title: 'Mechanisms of Evolution', ch: 'Ch 22–25', focus: 'Selection, speciation, phylogeny' },
  { n: '5', title: 'Biological Diversity', ch: 'Ch 26–34', focus: 'Bacteria to vertebrates, systematics' },
  { n: '6', title: 'Plant Form & Function', ch: 'Ch 35–39', focus: 'Transport, nutrition, reproduction, signaling' },
  { n: '7', title: 'Animal Form & Function', ch: 'Ch 40–51', focus: 'Homeostasis, systems, immunity, endocrine' },
  { n: '8', title: 'Ecology', ch: 'Ch 52–56', focus: 'Populations, communities, ecosystems, conservation' },
]

const TRACKS = [
  {
    icon: GraduationCap,
    title: 'AP Biology',
    body: 'Campbell is the AP Bio backbone. Summer coverage means you start senior year ahead — Units 1–8 mapped to the College Board CED, FRQ practice, and the 6 Science Practices.',
  },
  {
    icon: Globe,
    title: 'IB Biology HL/SL',
    body: 'Campbell depth mapped to the IB syllabus and assessment objectives, with IA design support and past-paper technique for HL Paper 2/3.',
  },
  {
    icon: Microscope,
    title: 'Olympiad (USABO / BBO / IBO)',
    body: 'Campbell is the primary reference for national biology olympiads. Summer is the window to read it cover-to-cover with a mentor and drill selection-exam questions.',
  },
  {
    icon: Target,
    title: 'Pre-Med / College Intro Bio',
    body: 'Get a head start on university intro biology or the MCAT bio/biochem foundation — the same text, taught for retention rather than cramming.',
  },
]

const FAQS = [
  {
    q: 'Which edition of Campbell Biology does the program follow?',
    a: 'We teach concept-by-concept and stay edition-agnostic (11th/12th/AP editions all map to the same eight units). You can use whichever edition you own; we provide the chapter-to-unit crosswalk on day one.',
  },
  {
    q: 'How long is the summer program and how is it scheduled?',
    a: 'The full intensive runs 6–8 weeks with 4–5 live sessions per week (roughly 60–90 hours total), plus a 4-week fast-track option covering the highest-yield units. All sessions are live online and scheduled in your local time zone — we run US, UK/EU, Gulf and Asia-Pacific evening slots.',
  },
  {
    q: 'Is it 1:1 or group?',
    a: 'Both. Choose 1:1 for a fully personalized pace, or a 6–12 student micro-batch grouped by exam track (AP / IB / olympiad / pre-med) for peer discussion at a lower price point.',
  },
  {
    q: 'Who teaches it?',
    a: 'Dr. Shekhar C Singh (AIIMS Delhi-trained, 15+ years teaching experience) leads the faculty. Every session is live with a specialist biology teacher — not recorded lectures.',
  },
  {
    q: 'Do I need prior biology to join?',
    a: 'No. Campbell starts from first principles (chemistry of life) and builds up. We place you into the right track after a short free trial and diagnostic.',
  },
  {
    q: 'What do I get besides live classes?',
    a: 'Chapter-wise concept notes, problem sets and past-exam questions mapped to your track, active-recall quizzes, and progress tracking. Certificate of completion on finishing the intensive.',
  },
]

export default function CampbellBiologySummerProgramPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Campbell Biology Summer Program (Online)',
    description:
      'Chapter-by-chapter summer intensive on Campbell Biology for AP Biology, IB HL, pre-med, and biology-olympiad students worldwide. Live online with AIIMS-trained faculty.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: SITE_URL,
      sameAs: SITE_URL,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT80H',
      location: { '@type': 'VirtualLocation', url: PAGE_URL },
    },
    inLanguage: 'en',
    url: PAGE_URL,
    about: ['Campbell Biology', 'AP Biology', 'IB Biology', 'Pre-Med Biology', 'Biology Olympiad'],
  }

  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema
        knowsAbout={[
          'Campbell Biology',
          'AP Biology',
          'IB Biology HL/SL',
          'Pre-Med Biology',
          'College Introductory Biology',
          'Biology Olympiad (USABO/IBO)',
          'Summer Biology Intensive',
        ]}
        jobTitle="Founder & Lead Biology Faculty"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-teal-700 px-4 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            <Sparkles className="h-4 w-4" /> Global summer intensive · Live online
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Campbell Biology Summer Program
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-green-50">
            Master the standard university biology text — chapter by chapter, over the summer —
            with AIIMS-trained faculty. Built for AP Biology, IB HL, pre-med, and USABO/IBO
            olympiad students in any country. Live, time-zone-calibrated online classes.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/book-free-demo"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-green-800 hover:bg-green-50"
            >
              <CalendarDays className="h-4 w-4" /> Book a free trial class
            </Link>
            <a
              href="https://wa.me/918826444334?text=I'm%20interested%20in%20the%20Campbell%20Biology%20Summer%20Program"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-green-50">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> 6–8 weeks · 60–90 hrs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" /> 1:1 or 6–12 micro-batch
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="h-4 w-4" /> US · UK/EU · Gulf · Asia-Pacific slots
            </span>
          </div>
        </div>
      </section>

      {/* Why Campbell over summer */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">Why master Campbell over the summer?</h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            <em>Campbell Biology</em> is the text behind AP Biology, IB HL, most college intro-bio
            courses, and national biology olympiads. During term time you rarely get to read it
            properly. Summer is the one window to go through all eight units with a mentor — so you
            start the next academic year understanding biology, not memorizing it.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {TRACKS.map((t) => (
              <div key={t.title} className="rounded-2xl border border-gray-200 p-5">
                <t.icon className="h-6 w-6 text-green-700" />
                <h3 className="mt-3 font-semibold text-gray-900">{t.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="bg-gray-50 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">The 8-unit Campbell curriculum</h2>
          <p className="mt-3 text-gray-600">
            Every unit is taught concept-first, then reinforced with track-specific past-exam
            questions and active-recall quizzes.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-500">
                  <th className="px-4 py-3">Unit</th>
                  <th className="px-4 py-3">Theme</th>
                  <th className="px-4 py-3">Campbell chapters</th>
                  <th className="px-4 py-3">Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {UNITS.map((u) => (
                  <tr key={u.n}>
                    <td className="px-4 py-3 font-semibold text-green-700">{u.n}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{u.title}</td>
                    <td className="px-4 py-3 text-gray-500">{u.ch}</td>
                    <td className="px-4 py-3 text-gray-600">{u.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">What&apos;s included</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              'Live online classes (never recorded lectures) in your time zone',
              'Chapter-wise concept notes + diagrams mapped to your exam track',
              'Track-specific problem sets: AP FRQs, IB Paper 2/3, olympiad selection questions',
              'Active-recall quizzes and spaced-repetition checkpoints',
              '1:1 doubt-clearing and progress tracking',
              'Certificate of completion for the summer intensive',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="bg-gray-50 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-start gap-4">
              <Award className="h-8 w-8 shrink-0 text-green-700" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Taught by Dr. Shekhar C Singh & specialist biology faculty
                </h2>
                <p className="mt-2 text-gray-600">
                  AIIMS Delhi-trained, 15+ years teaching biology to students preparing for the
                  world&apos;s toughest medical and biology exams. Every session is live with a
                  biology specialist — the depth Campbell deserves, taught for genuine understanding.
                </p>
                <Link
                  href="/dr-shekhar-singh-biology-faculty-india"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:underline"
                >
                  <BookOpen className="h-4 w-4" /> About the faculty
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900">{f.q}</h3>
                <p className="mt-2 text-sm text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-green-700 p-6 text-center text-white">
            <h2 className="text-xl font-bold">Start Campbell Biology this summer</h2>
            <p className="mt-2 text-sm text-green-50">
              Book a free trial class and diagnostic — we&apos;ll place you into the right track.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/book-free-demo"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-green-800 hover:bg-green-50"
              >
                Book free trial
              </Link>
              <Link
                href="/campbell-biology-summer-program-india"
                className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                In India? See the India program →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
