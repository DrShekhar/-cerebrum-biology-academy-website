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
  Brain,
  Microscope,
} from 'lucide-react'

export const metadata: Metadata = {
  title:
    'ICSE Biology Coaching | Detailed Curriculum | Medical Entrance | Cerebrum Biology Academy',
  description:
    'Expert ICSE Biology coaching with comprehensive curriculum coverage. In-depth conceptual learning, practical focus, and medical entrance preparation.',
  keywords:
    'ICSE Biology coaching, ICSE board exam, detailed Biology curriculum, medical entrance, practical Biology',
}

export default function ICSEBiologyPage() {
  const curriculum = [
    {
      class: 'Class IX',
      duration: '1 Year',
      topics: [
        'The Fundamental Unit of Life: Cell',
        'Tissues, Organs, Organ System, Organism',
        'Diversity in Living Organisms - Plant and Animal Kingdom',
        'Life Processes: Nutrition, Transportation, Respiration, Excretion',
        'Control and Coordination in Plants and Animals',
        'Reproduction in Plants and Animals',
        'Health and Hygiene',
        'Pollution and its Control',
      ],
    },
    {
      class: 'Class X',
      duration: '1 Year',
      topics: [
        'Photosynthesis and Respiration',
        'Nutrition and Health',
        'Circulatory System',
        'Excretory System',
        'Nervous System and Sense Organs',
        'Reproductive System',
        'Population Education',
        'Heredity and Evolution',
        'Pollution Control',
        'AIDS and Drug Abuse',
      ],
    },
  ]

  const practicalComponents = [
    {
      title: 'Laboratory Work',
      weight: '20 marks',
      activities: [
        'Microscopic observations and drawings',
        'Experiments on photosynthesis and respiration',
        'Study of plant and animal tissues',
        'Preparation of temporary mounts',
        'Study of specimens and models',
      ],
    },
    {
      title: 'Project Work',
      weight: '20 marks',
      activities: [
        'Individual research projects on current topics',
        'Field studies and surveys',
        'Environmental studies',
        'Health and hygiene projects',
        'Presentation and viva voce',
      ],
    },
  ]

  const features = [
    'Comprehensive ICSE syllabus coverage with detailed explanations',
    'Strong emphasis on practical work and laboratory skills',
    'In-depth conceptual learning beyond textbook level',
    'Regular internal assessments and project guidance',
    'Preparation for medical entrance exams alongside board exam',
    'Expert faculty with ICSE examination experience',
    'Complete practical exam preparation with specimens',
    'Individual attention with small batch sizes',
  ]

  const successStats = [
    { number: '94%', label: 'Students Score 85+', description: 'In ICSE Biology exam' },
    { number: '800+', label: 'ICSE Students', description: 'Successfully coached' },
    { number: '87.5', label: 'Average Score', description: 'ICSE Biology marks' },
    { number: '89%', label: 'Medical Entrance', description: 'Qualification rate' },
  ]

  const icseAdvantages = [
    {
      icon: Microscope,
      title: 'Detailed Curriculum',
      description:
        'ICSE provides comprehensive Biology coverage with greater depth than other boards',
    },
    {
      icon: Brain,
      title: 'Conceptual Clarity',
      description:
        'Strong foundation building with emphasis on understanding rather than memorization',
    },
    {
      icon: Target,
      title: 'Medical Entrance Edge',
      description: 'ICSE curriculum aligns well with medical entrance exam requirements and depth',
    },
    {
      icon: Trophy,
      title: 'International Recognition',
      description: 'ICSE qualification is recognized globally for higher education admissions',
    },
  ]

  const examPattern = {
    theory: {
      duration: '2 Hours',
      marks: '80 marks',
      sections: [
        {
          type: 'Section A',
          description: 'Short Answer Questions (40 marks)',
          questions: '8 out of 10',
        },
        {
          type: 'Section B',
          description: 'Structured/Application Questions (40 marks)',
          questions: '6 out of 8',
        },
      ],
    },
    practical: {
      duration: '2 Hours',
      marks: '40 marks',
      components: [
        {
          type: 'Practical Work',
          marks: '20 marks',
          description: 'Laboratory experiments and observations',
        },
        {
          type: 'Project Work',
          marks: '20 marks',
          description: 'Individual research project and viva',
        },
      ],
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                ICSE Biology Excellence
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8">
                Master ICSE Biology with our comprehensive approach. Detailed curriculum coverage,
                practical focus, and strong conceptual foundation for medical entrance success.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/admissions"
                  className="bg-white text-green-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center min-h-[44px] w-full sm:w-auto"
                >
                  Enroll for ICSE
                  <ArrowRight className="w-5 h-5 ml-2 flex-shrink-0" />
                </Link>
                <Link
                  href="/contact"
                  className="border border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center"
                >
                  Book Demo Class
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">ICSE Program Features</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-green-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Detailed Curriculum Coverage</span>
                </div>
                <div className="flex items-center">
                  <Microscope className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-green-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Strong Practical Component</span>
                </div>
                <div className="flex items-center">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-green-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Conceptual Depth Learning</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-green-300 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Medical Entrance Preparation</span>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              ICSE Biology Success Record
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Exceptional results in ICSE examinations with strong medical entrance preparation
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {successStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2">
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

      {/* ICSE Advantages */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why ICSE is Ideal for Medical Aspirants
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              ICSE curriculum provides comprehensive Biology education with depth and practical
              focus
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {icseAdvantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-4 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{advantage.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Structure */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Comprehensive ICSE Curriculum
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Complete coverage of ICSE Biology syllabus with practical components
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {curriculum.map((classData, index) => (
              <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{classData.class}</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {classData.duration}
                  </span>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {classData.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Practical Components */}
          <div className="bg-green-50 rounded-xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              Practical Assessment Components
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {practicalComponents.map((component, index) => (
                <div key={index} className="bg-white rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                      {component.title}
                    </h4>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0">
                      {component.weight}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {component.activities.map((activity, activityIndex) => (
                      <div key={activityIndex} className="flex items-start">
                        <Microscope className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exam Pattern */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              ICSE Biology Exam Pattern
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Understanding the examination structure for optimal preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Theory Paper */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                Theory Paper (Paper 1)
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base font-medium">Duration:</span>
                  <span className="text-sm sm:text-base text-green-600 font-semibold">
                    {examPattern.theory.duration}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base font-medium">Total Marks:</span>
                  <span className="text-sm sm:text-base text-green-600 font-semibold">
                    {examPattern.theory.marks}
                  </span>
                </div>
                <div className="space-y-3">
                  {examPattern.theory.sections.map((section, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="font-medium text-gray-900 text-sm sm:text-base">
                        {section.type}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">
                        {section.description}
                      </div>
                      <div className="text-xs sm:text-sm text-green-600 font-medium">
                        Answer: {section.questions}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Practical Paper */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                Practical Assessment (Paper 2)
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base font-medium">Duration:</span>
                  <span className="text-sm sm:text-base text-green-600 font-semibold">
                    {examPattern.practical.duration}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base font-medium">Total Marks:</span>
                  <span className="text-sm sm:text-base text-green-600 font-semibold">
                    {examPattern.practical.marks}
                  </span>
                </div>
                <div className="space-y-3">
                  {examPattern.practical.components.map((component, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          {component.type}
                        </div>
                        <div className="text-sm sm:text-base text-green-600 font-semibold flex-shrink-0">
                          {component.marks}
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">
                        {component.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              ICSE Course Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-3 sm:mb-4 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Enrollment */}
      <section className="py-8 sm:py-12 md:py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Excel in ICSE Biology Today
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  ICSE Biology Complete Course
                </h3>
                <div className="text-left space-y-2 sm:space-y-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Complete ICSE curriculum coverage</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">
                      Practical work and project guidance
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Medical entrance preparation</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">85+ score guarantee</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-3 sm:mb-4">
                  ₹32,999
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Complete 2-year ICSE program
                </p>
                <div className="space-y-3">
                  <Link
                    href="/admissions"
                    className="block bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors min-h-[44px] flex items-center justify-center"
                  >
                    Enroll for ICSE
                  </Link>
                  <Link
                    href="/contact"
                    className="block border border-green-600 text-green-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors min-h-[44px] flex items-center justify-center"
                  >
                    Book Free Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-100 border border-blue-300 rounded-xl p-4 sm:p-6">
            <p className="text-sm sm:text-base text-blue-800 font-semibold mb-2">
              🔬 ICSE Special Offer
            </p>
            <p className="text-sm sm:text-base text-blue-700">
              Enroll now and get FREE laboratory manual + specimen collection for practical exam
              preparation worth ₹4,000!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
