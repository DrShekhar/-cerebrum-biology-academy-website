import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  MapPin,
  Clock,
  Moon,
  CheckCircle,
  School,
  Users,
  ArrowRight,
  Coffee,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Evening Batch Ghaziabad 2026 | After-School Classes 5-8 PM | Cerebrum',
  description:
    'Join NEET evening batch for Ghaziabad students - 5 PM to 8 PM classes after school. Perfect for Class 11-12 students from Indirapuram, Vaishali, Kaushambi. Call 99536-43938!',
  keywords: [
    'neet evening batch ghaziabad',
    'neet evening classes ghaziabad',
    'after school neet coaching ghaziabad',
    'evening neet coaching ghaziabad',
    'neet classes 5 pm to 8 pm ghaziabad',
    '5 to 8 neet coaching ghaziabad',
    'evening biology classes ghaziabad',
    'after school biology coaching ghaziabad',
    'school students neet evening batch ghaziabad',
    'indirapuram students neet coaching',
  ],
  openGraph: {
    title: 'NEET Evening Batch Ghaziabad 2026 | Cerebrum Biology Academy',
    description:
      'After-school NEET preparation! Evening classes from 5 PM at Sector 62 Noida, accessible via Blue Line Metro.',
    url: 'https://cerebrumbiologyacademy.com/neet-evening-batch-ghaziabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-evening-batch-ghaziabad',
  },
}

const schedule = [
  {
    day: 'Monday',
    time: '5:00 PM - 8:00 PM',
    activity: 'Theory Class',
    chapters: 'As per syllabus',
  },
  {
    day: 'Tuesday',
    time: '5:00 PM - 8:00 PM',
    activity: 'Theory + Practice',
    chapters: 'As per syllabus',
  },
  {
    day: 'Wednesday',
    time: '5:00 PM - 8:00 PM',
    activity: 'Theory Class',
    chapters: 'As per syllabus',
  },
  {
    day: 'Thursday',
    time: '5:00 PM - 8:00 PM',
    activity: 'Theory + Practice',
    chapters: 'As per syllabus',
  },
  {
    day: 'Friday',
    time: '5:00 PM - 8:00 PM',
    activity: 'Revision + Weekly Test',
    chapters: 'Cumulative',
  },
  {
    day: 'Saturday',
    time: '10:00 AM - 1:00 PM',
    activity: 'Optional Revision',
    chapters: 'Doubt Clearing',
  },
]

const compatibleSchools = [
  { name: 'DPS Indirapuram', endTime: '2:30 PM' },
  { name: 'Ryan International Ghaziabad', endTime: '2:00 PM' },
  { name: 'Amity International Vaishali', endTime: '2:30 PM' },
  { name: 'GD Goenka Indirapuram', endTime: '2:30 PM' },
  { name: 'St. Mary\'s Convent Indirapuram', endTime: '3:00 PM' },
  { name: 'Jaipuria School Indirapuram', endTime: '3:00 PM' },
  { name: 'Mother Mary School Ghaziabad', endTime: '2:30 PM' },
  { name: 'Delhi Public School Ghaziabad', endTime: '2:30 PM' },
]

