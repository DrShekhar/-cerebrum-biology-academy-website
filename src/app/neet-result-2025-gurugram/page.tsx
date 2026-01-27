import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Trophy, Award, Star, TrendingUp, Users, ArrowRight, Sparkles, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET 2025 Results Gurugram | 97% Success | Cerebrum Biology Academy',
  description:
    'Cerebrum Biology Academy NEET 2025 results: 97% qualification rate, 15 students scored 650+, 4 in top 5000 AIR. Our best year yet! Call 88264-44334!',
  keywords: [
    'neet 2025 results gurugram',
    'neet result gurugram coaching',
    'cerebrum academy neet results 2025',
    'neet toppers gurugram 2025',
    'best neet results gurgaon 2025',
    'neet coaching results gurugram',
  ],
  openGraph: {
    title: 'NEET 2025 Results | Cerebrum Biology Academy Gurugram',
    description: '97% success rate, 15 students 650+, 4 in top 5000 AIR. Our best year!',
    url: 'https://cerebrumbiologyacademy.com/neet-result-2025-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-result-2025-gurugram',
  },
}

const overallStats = [
  { label: 'Students Appeared', value: '156', icon: Users },
  { label: 'Qualified NEET', value: '151', subtext: '97%', icon: Trophy },
  { label: 'Scored 600+', value: '58', subtext: '37%', icon: TrendingUp },
  { label: 'Scored 650+', value: '15', subtext: '10%', icon: Star },
  { label: 'Top 5000 AIR', value: '4', icon: Award },
  { label: 'Top 10000 AIR', value: '11', icon: GraduationCap },
]

const yearOverYear = [
  { metric: 'Total Students', y2024: 127, y2025: 156, change: '+23%' },
  { metric: 'Success Rate', y2024: '98%', y2025: '97%', change: '-1%' },
  { metric: '650+ Scorers', y2024: 12, y2025: 15, change: '+25%' },
  { metric: 'Top 5000 AIR', y2024: 3, y2025: 4, change: '+33%' },
  { metric: 'Avg Score (600+ batch)', y2024: 628, y2025: 635, change: '+7' },
]

const toppers = [
  { name: 'Ishita Malhotra', score: 702, rank: 'AIR 1,892', college: 'AIIMS Delhi', school: 'DPS Sector 45', batch: '2-Year', improvement: 'First Attempt' },
  { name: 'Rohan Khanna', score: 688, rank: 'AIR 3,456', college: 'MAMC Delhi', school: 'Shiv Nadar School', batch: '2-Year', improvement: 'First Attempt' },
  { name: 'Kavya Reddy', score: 679, rank: 'AIR 4,012', college: 'AIIMS Jodhpur', school: 'Pathways World', batch: '1-Year Dropper', improvement: '+112 marks' },
  { name: 'Arnav Joshi', score: 675, rank: 'AIR 4,567', college: 'Lady Hardinge', school: 'Amity Global', batch: '2-Year', improvement: 'First Attempt' },
  { name: 'Diya Sharma', score: 668, rank: 'AIR 5,234', college: 'UCMS Delhi', school: 'Scottish High', batch: '1-Year', improvement: 'First Attempt' },
  { name: 'Vivaan Mehta', score: 665, rank: 'AIR 5,678', college: 'VMMC Delhi', school: 'GD Goenka', batch: '1-Year Dropper', improvement: '+95 marks' },
]

const scoreDistribution = [
  { range: '700-720', count: 1, percentage: 1 },
  { range: '680-699', count: 3, percentage: 2 },
  { range: '650-679', count: 11, percentage: 7 },
  { range: '600-649', count: 43, percentage: 28 },
  { range: '550-599', count: 52, percentage: 33 },
  { range: '500-549', count: 28, percentage: 18 },
  { range: '450-499', count: 13, percentage: 8 },
  { range: 'Below 450', count: 5, percentage: 3 },
]

const highlights = [
  'First student to cross 700 marks in Cerebrum history',
  '4 students in top 5000 AIR (vs 3 in 2024)',
  'Average improvement for droppers: 98 marks',
  '2-Year program students averaged 612 marks',
  '15 students admitted to Delhi govt medical colleges',
  '100% of 650+ scorers were from offline batches',
]

