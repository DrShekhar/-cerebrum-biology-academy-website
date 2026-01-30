'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  Train,
  Building2,
  GraduationCap,
  School,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  BookOpen,
  Award,
  Play,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LocalBusinessSchema, FAQSchema } from '@/components/seo/StructuredData'
import {
  getAllGhaziabadAreaSlugs,
  getGhaziabadAreaBySlug,
  getGhaziabadAreasByType,
  getGhaziabadAreasByMetroLine,
} from '@/data/ghaziabad-areas'

// Get all areas from centralized data
const allAreaSlugs = getAllGhaziabadAreaSlugs()
const blueLineAreas = getGhaziabadAreasByMetroLine('Blue')
const redLineAreas = getGhaziabadAreasByMetroLine('Red')
const premiumAreasData = getGhaziabadAreasByType('premium')
const townshipAreasData = getGhaziabadAreasByType('township')

const ghaziabadAreas = [
  {
    name: 'Indirapuram',
    slug: 'indirapuram',
    students: '350+',
    highlight: 'Premium Hub',
    metro: true,
  },
  {
    name: 'Vaishali',
    slug: 'vaishali',
    students: '180+',
    highlight: 'Blue Line Metro',
    metro: true,
  },
  {
    name: 'Vasundhara',
    slug: 'vasundhara',
    students: '120+',
    highlight: 'Growing Area',
    metro: false,
  },
  {
    name: 'Crossing Republik',
    slug: 'crossing-republik',
    students: '200+',
    highlight: 'Mega Township',
    metro: false,
  },
  {
    name: 'Raj Nagar Extension',
    slug: 'raj-nagar-extension',
    students: '150+',
    highlight: 'NH-58 Corridor',
    metro: true,
  },
  { name: 'Kaushambi', slug: 'kaushambi', students: '95+', highlight: 'Metro Hub', metro: true },
  {
    name: 'Mohan Nagar',
    slug: 'mohan-nagar',
    students: '75+',
    highlight: 'Red Line Metro',
    metro: true,
  },
  {
    name: 'Sahibabad',
    slug: 'sahibabad',
    students: '60+',
    highlight: 'Industrial Hub',
    metro: true,
  },
]

const premiumSocieties = [
  { name: 'ATS Advantage', location: 'Ahinsa Khand, Indirapuram', students: '45+' },
  { name: 'Shipra Srishti', location: 'Ahinsa Khand, Indirapuram', students: '35+' },
  { name: 'VVIP Addresses', location: 'Raj Nagar Extension', students: '40+' },
  { name: 'KW Srishti', location: 'Raj Nagar Extension', students: '30+' },
  { name: 'Mahagun Montage', location: 'Crossing Republik', students: '50+' },
  { name: 'Supertech Livingston', location: 'Crossing Republik', students: '45+' },
  { name: 'Ramprastha Greens', location: 'Vaishali Sector 7', students: '35+' },
  { name: 'Saya Gold Avenue', location: 'Indirapuram', students: '25+' },
  { name: 'Gaur Green City', location: 'Vaibhav Khand', students: '30+' },
  { name: 'Orange County', location: 'Indirapuram', students: '28+' },
  { name: 'Ashiana Upvan', location: 'Ahinsa Khand 2', students: '22+' },
  { name: 'ABA Olive County', location: 'Vasundhara Sector 5', students: '20+' },
]

const indirapuramKhands = [
  { name: 'Ahinsa Khand', societies: 'ATS Advantage, Shipra Srishti, Saya Zenith' },
  { name: 'Vaibhav Khand', societies: 'Gaur Green City, Mahagun' },
  { name: 'Nyay Khand', societies: 'Amrapali Village, Builder Flats' },
  { name: 'Abhay Khand', societies: 'Premium Builder Floors' },
  { name: 'Gyan Khand', societies: 'Residential Societies' },
  { name: 'Niti Khand', societies: 'Builder Flats Hub' },
  { name: 'Shakti Khand', societies: 'Growing Residential' },
]

