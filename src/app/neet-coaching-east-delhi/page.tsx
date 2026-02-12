'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  GraduationCap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  Award,
  Play,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const eastDelhiAreas = [
  {
    name: 'Laxmi Nagar',
    slug: 'laxmi-nagar',
    description: 'Famous coaching hub with top NEET institutes',
    highlights: ['Coaching Hub', 'Metro Connected', 'High Student Density'],
    type: 'coaching-hub',
  },
  {
    name: 'Preet Vihar',
    slug: 'preet-vihar',
    description: 'Residential area with excellent schools',
    highlights: ['DPS Students', 'Metro Access', 'Family Area'],
    type: 'residential',
  },
  {
    name: 'Mayur Vihar Phase 1',
    slug: 'mayur-vihar-phase-1',
    description: 'Premium locality with educated families',
    highlights: ['Phase 1, 2, 3', 'Metro Hub', 'Growing Demand'],
    type: 'residential',
  },
  {
    name: 'Mayur Vihar Phase 2',
    slug: 'mayur-vihar-phase-2',
    description: 'Established residential area near Akshardham',
    highlights: ['Near Akshardham', 'Good Schools', 'Family Area'],
    type: 'residential',
  },
  {
    name: 'Mayur Vihar Phase 3',
    slug: 'mayur-vihar-phase-3',
    description: 'Growing residential area with new developments',
    highlights: ['Affordable Housing', 'Growing Area', 'Student Population'],
    type: 'residential',
  },
  {
    name: 'Patparganj',
    slug: 'patparganj',
    description: 'Industrial-residential area with IT hub',
    highlights: ['IP Extension', 'IT Hub', 'Corporate Families'],
    type: 'residential',
  },
  {
    name: 'IP Extension',
    slug: 'ip-extension',
    description: 'Upscale residential colony in East Delhi',
    highlights: ['Premium Area', 'Good Schools', 'Educated Families'],
    type: 'posh',
  },
  {
    name: 'Karkardooma',
    slug: 'karkardooma',
    description: 'Legal hub with court complex',
    highlights: ['Court Area', 'Metro Connected', 'Professional Families'],
    type: 'residential',
  },
  {
    name: 'Shakarpur',
    slug: 'shakarpur',
    description: 'Dense residential area near Laxmi Nagar',
    highlights: ['Near Coaching Hub', 'Affordable', 'Student Area'],
    type: 'residential',
  },
  {
    name: 'Anand Vihar',
    slug: 'anand-vihar',
    description: 'Major transport hub with ISBT',
    highlights: ['ISBT Terminal', 'Metro Hub', 'Commercial Center'],
    type: 'commercial',
  },
  {
    name: 'Nirman Vihar',
    slug: 'nirman-vihar',
    description: 'Busy commercial and residential area',
    highlights: ['Shopping Area', 'Metro Access', 'Mixed Use'],
    type: 'commercial',
  },
  {
    name: 'Pandav Nagar',
    slug: 'pandav-nagar',
    description: 'Affordable residential locality',
    highlights: ['Budget Friendly', 'Near Mother Dairy', 'Student Housing'],
    type: 'residential',
  },
]

const stats = [
  { label: 'Students from East Delhi', value: '500+', icon: Users },
  { label: 'Areas Covered', value: '12+', icon: MapPin },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Medical Selections', value: '100+', icon: Award },
]

const features = [
  {
    title: 'Convenient Location',
    description: 'Our center is easily accessible from all East Delhi localities via Metro and bus',
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
    name: 'Rahul Sharma',
    area: 'Laxmi Nagar',
    score: 'NEET 2024: 685/720',
    college: 'MAMC Delhi',
    quote: 'Best decision to join Cerebrum! The faculty helped me score 685 in NEET.',
  },
  {
    name: 'Priya Singh',
    area: 'Mayur Vihar',
    score: 'NEET 2024: 670/720',
    college: 'Lady Hardinge',
    quote: 'The personalized attention at Cerebrum made all the difference.',
  },
  {
    name: 'Amit Kumar',
    area: 'Preet Vihar',
    score: 'NEET 2024: 655/720',
    college: 'UCMS Delhi',
    quote: 'Excellent teaching methodology and doubt-clearing sessions.',
  },
]

