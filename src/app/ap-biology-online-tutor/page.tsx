'use client'

import Link from 'next/link'
import {
  GraduationCap,
  FlaskConical,
  Users,
  TrendingUp,
  CheckCircle,
  BookOpen,
  Clock,
  MessageCircle,
  Award,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const apBiologyUnits = [
  {
    number: 1,
    title: 'Chemistry of Life',
    weight: '8-11%',
    topics: ['Water properties', 'Macromolecules', 'Elements of life'],
    campbellChapters: '2-5',
  },
  {
    number: 2,
    title: 'Cell Structure & Function',
    weight: '10-13%',
    topics: ['Cell components', 'Membrane transport', 'Compartmentalization'],
    campbellChapters: '6-7',
  },
  {
    number: 3,
    title: 'Cellular Energetics',
    weight: '12-16%',
    topics: ['Enzymes', 'Photosynthesis', 'Cellular respiration'],
    campbellChapters: '8-10',
  },
  {
    number: 4,
    title: 'Cell Communication & Cell Cycle',
    weight: '10-15%',
    topics: ['Signal transduction', 'Cell cycle', 'Feedback mechanisms'],
    campbellChapters: '11-12',
  },
  {
    number: 5,
    title: 'Heredity',
    weight: '8-11%',
    topics: ['Meiosis', 'Mendelian genetics', 'Non-Mendelian genetics'],
    campbellChapters: '13-15',
  },
  {
    number: 6,
    title: 'Gene Expression & Regulation',
    weight: '12-16%',
    topics: ['DNA replication', 'Transcription', 'Translation', 'Gene regulation'],
    campbellChapters: '16-18',
  },
  {
    number: 7,
    title: 'Natural Selection',
    weight: '13-20%',
    topics: ['Evolution evidence', 'Natural selection', 'Population genetics'],
    campbellChapters: '22-25',
  },
  {
    number: 8,
    title: 'Ecology',
    weight: '10-15%',
    topics: ['Energy flow', 'Community ecology', 'Biodiversity'],
    campbellChapters: '52-56',
  },
]

const features = [
  {
    icon: GraduationCap,
    title: 'College Board Aligned',
    description: 'Curriculum matches AP Biology Course and Exam Description perfectly',
  },
  {
    icon: FlaskConical,
    title: 'Lab Skills Training',
    description: 'Prepare for all 13 AP Biology lab investigations with guided practice',
  },
  {
    icon: BookOpen,
    title: 'Campbell Biology Based',
    description: 'Lessons aligned with Campbell Biology textbook chapters',
  },
  {
    icon: TrendingUp,
    title: 'Score Improvement',
    description: 'Average improvement of 2+ points on AP exam scores',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Online sessions that fit your school schedule and timezone',
  },
  {
    icon: Award,
    title: 'Expert Instructors',
    description: 'Tutors with 5+ years of AP Biology teaching experience',
  },
]

const seniorFacultyPricing = [
  {
    name: 'Starter',
    hours: 12,
    price: 1800,
    perHour: 150,
    features: [
      '12 hours 1-on-1 tutoring',
      'Unit-focused learning',
      'Practice MCQs',
      'WhatsApp support',
    ],
  },
  {
    name: 'Foundation',
    hours: 24,
    price: 3360,
    perHour: 140,
    popular: true,
    features: [
      '24 hours 1-on-1 tutoring',
      'Full AP curriculum coverage',
      'FRQ practice',
      'Lab skills training',
      'Priority support',
    ],
  },
  {
    name: 'Comprehensive',
    hours: 36,
    price: 4680,
    perHour: 130,
    features: [
      '36 hours 1-on-1 tutoring',
      'Complete exam preparation',
      'All practice exams',
      'Lab investigations',
      '24/7 support',
    ],
  },
  {
    name: 'Elite',
    hours: 48,
    price: 5760,
    perHour: 120,
    features: [
      '48 hours 1-on-1 tutoring',
      'Score 5 guarantee program',
      'Full mock exams',
      'College application support',
      'Premium support',
    ],
  },
]

const juniorFacultyPricing = [
  {
    name: 'Starter',
    hours: 12,
    price: 900,
    perHour: 75,
    features: [
      '12 hours 1-on-1 tutoring',
      'Unit-focused learning',
      'Practice MCQs',
      'Email support',
    ],
  },
  {
    name: 'Foundation',
    hours: 24,
    price: 1680,
    perHour: 70,
    popular: true,
    features: [
      '24 hours 1-on-1 tutoring',
      'Full curriculum coverage',
      'FRQ practice',
      'Lab guidance',
      'WhatsApp support',
    ],
  },
  {
    name: 'Comprehensive',
    hours: 36,
    price: 2340,
    perHour: 65,
    features: [
      '36 hours 1-on-1 tutoring',
      'Complete preparation',
      'Practice exams',
      'Lab investigations',
      'Priority support',
    ],
  },
  {
    name: 'Elite',
    hours: 48,
    price: 2880,
    perHour: 60,
    features: [
      '48 hours 1-on-1 tutoring',
      'Comprehensive program',
      'Full mock exams',
      'Extended support',
      'Recorded sessions',
    ],
  },
]

const batchPricing = [
  {
    name: 'Unit Review',
    hours: 16,
    price: 640,
    perHour: 40,
    features: [
      '16 hours group sessions',
      '4-6 students per batch',
      'Unit-by-unit review',
      'Group discussions',
    ],
  },
  {
    name: 'Semester Prep',
    hours: 24,
    price: 960,
    perHour: 40,
    popular: true,
    features: [
      '24 hours group sessions',
      '4-6 students per batch',
      'Half curriculum',
      'FRQ workshops',
      'Study groups',
    ],
  },
  {
    name: 'Full Year',
    hours: 40,
    price: 1600,
    perHour: 40,
    features: [
      '40 hours group sessions',
      '4-6 students per batch',
      'Complete curriculum',
      'Lab prep sessions',
      'Peer learning',
    ],
  },
  {
    name: 'Exam Intensive',
    hours: 32,
    price: 1280,
    perHour: 40,
    features: [
      '32 hours group sessions',
      '4-6 students per batch',
      'Exam-focused review',
      'Timed practice tests',
      'Score strategies',
    ],
  },
]

const faqs = [
  {
    question: 'What is AP Biology and who should take it?',
    answer:
      'AP Biology is a college-level biology course offered by the College Board. It is ideal for high school students (typically 11th or 12th grade) who want to earn college credit, demonstrate academic rigor for college applications, or prepare for science-related majors.',
  },
  {
    question: 'How is the AP Biology exam structured?',
    answer:
      'The AP Biology exam is 3 hours long and consists of two sections: Section 1 has 60 multiple-choice questions (90 minutes, 50% of score) and Section 2 has 6 free-response questions (90 minutes, 50% of score). The FRQ section includes 2 long-form and 4 short-answer questions.',
  },
  {
    question: 'What score do I need for college credit?',
    answer:
      'Most colleges require a score of 4 or 5 to grant credit or advanced placement. Some colleges accept a 3. Check with your target schools for their specific AP credit policies.',
  },
  {
    question: 'How does your tutoring align with Campbell Biology?',
    answer:
      'Our curriculum is directly mapped to Campbell Biology textbook chapters. Each AP unit corresponds to specific Campbell chapters, making it easy to follow along with your school coursework while preparing for the AP exam.',
  },
  {
    question: 'Do you help with AP Biology lab investigations?',
    answer:
      'Yes! We cover all 13 AP Biology lab investigations required by College Board. Our tutors guide you through lab concepts, data analysis, and how to answer lab-based FRQs on the exam.',
  },
  {
    question: 'When should I start AP Biology preparation?',
    answer:
      'Ideally, start at the beginning of your AP Biology course for ongoing support. For exam preparation specifically, we recommend starting at least 3-4 months before the May exam date.',
  },
]

const PricingCard = ({
  tier,
  currency,
}: {
  tier: (typeof seniorFacultyPricing)[0]
  currency: string
}) => {
  const handleCTA = async () => {
    const message = `Hi! I'm interested in the AP Biology ${tier.name} package (${tier.hours} hours). Please share more details about your tutoring services.`
    await trackAndOpenWhatsApp({
      source: `ap-biology-${tier.name.toLowerCase()}`,
      message,
      campaign: 'ap-biology-pricing',
      buttonText: 'Get Started',
    })
  }

  return (
    <div
      className={`relative rounded-xl p-6 shadow-lg ${
        tier.popular ? 'border-2 border-green-500 bg-green-50' : 'border border-gray-200 bg-white'
      }`}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-green-500 px-4 py-1 text-xs font-semibold text-white">
            Most Popular
          </span>
        </div>
      )}
      <div className="mb-4 text-center">
        <h4 className="text-lg font-bold text-gray-900">{tier.name}</h4>
        <p className="text-sm text-gray-600">{tier.hours} Hours</p>
      </div>
      <div className="mb-4 text-center">
        <span className="text-3xl font-bold text-gray-900">
          {currency}
          {tier.price.toLocaleString()}
        </span>
        <p className="text-sm text-gray-500">
          {currency}
          {tier.perHour}/hour
        </p>
      </div>
      <ul className="mb-6 space-y-2">
        {tier.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={handleCTA}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 font-semibold text-white transition hover:bg-green-600"
      >
        <MessageCircle className="h-5 w-5" />
        Get Started
      </button>
    </div>
  )
}

