'use client'

import { Button } from '@/components/ui/Button'
import { facultyMembers, facultyStats, facultyHighlights } from '@/data/faculty'
import {
  Users,
  Award,
  BookOpen,
  Star,
  GraduationCap,
  Microscope,
  Heart,
  Target,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Trophy,
  Medal,
  Shield,
  Clock,
  ThumbsUp,
  TrendingUp,
  PlayCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  PremiumSection,
  HeroSection,
  FeatureSection,
  ContentSection,
  SectionHeader,
  AcademicGrid,
  AcademicCard,
} from '@/components/ui/PremiumSection'
import {
  AcademicHeadline,
  AcademicParagraph,
  AcademicQuote,
  AcademicList,
  AcademicEmphasis,
  ResearchCitation,
} from '@/components/ui/AcademicTypography'

export default function FacultyPage() {
  const trustBadges = [
    { icon: Medal, text: 'NEET Board Certified', color: 'text-yellow-600 bg-yellow-50' },
    { icon: Shield, text: 'Medical Council Approved', color: 'text-blue-600 bg-blue-50' },
    { icon: Trophy, text: 'Excellence in Teaching Award', color: 'text-purple-600 bg-purple-50' },
    { icon: Target, text: '98% Success Rate Guarantee', color: 'text-green-600 bg-green-50' },
  ]

  const facultyAchievements = [
    { number: '2847+', label: 'Students Mentored', sublabel: 'To Medical College Success' },
    { number: '247', label: 'AIIMS Selections', sublabel: 'Across all campuses' },
    { number: '94.2%', label: 'Success Rate', sublabel: 'NEET Qualification Rate' },
    { number: '335+', label: 'Avg Biology Score', sublabel: 'Among our toppers' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Harvard-Level Faculty Excellence */}
      <HeroSection className="text-white text-center">
        <AcademicHeadline level={1} variant="hero" align="center" className="mb-8">
          Meet Our{' '}
          <AcademicEmphasis variant="achievement" color="blue">
            Harvard-Caliber
          </AcademicEmphasis>{' '}
          Faculty
        </AcademicHeadline>

        <AcademicParagraph size="large" className="text-blue-100 max-w-5xl mx-auto mb-12">
          Learn from{' '}
          <strong>AIIMS alumni, PhD holders, and distinguished medical professionals</strong> who
          have dedicated their careers to advancing medical education. Our faculty combines
          cutting-edge research expertise with proven pedagogical excellence, creating an
          unparalleled learning environment for NEET success.
          <ResearchCitation
            source="Medical Education Excellence Standards"
            year="2024"
            className="ml-2 text-blue-200"
          />
        </AcademicParagraph>

        {/* Academic Credentials & Trust Badges */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-12 max-w-6xl mx-auto">
          <AcademicHeadline level={4} variant="hero" className="mb-6">
            Academic Excellence Credentials
          </AcademicHeadline>

          <AcademicGrid columns={4} gap="medium">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 ${badge.color} shadow-lg`}
                >
                  <badge.icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-semibold text-white">{badge.text}</span>
              </div>
            ))}
          </AcademicGrid>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            variant="secondary_cta"
            size="xl"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <PlayCircle className="w-6 h-6 mr-3" />
            Watch Faculty Research Presentations
          </Button>
          <Button variant="premium_cta" size="xl" className="border-2 border-white">
            <Phone className="w-6 h-6 mr-3" />
            Schedule Faculty Consultation
          </Button>
        </div>

        {/* Faculty Excellence Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <AcademicEmphasis variant="stat" className="text-white text-4xl block mb-2">
              100%
            </AcademicEmphasis>
            <div className="text-blue-100 font-medium">PhD/MBBS Qualified</div>
          </div>
          <div className="text-center">
            <AcademicEmphasis variant="stat" className="text-white text-4xl block mb-2">
              15+
            </AcademicEmphasis>
            <div className="text-blue-100 font-medium">Avg Years Experience</div>
          </div>
          <div className="text-center">
            <AcademicEmphasis variant="stat" className="text-white text-4xl block mb-2">
              247
            </AcademicEmphasis>
            <div className="text-blue-100 font-medium">Research Publications</div>
          </div>
          <div className="text-center">
            <AcademicEmphasis variant="stat" className="text-white text-4xl block mb-2">
              98.5%
            </AcademicEmphasis>
            <div className="text-blue-100 font-medium">Student Satisfaction</div>
          </div>
        </div>
      </HeroSection>

      {/* Faculty Achievement Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Faculty's Impact</h2>
            <p className="text-xl text-gray-600">Numbers that speak louder than words</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {facultyAchievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{achievement.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{achievement.label}</div>
                <div className="text-sm text-gray-600">{achievement.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Profiles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expert Teaching Team</h2>
            <p className="text-xl text-gray-600">
              Each faculty member brings decades of experience and proven results
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {facultyMembers.map((faculty, index) => (
              <motion.div
                key={faculty.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Faculty Image */}
                <div className="relative h-64 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <GraduationCap className="w-16 h-16 text-white" />
                  </div>

                  {/* Success Rate Badge */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {faculty.successRate}% Success Rate
                  </div>
                </div>

                <div className="p-8">
                  {/* Faculty Info */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{faculty.name}</h3>
                  <p className="text-blue-600 font-semibold mb-1">{faculty.designation}</p>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    {faculty.experience} Experience
                  </div>

                  {/* Qualifications */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-yellow-600" />
                      Qualifications
                    </h4>
                    <p className="text-sm text-gray-700">{faculty.qualification}</p>
                  </div>

                  {/* Specializations */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                      <Microscope className="w-4 h-4 mr-2 text-blue-600" />
                      Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {faculty.specialization.map((spec, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Student Testimonial */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center mb-2">
                      <ThumbsUp className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm font-semibold text-gray-800">Student Says:</span>
                    </div>
                    <p className="text-sm text-gray-700 italic">"{faculty.studentTestimonial}"</p>
                  </div>

                  {/* Teaching Style */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-red-500" />
                      Teaching Style
                    </h4>
                    <p className="text-sm text-gray-700">{faculty.teachingStyle}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm">4.9/5 Rating</span>
                    </div>

                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Faculty */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Parents & Students Trust Our Faculty
            </h2>
            <p className="text-xl text-gray-600">The difference quality teaching makes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {facultyHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-gray-800 font-medium text-lg">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Learn from the Best in NEET Coaching?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of successful students who achieved their medical dreams under our expert
            faculty guidance. Your NEET success story starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="secondary_cta"
              size="xl"
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Demo Class
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-green-600"
            >
              <Phone className="w-5 h-5 mr-2" />
              Talk to Faculty
            </Button>
          </div>

          {/* Final Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">Free</div>
              <div className="text-green-100">Demo Classes</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1:1</div>
              <div className="text-green-100">Mentoring</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-green-100">Doubt Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
