'use client'

import { Button } from '@/components/ui/Button'
import {
  Download,
  FileText,
  Eye,
  CheckCircle,
  Users,
  BookOpen,
  Award,
  Target,
  Phone,
  ArrowRight,
  MessageCircle,
} from 'lucide-react'
import Link from 'next/link'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

export default function BrochurePage() {
  const brochures = [
    {
      title: 'Complete Course Brochure',
      description: 'Comprehensive guide covering all courses, faculty, and facilities',
      pages: 24,
      features: ['Course details', 'Fee structure', 'Faculty profiles', 'Success stories'],
      type: 'general',
    },
    {
      title: 'Class 11th Foundation Brochure',
      description: 'Detailed information about our Class 11th foundation program',
      pages: 16,
      features: [
        'Curriculum overview',
        'Study methodology',
        'Assessment pattern',
        'Sample materials',
      ],
      type: 'class-11',
    },
    {
      title: 'Class 12th Intensive Brochure',
      description: 'Complete guide for NEET preparation in Class 12th',
      pages: 20,
      features: ['NEET syllabus', 'Test series', 'Rank analysis', 'Previous results'],
      type: 'class-12',
    },
    {
      title: 'Dropper Batch Brochure',
      description: 'Specialized program for NEET droppers and repeaters',
      pages: 18,
      features: ['Revision strategy', 'Advanced problems', 'Mock tests', 'Counseling support'],
      type: 'dropper',
    },
  ]

  const highlights = [
    {
      icon: Award,
      title: '98% Success Rate',
      description: 'Students scoring 320+ in NEET Biology',
    },
    {
      icon: Users,
      title: 'Expert Faculty',
      description: '15+ years experienced teachers',
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Material',
      description: 'NCERT + Advanced study resources',
    },
    {
      icon: Target,
      title: 'Proven Methods',
      description: 'Time-tested teaching methodology',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fadeInUp">Download Course Brochures</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8 animate-fadeInUp">
              Get detailed information about our NEET Biology courses, faculty profiles, success
              stories, and fee structure. Everything you need to make an informed decision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-indigo-600"
              >
                <Eye className="w-5 h-5 mr-2" />
                Preview Brochure
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Available Brochures */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Available Brochures</h2>
            <p className="text-xl text-gray-600">
              Choose the brochure that matches your course interest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {brochures.map((brochure, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow animate-fadeInUp"
              >
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mr-6">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{brochure.title}</h3>
                    <p className="text-gray-600 mb-2">{brochure.description}</p>
                    <p className="text-sm text-gray-500">{brochure.pages} pages • PDF format</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {brochure.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="primary" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Brochure */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Your Free Brochure</h2>
            <p className="text-xl text-gray-600">
              Request brochures instantly via WhatsApp or call us
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl shadow-lg p-8 animate-fadeInUp">
            <div className="space-y-4">
              <button
                type="button"
                onClick={() =>
                  trackAndOpenWhatsApp({
                    source: 'brochure-page',
                    message:
                      'Hi! I would like to receive the Cerebrum Biology Academy course brochure with fee structure and batch details. Please share it with me.',
                    campaign: 'brochure-request',
                  })
                }
                className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all min-h-[56px] touch-manipulation"
              >
                <MessageCircle className="w-6 h-6" />
                Get Brochure via WhatsApp
              </button>

              <a
                href="tel:+918826444334"
                className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all min-h-[56px] touch-manipulation"
              >
                <Phone className="w-6 h-6" />
                Call: +91 88264 44334
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-center text-sm text-gray-600">
                {[
                  'Instant Delivery',
                  'Fee Structure Included',
                  'Faculty Profiles',
                  'Success Stories',
                ].map((item) => (
                  <div key={item} className="flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Cerebrum Biology Academy?
            </h2>
            <p className="text-xl text-gray-600">
              Discover what makes us India's leading NEET Biology coaching institute
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center animate-fadeInUp">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your NEET Journey?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Download our brochures and discover how we can help you achieve your medical dreams
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-indigo-600"
              >
                Book Free Demo Class
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              variant="primary"
              size="xl"
              className="bg-white text-indigo-600 hover:bg-gray-100"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call +91 88264 44334
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">FREE</div>
              <div className="text-indigo-100">Digital Brochures</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-indigo-100">Download Access</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5000+</div>
              <div className="text-indigo-100">Success Stories</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
