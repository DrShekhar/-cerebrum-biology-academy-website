'use client'

import { motion } from 'framer-motion'
import {
  GraduationCap,
  Award,
  BookOpen,
  Users,
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
} from 'lucide-react'
import Link from 'next/link'
import { facultyMembers } from '@/data/faculty'

export default function DrShekharSinghPage() {
  const drShekhar = facultyMembers[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-navy-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Left Column - Photo and Quick Stats */}
            <div className="space-y-6">
              <div className="relative w-64 h-64 mx-auto md:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full blur-2xl opacity-50" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                  {drShekhar.image ? (
                    <img
                      src={drShekhar.image}
                      alt={drShekhar.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <GraduationCap className="w-24 h-24 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold text-teal-300">14+</div>
                  <div className="text-xs text-white/80">Years Exp.</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold text-yellow-300">98%</div>
                  <div className="text-xs text-white/80">Success</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold text-green-300">2,500+</div>
                  <div className="text-xs text-white/80">Students</div>
                </div>
              </div>
            </div>

            {/* Right Column - Introduction */}
            <div>
              <motion.div
                className="inline-flex items-center bg-teal-500/20 backdrop-blur-sm border border-teal-300/30 px-4 py-2 rounded-full mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 mr-2 text-teal-300" />
                <span className="text-teal-100 text-sm font-medium">Director & Chief Educator</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Dr. Shekhar C Singh
              </h1>

              <div className="flex items-center space-x-2 mb-6">
                <School className="w-6 h-6 text-yellow-300" />
                <p className="text-xl text-blue-100 font-medium">{drShekhar.qualification}</p>
              </div>

              <p className="text-lg text-blue-100 mb-6 leading-relaxed">{drShekhar.bio}</p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/demo"
                  className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Book Demo Class
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/30 backdrop-blur-sm transition-all"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Dr. Shekhar
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teaching Philosophy Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border-2 border-blue-100"
          >
            <div className="flex items-start space-x-4 mb-6">
              <Quote className="w-12 h-12 text-blue-600 flex-shrink-0" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Teaching Philosophy
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  "{drShekhar.teachingStyle}"
                </p>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <Heart className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Student-Centric</h4>
                  <p className="text-sm text-gray-600">
                    Every student receives personalized attention and mentorship
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Result-Oriented</h4>
                  <p className="text-sm text-gray-600">
                    Proven methodology that converts underperformers to high achievers
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Sparkles className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Beyond Textbooks</h4>
                  <p className="text-sm text-gray-600">
                    Holistic development including life skills and character building
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Remarkable Achievements
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Track Record of Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over 14 years of transforming NEET aspirants into medical college students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {drShekhar.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-800 font-medium leading-relaxed">{achievement}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Success Rate Highlight */}
          <motion.div
            className="mt-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-3xl p-8 text-white text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-6xl font-bold mb-4">{drShekhar.successRate}%</div>
              <p className="text-2xl font-semibold mb-2">NEET Success Rate</p>
              <p className="text-green-100 text-lg">
                Consistently outperforming national average by 4x
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Testimonial Highlight */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12 border-2 border-purple-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            <Quote className="w-12 h-12 text-purple-400 mx-auto mb-4" />

            <blockquote className="text-xl md:text-2xl text-gray-800 text-center italic mb-6 leading-relaxed">
              "{drShekhar.studentTestimonial}"
            </blockquote>

            <div className="text-center">
              <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="font-semibold text-gray-900">Sadhna Sirin</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">695/720 NEET 2023</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Journey Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              Professional Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A Career Dedicated to Education
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                year: '2010',
                title: 'Graduated from AIIMS New Delhi',
                description:
                  "Completed medical education from one of India's most prestigious institutions",
                icon: GraduationCap,
                color: 'from-blue-500 to-purple-500',
              },
              {
                year: '2011-2015',
                title: 'Founded Delhi Science Foundation & Quark Education',
                description:
                  'Pioneered innovative teaching methodologies for NEET Biology preparation',
                icon: Sparkles,
                color: 'from-green-500 to-teal-500',
              },
              {
                year: '2015-2020',
                title: 'Academic Head at Narayana Group',
                description: 'Led academic programs and mentored faculty across multiple campuses',
                icon: School,
                color: 'from-yellow-500 to-orange-500',
              },
              {
                year: '2020-Present',
                title: 'Founded Cerebrum Biology Academy',
                description: 'Established premier NEET Biology coaching with 98% success rate',
                icon: Trophy,
                color: 'from-red-500 to-pink-500',
              },
            ].map((milestone, index) => (
              <motion.div
                key={index}
                className="relative flex items-start space-x-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${milestone.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}
                >
                  <milestone.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-500">{milestone.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Book a personal consultation with Dr. Shekhar and experience the teaching that has
              transformed 2,500+ students
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Book Free Demo Class
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl border border-white/30 backdrop-blur-sm transition-all"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </Link>
            </div>

            <div className="mt-12 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-blue-100">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a href="tel:+918826444334" className="hover:text-white transition-colors">
                  +91 88264 44334
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a
                  href="mailto:info@cerebrumbiologyacademy.com"
                  className="hover:text-white transition-colors"
                >
                  info@cerebrumbiologyacademy.com
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Rohini, Gurugram, South Delhi</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
