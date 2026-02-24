import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  MapPin,
  CheckCircle,
  Users,
  Clock,
  Video,
  ArrowRight,
  Monitor,
  Building,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Physics Wallah Alternative Noida | Offline Expert Biology',
  description:
    'Need offline alternative to Physics Wallah in Noida? Cerebrum: Real classroom experience, AIIMS faculty, 98% success rate. Better than video lectures. Call 99536-43938!',
  keywords: [
    'physics wallah alternative noida',
    'offline neet coaching noida',
    'pw alternative noida',
    'better than physics wallah',
    'pw vidyapeeth alternative',
    'real classroom neet coaching',
    'offline biology classes noida',
    'neet biology coaching noida',
    'physics wallah supplement noida',
  ],
  openGraph: {
    title: 'Physics Wallah Alternative Noida',
    description:
      'Want real classroom interaction instead of video lectures? Experience offline NEET biology coaching.',
    url: 'https://cerebrumbiologyacademy.com/physics-wallah-alternative-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/physics-wallah-alternative-noida',
  },
}

const comparisonData = [
  {
    feature: 'Teaching Mode',
    pw: 'Video lectures',
    cerebrum: 'Live offline classes',
    winner: 'cerebrum',
  },
  {
    feature: 'Doubt Resolution',
    pw: '24-48 hours wait',
    cerebrum: 'Instant in class',
    winner: 'cerebrum',
  },
  { feature: 'Batch Size', pw: '500+ per video', cerebrum: '25 students max', winner: 'cerebrum' },
  { feature: 'Annual Fee', pw: '₹5,000-15,000', cerebrum: '₹45,000-75,000', winner: 'pw' },
  { feature: 'Personal Attention', pw: 'None', cerebrum: 'Individual focus', winner: 'cerebrum' },
  {
    feature: 'Discipline/Structure',
    pw: 'Self-managed',
    cerebrum: 'Classroom discipline',
    winner: 'cerebrum',
  },
  {
    feature: 'Diagram Learning',
    pw: 'Limited (video)',
    cerebrum: 'Whiteboard + hands-on',
    winner: 'cerebrum',
  },
  {
    feature: 'Peer Learning',
    pw: 'Online forums',
    cerebrum: 'Real classmates',
    winner: 'cerebrum',
  },
]

const faqs = [
  {
    question: 'Why consider offline coaching over Physics Wallah?',
    answer:
      'Key differences: 1) Real classroom interaction vs passive video watching, 2) Instant doubt resolution vs waiting for replies, 3) Structured discipline vs self-study challenges, 4) Peer learning environment, 5) Regular assessments with immediate feedback. Online works for some, but many need offline structure.',
  },
  {
    question: 'How do Physics Wallah and Cerebrum compare for biology?',
    answer:
      'PW: Video-based, low-cost (₹5-15K), 500+ students in batch, doubt resolution in 24-48 hrs. Cerebrum: Live offline classes, ₹45-75K, 25 students max, doubts cleared instantly. For biology (visual subject with diagrams), offline teaching is significantly more effective.',
  },
  {
    question: 'Is Physics Wallah enough for NEET biology?',
    answer:
      "PW content is good but biology needs visual learning - diagrams, specimen study, hands-on understanding. Video lectures can't replace: 1) Whiteboard diagram explanations, 2) Instant doubt clearing, 3) Peer discussions, 4) Regular tests with personal feedback. Many PW students supplement with offline coaching.",
  },
  {
    question: "What if I can't afford both PW and offline coaching?",
    answer:
      'Options at Cerebrum: 1) Weekend-only batch: ₹35,000/year (use PW for weekdays), 2) Test series membership: ₹8,000/year, 3) Doubt-clearing sessions: ₹500/session, 4) Chapter-specific workshops: ₹2,000-3,000 per topic. Mix and match based on budget.',
  },
  {
    question: 'Why do PW students struggle with biology?',
    answer:
      'Common issues: 1) Passive watching ≠ active learning, 2) Diagram practice neglected in videos, 3) NCERT assertions need teacher explanation, 4) MCQ patterns need guided practice, 5) Motivation drops without classroom environment. Our 25-student batch solves these issues.',
  },
  {
    question: 'Can I use PW videos alongside Cerebrum classes?',
    answer:
      "Absolutely! Many students do this: 1) Attend Cerebrum for live teaching + doubts, 2) Revise using PW videos at home, 3) Use Cerebrum tests for assessment, 4) Best of both worlds approach. We don't restrict supplementary learning.",
  },
  {
    question: 'What about PW Vidyapeeth offline centers?',
    answer:
      'PW Vidyapeeth has offline centers but: 1) Very large batches (80-120 students), 2) Recent entrant - less track record, 3) Generic all-subject approach, 4) Fees similar to traditional coaching (₹80K-1.2L). Cerebrum offers biology specialization with 25-student batches at lower cost.',
  },
  {
    question: 'How to decide: PW online vs Cerebrum offline?',
    answer:
      "Choose PW if: Budget is tight (<₹20K), you have strong self-discipline, you don't need personal attention. Choose Cerebrum if: You need structured learning, you have doubt-heavy learning style, biology is your weak subject, you want guaranteed classroom discipline.",
  },
]

