'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Phone,
  MapPin,
  Clock,
  Award,
  Users,
  CheckCircle,
  Star,
  Train,
  GraduationCap,
  Play,
  ExternalLink,
  ThumbsUp,
  MessageCircle,
  Building2,
  ArrowRight,
  Globe,
  Monitor,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - NEET Coaching Dwarka',
  description:
    'Best NEET biology coaching for Dwarka students. Expert AIIMS Trained faculty, proven 98% success rate, and comprehensive study material for NEET UG preparation. Online + Offline classes available.',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-dwarka',
  telephone: '+91-8826444334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rohini',
    addressRegion: 'Delhi',
    postalCode: '110085',
    addressCountry: 'IN',
  },
  areaServed: [
    'Dwarka Sector 1',
    'Dwarka Sector 2',
    'Dwarka Sector 3',
    'Dwarka Sector 4',
    'Dwarka Sector 5',
    'Dwarka Sector 6',
    'Dwarka Sector 7',
    'Dwarka Sector 8',
    'Dwarka Sector 9',
    'Dwarka Sector 10',
    'Dwarka Sector 11',
    'Dwarka Sector 12',
    'Dwarka Sector 13',
    'Dwarka Sector 14',
    'Dwarka Sector 19',
    'Dwarka Sector 21',
    'Dwarka Sector 22',
    'Dwarka Sector 23',
    'Uttam Nagar',
    'Janakpuri',
    'Najafgarh',
  ],
  sameAs: [
    'https://www.facebook.com/cerebrumbiologyacademy',
    'https://www.instagram.com/cerebrumbiologyacademy',
    'https://www.youtube.com/@cerebrumbiologyacademy',
    'https://www.youtube.com/@drshekharcsingh',
  ],
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which is the best NEET coaching in Dwarka?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cerebrum Biology Academy offers specialized NEET biology coaching for Dwarka students with 98% success rate. Our AIIMS Trained faculty and personalized approach have helped many Dwarka students score 650+ in NEET. We offer both online classes and offline batches at our Rohini center, accessible via Blue Line Metro in 25-35 minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can Dwarka students reach Cerebrum Biology Academy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Students from Dwarka can take the Blue Line Metro to Rajiv Chowk, then change to Yellow Line towards Samaypur Badli and get down at Rohini West. Our DC Chauk center is a 2-minute walk from Rohini West Metro. Total journey is approximately 25-35 minutes depending on your sector. Alternatively, join our popular online classes from home.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer online NEET classes for Dwarka students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We offer comprehensive online NEET Biology classes that are very popular with Dwarka students. Live interactive sessions with Dr. Shekhar C Singh, recorded lectures for revision, weekly tests, and personal mentoring - all from the comfort of your home. 40+ students from Dwarka are currently enrolled in our online program.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the success rate of Dwarka students at Cerebrum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Students from Dwarka have consistently achieved excellent results at Cerebrum Biology Academy. Our Dwarka students have secured admissions to AIIMS, MAMC, UCMS, LHMC, and other top medical colleges with scores ranging from 640-695 in NEET. Overall 94% of our students qualify NEET.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the fees for NEET coaching for Dwarka students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our comprehensive NEET biology course fee is Rs 75,000/year for Class 12 students and Rs 60,000/year for Class 11. We offer EMI options and scholarships up to 50% for deserving students. Online and offline fees are the same. Contact us at 88264-44334 for detailed fee structure.',
      },
    },
  ],
}

const dwarkaAreas = [
  { name: 'Dwarka Sector 4', distance: '30 min via Metro', description: 'Near Dwarka Mor Metro', link: '/neet-coaching-dwarka-sector-4' },
  { name: 'Dwarka Sector 6', distance: '28 min via Metro', description: 'Near Dwarka Sector 9 Metro', link: '/neet-coaching-dwarka-sector-6' },
  { name: 'Dwarka Sector 10', distance: '25 min via Metro', description: 'Direct Blue Line Access', link: '/neet-coaching-dwarka-sector-10' },
  { name: 'Dwarka Sector 12', distance: '30 min via Metro', description: 'Near Dwarka Sector 14 Metro', link: '/neet-coaching-dwarka-sector-12' },
  { name: 'Dwarka Sector 21', distance: '35 min via Metro', description: 'Near IGI Airport', link: '/neet-coaching-dwarka-sector-21' },
  { name: 'Dwarka Sector 22', distance: '35 min via Metro', description: 'Near Dwarka Sector 21 Metro', link: '/neet-coaching-dwarka-sector-22' },
  { name: 'Uttam Nagar', distance: '35 min via Metro', description: 'Blue Line Connection', link: '/neet-coaching-uttam-nagar' },
  { name: 'Janakpuri', distance: '30 min via Metro', description: 'Magenta + Yellow Line', link: '/neet-coaching-janakpuri' },
]

