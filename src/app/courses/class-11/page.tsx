'use client'

import Link from 'next/link'
import { CheckCircle, Clock, Users, Award, BookOpen, Target, Star, ArrowRight } from 'lucide-react'
import { PricingDisplay } from '@/components/ui/PricingDisplay'
import { Breadcrumbs, BreadcrumbContainer } from '@/components/ui/Breadcrumbs'

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
      {/* Breadcrumbs */}
      <BreadcrumbContainer className="pt-4">
        <Breadcrumbs />
      </BreadcrumbContainer>

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
                  href="/purchase/class-11"
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center shadow-lg"
                >
                  Buy Now - Start Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/admissions"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center"
                >
                  Talk to Counselor
                </Link>
                <Link
                  href="/contact"
                  className="border border-white/50 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center"
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

      {/* Pricing & Enrollment - MOBILE OPTIMIZED */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Start Your NEET Journey Today
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8">
            {/* Mobile-First Pricing Display - Always Visible */}
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Class 11th Biology Complete Course
              </h3>

              {/* Prominent Pricing - No Hidden Collapsibles */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 my-6 border-2 border-green-200">
                <div className="text-sm text-gray-600 mb-2">Complete Course Price</div>
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">₹75,000</div>
                <div className="text-sm text-gray-600 mb-4">
                  Or pay in EMI: ₹3,500/month • Zero cost EMI available
                </div>

                {/* Quick Value Props */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    <span>12 months program</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    <span>Live + recorded</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    <span>Study materials</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    <span>Doubt sessions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-Optimized CTA Buttons */}
            <div className="space-y-3">
              <Link
                href="/admissions"
                className="block w-full bg-green-600 text-white text-center px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors min-h-[56px] flex items-center justify-center touch-target-large"
              >
                Enroll Now - Start Learning
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="block w-full border-2 border-green-600 text-green-600 text-center px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors min-h-[56px] flex items-center justify-center touch-target-large"
              >
                Book Free Demo Class
              </Link>
            </div>

            {/* Comparison with Competitors - Always Visible */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-600 mr-2" />
                Compare with Competition
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="text-center">
                  <div className="font-bold text-green-600">Cerebrum</div>
                  <div className="text-gray-600">₹3,500/month</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-700">Allen Digital</div>
                  <div className="text-gray-500">₹5,000/month</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-700">BYJU'S</div>
                  <div className="text-gray-500">₹7,000/month</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-center text-sm md:text-base">
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
