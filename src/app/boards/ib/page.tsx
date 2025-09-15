import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Clock, Users, Award, BookOpen, Target, Star, ArrowRight, Trophy, Globe, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'IB Biology Coaching | International Baccalaureate | HL & SL | Cerebrum Biology Academy',
  description: 'Expert IB Biology coaching for Higher Level and Standard Level. Research-based learning, critical thinking, and top university preparation.',
  keywords: 'IB Biology coaching, International Baccalaureate Biology, IB HL Biology, IB SL Biology, university preparation',
}

export default function IBBiologyPage() {
  const ibProgram = {
    hl: {
      name: 'Higher Level (HL)',
      duration: '240 teaching hours',
      assessment: '7 points scale',
      topics: [
        'Cell Biology (15 hours)',
        'Molecular Biology (21 hours)', 
        'Genetics (15 hours)',
        'Ecology (12 hours)',
        'Evolution and Biodiversity (12 hours)',
        'Human Physiology (20 hours)',
        'Nucleic Acids (9 hours)',
        'Metabolism, Cell Respiration and Photosynthesis (14 hours)',
        'Plant Biology (13 hours)',
        'Genetics and Evolution (8 hours)',
        'Animal Physiology (16 hours)',
        'Option Topic (15 hours)'
      ]
    },
    sl: {
      name: 'Standard Level (SL)',
      duration: '150 teaching hours',
      assessment: '7 points scale',
      topics: [
        'Cell Biology (15 hours)',
        'Molecular Biology (21 hours)',
        'Genetics (15 hours)', 
        'Ecology (12 hours)',
        'Evolution and Biodiversity (12 hours)',
        'Human Physiology (20 hours)',
        'Option Topic (15 hours)'
      ]
    }
  }

  const assessmentStructure = [
    {
      component: 'External Assessment',
      weight: '80%',
      papers: [
        { name: 'Paper 1', type: 'Multiple Choice', duration: 'HL: 60min, SL: 45min', weight: '20%' },
        { name: 'Paper 2', type: 'Data Analysis & Short Answers', duration: 'HL: 135min, SL: 90min', weight: '40%' },
        { name: 'Paper 3', type: 'Short Answers on Option', duration: 'HL: 75min, SL: 60min', weight: '20%' }
      ]
    },
    {
      component: 'Internal Assessment',
      weight: '20%',
      papers: [
        { name: 'Individual Investigation', type: 'Independent Research', duration: '10 hours', weight: '20%' }
      ]
    }
  ]

  const ibSkills = [
    {
      skill: 'Scientific Inquiry',
      description: 'Design experiments, analyze data, and draw evidence-based conclusions'
    },
    {
      skill: 'Critical Thinking',
      description: 'Evaluate scientific claims and assess reliability of sources'
    },
    {
      skill: 'Research Skills',
      description: 'Conduct independent investigations and literature reviews'
    },
    {
      skill: 'Communication',
      description: 'Present scientific findings clearly and accurately'
    }
  ]

  const features = [
    'Complete IB Biology curriculum for HL and SL',
    'Research-based learning and scientific inquiry',
    'Individual Investigation (IA) guidance and support',
    'Critical thinking and analysis skill development',
    'Option topics: Ecology, Physiology, Genetics, Neurobiology',
    'University-level preparation and academic writing',
    'Past paper practice and exam technique training',
    'Global perspective integration in Biology learning'
  ]

  const successStats = [
    { number: '89%', label: 'Score 6-7 Points', description: 'Students achieving top grades' },
    { number: '200+', label: 'IB Students', description: 'Successfully coached' },
    { number: '94%', label: 'University Admissions', description: 'To world-class universities' },
    { number: '6.3', label: 'Average Score', description: 'IB Biology points' }
  ]

  const universityPrep = [
    {
      icon: Globe,
      title: 'Global Universities',
      description: 'Preparation for top universities worldwide including Ivy League, Oxbridge, and more'
    },
    {
      icon: Lightbulb,
      title: 'Research Skills',
      description: 'Advanced research methodology and independent investigation capabilities'
    },
    {
      icon: Trophy,
      title: 'Academic Excellence',
      description: 'Development of university-level academic skills and scientific thinking'
    },
    {
      icon: Target,
      title: 'Career Preparation',
      description: 'Strong foundation for medical, research, and biotechnology careers'
    }
  ]

  const gradingScale = [
    { grade: '7', description: 'Excellent', percentage: '20-22%' },
    { grade: '6', description: 'Very Good', percentage: '23-28%' },
    { grade: '5', description: 'Good', percentage: '31-38%' },
    { grade: '4', description: 'Satisfactory', percentage: '25-30%' },
    { grade: '3', description: 'Mediocre', percentage: '15-20%' },
    { grade: '2', description: 'Poor', percentage: '8-10%' },
    { grade: '1', description: 'Very Poor', percentage: '3-5%' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                IB Biology Excellence
              </h1>
              <p className="text-xl text-red-100 mb-8">
                Master International Baccalaureate Biology with our expert coaching. Research-based 
                learning, critical thinking development, and preparation for world's top universities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/admissions"
                  className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors inline-flex items-center"
                >
                  Enroll for IB Biology
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link 
                  href="/contact"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
                >
                  Book Demo Class
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">IB Program Features</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-red-300" />
                  <span>Higher Level & Standard Level</span>
                </div>
                <div className="flex items-center">
                  <Lightbulb className="w-6 h-6 mr-3 text-red-300" />
                  <span>Research-Based Learning</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-6 h-6 mr-3 text-red-300" />
                  <span>6-7 Points Target</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-6 h-6 mr-3 text-red-300" />
                  <span>University Preparation</span>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">IB Biology Success Record</h2>
            <p className="text-gray-600">Outstanding results with world-class university admissions</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-red-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">IB Biology Program Structure</h2>
            <p className="text-gray-600">Comprehensive curriculum for Higher Level and Standard Level students</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(ibProgram).map(([level, program]) => (
              <div key={level} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.name}</h3>
                  <div className="flex justify-center space-x-4 text-sm text-gray-600">
                    <span>{program.duration}</span>
                    <span>•</span>
                    <span>{program.assessment}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {program.topics.map((topic, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Structure */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">IB Assessment Structure</h2>
            <p className="text-gray-600">Comprehensive evaluation through external and internal assessments</p>
          </div>
          
          <div className="space-y-8">
            {assessmentStructure.map((component, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{component.component}</h3>
                  <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-medium">
                    {component.weight}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {component.papers.map((paper, paperIndex) => (
                    <div key={paperIndex} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{paper.name}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div><strong>Type:</strong> {paper.type}</div>
                        <div><strong>Duration:</strong> {paper.duration}</div>
                        <div><strong>Weight:</strong> {paper.weight}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Grading Scale */}
          <div className="mt-12 bg-red-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">IB Grading Scale</h3>
            <div className="grid md:grid-cols-7 gap-3">
              {gradingScale.map((grade, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">{grade.grade}</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{grade.description}</div>
                  <div className="text-xs text-gray-600">{grade.percentage}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* University Preparation */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">University Preparation Excellence</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              IB Biology provides exceptional preparation for world's top universities and careers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {universityPrep.map((prep, index) => {
              const Icon = prep.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                  <Icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{prep.title}</h3>
                  <p className="text-gray-600 text-sm">{prep.description}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">IB Biology Course Features</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <CheckCircle className="w-8 h-8 text-red-600 mb-4" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Enrollment */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Excel in IB Biology Today</h2>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">IB Biology Complete Program</h3>
                <div className="text-left space-y-3">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Higher Level & Standard Level options</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Individual Investigation guidance</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>6-7 points achievement focus</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>University application support</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-red-600 mb-4">₹49,999</div>
                <p className="text-gray-600 mb-6">Complete 2-year IB program</p>
                <div className="space-y-3">
                  <Link 
                    href="/admissions"
                    className="block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Enroll for IB Biology
                  </Link>
                  <Link 
                    href="/contact"
                    className="block border border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                  >
                    Book Free Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-100 border border-indigo-300 rounded-xl p-6">
            <p className="text-indigo-800 font-semibold mb-2">🎯 IB Special Package</p>
            <p className="text-indigo-700">
              Enroll now and get FREE university application guidance + research methodology workshop worth ₹8,000!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}