'use client'

import { CheckCircle, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface CostComparisonSectionProps {
  cityName: string
}

const comparisonRows = [
  { feature: 'Annual Fee', kota: 'Rs 1.5-3 Lakh', cerebrum: 'Rs 24,000-48,000', cerebrumWins: true },
  { feature: 'Hostel + Food', kota: 'Rs 1-1.5 Lakh/year', cerebrum: 'Rs 0 (Stay at home)', cerebrumWins: true },
  { feature: 'Travel Cost', kota: 'Rs 20-40K/year', cerebrum: 'Rs 0 (Online)', cerebrumWins: true },
  { feature: 'Total Annual Cost', kota: 'Rs 3-5 Lakh', cerebrum: 'Rs 24,000-48,000', cerebrumWins: true },
  { feature: 'Batch Size', kota: '100-500 students', cerebrum: '10-20 students', cerebrumWins: true },
  { feature: 'Faculty Access', kota: 'Limited (large batches)', cerebrum: 'Direct (AIIMS faculty)', cerebrumWins: true },
  { feature: 'Doubt Resolution', kota: 'Queue-based, delayed', cerebrum: 'Instant (live + WhatsApp)', cerebrumWins: true },
  { feature: 'Family Support', kota: 'Away from family', cerebrum: 'With family at home', cerebrumWins: true },
  { feature: 'Recorded Lectures', kota: 'Extra charge', cerebrum: 'Included free', cerebrumWins: true },
  { feature: 'Progress Tracking', kota: 'Monthly (generic)', cerebrum: 'Weekly (personalized)', cerebrumWins: true },
]

export function CostComparisonSection({ cityName }: CostComparisonSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why {cityName} Students Choose Cerebrum Over Kota
          </h2>
          <p className="text-lg text-gray-600">
            Save Rs 2-4 Lakh per year. Get better results. Stay with your family.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-900 text-white text-sm font-bold">
            <div className="p-4">Feature</div>
            <div className="p-4 text-center">Kota Coaching</div>
            <div className="p-4 text-center bg-teal-700">Cerebrum Academy</div>
          </div>

          {comparisonRows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100`}
            >
              <div className="p-4 font-medium text-gray-900">{row.feature}</div>
              <div className="p-4 text-center text-gray-600 flex items-center justify-center">
                <X className="w-4 h-4 text-red-400 mr-1.5 flex-shrink-0" />
                {row.kota}
              </div>
              <div className="p-4 text-center text-teal-700 font-medium flex items-center justify-center bg-teal-50/50">
                <CheckCircle className="w-4 h-4 text-teal-600 mr-1.5 flex-shrink-0" />
                {row.cerebrum}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/demo-booking">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <ArrowRight className="w-4 h-4 mr-2" />
              Book Free Demo — See the Difference
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
