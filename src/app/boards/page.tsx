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
  GraduationCap,
  Globe,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Board Preparation | CBSE, ICSE, IGCSE, IB Biology Coaching | Cerebrum Biology Academy',
  description:
    'Expert Biology coaching for all major boards - CBSE, ICSE, IGCSE, IB, and State Boards. Score 90+ marks with our specialized board preparation programs.',
  keywords:
    'board preparation, CBSE Biology, ICSE Biology, IGCSE Biology, IB Biology, state board, board exam coaching',
}

export default function BoardPreparationPage() {
  const boardTypes = [
    {
      name: 'CBSE',
      fullName: 'Central Board of Secondary Education',
      description: 'Most popular board in India with NEET-aligned curriculum',
      features: ['NCERT-focused teaching', 'NEET preparation integration', 'All India coverage'],
      targetScore: '90+ marks',
      students: '2000+',
      color: 'blue',
      link: '/boards/cbse',
    },
    {
      name: 'ICSE',
      fullName: 'Indian Certificate of Secondary Education',
      description: 'Comprehensive curriculum with detailed Biology concepts',
      features: [
        'In-depth concept coverage',
        'Practical-focused approach',
        'High academic standards',
      ],
      targetScore: '88+ marks',
      students: '800+',
      color: 'green',
      link: '/boards/icse',
    },
    {
      name: 'IGCSE',
      fullName: 'International General Certificate',
      description: 'International curriculum with global recognition',
      features: ['Cambridge curriculum', 'International standards', 'Practical assessments'],
      targetScore: 'A*/A grades',
      students: '400+',
      color: 'purple',
      link: '/boards/igcse',
    },
    {
      name: 'IB',
      fullName: 'International Baccalaureate',
      description: 'Rigorous international program for global universities',
      features: ['Research-based learning', 'Critical thinking focus', 'University preparation'],
      targetScore: '6-7 points',
      students: '200+',
      color: 'red',
      link: '/boards/ib',
    },
    {
      name: 'State Boards',
      fullName: 'Various State Education Boards',
      description: 'Specialized coaching for different state board curricula',
      features: ['State-specific syllabus', 'Regional language support', 'Local exam pattern'],
      targetScore: '85+ marks',
      students: '1500+',
      color: 'orange',
      link: '/boards/state-boards',
    },
  ]

  const successStats = [
    { number: '94%', label: 'Board Success Rate', description: 'Students scoring 85+ marks' },
    { number: '4900+', label: 'Students Coached', description: 'Across all boards' },
    { number: '89', label: 'Average Score', description: 'Board Biology marks' },
    { number: '15+', label: 'Years Experience', description: 'Teaching all boards' },
  ]

  const whyChooseUs = [
    {
      icon: GraduationCap,
      title: 'Board-Specific Expertise',
      description: 'Specialized faculty for each board with deep curriculum knowledge',
    },
    {
      icon: Target,
      title: 'Targeted Approach',
      description: "Customized teaching methodology for each board's unique requirements",
    },
    {
      icon: Globe,
      title: 'International Standards',
      description: 'Global best practices in education for international board students',
    },
    {
      icon: Trophy,
      title: 'Proven Results',
      description: 'Consistent high scores across all board examinations year after year',
    },
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'border-blue-600 bg-blue-50 text-blue-800',
      green: 'border-green-600 bg-green-50 text-green-800',
      purple: 'border-purple-600 bg-purple-50 text-purple-800',
      red: 'border-red-600 bg-red-50 text-red-800',
      orange: 'border-orange-600 bg-orange-50 text-orange-800',
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Board Preparation Excellence
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-indigo-100 mb-8">
                Master Biology for all major educational boards. Specialized coaching for CBSE,
                ICSE, IGCSE, IB, and State Boards with board-specific teaching methodologies and
                expert faculty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/admissions"
                  className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors inline-flex items-center justify-center min-h-[44px]"
                >
                  Choose Your Board
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors inline-flex items-center justify-center min-h-[44px]"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">All Boards Covered</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-indigo-300" />
                  <span>CBSE, ICSE, IGCSE, IB, State Boards</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-6 h-6 mr-3 text-indigo-300" />
                  <span>Board-Specific Methodology</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-6 h-6 mr-3 text-indigo-300" />
                  <span>90+ Average Board Scores</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-indigo-300" />
                  <span>Flexible Schedule Options</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Board Exam Success Record
            </h2>
            <p className="text-gray-600">Outstanding results across all major educational boards</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {successStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Types */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Choose Your Board
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized preparation programs tailored for each board's unique curriculum and
              examination pattern
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardTypes.map((board, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${getColorClasses(board.color)} hover:shadow-xl transition-shadow`}
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{board.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{board.fullName}</p>
                  <p className="text-gray-700">{board.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {board.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Target Score</div>
                    <div className="font-semibold text-gray-900">{board.targetScore}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Students Coached</div>
                    <div className="font-semibold text-gray-900">{board.students}</div>
                  </div>
                </div>

                <Link
                  href={board.link}
                  className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
                    board.color === 'blue'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : board.color === 'green'
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : board.color === 'purple'
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : board.color === 'red'
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Board Preparation?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive expertise across all major educational boards with proven teaching
              methodologies
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Ready to Excel in Your Board Exams?
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Board Preparation Program</h3>
                <div className="text-left space-y-3">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Board-specific curriculum</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Expert faculty for each board</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>90+ target score guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Flexible scheduling options</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-4xl font-bold text-indigo-600 mb-4">Starting ₹19,999</div>
                <p className="text-gray-600 mb-6">Complete board preparation program</p>
                <div className="space-y-3">
                  <Link
                    href="/admissions"
                    className="block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Choose Your Board
                  </Link>
                  <Link
                    href="/contact"
                    className="block border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                  >
                    Book Free Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-100 border border-green-300 rounded-xl p-6">
            <p className="text-green-800 font-semibold mb-2">📚 Board Exam Special</p>
            <p className="text-green-700">
              Get a FREE board-specific study plan and previous year question bank when you enroll
              before board registrations!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
