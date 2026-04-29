'use client'

import Link from 'next/link'
import {
  Globe,
  Clock,
  GraduationCap,
  MapPin,
  CheckCircle,
  Phone,
  Calendar,
  BookOpen,
  Users,
} from 'lucide-react'
import LocalitySchema from '@/components/seo/LocalitySchema'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'

const faqs = [
  {
    q: 'Can NEET help me get into a Canadian medical school?',
    a: 'No. Canadian medical schools use OMSAS (Ontario) or equivalent with an undergraduate degree + MCAT. NEET is the Indian medical entrance exam. Indian-origin students in Brampton typically take NEET to access the 15% NRI quota at Indian medical colleges — a direct-to-MBBS path at lower cost and shorter timeline than Canadian med school.',
  },
  {
    q: 'What are the class timings for Brampton / Peel Region students?',
    a: 'Live weekday classes run 10:30 AM–1:00 PM EST (11:30 AM–2:00 PM EDT). Weekend batches also run 9:00 AM–12:00 PM EST. All sessions are recorded, so school schedules do not block NEET prep.',
  },
  {
    q: 'Can I prepare for NEET while doing Ontario Grade 11 or 12?',
    a: "Yes. Ontario SBI3U (Gr 11 Biology) and SBI4U (Gr 12 Biology) cover many of the same topics as NEET. Our curriculum is NCERT-aligned and adds the NEET-specific depth your Ontario course doesn't. Many Peel students run both in parallel.",
  },
  {
    q: 'Which Peel / GTA West schools do you support?',
    a: 'Indian-origin students from Turner Fenton Secondary, Louise Arbour Secondary, North Park, Harold Brathwaite, Mississauga Secondary, Port Credit, Lorne Park, Meadowvale, Stephen Lewis, Heart Lake, Chinguacousy, and all Peel District + Dufferin-Peel Catholic schools with strong South Asian populations.',
  },
  {
    q: 'Is there a NEET exam centre in Canada?',
    a: 'No. The NTA does not operate a NEET exam centre in Canada. Brampton students typically fly from Pearson (YYZ) to Dubai (official NEET centre) or to India. We help enrolled students plan registration, exam-city selection, and travel.',
  },
  {
    q: 'What does NEET coaching cost for Brampton students?',
    a: 'Online batches start at roughly CAD 95/year and go up to ~CAD 790/year, depending on the level of support. EMI plans are available. See the pricing section below for current tiers.',
  },
  {
    q: 'Do you help with visas or the NRI quota process?',
    a: 'On the NRI quota academic side, yes — we explain eligibility, typical cut-offs, and broad admission timelines. On visa, immigration, or legal documentation, no — those are handled by your family or licensed consultants.',
  },
  {
    q: 'How do I book a free demo from Brampton?',
    a: 'WhatsApp us on +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with an AIIMS-led Biology faculty member.',
  },
]

