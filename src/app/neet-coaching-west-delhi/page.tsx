'use client'

import { motion } from 'framer-motion'
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

const westDelhiAreas = [
  {
    name: 'Dwarka',
    slug: 'dwarka',
    description: 'Largest sub-city with 29 sectors',
    highlights: ['All Sectors', 'Airport Near', 'Metro Connected'],
    type: 'residential',
  },
  {
    name: 'Janakpuri',
    slug: 'janakpuri',
    description: 'Premium area with top schools',
    highlights: ['DPS Janakpuri', 'District Centre', 'Metro Hub'],
    type: 'posh',
  },
  {
    name: 'Rajouri Garden',
    slug: 'rajouri-garden',
    description: 'Commercial and residential hub',
    highlights: ['Shopping Hub', 'Coaching Centers', 'Metro Access'],
    type: 'commercial',
  },
  {
    name: 'Vikaspuri',
    slug: 'vikaspuri',
    description: 'Large residential area with good schools',
    highlights: ['Affordable', 'Metro Connected', 'Growing Area'],
    type: 'residential',
  },
  {
    name: 'Uttam Nagar',
    slug: 'uttam-nagar',
    description: 'Densely populated area with student demand',
    highlights: ['Budget Friendly', 'High Density', 'Metro Access'],
    type: 'residential',
  },
  {
    name: 'Tilak Nagar',
    slug: 'tilak-nagar',
    description: 'Established residential colony',
    highlights: ['Old Colony', 'Metro Connected', 'Commercial Mix'],
    type: 'residential',
  },
  {
    name: 'Subhash Nagar',
    slug: 'subhash-nagar',
    description: 'Residential area with metro connectivity',
    highlights: ['Metro Station', 'Residential', 'Good Schools'],
    type: 'residential',
  },
  {
    name: 'Paschim Vihar',
    slug: 'paschim-vihar',
    description: 'Large residential colony',
    highlights: ['Multiple Blocks', 'Residential', 'Metro Access'],
    type: 'residential',
  },
  {
    name: 'Punjabi Bagh',
    slug: 'punjabi-bagh',
    description: 'Premium residential area',
    highlights: ['Club Road', 'Posh Area', 'Business Families'],
    type: 'posh',
  },
  {
    name: 'Hari Nagar',
    slug: 'hari-nagar',
    description: 'Residential area near Janakpuri',
    highlights: ['Near Janakpuri', 'Affordable', 'Metro Connected'],
    type: 'residential',
  },
  {
    name: 'Kirti Nagar',
    slug: 'kirti-nagar',
    description: 'Known for furniture market',
    highlights: ['Furniture Hub', 'Commercial Area', 'Metro Access'],
    type: 'commercial',
  },
  {
    name: 'Moti Nagar',
    slug: 'moti-nagar',
    description: 'Residential area with commercial activity',
    highlights: ['Metro Station', 'Mixed Use', 'Good Connectivity'],
    type: 'residential',
  },
]

const stats = [
  { label: 'Students from West Delhi', value: '350+', icon: Users },
  { label: 'Areas Covered', value: '12+', icon: MapPin },
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Medical Selections', value: '70+', icon: Award },
]

const features = [
  {
    title: 'Convenient Location',
    description: 'Our center is accessible from all West Delhi localities via Blue Line Metro',
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
    name: 'Aditya Kapoor',
    area: 'Dwarka Sector 6',
    score: 'NEET 2024: 672/720',
    college: 'MAMC Delhi',
    quote: 'The metro commute from Dwarka was worth it. Quality teaching made the difference.',
  },
  {
    name: 'Priyanka Jain',
    area: 'Janakpuri',
    score: 'NEET 2024: 658/720',
    college: 'Lady Hardinge',
    quote: 'Small batches and personal attention helped me achieve my dream.',
  },
  {
    name: 'Vikram Singh',
    area: 'Rajouri Garden',
    score: 'NEET 2024: 645/720',
    college: 'UCMS Delhi',
    quote: 'Best coaching I could find. The faculty genuinely cares about students.',
  },
]

const faqs = [
  {
    question: 'Where is Cerebrum Academy located for West Delhi students?',
    answer:
      'Our main center is in South Delhi, easily accessible from West Delhi via Blue Line Metro. We are just 30-40 minutes from Dwarka, Janakpuri, and Rajouri Garden metro stations.',
  },
  {
    question: 'Do you offer online classes for West Delhi students?',
    answer:
      'Yes, we offer hybrid learning with both online and offline classes. West Delhi students can choose the mode that suits them best.',
  },
  {
    question: 'What is the batch timing for students coming from West Delhi?',
    answer:
      'We have flexible batch timings including morning (7 AM - 10 AM), afternoon (2 PM - 5 PM), and evening (6 PM - 9 PM) batches to accommodate students from different areas.',
  },
  {
    question: 'How is Cerebrum different from coaching in Rajouri Garden?',
    answer:
      'Unlike local coaching centers, we specialize in NEET Biology with AIIMS faculty, small batches of 15-20, and 98% success rate.',
  },
]

export default function NEETCoachingWestDelhiPage() {
  return (
    <main className="min-h-screen">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - NEET Coaching for West Delhi',
            description:
              'Best NEET coaching for West Delhi students. Expert faculty, small batches, 98% success rate.',
            url: 'https://cerebrumbiologyacademy.com/neet-coaching-west-delhi',
            telephone: '+91-8826444334',
            areaServed: [
              'Dwarka',
              'Janakpuri',
              'Rajouri Garden',
              'Vikaspuri',
              'Uttam Nagar',
              'Punjabi Bagh',
              'Paschim Vihar',
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
      <section className="relative bg-gradient-to-br from-orange-900 via-red-800 to-rose-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium mb-6">
              #1 NEET Coaching for West Delhi Students
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Best NEET Coaching in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">
                West Delhi
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Expert NEET preparation for students from Dwarka, Janakpuri, Rajouri Garden,
              Vikaspuri, and all West Delhi localities. AIIMS faculty, small batches, 98% success
              rate.
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
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-orange-600" />
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
              NEET Coaching for All West Delhi Localities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We serve students from every corner of West Delhi. Find NEET coaching information for
              your area.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {westDelhiAreas.map((area, index) => (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={`/neet-coaching-west-delhi/${area.slug}`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-600" />
                        <h3 className="font-semibold text-navy-900">{area.name}</h3>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          area.type === 'coaching-hub'
                            ? 'bg-purple-100 text-purple-700'
                            : area.type === 'posh'
                              ? 'bg-orange-100 text-orange-700'
                              : area.type === 'commercial'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-rose-100 text-rose-700'
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
                    <div className="flex items-center text-orange-600 text-sm font-medium">
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
              Why West Delhi Students Choose Cerebrum
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Better than local coaching centers with personalized attention and proven results
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
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
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
              Success Stories from West Delhi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from students who made the journey from West Delhi to medical colleges
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
                  <div className="text-sm text-orange-600 font-medium mt-1">
                    {testimonial.score}
                  </div>
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
              FAQs for West Delhi Students
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
      <section className="py-16 bg-gradient-to-r from-orange-600 to-rose-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Join 350+ successful students from West Delhi. Book your FREE demo class today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/demo-booking">Book FREE Demo Class</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-orange-600"
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
