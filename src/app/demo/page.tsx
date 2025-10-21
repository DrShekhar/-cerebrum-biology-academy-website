import { Metadata } from 'next'
import { DemoBookingForm } from '@/components/demo/DemoBookingForm'
import { Video, Users, Clock, Award, CheckCircle, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Book Free Demo Class | NEET Biology Coaching | Cerebrum Academy',
  description:
    '🎯 Book your FREE NEET Biology demo class! Live 1-on-1 session with AIIMS faculty. Cell Biology + NEET strategy. 94.2% success rate. Book now!',
  keywords: [
    'free demo class',
    'NEET biology demo',
    'free trial class',
    'biology demo booking',
    'NEET preparation demo',
    'free biology class',
    'demo class booking',
    'trial biology coaching',
  ],
}

export default function DemoBookingPage() {
  const benefits = [
    {
      icon: Video,
      title: 'Live 1-on-1 Session',
      description: 'Personal attention from AIIMS graduate faculty',
      color: 'text-blue-600',
    },
    {
      icon: Users,
      title: 'Expert AIIMS Faculty',
      description: 'Learn from doctors who cracked NEET themselves',
      color: 'text-green-600',
    },
    {
      icon: Clock,
      title: '60-Minute Demo',
      description: 'Complete Cell Biology concept + NEET strategy',
      color: 'text-purple-600',
    },
    {
      icon: Award,
      title: '94.2% Success Rate',
      description: 'Join 10,000+ students who qualified NEET',
      color: 'text-orange-600',
    },
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      score: '685/720',
      college: 'AIIMS Delhi',
      text: "The demo class convinced me to join. Dr. Priya's teaching style is amazing!",
      rating: 5,
    },
    {
      name: 'Rahul Kumar',
      score: '648/720',
      college: 'JIPMER',
      text: 'Best biology coaching! The demo gave me confidence I could crack NEET.',
      rating: 5,
    },
    {
      name: 'Ananya Patel',
      score: '672/720',
      college: 'AFMC',
      text: 'Crystal clear concepts in just one demo class. Highly recommended!',
      rating: 5,
    },
  ]

  const demoTopics = [
    'Cell Biology Fundamentals',
    'NEET Question Patterns',
    'Time Management Strategy',
    'Common Mistakes to Avoid',
    'Study Plan Customization',
    'Doubt Resolution Techniques',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <CheckCircle className="w-4 h-4 mr-2" />
              100% FREE Demo Class
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Experience NEET Biology
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Mastery Live!
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Book your FREE 60-minute demo class with AIIMS faculty. Learn Cell Biology concepts +
              get personalized NEET strategy. No payment required!
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-gray-700 font-medium">AIIMS Faculty</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <Clock className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-gray-700 font-medium">60 Minutes</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <Award className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-gray-700 font-medium">94.2% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Demo Booking Form */}
            <div className="order-2 lg:order-1 space-y-6">
              {/* WhatsApp Quick Booking */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                    ⚡ FASTEST BOOKING OPTION
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Book via WhatsApp (1-Click)
                  </h3>
                  <p className="text-green-800 font-semibold mb-1">
                    2,000+ bookings this month via WhatsApp
                  </p>
                  <p className="text-sm text-gray-600">
                    Instant confirmation • No form filling • Human support
                  </p>
                </div>

                <a
                  href="https://wa.me/918826444334?text=Hi%2C%20I%20want%20to%20book%20a%20FREE%20demo%20class%20for%20NEET%20Biology%20coaching.%20Please%20help%20me%20with%20the%20next%20steps."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 w-full"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-lg">Book via WhatsApp</span>
                    <span className="text-xs opacity-90">Get instant confirmation</span>
                  </div>
                </a>

                <div className="mt-4 pt-4 border-t border-green-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Response within 2 minutes</span>
                  </div>
                </div>
              </div>

              {/* OR Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-500 font-medium">
                    OR fill the form below
                  </span>
                </div>
              </div>

              <DemoBookingForm className="sticky top-8" />
            </div>

            {/* Benefits & Information */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* What You'll Get */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Video className="w-6 h-6 text-blue-600 mr-3" />
                  What You'll Get in Demo Class
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {demoTopics.map((topic, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Demo?</h2>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`p-3 rounded-lg ${benefit.color} bg-opacity-10 mr-4`}>
                        <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Stories */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h2>
                <div className="space-y-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.college}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600 text-lg">
                            {testimonial.score}
                          </div>
                          <div className="flex items-center">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 italic">"{testimonial.text}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo Process */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      1
                    </div>
                    <span className="text-gray-700">Fill the booking form (2 minutes)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      2
                    </div>
                    <span className="text-gray-700">Get WhatsApp confirmation instantly</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      3
                    </div>
                    <span className="text-gray-700">Receive Zoom link 30 minutes before class</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      4
                    </div>
                    <span className="text-gray-700">
                      Attend live 1-on-1 demo with AIIMS faculty
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200 text-center">
                <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  100% Satisfaction Guarantee
                </h3>
                <p className="text-gray-700">
                  If you're not completely satisfied with the demo class, we'll provide additional
                  free sessions until you are!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Is the demo class really free?',
                a: "Yes! Absolutely no payment required. It's our way of showing you the quality of our teaching.",
              },
              {
                q: 'What technology do I need for the demo?',
                a: 'Just a computer/mobile with internet connection. We use Zoom for live classes.',
              },
              {
                q: 'Can I reschedule my demo class?',
                a: 'Yes, you can reschedule up to 4 hours before the scheduled time via WhatsApp.',
              },
              {
                q: 'Will I get study materials after the demo?',
                a: "Yes! We'll share sample notes and practice questions based on the demo topic.",
              },
              {
                q: 'How long is the demo class?',
                a: 'Each demo session is 60 minutes - 40 minutes teaching + 20 minutes Q&A and counseling.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
