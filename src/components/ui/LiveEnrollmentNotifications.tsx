'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LiveEnrollment {
  id: string
  studentName: string
  course: string
  city: string
  timestamp: number
}

export const LiveEnrollmentNotifications: React.FC = () => {
  const [enrollments, setEnrollments] = useState<LiveEnrollment[]>([])

  useEffect(() => {
    // Mock live enrollment data
    const mockEnrollments: LiveEnrollment[] = [
      {
        id: '1',
        studentName: 'Aditya S.',
        course: 'NEET Complete',
        city: 'Delhi',
        timestamp: Date.now(),
      },
      {
        id: '2',
        studentName: 'Meera K.',
        course: 'NEET Dropper',
        city: 'Hyderabad',
        timestamp: Date.now() - 30000,
      },
      {
        id: '3',
        studentName: 'Rohit M.',
        course: 'NEET Complete',
        city: 'Pune',
        timestamp: Date.now() - 60000,
      },
    ]

    setEnrollments(mockEnrollments)

    // Simulate new enrollments
    const interval = setInterval(() => {
      const names = ['Aryan P.', 'Kavya R.', 'Ishaan T.', 'Diya S.', 'Karan V.', 'Ananya B.']
      const courses = ['NEET Complete', 'NEET Dropper', 'NEET Foundation']
      const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kota']

      const newEnrollment: LiveEnrollment = {
        id: Math.random().toString(),
        studentName: names[Math.floor(Math.random() * names.length)],
        course: courses[Math.floor(Math.random() * courses.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        timestamp: Date.now(),
      }

      setEnrollments((prev) => [newEnrollment, ...prev.slice(0, 4)])
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {enrollments.slice(0, 2).map((enrollment) => (
          <motion.div
            key={enrollment.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-sm shadow-lg backdrop-blur-sm"
          >
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mt-1" />
              <div>
                <p className="text-sm font-semibold text-blue-900">{enrollment.studentName}</p>
                <p className="text-xs text-blue-700">just enrolled in {enrollment.course}</p>
                <p className="text-xs text-blue-600">from {enrollment.city}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
