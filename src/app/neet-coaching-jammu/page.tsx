'use client'

import { motion } from 'framer-motion'
import { MapPin, Users, Trophy, Star, CheckCircle, Award, BookOpen, Clock, Shield, Video, MessageCircle, Play, ArrowRight, GraduationCap, Building, Heart, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CitySchema } from '@/components/seo/CitySchema'

const localities = [
  { name: 'Gandhi Nagar', slug: 'gandhi-nagar', students: '240+', highlight: 'Premium Hub', priority: 'high' },
  { name: 'Residency Road', slug: 'residency-road', students: '220+', highlight: 'Central Area', priority: 'high' },
  { name: 'Talab Tillo', slug: 'talab-tillo', students: '200+', highlight: 'Educational Zone', priority: 'high' },
  { name: 'Channi Himmat', slug: 'channi-himmat', students: '180+', highlight: 'Growing Area', priority: 'high' },
  { name: 'Kachi Chawni', slug: 'kachi-chawni', students: '170+', highlight: 'Commercial Hub', priority: 'high' },
  { name: 'Trikuta Nagar', slug: 'trikuta-nagar', students: '160+', highlight: 'New Township', priority: 'medium' },
  { name: 'Satwari', slug: 'satwari', students: '150+', highlight: 'Cantonment', priority: 'medium' },
  { name: 'Rehari', slug: 'rehari', students: '140+', highlight: 'Old City', priority: 'medium' },
  { name: 'Bakshi Nagar', slug: 'bakshi-nagar', students: '130+', highlight: 'Residential', priority: 'medium' },
  { name: 'Paloura', slug: 'paloura', students: '120+', highlight: 'Bypass Area', priority: 'medium' },
  { name: 'Janipur', slug: 'janipur', students: '110+', highlight: 'South Jammu', priority: 'medium' },
  { name: 'Bathindi', slug: 'bathindi', students: '100+', highlight: 'Outskirts', priority: 'medium' },
]

const features = [
  { icon: Video, title: 'Live Interactive Classes', description: 'Real-time teaching with instant doubt resolution - world-class coaching from Jammu' },
  { icon: Users, title: 'Small Batches (10-15)', description: 'Exclusive J&K batches with personal attention for every aspirant' },
  { icon: Award, title: 'AIIMS Trained Faculties', description: 'Expert doctors and teachers trained at premier medical institutions' },
  { icon: BookOpen, title: 'GMC Jammu Focused', description: 'Coaching designed to help you secure seats in J&K medical colleges' },
  { icon: Clock, title: 'Flexible Timings', description: 'Morning, afternoon, and evening batches to fit your schedule' },
  { icon: Shield, title: 'Stay in Jammu', description: 'No need to migrate to Kota - get top coaching from the City of Temples' },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '340', icon: Star },
  { label: 'J&K Students', value: '1,500+', icon: Users },
  { label: 'Areas Covered', value: '12+', icon: MapPin },
]

const faqs = [
  { question: 'Why choose online coaching for NEET preparation in Jammu?', answer: 'Jammu students often consider migrating to Kota or Delhi, spending Rs 3-4 lakhs annually. Our online coaching delivers same quality teaching at Rs 24,000-48,000 per year. Stay in the City of Temples with family and get personalized attention.' },
  { question: 'Which areas in Jammu do you serve?', answer: 'We serve all major Jammu localities including Gandhi Nagar, Residency Road, Talab Tillo, Channi Himmat, Kachi Chawni, and all surrounding areas. Students from any J&K district can join our online live classes.' },
  { question: 'What is the fee for NEET coaching in Jammu?', answer: 'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year. We offer EMI options and merit scholarships specifically for J&K students.' },
  { question: 'Do you understand J&K board patterns?', answer: 'Yes! We have specialized batches for JKBOSE students. Our faculty understands the J&K syllabus, exam patterns, and how to balance board exams with NEET preparation.' },
]

const premiumSchools = ['Presentation Convent', 'Delhi Public School', 'KC Public School', 'Heritage School', 'DAV Public School', 'Kendriya Vidyalaya', 'Model Academy', 'Gandhi Memorial', 'JK Public School', 'Burn Hall']

const medicalColleges = ['GMC Jammu', 'GMC Srinagar', 'AIIMS Jammu', 'SKIMS Srinagar', 'Acharya Shri Chander College']

