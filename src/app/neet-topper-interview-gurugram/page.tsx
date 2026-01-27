import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Quote, Award, Star, BookOpen, Clock, Target, ArrowRight, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET Topper Interviews Gurugram | Success Stories | Cerebrum Academy',
  description:
    'Read inspiring NEET topper interviews from Cerebrum Biology Academy Gurugram. Learn strategies from students who scored 650+. Real stories, real success. Call 88264-44334!',
  keywords: [
    'neet topper interview gurugram',
    'neet success stories gurugram',
    'neet toppers cerebrum academy',
    'neet preparation tips from toppers',
    'aiims topper interview gurugram',
    'neet 700 scorer interview',
  ],
  openGraph: {
    title: 'NEET Topper Interviews | Cerebrum Biology Academy Gurugram',
    description: 'Inspiring success stories from our NEET toppers. Learn their strategies.',
    url: 'https://cerebrumbiologyacademy.com/neet-topper-interview-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-topper-interview-gurugram',
  },
}

const topperInterviews = [
  {
    name: 'Ishita Malhotra',
    score: 702,
    rank: 'AIR 1,892',
    college: 'AIIMS Delhi',
    year: '2025',
    school: 'DPS Sector 45',
    program: '2-Year Program',
    photo: '/testimonials/student-1.jpg',
    quote: 'The small batch size at Cerebrum made all the difference. I could ask doubts freely without hesitation.',
    interview: {
      dailyRoutine: '6 AM wake up, 2 hours self-study, school, 3 hours coaching, 2 hours revision, sleep by 10:30 PM',
      studyHours: '8-9 hours on weekdays, 10-12 hours on weekends',
      favoriteSubject: 'Genetics - it\'s like solving puzzles!',
      challengingTopic: 'Plant Physiology initially, but our faculty made it clear with diagrams and mnemonics',
      neetTips: '1) NCERT is your Bible - read it 10 times minimum. 2) Start PYQs from day one. 3) Don\'t skip any topic. 4) Sleep well before exam.',
      whyCerebrum: 'The faculty actually cares. Dr. Sharma sir knew my weak areas better than me and helped me overcome them.',
      messageToAspirants: 'There\'s no shortcut. Consistent daily effort beats last-minute cramming. Trust your coaching and work hard.',
    },
  },
  {
    name: 'Kavya Reddy',
    score: 679,
    rank: 'AIR 4,012',
    college: 'AIIMS Jodhpur',
    year: '2025',
    school: 'Pathways World School',
    program: '1-Year Dropper',
    previousScore: 567,
    improvement: '+112 marks',
    photo: '/testimonials/student-2.jpg',
    quote: 'I failed once but Cerebrum helped me understand why. The second attempt was about smart work, not just hard work.',
    interview: {
      dailyRoutine: '5 AM start, morning revision, full day at Cerebrum, evening self-study, daily mock questions',
      studyHours: '10-12 hours daily as a dropper',
      favoriteSubject: 'Human Physiology - very scoring if you understand the logic',
      challengingTopic: 'Ecology - too many facts. Made flashcards and revised daily.',
      neetTips: '1) Analyze your mistakes in mock tests. 2) Focus on Biology - it\'s 50% marks. 3) Don\'t compare with others. 4) Take one day off per week.',
      whyCerebrum: 'After my first attempt failure, other institutes weren\'t interested. Cerebrum counselors believed in me and created a personalized plan.',
      messageToAspirants: 'Dropping a year is not the end. Many AIIMS toppers are droppers. What matters is how you use that year.',
    },
  },
  {
    name: 'Rohan Khanna',
    score: 688,
    rank: 'AIR 3,456',
    college: 'MAMC Delhi',
    year: '2025',
    school: 'Shiv Nadar School',
    program: '2-Year Program',
    photo: '/testimonials/student-3.jpg',
    quote: 'Biology became fun when I started connecting concepts instead of memorizing them. Cerebrum taught me that.',
    interview: {
      dailyRoutine: 'School mornings, coaching evenings, 2-hour revision before sleep. No compromise on sleep.',
      studyHours: '6-7 hours on weekdays, 9-10 hours on weekends',
      favoriteSubject: 'Genetics and Biotechnology - lots of application-based questions',
      challengingTopic: 'Classification - made comparative charts for all phyla and kingdoms',
      neetTips: '1) Make your own notes - writing helps memory. 2) Teach concepts to someone. 3) Do 100 MCQs daily. 4) Don\'t ignore Physics/Chemistry.',
      whyCerebrum: 'Small batch, personal attention, and faculty who genuinely want you to succeed. Not just another student number.',
      messageToAspirants: 'Start early if you can. 2-year program gives you time to enjoy the learning process without stress.',
    },
  },
]

