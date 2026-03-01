'use client'

import Link from 'next/link'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Phone,
  Globe,
  GraduationCap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NEETCoachingLocation } from '@/lib/data/neet-coaching-locations'

// Hero color mapping
const heroColors: Record<string, string> = {
  teal: 'from-teal-900 via-teal-700 to-teal-800',
  blue: 'from-blue-900 via-indigo-900 to-purple-800',
  indigo: 'from-indigo-900 via-indigo-700 to-indigo-800',
  purple: 'from-purple-900 via-purple-700 to-purple-800',
  green: 'from-green-900 via-green-700 to-green-800',
}

const accentColors: Record<string, string> = {
  teal: 'text-teal-600 bg-teal-100',
  blue: 'text-blue-600 bg-blue-100',
  indigo: 'text-indigo-600 bg-indigo-100',
  purple: 'text-purple-600 bg-purple-100',
  green: 'text-green-600 bg-green-100',
}

interface Props {
  location: NEETCoachingLocation
  relatedLocations: NEETCoachingLocation[]
}

export function NEETCoachingPageContent({ location, relatedLocations }: Props) {
  const heroGradient = heroColors[location.heroColor] || heroColors.teal
  const accent = accentColors[location.heroColor] || accentColors.teal
  const [accentText, accentBg] = accent.split(' ')

  const features = [
    {
      icon: Video,
      title: 'Live Interactive Classes',
      description: 'Real-time teaching with instant doubt resolution via Zoom/Google Meet',
    },
    {
      icon: Users,
      title: 'Small Batches (15-20)',
      description: 'Personalized attention for every student from AIIMS trained faculty',
    },
    {
      icon: Award,
      title: 'AIIMS Trained Faculty',
      description: 'Expert doctors and teachers from premier medical institutions',
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Material',
      description: 'Notes, MCQs, mock tests, and recorded lectures for revision',
    },
    {
      icon: Clock,
      title: 'Flexible Timings',
      description: 'Morning, afternoon, and evening batches to fit your schedule',
    },
    {
      icon: Globe,
      title: 'Online + Offline',
      description: 'Choose online classes from home or attend at our center',
    },
  ]

  const successMetrics = [
    { label: 'Success Rate', value: location.successRate, icon: Trophy },
    { label: 'Top Score 2024', value: location.topScore, icon: Star },
    { label: `${location.cityName} Students`, value: location.studentCount, icon: Users },
    { label: location.type === 'city' ? 'Areas Covered' : 'Batches', value: location.localities?.length || '10+', icon: MapPin },
  ]

  const handleWhatsAppClick = async () => {
    await trackAndOpenWhatsApp({
      source: `neet-coaching-${location.slug}`,
      message: `Hi! I'm from ${location.cityName} and interested in NEET Biology coaching. Please share details.`,
      campaign: `neet-coaching-${location.slug}`,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${heroGradient} text-white py-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              {location.state} | {location.metroAccessible ? 'Metro Accessible' : 'Online Classes Available'}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in {location.cityName}</span>
            </h1>

            {location.localities && location.localities.length > 0 && (
              <h2 className="text-xl md:text-2xl opacity-90 mb-4">
                {location.localities.slice(0, 5).map(l => l.name).join(' | ')}
              </h2>
            )}

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Join Cerebrum Biology Academy for expert NEET Biology coaching in {location.cityName}.
              AIIMS trained faculty, {location.successRate} success rate, and live interactive classes.
              {location.metroAccessible && ` Easy metro access - ${location.travelTime || 'convenient commute'}.`}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-gray-900"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp: 88264-44334
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Localities Section (if available) */}
      {location.localities && location.localities.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div
              className="text-center mb-16 animate-fadeInUp"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                NEET Coaching Across All {location.cityName} Areas
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We serve students from every corner of {location.cityName} and {location.state}.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {location.localities.map((locality, index) => (
                <div
                  key={locality.slug}
                 className="animate-fadeInUp">
                  <div
                    className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                      locality.priority === 'high' ? `ring-2 ring-${location.heroColor}-600` : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                      <MapPin className={`w-5 h-5 ${accentText}`} />
                    </div>
                    <div className={`text-2xl font-bold ${accentText} mb-1`}>{locality.students}</div>
                    <div className="text-sm text-gray-500">{locality.highlight}</div>
                    {locality.priority === 'high' && (
                      <div className={`mt-2 inline-flex items-center text-xs ${accentBg} ${accentText} px-2 py-1 rounded-full`}>
                        <Star className="w-3 h-3 mr-1" />
                        High Demand
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Medical Colleges Section (if available) */}
      {location.medicalColleges && location.medicalColleges.length > 0 && (
        <section className={`py-20 ${accentBg.replace('bg-', 'bg-')}-50`}>
          <div className="max-w-7xl mx-auto px-4">
            <div
              className="text-center mb-16 animate-fadeInUp"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Get Into Top Medical Colleges
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our coaching helps you secure seats in prestigious medical institutions across {location.state}.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {location.medicalColleges.map((college, index) => (
                <div
                  key={college}
                  className="bg-white px-6 py-4 rounded-xl shadow-lg animate-fadeInUp"
                >
                  <div className="flex items-center">
                    <GraduationCap className={`w-5 h-5 ${accentText} mr-2`} />
                    <span className="font-semibold text-gray-900">{college}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Cerebrum for NEET Coaching in {location.cityName}?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <feature.icon className={`w-12 h-12 ${accentText} mb-4`} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools Section (if available) */}
      {location.schools && location.schools.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These {location.cityName} Schools Trust Us
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {location.schools.map((school, index) => (
                <span
                  key={school}
                  className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm animate-fadeInUp"
                >
                  {school}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions - NEET Coaching {location.cityName}
            </h2>
          </div>

          <div className="space-y-6">
            {location.faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className={`w-6 h-6 mr-3 ${accentText} flex-shrink-0 mt-1`} />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Locations Section */}
      {relatedLocations.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              NEET Coaching in Nearby Areas
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {relatedLocations.map((related) => (
                <Link
                  key={related.slug}
                  href={`/neet-coaching/${related.slug}`}
                  className={`${accentBg} hover:opacity-80 ${accentText} px-4 py-2 rounded-full text-sm font-medium transition-colors`}
                >
                  {related.cityName}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={`py-20 bg-gradient-to-r ${heroGradient} text-white`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from {location.cityName}
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {location.successRate} success rate, AIIMS trained faculty, {location.studentCount} {location.cityName} students already enrolled!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: 8826444334
                </Button>
              </a>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All {location.cityName} Areas</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Live Classes</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>{location.state} Expert</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
