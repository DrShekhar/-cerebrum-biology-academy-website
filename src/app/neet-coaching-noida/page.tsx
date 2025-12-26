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

const noidaSectors = [
  { sector: '18', area: 'Atta Market, Great India Place', students: '120+', metro: 'Sector 18' },
  { sector: '62', area: 'IT Hub, Coaching Center', students: '95+', metro: 'Sector 62' },
  { sector: '44', area: 'Golf Course, Premium Area', students: '65+', metro: 'Golf Course' },
  { sector: '137', area: 'IT/ITES Hub', students: '85+', metro: 'Sector 137' },
  { sector: '50', area: 'Residential Hub', students: '70+', metro: 'Sector 52' },
  { sector: '37', area: 'Family Area, Schools', students: '60+', metro: 'Sector 34' },
  { sector: '93', area: 'Expressway, Modern Apartments', students: '55+', metro: 'Sector 101' },
  { sector: '150', area: 'Ultra-Modern Development', students: '45+', metro: 'Sector 148' },
  { sector: '104', area: 'Supertech Supernova', students: '40+', metro: 'Sector 101' },
  { sector: '128', area: 'Corporate Offices', students: '35+', metro: 'Pari Chowk' },
  { sector: '15A', area: 'Established Premium', students: '50+', metro: 'Sector 15' },
  { sector: '168', area: 'Buddh Circuit Area', students: '30+', metro: null },
]

const premiumSocieties = [
  { name: 'Gaur City', location: 'Greater Noida West', students: '180+' },
  { name: 'ATS Pristine', location: 'Sector 150', students: '45+' },
  { name: 'Godrej Woods', location: 'Sector 43', students: '35+' },
  { name: 'Mahagun Moderne', location: 'Sector 78', students: '50+' },
  { name: 'Gulshan Dynasty', location: 'Sector 144', students: '40+' },
  { name: 'Jaypee Greens', location: 'Sector 128', students: '55+' },
  { name: 'Supertech Eco Village', location: 'Greater Noida West', students: '65+' },
  { name: 'Logix Blossom County', location: 'Sector 137', students: '30+' },
  { name: 'Ace City', location: 'Greater Noida West', students: '70+' },
  { name: 'Prateek Stylome', location: 'Sector 45', students: '25+' },
  { name: 'Eldeco Utopia', location: 'Sector 93A', students: '35+' },
  { name: 'Paras Tierea', location: 'Sector 137', students: '28+' },
]

const nearbySchools = [
  { name: 'DPS Noida', sector: '30', distance: '5 km' },
  { name: 'Amity International School', sector: '44', distance: '3 km' },
  { name: 'Lotus Valley International', sector: '126', distance: '8 km' },
  { name: 'Ryan International', sector: 'Multiple', distance: '2-6 km' },
  { name: 'Shiv Nadar School', sector: '168', distance: '12 km' },
  { name: 'Step by Step School', sector: '132', distance: '7 km' },
  { name: 'Pathways School', sector: '100', distance: '10 km' },
  { name: 'Cambridge School', sector: '27', distance: '4 km' },
  { name: 'Apeejay School', sector: '16A', distance: '3 km' },
  { name: 'JBM Global School', sector: '132', distance: '7 km' },
  { name: 'Khaitan Public School', sector: '40', distance: '4 km' },
  { name: 'Genesis Global School', sector: 'Alpha', distance: '15 km' },
]

const metroStations = [
  { name: 'Botanical Garden', line: 'Blue Line', areas: 'Sector 37, 38, 39' },
  { name: 'Noida City Centre', line: 'Blue Line', areas: 'Sector 32, 33, 34' },
  { name: 'Sector 18', line: 'Blue Line', areas: 'Atta Market, GIP Mall' },
  { name: 'Sector 62', line: 'Blue Line', areas: 'IT Hub, Coaching Hub' },
  { name: 'Sector 137', line: 'Aqua Line', areas: 'IT/ITES, Logix' },
  { name: 'Sector 142', line: 'Aqua Line', areas: 'Advant Navis' },
  { name: 'Sector 144', line: 'Aqua Line', areas: 'Gulshan Dynasty' },
  { name: 'Pari Chowk', line: 'Aqua Line', areas: 'Greater Noida' },
  { name: 'Knowledge Park II', line: 'Aqua Line', areas: 'Universities' },
  { name: 'Alpha 1', line: 'Aqua Line', areas: 'Greater Noida' },
]

const universities = [
  { name: 'Amity University', location: 'Sector 125', students: '200+' },
  { name: 'Sharda University', location: 'Greater Noida', students: '150+' },
  { name: 'Galgotias University', location: 'Greater Noida', students: '120+' },
  { name: 'Bennett University', location: 'Greater Noida', students: '80+' },
  { name: 'JIIT', location: 'Sector 62/128', students: '60+' },
  { name: 'GL Bajaj Institute', location: 'Greater Noida', students: '45+' },
]

