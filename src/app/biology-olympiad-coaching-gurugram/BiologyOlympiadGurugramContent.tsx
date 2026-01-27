'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Trophy,
  BookOpen,
  Users,
  CheckCircle,
  Globe,
  GraduationCap,
  Target,
  Beaker,
  Microscope,
  FlaskConical,
  Brain,
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Play,
  Home,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ {
  question: string
  answer: string
}

interface BiologyOlympiadGurugramContentProps {
  faqs: FAQ[]
}

const olympiadPathway = [
  {
    stage: 'NSEB',
    fullName: 'National Standard Examination in Biology',
    description: 'First stage conducted by IAPT in November. Top 300 qualify for INBO.',
    icon: Target,
    color: 'bg-blue-500',
    month: 'November',
  },
  {
    stage: 'INBO',
    fullName: 'Indian National Biology Olympiad',
    description: 'Second stage in February. Top 35 students selected for training camp.',
    icon: Award,
    color: 'bg-purple-500',
    month: 'February',
  },
  {
    stage: 'Training Camp',
    fullName: 'Orientation-cum-Selection Camp',
    description: 'Intensive training at HBCSE Mumbai. 4 students selected for Team India.',
    icon: GraduationCap,
    color: 'bg-green-500',
    month: 'May-June',
  },
  {
    stage: 'IBO',
    fullName: 'International Biology Olympiad',
    description: 'Compete against 80+ countries. Theory (60%) + Practical (40%).',
    icon: Trophy,
    color: 'bg-yellow-500',
    month: 'July',
  },
]

