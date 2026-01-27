'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle, ChevronRight, ChevronDown, MapPin, Phone, Play, Home,
  Users, Clock, BookOpen, Star, GraduationCap, FileText, ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ { question: string; answer: string }

const icseSchools = [
  { name: 'Pathways World School', sector: 'Aravalli Hills', students: '45+' },
  { name: 'Lancers International', sector: 'Sector 14', students: '40+' },
  { name: 'Suncity World School', sector: 'Sector 54', students: '35+' },
  { name: 'Presidium School', sector: 'Sector 57', students: '30+' },
  { name: 'Alpine Convent School', sector: 'Sector 10', students: '25+' },
  { name: 'Salwan Public School', sector: 'Sector 15', students: '20+' },
  { name: 'Lotus Valley International', sector: 'Sector 50', students: '18+' },
  { name: 'Vedanta International', sector: 'Sector 48', students: '15+' },
]

const bridgeAdvantages = [
  { title: 'ICSE-to-NCERT Bridge', description: 'Map your strong ICSE concepts to NCERT format and terminology.', icon: ArrowRight },
  { title: 'Conceptual Depth Leverage', description: 'Use your deeper ICSE understanding to master NEET Biology.', icon: BookOpen },
  { title: 'Terminology Alignment', description: 'Learn NCERT-specific terms that differ from ICSE textbooks.', icon: FileText },
  { title: 'AIIMS Faculty', description: 'Learn from Dr. Shekhar who understands both boards thoroughly.', icon: GraduationCap },
]

const successStats = [
  { stat: '310+', label: 'Average Biology Score' },
  { stat: '82%', label: 'Clear NEET Cutoff' },
  { stat: '93%', label: 'Board Exam Average' },
  { stat: '200+', label: 'ICSE Students Enrolled' },
]

const bridgeTopics = [
  { icse: 'Transpiration Stream', ncert: 'Ascent of Sap', chapter: 'Transport in Plants' },
  { icse: 'Clotting Factors', ncert: 'Coagulation of Blood', chapter: 'Body Fluids & Circulation' },
  { icse: 'Monohybrid Cross', ncert: 'Law of Dominance', chapter: 'Principles of Inheritance' },
  { icse: 'Food Chain Energy', ncert: '10% Law', chapter: 'Ecosystem' },
  { icse: 'Secretin Discovery', ncert: 'Hormonal Control', chapter: 'Chemical Coordination' },
]

