import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  BookOpen,
  Users,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Weekend Batch Faridabad 2026 | Saturday-Sunday Classes | Cerebrum',
  description:
    'Join NEET weekend batch in Faridabad - Saturday & Sunday intensive classes for school students. Complete syllabus coverage. Sector 17. Call 88264-44334!',
  keywords: [
    'neet weekend batch faridabad',
    'neet weekend classes faridabad',
    'saturday sunday neet coaching',
    'weekend neet coaching faridabad',
    'neet classes for school students',
    'part time neet coaching',
    'weekend biology classes faridabad',
    'neet coaching saturday sunday faridabad',
    'school students neet coaching',
    'integrated neet coaching weekend',
  ],
  openGraph: {
    title: 'NEET Weekend Batch Faridabad 2026 | Cerebrum Biology Academy',
    description: 'Balance school and NEET prep! Saturday-Sunday intensive classes at Sector 17.',
    url: 'https://cerebrumbiologyacademy.com/neet-weekend-batch-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-weekend-batch-faridabad',
  },
}

const schedule = [
  {
    day: 'Saturday',
    time: '9:00 AM - 1:00 PM',
    activity: 'Theory + Practice MCQs',
    duration: '4 hours',
  },
  {
    day: 'Sunday',
    time: '9:00 AM - 1:00 PM',
    activity: 'Theory + Weekly Test',
    duration: '4 hours',
  },
  {
    day: 'Sunday',
    time: '2:00 PM - 4:00 PM',
    activity: 'Doubt Session (Optional)',
    duration: '2 hours',
  },
]

const idealFor = [
  'Class 11-12 students attending regular school',
  'Students in integrated schools (DPS, Ryan, GD Goenka)',
  'Working professionals preparing for NEET',
  'Students taking coaching for Physics/Chemistry elsewhere',
  'Those needing biology supplementary coaching',
]

const faqs = [
  {
    question: 'What are the weekend batch timings in Faridabad?',
    answer:
      'Weekend batch schedule: Saturday 9 AM - 1 PM (4 hours), Sunday 9 AM - 1 PM (4 hours). Total 8 hours of intensive biology coaching per week. Optional doubt session: Sunday 2-4 PM. This covers complete NEET biology syllabus over 10-12 months.',
  },
  {
    question: 'Is weekend-only coaching enough for NEET?',
    answer:
      'Yes, with proper utilization! Our weekend batch covers: 8 hours class time + 6-8 hours self-study assignments = 14-16 hours/week biology preparation. Many students score 300+/360 with weekend-only coaching plus dedicated home study.',
  },
  {
    question: 'Who is the weekend batch ideal for?',
    answer:
      'Perfect for: 1) Class 11-12 students attending regular school, 2) Students in integrated schools (DPS, Ryan, etc.), 3) Working professionals (rare but some), 4) Students already taking coaching for Physics/Chemistry elsewhere, 5) Those needing biology supplementary coaching.',
  },
  {
    question: 'What is the fee for weekend NEET batch?',
    answer:
      'Weekend batch fee: ₹45,000-55,000/year (vs ₹65,000-75,000 for regular batch). Includes: All study material, weekend tests, online doubt support during weekdays, monthly parent meetings. Same faculty as regular batches.',
  },
  {
    question: 'How do you cover full syllabus in weekends only?',
    answer:
      'Efficient curriculum design: 1) 4-hour focused sessions (no time waste), 2) Pre-class reading assignments, 3) Flipped classroom model, 4) Recorded summaries for revision, 5) WhatsApp doubt support on weekdays. Syllabus completed in 10-12 months with 2 months for revision.',
  },
  {
    question: 'What if I miss a weekend class?',
    answer:
      "Backup options: 1) Recorded class summary shared on WhatsApp, 2) Extra weekday session available (by appointment), 3) Notes and assignments shared digitally, 4) One-on-one catch-up with faculty (₹500/session if needed). Missing 1-2 classes won't affect your preparation.",
  },
  {
    question: 'Can I switch from weekend to regular batch?',
    answer:
      'Yes, flexible switching allowed: 1) Mid-year switch with syllabus sync, 2) Fee difference adjusted, 3) Catch-up support for additional chapters. Many Class 12 students switch to regular batch after boards for intensive prep.',
  },
  {
    question: 'What about tests and assessments?',
    answer:
      'Test schedule: 1) Weekly chapter test every Sunday (last hour), 2) Monthly cumulative test (full 3 hours, Sunday), 3) Quarterly NEET pattern test, 4) Online practice tests available 24/7. Results shared with parents via app.',
  },
]

