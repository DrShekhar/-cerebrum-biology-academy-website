import { Metadata } from 'next';
import Link from 'next/link';
import {
  Clock,
  Users,
  BookOpen,
  TrendingUp,
  CheckCircle,
  MessageSquare,
  PhoneIcon,
  Mail,
  MapPin,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'NEET Biology Batch Types - Regular, Weekend, Crash Course | Cerebrum',
  description:
    'Choose the perfect NEET Biology batch for your preparation. Regular batch, weekend batch, crash course, or online live classes at Cerebrum Biology Academy.',
  keywords:
    'NEET biology batch types, regular batch, weekend batch, crash course, online NEET coaching, NEET biology classes Delhi',
  openGraph: {
    title: 'NEET Biology Batch Types | Cerebrum Biology Academy',
    description: 'Find the right NEET Biology batch for your preparation style and schedule.',
    url: 'https://cerebrumbiologyacademy.com/batch-types',
    type: 'website',
  },
};

interface BatchCard {
  id: string;
  title: string;
  badge: string;
  for: string;
  schedule: string;
  duration: string;
  includes: string[];
  fee: string;
  bestFor: string;
  icon: React.ReactNode;
  color: string;
}

const batchTypes: BatchCard[] = [
  {
    id: 'regular',
    title: 'Regular Batch',
    badge: 'Most Popular',
    for: 'Class 11 & 12 students',
    schedule: 'Mon-Sat, 2-3 hours daily',
    duration: 'Full academic year (10-11 months)',
    includes: [
      'Complete NEET Biology syllabus',
      'Regular monthly tests',
      'Doubt sessions twice a week',
      'Study materials included',
      'Parent-teacher meetings',
    ],
    fee: 'Starting ₹45,000/year',
    bestFor: 'Students who want comprehensive preparation alongside school',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'weekend',
    title: 'Weekend Batch',
    badge: 'Flexible Schedule',
    for: 'Students with busy weekday schedules',
    schedule: 'Saturday & Sunday, 4-5 hours/day',
    duration: 'Full academic year (10-11 months)',
    includes: [
      'Complete syllabus coverage',
      'Weekly cumulative tests',
      'Weekend doubt sessions',
      'Digital + printed materials',
      'Free revision sessions',
    ],
    fee: 'Starting ₹35,000/year',
    bestFor: 'Students at competitive schools, those juggling multiple activities',
    icon: <Clock className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'crash',
    title: 'Crash Course',
    badge: 'Quick Prep',
    for: 'Class 12 students & Droppers',
    schedule: 'Daily intensive, 5-6 hours',
    duration: '45 days / 90 days options',
    includes: [
      'High-yield topics covered',
      'Previous year questions (PYQ) practice',
      'Daily mock tests',
      'Speed & accuracy training',
      'Last-minute revision strategy',
    ],
    fee: 'Starting ₹25,000 (45-day) / ₹40,000 (90-day)',
    bestFor: 'Students needing quick revision before NEET exam',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 'online',
    title: 'Online Live Batch',
    badge: 'Learn Anywhere',
    for: 'Students outside Delhi NCR / prefer home learning',
    schedule: 'Flexible, live + recorded sessions',
    duration: 'Full year or crash course',
    includes: [
      'Live interactive classes',
      'Doubt resolution via WhatsApp',
      'Digital study material',
      'Recorded session access',
      'Online doubt forums',
    ],
    fee: 'Starting ₹30,000/year',
    bestFor: 'Students in other cities, those preferring online learning',
    icon: <Users className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
  },
];

const faqData = [
  {
    question: 'Can I switch from one batch to another?',
    answer:
      'Yes, you can switch between batches (Regular to Weekend or vice versa) within the first month. However, once enrolled in the Crash Course, switching is not allowed. Please discuss with our counselors before making a decision.',
  },
  {
    question: 'Do you provide certificates after completing the batch?',
    answer:
      'Yes, completion certificates are provided to all students who maintain 75% attendance. Additionally, you receive progress reports and performance analysis cards based on your test scores.',
  },
  {
    question: 'What if I miss classes in the Regular or Weekend batch?',
    answer:
      'We provide recorded sessions for all classes. You can watch them during your free time to catch up. We also conduct doubt sessions weekly where you can clarify any missed concepts.',
  },
  {
    question: 'Is there a demo class available?',
    answer:
      'Absolutely! We offer a free demo class for all batches. You can experience our teaching methodology, meet the faculty, and understand if it aligns with your learning style. Book your demo today!',
  },
  {
    question: 'What is the success rate of different batches?',
    answer:
      'All our batches have consistently produced 85%+ students qualifying NEET in the first attempt. The success depends on your commitment and consistency rather than the batch type. Our counselors help you choose the right batch based on your goals.',
  },
];

