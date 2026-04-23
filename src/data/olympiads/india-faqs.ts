/**
 * India-specific Biology Olympiad FAQs.
 *
 * These cover high-intent Indian queries (NSEB registration,
 * HBCSE OCSC process, IAPT mechanics, cutoffs, board-agnostic
 * eligibility) that are underserved in global olympiad content.
 *
 * Usage: import and append to page-specific FAQ arrays so the
 * FAQPage JSON-LD + on-page <details> accordion both include
 * these AEO-friendly answers.
 */

export interface IndiaOlympiadFAQ {
  question: string
  answer: string
}

export const indiaOlympiadFAQs: IndiaOlympiadFAQ[] = [
  {
    question: 'How do I register for NSEB in India?',
    answer:
      'NSEB registration is administered by IAPT (Indian Association of Physics Teachers) through schools. In late August or September, your school biology teacher or coordinator registers interested Class 11-12 students through IAPT-affiliated centres. The November paper is sat at a designated centre (usually a city school acting as exam hub). If your school does not administer NSEB, you can still register directly through an IAPT-affiliated centre in your city — we help students confirm the nearest centre.',
  },
  {
    question: 'What is HBCSE OCSC and how are students selected?',
    answer:
      'OCSC (Orientation-cum-Selection Camp) is a 2-3 week residential training camp at HBCSE (Homi Bhabha Centre for Science Education) in Mumbai held in April-May. It is Stage 3 of the Indian Biology Olympiad pathway. Selection is based on your INBO score — roughly the top 30-35 INBO performers are invited. OCSC includes rigorous theory and practical training, mock papers, and interviews. The final 4 students who represent India at IBO are selected from this camp based on combined OCSC + INBO performance.',
  },
  {
    question: 'Who conducts INBO and what is the paper pattern?',
    answer:
      'INBO (Indian National Biology Olympiad) is Stage 2 of the Indian olympiad pathway, conducted by HBCSE in early February. Only students who clear the NSEB cutoff (roughly top 300 nationally) are invited to sit INBO. The paper is 3 hours with theory questions and a practical section that together test university-level biology depth. The top ~30 performers advance to OCSC. INBO questions pull from Campbell Biology, experimental design, and data-interpretation.',
  },
  {
    question: 'Can my CBSE, ICSE, or IB school register me for NSEB?',
    answer:
      'Yes — any Indian school (CBSE, ICSE, IB, Cambridge, state boards) can register students for NSEB if the school has IAPT enrolment or uses an IAPT-affiliated exam centre. Student eligibility depends only on being a Class 11 or Class 12 student in an Indian school. We have successfully coached NSEB students from all major boards. If your school is not IAPT-registered, we help you enrol via the nearest IAPT centre (typically a senior school in your city).',
  },
  {
    question: 'What is the typical NSEB cutoff for INBO qualification?',
    answer:
      'The NSEB-to-INBO cutoff varies year-to-year but generally corresponds to the top ~300 students nationally, which translates to roughly the top 1% of registered candidates. In recent years the qualifying raw score has hovered around 65-75% of the maximum, though the exact cutoff depends on paper difficulty. We target students towards 75-85% raw score as a safety margin above the typical INBO band.',
  },
  {
    question: 'When is NSEB 2025 and how should students prepare by that date?',
    answer:
      'NSEB is held annually in late November (the 2025 paper is expected Sunday late November, with exact date announced by IAPT by September). Serious preparation should begin at least 9-12 months before — ideally starting Class 11 Q1 (July-August) to give full Campbell Biology coverage and 15 years of past-paper drill time. A 6-month sprint is possible for Class 12 students if NCERT is already strong. Our Complete Olympiad Year programme is sized to this timeline.',
  },
  {
    question: 'Do international students at Indian schools qualify for the Indian olympiad?',
    answer:
      'Yes. Any student enrolled in an Indian school (regardless of nationality) is eligible to sit NSEB and progress through the Indian pathway (INBO → OCSC → IBO). IBO team selection is based on country of schooling, not citizenship. This is why NRI students at IB schools in Gurugram, Bangalore, or Mumbai commonly compete in the Indian pipeline alongside Indian-national peers.',
  },
]
