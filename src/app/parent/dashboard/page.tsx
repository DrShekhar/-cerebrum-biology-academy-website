'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  TrendingUp,
  Calendar,
  CreditCard,
  MessageSquare,
  Bell,
  ChevronRight,
  Clock,
  BookOpen,
  Trophy,
  Users,
  LogOut,
  User,
} from 'lucide-react'

interface Student {
  id: string
  name: string
  class: string
  enrolledCourses: number
  overallProgress: number
  lastActive: string
}

interface Payment {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  description: string
}

interface Test {
  id: string
  name: string
  date: string
  score?: number
  totalMarks: number
  status: 'completed' | 'upcoming'
}

export default function ParentDashboard() {
  const [loading, setLoading] = useState(true)
  const [parentName, setParentName] = useState('Parent')

  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'Student Name',
      class: 'Class 12',
      enrolledCourses: 2,
      overallProgress: 68,
      lastActive: '2 hours ago',
    },
  ])

  const [recentPayments] = useState<Payment[]>([
    {
      id: '1',
      date: '2024-11-15',
      amount: 15000,
      status: 'paid',
      description: 'NEET Biology Course - Monthly Fee',
    },
    {
      id: '2',
      date: '2024-12-15',
      amount: 15000,
      status: 'pending',
      description: 'NEET Biology Course - Monthly Fee',
    },
  ])

  const [upcomingTests] = useState<Test[]>([
    {
      id: '1',
      name: 'Weekly Test - Human Physiology',
      date: '2024-11-30',
      totalMarks: 100,
      status: 'upcoming',
    },
    {
      id: '2',
      name: 'Unit Test - Genetics',
      date: '2024-11-25',
      score: 85,
      totalMarks: 100,
      status: 'completed',
    },
  ])

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      setParentName(userData.name || 'Parent')
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    window.location.href = '/auth/signin'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome, {parentName}</h1>
          <p className="text-gray-600 mt-1">Monitor your child&apos;s academic progress</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {students.map((student) => (
          <div
            key={student.id}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{student.name}</h2>
                  <p className="text-gray-600">{student.class}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    Last active: {student.lastActive}
                  </p>
                </div>
              </div>
              <Link
                href={`/parent/student/${student.id}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                View Details
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <BookOpen className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">{student.enrolledCourses}</p>
                <p className="text-sm text-gray-600">Enrolled Courses</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <TrendingUp className="w-5 h-5 text-green-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">{student.overallProgress}%</p>
                <p className="text-sm text-gray-600">Overall Progress</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <Trophy className="w-5 h-5 text-purple-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">85%</p>
                <p className="text-sm text-gray-600">Avg. Test Score</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <Calendar className="w-5 h-5 text-orange-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">92%</p>
                <p className="text-sm text-gray-600">Attendance</p>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Upcoming Tests
          </h3>
          <div className="space-y-4">
            {upcomingTests.map((test) => (
              <div
                key={test.id}
                className={`p-3 rounded-lg ${
                  test.status === 'upcoming' ? 'bg-yellow-50' : 'bg-green-50'
                }`}
              >
                <p className="font-medium text-gray-900 text-sm">{test.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-600">
                    {new Date(test.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </p>
                  {test.status === 'completed' && test.score !== undefined ? (
                    <span className="text-xs font-medium text-green-700">
                      Score: {test.score}/{test.totalMarks}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-yellow-700">Upcoming</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              Payment History
            </h3>
            <Link
              href="/parent/payments"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 text-sm">{payment.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(payment.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ₹{payment.amount.toLocaleString('en-IN')}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      payment.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : payment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              Quick Actions
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/parent/messages"
              className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <MessageSquare className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-medium text-gray-900">Message Teacher</span>
            </Link>
            <Link
              href="/parent/schedule"
              className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Calendar className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">View Schedule</span>
            </Link>
            <Link
              href="/parent/results"
              className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Trophy className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Test Results</span>
            </Link>
            <Link
              href="/parent/ptm"
              className="flex flex-col items-center gap-2 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <Users className="w-6 h-6 text-orange-600" />
              <span className="text-sm font-medium text-gray-900">Book PTM</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Need Help?</h3>
            <p className="text-blue-100 text-sm">
              Contact our support team for any queries regarding your child&apos;s education.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Contact Support
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
