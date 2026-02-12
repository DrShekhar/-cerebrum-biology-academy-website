'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  Download,
  FileText,
  Eye,
  CheckCircle,
  Users,
  BookOpen,
  Award,
  Target,
  Phone,
  ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function BrochurePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    class: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSubmitted(true)
    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const brochures = [
    {
      title: 'Complete Course Brochure',
      description: 'Comprehensive guide covering all courses, faculty, and facilities',
      pages: 24,
      features: ['Course details', 'Fee structure', 'Faculty profiles', 'Success stories'],
      type: 'general',
    },
    {
      title: 'Class 11th Foundation Brochure',
      description: 'Detailed information about our Class 11th foundation program',
      pages: 16,
      features: [
        'Curriculum overview',
        'Study methodology',
        'Assessment pattern',
        'Sample materials',
      ],
      type: 'class-11',
    },
    {
      title: 'Class 12th Intensive Brochure',
      description: 'Complete guide for NEET preparation in Class 12th',
      pages: 20,
      features: ['NEET syllabus', 'Test series', 'Rank analysis', 'Previous results'],
      type: 'class-12',
    },
    {
      title: 'Dropper Batch Brochure',
      description: 'Specialized program for NEET droppers and repeaters',
      pages: 18,
      features: ['Revision strategy', 'Advanced problems', 'Mock tests', 'Counseling support'],
      type: 'dropper',
    },
  ]

  const highlights = [
    {
      icon: Award,
      title: '98% Success Rate',
      description: 'Students scoring 320+ in NEET Biology',
    },
    {
      icon: Users,
      title: 'Expert Faculty',
      description: '15+ years experienced teachers',
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Material',
      description: 'NCERT + Advanced study resources',
    },
    {
      icon: Target,
      title: 'Proven Methods',
      description: 'Time-tested teaching methodology',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <motion.h1
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Download Course Brochures
            </motion.h1>
            <motion.p
              className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get detailed information about our NEET Biology courses, faculty profiles, success
              stories, and fee structure. Everything you need to make an informed decision.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-indigo-600"
              >
                <Eye className="w-5 h-5 mr-2" />
                Preview Brochure
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Now
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Available Brochures */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Available Brochures</h2>
            <p className="text-xl text-gray-600">
              Choose the brochure that matches your course interest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {brochures.map((brochure, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mr-6">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{brochure.title}</h3>
                    <p className="text-gray-600 mb-2">{brochure.description}</p>
                    <p className="text-sm text-gray-500">{brochure.pages} pages • PDF format</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {brochure.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="primary" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Your Free Brochure</h2>
            <p className="text-xl text-gray-600">
              Fill this form to receive detailed course brochures
            </p>
          </div>

          <motion.div
            className="bg-gray-50 rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Brochures Sent Successfully!
                </h3>
                <p className="text-gray-600 mb-4">
                  Check your email for download links and additional information.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 max-w-md mx-auto">
                  <p className="text-green-800 font-medium">Downloads available for 30 days</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Current Class
                    </label>
                    <select
                      name="class"
                      value={formData.class}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select your class</option>
                      <option value="class-10">Class 10th</option>
                      <option value="class-11">Class 11th</option>
                      <option value="class-12">Class 12th</option>
                      <option value="dropper">Dropper/Repeater</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Course Interest
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select course of interest</option>
                    <option value="foundation">Foundation Course (Class 9-10)</option>
                    <option value="class-11">Class 11th Foundation</option>
                    <option value="class-12">Class 12th Intensive</option>
                    <option value="dropper">NEET Dropper Batch</option>
                    <option value="all">All Courses</option>
                  </select>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="px-12"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Sending Brochures...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Get Free Brochures
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Cerebrum Biology Academy?
            </h2>
            <p className="text-xl text-gray-600">
              Discover what makes us India's leading NEET Biology coaching institute
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your NEET Journey?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Download our brochures and discover how we can help you achieve your medical dreams
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-indigo-600"
              >
                Book Free Demo Class
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              variant="primary"
              size="xl"
              className="bg-white text-indigo-600 hover:bg-gray-100"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call +91 88264 44334
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">FREE</div>
              <div className="text-indigo-100">Digital Brochures</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-indigo-100">Download Access</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5000+</div>
              <div className="text-indigo-100">Success Stories</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
