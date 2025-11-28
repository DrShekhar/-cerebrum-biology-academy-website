'use client'

import { Button } from '@/components/ui/Button'
import { Phone, Calendar, Star, Users, BookOpen, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const router = useRouter()

  const stats = [
    { icon: BookOpen, label: '10k+', subtitle: 'NEET Questions Solved' },
    { icon: Users, label: '500+', subtitle: 'Expert Faculty' },
    { icon: Trophy, label: '98%', subtitle: 'Success Rate' },
  ]

  const handleBookDemo = () => {
    router.push('/demo-booking')
  }

  const handleCallNow = () => {
    window.location.href = 'tel:+919311946297'
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Cerebrum</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <a href="#courses" className="text-gray-600 hover:text-blue-600 transition-colors">
              Courses
            </a>
            <a href="#faculty" className="text-gray-600 hover:text-blue-600 transition-colors">
              Faculty
            </a>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Blog
            </Link>
            <a href="#results" className="text-gray-600 hover:text-blue-600 transition-colors">
              Results
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button variant="primary" size="default">
              Register
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master{' '}
                <span className="text-blue-600 relative">
                  NEET Biology
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                    viewBox="0 0 100 12"
                    fill="currentColor"
                  >
                    <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
                  </svg>
                </span>{' '}
                Is Now More <span className="text-indigo-600">Achievable</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Join 10,000+ students who cracked NEET with our proven teaching methodology. Get
                personalized coaching from AIIMS faculty with 98% success rate.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="xl" onClick={handleBookDemo} className="group">
                <Calendar className="w-4 xs:w-5 h-4 xs:h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Book Free Demo
              </Button>

              <Button variant="secondary_cta" size="xl" onClick={handleCallNow} className="group">
                <Phone className="w-4 xs:w-5 h-4 xs:h-5 mr-2 group-hover:ring-2 group-hover:ring-blue-300 rounded-full transition-all" />
                Call Now: +91 93119 46297
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 border-2 border-white"
                    ></div>
                  ))}
                </div>
                <span className="ml-3 text-sm text-gray-600">2000+ Happy Students</span>
              </div>

              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">4.9/5 Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual & Stats */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Hero Illustration Placeholder */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-indigo-400/20"></div>
                <div className="relative z-10 text-center text-white">
                  <div className="w-32 h-32 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <BookOpen className="w-16 h-16" />
                  </div>
                  <p className="text-lg font-medium">NEET Biology Mastery</p>
                  <p className="text-sm opacity-80">With Expert Faculty</p>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-yellow-300" />
                </div>
                <div className="absolute bottom-8 right-8 w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                  <Users className="w-10 h-10 text-green-300" />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{stat.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.subtitle}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
