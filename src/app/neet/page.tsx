import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import {
  ArrowRight,
  BookOpen,
  Target,
  Users,
  Award,
  MessageCircle,
  Phone,
  MapPin,
  Globe,
  GraduationCap,
  Trophy,
  CheckCircle,
} from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Hub — Cerebrum Biology Academy',
  description:
    'NEET Biology coaching hub by Cerebrum Biology Academy. AIIMS-trained faculty, 98% qualification rate, 680+ medical college selections. Class 9-12, dropper, crash, and city-specific NEET tracks.',
  keywords: [
    'NEET Biology',
    'NEET Biology coaching',
    'NEET Biology tutor',
    'NEET 2026',
    'NEET-UG Biology',
    'NEET Biology online coaching',
    'NEET dropper batch',
    'NEET crash course',
    'best NEET coaching',
    'NEET coaching institute',
    'AIIMS Biology coaching',
    'NCERT Biology Class 11 12',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Hub — Cerebrum Biology Academy',
    description:
      'AIIMS-trained Biology faculty, 98% NEET qualification rate, 680+ medical college selections. Complete NEET Biology resource — courses, city hubs, NRI tracks.',
    type: 'website',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Hub | Cerebrum Biology Academy',
    description:
      'AIIMS-trained faculty, 98% qualification rate, 680+ medical college selections. NEET 2026-ready.',
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
    question: 'What is NEET-UG and why is Biology the most important section?',
    answer:
      'NEET-UG (National Eligibility cum Entrance Test, Undergraduate) is the single national entrance exam for admission to MBBS, BDS, BAMS, BHMS, BVSc, and allied medical UG courses in India. The paper has 200 questions across Physics, Chemistry, and Biology (Botany + Zoology). Biology contributes 360 of the 720 total marks — exactly 50% of the paper — making it the highest-weight subject and the single biggest determinant of a rank that converts into an MBBS seat.',
  },
  {
    question: 'Why does Biology decide 50% of the NEET-UG paper?',
    answer:
      'The NEET-UG paper has 90 Biology questions out of 180 attempted. Each correct answer is +4 marks, so Biology alone contributes 360 of 720 marks. Physics and Chemistry contribute 180 marks each. Because Biology is largely memory-plus-application from NCERT Class 11 and 12, it is the most scoring section — toppers consistently score 340-360 out of 360. A weak Biology score is mathematically very hard to recover from in Physics or Chemistry.',
  },
  {
    question: "What is Cerebrum Biology Academy's NEET track record?",
    answer:
      'Cerebrum Biology Academy was founded in 2014 by Dr. Shekhar C Singh (AIIMS New Delhi alumnus). Across 15+ years, our students have a 98% NEET-UG qualification rate and 680+ medical college selections — including AIIMS, JIPMER, AFMC, and state medical colleges. Our AIIMS-trained, Biology-only faculty is why students consistently score 340+/360 in NEET Biology.',
  },
  {
    question: "Who teaches NEET Biology at Cerebrum and what's the pedagogy?",
    answer:
      'NEET Biology at Cerebrum is led by Dr. Shekhar C Singh (Founder, AIIMS New Delhi alumnus) with an AIIMS-trained Biology faculty team. The pedagogy is concept-first and NCERT-aligned — every lecture maps to NCERT Class 11 and 12 line items, then layers application practice, PYQ drill, and full-syllabus mocks. This is why students consistently clear the 340+/360 Biology threshold.',
  },
  {
    question: 'What are the NEET coaching pricing tiers at Cerebrum?',
    answer:
      'Cerebrum runs three NEET tiers. Pursuit (INR 45,000) covers core coaching with recorded modules and weekly live doubt classes. Ascent (INR 95,000 — most popular) adds full live cohort classes, PYQ drills, mock analytics, and 1:1 mentoring. Pinnacle (INR 1,56,000) adds personalized study plans, unlimited mentor calls, AIIMS-faculty masterclasses, and target-rank support. All tiers cover full NCERT Class 11 + 12 Biology.',
  },
  {
    question: 'Do you offer NEET coaching for Class 9, 10, 11, 12, and droppers?',
    answer:
      'Yes. Class 9 and 10 join our Foundation programme — early Biology base with light NEET exposure. Class 11 and 12 follow the board-plus-NEET track, covering CBSE / NCERT syllabus and NEET pattern simultaneously. Droppers (gap-year repeaters) join our Dropper Batch — full-time, NEET-only intensive. We also run a NEET Crash Course in the final 3-4 months before the exam.',
  },
  {
    question: 'Do you offer NEET coaching in Delhi NCR and other Indian cities?',
    answer:
      'Yes. Cerebrum has four physical centres in Delhi NCR (South Extension flagship, Rohini, Gurugram, Faridabad) and dedicated city-specific pages for Delhi, Gurugram, Noida, Faridabad, Ghaziabad, Greater Noida, Rohini, Dwarka, Mumbai, Bangalore, Hyderabad, Pune, and Chennai. Each page lists local addresses, batch timings, fees in INR, and city-specific testimonials.',
  },
  {
    question: 'Do you support NRI students preparing for NEET from outside India?',
    answer:
      'Yes. Cerebrum runs a dedicated NEET NRI track for Indian-origin students preparing for NEET-UG from outside India. We have country pages for USA, UK, UAE, Saudi Arabia, Singapore, Canada, Australia, and the Gulf. NRI batches run in NRI-friendly timezones, with local currency pricing, plus NEET-UG eligibility and India admissions counselling.',
  },
]

