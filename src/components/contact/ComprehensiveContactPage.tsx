'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  CreditCardIcon,
  ComputerDesktopIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  StarIcon,
  ArrowTopRightOnSquareIcon,
  VideoCameraIcon,
  GlobeAltIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import {
  PhoneIcon as PhoneSolid,
  MapPinIcon as MapPinSolid,
  ClockIcon as ClockSolid,
  ChatBubbleLeftRightIcon as ChatSolid,
  HeartIcon as HeartSolid,
  CheckCircleIcon as CheckCircleSolid,
} from '@heroicons/react/24/solid'
import { PremiumCard, PremiumButton } from '@/components/ui/PremiumDesignSystem'
import { getPlaceholderAvatar } from '@/lib/images/imageUtils'

interface ComprehensiveContactPageProps {
  onCallCenter?: (centerPhone: string) => void
  onWhatsAppContact?: (message: string) => void
  onEmailInquiry?: (data: any) => void
  onBookVisit?: (centerId: string) => void
  onBookCounseling?: () => void
}

interface Center {
  id: string
  name: string
  address: string
  landmark: string
  phone: string
  email: string
  timings: string
  centerHead: string
  headImage: string
  specialNote: string
  coordinates: { lat: number; lng: number }
  features: string[]
  mapEmbedUrl: string
  virtualTourUrl: string
}

interface SupportOption {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  services: string[]
  responseTime: string
  availability: string
}

interface QuickInquiry {
  name: string
  phone: string
  email: string
  center: string
  supportType: string
  message: string
}

