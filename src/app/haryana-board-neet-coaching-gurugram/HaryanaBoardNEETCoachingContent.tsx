'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle, ChevronRight, ChevronDown, MapPin, Phone, Play, Home, Award, Clock, BookOpen, Star, GraduationCap, Languages, Wallet,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ { question: string; answer: string }

const hbseSchools = [
  { name: 'GSSS Sector 10', area: 'Sector 10', type: 'Government' },
  { name: 'GSSS Sector 14', area: 'Sector 14', type: 'Government' },
  { name: 'GSSS Sector 17', area: 'Sector 17', type: 'Government' },
  { name: 'DAV Public School', area: 'Sector 49', type: 'Private HBSE' },
  { name: 'Govt Schools Pataudi', area: 'Pataudi', type: 'Government' },
  { name: 'Govt Schools Sohna', area: 'Sohna', type: 'Government' },
  { name: 'Govt Schools Manesar', area: 'Manesar', type: 'Government' },
  { name: 'Private HBSE Schools', area: 'Gurugram', type: 'Private HBSE' },
]

const bridgeAdvantages = [
  { title: 'Hindi + English Support', description: 'Concepts in Hindi, answers in English - best of both worlds.', icon: Languages },
  { title: 'HBSE-to-NCERT Bridge', description: 'Cover syllabus gaps and terminology differences systematically.', icon: BookOpen },
  { title: 'Affordable Fees', description: 'Special pricing for state board students starting ₹35,000/year.', icon: Wallet },
  { title: 'AIIMS Faculty', description: 'Learn from Dr. Shekhar who understands state board challenges.', icon: GraduationCap },
]

const successStats = [
  { stat: '290+', label: 'Average Biology Score' },
  { stat: '78%', label: 'Clear NEET Cutoff' },
  { stat: '682', label: 'Top HBSE Student Score' },
  { stat: '150+', label: 'HBSE Students Enrolled' },
]

const syllabusGaps = [
  { topic: 'Biotechnology Principles', hbse: 'Basic Coverage', ncert: 'Detailed + Applications', priority: 'High' },
  { topic: 'Human Reproduction', hbse: 'Limited Details', ncert: 'Complete Coverage', priority: 'High' },
  { topic: 'Ecology & Environment', hbse: 'Moderate', ncert: 'Extensive + Diagrams', priority: 'Medium' },
  { topic: 'Molecular Basis of Inheritance', hbse: 'Basic', ncert: 'Detailed Mechanisms', priority: 'High' },
  { topic: 'Plant Physiology', hbse: 'Partial', ncert: 'Complete with Experiments', priority: 'Medium' },
]

export default function HaryanaBoardNEETCoachingContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'haryana-board-neet-coaching-gurugram',
      message: 'Hi! I am a Haryana Board (HBSE) student looking for NEET Biology coaching. Please share details about Hindi medium batches and fees.',
      campaign: 'hbse-neet-gurugram',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600"><Home className="w-4 h-4" /></Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/neet-coaching-gurugram" className="text-gray-600 hover:text-teal-600">NEET Coaching Gurugram</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-green-700 font-medium">Haryana Board NEET Coaching</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-green-700 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Languages className="w-4 h-4" />
              Hindi + English Bilingual Support
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Haryana Board (HBSE)
              <span className="block text-yellow-400 mt-2">NEET Coaching in Gurugram</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Don&apos;t let language be a barrier. Our bilingual coaching helps HBSE students bridge the gap
              to NCERT and crack NEET with confidence.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Languages className="w-5 h-5 text-yellow-400" />
                <span>Hindi + English</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>290+ Avg Biology Score</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Wallet className="w-5 h-5 text-green-400" />
                <span>Starting ₹35,000/year</span>
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
                <Phone className="w-5 h-5" />Get HBSE Batch Details
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
                <p className="text-3xl md:text-4xl font-bold text-green-600">{item.stat}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why HBSE Students Succeed with Us</h2>
            <p className="text-xl text-slate-600">Bridge language and syllabus gaps for NEET success</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bridgeAdvantages.map((advantage, index) => (
              <motion.div key={advantage.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <advantage.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{advantage.title}</h3>
                <p className="text-slate-600 text-sm">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Gap Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">HBSE to NCERT Syllabus Gaps We Bridge</h2>
            <p className="text-xl text-slate-600">Key topics where we provide extra focus for HBSE students</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Topic</th>
                  <th className="px-6 py-4 text-left">HBSE Coverage</th>
                  <th className="px-6 py-4 text-left">NCERT Coverage</th>
                  <th className="px-6 py-4 text-left">Priority</th>
                </tr>
              </thead>
              <tbody>
                {syllabusGaps.map((gap, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-slate-900">{gap.topic}</td>
                    <td className="px-6 py-4 text-slate-600">{gap.hbse}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">{gap.ncert}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${gap.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {gap.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-slate-500 mt-4 text-sm">Our bridge program systematically covers all these gaps in the first 4 weeks.</p>
        </div>
      </section>

      {/* Schools */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Students from HBSE Schools Across Region</h2>
            <p className="text-xl text-slate-600">Government and private HBSE-affiliated schools trust us</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hbseSchools.map((school, index) => (
              <motion.div key={school.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{school.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{school.area}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${school.type === 'Government' ? 'bg-green-100 text-green-700' : 'bg-teal-100 text-teal-700'}`}>
                  {school.type}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bilingual Approach */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bilingual Teaching Approach</h2>
              <p className="text-xl text-green-100 mb-6">
                We understand Hindi medium students. Concepts are explained in Hindi for clarity,
                but you&apos;re trained to read and answer in English for NEET.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-300" />Concept explanation in Hindi initially</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-300" />Gradual transition to English terminology</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-300" />Hindi study materials available</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-300" />Doubt clearing in both languages</li>
              </ul>
              <Link href="/demo-booking">
                <Button className="bg-white text-green-600 hover:bg-green-50">
                  <Play className="w-4 h-4 mr-2" />Join Hindi-English Batch
                </Button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">HBSE Student Results 2024</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-white/20"><span>Average NEET Biology</span><span className="font-semibold">292/360</span></div>
                <div className="flex justify-between py-3 border-b border-white/20"><span>Average HBSE Biology</span><span className="font-semibold">88.5%</span></div>
                <div className="flex justify-between py-3 border-b border-white/20"><span>Top HBSE Student</span><span className="font-semibold">682/720</span></div>
                <div className="flex justify-between py-3"><span>NEET Qualified</span><span className="font-semibold text-green-300">78%</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Affordable Pricing */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Affordable Fees for HBSE Students</h2>
            <p className="text-xl text-slate-600">Quality education shouldn&apos;t break the bank</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Foundation Batch</h3>
              <p className="text-slate-600 mb-4">For Class 11 HBSE students</p>
              <p className="text-4xl font-bold text-green-600 mb-2">₹35,000</p>
              <p className="text-sm text-slate-500 mb-6">per year</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" />HBSE-NCERT Bridge</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" />Bilingual Teaching</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" />Weekend Batches</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" />Hindi Study Material</li>
              </ul>
              <Button variant="outline" className="w-full" onClick={handleWhatsApp}>Enquire Now</Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-green-50 rounded-2xl p-8 border-2 border-green-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Intensive Batch</h3>
              <p className="text-slate-600 mb-4">For Class 12 HBSE students</p>
              <p className="text-4xl font-bold text-green-600 mb-2">₹45,000</p>
              <p className="text-sm text-slate-500 mb-6">per year</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" />Everything in Foundation</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" />Daily Practice Tests</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" />Board + NEET Combo</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" />Personal Mentoring</li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleWhatsApp}>Enquire Now</Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Dropper Batch</h3>
              <p className="text-slate-600 mb-4">For HBSE passouts</p>
              <p className="text-4xl font-bold text-green-600 mb-2">₹55,000</p>
              <p className="text-sm text-slate-500 mb-6">per year</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" />Full-day Batches</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" />Intensive Revision</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" />100+ Mock Tests</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" />1-on-1 Doubt Sessions</li>
              </ul>
              <Button variant="outline" className="w-full" onClick={handleWhatsApp}>Enquire Now</Button>
            </motion.div>
          </div>

          <div className="mt-8 bg-yellow-50 rounded-xl p-6 text-center">
            <p className="text-lg font-semibold text-yellow-800">
              <Award className="w-5 h-5 inline-block mr-2" />
              Scholarship up to 50% for meritorious & financially needy students. EMI options available.
            </p>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Accessible from All Areas</h2>
                <p className="text-slate-600 mb-6">
                  Our center at <strong>M2K Corporate Park, Sector 51</strong> is well-connected
                  by bus routes from Pataudi, Sohna, Manesar, and all Gurugram sectors.
                </p>
                <div className="space-y-3 mb-6">
                  <p className="flex items-center gap-2"><MapPin className="w-5 h-5 text-green-600" />{CONTACT_INFO.location.gurugram.streetAddress}</p>
                  <p className="flex items-center gap-2"><Clock className="w-5 h-5 text-green-600" />Morning, Evening & Weekend Batches</p>
                </div>
                <div className="flex gap-4">
                  <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline"><Phone className="w-4 h-4 mr-2" />Call Now</Button></a>
                  <a href={CONTACT_INFO.location.gurugram.mapUrl} target="_blank" rel="noopener"><Button><MapPin className="w-4 h-4 mr-2" />Get Directions</Button></a>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Batch Timings for HBSE Students</h3>
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
            <Link href="/cbse-neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow"><h3 className="font-semibold text-teal-600">CBSE NEET Coaching</h3><p className="text-sm text-gray-600">For CBSE board students</p></Link>
            <Link href="/online-neet-classes-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow"><h3 className="font-semibold text-teal-600">Online NEET Classes</h3><p className="text-sm text-gray-600">Live interactive sessions</p></Link>
            <Link href="/neet-study-material-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow"><h3 className="font-semibold text-teal-600">NEET Study Material</h3><p className="text-sm text-gray-600">Notes, MCQs, tests</p></Link>
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow"><h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3><p className="text-sm text-gray-600">All programs</p></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your NEET Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join 150+ HBSE students preparing for NEET with bilingual support</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking"><Button variant="secondary" size="xl" className="bg-white text-green-600 hover:bg-gray-100 font-bold"><Play className="w-5 h-5 mr-2" />Book Free Demo</Button></Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-green-600"><Phone className="w-5 h-5 mr-2" />Call Now</Button></a>
          </div>
        </div>
      </section>
    </main>
  )
}
