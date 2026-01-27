'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Trophy,
  BookOpen,
  CheckCircle,
  Target,
  Calendar,
  Clock,
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Play,
  Home,
  Award,
  FileText,
  Users,
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

interface NSEBCoachingGurugramContentProps {
  faqs: FAQ[]
}

const nsebSyllabus = [
  {
    unit: 'Cell Biology',
    weightage: '20%',
    topics: ['Cell structure', 'Organelles', 'Cell division', 'Membrane transport', 'Cell signaling'],
  },
  {
    unit: 'Plant Biology',
    weightage: '15%',
    topics: ['Morphology', 'Anatomy', 'Physiology', 'Photosynthesis', 'Reproduction'],
  },
  {
    unit: 'Animal Physiology',
    weightage: '20%',
    topics: ['Digestion', 'Respiration', 'Circulation', 'Excretion', 'Nervous system'],
  },
  {
    unit: 'Genetics & Evolution',
    weightage: '20%',
    topics: ['Mendelian genetics', 'Molecular genetics', 'Evolution', 'Speciation', 'Population genetics'],
  },
  {
    unit: 'Ecology',
    weightage: '15%',
    topics: ['Ecosystems', 'Populations', 'Communities', 'Biodiversity', 'Conservation'],
  },
  {
    unit: 'Biotechnology',
    weightage: '10%',
    topics: ['rDNA technology', 'PCR', 'Applications', 'Bioethics', 'Genomics'],
  },
]

const preparationTimeline = [
  {
    month: 'June-July',
    phase: 'Foundation',
    activities: ['Complete NCERT Class 11-12', 'Start Campbell Biology basics', 'Build conceptual understanding'],
  },
  {
    month: 'Aug-Sep',
    phase: 'Advanced',
    activities: ['Deep dive into Campbell', 'Topic-wise problem solving', 'Weekly mock tests'],
  },
  {
    month: 'Oct',
    phase: 'Revision',
    activities: ['Complete syllabus revision', 'Past NSEB papers', 'Full-length mocks'],
  },
  {
    month: 'November',
    phase: 'Exam',
    activities: ['Final revision', 'Time management practice', 'NSEB Exam'],
  },
]

const features = [
  {
    title: 'Complete Syllabus Coverage',
    description: 'Comprehensive coverage of entire NSEB syllabus with Campbell Biology as the foundation.',
    icon: BookOpen,
  },
  {
    title: '10+ Years Past Papers',
    description: 'Practice with past NSEB papers from 2013-2024 with detailed solutions.',
    icon: FileText,
  },
  {
    title: 'Weekly Mock Tests',
    description: 'Regular mock tests simulating actual NSEB pattern to track progress.',
    icon: Target,
  },
  {
    title: 'Expert Faculty',
    description: 'Learn from teachers who have guided NSEB qualifiers to INBO and IBO.',
    icon: Users,
  },
  {
    title: 'Small Batch Size',
    description: 'Maximum 15 students per batch for personalized attention.',
    icon: Users,
  },
  {
    title: 'Doubt Resolution',
    description: '24x7 doubt support through WhatsApp groups and dedicated sessions.',
    icon: CheckCircle,
  },
]

export default function NSEBCoachingGurugramContent({ faqs }: NSEBCoachingGurugramContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsAppEnquiry = () => {
    trackAndOpenWhatsApp({
      source: 'nseb-gurugram-page',
      message:
        'Hi! I am from Gurugram and interested in NSEB coaching (National Standard Examination in Biology). Please share details about your program.',
      campaign: 'nseb-gurugram',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li className="flex items-center">
              <Link href="/" className="text-gray-600 hover:text-teal-600">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link href="/biology-olympiad-coaching-gurugram" className="text-gray-600 hover:text-teal-600">
                Biology Olympiad Gurugram
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">NSEB Coaching</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Stage 1 of Biology Olympiad
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NSEB Coaching
              <span className="block text-blue-400 mt-2">in Gurugram</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Expert coaching for National Standard Examination in Biology (NSEB).
              Comprehensive preparation to qualify for INBO and represent India at IBO.
              Join our Sector 51, Gurugram center.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span>Exam: November 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Clock className="w-5 h-5 text-green-400" />
                <span>2 Hours | 80 MCQs</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>Top 300 → INBO</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-blue-500 text-white hover:bg-blue-400 font-bold">
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

      {/* NSEB Syllabus */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">NSEB Syllabus Coverage</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Complete syllabus coverage based on NCERT and Campbell Biology</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nsebSyllabus.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{unit.unit}</h3>
                  <span className="text-xl font-bold text-blue-600">{unit.weightage}</span>
                </div>
                <ul className="space-y-2">
                  {unit.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">6-Month NSEB Preparation Plan</h2>
            <p className="text-xl text-slate-600">Structured timeline to maximize your NSEB preparation</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {preparationTimeline.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-blue-50 rounded-2xl p-6 h-full">
                  <div className="text-sm font-medium text-blue-600 mb-2">{phase.month}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">{phase.phase}</h3>
                  <ul className="space-y-2">
                    {phase.activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < preparationTimeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-blue-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Our NSEB Coaching?</h2>
            <p className="text-xl text-slate-600">Expert preparation at our Gurugram center</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Gurugram Center</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4">
                  <strong>Address:</strong> {CONTACT_INFO.location.gurugram.streetAddress},{' '}
                  {CONTACT_INFO.location.gurugram.addressLocality} - {CONTACT_INFO.location.gurugram.postalCode}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Landmark:</strong> Same building as Allen Career Institute
                </p>
                <div className="flex gap-4 mt-6">
                  <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                  <Link href="/demo-booking">
                    <Button>Book Demo</Button>
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">NSEB Course Details</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Duration: 6 months (June - November)
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Fee: ₹35,000 (includes materials)
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Batch Size: Maximum 15 students
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Weekend + Weekday batches available
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonialsSection />

      {/* NEET Tools */}
      <NEETToolsWidget title="Free NEET & Olympiad Tools" subtitle="Plan your preparation with our free tools" />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">NSEB FAQs</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/biology-olympiad-coaching-gurugram" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Biology Olympiad Gurugram</h3>
              <p className="text-sm text-gray-600">Complete olympiad preparation</p>
            </Link>
            <Link href="/ibo-preparation-gurugram" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">IBO Preparation Gurugram</h3>
              <p className="text-sm text-gray-600">International level coaching</p>
            </Link>
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">NEET Coaching Gurugram</h3>
              <p className="text-sm text-gray-600">NEET Biology preparation</p>
            </Link>
            <Link href="/neet-foundation-class-9-gurugram" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">NEET Foundation Class 9</h3>
              <p className="text-sm text-gray-600">Early preparation</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Crack NSEB?</h2>
          <p className="text-xl mb-8 opacity-90">Join our expert coaching in Gurugram and qualify for INBO</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button variant="secondary" size="xl" className="bg-white text-blue-600 hover:bg-gray-100 font-bold">
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo
              </Button>
            </Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}>
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Phone className="w-5 h-5 mr-2" />
                Call: +91-88264-44334
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
