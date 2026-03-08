'use client'

import { Button } from '@/components/ui/Button'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  MessageCircle,
  Calendar,
  Users,
  Award,
  BookOpen,
  Target,
  Star,
  ArrowRight,
  Building,
  Navigation,
  CheckCircle,
} from 'lucide-react'
import Link from 'next/link'
import { FAQDisplay } from '@/components/seo/FAQSchema'
import { LazyGoogleMap } from '@/components/performance/LazyGoogleMap'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

// BreadcrumbList Schema for improved SERP display and CTR
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://cerebrumbiologyacademy.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Contact',
      item: 'https://cerebrumbiologyacademy.com/contact',
    },
  ],
}

const contactFAQs = [
  {
    question: 'How can I book a free demo class at Cerebrum Academy?',
    answer:
      'You can book a free demo class by calling us at +91 88264 44334, sending a WhatsApp message, or filling out the contact form on this page. Our counselors will schedule a convenient time based on your preferred batch and location.',
  },
  {
    question: 'What are the center locations for Cerebrum Biology Academy?',
    answer:
      'We have centers in South Delhi (Greater Kailash II), Rohini, and Gurugram. All centers have experienced AIIMS faculty and follow the same curriculum. We also offer online classes for students across India.',
  },
  {
    question: 'What are the office hours for contacting Cerebrum Academy?',
    answer:
      'Our office is open Monday to Saturday from 9:00 AM to 8:00 PM. You can also reach us on WhatsApp 24/7 for queries. Sunday classes are conducted, but administrative offices remain closed.',
  },
  {
    question: 'How long does it take to get a response after submitting the contact form?',
    answer:
      'We typically respond within 2-4 hours during office hours. For urgent queries, we recommend calling us directly at +91 88264 44334 or sending a WhatsApp message for immediate assistance.',
  },
  {
    question: 'Can I visit the center before enrolling?',
    answer:
      'Absolutely! We encourage parents and students to visit our centers before enrollment. You can attend a demo class, meet our faculty, and see our facilities. Schedule a visit by calling us or filling out the contact form.',
  },
  {
    question: 'Is there a counseling session available before enrollment?',
    answer:
      'Yes, we offer free one-on-one counseling sessions with our academic counselors. They will assess your current preparation level, discuss suitable course options, and create a personalized study plan recommendation.',
  },
]

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Campus',
      details: ['D 35, South Extension Part 2', 'New Delhi 110049'],
      color: 'bg-[#3d4d3d]',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 93119 46297', '+91 88264 44334 (Admissions)'],
      color: 'bg-[#4a5d4a]',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@cerebrumbiologyacademy.com', 'admissions@cerebrumbiologyacademy.com'],
      color: 'bg-[#5a6d5a]',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Sunday: Open 24 Hours'],
      color: 'bg-[#3d4d3d]',
    },
  ]

  const quickLinks = [
    { title: 'Book Free Demo Class', href: '/demo-booking', icon: BookOpen },
    {
      title: 'Request Brochure',
      href: `https://wa.me/918826444334?text=${encodeURIComponent('Hi, I would like to receive the Cerebrum Biology Academy brochure. Please share it with me.')}`,
      icon: Target,
    },
    { title: 'Check Results', href: '/success-stories', icon: Award },
    { title: 'Meet Our Faculty', href: '/faculty', icon: Users },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-[#3d4d3d] text-white py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <MessageSquare className="h-5 w-5" />
                <span className="font-semibold">We&apos;re Here to Help</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in-up">
                Get In Touch With Us
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl text-[#e8ede8] max-w-3xl mx-auto mb-6 sm:mb-8 animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}
              >
                Ready to start your NEET journey? Contact us for admission guidance, course
                information, or any queries about our biology coaching programs.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}
              >
                <Link href="/demo-booking">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-[#3d4d3d]"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Campus Visit
                  </Button>
                </Link>
                <a href="tel:+918826444334">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-white text-[#3d4d3d] hover:bg-[#e8ede8]"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Contact Information
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                Multiple ways to reach us for your convenience
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 md:p-8 text-center hover:shadow-xl transition-shadow animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6`}
                  >
                    <info.icon className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm sm:text-base break-words">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 text-center">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {quickLinks.map((link, index) => (
                  <Link key={index} href={link.href}>
                    <div
                      className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-[#e8ede8] transition-colors group cursor-pointer animate-fade-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <link.icon className="w-6 h-6 text-[#3d4d3d] mr-3" />
                      <span className="font-medium text-gray-900 group-hover:text-[#3d4d3d]">
                        {link.title}
                      </span>
                      <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-[#3d4d3d]" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Connect With Us */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Connect With Us Instantly
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                Get immediate assistance — no waiting
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 md:p-8 animate-fade-in-up">
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() =>
                    trackAndOpenWhatsApp({
                      source: 'contact-page',
                      message:
                        'Hi! I have an inquiry about Cerebrum Biology Academy. Please help me with course details and admission information.',
                      campaign: 'contact-page',
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all min-h-[56px] touch-manipulation"
                >
                  <MessageCircle className="w-6 h-6" />
                  WhatsApp Us Now
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
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm text-gray-600">
                  {[
                    'Instant Response',
                    'Admission Guidance',
                    'Course Details',
                    'Fee Structure',
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

        {/* Map Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Find Us On Map
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                Conveniently located near metro stations
              </p>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="p-5 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">
                    Visit Our Campus
                  </h3>

                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-[#e8ede8] rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <Building className="w-5 h-5 text-[#3d4d3d]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          Main Campus
                        </h4>
                        <p className="text-gray-600 text-sm sm:text-base">
                          D 35, South Extension Part 2, New Delhi 110049
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-[#e8ede8] rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <Navigation className="w-5 h-5 text-[#4a5d4a]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          Nearest Metro
                        </h4>
                        <p className="text-gray-600 text-sm sm:text-base">
                          South Extension Metro Station (5 min walk)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-[#e8ede8] rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <Clock className="w-5 h-5 text-[#5a6d5a]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          Campus Hours
                        </h4>
                        <p className="text-gray-600 text-sm sm:text-base">Open 24/7</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-7 md:mt-8">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full min-h-11 sm:min-h-12 bg-[#3d4d3d] hover:bg-[#4a5d4a]"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule Campus Visit
                    </Button>
                  </div>
                </div>

                <div className="h-64 sm:h-80 md:h-96 lg:h-full w-full">
                  <LazyGoogleMap
                    embedUrl="https://maps.google.com/maps?q=Cerebrum+Biology+Academy,+South+Extension+Part+2,+New+Delhi,+India&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    title="Cerebrum Biology Academy - South Extension Center"
                    height="100%"
                    placeholder={{
                      lat: 28.5725,
                      lng: 77.2217,
                      address: 'Cerebrum Biology Academy, South Extension Part 2, New Delhi',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <FAQDisplay
              questions={contactFAQs}
              title="Frequently Asked Questions About Contacting Us"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-[#3d4d3d] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Star className="h-5 w-5" />
              <span className="font-semibold">Start Your Journey Today</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#e8ede8] mb-6 sm:mb-7 md:mb-8">
              Join thousands of successful students and achieve your medical dreams with expert
              guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-[#3d4d3d] w-full sm:w-auto min-h-11 sm:min-h-12"
                >
                  Explore Courses
                </Button>
              </Link>
              <Button
                variant="primary"
                size="xl"
                className="bg-white text-[#3d4d3d] hover:bg-[#e8ede8] w-full sm:w-auto min-h-11 sm:min-h-12"
                onClick={() => (window.location.href = 'tel:+918826444334')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call +91 88264 44334
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
              <Link
                href="/results"
                className="text-[#e8ede8] hover:text-white underline underline-offset-4"
              >
                Our Results &rarr;
              </Link>
              <Link
                href="/all-locations"
                className="text-[#e8ede8] hover:text-white underline underline-offset-4"
              >
                Find a Center &rarr;
              </Link>
              <Link
                href="/board-exam-preparation"
                className="text-[#e8ede8] hover:text-white underline underline-offset-4"
              >
                Board Exam Prep &rarr;
              </Link>
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Free</div>
                <div className="text-[#e8ede8] text-xs sm:text-sm md:text-base">Consultation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">24/7</div>
                <div className="text-[#e8ede8] text-xs sm:text-sm md:text-base">Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">98%</div>
                <div className="text-[#e8ede8] text-xs sm:text-sm md:text-base">Success Rate</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
