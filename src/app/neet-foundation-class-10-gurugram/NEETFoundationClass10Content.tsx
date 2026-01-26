'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen, CheckCircle, Clock, ChevronRight, ChevronDown, MapPin, Phone, Play, Home,
  Award, Users, Target, GraduationCap, TrendingUp, Star, Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ { question: string; answer: string }

const syllabusTopics = [
  { unit: 'Life Processes', chapters: ['Nutrition', 'Respiration', 'Transportation', 'Excretion'], neetRelevance: 'High' },
  { unit: 'Control & Coordination', chapters: ['Nervous System', 'Hormones', 'Reflex Actions'], neetRelevance: 'High' },
  { unit: 'Reproduction', chapters: ['Asexual Reproduction', 'Sexual Reproduction', 'Human Reproduction'], neetRelevance: 'Very High' },
  { unit: 'Heredity & Evolution', chapters: ['Mendel\'s Laws', 'Genetics Basics', 'Evolution'], neetRelevance: 'Very High' },
  { unit: 'Our Environment', chapters: ['Ecosystem', 'Food Chains', 'Environmental Issues'], neetRelevance: 'Medium' },
]

const benefits = [
  { title: '2-Year Head Start', description: 'Crucial preparation time before Class 11 NEET syllabus begins', icon: Clock },
  { title: '40% NEET Overlap', description: 'Class 10 Biology directly covers 40% of NEET concepts', icon: Target },
  { title: 'Board + NEET Dual Prep', description: 'Score 90+ in boards while building NEET foundation', icon: BookOpen },
  { title: 'Expert NEET Faculty', description: 'Teachers who specialize in NEET Biology preparation', icon: Users },
  { title: 'Small Batches', description: 'Maximum 15 students for personalized coaching', icon: GraduationCap },
  { title: 'Proven Results', description: 'Students score 50-100 marks higher in NEET', icon: TrendingUp },
]

const classXOverlap = [
  { topic: 'Life Processes', neetChapters: 'Digestion, Respiration, Circulation, Excretion', percentage: '45%' },
  { topic: 'Control & Coordination', neetChapters: 'Neural Control, Chemical Coordination', percentage: '50%' },
  { topic: 'Reproduction', neetChapters: 'Human Reproduction, Reproductive Health', percentage: '40%' },
  { topic: 'Heredity & Evolution', neetChapters: 'Genetics, Molecular Basis of Inheritance', percentage: '35%' },
]

const premiumSchools = ['DPS Gurugram', 'Scottish High', 'The Shri Ram School', 'Heritage School', 'Pathways World School', 'GD Goenka', 'Amity International', 'Suncity School']

