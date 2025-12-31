import Link from 'next/link'
import { Metadata } from 'next'
import {
  Calculator,
  Building2,
  Calendar,
  BookOpen,
  Award,
  Target,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Clock,
  Users,
  ClipboardCheck,
  Timer,
  Swords,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free NEET Preparation Tools 2026 | Cerebrum Biology Academy',
  description:
    'Free NEET preparation tools: Rank Predictor, College Predictor, Study Plan Generator, and more. Boost your NEET 2026 preparation with our AI-powered tools.',
  keywords: [
    'NEET tools',
    'NEET rank predictor',
    'NEET college predictor',
    'NEET study plan',
    'NEET preparation tools',
    'free NEET tools',
    'NEET 2026 preparation',
    'NEET exam countdown',
    'NEET days left',
  ],
  openGraph: {
    title: 'Free NEET Preparation Tools 2026 | Cerebrum Biology Academy',
    description:
      'Free NEET preparation tools: Rank Predictor, College Predictor, Study Plan Generator. Plan your NEET journey with our AI-powered tools.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-tools',
  },
}

const tools = [
  {
    title: 'NEET Exam Countdown',
    description:
      'Track days left for NEET 2026 with live countdown, study time calculator, and personalized preparation phase guidance.',
    href: '/neet-exam-countdown',
    icon: Timer,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-100',
    iconColor: 'text-violet-600',
    features: ['Live countdown', 'Study time calculator', 'Streak tracker'],
    users: 'New',
  },
  {
    title: 'NEET Rank Predictor',
    description:
      'Predict your All India Rank based on your expected NEET score. Uses historical data and statistical analysis.',
    href: '/neet-rank-predictor',
    icon: Calculator,
    color: 'bg-orange-600',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
    features: ['Score to rank conversion', 'Category-wise prediction', 'Historical trends'],
    users: '50,000+',
  },
  {
    title: 'NEET College Predictor',
    description:
      'Find medical colleges you can get admission in based on your NEET rank. Filter by state, category, and college type.',
    href: '/neet-college-predictor',
    icon: Building2,
    color: 'blue-600',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    features: ['100+ colleges database', 'State-wise filtering', 'Cutoff comparison'],
    users: '35,000+',
  },
  {
    title: 'Study Plan Generator',
    description:
      'Get a personalized week-by-week study schedule for NEET Biology based on your available time and weak areas.',
    href: '/neet-study-plan-generator',
    icon: Calendar,
    color: 'bg-green-600',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    features: ['Personalized schedule', 'Topic prioritization', 'Downloadable plan'],
    users: '25,000+',
  },
  {
    title: 'OMR Evaluation Tool',
    description:
      'Check your test answers against the official answer key. Get instant results with section-wise analysis and explanations.',
    href: '/neet-tools/omr-checker',
    icon: ClipboardCheck,
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    features: ['Instant results', 'Section-wise analysis', 'Incorrect question explanations'],
    users: 'New',
  },
  {
    title: 'Quiz Competition',
    description:
      'Conduct live team-based quizzes in your classroom. Two teams compete with real-time score updates on all devices.',
    href: '/neet-tools/quiz-competition',
    icon: Swords,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    features: ['Live scoreboard', 'Multi-device sync', 'Custom scoring rules'],
    users: 'New',
  },
]

const upcomingTools = [
  {
    title: 'NEET Mock Test Analyzer',
    description: 'Analyze your mock test performance and get insights on improvement areas.',
    icon: Target,
    status: 'Coming Soon',
  },
  {
    title: 'Chapter-wise Question Bank',
    description: 'Practice thousands of NEET Biology questions organized by chapter.',
    icon: BookOpen,
    status: 'Coming Soon',
  },
  {
    title: 'Revision Scheduler',
    description: 'Smart spaced repetition scheduler to help you retain what you learn.',
    icon: Clock,
    status: 'Coming Soon',
  },
]

