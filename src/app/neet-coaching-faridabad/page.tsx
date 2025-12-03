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
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const faridabadAreas = [
  {
    name: 'Greater Faridabad',
    slug: 'greater-faridabad',
    students: '280+',
    highlight: 'Premium Hub',
    metro: true,
  },
  {
    name: 'Sector 21',
    slug: 'sector-21',
    students: '150+',
    highlight: 'Commercial Hub',
    metro: true,
  },
  {
    name: 'NIT Faridabad',
    slug: 'nit-faridabad',
    students: '120+',
    highlight: 'Educational Hub',
    metro: true,
  },
  {
    name: 'Ballabgarh',
    slug: 'ballabgarh',
    students: '180+',
    highlight: 'Industrial Town',
    metro: true,
  },
  {
    name: 'Sector 15',
    slug: 'sector-15',
    students: '95+',
    highlight: 'Established Area',
    metro: true,
  },
  {
    name: 'Neharpar',
    slug: 'neharpar',
    students: '200+',
    highlight: 'Mega Township',
    metro: false,
  },
  {
    name: 'Sector 86',
    slug: 'sector-86',
    students: '110+',
    highlight: 'Premium Sector',
    metro: false,
  },
  {
    name: 'Old Faridabad',
    slug: 'old-faridabad',
    students: '90+',
    highlight: 'Heritage Area',
    metro: true,
  },
]

const premiumSocieties = [
  { name: 'BPTP Parklands', location: 'Sector 85', students: '65+' },
  { name: 'Omaxe Hills', location: 'Sector 43', students: '45+' },
  { name: 'SRS Residency', location: 'Sector 88', students: '40+' },
  { name: 'Crown Greens', location: 'Greater Faridabad', students: '55+' },
  { name: 'BPTP Princess Park', location: 'Sector 86', students: '50+' },
  { name: 'RPS Green Valley', location: 'Sector 42', students: '35+' },
  { name: 'Paras Tierea', location: 'Sector 137', students: '30+' },
  { name: 'Eldeco Eternia', location: 'Sector 67', students: '28+' },
  { name: 'Park View City 1', location: 'Sector 49', students: '45+' },
  { name: 'Park View City 2', location: 'Sector 48', students: '40+' },
  { name: 'Malibu Towne', location: 'Sector 47', students: '35+' },
  { name: 'Omaxe Celebration', location: 'NIT', students: '32+' },
]

const greaterFaridabadSectors = [
  { sector: '81', students: '35+' },
  { sector: '82', students: '40+' },
  { sector: '84', students: '45+' },
  { sector: '85', students: '50+' },
  { sector: '86', students: '55+' },
  { sector: '87', students: '38+' },
  { sector: '88', students: '42+' },
  { sector: '89', students: '30+' },
]

const nearbySchools = [
  { name: 'DAV Public School', location: 'NIT', distance: '3 km' },
  { name: 'Modern Vidya Niketan', location: 'Sector 17', distance: '4 km' },
  { name: 'DPS Faridabad', location: 'Sector 21', distance: '2 km' },
  { name: 'Apeejay School', location: 'Sector 15', distance: '5 km' },
  { name: 'Manav Rachna School', location: 'Sector 46', distance: '6 km' },
  { name: 'Ryan International', location: 'Sector 31', distance: '4 km' },
  { name: 'St. Joseph School', location: 'Old Faridabad', distance: '3 km' },
  { name: 'Amity International', location: 'Sector 44', distance: '5 km' },
  { name: 'KR Mangalam', location: 'Greater Faridabad', distance: '4 km' },
  { name: 'St. Marys School', location: 'Sector 19', distance: '3 km' },
]

const metroStations = [
  { name: 'Badkhal Mor', line: 'Violet Line', areas: 'Sector 21, NIT' },
  { name: 'Old Faridabad', line: 'Violet Line', areas: 'Old Faridabad, Sector 16' },
  { name: 'Neelam Chowk', line: 'Violet Line', areas: 'Sector 15, Sector 14' },
  { name: 'Sector 28', line: 'Violet Line', areas: 'Sector 28, Sector 29' },
  { name: 'Mewla Maharajpur', line: 'Violet Line', areas: 'Near Ballabgarh' },
  { name: 'NHPC Chowk', line: 'Violet Line', areas: 'Sector 20, Sector 21' },
  { name: 'Sarai', line: 'Violet Line', areas: 'Sarai Khawaja' },
  { name: 'Escorts Mujesar', line: 'Violet Line', areas: 'Escorts area' },
]

