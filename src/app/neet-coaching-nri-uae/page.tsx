import { Metadata } from 'next'
import Link from 'next/link'
import {
  NEETNRIPricingTiers,
  neetNRIOffersForSchema,
} from '@/components/neet-nri/NEETNRIPricingTiers'
import {
  Award,
  GraduationCap,
  CheckCircle,
  Phone,
  MessageCircle,
  MapPin,
  ArrowRight,
  Clock,
  Globe,
} from 'lucide-react'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Coaching in UAE | NRI Biology Coaching | Cerebrum Biology Academy',
  description:
    'NEET coaching for NRI students across the UAE — Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain. Online live classes in GST timezone by AIIMS-trained faculty. Dubai/Sharjah/Abu Dhabi NEET exam centres. AED pricing.',
  keywords: [
    'neet coaching uae',
    'neet coaching in uae',
    'neet coaching for nri uae',
    'best neet coaching uae',
    'neet coaching dubai abu dhabi sharjah',
    'online neet coaching gulf',
    'aiims neet coaching uae',
    'nri quota mbbs uae students',
    'neet biology coaching uae',
    'neet exam centre dubai sharjah abu dhabi',
  ],
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-nri-uae`,
    languages: {
      'en-AE': `${BASE_URL}/neet-coaching-nri-uae`,
      'en-IN': `${BASE_URL}/neet-coaching-nri-uae`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in UAE | NRI Biology Coaching',
    description:
      'NEET coaching for NRI students across the UAE. Online live classes in GST, AIIMS faculty, AED pricing, Dubai/Sharjah/Abu Dhabi NEET exam centres.',
    url: `${BASE_URL}/neet-coaching-nri-uae`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_AE',
    type: 'website',
  },
}

const cityLinks = [
  { name: 'Dubai', href: '/neet-coaching-dubai-uae', note: 'NEET exam centre · Indian-school hub' },
  { name: 'Abu Dhabi', href: '/neet-coaching-abu-dhabi-uae', note: 'NEET exam centre · capital' },
  { name: 'Sharjah', href: '/neet-coaching-sharjah-uae', note: 'NEET exam centre' },
  { name: 'Ajman', href: '/neet-coaching-ajman-uae', note: 'Northern emirate' },
  { name: 'Al Ain', href: '/neet-coaching-al-ain-uae', note: 'Eastern emirate' },
]

const faqs = [
  {
    q: 'Where can I take NEET in the UAE?',
    a: 'The UAE has three official NTA-designated NEET overseas exam centres: Dubai, Sharjah and Abu Dhabi. Students living in Ajman, Al Ain, Ras Al Khaimah, Fujairah etc. typically pick the nearest of these three during NEET registration.',
  },
  {
    q: 'What are the class timings for UAE students?',
    a: 'Live classes run in GST-friendly slots (UTC+4) — typically 4:00–6:30 PM weekday evenings (after Indian schools in UAE finish) plus Saturday/Sunday doubt sessions. All sessions are recorded for revision.',
  },
  {
    q: 'What is the fee for NEET coaching in the UAE?',
    a: 'NEET NRI annual programmes for UAE students start at approximately AED 13,200/year (Foundation Class 11) and scale up to AED 18,000/year (Dropper/Repeater intensive). Pricing is shown in AED on this page based on your detected region. EMI plans are available.',
  },
  {
    q: 'Do you support Indian schools in Dubai, Abu Dhabi, Sharjah?',
    a: 'Yes — we support students from all major Indian-curriculum schools across the UAE: Indian High School Dubai, GEMS Our Own English High School, Delhi Private School (DPS) Dubai, Gulf Indian High School, JSS International, Springdales Dubai, Abu Dhabi Indian School, Indian Islahi Islamic School, Sharjah Indian School and all CBSE/ICSE/IB schools across the seven emirates.',
  },
  {
    q: 'Can I claim NRI quota MBBS seats after NEET-UG from the UAE?',
    a: 'Yes — 15% of seats at eligible Indian medical colleges are reserved for NRI/OCI candidates. UAE-based families are explicitly eligible if the supporting parent holds a UAE work visa. We help with the academic side (which colleges, NEET cutoffs, timeline). We do not act as immigration / admission consultants.',
  },
  {
    q: 'How is online NEET coaching from the UAE different from a Dubai-based coaching centre?',
    a: 'Cerebrum delivers live online classes by AIIMS-trained faculty from India — biology-only specialisation that very few UAE-based generalist coaching centres can match. Lower cost than UAE in-person coaching (no real-estate overhead) while maintaining small-batch attention (15–20 students per batch).',
  },
  {
    q: 'Do you provide WhatsApp doubt support for UAE students?',
    a: 'Yes — same-day WhatsApp doubt support during the academic year via +91 88264-44334 (international number works from UAE). Doubt sessions also held weekly in live classes.',
  },
  {
    q: 'Are there special batches for CBSE Gulf Sahodaya schools?',
    a: 'Yes — Cerebrum has dedicated batches calibrated to the CBSE Gulf Sahodaya pace (slightly different from India CBSE due to local academic calendar). All 193 Gulf Sahodaya CBSE schools are supported including Indian schools in Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain, RAK, Fujairah.',
  },
]

export default async function NEETCoachingNRIUAEPage() {
  const pageUrl = `${BASE_URL}/neet-coaching-nri-uae`
  const courseOffers = neetNRIOffersForSchema('AE', pageUrl)

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Cerebrum Biology Academy',
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        foundingDate: '2014',
        description:
          'Online NEET Biology coaching for NRI students across the United Arab Emirates.',
        telephone: '+918826444334',
        areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
      },
      {
        '@type': 'Course',
        name: 'NEET Coaching for UAE Students',
        description:
          'Online NEET-UG Biology preparation for Indian-curriculum students across Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain and the broader UAE. AIIMS-trained faculty, GST-friendly class timings, AED pricing.',
        provider: { '@id': `${BASE_URL}/#organization` },
        offers: courseOffers,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'NRI Coaching',
            item: `${BASE_URL}/nri-coaching`,
          },
          { '@type': 'ListItem', position: 3, name: 'NEET Coaching in UAE', item: pageUrl },
        ],
      },
    ],
  }

  const waLink = `https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want NEET coaching for UAE / Gulf students. Please share details and current batch timings.')}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />

      <section className="bg-gradient-to-br from-green-800 via-green-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              UAE NRI Hub · 5 Cities · GST-Friendly Live Classes
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">NEET Coaching in UAE</h1>
            <p className="text-2xl text-green-50 mb-3">
              Online live classes for NRI students across Dubai, Abu Dhabi, Sharjah, Ajman and Al
              Ain.
            </p>
            <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">
              AIIMS-trained faculty led by Dr. Shekhar C Singh. GST-friendly class timings.
              AED-anchored pricing. Dubai / Sharjah / Abu Dhabi NEET exam centre on site.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
              >
                <Phone className="w-5 h-5" />
                Book Free Demo Class
              </a>
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </Link>
              <a
                href="#nri-pricing"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
              >
                See AED Pricing
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-green-100 mt-6">
              Or call directly:{' '}
              <a href="tel:+918826444334" className="font-semibold text-yellow-300 hover:underline">
                +91 88264-44334
              </a>{' '}
              · Free demo, no obligation · 680+ medical college admissions
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {[
              'AIIMS-Trained Faculty',
              'GST (UTC+4) Live Classes',
              'AED Pricing',
              'Dubai / Sharjah / Abu Dhabi NEET Exam Centres',
              '193 Gulf Sahodaya CBSE Schools Supported',
              'NRI Quota MBBS Guidance',
              'Same-Day WhatsApp Doubts',
              'Free Demo Class',
            ].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full text-sm text-slate-700 border border-slate-200"
              >
                <GraduationCap className="w-4 h-4 text-green-700" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Find Your Emirate
            </h2>
            <p className="text-lg text-slate-600">
              5 dedicated city pages across the UAE. All link to the same AIIMS-trained pan-UAE
              online programme.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityLinks.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="block bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200 hover:border-green-600 hover:shadow-md transition group"
              >
                <div className="flex items-start gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-green-700">
                      NEET Coaching in {c.name}
                    </h3>
                    <p className="text-sm text-slate-500">{c.note}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 ml-8">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
              UAE NEET Exam Centres — What You Need to Know
            </h2>
            <div className="space-y-4 bg-white p-6 md:p-8 rounded-xl border border-slate-200">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-green-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900">3 NTA-Designated NEET Centres in UAE</h3>
                  <p className="text-slate-600">
                    Dubai, Sharjah and Abu Dhabi are the three official NTA overseas NEET exam
                    centres in the UAE. Students from Ajman, Al Ain, RAK, Fujairah typically pick
                    the nearest of these three during NEET registration.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-green-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900">Class Timings in GST (UTC+4)</h3>
                  <p className="text-slate-600">
                    Weekday evening live classes (4:00–6:30 PM GST) after Indian-curriculum schools
                    in UAE finish. Saturday/Sunday weekend doubt sessions. All sessions recorded.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-green-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900">CBSE Gulf Sahodaya Calibration</h3>
                  <p className="text-slate-600">
                    193 CBSE Gulf Sahodaya schools are supported with batches calibrated to the Gulf
                    academic calendar (slightly different from India CBSE).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Cross-programme links for UAE families */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Other Biology Programmes in UAE</h2>
          <p className="text-slate-600 mb-6">Beyond NEET, Cerebrum serves UAE students across IB Biology, AP Biology, GAMSAT, and Biology Olympiads.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <Link href="/ib-biology-tutor-asd-dubai" className="block p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow text-center transition"><span className="font-medium text-slate-900 text-sm">IB Biology ASD Dubai</span></Link>
            <Link href="/ib-biology-tutor-gems-dubai-american-academy" className="block p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow text-center transition"><span className="font-medium text-slate-900 text-sm">IB Biology GEMS DAA</span></Link>
            <Link href="/ap-biology-tutor-dubai" className="block p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow text-center transition"><span className="font-medium text-slate-900 text-sm">AP Biology Dubai</span></Link>
            <Link href="/ap-biology-tutor-abu-dhabi" className="block p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow text-center transition"><span className="font-medium text-slate-900 text-sm">AP Biology Abu Dhabi</span></Link>
            <Link href="/ib-biology/dubai" className="block p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow text-center transition"><span className="font-medium text-slate-900 text-sm">IB Biology Dubai</span></Link>
          </div>
        </div>
      </section>

      <NEETNRIPricingTiers forceCountry="AE" />

      <section className="py-12 bg-gradient-to-r from-green-700 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-1">
                Book a free demo class from the UAE.
              </h3>
              <p className="text-green-50 text-lg">
                Experience AIIMS-trained NEET Biology coaching live in GST timezone.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition whitespace-nowrap"
              >
                <Phone className="w-5 h-5" />
                Call +91 88264-44334
              </a>
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="bg-slate-50 rounded-lg group">
                  <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-slate-100">
                    {f.q}
                    <span className="text-slate-500 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="px-6 pb-4 text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started Today</h2>
          <p className="text-xl text-slate-300 mb-2 max-w-2xl mx-auto">
            Free demo class. AED pricing. Same-day WhatsApp response.
          </p>
          <p className="text-sm text-slate-400 mb-8">
            680+ medical college admissions · 98% NEET qualification rate
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call +91 88264-44334
            </a>
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Demo Booking
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="h-20 md:hidden" aria-hidden="true" />

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 shadow-lg grid grid-cols-2 gap-2 p-3">
        <a
          href="tel:+918826444334"
          className="flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 py-3 rounded-lg font-semibold"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <Link
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </Link>
      </div>
    </div>
  )
}
