'use client'

import { motion } from 'framer-motion'
import { Users, Trophy, Star, Award, Video, MessageCircle, ArrowRight, GraduationCap, Phone, Target, School, BookOpen, Clock, Car, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent('Hi! I am interested in NEET coaching (Kharar Punjab). Please share details.')

const nearbyAreas = [
  { name: 'Kharar Town', students: '45+', highlight: 'Main Area', priority: 'high' },
  { name: 'Sunny Enclave', students: '20+', highlight: 'Township', priority: 'high' },
  { name: 'Mohali Border', students: '15+', highlight: 'Near IT City', priority: 'medium' },
  { name: 'Landran', students: '12+', highlight: 'Educational Hub', priority: 'medium' },
  { name: 'Banur', students: '10+', highlight: 'Nearby Town', priority: 'medium' },
]

const features = [
  { icon: Video, title: 'Live Online Classes', description: 'Study from Kharar home. No travel to Chandigarh/Mohali.' },
  { icon: Users, title: 'Small Batches (10-15)', description: 'Personal attention for every Kharar student.' },
  { icon: Award, title: 'AIIMS Faculty', description: 'Teachers trained at AIIMS Delhi - unavailable locally.' },
  { icon: Clock, title: 'Flexible Timings', description: 'Morning, evening batches for school students.' },
  { icon: BookOpen, title: 'Complete Material', description: 'Notes, videos, mock tests all included.' },
  { icon: Target, title: 'PGIMER Focus', description: 'Target PGIMER, GMC Patiala from Kharar.' },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score', value: '358/360', icon: Star },
  { label: 'Kharar Area', value: '45+', icon: Users },
  { label: 'Govt Medical', value: '10+', icon: GraduationCap },
]

const whyNotMohali = [
  { problem: '20-30 min daily travel to Mohali coaching', icon: Car },
  { problem: 'No quality NEET coaching in Kharar', icon: BookOpen },
  { problem: 'Rs 2000-3000/month transport cost', icon: TrendingUp },
]

const schools = ['Government School Kharar', 'DAV Public School', 'Sanskriti School', 'Guru Nanak Public School', 'Spring Dale School']

const faqs = [
  { question: 'Is there NEET coaching in Kharar?', answer: 'Kharar has limited NEET coaching options. Cerebrum provides premium online NEET coaching accessible from Kharar with AIIMS faculty, 94.2% success rate. 45+ students from Kharar area enrolled!' },
  { question: 'Should Kharar students go to Mohali for coaching?', answer: 'Not necessary! Save 20-30 min travel daily and Rs 2000-3000/month transport. Cerebrum offers same quality online from your Kharar home.' },
  { question: 'How much does NEET coaching cost for Kharar students?', answer: 'Cerebrum fees: Foundation Rs 24,000/year, Comprehensive Rs 36,000/year, Dropper Rs 68,000/year. Much affordable than Mohali/Chandigarh centers!' },
  { question: 'What are batch timings for Kharar students?', answer: 'Multiple options: Morning (6-8 AM), After-school (4-6 PM), Evening (7-9 PM). Weekend batches available.' },
  { question: 'Which medical colleges can Kharar students target?', answer: 'Target: PGIMER Chandigarh (25 km), GMCH (23 km), GMC Patiala (Punjab quota), AIIMS Bathinda. We provide college-specific guidance.' },
  { question: 'How to book free demo from Kharar?', answer: 'Call/WhatsApp: +91-8826444334 or visit cerebrumbiologyacademy.com. Free demo - no commitment!' },
]

export default function KhararPage() {
  return (
    <div className="min-h-screen">
      <CitySchema cityName="Kharar" citySlug="kharar" state="Punjab" localities={nearbyAreas.map(a => a.name)} faqs={faqs} studentCount="45+" coordinates={{ lat: '30.7463', lng: '76.6452' }} />

      <section className="relative bg-gradient-to-br from-violet-900 via-purple-800 to-violet-900 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-2 bg-violet-500/20 text-violet-300 rounded-full text-sm font-medium mb-6">🎯 Untapped Market - 45+ Students Already Enrolled</span>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">NEET Coaching for <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">Kharar Punjab</span></h1>
            <p className="text-xl lg:text-2xl text-violet-100 mb-8">First quality NEET coaching for Kharar students. <strong>Online classes</strong> with AIIMS faculty, 94.2% success rate. No Mohali travel!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}><Button size="lg" className="bg-green-500 hover:bg-green-600"><MessageCircle className="w-5 h-5 mr-2" />WhatsApp Now</Button></Link>
              <Link href="/book-free-demo"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Book Free Demo<ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-xl bg-violet-50">
                <m.icon className="w-8 h-8 text-violet-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-violet-900">{m.value}</div>
                <div className="text-gray-600">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">The <span className="text-red-600">Kharar Problem</span></h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {whyNotMohali.map((item, i) => (
              <motion.div key={item.problem} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-gray-700 font-medium">{item.problem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Students from <span className="text-violet-600">Kharar Area</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((a, i) => (
              <motion.div key={a.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className={`p-4 rounded-xl text-center ${a.priority === 'high' ? 'bg-violet-600 text-white' : 'bg-white'}`}>
                <div className="font-bold">{a.name}</div>
                <div className={a.priority === 'high' ? 'text-violet-100' : 'text-gray-600'}>{a.students} students</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Kharar Students Choose Cerebrum</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-gray-50 p-6 rounded-xl">
                <f.icon className="w-10 h-10 text-violet-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-violet-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8"><School className="w-8 h-8 inline mr-2 text-violet-600" />Kharar Area Schools</h2>
          <div className="flex flex-wrap justify-center gap-3">{schools.map(s => <span key={s} className="px-4 py-2 bg-white text-violet-700 rounded-full text-sm">{s}</span>)}</div>
        </div>
      </section>

      <VideoTestimonialsSection />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs - NEET Coaching Kharar</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="border rounded-xl overflow-hidden">
                <summary className="p-5 cursor-pointer bg-gray-50 hover:bg-gray-100 font-semibold">{f.question}</summary>
                <div className="p-5 bg-white text-gray-600">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-violet-900 to-purple-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Start NEET Prep from Kharar Today!</h2>
          <p className="text-xl text-violet-100 mb-8">Join 45+ Kharar students. Book free demo now!</p>
          <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}><Button size="lg" className="bg-green-500 hover:bg-green-600"><Phone className="w-5 h-5 mr-2" />+91-8826444334</Button></Link>
        </div>
      </section>

      <nav className="py-4 bg-gray-100">
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li><Link href="/">Home</Link></li><li>/</li>
            <li><Link href="/neet-coaching-punjab">Punjab</Link></li><li>/</li>
            <li className="font-medium text-gray-900">Kharar</li>
          </ol>
        </div>
      </nav>
    </div>
  )
}