const faqs = [
  {
    question: 'What are the evening batch timings?',
    answer:
      'Evening batch: 5:00 PM - 8:00 PM (Monday to Friday). 3 hours daily x 5 days = 15 hours/week of intensive coaching. Optional Saturday revision: 10 AM - 1 PM. Perfect for Ghaziabad students whose school ends by 3-4 PM.',
  },
  {
    question: 'Which Ghaziabad schools can conveniently attend evening batch?',
    answer:
      'Ideal for students from: DPS Indirapuram, Ryan International Ghaziabad, Amity International Vaishali, GD Goenka Indirapuram, St. Mary\'s Convent, Jaipuria School, and other Ghaziabad schools ending by 3-4 PM. Blue Line Metro from Vaishali/Kaushambi reaches Sector 62 in 20-25 min.',
  },
  {
    question: 'Is evening batch as effective as morning batch?',
    answer:
      "Equally effective! Same faculty teaches both batches. Evening advantages: 1) Fresh after school rest, 2) Can revise morning's school topics, 3) Same study material and tests, 4) Smaller batches (many prefer morning). Results show no difference between batches.",
  },
  {
    question: 'What is the fee for evening NEET batch?',
    answer:
      'Evening batch fee: Same as regular batch - ₹45,000-75,000/year depending on course. No premium for evening timing. Includes: Complete study material, daily tests, doubt sessions, WhatsApp support, parent meetings.',
  },
  {
    question: 'How to manage school + evening coaching for Ghaziabad students?',
    answer:
      'Recommended routine: School (8 AM-3 PM) → Rest/Lunch (3-4 PM) → Metro to Sector 62 Noida (4-4:30 PM) → Coaching (5-8 PM) → Return home → Dinner (9 PM) → Self-study (9:30-11 PM) → Sleep. Our syllabus aligns with CBSE, so school and coaching complement each other.',
  },
  {
    question: 'What if school has extra classes/activities?',
    answer:
      'Flexible attendance: 1) Inform us in advance for planned absences, 2) Recorded summaries available, 3) Weekend catch-up sessions, 4) No penalty for occasional misses. We understand school schedules vary.',
  },
  {
    question: 'Do you provide snacks/refreshments?',
    answer:
      'Yes! Light refreshments provided during break (6:30-6:45 PM): Biscuits, juice/water. Students can also bring their own snacks. AC classroom ensures comfort after long school day.',
  },
  {
    question: 'Can droppers join evening batch?',
    answer:
      'Droppers typically prefer morning batches (more time for self-study). But evening batch is available if preferred. Dropper-specific: Additional morning doubt sessions available, extra test series, extended library hours.',
  },
]

