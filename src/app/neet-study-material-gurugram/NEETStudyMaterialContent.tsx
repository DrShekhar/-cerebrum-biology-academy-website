'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle, ChevronRight, ChevronDown, MapPin, Phone, Home, BookOpen, Star, FileText, Download, Package, Truck, Laptop,
  ClipboardList, Image, Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { UrgencyBanner } from '@/components/landing-pages/UrgencyBanner'

interface FAQ { question: string; answer: string }

const materialIncludes = [
  { title: 'Theory Notes', description: '500+ pages of NCERT-based comprehensive notes with illustrations', icon: BookOpen, count: '500+ pages' },
  { title: 'MCQ Bank', description: 'Chapter-wise questions with detailed solutions and difficulty levels', icon: ClipboardList, count: '5000+ MCQs' },
  { title: 'Previous Year Questions', description: 'Complete PYQ collection from 2010-2024 with solutions', icon: FileText, count: '15 years' },
  { title: 'Chapter Tests', description: 'Practice tests for each chapter with OMR sheets', icon: ClipboardList, count: '100+ tests' },
  { title: 'Mock Tests', description: 'Full-length tests in NEET pattern with analysis', icon: Laptop, count: '20 mocks' },
  { title: 'Diagram Bank', description: 'High-quality diagrams and flowcharts for revision', icon: Image, count: '300+ diagrams' },
]

const successStats = [
  { stat: '5000+', label: 'Students Using Material' },
  { stat: '4.8/5', label: 'Material Rating' },
  { stat: '85%', label: 'Students Improved Scores' },
  { stat: '342', label: 'Reviews' },
]

const pricingOptions = [
  {
    name: 'Digital Only',
    price: '3,000',
    description: 'PDF format, instant download',
    features: ['All notes in PDF', 'MCQ bank (PDF + Online)', 'PYQ PDFs with solutions', 'Online test access', 'Diagram bank (high-res)', '1 year validity'],
    delivery: 'Instant download',
    popular: false,
  },
  {
    name: 'Physical Only',
    price: '5,000',
    description: 'Printed books, courier delivery',
    features: ['Printed notes (A4 bound)', 'MCQ book (printed)', 'PYQ book with solutions', 'OMR sheets included', 'Diagram booklet', 'Free revision sheets'],
    delivery: 'Courier in 3-5 days',
    popular: false,
  },
  {
    name: 'Complete Package',
    price: '6,500',
    description: 'Physical + Digital access',
    features: ['Everything in Physical', 'Everything in Digital', 'Online test portal access', 'Doubt support (30 days)', 'Updates for 1 year', 'Free sample tests'],
    delivery: 'Instant + Courier',
    popular: true,
  },
]

const chapters = [
  { unit: 'Diversity', chapters: ['Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom'] },
  { unit: 'Structural Organisation', chapters: ['Morphology of Plants', 'Anatomy of Plants', 'Animal Tissues'] },
  { unit: 'Cell Biology', chapters: ['Cell Structure', 'Cell Cycle', 'Biomolecules'] },
  { unit: 'Plant Physiology', chapters: ['Transport in Plants', 'Mineral Nutrition', 'Photosynthesis', 'Respiration', 'Plant Growth'] },
  { unit: 'Human Physiology', chapters: ['Digestion', 'Breathing', 'Circulation', 'Excretion', 'Movement', 'Neural Control', 'Chemical Coordination'] },
  { unit: 'Reproduction', chapters: ['Reproduction in Organisms', 'Sexual Reproduction in Plants', 'Human Reproduction', 'Reproductive Health'] },
  { unit: 'Genetics & Evolution', chapters: ['Inheritance', 'Molecular Basis', 'Evolution'] },
  { unit: 'Biology in Human Welfare', chapters: ['Human Health', 'Biotechnology Principles', 'Biotechnology Applications'] },
  { unit: 'Ecology', chapters: ['Organisms & Environment', 'Ecosystem', 'Biodiversity', 'Environmental Issues'] },
]