export default function ICSENEETCoachingContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'icse-neet-coaching-gurugram',
      message: 'Hi! I am an ICSE board student in Gurugram looking for NEET Biology coaching. Please share details about ICSE-to-NCERT bridge program.',
      campaign: 'icse-neet-gurugram',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600"><Home className="w-4 h-4" /></Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/neet-coaching-gurugram" className="text-gray-600 hover:text-teal-600">NEET Coaching Gurugram</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-purple-700 font-medium">ICSE NEET Coaching</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-purple-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ArrowRight className="w-4 h-4" />
              ICSE-to-NCERT Bridge Program
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              ICSE Board
              <span className="block text-yellow-400 mt-2">NEET Coaching in Gurugram</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Leverage your ICSE conceptual depth for NEET success. Our bridge program translates your
              strong foundation to NCERT format for optimal results.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <ArrowRight className="w-5 h-5 text-yellow-400" />
                <span>ICSE-NCERT Bridge</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>310+ Avg Biology Score</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-green-400" />
                <span>200+ ICSE Students</span>
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
                <Phone className="w-5 h-5" />Get ICSE Batch Details
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
                <p className="text-3xl md:text-4xl font-bold text-purple-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge Advantages */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why ICSE Students Excel with Us</h2>
            <p className="text-xl text-slate-600">Bridge your conceptual strength to NEET success</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bridgeAdvantages.map((advantage, index) => (
              <motion.div key={advantage.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <advantage.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{advantage.title}</h3>
                <p className="text-slate-600 text-sm">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ICSE to NCERT Bridge Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">ICSE to NCERT Terminology Bridge</h2>
            <p className="text-xl text-slate-600">Sample terminology differences we help you master</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">ICSE Term</th>
                  <th className="px-6 py-4 text-left">NCERT Term</th>
                  <th className="px-6 py-4 text-left">Chapter</th>
                </tr>
              </thead>
              <tbody>
                {bridgeTopics.map((topic, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-slate-900">{topic.icse}</td>
                    <td className="px-6 py-4 text-purple-600 font-semibold">{topic.ncert}</td>
                    <td className="px-6 py-4 text-slate-600">{topic.chapter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-slate-500 mt-4 text-sm">This is just a sample. Our bridge program covers 200+ such terminology differences.</p>
        </div>
      </section>

      {/* ICSE Schools */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Students from Top ICSE Schools</h2>
            <p className="text-xl text-slate-600">Trusted by students from premier Gurugram ICSE/ISC schools</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {icseSchools.map((school, index) => (
              <motion.div key={school.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{school.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{school.sector}</p>
                <p className="text-2xl font-bold text-purple-600">{school.students}</p>
                <p className="text-xs text-slate-500">Students Enrolled</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ICSE Advantage */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Your ICSE Foundation is an Asset</h2>
              <p className="text-xl text-purple-100 mb-6">
                ICSE students have deeper conceptual understanding than CBSE students in many topics.
                The only gap is NCERT-specific format. We bridge that gap while leveraging your strength.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Deeper understanding of physiological processes</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Better practical knowledge from ICSE labs</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Strong application-based thinking</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Just need NCERT terminology alignment</li>
              </ul>
              <Link href="/demo-booking">
                <Button className="bg-white text-purple-600 hover:bg-purple-50">
                  <Play className="w-4 h-4 mr-2" />Start Bridge Program
                </Button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">ICSE Student Results 2024</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-white/20"><span>Average NEET Biology</span><span className="font-semibold">312/360</span></div>
                <div className="flex justify-between py-3 border-b border-white/20"><span>Average ISC Biology</span><span className="font-semibold">93.4%</span></div>
                <div className="flex justify-between py-3 border-b border-white/20"><span>Students Above 330</span><span className="font-semibold">35%</span></div>
                <div className="flex justify-between py-3"><span>NEET Qualified</span><span className="font-semibold text-green-400">82%</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Convenient Location for ICSE Students</h2>
                <p className="text-slate-600 mb-6">
                  Our center at <strong>M2K Corporate Park, Sector 51</strong> is centrally located,
                  easily accessible from all major ICSE schools in Gurugram.
                </p>
                <div className="space-y-3 mb-6">
                  <p className="flex items-center gap-2"><MapPin className="w-5 h-5 text-purple-600" />{CONTACT_INFO.location.gurugram.streetAddress}</p>
                  <p className="flex items-center gap-2"><Clock className="w-5 h-5 text-purple-600" />Morning, Evening & Weekend Batches</p>
                </div>
                <div className="flex gap-4">
                  <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline"><Phone className="w-4 h-4 mr-2" />Call Now</Button></a>
                  <a href={CONTACT_INFO.location.gurugram.mapUrl} target="_blank" rel="noopener"><Button><MapPin className="w-4 h-4 mr-2" />Get Directions</Button></a>
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Batch Timings for ICSE Schools</h3>
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

      {/* School-Specific Pages */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">NEET Coaching for ICSE Schools</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/biology-classes-suncity-school-gurgaon" className="bg-purple-50 p-4 rounded-xl hover:shadow-md transition-shadow"><h3 className="font-semibold text-purple-700">Suncity World School</h3><p className="text-sm text-gray-600">35+ students enrolled</p></Link>
            <Link href="/biology-classes-heritage-school-gurgaon" className="bg-purple-50 p-4 rounded-xl hover:shadow-md transition-shadow"><h3 className="font-semibold text-purple-700">Heritage Xperiential</h3><p className="text-sm text-gray-600">25+ students enrolled</p></Link>
            <Link href="/biology-classes-scottish-high-gurgaon" className="bg-purple-50 p-4 rounded-xl hover:shadow-md transition-shadow"><h3 className="font-semibold text-purple-700">Scottish High International</h3><p className="text-sm text-gray-600">40+ students enrolled</p></Link>
            <Link href="/biology-classes-manav-rachna-gurgaon" className="bg-purple-50 p-4 rounded-xl hover:shadow-md transition-shadow"><h3 className="font-semibold text-purple-700">Manav Rachna School</h3><p className="text-sm text-gray-600">30+ students enrolled</p></Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/cbse-neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow"><h3 className="font-semibold text-teal-600">CBSE NEET Coaching</h3><p className="text-sm text-gray-600">For CBSE board students</p></Link>
            <Link href="/online-neet-classes-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow"><h3 className="font-semibold text-teal-600">Online NEET Classes</h3><p className="text-sm text-gray-600">Live interactive sessions</p></Link>
            <Link href="/neet-study-material-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow"><h3 className="font-semibold text-teal-600">NEET Study Material</h3><p className="text-sm text-gray-600">Notes, MCQs, tests</p></Link>
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow"><h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3><p className="text-sm text-gray-600">All programs</p></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Bridge Your ICSE Foundation to NEET Success?</h2>
          <p className="text-xl mb-8 opacity-90">Join 200+ ICSE students excelling in NEET with our bridge program</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking"><Button variant="secondary" size="xl" className="bg-white text-purple-600 hover:bg-gray-100 font-bold"><Play className="w-5 h-5 mr-2" />Book Free Demo</Button></Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-purple-600"><Phone className="w-5 h-5 mr-2" />Call Now</Button></a>
          </div>
        </div>
      </section>
    </main>
  )
}
