import { Metadata } from 'next'
import Link from 'next/link'

const PHONE = '88264-44334'
const WA_LINK = 'https://wa.me/918826444334?text=Hi%2C%20I%20want%20to%20join%20the%20online%20NEET%20Biology%20class'

export const metadata: Metadata = {
  title: 'Online NEET Biology Class | Only 15 Students | AIIMS Faculty | Live + Recorded',
  description:
    'Online NEET Biology class with only 15 students — not 5,000. AIIMS faculty, camera-on policy, instant doubt clearing, recordings. ₹48K/year. Call 88264-44334.',
  keywords:
    'online neet biology class, online biology class for neet, neet biology online coaching, online neet biology course, live neet biology class online, best online neet biology coaching, neet biology online tuition',
  openGraph: {
    title: 'Online NEET Biology Class | Only 15 Students | AIIMS Faculty | Live + Recorded',
    description:
      'Online NEET Biology class with only 15 students — not 5,000. AIIMS faculty, camera-on policy, instant doubt clearing, recordings. ₹48K/year.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/online-neet-biology-class',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online NEET Biology Class | Only 15 Students | AIIMS Faculty | Live + Recorded',
    description:
      'Online NEET Biology class with only 15 students — not 5,000. AIIMS faculty, camera-on policy, instant doubt clearing, recordings.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-biology-class',
  },
}

const faqs = [
  {
    q: 'Is online NEET coaching effective?',
    a: 'Online coaching is highly effective when done right. The key difference is batch size. With 5,000 students, you are watching a lecture. With 15 students at Cerebrum, you are in a classroom — teacher calls you by name, clears your doubts live, and tracks your progress weekly. Our online students score on par with offline students.',
  },
  {
    q: 'How is Cerebrum different from PW, Vedantu, or Unacademy?',
    a: 'Batch size. PW has 50,000 students per batch, Vedantu 200, Unacademy 500. Cerebrum has 15. We enforce camera-on policy, teacher calls students by name, doubts are cleared during class (not via chatbot), and parents get weekly progress reports. It is a classroom experience, not a YouTube video.',
  },
  {
    q: 'What if I miss a class?',
    a: 'Every live class is recorded in HD and available within 2 hours. You can re-watch unlimited times. But our attendance rate is 94% because when a teacher calls you by name, you show up.',
  },
  {
    q: 'How are doubts cleared in online classes?',
    a: 'During class: raise hand, unmute, ask directly — teacher responds immediately. After class: WhatsApp doubt support till 10 PM with photo/voice note explanations. Weekend: dedicated doubt-clearing session every Saturday.',
  },
  {
    q: 'Can parents track their child\'s progress?',
    a: 'Yes. Parents receive a weekly WhatsApp report with test scores, attendance, doubt frequency, and teacher remarks. You can also access the parent dashboard anytime to view performance trends and upcoming tests.',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Online NEET Biology Class',
          item: 'https://cerebrumbiologyacademy.com/online-neet-biology-class',
        },
      ],
    },
  ],
}

export default function OnlineNEETBiologyClassPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-400">
            Online NEET Biology Class
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Online NEET Biology Class — But With Only{' '}
            <span className="text-yellow-400">15 Students</span>, Not 5,000
          </h1>
          <p className="mb-8 text-lg text-slate-300">Same online format. Radically different results.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book-free-demo"
              className="rounded-lg bg-yellow-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
            >
              Join FREE Live Demo Class
            </Link>
            <a
              href={`tel:+91${PHONE.replace(/-/g, '')}`}
              className="rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white hover:text-slate-900"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Big Platform Problem */}
      <section className="bg-red-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-10 text-3xl font-bold text-slate-900">
            Who Gets Their Doubt Cleared?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'PW', students: '50,000', color: 'border-red-300 bg-red-50' },
              { name: 'Vedantu', students: '200', color: 'border-red-200 bg-red-50' },
              { name: 'Unacademy', students: '500', color: 'border-red-200 bg-red-50' },
              { name: 'Cerebrum', students: '15', color: 'border-green-300 bg-green-50' },
            ].map((p) => (
              <div key={p.name} className={`rounded-xl border-2 p-6 ${p.color}`}>
                <p className="text-2xl font-bold text-slate-900">{p.name}</p>
                <p className="mt-2 text-3xl font-bold text-slate-700">{p.students}</p>
                <p className="text-sm text-slate-500">students/batch</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Cerebrum vs Big Platforms — Feature Comparison
          </h2>
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-4 py-4">Feature</th>
                  <th className="px-4 py-4 text-center">Cerebrum</th>
                  <th className="px-4 py-4 text-center">PW</th>
                  <th className="px-4 py-4 text-center">Vedantu</th>
                  <th className="px-4 py-4 text-center">Unacademy</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Batch Size', '15', '50,000', '200', '500'],
                  ['Faculty', 'AIIMS Alumni', 'Mixed', 'Mixed', 'Mixed'],
                  ['Monthly Fee', '₹4,000', '₹2,500', '₹5,000', '₹6,000'],
                  ['Live Doubt Clearing', 'Instant', 'Chat only', 'Limited', 'Chat only'],
                  ['Recordings', 'Same day', 'Yes', 'Yes', 'Yes'],
                  ['Weekly Tests', 'Yes + analysis', 'Yes', 'Yes', 'Yes'],
                  ['Camera Policy', 'Mandatory ON', 'Off', 'Optional', 'Off'],
                  ['Parent Updates', 'Weekly WhatsApp', 'No', 'Monthly', 'No'],
                ].map(([feature, cerebrum, pw, vedantu, unacademy]) => (
                  <tr key={feature} className="border-b border-slate-100">
                    <td className="px-4 py-3 font-medium text-slate-900">{feature}</td>
                    <td className="px-4 py-3 text-center font-semibold text-green-600">{cerebrum}</td>
                    <td className="px-4 py-3 text-center text-slate-500">{pw}</td>
                    <td className="px-4 py-3 text-center text-slate-500">{vedantu}</td>
                    <td className="px-4 py-3 text-center text-slate-500">{unacademy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* A Day in Our Online Class */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            A Day in Our Online Class
          </h2>
          <div className="space-y-4">
            {[
              { time: '5:00 PM', event: 'Login and attendance — camera ON', icon: '&#128247;' },
              { time: '5:05 PM', event: 'Concept teaching with NCERT + beyond-NCERT depth', icon: '&#128218;' },
              { time: '5:30 PM', event: 'Doubt clearing — teacher calls you by name', icon: '&#9995;' },
              { time: '6:00 PM', event: 'Live MCQ quiz — instant leaderboard', icon: '&#127942;' },
              { time: '6:15 PM', event: 'Homework assignment for the day', icon: '&#128221;' },
              { time: '6:30 PM', event: 'Class ends — recording available in 2 hours', icon: '&#127909;' },
              { time: 'Till 10 PM', event: 'WhatsApp doubt support — send photo or voice note', icon: '&#128172;' },
            ].map((item) => (
              <div key={item.time} className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-md">
                <span
                  className="text-2xl"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
                <div>
                  <p className="text-sm font-bold text-teal-600">{item.time}</p>
                  <p className="text-slate-700">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Online = More Study Time + More Savings
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-green-50 p-8 text-center shadow-lg">
              <p className="text-4xl font-bold text-green-600">₹3-5K</p>
              <p className="mt-2 text-lg text-slate-700">saved per month on commute</p>
              <p className="text-sm text-slate-500">No auto, no metro, no fuel costs</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-8 text-center shadow-lg">
              <p className="text-4xl font-bold text-blue-600">750 hours</p>
              <p className="mt-2 text-lg text-slate-700">extra study time per year</p>
              <p className="text-sm text-slate-500">2-3 hrs/day commute x 300 days = 750 hours back</p>
            </div>
          </div>
        </div>
      </section>

      {/* Camera-On Policy */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            We Do Not Let Students Hide
          </h2>
          <p className="mb-6 text-lg text-slate-300">
            Camera ON is mandatory. The teacher calls you by name. If you zone out, you get called on. This is a classroom, not a YouTube stream.
          </p>
          <div className="rounded-xl bg-slate-800 p-8">
            <p className="mb-2 text-lg font-semibold text-yellow-400">Parent Dashboard Preview</p>
            <p className="text-slate-300">
              Track attendance, test scores, doubt frequency, teacher remarks, and chapter-wise progress — all in real-time from your phone.
            </p>
          </div>
        </div>
      </section>

      {/* Scarcity */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-14 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-3 text-3xl font-bold">Only 15 Seats Per Batch</h2>
          <p className="mb-2 text-5xl font-bold">12/15 Filled</p>
          <p className="mb-6 text-lg">Current batch is almost full. Next batch starts in April 2026.</p>
          <Link
            href="/book-free-demo"
            className="inline-block rounded-lg bg-yellow-400 px-10 py-4 text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
          >
            Reserve Your Seat — 3 Left
          </Link>
        </div>
      </section>

      {/* Free Trial */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Join a REAL Live Class — Not a Recorded Demo
          </h2>
          <p className="mb-8 text-lg text-slate-600">
            Sit in an actual class with real students. See the teacher interact, clear doubts, and run quizzes. Experience the difference in 90 minutes.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book-free-demo"
              className="rounded-lg bg-yellow-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
            >
              Join Free Live Class
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-green-400"
            >
              WhatsApp to Book
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl bg-white shadow-md">
                <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-slate-900">
                  {faq.q}
                </summary>
                <p className="px-6 pb-5 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-4 text-3xl font-bold">Ready for an Online Class That Actually Works?</h2>
          <p className="mb-8 text-lg text-slate-300">15 students. 1 AIIMS teacher. Your child gets noticed.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`tel:+91${PHONE.replace(/-/g, '')}`}
              className="rounded-lg bg-yellow-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
            >
              Call {PHONE}
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-green-400"
            >
              WhatsApp Us
            </a>
            <Link
              href="/book-free-demo"
              className="rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white hover:text-slate-900"
            >
              Book Free Demo
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            <Link href="/pricing" className="underline hover:text-white">
              View full pricing
            </Link>
          </p>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-3 shadow-2xl md:hidden">
        <div className="flex items-center justify-center gap-3">
          <a
            href={`tel:+91${PHONE.replace(/-/g, '')}`}
            className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-900"
          >
            Call {PHONE}
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-green-500 px-5 py-3 text-sm font-bold text-white"
          >
            WhatsApp
          </a>
          <Link href="/book-free-demo" className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white">
            Free Demo
          </Link>
        </div>
      </div>
    </>
  )
}
