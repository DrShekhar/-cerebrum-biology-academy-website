'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { mockTests, testSeries, questionBank, getTestsBySubject, getFreeTests } from '@/data/mockTests'
import {
  Play,
  Clock,
  Award,
  Users,
  Star,
  Filter,
  Search,
  TrendingUp,
  Target,
  BookOpen,
  CheckCircle,
  Zap,
  Trophy,
  BarChart3,
  Calendar,
  ArrowRight,
  Download,
  Share2,
  Brain,
  Lightbulb,
  Shield,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ClassSelection } from '@/components/mockTests/ClassSelection'

export default function MockTestsPage() {
  const [selectedClass, setSelectedClass] = useState<'class-11' | 'class-12' | 'dropper' | null>(null)
  const [showClassSelection, setShowClassSelection] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const freeTests = getFreeTests()
  const popularTests = mockTests.slice(0, 3)

  const subjects = [
    { id: 'all', name: 'All Subjects', count: mockTests.length },
    { id: 'biology', name: 'General Biology', count: getTestsBySubject('biology').length },
    { id: 'botany', name: 'Botany', count: getTestsBySubject('botany').length },
    { id: 'zoology', name: 'Zoology', count: getTestsBySubject('zoology').length },
  ]

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'easy', name: 'Beginner' },
    { id: 'medium', name: 'Intermediate' },
    { id: 'hard', name: 'Advanced' },
  ]

  const categories = [
    { id: 'all', name: 'All Types' },
    { id: 'full-test', name: 'Full Tests' },
    { id: 'topic-test', name: 'Topic Tests' },
    { id: 'previous-year', name: 'Previous Year' },
  ]

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Get personalized insights and recommendations based on your performance',
      color: 'bg-purple-500',
    },
    {
      icon: Trophy,
      title: 'Real-time Rankings',
      description: 'Compare your performance with thousands of NEET aspirants nationwide',
      color: 'bg-yellow-500',
    },
    {
      icon: Target,
      title: 'Adaptive Learning',
      description: 'Tests adapt to your knowledge level for optimal learning experience',
      color: 'bg-blue-500',
    },
    {
      icon: Shield,
      title: 'Exam Simulation',
      description: 'Authentic NEET exam environment with time pressure and format',
      color: 'bg-green-500',
    },
  ]

  const statistics = [
    { number: '50K+', label: 'Students Taking Tests', icon: Users },
    { number: '2500+', label: 'Questions Available', icon: BookOpen },
    { number: '94%', label: 'Score Improvement', icon: TrendingUp },
    { number: '4.8/5', label: 'Student Rating', icon: Star },
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Delhi',
      score: '685/720',
      rank: 'AIR 127',
      comment: 'Mock tests helped me identify weak areas and improve my speed. The detailed analysis was game-changing!',
      image: '/testimonials/priya-sharma.jpg',
    },
    {
      name: 'Rahul Kumar',
      location: 'Mumbai',
      score: '672/720',
      rank: 'AIR 189',
      comment: 'The question quality and explanations are excellent. Helped me crack NEET on my second attempt.',
      image: '/testimonials/rahul-kumar.jpg',
    },
    {
      name: 'Anita Singh',
      location: 'Bangalore',
      score: '658/720',
      rank: 'AIR 234',
      comment: 'Regular practice with these mock tests built my confidence. The ranking system kept me motivated.',
      image: '/testimonials/anita-singh.jpg',
    },
  ]

  const filteredTests = mockTests.filter(test => {
    const matchesClass = !selectedClass || 
      test.targetClass === 'all' || 
      test.targetClass === selectedClass ||
      test.classRequirements.recommendedFor.includes(selectedClass)
    const matchesSubject = selectedSubject === 'all' || test.subject === selectedSubject
    const matchesDifficulty = selectedDifficulty === 'all' || test.difficulty === selectedDifficulty
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory
    const matchesSearch = searchTerm === '' || 
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesClass && matchesSubject && matchesDifficulty && matchesCategory && matchesSearch
  })

  const handleClassSelect = (classType: 'class-11' | 'class-12' | 'dropper') => {
    setSelectedClass(classType)
    setShowClassSelection(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <motion.h1 
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              NEET Biology Mock Tests
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Practice with India's most comprehensive NEET Biology test platform. 
              2500+ questions, AI-powered analysis, and real-time rankings to boost your NEET score.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => setShowClassSelection(true)}
              >
                <Play className="w-5 h-5 mr-2" />
                {selectedClass ? 'Take Personalized Test' : 'Get Started - Choose Your Class'}
              </Button>
              <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Award className="w-5 h-5 mr-2" />
                View Rankings
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="grid md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {statistics.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-1">{stat.number}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Class Selection Modal */}
      {showClassSelection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Choose Your Class</h3>
              <button
                onClick={() => setShowClassSelection(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ClassSelection 
              onClassSelect={handleClassSelect}
              selectedClass={selectedClass}
            />
          </div>
        </div>
      )}

      {/* Class Indicator */}
      {selectedClass && (
        <section className="bg-blue-50 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold mr-4">
                  {selectedClass === 'class-11' ? 'Class 11 Foundation' :
                   selectedClass === 'class-12' ? 'Class 12 Intensive' : 'Dropper Batch'}
                </div>
                <p className="text-gray-700">
                  Tests are now personalized for your class level
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowClassSelection(true)}
              >
                Change Class
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Mock Tests?</h2>
            <p className="text-xl text-gray-600">Advanced features designed for NEET success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tests Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Start with Free Tests</h2>
            <p className="text-xl text-gray-600">No registration required - jump right in!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {freeTests.map((test, index) => (
              <motion.div
                key={test.id}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    FREE
                  </span>
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{test.duration} min</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{test.title}</h3>
                <p className="text-gray-600 mb-6">{test.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-semibold">{test.totalQuestions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Score:</span>
                    <span className="font-semibold">{test.averageScore}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Attempts:</span>
                    <span className="font-semibold">{test.attemptCount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {test.topics.slice(0, 2).map((topic, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {topic}
                    </span>
                  ))}
                </div>

                <Link href={`/mock-tests/${test.subject}/${test.slug}`}>
                  <Button variant="primary" className="w-full">
                    <Play className="w-5 h-5 mr-2" />
                    Start Test
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Filters & List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore All Tests</h2>
            <p className="text-xl text-gray-600">Find the perfect test for your preparation level</p>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-3xl p-8 mb-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tests, topics, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Subject Filter */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Subject</h4>
                <div className="space-y-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.id)}
                      className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${
                        selectedSubject === subject.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {subject.name} ({subject.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Difficulty</h4>
                <div className="space-y-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty.id}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                      className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${
                        selectedDifficulty === difficulty.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {difficulty.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Test Type</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredTests.length} of {mockTests.length} tests
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTests.map((test, index) => (
              <motion.div
                key={test.id}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="flex items-center justify-between mb-4">
                  {test.isPremium ? (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                      PREMIUM
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      FREE
                    </span>
                  )}
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{test.duration} min</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{test.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{test.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-semibold">{test.totalQuestions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className={`font-semibold capitalize ${
                      test.difficulty === 'easy' ? 'text-green-600' :
                      test.difficulty === 'medium' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {test.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Attempts:</span>
                    <span className="font-semibold">{test.attemptCount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-6">
                  {test.topics.slice(0, 2).map((topic, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {topic}
                    </span>
                  ))}
                  {test.topics.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      +{test.topics.length - 2} more
                    </span>
                  )}
                </div>

                <Link href={`/mock-tests/${test.subject}/${test.slug}`}>
                  <Button variant="primary" className="w-full">
                    <Play className="w-5 h-5 mr-2" />
                    {test.isPremium ? 'Start Premium Test' : 'Start Free Test'}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Students who cracked NEET with our mock tests</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{testimonial.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{testimonial.location}</p>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {testimonial.score} • {testimonial.rank}
                </div>
                
                <blockquote className="text-gray-700 italic">
                  "{testimonial.comment}"
                </blockquote>
                
                <div className="flex justify-center mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Boost Your NEET Score?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join 50,000+ students who improved their NEET Biology scores with our 
            comprehensive mock test platform and AI-powered analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-green-600">
              <Play className="w-5 h-5 mr-2" />
              Take Free Test
            </Button>
            <Link href="/contact">
              <Button variant="primary" size="xl" className="bg-white text-green-600 hover:bg-gray-100">
                Get Premium Access
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">2500+</div>
              <div className="text-green-100">Questions</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-green-100">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">94%</div>
              <div className="text-green-100">Score Improvement</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Free</div>
              <div className="text-green-100">Trial Tests</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export const metadata = {
  title: 'Free NEET Biology Mock Tests | Practice Tests with AI Analysis | Cerebrum Academy',
  description: 'Take free NEET Biology mock tests with 2500+ questions. AI-powered analysis, real-time rankings, detailed solutions. Improve your NEET 2024 score by 94%.',
  keywords: [
    'NEET biology mock test',
    'free NEET practice test',
    'biology test series online',
    'NEET mock test 2024',
    'biology practice questions',
    'NEET test analysis',
    'online biology exam',
    'NEET preparation test',
    'biology mock test free',
    'NEET biology questions'
  ],
  openGraph: {
    title: 'Free NEET Biology Mock Tests | Cerebrum Academy',
    description: 'Practice with 2500+ NEET Biology questions. AI analysis, rankings, detailed solutions. Join 50K+ students.',
    images: ['/og-images/mock-tests.jpg'],
    url: '/mock-tests',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Mock Tests | Cerebrum Academy',
    description: 'Practice with 2500+ NEET Biology questions. AI analysis, rankings, detailed solutions.',
    images: ['/og-images/mock-tests.jpg'],
  },
  alternates: {
    canonical: '/mock-tests',
  },
}