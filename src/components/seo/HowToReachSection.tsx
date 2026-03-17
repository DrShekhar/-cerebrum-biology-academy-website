'use client'

import { MapPin, Train, Car, Clock, Navigation } from 'lucide-react'
import { getCenterInfo } from '@/lib/constants/centerMapping'

interface HowToReachProps {
  areaName: string
  citySlug: string
  nearbyMetro: string[]
  distanceFromCenter: string
  landmarks?: string[]
}

export function HowToReachSection({
  areaName,
  citySlug,
  nearbyMetro,
  distanceFromCenter,
  landmarks = [],
}: HowToReachProps) {
  const center = getCenterInfo(citySlug)

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${center.geo.latitude},${center.geo.longitude}`

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          How to Reach Our Center from {areaName}
        </h2>
        <p className="text-gray-600 mb-8">
          Our nearest center: <strong>{center.name}</strong>
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {nearbyMetro.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Train className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">By Metro</h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                {nearbyMetro.slice(0, 3).map((metro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Board from <strong>{metro}</strong></span>
                  </li>
                ))}
                <li className="flex items-start gap-2 text-blue-700 font-medium mt-3">
                  <Navigation className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Get off at nearest station to {center.addressLocality} center</span>
                </li>
              </ul>
            </div>
          )}

          <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Car className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900">By Road</h3>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span>Distance: <strong>{distanceFromCenter}</strong> from {areaName}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span>Address: <strong>{center.streetAddress}, {center.addressLocality}</strong></span>
              </li>
              {center.nearbyLandmarks.slice(0, 2).map((landmark, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{landmark}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900">Timings & Contact</h3>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <span>Mon-Sat: <strong>7:00 AM - 9:00 PM</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <span>Sunday: <strong>9:00 AM - 6:00 PM</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <span>Online classes available <strong>24/7</strong></span>
              </li>
            </ul>
          </div>
        </div>

        {landmarks.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              Key Landmarks Near {areaName}
            </h3>
            <div className="flex flex-wrap gap-2">
              {landmarks.map((landmark, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg"
          >
            <Navigation className="w-5 h-5 mr-2" />
            Get Directions to {center.addressLocality} Center
          </a>
        </div>
      </div>
    </section>
  )
}
