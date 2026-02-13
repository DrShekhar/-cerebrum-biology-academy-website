'use client'

import Link from 'next/link'
import {
  Users,
  Trophy,
  CheckCircle,
  Star,
  Video,
  Phone,
  Laptop,
  Wifi,
  BookOpen,
  GraduationCap,
  Play,
  MessageCircle,
  MapPin,
  AlertCircle,
} from 'lucide-react'
import { cities, getCityBySlug } from '@/lib/onlineClasses/cityData'
import { notFound } from 'next/navigation'
import { use } from 'react'

const onlineFeatures = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    desc: 'Real-time sessions with two-way audio/video. Ask questions, get instant answers.',
  },
  {
    icon: Play,
    title: '500+ Recorded Lectures',
    desc: 'HD quality video library accessible 24/7. Learn at your own pace.',
  },
  {
    icon: MessageCircle,
    title: 'Doubt Resolution',
    desc: 'Dedicated doubt sessions. Get your queries resolved within 24 hours.',
  },
  {
    icon: BookOpen,
    title: 'Digital Study Material',
    desc: 'Comprehensive PDF notes, diagrams, and flowcharts for quick revision.',
  },
  {
    icon: Laptop,
    title: 'Multi-Device Access',
    desc: 'Learn on laptop, tablet, or smartphone. Seamless sync across devices.',
  },
  {
    icon: Wifi,
    title: 'Low Bandwidth Mode',
    desc: 'Works on 2 Mbps. Offline download option for recorded lectures.',
  },
]

export default function CityOnlineBiologyPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = use(params)
  const city = getCityBySlug(resolvedParams.city)

  if (!city) {
    notFound()
  }

  const faqs = [
    {
      question: `Are online biology classes effective for ${city.name} students?`,
      answer: `Yes! Our online biology classes are highly effective for ${city.name} students. With ${city.studentCount} students already enrolled from ${city.name}, our 98% success rate proves that online learning works. You get AIIMS-trained faculty, live interactive sessions, and personalized attention - often better than local coaching centers.`,
    },
    {
      question: `What is the fee for online biology classes in ${city.name}?`,
      answer: `Our online biology classes cost ₹35,000 to ₹60,000 annually - significantly lower than local ${city.name} coaching which can cost ₹80,000 to ₹1,50,000. This includes live classes, 500+ recorded lectures, study material, test series, and doubt support.`,
    },
    {
      question: `How do online classes compare to ${city.name} coaching centers?`,
      answer: `Our online classes offer several advantages over local ${city.name} coaching: no commute time (save 2-3 hours daily), same AIIMS faculty at lower cost, smaller batch sizes (max 25 vs 100+), and unlimited revision through recorded lectures. Many ${city.name} students have switched to online after comparing results.`,
    },
    {
      question: `What timing options are available for ${city.name} students?`,
      answer: `We offer multiple batch timings to suit ${city.name} students: Morning batches (6-8 AM), After-school batches (4-6 PM), and Evening batches (7-9 PM). Weekend intensive classes are also available for students with busy weekday schedules.`,
    },
    {
      question: `Can ${city.name} students get offline study material?`,
      answer: `Yes! While all study material is available digitally, we also courier printed material to ${city.name} addresses. This includes comprehensive notes, practice question banks, and NEET previous year papers with solutions.`,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: `Online Biology Classes in ${city.name}`,
            description: `Comprehensive online biology classes for ${city.name} students - Class 9-12 and NEET preparation`,
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            courseMode: 'online',
            educationalLevel: 'High School',
            areaServed: {
              '@type': 'City',
              name: city.name,
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <div
            className="max-w-4xl animate-fadeInUp"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <MapPin className="h-4 w-4" />
              {city.studentCount} Students from {city.name}
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Online Biology Classes in {city.name}
            </h1>
            <p className="mb-8 text-xl text-green-100">{city.heroSubtitle}</p>
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
              { icon: Users, value: city.studentCount, label: `${city.name} Students` },
              { icon: Trophy, value: '98%', label: 'Success Rate' },
              { icon: Video, value: '500+', label: 'Video Hours' },
              { icon: Star, value: '4.9/5', label: 'Student Rating' },
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 text-center shadow-lg animate-fadeInUp"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-green-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Challenges */}
      <section className="bg-red-50 py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Challenges {city.name} Students Face with Offline Coaching
            </h2>
            <p className="text-lg text-gray-600">
              Why smart {city.name} NEET aspirants are switching to online
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {city.localChallenges.map((challenge, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-lg animate-fadeInUp"
              >
                <AlertCircle className="mt-1 h-6 w-6 flex-shrink-0 text-red-500" />
                <p className="text-gray-700">{challenge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Online Solution */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Why Online Classes Work Better for {city.name}
            </h2>
            <p className="text-lg text-gray-600">The smart solution for {city.state} students</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {city.whyOnline.map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl bg-green-50 p-6 shadow-lg animate-fadeInUp"
              >
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                <p className="text-gray-700">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Schools */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">{city.name} Schools We Serve</h2>
            <p className="text-lg text-gray-600">
              Students from these top {city.name} schools trust us
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {city.topSchools.map((school, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg animate-fadeInUp"
              >
                <GraduationCap className="h-6 w-6 text-green-600" />
                <span className="font-medium text-gray-800">{school}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">What {city.name} Students Get</h2>
            <p className="text-lg text-gray-600">
              Complete online learning ecosystem for NEET success
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {onlineFeatures.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="mb-4 h-10 w-10 text-green-600" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div
            className="mb-12 text-center animate-fadeInUp"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">FAQs for {city.name} Students</h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-lg animate-fadeInUp"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">
            Online Biology Classes in Other Cities
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {cities
              .filter((c) => c.slug !== city.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/online-biology-classes-in/${c.slug}`}
                  className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="mb-4 text-3xl font-bold">
              Join {city.studentCount} {city.name} Students Learning Online
            </h2>
            <p className="mb-8 text-xl text-green-100">
              Start your NEET journey with India&apos;s best online biology classes
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
