'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  MapPin,
  Users,
  Star,
  CheckCircle,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Navigation,
  Building,
  Wifi,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const offlineCenters = [
  {
    name: 'Rohini Center',
    address: 'DC Chauk Sector 9, Rohini, Delhi 110085',
    areas: ['Rohini', 'Pitampura', 'Shalimar Bagh', 'Model Town'],
    status: 'Open',
  },
  {
    name: 'Gurugram Center',
    address: 'Unit 17, M2K Corporate Park, Sector 51 (Mayfield Garden), Gurugram 122018',
    areas: ['DLF', 'Sushant Lok', 'Golf Course Road', 'Sector 56'],
    status: 'Open',
  },
  {
    name: 'South Delhi Center',
    address: 'Block D, Near McD, South Extension Part 2, Delhi 110049',
    areas: ['GK', 'Hauz Khas', 'Vasant Vihar', 'Defence Colony'],
    status: 'Open',
  },
  {
    name: 'Faridabad Center',
    address: 'Sector 21, Faridabad 121001',
    areas: ['NIT', 'Greater Faridabad', 'Ballabgarh', 'Neharpar'],
    status: 'Coming Soon',
  },
]

const classFeatures = [
  {
    icon: Users,
    title: 'Small Batches',
    description: '15-20 students per batch for personalized attention',
  },
  {
    icon: Video,
    title: 'Hybrid Learning',
    description: 'Choose between online and offline modes as per convenience',
  },
  {
    icon: BookOpen,
    title: 'Complete Materials',
    description: 'Comprehensive notes, DPPs, and test series included',
  },
  {
    icon: MessageCircle,
    title: '24/7 Support',
    description: 'WhatsApp doubt resolution anytime',
  },
]

const faqs = [
  {
    question: 'How do I find biology classes near my location?',
    answer:
      'We have offline centers in Rohini, Gurugram, South Delhi, and Faridabad. If you are not near these centers, our online classes provide the same quality education with live interactive sessions. Use the location selector above to find the nearest center or choose online mode.',
  },
  {
    question: 'Are offline and online classes the same quality?',
    answer:
      'Yes! Both offline and online batches are taught by the same AIIMS-trained faculty using identical curriculum. Online classes offer additional benefits like recorded lectures and flexible timing.',
  },
  {
    question: 'Can I switch between online and offline modes?',
    answer:
      'Yes, we offer hybrid learning. You can attend offline classes when convenient and switch to online mode when needed. This flexibility is available for all enrolled students.',
  },
  {
    question: 'What areas do your offline centers cover?',
    answer:
      'Our Rohini center covers North Delhi, Gurugram center covers entire Gurgaon and parts of South Delhi, South Extension center covers South Delhi, and Faridabad center covers the entire Faridabad district.',
  },
]

export default function BiologyClassesNearMePage() {
  const [userLocation, setUserLocation] = useState<string | null>(null)
  const [showLocationModal, setShowLocationModal] = useState(false)

  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation')
    if (savedLocation) {
      setUserLocation(savedLocation)
    }
  }, [])

  const handleLocationSelect = (location: string) => {
    setUserLocation(location)
    localStorage.setItem('userLocation', location)
    setShowLocationModal(false)
  }

  return (
    <div className="min-h-screen">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-violet-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              Find Classes Near You
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">Biology Classes</span> Near Me
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              4 Offline Centers in Delhi NCR + Pan-India Online Classes
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              {userLocation
                ? `Showing classes near ${userLocation}. Our expert AIIMS-trained faculty is ready to help you excel in NEET & board exams.`
                : 'Find the best biology classes near your location. Choose from our offline centers in Delhi NCR or join our interactive online classes from anywhere.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                className="bg-yellow-500 text-black hover:bg-yellow-400"
                onClick={() => setShowLocationModal(true)}
              >
                <Navigation className="w-5 h-5 mr-2" />
                {userLocation ? 'Change Location' : 'Select Your Location'}
              </Button>

              <Link href="/demo-booking">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-indigo-900"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">4</div>
                <div className="text-xs opacity-80">Offline Centers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">Pan-India</div>
                <div className="text-xs opacity-80">Online Coverage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">15-20</div>
                <div className="text-xs opacity-80">Students/Batch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-300">98%</div>
                <div className="text-xs opacity-80">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Your Location</h3>

            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-gray-700">Delhi NCR (Offline Available)</h4>
              {['Rohini, Delhi', 'Gurugram', 'South Delhi', 'Faridabad', 'Noida', 'Ghaziabad'].map(
                (loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocationSelect(loc)}
                    className="w-full text-left p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition flex items-center"
                  >
                    <Building className="w-5 h-5 mr-3 text-blue-600" />
                    {loc}
                    {['Rohini, Delhi', 'Gurugram', 'South Delhi'].includes(loc) && (
                      <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Center Available
                      </span>
                    )}
                  </button>
                )
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Other Cities (Online Classes)</h4>
              {['Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Other'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocationSelect(loc)}
                  className="w-full text-left p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition flex items-center"
                >
                  <Wifi className="w-5 h-5 mr-3 text-green-600" />
                  {loc}
                  <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Online
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowLocationModal(false)}
              className="mt-6 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}

      {/* Offline Centers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Offline Centers in Delhi NCR
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit us at any of our centers or join our online classes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {offlineCenters.map((center, index) => (
              <motion.div
                key={center.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{center.name}</h3>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${center.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                  >
                    {center.status}
                  </span>
                </div>
                <div className="flex items-start text-gray-600 mb-4">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                  {center.address}
                </div>
                <div className="text-sm text-gray-500">
                  <strong>Nearby Areas:</strong> {center.areas.join(', ')}
                </div>
                <Link href="/demo-booking" className="mt-4 inline-block">
                  <Button variant="outline" size="sm">
                    Book Visit
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Classes Option */}
      <section className="py-20 bg-[#4a5d4a] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Wifi className="w-16 h-16 mb-6 text-yellow-300" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Not Near Our Centers? Join Online!
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Our online classes offer the same quality education as offline - same faculty, same
                curriculum, same results. Plus added benefits of recorded lectures and flexibility.
              </p>
              <div className="space-y-4">
                {[
                  'Live interactive classes',
                  'Same AIIMS-trained faculty',
                  'Recorded lectures for revision',
                  'Digital study materials',
                  '24/7 doubt support',
                ].map((item) => (
                  <div key={item} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-yellow-300" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Start Your Journey Today</h3>
                <p className="opacity-90 mb-6">
                  Book a free demo class and experience our teaching methodology
                </p>
                <Link href="/demo-booking">
                  <Button
                    variant="secondary"
                    size="xl"
                    className="bg-yellow-500 text-black hover:bg-yellow-400"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Book Free Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {classFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Start Your Biology Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a free demo class today - online or at our nearest center!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>
              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-indigo-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Classes
            </Link>
            <Link
              href="/biology-tuition-near-me"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tuition Near Me
            </Link>
            <Link
              href="/biology-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Coaching
            </Link>
            <Link
              href="/neet-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
