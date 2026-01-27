'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen, CheckCircle, ChevronRight, ChevronDown, MapPin, Phone, Play, Home, Users, Target, GraduationCap, Star, PenTool, Trophy,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface FAQ { question: string; answer: string }

const syllabusTopics = [
  { unit: 'Life Processes', chapters: ['Nutrition', 'Respiration', 'Transportation', 'Excretion'], marks: 23, diagrams: ['Human Digestive System', 'Human Heart', 'Nephron'] },
  { unit: 'Control & Coordination', chapters: ['Nervous System', 'Human Brain', 'Hormones', 'Plant Hormones'], marks: 12, diagrams: ['Human Brain', 'Reflex Arc', 'Neuron'] },
  { unit: 'Reproduction', chapters: ['Asexual Reproduction', 'Sexual Reproduction in Plants', 'Human Reproduction'], marks: 12, diagrams: ['Flower Structure', 'Male/Female Reproductive System'] },
  { unit: 'Heredity & Evolution', chapters: ['Mendel\'s Laws', 'Sex Determination', 'Evolution', 'Speciation'], marks: 8, diagrams: ['Monohybrid Cross', 'Dihybrid Cross'] },
  { unit: 'Our Environment', chapters: ['Ecosystem', 'Food Chains', 'Ozone Depletion', 'Garbage Management'], marks: 5, diagrams: ['Food Web', 'Ecosystem Components'] },
]

const features = [
  { title: 'Board Exam Mastery', description: 'Focus on CBSE & ICSE board exam patterns and marking schemes', icon: Trophy },
  { title: 'Diagram Practice', description: 'Extensive diagram practice - crucial for scoring 90+ in Biology', icon: PenTool },
  { title: 'NCERT Complete Coverage', description: 'Line-by-line NCERT coverage for maximum marks', icon: BookOpen },
  { title: 'Expert Teachers', description: 'Faculty with proven track record of producing toppers', icon: Users },
  { title: 'Mock Tests', description: 'Regular mock tests in board exam pattern', icon: Target },
  { title: 'Small Batches', description: 'Maximum 15 students for personalized attention', icon: GraduationCap },
]

const scoringStrategy = [
  { section: 'Diagrams', marks: '15-20', tip: 'Clean, labeled diagrams with proper titles' },
  { section: 'NCERT Questions', marks: '25-30', tip: 'Memorize NCERT in-text and back exercises' },
  { section: 'Case Studies', marks: '8-10', tip: 'Practice application-based questions' },
  { section: 'Long Answers', marks: '15-20', tip: 'Point-wise answers with diagrams' },
]

const premiumSchools = ['DPS Gurugram', 'Scottish High', 'The Shri Ram School', 'Heritage School', 'Pathways World School', 'GD Goenka', 'Amity International', 'Suncity School', 'Blue Bells School']

