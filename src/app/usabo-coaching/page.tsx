'use client'

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
  DollarSign,
} from 'lucide-react'
import Link from 'next/link'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const usaboPathway = [
  {
    stage: 'Stage 1',
    name: 'Open Exam',
    description: '50 MCQs in 50 minutes',
    date: 'February',
    icon: Target,
  },
  {
    stage: 'Stage 2',
    name: 'Semifinals',
    description: '120 min, ~150 questions',
    date: 'March',
    icon: Award,
  },
  {
    stage: 'Stage 3',
    name: 'National Finals',
    description: 'Theory + Practical at Harvard',
    date: 'June',
    icon: GraduationCap,
  },
  {
    stage: 'Stage 4',
    name: 'IBO',
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
    topics: [
      'Mendelian Genetics',
      'Molecular Genetics',
      'Population Genetics',
      'Evolutionary Theory',
    ],
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
    title: 'College-Level Curriculum',
    description: 'Cover Campbell Biology depth required for USABO success and beyond.',
  },
  {
    icon: Users,
    title: 'Flexible Learning Options',
    description:
      '1:1 personalized tutoring or small batches (4-8 students) for intensive training.',
  },
  {
    icon: Clock,
    title: 'US Time Zone Friendly',
    description: 'Flexible scheduling across EST, CST, MST, and PST time zones.',
  },
  {
    icon: Target,
    title: 'Stage-Specific Preparation',
    description: 'Targeted prep for Open Exam, Semifinals, and National Finals.',
  },
  {
    icon: ClipboardCheck,
    title: 'Mock Exams & Analytics',
    description: 'USABO-pattern tests with detailed performance analysis and feedback.',
  },
]

// Senior Faculty: 15+ years experience, IBO-trained mentors
const seniorFacultyPricing = [
  {
    name: 'Discovery',
    hours: 12,
    price: 1800,
    perHour: 150,
    features: ['12 hours with Senior Faculty', 'IBO-level mentorship', 'Personalized study plan'],
  },
  {
    name: 'Accelerator',
    hours: 24,
    price: 3360,
    perHour: 140,
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
    price: 4160,
    perHour: 130,
    features: [
      '32 hours with Senior Faculty',
      'Complete USABO + IBO prep',
      'Practical lab coaching',
      '24/7 doubt support',
    ],
  },
  {
    name: 'IBO Champion',
    hours: 40,
    price: 4800,
    perHour: 120,
    features: [
      '40 hours of mentorship',
      'Full Finals preparation',
      'IBO theory + practicals',
      'Team USA pathway guidance',
    ],
  },
]

// Junior Faculty: Experienced tutors, competitive rates
const juniorFacultyPricing = [
  {
    name: 'Starter',
    hours: 12,
    price: 900,
    perHour: 75,
    features: ['12 hours of 1:1 tutoring', 'Personalized study plan', 'Practice materials'],
  },
  {
    name: 'Foundation',
    hours: 24,
    price: 1680,
    perHour: 70,
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
    price: 2080,
    perHour: 65,
    features: [
      '32 hours of 1:1 tutoring',
      'Complete USABO prep',
      'All mock tests',
      'Priority scheduling',
    ],
  },
  {
    name: 'Comprehensive',
    hours: 40,
    price: 2400,
    perHour: 60,
    features: [
      '40 hours of tutoring',
      'Full program access',
      'Open + Semifinal prep',
      'Regular assessments',
    ],
  },
]

const batchPricing = [
  {
    name: 'Open Exam Prep',
    duration: '6 weeks',
    hours: 12,
    price: 480,
    perHour: 40,
    students: '4-8',
    features: [
      '12 hours (6 sessions)',
      'Open Exam focus',
      'Weekly assignments',
      'Group discussions',
    ],
  },
  {
    name: 'Semifinal Prep',
    duration: '10 weeks',
    hours: 24,
    price: 960,
    perHour: 40,
    students: '4-6',
    features: [
      '24 hours (12 sessions)',
      'Advanced topics',
      'Mock semifinals',
      'Individual feedback',
    ],
    popular: true,
  },
  {
    name: 'Open + Semi Combo',
    duration: '14 weeks',
    hours: 32,
    price: 1280,
    perHour: 40,
    students: '4-6',
    features: [
      '32 hours (16 sessions)',
      'Open to Semifinal prep',
      'Complete mock tests',
      'Progress tracking',
    ],
  },
  {
    name: 'Full USABO Track',
    duration: '18 weeks',
    hours: 40,
    price: 1600,
    perHour: 40,
    students: '4-6',
    features: [
      '40 hours (20 sessions)',
      'All stages covered',
      'Practical training',
      'Finals prep included',
    ],
  },
]

