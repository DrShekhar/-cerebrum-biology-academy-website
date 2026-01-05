'use client'

import Link from 'next/link'
import { Locality } from '@/data/localities'
import { MapPin, Phone, CheckCircle, ArrowRight } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface LocalityHeroProps {
  locality: Locality
}

export default function LocalityHero({ locality }: LocalityHeroProps) {
  const handleWhatsAppClick = async () => {
    await trackAndOpenWhatsApp({
      source: `locality-hero-${locality.slug}`,
      message: `Hi, I'm interested in NEET Biology coaching in ${locality.displayName}`,
      campaign: 'locality-page',
    })
  }

  return (
    <section className="bg-indigo-500 text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-blue-100 mb-6">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/locations" className="hover:text-white">
            Locations
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/locations/${locality.citySlug}`} className="hover:text-white">
            {locality.city}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white font-medium">{locality.displayName}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Location Badge */}
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 mr-2 text-blue-300" />
              <span className="text-blue-100">
                {locality.city}, {locality.state}
              </span>
            </div>

            {/* H1 Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{locality.content.heroTitle}</h1>

            <p className="text-xl text-blue-100 mb-8">{locality.content.heroSubtitle}</p>

            {/* Success Metric */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-300 mr-3" />
                <div>
                  <p className="text-sm text-blue-200">Proven Results</p>
                  <p className="text-lg font-semibold">{locality.content.successMetric}</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors cursor-pointer"
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp Us
              </button>
            </div>
          </div>

          {/* Right Column - Quick Stats */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">
              Why {locality.displayName} Students Choose Us
            </h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-300 mr-3 mt-1" />
                <div>
                  <p className="font-semibold">
                    {locality.socialProof.studentCount}+ Students Coached
                  </p>
                  <p className="text-sm text-blue-200">From {locality.displayName} area</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-300 mr-3 mt-1" />
                <div>
                  <p className="font-semibold">Top Score: {locality.socialProof.topScore}/360</p>
                  <p className="text-sm text-blue-200">Biology section excellence</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-300 mr-3 mt-1" />
                <div>
                  <p className="font-semibold">Expert Faculty</p>
                  <p className="text-sm text-blue-200">15+ years of NEET coaching experience</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-300 mr-3 mt-1" />
                <div>
                  <p className="font-semibold">Small Batches</p>
                  <p className="text-sm text-blue-200">
                    Maximum 15 students for personalized attention
                  </p>
                </div>
              </div>
            </div>

            {/* Urgency Message */}
            <div className="mt-6 p-4 bg-orange-500/20 border border-orange-300/50 rounded-lg">
              <p className="text-sm font-semibold text-orange-100">
                ⚡ {locality.content.urgencyMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