const features = [
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Learn from experienced NEET biology experts with 15+ years experience',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Limited batch size of 15-20 students for personalized attention',
  },
  {
    icon: Globe,
    title: 'Online + Offline',
    description: 'Choose online classes from home or attend at Rohini center',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Weekend batches and multiple time slots for Dwarka students',
  },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Dwarka Sector 6',
    school: 'DAV Public School, Dwarka',
    score: '672/720',
    college: 'MAMC Delhi',
    mode: 'Online',
    quote: 'The online classes were amazing! I saved 2 hours daily on commute and could revise anytime with recorded lectures. Dr. Shekhar Sir explains concepts so clearly. From 510 to 672 - never thought it was possible!',
  },
  {
    name: 'Arjun Malhotra',
    location: 'Dwarka Sector 12',
    school: 'DPS Dwarka',
    score: '658/720',
    college: 'UCMS Delhi',
    mode: 'Hybrid',
    quote: 'I chose hybrid mode - weekends at Rohini center, weekdays online. The metro journey was worth it for the quality of teaching. Small batches meant I could ask doubts anytime. Best decision of my life!',
  },
  {
    name: 'Sneha Gupta',
    location: 'Dwarka Sector 21',
    school: 'Ryan International',
    score: '645/720',
    college: 'LHMC Delhi',
    mode: 'Offline',
    quote: 'Traveling from Sector 21 was easy via metro. Used the 35-minute journey to revise notes. The personal attention and doubt sessions made all the difference. AIIMS faculty teaching is unmatched!',
  },
]

const handleWhatsAppClick = (location: string) => {
  trackAndOpenWhatsApp({
    source: `neet-coaching-dwarka-${location.toLowerCase().replace(/\s+/g, '-')}`,
    message: `Hi, I'm from ${location} and interested in NEET Biology coaching. Please share details about online and offline options.`,
    campaign: 'dwarka-location',
  })
}

