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
    question: 'Can I use a NEET score to apply to UK medical schools?',
    answer:
      'No. UK medical schools (UCAS) use A-Levels plus UCAT or BMAT for admissions — NEET is not part of the UK med-school process. NEET is the Indian medical entrance exam, used for MBBS/BDS admissions in India, including the 15% NRI quota at eligible Indian medical colleges.',
  },
  {
    id: '1',
    question: 'What are the class timings for London students?',
    answer:
      'Live classes typically run 4:00–6:30 PM GMT / 5:00–7:30 PM BST (after UK school hours). Every session is recorded, so students on A-Level exam schedules or travel can catch up within hours.',
  },
  {
    id: '2',
    question: 'Can I prepare for NEET while doing A-Levels or IGCSE?',
    answer:
      'Yes. Many London students run A-Level Biology and NEET prep in parallel — the concepts overlap significantly. Our Biology curriculum is NCERT-aligned and adds the NEET-specific depth beyond A-Level syllabus. We work around your school exam calendar.',
  },
  {
    id: '3',
    question: 'What is the realistic pathway from NEET to working in the NHS?',
    answer:
      'The pathway is multi-step, not direct: (1) qualify NEET-UG and complete an MBBS degree in India (typically 5.5 years), (2) return to the UK, (3) pass the UKMLA (UK Medical Licensing Assessment) to register with the GMC, (4) apply for UK Foundation training to enter NHS practice. NEET alone does not lead to NHS — it opens the Indian MBBS route, which is one option to eventually practise in the UK.',
  },
  {
    id: '4',
    question: 'Do you help with the NRI quota for Indian MBBS admissions?',
    answer:
      'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services — those are handled by your school, family, or licensed consultants.',
  },
  {
    id: '5',
    question: 'What does NEET coaching cost for London students?',
    answer:
      'Online batches start at roughly £55/year (Elixir plan) and go up to ~£460/year (Intensive plan), depending on the level of support. EMI plans are available. See the pricing section below for current tiers.',
  },
]

export function PageContent() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NEET Coaching in London, UK</h1>
          <p className="text-xl mb-6 text-blue-100">
            Online NEET Biology coaching for Indian-origin students across Harrow, Southall,
            Wembley, Ilford and Greater London. A-Level + NEET dual preparation. Live GMT/BST
            classes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/918826444334?text=Hello%20Cerebrum%20Academy,%20I%20want%20to%20know%20about%20NEET%20coaching%20in%20London"
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
              <div className="text-3xl font-bold text-blue-600">GMT/BST</div>
              <div className="text-gray-700 mt-2">Live class timezone</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">~700k</div>
              <div className="text-gray-700 mt-2">Indian-origin in London</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600">A-Level</div>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Cerebrum for London?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">AIIMS-led Biology faculty</h3>
              <p className="text-gray-700">
                Dr. Shekhar C Singh (AIIMS alum) leads the Biology programme. Teaching aligned with
                NCERT and NEET-UG pattern.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">A-Level + NEET dual prep</h3>
              <p className="text-gray-700">
                Biology concepts overlap between A-Level and NEET. Our curriculum covers both
                simultaneously — you use one preparation for two exams.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">GMT/BST live classes</h3>
              <p className="text-gray-700">
                Classes run 4:00–6:30 PM GMT (5:00–7:30 PM BST) after UK school hours. Every session
                recorded.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold mb-2">NRI quota guidance</h3>
              <p className="text-gray-700">
                Clarity on how the 15% NRI MBBS quota works in India — colleges, cut-offs, timeline.
                We do not provide visa or legal services.
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
              <h3 className="text-xl font-bold mb-2">Indian-community anchors</h3>
              <p className="text-gray-700">
                Built for students across Harrow, Southall, Wembley, Ilford, Barnet and Greater
                London with strong Indian-origin school communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Class Timings Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Class Timings for London</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Weekday Live Classes</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">London (GMT):</span> 4:00 PM – 6:30 PM
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">London (BST):</span> 5:00 PM – 7:30 PM
              </p>
              <p className="text-gray-600 mt-4">After UK school hours; every session recorded.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Weekend Doubt Clearing</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">London (GMT):</span> 10:00 AM – 12:30 PM
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">London (BST):</span> 11:00 AM – 1:30 PM
              </p>
              <p className="text-gray-600 mt-4">Sat &amp; Sun, optional attendance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schools we support */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">London schools we support</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            We work with Indian-origin students across state comprehensive schools, selective
            grammar schools, and independent schools in the Harrow, Ealing, Brent, Redbridge and
            Barnet areas.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Harrow &amp; Brent</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Nower Hill High School</li>
                  <li>Queensbury School</li>
                  <li>Whitmore High School</li>
                  <li>Preston Manor School (Wembley)</li>
                  <li>Alperton Community School</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Ealing &amp; Redbridge &amp; Barnet
                </h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Villiers High School (Southall)</li>
                  <li>Featherstone High School</li>
                  <li>Seven Kings School (Ilford)</li>
                  <li>Ilford County High School</li>
                  <li>Queen Elizabeth&apos;s School, Barnet</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center">
              IB Diploma, A-Level, and IGCSE students from any London school are welcome.
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
            Frequently Asked Questions - London
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
          <RelatedCityLinks currentCity="london" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Successful NEET Students</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your preparation with India&apos;s most trusted NEET coaching. Limited seats
            available in London batch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/918826444334?text=Hello%20Cerebrum%20Academy,%20interested%20in%20London%20batch"
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