export default function Class10BiologyCoachingContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'class10-biology-coaching-gurugram',
      message: 'Hi! I am interested in Class 10 Biology coaching in Gurugram for board exam preparation. Please share details.',
      campaign: 'class10-biology-coaching-gurugram',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600"><Home className="w-4 h-4" /></Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><Link href="/biology-coaching" className="text-gray-600 hover:text-teal-600">Biology Coaching</Link></li>
            <li className="flex items-center"><ChevronRight className="w-4 h-4 text-gray-400 mx-1" /><span className="text-teal-700 font-medium">Class 10 Gurugram</span></li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-orange-900 to-red-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-4 h-4" />
              Score 90+ in Board Exams
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Class 10 Biology Coaching
              <span className="block text-orange-400 mt-2">in Gurugram</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Expert coaching for CBSE & ICSE Class 10 board exams. Master diagrams, ace NCERT questions,
              and score 90+ in Biology at our Sector 51, Gurugram center.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>90+ Score Focus</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <PenTool className="w-5 h-5 text-orange-400" />
                <span>Diagram Mastery</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-red-400" />
                <span>NCERT Complete</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-orange-500 text-white hover:bg-orange-400 font-bold">
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

      {/* Scoring Strategy */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How to Score 90+ in Biology</h2>
            <p className="text-xl text-slate-600">Our proven strategy for board exam success</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scoringStrategy.map((item, index) => (
              <motion.div key={item.section} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">{item.marks}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.section}</h3>
                <p className="text-sm text-slate-600">{item.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Our Coaching?</h2>
            <p className="text-xl text-slate-600">Board exam focused preparation with proven results</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus with Marks */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Class 10 Biology Syllabus</h2>
            <p className="text-xl text-slate-600">Chapter-wise marks distribution and important diagrams</p>
          </motion.div>

          <div className="space-y-6">
            {syllabusTopics.map((topic, index) => (
              <motion.div key={topic.unit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-slate-900">{topic.unit}</h3>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">{topic.marks} Marks</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {topic.chapters.map((chapter) => (
                        <span key={chapter} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-slate-600">
                          <CheckCircle className="w-3 h-3 text-green-500" />{chapter}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-64 bg-red-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-red-700 mb-2">Important Diagrams:</p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {topic.diagrams.map((diagram) => (
                        <li key={diagram} className="flex items-center gap-2">
                          <PenTool className="w-3 h-3 text-red-500" />{diagram}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Schools */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Students from Top Gurugram Schools</h2>
            <p className="text-orange-100">Trusted by students from CBSE & ICSE schools across Gurugram</p>
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
              className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-orange-100"><span className="text-slate-600">Course</span><span className="font-semibold">Class X Foundation (Board)</span></div>
                <div className="flex justify-between py-3 border-b border-orange-100"><span className="text-slate-600">Duration</span><span className="font-semibold">1 Year</span></div>
                <div className="flex justify-between py-3 border-b border-orange-100"><span className="text-slate-600">Fee Range</span><span className="font-semibold text-orange-600">₹40,000 - ₹60,000/year</span></div>
                <div className="flex justify-between py-3 border-b border-orange-100"><span className="text-slate-600">Tiers</span><span className="font-semibold">Pursuit | Ascent | Pinnacle</span></div>
                <div className="flex justify-between py-3 border-b border-orange-100"><span className="text-slate-600">Batch Size</span><span className="font-semibold">10-40 students (by tier)</span></div>
                <div className="flex justify-between py-3"><span className="text-slate-600">Includes</span><span className="font-semibold">Materials + Mock Tests</span></div>
              </div>
              <Link href="/demo-booking" className="block mt-6">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Book Free Demo</Button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-orange-600 mr-3" />
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
      <NEETToolsWidget title="Planning for NEET After Class 10?" subtitle="40% of NEET Biology overlaps with Class 10 - start using our tools" />

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
            <Link href="/class-9-biology-tuition-gurugram" className="bg-gray-50 p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Class 9 Biology</h3><p className="text-sm text-gray-600">Foundation year</p></Link>
            <Link href="/neet-foundation-class-10-gurugram" className="bg-gray-50 p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">NEET Foundation Class 10</h3><p className="text-sm text-gray-600">Board + NEET prep</p></Link>
            <Link href="/biology-olympiad-coaching-gurugram" className="bg-gray-50 p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">Biology Olympiad</h3><p className="text-sm text-gray-600">Competitive exams</p></Link>
            <Link href="/neet-coaching-gurugram" className="bg-gray-50 p-4 rounded-xl hover:shadow-md"><h3 className="font-semibold text-teal-600">NEET Coaching</h3><p className="text-sm text-gray-600">After Class 10</p></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Score 90+ in Class 10 Biology</h2>
          <p className="text-xl mb-8 opacity-90">Join the best Class 10 Biology coaching in Gurugram</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking"><Button variant="secondary" size="xl" className="bg-white text-orange-600 hover:bg-gray-100 font-bold"><Play className="w-5 h-5 mr-2" />Book Free Demo</Button></Link>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-orange-600"><Phone className="w-5 h-5 mr-2" />Call Now</Button></a>
          </div>
        </div>
      </section>
    </main>
  )
}
