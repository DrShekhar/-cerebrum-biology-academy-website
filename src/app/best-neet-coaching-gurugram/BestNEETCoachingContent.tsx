'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle, ChevronRight, ChevronDown, MapPin, Phone, Play, Home,
  Users, Clock, BookOpen, Star, Award, Shield, TrendingUp, X, Check,
  GraduationCap, Building, Trophy,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { UrgencyBanner } from '@/components/landing-pages/UrgencyBanner'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ { question: string; answer: string }

const coachingComparison = [
  {
    name: 'Cerebrum Biology Academy',
    highlight: true,
    location: 'Sector 51, Gurugram',
    specialty: 'Biology Specialist',
    faculty: 'AIIMS Alumni (Dr. Shekhar Singh)',
    batchSize: '15-20 students',
    fees: '₹60,000/year',
    successRate: '98%',
    experience: '15+ years',
    features: ['AIIMS-trained faculty', 'Small batches', 'Personalized attention', 'Biology specialist', 'Gurugram-based'],
    cons: ['Biology only (refer partners for PCM)'],
    rating: 4.9,
    reviews: 400,
  },
  {
    name: 'Allen Career Institute',
    highlight: false,
    location: 'Multiple centers',
    specialty: 'All subjects',
    faculty: 'Mixed faculty',
    batchSize: '80-120 students',
    fees: '₹1,50,000-2,00,000/year',
    successRate: '85% (claimed)',
    experience: '30+ years',
    features: ['All subjects covered', 'Brand recognition', 'Pan-India presence'],
    cons: ['Large batches', 'Less personal attention', 'Higher fees', 'Travel to Delhi often needed'],
    rating: 4.3,
    reviews: 2500,
  },
  {
    name: 'Aakash Institute',
    highlight: false,
    location: 'Sector 14, Gurugram',
    specialty: 'All subjects',
    faculty: 'Mixed faculty',
    batchSize: '60-100 students',
    fees: '₹1,40,000-1,80,000/year',
    successRate: '80% (claimed)',
    experience: '35+ years',
    features: ['All subjects covered', 'Established brand', 'Test series'],
    cons: ['Large batches', 'Cookie-cutter approach', 'Higher fees'],
    rating: 4.1,
    reviews: 1800,
  },
  {
    name: 'FIITJEE',
    highlight: false,
    location: 'Sector 43, Gurugram',
    specialty: 'IIT-JEE (NEET secondary)',
    faculty: 'Mixed faculty',
    batchSize: '50-80 students',
    fees: '₹1,60,000-2,20,000/year',
    successRate: '75% for NEET',
    experience: '25+ years',
    features: ['Strong in Physics/Math', 'Brand value'],
    cons: ['JEE-focused, NEET secondary', 'Large batches', 'Highest fees'],
    rating: 4.2,
    reviews: 1200,
  },
]

const whyChooseCerebrum = [
  { title: 'AIIMS Faculty', description: 'Dr. Shekhar Singh is an AIIMS New Delhi alumnus with 15+ years teaching experience', icon: GraduationCap },
  { title: 'Small Batches', description: 'Only 15-20 students per batch ensures personalized attention and doubt clearing', icon: Users },
  { title: 'Biology Specialist', description: 'We focus exclusively on Biology - the highest scoring subject in NEET (360/720)', icon: BookOpen },
  { title: 'Local Convenience', description: 'Gurugram-based center saves 2-3 hours daily commute to Delhi', icon: MapPin },
  { title: '98% Success Rate', description: 'Verified results with students in top medical colleges across India', icon: Trophy },
  { title: 'Affordable Fees', description: 'Premium coaching at ₹60,000/year - less than half of big brands', icon: Shield },
]

const successStats = [
  { stat: '98%', label: 'Success Rate' },
  { stat: '15+', label: 'Years Experience' },
  { stat: '4.9/5', label: 'Google Rating' },
  { stat: '₹60K', label: 'Annual Fees' },
]

