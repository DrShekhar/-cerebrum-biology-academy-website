'use client'

import { motion } from 'framer-motion'
import { BookOpen, Shield, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Portal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Staff Portal</h1>
          <p className="text-lg text-gray-600">Cerebrum Biology Academy</p>
          <p className="text-gray-500 mt-2">Select your role to continue</p>
        </motion.div>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Portal Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/admin/login">
              <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 cursor-pointer group h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">Admin Portal</h2>
                <p className="text-gray-600 mb-6">
                  Full system access for administrators. Manage users, courses, and system settings.
                </p>

                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Access Admin Portal</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    <p className="font-semibold mb-2">Admin Features:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• User Management</li>
                      <li>• Course Administration</li>
                      <li>• System Analytics</li>
                      <li>• Financial Reports</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Counselor Portal Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/counselor/login">
              <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 cursor-pointer group h-full">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">Counselor Portal</h2>
                <p className="text-gray-600 mb-6">
                  Lead management and student counseling. Track leads, schedule demos, and manage
                  enrollments.
                </p>

                <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Access Counselor Portal</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    <p className="font-semibold mb-2">Counselor Features:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Lead Management</li>
                      <li>• Demo Scheduling</li>
                      <li>• Student Communications</li>
                      <li>• Enrollment Tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium inline-flex items-center"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Home
          </Link>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-white rounded-2xl shadow-lg"
        >
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-2">Security Notice</p>
              <p>
                All portal access is secured with authentication. Login attempts are monitored and
                logged. If you experience any issues accessing your account, please contact the
                system administrator.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