const faqs = [
  {
    question: 'What is USABO?',
    answer:
      'USABO (USA Biology Olympiad) is the premier biology competition for high school students in the United States, organized by the Center for Excellence in Education. Top performers can advance to represent Team USA at the International Biology Olympiad (IBO).',
  },
  {
    question: 'Who is eligible to participate in USABO?',
    answer:
      'Any high school student enrolled in grades 9-12 in the United States can participate. International students studying in US schools are also eligible. The Open Exam is open to all, with top scorers advancing to Semifinals.',
  },
  {
    question: 'What topics are covered in USABO?',
    answer:
      'USABO covers college-level biology based on Campbell Biology textbook, including Cell Biology, Genetics, Plant Biology, Animal Physiology, Ecology, Evolution, and Biosystematics. The difficulty increases from Open Exam through Finals.',
  },
  {
    question: 'How long does it take to prepare for USABO?',
    answer:
      'For students starting with strong biology basics, 3-6 months of dedicated preparation is recommended for Open Exam. For Semifinals and Finals, additional 3-4 months of intensive preparation is typically needed.',
  },
  {
    question: 'Do you offer both 1:1 and batch coaching?',
    answer:
      'Yes! We offer both personalized 1:1 tutoring for students who prefer individual attention, and small batch programs (4-8 students) for collaborative learning. You can choose based on your learning style and budget.',
  },
  {
    question: 'Can international students take USABO?',
    answer:
      'USABO is specifically for students enrolled in US schools. However, international students interested in biology olympiad preparation can join our coaching to prepare for their countrys national olympiad or general IBO preparation.',
  },
]