export default function NEETToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Free NEET Preparation Tools 2026',
            description:
              'Collection of free NEET preparation tools including rank predictor, college predictor, and study plan generator.',
            url: 'https://cerebrumbiologyacademy.com/neet-tools',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: tools.map((tool, index) => ({
                '@type': 'SoftwareApplication',
                position: index + 1,
                name: tool.title,
                description: tool.description,
                applicationCategory: 'EducationalApplication',
                operatingSystem: 'All',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
              })),
            },
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 pt-16 pb-24 text-white md:pt-24 md:pb-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>NEET Tools</span>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">100% Free Tools</span>
              </div>

              <h1 className="mb-4 text-3xl font-bold md:text-5xl">
                Free NEET Preparation Tools 2026
              </h1>
              <p className="mb-8 text-lg text-indigo-100 md:text-xl">
                Plan your NEET journey with our collection of AI-powered tools. Predict your rank,
                find colleges, create study plans, and more.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">1 Lakh+ Students</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">No Registration Required</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="-mt-16 md:-mt-20 relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="group rounded-2xl bg-white p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${tool.bgColor}`}
                  >
                    <tool.icon className={`h-7 w-7 ${tool.iconColor}`} />
                  </div>

                  <h2 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-indigo-600">
                    {tool.title}
                  </h2>
                  <p className="mb-4 text-gray-600">{tool.description}</p>

                  <ul className="mb-4 space-y-2">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{tool.users} users</span>
                    <span className="flex items-center gap-1 font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                      Try Now <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Use Our Tools */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Why Use Our NEET Tools?
            </h2>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {[
                {
                  icon: Target,
                  title: 'Data-Driven Accuracy',
                  desc: 'Our tools use real NEET data from previous years to provide accurate predictions and recommendations.',
                },
                {
                  icon: Clock,
                  title: 'Save Preparation Time',
                  desc: 'Spend less time planning and more time studying. Our tools do the heavy lifting for you.',
                },
                {
                  icon: CheckCircle,
                  title: '100% Free Forever',
                  desc: 'All tools are completely free. No hidden charges, no premium versions.',
                },
                {
                  icon: Users,
                  title: 'Trusted by Toppers',
                  desc: 'Over 1 lakh students have used our tools to plan their NEET preparation.',
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                    <item.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Tools */}
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">Coming Soon</h2>
            <p className="mb-8 text-center text-gray-600">
              More powerful tools to supercharge your NEET preparation
            </p>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              {upcomingTools.map((tool) => (
                <div
                  key={tool.title}
                  className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 opacity-75"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <tool.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <span className="mb-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    {tool.status}
                  </span>
                  <h3 className="mb-2 font-semibold text-gray-700">{tool.title}</h3>
                  <p className="text-sm text-gray-500">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700">
              <div className="grid items-center md:grid-cols-2">
                <div className="p-8 text-white md:p-12">
                  <h2 className="mb-4 text-2xl font-bold md:text-3xl">Ready to Ace NEET 2026?</h2>
                  <p className="mb-6 text-indigo-100">
                    Tools can help you plan, but expert guidance makes the difference. Join Cerebrum
                    Biology Academy for personalized NEET preparation.
                  </p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>AIIMS expert faculty</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>98% success rate</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Personalized attention</span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/demo"
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
                    >
                      Book Free Demo
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      Read Study Guides
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="relative h-full min-h-[350px] bg-gradient-to-br from-indigo-500/30 to-transparent">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="h-56 w-56 text-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Popular Study Resources
            </h2>

            <div className="grid gap-6 md:grid-cols-4">
              <Link
                href="/blog/neet-biology-chapter-wise-weightage-2026"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-indigo-600">
                  Chapter Weightage
                </h3>
                <p className="text-sm text-gray-600">Know which chapters to prioritize</p>
              </Link>

              <Link
                href="/blog/ncert-reading-strategy-neet-biology-2026"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-indigo-600">
                  NCERT Strategy
                </h3>
                <p className="text-sm text-gray-600">How to read NCERT effectively</p>
              </Link>

              <Link
                href="/blog/genetics-heredity-variation-neet"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-indigo-600">
                  Genetics Notes
                </h3>
                <p className="text-sm text-gray-600">Highest weightage chapter notes</p>
              </Link>

              <Link
                href="/blog/photosynthesis-neet-biology-notes"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-indigo-600">
                  Photosynthesis Notes
                </h3>
                <p className="text-sm text-gray-600">Complete chapter notes</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
