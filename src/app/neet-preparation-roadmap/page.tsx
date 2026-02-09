import { Metadata } from 'next'
import { FAQSchema } from '@/components/seo'

export const metadata: Metadata = {
  title: 'NEET 2026 Preparation Roadmap | Month-by-Month Study Plan',
  description:
    'Complete NEET 2026 preparation roadmap with month-by-month study plan, chapter-wise timeline, revision strategy, and mock test schedule by Cerebrum Biology Academy.',
  keywords: [
    'neet preparation roadmap',
    'neet 2026 study plan',
    'neet preparation timeline',
    'neet month wise plan',
    'neet biology roadmap',
    'neet study schedule',
  ],
  openGraph: {
    title: 'NEET 2026 Preparation Roadmap | Month-by-Month Study Plan',
    description:
      'Complete NEET 2026 preparation roadmap with month-by-month study plan, chapter-wise timeline, revision strategy, and mock test schedule.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-preparation-roadmap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET 2026 Preparation Roadmap | Month-by-Month Study Plan',
    description:
      'Complete NEET 2026 preparation roadmap with month-by-month study plan, chapter-wise timeline, revision strategy, and mock test schedule.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-preparation-roadmap',
  },
}

const faqQuestions = [
  {
    question: 'When should I start preparing for NEET 2026?',
    answer:
      'The ideal time to start NEET preparation is at the beginning of class 11 (February onwards). This gives you 18-24 months to thoroughly cover the NCERT curriculum, practice numericals, and attempt mock tests. If you\'re starting late, focus on high-weightage chapters first and increase your daily study hours accordingly.',
  },
  {
    question: 'How many hours per day should I study for NEET?',
    answer:
      'During the initial phase (Feb-May), 4-5 hours of focused study is sufficient. As you progress (Jun-Sep), increase to 6-7 hours. During revision and mock test phases (Oct-Nov), aim for 8-10 hours of quality preparation. Remember, quality matters more than quantity. Focus on understanding concepts deeply rather than rote memorization.',
  },
  {
    question: 'Which chapters have the highest weightage in NEET Biology?',
    answer:
      'High-priority chapters (40% weightage): Cell Biology, Genetics, Evolution, Human Physiology, Plant Physiology. Medium-priority chapters (35% weightage): Reproduction, Ecology, Botany. Low-priority chapters (25% weightage): Microorganisms, Immunology, Digestion. Always prioritize high and medium-weightage chapters while ensuring complete syllabus coverage.',
  },
  {
    question: 'How should I approach revision for NEET?',
    answer:
      'Revision is crucial for NEET success. Our 3-revision-cycle approach ensures comprehensive coverage: Cycle 1 (Oct) - Revise concepts and short notes. Cycle 2 (Mid-Nov) - Solve practice problems and previous year questions. Cycle 3 (Dec) - Attempt full-length mock tests and weak-area focus. Each revision cycle should be shorter but more intense than the previous one.',
  },
  {
    question: 'What is the importance of mock tests in NEET preparation?',
    answer:
      'Mock tests are essential for NEET success. They help you understand the exam pattern, build time management skills, identify weak areas, and boost confidence. Start taking mock tests from October onwards. Aim for 2-3 full-length mock tests per week. Analyze your performance, identify mistakes, and focus on improvement areas. This practice is crucial for achieving 600+ scores.',
  },
]

