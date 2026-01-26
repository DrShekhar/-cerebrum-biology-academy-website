'use client'

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
  GraduationCap,
  Microscope,
  Brain,
  Phone,
  MessageCircle,
  Shield,
  Sparkles,
  Calculator,
  FileText,
  TrendingUp,
  School,
  Play,
  Calendar,
  BadgeCheck,
} from 'lucide-react'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

export default function Class12BiologyPage() {
  const courseFeatures = [
    {
      icon: BookOpen,
      title: 'Complete NCERT Mastery',
      description: 'Full Class 12 NCERT syllabus with NEET-level depth',
    },
    {
      icon: Target,
      title: 'Board + NEET Focus',
      description: '90+ board marks guaranteed alongside NEET prep',
    },
    {
      icon: Brain,
      title: 'Daily Practice Sessions',
      description: 'MCQs, PYQs, and topic-wise tests every day',
    },
    {
      icon: Users,
      title: 'Small Batch (Max 20)',
      description: 'Personal attention for every student',
    },
    {
      icon: MessageCircle,
      title: 'Doubt Resolution 24/7',
      description: 'WhatsApp support + dedicated doubt sessions',
    },
    {
      icon: Award,
      title: 'Weekly Mock Tests',
      description: 'NEET pattern tests with detailed analysis',
    },
    {
      icon: GraduationCap,
      title: 'AIIMS Faculty',
      description: 'Learn from Dr. Shekhar Singh, AIIMS alumnus',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Regular assessments with parent updates',
    },
  ]

  const curriculum = [
    {
      title: 'Unit 1: Reproduction',
      topics: ['Sexual Reproduction in Plants', 'Human Reproduction', 'Reproductive Health'],
      duration: '6 weeks',
      neetWeight: 'High (12-15 Qs)',
      color: 'border-green-600',
    },
    {
      title: 'Unit 2: Genetics & Evolution',
      topics: ['Heredity', 'Molecular Basis of Inheritance', 'Evolution'],
      duration: '8 weeks',
      neetWeight: 'Very High (15-18 Qs)',
      color: 'border-[#3d4d3d]',
    },
    {
      title: 'Unit 3: Biology & Human Welfare',
      topics: ['Health & Disease', 'Microbes', 'Biotechnology Applications'],
      duration: '6 weeks',
      neetWeight: 'Medium (8-12 Qs)',
      color: 'border-teal-600',
    },
    {
      title: 'Unit 4: Biotechnology & Ecology',
      topics: ['Biotechnology Principles', 'Ecosystem', 'Environmental Issues'],
      duration: '8 weeks',
      neetWeight: 'High (12-15 Qs)',
      color: 'border-[#4a5d4a]',
    },
  ]

  const successStats = [
    { number: '96%', label: 'Board Success', description: 'Score 90+ marks' },
    { number: '92%', label: 'NEET Qualified', description: 'Clear NEET cutoff' },
    { number: '340+', label: 'Avg Biology', description: 'NEET Biology score' },
    { number: '3000+', label: 'Students', description: 'Coached in Class 12' },
  ]

  const neetTools = [
    {
      icon: School,
      title: 'NEET College Predictor',
      description: 'Check which medical colleges you can get based on your expected score',
      href: '/neet-college-predictor',
      color: 'from-green-500 to-teal-600',
      cta: 'Predict Colleges',
    },
    {
      icon: Calculator,
      title: 'NEET Rank Predictor',
      description: 'Estimate your All India Rank from your NEET score',
      href: '/neet-rank-predictor',
      color: 'from-blue-500 to-indigo-600',
      cta: 'Predict Rank',
    },
    {
      icon: FileText,
      title: 'Free MCQ Practice',
      description: 'Practice 10,000+ Biology MCQs chapter-wise',
      href: '/mcq-practice',
      color: 'from-purple-500 to-pink-600',
      cta: 'Start Practice',
    },
    {
      icon: BookOpen,
      title: 'NEET PYQ Papers',
      description: 'Solve previous 15 years NEET Biology questions',
      href: '/pyq-biology',
      color: 'from-orange-500 to-red-500',
      cta: 'Solve PYQs',
    },
  ]

  const howWeHelp = [
    {
      icon: GraduationCap,
      title: 'AIIMS-Trained Faculty',
      stat: '15+ Years',
      description: 'Dr. Shekhar Singh brings AIIMS expertise to every class',
    },
    {
      icon: Target,
      title: 'Focused NEET Strategy',
      stat: '340+ Avg',
      description: 'Chapter-wise weightage-based preparation for maximum Biology score',
    },
    {
      icon: Users,
      title: 'Small Batch Size',
      stat: 'Max 20',
      description: 'Personal attention ensures no student is left behind',
    },
    {
      icon: Microscope,
      title: 'Rigorous Testing',
      stat: '100+ Tests',
      description: 'Weekly tests simulate NEET environment for exam readiness',
    },
  ]

  const faqs = [
    {
      question: 'How is this different from Class 11th course?',
      answer:
        'Class 12th course is more intensive with direct NEET focus. We cover board syllabus alongside intensive NEET preparation with daily practice, mock tests, and previous year questions analysis.',
    },
    {
      question: 'What is the expected Biology score improvement?',
      answer:
        'Our students typically achieve 330+ marks in NEET Biology (out of 360). We focus on high-weightage topics and provide extensive practice to ensure maximum scoring.',
    },
    {
      question: 'Are board exam and NEET preparation covered simultaneously?',
      answer:
        'Yes, our unique curriculum covers both. Board exam preparation is integrated with NEET-level depth, ensuring students excel in both without any compromise.',
    },
    {
      question: 'What support is provided for doubt resolution?',
      answer:
        'We provide daily doubt sessions, one-on-one mentoring, WhatsApp support, and weekend doubt clearing classes. No student question goes unanswered.',
    },
    {
      question: 'What is the fee for Class 12th Biology course?',
      answer:
        'The course fee is ₹72,200 for the complete 12-month program. EMI options and early bird discounts are available. Book a free demo to know more.',
    },
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
            name: 'Class 12th Biology Course for NEET',
            description:
              'Intensive Class 12 Biology course for NEET and Board exam preparation by AIIMS faculty',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            offers: {
              '@type': 'Offer',
              price: '72200',
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-[#3d4d3d] text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="max-w-full">
              {/* Urgency Badge */}
              <div className="inline-flex items-center bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-yellow-500/30">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-yellow-300">NEET 2026 Batch Open</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Class 12th Biology
                <span className="text-yellow-400 block">NEET Course</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
                The most crucial year for your medical dream. Master Class 12 Biology with intensive
                NEET preparation from <strong className="text-white">AIIMS faculty</strong>.
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <Link
                  href="/demo-booking"
                  className="bg-yellow-500 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-[1.02] min-h-[52px] w-full group"
                >
                  <Play className="w-5 h-5 mr-2" />
                  <span>Book Free Demo Class</span>
                  <ArrowRight className="w-5 h-5 ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex flex-col xs:flex-row gap-3">
                  <button
                    onClick={async () => {
                      await trackAndOpenWhatsApp({
                        source: 'class-12-hero',
                        message: WHATSAPP_MESSAGES.courseEnquiry,
                        campaign: 'class-12-course',
                      })
                    }}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors inline-flex items-center justify-center min-h-[48px] flex-1 cursor-pointer"
                    aria-label="Contact us on WhatsApp for Class 12 course enquiry"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                    WhatsApp Us
                  </button>
                  <a
                    href="tel:+918826444334"
                    className="border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center min-h-[48px] flex-1"
                    aria-label="Call us at 8826444334"
                  >
                    <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>

            {/* Course Highlights Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Course Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-4">
                    <Clock className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <span className="font-semibold">12 Months Intensive</span>
                    <p className="text-sm text-gray-300">Complete NEET preparation</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                    <Users className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <span className="font-semibold">Premium Batch (Max 20)</span>
                    <p className="text-sm text-gray-300">Personal attention guaranteed</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                    <Trophy className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <span className="font-semibold">Board + NEET Excellence</span>
                    <p className="text-sm text-gray-300">90+ board & 340+ NEET target</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <span className="font-semibold">AIIMS Faculty</span>
                    <p className="text-sm text-gray-300">Dr. Shekhar Singh, 15+ years exp</p>
                  </div>
                </div>
              </div>

              {/* Price Badge */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300">Course Fee</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-yellow-400">₹72,200</span>
                      <span className="text-sm text-gray-400 line-through">₹80,000</span>
                    </div>
                  </div>
                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ₹7,800
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-4 bg-[#3d4d3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-white/80" />
              <span className="font-medium">AIIMS Faculty</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-white/80" />
              <span className="font-medium">500+ NEET Selections</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-white/80" />
              <span className="font-medium">4.9 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-white/80" />
              <span className="font-medium">15+ Years Trust</span>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Class 12th Success Record
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Outstanding results in both board exams and NEET
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {successStats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#e8ede8] to-white rounded-xl p-5 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-[#e8ede8]"
              >
                <div className="text-3xl sm:text-4xl font-bold text-[#3d4d3d] mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Cerebrum Helps */}
      <section className="py-12 sm:py-16 bg-[#e8ede8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-[#3d4d3d] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="h-4 w-4" />
              Why Cerebrum
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              How Cerebrum Helps You{' '}
              <span className="text-[#4a5d4a]">Get Into Medical College</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howWeHelp.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#e8ede8] group hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-[#3d4d3d] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-2xl font-bold text-[#4a5d4a] mb-1">{item.stat}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              What's Included in the Course
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to excel in both board exams and NEET
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-5 sm:p-6 hover:shadow-lg transition-shadow border border-gray-100 hover:border-[#4a5d4a]/30"
              >
                <div className="w-12 h-12 bg-[#e8ede8] rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#3d4d3d]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free NEET Tools */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-900 to-[#3d4d3d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-yellow-500/30">
              <Sparkles className="h-4 w-4" />
              100% Free Tools
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Free NEET Tools for Class 12 Students
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Use these free tools to boost your NEET preparation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {neetTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{tool.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{tool.description}</p>
                <span className="inline-flex items-center text-yellow-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  {tool.cta}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Complete Curriculum with NEET Weightage
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Strategic coverage based on NEET exam pattern and board requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {curriculum.map((unit, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${unit.color} hover:shadow-xl transition-shadow`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{unit.title}</h3>
                  <div className="text-right">
                    <span className="bg-[#e8ede8] text-[#3d4d3d] px-3 py-1 rounded-full text-sm font-medium block mb-1">
                      {unit.duration}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      {unit.neetWeight}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {unit.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-[#4a5d4a] mr-2 flex-shrink-0" />
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
      <section className="py-12 sm:py-16 bg-[#e8ede8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Secure Your Medical Seat Today
          </h2>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-[#d8ddd8]">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <div className="inline-flex items-center gap-2 bg-[#3d4d3d] text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  <BadgeCheck className="h-4 w-4" />
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Class 12th Biology Intensive Course
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#4a5d4a] mr-3" />
                    <span>12 months intensive program</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#4a5d4a] mr-3" />
                    <span>Board + NEET dual preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#4a5d4a] mr-3" />
                    <span>Daily practice + weekly tests</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#4a5d4a] mr-3" />
                    <span>Personal mentorship included</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#4a5d4a] mr-3" />
                    <span>AIIMS faculty guidance</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#e8ede8] rounded-xl p-6">
                <div className="mb-4">
                  <span className="text-gray-500 line-through text-lg">₹80,000</span>
                  <div className="text-4xl font-bold text-[#3d4d3d]">₹72,200</div>
                  <p className="text-sm text-gray-600 mt-1">per year (EMI available)</p>
                </div>
                <div className="space-y-3">
                  <Link
                    href="/purchase/class-12"
                    className="w-full bg-[#3d4d3d] text-white py-3 rounded-xl font-bold hover:bg-[#4a5d4a] transition-all inline-flex items-center justify-center"
                  >
                    Enroll Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    href="/demo-booking"
                    className="w-full bg-yellow-500 text-slate-900 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all inline-flex items-center justify-center"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Book Free Demo First
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 sm:p-6">
            <p className="text-yellow-800 font-semibold mb-2">🎯 NEET 2026 Special Offer</p>
            <p className="text-yellow-700 text-sm sm:text-base">
              Enroll before 31st January and get FREE NEET crash course (worth ₹15,000) + Previous
              15 years question bank!
            </p>
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
                        source: 'class-12-parent-cta',
                        message: WHATSAPP_MESSAGES.parentFees,
                        campaign: 'parent-engagement',
                      })
                    }
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:shadow-green-500/30 transition-all duration-300 hover:scale-[1.02] min-h-[48px]"
                    aria-label="Chat with counselor as a parent on WhatsApp"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Chat as Parent
                  </button>
                  <Link
                    href="/parent-guide"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-5 rounded-lg border border-gray-300 shadow-sm transition-all duration-300 min-h-[48px]"
                    aria-label="View parent guide for NEET preparation"
                  >
                    <Users className="h-5 w-5" aria-hidden="true" />
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
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10 sm:mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                  <MessageCircle className="w-5 h-5 mr-3 text-[#4a5d4a] flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 bg-[#3d4d3d] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Urgency Badge */}
          <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/30 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-yellow-300">Limited Seats for NEET 2026 Batch</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Start Your NEET Journey <span className="text-yellow-400">Today</span>
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join 3000+ successful students who cracked NEET with Cerebrum's Class 12 Biology course
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
              <BadgeCheck className="w-4 h-4 text-green-400" />
              <span>500+ NEET Selections</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>15+ Years Trust</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/demo-booking"
              className="bg-yellow-500 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-all inline-flex items-center justify-center shadow-lg min-h-[52px]"
              aria-label="Book a free demo class"
            >
              <Play className="w-5 h-5 mr-2" aria-hidden="true" />
              Book Free Demo
            </Link>
            <button
              onClick={async () => {
                await trackAndOpenWhatsApp({
                  source: 'class-12-final-cta',
                  message: WHATSAPP_MESSAGES.courseEnquiry,
                  campaign: 'class-12-course',
                })
              }}
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-500 transition-all inline-flex items-center justify-center shadow-lg cursor-pointer min-h-[52px]"
              aria-label="Contact us on WhatsApp at 88264-44334"
            >
              <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
              WhatsApp: 88264-44334
            </button>
            <a
              href="tel:+918826444334"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all inline-flex items-center justify-center min-h-[52px]"
              aria-label="Call us at 8826444334"
            >
              <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
              Call Now
            </a>
          </div>

          {/* Operating Hours */}
          <p className="text-white/60 text-sm">
            📞 Counseling hours: Mon-Sat, 9 AM - 8 PM | Sunday: 10 AM - 6 PM
          </p>
        </div>
      </section>
    </div>
  )
}
