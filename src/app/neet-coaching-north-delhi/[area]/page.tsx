'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  MapPin,
  GraduationCap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Award,
  Play,
  Target,
  Microscope,
  Building2,
  Train,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const areaDetails: Record<
  string,
  {
    name: string
    fullName: string
    description: string
    heroDescription: string
    nearbyMetro: string[]
    landmarks: string[]
    schools: string[]
    highlights: string[]
    type: string
    pincode: string
  }
> = {
  rohini: {
    name: 'Rohini',
    fullName: 'Rohini (All Sectors), North Delhi',
    description: 'Largest planned sub-city with 35+ sectors',
    heroDescription:
      'Rohini is one of the largest planned residential sub-cities in Asia with over 35 sectors. Home to DPS Rohini students and educated families seeking quality NEET coaching with proven results.',
    nearbyMetro: ['Rohini West Metro', 'Rohini East Metro', 'Pitampura Metro', 'Rithala Metro'],
    landmarks: ['Adventure Island', 'Metro Walk Mall', 'DPS Rohini', 'Rohini Court Complex'],
    schools: ['DPS Rohini', 'Ryan International', 'Cambridge School', 'Mount Carmel'],
    highlights: ['All Sectors Covered', 'DPS Students', 'Metro Connected', 'Large Population'],
    type: 'residential',
    pincode: '110085',
  },
  pitampura: {
    name: 'Pitampura',
    fullName: 'Pitampura, North Delhi',
    description: 'Premium locality with famous TV Tower',
    heroDescription:
      'Pitampura is one of North Delhis most prestigious localities, known for the iconic TV Tower and proximity to Netaji Subhash Place commercial hub. Educated families here seek premium NEET coaching.',
    nearbyMetro: ['Pitampura Metro', 'Netaji Subhash Place Metro', 'Kohat Enclave Metro'],
    landmarks: ['Pitampura TV Tower', 'Netaji Subhash Place', 'Metro Mall', 'Madhuban Chowk'],
    schools: ['DPS Rohini', 'Mount Carmel', 'Cambridge School', 'Ryan International'],
    highlights: ['TV Tower Landmark', 'NSP Near', 'Metro Hub', 'Premium Locality'],
    type: 'posh',
    pincode: '110034',
  },
  'model-town': {
    name: 'Model Town',
    fullName: 'Model Town, North Delhi',
    description: 'Posh residential area near DU North Campus',
    heroDescription:
      'Model Town is one of North Delhis most sought-after residential areas, adjacent to Delhi University North Campus. Home to educated families, professors, and professionals seeking quality education.',
    nearbyMetro: ['Model Town Metro', 'GTB Nagar Metro', 'Vishwavidyalaya Metro'],
    landmarks: ['Model Town Market', 'DU North Campus', 'Model Town Park', 'GTB Hospital'],
    schools: ['St. Marks School', 'Bal Bharati', 'DAV Public School', 'Cambridge School'],
    highlights: ['Near DU', 'Posh Area', 'Educated Families', 'Well Planned'],
    type: 'posh',
    pincode: '110009',
  },
  'shalimar-bagh': {
    name: 'Shalimar Bagh',
    fullName: 'Shalimar Bagh, North Delhi',
    description: 'Large residential colony with good schools',
    heroDescription:
      'Shalimar Bagh is a well-established residential colony with multiple blocks (AD, BG, etc.) and excellent schools. Families here prioritize quality education and seek proven coaching institutes.',
    nearbyMetro: ['Shalimar Bagh Metro', 'Azadpur Metro', 'Netaji Subhash Place Metro'],
    landmarks: ['Shalimar Bagh Market', 'Ring Road', 'Azadpur Mandi', 'Club Road'],
    schools: ['DAV Public School', 'Ryan International', 'Mount Abu School', 'Apeejay School'],
    highlights: ['Large Colony', 'Good Schools', 'Metro Access', 'Established Area'],
    type: 'residential',
    pincode: '110088',
  },
  'ashok-vihar': {
    name: 'Ashok Vihar',
    fullName: 'Ashok Vihar, North Delhi',
    description: 'Established colony near Netaji Subhash Place',
    heroDescription:
      'Ashok Vihar is a well-established residential colony near Netaji Subhash Place commercial hub. Students from Phase 1-4 areas seek quality NEET coaching with personalized attention.',
    nearbyMetro: ['Netaji Subhash Place Metro', 'Shalimar Bagh Metro', 'Ashok Park Main Metro'],
    landmarks: ['Netaji Subhash Place', 'Ashok Vihar Market', 'Wazirpur Industrial Area'],
    schools: ['DAV Public School', 'Ryan International', 'Modern School', 'Cambridge School'],
    highlights: ['NSP Adjacent', 'Commercial Hub', 'Good Connectivity', 'Old Colony'],
    type: 'residential',
    pincode: '110052',
  },
  'gtb-nagar': {
    name: 'GTB Nagar',
    fullName: 'GTB Nagar, North Delhi',
    description: 'Student hub near Delhi University North Campus',
    heroDescription:
      'GTB Nagar (Guru Tegh Bahadur Nagar) is famous as a student hub adjacent to DU North Campus. High concentration of coaching centers and student accommodations make it a competitive environment.',
    nearbyMetro: ['GTB Nagar Metro', 'Vishwavidyalaya Metro', 'Model Town Metro'],
    landmarks: ['DU North Campus', 'Hudson Lane', 'GTB Hospital', 'Bungalow Road'],
    schools: ['Various DU Schools', 'St. Marks School', 'Khalsa College'],
    highlights: ['DU Adjacent', 'Student Hub', 'Coaching Area', 'High Competition'],
    type: 'coaching-hub',
    pincode: '110009',
  },
  'mukherjee-nagar': {
    name: 'Mukherjee Nagar',
    fullName: 'Mukherjee Nagar, North Delhi',
    description: 'Famous coaching hub for competitive exams',
    heroDescription:
      'Mukherjee Nagar is Indias most famous coaching destination, primarily for UPSC and government exams. Students from across India come here, creating a highly competitive environment.',
    nearbyMetro: ['GTB Nagar Metro', 'Vishwavidyalaya Metro'],
    landmarks: ['Coaching Centers', 'Hudson Lane', 'Batra Cinema', 'GTB Hospital'],
    schools: ['Various Schools', 'Study Hostels', 'PG Accommodations'],
    highlights: ['UPSC Hub', 'Competitive Environment', 'Student Density', 'Coaching Capital'],
    type: 'coaching-hub',
    pincode: '110009',
  },
  'kamla-nagar': {
    name: 'Kamla Nagar',
    fullName: 'Kamla Nagar, North Delhi',
    description: 'Vibrant area near DU campus',
    heroDescription:
      'Kamla Nagar is famous for its vibrant market and proximity to Delhi University. A popular hangout for students, it also has a significant coaching presence for various exams.',
    nearbyMetro: ['Vishwavidyalaya Metro', 'Civil Lines Metro'],
    landmarks: ['Kamla Nagar Market', 'DU North Campus', 'Spark Mall', 'Maurice Nagar'],
    schools: ['Hindu College Area', 'SRCC Area', 'Miranda House Area'],
    highlights: ['DU Adjacent', 'Youth Hub', 'Shopping Area', 'Student Life'],
    type: 'commercial',
    pincode: '110007',
  },
  'kingsway-camp': {
    name: 'Kingsway Camp',
    fullName: 'Kingsway Camp, North Delhi',
    description: 'Residential area near DU and GTB Hospital',
    heroDescription:
      'Kingsway Camp is a residential area strategically located near Delhi University and GTB Hospital. Educated families and medical professionals seek quality NEET coaching here.',
    nearbyMetro: ['GTB Nagar Metro', 'Vishwavidyalaya Metro'],
    landmarks: ['GTB Hospital', 'DU North Campus', 'Kingsway Camp Market'],
    schools: ['Various Schools', 'St. Marks School', 'DAV Public School'],
    highlights: ['Near DU', 'Hospital Area', 'Educated Families', 'Medical Students'],
    type: 'residential',
    pincode: '110009',
  },
  'adarsh-nagar': {
    name: 'Adarsh Nagar',
    fullName: 'Adarsh Nagar, North Delhi',
    description: 'Centrally located residential area',
    heroDescription:
      'Adarsh Nagar is a well-connected residential area in North Delhi with metro access. Students from here can easily access coaching centers across Delhi.',
    nearbyMetro: ['Adarsh Nagar Metro', 'Azadpur Metro', 'Model Town Metro'],
    landmarks: ['Adarsh Nagar Market', 'Azadpur Mandi', 'GTB Nagar Border'],
    schools: ['DAV Public School', 'Sarvodaya Vidyalaya', 'Ryan International'],
    highlights: ['Metro Connected', 'Central Location', 'Good Access', 'Affordable'],
    type: 'residential',
    pincode: '110033',
  },
  wazirpur: {
    name: 'Wazirpur',
    fullName: 'Wazirpur, North Delhi',
    description: 'Industrial-residential area with growing population',
    heroDescription:
      'Wazirpur is known for its industrial area but also has significant residential colonies. Growing demand for quality coaching from families in the area.',
    nearbyMetro: ['Netaji Subhash Place Metro', 'Shalimar Bagh Metro'],
    landmarks: ['Wazirpur Industrial Area', 'Ashok Vihar Border', 'Lawrence Road'],
    schools: ['DAV Public School', 'Ryan International', 'Government Schools'],
    highlights: ['Industrial Area', 'Affordable', 'Growing Population', 'Budget Friendly'],
    type: 'commercial',
    pincode: '110052',
  },
  'prashant-vihar': {
    name: 'Prashant Vihar',
    fullName: 'Prashant Vihar, North Delhi',
    description: 'Quiet residential area in Rohini zone',
    heroDescription:
      'Prashant Vihar is a peaceful residential area in the Rohini zone, known for its educated families and well-maintained colonies seeking quality NEET preparation.',
    nearbyMetro: ['Rohini West Metro', 'Pitampura Metro'],
    landmarks: ['Prashant Vihar Market', 'Rohini Sector 7 Border', 'Madhuban Chowk'],
    schools: ['DAV Public School', 'Ryan International', 'Bal Bharati'],
    highlights: ['Peaceful Area', 'Rohini Zone', 'Good Connectivity', 'Educated Families'],
    type: 'residential',
    pincode: '110085',
  },
}

