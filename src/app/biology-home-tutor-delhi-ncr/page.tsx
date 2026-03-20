import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/seo'
import {
  Phone,
  MessageCircle,
  GraduationCap,
  Users,
  Trophy,
  Video,
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Shield,
  BarChart3,
  FileText,
  Headphones,
  AlertTriangle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: "Biology Home Tutor in Delhi NCR? Try This Better Alternative | ₹4K/Month",
  description:
    'Searching for a biology home tutor in Delhi NCR? Get AIIMS faculty, test series, recordings & 19,000+ MCQs at ₹4K/month — less than most home tutors charge. Call 88264-44334.',
  keywords: [
    'biology home tutor delhi',
    'biology home tutor noida',
    'biology home tutor gurugram',
    'biology home tutor gurgaon',
    'biology home tutor faridabad',
    'biology home tutor rohini',
    'biology home tuition delhi ncr',
    'private biology tutor delhi',
    'biology tutor at home',
    'home biology coaching',
  ],
  openGraph: {
    title: 'Biology Home Tutor in Delhi NCR? Try This Better Alternative',
    description:
      'AIIMS faculty, test series, recordings & 19,000+ MCQs at ₹4K/month. Better than most home tutors.',
    type: 'article',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-home-tutor-delhi-ncr',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Home Tutor Delhi NCR? Better Alternative at ₹4K/Month',
    description: 'AIIMS faculty, test series, 19,000+ MCQs. Better than home tutors.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-home-tutor-delhi-ncr',
  },
}

const homeTutorProblems = [
  {
    icon: AlertTriangle,
    title: 'Inconsistent Quality',
    desc: 'No way to verify if a tutor actually knows NEET-level biology. Many teach from guides without deep understanding.',
  },
  {
    icon: Shield,
    title: 'No Verification',
    desc: 'JustDial and UrbanClap list anyone. No background checks, no result verification, no accountability.',
  },
  {
    icon: FileText,
    title: 'No Test Series',
    desc: 'Home tutors teach chapters but rarely provide structured mock tests or performance analytics.',
  },
  {
    icon: BarChart3,
    title: 'Expensive (₹5-8K/month)',
    desc: 'A decent home tutor charges ₹500-800 per hour. At 3 sessions a week, that is ₹6,000-9,600/month for biology alone.',
  },
  {
    icon: XCircle,
    title: 'Cancellations and No-Shows',
    desc: 'Tutors cancel last-minute, skip sessions during exams, or leave mid-year for a better-paying student.',
  },
]

const comparisonRows = [
  { feature: 'Faculty', tutor: 'Varies widely, often unverified', cerebrum: 'AIIMS-trained, 10+ years experience' },
  { feature: 'Batch Size', tutor: '1 student (isolated learning)', cerebrum: '15 students (peer learning + competition)' },
  { feature: 'Monthly Cost', tutor: '₹5,000-8,000/month', cerebrum: '₹4,000/month (₹48K/year)' },
  { feature: 'Test Series', tutor: 'Rarely included', cerebrum: 'Weekly tests + full mock NEET exams' },
  { feature: 'Study Material', tutor: 'Depends on tutor', cerebrum: 'Structured notes + 19,000+ MCQ bank' },
  { feature: 'Recorded Lectures', tutor: 'Not available', cerebrum: 'Every class recorded for revision' },
  { feature: 'Doubt Clearing', tutor: 'Only during session', cerebrum: 'WhatsApp doubt support 6 days/week' },
  { feature: 'NEET Focus', tutor: 'Often board-focused', cerebrum: '100% NEET-oriented curriculum' },
  { feature: 'Board Prep', tutor: 'Yes, but generic', cerebrum: 'Integrated board + NEET approach' },
  { feature: 'Results Tracking', tutor: 'No analytics', cerebrum: 'AI-powered performance dashboard' },
]

const cityAdvice = [
  {
    city: 'Noida',
    advice: 'No physical center nearby, but our online program gives you the same AIIMS faculty live from home. Save the commute, keep the quality.',
    link: '/neet-coaching-noida',
    cta: 'Join Online from Noida',
  },
  {
    city: 'Gurugram',
    advice: 'Visit our Gurugram center at M2K Corporate Park, Sector 51. Just 10 minutes from HUDA City Centre Metro.',
    link: '/neet-coaching-gurugram',
    cta: 'Visit Gurugram Center',
  },
  {
    city: 'South Delhi',
    advice: 'Our South Extension center (D 35, Part 2) is walking distance from South Extension Metro. GK, Defence Colony, Hauz Khas students attend here.',
    link: '/neet-coaching-delhi',
    cta: 'Visit South Extension Center',
  },
  {
    city: 'Rohini / North Delhi',
    advice: 'Our Rohini center at Vikas Surya Tower, DC Chowk is right next to Rohini West Metro. Pitampura and Shalimar Bagh students prefer this.',
    link: '/neet-coaching-delhi',
    cta: 'Visit Rohini Center',
  },
  {
    city: 'Faridabad',
    advice: 'Our Faridabad center at Huda Market, Sector 17 serves NIT, Ballabhgarh, and Greater Faridabad students.',
    link: '/neet-coaching-faridabad',
    cta: 'Visit Faridabad Center',
  },
  {
    city: 'Ghaziabad / East Delhi',
    advice: 'No center in Ghaziabad yet. Our online program is the best alternative — live classes, recordings, MCQ bank, and doubt support included.',
    link: '/book-free-demo',
    cta: 'Try Free Online Demo',
  },
]

