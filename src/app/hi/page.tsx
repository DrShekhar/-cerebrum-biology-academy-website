import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { getDictionary } from '@/lib/i18n'
import { CONTACT_INFO, getPhoneLink } from '@/lib/constants/contactInfo'
import {
  GraduationCap,
  Users,
  Target,
  Video,
  MessageCircle,
  BookOpen,
  Phone,
  ArrowRight,
  Star,
  CheckCircle,
  MapPin,
  Trophy,
  Clock,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'सेरेब्रम बायोलॉजी एकेडमी | भारत की #1 NEET बायोलॉजी कोचिंग | 98% सफलता दर',
  description:
    'AIIMS-प्रशिक्षित फैकल्टी द्वारा भारत की टॉप NEET बायोलॉजी कोचिंग। 98% सफलता दर, 2000+ छात्र। क्लास 11, 12 और ड्रॉपर बैच। ऑनलाइन और ऑफलाइन क्लासेज। फ्री डेमो बुक करें!',
  keywords: [
    'NEET बायोलॉजी कोचिंग',
    'NEET कोचिंग हिंदी',
    'बायोलॉजी कोचिंग दिल्ली',
    'AIIMS प्रशिक्षित फैकल्टी',
    'NEET तैयारी',
    'मेडिकल एंट्रेंस कोचिंग',
    'ऑनलाइन NEET कोचिंग',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/hi',
    languages: {
      'en-IN': 'https://cerebrumbiologyacademy.com',
      'hi-IN': 'https://cerebrumbiologyacademy.com/hi',
    },
  },
  openGraph: {
    title: 'सेरेब्रम बायोलॉजी एकेडमी | NEET बायोलॉजी कोचिंग',
    description: 'भारत की #1 NEET बायोलॉजी कोचिंग। 98% सफलता दर। AIIMS फैकल्टी।',
    type: 'website',
    locale: 'hi_IN',
    url: 'https://cerebrumbiologyacademy.com/hi',
  },
}

export default function HindiHomePage() {
  const dict = getDictionary('hi')

  // Structured data for Hindi page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'सेरेब्रम बायोलॉजी एकेडमी',
    alternateName: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com/hi',
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    description: 'भारत की प्रमुख NEET बायोलॉजी कोचिंग। AIIMS-प्रशिक्षित फैकल्टी द्वारा व्यापक तैयारी।',
    inLanguage: 'hi',
    availableLanguage: ['hi', 'en'],
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 850,
      bestRating: 5,
    },
  }

  return (
    <>
      <Script
        id="hindi-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Language Switcher Banner */}
        <div className="bg-green-600 text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <span>🇮🇳 आप हिंदी पेज पर हैं</span>
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-green-200 transition-colors"
            >
              Switch to English
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Trophy className="w-4 h-4" />
                <span className="text-sm font-medium">भारत की #1 NEET बायोलॉजी कोचिंग</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                NEET बायोलॉजी में{' '}
                <span className="text-yellow-300">98% सफलता दर</span>
              </h1>

              <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
                {dict.hero.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300">98%</div>
                  <div className="text-sm text-green-100">सफलता दर</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300">2000+</div>
                  <div className="text-sm text-green-100">छात्र पढ़ाए</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300">15+</div>
                  <div className="text-sm text-green-100">वर्षों का अनुभव</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-300">695/720</div>
                  <div className="text-sm text-green-100">टॉप स्कोर</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
                >
                  <Video className="w-5 h-5" />
                  {dict.hero.ctaDemo}
                </Link>
                <a
                  href={getPhoneLink()}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
                >
                  <Phone className="w-5 h-5" />
                  {dict.hero.ctaCall}: {CONTACT_INFO.phone.display.hyphenated.primary}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {dict.features.title}
              </h2>
              <p className="text-xl text-gray-600">
                AIIMS फैकल्टी और सिद्ध परिणामों के साथ बेहतरीन कोचिंग
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: GraduationCap,
                  title: dict.features.aiimsFaculty.title,
                  description: dict.features.aiimsFaculty.description,
                },
                {
                  icon: Users,
                  title: dict.features.smallBatch.title,
                  description: dict.features.smallBatch.description,
                },
                {
                  icon: Target,
                  title: dict.features.successRate.title,
                  description: dict.features.successRate.description,
                },
                {
                  icon: Video,
                  title: dict.features.hybridMode.title,
                  description: dict.features.hybridMode.description,
                },
                {
                  icon: MessageCircle,
                  title: dict.features.doubtSupport.title,
                  description: dict.features.doubtSupport.description,
                },
                {
                  icon: BookOpen,
                  title: dict.features.ncertMaterial.title,
                  description: dict.features.ncertMaterial.description,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {dict.courses.title}
              </h2>
              <p className="text-xl text-gray-600">{dict.courses.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  name: dict.courses.class11.name,
                  description: dict.courses.class11.description,
                  price: '₹72,200',
                  tag: 'लोकप्रिय',
                },
                {
                  name: dict.courses.class12.name,
                  description: dict.courses.class12.description,
                  price: '₹72,200',
                  tag: null,
                },
                {
                  name: dict.courses.dropper.name,
                  description: dict.courses.dropper.description,
                  price: '₹85,500',
                  tag: 'हाई डिमांड',
                },
                {
                  name: dict.courses.foundation.name,
                  description: dict.courses.foundation.description,
                  price: '₹57,000',
                  tag: null,
                },
              ].map((course, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden"
                >
                  {course.tag && (
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-2 text-sm font-medium">
                      {course.tag}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{course.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-2xl font-bold text-green-600">{course.price}</span>
                      <span className="text-gray-500 text-sm">{dict.courses.perYear}</span>
                    </div>
                    <Link
                      href="/enrollment"
                      className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                      {dict.courses.enrollNow}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                EMI विकल्प उपलब्ध। मेधावी छात्रों के लिए विशेष छात्रवृत्ति।
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {dict.faq.title}
                </h2>
              </div>

              <div className="space-y-4">
                {[dict.faq.q1, dict.faq.q2, dict.faq.q3, dict.faq.q4].map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-gray-50 border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-gray-100 transition-colors">
                      <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="p-5 pt-0 text-gray-600 border-t border-gray-200">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict.cta.title}</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">{dict.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                {dict.cta.button}
              </Link>
              <a
                href={`https://wa.me/${CONTACT_INFO.phone.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
              >
                <Phone className="w-5 h-5" />
                WhatsApp पर संपर्क करें
              </a>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="bg-gray-900 text-gray-400 py-4 text-center text-sm">
          <p>{dict.footer.copyright}</p>
        </div>
      </div>
    </>
  )
}
