'use client'

import { Button } from '@/components/ui/Button'
import { facultyMembers, facultyStats, facultyHighlights } from '@/data/faculty'
import {
  Award,
  Users,
  BookOpen,
  Star,
  Clock,
  GraduationCap,
  MessageSquare,
  Calendar,
  ArrowRight,
  Play,
  CheckCircle,
  Target,
  TrendingUp,
  Lightbulb,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function FacultyPage() {
  const specializations = [
    {
      title: 'Human Biology & Anatomy',
      description: 'MBBS & MD faculty specializing in human body systems',
      faculty: 15,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Plant Biology & Botany',
      description: 'PhD botanists covering plant sciences comprehensively',
      faculty: 12,
      icon: BookOpen,
      color: 'bg-green-500',
    },
    {
      title: 'Genetics & Molecular Biology',
      description: 'Research experts in advanced genetic concepts',
      faculty: 8,
      icon: Lightbulb,
      color: 'bg-purple-500',
    },
    {
      title: 'Environmental Biology',
      description: 'Ecology and environmental science specialists',
      faculty: 6,
      icon: Target,
      color: 'bg-orange-500',
    },
  ]

  const teachingApproach = [
    {
      title: 'Conceptual Learning',
      description: 'Deep understanding over rote memorization',
      icon: Lightbulb,
    },
    {
      title: 'Visual Teaching',
      description: 'Diagrams, models, and interactive demonstrations',
      icon: Play,
    },
    {
      title: 'Regular Assessment',
      description: 'Continuous evaluation and feedback',
      icon: Target,
    },
    {
      title: 'Individual Attention',
      description: 'Personal mentoring for every student',
      icon: Users,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              World-Class Faculty
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Learn from the best minds in biology education. Our faculty comprises PhD holders,
              MBBS graduates from AIIMS, and industry experts with decades of NEET coaching
              experience.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/demo-booking" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-green-600 w-full"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Faculty Interaction
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 w-full"
                >
                  Join Our Academy
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Faculty Stats */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Faculty Excellence Statistics
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Numbers that showcase our teaching expertise
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {facultyStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Specializations */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Subject Specializations
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Expert faculty for every biology domain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {specializations.map((spec, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`w-16 h-16 ${spec.color} rounded-2xl flex items-center justify-center`}
                  >
                    <spec.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">{spec.title}</h3>
                    <p className="text-blue-600 font-medium">{spec.faculty} Faculty Members</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{spec.description}</p>
                <Link href="/faculty">
                  <Button variant="outline" size="sm">
                    View Faculty <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Faculty */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Meet Our Faculty
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Distinguished educators shaping future doctors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {facultyMembers.map((faculty, index) => (
              <motion.div
                key={faculty.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                  {faculty.image ? (
                    <Image
                      src={faculty.image}
                      alt={faculty.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{faculty.name}</h3>
                  <p className="text-blue-600 font-medium mb-3 text-sm line-clamp-2">
                    {faculty.qualification}
                  </p>
                  <p className="text-gray-600 mb-4">{faculty.experience} Experience</p>

                  <div className="space-y-2 mb-6">
                    {faculty.specialization.slice(0, 2).map((spec, idx) => (
                      <div key={idx} className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-sm text-gray-700">{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/faculty/${faculty.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Link href="/demo-booking" className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        <Calendar className="w-4 h-4 mr-2" />
                        Meet
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/faculty">
              <Button variant="primary" size="lg">
                View All Faculty Members
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Teaching Approach */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Our Teaching Approach
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
                Our faculty employs research-backed teaching methodologies that ensure deep
                conceptual understanding and excellent NEET performance.
              </p>

              <div className="space-y-6">
                {teachingApproach.map((approach, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                      <approach.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{approach.title}</h3>
                      <p className="text-gray-600">{approach.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Faculty Highlights</h3>
              <div className="space-y-4">
                {facultyHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">98%</div>
                    <div className="text-sm text-gray-600">Student Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">15+</div>
                    <div className="text-sm text-gray-600">Avg. Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Faculty Recruitment */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Join Our Faculty Team
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Are you a passionate educator with expertise in biology? Join our team of
              distinguished faculty and shape the future of medical education.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about/careers">
                <Button variant="outline" size="lg">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Faculty Requirements
                </Button>
              </Link>
              <Link href="/about/careers">
                <Button variant="primary" size="lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Learn from the Best Biology Faculty
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-purple-100 mb-6 sm:mb-8">
            Experience world-class biology education with our expert faculty. Book a demo class and
            see the difference quality teaching makes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo Class
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="primary"
                size="xl"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Book Free Consultation
              </Button>
            </Link>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">50+</div>
              <div className="text-purple-100 text-sm sm:text-base">Expert Faculty</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">20+</div>
              <div className="text-purple-100 text-sm sm:text-base">AIIMS Alumni</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">15+</div>
              <div className="text-purple-100 text-sm sm:text-base">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
