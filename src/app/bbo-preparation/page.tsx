'use client'

import { motion } from 'framer-motion'
import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  MessageCircle,
  Play,
  ArrowRight,
  Target,
  Globe,
  Microscope,
  Dna,
  Leaf,
  Heart,
  GraduationCap,
  Clock,
  ClipboardCheck,
  Layers,
} from 'lucide-react'
import Link from 'next/link'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const bboPathway = [
  {
    stage: 'Round 1',
    name: 'BBO Paper',
    description: '90 questions in 90 mins',
    date: 'January',
    icon: Target,
  },
  {
    stage: 'Round 2',
    name: 'Theory Paper',
    description: '2-hour advanced exam',
    date: 'February',
    icon: Award,
  },
  {
    stage: 'Training',
    name: 'Selection Camp',
    description: 'UK training camp',
    date: 'April',
    icon: GraduationCap,
  },
  {
    stage: 'IBO',
    name: 'Team UK',
    description: 'International Biology Olympiad',
    date: 'July',
    icon: Globe,
  },
]

const syllabus = [
  {
    unit: 'Cell Biology & Biochemistry',
    topics: ['Cell Structure', 'Metabolism', 'Enzymes', 'Cell Signaling'],
    weightage: '20%',
    icon: Microscope,
  },
  {
    unit: 'Genetics & Evolution',
    topics: ['Mendelian Genetics', 'Molecular Genetics', 'Population Genetics', 'Evolutionary Theory'],
    weightage: '20%',
    icon: Dna,
  },
  {
    unit: 'Plant Biology',
    topics: ['Plant Anatomy', 'Photosynthesis', 'Transport', 'Plant Reproduction'],
    weightage: '15%',
    icon: Leaf,
  },
  {
    unit: 'Animal Anatomy & Physiology',
    topics: ['Human Systems', 'Comparative Anatomy', 'Homeostasis', 'Development'],
    weightage: '25%',
    icon: Heart,
  },
  {
    unit: 'Ecology & Behavior',
    topics: ['Population Ecology', 'Community Ecology', 'Animal Behavior', 'Conservation'],
    weightage: '15%',
    icon: Globe,
  },
  {
    unit: 'Biosystematics',
    topics: ['Taxonomy', 'Phylogenetics', 'Classification', 'Biodiversity'],
    weightage: '5%',
    icon: Layers,
  },
]

const features = [
  {
    icon: Award,
    title: 'Olympiad-Trained Faculty',
    description: 'Learn from instructors with IBO mentoring experience and deep subject expertise.',
  },
  {
    icon: BookOpen,
    title: 'Beyond A-Level Content',
    description: 'Cover Campbell Biology depth required for BBO Gold and beyond.',
  },
  {
    icon: Users,
    title: 'Flexible Learning Options',
    description: '1:1 personalized tutoring or small batches (4-8 students) for intensive training.',
  },
  {
    icon: Clock,
    title: 'UK Time Zone Friendly',
    description: 'Flexible scheduling suitable for GMT/BST time zones.',
  },
  {
    icon: Target,
    title: 'Round-Specific Preparation',
    description: 'Targeted prep for Round 1, Round 2, and IBO selection camp.',
  },
  {
    icon: ClipboardCheck,
    title: 'Mock Exams & Analytics',
    description: 'BBO-pattern tests with detailed performance analysis and feedback.',
  },
]

const seniorFacultyPricing = [
  {
    name: 'Discovery',
    hours: 12,
    price: 1440,
    perHour: 120,
    features: ['12 hours with Senior Faculty', 'IBO-level mentorship', 'Personalized study plan'],
  },
  {
    name: 'Accelerator',
    hours: 24,
    price: 2640,
    perHour: 110,
    features: [
      '24 hours with Senior Faculty',
      'Mock tests + detailed review',
      'Priority scheduling',
      'Direct mentor access',
    ],
    popular: true,
  },
  {
    name: 'Elite Track',
    hours: 32,
    price: 3200,
    perHour: 100,
    features: [
      '32 hours with Senior Faculty',
      'Complete BBO + IBO prep',
      'Practical lab coaching',
      '24/7 doubt support',
    ],
  },
  {
    name: 'IBO Champion',
    hours: 40,
    price: 3600,
    perHour: 90,
    features: [
      '40 hours of mentorship',
      'Full selection camp prep',
      'IBO theory + practicals',
      'Team UK pathway guidance',
    ],
  },
]

