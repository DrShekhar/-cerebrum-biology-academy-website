'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { showToast } from '@/lib/toast'
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
import Link from 'next/link'
import { FAQDisplay } from '@/components/seo/FAQSchema'

const contactFAQs = [
  {
    question: 'How can I book a free demo class at Cerebrum Academy?',
    answer:
      'You can book a free demo class by calling us at +91 88264 44334, sending a WhatsApp message, or filling out the contact form on this page. Our counselors will schedule a convenient time based on your preferred batch and location.',
  },
  {
    question: 'What are the center locations for Cerebrum Biology Academy?',
    answer:
      'We have centers in South Delhi (Greater Kailash II), Rohini, and Gurugram. All centers have experienced AIIMS faculty and follow the same curriculum. We also offer online classes for students across India.',
  },
  {
    question: 'What are the office hours for contacting Cerebrum Academy?',
    answer:
      'Our office is open Monday to Saturday from 9:00 AM to 8:00 PM. You can also reach us on WhatsApp 24/7 for queries. Sunday classes are conducted, but administrative offices remain closed.',
  },
  {
    question: 'How long does it take to get a response after submitting the contact form?',
    answer:
      'We typically respond within 2-4 hours during office hours. For urgent queries, we recommend calling us directly at +91 88264 44334 or sending a WhatsApp message for immediate assistance.',
  },
  {
    question: 'Can I visit the center before enrolling?',
    answer:
      'Absolutely! We encourage parents and students to visit our centers before enrollment. You can attend a demo class, meet our faculty, and see our facilities. Schedule a visit by calling us or filling out the contact form.',
  },
  {
    question: 'Is there a counseling session available before enrollment?',
    answer:
      'Yes, we offer free one-on-one counseling sessions with our academic counselors. They will assess your current preparation level, discuss suitable course options, and create a personalized study plan recommendation.',
  },
]

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

    try {
      const response = await fetch('/api/contact/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          supportType: formData.enquiryType,
          center: 'noida',
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitted(true)
        showToast.success('Message sent successfully! We will contact you within 24 hours.')

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
      } else {
        showToast.error(result.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      showToast.error('Unable to send message. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
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
      details: ['Block D, South Extension 2', 'New Delhi 110049'],
      color: 'bg-[#3d4d3d]',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 93119 46297', '+91 88264 44334 (Admissions)'],
      color: 'bg-[#4a5d4a]',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@cerebrum.academy', 'admissions@cerebrum.academy'],
      color: 'bg-[#5a6d5a]',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Saturday: 8:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
      color: 'bg-[#3d4d3d]',
    },
  ]

  const quickLinks = [
    { title: 'Book Free Demo Class', href: '/demo-booking', icon: BookOpen },
    {
      title: 'Download Brochure',
      href: '/brochure/cerebrum-biology-academy-brochure.pdf',
      icon: Target,
    },
    { title: 'Check Results', href: '/success-stories', icon: Award },
    { title: 'Meet Our Faculty', href: '/faculty', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#3d4d3d] text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <MessageSquare className="h-5 w-5" />
              <span className="font-semibold">We&apos;re Here to Help</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in-up">
              Get In Touch With Us
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl text-[#e8ede8] max-w-3xl mx-auto mb-6 sm:mb-8 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              Ready to start your NEET journey? Contact us for admission guidance, course
              information, or any queries about our biology coaching programs.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <Link href="/demo-booking">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-[#3d4d3d]"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Campus Visit
                </Button>
              </Link>
              <a href="tel:+918826444334">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-[#3d4d3d] hover:bg-[#e8ede8]"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Contact Information
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Multiple ways to reach us for your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 md:p-8 text-center hover:shadow-xl transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6`}
                >
                  <info.icon className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm sm:text-base break-words">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 text-center">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <div
                    className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-[#e8ede8] transition-colors group cursor-pointer animate-fade-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <link.icon className="w-6 h-6 text-[#3d4d3d] mr-3" />
                    <span className="font-medium text-gray-900 group-hover:text-[#3d4d3d]">
                      {link.title}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-[#3d4d3d]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Send Us a Message
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              We'll get back to you within 24 hours
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 md:p-8 animate-fade-in-up">
            {submitted ? (
              <div className="text-center py-12 animate-scale-in">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We'll respond within 24 hours.
                </p>
              </div>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3d4d3d] focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3d4d3d] focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3d4d3d] focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3d4d3d] focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3d4d3d] focus:border-transparent resize-none"
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
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Find Us On Map
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Conveniently located near metro stations
            </p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-5 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
                  Visit Our Campus
                </h3>

                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-[#e8ede8] rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <Building className="w-5 h-5 text-[#3d4d3d]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                        Main Campus
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Block D, South Extension 2, New Delhi 110049
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-[#e8ede8] rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <Navigation className="w-5 h-5 text-[#4a5d4a]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                        Nearest Metro
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        South Extension Metro Station (5 min walk)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-[#e8ede8] rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#5a6d5a]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                        Campus Hours
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Mon-Sat: 8 AM - 8 PM | Sun: 10 AM - 6 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-7 md:mt-8">
                  <Button variant="primary" size="lg" className="w-full min-h-11 sm:min-h-12 bg-[#3d4d3d] hover:bg-[#4a5d4a]">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Campus Visit
                  </Button>
                </div>
              </div>

              <div className="h-64 sm:h-80 md:h-96 lg:h-full w-full">
                <iframe
                  src="https://maps.google.com/maps?q=McDonald's,+South+Extension+Part+2,+New+Delhi,+India&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cerebrum Biology Academy Location - South Extension 2, New Delhi"
                  className="rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FAQDisplay
            questions={contactFAQs}
            title="Frequently Asked Questions About Contacting Us"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#3d4d3d] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Star className="h-5 w-5" />
            <span className="font-semibold">Start Your Journey Today</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6">
            Ready to Start Your NEET Journey?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#e8ede8] mb-6 sm:mb-7 md:mb-8">
            Join thousands of successful students and achieve your medical dreams with expert
            guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/courses">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-[#3d4d3d] w-full sm:w-auto min-h-11 sm:min-h-12"
              >
                Explore Courses
              </Button>
            </Link>
            <Button
              variant="primary"
              size="xl"
              className="bg-white text-[#3d4d3d] hover:bg-[#e8ede8] w-full sm:w-auto min-h-11 sm:min-h-12"
              onClick={() => (window.location.href = 'tel:+918826444334')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call +91 88264 44334
            </Button>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Free</div>
              <div className="text-[#e8ede8] text-xs sm:text-sm md:text-base">Consultation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">24/7</div>
              <div className="text-[#e8ede8] text-xs sm:text-sm md:text-base">Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">94%</div>
              <div className="text-[#e8ede8] text-xs sm:text-sm md:text-base">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
