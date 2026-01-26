'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle, ChevronRight, ChevronDown, MapPin, Phone, Play, Home,
  Users, Target, Award, Clock, BookOpen, Star, RefreshCw, TrendingUp, Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ { question: string; answer: string }

const revisionHighlights = [
  { icon: RefreshCw, title: '2x Syllabus Coverage', description: 'Complete Biology covered twice in 3 months' },
  { icon: BookOpen, title: '2000+ MCQs', description: 'Handpicked high-yield questions' },
  { icon: Target, title: '20 Mock Tests', description: 'Full-length NEET pattern tests' },
  { icon: Zap, title: 'High-Yield Focus', description: '80% of NEET questions from 30% syllabus' },
]

const highYieldTopics = [
  { chapter: 'Human Physiology', weightage: '35%', questions: '60-65', priority: 'Highest' },
  { chapter: 'Genetics & Evolution', weightage: '20%', questions: '35-40', priority: 'High' },
  { chapter: 'Ecology & Environment', weightage: '15%', questions: '25-30', priority: 'High' },
  { chapter: 'Plant Physiology', weightage: '15%', questions: '25-30', priority: 'Medium' },
  { chapter: 'Cell Biology & Biomolecules', weightage: '15%', questions: '25-30', priority: 'Medium' },
]

const monthlyPlan = [
  { month: 'Month 1', focus: 'Rapid Concept Revision', topics: 'Complete NCERT line-by-line', mcqs: '600+' },
  { month: 'Month 2', focus: 'High-Yield Deep Dive', topics: 'Top 20 chapters in detail', mcqs: '800+' },
  { month: 'Month 3', focus: 'Test & Analysis', topics: 'Mock tests + weak area focus', mcqs: '600+' },
]

const successStats = [
  { stat: '580', label: 'Average Final Score' },
  { stat: '88%', label: 'Clear NEET Cutoff' },
  { stat: '2000+', label: 'MCQs Practiced' },
  { stat: '40-80', label: 'Marks Improvement' },
]

