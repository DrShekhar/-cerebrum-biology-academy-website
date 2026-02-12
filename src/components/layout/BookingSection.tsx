'use client'

import { BookingForm } from '@/components/forms/BookingForm'
import { ContactForm } from '@/types'
import { Phone, Calendar, MessageSquare, MapPin, Clock, Shield, Award, Users } from 'lucide-react'
import { useI18n } from '@/contexts/I18nContext'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'

export function BookingSection() {
  const { t } = useI18n()
  const handleFormSubmit = (_data: ContactForm) => {
    // Integration point for backend API
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
      title: 'No Hidden Fees',
      description: 'Transparent pricing with no surprise charges. What you see is what you pay',
    },
    {
      icon: Award,
      title: 'Expert Faculty',
      description: 'Learn from AIIMS alumni and experienced NEET Biology experts',
    },
    {
      icon: Users,
      title: '98% Success Rate',
      description: 'Join thousands of students who cracked NEET with our proven methods',
    },
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our counselors',
      action: getPhoneLink(),
      actionText: getDisplayPhone(),
      available: 'Mon-Sat: 9 AM - 8 PM',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      description: 'Quick questions and instant support',
      action: 'whatsapp',
      actionText: 'Chat on WhatsApp',
      available: '24/7 Support',
      isWhatsApp: true,
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Meet our team at our academy',
      action: 'https://maps.google.com',
      actionText: 'Get Directions',
      available: 'Delhi NCR Location',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            {t('getStartedToday')}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('readyToBeginJourney')}
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{t('takeFirstStep')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Booking Form */}
          <div>
            <BookingForm type="demo" onSubmit={handleFormSubmit} />
          </div>

          {/* Right Column - Features and Contact */}
          <div className="space-y-8">
            {/* Why Choose Us */}
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('whyChooseCerebrum')}</h3>

              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-in-up"
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Methods */}
            <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('otherWaysToReach')}</h3>

              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const handleClick = method.isWhatsApp
                    ? async (e: React.MouseEvent) => {
                        e.preventDefault()
                        await trackAndOpenWhatsApp({
                          source: 'booking-section',
                          message: WHATSAPP_MESSAGES.enquiry,
                          campaign: 'homepage-booking',
                        })
                      }
                    : undefined

                  return (
                    <a
                      key={method.title}
                      href={method.isWhatsApp ? '#' : method.action}
                      onClick={handleClick}
                      className="flex items-center justify-between gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer overflow-hidden animate-fade-in-up"
                      style={{ animationDelay: `${500 + index * 100}ms` }}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors flex-shrink-0">
                          <method.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            {method.title}
                          </h4>
                          <p className="text-gray-600 text-sm truncate">{method.description}</p>
                          <p className="text-gray-500 text-xs">{method.available}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-blue-600 font-medium text-xs sm:text-sm group-hover:underline whitespace-nowrap">
                          {method.actionText}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div
              className="bg-indigo-500 rounded-2xl p-8 text-white animate-fade-in-up"
              style={{ animationDelay: '600ms' }}
            >
              <h3 className="text-xl font-bold mb-4">{t('joinOurSuccess')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">2000+</div>
                  <div className="text-sm text-green-100">{t('studentsEnrolled')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">98%</div>
                  <div className="text-sm text-green-100">{t('successRate')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">67+</div>
                  <div className="text-sm text-green-100">{t('expertFaculty')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">5+</div>
                  <div className="text-sm text-green-100">{t('yearsExperience')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Info */}
        <div
          className="mt-16 text-center bg-white rounded-2xl p-8 shadow-sm animate-fade-in-up"
          style={{ animationDelay: '800ms' }}
        >
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-blue-600 mr-2" />
            <span className="font-semibold text-gray-900">{t('responseTime')}</span>
          </div>
          <p className="text-gray-600">
            We typically respond to inquiries within{' '}
            <span className="font-semibold text-blue-600">2 hours</span> during business hours. For
            immediate assistance, please call us directly at{' '}
            <a href={getPhoneLink()} className="text-blue-600 hover:underline font-semibold">
              {getDisplayPhone()}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
