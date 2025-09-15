import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Clock, Users, Award, BookOpen, Target, Star, ArrowRight, Trophy, Brain, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Foundation Course Classes 9-10 | Early NEET Preparation | Cerebrum Biology Academy',
  description: 'Start NEET preparation early with our Foundation course for Classes 9-10. Build strong Biology concepts, NCERT mastery, early medical entrance awareness.',
  keywords: 'Foundation course, Class 9 Biology, Class 10 Biology, early NEET preparation, NCERT foundation, medical entrance awareness',
}

export default function FoundationCoursePage() {
  const courseFeatures = [
    'NCERT-based conceptual learning',
    'Introduction to NEET-style questions',
    'Fun and interactive Biology sessions',
    'Regular assessments and feedback',
    'Study skills and learning techniques',
    'Medical career guidance and awareness',
    'Strong foundation for future NEET prep',
    'Age-appropriate teaching methodology'
  ]

  const curriculum = [
    {
      title: 'Class 9 Biology Focus',
      topics: ['Life Processes', 'Control & Coordination', 'Heredity & Evolution', 'Environment & Natural Resources'],
      duration: '6 months',
      focus: 'Conceptual Building'
    },
    {
      title: 'Class 10 Biology Focus', 
      topics: ['Life Processes Advanced', 'Reproduction', 'Heredity Basics', 'Environment Management'],
      duration: '6 months',
      focus: 'NEET Foundation'
    },
    {
      title: 'Medical Awareness Program',
      topics: ['Career in Medicine', 'NEET Introduction', 'Study Planning', 'Goal Setting'],
      duration: 'Throughout',
      focus: 'Career Guidance'
    },
    {
      title: 'Skill Development',
      topics: ['Scientific Thinking', 'Problem Solving', 'Memory Techniques', 'Time Management'],
      duration: 'Continuous',
      focus: 'Life Skills'
    }
  ]

  const successStats = [
    { number: '92%', label: 'Board Exam Success', description: 'Students scoring 85+ marks' },
    { number: '88%', label: 'Concept Clarity', description: 'Strong foundation building' },
    { number: '78%', label: 'NEET Transition', description: 'Students joining NEET prep' },
    { number: '1200+', label: 'Students Coached', description: 'Foundation program' }
  ]

  const uniqueFeatures = [
    {
      icon: Brain,
      title: 'Age-Appropriate Learning',
      description: 'Teaching methodology designed specifically for young minds (ages 13-16)'
    },
    {
      icon: Lightbulb,
      title: 'Concept Visualization',
      description: 'Interactive models, animations, and practical demonstrations for better understanding'
    },
    {
      icon: Target,
      title: 'Early Goal Setting',
      description: 'Introduction to medical career paths and NEET awareness from early age'
    },
    {
      icon: Trophy,
      title: 'Foundation Excellence',
      description: 'Strong base preparation that makes future NEET coaching highly effective'
    }
  ]

  const ageGroups = [
    {
      age: '13-14 Years',
      class: 'Class 9',
      focus: 'Basic Biology concepts with fun learning',
      features: ['Story-based learning', 'Visual demonstrations', 'Basic terminology', 'Board exam focus']
    },
    {
      age: '15-16 Years', 
      class: 'Class 10',
      focus: 'Advanced concepts with NEET introduction',
      features: ['Advanced problem solving', 'NEET-style questions', 'Medical career awareness', 'Study techniques']
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Foundation Course (Classes 9-10)
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Build a strong foundation for your medical dreams. Early start advantage with 
                comprehensive Biology concepts and introduction to medical entrance preparation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/admissions"
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center"
                >
                  Join Foundation Program
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link 
                  href="/contact"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  Book Free Demo
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Foundation Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-green-300" />
                  <span>2 Year Foundation Program</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 mr-3 text-green-300" />
                  <span>Small Batch Size (Max 15)</span>
                </div>
                <div className="flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-green-300" />
                  <span>Age-Appropriate Teaching</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-6 h-6 mr-3 text-green-300" />
                  <span>Early NEET Awareness</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Foundation Program Success</h2>
            <p className="text-gray-600">Building strong Biology foundations that last a lifetime</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Group Focus */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Age-Specific Learning Approach</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Customized curriculum and teaching methods for different age groups and learning capabilities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {ageGroups.map((group, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-green-600">
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{group.class}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {group.age}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium mb-4">{group.focus}</p>
                </div>
                <div className="space-y-3">
                  {group.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Start Early With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Early foundation building gives students a significant advantage in their medical entrance journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {uniqueFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                  <Icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Foundation Curriculum</h2>
            <p className="text-gray-600">Step-by-step progression from basic concepts to NEET awareness</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {curriculum.map((unit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{unit.title}</h3>
                  <div className="text-right">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium block mb-1">
                      {unit.duration}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {unit.focus}
                    </span>
                  </div>
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

      {/* Course Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Foundation Course Features</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Enrollment */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Start Your Medical Journey Early</h2>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Foundation Course (Class 9-10)</h3>
                <div className="text-left space-y-3">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>2 years comprehensive foundation</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Age-appropriate teaching methods</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Early NEET awareness program</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Strong conceptual foundation</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-green-600 mb-4">₹24,999</div>
                <p className="text-gray-600 mb-6">Complete 2-year foundation program</p>
                <div className="space-y-3">
                  <Link 
                    href="/admissions"
                    className="block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Join Foundation Program
                  </Link>
                  <Link 
                    href="/contact"
                    className="block border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                  >
                    Book Free Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-100 border border-blue-300 rounded-xl p-6">
            <p className="text-blue-800 font-semibold mb-2">🌟 Early Bird Special</p>
            <p className="text-blue-700">
              Enroll before 15th March and get FREE study materials + personalized learning assessment worth ₹8,000!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Foundation Course FAQ</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is Class 9-10 too early to start NEET preparation?
              </h3>
              <p className="text-gray-600">
                Not at all! Foundation courses focus on building strong concepts rather than intensive preparation. 
                Early exposure to Biology concepts gives students a significant advantage when they start formal NEET coaching.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How is this different from regular school Biology?
              </h3>
              <p className="text-gray-600">
                Our foundation course goes deeper into concepts with visual learning, practical demonstrations, 
                and introduces medical terminology early. We also provide study skills and time management techniques.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Will this program help in board exams too?
              </h3>
              <p className="text-gray-600">
                Absolutely! Our foundation course ensures excellent board exam performance while building 
                concepts for future medical entrance preparation. Students typically score 85+ in board Biology.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What is the class schedule for foundation students?
              </h3>
              <p className="text-gray-600">
                Foundation classes are scheduled after school hours, typically 3-4 hours per week with 
                weekend doubt sessions. We ensure it doesn't interfere with regular school commitments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}