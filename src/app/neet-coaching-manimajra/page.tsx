'use client'

import { motion } from 'framer-motion'
import { Users, Trophy, Star, Award, Video, MessageCircle, ArrowRight, GraduationCap, Phone, Target, School, BookOpen, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent('Hi! I am interested in NEET coaching (Manimajra Chandigarh). Please share details.')

const nearbyAreas = [
  { name: 'Manimajra', students: '60+', highlight: 'Growing Hub', priority: 'high' },
  { name: 'Sector 38', students: '25+', highlight: 'Adjacent', priority: 'high' },
  { name: 'Sector 40', students: '20+', highlight: 'Residential', priority: 'medium' },
  { name: 'Industrial Area', students: '18+', highlight: 'Nearby', priority: 'medium' },
  { name: 'Sector 52', students: '15+', highlight: 'Growing Area', priority: 'medium' },
]

const features = [
  { icon: Video, title: 'Live Online Classes', description: 'Study from Manimajra home. No Sector 34 travel.' },
  { icon: Users, title: 'Small Batches (10-15)', description: 'Personal attention for every student.' },
  { icon: Award, title: 'AIIMS Faculty', description: 'Teachers trained at AIIMS Delhi.' },
  { icon: Clock, title: 'Flexible Timings', description: 'Morning, evening batches available.' },
  { icon: BookOpen, title: 'Complete Material', description: 'Notes, videos, mock tests included.' },
  { icon: Target, title: 'PGIMER Focus', description: 'Target PGIMER from Manimajra.' },
]

const successMetrics = [
  { label: 'Success Rate', value: '94.2%', icon: Trophy },
  { label: 'Top Score', value: '358/360', icon: Star },
  { label: 'Manimajra Area', value: '60+', icon: Users },
  { label: 'PGIMER Selections', value: '15+', icon: GraduationCap },
]

const schools = ['Government School Manimajra', 'Spring Dale School', 'DAV Sector 38', 'Ryan International']

const faqs = [
  { question: 'Is there NEET coaching in Manimajra?', answer: 'Manimajra lacks dedicated NEET coaching. Cerebrum provides online coaching accessible from Manimajra with AIIMS faculty, 94.2% success. 60+ students enrolled. Better than traveling to Sector 34!' },
  { question: 'How much does NEET coaching cost for Manimajra students?', answer: 'Cerebrum fees: Foundation Rs 24,000/year, Comprehensive Rs 36,000/year, Dropper Rs 68,000/year. Save transport costs to Sector 34!' },
  { question: 'What are batch timings for Manimajra students?', answer: 'Multiple options: Morning (6-8 AM), After-school (4-6 PM), Evening (7-9 PM). Weekend batches available.' },
  { question: 'Is dropper batch available?', answer: 'Yes! Intensive dropper batch at Rs 68,000/year with personal mentorship, weekly tests.' },
  { question: 'How to book free demo from Manimajra?', answer: 'Call/WhatsApp: +91-8826444334 or visit cerebrumbiologyacademy.com. Free demo!' },
]

export default function ManimajraPage() {
  return (
    <div className="min-h-screen">
      <CitySchema cityName="Manimajra Chandigarh" citySlug="manimajra" state="Chandigarh" localities={nearbyAreas.map(a => a.name)} faqs={faqs} studentCount="60+" coordinates={{ lat: '30.7200', lng: '76.8000' }} />

      <section className="relative bg-gradient-to-br from-orange-900 via-amber-800 to-orange-900 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium mb-6">🎯 60+ Students from Manimajra Area</span>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">NEET Coaching for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Manimajra Chandigarh</span></h1>
            <p className="text-xl lg:text-2xl text-orange-100 mb-8">Finally! Quality NEET coaching for Manimajra. <strong>Online classes</strong> with AIIMS faculty, 94.2% success rate.</p>
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
              <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-xl bg-orange-50">
                <m.icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-orange-900">{m.value}</div>
                <div className="text-gray-600">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Students from <span className="text-orange-600">Manimajra Area</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((a, i) => (
              <motion.div key={a.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className={`p-4 rounded-xl text-center ${a.priority === 'high' ? 'bg-orange-600 text-white' : 'bg-white'}`}>
                <div className="font-bold">{a.name}</div>
                <div className={a.priority === 'high' ? 'text-orange-100' : 'text-gray-600'}>{a.students} students</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Cerebrum</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-gray-50 p-6 rounded-xl">
                <f.icon className="w-10 h-10 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs - NEET Coaching Manimajra</h2>
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

      <section className="py-16 bg-gradient-to-br from-orange-900 to-amber-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Start NEET Prep from Manimajra!</h2>
          <p className="text-xl text-orange-100 mb-8">Join 60+ students. Book free demo now!</p>
          <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}><Button size="lg" className="bg-green-500 hover:bg-green-600"><Phone className="w-5 h-5 mr-2" />+91-8826444334</Button></Link>
        </div>
      </section>

      <nav className="py-4 bg-gray-100">
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li><Link href="/">Home</Link></li><li>/</li>
            <li><Link href="/neet-coaching-chandigarh">Chandigarh</Link></li><li>/</li>
            <li className="font-medium text-gray-900">Manimajra</li>
          </ol>
        </div>
      </nav>
    </div>
  )
}
