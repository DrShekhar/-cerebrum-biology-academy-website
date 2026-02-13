'use client'

import {
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Shield,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Building,
  Heart,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CitySchema } from '@/components/seo/CitySchema'

const localities = [
  { name: 'Rajpur Road', slug: 'rajpur-road', students: '280+', highlight: 'Premium Hub', priority: 'high' },
  { name: 'Clock Tower', slug: 'clock-tower', students: '250+', highlight: 'Central Area', priority: 'high' },
  { name: 'Prem Nagar', slug: 'prem-nagar', students: '220+', highlight: 'Residential Zone', priority: 'high' },
  { name: 'Clement Town', slug: 'clement-town', students: '200+', highlight: 'Defense Area', priority: 'high' },
  { name: 'Race Course', slug: 'race-course', students: '190+', highlight: 'Educational Hub', priority: 'high' },
  { name: 'Ballupur', slug: 'ballupur', students: '170+', highlight: 'Growing Area', priority: 'medium' },
  { name: 'Dalanwala', slug: 'dalanwala', students: '160+', highlight: 'Commercial Hub', priority: 'medium' },
  { name: 'Vasant Vihar', slug: 'vasant-vihar', students: '150+', highlight: 'Premium Zone', priority: 'medium' },
  { name: 'Kargi Chowk', slug: 'kargi-chowk', students: '140+', highlight: 'Junction Area', priority: 'medium' },
  { name: 'Nehru Colony', slug: 'nehru-colony', students: '130+', highlight: 'Residential Area', priority: 'medium' },
  { name: 'Sahastradhara', slug: 'sahastradhara', students: '120+', highlight: 'Tourist Area', priority: 'medium' },
  { name: 'Raipur', slug: 'raipur', students: '110+', highlight: 'Old City', priority: 'medium' },
]

const features = [
  { icon: Video, title: 'Live Interactive Classes', description: 'Real-time teaching with instant doubt resolution from your hill station home' },
  { icon: Users, title: 'Small Batches (10-15)', description: 'Exclusive Uttarakhand batches with personal attention for every aspirant' },
  { icon: Award, title: 'AIIMS Trained Faculties', description: 'Expert doctors and teachers trained at premier medical institutions' },
  { icon: BookOpen, title: 'AIIMS Rishikesh Focused', description: 'Coaching designed to help you secure seats in Uttarakhand medical colleges' },
  { icon: Clock, title: 'Flexible Timings', description: 'Morning, afternoon, and evening batches to fit your schedule' },
  { icon: Shield, title: 'Stay in Dehradun', description: 'No need to migrate to Kota - get top coaching from the Doon Valley' },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '342', icon: Star },
  { label: 'UK Students', value: '1,800+', icon: Users },
  { label: 'Areas Covered', value: '12+', icon: MapPin },
]

const faqs = [
  { question: 'Why choose online coaching for NEET preparation in Dehradun?', answer: 'Dehradun students often consider migrating to Kota, spending Rs 3-4 lakhs annually. Our online coaching delivers same quality teaching at Rs 24,000-48,000 per year. Stay in the beautiful Doon Valley with family, save money, and get personalized attention. Our 98% success rate proves online is equally effective.' },
  { question: 'Which areas in Dehradun do you serve?', answer: 'We serve all major Dehradun localities including Rajpur Road, Clock Tower, Prem Nagar, Clement Town, Race Course, Ballupur, Dalanwala, and all surrounding areas including Mussoorie, Rishikesh. Students from any Uttarakhand district can join our online live classes.' },
  { question: 'What is the fee for NEET coaching in Dehradun?', answer: 'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - a fraction of Kota migration costs. We offer EMI options and merit scholarships specifically for Uttarakhand students.' },
  { question: 'Do you understand Uttarakhand board patterns?', answer: 'Yes! We have specialized batches for Uttarakhand board students. Our faculty understands the UK Board syllabus, exam patterns, and how to balance board exams with NEET preparation.' },
]

const premiumSchools = ['The Doon School', 'Welham Boys School', 'Welham Girls School', 'St. Josephs Academy', 'DAV Public School', 'Kendriya Vidyalaya', 'Brightlands School', 'Carman School', 'Ann Mary School', 'Cambrian Hall']

const medicalColleges = ['AIIMS Rishikesh', 'Government Medical College Haldwani', 'SRHU Dehradun', 'Himalayan Institute Dehradun', 'SGRR Medical College']

