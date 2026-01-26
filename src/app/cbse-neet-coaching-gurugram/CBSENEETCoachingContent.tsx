'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle, ChevronRight, ChevronDown, MapPin, Phone, Play, Home,
  Users, Target, Award, Clock, BookOpen, Star, GraduationCap, FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ { question: string; answer: string }

const cbseSchools = [
  { name: 'DPS Gurugram', sector: 'Sector 45', students: '85+' },
  { name: 'The Shri Ram School', sector: 'DLF Phase 3', students: '65+' },
  { name: 'GD Goenka World School', sector: 'Sohna Road', students: '55+' },
  { name: 'Amity International', sector: 'Sector 46', students: '45+' },
  { name: 'Scottish High International', sector: 'Sector 57', students: '40+' },
  { name: 'Blue Bells Model School', sector: 'Sector 4', students: '35+' },
  { name: 'K.R. Mangalam World School', sector: 'Sector 51', students: '30+' },
  { name: 'Heritage Xperiential', sector: 'Sector 62', students: '25+' },
]

const ncertAdvantages = [
  { title: '100% NCERT Coverage', description: 'Every line, diagram, and example from NCERT is covered thoroughly.', icon: BookOpen },
  { title: 'Board + NEET Integration', description: 'Prepare for both exams simultaneously with our unified approach.', icon: FileText },
  { title: 'CBSE School Alignment', description: 'Batch timings designed around Gurugram CBSE school schedules.', icon: Clock },
  { title: 'AIIMS Faculty', description: 'Learn from Dr. Shekhar (AIIMS alumnus) who understands NCERT deeply.', icon: GraduationCap },
]

const successStats = [
  { stat: '320+', label: 'Average Biology Score' },
  { stat: '85%', label: 'Clear NEET Cutoff' },
  { stat: '95%', label: 'Board Exam Average' },
  { stat: '500+', label: 'CBSE Students Enrolled' },
]

export default function CBSENEETCoachingContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'cbse-neet-coaching-gurugram',
      message: 'Hi! I am a CBSE board student in Gurugram looking for NEET Biology coaching. Please share details about batches and fees.',
      campaign: 'cbse-neet-gurugram',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600"><Home className="w-4 h-4" /></Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/neet-coaching-gurugram" className="text-gray-600 hover:text-teal-600">NEET Coaching Gurugram</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-teal-700 font-medium">CBSE NEET Coaching</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              100% NCERT-Based Approach
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              CBSE Board
              <span className="block text-yellow-400 mt-2">NEET Coaching in Gurugram</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Maximize your CBSE advantage for NEET. Our NCERT-focused coaching helps you excel in both
              board exams and NEET with 98% success rate.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <BookOpen className="w-5 h-5 text-yellow-400" />
                <span>NCERT Line-by-Line</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>320+ Avg Biology Score</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-green-400" />
                <span>500+ CBSE Students</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold">
                  <Play className="w-5 h-5 mr-2" />Book Free Demo Class
                </Button>
              </Link>
              <motion.button whileHover={{ scale: 1.02 }} onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30">
                <Phone className="w-5 h-5" />Get CBSE Batch Details
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {successStats.map((item, index) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NCERT Advantages */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why CBSE Students Excel with Us</h2>
            <p className="text-xl text-slate-600">Leverage your NCERT foundation for NEET success</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ncertAdvantages.map((advantage, index) => (
              <motion.div key={advantage.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <advantage.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{advantage.title}</h3>
                <p className="text-slate-600 text-sm">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CBSE Schools */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Students from Top CBSE Schools</h2>
            <p className="text-xl text-slate-600">Trusted by students from premier Gurugram CBSE schools</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cbseSchools.map((school, index) => (
              <motion.div key={school.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{school.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{school.sector}</p>
                <p className="text-2xl font-bold text-blue-600">{school.students}</p>
                <p className="text-xs text-slate-500">Students Enrolled</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board + NEET Integration */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Board + NEET = One Preparation</h2>
              <p className="text-xl text-blue-100 mb-6">
                CBSE Biology and NEET Biology are essentially the same syllabus. Our integrated approach
                ensures you score 95%+ in boards AND clear NEET with high marks.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />NCERT line-by-line coverage for boards</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />NEET-level MCQ practice from day one</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Previous year NEET + board questions</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Diagram practice for both exams</li>
              </ul>
              <Link href="/demo-booking">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  <Play className="w-4 h-4 mr-2" />Start Integrated Preparation
                </Button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">CBSE Student Results 2024</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-white/20"><span>Average NEET Biology</span><span className="font-semibold">324/360</span></div>
                <div className="flex justify-between py-3 border-b border-white/20"><span>Average Board Score</span><span className="font-semibold">95.2%</span></div>
                <div className="flex justify-between py-3 border-b border-white/20"><span>Students Above 340</span><span className="font-semibold">42%</span></div>
                <div className="flex justify-between py-3"><span>NEET Qualified</span><span className="font-semibold text-green-400">85%</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Convenient Location for CBSE Students</h2>
                <p className="text-slate-600 mb-6">
                  Our center at <strong>M2K Corporate Park, Sector 51</strong> is centrally located,
                  easily accessible from all major CBSE schools in Gurugram.
                </p>
                <div className="space-y-3 mb-6">
                  <p className="flex items-center gap-2"><MapPin className="w-5 h-5 text-blue-600" />{CONTACT_INFO.location.gurugram.streetAddress}</p>
                  <p className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-600" />Morning, Evening & Weekend Batches</p>
                </div>
                <div className="flex gap-4">
                  <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline"><Phone className="w-4 h-4 mr-2" />Call Now</Button></a>
                  <a href={CONTACT_INFO.location.gurugram.mapUrl} target="_blank" rel="noopener"><Button><MapPin className="w-4 h-4 mr-2" />Get Directions</Button></a>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Batch Timings for CBSE Schools</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b"><span>Morning Batch</span><span className="font-semibold">6:30 - 8:30 AM</span></div>
                  <div className="flex justify-between py-2 border-b"><span>Evening Batch</span><span className="font-semibold">5:00 - 7:00 PM</span></div>
                  <div className="flex justify-between py-2 border-b"><span>Weekend Batch</span><span className="font-semibold">Sat-Sun Full Day</span></div>
                  <div className="flex justify-between py-2"><span>Online Option</span><span className="font-semibold text-green-600">Available</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget title="Free NEET Preparation Tools" subtitle="Use our AI-powered tools to boost your preparation" />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm">
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
            <Link href="/icse-neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">ICSE NEET Coaching</h3><p className="text-sm text-gray-600">For ICSE board students</p></Link>
            <Link href="/neet-foundation-class-11-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Class 11 Foundation</h3><p className="text-sm text-gray-600">Start early preparation</p></Link>
            <Link href="/neet-foundation-class-12-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Class 12 Intensive</h3><p className="text-sm text-gray-600">Board year preparation</p></Link>
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3><p className="text-sm text-gray-600">All programs</p></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Maximize Your CBSE Advantage?</h2>
          <p className="text-xl mb-8 opacity-90">Join 500+ CBSE students excelling in NEET with our NCERT-focused coaching</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking"><Button variant="secondary" size="xl" className="bg-white text-blue-600 hover:bg-gray-100 font-bold"><Play className="w-5 h-5 mr-2" />Book Free Demo</Button></Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-blue-600"><Phone className="w-5 h-5 mr-2" />Call Now</Button></a>
          </div>
        </div>
      </section>
    </main>
  )
}
