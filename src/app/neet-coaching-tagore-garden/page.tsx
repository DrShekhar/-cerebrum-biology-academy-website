'use client'

import Link from 'next/link'
import {
  MapPin,
  Train,
  Building2,
  School,
  Users,
  Trophy,
  Star,
  CheckCircle,
  ArrowRight,
  Clock,
  Award,
  Play,
  TrendingUp,
  Monitor,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LocalBusinessSchema, BreadcrumbSchema, SpeakableSchema } from '@/components/seo/StructuredData'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'

const nearbyAreas = [
  { area: 'Rajouri Garden', distance: '1.5 km', students: '85+', metro: 'Rajouri Garden' },
  { area: 'Subhash Nagar', distance: '2 km', students: '70+', metro: 'Subhash Nagar' },
  { area: 'Janakpuri', distance: '3 km', students: '95+', metro: 'Janakpuri West' },
  { area: 'Tilak Nagar', distance: '2 km', students: '60+', metro: 'Tilak Nagar' },
  { area: 'Vikaspuri', distance: '4 km', students: '55+', metro: 'Janakpuri East' },
  { area: 'Hari Nagar', distance: '3 km', students: '45+', metro: null },
  { area: 'Kirti Nagar', distance: '2.5 km', students: '50+', metro: 'Kirti Nagar' },
  { area: 'Moti Nagar', distance: '3.5 km', students: '40+', metro: 'Moti Nagar' },
  { area: 'Paschim Vihar', distance: '5 km', students: '65+', metro: 'Paschim Vihar East' },
  { area: 'Punjabi Bagh', distance: '4 km', students: '75+', metro: 'Punjabi Bagh' },
  { area: 'Madipur', distance: '3 km', students: '35+', metro: 'Madipur' },
  { area: 'Nangloi', distance: '6 km', students: '30+', metro: 'Nangloi' },
]

const premiumSocieties = [
  { name: 'Kohli One Westend Greens', location: 'Tagore Garden Extension', students: '45+' },
  { name: 'MIG Flats Extension', location: 'Tagore Garden', students: '65+' },
  { name: 'DDA SFS Flats', location: 'Tagore Garden', students: '55+' },
  { name: 'Rajouri Garden Extension', location: 'Rajouri Garden', students: '50+' },
  { name: 'Vikaspuri D Block', location: 'Vikaspuri', students: '40+' },
  { name: 'Janakpuri A Block', location: 'Janakpuri', students: '60+' },
  { name: 'Subhash Nagar Society', location: 'Subhash Nagar', students: '35+' },
  { name: 'Tilak Nagar Apartments', location: 'Tilak Nagar', students: '45+' },
  { name: 'Punjabi Bagh West Enclave', location: 'Punjabi Bagh', students: '55+' },
  { name: 'Paschim Vihar B Block', location: 'Paschim Vihar', students: '50+' },
  { name: 'Kirti Nagar Industrial Area', location: 'Kirti Nagar', students: '25+' },
  { name: 'Hari Nagar Extension', location: 'Hari Nagar', students: '30+' },
]

const nearbySchools = [
  { name: 'Tagore International School', area: 'Tagore Garden', distance: '0.5 km' },
  { name: 'Mount Abu Public School', area: 'Sector 5, Rohini', distance: '8 km' },
  { name: 'Bal Bharati Public School', area: 'Rajouri Garden', distance: '2 km' },
  { name: 'DAV Public School', area: 'Rajouri Garden', distance: '1.5 km' },
  { name: 'St. Mark\'s Sr. Sec. Public School', area: 'Janakpuri', distance: '3 km' },
  { name: 'Guru Harkrishan Public School', area: 'Tilak Nagar', distance: '2 km' },
  { name: 'Apeejay School', area: 'Punjabi Bagh', distance: '4 km' },
  { name: 'Sadhu Vaswani International School', area: 'Shanti Niketan', distance: '6 km' },
  { name: 'DPS Dwarka', area: 'Dwarka', distance: '10 km' },
  { name: 'Kendriya Vidyalaya', area: 'Janakpuri', distance: '3.5 km' },
  { name: 'Sachdeva Public School', area: 'Rohini', distance: '9 km' },
  { name: 'Ryan International School', area: 'Rohini', distance: '10 km' },
]

