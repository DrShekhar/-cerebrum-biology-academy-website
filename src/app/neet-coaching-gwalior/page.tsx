'use client'

import { motion } from 'framer-motion'
import { MapPin, Users, Trophy, Star, CheckCircle, Award, BookOpen, Clock, Shield, Video, MessageCircle, Play, ArrowRight, GraduationCap, Building, Heart, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CitySchema } from '@/components/seo/CitySchema'

const localities = [
  { name: 'City Centre', slug: 'city-centre', students: '260+', highlight: 'Premium Hub', priority: 'high' },
  { name: 'Lashkar', slug: 'lashkar', students: '240+', highlight: 'Central Area', priority: 'high' },
  { name: 'Morar', slug: 'morar', students: '220+', highlight: 'Cantonment', priority: 'high' },
  { name: 'Thatipur', slug: 'thatipur', students: '200+', highlight: 'Educational Zone', priority: 'high' },
  { name: 'Gwalior Fort Area', slug: 'fort-area', students: '180+', highlight: 'Heritage Zone', priority: 'high' },
  { name: 'Kampoo', slug: 'kampoo', students: '160+', highlight: 'Commercial Hub', priority: 'medium' },
  { name: 'Phool Bagh', slug: 'phool-bagh', students: '150+', highlight: 'Old City', priority: 'medium' },
  { name: 'Birla Nagar', slug: 'birla-nagar', students: '140+', highlight: 'Industrial Area', priority: 'medium' },
  { name: 'Hazira', slug: 'hazira', students: '130+', highlight: 'Residential', priority: 'medium' },
  { name: 'University Road', slug: 'university-road', students: '120+', highlight: 'Education Hub', priority: 'medium' },
  { name: 'Dabra Road', slug: 'dabra-road', students: '110+', highlight: 'Highway Corridor', priority: 'medium' },
  { name: 'Madhav Nagar', slug: 'madhav-nagar', students: '100+', highlight: 'New Township', priority: 'medium' },
]

const features = [
  { icon: Video, title: 'Live Interactive Classes', description: 'Real-time teaching with instant doubt resolution from Gwalior' },
  { icon: Users, title: 'Small Batches (10-15)', description: 'Exclusive MP batches with personal attention' },
  { icon: Award, title: 'AIIMS Trained Faculties', description: 'Expert doctors trained at premier medical institutions' },
  { icon: BookOpen, title: 'GRMC Gwalior Focused', description: 'Coaching for GRMC and MP medical colleges' },
  { icon: Clock, title: 'Flexible Timings', description: 'Morning, afternoon, and evening batches' },
  { icon: Shield, title: 'Stay in Gwalior', description: 'No need to migrate to Kota - get top coaching from the City of Music' },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '346', icon: Star },
  { label: 'MP Students', value: '1,800+', icon: Users },
  { label: 'Areas Covered', value: '12+', icon: MapPin },
]

const faqs = [
  { question: 'Why choose online coaching for NEET preparation in Gwalior?', answer: 'Gwalior students often migrate to Kota. Our online coaching delivers same quality at Rs 24,000-48,000/year. Stay in the City of Music with family.' },
  { question: 'Which areas in Gwalior do you serve?', answer: 'We serve City Centre, Lashkar, Morar, Thatipur, and all Gwalior localities. Students from any MP district can join.' },
  { question: 'What is the fee for NEET coaching in Gwalior?', answer: 'Our NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year with EMI and scholarships.' },
  { question: 'Do you understand MP board patterns?', answer: 'Yes! We have specialized batches for MP Board students with faculty who understand MP exam patterns.' },
]

const premiumSchools = ['Scindia School', 'Scindia Kanya Vidyalaya', 'Delhi Public School', 'Kendriya Vidyalaya', 'Army Public School', 'St. Pauls School', 'Cambridge School', 'Mayo College', 'Campion School', 'Notre Dame Academy']

const medicalColleges = ['GRMC Gwalior', 'AIIMS Bhopal', 'Gandhi Medical College Bhopal', 'MGM Medical College Indore', 'NSCB Medical College Jabalpur']

export default function NeetCoachingGwaliorPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_gwalior', { event_category: 'conversion', event_label: 'neet_coaching_gwalior_page', value: 1 })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema cityName="Gwalior" citySlug="gwalior" state="Madhya Pradesh" localities={localities.map((l) => l.name)} faqs={faqs} studentCount="1800" coordinates={{ lat: '26.2183', lng: '78.1828' }} />
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-700 to-teal-800 text-white py-20 overflow-hidden"><div className="absolute inset-0 bg-black/20" /><div className="relative max-w-7xl mx-auto px-4"><motion.div className="text-center max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}><div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6"><MapPin className="w-5 h-5 mr-2" />City of Music | GRMC Gwalior Focused Coaching</div><h1 className="text-4xl md:text-6xl font-bold mb-6">Best <span className="text-yellow-300">NEET Coaching in Gwalior</span></h1><h2 className="text-xl md:text-2xl opacity-90 mb-4">City Centre | Lashkar | Morar | Thatipur</h2><p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">Get AIIMS trained faculties, 94.2% success rate, and live classes from Gwalior. Join 1,800+ MP students.</p><div className="flex flex-col sm:flex-row gap-4 justify-center mb-12"><Link href="/demo-booking"><Button variant="secondary" size="xl" onClick={handleDemoBooking} className="bg-yellow-500 text-black hover:bg-yellow-400"><Play className="w-5 h-5 mr-2" />Book Free Demo Class</Button></Link><Link href="/courses"><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-teal-900"><BookOpen className="w-5 h-5 mr-2" />View Course Details</Button></Link></div><div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">{successMetrics.map((metric, index) => (<motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-xl p-6"><metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" /><div className="text-2xl font-bold">{metric.value}</div><div className="text-sm opacity-80">{metric.label}</div></motion.div>))}</div></motion.div></div></section>
      <section className="py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">NEET Coaching Across All Gwalior Localities</h2></motion.div><div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">{localities.map((locality, index) => (<motion.div key={locality.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} viewport={{ once: true }}><div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${locality.priority === 'high' ? 'ring-2 ring-teal-600' : ''}`}><div className="flex items-center justify-between mb-2"><h3 className="text-lg font-bold text-gray-900">{locality.name}</h3><MapPin className="w-5 h-5 text-teal-600" /></div><div className="text-2xl font-bold text-teal-600 mb-1">{locality.students}</div><div className="text-sm text-gray-500">{locality.highlight}</div>{locality.priority === 'high' && (<div className="mt-2 inline-flex items-center text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full"><Star className="w-3 h-3 mr-1" />High Demand</div>)}</div></motion.div>))}</div></div></section>
      <section className="py-20 bg-teal-50"><div className="max-w-7xl mx-auto px-4"><motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Get Into Top MP Medical Colleges</h2></motion.div><div className="flex flex-wrap justify-center gap-4">{medicalColleges.map((college, index) => (<motion.div key={college} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white px-6 py-4 rounded-xl shadow-lg"><div className="flex items-center"><Heart className="w-5 h-5 text-teal-600 mr-2" /><span className="font-semibold text-gray-900">{college}</span></div></motion.div>))}</div></div></section>
      <section className="py-20 bg-white"><div className="max-w-7xl mx-auto px-4"><div className="grid md:grid-cols-3 gap-8 mb-16"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="bg-teal-50 rounded-xl p-8 border border-teal-100"><Building className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">No Kota Migration</h3><p className="text-gray-600">Get quality coaching from Gwalior. Save lakhs and stay with family.</p></motion.div><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="bg-teal-50 rounded-xl p-8 border border-teal-100"><TrendingUp className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">Rising Excellence</h3><p className="text-gray-600">Gwalior students are cracking NEET at record numbers.</p></motion.div><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="bg-teal-50 rounded-xl p-8 border border-teal-100"><GraduationCap className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">MP Board Expert</h3><p className="text-gray-600">We understand MP board patterns and schedules.</p></motion.div></div><div className="bg-gray-50 rounded-2xl p-8"><h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Students from These Gwalior Schools Trust Us</h3><div className="flex flex-wrap justify-center gap-4">{premiumSchools.map((school, index) => (<motion.span key={school} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: index * 0.05 }} viewport={{ once: true }} className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm">{school}</motion.span>))}</div></div></div></section>
      <section className="py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{features.map((feature, index) => (<motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-white rounded-xl p-8 shadow-lg"><feature.icon className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></motion.div>))}</div></div></section>
      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-4"><motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">FAQs - NEET Coaching Gwalior</h2></motion.div><div className="space-y-6">{faqs.map((faq, index) => (<motion.div key={faq.question} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="bg-gray-50 rounded-xl p-8"><h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start"><MessageCircle className="w-6 h-6 mr-3 text-teal-600 flex-shrink-0 mt-1" />{faq.question}</h3><p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p></motion.div>))}</div></div></section>
      <RelatedCityLinks currentCity="gwalior" variant="default" />
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white"><div className="max-w-4xl mx-auto px-4 text-center"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}><h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your NEET Journey from the City of Music</h2><p className="text-xl mb-8 opacity-90">94.2% success rate, AIIMS trained faculties, 1,800+ MP students!</p><div className="flex flex-col sm:flex-row gap-4 justify-center mb-12"><Link href="/demo-booking"><Button variant="secondary" size="xl" onClick={handleDemoBooking} className="bg-yellow-500 text-black hover:bg-yellow-400"><Play className="w-5 h-5 mr-2" />Book Free Demo</Button></Link><Link href="/enrollment"><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-teal-600"><ArrowRight className="w-5 h-5 mr-2" />Enroll Now</Button></Link></div><div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm"><div className="flex items-center justify-center"><CheckCircle className="w-4 h-4 mr-2" /><span>All Gwalior Areas</span></div><div className="flex items-center justify-center"><CheckCircle className="w-4 h-4 mr-2" /><span>Live Classes</span></div><div className="flex items-center justify-center"><CheckCircle className="w-4 h-4 mr-2" /><span>AIIMS Faculty</span></div><div className="flex items-center justify-center"><CheckCircle className="w-4 h-4 mr-2" /><span>MP Specialist</span></div></div></motion.div></div></section>
    </div>
  )
}
