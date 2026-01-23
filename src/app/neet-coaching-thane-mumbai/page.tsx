'use client'

import { motion } from 'framer-motion'
import { MapPin, Users, Trophy, Star, Award, BookOpen, Clock, Shield, Video, MessageCircle, Play, ArrowRight, GraduationCap, Building, Phone, Calculator, Target, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent('Hi! I am interested in NEET coaching in Thane Mumbai. Please share details.')

const localities = [
  { name: 'Thane West', students: '280+', highlight: 'Premium Hub', priority: 'high' },
  { name: 'Ghodbunder Road', students: '220+', highlight: 'IT Corridor', priority: 'high' },
  { name: 'Hiranandani Estate', students: '180+', highlight: 'Ultra Premium', priority: 'high' },
  { name: 'Majiwada', students: '150+', highlight: 'Central Thane', priority: 'high' },
  { name: 'Kasarvadavali', students: '120+', highlight: 'Growing Fast', priority: 'medium' },
  { name: 'Wagle Estate', students: '110+', highlight: 'Industrial Hub', priority: 'medium' },
  { name: 'Kopri', students: '95+', highlight: 'East Thane', priority: 'medium' },
  { name: 'Naupada', students: '130+', highlight: 'Commercial Center', priority: 'high' },
]

const features = [
  { icon: Video, title: 'Live Interactive Classes', description: 'Premium online coaching - no Eastern Express Highway traffic. World-class teaching from home.' },
  { icon: Users, title: 'Elite Small Batches (10-15)', description: 'Exclusive batches for Thane students with personalized attention.' },
  { icon: Award, title: 'AIIMS Trained Faculty', description: 'Expert doctors and teachers from premier medical institutions.' },
  { icon: BookOpen, title: 'Complete Premium Package', description: 'NCERT mastery, advanced materials, unlimited doubt sessions - everything included.' },
  { icon: Clock, title: 'Flexible Timings', description: 'Morning, afternoon, evening batches to complement school schedules.' },
  { icon: Shield, title: 'Zero Commute Stress', description: 'No Mumbai traffic hassle. Learn from your premium Thane residence.' },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score 2024', value: '358', icon: Star },
  { label: 'Thane Students', value: '920+', icon: Users },
  { label: 'Premium Schools', value: '18+', icon: GraduationCap },
]

const faqs = [
  { question: 'Why do Thane students choose online NEET coaching?', answer: 'Thane has excellent schools like Hiranandani Foundation, DAV Public School, and Smt. Sulochanadevi Singhania School with demanding schedules. Our online classes offer flexibility that physical coaching in Mumbai cannot. Save 3-4 hours daily on EEH traffic. Our 94.2% success rate proves online is equally effective.' },
  { question: 'Which areas in Thane do you serve?', answer: 'We serve all Thane localities including Thane West, Ghodbunder Road, Hiranandani Estate, Majiwada, Kasarvadavali, Wagle Estate, Kopri, Naupada, and all surrounding areas. Students from anywhere in Thane district can join our online live classes.' },
  { question: 'What is the fee for premium NEET coaching in Thane?', answer: 'Our complete NEET Biology course ranges from Rs 24,000 to Rs 68,000 per year depending on the program chosen. This is competitive with Mumbai coaching centers while offering superior flexibility and smaller batches. EMI options available.' },
  { question: 'How does this compare to coaching centers in Dadar or Andheri?', answer: 'Unlike physical coaching centers where batches have 50-100 students, we limit batches to 10-15 students. This means every doubt gets addressed, every student gets personal attention. Plus, you save hours on Mumbai-Thane traffic daily.' },
  { question: 'What medical colleges can Thane students target?', answer: 'With proper NEET preparation, Thane students can target top colleges like Grant Medical College, KEM Hospital, Seth GS Medical College, Topiwala National Medical College, Lokmanya Tilak Municipal Medical College, and all-India institutes like AIIMS and JIPMER.' },
  { question: 'Do you cover Maharashtra HSC and CBSE both?', answer: 'Yes! We cater to both Maharashtra HSC Board and CBSE students from Thane. Our program bridges HSC/CBSE syllabus with NCERT for complete NEET preparation.' },
]

const premiumSchools = ['Hiranandani Foundation School', 'DAV Public School Thane', 'Smt. Sulochanadevi Singhania School', 'Podar International School', 'CP Goenka International', 'Orchids International Thane', 'Vasant Vihar High School', 'St. Johns High School', 'Bedekar Vidya Mandir', 'Ryan International Thane']

const neetTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', icon: Calculator },
  { name: 'College Predictor', href: '/neet-college-predictor', icon: Building },
  { name: 'Study Plan Generator', href: '/neet-study-plan-generator', icon: Target },
  { name: 'NEET Exam Countdown', href: '/neet-exam-countdown', icon: Clock },
]

const whyThane = [
  { icon: Sparkles, title: 'Premium Quality, Zero Commute', description: 'Get world-class NEET coaching without traveling to Mumbai. No EEH traffic to coaching hubs.' },
  { icon: Building, title: 'Mumbai Quality in Thane', description: 'Same faculty that teaches Mumbai\'s elite, now accessible from Thane. No compromise on quality.' },
  { icon: GraduationCap, title: 'Corporate Family Friendly', description: 'Flexible timings that work with busy professional families. Evening and weekend options.' },
]