const faqs = [
  {
    question: 'Where is Cerebrum Academy located for East Delhi students?',
    answer:
      'Our main center is in South Delhi, easily accessible from East Delhi via Blue Line Metro. We are just 25-30 minutes from Laxmi Nagar, Preet Vihar, and Mayur Vihar metro stations.',
  },
  {
    question: 'Do you offer online classes for East Delhi students?',
    answer:
      'Yes, we offer hybrid learning with both online and offline classes. East Delhi students can choose the mode that suits them best.',
  },
  {
    question: 'What is the batch timing for students coming from East Delhi?',
    answer:
      'We have flexible batch timings including morning (7 AM - 10 AM), afternoon (2 PM - 5 PM), and evening (6 PM - 9 PM) batches to accommodate students from different areas.',
  },
  {
    question: 'How is Cerebrum different from coaching in Laxmi Nagar?',
    answer:
      'Unlike mass coaching centers in Laxmi Nagar, we maintain small batches of 15-20 students, provide AIIMS faculty, and offer personalized attention with 98% success rate.',
  },
]

export default function NEETCoachingEastDelhiPage() {
  return (
    <main className="min-h-screen">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - NEET Coaching for East Delhi',
            description:
              'Best NEET coaching for East Delhi students. Expert faculty, small batches, 98% success rate.',
            url: 'https://cerebrumbiologyacademy.com/neet-coaching-east-delhi',
            telephone: '+91-8826444334',
            areaServed: [
              'Laxmi Nagar',
              'Preet Vihar',
              'Mayur Vihar',
              'Patparganj',
              'IP Extension',
              'Karkardooma',
              'Anand Vihar',
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
      <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-green-800 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-green-600/20 text-green-400 rounded-full text-sm font-medium mb-6">
              #1 NEET Coaching for East Delhi Students
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Best NEET Coaching in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-400">
                East Delhi
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Expert NEET preparation for students from Laxmi Nagar, Preet Vihar, Mayur Vihar, and
              all East Delhi localities. AIIMS faculty, small batches, 98% success rate.
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
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <div className="text-3xl font-bold text-navy-900">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              NEET Coaching for All East Delhi Localities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We serve students from every corner of East Delhi. Find NEET coaching information for
              your area.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {eastDelhiAreas.map((area, index) => (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={`/neet-coaching-east-delhi/${area.slug}`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-green-600" />
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
                                : 'bg-green-100 text-green-700'
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
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Why East Delhi Students Choose Cerebrum
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Better than Laxmi Nagar coaching centers with personalized attention and proven
              results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-navy-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Cerebrum vs Laxmi Nagar Coaching Centers
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              See why students are choosing quality over convenience
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-100 p-4 font-semibold">
                <div className="text-gray-600">Feature</div>
                <div className="text-green-600 text-center">Cerebrum Academy</div>
                <div className="text-gray-600 text-center">Laxmi Nagar Centers</div>
              </div>
              {[
                ['Batch Size', '15-20 Students', '50-100 Students'],
                ['Faculty', 'AIIMS/MAMC Doctors', 'Mixed Quality'],
                ['Success Rate', '98%', '60-70%'],
                ['Personal Attention', 'Guaranteed', 'Rare'],
                ['Doubt Sessions', 'Daily 1-on-1', 'Weekly Group'],
                ['Study Material', 'Premium + Digital', 'Basic'],
              ].map(([feature, cerebrum, others], index) => (
                <div
                  key={feature}
                  className={`grid grid-cols-3 p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <div className="text-gray-700">{feature}</div>
                  <div className="text-center text-green-600 font-medium flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" /> {cerebrum}
                  </div>
                  <div className="text-center text-gray-500">{others}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Success Stories from East Delhi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from students who made the journey from East Delhi to medical colleges
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
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
                  <div className="text-sm text-green-600 font-medium mt-1">{testimonial.score}</div>
                  <div className="text-sm text-gray-600">{testimonial.college}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              FAQs for East Delhi Students
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="font-semibold text-navy-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
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
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Join 500+ successful students from East Delhi. Book your FREE demo class today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/demo-booking">Book FREE Demo Class</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
                asChild
              >
                <a href="tel:+918826444334">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: 8826-444-334
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
