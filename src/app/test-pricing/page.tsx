'use client'

import { coursePrograms } from '@/data/courseSystemData'
import { getCoursePricing } from '@/lib/utils/pricing'

export default function TestPricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Pricing System Test</h1>

        <div className="space-y-6">
          {coursePrograms.map((course) => {
            try {
              const pricing = getCoursePricing(course.id)
              return (
                <div key={course.id} className="bg-white rounded-lg p-6 shadow-lg">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Course Details:</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>Duration: {course.duration}</li>
                        <li>Teaching Hours: {course.teachingHours}h/week</li>
                        <li>Target Class: {course.targetClass}</li>
                        <li>Popular: {course.isPopular ? 'Yes' : 'No'}</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Pricing Information:</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>
                          Price Range:{' '}
                          <span className="font-semibold text-blue-600">{pricing.priceRange}</span>
                        </li>
                        <li>Min Price: {pricing.formattedMinPrice}</li>
                        <li>Max Price: {pricing.formattedMaxPrice}</li>
                        <li>Available Tiers: {pricing.tiers.length}</li>
                      </ul>

                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Tier Details:</h4>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {pricing.tiers.map((tier) => (
                            <div key={tier.series} className="bg-gray-50 p-2 rounded">
                              <div className="font-medium capitalize">{tier.series}</div>
                              <div className="text-gray-600">{tier.formattedPrice}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            } catch (error) {
              return (
                <div key={course.id} className="bg-red-50 rounded-lg p-6 shadow-lg">
                  <h2 className="text-xl font-semibold text-red-900 mb-2">{course.name}</h2>
                  <p className="text-red-600 mb-4">
                    Error loading pricing:{' '}
                    {error instanceof Error ? error.message : 'Unknown error'}
                  </p>
                </div>
              )
            }
          })}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">System Info</h2>
          <p className="text-blue-700 text-sm">
            Total Course Programs: {coursePrograms.length}
            <br />
            Deployment Time: {new Date().toISOString()}
          </p>
        </div>
      </div>
    </div>
  )
}
