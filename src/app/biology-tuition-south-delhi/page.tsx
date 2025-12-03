'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  GraduationCap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  BookOpen,
  Microscope,
  Award,
  Play,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const areasList = [
  {
    slug: 'hauz-khas',
    name: 'Hauz Khas',
    description: 'Near IIT Delhi, coaching hub',
    type: 'coaching-hub',
  },
  {
    slug: 'kalu-sarai',
    name: 'Kalu Sarai',
    description: 'Delhi coaching capital',
    type: 'coaching-hub',
  },
  {
    slug: 'greater-kailash',
    name: 'Greater Kailash',
    description: 'GK-1, GK-2 premium area',
    type: 'posh',
  },
  {
    slug: 'defence-colony',
    name: 'Defence Colony',
    description: 'Prestigious residential area',
    type: 'posh',
  },
  {
    slug: 'vasant-vihar',
    name: 'Vasant Vihar',
    description: 'Embassy area, top schools',
    type: 'posh',
  },
  {
    slug: 'rk-puram',
    name: 'RK Puram',
    description: 'Govt officers colony',
    type: 'govt-colony',
  },
  {
    slug: 'sarojini-nagar',
    name: 'Sarojini Nagar',
    description: 'Govt quarters, DDA flats',
    type: 'govt-colony',
  },
  {
    slug: 'lodhi-colony',
    name: 'Lodhi Colony',
    description: 'IAS/IPS officers area',
    type: 'govt-colony',
  },
  {
    slug: 'saket',
    name: 'Saket',
    description: 'Modern area, metro hub',
    type: 'residential',
  },
  {
    slug: 'malviya-nagar',
    name: 'Malviya Nagar',
    description: 'Affordable, student area',
    type: 'residential',
  },
  {
    slug: 'green-park',
    name: 'Green Park',
    description: 'Central location',
    type: 'residential',
  },
  {
    slug: 'cr-park',
    name: 'CR Park',
    description: 'Academic community',
    type: 'residential',
  },
  {
    slug: 'munirka',
    name: 'Munirka',
    description: 'Student hub near JNU',
    type: 'student-hub',
  },
  {
    slug: 'lajpat-nagar',
    name: 'Lajpat Nagar',
    description: 'Metro connected hub',
    type: 'residential',
  },
  {
    slug: 'kalkaji',
    name: 'Kalkaji',
    description: 'Near Nehru Place',
    type: 'residential',
  },
  {
    slug: 'east-of-kailash',
    name: 'East of Kailash',
    description: 'DPS EOK area',
    type: 'posh',
  },
]

const classOptions = [
  {
    class: 'Class 9',
    focus: 'Foundation + NEET Prep',
    fee: '₹5,000/month',
    features: ['NCERT Mastery', 'NEET Foundation', 'School Exams', 'Olympiad Prep'],
  },
  {
    class: 'Class 10',
    focus: 'Board + NEET Foundation',
    fee: '₹6,000/month',
    features: ['Board Preparation', 'NEET Concepts', 'Practical Training', 'Weekly Tests'],
  },
  {
    class: 'Class 11',
    focus: 'NEET + School Boards',
    fee: '₹8,000/month',
    features: ['Complete NEET Syllabus', 'School Sync', 'Doubt Sessions', 'Mock Tests'],
  },
  {
    class: 'Class 12',
    focus: 'Board + NEET Intensive',
    fee: '₹10,000/month',
    features: ['Board Excellence', 'NEET Mastery', 'PYQ Practice', 'Revision Tests'],
  },
]

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '5000+', label: 'Students Taught' },
  { value: '95%', label: 'Pass Rate' },
  { value: '50+', label: 'Board Toppers' },
]

export default function BiologyTuitionSouthDelhiPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Microscope className="w-5 h-5 mr-2 text-yellow-300" />
              Premium Biology Education
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">Biology Tuition in South Delhi</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-4">
              Expert Biology Classes for Classes 9-12 | CBSE, ICSE & State Boards
            </p>

            <p className="text-md opacity-80 mb-8 max-w-3xl mx-auto">
              Join South Delhi&apos;s most trusted biology tuition with AIIMS faculty. Perfect blend
              of board preparation and NEET foundation. Online & offline batches available.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary_cta"
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Class Options */}
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
              Biology Tuition for All Classes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive biology education from Class 9 to 12 with NEET integration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classOptions.map((option, index) => (
              <motion.div
                key={option.class}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl overflow-hidden border border-green-100"
              >
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
                  <h3 className="text-xl font-bold">{option.class}</h3>
                  <p className="text-sm opacity-90">{option.focus}</p>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-green-600 mb-3">{option.fee}</div>
                  <ul className="space-y-2 mb-4">
                    {option.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/demo-booking">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Enroll Now</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
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
              Biology Tuition Across South Delhi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find biology classes near your locality - Click your area for details
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {areasList.map((area, index) => (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/biology-tuition-south-delhi/${area.slug}`}>
                  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all border-l-4 border-green-500 hover:border-green-600">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{area.name}</h3>
                        <p className="text-sm text-gray-500">{area.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Why Choose Cerebrum for Biology Tuition?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Expert AIIMS/JIPMER Faculty',
              'All Boards: CBSE, ICSE, State',
              'NEET Foundation from Class 9',
              'Small Batches (15-20 students)',
              'Weekly Tests & Assessments',
              'Practical Lab Sessions',
              'Doubt Clearing Sessions',
              'Parent-Teacher Meetings',
              'Online + Offline Modes',
              'Affordable Fee Structure',
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

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Biology Excellence Journey Today!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 5000+ successful students from South Delhi. Book your free demo class now!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary_cta"
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
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - Biology Tuition South Delhi',
            description:
              'Best biology tuition in South Delhi for Classes 9-12. Expert AIIMS faculty, all boards covered.',
            url: 'https://cerebrumbiologyacademy.com/biology-tuition-south-delhi',
            areaServed: {
              '@type': 'City',
              name: 'South Delhi',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Biology Tuition Programs',
              itemListElement: [
                {
                  '@type': 'Course',
                  name: 'Class 9 Biology',
                  description: 'Foundation + NEET Prep',
                },
                {
                  '@type': 'Course',
                  name: 'Class 10 Biology',
                  description: 'Board + NEET Foundation',
                },
                {
                  '@type': 'Course',
                  name: 'Class 11 Biology',
                  description: 'NEET + School Boards',
                },
                {
                  '@type': 'Course',
                  name: 'Class 12 Biology',
                  description: 'Board + NEET Intensive',
                },
              ],
            },
          }),
        }}
      />
    </div>
  )
}
