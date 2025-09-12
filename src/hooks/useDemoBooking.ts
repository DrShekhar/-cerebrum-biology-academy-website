'use client'

import { useState } from 'react'
import { id } from '@/lib/db'
import type { DemoBooking } from '@/lib/db'

export function useDemoBooking() {
  const [bookings, setBookings] = useState<DemoBooking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const bookDemo = async (bookingData: Omit<DemoBooking, 'id' | 'createdAt' | 'status'>) => {
    try {
      setIsLoading(true)
      const bookingId = id()
      const newBooking: DemoBooking = {
        ...bookingData,
        id: bookingId,
        status: 'pending',
        createdAt: Date.now(),
      }

      // In real implementation, use db.transact(tx.demoBookings[bookingId].update(newBooking))
      console.log('Booking demo:', newBooking)
      setBookings((prev) => [...prev, newBooking])
      return newBooking
    } catch (error) {
      console.error('Book demo error:', error)
      setError('Failed to book demo')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, status: DemoBooking['status']) => {
    try {
      // In real implementation, use db.transact(tx.demoBookings[bookingId].update({ status }))
      console.log('Updating booking status:', bookingId, status)
      setBookings((prev) =>
        prev.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking))
      )
    } catch (error) {
      console.error('Update booking status error:', error)
      throw error
    }
  }

  const getUserBookings = (userId: string) => {
    return bookings.filter((booking) => booking.userId === userId)
  }

  return {
    bookings,
    isLoading,
    error,
    bookDemo,
    updateBookingStatus,
    getUserBookings,
  }
}
