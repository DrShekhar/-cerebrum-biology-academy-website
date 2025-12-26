'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Building,
  Globe,
  Phone,
  Navigation,
  Plane,
  Home,
  Medal,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const offlineCenters = [
  {
    name: 'Rohini Center',
    address: 'Sector 7, Rohini, Delhi - 110085',
    phone: '+91 88264 44334',
    mapLink: 'https://maps.google.com/?q=Cerebrum+Biology+Academy+Rohini',
    areas: ['Rohini', 'Pitampura', 'Shalimar Bagh', 'Model Town'],
  },
  {
    name: 'Gurugram Center',
    address: 'Sector 14, Gurugram, Haryana - 122001',
    phone: '+91 88264 44334',
    mapLink: 'https://maps.google.com/?q=Cerebrum+Biology+Academy+Gurugram',
    areas: ['Gurugram', 'DLF', 'Sohna Road', 'Golf Course Road'],
  },
  {
    name: 'South Extension Center',
    address: 'South Extension Part 2, Delhi - 110049',
    phone: '+91 88264 44334',
    mapLink: 'https://maps.google.com/?q=Cerebrum+Biology+Academy+South+Extension',
    areas: ['South Delhi', 'Greater Kailash', 'Lajpat Nagar', 'Defence Colony'],
  },
  {
    name: 'Faridabad Center',
    address: 'Sector 15, Faridabad, Haryana - 121007',
    phone: '+91 88264 44334',
    mapLink: 'https://maps.google.com/?q=Cerebrum+Biology+Academy+Faridabad',
    areas: ['Faridabad', 'Ballabgarh', 'Palwal', 'NIT'],
  },
]

const relocationBenefits = [
  {
    icon: Award,
    title: 'Personal Mentorship',
    description: 'Direct guidance from Dr. Shekhar Singh, AIIMS-trained biology expert.',
  },
  {
    icon: Users,
    title: 'Peer Learning',
    description: 'Study with highly motivated students. Competition drives excellence.',
  },
  {
    icon: Trophy,
    title: 'Proven Results',
    description:
      'Many students from Tamil Nadu, Bihar, Maharashtra relocated and cracked NEET top ranks.',
  },
  {
    icon: Building,
    title: 'Hostel Facilities',
    description: 'Safe, affordable accommodation available near all our centers.',
  },
]

const successStories = [
  {
    name: 'Priya from Chennai',
    rank: 'AIR 156',
    story:
      'Relocated to Delhi NCR for 8 months. The personal attention and peer learning environment transformed my preparation.',
  },
  {
    name: 'Rahul from Patna',
    rank: 'AIR 423',
    story:
      'Coming from Bihar, I was skeptical about relocation. But the offline experience with Dr. Shekhar Sir was game-changing.',
  },
  {
    name: 'Ananya from Pune',
    rank: 'AIR 289',
    story:
      'My parents were worried about me moving to Delhi. But the results speak for themselves. Best decision ever!',
  },
]

const faqs = [
  {
    question: 'Should I relocate to Delhi NCR for NEET preparation?',
    answer:
      'If you are serious about cracking NEET with a top rank, yes! While online classes are effective, offline coaching with personal mentorship from Dr. Shekhar Singh gives you an edge. Many top rankers from Tamil Nadu, Maharashtra, Bihar chose to relocate for 6-12 months and achieved exceptional results. The peer learning environment, personal attention, and competitive atmosphere are transformational.',
  },
  {
    question: 'What are the offline center locations?',
    answer:
      'We have 4 centers in Delhi NCR: Rohini (North Delhi), Gurugram (Haryana), South Extension (South Delhi), and Faridabad. Each center offers the same quality teaching with small batch sizes of 10-15 students.',
  },
  {
    question: 'Is hostel facility available for outstation students?',
    answer:
      'Yes! We have tie-ups with safe, affordable hostels and PG accommodations near all our centers. Our team helps students find suitable accommodation based on their budget and preferences.',
  },
  {
    question: 'What if I cannot relocate? Is online good enough?',
    answer:
      'Our online program is comprehensive with live classes, recorded lectures, and 24/7 doubt support. Many students have achieved excellent results through online coaching. However, for students aiming for top 500 ranks, we strongly recommend the offline experience for at least 6 months.',
  },
]

