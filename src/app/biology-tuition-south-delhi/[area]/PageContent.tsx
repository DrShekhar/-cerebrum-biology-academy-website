'use client'

import Link from 'next/link'
import { MapPin, GraduationCap, CheckCircle, Phone, ArrowRight, Train, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AreaDetails, classOptions } from './data'

interface PageContentProps {
  area: AreaDetails
  areaSlug: string
}

export default function PageContent({ area, areaSlug }: PageContentProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-700 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-5xl mx-auto animate-fadeInUp"
          >
            <Link
              href="/biology-tuition-south-delhi"
              className="inline-flex items-center text-yellow-300 hover:text-yellow-200 mb-4"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to South Delhi
            </Link>

            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6 ml-4">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              {area.fullName}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">Biology Tuition in {area.name}</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-4">
              Classes 9-12 | CBSE, ICSE & State Boards | NEET Foundation
            </p>

            <p className="text-md opacity-80 mb-8 max-w-4xl mx-auto">{area.heroDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {area.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metro & Landmarks */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-green-50 rounded-xl p-6 animate-fadeInUp"
            >
              <div className="flex items-center mb-4">
                <Train className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="font-bold text-gray-900">Nearby Metro Stations</h3>
              </div>
              <ul className="space-y-2">
                {area.nearbyMetro.map((metro) => (
                  <li key={metro} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {metro}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="bg-green-50 rounded-xl p-6 animate-fadeInUp"
            >
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="font-bold text-gray-900">Key Landmarks</h3>
              </div>
              <ul className="space-y-2">
                {area.landmarks.map((landmark) => (
                  <li key={landmark} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {landmark}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="bg-green-50 rounded-xl p-6 animate-fadeInUp"
            >
              <div className="flex items-center mb-4">
                <GraduationCap className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="font-bold text-gray-900">Schools We Serve</h3>
              </div>
              <ul className="space-y-2">
                {area.schools.map((school) => (
                  <li key={school} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {school}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Class Options */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biology Tuition Options for {area.name} Students
            </h2>
            <p className="text-lg text-gray-600">All boards covered - CBSE, ICSE, State</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {classOptions.map((option, index) => (
              <div
                key={option.class}
                className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInUp"
              >
                <div className="bg-[#4a5d4a] text-white p-4">
                  <h3 className="text-xl font-bold">{option.class}</h3>
                  <p className="text-sm opacity-90">{option.duration}</p>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-green-600 mb-4">{option.fee}</div>
                  <ul className="space-y-2 mb-4 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Complete NCERT Coverage
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Board Exam Focus
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      NEET Foundation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Weekly Tests
                    </li>
                  </ul>
                  <Link href="/demo-booking">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Enroll Now</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 md:py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Students from {area.name} Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Expert AIIMS/JIPMER faculty',
              'All boards - CBSE, ICSE, State',
              'NEET foundation from Class 9',
              'Small batch of 15-20 students',
              'Weekly tests & assessments',
              'Practical lab sessions',
              'Doubt clearing sessions',
              'Parent-teacher meetings',
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-fadeInUp"
              >
                <CheckCircle className="w-6 h-6 text-yellow-300 mr-3 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 via-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Biology Excellence Journey from {area.name}!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join students from {area.name} who scored 95%+ in boards. Book your free demo today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/biology-tuition-south-delhi">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Explore Other Areas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schema - Using JSON.stringify with static data from server props (safe, no user input) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: `Cerebrum Biology Academy - Biology Tuition ${area.name}`,
            description: `Best biology tuition in ${area.name} for Classes 9-12. CBSE, ICSE & State Boards. NEET foundation. Expert faculty from AIIMS/JIPMER.`,
            url: `https://cerebrumbiologyacademy.com/biology-tuition-south-delhi/${areaSlug}`,
            telephone: '+91-88264-44334',
            address: {
              '@type': 'PostalAddress',
              addressLocality: area.name,
              addressRegion: 'South Delhi',
              postalCode: area.pincode,
              addressCountry: 'IN',
            },
            areaServed: {
              '@type': 'City',
              name: area.name,
            },
            sameAs: [
              'https://www.facebook.com/cerebrumbiologyacademy',
              'https://www.instagram.com/cerebrumbiologyacademy',
              'https://www.youtube.com/@cerebrumbiologyacademy',
              'https://www.youtube.com/@drshekharcsingh',
            ],
          }),
        }}
      />
    </div>
  )
}
