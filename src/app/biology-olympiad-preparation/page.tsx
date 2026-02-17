import { Metadata } from 'next'
import Link from 'next/link'
import {
  Trophy,
  Globe,
  GraduationCap,
  Book,
  ChevronRight,
  Star,
  Users,
  Award,
  Target,
  CheckCircle,
} from 'lucide-react'
import { getOlympiadsByRegion } from '@/data/olympiad'
import { CampbellWhatsAppCTA } from '@/components/campbell/CampbellWhatsAppCTA'
import { CampbellFloatingWhatsApp } from '@/components/campbell/CampbellFloatingWhatsApp'

export const metadata: Metadata = {
  title: 'Biology Olympiad Preparation Online | IBO, USABO, BBO, INBO Coaching',
  description:
    'Expert Biology Olympiad coaching online. Prepare for IBO, USABO, BBO, INBO and 10+ national olympiads with Campbell Biology. Small batches, expert faculty.',
  keywords: [
    'Biology Olympiad preparation',
    'IBO coaching online',
    'USABO preparation',
    'BBO coaching',
    'INBO preparation',
    'biology olympiad tutoring',
    'olympiad biology coaching',
    'international biology olympiad',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-olympiad-preparation/',
  },
  openGraph: {
    title: 'Biology Olympiad Preparation Online | IBO, USABO, BBO, INBO Coaching',
    description:
      'Expert Biology Olympiad coaching online. Prepare for IBO, USABO, BBO, INBO and 10+ national olympiads with Campbell Biology.',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
}

const iboStats = {
  countries: 80,
  studentsAnnually: '300+',
  medalCategories: 4,
  practicalWeight: '40%',
}

const keyFeatures = [
  {
    icon: Book,
    title: 'Campbell Biology Mastery',
    description: 'Complete coverage of all 56 chapters with focus on high-yield olympiad topics.',
  },
  {
    icon: GraduationCap,
    title: 'Expert Faculty',
    description: '15+ years experience coaching Biology Olympiad students from 10+ countries.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Maximum 6 students per batch for personalized attention and doubt clearing.',
  },
  {
    icon: Target,
    title: 'IBO-Level Content',
    description: 'Training aligned with International Biology Olympiad standards and format.',
  },
]

export default function BiologyOlympiadHubPage() {
  const asiaOlympiads = getOlympiadsByRegion('asia')
  const europeOlympiads = getOlympiadsByRegion('europe')
  const americasOlympiads = getOlympiadsByRegion('americas')
  const oceaniaOlympiads = getOlympiadsByRegion('oceania')

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            International Biology Olympiad Preparation
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Biology Olympiad
            <br />
            <span className="text-yellow-400">Online Coaching</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Expert preparation for IBO, USABO, BBO, INBO, and 10+ national Biology Olympiads. Master
            Campbell Biology with personalized coaching.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-yellow-400">{iboStats.countries}+</div>
              <div className="text-slate-300 text-sm">Countries Participate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-green-400">10</div>
              <div className="text-slate-300 text-sm">National Olympiads</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-400">56</div>
              <div className="text-slate-300 text-sm">Campbell Chapters</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-400">15+</div>
              <div className="text-slate-300 text-sm">Years Experience</div>
            </div>
          </div>

          <CampbellWhatsAppCTA
            variant="hero"
            messageType="olympiad"
            campaign="olympiad-hub-hero"
            size="xl"
          >
            Start Olympiad Preparation
          </CampbellWhatsAppCTA>

          <p className="mt-4 text-sm text-slate-400">
            Free assessment test • Personalized study plan
          </p>
        </div>
      </section>

      {/* About IBO Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                What is the International Biology Olympiad?
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                The International Biology Olympiad (IBO) is the world's most prestigious biology
                competition for high school students. Over 80 countries participate, selecting their
                top 4 students through rigorous national olympiad programs.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Theory Examination (60%)</strong>
                    <p className="text-slate-600 text-sm">
                      Multiple choice and open-ended questions covering all biology domains
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Practical Examination (40%)</strong>
                    <p className="text-slate-600 text-sm">
                      Laboratory skills in biochemistry, molecular biology, botany, and zoology
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Medal Categories</strong>
                    <p className="text-slate-600 text-sm">
                      Gold (top 10%), Silver (next 20%), Bronze (next 30%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-600" />
                IBO Exam Structure
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-slate-500">Cell Biology & Biochemistry</div>
                  <div className="font-semibold text-slate-900">25% of exam</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-slate-500">Animal Anatomy & Physiology</div>
                  <div className="font-semibold text-slate-900">20% of exam</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-slate-500">Plant Anatomy & Physiology</div>
                  <div className="font-semibold text-slate-900">15% of exam</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-slate-500">Genetics & Evolution</div>
                  <div className="font-semibold text-slate-900">20% of exam</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-slate-500">Ecology & Ethology</div>
                  <div className="font-semibold text-slate-900">20% of exam</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Olympiads by Region */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
            Coaching for 10 National Olympiads
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Select your country to learn about the specific olympiad program and how we can help you
            prepare for IBO qualification.
          </p>

          <div className="space-y-12">
            {/* Americas */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Americas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {americasOlympiads.map((olympiad) => (
                  <Link
                    key={olympiad.id}
                    href={`/${olympiad.slug}/`}
                    className="group flex items-start gap-4 p-6 bg-white rounded-xl border border-slate-200 hover:border-yellow-500 hover:shadow-xl transition-all"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">
                      {olympiad.countryCode === 'US' ? '🇺🇸' : '🇨🇦'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 group-hover:text-yellow-600 transition-colors">
                        {olympiad.olympiadName}
                      </h4>
                      <p className="text-sm text-slate-600">{olympiad.olympiadFullName}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        {olympiad.examStructure.rounds.length} rounds • IBO qualification
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-yellow-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Europe */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                Europe
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {europeOlympiads.map((olympiad) => (
                  <Link
                    key={olympiad.id}
                    href={`/${olympiad.slug}/`}
                    className="group flex items-start gap-4 p-6 bg-white rounded-xl border border-slate-200 hover:border-green-500 hover:shadow-xl transition-all"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                      {olympiad.countryCode === 'GB' ? '🇬🇧' : '🇩🇪'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                        {olympiad.olympiadName}
                      </h4>
                      <p className="text-sm text-slate-600">{olympiad.olympiadFullName}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        {olympiad.examStructure.rounds.length} rounds • IBO qualification
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-green-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Asia */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-red-600" />
                Asia
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {asiaOlympiads.map((olympiad) => {
                  const flagMap: Record<string, string> = {
                    IN: '🇮🇳',
                    CN: '🇨🇳',
                    SG: '🇸🇬',
                    KR: '🇰🇷',
                    JP: '🇯🇵',
                  }
                  return (
                    <Link
                      key={olympiad.id}
                      href={`/${olympiad.slug}/`}
                      className="group flex items-start gap-4 p-6 bg-white rounded-xl border border-slate-200 hover:border-red-500 hover:shadow-xl transition-all"
                    >
                      <div className="flex-shrink-0 w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
                        {flagMap[olympiad.countryCode] || '🌏'}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                          {olympiad.olympiadName}
                        </h4>
                        <p className="text-sm text-slate-600 line-clamp-1">
                          {olympiad.olympiadFullName}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          {olympiad.examStructure.rounds.length} rounds • IBO qualification
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Oceania */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-600" />
                Oceania
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {oceaniaOlympiads.map((olympiad) => (
                  <Link
                    key={olympiad.id}
                    href={`/${olympiad.slug}/`}
                    className="group flex items-start gap-4 p-6 bg-white rounded-xl border border-slate-200 hover:border-purple-500 hover:shadow-xl transition-all"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                      🇦🇺
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                        {olympiad.olympiadName}
                      </h4>
                      <p className="text-sm text-slate-600">{olympiad.olympiadFullName}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        {olympiad.examStructure.rounds.length} rounds • IBO qualification
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-500" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Why Train with Cerebrum Academy?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campbell Biology Connection */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-8 md:p-12 border border-slate-200">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Campbell Biology: The Olympiad Standard
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  Campbell Biology is the most recommended textbook for Biology Olympiad preparation
                  worldwide. Our coaching covers all 56 chapters with special focus on high-yield
                  olympiad topics.
                </p>
                <Link
                  href="/campbell-biology/"
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
                >
                  <Book className="w-5 h-5" />
                  View All Campbell Chapters
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="text-3xl font-bold text-green-600">56</div>
                  <div className="text-sm text-slate-600">Chapters Covered</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="text-3xl font-bold text-yellow-600">8</div>
                  <div className="text-sm text-slate-600">Units</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="text-3xl font-bold text-blue-600">200+</div>
                  <div className="text-sm text-slate-600">Hours Content</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="text-3xl font-bold text-purple-600">1000+</div>
                  <div className="text-sm text-slate-600">Practice Questions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
            <div
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h3 className="font-bold text-slate-900 mb-3" itemProp="name">
                How do I qualify for the International Biology Olympiad?
              </h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-slate-600" itemProp="text">
                  Each country has its own national olympiad program. You must participate in your
                  country's national olympiad (like USABO in USA, BBO in UK, INBO in India) and rank
                  among the top 4 students to represent your country at IBO.
                </p>
              </div>
            </div>

            <div
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h3 className="font-bold text-slate-900 mb-3" itemProp="name">
                Is Campbell Biology enough for olympiad preparation?
              </h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-slate-600" itemProp="text">
                  Campbell Biology is the foundation for olympiad preparation. For higher rounds and
                  IBO, you'll also need supplementary resources like Molecular Biology of the Cell
                  (Alberts), Genetics (Griffiths), and intensive practice with past olympiad papers.
                </p>
              </div>
            </div>

            <div
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h3 className="font-bold text-slate-900 mb-3" itemProp="name">
                What grade should I start olympiad preparation?
              </h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-slate-600" itemProp="text">
                  Ideally, start in Grade 9-10 to build a strong foundation. Most national olympiads
                  are for students in Grade 11-12 (or equivalent). Starting early gives you time to
                  cover Campbell Biology thoroughly and practice with past papers.
                </p>
              </div>
            </div>

            <div
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h3 className="font-bold text-slate-900 mb-3" itemProp="name">
                Do you offer coaching for students outside India?
              </h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-slate-600" itemProp="text">
                  Yes! We offer online coaching to students from 80+ countries. Our international
                  batches are scheduled to accommodate different time zones, and all classes are
                  conducted in English using Campbell Biology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Olympiad MCQ Practice CTA */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Practice Olympiad MCQs Online</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Prepare for IBO, USABO, BBO &amp; INBO with our free MCQ practice tool — 5,900+ Campbell Biology
            level questions with instant feedback and detailed explanations.
          </p>
          <Link
            href="/neet-biology-mcq?source=olympiad"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl text-lg"
          >
            Start Olympiad Practice
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
            Also Explore Our Other Biology Programs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/ibo-preparation/"
              className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 text-center hover:shadow-xl hover:border-yellow-400 transition-all"
            >
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">IBO Preparation</h3>
              <p className="text-xs text-slate-600 mt-1">International finals</p>
            </Link>
            <Link
              href="/mcat-biology-preparation/"
              className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 text-center hover:shadow-xl hover:border-teal-400 transition-all"
            >
              <GraduationCap className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">MCAT Biology</h3>
              <p className="text-xs text-slate-600 mt-1">Pre-med prep</p>
            </Link>
            <Link
              href="/ap-biology-online-tutor/"
              className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 text-center hover:shadow-xl hover:border-purple-400 transition-all"
            >
              <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">AP Biology</h3>
              <p className="text-xs text-slate-600 mt-1">College Board</p>
            </Link>
            <Link
              href="/ib-biology-online-classes/"
              className="bg-white rounded-xl p-4 shadow-lg border border-slate-200 text-center hover:shadow-xl hover:border-green-400 transition-all"
            >
              <Book className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">IB Biology</h3>
              <p className="text-xs text-slate-600 mt-1">HL & SL</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Olympiad Journey?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Join students from 10+ countries who are preparing for Biology Olympiads with expert
            guidance. Get a free assessment and personalized study plan.
          </p>

          <CampbellWhatsAppCTA
            variant="hero"
            messageType="olympiad"
            campaign="olympiad-hub-cta"
            size="xl"
          >
            Chat on WhatsApp
          </CampbellWhatsAppCTA>

          <p className="mt-4 text-sm text-slate-400">
            Free assessment • Personalized study plan • No commitment
          </p>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <CampbellFloatingWhatsApp
        messageType="olympiad"
        campaign="olympiad-hub-floating"
        tooltipTitle="Biology Olympiad Help?"
        tooltipDescription="Get expert guidance for USABO, BBO, INBO, IBO preparation."
      />
    </main>
  )
}
