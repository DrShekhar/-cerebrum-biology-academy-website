'use client'

import { MapPin, Users, Trophy, Star, Award, BookOpen, Clock, Shield, Video, MessageCircle, Play, ArrowRight, GraduationCap, Building, Heart, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CitySchema } from '@/components/seo/CitySchema'

const localities = [
  { name: 'Mall Road', slug: 'mall-road', students: '80+', highlight: 'Central Hub', priority: 'high' },
  { name: 'Landour', slug: 'landour', students: '70+', highlight: 'Heritage Area', priority: 'high' },
  { name: 'Library Chowk', slug: 'library-chowk', students: '60+', highlight: 'Boarding Schools', priority: 'high' },
  { name: 'Picture Palace', slug: 'picture-palace', students: '50+', highlight: 'Tourist Area', priority: 'high' },
  { name: 'Kulri', slug: 'kulri', students: '45+', highlight: 'Commercial Hub', priority: 'medium' },
  { name: 'Happy Valley', slug: 'happy-valley', students: '40+', highlight: 'Tibetan Area', priority: 'medium' },
  { name: 'Cloud End', slug: 'cloud-end', students: '35+', highlight: 'Forest Area', priority: 'medium' },
  { name: 'Jharipani', slug: 'jharipani', students: '30+', highlight: 'Residential', priority: 'medium' },
]

const features = [
  { icon: Video, title: 'Live Interactive Classes', description: 'Real-time teaching perfect for boarding school students' },
  { icon: Users, title: 'Small Batches (10-15)', description: 'Exclusive hill station batches' },
  { icon: Award, title: 'AIIMS Trained Faculties', description: 'Expert doctors' },
  { icon: BookOpen, title: 'Boarding School Specialists', description: 'Perfect for Mussoorie boarding school students' },
  { icon: Clock, title: 'Flexible Timings', description: 'Batches suited for boarding school schedules' },
  { icon: Shield, title: 'Study from Hills', description: 'No need to leave your school - online coaching works everywhere' },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '340', icon: Star },
  { label: 'Hill Station Students', value: '200+', icon: Users },
  { label: 'Schools Served', value: '15+', icon: MapPin },
]

const faqs = [
  { question: 'Why is online coaching ideal for Mussoorie boarding school students?', answer: 'Boarding school students cant easily access physical coaching. Our online classes at Rs 24,000-48,000/year let you prepare for NEET from your hostel room.' },
  { question: 'Which schools do you serve in Mussoorie?', answer: 'We serve students from Wynberg Allen, Woodstock, Oak Grove, St. Georges, and all Mussoorie and Dehradun boarding schools.' },
  { question: 'What is the fee?', answer: 'Rs 24,000 to Rs 48,000 per year with EMI options.' },
  { question: 'Do you understand ICSE/ISC patterns?', answer: 'Yes! Most Mussoorie schools follow ICSE/ISC. Our faculty understand these patterns.' },
]

const premiumSchools = ['Wynberg Allen School', 'Woodstock School', 'Oak Grove School', 'St. Georges College', 'Mussoorie International', 'Guru Nanak Fifth Centenary', 'Convent of Jesus and Mary', 'St. Fidelis College']

const medicalColleges = ['AIIMS Rishikesh', 'Government Medical College Haldwani', 'SRHU Dehradun', 'AIIMS Delhi', 'PGIMER Chandigarh']