export default function NEETEveningBatchGhaziabad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-indigo-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              After-School NEET Coaching
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NEET Evening Batch for Ghaziabad Students
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              After-school NEET preparation! Evening classes from 5 PM at Sector 62 Noida. Blue Line
              Metro from Vaishali/Kaushambi in 20-25 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+919953643938"
                className="bg-yellow-500 text-indigo-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
              >
                <Phone className="w-5 h-5" />
                Call 99536-43938
              </a>
              <Link
                href="/neet-weekend-batch-ghaziabad"
                className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 transition"
              >
                Weekend Batch Option
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
              <Moon className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-indigo-600">5-8 PM</div>
              <div className="text-gray-600">Evening Classes</div>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-indigo-600">15 Hrs/Week</div>
              <div className="text-gray-600">Mon-Fri</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">97%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">180+</div>
              <div className="text-gray-600">Evening Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatible Schools */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Ghaziabad Schools Compatible with Evening Batch
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Students from these Ghaziabad schools can comfortably reach our Sector 62 Noida center
            by 5 PM via Blue Line Metro
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {compatibleSchools.map((school, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center">
                  <School className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                  <p className="font-semibold text-sm">{school.name}</p>
                  <p className="text-xs text-gray-500">Ends: {school.endTime}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-6 text-sm">
              School not listed? Call us to check compatibility: 99536-43938
            </p>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Evening Batch Weekly Schedule</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Day</th>
                    <th className="px-6 py-4 text-left">Time</th>
                    <th className="px-6 py-4 text-left">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-semibold">{row.day}</td>
                      <td className="px-6 py-4">{row.time}</td>
                      <td className="px-6 py-4">{row.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-gray-600 mt-4">
              Total: 15-18 hours per week | Complete syllabus in 10-12 months
            </p>
          </div>
        </div>
      </section>

      {/* Daily Routine */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Recommended Daily Routine for Ghaziabad Students
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
                <div className="w-24 text-center font-bold text-indigo-600">8 AM - 3 PM</div>
                <div className="flex-1">
                  <p className="font-semibold">School Hours</p>
                  <p className="text-sm text-gray-600">Regular school attendance</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
                <div className="w-24 text-center font-bold text-indigo-600">3 - 4:30 PM</div>
                <div className="flex-1">
                  <p className="font-semibold">Rest & Travel</p>
                  <p className="text-sm text-gray-600">
                    Recharge + Blue Line Metro to Sector 62 Noida
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-indigo-100 p-4 rounded-lg shadow-md border-2 border-indigo-400">
                <div className="w-24 text-center font-bold text-indigo-700">5 - 8 PM</div>
                <div className="flex-1">
                  <p className="font-semibold text-indigo-700">Cerebrum Evening Batch</p>
                  <p className="text-sm text-indigo-600">3 hours of intensive NEET biology</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
                <div className="w-24 text-center font-bold text-indigo-600">8:30 PM</div>
                <div className="flex-1">
                  <p className="font-semibold">Dinner</p>
                  <p className="text-sm text-gray-600">Family time & relaxation</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
                <div className="w-24 text-center font-bold text-indigo-600">9 - 10:30 PM</div>
                <div className="flex-1">
                  <p className="font-semibold">Self-Study</p>
                  <p className="text-sm text-gray-600">Homework + revision</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Evening Batch Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Coffee className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Refreshed Mind</h3>
              <p className="text-gray-600">
                After school rest means you come to class fresh and alert. Better concentration =
                better learning.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <School className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">School Alignment</h3>
              <p className="text-gray-600">
                Our syllabus complements CBSE curriculum. What you learn in school reinforces
                coaching, and vice versa.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Smaller Batches</h3>
              <p className="text-gray-600">
                Many students prefer morning, so evening batches are often smaller. More personal
                attention for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Evening Batch Pricing</h2>
          <div className="max-w-xl mx-auto">
            <div className="bg-white border-2 border-indigo-400 rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-indigo-600 text-white py-4 text-center">
                <h3 className="text-2xl font-bold">Evening Batch 2026</h3>
                <p className="text-indigo-200">5 PM - 8 PM, Mon-Fri</p>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-indigo-600">₹45,000 - 75,000</span>
                  <span className="text-gray-500">/year</span>
                  <p className="text-sm text-gray-500 mt-1">Same as morning batch - no premium</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>15 hours weekly classroom sessions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Complete NEET biology study material</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Weekly tests + monthly full mocks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Light refreshments during break</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>WhatsApp doubt support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Optional Saturday revision session</span>
                  </li>
                </ul>
                <a
                  href="tel:+919953643938"
                  className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Enroll Now - Call 99536-43938
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Center Location */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">Evening Batch Location</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <p className="font-semibold">B-45, Sector 62</p>
                    <p className="text-gray-600">Noida, UP 201301</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Blue Line Metro: Vaishali/Kaushambi → Sector 62 (20-25 min)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <p className="font-semibold">Evening Timings</p>
                    <p className="text-gray-600">Monday - Friday: 5 PM - 8 PM</p>
                    <p className="text-gray-600">Saturday (Optional): 10 AM - 1 PM</p>
                  </div>
                </div>
                <a
                  href="tel:+919953643938"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Demo
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-indigo-600 group-open:rotate-180 transition-transform">
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
      <section className="py-16 bg-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Evening Batch Today</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Balance school and NEET preparation perfectly. Limited evening batch seats.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919953643938"
              className="bg-yellow-500 text-indigo-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call Now: 99536-43938
            </a>
            <Link
              href="/biology-classes-ghaziabad"
              className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
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
            name: 'NEET Evening Batch for Ghaziabad Students',
            description: 'Evening NEET biology coaching after school hours for Ghaziabad students',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'B-45, Sector 62',
                addressLocality: 'Noida',
                addressRegion: 'Uttar Pradesh',
                postalCode: '201301',
                addressCountry: 'IN',
              },
            },
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'Offline',
              courseSchedule: {
                '@type': 'Schedule',
                byDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                startTime: '17:00',
                endTime: '20:00',
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
