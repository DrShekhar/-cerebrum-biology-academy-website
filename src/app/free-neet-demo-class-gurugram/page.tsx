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
  title: 'Free NEET Demo Class Gurugram | Book Now | Cerebrum Biology Academy',
  description:
    'Book your FREE NEET Biology demo class in Gurugram. Experience AIIMS faculty teaching, small batches, and our proven methodology. Online & offline options. No obligation. Call 88264-44334!',
  keywords: [
    'free neet demo class gurugram',
    'free neet trial class gurgaon',
    'neet biology free demo',
    'free neet coaching demo gurugram',
    'try neet classes free gurugram',
    'neet demo class near me',
    'free biology class neet gurugram',
    'book free neet class gurgaon',
  ],
  openGraph: {
    title: 'Free NEET Demo Class Gurugram | Cerebrum Biology Academy',
    description: 'Book your FREE NEET demo class. Experience our teaching before you decide.',
    url: 'https://cerebrumbiologyacademy.com/free-neet-demo-class-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/free-neet-demo-class-gurugram',
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
    description: 'Choose to attend at our center or join from home via Zoom',
  },
  {
    icon: Gift,
    title: 'Free Study Material',
    description: 'Get sample notes and practice questions to take home',
  },
]

const faqs = [
  {
    question: 'Is the demo class really free?',
    answer:
      'Yes, 100% free with no obligation. We believe in our teaching quality and want you to experience it before making any decision. No credit card or payment required.',
  },
  {
    question: 'What topic will be covered in the demo?',
    answer:
      'We cover a high-yield NEET Biology topic (usually from Cell Biology or Human Physiology). You will see our teaching methodology, doubt-solving approach, and class management.',
  },
  {
    question: 'Can parents attend the demo class?',
    answer:
      'Absolutely! We encourage parents to sit in for the first 15-20 minutes to understand our teaching approach. You can also discuss your child\'s preparation with our counselors afterward.',
  },
  {
    question: 'How do I book a demo class?',
    answer:
      'Call us at 88264-44334 or fill the form on this page. We will schedule your demo within 24-48 hours based on your preferred timing (weekday evening or weekend morning).',
  },
  {
    question: 'What if I dont like the demo class?',
    answer:
      'No problem at all! The demo is completely no-obligation. If our teaching style doesnt suit you, you are free to explore other options. We only want students who genuinely benefit from our approach.',
  },
]

const demoSlots = [
  { day: 'Monday - Friday', time: '5:00 PM - 6:00 PM', type: 'Evening Slot' },
  { day: 'Saturday', time: '10:00 AM - 11:00 AM', type: 'Weekend Morning' },
  { day: 'Sunday', time: '10:00 AM - 11:00 AM', type: 'Weekend Morning' },
  { day: 'Online', time: 'Flexible Timing', type: 'Zoom Class' },
]

export default function FreeNEETDemoClassGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-green-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Gift className="w-4 h-4" />
              100% Free | No Obligation
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free NEET Demo Class in Gurugram
            </h1>
            <p className="text-xl text-green-100 mb-4">
              Experience our AIIMS faculty teaching before you decide. Book your free 60-minute demo
              class today!
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
                href="tel:+918826444334"
                className="bg-yellow-500 text-green-900 px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 hover:bg-yellow-400 transition shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Book Demo: 88264-44334
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
              href="tel:+918826444334"
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
                  <h3 className="font-bold mb-1">Meet Your Future Batchmates</h3>
                  <p className="text-gray-600">
                    See the caliber of students, class atmosphere, and how doubts are handled.
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
                    Ask about batch timings, fees, study material, success stories - everything.
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
            <h2 className="text-2xl font-bold mb-6 text-center">Demo Class Location</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Offline Demo - Gurugram Center</p>
                    <p className="text-gray-600">M2K Corporate Park, Sector 51</p>
                    <p className="text-gray-600">Gurugram 122018</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Online Demo - Zoom</p>
                    <p className="text-gray-600">Join from anywhere in India</p>
                    <p className="text-gray-600">Link sent after booking</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <a
                  href="tel:+918826444334"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-center hover:bg-green-700 transition mb-3"
                >
                  <Phone className="w-5 h-5 inline mr-2" />
                  Call: 88264-44334
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
            Join 100+ students who booked demo this month. No payment required, no obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
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
            name: 'Free NEET Biology Demo Class',
            description:
              'Free 60-minute demo class for NEET Biology preparation with AIIMS faculty',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
            location: [
              {
                '@type': 'Place',
                name: 'Cerebrum Biology Academy',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'M2K Corporate Park, Sector 51',
                  addressLocality: 'Gurugram',
                  addressRegion: 'Haryana',
                  postalCode: '122018',
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
