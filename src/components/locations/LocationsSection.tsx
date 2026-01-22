'use client'

import { locations } from '@/data/locations'
import { MapPin, Phone, Clock } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

export function LocationsSection() {
  const headerAnim = useScrollAnimation()
  const gridAnim = useScrollAnimation()

  return (
    <section className="py-12 xs:py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
        <div
          ref={headerAnim.ref}
          className={`text-center mb-8 xs:mb-10 sm:mb-12 transition-all duration-600 ${
            headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-2 xs:mb-3">
            Visit Our Centers
          </h2>
          <p className="text-base xs:text-lg text-gray-600">
            4 convenient locations across Delhi-NCR
          </p>
        </div>

        <div
          ref={gridAnim.ref}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 transition-all duration-600 ${
            gridAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {locations.map((location, index) => (
            <div
              key={location.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header with Icon */}
              <div className="bg-[#3d4d3d] px-4 py-6 xs:py-8 flex items-center justify-center">
                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 xs:p-5">
                <h3 className="text-base xs:text-lg font-bold text-gray-900 mb-3">
                  {location.name}
                </h3>

                <div className="space-y-2.5 mb-4">
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-[#3d4d3d] mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="line-clamp-2">{location.address}</span>
                      <span className="block text-gray-500">{location.city}, {location.pincode}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 text-[#3d4d3d] mr-2 flex-shrink-0" />
                    <a
                      href={`tel:${location.phone[0]}`}
                      className="text-[#3d4d3d] hover:underline font-medium"
                    >
                      {location.phone[0]}
                    </a>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-[#3d4d3d] mr-2 flex-shrink-0" />
                    <span>Mon-Sat: 8:00 AM - 8:00 PM</span>
                  </div>
                </div>

                <a
                  href={location.googleMapsUrl}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-[#3d4d3d] text-white py-2.5 rounded-lg font-medium text-sm hover:bg-[#4a5d4a] transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