export default function NeetCoachingThanePage() {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', { event_category: 'conversion', event_label: 'thane_neet_page' })
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank')
  }

  return (
    <div className="min-h-screen">
      <CitySchema cityName="Thane" citySlug="thane-mumbai" state="Maharashtra" localities={localities.map((l) => l.name)} faqs={faqs} studentCount="920" coordinates={{ lat: '19.2183', lng: '72.9781' }} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />City of Lakes | Premium NEET Coaching
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Best <span className="text-[#4ade80]">NEET Coaching in Thane</span>, Mumbai</h1>
            <h2 className="text-xl md:text-2xl opacity-90 mb-4">Thane West | Ghodbunder Road | Hiranandani | Majiwada | Naupada</h2>
            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">Premium NEET Biology coaching for Thane&apos;s best schools. 94.2% success rate, AIIMS faculty, zero Mumbai traffic. Join 920+ students from Hiranandani Foundation, DAV, Singhania!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="secondary" size="xl" onClick={handleWhatsAppClick} className="bg-[#25D366] text-white hover:bg-[#20BD5A] flex items-center justify-center gap-2"><MessageCircle className="w-6 h-6" /><span>WhatsApp Us Now</span></Button>
              <Link href="/demo-booking"><Button variant="secondary" size="xl" className="bg-[#4ade80] text-[#1e3a5f] hover:bg-[#22c55e]"><Play className="w-5 h-5 mr-2" />Book Free Demo Class</Button></Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/90 mb-12"><Phone className="w-5 h-5" /><span>Call: </span><a href="tel:+918826444334" className="font-bold hover:text-[#4ade80]">+91-88264-44334</a></div>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (<motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-xl p-6"><metric.icon className="w-8 h-8 mx-auto mb-2 text-[#4ade80]" /><div className="text-2xl font-bold">{metric.value}</div><div className="text-sm opacity-80">{metric.label}</div></motion.div>))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEET Tools Section */}
      <section className="py-12 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8"><h2 className="text-2xl md:text-3xl font-bold mb-2">Free NEET Preparation Tools</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {neetTools.map((tool) => (<Link key={tool.name} href={tool.href} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transition-all hover:scale-105"><tool.icon className="w-8 h-8 mx-auto mb-2" /><span className="text-sm font-medium">{tool.name}</span></Link>))}
          </div>
          <div className="text-center mt-6"><Link href="/neet-tools"><Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1e3a5f]">View All NEET Tools <ArrowRight className="w-4 h-4 ml-2" /></Button></Link></div>
        </div>
      </section>

      {/* Localities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16"><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">NEET Coaching Across Thane District</h2></motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localities.map((locality, index) => (<motion.div key={locality.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} viewport={{ once: true }}><div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${locality.priority === 'high' ? 'ring-2 ring-[#1e3a5f]' : ''}`}><div className="flex items-center justify-between mb-2"><h3 className="text-lg font-bold text-gray-900">{locality.name}</h3><MapPin className="w-5 h-5 text-[#1e3a5f]" /></div><div className="text-2xl font-bold text-[#1e3a5f] mb-1">{locality.students}</div><div className="text-sm text-gray-500">{locality.highlight}</div></div></motion.div>))}
          </div>
        </div>
      </section>

      {/* Why Thane Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16"><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why Thane Families Choose Cerebrum</h2></motion.div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyThane.map((item, index) => (<motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="bg-gray-50 rounded-xl p-8 border border-gray-200"><item.icon className="w-12 h-12 text-[#1e3a5f] mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3><p className="text-gray-600">{item.description}</p></motion.div>))}
          </div>
          <div className="bg-gray-50 rounded-2xl p-8"><h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Students from These Thane Schools Trust Us</h3><div className="flex flex-wrap justify-center gap-4">{premiumSchools.map((school) => (<span key={school} className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm">{school}</span>))}</div></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16"><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Premium NEET Biology Coaching Features</h2></motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (<motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="bg-white rounded-xl p-8 shadow-lg"><feature.icon className="w-12 h-12 text-[#1e3a5f] mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></motion.div>))}
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="text-center mb-16"><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">FAQs - NEET Coaching Thane</h2></motion.div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (<motion.div key={faq.question} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="bg-gray-50 rounded-xl p-8" itemScope itemType="https://schema.org/Question"><h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start" itemProp="name"><MessageCircle className="w-6 h-6 mr-3 text-[#1e3a5f] flex-shrink-0 mt-1" />{faq.question}</h3><div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer"><p className="text-gray-700 leading-relaxed ml-9" itemProp="text">{faq.answer}</p></div></motion.div>))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Join Thane&apos;s Elite NEET Aspirants</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">94.2% success rate, AIIMS faculty, premium small batches. No Mumbai commute needed!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="secondary" size="xl" onClick={handleWhatsAppClick} className="bg-[#25D366] text-white hover:bg-[#20BD5A] flex items-center justify-center gap-2"><MessageCircle className="w-6 h-6" /><span>WhatsApp Us Now</span></Button>
              <Link href="/demo-booking"><Button variant="secondary" size="xl" className="bg-white text-[#1e3a5f] hover:bg-gray-100"><Play className="w-5 h-5 mr-2" />Book Free Demo Class</Button></Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/90"><Phone className="w-5 h-5" /><span>Call: </span><a href="tel:+918826444334" className="font-bold hover:text-[#4ade80]">+91-88264-44334</a></div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
