'use client'

import { BookingForm } from '@/components/forms/BookingForm'
import { ContactForm } from '@/types'
import { Phone, Calendar, MessageSquare, MapPin, Clock, Shield, Award, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export function BookingSection() {
  const handleFormSubmit = (data: ContactForm) => {
    console.log('Booking form submitted:', data)
    // Here you would integrate with your backend API
    // Example: sendToAPI(data)
  }

  const features = [
    {
      icon: Calendar,
      title: 'Free Demo Class',
      description: 'Experience our teaching methodology with a complimentary biology session',
    },
    {
      icon: Shield,
      title: 'Complete Transparency',
      description: 'Transparent pricing with no surprise charges. What you see is what you pay',
    },
    {
      icon: Award,
      title: 'Expert Faculty',
      description: 'Learn from AIIMS alumni and experienced NEET Biology experts',
    },
    {
      icon: Users,
      title: '94.2% Success Rate',
      description: 'Join 2,847 students who cracked NEET with our proven methods',
    },
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our expert counselors',
      action: 'tel:+918826444334',
      actionText: '+91 88264 44334',
      available: 'Mon-Sat: 9 AM - 8 PM',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Support',
      description: 'Quick questions and instant support',
      action: 'https://wa.me/918826444334',
      actionText: 'Chat with Us',
      available: '24/7 Support',
    },
    {
      icon: MapPin,
      title: 'Visit Our Academy',
      description: 'Meet our team at the academy',
      action: 'https://maps.google.com',
      actionText: 'Get Directions',
      available: 'Delhi NCR Location',
    },
  ]

  return (
    <section className="py-20 bg-navy-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Start Your Journey Today
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Begin Your <span className="text-blue-600">NEET Journey?</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Take the first step towards your medical career with us. Book a free demo class, request
            a callback, or visit our academy to learn more about our proven programs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Booking Form */}
          <div>
            <BookingForm type="demo" onSubmit={handleFormSubmit} />
          </div>

          {/* Right Column - Features and Contact */}
          <div className="space-y-8">
            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Academy?</h3>

              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Other Ways to Reach Us</h3>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.action}
                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <method.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {method.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{method.description}</p>
                        <p className="text-gray-500 text-xs">{method.available}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600 font-medium text-sm group-hover:underline">
                        {method.actionText}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="bg-navy-900 rounded-2xl p-8 text-white"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4">Join Our Success Story</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">2,847+</div>
                  <div className="text-sm opacity-90">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">94.2%</div>
                  <div className="text-sm opacity-90">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">50+</div>
                  <div className="text-sm opacity-90">AIIMS Faculty</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">247</div>
                  <div className="text-sm opacity-90">AIIMS Selections</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Additional Info */}
        <motion.div
          className="mt-16 text-center bg-white rounded-2xl p-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-blue-600 mr-2" />
            <span className="font-semibold text-gray-900">Response Time</span>
          </div>
          <p className="text-gray-600">
            We typically respond to inquiries within{' '}
            <span className="font-semibold text-blue-600">2 hours</span> during business hours. For
            immediate assistance, please call us directly at{' '}
            <a href="tel:+918826444334" className="text-blue-600 hover:underline font-semibold">
              +91 88264 44334
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
