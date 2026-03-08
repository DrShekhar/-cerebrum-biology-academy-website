'use client'

import {
  Calendar,
  Clock,
  Users,
  Video,
  Star,
  BookOpen,
  Phone,
  MessageCircle,
  Microscope,
  GraduationCap,
  CheckCircle,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

export default function DemoPage() {
  const demoFeatures = [
    {
      icon: Video,
      title: 'Live Interactive Session',
      description: 'Experience our unique teaching methodology with real-time doubt clearing',
    },
    {
      icon: Microscope,
      title: 'NEET-Focused Content',
      description: 'Get a preview of our NEET-specific biology curriculum and exam strategies',
    },
    {
      icon: Users,
      title: 'Meet Our Faculty',
      description: 'Interact with our experienced biology teachers and understand their approach',
    },
    {
      icon: BookOpen,
      title: 'Study Materials Preview',
      description: 'Access sample study materials, notes, and practice questions',
    },
  ]

  const facultyPreview = [
    {
      name: 'Dr. Priya Sharma',
      qualification: 'Ph.D. Botany, 15+ years experience',
      specialization: 'Plant Physiology & Ecology',
    },
    {
      name: 'Dr. Rajesh Kumar',
      qualification: 'M.Sc. Zoology, 15+ years experience',
      specialization: 'Human Physiology & Genetics',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center animate-fadeInUp">
            <div className="inline-flex items-center space-x-2 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-semibold mb-6">
              <Star className="w-5 h-5" />
              <span>Free Demo Class Available</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Experience Our Teaching
              <span className="block text-yellow-300">Before You Enroll</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Join our free demo class and discover why 98% of our students crack NEET. Experience
              our unique teaching methodology and meet our expert faculty.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-300">1 Hour</div>
                <div className="text-blue-200">Live Demo Class</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">Free</div>
                <div className="text-blue-200">No Hidden Charges</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">Expert</div>
                <div className="text-blue-200">Faculty Teaching</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What You'll Experience</h2>
            <p className="text-xl text-gray-600">
              Get a comprehensive preview of our teaching methodology and course structure
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {demoFeatures.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300 animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Book Your Free Demo Class
            </h2>
            <p className="text-xl text-gray-600">
              Connect with us instantly — no forms, no waiting!
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 animate-fadeInUp">
            <div className="space-y-4 mb-8">
              <button
                type="button"
                onClick={() =>
                  trackAndOpenWhatsApp({
                    source: 'support-demo-page',
                    message:
                      'Hi! I want to book a FREE Demo Class for NEET Biology. Please confirm my demo slot!',
                    campaign: 'demo-booking',
                  })
                }
                className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-green-500/25 transition-all min-h-[56px] touch-manipulation"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp Us Now
              </button>

              <a
                href="tel:+918826444334"
                className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/25 transition-all min-h-[56px] touch-manipulation"
              >
                <Phone className="w-6 h-6" />
                Call: +91 88264 44334
              </a>
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-200">
              {[
                'Instant response on WhatsApp',
                'Choose your preferred day and time',
                '100% free — no hidden charges',
                'AIIMS faculty demo session',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Faculty</h2>
            <p className="text-xl text-gray-600">
              Learn from experienced educators who have helped thousands crack NEET
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {facultyPreview.map((faculty, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center animate-fadeInUp">
                <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <GraduationCap className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{faculty.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{faculty.qualification}</p>
                <p className="text-gray-600">{faculty.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our counseling team is here to help you choose the right course and demo session
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="tel:+918826444334" className="flex items-center space-x-2 hover:text-blue-200">
              <Phone className="w-5 h-5" />
              <span>+91 88264 44334</span>
            </a>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Mon-Sat, 8 AM - 9 PM</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Instant Response</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
