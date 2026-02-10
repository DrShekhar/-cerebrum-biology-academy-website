import { redirect } from 'next/navigation'

/**
 * Demo Booking Page - Redirects to canonical /book-free-demo
 *
 * This page previously duplicated the booking flow.
 * Now consolidated to /book-free-demo for better SEO and analytics.
 */
export default function DemoBookingPage() {
  redirect('/book-free-demo')
}