export default function NEETRevisionBatchContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'neet-revision-batch-gurugram',
      message: 'Hi! I am interested in the NEET Biology revision batch in Gurugram. Please share the next batch dates and fee details.',
      campaign: 'revision-batch-gurugram',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600"><Home className="w-4 h-4" /></Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/neet-coaching-gurugram" className="text-gray-600 hover:text-teal-600">NEET Coaching Gurugram</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-teal-700 font-medium">Revision Batch</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-teal-700 to-green-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <RefreshCw className="w-4 h-4" />
              Final 3-Month Intensive Revision
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NEET Revision Batch
              <span className="block text-yellow-400 mt-2">in Gurugram</span>
            </h1>

            <p className="text-xl text-slate-200 mb-8 max-w-3xl">
              3-month intensive revision program. Complete NCERT covered twice, 2000+ MCQs,
              high-yield topic focus. Average improvement: 40-80 marks.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <RefreshCw className="w-5 h-5 text-yellow-400" />
                <span>2x Syllabus Coverage</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Target className="w-5 h-5 text-yellow-400" />
                <span>2000+ MCQs</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>88% Success Rate</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 inline-block">
              <p className="text-white text-lg">3-Month Program: <span className="text-yellow-400 font-bold text-2xl">₹40,000</span></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold">
                  <Play className="w-5 h-5 mr-2" />Book Free Demo
                </Button>
              </Link>
              <motion.button whileHover={{ scale: 1.02 }} onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30">
                <Phone className="w-5 h-5" />Get Batch Details
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
                <p className="text-3xl md:text-4xl font-bold text-teal-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Revision Highlights */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What You Get in 3 Months</h2>
            <p className="text-xl text-slate-600">Complete revision package for final preparation</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {revisionHighlights.map((highlight, index) => (
              <motion.div key={highlight.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <highlight.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{highlight.title}</h3>
                <p className="text-slate-600 text-sm">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Yield Topics */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">High-Yield Topics Focus</h2>
            <p className="text-xl text-slate-600">30% syllabus covers 80% of NEET questions</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Chapter</th>
                  <th className="px-6 py-4 text-center">Weightage</th>
                  <th className="px-6 py-4 text-center">Expected Questions</th>
                  <th className="px-6 py-4 text-center">Priority</th>
                </tr>
              </thead>
              <tbody>
                {highYieldTopics.map((topic, index) => (
                  <tr key={topic.chapter} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{topic.chapter}</td>
                    <td className="px-6 py-4 text-center text-teal-600 font-semibold">{topic.weightage}</td>
                    <td className="px-6 py-4 text-center">{topic.questions}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        topic.priority === 'Highest' ? 'bg-red-100 text-red-700' :
                        topic.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>{topic.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Monthly Plan */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">3-Month Revision Plan</h2>
            <p className="text-xl text-teal-100">Structured approach to maximize your score</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {monthlyPlan.map((month, index) => (
              <motion.div key={month.month} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-2">{month.month}</h3>
                <p className="text-yellow-400 font-semibold mb-4">{month.focus}</p>
                <p className="text-teal-100 text-sm mb-4">{month.topics}</p>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">{month.mcqs} MCQs</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Batches */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Upcoming Revision Batches</h2>
                <p className="text-slate-600 mb-6">
                  Multiple batches available. Choose the one that fits your schedule.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-4 bg-teal-50 rounded-lg p-4">
                    <Clock className="w-6 h-6 text-teal-600" />
                    <div>
                      <p className="font-semibold">January Batch</p>
                      <p className="text-sm text-slate-500">For May NEET - 4 months before exam</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-teal-50 rounded-lg p-4">
                    <Clock className="w-6 h-6 text-teal-600" />
                    <div>
                      <p className="font-semibold">February Batch</p>
                      <p className="text-sm text-slate-500">Post-boards - 3 months intensive</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-teal-50 rounded-lg p-4">
                    <Clock className="w-6 h-6 text-teal-600" />
                    <div>
                      <p className="font-semibold">April Batch</p>
                      <p className="text-sm text-slate-500">Final 45-day revision</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <motion.button whileHover={{ scale: 1.02 }} onClick={handleWhatsApp}><Button><RefreshCw className="w-4 h-4 mr-2" />Join Revision Batch</Button></motion.button>
                  <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline"><Phone className="w-4 h-4 mr-2" />Call Now</Button></a>
                </div>
              </div>
              <div className="bg-teal-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Center Location</h3>
                <div className="space-y-3 mb-6">
                  <p className="flex items-center gap-2"><MapPin className="w-5 h-5 text-teal-600" />{CONTACT_INFO.location.gurugram.streetAddress}</p>
                  <p className="flex items-center gap-2"><Clock className="w-5 h-5 text-teal-600" />4-5 hours daily classes</p>
                </div>
                <h4 className="font-bold mb-3">What's Included</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Complete study material</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />2000+ MCQ bank</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />20 mock tests</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Daily doubt sessions</li>
                </ul>
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
            <Link href="/neet-crash-course-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Crash Course</h3><p className="text-sm text-gray-600">45-day intensive</p></Link>
            <Link href="/neet-test-series-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Test Series</h3><p className="text-sm text-gray-600">50+ mock tests</p></Link>
            <Link href="/neet-dropper-batch-2025-26-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Dropper Batch</h3><p className="text-sm text-gray-600">1-year program</p></Link>
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3><p className="text-sm text-gray-600">All programs</p></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-teal-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Final Revision?</h2>
          <p className="text-xl mb-8 opacity-90">Join our revision batch and improve by 40-80 marks</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking"><Button variant="secondary" size="xl" className="bg-white text-teal-600 hover:bg-gray-100 font-bold"><Play className="w-5 h-5 mr-2" />Book Free Demo</Button></Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-teal-600"><Phone className="w-5 h-5 mr-2" />Call Now</Button></a>
          </div>
        </div>
      </section>
    </main>
  )
}
