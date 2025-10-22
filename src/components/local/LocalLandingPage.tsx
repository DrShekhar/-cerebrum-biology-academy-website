'use client'

import { LocalArea } from '@/data/localAreas'
import { LeadMagnet, getLeadMagnetsByArea } from '@/data/leadMagnets'
import { getTestimonialsByArea } from '@/data/localTestimonials'
import { Button } from '@/components/ui/Button'
import { DemoBookingModal } from '@/components/booking/DemoBookingModal'
import { LeadMagnetModal } from '@/components/local/LeadMagnetModal'
import {
  MapPin,
  Star,
  Users,
  Award,
  CheckCircle,
  Download,
  Play,
  Phone,
  Mail,
  Target,
  Calendar,
  MessageCircle,
  School,
  Train,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface LocalLandingPageProps {
  area: LocalArea
}

export function LocalLandingPage({ area }: LocalLandingPageProps) {
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [selectedLeadMagnet, setSelectedLeadMagnet] = useState<LeadMagnet | null>(null)
  const [showLeadMagnetModal, setShowLeadMagnetModal] = useState(false)

  const leadMagnets = getLeadMagnetsByArea(area.id)
  const localTestimonials = getTestimonialsByArea(area.id)
  const primaryLeadMagnet = leadMagnets[0] // Feature the first one prominently

  const handleLeadMagnetClick = (magnet: LeadMagnet) => {
    setSelectedLeadMagnet(magnet)
    setShowLeadMagnetModal(true)
  }

  const handleBookDemo = () => {
    setShowDemoModal(true)
  }

  const stats = [
    { number: '500+', label: `Students from ${area.name}` },
    { number: '98%', label: 'Success Rate' },
    { number: '160+', label: 'Avg Biology Score' },
    { number: '15+', label: 'Years Experience' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Local Focus */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Local Breadcrumb */}
              <div className="flex items-center text-blue-200 mb-6">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {area.state} &gt; {area.displayName}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Best Biology Teacher in <span className="text-yellow-300">{area.displayName}</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
                {area.description}
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>500+ {area.name} Students</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  <span>AIIMS Faculty</span>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleBookDemo}
                  variant="secondary_cta"
                  size="xl"
                  className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 font-bold"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book FREE Demo Class
                </Button>
                <Button
                  onClick={() => handleLeadMagnetClick(primaryLeadMagnet)}
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Get Free Study Material
                </Button>
              </div>
            </motion.div>

            {/* Hero Image/Stats */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Success Stats Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-6">
                <h3 className="text-2xl font-bold mb-6 text-center">Our {area.name} Results</h3>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-yellow-300 mb-2">{stat.number}</div>
                      <div className="text-sm opacity-80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="font-semibold">Our {area.name} Center</span>
                </div>
                <p className="text-sm opacity-90 mb-4">{area.centerAddress}</p>
                <div className="flex items-center text-sm">
                  <Train className="w-4 h-4 mr-2 text-green-400" />
                  <span>Near {area.transportLinks[0]}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              FREE Resources for {area.name} Students
            </h2>
            <p className="text-xl text-gray-600">
              Download our exclusive study materials used by 500+ successful students from{' '}
              {area.name}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadMagnets.slice(0, 6).map((magnet, index) => (
              <motion.div
                key={magnet.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    {magnet.type === 'pdf' && <Download className="w-8 h-8 text-blue-600" />}
                    {magnet.type === 'video' && <Play className="w-8 h-8 text-blue-600" />}
                    {magnet.type === 'assessment' && <Target className="w-8 h-8 text-blue-600" />}
                    {magnet.type === 'checklist' && (
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    )}
                    {magnet.type === 'strategy-session' && (
                      <MessageCircle className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {magnet.title.replace('[AREA]', area.displayName)}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {magnet.description.replace('[AREA]', area.displayName)}
                  </p>
                  <div className="text-green-600 font-semibold mb-4">{magnet.value}</div>
                </div>

                <ul className="space-y-2 mb-6">
                  {magnet.conversionBenefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      {benefit.replace('[AREA]', area.displayName)}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleLeadMagnetClick(magnet)}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  {magnet.ctaText.replace('[AREA]', area.displayName)}
                </Button>

                {magnet.socialProof && (
                  <p className="text-xs text-gray-500 text-center mt-3">
                    {magnet.socialProof.replace('[AREA]', area.displayName)}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for [Area] */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why {area.name} Students Choose Cerebrum Biology Academy?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {area.uniqueSellingPoints.map((usp, index) => (
              <motion.div
                key={index}
                className="flex items-start p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">{usp}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Success Stories */}
      {localTestimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Success Stories from {area.name} Students
              </h2>
              <p className="text-xl text-gray-600">
                Real students, real results from our {area.name} center
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {localTestimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-gray-50 rounded-3xl p-8 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Success Badge */}
                  <div className="absolute -top-3 left-6 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    NEET Rank: {testimonial.neetScore.rank}
                  </div>

                  {/* Student Info */}
                  <div className="text-center mb-6 mt-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.school}</p>
                    <p className="text-blue-600 font-medium">{testimonial.college}</p>
                  </div>

                  {/* Score Improvement */}
                  <div className="bg-white rounded-2xl p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {testimonial.neetScore.biology}
                        </div>
                        <div className="text-xs text-gray-600">Biology Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {testimonial.neetScore.total}
                        </div>
                        <div className="text-xs text-gray-600">Total Score</div>
                      </div>
                    </div>
                    {testimonial.improvement && (
                      <div className="text-center mt-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          +{testimonial.improvement.biology} Biology Improvement
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 text-sm italic mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Local Details */}
                  <div className="bg-blue-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-blue-900 text-sm mb-2">
                      Why {area.name} Center Worked:
                    </h4>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>🚇 {testimonial.localDetails.transportUsed}</li>
                      <li>📚 {testimonial.localDetails.studySpot}</li>
                      <li>⭐ {testimonial.localDetails.favoriteFeature}</li>
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* More Testimonials CTA */}
            <div className="text-center mt-12">
              <Button onClick={handleBookDemo} variant="primary" size="lg" className="mx-auto">
                Join These Successful Students - Book Demo
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Local Area Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Convenient Location in {area.name}
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    Our {area.name} Center Location
                  </h4>
                  <p className="text-gray-600 ml-7">{area.centerAddress}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Train className="w-5 h-5 text-green-600 mr-2" />
                    Metro Connectivity
                  </h4>
                  <div className="ml-7 flex flex-wrap gap-2">
                    {area.transportLinks.slice(0, 3).map((transport, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {transport}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <School className="w-5 h-5 text-purple-600 mr-2" />
                    Nearby Schools We Serve
                  </h4>
                  <div className="ml-7 space-y-1">
                    {area.demographics.schools.slice(0, 3).map((school, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        • {school}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-3xl shadow-lg p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Our {area.name} Center
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-center p-4 bg-blue-50 rounded-2xl">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Call Us</div>
                    <div className="text-blue-600">+91 88264 44334</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-green-50 rounded-2xl">
                  <MessageCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">WhatsApp</div>
                    <div className="text-green-600">Quick Response</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-purple-50 rounded-2xl">
                  <Mail className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-purple-600">info@cerebrumbiologyacademy.com</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button onClick={handleBookDemo} variant="primary" size="lg" className="w-full">
                  Book Free Demo Class
                </Button>
                <Button
                  onClick={() => handleLeadMagnetClick(primaryLeadMagnet)}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Get Free Study Material
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Join 500+ Successful Students from {area.name}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book your free demo class today and experience the Cerebrum difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleBookDemo}
                variant="secondary_cta"
                size="xl"
                className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
              >
                Book FREE Demo Class
              </Button>
              <Button
                onClick={() => window.open('tel:+918826444334')}
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: +91 88264 44334
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Booking Modal */}
      <DemoBookingModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        courseId="local-demo"
        courseTitle={`Biology Coaching in ${area.displayName}`}
      />

      {/* Lead Magnet Modal */}
      {selectedLeadMagnet && (
        <LeadMagnetModal
          isOpen={showLeadMagnetModal}
          onClose={() => setShowLeadMagnetModal(false)}
          leadMagnet={selectedLeadMagnet}
          area={area}
        />
      )}
    </div>
  )
}
