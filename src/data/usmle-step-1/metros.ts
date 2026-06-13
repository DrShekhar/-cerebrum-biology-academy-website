/**
 * USMLE Step 1 metro configs for city-level landing pages.
 * US metros target M1/M2 students; India metros target IMGs preparing for ECFMG.
 */

export interface USMLEMetroFaq {
  question: string
  answer: string
}

export interface USMLEMetroSchool {
  name: string
  programmes: string
}

export interface USMLEMetroConfig {
  slug: string
  city: string
  country: string
  countryCode: string
  stateOrRegion: string
  timezone: string
  timezoneShort: string
  currency: { code: string; symbol: string }
  locale: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroSubtitle: string
  whySection: { heading: string; paragraphs: string[] }
  medSchools: USMLEMetroSchool[]
  timezoneSection: string
  demographicSection: { heading: string; paragraphs: string[] }
  faqs: USMLEMetroFaq[]
}

export const usmleMetros: Record<string, USMLEMetroConfig> = {
  'new-york': {
    slug: 'new-york',
    city: 'New York',
    country: 'United States',
    countryCode: 'US',
    stateOrRegion: 'New York Metro',
    timezone: 'Eastern Time',
    timezoneShort: 'ET',
    currency: { code: 'USD', symbol: '$' },
    locale: 'en_US',
    metaTitle: 'USMLE Step 1 Biology Tutor NYC | Columbia, NYU, Cornell',
    metaDescription:
      'USMLE Step 1 biology-foundations tutor for NYC medical students — Columbia VP&S, NYU Grossman, Weill Cornell, Mount Sinai, Einstein. First Aid mapped. From $799.',
    keywords: [
      'USMLE Step 1 tutor New York',
      'USMLE Step 1 tutor NYC',
      'USMLE tutor Columbia VP&S',
      'USMLE tutor NYU Grossman',
      'USMLE tutor Weill Cornell',
      'USMLE Step 1 biology coaching NYC',
      'Step 1 dedicated period tutor NYC',
    ],
    heroSubtitle:
      'USMLE Step 1 biology-foundations coaching for Columbia VP&S, NYU Grossman, Weill Cornell, Mount Sinai, and Einstein M1/M2 students. AIIMS-trained biology specialists, First Aid + UWorld integration, ET evening sessions, $799 to $2,499.',
    whySection: {
      heading: 'Why NYC has the densest Step 1 prep market in the US',
      paragraphs: [
        'New York City has more medical schools than any other US metro: Columbia Vagelos College of Physicians & Surgeons, NYU Grossman School of Medicine, Weill Cornell Medicine, Icahn School of Medicine at Mount Sinai, and Albert Einstein College of Medicine. Each produces 150–180 M1/M2 students annually who will sit Step 1.',
        'The Pass/Fail transition (January 2022) reduced the score pressure but not the stakes — a 7% fail rate means ~1,400 US medical students fail Step 1 each year, delaying residency by a year or more. NYC M1/M2 students particularly value biology-foundations depth because their clinical rotations at NYP, Mount Sinai Hospital, and Montefiore expose them to pathophysiology questions that require molecular-level understanding.',
      ],
    },
    medSchools: [
      {
        name: 'Columbia VP&S',
        programmes: 'MD, MD/PhD (Vagelos College of Physicians and Surgeons)',
      },
      { name: 'NYU Grossman School of Medicine', programmes: 'MD (tuition-free since 2018)' },
      { name: 'Weill Cornell Medicine', programmes: 'MD, MD/PhD' },
      { name: 'Icahn School of Medicine at Mount Sinai', programmes: 'MD, MD/PhD, FlexMed' },
      { name: 'Albert Einstein College of Medicine', programmes: 'MD, MD/PhD' },
      { name: 'CUNY School of Medicine', programmes: 'MD (formerly Sophie Davis)' },
    ],
    timezoneSection:
      'All live sessions are in Eastern Time. Standard NYC small-batch slot is 8:00 PM to 10:00 PM ET on weekday evenings (after clinical rotations end). Weekend: 10:00 AM to 12:00 PM ET. Dedicated-period students can take daytime slots.',
    demographicSection: {
      heading: 'M1/M2 students + IMG candidates in NYC',
      paragraphs: [
        'NYC Step 1 candidates fall into two groups: (1) M1/M2 students at the five NYC medical schools who take Step 1 during or after M2; (2) IMGs (International Medical Graduates) — many from Indian, Caribbean, and Pakistani medical schools — who prepare for ECFMG certification while based in the NYC metro.',
        "For M1/M2 students, our coaching supplements the school's curriculum with deeper biology foundations (biochemistry, microbiology, immunology). For IMGs, we provide the systematic First Aid-mapped biology review that builds the foundational confidence needed to pass.",
      ],
    },
    faqs: [
      {
        question: 'Columbia or NYU M1/M2 — how does Step 1 prep fit the curriculum?',
        answer:
          'Columbia VP&S and NYU Grossman both integrate basic sciences into the first two years. Our coaching supplements — not replaces — the school curriculum by drilling the biology-foundations content (biochemistry, microbiology, immunology, physiology) that Step 1 tests beyond the clinical-case focus of modern medical curricula. We schedule around the M1/M2 academic calendar.',
      },
      {
        question: 'IMG preparing in NYC — what is the planning conversation?',
        answer:
          "For IMGs based in NYC (post-Caribbean, post-Indian medical school, or post-Pakistani medical school), the planning conversation covers: (a) current UWorld/NBME baseline, (b) dedicated-period duration (3–6 months typical), (c) biology foundations gaps vs clinical knowledge. We calibrate the programme to the IMG's specific baseline.",
      },
      {
        question: 'Step 1 is Pass/Fail — why invest in coaching?',
        answer:
          'The 7% fail rate is a binary catastrophe (delays residency 1+ year). For IMGs, ~25% of residency programmes still use Step 1 performance signals for filtering. Our coaching reduces fail risk by strengthening the biology foundations that most candidates find hardest: biochemistry pathways, microbiology mechanisms, and immunology cascades.',
      },
      {
        question: 'How does Cerebrum compare to UWorld and Kaplan for Step 1?',
        answer:
          'UWorld is a question bank — essential but not a teaching tool. Kaplan Step 1 is a generalist course (~$3,499) covering all disciplines. Cerebrum is a biology-foundations specialist ($799–$2,499) covering the ~55% of Step 1 that is biology-driven. Most students pair us with UWorld for question volume.',
      },
      {
        question: 'ET evening sessions for NYC medical students?',
        answer:
          'Standard small-batch: 8:00–10:00 PM ET weekday evenings (after rotations). Weekend: 10:00 AM–12:00 PM ET. Dedicated-period students can take daytime slots at any ET time.',
      },
    ],
  },

  'los-angeles': {
    slug: 'los-angeles',
    city: 'Los Angeles',
    country: 'United States',
    countryCode: 'US',
    stateOrRegion: 'Los Angeles Metro',
    timezone: 'Pacific Time',
    timezoneShort: 'PT',
    currency: { code: 'USD', symbol: '$' },
    locale: 'en_US',
    metaTitle: 'USMLE Step 1 Biology Tutor LA | UCLA, USC Keck, UCI',
    metaDescription:
      'USMLE Step 1 biology-foundations tutor for LA medical students — UCLA Geffen, USC Keck, UC Irvine SOM. First Aid mapped. From $799.',
    keywords: [
      'USMLE Step 1 tutor Los Angeles',
      'USMLE tutor UCLA Geffen',
      'USMLE tutor USC Keck',
      'USMLE tutor UC Irvine',
      'USMLE Step 1 biology coaching LA',
      'Step 1 dedicated period tutor LA',
    ],
    heroSubtitle:
      'USMLE Step 1 biology-foundations coaching for UCLA David Geffen, USC Keck, and UC Irvine M1/M2 students. AIIMS-trained biology specialists, First Aid + UWorld integration, PT evening sessions, $799 to $2,499.',
    whySection: {
      heading: 'Why LA anchors West Coast Step 1 demand',
      paragraphs: [
        'Los Angeles has three major medical schools: UCLA David Geffen School of Medicine, Keck School of Medicine of USC, and UC Irvine School of Medicine. Together they produce 400+ M1/M2 students annually. The broader SoCal market includes Loma Linda, UC Riverside SOM, and Western University COM.',
        'LA also has a significant IMG population preparing for ECFMG — many from Indian medical schools (AIIMS, MAMC, Maulana Azad, Grant, Seth GS, KEM) who relocate to the US for residency preparation. The Cerritos / Artesia Indian-American corridor drives IMG USMLE demand.',
      ],
    },
    medSchools: [
      { name: 'UCLA David Geffen School of Medicine', programmes: 'MD, MD/PhD (MSTP)' },
      { name: 'Keck School of Medicine of USC', programmes: 'MD, MD/PhD' },
      { name: 'UC Irvine School of Medicine', programmes: 'MD, MD/PhD' },
      { name: 'Loma Linda University SOM', programmes: 'MD, combined degrees' },
      { name: 'UC Riverside SOM', programmes: 'MD (Thomas Haider Programme)' },
    ],
    timezoneSection:
      'All live sessions are in Pacific Time. Standard LA small-batch slot is 7:30 PM to 9:30 PM PT on weekday evenings. Weekend: 10:00 AM to 12:00 PM PT. Dedicated-period students can take daytime slots.',
    demographicSection: {
      heading: 'M1/M2 students + IMG candidates in LA',
      paragraphs: [
        'LA Step 1 candidates include UCLA/USC/UCI M1/M2 students and a significant IMG cohort based in the Cerritos/Artesia corridor and the broader SoCal Indian-American community.',
        'For M1/M2 students, we supplement the medical school curriculum with biology-foundations depth. For IMGs, we provide systematic First Aid-mapped review calibrated to the IMG baseline (typically lower in US-style clinical integration, stronger in rote memorisation).',
      ],
    },
    faqs: [
      {
        question: 'UCLA or USC Keck M1/M2 — how does Step 1 prep fit?',
        answer:
          'UCLA Geffen and USC Keck integrate basic sciences with early clinical exposure. Our coaching adds biology-foundations depth (biochemistry, microbiology, immunology) that supplements the clinical-case focus. We schedule around the M1/M2 calendar.',
      },
      {
        question: 'IMG in LA — planning conversation?',
        answer:
          'For IMGs based in LA: (a) current UWorld/NBME baseline, (b) dedicated-period duration (3–6 months), (c) biology foundations gaps. Many LA-based IMGs are from Indian medical schools — we leverage the AIIMS-trained faculty alignment for these candidates.',
      },
      {
        question: 'How does Cerebrum compare to Kaplan Step 1 in LA?',
        answer:
          'Kaplan Step 1 is ~$3,499 for all disciplines. Cerebrum is $799–$2,499 for biology foundations (~55% of Step 1). Most students pair us with UWorld for question volume and use us instead of Kaplan for the foundational sciences component.',
      },
      {
        question: 'PT evening sessions for LA medical students?',
        answer:
          'Small-batch: 7:30–9:30 PM PT weekday evenings. Weekend: 10:00 AM–12:00 PM PT. Dedicated-period students can take daytime PT slots.',
      },
    ],
  },

  chicago: {
    slug: 'chicago',
    city: 'Chicago',
    country: 'United States',
    countryCode: 'US',
    stateOrRegion: 'Chicago Metro',
    timezone: 'Central Time',
    timezoneShort: 'CT',
    currency: { code: 'USD', symbol: '$' },
    locale: 'en_US',
    metaTitle: 'USMLE Step 1 Biology Tutor Chicago | Northwestern, UChicago, UIC',
    metaDescription:
      'USMLE Step 1 biology-foundations tutor for Chicago medical students — Northwestern Feinberg, UChicago Pritzker, UIC COM, Rush, Loyola Stritch. From $799.',
    keywords: [
      'USMLE Step 1 tutor Chicago',
      'USMLE tutor Northwestern Feinberg',
      'USMLE tutor Pritzker',
      'USMLE tutor UIC COM',
      'USMLE Step 1 biology coaching Chicago',
      'Step 1 dedicated period tutor Chicago',
    ],
    heroSubtitle:
      'USMLE Step 1 biology-foundations coaching for Northwestern Feinberg, UChicago Pritzker, UIC COM, Rush, and Loyola Stritch M1/M2 students. AIIMS-trained biology specialists, First Aid + UWorld integration, CT evening sessions, $799 to $2,499.',
    whySection: {
      heading: "Why Chicago has the Midwest's densest Step 1 market",
      paragraphs: [
        'Chicago has more medical schools than any Midwest metro: Northwestern Feinberg, UChicago Pritzker, UIC College of Medicine (largest in the US), Loyola Stritch, Rush Medical College, and Rosalind Franklin. Together they produce 700+ M1/M2 students annually.',
        'The Naperville / Schaumburg Indian-American corridor also hosts IMGs preparing for ECFMG, creating a dual-track Step 1 demand pattern.',
      ],
    },
    medSchools: [
      { name: 'Northwestern Feinberg School of Medicine', programmes: 'MD, MD/PhD' },
      { name: 'UChicago Pritzker School of Medicine', programmes: 'MD, MD/PhD' },
      {
        name: 'UIC College of Medicine',
        programmes: 'MD (largest US medical school by enrollment)',
      },
      { name: 'Rush Medical College', programmes: 'MD, combined degrees' },
      { name: 'Loyola Stritch School of Medicine', programmes: 'MD, MD/PhD' },
      { name: 'Rosalind Franklin University', programmes: 'MD, Chicago Medical School' },
    ],
    timezoneSection:
      'All live sessions are in Central Time. Standard Chicago small-batch slot is 7:30 PM to 9:30 PM CT on weekday evenings. Weekend: 10:00 AM to 12:00 PM CT.',
    demographicSection: {
      heading: 'M1/M2 students + IMG candidates in Chicago',
      paragraphs: [
        'Chicago Step 1 candidates include M1/M2 students at six medical schools plus IMGs in the Naperville/Schaumburg corridor preparing for ECFMG.',
        "For M1/M2 students, we supplement with biology-foundations depth. For IMGs, we provide systematic First Aid-mapped review. UIC COM's large class size (~300/year) makes it a particularly significant feeder for our Step 1 programme.",
      ],
    },
    faqs: [
      {
        question: 'Northwestern Feinberg or Pritzker M1/M2 — how does coaching fit?',
        answer:
          'Both schools have accelerated curricula. Our coaching supplements with biology-foundations depth (biochemistry, microbiology, immunology). We schedule around the M1/M2 academic calendar and clinical rotation schedule.',
      },
      {
        question: 'UIC COM students — different from Northwestern/Pritzker?',
        answer:
          'UIC COM has the largest class size in the US (~300/year). Students may have less individual faculty access. Our small-batch coaching (4–6 students) fills that gap with personalised biology-foundations review.',
      },
      {
        question: 'How does Cerebrum compare to Kaplan Step 1?',
        answer:
          'Kaplan Step 1 is ~$3,499 for all disciplines. Cerebrum is $799–$2,499 for biology foundations. Most students pair us with UWorld and use us instead of Kaplan for foundational sciences.',
      },
      {
        question: 'CT evening sessions for Chicago medical students?',
        answer:
          'Small-batch: 7:30–9:30 PM CT weekday evenings. Weekend: 10:00 AM–12:00 PM CT. Dedicated-period students can take daytime CT slots.',
      },
    ],
  },

  delhi: {
    slug: 'delhi',
    city: 'Delhi',
    country: 'India',
    countryCode: 'IN',
    stateOrRegion: 'Delhi NCR',
    timezone: 'India Standard Time',
    timezoneShort: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    locale: 'en_IN',
    metaTitle: 'USMLE Step 1 Tutor Delhi | AIIMS, MAMC, UCMS, LHMC IMGs',
    metaDescription:
      'USMLE Step 1 biology-foundations tutor for Delhi IMGs — AIIMS, Maulana Azad, UCMS, Lady Hardinge, GTB graduates. AIIMS-trained faculty. From ₹39,999.',
    keywords: [
      'USMLE Step 1 tutor Delhi',
      'USMLE tutor AIIMS Delhi',
      'USMLE tutor MAMC',
      'USMLE tutor UCMS',
      'USMLE Step 1 coaching Delhi',
      'IMG ECFMG preparation Delhi',
      'USMLE Step 1 biology coaching India',
    ],
    heroSubtitle:
      'USMLE Step 1 biology-foundations coaching for AIIMS, Maulana Azad (MAMC), UCMS, Lady Hardinge, and GTB graduates preparing for ECFMG certification. AIIMS-trained faculty who understand the Indian MBBS → US residency pipeline. IST sessions, ₹39,999 to ₹1,24,999.',
    whySection: {
      heading: "Why Delhi is India's largest USMLE Step 1 hub",
      paragraphs: [
        'Delhi NCR produces more USMLE Step 1 candidates than any other Indian metro. AIIMS New Delhi, Maulana Azad Medical College (MAMC), UCMS, Lady Hardinge Medical College, GTB Hospital, Vardhman Mahavir Medical College, and the private medical colleges in NCR collectively produce 1,500+ MBBS graduates annually — many of whom target ECFMG certification and US residency.',
        'The AIIMS-trained Cerebrum faculty understands this pipeline intimately: the Indian MBBS curriculum emphasises rote learning and clinical pattern recognition; USMLE Step 1 tests mechanistic understanding of biology foundations (biochemistry pathways, microbiology mechanisms, immunology cascades). Bridging this gap is our core value proposition for Delhi IMGs.',
      ],
    },
    medSchools: [
      { name: 'AIIMS New Delhi', programmes: "MBBS, MD/MS (India's #1 medical school)" },
      { name: 'Maulana Azad Medical College (MAMC)', programmes: 'MBBS, MD/MS' },
      {
        name: 'University College of Medical Sciences (UCMS)',
        programmes: 'MBBS, MD/MS (GTB Hospital)',
      },
      { name: 'Lady Hardinge Medical College (LHMC)', programmes: 'MBBS, MD/MS' },
      { name: 'Vardhman Mahavir Medical College (VMMC)', programmes: 'MBBS, Safdarjung Hospital' },
      { name: 'Army College of Medical Sciences (ACMS)', programmes: 'MBBS, Base Hospital' },
    ],
    timezoneSection:
      'All live sessions are timed for IST. Standard Delhi small-batch slot is 8:00 PM to 10:00 PM IST on weekday evenings. Weekend: 10:00 AM to 12:00 PM IST. Dedicated-period candidates can take daytime IST slots. IST-to-ET alignment means our faculty is available during US morning hours for candidates coordinating with US-based study groups.',
    demographicSection: {
      heading: 'Delhi IMG pipeline — MBBS to US residency',
      paragraphs: [
        'Delhi IMGs preparing for Step 1 typically fall into two groups: (1) recent MBBS graduates (1–3 years post-graduation) starting their ECFMG journey; (2) junior residents (MD/MS) who want a US fellowship pathway. Both groups need the same biology-foundations depth but at different intensity levels.',
        'What we hear from Delhi Step 1 candidates: (1) First Aid feels like a memorisation burden without conceptual depth — they want someone to teach the "why"; (2) Indian MBBS biochemistry is rote-heavy, USMLE biochemistry is mechanism-heavy — the gap is real; (3) microbiology and immunology are the highest-yield subjects for Indian IMGs because they bridge directly to clinical microbiology they already know. We calibrate the programme around these three realities.',
      ],
    },
    faqs: [
      {
        question:
          'AIIMS or MAMC graduate — how is Step 1 prep different from standard Indian MBBS revision?',
        answer:
          'Indian MBBS teaches biology as facts to memorise; USMLE Step 1 tests biology as mechanisms to reason through. The gap is biggest in biochemistry (pathway logic, not enzyme names) and immunology (cascade reasoning, not classification lists). Our coaching bridges this gap by teaching the "why" behind First Aid facts.',
      },
      {
        question: 'How long is the typical Delhi IMG dedicated period?',
        answer:
          'Delhi IMGs with strong MBBS foundations (AIIMS, MAMC, UCMS) typically need 4–6 months of dedicated Step 1 prep. Candidates from private medical colleges may need 6–9 months. We calibrate based on the initial NBME baseline score.',
      },
      {
        question: 'INR pricing for Delhi candidates?',
        answer:
          'Self-Paced: ₹39,999. Small-Batch: ₹79,999. 1:1 Senior Faculty: ₹1,24,999. Ad-hoc 1:1: ₹8,750/hour. INR transfer (HDFC/ICICI/SBI/Axis), UPI, and international card accepted.',
      },
      {
        question: 'Can Cerebrum help with ECFMG certification pathway beyond Step 1?',
        answer:
          'We coach the biology-foundations component of Step 1 only. For Step 2 CK, OET (English test), and ECFMG pathway strategy, we recommend pairing with a full ECFMG advisory service. Our coaching ensures the Step 1 biology foundations are solid — which is the hardest part for most Indian IMGs.',
      },
      {
        question: 'IST evening sessions for Delhi candidates?',
        answer:
          'Small-batch: 8:00–10:00 PM IST weekday evenings. Weekend: 10:00 AM–12:00 PM IST. Dedicated-period candidates can take daytime IST slots.',
      },
    ],
  },

  mumbai: {
    slug: 'mumbai',
    city: 'Mumbai',
    country: 'India',
    countryCode: 'IN',
    stateOrRegion: 'Maharashtra',
    timezone: 'India Standard Time',
    timezoneShort: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    locale: 'en_IN',
    metaTitle: 'USMLE Step 1 Tutor Mumbai | Grant, Seth GS, KEM, Nair IMGs',
    metaDescription:
      'USMLE Step 1 biology-foundations tutor for Mumbai IMGs — Grant Medical, Seth GS, KEM, BYL Nair graduates. AIIMS-trained faculty. From ₹39,999.',
    keywords: [
      'USMLE Step 1 tutor Mumbai',
      'USMLE tutor Grant Medical',
      'USMLE tutor Seth GS',
      'USMLE tutor KEM Hospital',
      'USMLE Step 1 coaching Mumbai',
      'IMG ECFMG preparation Mumbai',
    ],
    heroSubtitle:
      'USMLE Step 1 biology-foundations coaching for Grant Medical, Seth GS Medical College, KEM Hospital, and BYL Nair graduates preparing for ECFMG. AIIMS-trained faculty, IST sessions, ₹39,999 to ₹1,24,999.',
    whySection: {
      heading: "Why Mumbai is India's second-largest USMLE hub",
      paragraphs: [
        "Mumbai produces India's second-largest USMLE Step 1 candidate pool after Delhi. Grant Medical College, Seth GS Medical College (KEM Hospital), BYL Nair Hospital, LTMMC (Sion Hospital), TNMC (Nair), and the private medical colleges in Maharashtra collectively drive steady IMG demand.",
        'Mumbai IMGs benefit from strong clinical exposure at tertiary hospitals (KEM, Nair, JJ Hospital) — but the USMLE challenge is the same as Delhi: bridging rote-memorised Indian MBBS biology to mechanism-based USMLE reasoning.',
      ],
    },
    medSchools: [
      { name: 'Grant Medical College (JJ Hospital)', programmes: 'MBBS, MD/MS' },
      { name: 'Seth GS Medical College (KEM Hospital)', programmes: 'MBBS, MD/MS' },
      { name: 'BYL Nair Hospital / TNMC', programmes: 'MBBS, MD/MS' },
      { name: 'LTMMC (Sion Hospital)', programmes: 'MBBS, MD/MS' },
      { name: 'GSMC (KEM) / GGMC (JJ)', programmes: 'Top Mumbai government medical colleges' },
    ],
    timezoneSection:
      'All live sessions timed for IST. Standard Mumbai small-batch: 8:00 PM to 10:00 PM IST weekday evenings. Weekend: 10:00 AM to 12:00 PM IST.',
    demographicSection: {
      heading: 'Mumbai IMG pipeline — MBBS to US residency',
      paragraphs: [
        "Mumbai IMGs include graduates from some of India's most competitive government medical colleges (Grant, Seth GS, KEM, Nair). These candidates have excellent clinical foundations but need the conceptual biology depth that USMLE Step 1 demands.",
        'What we hear from Mumbai Step 1 candidates: (1) KEM/Grant graduates have strong pathology and clinical medicine but weaker basic-science conceptual depth; (2) the dedicated period is typically 4–6 months for Mumbai government-college graduates; (3) biochemistry pathways and immunology cascades are the consistent weak points. We calibrate around these patterns.',
      ],
    },
    faqs: [
      {
        question: 'Grant or KEM graduate — how long is the typical dedicated period?',
        answer:
          'Mumbai government-college graduates (Grant, Seth GS, KEM, Nair) typically need 4–6 months of dedicated Step 1 prep. Clinical exposure is strong — the gap is in basic-science conceptual depth, particularly biochemistry and immunology.',
      },
      {
        question: 'INR pricing for Mumbai candidates?',
        answer:
          'Self-Paced: ₹39,999. Small-Batch: ₹79,999. 1:1 Senior Faculty: ₹1,24,999. INR transfer, UPI, and international card accepted.',
      },
      {
        question: 'How does Cerebrum compare to Mumbai USMLE coaching centres?',
        answer:
          'Mumbai has several USMLE coaching centres charging ₹1.5L–₹3L for full Step 1 programmes. Cerebrum is a biology-foundations specialist at ₹39,999–₹1,24,999 for the ~55% of Step 1 that is biology-driven. Most candidates pair us with UWorld for question practice.',
      },
      {
        question: 'IST evening sessions for Mumbai candidates?',
        answer:
          'Small-batch: 8:00–10:00 PM IST weekday evenings. Weekend: 10:00 AM–12:00 PM IST. Dedicated-period candidates can take daytime IST slots.',
      },
    ],
  },

  hyderabad: {
    slug: 'hyderabad',
    city: 'Hyderabad',
    country: 'India',
    countryCode: 'IN',
    stateOrRegion: 'Telangana',
    timezone: 'India Standard Time',
    timezoneShort: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    locale: 'en_IN',
    metaTitle: 'USMLE Step 1 Tutor Hyderabad | Osmania, Gandhi, Deccan IMGs',
    metaDescription:
      'USMLE Step 1 biology-foundations tutor for Hyderabad IMGs — Osmania Medical, Gandhi Medical, Deccan College graduates. AIIMS-trained faculty. From ₹39,999.',
    keywords: [
      'USMLE Step 1 tutor Hyderabad',
      'USMLE tutor Osmania Medical',
      'USMLE tutor Gandhi Medical',
      'USMLE Step 1 coaching Hyderabad',
      'IMG ECFMG preparation Hyderabad',
      'USMLE Step 1 biology coaching Telangana',
    ],
    heroSubtitle:
      'USMLE Step 1 biology-foundations coaching for Osmania Medical College, Gandhi Medical College, and Deccan College of Medical Sciences graduates. AIIMS-trained faculty, IST sessions, ₹39,999 to ₹1,24,999.',
    whySection: {
      heading: 'Why Hyderabad is a growing USMLE Step 1 hub',
      paragraphs: [
        "Hyderabad produces a significant and growing USMLE Step 1 candidate pool. Osmania Medical College, Gandhi Medical College, Deccan College of Medical Sciences, and the numerous private medical colleges in Telangana and Andhra Pradesh drive IMG demand. The Hyderabad tech ecosystem (Google, Microsoft, Amazon, Infosys) also hosts IMGs' families who support the dedicated-period financially.",
        'Hyderabad IMGs share the same pattern as Delhi and Mumbai: strong clinical pattern recognition, weaker basic-science conceptual depth. The biology-foundations gap is consistent — biochemistry pathways, immunology mechanisms, and molecular biology reasoning.',
      ],
    },
    medSchools: [
      {
        name: 'Osmania Medical College',
        programmes: "MBBS, MD/MS (Hyderabad's oldest medical school)",
      },
      { name: 'Gandhi Medical College', programmes: 'MBBS, MD/MS' },
      { name: 'Deccan College of Medical Sciences', programmes: 'MBBS, MD/MS' },
      { name: 'Kamineni Institute of Medical Sciences', programmes: 'MBBS (Narketpally)' },
      { name: 'MediCiti Institute of Medical Sciences', programmes: 'MBBS (Ghanpur)' },
    ],
    timezoneSection:
      'All live sessions timed for IST. Standard Hyderabad small-batch: 8:00 PM to 10:00 PM IST weekday evenings. Weekend: 10:00 AM to 12:00 PM IST.',
    demographicSection: {
      heading: 'Hyderabad IMG pipeline',
      paragraphs: [
        'Hyderabad IMGs include graduates from Telangana government medical colleges (Osmania, Gandhi) and the numerous private medical colleges in Telangana/AP. The tech-sector family support structure in Hyderabad (HITEC City corridor) means many IMGs can sustain a 4–6 month dedicated period financially.',
        'What we hear from Hyderabad Step 1 candidates: (1) Osmania/Gandhi graduates have strong clinical exposure at government hospitals but need conceptual biology depth for Step 1; (2) the dedicated period is typically 4–6 months; (3) biochemistry and immunology are the consistent weak areas. We calibrate around these patterns.',
      ],
    },
    faqs: [
      {
        question: 'Osmania or Gandhi Medical graduate — typical dedicated period?',
        answer:
          'Hyderabad government-college graduates typically need 4–6 months of dedicated Step 1 prep. The pattern is the same as Delhi/Mumbai: strong clinical, weaker basic-science conceptual depth.',
      },
      {
        question: 'INR pricing for Hyderabad candidates?',
        answer:
          'Self-Paced: ₹39,999. Small-Batch: ₹79,999. 1:1 Senior Faculty: ₹1,24,999. INR transfer, UPI, and international card accepted.',
      },
      {
        question: 'How does Cerebrum compare to Hyderabad USMLE coaching?',
        answer:
          'Hyderabad has several USMLE coaching centres charging ₹1.5L–₹3L. Cerebrum is a biology-foundations specialist at ₹39,999–₹1,24,999 for the ~55% of Step 1 that is biology-driven. Most candidates pair us with UWorld.',
      },
      {
        question: 'IST sessions for Hyderabad candidates?',
        answer:
          'Small-batch: 8:00–10:00 PM IST weekday evenings. Weekend: 10:00 AM–12:00 PM IST. Dedicated-period candidates can take daytime IST slots.',
      },
    ],
  },
}

export function getUSMLEMetro(slug: string): USMLEMetroConfig | null {
  return usmleMetros[slug] ?? null
}

export const usmleMetroSlugs = Object.keys(usmleMetros)