const colleges = [
  { name: 'Manav Rachna University', location: 'Sector 43', students: '120+' },
  { name: 'YMCA University', location: 'Sector 6', students: '80+' },
  { name: 'MVN University', location: 'Palwal Road', students: '60+' },
  { name: 'Lingayas University', location: 'Nachauli', students: '50+' },
  { name: 'JC Bose University', location: 'YMCA', students: '70+' },
]

const successStats = [
  { label: 'Faridabad Students', value: '1,200+', icon: Users },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'NEET Selections', value: '850+', icon: Award },
  { label: 'Google Rating', value: '4.9', icon: Star },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Faridabad?',
    answer:
      'Cerebrum Biology Academy is rated the best NEET coaching in Faridabad with 98% success rate. We have 1,200+ students from Greater Faridabad, NIT, Sector 21, Ballabgarh and all major Faridabad areas. Our AIIMS-trained faculty and small batch sizes (15-20 students) ensure personalized attention.',
  },
  {
    question: 'Do you have coaching centers in Greater Faridabad and NIT?',
    answer:
      'We offer both online and offline coaching accessible from Greater Faridabad, NIT, and all Faridabad areas. Our online live classes are extremely popular with students from BPTP Parklands, Omaxe Hills, Crown Greens, and premium societies across Sectors 81-89.',
  },
  {
    question: 'What are the fees for NEET coaching in Faridabad?',
    answer:
      'Our NEET Biology coaching fees range from ₹24,000 to ₹48,000 per year depending on the program. This is 40-50% less than other Faridabad coaching institutes while offering superior quality with AIIMS faculty and smaller batches.',
  },
  {
    question: 'Is online NEET coaching effective for Faridabad students?',
    answer:
      'Yes! Our online coaching is extremely effective with live interactive classes, 24/7 doubt support, and recorded sessions. Students from Neharpar, Sector 86, and Ballabgarh prefer online classes for convenience while achieving top results.',
  },
  {
    question: 'Do you provide NEET coaching near Faridabad Metro stations?',
    answer:
      'Our online classes are accessible from anywhere near Violet Line metro stations including Badkhal Mor, Old Faridabad, Neelam Chowk, and NHPC Chowk. Students can join live classes from home with the same quality as physical coaching.',
  },
]

export default function NeetCoachingFaridabadPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_faridabad', {
        event_category: 'conversion',
        event_label: 'faridabad_hub_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-red-800 to-rose-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              #1 NEET Coaching in Faridabad &amp; Greater Faridabad
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">NEET Biology Coaching</span> in Faridabad
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Greater Faridabad • Sector 21 • NIT • Ballabgarh • Neharpar
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              Join 1,200+ NEET aspirants from Faridabad. Expert AIIMS faculty, 98% success rate,
              live online classes accessible from BPTP Parklands, Omaxe Hills, Crown Greens &amp;
              all premium Faridabad societies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary_cta"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+919876543210">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-9876543210
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

      {/* Faridabad Areas Coverage */}
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
              NEET Coaching Across All Faridabad Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Students from every Faridabad area trust us. Click on your area to see local success
              stories.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {faridabadAreas.map((item, index) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/neet-coaching-faridabad/${item.slug}`}
                  className="block bg-white rounded-xl shadow-md hover:shadow-xl p-5 transition-all hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-gray-900">{item.name}</span>
                    <MapPin className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{item.highlight}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-semibold">{item.students} students</span>
                    {item.metro && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex items-center">
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

      {/* Greater Faridabad Sectors Section */}
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
              NEET Coaching in Greater Faridabad Sectors
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Serving students from all premium sectors of Greater Faridabad
            </p>
          </motion.div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {greaterFaridabadSectors.map((item, index) => (
              <motion.div
                key={item.sector}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100 text-center"
              >
                <div className="font-bold text-gray-900">Sector {item.sector}</div>
                <div className="text-orange-600 font-semibold text-sm mt-1">{item.students}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Societies Section */}
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
              Students from Premium Faridabad Societies
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trusted by families from Faridabad&apos;s best residential complexes
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
                className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-xl p-5 border border-orange-100"
              >
                <Building2 className="w-6 h-6 text-orange-600 mb-2" />
                <div className="font-bold text-gray-900">{society.name}</div>
                <div className="text-sm text-gray-500">{society.location}</div>
                <div className="text-orange-600 font-semibold mt-2">
                  {society.students} students
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section */}
      <section className="py-16 md:py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Coaching Near Top Faridabad Schools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Perfect for students from DAV, DPS, Modern Vidya Niketan &amp; other premier schools
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
                className="bg-white rounded-xl p-5 shadow-md"
              >
                <School className="w-6 h-6 text-orange-600 mb-2" />
                <div className="font-bold text-gray-900 text-sm">{school.name}</div>
                <div className="text-sm text-gray-500">{school.location}</div>
                <div className="text-orange-600 text-sm mt-2">Online classes available</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metro Connectivity Section */}
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
              NEET Coaching Near Faridabad Metro Stations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Online classes accessible from all Violet Line metro stations
            </p>
          </motion.div>

          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center justify-center">
              <Train className="w-6 h-6 mr-2" />
              Violet Line Stations (Faridabad)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {metroStations.map((station) => (
                <div key={station.name} className="bg-white rounded-lg p-3">
                  <div className="font-semibold text-gray-900">{station.name}</div>
                  <div className="text-sm text-gray-500">{station.areas}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section className="py-16 md:py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Students from Faridabad Universities &amp; Colleges
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              NEET droppers and repeaters from premier Faridabad institutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {colleges.map((college, index) => (
              <motion.div
                key={college.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-5 shadow-md"
              >
                <GraduationCap className="w-6 h-6 text-rose-600 mb-2" />
                <div className="font-bold text-gray-900 text-sm">{college.name}</div>
                <div className="text-sm text-gray-500">{college.location}</div>
                <div className="text-rose-600 font-semibold mt-2">{college.students} students</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
              Why Faridabad Students Choose Cerebrum Biology Academy
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

      {/* FAQs Section */}
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
              NEET Coaching in Faridabad - FAQs
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

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your NEET Journey in Faridabad Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 1,200+ successful Faridabad students. Book your free demo class now!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/demo-booking">
                <Button
                  variant="secondary_cta"
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
                  className="border-white text-white hover:bg-white hover:text-orange-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View All Courses
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {['Greater Faridabad', 'NIT', 'Sector 21', 'Ballabgarh', 'Neharpar'].map((area) => (
                <span key={area} className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Local SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - Faridabad',
            description:
              'Best NEET Biology coaching in Faridabad. Expert AIIMS faculty, 98% success rate, online & offline classes.',
            url: 'https://cerebrumbiologyacademy.com/neet-coaching-faridabad',
            logo: 'https://cerebrumbiologyacademy.com/logo.png',
            areaServed: [
              {
                '@type': 'City',
                name: 'Faridabad',
                containedInPlace: { '@type': 'State', name: 'Haryana' },
              },
              {
                '@type': 'Place',
                name: 'Greater Faridabad',
                containedInPlace: { '@type': 'City', name: 'Faridabad' },
              },
              {
                '@type': 'Place',
                name: 'NIT Faridabad',
                containedInPlace: { '@type': 'City', name: 'Faridabad' },
              },
              {
                '@type': 'Place',
                name: 'Ballabgarh',
                containedInPlace: { '@type': 'City', name: 'Faridabad' },
              },
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'NEET Biology Courses',
              itemListElement: [
                {
                  '@type': 'Course',
                  name: 'NEET Biology Foundation - Class 11',
                  provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
                },
                {
                  '@type': 'Course',
                  name: 'NEET Biology Complete - Class 12',
                  provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
                },
                {
                  '@type': 'Course',
                  name: 'NEET Biology Dropper Batch',
                  provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
                },
              ],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '1200',
              bestRating: '5',
            },
          }),
        }}
      />
    </div>
  )
}
