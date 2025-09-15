import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Clock, Users, Award, BookOpen, Target, Star, ArrowRight, Trophy, Brain, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CBSE Biology Coaching | Class 11-12 NCERT | NEET Preparation | Cerebrum Biology Academy',
  description: 'Expert CBSE Biology coaching for Classes 11-12. NCERT-focused teaching, board exam excellence, and integrated NEET preparation. Score 90+ marks!',
  keywords: 'CBSE Biology coaching, NCERT Biology, CBSE board exam, Class 11 Biology, Class 12 Biology, NEET preparation',
}

export default function CBSEBiologyPage() {
  const curriculum = [
    {
      class: 'Class XI',
      duration: '1 Year',
      units: [
        {
          name: 'Unit 1: Diversity of Living World',
          chapters: ['The Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom'],
          marks: '7 marks'
        },
        {
          name: 'Unit 2: Structural Organisation',
          chapters: ['Morphology of Flowering Plants', 'Anatomy of Flowering Plants', 'Structural Organisation in Animals'],
          marks: '12 marks'
        },
        {
          name: 'Unit 3: Cell Structure & Function',
          chapters: ['Cell: The Unit of Life', 'Biomolecules', 'Cell Cycle and Cell Division'],
          marks: '15 marks'
        },
        {
          name: 'Unit 4: Plant Physiology',
          chapters: ['Transport in Plants', 'Mineral Nutrition', 'Photosynthesis', 'Respiration in Plants', 'Plant Growth and Development'],
          marks: '18 marks'
        },
        {
          name: 'Unit 5: Human Physiology',
          chapters: ['Digestion and Absorption', 'Breathing and Exchange of Gases', 'Body Fluids and Circulation', 'Excretory Products', 'Locomotion and Movement', 'Neural Control', 'Chemical Coordination'],
          marks: '18 marks'
        }
      ]
    },
    {
      class: 'Class XII',
      duration: '1 Year',
      units: [
        {
          name: 'Unit 1: Reproduction',
          chapters: ['Reproduction in Organisms', 'Sexual Reproduction in Plants', 'Human Reproduction', 'Reproductive Health'],
          marks: '14 marks'
        },
        {
          name: 'Unit 2: Genetics & Evolution',
          chapters: ['Heredity and Variation', 'Molecular Basis of Inheritance', 'Evolution'],
          marks: '18 marks'
        },
        {
          name: 'Unit 3: Biology & Human Welfare',
          chapters: ['Health and Disease', 'Microbes in Human Welfare', 'Biotechnology and its Applications'],
          marks: '14 marks'
        },
        {
          name: 'Unit 4: Biotechnology & Ecology',
          chapters: ['Biotechnology Principles', 'Ecosystem', 'Biodiversity and Conservation', 'Environmental Issues'],
          marks: '10 marks'
        }
      ]
    }
  ]

  const features = [
    'NCERT textbook-based comprehensive teaching',
    'Complete syllabus coverage with CBSE guidelines',
    'Previous 10 years CBSE question papers practice',
    'NEET preparation integrated with board syllabus',
    'Regular CBSE pattern mock tests and assessments',
    'Chapter-wise notes and study materials',
    'Practical exam preparation and viva support',
    'Board exam strategy and time management'
  ]

  const successStats = [
    { number: '96%', label: 'Students Score 90+', description: 'In CBSE Biology exam' },
    { number: '2000+', label: 'CBSE Students', description: 'Successfully coached' },
    { number: '89.2', label: 'Average Score', description: 'CBSE Biology marks' },
    { number: '94%', label: 'NEET Qualification', description: 'From CBSE students' }
  ]

  const teachingApproach = [
    {
      icon: BookOpen,
      title: 'NCERT Mastery',
      description: 'Line-by-line NCERT coverage with additional conceptual depth for complete understanding'
    },
    {
      icon: Target,
      title: 'Board Pattern Focus',
      description: 'Teaching methodology aligned with CBSE exam pattern and marking scheme requirements'
    },
    {
      icon: Brain,
      title: 'Concept Building',
      description: 'Strong foundation building with logical progression from basic to advanced concepts'
    },
    {
      icon: Trophy,
      title: 'NEET Integration',
      description: 'Seamless integration of NEET-level questions with board exam preparation'
    }
  ]

  const examStrategy = [
    {
      aspect: 'Time Management',
      strategy: '3 hours optimal distribution: 30 min for Very Short (1 mark), 45 min for Short (2 marks), 60 min for Short Answer (3 marks), 45 min for Long Answer (5 marks)',
      tips: ['Read all questions first', 'Start with confident topics', 'Keep 15 minutes for revision']
    },
    {
      aspect: 'Answer Writing',
      strategy: 'CBSE expects specific terminology, diagrams, and structured answers with proper scientific language',
      tips: ['Use NCERT terminology', 'Draw labeled diagrams', 'Write in points for clarity']
    },
    {
      aspect: 'Chapter Weightage',
      strategy: 'Focus on high-weightage chapters: Human Physiology (18), Plant Physiology (18), Genetics (18), Reproduction (14)',
      tips: ['Master diagram-based questions', 'Practice previous year papers', 'Focus on NCERT examples']
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                CBSE Biology Excellence
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Master CBSE Biology with NCERT-focused teaching methodology. Expert coaching for 
                Classes 11-12 with integrated NEET preparation and guaranteed 90+ board scores.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/admissions"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center"
                >
                  Enroll for CBSE
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link 
                  href="/contact"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Book Demo Class
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">CBSE Program Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-blue-300" />
                  <span>100% NCERT Coverage</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-6 h-6 mr-3 text-blue-300" />
                  <span>90+ Score Guarantee</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-6 h-6 mr-3 text-blue-300" />
                  <span>NEET Integration</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-300" />
                  <span>2 Year Complete Program</span>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">CBSE Biology Success Record</h2>
            <p className="text-gray-600">Outstanding results in CBSE board examinations and NEET qualification</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Approach */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our CBSE Teaching Approach</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized methodology designed specifically for CBSE curriculum and examination pattern
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachingApproach.map((approach, index) => {
              const Icon = approach.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                  <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{approach.title}</h3>
                  <p className="text-gray-600 text-sm">{approach.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Structure */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete CBSE Curriculum Coverage</h2>
            <p className="text-gray-600">Comprehensive syllabus coverage with CBSE marking scheme alignment</p>
          </div>
          
          <div className="space-y-8">
            {curriculum.map((classData, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{classData.class}</h3>
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                    {classData.duration}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {classData.units.map((unit, unitIndex) => (
                    <div key={unitIndex} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900">{unit.name}</h4>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                          {unit.marks}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {unit.chapters.map((chapter, chapterIndex) => (
                          <div key={chapterIndex} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{chapter}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Strategy */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">CBSE Exam Strategy & Tips</h2>
            <p className="text-gray-600">Proven strategies for maximum marks in CBSE Biology examination</p>
          </div>
          
          <div className="space-y-6">
            {examStrategy.map((strategy, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{strategy.aspect}</h3>
                <p className="text-gray-700 mb-4">{strategy.strategy}</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {strategy.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center">
                        <Lightbulb className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm text-blue-800 font-medium">{tip}</span>
                      </div>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">CBSE Course Features</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <CheckCircle className="w-8 h-8 text-blue-600 mb-4" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Enrollment */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Excel in CBSE Biology Today</h2>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">CBSE Biology Complete Course</h3>
                <div className="text-left space-y-3">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>2 years complete CBSE program</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>NCERT mastery + NEET preparation</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>90+ board score guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Previous year papers + mock tests</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-4">₹29,999</div>
                <p className="text-gray-600 mb-6">Complete 2-year CBSE program</p>
                <div className="space-y-3">
                  <Link 
                    href="/admissions"
                    className="block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Enroll for CBSE
                  </Link>
                  <Link 
                    href="/contact"
                    className="block border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Book Free Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-6">
            <p className="text-yellow-800 font-semibold mb-2">🎯 CBSE Special Offer</p>
            <p className="text-yellow-700">
              Enroll before board registrations and get FREE NCERT solutions book + previous 10 years CBSE papers worth ₹5,000!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}