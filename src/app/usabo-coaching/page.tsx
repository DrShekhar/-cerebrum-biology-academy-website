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
  DollarSign,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
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

const oneOnOnePricing = [
  {
    name: 'Starter',
    hours: 10,
    price: 750,
    perHour: 75,
    features: ['10 hours of 1:1 tutoring', 'Personalized study plan', 'Practice materials'],
  },
  {
    name: 'Foundation',
    hours: 20,
    price: 1400,
    perHour: 70,
    features: [
      '20 hours of 1:1 tutoring',
      'Mock tests included',
      'Progress tracking',
      'Email support',
    ],
    popular: true,
  },
  {
    name: 'Intensive',
    hours: 40,
    price: 2600,
    perHour: 65,
    features: [
      '40 hours of 1:1 tutoring',
      'Complete USABO prep',
      'All mock tests',
      'Priority scheduling',
    ],
  },
  {
    name: 'Elite',
    hours: 60,
    price: 3600,
    perHour: 60,
    features: [
      '60+ hours of tutoring',
      'Full program access',
      'Practical lab guidance',
      'IBO prep included',
    ],
  },
]

const batchPricing = [
  {
    name: 'Open Exam Prep',
    duration: '8 weeks',
    price: 800,
    students: '4-8',
    features: ['16 live sessions', 'Open Exam focus', 'Weekly assignments', 'Group discussions'],
  },
  {
    name: 'Semifinal Intensive',
    duration: '12 weeks',
    price: 1500,
    students: '4-6',
    features: ['24 live sessions', 'Advanced topics', 'Mock semifinals', 'Individual feedback'],
    popular: true,
  },
  {
    name: 'Full USABO Track',
    duration: '6 months',
    price: 2500,
    students: '4-6',
    features: [
      'Complete preparation',
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
              '@type': 'Offer',
              price: '75',
              priceCurrency: 'USD',
            },
            educationalLevel: 'High School',
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-cyan-800 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-green-500 text-black hover:bg-green-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Button>
              </Link>

              <button
                onClick={handleWhatsAppEnquiry}
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3 px-8 rounded-xl shadow-xl transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Enquiry
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">Open→IBO</div>
                <div className="text-sm opacity-80">Full Pathway</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">1:1 & Batch</div>
                <div className="text-sm opacity-80">Flexible Options</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">Campbell</div>
                <div className="text-sm opacity-80">Biology Depth</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm opacity-80">Student Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* USABO Pathway Section */}
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
              USABO Competition Pathway
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Open Exam to representing Team USA at International Biology Olympiad
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {usaboPathway.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100 h-full">
                  <stage.icon className="w-12 h-12 text-green-600 mb-4" />
                  <div className="text-sm text-green-600 font-semibold mb-1">{stage.stage}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{stage.name}</h3>
                  <p className="text-gray-600 mb-2">{stage.description}</p>
                  <span className="text-sm text-gray-500">{stage.date}</span>
                </div>
                {index < usaboPathway.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-green-500" />
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
              USABO Syllabus Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              College-level biology based on Campbell Biology textbook
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
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <unit.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {unit.weightage}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{unit.unit}</h3>
                <ul className="space-y-1">
                  {unit.topics.map((topic) => (
                    <li key={topic} className="text-sm text-gray-600 flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
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
              Why Choose Our USABO Coaching
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
                className="bg-gray-50 rounded-xl p-8"
              >
                <feature.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Pricing & Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the learning format that works best for you
            </p>
          </motion.div>

          {/* 1:1 Tutoring Packages */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              1:1 Personalized Tutoring
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {oneOnOnePricing.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-xl p-6 shadow-lg relative ${pkg.popular ? 'ring-2 ring-green-500' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                  <div className="text-sm text-gray-500 mb-4">{pkg.hours} hours</div>
                  <div className="flex items-baseline mb-1">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
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
                </motion.div>
              ))}
            </div>
          </div>

          {/* Small Batch Programs */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Small Batch Programs (4-8 Students)
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {batchPricing.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-xl p-6 shadow-lg relative ${pkg.popular ? 'ring-2 ring-green-500' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Recommended
                      </span>
                    </div>
                  )}
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                  <div className="text-sm text-gray-500 mb-1">{pkg.duration}</div>
                  <div className="text-sm text-gray-500 mb-4">
                    {pkg.students} students per batch
                  </div>
                  <div className="flex items-baseline mb-4">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
                  </div>
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
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-green-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Aim for Team USA at International Biology Olympiad
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Start your USABO preparation journey today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-green-500 text-black hover:bg-green-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Button>
              </Link>

              <button
                onClick={handleWhatsAppEnquiry}
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-xl transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/biology-olympiad-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Indian Biology Olympiad (NSEB/IBO)
            </Link>
            <Link
              href="/olympiad-preparation"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              All Olympiad Programs
            </Link>
            <Link
              href="/courses"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