export default function NEETWeekendBatchFaridabad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-white text-orange-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Weekend Batch for School Students
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Weekend Batch in Faridabad</h1>
            <p className="text-xl text-orange-100 mb-8">
              Balance school and NEET prep! Saturday-Sunday intensive classes at Sector 17.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+918826444334"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-orange-50 transition"
              >
                <Phone className="w-5 h-5" />
                Call 88264-44334
              </a>
              <Link
                href="/neet-evening-batch-faridabad"
                className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-orange-800 transition"
              >
                Evening Batch Option
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">Sat-Sun</div>
              <div className="text-gray-600">Weekend Classes</div>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">8 Hrs/Week</div>
              <div className="text-gray-600">Intensive Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">96%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">₹45K</div>
              <div className="text-gray-600">Starting Fee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Weekend Batch Schedule</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Day</th>
                    <th className="px-6 py-4 text-left">Time</th>
                    <th className="px-6 py-4 text-left">Activity</th>
                    <th className="px-6 py-4 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-semibold">{row.day}</td>
                      <td className="px-6 py-4">{row.time}</td>
                      <td className="px-6 py-4">{row.activity}</td>
                      <td className="px-6 py-4">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-gray-600 mt-4">
              Total: 8-10 hours per weekend | Complete syllabus in 10-12 months
            </p>
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Who is Weekend Batch Ideal For?</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {idealFor.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-orange-50 p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Weekend Batch Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Weekday Prep</h3>
              <p className="text-gray-600">
                Pre-class reading assignments sent via WhatsApp. Come prepared to maximize classroom
                time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Weekend Classes</h3>
              <p className="text-gray-600">
                4-hour intensive sessions on Sat & Sun. Theory, practice MCQs, and weekly tests
                included.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Weekday Support</h3>
              <p className="text-gray-600">
                WhatsApp doubt support Mon-Fri. Get answers within hours, not days. Never feel
                stuck.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Weekend Batch Pricing</h2>
          <div className="max-w-xl mx-auto">
            <div className="bg-white border-2 border-orange-400 rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-orange-500 text-white py-4 text-center">
                <h3 className="text-2xl font-bold">Weekend Batch 2026</h3>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-orange-600">₹45,000 - 55,000</span>
                  <span className="text-gray-500">/year</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>8 hours weekly classroom sessions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Complete NEET biology study material</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Weekly chapter tests + monthly mocks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>WhatsApp doubt support (Mon-Sat)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Monthly parent progress meetings</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Same AIIMS faculty as regular batch</span>
                  </li>
                </ul>
                <a
                  href="tel:+918826444334"
                  className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Enroll Now - Call 88264-44334
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Center Location */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">Weekend Batch Location</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <p className="font-semibold">Sector 17</p>
                    <p className="text-gray-600">Faridabad 121002</p>
                    <p className="text-sm text-gray-500 mt-1">Easy access near Bata Chowk Metro</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <p className="font-semibold">Weekend Timings</p>
                    <p className="text-gray-600">Saturday: 9 AM - 1 PM</p>
                    <p className="text-gray-600">Sunday: 9 AM - 1 PM</p>
                    <p className="text-gray-600">Doubt Session: Sun 2 PM - 4 PM</p>
                  </div>
                </div>
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Demo
                </a>
              </div>
              <div className="md:w-1/2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1234567890123!2d77.3178!3d28.4089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSector%2017%2C%20Faridabad!5e0!3m2!1sen!2sin!4v1234567890"
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
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">
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
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Weekend NEET Journey</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join our next weekend batch. Limited seats available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-orange-50 transition"
            >
              <Phone className="w-5 h-5" />
              Call Now: 88264-44334
            </a>
            <Link
              href="/neet-coaching-faridabad"
              className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-800 transition"
            >
              View All Batches
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
            '@type': 'Course',
            name: 'NEET Weekend Batch Faridabad',
            description: 'Weekend NEET biology coaching for school students in Faridabad',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Sector 17',
                addressLocality: 'Faridabad',
                addressRegion: 'Haryana',
                postalCode: '121002',
                addressCountry: 'IN',
              },
            },
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'Offline',
              courseSchedule: {
                '@type': 'Schedule',
                byDay: ['Saturday', 'Sunday'],
                startTime: '09:00',
                endTime: '13:00',
              },
            },
          }),
        }}
      />
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