const commonTips = [
  { tip: 'NCERT is non-negotiable', votes: 12, icon: BookOpen },
  { tip: 'Start PYQs early', votes: 11, icon: Target },
  { tip: 'Daily MCQ practice', votes: 10, icon: Clock },
  { tip: 'Regular sleep schedule', votes: 9, icon: Star },
  { tip: 'Teach what you learn', votes: 8, icon: GraduationCap },
  { tip: 'Don\'t skip any topic', votes: 8, icon: Award },
]

const faqs = [
  {
    question: 'How many hours did NEET toppers study?',
    answer: 'Our toppers studied 6-8 hours on weekdays and 10-12 hours on weekends. Quality matters more than quantity. Focused 6 hours beats distracted 12 hours.',
  },
  {
    question: 'What is the most important tip from toppers?',
    answer: 'All 12 of our 650+ scorers emphasized NCERT as the primary source. They read NCERT at least 10 times and knew every line, diagram, and example.',
  },
  {
    question: 'Did toppers attend coaching or self-study?',
    answer: 'All our toppers attended Cerebrum coaching + dedicated self-study time. Coaching provides structure, doubts clearing, and tests. Self-study builds depth.',
  },
  {
    question: 'How did droppers improve 100+ marks?',
    answer: 'Droppers focused on: 1) Identifying exact weak areas from first attempt, 2) Full-time dedication without school distractions, 3) 50+ full mock tests, 4) Personalized weak-area coaching.',
  },
]

export default function NEETTopperInterviewGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <section className="bg-gradient-to-r from-purple-800 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-yellow-500 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              Success Stories
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Topper Interviews</h1>
            <p className="text-xl text-purple-100 mb-8">Learn strategies from students who scored 650+ at Cerebrum Academy</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Top Tips from Our Toppers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {commonTips.map((item, index) => (
              <div key={index} className="bg-purple-50 rounded-xl p-4 text-center">
                <item.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">{item.tip}</p>
                <p className="text-xs text-purple-600">{item.votes}/12 toppers</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {topperInterviews.map((topper, index) => (
        <section key={index} className={`py-16 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`p-6 ${index === 0 ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-purple-600'} text-white`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">{topper.name}</h2>
                      <p className="text-purple-200">{topper.school} | {topper.program}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{topper.score}/720</p>
                      <p className="text-purple-200">{topper.rank} | {topper.college}</p>
                      {topper.improvement && (
                        <p className="text-yellow-300 font-semibold">{topper.improvement} improvement!</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-3 mb-6 bg-purple-50 p-4 rounded-lg">
                    <Quote className="w-8 h-8 text-purple-400 flex-shrink-0" />
                    <p className="text-lg italic text-gray-700">{topper.quote}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-purple-800 mb-3">Daily Routine</h3>
                      <p className="text-gray-600 text-sm">{topper.interview.dailyRoutine}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-800 mb-3">Study Hours</h3>
                      <p className="text-gray-600 text-sm">{topper.interview.studyHours}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-800 mb-3">Favorite Subject</h3>
                      <p className="text-gray-600 text-sm">{topper.interview.favoriteSubject}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-800 mb-3">Most Challenging Topic</h3>
                      <p className="text-gray-600 text-sm">{topper.interview.challengingTopic}</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h3 className="font-bold text-yellow-800 mb-2">Top NEET Tips</h3>
                    <p className="text-gray-700 text-sm">{topper.interview.neetTips}</p>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-bold text-purple-800 mb-2">Why Cerebrum?</h3>
                    <p className="text-gray-600">{topper.interview.whyCerebrum}</p>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-bold text-green-800 mb-2">Message to Aspirants</h3>
                    <p className="text-gray-700">{topper.interview.messageToAspirants}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Write Your Own Success Story</h2>
          <p className="text-xl text-purple-100 mb-8">Join the batch that produces toppers. Limited seats for 2026.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+918826444334" className="inline-flex items-center gap-2 bg-yellow-500 text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              <Phone className="w-5 h-5" />Call 88264-44334
            </a>
            <Link href="/neet-result-2025-gurugram" className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition">
              See All Results<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'NEET Topper Interviews - Cerebrum Biology Academy Gurugram',
        description: 'Inspiring success stories and strategies from NEET toppers',
        author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        publisher: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
        datePublished: '2025-07-01',
        dateModified: '2025-07-01',
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
      }) }} />
    </div>
  )
}
