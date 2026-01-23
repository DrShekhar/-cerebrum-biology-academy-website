'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import {
  Globe,
  MapPin,
  Star,
  CheckCircle,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Phone,
  Target,
  Send,
  Shield,
  ChevronDown,
  HelpCircle,
  Brain,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { nriCountriesData } from '@/data/nriCountries'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

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
  testimonials?: {
    name: string
    city: string
    score: string
    quote: string
    college?: string
    avatar?: string
  }[]
  seoKeywords: string[]
}

interface NRICountryPageTemplateProps {
  data: NRICountryData
}

export function NRICountryPageTemplate({ data }: NRICountryPageTemplateProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    country: data.country,
    city: '',
    whatsappNumber: '',
    email: '',
    currentClass: '',
    targetYear: 'NEET 2026',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleWhatsAppClick = async () => {
    await trackAndOpenWhatsApp({
      source: `nri-country-${data.countryCode}`,
      message: `Hi, I'm an NRI student from ${data.country} interested in NEET Biology coaching. Please share details about online classes and fee structure.`,
      campaign: 'nri-country-page',
    })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.studentName,
          phone: formData.whatsappNumber,
          email: formData.email,
          center: 'online',
          supportType: 'admission',
          message: `NRI Lead from ${data.country}. Class: ${formData.currentClass}. Target: ${formData.targetYear}. Parent: ${formData.parentName}. City: ${formData.city}`,
          timestamp: new Date().toISOString(),
          source: `nri-${data.countryCode}-page`,
        }),
      })

      if (response.ok) {
        setFormSubmitted(true)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <FAQSchema
        questions={data.faqs}
        pageUrl={`https://cerebrumbiologyacademy.com/nri-students/${data.countryCode}`}
      />

      {/* Hero Section with Lead Form */}
      <section className="relative bg-blue-900 text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-10 right-10 text-8xl opacity-20">{data.flag}</div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{data.flag}</span>
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  <MapPin className="w-4 h-4 mr-2" />
                  {data.region}
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6">{data.headline}</h1>

              <p className="text-xl opacity-90 mb-4">{data.subheadline}</p>

              <p className="text-lg opacity-80 mb-8 max-w-3xl">{data.description}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-yellow-300">{data.cbseSchools}+</div>
                  <div className="text-xs opacity-80">CBSE Schools</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-yellow-300">{data.studentCount}</div>
                  <div className="text-xs opacity-80">Students</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-yellow-300">98%</div>
                  <div className="text-xs opacity-80">Success Rate</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-yellow-300">
                    {data.neetCenter ? 'Yes' : 'India'}
                  </div>
                  <div className="text-xs opacity-80">NEET Center</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-green-600 text-white hover:bg-green-600 cursor-pointer"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </Button>
                <Link href="/demo-booking">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-blue-900"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Book Demo
                  </Button>
                </Link>
                <a href={getPhoneLink()}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-blue-900"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Right Column - Lead Capture Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-2xl"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-black mb-2">Get Free Consultation</h2>
                <p className="text-sm text-gray-600">Our counselor will call you within 1 hour</p>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Student Name *"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  />
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  >
                    <option value="">Select Country *</option>
                    {Object.entries(nriCountriesData).map(([code, country]) => (
                      <option key={code} value={country.country}>
                        {country.flag} {country.country}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="WhatsApp Number *"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  />
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    value={formData.currentClass}
                    onChange={(e) => setFormData({ ...formData, currentClass: e.target.value })}
                  >
                    <option value="">Select Class *</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Dropper">Dropper</option>
                  </select>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full bg-green-600 hover:bg-green-600 text-white py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Get Free Consultation
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-4">Our counselor will call you within 1 hour.</p>
                  <Button
                    variant="secondary"
                    className="bg-green-600 text-white cursor-pointer"
                    onClick={handleWhatsAppClick}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp Now
                  </Button>
                </div>
              )}

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <Shield className="w-4 h-4 mr-1 text-green-600" />
                  Secure
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                  No Spam
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Phone className="w-4 h-4 mr-1 text-green-600" />
                  Free Call
                </div>
              </div>
            </motion.div>
          </div>
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

      {/* Free Tools Section */}
      <section className="py-12 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-purple-100 px-4 py-2 rounded-full text-purple-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Start Your NEET Prep Journey - Free!
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              Try Our Free NEET Preparation Tools
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* MCQ Practice Tool */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/neet-biology-mcq">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Brain className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black mb-2 group-hover:text-purple-600 transition-colors">
                        NEET Biology MCQ Practice
                      </h3>
                      <p className="text-gray-600 mb-3">
                        10,000+ chapter-wise MCQs with detailed solutions. Practice Botany & Zoology
                        topics.
                      </p>
                      <div className="flex items-center text-purple-600 font-medium">
                        Start Practicing Free
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Rank Predictor Tool */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Link href="/neet-rank-predictor">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black mb-2 group-hover:text-blue-600 transition-colors">
                        NEET Rank Predictor
                      </h3>
                      <p className="text-gray-600 mb-3">
                        Predict your NEET rank based on expected score. Get college recommendations
                        for NRI quota.
                      </p>
                      <div className="flex items-center text-blue-600 font-medium">
                        Check Your Rank
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Class Timings for {data.country} Students
            </h2>
            <p className="text-xl text-gray-600">
              Convenient timings aligned with {data.timezone} timezone
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-100">
              <Clock className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-black mb-2">Your Local Time</h3>
              <div className="text-2xl font-bold text-blue-600">{data.classTimings}</div>
              <div className="text-sm text-gray-500 mt-1">{data.timezone}</div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
              <Globe className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-black mb-2">India Time (IST)</h3>
              <div className="text-2xl font-bold text-green-600">{data.istConversion}</div>
              <div className="text-sm text-gray-500 mt-1">GMT+5:30</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 text-center border border-purple-100">
              <Video className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-black mb-2">Recorded Classes</h3>
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
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
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
                <div className="bg-blue-600 p-4 text-white">
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
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="primary"
                    className="w-full cursor-pointer"
                    onClick={handleWhatsAppClick}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enquire on WhatsApp
                  </Button>
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
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
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
                className="bg-blue-50 rounded-xl p-6 border border-blue-100"
              >
                <CheckCircle className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blue-600 text-white">
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

      {/* Testimonials Section */}
      {(data.testimonials && data.testimonials.length > 0) || data.testimonial ? (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                {data.country} Students Who Cracked NEET
              </h2>
              <p className="text-xl text-gray-600">
                Success stories from students in {data.country}
              </p>
            </motion.div>

            {/* Multiple Testimonials Grid */}
            {data.testimonials && data.testimonials.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-purple-50 rounded-xl p-6 border border-purple-100"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{testimonial.avatar || '👨‍🎓'}</div>
                      <div>
                        <h4 className="font-bold text-black">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.city}, {data.country}
                          {testimonial.college && ` • ${testimonial.college}`}
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold inline-block mb-4">
                      NEET Score: {testimonial.score}
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                    <div className="flex mt-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : data.testimonial ? (
              /* Single Testimonial Fallback */
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-purple-50 rounded-2xl shadow-xl p-8 md:p-12 text-center border border-purple-100"
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
                  <div className="font-bold text-black">{data.testimonial.name}</div>
                  <div className="text-gray-500">
                    {data.testimonial.city}, {data.country}
                  </div>
                  <div className="text-green-600 font-semibold mt-2">
                    NEET Score: {data.testimonial.score}
                  </div>
                </motion.div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* FAQs Section - Accordion */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-purple-100 px-4 py-2 rounded-full text-purple-700 text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4 mr-2" />
              Common Questions from {data.country} Students
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about NEET preparation from {data.country}
            </p>
          </motion.div>

          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-black text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform duration-200 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-full transition-colors cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with us on WhatsApp
            </button>
          </motion.div>
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
            <h3 className="text-2xl font-bold text-black mb-2">Write NEET in {data.neetCenter}!</h3>
            <p className="text-gray-600">
              No need to travel to India for the exam. NEET exam center is available in{' '}
              {data.neetCenter}.
            </p>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
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
              <Button
                variant="secondary"
                size="lg"
                className="bg-green-600 text-white hover:bg-green-600 w-full sm:w-auto min-h-[48px] text-sm sm:text-base px-4 sm:px-6 cursor-pointer"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="truncate">WhatsApp Us</span>
              </Button>
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
              <a href={getPhoneLink()} className="w-full sm:w-auto">
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
                {getDisplayPhone()} | Available 8 AM - 10 PM IST
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-black mb-6 text-center">
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
