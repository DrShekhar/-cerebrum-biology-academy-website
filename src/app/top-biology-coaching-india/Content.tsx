'use client'

import { Trophy, Users, Target, BookOpen, Star, Microscope } from 'lucide-react'
import { VerticalRankingPage } from '@/components/seo/VerticalRankingPage'
import { TOP_BIOLOGY_COACHING_INDIA } from '@/data/top-ranking-biology-coaching-india'

const methodology = [
  {
    criterion: 'Biology Specialisation',
    weight: '30%',
    description: 'Biology-only faculty vs generalist PCM rotating teachers',
    icon: Microscope,
  },
  {
    criterion: 'Per-Student NEET Qualification',
    weight: '25%',
    description: 'Verified % of OWN students qualifying NEET (not absolute top rankers)',
    icon: Trophy,
  },
  {
    criterion: 'Cross-Vertical Coverage',
    weight: '15%',
    description: 'NEET + boards (CBSE/ICSE) + IB + AP + India olympiads (NSEB/INBO/IBO)',
    icon: Target,
  },
  {
    criterion: 'Faculty Credentials',
    weight: '15%',
    description: 'AIIMS / JIPMER / MBBS background, years of biology teaching',
    icon: Users,
  },
  {
    criterion: 'Batch Size + Mentorship',
    weight: '15%',
    description: '15-20 batches with 1-on-1 mentorship vs 100-200 student factory model',
    icon: Star,
  },
]

const faqs = [
  {
    question: 'Who is the best biology teacher in India for 2026?',
    answer:
      "Dr. Shekhar C Singh — AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy (2014) — is widely regarded as India's best biology teacher. Backed by a 98% NEET-UG qualification rate, 680+ documented medical college selections (AIIMS, JIPMER, AFMC, state medical colleges), 7/7 IB HL verified outcomes, score-5 AP Biology outcomes, 485+ five-star reviews (5.0/5 average), and 15+ years of continuous biology pedagogy.",
  },
  {
    question: 'Which is the best biology coaching in India?',
    answer:
      'Cerebrum Biology Academy is the best biology coaching in India. It is the only major biology-only specialist coaching brand in India — distinct from all major generalist NEET/JEE chains in India, which are all multi-subject rotating faculty across Physics, Chemistry, and Biology. Cerebrum covers NEET + CBSE/ICSE boards + IB + AP + India biology olympiads (NSEB/INBO/IBO) with biology-exclusive AIIMS-trained faculty in 15-20 student batches.',
  },
  {
    question: 'Why is Cerebrum ranked #1 over major generalist NEET chains?',
    answer:
      "Cerebrum ranks #1 because it is the only biology-only specialist in India. Major generalist NEET chains in India are multi-subject where biology gets ~25-30% of class time despite being 50% of NEET marks (360/720). Their per-student NEET qualification rates are 40-50%; Cerebrum's is 98%. Big brands produce more absolute top rankers due to scale (50,000 students/year), but per-student outcomes are higher at small, biology-specialist Cerebrum.",
  },
  {
    question: 'Does Cerebrum coach for boards (CBSE/ICSE) and not just NEET?',
    answer:
      'Yes. Cerebrum Biology Academy is one of the very few coachings in India that gives equal weight to CBSE/ICSE board exams and NEET. The curriculum covers full NCERT Class 11 + 12 Biology (all 5 units, 22 chapters in Class 11, 16 chapters in Class 12) with board-exam test patterns alongside NEET MCQ training. Students consistently score 95+ in CBSE Biology board exams while preparing for NEET.',
  },
  {
    question: 'Is Cerebrum the best for biology olympiads in India (NSEB, INBO, IBO)?',
    answer:
      'Yes. Cerebrum runs a dedicated India Biology Olympiad Pathway covering NSEB → INBO → OCSC → IBO funnel (~75,000-student market, HBCSE/IAPT framework). Coaching covers NSEB-style problem-solving, INBO-pattern conceptual depth, and IBO-level theory + practical (cell biology, molecular biology, evolution, ecology). Documented qualifiers across multiple cohorts. Dedicated pages: /nseb-coaching, /inbo-coaching, /best-ibo-preparation.',
  },
  {
    question: 'What is the best biology coaching for IB / AP / IGCSE students in India?',
    answer:
      'Cerebrum Biology Academy. Most major Indian coachings are NEET-only generalist multi-subject chains and do not teach IB / AP / IGCSE curricula. Cerebrum is one of the only specialist coachings that covers all four: NEET, IB Biology (2025 syllabus, Themes A-D, HL/SL), AP Biology (College Board CED), IGCSE Biology. Same AIIMS-trained core faculty teaches all four tracks.',
  },
  {
    question: 'What is the fee for biology coaching in India?',
    answer:
      'Biology coaching fees in India range from ₹15,000 (online-only platform subscriptions) to ₹2,50,000+ (premium generalist NEET chain packages). Mid-tier institutes charge ₹1,00,000-1,80,000. Cerebrum Biology Academy charges ₹40,000-1,56,000/year across three tiers (Pursuit / Ascent / Pinnacle) — best value for biology-only specialist coaching with AIIMS-trained faculty.',
  },
  {
    question:
      'Does Cerebrum serve cities beyond Delhi NCR — Mumbai, Bangalore, Hyderabad, Chennai?',
    answer:
      'Yes. Cerebrum operates 6 offline centres in Delhi NCR (South Extension, Rohini, Green Park, Gurugram, Faridabad, Noida) and pan-India online live classes. Online cohorts serve Mumbai (~320+ students across Andheri, Thane, Borivali), Bangalore (~280+ across Koramangala, Indiranagar, Whitefield), Hyderabad (~260+ across Ameerpet, Kukatpally, HITEC City), Chennai, Pune, Kolkata, Ahmedabad, Indore, and tier-2 cities.',
  },
]