export default function NEETFoundationClass10Content({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'foundation-class10-gurugram',
      message: 'Hi! I am a Class 10 student from Gurugram interested in NEET Foundation course. Please share details.',
      campaign: 'foundation-class10-gurugram',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600"><Home className="w-4 h-4" /></Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/neet-coaching-gurugram" className="text-gray-600 hover:text-teal-600">NEET Coaching Gurugram</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-teal-700 font-medium">Foundation Class 10</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-900 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              2-Year NEET Head Start Program
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NEET Foundation Class 10
              <span className="block text-blue-400 mt-2">in Gurugram</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Class 10 is the ideal time to start NEET preparation. 40% of NEET Biology overlaps with your board syllabus.
              Get a 2-year head start at our Sector 51, Gurugram center.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>40% NEET Overlap</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Target className="w-5 h-5 text-blue-400" />
                <span>2-Year Advantage</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-orange-400" />
                <span>90+ Board Score</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-blue-500 text-white hover:bg-blue-400 font-bold">
                  <Play className="w-5 h-5 mr-2" />Book Free Demo Class
                </Button>
              </Link>
              <motion.button whileHover={{ scale: 1.02 }} onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30">
                <Phone className="w-5 h-5" />WhatsApp: +91-88264-44334
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 40% Overlap Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">40% NEET-Class 10 Overlap</h2>
            <p className="text-xl text-slate-600">Your Class 10 syllabus is the foundation for NEET success</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {classXOverlap.map((item, index) => (
              <motion.div key={item.topic} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{item.topic}</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">{item.percentage}</span>
                </div>
                <p className="text-slate-600 text-sm"><strong>NEET Chapters:</strong> {item.neetChapters}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Start Now */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Start NEET Prep from Class 10?</h2>
            <p className="text-xl text-slate-600">Class 10 is the strategic time to begin your medical journey</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div key={benefit.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Class 10 Foundation Syllabus</h2>
            <p className="text-xl text-slate-600">Complete NCERT with NEET-relevance mapping</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabusTopics.map((topic, index) => (
              <motion.div key={topic.unit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{topic.unit}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${topic.neetRelevance === 'Very High' ? 'bg-red-100 text-red-700' : topic.neetRelevance === 'High' ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700'}`}>
                    {topic.neetRelevance} NEET
                  </span>
                </div>
                <ul className="space-y-2">
                  {topic.chapters.map((chapter) => (
                    <li key={chapter} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />{chapter}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Schools */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Students from Premium Gurugram Schools</h2>
            <p className="text-blue-100">Trusted by students from top schools in Gurugram</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {premiumSchools.map((school) => (
              <span key={school} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">{school}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-blue-100"><span className="text-slate-600">Course</span><span className="font-semibold">Class X Foundation (NEET)</span></div>
                <div className="flex justify-between py-3 border-b border-blue-100"><span className="text-slate-600">Duration</span><span className="font-semibold">1 Year</span></div>
                <div className="flex justify-between py-3 border-b border-blue-100"><span className="text-slate-600">Fee Range</span><span className="font-semibold text-blue-600">₹45,000 - ₹90,000/year</span></div>
                <div className="flex justify-between py-3 border-b border-blue-100"><span className="text-slate-600">Tiers</span><span className="font-semibold">Pursuit | Ascent | Pinnacle</span></div>
                <div className="flex justify-between py-3 border-b border-blue-100"><span className="text-slate-600">Batch Size</span><span className="font-semibold">10-40 students (by tier)</span></div>
                <div className="flex justify-between py-3"><span className="text-slate-600">Mode</span><span className="font-semibold">Offline + Online Support</span></div>
              </div>
              <Link href="/demo-booking" className="block mt-6">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Free Demo</Button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Our Gurugram Center</h2>
              </div>
              <p className="text-gray-700 mb-4"><strong>Address:</strong> {CONTACT_INFO.location.gurugram.streetAddress}, {CONTACT_INFO.location.gurugram.addressLocality}</p>
              <p className="text-gray-700 mb-4"><strong>Landmark:</strong> Same building as Allen Career Institute</p>
              <p className="text-gray-700 mb-6"><strong>Metro:</strong> Sector 55-56 Rapid Metro (5 min walk)</p>
              <div className="flex gap-4">
                <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline"><Phone className="w-4 h-4 mr-2" />Call Now</Button></a>
                <a href={CONTACT_INFO.location.gurugram.mapUrl} target="_blank" rel="noopener"><Button><MapPin className="w-4 h-4 mr-2" />Directions</Button></a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget title="Free NEET Preparation Tools" subtitle="Start using our AI-powered tools for your NEET journey" />

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
            <Link href="/neet-foundation-class-9-gurugram" className="bg-gray-50 p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Foundation Class 9</h3><p className="text-sm text-gray-600">Start earlier</p></Link>
            <Link href="/class-10-biology-coaching-gurugram" className="bg-gray-50 p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Class 10 Biology Coaching</h3><p className="text-sm text-gray-600">Board exam focus</p></Link>
            <Link href="/neet-coaching-gurugram" className="bg-gray-50 p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">NEET Coaching Gurugram</h3><p className="text-sm text-gray-600">Full NEET program</p></Link>
            <Link href="/biology-olympiad-coaching-gurugram" className="bg-gray-50 p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Biology Olympiad</h3><p className="text-sm text-gray-600">Competitive exams</p></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get 2-Year Head Start for NEET</h2>
          <p className="text-xl mb-8 opacity-90">Join Cerebrum Biology Academy Gurugram and leverage the 40% syllabus overlap</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking"><Button variant="secondary" size="xl" className="bg-white text-blue-600 hover:bg-gray-100 font-bold"><Play className="w-5 h-5 mr-2" />Book Free Demo</Button></Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-blue-600"><Phone className="w-5 h-5 mr-2" />Call Now</Button></a>
          </div>
        </div>
      </section>
    </main>
  )
}