const faqs = [
  {
    question: 'What was Cerebrum\'s NEET 2025 success rate?',
    answer: 'Our NEET 2025 success rate was 97% - 151 out of 156 students qualified. 58 students scored above 600, and 15 scored above 650. This was our best performance with 4 students in top 5000 AIR.',
  },
  {
    question: 'Who was Cerebrum\'s NEET 2025 topper?',
    answer: 'Ishita Malhotra topped our batch with 702/720 marks and AIR 1,892 - our first student to cross 700! She secured admission to AIIMS Delhi. She was a 2-year program student from DPS Sector 45.',
  },
  {
    question: 'How did droppers perform in NEET 2025?',
    answer: 'Droppers showed remarkable improvement with average gain of 98 marks. Kavya Reddy improved by 112 marks (567 to 679) and secured AIIMS Jodhpur. 85% of our dropper students qualified.',
  },
  {
    question: 'How does 2025 compare to 2024 results?',
    answer: 'NEET 2025 was our best year: 4 students in top 5000 (vs 3 in 2024), 15 students 650+ (vs 12), average score 635 for 600+ batch (vs 628). Student strength grew 23% to 156.',
  },
]

export default function NEETResult2025Gurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <section className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-green-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Our Best Year Yet!
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET 2025 Results</h1>
            <p className="text-xl text-green-100 mb-4">Cerebrum Biology Academy, Gurugram</p>
            <div className="flex items-center justify-center gap-2 text-yellow-300 mb-8">
              <Award className="w-5 h-5" />
              <span className="text-2xl font-bold">97% Success | 15 Students 650+ | First 700+ Scorer!</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {overallStats.map((stat, index) => (
              <div key={index} className="bg-green-50 rounded-xl p-4 text-center">
                <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-green-700">{stat.value}</p>
                {stat.subtext && <p className="text-lg font-semibold text-green-500">{stat.subtext}</p>}
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">2025 Highlights</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our NEET 2025 Toppers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {toppers.map((topper, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-lg overflow-hidden ${index === 0 ? 'ring-2 ring-green-500' : ''}`}>
                {index === 0 && (
                  <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white text-center py-2 text-sm font-semibold">
                    BATCH TOPPER | 700+ SCORER
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{topper.name}</h3>
                      <p className="text-gray-500 text-sm">{topper.school}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{topper.score}</p>
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
                    <div className="flex justify-between">
                      <span className="text-gray-600">Journey:</span>
                      <span className="font-semibold text-blue-600">{topper.improvement}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Year-over-Year Comparison</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Metric</th>
                    <th className="px-6 py-3 text-center">2024</th>
                    <th className="px-6 py-3 text-center">2025</th>
                    <th className="px-6 py-3 text-center">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {yearOverYear.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-3 font-medium">{item.metric}</td>
                      <td className="px-6 py-3 text-center">{item.y2024}</td>
                      <td className="px-6 py-3 text-center font-semibold">{item.y2025}</td>
                      <td className={`px-6 py-3 text-center font-bold ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                        {item.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                      item.range.includes('700') ? 'bg-green-600' :
                      item.range.includes('680') ? 'bg-green-500' :
                      item.range.includes('650') ? 'bg-green-400' :
                      item.range.includes('600') ? 'bg-emerald-500' :
                      item.range.includes('550') ? 'bg-emerald-400' :
                      item.range.includes('500') ? 'bg-teal-400' :
                      'bg-gray-400'
                    }`}
                    style={{ width: `${item.percentage * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-green-600 group-open:rotate-180 transition-transform">▼</span>
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

      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our NEET 2026 Batch</h2>
          <p className="text-xl text-green-100 mb-8">Be part of our continued success. Admissions open now!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/neet-result-2024-gurugram" className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
              See 2024 Results<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'NEET 2025 Results - Cerebrum Biology Academy Gurugram',
        description: '97% success rate with 15 students scoring 650+ and 4 in top 5000 AIR',
        author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        publisher: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        datePublished: '2025-06-15',
        dateModified: '2025-06-15',
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      }) }} />
    </div>
  )
}
