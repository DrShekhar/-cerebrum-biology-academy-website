'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle, ChevronRight, ChevronDown, MapPin, Phone, Home,
  Users, Award, Star, TrendingUp, Brain, Zap, MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO, getWhatsAppLink, getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import { TrustSignalsBanner } from '@/components/trust/TrustSignalsBanner'

interface FAQ {
  question: string
  answer: string
}

const institutes = [
  {
    name: 'Cerebrum',
    biologyFocus: 'Only Biology',
    faculty: 'AIIMS-trained (Dr. Shekhar, 15+ yrs)',
    batchSize: '10-12 students',
    mode: 'Online + Offline',
    feeRange: '₹24,000 - ₹98,000',
    mentorship: '1-on-1 weekly sessions',
    freeDemo: 'Yes (WhatsApp to book)',
    successRate: '98% (67+ AIIMS selections)',
    bestFor: 'Serious biology aspirants wanting personal attention',
    highlight: true,
  },
  {
    name: 'Allen',
    biologyFocus: 'All subjects',
    faculty: 'Mix of experienced',
    batchSize: '60-100+ students',
    mode: 'Offline + Online',
    feeRange: '₹1.5L - ₹3.5L',
    mentorship: 'Limited',
    freeDemo: 'Varies',
    successRate: 'High (national)',
    bestFor: 'All-subject comprehensive prep',
    highlight: false,
  },
  {
    name: 'Aakash',
    biologyFocus: 'All subjects',
    faculty: 'Mix, varies by center',
    batchSize: '40-80 students',
    mode: 'Offline + Online',
    feeRange: '₹1.2L - ₹2.8L',
    mentorship: 'Limited',
    freeDemo: 'Yes',
    successRate: 'High (national)',
    bestFor: 'Structured classroom learning',
    highlight: false,
  },
  {
    name: 'Physics Wallah',
    biologyFocus: 'All subjects',
    faculty: 'Top educators',
    batchSize: 'Online (unlimited)',
    mode: 'Online only',
    feeRange: '₹3,000 - ₹15,000',
    mentorship: 'None',
    freeDemo: 'Free content',
    successRate: 'Varies',
    bestFor: 'Budget-friendly online',
    highlight: false,
  },
  {
    name: 'Biomentors',
    biologyFocus: 'Only Biology',
    faculty: 'AIIMS doctors',
    batchSize: 'Online (medium)',
    mode: 'Online only',
    feeRange: '₹6,000 - ₹30,000',
    mentorship: 'Group doubt sessions',
    freeDemo: 'Trial available',
    successRate: 'Good',
    bestFor: 'Biology-focused online',
    highlight: false,
  },
  {
    name: 'NEETPrep',
    biologyFocus: 'Only Biology',
    faculty: 'Subject experts',
    batchSize: 'Online (self-paced)',
    mode: 'Online only',
    feeRange: '₹5,000 - ₹20,000',
    mentorship: 'None',
    freeDemo: 'Free trial',
    successRate: 'Good',
    bestFor: 'Self-study MCQ practice',
    highlight: false,
  },
]

const standoutReasons = [
  {
    icon: Brain,
    title: 'AIIMS Faculty',
    description: 'Dr. Shekhar C Singh (AIIMS-trained, 15+ years, Founder)',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: '10-12 students means every doubt gets answered',
  },
  {
    icon: TrendingUp,
    title: '98% Success Rate',
    description: '500+ students selected in NEET',
  },
  {
    icon: MessageCircle,
    title: 'Personalized Attention',
    description: 'Weekly 1-on-1 mentorship sessions',
  },
  {
    icon: Zap,
    title: 'Flexible Learning',
    description: 'Both Online & Offline options',
  },
  {
    icon: Award,
    title: 'Affordable',
    description: 'Starting at ₹24,000/year (3-10x cheaper than others)',
  },
]

const testimonials = [
  {
    text: 'Switched from Allen to Cerebrum. The personal attention changed everything. Scored 680/720 in NEET.',
    author: 'Priya S.',
    college: 'AIIMS Delhi',
  },
  {
    text: "PW was great for free content but I needed guidance. Dr. Shekhar's 1-on-1 sessions helped me improve from 520 to 650.",
    author: 'Rahul M.',
    college: 'NEET 2025',
  },
  {
    text: "Aakash batches were too large. At Cerebrum, Dr. Shekhar knows every student by name.",
    author: 'Sneha K.',
    college: 'Gurugram',
  },
]

export default function BestNEETBiologyCoachingContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = (message: string = 'Hi, I want to book a free demo class for NEET biology coaching') => {
    trackAndOpenWhatsApp({
      source: 'best-neet-biology-coaching',
      message,
      campaign: 'best-neet-biology-coaching',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-teal-600">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Best NEET Biology Coaching</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-green-700 to-teal-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-100 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Updated February 2026
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Best NEET Biology Coaching in India
              <span className="block text-yellow-300 mt-2">Honest Comparison (2026)</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-100 mb-8 max-w-3xl leading-relaxed">
              We compared 7 top coaching institutes so you don't have to. See how Cerebrum Biology Academy stacks
              up against Allen, Aakash, Physics Wallah, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={getWhatsAppLink('Hi, I want to book a free demo class for NEET biology coaching')}>
                <Button
                  size="lg"
                  className="bg-white text-green-700 hover:bg-yellow-300 font-bold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Book Free Demo (WhatsApp)
                </Button>
              </a>
              <a href={getPhoneLink()}>
                <Button variant="secondary" size="lg" className="bg-white/20 text-white hover:bg-white/30 font-bold">
                  <Phone className="w-5 h-5 mr-2" />
                  Call {getDisplayPhone()}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals — Social Proof */}
      <TrustSignalsBanner variant="compact" />

      {/* Comparison Table Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Detailed Comparison</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              See how the top 6 NEET biology coaching institutes compare across important factors
            </p>
          </motion.div>

          {/* Responsive Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="text-left px-4 py-3 font-bold text-slate-900">Feature</th>
                  <th className="text-left px-4 py-3 font-bold text-white bg-green-600">Cerebrum</th>
                  <th className="text-left px-4 py-3 font-bold text-slate-900">Allen</th>
                  <th className="text-left px-4 py-3 font-bold text-slate-900">Aakash</th>
                  <th className="text-left px-4 py-3 font-bold text-slate-900">Physics Wallah</th>
                  <th className="text-left px-4 py-3 font-bold text-slate-900">Biomentors</th>
                  <th className="text-left px-4 py-3 font-bold text-slate-900">NEETPrep</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: 'Biology Focus',
                    values: [
                      'Only Biology',
                      'All subjects',
                      'All subjects',
                      'All subjects',
                      'Only Biology',
                      'Only Biology',
                    ],
                  },
                  {
                    feature: 'Faculty',
                    values: [
                      'AIIMS-trained (Dr. Shekhar, 15+ yrs)',
                      'Mix of experienced',
                      'Mix, varies by center',
                      'Top educators',
                      'AIIMS doctors',
                      'Subject experts',
                    ],
                  },
                  {
                    feature: 'Batch Size',
                    values: [
                      '10-12 students',
                      '60-100+',
                      '40-80',
                      'Online (unlimited)',
                      'Online (medium)',
                      'Online (self-paced)',
                    ],
                  },
                  {
                    feature: 'Mode',
                    values: ['Online + Offline', 'Offline + Online', 'Offline + Online', 'Online only', 'Online only', 'Online only'],
                  },
                  {
                    feature: 'Annual Fee Range',
                    values: [
                      '₹24,000 - ₹98,000',
                      '₹1.5L - ₹3.5L',
                      '₹1.2L - ₹2.8L',
                      '₹3,000 - ₹15,000',
                      '₹6,000 - ₹30,000',
                      '₹5,000 - ₹20,000',
                    ],
                  },
                  {
                    feature: 'Personal Mentorship',
                    values: [
                      '1-on-1 weekly sessions',
                      'Limited',
                      'Limited',
                      'None',
                      'Group doubt sessions',
                      'None',
                    ],
                  },
                  {
                    feature: 'Free Demo',
                    values: [
                      'Yes (WhatsApp to book)',
                      'Varies',
                      'Yes',
                      'Free content',
                      'Trial available',
                      'Free trial',
                    ],
                  },
                  {
                    feature: 'Success Rate',
                    values: [
                      '98% (67+ AIIMS selections)',
                      'High (national)',
                      'High (national)',
                      'Varies',
                      'Good',
                      'Good',
                    ],
                  },
                ].map((row, idx) => (
                  <tr key={row.feature} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 border-b'}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{row.feature}</td>
                    {row.values.map((value, colIdx) => (
                      <td
                        key={`${row.feature}-${colIdx}`}
                        className={`px-4 py-3 text-sm ${
                          colIdx === 0
                            ? 'bg-green-50 font-medium text-green-900'
                            : 'text-slate-700'
                        }`}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 text-center text-sm text-slate-600"
          >
            Data compiled from official websites and student reviews (February 2026)
          </motion.p>
        </div>
      </section>

      {/* Why Cerebrum Stands Out */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Cerebrum Stands Out</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Key advantages that set Cerebrum apart from all other NEET biology coaching institutes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standoutReasons.map((reason, index) => {
              const Icon = reason.icon
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">
                    <Icon className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{reason.title}</h3>
                  <p className="text-slate-600">{reason.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Students Say</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Real testimonials from students who switched to Cerebrum
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-8 border border-green-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t border-green-200 pt-4">
                  <p className="font-semibold text-slate-900">{testimonial.author}</p>
                  <p className="text-sm text-slate-600">{testimonial.college}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Answers to common questions about best NEET biology coaching</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-slate-900 pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-600 shrink-0 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 py-4 bg-gray-50 border-t border-gray-200"
                  >
                    <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-700 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Still Not Sure? Talk to Us</h2>
            <p className="text-lg text-slate-100 mb-8 max-w-2xl mx-auto">
              Book a FREE demo class with Dr. Shekhar and see the difference yourself.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={getWhatsAppLink('Hi, I want to book a free demo class for NEET biology coaching')}>
                <Button size="lg" className="bg-white text-green-700 hover:bg-yellow-300 font-bold">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Demo Booking
                </Button>
              </a>
              <a href={getPhoneLink()}>
                <Button variant="secondary" size="lg" className="bg-white/20 text-white hover:bg-white/30 font-bold">
                  <Phone className="w-5 h-5 mr-2" />
                  Call {getDisplayPhone()}
                </Button>
              </a>
            </div>

            <p className="text-slate-200 text-sm mt-8">
              Pre-filled message: "Hi, I want to book a free demo class for NEET biology coaching"
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
