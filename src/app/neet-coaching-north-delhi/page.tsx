'use client'

import Link from 'next/link'
import {
  MapPin,
  GraduationCap,
  Users,
  Trophy,
  Star,
  Phone,
  ArrowRight,
  Award,
  Play,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const northDelhiAreas = [
  {
    name: 'Rohini',
    slug: 'rohini',
    description: 'Largest planned colony with multiple sectors',
    highlights: ['All Sectors', 'DPS Students', 'Metro Connected'],
    type: 'residential',
  },
  {
    name: 'Pitampura',
    slug: 'pitampura',
    description: 'Premium locality with TV Tower landmark',
    highlights: ['TV Tower', 'Netaji Subhash Place', 'Metro Hub'],
    type: 'posh',
  },
  {
    name: 'Model Town',
    slug: 'model-town',
    description: 'Posh area with well-planned sectors',
    highlights: ['DU North Campus Near', 'Educated Families', 'Premium Location'],
    type: 'posh',
  },
  {
    name: 'Shalimar Bagh',
    slug: 'shalimar-bagh',
    description: 'Large residential colony with good schools',
    highlights: ['Large Colony', 'Good Schools', 'Metro Access'],
    type: 'residential',
  },
  {
    name: 'Ashok Vihar',
    slug: 'ashok-vihar',
    description: 'Established colony near Netaji Subhash Place',
    highlights: ['NSP Near', 'Commercial Hub', 'Old Colony'],
    type: 'residential',
  },
  {
    name: 'GTB Nagar',
    slug: 'gtb-nagar',
    description: 'Student hub near Delhi University',
    highlights: ['DU North Campus', 'Student Area', 'Coaching Hub'],
    type: 'coaching-hub',
  },
  {
    name: 'Mukherjee Nagar',
    slug: 'mukherjee-nagar',
    description: 'Famous coaching destination for UPSC and competitive exams',
    highlights: ['UPSC Hub', 'Competitive Environment', 'Student Density'],
    type: 'coaching-hub',
  },
  {
    name: 'Kamla Nagar',
    slug: 'kamla-nagar',
    description: 'Vibrant area near DU campus',
    highlights: ['DU Adjacent', 'Shopping Hub', 'Youth Area'],
    type: 'commercial',
  },
  {
    name: 'Kingsway Camp',
    slug: 'kingsway-camp',
    description: 'Residential area near DU and GTB Hospital',
    highlights: ['Near DU', 'GTB Hospital', 'Student Area'],
    type: 'residential',
  },
  {
    name: 'Adarsh Nagar',
    slug: 'adarsh-nagar',
    description: 'Centrally located residential area',
    highlights: ['Metro Connected', 'Central Location', 'Mixed Area'],
    type: 'residential',
  },
  {
    name: 'Wazirpur',
    slug: 'wazirpur',
    description: 'Industrial-residential area with growing demand',
    highlights: ['Industrial Area', 'Affordable', 'Growing Population'],
    type: 'commercial',
  },
  {
    name: 'Prashant Vihar',
    slug: 'prashant-vihar',
    description: 'Quiet residential area in Rohini',
    highlights: ['Part of Rohini', 'Peaceful Area', 'Good Connectivity'],
    type: 'residential',
  },
]

const stats = [
  { label: 'Students from North Delhi', value: '400+', icon: Users },
  { label: 'Areas Covered', value: '12+', icon: MapPin },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Medical Selections', value: '80+', icon: Award },
]

const features = [
  {
    title: 'Convenient Location',
    description: 'Our center is accessible from all North Delhi localities via Metro',
    icon: MapPin,
  },
  {
    title: 'AIIMS Faculty',
    description: 'Learn from doctors and professors with AIIMS/MAMC teaching experience',
    icon: GraduationCap,
  },
  {
    title: 'Small Batches',
    description: 'Limited batch size of 15-20 students ensures personalized attention',
    icon: Users,
  },
  {
    title: 'Proven Results',
    description: '98% success rate with 67+ AIIMS selections',
    icon: Trophy,
  },
]

const testimonials = [
  {
    name: 'Aryan Gupta',
    area: 'Rohini Sector 8',
    score: 'NEET 2024: 678/720',
    college: 'MAMC Delhi',
    quote: 'Worth the daily travel from Rohini. The quality of teaching is unmatched.',
  },
  {
    name: 'Sneha Sharma',
    area: 'Pitampura',
    score: 'NEET 2024: 665/720',
    college: 'Lady Hardinge',
    quote: 'Small batch size made all the difference in my NEET preparation.',
  },
  {
    name: 'Rohit Verma',
    area: 'Model Town',
    score: 'NEET 2024: 652/720',
    college: 'UCMS Delhi',
    quote: 'The faculty at Cerebrum truly cares about each students success.',
  },
]

const faqs = [
  {
    question: 'Where is Cerebrum Academy located for North Delhi students?',
    answer:
      'Our main center is in South Delhi, easily accessible from North Delhi via Yellow Line Metro. We are just 35-40 minutes from Rohini, Pitampura, and Model Town metro stations.',
  },
  {
    question: 'Do you offer online classes for North Delhi students?',
    answer:
      'Yes, we offer hybrid learning with both online and offline classes. North Delhi students can choose the mode that suits them best.',
  },
  {
    question: 'What is the batch timing for students coming from North Delhi?',
    answer:
      'We have flexible batch timings including morning (7 AM - 10 AM), afternoon (2 PM - 5 PM), and evening (6 PM - 9 PM) batches to accommodate students from different areas.',
  },
  {
    question: 'How is Cerebrum different from Mukherjee Nagar coaching?',
    answer:
      'Unlike mass coaching centers in Mukherjee Nagar which focus on UPSC, we specialize in NEET Biology with AIIMS faculty, small batches of 15-20, and 98% success rate.',
  },
]

export default function NEETCoachingNorthDelhiPage() {
  return (
    <main className="min-h-screen">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - NEET Coaching for North Delhi',
            description:
              'Best NEET coaching for North Delhi students. Expert faculty, small batches, 98% success rate.',
            url: 'https://cerebrumbiologyacademy.com/neet-coaching-north-delhi',
            telephone: '+91-8826444334',
            areaServed: [
              'Rohini',
              'Pitampura',
              'Model Town',
              'Shalimar Bagh',
              'Ashok Vihar',
              'GTB Nagar',
              'Mukherjee Nagar',
            ],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'New Delhi',
              addressRegion: 'Delhi',
              addressCountry: 'IN',
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-indigo-900 py-20">
        <div className="container mx-auto px-4">
          <div
            className="max-w-4xl mx-auto text-center animate-fadeInUp"
          >
            <span className="inline-block px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium mb-6">
              #1 NEET Coaching for North Delhi Students
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Best NEET Coaching in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                North Delhi
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Expert NEET preparation for students from Rohini, Pitampura, Model Town, Shalimar
              Bagh, and all North Delhi localities. AIIMS faculty, small batches, 98% success rate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/demo-booking">
                  <Play className="w-5 h-5 mr-2" />
                  Book FREE Demo Class
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="tel:+918826444334">
                  <Phone className="w-5 h-5 mr-2" />
                  Call: 8826-444-334
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-gray-50 animate-fadeInUp"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-indigo-600" />
                <div className="text-3xl font-bold text-navy-900">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              NEET Coaching for All North Delhi Localities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We serve students from every corner of North Delhi. Find NEET coaching information for
              your area.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {northDelhiAreas.map((area, index) => (
              <div
                key={area.slug}
               className="animate-fadeInUp">
                <Link href={`/neet-coaching-north-delhi/${area.slug}`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-semibold text-navy-900">{area.name}</h3>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          area.type === 'coaching-hub'
                            ? 'bg-orange-100 text-orange-700'
                            : area.type === 'posh'
                              ? 'bg-purple-100 text-purple-700'
                              : area.type === 'commercial'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {area.type === 'coaching-hub'
                          ? 'Coaching Hub'
                          : area.type === 'posh'
                            ? 'Premium'
                            : area.type === 'commercial'
                              ? 'Commercial'
                              : 'Residential'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{area.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {area.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-indigo-600 text-sm font-medium">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Why North Delhi Students Choose Cerebrum
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Better than local coaching centers with personalized attention and proven results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-xl p-6 text-center animate-fadeInUp"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Success Stories from North Delhi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from students who made the journey from North Delhi to medical colleges
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-xl p-6 shadow-sm animate-fadeInUp"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-navy-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> {testimonial.area}
                  </div>
                  <div className="text-sm text-indigo-600 font-medium mt-1">
                    {testimonial.score}
                  </div>
                  <div className="text-sm text-gray-600">{testimonial.college}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              FAQs for North Delhi Students
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 animate-fadeInUp"
              >
                <h3 className="font-semibold text-navy-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })),
              }),
            }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join 400+ successful students from North Delhi. Book your FREE demo class today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/demo-booking">Book FREE Demo Class</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600"
                asChild
              >
                <a href="tel:+918826444334">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: 8826-444-334
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
