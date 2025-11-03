import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle,
  Clock,
  Users,
  Award,
  BookOpen,
  Target,
  Star,
  ArrowRight,
  Trophy,
  MapPin,
  Languages,
} from 'lucide-react'

export const metadata: Metadata = {
  title:
    'State Board Biology Coaching | All States Covered | Regional Language Support | Cerebrum Biology Academy',
  description:
    'Expert State Board Biology coaching for all Indian states. Regional language support, state-specific curriculum, and local examination pattern focus.',
  keywords:
    'State board Biology coaching, regional board preparation, state-specific curriculum, local language support',
}

export default function StateBoardsPage() {
  const majorStateBoards = [
    {
      state: 'Maharashtra State Board',
      code: 'MSBSHSE',
      language: 'Marathi/English',
      pattern: 'HSC Pattern',
      students: '400+',
      avgScore: '82%',
    },
    {
      state: 'Tamil Nadu State Board',
      code: 'TNBSE',
      language: 'Tamil/English',
      pattern: 'Plus Two Pattern',
      students: '350+',
      avgScore: '85%',
    },
    {
      state: 'Karnataka State Board',
      code: 'KSEEB',
      language: 'Kannada/English',
      pattern: 'PUC Pattern',
      students: '300+',
      avgScore: '80%',
    },
    {
      state: 'Andhra Pradesh Board',
      code: 'BIEAP',
      language: 'Telugu/English',
      pattern: 'Intermediate Pattern',
      students: '280+',
      avgScore: '83%',
    },
    {
      state: 'Kerala State Board',
      code: 'DHSE',
      language: 'Malayalam/English',
      pattern: 'Higher Secondary',
      students: '200+',
      avgScore: '86%',
    },
    {
      state: 'West Bengal Board',
      code: 'WBCHSE',
      language: 'Bengali/English',
      pattern: 'HS Pattern',
      students: '250+',
      avgScore: '81%',
    },
  ]

  const commonChallenges = [
    {
      challenge: 'Language Barrier',
      solution: 'Bilingual teaching with regional language support',
      benefit: 'Better concept understanding in native language',
    },
    {
      challenge: 'State-Specific Syllabus',
      solution: 'Customized curriculum for each state board',
      benefit: 'Precise alignment with state board requirements',
    },
    {
      challenge: 'Local Exam Pattern',
      solution: 'State board specific question pattern practice',
      benefit: 'Familiarity with state examination style',
    },
    {
      challenge: 'NEET Preparation Gap',
      solution: 'Bridge course connecting state syllabus to NEET',
      benefit: 'Seamless transition to medical entrance preparation',
    },
  ]

  const features = [
    'State-specific Biology curriculum coverage',
    'Regional language support and bilingual teaching',
    'Local examination pattern and question types',
    'State board textbook comprehensive coverage',
    'Previous years state board question papers',
    'NEET preparation integration with state syllabus',
    'Cultural and regional context in examples',
    'Local faculty with state board expertise',
  ]

  const successStats = [
    { number: '94%', label: 'Pass Rate', description: 'Students scoring 80+ marks' },
    { number: '1800+', label: 'State Board Students', description: 'Across all states' },
    { number: '12', label: 'States Covered', description: 'Major state boards' },
    { number: '83.5', label: 'Average Score', description: 'State board Biology marks' },
  ]

  const regionalSupport = [
    {
      icon: Languages,
      title: 'Multilingual Teaching',
      description:
        'Instruction available in regional languages alongside English for better comprehension',
    },
    {
      icon: MapPin,
      title: 'Local Context',
      description: 'Biology examples and case studies relevant to regional environment and culture',
    },
    {
      icon: BookOpen,
      title: 'State Textbooks',
      description: 'Comprehensive coverage of state-prescribed textbooks and reference materials',
    },
    {
      icon: Target,
      title: 'Exam Pattern Focus',
      description:
        'Specialized training for state-specific examination patterns and marking schemes',
    },
  ]

  const universityPreparation = [
    'State university entrance exam preparation',
    'Medical entrance bridge courses (NEET/AIIMS)',
    'Agricultural university entrance preparation',
    'Veterinary entrance exam coaching',
    'Biotechnology entrance exam guidance',
    'Pharmacy entrance test preparation',
  ]

  const getStateColorClass = (index: number) => {
    const colors = [
      'border-orange-500 bg-orange-50',
      'border-green-500 bg-green-50',
      'border-blue-500 bg-blue-50',
      'border-purple-500 bg-purple-50',
      'border-red-500 bg-red-50',
      'border-indigo-500 bg-indigo-50',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                State Board Biology Excellence
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-orange-100 mb-6 sm:mb-8">
                Master Biology across all major state boards with our specialized regional approach.
                Local language support, state-specific curriculum, and cultural context integration.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/admissions"
                  className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center"
                >
                  Choose Your State Board
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
                >
                  Book Demo Class
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">State Board Coverage</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-orange-300" />
                  <span className="text-sm sm:text-base">12+ Major State Boards</span>
                </div>
                <div className="flex items-center">
                  <Languages className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-orange-300" />
                  <span className="text-sm sm:text-base">Regional Language Support</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-orange-300" />
                  <span className="text-sm sm:text-base">State-Specific Curriculum</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-orange-300" />
                  <span className="text-sm sm:text-base">80+ Average Score Target</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-2xl sm:text-3xl md:text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              State Board Success Record
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Exceptional results across all major state education boards
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {successStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-2xl sm:text-3xl md:text-3xl sm:text-4xl font-bold text-orange-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-sm sm:text-base text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major State Boards */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-2xl sm:text-3xl md:text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Major State Boards We Cover
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized coaching for major state education boards with regional expertise and
              local context
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {majorStateBoards.map((board, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-4 sm:p-6 shadow-lg border-l-4 ${getStateColorClass(index)} hover:shadow-xl transition-shadow`}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{board.state}</h3>
                  <p className="text-sm text-gray-600 mb-3">{board.code}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-sm sm:text-base text-gray-600">Language:</span>
                    <span className="text-sm font-medium text-gray-900">{board.language}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-sm sm:text-base text-gray-600">Pattern:</span>
                    <span className="text-sm font-medium text-gray-900">{board.pattern}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-sm sm:text-base text-gray-600">Students:</span>
                    <span className="text-sm font-medium text-gray-900">{board.students}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-sm sm:text-base text-gray-600">Avg Score:</span>
                    <span className="text-sm font-medium text-green-600">{board.avgScore}</span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="block w-full text-center py-2 px-4 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Challenges & Solutions */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-2xl sm:text-3xl md:text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Overcoming State Board Challenges
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Our specialized approach addresses unique challenges faced by state board students
            </p>
          </div>

          <div className="space-y-6">
            {commonChallenges.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-center">
                  <div>
                    <h3 className="text-lg font-bold text-red-600 mb-2">Challenge</h3>
                    <p className="text-gray-700">{item.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-600 mb-2">Our Solution</h3>
                    <p className="text-gray-700">{item.solution}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-600 mb-2">Student Benefit</h3>
                    <p className="text-gray-700">{item.benefit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Support Features */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-2xl sm:text-3xl md:text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Regional Support & Cultural Integration
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive support that respects and integrates regional language, culture, and
              context
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {regionalSupport.map((support, index) => {
              const Icon = support.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                    {support.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{support.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* University Preparation */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-2xl sm:text-3xl md:text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Beyond State Boards: University Preparation
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              State board foundation with entrance exam preparation for higher education
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {universityPreparation.map((prep, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{prep}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-2xl sm:text-3xl md:text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              State Board Course Features
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 mb-4" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Enrollment */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-2xl sm:text-3xl md:text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Excel in Your State Board Today
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  State Board Biology Program
                </h3>
                <div className="text-left space-y-2 sm:space-y-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2" />
                    <span className="text-sm sm:text-base">State-specific curriculum coverage</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2" />
                    <span className="text-sm sm:text-base">Regional language support</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2" />
                    <span className="text-sm sm:text-base">Local examination pattern focus</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2" />
                    <span className="text-sm sm:text-base">NEET preparation bridge course</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-4">₹22,999</div>
                <p className="text-gray-600 mb-6">Complete state board program</p>
                <div className="space-y-2 sm:space-y-3">
                  <Link
                    href="/admissions"
                    className="block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                  >
                    Choose Your State Board
                  </Link>
                  <Link
                    href="/contact"
                    className="block border border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                  >
                    Book Free Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-100 border border-green-300 rounded-xl p-6">
            <p className="text-green-800 font-semibold mb-2">🌟 Regional Special Offer</p>
            <p className="text-green-700">
              Enroll now and get FREE state board previous year papers + regional language study
              materials worth ₹3,000!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
