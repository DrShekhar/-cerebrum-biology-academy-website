import { Metadata } from 'next'
import {
  CompetitorComparisonLanding,
  type CompetitorComparisonConfig,
} from '@/components/seo/CompetitorComparisonLanding'

export const metadata: Metadata = {
  title: 'Cerebrum vs Khan Academy AP Biology | Comparison',
  description:
    'Cerebrum Biology Academy vs Khan Academy for AP Biology — paid specialist coaching vs free video library. Compare FRQ prep, faculty depth, score-5 outcomes.',
  keywords: [
    'cerebrum vs khan academy ap biology',
    'khan academy ap biology alternative',
    'best ap biology tutor vs khan academy',
    'ap biology coaching vs khan academy',
    'khan academy ap bio review',
    'paid ap biology tutor vs free',
  ],
  openGraph: {
    title: 'Cerebrum vs Khan Academy AP Biology | Comparison',
    description: 'Paid biology specialist coaching vs free video library for AP Biology.',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-khan-academy-ap-biology',
    type: 'website',
  },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/cerebrum-vs-khan-academy-ap-biology' },

  twitter: { card: 'summary_large_image' as const },
}

const config: CompetitorComparisonConfig = {
  slug: 'cerebrum-vs-khan-academy-ap-biology',
  competitorName: 'Khan Academy AP Biology',
  headline: 'Cerebrum vs Khan Academy for AP Biology',
  ribbon: 'Live Specialist Coaching vs Free Video Library',
  subheadline: 'FRQ rubric mastery and 1:1 faculty vs self-paced video review.',
  intro:
    'Khan Academy offers free AP Biology video lectures and practice questions — an excellent baseline resource used by millions. Cerebrum is a paid, live-coaching specialist with PhD-faculty 1:1 sessions, FRQ rubric mastery, and USABO bridge. The question is whether free content is sufficient for your score-5 target, or whether live coaching provides the marginal lift. For most students scoring 3–4, the answer is live coaching moves the needle; Khan Academy alone keeps them at 3–4.',
  table: [
    { criterion: 'Cost', cerebrum: '$2,500–$5,760 (12–48 hr packages)', competitor: 'Free', cerebrumWins: false },
    { criterion: 'Teaching Mode', cerebrum: 'Live 1:1 or small-batch with PhD faculty', competitor: 'Pre-recorded video + practice questions', cerebrumWins: true },
    { criterion: 'FRQ Rubric Coaching', cerebrum: 'Explicit rubric drilling (main score lever)', competitor: 'Minimal FRQ-specific content', cerebrumWins: true },
    { criterion: 'Content Depth', cerebrum: 'Campbell Biology end-to-end, college-level', competitor: 'AP-level review (condensed)', cerebrumWins: true },
    { criterion: 'USABO Bridge', cerebrum: 'Integrated for semifinal candidates', competitor: 'Not offered', cerebrumWins: true },
    { criterion: 'Practice Questions', cerebrum: 'Curated AP-style + AAMC-aligned', competitor: 'Extensive free question bank', cerebrumWins: false },
    { criterion: 'Personalisation', cerebrum: 'Diagnostic-driven study plan', competitor: 'Self-directed, no personalisation', cerebrumWins: true },
    { criterion: 'Accessibility', cerebrum: 'Online, scheduled sessions', competitor: 'Anytime, anywhere, any pace', cerebrumWins: false },
  ],
  whyChooseCerebrum: [
    { title: 'FRQ Rubric Mastery', description: 'The AP Biology exam is 50% FRQ. Khan Academy covers content but barely touches FRQ technique. Cerebrum drills the exact rubric patterns that earn full marks — this is the single biggest score lever for 4-to-5 jumps.' },
    { title: 'Live Faculty Feedback', description: 'PhD faculty who read your FRQ answers and give real-time feedback. Khan Academy\'s platform cannot assess written FRQ responses — you\'re grading yourself against answer keys.' },
    { title: 'USABO Bridge', description: 'For students targeting both AP-5 and USABO Semifinal, Cerebrum integrates olympiad-level content extensions. Khan Academy has no olympiad pathway.' },
    { title: 'Diagnostic-Driven Personalisation', description: 'We identify your weak units and allocate session time accordingly. Khan Academy gives the same content to everyone — you decide what to watch, which often means avoiding weak topics.' },
  ],
  whenCompetitorMightBeBetter: [
    'Budget is the primary constraint — Khan Academy is free',
    'You\'re already scoring 4–5 and just need content review, not coaching',
    'You prefer fully self-paced learning with no scheduled commitments',
    'You need a broad review across all AP subjects, not just AP Biology',
  ],
  testimonials: [
    { name: 'Junior, Stuyvesant NYC', score: 'AP Biology: 5', college: 'Targeting Columbia, Cornell pre-med', quote: 'Watched all Khan Academy videos but was stuck at 4 on practice exams. Cerebrum\'s FRQ drilling was what got me to 5 — Khan doesn\'t teach you how to write for the rubric.' },
    { name: 'Sophomore, TJHSST Virginia', score: 'AP Biology: 5 + USABO Semifinal', college: 'Targeting MIT, Stanford', quote: 'Khan Academy was my baseline content review. Cerebrum layered the FRQ technique and USABO bridge on top. The combination worked — AP-5 and USABO Semifinal in the same year.' },
  ],
  faqs: [
    { question: 'Is Khan Academy enough for AP Biology score 5?', answer: 'For students with strong self-discipline and natural biology aptitude (scoring 4+ on diagnostics), Khan Academy content plus official College Board practice can be sufficient. For students scoring 3–4 who need the jump to 5, live coaching on FRQ technique is usually the missing piece — and Khan Academy does not provide that.' },
    { question: 'Can I use Khan Academy alongside Cerebrum?', answer: 'Absolutely — this is the recommended approach. Khan Academy for free content review and practice questions; Cerebrum for live FRQ coaching, 1:1 feedback, and USABO bridge. No overlap since Khan is self-paced content and Cerebrum is live instruction.' },
    { question: 'Why is Cerebrum worth paying for when Khan is free?', answer: 'Khan Academy covers content but cannot assess your FRQ writing, identify your specific weak patterns, or provide real-time faculty feedback. The 3-to-5 jump almost always requires FRQ technique — which is a coached skill, not a watched-video skill. Our $2,500 senior-faculty package for 12 hours of live coaching delivers more score lift per hour than 100 hours of video review.' },
    { question: 'Does Khan Academy offer USABO prep?', answer: 'No. Khan Academy covers the AP Biology curriculum only. Cerebrum bridges AP Biology to USABO for students targeting the Semifinal — extending content into evolutionary biology, population genetics, and experimental design at the olympiad level.' },
  ],
  whatsappMessage: 'Hi — I\'m comparing Cerebrum and Khan Academy for AP Biology. My child is currently scoring [X] on practice exams and targeting score 5. Please share programme details.',
}

export default function Page() {
  return <CompetitorComparisonLanding config={config} />
}
