'use client'

import {
  Phone,
  Star,
  CheckCircle,
  Download,
  Users,
  Award,
  Calendar,
} from 'lucide-react'
import Link from 'next/link'

const benefits = [
            '12-month day-by-day study schedule',
            'Chapter allocation with time estimates',
            '3 revision cycles built in',
            'Mock test schedule integrated',
            'Adaptable for dropper/Class 11/Class 12',
]

export default function PageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-gray-50">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm mb-4">
            <Download className="w-4 h-4" />
            <span>Free Download - No Sign Up Required</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Biology 12-Month Study Planner
          </h1>
          <p className="text-xl text-teal-100 mb-2">Day-by-Day Schedule Designed by AIIMS Toppers</p>
          <p className="text-lg text-teal-200 max-w-2xl mx-auto mb-8">
            A complete 12-month roadmap covering chapter allocation, revision cycles, mock test schedules, and daily time management designed by students who scored 680+ in NEET.
          </p>
          <Link
            href="https://wa.me/918826444334?text=Hi%20I%20want%20the%20free%20study%20planner"
            className="inline-flex bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-bold text-lg items-center gap-2 transition-colors shadow-lg"
          >
            <Phone className="w-5 h-5" /> Get Free on WhatsApp
          </Link>
          <p className="text-sm text-teal-200 mt-3">WhatsApp +91-8826444334 to receive instantly</p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What You Get</h2>
        <div className="space-y-4">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-lg">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <Award className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <p className="font-bold text-lg">AIIMS Faculty</p>
              <p className="text-sm text-gray-500">Expert Created</p>
            </div>
            <div className="p-4">
              <Users className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <p className="font-bold text-lg">10,000+</p>
              <p className="text-sm text-gray-500">Students Downloaded</p>
            </div>
            <div className="p-4">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-bold text-lg">4.9/5</p>
              <p className="text-sm text-gray-500">Student Rating</p>
            </div>
            <div className="p-4">
              <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-bold text-lg">100% Free</p>
              <p className="text-sm text-gray-500">No Hidden Charges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What Students Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: 'Priya M.', score: 'NEET 2025: 665/720', quote: 'This resource was a game-changer for my preparation. Saved me so much time!' },
            { name: 'Rahul K.', score: 'NEET 2025: 648/720', quote: 'Cerebrum resources are top-notch. The AIIMS faculty really knows what matters for NEET.' },
          ].map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-700 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-bold">{t.name}</p>
              <p className="text-sm text-green-600">{t.score}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your Free Resource Now</h2>
          <p className="text-teal-100 mb-8 text-lg">Join 10,000+ NEET aspirants who have already downloaded this resource.</p>
          <Link
            href="https://wa.me/918826444334?text=Hi%20I%20want%20the%20free%20study%20planner"
            className="inline-flex bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-bold text-lg items-center gap-2 transition-colors shadow-lg"
          >
            <Phone className="w-5 h-5" /> WhatsApp: +91-8826444334
          </Link>
          <p className="text-sm text-teal-200 mt-4">Instant delivery on WhatsApp | 100% Free | No spam</p>
        </div>
      </section>

      {/* About Cerebrum */}
      <section className="py-12 max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-xl font-bold mb-3">About Cerebrum Biology Academy</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Founded by Dr. Shekhar (AIIMS Delhi), Cerebrum Biology Academy is India&apos;s leading online NEET Biology coaching with 98% success rate, 695/720 top score, and students across 14+ countries.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Link href="/pricing" className="text-teal-600 hover:text-teal-800 font-semibold">View Courses &rarr;</Link>
          <Link href="/nri-students" className="text-teal-600 hover:text-teal-800 font-semibold">NRI Students &rarr;</Link>
          <Link href="/free-resources" className="text-teal-600 hover:text-teal-800 font-semibold">More Free Resources &rarr;</Link>
        </div>
      </section>
    </div>
  )
}
