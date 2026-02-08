import type { Metadata } from 'next';

const BASE_URL = 'https://cerebrumbiologyacademy.com';
const articleUrl = `${BASE_URL}/neet-biology-preparation-3-months`;

export const metadata: Metadata = {
  title: 'How to Prepare Biology for NEET in 3 Months | 90-Day Study Plan',
  description: 'Complete 90-day NEET Biology study plan. Week-by-week breakdown, chapter priority, daily schedule, mock tests. Score 300+ in just 3 months with strategic preparation.',
  keywords: [
    'how to prepare biology for NEET in 3 months',
    'NEET biology 3 month study plan',
    'NEET biology 90 day preparation',
    'NEET biology crash course',
    '3 month NEET biology preparation',
    'NEET biology last 3 months',
  ],
  openGraph: {
    title: 'How to Prepare Biology for NEET in 3 Months | 90-Day Study Plan',
    description: 'Complete 90-day NEET Biology study plan with week-by-week breakdown and daily schedule.',
    type: 'article',
    url: articleUrl,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
  },
  alternates: {
    canonical: articleUrl,
  },
};

export default function NEETBiologyPreparation3Months() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Prepare Biology for NEET in 3 Months | 90-Day Study Plan',
    description: 'Complete 90-day NEET Biology study plan with week-by-week breakdown.',
    url: articleUrl,
    author: {
      '@type': 'Person',
      name: 'Dr. Shekhar',
      jobTitle: 'AIIMS-Trained Biology Faculty',
      organization: {
        '@type': 'Organization',
        name: 'Cerebrum Biology Academy',
      },
    },
    datePublished: '2026-02-08',
    dateModified: '2026-02-08',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How to Prepare Biology for NEET in 3 Months: Complete 90-Day Plan
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 text-sm mb-6 gap-4">
              <span className="font-semibold">By Dr. Shekhar, AIIMS-Trained Faculty</span>
              <span>|</span>
              <time dateTime="2026-02-08">February 8, 2026</time>
              <span>|</span>
              <span>20 min read</span>
            </div>
            <div className="h-1 w-20 bg-teal-600 rounded"></div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded">
              <p className="text-blue-900 font-semibold mb-2">Reality Check:</p>
              <p className="text-blue-800">Yes, you can prepare NEET Biology in 3 months. But it requires brutal honesty, strategic prioritization, and relentless execution. This is a crash course for the determined. Follow this plan religiously, and 300+ scores are achievable.</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
              Can You Really Prepare NEET Biology in 3 Months?
            </h2>
            <p>
              The honest answer: Yes, but only if you:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Study 6-8 hours daily, 6 days a week (absolutely non-negotiable)</li>
              <li>Prioritize ruthlessly—only high-weightage chapters</li>
              <li>Avoid deep dives into low-weightage topics (morphology, taxonomy)</li>
              <li>Have access to quality coaching or study materials</li>
              <li>Can take 50+ mock tests and analyze each one</li>
              <li>Maintain disciplined health (7-8 hours sleep)</li>
            </ul>

            <p className="bg-yellow-50 p-4 border-l-4 border-yellow-400 my-4">
              <strong>Expected Scores with This Plan:</strong> 280-320 range if you execute perfectly. Reaching 340+ in 3 months is possible but requires exceptional effort and pre-existing knowledge.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
              The 90-Day NEET Biology Plan: Overview
            </h2>
            <p>
              This plan focuses on ultra-high priority chapters only. You won't cover every chapter—that's intentional. We're optimizing for maximum score with limited time.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg my-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Chapters You MUST Master (75-80% of questions):</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Genetics (6-8 questions)</li>
                <li>Photosynthesis & Respiration (7-8 questions)</li>
                <li>Human Physiology - All units (8-10 questions)</li>
                <li>Cell Cycle & Division (4-5 questions)</li>
                <li>Molecular Biology - Replication, Transcription, Translation (4-5 questions)</li>
                <li>Reproduction (4-5 questions)</li>
                <li>Ecology & Evolution (4-6 questions)</li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">Total: 35-45 chapters/sub-topics covering 45-55 questions</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
              Month-by-Month Breakdown (90 Days)
            </h2>

            <div className="bg-blue-50 p-6 rounded-lg my-6 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">MONTH 1 (Days 1-30): Foundation & High-Priority Chapters</h3>

              <div className="space-y-4 mt-4">
                <div className="bg-white p-4 rounded border-l-4 border-blue-600">
                  <h4 className="font-bold text-gray-900">Week 1: Genetics (Days 1-7)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li><strong>Days 1-2:</strong> Mendel's laws, segregation, independent assortment</li>
                    <li><strong>Days 3-4:</strong> Punnett squares, test crosses, 3:1 and 9:3:3:1 ratios</li>
                    <li><strong>Days 5-6:</strong> Linkage, crossing over, chromosome mapping</li>
                    <li><strong>Day 7:</strong> Practice problems (30+ questions)</li>
                  </ul>
                  <p className="text-green-700 font-semibold mt-2">Target: 90% accuracy on genetic problems</p>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-blue-600">
                  <h4 className="font-bold text-gray-900">Week 2: Photosynthesis & Cellular Respiration (Days 8-14)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li><strong>Days 8-9:</strong> Light reactions, electron transport, ATP synthesis</li>
                    <li><strong>Days 10-11:</strong> Dark reactions (Calvin cycle), photorespiration</li>
                    <li><strong>Days 12-13:</strong> Respiration - glycolysis, Krebs cycle, ETC</li>
                    <li><strong>Day 14:</strong> Practice questions + diagrams (20+ Q)</li>
                  </ul>
                  <p className="text-green-700 font-semibold mt-2">Key: Master the step-by-step pathways completely</p>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-blue-600">
                  <h4 className="font-bold text-gray-900">Week 3: Cell Cycle & Division (Days 15-21)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li><strong>Days 15-16:</strong> Cell cycle phases, checkpoints, regulation</li>
                    <li><strong>Days 17-18:</strong> Mitosis in detail - all 4 phases</li>
                    <li><strong>Days 19-20:</strong> Meiosis I & II, significance of meiosis</li>
                    <li><strong>Day 21:</strong> Practice + diagrams (15+ Q)</li>
                  </ul>
                  <p className="text-green-700 font-semibold mt-2">Focus: Understand why each stage happens</p>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-blue-600">
                  <h4 className="font-bold text-gray-900">Week 4: Molecular Biology Part 1 (Days 22-30)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li><strong>Days 22-24:</strong> DNA structure, types of RNA, genetic code</li>
                    <li><strong>Days 25-27:</strong> DNA replication - Meselson-Stahl, semi-conservative model</li>
                    <li><strong>Days 28-30:</strong> Practice + revision (20+ Q)</li>
                  </ul>
                  <p className="text-green-700 font-semibold mt-2">Study Time: 40-45 hours for Month 1</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg my-6 border border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">MONTH 2 (Days 31-60): Physiology & Detailed Biology</h3>

              <div className="space-y-4 mt-4">
                <div className="bg-white p-4 rounded border-l-4 border-green-600">
                  <h4 className="font-bold text-gray-900">Week 5: Transcription & Translation (Days 31-37)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li><strong>Days 31-33:</strong> Transcription, promoter, terminator, types of RNA synthesis</li>
                    <li><strong>Days 34-36:</strong> Translation, codons, tRNA, ribosome, protein synthesis</li>
                    <li><strong>Day 37:</strong> Practice (15+ Q) + diagram practice</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-green-600">
                  <h4 className="font-bold text-gray-900">Week 6: Human Physiology Part 1 (Days 38-44)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li><strong>Days 38-39:</strong> Digestion - mouth, stomach, small intestine, enzymes</li>
                    <li><strong>Days 40-41:</strong> Absorption - transport mechanisms, villi</li>
                    <li><strong>Days 42-43:</strong> Nutrition, deficiency diseases, balanced diet</li>
                    <li><strong>Day 44:</strong> Practice (20+ Q)</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-green-600">
                  <h4 className="font-bold text-gray-900">Week 7: Human Physiology Part 2 (Days 45-51)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li><strong>Days 45-46:</strong> Respiration - breathing, gas exchange, oxygen transport</li>
                    <li><strong>Days 47-48:</strong> Circulation - heart structure, blood flow, vessels</li>
                    <li><strong>Days 49-50:</strong> Blood groups, clotting, immunity basics</li>
                    <li><strong>Day 51:</strong> Practice (25+ Q)</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-green-600">
                  <h4 className="font-bold text-gray-900">Week 8: Human Physiology Part 3 (Days 52-60)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li><strong>Days 52-53:</strong> Excretion - kidney structure and function, filtration</li>
                    <li><strong>Days 54-55:</strong> Nervous system - neuron, synapse, reflex arc</li>
                    <li><strong>Days 56-57:</strong> Brain and sense organs - eye, ear</li>
                    <li><strong>Days 58-60:</strong> Endocrine system, hormones, feedback mechanisms</li>
                  </ul>
                  <p className="text-green-700 font-semibold mt-2">Study Time: 50-60 hours for Month 2</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg my-6 border border-orange-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">MONTH 3 (Days 61-90): Remaining Topics & Intensive Testing</h3>

              <div className="space-y-4 mt-4">
                <div className="bg-white p-4 rounded border-l-4 border-orange-600">
                  <h4 className="font-bold text-gray-900">Week 9: Reproduction & Development (Days 61-67)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li><strong>Days 61-62:</strong> Gametogenesis - spermatogenesis, oogenesis</li>
                    <li><strong>Days 63-64:</strong> Reproductive organs, hormonal regulation, menstrual cycle</li>
                    <li><strong>Days 65-66:</strong> Fertilization, early embryonic development, placenta</li>
                    <li><strong>Day 67:</strong> Practice (15+ Q)</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-orange-600">
                  <h4 className="font-bold text-gray-900">Week 10: Ecology, Evolution & Biotechnology (Days 68-74)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li><strong>Days 68-69:</strong> Ecology - organism and environment, population</li>
                    <li><strong>Days 70-71:</strong> Community ecology, succession, biodiversity</li>
                    <li><strong>Days 72-73:</strong> Evolution - origin of life, natural selection</li>
                    <li><strong>Day 74:</strong> Practice (20+ Q)</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-orange-600">
                  <h4 className="font-bold text-gray-900">Weeks 11-12: Mock Tests & Revision (Days 75-90)</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li><strong>Days 75-85:</strong> 10 full-length mock tests (2 per day max)</li>
                    <li><strong>Days 86-89:</strong> Targeted revision of weak areas + concept refinement</li>
                    <li><strong>Days 89-90:</strong> Final 2 mock tests + confidence building</li>
                  </ul>
                  <p className="text-gray-600 text-sm mt-2">Each mock test should be followed by 1-hour detailed analysis</p>
                  <p className="text-green-700 font-semibold mt-2">Study Time: 40-45 hours for Month 3</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
              Daily Study Schedule for 3-Month Crash Course
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg my-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Daily 7-Hour Study Schedule</h3>
              <ul className="space-y-3">
                <li><strong className="text-teal-700">5:30-6:30 AM:</strong> Morning revision (previous day's notes)</li>
                <li><strong className="text-teal-700">6:30-9:00 AM:</strong> New concept learning (2.5 hours)</li>
                <li><strong className="text-teal-700">9:00-10:00 AM:</strong> Note-making and concept mapping (1 hour)</li>
                <li><strong className="text-teal-700">10:00-12:30 PM:</strong> Practice questions (2.5 hours, 20+ Q)</li>
                <li><strong className="text-teal-700">12:30-1:30 PM:</strong> Lunch + physical activity (mandatory)</li>
                <li><strong className="text-teal-700">1:30-2:30 PM:</strong> Review previous week's topics (1 hour)</li>
                <li><strong className="text-teal-700">2:30-4:30 PM:</strong> Practice questions from current topic (2 hours)</li>
                <li><strong className="text-teal-700">4:30-5:30 PM:</strong> Mock test practice or topic revision (1 hour)</li>
                <li><strong className="text-teal-700">5:30-6:30 PM:</strong> Rest + recreational activity</li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">Total daily biology study: 6-7 hours. This is intensive but sustainable for 3 months.</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
              Exam Strategy for the 3-Month Prepared Student
            </h2>

            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
              On Exam Day (Time Management for Biology Section):
            </h3>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>0-2 minutes:</strong> Read all 45 questions quickly, identify your strong and weak chapters</li>
              <li><strong>2-30 minutes:</strong> Attempt ultra-high confidence questions (target: 20-25 questions, aim for 20/25 correct)</li>
              <li><strong>30-50 minutes:</strong> Attempt medium-confidence questions (target: 15-20 questions, aim for 12/20 correct)</li>
              <li><strong>50-85 minutes:</strong> Return to difficult questions, use logic/elimination, guess intelligently</li>
              <li><strong>85-90 minutes:</strong> Final review, mark uncertain answers for re-check if time allows</li>
            </ul>

            <p className="bg-yellow-50 p-4 border-l-4 border-yellow-400 my-4">
              <strong>Expected Score Distribution:</strong> 20 correct + 12 correct + 5-8 from difficult attempts = 37-40 correct out of 45 = 280-320 marks
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
              What to Skip or Minimize (Time Management)
            </h2>

            <div className="bg-red-50 p-6 rounded-lg my-6 border border-red-200">
              <p className="text-gray-700 mb-4">In 3 months, skip these low-weightage topics entirely:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Detailed morphology of flowers and fruits</li>
                <li>Complete animal taxonomy and classification</li>
                <li>Bacterial and archaeal diversity (overview only)</li>
                <li>Detailed kingdom classification</li>
                <li>Photosynthesis in lower plants (bacteria)</li>
                <li>Geological time scale details</li>
                <li>Conservation biology deep dives</li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">These topics account for only 5-10% of questions. Skipping them saves 40+ study hours.</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
              Mock Test Strategy During Months
            </h2>

            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
              Month 1 & 2: Mini Tests Only
            </h3>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Weekly 30-minute chapter tests (10-15 questions)</li>
              <li>Focus: Accuracy over speed</li>
              <li>Target: 80%+ accuracy on each chapter test</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
              Month 3: Full-Length Tests
            </h3>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Weeks 1-2: 2-3 full mock tests (all subjects or biology only)</li>
              <li>Weeks 3: 4-5 full mock tests</li>
              <li>Days before exam: 2 final full tests</li>
              <li>Total: 10-15 full-length tests in Month 3</li>
            </ul>

            <p className="bg-green-50 p-4 border-l-4 border-green-500 my-4">
              <strong>Critical Rule:</strong> Every mock test must be analyzed for 45-60 minutes. Note every mistake, identify the concept gap, mark it in your error log. This analysis is more valuable than taking the test.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
              Resources Needed for 3-Month Preparation
            </h2>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>NCERT Biology (Class 11 & 12):</strong> Your only textbook needed</li>
              <li><strong>Question Bank with 500+ NEET-style questions</strong></li>
              <li><strong>30 previous year NEET papers</strong></li>
              <li><strong>20 full-length mock tests</strong></li>
              <li><strong>Video tutorials for complex topics:</strong> Photosynthesis, Molecular Biology, Physiology</li>
              <li><strong>One good coaching institute:</strong> Even 4 weeks of coaching can accelerate your 3-month plan significantly</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
              Common Pitfalls in 3-Month Preparation
            </h2>

            <div className="bg-red-50 p-6 rounded-lg my-6 border border-red-200">
              <h3 className="font-bold text-gray-900 mb-4">Mistake #1: Trying to Cover Everything</h3>
              <p className="text-gray-700">Many students think they must cover all 49 chapters. This is impossible in 3 months. Focus on the 35-40 chapters listed in this plan—they account for 80% of questions.</p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg my-6 border border-red-200">
              <h3 className="font-bold text-gray-900 mb-4">Mistake #2: Skipping Mock Tests</h3>
              <p className="text-gray-700">Mock tests are not "practice"—they're essential learning tools. Students who skip mock tests typically score 30-40 marks lower than they could.</p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg my-6 border border-red-200">
              <h3 className="font-bold text-gray-900 mb-4">Mistake #3: Not Prioritizing Revision</h3>
              <p className="text-gray-700">In Month 3, revision is more important than new learning. Students who continue learning new topics in the last month miss reinforcement of Month 1 chapters.</p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg my-6 border border-red-200">
              <h3 className="font-bold text-gray-900 mb-4">Mistake #4: Neglecting Sleep and Health</h3>
              <p className="text-gray-700">Studying 8+ hours but getting 5 hours sleep is counterproductive. Sleep is when memory consolidation happens. Prioritize 7-8 hours sleep every night—it's not a luxury, it's necessary.</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
              Can You Score 340+ in 3 Months?
            </h2>

            <p>
              Realistically: 340+ in 3 months is difficult but possible if:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>You already have some biology knowledge from school</li>
              <li>You have 8+ hours study time daily (not just 6-7)</li>
              <li>You have access to premium coaching guidance</li>
              <li>You score 90%+ in mock tests consistently</li>
              <li>Your Chemistry and Physics scores are 280+ each</li>
            </ul>

            <p>
              More realistic expectation: 280-320 range is achievable with disciplined execution. Reaching 340+ requires some prior knowledge or exceptional effort.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
              How Coaching Can Accelerate Your 3-Month Plan
            </h3>

            <p>
              If you join Cerebrum's accelerated 3-month program:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Week 1:</strong> Our AIIMS faculty will assess your current level and optimize your plan</li>
              <li><strong>Weeks 1-8:</strong> Guided learning of high-priority chapters with expert explanations</li>
              <li><strong>Weeks 9-12:</strong> Intensive mock testing and error analysis</li>
              <li><strong>Result:</strong> Students typically improve by 40-60 marks vs self-study in same period</li>
            </ul>

            <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded my-8">
              <p className="text-teal-900">
                <strong>3 months is tight but doable.</strong> With the right strategy, resources, and determination, you can achieve competitive NEET Biology scores. If you want expert guidance, our accelerated 12-week program is designed exactly for this timeline.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need Guidance for Your 3-Month Plan?
            </h2>
            <p className="text-gray-700 mb-6">
              Join Cerebrum's accelerated NEET Biology program designed specifically for 3-month preparation. Our AIIMS-trained faculty will keep you on track and optimize your preparation for maximum score improvement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://cerebrumbiologyacademy.com/contact"
                className="inline-block px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
              >
                Book Free Assessment
              </a>
              <a
                href="https://wa.me/918826444334?text=Hi%20Cerebrum%20Academy,%20I%20need%20to%20prepare%20NEET%20Biology%20in%203%20months.%20Can%20you%20help?"
                className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                WhatsApp: 088264 44334
              </a>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Call us at <strong>088264 44334</strong> to discuss your 3-month preparation strategy.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
