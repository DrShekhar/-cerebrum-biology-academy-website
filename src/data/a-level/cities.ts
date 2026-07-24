/**
 * A-Level Biology city-level configs for dynamic city landing pages.
 *
 * Each city drives:
 *  - metadata (title, description, keywords)
 *  - local currency pricing display
 *  - exam boards offered (AQA, OCR, Edexcel, CAIE)
 *  - local school names for trust and internal linking
 *  - timezone, country code for schema.org
 *  - city-specific FAQs for FAQ schema
 *
 * Exam board geography:
 *  - UK cities: AQA, OCR, Edexcel, CAIE all available
 *  - International cities: primarily CAIE (Cambridge International)
 *    and Edexcel International A-Level; some also offer AQA International
 *
 * Add a new city by adding a new entry — no new component code needed.
 */

export type ALevelExamBoard = 'AQA' | 'OCR' | 'Edexcel' | 'CAIE'

export interface ALevelFaq {
  question: string
  answer: string
}

export interface ALevelCityConfig {
  slug: string
  cityName: string
  countryCode: string
  country: string
  region: string
  timezone: string
  timezoneIana: string
  examBoards: ALevelExamBoard[]
  heroBlurb: string
  schools: string[]
  faqs: ALevelFaq[]
  pricing: {
    localCurrency: string
    currencySymbol: string
    perHour: number
    perHourText: string
  }
}

