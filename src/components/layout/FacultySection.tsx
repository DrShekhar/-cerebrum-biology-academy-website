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
import { useRouter } from 'next/navigation'

export function FacultySection() {
  const router = useRouter()

  const handleMeetFaculty = () => {
    router.push('/faculty')
  }

  const handleBookDemo = () => {
    router.push('/demo-booking')
  }

  return (
    <section className="py-12 xs:py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 xs:mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium mb-3 xs:mb-4">
            <GraduationCap className="w-3 xs:w-4 h-3 xs:h-4 mr-2" />
            Expert Faculty Team
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 xs:mb-5 sm:mb-6">
            Learn From <span className="text-blue-600">AIIMS Experts</span>
          </h2>

          <p className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Our distinguished faculty comprises AIIMS alumni, PhD holders, and medical professionals
            with decades of teaching excellence and proven track records.
          </p>
        </motion.div>

        {/* Faculty Statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 mb-10 xs:mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {facultyStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 xs:p-5 sm:p-6 bg-white rounded-xl xs:rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl xs:text-3xl font-bold text-blue-600 mb-1.5 xs:mb-2">
                {stat.number}
              </div>
              <div className="text-sm xs:text-base font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-xs xs:text-sm text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Faculty Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-6 sm:gap-8 mb-10 xs:mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {facultyMembers.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              className="bg-white rounded-2xl xs:rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-5 xs:p-6 sm:p-8 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Faculty Image */}
              <div className="w-20 xs:w-22 sm:w-24 h-20 xs:h-22 sm:h-24 mx-auto mb-4 xs:mb-5 sm:mb-6 rounded-full overflow-hidden border-4 border-blue-100 group-hover:scale-105 transition-transform shadow-lg">
                {faculty.image ? (
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <GraduationCap className="w-10 xs:w-11 sm:w-12 h-10 xs:h-11 sm:h-12 text-white" />
                  </div>
                )}
              </div>

              {/* Faculty Info */}
              <div className="text-center mb-4 xs:mb-5 sm:mb-6">
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-1.5 xs:mb-2">
                  {faculty.name}
                </h3>
                <div className="flex items-center justify-center text-gray-600 text-xs xs:text-sm mb-2 xs:mb-3">
                  <Award className="w-3.5 xs:w-4 h-3.5 xs:h-4 mr-1" />
                  {faculty.experience}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 xs:w-4 h-3.5 xs:h-4 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 text-xs xs:text-sm">4.9/5</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Faculty Highlights */}
        <motion.div
          className="bg-white rounded-2xl xs:rounded-3xl shadow-xl p-5 xs:p-6 sm:p-8 md:p-12 mb-8 xs:mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-6 xs:mb-7 sm:mb-8">
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-3 xs:mb-4">
              Why Our Faculty Stands Apart
            </h3>
            <p className="text-sm xs:text-base sm:text-lg text-gray-600">
              Experience the difference that expert guidance makes in your NEET preparation journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
            {facultyHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3 xs:space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 xs:w-4.5 sm:w-5 h-4 xs:h-4.5 sm:h-5 text-green-600" />
                </div>
                <p className="text-sm xs:text-base text-gray-700 font-medium">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Teaching Methodology */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 xs:gap-6 sm:gap-8 mb-8 xs:mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-5 xs:p-6 sm:p-8 bg-white rounded-xl xs:rounded-2xl shadow-lg">
            <div className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 mx-auto mb-3 xs:mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 text-blue-600" />
            </div>
            <h4 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3">
              Conceptual Teaching
            </h4>
            <p className="text-sm xs:text-base text-gray-600">
              Deep understanding through concept-based learning rather than rote memorization
            </p>
          </div>

          <div className="text-center p-5 xs:p-6 sm:p-8 bg-white rounded-xl xs:rounded-2xl shadow-lg">
            <div className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 mx-auto mb-3 xs:mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <Target className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 text-purple-600" />
            </div>
            <h4 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3">
              NEET Focused
            </h4>
            <p className="text-sm xs:text-base text-gray-600">
              Strategic approach aligned with NEET exam patterns and high-yield topics
            </p>
          </div>

          <div className="text-center p-5 xs:p-6 sm:p-8 bg-white rounded-xl xs:rounded-2xl shadow-lg">
            <div className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 mx-auto mb-3 xs:mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 text-green-600" />
            </div>
            <h4 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-2 xs:mb-3">
              Personal Mentoring
            </h4>
            <p className="text-sm xs:text-base text-gray-600">
              Individual attention and personalized guidance for every student&apos;s success
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl xs:rounded-3xl p-6 xs:p-8 sm:p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-3 xs:mb-4">
            Ready to Learn from the Best?
          </h3>
          <p className="text-base xs:text-lg sm:text-xl mb-6 xs:mb-8 opacity-90">
            Join thousands of students who achieved NEET success under expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              variant="secondary"
              size="xl"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={handleMeetFaculty}
            >
              Meet Our Faculty
              <ArrowRight className="w-3 xs:w-4 h-3 xs:h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={handleBookDemo}
            >
              Book Demo Class
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
