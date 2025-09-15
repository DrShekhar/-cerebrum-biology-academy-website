import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Clock, Users, Award, BookOpen, Target, Star, ArrowRight, Trophy, Globe, Beaker } from 'lucide-react'

export const metadata: Metadata = {
  title: 'IGCSE Biology Coaching | Cambridge Curriculum | International Standards | Cerebrum Biology Academy',
  description: 'Expert IGCSE Biology coaching following Cambridge curriculum. International teaching standards, practical assessments, and global university preparation.',
  keywords: 'IGCSE Biology coaching, Cambridge Biology, international curriculum, IGCSE board exam, global standards',
}

export default function IGCSEBiologyPage() {
  const curriculum = [
    {
      section: 'Characteristics and Classification of Living Organisms',
      topics: ['Characteristics of living organisms', 'Classification and features of organisms'],
      assessment: 'Core: 15%, Extended: 12%'
    },
    {
      section: 'Organisation and Maintenance of the Organism',
      topics: ['Cell structure and organisation', 'Biological molecules', 'Movement into and out of cells', 'Nutrition', 'Respiration', 'Excretion', 'Coordination and response'],
      assessment: 'Core: 45%, Extended: 40%'
    },
    {
      section: 'Development of the Organism and Continuity of Life',
      topics: ['Reproduction', 'Growth and development', 'Inheritance', 'Selection and evolution'],
      assessment: 'Core: 25%, Extended: 28%'
    },
    {
      section: 'Relationships of Organisms with Environment',
      topics: ['Energy flow', 'Cycles within ecosystems', 'Human influences on environment'],
      assessment: 'Core: 15%, Extended: 20%'
    }
  ]

  const examStructure = {
    core: {
      paper1: { type: 'Multiple Choice', duration: '45 minutes', marks: '40 marks', weight: '30%' },
      paper3: { type: 'Theory (Core)', duration: '1hr 15min', marks: '80 marks', weight: '50%' },
      paper5: { type: 'Practical Test', duration: '1hr 15min', marks: '40 marks', weight: '20%' }
    },
    extended: {
      paper2: { type: 'Multiple Choice (Extended)', duration: '45 minutes', marks: '40 marks', weight: '30%' },
      paper4: { type: 'Theory (Extended)', duration: '1hr 15min', marks: '80 marks', weight: '50%' },
      paper6: { type: 'Alternative to Practical', duration: '1 hour', marks: '40 marks', weight: '20%' }
    }
  }

  const features = [
    'Cambridge curriculum-based comprehensive teaching',
    'International teaching methodology and standards',
    'Practical work with scientific inquiry approach',
    'Regular Cambridge past papers practice',
    'A*/A grade achievement focus',
    'Global university preparation guidance',
    'Extended tier preparation for top universities',
    'International examination technique training'
  ]

  const successStats = [
    { number: '92%', label: 'A*/A Grades', description: 'Students achieving top grades' },
    { number: '400+', label: 'IGCSE Students', description: 'Successfully coached' },
    { number: '15+', label: 'Countries', description: 'Students from globally' },
    { number: '88%', label: 'University Admissions', description: 'To top global universities' }
  ]

  const igcseAdvantages = [
    {
      icon: Globe,
      title: 'Global Recognition',
      description: 'IGCSE is recognized by universities worldwide for admissions and credit transfer'
    },
    {
      icon: Beaker,
      title: 'Practical Focus',
      description: 'Strong emphasis on experimental skills and scientific methodology'
    },
    {
      icon: Trophy,
      title: 'University Preparation',
      description: 'Excellent preparation for A-levels, IB, and international university programs'
    },
    {
      icon: Target,
      title: 'Skill Development',
      description: 'Develops critical thinking, analysis, and independent learning skills'
    }
  ]

  const gradingSystem = [
    { grade: 'A*', points: '8-9', description: 'Exceptional performance' },
    { grade: 'A', points: '7', description: 'Excellent performance' },
    { grade: 'B', points: '6', description: 'Good performance' },
    { grade: 'C', points: '5', description: 'Satisfactory performance' },
    { grade: 'D', points: '4', description: 'Moderate performance' },
    { grade: 'E', points: '3', description: 'Basic performance' },
    { grade: 'F', points: '2', description: 'Foundation level' },
    { grade: 'G', points: '1', description: 'Entry level' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                IGCSE Biology Excellence
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Master IGCSE Biology with Cambridge curriculum expertise. International standards, 
                practical focus, and global university preparation with A*/A grade achievement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/admissions"
                  className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center"
                >
                  Enroll for IGCSE
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link 
                  href="/contact"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Book Demo Class
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">IGCSE Program Features</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-purple-300" />
                  <span>Cambridge Curriculum</span>
                </div>
                <div className="flex items-center">
                  <Beaker className="w-6 h-6 mr-3 text-purple-300" />
                  <span>Practical Assessment Focus</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-6 h-6 mr-3 text-purple-300" />
                  <span>A*/A Grade Target</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-6 h-6 mr-3 text-purple-300" />
                  <span>Global University Preparation</span>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">IGCSE Biology Success Record</h2>
            <p className="text-gray-600">Outstanding international results with global university admissions</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Structure */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">IGCSE Biology Curriculum</h2>
            <p className="text-gray-600">Cambridge International curriculum with practical assessment focus</p>
          </div>
          
          <div className="space-y-6">
            {curriculum.map((section, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{section.section}</h3>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {section.assessment}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {section.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Structure */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">IGCSE Examination Structure</h2>
            <p className="text-gray-600">Core and Extended tier options for different ability levels</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Core Tier */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Core Tier (Grades C-G)</h3>
              <div className="space-y-4">
                {Object.entries(examStructure.core).map(([key, paper]) => (
                  <div key={key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-900">{paper.type}</h4>
                      <span className="text-purple-600 font-medium">{paper.weight}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Duration: {paper.duration}</div>
                      <div>Marks: {paper.marks}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extended Tier */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Extended Tier (Grades A*-E)</h3>
              <div className="space-y-4">
                {Object.entries(examStructure.extended).map(([key, paper]) => (
                  <div key={key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-900">{paper.type}</h4>
                      <span className="text-purple-600 font-medium">{paper.weight}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Duration: {paper.duration}</div>
                      <div>Marks: {paper.marks}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grading System */}
          <div className="mt-12 bg-purple-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">IGCSE Grading System</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {gradingSystem.map((grade, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">{grade.grade}</div>
                  <div className="text-sm text-gray-600 mb-1">Points: {grade.points}</div>
                  <div className="text-xs text-gray-500">{grade.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IGCSE Advantages */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose IGCSE Biology?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              International curriculum with global recognition and university preparation focus
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {igcseAdvantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                  <Icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{advantage.title}</h3>
                  <p className="text-gray-600 text-sm">{advantage.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">IGCSE Course Features</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <CheckCircle className="w-8 h-8 text-purple-600 mb-4" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Enrollment */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Excel in IGCSE Biology Today</h2>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">IGCSE Biology Complete Course</h3>
                <div className="text-left space-y-3">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Cambridge curriculum mastery</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Extended tier preparation</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>A*/A grade achievement</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Global university preparation</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-4">₹39,999</div>
                <p className="text-gray-600 mb-6">Complete 2-year IGCSE program</p>
                <div className="space-y-3">
                  <Link 
                    href="/admissions"
                    className="block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Enroll for IGCSE
                  </Link>
                  <Link 
                    href="/contact"
                    className="block border border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                  >
                    Book Free Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-100 border border-orange-300 rounded-xl p-6">
            <p className="text-orange-800 font-semibold mb-2">🌟 IGCSE Special Offer</p>
            <p className="text-orange-700">
              Enroll now and get FREE Cambridge past papers collection + practical skills workshop worth ₹6,000!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}