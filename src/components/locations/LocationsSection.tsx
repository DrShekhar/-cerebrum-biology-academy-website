'use client'

import { locations } from '@/data/locations'
import { MapPin, Phone, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export function LocationsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Our Centers</h2>
          <p className="text-xl text-gray-600">Three convenient locations across Delhi-NCR</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <MapPin className="w-16 h-16 text-white" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{location.name}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">{location.address}</p>
                      <p className="text-gray-600">
                        {location.city}, {location.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <a href={`tel:${location.phone[0]}`} className="text-blue-600 hover:underline">
                      {location.phone[0]}
                    </a>
                  </div>

                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{location.timing}</p>
                  </div>
                </div>

                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
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