const juniorFacultyPricing = [
  {
    name: 'Starter',
    hours: 12,
    price: 720,
    perHour: 60,
    features: ['12 hours of 1:1 tutoring', 'Personalized study plan', 'Practice materials'],
  },
  {
    name: 'Foundation',
    hours: 24,
    price: 1320,
    perHour: 55,
    features: [
      '24 hours of 1:1 tutoring',
      'Mock tests included',
      'Progress tracking',
      'Email support',
    ],
    popular: true,
  },
  {
    name: 'Intensive',
    hours: 32,
    price: 1600,
    perHour: 50,
    features: ['32 hours of 1:1 tutoring', 'Complete BBO prep', 'All mock tests', 'Priority scheduling'],
  },
  {
    name: 'Comprehensive',
    hours: 40,
    price: 1800,
    perHour: 45,
    features: ['40 hours of tutoring', 'Full program access', 'Round 1 + 2 prep', 'Regular assessments'],
  },
]

const batchPricing = [
  {
    name: 'Round 1 Prep',
    duration: '6 weeks',
    hours: 12,
    price: 360,
    perHour: 30,
    students: '4-8',
    features: ['12 hours (6 sessions)', 'Round 1 focus', 'Weekly assignments', 'Group discussions'],
  },
  {
    name: 'Round 2 Prep',
    duration: '10 weeks',
    hours: 24,
    price: 720,
    perHour: 30,
    students: '4-6',
    features: ['24 hours (12 sessions)', 'Advanced topics', 'Mock Round 2 papers', 'Individual feedback'],
    popular: true,
  },
  {
    name: 'Full BBO Track',
    duration: '14 weeks',
    hours: 32,
    price: 960,
    perHour: 30,
    students: '4-6',
    features: ['32 hours (16 sessions)', 'Round 1 + 2 prep', 'Complete mock tests', 'Progress tracking'],
  },
  {
    name: 'Gold Medal Track',
    duration: '18 weeks',
    hours: 40,
    price: 1200,
    perHour: 30,
    students: '4-6',
    features: ['40 hours (20 sessions)', 'All stages covered', 'Practical training', 'IBO prep included'],
  },
]

const faqs = [
  {
    question: 'What is the British Biology Olympiad (BBO)?',
    answer:
      'The BBO is a prestigious biology competition for sixth form students in the UK, organized by the Royal Society of Biology. Gold, Silver, Bronze and Highly Commended awards are given, with top performers invited to compete for Team UK at the International Biology Olympiad (IBO).',
  },
  {
    question: 'Who is eligible to participate in BBO?',
    answer:
      'BBO is open to Year 12 and Year 13 students (Sixth Form) in the UK. Students studying A-Level Biology, IB Biology, or equivalent qualifications can participate. Registration is typically done through schools.',
  },
  {
    question: 'How difficult is BBO compared to A-Level Biology?',
    answer:
      'BBO goes significantly beyond A-Level content, testing university-level concepts and analytical thinking. While A-Level forms the foundation, BBO questions require deeper understanding and application of biological principles.',
  },
  {
    question: 'What topics are covered in BBO?',
    answer:
      'BBO covers all major biology topics including Cell Biology, Genetics, Plant Biology, Animal Physiology, Ecology, Evolution, and Biosystematics. The content is based on first-year university biology, particularly Campbell Biology textbook.',
  },
  {
    question: 'How long does it take to prepare for BBO?',
    answer:
      'For students with strong A-Level Biology foundations, 3-4 months of dedicated preparation is recommended for Round 1. For Gold medal and IBO selection, 6+ months of intensive preparation is typically needed.',
  },
  {
    question: 'Do you offer both 1:1 and batch coaching?',
    answer:
      'Yes! We offer both personalized 1:1 tutoring for students who prefer individual attention, and small batch programs (4-8 students) for collaborative learning. You can choose based on your learning style and budget.',
  },
]

