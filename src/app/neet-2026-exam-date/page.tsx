import { Metadata } from 'next'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  Download,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET 2026 Exam Date - Complete Schedule, Important Dates & Timeline | NTA',
  description:
    'NEET 2026 exam date is expected in May 2026. Get complete NEET UG 2026 schedule, registration dates, admit card release, result dates & preparation timeline. Updated NTA official information.',
  keywords: [
    'NEET 2026 exam date',
    'NEET UG 2026 date',
    'NEET 2026 schedule',
    'NTA NEET 2026',
    'NEET exam date 2026',
    'NEET 2026 registration date',
    'NEET 2026 admit card date',
    'NEET 2026 result date',
    'NEET 2026 important dates',
    'NEET 2026 timeline',
  ],
  openGraph: {
    title: 'NEET 2026 Exam Date - Complete Schedule & Important Dates',
    description:
      'Get complete NEET 2026 exam schedule, registration dates, admit card release, and result dates. Official NTA information.',
    url: 'https://www.cerebrumbiologyacademy.com/neet-2026-exam-date',
    type: 'article',
    images: [
      {
        url: '/images/neet-2026-exam-date.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET 2026 Exam Date and Schedule',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET 2026 Exam Date - Complete Schedule',
    description:
      'NEET 2026 exam expected in May 2026. Get complete schedule, registration dates, and preparation timeline.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-2026-exam-date',
  },
}

const importantDates = [
  {
    event: 'NEET 2026 Notification Release',
    expectedDate: 'February 2026',
    status: 'upcoming',
    icon: FileText,
  },
  {
    event: 'Online Registration Begins',
    expectedDate: 'February 2026',
    status: 'upcoming',
    icon: Users,
  },
  {
    event: 'Application Form Last Date',
    expectedDate: 'March 2026',
    status: 'upcoming',
    icon: Calendar,
  },
  {
    event: 'Correction Window Opens',
    expectedDate: 'March 2026',
    status: 'upcoming',
    icon: FileText,
  },
  {
    event: 'Admit Card Release',
    expectedDate: 'April 2026',
    status: 'upcoming',
    icon: Download,
  },
  {
    event: 'NEET 2026 Exam Date',
    expectedDate: 'May 2026 (First Sunday)',
    status: 'upcoming',
    icon: Calendar,
  },
  {
    event: 'Answer Key Release',
    expectedDate: 'May 2026',
    status: 'upcoming',
    icon: CheckCircle,
  },
  {
    event: 'Result Declaration',
    expectedDate: 'June 2026',
    status: 'upcoming',
    icon: Award,
  },
  {
    event: 'Counselling Begins',
    expectedDate: 'July 2026',
    status: 'upcoming',
    icon: Users,
  },
]

const examPattern = [
  { subject: 'Physics', questions: 50, marks: 200 },
  { subject: 'Chemistry', questions: 50, marks: 200 },
  { subject: 'Biology (Botany + Zoology)', questions: 100, marks: 400 },
]

const faqData = [
  {
    question: 'When is NEET 2026 exam date?',
    answer:
      'NEET 2026 exam is expected to be conducted in the first week of May 2026, typically on the first Sunday of May. The exact date will be announced by NTA in February 2026.',
  },
  {
    question: 'When will NEET 2026 registration start?',
    answer:
      'NEET 2026 registration is expected to begin in February 2026. Students should keep checking the official NTA NEET website for the exact dates.',
  },
  {
    question: 'What is the NEET 2026 exam timing?',
    answer:
      'NEET 2026 exam will be conducted from 2:00 PM to 5:20 PM (3 hours 20 minutes). Candidates must report to the exam center by 1:00 PM.',
  },
  {
    question: 'What is the NEET 2026 syllabus?',
    answer:
      'NEET 2026 syllabus includes Physics, Chemistry, and Biology (Botany + Zoology) from Class 11 and Class 12 NCERT. NTA may release updated syllabus with the official notification.',
  },
  {
    question: 'How many times is NEET conducted in a year?',
    answer:
      'NEET is conducted once a year by NTA. There are no multiple attempts in a single year, so students should prepare thoroughly for the one exam opportunity.',
  },
  {
    question: 'What is the NEET 2026 exam mode?',
    answer:
      'NEET 2026 will be conducted in pen and paper (offline) mode. Students will mark answers on an OMR sheet.',
  },
  {
    question: 'What is NEET 2026 marking scheme?',
    answer:
      'NEET 2026 marking scheme: +4 marks for correct answer, -1 mark for wrong answer, 0 marks for unattempted questions. Total marks: 720.',
  },
  {
    question: 'When will NEET 2026 admit card be released?',
    answer:
      'NEET 2026 admit card is expected to be released in April 2026, approximately 15-20 days before the exam date.',
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

function EventSchema() {
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'NEET UG 2026 Examination',
    description:
      'National Eligibility cum Entrance Test (NEET) 2026 for admission to MBBS, BDS, AYUSH, and other medical courses in India.',
    startDate: '2026-05-03',
    endDate: '2026-05-03',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Various Exam Centers across India',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'National Testing Agency (NTA)',
      url: 'https://nta.ac.in',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://neet.nta.nic.in',
      price: '1700',
      priceCurrency: 'INR',
      availability: 'https://schema.org/PreOrder',
      validFrom: '2026-02-01',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
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
        name: 'NEET 2026 Exam Date',
        item: 'https://www.cerebrumbiologyacademy.com/neet-2026-exam-date',
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

export default function NEET2026ExamDatePage() {
  return (
    <>
      <FAQSchema />
      <EventSchema />
      <BreadcrumbSchema />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-blue-600 pt-16 pb-24 text-white md:pt-24 md:pb-32">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>NEET 2026 Exam Date</span>
            </nav>

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">NEET 2026 Exam Date</h1>
            <p className="mb-6 max-w-2xl text-lg text-blue-100 md:text-xl">
              Complete schedule, important dates, and preparation timeline for NEET UG 2026.
              Official NTA updates and everything you need to know.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Expected: May 2026</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">Duration: 3 hrs 20 min</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <FileText className="h-5 w-5" />
                <span className="font-semibold">Mode: Pen & Paper</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Info Cards */}
        <section className="-mt-16 md:-mt-20 relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Exam Date</h3>
                <p className="text-2xl font-bold text-blue-600">May 2026</p>
                <p className="text-sm text-gray-600">First Sunday of May (Expected)</p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Registration</h3>
                <p className="text-2xl font-bold text-green-600">Feb 2026</p>
                <p className="text-sm text-gray-600">Online at neet.nta.nic.in</p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Results</h3>
                <p className="text-2xl font-bold text-purple-600">June 2026</p>
                <p className="text-sm text-gray-600">Within 45 days of exam</p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Dates Timeline */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              NEET 2026 Important Dates & Timeline
            </h2>

            <div className="mx-auto max-w-3xl">
              <div className="relative">
                <div className="absolute left-8 top-0 h-full w-0.5 bg-blue-200 md:left-1/2" />

                {importantDates.map((date, index) => {
                  const IconComponent = date.icon
                  return (
                    <div
                      key={date.event}
                      className={`relative mb-8 flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      <div className="w-full pl-16 md:w-1/2 md:px-8">
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                          <div className="mb-2 flex items-center gap-2">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                            <span className="font-semibold text-gray-900">{date.event}</span>
                          </div>
                          <p className="text-lg font-bold text-blue-600">{date.expectedDate}</p>
                          <span className="inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                            Expected
                          </span>
                        </div>
                      </div>

                      <div className="absolute left-6 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white md:left-1/2 md:-translate-x-1/2">
                        <span className="text-xs">{index + 1}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-yellow-50 p-4 text-center">
              <AlertCircle className="mx-auto mb-2 h-6 w-6 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> These dates are expected based on previous year patterns.
                Official dates will be announced by NTA in February 2026.
              </p>
            </div>
          </div>
        </section>

        {/* Exam Pattern */}
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              NEET 2026 Exam Pattern
            </h2>

            <div className="mx-auto max-w-3xl">
              <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                <table className="w-full">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Subject</th>
                      <th className="px-6 py-4 text-center">Questions</th>
                      <th className="px-6 py-4 text-center">Marks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {examPattern.map((row) => (
                      <tr key={row.subject} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{row.subject}</td>
                        <td className="px-6 py-4 text-center text-gray-600">{row.questions}</td>
                        <td className="px-6 py-4 text-center font-semibold text-blue-600">
                          {row.marks}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-blue-50">
                      <td className="px-6 py-4 font-bold text-gray-900">Total</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-900">200</td>
                      <td className="px-6 py-4 text-center font-bold text-blue-600">720</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-white p-4 text-center shadow">
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-xl font-bold text-gray-900">3 hrs 20 min</p>
                </div>
                <div className="rounded-lg bg-white p-4 text-center shadow">
                  <p className="text-sm text-gray-600">Correct Answer</p>
                  <p className="text-xl font-bold text-green-600">+4 marks</p>
                </div>
                <div className="rounded-lg bg-white p-4 text-center shadow">
                  <p className="text-sm text-gray-600">Wrong Answer</p>
                  <p className="text-xl font-bold text-red-600">-1 mark</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preparation Tips CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-2xl bg-blue-600">
              <div className="grid items-center md:grid-cols-2">
                <div className="p-8 text-white md:p-12">
                  <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    Start Your NEET 2026 Preparation Today
                  </h2>
                  <p className="mb-6 text-blue-100">
                    Join Cerebrum Biology Academy for expert-guided NEET preparation. Our
                    comprehensive Biology course covers the entire NCERT syllabus with video
                    lectures, MCQs, and personalized mentorship.
                  </p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Complete NCERT-based Biology Course</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>1000+ Practice MCQs with Explanations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Live Doubt Solving Sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Expert Faculty from Top Medical Colleges</span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/demo"
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                    >
                      Book Free Demo Class
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      Explore Courses
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="relative h-full min-h-[400px] bg-gradient-to-br from-blue-500/30 to-transparent">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-48 w-48 text-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Frequently Asked Questions - NEET 2026
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
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Related Resources</h2>

            <div className="grid gap-6 md:grid-cols-4">
              <Link
                href="/neet-2026-cutoff"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
                  NEET 2026 Cutoff
                </h3>
                <p className="text-sm text-gray-600">Expected cutoff marks for medical colleges</p>
              </Link>

              <Link
                href="/neet-biology-syllabus-2026"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
                  Biology Syllabus
                </h3>
                <p className="text-sm text-gray-600">Complete NEET Biology syllabus 2026</p>
              </Link>

              <Link
                href="/neet-rank-predictor"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
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
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
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