const courseOptions = [
  {
    name: 'Class 11+12 Comprehensive',
    duration: '2 Years',
    fee: '₹1,20,000',
    features: ['Complete NEET Biology', 'NCERT + Advanced', 'Mock Tests', 'Doubt Sessions'],
  },
  {
    name: 'Class 12 Intensive',
    duration: '1 Year',
    fee: '₹75,000',
    features: ['Class 12 Biology', 'Revision + Practice', 'Test Series', 'PYQ Analysis'],
  },
  {
    name: 'Dropper Batch',
    duration: '1 Year',
    fee: '₹85,000',
    features: ['Complete Revision', 'Daily Tests', 'Personal Mentor', 'Doubt Priority'],
  },
]

export default function NorthDelhiAreaPage() {
  const params = useParams()
  const areaSlug = params.area as string
  const area = areaDetails[areaSlug]

  if (!area) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Area not found</h1>
          <Link href="/neet-coaching-north-delhi">
            <Button>Back to North Delhi</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as typeof globalThis & { gtag?: Function }).gtag) {
      ;(window as typeof globalThis & { gtag: Function }).gtag(
        'event',
        `demo_booking_${areaSlug}`,
        {
          event_category: 'conversion',
          event_label: `neet_coaching_north_delhi_${areaSlug}`,
          value: 1,
        }
      )
    }
  }

  return (
    <div className="min-h-screen">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: `Cerebrum Biology Academy - NEET Coaching ${area.name}`,
            description: area.heroDescription,
            url: `https://cerebrumbiologyacademy.com/neet-coaching-north-delhi/${areaSlug}`,
            telephone: '+91-8826444334',
            areaServed: area.name,
            address: {
              '@type': 'PostalAddress',
              addressLocality: area.name,
              addressRegion: 'Delhi',
              postalCode: area.pincode,
              addressCountry: 'IN',
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/neet-coaching-north-delhi"
              className="inline-flex items-center text-indigo-300 hover:text-indigo-200 mb-4"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to North Delhi
            </Link>

            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6 ml-4">
              <MapPin className="w-5 h-5 mr-2 text-indigo-300" />
              {area.fullName}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-indigo-300">NEET Coaching in {area.name}</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-4">{area.description}</p>

            <p className="text-md opacity-80 mb-8 max-w-4xl mx-auto">{area.heroDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-indigo-500 text-white hover:bg-indigo-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-indigo-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {area.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metro & Landmarks */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Train className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg">Nearest Metro Stations</h3>
              </div>
              <ul className="space-y-2">
                {area.nearbyMetro.map((metro) => (
                  <li key={metro} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-indigo-500" />
                    {metro}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg">Key Landmarks</h3>
              </div>
              <ul className="space-y-2">
                {area.landmarks.map((landmark) => (
                  <li key={landmark} className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {landmark}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg">Top Schools Nearby</h3>
              </div>
              <ul className="space-y-2">
                {area.schools.map((school) => (
                  <li key={school} className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-orange-500" />
                    {school}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Cerebrum Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Why Students from {area.name} Choose Cerebrum
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Better results with personalized attention and AIIMS faculty
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'Small Batches',
                desc: '15-20 students per batch for personal attention',
              },
              {
                icon: GraduationCap,
                title: 'AIIMS Faculty',
                desc: 'Doctors from AIIMS/MAMC as teachers',
              },
              { icon: Trophy, title: '98% Success', desc: 'Highest success rate in Delhi NCR' },
              {
                icon: Target,
                title: 'Result Oriented',
                desc: 'Focus on NEET marks, not attendance',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              NEET Courses for {area.name} Students
            </h2>
            <p className="text-gray-600">Choose the program that fits your needs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {courseOptions.map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-indigo-300 transition-colors"
              >
                <h3 className="font-semibold text-xl text-navy-900 mb-2">{course.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="text-3xl font-bold text-indigo-600 mb-4">{course.fee}</div>
                <ul className="space-y-2 mb-6">
                  {course.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-indigo-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/demo-booking">
                  <Button variant="primary" className="w-full">
                    Enquire Now
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Reach from {area.name}</h2>
            <p className="text-gray-300">Easy connectivity via Metro</p>
          </motion.div>

          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">By Metro</h3>
                  <p className="text-gray-300">
                    Take Yellow Line from {area.nearbyMetro[0]} to Green Park or AIIMS. Our center
                    is just 5 minutes walk from Green Park Metro.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Travel Time</h3>
                  <p className="text-gray-300">
                    Approximately 35-45 minutes from {area.name} via Metro. Direct connectivity on
                    Yellow Line makes commute convenient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your NEET Preparation?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join successful students from {area.name}. Book your FREE demo class today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/demo-booking">Book FREE Demo Class</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600"
                asChild
              >
                <a href="tel:+918826444334">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: 8826-444-334
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
