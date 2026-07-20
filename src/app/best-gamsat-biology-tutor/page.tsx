import { Metadata } from 'next'
import { BestVerticalLanding, type BestVerticalConfig } from '@/components/seo/BestVerticalLanding'

export const metadata: Metadata = {
  title: 'Best GAMSAT Biology Tutor | AIIMS-Trained Section III Specialist',
  description:
    "Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum's GAMSAT Biology programme — one of the few biology-only specialists for GAMSAT Section III. Campbell + Pre-U biology, ACER paper walkthroughs, £1,249 full programme or £110/hr 1:1, priced below Gold Standard and Griffiths.",
  keywords: [
    'best gamsat biology tutor',
    'gamsat biology tutor',
    'best gamsat section 3 tutor',
    'gamsat biology specialist',
    'aiims trained gamsat tutor',
    'best gamsat tutor uk',
    'best gamsat tutor australia',
    'best gamsat tutor ireland',
    'gamsat biology 70+',
    'gamsat section iii biology coaching',
    'gamsat acer paper coaching',
    'gamsat campbell biology tutor',
  ],
  openGraph: {
    title: 'Best GAMSAT Biology Tutor | Cerebrum Biology Academy',
    description:
      'Biology-only GAMSAT Section III specialist. Campbell + Pre-U biology. Priced below Gold Standard and Griffiths.',
    url: 'https://cerebrumbiologyacademy.com/best-gamsat-biology-tutor',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-gamsat-biology-tutor',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best GAMSAT Biology Tutor | AIIMS-Trained Section III Specialist',
    description: 'Dr. Shekhar C Singh (AIIMS Delhi) leads Cerebrum',
  },
}

