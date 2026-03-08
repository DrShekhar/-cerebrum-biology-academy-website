'use client'

import { CheckCircle, Phone, GraduationCap, MessageCircle, Star } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface BlogLeadCaptureProps {
  articleSlug: string
  articleTitle: string
  chapterName?: string
  category?: string
}

const getContentConfig = (category?: string) => {
  const isOlympiad = category === 'olympiad'

  if (isOlympiad) {
    return {
      badge: '500+ Olympiad Achievers',
      heading: 'Excel at Biology Olympiad',
      subheading: 'Expert coaching from',
      highlight: 'National & International Olympiad medalists',
      benefits: ['USABO/IBO Prep', 'Research Guidance', 'University Applications'],
      buttonText: 'Get Olympiad Guidance',
      whatsappMessage:
        'Hi! I read your article about Biology Olympiad. I want guidance for Olympiad preparation. Please share the details.',
    }
  }

  return {
    badge: '15,000+ Students Trained',
    heading: 'Get Into Your Dream Medical College',
    subheading: 'Expert guidance from',
    highlight: 'AIIMS alumni',
    benefits: ['College Selection', 'Counselling Strategy', 'NRI/Management Quota'],
    buttonText: 'Get Free Counselling',
    whatsappMessage:
      'Hi! I want free counselling for NEET Biology preparation and medical college admission. Please help.',
  }
}

export function BlogLeadCapture({ category }: BlogLeadCaptureProps) {
  const config = getContentConfig(category)
  const isOlympiad = category === 'olympiad'

  return (
    <div className="my-10 relative overflow-hidden rounded-2xl shadow-xl">
      <div className={`absolute inset-0 ${isOlympiad ? 'bg-[#3d4d3d]' : 'bg-indigo-600'}`} />

      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div
        className={`absolute bottom-0 left-0 w-48 h-48 ${isOlympiad ? 'bg-green-400/20' : 'bg-purple-400/20'} rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl`}
      />

      <div className="relative z-10 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-400/90 text-yellow-900 rounded-full text-xs font-bold">
            <Star className="w-3 h-3 fill-yellow-900" />
            {config.badge}
          </div>
        </div>

        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
              {config.heading}
            </h3>
            <p className={`text-sm mt-1 ${isOlympiad ? 'text-green-100' : 'text-blue-100'}`}>
              {config.subheading}{' '}
              <span className="text-yellow-300 font-semibold">{config.highlight}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {config.benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-3 py-2"
            >
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-white text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() =>
              trackAndOpenWhatsApp({
                source: 'blog-lead-capture',
                message: config.whatsappMessage,
                campaign: 'blog-cta',
              })
            }
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 font-bold rounded-xl transition-all shadow-lg min-h-[48px] touch-manipulation ${
              isOlympiad
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            {config.buttonText} via WhatsApp
          </button>

          <a
            href="tel:+918826444334"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 font-bold rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all min-h-[48px] touch-manipulation"
          >
            <Phone className="w-5 h-5" />
            Call: 88264 44334
          </a>
        </div>

        <p className="mt-4 text-center text-blue-200 text-xs">
          Free consultation - Instant response on WhatsApp
        </p>
      </div>
    </div>
  )
}