const successStats = [
  { label: 'Noida Students', value: '1,200+', icon: Users },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'NEET Selections', value: '850+', icon: Award },
  { label: 'Google Rating', value: '4.9', icon: Star },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in Noida?',
    answer:
      'Cerebrum Biology Academy is rated the best NEET coaching in Noida with 98% success rate. We have 1,200+ students from Sectors 18, 62, 137, 150 and all major Noida areas. Our AIIMS-trained faculty and small batch sizes (15-20 students) ensure personalized attention for every student.',
  },
  {
    question: 'Do you have coaching centers in different Noida sectors?',
    answer:
      'We offer both online and offline coaching accessible from all Noida sectors. Our online live classes are popular with students from Sector 18, 62, 137, 150, Greater Noida West (Gaur City, Ace City), and premium societies like ATS Pristine, Mahagun Moderne, and Jaypee Greens.',
  },
  {
    question: 'What are the fees for NEET coaching in Noida?',
    answer:
      'Our NEET Biology coaching fees range from ₹45,000 to ₹1,56,000 per year depending on the program and tier. Class 9-10: ₹45,000-₹90,000, Class 11: ₹48,000-₹98,000, Class 12: ₹70,000-₹1,56,000. All include AIIMS faculty and smaller batches.',
  },
  {
    question: 'Is online NEET coaching effective for Noida students?',
    answer:
      'Yes! Our online coaching is extremely effective with live interactive classes, 24/7 doubt support, and recorded sessions. Students from Gaur City, Sector 150, and remote areas prefer online classes for convenience while maintaining top results.',
  },
  {
    question: 'Do you provide coaching near Noida metro stations?',
    answer:
      'Our online classes are accessible from anywhere in Noida. Students near Sector 18, Sector 62, Botanical Garden, Sector 137, and all Aqua Line stations can join live classes from home with the same quality as physical coaching.',
  },
]

export default function NeetCoachingNoidaPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_noida', {
        event_category: 'conversion',
        event_label: 'noida_hub_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-700 to-green-800 text-white py-20 overflow-hidden">
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
              #1 NEET Coaching in Noida &amp; Greater Noida
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">NEET Biology Coaching</span> in Noida
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Sector 18 • Sector 62 • Sector 137 • Sector 150 • Greater Noida West
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              Join 1,200+ NEET aspirants from Noida. Expert AIIMS faculty, 98% success rate, live
              online classes accessible from Gaur City, ATS Pristine, Mahagun Moderne, Jaypee Greens
              &amp; all premium Noida societies.
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
                  className="border-white text-white hover:bg-white hover:text-green-900"
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

      {/* Noida Sectors Coverage */}
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
              NEET Coaching Across All Noida Sectors
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Students from every Noida sector trust us. Click on your sector to see local success
              stories.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {noidaSectors.map((item, index) => (
              <motion.div
                key={item.sector}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/neet-coaching-noida/sector-${item.sector}`}
                  className="block bg-white rounded-xl shadow-md hover:shadow-xl p-5 transition-all hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-gray-900">Sector {item.sector}</span>
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{item.area}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-semibold">{item.students} students</span>
                    {item.metro && (
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

      {/* Premium Societies Section */}
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
              Students from Premium Noida Societies
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trusted by families from Noida&apos;s best residential complexes
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
                className="bg-green-50 rounded-xl p-5 border border-green-100"
              >
                <Building2 className="w-6 h-6 text-green-600 mb-2" />
                <div className="font-bold text-gray-900">{society.name}</div>
                <div className="text-sm text-gray-500">{society.location}</div>
                <div className="text-green-600 font-semibold mt-2">{society.students} students</div>
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
              NEET Coaching Near Top Noida Schools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Perfect for students from DPS, Amity, Lotus Valley, Ryan &amp; other premier schools
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nearbySchools.map((school, index) => (
              <motion.div
                key={school.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-5 shadow-md"
              >
                <School className="w-6 h-6 text-blue-600 mb-2" />
                <div className="font-bold text-gray-900">{school.name}</div>
                <div className="text-sm text-gray-500">Sector {school.sector}</div>
                <div className="text-blue-600 text-sm mt-2">Online classes available</div>
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
              NEET Coaching Near Noida Metro Stations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Online classes accessible from Blue Line &amp; Aqua Line metro corridors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <Train className="w-6 h-6 mr-2" />
                Blue Line Stations
              </h3>
              <div className="grid grid-cols-2 gap-3">
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

            <div className="bg-cyan-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-cyan-900 mb-4 flex items-center">
                <Train className="w-6 h-6 mr-2" />
                Aqua Line Stations
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {metroStations
                  .filter((s) => s.line === 'Aqua Line')
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

      {/* Universities Section */}
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
              Students from Noida Universities &amp; Colleges
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              NEET droppers and repeaters from premier Noida institutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {universities.map((uni, index) => (
              <motion.div
                key={uni.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-5 shadow-md"
              >
                <GraduationCap className="w-6 h-6 text-purple-600 mb-2" />
                <div className="font-bold text-gray-900">{uni.name}</div>
                <div className="text-sm text-gray-500">{uni.location}</div>
                <div className="text-purple-600 font-semibold mt-2">{uni.students} students</div>
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
              Why Noida Students Choose Cerebrum Biology Academy
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
              NEET Coaching in Noida - FAQs
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
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your NEET Journey in Noida Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 1,200+ successful Noida students. Book your free demo class now!
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
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View All Courses
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {['Sector 18', 'Sector 62', 'Sector 137', 'Sector 150', 'Greater Noida West'].map(
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

      {/* Local SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - Noida',
            description:
              'Best NEET Biology coaching in Noida. Expert AIIMS faculty, 98% success rate, online & offline classes.',
            url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
            logo: 'https://cerebrumbiologyacademy.com/logo.png',
            areaServed: [
              {
                '@type': 'City',
                name: 'Noida',
                containedInPlace: { '@type': 'State', name: 'Uttar Pradesh' },
              },
              {
                '@type': 'City',
                name: 'Greater Noida',
                containedInPlace: { '@type': 'State', name: 'Uttar Pradesh' },
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
