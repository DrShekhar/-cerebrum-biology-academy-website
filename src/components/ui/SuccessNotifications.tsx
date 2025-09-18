'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SuccessNotification {
  id: string
  message: string
  timestamp: number
}

export const SuccessNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<SuccessNotification[]>([])

  // Mock success notifications
  useEffect(() => {
    const mockNotifications: SuccessNotification[] = [
      {
        id: '1',
        message: 'Rahul from Delhi enrolled in NEET Complete',
        timestamp: Date.now() - 5000,
      },
      { id: '2', message: 'Priya from Mumbai booked a demo class', timestamp: Date.now() - 15000 },
      {
        id: '3',
        message: 'Arjun from Bangalore downloaded study material',
        timestamp: Date.now() - 25000,
      },
    ]

    setNotifications(mockNotifications)

    // Auto-rotate notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Math.random().toString(),
        message: `${['Vikash', 'Sneha', 'Rohan', 'Kavya'][Math.floor(Math.random() * 4)]} from ${['Delhi', 'Mumbai', 'Bangalore', 'Chennai'][Math.floor(Math.random() * 4)]} just enrolled!`,
        timestamp: Date.now(),
      }

      setNotifications((prev) => [newNotification, ...prev.slice(0, 4)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.slice(0, 3).map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="bg-green-50 border border-green-200 rounded-lg p-3 max-w-sm shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-sm text-green-800 font-medium">{notification.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
