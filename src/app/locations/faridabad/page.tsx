'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  Star,
  Users,
  Trophy,
  CheckCircle2,
  Navigation,
  Train,
  Car,
  Building2,
  Play,
  Calculator,
  BookOpen,
  FileText,
  Award,
  TrendingUp,
  ExternalLink,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  trackWhatsAppConversion,
  trackPhoneCallConversion,
} from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'

export default function FaridabadLocationPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'faridabad',
      pageType: 'location',
    })
  }, [])

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
    window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')
  }

  const handleWhatsApp = async () => {
    ConversionTracker.trackWhatsAppClick()
    trackWhatsAppConversion('faridabad-location')
    await trackAndOpenWhatsApp({
      source: 'faridabad-location-page',
      message: 'Hi! I am from Faridabad and interested in NEET Biology coaching.',
      campaign: 'location-faridabad',
    })
  }

  const handleGetDirections = () => {
    window.open(CONTACT_INFO.location.faridabad.mapUrl, '_blank')
  }

  const nearbyAreas = [
    'Sector 15',
    'Sector 16',
    'Sector 17',
    'Sector 21',
    'Sector 28',
    'Sector 37',
    'NIT Faridabad',
    'Ballabgarh',
    'Old Faridabad',
    'Badarpur',
    'Surajkund',
    'Badkhal',
    'Crown Plaza',
    'YMCA Chowk',
    'Bata Chowk',
    'Neelam Chowk',
    'Ajronda',
    'Palwal',
    'Mewat',
    'Tughlakabad',
  ]

  const faqs = [
    {
      q: 'Where is Cerebrum Biology Academy located in Faridabad?',
      a: `Our center is located at ${CONTACT_INFO.location.faridabad.streetAddress}, ${CONTACT_INFO.location.faridabad.addressLocality}. We are near Bata Chowk.`,
    },
    {
      q: 'Do you offer offline classes in Faridabad?',
      a: 'Yes, we offer both offline classroom coaching at our Faridabad center and online live classes. Students can choose based on their preference.',
    },
    {
      q: 'What is the batch size at your Faridabad center?',
      a: 'We maintain small batches of maximum 15 students to ensure personalized attention for every NEET aspirant.',
    },
    {
      q: 'Can students from Ballabgarh join your Faridabad center?',
      a: 'Absolutely! We have many students from Ballabgarh, Palwal, and surrounding areas. Our center is centrally located and easily accessible.',
    },
    {
      q: 'What are the class timings at the Faridabad center?',
      a: `We operate ${CONTACT_INFO.hours.displayText}. We offer morning and evening batches to accommodate school schedules.`,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Map */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Location Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-4 py-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 text-sm font-medium">Faridabad Center</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                NEET Biology Coaching in <span className="text-yellow-400">Faridabad</span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed">
                Premier NEET Biology coaching by AIIMS faculty in Faridabad. Small batches of 15
                students, personalized attention, 98% success rate. Quality coaching without
                traveling to Delhi!
              </p>

              {/* Address Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
                    <div>
                      <p className="font-medium">{CONTACT_INFO.location.faridabad.streetAddress}</p>
                      <p className="text-gray-300">
                        {CONTACT_INFO.location.faridabad.addressLocality},{' '}
                        {CONTACT_INFO.location.faridabad.addressRegion} -{' '}
                        {CONTACT_INFO.location.faridabad.postalCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <p>{CONTACT_INFO.hours.displayText}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-yellow-400" />
                    <p>{CONTACT_INFO.phone.display.primary}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetDirections}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Get Directions</span>
                </button>

                <button
                  onClick={handleCallNow}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-slate-900 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </motion.div>

            {/* Right - Map Embed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <LazyGoogleMap
                embedUrl={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.5!2d${CONTACT_INFO.location.faridabad.geo.longitude}!3d${CONTACT_INFO.location.faridabad.geo.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDIzJzQxLjMiTiA3N8KwMTgnNDIuMSJF!5e0!3m2!1sen!2sin!4v1234567890`}
                title="Faridabad NEET Coaching Center"
                height={400}
                placeholder={{
                  lat: CONTACT_INFO.location.faridabad.geo.latitude,
                  lng: CONTACT_INFO.location.faridabad.geo.longitude,
                  address: `${CONTACT_INFO.location.faridabad.streetAddress}, ${CONTACT_INFO.location.faridabad.addressLocality}`
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* How to Reach */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            How to Reach Us
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Train className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">By Metro</h3>
              <p className="text-gray-600">
                Nearest metro station: <strong>Bata Chowk</strong> (Violet Line). Our center is 10
                minutes walk from the station. Also accessible from NHPC Chowk Metro.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Car className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">By Car</h3>
              <p className="text-gray-600">
                Located in <strong>Sector 15 Market</strong>, easily accessible from Mathura Road.
                Dedicated parking available for students.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Landmarks</h3>
              <p className="text-gray-600">
                Near <strong>Sector 15 Market</strong> and close to Bata Chowk. Look for our
                signboard at the entrance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Faridabad Center */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Why Choose Our Faridabad Center?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'Small Batches',
                description: 'Maximum 15 students per batch for personalized attention',
              },
              {
                icon: Trophy,
                title: '90% Success Rate',
                description: 'Proven track record of NEET selections from Faridabad',
              },
              {
                icon: Star,
                title: 'AIIMS Faculty',
                description: 'Learn from faculty trained at AIIMS New Delhi',
              },
              {
                icon: MapPin,
                title: 'No Delhi Travel',
                description: 'Quality coaching without the hassle of commuting to Delhi',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Testimonials Section */}
      <div className="py-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Success Stories from <span className="text-yellow-400">Faridabad Students</span>
          </h2>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Hear from our students who achieved their medical dreams with Cerebrum Biology Academy
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Arjun Verma',
                area: 'BPTP Parklands',
                score: '680/720',
                college: 'MAMC Delhi',
                quote: 'Online classes from home were incredibly convenient. Same quality as Delhi coaching!',
              },
              {
                name: 'Nidhi Sharma',
                area: 'Sector 21',
                score: '667/720',
                college: 'UCMS Delhi',
                quote: 'Small batches meant personal attention. Dr. Singh helped me improve Biology by 120 marks!',
              },
              {
                name: 'Kabir Mehta',
                area: 'NIT Faridabad',
                score: '654/720',
                college: 'LHMC Delhi',
                quote: 'No need to travel to Delhi daily. Best NEET coaching right here in Faridabad!',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-slate-900" />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.area}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex justify-between items-center pt-4 border-t border-white/20">
                  <div>
                    <p className="text-yellow-400 font-bold text-lg">{testimonial.score}</p>
                    <p className="text-xs text-gray-400">NEET Score</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold text-sm">{testimonial.college}</p>
                    <p className="text-xs text-gray-400">Admitted</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/testimonials"
              className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium"
            >
              View All Success Stories
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* NEET Tools Widget */}
      <div className="py-12 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            Free NEET Preparation Tools
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Access our free tools to boost your NEET preparation. Available for all Faridabad students!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Calculator,
                title: 'NEET Rank Predictor',
                description: 'Predict your rank based on expected score',
                href: '/neet-rank-predictor',
                color: 'blue',
              },
              {
                icon: TrendingUp,
                title: 'College Predictor',
                description: 'Find colleges based on your rank',
                href: '/neet-college-predictor',
                color: 'green',
              },
              {
                icon: FileText,
                title: 'Previous Year Papers',
                description: '15 years of solved NEET papers',
                href: '/neet-previous-year-papers',
                color: 'purple',
              },
              {
                icon: BookOpen,
                title: 'NCERT Solutions',
                description: 'Chapter-wise NCERT Biology solutions',
                href: '/ncert-solutions',
                color: 'orange',
              },
            ].map((tool, index) => (
              <a
                key={index}
                href={tool.href}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all group"
              >
                <div className={`w-10 h-10 bg-${tool.color}-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <tool.icon className={`w-5 h-5 text-${tool.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{tool.title}</h3>
                <p className="text-xs text-gray-500">{tool.description}</p>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/neet-tools"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <Award className="w-5 h-5 mr-2" />
              Explore All NEET Tools
            </a>
          </div>
        </div>
      </div>

      {/* Areas We Serve */}
      <div className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            Areas We Serve in Faridabad
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Students from all parts of Faridabad and nearby areas join our NEET Biology coaching
            program. We are easily accessible from:
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {nearbyAreas.map((area, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white rounded-full text-gray-700 text-sm font-medium shadow-sm border border-gray-200"
              >
                {area}
              </span>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/neet-coaching-faridabad"
              className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Explore All 30+ Faridabad Areas
            </a>
          </div>
        </div>
      </div>

      {/* Metro Connectivity Section */}
      <div className="py-12 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            Metro Connectivity (Violet Line)
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Our Sector 17 center is just 5 minutes walk from Bata Chowk Metro Station.
            Students from across the Violet Line corridor can easily reach us.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Bata Chowk', time: '5 min walk', highlight: true },
              { name: 'Neelam Chowk Ajronda', time: '8 min' },
              { name: 'Old Faridabad', time: '12 min' },
              { name: 'Badkhal Mor', time: '15 min' },
              { name: 'Sector 28', time: '20 min' },
              { name: 'NHPC Chowk', time: '30 min' },
              { name: 'Mewala Maharajpur', time: '25 min' },
              { name: 'Escorts Mujesar', time: '15 min' },
              { name: 'Badarpur Border', time: '35 min' },
            ].map((metro, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg text-center ${
                  metro.highlight
                    ? 'bg-purple-600 text-white'
                    : 'bg-white border border-purple-200'
                }`}
              >
                <Train className={`w-6 h-6 mx-auto mb-2 ${metro.highlight ? 'text-white' : 'text-purple-600'}`} />
                <p className={`font-medium text-sm ${metro.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {metro.name}
                </p>
                <p className={`text-xs ${metro.highlight ? 'text-purple-100' : 'text-gray-500'}`}>
                  {metro.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions - Faridabad Center
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 ml-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your NEET Journey in Faridabad?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Book a free demo class and experience our teaching methodology
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleCallNow}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-xl font-bold transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Call {CONTACT_INFO.phone.display.primary}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <MobilePhoneStickyBar source="faridabad-location" />
    </div>
  )
}