export default function BatchTypesPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Perfect NEET Biology Batch
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Whether you're preparing from Class 11, juggling board exams, or doing last-minute
                revision, Cerebrum has the right batch for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#demo"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  Book Free Demo Class
                </Link>
                <Link
                  href="#contact"
                  className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition border border-white"
                >
                  Talk to Counselor
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Batch Types Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Batch Types
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose based on your schedule, learning style, and preparation timeline
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {batchTypes.map((batch) => (
                <div
                  key={batch.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col"
                >
                  {/* Header with color gradient */}
                  <div className={`bg-gradient-to-r ${batch.color} p-6 text-white`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                        {batch.icon}
                      </div>
                      <span className="text-xs font-semibold bg-white bg-opacity-30 px-3 py-1 rounded-full">
                        {batch.badge}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold">{batch.title}</h3>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">FOR</p>
                        <p className="text-gray-900">{batch.for}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 font-semibold">SCHEDULE</p>
                        <p className="text-gray-900">{batch.schedule}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 font-semibold">DURATION</p>
                        <p className="text-gray-900">{batch.duration}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 font-semibold mb-2">INCLUDES</p>
                        <ul className="space-y-1">
                          {batch.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600 font-semibold mb-2">BEST FOR</p>
                        <p className="text-sm text-gray-700 italic">{batch.bestFor}</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-6 border-t">
                      <p className="text-2xl font-bold text-gray-900 mb-4">{batch.fee}</p>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Decision Guide Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Which Batch is Right for You?
            </h2>

            <div className="space-y-6">
              {/* Question 1 */}
              <div className="border-l-4 border-blue-600 pl-6 py-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Are you in Class 11, Class 12, or a Dropper?
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">Class 11:</span> Regular Batch (2-3 hours daily)
                    gives you ample time for school + JEE preparation
                  </p>
                  <p>
                    <span className="font-semibold">Class 12:</span> Choose Regular Batch if you have
                    flexible school hours, or Weekend Batch if your school is competitive
                  </p>
                  <p>
                    <span className="font-semibold">Dropper:</span> Crash Course (90-day) or Regular
                    Batch depending on your target score
                  </p>
                </div>
              </div>

              {/* Question 2 */}
              <div className="border-l-4 border-purple-600 pl-6 py-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  How much time can you dedicate daily?
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">1-2 hours:</span> Weekend Batch or Online Batch
                  </p>
                  <p>
                    <span className="font-semibold">2-3 hours:</span> Regular Batch (perfect balance)
                  </p>
                  <p>
                    <span className="font-semibold">5-6 hours:</span> Crash Course for intensive prep
                  </p>
                </div>
              </div>

              {/* Question 3 */}
              <div className="border-l-4 border-orange-600 pl-6 py-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Do you prefer offline classes or online learning?
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">Offline (In-person):</span> Regular Batch or
                    Weekend Batch at our Delhi center
                  </p>
                  <p>
                    <span className="font-semibold">Online (Home learning):</span> Online Live Batch
                    with live classes + recorded access
                  </p>
                  <p>
                    <span className="font-semibold">Hybrid:</span> Choose based on your location; we
                    can discuss flexible options
                  </p>
                </div>
              </div>

              {/* Question 4 */}
              <div className="border-l-4 border-green-600 pl-6 py-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Are you preparing for the first time or revising?
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">First-time prep:</span> Regular Batch or Online
                    Batch (comprehensive syllabus coverage)
                  </p>
                  <p>
                    <span className="font-semibold">Revision stage:</span> Crash Course for focused,
                    high-yield preparation
                  </p>
                </div>
              </div>

              {/* Question 5 */}
              <div className="border-l-4 border-pink-600 pl-6 py-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What's your budget constraint?
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">Budget-friendly:</span> Weekend Batch (₹35,000)
                    or Crash Course (₹25,000)
                  </p>
                  <p>
                    <span className="font-semibold">Moderate budget:</span> Online Batch (₹30,000) or
                    Regular Batch (₹45,000)
                  </p>
                  <p>
                    <span className="font-semibold">Premium experience:</span> Regular Batch with
                    added 1-on-1 doubt sessions
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center">
              <p className="text-gray-700 mb-4">
                Still confused? Our counselors are here to help you choose the perfect batch!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+918826444334"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  📞 Call: +91 88264 44334
                </a>
                <a
                  href="https://wa.me/918826444334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {faqData.map((item, idx) => (
                <details
                  key={idx}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50 transition">
                    <span>{item.question}</span>
                    <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 border-t text-gray-700">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="demo" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your NEET Preparation?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Book a free demo class today and experience our teaching methodology. Our counselors
              will help you choose the perfect batch based on your goals and schedule.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition">
                Book Demo Class Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition">
                Download Brochure
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-blue-400">
              <div className="flex flex-col items-center">
                <PhoneIcon className="w-8 h-8 mb-3" />
                <p className="text-sm text-blue-100 mb-2">Call Us</p>
                <a href="tel:+918826444334" className="font-bold hover:text-blue-50">
                  +91 88264 44334
                </a>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 mb-3" />
                <p className="text-sm text-blue-100 mb-2">Email Us</p>
                <a href="mailto:info@cerebrumbiologyacademy.com" className="font-bold hover:text-blue-50">
                  info@cerebrumbiologyacademy.com
                </a>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 mb-3" />
                <p className="text-sm text-blue-100 mb-2">Visit Us</p>
                <p className="font-bold text-sm">
                  D 35, South Extension Part 2
                  <br />
                  New Delhi 110049
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Get in Touch
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <PhoneIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+918826444334" className="text-blue-600 hover:underline">
                      +91 88264 44334
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@cerebrumbiologyacademy.com" className="text-blue-600 hover:underline">
                      info@cerebrumbiologyacademy.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/918826444334"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      wa.me/918826444334
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-700">
                      D 35, South Extension Part 2
                      <br />
                      New Delhi 110049
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Form */}
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Enquiry</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600">
                    <option value="">Select Batch Type</option>
                    <option value="regular">Regular Batch</option>
                    <option value="weekend">Weekend Batch</option>
                    <option value="crash">Crash Course</option>
                    <option value="online">Online Live Batch</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Send Enquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