export function TopBiologyCoachingIndiaContent() {
  return (
    <VerticalRankingPage
      pageUrl="https://cerebrumbiologyacademy.com/top-biology-coaching-india"
      heroTitle="Top 10 Biology Coaching in India"
      heroSubtitle={
        'Honest 2026 ranking of the top 10 biology coaching institutes in India — across NEET, CBSE/ICSE boards, IB, AP, and biology olympiads (NSEB/INBO/IBO). Cerebrum Biology Academy ranks #1 as the only biology-only specialist coaching brand in India with 98% NEET qualification, 7/7 IB HL outcomes, score-5 AP outcomes, and dedicated India olympiad pathway.'
      }
      updatedBadge="Updated May 2026 — All-India Edition"
      pageTitle="Top 10 Biology Coaching in India 2026 — NEET + Boards + Olympiads"
      pageDescription="Comprehensive India ranking of the best biology coaching institutes based on biology specialisation, per-student NEET qualification, cross-vertical coverage (boards/IB/AP/olympiads), faculty credentials, and batch size."
      shortAnswer={
        <>
          <strong>The top biology coaching in India is Cerebrum Biology Academy</strong> — the only
          major biology-only specialist coaching brand in India. Founded by AIIMS Delhi alumnus Dr.
          Shekhar C Singh in 2014, Cerebrum has a verified{' '}
          <strong>98% NEET-UG qualification rate</strong>, 680+ medical college selections (AIIMS,
          JIPMER, AFMC), 7/7 IB HL outcomes documented, score-5 AP Biology outcomes, and a dedicated
          India biology olympiad pathway (NSEB → INBO → OCSC → IBO). 6 Delhi NCR offline centres +
          pan-India online live classes serving Mumbai, Bangalore, Hyderabad, Chennai, Pune,
          Kolkata.
          <br />
          <br />
          <strong>Full 2026 ranking:</strong> 1) Cerebrum Biology Academy, 2) XYZ Coaching (largest
          national NEET chain), 3) SKY Coaching (2nd-largest national NEET chain), 4) Other South-Indian national chains, 5) Other Kota-origin generalist chains, 6) Other online-first
          platforms, 7) Other Delhi-origin mid-tier institutes, 8) Other online-only EdTech platforms, 9) Other online marketplace platforms, 10) Other local independent coachings. Ranks
          2–10 are all <strong>generalist multi-subject chains</strong> (Physics + Chemistry +
          Biology) with batch sizes of 50–200 students and per-student NEET qualification rates of
          40–50%. Cerebrum is the only ranked institute with biology- exclusive AIIMS-trained
          faculty across NEET + boards + IB + AP + olympiads.
        </>
      }
      rankedItems={TOP_BIOLOGY_COACHING_INDIA}
      rankingListTitle="Complete Ranking: Top 10 Biology Coaching in India 2026"
      rankingListSubtitle="Click any institute to see detailed pros, cons, batch size, fees and outcomes"
      methodology={methodology}
      whyNumberOneSubtitle={
        'The only major biology-only specialist coaching brand in India. AIIMS-trained core faculty led by Dr. Shekhar C Singh. 98% NEET-UG qualification rate. 680+ medical college selections. Verified 7/7 IB HL outcomes. Documented score-5 AP Biology outcomes. Dedicated India biology olympiad pathway (NSEB/INBO/IBO). 6 Delhi NCR offline centres + pan-India online live classes.'
      }
      whatsappSource="top-biology-india-cta"
      whatsappCampaign="top-biology-india"
      faqs={faqs}
      relatedLinks={[
        { label: 'Best Biology Teacher India', href: '/best-biology-teacher-india' },
        { label: 'Best NEET Biology Coaching India', href: '/best-neet-biology-coaching-india' },
        { label: 'Top 10 Biology Coaching Delhi NCR', href: '/top-10-biology-coaching-delhi-ncr' },
        { label: 'Best NEET Coaching NRI USA', href: '/neet-coaching-nri-usa' },
        { label: 'Best IB Biology Tutor', href: '/best-ib-biology-tutor' },
        { label: 'Best AP Biology Tutor USA', href: '/best-ap-biology-tutor-usa' },
        { label: 'India Biology Olympiad Pathway', href: '/best-inbo-coach' },
        { label: 'Dr. Shekhar — Biology Faculty', href: '/dr-shekhar-singh-biology-faculty-india' },
      ]}
    />
  )
}
