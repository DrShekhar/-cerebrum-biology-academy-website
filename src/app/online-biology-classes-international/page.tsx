'use client'

import Link from 'next/link'
import {
  Users,
  Trophy,
  Star,
  Phone,
  Play,
  Globe,
  GraduationCap,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'
import { internationalCurricula } from '@/lib/onlineClasses/internationalData'

export default function InternationalBiologyClassesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy - International',
            description:
              'Online biology classes for international curricula including A-Level, IB, AP, and IGCSE',
            url: 'https://cerebrumbiologyacademy.com/online-biology-classes-international',
            areaServed: 'Worldwide',
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <div
            className="max-w-4xl animate-fadeInUp"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <Globe className="h-4 w-4" />
              12,000+ International Students
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Online Biology Classes for International Curricula
            </h1>
            <p className="mb-8 text-xl text-indigo-100">
              A-Level, IB, AP, IGCSE - Expert tutoring for global students from India and abroad
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/demo-booking"
                className="flex items-center gap-2 rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-black shadow-lg transition hover:bg-yellow-400"
              >
                <Play className="h-5 w-5" />
                Book Free Demo Class
              </Link>
              <a
                href="tel:+918826444334"
                className="flex items-center gap-2 rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                Call: +91 88264 44334
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Users, value: '12,000+', label: 'International Students' },
              { icon: Globe, value: '50+', label: 'Countries Served' },
              { icon: Trophy, value: '95%', label: 'Pass Rate' },
              { icon: Star, value: '4.9/5', label: 'Student Rating' },
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 text-center shadow-lg animate-fadeInUp"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-indigo-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curricula Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Choose Your Curriculum</h2>
            <p className="text-lg text-gray-600">
              Expert biology tutoring for international boards
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {internationalCurricula.map((curriculum, index) => (
              <div
                key={curriculum.slug}
                className="overflow-hidden rounded-2xl bg-white shadow-xl animate-fadeInUp"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">{curriculum.name} Biology</h3>
                      <p className="text-indigo-100">{curriculum.fullName}</p>
                    </div>
                    <GraduationCap className="h-12 w-12 opacity-50" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {curriculum.studentCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      {curriculum.countries.length}+ Countries
                    </span>
                  </div>
                  <p className="mb-4 text-gray-600">{curriculum.examBoard}</p>
                  <ul className="mb-6 space-y-2">
                    {curriculum.syllabusFocus.slice(0, 3).map((focus, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        {focus}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/online-biology-classes-international/${curriculum.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Explore {curriculum.name} Classes
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Why International Students Choose Us
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Global Timezone Support',
                desc: 'Live classes scheduled for IST, GMT, EST, and PST friendly timings. 24/7 recorded lectures.',
              },
              {
                title: 'Board-Specific Experts',
                desc: 'Teachers trained in Cambridge, IB, and College Board curricula with examiner insights.',
              },
              {
                title: 'NEET Bridge Modules',
                desc: 'Optional NCERT bridge courses for students also preparing for Indian medical entrance.',
              },
              {
                title: 'Past Paper Mastery',
                desc: '10+ years of past papers analyzed. Learn examiner expectations and marking schemes.',
              },
              {
                title: 'IA/EE/Practical Support',
                desc: 'Complete support for IB Internal Assessment, Extended Essay, and practical endorsements.',
              },
              {
                title: 'University Application Help',
                desc: 'UCAS, Common App, and worldwide university application support included.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-lg animate-fadeInUp"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">Also Available</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/online-biology-classes-cbse"
              className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200"
            >
              CBSE Online Classes
            </Link>
            <Link
              href="/online-biology-classes-icse"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              ICSE Online Classes
            </Link>
            <Link
              href="/online-biology-classes-nri"
              className="rounded-lg bg-orange-100 px-4 py-2 text-orange-700 transition hover:bg-orange-200"
            >
              NRI Students
            </Link>
            <Link
              href="/online-biology-classes"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              All Online Classes
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="mb-4 text-3xl font-bold">Join 12,000+ International Students</h2>
            <p className="mb-8 text-xl text-indigo-100">
              Expert biology tutoring for A-Level, IB, AP, and IGCSE from anywhere in the world
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo-booking"
                className="flex items-center gap-2 rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-black shadow-lg transition hover:bg-yellow-400"
              >
                <Play className="h-5 w-5" />
                Book Free Demo Class
              </Link>
              <a
                href="tel:+918826444334"
                className="flex items-center gap-2 rounded-lg border-2 border-white px-8 py-3 font-semibold transition hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                Call: +91 88264 44334
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