const metroStations = [
  { name: 'Tagore Garden', line: 'Blue Line', areas: 'Tagore Garden, Extension' },
  { name: 'Rajouri Garden', line: 'Blue & Pink Line', areas: 'Rajouri Garden, ESI Hospital' },
  { name: 'Subhash Nagar', line: 'Blue Line', areas: 'Subhash Nagar, Ramesh Nagar' },
  { name: 'Janakpuri West', line: 'Blue & Magenta Line', areas: 'Janakpuri, District Centre' },
  { name: 'Tilak Nagar', line: 'Blue Line', areas: 'Tilak Nagar, Gandhi Nagar' },
  { name: 'Kirti Nagar', line: 'Blue Line', areas: 'Kirti Nagar, Furniture Market' },
  { name: 'Moti Nagar', line: 'Blue Line', areas: 'Moti Nagar, Industrial Area' },
  { name: 'Punjabi Bagh', line: 'Green Line', areas: 'Punjabi Bagh East & West' },
  { name: 'Paschim Vihar East', line: 'Green Line', areas: 'Paschim Vihar, A1 Block' },
  { name: 'Madipur', line: 'Green Line', areas: 'Madipur, Karampura' },
]

const successStats = [
  { label: 'West Delhi Students', value: '750+', icon: Users },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'NEET Selections', value: '520+', icon: Award },
  { label: 'Google Rating', value: '4.9', icon: Star },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching near Tagore Garden, Delhi?',
    answer:
      'Cerebrum Biology Academy is rated the best NEET coaching accessible from Tagore Garden with 98% success rate. We have 750+ students from West Delhi areas including Tagore Garden, Rajouri Garden, Janakpuri, and Punjabi Bagh. Our AIIMS-trained faculty and small batch sizes (15-20 students) ensure personalized attention for every student.',
  },
  {
    question: 'How far is Cerebrum Academy from Tagore Garden?',
    answer:
      'Our Rohini center is just 20 minutes from Tagore Garden via Delhi Metro. Take the Blue Line from Tagore Garden to Kashmere Gate, then switch to Red Line to Rohini. We also offer 100% online live classes that you can attend from home, saving travel time completely.',
  },
  {
    question: 'Do you offer coaching for students from Kohli One Westend Greens and MIG Flats?',
    answer:
      'Yes! We have many students from Kohli One Westend Greens, MIG Flats Extension, and other premium societies in Tagore Garden. Our online classes are particularly popular with these students as they can attend live interactive sessions from their homes with the same quality as physical classes.',
  },
  {
    question: 'What are the fees for NEET coaching for Tagore Garden students?',
    answer:
      'Our NEET Biology coaching fees range from Rs 45,000 to Rs 1,56,000 per year depending on the program and tier. Class 9-10: Rs 45,000-Rs 90,000, Class 11: Rs 48,000-Rs 98,000, Class 12: Rs 70,000-Rs 1,56,000. All programs include AIIMS faculty and smaller batches.',
  },
  {
    question: 'Is online NEET coaching effective for West Delhi students?',
    answer:
      'Yes! Our online coaching is extremely effective with live interactive classes, 24/7 doubt support, and recorded sessions. Students from Tagore Garden, Rajouri Garden, Janakpuri, and remote areas prefer online classes for convenience while maintaining top results. Our online students actually perform slightly better due to recorded lectures enabling unlimited revision.',
  },
  {
    question: 'What are the batch timings for Tagore Garden area students?',
    answer:
      'We offer flexible batch timings: Morning Batch: 6:00 AM - 9:00 AM, Day Batch: 2:00 PM - 6:00 PM (for droppers), Evening Batch: 6:00 PM - 9:00 PM (for school students), Weekend Batch: Saturday-Sunday 9:00 AM - 1:00 PM. All batches available online. School students from Tagore International, Bal Bharati prefer evening batches.',
  },
  {
    question: 'Which schools from Tagore Garden area have students at Cerebrum?',
    answer:
      'Students from all top West Delhi schools study with us: Tagore International School (65+ students), Bal Bharati Public School Rajouri Garden (55+ students), DAV Rajouri Garden (45+ students), St. Mark\'s Janakpuri (50+ students), Mount Abu Public School (40+ students), and Apeejay Punjabi Bagh (35+ students). Online classes fit perfectly with school schedules.',
  },
  {
    question: 'Do you provide study material for online students?',
    answer:
      'Complete digital + physical study material provided: NCERT Chapter Notes, Practice Question Banks (5,000+ MCQs), Previous Year Papers (NEET 2013-2024), Weekly Test Series (40+ chapter tests + 10 full mocks), Revision Modules. Material shipped to your Tagore Garden address. Digital access immediate upon enrollment.',
  },
  {
    question: 'Can I join mid-session from Tagore Garden?',
    answer:
      'Yes, mid-session admissions are allowed with catch-up support. We provide recorded lectures of missed classes, extra doubt sessions, personalized catch-up schedule, and previous study materials. Most students join within first 2 months. Call +91 88264 44334 for customized admission guidance.',
  },
  {
    question: 'Do you provide demo classes for Tagore Garden students?',
    answer:
      'Yes, FREE demo class available: Online Demo - Join live Zoom class (1 hour Biology lecture + 30 min doubt session), Recorded Demo - Watch sample lecture anytime. Book via: Website cerebrumbiologyacademy.com/demo-booking, Phone +91 88264 44334, or WhatsApp. Demo includes interaction with Dr. Shekhar Sir and sample study material.',
  },
]

export default function NEETCoachingTagoreGardenPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_tagore_garden', {
        event_category: 'conversion',
        event_label: 'tagore_garden_hub_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              #1 NEET Coaching for Tagore Garden & West Delhi
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">NEET Biology Coaching</span> in Tagore Garden
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Tagore Garden | Rajouri Garden | Janakpuri | Punjabi Bagh | West Delhi
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto hero-description">
              Join 750+ NEET aspirants from West Delhi. Expert AIIMS faculty, 98% success rate, live
              online classes accessible from Kohli One Westend Greens, MIG Flats Extension &amp; all
              premium West Delhi localities. Just 20 minutes from Rohini via Metro.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20interested%20in%20NEET%20coaching%20from%20Tagore%20Garden.%20Please%20share%20details."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp: +91 88264 44334
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {successStats.map((stat, index) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 animate-fadeInUp">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs md:text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer Section for Speakable */}
      <section className="py-8 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="quick-answer bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-600">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              NEET Coaching Near Tagore Garden - Quick Answer
            </h2>
            <p className="text-gray-700">
              Cerebrum Biology Academy offers the best NEET coaching for students in Tagore Garden, West Delhi.
              Our Rohini center is just 20 minutes away via Blue Line Metro. We serve 750+ students from
              Tagore Garden Extension, Kohli One Westend Greens, MIG Flats, Rajouri Garden, Janakpuri, and
              surrounding areas. With 98% success rate, AIIMS-trained faculty, and flexible online/offline
              options, we provide comprehensive NEET Biology preparation. Call +91 88264 44334 or book a
              free demo class today.
            </p>
          </div>
        </div>
      </section>

      {/* Distance from Rohini Section */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Just 20 Minutes from Rohini via Metro
              </h2>
              <p className="text-lg opacity-90 mb-6">
                Our Rohini center is easily accessible from Tagore Garden. Take the Blue Line from
                Tagore Garden Metro to Kashmere Gate, then switch to the Red Line to reach Rohini
                in just 20 minutes.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Train className="w-6 h-6 text-yellow-300" />
                  <span>Blue Line: Tagore Garden to Kashmere Gate (15 min)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Train className="w-6 h-6 text-yellow-300" />
                  <span>Red Line: Kashmere Gate to Rohini (5 min)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-yellow-300" />
                  <span>Total Travel Time: ~20 minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Monitor className="w-6 h-6 text-yellow-300" />
                  <span>Or attend 100% online from home - same quality!</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Metro Route from Tagore Garden</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <div className="font-semibold">Start: Tagore Garden Metro</div>
                    <div className="text-sm opacity-80">Blue Line</div>
                  </div>
                </div>
                <div className="border-l-2 border-white/30 ml-4 h-6"></div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold text-black">2</div>
                  <div>
                    <div className="font-semibold">Change: Kashmere Gate</div>
                    <div className="text-sm opacity-80">Switch to Red Line</div>
                  </div>
                </div>
                <div className="border-l-2 border-white/30 ml-4 h-6"></div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <div className="font-semibold">Arrive: Rohini Sector 18</div>
                    <div className="text-sm opacity-80">Walk to Cerebrum Academy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Areas Coverage */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching for All West Delhi Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Students from every West Delhi locality trust us. Our online classes make quality NEET
              coaching accessible from anywhere.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nearbyAreas.map((item, index) => (
              <div key={item.area} className="bg-white rounded-xl shadow-md hover:shadow-xl p-5 transition-all hover:-translate-y-1 border border-gray-100 animate-fadeInUp">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">{item.area}</span>
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-sm text-gray-500 mb-2">{item.distance} from center</div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-semibold">{item.students} students</span>
                  {item.metro && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center">
                      <Train className="w-3 h-3 mr-1" />
                      Metro
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Societies Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Premium Tagore Garden & West Delhi Societies
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trusted by families from West Delhi&apos;s best residential complexes including
              Kohli One Westend Greens and MIG Flats Extension
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {premiumSocieties.map((society, index) => (
              <div key={society.name} className="bg-blue-50 rounded-xl p-5 border border-blue-100 animate-fadeInUp">
                <Building2 className="w-6 h-6 text-blue-600 mb-2" />
                <div className="font-bold text-gray-900">{society.name}</div>
                <div className="text-sm text-gray-500">{society.location}</div>
                <div className="text-blue-600 font-semibold mt-2">{society.students} students</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Modes Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp"
          >
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Monitor className="w-4 h-4" />
              Flexible Learning Options
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Learning Mode
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Study from your Tagore Garden home or visit our Rohini center - the choice is yours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Online Mode */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition animate-fadeInUp">
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <Monitor className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Online</h3>
              <p className="text-slate-300 mb-4">Live interactive classes from your West Delhi home. No travel needed.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Live classes with Dr. Shekhar</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Instant doubt resolution</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Recorded lectures for revision</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" />Digital study material</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-white/20">
                <span className="text-yellow-400 font-semibold">Rs 45,000/year</span>
                <span className="text-slate-400 text-sm ml-2">Most Popular</span>
              </div>
            </div>

            {/* Hybrid Mode */}
            <div className="bg-yellow-500 rounded-2xl p-6 text-slate-900 relative overflow-hidden animate-fadeInUp">
              <div className="absolute top-0 right-0 bg-slate-900 text-yellow-400 text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hybrid Mode</h3>
              <p className="text-slate-700 mb-4">Online classes + Weekend offline sessions at Rohini center.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-slate-900" />All online benefits included</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-slate-900" />Weekend tests at center</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-slate-900" />Face-to-face doubt sessions</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-slate-900" />Peer learning environment</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-slate-900/20">
                <span className="text-slate-900 font-semibold">Rs 55,000/year</span>
                <span className="text-slate-700 text-sm ml-2">Best Value</span>
              </div>
            </div>

            {/* Offline Mode */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition animate-fadeInUp">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Full Offline</h3>
              <p className="text-slate-300 mb-4">Daily classes at our Rohini center, just 20 min from Tagore Garden.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-400" />Regular classroom learning</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-400" />Small batch of 15 students</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-400" />Physical library access</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-400" />Daily doubt classes</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-white/20">
                <span className="text-yellow-400 font-semibold">Rs 65,000/year</span>
                <span className="text-slate-400 text-sm ml-2">Premium</span>
              </div>
            </div>
          </div>

          {/* Rohini Center Info */}
          <div className="mt-12 bg-white/5 rounded-2xl p-6 max-w-4xl mx-auto animate-fadeInUp">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Rohini Offline Center</h3>
                <p className="text-slate-300 mb-4">
                  Our Rohini center is just 20 minutes from Tagore Garden via Delhi Metro Blue Line to Red Line connection.
                  Perfect for students preferring classroom learning.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1"><Train className="w-4 h-4 text-yellow-400" />Metro: Blue + Red Line</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-yellow-400" />20 min from Tagore Garden</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-yellow-400" />Sector 18, Rohini</span>
                </div>
              </div>
              <Link
                href="/locations/rohini"
                className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition whitespace-nowrap"
              >
                View Center Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-16 md:py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Top West Delhi Schools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trusted by students from leading schools in Tagore Garden, Rajouri Garden,
              Janakpuri and surrounding areas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nearbySchools.map((school, index) => (
              <div key={school.name} className="bg-white rounded-xl shadow-md p-5 border border-gray-100 animate-fadeInUp">
                <School className="w-6 h-6 text-blue-600 mb-2" />
                <div className="font-bold text-gray-900 text-sm">{school.name}</div>
                <div className="text-sm text-gray-500">{school.area}</div>
                <div className="text-blue-600 text-sm mt-2">{school.distance}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metro Connectivity Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Metro Connectivity from West Delhi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Easy access from all major West Delhi metro stations via Blue, Green, and Pink lines
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {metroStations.map((station, index) => (
              <div key={station.name} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100 animate-fadeInUp">
                <Train className="w-5 h-5 text-blue-600 mb-2" />
                <div className="font-bold text-gray-900 text-sm">{station.name}</div>
                <div className="text-xs text-blue-600 font-medium">{station.line}</div>
                <div className="text-xs text-gray-500 mt-1">{station.areas}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free NEET Tools Section */}
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Boost your NEET preparation with our AI-powered tools - 100% Free for Tagore Garden students"
        showAllLink={true}
        compact={false}
      />

      {/* Google Reviews & Map Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by West Delhi Families
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See what students and parents from Tagore Garden, Rajouri Garden, and Janakpuri say about us
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Google Rating Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 flex flex-col items-center animate-fadeInUp">
              <div className="w-16 h-16 mb-4">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-1">4.9</div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-gray-700 font-semibold mb-6">
                  Based on 500+ verified reviews
                </div>
                <div className="space-y-3 w-full">
                  <Link
                    href="https://g.page/r/CeQX5XZ9QZ9QEBA/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Read All Reviews on Google
                  </Link>
                </div>
              </div>
            </div>

            {/* Review Highlights */}
            <div className="lg:col-span-2 space-y-5">
              {/* Review 1: Tagore Garden Student */}
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeInUp">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      P
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Priya, Tagore International School</div>
                      <div className="text-sm text-gray-600">Class 12 Student, Tagore Garden</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  &quot;Best NEET Biology coaching accessible from Tagore Garden! The online classes are amazing -
                  I save 2 hours daily that I would have spent traveling. Scored 658/720 in NEET 2024.
                  Dr. Shekhar Sir&apos;s teaching methodology is exceptional. Highly recommend for West Delhi students!&quot;
                </p>
                <div className="mt-3 flex items-center text-sm text-teal-700">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span className="font-semibold">658/720 NEET 2024 | Government Medical College</span>
                </div>
              </div>

              {/* Review 2: MIG Flats Parent */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeInUp">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      R
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Rakesh Sharma, Parent</div>
                      <div className="text-sm text-gray-600">MIG Flats Extension, Tagore Garden</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  &quot;My son takes online classes from our MIG Flats home. The convenience is unmatched -
                  no travel stress and he can focus entirely on studies. His score improved from 520 to 635
                  in just 6 months. Best investment for his NEET preparation!&quot;
                </p>
                <div className="mt-3 flex items-center text-sm text-orange-700">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="font-semibold">520 to 635 Improvement | +115 Marks</span>
                </div>
              </div>

              {/* Review 3: Rajouri Garden Student */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeInUp">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      A
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Aditya, Bal Bharati Public School</div>
                      <div className="text-sm text-gray-600">Rajouri Garden</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  &quot;Perfect for students in West Delhi. The hybrid mode works great - online classes during
                  weekdays and offline tests on weekends at Rohini. Metro connectivity makes it super easy.
                  Scored 350/360 in Biology section!&quot;
                </p>
                <div className="mt-3 flex items-center text-sm text-purple-700">
                  <Trophy className="w-4 h-4 mr-1" />
                  <span className="font-semibold">350/360 Biology | Near-Perfect Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions from Tagore Garden and West Delhi students
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-fadeInUp">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50">
                    <span>{faq.question}</span>
                    <ArrowRight className="w-5 h-5 text-blue-600 transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-700">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your NEET Journey from Tagore Garden Today
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join 750+ successful students from West Delhi. Book your free demo class now!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20interested%20in%20NEET%20coaching%20from%20Tagore%20Garden.%20Please%20share%20details."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 animate-fadeInUp"
      >
        <Link
          href="https://wa.me/918826444334?text=Hi%2C%20I%27m%20interested%20in%20NEET%20coaching%20from%20Tagore%20Garden.%20Please%20share%20details."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white" />
        </Link>
      </div>

      {/* Schema Markup for SEO */}
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'NEET Coaching', url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram' },
          { name: 'Tagore Garden', url: 'https://cerebrumbiologyacademy.com/neet-coaching-tagore-garden' },
        ]}
      />
      <SpeakableSchema
        name="NEET Coaching in Tagore Garden"
        description="Best NEET Biology coaching for Tagore Garden and West Delhi students. Online classes with optional offline at Rohini center. Just 20 minutes via Metro. Serving Kohli One Westend Greens, MIG Flats, and all premium societies."
        speakableSelectors={['h1', '.quick-answer', '.hero-description']}
        url="https://cerebrumbiologyacademy.com/neet-coaching-tagore-garden"
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Tagore Garden Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': 'https://cerebrumbiologyacademy.com/neet-coaching-tagore-garden#service',
            name: 'NEET Biology Coaching Tagore Garden',
            description: 'Online NEET Biology coaching for Tagore Garden and West Delhi students with optional offline classes at Rohini center. Serving Kohli One Westend Greens, MIG Flats Extension, Rajouri Garden, Janakpuri, and all premium West Delhi societies.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
            },
            areaServed: [
              { '@type': 'Place', name: 'Tagore Garden', containedIn: { '@type': 'City', name: 'Delhi' } },
              { '@type': 'Place', name: 'Rajouri Garden', containedIn: { '@type': 'City', name: 'Delhi' } },
              { '@type': 'Place', name: 'Janakpuri', containedIn: { '@type': 'City', name: 'Delhi' } },
              { '@type': 'Place', name: 'Punjabi Bagh', containedIn: { '@type': 'City', name: 'Delhi' } },
              { '@type': 'Place', name: 'Tilak Nagar', containedIn: { '@type': 'City', name: 'Delhi' } },
              { '@type': 'Place', name: 'West Delhi', containedIn: { '@type': 'City', name: 'Delhi' } },
            ],
            serviceType: 'Online NEET Coaching with Hybrid Option',
            availableChannel: {
              '@type': 'ServiceChannel',
              serviceUrl: 'https://cerebrumbiologyacademy.com/neet-coaching-tagore-garden',
              servicePhone: '+918826444334',
              availableLanguage: ['English', 'Hindi'],
            },
            offers: [
              {
                '@type': 'Offer',
                name: 'Online NEET Biology Classes',
                description: 'Live interactive online classes from home',
                price: '45000',
                priceCurrency: 'INR',
              },
              {
                '@type': 'Offer',
                name: 'Hybrid Mode (Online + Weekend Offline)',
                description: 'Online classes with weekend offline sessions at Rohini center',
                price: '55000',
                priceCurrency: 'INR',
              },
            ],
          }),
        }}
      />

      {/* Topic Cluster Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'NEET Coaching Tagore Garden - Related Resources',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Online NEET Classes West Delhi', url: 'https://cerebrumbiologyacademy.com/online-neet-classes-west-delhi' },
              { '@type': 'ListItem', position: 2, name: 'NEET Coaching Rajouri Garden', url: 'https://cerebrumbiologyacademy.com/neet-coaching-rajouri-garden' },
              { '@type': 'ListItem', position: 3, name: 'NEET Coaching Janakpuri', url: 'https://cerebrumbiologyacademy.com/neet-coaching-janakpuri' },
              { '@type': 'ListItem', position: 4, name: 'Best NEET Coaching Delhi', url: 'https://cerebrumbiologyacademy.com/best-neet-coaching-delhi' },
              { '@type': 'ListItem', position: 5, name: 'Rohini Offline Center', url: 'https://cerebrumbiologyacademy.com/locations/rohini' },
            ],
          }),
        }}
      />
    </div>
  )
}