const courseTracks = [
  {
    title: 'NEET Complete (2-Year)',
    href: '/courses/neet-complete',
    description:
      'Full 2-year NEET Biology programme — NCERT Class 11 + 12, PYQs, and mock analytics. Built for Grade 11 starters.',
    icon: GraduationCap,
    accent: 'text-blue-600',
  },
  {
    title: 'NEET Crash Course',
    href: '/courses/neet-crash-course',
    description:
      'Intensive 3-4 month crash before the exam — full NCERT revision, PYQ drills, weekly full-syllabus mocks.',
    icon: Target,
    accent: 'text-green-600',
  },
  {
    title: 'NEET Dropper Batch',
    href: '/courses/neet-dropper',
    description:
      'Full-time, NEET-only programme for repeat aspirants. Daily live classes, PYQs, mocks, AIIMS-trained mentors.',
    icon: Trophy,
    accent: 'text-purple-700',
  },
  {
    title: 'Class 12 — Board + NEET',
    href: '/courses/class-12',
    description:
      'Class 12 Biology covering CBSE board syllabus and NEET pattern simultaneously. No trade-off between board marks and NEET prep.',
    icon: BookOpen,
    accent: 'text-teal-600',
  },
  {
    title: 'Class 11 — Board + NEET Foundation',
    href: '/courses/class-11',
    description:
      'Class 11 NCERT coverage with parallel NEET exposure. Strong Class 11 base is the single biggest NEET predictor.',
    icon: BookOpen,
    accent: 'text-yellow-800',
  },
  {
    title: 'Class 10 Foundation',
    href: '/courses/class-10-foundation',
    description:
      'NEET Foundation for Class 10 — early conceptual base in Biology with light NEET-pattern exposure.',
    icon: BookOpen,
    accent: 'text-blue-600',
  },
  {
    title: 'Class 9 Foundation',
    href: '/courses/class-9-foundation',
    description:
      'NEET Foundation for Class 9 — earliest start for medical aspirants. Conceptual scaffolding for Class 11-12.',
    icon: BookOpen,
    accent: 'text-green-600',
  },
]

const serviceHubs = [
  {
    title: 'Best NEET Biology Tutor',
    href: '/best-neet-biology-tutor',
    description:
      'How to evaluate a NEET Biology tutor — credentials, AIIMS-pedigree, NCERT-alignment, and PYQ track record.',
  },
  {
    title: 'Best NEET Foundation Tutor',
    href: '/best-neet-foundation-tutor',
    description:
      'NEET Foundation tutoring for Class 9 and 10 — why the early Biology base predicts NEET outcomes.',
  },
  {
    title: 'NEET Coaching Institute',
    href: '/neet-coaching-institute',
    description:
      'What a high-quality NEET coaching institute looks like — Biology-first, AIIMS-trained faculty, NCERT-anchored.',
  },
  {
    title: 'Best NEET Coaching',
    href: '/best-neet-coaching',
    description:
      'Comparison hub for "best NEET coaching" claims — what actually matters vs marketing copy.',
  },
  {
    title: 'NEET Biology Tutor — Delhi NCR',
    href: '/neet-biology-tutor-delhi-ncr',
    description:
      'Delhi NCR tutor hub — South Extension, Rohini, Gurugram, Faridabad centres plus online cohorts.',
  },
]

