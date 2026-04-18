/**
 * IB Biology FAQs
 * Shared FAQ data for IB Biology pages — used by both the page component
 * (for display) and the layout component (for FAQPage JSON-LD schema).
 *
 * Categories: Boards Hub, Tuition, IA/EE, Pricing, Global/Timezones
 */

import type { FAQ } from './neet-biology-faqs'

/**
 * Core FAQs for the /boards/ib hub page.
 * Match the content shown on the page so JSON-LD stays in sync with UI.
 */
export const boardsIbFAQs: FAQ[] = [
  {
    question: 'What makes Cerebrum different from other IB Biology tutoring services?',
    answer:
      "Unlike generic tutoring platforms, we specialize exclusively in IB Biology with actual IB examiners on our faculty. Our 89% success rate for 6-7 scores and 2-point improvement guarantee demonstrate our commitment to results. We also offer 24/7 WhatsApp support - something most competitors charge extra for or don't offer at all.",
    category: 'Boards Hub',
    keywords: ['ib biology', 'ib biology tutoring', 'cerebrum ib'],
  },
  {
    question: 'How does the 2-point score guarantee work?',
    answer:
      "If you complete our full program (minimum 40 hours of instruction) and don't improve by at least 2 points from your baseline assessment, we provide free additional tutoring until you achieve that improvement. This applies to students who attend 90%+ sessions and complete all assigned work.",
    category: 'Pricing',
    keywords: ['ib biology score guarantee', 'ib biology improvement'],
  },
  {
    question: 'Do you help with Internal Assessment (IA)?',
    answer:
      'Absolutely! IA support is central to our program. We guide you through topic selection, experimental design, data collection methodology, analysis techniques, and scientific writing. Our structured approach has helped 92% of students score 20+ out of 24 on their IA.',
    category: 'IA/EE',
    keywords: ['ib biology ia', 'internal assessment help', 'ib biology ia topics'],
  },
  {
    question: 'What timezones do you support for live classes?',
    answer:
      "We have faculty across multiple timezones (IST, GMT, EST, PST, SGT) and offer flexible scheduling. Whether you're in Singapore, Dubai, London, or New York, we can accommodate your schedule. 1:1 sessions offer maximum flexibility.",
    category: 'Global/Timezones',
    keywords: ['ib biology online classes', 'ib biology tutor timezones'],
  },
  {
    question: 'Is $6,000/year for the Complete Program really all-inclusive?',
    answer:
      'Yes! The Complete IB Program includes 150+ hours of instruction (worth $6,000 at $40/hr), all study materials, past paper banks, IA guidance, and bonus university application support worth $500. No hidden costs. This makes us one of the most affordable premium IB Biology programs globally.',
    category: 'Pricing',
    keywords: ['ib biology fees', 'ib biology program price', 'ib biology complete program'],
  },
  {
    question: 'Can I switch between 1:1 and batch sessions?',
    answer:
      'Yes, we offer flexibility. Many students start with our batch program and add 1:1 sessions for IA support or exam-intensive revision. We can create a hybrid plan that fits your needs and budget.',
    category: 'Tuition',
    keywords: ['ib biology 1:1 tutoring', 'ib biology batch'],
  },
]

/**
 * Helper to convert FAQ[] to the shape expected by FAQSchema component
 * (only question + answer fields).
 */
export function toFAQSchemaItems(faqs: FAQ[]): Array<{ question: string; answer: string }> {
  return faqs.map(({ question, answer }) => ({ question, answer }))
}
