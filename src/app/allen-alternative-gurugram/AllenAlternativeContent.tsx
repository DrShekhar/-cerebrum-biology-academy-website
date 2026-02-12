'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle, XCircle, ChevronRight, ChevronDown, MapPin, Phone, Play, Home,
  Users, Target, Award, Clock, BookOpen, Zap, Star, ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ { question: string; answer: string }

const comparisonData = [
  { feature: 'Batch Size', cerebrum: '10-20 students', allen: '80-100+ students', winner: 'cerebrum' },
  { feature: 'Personal Attention', cerebrum: 'High - Know every student', allen: 'Low - Mass batches', winner: 'cerebrum' },
  { feature: 'Faculty', cerebrum: 'AIIMS Alumnus (Dr. Shekhar)', allen: 'Rotating faculty', winner: 'cerebrum' },
  { feature: 'Subject Focus', cerebrum: 'Biology Specialized', allen: 'All subjects', winner: 'cerebrum' },
  { feature: 'Doubt Clearing', cerebrum: 'Daily 1-on-1 sessions', allen: 'Crowded doubt counters', winner: 'cerebrum' },
  { feature: 'Study Material', cerebrum: 'Curated NCERT-focused', allen: 'Comprehensive but bulky', winner: 'tie' },
  { feature: 'Mock Tests', cerebrum: '50+ NEET pattern tests', allen: '30+ tests', winner: 'cerebrum' },
  { feature: 'Fee Structure', cerebrum: '₹45K - ₹1.56L/year', allen: '₹1.2L - ₹2L/year', winner: 'cerebrum' },
  { feature: 'Success Rate', cerebrum: '98% (Biology)', allen: '~85% (All subjects)', winner: 'cerebrum' },
  { feature: 'Online Option', cerebrum: 'Full hybrid model', allen: 'Limited online', winner: 'cerebrum' },
]

const reasons = [
  { title: 'Lost in the Crowd?', description: 'Allen\'s 100+ student batches mean less individual attention. At Cerebrum, every student is known by name.', icon: Users },
  { title: 'Biology Needs Depth', description: 'Generic coaching covers Biology superficially. Our AIIMS faculty dives deep into concepts.', icon: BookOpen },
  { title: 'Doubt Resolution', description: 'Tired of waiting at doubt counters? Get daily 1-on-1 doubt clearing with our faculty.', icon: Zap },
  { title: 'Affordable Excellence', description: 'Get premium coaching at 20-30% lower fees with significantly better student-teacher ratio.', icon: Target },
]

const testimonials = [
  { name: 'Ananya R.', score: '658/720', previous: 'Ex-Allen Student', quote: 'Switched to Cerebrum in Class 12. The personal attention made all the difference. Biology score jumped from 280 to 340.' },
  { name: 'Rohit M.', score: '615/720', previous: 'Allen + Cerebrum', quote: 'Continued Allen for Physics/Chemistry but joined Cerebrum for Biology. Best decision - Biology became my strongest subject.' },
  { name: 'Priya S.', score: '642/720', previous: 'Dropper from Allen', quote: 'After a disappointing first attempt at Allen, Cerebrum\'s focused approach helped me improve by 120 marks.' },
]

