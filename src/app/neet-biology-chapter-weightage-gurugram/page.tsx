import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, BookOpen, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Biology Chapter Weightage 2026 | Important Topics',
  description:
    'NEET Biology chapter-wise weightage 2026. Human Physiology (20%), Genetics (18%), Plant Biology (15%). Focus on high-weightage chapters. Expert guidance at Cerebrum. Call 88264-44334!',
  keywords: [
    'neet biology chapter weightage',
    'neet biology important chapters',
    'neet biology marks distribution',
    'high weightage topics neet biology',
    'neet 2026 biology syllabus weightage',
    'neet biology preparation gurugram',
  ],
  openGraph: {
    title: 'NEET Biology Chapter Weightage 2026 | Marks Distribution',
    description: 'Complete chapter-wise weightage for NEET Biology. Know which topics to focus on.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-chapter-weightage-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-chapter-weightage-gurugram',
  },
}

const quickAnswer = {
  question: 'What is the chapter-wise weightage for NEET Biology 2026?',
  answer: 'NEET Biology has 90 questions worth 360 marks. Top weightage chapters: Human Physiology (20%, 18 Qs), Genetics & Evolution (18%, 16 Qs), Plant Physiology (12%, 11 Qs), Cell Biology (10%, 9 Qs), Ecology (10%, 9 Qs). Class 11 contributes 40% and Class 12 contributes 60% of questions.',
}

const chapterWeightage = [
  { chapter: 'Human Physiology', class: '12', weightage: 20, questions: 18, marks: 72, priority: 'Highest' },
  { chapter: 'Genetics & Evolution', class: '12', weightage: 18, questions: 16, marks: 64, priority: 'Highest' },
  { chapter: 'Plant Physiology', class: '11', weightage: 12, questions: 11, marks: 44, priority: 'High' },
  { chapter: 'Cell Biology & Cell Division', class: '11', weightage: 10, questions: 9, marks: 36, priority: 'High' },
  { chapter: 'Ecology & Environment', class: '12', weightage: 10, questions: 9, marks: 36, priority: 'High' },
  { chapter: 'Reproduction', class: '12', weightage: 9, questions: 8, marks: 32, priority: 'High' },
  { chapter: 'Biotechnology', class: '12', weightage: 8, questions: 7, marks: 28, priority: 'Medium' },
  { chapter: 'Plant & Animal Diversity', class: '11', weightage: 7, questions: 6, marks: 24, priority: 'Medium' },
  { chapter: 'Structural Organisation', class: '11', weightage: 4, questions: 4, marks: 16, priority: 'Low' },
  { chapter: 'Biomolecules', class: '11', weightage: 2, questions: 2, marks: 8, priority: 'Low' },
]

const topPriorityTopics = [
  { topic: 'Digestion & Absorption', chapter: 'Human Physiology', questions: '3-4' },
  { topic: 'Breathing & Exchange of Gases', chapter: 'Human Physiology', questions: '2-3' },
  { topic: 'Excretory Products', chapter: 'Human Physiology', questions: '2-3' },
  { topic: 'Principles of Inheritance', chapter: 'Genetics', questions: '4-5' },
  { topic: 'Molecular Basis of Inheritance', chapter: 'Genetics', questions: '3-4' },
  { topic: 'Photosynthesis', chapter: 'Plant Physiology', questions: '3-4' },
  { topic: 'Plant Growth & Movement', chapter: 'Plant Physiology', questions: '2-3' },
  { topic: 'Ecosystem', chapter: 'Ecology', questions: '3-4' },
  { topic: 'Biodiversity', chapter: 'Ecology', questions: '2-3' },
  { topic: 'Human Reproduction', chapter: 'Reproduction', questions: '3-4' },
]

const classWiseDistribution = [
  { class: 'Class 11', percentage: 40, questions: 36, marks: 144 },
  { class: 'Class 12', percentage: 60, questions: 54, marks: 216 },
]

const preparationStrategy = [
  { phase: 'Phase 1 (First 3 months)', focus: 'Class 11 basics + Human Physiology', chapters: 'Cell Biology, Plant Anatomy, Digestion, Respiration' },
  { phase: 'Phase 2 (Next 3 months)', focus: 'Genetics + Plant Physiology', chapters: 'Inheritance, DNA/RNA, Photosynthesis, Mineral Nutrition' },
  { phase: 'Phase 3 (Next 2 months)', focus: 'Ecology + Reproduction', chapters: 'Ecosystem, Biodiversity, Human & Plant Reproduction' },
  { phase: 'Phase 4 (Final 2 months)', focus: 'Revision + Mock Tests', chapters: 'All high-weightage chapters + Previous Year Questions' },
]

const faqs = [
  {
    question: 'Which chapters have highest weightage in NEET Biology?',
    answer: 'Human Physiology (20%), Genetics & Evolution (18%), and Plant Physiology (12%) together contribute 50% of NEET Biology marks. Focus maximum time on these three areas.',
  },
  {
    question: 'Is Class 11 or Class 12 Biology more important for NEET?',
    answer: 'Class 12 Biology is more important with 60% weightage (54 questions). However, Class 11 forms the foundation. Don\'t skip Class 11 - topics like Cell Biology and Plant Diversity are frequently asked.',
  },
  {
    question: 'How many questions come from NCERT in NEET Biology?',
    answer: 'About 95% of NEET Biology questions are directly from NCERT or based on NCERT concepts. Read NCERT line-by-line at least 5-7 times. Every diagram, example, and footnote is important.',
  },
  {
    question: 'What is the best strategy for NEET Biology preparation?',
    answer: 'Strategy: 1) Master NCERT thoroughly, 2) Focus on high-weightage chapters first (Human Physiology, Genetics), 3) Practice 50+ MCQs daily, 4) Solve last 10 years PYQs chapter-wise, 5) Take weekly mock tests.',
  },
]

export default function NEETBiologyChapterWeightageGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Quick Answer */}
      <section className="bg-gradient-to-r from-teal-700 to-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{quickAnswer.question}</h1>
              <p className="text-lg text-teal-100 leading-relaxed">{quickAnswer.answer}</p>
              <div className="mt-4 flex items-center gap-2 text-yellow-300">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">Total: 90 Questions | 360 Marks | Focus on top 5 chapters = 70% marks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Weightage Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">NEET Biology Chapter-wise Weightage 2026</h2>
          <p className="text-center text-gray-600 mb-8">Based on analysis of last 10 years NEET papers</p>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-teal-600 text-white">
                  <th className="px-4 py-3 text-left">Chapter</th>
                  <th className="px-4 py-3 text-center">Class</th>
                  <th className="px-4 py-3 text-center">Weightage</th>
                  <th className="px-4 py-3 text-center">Questions</th>
                  <th className="px-4 py-3 text-center">Marks</th>
                  <th className="px-4 py-3 text-center">Priority</th>
                </tr>
              </thead>
              <tbody>
                {chapterWeightage.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-medium">{item.chapter}</td>
                    <td className="px-4 py-3 text-center">{item.class}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${item.weightage * 5}%` }} />
                        </div>
                        <span className="font-semibold">{item.weightage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">{item.questions}</td>
                    <td className="px-4 py-3 text-center font-semibold text-teal-600">{item.marks}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.priority === 'Highest' ? 'bg-red-100 text-red-700' :
                        item.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                        item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>{item.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-teal-100 font-bold">
                  <td className="px-4 py-3">Total</td>
                  <td className="px-4 py-3 text-center">-</td>
                  <td className="px-4 py-3 text-center">100%</td>
                  <td className="px-4 py-3 text-center">90</td>
                  <td className="px-4 py-3 text-center text-teal-700">360</td>
                  <td className="px-4 py-3 text-center">-</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* Class-wise Distribution */}
      <section className="py-12 bg-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Class-wise Distribution</h2>
          <div className="flex justify-center gap-8 max-w-2xl mx-auto">
            {classWiseDistribution.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center flex-1">
                <h3 className="font-bold text-lg mb-2">{item.class}</h3>
                <p className="text-4xl font-bold text-teal-600">{item.percentage}%</p>
                <p className="text-gray-600">{item.questions} Questions</p>
                <p className="text-sm text-gray-500">{item.marks} Marks</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Priority Topics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Must-Study Topics (High Yield)</h2>
          <p className="text-center text-gray-600 mb-8">These 10 topics alone can fetch you 100+ marks</p>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {topPriorityTopics.map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.topic}</h3>
                  <p className="text-sm text-gray-600">{item.chapter}</p>
                </div>
                <div className="text-right">
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">{item.questions} Qs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Strategy */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">10-Month Preparation Strategy</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {preparationStrategy.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.phase}</h3>
                    <p className="text-teal-700 font-medium">{item.focus}</p>
                    <p className="text-gray-600 text-sm mt-1">Chapters: {item.chapters}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Coaching CTA */}
      <section className="py-12 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-xl mb-2">Don't Just Know Weightage - Master the Chapters</h3>
                <p className="text-gray-600">At Cerebrum Biology Academy, we don't just teach - we ensure you master every high-weightage chapter with:</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Chapter-wise detailed notes + diagrams',
                'Topic-wise MCQ practice (500+ per chapter)',
                'Weekly tests on high-weightage chapters',
                'Previous year questions analysis',
                'AIIMS faculty doubt clearing sessions',
                'Personalized weak area improvement plan',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className="text-teal-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/neet-coaching-gurugram" className="bg-white p-4 rounded-lg hover:shadow-md transition text-center">
              <h3 className="font-semibold text-teal-700">NEET Coaching</h3>
              <p className="text-sm text-gray-600">Join our expert batches</p>
            </Link>
            <Link href="/neet-success-rate-gurugram" className="bg-white p-4 rounded-lg hover:shadow-md transition text-center">
              <h3 className="font-semibold text-purple-700">Success Rate</h3>
              <p className="text-sm text-gray-600">98% qualification rate</p>
            </Link>
            <Link href="/neet-topper-interview-gurugram" className="bg-white p-4 rounded-lg hover:shadow-md transition text-center">
              <h3 className="font-semibold text-blue-700">Topper Tips</h3>
              <p className="text-sm text-gray-600">Learn from 650+ scorers</p>
            </Link>
            <Link href="/free-neet-demo-class-gurugram" className="bg-white p-4 rounded-lg hover:shadow-md transition text-center">
              <h3 className="font-semibold text-green-700">Free Demo</h3>
              <p className="text-sm text-gray-600">Experience our teaching</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Master High-Weightage Chapters with Experts</h2>
          <p className="text-xl text-teal-100 mb-8">AIIMS faculty. Chapter-wise mastery. 98% success rate.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/free-neet-demo-class-gurugram" className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
              Book Free Demo<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer }
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'NEET Biology Chapter-wise Weightage 2026',
        description: quickAnswer.answer,
        author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        publisher: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        datePublished: '2026-01-01',
        dateModified: '2026-01-27',
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Table',
        about: 'NEET Biology Chapter-wise Weightage 2026',
      }) }} />
    </div>
  )
}