const parentTestimonials = [
  {
    name: 'Mrs. Sharma',
    location: 'Dwarka, Delhi',
    text: 'We spent ₹7,000/month on a home tutor for 8 months. My daughter scored 280 in the mock. After switching to Cerebrum online, she scored 580 in NEET. The difference was the test series and structured approach.',
  },
  {
    name: 'Mr. Gupta',
    location: 'Noida Sector 62',
    text: 'Our home tutor was good at teaching chapters but never gave mock tests. My son had no idea how to manage time in the actual exam. Cerebrum fixed that with weekly timed tests.',
  },
  {
    name: 'Mrs. Verma',
    location: 'Gurugram, Sector 56',
    text: 'The home tutor cancelled 4 times in one month. We were paying ₹6,000 for unreliable service. Cerebrum has never missed a class in 14 months. The recordings are a bonus.',
  },
]

const tutorChecklistItems = [
  'Ask for their NEET score or qualification proof',
  'Request references from past students who cleared NEET',
  'Confirm they will provide a test series, not just chapter teaching',
  'Agree on a cancellation policy in writing',
  'Ask about their results — how many students cleared NEET last year?',
  'Compare the total monthly cost against structured coaching programs',
]

const faqs = [
  {
    q: 'What are biology home tutor fees in Delhi?',
    a: 'Most biology home tutors in Delhi charge ₹500-800 per hour. With 3 sessions per week, that is ₹6,000-9,600 per month for biology alone. Cerebrum Biology Academy offers AIIMS faculty, test series, recorded lectures, and 19,000+ MCQs at ₹4,000/month — with better results.',
  },
  {
    q: 'Is coaching better than a home tutor for NEET?',
    a: 'For NEET specifically, yes. NEET requires structured practice with MCQs, timed mock tests, and competitive environment — things a home tutor cannot provide. Coaching with small batches (15 students) gives you both personal attention and the competitive edge.',
  },
  {
    q: 'Biology home tuition vs online classes — which is better?',
    a: 'Online classes from a reputed institute beat home tuition for NEET preparation. You get expert faculty (not a random tutor), structured test series, recorded lectures for revision, and a peer group — all from home. The only advantage of home tuition is zero screen time, but NEET itself is offline.',
  },
  {
    q: 'How to find a verified biology tutor in Delhi NCR?',
    a: 'Ask for their NEET score or medical degree, check references from students who actually cleared NEET, and insist on a trial class. Or skip the search entirely — join Cerebrum where every faculty member is an AIIMS alumnus with verified credentials and a 98% success track record.',
  },
  {
    q: 'Who is the best biology tutor for Class 11 and 12 in Delhi NCR?',
    a: 'Dr. Shekhar C Singh (AIIMS alumnus, former Narayana Academic Head) at Cerebrum Biology Academy. 12+ years of experience, 67+ AIIMS selections, 15,000+ students coached. Available at 4 centers across Delhi NCR and online.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Biology Home Tutor in Delhi NCR — There\'s a Better Option',
  description:
    'Comparing biology home tutors with structured NEET coaching. Why Cerebrum Biology Academy at ₹4K/month outperforms most home tutors in Delhi NCR.',
  author: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  datePublished: '2026-03-20',
  dateModified: '2026-03-20',
  mainEntityOfPage: 'https://cerebrumbiologyacademy.com/biology-home-tutor-delhi-ncr',
}

export default function BiologyHomeTutorDelhiNCRPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-4">
        <BreadcrumbSchema
          items={[{ label: 'Biology Home Tutor Delhi NCR', isCurrentPage: true }]}
        />
      </div>

      <section className="bg-gradient-to-b from-purple-50 to-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Biology Home Tutor in Delhi NCR — There&apos;s a Better Option
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Before you hire a biology home tutor at ₹5,000-8,000/month, consider this: AIIMS
            faculty, weekly test series, recorded lectures, and 19,000+ MCQs — all at ₹4,000/month.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-purple-700"
            >
              <Phone className="h-5 w-5" />
              Call 88264-44334
            </Link>
            <Link
              href="/book-free-demo"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-purple-600 px-6 py-3 font-semibold text-purple-700 hover:bg-purple-50"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            The Home Tutor Problem
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Home tutors seem convenient, but for NEET preparation, they come with serious
            limitations.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeTutorProblems.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-red-100 bg-red-50/50 p-5"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 shrink-0 text-red-500" />
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            The Cerebrum Alternative
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Same personal attention as a home tutor (15-student batches) — plus everything a home
            tutor cannot offer.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: GraduationCap, text: 'AIIMS-trained faculty with verified credentials' },
              { icon: Users, text: '15-student batches for personal attention' },
              { icon: Trophy, text: 'Weekly test series + full NEET mock exams' },
              { icon: Video, text: 'Every lecture recorded for revision' },
              { icon: BookOpen, text: '19,000+ MCQ bank with analytics' },
              { icon: Headphones, text: 'WhatsApp doubt support 6 days/week' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-green-200 bg-white p-4"
              >
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <span className="text-sm font-medium text-slate-700">{item.text}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-semibold text-green-700">
            All at ₹4,000/month — less than most home tutors charge.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            Home Tutor vs Cerebrum — Side by Side
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-red-600">
                    Home Tutor
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-green-600">
                    Cerebrum Biology Academy
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{row.tutor}</td>
                    <td className="px-4 py-3 text-sm font-medium text-green-700">
                      {row.cerebrum}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            How It Works
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Book a Free Demo',
                desc: 'Attend a live class with our AIIMS faculty. No payment, no commitment.',
              },
              {
                step: '2',
                title: 'Choose Your Mode',
                desc: 'Online from home, offline at your nearest center, or hybrid — your choice.',
              },
              {
                step: '3',
                title: 'Start Learning',
                desc: 'Get instant access to live classes, recordings, MCQ bank, and doubt support.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/book-free-demo"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-purple-700"
            >
              Book Free Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            Looking for a Biology Home Tutor in Your City?
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cityAdvice.map((item) => (
              <div
                key={item.city}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-bold text-slate-900">
                  Biology Home Tutor in {item.city}?
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.advice}</p>
                <Link
                  href={item.link}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-800"
                >
                  {item.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-purple-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            What Parents Say
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Parents who switched from home tutors to Cerebrum
          </p>
          <div className="mt-8 space-y-6">
            {parentTestimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-lg border border-purple-200 bg-white p-5"
              >
                <p className="text-sm italic leading-relaxed text-slate-600">
                  &quot;{t.text}&quot;
                </p>
                <p className="mt-3 text-sm font-semibold text-slate-800">
                  — {t.name}, {t.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            Still Want a Home Tutor? Here&apos;s What to Check
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            We believe in honest advice. If you still prefer a home tutor, make sure you verify
            these things before hiring.
          </p>
          <div className="mt-8 space-y-3">
            {tutorChecklistItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg bg-slate-50 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">
            Or skip the research — try a{' '}
            <Link href="/book-free-demo" className="font-medium text-purple-600 underline">
              free demo class
            </Link>{' '}
            with Cerebrum and compare for yourself.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-900">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-purple-50 to-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Ready to Try the Better Alternative?
          </h2>
          <p className="mt-3 text-slate-600">
            One free demo class is all it takes. See the difference between a home tutor and
            structured NEET coaching with AIIMS faculty.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-purple-700"
            >
              <Phone className="h-5 w-5" />
              Call 88264-44334
            </Link>
            <Link
              href="https://wa.me/918826444334?text=Hi%2C%20I%20was%20looking%20for%20a%20biology%20home%20tutor.%20Please%20share%20details%20about%20Cerebrum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-teal-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </Link>
            <Link
              href="/book-free-demo"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-purple-600 px-6 py-3 font-semibold text-purple-700 hover:bg-purple-50"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-lg font-semibold text-slate-700">Related Pages</h2>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link href="/pricing" className="text-teal-600 underline hover:text-teal-800">
              Pricing
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/book-free-demo" className="text-teal-600 underline hover:text-teal-800">
              Book Free Demo
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/neet-biology-coaching-near-me"
              className="text-teal-600 underline hover:text-teal-800"
            >
              NEET Biology Coaching Near Me
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/best-neet-biology-tutor-delhi-ncr"
              className="text-teal-600 underline hover:text-teal-800"
            >
              Best NEET Biology Tutor Delhi NCR
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/biology-tuition-delhi"
              className="text-teal-600 underline hover:text-teal-800"
            >
              Biology Tuition Delhi
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/biology-tuition-noida"
              className="text-teal-600 underline hover:text-teal-800"
            >
              Biology Tuition Noida
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
