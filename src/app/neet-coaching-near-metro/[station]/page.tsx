import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Monitor, Users, Trophy, Train, MessageCircle, Clock } from 'lucide-react'
import { NoidaPageSchemas } from '@/components/seo/NoidaSchemas'
import { notFound } from 'next/navigation'

interface MetroStationData {
  name: string
  slug: string
  line: string
  lineColor: string
  area: string
  description: string
  studentCount: string
  coordinates: { lat: string; lng: string }
  nearbyAreas: string[]
  travelTime: string
  faqs: Array<{ question: string; answer: string }>
}

const metroStationData: Record<string, MetroStationData> = {
  'botanical-garden': {
    name: 'Botanical Garden Metro',
    slug: 'botanical-garden',
    line: 'Blue Line',
    lineColor: 'blue',
    area: 'Noida',
    description: 'Botanical Garden is a major interchange station connecting Blue Line and Magenta Line. Perfect connectivity for students from Noida, Greater Noida, and Faridabad.',
    studentCount: '150+',
    coordinates: { lat: '28.5639', lng: '77.3340' },
    nearbyAreas: ['Sector 38', 'Sector 37', 'Sector 39', 'Okhla Bird Sanctuary', 'Kalindi Kunj'],
    travelTime: '40 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Botanical Garden Metro?',
        answer: 'Yes! We offer online NEET Biology classes for students near Botanical Garden Metro. For hybrid mode, our South Extension center is 40 minutes away via Blue Line.',
      },
      {
        question: 'How do students from Botanical Garden area attend classes?',
        answer: '150+ students from Botanical Garden area prefer our online mode. For hybrid students, weekend offline classes at South Extension are easily accessible via Blue Line metro.',
      },
      {
        question: 'What is the fee for NEET coaching for Botanical Garden area students?',
        answer: 'Online Biology classes: Rs 48,000/year. Hybrid mode (online + weekend offline): Rs 58,000/year. Save commute time with online mode.',
      },
    ],
  },
  'noida-city-centre': {
    name: 'Noida City Centre Metro',
    slug: 'noida-city-centre',
    line: 'Blue Line',
    lineColor: 'blue',
    area: 'Noida',
    description: 'Noida City Centre is the commercial hub of Noida with excellent metro connectivity. Close to Sector 32, 33, and the business district.',
    studentCount: '120+',
    coordinates: { lat: '28.5746', lng: '77.3564' },
    nearbyAreas: ['Sector 32', 'Sector 33', 'Sector 34', 'Sector 35', 'Sector 25'],
    travelTime: '35 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Noida City Centre Metro?',
        answer: 'We offer online NEET Biology classes for students near Noida City Centre. Our South Extension center is 35 minutes via Blue Line for hybrid mode.',
      },
      {
        question: 'How many students from Noida City Centre area are enrolled?',
        answer: '120+ students from Noida City Centre area (Sector 32-35) are enrolled in our NEET Biology program.',
      },
      {
        question: 'What is the travel time to South Extension from Noida City Centre?',
        answer: 'South Extension is approximately 35 minutes via Blue Line metro. Many students prefer our online mode to save this commute time.',
      },
    ],
  },
  'sector-18-metro': {
    name: 'Sector 18 Metro',
    slug: 'sector-18-metro',
    line: 'Blue Line',
    lineColor: 'blue',
    area: 'Noida',
    description: 'Sector 18 Metro serves the shopping and commercial hub of Noida including GIP Mall, Atta Market, and nearby residential areas.',
    studentCount: '100+',
    coordinates: { lat: '28.5684', lng: '77.3226' },
    nearbyAreas: ['Sector 18', 'Sector 16', 'Sector 17', 'GIP Mall', 'Atta Market'],
    travelTime: '30 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Sector 18 Metro Noida?',
        answer: 'We offer online NEET Biology classes for students near Sector 18 Metro. South Extension center is 30 minutes via Blue Line for hybrid mode.',
      },
      {
        question: 'Can students from GIP Mall area join online classes?',
        answer: 'Yes! 100+ students from Sector 18 area near GIP Mall are enrolled in our online NEET Biology program. Study from home without traffic hassles.',
      },
      {
        question: 'What modes are available for Sector 18 students?',
        answer: 'Online (Rs 48,000/year), Hybrid with weekend offline (Rs 58,000/year), or Full offline at South Extension (Rs 68,000/year).',
      },
    ],
  },
  'sector-137-metro': {
    name: 'Sector 137 Metro',
    slug: 'sector-137-metro',
    line: 'Aqua Line',
    lineColor: 'cyan',
    area: 'Noida',
    description: 'Sector 137 Metro on the Aqua Line serves the IT and Film City area of Noida. Popular among students from Sector 137-144 and nearby areas.',
    studentCount: '85+',
    coordinates: { lat: '28.4880', lng: '77.3395' },
    nearbyAreas: ['Sector 137', 'Sector 142', 'Sector 143', 'Film City', 'Knowledge Park'],
    travelTime: '45 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Sector 137 Metro?',
        answer: 'We offer online NEET Biology classes for students near Sector 137 Metro. Online mode is most popular due to the longer commute to Delhi.',
      },
      {
        question: 'How many students from Film City area are enrolled?',
        answer: '85+ students from Sector 137 and Film City area are enrolled. Most prefer online mode due to excellent focus environment at home.',
      },
      {
        question: 'Is Aqua Line connected to South Extension?',
        answer: 'Aqua Line connects at Noida Sector 52 to Blue Line, then South Extension is accessible. Total travel time is ~45 minutes. Online mode saves this commute.',
      },
    ],
  },
  'pari-chowk-metro': {
    name: 'Pari Chowk Metro',
    slug: 'pari-chowk-metro',
    line: 'Aqua Line',
    lineColor: 'cyan',
    area: 'Greater Noida',
    description: 'Pari Chowk Metro serves Greater Noida including Knowledge Park, Alpha, Beta, Gamma sectors, and nearby areas.',
    studentCount: '110+',
    coordinates: { lat: '28.4692', lng: '77.5035' },
    nearbyAreas: ['Pari Chowk', 'Knowledge Park', 'Alpha 1 & 2', 'Beta 1 & 2', 'Gamma 1 & 2'],
    travelTime: '60 min to South Extension',
    faqs: [
      {
        question: 'Is there NEET coaching near Pari Chowk Metro Greater Noida?',
        answer: 'We offer online NEET Biology classes for Greater Noida students near Pari Chowk. Online mode is highly recommended due to distance from Delhi.',
      },
      {
        question: 'Do you have students from Greater Noida Knowledge Park?',
        answer: '110+ students from Pari Chowk area including Knowledge Park, Alpha, Beta, Gamma sectors are enrolled in our online NEET program.',
      },
      {
        question: 'Is online coaching effective for Greater Noida students?',
        answer: 'Absolutely! 90% of our Greater Noida students prefer online mode. Save 2-3 hours daily on commute and focus entirely on studies.',
      },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(metroStationData).map((station) => ({
    station,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ station: string }>
}): Promise<Metadata> {
  const { station } = await params
  const data = metroStationData[station]

  if (!data) {
    return {
      title: 'Metro Station Not Found',
    }
  }

  return {
    title: `NEET Coaching Near ${data.name} ${data.area} | Online & Hybrid | Cerebrum`,
    description: `NEET Biology coaching for students near ${data.name}. Online classes from home + hybrid mode. ${data.studentCount} students enrolled. ${data.travelTime}. AIIMS faculty.`,
    keywords: [
      `neet coaching near ${data.name.toLowerCase()}`,
      `biology coaching ${data.name.toLowerCase()}`,
      `neet classes ${data.area.toLowerCase()} metro`,
      `online neet coaching ${data.area.toLowerCase()}`,
    ],
    openGraph: {
      title: `NEET Coaching Near ${data.name} | Cerebrum Academy`,
      description: `Online NEET Biology classes for students near ${data.name}. ${data.studentCount} students enrolled.`,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${data.slug}`,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${data.slug}`,
    },
  }
}

export default async function MetroStationPage({
  params,
}: {
  params: Promise<{ station: string }>
}) {
  const { station } = await params
  const data = metroStationData[station]

  if (!data) {
    notFound()
  }

  const lineColorClass = data.lineColor === 'blue' ? 'bg-blue-600' : 'bg-cyan-500'
  const heroGradient = data.lineColor === 'blue'
    ? 'from-blue-800 to-blue-600'
    : 'from-cyan-700 to-teal-600'
  const accentBg = data.lineColor === 'blue' ? 'bg-blue-50' : 'bg-cyan-50'
  const accentText = data.lineColor === 'blue' ? 'text-blue-600' : 'text-cyan-600'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${heroGradient} text-white py-16`}>
        <div className="container mx-auto px-4 text-center">
          <span className={`inline-flex items-center gap-2 ${lineColorClass} text-white px-4 py-1 rounded-full text-sm font-semibold mb-4`}>
            <Train className="w-4 h-4" />
            {data.line} - {data.area}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NEET Coaching Near {data.name}
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Online Biology classes for students near {data.name}. {data.studentCount} students enrolled.
            {data.travelTime} to our South Extension center for hybrid mode.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/918826444334?text=Hi!%20I'm%20near%20${encodeURIComponent(data.name)}.%20I'm%20interested%20in%20NEET%20coaching.`}
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
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
            <div className={`text-center p-4 ${accentBg} rounded-xl`}>
              <Users className={`w-8 h-8 ${accentText} mx-auto mb-2`} />
              <p className="text-2xl font-bold">{data.studentCount}</p>
              <p className="text-sm text-gray-600">Students Enrolled</p>
            </div>
            <div className={`text-center p-4 ${accentBg} rounded-xl`}>
              <Clock className={`w-8 h-8 ${accentText} mx-auto mb-2`} />
              <p className="text-2xl font-bold">{data.travelTime.split(' ')[0]}</p>
              <p className="text-sm text-gray-600">To South Extension</p>
            </div>
            <div className={`text-center p-4 ${accentBg} rounded-xl`}>
              <Trophy className={`w-8 h-8 ${accentText} mx-auto mb-2`} />
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className={`text-center p-4 ${accentBg} rounded-xl`}>
              <Monitor className={`w-8 h-8 ${accentText} mx-auto mb-2`} />
              <p className="text-2xl font-bold">Live</p>
              <p className="text-sm text-gray-600">Online Classes</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Metro Station */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">About {data.name}</h2>
          <p className="text-gray-600 mb-6">{data.description}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MapPin className={`w-5 h-5 ${accentText}`} />
                Areas Served
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.nearbyAreas.map((area, i) => (
                  <span key={i} className={`${accentBg} ${accentText} px-3 py-1 rounded-full text-sm`}>
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Train className={`w-5 h-5 ${accentText}`} />
                Metro Line
              </h3>
              <p className="text-gray-600">
                {data.line} - {data.travelTime} to South Extension center
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Modes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Learning Mode</h2>
          <p className="text-center text-gray-600 mb-12">Most {data.area} students prefer online - save commute time!</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-md relative">
              <span className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </span>
              <Monitor className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">100% Online</h3>
              <p className="text-gray-600 mb-4">Live classes from home. No commute needed.</p>
              <p className="text-2xl font-bold text-green-700">Rs 48,000/year</p>
            </div>
            <div className={`${accentBg} rounded-2xl p-6 border-2 ${data.lineColor === 'blue' ? 'border-blue-200' : 'border-cyan-200'} shadow-md`}>
              <Train className={`w-10 h-10 ${accentText} mb-4`} />
              <h3 className="text-xl font-bold mb-2">Hybrid Mode</h3>
              <p className="text-gray-600 mb-4">Online + Weekend offline. Metro accessible.</p>
              <p className={`text-2xl font-bold ${accentText}`}>Rs 58,000/year</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-md">
              <MapPin className="w-10 h-10 text-gray-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Full Offline</h3>
              <p className="text-gray-600 mb-4">Daily at South Extension ({data.travelTime}).</p>
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
                  <span className={`${accentText} group-open:rotate-180 transition-transform`}>
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
      <section className={`py-16 bg-gradient-to-br ${heroGradient} text-white`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join {data.studentCount} Students from {data.name} Area</h2>
          <p className="text-xl text-white/90 mb-8">
            Start your medical journey with expert guidance from AIIMS faculty
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/918826444334?text=Hi!%20I'm%20near%20${encodeURIComponent(data.name)}.%20I%20want%20to%20join%20NEET%20coaching.`}
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Now
            </a>
            <Link
              href="/free-neet-demo-class-gurugram"
              className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <NoidaPageSchemas
        area={data.area}
        pageName={`NEET Coaching Near ${data.name}`}
        pageDescription={`NEET Biology coaching for students near ${data.name}, ${data.area}. Online classes with AIIMS faculty.`}
        pageUrl={`https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${data.slug}`}
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: data.area, url: `https://cerebrumbiologyacademy.com/locations/noida` },
          { name: data.name, url: `https://cerebrumbiologyacademy.com/neet-coaching-near-metro/${data.slug}` },
        ]}
        customFAQs={data.faqs}
        coordinates={data.coordinates}
      />
    </div>
  )
}
