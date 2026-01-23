'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Users,
  Trophy,
  Star,
  Award,
  BookOpen,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Building,
  Phone,
  Navigation,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const centers = [
  {
    name: 'Rohini Center',
    address: '211 Vikas Surya Tower, DC Chauk Sector 9',
    city: 'Rohini, Delhi',
    pincode: '110085',
    phone: '+918826444334',
    features: ['Fully Equipped Classrooms', 'Library', 'Test Series Center'],
    timing: 'Mon-Sat: 8:00 AM - 8:00 PM',
    students: '1,200+',
    href: '/neet-coaching-north-delhi',
  },
  {
    name: 'Gurugram Center',
    address: 'Unit 17, M2K Corporate Park, Sector 51 (Mayfield Garden)',
    city: 'Gurugram',
    pincode: '122018',
    phone: '+918826444334',
    features: ['Modern Infrastructure', 'Digital Classrooms', 'Student Lounge'],
    timing: 'Mon-Sat: 8:00 AM - 8:00 PM',
    students: '800+',
    href: '/neet-coaching-gurugram',
  },
  {
    name: 'South Extension Center',
    address: 'Block D, Near McD, South Extension Part 2',
    city: 'New Delhi',
    pincode: '110049',
    phone: '+918826444334',
    features: ['Prime Location', 'Well-Connected', 'Spacious Classrooms'],
    timing: 'Mon-Sat: 8:00 AM - 8:00 PM',
    students: '600+',
    href: '/neet-coaching-south-delhi',
  },
  {
    name: 'Faridabad Center',
    address: 'Sector 15, Near Crown Interiors Mall',
    city: 'Faridabad',
    pincode: '121007',
    phone: '+918826444334',
    features: ['Spacious Classrooms', 'Study Material Library', 'Mock Test Center'],
    timing: 'Mon-Sat: 8:00 AM - 8:00 PM',
    students: '500+',
    href: '/neet-coaching-faridabad',
  },
]

const features = [
  {
    icon: Building,
    title: 'State-of-the-Art Infrastructure',
    description: 'Modern classrooms with AC, projectors, and comfortable seating.',
  },
  {
    icon: Users,
    title: 'Small Batch Size',
    description: 'Maximum 10-15 students per batch for personalized attention.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert faculty trained at premier medical institutions.',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes, question banks, and mock tests included.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches available.',
  },
  {
    icon: Video,
    title: 'Online + Offline',
    description: 'Attend classes at center or join online - your choice.',
  },
]

const successMetrics = [
  { label: 'Centers', value: '4', icon: Building },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Students', value: '3,100+', icon: Users },
  { label: 'Top Score', value: '720', icon: Star },
]

const faqs = [
  {
    question: 'Where are your NEET coaching centres located?',
    answer:
      'We have 4 NEET coaching centres in Delhi NCR: Rohini (North Delhi), Gurugram, South Extension (South Delhi), and Faridabad. All centres are easily accessible by metro and public transport.',
  },
  {
    question: 'Which is the best NEET coaching centre near me?',
    answer:
      'All our centres offer the same quality of education with AIIMS-trained faculty. Choose the centre closest to your location for convenience. If you are not near any centre, join our online classes for the same quality education.',
  },
  {
    question: 'What facilities are available at your NEET coaching centres?',
    answer:
      'Our centres feature air-conditioned classrooms, digital projectors, library with study materials, test series center, doubt clearing sessions, and student lounge. We provide a comfortable learning environment for focused preparation.',
  },
  {
    question: 'Can I visit the centre before enrolling?',
    answer:
      'Yes! We encourage you to visit any of our centres. You can attend a free demo class, meet the faculty, see the infrastructure, and interact with current students before making your decision.',
  },
  {
    question: 'What are the batch timings at your centres?',
    answer:
      'We offer multiple batches - morning (8 AM - 12 PM), afternoon (1 PM - 5 PM), and evening (5 PM - 9 PM). Weekend batches are also available for school-going students.',
  },
]

export default function NeetCoachingCentrePage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_centre', {
        event_category: 'conversion',
        event_label: 'neet_coaching_centre_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-cyan-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />4 Centres Across Delhi NCR
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">NEET Coaching Centre</span> Near Me
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Rohini | Gurugram | South Extension | Faridabad
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Find the best NEET coaching centre near you. 4 strategically located centres in Delhi
              NCR with modern infrastructure, AIIMS-trained faculty, and proven 98% success rate.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="#centres">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  Find Nearest Centre
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Centres Section */}
      <section id="centres" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our NEET Coaching Centres
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit any of our 4 centres for the best NEET preparation experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {centers.map((center, index) => (
              <motion.div
                key={center.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-[#4a5d4a] text-white p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{center.name}</h3>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {center.students} Students
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{center.address}</p>
                        <p className="text-gray-600">
                          {center.city} - {center.pincode}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-green-600 mr-3" />
                      <a href={`tel:${center.phone}`} className="text-green-600 hover:underline">
                        {center.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-600">{center.timing}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {center.features.map((feature) => (
                      <span
                        key={feature}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link href={center.href}>
                    <Button variant="primary" className="w-full">
                      View Centre Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              What Makes Our Centres Special
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <feature.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Option */}
      <section className="py-20 bg-[#4a5d4a] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Not Near Any Centre? Join Online!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get the same quality education from anywhere in India. Live interactive classes,
              recorded lectures, and 24/7 doubt support.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/neet-coaching-north-india">
                <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  North India
                </Button>
              </Link>
              <Link href="/neet-coaching-south-india">
                <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  South India
                </Button>
              </Link>
              <Link href="/neet-coaching-east-india">
                <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  East India
                </Button>
              </Link>
              <Link href="/neet-coaching-west-india">
                <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  West India
                </Button>
              </Link>
              <Link href="/neet-coaching-overseas">
                <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  Overseas (NRI)
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              FAQs - NEET Coaching Centre
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-green-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Visit Our NEET Coaching Centre Today
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Book a free demo class and experience the difference at our centres
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button variant="primary" size="xl" onClick={handleDemoBooking}>
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button variant="outline" size="xl">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/best-neet-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Best NEET Coaching
            </Link>
            <Link
              href="/neet-coaching-institute"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching Institute
            </Link>
            <Link
              href="/neet-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Classes
            </Link>
            <Link
              href="/neet-preparation"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Preparation
            </Link>
            <Link
              href="/neet-biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology Classes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
