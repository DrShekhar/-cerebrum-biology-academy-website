import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Users, ArrowRight, Building2 } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export const metadata: Metadata = {
  title: 'NEET Coaching Near Noida Societies | Cerebrum Biology Academy',
  description:
    'Find NEET Biology coaching near your Noida society. Online & hybrid classes for students in Godrej Woods, Mahagun Moderne, Supertech Eco Village, Logix Blossom County & more.',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-noida-society',
  },
  openGraph: {
    title: 'NEET Coaching Near Noida Societies | Cerebrum Biology Academy',
    description:
      'Find NEET Biology coaching near your Noida society. Online & hybrid classes available.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida-society',
    type: 'website',
  },
}

const societies = [
  { slug: 'godrej-woods', name: 'Godrej Woods', sector: '43', students: '35+' },
  { slug: 'mahagun-moderne', name: 'Mahagun Moderne', sector: '78', students: '40+' },
  { slug: 'supertech-eco-village', name: 'Supertech Eco Village', sector: '1', students: '50+' },
  { slug: 'logix-blossom-county', name: 'Logix Blossom County', sector: '137', students: '25+' },
  { slug: 'ace-city', name: 'Ace City', sector: '1', students: '30+' },
  { slug: 'gulshan-dynasty', name: 'Gulshan Dynasty', sector: '144', students: '20+' },
  { slug: 'eldeco-utopia', name: 'Eldeco Utopia', sector: '93A', students: '22+' },
  { slug: 'paras-tierea', name: 'Paras Tierea', sector: '137', students: '28+' },
  { slug: 'prateek-grand-city', name: 'Prateek Grand City', sector: 'NH-24', students: '18+' },
]

export default function NeetCoachingNoidaSocietyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              NEET Biology Coaching Near Your Noida Society
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Live online & hybrid NEET Biology classes for students across Noida.
              Expert faculty from AIIMS & top medical colleges.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book-free-demo"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Book Free Demo Class
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${CONTACT_INFO.phone.primary}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                {CONTACT_INFO.phone.display.primary}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Find NEET Coaching Near Your Society
        </h2>
        <p className="text-gray-600 mb-8">
          We serve students from 9+ major Noida societies with personalized online and hybrid coaching.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {societies.map((society) => (
            <Link
              key={society.slug}
              href={`/neet-coaching-noida-society/${society.slug}`}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <Building2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {society.name}
                  </h3>
                  <p className="text-sm text-gray-500">Sector {society.sector}, Noida</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-green-600" />
                  {society.students} students
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-red-500" />
                  Noida
                </span>
              </div>
              <div className="mt-3 text-sm text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                View Details <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Don&apos;t See Your Society?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We offer online NEET Biology coaching to students across all of Noida.
            Contact us to learn about classes near your area.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={CONTACT_INFO.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/locations/noida"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-lg border border-gray-300 transition-colors"
            >
              View Noida Center Details
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
