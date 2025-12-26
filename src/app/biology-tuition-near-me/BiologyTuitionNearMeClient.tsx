'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  CheckCircle,
  Phone,
  ArrowRight,
  Play,
  Users,
  Star,
  Clock,
  Award,
  BookOpen,
  GraduationCap,
  Navigation,
  Building2,
  Train,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const locations = [
  {
    city: 'South Delhi',
    areas: [
      { name: 'Hauz Khas', slug: 'hauz-khas', students: 150, metro: 'Green Line' },
      { name: 'Greater Kailash', slug: 'greater-kailash', students: 120, metro: 'Violet Line' },
      { name: 'Defence Colony', slug: 'defence-colony', students: 95, metro: 'Violet Line' },
      { name: 'Vasant Vihar', slug: 'vasant-vihar', students: 85, metro: 'Magenta Line' },
      { name: 'Saket', slug: 'saket', students: 110, metro: 'Yellow Line' },
    ],
    color: 'from-blue-600 to-blue-800',
  },
  {
    city: 'Noida',
    areas: [
      { name: 'Sector 18', slug: 'sector-18', students: 180, metro: 'Blue Line' },
      { name: 'Sector 62', slug: 'sector-62', students: 95, metro: 'Blue Line' },
      { name: 'Sector 137', slug: 'sector-137', students: 75, metro: 'Blue Line' },
      { name: 'Sector 50', slug: 'sector-50', students: 65, metro: 'Aqua Line' },
      { name: 'Sector 44', slug: 'sector-44', students: 55, metro: 'Aqua Line' },
    ],
    color: 'from-green-600 to-green-800',
  },
  {
    city: 'Gurgaon',
    areas: [
      { name: 'Sector 14', slug: 'sector-14', students: 130, metro: 'Yellow Line' },
      { name: 'DLF Phase 3', slug: 'dlf-phase-3', students: 90, metro: 'Rapid Metro' },
      { name: 'Sector 56', slug: 'sector-56', students: 85, metro: 'Rapid Metro' },
      { name: 'Sohna Road', slug: 'sohna-road', students: 70, metro: 'Nearby' },
      { name: 'Golf Course Road', slug: 'golf-course-road', students: 60, metro: 'Rapid Metro' },
    ],
    color: 'from-purple-600 to-purple-800',
  },
  {
    city: 'East Delhi',
    areas: [
      { name: 'Laxmi Nagar', slug: 'laxmi-nagar', students: 200, metro: 'Blue Line' },
      { name: 'Preet Vihar', slug: 'preet-vihar', students: 150, metro: 'Blue Line' },
      { name: 'Mayur Vihar', slug: 'mayur-vihar', students: 140, metro: 'Blue Line' },
      { name: 'Patparganj', slug: 'patparganj', students: 90, metro: 'Blue Line' },
      { name: 'Shahdara', slug: 'shahdara', students: 85, metro: 'Red Line' },
    ],
    color: 'from-orange-600 to-orange-800',
  },
  {
    city: 'North Delhi',
    areas: [
      { name: 'Rohini', slug: 'rohini', students: 175, metro: 'Red Line' },
      { name: 'Pitampura', slug: 'pitampura', students: 130, metro: 'Red Line' },
      { name: 'Model Town', slug: 'model-town', students: 95, metro: 'Yellow Line' },
      { name: 'Shalimar Bagh', slug: 'shalimar-bagh', students: 80, metro: 'Red Line' },
      { name: 'Ashok Vihar', slug: 'ashok-vihar', students: 70, metro: 'Red Line' },
    ],
    color: 'bg-red-600',
  },
  {
    city: 'West Delhi',
    areas: [
      { name: 'Dwarka', slug: 'dwarka', students: 160, metro: 'Blue Line' },
      { name: 'Janakpuri', slug: 'janakpuri', students: 120, metro: 'Blue Line' },
      { name: 'Rajouri Garden', slug: 'rajouri-garden', students: 100, metro: 'Blue Line' },
      { name: 'Uttam Nagar', slug: 'uttam-nagar', students: 85, metro: 'Blue Line' },
      { name: 'Patel Nagar', slug: 'patel-nagar', students: 75, metro: 'Blue Line' },
    ],
    color: 'from-green-600 to-green-800',
  },
]