export default function NeetCoachingMussooriePage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_mussoorie', { event_category: 'conversion', event_label: 'neet_coaching_mussoorie_page', value: 1 })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema cityName="Mussoorie" citySlug="mussoorie" state="Uttarakhand" localities={localities.map((l) => l.name)} faqs={faqs} studentCount="500" coordinates={{ lat: '30.4598', lng: '78.0644' }} />
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-700 to-teal-800 text-white py-20 overflow-hidden"><div className="absolute inset-0 bg-black/20" /><div className="relative max-w-7xl mx-auto px-4"><div className="text-center max-w-4xl mx-auto animate-fadeInUp"><div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6"><MapPin className="w-5 h-5 mr-2" />Queen of Hills | Boarding School Specialists</div><h1 className="text-4xl md:text-6xl font-bold mb-6">Best <span className="text-yellow-300">NEET Coaching in Mussoorie</span></h1><h2 className="text-xl md:text-2xl opacity-90 mb-4">Mall Road | Landour | Library Chowk | Picture Palace</h2><p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">Perfect NEET coaching for boarding school students. Study from your hostel room with 98% success rate.</p><div className="flex flex-col sm:flex-row gap-4 justify-center mb-12"><Link href="/demo-booking"><Button variant="secondary" size="xl" onClick={handleDemoBooking} className="bg-yellow-500 text-black hover:bg-yellow-400"><Play className="w-5 h-5 mr-2" />Book Free Demo</Button></Link><Link href="/courses"><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-teal-900"><BookOpen className="w-5 h-5 mr-2" />View Courses</Button></Link></div><div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">{successMetrics.map((metric, index) => (<div key={metric.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp"><metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" /><div className="text-2xl font-bold">{metric.value}</div><div className="text-sm opacity-80">{metric.label}</div></div>))}</div></div></div></section>
      <section className="py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><div className="text-center mb-16 animate-fadeInUp"><h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Serving Mussoorie Boarding Schools</h2></div><div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">{localities.map((locality, index) => (<div key={locality.slug} className="animate-fadeInUp"><div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${locality.priority === 'high' ? 'ring-2 ring-teal-600' : ''}`}><div className="flex items-center justify-between mb-2"><h3 className="text-lg font-bold text-gray-900">{locality.name}</h3><MapPin className="w-5 h-5 text-teal-600" /></div><div className="text-2xl font-bold text-teal-600 mb-1">{locality.students}</div><div className="text-sm text-gray-500">{locality.highlight}</div></div></div>))}</div></div></section>
      <section className="py-20 bg-teal-50"><div className="max-w-7xl mx-auto px-4"><div className="flex flex-wrap justify-center gap-4">{medicalColleges.map((college, index) => (<div key={college} className="bg-white px-6 py-4 rounded-xl shadow-lg animate-fadeInUp"><div className="flex items-center"><Heart className="w-5 h-5 text-teal-600 mr-2" /><span className="font-semibold text-gray-900">{college}</span></div></div>))}</div></div></section>
      <section className="py-20 bg-white"><div className="max-w-7xl mx-auto px-4"><div className="grid md:grid-cols-3 gap-8 mb-16"><div className="bg-teal-50 rounded-xl p-8 border border-teal-100 animate-fadeInUp"><Building className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">Study from Hostel</h3><p className="text-gray-600">Online coaching works from anywhere.</p></div><div className="bg-teal-50 rounded-xl p-8 border border-teal-100 animate-fadeInUp"><TrendingUp className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">Rising Excellence</h3><p className="text-gray-600">Hill station students cracking NEET.</p></div><div className="bg-teal-50 rounded-xl p-8 border border-teal-100 animate-fadeInUp"><GraduationCap className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">ICSE/ISC Expert</h3><p className="text-gray-600">Boarding school curriculum specialists.</p></div></div><div className="bg-gray-50 rounded-2xl p-8"><h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Mussoorie Schools Trust Us</h3><div className="flex flex-wrap justify-center gap-4">{premiumSchools.map((school, index) => (<span key={school} className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm animate-fadeInUp">{school}</span>))}</div></div></div></section>
      <section className="py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{features.map((feature, index) => (<div key={feature.title} className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"><feature.icon className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></div>))}</div></div></section>
      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-4"><div className="space-y-6">{faqs.map((faq, index) => (<div key={faq.question} className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"><h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start"><MessageCircle className="w-6 h-6 mr-3 text-teal-600 flex-shrink-0 mt-1" />{faq.question}</h3><p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p></div>))}</div></div></section>
      <RelatedCityLinks currentCity="mussoorie" variant="default" />
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white"><div className="max-w-4xl mx-auto px-4 text-center"><div className="animate-fadeInUp"><h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your NEET Journey from the Queen of Hills</h2><p className="text-xl mb-8 opacity-90">98% success rate for boarding school students!</p><div className="flex flex-col sm:flex-row gap-4 justify-center mb-12"><Link href="/demo-booking"><Button variant="secondary" size="xl" onClick={handleDemoBooking} className="bg-yellow-500 text-black hover:bg-yellow-400"><Play className="w-5 h-5 mr-2" />Book Free Demo</Button></Link><Link href="/enrollment"><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-teal-600"><ArrowRight className="w-5 h-5 mr-2" />Enroll Now</Button></Link></div></div></div></section>
    </div>
  )
}
