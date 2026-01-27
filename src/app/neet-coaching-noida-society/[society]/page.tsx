import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Monitor, Users, Trophy, Star, Building2, MessageCircle, CheckCircle } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'
import { notFound } from 'next/navigation'

interface SocietyData {
  name: string
  slug: string
  sector: string
  area: string
  description: string
  studentCount: string
  coordinates: { lat: string; lng: string }
  nearbyLandmarks: string[]
  nearbySchools: string[]
  faqs: Array<{ question: string; answer: string }>
}

const societyData: Record<string, SocietyData> = {
  'godrej-woods': {
    name: 'Godrej Woods',
    slug: 'godrej-woods',
    sector: '43',
    area: 'Noida',
    description: 'Premium residential society in Sector 43 with excellent connectivity to Noida Expressway.',
    studentCount: '35+',
    coordinates: { lat: '28.5720', lng: '77.3560' },
    nearbyLandmarks: ['Noida Expressway', 'Sector 44 Metro', 'Gardens Galleria'],
    nearbySchools: ['DPS Noida', 'Apeejay School', 'Genesis Global School'],
    faqs: [
      {
        question: 'Is there NEET coaching near Godrej Woods Noida?',
        answer: 'We offer online NEET Biology classes for Godrej Woods residents. Live interactive sessions from home with instant doubt resolution. Our South Extension center is 45 minutes away for hybrid mode.',
      },
      {
        question: 'What is the fee for NEET coaching for Godrej Woods students?',
        answer: 'Online Biology classes: Rs 48,000/year. Hybrid mode (online + weekend offline): Rs 58,000/year. EMI options available.',
      },
      {
        question: 'How many students from Godrej Woods are enrolled?',
        answer: '35+ students from Godrej Woods and nearby Sector 43 societies are currently enrolled in our online NEET Biology program.',
      },
    ],
  },
  'mahagun-moderne': {
    name: 'Mahagun Moderne',
    slug: 'mahagun-moderne',
    sector: '78',
    area: 'Noida',
    description: 'One of the largest residential complexes in Sector 78 with excellent amenities.',
    studentCount: '55+',
    coordinates: { lat: '28.5690', lng: '77.3820' },
    nearbyLandmarks: ['Sector 76 Metro', 'Noida Golf Course', 'Wave City Center'],
    nearbySchools: ['DPS Greater Noida', 'Ryan International', 'Khaitan Public School'],
    faqs: [
      {
        question: 'Is there NEET coaching near Mahagun Moderne?',
        answer: 'Yes! We offer online NEET Biology classes for Mahagun Moderne residents. 55+ students already enrolled. Hybrid mode with weekend offline at South Extension available.',
      },
      {
        question: 'What is the fee for NEET coaching for Mahagun Moderne students?',
        answer: 'Online Biology classes: Rs 48,000/year. Hybrid mode: Rs 58,000/year. All include AIIMS faculty, study material, and doubt support.',
      },
      {
        question: 'How do online classes work for Mahagun Moderne students?',
        answer: 'Live interactive classes on Zoom, recorded lectures for revision, WhatsApp doubt support, AI-powered study tools. Study from your Mahagun Moderne home with no commute.',
      },
    ],
  },
  'supertech-eco-village': {
    name: 'Supertech Eco Village',
    slug: 'supertech-eco-village',
    sector: '1',
    area: 'Greater Noida West',
    description: 'Large residential complex in Greater Noida West (Noida Extension) with affordable housing.',
    studentCount: '70+',
    coordinates: { lat: '28.5980', lng: '77.4380' },
    nearbyLandmarks: ['Gaur City', 'Pari Chowk', 'Greater Noida Expressway'],
    nearbySchools: ['DPS Greater Noida', 'Delhi World School', 'Genesis Global School'],
    faqs: [
      {
        question: 'Is there NEET coaching near Supertech Eco Village?',
        answer: 'We offer online NEET Biology classes for Supertech Eco Village students. 70+ students from Greater Noida West are enrolled. Perfect for Noida Extension residents.',
      },
      {
        question: 'What is the fee for NEET coaching for Eco Village students?',
        answer: 'Online Biology classes: Rs 48,000/year. This is the most affordable option for Greater Noida West students compared to traveling to Delhi/Noida.',
      },
      {
        question: 'Do you have any students from Supertech Eco Village?',
        answer: 'Yes! 70+ students from Supertech Eco Village and nearby Greater Noida West societies are currently enrolled. Many have scored 650+ in NEET.',
      },
    ],
  },
  'logix-blossom-county': {
    name: 'Logix Blossom County',
    slug: 'logix-blossom-county',
    sector: '137',
    area: 'Noida',
    description: 'Premium gated community in Sector 137 near Noida Film City.',
    studentCount: '40+',
    coordinates: { lat: '28.4920', lng: '77.3340' },
    nearbyLandmarks: ['Noida Film City', 'Sector 137 Metro', 'Knowledge Park'],
    nearbySchools: ['Amity International', 'GD Goenka', 'Lotus Valley'],
    faqs: [
      {
        question: 'Is there NEET coaching near Logix Blossom County?',
        answer: 'We offer online NEET Biology classes for Logix Blossom County residents in Sector 137. Live interactive sessions with AIIMS faculty.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 137 students?',
        answer: 'Online Biology classes: Rs 48,000/year. Hybrid mode with weekend offline at South Extension: Rs 58,000/year.',
      },
      {
        question: 'How many students from Logix Blossom County are enrolled?',
        answer: '40+ students from Logix Blossom County and nearby Sector 137 societies are enrolled in our NEET Biology program.',
      },
    ],
  },
  'ace-city': {
    name: 'Ace City',
    slug: 'ace-city',
    sector: '1',
    area: 'Greater Noida West',
    description: 'Popular residential complex in Greater Noida West near Gaur City.',
    studentCount: '45+',
    coordinates: { lat: '28.5850', lng: '77.4450' },
    nearbyLandmarks: ['Gaur City Mall', 'Gaur City 2', 'Greater Noida Expressway'],
    nearbySchools: ['DPS Greater Noida', 'Delhi World School', 'Noida International'],
    faqs: [
      {
        question: 'Is there NEET coaching near Ace City Greater Noida?',
        answer: 'We offer online NEET Biology classes for Ace City residents. 45+ students from Ace City and nearby societies are enrolled.',
      },
      {
        question: 'What is the fee for NEET coaching for Ace City students?',
        answer: 'Online Biology classes: Rs 48,000/year. Perfect for Greater Noida West students who want quality coaching without commuting.',
      },
      {
        question: 'Do online classes work well for Greater Noida West students?',
        answer: 'Absolutely! 70% of our Greater Noida West students prefer online mode. Save 2-3 hours daily on commute and study from home.',
      },
    ],
  },
  'gulshan-dynasty': {
    name: 'Gulshan Dynasty',
    slug: 'gulshan-dynasty',
    sector: '144',
    area: 'Noida',
    description: 'Ultra-luxury residential project in Sector 144 with premium amenities.',
    studentCount: '25+',
    coordinates: { lat: '28.5050', lng: '77.3580' },
    nearbyLandmarks: ['Noida-Greater Noida Expressway', 'Sector 143 Metro', 'Golf Course'],
    nearbySchools: ['DPS Noida', 'Amity International', 'Pathways World School'],
    faqs: [
      {
        question: 'Is there NEET coaching near Gulshan Dynasty Sector 144?',
        answer: 'We offer online NEET Biology classes for Gulshan Dynasty residents. Premium quality coaching from home.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 144 students?',
        answer: 'Online Biology classes: Rs 48,000-98,000/year depending on batch tier. Premium Pinnacle batch available.',
      },
      {
        question: 'How many students from Gulshan Dynasty are enrolled?',
        answer: '25+ students from Gulshan Dynasty and nearby premium societies in Sector 144 area are enrolled.',
      },
    ],
  },
  'eldeco-utopia': {
    name: 'Eldeco Utopia',
    slug: 'eldeco-utopia',
    sector: '93A',
    area: 'Noida',
    description: 'Premium residential society in Sector 93A near Noida Golf Course.',
    studentCount: '30+',
    coordinates: { lat: '28.5180', lng: '77.3720' },
    nearbyLandmarks: ['Noida Golf Course', 'Sector 93 Metro', 'NSEZ'],
    nearbySchools: ['DPS Noida', 'Lotus Valley', 'Cambridge School'],
    faqs: [
      {
        question: 'Is there NEET coaching near Eldeco Utopia Noida?',
        answer: 'We offer online NEET Biology classes for Eldeco Utopia residents in Sector 93A. AIIMS faculty, small batches.',
      },
      {
        question: 'What is the fee for NEET coaching for Sector 93A students?',
        answer: 'Online Biology classes: Rs 48,000/year. Hybrid mode with South Extension: Rs 58,000/year.',
      },
      {
        question: 'How many students from Eldeco Utopia are enrolled?',
        answer: '30+ students from Eldeco Utopia and nearby Sector 93 societies are enrolled in our NEET Biology program.',
      },
    ],
  },
  'paras-tierea': {
    name: 'Paras Tierea',
    slug: 'paras-tierea',
    sector: '137',
    area: 'Noida',
    description: 'Luxury residential project in Sector 137 near Noida Film City.',
    studentCount: '35+',
    coordinates: { lat: '28.4950', lng: '77.3380' },
    nearbyLandmarks: ['Noida Film City', 'Sector 137 Metro', 'Amity University'],
    nearbySchools: ['Amity International', 'GD Goenka', 'Lotus Valley'],
    faqs: [
      {
        question: 'Is there NEET coaching near Paras Tierea Sector 137?',
        answer: 'We offer online NEET Biology classes for Paras Tierea residents. Perfect for Sector 137 students.',
      },
      {
        question: 'What is the fee for NEET coaching for Paras Tierea students?',
        answer: 'Online Biology classes: Rs 48,000/year. All include AIIMS faculty, study material, and AI-powered tools.',
      },
      {
        question: 'How do online classes work for Paras Tierea students?',
        answer: 'Live Zoom classes, recorded lectures, WhatsApp doubt support, weekly tests. Study from your Paras Tierea home.',
      },
    ],
  },
  'prateek-grand-city': {
    name: 'Prateek Grand City',
    slug: 'prateek-grand-city',
    sector: 'NH-24',
    area: 'Ghaziabad/Noida Border',
    description: 'Large residential complex on NH-24, close to Noida and Ghaziabad.',
    studentCount: '50+',
    coordinates: { lat: '28.6350', lng: '77.4280' },
    nearbyLandmarks: ['NH-24', 'Indirapuram', 'Crossing Republik'],
    nearbySchools: ['DPS Indirapuram', 'Ryan International', 'Noida International'],
    faqs: [
      {
        question: 'Is there NEET coaching near Prateek Grand City?',
        answer: 'We offer online NEET Biology classes for Prateek Grand City residents. 50+ students from NH-24 area are enrolled.',
      },
      {
        question: 'What is the fee for NEET coaching for Prateek Grand City students?',
        answer: 'Online Biology classes: Rs 48,000/year. Best option for NH-24 area students to avoid traffic.',
      },
      {
        question: 'Do you have students from Ghaziabad/NH-24 area?',
        answer: 'Yes! 100+ students from Ghaziabad, Indirapuram, and NH-24 area are enrolled. Online mode is perfect for avoiding traffic.',
      },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(societyData).map((society) => ({
    society,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ society: string }>
}): Promise<Metadata> {
  const { society } = await params
  const data = societyData[society]

  if (!data) {
    return {
      title: 'Society Not Found',
    }
  }

  return {
    title: `NEET Coaching for ${data.name} ${data.area} | Online Classes | Cerebrum`,
    description: `NEET Biology coaching for ${data.name}, ${data.sector !== 'NH-24' ? `Sector ${data.sector}` : data.sector} ${data.area} students. Online classes from home. ${data.studentCount} students enrolled. AIIMS faculty. Call 88264-44334!`,
    keywords: [
      `neet coaching ${data.name.toLowerCase().replace(/\s+/g, ' ')}`,
      `biology coaching ${data.name.toLowerCase()}`,
      `neet classes ${data.sector} ${data.area.toLowerCase()}`,
      `online neet coaching ${data.area.toLowerCase()}`,
    ],
    openGraph: {
      title: `NEET Coaching for ${data.name} | Cerebrum Academy`,
      description: `Online NEET Biology classes for ${data.name} residents. ${data.studentCount} students enrolled.`,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-noida-society/${data.slug}`,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-noida-society/${data.slug}`,
    },
  }
}

export default async function SocietyPage({
  params,
}: {
  params: Promise<{ society: string }>
}) {
  const { society } = await params
  const data = societyData[society]

  if (!data) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-yellow-500 text-teal-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            <Building2 className="w-4 h-4" />
            {data.sector !== 'NH-24' ? `Sector ${data.sector}, ${data.area}` : `${data.sector} Area`}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Coaching for {data.name} Students
          </h1>
          <p className="text-xl text-teal-100 mb-6 max-w-2xl mx-auto">
            Online Biology classes from your {data.name} home. {data.studentCount} students enrolled.
            Hybrid mode with South Extension available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I'm%20from%20{encodeURIComponent(data.name)}.%20I'm%20interested%20in%20NEET%20coaching."
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-teal-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call 88264-44334
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-teal-50 rounded-xl">
              <Users className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{data.studentCount}</p>
              <p className="text-sm text-gray-600">{data.name} Students</p>
            </div>
            <div className="text-center p-4 bg-teal-50 rounded-xl">
              <Trophy className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center p-4 bg-teal-50 rounded-xl">
              <Star className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">4.9/5</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
            <div className="text-center p-4 bg-teal-50 rounded-xl">
              <Monitor className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">Live</p>
              <p className="text-sm text-gray-600">Online Classes</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Society */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">About {data.name}</h2>
          <p className="text-gray-600 mb-6">{data.description}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Nearby Landmarks</h3>
              <ul className="space-y-1">
                {data.nearbyLandmarks.map((landmark, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    {landmark}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Popular Schools</h3>
              <ul className="space-y-1">
                {data.nearbySchools.map((school, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    {school}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Modes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Learning Mode</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border-2 border-teal-200 shadow-md">
              <Monitor className="w-10 h-10 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">100% Online</h3>
              <p className="text-gray-600 mb-4">Live classes from your {data.name} home. Most popular.</p>
              <p className="text-2xl font-bold text-teal-700">Rs 48,000/year</p>
            </div>
            <div className="bg-yellow-400 rounded-2xl p-6 relative shadow-lg">
              <span className="absolute top-0 right-0 bg-teal-800 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                RECOMMENDED
              </span>
              <Building2 className="w-10 h-10 text-teal-900 mb-4" />
              <h3 className="text-xl font-bold mb-2">Hybrid Mode</h3>
              <p className="text-teal-900 mb-4">Online + Weekend offline at South Extension.</p>
              <p className="text-2xl font-bold text-teal-900">Rs 58,000/year</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-md">
              <MapPin className="w-10 h-10 text-gray-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Full Offline</h3>
              <p className="text-gray-600 mb-4">Daily at South Extension center.</p>
              <p className="text-2xl font-bold text-gray-700">Rs 68,000/year</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {data.faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className="text-teal-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-800 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join {data.name} NEET Toppers</h2>
          <p className="text-xl text-teal-100 mb-8">
            Start your medical journey with expert guidance from AIIMS faculty
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/918826444334?text=Hi!%20I'm%20from%20{encodeURIComponent(data.name)}.%20I%20want%20to%20join%20NEET%20coaching."
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Now
            </a>
            <Link
              href="/free-neet-demo-class-gurugram"
              className="inline-flex items-center gap-2 bg-yellow-500 text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <NoidaPageSchemas
        area={data.area}
        sector={data.sector !== 'NH-24' ? data.sector : undefined}
        society={data.name}
        pageName={`NEET Coaching for ${data.name} ${data.area}`}
        pageDescription={`NEET Biology coaching for ${data.name}, ${data.area} students. Online classes with AIIMS faculty.`}
        pageUrl={`https://cerebrumbiologyacademy.com/neet-coaching-noida-society/${data.slug}`}
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: data.area, url: `https://cerebrumbiologyacademy.com/locations/noida` },
          { name: data.name, url: `https://cerebrumbiologyacademy.com/neet-coaching-noida-society/${data.slug}` },
        ]}
        customFAQs={data.faqs}
        coordinates={data.coordinates}
      />
    </div>
  )
}
