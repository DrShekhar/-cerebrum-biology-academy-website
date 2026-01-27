import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Trophy, Award, Star, TrendingUp, Users, ArrowRight, MapPin, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET 2024 Results Gurugram | 98% Success | Cerebrum Biology Academy',
  description:
    'Cerebrum Biology Academy NEET 2024 results: 98% qualification rate, 12 students scored 650+, 3 in top 5000 AIR. See our Gurugram toppers. Call 88264-44334!',
  keywords: [
    'neet 2024 results gurugram',
    'neet result gurugram coaching',
    'cerebrum academy neet results',
    'neet toppers gurugram 2024',
    'best neet results gurgaon',
    'neet coaching results gurugram',
  ],
  openGraph: {
    title: 'NEET 2024 Results | Cerebrum Biology Academy Gurugram',
    description: '98% success rate, 12 students 650+, 3 in top 5000 AIR.',
    url: 'https://cerebrumbiologyacademy.com/neet-result-2024-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-result-2024-gurugram',
  },
}

const overallStats = [
  { label: 'Students Appeared', value: '127', icon: Users },
  { label: 'Qualified NEET', value: '124', subtext: '98%', icon: Trophy },
  { label: 'Scored 600+', value: '45', subtext: '35%', icon: TrendingUp },
  { label: 'Scored 650+', value: '12', subtext: '9%', icon: Star },
  { label: 'Top 5000 AIR', value: '3', icon: Award },
  { label: 'Top 10000 AIR', value: '8', icon: GraduationCap },
]

const toppers = [
  { name: 'Priya Sharma', score: 695, rank: 'AIR 2,847', college: 'AIIMS Delhi', school: 'DPS Sector 45', batch: '2-Year' },
  { name: 'Arjun Verma', score: 682, rank: 'AIR 4,123', college: 'MAMC Delhi', school: 'Shri Ram School', batch: '2-Year' },
  { name: 'Ananya Gupta', score: 671, rank: 'AIR 4,892', college: 'Lady Hardinge', school: 'Ryan International', batch: '1-Year' },
  { name: 'Rahul Singh', score: 668, rank: 'AIR 5,234', college: 'UCMS Delhi', school: 'GD Goenka', batch: '2-Year' },
  { name: 'Sneha Kapoor', score: 662, rank: 'AIR 6,012', college: 'MAMC Delhi', school: 'Amity Global', batch: '1-Year' },
  { name: 'Aditya Kumar', score: 658, rank: 'AIR 6,789', college: 'LHMC Delhi', school: 'Pathways World', batch: '2-Year' },
]

const scoreDistribution = [
  { range: '680-720', count: 3, percentage: 2 },
  { range: '650-679', count: 9, percentage: 7 },
  { range: '600-649', count: 33, percentage: 26 },
  { range: '550-599', count: 42, percentage: 33 },
  { range: '500-549', count: 25, percentage: 20 },
  { range: '450-499', count: 12, percentage: 9 },
  { range: 'Below 450', count: 3, percentage: 3 },
]

const collegePlacements = [
  { college: 'AIIMS (Delhi, Jodhpur, Rishikesh)', count: 4 },
  { college: 'MAMC Delhi', count: 6 },
  { college: 'Lady Hardinge Medical College', count: 5 },
  { college: 'UCMS Delhi', count: 4 },
  { college: 'VMMC & Safdarjung', count: 3 },
  { college: 'Other Govt Medical Colleges', count: 35 },
  { college: 'Private Medical Colleges', count: 67 },
]

const faqs = [
  {
    question: 'What was Cerebrum\'s NEET 2024 success rate?',
    answer: 'Our NEET 2024 success rate was 98% - 124 out of 127 students qualified. 45 students scored above 600, and 12 scored above 650. 3 students made it to top 5000 All India Rank.',
  },
  {
    question: 'Who was Cerebrum\'s NEET 2024 topper?',
    answer: 'Priya Sharma topped our batch with 695/720 marks and AIR 2,847. She secured admission to AIIMS Delhi. She was a 2-year program student from DPS Sector 45.',
  },
  {
    question: 'How many students got into AIIMS in 2024?',
    answer: '4 students got into various AIIMS campuses (Delhi, Jodhpur, Rishikesh). Additionally, 15 students got into top Delhi government medical colleges.',
  },
  {
    question: 'What is the average score improvement at Cerebrum?',
    answer: 'Students who joined from other coaching or as repeaters improved by an average of 85 marks. First-time aspirants averaged 595 marks with our 2-year program.',
  },
]

