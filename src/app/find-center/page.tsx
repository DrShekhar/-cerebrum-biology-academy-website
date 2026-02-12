import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, MapPinIcon, Zap, Award, Users, Target } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Find Your Nearest Cerebrum Biology Academy Center - 6 Locations',
  description:
    'Locate Cerebrum Biology Academy centers in Delhi NCR. 6 offline centers in Rohini, Gurugram, South Extension, Green Park, Faridabad, Noida. Visit us or book a demo class.',
  keywords: [
    'cerebrum biology academy near me',
    'cerebrum center locations',
    'neet coaching center delhi ncr',
    'find cerebrum center',
    'biology coaching center',
    'cerebrum rohini gurugram noida',
  ],
  openGraph: {
    title: 'Find Your Nearest Cerebrum Biology Academy Center',
    description: 'Locate our 4 centers in Delhi NCR with addresses, phone numbers, and directions.',
    url: 'https://cerebrumbiologyacademy.com/find-center',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/find-center',
  },
}

const centers = [
  {
    id: 'rohini',
    name: 'Rohini',
    address: '211 Vikas Surya Tower, DC Chauk Sector 9, Rohini, New Delhi - 110085',
    phone: CONTACT_INFO.phone.primary,
    metro: 'DC Chauk Metro Station',
    nearbyAreas: ['Pitampura', 'Shalimar Bagh', 'Netaji Subhash Place'],
    distance: '25 km from Central Delhi',
    students: '850+',
    mapsUrl: 'https://maps.google.com/?q=28.7143,77.1117',
    googleBusinessUrl: CONTACT_INFO.centers.rohini.googleBusinessUrl,
  },
  {
    id: 'gurugram',
    name: 'Gurugram',
    address: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram, Haryana - 122018',
    phone: CONTACT_INFO.phone.primary,
    metro: 'Sector 51 Gurugram',
    nearbyAreas: ['DLF Phase 1', 'Golf Course Road', 'Sushant Lok'],
    distance: '35 km from Delhi Center',
    students: '620+',
    mapsUrl: 'https://maps.google.com/?q=28.4153,77.0499',
    googleBusinessUrl: CONTACT_INFO.centers.gurugram.googleBusinessUrl,
  },
  {
    id: 'south-extension',
    name: 'South Extension',
    address: 'Block D, South Extension Part 2, New Delhi - 110049',
    phone: CONTACT_INFO.phone.primary,
    metro: 'South Extension Market',
    nearbyAreas: ['Greater Kailash', 'Defence Colony', 'Lajpat Nagar'],
    distance: '5 km from AIIMS Delhi',
    students: '780+',
    mapsUrl: 'https://maps.google.com/?q=28.5725,77.2217',
    googleBusinessUrl: CONTACT_INFO.centers.southExtension.googleBusinessUrl,
  },
  {
    id: 'green-park',
    name: 'Green Park',
    address: 'B 113 FF Gulmohar Park, Green Park, New Delhi - 110049',
    phone: CONTACT_INFO.phone.primary,
    metro: 'Green Park Metro Station',
    nearbyAreas: ['Hauz Khas', 'IIT Delhi', 'Panchsheel Park'],
    distance: '15 km from Airport',
    students: '720+',
    mapsUrl: 'https://maps.google.com/?q=28.5597,77.2089',
    googleBusinessUrl: CONTACT_INFO.centers.greenPark.googleBusinessUrl,
  },
  {
    id: 'faridabad',
    name: 'Faridabad',
    address: 'Sector 17, Faridabad, Haryana - 121002',
    phone: CONTACT_INFO.phone.primary,
    metro: 'Sector 17 Market',
    nearbyAreas: ['NHPC Chowk', 'Old Faridabad', 'Ballabgarh'],
    distance: '50 km from Delhi',
    students: '550+',
    mapsUrl: 'https://maps.google.com/?q=28.3870,77.3070',
    googleBusinessUrl: CONTACT_INFO.centers.faridabad.googleBusinessUrl,
  },
  {
    id: 'noida',
    name: 'Noida',
    address: 'B-45, Sector 62, Noida, Uttar Pradesh - 201301',
    phone: CONTACT_INFO.phone.primary,
    metro: 'Sector 62 Metro Station',
    nearbyAreas: ['Electronic City', 'Noida City Centre', 'Indirapuram'],
    distance: '30 km from Delhi Center',
    students: '480+',
    mapsUrl: 'https://maps.google.com/?q=28.6280,77.3649',
    googleBusinessUrl: CONTACT_INFO.centers.noida.googleBusinessUrl,
  },
]