export default function BBOPreparationPage() {
  const handleWhatsAppEnquiry = () => {
    trackAndOpenWhatsApp({
      source: 'bbo-page',
      message:
        'Hi! I am a UK student interested in BBO coaching. Can you share more details about the program, pricing, and schedule?',
      campaign: 'bbo-preparation',
    })
  }

  return (
    <div className="min-h-screen">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'BBO Preparation - British Biology Olympiad Coaching',
            description:
              'Expert coaching for British Biology Olympiad preparation covering Round 1, Round 2, and IBO selection.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            offers: {
              '@type': 'AggregateOffer',
              lowPrice: '30',
              highPrice: '120',
              priceCurrency: 'GBP',
              offerCount: '8',
            },
            educationalLevel: 'Sixth Form',
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-[#3d4d3d] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d4d3d] via-[#4a5d4a] to-[#3d4d3d]" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Globe className="w-5 h-5 mr-2 text-green-400" />
              British Biology Olympiad Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-green-400">BBO</span> Preparation Online
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Round 1 → Round 2 → Selection Camp → IBO | 1:1 & Small Batch Options
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Prepare for the British Biology Olympiad with expert coaching. Our program covers the complete
              BBO pathway with university-level curriculum, flexible UK timezone scheduling, and personalized
              attention. Aim for Gold and Team UK!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <button className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-300">
                  <Play className="w-5 h-5" />
                  Book Free Consultation
                </button>
              </Link>

              <button
                onClick={handleWhatsAppEnquiry}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Enquiry
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-400" />
                <div className="text-xl md:text-2xl font-bold">Gold→IBO</div>
                <div className="text-xs md:text-sm opacity-80">Full Pathway</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <Users className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-400" />
                <div className="text-xl md:text-2xl font-bold">1:1 & Batch</div>
                <div className="text-xs md:text-sm opacity-80">Flexible Options</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-400" />
                <div className="text-xl md:text-2xl font-bold">Campbell</div>
                <div className="text-xs md:text-sm opacity-80">Biology Depth</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <Star className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-400" />
                <div className="text-xl md:text-2xl font-bold">4.9/5</div>
                <div className="text-xs md:text-sm opacity-80">Student Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BBO Pathway Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              BBO Competition Pathway
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From Round 1 to representing Team UK at International Biology Olympiad
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {bboPathway.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-[#e8ede8] rounded-lg p-4 border border-[#4a5d4a]/20 h-full">
                  <stage.icon className="w-8 h-8 text-[#3d4d3d] mb-3" />
                  <div className="text-xs text-[#4a5d4a] font-semibold mb-1">{stage.stage}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{stage.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{stage.description}</p>
                  <span className="text-xs text-gray-500">{stage.date}</span>
                </div>
                {index < bboPathway.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <ArrowRight className="w-5 h-5 text-[#4a5d4a]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              BBO Syllabus Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              University-level biology based on Campbell Biology textbook
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabus.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#e8ede8] rounded-full flex items-center justify-center">
                    <unit.icon className="w-6 h-6 text-[#3d4d3d]" />
                  </div>
                  <span className="bg-[#4a5d4a] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {unit.weightage}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{unit.unit}</h3>
                <ul className="space-y-1">
                  {unit.topics.map((topic) => (
                    <li key={topic} className="text-sm text-gray-600 flex items-start">
                      <CheckCircle className="w-4 h-4 text-[#4a5d4a] mr-2 flex-shrink-0 mt-0.5" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our BBO Coaching
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#e8ede8] rounded-xl p-6 md:p-8"
              >
                <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-[#3d4d3d] mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Pricing & Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the learning format that works best for you (Prices in GBP)
            </p>
          </motion.div>

          {/* Senior Faculty Pricing */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-purple-100 px-4 py-2 rounded-full mb-4">
                <Award className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-purple-700 font-semibold">Premium Tier</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Senior Faculty (15+ Years Experience)</h3>
              <p className="text-gray-600 mt-2">IBO-trained mentors • Former Olympiad coaches • £90-120/hr</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seniorFacultyPricing.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 md:p-6 shadow-lg relative border border-purple-200 ${pkg.popular ? 'ring-2 ring-purple-500' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                  <div className="text-sm text-gray-500 mb-4">{pkg.hours} hours</div>
                  <div className="flex items-baseline mb-1">
                    <span className="text-lg text-purple-600 mr-1">£</span>
                    <span className="text-3xl font-bold text-gray-900">{pkg.price.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-purple-600 font-medium mb-4">£{pkg.perHour}/hour</div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="text-sm text-gray-600 flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Junior Faculty Pricing */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full mb-4">
                <Users className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-700 font-semibold">Value Tier</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Junior Faculty (Experienced Tutors)</h3>
              <p className="text-gray-600 mt-2">Biology graduates • BBO medallists • £45-60/hr</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {juniorFacultyPricing.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-xl p-4 md:p-6 shadow-lg relative ${pkg.popular ? 'ring-2 ring-green-500' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Best Value
                      </span>
                    </div>
                  )}
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                  <div className="text-sm text-gray-500 mb-4">{pkg.hours} hours</div>
                  <div className="flex items-baseline mb-1">
                    <span className="text-lg text-green-600 mr-1">£</span>
                    <span className="text-3xl font-bold text-gray-900">{pkg.price.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium mb-4">£{pkg.perHour}/hour</div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="text-sm text-gray-600 flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Small Batch Programs */}
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-teal-100 px-4 py-2 rounded-full mb-4">
                <Users className="w-5 h-5 text-teal-600 mr-2" />
                <span className="text-teal-700 font-semibold">Group Learning</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Small Batch Programs (4-8 Students)</h3>
              <p className="text-gray-600 mt-2">Collaborative learning • Peer discussions • £30/hr per student</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {batchPricing.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-4 md:p-6 shadow-lg relative border border-teal-200 ${pkg.popular ? 'ring-2 ring-teal-500' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Recommended
                      </span>
                    </div>
                  )}
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                  <div className="text-sm text-gray-500 mb-1">
                    {pkg.duration} • {pkg.hours} hours
                  </div>
                  <div className="text-sm text-gray-500 mb-4">{pkg.students} students per batch</div>
                  <div className="flex items-baseline mb-1">
                    <span className="text-lg text-teal-600 mr-1">£</span>
                    <span className="text-3xl font-bold text-gray-900">{pkg.price.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-teal-600 font-medium mb-4">£{pkg.perHour}/hour</div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="text-sm text-gray-600 flex items-start">
                        <CheckCircle className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Join Batch
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#e8ede8] rounded-xl p-4 md:p-8 shadow-lg border border-[#4a5d4a]/10"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-start">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-[#3d4d3d] flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed ml-7 md:ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3d4d3d] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Aim for Gold and Team UK at International Biology Olympiad
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Start your BBO preparation journey today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <button className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-300">
                  <Play className="w-5 h-5" />
                  Book Free Consultation
                </button>
              </Link>

              <button
                onClick={handleWhatsAppEnquiry}
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#3d4d3d] font-bold py-4 px-8 rounded-xl transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-[#e8ede8]">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More Programs</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/campbell-biology/"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:shadow-md hover:bg-teal-700 transition"
            >
              Campbell Biology (56 Chapters)
            </Link>
            <Link
              href="/usabo-coaching/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              USABO (USA)
            </Link>
            <Link
              href="/inbo-coaching/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              INBO (India)
            </Link>
            <Link
              href="/ibo-preparation/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              IBO Preparation
            </Link>
            <Link
              href="/mcat-biology-preparation/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              MCAT Biology
            </Link>
            <Link
              href="/ap-biology-online-tutor/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              AP Biology
            </Link>
            <Link
              href="/biology-olympiad-preparation/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              All Olympiad Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
