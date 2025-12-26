'use client'

import { Button } from '@/components/ui/Button'
import { facultyMembers } from '@/data/faculty'
import {
  Award,
  BookOpen,
  Star,
  Calendar,
  MessageSquare,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Users,
  Clock,
  Target,
  Phone,
  Mail,
  Video,
  GraduationCap,
  Lightbulb,
  Quote,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Props {
  facultyId: string
}

export function FacultyProfile({ facultyId }: Props) {
  const faculty = facultyMembers.find((f) => f.id === facultyId)

  if (!faculty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Faculty Member Not Found</h1>
          <p className="text-gray-600 mb-6">The faculty member you're looking for doesn't exist.</p>
          <Link href="/faculty">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Faculty
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 opacity-10"></div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/faculty"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Faculty
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Faculty Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto lg:mx-0">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary-100 to-purple-100 p-8 flex items-center justify-center">
                  <GraduationCap className="w-32 h-32 text-primary-600" />
                </div>

                {/* Achievement Badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                  <Award className="w-6 h-6 text-gold-500" />
                </div>
              </div>
            </motion.div>

            {/* Faculty Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                {faculty.designation}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{faculty.name}</h1>

              <p className="text-xl text-gray-600 mb-6">{faculty.qualification}</p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  {faculty.experience} Experience
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  {faculty.studentsGuided}+ Students
                </div>
                <div className="flex items-center text-gold-600">
                  <Star className="w-5 h-5 mr-2" />
                  {faculty.rating} Rating
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                {faculty.specialization.map((spec, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white border border-primary-200 text-primary-700 rounded-full text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button variant="primary" size="lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Demo Class
                </Button>
                <Button variant="outline" size="lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Ask Question
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              About {faculty.name}
            </h2>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-start mb-6">
                <Quote className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700 text-lg leading-relaxed">{faculty.bio}</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-gold-500" />
                  Key Achievements
                </h3>
                <ul className="space-y-3">
                  {faculty.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary-600" />
                  Teaching Focus
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <BookOpen className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">NEET Biology Preparation</span>
                  </li>
                  <li className="flex items-start">
                    <Lightbulb className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Conceptual Understanding</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Score Improvement</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Personalized Mentoring</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Ready to start your NEET Biology journey with {faculty.name}? Book a demo class or
              reach out with any questions.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button variant="primary" size="lg">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: +91 88264 44334
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Email Faculty
              </Button>
              <Button variant="outline" size="lg">
                <Video className="w-5 h-5 mr-2" />
                Video Call
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              Demo classes are free and available for all courses
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