export default function NeetCoachingJammuPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_jammu', { event_category: 'conversion', event_label: 'neet_coaching_jammu_page', value: 1 })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema cityName="Jammu" citySlug="jammu" state="Jammu and Kashmir" localities={localities.map((l) => l.name)} faqs={faqs} studentCount="1500" coordinates={{ lat: '32.7266', lng: '74.8570' }} />
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-700 to-teal-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6"><MapPin className="w-5 h-5 mr-2" />City of Temples | GMC Jammu Focused Coaching</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Best <span className="text-yellow-300">NEET Coaching in Jammu</span></h1>
            <h2 className="text-xl md:text-2xl opacity-90 mb-4">Gandhi Nagar | Residency Road | Talab Tillo | Channi Himmat</h2>
            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">Why migrate to Kota? Get AIIMS trained faculties, 98% success rate, and live interactive classes - all from Jammu. Join 1,500+ J&K students achieving NEET success from home.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking"><Button variant="secondary" size="xl" onClick={handleDemoBooking} className="bg-yellow-500 text-black hover:bg-yellow-400"><Play className="w-5 h-5 mr-2" />Book Free Demo Class</Button></Link>
              <Link href="/courses"><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-teal-900"><BookOpen className="w-5 h-5 mr-2" />View Course Details</Button></Link>
            </div>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (<motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-xl p-6"><metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" /><div className="text-2xl font-bold">{metric.value}</div><div className="text-sm opacity-80">{metric.label}</div></motion.div>))}
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">NEET Coaching Across All Jammu Localities</h2><p className="text-xl text-gray-600 max-w-3xl mx-auto">From Gandhi Nagar to Trikuta Nagar - we serve students from every corner of Jammu and J&K.</p></motion.div><div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">{localities.map((locality, index) => (<motion.div key={locality.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} viewport={{ once: true }}><div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${locality.priority === 'high' ? 'ring-2 ring-teal-600' : ''}`}><div className="flex items-center justify-between mb-2"><h3 className="text-lg font-bold text-gray-900">{locality.name}</h3><MapPin className="w-5 h-5 text-teal-600" /></div><div className="text-2xl font-bold text-teal-600 mb-1">{locality.students}</div><div className="text-sm text-gray-500">{locality.highlight}</div>{locality.priority === 'high' && (<div className="mt-2 inline-flex items-center text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full"><Star className="w-3 h-3 mr-1" />High Demand</div>)}</div></motion.div>))}</div></div></section>
      <section className="py-20 bg-teal-50"><div className="max-w-7xl mx-auto px-4"><motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Get Into Top J&K Medical Colleges</h2><p className="text-xl text-gray-600 max-w-3xl mx-auto">Our coaching is designed to help you secure seats in J&K&apos;s prestigious medical institutions.</p></motion.div><div className="flex flex-wrap justify-center gap-4">{medicalColleges.map((college, index) => (<motion.div key={college} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white px-6 py-4 rounded-xl shadow-lg"><div className="flex items-center"><Heart className="w-5 h-5 text-teal-600 mr-2" /><span className="font-semibold text-gray-900">{college}</span></div></motion.div>))}</div></div></section>
      <section className="py-20 bg-white"><div className="max-w-7xl mx-auto px-4"><motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why Jammu Students Choose Online NEET Coaching</h2></motion.div><div className="grid md:grid-cols-3 gap-8 mb-16"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="bg-teal-50 rounded-xl p-8 border border-teal-100"><Building className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">No Kota Migration</h3><p className="text-gray-600">Get Kota-quality coaching from Jammu. Save Rs 2-3 lakhs annually and stay in the City of Temples.</p></motion.div><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="bg-teal-50 rounded-xl p-8 border border-teal-100"><TrendingUp className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">Rising Excellence</h3><p className="text-gray-600">J&K students are cracking NEET at record numbers. Be part of the success story.</p></motion.div><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="bg-teal-50 rounded-xl p-8 border border-teal-100"><GraduationCap className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">JKBOSE Expert</h3><p className="text-gray-600">We understand JKBOSE patterns and Jammu school schedules. Personalized support for J&K students.</p></motion.div></div><div className="bg-gray-50 rounded-2xl p-8"><h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Students from These Jammu Schools Trust Us</h3><div className="flex flex-wrap justify-center gap-4">{premiumSchools.map((school, index) => (<motion.span key={school} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: index * 0.05 }} viewport={{ once: true }} className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm">{school}</motion.span>))}</div></div></div></section>
      <section className="py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Cerebrum for NEET Coaching in Jammu?</h2></motion.div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{features.map((feature, index) => (<motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white rounded-xl p-8 shadow-lg"><feature.icon className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></motion.div>))}</div></div></section>
      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-4"><motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions - NEET Coaching Jammu</h2></motion.div><div className="space-y-6">{faqs.map((faq, index) => (<motion.div key={faq.question} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-gray-50 rounded-xl p-8"><h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start"><MessageCircle className="w-6 h-6 mr-3 text-teal-600 flex-shrink-0 mt-1" />{faq.question}</h3><p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p></motion.div>))}</div></div></section>
      <RelatedCityLinks currentCity="jammu" variant="default" />
      <section className="py-20 bg-gradient-to-r from-teal-600 via-teal-600 to-teal-700 text-white"><div className="max-w-4xl mx-auto px-4 text-center"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}><h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your NEET Journey from the City of Temples</h2><p className="text-xl md:text-2xl mb-8 opacity-90">98% success rate, AIIMS trained faculties, 1,500+ J&K students!</p><div className="flex flex-col sm:flex-row gap-4 justify-center mb-12"><Link href="/demo-booking"><Button variant="secondary" size="xl" onClick={handleDemoBooking} className="bg-yellow-500 text-black hover:bg-yellow-400"><Play className="w-5 h-5 mr-2" />Book Free Demo Class</Button></Link><Link href="/enrollment"><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-teal-600"><ArrowRight className="w-5 h-5 mr-2" />Enroll Now</Button></Link></div><div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm"><div className="flex items-center justify-center"><CheckCircle className="w-4 h-4 mr-2" /><span>All Jammu Areas</span></div><div className="flex items-center justify-center"><CheckCircle className="w-4 h-4 mr-2" /><span>Live Classes</span></div><div className="flex items-center justify-center"><CheckCircle className="w-4 h-4 mr-2" /><span>AIIMS Faculty</span></div><div className="flex items-center justify-center"><CheckCircle className="w-4 h-4 mr-2" /><span>J&K Specialist</span></div></div></motion.div></div></section>
    </div>
  )
}