const monthlyRoadmap = [
  {
    month: 'February',
    focus: 'Foundation Building',
    chapters: ['Plant Kingdom', 'Animal Kingdom', 'Cell Structure & Function', 'Biomolecules'],
    hoursPerDay: '4-5 hours',
    tips: 'Focus on understanding basic concepts. Use NCERT textbooks and create mind maps for each chapter.',
  },
  {
    month: 'March',
    focus: 'Cell Biology & Diversity',
    chapters: ['Cell Division', 'Cell Signaling', 'Photosynthesis', 'Respiration'],
    hoursPerDay: '4-5 hours',
    tips: 'Practice diagrams extensively. Understand mechanisms of cell division and cellular processes.',
  },
  {
    month: 'April',
    focus: 'Class 12 Introduction',
    chapters: ['Reproduction in Organisms', 'Sexual Reproduction in Flowering Plants', 'Human Reproduction'],
    hoursPerDay: '5-6 hours',
    tips: 'Start class 12 syllabus. Create flowcharts for reproductive processes. Focus on gametogenesis.',
  },
  {
    month: 'May',
    focus: 'Genetics Foundation',
    chapters: ['Principles of Inheritance', 'Molecular Basis of Inheritance', 'Chromosomal Disorders'],
    hoursPerDay: '5-6 hours',
    tips: 'Solve genetics problems daily. Practice Punnett squares and pedigree analysis.',
  },
  {
    month: 'June',
    focus: 'Human Physiology Deep Dive',
    chapters: ['Digestion & Nutrition', 'Respiration', 'Circulation', 'Excretion'],
    hoursPerDay: '6-7 hours',
    tips: 'Create flowcharts for physiological processes. Study hormone mechanisms and reflex arcs.',
  },
  {
    month: 'July',
    focus: 'Plant Physiology & Hormones',
    chapters: ['Transport in Plants', 'Plant Hormones', 'Photosynthesis', 'Respiration'],
    hoursPerDay: '6-7 hours',
    tips: 'Understand hormone actions and transport mechanisms. Practice numerical problems.',
  },
  {
    month: 'August',
    focus: 'Reproduction Complete',
    chapters: ['Male & Female Reproductive Systems', 'Gametogenesis', 'Fertilization', 'Fetal Development'],
    hoursPerDay: '6-7 hours',
    tips: 'Master contraceptive methods and reproductive disorders. Study lactation and menopause.',
  },
  {
    month: 'September',
    focus: 'Ecology & Evolution',
    chapters: ['Ecology', 'Biodiversity', 'Environmental Issues', 'Evolution'],
    hoursPerDay: '6-7 hours',
    tips: 'Study ecosystem components, food chains, and biodiversity conservation. Focus on evolution mechanisms.',
  },
  {
    month: 'October',
    focus: 'Revision Cycle 1 - Full Coverage',
    chapters: 'All chapters covered (Feb-Sep)',
    hoursPerDay: '7-8 hours',
    tips: 'Complete one full revision of all concepts. Solve practice papers from each unit.',
  },
  {
    month: 'November',
    focus: 'Mock Tests & Weak Areas',
    chapters: 'Focus on weak chapters from previous tests',
    hoursPerDay: '8-9 hours',
    tips: 'Take 2-3 full-length mock tests weekly. Analyze mistakes and revise weak areas immediately.',
  },
  {
    month: 'December',
    focus: 'Final Revision & Exam Strategy',
    chapters: 'High-priority chapters and previous year questions',
    hoursPerDay: '8-10 hours',
    tips: 'Focus on high-weightage chapters. Practice time management. Study exam day strategies.',
  },
]

const biologyChapters = [
  { chapter: 'Cell Structure & Function', priority: 'High', weightage: '7-8%' },
  { chapter: 'Cell Division (Mitosis & Meiosis)', priority: 'High', weightage: '6-7%' },
  { chapter: 'Plant Kingdom', priority: 'High', weightage: '5-6%' },
  { chapter: 'Animal Kingdom', priority: 'High', weightage: '5-6%' },
  { chapter: 'Molecular Basis of Inheritance', priority: 'High', weightage: '7-8%' },
  { chapter: 'Inheritance Patterns & Linkage', priority: 'High', weightage: '6-7%' },
  { chapter: 'Evolution', priority: 'High', weightage: '6-7%' },
  { chapter: 'Human Digestion & Nutrition', priority: 'High', weightage: '5-6%' },
  { chapter: 'Human Respiration & Circulation', priority: 'High', weightage: '6-7%' },
  { chapter: 'Excretion & Osmoregulation', priority: 'High', weightage: '4-5%' },
  { chapter: 'Neural Control & Coordination', priority: 'High', weightage: '5-6%' },
  { chapter: 'Reproduction in Plants', priority: 'Medium', weightage: '5-6%' },
  { chapter: 'Reproduction in Humans', priority: 'Medium', weightage: '5-6%' },
  { chapter: 'Photosynthesis', priority: 'Medium', weightage: '4-5%' },
  { chapter: 'Plant Hormones & Movements', priority: 'Medium', weightage: '4-5%' },
  { chapter: 'Ecology & Ecosystems', priority: 'Medium', weightage: '5-6%' },
  { chapter: 'Biodiversity & Conservation', priority: 'Medium', weightage: '4-5%' },
  { chapter: 'Microorganisms & Disease', priority: 'Low', weightage: '3-4%' },
  { chapter: 'Immunology', priority: 'Low', weightage: '3-4%' },
  { chapter: 'Biotechnology', priority: 'Low', weightage: '4-5%' },
]

