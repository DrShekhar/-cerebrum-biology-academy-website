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
  Calendar,
  Wifi,
  FileText,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'

export interface NRICountryData {
  country: string
  countryCode: string
  flag: string
  region: string
  headline: string
  subheadline: string
  description: string
  cbseSchools: number
  neetCenter: string | null
  timezone: string
  istConversion: string
  classTimings: string
  cities: string[]
  studentCount: string
  features: string[]
  whyChoose: {
    title: string
    description: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  courses: {
    name: string
    classes: string
    duration: string
    fee: string
    features: string[]
  }[]
  testimonial?: {
    name: string
    city: string
    score: string
    quote: string
  }
  seoKeywords: string[]
}

interface NRICountryPageTemplateProps {
  data: NRICountryData
}

export function NRICountryPageTemplate({ data }: NRICountryPageTemplateProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm an NRI student from ${data.country} interested in NEET Biology coaching. Please share details about online classes and fee structure.`
  )
  const whatsappLink = `https://wa.me/918826444334?text=${whatsappMessage}`

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: `nri_${data.countryCode}_page`,
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <FAQSchema
        questions={data.faqs}
        pageUrl={`https://cerebrumbiologyacademy.com/nri-students/${data.countryCode}`}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-10 right-10 text-8xl opacity-20">{data.flag}</div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{data.flag}</span>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4 mr-2" />
                {data.region}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">{data.headline}</h1>

            <p className="text-xl md:text-2xl opacity-90 mb-4">{data.subheadline}</p>

            <p className="text-lg opacity-80 mb-8 max-w-3xl">{data.description}</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-300">{data.cbseSchools}+</div>
                <div className="text-sm opacity-80">CBSE Schools</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-300">{data.studentCount}</div>
                <div className="text-sm opacity-80">Students Enrolled</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-300">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-300">
                  {data.neetCenter ? 'Yes' : 'India'}
                </div>
                <div className="text-sm opacity-80">NEET Center</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
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
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cities Served */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-gray-600 font-medium">Serving students from:</span>
            {data.cities.map((city) => (
              <span
                key={city}
                className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm border"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Class Timings */}
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
              Class Timings for {data.country} Students
            </h2>
            <p className="text-xl text-gray-600">
              Convenient timings aligned with {data.timezone} timezone
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center border border-blue-100">
              <Clock className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Your Local Time</h3>
              <div className="text-2xl font-bold text-blue-600">{data.classTimings}</div>
              <div className="text-sm text-gray-500 mt-1">{data.timezone}</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-100">
              <Globe className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">India Time (IST)</h3>
              <div className="text-2xl font-bold text-green-600">{data.istConversion}</div>
              <div className="text-sm text-gray-500 mt-1">GMT+5:30</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 text-center border border-purple-100">
              <Video className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Recorded Classes</h3>
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-500 mt-1">Available anytime</div>
            </div>
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
              NEET & Board Courses for {data.country} Students
            </h2>
            <p className="text-xl text-gray-600">
              Classes 9th to 12th + Droppers | CBSE, ICSE, IB, Cambridge Boards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.courses.map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
                  <h3 className="text-xl font-bold">{course.name}</h3>
                  <div className="text-sm opacity-90">{course.classes}</div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-semibold">{course.duration}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Fee</div>
                      <div className="text-xl font-bold text-green-600">{course.fee}</div>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="block"
                  >
                    <Button variant="primary" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Enquire on WhatsApp
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
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
              Why {data.country} Students Choose Cerebrum Biology Academy
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.whyChoose.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
              >
                <CheckCircle className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Get</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center"
              >
                <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 text-yellow-300" />
                <span className="text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {data.testimonial && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
            >
              <div className="text-4xl mb-4">{data.flag}</div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 italic">
                "{data.testimonial.quote}"
              </blockquote>
              <div className="font-bold text-gray-900">{data.testimonial.name}</div>
              <div className="text-gray-500">
                {data.testimonial.city}, {data.country}
              </div>
              <div className="text-green-600 font-semibold mt-2">
                NEET Score: {data.testimonial.score}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              FAQs for {data.country} Students
            </h2>
          </motion.div>

          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEET Exam Center Info */}
      {data.neetCenter && (
        <section className="py-12 bg-green-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              NEET Exam Center Available
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Write NEET in {data.neetCenter}!
            </h3>
            <p className="text-gray-600">
              No need to travel to India for the exam. NEET exam center is available in{' '}
              {data.neetCenter}.
            </p>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-6">{data.flag}</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from {data.country} Today!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join {data.studentCount} students from {data.country} already preparing with us
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3 justify-center mb-8">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
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
              <p>
                <Phone className="w-4 h-4 inline mr-1" />
                +91 8826444334 | Available 8 AM - 10 PM IST
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            NEET Coaching for Other Countries
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/nri-students"
              className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm border"
            >
              All Countries
            </Link>
            <Link
              href="/nri-students/uae"
              className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm border"
            >
              UAE
            </Link>
            <Link
              href="/nri-students/saudi-arabia"
              className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm border"
            >
              Saudi Arabia
            </Link>
            <Link
              href="/nri-students/kuwait"
              className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm border"
            >
              Kuwait
            </Link>
            <Link
              href="/nri-students/singapore"
              className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm border"
            >
              Singapore
            </Link>
            <Link
              href="/nri-students/qatar"
              className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm border"
            >
              Qatar
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