export default function NEETStudyMaterialContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'neet-study-material-gurugram',
      message: 'Hi! I am interested in NEET Biology study material. Please share details about the material packages and how to order.',
      campaign: 'study-material-gurugram',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600"><Home className="w-4 h-4" /></Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/neet-coaching-gurugram" className="text-gray-600 hover:text-teal-600">NEET Coaching Gurugram</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-orange-700 font-medium">Study Material</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-orange-600 to-red-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              2026 Edition Updated
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NEET Study Material
              <span className="block text-yellow-400 mt-2">for Gurugram Students</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Comprehensive NCERT-based study material with 5000+ MCQs, 15 years of PYQs,
              and chapter-wise tests. Physical or digital - choose what works for you.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <BookOpen className="w-5 h-5 text-yellow-400" />
                <span>500+ Pages Notes</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>5000+ MCQs</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Download className="w-5 h-5 text-green-400" />
                <span>Free Sample Available</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/resources/free">
                <Button variant="secondary" size="xl" className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold">
                  <Download className="w-5 h-5 mr-2" />Download Free Sample
                </Button>
              </Link>
              <motion.button whileHover={{ scale: 1.02 }} onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30">
                <Phone className="w-5 h-5" />Order Study Material
              </motion.button>
            </div>

            {/* Urgency Banner */}
            <UrgencyBanner batchStartDate="Feb 10, 2026" seatsTotal={50} seatsFilled={38} showCountdown={false} />
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
                <p className="text-3xl md:text-4xl font-bold text-orange-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What's Included in the Material</h2>
            <p className="text-xl text-slate-600">Everything you need for NEET Biology preparation</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materialIncludes.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{item.count}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Material Packages</h2>
            <p className="text-xl text-slate-600">Choose digital, physical, or both</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingOptions.map((plan, index) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-8 ${plan.popular ? 'bg-orange-50 border-2 border-orange-500 relative' : 'bg-gray-50 border-2 border-gray-200'}`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Best Value</div>}
                <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{plan.description}</p>
                <p className="text-4xl font-bold text-orange-600 mb-1">₹{plan.price}</p>
                <p className="text-sm text-slate-500 mb-6">{plan.delivery}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />{feature}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.popular ? 'bg-orange-600 hover:bg-orange-700' : ''}`} onClick={handleWhatsApp}>
                  Order Now
                </Button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-slate-500 mt-6">
            <Package className="w-4 h-4 inline mr-1" />
            Free delivery within Gurugram for orders above ₹3,000
          </p>
        </div>
      </section>

      {/* Chapters Covered */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Complete Syllabus Coverage</h2>
            <p className="text-xl text-slate-600">All NCERT chapters with extra focus on high-weightage topics</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {chapters.map((unit, index) => (
              <motion.div key={unit.unit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-orange-600 mb-3">{unit.unit}</h3>
                <ul className="space-y-1">
                  {unit.chapters.map((chapter) => (
                    <li key={chapter} className="text-sm text-slate-600 flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />{chapter}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Get Study Material</h2>
            <p className="text-xl text-orange-100">Multiple delivery options available</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Download className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Instant Download</h3>
              <p className="text-orange-100 text-sm">For digital packages. Get PDF access immediately after payment.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <MapPin className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Collect from Center</h3>
              <p className="text-orange-100 text-sm">Visit our Sector 51 center. Mon-Sat 9 AM - 7 PM. No extra charge.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Truck className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Home Delivery</h3>
              <p className="text-orange-100 text-sm">Courier to your address. 3-5 days in Gurugram. ₹200 delivery charge.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget title="Free NEET Preparation Tools" subtitle="Use our AI-powered tools alongside the study material" />

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
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">NEET Coaching</h3><p className="text-sm text-gray-600">Material included in fee</p></Link>
            <Link href="/neet-test-series-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Test Series</h3><p className="text-sm text-gray-600">Practice with mock tests</p></Link>
            <Link href="/online-neet-classes-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Online Classes</h3><p className="text-sm text-gray-600">Digital material included</p></Link>
            <Link href="/resources/free" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Free Resources</h3><p className="text-sm text-gray-600">Sample chapters</p></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Order your study material or download free sample chapters</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/resources/free"><Button variant="secondary" size="xl" className="bg-white text-orange-600 hover:bg-gray-100 font-bold"><Download className="w-5 h-5 mr-2" />Download Free Sample</Button></Link>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-orange-600" onClick={handleWhatsApp}><Phone className="w-5 h-5 mr-2" />Order on WhatsApp</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