export default function USABOCoachingPage() {
  const handleWhatsAppEnquiry = () => {
    trackAndOpenWhatsApp({
      source: 'usabo-page',
      message:
        'Hi! I am interested in USABO coaching. Can you share more details about the program, pricing, and schedule?',
      campaign: 'usabo-coaching',
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
            name: 'USABO Coaching - USA Biology Olympiad Preparation',
            description:
              'Expert coaching for USA Biology Olympiad preparation covering Open Exam, Semifinals, and National Finals.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            offers: {
              '@type': 'AggregateOffer',
              lowPrice: '60',
              highPrice: '150',
              priceCurrency: 'USD',
              offerCount: '8',
            },
            educationalLevel: 'High School',
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-[#3d4d3d] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d4d3d] via-[#4a5d4a] to-[#3d4d3d]" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Globe className="w-5 h-5 mr-2 text-green-400" />
              USA Biology Olympiad Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-green-400">USABO</span> Coaching Online
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Open Exam → Semifinals → Finals → IBO | 1:1 & Small Batch Options
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Prepare for USA Biology Olympiad with expert coaching. Our program covers the complete
              USABO pathway with college-level curriculum, flexible US timezone scheduling, and
              personalized attention. Aim for Team USA!
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
                <div className="text-xl md:text-2xl font-bold">Open→IBO</div>
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
          </div>
        </div>
      </section>

      {/* USABO Pathway Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              USABO Competition Pathway
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From Open Exam to representing Team USA at International Biology Olympiad
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {usaboPathway.map((stage, index) => (
              <div
                key={stage.stage}
                className="relative animate-fadeInUp"
              >
                <div className="bg-[#e8ede8] rounded-lg p-4 border border-[#4a5d4a]/20 h-full">
                  <stage.icon className="w-8 h-8 text-[#3d4d3d] mb-3" />
                  <div className="text-xs text-[#4a5d4a] font-semibold mb-1">{stage.stage}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{stage.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{stage.description}</p>
                  <span className="text-xs text-gray-500">{stage.date}</span>
                </div>
                {index < usaboPathway.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <ArrowRight className="w-5 h-5 text-[#4a5d4a]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              USABO Syllabus Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              College-level biology based on Campbell Biology textbook
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabus.map((unit, index) => (
              <div
                key={unit.unit}
                className="bg-white rounded-xl p-6 shadow-lg animate-fadeInUp"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our USABO Coaching
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-[#e8ede8] rounded-xl p-6 md:p-8 animate-fadeInUp"
              >
                <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-[#3d4d3d] mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Pricing & Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the learning format that works best for you
            </p>
          </div>

          {/* Senior Faculty Pricing */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-purple-100 px-4 py-2 rounded-full mb-4">
                <Award className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-purple-700 font-semibold">Premium Tier</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Senior Faculty (15+ Years Experience)
              </h3>
              <p className="text-gray-600 mt-2">
                IBO-trained mentors • Former Olympiad coaches • $120-150/hr
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seniorFacultyPricing.map((pkg, index) => (
                <div
                  key={pkg.name}
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
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    <span className="text-3xl font-bold text-gray-900">
                      {pkg.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-purple-600 font-medium mb-4">
                    ${pkg.perHour}/hour
                  </div>
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
                </div>
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
              <h3 className="text-2xl font-bold text-gray-900">
                Junior Faculty (Experienced Tutors)
              </h3>
              <p className="text-gray-600 mt-2">
                Biology graduates • USABO semifinalists • $60-75/hr
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {juniorFacultyPricing.map((pkg, index) => (
                <div
                  key={pkg.name}
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
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-3xl font-bold text-gray-900">
                      {pkg.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-green-600 font-medium mb-4">${pkg.perHour}/hour</div>
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
                </div>
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
              <h3 className="text-2xl font-bold text-gray-900">
                Small Batch Programs (4-8 Students)
              </h3>
              <p className="text-gray-600 mt-2">
                Collaborative learning • Peer discussions • $40/hr per student
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {batchPricing.map((pkg, index) => (
                <div
                  key={pkg.name}
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
                  <div className="text-sm text-gray-500 mb-4">
                    {pkg.students} students per batch
                  </div>
                  <div className="flex items-baseline mb-1">
                    <DollarSign className="w-5 h-5 text-teal-600" />
                    <span className="text-3xl font-bold text-gray-900">
                      {pkg.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-teal-600 font-medium mb-4">${pkg.perHour}/hour</div>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-[#e8ede8] rounded-xl p-4 md:p-8 shadow-lg border border-[#4a5d4a]/10 animate-fadeInUp"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-start">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-[#3d4d3d] flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed ml-7 md:ml-9">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3d4d3d] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Aim for Team USA at International Biology Olympiad
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Start your USABO preparation journey today!
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
          </div>
        </div>
      </section>

      {/* Parent Guide Callout */}
      <section className="py-12 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-teal-200 animate-fadeInUp"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-8 h-8 text-teal-600" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Complete Parent&apos;s Guide to USABO & IBO
                </h3>
                <p className="text-gray-600 mb-4">
                  Grade-wise preparation roadmap from 9th grade to college. Learn about timelines,
                  syllabus, college admission benefits, and how to support your child&apos;s
                  olympiad journey.
                </p>
                <Link
                  href="/blog/usabo-ibo-complete-parent-guide-grade-wise-preparation"
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Read the Complete Guide
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-[#e8ede8]">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Explore More Programs
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/campbell-biology/"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:shadow-md hover:bg-teal-700 transition"
            >
              Campbell Biology (56 Chapters)
            </Link>
            <Link
              href="/ibo-preparation/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              IBO Preparation
            </Link>
            <Link
              href="/bbo-preparation/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              BBO (UK)
            </Link>
            <Link
              href="/inbo-coaching/"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition border border-[#4a5d4a]/10 hover:border-[#4a5d4a]/30"
            >
              INBO (India)
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
