'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function BiologyTutorOnlinePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How is online biology tuition different from regular classes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Online biology tuition offers personalized 1-on-1 attention, flexible scheduling, recorded sessions for revision, and progress tracking. You get the same quality teaching at 60% lower cost than home tutors.',
        },
      },
      {
        '@type': 'Question',
        name: 'What qualifications does the biology tutor have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dr. Shekhar is AIIMS-trained with 15+ years teaching experience and 1,50,000+ NEET selections. He specializes in CBSE, ICSE, and NEET biology preparation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I choose my class timing for online biology tuition?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We offer flexible scheduling with multiple batch timings - Morning (6-8 AM), Afternoon (2-4 PM), Evening (6-8 PM), and Weekend batches. Choose what suits your schedule.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide online biology tuition for NRI students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we have special batches for NRI students in UAE, USA, UK, and other countries. Timings are adjusted for different time zones, and classes are conducted in English medium.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the fee for online biology tuition?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our online biology tuition starts at ₹2,500/month for group batches. This is 60% lower than home tutors charging ₹6,000-10,000/month. Demo class is free.',
        },
      },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Online Biology Tuition',
    description:
      'Personalized online biology tuition for Class 9-12, CBSE, ICSE, and NEET preparation with expert tutors.',
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    offers: {
      '@type': 'Offer',
      price: '2500',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      instructor: {
        '@type': 'Person',
        name: 'Dr. Shekhar',
        jobTitle: 'Senior Biology Faculty',
      },
    },
  }

  const tutorFeatures = [
    {
      title: 'Personalized Attention',
      description: '1-on-1 mentoring with focus on your weak areas and learning pace',
      icon: '👤',
    },
    {
      title: 'Flexible Scheduling',
      description: 'Choose your preferred time slot - morning, afternoon, or evening',
      icon: '🕐',
    },
    {
      title: 'Progress Tracking',
      description: 'Weekly assessments and detailed progress reports for parents',
      icon: '📊',
    },
    {
      title: 'Doubt Resolution',
      description: 'WhatsApp support for instant doubt clearing between classes',
      icon: '💬',
    },
    {
      title: 'Recorded Sessions',
      description: 'All live classes recorded for revision anytime, anywhere',
      icon: '🎥',
    },
    {
      title: 'Study Material',
      description: 'NCERT-based notes, practice questions, and previous year papers',
      icon: '📚',
    },
  ]

  const tutoringOptions = [
    {
      name: '1-on-1 Tutoring',
      price: '₹5,000/month',
      features: [
        'Individual attention',
        'Custom schedule',
        'Personalized curriculum',
        'Parent feedback calls',
        'WhatsApp doubt support',
      ],
      ideal: 'Students needing focused attention',
      color: 'blue',
    },
    {
      name: 'Small Batch (2-5)',
      price: '₹3,500/month',
      features: [
        'Semi-personalized',
        'Peer learning',
        'Fixed schedule',
        'Weekly tests',
        'Group discussions',
      ],
      ideal: 'Students who learn well in groups',
      color: 'cyan',
    },
    {
      name: 'Group Batch (6-15)',
      price: '₹2,500/month',
      features: [
        'Cost-effective',
        'Competitive environment',
        'Regular assessments',
        'Doubt sessions',
        'Study material included',
      ],
      ideal: 'Budget-conscious families',
      color: 'teal',
    },
  ]

  const comparisonData = [
    {
      feature: 'Monthly Fee',
      online: '₹2,500-5,000',
      home: '₹6,000-15,000',
      result: '60% savings',
    },
    { feature: 'Travel Time', online: '0 minutes', home: '30-60 minutes', result: 'No commute' },
    {
      feature: 'Class Recording',
      online: 'Yes, always',
      home: 'Not available',
      result: 'Unlimited revision',
    },
    {
      feature: 'Progress Tracking',
      online: 'Digital dashboard',
      home: 'Manual notes',
      result: 'Real-time updates',
    },
    {
      feature: 'Doubt Support',
      online: '24/7 WhatsApp',
      home: 'Only during class',
      result: 'Always available',
    },
    {
      feature: 'Study Material',
      online: 'Digital + PDF',
      home: 'Depends on tutor',
      result: 'Comprehensive',
    },
    {
      feature: 'Teacher Quality',
      online: 'AIIMS-trained expert',
      home: 'Variable quality',
      result: 'Guaranteed expert',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-600 py-20 text-white">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="container relative mx-auto px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  Personalized Learning Experience
                </span>
                <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  Biology Tutor Online
                  <span className="mt-2 block text-cyan-200">Personalized Tuition</span>
                </h1>
                <p className="mb-8 text-lg text-blue-100 md:text-xl">
                  Get personalized online biology tuition from AIIMS-trained expert. 1-on-1
                  mentoring, flexible scheduling, and progress tracking at 60% lower cost than home
                  tutors.
                </p>

                <div className="mb-8 grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-bold md:text-3xl">15+</div>
                    <div className="text-sm text-blue-200">Years Experience</div>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-bold md:text-3xl">1,50,000+</div>
                    <div className="text-sm text-blue-200">NEET Selections</div>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-bold md:text-3xl">60%</div>
                    <div className="text-sm text-blue-200">Cost Savings</div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/demo"
                    className="rounded-lg bg-white px-8 py-4 text-center font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
                  >
                    Book Free Demo Class
                  </Link>
                  <a
                    href="https://wa.me/918826444334?text=Hi,%20I%20want%20online%20biology%20tuition"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border-2 border-white px-8 py-4 text-center font-semibold text-white transition hover:bg-white/10"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden md:block"
              >
                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                    alt="Online Biology Tuition Session"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 p-4 backdrop-blur-sm">
                    <p className="text-sm font-medium text-gray-800">
                      &ldquo;My online tutor helped me score 360/360 in NEET Biology!&rdquo;
                    </p>
                    <p className="text-xs text-gray-600">- Priya S., NEET 2024</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Online Tuition Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Why Choose Online Biology Tuition?
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Online biology tuition offers personalized attention and flexibility that
                traditional tuition can&apos;t match. Learn from India&apos;s best biology tutor
                from anywhere.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tutorFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition hover:shadow-xl"
                >
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tutoring Options Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Online Biology Tuition Options
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Choose the tuition format that works best for your learning style and budget
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {tutoringOptions.map((option, index) => (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl bg-white p-8 shadow-xl ${index === 0 ? 'ring-2 ring-blue-500' : ''}`}
                >
                  {index === 0 && (
                    <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                      Most Popular
                    </span>
                  )}
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">{option.name}</h3>
                  <div className="mb-4 text-3xl font-bold text-blue-600">{option.price}</div>
                  <p className="mb-6 text-sm text-gray-500">Ideal for: {option.ideal}</p>
                  <ul className="mb-8 space-y-3">
                    {option.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-700">
                        <svg
                          className="mr-3 h-5 w-5 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/demo"
                    className="block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                  >
                    Start Free Demo
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Online Biology Tuition vs Home Tutor
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                See why more students are choosing online biology tuition over traditional home
                tutors
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="overflow-x-auto"
            >
              <table className="w-full min-w-[600px] rounded-xl bg-white shadow-lg">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="rounded-tl-xl p-4 text-left">Feature</th>
                    <th className="p-4 text-left">Online Tuition</th>
                    <th className="p-4 text-left">Home Tutor</th>
                    <th className="rounded-tr-xl p-4 text-left">Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={row.feature} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 font-medium text-gray-900">{row.feature}</td>
                      <td className="p-4 text-green-600">{row.online}</td>
                      <td className="p-4 text-gray-600">{row.home}</td>
                      <td className="p-4 font-medium text-blue-600">{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* NRI Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-600 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
                  For NRI Students
                </span>
                <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                  Online Biology Tuition for NRI Students
                </h2>
                <p className="mb-6 text-lg text-blue-100">
                  Special batches designed for Indian students living abroad. Get quality biology
                  tuition in your time zone.
                </p>
                <ul className="mb-8 space-y-4">
                  {[
                    'Timezone-adjusted class timings',
                    'English medium instruction',
                    'CBSE/ICSE curriculum',
                    'NEET preparation for medical aspirants',
                    'Weekend intensive batches',
                    'Recorded sessions for revision',
                  ].map((item) => (
                    <li key={item} className="flex items-center">
                      <svg
                        className="mr-3 h-5 w-5 text-blue-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {['UAE', 'USA', 'UK', 'Singapore', 'Australia', 'Canada'].map((country) => (
                    <span
                      key={country}
                      className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative h-[350px] w-full overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=350&fit=crop"
                    alt="NRI Student Online Biology Tuition"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Common questions about online biology tuition
              </p>
            </motion.div>

            <div className="mx-auto max-w-3xl space-y-4">
              {faqSchema.mainEntity.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl bg-white p-6 shadow-md"
                >
                  <h3 className="mb-3 text-lg font-bold text-gray-900">{faq.name}</h3>
                  <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Explore More Options
              </h2>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: '/online-biology-classes',
                  title: 'Online Biology Classes',
                  desc: 'Live interactive classes',
                },
                {
                  href: '/best-biology-teacher-online',
                  title: 'Best Biology Teacher',
                  desc: 'Learn from AIIMS expert',
                },
                {
                  href: '/best-online-biology-teacher-for-neet',
                  title: 'NEET Biology Teacher',
                  desc: 'NEET specialist',
                },
                {
                  href: '/biology-tutor-class-11-cbse',
                  title: 'Class 11 Biology',
                  desc: 'CBSE board preparation',
                },
                {
                  href: '/biology-tutor-class-12-cbse',
                  title: 'Class 12 Biology',
                  desc: 'Board + NEET prep',
                },
                {
                  href: '/neet-preparation',
                  title: 'NEET Preparation',
                  desc: 'Complete NEET course',
                },
                {
                  href: '/online-neet-coaching',
                  title: 'Online NEET Coaching',
                  desc: 'Full coaching package',
                },
                {
                  href: '/biology-classes',
                  title: 'Biology Classes',
                  desc: 'All biology programs',
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg border border-gray-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md"
                >
                  <h3 className="font-semibold text-gray-900">{link.title}</h3>
                  <p className="text-sm text-gray-500">{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Start Your Online Biology Tuition Today
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
                Join thousands of students learning biology online with personalized attention
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/demo"
                  className="rounded-lg bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
                >
                  Book Free Demo
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition hover:bg-white/10"
                >
                  View Fee Structure
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
