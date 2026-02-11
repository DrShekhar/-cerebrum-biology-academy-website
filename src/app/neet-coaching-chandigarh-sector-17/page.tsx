'use client'

import { motion } from 'framer-motion'
import { Users, Trophy, Star, Award, Video, MessageCircle, ArrowRight, GraduationCap, Phone, Target, School, BookOpen, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { CitySchema } from '@/components/seo/CitySchema'

const WHATSAPP_NUMBER = '918826444334'
const WHATSAPP_MESSAGE = encodeURIComponent('Hi! I am interested in NEET coaching (Sector 17 Chandigarh). Please share details.')

const nearbyAreas = [
  { name: 'Sector 17', students: '120+', highlight: 'City Center', priority: 'high' },
  { name: 'Sector 16', students: '45+', highlight: 'Adjacent', priority: 'high' },
  { name: 'Sector 18', students: '35+', highlight: 'Residential', priority: 'medium' },
  { name: 'Sector 9', students: '40+', highlight: 'Near Lake', priority: 'medium' },
  { name: 'Sector 8', students: '30+', highlight: 'Premium Area', priority: 'medium' },
  { name: 'Sector 11', students: '25+', highlight: 'Colleges Hub', priority: 'medium' },
]

const features = [
  { icon: Video, title: 'Live Online Classes', description: 'Study from Sector 17 home. No travel to Sector 34 coaching hub.' },
  { icon: Users, title: 'Small Batches (10-15)', description: 'Unlike crowded 100+ batches at Sector 34 centers.' },
  { icon: Award, title: 'AIIMS Faculty', description: 'Teachers trained at AIIMS Delhi - not available locally.' },
  { icon: Clock, title: 'Flexible Timings', description: 'Morning, evening batches for Sector 17 school students.' },
  { icon: BookOpen, title: 'Complete Material', description: 'Digital notes, video recordings, mock tests included.' },
  { icon: Target, title: 'PGIMER Focus', description: 'Special prep for PGIMER Chandigarh - just 5 km away.' },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score', value: '358/360', icon: Star },
  { label: 'Sector 17 Students', value: '120+', icon: Users },
  { label: 'PGIMER Selections', value: '15+', icon: GraduationCap },
]

const schools = ['Bhavan Vidyalaya Sector 15', 'Government Model School Sector 16', 'St. Annes Sector 10', 'DAV College Sector 10', 'Government College Sector 11', 'GGDSD College Sector 32']

const faqs = [
  { question: 'Which is the best NEET coaching near Sector 17 Chandigarh?', answer: 'Cerebrum Biology Academy offers the best NEET coaching accessible from Sector 17 with AIIMS faculty, 98% success rate. 120+ students from City Center area enrolled. Online classes - no travel to crowded Sector 34!' },
  { question: 'Why not go to Sector 34 for NEET coaching?', answer: 'Sector 34 coaching centers have 60-120 students per batch, parking issues, and crowded classrooms. Cerebrum offers online classes with 10-15 students batch from your Sector 17 home. Same quality, better attention.' },
  { question: 'How much does NEET coaching cost for Sector 17 students?', answer: 'Cerebrum fees: Foundation Rs 24,000/year, Comprehensive Rs 36,000/year, Dropper Rs 68,000/year. Compare to Sector 34: Allen Rs 1.5-2.5 Lakhs, Aakash Rs 1-3.5 Lakhs. Save 60-70%!' },
  { question: 'What are batch timings for Sector 17 students?', answer: 'Multiple options: Morning (6-8 AM), After-school (4-6 PM), Evening (7-9 PM). Choose based on your school schedule. Weekend batches also available.' },
  { question: 'Is PGIMER nearby for Sector 17 students?', answer: 'Yes! PGIMER is just 5 km from Sector 17. Cerebrum has special PGIMER preparation focus with 15+ selections in recent years. Target PGIMER from your City Center home.' },
  { question: 'Which schools in Sector 17 area send students to Cerebrum?', answer: 'Students from Bhavan Vidyalaya, Government Model School Sector 16, St. Annes, DAV College, Government College Sector 11, and nearby schools enrolled with Cerebrum.' },
  { question: 'How do Sector 17 students clear doubts online?', answer: 'Live doubt solving in every class, WhatsApp direct to faculty (2-hour response), weekly doubt sessions, one-on-one video calls. No doubt goes unanswered!' },
  { question: 'Is dropper batch available for Sector 17 students?', answer: 'Yes! Intensive dropper batch at Rs 68,000/year. 6-8 hours daily, personal mentorship, weekly tests. Many droppers improved 100+ marks.' },
  { question: 'How to book free demo from Sector 17?', answer: 'Call/WhatsApp: +91-8826444334 or visit cerebrumbiologyacademy.com. Attend live demo from home. Free demo - no commitment!' },
  { question: 'What makes Cerebrum better than Sector 17 local tutors?', answer: 'AIIMS faculty (not local graduates), structured NEET curriculum, national mock tests, 98% success rate, complete study material, technology-enabled learning.' },
]

export default function Sector17Page() {
  return (
    <div className="min-h-screen">
      <CitySchema cityName="Sector 17 Chandigarh" citySlug="chandigarh-sector-17" state="Chandigarh" localities={nearbyAreas.map(a => a.name)} faqs={faqs} studentCount="120+" coordinates={{ lat: '30.7415', lng: '76.7836' }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-6">🎯 120+ Students from City Center Area</span>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">NEET Coaching for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Sector 17 Chandigarh</span></h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8">Skip crowded Sector 34 coaching. Get <strong>same quality NEET coaching</strong> online from City Center. AIIMS faculty, 98% success rate.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}><Button size="lg" className="bg-green-500 hover:bg-green-600"><MessageCircle className="w-5 h-5 mr-2" />WhatsApp Now</Button></Link>
              <Link href="/book-free-demo"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Book Free Demo<ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-xl bg-blue-50">
                <m.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-900">{m.value}</div>
                <div className="text-gray-600">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Students from <span className="text-blue-600">Sector 17 Area</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {nearbyAreas.map((a, i) => (
              <motion.div key={a.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className={`p-4 rounded-xl text-center ${a.priority === 'high' ? 'bg-blue-600 text-white' : 'bg-white'}`}>
                <div className="font-bold">{a.name}</div>
                <div className={a.priority === 'high' ? 'text-blue-100' : 'text-gray-600'}>{a.students} students</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sector 17 Students Choose Cerebrum</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-gray-50 p-6 rounded-xl">
                <f.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8"><School className="w-8 h-8 inline mr-2 text-blue-600" />Schools Near Sector 17</h2>
          <div className="flex flex-wrap justify-center gap-3">{schools.map(s => <span key={s} className="px-4 py-2 bg-white text-blue-700 rounded-full text-sm">{s}</span>)}</div>
        </div>
      </section>

      <VideoTestimonialsSection />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs - NEET Coaching Sector 17</h2>
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

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Start NEET Prep from Sector 17 Today!</h2>
          <p className="text-xl text-blue-100 mb-8">Join 120+ City Center students. Book free demo now!</p>
          <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}><Button size="lg" className="bg-green-500 hover:bg-green-600"><Phone className="w-5 h-5 mr-2" />+91-8826444334</Button></Link>
        </div>
      </section>

      <nav className="py-4 bg-gray-100">
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li><li>/</li>
            <li><Link href="/neet-coaching-chandigarh" className="hover:text-blue-600">Chandigarh</Link></li><li>/</li>
            <li className="font-medium text-gray-900">Sector 17</li>
          </ol>
        </div>
      </nav>
    </div>
  )
}
