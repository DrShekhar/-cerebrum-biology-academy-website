'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { Phone, ArrowRight, CheckCircle, Star } from 'lucide-react'
import { CONTACT_INFO, getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'

export interface LandingPageTemplateProps {
  data: {
    title?: string
    metaDescription?: string
    heroTitle?: string
    heroSubtitle?: string
    heroHighlight?: string
    primaryCTA?: string
    secondaryCTA?: string
    sections?: Array<{
      type: 'hero' | 'features' | 'benefits' | 'testimonial' | 'faq' | 'cta' | 'content'
      title?: string
      subtitle?: string
      content?: string
      items?: Array<{
        title?: string
        description?: string
        icon?: string
      }>
      quote?: string
      author?: string
      image?: string
    }>
    stats?: {
      primary?: { value: string; label: string }
      secondary?: { value: string; label: string }
      tertiary?: { value: string; label: string }
    }
    [key: string]: any
  }
}

/**
 * Generic landing page template for dynamically generated SEO landing pages
 * This component renders flexible page data with support for multiple section types
 */
export function LandingPageTemplate({ data }: LandingPageTemplateProps) {
  const {
    title = 'Landing Page',
    metaDescription = '',
    heroTitle,
    heroSubtitle,
    heroHighlight,
    primaryCTA = 'Get Started',
    secondaryCTA,
    sections = [],
    stats,
  } = data

  const baseUrl = 'https://cerebrumbiologyacademy.com'

  // Render a section based on its type
  const renderSection = (section: any, index: number) => {
    const { type, title: sectionTitle, items = [], quote, author, content } = section

    switch (type) {
      case 'hero':
        return (
          <section key={index} className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {sectionTitle || heroTitle || title}
              </h1>
              {(section.subtitle || heroSubtitle) && (
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  {section.subtitle || heroSubtitle}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  {primaryCTA}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                {secondaryCTA && (
                  <button className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                    {secondaryCTA}
                  </button>
                )}
              </div>
            </div>
          </section>
        )

      case 'features':
        return (
          <section key={index} className="py-12 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {sectionTitle && (
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                  {sectionTitle}
                </h2>
              )}
              <div className="grid md:grid-cols-3 gap-8">
                {items.map((item: any, idx: number) => (
                  <div key={idx} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                    {item.icon && (
                      <div className="mb-4 text-blue-600 text-3xl">{item.icon}</div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )

      case 'benefits':
        return (
          <section key={index} className="py-12 md:py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {sectionTitle && (
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                  {sectionTitle}
                </h2>
              )}
              <div className="space-y-4">
                {items.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )

      case 'testimonial':
        return (
          <section key={index} className="py-12 md:py-20 bg-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-900 mb-6 italic">
                  "{quote || section.quote || 'Testimonial content goes here.'}"
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900">{author || section.author || 'Student'}</p>
                  {section.result && (
                    <p className="text-gray-600 text-sm">{section.result}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )

      case 'faq':
        return (
          <section key={index} className="py-12 md:py-20 bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              {sectionTitle && (
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                  {sectionTitle}
                </h2>
              )}
              <div className="space-y-4">
                {items.map((item: any, idx: number) => (
                  <details key={idx} className="border border-gray-200 rounded-lg p-4 cursor-pointer">
                    <summary className="font-semibold text-gray-900 flex justify-between items-center">
                      {item.title || item.question}
                      <span className="text-blue-600">+</span>
                    </summary>
                    <p className="mt-4 text-gray-600">{item.description || item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )

      case 'cta':
        return (
          <section key={index} className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{sectionTitle || 'Ready to Get Started?'}</h2>
              {content && <p className="text-lg mb-8 opacity-90">{content}</p>}
              <button className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                {primaryCTA}
                <Phone className="ml-2 h-5 w-5" />
              </button>
            </div>
          </section>
        )

      case 'content':
      default:
        return (
          <section key={index} className="py-12 md:py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              {sectionTitle && (
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {sectionTitle}
                </h2>
              )}
              {content && (
                <div className="prose prose-lg text-gray-600">
                  {content}
                </div>
              )}
            </div>
          </section>
        )
    }
  }

  return (
    <main>
      {/* Default hero section if no sections provided */}
      {sections.length === 0 && (
        <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {heroTitle || title}
            </h1>
            {heroSubtitle && (
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {heroSubtitle}
              </p>
            )}
            {stats && (
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {stats.primary && (
                  <div>
                    <p className="text-4xl font-bold text-blue-600">{stats.primary.value}</p>
                    <p className="text-gray-600 mt-2">{stats.primary.label}</p>
                  </div>
                )}
                {stats.secondary && (
                  <div>
                    <p className="text-4xl font-bold text-blue-600">{stats.secondary.value}</p>
                    <p className="text-gray-600 mt-2">{stats.secondary.label}</p>
                  </div>
                )}
                {stats.tertiary && (
                  <div>
                    <p className="text-4xl font-bold text-blue-600">{stats.tertiary.value}</p>
                    <p className="text-gray-600 mt-2">{stats.tertiary.label}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Render all sections */}
      {sections.map((section: any, index: number) => renderSection(section, index))}

      {/* Default CTA section if no sections provided */}
      {sections.length === 0 && (
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getPhoneLink(CONTACT_INFO.phone.primary)}
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                {getDisplayPhone(CONTACT_INFO.phone.primary)}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