export default function NEETCoachingPageContent() {
  return (
    <>
      <LocalitySchema
        locality="Brampton"
        slug="neet-coaching-brampton-canada"
        pageTitle="NEET Coaching in Brampton, Canada"
        pageDescription="Online NEET Biology coaching for Indian-origin students in Brampton and Peel Region. Ontario Grade 11-12 + NEET dual prep, EST/EDT live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '43.7315', lng: '-79.7624' }}
        faqs={faqs}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
        <section className="relative py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-teal-700 text-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm mb-4">
              <Globe className="w-4 h-4" />
              <span>Online NEET Biology for Brampton / Peel Region students</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              NEET Biology Coaching in
              <br />
              <span className="text-blue-200">Brampton, Canada</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
              Live online NEET Biology classes for Indian-origin students across Brampton,
              Mississauga and the wider Peel Region. Ontario Grade 11-12 + NEET dual prep.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Link
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Brampton%20and%20want%20a%20free%20NEET%20Biology%20demo"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
              >
                <Phone className="w-5 h-5" /> WhatsApp for Free Demo
              </Link>
              <Link
                href="#pricing"
                className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View Pricing
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> EST/EDT live classes
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Ontario Gr 11-12 dual prep
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Class 9–12 + droppers
              </span>
            </div>
          </div>
        </section>

        <section className="py-12 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-lg font-bold">10:30 AM EST</p>
              <p className="text-sm text-gray-500">Typical class start</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-lg font-bold">~52%</p>
              <p className="text-sm text-gray-500">Brampton is South Asian</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <BookOpen className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <p className="text-lg font-bold">SBI3U · SBI4U</p>
              <p className="text-sm text-gray-500">Ontario Gr 11-12 + NEET</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <MapPin className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-lg font-bold">Dubai / India</p>
              <p className="text-sm text-gray-500">Nearest NEET centres</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Why Brampton students join Cerebrum
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-blue-100 bg-blue-50">
                <GraduationCap className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">AIIMS-led Biology faculty</h3>
                <p className="text-gray-600">
                  Dr. Shekhar C Singh (AIIMS alum) leads the Biology programme. NCERT-aligned
                  teaching tuned to NEET-UG.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-green-100 bg-green-50">
                <BookOpen className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">Ontario curriculum bridge</h3>
                <p className="text-gray-600">
                  SBI3U / SBI4U Biology covers much of the NEET syllabus already. We add the
                  NEET-specific depth.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-teal-100 bg-teal-50">
                <Globe className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">NRI quota guidance</h3>
                <p className="text-gray-600">
                  Clarity on how the 15% NRI MBBS quota works in India. We do not provide visa or
                  legal services.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-blue-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-md p-8 border border-blue-100">
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">NEET exam centre logistics</h3>
                  <p className="text-gray-700 mb-3">
                    The NTA does not operate a NEET exam centre in Canada. Brampton students
                    typically fly from <strong>Pearson (YYZ) to Dubai</strong> (official NEET
                    centre) or <strong>to India</strong> to sit NEET-UG. We help students plan
                    registration and exam-day travel.
                  </p>
                  <p className="text-sm text-gray-500">
                    Note: NTA publishes overseas exam cities each year. Availability can change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Peel / GTA West schools we support
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Indian-origin students from Peel District School Board and Dufferin-Peel Catholic
              schools with the densest South Asian populations.
            </p>
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Brampton (PDSB + Catholic)</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>Turner Fenton Secondary School</li>
                    <li>Louise Arbour Secondary School</li>
                    <li>North Park Secondary School</li>
                    <li>Harold M. Brathwaite Secondary</li>
                    <li>Heart Lake Secondary &amp; Chinguacousy SS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Mississauga &amp; surrounds</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>Port Credit Secondary School</li>
                    <li>Lorne Park Secondary School</li>
                    <li>Meadowvale Secondary School</li>
                    <li>Stephen Lewis Secondary School</li>
                    <li>Applewood Heights SS</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6 text-center">
                Any Ontario curriculum (Academic, IB, AP) is fine — NEET is NCERT-based and we
                bridge the gap.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Class timings for Brampton / Peel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-blue-600">Weekday Live Classes</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Brampton (EST):</span> 10:30 AM – 1:00 PM
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Brampton (EDT):</span> 11:30 AM – 2:00 PM
                </p>
                <p className="text-gray-600 mt-4">Every session recorded.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-blue-600">Weekend Doubt Clearing</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Brampton (EST):</span> 9:00 AM – 12:00 PM
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Brampton (EDT):</span> 10:00 AM – 1:00 PM
                </p>
                <p className="text-gray-600 mt-4">Sat &amp; Sun, optional attendance.</p>
              </div>
            </div>
          </div>
        </section>

        <div id="pricing">
          <PricingSection cityName="Brampton" />
        </div>
        <CostComparisonSection cityName="Brampton" />

        <section className="py-16 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            FAQs — NEET coaching in Brampton, Canada
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-xl border border-gray-200 p-6 open:shadow-md transition-shadow"
              >
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  <span>{faq.q}</span>
                  <span className="text-blue-600 group-open:rotate-45 transition-transform text-2xl">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-100" />
            <h2 className="text-3xl font-bold mb-4">Book a free Biology demo from Brampton</h2>
            <p className="text-blue-100 mb-8 text-lg">
              See the teaching style before you decide. 45–60 minute live session with an AIIMS-led
              faculty.
            </p>
            <Link
              href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Brampton%20and%20want%20a%20free%20NEET%20Biology%20demo"
              className="inline-flex bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-bold text-lg items-center gap-2 transition-colors"
            >
              <Phone className="w-5 h-5" /> WhatsApp +91-8826444334
            </Link>
          </div>
        </section>

        <RelatedCityLinks currentCity="brampton" variant="default" />
      </div>
    </>
  )
}
