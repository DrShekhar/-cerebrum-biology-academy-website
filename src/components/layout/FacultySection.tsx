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
} from 'lucide-react'
import { motion } from 'framer-motion'

export function FacultySection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <GraduationCap className="w-4 h-4 mr-2" />
            Expert Faculty Team
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Learn From <span className="text-blue-600">AIIMS Experts</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our distinguished faculty comprises AIIMS alumni, PhD holders, and medical professionals
            with decades of teaching excellence and proven track records.
          </p>
        </motion.div>

        {/* Faculty Statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {facultyStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Faculty Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {facultyMembers.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-8 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Faculty Image Placeholder */}
              <div className="w-24 h-24 mx-auto mb-6 bg-teal-600 rounded-full flex items-center justify-center text-white relative overflow-hidden group-hover:scale-105 transition-transform">
                <Users className="w-12 h-12 opacity-80" />
                <div className="absolute inset-0 bg-teal-700 opacity-90"></div>
                <GraduationCap className="w-8 h-8 relative z-10" />
              </div>

              {/* Faculty Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{faculty.name}</h3>
                <div className="flex items-center justify-center text-gray-600 text-sm mb-3">
                  <Award className="w-4 h-4 mr-1" />
                  {faculty.experience}
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <Microscope className="w-4 h-4 mr-2 text-blue-600" />
                  Specializations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {faculty.specialization.map((spec, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">4.9/5</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Faculty Highlights */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Our Faculty Stands Apart</h3>
            <p className="text-lg text-gray-600">
              Experience the difference that expert guidance makes in your NEET preparation journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {facultyHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-gray-700 font-medium">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Teaching Methodology */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Conceptual Teaching</h4>
            <p className="text-gray-600">
              Deep understanding through concept-based learning rather than rote memorization
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">NEET Focused</h4>
            <p className="text-gray-600">
              Strategic approach aligned with NEET exam patterns and high-yield topics
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Personal Mentoring</h4>
            <p className="text-gray-600">
              Individual attention and personalized guidance for every student&apos;s success
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-navy-900 rounded-3xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Learn from the Best?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who achieved NEET success under expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary_cta"
              size="xl"
              className="bg-white text-teal-600 hover:bg-gray-100"
            >
              Meet Our Faculty
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-teal-600"
            >
              Book Demo Class
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