export default function AllenAlternativeContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'allen-alternative-gurugram',
      message: 'Hi! I am currently at Allen/considering Allen and want to know about Cerebrum as an alternative for NEET Biology. Please share details.',
      campaign: 'allen-alternative-gurugram',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600"><Home className="w-4 h-4" /></Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/neet-coaching-gurugram" className="text-gray-600 hover:text-teal-600">NEET Coaching Gurugram</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-teal-700 font-medium">Allen Alternative</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-red-900 to-orange-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              1,50,000+ Students Switched from Allen
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Looking for an
              <span className="block text-yellow-400 mt-2">Allen Alternative in Gurugram?</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Tired of 100+ student batches? Want personal attention from AIIMS faculty?
              Discover why 500+ Gurugram students chose Cerebrum for focused NEET Biology preparation.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-yellow-400" />
                <span>10-20 Students/Batch</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Target className="w-5 h-5 text-green-400" />
                <span>20-30% Lower Fees</span>
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
                <Phone className="w-5 h-5" />Compare with Allen Expert
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Switch */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Students Switch from Allen</h2>
            <p className="text-xl text-slate-600">Common pain points that bring students to Cerebrum</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, index) => (
              <motion.div key={reason.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{reason.title}</h3>
                <p className="text-slate-600 text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Cerebrum vs Allen: Head-to-Head</h2>
            <p className="text-xl text-slate-600">See why focused coaching beats mass batches</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center bg-teal-700">Cerebrum</th>
                  <th className="px-6 py-4 text-center">Allen</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center bg-teal-50">
                      <span className="flex items-center justify-center gap-2">
                        {row.winner === 'cerebrum' && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {row.cerebrum}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600">
                      <span className="flex items-center justify-center gap-2">
                        {row.winner === 'cerebrum' && <XCircle className="w-5 h-5 text-red-400" />}
                        {row.allen}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Complement Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't Want to Leave Allen?<br />Complement Your Coaching!</h2>
              <p className="text-xl text-blue-100 mb-6">
                Many students continue at Allen for Physics & Chemistry while joining Cerebrum specifically for Biology.
                Get the best of both worlds.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Weekend batches that don't clash with Allen</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Evening sessions for extra Biology practice</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Same building as Allen - no extra travel</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" />Focused Biology boost for your weak areas</li>
              </ul>
              <Link href="/complement-allen-coaching-gurugram">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Learn About Complementary Coaching <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Success Stories: Allen + Cerebrum</h3>
              {testimonials.slice(1, 2).map((t) => (
                <div key={t.name} className="mb-6">
                  <p className="text-blue-100 italic mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 font-bold">{t.name[0]}</div>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-blue-200">{t.score} | {t.previous}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials from Allen Switchers */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">From Allen Students Who Switched</h2>
            <p className="text-xl text-slate-600">Real results from students who made the change</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-lg">{t.name[0]}</div>
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.previous}</p>
                  </div>
                  <div className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">{t.score}</div>
                </div>
                <p className="text-slate-600 italic">"{t.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Conveniently Located Near Allen</h2>
                <p className="text-slate-600 mb-6">
                  Our Gurugram center is in the <strong>same building as Allen Career Institute</strong> - M2K Corporate Park, Sector 51.
                  Whether you're switching or complementing, there's no extra travel time.
                </p>
                <div className="space-y-3 mb-6">
                  <p className="flex items-center gap-2"><MapPin className="w-5 h-5 text-red-600" />{CONTACT_INFO.location.gurugram.streetAddress}</p>
                  <p className="flex items-center gap-2"><Clock className="w-5 h-5 text-red-600" />5 min walk from Sector 55-56 Rapid Metro</p>
                </div>
                <div className="flex gap-4">
                  <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline"><Phone className="w-4 h-4 mr-2" />Call Now</Button></a>
                  <a href={CONTACT_INFO.location.gurugram.mapUrl} target="_blank" rel="noopener"><Button><MapPin className="w-4 h-4 mr-2" />Get Directions</Button></a>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4">Quick Comparison</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b"><span>Same Building</span><span className="text-green-600 font-semibold">Yes</span></div>
                  <div className="flex justify-between py-2 border-b"><span>Flexible Timings</span><span className="text-green-600 font-semibold">Yes</span></div>
                  <div className="flex justify-between py-2 border-b"><span>Trial Class</span><span className="text-green-600 font-semibold">7 Days Free</span></div>
                  <div className="flex justify-between py-2"><span>Refund Policy</span><span className="text-green-600 font-semibold">Money-Back Guarantee</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget title="Free NEET Preparation Tools" subtitle="Use our AI-powered tools to boost your preparation" />

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/aakash-alternative-gurugram" className="bg-gray-50 p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Aakash Alternative</h3><p className="text-sm text-gray-600">Compare with Aakash</p></Link>
            <Link href="/complement-allen-coaching-gurugram" className="bg-gray-50 p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Complement Allen</h3><p className="text-sm text-gray-600">Add Biology support</p></Link>
            <Link href="/affordable-neet-coaching-gurugram" className="bg-gray-50 p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Affordable Coaching</h3><p className="text-sm text-gray-600">Budget-friendly options</p></Link>
            <Link href="/neet-coaching-gurugram" className="bg-gray-50 p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3><p className="text-sm text-gray-600">All programs</p></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl mb-8 opacity-90">Join 500+ students who switched from Allen for better Biology coaching</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking"><Button variant="secondary" size="xl" className="bg-white text-red-600 hover:bg-gray-100 font-bold"><Play className="w-5 h-5 mr-2" />Book Free Demo</Button></Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-red-600"><Phone className="w-5 h-5 mr-2" />Call Now</Button></a>
          </div>
        </div>
      </section>
    </main>
  )
}
