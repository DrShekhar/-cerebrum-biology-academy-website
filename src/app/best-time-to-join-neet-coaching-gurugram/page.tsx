import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ArrowRight, Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Time to Join NEET Coaching 2025 | April vs July | Gurugram',
  description:
    'When is the best time to join NEET coaching? April start vs July batch comparison. Month-wise joining guide for Class 11, 12, and droppers. Call 88264-44334!',
  keywords: [
    'best time to join neet coaching',
    'when to join neet coaching',
    'neet coaching joining time',
    'april batch vs july batch neet',
    'neet coaching admission 2025',
    'when to start neet coaching gurugram',
  ],
  openGraph: {
    title: 'Best Time to Join NEET Coaching 2025',
    description: 'April vs July batch comparison and month-wise joining guide.',
    url: 'https://cerebrumbiologyacademy.com/best-time-to-join-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-time-to-join-neet-coaching-gurugram',
  },
}

const joiningWindows = [
  {
    period: 'April-May',
    status: 'Best Time',
    color: 'green',
    for: 'Class 11 & Fresh Droppers',
    advantages: ['Full syllabus coverage', 'Fresh batch, same pace as peers', 'Maximum preparation time', 'Early bird discounts'],
  },
  {
    period: 'June-July',
    status: 'Good Time',
    color: 'blue',
    for: 'Late Starters',
    advantages: ['Most batches still fresh', 'Can catch up with effort', 'Summer holidays available', 'Second intake discounts'],
  },
  {
    period: 'August-October',
    status: 'Challenging',
    color: 'orange',
    for: 'Mid-Year Joiners',
    advantages: ['Special catch-up batches', 'More focused preparation', 'Clear about commitment', 'Some topics self-covered'],
  },
  {
    period: 'November-January',
    status: 'For Specific Cases',
    color: 'red',
    for: 'Post-Board Exam Students',
    advantages: ['Intensive revision batches', 'Focus on weak areas', 'Mock test practice', 'Last chance optimization'],
  },
]

const monthlyRecommendations = [
  { month: 'April', recommendation: 'Ideal for 2-year program (Class 11 start)', urgency: 'High' },
  { month: 'May', recommendation: 'Still excellent for fresh start', urgency: 'High' },
  { month: 'June', recommendation: 'Good - summer batches begin', urgency: 'Medium' },
  { month: 'July', recommendation: 'Last chance for regular batches', urgency: 'Medium' },
  { month: 'August', recommendation: 'Join crash/special batches', urgency: 'Medium' },
  { month: 'September', recommendation: 'Consider 1-year program if Class 12', urgency: 'Low' },
  { month: 'October', recommendation: 'Focus on test series + selective coaching', urgency: 'Low' },
  { month: 'November', recommendation: 'Revision batches only', urgency: 'Low' },
  { month: 'December', recommendation: 'Mock tests + doubt sessions', urgency: 'Low' },
  { month: 'January', recommendation: 'Final revision support', urgency: 'Low' },
  { month: 'February', recommendation: 'Exam preparation mode', urgency: 'Low' },
  { month: 'March', recommendation: 'Last-minute tips & tricks', urgency: 'Low' },
]

const faqs = [
  {
    question: 'Is April or July better to join NEET coaching?',
    answer: 'April is better - you get 3 extra months and start with fresh batch. July joiners can catch up but need extra effort. For Class 11 students, April start is strongly recommended.',
  },
  {
    question: 'Can I join NEET coaching in October?',
    answer: 'Yes, but only for special batches like crash courses or weekend programs. Regular batches would have covered 40-50% syllabus by then. Better option: Join test series + selective doubt classes.',
  },
  {
    question: 'When do NEET coaching admissions open?',
    answer: 'Most institutes open admissions in March for April batches. Some have year-round rolling admissions. We accept students throughout the year with appropriate batch matching.',
  },
  {
    question: 'Should droppers join immediately after results?',
    answer: 'Take 1-2 weeks to analyze your attempt, identify weak areas, then join. April-May joining gives full year. Joining in June-July also works if you have clear strategy.',
  },
  {
    question: 'Is it too late to join in Class 12?',
    answer: 'Not too late! 1-year programs are designed for Class 12 students. Join by June-July for best results. Even August joining can work with intensive effort.',
  },
]

