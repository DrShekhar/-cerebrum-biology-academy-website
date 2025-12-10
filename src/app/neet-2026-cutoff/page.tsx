import { Metadata } from 'next'
import Link from 'next/link'
import {
  TrendingUp,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Target,
  BarChart3,
  GraduationCap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET 2026 Cutoff - Expected Category Wise Cutoff Marks & Qualifying Percentile',
  description:
    'NEET 2026 cutoff marks for General, OBC, SC, ST categories. Expected qualifying percentile, AIQ cutoff, state quota cutoff for MBBS, BDS admission. Previous year cutoff trends analysis.',
  keywords: [
    'NEET 2026 cutoff',
    'NEET cutoff marks 2026',
    'NEET 2026 expected cutoff',
    'NEET cutoff for MBBS',
    'NEET cutoff category wise',
    'NEET general category cutoff',
    'NEET OBC cutoff 2026',
    'NEET SC ST cutoff',
    'NEET qualifying marks 2026',
    'AIIMS cutoff 2026',
  ],
  openGraph: {
    title: 'NEET 2026 Cutoff - Category Wise Expected Cutoff Marks',
    description:
      'Expected NEET 2026 cutoff marks for all categories. Qualifying percentile and marks for MBBS/BDS admission.',
    url: 'https://www.cerebrumbiologyacademy.com/neet-2026-cutoff',
    type: 'article',
    images: [
      {
        url: '/images/neet-2026-cutoff.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET 2026 Cutoff Marks',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-2026-cutoff',
  },
}

const qualifyingCutoff = [
  { category: 'General (UR)', percentile: '50th', expectedMarks: '720-137', color: 'blue' },
  { category: 'General-PwD', percentile: '45th', expectedMarks: '136-121', color: 'indigo' },
  { category: 'SC/ST/OBC', percentile: '40th', expectedMarks: '136-107', color: 'green' },
  { category: 'SC/ST/OBC-PwD', percentile: '40th', expectedMarks: '106-107', color: 'teal' },
]

const previousYearCutoffs = [
  {
    year: 2024,
    general: { percentile: '50th', marks: '720-164' },
    ews: { percentile: '50th', marks: '720-164' },
    obc: { percentile: '40th', marks: '163-129' },
    sc: { percentile: '40th', marks: '163-129' },
    st: { percentile: '40th', marks: '163-129' },
    generalPwd: { percentile: '45th', marks: '163-146' },
  },
  {
    year: 2023,
    general: { percentile: '50th', marks: '720-137' },
    ews: { percentile: '50th', marks: '720-137' },
    obc: { percentile: '40th', marks: '136-107' },
    sc: { percentile: '40th', marks: '136-107' },
    st: { percentile: '40th', marks: '136-107' },
    generalPwd: { percentile: '45th', marks: '136-121' },
  },
  {
    year: 2022,
    general: { percentile: '50th', marks: '720-117' },
    ews: { percentile: '50th', marks: '720-117' },
    obc: { percentile: '40th', marks: '116-93' },
    sc: { percentile: '40th', marks: '116-93' },
    st: { percentile: '40th', marks: '116-93' },
    generalPwd: { percentile: '45th', marks: '116-105' },
  },
]

const topCollegesCutoff = [
  { college: 'AIIMS Delhi', course: 'MBBS', expectedRank: '1-50', expectedMarks: '720-710' },
  {
    college: 'JIPMER Puducherry',
    course: 'MBBS',
    expectedRank: '51-200',
    expectedMarks: '709-700',
  },
  { college: 'CMC Vellore', course: 'MBBS', expectedRank: '100-500', expectedMarks: '705-690' },
  { college: 'MAMC Delhi', course: 'MBBS', expectedRank: '50-300', expectedMarks: '710-695' },
  { college: 'KMC Manipal', course: 'MBBS', expectedRank: '500-5000', expectedMarks: '690-650' },
  { college: 'BHU Varanasi', course: 'MBBS', expectedRank: '200-800', expectedMarks: '700-680' },
  { college: 'KGMU Lucknow', course: 'MBBS', expectedRank: '300-1000', expectedMarks: '698-675' },
  {
    college: 'Grant Medical College',
    course: 'MBBS',
    expectedRank: '500-2000',
    expectedMarks: '690-660',
  },
]

const stateCutoffs = [
  { state: 'Delhi', generalCutoff: '600-620', obcCutoff: '580-600', scCutoff: '520-550' },
  { state: 'Maharashtra', generalCutoff: '580-610', obcCutoff: '560-580', scCutoff: '500-530' },
  { state: 'Karnataka', generalCutoff: '570-600', obcCutoff: '550-570', scCutoff: '490-520' },
  { state: 'Tamil Nadu', generalCutoff: '560-590', obcCutoff: '540-560', scCutoff: '480-510' },
  { state: 'Gujarat', generalCutoff: '550-580', obcCutoff: '530-550', scCutoff: '470-500' },
  { state: 'Rajasthan', generalCutoff: '540-570', obcCutoff: '520-540', scCutoff: '460-490' },
  { state: 'Uttar Pradesh', generalCutoff: '550-580', obcCutoff: '530-550', scCutoff: '470-500' },
  { state: 'West Bengal', generalCutoff: '540-570', obcCutoff: '520-540', scCutoff: '460-490' },
]

const faqData = [
  {
    question: 'What is the expected NEET 2026 cutoff for General category?',
    answer:
      'The expected NEET 2026 cutoff for General category is around 50th percentile, which translates to approximately 137-150 marks out of 720. However, for admission to top government medical colleges, you need to score 600+ marks.',
  },
  {
    question: 'What is NEET 2026 qualifying cutoff for OBC/SC/ST?',
    answer:
      'For OBC, SC, and ST categories, the qualifying cutoff is expected to be at 40th percentile, approximately 107-120 marks. However, for actual admission, much higher scores are needed depending on the college and state.',
  },
  {
    question: 'How many marks are required in NEET 2026 for MBBS?',
    answer:
      'For admission to government medical colleges through NEET 2026, General category students typically need 550-650 marks for state quota and 600-680 marks for AIQ quota. Top colleges like AIIMS require 700+ marks.',
  },
  {
    question: 'Is 500 marks enough for MBBS in NEET 2026?',
    answer:
      '500 marks in NEET 2026 may be sufficient for private medical college admission in some states, but not for government medical colleges. For government MBBS seats, you typically need 550+ marks in General category.',
  },
  {
    question: 'What rank is required for AIIMS Delhi in NEET 2026?',
    answer:
      'For AIIMS Delhi MBBS admission through NEET 2026, you typically need an All India Rank within top 50-100. This requires scoring above 710 marks out of 720.',
  },
  {
    question: 'Does NEET cutoff change every year?',
    answer:
      'Yes, NEET cutoff varies every year based on factors like exam difficulty level, number of candidates, total seats available, and overall performance of students. The cutoff has shown an increasing trend in recent years.',
  },
  {
    question: 'What is the difference between NEET qualifying cutoff and admission cutoff?',
    answer:
      'NEET qualifying cutoff is the minimum marks needed to pass the exam and be eligible for counselling. Admission cutoff is the actual marks/rank at which admissions close in specific colleges, which is much higher than qualifying cutoff.',
  },
  {
    question: 'Will NEET 2026 cutoff be higher than 2025?',
    answer:
      'Based on trends, NEET cutoff has been gradually increasing due to more competition and improved student preparation. NEET 2026 cutoff may be similar or slightly higher than 2025, depending on exam difficulty.',
  },
]

function FAQSchema() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}

function BreadcrumbSchema() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET 2026 Cutoff',
        item: 'https://www.cerebrumbiologyacademy.com/neet-2026-cutoff',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

export default function NEET2026CutoffPage() {
  return (
    <>
      <FAQSchema />
      <BreadcrumbSchema />

      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-teal-700 py-16 text-white md:py-24">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="container relative mx-auto px-4">
            <nav className="mb-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>NEET 2026 Cutoff</span>
            </nav>

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">NEET 2026 Cutoff Marks</h1>
            <p className="mb-6 max-w-2xl text-lg text-green-100 md:text-xl">
              Expected category-wise cutoff marks, qualifying percentile, and college-wise cutoff
              analysis for NEET UG 2026 MBBS/BDS admission.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Target className="h-5 w-5" />
                <span className="font-semibold">General: 50th Percentile</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Users className="h-5 w-5" />
                <span className="font-semibold">OBC/SC/ST: 40th Percentile</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <BarChart3 className="h-5 w-5" />
                <span className="font-semibold">Total: 720 Marks</span>
              </div>
            </div>
          </div>
        </section>

        {/* Qualifying Cutoff Cards */}
        <section className="-mt-8 px-4">
          <div className="container mx-auto">
            <div className="grid gap-4 md:grid-cols-4">
              {qualifyingCutoff.map((cutoff) => (
                <div key={cutoff.category} className="rounded-xl bg-white p-6 shadow-lg">
                  <h3 className="mb-2 text-sm font-semibold text-gray-600">{cutoff.category}</h3>
                  <p className="text-2xl font-bold text-green-600">{cutoff.percentile}</p>
                  <p className="text-sm text-gray-600">Marks: {cutoff.expectedMarks}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is NEET Cutoff */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">What is NEET 2026 Cutoff?</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p>
                  NEET 2026 cutoff is the minimum marks or percentile required to qualify the
                  National Eligibility cum Entrance Test and be eligible for MBBS, BDS, AYUSH, and
                  other medical course admissions in India. There are two types of cutoffs:
                </p>

                <div className="my-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-blue-50 p-6">
                    <h3 className="mb-2 text-lg font-semibold text-blue-900">Qualifying Cutoff</h3>
                    <p className="text-sm text-blue-800">
                      Minimum marks needed to pass NEET and be eligible for counselling. Set by NTA
                      based on percentile (50th for General, 40th for reserved categories).
                    </p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-6">
                    <h3 className="mb-2 text-lg font-semibold text-green-900">Admission Cutoff</h3>
                    <p className="text-sm text-green-800">
                      The actual marks/rank at which admissions close in specific colleges. This is
                      much higher than qualifying cutoff and varies by college.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Previous Year Cutoffs Table */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              NEET Cutoff Trends (Previous Years)
            </h2>

            <div className="mx-auto max-w-5xl overflow-hidden rounded-xl bg-white shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-green-600 text-white">
                    <tr>
                      <th className="px-4 py-4 text-left">Year</th>
                      <th className="px-4 py-4 text-center">General/EWS</th>
                      <th className="px-4 py-4 text-center">OBC</th>
                      <th className="px-4 py-4 text-center">SC</th>
                      <th className="px-4 py-4 text-center">ST</th>
                      <th className="px-4 py-4 text-center">Gen-PwD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {previousYearCutoffs.map((year) => (
                      <tr key={year.year} className="hover:bg-gray-50">
                        <td className="px-4 py-4 font-bold text-gray-900">{year.year}</td>
                        <td className="px-4 py-4 text-center">
                          <span className="block text-sm text-gray-500">
                            {year.general.percentile}
                          </span>
                          <span className="font-semibold text-green-600">{year.general.marks}</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="block text-sm text-gray-500">{year.obc.percentile}</span>
                          <span className="font-semibold text-green-600">{year.obc.marks}</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="block text-sm text-gray-500">{year.sc.percentile}</span>
                          <span className="font-semibold text-green-600">{year.sc.marks}</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="block text-sm text-gray-500">{year.st.percentile}</span>
                          <span className="font-semibold text-green-600">{year.st.marks}</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="block text-sm text-gray-500">
                            {year.generalPwd.percentile}
                          </span>
                          <span className="font-semibold text-green-600">
                            {year.generalPwd.marks}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-yellow-50">
                      <td className="px-4 py-4 font-bold text-gray-900">2026 (Expected)</td>
                      <td className="px-4 py-4 text-center">
                        <span className="block text-sm text-gray-500">50th</span>
                        <span className="font-semibold text-yellow-600">720-140*</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="block text-sm text-gray-500">40th</span>
                        <span className="font-semibold text-yellow-600">139-110*</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="block text-sm text-gray-500">40th</span>
                        <span className="font-semibold text-yellow-600">139-110*</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="block text-sm text-gray-500">40th</span>
                        <span className="font-semibold text-yellow-600">139-110*</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="block text-sm text-gray-500">45th</span>
                        <span className="font-semibold text-yellow-600">139-125*</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-sm text-gray-600">
                *Expected cutoff based on previous year trends. Actual cutoff will be announced
                after NEET 2026 results.
              </div>
            </div>
          </div>
        </section>

        {/* Top Colleges Cutoff */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Expected Cutoff for Top Medical Colleges
            </h2>

            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
              {topCollegesCutoff.map((college) => (
                <div
                  key={college.college}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{college.college}</h3>
                    <p className="text-sm text-gray-600">{college.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Rank: {college.expectedRank}</p>
                    <p className="font-bold text-green-600">{college.expectedMarks} marks</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/neet-college-predictor"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
              >
                Use College Predictor Tool
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* State-wise Cutoff */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              State-wise Expected Cutoff Marks
            </h2>

            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-lg">
              <table className="w-full">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">State</th>
                    <th className="px-6 py-4 text-center">General</th>
                    <th className="px-6 py-4 text-center">OBC</th>
                    <th className="px-6 py-4 text-center">SC/ST</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stateCutoffs.map((state) => (
                    <tr key={state.state} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{state.state}</td>
                      <td className="px-6 py-4 text-center font-semibold text-green-600">
                        {state.generalCutoff}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-700">{state.obcCutoff}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{state.scCutoff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-gray-50 px-4 py-3 text-sm text-gray-600">
                Note: These are expected marks for government medical college admission in state
                quota. Actual cutoff depends on seat availability and competition.
              </div>
            </div>
          </div>
        </section>

        {/* Preparation CTA */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-teal-700">
              <div className="grid items-center md:grid-cols-2">
                <div className="p-8 text-white md:p-12">
                  <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    Score Above Cutoff with Expert Guidance
                  </h2>
                  <p className="mb-6 text-green-100">
                    Join Cerebrum Biology Academy to boost your NEET Biology score. Our
                    comprehensive course helps you score 350+ in Biology section alone.
                  </p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span>NCERT-based comprehensive Biology course</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span>Previous year NEET questions analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span>Topic-wise weightage and strategy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span>Mock tests with cutoff analysis</span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/demo"
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-green-600 transition-colors hover:bg-green-50"
                    >
                      Book Free Demo Class
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link
                      href="/neet-rank-predictor"
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      Check Rank Predictor
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="relative h-full min-h-[400px] bg-gradient-to-br from-green-500/30 to-transparent">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="h-48 w-48 text-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Tips to Score Above NEET Cutoff
            </h2>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Master NCERT</h3>
                <p className="text-gray-600">
                  Focus on NCERT textbooks for Biology. 90% of NEET Biology questions are directly
                  from NCERT. Read line by line and understand concepts thoroughly.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Practice Previous Years
                </h3>
                <p className="text-gray-600">
                  Solve last 10-15 years NEET papers. Understand the pattern, frequently asked
                  topics, and time management required for the exam.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Focus on High-Weightage
                </h3>
                <p className="text-gray-600">
                  Topics like Human Physiology, Plant Physiology, Genetics, and Ecology carry high
                  weightage. Prioritize these for maximum score improvement.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Regular Mock Tests</h3>
                <p className="text-gray-600">
                  Take full-length mock tests weekly. Analyze mistakes, work on weak areas, and
                  improve your speed and accuracy consistently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Frequently Asked Questions - NEET 2026 Cutoff
            </h2>

            <div className="mx-auto max-w-3xl space-y-4">
              {faqData.map((faq, index) => (
                <details key={index} className="group rounded-lg border border-gray-200 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-900">
                    {faq.question}
                    <span className="ml-2 transition-transform group-open:rotate-180">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="border-t border-gray-200 p-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Related Resources</h2>

            <div className="grid gap-6 md:grid-cols-4">
              <Link
                href="/neet-2026-exam-date"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-green-600">
                  NEET 2026 Exam Date
                </h3>
                <p className="text-sm text-gray-600">Complete schedule and important dates</p>
              </Link>

              <Link
                href="/neet-biology-syllabus-2026"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-green-600">
                  Biology Syllabus
                </h3>
                <p className="text-sm text-gray-600">Complete NEET Biology syllabus 2026</p>
              </Link>

              <Link
                href="/neet-rank-predictor"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-green-600">
                  Rank Predictor
                </h3>
                <p className="text-sm text-gray-600">Predict your NEET rank from marks</p>
              </Link>

              <Link
                href="/neet-college-predictor"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-green-600">
                  College Predictor
                </h3>
                <p className="text-sm text-gray-600">Find colleges based on your rank</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