export default function APBiologyPage() {
  const handleHeroCTA = async () => {
    const message =
      "Hi! I'm interested in AP Biology tutoring. I want to learn more about your online coaching programs."
    await trackAndOpenWhatsApp({
      source: 'ap-biology-hero',
      message,
      campaign: 'ap-biology',
      buttonText: 'Start AP Biology Prep',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-green-500 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-500 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4">
          <div
            className="mx-auto max-w-4xl text-center animate-fadeInUp"
          >
            <span className="mb-4 inline-block rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
              College Board Aligned Curriculum
            </span>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              AP Biology Online Tutor
            </h1>
            <p className="mb-8 text-lg text-gray-300 md:text-xl">
              Expert AP Biology tutoring aligned with Campbell Biology textbook. Master all 8 units,
              ace your labs, and score 5 on the AP exam with personalized online coaching.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={handleHeroCTA}
                className="flex items-center gap-2 rounded-lg bg-green-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-green-600"
              >
                <MessageCircle className="h-6 w-6" />
                Start AP Biology Prep
              </button>
              <Link
                href="/campbell-biology/"
                className="rounded-lg border border-white/30 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
              >
                View Campbell Chapters
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AP Biology Exam Overview */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              AP Biology Exam Format
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Understand the exam structure to prepare effectively
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div
              className="rounded-xl bg-white p-6 text-center shadow-lg animate-fadeInUp"
            >
              <div className="mb-4 text-4xl font-bold text-green-600">3 hrs</div>
              <div className="font-semibold text-gray-900">Total Duration</div>
              <p className="mt-2 text-sm text-gray-600">Including breaks</p>
            </div>

            <div
              className="rounded-xl bg-white p-6 text-center shadow-lg animate-fadeInUp"
            >
              <div className="mb-4 text-4xl font-bold text-blue-600">60</div>
              <div className="font-semibold text-gray-900">Multiple Choice</div>
              <p className="mt-2 text-sm text-gray-600">90 minutes, 50% of score</p>
            </div>

            <div
              className="rounded-xl bg-white p-6 text-center shadow-lg animate-fadeInUp"
            >
              <div className="mb-4 text-4xl font-bold text-purple-600">6</div>
              <div className="font-semibold text-gray-900">Free Response</div>
              <p className="mt-2 text-sm text-gray-600">90 minutes, 50% of score</p>
            </div>

            <div
              className="rounded-xl bg-white p-6 text-center shadow-lg animate-fadeInUp"
            >
              <div className="mb-4 text-4xl font-bold text-orange-600">1-5</div>
              <div className="font-semibold text-gray-900">Score Range</div>
              <p className="mt-2 text-sm text-gray-600">5 = Extremely qualified</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 AP Biology Units */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Complete AP Biology Coverage
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              All 8 units aligned with Campbell Biology chapters
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {apBiologyUnits.map((unit, index) => (
              <div
                key={unit.number}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition hover:border-green-300 hover:shadow-xl animate-fadeInUp"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    Unit {unit.number}
                  </span>
                  <span className="text-sm font-medium text-gray-500">{unit.weight}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{unit.title}</h3>
                <ul className="mb-3 space-y-1">
                  {unit.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 shrink-0 text-green-500" />
                      {topic}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500">Campbell Ch. {unit.campbellChapters}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-br from-green-50 to-teal-50 py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Why Choose Our AP Biology Tutoring
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Expert guidance to help you score 5 on the AP Biology exam
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-lg animate-fadeInUp"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <feature.icon className="text-xl text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              AP Biology Tutoring Packages
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Flexible pricing options for every learning goal
            </p>
          </div>

          {/* Senior Faculty */}
          <div className="mb-12">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900">Senior Faculty</h3>
              <p className="text-gray-600">
                PhD holders & AP Biology teachers with 8+ years experience
              </p>
              <p className="mt-1 text-sm text-green-600">$120-150/hour</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {seniorFacultyPricing.map((tier, index) => (
                <PricingCard key={index} tier={tier} currency="$" />
              ))}
            </div>
          </div>

          {/* Junior Faculty */}
          <div className="mb-12">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900">Junior Faculty</h3>
              <p className="text-gray-600">Master&apos;s degree holders with teaching experience</p>
              <p className="mt-1 text-sm text-green-600">$60-75/hour</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {juniorFacultyPricing.map((tier, index) => (
                <PricingCard key={index} tier={tier} currency="$" />
              ))}
            </div>
          </div>

          {/* Batch Programs */}
          <div>
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900">Group Classes</h3>
              <p className="text-gray-600">Small batch learning (4-6 students per group)</p>
              <p className="mt-1 text-sm text-green-600">$40/hour</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {batchPricing.map((tier, index) => (
                <PricingCard key={index} tier={tier} currency="$" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Common questions about AP Biology preparation
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-lg animate-fadeInUp"
              >
                <h3 className="mb-3 text-lg font-bold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      </section>

      {/* Related Pages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-8 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Related Programs</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Link
              href="/campbell-biology/"
              className="rounded-lg border border-gray-200 bg-white p-4 text-center transition hover:border-green-300 hover:shadow-lg"
            >
              <BookOpen className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <span className="font-semibold text-gray-900">Campbell Biology</span>
              <p className="mt-1 text-sm text-gray-600">56 chapter guides</p>
            </Link>
            <Link
              href="/biology-olympiad-preparation/"
              className="rounded-lg border border-gray-200 bg-white p-4 text-center transition hover:border-yellow-300 hover:shadow-lg"
            >
              <Award className="mx-auto mb-2 h-6 w-6 text-yellow-600" />
              <span className="font-semibold text-gray-900">Biology Olympiad</span>
              <p className="mt-1 text-sm text-gray-600">IBO, USABO, BBO prep</p>
            </Link>
            <Link
              href="/ib-biology-online-classes/"
              className="rounded-lg border border-gray-200 bg-white p-4 text-center transition hover:border-purple-300 hover:shadow-lg"
            >
              <GraduationCap className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <span className="font-semibold text-gray-900">IB Biology</span>
              <p className="mt-1 text-sm text-gray-600">HL & SL tutoring</p>
            </Link>
            <Link
              href="/mcat-biology-preparation/"
              className="rounded-lg border border-gray-200 bg-white p-4 text-center transition hover:border-teal-300 hover:shadow-lg"
            >
              <Users className="mx-auto mb-2 h-6 w-6 text-teal-600" />
              <span className="font-semibold text-gray-900">MCAT Biology</span>
              <p className="mt-1 text-sm text-gray-600">Pre-med preparation</p>
            </Link>
            <Link
              href="/courses/"
              className="rounded-lg border border-gray-200 bg-white p-4 text-center transition hover:border-blue-300 hover:shadow-lg"
            >
              <TrendingUp className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <span className="font-semibold text-gray-900">All Courses</span>
              <p className="mt-1 text-sm text-gray-600">View all programs</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Score 5 on AP Biology?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-300">
              Start your AP Biology preparation today with expert tutoring aligned to Campbell
              Biology and College Board standards.
            </p>
            <button
              onClick={handleHeroCTA}
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-green-600"
            >
              <MessageCircle className="h-6 w-6" />
              Start AP Biology Prep Today
            </button>
          </div>
        </div>
      </section>

      {/* Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'AP Biology Online Tutoring',
            description:
              'Expert AP Biology tutoring aligned with Campbell Biology textbook. Master all 8 units and score 5 on your AP exam.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            educationalLevel: 'High School',
            about: ['AP Biology', 'College Board', 'Advanced Placement Biology'],
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'online',
              instructor: {
                '@type': 'Person',
                name: 'Cerebrum Biology Faculty',
              },
            },
          }),
        }}
      />
    </main>
  )
}
