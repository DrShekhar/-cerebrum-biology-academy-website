'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import { trackPhoneCall } from '@/lib/ads/googleAdsConversion'

interface LocationSectionProps {
  title?: string
  subtitle?: string
}

export function LocationSection({
  title = 'Visit Our Center in South Extension',
  subtitle = 'Conveniently located in the heart of Delhi NCR',
}: LocationSectionProps) {
  const phoneNumber = '918826444334'
  const displayPhone = '+91-88264-44334'
  const email = 'info@cerebrumbiologyacademy.com'
  const address = 'Cerebrum Biology Academy, South Extension, New Delhi'

  const handlePhoneClick = () => {
    trackPhoneCall('location-section', 300)
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-slate-600"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900">Get in Touch</h3>
              <div className="mt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Address</h4>
                    <p className="mt-1 text-slate-600">{address}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Easily accessible from all parts of Delhi NCR including Noida, Gurgaon,
                      Faridabad, and Ghaziabad
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-green-100 p-3">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Phone</h4>
                    <a
                      href={`tel:${phoneNumber}`}
                      onClick={handlePhoneClick}
                      className="mt-1 text-lg font-semibold text-blue-600 hover:underline"
                    >
                      {displayPhone}
                    </a>
                    <p className="mt-1 text-sm text-slate-500">Call us for immediate assistance</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-purple-100 p-3">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Email</h4>
                    <a href={`mailto:${email}`} className="mt-1 text-blue-600 hover:underline">
                      {email}
                    </a>
                    <p className="mt-1 text-sm text-slate-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-yellow-100 p-3">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Working Hours</h4>
                    <p className="mt-1 text-slate-600">Monday - Saturday: 8:00 AM - 8:00 PM</p>
                    <p className="text-slate-600">Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold">Service Areas</h3>
              <p className="mt-4 text-white/90">
                We serve students from all across Delhi NCR region:
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-3 text-white/90">
                <li>• South Delhi</li>
                <li>• Noida</li>
                <li>• Gurgaon</li>
                <li>• Faridabad</li>
                <li>• Ghaziabad</li>
                <li>• Central Delhi</li>
                <li>• East Delhi</li>
                <li>• West Delhi</li>
              </ul>
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-[600px] overflow-hidden rounded-2xl border border-slate-200 shadow-xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5397597147395!2d77.2177!3d28.5672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzAxLjkiTiA3N8KwMTMnMDMuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cerebrum Biology Academy Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