const stats = [
  { icon: Users, value: '5,000+', label: 'Students Taught' },
  { icon: Star, value: '98%', label: 'Success Rate' },
  { icon: Award, value: '500+', label: 'Medical Selections' },
  { icon: Clock, value: '10+', label: 'Years Experience' },
]

const features = [
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from doctors who cracked NEET themselves',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Maximum 15 students per batch for personal attention',
  },
  {
    icon: BookOpen,
    title: 'NCERT Focus',
    description: 'Complete NCERT-based curriculum for NEET 2026',
  },
  {
    icon: Navigation,
    title: 'Multiple Centers',
    description: 'Convenient locations across Delhi NCR with metro connectivity',
  },
]

const faqs = [
  {
    question: 'How do I find biology tuition near my location?',
    answer:
      'Cerebrum Biology Academy has multiple centers across Delhi NCR including South Delhi, Noida, Gurgaon, Ghaziabad, and Faridabad. All our centers are located near metro stations for easy accessibility. Call us at +91-88264-44334 to find the nearest center.',
  },
  {
    question: 'What is the fee for biology tuition classes?',
    answer:
      'Our biology tuition fees range from ₹36,000 to ₹1,56,000 per year depending on the course and batch type. We offer Pursuit (budget), Ascent (popular), and Pinnacle (premium) tiers. EMI options available.',
  },
  {
    question: 'Do you provide home tuition for biology?',
    answer:
      'While we primarily offer classroom and online coaching, we can arrange personalized one-on-one sessions at our centers. Our small batch sizes (10-15 students) ensure personal attention similar to home tuition.',
  },
  {
    question: 'Which areas in Delhi NCR do you cover?',
    answer:
      'We serve students from South Delhi, East Delhi, North Delhi, West Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad, and Faridabad. Most of our centers are within 10 minutes walk from metro stations.',
  },
  {
    question: 'Is there a free demo class available?',
    answer:
      'Yes! We offer a completely FREE demo class so you can experience our teaching methodology before enrolling. Book your free demo at cerebrumbiologyacademy.com/demo-booking or call +91-88264-44334.',
  },
]

export function BiologyTuitionNearMeClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-blue-800 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              Find Biology Tuition Near You in Delhi NCR
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Biology Tuition <span className="text-yellow-300">Near Me</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-4xl mx-auto">
              Looking for the best biology tuition near you? Cerebrum Biology Academy has 6+ centers
              across Delhi NCR with AIIMS faculty, small batches, and 98% success rate.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>

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
                  className="border-white text-white hover:bg-white hover:text-green-800"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Grid */}
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
              Find Biology Tuition in Your Area
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We serve 30+ localities across Delhi NCR. All centers are near metro stations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${location.color} text-white p-4`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{location.city}</h3>
                    <Building2 className="w-6 h-6 opacity-80" />
                  </div>
                  <p className="text-sm opacity-80 mt-1">
                    {location.areas.reduce((acc, a) => acc + a.students, 0)}+ students enrolled
                  </p>
                </div>
                <div className="p-4">
                  <ul className="space-y-3">
                    {location.areas.map((area) => (
                      <li key={area.slug}>
                        <Link
                          href={`/biology-tuition-${location.city
                            .toLowerCase()
                            .replace(' ', '-')}/${area.slug}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="font-medium text-gray-700 group-hover:text-green-600">
                              {area.name}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Train className="w-3 h-3 mr-1" />
                            <span>{area.metro}</span>
                            <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Why Choose Cerebrum for Biology Tuition?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">Common questions about biology tuition near you</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find the Best Biology Tuition Near You?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a FREE demo class and experience our teaching methodology. We'll help you find
              the nearest center!
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
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy',
            description:
              'Best biology tuition near you in Delhi NCR. Expert AIIMS faculty, small batches, 98% success rate.',
            url: 'https://cerebrumbiologyacademy.com/biology-tuition-near-me',
            telephone: '+918826444334',
            areaServed: [
              { '@type': 'City', name: 'Delhi' },
              { '@type': 'City', name: 'Noida' },
              { '@type': 'City', name: 'Gurgaon' },
              { '@type': 'City', name: 'Ghaziabad' },
              { '@type': 'City', name: 'Faridabad' },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '500',
            },
          }),
        }}
      />
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
    </div>
  )
}
