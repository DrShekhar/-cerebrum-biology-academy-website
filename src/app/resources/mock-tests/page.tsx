'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  Clock,
  Target,
  BarChart3,
  CheckCircle,
  Lock,
  Play,
  Trophy,
  Users,
  Star,
  ArrowRight,
  BookOpen,
  Brain,
  Sparkles,
  Award,
  TrendingUp,
  Calendar,
} from 'lucide-react'

interface MockTest {
  id: string
  title: string
  category: string
  questions: number
  duration: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  attempts: number
  avgScore: number
  isFree: boolean
  isNew?: boolean
  isPopular?: boolean
}

export default function MockTestsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const categories = [
    { id: 'all', label: 'All Tests' },
    { id: 'full-mock', label: 'Full Mock Tests' },
    { id: 'chapter', label: 'Chapter-wise' },
    { id: 'topic', label: 'Topic-wise' },
    { id: 'pyq', label: 'Previous Year' },
  ]

  const mockTests: MockTest[] = [
    {
      id: 'neet-mock-1',
      title: 'NEET Biology Full Mock Test 1',
      category: 'full-mock',
      questions: 90,
      duration: '180 min',
      difficulty: 'Hard',
      attempts: 12500,
      avgScore: 68,
      isFree: true,
      isPopular: true,
    },
    {
      id: 'neet-mock-2',
      title: 'NEET Biology Full Mock Test 2',
      category: 'full-mock',
      questions: 90,
      duration: '180 min',
      difficulty: 'Hard',
      attempts: 8900,
      avgScore: 65,
      isFree: false,
    },
    {
      id: 'botany-mock-1',
      title: 'Botany Complete Test',
      category: 'full-mock',
      questions: 45,
      duration: '90 min',
      difficulty: 'Medium',
      attempts: 6200,
      avgScore: 72,
      isFree: false,
    },
    {
      id: 'zoology-mock-1',
      title: 'Zoology Complete Test',
      category: 'full-mock',
      questions: 45,
      duration: '90 min',
      difficulty: 'Medium',
      attempts: 5800,
      avgScore: 70,
      isFree: false,
    },
    {
      id: 'cell-biology',
      title: 'Cell Biology - The Unit of Life',
      category: 'chapter',
      questions: 30,
      duration: '45 min',
      difficulty: 'Medium',
      attempts: 15200,
      avgScore: 75,
      isFree: true,
    },
    {
      id: 'genetics',
      title: 'Genetics & Evolution',
      category: 'chapter',
      questions: 35,
      duration: '50 min',
      difficulty: 'Hard',
      attempts: 11800,
      avgScore: 62,
      isFree: false,
      isPopular: true,
    },
    {
      id: 'human-physiology',
      title: 'Human Physiology Complete',
      category: 'chapter',
      questions: 40,
      duration: '60 min',
      difficulty: 'Hard',
      attempts: 9500,
      avgScore: 64,
      isFree: false,
    },
    {
      id: 'plant-physiology',
      title: 'Plant Physiology',
      category: 'chapter',
      questions: 35,
      duration: '50 min',
      difficulty: 'Medium',
      attempts: 7200,
      avgScore: 71,
      isFree: false,
    },
    {
      id: 'ecology',
      title: 'Ecology & Environment',
      category: 'chapter',
      questions: 30,
      duration: '45 min',
      difficulty: 'Easy',
      attempts: 8900,
      avgScore: 78,
      isFree: true,
    },
    {
      id: 'biomolecules',
      title: 'Biomolecules',
      category: 'topic',
      questions: 20,
      duration: '30 min',
      difficulty: 'Medium',
      attempts: 6500,
      avgScore: 73,
      isFree: true,
    },
    {
      id: 'dna-replication',
      title: 'DNA Replication & Transcription',
      category: 'topic',
      questions: 25,
      duration: '35 min',
      difficulty: 'Hard',
      attempts: 5200,
      avgScore: 61,
      isFree: false,
      isNew: true,
    },
    {
      id: 'photosynthesis',
      title: 'Photosynthesis',
      category: 'topic',
      questions: 20,
      duration: '30 min',
      difficulty: 'Medium',
      attempts: 7800,
      avgScore: 69,
      isFree: false,
    },
    {
      id: 'neet-2024-pyq',
      title: 'NEET 2024 Biology Questions',
      category: 'pyq',
      questions: 90,
      duration: '180 min',
      difficulty: 'Hard',
      attempts: 25000,
      avgScore: 58,
      isFree: false,
      isNew: true,
      isPopular: true,
    },
    {
      id: 'neet-2023-pyq',
      title: 'NEET 2023 Biology Questions',
      category: 'pyq',
      questions: 90,
      duration: '180 min',
      difficulty: 'Hard',
      attempts: 32000,
      avgScore: 62,
      isFree: true,
    },
    {
      id: 'neet-2022-pyq',
      title: 'NEET 2022 Biology Questions',
      category: 'pyq',
      questions: 90,
      duration: '180 min',
      difficulty: 'Hard',
      attempts: 28500,
      avgScore: 65,
      isFree: false,
    },
  ]

  const filteredTests = mockTests.filter((test) => {
    const categoryMatch = selectedCategory === 'all' || test.category === selectedCategory
    const difficultyMatch = selectedDifficulty === 'all' || test.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  const stats = [
    { icon: FileText, value: '200+', label: 'Mock Tests' },
    { icon: Users, value: '50,000+', label: 'Test Attempts' },
    { icon: Target, value: '15,000+', label: 'Questions' },
    { icon: TrendingUp, value: '85%', label: 'Score Improvement' },
  ]

  const features = [
    {
      icon: Brain,
      title: 'Adaptive Testing',
      description: 'Questions adapt to your level for personalized practice',
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Track your performance with comprehensive reports',
    },
    {
      icon: Trophy,
      title: 'All India Ranking',
      description: 'Compare your scores with students across India',
    },
    {
      icon: Clock,
      title: 'Real Exam Simulation',
      description: 'Experience NEET-like environment with timed tests',
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'Hard':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
              <FileText className="h-4 w-4" />
              200+ Practice Tests Available
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              NEET Biology
              <span className="block text-purple-300">Mock Tests</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-purple-100">
              Practice with our comprehensive mock test series. Full-length tests, chapter-wise
              assessments, and previous year questions with detailed solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg"
              >
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-purple-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Why Practice With Our Mock Tests?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Our test series is designed to replicate the actual NEET exam experience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"
              >
                <feature.icon className="mx-auto mb-4 h-12 w-12 text-purple-600" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Filters */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Difficulty:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Mock Tests Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Tests ({filteredTests.length})
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-purple-300 hover:shadow-lg"
              >
                {/* Badges */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {test.isNew && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      <Sparkles className="h-3 w-3" />
                      New
                    </span>
                  )}
                  {test.isPopular && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                      <Star className="h-3 w-3" />
                      Popular
                    </span>
                  )}
                  {test.isFree && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      <CheckCircle className="h-3 w-3" />
                      Free
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(test.difficulty)}`}
                  >
                    {test.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-purple-600">
                  {test.title}
                </h3>

                {/* Test Info */}
                <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    {test.questions} Questions
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {test.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {test.attempts.toLocaleString()} Attempts
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="h-4 w-4" />
                    Avg: {test.avgScore}%
                  </div>
                </div>

                {/* Action Button */}
                {test.isFree ? (
                  <Link
                    href={`/resources/mock-tests/${test.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-3 font-medium text-white transition-all hover:bg-purple-700"
                  >
                    <Play className="h-5 w-5" />
                    Start Free Test
                  </Link>
                ) : (
                  <Link
                    href="/courses"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-purple-300 px-4 py-3 font-medium text-purple-600 transition-all hover:bg-purple-50"
                  >
                    <Lock className="h-5 w-5" />
                    Unlock with Course
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Schedule */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Upcoming Live Tests</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Participate in scheduled tests to compete with students across India
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'All India NEET Mock Test - December',
                date: 'Dec 15, 2025',
                time: '10:00 AM',
                participants: '5,000+',
                prize: '₹50,000',
              },
              {
                title: 'Biology Marathon Test',
                date: 'Dec 22, 2025',
                time: '2:00 PM',
                participants: '3,000+',
                prize: '₹25,000',
              },
              {
                title: 'NEET 2025 Final Mock',
                date: 'Jan 5, 2026',
                time: '9:00 AM',
                participants: '10,000+',
                prize: '₹1,00,000',
              },
            ].map((event, index) => (
              <div key={index} className="rounded-xl border border-purple-200 bg-purple-50 p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{event.title}</h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {event.date} • {event.time}
                    </div>
                  </div>
                  <div className="rounded-lg bg-purple-600 px-3 py-1 text-xs font-bold text-white">
                    LIVE
                  </div>
                </div>
                <div className="mb-4 flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-gray-600">
                    <Users className="h-4 w-4" />
                    {event.participants} Expected
                  </span>
                  <span className="flex items-center gap-1 font-medium text-purple-600">
                    <Award className="h-4 w-4" />
                    Prize: {event.prize}
                  </span>
                </div>
                <button className="w-full rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-all hover:bg-purple-700">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Series Packages */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Test Series Packages</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Get unlimited access to all mock tests with our comprehensive packages
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Basic',
                price: '₹999',
                validity: '3 Months',
                features: [
                  '50 Chapter-wise Tests',
                  '10 Full Mock Tests',
                  'Basic Analytics',
                  'Solutions Access',
                ],
                popular: false,
              },
              {
                name: 'Pro',
                price: '₹2,499',
                validity: '6 Months',
                features: [
                  '100+ Chapter-wise Tests',
                  '25 Full Mock Tests',
                  'Advanced Analytics',
                  'All India Ranking',
                  'Doubt Resolution',
                  'Performance Reports',
                ],
                popular: true,
              },
              {
                name: 'Ultimate',
                price: '₹4,999',
                validity: '12 Months',
                features: [
                  '200+ All Tests',
                  '50 Full Mock Tests',
                  'AI-Powered Analytics',
                  'All India Ranking',
                  'Priority Support',
                  'Previous Year Papers',
                  'Expert Guidance',
                ],
                popular: false,
              },
            ].map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-2xl border-2 bg-white p-8 ${
                  pkg.popular ? 'border-purple-500 shadow-xl' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-4 py-1 text-sm font-medium text-white">
                    Most Popular
                  </div>
                )}
                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-purple-600">{pkg.price}</div>
                  <div className="text-sm text-gray-500">{pkg.validity} Access</div>
                </div>
                <ul className="mb-8 space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/courses"
                  className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-all ${
                    pkg.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'border border-purple-300 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">How to Get Started</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: '1',
                title: 'Choose a Test',
                desc: 'Browse and select from our test library',
              },
              {
                step: '2',
                title: 'Attempt Test',
                desc: 'Complete the test in exam-like conditions',
              },
              { step: '3', title: 'Get Analysis', desc: 'Review detailed performance analytics' },
              { step: '4', title: 'Improve', desc: 'Focus on weak areas and retake tests' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white">Start Practicing Today</h2>
          <p className="mb-8 text-lg text-purple-100">
            Join thousands of students who improved their NEET scores with our mock tests. Try a
            free test now!
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/resources/mock-tests/neet-mock-1"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-purple-600 transition-all hover:bg-gray-100"
            >
              <Play className="h-5 w-5" />
              Try Free Mock Test
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-purple-600"
            >
              <BookOpen className="h-5 w-5" />
              View All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
