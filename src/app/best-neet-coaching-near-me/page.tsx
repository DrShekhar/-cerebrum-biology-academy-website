import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, MapPin, ArrowRight } from 'lucide-react'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best NEET Coaching Near Me | 6 NCR Centres + Pan-India Online',
  description:
    'Best NEET coaching near me — Cerebrum Biology Academy. 6 offline centres in Delhi NCR (South Extension, Rohini, Green Park, Gurugram, Faridabad, Noida) + online live classes pan-India. AIIMS faculty, 680+ medical college selections, 98% NEET qualification rate.',
  keywords: [
    'best neet coaching near me',
    'neet coaching near me',
    'best neet coaching near me online',
    'neet coaching center near me',
    'best neet institute near me',
    'neet biology coaching near me',
    'best neet coaching near me delhi',
    'best neet coaching near me gurugram',
    'best neet coaching near me noida',
    'best neet coaching near me faridabad',
    'best neet coaching near me ghaziabad',
    'best neet coaching near me mumbai',
    'best neet coaching near me bangalore',
    'best neet coaching near me hyderabad',
  ],
  openGraph: {
    title: 'Best NEET Coaching Near Me | Cerebrum Biology Academy',
    description:
      '6 Delhi NCR centres + pan-India online. AIIMS faculty, 680+ medical college selections.',
    url: 'https://cerebrumbiologyacademy.com/best-neet-coaching-near-me',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-neet-coaching-near-me',
  },
}

const centres = [
  {
    name: 'South Extension (Flagship)',
    address: 'Block D, South Extension Part 2, New Delhi 110049',
    locality: 'South Delhi',
    geo: { lat: 28.5694, lng: 77.2256 },
    href: '/neet-coaching-delhi',
  },
  {
    name: 'Rohini',
    address: '211 Vikas Surya Tower, DC Chauk, Sector 9, Delhi 110085',
    locality: 'North Delhi',
    geo: { lat: 28.7368, lng: 77.1268 },
    href: '/neet-coaching-rohini',
  },
  {
    name: 'Green Park',
    address: 'B 113 FF Gulmohar Park, New Delhi 110049',
    locality: 'South Delhi',
    geo: { lat: 28.5599, lng: 77.2049 },
    href: '/neet-coaching-green-park',
  },
  {
    name: 'Gurugram',
    address: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram 122018',
    locality: 'Gurugram',
    geo: { lat: 28.4424, lng: 77.0729 },
    href: '/neet-coaching-gurugram',
  },
  {
    name: 'Faridabad',
    address: 'Sector 17, Faridabad 121002',
    locality: 'Faridabad',
    geo: { lat: 28.398, lng: 77.3066 },
    href: '/neet-coaching-faridabad',
  },
  {
    name: 'Noida',
    address: 'B-45, Sector 62, Noida 201301',
    locality: 'Noida',
    geo: { lat: 28.6253, lng: 77.3713 },
    href: '/neet-coaching-noida',
  },
]

