import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { ArrowRight, BookOpen, Globe, Target, Users, Award, MessageCircle } from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology'

export const metadata: Metadata = {
  title: 'IB Biology Coaching Hub | HL & SL Tutors, IA & EE Help | Cerebrum',
  description:
    'Your complete IB Biology resource hub. Expert tutors for HL & SL, Internal Assessment coaching, Extended Essay support, past papers, and global online classes. 2025 syllabus ready.',
  keywords: [
    'IB Biology',
    'IB Biology coaching',
    'IB Biology tutor',
    'IB Biology HL',
    'IB Biology SL',
    'IB Biology IA',
    'IB Biology Extended Essay',
    'IB Biology 2025',
    'IB Diploma Biology',
    'IB Biology online',
  ],
  openGraph: {
    title: 'IB Biology Coaching Hub | HL & SL Tutors, IA & EE Help',
    description:
      'Complete IB Biology resource — expert tutors, IA coaching, EE support, past papers. 2025 syllabus ready.',
    type: 'website',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology Coaching Hub | Cerebrum',
    description: 'Expert IB Biology tutors, IA & EE coaching, past papers. 2025 syllabus ready.',
  },
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const hubFAQs = [
  {
    question: 'What is the IB Biology Diploma Programme?',
    answer:
      'The IB Biology Diploma Programme is a two-year course offered at Standard Level (150 teaching hours) and Higher Level (240 teaching hours). It covers core topics like cell biology, genetics, evolution, ecology, and human physiology, plus a mandatory Internal Assessment (20% of grade) and optional Extended Essay. Students are assessed through external exam papers and the Internal Assessment.',
  },
  {
    question: 'What changed in the 2025 IB Biology syllabus?',
    answer:
      'The 2025 IB Biology syllabus is reorganized around four themes — Unity and Diversity, Form and Function, Interaction and Interdependence, and Continuity and Change. Paper 3 (options) has been removed, assessment is now split across two papers, and Internal Assessment criteria give more weight (around 50%) to Conclusion and Evaluation. First assessment is May 2025.',
  },
  {
    question: 'How is IB Biology HL different from SL?',
    answer:
      'IB Biology HL (Higher Level) covers 240 teaching hours with additional higher-level content (AHL topics) such as nucleic acids, metabolism, plant biology, and animal physiology. SL (Standard Level) covers 150 hours focused on core topics. HL is recommended for students pursuing medicine, biotechnology, or biological sciences at university.',
  },
  {
    question: 'How long does it take to complete IB Biology?',
    answer:
      'The IB Biology Diploma Programme runs over two academic years. Students begin in Year 1 (Grade 11) with foundational topics and typically start their Internal Assessment. Year 2 (Grade 12) focuses on advanced topics, IA completion, and exam preparation. Final assessments are in May or November of Year 2.',
  },
  {
    question: 'Does Cerebrum support IB Biology students outside India?',
    answer:
      'Yes. We offer online IB Biology coaching across timezones including IST, GMT, EST, PST, SGT, GST, and CET. Our students come from international schools in the UK, USA, Canada, UAE, Singapore, Hong Kong, Australia, and many other countries. We also have dedicated country pages with local pricing.',
  },
  {
    question: 'What IB Biology resources does Cerebrum provide?',
    answer:
      'Our IB Biology students get access to examiner-led live classes, a past-paper bank, topic-wise revision notes, IA guidance from topic selection to final submission, Extended Essay support, mock exams, personalized study plans, and 24/7 WhatsApp access to tutors.',
  },
]

const coreResources = [
  {
    title: 'IB Biology Coaching Hub',
    href: '/boards/ib',
    description:
      'Full IB Biology program overview — HL & SL coverage, examiner faculty, IA support, pricing plans, and score guarantees.',
    icon: BookOpen,
    accent: 'text-teal-600',
  },
  {
    title: 'IB Biology Tuition',
    href: '/ib-biology-tuition',
    description:
      'Structured IB Biology tuition with topic-by-topic mastery. Small groups and 1:1. Covers HL & SL with IA support.',
    icon: Target,
    accent: 'text-green-600',
  },
  {
    title: 'IB Biology Tutor Online',
    href: '/ib-biology-tutor-online',
    description:
      'Find an expert IB Biology tutor for online lessons. Specialists in HL, SL, IA coaching, and exam strategy.',
    icon: Users,
    accent: 'text-blue-600',
  },
  {
    title: 'IB Biology Online Classes',
    href: '/ib-biology-online-classes',
    description:
      'Live online IB Biology classes across global timezones. Interactive whiteboard, recorded sessions, exam-focused.',
    icon: Globe,
    accent: 'text-purple-600',
  },
]

const pathwayResources = [
  {
    title: 'IB + IGCSE Biology Program',
    href: '/courses/ib-igcse-biology',
    description:
      'Specialist coaching for international curriculum students — IB DP, IB MYP, IGCSE, Cambridge, and A-Level Biology.',
  },
  {
    title: 'IB to NEET Biology Preparation',
    href: '/ib-to-neet-biology-preparation',
    description:
      'Transition from IB Biology to Indian medical entrance exam (NEET). Bridge curriculum gaps with 60% syllabus overlap.',
  },
  {
    title: 'IB/IGCSE Biology Tuition — Gurugram',
    href: '/ib-igcse-biology-tuition-gurugram',
    description:
      'In-person and online IB & IGCSE Biology tuition for international school students in Gurugram and Delhi NCR.',
  },
  {
    title: 'IB Organisation Preparation',
    href: '/ibo-preparation',
    description:
      'Preparation for International Biology Olympiad (IBO) — next level challenge for top IB Biology students.',
  },
]

const globalResources = [
  { country: 'United States', href: '/international/us' },
  { country: 'United Kingdom', href: '/international/uk' },
  { country: 'Canada', href: '/international/ca' },
  { country: 'Australia', href: '/international/au' },
  { country: 'Singapore', href: '/international/sg' },
  { country: 'UAE (Dubai)', href: '/international/ae' },
  { country: 'Hong Kong', href: '/international/hk' },
  { country: 'Ireland', href: '/international/ie' },
  { country: 'New Zealand', href: '/international/nz' },
  { country: 'South Africa', href: '/international/za' },
]

function HubCollectionSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'IB Biology Coaching Hub',
    description:
      'Central resource hub for IB Biology students — expert tutors, Internal Assessment coaching, Extended Essay support, past papers, and global online classes for the 2025 syllabus.',
    url: PAGE_URL,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    about: {
      '@type': 'Thing',
      name: 'IB Biology Diploma Programme',
      description:
        'International Baccalaureate Diploma Programme Biology course (Higher Level and Standard Level), including Internal Assessment and Extended Essay components.',
    },
    hasPart: [
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/boards/ib',
        name: 'IB Biology Coaching',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/ib-biology-tuition',
        name: 'IB Biology Tuition',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/ib-biology-tutor-online',
        name: 'IB Biology Tutor Online',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/ib-biology-online-classes',
        name: 'IB Biology Online Classes',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/courses/ib-igcse-biology',
        name: 'IB + IGCSE Biology Program',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/ib-to-neet-biology-preparation',
        name: 'IB to NEET Biology Preparation',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function IBBiologyHubPage() {
  return (
    <>
      <HubCollectionSchema />
      <FAQSchema questions={hubFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema items={[{ label: 'IB Biology', isCurrentPage: true }]} showSchemaOnly />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-green-500 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-medium text-white">
                  IB Biology
                </li>
              </ol>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
              <Award className="h-4 w-4" />
              IB Biology 2025 Syllabus Ready
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              IB Biology Coaching Hub
              <span className="mt-2 block text-green-400">HL &amp; SL, IA, EE, Past Papers</span>
            </h1>

            <p className="mb-8 max-w-3xl text-lg text-gray-300 sm:text-xl">
              Everything you need to master IB Biology — expert tutors, Internal Assessment
              coaching, Extended Essay support, past paper practice, and global online classes.
              Built for students in <strong>IB World Schools</strong> around the world.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/boards/ib"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:bg-green-600"
              >
                Explore Full Program
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={`https://wa.me/918826444334?text=${encodeURIComponent("Hi! I'm interested in IB Biology coaching. Please share program details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/60"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp a Counsellor
              </a>
            </div>
          </div>
        </section>

        {/* Core resources */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Core IB Biology Programs
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Choose the format that fits you — full programs, 1:1 tuition, online group classes,
                or dedicated exam-specialist tutors.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {coreResources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md sm:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
                    <resource.icon className={`h-6 w-6 ${resource.accent}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-green-700">
                    {resource.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{resource.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About IB Biology — evergreen text content for SEO/AEO */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              About IB Biology: HL &amp; SL, 2025 Syllabus, Assessment
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                <strong>IB Biology</strong> is one of the most popular Group 4 (Experimental
                Sciences) subjects in the International Baccalaureate Diploma Programme. It is
                offered at two levels: <strong>Higher Level (HL — 240 hours)</strong> and{' '}
                <strong>Standard Level (SL — 150 hours)</strong>. Students study core topics
                including cell biology, molecular biology, genetics, ecology, evolution, and human
                physiology, alongside extended higher-level content for HL students.
              </p>
              <p>
                The <strong>first assessment of the new 2025 IB Biology syllabus</strong> took place
                in May 2025. The new syllabus reorganizes content around four themes — Unity and
                Diversity, Form and Function, Interaction and Interdependence, and Continuity and
                Change. Paper 3 (options) has been removed, and assessment is now structured across
                two papers, with the{' '}
                <strong>Internal Assessment (IA) contributing 20% of the final grade</strong>.
              </p>
              <p>
                A strong IB Biology grade opens doors to university medicine, biological sciences,
                biotechnology, veterinary science, psychology, environmental science, and dentistry.
                Top universities in the UK (Oxford, Cambridge, Imperial), USA (Harvard, Stanford,
                MIT), Canada (Toronto, McGill, UBC), Singapore (NUS, NTU), and Australia (Melbourne,
                Sydney, ANU) recognize IB Biology HL — especially a grade of 6 or 7 — as evidence of
                rigorous science preparation.
              </p>
            </div>
          </div>
        </section>

        {/* Pathways */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Pathways &amp; Specializations
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                IB Biology connects to IGCSE progression, NEET bridge programs, Biology Olympiad
                tracks, and city-specific in-person coaching.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {pathwayResources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-green-300 hover:shadow-md"
                >
                  <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-green-700">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Global coverage */}
        <section className="bg-gradient-to-br from-slate-50 to-green-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                IB Biology Coaching — Global Markets
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Country-specific IB Biology tutoring with local currency pricing and timezone-aware
                scheduling.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {globalResources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 transition-all hover:border-green-300 hover:text-green-700"
                >
                  {resource.country}
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/international"
                className="inline-flex items-center gap-2 text-base font-semibold text-green-700 hover:text-green-800"
              >
                See all international pages
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                IB Biology — Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {hubFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-green-600 group-open:rotate-180 transition-transform">
                        ▾
                      </span>
                    </h3>
                  </summary>
                  <p className="mt-4 leading-relaxed text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 sm:py-20 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ready to Excel in IB Biology?</h2>
            <p className="mb-8 text-lg text-green-100">
              Talk to a Cerebrum counsellor about your IB Biology goals — HL or SL, IA support,
              exam-year crash course, or full 2-year program.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href={`https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want to book a free consultation for IB Biology coaching.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
              >
                <MessageCircle className="h-6 w-6" />
                Book Free Consultation
              </a>
              <Link
                href="/boards/ib"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10"
              >
                Explore Full Program
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
