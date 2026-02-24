import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  CheckCircle,
  Clock,
  Users,
  Video,
  MapPin,
  ArrowRight,
  Gift,
  Star,
  Award,
  BookOpen,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free NEET Demo Class Greater Noida | Book Now',
  description:
    'Book your FREE NEET Biology demo class in Greater Noida. Experience AIIMS faculty teaching, small batches, and our proven methodology. Online & offline options. No obligation. Call 99536-43938!',
  keywords: [
    'free neet demo class greater noida',
    'free neet trial class greater noida',
    'neet biology free demo greater noida',
    'free neet coaching demo greater noida',
    'try neet classes free greater noida',
    'neet demo class near me greater noida',
    'free biology class neet greater noida',
    'book free neet class greater noida',
  ],
  openGraph: {
    title: 'Free NEET Demo Class Greater Noida',
    description:
      'Book your FREE NEET demo class. Online from Greater Noida home or offline at Sector 62 Noida. Experience our teaching before you decide.',
    url: 'https://cerebrumbiologyacademy.com/free-neet-demo-class-greater-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/free-neet-demo-class-greater-noida',
  },
}

const demoIncludes = [
  {
    icon: BookOpen,
    title: '60-Min Live Class',
    description: 'Experience a full-length class on a high-yield NEET Biology topic',
  },
  {
    icon: Users,
    title: 'Meet Dr. Shekhar Singh',
    description: 'Interact with our AIIMS-trained faculty who will teach your batch',
  },
  {
    icon: Video,
    title: 'Online or Offline',
    description:
      'Join online from your Greater Noida home via Zoom, or visit our Sector 62, Noida center',
  },
  {
    icon: Gift,
    title: 'Free Study Material',
    description: 'Get sample notes and practice questions to take home',
  },
]

const faqs = [
  {
    question: 'Is the demo class really free for Greater Noida students?',
    answer:
      'Yes, 100% free with no obligation. We believe in our teaching quality and want you to experience it before making any decision. No credit card or payment required. Greater Noida students can join online from home.',
  },
  {
    question: 'What topic will be covered in the demo?',
    answer:
      'We cover a high-yield NEET Biology topic (usually from Cell Biology or Human Physiology). You will see our teaching methodology, doubt-solving approach, and class management.',
  },
  {
    question: 'Can Greater Noida students attend the demo online?',
    answer:
      'Absolutely! Greater Noida students can attend the demo class online via Zoom from their home. No need to travel to Noida for the demo. Online demo is available on weekdays evenings and weekends.',
  },
  {
    question: 'How do I book a demo class from Greater Noida?',
    answer:
      'Call us at 99536-43938 or fill the form on this page. We will schedule your demo within 24-48 hours based on your preferred timing (online or offline, weekday evening or weekend morning).',
  },
  {
    question: 'What if I dont like the demo class?',
    answer:
      'No problem at all! The demo is completely no-obligation. If our teaching style doesnt suit you, you are free to explore other options. We only want students who genuinely benefit from our approach.',
  },
]

const demoSlots = [
  { day: 'Monday - Friday', time: '5:00 PM - 6:00 PM', type: 'Online Evening Slot' },
  { day: 'Saturday', time: '10:00 AM - 11:00 AM', type: 'Weekend Morning (Online/Offline)' },
  { day: 'Sunday', time: '10:00 AM - 11:00 AM', type: 'Weekend Morning (Online/Offline)' },
  { day: 'Online', time: 'Flexible Timing', type: 'Zoom Class - Any Day' },
]

export default function FreeNEETDemoClassGreaterNoida() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-green-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Gift className="w-4 h-4" />
              100% Free | No Obligation | Online Available
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free NEET Demo Class in Greater Noida
            </h1>
            <p className="text-xl text-green-100 mb-4">
              Experience our AIIMS faculty teaching before you decide. Book your free 60-minute demo
              class today! Join online from your Greater Noida home or visit our Sector 62, Noida
              center.
            </p>
            <div className="flex items-center justify-center gap-4 text-yellow-300 mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>98% Success Rate</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+919953643938"
                className="bg-yellow-500 text-green-900 px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 hover:bg-yellow-400 transition shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Book Demo: 99536-43938
              </a>
              <Link
                href="/demo-booking"
                className="bg-white text-green-700 px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 hover:bg-green-50 transition"
              >
                Book Online
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Demo Includes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What Your Free Demo Includes</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Get the complete Cerebrum experience in one session - no strings attached
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {demoIncludes.map((item, index) => (
              <div
                key={index}
                className="bg-green-50 p-6 rounded-xl text-center border-2 border-green-100"
              >
                <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Slots */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Available Demo Slots</h2>
          <p className="text-center text-gray-600 mb-12">Choose a time that works for you</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {demoSlots.map((slot, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-green-600 font-semibold text-sm mb-2">{slot.type}</div>
                <div className="font-bold text-lg mb-1">{slot.day}</div>
                <div className="text-gray-600 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  {slot.time}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="tel:+919953643938"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              <Phone className="w-5 h-5" />
              Call to Book Your Slot
            </a>
          </div>
        </div>
      </section>

      {/* Why Try Demo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Try Our Demo Class?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">See Teaching Quality First-Hand</h3>
                  <p className="text-gray-600">
                    Dont rely on reviews alone. Experience how Dr. Shekhar Singh explains complex
                    concepts simply.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">No Travel Required (Online Available)</h3>
                  <p className="text-gray-600">
                    Greater Noida students can attend the demo online from home. No need to travel
                    to Noida just for a trial class.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Assess Your Current Level</h3>
                  <p className="text-gray-600">
                    Our faculty will give honest feedback on your preparation status and gaps.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Get Your Questions Answered</h3>
                  <p className="text-gray-600">
                    Ask about online/hybrid options, batch timings, fees, study material — everything
                    relevant for Greater Noida students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Demo Class Options</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <Video className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Online Demo (Recommended for Greater Noida)</p>
                    <p className="text-gray-600">Join from your Greater Noida home via Zoom</p>
                    <p className="text-gray-600">Link sent after booking — zero travel</p>
                    <p className="text-sm text-green-600 mt-1">Most popular choice</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Offline Demo - Noida Center</p>
                    <p className="text-gray-600">B-45, Sector 62</p>
                    <p className="text-gray-600">Noida, UP 201301</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Aqua Line Metro → Blue Line → Sector 62 Metro Station
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <a
                  href="tel:+919953643938"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-center hover:bg-green-700 transition mb-3"
                >
                  <Phone className="w-5 h-5 inline mr-2" />
                  Call: 99536-43938
                </a>
                <p className="text-center text-gray-600 text-sm">
                  Or WhatsApp us for instant booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Demo Class FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className="text-green-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join 100+ Greater Noida students who booked demo this month. No payment required, no
            obligation. Online from home!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919953643938"
              className="bg-yellow-500 text-green-900 px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Book Free Demo Now
            </a>
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: 'Free NEET Biology Demo Class for Greater Noida Students',
            description:
              'Free 60-minute demo class for NEET Biology preparation with AIIMS faculty. Online from Greater Noida or offline at Sector 62, Noida.',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
            location: [
              {
                '@type': 'Place',
                name: 'Cerebrum Biology Academy',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'B-45, Sector 62',
                  addressLocality: 'Noida',
                  addressRegion: 'Uttar Pradesh',
                  postalCode: '201301',
                  addressCountry: 'IN',
                },
              },
              {
                '@type': 'VirtualLocation',
                url: 'https://zoom.us',
              },
            ],
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
            },
            organizer: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
          }),
        }}
      />
    </div>
  )
}
