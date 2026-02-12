'use client'

import { useState, useEffect } from 'react'
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
  Download,
  Calculator,
  FileText,
  Brain,
  GraduationCap,
  MessageCircle,
  Sparkles,
  ChevronRight,
  Play,
  Shield,
  TrendingUp,
  Gift,
  AlertCircle,
} from 'lucide-react'
import { Breadcrumbs, BreadcrumbContainer } from '@/components/ui/Breadcrumbs'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { BookFreeDemoCard } from '@/components/courses/BookFreeDemoCard'

export default function Class11BiologyPage() {
  const [activeSection, setActiveSection] = useState('hero')
  const [seatsRemaining, setSeatsRemaining] = useState(12)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

  // Track scroll for sticky nav and floating CTA
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 500)

      const sections = [
        'hero',
        'free-tools',
        'features',
        'curriculum',
        'faculty',
        'testimonials',
        'pricing',
      ]
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const freeTools = [
    {
      icon: BookOpen,
      title: 'MCQ Practice',
      description: 'Chapter-wise MCQs with detailed solutions',
      link: '/neet-biology-mcq',
      badge: 'Popular',
      color: 'bg-[#4a5d4a]',
    },
    {
      icon: FileText,
      title: 'NEET PYQs',
      description: '10 years solved papers with explanations',
      link: '/neet-biology-pyq-chapter-wise',
      badge: 'Free Download',
      color: 'bg-green-600',
    },
    {
      icon: GraduationCap,
      title: 'College Predictor',
      description: 'Find colleges based on your NEET score',
      link: '/neet-college-predictor',
      badge: 'Essential',
      color: 'bg-blue-600',
    },
    {
      icon: Calculator,
      title: 'Rank Predictor',
      description: 'Predict your AIR based on expected score',
      link: '/neet-rank-predictor',
      badge: 'Popular',
      color: 'bg-purple-600',
    },
  ]

  const courseFeatures = [
    {
      icon: BookOpen,
      title: 'Complete NCERT Coverage',
      description: 'Every chapter with NEET-focused explanations',
    },
    {
      icon: Brain,
      title: 'NEET Foundation Building',
      description: 'Start your 2-year NEET preparation journey',
    },
    {
      icon: Users,
      title: 'Small Batch Size',
      description: 'Maximum 25 students for personalized attention',
    },
    {
      icon: Target,
      title: 'Board + NEET Combo',
      description: 'Excel in school exams while preparing for NEET',
    },
    {
      icon: Clock,
      title: 'Flexible Timings',
      description: 'Morning, evening & weekend batches available',
    },
    {
      icon: Shield,
      title: 'Doubt Resolution',
      description: 'Unlimited doubt sessions with faculty',
    },
    {
      icon: Award,
      title: 'Weekly Tests',
      description: 'Regular assessments with detailed analysis',
    },
    {
      icon: GraduationCap,
      title: 'AIIMS Faculty',
      description: 'Learn from doctors who cracked NEET',
    },
  ]

  const curriculum = [
    {
      title: 'Unit 1: Diversity in Living World',
      topics: ['The Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom'],
      neetWeightage: '12%',
      duration: '4 weeks',
    },
    {
      title: 'Unit 2: Structural Organization',
      topics: [
        'Morphology of Flowering Plants',
        'Anatomy of Flowering Plants',
        'Structural Organization in Animals',
      ],
      neetWeightage: '8%',
      duration: '5 weeks',
    },
    {
      title: 'Unit 3: Cell Structure & Function',
      topics: ['Cell: The Unit of Life', 'Biomolecules', 'Cell Cycle and Cell Division'],
      neetWeightage: '15%',
      duration: '6 weeks',
    },
    {
      title: 'Unit 4: Plant Physiology',
      topics: [
        'Transport in Plants',
        'Mineral Nutrition',
        'Photosynthesis',
        'Respiration in Plants',
        'Plant Growth',
      ],
      neetWeightage: '10%',
      duration: '8 weeks',
    },
    {
      title: 'Unit 5: Human Physiology',
      topics: [
        'Digestion & Absorption',
        'Breathing & Exchange of Gases',
        'Body Fluids & Circulation',
        'Excretory Products',
        'Locomotion & Movement',
        'Neural Control',
      ],
      neetWeightage: '18%',
      duration: '10 weeks',
    },
  ]

  const facultyMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      qualification: 'MBBS, AIIMS Delhi',
      experience: '15+ years teaching',
      specialty: 'Human Physiology Expert',
    },
    {
      name: 'Dr. Priya Sharma',
      qualification: 'PhD Botany, DU',
      experience: '15+ years coaching',
      specialty: 'Plant Biology Specialist',
    },
    {
      name: 'Dr. Amit Verma',
      qualification: 'MBBS, MAMC Delhi',
      experience: '15+ years NEET prep',
      specialty: 'Cell Biology & Genetics',
    },
  ]

  const testimonials = [
    {
      name: 'Ananya Singh',
      score: '94% in Class 11',
      college: 'Now at AIIMS Delhi',
      testimonial:
        'The foundation I built in Class 11 at Cerebrum was the reason I cracked NEET in my first attempt.',
      image: null,
    },
    {
      name: 'Rohan Gupta',
      score: '96% Board Exams',
      college: 'NEET AIR 234',
      testimonial:
        'Best decision was joining Cerebrum in Class 11. The teachers make biology so interesting and easy to understand.',
      image: null,
    },
    {
      name: 'Kavya Patel',
      score: '92% Class 11',
      college: 'MBBS at GMC',
      testimonial:
        'The small batch size meant I could ask all my doubts. Dr. Kumar sir is the best biology teacher!',
      image: null,
    },
  ]

  const successStats = [
    { number: '98%', label: 'Board Exam Success', description: 'Students scoring 90+' },
    { number: '88%', label: 'NEET Foundation', description: 'Strong conceptual clarity' },
    { number: '2000+', label: 'Students Taught', description: 'Since 2018' },
    { number: '4.9/5', label: 'Student Rating', description: 'Google Reviews' },
  ]

  const batchInfo = {
    nextBatch: 'March 2026',
    totalSeats: 25,
    filledSeats: 13,
    remainingSeats: 12,
  }

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'free-tools', label: 'Free Tools' },
    { id: 'features', label: 'Features' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'pricing', label: 'Pricing' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Class 11th Biology Course for NEET',
            description:
              'Foundation year NEET Biology course with Board + NEET dual preparation. 12-month intensive program with complete NCERT coverage.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            instructor: {
              '@type': 'Person',
              name: 'Dr. Shekhar C Singh',
              jobTitle: 'Founder & Head Faculty',
              alumniOf: 'AIIMS New Delhi',
            },
            courseCode: 'NEET-11',
            educationalLevel: 'Intermediate',
            teaches: 'NEET Biology - Class 11 Botany and Zoology',
            numberOfCredits: '12 months',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: ['online', 'onsite'],
              courseWorkload: 'PT3H',
              instructor: {
                '@type': 'Person',
                name: 'Dr. Shekhar C Singh',
              },
            },
            offers: {
              '@type': 'Offer',
              category: 'NEET Biology Coaching',
              priceCurrency: 'INR',
              price: '75000',
              availability: 'https://schema.org/InStock',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '485',
              bestRating: '5',
            },
          }),
        }}
      />

      {/* Breadcrumbs */}
      <BreadcrumbContainer className="pt-4">
        <Breadcrumbs />
      </BreadcrumbContainer>

      {/* Hero Section - Cerebrum Brand Colors */}
      <section
        id="hero"
        className="bg-gradient-to-br from-[#3d4d3d] via-[#4a5d4a] to-[#5a6d5a] text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#5a6d5a] rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              {/* Urgency Badge */}
              <div className="inline-flex items-center bg-yellow-400/20 backdrop-blur-sm text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-yellow-400/30">
                <AlertCircle className="w-4 h-4 mr-2" />
                Only {batchInfo.remainingSeats} seats left for March 2026 batch
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Class 11th Biology
                <span className="block text-green-300">NEET Foundation Course</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
                Start your NEET journey in Class 11 with AIIMS-trained faculty. Build an unshakeable
                foundation while excelling in board exams.
              </p>

              {/* Value Props */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">AIIMS Faculty</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Max 25 Students</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Board + NEET</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">₹75,000/year</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/demo-booking"
                  className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-[1.02] group"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={async () => {
                    await trackAndOpenWhatsApp({
                      source: 'class-11-hero',
                      message: WHATSAPP_MESSAGES.courseEnquiry,
                      campaign: 'class-11-course',
                    })
                  }}
                  className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-500 transition-all duration-300 inline-flex items-center justify-center cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>

            {/* Course Highlights Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-yellow-400" />
                Why Start in Class 11?
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#5a6d5a] p-2 rounded-lg mr-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">2-Year Head Start</h4>
                    <p className="text-gray-300 text-sm">More time = better understanding</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-600 p-2 rounded-lg mr-4">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">55% Syllabus in Class 11</h4>
                    <p className="text-gray-300 text-sm">Get half the NEET prep done early</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 p-2 rounded-lg mr-4">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Stress-Free Class 12</h4>
                    <p className="text-gray-300 text-sm">Focus only on new chapters</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-600 p-2 rounded-lg mr-4">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">98% Success Rate</h4>
                    <p className="text-gray-300 text-sm">Our Class 11 starters top NEET</p>
                  </div>
                </div>
              </div>

              {/* Batch Info */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Next Batch: March 2026</span>
                  <span className="text-sm font-semibold text-yellow-400">
                    {batchInfo.remainingSeats} seats left
                  </span>
                </div>
                <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(batchInfo.filledSeats / batchInfo.totalSeats) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Free Demo — Inline Form */}
      <section className="py-8 bg-gradient-to-b from-[#3d4d3d] to-[#4a5d4a]">
        <div className="max-w-md mx-auto px-4">
          <BookFreeDemoCard courseName="Class 11 NEET Biology" source="class-11-hero-form" />
        </div>
      </section>

      {/* Free NEET Tools Section - Lead Magnet */}
      <section
        id="free-tools"
        className="py-12 sm:py-16 bg-gradient-to-b from-green-50 to-white border-b border-green-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center bg-[#e8ede8] text-[#3d4d3d] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Gift className="w-4 h-4 mr-2" />
              100% Free - No Login Required
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Free NEET Tools & Resources
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start your NEET preparation today with our free tools. Used by 50,000+ students.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {freeTools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <Link
                  key={index}
                  href={tool.link}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#4a5d4a] group relative overflow-hidden"
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`${tool.color} text-white text-xs px-2 py-1 rounded-full font-medium`}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  <div
                    className={`${tool.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tool.description}</p>

                  <div className="flex items-center text-[#4a5d4a] font-medium text-sm group-hover:text-[#3d4d3d]">
                    Try Now Free
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>

          {/* More Resources CTA */}
          <div className="text-center mt-10">
            <Link
              href="/free-resources"
              className="inline-flex items-center bg-[#4a5d4a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#3d4d3d] transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Download All Free Resources
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section id="features" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Cerebrum for Class 11?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The perfect blend of board exam preparation and NEET foundation building
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-[#4a5d4a]"
                >
                  <div className="bg-[#e8ede8] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3d4d3d]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-12 sm:py-16 bg-[#3d4d3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Our Class 11 Success Record</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {successStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
              >
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-gray-300">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Complete Class 11 Curriculum
            </h2>
            <p className="text-gray-600">
              Structured learning covering all NCERT chapters with NEET focus
            </p>
          </div>

          <div className="space-y-4">
            {curriculum.map((unit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-[#4a5d4a]"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{unit.title}</h3>
                  <div className="flex items-center gap-3 mt-2 md:mt-0">
                    <span className="bg-[#e8ede8] text-[#3d4d3d] px-3 py-1 rounded-full text-sm font-medium">
                      NEET: {unit.neetWeightage}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {unit.duration}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {unit.topics.map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm flex items-center"
                    >
                      <BookOpen className="w-3 h-3 mr-1 text-[#4a5d4a]" />
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section id="faculty" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Learn from AIIMS-Trained Faculty
            </h2>
            <p className="text-gray-600">
              Our teachers have cracked NEET themselves and know exactly what it takes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {facultyMembers.map((faculty, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100"
              >
                <div className="w-20 h-20 bg-[#e8ede8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-10 h-10 text-[#3d4d3d]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                <p className="text-[#4a5d4a] font-medium text-sm mb-2">{faculty.qualification}</p>
                <p className="text-gray-600 text-sm mb-2">{faculty.experience}</p>
                <span className="inline-block bg-[#e8ede8] text-[#3d4d3d] px-3 py-1 rounded-full text-sm">
                  {faculty.specialty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Students&apos; Success Stories
            </h2>
            <p className="text-gray-600">
              Hear from students who started their NEET journey in Class 11
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#4a5d4a] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-[#4a5d4a] text-sm font-medium">{testimonial.score}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.testimonial}&rdquo;</p>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{testimonial.college}</span>
                </div>
                <div className="flex mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Invest in Your NEET Success
            </h2>
            <p className="text-gray-400">Start your 2-year NEET preparation journey today</p>
          </div>

          <div className="bg-gradient-to-br from-[#4a5d4a] to-[#3d4d3d] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#5a6d5a]/30 rounded-full blur-3xl" />

            <div className="relative">
              <div className="text-center mb-8">
                <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold mb-4">
                  Most Popular
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  Class 11th Biology Complete Course
                </h3>
                <p className="text-gray-300">1-year comprehensive NEET foundation program</p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-center justify-center">
                  <span className="text-gray-400 line-through text-2xl mr-3">₹95,000</span>
                  <span className="text-5xl sm:text-6xl font-bold">₹75,000</span>
                </div>
                <p className="text-gray-300 mt-2">EMI available: ₹6,250/month × 12 months</p>
                <p className="text-yellow-400 text-sm mt-1">Save ₹20,000 - Early Bird Offer!</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  'Complete NCERT Coverage',
                  'AIIMS Faculty Access',
                  'Live + Recorded Classes',
                  'Weekly Tests & Analysis',
                  'Doubt Resolution Sessions',
                  'Study Materials Included',
                  'Board Exam Preparation',
                  'Parent-Teacher Meetings',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/demo-booking"
                  className="flex-1 bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300 text-center"
                >
                  Book Free Demo First
                </Link>
                <Link
                  href="/courses?class=class-11"
                  className="flex-1 bg-white text-[#3d4d3d] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 text-center"
                >
                  Enroll Now - Save ₹20,000
                </Link>
              </div>

              {/* Urgency */}
              <div className="text-center mt-6">
                <div className="inline-flex items-center bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Only {batchInfo.remainingSeats} seats left for March 2026 batch
                </div>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-500 mr-2" />
              Compare with Competition
            </h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-[#e8ede8] rounded-xl border-2 border-[#4a5d4a]">
                <div className="font-bold text-[#3d4d3d]">Cerebrum</div>
                <div className="text-2xl font-bold text-[#4a5d4a]">₹6,250/mo</div>
                <div className="text-xs text-gray-500">25 students/batch</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="font-medium text-gray-700">Allen</div>
                <div className="text-2xl font-bold text-gray-600">₹8,500/mo</div>
                <div className="text-xs text-gray-500">100+ students</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="font-medium text-gray-700">Aakash</div>
                <div className="text-2xl font-bold text-gray-600">₹9,000/mo</div>
                <div className="text-xs text-gray-500">80+ students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent-Specific CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-200">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                  👨‍👩‍👧 Are You a Parent?
                </h3>
                <p className="text-gray-600 mb-4">
                  We understand your concerns about your child&apos;s NEET preparation. Chat
                  directly with our counselors to understand fee structure, batch timings, and how
                  we track student progress.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    onClick={() =>
                      trackAndOpenWhatsApp({
                        source: 'class-11-parent-cta',
                        message: WHATSAPP_MESSAGES.parentFees,
                        campaign: 'parent-engagement',
                      })
                    }
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:shadow-green-500/30 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat as Parent
                  </button>
                  <Link
                    href="/parent-guide"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-5 rounded-lg border border-gray-300 shadow-sm transition-all duration-300"
                  >
                    <Users className="h-5 w-5" />
                    Parent Guide
                  </Link>
                </div>
              </div>
              <div className="hidden md:block text-6xl">👨‍👩‍👧‍👦</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Is this course suitable for CBSE/ICSE/State board students?',
                a: 'Yes, our Class 11th Biology course covers NCERT curriculum which is the foundation for all boards. We provide additional support for board-specific requirements.',
              },
              {
                q: 'How does starting in Class 11 help for NEET?',
                a: 'Class 11 covers 55% of NEET Biology syllabus. Starting early gives you 2 years to build strong concepts, reducing Class 12 stress and allowing more revision time.',
              },
              {
                q: 'What are the batch timings?',
                a: 'Classes are 3 times per week (2 hours each). We offer Morning (8-10 AM), Evening (5-7 PM), and Weekend batches.',
              },
              {
                q: 'Can I switch to Intensive course later?',
                a: 'Yes! Class 11 students get priority admission to our Intensive NEET Biology course for Class 12 with special discounts.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      {showFloatingCTA && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={async () => {
              await trackAndOpenWhatsApp({
                source: 'class-11-floating',
                message: WHATSAPP_MESSAGES.courseEnquiry,
                campaign: 'class-11-course',
              })
            }}
            className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 flex items-center justify-center hover:scale-110 animate-pulse cursor-pointer min-w-[48px] min-h-[48px]"
            aria-label="Chat with us on WhatsApp"
          >
            <MessageCircle className="w-7 h-7" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Bottom CTA Bar - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-40">
        <div className="flex gap-3">
          <button
            onClick={async () => {
              await trackAndOpenWhatsApp({
                source: 'class-11-mobile-cta',
                message: WHATSAPP_MESSAGES.courseEnquiry,
                campaign: 'class-11-course',
              })
            }}
            className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center cursor-pointer min-h-[48px]"
            aria-label="Contact us on WhatsApp for Class 11 course enquiry"
          >
            <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
            WhatsApp
          </button>
          <Link
            href="/demo-booking"
            className="flex-1 bg-[#3d4d3d] text-white py-3 rounded-xl font-semibold flex items-center justify-center min-h-[48px]"
            aria-label="Book a free demo class for Class 11 Biology course"
          >
            Book Demo
          </Link>
        </div>
      </div>

      {/* Bottom padding for mobile CTA */}
      <div className="h-20 md:hidden" />
    </div>
  )
}