const faqItems = [
  {
    question: 'Which Cerebrum center is closest to me?',
    answer:
      'We have 4 centers strategically located across Delhi NCR: Rohini (North Delhi), Gurugram (Haryana), South Extension & Green Park (South Delhi), Faridabad (Haryana), and Noida (UP). Visit our map above to find the nearest center.',
  },
  {
    question: 'What are the center timings?',
    answer:
      'All centers are open from morning to evening with flexible batch timings. Classes run from 7:00 AM to 9:00 PM to accommodate students of all schedules. Contact your nearest center for specific batch timings.',
  },
  {
    question: 'Do you offer online classes if I cannot visit a center?',
    answer:
      'Yes! We offer hybrid classes - learn offline at our centers or online via live interactive sessions. You get the same faculty, curriculum, and test series whether you join offline or online.',
  },
  {
    question: 'Can I attend a demo class before enrolling?',
    answer:
      'Absolutely! All our centers offer free demo classes. Simply call ' +
      CONTACT_INFO.phone.primary +
      ' or WhatsApp us to book a demo. You can attend at any of our 4 centers.',
  },
  {
    question: 'Is there a center closest to my school?',
    answer:
      'With 6 strategically located centers, most Delhi NCR students find a center within 10-15 km. If you live in an area between two centers, you can join either based on your convenience.',
  },
  {
    question: 'What is the parking facility at centers?',
    answer:
      'All our centers have adequate parking space. Our centers are well-connected by metro and public transport. Many students use metro as it is faster and avoids traffic.',
  },
]

export default function FindCenterPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Nearest Cerebrum Center</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Visit our 6 strategically located centers across Delhi NCR. Expert faculty, world-class infrastructure,
            and proven results awaiting you.
          </p>
        </div>
      </section>

      {/* Centers Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">All Cerebrum Centers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centers.map((center) => (
              <div
                key={center.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-t-4 border-green-500"
              >
                <div className="p-6">
                  {/* Center Name */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{center.name}</h3>

                  {/* Students Count */}
                  <div className="flex items-center text-sm text-gray-600 mb-4 pb-4 border-b">
                    <Users className="w-4 h-4 mr-2 text-green-500" />
                    <span>
                      <strong>{center.students}</strong> students trained
                    </span>
                  </div>

                  {/* Address */}
                  <div className="mb-4 flex gap-2">
                    <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm">{center.address}</p>
                  </div>

                  {/* Phone */}
                  <div className="mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-500" />
                    <a href={`tel:${center.phone}`} className="text-green-600 hover:text-green-700 font-semibold">
                      {center.phone}
                    </a>
                  </div>

                  {/* Metro */}
                  <div className="mb-4 flex items-center gap-2 text-gray-700">
                    <MapPinIcon className="w-5 h-5 text-yellow-800" />
                    <span className="text-sm">{center.metro}</span>
                  </div>

                  {/* Nearby Areas */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 font-semibold mb-2">NEARBY AREAS</p>
                    <div className="flex flex-wrap gap-2">
                      {center.nearbyAreas.map((area) => (
                        <span key={area} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Distance */}
                  <div className="mb-6 p-3 bg-green-50 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>Distance:</strong> {center.distance}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={center.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded font-medium text-center text-sm hover:bg-green-600 transition"
                    >
                      Get Directions
                    </a>
                    <a
                      href={`tel:${center.phone}`}
                      className="flex-1 bg-yellow-800 text-white px-4 py-2 rounded font-medium text-center text-sm hover:bg-yellow-900 transition"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Cerebrum */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Why Choose Cerebrum</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: '98% Success Rate', desc: 'Best in class NEET results' },
              { icon: Target, title: 'Expert Faculty', desc: 'AIIMS-trained instructors' },
              { icon: Zap, title: 'Modern Labs', desc: 'State-of-the-art facilities' },
              { icon: Users, title: 'Small Batches', desc: '10-12 students per class' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <item.icon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <details
                key={idx}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-50">
                  <h3 className="font-semibold text-gray-900 pr-4">{item.question}</h3>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Medical Journey?</h2>
          <p className="text-lg mb-8">Book a FREE demo class at your nearest Cerebrum center today!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              className="bg-yellow-800 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-900 transition inline-block"
            >
              Call {CONTACT_INFO.phone.primary}
            </a>
            <a
              href={`https://wa.me/91${CONTACT_INFO.phone.primary.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-block"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <LocalBusinessSchema locationId="rohini" />
      <LocalBusinessSchema locationId="gurugram" />
      <LocalBusinessSchema locationId="south-extension" />
      <LocalBusinessSchema locationId="green-park" />
      <LocalBusinessSchema locationId="faridabad" />
      <LocalBusinessSchema locationId="noida" />

      {/* ItemList Schema for all centers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Cerebrum Biology Academy Centers',
            description: 'All Cerebrum Biology Academy offline centers across Delhi NCR',
            numberOfItems: centers.length,
            itemListElement: centers.map((center, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: center.name,
              item: {
                '@type': 'LocalBusiness',
                name: `Cerebrum Biology Academy - ${center.name}`,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: center.address,
                },
                telephone: center.phone,
              },
            })),
          }),
        }}
      />

      <FAQSchema questions={faqItems} pageUrl="https://cerebrumbiologyacademy.com/find-center" />
    </>
  )
}
