'use client'

import { Users, Trophy, Star, Award, Video, MessageCircle, ArrowRight, GraduationCap, Phone, Target, School, BookOpen, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent('Hi! I am interested in NEET coaching (Sector 22 Chandigarh). Please share details.')

const nearbyAreas = [
  { name: 'Sector 22', students: '95+', highlight: 'Commercial Hub', priority: 'high' },
  { name: 'Sector 21', students: '35+', highlight: 'Residential', priority: 'high' },
  { name: 'Sector 23', students: '30+', highlight: 'Adjacent', priority: 'medium' },
  { name: 'Sector 19', students: '28+', highlight: 'Near Market', priority: 'medium' },
  { name: 'Sector 20', students: '25+', highlight: 'Residential', priority: 'medium' },
]

const features = [
  { icon: Video, title: 'Live Online Classes', description: 'Study from Sector 22 home. Skip traffic to Sector 34.' },
  { icon: Users, title: 'Small Batches (10-15)', description: 'Personal attention unlike crowded coaching centers.' },
  { icon: Award, title: 'AIIMS Faculty', description: 'Teachers trained at AIIMS Delhi.' },
  { icon: Clock, title: 'Flexible Timings', description: 'Morning, evening batches available.' },
  { icon: BookOpen, title: 'Complete Material', description: 'Notes, videos, mock tests included.' },
  { icon: Target, title: 'PGIMER Focus', description: 'Special prep for PGIMER, GMCH.' },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score', value: '358/360', icon: Star },
  { label: 'Sector 22 Area', value: '95+', icon: Users },
  { label: 'PGIMER Selections', value: '15+', icon: GraduationCap },
]

const schools = ['Government Model School Sector 20', 'DAV Sector 8', 'Carmel Convent Sector 9', 'St. Kabir Public School']

const faqs = [
  { question: 'Which is the best NEET coaching near Sector 22 Chandigarh?', answer: 'Cerebrum Biology Academy offers excellent NEET coaching for Sector 22 students with AIIMS faculty, 98% success rate. 95+ students from Commercial Hub area enrolled. Online classes - no Sector 34 traffic!' },
  { question: 'How much does NEET coaching cost for Sector 22 students?', answer: 'Cerebrum fees: Foundation Rs 24,000/year, Comprehensive Rs 36,000/year, Dropper Rs 68,000/year. Save 60-70% compared to Sector 34 coaching centers.' },
  { question: 'What are batch timings for Sector 22 students?', answer: 'Multiple options: Morning (6-8 AM), After-school (4-6 PM), Evening (7-9 PM). Weekend batches also available.' },
  { question: 'Is dropper batch available?', answer: 'Yes! Intensive dropper batch at Rs 68,000/year with 6-8 hours daily coaching, personal mentorship, weekly tests.' },
  { question: 'How do students clear doubts online?', answer: 'Live doubt solving, WhatsApp to faculty, weekly doubt sessions, one-on-one video calls. Every doubt answered!' },
  { question: 'How to book free demo from Sector 22?', answer: 'Call/WhatsApp: +91-8826444334 or visit cerebrumbiologyacademy.com. Free demo - no commitment!' },
]

export default function Sector22Page() {
  return (
    <div className="min-h-screen">
      <CitySchema cityName="Sector 22 Chandigarh" citySlug="chandigarh-sector-22" state="Chandigarh" localities={nearbyAreas.map(a => a.name)} faqs={faqs} studentCount="95+" coordinates={{ lat: '30.7333', lng: '76.7694' }} />

      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium mb-6">🎯 95+ Students from Commercial Hub Area</span>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">NEET Coaching for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Sector 22 Chandigarh</span></h1>
            <p className="text-xl lg:text-2xl text-emerald-100 mb-8">Skip Sector 34 crowd. Get <strong>premium NEET coaching</strong> online from Sector 22. AIIMS faculty, 98% success.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}><Button size="lg" className="bg-green-500 hover:bg-green-600"><MessageCircle className="w-5 h-5 mr-2" />WhatsApp Now</Button></Link>
              <Link href="/book-free-demo"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Book Free Demo<ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((m, i) => (
              <div key={m.label} className="text-center p-6 rounded-xl bg-emerald-50 animate-fadeInUp">
                <m.icon className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-emerald-900">{m.value}</div>
                <div className="text-gray-600">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Students from <span className="text-emerald-600">Sector 22 Area</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((a, i) => (
              <div key={a.name} className={`p-4 rounded-xl text-center ${a.priority === 'high' ? 'bg-emerald-600 text-white' : 'bg-white'}`}>
                <div className="font-bold">{a.name}</div>
                <div className={a.priority === 'high' ? 'text-emerald-100' : 'text-gray-600'}>{a.students} students</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Cerebrum</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div key={f.title} className="bg-gray-50 p-6 rounded-xl animate-fadeInUp">
                <f.icon className="w-10 h-10 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8"><School className="w-8 h-8 inline mr-2 text-emerald-600" />Nearby Schools</h2>
          <div className="flex flex-wrap justify-center gap-3">{schools.map(s => <span key={s} className="px-4 py-2 bg-white text-emerald-700 rounded-full text-sm">{s}</span>)}</div>
        </div>
      </section>

      <VideoTestimonialsSection />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs - NEET Coaching Sector 22</h2>
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

      <section className="py-16 bg-gradient-to-br from-emerald-900 to-teal-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Start NEET Prep from Sector 22!</h2>
          <p className="text-xl text-emerald-100 mb-8">Join 95+ students. Book free demo now!</p>
          <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}><Button size="lg" className="bg-green-500 hover:bg-green-600"><Phone className="w-5 h-5 mr-2" />+91-8826444334</Button></Link>
        </div>
      </section>

      <nav className="py-4 bg-gray-100">
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li><Link href="/">Home</Link></li><li>/</li>
            <li><Link href="/neet-coaching-chandigarh">Chandigarh</Link></li><li>/</li>
            <li className="font-medium text-gray-900">Sector 22</li>
          </ol>
        </div>
      </nav>
    </div>
  )
}
