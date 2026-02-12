'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  GraduationCap,
  CheckCircle,
  Phone,
  ArrowRight,
  Play,
  Users,
  Wifi,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  getOfflineCenters,
  getOnlineRegions,
  generateLocalBusinessSchema,
  getWhatsAppEnquiryUrl,
} from '@/lib/nearMe/nearMeData'

const PAGE_KEYWORD = 'NEET Coaching Near Me'

const schools = [
  {
    name: 'DPS RK Puram',
    slug: 'dps-rk-puram',
    location: 'RK Puram, South Delhi',
    students: '3,000+',
    description: "Delhi Public School RK Puram - One of India's most prestigious schools",
    nearbyAreas: ['Hauz Khas', 'IIT Delhi', 'Vasant Vihar'],
    rank: 'Top 5 in Delhi',
  },
  {
    name: 'DPS Vasant Vihar',
    slug: 'dps-vasant-vihar',
    location: 'Vasant Vihar, South Delhi',
    students: '1,50,000+',
    description: 'Premium DPS branch in the elite Vasant Vihar area',
    nearbyAreas: ['Vasant Vihar', 'Vasant Kunj', 'Munirka'],
    rank: 'Top 10 in Delhi',
  },
  {
    name: 'Vasant Valley School',
    slug: 'vasant-valley-school',
    location: 'Vasant Kunj, South Delhi',
    students: '1,800+',
    description: 'Elite IB school known for holistic education',
    nearbyAreas: ['Vasant Kunj', 'Vasant Vihar', 'Mehrauli'],
    rank: 'Top IB School',
  },
  {
    name: 'Modern School Vasant Vihar',
    slug: 'modern-school-vasant-vihar',
    location: 'Vasant Vihar, South Delhi',
    students: '2,000+',
    description: 'Prestigious Modern School branch in South Delhi',
    nearbyAreas: ['Vasant Vihar', 'RK Puram', 'Munirka'],
    rank: 'Top 15 in India',
  },
  {
    name: 'Sanskriti School',
    slug: 'sanskriti-school',
    location: 'Chanakyapuri, Central Delhi',
    students: '1,500+',
    description: 'IB World School in the diplomatic enclave',
    nearbyAreas: ['Chanakyapuri', 'RK Puram', 'Vasant Vihar'],
    rank: 'Top IB School',
  },
  {
    name: 'The Shri Ram School',
    slug: 'shri-ram-school',
    location: 'Vasant Vihar, South Delhi',
    students: '1,200+',
    description: 'Elite school known for academic excellence',
    nearbyAreas: ['Vasant Vihar', 'Vasant Kunj', 'RK Puram'],
    rank: 'Top 10 in Delhi',
  },
  {
    name: 'Springdales School Pusa Road',
    slug: 'springdales-pusa-road',
    location: 'Pusa Road, Central Delhi',
    students: '2,000+',
    description: 'Historic school with strong academic tradition',
    nearbyAreas: ['Karol Bagh', 'Rajendra Place', 'Patel Nagar'],
    rank: 'Top 20 in Delhi',
  },
  {
    name: 'DPS East of Kailash',
    slug: 'dps-east-of-kailash',
    location: 'East of Kailash, South Delhi',
    students: '2,200+',
    description: 'Well-established DPS branch in South Delhi',
    nearbyAreas: ['East of Kailash', 'Greater Kailash', 'Nehru Place'],
    rank: 'Top 15 in Delhi',
  },
]

export default function NEETCoachingNearPage() {
  const [isInDelhiNCR, setIsInDelhiNCR] = useState<boolean | null>(null)

  const offlineCenters = getOfflineCenters()
  const onlineRegions = getOnlineRegions()
  const localBusinessSchemas = generateLocalBusinessSchema(PAGE_KEYWORD, offlineCenters)

  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation')
    if (savedLocation) {
      try {
        const location = JSON.parse(savedLocation)
        const delhiNCRCities = [
          'Delhi',
          'New Delhi',
          'Gurugram',
          'Gurgaon',
          'Faridabad',
          'Noida',
          'Greater Noida',
          'Ghaziabad',
        ]
        setIsInDelhiNCR(delhiNCRCities.includes(location.city))
      } catch {
        setIsInDelhiNCR(null)
      }
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* LocalBusiness Schemas for each center */}
      {localBusinessSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-5 h-5 mr-2 text-yellow-300" />
              NEET Coaching for Top School Students
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              NEET Coaching <span className="text-yellow-300">Near Your School</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-4xl mx-auto">
              Specialized NEET Biology coaching for students from Delhi's top schools. DPS, Modern
              School, Vasant Valley, Sanskriti - we understand your curriculum and schedule.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
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
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schools Grid */}
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
              Find NEET Coaching Near Your School
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select your school to see customized coaching options
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schools.map((school, index) => (
              <motion.div
                key={school.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/neet-coaching-near/${school.slug}`}>
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 h-full group">
                    <div className="flex items-center justify-between mb-3">
                      <GraduationCap className="w-8 h-8 text-green-600" />
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        {school.rank}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-green-600 transition-colors">
                      {school.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{school.location}</p>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Users className="w-4 h-4 mr-1" />
                      {school.students} students
                    </div>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why School-Specific */}
      <section className="py-16 md:py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why School-Specific NEET Coaching?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Timings that fit your school schedule',
              'Understand your school curriculum',
              'Connect with classmates in batches',
              'Exam dates aligned with school calendar',
              'Transport-friendly locations',
              'Parent coordination with school',
              'Holiday batch options',
              'Online classes for exam periods',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <CheckCircle className="w-6 h-6 text-yellow-300 mr-3 flex-shrink-0" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Classes Section - For non Delhi NCR users */}
      {isInDelhiNCR === false && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Wifi className="w-4 h-4 mr-2" />
                Online NEET Coaching Available
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Not in Delhi NCR? Join Us Online!
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get the same expert NEET coaching from anywhere in India through our interactive
                online platform.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onlineRegions.map((region, index) => (
                <motion.div
                  key={region.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-blue-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Wifi className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-900">{region.name}</h3>
                      <p className="text-sm text-gray-500">
                        {region.studentCount}+ students enrolled
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(region.states || region.countries || []).slice(0, 4).map((area) => (
                      <span
                        key={area}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                      >
                        {area}
                      </span>
                    ))}
                    {(region.states || region.countries || []).length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{(region.states || region.countries || []).length - 4} more
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <a href={getWhatsAppEnquiryUrl(PAGE_KEYWORD, 'Online')}>
                <Button size="xl" className="bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enquire About Online Classes
                </Button>
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't See Your School Listed?</h2>
            <p className="text-xl mb-8 opacity-90">
              We serve students from all major schools in Delhi NCR. Contact us for a customized
              plan!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
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
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