export default function NEETResult2024Gurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <section className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white text-amber-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4" />
              Official Results
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET 2024 Results</h1>
            <p className="text-xl text-amber-100 mb-4">Cerebrum Biology Academy, Gurugram</p>
            <div className="flex items-center justify-center gap-2 text-yellow-200 mb-8">
              <Award className="w-5 h-5" />
              <span className="text-2xl font-bold">98% Success Rate | 12 Students 650+ | 3 in Top 5000</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {overallStats.map((stat, index) => (
              <div key={index} className="bg-amber-50 rounded-xl p-4 text-center">
                <stat.icon className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-amber-700">{stat.value}</p>
                {stat.subtext && <p className="text-lg font-semibold text-amber-500">{stat.subtext}</p>}
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our NEET 2024 Toppers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {toppers.map((topper, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-lg overflow-hidden ${index === 0 ? 'ring-2 ring-amber-500' : ''}`}>
                {index === 0 && (
                  <div className="bg-amber-500 text-white text-center py-2 text-sm font-semibold">
                    BATCH TOPPER
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{topper.name}</h3>
                      <p className="text-gray-500 text-sm">{topper.school}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-600">{topper.score}</p>
                      <p className="text-sm text-gray-500">/720</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rank:</span>
                      <span className="font-semibold">{topper.rank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">College:</span>
                      <span className="font-semibold text-green-600">{topper.college}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Program:</span>
                      <span className="font-semibold">{topper.batch}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Score Distribution</h2>
          <div className="max-w-3xl mx-auto">
            {scoreDistribution.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">{item.range}</span>
                  <span className="text-gray-600">{item.count} students ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${
                      item.range.includes('680') ? 'bg-amber-500' :
                      item.range.includes('650') ? 'bg-amber-400' :
                      item.range.includes('600') ? 'bg-green-500' :
                      item.range.includes('550') ? 'bg-green-400' :
                      item.range.includes('500') ? 'bg-blue-400' :
                      'bg-gray-400'
                    }`}
                    style={{ width: `${item.percentage * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">College Placements</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-amber-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Medical College</th>
                    <th className="px-6 py-3 text-center">Students Admitted</th>
                  </tr>
                </thead>
                <tbody>
                  {collegePlacements.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-3">{item.college}</td>
                      <td className="px-6 py-3 text-center font-bold text-amber-600">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-amber-100">
                  <tr>
                    <td className="px-6 py-3 font-bold">Total Admissions</td>
                    <td className="px-6 py-3 text-center font-bold text-amber-700">124</td>
                  </tr>
                </tfoot>
              </table>
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
                  <span className="text-amber-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Explore More</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/neet-topper-interview-gurugram" className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition text-center">
              <h3 className="font-semibold text-purple-800">Topper Interviews</h3>
              <p className="text-sm text-gray-600">Learn strategies from 650+ scorers</p>
            </Link>
            <Link href="/neet-biology-faculty-gurugram" className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition text-center">
              <h3 className="font-semibold text-blue-800">Our Faculty</h3>
              <p className="text-sm text-gray-600">Meet our AIIMS-trained teachers</p>
            </Link>
            <Link href="/free-neet-demo-class-gurugram" className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition text-center">
              <h3 className="font-semibold text-green-800">Free Demo Class</h3>
              <p className="text-sm text-gray-600">Experience our teaching style</p>
            </Link>
            <Link href="/neet-coaching-gurugram" className="bg-amber-50 p-4 rounded-lg hover:bg-amber-100 transition text-center">
              <h3 className="font-semibold text-amber-800">NEET Coaching</h3>
              <p className="text-sm text-gray-600">Complete program details</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our 2025-26 Batch</h2>
          <p className="text-xl text-amber-100 mb-8">Be part of our next success story. Limited seats available.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/neet-result-2025-gurugram" className="inline-flex items-center gap-2 bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-900 transition">
              See 2025 Results<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'NEET 2024 Results - Cerebrum Biology Academy Gurugram',
        description: '98% success rate with 12 students scoring 650+ and 3 in top 5000 AIR',
        author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        publisher: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        datePublished: '2024-06-15',
        dateModified: '2024-06-15',
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      }) }} />
    </div>
  )
}