const config: BestVerticalConfig = {
  slug: 'best-neet-coaching-near-me',
  headline: 'Best NEET Coaching Near Me',
  ribbon: '6 Delhi NCR Centres + Pan-India Online · AIIMS Faculty',
  subheadline:
    'Find the closest Cerebrum centre — or join online live classes from anywhere in India.',
  intro:
    'When you search "best NEET coaching near me" you want two things: faculty quality + proximity. Cerebrum Biology Academy operates 6 offline centres across Delhi NCR (South Extension, Rohini, Green Park, Gurugram, Faridabad, Noida) — one is almost certainly within 30 minutes of you. For students outside Delhi NCR, online live (not recorded) classes use the same AIIMS-trained faculty pan-India.',
  clusterSummary:
    '15–20 student batches · NCERT + PYQ curriculum · 680+ medical college selections · 98% NEET qualification rate.',
  credentials: [
    { label: '6 Delhi NCR Centres' },
    { label: 'Pan-India Online Live' },
    { label: 'AIIMS-Trained Faculty' },
    { label: 'Small Batches 15–20' },
    { label: '680+ Selections' },
    { label: '98% NEET Qualification' },
    { label: 'Same Faculty Online + Offline' },
    { label: 'Free Demo Class' },
  ],
  pages: [
    { title: 'NEET Coaching — Main Hub', href: '/neet-coaching' },
    {
      title: 'NEET Coaching Delhi',
      href: '/neet-coaching-delhi',
      note: 'South Extension + Green Park + Rohini',
    },
    { title: 'NEET Coaching Gurugram', href: '/neet-coaching-gurugram', note: 'Sector 51' },
    { title: 'NEET Coaching Noida', href: '/neet-coaching-noida', note: 'Sector 62' },
    { title: 'NEET Coaching Faridabad', href: '/neet-coaching-faridabad', note: 'Sector 17' },
    { title: 'NEET Coaching Ghaziabad', href: '/neet-coaching-ghaziabad' },
    { title: 'NEET Coaching Mumbai', href: '/neet-coaching-mumbai', note: 'Online live' },
    { title: 'NEET Coaching Bangalore', href: '/neet-coaching-bangalore', note: 'Online live' },
    { title: 'NEET Coaching Hyderabad', href: '/neet-coaching-hyderabad', note: 'Online live' },
    { title: 'NEET Coaching Chennai', href: '/neet-coaching-chennai', note: 'Online live' },
    { title: 'NEET Coaching Kolkata', href: '/neet-coaching-kolkata', note: 'Online live' },
    { title: 'NEET Coaching Pune', href: '/neet-coaching-pune', note: 'Online live' },
    { title: 'NEET Coaching Kota', href: '/neet-coaching-kota', note: 'Online — Kota alternative' },
    { title: 'Online NEET Biology Coaching', href: '/online-neet-biology-coaching' },
  ],
  pricing: [
    {
      tier: 'Pursuit (Affordable)',
      price: '₹40,000–₹75,000 / year',
      description:
        '30–40 student batches. AIIMS / IIT-trained faculty. Bi-weekly group doubt sessions.',
    },
    {
      tier: 'Ascent (Most Popular)',
      price: '₹58,000–₹90,000 / year',
      description: '16–25 student batches. Weekly doubt sessions. Standard mock-test series.',
    },
    {
      tier: 'Pinnacle (Premium)',
      price: '₹1,20,000–₹1,56,000 / year',
      description: '10–12 student batches + personal mentorship from Dr. Shekhar Singh (AIIMS).',
    },
  ],
  whyBest: [
    {
      title: '6 Centres = Almost Always "Near You" in Delhi NCR',
      description:
        'South Extension, Rohini, Green Park, Gurugram, Faridabad, Noida — covering South Delhi, North Delhi, Gurugram, Faridabad and Noida. For most NCR addresses, a Cerebrum centre is within 30-minute travel time.',
    },
    {
      title: 'Outside Delhi NCR? Online Live Classes (Same Faculty)',
      description:
        'Online sessions are live (not recorded) and use the same AIIMS-trained faculty as the offline batches. Whiteboard teaching, real-time doubt resolution, recorded sessions for revision, weekly mocks. Many top NEET scorers chose the online format.',
    },
    {
      title: 'Biology-Only Specialist (vs Generalist Chains)',
      description:
        'Most NEET coaching brands "near you" (Allen, Aakash, PhysicsWallah, Vedantu) teach all three subjects with rotating faculty. Cerebrum is biology-only — and 360/720 NEET marks (50%) come from Biology. Pairing Cerebrum (Biology) with your existing Physics/Chemistry coaching is a common winning pattern.',
    },
    {
      title: 'Small Batches (15–20 vs 100–400 at Big Chains)',
      description:
        'Individual attention requires small batches. Cerebrum caps Ascent at 16–25 and Pinnacle at 10–12. Allen, Aakash and similar institutes typically run 100–400 students per batch — making personal doubt resolution structurally impossible.',
    },
    {
      title: '12+ Years of Operating Track Record',
      description:
        'Founded in 2014 by Dr. Shekhar C Singh (AIIMS Delhi). 12 years of NEET pedagogy continuity. 680+ documented medical college selections (AIIMS, JIPMER, AFMC, state medical colleges) — published with student names and college admissions.',
    },
    {
      title: 'Free Demo + 7-Day Refund Guarantee',
      description:
        "Free demo class at any of the 6 centres or online — no obligation to enrol. Once enrolled, a 7-day full refund is offered if the class isn't the right fit. Terms in writing.",
    },
  ],
  testimonials: [
    {
      name: 'Aarav Sharma',
      score: 'NEET 681/720',
      college: 'AIIMS Delhi',
      quote:
        'Searched "best NEET coaching near me" in DLF Phase 3 and found Cerebrum Gurugram. The 18-student batch made all the difference.',
    },
    {
      name: 'Priya Yadav',
      score: 'NEET 658/720',
      college: 'MAMC Delhi',
      quote:
        'I live in Noida Sector 78 — the Sector 62 centre was a 10-minute auto ride. Convenience + small batch = ideal combination.',
    },
    {
      name: 'Aditya Verma',
      score: 'NEET 689/720',
      college: 'JIPMER Puducherry',
      quote:
        "I'm from Patna — joined Cerebrum online. Same faculty as Delhi offline. Made it to JIPMER without leaving home.",
    },
  ],
  faqs: [
    {
      question: 'Which is the best NEET coaching near me in Delhi NCR?',
      answer:
        'Cerebrum Biology Academy operates 6 offline centres across Delhi NCR — South Extension, Rohini, Green Park, Gurugram (Sector 51), Faridabad (Sector 17) and Noida (Sector 62). For most NCR addresses, a centre is within 30 minutes. AIIMS-trained faculty, 15–20 student batches, 680+ medical college selections.',
    },
    {
      question: "What is the best NEET coaching near me if I'm not in Delhi NCR?",
      answer:
        'Cerebrum offers online live (not recorded) classes pan-India with the same AIIMS-trained faculty as the offline batches. Students from Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Kota, Patna and across India have qualified through the online format. Live whiteboard teaching, real-time doubt resolution, recorded sessions for revision.',
    },
    {
      question: 'Which Cerebrum centre is closest to me in Delhi?',
      answer:
        'Delhi: South Extension (Block D, Part 2 — flagship, central South Delhi), Green Park (Gulmohar Park — South Delhi), Rohini (Sector 9, DC Chowk — North Delhi). All three cover the bulk of Delhi proper.',
    },
    {
      question: 'Which Cerebrum centre is closest to me in Gurugram, Noida or Faridabad?',
      answer:
        'Gurugram: M2K Corporate Park, Sector 51 — central Gurugram. Noida: B-45, Sector 62 — central Noida. Faridabad: Sector 17 — central Faridabad. Each centre serves a 10–15 km catchment.',
    },
    {
      question: 'How much does NEET coaching cost at the centres near me?',
      answer:
        'Pricing is identical across all 6 centres: Pursuit ₹40,000–₹75,000/year, Ascent ₹58,000–₹90,000/year (most popular), Pinnacle ₹1,20,000–₹1,56,000/year (premium with Dr. Shekhar personal mentorship). Online tier matches offline pricing. EMI options available.',
    },
    {
      question:
        'Do you have NEET coaching near me in Mumbai / Bangalore / Hyderabad / Chennai / Kolkata?',
      answer:
        'Currently no offline centre outside Delhi NCR. However, Cerebrum offers online live (not recorded) classes for students across Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Kota, Lucknow, Patna, Indore and other cities. Same AIIMS-trained faculty as the Delhi NCR offline batches.',
    },
    {
      question: 'Can I book a free demo class at the centre near me?',
      answer:
        'Yes — free demo class at any of the 6 Delhi NCR centres or online. No obligation to enrol. Book via WhatsApp +91 88264-44334 or call directly.',
    },
  ],
  knowsAbout: [
    'NEET Coaching Near Me',
    'NEET Coaching Delhi NCR',
    'NEET Coaching Gurugram',
    'NEET Coaching Noida',
    'NEET Coaching Faridabad',
    'NEET Coaching Rohini',
    'NEET Coaching South Extension',
    'NEET Coaching Green Park',
    'Online NEET Coaching',
    'NEET Coaching India',
  ],
  whatsappMessage:
    'Hi! I want the best NEET coaching near me. Please share details of the closest centre + free demo timings.',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': 'https://cerebrumbiologyacademy.com/#organization',
  name: 'Cerebrum Biology Academy',
  url: 'https://cerebrumbiologyacademy.com',
  logo: 'https://cerebrumbiologyacademy.com/logo.png',
  telephone: '+918826444334',
  email: 'info@cerebrumbiologyacademy.com',
  founder: {
    '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
  },
  foundingDate: '2014',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '485',
    bestRating: '5',
    worstRating: '1',
  },
  areaServed: [
    { '@type': 'City', name: 'Delhi' },
    { '@type': 'City', name: 'Gurugram' },
    { '@type': 'City', name: 'Noida' },
    { '@type': 'City', name: 'Faridabad' },
    { '@type': 'City', name: 'Ghaziabad' },
    { '@type': 'City', name: 'Mumbai' },
    { '@type': 'City', name: 'Bangalore' },
    { '@type': 'City', name: 'Hyderabad' },
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'City', name: 'Kolkata' },
    { '@type': 'City', name: 'Pune' },
    { '@type': 'City', name: 'Kota' },
    { '@type': 'Country', name: 'India' },
  ],
  department: centres.map((c) => ({
    '@type': 'EducationalOrganization',
    name: `Cerebrum Biology Academy — ${c.name}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.address,
      addressLocality: c.locality,
      addressRegion: 'Delhi NCR',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: c.geo.lat,
      longitude: c.geo.lng,
    },
    telephone: '+918826444334',
    url: `https://cerebrumbiologyacademy.com${c.href}`,
  })),
}

export default function BestNEETCoachingNearMePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <BestVerticalLanding config={config} />
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              6 Delhi NCR Centres — Find One Near You
            </h2>
            <p className="text-lg text-slate-600">
              Tap any centre to call or WhatsApp for a free demo class at that location.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centres.map((c) => {
              const centreWaMessage = `Hi! I want to book a free NEET demo class at the Cerebrum ${c.name} centre. Please share available timings.`
              const centreWaLink = `https://wa.me/918826444334?text=${encodeURIComponent(centreWaMessage)}`
              return (
                <div
                  key={c.name}
                  className="flex flex-col bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-green-600 hover:shadow-md transition"
                >
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-900">{c.name}</h3>
                      <p className="text-sm text-green-700 font-semibold">{c.locality}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-5 flex-grow">{c.address}</p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={centreWaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Book Demo at {c.locality}
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="tel:+918826444334"
                        className="inline-flex items-center justify-center gap-1.5 bg-yellow-500 text-slate-900 px-3 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        Call
                      </a>
                      <Link
                        href={c.href}
                        className="inline-flex items-center justify-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-2 rounded-lg font-semibold hover:bg-slate-200 transition text-sm"
                      >
                        Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
