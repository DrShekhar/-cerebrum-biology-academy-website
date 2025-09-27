'use client'

import PremiumCourseCards from '@/components/courseSelector/PremiumCourseCards'

export default function PremiumCourseCardsDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Premium Course Cards Demo</h1>
          <p className="text-gray-600">
            Showcasing the exact course card design you requested with pricing tiers, features, and
            beautiful UI
          </p>
        </div>
      </div>

      {/* Course Cards */}
      <div className="py-12">
        <PremiumCourseCards />
      </div>

      {/* Technical Details */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">✨ Features Implemented</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-green-600 mb-3">📋 Card Features</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Pricing tier tabs (Pinnacle, Ascent, Pursuit)</li>
                <li>• Dynamic pricing display</li>
                <li>• Popular course badges</li>
                <li>• NEET focused indicators</li>
                <li>• Course duration stats</li>
                <li>• Key features with checkmarks</li>
                <li>• Best value guarantee</li>
                <li>• Multiple action buttons</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-3">🎨 Design Elements</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Clean white cards with subtle shadows</li>
                <li>• Course icons with colored backgrounds</li>
                <li>• Responsive grid layout</li>
                <li>• Hover animations</li>
                <li>• Color-coded learning modes</li>
                <li>• Professional typography</li>
                <li>• EMI availability display</li>
                <li>• Guarantee highlight boxes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600 mb-3">🔧 Technical</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• TypeScript interfaces</li>
                <li>• Framer Motion animations</li>
                <li>• Lucide React icons</li>
                <li>• Tailwind CSS styling</li>
                <li>• State management for tabs</li>
                <li>• Responsive design</li>
                <li>• Reusable components</li>
                <li>• Dynamic data rendering</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
