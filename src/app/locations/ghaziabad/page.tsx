'use client'

import { useEffect } from 'react'
import {
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  Star,
  Users,
  Trophy,
  CheckCircle2,
  Train,
  Monitor,
  Building2,
  Play,
  BookOpen,
  Award,
  TrendingUp,
  ExternalLink,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { trackPhoneCallConversion } from '@/lib/analytics/googleAdsConversions'
import { MobilePhoneStickyBar } from '@/components/common/MobilePhoneStickyBar'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { ExploreCourses } from '@/components/seo/InternalCrossLinks'
import Link from 'next/link'

export default function GhaziabadLocationPage() {
  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'location-page',
      variantId: 'ghaziabad',
      pageType: 'location',
    })
  }, [])

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(CONTACT_INFO.phone.primary)
    window.open(`tel:${CONTACT_INFO.phone.primary}`, '_self')
  }

  const handleWhatsApp = async () => {
    await trackAndOpenWhatsApp({
      source: 'ghaziabad-location-page',
      message: 'Hi! I am from Ghaziabad and interested in NEET Biology coaching.',
      campaign: 'location-ghaziabad',
    })
  }

  const nearbyAreas = [
    'Indirapuram',
    'Vaishali',
    'Raj Nagar Extension',
    'Vasundhara',
    'Loni',
    'Sahibabad',
    'Mohan Nagar',
    'Kaushambi',
    'Crossing Republik',
    'Raj Nagar',
    'Govindpuram',
    'Shalimar Garden',
    'Pratap Vihar',
    'Nandgram',
    'Dundahera',
    'Wave City',
  ]

  const nearestCenters = [
    {
      name: 'Rohini Center (DC Chowk)',
      distance: '~30 min via Blue Line Metro from Vaishali',
      href: '/locations/rohini',
    },
    {
      name: 'Noida Center (Sector 62)',
      distance: '~20 min from Indirapuram',
      href: '/locations/noida',
    },
  ]

  const faqs = [
    {
      q: 'Is there a Cerebrum Biology Academy center in Ghaziabad?',
      a: 'Cerebrum Biology Academy offers online and hybrid NEET Biology classes for Ghaziabad students. Our nearest physical centers are in Rohini (DC Chowk, ~30 min from Vaishali) and Noida (Sector 62, ~20 min from Indirapuram). Book a free demo class to experience our teaching!',
    },
    {
      q: 'How can Ghaziabad students attend classes at Cerebrum Academy?',
      a: 'Ghaziabad students have three options: (1) Online live classes from home, (2) Visit our Noida center at B-45, Sector 62 (closest for Indirapuram/Vaishali), (3) Visit our Rohini center at DC Chowk (accessible via Blue Line from Vaishali Metro). All options include full access to study material and doubt sessions.',
    },
    {
      q: 'What metro route should I take from Ghaziabad to Cerebrum Academy?',
      a: 'From Vaishali: Take Blue Line to Rohini West (for Rohini center) or to Sector 62 (for Noida center). From Indirapuram: Reach Noida Sector 62 in ~20 minutes by road. From Mohan Nagar: Red Line connects to Rohini West directly.',
    },
    {
      q: 'What are the batch timings for Ghaziabad students?',
      a: 'We offer flexible batch timings: Morning (7:00-9:00 AM), Afternoon (2:00-4:00 PM), and Evening (5:00-7:00 PM). Online students can also access recorded sessions. Weekend batches are available for students who prefer in-person classes.',
    },
    {
      q: 'How many students from Ghaziabad have cleared NEET through Cerebrum?',
      a: 'Over 50 students from Ghaziabad (Indirapuram, Vaishali, Raj Nagar) have successfully cleared NEET through our coaching, with several securing admissions in top medical colleges including AIIMS and government medical colleges.',
    },
    {
      q: 'Do you offer online NEET coaching for Ghaziabad?',
      a: 'Yes! We offer comprehensive online NEET Biology coaching with live interactive classes, recorded sessions, weekly tests, personalized doubt clearing via WhatsApp, and access to our MCQ practice platform with 19,000+ questions.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { label: 'Centers', href: '/locations' },
          { label: 'Ghaziabad', isCurrentPage: true },
        ]}
        variant="minimal"
        className="max-w-7xl mx-auto px-4 pt-3"
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 animate-fadeInUp">
              <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/40 rounded-full px-4 py-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">
                  Ghaziabad (Online + Hybrid)
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                NEET Biology Coaching in <span className="text-yellow-400">Ghaziabad</span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed">
                Top-rated NEET Biology coaching for Ghaziabad students. AIIMS faculty, small batches,
                98% success rate. Online classes + in-person options at our nearby Rohini and Noida
                centers.
              </p>

              {/* Info Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Monitor className="w-5 h-5 text-yellow-400 mt-1" />
                    <div>
                      <p className="font-medium">Online Live Classes + Hybrid Options</p>
                      <p className="text-gray-300">
                        Nearest centers: Rohini (DC Chowk) & Noida (Sector 62)
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
                <Link
                  href="/demo-booking"
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-xl font-medium transition-colors"
                >
                  <Play className="w-5 h-5" />
                  <span>Book Free Demo</span>
                </Link>

                <a
                  href={`tel:${CONTACT_INFO.phone.primary}`}
                  onClick={handleCallNow}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-slate-900 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </a>

                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Right - Nearest Centers Card */}
            <div className="space-y-6 animate-fadeInUp">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-yellow-400" />
                  Nearest Centers for Ghaziabad Students
                </h2>
                {nearestCenters.map((center) => (
                  <Link
                    key={center.href}
                    href={center.href}
                    className="block bg-white/5 rounded-xl p-4 mb-3 hover:bg-white/10 transition-colors"
                  >
                    <p className="font-semibold text-white">{center.name}</p>
                    <p className="text-gray-300 text-sm">{center.distance}</p>
                    <span className="text-yellow-400 text-sm flex items-center gap-1 mt-1">
                      View center details <ExternalLink className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-gray-300">Success Rate</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">50+</p>
                  <p className="text-sm text-gray-300">Ghaziabad Students</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <Star className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">4.9/5</p>
                  <p className="text-sm text-gray-300">Google Rating</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <Award className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">AIIMS</p>
                  <p className="text-sm text-gray-300">Expert Faculty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How to Join from Ghaziabad */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            How to Join from Ghaziabad
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Monitor className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Online Live Classes</h3>
              <p className="text-gray-600">
                Attend live interactive classes from home. Full access to study material, recorded
                sessions, and WhatsApp doubt clearing. Best for students who prefer studying from
                home.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Train className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Noida Center (~20 min)</h3>
              <p className="text-gray-600">
                Our <strong>Noida center at B-45, Sector 62</strong> is the closest option for
                Indirapuram and Vaishali students. Reach via NH-24 or Sector 62 Metro (Blue Line).
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Rohini Center (~30 min)</h3>
              <p className="text-gray-600">
                Our <strong>Rohini center at DC Chowk</strong> is accessible via Blue Line Metro
                from Vaishali. Direct metro connectivity makes commuting convenient.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Cerebrum */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Why Ghaziabad Students Choose Cerebrum
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Award,
                title: 'AIIMS Faculty',
                desc: 'Learn from doctors who scored 680+ in NEET and studied at AIIMS Delhi',
              },
              {
                icon: Users,
                title: 'Small Batches (10-15 Students)',
                desc: 'Personal attention unlike 100+ student batches at other coaching centers',
              },
              {
                icon: Trophy,
                title: '98% Success Rate',
                desc: '500+ medical college selections including AIIMS, MAMC, LHMC',
              },
              {
                icon: BookOpen,
                title: 'Comprehensive Study Material',
                desc: 'NCERT-focused notes, 19,000+ MCQs, weekly mock tests, and PYQ analysis',
              },
              {
                icon: Monitor,
                title: 'Flexible Learning Modes',
                desc: 'Online live classes, recorded sessions, hybrid options — study your way',
              },
              {
                icon: TrendingUp,
                title: 'Performance Tracking',
                desc: 'AI-powered analytics to track your progress and identify weak areas',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Areas We Serve in Ghaziabad */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Areas We Serve in Ghaziabad
          </h2>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {nearbyAreas.map((area) => (
              <span
                key={area}
                className="bg-white text-gray-700 px-4 py-2 rounded-full border border-gray-200 text-sm hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Cross-Location Links */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Other Centers in Delhi NCR
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: 'South Extension (Flagship)', href: '/locations/south-extension' },
              { name: 'Rohini (DC Chowk)', href: '/locations/rohini' },
              { name: 'Gurugram (Sector 51)', href: '/locations/gurugram' },
              { name: 'Faridabad (Sector 17)', href: '/locations/faridabad' },
              { name: 'Noida (Sector 62)', href: '/locations/noida' },
              { name: 'Delhi (All Areas)', href: '/locations/delhi' },
            ].map((center) => (
              <Link
                key={center.href}
                href={center.href}
                className="bg-gray-50 rounded-xl p-4 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-colors group"
              >
                <p className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {center.name}
                </p>
                <span className="text-sm text-gray-500 group-hover:text-blue-500">
                  View details →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions — Ghaziabad
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
              >
                <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex justify-between items-center hover:bg-gray-50">
                  <span>{faq.q}</span>
                  <span className="text-blue-600 ml-2 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-4 text-gray-600">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your NEET Journey?</h2>
          <p className="text-lg opacity-90 mb-8">
            Book a FREE demo class and experience teaching by AIIMS faculty!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo-booking"
              className="inline-flex items-center justify-center space-x-2 px-8 py-3 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-400 transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>Book Free Demo Class</span>
            </Link>

            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              onClick={handleCallNow}
              className="inline-flex items-center justify-center space-x-2 px-8 py-3 bg-white text-purple-700 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Call: +91 88264 44334</span>
            </a>
          </div>
        </div>
      </div>

      {/* Explore Courses */}
      <div className="py-8">
        <ExploreCourses />
      </div>

      <MobilePhoneStickyBar />
    </div>
  )
}