export default function NeetCoachingDehradunPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_dehradun', { event_category: 'conversion', event_label: 'neet_coaching_dehradun_page', value: 1 })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema cityName="Dehradun" citySlug="dehradun" state="Uttarakhand" localities={localities.map((l) => l.name)} faqs={faqs} studentCount="1800" coordinates={{ lat: '30.3165', lng: '78.0322' }} />

      <section className="relative bg-gradient-to-br from-teal-900 via-teal-700 to-teal-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fadeInUp">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Doon Valley | AIIMS Rishikesh Focused Coaching
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Best <span className="text-yellow-300">NEET Coaching in Dehradun</span></h1>
            <h2 className="text-xl md:text-2xl opacity-90 mb-4">Rajpur Road | Clock Tower | Prem Nagar | Clement Town</h2>
            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">Why migrate to Kota? Get AIIMS trained faculties, 98% success rate, and live interactive classes - all from Dehradun. Join 1,800+ Uttarakhand students achieving NEET success from home.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking"><Button variant="secondary" size="xl" onClick={handleDemoBooking} className="bg-yellow-500 text-black hover:bg-yellow-400"><Play className="w-5 h-5 mr-2" />Book Free Demo Class</Button></Link>
              <Link href="/courses"><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-teal-900"><BookOpen className="w-5 h-5 mr-2" />View Course Details</Button></Link>
            </div>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (<div key={metric.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp"><metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" /><div className="text-2xl font-bold">{metric.value}</div><div className="text-sm opacity-80">{metric.label}</div></div>))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">NEET Coaching Across All Dehradun Localities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">From Rajpur Road to Clement Town - we serve students from every corner of Dehradun and Uttarakhand.</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {localities.map((locality, index) => (<div key={locality.slug} className="animate-fadeInUp"><div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${locality.priority === 'high' ? 'ring-2 ring-teal-600' : ''}`}><div className="flex items-center justify-between mb-2"><h3 className="text-lg font-bold text-gray-900">{locality.name}</h3><MapPin className="w-5 h-5 text-teal-600" /></div><div className="text-2xl font-bold text-teal-600 mb-1">{locality.students}</div><div className="text-sm text-gray-500">{locality.highlight}</div>{locality.priority === 'high' && (<div className="mt-2 inline-flex items-center text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full"><Star className="w-3 h-3 mr-1" />High Demand</div>)}</div></div>))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Get Into Top Uttarakhand Medical Colleges</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our coaching is designed to help you secure seats in Uttarakhand&apos;s prestigious medical institutions.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {medicalColleges.map((college, index) => (<div key={college} className="bg-white px-6 py-4 rounded-xl shadow-lg animate-fadeInUp"><div className="flex items-center"><Heart className="w-5 h-5 text-teal-600 mr-2" /><span className="font-semibold text-gray-900">{college}</span></div></div>))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why Dehradun Students Choose Online NEET Coaching</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-teal-50 rounded-xl p-8 border border-teal-100 animate-fadeInUp"><Building className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">No Kota Migration</h3><p className="text-gray-600">Get Kota-quality coaching from Dehradun. Save Rs 2-3 lakhs annually and stay in the beautiful Doon Valley.</p></div>
            <div className="bg-teal-50 rounded-xl p-8 border border-teal-100 animate-fadeInUp"><TrendingUp className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">Rising Excellence</h3><p className="text-gray-600">Uttarakhand students are cracking NEET at record numbers. Be part of the success story.</p></div>
            <div className="bg-teal-50 rounded-xl p-8 border border-teal-100 animate-fadeInUp"><GraduationCap className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">UK Board Expert</h3><p className="text-gray-600">We understand UK Board patterns and Dehradun school schedules. Personalized support for Uttarakhand students.</p></div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Students from These Dehradun Schools Trust Us</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {premiumSchools.map((school, index) => (<span key={school} className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm animate-fadeInUp">{school}</span>))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Cerebrum for NEET Coaching in Dehradun?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (<div key={feature.title} className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"><feature.icon className="w-12 h-12 text-teal-600 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3><p className="text-gray-600">{feature.description}</p></div>))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions - NEET Coaching Dehradun</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (<div key={faq.question} className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"><h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start"><MessageCircle className="w-6 h-6 mr-3 text-teal-600 flex-shrink-0 mt-1" />{faq.question}</h3><p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p></div>))}
          </div>
        </div>
      </section>

      <RelatedCityLinks currentCity="dehradun" variant="default" />

      <section className="py-20 bg-gradient-to-r from-teal-600 via-teal-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your NEET Journey from the Doon Valley</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">98% success rate, AIIMS trained faculties, 1,800+ Uttarakhand students!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking"><Button variant="secondary" size="xl" onClick={handleDemoBooking} className="bg-yellow-500 text-black hover:bg-yellow-400"><Play className="w-5 h-5 mr-2" />Book Free Demo Class</Button></Link>
              <Link href="/enrollment"><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-teal-600"><ArrowRight className="w-5 h-5 mr-2" />Enroll Now</Button></Link>
            </div>
            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center"><CheckCircle className="w-4 h-4 mr-2" /><span>All Dehradun Areas</span></div>
              <div className="flex items-center justify-center"><CheckCircle className="w-4 h-4 mr-2" /><span>Live Classes</span></div>
              <div className="flex items-center justify-center"><CheckCircle className="w-4 h-4 mr-2" /><span>AIIMS Faculty</span></div>
              <div className="flex items-center justify-center"><CheckCircle className="w-4 h-4 mr-2" /><span>UK Specialist</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