const nearbySchools = [
  { name: 'DPS Indirapuram', location: 'Indirapuram', type: 'CBSE' },
  { name: 'Ryan International', location: 'Multiple', type: 'CBSE' },
  { name: 'Amity International', location: 'Vasundhara', type: 'CBSE' },
  { name: 'Cambridge School', location: 'Indirapuram', type: 'CBSE' },
  { name: 'K.R. Mangalam World School', location: 'Vaishali', type: 'CBSE' },
  { name: 'St. Teresa School', location: 'Indirapuram', type: 'CBSE' },
  { name: 'G D Goenka School', location: 'Indirapuram', type: 'CBSE' },
  { name: 'Seth Anandram Jaipuria', location: 'Ghaziabad', type: 'CBSE' },
  { name: 'JKG International', location: 'Multiple', type: 'CBSE' },
  { name: 'Presidium School', location: 'Indirapuram', type: 'CBSE' },
]

const metroStations = [
  { name: 'Vaishali', line: 'Blue Line', areas: 'Vaishali, Vasundhara, Indirapuram' },
  { name: 'Kaushambi', line: 'Blue Line', areas: 'Kaushambi, nearby sectors' },
  { name: 'Mohan Nagar', line: 'Red Line', areas: 'Sahibabad Industrial' },
  { name: 'Shaheed Sthal', line: 'Red Line', areas: 'New Bus Adda, New Ghaziabad' },
  { name: 'Rajendra Nagar', line: 'Red Line', areas: 'Rajendra Nagar area' },
  { name: 'Shyam Park', line: 'Red Line', areas: 'Sahibabad locality' },
  { name: 'Arthala', line: 'Red Line', areas: 'Arthala area' },
  { name: 'Hindon River', line: 'Red Line', areas: 'Hindon locality' },
]

const colleges = [
  { name: 'KIET Group of Institutions', type: 'Engineering', students: '80+' },
  { name: 'ABES Engineering College', type: 'Engineering', students: '60+' },
  { name: 'AKGEC', type: 'Engineering', students: '70+' },
  { name: 'IPEC Ghaziabad', type: 'Engineering', students: '50+' },
  { name: 'IMS Engineering', type: 'Engineering', students: '45+' },
]

const successStats = [
  { label: 'Ghaziabad Students', value: '1,500+', icon: Users },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'NEET Selections', value: '1,100+', icon: Award },
  { label: 'Google Rating', value: '4.9', icon: Star },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Ghaziabad?',
    answer:
      'Cerebrum Biology Academy is rated the best NEET coaching in Ghaziabad with 98% success rate. We have 1,500+ students from Indirapuram, Vaishali, Crossing Republik, Raj Nagar Extension and all major areas. Our AIIMS-trained faculty and small batch sizes ensure personalized attention.',
  },
  {
    question: 'Do you have coaching centers in Indirapuram?',
    answer:
      'We offer online live classes accessible from all Indirapuram Khands - Ahinsa Khand, Vaibhav Khand, Nyay Khand, Abhay Khand and more. Students from ATS Advantage, Shipra Srishti, Saya Gold Avenue and other premium societies prefer our convenient online coaching.',
  },
  {
    question: 'What are the fees for NEET coaching in Ghaziabad?',
    answer:
      'Our NEET Biology coaching fees range from Rs 24,000 to Rs 48,000 per year. This is significantly lower than Aakash, Allen or FIITJEE while offering superior quality with AIIMS faculty and smaller batches of 15-20 students.',
  },
  {
    question: 'Is online coaching effective for Ghaziabad students?',
    answer:
      'Absolutely! Our 98% success rate proves online coaching works. Students from Crossing Republik, Raj Nagar Extension, and remote areas prefer online classes. Live interactive sessions, 24/7 doubt support, and recorded lectures ensure comprehensive preparation.',
  },
  {
    question: 'Do you provide coaching near Ghaziabad metro stations?',
    answer:
      'Our online classes are accessible from anywhere. Students near Vaishali, Kaushambi (Blue Line), Mohan Nagar, Shaheed Sthal (Red Line) can join live classes from home with the same quality as physical coaching centers.',
  },
]

export default function NeetCoachingGhaziabadPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_ghaziabad', {
        event_category: 'conversion',
        event_label: 'ghaziabad_hub_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              #1 NEET Coaching in Ghaziabad
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">NEET Biology Coaching</span> in Ghaziabad
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Indirapuram • Vaishali • Crossing Republik • Raj Nagar Extension • Vasundhara
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              Join 1,500+ NEET aspirants from Ghaziabad. Expert AIIMS faculty, 98% success rate.
              Live online classes from ATS Advantage, Shipra Srishti, VVIP Addresses, Mahagun
              Montage &amp; all premium societies.
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

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {successStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6"
                >
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs md:text-sm opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Areas Coverage */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Across All Ghaziabad Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Students from every locality trust us. Click on your area to see local success
              stories.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ghaziabadAreas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/neet-coaching-ghaziabad/${area.slug}`}
                  className="block bg-white rounded-xl shadow-md hover:shadow-xl p-5 transition-all hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-gray-900">{area.name}</span>
                    <MapPin className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{area.highlight}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-600 font-semibold">{area.students} students</span>
                    {area.metro && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center">
                        <Train className="w-3 h-3 mr-1" />
                        Metro
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Indirapuram Khands */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching for All Indirapuram Khands
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage across all Indirapuram localities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {indirapuramKhands.map((khand, index) => (
              <motion.div
                key={khand.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-100"
              >
                <div className="font-bold text-gray-900 mb-2">{khand.name}</div>
                <div className="text-sm text-gray-600">{khand.societies}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Societies */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Premium Ghaziabad Societies
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trusted by families from Ghaziabad&apos;s best residential complexes
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {premiumSocieties.map((society, index) => (
              <motion.div
                key={society.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-5 shadow-md border border-gray-100"
              >
                <Building2 className="w-6 h-6 text-purple-600 mb-2" />
                <div className="font-bold text-gray-900">{society.name}</div>
                <div className="text-sm text-gray-500">{society.location}</div>
                <div className="text-purple-600 font-semibold mt-2">
                  {society.students} students
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-16 md:py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Near Top Ghaziabad Schools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Perfect for students from DPS, Ryan, Amity, Cambridge &amp; other premier schools
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {nearbySchools.map((school, index) => (
              <motion.div
                key={school.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 shadow-md"
              >
                <School className="w-5 h-5 text-blue-600 mb-2" />
                <div className="font-bold text-gray-900 text-sm">{school.name}</div>
                <div className="text-xs text-gray-500">{school.location}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metro Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Near Ghaziabad Metro Stations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Online classes accessible from Blue Line &amp; Red Line metro corridors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <Train className="w-6 h-6 mr-2" />
                Blue Line Stations
              </h3>
              <div className="space-y-3">
                {metroStations
                  .filter((s) => s.line === 'Blue Line')
                  .map((station) => (
                    <div key={station.name} className="bg-white rounded-lg p-3">
                      <div className="font-semibold text-gray-900">{station.name}</div>
                      <div className="text-sm text-gray-500">{station.areas}</div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center">
                <Train className="w-6 h-6 mr-2" />
                Red Line Stations
              </h3>
              <div className="space-y-3">
                {metroStations
                  .filter((s) => s.line === 'Red Line')
                  .map((station) => (
                    <div key={station.name} className="bg-white rounded-lg p-3">
                      <div className="font-semibold text-gray-900">{station.name}</div>
                      <div className="text-sm text-gray-500">{station.areas}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section className="py-16 md:py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Droppers from Ghaziabad Colleges
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Engineering students switching to medicine with our expert guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colleges.map((college, index) => (
              <motion.div
                key={college.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-5 shadow-md"
              >
                <GraduationCap className="w-6 h-6 text-purple-600 mb-2" />
                <div className="font-bold text-gray-900 text-sm">{college.name}</div>
                <div className="text-xs text-gray-500">{college.type}</div>
                <div className="text-purple-600 font-semibold mt-2 text-sm">{college.students}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Ghaziabad Students Choose Cerebrum Biology Academy
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'AIIMS Faculty',
                desc: '15+ years experience, trained at AIIMS Delhi',
              },
              { icon: Users, title: 'Small Batches', desc: 'Only 15-20 students per batch' },
              {
                icon: Clock,
                title: '24/7 Doubt Support',
                desc: 'Get doubts cleared anytime via chat',
              },
              {
                icon: BookOpen,
                title: 'Complete Materials',
                desc: 'NCERT notes, tests, PYQs included',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <feature.icon className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching in Ghaziabad - FAQs
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your NEET Journey in Ghaziabad Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 1,500+ successful Ghaziabad students. Book your free demo class now!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View All Courses
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {['Indirapuram', 'Vaishali', 'Crossing Republik', 'Raj Nagar Ext', 'Vasundhara'].map(
                (area) => (
                  <span key={area} className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {area}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Areas Section - Using Centralized Data */}
      <section className="py-16 md:py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All {allAreaSlugs.length}+ Areas We Serve in Ghaziabad
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Click on your area to view dedicated NEET coaching information and local success stories
            </p>
          </motion.div>

          {/* Blue Line Metro Areas */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
              <Train className="w-5 h-5 mr-2 text-blue-600" />
              Blue Line Metro Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {blueLineAreas.map((slug) => {
                const area = getGhaziabadAreaBySlug(slug)
                if (!area) return null
                return (
                  <Link
                    key={slug}
                    href={`/neet-coaching-ghaziabad/${slug}`}
                    className="px-4 py-2 bg-white text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors shadow-sm"
                  >
                    {area.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Red Line Metro Areas */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center">
              <Train className="w-5 h-5 mr-2 text-red-600" />
              Red Line Metro Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {redLineAreas.map((slug) => {
                const area = getGhaziabadAreaBySlug(slug)
                if (!area) return null
                return (
                  <Link
                    key={slug}
                    href={`/neet-coaching-ghaziabad/${slug}`}
                    className="px-4 py-2 bg-white text-red-700 rounded-full text-sm hover:bg-red-100 transition-colors shadow-sm"
                  >
                    {area.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Premium & Townships */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-orange-600" />
              Premium Areas & Townships
            </h3>
            <div className="flex flex-wrap gap-2">
              {[...premiumAreasData, ...townshipAreasData].map((slug) => {
                const area = getGhaziabadAreaBySlug(slug)
                if (!area) return null
                return (
                  <Link
                    key={slug}
                    href={`/neet-coaching-ghaziabad/${slug}`}
                    className="px-4 py-2 bg-white text-orange-700 rounded-full text-sm hover:bg-orange-100 transition-colors shadow-sm"
                  >
                    {area.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* All Areas Cloud */}
          <div className="mt-12 pt-8 border-t border-red-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Browse All Areas
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {allAreaSlugs.map((slug) => {
                const area = getGhaziabadAreaBySlug(slug)
                if (!area) return null
                return (
                  <Link
                    key={slug}
                    href={`/neet-coaching-ghaziabad/${slug}`}
                    className="px-3 py-1 bg-white text-gray-600 rounded-full text-sm hover:bg-gray-100 hover:text-red-600 transition-colors"
                  >
                    {area.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup for SEO */}
      <LocalBusinessSchema />
      <FAQSchema />

      {/* WhatsApp Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group"
      >
        {/* Hover Tooltip */}
        <div className="absolute bottom-full mb-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            Chat with us on WhatsApp
          </div>
        </div>

        {/* WhatsApp Button */}
        <Link
          href="https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20NEET%20Biology%20coaching%20for%20Ghaziabad%20students%20(Indirapuram%2C%20Vaishali%2C%20Crossing%20Republik%20area).%20I'd%20like%20to%20know%20about%20live%20online%20class%20timings%2C%20batch%20dates%2C%20fees%2C%20and%20demo%20classes.%20I'm%20from%20Ghaziabad."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white" />
        </Link>
      </motion.div>
    </div>
  )
}
