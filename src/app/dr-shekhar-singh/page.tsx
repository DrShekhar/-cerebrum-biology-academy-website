'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  GraduationCap,
  BookOpen,
  Trophy,
  Heart,
  Target,
  Sparkles,
  Quote,
  School,
  TrendingUp,
  CheckCircle,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Home,
  ChevronRight,
  CheckCircle2,
  Award,
  Users,
  Clock,
  MessageCircle,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Shield,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { facultyMembers } from '@/data/faculty'
import { useState, useEffect } from 'react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

export default function DrShekharSinghPage() {
  const drShekhar = facultyMembers[0]
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

  const testimonials = [
    {
      name: 'Sadhna Sirin',
      score: 695,
      rank: 'AIR 245',
      college: 'AIIMS Delhi',
      text: 'Dr. Shekhar Sir made Biology so clear and interesting. His unique teaching methods helped me score 695 marks in NEET. The personalized attention and conceptual clarity I received was exceptional.',
      rating: 5,
      image: '/testimonials/sadhna.jpg',
      year: '2023',
    },
    {
      name: 'Priya Sehgal',
      score: 680,
      rank: 'AIR 312',
      college: 'JIPMER Puducherry',
      text: "Perfect 360/360 in Biology! Dr. Singh's teaching methodology is unmatched. His focus on concept building rather than rote learning made all the difference.",
      rating: 5,
      image: '/testimonials/priya.jpg',
      year: '2023',
    },
    {
      name: 'Rahul Verma',
      score: 670,
      rank: 'AIR 421',
      college: 'MAMC Delhi',
      text: 'The personalized mentoring and doubt clearing sessions were invaluable. Dr. Shekhar Sir not only teaches Biology but also builds confidence and exam temperament.',
      rating: 5,
      image: '/testimonials/rahul.jpg',
      year: '2024',
    },
    {
      name: 'Ananya Patel',
      score: 665,
      rank: 'AIR 568',
      college: 'GMC Nagpur',
      text: "Dr. Singh's classes were transformative. His ability to simplify complex topics and make them interesting is remarkable. Highly recommend to all NEET aspirants.",
      rating: 5,
      image: '/testimonials/ananya.jpg',
      year: '2024',
    },
    {
      name: 'Kartik Sharma',
      score: 658,
      rank: 'AIR 689',
      college: 'BJ Medical College, Pune',
      text: 'From struggling with Biology to scoring 355/360, my journey with Dr. Shekhar Sir has been incredible. His teaching style is practical, engaging, and result-oriented.',
      rating: 5,
      image: '/testimonials/kartik.jpg',
      year: '2024',
    },
  ]

  const recentResults = [
    {
      name: 'Sadhna Sirin',
      score: 695,
      rank: 'AIR 245',
      college: 'AIIMS Delhi',
      year: '2023',
      biologyScore: '360/360',
    },
    {
      name: 'Priya Sehgal',
      score: 680,
      rank: 'AIR 312',
      college: 'JIPMER Puducherry',
      year: '2023',
      biologyScore: '360/360',
    },
    {
      name: 'Rahul Verma',
      score: 670,
      rank: 'AIR 421',
      college: 'MAMC Delhi',
      year: '2024',
      biologyScore: '355/360',
    },
    {
      name: 'Ananya Patel',
      score: 665,
      rank: 'AIR 568',
      college: 'GMC Nagpur',
      year: '2024',
      biologyScore: '352/360',
    },
    {
      name: 'Kartik Sharma',
      score: 658,
      rank: 'AIR 689',
      college: 'BJ Medical College, Pune',
      year: '2024',
      biologyScore: '355/360',
    },
    {
      name: 'Neha Gupta',
      score: 652,
      rank: 'AIR 742',
      college: 'KGMU Lucknow',
      year: '2024',
      biologyScore: '348/360',
    },
  ]

  const trustBadges = [
    {
      icon: Award,
      label: 'AIIMS Alumni',
      description: 'Top Medical Institution',
    },
    {
      icon: Users,
      label: '1,50,000+ Students',
      description: 'Successfully Mentored',
    },
    {
      icon: Trophy,
      label: '98% Success Rate',
      description: 'Consistently High',
    },
    {
      icon: Clock,
      label: '14+ Years',
      description: 'Teaching Experience',
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowFloatingCTA(true)
      } else {
        setShowFloatingCTA(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. Shekhar C Singh',
    jobTitle: 'Director & Chief Educator',
    description:
      'AIIMS faculty with 15+ years of experience, mentored 1,50,000+ NEET aspirants with 98% success rate',
    image:
      'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=571,fit=crop/meP3n6VKelS9LnOn/img-0034-meP3pJDRGxsyRZyy.jpg',
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'AIIMS New Delhi',
        url: 'https://www.aiims.edu',
      },
    ],
    knowsAbout: [
      'NEET Biology',
      'Medical Education',
      'Biology Teaching',
      'NEET Preparation',
      'Student Mentoring',
    ],
    email: 'info@cerebrumbiologyacademy.com',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      addressCountry: 'IN',
    },
  }

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
        name: 'Faculty',
        item: 'https://cerebrumbiologyacademy.com/faculty',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Dr. Shekhar C Singh',
        item: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <nav
          className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
          aria-label="Breadcrumb"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center space-x-2 text-sm" role="list">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 rounded"
                  aria-label="Go to home page"
                >
                  <Home className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">Home</span>
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-600 mx-2" aria-hidden="true" />
                <Link
                  href="/faculty"
                  className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 rounded px-1"
                  aria-label="Go to faculty page"
                >
                  Faculty
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-600 mx-2" aria-hidden="true" />
                <span className="text-white font-medium" aria-current="page">
                  Dr. Shekhar C Singh
                </span>
              </li>
            </ol>
          </div>
        </nav>

        <section
          className="relative pt-28 pb-16 px-6 bg-[#e8ede8] overflow-hidden"
          role="region"
          aria-label="Dr. Shekhar Singh profile overview"
        >
          <div className="absolute inset-0 opacity-5" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3d4d3d] to-[#4a5d4a]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div className="relative w-64 h-64 mx-auto md:mx-0">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                    {drShekhar.image ? (
                      <Image
                        src={drShekhar.image}
                        alt="Dr. Shekhar C Singh, Director of Cerebrum Biology Academy, AIIMS New Delhi Alumnus with 15+ years of NEET teaching experience"
                        fill
                        sizes="(max-width: 768px) 256px, 320px"
                        className="object-cover object-top"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-[#3d4d3d] flex items-center justify-center">
                        <GraduationCap
                          className="w-24 h-24 text-white"
                          aria-hidden="true"
                          role="img"
                          aria-label="Graduation cap icon"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0"
                  role="list"
                  aria-label="Key statistics"
                >
                  <div
                    className="bg-white rounded-xl p-4 text-center border border-[#e8ede8] shadow-lg shadow-[#3d4d3d]/10"
                    role="listitem"
                  >
                    <div className="text-3xl font-bold text-[#3d4d3d]" aria-label="14 plus years">
                      14+
                    </div>
                    <div className="text-xs text-gray-600">Years Exp.</div>
                  </div>
                  <div
                    className="bg-white rounded-xl p-4 text-center border border-[#e8ede8] shadow-lg shadow-[#3d4d3d]/10"
                    role="listitem"
                  >
                    <div className="text-3xl font-bold text-[#4a5d4a]" aria-label="98 percent">
                      98%
                    </div>
                    <div className="text-xs text-gray-600">Success</div>
                  </div>
                  <div
                    className="bg-white rounded-xl p-4 text-center border border-[#e8ede8] shadow-lg shadow-[#3d4d3d]/10"
                    role="listitem"
                  >
                    <div
                      className="text-3xl font-bold text-[#3d4d3d]"
                      aria-label="150000 plus students"
                    >
                      1,50,000+
                    </div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                </div>
              </div>

              <div>
                <motion.div
                  className="inline-flex items-center bg-[#3d4d3d] text-white px-4 py-2 rounded-full mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  role="status"
                  aria-label="Position: Director and Chief Educator"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-white" aria-hidden="true" />
                  <span className="text-white text-sm font-semibold">
                    Director & Chief Educator
                  </span>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-gray-900">
                  Dr. Shekhar C Singh
                </h1>

                <div className="flex items-center space-x-2 mb-6">
                  <School
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#4a5d4a]"
                    aria-hidden="true"
                    role="img"
                    aria-label="Education icon"
                  />
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium">
                    {drShekhar.qualification}
                  </p>
                </div>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
                  {drShekhar.bio}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6" role="group">
                  <Link
                    href="/demo-booking"
                    className="inline-flex items-center justify-center bg-[#3d4d3d] hover:bg-[#4a5d4a] text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-[#3d4d3d]/20 transition-all min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[#3d4d3d] focus:ring-offset-2"
                    aria-label="Book a demo class with Dr. Shekhar Singh"
                  >
                    <BookOpen className="w-5 h-5 mr-2" aria-hidden="true" />
                    Book Demo Class
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-[#3d4d3d] font-semibold px-8 py-4 rounded-xl border border-[#3d4d3d]/30 transition-all min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[#3d4d3d] focus:ring-offset-2"
                    aria-label="Contact Dr. Shekhar Singh"
                  >
                    <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                    Contact Dr. Shekhar
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust Banner */}
        <section className="py-6 bg-[#3d4d3d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <badge.icon className="w-6 h-6 text-white/80" aria-hidden="true" />
                  <div>
                    <div className="text-white font-semibold text-sm">{badge.label}</div>
                    <div className="text-white/60 text-xs">{badge.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="py-12 md:py-16 lg:py-20 bg-white"
          role="region"
          aria-labelledby="teaching-philosophy-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-[#e8ede8] rounded-3xl p-8 md:p-12 border border-[#3d4d3d]/10"
            >
              <div className="flex items-start space-x-4 mb-6">
                <Quote className="w-12 h-12 text-[#3d4d3d] flex-shrink-0" aria-hidden="true" />
                <div>
                  <h2
                    id="teaching-philosophy-heading"
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    Teaching Philosophy
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed italic">
                    "{drShekhar.teachingStyle}"
                  </p>
                </div>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6" role="list">
                <div className="flex items-start space-x-3" role="listitem">
                  <div className="w-10 h-10 bg-[#3d4d3d] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                      role="img"
                      aria-label="Heart icon"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Student-Centric</h3>
                    <p className="text-sm text-gray-600">
                      Every student receives personalized attention and mentorship
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3" role="listitem">
                  <div className="w-10 h-10 bg-[#3d4d3d] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                      role="img"
                      aria-label="Target icon"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Result-Oriented</h3>
                    <p className="text-sm text-gray-600">
                      Proven methodology that converts underperformers to high achievers
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3" role="listitem">
                  <div className="w-10 h-10 bg-[#3d4d3d] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                      role="img"
                      aria-label="Sparkles icon"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Beyond Textbooks</h3>
                    <p className="text-sm text-gray-600">
                      Holistic development including life skills and character building
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          className="py-12 md:py-16 lg:py-20 bg-[#e8ede8]"
          role="region"
          aria-labelledby="achievements-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-[#3d4d3d] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Trophy className="w-4 h-4 mr-2" aria-hidden="true" />
                Remarkable Achievements
              </div>
              <h2
                id="achievements-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Track Record of Excellence
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Over 14 years of transforming NEET aspirants into medical college students
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="list">
              {drShekhar.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg shadow-[#3d4d3d]/10 border border-[#e8ede8] hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  role="listitem"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-10 h-10 bg-[#3d4d3d] rounded-xl flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-800 font-medium leading-relaxed">{achievement}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 bg-[#3d4d3d] rounded-3xl p-8 text-white text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              role="complementary"
              aria-label="Success rate statistics"
            >
              <div className="max-w-4xl mx-auto">
                <div
                  className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
                  aria-label="98 percent success rate"
                >
                  {drShekhar.successRate}%
                </div>
                <p className="text-xl sm:text-2xl font-semibold mb-2">NEET Success Rate</p>
                <p className="text-white/80 text-lg">
                  Consistently outperforming national average by 4x
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white" role="region" aria-labelledby="credentials-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-[#3d4d3d] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Shield className="w-4 h-4 mr-2" aria-hidden="true" />
                Credentials & Recognition
              </div>
              <h2
                id="credentials-heading"
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Trusted Excellence in NEET Coaching
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Recognized expertise and proven track record in medical entrance coaching
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                className="bg-white rounded-2xl p-8 border border-[#e8ede8] shadow-lg shadow-[#3d4d3d]/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 bg-[#3d4d3d] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AIIMS Alumni</h3>
                <p className="text-gray-600">
                  Graduated from India&apos;s premier medical institution
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-8 border border-[#e8ede8] shadow-lg shadow-[#3d4d3d]/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 bg-[#4a5d4a] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Academic Leadership</h3>
                <p className="text-gray-600">Former Academic Head at Narayana Group</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-8 border border-[#e8ede8] shadow-lg shadow-[#3d4d3d]/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 bg-[#5a6d5a] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Top Rank Producer</h3>
                <p className="text-gray-600">Students consistently rank in top 1000 AIR</p>
              </motion.div>
            </div>

            <motion.div
              className="bg-[#e8ede8] rounded-2xl p-8 border border-[#3d4d3d]/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Recognition & Achievements
                </h3>
                <p className="text-gray-600">Pioneering excellence in NEET Biology education</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-white rounded-xl p-4 shadow-sm border border-[#e8ede8]">
                  <div className="w-12 h-12 bg-[#3d4d3d] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Founder of Multiple Academies</h4>
                    <p className="text-sm text-gray-600">
                      Delhi Science Foundation & Quark Education
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-white rounded-xl p-4 shadow-sm border border-[#e8ede8]">
                  <div className="w-12 h-12 bg-[#4a5d4a] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Innovative Teaching Methods</h4>
                    <p className="text-sm text-gray-600">
                      Developed unique NEET preparation strategies
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-white rounded-xl p-4 shadow-sm border border-[#e8ede8]">
                  <div className="w-12 h-12 bg-[#5a6d5a] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mentored 1,50,000+ Students</h4>
                    <p className="text-sm text-gray-600">To top medical colleges across India</p>
                  </div>
                </div>
                <div className="flex items-center bg-white rounded-xl p-4 shadow-sm border border-[#e8ede8]">
                  <div className="w-12 h-12 bg-[#3d4d3d] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">98% Success Rate</h4>
                    <p className="text-sm text-gray-600">
                      Consistently high student selection rate
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          className="py-16 bg-[#e8ede8]"
          role="region"
          aria-labelledby="student-results-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-[#3d4d3d] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <CheckCircle2 className="w-4 h-4 mr-2" aria-hidden="true" />
                Recent Success Stories
              </div>
              <h2
                id="student-results-heading"
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Our Students, Our Pride
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Real students, real results. See how Dr. Shekhar's mentorship transforms NEET
                aspirations into reality
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentResults.map((result, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg shadow-[#3d4d3d]/10 border border-[#e8ede8] hover:shadow-2xl transition-all hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{result.name}</h3>
                      <p className="text-sm text-gray-600">NEET {result.year}</p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-[#3d4d3d] flex-shrink-0" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">NEET Score:</span>
                      <span className="font-bold text-[#3d4d3d] text-lg">{result.score}/720</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">AIR:</span>
                      <span className="font-bold text-gray-900">{result.rank}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Biology:</span>
                      <span className="font-bold text-[#4a5d4a]">{result.biologyScore}</span>
                    </div>
                    <div className="pt-3 border-t border-[#e8ede8]">
                      <div className="flex items-start">
                        <School className="w-4 h-4 text-[#3d4d3d] mr-2 mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-700 font-medium">{result.college}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 bg-white rounded-2xl p-8 border border-[#e8ede8] shadow-lg shadow-[#3d4d3d]/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {trustBadges.map((badge, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-[#3d4d3d] rounded-xl flex items-center justify-center mb-3">
                        <badge.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="font-bold text-gray-900 text-lg">{badge.label}</div>
                      <div className="text-sm text-gray-600">{badge.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white" role="region" aria-labelledby="testimonials-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-[#3d4d3d] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Quote className="w-4 h-4 mr-2" aria-hidden="true" />
                Student Testimonials
              </div>
              <h2
                id="testimonials-heading"
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                What Our Students Say
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hear directly from students who achieved their NEET dreams under Dr. Shekhar's
                guidance
              </p>
            </motion.div>

            <div className="relative max-w-5xl mx-auto">
              <div className="overflow-hidden">
                <motion.div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="bg-[#e8ede8] rounded-3xl p-8 md:p-12 border border-[#3d4d3d]/10">
                        <div className="flex items-center justify-center mb-6">
                          <div className="flex space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </div>

                        <Quote
                          className="w-12 h-12 text-[#3d4d3d] mx-auto mb-4"
                          aria-hidden="true"
                        />

                        <blockquote className="text-xl md:text-2xl text-gray-800 text-center italic mb-6 leading-relaxed">
                          <p>"{testimonial.text}"</p>
                        </blockquote>

                        <div className="text-center">
                          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md">
                            <Trophy className="w-5 h-5 text-yellow-500 mr-2" aria-hidden="true" />
                            <span className="font-semibold text-gray-900">{testimonial.name}</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-gray-600">
                              {testimonial.score}/720 NEET {testimonial.year}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-3">
                            {testimonial.rank} • {testimonial.college}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3d4d3d]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3d4d3d]"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-700" />
              </button>

              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial
                        ? 'bg-[#3d4d3d] w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#e8ede8]" role="region" aria-labelledby="journey-heading">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-[#3d4d3d] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <TrendingUp className="w-4 h-4 mr-2" aria-hidden="true" />
                Professional Journey
              </div>
              <h2
                id="journey-heading"
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                A Career Dedicated to Education
              </h2>
            </motion.div>

            <div className="space-y-8" role="list">
              {[
                {
                  year: '2010',
                  title: 'Graduated from AIIMS New Delhi',
                  description:
                    "Completed medical education from one of India's most prestigious institutions",
                  icon: GraduationCap,
                  color: 'bg-[#3d4d3d]',
                },
                {
                  year: '2011-2015',
                  title: 'Founded Delhi Science Foundation & Quark Education',
                  description:
                    'Pioneered innovative teaching methodologies for NEET Biology preparation',
                  icon: Sparkles,
                  color: 'bg-[#4a5d4a]',
                },
                {
                  year: '2015-2020',
                  title: 'Academic Head at Narayana Group',
                  description:
                    'Led academic programs and mentored faculty across multiple campuses',
                  icon: School,
                  color: 'bg-[#5a6d5a]',
                },
                {
                  year: '2020-Present',
                  title: 'Founded Cerebrum Biology Academy',
                  description: 'Established premier NEET Biology coaching with 98% success rate',
                  icon: Trophy,
                  color: 'bg-[#3d4d3d]',
                },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-start space-x-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  role="listitem"
                >
                  <div
                    className={`w-16 h-16 ${milestone.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#3d4d3d]/20`}
                    aria-hidden="true"
                  >
                    <milestone.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg shadow-[#3d4d3d]/10 border border-[#e8ede8]">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      <time className="text-sm font-semibold text-gray-500">{milestone.year}</time>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="py-16 bg-[#3d4d3d] text-white"
          role="region"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Start Your NEET Journey?
                </h2>
                <p className="text-xl text-white/80 mb-4">
                  Book a personal consultation with Dr. Shekhar and experience the teaching that has
                  transformed 1,50,000+ students
                </p>
                <div className="inline-flex items-center bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 mr-2 text-white/80" />
                  <span className="text-white/90 text-sm font-medium">
                    Response Time: Within 24 hours
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#4a5d4a] rounded-xl flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Book 1-on-1 Session</h3>
                      <p className="text-sm text-white/60">Personal mentoring available</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">
                    Get personalized guidance and mentorship directly from Dr. Shekhar. Limited
                    slots available.
                  </p>
                  <Link
                    href="/demo-booking"
                    className="inline-flex items-center justify-center w-full bg-white hover:bg-gray-100 text-[#3d4d3d] font-bold px-6 py-3 rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Session
                  </Link>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#4a5d4a] rounded-xl flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">WhatsApp Quick Connect</h3>
                      <p className="text-sm text-white/60">Instant response guaranteed</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">
                    Have questions? Connect with us on WhatsApp for instant answers and course
                    details.
                  </p>
                  <button
                    onClick={async () => {
                      await trackAndOpenWhatsApp({
                        source: 'dr-shekhar-singh-cta',
                        message:
                          'Hi, I would like to know more about NEET Biology coaching with Dr. Shekhar Singh',
                        campaign: 'faculty-page',
                      })
                    }}
                    className="inline-flex items-center justify-center w-full bg-white hover:bg-gray-100 text-[#3d4d3d] font-bold px-6 py-3 rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat on WhatsApp
                  </button>
                </motion.div>
              </div>

              <div className="text-center mb-8">
                <Link
                  href="/demo-booking"
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-[#3d4d3d] font-bold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl shadow-2xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 text-base sm:text-lg w-full sm:w-auto"
                >
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">Book Free Demo</span>
                </Link>
              </div>

              <div
                className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-gray-300"
                role="list"
                aria-label="Contact information"
              >
                <div className="flex items-center" role="listitem">
                  <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                  <a
                    href="tel:+918826444334"
                    className="hover:text-white transition-colors focus:outline-none focus:underline"
                    aria-label="Call us at +91 88264 44334"
                  >
                    +91 88264 44334
                  </a>
                </div>
                <div className="flex items-center" role="listitem">
                  <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
                  <a
                    href="mailto:info@cerebrumbiologyacademy.com"
                    className="hover:text-white transition-colors focus:outline-none focus:underline"
                    aria-label="Email us at info@cerebrumbiologyacademy.com"
                  >
                    info@cerebrumbiologyacademy.com
                  </a>
                </div>
                <div className="flex items-center" role="listitem">
                  <MapPin className="w-5 h-5 mr-2" aria-hidden="true" />
                  <span>Rohini, Gurugram, South Delhi</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {showFloatingCTA && (
          <motion.div
            className="fixed bottom-8 right-8 z-50"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/demo-booking"
              className="flex items-center gap-3 bg-[#4a5d4a] text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 group"
              aria-label="Book a demo class"
            >
              <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <div className="flex flex-col">
                <span className="font-bold text-sm">Book Demo Class</span>
                <span className="text-xs text-green-50">Limited Slots Available</span>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </>
  )
}
