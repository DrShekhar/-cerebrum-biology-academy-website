'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Calendar,
  Users,
  Award,
  BookOpen,
  Target,
  Star,
  ArrowRight,
  Building,
  Navigation,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    enquiryType: 'general',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        enquiryType: 'general',
      })
    }, 3000)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Campus',
      details: ['A-2/45, Sector 16, Noida, UP 201301', 'Near City Centre Metro Station'],
      color: 'bg-blue-500',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 91931 19462', '+91 88264 44334 (Admissions)'],
      color: 'bg-green-500',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@cerebrumbiologyacademy.com', 'admissions@cerebrumbiologyacademy.com'],
      color: 'bg-purple-500',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Saturday: 8:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
      color: 'bg-orange-500',
    },
  ]

  const quickLinks = [
    { title: 'Book Free Demo Class', href: '/demo-booking', icon: BookOpen },
    { title: 'Download Brochure', href: '#', icon: Target },
    { title: 'Check Results', href: '/success-stories', icon: Award },
    { title: 'Meet Our Faculty', href: '/faculty', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 xs:py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-3xl xs:text-4xl sm:text-5xl font-bold mb-4 xs:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Get In Touch With Us
            </motion.h1>
            <motion.p
              className="text-base xs:text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-6 xs:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to start your NEET journey? Contact us for admission guidance, course
              information, or any queries about our biology coaching programs.
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
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Campus Visit
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 xs:py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
          <div className="text-center mb-10 xs:mb-12 sm:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3 xs:mb-4">
              Contact Information
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-gray-600">
              Multiple ways to reach us for your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8 mb-10 xs:mb-12 sm:mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl xs:rounded-3xl shadow-lg p-5 xs:p-6 sm:p-8 text-center hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4 xs:mb-5 sm:mb-6`}
                >
                  <info.icon className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg xs:text-xl font-bold text-gray-900 mb-3 xs:mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl xs:rounded-3xl shadow-lg p-5 xs:p-6 sm:p-8">
            <h3 className="text-xl xs:text-2xl font-bold text-gray-900 mb-4 xs:mb-5 sm:mb-6 text-center">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <motion.div
                    className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <link.icon className="w-6 h-6 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-900 group-hover:text-blue-600">
                      {link.title}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-600" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 xs:py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 xs:px-6 lg:px-8">
          <div className="text-center mb-10 xs:mb-12 sm:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3 xs:mb-4">
              Send Us a Message
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-gray-600">
              We'll get back to you within 24 hours
            </p>
          </div>

          <motion.div
            className="bg-gray-50 rounded-2xl xs:rounded-3xl shadow-lg p-5 xs:p-6 sm:p-8"
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
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We'll respond within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Enquiry Type
                    </label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="admission">Admission Information</option>
                      <option value="courses">Course Details</option>
                      <option value="fees">Fee Structure</option>
                      <option value="demo">Demo Class</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your requirements, questions, or how we can help you..."
                  />
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 xs:py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
          <div className="text-center mb-10 xs:mb-12 sm:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3 xs:mb-4">
              Find Us On Map
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-gray-600">
              Conveniently located near metro stations
            </p>
          </div>

          <div className="bg-white rounded-2xl xs:rounded-3xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-5 xs:p-6 sm:p-8">
                <h3 className="text-xl xs:text-2xl font-bold text-gray-900 mb-4 xs:mb-5 sm:mb-6">
                  Visit Our Campus
                </h3>

                <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                  <div className="flex items-start">
                    <Building className="w-5 xs:w-6 h-5 xs:h-6 text-blue-600 mr-3 xs:mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm xs:text-base">
                        Main Campus
                      </h4>
                      <p className="text-gray-600 text-sm xs:text-base">
                        A-2/45, Sector 16, Noida, UP 201301
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Navigation className="w-5 xs:w-6 h-5 xs:h-6 text-green-600 mr-3 xs:mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm xs:text-base">
                        Nearest Metro
                      </h4>
                      <p className="text-gray-600 text-sm xs:text-base">
                        City Centre Metro Station (500m walk)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 xs:w-6 h-5 xs:h-6 text-purple-600 mr-3 xs:mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm xs:text-base">
                        Campus Hours
                      </h4>
                      <p className="text-gray-600 text-sm xs:text-base">
                        Mon-Sat: 8 AM - 8 PM | Sun: 10 AM - 6 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 xs:mt-7 sm:mt-8">
                  <Button variant="primary" size="lg" className="w-full min-h-11 sm:min-h-12">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Campus Visit
                  </Button>
                </div>
              </div>

              <div className="bg-gray-100 h-64 xs:h-80 sm:h-96 lg:h-full flex items-center justify-center p-4">
                <div className="text-center">
                  <MapPin className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 text-gray-400 mx-auto mb-3 xs:mb-4" />
                  <p className="text-gray-600 text-sm xs:text-base">Interactive Map Coming Soon</p>
                  <p className="text-xs xs:text-sm text-gray-500 mt-2">
                    A-2/45, Sector 16, Noida, UP 201301
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 xs:py-16 sm:py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 xs:px-6 text-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-4 xs:mb-5 sm:mb-6">
            Ready to Start Your NEET Journey?
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-green-100 mb-6 xs:mb-7 sm:mb-8">
            Join thousands of successful students and achieve your medical dreams with expert
            guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center">
            <Link href="/courses">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-green-600 w-full sm:w-auto min-h-11 sm:min-h-12"
              >
                Explore Courses
              </Button>
            </Link>
            <Button
              variant="primary"
              size="xl"
              className="bg-white text-green-600 hover:bg-gray-100 w-full sm:w-auto min-h-11 sm:min-h-12"
              onClick={() => (window.location.href = 'tel:+919193119462')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call +91 91931 19462
            </Button>
          </div>

          <div className="mt-8 xs:mt-10 sm:mt-12 grid grid-cols-3 gap-4 xs:gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl xs:text-3xl font-bold mb-1 xs:mb-2">Free</div>
              <div className="text-green-100 text-xs xs:text-sm sm:text-base">Consultation</div>
            </div>
            <div>
              <div className="text-2xl xs:text-3xl font-bold mb-1 xs:mb-2">24/7</div>
              <div className="text-green-100 text-xs xs:text-sm sm:text-base">Support</div>
            </div>
            <div>
              <div className="text-2xl xs:text-3xl font-bold mb-1 xs:mb-2">94%</div>
              <div className="text-green-100 text-xs xs:text-sm sm:text-base">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