export const aLevelCities: ALevelCityConfig[] = [
  // ── UK (8 cities) ──────────────────────────────────────────────────
  {
    slug: 'london',
    cityName: 'London',
    countryCode: 'GB',
    country: 'United Kingdom',
    region: 'Greater London',
    timezone: 'GMT/BST',
    timezoneIana: 'Europe/London',
    examBoards: ['AQA', 'OCR', 'Edexcel', 'CAIE'],
    heroBlurb:
      "London is the UK's largest A-Level market with hundreds of sixth forms and independent schools offering Biology. Our tutors cover all four exam boards and align sessions to the London school calendar.",
    schools: [
      'Westminster School',
      "St Paul's School",
      'City of London School',
      "King's College School Wimbledon",
      'Dulwich College',
      'Latymer Upper School',
      'Highgate School',
      'University College School',
    ],
    faqs: [
      {
        question: 'Which A-Level Biology exam boards do London schools use?',
        answer:
          'London schools use all four boards. AQA and OCR A are most common in state sixth forms; independent schools often choose OCR A or CAIE. Edexcel (Pearson) is popular at large academy chains. We cover all four boards.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in London?',
        answer:
          'Our group sessions start at £55/hr; 1:1 tutoring with an examiner is higher. Annual programme packages are available. Contact us on WhatsApp for a tailored quote.',
      },
      {
        question: 'Do you offer in-person A-Level Biology tutoring in London?',
        answer:
          'All sessions are live online, timed for GMT/BST. This gives London students access to our best examiners regardless of location. Weekend intensive workshops are also available.',
      },
      {
        question: 'Can you help with A-Level Biology practicals and NEA?',
        answer:
          'Yes. We provide guidance on CPAC practicals (required endorsement), data analysis techniques, and exam-style practical questions across all boards.',
      },
      {
        question: 'How do your A-Level Biology sessions prepare for medicine applications?',
        answer:
          "Many London students target medicine at UCL, Imperial, or King's. We integrate BMAT/UCAT Biology overlap topics and help students articulate Biology knowledge in personal statements and interviews.",
      },
    ],
    pricing: {
      localCurrency: 'GBP',
      currencySymbol: '£',
      perHour: 55,
      perHourText: '£55–75/hr',
    },
  },
  {
    slug: 'manchester',
    cityName: 'Manchester',
    countryCode: 'GB',
    country: 'United Kingdom',
    region: 'Greater Manchester',
    timezone: 'GMT/BST',
    timezoneIana: 'Europe/London',
    examBoards: ['AQA', 'OCR', 'Edexcel'],
    heroBlurb:
      'Manchester has a strong sixth-form tradition with AQA headquartered in the city. Our tutors have deep familiarity with AQA Biology specification and the Manchester medical school admissions cycle.',
    schools: [
      'Manchester Grammar School',
      "Withington Girls' School",
      "The King's School Macclesfield",
      'Cheadle Hulme School',
      'Stockport Grammar School',
      'Altrincham Grammar School for Girls',
    ],
    faqs: [
      {
        question: 'Which exam board is most common for A-Level Biology in Manchester?',
        answer:
          'AQA is dominant in Manchester and across the North West, partly because AQA is headquartered in the city. OCR A is used by some independent schools. We cover both.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in Manchester?',
        answer:
          'Group sessions start at £45/hr. Annual programme packages and 1:1 examiner sessions are available at different price points.',
      },
      {
        question: 'Do you help Manchester students applying for medicine?',
        answer:
          'Yes. University of Manchester Medical School is a top target. We integrate UCAT Biology topics and personal statement coaching for medicine applicants.',
      },
      {
        question: 'Are sessions timed for UK school hours?',
        answer:
          'All sessions run on GMT/BST schedules, typically after school (4–6 PM) or weekend mornings. Recorded sessions are available for catch-up.',
      },
    ],
    pricing: {
      localCurrency: 'GBP',
      currencySymbol: '£',
      perHour: 45,
      perHourText: '£45–65/hr',
    },
  },
  {
    slug: 'birmingham',
    cityName: 'Birmingham',
    countryCode: 'GB',
    country: 'United Kingdom',
    region: 'West Midlands',
    timezone: 'GMT/BST',
    timezoneIana: 'Europe/London',
    examBoards: ['AQA', 'OCR', 'Edexcel'],
    heroBlurb:
      "Birmingham is the UK's second city with a large medical school intake at the University of Birmingham. Our A-Level Biology tutors support students across the West Midlands targeting medicine, dentistry, and bioscience degrees.",
    schools: [
      "King Edward's School Birmingham",
      'King Edward VI High School for Girls',
      'Edgbaston High School',
      'Solihull School',
      'Bromsgrove School',
      'Bablake School',
    ],
    faqs: [
      {
        question: 'Which A-Level Biology exam board do Birmingham schools prefer?',
        answer:
          'AQA and OCR A are the most common in Birmingham. State sixth forms lean towards AQA; independent schools vary. We support all boards.',
      },
      {
        question: 'How does your tutoring help with Birmingham medical school applications?',
        answer:
          'University of Birmingham Medical School is highly competitive. We cover UCAT-aligned Biology topics and provide mock interview practice for MMI stations with a Biology focus.',
      },
      {
        question: 'What is the cost of A-Level Biology tutoring for Birmingham students?',
        answer:
          'Group batch sessions start at £45/hr. 1:1 sessions and annual packages are available. WhatsApp us for a personalised quote.',
      },
      {
        question: 'Can you support students resitting A-Level Biology?',
        answer:
          'Yes. We run dedicated resit programmes for October and summer exam windows, with targeted revision plans based on your previous exam analysis.',
      },
    ],
    pricing: {
      localCurrency: 'GBP',
      currencySymbol: '£',
      perHour: 45,
      perHourText: '£45–65/hr',
    },
  },
  {
    slug: 'leeds',
    cityName: 'Leeds',
    countryCode: 'GB',
    country: 'United Kingdom',
    region: 'West Yorkshire',
    timezone: 'GMT/BST',
    timezoneIana: 'Europe/London',
    examBoards: ['AQA', 'OCR', 'Edexcel'],
    heroBlurb:
      'Leeds has a thriving sixth-form ecosystem with strong medicine application pipelines to Leeds Medical School and York. Our tutors specialise in AQA and OCR A Biology for Yorkshire students.',
    schools: [
      'Leeds Grammar School',
      'Bradford Grammar School',
      'Harrogate Grammar School',
      'The Grammar School at Leeds',
      "Ermysted's Grammar School",
      'Ilkley Grammar School',
    ],
    faqs: [
      {
        question: 'Which A-Level Biology exam board is used in Leeds?',
        answer:
          'AQA is the dominant board across Yorkshire. Some independent schools use OCR A. We cover both specifications thoroughly.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in Leeds?',
        answer:
          'Group sessions start at £40/hr. Annual packages and 1:1 examiner sessions are also available.',
      },
      {
        question: 'Do you support Leeds students targeting medicine?',
        answer:
          'Yes. University of Leeds School of Medicine and Hull York Medical School are popular targets. We align revision to UCAT Biology content and admissions timelines.',
      },
      {
        question: 'Are all sessions online?',
        answer:
          'Yes. All tutoring is live online via HD video and digital whiteboard, timed for GMT/BST. Recordings are available for review.',
      },
    ],
    pricing: {
      localCurrency: 'GBP',
      currencySymbol: '£',
      perHour: 40,
      perHourText: '£40–60/hr',
    },
  },
  {
    slug: 'edinburgh',
    cityName: 'Edinburgh',
    countryCode: 'GB',
    country: 'United Kingdom',
    region: 'Scotland',
    timezone: 'GMT/BST',
    timezoneIana: 'Europe/London',
    examBoards: ['AQA', 'OCR', 'CAIE'],
    heroBlurb:
      'Edinburgh is home to world-class medical and bioscience programmes at the University of Edinburgh. While Scotland primarily uses SQA, many independent schools offer A-Levels in Biology.',
    schools: [
      'Edinburgh Academy',
      "George Heriot's School",
      'Fettes College',
      'Merchiston Castle School',
      "Stewart's Melville College",
    ],
    faqs: [
      {
        question: 'Do Edinburgh schools offer A-Level Biology?',
        answer:
          "Many Edinburgh independent schools offer A-Levels alongside Scottish Highers. Edinburgh Academy, Fettes, and George Heriot's all offer A-Level Biology. We support both A-Level and Advanced Higher Biology.",
      },
      {
        question: 'Which exam boards are used in Edinburgh for A-Level Biology?',
        answer:
          'Independent schools in Edinburgh commonly use AQA, OCR A, or CAIE for A-Level Biology. We cover all three specifications.',
      },
      {
        question: 'How does A-Level Biology tutoring help with Edinburgh medical applications?',
        answer:
          'University of Edinburgh Medical School is among the most competitive in the UK. We integrate UCAT topics and help with Scottish medical school interview preparation.',
      },
      {
        question: 'What is the pricing for A-Level Biology tutoring in Edinburgh?',
        answer:
          'Group batch sessions start at £45/hr. 1:1 and annual packages are available. Contact us on WhatsApp for details.',
      },
    ],
    pricing: {
      localCurrency: 'GBP',
      currencySymbol: '£',
      perHour: 45,
      perHourText: '£45–65/hr',
    },
  },
  {
    slug: 'bristol',
    cityName: 'Bristol',
    countryCode: 'GB',
    country: 'United Kingdom',
    region: 'South West England',
    timezone: 'GMT/BST',
    timezoneIana: 'Europe/London',
    examBoards: ['AQA', 'OCR', 'Edexcel'],
    heroBlurb:
      'Bristol is a hub for bioscience and medicine in the South West. University of Bristol and UWE attract strong Biology applicants, and our tutors support sixth formers across the region.',
    schools: [
      'Bristol Grammar School',
      'Clifton College',
      'Badminton School',
      "Colston's School",
      "Queen Elizabeth's Hospital",
      'Redland Green School',
    ],
    faqs: [
      {
        question: 'Which A-Level Biology exam board is popular in Bristol?',
        answer:
          'Bristol schools use a mix of AQA, OCR A, and Edexcel. Bristol Grammar and Clifton College typically use OCR A. State sixth forms vary. We support all boards.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in Bristol?',
        answer:
          'Group sessions start at £45/hr. 1:1 sessions with examiners and annual programmes are available at different price points.',
      },
      {
        question: 'Do you help with practicals and coursework?',
        answer:
          'Yes. We guide students through CPAC practical endorsement, data analysis, and exam-style practical questions for all boards.',
      },
      {
        question: 'Can you support Bristol students applying to medicine or veterinary science?',
        answer:
          'Absolutely. Bristol is a top destination for medicine, dentistry, and veterinary science. We cover UCAT-aligned topics and help with personal statements.',
      },
    ],
    pricing: {
      localCurrency: 'GBP',
      currencySymbol: '£',
      perHour: 45,
      perHourText: '£45–65/hr',
    },
  },
  {
    slug: 'cambridge',
    cityName: 'Cambridge',
    countryCode: 'GB',
    country: 'United Kingdom',
    region: 'Cambridgeshire',
    timezone: 'GMT/BST',
    timezoneIana: 'Europe/London',
    examBoards: ['OCR', 'AQA', 'CAIE'],
    heroBlurb:
      'Cambridge is synonymous with academic excellence. Home to OCR (Oxford, Cambridge and RSA) and the University of Cambridge, the city has uniquely high A-Level Biology standards. Our tutors help students meet them.',
    schools: [
      'The Perse School',
      'The Leys School',
      'Stephen Perse Foundation',
      'Hills Road Sixth Form College',
      'Long Road Sixth Form College',
      'Impington International College',
    ],
    faqs: [
      {
        question: 'Which A-Level Biology exam board do Cambridge schools use?',
        answer:
          'OCR A is very common given OCR is based in Cambridge. The Perse and Hills Road both use OCR A. Some schools offer CAIE for international cohorts. We cover all boards.',
      },
      {
        question: 'How does your tutoring prepare students for Cambridge Natural Sciences?',
        answer:
          'We cover A-Level Biology beyond specification depth, integrating the kind of critical thinking and problem-solving Cambridge NatSci interviews expect. We also run BMAT Biology preparation.',
      },
      {
        question: 'What is the cost of A-Level Biology tutoring for Cambridge students?',
        answer:
          'Group sessions start at £50/hr. 1:1 with an examiner and Oxbridge-focused packages are available. WhatsApp us for details.',
      },
      {
        question: 'Do you offer Oxbridge interview preparation for Biology?',
        answer:
          'Yes. We run dedicated Oxbridge Biology interview workshops covering data interpretation, experimental design, and thinking-aloud problem-solving in a Biology context.',
      },
    ],
    pricing: {
      localCurrency: 'GBP',
      currencySymbol: '£',
      perHour: 50,
      perHourText: '£50–70/hr',
    },
  },
  {
    slug: 'oxford',
    cityName: 'Oxford',
    countryCode: 'GB',
    country: 'United Kingdom',
    region: 'Oxfordshire',
    timezone: 'GMT/BST',
    timezoneIana: 'Europe/London',
    examBoards: ['OCR', 'AQA', 'CAIE'],
    heroBlurb:
      'Oxford combines world-leading academia with a strong independent school tradition. Our A-Level Biology tutors help Oxford students achieve A* grades and prepare for competitive university applications.',
    schools: [
      'Magdalen College School',
      'Oxford High School',
      "St Edward's School",
      'Headington School',
      'Abingdon School',
      "d'Overbroeck's",
    ],
    faqs: [
      {
        question: 'Which A-Level Biology exam board is popular in Oxford?',
        answer:
          'OCR A is the most common board in Oxfordshire, followed by AQA. Some international schools use CAIE. We support all specifications.',
      },
      {
        question: 'Do you help with Oxford Biomedical Sciences interview preparation?',
        answer:
          'Yes. We run dedicated Oxford Biology interview coaching covering graph interpretation, experimental design, and scientific reasoning under pressure.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost for Oxford students?',
        answer:
          'Group sessions start at £50/hr. Oxbridge-focused 1:1 packages are available. Contact us via WhatsApp for a tailored quote.',
      },
      {
        question: 'Can you support students doing both A-Level Biology and Chemistry?',
        answer:
          'Many of our students take both. We offer integrated Biology + Chemistry packages that highlight the biochemistry overlap and save time on shared topics.',
      },
    ],
    pricing: {
      localCurrency: 'GBP',
      currencySymbol: '£',
      perHour: 50,
      perHourText: '£50–70/hr',
    },
  },

  // ── UAE (2 cities) ─────────────────────────────────────────────────
  {
    slug: 'dubai',
    cityName: 'Dubai',
    countryCode: 'AE',
    country: 'United Arab Emirates',
    region: 'Dubai',
    timezone: 'GST',
    timezoneIana: 'Asia/Dubai',
    examBoards: ['CAIE', 'Edexcel'],
    heroBlurb:
      'Dubai has one of the largest concentrations of British curriculum schools outside the UK. CAIE and Edexcel International A-Level Biology are the dominant qualifications, and our tutors cover both.',
    schools: [
      'Dubai College',
      'Jumeirah English Speaking School',
      "Kings' School Dubai",
      'Repton School Dubai',
      'Brighton College Dubai',
      'GEMS Wellington International School',
    ],
    faqs: [
      {
        question: 'Which A-Level Biology exam board do Dubai schools use?',
        answer:
          'Most British schools in Dubai use CAIE (Cambridge International) or Edexcel International A-Level for Biology. Dubai College, JESS, and Repton all use CAIE. We cover both boards.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in Dubai?',
        answer:
          'Group sessions start at AED 200/hr. 1:1 with an examiner and annual packages are available. Pricing is in AED.',
      },
      {
        question: 'Do you offer sessions timed for Dubai school hours?',
        answer:
          'Yes. All sessions are timed for GST (UTC+4). We schedule after-school slots (3–5 PM GST) and weekend blocks to fit the Sunday–Thursday school week.',
      },
      {
        question: 'Can you help Dubai students applying to UK universities?',
        answer:
          'Absolutely. Most A-Level students in Dubai target UK Russell Group universities. We help with UCAS personal statements, BMAT/UCAT preparation, and predicted-grade strategy.',
      },
      {
        question: 'Do you cover the CAIE practical paper (Paper 3)?',
        answer:
          'Yes. CAIE A-Level Biology includes a practical paper (Paper 3 for AS, Paper 5 for A2). We provide dedicated practical-skills coaching and past-paper practice for these components.',
      },
    ],
    pricing: {
      localCurrency: 'AED',
      currencySymbol: 'AED',
      perHour: 200,
      perHourText: 'AED 200–300/hr',
    },
  },
  {
    slug: 'abu-dhabi',
    cityName: 'Abu Dhabi',
    countryCode: 'AE',
    country: 'United Arab Emirates',
    region: 'Abu Dhabi',
    timezone: 'GST',
    timezoneIana: 'Asia/Dubai',
    examBoards: ['CAIE', 'Edexcel'],
    heroBlurb:
      'Abu Dhabi hosts elite British curriculum schools serving the diplomatic, energy, and government sectors. Our A-Level Biology tutors support CAIE and Edexcel students across the emirate.',
    schools: [
      'Brighton College Abu Dhabi',
      'The British School Al Khubairat',
      'Cranleigh Abu Dhabi',
      'Raha International School',
      'GEMS Cambridge International School',
    ],
    faqs: [
      {
        question: 'Which A-Level Biology exam boards are used in Abu Dhabi?',
        answer:
          'CAIE and Edexcel International A-Level are the two main boards in Abu Dhabi British schools. Brighton College and Cranleigh use CAIE. We cover both.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in Abu Dhabi?',
        answer:
          'Group sessions start at AED 200/hr. 1:1 and annual programme pricing is available. Contact us on WhatsApp for a quote.',
      },
      {
        question: 'Do you help Abu Dhabi students with UK medical school applications?',
        answer:
          'Yes. Many Abu Dhabi A-Level students target UK medical schools. We integrate UCAT/BMAT Biology overlap topics and provide personal statement coaching.',
      },
      {
        question: 'Are sessions scheduled for GST timezone?',
        answer:
          'Yes. All sessions are timed for GST (UTC+4), with after-school and weekend options aligned to the Abu Dhabi school calendar.',
      },
    ],
    pricing: {
      localCurrency: 'AED',
      currencySymbol: 'AED',
      perHour: 200,
      perHourText: 'AED 200–300/hr',
    },
  },

  // ── Singapore (1) ──────────────────────────────────────────────────
  {
    slug: 'singapore',
    cityName: 'Singapore',
    countryCode: 'SG',
    country: 'Singapore',
    region: 'Singapore',
    timezone: 'SGT',
    timezoneIana: 'Asia/Singapore',
    examBoards: ['CAIE', 'Edexcel'],
    heroBlurb:
      "Singapore's British international schools offer CAIE and Edexcel A-Level Biology alongside the local H2 Biology pathway. Our tutors support both international A-Level and cross-preparation for NUS/NTU admissions.",
    schools: [
      'Tanglin Trust School',
      'Dover Court International School',
      'Dulwich College Singapore',
      'Nexus International School',
      'Marlborough College Malaysia (Singapore feeder)',
    ],
    faqs: [
      {
        question: 'Which A-Level Biology boards are offered in Singapore?',
        answer:
          'Tanglin Trust and Dover Court primarily use CAIE. Some schools offer Edexcel International A-Level. We cover both boards and can also support H2 Biology overlap topics.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in Singapore?',
        answer:
          'Group sessions start at S$100/hr. 1:1 with an examiner and annual programme pricing are available. SGT-aligned sessions.',
      },
      {
        question: 'Can you help Singapore students targeting UK universities?',
        answer:
          'Yes. Many Singapore A-Level students apply to UK Russell Group and Oxbridge. We support UCAS strategy, BMAT/UCAT preparation, and predicted-grade optimisation.',
      },
      {
        question: 'Do you cover CAIE practical papers?',
        answer:
          'Yes. We provide dedicated coaching for CAIE Paper 3 (AS practical) and Paper 5 (A2 planning/analysis), including past-paper practice and examiner-level feedback.',
      },
    ],
    pricing: {
      localCurrency: 'SGD',
      currencySymbol: 'S$',
      perHour: 100,
      perHourText: 'S$100–140/hr',
    },
  },

  // ── Hong Kong (1) ──────────────────────────────────────────────────
  {
    slug: 'hong-kong',
    cityName: 'Hong Kong',
    countryCode: 'HK',
    country: 'Hong Kong SAR',
    region: 'Hong Kong',
    timezone: 'HKT',
    timezoneIana: 'Asia/Hong_Kong',
    examBoards: ['CAIE', 'Edexcel'],
    heroBlurb:
      "Hong Kong's British international schools deliver CAIE and Edexcel A-Level Biology to students targeting UK and Hong Kong university medicine programmes. Our tutors support both boards with HKT-aligned sessions.",
    schools: [
      'Harrow International School Hong Kong',
      'Kellett School',
      'Malvern College Hong Kong',
      'Island School (ESF)',
      'King George V School (ESF)',
      'South Island School (ESF)',
    ],
    faqs: [
      {
        question: 'Which A-Level Biology exam boards do Hong Kong schools use?',
        answer:
          'CAIE is the most common board in Hong Kong British schools. ESF schools and Harrow use CAIE. Kellett uses Edexcel. We cover both boards.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in Hong Kong?',
        answer:
          'Group sessions start at HK$550/hr. 1:1 examiner sessions and annual packages are available. HKT-aligned scheduling.',
      },
      {
        question: 'Do you help Hong Kong students applying to HKU or CUHK medicine?',
        answer:
          'Yes. HKU MBBS and CUHK Medicine are top targets for Hong Kong A-Level students. We cover the Biology topics emphasised in local medical school admissions tests.',
      },
      {
        question: 'Can you support students doing A-Level and DSE simultaneously?',
        answer:
          'Some Hong Kong students do both. We can integrate A-Level Biology prep with DSE Biology overlap topics to save study time.',
      },
    ],
    pricing: {
      localCurrency: 'HKD',
      currencySymbol: 'HK$',
      perHour: 550,
      perHourText: 'HK$550–750/hr',
    },
  },

  // ── India (4 cities) ───────────────────────────────────────────────
  {
    slug: 'south-delhi',
    cityName: 'South Delhi',
    countryCode: 'IN',
    country: 'India',
    region: 'Delhi NCR',
    timezone: 'IST',
    timezoneIana: 'Asia/Kolkata',
    examBoards: ['CAIE', 'Edexcel'],
    heroBlurb:
      "South Delhi is home to The British School and the capital's densest cluster of internationally minded families — Vasant Vihar, Chanakyapuri, GK, Defence Colony. Cerebrum coaches A-Level Biology in person at our South Extension centre (D-35, South Extension Part 2) and online, for students targeting UK and Indian medical schools.",
    schools: [
      'The British School New Delhi',
      'American Embassy School (AP/IB families considering A-Level tuition)',
      'Vasant Valley School',
      'Sanskriti School',
      'The Shri Ram School',
    ],
    faqs: [
      {
        question: 'Where do South Delhi A-Level Biology students study with Cerebrum?',
        answer:
          'In person at our South Extension flagship (D-35, South Extension Part 2, near AIIMS) or our Gulmohar Park centre near Green Park — both minutes from Vasant Vihar, Chanakyapuri, GK and Defence Colony — or live online on IST-friendly slots.',
      },
      {
        question: 'Which A-Level exam boards do South Delhi students use?',
        answer:
          'CAIE dominates — The British School New Delhi uses CAIE A-Level Biology. Some students on Edexcel International A-Level are also supported, with board-specific past-paper training.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in South Delhi?',
        answer:
          'Group sessions start at ₹2,000/hr. Annual programme packages from ₹60,000/year. 1:1 examiner-style sessions are also available at the South Extension centre or online.',
      },
      {
        question: 'Can Cerebrum prepare a South Delhi student for both A-Level and NEET Biology?',
        answer:
          'Yes. Several South Delhi families keep UK and Indian medical options open. Our integrated track covers both curricula, using the heavy overlap in cell biology, genetics and human physiology.',
      },
      {
        question: 'Which universities do South Delhi A-Level students target?',
        answer:
          "Mostly UK Russell Group (Imperial, UCL, Edinburgh, King's) for medicine and biosciences; some also use A-Level grades for Indian private medical colleges alongside NEET.",
      },
    ],
    pricing: {
      localCurrency: 'INR',
      currencySymbol: '₹',
      perHour: 2000,
      perHourText: '₹2,000–3,500/hr',
    },
  },
  {
    slug: 'faridabad',
    cityName: 'Faridabad',
    countryCode: 'IN',
    country: 'India',
    region: 'Delhi NCR',
    timezone: 'IST',
    timezoneIana: 'Asia/Kolkata',
    examBoards: ['CAIE', 'Edexcel'],
    heroBlurb:
      'If your child is on an A-Level track in Faridabad — at Manav Rachna International, DPS, Apeejay or Ryan International — Cerebrum coaches A-Level Biology online and in person at our Sector 17 centre (SCF-130, Huda Market), for students aiming at UK and Indian medical schools without the daily trip into Delhi.',
    schools: [
      'Manav Rachna International School (MRIS)',
      'Delhi Public School Faridabad',
      'Apeejay School Faridabad',
      'Ryan International School',
      'The Shri Ram School',
    ],
    faqs: [
      {
        question: 'Where do Faridabad A-Level Biology students study with Cerebrum?',
        answer:
          'In person at our Faridabad centre (SCF-130, 2nd Floor, Above Union Bank, Huda Market, Sector 17), a short hop from Bata Chowk Metro — or live online on IST-friendly slots if you prefer to skip the commute.',
      },
      {
        question: 'Which A-Level exam boards do Faridabad students use?',
        answer:
          'Mostly CAIE (Cambridge International) A-Level Biology, with Edexcel International A-Level students also supported. Every batch trains on board-specific past papers and mark schemes.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in Faridabad?',
        answer:
          'Group sessions start at ₹2,000/hr, with annual programme packages from ₹60,000/year. One-to-one examiner-style sessions are available at the Sector 17 centre or online.',
      },
      {
        question: 'Can you prepare a Faridabad student for both A-Level and NEET Biology?',
        answer:
          'Yes. If you want to keep UK and Indian medical options open, our integrated track covers both curricula, using the heavy overlap in cell biology, genetics and human physiology.',
      },
      {
        question: 'Which universities do Faridabad A-Level students target?',
        answer:
          "Mostly UK Russell Group (Imperial, UCL, Edinburgh, King's) for medicine and biosciences; some also use A-Level grades for Indian private medical colleges alongside NEET.",
      },
    ],
    pricing: {
      localCurrency: 'INR',
      currencySymbol: '₹',
      perHour: 2000,
      perHourText: '₹2,000–3,500/hr',
    },
  },
  {
    slug: 'gurugram',
    cityName: 'Gurugram',
    countryCode: 'IN',
    country: 'India',
    region: 'Delhi NCR',
    timezone: 'IST',
    timezoneIana: 'Asia/Kolkata',
    examBoards: ['CAIE', 'Edexcel'],
    heroBlurb:
      "Gurugram has one of Delhi NCR's biggest clusters of international schools — Scottish High, GD Goenka World, Pathways, Heritage Xperiential and Lancers all run A-Level or IB tracks. Cerebrum coaches A-Level Biology online and in person at our Sector 51 centre (M2K Corporate Park), for students targeting UK and Indian medical schools.",
    schools: [
      'Scottish High International School',
      'GD Goenka World School',
      'Pathways World School, Aravali',
      'Heritage Xperiential Learning School',
      'Lancers International School',
      'DPS International Edge',
    ],
    faqs: [
      {
        question: 'Where do Gurugram A-Level Biology students study with Cerebrum?',
        answer:
          'In person at our Sector 51 centre (Unit 17, M2K Corporate Park, Mayfield Garden), central to DLF, Golf Course Road and Sohna Road — or live online on IST-friendly slots if you prefer to skip the commute.',
      },
      {
        question: 'Which A-Level exam boards do Gurugram schools use?',
        answer:
          'Mostly CAIE (Cambridge International) A-Level Biology, with Edexcel International A-Level also supported. Schools like Scottish High and Lancers run CAIE; every batch trains on board-specific past papers and mark schemes.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in Gurugram?',
        answer:
          'Group sessions start at ₹2,000/hr, with annual programme packages from ₹60,000/year. One-to-one examiner-style sessions are available at the Sector 51 centre or online.',
      },
      {
        question: 'Can you prepare a Gurugram student for both A-Level and NEET Biology?',
        answer:
          'Yes. If you want to keep UK and Indian medical options open, our integrated track covers both curricula, using the heavy overlap in cell biology, genetics and human physiology.',
      },
      {
        question: 'Which universities do Gurugram A-Level students target?',
        answer:
          "Mostly UK Russell Group (Imperial, UCL, Edinburgh, King's) for medicine and biosciences; some also use A-Level grades for Indian private medical colleges alongside NEET.",
      },
    ],
    pricing: {
      localCurrency: 'INR',
      currencySymbol: '₹',
      perHour: 2000,
      perHourText: '₹2,000–3,500/hr',
    },
  },
  {
    slug: 'delhi-ncr',
    cityName: 'Delhi NCR',
    countryCode: 'IN',
    country: 'India',
    region: 'Delhi NCR',
    timezone: 'IST',
    timezoneIana: 'Asia/Kolkata',
    examBoards: ['CAIE', 'Edexcel'],
    heroBlurb:
      'Delhi NCR has a growing cluster of British international schools offering CAIE and Edexcel A-Level Biology. Cerebrum runs both in-person and online coaching for Delhi NCR A-Level students targeting UK and Indian medical schools.',
    schools: [
      'The British School New Delhi',
      'Pathways World School Aravali',
      'Scottish High International School',
      'Heritage Xperiential Learning School',
      'Lancers International School',
      'DPS International School',
    ],
    faqs: [
      {
        question: 'Which A-Level Biology exam boards do Delhi NCR schools use?',
        answer:
          'CAIE is the dominant board for A-Level Biology in Delhi NCR. The British School, Pathways Aravali, and Scottish High all use CAIE. Some schools offer Edexcel International A-Level.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in Delhi NCR?',
        answer:
          'Group sessions start at ₹2,000/hr. Annual programme packages from ₹60,000/year. 1:1 examiner sessions are also available.',
      },
      {
        question: 'Can Cerebrum help with both A-Level and NEET Biology?',
        answer:
          'Yes. Many Delhi NCR families want dual A-Level + NEET preparation. Our integrated programme covers both curricula efficiently, leveraging the significant content overlap in cell biology, genetics, and human physiology.',
      },
      {
        question: 'Do you offer in-person A-Level Biology classes in Delhi NCR?',
        answer:
          'Yes. Our South Extension and Gurugram centres offer in-person A-Level Biology classes alongside IST-aligned online sessions.',
      },
      {
        question: 'Which universities do Delhi NCR A-Level students typically target?',
        answer:
          "Most target UK Russell Group universities (Imperial, UCL, Edinburgh, King's) for medicine or biosciences. Some also apply to Indian private medical colleges using A-Level grades.",
      },
    ],
    pricing: {
      localCurrency: 'INR',
      currencySymbol: '₹',
      perHour: 2000,
      perHourText: '₹2,000–3,500/hr',
    },
  },
  {
    slug: 'mumbai',
    cityName: 'Mumbai',
    countryCode: 'IN',
    country: 'India',
    region: 'Maharashtra',
    timezone: 'IST',
    timezoneIana: 'Asia/Kolkata',
    examBoards: ['CAIE', 'Edexcel'],
    heroBlurb:
      'Mumbai hosts several prestigious British international schools offering CAIE A-Level Biology. Our tutors support Mumbai students with IST-aligned sessions covering both CAIE and Edexcel specifications.',
    schools: [
      'Bombay International School',
      'Cathedral and John Connon School',
      'BD Somani International School',
      'Dhirubhai Ambani International School',
      'Oberoi International School',
      'Jamnabai Narsee International School',
    ],
    faqs: [
      {
        question: 'Which Mumbai schools offer A-Level Biology?',
        answer:
          'Bombay International School, BD Somani, and several other Mumbai schools offer CAIE A-Level Biology. DAIS and Oberoi primarily offer IB but some students take A-Levels. We cover both boards.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in Mumbai?',
        answer:
          'Group sessions start at ₹2,000/hr. Annual packages from ₹60,000/year. Contact us on WhatsApp for a personalised quote.',
      },
      {
        question: 'Do you support dual A-Level and NEET preparation?',
        answer:
          'Yes. Mumbai families frequently want both pathways covered. Our integrated programme handles the overlap efficiently.',
      },
      {
        question: 'What are sessions scheduled around?',
        answer:
          'All sessions run on IST, with after-school (4–6 PM) and weekend slots available. Recorded sessions for catch-up.',
      },
    ],
    pricing: {
      localCurrency: 'INR',
      currencySymbol: '₹',
      perHour: 2000,
      perHourText: '₹2,000–3,500/hr',
    },
  },
  {
    slug: 'bangalore',
    cityName: 'Bangalore',
    countryCode: 'IN',
    country: 'India',
    region: 'Karnataka',
    timezone: 'IST',
    timezoneIana: 'Asia/Kolkata',
    examBoards: ['CAIE', 'Edexcel'],
    heroBlurb:
      "Bangalore's tech-driven international school community includes several schools offering CAIE A-Level Biology. Our tutors provide IST-aligned sessions with deep familiarity with the Bangalore academic calendar.",
    schools: [
      'Canadian International School',
      'Stonehill International School',
      'Indus International School',
      'Oakridge International School',
      'Greenwood High International School',
    ],
    faqs: [
      {
        question: 'Which Bangalore schools offer A-Level Biology?',
        answer:
          'Canadian International School, Stonehill, and several other Bangalore schools offer CAIE A-Level Biology alongside IB. We cover both CAIE and Edexcel specifications.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in Bangalore?',
        answer:
          'Group sessions start at ₹2,000/hr. Annual programme packages and 1:1 examiner sessions are available.',
      },
      {
        question: 'Do you help Bangalore students apply to UK universities?',
        answer:
          'Yes. Many Bangalore A-Level students target UK Russell Group universities for medicine and biosciences. We support UCAS applications, BMAT/UCAT prep, and personal statements.',
      },
      {
        question: 'Can you help with the CAIE practical component?',
        answer:
          'Yes. We provide dedicated coaching for CAIE Paper 3 and Paper 5 practical skills, including data analysis and experimental design.',
      },
    ],
    pricing: {
      localCurrency: 'INR',
      currencySymbol: '₹',
      perHour: 2000,
      perHourText: '₹2,000–3,500/hr',
    },
  },
  {
    slug: 'hyderabad',
    cityName: 'Hyderabad',
    countryCode: 'IN',
    country: 'India',
    region: 'Telangana',
    timezone: 'IST',
    timezoneIana: 'Asia/Kolkata',
    examBoards: ['CAIE', 'Edexcel'],
    heroBlurb:
      "Hyderabad's growing international school sector includes British curriculum schools offering CAIE A-Level Biology. Our tutors provide IST-aligned sessions for Hyderabad students targeting UK and Indian medical pathways.",
    schools: [
      'Oakridge International School',
      'Chirec International School',
      'Glendale Academy',
      'Delhi Public School International',
      'Aga Khan Academy Hyderabad',
    ],
    faqs: [
      {
        question: 'Which Hyderabad schools offer A-Level Biology?',
        answer:
          'Oakridge, Chirec, and Glendale offer CAIE or Edexcel A-Level Biology. DPS International also supports A-Level pathways. We cover both boards.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost in Hyderabad?',
        answer:
          'Group sessions start at ₹2,000/hr. Annual packages and 1:1 examiner options available. WhatsApp us for a quote.',
      },
      {
        question: 'Do you offer integrated A-Level + NEET coaching?',
        answer:
          'Yes. Our dual-pathway programme covers the significant overlap between A-Level and NEET Biology, saving time and improving outcomes across both exams.',
      },
      {
        question: 'What timezone are sessions scheduled for?',
        answer:
          'All sessions run on IST. After-school and weekend slots available with recordings for catch-up.',
      },
    ],
    pricing: {
      localCurrency: 'INR',
      currencySymbol: '₹',
      perHour: 2000,
      perHourText: '₹2,000–3,500/hr',
    },
  },

  // ── Malaysia (1) ───────────────────────────────────────────────────
  {
    slug: 'kuala-lumpur',
    cityName: 'Kuala Lumpur',
    countryCode: 'MY',
    country: 'Malaysia',
    region: 'Kuala Lumpur',
    timezone: 'MYT',
    timezoneIana: 'Asia/Kuala_Lumpur',
    examBoards: ['CAIE', 'Edexcel'],
    heroBlurb:
      'Kuala Lumpur hosts a large network of British international schools and private colleges offering CAIE and Edexcel A-Level Biology. Our MYT-aligned sessions support KL students targeting UK and Malaysian medical schools.',
    schools: [
      'Alice Smith School',
      'Garden International School',
      'Marlborough College Malaysia',
      'Epsom College in Malaysia',
      "Taylor's College",
      'INTI International College',
    ],
    faqs: [
      {
        question: 'Which A-Level Biology exam boards are used in Kuala Lumpur?',
        answer:
          "CAIE is the dominant board in KL. Alice Smith, Garden International, and Marlborough College all use CAIE. Taylor's College offers Edexcel. We cover both.",
      },
      {
        question: 'How much does A-Level Biology tutoring cost in KL?',
        answer:
          'Group sessions start at RM 180/hr. Annual packages and 1:1 examiner sessions are available. MYT-aligned scheduling.',
      },
      {
        question: 'Do you help KL students applying to UK universities?',
        answer:
          'Yes. Many KL A-Level students target UK medical schools and Russell Group universities. We support UCAS strategy, BMAT/UCAT prep, and personal statements.',
      },
      {
        question: 'Can you support students doing STPM and A-Level?',
        answer:
          'While STPM and CAIE A-Level are different qualifications, we focus on CAIE and Edexcel. Some Biology topics overlap, and we can advise on content bridges.',
      },
    ],
    pricing: {
      localCurrency: 'MYR',
      currencySymbol: 'RM',
      perHour: 180,
      perHourText: 'RM 180–260/hr',
    },
  },

  // ── Nigeria (1) ────────────────────────────────────────────────────
  {
    slug: 'lagos',
    cityName: 'Lagos',
    countryCode: 'NG',
    country: 'Nigeria',
    region: 'Lagos State',
    timezone: 'WAT',
    timezoneIana: 'Africa/Lagos',
    examBoards: ['CAIE', 'Edexcel'],
    heroBlurb:
      "Lagos has a thriving British curriculum school community serving Nigeria's elite families. CAIE and Edexcel A-Level Biology are the standard pathways for students targeting UK medical schools from Nigeria.",
    schools: [
      'British International School Lagos',
      'Grange School',
      'Meadow Hall Group of Schools',
      'Greensprings School',
      'Dowen College',
      'Chrisland School',
    ],
    faqs: [
      {
        question: 'Which A-Level Biology exam boards do Lagos schools use?',
        answer:
          'CAIE is the dominant board in Lagos. British International School and Grange School use CAIE. Greensprings offers Edexcel. We cover both boards.',
      },
      {
        question: 'How much does A-Level Biology tutoring cost for Lagos students?',
        answer:
          'Pricing is in USD for international sessions: group sessions start at $40/hr. Annual packages and 1:1 examiner options are available.',
      },
      {
        question: 'Do you help Lagos students apply to UK medical schools?',
        answer:
          'Yes. UK medical schools are the primary target for Lagos A-Level students. We support UCAS applications, BMAT/UCAT preparation, and interview practice.',
      },
      {
        question: 'What timezone are sessions scheduled for?',
        answer:
          'Sessions are timed for WAT (UTC+1), which is close to GMT. After-school and weekend slots are available. All sessions are recorded.',
      },
      {
        question: 'Can you support WAEC and A-Level Biology simultaneously?',
        answer:
          'While WAEC and CAIE A-Level are separate qualifications, there is significant content overlap. We focus on A-Level but can advise on bridging topics.',
      },
    ],
    pricing: {
      localCurrency: 'USD',
      currencySymbol: '$',
      perHour: 40,
      perHourText: '$40–60/hr',
    },
  },
]

const cityMap = new Map<string, ALevelCityConfig>(aLevelCities.map((c) => [c.slug, c]))

export function aLevelCitySlugs(): string[] {
  return aLevelCities.map((c) => c.slug)
}

export function getALevelCityBySlug(slug: string): ALevelCityConfig | null {
  return cityMap.get(slug) ?? null
}
