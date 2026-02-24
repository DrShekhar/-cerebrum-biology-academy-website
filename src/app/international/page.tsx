import { Metadata } from 'next'
import Link from 'next/link'
import { Globe, GraduationCap, Clock, MessageCircle } from 'lucide-react'
import { getCountriesByRegion, formatPrice } from '@/lib/international/countries'

export const metadata: Metadata = {
  title: 'International Biology Tutoring | 10 Countries',
  description:
    'Expert online biology tutoring for students in US, UK, Canada, Australia, Singapore, UAE, Ireland, Hong Kong, New Zealand & South Africa. Small group from $40/hr.',
  keywords: [
    'online biology tutor',
    'international biology tutoring',
    'AP Biology tutor',
    'GCSE Biology tutor',
    'A-Level Biology tutoring',
    'IB Biology tutor',
    'MCAT prep',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/international/',
  },
  openGraph: {
    title: 'International Biology Tutoring',
    description:
      'Expert tutoring for students across 10 countries. All major exam systems covered.',
    type: 'website',
  },
}

export default function InternationalHubPage() {
  const countriesByRegion = getCountriesByRegion()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            Serving Students in 10 Countries
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Expert Biology Tutoring
            <br />
            <span className="text-green-400">Anywhere in the World</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Personalized online tutoring for AP Biology, GCSE, A-Level, IB, and all major exam
            systems. Learn in your timezone with expert tutors.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-yellow-400">10</div>
              <div className="text-slate-300 text-sm">Countries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-green-400">67+</div>
              <div className="text-slate-300 text-sm">Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-400">20+</div>
              <div className="text-slate-300 text-sm">Exam Systems</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-400">4.9</div>
              <div className="text-slate-300 text-sm">Rating</div>
            </div>
          </div>

          <p className="text-slate-400 text-sm">
            Select your country below to see courses and pricing in your local currency
          </p>
        </div>
      </section>

      {/* Country Grid by Region */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
            Choose Your Country
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            We offer specialized tutoring tailored to your country&apos;s exam systems and
            curriculum. All prices shown in local currency.
          </p>

          {Object.entries(countriesByRegion).map(([region, countries]) => (
            <div key={region} className="mb-12">
              <h3 className="text-xl font-semibold text-slate-700 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                {region}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {countries.map((country) => (
                  <Link
                    key={country.code}
                    href={`/international/${country.code}/`}
                    className="group bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl hover:border-green-500 transition-all duration-200"
                  >
                    {/* Flag & Name */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl">{country.flag}</span>
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                          {country.name}
                        </h4>
                        <p className="text-sm text-slate-500">{country.timezoneAbbr}</p>
                      </div>
                    </div>

                    {/* Exam Systems */}
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                        Exam Systems
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {country.examSystems.slice(0, 3).map((exam) => (
                          <span
                            key={exam}
                            className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"
                          >
                            {exam}
                          </span>
                        ))}
                        {country.examSystems.length > 3 && (
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                            +{country.examSystems.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-500">Small Group</p>
                        <p className="font-bold text-green-600">
                          {formatPrice(country.pricing.smallGroup, country.currency)}
                          /hr
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">1-on-1</p>
                        <p className="font-semibold text-slate-700">
                          from {formatPrice(country.pricing.oneOnOneMin, country.currency)}
                          /hr
                        </p>
                      </div>
                    </div>

                    {/* CTA Arrow */}
                    <div className="mt-4 text-center">
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600 group-hover:gap-2 transition-all">
                        View Courses
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Why International Students Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Flexible Timezones</h3>
              <p className="text-slate-600 text-sm">
                Classes scheduled to match your timezone. Morning, afternoon, or evening slots
                available.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Curriculum Experts</h3>
              <p className="text-slate-600 text-sm">
                Tutors specialized in your exact exam system. AP, GCSE, A-Level, IB, NCEA, and more.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Local Currency Pricing</h3>
              <p className="text-slate-600 text-sm">
                Pay in your local currency with transparent pricing. No hidden fees or conversion
                charges.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">WhatsApp Support</h3>
              <p className="text-slate-600 text-sm">
                Quick doubts? Message us anytime on WhatsApp. Average response time under 2 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Excel in Biology?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Join students from around the world who are achieving their academic goals with
            personalized tutoring.
          </p>
          <a
            href="https://wa.me/918826444334?text=Hi!%20I'm%20interested%20in%20biology%20tutoring.%20Can%20you%20share%20more%20details?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 text-xl font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200"
          >
            <MessageCircle className="w-6 h-6" />
            Chat on WhatsApp
          </a>
          <p className="mt-4 text-sm text-slate-400">Free demo class • No commitment required</p>
        </div>
      </section>
    </main>
  )
}