const delhiNcrCities = [
  { label: 'Delhi', href: '/neet-coaching-delhi' },
  { label: 'Gurugram', href: '/neet-coaching-gurugram' },
  { label: 'Noida', href: '/neet-coaching-noida' },
  { label: 'Faridabad', href: '/neet-coaching-faridabad' },
  { label: 'Ghaziabad', href: '/neet-coaching-ghaziabad' },
  { label: 'Greater Noida', href: '/neet-coaching-greater-noida' },
  { label: 'Rohini', href: '/neet-coaching-rohini' },
  { label: 'Dwarka', href: '/neet-coaching-dwarka' },
]

const otherMetros = [
  { label: 'Mumbai', href: '/neet-coaching-mumbai' },
  { label: 'Bangalore', href: '/neet-coaching-bangalore' },
  { label: 'Hyderabad', href: '/neet-coaching-hyderabad' },
  { label: 'Pune', href: '/neet-coaching-pune' },
  { label: 'Chennai', href: '/neet-coaching-chennai' },
]

const nriCountries = [
  { label: 'NEET — USA NRI', href: '/neet-coaching-nri-usa' },
  { label: 'NEET — UK NRI', href: '/neet-coaching-nri-uk' },
  { label: 'NEET — UAE NRI', href: '/neet-coaching-nri-uae' },
  { label: 'NEET — Saudi Arabia NRI', href: '/neet-coaching-nri-saudi-arabia' },
  { label: 'NEET — Singapore NRI', href: '/neet-coaching-nri-singapore' },
]

const pricingTiers = [
  {
    name: 'Pursuit',
    price: 'INR 45,000',
    tagline: 'Entry plan',
    description:
      'Core NEET Biology coaching with recorded modules, structured NCERT walk-throughs, and weekly live doubt classes. Best for self-driven students who want guided structure.',
    features: [
      'Full NCERT Class 11 + 12 Biology coverage',
      'Recorded video modules + lecture notes',
      'Weekly live doubt-clearing session',
      'NEET-pattern question bank access',
    ],
    accent: 'border-gray-200',
    badge: null,
  },
  {
    name: 'Ascent',
    price: 'INR 95,000',
    tagline: 'Most popular',
    description:
      'Full live cohort programme with daily classes, PYQ drills, mock analytics, and 1:1 mentoring. The track our typical 340+/360 NEET Biology scorer follows.',
    features: [
      'Daily live cohort classes (full Class 11 + 12)',
      'Daily PYQ drill — last 15 years',
      'Full-syllabus mock test series + analytics',
      '1:1 mentor calls (monthly)',
      'Personalized weekly performance report',
    ],
    accent: 'border-green-300 ring-2 ring-green-100',
    badge: 'Most Popular',
  },
  {
    name: 'Pinnacle',
    price: 'INR 1,56,000',
    tagline: 'Premium',
    description:
      'Top-rank track with personalized study plans, unlimited mentor calls, AIIMS-faculty masterclasses, and target-rank support. For students aiming at AIIMS / top-100 ranks.',
    features: [
      'Everything in Ascent',
      'Personalized study plan (rebuilt monthly)',
      'Unlimited 1:1 mentor calls',
      'AIIMS-faculty masterclass series',
      'Target-rank support + India admissions counselling',
    ],
    accent: 'border-purple-200',
    badge: 'Top rank',
  },
]

function HubCollectionSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'NEET Biology Coaching Hub — Cerebrum Biology Academy',
    description:
      'Central NEET Biology coaching resource — AIIMS-trained faculty, 98% qualification rate, 680+ medical college selections, course tracks for Class 9-12 and droppers, Delhi NCR and metro city hubs, and NRI tracks.',
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
      name: 'NEET-UG Biology',
      description:
        'National Eligibility cum Entrance Test (Undergraduate) Biology section — 90 questions, 360 marks (50% of paper), covering NCERT Class 11 and Class 12 Biology.',
    },
    hasPart: [
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/courses/neet-complete',
        name: 'NEET Complete (2-Year)',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/courses/neet-dropper',
        name: 'NEET Dropper Batch',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/courses/neet-crash-course',
        name: 'NEET Crash Course',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/best-neet-biology-tutor',
        name: 'Best NEET Biology Tutor',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/neet-biology-tutor-delhi-ncr',
        name: 'NEET Biology Tutor — Delhi NCR',
      },
      {
        '@type': 'WebPage',
        url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-biology-faculty-india',
        name: 'Dr. Shekhar C Singh — Biology Faculty',
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

export default function NEETHubPage() {
  const heroWhatsApp = `https://wa.me/918826444334?text=${encodeURIComponent(
    "Hi! I'm interested in NEET Biology coaching. Please share program details."
  )}`
  const ctaWhatsApp = `https://wa.me/918826444334?text=${encodeURIComponent(
    'Hi! I want to book a free demo for NEET Biology coaching.'
  )}`

  return (
    <>
      <HubCollectionSchema />
      <FAQSchema questions={hubFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema items={[{ label: 'NEET', isCurrentPage: true }]} showSchemaOnly />
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET-UG Biology',
          'NEET 2026 Preparation',
          'Medical College Admissions India',
          'AIIMS Selection',
          'NCERT Biology Class 11',
          'NCERT Biology Class 12',
        ]}
        jobTitle="Founder & Lead NEET Biology Faculty — Cerebrum Biology Academy"
      />

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
                  NEET
                </li>
              </ol>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
              <Award className="h-4 w-4" />
              AIIMS-trained faculty · 98% NEET qualification rate · 680+ medical college selections
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              NEET Biology Coaching Hub
              <span className="mt-2 block text-green-400">Cerebrum Biology Academy</span>
            </h1>

            <p className="mb-8 max-w-3xl text-lg text-gray-300 sm:text-xl">
              Biology is <strong>50% of the NEET-UG paper</strong> — 360 of 720 marks. Cerebrum is a
              Biology-only academy founded by an AIIMS New Delhi alumnus, with a 15+ year track
              record of <strong>98% qualification</strong> and{' '}
              <strong>680+ medical college selections</strong>. This hub indexes our course tracks,
              city centres, NRI batches, and faculty.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/book-free-demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:bg-green-600"
              >
                Book a Free Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={heroWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/60"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp a Counsellor
              </a>
              <a
                href={getPhoneLink('primary')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/60"
              >
                <Phone className="h-5 w-5" />
                {getDisplayPhone('primary')}
              </a>
            </div>
          </div>
        </section>

        {/* What is NEET-UG */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">What is NEET-UG?</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                <strong>NEET-UG (National Eligibility cum Entrance Test, Undergraduate)</strong> is
                the single national entrance exam for admission to MBBS, BDS, BAMS, BHMS, BVSc, and
                allied medical undergraduate courses across India. Conducted by the National Testing
                Agency (NTA), it is now the only gateway into Indian medical college, including
                AIIMS and JIPMER.
              </p>
              <p>
                The paper has 200 questions across <strong>Physics, Chemistry, and Biology</strong>,
                of which 180 are attempted (Section A + Section B with internal choice). Each
                correct answer is <strong>+4 marks</strong>, each wrong answer is{' '}
                <strong>-1 mark</strong>. The total is <strong>720 marks</strong>. Biology
                contributes <strong>90 questions and 360 marks — exactly half the paper</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Why Biology is 50% */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Biology is 50% of NEET
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                NEET Biology is split into <strong>Botany (45 questions, 180 marks)</strong> and{' '}
                <strong>Zoology (45 questions, 180 marks)</strong>. The syllabus is entirely NCERT
                Class 11 + Class 12 — every Biology question can, in principle, be solved by a
                student who has mastered NCERT.
              </p>
              <p>
                Biology rewards systematic NCERT reading, line-by-line recall, and PYQ drill. That
                is why <strong>toppers score 340-360 / 360 in Biology</strong>, which buys
                significant room for error in Physics and Chemistry. Conversely, a 250/360 Biology
                drops a student 10,000-30,000 ranks — often the gap between a government MBBS seat
                and no seat.
              </p>
              <p>
                <strong>That is why Cerebrum is Biology-only.</strong> Our entire faculty,
                curriculum, PYQ archive, and mock analytics target 340+/360 Biology scores — not
                split across Physics and Chemistry.
              </p>
            </div>
          </div>
        </section>

        {/* Track record */}
        <section className="bg-gradient-to-br from-green-50 to-teal-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Cerebrum&apos;s NEET Track Record
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                A 15+ year focused-Biology programme, founded by an AIIMS New Delhi alumnus, with
                the numbers to back the claim.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-green-200 bg-white p-6 text-center shadow-sm sm:p-8">
                <div className="mb-2 text-4xl font-bold text-green-700 sm:text-5xl">98%</div>
                <div className="text-base font-semibold text-gray-900">
                  NEET-UG Qualification Rate
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Across 15+ years of NEET cohorts. Tracked through final NTA result lists.
                </p>
              </div>
              <div className="rounded-2xl border border-green-200 bg-white p-6 text-center shadow-sm sm:p-8">
                <div className="mb-2 text-4xl font-bold text-green-700 sm:text-5xl">680+</div>
                <div className="text-base font-semibold text-gray-900">
                  Medical College Selections
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  AIIMS, JIPMER, AFMC, state government medical colleges, and top private medical
                  colleges.
                </p>
              </div>
              <div className="rounded-2xl border border-green-200 bg-white p-6 text-center shadow-sm sm:p-8">
                <div className="mb-2 text-4xl font-bold text-green-700 sm:text-5xl">AIIMS</div>
                <div className="text-base font-semibold text-gray-900">Trained Faculty</div>
                <p className="mt-2 text-sm text-gray-600">
                  Founder Dr. Shekhar C Singh is an AIIMS New Delhi alumnus. Faculty team carries
                  AIIMS pedigree.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/results"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-base font-semibold text-white hover:bg-green-700"
              >
                See Verified Results
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dr-shekhar-singh-biology-faculty-india"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-green-600 px-6 py-3 text-base font-semibold text-green-700 hover:bg-green-50"
              >
                Meet Dr. Shekhar C Singh
              </Link>
              <Link
                href="/faculty"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 hover:border-gray-400"
              >
                Full Faculty
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing tiers */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Pricing — 3 Tiers
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Three structured tiers covering self-paced study, full live cohort, and top-rank
                premium support. All tiers cover full NCERT Class 11 + 12 Biology.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border-2 bg-white p-6 shadow-sm sm:p-8 ${tier.accent}`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      {tier.badge}
                    </div>
                  )}
                  <div className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
                    {tier.tagline}
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">{tier.name}</h3>
                  <div className="mb-4 text-3xl font-bold text-green-700">{tier.price}</div>
                  <p className="mb-6 text-sm text-gray-600">{tier.description}</p>
                  <ul className="space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/book-free-demo"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                  >
                    Book a Free Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              All tiers include full NCERT Class 11 + 12 Biology coverage, recorded modules, and
              access to our 15-year PYQ archive. Call{' '}
              <a
                href={getPhoneLink('primary')}
                className="font-semibold text-green-700 underline hover:text-green-800"
              >
                {getDisplayPhone('primary')}
              </a>{' '}
              for tier-fit counselling.
            </p>
          </div>
        </section>

        {/* Course tracks */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Course Tracks (Class 9 to Dropper)
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Structured NEET Biology programmes for every stage — early Foundation (Class 9-10),
                board-plus-NEET (Class 11-12), Complete 2-year, Crash, and Dropper.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {courseTracks.map((track) => (
                <Link
                  key={track.href}
                  href={track.href}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md sm:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50">
                    <track.icon className={`h-6 w-6 ${track.accent}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-green-700">
                    {track.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{track.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 transition-all group-hover:gap-2">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Service hubs */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Service Hubs
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Topical hubs for tutor selection, foundation tutoring, institute evaluation, and
                Delhi NCR coverage.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {serviceHubs.map((hub) => (
                <Link
                  key={hub.href}
                  href={hub.href}
                  className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-green-300 hover:shadow-md"
                >
                  <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-green-700">
                    {hub.title}
                  </h3>
                  <p className="text-sm text-gray-600">{hub.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Delhi NCR cities */}
        <section className="bg-gradient-to-br from-orange-50 via-white to-green-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-800">
                <MapPin className="h-4 w-4" />
                Home Market · 4 physical centres in Delhi NCR
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Coaching — Delhi NCR
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Physical centres at South Extension (flagship), Rohini, Gurugram, and Faridabad. The
                city pages below carry local batch timings, fees in INR, and city-specific
                testimonials.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {delhiNcrCities.map((city) => (
                <Link
                  key={city.href}
                  href={city.href}
                  className="rounded-lg border border-orange-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-800 transition-all hover:border-orange-400 hover:bg-orange-50 hover:text-orange-800"
                >
                  {city.label}
                </Link>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              Delhi NCR students also use our{' '}
              <Link
                href="/neet-biology-tutor-delhi-ncr"
                className="font-semibold text-orange-700 underline hover:text-orange-900"
              >
                NEET Biology Tutor — Delhi NCR
              </Link>{' '}
              hub for tutor selection across all NCR catchments.
            </p>
          </div>
        </section>

        {/* Metro cities */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Coaching — Other Metros
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                City-specific NEET Biology coaching with India-wide online cohorts. Local fee
                schedules, batch timings, and city testimonials on each page.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {otherMetros.map((city) => (
                <Link
                  key={city.href}
                  href={city.href}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 transition-all hover:border-green-300 hover:text-green-700"
                >
                  {city.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NRI track */}
        <section className="bg-gradient-to-br from-slate-50 to-green-50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                <Globe className="h-4 w-4" />
                NRI track · Indian-origin students preparing for NEET from outside India
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Coaching for NRI Students
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Dedicated NRI batches in timezone-friendly slots with local-currency pricing.
                Country-specific pages with regional testimonials and admissions support.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {nriCountries.map((country) => (
                <Link
                  key={country.href}
                  href={country.href}
                  className="rounded-lg border border-blue-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 transition-all hover:border-blue-400 hover:text-blue-700"
                >
                  {country.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty / About callout */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-green-50 p-8 shadow-sm sm:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <Users className="h-6 w-6 text-green-700" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Who teaches NEET Biology at Cerebrum
                </h2>
              </div>
              <p className="mb-6 text-lg text-gray-700">
                NEET Biology at Cerebrum is led by <strong>Dr. Shekhar C Singh</strong> — Founder,
                AIIMS New Delhi alumnus, 15+ years of NEET Biology teaching, and the named lead
                Biology faculty across our NEET, IB, AP, and Olympiad verticals. He is supported by
                an AIIMS-trained Biology faculty team running the day-to-day cohort delivery.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dr-shekhar-singh-biology-faculty-india"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  About Dr. Shekhar C Singh
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/faculty"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-gray-400"
                >
                  Full Faculty Team
                </Link>
                <Link
                  href="/results"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-gray-400"
                >
                  Verified Results
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs — must match hubFAQs schema exactly */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                NEET Biology — Frequently Asked Questions
              </h2>
              <p className="text-base text-gray-600">
                The same eight questions as our FAQ schema — kept in sync for AI / voice answers.
              </p>
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
                      <span className="text-green-600 transition-transform group-open:rotate-180">
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
        <section className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ready to start NEET 2026 prep?</h2>
            <p className="mb-8 text-lg text-green-100">
              Talk to a Cerebrum counsellor about your NEET goals — Pursuit, Ascent, or Pinnacle.
              We&apos;ll match you to the right tier, batch, and faculty mentor.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/book-free-demo"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg hover:bg-green-50"
              >
                Book a Free Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={ctaWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10"
              >
                <MessageCircle className="h-6 w-6" />
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10"
              >
                Contact Page
              </Link>
            </div>
            <p className="mt-8 text-sm text-green-100">
              Or call directly:{' '}
              <a
                href={getPhoneLink('primary')}
                className="font-semibold text-white underline hover:text-green-50"
              >
                {getDisplayPhone('primary')}
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
