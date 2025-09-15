'use client'

// import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useEnrollment } from '@/hooks/useEnrollment'
import { Button } from '@/components/ui/Button'
import {
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Book,
  Users,
  Download,
  Play,
  MessageCircle,
  Phone,
  Mail,
} from 'lucide-react'
import { motion } from 'framer-motion'

export function MyEnrollments() {
  const { user, isAuthenticated } = useAuth()
  const { getUserEnrollments } = useEnrollment()

  if (!isAuthenticated || !user) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Please Sign In</h2>
        <p className="text-gray-600">You need to be signed in to view your enrollments.</p>
      </div>
    )
  }

  const userEnrollments = getUserEnrollments(user.id) || []

  if (userEnrollments.length === 0) {
    return (
      <div className="text-center py-12">
        <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Enrollments Yet</h2>
        <p className="text-gray-600 mb-6">
          You haven&apos;t enrolled in any courses yet. Browse our courses to get started!
        </p>
        <Button variant="primary" size="lg">
          Browse Courses
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Enrollments</h1>
        <p className="text-gray-600">Track your course progress and manage your enrollments</p>
      </div>

      <div className="space-y-6">
        {userEnrollments.map((enrollment, index) => (
          <motion.div
            key={enrollment.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Status Header */}
            <div
              className={`px-6 py-4 ${
                enrollment.paymentStatus === 'paid'
                  ? 'bg-green-50 border-l-4 border-green-500'
                  : enrollment.paymentStatus === 'pending'
                    ? 'bg-orange-50 border-l-4 border-orange-500'
                    : 'bg-red-50 border-l-4 border-red-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {enrollment.paymentStatus === 'paid' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  ) : enrollment.paymentStatus === 'pending' ? (
                    <Clock className="w-5 h-5 text-orange-600 mr-2" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  )}
                  <span
                    className={`font-semibold ${
                      enrollment.paymentStatus === 'paid'
                        ? 'text-green-800'
                        : enrollment.paymentStatus === 'pending'
                          ? 'text-orange-800'
                          : 'text-red-800'
                    }`}
                  >
                    {enrollment.paymentStatus === 'paid'
                      ? 'Enrollment Confirmed'
                      : enrollment.paymentStatus === 'pending'
                        ? 'Payment Pending'
                        : 'Payment Failed'}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* Course Information */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{enrollment.courseId}</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Starts: {new Date(enrollment.courseStartDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Batch: {enrollment.batchAssigned || 'To be assigned'}
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment: {enrollment.paymentStatus}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              {enrollment.paymentStatus === 'paid' && (
                <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-4">Quick Access</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center"
                    >
                      <Book className="w-4 h-4 mr-2" />
                      Study Material
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Live Classes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Downloads
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Group
                    </Button>
                  </div>
                </div>
              )}

              {/* Payment Status Specific Content */}
              {enrollment.paymentStatus === 'pending' && (
                <div className="bg-orange-50 rounded-2xl p-6 mb-6">
                  <h4 className="font-semibold text-orange-900 mb-4">Complete Your Payment</h4>
                  <p className="text-orange-800 mb-4">
                    Your enrollment is pending payment confirmation. Complete your payment to access
                    course materials and join classes.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="primary" size="sm">
                      Complete Payment
                    </Button>
                    <Button variant="outline" size="sm">
                      Payment Help
                    </Button>
                  </div>
                </div>
              )}

              {enrollment.paymentStatus === 'failed' && (
                <div className="bg-red-50 rounded-2xl p-6 mb-6">
                  <h4 className="font-semibold text-red-900 mb-4">Payment Failed</h4>
                  <p className="text-red-800 mb-4">
                    Your payment could not be processed. Please try again or contact our support
                    team for assistance.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="primary" size="sm">
                      Retry Payment
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact Support
                    </Button>
                  </div>
                </div>
              )}

              {/* Course Progress (for paid enrollments) */}
              {enrollment.paymentStatus === 'paid' && (
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Course Progress</h4>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Overall Progress</span>
                        <span>15% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: '15%' }}
                        ></div>
                      </div>
                    </div>

                    {/* Next Class */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">Next Class</h5>
                          <p className="text-sm text-gray-600">
                            Chapter 5: Cell Structure and Function
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">Today, 4:00 PM</div>
                          <div className="text-sm text-gray-600">Join in 2 hours</div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Recent Activity</h5>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          Completed: Chapter 4 Quiz - 85% score
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Download className="w-4 h-4 text-blue-500 mr-2" />
                          Downloaded: Chapter 5 Study Notes
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Play className="w-4 h-4 text-purple-500 mr-2" />
                          Watched: Recorded Class - Photosynthesis
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Support Contact */}
              <div className="border-t pt-6 mt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Need Help?</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Call Support</div>
                      <div className="text-sm text-gray-600">+91-88264-44334</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Email Support</div>
                      <div className="text-sm text-gray-600">help@cerebrumbiologyacademy.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Learning Stats</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{userEnrollments.length}</div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {userEnrollments.filter((e) => e.paymentStatus === 'paid').length}
            </div>
            <div className="text-sm text-gray-600">Active Enrollments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">15%</div>
            <div className="text-sm text-gray-600">Avg. Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">4.8</div>
            <div className="text-sm text-gray-600">Quiz Average</div>
          </div>
        </div>
      </div>
    </div>
  )
}