export default function NEETCoachingDwarkaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">NEET Coaching for Dwarka Students</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Best NEET Coaching in Dwarka - Expert Biology Classes
              </h1>

              <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto">
                Join Cerebrum Biology Academy for specialized NEET biology coaching. Serving all Dwarka sectors
                with <strong>Online Classes</strong> and <strong>Offline Batches</strong> at our Rohini center (25-35 min via Blue Line Metro).
              </p>

              <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                <Monitor className="w-5 h-5 mr-2 text-green-300" />
                <span className="text-green-200 font-medium">40+ Dwarka students enrolled in Online Mode</span>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => handleWhatsAppClick('Dwarka')}
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp: 88264-44334
                </button>
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Book Free Demo Class
                </Link>
                <Link
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Distance from Rohini Info */}
        <section className="py-8 bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <Train className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700"><strong>25-35 min</strong> from Rohini DC Chauk Center via Metro</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-green-600" />
                <span className="text-gray-700"><strong>Online Classes</strong> available - Study from Home</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-red-600" />
                <span className="text-gray-700"><strong>2-min walk</strong> from Rohini West Metro</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Dwarka Students Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Why Dwarka Students Choose Cerebrum Biology Academy
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Convenient Blue Line Metro connectivity and flexible online classes make it easy for Dwarka
                students to access quality NEET coaching with AIIMS Trained faculty.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Free NEET Tools Section */}
        <section className="py-12 bg-gradient-to-br from-indigo-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Free NEET Preparation Tools for Dwarka Students
              </h2>
              <p className="text-gray-600">Boost your preparation with our AI-powered tools - 100% Free</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Link href="/neet-rank-predictor" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-gray-900 mb-2">NEET Rank Predictor</h3>
                <p className="text-sm text-gray-600">Predict your All India Rank based on expected score</p>
              </Link>
              <Link href="/neet-college-predictor" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-3xl mb-3">🏥</div>
                <h3 className="font-bold text-gray-900 mb-2">NEET College Predictor</h3>
                <p className="text-sm text-gray-600">Find medical colleges based on your NEET rank</p>
              </Link>
              <Link href="/neet-biology-mcq" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="font-bold text-gray-900 mb-2">NEET Biology MCQs</h3>
                <p className="text-sm text-gray-600">Practice chapter-wise MCQs with detailed solutions</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Dwarka Sectors Coverage */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                NEET Coaching for All Dwarka Sectors
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We serve students from every sector in Dwarka. Click on your area to learn about specific connectivity and batches.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dwarkaAreas.map((area, index) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={area.link}
                    className="block bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{area.name}</h3>
                        <p className="text-blue-600 text-sm font-medium">{area.distance}</p>
                        <p className="text-gray-500 text-xs mt-1">{area.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Train className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Metro Route from Dwarka to Rohini Center</h3>
                  <p className="text-gray-600">
                    <strong>Blue Line:</strong> Any Dwarka Sector Metro &rarr; Rajiv Chowk (Interchange)
                    <br />
                    <strong>Yellow Line:</strong> Rajiv Chowk &rarr; Rohini West
                    <br />
                    <strong>Walk:</strong> 2-minute walk to Cerebrum Academy, DC Chauk
                    <br />
                    <span className="text-blue-600 font-medium">
                      Total journey: 25-35 minutes from most Dwarka sectors
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Success Stories from Dwarka Students
              </h2>
              <p className="text-gray-600">Real results from students across Dwarka sectors</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                      {testimonial.score}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      testimonial.mode === 'Online'
                        ? 'bg-blue-100 text-blue-700'
                        : testimonial.mode === 'Hybrid'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-orange-100 text-orange-700'
                    }`}>
                      {testimonial.mode}
                    </span>
                  </div>
                  <blockquote className="text-gray-700 text-sm mb-4 italic">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.school}</p>
                    <p className="text-blue-600 text-xs">{testimonial.location} | {testimonial.college}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Watch Success Stories from Our Students
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear directly from NEET achievers about their journey with Cerebrum Biology Academy
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  youtubeId: 'bk6wQCh6b9w',
                  student: 'Sadhna Sirin',
                  score: '695/720',
                  achievement: 'Delhi-NCR Topper NEET 2023',
                },
                {
                  youtubeId: 'NfhkGqOQXzk',
                  student: 'Abhisek',
                  score: 'AFMC Selection',
                  achievement: 'Armed Forces Medical College',
                },
                {
                  youtubeId: 't5F8RBuHITM',
                  student: 'Nishita',
                  score: 'Medical College',
                  achievement: '6-Month Intensive Program',
                },
              ].map((video, index) => (
                <motion.div
                  key={video.youtubeId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <div className="relative aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={`${video.student} NEET Success Story`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-1">{video.student}</h3>
                    <p className="text-green-600 font-semibold text-sm">{video.score}</p>
                    <p className="text-gray-600 text-xs mt-1">{video.achievement}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <a
                href="https://www.youtube.com/@cerebrumbiologyacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch More on YouTube
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Google Reviews */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Trusted by 847+ Verified Google Reviews
                </h2>
                <p className="text-gray-600">
                  See what parents and students say about Cerebrum Biology Academy
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-xl p-8 border border-gray-100"
                >
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">4.9</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 font-medium mb-4">Based on 847+ reviews</p>
                    <a
                      href="https://www.google.com/search?q=cerebrum+biology+academy+reviews"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      Read Reviews on Google
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-xl p-6 border border-gray-100"
                >
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    Recent Reviews from Dwarka
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        text: 'Best NEET Biology coaching! Online classes are excellent. My daughter from Dwarka Sector 10 improved from 490 to 645.',
                        author: 'Parent - Dwarka Sector 10',
                        rating: 5,
                      },
                      {
                        text: 'The hybrid mode is perfect for Dwarka students. Weekend offline + weekday online. Highly recommend!',
                        author: 'Student - Dwarka Sector 6',
                        rating: 5,
                      },
                    ].map((review, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="flex gap-1 mb-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-700 italic mb-1">
                          &quot;{review.text}&quot;
                        </p>
                        <p className="text-xs text-gray-500">- {review.author}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions - NEET Coaching Dwarka
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqStructuredData.mainEntity.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md border border-gray-100 p-6"
                >
                  <h3 className="font-bold text-gray-800 mb-3 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    {faq.name}
                  </h3>
                  <p className="text-gray-600 ml-8">{faq.acceptedAnswer.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Award,
                  label: '15+ Years Experience',
                  sublabel: 'Since 2009',
                  color: 'text-blue-600',
                },
                {
                  icon: Users,
                  label: '98% Success Rate',
                  sublabel: 'NEET Qualified',
                  color: 'text-green-600',
                },
                {
                  icon: Star,
                  label: '4.9 Google Rating',
                  sublabel: '847+ Reviews',
                  color: 'text-yellow-600',
                },
                {
                  icon: GraduationCap,
                  label: 'AIIMS Trained Faculty',
                  sublabel: 'Expert Teachers',
                  color: 'text-purple-600',
                },
              ].map((badge, index) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <badge.icon className={`w-8 h-8 mx-auto mb-2 ${badge.color}`} />
                  <div className="font-bold text-gray-900 text-sm">{badge.label}</div>
                  <div className="text-xs text-gray-600">{badge.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Start Your NEET Journey from Dwarka Today!</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Choose Online Classes for convenience or Hybrid Mode for the best of both. Join the growing community of successful NEET aspirants from Dwarka. Book your free demo class today!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => handleWhatsAppClick('Dwarka')}
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp: 88264-44334
                </button>
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Book Free Demo Class
                </Link>
                <Link
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
                >
                  <Phone className="w-5 h-5" />
                  Call: 8826444334
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Internal Links to Nearby Areas */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              NEET Coaching in Nearby Areas
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                { name: 'Janakpuri', link: '/neet-coaching-janakpuri' },
                { name: 'Uttam Nagar', link: '/neet-coaching-uttam-nagar' },
                { name: 'Vikaspuri', link: '/neet-coaching-vikas-puri' },
                { name: 'Punjabi Bagh', link: '/neet-coaching-punjabi-bagh' },
                { name: 'Rajouri Garden', link: '/neet-coaching-rajouri-garden' },
                { name: 'Tagore Garden', link: '/neet-coaching-tagore-garden' },
                { name: 'Pashchim Vihar', link: '/neet-coaching-paschim-vihar' },
                { name: 'Rohini', link: '/neet-coaching-rohini' },
              ].map((area) => (
                <Link
                  key={area.name}
                  href={area.link}
                  className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
