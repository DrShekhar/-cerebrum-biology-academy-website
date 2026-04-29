import Image from 'next/image'
import Link from 'next/link'
import SmartWhatsAppCTA from '@/components/conversion/SmartWhatsAppCTA'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import LocalitySchema from '@/components/seo/LocalitySchema'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { USABOPathwayCallout } from '@/components/seo/USABOPathwayCallout'

export default function NEETCoachingPageContent() {
  const faqData = [
    {
      question: 'Can NEET help me get into a US medical school?',
      answer:
        'No. US medical schools use MCAT + a US undergraduate (pre-med) degree. NEET is the Indian medical entrance exam — Indian-American students typically take NEET to access the 15% NRI quota at Indian medical colleges, a direct-to-MBBS path at lower cost than US med school.',
    },
    {
      question: 'What are the class timings for Dallas students?',
      answer:
        'Live weekday classes run 9:30 PM–12:00 AM CST (bridging IST evening). Weekend doubt clearing 8:00–11:00 AM CST. Every session is recorded, so any missed class can be caught up the next day.',
    },
    {
      question: 'Can I prepare for NEET while taking AP Biology?',
      answer:
        'Yes. AP Biology and NEET Biology overlap on cell biology, genetics, physiology, and ecology. NEET adds depth on human physiology and NCERT-specific content. Running both in parallel is efficient.',
    },
    {
      question: 'Which DFW-area schools do you support?',
      answer:
        'Indian-American students from Plano (Plano West, Plano Senior, Plano East, Jasper HS), Frisco (Liberty, Centennial, Wakeland, Reedy), Irving, Coppell, and Richardson ISD schools. Any US high school curriculum is fine — NEET is NCERT-based and we bridge the gap.',
    },
    {
      question: 'Do you help with the NRI quota for Indian MBBS admissions?',
      answer:
        'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services — those are handled by your family or licensed consultants.',
    },
    {
      question: 'What does NEET coaching cost for Dallas students?',
      answer:
        'Online batches start at roughly $70/year and go up to ~$575/year, depending on the level of support. EMI plans are available. See the pricing section below for current tiers.',
    },
    {
      question: 'Where does NEET actually get taken from the US?',
      answer:
        'There is no NEET exam centre inside the United States. Most US candidates fly to Dubai or India to sit NEET-UG. We help enrolled students plan registration, exam-city selection, and travel.',
    },
    {
      question: 'How do I book a free demo from Dallas?',
      answer:
        'WhatsApp us on +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with an AIIMS-led Biology faculty member.',
    },
  ]

  return (
    <>
      <LocalitySchema
        locality="Dallas"
        slug="neet-coaching-dallas-usa"
        pageTitle="NEET Coaching in Dallas, USA"
        pageDescription="Online NEET Biology coaching for Indian-American students in DFW metro. AP Biology + NEET dual prep, CST/CDT live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '32.7767', lng: '-96.7970' }}
        faqs={faqData.map((f) => ({ question: f.question, answer: f.answer }))}
      />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              NEET Coaching in Dallas, USA
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Online NEET Biology coaching for Indian-American students across Plano, Frisco,
              Irving, Coppell and the broader DFW metro. AP Biology + NEET dual prep. Live CST/CDT
              classes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <SmartWhatsAppCTA text="Start Free Consultation" variant="light" />
              <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition duration-300">
                Download Success Stories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">CST/CDT</div>
              <p className="text-gray-700 font-semibold">Live class timezone</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">~180k</div>
              <p className="text-gray-700 font-semibold">Indian-American in DFW</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-teal-600 mb-2">AP Bio</div>
              <p className="text-gray-700 font-semibold">Dual prep supported</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-600 mb-2">NRI quota</div>
              <p className="text-gray-700 font-semibold">MBBS India guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-900">
            Why Choose Cerebrum Academy in Dallas?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">AIIMS-led Biology faculty</h3>
              <p className="text-gray-700">
                Dr. Shekhar C Singh (AIIMS alum) leads the Biology programme. NCERT-aligned teaching
                tuned to NEET-UG.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">AP Bio + NEET dual prep</h3>
              <p className="text-gray-700">
                Cell biology, genetics, physiology, ecology overlap between AP and NEET. One
                preparation, two exams.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">
                Plano / Frisco / Irving anchors
              </h3>
              <p className="text-gray-700">
                Built for Indian-American students across the DFW suburbs with the densest Indian
                communities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">CST/CDT live classes</h3>
              <p className="text-gray-700">
                Weekday evenings &amp; weekend mornings in Dallas time. Every session recorded.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">NRI quota guidance</h3>
              <p className="text-gray-700">
                Clarity on how the 15% NRI MBBS quota works in India. We do not provide visa or
                legal services.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Class 9–12 + droppers</h3>
              <p className="text-gray-700">
                Foundation batches for Grade 9–10, Class 11–12 mainstream, and dropper revision
                tracks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Served */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-900">
            We Coach Students From
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              Plano West Senior HS
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              Plano Senior HS &amp; Plano East
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              Jasper HS (Plano)
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              Frisco Liberty HS &amp; Centennial HS
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              Frisco Wakeland HS &amp; Reedy HS
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">Coppell HS</div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              MacArthur HS (Irving)
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              Richardson HS &amp; Berkner HS
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              Allen HS &amp; McKinney Boyd HS
            </div>
          </div>
        </div>
      </section>

      {/* Class Timings */}
      <section className="py-16 sm:py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">
            Class Timings in Dallas
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Evening and weekend batches aligned with CST timezone
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">Weekday Classes</h3>
              <p className="text-gray-700">Evening: 6:00 PM - 8:30 PM (CST)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">Weekend Classes</h3>
              <p className="text-gray-700">Saturday & Sunday: 10:00 AM - 1:00 PM (CST)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonialsSection />

      {/* Pricing Section */}
      <PricingSection city="Dallas" />

      {/* Cost Comparison */}
      <CostComparisonSection />

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqData.map((item, index) => (
              <details key={index} className="bg-white p-6 rounded-lg shadow cursor-pointer group">
                <summary className="font-bold text-lg text-gray-900 group-open:text-blue-600">
                  {item.question}
                </summary>
                <p className="text-gray-700 mt-4">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Book a free Biology demo from Dallas
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            See the teaching style before you decide. 45–60 minute live session with an AIIMS-led
            Biology faculty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SmartWhatsAppCTA text="Chat on WhatsApp Now" variant="light" />
            <a
              href="tel:+918826444334"
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition"
            >
              Call: +91-8826444334
            </a>
          </div>
        </div>
      </section>

            <USABOPathwayCallout cityName="Dallas–Plano" schools={["Plano West Senior HS","TAG Magnet","Highland Park HS"]} />

      {/* Related Cities */}
      <RelatedCityLinks currentCity="dallas" />
    </>
  )
}
