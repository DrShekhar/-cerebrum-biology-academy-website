'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Phone,
  Plane,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { nriCountriesData, nriRegions } from '@/data/nriCountries'

const regions = [
  {
    name: 'Middle East (Gulf)',
    description: 'UAE, Saudi Arabia, Kuwait, Qatar, Oman, Bahrain',
    countries: nriRegions['Middle East'],
    studentCount: '600+',
    highlight: 'NEET Centers Available',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    name: 'Southeast Asia',
    description: 'Singapore, Malaysia, Thailand, Indonesia',
    countries: nriRegions['Southeast Asia'],
    studentCount: '120+',
    highlight: 'GIIS Network',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    name: 'South Asia',
    description: 'Nepal',
    countries: nriRegions['South Asia'],
    studentCount: '100+',
    highlight: 'Same Timezone',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    name: 'Africa',
    description: 'Nigeria, Kenya, Tanzania',
    countries: nriRegions['Africa'],
    studentCount: '50+',
    highlight: 'Lagos NEET Center',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching via Zoom with instant doubt resolution. All classes recorded.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Multiple batch timings across time zones. IST evening works for most regions.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: "Expert doctors from India's top medical institutions with 14+ years experience.",
  },
  {
    icon: BookOpen,
    title: 'Digital Study Material',
    description: 'Complete NCERT-based notes, accessible anywhere. 10,000+ practice questions.',
  },
  {
    icon: Globe,
    title: 'NEET Centers Abroad',
    description: '14 international NEET exam centers. Write exam in your country.',
  },
  {
    icon: GraduationCap,
    title: 'NRI Quota Guidance',
    description: 'Complete support for NRI quota admissions in Indian medical colleges.',
  },
]

const stats = [
  { label: 'Countries Served', value: '14+', icon: Globe },
  { label: 'NRI Students', value: '900+', icon: Users },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'CBSE Schools Covered', value: '200+', icon: BookOpen },
]

const courses = [
  { name: 'Class 9th Foundation', duration: '1 Year', fee: '₹58,000' },
  { name: 'Class 10th Foundation', duration: '1 Year', fee: '₹68,000' },
  { name: 'Class 11th NEET', duration: '1 Year', fee: '₹75,000' },
  { name: 'Class 12th NEET', duration: '1 Year', fee: '₹72,000' },
  { name: 'NEET Dropper', duration: '1 Year', fee: '₹85,000' },
  { name: 'Crash Course', duration: '3-6 Months', fee: '₹35,000' },
]

