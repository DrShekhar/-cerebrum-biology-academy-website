'use client'

import Link from 'next/link'
import { CheckCircle, Clock, Users, Award, BookOpen, Target, Star, ArrowRight } from 'lucide-react'
import { PricingDisplay } from '@/components/ui/PricingDisplay'

export default function Class11BiologyPage() {
  const courseFeatures = [
    'Complete NCERT Biology syllabus coverage',
    'NEET foundation concepts building',
    'Board exam preparation (CBSE/ICSE/State)',
    'Live interactive classes with doubt sessions',
    'Weekly tests and performance analysis',
    'Study materials and video lectures',
    'Personal mentorship and guidance',
    'Parent-teacher interaction sessions',
  ]

  const curriculum = [
    {
      title: 'Unit 1: Diversity in Living World',
      topics: ['Classification', 'Taxonomy', 'Plant Kingdom', 'Animal Kingdom'],
      duration: '4 weeks',
    },
    {
      title: 'Unit 2: Structural Organization',
      topics: ['Cell Structure', 'Biomolecules', 'Cell Division', 'Plant Anatomy'],
      duration: '6 weeks',
    },
    {
      title: 'Unit 3: Plant Physiology',
      topics: ['Photosynthesis', 'Respiration', 'Transportation', 'Mineral Nutrition'],
      duration: '8 weeks',
    },
    {
      title: 'Unit 4: Human Physiology',
      topics: ['Digestion', 'Breathing', 'Circulation', 'Excretion', 'Neural Control'],
      duration: '10 weeks',
    },
  ]

  const successStats = [
    { number: '94%', label: 'Board Exam Success', description: 'Students scoring 90+ marks' },
    { number: '88%', label: 'NEET Foundation', description: 'Strong conceptual clarity' },
    { number: '2000+', label: 'Students Taught', description: 'Class 11 Biology' },
    { number: '4.9/5', label: 'Student Rating', description: 'Course satisfaction' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Class 11th Biology Course</h1>
              <p className="text-xl text-green-100 mb-8">
                Build a strong foundation for NEET success while excelling in board exams.
                Comprehensive coverage of NCERT Biology with expert AIIMS faculty guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/admissions"
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center"
                >
                  Enroll Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  Book Demo Class
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Course Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-green-300" />
                  <span>1 Year Comprehensive Program</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 mr-3 text-green-300" />
                  <span>Small Batch Size (Max 25 students)</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-green-300" />
                  <span>Complete NCERT + Board Preparation</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-6 h-6 mr-3 text-green-300" />
                  <span>NEET Foundation Building</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Class 11th Biology Course?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Perfect blend of board exam preparation and NEET foundation building with expert
              faculty guidance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Class 11th Success Record</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Curriculum Coverage</h2>
            <p className="text-gray-600">
              Structured learning path covering all NCERT Biology topics
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {curriculum.map((unit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{unit.title}</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {unit.duration}
                  </span>
                </div>
                <div className="space-y-2">
                  {unit.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center">
                      <BookOpen className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Enrollment */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Start Your NEET Journey Today</h2>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Class 11th Biology Complete Course
                </h3>
                <div className="text-left space-y-3">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>12 months comprehensive program</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Live classes + recorded lectures</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Study materials + test series</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Doubt resolution sessions</span>
                  </div>
                </div>
              </div>

              <div>
                <PricingDisplay
                  courseId="class-11-neet-comprehensive"
                  showCompetitiveAdvantage={true}
                  onEnrollClick={() => (window.location.href = '/admissions')}
                />
              </div>
            </div>
          </div>

          <p className="text-gray-600">
            💡 <strong>Early Bird Offer:</strong> Enroll before 15th of the month and get 10%
            discount!
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is this course suitable for CBSE/ICSE/State board students?
              </h3>
              <p className="text-gray-600">
                Yes, our Class 11th Biology course covers NCERT curriculum which is the foundation
                for all boards. We provide additional support for board-specific requirements.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How does this course help in NEET preparation?
              </h3>
              <p className="text-gray-600">
                We build strong conceptual foundation essential for NEET. Topics are taught with
                NEET perspective while ensuring board exam success. This gives students 2-year
                advantage for NEET preparation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What is the class schedule and batch timings?
              </h3>
              <p className="text-gray-600">
                Classes are held 3 times per week (2 hours each). We offer multiple batch timings:
                Morning (8-10 AM), Evening (5-7 PM), and Weekend batches. Choose as per your
                convenience.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Are study materials provided?
              </h3>
              <p className="text-gray-600">
                Yes, we provide comprehensive study materials including NCERT solutions,
                chapter-wise notes, practice questions, and board exam previous papers. All
                materials are designed by our expert faculty.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
