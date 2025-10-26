'use client'

import { locations } from '@/data/locations'
import { MapPin, Phone, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export function LocationsSection() {
  return (
    <section className="py-12 xs:py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 xs:px-6 lg:px-8">
        <div className="text-center mb-10 xs:mb-12 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3 xs:mb-4">
            Visit Our Centers
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-gray-600">
            Three convenient locations across Delhi-NCR
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 xs:gap-6 sm:gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              className="bg-white rounded-xl xs:rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-40 xs:h-44 sm:h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <MapPin className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 text-white" />
              </div>

              <div className="p-4 xs:p-5 sm:p-6">
                <h3 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">
                  {location.name}
                </h3>

                <div className="space-y-2.5 xs:space-y-3 mb-4 xs:mb-5 sm:mb-6">
                  <div className="flex items-start">
                    <MapPin className="w-4 xs:w-5 h-4 xs:h-5 text-blue-600 mr-2.5 xs:mr-3 mt-0.5 xs:mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm xs:text-base text-gray-700">{location.address}</p>
                      <p className="text-sm xs:text-base text-gray-600">
                        {location.city}, {location.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-4 xs:w-5 h-4 xs:h-5 text-blue-600 mr-2.5 xs:mr-3 flex-shrink-0" />
                    <a
                      href={`tel:${location.phone[0]}`}
                      className="text-sm xs:text-base text-blue-600 hover:underline"
                    >
                      {location.phone[0]}
                    </a>
                  </div>

                  <div className="flex items-center">
                    <Clock className="w-4 xs:w-5 h-4 xs:h-5 text-blue-600 mr-2.5 xs:mr-3 flex-shrink-0" />
                    <p className="text-sm xs:text-base text-gray-700">{location.timing}</p>
                  </div>
                </div>

                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center py-2.5 xs:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm xs:text-base font-medium"
                >
                  Get Directions
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