export function ComprehensiveContactPage({
  onCallCenter,
  onWhatsAppContact,
  onEmailInquiry,
  onBookVisit,
  onBookCounseling,
}: ComprehensiveContactPageProps) {
  const [selectedCenter, setSelectedCenter] = useState<string>('south-delhi')
  const [selectedSupport, setSelectedSupport] = useState<string>('academic')
  const [showChatWidget, setShowChatWidget] = useState(false)
  const [inquiryForm, setInquiryForm] = useState<QuickInquiry>({
    name: '',
    phone: '',
    email: '',
    center: 'south-delhi',
    supportType: 'academic',
    message: '',
  })

  const centers: Center[] = [
    {
      id: 'south-delhi',
      name: 'South Delhi Center',
      address: 'A-47, First Floor, Lajpat Nagar-II, New Delhi - 110024',
      landmark: 'Near Central Market, Lajpat Nagar',
      phone: '+91 88264 44334',
      email: 'southdelhi@cerebrumbiologyacademy.com',
      timings: '7:00 AM - 9:00 PM (Mon-Sun)',
      centerHead: 'Dr. Priya Sharma',
      headImage: getPlaceholderAvatar('Dr. Priya Sharma', 100, '059669', 'fff'),
      specialNote: 'Main Campus - Premium facilities with 24/7 security',
      coordinates: { lat: 28.5661, lng: 77.2431 },
      features: ['Smart Classrooms', 'Library', 'Hostel Facility', 'Cafeteria', 'Lab'],
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8',
      virtualTourUrl: '/virtual-tour/south-delhi',
    },
    {
      id: 'rohini',
      name: 'Rohini Center',
      address: 'B-22, Sector-18, Rohini, New Delhi - 110089',
      landmark: 'Opposite Metro Station Gate 2',
      phone: '+91 88264 44335',
      email: 'rohini@cerebrumbiologyacademy.com',
      timings: '7:00 AM - 9:00 PM (Mon-Sun)',
      centerHead: 'Dr. Raj Kumar',
      headImage: getPlaceholderAvatar('Dr. Raj Kumar', 100, '1E40AF', 'fff'),
      specialNote: 'Just 500m from JPT Academy - Easy comparison visits',
      coordinates: { lat: 28.7041, lng: 77.1025 },
      features: ['AC Classrooms', 'Parking', 'Metro Connectivity', 'Food Court'],
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.2',
      virtualTourUrl: '/virtual-tour/rohini',
    },
    {
      id: 'gurugram',
      name: 'Gurugram Center',
      address: 'UG-15, DLF City Centre Mall, Sector-29, Gurugram - 122001',
      landmark: 'DLF Cyber City Metro Station',
      phone: '+91 88264 44336',
      email: 'gurugram@cerebrumbiologyacademy.com',
      timings: '7:00 AM - 9:00 PM (Mon-Sun)',
      centerHead: 'Dr. Anjali Singh',
      headImage: getPlaceholderAvatar('Dr. Anjali Singh', 100, '7C3AED', 'fff'),
      specialNote: 'Easy access from Cyber City - Perfect for working parents',
      coordinates: { lat: 28.4595, lng: 77.0266 },
      features: ['Mall Location', 'Valet Parking', 'Food Court', 'Shopping'],
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.1',
      virtualTourUrl: '/virtual-tour/gurugram',
    },
  ]

  const supportOptions: SupportOption[] = [
    {
      id: 'academic',
      title: 'Academic Support',
      description: 'Get help with studies, doubts, and academic performance',
      icon: AcademicCapIcon,
      gradient: 'from-blue-500 to-purple-500',
      services: [
        'Doubt clearing sessions',
        'Extra class requests',
        'Study material queries',
        'Performance discussions',
        'Syllabus guidance',
        'Exam preparation tips',
      ],
      responseTime: 'Within 2 hours',
      availability: '24/7 (WhatsApp), 7 AM - 9 PM (Call)',
    },
    {
      id: 'admission',
      title: 'Admission Support',
      description: 'Complete guidance for enrollment and course selection',
      icon: UserIcon,
      gradient: 'from-green-500 to-teal-500',
      services: [
        'Course selection help',
        'Fee structure queries',
        'Scholarship applications',
        'Document requirements',
        'Admission process',
        'Batch scheduling',
      ],
      responseTime: 'Within 1 hour',
      availability: '7 AM - 9 PM (All channels)',
    },
    {
      id: 'technical',
      title: 'Technical Support',
      description: 'Resolve app, website, and technical issues quickly',
      icon: ComputerDesktopIcon,
      gradient: 'from-orange-500 to-red-500',
      services: [
        'App troubleshooting',
        'Online class problems',
        'Payment issues',
        'Account access',
        'Login problems',
        'System requirements',
      ],
      responseTime: 'Within 30 minutes',
      availability: '24/7 (Critical issues)',
    },
    {
      id: 'counseling',
      title: 'Counseling Support',
      description: 'Mental health, career guidance, and personal support',
      icon: HeartIcon,
      gradient: 'from-pink-500 to-purple-500',
      services: [
        'Career counseling',
        'Parent-teacher meetings',
        'Stress management',
        'Study motivation',
        'Goal setting',
        'Performance anxiety',
      ],
      responseTime: 'Same day',
      availability: 'By appointment (7 AM - 7 PM)',
    },
  ]

  useEffect(() => {
    // Show chat widget after 5 seconds
    const timer = setTimeout(() => {
      setShowChatWidget(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleQuickCall = (centerPhone: string) => {
    onCallCenter?.(centerPhone)
    window.open(`tel:${centerPhone}`, '_self')
  }

  const handleWhatsApp = (message: string) => {
    onWhatsAppContact?.(message)
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/918826444334?text=${encodedMessage}`, '_blank')
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEmailInquiry?.(inquiryForm)
    alert('Your inquiry has been submitted successfully! We will respond within 2 hours.')
    setInquiryForm({
      name: '',
      phone: '',
      email: '',
      center: 'south-delhi',
      supportType: 'academic',
      message: '',
    })
  }

  const handleDirections = (center: Center) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(center.address)}`
    window.open(mapsUrl, '_blank')
  }

  const getWhatsAppMessage = (supportType: string, centerName: string) => {
    const messages = {
      academic: `Hi! I need academic support for NEET Biology preparation. I'm interested in ${centerName}. Please help me with study guidance.`,
      admission: `Hi! I want to know about admission process and course details for ${centerName}. Please share fee structure and available batches.`,
      technical: `Hi! I'm facing technical issues with the app/website. Please help me resolve this problem.`,
      counseling: `Hi! I would like to book a counseling session at ${centerName}. Please help me with appointment scheduling.`,
    }
    return (
      messages[supportType as keyof typeof messages] ||
      'Hi! I need help with Cerebrum Biology Academy services.'
    )
  }

  const selectedCenterData = centers.find((c) => c.id === selectedCenter) || centers[0]
  const selectedSupportData =
    supportOptions.find((s) => s.id === selectedSupport) || supportOptions[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">We're Here to Help You Succeed</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              24/7 Support • Multiple Centers • Expert Guidance • Instant Response
            </p>

            {/* Quick Contact Bar */}
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
              <PremiumButton
                onClick={() => handleQuickCall(selectedCenterData.phone)}
                variant="luxury"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <PhoneSolid className="w-5 h-5 mr-3" />
                Call Now: {selectedCenterData.phone}
              </PremiumButton>

              <PremiumButton
                onClick={() =>
                  handleWhatsApp('Hi! I need help with NEET Biology preparation. Please guide me.')
                }
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <ChatSolid className="w-5 h-5 mr-3" />
                WhatsApp Support
              </PremiumButton>

              <PremiumButton
                onClick={onBookCounseling}
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <CalendarDaysIcon className="w-5 h-5 mr-3" />
                Book Counseling
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Center Locations Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Center Locations</h2>
            <p className="text-xl text-gray-600">
              Visit any of our conveniently located centers across Delhi NCR
            </p>
          </div>

          {/* Center Selection Tabs */}
          <div className="flex flex-col lg:flex-row justify-center space-y-2 lg:space-y-0 lg:space-x-4 mb-8">
            {centers.map((center) => (
              <button
                key={center.id}
                onClick={() => setSelectedCenter(center.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCenter === center.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {center.name}
              </button>
            ))}
          </div>

          {/* Selected Center Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCenter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Center Information */}
                <PremiumCard variant="luxury" size="lg">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <MapPinSolid className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {selectedCenterData.name}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {selectedCenterData.specialNote}
                        </p>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <MapPinIcon className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <div className="font-medium text-gray-900">Address</div>
                            <div className="text-gray-600 text-sm">
                              {selectedCenterData.address}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {selectedCenterData.landmark}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <PhoneIcon className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="font-medium text-gray-900">Phone</div>
                            <div className="text-blue-600 text-sm">{selectedCenterData.phone}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <ClockIcon className="w-5 h-5 text-gray-500 mt-1" />
                          <div>
                            <div className="font-medium text-gray-900">Timings</div>
                            <div className="text-gray-600 text-sm">
                              {selectedCenterData.timings}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <UserIcon className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="font-medium text-gray-900">Center Head</div>
                            <div className="text-gray-600 text-sm">
                              {selectedCenterData.centerHead}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <div className="font-medium text-gray-900 mb-2">Facilities</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCenterData.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <PremiumButton
                        onClick={() => handleQuickCall(selectedCenterData.phone)}
                        variant="primary"
                        size="sm"
                      >
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        Call
                      </PremiumButton>

                      <PremiumButton
                        onClick={() => handleDirections(selectedCenterData)}
                        variant="secondary"
                        size="sm"
                      >
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
                        Directions
                      </PremiumButton>

                      <PremiumButton
                        onClick={() => onBookVisit?.(selectedCenterData.id)}
                        variant="luxury"
                        size="sm"
                      >
                        <CalendarDaysIcon className="w-4 h-4 mr-2" />
                        Visit
                      </PremiumButton>

                      <PremiumButton
                        onClick={() => window.open(selectedCenterData.virtualTourUrl, '_blank')}
                        variant="secondary"
                        size="sm"
                      >
                        <VideoCameraIcon className="w-4 h-4 mr-2" />
                        Tour
                      </PremiumButton>
                    </div>
                  </div>
                </PremiumCard>

                {/* Map */}
                <PremiumCard variant="default" className="overflow-hidden">
                  <div className="h-full min-h-[400px] bg-gray-100 rounded-xl overflow-hidden">
                    <iframe
                      src={selectedCenterData.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  </div>
                </PremiumCard>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Support Options Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help You?</h2>
            <p className="text-xl text-gray-600">
              Choose your support type for personalized assistance
            </p>
          </div>

          {/* Support Type Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedSupport(option.id)}
                className="cursor-pointer"
              >
                <PremiumCard
                  variant={selectedSupport === option.id ? 'premium' : 'hover'}
                  className={`text-center h-full transition-all ${
                    selectedSupport === option.id ? 'ring-2 ring-blue-500 shadow-xl' : ''
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${option.gradient} flex items-center justify-center mx-auto mb-4`}
                  >
                    <option.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-center space-x-2">
                      <ClockSolid className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 font-medium">{option.responseTime}</span>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>

          {/* Selected Support Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSupport}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <PremiumCard variant="luxury" size="lg">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Support Details */}
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${selectedSupportData.gradient} flex items-center justify-center`}
                      >
                        <selectedSupportData.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {selectedSupportData.title}
                        </h3>
                        <p className="text-gray-600">{selectedSupportData.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">What we help with:</h4>
                        <div className="space-y-2">
                          {selectedSupportData.services.map((service, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <CheckCircleSolid className="w-4 h-4 text-green-500" />
                              <span className="text-gray-700 text-sm">{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-medium text-gray-900 text-sm">Response Time</div>
                          <div className="text-green-600 font-medium">
                            {selectedSupportData.responseTime}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">Availability</div>
                          <div className="text-blue-600 text-sm">
                            {selectedSupportData.availability}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-6">
                      <PremiumButton
                        onClick={() =>
                          handleWhatsApp(
                            getWhatsAppMessage(selectedSupport, selectedCenterData.name)
                          )
                        }
                        variant="medical"
                        size="md"
                      >
                        <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                        WhatsApp Now
                      </PremiumButton>

                      <PremiumButton
                        onClick={() => handleQuickCall(selectedCenterData.phone)}
                        variant="secondary"
                        size="md"
                      >
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        Call Center
                      </PremiumButton>
                    </div>
                  </div>

                  {/* Quick Inquiry Form */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Inquiry Form</h4>
                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name *"
                          value={inquiryForm.name}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number *"
                          value={inquiryForm.phone}
                          onChange={(e) =>
                            setInquiryForm({ ...inquiryForm, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <input
                        type="email"
                        placeholder="Email Address *"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <select
                          value={inquiryForm.center}
                          onChange={(e) =>
                            setInquiryForm({ ...inquiryForm, center: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {centers.map((center) => (
                            <option key={center.id} value={center.id}>
                              {center.name}
                            </option>
                          ))}
                        </select>

                        <select
                          value={inquiryForm.supportType}
                          onChange={(e) =>
                            setInquiryForm({ ...inquiryForm, supportType: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {supportOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <textarea
                        placeholder="Your Message *"
                        value={inquiryForm.message}
                        onChange={(e) =>
                          setInquiryForm({ ...inquiryForm, message: e.target.value })
                        }
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 via-teal-700 to-blue-800 text-white shadow-lg shadow-green-500/25 px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 hover:scale-102 flex items-center justify-center"
                      >
                        <EnvelopeIcon className="w-5 h-5 mr-3" />
                        Send Inquiry
                      </button>
                    </form>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Response Time Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <PremiumCard
            variant="premium"
            className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Response Time Commitment
              </h2>
              <p className="text-gray-600">
                We value your time and ensure quick, quality responses
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  type: 'WhatsApp',
                  time: 'Within 5 minutes',
                  icon: ChatSolid,
                  color: 'text-green-600',
                },
                { type: 'Phone Call', time: 'Immediate', icon: PhoneSolid, color: 'text-blue-600' },
                {
                  type: 'Email',
                  time: 'Within 2 hours',
                  icon: EnvelopeIcon,
                  color: 'text-purple-600',
                },
                {
                  type: 'Center Visit',
                  time: 'No appointment needed',
                  icon: MapPinSolid,
                  color: 'text-orange-600',
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h3 className="font-bold text-gray-900">{item.type}</h3>
                  <p className="text-gray-600 text-sm">{item.time}</p>
                </div>
              ))}
            </div>
          </PremiumCard>
        </motion.div>

        {/* Emergency Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PremiumCard variant="default" className="bg-red-50 border-red-200">
            <div className="text-center mb-6">
              <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Support</h2>
              <p className="text-gray-600">24/7 help for urgent situations</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <HeartSolid className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Mental Health Helpline</h3>
                <p className="text-red-600 font-medium">+91 88264 44340</p>
                <p className="text-gray-600 text-sm">24/7 counseling support</p>
              </div>

              <div className="text-center">
                <ExclamationTriangleIcon className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Medical Emergency</h3>
                <p className="text-orange-600 font-medium">+91 88264 44341</p>
                <p className="text-gray-600 text-sm">Medical assistance & contacts</p>
              </div>

              <div className="text-center">
                <PhoneSolid className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Parent Concern Hotline</h3>
                <p className="text-blue-600 font-medium">+91 88264 44342</p>
                <p className="text-gray-600 text-sm">Dedicated parent support</p>
              </div>
            </div>
          </PremiumCard>
        </motion.div>
      </div>

      {/* Live Chat Widget */}
      <AnimatePresence>
        {showChatWidget && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0, x: 20, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <ChatSolid className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Need Help?</div>
                  <div className="text-xs text-gray-500">We're online now</div>
                </div>
                <button
                  onClick={() => setShowChatWidget(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                Hi! How can we help you with your NEET preparation today?
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => handleWhatsApp('Hi! I have questions about NEET Biology courses.')}
                  className="w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 rounded-lg text-sm text-green-800 transition-colors"
                >
                  💬 Chat on WhatsApp
                </button>
                <button
                  onClick={() => handleQuickCall(selectedCenterData.phone)}
                  className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-blue-800 transition-colors"
                >
                  📞 Call us now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
