/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { SmartWhatsAppCTA } from '@/components/conversion/SmartWhatsAppCTA'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { PricingSection, CostComparisonSection } from '@/components/city'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { USABOPathwayCallout } from '@/components/seo/USABOPathwayCallout'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: '0',
    question: 'Can NEET help me get into a US medical school?',
    answer:
      'No. US medical schools use MCAT + a US undergraduate (pre-med) degree. NEET is the Indian medical entrance exam. Indian-American students typically take NEET to access the 15% NRI quota at Indian medical colleges — a common path for those who prefer a direct-to-MBBS route at a lower cost than US med school.',
  },
  {
    id: '1',
    question: 'What are the class timings for NY/NJ students?',
    answer:
      'Live classes run 8:00–10:30 PM IST, which is 10:30 AM–1:00 PM EST (or 11:30 AM–2:00 PM EDT). Weekend batches also run 9:00 AM–12:00 PM EST. All sessions are recorded.',
  },
  {
    id: '2',
    question: 'Can I prepare for NEET while taking AP Biology?',
    answer:
      'Yes — AP Biology and NEET Biology overlap significantly (cell biology, genetics, physiology, ecology). NEET goes deeper on human physiology and adds NCERT-specific depth. Students running AP Bio and NEET prep in parallel typically find both easier because the fundamentals are shared.',
  },
  {
    id: '3',
    question: 'Where does NEET actually get taken from the US?',
    answer:
      'There is no NEET exam centre inside the United States. Most US candidates fly to Dubai or India to sit NEET-UG. We help enrolled students plan NEET registration, exam-city selection, and travel timing.',
  },
  {
    id: '4',
    question: 'Do you help with the NRI quota for Indian MBBS admissions?',
    answer:
      'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services — those are handled by your family or licensed consultants.',
  },
  {
    id: '5',
    question: 'What does NEET coaching cost for NY students?',
    answer:
      'Online batches start at roughly $70/year and go up to ~$575/year, depending on the level of support. EMI plans are available. See the pricing section below for current tiers.',
  },
]

export function PageContent() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NEET Coaching in New York, USA</h1>
          <p className="text-xl mb-6 text-blue-100">
            Online NEET Biology coaching for Indian-American students across NYC, New Jersey
            (Edison, Jersey City) and Long Island. AP Biology + NEET dual prep. Live EST/EDT
            classes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/918826444334?text=Hello%20Cerebrum%20Academy,%20I%20want%20to%20know%20about%20NEET%20coaching%20in%20New%20York"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              WhatsApp Now
            </a>
            <a
              href="tel:+918826444334"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold"
            >
              Call +918826444334
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">EST/EDT</div>
              <div className="text-gray-700 mt-2">Live class timezone</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">~1M</div>
              <div className="text-gray-700 mt-2">Indian-American in NY metro</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">AP Bio</div>
              <div className="text-gray-700 mt-2">Dual prep supported</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">NRI quota</div>
              <div className="text-gray-700 mt-2">MBBS India guidance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose Cerebrum for New York?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">AIIMS-led Biology faculty</h3>
              <p className="text-gray-700">
                Dr. Shekhar C Singh (AIIMS alum) leads the Biology programme. Teaching aligned with
                NCERT and NEET-UG pattern.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">AP Bio + NEET dual prep</h3>
              <p className="text-gray-700">
                Cell biology, genetics, physiology, ecology — AP Biology and NEET Biology overlap
                significantly. You prepare once, benefit from both.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">EST/EDT live classes</h3>
              <p className="text-gray-700">
                Weekday classes 10:30 AM–1:00 PM EST (11:30 AM–2:00 PM EDT). Weekend batches also
                available. Every session recorded.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">NRI quota guidance</h3>
              <p className="text-gray-700">
                Clarity on how the 15% NRI MBBS quota works in India — eligible colleges, cut-offs,
                timeline. We do not provide visa or legal services.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Class 9–12 + droppers</h3>
              <p className="text-gray-700">
                Foundation batches for Grade 9–10, Class 11–12 mainstream, and droppers preparing
                for the next NEET attempt.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">NY/NJ-anchored</h3>
              <p className="text-gray-700">
                Built for Indian-American students across NYC specialized schools, Edison/JC, South
                Brunswick, West Windsor, Long Island.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Class Timings Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Class Timings for NY / NJ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Weekday Live Classes</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">NY (EST):</span> 10:30 AM – 1:00 PM
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">NY (EDT):</span> 11:30 AM – 2:00 PM
              </p>
              <p className="text-gray-600 mt-4">
                During US summer/winter school breaks; every session recorded.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Weekend Doubt Clearing</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">NY (EST):</span> 9:00 AM – 12:00 PM
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">NY (EDT):</span> 10:00 AM – 1:00 PM
              </p>
              <p className="text-gray-600 mt-4">Sat &amp; Sun, optional attendance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schools we support */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">NY / NJ schools we support</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            We work with Indian-American students across NYC specialized high schools and
            high-Indian-density schools in New Jersey and Long Island.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">NYC Specialized &amp; Public</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Stuyvesant High School</li>
                  <li>Bronx High School of Science</li>
                  <li>Brooklyn Technical High School</li>
                  <li>Townsend Harris High School</li>
                  <li>Hunter College High School</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  NJ &amp; Long Island (Indian-American hubs)
                </h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Edison High School (NJ)</li>
                  <li>John P. Stevens High School (Edison)</li>
                  <li>South Brunswick High School</li>
                  <li>West Windsor-Plainsboro (North/South)</li>
                  <li>Jericho / Syosset High School (Long Island)</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center">
              Any US high school curriculum (AP Bio, IB, Regents) is fine — NEET is NCERT-based and
              we bridge the gap.
            </p>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Student Success Stories</h2>
          <VideoTestimonialsSection />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Pricing Plans</h2>
          <PricingSection />
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Cerebrum is Most Affordable?</h2>
          <CostComparisonSection />
        </div>
      </section>

      {/* WhatsApp CTA 2 */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <SmartWhatsAppCTA
            title="Still Have Questions?"
            message="Chat with our counselors on WhatsApp for instant guidance"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions - New York
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                  className="w-full px-6 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 flex justify-between items-center"
                >
                  {item.question}
                  <span className="text-blue-600">{expandedFaq === item.id ? '-' : '+'}</span>
                </button>
                {expandedFaq === item.id && (
                  <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA 3 */}
      <section className="py-8 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <SmartWhatsAppCTA
            title="Ready to Start Your NEET Journey?"
            message="Book your free counseling session now"
            variant="highlight"
          />
        </div>
      </section>

      <USABOPathwayCallout
        cityName="New York City + Long Island"
        schools={[
          'Stuyvesant HS',
          'Bronx Science',
          'Hunter College HS',
          'Jericho HS',
          'Great Neck North',
        ]}
      />

      {/* Related Cities */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">NEET Coaching in Other Cities</h2>
          <RelatedCityLinks currentCity="newYork" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Successful NEET Students</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your preparation with India's most trusted NEET coaching. Limited seats available
            in New York batch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/918826444334?text=Hello%20Cerebrum%20Academy,%20interested%20in%20New%20York%20batch"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Chat on WhatsApp
            </a>
            <a
              href="tel:+918826444334"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