export default function BestTimeToJoinNEETCoaching() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <section className="bg-gradient-to-r from-sky-700 to-sky-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-sky-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Calendar className="w-4 h-4" />
              Admission Guide 2025
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Best Time to Join NEET Coaching</h1>
            <p className="text-xl text-sky-100 mb-8">Month-wise guide for maximum preparation benefit</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 border-l-4 border-sky-600 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold text-sky-900 mb-3">Quick Answer</h2>
              <p className="text-lg text-sky-800">
                <strong>Best time: April-May</strong> (start of academic year). This gives maximum preparation time and you start with fresh batch. However, <strong>July joining is still good</strong> - you can catch up. After September, consider crash courses or test series instead of full programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Joining Windows Explained</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {joiningWindows.map((window, index) => (
              <div key={index} className={`bg-white p-6 rounded-xl shadow-lg border-t-4 ${
                window.color === 'green' ? 'border-green-500' :
                window.color === 'blue' ? 'border-blue-500' :
                window.color === 'orange' ? 'border-orange-500' :
                'border-red-500'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{window.period}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    window.color === 'green' ? 'bg-green-100 text-green-700' :
                    window.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                    window.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>{window.status}</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">Best for: {window.for}</p>
                <ul className="space-y-2">
                  {window.advantages.map((adv, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Month-by-Month Guide</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6">
              {monthlyRecommendations.map((item, index) => (
                <div key={index} className={`flex items-center justify-between py-3 ${index !== monthlyRecommendations.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div>
                    <span className="font-bold">{item.month}</span>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.urgency === 'High' ? 'bg-green-100 text-green-700' :
                    item.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.urgency} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-amber-900 mb-2">Common Mistakes to Avoid</h2>
                <ul className="space-y-2 text-amber-800">
                  <li>• <strong>Waiting for "perfect time"</strong> - Start now with what you have</li>
                  <li>• <strong>Joining multiple institutes</strong> - One good institute is enough</li>
                  <li>• <strong>Late joining without plan</strong> - Have catch-up strategy ready</li>
                  <li>• <strong>Ignoring batch matching</strong> - Join batch appropriate to your level</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Batch Schedule 2025</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center border-2 border-green-500">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Enrolling Now</span>
                <h3 className="font-bold mt-4 mb-2">April Batch</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">2-Year Program</p>
                <p className="text-sm text-gray-600">Starts: April 1, 2025</p>
                <p className="text-sm text-gray-500">For Class 11 entrants</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Coming Soon</span>
                <h3 className="font-bold mt-4 mb-2">July Batch</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">1-Year Program</p>
                <p className="text-sm text-gray-600">Starts: July 1, 2025</p>
                <p className="text-sm text-gray-500">For Class 12 students</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Rolling Admission</span>
                <h3 className="font-bold mt-4 mb-2">Crash Course</h3>
                <p className="text-3xl font-bold text-orange-600 mb-2">3-4 Months</p>
                <p className="text-sm text-gray-600">Multiple starts</p>
                <p className="text-sm text-gray-500">For late joiners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className="text-sky-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-sky-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Wait - Start Your Journey Today</h2>
          <p className="text-xl text-sky-100 mb-8">Early bird discount available for April batch. Limited seats.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-sky-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/free-neet-demo-class-gurugram" className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
              Book Free Demo<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Best Time to Join NEET Coaching',
        description: 'Month-wise guide for joining NEET coaching',
        author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        publisher: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        datePublished: '2025-01-01',
        dateModified: '2025-01-26',
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      }) }} />
    </div>
  )
}