export default function BestNEETCoachingContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      message: 'Hi! I want to compare NEET coaching options in Gurugram. Can you help me understand why Cerebrum is the best choice for Biology preparation?',
      source: 'best-neet-coaching-gurugram',
      medium: 'comparison-page',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ol className="flex items-center text-sm flex-wrap">
            <li><Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center"><Home className="w-4 h-4 mr-1" />Home</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/neet-coaching-gurugram" className="text-gray-500 hover:text-gray-700">NEET Coaching Gurugram</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-green-700 font-medium">Best NEET Coaching</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-4 h-4" />
              2026 Comparison Guide
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Best NEET Coaching
              <span className="block text-yellow-400 mt-2">in Gurugram 2026</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Unbiased comparison of top NEET coaching institutes in Gurugram.
              Fees, faculty credentials, batch sizes, and success rates - everything you need to make the right choice.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Building className="w-5 h-5 text-yellow-400" />
                <span>5 Institutes Compared</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>Verified Information</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Clock className="w-5 h-5 text-green-400" />
                <span>Updated Jan 2026</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold">
                  <Play className="w-5 h-5 mr-2" />Book Free Demo at Cerebrum
                </Button>
              </Link>
              <motion.button whileHover={{ scale: 1.02 }} onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30">
                <Phone className="w-5 h-5" />Get Personalized Guidance
              </motion.button>
            </div>

            <UrgencyBanner batchStartDate="Feb 10, 2026" seatsTotal={20} seatsFilled={15} showCountdown={true} />
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Compare Top NEET Coaching Institutes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Side-by-side comparison of leading coaching centers in Gurugram. Make an informed decision for your NEET journey.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <div className="grid gap-6">
              {coachingComparison.map((institute, index) => (
                <motion.div
                  key={institute.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden ${institute.highlight ? 'ring-2 ring-green-500' : ''}`}
                >
                  {institute.highlight && (
                    <div className="bg-green-500 text-white text-center py-2 text-sm font-semibold">
                      Recommended for Biology Excellence
                    </div>
                  )}
                  <div className="p-6 md:p-8">
                    <div className="grid md:grid-cols-4 gap-6">
                      {/* Institute Info */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{institute.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{institute.location}</p>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(institute.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">{institute.rating} ({institute.reviews}+)</span>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${institute.highlight ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {institute.specialty}
                        </span>
                      </div>

                      {/* Key Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Faculty</p>
                          <p className="font-semibold text-gray-900 text-sm">{institute.faculty}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Batch Size</p>
                          <p className="font-semibold text-gray-900">{institute.batchSize}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fees</p>
                          <p className="font-semibold text-gray-900">{institute.fees}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Success Rate</p>
                          <p className="font-semibold text-green-600">{institute.successRate}</p>
                        </div>
                      </div>

                      {/* Pros */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Strengths</p>
                        <ul className="space-y-1">
                          {institute.features.slice(0, 4).map((feature) => (
                            <li key={feature} className="flex items-center text-sm text-gray-600">
                              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cons */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Considerations</p>
                        <ul className="space-y-1">
                          {institute.cons.map((con) => (
                            <li key={con} className="flex items-center text-sm text-gray-600">
                              <X className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Cerebrum */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Students Choose Cerebrum</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover why 500+ Gurugram students trust Cerebrum Biology Academy for their NEET Biology preparation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseCerebrum.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {successStats.map((item) => (
              <div key={item.label}>
                <p className="text-4xl md:text-5xl font-bold">{item.stat}</p>
                <p className="text-sm mt-1 opacity-90">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Start your preparation with our AI-powered tools - 100% Free"
      />

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Common questions about choosing NEET coaching in Gurugram</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Choose the Best?</h2>
          <p className="text-xl mb-8 opacity-90">Book a free demo class and experience why students call us the best for Biology</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button variant="secondary" size="xl" className="bg-white text-green-600 hover:bg-gray-100 font-bold">
                <Play className="w-5 h-5 mr-2" />Book Free Demo
              </Button>
            </Link>
            <motion.button whileHover={{ scale: 1.02 }} onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-4 rounded-xl font-semibold border border-white/30">
              <Phone className="w-5 h-5" />WhatsApp Us
            </motion.button>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Explore More</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3>
              <p className="text-sm text-gray-600">All Gurugram programs</p>
            </Link>
            <Link href="/cbse-neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">CBSE NEET Coaching</h3>
              <p className="text-sm text-gray-600">Board-aligned program</p>
            </Link>
            <Link href="/online-neet-classes-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Online Classes</h3>
              <p className="text-sm text-gray-600">Learn from home</p>
            </Link>
            <Link href="/neet-study-material-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-teal-600">Study Material</h3>
              <p className="text-sm text-gray-600">Notes, MCQs, tests</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