export default function NEETPreparationRoadmapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqQuestions.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
            url: 'https://cerebrumbiologyacademy.com/neet-preparation-roadmap',
          }),
        }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                NEET 2026 Preparation Roadmap
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto">
                Comprehensive Month-by-Month Study Plan with Chapter-wise Timeline, Revision Strategy &
                Mock Test Schedule
              </p>
              <p className="text-lg text-slate-300 mb-10">
                Designed by Cerebrum Biology Academy experts to help you achieve 600+ scores
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/918826444334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-lg transition-colors inline-block"
                >
                  Book Free Demo Class
                </a>
                <a
                  href="tel:+918826444334"
                  className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-900 font-bold py-3 px-8 rounded-lg transition-colors inline-block"
                >
                  Call +91-88264-44334
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 12-Month Timeline Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              12-Month Preparation Timeline
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              A strategic month-by-month breakdown covering curriculum completion, deep learning, revision cycles, and
              mock test practice
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monthlyRoadmap.map((month, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{month.month}</h3>
                      <p className="text-sm text-yellow-600 font-semibold">{month.focus}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {month.hoursPerDay}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Key Chapters:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {(Array.isArray(month.chapters) ? month.chapters : [month.chapters]).map(
                          (chapter, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>{chapter}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-slate-700">Tip: </span>
                        {month.tips}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Biology Chapters Priority Table */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              Biology Chapter-wise NEET Weightage & Priority
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Strategic chapter prioritization based on NEET weightage analysis. Focus on high-priority chapters while
              ensuring complete syllabus coverage.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Chapter Name</th>
                    <th className="px-6 py-4 text-center font-semibold">Priority Level</th>
                    <th className="px-6 py-4 text-center font-semibold">NEET Weightage</th>
                  </tr>
                </thead>
                <tbody>
                  {biologyChapters.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">{item.chapter}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            item.priority === 'High'
                              ? 'bg-red-100 text-red-800'
                              : item.priority === 'Medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-slate-700 font-semibold">{item.weightage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-slate-900 mb-3">Priority Distribution:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-red-700 font-semibold mb-1">High Priority: 40%</p>
                  <p className="text-sm text-gray-600">12 chapters covering core concepts like Cell Biology, Genetics,
                  Evolution, Physiology</p>
                </div>
                <div>
                  <p className="text-yellow-700 font-semibold mb-1">Medium Priority: 35%</p>
                  <p className="text-sm text-gray-600">6 chapters covering Reproduction, Ecology, Plant Physiology</p>
                </div>
                <div>
                  <p className="text-blue-700 font-semibold mb-1">Low Priority: 25%</p>
                  <p className="text-sm text-gray-600">5 chapters covering Microbes, Immunity, Biotechnology</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Revision Strategy Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              3-Cycle Revision Strategy for NEET Success
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Strategic revision approach to maximize retention and exam readiness
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cycle 1 */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 text-green-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Revision Cycle 1</h3>
                </div>
                <p className="text-gray-600 mb-4 font-semibold">October (4 weeks)</p>

                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-3">•</span>
                    <span>Complete concept revision with short notes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-3">•</span>
                    <span>Review mind maps and diagrams created during learning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-3">•</span>
                    <span>Solve NCERT exercise questions from each chapter</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-3">•</span>
                    <span>Duration: 7-8 hours per day of focused study</span>
                  </li>
                </ul>
              </div>

              {/* Cycle 2 */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-yellow-500">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 text-yellow-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Revision Cycle 2</h3>
                </div>
                <p className="text-gray-600 mb-4 font-semibold">Mid-November (2-3 weeks)</p>

                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-500 font-bold mr-3">•</span>
                    <span>Solve previous year NEET questions (last 5 years)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 font-bold mr-3">•</span>
                    <span>Practice problem-solving from coaching materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 font-bold mr-3">•</span>
                    <span>Identify and focus on weak chapters and concepts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 font-bold mr-3">•</span>
                    <span>Duration: 8-9 hours per day with emphasis on weak areas</span>
                  </li>
                </ul>
              </div>

              {/* Cycle 3 */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Revision Cycle 3</h3>
                </div>
                <p className="text-gray-600 mb-4 font-semibold">Late November & December (2-3 weeks)</p>

                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-3">•</span>
                    <span>Rapid revision of high-priority chapters only</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-3">•</span>
                    <span>Quick review of formulas, mechanisms, and definitions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-3">•</span>
                    <span>Study exam day strategies and time management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-3">•</span>
                    <span>Duration: 6-8 hours with focus on confidence building</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mock Test Schedule Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              Mock Test Schedule & Strategy
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Strategic mock test plan to master exam pattern, build speed, and identify improvement areas
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* September */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 font-bold">
                    1
                  </span>
                  September: Foundation Mocks
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 font-bold">✓</span>
                    <span>
                      <strong>Week 1-2:</strong> Chapter-wise mock tests (individual chapters)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 font-bold">✓</span>
                    <span>
                      <strong>Week 3-4:</strong> Unit-wise mock tests (3-4 related chapters)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 font-bold">✓</span>
                    <span>Frequency: 1 test per day, 30-45 minutes duration</span>
                  </li>
                </ul>
              </div>

              {/* October */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <span className="bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 font-bold">
                    2
                  </span>
                  October: Mini Full-length Mocks
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-3 font-bold">✓</span>
                    <span>
                      <strong>Weeks 1-4:</strong> Half-syllabus mock tests (Bio Part 1 & 2)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-3 font-bold">✓</span>
                    <span>Duration: 90 minutes per mock test</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-3 font-bold">✓</span>
                    <span>Frequency: 2-3 tests per week with thorough analysis</span>
                  </li>
                </ul>
              </div>

              {/* November */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 font-bold">
                    3
                  </span>
                  November: Full-length Mocks
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 font-bold">✓</span>
                    <span>
                      <strong>Weeks 1-3:</strong> Complete 180-minute full-length NEET mocks
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 font-bold">✓</span>
                    <span>Frequency: 2-3 full-length tests per week</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 font-bold">✓</span>
                    <span>Deep analysis of mistakes and weak areas post-test</span>
                  </li>
                </ul>
              </div>

              {/* December */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <span className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 font-bold">
                    4
                  </span>
                  December: Speed & Accuracy
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 font-bold">✓</span>
                    <span>
                      <strong>Weeks 1-2:</strong> Final full-length mocks to finalize strategy
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 font-bold">✓</span>
                    <span>Focus on speed improvement and negative mark management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 font-bold">✓</span>
                    <span>
                      <strong>Week 3:</strong> Light revision, relaxation, exam strategy review
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Post-Mock Test Analysis Framework</h3>
              <p className="text-gray-700 mb-6">
                Every mock test should be followed by thorough analysis to maximize learning:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-slate-900 mb-2">1. Score Analysis</p>
                  <p className="text-sm text-gray-600">Track accuracy rate, correct/incorrect/skipped questions</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-slate-900 mb-2">2. Time Management</p>
                  <p className="text-sm text-gray-600">Analyze time spent per section and question type</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-slate-900 mb-2">3. Error Patterns</p>
                  <p className="text-sm text-gray-600">Identify conceptual vs careless mistakes</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-slate-900 mb-2">4. Improvement Plan</p>
                  <p className="text-sm text-gray-600">Create action plan to address weak areas</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Answers to common questions about NEET preparation timeline and strategy
            </p>

            <div className="space-y-6 max-w-4xl mx-auto">
              {faqQuestions.map((item, index) => (
                <details
                  key={index}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-slate-50 transition-colors">
                    <h3 className="font-semibold text-lg text-slate-900 pr-4">{item.question}</h3>
                    <span className="text-slate-500 group-open:rotate-180 transition-transform flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-6 pt-0 text-gray-700 border-t border-slate-100">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Master Your NEET 2026 Preparation?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Get personalized guidance from Cerebrum Biology Academy experts. Book your free demo class today and learn
              how our proven teaching methodology can help you achieve 600+ scores.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/918826444334"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-4 px-10 rounded-lg transition-colors inline-block text-lg"
              >
                WhatsApp Us Now
              </a>
              <a
                href="tel:+918826444334"
                className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-blue-900 font-bold py-4 px-10 rounded-lg transition-colors inline-block text-lg"
              >
                Call +91-88264-44334
              </a>
            </div>

            <p className="text-blue-200 mt-8">
              Free demo class available for NEET aspirants in Gurugram, Delhi, Noida, and online
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