export default function BiologyTutorsNearMePage() {
  const [userLocation, setUserLocation] = useState<'delhi_ncr' | 'outside' | 'unknown'>('unknown')
  const [showLocationPrompt, setShowLocationPrompt] = useState(true)

  useEffect(() => {
    // Check if user has previously set location preference
    const savedLocation = localStorage.getItem('userLocationPref')
    if (savedLocation) {
      setUserLocation(savedLocation as 'delhi_ncr' | 'outside')
      setShowLocationPrompt(false)
    }
  }, [])

  const handleLocationSelect = (location: 'delhi_ncr' | 'outside') => {
    setUserLocation(location)
    setShowLocationPrompt(false)
    localStorage.setItem('userLocationPref', location)
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

      {/* Location Prompt Modal */}
      {showLocationPrompt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl"
          >
            <div className="text-center">
              <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Where are you located?</h2>
              <p className="text-gray-600 mb-8">
                This helps us show you the best tutoring options for your location.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => handleLocationSelect('delhi_ncr')}
                  className="w-full p-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-xl transition flex items-center justify-center gap-3"
                >
                  <Building className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-gray-900">I am in Delhi NCR</span>
                </button>

                <button
                  onClick={() => handleLocationSelect('outside')}
                  className="w-full p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl transition flex items-center justify-center gap-3"
                >
                  <Globe className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold text-gray-900">I am outside Delhi NCR</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-indigo-900 text-white py-20 overflow-hidden">
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
              Find Best Biology Tutors Near You
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">Biology Tutors</span> Near Me
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              4 Offline Centers in Delhi NCR | Online Classes Pan India
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Looking for the best biology tutors near you? Whether you&apos;re in Delhi NCR or
              anywhere in India, we have the perfect solution for your biology learning needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/locations">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  View All Centers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content based on location */}
      {userLocation === 'delhi_ncr' && (
        <>
          {/* Offline Centers for Delhi NCR Users */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full text-green-700 font-medium mb-4">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Great! You&apos;re in Delhi NCR
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Visit Our Offline Centers Near You
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Experience personal mentorship with Dr. Shekhar Singh. Small batches, focused
                  learning, and transformational results.
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
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Building className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{center.name}</h3>
                        <p className="text-gray-600 mb-3">{center.address}</p>
                        <div className="flex items-center text-green-600 mb-4">
                          <Phone className="w-4 h-4 mr-2" />
                          <a href={`tel:${center.phone}`} className="hover:underline">
                            {center.phone}
                          </a>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-2">Serving areas:</p>
                          <div className="flex flex-wrap gap-2">
                            {center.areas.map((area) => (
                              <span
                                key={area}
                                className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                              >
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                        <a
                          href={center.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <MapPin className="w-4 h-4 mr-1" />
                          Get Directions
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/demo-booking">
                  <Button size="xl" className="bg-green-600 hover:bg-green-700">
                    <Play className="w-5 h-5 mr-2" />
                    Book Free Demo at Nearest Center
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {userLocation === 'outside' && (
        <>
          {/* Strong Relocation Pitch for Outside Delhi NCR Users */}
          <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center bg-orange-100 px-4 py-2 rounded-full text-orange-700 font-medium mb-4">
                  <Plane className="w-5 h-5 mr-2" />
                  Top Rankers Chose to Relocate
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Online is Good.{' '}
                  <span className="text-orange-600">Offline is Transformational.</span>
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  Many students from Tamil Nadu, Maharashtra, Bihar, and other states relocated to
                  Delhi NCR for 6-12 months and cracked NEET with top ranks. The personal mentorship
                  with Dr. Shekhar Singh makes all the difference.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {relocationBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-lg text-center"
                  >
                    <benefit.icon className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Success Stories */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Students Who Relocated and Succeeded
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {successStories.map((story, index) => (
                    <motion.div
                      key={story.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-orange-50 rounded-xl p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{story.name}</p>
                          <p className="text-orange-600 font-semibold">{story.rank}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm italic">&quot;{story.story}&quot;</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="text-center space-y-4">
                <Link href="/demo-booking">
                  <Button size="xl" className="bg-orange-600 hover:bg-orange-700">
                    <Plane className="w-5 h-5 mr-2" />
                    Plan Your Relocation - Book Demo
                  </Button>
                </Link>
                <p className="text-gray-600">
                  Or{' '}
                  <Link href="/neet-coaching-north-india" className="text-blue-600 hover:underline">
                    explore online classes
                  </Link>{' '}
                  if relocation is not possible
                </p>
              </div>
            </div>
          </section>

          {/* Online Option */}
          <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Can&apos;t Relocate? Join Online
                </h2>
                <p className="text-xl text-gray-600">
                  Our online program has also produced excellent results, though we strongly
                  recommend offline for serious aspirants.
                </p>
              </motion.div>

              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Online Coaching Features
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        Live interactive classes with same faculty
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        Recorded lectures for revision
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        24/7 WhatsApp doubt support
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        Complete study material shipped to your address
                      </li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <Link href="/services/online-classes">
                      <Button size="xl" variant="outline" className="border-blue-600 text-blue-600">
                        <Video className="w-5 h-5 mr-2" />
                        Explore Online Program
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Default content for unknown location */}
      {userLocation === 'unknown' && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Finding the Best Biology Tutor for You
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Select your location above to see personalized options.
            </p>
          </div>
        </section>
      )}

      {/* FAQs Section */}
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

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Find the Best Biology Tutor Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Whether offline in Delhi NCR or online from anywhere - start your journey to success!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Talk to Counselor
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
              href="/biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tutor
            </Link>
            <Link
              href="/biology-home-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Home Tutor
            </Link>
            <Link
              href="/locations"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              All Locations
            </Link>
            <Link
              href="/neet-coaching-north-india"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Online Coaching
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
