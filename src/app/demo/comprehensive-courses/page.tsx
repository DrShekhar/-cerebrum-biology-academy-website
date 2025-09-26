'use client'

import { FixedCourseSelector } from '@/components/courses/FixedCourseSelector'

export default function ComprehensiveCoursesDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold mb-4">Complete Course Structure</h1>
          <p className="text-xl text-blue-100 mb-6">
            Based on your detailed course analysis - Classes 9th, 10th, 11th, 12th & Droppers
          </p>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-semibold">PURSUIT SERIES</div>
              <div className="text-blue-100">₹30K - ₹93K</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-semibold">ASCENT SERIES</div>
              <div className="text-blue-100">₹50K - ₹110K</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-semibold">PINNACLE SERIES</div>
              <div className="text-blue-100">₹65K - ₹186K</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-semibold">INTENSIVE/SGP</div>
              <div className="text-blue-100">Discussion Based</div>
            </div>
          </div>
        </div>
      </div>

      {/* Course System */}
      <div className="py-12">
        <FixedCourseSelector />
      </div>

      {/* Implementation Details */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🏗️ System Implementation Details
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">📊 Course Structure</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>5 Class Levels:</strong> 9th, 10th, 11th, 12th, Droppers
                </li>
                <li>
                  • <strong>4 Series Types:</strong> Pursuit, Ascent, Pinnacle, Intensive
                </li>
                <li>
                  • <strong>Multiple Plans:</strong> Academic, NEET, Combined, A-Z
                </li>
                <li>
                  • <strong>Flexible Duration:</strong> 1-year and 2-year options
                </li>
                <li>
                  • <strong>Batch Sizes:</strong> 12-25 students by series
                </li>
                <li>
                  • <strong>Hour Ranges:</strong> 3-12 hours per week
                </li>
                <li>
                  • <strong>Price Range:</strong> ₹30K to ₹186K
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">💰 Pricing Features</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Dynamic Pricing:</strong> Based on series and plan
                </li>
                <li>
                  • <strong>Payment Options:</strong> 1, 2, or 3 installments
                </li>
                <li>
                  • <strong>Additional Fees:</strong> ₹1K-8K for installments
                </li>
                <li>
                  • <strong>Original Pricing:</strong> Shows discounts where applicable
                </li>
                <li>
                  • <strong>Discussion Based:</strong> SGP program pricing
                </li>
                <li>
                  • <strong>Value Highlights:</strong> Best value indicators
                </li>
                <li>
                  • <strong>Series Differentiation:</strong> Clear value proposition
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-600 mb-4">🎨 UI/UX Features</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Class Filtering:</strong> Show courses by class level
                </li>
                <li>
                  • <strong>Series Badges:</strong> Visual series identification
                </li>
                <li>
                  • <strong>Popular/Recommended:</strong> Course highlighting
                </li>
                <li>
                  • <strong>Expandable Features:</strong> Show more/less functionality
                </li>
                <li>
                  • <strong>Responsive Grid:</strong> Plan cards within course cards
                </li>
                <li>
                  • <strong>Payment Options:</strong> Clear cost breakdown
                </li>
                <li>
                  • <strong>Guarantee Display:</strong> Trust building elements
                </li>
              </ul>
            </div>
          </div>

          {/* Series Comparison */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              📈 Series Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Series</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Batch Size</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Price Range</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      Target Audience
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Key Feature</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-blue-600">PURSUIT</td>
                    <td className="px-4 py-3">20-25 students</td>
                    <td className="px-4 py-3">₹30K - ₹93K</td>
                    <td className="px-4 py-3">Budget-conscious families</td>
                    <td className="px-4 py-3">Most affordable option</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-purple-600">ASCENT</td>
                    <td className="px-4 py-3">Max 16 students</td>
                    <td className="px-4 py-3">₹50K - ₹110K</td>
                    <td className="px-4 py-3">Balanced approach seekers</td>
                    <td className="px-4 py-3">Premium quality + reasonable size</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-yellow-600">PINNACLE</td>
                    <td className="px-4 py-3">Max 12 students</td>
                    <td className="px-4 py-3">₹65K - ₹186K</td>
                    <td className="px-4 py-3">Premium seekers</td>
                    <td className="px-4 py-3">Maximum personalized attention</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-red-600">INTENSIVE/SGP</td>
                    <td className="px-4 py-3">Ultra-selective</td>
                    <td className="px-4 py-3">Discussion-based</td>
                    <td className="px-4 py-3">Elite performance seekers</td>
                    <td className="px-4 py-3">Rigorous training + guaranteed results</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
