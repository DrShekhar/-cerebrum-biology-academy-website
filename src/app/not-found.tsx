'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Search, BookOpen, ArrowLeft, HelpCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  // Set document title and meta tags for SEO
  useEffect(() => {
    document.title = '404 - Page Not Found | Cerebrum Biology Academy'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'The page you are looking for could not be found. Browse our NEET biology courses or contact support.'
      )
    }
    const metaRobots = document.querySelector('meta[name="robots"]')
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, follow')
    }
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <div className="text-[12rem] md:text-[16rem] font-bold text-gray-200 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-primary-100 rounded-full flex items-center justify-center">
                <Search className="w-16 h-16 md:w-20 md:h-20 text-primary-600" />
              </div>
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Page Not Found</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
            It might have been moved, deleted, or you entered the wrong URL. Don't worry, let's get
            you back on track to your medical dreams!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          <Link href="/courses">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <BookOpen className="w-5 h-5 mr-2" />
              Browse Courses
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Phone className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
          </Link>
        </motion.div>

        {/* Popular Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/courses/class-12"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-200">
                <BookOpen className="w-5 h-5 text-primary-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Class 12th Course</div>
                <div className="text-sm text-gray-500">NEET Preparation</div>
              </div>
            </Link>

            <Link
              href="/courses/neet-dropper"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-emerald-200">
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Dropper Batch</div>
                <div className="text-sm text-gray-500">Repeat Students</div>
              </div>
            </Link>

            <Link
              href="/demo"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-200">
                <Search className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Free Demo</div>
                <div className="text-sm text-gray-500">Try Our Teaching</div>
              </div>
            </Link>

            <Link
              href="/support/help-center"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200">
                <HelpCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Help Center</div>
                <div className="text-sm text-gray-500">Get Support</div>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Search Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <p className="text-gray-500 mb-4">Or search for what you need:</p>
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search courses, topics, or pages..."
              className="w-full px-4 py-3 pl-12 pr-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="text-gray-500 mb-2">Still can't find what you're looking for?</div>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <a
              href="tel:+918826444334"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
            >
              <Phone className="w-4 h-4" />
              <span>+91 88264 44334</span>
            </a>
            <span className="text-gray-300">|</span>
            <Link href="/contact" className="text-primary-600 hover:text-primary-700">
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