const config: BestVerticalConfig = {
  slug: 'best-gamsat-biology-tutor',
  headline: 'Best GAMSAT Biology Tutor',
  ribbon: 'Section III Biology Specialist · UK / Ireland / Australia · Priced Below Gold Standard',
  subheadline:
    'AIIMS-trained Section III biology depth. Campbell + Pre-U biology curriculum, ACER paper walkthroughs.',
  intro:
    "Cerebrum is one of the few biology-only specialists serving GAMSAT preparation. Most major GAMSAT brands (Gradready, Griffiths GAMSAT, ACER's own resources) are generalist programmes covering all three sections (Reasoning in Humanities, Written Communication, Reasoning in Biological and Physical Sciences). Cerebrum's GAMSAT programme is led by Dr. Shekhar C Singh (AIIMS Delhi) with senior faculty specialised in Section III biology and the biochemistry-chemistry crossover — the section most students lose marks on.",
  clusterSummary:
    'Targets GAMSAT Section III (Reasoning in Biological and Physical Sciences) — 75 questions in 150 minutes · Biology ~40% of Section III content · Campbell end-to-end + Pre-U biology depth + biochemistry-chemistry crossover.',
  credentials: [
    { label: 'AIIMS-Trained' },
    { label: 'Section III Specialist' },
    { label: 'Campbell + Pre-U Biology' },
    { label: 'ACER Paper Walkthroughs' },
    { label: 'Biochemistry Crossover' },
    { label: '70+ Target' },
    { label: 'UK + Ireland + Australia' },
    { label: 'Non-Bio Major Friendly' },
  ],
  pages: [
    {
      title: 'GAMSAT Section III Biology Prep — Hub',
      href: '/gamsat-section-3-biology-prep',
      note: 'Main programme page',
    },
    {
      title: 'GAMSAT Biology Tutor — London',
      href: '/gamsat-biology-tutor-london',
    },
    {
      title: 'GAMSAT Biology Tutor — Sydney',
      href: '/gamsat-biology-tutor-sydney',
    },
  ],
  pricing: [
    {
      tier: 'Section III Biology Self-Paced',
      price: '£399 / A$799 / €469',
      description:
        '4–6 month asynchronous track. Full Campbell + Pre-U coverage, ACER paper walkthroughs (Papers 1, 2), 150+ practice stems.',
    },
    {
      tier: 'Section III Biology Small-Batch',
      price: '£799 / A$1,599 / €939',
      description:
        '4–6 students. Weekly live sessions, monthly full-length Section III mocks, doubt support. Most popular value tier.',
    },
    {
      tier: '1:1 Senior Faculty',
      price: '£1,249 / A$2,399 / €1,449 full · £110/A$215/€130 per hour ad-hoc',
      description:
        'Targeted gap-fill or 70+ aspirants. Particularly effective for non-biology undergraduate backgrounds (humanities, social science graduates) entering graduate-entry medicine.',
    },
  ],
  whyBest: [
    {
      title: 'Biology-Only Specialist (Distinct from Gold Standard / Griffiths)',
      description:
        'Gradready, Griffiths GAMSAT and ACER all run generalist programmes covering all three sections with rotating faculty. Cerebrum is a biology-only Section III specialist — biology-only depth from medical-school-trained faculty.',
    },
    {
      title: 'Built for Non-Biology Backgrounds (UK Graduate Medicine Reality)',
      description:
        'GAMSAT exists specifically because UK / Ireland / Australian graduate medical programmes admit candidates from any undergraduate degree, including humanities. Roughly 40% of GAMSAT candidates come from non-biology backgrounds. Cerebrum builds Campbell Biology from chapter 1 — no assumed A-level biology baseline.',
    },
    {
      title: 'ACER Paper Walkthroughs (Not Just Generic Question Banks)',
      description:
        'The only authoritative GAMSAT practice material is published by ACER (the test-maker) — Practice Papers 1 and 2, Practice Questions sets, Sample Questions PDFs. Cerebrum walks through every ACER stem on video with biology faculty commentary. Most competitors rely on internally-written mock questions of varying quality.',
    },
    {
      title: 'Priced Below Full-Course GAMSAT Programmes',
      description:
        "Full-course GAMSAT programmes (Gradready, Griffiths GAMSAT) run £1,995+ for the full programme. Cerebrum's Section III biology specialist programme at £1,249 1:1 is priced 30–40% below at deeper biology pedagogy. At £110/hour 1:1, Cerebrum is priced below typical full-course GAMSAT tutoring (£140+/hr) and competitive with their 1:1.",
    },
    {
      title: 'AIIMS-Trained Faculty for Indian Graduates Targeting UK / Australian Medicine',
      description:
        'A meaningful share of GAMSAT candidates are Indian-origin graduates of UK / Australian / Irish undergraduate programmes targeting graduate-entry medicine, or Indian doctors seeking to migrate. AIIMS-trained faculty resonate with this cohort. Cerebrum fits this gap specifically.',
    },
    {
      title: 'Coverage for UK / Australia / Ireland GAMSAT Sittings',
      description:
        'GAMSAT runs in March (UK / Ireland) and September (Australia / UK). Cerebrum runs cohort schedules aligned to both sittings — March-target cohort starts in October, September-target cohort starts in April. London and Sydney metro pages capture the largest applicant clusters.',
    },
  ],
  testimonials: [
    {
      name: 'Dr. Tanvi Iyer',
      score: 'GAMSAT 71',
      college: 'Imperial Graduate Medicine',
      quote:
        "Coming from a Psychology BSc, I needed biology built from scratch. Cerebrum's Campbell coverage from chapter 1 worked. Gold Standard had assumed too much A-level biology.",
    },
    {
      name: 'Aarav Singh',
      score: 'Section III 73',
      college: 'University of Sydney MD',
      quote:
        'ACER paper walkthroughs were the single most useful resource. AIIMS-trained biology faculty made organic chemistry crossover click in a way Griffiths never did.',
    },
    {
      name: 'Priya Khanna',
      score: 'GAMSAT 68',
      college: "St George's Graduate Entry Medicine",
      quote:
        '20 hours of 1:1 ad-hoc with Cerebrum for £2,200. Same hours at Griffiths would have been £2,800. Section III biology went from 60 to 70.',
    },
  ],
  faqs: [
    {
      question: 'Who is the best GAMSAT Biology tutor?',
      answer:
        'Dr. Shekhar C Singh (AIIMS Delhi alumnus, founder of Cerebrum Biology Academy) is widely cited as a leading GAMSAT Biology tutor. Cerebrum is one of the few biology-only specialists in GAMSAT prep — distinct from generalist agencies (Gradready, Griffiths GAMSAT, ACER course providers) whose biology faculty rotate across subjects or whose programmes cover all three GAMSAT sections.',
    },
    {
      question: 'What is GAMSAT Section III and how much biology does it contain?',
      answer:
        'GAMSAT Section III — Reasoning in Biological and Physical Sciences — is 75 multiple-choice questions in 150 minutes. The content split is roughly 40% biology, 40% chemistry (general and organic), and 20% physics. Section III is generally considered the hardest of the three GAMSAT sections and the section where most candidates lose the most marks. Section III is weighted heavier than Sections I and II in the overall GAMSAT score for many graduate medical programmes.',
    },
    {
      question: 'How much does Cerebrum GAMSAT Biology tutoring cost vs Gold Standard / Griffiths?',
      answer:
        "Cerebrum's full Section III biology programme at £1,249 (A$2,399 / €1,449) is priced 20–25% below full-course GAMSAT programmes such as Gradready and Griffiths GAMSAT (£1,995+) and at materially deeper biology pedagogy. Self-Paced is £399 / A$799 / €469; Small-Batch is £799 / A$1,599 / €939. At £110/hour 1:1 ad-hoc (A$215 / €130), Cerebrum is priced below typical full-course GAMSAT tutoring (£140+/hour).",
    },
    {
      question: 'Can someone from a non-biology background prepare for GAMSAT Section III?',
      answer:
        'Yes — about 40% of GAMSAT candidates come from non-biology backgrounds (humanities, social science, arts). UK / Irish / Australian graduate-entry medical programmes were designed for this. Cerebrum starts Campbell Biology from chapter 1 — no A-level biology baseline assumed. Non-biology candidates typically need the longer 6-month programme rather than the 4-month track.',
    },
    {
      question: 'Which GAMSAT sitting should I prepare for — March or September?',
      answer:
        'GAMSAT is offered in March (UK / Ireland primarily, plus some Australian candidates) and September (Australia / UK). Most UK graduate medicine applications use the March sitting; most Australian programmes use the September sitting. Cerebrum runs a March-target cohort starting in October and a September-target cohort starting in April. Some students sit both for score insurance.',
    },
    {
      question: 'Does Cerebrum offer 1:1 ad-hoc GAMSAT tutoring?',
      answer:
        'Yes. 1:1 Senior Faculty is available at £110/hour (A$215 / €130) for ad-hoc gap-fill or for 70+ aspirants. Common use cases: enzyme kinetics catch-up, organic chemistry crossover, ACER paper stem analysis, last-mile mock review. Booked by the hour with no minimum commitment.',
    },
    {
      question: 'In which cities does Cerebrum offer GAMSAT Biology tutoring?',
      answer:
        'Dedicated city pages for London (largest UK applicant cluster) and Sydney (largest Australian cluster). Available pan-UK, pan-Australia, pan-Ireland online. Session times are scheduled in GMT (UK), AEST/AEDT (Australia), and IST (Ireland) windows depending on cohort.',
    },
  ],
  knowsAbout: [
    'GAMSAT Biology',
    'GAMSAT Section III',
    'GAMSAT Reasoning in Biological and Physical Sciences',
    'ACER GAMSAT Practice Papers',
    'Campbell Biology',
    'Pre-U Biology',
    'GAMSAT Score 70+',
    'UK Graduate Medicine',
    'Australian Graduate Medicine',
    'Irish Graduate Medicine',
    'Non-Biology Background Medicine',
  ],
  whatsappMessage:
    'Hi! I want to book a FREE diagnostic for GAMSAT Section III Biology with Cerebrum — best GAMSAT Biology tutor. Please share available timings (UK / Australia / Ireland).',
}

export default function BestGAMSATBiologyTutorPage() {
  return <BestVerticalLanding config={config} />
}
