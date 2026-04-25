/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { SmartWhatsAppCTA } from '@/components/conversion/SmartWhatsAppCTA'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { PricingSection, CostComparisonSection } from '@/components/city'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'

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
      'No. US medical schools use MCAT + a US undergraduate (pre-med) degree. NEET is the Indian medical entrance exam. Indian-American students in Houston typically take NEET to access the 15% NRI quota at Indian medical colleges — a direct-to-MBBS path at lower cost than US med school.',
  },
  {
    id: '1',
    question: 'What are the class timings for Houston students?',
    answer:
      'Live weekday classes run 9:30 PM–12:00 AM CST (8:00–10:30 PM IST + 10.5 hr offset). Weekend batches 8:00–11:00 AM CST. All sessions are recorded.',
  },
  {
    id: '2',
    question: 'Can I prepare for NEET while taking AP Biology?',
    answer:
      'Yes — AP Biology and NEET Biology overlap significantly (cell biology, genetics, physiology, ecology). NEET goes deeper on human physiology and adds NCERT-specific depth. Students running AP Bio and NEET prep in parallel typically find both easier.',
  },
  {
    id: '3',
    question: 'Which Houston-area schools do you support?',
    answer:
      'Indian-American students from Houston public magnets (Bellaire HS, DeBakey HSHP, Carnegie Vanguard) and high-Indian-density suburban schools in Sugar Land (Stephen F. Austin, Clements, Dulles, Travis), Katy, and Pearland. Any US high school curriculum is fine — NEET is NCERT-based.',
  },
  {
    id: '4',
    question: 'Do you help with the NRI quota for Indian MBBS admissions?',
    answer:
      'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services — those are handled by your family or licensed consultants.',
  },
  {
    id: '5',
    question: 'Where does NEET actually get taken from the US?',
    answer:
      'There is no NEET exam centre inside the United States. Most Houston candidates fly to Dubai or India to sit NEET-UG. We help enrolled students plan registration, exam-city selection, and travel.',
  },
]

export function PageContent() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NEET Coaching in Houston, USA</h1>
          <p className="text-xl mb-6 text-blue-100">
            Online NEET Biology coaching for Indian-American students across Houston, Sugar Land,
            Pearland and Katy. AP Biology + NEET dual prep. Live CST/CDT classes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/918826444334?text=Hello%20Cerebrum%20Academy,%20I%20want%20to%20know%20about%20NEET%20coaching%20in%20Houston"
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
              <div className="text-3xl font-bold text-blue-600">CST/CDT</div>
              <div className="text-gray-700 mt-2">Live class timezone</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">~150k</div>
              <div className="text-gray-700 mt-2">Indian-American in Houston metro</div>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Cerebrum for Houston?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Expert Mentorship</h3>
              <p className="text-gray-700">
                Dr. Shekhar C Singh (AIIMS alum) leads the Biology programme. Teaching aligned with
                NCERT and NEET-UG pattern.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Localized Curriculum</h3>
              <p className="text-gray-700">
                Houston-specific content aligned with local education boards and timezone
                optimization.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-gray-700">
                Join a vibrant Houston community of NEET aspirants with peer mentorship and study
                groups.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-700">
                Multiple batch timings optimized for CST/CDT timezone to fit your local schedule.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Online + Offline</h3>
              <p className="text-gray-700">
                Hybrid learning model with online classes and occasional in-person study marathons.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Career Guidance</h3>
              <p className="text-gray-700">
                Post-NEET pathway planning for India, USA, Canada, UK, or Australia medical careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Class Timings Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Class Timings for Houston</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Weekday Live Classes</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Houston (CST):</span> 9:30 PM – 12:00 AM
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Houston (CDT):</span> 10:30 PM – 1:00 AM
              </p>
              <p className="text-gray-600 mt-4">
                Recordings available next morning if class times don&apos;t fit.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Weekend Doubt Clearing</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Houston (CST):</span> 8:00 AM – 11:00 AM
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Houston (CDT):</span> 9:00 AM – 12:00 PM
              </p>
              <p className="text-gray-600 mt-4">Sat &amp; Sun, optional attendance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schools we support */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Houston-area schools we support</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            We work with Indian-American students across Houston public magnets and
            high-Indian-density suburban schools in Sugar Land, Katy, and Pearland.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Houston public magnets</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Bellaire High School</li>
                  <li>DeBakey High School for Health Professions</li>
                  <li>Carnegie Vanguard High School</li>
                  <li>Michael E. DeBakey Academy</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Sugar Land / Katy / Pearland</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Stephen F. Austin HS (Sugar Land)</li>
                  <li>Clements HS (Sugar Land)</li>
                  <li>Dulles HS &amp; Travis HS</li>
                  <li>Katy HS, Seven Lakes HS, Tompkins HS</li>
                  <li>Dawson HS &amp; Glenda Dawson HS (Pearland)</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center">
              Any US high school curriculum (AP Bio, IB, on-level) is fine — NEET is NCERT-based and
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
            Frequently Asked Questions - Houston
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

      {/* Related Cities */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">NEET Coaching in Other Cities</h2>
          <RelatedCityLinks currentCity="houston" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Successful NEET Students</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your preparation with India&apos;s most trusted NEET coaching. Limited seats
            available in Houston batch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/918826444334?text=Hello%20Cerebrum%20Academy,%20interested%20in%20Houston%20batch"
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
