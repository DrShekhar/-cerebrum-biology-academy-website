'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Trophy,
  BookOpen,
  CheckCircle,
  Globe,
  Beaker,
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Play,
  Home,
  Award,
  Users,
  Target,
  Brain,
  Microscope,
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

const iboSyllabus = [
  { category: 'Cell Biology & Biochemistry', percentage: '25%', icon: Microscope, color: 'bg-blue-500' },
  { category: 'Molecular Biology & Genetics', percentage: '20%', icon: Brain, color: 'bg-purple-500' },
  { category: 'Plant Biology', percentage: '15%', icon: BookOpen, color: 'bg-green-500' },
  { category: 'Animal Physiology', percentage: '20%', icon: Users, color: 'bg-red-500' },
  { category: 'Ecology & Evolution', percentage: '10%', icon: Globe, color: 'bg-teal-500' },
  { category: 'Practical Skills', percentage: '10%', icon: Beaker, color: 'bg-orange-500' },
]

const practicalSkills = [
  'Microscopy techniques',
  'Biochemical assays (enzyme kinetics, protein analysis)',
  'Molecular biology (PCR, gel electrophoresis, cloning)',
  'Anatomical dissections',
  'Plant physiology experiments',
  'Data analysis & experimental design',
]

export default function IBOPreparationGurugramContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsAppEnquiry = () => {
    trackAndOpenWhatsApp({
      source: 'ibo-gurugram-page',
      message: 'Hi! I am from Gurugram and interested in IBO (International Biology Olympiad) preparation. I have qualified INBO. Please share details.',
      campaign: 'ibo-gurugram',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600"><Home className="w-4 h-4" /></Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/biology-olympiad-coaching-gurugram" className="text-gray-600 hover:text-teal-600">Biology Olympiad Gurugram</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-teal-700 font-medium">IBO Preparation</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-yellow-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              World&apos;s Premier Biology Competition
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              IBO Preparation
              <span className="block text-yellow-400 mt-2">in Gurugram</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Advanced coaching for International Biology Olympiad. Expert training for INBO qualifiers
              aiming to represent India at IBO. Theory (60%) + Practical (40%) preparation at our Sector 51 center.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>Gold Medal Training</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Globe className="w-5 h-5 text-blue-400" />
                <span>80+ Countries</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Beaker className="w-5 h-5 text-green-400" />
                <span>40% Practical</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold">
                  <Play className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
              </Link>
              <motion.button whileHover={{ scale: 1.02 }} onClick={handleWhatsAppEnquiry}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-semibold">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Enquiry
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IBO Syllabus */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">IBO Syllabus Distribution</h2>
            <p className="text-xl text-slate-600">Comprehensive coverage based on Campbell Biology</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {iboSyllabus.map((item, index) => (
              <motion.div key={item.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-2">{item.percentage}</div>
                <p className="text-sm text-slate-600">{item.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Training */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Beaker className="w-4 h-4" />
                40% IBO Weightage
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Practical Skills Training</h2>
              <p className="text-lg text-slate-600 mb-8">
                IBO has a significant practical component (40% weightage). Our training covers all essential laboratory techniques
                required for international competition.
              </p>
              <ul className="space-y-4">
                {practicalSkills.map((skill) => (
                  <li key={skill} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">IBO Training Program</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <div className="font-semibold text-slate-900">Duration</div>
                  <div className="text-slate-600">3 months (Post-INBO)</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="font-semibold text-slate-900">Fee</div>
                  <div className="text-slate-600">₹45,000 (includes lab materials)</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="font-semibold text-slate-900">Eligibility</div>
                  <div className="text-slate-600">INBO qualifiers / Top NSEB performers</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="font-semibold text-slate-900">Batch Size</div>
                  <div className="text-slate-600">Maximum 8 students (intensive)</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-yellow-600 mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Gurugram Center</h2>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>Address:</strong> {CONTACT_INFO.location.gurugram.streetAddress}, {CONTACT_INFO.location.gurugram.addressLocality}
            </p>
            <p className="text-gray-700 mb-6">
              <strong>Landmark:</strong> Same building as Allen Career Institute
            </p>
            <div className="flex gap-4">
              <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                <Button variant="outline"><Phone className="w-4 h-4 mr-2" />Call Now</Button>
              </a>
              <Link href="/demo-booking">
                <Button>Book Consultation</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget title="Free NEET & Olympiad Tools" />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">IBO FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && <div className="px-6 pb-6"><p className="text-slate-600">{faq.answer}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/biology-olympiad-coaching-gurugram" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md">
              <h3 className="font-semibold text-teal-600">Biology Olympiad Gurugram</h3>
              <p className="text-sm text-gray-600">Complete olympiad coaching</p>
            </Link>
            <Link href="/nseb-coaching-gurugram" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md">
              <h3 className="font-semibold text-teal-600">NSEB Coaching Gurugram</h3>
              <p className="text-sm text-gray-600">Stage 1 preparation</p>
            </Link>
            <Link href="/ibo-preparation" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md">
              <h3 className="font-semibold text-teal-600">IBO Global Program</h3>
              <p className="text-sm text-gray-600">International students</p>
            </Link>
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md">
              <h3 className="font-semibold text-teal-600">NEET Coaching Gurugram</h3>
              <p className="text-sm text-gray-600">Medical entrance prep</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Compete at International Level?</h2>
          <p className="text-xl mb-8 opacity-90">Join our IBO preparation program in Gurugram</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button variant="secondary" size="xl" className="bg-white text-yellow-600 hover:bg-gray-100 font-bold">
                <Play className="w-5 h-5 mr-2" />
                Book Consultation
              </Button>
            </Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}>
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-yellow-600">
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