const syllabusCoverage = [
  {
    category: 'Cell Biology & Biochemistry',
    percentage: '25%',
    topics: [
      'Cell structure and organelles',
      'Membrane transport',
      'Enzyme kinetics',
      'Metabolic pathways',
      'Photosynthesis',
      'DNA replication',
    ],
    icon: Microscope,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    category: 'Molecular Biology & Genetics',
    percentage: '20%',
    topics: [
      'Gene expression',
      'Transcription & translation',
      'Epigenetics',
      'Population genetics',
      'Molecular techniques',
      'Bioinformatics',
    ],
    icon: FlaskConical,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    category: 'Plant Biology',
    percentage: '15%',
    topics: [
      'Plant anatomy',
      'Plant physiology',
      'Hormones',
      'Water relations',
      'Reproduction',
      'Plant ecology',
    ],
    icon: BookOpen,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    category: 'Animal Physiology',
    percentage: '20%',
    topics: [
      'Comparative systems',
      'Neuroscience',
      'Endocrine system',
      'Cardiovascular',
      'Immunology',
      'Development',
    ],
    icon: Brain,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    category: 'Ecology & Evolution',
    percentage: '10%',
    topics: [
      'Population dynamics',
      'Community ecology',
      'Ecosystems',
      'Evolution',
      'Phylogenetics',
      'Conservation',
    ],
    icon: Globe,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  },
  {
    category: 'Practical Skills',
    percentage: '10%',
    topics: [
      'Microscopy',
      'Biochemical assays',
      'Molecular practicals',
      'Dissections',
      'Data analysis',
      'Experimental design',
    ],
    icon: Beaker,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
]

const features = [
  {
    title: 'Olympiad-Specialist Faculty',
    description:
      'Learn from teachers with national/international olympiad experience who understand the competition level.',
    icon: Users,
  },
  {
    title: 'Campbell Biology Foundation',
    description:
      'Structured preparation using Campbell Biology 12th edition - the global standard for olympiad preparation.',
    icon: BookOpen,
  },
  {
    title: 'Practical Lab Training',
    description:
      'Hands-on experience with microscopy, biochemistry, and molecular biology techniques crucial for IBO.',
    icon: Beaker,
  },
  {
    title: 'Past Paper Practice',
    description:
      'Extensive practice with NSEB, INBO, and IBO past papers with detailed solutions and analysis.',
    icon: Target,
  },
  {
    title: 'Research Paper Analysis',
    description:
      'Learn to interpret scientific literature at the level expected in olympiad theoretical questions.',
    icon: FlaskConical,
  },
  {
    title: 'Mock Olympiads',
    description:
      'Full-length simulated exams under competition conditions with theory and practical components.',
    icon: Trophy,
  },
]

const courseOptions = [
  {
    name: 'Olympiad Foundation',
    duration: 'Class 9-10 (2 Years)',
    fee: '₹45,000/year',
    features: [
      'Build strong conceptual base',
      'Introduction to Campbell Biology',
      'Basic practical skills',
      'NSEB preparation starts',
      'Weekend batches available',
    ],
  },
  {
    name: 'Olympiad Intensive',
    duration: 'Class 11-12 (1 Year)',
    fee: '₹65,000/year',
    features: [
      'Complete NSEB syllabus',
      'Advanced practical training',
      'INBO level preparation',
      'Mock tests & past papers',
      'Personal mentorship',
    ],
    popular: true,
  },
  {
    name: 'IBO Training',
    duration: 'Post-INBO (3 Months)',
    fee: '₹35,000',
    features: [
      'International level content',
      'Advanced practicals',
      'Research paper analysis',
      'Competition strategies',
      '1-on-1 coaching',
    ],
  },
]

export default function BiologyOlympiadGurugramContent({ faqs }: BiologyOlympiadGurugramContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsAppEnquiry = () => {
    trackAndOpenWhatsApp({
      source: 'olympiad-gurugram-page',
      message:
        'Hi! I am from Gurugram and interested in Biology Olympiad coaching (NSEB/INBO/IBO). Please share details about your Olympiad program.',
      campaign: 'olympiad-gurugram',
    })
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_olympiad_gurugram', {
        event_category: 'conversion',
        event_label: 'olympiad_coaching_gurugram',
        value: 1,
      })
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li className="flex items-center">
              <Link href="/" className="text-gray-600 hover:text-teal-600 transition-colors">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link
                href="/biology-olympiad-preparation"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                Biology Olympiad
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Gurugram</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-4 h-4" />
              NSEB | INBO | IBO Preparation
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Biology Olympiad Coaching
              <span className="block text-yellow-400 mt-2">in Gurugram</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Expert coaching to help you excel at National &amp; International Biology Olympiads.
              Comprehensive preparation from NSEB to IBO level with practical training at our
              Sector 51, Gurugram center.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>NSEB Qualifiers</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Beaker className="w-5 h-5 text-green-400" />
                <span>Practical Training</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Gurugram Center</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppEnquiry}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-semibold transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Enquiry
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Olympiad Pathway */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Path to International Biology Olympiad
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The journey from NSEB to representing India at IBO
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {olympiadPathway.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg h-full border-2 border-transparent hover:border-yellow-400 transition-colors">
                  <div
                    className={`w-12 h-12 ${stage.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <stage.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-medium text-slate-500 mb-1">{stage.month}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{stage.stage}</h3>
                  <p className="text-xs text-slate-500 mb-2">{stage.fullName}</p>
                  <p className="text-sm text-slate-600">{stage.description}</p>
                </div>
                {index < olympiadPathway.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Coverage */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete Olympiad Syllabus Coverage
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive preparation using Campbell Biology as the foundation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabusCoverage.map((unit, index) => (
              <motion.div
                key={unit.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${unit.bgColor} rounded-2xl p-6 border border-slate-100`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <unit.icon className={`w-6 h-6 ${unit.color}`} />
                  </div>
                  <span className="text-2xl font-bold text-slate-900">{unit.percentage}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{unit.category}</h3>
                <ul className="space-y-2">
                  {unit.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className={`w-4 h-4 ${unit.color} flex-shrink-0 mt-0.5`} />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our Olympiad Coaching in Gurugram?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Expert preparation with proven results at our Sector 51 center
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Options */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Olympiad Course Options
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Choose the program that matches your preparation stage
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {courseOptions.map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl overflow-hidden ${course.popular ? 'ring-2 ring-yellow-400' : ''}`}
              >
                {course.popular && (
                  <div className="bg-yellow-400 text-black text-center py-2 text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{course.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{course.duration}</p>
                  <div className="text-3xl font-bold text-teal-600 mb-6">{course.fee}</div>
                  <ul className="space-y-3 mb-6">
                    {course.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-slate-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/demo-booking">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">Enroll Now</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-teal-600 mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Our Gurugram Center Location
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4">
                  <strong>Address:</strong> {CONTACT_INFO.location.gurugram.streetAddress},{' '}
                  {CONTACT_INFO.location.gurugram.addressLocality} -{' '}
                  {CONTACT_INFO.location.gurugram.postalCode}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Landmark:</strong> Same building as Allen Career Institute
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Metro Access:</strong> Sector 55-56 Rapid Metro (5 min walk)
                </p>
                <div className="flex gap-4 mt-6">
                  <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                  <a href={CONTACT_INFO.location.gurugram.mapUrl} target="_blank" rel="noopener">
                    <Button>
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </a>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900">Olympiad Students From:</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'DLF Phase 1-5',
                    'Golf Course Road',
                    'Sushant Lok',
                    'Sector 14',
                    'Sector 43-57',
                    'South City',
                    'Nirvana Country',
                    'MG Road',
                  ].map((area) => (
                    <span
                      key={area}
                      className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 border"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonialsSection />

      {/* NEET Tools */}
      <NEETToolsWidget
        title="Free NEET & Olympiad Preparation Tools"
        subtitle="Plan your preparation journey with our AI-powered tools"
      />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600">
              Common questions about Biology Olympiad coaching in Gurugram
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/nseb-coaching-gurugram"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">NSEB Coaching Gurugram</h3>
              <p className="text-sm text-gray-600">National Standard Examination prep</p>
            </Link>
            <Link
              href="/ibo-preparation-gurugram"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">IBO Preparation Gurugram</h3>
              <p className="text-sm text-gray-600">International Biology Olympiad</p>
            </Link>
            <Link
              href="/neet-coaching-gurugram"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">NEET Coaching Gurugram</h3>
              <p className="text-sm text-gray-600">NEET Biology preparation</p>
            </Link>
            <Link
              href="/neet-foundation-class-9-gurugram"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">NEET Foundation Class 9</h3>
              <p className="text-sm text-gray-600">Early NEET preparation</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Olympiad Journey in Gurugram?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join our expert coaching program and compete at national &amp; international level
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-teal-600"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