export function NRIStudentsHubPage() {
  const whatsappMessage = encodeURIComponent(
    "Hi, I'm an NRI student interested in NEET Biology coaching. Please share details about online classes, timings, and fee structure."
  )
  const whatsappLink = `https://wa.me/918826444334?text=${whatsappMessage}`

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 text-6xl">🇦🇪</div>
          <div className="absolute top-40 right-20 text-5xl">🇸🇦</div>
          <div className="absolute bottom-20 left-1/4 text-5xl">🇸🇬</div>
          <div className="absolute top-10 right-1/3 text-4xl">🇰🇼</div>
          <div className="absolute bottom-40 right-10 text-5xl">🇶🇦</div>
          <div className="absolute bottom-10 left-10 text-4xl">🇳🇵</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Globe className="w-5 h-5 mr-2" />
              Serving NRI Students in 14+ Countries
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">NEET Biology Coaching</span>
              <br />
              for NRI & Overseas Students
            </h1>

            <p className="text-xl md:text-2xl opacity-90 mb-4">
              UAE | Saudi Arabia | Kuwait | Singapore | Qatar | Oman | Malaysia | Nepal & More
            </p>

            <p className="text-lg opacity-80 mb-8 max-w-3xl mx-auto">
              Prepare for NEET from anywhere in the world. AIIMS-trained faculty, flexible timings
              across time zones, live interactive classes, and complete guidance for NRI quota
              admissions. Classes 9th to 12th + Droppers.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-green-500 text-white hover:bg-green-600 w-full min-h-[48px] text-sm sm:text-base px-4 sm:px-6"
                >
                  <MessageCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="truncate">WhatsApp Us</span>
                </Button>
              </a>
              <Link href="/demo-booking" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-indigo-900 w-full min-h-[48px] text-sm sm:text-base px-4 sm:px-6"
                >
                  <Play className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="truncate">Book Demo</span>
                </Button>
              </Link>
              <a href="tel:+918826444334" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-indigo-900 w-full min-h-[48px] text-sm sm:text-base px-4 sm:px-6"
                >
                  <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="truncate">Call Now</span>
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Country
            </h2>
            <p className="text-xl text-gray-600">
              Find NEET coaching information specific to your location
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${region.bgColor} rounded-2xl p-6 border ${region.borderColor}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{region.name}</h3>
                  <span
                    className={`bg-gradient-to-r ${region.color} text-white text-sm font-medium px-3 py-1 rounded-full`}
                  >
                    {region.highlight}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{region.description}</p>
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  {region.studentCount} Students
                </div>
                <div className="flex flex-wrap gap-2">
                  {region.countries.map((countryCode) => {
                    const country = nriCountriesData[countryCode]
                    return (
                      <Link
                        key={countryCode}
                        href={`/nri-students/${countryCode}`}
                        className="inline-flex items-center bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-sm border"
                      >
                        <span className="mr-2">{country.flag}</span>
                        {country.country}
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* All Countries Grid */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              All Countries We Serve
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {Object.entries(nriCountriesData).map(([code, country]) => (
                <Link
                  key={code}
                  href={`/nri-students/${code}`}
                  className="flex flex-col items-center p-4 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200"
                >
                  <span className="text-4xl mb-2">{country.flag}</span>
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {country.country}
                  </span>
                  <span className="text-xs text-gray-500">{country.studentCount}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why NRI Students Choose Cerebrum
            </h2>
            <p className="text-xl text-gray-600">Everything you need to crack NEET from abroad</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Courses for NRI Students
            </h2>
            <p className="text-xl text-gray-600">
              Classes 9th to 12th + Droppers | All Boards Welcome
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                <div className="flex justify-between text-gray-600 mb-4">
                  <span>{course.duration}</span>
                  <span className="text-green-600 font-bold">{course.fee}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Live interactive classes
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Digital study materials
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    WhatsApp doubt support
                  </li>
                </ul>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enquire Now
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Fees are same as Indian students. Payment accepted in USD, AED, SAR, SGD, and other
              currencies.
            </p>
            <Link href="/pricing">
              <Button variant="primary">
                View Detailed Fee Structure
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NEET Centers Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Plane className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Write NEET in Your Country!</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              NTA conducts NEET in 14 international cities. No need to travel to India for the exam.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { city: 'Dubai', country: 'UAE' },
              { city: 'Abu Dhabi', country: 'UAE' },
              { city: 'Sharjah', country: 'UAE' },
              { city: 'Riyadh', country: 'Saudi Arabia' },
              { city: 'Kuwait City', country: 'Kuwait' },
              { city: 'Doha', country: 'Qatar' },
              { city: 'Muscat', country: 'Oman' },
              { city: 'Manama', country: 'Bahrain' },
              { city: 'Singapore', country: 'Singapore' },
              { city: 'Kuala Lumpur', country: 'Malaysia' },
              { city: 'Bangkok', country: 'Thailand' },
              { city: 'Kathmandu', country: 'Nepal' },
              { city: 'Colombo', country: 'Sri Lanka' },
              { city: 'Lagos', country: 'Nigeria' },
            ].map((center) => (
              <div
                key={center.city}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center"
              >
                <MapPin className="w-5 h-5 mr-3 text-yellow-300" />
                <div>
                  <div className="font-semibold">{center.city}</div>
                  <div className="text-sm opacity-80">{center.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boards Supported */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Boards Welcome
            </h2>
            <p className="text-xl text-gray-600">
              We support students from any curriculum with bridge courses
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {['CBSE', 'ICSE', 'IB', 'Cambridge (IGCSE)', 'State Boards'].map((board) => (
              <div
                key={board}
                className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200"
              >
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <div className="font-semibold text-gray-900">{board}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Special bridge courses available for IB and Cambridge students to align with
              NCERT-based NEET preparation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your NEET Journey Today!</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              900+ NRI students trust us for NEET preparation. 98% success rate. AIIMS-trained
              faculty.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3 justify-center mb-8">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-green-500 text-white hover:bg-green-600 w-full min-h-[48px] text-sm sm:text-base px-4 sm:px-6"
                >
                  <MessageCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="truncate">WhatsApp Us</span>
                </Button>
              </a>
              <Link href="/demo-booking" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-indigo-600 w-full min-h-[48px] text-sm sm:text-base px-4 sm:px-6"
                >
                  <Play className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="truncate">Book Demo</span>
                </Button>
              </Link>
              <a href="tel:+918826444334" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-indigo-600 w-full min-h-[48px] text-sm sm:text-base px-4 sm:px-6"
                >
                  <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="truncate">Call Now</span>
                </Button>
              </a>
            </div>

            <div className="text-sm opacity-80">
              <p>Available 8 AM - 10 PM IST | +91 8826444334</p>
              <p className="mt-1">info@cerebrumbiologyacademy.com</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