const pwProblems = [
  {
    problem: 'Passive Learning',
    description: 'Watching videos is not the same as active learning in a classroom',
    solution: 'Interactive live classes with Q&A',
  },
  {
    problem: 'Delayed Doubts',
    description: 'Wait 24-48 hours for doubt resolution in online forums',
    solution: 'Instant answers during or after class',
  },
  {
    problem: 'No Accountability',
    description: 'Easy to skip videos or fall behind without discipline',
    solution: 'Attendance tracking, regular tests, parent updates',
  },
  {
    problem: 'Diagram Difficulty',
    description: 'Biology diagrams are hard to learn from videos alone',
    solution: 'Whiteboard teaching with step-by-step diagram practice',
  },
]

export default function PhysicsWallahAlternativeNoida() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Physics Wallah Alternative in Noida
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Physics Wallah Alternative in Noida
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Want real classroom interaction instead of video lectures? Experience offline NEET
              biology coaching at Cerebrum.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+919953643938"
                className="bg-yellow-500 text-purple-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
              >
                <Phone className="w-5 h-5" />
                Call 99536-43938
              </a>
              <Link
                href="/neet-coaching-noida"
                className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 transition"
              >
                View All Courses
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Online vs Offline Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Building className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">Offline</div>
              <div className="text-gray-600">Real Classroom</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">25</div>
              <div className="text-gray-600">Max Batch Size</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">100+</div>
              <div className="text-gray-600">PW Supplements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Online vs Offline Visual */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Online Videos vs Real Classroom</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Monitor className="w-10 h-10 text-gray-500" />
                <h3 className="text-2xl font-bold text-gray-700">Physics Wallah Online</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-gray-400 mt-1" />
                  <span className="text-gray-600">Watch pre-recorded or live-streamed videos</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-1" />
                  <span className="text-gray-600">Post doubts, wait 24-48 hours for reply</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-400 mt-1" />
                  <span className="text-gray-600">500+ students watching same video</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400">📱</span>
                  <span className="text-gray-600">Study at home with distractions</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <span className="text-2xl font-bold text-gray-500">₹5,000-15,000/year</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl shadow-lg p-8 border-2 border-purple-400">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-10 h-10 text-purple-600" />
                <h3 className="text-2xl font-bold text-purple-700">Cerebrum Offline</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                  <span className="text-gray-700">Live teaching with real-time interaction</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                  <span className="text-gray-700">
                    Ask doubts instantly, get answers immediately
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                  <span className="text-gray-700">25 students max - personal attention</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                  <span className="text-gray-700">Focused classroom environment</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <span className="text-2xl font-bold text-purple-600">₹45,000-75,000/year</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PW Problems */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Common Problems with Video-Based Learning
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Why many PW students struggle with biology and seek offline coaching
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pwProblems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-red-600 mb-2">{item.problem}</h3>
                <p className="text-gray-500 mb-3">{item.description}</p>
                <div className="flex items-start gap-2 text-green-700 font-medium bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Cerebrum Solution: {item.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Physics Wallah vs Cerebrum: Feature Comparison
          </h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-purple-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">Physics Wallah</th>
                  <th className="px-6 py-4 text-center">Cerebrum</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{row.feature}</td>
                    <td
                      className={`px-6 py-4 text-center ${row.winner === 'pw' ? 'text-green-600 font-semibold' : ''}`}
                    >
                      {row.pw}
                      {row.winner === 'pw' && (
                        <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />
                      )}
                    </td>
                    <td
                      className={`px-6 py-4 text-center ${row.winner === 'cerebrum' ? 'text-green-600 font-semibold' : ''}`}
                    >
                      {row.cerebrum}
                      {row.winner === 'cerebrum' && (
                        <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Hybrid Approach */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Best of Both Worlds</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Many students use PW for revision while attending Cerebrum for core learning
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">₹35,000/year</div>
              <div className="font-semibold mb-2">Weekend Batch</div>
              <p className="text-sm text-gray-600">
                Use PW for weekday revision, attend Cerebrum on weekends for live teaching
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">₹8,000/year</div>
              <div className="font-semibold mb-2">Test Series</div>
              <p className="text-sm text-gray-600">
                Watch PW videos, take Cerebrum tests for assessment and feedback
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">₹500/session</div>
              <div className="font-semibold mb-2">Doubt Sessions</div>
              <p className="text-sm text-gray-600">
                Clear biology doubts one-on-one that PW forums couldn&apos;t answer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Center Location */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">Visit Our Noida Center</h2>
                <p className="text-gray-600 mb-4">
                  Experience a real classroom - something online can never replace.
                </p>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-semibold">B-45, Sector 62</p>
                    <p className="text-gray-600">Noida, UP 201301</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Near Sector 62 Metro Station (Blue Line)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-semibold">Batch Timings</p>
                    <p className="text-gray-600">Morning: 8 AM - 12 PM</p>
                    <p className="text-gray-600">Evening: 5 PM - 8 PM</p>
                    <p className="text-gray-600">Weekend: Sat-Sun 9 AM - 1 PM</p>
                  </div>
                </div>
                <a
                  href="tel:+919953643938"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Trial Class
                </a>
              </div>
              <div className="md:w-1/2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1234567890123!2d77.3649!3d28.628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSector%2062%2C%20Noida!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">
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
      <section className="py-16 bg-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Real Classroom Learning?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Book a free trial class. Experience what videos can never provide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919953643938"
              className="bg-yellow-500 text-purple-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call Now: 99536-43938
            </a>
            <Link
              href="/online-neet-classes-noida"
              className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
            >
              Online Option Also Available
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
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
    </div>
  )
}
