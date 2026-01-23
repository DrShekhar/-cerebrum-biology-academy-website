'use client'

import Link from 'next/link'
import {
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  Star,
  ArrowRight,
  Trophy,
  Brain,
  Lightbulb,
  Microscope,
} from 'lucide-react'
import { PricingDisplay } from '@/components/ui/PricingDisplay'

export default function Class9FoundationPage() {
  const courseFeatures = [
    'Fun and interactive Biology learning',
    'NCERT-based conceptual foundation',
    'Age-appropriate teaching methods',
    'Visual learning with models and charts',
    'Basic scientific terminology introduction',
    'Hands-on activities and experiments',
    'Regular assessments with feedback',
    'Study skills development for teenagers',
  ]

  const curriculum = [
    {
      title: 'Unit 1: The Fundamental Unit of Life',
      topics: ['Cell - Basic Unit of Life', 'Cell Structure', 'Cell Division', 'Cell Functions'],
      duration: '6 weeks',
      focus: 'Foundation Building',
    },
    {
      title: 'Unit 2: Tissues, Organs, Organ System',
      topics: ['Plant Tissues', 'Animal Tissues', 'Tissue Organization', 'Organ Systems'],
      duration: '6 weeks',
      focus: 'Structural Biology',
    },
    {
      title: 'Unit 3: Diversity in Living Organisms',
      topics: ['Classification', 'Five Kingdom System', 'Plant Kingdom', 'Animal Kingdom'],
      duration: '8 weeks',
      focus: 'Biodiversity',
    },
    {
      title: 'Unit 4: Life Processes',
      topics: ['Life Processes Overview', 'Nutrition', 'Transportation', 'Respiration'],
      duration: '8 weeks',
      focus: 'Physiology Basics',
    },
  ]

  const successStats = [
    { number: '95%', label: 'Board Exam Success', description: 'Students scoring 85+ marks' },
    { number: '90%', label: 'Concept Clarity', description: 'Strong foundation achieved' },
    { number: '85%', label: 'Class 10 Transition', description: 'Smooth progression rate' },
    { number: '600+', label: 'Students Taught', description: 'Class 9 Biology' },
  ]

  const uniqueFeatures = [
    {
      icon: Brain,
      title: 'Age-Appropriate Learning',
      description:
        'Teaching methods specifically designed for 13-14 year old minds with interactive sessions',
    },
    {
      icon: Microscope,
      title: 'Practical Learning',
      description: 'Hands-on experiments and microscope sessions to make Biology come alive',
    },
    {
      icon: Lightbulb,
      title: 'Concept Visualization',
      description:
        'Visual learning with 3D models, charts, and animations for better understanding',
    },
    {
      icon: Trophy,
      title: 'Strong Foundation',
      description: 'Building blocks for future NEET preparation with conceptual clarity',
    },
  ]

  const learningApproach = [
    {
      method: 'Story-Based Learning',
      description: 'Complex biological processes explained through engaging stories and analogies',
      icon: '📚',
    },
    {
      method: 'Visual Demonstrations',
      description: 'Interactive models, charts, and real-life examples to understand concepts',
      icon: '🔬',
    },
    {
      method: 'Hands-On Activities',
      description: 'Simple experiments and activities to experience Biology practically',
      icon: '🧪',
    },
    {
      method: 'Interactive Discussions',
      description: 'Group discussions and Q&A sessions to develop scientific thinking',
      icon: '💭',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Class 9th Biology Foundation
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8">
                Start your Biology journey with fun and interactive learning. Build strong
                conceptual foundation that makes Class 10th and future NEET preparation easier.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/admissions"
                  className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center min-h-[44px]"
                >
                  Join Class 9 Foundation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto border border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center min-h-[44px]"
                >
                  Book Free Demo
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Class 9 Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-300" />
                  <span>1 Year Foundation Program</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 mr-3 text-blue-300" />
                  <span>Small Batch (Max 15 students)</span>
                </div>
                <div className="flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-blue-300" />
                  <span>Age 13-14 Focused Teaching</span>
                </div>
                <div className="flex items-center">
                  <Microscope className="w-6 h-6 mr-3 text-blue-300" />
                  <span>Practical Learning Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Class 9 Success Record
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Building strong Biology foundations for teenage students
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {successStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Approach */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Class 9 Teaching Approach
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Specially designed learning methods that make Biology fun and engaging for teenagers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {learningApproach.map((approach, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{approach.icon}</div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                  {approach.method}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">{approach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Class 9 Foundation?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Early start advantage with age-appropriate learning that builds lifelong interest in
              Biology
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {uniqueFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Class 9 Biology Curriculum
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              NCERT-based syllabus with enhanced conceptual understanding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {curriculum.map((unit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border-l-4 border-blue-600"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                    {unit.title}
                  </h3>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium block mb-1">
                      {unit.duration}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                      {unit.focus}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {unit.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center">
                      <BookOpen className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Class 9 Foundation Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Enrollment */}
      <section className="py-8 sm:py-12 md:py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Start Your Biology Journey
          </h2>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Class 9th Biology Foundation
                </h3>
                <div className="text-left space-y-2 sm:space-y-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">1 year foundation program</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">
                      Age-appropriate teaching (13-14 years)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Interactive and practical learning</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Strong foundation for Class 10</span>
                  </div>
                </div>
              </div>

              <div>
                <PricingDisplay
                  courseId="class-9-foundation-biology"
                  showCompetitiveAdvantage={true}
                  onEnrollClick={() => (window.location.href = '/admissions')}
                />
              </div>
            </div>
          </div>

          <div className="bg-indigo-100 border border-indigo-300 rounded-xl p-4 sm:p-6">
            <p className="text-sm sm:text-base text-indigo-800 font-semibold mb-2">
              🎯 Class 9 Special Offer
            </p>
            <p className="text-sm sm:text-base text-indigo-700">
              Enroll before 20th March and get FREE science kit + Biology lab manual worth ₹5,000!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-10 md:mb-12">
            Class 9 Foundation FAQ
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Is Class 9 too early to start Biology specialization?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Not at all! Class 9 is the perfect time to build strong Biology concepts. Our
                foundation course focuses on conceptual clarity and developing scientific interest,
                not intensive competition preparation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                How does this help with regular school studies?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Our foundation course enhances school Biology learning. Students typically show
                significant improvement in school tests and develop better understanding of
                scientific concepts.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                What teaching methods are used for Class 9 students?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                We use age-appropriate methods including story-based learning, visual
                demonstrations, hands-on activities, and interactive discussions to make Biology
                engaging for teenagers.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Are there any practical sessions included?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Yes! We include microscope sessions, simple experiments, model demonstrations, and
                hands-on activities to make Biology concepts clear and memorable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
