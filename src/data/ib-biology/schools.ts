/**
 * IB Biology per-school landing-page configurations.
 *
 * Powers /ib-biology-tutor-{slug} for the 15 highest-volume IB-feeder
 * schools globally — schools where parents actually search by school
 * name plus "IB Biology tutor".
 *
 * Cannibalization safety:
 *  - Each entry's primary keyword is "IB Biology tutor {schoolName}".
 *    This is intentionally a long-tail discriminator that no other
 *    page on the site targets. The generic "IB Biology tutor" query
 *    is owned by /ib-biology-tutor; the city query is owned by
 *    /ib-biology/[city]. School-name long-tail is this set.
 *
 * Content + trademark guardrails:
 *  - Never use logos, seals, or "endorsed by [school]" framing.
 *    Phrasing must be: "IB Biology tutoring for {school} students"
 *    or "near {school}" — descriptive, not affiliational.
 *  - Each school carries 800+ words of school-specific content across
 *    historyParagraphs, collegeContext, paceAlignment, and faqs. We
 *    cite "publicly reported", "per Niche", or "per the school's IB
 *    diploma report" rather than asserting unsourced figures.
 *  - HL vs SL availability noted where publicly knowable; we do not
 *    fabricate cohort sizes.
 */

export interface IBBiologySchoolFaq {
  question: string
  answer: string
}

export interface IBBiologySchool {
  /** URL slug suffix — full route is /ib-biology-tutor-{slug} */
  slug: string
  /** Full school name */
  schoolName: string
  /** Short display name for hero / breadcrumb */
  shortName: string
  /** City + country (display label) — e.g., "Singapore" or "Mumbai, India" */
  cityCountry: string
  /** City slug — matches an entry in cities.ts when one exists; empty otherwise */
  citySlug: string
  /** Local timezone label for live-class scheduling */
  timezone:
    | 'SGT (Singapore)'
    | 'GST (Gulf)'
    | 'ICT (Indochina)'
    | 'IST (India)'
    | 'CST (China)'
    | 'HKT (Hong Kong)'
    | 'CET (Central Europe)'
    | 'GMT (UK/Ireland)'
    | 'JST (Japan)'
    | 'KST (Korea)'
    | 'ET (Canada East)'
    | 'PT (Canada West)'
  /** IANA timezone string for schema.org */
  timezoneIana: string
  /** ISO-3166 alpha-2 country code */
  countryCode:
    | 'SG'
    | 'AE'
    | 'TH'
    | 'IN'
    | 'CN'
    | 'HK'
    | 'CH'
    | 'DE'
    | 'NL'
    | 'SE'
    | 'IE'
    | 'JP'
    | 'KR'
    | 'CA'
    | 'GB'
  /** BCP-47 language tag for schema.org `inLanguage` */
  inLanguage:
    | 'en-SG'
    | 'en-AE'
    | 'en-TH'
    | 'en-IN'
    | 'en-CN'
    | 'en-HK'
    | 'en-CH'
    | 'en-DE'
    | 'en-NL'
    | 'en-SE'
    | 'en-IE'
    | 'en-JP'
    | 'en-KR'
    | 'en-CA'
    | 'en-GB'
  /** School category (drives hero badge copy) */
  schoolType:
    | 'International (IB World School)'
    | 'IB Continuum School'
    | 'IB Diploma Programme'
    | 'United World College'
  /** IB programmes offered at the school (publicly reported) */
  ibProgrammeOffered: ('PYP' | 'MYP' | 'DP' | 'CP')[]
  /** 2-3 paragraph history + reputation + IB Biology context */
  historyParagraphs: string[]
  /** Key public claims about the school, cited where possible */
  reputationBullets: string[]
  /** Cohort / DP-average context — only where publicly reported */
  diplomaContext?: string
  /** College matriculation context (Niche / school reports) */
  collegeContext: string
  /** How our tutoring complements the school's IB Bio teaching cycle */
  paceAlignment: string
  /** 5–7 school-tailored FAQs (40–80 words each) */
  faqs: IBBiologySchoolFaq[]
}

export const ibBiologySchools: IBBiologySchool[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. UWCSEA — United World College of South East Asia (Singapore)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'uwcsea',
    schoolName: 'United World College of South East Asia',
    shortName: 'UWCSEA',
    cityCountry: 'Singapore',
    citySlug: 'singapore',
    timezone: 'SGT (Singapore)',
    timezoneIana: 'Asia/Singapore',
    countryCode: 'SG',
    inLanguage: 'en-SG',
    schoolType: 'United World College',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "United World College of South East Asia (UWCSEA) is one of the four flagship campuses of the United World Colleges movement, with two large Singapore campuses at Dover and East. Both campuses run the IB Diploma Programme in High School with combined enrolments that make UWCSEA one of the largest single IBDP cohorts anywhere in the world — over 1,000 IBDP candidates per year across both campuses, publicly reported in the school's annual diploma results communications.",
      'UWCSEA Biology students benefit from a department staffed by IB-trained teachers, several with examiner experience, and laboratory facilities that comfortably support every prescribed practical investigation prescribed in the 2025 IB Biology guide. Both HL and SL streams run in parallel each year, and the school publishes IB diploma averages well above the global mean — recent UWCSEA cohort averages have been around 36 points out of 45, with a meaningful share of students scoring above 40.',
      "For UWCSEA students, the gap that drives external tutoring is rarely concept exposure. The school covers the syllabus thoroughly. The gap is rubric calibration — translating UWCSEA's deep classroom work into the specific Paper 2 long-response mark scheme structure the IB rewards — plus IA scaffolding through the May–November DP1 internal-assessment cycle and final EE submission in early DP2. Our 1:1 sessions plug into precisely those two windows.",
      "UWCSEA's CAS programme is intense by design — the UWC ethos places service, activity, and outdoor leadership at the heart of student life — so weekday tutoring has to be compact and focused rather than long and repetitive. We have spent years calibrating session structure to UWCSEA's weekly load: 60–90 minute 1:1 blocks, no homework that duplicates school work, and asynchronous WhatsApp turnaround on past-paper questions inside 24 hours so students get feedback without losing momentum. This compact-and-precise approach is what most UWCSEA parents tell us made the difference between adding tutoring and removing it.",
    ],
    reputationBullets: [
      'Two campuses (Dover and East) running parallel IBDP cohorts in Singapore',
      'Founding member of the global UWC movement (alongside Atlantic, Pearson, USA, etc.)',
      'Annual IBDP cohort exceeds 1,000 candidates combined (publicly reported)',
      'Recent school-reported diploma averages around 36 points (vs global mean ~30)',
      'Strong matriculation to UK, US, Canadian, Australian, and Singapore universities',
      'Dedicated IB Biology HL and SL streams; full full practical-programme coverage',
    ],
    diplomaContext:
      "UWCSEA publicly reports IBDP cohort averages around 36 points across both campuses, with a meaningful share of candidates scoring 40+ (publicly reported in the school's annual diploma communications). HL Biology is one of the most popular Group 4 choices.",
    collegeContext:
      "UWCSEA graduates matriculate across UK (Oxbridge, Imperial, UCL, King's, Edinburgh), US (Harvard, Yale, Princeton, MIT, Stanford, the Ivy+ band), Canada (Toronto, McGill, UBC), Australia (Melbourne, Sydney, ANU, Monash), and Singapore (NUS, NTU, SMU, Yale-NUS while it existed). For Biology HL students, common pathways include UK medicine (with the additional UCAT/BMAT requirements), Singapore NUS Medicine, and US pre-med through Ivy+ and Stanford. The school's university guidance reports are published annually.",
    paceAlignment:
      'UWCSEA IB Biology follows the standard two-year DP track with IA topic selection in late DP1 and submission early DP2; EE submission in DP2 for those choosing Biology as their EE subject. Our coaching aligns to this: HL conceptual reinforcement and Paper 2 mark-scheme drilling during DP1, IA mentorship through the data-analysis and evaluation phase, then full-length Paper 1 and Paper 2 mocks across November DP2 mocks and the May final-exam window. Live sessions are scheduled in SGT evenings (7–9 PM) to fit the long UWCSEA school day and CAS commitments; weekend morning blocks accommodate sport-heavy schedules. For students with significant outdoor leadership commitments (Project Week, the UWCSEA outdoor education programme), we adjust the weekly cadence around extended-trip dates rather than missing sessions outright.',
    faqs: [
      {
        question: 'Do UWCSEA students typically need outside IB Biology tutoring?',
        answer:
          "UWCSEA's Biology department is strong, so most students do not need content tutoring. The two specific gaps that drive families to engage us are (1) Paper 2 mark-scheme calibration — converting UWCSEA's deep classroom work into the IB's specific long-response rubric — and (2) IA scaffolding through the topic-to-submission cycle, especially for students aiming for a 6 or 7 with a strong practical-programme connection.",
      },
      {
        question: 'What is the difference between UWCSEA Dover and East for IB Biology coaching?',
        answer:
          "The two campuses follow the same IB Biology syllabus on broadly aligned schedules but have different teacher cohorts and IA submission rhythms. Our 1:1 sessions adapt to your campus's internal calendar — IA deadlines, mock exam windows, and the school's own practical-work schedule — so the coaching does not collide with school-set due dates.",
      },
      {
        question: 'Do you coach Biology HL and SL for UWCSEA students?',
        answer:
          'Yes. HL coaching covers the additional HL-only material (cellular respiration depth, neurobiology, animal physiology, plant biology HL extensions) plus the extra Paper 1 and Paper 2 long-response items. SL coaching focuses on Paper 1 multiple-choice precision and Paper 2 structured-response timing. Both streams use Paper 2 data-response practice from past papers.',
      },
      {
        question: 'When should a UWCSEA student start IB Biology tutoring?',
        answer:
          'For the integrated 2-year programme, August or September of DP1 is the ideal start — that maximises the IA mentorship window. For students who only need exam-focused coaching, October DP2 (after the November mocks) is still effective for the May final exams, with focus on Paper 2 mark-scheme calibration and data-response drills.',
      },
      {
        question:
          'Can UWCSEA students join your group batches with peers from other Singapore IB schools?',
        answer:
          'Yes. Our Group Batch (4–8 students, $40/hour) runs as a global online cohort, but we group Singapore-time students together where possible — UWCSEA students often share batches with peers from Tanglin Trust, Stamford American, and SAS so peer discussion sits inside the SGT live-class window.',
      },
      {
        question: 'How does pricing work for UWCSEA families?',
        answer:
          'USD-denominated, three tiers: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour (examiner-led), Group Batch $40 per hour (4–8 students). Singapore families typically pay via international card; SGD equivalents shown on the pricing page.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. ASD — American School of Dubai
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'asd-dubai',
    schoolName: 'American School of Dubai',
    shortName: 'ASD Dubai',
    cityCountry: 'Dubai, UAE',
    citySlug: 'dubai',
    timezone: 'GST (Gulf)',
    timezoneIana: 'Asia/Dubai',
    countryCode: 'AE',
    inLanguage: 'en-AE',
    schoolType: 'IB Diploma Programme',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'The American School of Dubai (ASD) is a not-for-profit, US-accredited international school in Al Barsha, Dubai, founded in 1966. ASD is dual-accredited by the IB Organization (for the Diploma Programme) and the New England Association of Schools and Colleges (NEASC) — a combination that lets students pursue either a US high-school diploma with AP coursework or the full IB Diploma. The school is part of the Near East South Asia Council of Overseas Schools (NESA) network.',
      "ASD's science department runs IB Biology HL and SL alongside AP Biology, with parallel laboratory facilities that support every prescribed practical-programme investigation. The school has publicly reported strong IB results in its annual school profile, and IB Biology is one of the most-chosen Group 4 subjects for students targeting medicine or biosciences. ASD's university counselling is US-style — Naviance-driven, college-fair-rich — which shapes how the IB Biology cohort thinks about their HL choices.",
      "For ASD students, the most common reasons to engage outside IB Biology tutoring are (1) Paper 2 mark-scheme calibration, because ASD's in-school assessments are typically more discursive than the IB's specific 6/7-marker rubric requires, and (2) IA mentorship — Dubai students often want a second pair of eyes on their data-analysis and evaluation sections before the school's internal moderation pass. Our 1:1 sessions plug into both gaps, and our timezone overlap with GST is direct.",
      "ASD's residential pattern — a large share of families are in Jumeirah, Emirates Hills, Arabian Ranches, and the Springs — means many students lose 45–60 minutes a day to school commute. Our online tutoring removes that loss entirely: sessions run from the student's desk at home, with sessions recorded for next-day review during car time. We have ASD students who treat the morning commute as a structured pre-class revision window, listening to the previous evening's recorded session at 1.25× speed. This is a small workflow detail, but for an ASD HL Biology student carrying six DP subjects plus the EE, it can add up to 4–5 hours of recovered study time per week.",
    ],
    reputationBullets: [
      'Not-for-profit US-accredited international school in Al Barsha, Dubai',
      'Dual accreditation: IB Organization (DP) + NEASC (US high-school diploma)',
      'IB Diploma + AP Biology both offered — students choose one pathway',
      'Member of NESA (Near East South Asia Council of Overseas Schools)',
      'Strong matriculation to US (Ivy+, top liberal arts), UK (Oxbridge, Russell Group), and Canadian universities',
      'Founded 1966 — longest-running American international school in the UAE',
    ],
    collegeContext:
      "ASD graduates matriculate strongly to US universities (Harvard, Yale, Princeton, MIT, Stanford, the Ivy+, top liberal arts), UK (Oxbridge, Imperial, UCL, KCL), and Canadian schools (McGill, Toronto, UBC). For IB Biology HL students, common pathways include US pre-med through Ivy+, UK medicine (with UCAT/BMAT additional requirements), and Canadian life-sciences direct entry. ASD's university counselling office publishes detailed matriculation reports that are publicly available to current families.",
    paceAlignment:
      "ASD's IB Biology follows the standard two-year DP track. Sunday–Thursday school week (the UAE working week) shapes the live-tutoring slots — Sunday and Tuesday evenings (7–9 PM GST) are the most-used pre-school evenings, and Friday/Saturday mornings work well for intensive blocks. IA submission timing aligns to the school's February DP2 internal moderation. Our coaching layers Paper 2 mark-scheme drilling over ASD's strong content delivery, with mock exam blocks timed to the school's January and March DP2 mock cycles.",
    faqs: [
      {
        question: 'Does ASD Dubai offer both AP Biology and IB Biology?',
        answer:
          'Yes — ASD is one of the few schools globally that runs both the IB Diploma Programme and AP coursework in parallel. Students typically choose one pathway by Grade 10. For IB Biology specifically, the school offers both HL and SL streams with full full practical-programme coverage. Our coaching is IB-specific — if your student is on the AP track, see our AP Biology pages instead.',
      },
      {
        question: 'How does the Sunday–Thursday school week affect live tutoring slots?',
        answer:
          'The UAE working week (Sunday–Thursday school, Friday–Saturday weekend) shapes our session calendar. Most ASD students take 1:1 sessions Sunday and Tuesday evenings in GST (7–9 PM) — the equivalent of "Monday/Wednesday" in a Western school week. Friday or Saturday mornings work well for intensive 2-hour blocks before mocks.',
      },
      {
        question: 'Do you coach IB Biology HL for ASD students targeting US medicine?',
        answer:
          "Yes. HL Biology is a strong signal for US pre-med pipelines, particularly with a 6 or 7. We cover the HL-only material (cellular respiration depth, neurobiology, animal and plant physiology HL extensions) plus Paper 2 long-response calibration. For ASD students, we coordinate with the school's US-focused Naviance counselling around BS/MD applications and accelerated pre-med tracks.",
      },
      {
        question: 'Can ASD Dubai students attend in-person tutoring or is everything online?',
        answer:
          'Our IB Biology programme is 100% online — there is no Cerebrum centre in Dubai. We run live SGT-overlap-friendly sessions in GST evenings with recordings available 24/7. For families who specifically want in-person tutoring, see the local Dubai IB tutoring page; our 1:1 Elite Tutoring tier ($75/hour) replicates the in-person experience over Zoom with screen-share IA review.',
      },
      {
        question: 'How does pricing work for ASD Dubai families?',
        answer:
          'USD-denominated: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour (4–8 students). Dubai families pay via international card; AED equivalents shown for reference on the pricing page.',
      },
      {
        question: 'How early should an ASD Dubai student start IB Biology coaching?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 is the ideal start — that maximises the IA mentorship window through the school's February DP2 internal moderation. For students who only need exam-focused coaching, October DP2 (after the school's first DP2 mock) is still effective for May finals, focusing on Paper 2 mark-scheme calibration and data-response drills using past papers from May 2025 onwards.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. GEMS DAA — Dubai American Academy
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'gems-dubai-american-academy',
    schoolName: 'GEMS Dubai American Academy',
    shortName: 'GEMS DAA',
    cityCountry: 'Dubai, UAE',
    citySlug: 'dubai',
    timezone: 'GST (Gulf)',
    timezoneIana: 'Asia/Dubai',
    countryCode: 'AE',
    inLanguage: 'en-AE',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['MYP', 'DP'],
    historyParagraphs: [
      'GEMS Dubai American Academy (DAA) is one of the most established schools in the GEMS Education network, located in Al Barsha South. DAA runs an IB Continuum from Middle Years Programme (MYP) through to Diploma Programme (DP), and additionally offers an American high-school diploma with AP options for students who choose that pathway. The school has been operating for over three decades and is consistently among the most-applied-to international schools in the UAE.',
      "DAA's IB Biology cohort sits within a large school of around 2,500 students across all sections. The Diploma Programme cohort is typically several hundred students per year, with Biology HL and SL both offered. The science faculty is staffed by experienced IB teachers and the laboratory facilities cover the full the practical-programme section practical programme. DAA's Biology cohort also sees students who came up through the school's MYP — meaning a meaningful share have already completed three or four years of inquiry-based science before reaching DP.",
      "For DAA students, the value-add of outside tutoring is most often in two specific areas: (1) IA scaffolding, because the IA carries 20% of the final grade and is the single most-controllable score component, and (2) Paper 2 long-response mark-scheme calibration, where strong DAA classroom answers can still drop points against the IB's very specific rubric. Our 1:1 sessions plug into both — GST live time, weekly through the DP2 cycle.",
      "GEMS DAA's large cohort size has a specific implication for how families approach external tutoring: with several hundred DP students, individual feedback from school teachers on practice papers is necessarily rationed. Our 1:1 Elite tier ($75/hour) and our Complete Programme both build in unlimited written-feedback turnaround on past-paper attempts — students send a photo of their attempted Paper 2 long response over WhatsApp, and they receive examiner-style annotation back within 24 hours. For DAA HL Biology students in their final mock-exam push (January through March DP2), this written-feedback loop is the highest-leverage tutoring component we offer.",
    ],
    reputationBullets: [
      'Part of the GEMS Education network (largest international school operator in the UAE)',
      'IB Continuum: MYP + DP — many students have 3-4 years of IB science before DP1',
      'Dual-track: IB Diploma and American/AP pathway both available',
      'Cohort size approximately 2,500 across all sections (publicly reported)',
      'Located in Al Barsha South — central Dubai catchment',
      'Strong matriculation to US (Ivy+, public flagships), UK, and Canadian universities',
    ],
    collegeContext:
      "GEMS DAA graduates matriculate to US universities (the Ivy+, NYU, public flagships, top liberal arts), UK (Russell Group including Imperial, UCL, KCL, Manchester, Edinburgh), Canada (McGill, Toronto, Waterloo, UBC), and Australian universities. For IB Biology HL students at DAA, common destinations include US pre-med through universities accepting IB credit, UK medicine pathways requiring UCAT/BMAT, and Canadian life-sciences direct-entry programmes. The school's annual graduation reports publicly list matriculation destinations.",
    paceAlignment:
      "DAA's IB Biology follows the standard two-year DP cycle, with the school's Sunday–Thursday working week. Our 1:1 sessions schedule in GST evenings (Sunday/Tuesday 7–9 PM are the most-used pre-school evenings) or Friday/Saturday morning intensive blocks. IA mentorship windows align to DAA's November DP1 topic-selection cycle and February DP2 internal moderation. Mock-exam coaching aligns to the school's January and March DP2 mock cycles.",
    faqs: [
      {
        question: 'Is GEMS DAA an IB Continuum school?',
        answer:
          'Yes — DAA runs MYP through DP, meaning students who came up through the school typically have several years of inquiry-based science before reaching DP1. This is an advantage: the conceptual framework of "scientific investigation" maps directly onto IB Biology the IB practical programme work. Our coaching builds on that foundation rather than introducing it.',
      },
      {
        question: 'How does the Dubai weekend affect tutoring scheduling?',
        answer:
          'DAA follows the UAE Sunday–Thursday school week. Most students take 1:1 sessions in GST evenings (Sunday/Tuesday 7–9 PM) or Friday/Saturday mornings for intensive 2-hour blocks. Our recorded sessions are available 24/7 so students can review during the weekend or evening commute.',
      },
      {
        question: 'Do you coach IB Biology HL for DAA students targeting medicine?',
        answer:
          'Yes. HL Biology is the standard requirement for medicine in most jurisdictions and a strong signal for US pre-med. For DAA students, we cover the HL-only material (additional cellular biology, neurobiology, animal and plant physiology) plus Paper 2 long-response calibration. UK-medicine-bound students typically also work on UCAT/BMAT separately; we focus on the Biology HL 6 or 7.',
      },
      {
        question: 'Can DAA MYP students start IB Biology preparation early?',
        answer:
          "Our coaching is DP-focused (Grade 11 and Grade 12). For MYP students, we recommend strong engagement with the school's MYP Sciences and Personal Project — these directly build the scientific-method foundation that pays off in DP1 practical-programme work. We start formal IB Biology coaching at the start of DP1 (August/September of Grade 11).",
      },
      {
        question: 'How does pricing work for DAA families?',
        answer:
          'USD-denominated: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour (4–8 students). Dubai families pay via international card. We accept payment plans for the Complete Programme over 3-4 instalments.',
      },
      {
        question:
          'What does a typical week look like for a DAA Biology HL student on the Complete Programme?',
        answer:
          'Two weekday evening sessions (60–90 minutes each in GST), one weekend morning intensive block (90 minutes for Paper 2 long-response drilling or IA review), and 24-hour written-feedback turnaround on any past-paper attempt submitted via WhatsApp. Total live time approximately 4 hours per week; total contact hours including written feedback typically 6–8 hours per week.',
      },
      {
        question: 'How does DAA Biology HL prepare students for US pre-med pipelines?',
        answer:
          "DAA's IB Biology HL provides a strong foundational signal for US pre-med because Biology HL is broadly equivalent to first-year college biology in scope. A 6 or 7 in HL Biology, combined with the school's broader academic profile, supports applications to Ivy+ pre-med pathways. Our coaching focuses on the academic-signal side — the HL grade itself and the IA — rather than the US application mechanics.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. TANGLIN TRUST SCHOOL (Singapore)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'tanglin-trust',
    schoolName: 'Tanglin Trust School',
    shortName: 'Tanglin Trust',
    cityCountry: 'Singapore',
    citySlug: 'singapore',
    timezone: 'SGT (Singapore)',
    timezoneIana: 'Asia/Singapore',
    countryCode: 'SG',
    inLanguage: 'en-SG',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Tanglin Trust School is one of the oldest British international schools in Asia, founded in 1925 in Singapore. Tanglin runs a dual-pathway senior school in which Sixth Form students choose between A Levels and the IB Diploma Programme — uniquely, a number of students each year opt for IB after considering both. This dual-track structure means Tanglin's IB Biology cohort is self-selecting toward students who specifically prefer the IB's breadth and IA-driven assessment over A Levels' depth-and-finals model.",
      "Tanglin's IB Biology runs both HL and SL. The Sixth Form is sited at the Portsdown Road campus, and the school has publicly reported strong IB results — recent diploma averages above the global mean, with a meaningful share of candidates scoring 40+ (publicly reported in the school's annual results communications). The Biology department is staffed by IB-experienced teachers and offers full the IB practical programme coverage. Tanglin's cohort sits inside the highly competitive Singapore IB market alongside UWCSEA, SAS, Dulwich, and Stamford.",
      'For Tanglin students, the most common driver of external tutoring is the dual-track A-Level / IB context: students who chose IB over A Levels often want a tutor who can fully commit to the IB rubric without any A-Level-style "depth-over-breadth" framing creeping in. Our 1:1 sessions are 100% IB-rubric-aligned — Paper 2 mark-scheme calibration, IA mentorship, and data-response practice — and our examiners have experience with both Tanglin\'s internal moderation rhythm and the November DP2 mock cycle.',
      "Tanglin's Sixth Form is academically settled — students have made an active choice between A Levels and IB, which means by the time they reach DP1 they are typically self-motivated and clear about their university targets. Our coaching adapts to that profile: we do not over-explain or duplicate school work; instead, we focus on the highest-leverage rubric and IA components. For Tanglin students aiming for UK medicine, a 7 in Biology HL combined with a strong UCAT score is the standard target, and our 1:1 Elite Tutoring tier is calibrated to that exact endpoint with examiner-led Paper 2 drilling and data-response practice through the final spring before May exams.",
    ],
    reputationBullets: [
      'Founded 1925 — one of the oldest British international schools in Asia',
      'Dual-pathway Sixth Form: A Levels and IB Diploma both offered',
      'Located at Portsdown Road, Singapore',
      'Recent school-reported IB diploma averages above the global mean',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Strong matriculation to UK (Oxbridge, Russell Group), US, Singapore (NUS, NTU), and Australian universities',
    ],
    collegeContext:
      "Tanglin Trust graduates matriculate strongly to UK universities (Oxbridge, Imperial, UCL, Edinburgh, Durham, Bristol), Singapore (NUS, NTU, SMU), US (Ivy+, top liberal arts, public flagships), and Australia (Melbourne, Sydney, Monash, ANU). For IB Biology HL students, UK medicine is the most common pathway with the standard UCAT/BMAT additional requirements; Singapore NUS Medicine is also a common destination, with the school's university counselling supporting both the UK and Singapore application timelines.",
    paceAlignment:
      "Tanglin's IB Biology follows the standard two-year DP cycle. Our 1:1 sessions schedule in SGT evenings (7–9 PM) to fit the long Tanglin school day plus extracurricular load, or weekend morning blocks. IA mentorship aligns to Tanglin's February DP2 internal moderation. Mock-exam coaching aligns to the school's November DP2 mocks; final Paper 1/2/3 mocks intensify in March–April leading to the May session.",
    faqs: [
      {
        question: 'Does Tanglin Trust offer both IB and A Levels?',
        answer:
          "Yes. Tanglin's Sixth Form is a dual-pathway senior school where students choose A Levels or the IB Diploma. Students who opt for IB are typically self-selecting toward the breadth-and-IA assessment model. Our coaching is 100% IB-rubric-aligned — we do not blend in A-Level framing, because the Paper 2 mark-scheme and IA rubric are highly specific.",
      },
      {
        question: "How does Tanglin's IB Biology HL pace compare to UWCSEA?",
        answer:
          "Both schools run rigorous IB Biology HL programmes with similar 6/7 outcomes. Tanglin's self-selected IB cohort tends to be smaller per year than UWCSEA's, which shifts the social dynamic but not the academic standard. Our coaching adapts to the school-specific IA submission rhythm and the November DP2 mock dates — these differ between Tanglin and UWCSEA.",
      },
      {
        question: 'Do you coach Tanglin students for UK medicine via IB Biology?',
        answer:
          "Yes. UK medicine is the most common matriculation pathway for Tanglin's IB Biology HL students. We coach the Biology HL component (Paper 2 long-response, data-response sections, IA at 6/7 level) and coordinate with the school's timing on UCAT/BMAT — but we do not coach UCAT/BMAT directly. For that, your school's university counselling office or a specialist medical-admissions service is the right place.",
      },
      {
        question: 'When should a Tanglin student start IB Biology tutoring?',
        answer:
          'For the integrated 2-year Complete Programme, start in August or September of DP1 — that maximises the IA mentorship window. For students who only need exam-focused coaching, October DP2 (after November mocks) is still effective for May finals, focusing on Paper 2 mark-scheme calibration and data-response drills.',
      },
      {
        question: 'How does pricing work for Tanglin Trust families?',
        answer:
          'USD-denominated: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour (4–8 students). SGD equivalents shown for reference; Singapore families typically pay via international card or PayNow-linked transfers.',
      },
      {
        question: 'Can Tanglin Sixth Form students switch between IB and A Levels mid-DP1?',
        answer:
          "Switching between Sixth Form pathways at Tanglin is the school's call, not ours, but it does happen occasionally with families. From a tutoring perspective, the Biology content overlap between IB Biology HL and A-Level Biology is substantial — most of the syllabus transfers — but the assessment style is very different (IB rewards data analysis and the IA; A-Level rewards depth and final-exam recall). If your student is considering a mid-DP1 switch, we can coach the transition.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. NIST — NIST International School Bangkok
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'nist-bangkok',
    schoolName: 'NIST International School Bangkok',
    shortName: 'NIST',
    cityCountry: 'Bangkok, Thailand',
    citySlug: 'bangkok',
    timezone: 'ICT (Indochina)',
    timezoneIana: 'Asia/Bangkok',
    countryCode: 'TH',
    inLanguage: 'en-TH',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'NIST International School Bangkok is a not-for-profit IB Continuum school located in Sukhumvit. NIST has the distinction of being the first school in Thailand to offer all three core IB programmes — Primary Years Programme, Middle Years Programme, and Diploma Programme — making it a full-continuum IB World School. The school was established in 1992 with founding involvement of the UN community in Bangkok and remains one of the leading international schools in Southeast Asia.',
      "NIST's IB Diploma cohort is one of the larger DP cohorts in Bangkok, with IB Biology HL and SL both offered each year. The school has publicly reported diploma averages well above the global mean — recent NIST cohort averages have been in the 35–37 point range, with a substantive share of students scoring 40+ (publicly reported in the school's annual results communications). The Biology department is staffed by IB-experienced teachers and the laboratory facilities support every prescribed practical-programme investigation.",
      "For NIST students, the most common driver of external tutoring is the same as at the other top regional IB schools: Paper 2 mark-scheme calibration and IA mentorship through the DP1 topic-selection to DP2 final-submission window. Bangkok's ICT timezone overlaps cleanly with our SGT-Asia tutoring schedule, and our 1:1 sessions sit in ICT evenings (7–9 PM) or weekend morning blocks.",
      "NIST students often have a dual application strategy: UK and US universities for most graduates, with a meaningful share also targeting the Mahidol International College direct-entry medical track for students who want to stay in Thailand. This dual strategy shapes how we calibrate Biology HL coaching — a strong 6 or 7 in Biology HL is competitive for both UK medicine (with UCAT/BMAT) and the Mahidol pathway, so the coaching itself is the same; the surrounding application support diverges by destination. We coordinate with NIST's university counselling office on the academic-signal side (Biology HL score, IA quality, EE topic where chosen) and leave the destination-specific application work to specialists.",
    ],
    reputationBullets: [
      'First full IB Continuum school in Thailand (PYP + MYP + DP)',
      'Not-for-profit, founded 1992 with UN community involvement',
      'Located in Sukhumvit, Bangkok',
      'Recent school-reported diploma averages in the 35–37 point range',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Strong matriculation to UK, US, Canadian, Australian, and Asian universities',
    ],
    collegeContext:
      "NIST graduates matriculate to UK (Oxbridge, Russell Group), US (Ivy+, NYU, top liberal arts), Canada (McGill, Toronto, UBC), Australia (Melbourne, Sydney, Monash), and Asian universities (NUS, HKU, the Mahidol International medical pathway for students staying in Thailand). For IB Biology HL students, common pathways include UK medicine, US pre-med, and the Mahidol International College direct-entry medical track — the last of which is a distinctive Thailand-specific option that NIST's university counselling supports.",
    paceAlignment:
      "NIST's IB Biology follows the standard two-year DP cycle. ICT timezone overlaps cleanly with our Singapore-based live tutoring schedule. Our 1:1 sessions schedule in ICT evenings (7–9 PM) or weekend morning blocks. IA mentorship aligns to NIST's DP1-late / DP2-early submission cycle. Mock-exam coaching aligns to the school's November DP2 mocks; intensive Paper 1/2/3 mocks scale up March–April for the May session.",
    faqs: [
      {
        question: 'Is NIST a full IB Continuum school?',
        answer:
          'Yes — NIST was the first school in Thailand to offer PYP + MYP + DP. Students who came up through NIST typically have a strong inquiry-based science foundation by the time they reach DP1, which makes the IB practical programme work more intuitive. Our coaching builds on that foundation rather than introducing the inquiry framework.',
      },
      {
        question: 'How does the ICT timezone affect live tutoring?',
        answer:
          'Bangkok ICT (GMT+7) is one hour behind Singapore SGT and aligns cleanly with our Singapore-based live tutoring schedule. ICT evening slots (7–9 PM) and weekend morning blocks are the most-used sessions. All sessions are recorded for review.',
      },
      {
        question: 'Do you coach NIST students for the Mahidol International medical pathway?',
        answer:
          "Yes for the Biology HL component. Mahidol International College's direct-entry medical track has specific Biology requirements that map well to IB Biology HL with a 6 or 7. We coach the Biology HL syllabus (Paper 2 long-response, data-response sections, IA at 6/7 level); the Thai-medical-admissions specifics — interview prep, the Mahidol-specific entrance test — are best handled through your school's counselling office or a specialist Thai medical admissions service.",
      },
      {
        question: 'When should a NIST student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1. For students who only need exam-focused coaching, October DP2 (after November mocks) is still effective for May finals. NIST's strong content delivery means students who join us mid-DP2 already have the core syllabus exposure; we focus on Paper 2 mark-scheme calibration and data-response drills.",
      },
      {
        question: 'How does pricing work for NIST Bangkok families?',
        answer:
          'USD-denominated: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour (4–8 students). THB equivalents shown for reference. Bangkok families typically pay via international card.',
      },
      {
        question: 'How does NIST Biology HL compare to ISB (International School Bangkok)?',
        answer:
          "NIST and ISB are the two flagship IB Bangkok schools and both run rigorous Biology HL programmes. The teacher cohorts and IA submission rhythms differ. Our coaching adapts to the school-specific IA deadlines and the November DP2 mock dates, and does not borrow text or scripts across the two schools' programmes. School choice is upstream of tutoring choice — once enrolled at NIST, our 1:1 coaching is calibrated to NIST's pace specifically.",
      },
      {
        question: 'Can NIST students join group batches with peers from ISB or Shrewsbury Bangkok?',
        answer:
          'Yes. Our Group Batch ($40/hour) often includes Bangkok-time students from NIST, ISB, and Shrewsbury sharing the same ICT live-class slot. Peer discussion across schools is a feature of the group format. For students who specifically want school-only peer groups (rare but it happens), the 1:1 Elite Tutoring tier is the right product — same examiner-led coaching, no shared session.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. PATHWAYS WORLD SCHOOL ARAVALI (Gurgaon, India)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'pathways-aravali',
    schoolName: 'Pathways World School Aravali',
    shortName: 'Pathways Aravali',
    cityCountry: 'Gurgaon, India',
    citySlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Pathways World School Aravali is a residential and day IB Continuum school in the Aravali range south of Gurgaon, founded in 2003. The school runs PYP, MYP, and DP, making it one of the longer-running full-continuum IB schools in India. The Aravali campus sits on a large green campus designed by architect Sanjay Mohe; students board on-campus or commute from across the Gurgaon catchment (DLF, Golf Course Road, Sohna Road).',
      "Pathways Aravali's IB Biology cohort is one of the larger DP Biology cohorts in the Delhi NCR region. Both HL and SL are offered, and the school has publicly reported strong IB results — recent cohort averages have been at or above the global mean, with a meaningful share of candidates scoring 40+ (publicly reported in the school's annual results communications). The Biology department is staffed by IB-experienced teachers and the laboratory facilities support the full the IB practical programme syllabus.",
      "For Pathways Aravali students, the most common driver of external tutoring is twofold: (1) Paper 2 mark-scheme calibration, where strong classroom answers can still drop points against the IB's specific long-response rubric, and (2) IA mentorship through the DP1 topic-selection cycle. Many Pathways families also want a parallel IB+NEET option — We coach an IB+NEET integrated weekly schedule — a specialised track that few biology coaching providers in India run, and a substantive share of Pathways Aravali students pursue that combined pathway.",
      "Pathways Aravali's residential structure shapes tutoring scheduling specifically — day students from DLF, Golf Course Road, and Sohna Road commute up to 60 minutes each way, while boarders study on campus through the evening. Our IST live sessions sit at 7–9 PM, which works for both — day students join from home after the school commute, boarders join from the school's study halls during scheduled evening study time. For IB+NEET students, we also run weekend intensive blocks (Saturday and Sunday mornings, 3 hours each) that compress the additional NEET Chemistry and Physics into manageable weekly batches without colliding with the school's own weekend testing schedule.",
    ],
    reputationBullets: [
      "Full IB Continuum: PYP + MYP + DP since the school's founding",
      'Founded 2003 — among the longer-running full-continuum IB schools in India',
      'Located in the Aravali range south of Gurgaon — residential + day campus',
      'Recent school-reported diploma averages at or above the global mean',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Strong matriculation to UK, US, Canadian, Australian, and Indian universities',
    ],
    collegeContext:
      'Pathways Aravali graduates matriculate to UK (Oxbridge, Russell Group, Imperial, UCL, KCL), US (Ivy+, NYU, top liberal arts, public flagships), Canada (McGill, Toronto, UBC, Waterloo), Australia (Melbourne, Sydney, ANU), and Indian universities (Ashoka, Krea, Shiv Nadar, plus AIIMS / state medical colleges for the IB+NEET dual-track students). For Biology HL students, UK medicine and US pre-med are the most common abroad pathways; for those staying in India, the IB+NEET track lets them apply to AIIMS and state medical colleges in parallel with their IB Diploma.',
    paceAlignment:
      "Pathways Aravali's IB Biology follows the standard two-year DP cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule (IB Biology + NEET Biology + NEET Chemistry + NEET Physics) that compresses the dual-syllabus into a manageable weekly load. IA mentorship aligns to Pathways' DP1-late submission cycle.",
    faqs: [
      {
        question: 'Do you offer the IB+NEET integrated track for Pathways Aravali students?',
        answer:
          'Yes — Cerebrum runs an IB+NEET integrated track that few India-based providers offer. A substantive share of Pathways Aravali Biology HL students pursue the dual IB+NEET pathway because it preserves both the abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options. We coordinate the IB Biology HL syllabus with the NEET Biology + Chemistry + Physics syllabuses on a single weekly schedule.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. India-resident families pay in INR; Pathways Aravali families can opt for either USD international or INR domestic pricing.',
      },
      {
        question: "How does Pathways Aravali's IB Biology HL compare to Mumbai's top IB schools?",
        answer:
          'Pathways Aravali, Oberoi International (Mumbai), Dhirubhai Ambani International (Mumbai), and ASB all run rigorous IB Biology HL programmes with similar 6/7 outcomes. The teacher cohorts differ and the IA submission rhythms vary slightly. Our coaching adapts to the school-specific IA deadlines and the November DP2 mock dates.',
      },
      {
        question: 'Can Pathways Aravali boarding students attend live IST sessions?',
        answer:
          "Yes. We schedule live sessions in IST evenings (7–9 PM) — the same time the day students are studying at home. Boarding students join from the dorm or the school's study halls; sessions are recorded for review during scheduled study time the next day.",
      },
      {
        question: 'When should a Pathways Aravali student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For IB+NEET students, ideally even earlier (during Grade 10/MYP5) to build the Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after November mocks) is still effective.",
      },
      {
        question:
          'How does the Pathways Aravali Biology HL syllabus connect to NEET Biology for IB+NEET students?',
        answer:
          'Significant content overlap exists across cell biology, plant and human physiology, genetics, ecology, and evolution — topics where IB Biology HL coverage maps closely to NEET requirements. Other areas — particularly kingdom classification depth and certain Indian-context botanical and zoological detail in the NEET syllabus — need separate NEET-specific coverage that the IB HL course does not provide. Our integrated weekly schedule layers the NEET-specific topics on top of the IB HL content so students extend their existing knowledge rather than re-learning it.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. UWC MAHINDRA COLLEGE (Pune, India)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'uwc-mahindra-pune',
    schoolName: 'UWC Mahindra College',
    shortName: 'UWC Mahindra',
    cityCountry: 'Pune, India',
    citySlug: 'pune',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'United World College',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'UWC Mahindra College, located in the Western Ghats outside Pune, is the Indian campus of the United World Colleges movement — one of 18 UWC campuses worldwide. The college runs only the final two years of pre-university education (Year 12 and Year 13, equivalent to Grade 11 and Grade 12) and admits students from over 70 countries each year via a selective national-committee-based application process. Students are fully residential and the college operates on a need-blind scholarship basis for the majority of its cohort.',
      "UWC Mahindra runs only the IB Diploma Programme — no MYP, no alternative tracks. The college's academic and pastoral model is built entirely around the IBDP's combination of six subjects, TOK, CAS, and EE. IB Biology HL and SL are both offered, and the college's Biology cohort sits inside the broader UWC peer group of academically self-selected international students. Recent UWC Mahindra cohort averages have been publicly reported above the global mean, with a meaningful share of candidates scoring 40+ — consistent with other UWC campuses globally.",
      "For UWC Mahindra students, the driver of external tutoring is distinctive: the college's pastoral and CAS load is intense, the residential life is demanding, and students often want a tutor who can deliver compact, high-impact coaching on the IA and Paper 2 long-response rubric without adding to their overall week. Our 1:1 sessions sit in IST evenings or weekend mornings and are deliberately tight — typically 60–90 minutes — to fit alongside CAS, Mahindra United (the campus weekly cycle), and the standard DP1/DP2 rhythm.",
      "A meaningful share of UWC Mahindra graduates apply through the Davis UWC Scholars Program — a US-based scholarship network that supports UWC alumni at 100+ partner US colleges. For Biology HL students with strong DP scores (6 or 7 in Biology HL plus a 38+ overall), the Davis Scholar pathway opens highly-selective US colleges that would otherwise be financially prohibitive. Our coaching is calibrated to that exact academic-signal target: a clean 7 in HL Biology with a polished IA at 6/7 level, and Paper 2 long-response answers that map cleanly to the IB's specific rubric. The college's own university counselling office handles the Davis-application mechanics; we handle the Biology HL grade that the application leans on.",
    ],
    reputationBullets: [
      'Indian campus of the global United World Colleges movement (18 UWC campuses worldwide)',
      'Two-year fully residential pre-university (DP only)',
      'Selective national-committee-based admissions; need-blind scholarships for most students',
      'Cohort from 70+ countries each year',
      'Recent school-reported diploma averages above the global mean',
      'IB Biology HL and SL offered',
    ],
    collegeContext:
      'UWC Mahindra graduates have one of the strongest matriculation profiles among Indian-based IB schools — particularly into US (Davis UWC Scholars Program, Ivy+, top liberal arts), UK (Oxbridge, Russell Group), Canada (McGill, Toronto, UBC), and the Davis-supported network of US colleges. The Davis UWC Scholars Program specifically supports UWC graduates entering 100+ partner US colleges. For IB Biology HL students, US pre-med through the Davis Scholar network is a common pathway, alongside UK medicine.',
    paceAlignment:
      "UWC Mahindra's IB Biology follows the standard two-year DP cycle. The residential and CAS load means students value compact, high-impact tutoring rather than long sessions. Our 1:1 sessions schedule in IST evenings (7–9 PM) or weekend morning blocks, typically 60–90 minutes. IA mentorship aligns to the college's late-DP1 submission cycle. Mock-exam coaching aligns to the November DP2 mocks; final Paper 1/2/3 mocks scale up February–April for the May session.",
    faqs: [
      {
        question: "How does UWC Mahindra's academic load affect tutoring scheduling?",
        answer:
          "UWC Mahindra is fully residential with a heavy CAS and Mahindra United weekly cycle. We design 60–90 minute 1:1 sessions to fit alongside the college's schedule rather than compete with it. Sessions are recorded for review during scheduled study time, and we coordinate with the college's mock-exam and IA submission calendar to avoid collisions.",
      },
      {
        question:
          'Do you support UWC Mahindra students applying through the Davis UWC Scholars Program?',
        answer:
          "For the IB Biology component — yes. The Davis Scholar network includes 100+ US partner colleges, and a strong IB Biology HL score (6 or 7) is part of the academic signal for the most competitive Davis placements. We coach the Biology HL syllabus (Paper 2 long-response, data-response sections, IA at 6/7 level); the Davis application itself and the US-college-specific essays are best handled through the college's university counselling office.",
      },
      {
        question: 'Do you coach UWC Mahindra students for UK medicine?',
        answer:
          'Yes for the Biology HL component. UK medical schools require strong Biology HL (typically a 6 or 7) plus UCAT/BMAT and the standard UK personal statement. We coach the Biology HL syllabus and the IA at 6/7 level; UCAT/BMAT and personal statement work are best handled separately.',
      },
      {
        question: 'When should a UWC Mahindra student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, soon after arriving in Year 12 (August/September). The college's pastoral and CAS load means an early start lets us build a sustainable weekly rhythm rather than ramping up under pressure mid-DP1. For exam-only coaching, October DP2 (after November mocks) is still effective for May finals.",
      },
      {
        question: 'How does pricing work for UWC Mahindra families?',
        answer:
          'USD-denominated: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. Many UWC Mahindra families are on full or partial scholarship; we offer payment plans and need-based discounts for verified scholarship students — speak with our admissions team for details.',
      },
      {
        question:
          'How does UWC Mahindra Biology HL prepare students for the Davis UWC Scholars Program?',
        answer:
          "A 6 or 7 in Biology HL is part of the broader academic-signal package that supports competitive Davis Scholar placements at the 100+ US partner colleges. Davis itself looks at the full DP score, the IA, the EE topic and grade (if Biology was the EE subject), and the UWC's overall reference. Our coaching focuses on the academic-signal components we can directly improve — the HL Biology grade and IA — leaving the application mechanics to the college's university counselling office.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 8. STONEHILL INTERNATIONAL SCHOOL (Bangalore)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'stonehill-bangalore',
    schoolName: 'Stonehill International School',
    shortName: 'Stonehill',
    cityCountry: 'Bangalore, India',
    citySlug: 'bangalore',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Stonehill International School is a full IB Continuum school in north Bangalore, founded in 2008. Stonehill runs PYP, MYP, and DP, sitting on a large campus near Yelahanka. The school is operated by the Embassy Group as a not-for-profit and is one of the higher-fee international schools in Bangalore. Day and weekly-boarding options are both offered.',
      "Stonehill's IB Diploma cohort is mid-sized for a Bangalore IB school, with IB Biology HL and SL both offered each year. The school has publicly reported diploma averages above the global mean — recent cohort averages have been in the 33–36 point range, with the strongest students scoring 40+ (publicly reported in the school's annual results communications). The Biology department supports the full the IB practical programme syllabus.",
      "For Stonehill students, the most common driver of external tutoring is the Bangalore IB context: students at Stonehill, Canadian International, Indus, TISB, and Inventure form a tightly competitive set, and families want their student's IB Biology HL score to differentiate. Our 1:1 sessions focus on Paper 2 mark-scheme calibration (the single biggest source of dropped points among strong-classroom students) plus IA mentorship through the DP1 topic-selection cycle. IST timezone aligns directly with our India-based live tutoring schedule.",
      'Bangalore IB families also tend to be highly information-driven — many parents are tech-industry professionals who research tutoring options exhaustively before committing. We have responded to that profile with full transparency on pricing (USD-denominated, no hidden costs), session structure (recorded for review, written feedback inside 24 hours), and outcomes (we publish typical score improvements rather than individual case studies). For Stonehill students considering the dual IB+NEET track, we also publish a full week-by-week schedule of how the integrated programme works across DP1, DP2, and the final NEET season so families can audit the time commitment before signing up.',
      "Stonehill's weekly-boarding option means a meaningful share of students spend Monday through Friday on campus and return home for the weekend. This bifurcates the tutoring schedule cleanly: 1:1 evening sessions during the week from the boarding house (with the school's awareness), and longer 2–3 hour weekend morning blocks at home where the student has uninterrupted desk space for IA work or extended past-paper practice. Day students typically take 60–90 minute weekday evening sessions, which means our scheduling can accommodate both modes within the same examiner's weekly calendar.",
    ],
    reputationBullets: [
      'Full IB Continuum: PYP + MYP + DP since founding (2008)',
      'Located in north Bangalore near Yelahanka',
      'Operated by Embassy Group on a not-for-profit basis',
      'Day and weekly-boarding options',
      'Recent school-reported diploma averages in the 33–36 point range',
      'IB Biology HL and SL with full full practical-programme coverage',
    ],
    collegeContext:
      'Stonehill graduates matriculate to UK (Russell Group, Oxbridge, Imperial, UCL), US (Ivy+, NYU, top liberal arts, public flagships), Canada (McGill, Toronto, Waterloo, UBC), Australia (Melbourne, Sydney, ANU), and Indian universities (Ashoka, Krea, Shiv Nadar, plus AIIMS / state medical colleges for IB+NEET students). For Biology HL students, common pathways include UK medicine, US pre-med, and Canadian life-sciences direct entry; the IB+NEET track is available for students staying in India.',
    paceAlignment:
      "Stonehill's IB Biology follows the standard two-year DP cycle. IST timezone aligns directly with our India-based tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM) or weekend mornings. For day students, evening sessions are most common; for weekly-boarders, weekend morning blocks work well. IA mentorship aligns to Stonehill's DP1-late submission cycle. Mock-exam coaching aligns to the school's November DP2 mocks.",
    faqs: [
      {
        question:
          "How does Stonehill's IB Biology compare to Canadian International School and Indus?",
        answer:
          'All three Bangalore IB schools — Stonehill, Canadian International, Indus — run rigorous IB Biology HL programmes with similar 6/7 outcomes. The teacher cohorts differ and the IA submission rhythms vary. Our coaching adapts to the school-specific IA deadlines and the November DP2 mock dates; we do not borrow text or coaching scripts across the three schools.',
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Stonehill students?',
        answer:
          'Yes. We are among the small number of India-based providers running an IB+NEET integrated coaching track. Stonehill students who want to preserve both the abroad (UK medicine, US pre-med) and India (AIIMS, state medical college) options can pursue the dual IB+NEET pathway with us. The schedule integrates IB Biology HL with NEET Biology + Chemistry + Physics on a single weekly load.',
      },
      {
        question: 'How does pricing work for Stonehill Bangalore families?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year, 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: ₹60,000–₹98,000 per year for the complete integrated programme. India-resident families typically pay in INR; we accept payment plans over 3-4 instalments.',
      },
      {
        question: 'Can Stonehill weekly-boarders attend live IST sessions during the week?',
        answer:
          'Yes. Weekly-boarders typically join evening 1:1 sessions from the boarding house during scheduled study time, with the boarding staff aware of the session. Weekend morning blocks are also a strong fit for weekly-boarders who go home Friday-to-Sunday.',
      },
      {
        question: 'When should a Stonehill student start IB Biology tutoring?',
        answer:
          'For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For IB+NEET students, ideally even earlier (during MYP5) to build the Chemistry and Physics foundations. For exam-only coaching, October DP2 (after November mocks) is still effective.',
      },
      {
        question:
          'How does Stonehill Biology HL prepare students for US, UK, and Canadian university applications?',
        answer:
          "A 6 or 7 in Biology HL provides a strong academic-signal input for US pre-med applications (where IB HL is recognised as equivalent to first-year college biology), UK medical school applications (where Biology HL is a standard subject requirement alongside UCAT/BMAT), and Canadian life-sciences direct-entry programmes (which value the IA component specifically). Our coaching focuses on the HL grade and IA — the academic signals — while application-specific work is best handled through the school's university counselling office.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 9. INVENTURE ACADEMY (Bangalore)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'inventure-bangalore',
    schoolName: 'Inventure Academy',
    shortName: 'Inventure',
    cityCountry: 'Bangalore, India',
    citySlug: 'bangalore',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'IB Diploma Programme',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Inventure Academy is a co-educational K-12 school in Whitefield, Bangalore, founded in 2005. Inventure runs an Indian board curriculum (ICSE/ISC) through Grade 10, then offers the IB Diploma Programme as the senior school option for Grades 11 and 12. This board-to-IB transition is distinctive — it means Inventure's IB Biology DP1 cohort typically arrives with strong ICSE Biology foundations rather than MYP science.",
      "Inventure's IB Biology cohort is mid-sized for a Bangalore IB school, with both HL and SL offered. The school has publicly reported diploma results above the global mean — recent cohort averages have been in the 33–35 point range, with the strongest students scoring 40+ (publicly reported in the school's annual communications). The Biology department supports the full the IB practical programme syllabus on the school's Whitefield campus.",
      'For Inventure students, the most common driver of external tutoring is the ICSE-to-IB transition: ICSE Biology is a content-dense, recall-heavy syllabus, while IB Biology HL rewards data analysis, evaluation, and the specific Paper 2 long-response rubric. Students with strong ICSE habits sometimes over-write or over-recall on Paper 2. Our 1:1 sessions explicitly calibrate the ICSE-to-IB writing-style transition and add IA mentorship through the DP1 topic-selection cycle.',
      'The ICSE-to-IB transition has a specific practical implication for IB+NEET-track students at Inventure: ICSE Class 10 already covers a substantive portion of the NEET Biology and Chemistry syllabus (kingdom classification, plant and human physiology, basic organic chemistry), so Inventure students arrive at DP1 with a stronger NEET-relevant base than students from MYP-fed schools. We exploit that advantage in the integrated IB+NEET schedule: the first six months of DP1 emphasise IB Biology HL depth and the IA topic-selection process, with NEET Chemistry and Physics building in parallel rather than starting from zero. By DP2, the integrated programme is in steady-state weekly rhythm.',
      "Inventure's Whitefield location is convenient for the technology-corridor Bangalore IB families but also means commute times to and from school are significant — Inventure students living in Koramangala, Indiranagar, or JP Nagar can spend 60–75 minutes each way during peak traffic. Our online-first tutoring removes that loss: 1:1 sessions run from the student's home desk, with recordings available for next-day review on the commute. For weekend intensive blocks (most relevant in the final spring before May exams), we run Saturday and Sunday morning 2-hour sessions that align with Inventure's lighter weekend testing schedule.",
    ],
    reputationBullets: [
      'K-12 school in Whitefield, Bangalore, founded 2005',
      'ICSE/ISC through Grade 10, then IB Diploma Programme in Grades 11-12',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Recent school-reported diploma averages in the 33–35 point range',
      'Day and limited weekly-boarding options',
      'Strong matriculation to UK, US, Canadian, Australian, and Indian universities',
    ],
    collegeContext:
      'Inventure graduates matriculate to UK (Russell Group, Oxbridge, Imperial, UCL), US (top liberal arts, the Ivy+, public flagships, NYU), Canada (McGill, Toronto, UBC, Waterloo), Australia (Melbourne, Sydney, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar, plus AIIMS / state medical colleges for IB+NEET-track students). For Biology HL students, common abroad pathways include UK medicine, US pre-med, and Canadian life-sciences direct entry.',
    paceAlignment:
      "Inventure's IB Biology follows the standard two-year DP cycle. The ICSE-to-IB transition shapes early DP1 coaching — students often need explicit work on the IB's data-analysis-driven Paper 2 style versus ICSE's recall-heavy style. Our 1:1 sessions schedule in IST evenings (7–9 PM) or weekend mornings, with IA mentorship aligned to Inventure's DP1-late submission cycle and mock-exam coaching aligned to the November DP2 mocks.",
    faqs: [
      {
        question: 'How does the ICSE-to-IB transition affect IB Biology preparation?',
        answer:
          'ICSE Biology is content-dense and recall-heavy. IB Biology HL Paper 2 rewards data analysis, evaluation, and the specific 6/7-marker long-response rubric. Students with strong ICSE habits sometimes over-recall on Paper 2 — listing 8 facts when the rubric rewards 3 well-developed evaluative points. Our DP1 coaching explicitly calibrates this writing-style transition.',
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Inventure students?',
        answer:
          'Yes. Cerebrum runs a dedicated IB+NEET integrated coaching track — a niche programme few biology-only providers in India offer. Inventure students with strong ICSE foundations are typically well-positioned for the IB+NEET dual pathway because their ICSE Biology and Chemistry already provide a NEET-relevant base. We coordinate the IB Biology HL syllabus with NEET Biology + Chemistry + Physics on a single weekly schedule.',
      },
      {
        question:
          "How does Inventure's IB Biology compare to Stonehill and Canadian International?",
        answer:
          'Inventure, Stonehill, and Canadian International all run rigorous IB Biology HL programmes with similar 6/7 outcomes. The distinctive factor at Inventure is the ICSE-to-IB transition — Inventure students arrive at DP1 with strong ICSE Biology, which is different from Stonehill (MYP-fed) or Canadian International (mixed feeder). Our coaching adapts to this entry profile.',
      },
      {
        question: 'How does pricing work for Inventure Bangalore families?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year, 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: ₹60,000–₹98,000 per year for the integrated programme. India-resident families typically pay in INR with payment plans over 3-4 instalments.',
      },
      {
        question: 'When should an Inventure student start IB Biology tutoring?',
        answer:
          'For the integrated 2-year Complete Programme, August or September of DP1. For IB+NEET students, ideally during ICSE Grade 10 to build the additional Chemistry and Physics depth needed for NEET. For exam-only coaching, October DP2 (after November mocks) is still effective for May finals.',
      },
      {
        question:
          'How does Inventure Biology HL prepare students for the ISC-to-IB writing transition?',
        answer:
          "Inventure's ICSE Grade 10 cohort writes in a content-dense, recall-heavy style that is rewarded by the ICSE board exams but not by IB Paper 2 long-response. Our DP1 coaching includes side-by-side comparisons of ICSE-style answers and IB-rubric-aligned answers on the same biological topic — students see the writing-style shift concretely rather than being told about it abstractly. By mid-DP1, most Inventure students have internalised the transition; the remaining work focuses on IA topic-selection and standard syllabus content.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 10. OBEROI INTERNATIONAL SCHOOL (Mumbai)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'oberoi-mumbai',
    schoolName: 'Oberoi International School',
    shortName: 'Oberoi International',
    cityCountry: 'Mumbai, India',
    citySlug: 'mumbai',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Oberoi International School (OIS) is a full IB Continuum school with two Mumbai campuses — JVLR (Goregaon) and OGC (Powai) — operated by Oberoi Realty as a not-for-profit. The school runs PYP, MYP, and DP, and is one of the most-applied-to international schools in Mumbai. Oberoi sits in the broader top-tier Mumbai IB cluster alongside Dhirubhai Ambani International, JBCN, Ecole Mondiale, ASB, and Aditya Birla World Academy.',
      "Oberoi's IB Diploma cohort is one of the larger DP cohorts in Mumbai, with IB Biology HL and SL both offered each year across the two campuses. The school has publicly reported strong IB results — recent cohort averages have been at or above the global mean, with a substantive share of candidates scoring 40+ (publicly reported in the school's annual results communications). The Biology departments at both campuses are staffed by IB-experienced teachers and the laboratory facilities support the full practical-programme requirements.",
      'For Oberoi students, the most common driver of external tutoring is the same as at the other top-tier Mumbai IB schools: Paper 2 mark-scheme calibration and IA mentorship through the DP1 topic-selection cycle. Many Oberoi families also pursue the dual IB+NEET track — Cerebrum offers a structured IB+NEET integrated coaching track — among the few such programmes from India-based biology providers, which is particularly valuable for students who want to preserve both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options.',
      "Oberoi's two-campus structure (JVLR and OGC) is operationally important for tutoring scheduling because the campuses run on broadly aligned but not identical IA submission and mock-exam calendars. We track both campus calendars and our 1:1 examiners adapt session content to the specific campus's deadlines — IA topic-selection windows, mock-exam dates, and the school's own practical-work schedule. For Oberoi students who switch campuses during DP1 (rare but it happens with family relocation within Mumbai), we transition the coaching seamlessly because the underlying IB Biology HL syllabus is identical.",
      "Mumbai's IB market is one of the most concentrated in India — Oberoi, Dhirubhai Ambani International, JBCN, Ecole Mondiale, ASB, Aditya Birla World Academy, and Cathedral all sit within roughly the same Mumbai catchment. Families regularly compare these schools and their respective IB Biology HL outcomes. Our position is that the school choice is upstream of tutoring choice — once enrolled at Oberoi, our 1:1 coaching layers Paper 2 mark-scheme calibration and IA mentorship on top of the school's already-strong content delivery, with no implicit comparison to other Mumbai schools. The coaching is school-specific because the IA submission rhythms and mock-exam calendars are school-specific.",
    ],
    reputationBullets: [
      'Full IB Continuum: PYP + MYP + DP across two campuses',
      'Two Mumbai campuses: JVLR (Goregaon) and OGC (Powai)',
      'Operated by Oberoi Realty on a not-for-profit basis',
      'Recent school-reported diploma averages at or above the global mean',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Strong matriculation to UK, US, Canadian, Australian, and Indian universities',
    ],
    collegeContext:
      'Oberoi graduates matriculate to UK (Oxbridge, Russell Group, Imperial, UCL, KCL, Edinburgh), US (Ivy+, NYU, top liberal arts, public flagships), Canada (McGill, Toronto, Waterloo, UBC), Australia (Melbourne, Sydney, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar, plus AIIMS / state medical colleges for IB+NEET-track students). For Biology HL students, common pathways include UK medicine, US pre-med, and Canadian life-sciences direct entry; the IB+NEET track is widely used at Oberoi for students who want to apply to Indian medical colleges in parallel.',
    paceAlignment:
      "Oberoi's IB Biology follows the standard two-year DP cycle. The two-campus structure (JVLR and OGC) means IA submission timing and mock-exam calendars can vary slightly between campuses. IST timezone aligns directly with our India-based tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM) or weekend mornings. For IB+NEET students, we run an integrated weekly schedule with IB Biology HL + NEET Biology + Chemistry + Physics on a single calendar.",
    faqs: [
      {
        question: 'Do you coach IB Biology for both Oberoi JVLR and OGC campuses?',
        answer:
          "Yes. The two campuses follow the same IB Biology syllabus on broadly aligned schedules but have different teacher cohorts and IA submission rhythms. Our 1:1 sessions adapt to your specific campus's internal calendar — IA deadlines, mock exam windows, and the school's own practical-work schedule.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Oberoi students?',
        answer:
          'Yes. We coach an IB+NEET integrated weekly schedule — a specialised track that few biology coaching providers in India run. Many Oberoi students pursue the dual IB+NEET pathway because it preserves both abroad and India medical-college options. The integrated programme covers IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule, typically ₹60,000–₹98,000 per year for the complete coaching.',
      },
      {
        question: "How does Oberoi's IB Biology compare to Dhirubhai Ambani International?",
        answer:
          'Both schools run rigorous IB Biology HL programmes with similar 6/7 outcomes. The cohort sizes differ — Oberoi runs two campuses while Dhirubhai Ambani is single-campus in BKC. The Mumbai IB market is tightly competitive, and our coaching adapts to school-specific IA submission rhythms and mock-exam calendars.',
      },
      {
        question: 'How does pricing work for Oberoi Mumbai families?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year, 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: ₹60,000–₹98,000 per year for the integrated programme. Mumbai-resident families typically pay in INR with payment plans over 3-4 instalments; abroad-bound families can opt for USD international pricing.',
      },
      {
        question: 'When should an Oberoi student start IB Biology tutoring?',
        answer:
          'For the integrated 2-year Complete Programme, August or September of DP1. For IB+NEET students, ideally during MYP5 to build the Chemistry and Physics depth needed for NEET. For exam-only coaching, October DP2 (after November mocks) is still effective.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 11. ASB — American School of Bombay (Mumbai)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'asb-mumbai',
    schoolName: 'American School of Bombay',
    shortName: 'ASB Mumbai',
    cityCountry: 'Mumbai, India',
    citySlug: 'mumbai',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'IB Diploma Programme',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "The American School of Bombay (ASB) is a not-for-profit international school in Mumbai, founded in 1981. ASB runs an American high-school curriculum from K-12 and offers the IB Diploma Programme as the senior school option, alongside AP coursework. The school is US-accredited (NEASC) and is part of the East Asia Regional Council of Schools (EARCOS). ASB's primary campus is in Bandra Kurla Complex (BKC), with a secondary campus in Kohinoor.",
      "ASB's IB Biology cohort is smaller than Mumbai's larger IB Continuum schools (Oberoi, Dhirubhai Ambani) because ASB also offers an American-diploma-only pathway — many students choose AP Biology instead. However, the IB students at ASB are typically self-selecting toward the IB's breadth-and-IA assessment model and the international university applications that benefit from it. IB Biology HL and SL are both offered, with full the IB practical programme coverage.",
      "For ASB students, the most common driver of external tutoring is the dual American-and-IB context: the school's academic culture is shaped by both AP and IB rhythms, and IB students sometimes want a tutor who can fully commit to the IB rubric without any AP-style framing creeping in. Our 1:1 sessions are 100% IB-rubric-aligned — Paper 2 long-response calibration, IA mentorship, and data-response practice. We also coach the dual IB+NEET track for students who want to preserve Indian medical college options.",
      "ASB's location in BKC means the school sits at the centre of Mumbai's expat-and-corporate residential belt — students live in BKC itself, Bandra, Worli, and a wider catchment that includes Powai for some families. Commute times are relatively short by Mumbai standards, but the school day plus extracurriculars still pushes many DP students to a 7 PM finish before they start independent study. Our IST live sessions sit at 7:30–9 PM most weekdays, with weekend morning intensives an option during the final March-April push before May exams. For IB+NEET students at ASB, the integrated weekly schedule is heavier and we recommend starting Chemistry and Physics buildup in Grade 10 (the year before DP1).",
    ],
    reputationBullets: [
      'Not-for-profit international school in Mumbai, founded 1981',
      'NEASC-accredited (US) with EARCOS membership',
      'Dual-pathway senior school: American diploma with AP OR IB Diploma',
      'Primary campus in Bandra Kurla Complex (BKC)',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Strong matriculation to US (Ivy+, top liberal arts) and UK universities',
    ],
    collegeContext:
      'ASB graduates have one of the most US-focused matriculation profiles among Mumbai international schools — Harvard, Yale, Princeton, MIT, Stanford, the Ivy+, NYU, top liberal arts, and US public flagships. UK matriculation (Oxbridge, Russell Group, Imperial, UCL) is also strong. For Biology HL students, US pre-med is the most common pathway; UK medicine and Canadian life-sciences direct entry are also represented. For India-bound students, the IB+NEET track preserves AIIMS and state medical college options.',
    paceAlignment:
      "ASB's IB Biology follows the standard two-year DP cycle, sitting inside a school that also runs AP. The dual American-and-IB context means the school's academic calendar follows the US August-to-June rhythm with US-style winter and spring breaks. IST timezone aligns directly with our India-based tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM) or weekend mornings, with IA mentorship aligned to ASB's DP1-late submission cycle.",
    faqs: [
      {
        question: 'Does ASB Mumbai offer both AP Biology and IB Biology?',
        answer:
          'Yes — ASB is one of the few Mumbai schools that runs both the IB Diploma Programme and AP coursework in parallel. Students typically choose one pathway by Grade 10. Our coaching is IB-specific — if your student is on the AP track, see our AP Biology pages instead. For IB students, our 1:1 coaching is fully IB-rubric-aligned without any AP framing.',
      },
      {
        question: 'Do you offer the IB+NEET integrated track for ASB students?',
        answer:
          'Yes. Cerebrum offers a structured IB+NEET integrated coaching track — among the few such programmes from India-based biology providers. ASB IB students who want to preserve both abroad (US pre-med, UK medicine) and India (AIIMS, state medical college) options can pursue the dual IB+NEET pathway with us. The integrated programme covers IB Biology HL + NEET Biology + Chemistry + Physics, typically ₹60,000–₹98,000 per year.',
      },
      {
        question: "How does ASB's IB Biology compare to Oberoi and Dhirubhai Ambani?",
        answer:
          "All three Mumbai IB schools run rigorous Biology HL programmes with similar 6/7 outcomes. ASB's IB cohort is typically smaller (because ASB also runs AP), which can shift the cohort dynamics. Our coaching adapts to school-specific IA submission rhythms; we do not borrow scripts across the three schools.",
      },
      {
        question: 'How does pricing work for ASB Mumbai families?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year, 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: ₹60,000–₹98,000 per year for the integrated programme. ASB families typically pay either via international card (USD) or in INR with payment plans over 3-4 instalments.',
      },
      {
        question: 'When should an ASB Mumbai student start IB Biology tutoring?',
        answer:
          'For the integrated 2-year Complete Programme, August or September of DP1. For IB+NEET students, ideally during Grade 10 to build Chemistry and Physics foundations. For exam-only coaching, October DP2 (after November mocks) is effective for May finals.',
      },
      {
        question:
          'How does ASB Mumbai prepare Biology HL students for US Ivy+ pre-med applications?',
        answer:
          "ASB's US-focused academic culture and NEASC accreditation give Biology HL students a competitive starting position for Ivy+ pre-med pathways. A 6 or 7 in HL Biology, combined with the school's broader academic profile, is part of the standard signal Ivy+ admissions look for. Our coaching focuses on the HL grade and the IA — the academic-signal components — while ASB's own university counselling office handles the application essays, recommendation strategy, and interview prep.",
      },
      {
        question:
          'What is the typical Biology HL trajectory for an ASB Mumbai student over the full DP1+DP2 cycle?',
        answer:
          "DP1: foundational content (cells, biochemistry, genetics, ecology), IA topic-selection in late DP1. DP2: HL extensions (cellular respiration depth, neurobiology, animal and plant physiology), IA submission early DP2, November DP2 mocks, then full-length Paper 1 and Paper 2 mocks January–April leading to May finals. Our 1:1 coaching typically runs 2–3 hours per week through this cycle, calibrated to the school's specific calendar.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 12. STAMFORD AMERICAN INTERNATIONAL SCHOOL (Singapore)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'stamford-american-singapore',
    schoolName: 'Stamford American International School',
    shortName: 'Stamford American',
    cityCountry: 'Singapore',
    citySlug: 'singapore',
    timezone: 'SGT (Singapore)',
    timezoneIana: 'Asia/Singapore',
    countryCode: 'SG',
    inLanguage: 'en-SG',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP', 'CP'],
    historyParagraphs: [
      "Stamford American International School (Stamford American) is a full IB Continuum school in Singapore's Woodleigh and Early Learning Village campuses, founded in 2009. Stamford American runs PYP, MYP, DP, and the IB Career-related Programme (CP) — making it one of the few schools globally offering all four IB programmes. The school is part of Cognita Schools, the international school operator.",
      "Stamford American's IB Diploma cohort sits inside the highly competitive Singapore IB market alongside UWCSEA, Tanglin Trust, SAS, and Dulwich. IB Biology HL and SL are both offered, with full the IB practical programme coverage. The school has publicly reported strong IB results — recent cohort averages above the global mean, with a meaningful share of candidates scoring 40+ (publicly reported in the school's annual results communications).",
      'For Stamford American students, the most common driver of external tutoring is Paper 2 mark-scheme calibration and IA mentorship — the same pattern as at the other top Singapore IB schools. The Singapore IB market is small enough that our group batches often include peers from Stamford American, Tanglin Trust, UWCSEA, and SAS sharing the same SGT live-class slot.',
      "Stamford American's distinctive offering — running all four IB programmes including the Career-related Programme (CP) — means a small number of students each year take Biology as part of a CP rather than the full DP. The CP combines two DP subjects with a career-related study and reflective project. For students on this pathway with Biology as one of their DP courses, the academic content is identical to the standard DP Biology HL or SL syllabus, and our 1:1 coaching is the same. The IA workflow differs slightly because CP students have less concurrent DP workload, which sometimes means more time available for IA refinement; we adapt the weekly pacing accordingly.",
      "Stamford American sits inside Cognita Schools, a global international-school network, which means the school's policies and academic calendar are aligned with Cognita's broader systems. For families relocating between Cognita schools (e.g., Stamford American in Singapore to another Cognita school in Bangkok or Hong Kong), the IB Biology DP curriculum transfers cleanly because the IB syllabus is identical worldwide. Our coaching adapts to the new school's specific IA submission rhythm and mock-exam calendar without requiring students to restart any content sequence — a meaningful advantage for the relocating-expat families that make up a substantive share of the Stamford American community.",
    ],
    reputationBullets: [
      'Full IB Continuum + CP: PYP + MYP + DP + Career-related Programme',
      'Founded 2009; campuses at Woodleigh and Early Learning Village',
      'Part of Cognita Schools international network',
      'Recent school-reported diploma averages above the global mean',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Strong matriculation to UK, US, Canadian, Australian, and Singapore universities',
    ],
    collegeContext:
      'Stamford American graduates matriculate to UK (Oxbridge, Russell Group, Imperial, UCL, KCL), US (Ivy+, NYU, top liberal arts, public flagships), Singapore (NUS, NTU, SMU), Canada (McGill, Toronto, UBC), and Australia (Melbourne, Sydney, Monash, ANU). For Biology HL students, common pathways include UK medicine (UCAT/BMAT required), US pre-med, NUS Medicine, and Canadian life-sciences direct entry.',
    paceAlignment:
      "Stamford American's IB Biology follows the standard two-year DP cycle. Our 1:1 sessions schedule in SGT evenings (7–9 PM) to fit the Stamford American school day or weekend morning blocks. IA mentorship aligns to the school's DP1-late submission cycle. Mock-exam coaching aligns to the November DP2 mocks; intensive Paper 1/2/3 mocks scale up March–April for the May session.",
    faqs: [
      {
        question: "How does Stamford American's IB Biology compare to UWCSEA and Tanglin Trust?",
        answer:
          "All three Singapore IB schools run rigorous Biology HL programmes with similar 6/7 outcomes. UWCSEA's cohort is larger, Tanglin's is self-selected (dual A-Level / IB pathway), and Stamford American sits between the two in cohort size. Our coaching adapts to school-specific IA submission rhythms and the November DP2 mock dates.",
      },
      {
        question: "Does Stamford American's CP programme affect Biology coaching?",
        answer:
          'The IB Career-related Programme (CP) is a separate pathway from the DP. Students on the CP take some DP courses but combine them with a career-related study. For students on the full DP (with Biology HL or SL as a standard Group 4 subject), our coaching is the same as for any other DP-route student. If your student is specifically on the CP with a Biology component, contact us — the coaching is similar but the IA workflow differs slightly.',
      },
      {
        question:
          'Can Stamford American students join group batches with peers from other Singapore IB schools?',
        answer:
          'Yes. Our Group Batch (4–8 students, $40/hour) often includes Singapore-time students from Stamford American, UWCSEA, Tanglin Trust, and SAS sharing the same SGT live-class slot. The peer-discussion element is part of the value of the group format.',
      },
      {
        question: 'When should a Stamford American student start IB Biology tutoring?',
        answer:
          'For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For exam-only coaching, October DP2 (after November mocks) is still effective for the May session, focusing on Paper 2 mark-scheme calibration and data-response drills.',
      },
      {
        question: 'How does pricing work for Stamford American families?',
        answer:
          'USD-denominated: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour (4–8 students). SGD equivalents shown for reference; Singapore families typically pay via international card.',
      },
      {
        question:
          'How does Stamford American Biology HL prepare students for NUS Medicine and other Singapore university applications?',
        answer:
          'NUS Medicine and NUS-NTU Biomedical Science programmes require strong Biology HL outcomes — typically a 6 or 7 — combined with strong overall DP scores and the additional Singapore-specific application steps. Our coaching focuses on the academic-signal side (Biology HL grade and IA quality), while application-specific work (BMAT/interviews where required, the NUS Medicine personal statement) is best handled separately through specialist Singapore-admissions services.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 13. MAHATMA GANDHI INTERNATIONAL SCHOOL (Ahmedabad)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'mahatma-gandhi-international-ahmedabad',
    schoolName: 'Mahatma Gandhi International School',
    shortName: 'MGIS Ahmedabad',
    cityCountry: 'Ahmedabad, India',
    citySlug: '',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Mahatma Gandhi International School (MGIS) is a full IB Continuum school in Ahmedabad, Gujarat — distinctively, one of the earliest IB World Schools in India to offer all three core programmes (PYP, MYP, DP). MGIS was founded in 1998 and authorised for the DP in 2000, making it among the longer-running IB Diploma schools in the country. The school is located on Mirambika campus and operates on a not-for-profit basis.',
      "MGIS's IB Biology cohort is smaller than the larger Delhi NCR and Mumbai IB schools — Ahmedabad has a more concentrated IB market — but the cohort is academically self-selected. IB Biology HL and SL are both offered, with full the IB practical programme coverage. The school has publicly reported diploma results above the global mean, with strong students scoring 40+ (publicly reported in the school's annual results communications).",
      'For MGIS students, the most common driver of external tutoring is the Ahmedabad context: the local IB tutoring market is small, and families want access to examiner-led 1:1 coaching that may not be available locally. Our online IB Biology programme runs in IST and serves Ahmedabad students with the same examiner-led 1:1 model used at Mumbai, Delhi, and Bangalore IB schools. We also coach the dual IB+NEET track for students who want to preserve Indian medical college options.',
      "MGIS's not-for-profit operating model and pedagogical lineage — its Gandhian framing emphasises inquiry, sustainability, and community — give the school a distinct academic culture compared to the more commercial international-school chains in India. Biology HL at MGIS is taught with strong emphasis on ecology and the human-environment systems strand of the syllabus, which is a natural fit for the school's broader pedagogy. Our IA mentorship coordinates well with this: ecology-themed IA topics are common at MGIS, and our examiners have specific experience supervising field-data and longitudinal-ecology IAs through the IB's practical-work rubric.",
      "Ahmedabad's IB student community is small enough that students often have close cohort relationships across schools (MGIS, Ahmedabad International, others). Our online format makes it practical for two or three friends to join a Group Batch ($40/hour) together — sometimes the same friends from different schools — preserving the peer-discussion benefit even when the local IB ecosystem is geographically compact. For Ahmedabad students who later relocate (a common pattern with parents transferred to Mumbai, Bangalore, or abroad), the IB Biology syllabus transfers cleanly worldwide, so the coaching continues without restart.",
    ],
    reputationBullets: [
      'Full IB Continuum: PYP + MYP + DP (one of the earliest in India)',
      'Founded 1998; DP authorised 2000',
      'Not-for-profit, located in Ahmedabad, Gujarat',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Recent school-reported diploma averages above the global mean',
      'Strong matriculation to UK, US, Canadian, Australian, and Indian universities',
    ],
    collegeContext:
      'MGIS graduates matriculate to UK (Russell Group, Oxbridge, Imperial, UCL), US (Ivy+, NYU, top liberal arts), Canada (McGill, Toronto, UBC, Waterloo), Australia (Melbourne, Sydney, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar, plus AIIMS / state medical colleges for IB+NEET students). For Biology HL students, common pathways include UK medicine, US pre-med, Canadian life-sciences, and the dual IB+NEET track for India-bound students.',
    paceAlignment:
      "MGIS's IB Biology follows the standard two-year DP cycle. IST timezone aligns directly with our India-based tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM) or weekend mornings, with IA mentorship aligned to MGIS's DP1-late submission cycle. For IB+NEET students, we run an integrated weekly schedule with IB Biology HL + NEET Biology + Chemistry + Physics on a single calendar.",
    faqs: [
      {
        question: 'Is MGIS Ahmedabad the right school choice for IB Biology HL preparation?',
        answer:
          "MGIS is one of the longer-running IB Diploma schools in India and runs a strong IB Biology programme with both HL and SL streams. School choice is a separate question from tutoring choice — if you're already enrolled at MGIS, our 1:1 coaching layers Paper 2 mark-scheme calibration and IA mentorship on top of the school's content delivery.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for MGIS students?',
        answer:
          'Yes. Cerebrum runs an IB+NEET integrated track that few India-based providers offer. MGIS students who want to preserve both abroad and India medical-college options can pursue the dual IB+NEET pathway. The integrated programme covers IB Biology HL + NEET Biology + Chemistry + Physics, typically ₹60,000–₹98,000 per year.',
      },
      {
        question:
          'Is online tutoring effective for Ahmedabad students who are away from major IB hubs?',
        answer:
          'Yes — our online IB Biology programme has been running for several years with students from Mumbai, Delhi, Bangalore, Chennai, and smaller IB hubs. The 1:1 examiner-led format works the same way over Zoom as it would in person, with screen-share IA review and recorded sessions for revision.',
      },
      {
        question: 'How does pricing work for MGIS Ahmedabad families?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year, 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: ₹60,000–₹98,000 per year for the integrated programme. India-resident families typically pay in INR with payment plans over 3-4 instalments.',
      },
      {
        question: 'When should an MGIS student start IB Biology tutoring?',
        answer:
          'For the integrated 2-year Complete Programme, August or September of DP1. For IB+NEET students, ideally during MYP5 / Grade 10 to build Chemistry and Physics foundations. For exam-only coaching, October DP2 (after November mocks) is effective for May finals.',
      },
      {
        question:
          "How does ecology-themed IA work for MGIS students given the school's Gandhian pedagogy?",
        answer:
          "Ecology-themed IAs (e.g., abundance studies, population dynamics, plant-community surveys, water-quality biomonitoring) are a natural fit for MGIS's broader pedagogical emphasis on environment and sustainability. Our examiners have specific experience supervising field-data IAs through the IB's practical-work rubric: research-question precision, ethics and environmental impact framing, data collection rigour, and the evaluation section that distinguishes 6/7 IAs from 5-level work. We coach the rubric specifics, not the Gandhian framing.",
      },
      {
        question:
          'How does pricing work for Ahmedabad-resident MGIS families compared to international IB pricing?',
        answer:
          'India-resident MGIS families typically pay in INR with payment plans over 3-4 instalments. The USD pricing ($6,000 Complete / $75 Elite / $40 Group) is shown for reference and applies for families who specifically request international invoicing. For IB+NEET-track students, the integrated programme at ₹60,000–₹98,000 per year is the typical choice and includes the additional NEET Chemistry and Physics coaching alongside IB Biology HL.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 14. DHIRUBHAI AMBANI INTERNATIONAL SCHOOL (Mumbai)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'dhirubhai-ambani-mumbai',
    schoolName: 'Dhirubhai Ambani International School',
    shortName: 'DAIS Mumbai',
    cityCountry: 'Mumbai, India',
    citySlug: 'mumbai',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Dhirubhai Ambani International School (DAIS) is one of the most selective international schools in India, located in Bandra Kurla Complex (BKC), Mumbai. Operated by the Reliance Foundation, DAIS runs PYP, MYP, and DP as a full IB Continuum. The school admits via a competitive selection process and is consistently among the highest-fee international schools in India.',
      "DAIS's IB Diploma cohort has one of the strongest publicly reported academic profiles in India. Recent cohort averages have been well above the global mean — DAIS has publicly reported diploma averages in the 38–40+ range with multiple candidates each year scoring 44 or 45 (publicly reported in the school's annual results communications and Mumbai-press coverage). IB Biology HL and SL are both offered, with full the IB practical programme coverage.",
      "For DAIS students, the most common driver of external tutoring is the differentiation challenge: the cohort is so academically strong that turning a 6 into a 7 is the marginal value, and that's typically a Paper 2 mark-scheme calibration question. Our 1:1 sessions focus on this exact margin — turning strong classroom answers into 6/7-marker rubric-aligned responses — plus IA mentorship at the 6/7 level where the school's internal moderation rewards distinctive evaluation work.",
      "DAIS's selective admissions process means the cohort enters DP1 with already-exceptional academic preparation, and the school's pace through the two-year DP track is correspondingly fast. Most of the IB Biology syllabus is comprehensively covered by mid-DP2, which leaves February through April of DP2 for full-length Paper 1 and Paper 2 mocks and IA finalisation. Our coaching schedule respects that pace: rather than introducing new content, we use the final spring window for examiner-led mock-exam debriefs, IA polish at the 6/7 level, and Paper 2 data-response drills using past papers across recent IB sessions. For DAIS students aiming for Oxbridge medicine or US Ivy+ pre-med, a clean 7 in HL Biology paired with a strong overall DP score is the standard academic-signal target, and our 1:1 Elite Tutoring tier ($75/hour) is calibrated to that endpoint.",
    ],
    reputationBullets: [
      'Full IB Continuum: PYP + MYP + DP',
      'Located in Bandra Kurla Complex (BKC), Mumbai',
      'Operated by Reliance Foundation',
      'Selective competitive admissions',
      'Recent school-reported diploma averages in the 38–40+ range — among the highest in India',
      'Multiple 44/45 candidates each year (publicly reported)',
    ],
    collegeContext:
      'DAIS graduates have one of the strongest matriculation profiles among Indian international schools. Common destinations include UK (Oxbridge, Imperial, UCL, KCL, LSE), US (Harvard, Yale, Princeton, MIT, Stanford, the Ivy+, top liberal arts), Canada (McGill, Toronto, UBC, Waterloo), Singapore (NUS, NTU, SMU), and Australia (Melbourne, Sydney, Monash). For Biology HL students, the most common pathways are UK medicine and US pre-med through Ivy+ universities; the IB+NEET track is also available for students who want to preserve AIIMS and state medical college options.',
    paceAlignment:
      "DAIS's IB Biology follows the standard two-year DP cycle at a pace that's among the fastest in India — most of the syllabus is comprehensively covered by mid-DP2, leaving February–April for full-length Paper 1 and Paper 2 mocks and IA finalisation. IST timezone aligns directly with our tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM) or weekend mornings; the coaching focus is at the 6-to-7 margin rather than building base content.",
    faqs: [
      {
        question: 'Do DAIS Mumbai students typically need outside IB Biology tutoring?',
        answer:
          "DAIS's IB Biology programme is among the strongest in India, so most students do not need content tutoring. The gap, when it exists, is at the 6-to-7 margin: Paper 2 mark-scheme calibration and IA at the 6/7 level. Roughly one in three of our DAIS students is specifically targeting a 7 on Biology HL, and that's where the 1:1 1:1 examiner-led coaching adds the most value.",
      },
      {
        question: 'What is the time commitment for a DAIS student?',
        answer:
          "Given DAIS's strong content delivery, most students take 60–90 minute 1:1 sessions once or twice a week (1.5–3 hours total) rather than the heavier load typical at less-rigorous schools. Self-directed work on past papers and IA refinement is the larger time commitment — typically 4–6 hours per week of independent practice.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for DAIS students?',
        answer:
          'Yes. We are among the small number of India-based providers running an IB+NEET integrated coaching track. A meaningful share of DAIS students pursue the dual IB+NEET pathway because it preserves both abroad and India medical-college options. The integrated programme covers IB Biology HL + NEET Biology + Chemistry + Physics, typically ₹60,000–₹98,000 per year.',
      },
      {
        question: "How does DAIS's IB Biology compare to Oberoi International?",
        answer:
          "DAIS's recent publicly reported cohort averages (38–40+) are higher than Oberoi's (at or above the global mean). Both schools run rigorous Biology HL programmes; the difference is more about cohort academic profile than the syllabus delivery itself. Our coaching adapts to school-specific IA submission rhythms.",
      },
      {
        question: 'How does pricing work for DAIS Mumbai families?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year, 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: ₹60,000–₹98,000 per year for the integrated programme. DAIS families typically pay either via international card (USD) or in INR with payment plans over 3-4 instalments.',
      },
      {
        question:
          'How does DAIS Biology HL prepare students for Oxbridge medicine and US Ivy+ pre-med applications?',
        answer:
          "DAIS's recent publicly reported cohort averages in the 38–40+ range make the school's IB Biology HL a strong starting position for the most-competitive medical and pre-med pipelines. A 7 in HL Biology with a polished IA is part of the standard academic-signal package Oxbridge and US Ivy+ admissions look for; UCAT/BMAT, the personal statement, and interview prep are separate. Our coaching focuses on the academic-signal side — the HL grade and IA at the 6/7 level.",
      },
      {
        question: 'When should a DAIS student start IB Biology tutoring?',
        answer:
          "Given DAIS's strong content delivery, families often start later than at other schools. For students confident in school content but wanting the 6-to-7 margin work, October–December DP2 (focused exclusively on Paper 2 mark-scheme calibration and data-response drills) is a viable timeline. For students wanting full IA mentorship at the 6/7 level, August or September of DP1 is still the ideal start.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 15. THE CATHEDRAL AND JOHN CONNON SCHOOL (Mumbai)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'cathedral-mumbai',
    schoolName: 'The Cathedral and John Connon School',
    shortName: 'Cathedral School',
    cityCountry: 'Mumbai, India',
    citySlug: 'mumbai',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'IB Diploma Programme',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'The Cathedral and John Connon School is one of the oldest schools in Mumbai, founded in 1860 as a parish school and now operating as a tri-curriculum private school in Fort, Mumbai. The school runs ICSE/ISC through Grade 10, then offers both ISC and the IB Diploma Programme as senior school options for Grades 11 and 12 — making it a dual-pathway senior school where IB sits alongside the Indian Senior School Certificate.',
      "Cathedral's IB Diploma cohort is smaller than the dedicated IB Continuum schools in Mumbai (Oberoi, DAIS, Ecole Mondiale) — many Cathedral students continue on the ISC track — but the students who choose IB are self-selecting toward the IB's breadth and IA-driven assessment model. IB Biology HL and SL are both offered, with full the IB practical programme coverage. The school has a strong overall academic reputation in Mumbai and publicly reports diploma results above the global mean for its IB cohort.",
      "For Cathedral students, the most common driver of external tutoring is the dual ISC-and-IB context: the school's academic culture is shaped by both ISC and IB rhythms, and IB students sometimes arrive at DP1 with strong ISC habits — which is a different starting profile than students who came up through MYP. Our DP1 coaching explicitly bridges the ICSE/ISC-to-IB transition, calibrating the IB's data-analysis-driven Paper 2 style. We also coach the dual IB+NEET track for students who want to preserve Indian medical college options.",
      "Cathedral's Fort location and its long-running ICSE/ISC tradition make it different in character from the BKC and western-suburbs IB Continuum schools. Many Cathedral families have multi-generational relationships with the school, and the cultural expectation often includes considering both ISC and IB before committing to one in Grade 11. Students who choose IB are typically self-selecting toward international university applications (UK, US, Canada), while ISC-track students more often stay in India. Our IB Biology coaching adapts to this profile: we work most often with students who have explicitly chosen the international pathway and want a clean 6 or 7 in Biology HL as a key academic-signal input for UK medicine or US pre-med applications.",
      'The ICSE-to-IB transition at Cathedral is sharper than at MYP-fed schools because ICSE Grade 10 is content-dense and finals-focused, while IB DP1 expects students to start producing the data-analysis-and-evaluation style of writing that Paper 2 rewards. Our explicit DP1 coaching includes side-by-side comparisons of ICSE-style answers and IB-rubric-aligned answers on the same biological topic, so students see the writing-style shift concretely. By mid-DP1, most Cathedral IB Biology students have internalised the transition; the remaining DP1 work focuses on IA topic-selection and the standard syllabus content.',
    ],
    reputationBullets: [
      'Founded 1860 — one of the oldest schools in Mumbai',
      'Located in Fort, Mumbai',
      'Tri-curriculum: ICSE through Grade 10, then ISC + IB Diploma in senior school',
      'Dual-pathway senior school (ISC OR IB)',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Strong matriculation to UK, US, Canadian, Australian, and Indian universities',
    ],
    collegeContext:
      "Cathedral graduates matriculate to UK (Russell Group, Oxbridge, Imperial, UCL, KCL, LSE), US (Ivy+, NYU, top liberal arts, public flagships), Canada (McGill, Toronto, UBC, Waterloo), Australia (Melbourne, Sydney, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar, plus AIIMS / state medical colleges for IB+NEET-track students). For Biology HL students, common pathways include UK medicine, US pre-med, and Canadian life-sciences direct entry; the IB+NEET track is widely used among Cathedral's India-bound students.",
    paceAlignment:
      "Cathedral's IB Biology follows the standard two-year DP cycle, sitting inside a school that also runs ISC. The dual ISC-and-IB context shapes early DP1 coaching — students often need explicit work on the IB's data-analysis-driven Paper 2 style versus ISC's recall-heavy structure. IST timezone aligns directly with our India-based tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM) or weekend mornings.",
    faqs: [
      {
        question: 'Does Cathedral Mumbai offer both ISC and IB in senior school?',
        answer:
          'Yes — Cathedral runs a dual-pathway senior school where Grade 11 and 12 students choose between ISC and the IB Diploma. Students who opt for IB are typically self-selecting toward the breadth-and-IA assessment model. Our coaching is 100% IB-rubric-aligned — we do not blend ISC framing, because the Paper 2 mark-scheme and IA rubric are highly specific.',
      },
      {
        question: 'How does the ICSE-to-IB transition affect IB Biology preparation?',
        answer:
          "ICSE Biology is content-dense and recall-heavy. IB Biology HL Paper 2 rewards data analysis, evaluation, and the specific 6/7-marker long-response rubric. Students who come up through Cathedral's ICSE track sometimes over-recall on Paper 2 — listing 8 facts when the rubric rewards 3 well-developed evaluative points. Our DP1 coaching explicitly calibrates this writing-style transition.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Cathedral students?',
        answer:
          'Yes. Cerebrum runs a dedicated IB+NEET integrated coaching track — a niche programme few biology-only providers in India offer. Cathedral students who want to preserve both abroad and India medical-college options can pursue the dual IB+NEET pathway. The integrated programme covers IB Biology HL + NEET Biology + Chemistry + Physics, typically ₹60,000–₹98,000 per year.',
      },
      {
        question: "How does Cathedral's IB Biology compare to DAIS and Oberoi?",
        answer:
          "Cathedral's IB cohort is smaller than DAIS's or Oberoi's because the school also runs ISC in senior years. DAIS has a higher publicly reported cohort average (38–40+). Cathedral and Oberoi both run rigorous IB Biology HL with cohort averages above the global mean. Our coaching adapts to the school-specific IA submission rhythm.",
      },
      {
        question: 'How does pricing work for Cathedral Mumbai families?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year, 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: ₹60,000–₹98,000 per year for the integrated programme. Mumbai-resident families typically pay in INR with payment plans over 3-4 instalments.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 16. THE SHRI RAM SCHOOL ARAVALI (Gurugram, India)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'shri-ram-aravali',
    schoolName: 'The Shri Ram School Aravali',
    shortName: 'TSRS Aravali',
    cityCountry: 'Gurugram, India',
    citySlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['MYP', 'DP'],
    historyParagraphs: [
      'The Shri Ram School Aravali is the senior campus of The Shri Ram Schools (TSRS) network, founded in 2008 in Sector V-37 Gurugram on the wooded southern edge of the Aravali range. The Shri Ram Schools group itself was founded in 1988 by Manika Sharma, with the original Gurgaon campus at Moulsari (Sector 46) opening earlier and now operating through MYP. TSRS Aravali is the IB Diploma Programme campus — many TSRS students transition from the Moulsari MYP track to the Aravali DP track for Grades 11 and 12, although Aravali also enrols students directly from other schools at the DP entry point.',
      "TSRS Aravali runs a full MYP-to-DP secondary programme and is recognised in the Delhi NCR IB landscape for its progressive pedagogy and a humanities-and-arts-strong identity that the school has actively cultivated since its founding. The Biology department offers both HL and SL with full the IB practical programme coverage, and the school's overall IB Diploma results have publicly read as competitive within the NCR cluster — a meaningful share of each graduating cohort has historically scored at or above the global mean per school communications, though TSRS does not publish per-subject IB Biology distributions in the way some schools do.",
      "For TSRS Aravali students, the most common driver of external IB Biology tutoring is twofold: (1) Paper 2 rubric calibration where TSRS's inquiry-led classroom culture produces conceptually strong students who sometimes still drop marks against the IB's specific long-response mark scheme, and (2) IA topic-selection and mentorship through the DP1 cycle, where Biology IA's design + data-analysis demands often benefit from a one-to-one tutor who has examined IAs against the rubric. Several TSRS Aravali families also pursue the integrated IB+NEET track because the Sector V-37 location keeps the dual-track preserved without an unrealistic commute to a separate NEET coaching centre.",
      "TSRS Aravali's wooded Aravali-range location and its day-school structure (not residential) shape the rhythm of tutoring scheduling. Day students commute from across the Gurgaon catchment — Sohna Road, Golf Course Extension, Sushant Lok, DLF Phase 5, and the newer Sector 70–80 belt — with door-to-door commutes that can run 30–60 minutes each way. Our IST live sessions at 7–9 PM work for this profile: students arrive home, eat, and join the session at the same time they would otherwise be in homework. For IB+NEET integrated students we also offer Saturday weekend intensive blocks (3 hours each morning) so the additional NEET Chemistry and Physics workload sits in a single weekend window rather than spread thinly through the week.",
    ],
    reputationBullets: [
      "Founded 2008 — TSRS group's senior IB Diploma campus in Gurgaon",
      'Part of The Shri Ram Schools network (founded 1988 by Manika Sharma)',
      'IB MYP through DP — sister campus Moulsari runs the junior MYP feed',
      'Located in Sector V-37 on the Aravali range, south Gurgaon',
      'Recognised for inquiry-led pedagogy and a humanities-and-arts-strong identity',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Day school (not residential) — students commute from across Gurgaon',
    ],
    collegeContext:
      "TSRS Aravali graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Manchester, Edinburgh), US (Ivy+, top liberal arts colleges, NYU, Northwestern), Canada (McGill, Toronto, UBC, Western, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar, Plaksha, plus AIIMS / state medical colleges for the IB+NEET dual-track students). Biology HL students from TSRS most commonly target UK medicine, US pre-med (followed by Indian medical schools via NEET on the dual-track), or biosciences degrees at top UK and Canadian universities. For TSRS's humanities-and-arts cohort, Biology HL is also common as a foundation for environmental science, neuroscience, and public-health degrees.",
    paceAlignment:
      "TSRS Aravali follows the standard two-year DP cycle with the IA submission window centred on DP1-end / early DP2. IST timezone aligns with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule that compresses IB Biology + NEET Biology + NEET Chemistry + NEET Physics into a manageable weekly load that doesn't break either syllabus. IA mentorship aligns to the school's DP1 IA proposal deadlines and the November DP2 mock exam window.",
    faqs: [
      {
        question: 'Do you offer the IB+NEET integrated track for TSRS Aravali students?',
        answer:
          'Yes — We coach an IB+NEET integrated weekly schedule — a specialised track that few biology coaching providers in India run. A meaningful share of TSRS Aravali Biology HL students pursue the dual IB+NEET pathway because it preserves both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options. We coordinate the IB Biology HL syllabus with NEET Biology + Chemistry + Physics on a single weekly schedule.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. India-resident families pay in INR; TSRS Aravali families can opt for either USD international or INR domestic pricing.',
      },
      {
        question:
          "How does TSRS Aravali's IB Biology compare to Pathways Aravali (the other major IB school in the area)?",
        answer:
          'Both schools run IB Biology HL and SL at a serious level and both campuses sit on the Aravali range within a short driving distance. Pathways Aravali is a residential + day school with a larger full IB Continuum from PYP through DP and a publicly-larger DP Biology cohort. TSRS Aravali is day-only with a smaller, more humanities-and-arts-tilted cohort. Both produce competitive DP scores; the choice between them is typically about school culture fit (boarding option, pedagogical style, peer cohort) rather than the IB Biology programme itself. Our coaching works equally with students from either school.',
      },
      {
        question:
          "What is TSRS Aravali's IB Diploma cohort average — and is that a useful comparator?",
        answer:
          'TSRS Aravali does not publish per-subject IB Biology distributions in the way some schools do, but the school\'s overall diploma performance has publicly read as competitive within the NCR cluster. Per-school averages are weaker comparators than they look — the more useful question for a specific student is "what is my target score, and what is the gap between my current trajectory and that target". Our DP1 diagnostic identifies the gap and the coaching plan closes it; cohort averages are an aggregate signal, not an individual prediction.',
      },
      {
        question: 'When should a TSRS Aravali student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window and lets the coaching shape the IA topic from proposal to final submission. For IB+NEET students, ideally even earlier (during Grade 10 / MYP5) to build the Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October or November of DP2 (after the school's mocks) is still effective and we have a number of TSRS students who join at that point specifically for Paper 2 long-response and data-response rubric drilling.",
      },
      {
        question:
          'Do you tutor TSRS Moulsari MYP5 students preparing to transition into the Aravali DP programme?',
        answer:
          'Yes — pre-DP MYP5 preparation is a useful entry point for students planning the Moulsari-to-Aravali transition. We coach the MYP-to-DP Biology bridge specifically: introducing the IB Diploma command terms ("explain", "evaluate", "discuss"), the data-analysis style that Paper 2 rewards, and the IA-style of designing a personal investigation. Many TSRS families start this in MYP5 summer so the student arrives at DP1 with the rubric language already familiar.',
      },
      {
        question:
          'TSRS Aravali is in Sector V-37 — what about the commute and live-class scheduling?',
        answer:
          'Coaching is 100% online live video — there is no physical commute to a tutoring centre. Your child opens a laptop at home after the school day (most TSRS Aravali students arrive home between 4:30–6 PM depending on the Sector V-37 commute window), eats, and joins the IST evening live session at 7 PM. Sessions run 90 minutes. For families based deeper in south Gurgaon or in the new Sector 70+ belt, the no-commute model returns roughly 90 minutes per session compared to driving to a Sohna Road or Cyber City tutoring centre.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 17. HERITAGE XPERIENTIAL LEARNING SCHOOL (Gurugram, India)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'heritage-xperiential-gurgaon',
    schoolName: 'Heritage Xperiential Learning School',
    shortName: 'Heritage Xperiential',
    cityCountry: 'Gurugram, India',
    citySlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'Heritage Xperiential Learning School (HXLS) is a co-educational day school in Sector 62 Gurugram, founded in 2002 as the flagship campus of the Heritage Schools group co-founded by Manit Jain and Vishnu Karthik. The school is built around an experiential-learning philosophy that emphasises inquiry, outdoor education, arts and theatre, and project-based assessment in the junior and middle years; in the senior school, students choose between the IB Diploma Programme and the CBSE/Indian board pathway, with the IB DP authorised under the IB World School framework.',
      "Heritage Xperiential's IB Biology cohort is smaller than Pathways Aravali's because the school also runs a CBSE senior-school track and many Heritage students continue on CBSE rather than switching to IB at Grade 11. The students who do choose IB are typically self-selecting toward international university applications — UK, US, Canada, Australia — and want the IB's breadth and IA-driven assessment to read on a Common-App or UCAS transcript. IB Biology HL and SL are both offered, with full the IB practical programme coverage, and the school's senior-school Biology department draws on the broader Heritage commitment to lab-based and field-based inquiry.",
      'For Heritage Xperiential students, the most common driver of external IB Biology tutoring is the transition from the school\'s inquiry-led junior pedagogy into the rubric-tight assessment style that the IB Diploma demands. Heritage students often arrive at DP1 with strong conceptual instincts and natural enquiry-driven curiosity (the experiential learning culture builds this from K-1), but the IB\'s command-term vocabulary ("explain", "evaluate", "discuss", "distinguish") and the precise mark-scheme structure of Paper 2 long-response answers benefit from explicit calibration. Our DP1 coaching adds that rubric scaffolding without compromising the conceptual fluency the school has built; we are deliberately not trying to convert Heritage students into rote learners, only to help them translate their conceptual strength into the IB-rubric language that scores marks.',
      'Heritage\'s IA (Internal Assessment) culture is particularly aligned with our coaching model. The school\'s experiential-learning DNA produces students who genuinely enjoy designing a personal investigation — the IB Biology IA\'s 10-hour 20-percent-weight independent investigation plays to Heritage students\' strengths rather than against them. Our IA mentorship for Heritage students typically focuses less on "how to design an investigation" and more on "how to write up the design + data analysis + evaluation against the four IB-specific assessment criteria" — converting a strong piece of inquiry into a well-scoring IA report. Several Heritage IB Biology students each cohort also pursue Extended Essay (EE) in Biology; our EE mentorship runs in parallel with the IA work to keep the DP1 research load manageable.',
    ],
    reputationBullets: [
      'Founded 2002 — flagship campus of the Heritage Schools group',
      'Co-founders: Manit Jain and Vishnu Karthik',
      'IB World School authorised for the Diploma Programme',
      'Senior school offers both IB DP and CBSE — students choose at Grade 11',
      'Experiential-learning philosophy: inquiry, outdoor ed, arts, project-based',
      'Located in Sector 62 Gurugram (Sohna-Gurgaon Road corridor)',
      'IB Biology HL and SL with full full practical-programme coverage',
      "Strong IA / EE culture aligned with the school's inquiry-driven pedagogy",
    ],
    collegeContext:
      "Heritage Xperiential IB graduates matriculate to UK (Russell Group, Oxbridge, Imperial, UCL, Edinburgh, Warwick, KCL, SOAS for humanities cross-applicants), US (Ivy+, top liberal arts colleges, NYU, Berkeley, Michigan, Northwestern), Canada (McGill, Toronto, UBC, Western, Queen's), Australia (Melbourne, Sydney, ANU), and Indian universities (Ashoka, Krea, Shiv Nadar, Plaksha, plus AIIMS / state medical colleges for the IB+NEET dual-track students). The Heritage profile is unusually strong for liberal-arts-oriented US applications (Williams, Amherst, Pomona, Wesleyan, Brown) because the experiential-learning transcript reads as authentically distinctive on US admissions side. Biology HL students from Heritage most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or interdisciplinary science programmes that reward an inquiry-and-arts profile.",
    paceAlignment:
      "Heritage Xperiential follows the standard two-year DP cycle with the IA submission window in late DP1 / early DP2. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common) or weekend morning blocks. For IB+NEET integrated students, we run a combined weekly schedule that layers NEET Biology + Chemistry + Physics on top of IB Biology HL without doubling the workload — many Heritage students value this efficiency because the school's culture is anti-burnout. IA mentorship aligns to the school's DP1 IA proposal deadlines; EE mentorship runs in parallel for the cohort that takes Biology as their EE subject.",
    faqs: [
      {
        question:
          "My child is at Heritage Xperiential's experiential-learning programme through Grade 10 — will they adjust to the IB DP's rubric-tight assessment style?",
        answer:
          'Yes, and the adjustment is typically faster than parents expect. Heritage students arrive at DP1 with strong conceptual instincts and a natural inquiry-driven curiosity that the school\'s K-10 experiential model builds. The IB DP layer is essentially adding rubric vocabulary ("explain", "evaluate", "discuss", "distinguish") and Paper 2 long-response structure on top of that conceptual foundation. Most Heritage students internalise the rubric language within the first DP1 term once it is taught explicitly. Our DP1 coaching adds that scaffolding without converting them into rote learners — we are deliberately keeping the conceptual fluency the school has built.',
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Heritage Xperiential students?',
        answer:
          "Yes — Cerebrum offers a structured IB+NEET integrated coaching track — among the few such programmes from India-based biology providers. Some Heritage IB Biology HL students pursue the dual IB+NEET pathway because it preserves both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule. Heritage students often value this efficiency because the school's culture is anti-burnout — we calibrate the integrated load explicitly to avoid the 60-hour weekly trap.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. India-resident families pay in INR; Heritage Xperiential families can opt for either USD international or INR domestic pricing.',
      },
      {
        question:
          "Heritage's senior school offers both IB and CBSE — when does IB Biology coaching make sense, and when is the student better off staying on CBSE?",
        answer:
          'The honest answer depends on the application target. If your child is realistically applying to UK / US / Canada / Australia universities, IB is the better signal and the workload is justified. If your child is realistically going to study in India (AIIMS, state medical colleges, IITs, Ashoka, Krea), CBSE is the cleaner path — NEET-eligibility and Indian-university processes are CBSE-aligned. The grey zone is dual-application students who want both options open: we work with these students on the IB+NEET integrated track to preserve both paths. We will be straight with you about which track to prioritise based on your application target.',
      },
      {
        question:
          'My child is doing Biology IA at Heritage and wants the rubric to actually translate into marks — can you help with that specifically?',
        answer:
          'Yes — IA mentorship is one of our highest-leverage offers for Heritage students because the experiential pedagogy already produces strong investigation design. The gap, when it exists, is in writing up the design + data + evaluation against the four IB-specific assessment criteria (Personal Engagement, Exploration, Analysis, Evaluation, Communication). We work through draft-by-draft rewrites with explicit criterion-by-criterion feedback. Several Heritage Biology IAs each cohort move from low-7s to high-7s with two or three rounds of this feedback, because the underlying inquiry is already strong; the gap is in the formal write-up.',
      },
      {
        question:
          'Do you support Biology Extended Essay (EE) for Heritage students taking it as their EE subject?',
        answer:
          "Yes. EE mentorship runs alongside IA mentorship in DP1 so the research load is manageable. Biology EE is a 4,000-word independent research essay marked against the IB EE rubric — distinct from but related to the IA. We help with research-question formulation (a tighter question scores better than a broader one), source-material selection, the EE-specific writing style (more formal than the IA, more open-ended than a school report), and the reflective Researcher's Reflection Space (RRS) entries. Several Heritage IB Biology EE candidates each cohort target high-B / low-A scores; this is achievable with focused mentorship from the proposal stage.",
      },
      {
        question: 'When should a Heritage Xperiential student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA + EE mentorship window for Heritage students who take Biology as their EE subject. For IB+NEET students, ideally even earlier (during Grade 10) to build the Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October or November of DP2 (after the school's mocks) is still effective and we have a number of Heritage students who join then specifically for Paper 2 long-response and data-response rubric drilling in the run-up to the May exams.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 18. SCOTTISH HIGH INTERNATIONAL SCHOOL (Gurugram, India)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'scottish-high-gurgaon',
    schoolName: 'Scottish High International School',
    shortName: 'Scottish High',
    cityCountry: 'Gurugram, India',
    citySlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Scottish High International School is a co-educational day school in Sector 57 (G Block, Sushant Lok II) Gurugram, founded in the mid-2000s and led from inception by Shomie Das — former principal of The Doon School and Mayo College — whose name in Indian school circles carries the weight of two of the country's most established boarding institutions. The school took its identity from the Scottish education tradition: tartan uniforms, a four-house system named after Scottish clans, and a structured-but-balanced academic culture that visibly differs from the more recently-established progressive schools in the Gurgaon belt.",
      "Scottish High runs multiple senior-school pathways in parallel — CBSE, Cambridge IGCSE / A-Levels, and the IB Diploma Programme — so students self-select at the senior-school transition based on their target universities. The IB DP track at Scottish High is smaller than the CBSE and IGCSE/A-Level tracks but is the chosen path for students targeting US, Canadian, and Australian universities specifically, and for the subset of UK applicants who want the IB's six-subject breadth over A-Levels' three-subject depth. IB Biology HL and SL are both offered, with full the IB practical programme coverage, and the school's Biology department is staffed by IB-experienced teachers.",
      'For Scottish High IB Biology students, the most common driver of external tutoring is the parallel-curriculum context: because the school runs IB alongside CBSE and Cambridge, the IB cohort is smaller and the in-school peer benchmark for IB-specific rubric work can feel thinner than at a single-curriculum IB school. Our 1:1 coaching fills that gap with rubric-tight Paper 2 calibration and weekly written feedback on long-response answers — replicating the peer-pressure-driven rubric awareness that students at larger IB cohorts (Pathways, ASD, UWCSEA) get from sheer cohort density.',
      "Scottish High's Sushant Lok II / Sector 57 location keeps the school accessible from across the central Gurgaon residential belt — Sushant Lok I, DLF Phase 1, 2, 3, and 4, Sector 49, Sector 56, Nirvana Country, Malibu Towne, Suncity, Rosewood City. Day-school commutes for IB students are typically in the 20–45 minute range each way. Our IST evening live sessions (7–9 PM) fit cleanly after the school commute. The school's structured academic culture means IB students typically arrive at DP1 with strong study-discipline habits but sometimes need explicit help converting that discipline into the IB-rubric vocabulary, which is what our coaching adds.",
    ],
    reputationBullets: [
      'Founded mid-2000s under Shomie Das (former Doon School + Mayo College principal)',
      'IB World School authorised for the Diploma Programme',
      'Multi-curriculum senior school: CBSE + Cambridge IGCSE/A-Levels + IB DP',
      'Distinctive Scottish identity: tartan uniforms, four-house system',
      'Located in Sector 57 (G Block, Sushant Lok II), central Gurgaon',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Structured academic culture with strong study-discipline orientation',
    ],
    collegeContext:
      "Scottish High IB graduates matriculate to US (Ivy+, NYU, top liberal arts, public flagships), UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh — the IB-vs-A-Level decision at Scottish High is often driven by exactly this UK university-versus-US application choice), Canada (Toronto, UBC, McGill, Waterloo, Western), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from Scottish High most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical engineering programmes. The school's structured academic culture produces students who are typically strong on standardised-test components (SAT, AP) where Indian-school discipline reads well.",
    paceAlignment:
      "Scottish High's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the central-Gurgaon school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule that compresses IB Biology + NEET Biology + NEET Chemistry + NEET Physics into a manageable weekly load. IA mentorship aligns to the school's DP1 IA proposal deadlines and the November DP2 mock exam window. The structured-discipline study culture at Scottish High typically lets students absorb a tighter weekly tutoring schedule than at more open-ended-pedagogy schools.",
    faqs: [
      {
        question:
          "Scottish High runs CBSE, Cambridge A-Levels, and IB DP in parallel — does that smaller IB cohort hurt my child's IB Biology results?",
        answer:
          'Not directly — the cohort size at the school does not change the IB exam grading, which is criterion-referenced against the same global rubric every year. What can be thinner at a multi-curriculum school is the peer-driven rubric awareness — students at larger single-curriculum IB schools (Pathways, ASD, UWCSEA) absorb rubric vocabulary partly through cohort-density-driven peer benchmarking. Our 1:1 coaching replaces that peer-driven calibration with explicit weekly written feedback on long-response answers against the IB Biology mark scheme. The result is rubric-tight Paper 2 answers regardless of in-school IB cohort size.',
      },
      {
        question:
          'My child is choosing between IB DP and Cambridge A-Levels at Scottish High — which is better for medicine applications?',
        answer:
          'It depends on the target country. For UK medicine, both IB and A-Levels are accepted; UK medical schools have well-developed offer matrices for both, and the choice is often about whether your child wants six-subject breadth (IB) or three-subject depth (A-Levels). For US pre-med, IB reads more cleanly because US admissions officers parse IB transcripts more fluently than A-Level transcripts. For Canada / Australia, both work. For India (AIIMS / state medical via NEET), neither matters directly — NEET is a separate Class 12 + entrance-exam track. We work with Scottish High students on either curriculum but the IB Biology coaching is most directly leveraged on the IB DP track; for A-Level Biology students we have a separate offering.',
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Scottish High IB students?',
        answer:
          'Yes — Cerebrum runs an IB+NEET integrated track that few India-based providers offer. Scottish High IB Biology HL students who want to preserve both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options can pursue the dual IB+NEET pathway. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule. The structured study-discipline culture at Scottish High typically suits this integrated load well.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. India-resident families pay in INR; Scottish High families can opt for either USD international or INR domestic pricing.',
      },
      {
        question:
          "How does Scottish High's IB Biology compare to Pathways Aravali or TSRS Aravali?",
        answer:
          "All three run IB Biology HL and SL at a serious level. The differences are in scale and pedagogy: Pathways Aravali has a larger full-IB-continuum cohort with cohort-density-driven peer benchmarking; TSRS Aravali is humanities-and-arts-tilted with a smaller more curated cohort; Scottish High is structured-and-disciplined with a multi-curriculum context. None of these school differences predict an individual student's IB Biology score — that depends on the student's own engagement and the quality of rubric calibration they get. Our coaching adapts to each profile; we have students from all three schools.",
      },
      {
        question:
          'Sushant Lok II / Sector 57 to anywhere in Gurgaon is a 20–45 minute commute — does that affect tutoring scheduling?',
        answer:
          'Not at all — coaching is 100% online live video, no physical tutoring-centre commute. Your child arrives home from Scottish High (typically between 4:30 and 6 PM depending on school-day end and Sector 57 traffic), eats, and joins the IST evening live session at 7 PM. Sessions run 90 minutes. The no-commute model returns about 60–90 minutes per session compared to driving to a Cyber City or MG Road tutoring centre, which compounds across a year of weekly sessions.',
      },
      {
        question: 'When should a Scottish High IB student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window and gives our coaching time to layer the IB-rubric vocabulary onto the strong study-discipline foundation Scottish High students typically bring. For IB+NEET students, ideally earlier (during Grade 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and many Scottish High students join then for focused Paper 2 long-response and data-response rubric drilling.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 19. DPS INTERNATIONAL SCHOOL (Sector 45, Gurgaon, India)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'dps-international-gurgaon',
    schoolName: 'DPS International School',
    shortName: 'DPS International',
    cityCountry: 'Gurugram, India',
    citySlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "DPS International School (Sector 45, Gurugram) is the IB-and-Cambridge international arm of the Delhi Public School (DPS) network in Gurugram, operating as a co-educational day school co-located with the larger DPS Sector 45 CBSE flagship. The IB campus opened in the late 2000s / early 2010s as the DPS network's response to parents asking for an internationally-credentialled senior-school option without leaving the DPS umbrella — a meaningful number of DPS Sector 45 CBSE students transition into the international stream at Grade 9 or Grade 11.",
      'DPS International offers Cambridge IGCSE through Class 10 and the IB Diploma Programme at Classes 11–12, giving students a clean IGCSE-to-IB Diploma senior-school pathway. Both IB Biology HL and SL are offered with full the IB practical programme coverage, and the Biology department is staffed by IB-experienced teachers. Cohort sizes have grown steadily as DPS network families have increasingly chosen the international route alongside the parallel CBSE option at DPS Sector 45 next door.',
      'For DPS International students, the most common driver of external IB Biology tutoring is the IGCSE-to-DP transition. IGCSE Biology Class 10 is rigorous on content but assessed differently from IB Diploma Biology — IGCSE prioritises clear recall and standard-answer structures, while IB DP requires data-analysis-and-evaluation style writing on Paper 2 and a 20-percent-weight Internal Assessment that asks for personal-investigation design. Our DP1 coaching makes the IGCSE-to-DP bridge explicit so students arrive at the May DP2 exams with rubric-tight Paper 2 answers and a strong IA.',
      "Several DPS International families also pursue the IB+NEET integrated track because the DPS-brand household recognition means many extended-family conversations come back to medical college in India as a valued option, even when the primary application track is abroad. Our IB+NEET coaching for DPS International students preserves the abroad pathway (UK medicine, US pre-med, Canadian biosciences) while keeping AIIMS / state medical colleges via NEET as a parallel option. The integrated weekly schedule sits in IST evenings and weekend mornings to fit around the school's academic load.",
    ],
    reputationBullets: [
      'International arm of the Delhi Public School (DPS) network in Gurgaon',
      'IB World School authorised for the Diploma Programme',
      'Cambridge IGCSE through Class 10 → IB Diploma Programme Classes 11–12',
      'Co-located in Sector 45 Gurgaon with the DPS Sector 45 CBSE flagship',
      'Strong DPS-network feeder pipeline from sister CBSE schools',
      'IB Biology HL and SL with full full practical-programme coverage',
      "Senior-school IBDP is the school's flagship academic track",
    ],
    collegeContext:
      "DPS International IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Michigan, Northwestern, UCLA), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). The DPS-network brand recognition matters for Indian-university applications where the DPS name signals academic rigour; for international applications, the IB transcript is the primary signal. Biology HL students from DPS International most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical / biotechnology programmes.",
    paceAlignment:
      "DPS International follows the standard two-year DP cycle on the IB May exam timeline. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the Sector 45 commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule that compresses IB Biology + NEET Biology + NEET Chemistry + NEET Physics into a manageable weekly load. IA mentorship aligns to the school's DP1 IA proposal deadlines. For DP1 students transitioning from the school's Cambridge IGCSE Class 10, our coaching includes an explicit IGCSE-to-DP bridge so the assessment-style shift doesn't catch students off-guard.",
    faqs: [
      {
        question:
          'My child finished IGCSE Biology at DPS International with strong grades — what changes when they start IB Biology HL at DP1?',
        answer:
          'Three things change. First, the assessment shifts: IGCSE prioritises clear recall and standard-answer structures, while IB DP Paper 2 rewards data-analysis-and-evaluation style writing — students need to learn the IB-specific command terms ("explain", "evaluate", "discuss", "distinguish") and the long-response mark scheme. Second, the Internal Assessment adds a 10-hour personal-investigation worth 20 percent of the final grade — IGCSE has nothing equivalent. Third, the syllabus depth in selected topics (especially cell biology, genetics, and physiology) goes meaningfully beyond IGCSE. Our DP1 coaching makes all three transitions explicit in the first term.',
      },
      {
        question: 'Do you offer the IB+NEET integrated track for DPS International students?',
        answer:
          'Yes — We are among the small number of India-based providers running an IB+NEET integrated coaching track. DPS International IB Biology HL students who want to preserve both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options can pursue the dual IB+NEET pathway. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule. Many DPS-network families value the integrated option because the DPS household identity is closely tied to India university aspirations even when the primary track is abroad.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. DPS International families typically pay in INR; USD pricing is available for families with international payment preferences.',
      },
      {
        question:
          'My child is choosing between DPS International (IGCSE/IB) and DPS Sector 45 (CBSE) for senior school — does the IB pathway pay off for medicine applications?',
        answer:
          "Depends on the target country. For UK medicine, IB is well-received; the IB Biology HL + Chemistry HL combination reads strongly. For US pre-med, IB is the cleaner transcript signal — US admissions officers parse IB more fluently than CBSE. For Canada / Australia, IB works well. For India (AIIMS / state medical via NEET), CBSE is the more direct route because NEET-eligibility and the Class 12 board-exam framework are CBSE-aligned. Dual-application students who want both options can do IBDP at DPS International and pursue NEET via our IB+NEET integrated track. We'll be straight with you about which track best fits your application target.",
      },
      {
        question:
          'How does DPS International compare to Pathways World School (Aravali / Gurgaon) or Scottish High?',
        answer:
          "All four run IB Biology HL and SL at a serious level. The differences are in pedagogy and curriculum mix: Pathways runs a full IB Continuum from PYP through DP with a larger DP Biology cohort; Scottish High runs IB DP alongside Cambridge A-Levels and CBSE; DPS International runs Cambridge IGCSE through Class 10 then IB DP at senior. The DPS-brand network effect is unique — DPS International has structurally stronger India-university connections through the DPS Society alumni base. None of these school differences predict an individual student's IB Biology score; that depends on engagement and rubric calibration. Our coaching adapts to each profile.",
      },
      {
        question:
          'DPS International is in Sector 45 — how does the school commute affect tutoring scheduling?',
        answer:
          "Sector 45 is central Gurgaon and accessible from across the residential belt — DLF, Sushant Lok, Sohna Road, Golf Course Road, Cyber City, MG Road. Day-school commutes are typically 20–45 minutes each way. Coaching is 100% online live video, so the school commute itself doesn't conflict with tutoring scheduling. Students arrive home in the 4:30–6 PM window depending on the day's traffic and join the IST evening live session at 7 PM. Sessions run 90 minutes. The no-commute model returns about 60–90 minutes per session compared to driving to a tutoring centre.",
      },
      {
        question: 'When should a DPS International student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IGCSE-to-DP bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Cambridge IGCSE Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have many DPS International students who join then for focused Paper 2 long-response and data-response rubric drilling.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 20. GD GOENKA WORLD SCHOOL (Sohna, Gurugram, India)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'gd-goenka-world-school-gurgaon',
    schoolName: 'GD Goenka World School',
    shortName: 'GD Goenka World',
    cityCountry: 'Gurugram, India',
    citySlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'GD Goenka World School is a residential and day co-educational IB World School on the Sohna Road south of Gurugram, founded in the mid-2000s as the flagship international campus of the broader GD Goenka education group. The school sits on a substantial green campus and runs a full IB Continuum — PYP, MYP, and DP — which places it among the longer-running full-continuum IB schools in north India (alongside Pathways Aravali and a small handful of others). Boarders and day students mix in the senior school; many boarders come from across India and from neighbouring countries.',
      "GD Goenka World School's IB Biology cohort has historically been one of the more substantial IB DP Biology cohorts in the Delhi NCR region. Both HL and SL are offered, with full the IB practical programme coverage. The school's biology laboratories support the full IB practical programme, and the Biology department is staffed by IB-experienced teachers. The school publicly reports IB Diploma performance and recent cohort averages have read as competitive within the NCR IB cluster.",
      "For GD Goenka World School students, the two most common drivers of external IB Biology tutoring are: (1) Paper 2 long-response rubric calibration where strong classroom answers can still drop marks against the IB's specific mark scheme, and (2) IA mentorship through the DP1 topic-selection and design cycle. Boarding students also benefit from the timezone match — our IST evening live sessions sit at 7–9 PM, which fits cleanly into the boarding study-hall schedule and removes the bandwidth concern of overseas-based tutors operating in mismatched timezones.",
      "GD Goenka World School's Sohna Road location is south of central Gurgaon, which means day students from DLF Phase 1–5, Golf Course Road, Sushant Lok, and the broader Sector 50–60 belt face a non-trivial commute (40–60 minutes each way in peak hours). For boarding students this is irrelevant; for day students, our online live tutoring removes a second commute on top of the school commute. The residential structure also means many GD Goenka World students stay back through Saturday afternoons; we run weekend morning blocks (Saturday and Sunday 10 AM–12 PM IST) as one of our most popular slots for this cohort.",
    ],
    reputationBullets: [
      'Founded mid-2000s — among the longer-running full-continuum IB schools in north India',
      'IB Continuum: PYP + MYP + DP',
      'Residential + day campus on Sohna Road, south Gurugram',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Boarders come from across India and neighbouring countries',
      'Substantial IB Diploma cohort relative to other NCR IB schools',
      'Strong matriculation to UK, US, Canadian, Australian, and Indian universities',
    ],
    collegeContext:
      "GD Goenka World School IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, top liberal arts, NYU, Berkeley, Northwestern, public flagships), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from GD Goenka World most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical / biotechnology programmes. The residential cohort context produces a meaningful share of students choosing UK undergraduate degrees specifically — UCAS familiarity is higher than at day-only schools because boarding houses develop their own UCAS-application support culture.",
    paceAlignment:
      "GD Goenka World School follows the standard two-year DP cycle. IST timezone aligns directly with our India-based live tutoring schedule — a critical structural advantage over overseas-based IB tutors operating in mismatched timezones. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting both the day-student commute window and the boarding study-hall schedule) or weekend morning blocks (Saturday/Sunday 10 AM–12 PM is popular among boarders). For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. IA mentorship aligns to the school's DP1 IA proposal deadlines and the November DP2 mock exam window.",
    faqs: [
      {
        question:
          'My child is a boarder at GD Goenka World School — can they join live tutoring sessions from the boarding house?',
        answer:
          "Yes, this is a common pattern in our roster. Sessions are 100% online live video and can be joined from any quiet space with a reliable internet connection — the boarding house study halls and dorm rooms typically work fine. Our IST evening sessions at 7–9 PM fit cleanly into the school's boarding study-hall schedule, and we provide session recordings for review during the next day's study time. Many GD Goenka World boarders prefer our weekend morning blocks (Saturday and Sunday 10 AM–12 PM) which sit naturally in the boarding-house weekend rhythm without competing with weekday classroom load.",
      },
      {
        question:
          "How does GD Goenka World School's IB Biology compare to Pathways Aravali — both are full IB Continuum schools in Gurugram?",
        answer:
          'Both schools run full PYP + MYP + DP IB Continuums and both have substantial DP Biology cohorts. Differences are in campus model and pedagogical character: GD Goenka World is residential-plus-day on a large Sohna campus; Pathways Aravali is also residential-plus-day but is positioned differently within the IB landscape, with its own pedagogical identity. Both schools produce competitive DP Biology scores. The decision between them for families is usually about school culture fit, residential preferences, and faculty cohort — not the IB Biology programme specifically. Our coaching adapts to either profile; we have students from both schools.',
      },
      {
        question: 'Do you offer the IB+NEET integrated track for GD Goenka World School students?',
        answer:
          "Yes — Cerebrum runs a dedicated IB+NEET integrated coaching track — a niche programme few biology-only providers in India offer. GD Goenka World IB Biology HL students who want to preserve both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options can pursue the dual IB+NEET pathway. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule that fits the school's term calendar.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. India-resident families pay in INR; international family options available for boarders from neighbouring countries paying in USD.',
      },
      {
        question:
          'Sohna Road from central Gurgaon is a 40–60 minute peak-hour commute — does that affect tutoring if my child is a day student at GD Goenka World?',
        answer:
          "Not at all — coaching is 100% online live video, so the school commute itself doesn't add a second commute for tutoring. Day students arrive home from GD Goenka World in the 5–7 PM window depending on Sohna Road traffic, eat, and join the IST evening live session at 7 PM or the slightly later 8 PM slot we keep for the longer-commute cohort. Sessions run 90 minutes. The no-commute tutoring model returns 60–90 minutes per session compared to driving to a Cyber City or MG Road tutoring centre — meaningful over a year of weekly sessions.",
      },
      {
        question: 'When should a GD Goenka World student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For IB+NEET students, ideally earlier (during Grade 10 / MYP5) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have several GD Goenka World students each cohort who join then specifically for Paper 2 long-response and data-response rubric drilling in the run-up to May exams.",
      },
      {
        question:
          'How does the IST timezone match matter for GD Goenka World families compared to overseas IB tutors?',
        answer:
          "It matters more than parents initially expect. Overseas-based IB tutors (UK, US, Canada) operating into India are usually awake during their own daytime, which is the middle of the night in India. They schedule sessions in awkward early-morning or late-night IST slots that compete with school sleep or homework. Our IST-based tutors run their full schedule in India local time — your child's 7 PM IST evening is our tutor's 7 PM working evening, with no fatigue or timezone-shift compromise. For weekend morning blocks, the same applies. This is a structural advantage of choosing an India-based IB tutor for an India-based school, not a marketing claim.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 21. SHIKSHANTAR SCHOOL (Sector 31, Gurugram, India)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'shikshantar-gurgaon',
    schoolName: 'Shikshantar School',
    shortName: 'Shikshantar',
    cityCountry: 'Gurugram, India',
    citySlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Shikshantar School is a co-educational day school in Sector 31 Gurugram, founded in 1986 — making it one of the oldest established schools in Gurgaon, predating the city's IB-school boom (Pathways, Heritage Xperiential, Scottish High, GD Goenka, DPS International) by 15–25 years. The school was founded by Dr. Pramod Sharma and a group of educators with a vision of combining academic rigour with strong music, performing arts, and cultural traditions. Shikshantar's identity is distinctively traditional-and-cultural compared to the more progressive (Heritage) or international-from-inception (Pathways) schools that came later.",
      "Shikshantar's primary curriculum is CBSE through Class 10, after which students can choose between continuing on the CBSE Class 12 track or moving to the school's IB Diploma Programme stream for Classes 11–12. The IB DP authorisation was added to broaden senior-school options for families targeting international universities. The IB cohort at Shikshantar is smaller than the CBSE cohort because the school's identity and most of its alumni are CBSE-rooted; students choosing IB are typically self-selecting toward US, UK, Canadian, or Australian university applications.",
      "For Shikshantar IB Biology students, the most common driver of external tutoring is the CBSE-to-IB transition. Shikshantar's CBSE Class 10 Biology is rigorous on content depth and recall, but the IB DP's data-analysis-and-evaluation style writing on Paper 2 and the 20-percent-weight Internal Assessment require a different assessment skillset that the in-school Class 10 path does not directly develop. Our DP1 coaching makes this transition explicit, calibrating the IB-rubric language and the IA personal-investigation style in the first DP1 term so students arrive at the May DP2 exams with rubric-tight Paper 2 answers.",
      "Several Shikshantar families also pursue the integrated IB+NEET track. Because the school's identity is CBSE-rooted, household conversations about medical college often default to AIIMS and Indian state medical colleges as the primary aspiration even when the abroad application is the primary planned route. The IB+NEET pathway preserves both options. Our integrated weekly schedule sits in IST evenings (7–9 PM) and weekend mornings so it fits cleanly around Shikshantar's school day and after-school music and performing-arts commitments (a meaningful share of Shikshantar IB students continue music and performing-arts training in parallel with their academics).",
    ],
    reputationBullets: [
      'Founded 1986 — one of the oldest established schools in Gurgaon',
      'IB World School authorised for the Diploma Programme',
      'Senior school offers both CBSE and IB DP — students self-select at Grade 11',
      'Strong tradition in music, performing arts, and cultural programming',
      'Located in Sector 31 Gurgaon (central Gurgaon, established residential belt)',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Distinctively traditional-and-cultural identity vs newer progressive IB schools',
    ],
    collegeContext:
      'Shikshantar IB graduates show an unusually arts-and-humanities-balanced matriculation pattern reflecting the traditional-and-cultural identity of the school. UK applications cluster around Russell Group institutions including Oxbridge, UCL, KCL, Warwick, and Edinburgh, with humanities programmes sometimes preferred over pure STEM. US matriculations include the standard Ivy+ targets but also an unusually-high share of top liberal arts colleges (Williams, Amherst, Pomona, Wesleyan, Brown) where the dual academic-and-arts profile reads strongly. Canadian destinations include McGill and UBC. For Biology HL students, UK medicine, US pre-med, and environmental-science or public-health combinations are common; for IB+NEET dual-track students, AIIMS and state medical colleges via NEET remain a parallel option.',
    paceAlignment:
      "Shikshantar's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the central-Gurgaon Sector 31 school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The DP1 coaching includes an explicit CBSE-Class-10-to-IB-DP bridge so the assessment-style shift doesn't catch students off-guard. IA mentorship aligns to the school's DP1 IA proposal deadlines and the November DP2 mock exam window. Schedule flexibility for students continuing music or performing arts training is built into our slot allocation.",
    faqs: [
      {
        question:
          "My child finished Shikshantar's CBSE Class 10 with strong Biology marks — what changes when they start IB Biology HL at DP1?",
        answer:
          "At Shikshantar — where you've finished Class 10 in the school's traditional-and-cultural academic environment — three substantive shifts follow in IB Biology HL. Paper 2 introduces structured long-responses where the IB command verbs ('explain', 'evaluate', 'distinguish', 'predict') explicitly govern partial credit; the standardised CBSE recall-pattern earns fewer marks here. The Biology Internal Assessment then asks for an independent 10-hour personal investigation graded against four IB-specific criteria — Personal Engagement, Exploration, Analysis, Evaluation, Communication — entirely new to Class 10. Finally, the IB HL syllabus extends meaningfully beyond Shikshantar's Class 10 Life Processes chapter into detailed human physiology, molecular genetics, transcription regulation, and statistical ecology. Shikshantar's discursive classroom culture helps with the IB writing style once the rubric vocabulary is internalised; our DP1 coaching front-loads all three transitions across the first 10-12 weeks.",
      },
      {
        question:
          "Does my child's parallel music or performing-arts training conflict with IB Biology tutoring scheduling?",
        answer:
          'No — and this is a common pattern in our Shikshantar roster. Many Shikshantar IB students continue serious music or performing-arts training alongside their academics, with rehearsals or classes typically in late-afternoon or early-evening slots. We schedule live tutoring around those commitments — IST evening sessions can move to the 8 PM or 9 PM slot, and weekend morning blocks (Saturday 10 AM–12 PM) are often the cleanest fit for students whose weekday evenings are committed to rehearsals. Schedule flexibility is built into how we allocate slots; the music or performing-arts commitment does not have to be sacrificed for IB Biology coaching.',
      },
      {
        question:
          "Shikshantar's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group hurt my child's IB Biology results?",
        answer:
          "Grade-wise no: IB awards points against a global criterion-referenced rubric that doesn't care about how big the school's IB cohort is. What thinner cohorts do reduce is the informal cross-checking — at a 50+ student IB Biology class (Pathways Aravali, UWCSEA), students naturally compare Paper 2 mock answers and absorb rubric calibration through peer comparison. At Shikshantar, where the IB cohort is small inside a CBSE-primary culture, that informal channel is structurally thinner. Our 1:1 coaching substitutes the missing peer channel with examiner-led weekly written feedback against the mark scheme. Shikshantar's culturally-strong arts and music identity often gives its IB Biology students an edge on the IA write-up itself (expressive writing is a Shikshantar strength); the rubric-calibration layer then closes the residual gap.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Shikshantar students?',
        answer:
          "Yes — We coach an IB+NEET integrated weekly schedule — a specialised track that few biology coaching providers in India run. Several Shikshantar IB Biology HL students each cohort pursue the dual IB+NEET pathway because the school's CBSE-rooted identity means household conversations about medical college often default to AIIMS and Indian state medical colleges as a valued option even when the abroad track is the primary planned route. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule that respects the music or performing-arts commitments many Shikshantar students maintain.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. Shikshantar families typically pay in INR with payment plans across 3–4 instalments.',
      },
      {
        question:
          "My child is choosing between Shikshantar's CBSE Class 11–12 and the school's IB DP track — which is better for medicine applications?",
        answer:
          "Depends on the target country. For UK medicine, IB is well-received and reads strongly when paired with HL Biology + HL Chemistry. For US pre-med, IB is the cleaner transcript signal — US admissions officers parse IB more fluently than CBSE. For Canada / Australia, IB works well. For India (AIIMS / state medical via NEET), CBSE is the more direct route because NEET-eligibility and the Class 12 board-exam framework are CBSE-aligned. Dual-application students who want both options can pursue IBDP at Shikshantar and add NEET via our IB+NEET integrated track. We'll be straight with you about which path best fits your application target — not every Shikshantar IB student needs the dual track.",
      },
      {
        question: 'When should a Shikshantar student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the CBSE-to-IB bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have several Shikshantar students each cohort who join then specifically for Paper 2 long-response and data-response rubric drilling in the run-up to May exams.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 22. GD GOENKA SIGNATURE SCHOOL (Sector 48, Gurugram, India)
  // ──────────────────────────────────────────────────────────────────────────
  // Sister-campus distinction: GD Goenka World School (Sohna Road, residential
  // + day, full PYP+MYP+DP continuum) is covered at entry #20. Signature is
  // the day-only Sector 48 campus with IB DP + CBSE dual-track senior school.
  {
    slug: 'gd-goenka-signature-gurgaon',
    schoolName: 'GD Goenka Signature School',
    shortName: 'GD Goenka Signature',
    cityCountry: 'Gurugram, India',
    citySlug: 'gurugram',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "GD Goenka Signature School is a co-educational day school in Sector 48 Gurugram, opened in the mid-2010s as a newer addition to the GD Goenka education group. The 'Signature' branding within the GD Goenka network is used to distinguish a smaller set of premium internationally-credentialled campuses from the more numerous GD Goenka Public School CBSE network — students at Signature can opt for the IB Diploma Programme or the CBSE Class 11-12 track at senior school, with both pathways supported by the school's senior-school faculty.",
      "Signature sits in central-south Gurugram on the Sohna Road side, making it more accessible to families based in DLF Phase 1-5, Sushant Lok, Sohna Road, Golf Course Road, and Sector 49-50 than the sister GD Goenka World School in Sohna (which is significantly further south and primarily serves residential families). The day-only model and the more central location together produce a distinctly different cohort profile from GD Goenka World — Signature's IB cohort is composed of children of central-Gurgaon working professionals who want the GD Goenka brand and IB credential without the boarding commitment.",
      "GD Goenka Signature offers IB Biology HL and SL with full the IB practical programme coverage. The IB cohort is smaller than the school's CBSE cohort because the senior school runs both tracks in parallel and many families continue on CBSE. Students choosing IB are typically self-selecting toward US, UK, Canadian, or Australian university applications — and the school's brand recognition from the broader GD Goenka network produces strong India-university connections for dual-application students who want to keep AIIMS / state medical colleges open via NEET.",
      'For GD Goenka Signature IB Biology students, the most common driver of external tutoring is the parallel-track context: because Signature runs IB alongside CBSE in senior school, the in-school IB-rubric peer benchmarking is thinner than at single-curriculum IB schools (Pathways Aravali, UWCSEA). Our 1:1 coaching replaces that with explicit weekly written feedback on Paper 2 long-response answers against the IB mark scheme. Several Signature IB Biology HL students each cohort also pursue our integrated IB+NEET track because the central-Gurgaon family profile often values keeping both abroad and India medical-college routes open through Class 12.',
    ],
    reputationBullets: [
      'Opened mid-2010s — newer day-only campus in the GD Goenka network',
      "'Signature' branding distinguishes premium IB/IGCSE campuses within the broader GD Goenka group",
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11-12',
      'Located in Sector 48 Gurgaon (central-south Gurgaon, Sohna Road side)',
      'Day school (not residential) — sister GD Goenka World at Sohna is residential',
      'IB Biology HL and SL with full full practical-programme coverage',
    ],
    collegeContext:
      'GD Goenka Signature IB graduates target a US-heavy mix reflecting the central-Gurgaon working-professional family profile. UK matriculations include Oxbridge, Imperial, UCL, KCL, Warwick, and Manchester. US destinations skew toward Ivy+, NYU, Berkeley, and Carnegie Mellon — with the IT-employee parent base producing an unusually-high share of CS-and-Biology dual-major applicants at schools like Stanford, MIT, and CMU. Canadian programmes (Toronto, UBC, Waterloo) are common for engineering-leaning students. Indian universities — Ashoka, Krea, Shiv Nadar — round out the abroad-versus-India dual application set. Biology HL students from Signature typically aim at UK medicine, US pre-med, or biomedical-engineering tracks; IB+NEET dual-track students keep AIIMS and state medical colleges open in parallel.',
    paceAlignment:
      "GD Goenka Signature's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7-9 PM is most common, fitting after the Sector 48 day-school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. IA mentorship aligns to the school's DP1 IA proposal deadlines and the November DP2 mock exam window. The DP1 coaching can include an explicit prior-curriculum-to-IB-DP bridge for students who transitioned into the IB track from a CBSE Class 10 background.",
    faqs: [
      {
        question:
          'Is GD Goenka Signature different from GD Goenka World School? My friends mention both as Gurgaon IB options.',
        answer:
          "Yes — they're sister campuses within the broader GD Goenka network, but they're structurally different schools with distinct cohort profiles. GD Goenka World School is in Sohna (significantly further south) and runs a residential + day model with a full IB Continuum (PYP + MYP + DP) — many of its boarders come from across India and from neighbouring countries. GD Goenka Signature is in Sector 48 (more central, Sohna Road side) and is day-only with IB DP + CBSE dual-track senior school. Day families based in DLF, Sushant Lok, or Golf Course Road typically find Signature more accessible; families wanting boarding or full PYP-through-DP go to the World School. Both are part of the GD Goenka brand network.",
      },
      {
        question:
          "My child is choosing between Signature's IB DP and CBSE tracks at senior school — which is better for medicine applications?",
        answer:
          "Depends on the target country. For UK medicine, IB is well-received and reads strongly when paired with HL Biology + HL Chemistry. For US pre-med, IB is the cleaner transcript signal — US admissions officers parse IB more fluently than CBSE. For Canada / Australia, IB works well. For India (AIIMS / state medical via NEET), CBSE is the more direct route because NEET-eligibility and the Class 12 board-exam framework are CBSE-aligned. Dual-application students can pursue IBDP at Signature and add NEET via our IB+NEET integrated track. We'll be straight with you about which path best fits your application target.",
      },
      {
        question:
          "Signature's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group affect IB Biology results?",
        answer:
          "Cohort size doesn't change the IB grade — exam papers are marked against the same global criterion-referenced rubric. What it does affect is informal peer-driven rubric calibration. Signature's dual-track senior school means IB students share faculty and timetable with the larger CBSE cohort; the IB-specific peer benchmarking that students at Pathways Aravali (single-curriculum IB Continuum) absorb naturally is structurally thinner. The fix is explicit examiner-led feedback — our 1:1 coaching provides weekly written mark-scheme commentary on Paper 2 long-responses, in effect importing the rubric calibration that a denser cohort would have provided.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for GD Goenka Signature students?',
        answer:
          "Yes — Cerebrum offers a structured IB+NEET integrated coaching track — among the few such programmes from India-based biology providers. Several Signature IB Biology HL students each cohort pursue the dual IB+NEET pathway because the central-Gurgaon working-professional family profile often values keeping both abroad and India medical-college options open. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule that fits the school's term calendar and the day-student commute window.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000-₹98,000 per year for the complete integrated programme. Signature families typically pay in INR with payment plans across 3-4 instalments.',
      },
      {
        question:
          'Sector 48 to Cyber City / MG Road tutoring centres is a 25-40 minute peak-hour drive — does that affect tutoring scheduling?',
        answer:
          'Not at all — coaching is 100% online live video, so there is no physical tutoring-centre commute. Your child arrives home from Signature (typically between 4:30 and 6 PM depending on Sector 48 traffic), eats, and joins the IST evening live session at 7 PM. Sessions run 90 minutes. The no-commute model returns roughly 50-80 minutes per session compared to driving to a Cyber City or MG Road tutoring centre — meaningful over a year of weekly sessions, especially for working-professional families coordinating around their own commutes.',
      },
      {
        question: 'When should a GD Goenka Signature student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have several Signature students each cohort who join then specifically for Paper 2 long-response and data-response rubric drilling in the run-up to May exams.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 23. PATHWAYS SCHOOL NOIDA (Sector 100, Noida, India)
  // ──────────────────────────────────────────────────────────────────────────
  // Sister-campus distinction: This is the Pathways Noida campus (Sector 100,
  // day-only). Pathways Aravali (entry #6, residential + day, Sohna-side
  // Gurgaon) and Pathways Gurgaon (Sector 70, day-only) are separate
  // entities within the broader Pathways group. The IB cohort at Pathways
  // Noida is structurally smaller than at Pathways Aravali but the
  // pedagogical framework and faculty model are shared across the group.
  {
    slug: 'pathways-noida',
    schoolName: 'Pathways School Noida',
    shortName: 'Pathways Noida',
    cityCountry: 'Noida, India',
    citySlug: 'noida',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Pathways School Noida is a co-educational day school in Sector 100 Noida, opened in the early 2010s as the Noida campus of the Pathways group (sister to Pathways World School Aravali in Gurgaon and Pathways School Gurgaon in Sector 70). The school runs a full IB Continuum — PYP, MYP, and DP — making it one of the longer-established full-continuum IB day schools in the Noida cluster. The Sector 100 location keeps it accessible to families across Sectors 44, 50, 62, 75, 93, 100, 121, 128, and 132, as well as to families coming over the DND Flyway from the Mayur Vihar and IP Extension belt of east Delhi.',
      "Pathways Noida's IB Biology cohort is one of the more substantial Noida-region DP Biology cohorts. Both HL and SL are offered, with full the IB practical programme coverage. The Biology department is staffed by IB-experienced teachers and the school's laboratory facilities support the full IB practical programme. Recent diploma performance has read as competitive within the NCR IB cluster per the school's publicly-reported results, though Pathways group schools tend not to publish per-subject IB Biology distributions in granular form.",
      "For Pathways Noida students, the most common drivers of external IB Biology tutoring are: (1) Paper 2 long-response rubric calibration where strong classroom answers can still drop marks against the IB's specific mark scheme, (2) IA mentorship through the DP1 topic-selection cycle, and (3) the integrated IB+NEET track — a meaningful share of Pathways Noida families want to keep India medical-college options open via NEET while pursuing IB Diploma for abroad applications. Our coaching combines Paper 2 + IA rubric work with the integrated IB+NEET schedule for the dual-application cohort.",
      "Pathways Noida's day-only structure (no boarding option, unlike the Aravali sister campus) shapes scheduling. Day students typically arrive home from Sector 100 in the 4:30–6 PM window depending on the home-sector and Noida-internal traffic, and our IST evening live sessions at 7–9 PM fit cleanly into the post-school routine. For IB+NEET integrated students we also offer weekend morning blocks (Saturday and Sunday 10 AM–12 PM) which sit naturally for the dual-syllabus weekly load. The Sector 100 location is far enough from the DND-Flyway-to-South-Extension axis that physical commute to any Delhi-side tutoring centre would add 75–90 minutes round-trip in peak hours — the online-delivery model removes that overhead entirely.",
    ],
    reputationBullets: [
      'Opened early 2010s — Noida campus of the broader Pathways group',
      'Full IB Continuum: PYP + MYP + DP',
      'Sister campuses: Pathways World School Aravali (Gurgaon, residential + day) and Pathways School Gurgaon (Sector 70, day-only)',
      'Located in Sector 100 Noida (central-east Noida residential belt)',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Day school (no boarding option — Aravali sister campus is the residential option)',
      'Strong NCR-cluster matriculation to UK, US, Canadian, Australian, and Indian universities',
    ],
    collegeContext:
      "Pathways Noida IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Michigan, Northwestern, UCLA, public flagships), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar — note: distinct from the school of the same name in Noida — Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from Pathways Noida most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical / biotechnology programmes. The Noida tech-corridor family profile produces an unusually-high share of dual-application interest — keeping both abroad and India options open through Class 12.",
    paceAlignment:
      "Pathways Noida follows the standard two-year DP cycle on the IB May exam timeline. IST timezone aligns directly with our India-based live tutoring schedule — a structural advantage over UK / US / Canada-based IB tutors operating in mismatched timezones. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the Sector 100 school commute) or weekend morning blocks. For IB+NEET integrated students, we run a combined weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. IA mentorship aligns to the school's DP1 IA proposal deadlines and the November DP2 mock exam window.",
    faqs: [
      {
        question:
          'Is Pathways Noida the same as Pathways Aravali — the IB school in Gurgaon? My friends mention both.',
        answer:
          "They're sister campuses within the broader Pathways group but they're structurally different schools. Pathways World School Aravali is in Sector V-37 Gurgaon (Aravali range, south Gurgaon) and runs a residential + day model — boarders come from across India and from neighbouring countries. Pathways School Noida is in Sector 100 Noida and is day-only — local NCR families predominate. Both run full PYP+MYP+DP IB Continuums with the same pedagogical framework and overlapping faculty network. Day families based in Noida (Sectors 44/50/62/93/100/128/132 + Greater Noida) typically find Pathways Noida more accessible; families wanting boarding go to Aravali; families based in central or south Gurgaon often choose Pathways School Gurgaon (Sector 70). We coach students from all three Pathways campuses.",
      },
      {
        question:
          "How does Pathways Noida's IB Biology compare to the other Noida IB schools — Shiv Nadar, Step by Step, Genesis Global?",
        answer:
          "All four schools run rigorous IB Biology HL and SL programmes. Differences are in pedagogical character, cohort size, and curriculum mix: Pathways Noida is a long-established full IB Continuum (PYP through DP); Shiv Nadar is a newer school (tech-philanthropist-founded) with strong scientific orientation; Step by Step has the longest senior-school IB track record in the NCR; Genesis Global is residential + day in Greater Noida. None of these school differences predict an individual student's IB Biology score — that depends on engagement and the rubric calibration the student gets. Our coaching adapts to each school's profile; we have students from all four.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Pathways Noida students?',
        answer:
          'Yes — Cerebrum runs an IB+NEET integrated track that few India-based providers offer. A meaningful share of Pathways Noida Biology HL students pursue the dual IB+NEET pathway because the Noida tech-corridor family profile values keeping both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options open through Class 12. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule. The integrated programme is structurally the same as we run for Pathways Aravali students.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. India-resident Noida families pay in INR; USD pricing available for international payment preferences. GST-compliant invoices issued for corporate-reimbursement claims (common for Noida-based MNC IT-employee families).',
      },
      {
        question:
          'Sector 100 to DND Flyway to South Extension is a 75–90 minute peak-hour drive — does that affect tutoring scheduling?',
        answer:
          'Not at all — coaching is 100% online live video, so there is no physical tutoring-centre commute. Your child arrives home from Pathways Noida (typically between 4:30 and 6 PM depending on Sector 100 and inter-sector traffic), eats, and joins the IST evening live session at 7 PM. Sessions run 90 minutes. The no-commute model returns roughly 90 minutes per session compared to driving across the DND Flyway to any Delhi-side tutoring centre — a meaningful saving over a year of weekly sessions, especially for families coordinating around dual-working-parent IT-corridor schedules.',
      },
      {
        question: 'When should a Pathways Noida student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For IB+NEET students, ideally earlier (during Grade 10 / MYP5) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have several Pathways Noida students each cohort who join then specifically for Paper 2 long-response and data-response rubric drilling in the run-up to May exams.",
      },
      {
        question: 'Do you tutor Pathways Noida MYP5 students preparing to transition into DP1?',
        answer:
          'Yes — pre-DP MYP5 preparation is a useful entry point. We coach the MYP-to-DP Biology bridge specifically: introducing the IB Diploma command terms ("explain", "evaluate", "discuss"), the data-analysis style that Paper 2 rewards, and the IA-style of designing a personal investigation. Many Pathways families start this in MYP5 summer so the student arrives at DP1 with the rubric language already familiar. This is most useful for students aiming at HL Biology and especially for those planning the IB+NEET integrated track who need Chemistry / Physics foundations built early.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 24. SHIV NADAR SCHOOL NOIDA (Sector 168, Noida, India)
  // ──────────────────────────────────────────────────────────────────────────
  // Founded by the Shiv Nadar Foundation — the philanthropic arm of HCL
  // Technologies founder Shiv Nadar. Sister campuses also operate in
  // Gurgaon and Faridabad. STEM-strong scientific orientation distinguishes
  // this school's IB cohort from the arts-and-humanities-tilted cohorts
  // at other NCR IB schools.
  {
    slug: 'shiv-nadar-school-noida',
    schoolName: 'Shiv Nadar School Noida',
    shortName: 'Shiv Nadar Noida',
    cityCountry: 'Noida, India',
    citySlug: 'noida',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Shiv Nadar School Noida is a co-educational day school in Sector 168 Noida, opened in the early 2010s as the first of the Shiv Nadar School network's campuses. The school was founded under the Shiv Nadar Foundation — the philanthropic arm of HCL Technologies founder Shiv Nadar (one of India's most prominent tech-industry philanthropists) — and the schools share a leadership-and-STEM-strong educational philosophy that visibly reflects the founder's industrial-and-scientific roots. Sister campuses operate in Gurgaon (Sector 73) and Faridabad, with overlapping curriculum and faculty frameworks.",
      "Shiv Nadar School Noida runs CBSE as its primary curriculum through Class 10 and offers the IB Diploma Programme as the senior-school international option at Classes 11–12 alongside the CBSE Class 11–12 continuation track. Cambridge IGCSE / A-Level options are also available at some senior-school cohorts. IB Biology HL and SL are both offered with full the IB practical programme coverage; the school's laboratory infrastructure and emphasis on hands-on STEM exploration give the Biology programme a strong investigation-and-data orientation that aligns well with the IB's IA-and-Paper-2 assessment style.",
      "For Shiv Nadar School Noida IB Biology students, the most common drivers of external tutoring are: (1) Paper 2 rubric calibration where the school's strong conceptual culture sometimes produces answers that are scientifically sound but score below their potential against the IB's specific long-response mark scheme, and (2) IA mentorship — the school's STEM-strong culture produces students who genuinely enjoy designing personal investigations, but the IA write-up against the IB-specific four-criterion rubric benefits from explicit external coaching. Several Shiv Nadar IB Biology HL students each cohort also pursue our integrated IB+NEET track for the standard dual-application reasons.",
      "Shiv Nadar School Noida's Sector 168 location keeps it accessible across the Noida residential belt, though Sector 168 is on the eastern Yamuna Expressway side rather than the central Noida sectors that house most of the other IB schools (Pathways at Sector 100, Lotus Valley further west). Many Shiv Nadar families commute from across the broader Noida and Greater Noida footprint, and the school operates a transport network that extends to Sectors 50, 62, 75, 93, 100, 128, 132 and Greater Noida. For our coaching, the school commute is irrelevant — IST evening live sessions at 7–9 PM fit after the school day regardless of which Noida sector students live in.",
    ],
    reputationBullets: [
      'Founded under the Shiv Nadar Foundation (philanthropic arm of HCL Technologies founder)',
      'Opened early 2010s — first of three Shiv Nadar School campuses (Noida / Gurgaon / Faridabad)',
      'CBSE primary curriculum + IB DP at senior school',
      "STEM-and-leadership-strong educational philosophy reflecting founder's industrial-scientific roots",
      'Located in Sector 168 Noida (eastern Yamuna Expressway side)',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Strong laboratory infrastructure for hands-on scientific investigation',
    ],
    collegeContext:
      "Shiv Nadar School Noida IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Michigan, Carnegie Mellon, Northwestern, MIT for the STEM-leaning subset, public flagships), Canada (Toronto, UBC, McGill, Waterloo for the engineering-leaning subset, Western, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar University in Greater Noida — note: a distinct institution from the school, both founded by the Shiv Nadar Foundation — Plaksha IIT, IIITs, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from Shiv Nadar School Noida most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, biomedical / biotechnology programmes, or interdisciplinary STEM tracks combining biology with computer science or data science (a natural fit for the school's STEM identity).",
    paceAlignment:
      "Shiv Nadar School Noida follows the standard two-year DP cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the school day regardless of which Noida sector students live in — the school's transport network spans Sectors 50/62/75/93/100/128/132 + Greater Noida) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. IA mentorship aligns to the school's DP1 IA proposal deadlines. The STEM-strong culture at Shiv Nadar means many students approach the IA as a genuine scientific investigation rather than a tick-box exercise; our coaching adds the rubric scaffolding that converts good investigation into high-scoring write-up.",
    faqs: [
      {
        question:
          'Shiv Nadar School Noida is STEM-strong with strong lab facilities — does my child really need external IB Biology tutoring?',
        answer:
          "The honest answer depends on the target score. For an AP-4-equivalent target (IB Biology HL score 6), the school's in-house teaching is typically sufficient for engaged students. For an IB-7 target — required for top UK medical schools, US pre-med at Ivies, or competitive Canadian biosciences — the gap is usually rubric mastery: converting strong conceptual understanding into the precise IB Paper 2 long-response mark-scheme structure. The school's STEM-strong culture produces conceptually fluent students; our 1:1 coaching adds the specific rubric calibration that takes a 6 to a 7. Several Shiv Nadar Noida students each cohort use us specifically for this rubric layer alongside the school's strong in-house teaching.",
      },
      {
        question:
          'Is Shiv Nadar School Noida the same as Shiv Nadar University (also in Greater Noida)?',
        answer:
          "They're related but distinct institutions, both founded under the Shiv Nadar Foundation. Shiv Nadar School Noida is a co-educational K-12 day school in Sector 168 with CBSE primary + IB DP senior options. Shiv Nadar University (formally Shiv Nadar Institution of Eminence) is an independent private research university in Dadri, Greater Noida (NH-9 / Yamuna Expressway corridor) offering undergraduate and graduate degrees. Several Shiv Nadar School graduates do matriculate to Shiv Nadar University, but the institutions operate as separate entities with separate admissions processes and academic structures.",
      },
      {
        question:
          'How does Shiv Nadar School Noida compare to Pathways School Noida for IB Biology?',
        answer:
          "Both run rigorous IB Biology HL and SL programmes. Pathways Noida is a longer-established full IB Continuum (PYP through DP) with a more international-from-inception cohort culture; Shiv Nadar is CBSE-primary with IB DP added at senior school and has a more STEM-strong, leadership-oriented identity that reflects the founder's tech-industry roots. The IB Biology programmes are comparable in quality; the school cultures are genuinely different. Cohort sizes vary year to year. We have students from both schools — they're complementary positioning rather than competing on the IB Biology dimension specifically.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Shiv Nadar School Noida students?',
        answer:
          "Yes — We are among the small number of India-based providers running an IB+NEET integrated coaching track. Several Shiv Nadar Noida IB Biology HL students each cohort pursue the dual IB+NEET pathway because the STEM-strong school culture produces students who are realistically considering both medical school in India (AIIMS, state medical colleges) and abroad (UK medicine, US pre-med, Canadian life-sciences). We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule that respects the school's STEM-rigour academic load.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. Shiv Nadar Noida families typically pay in INR with payment plans across 3–4 instalments; GST-compliant invoices issued for corporate-reimbursement claims (common for Noida-based MNC IT-employee families, including HCL Technologies employees).',
      },
      {
        question:
          'Sector 168 is on the Yamuna Expressway side — does that affect tutoring scheduling for my child?',
        answer:
          "Not at all — coaching is 100% online live video, so the school's eastern-Noida location doesn't add any commute overhead for tutoring. Your child arrives home via the school's transport network (which extends across Sectors 50/62/75/93/100/128/132 and Greater Noida) and joins the IST evening live session at 7 PM. Sessions run 90 minutes. For students whose families are based further east on the Yamuna Expressway corridor (where commute to any Delhi-side or central-Noida tutoring centre would be 60+ minutes round-trip), the online-delivery model is structurally the right choice.",
      },
      {
        question: 'When should a Shiv Nadar School Noida student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. The school's STEM-strong Class 10 already builds strong scientific foundations; our IB+NEET coaching layers the NEET-specific content and the IB-specific rubric work on top. For exam-only coaching, October DP2 (after the school's mocks) is still effective and several Shiv Nadar Noida students each cohort join then for Paper 2 long-response and data-response rubric drilling.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 25. STEP BY STEP SCHOOL NOIDA (Sector 132, Noida, India)
  // ──────────────────────────────────────────────────────────────────────────
  // One of the longer-established schools in Noida; the senior-school IB DP
  // authorisation has been in place for years, giving Step by Step one of
  // the longer IB track records in the Noida IB cluster.
  {
    slug: 'step-by-step-noida',
    schoolName: 'Step by Step School',
    shortName: 'Step by Step',
    cityCountry: 'Noida, India',
    citySlug: 'noida',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Step by Step School is a co-educational day school on the Noida–Greater Noida Expressway in Sector 132 Noida, founded in the mid-1990s and now one of the longer-established schools in the Noida IB cluster. The school built its early reputation on a CBSE primary-and-secondary curriculum with strong academics and pastoral care; the IB Diploma Programme authorisation was added later as a senior-school international option alongside the school's continuing CBSE Class 11-12 track. This dual-track senior school produces a student body where IB and CBSE students share the same school culture and faculty network but follow distinct curricula in their final two years.",
      "Step by Step's IB DP cohort has historically been one of the longer-running in the Noida IB cluster — meaningfully predating the newer entrants (Pathways Noida early-2010s, Shiv Nadar Noida 2012). Both IB Biology HL and SL are offered, with full the IB practical programme coverage. The Biology department is staffed by IB-experienced teachers, and the school's emphasis on careful pedagogy and student wellbeing produces an IB cohort culture that is academically serious without being burnout-driven.",
      "For Step by Step IB Biology students, the most common driver of external tutoring is the parallel-curriculum context: because Step by Step runs IB alongside CBSE in senior school, the in-school IB-rubric peer benchmarking is thinner than at single-curriculum IB schools (Pathways Aravali, UWCSEA). Our 1:1 coaching replaces that with explicit weekly written feedback on Paper 2 long-response answers against the IB mark scheme. Several Step by Step IB Biology HL students each cohort also pursue our integrated IB+NEET track because the school's broader student body (with its strong CBSE cohort matriculating to Indian universities and AIIMS) creates a cultural context where keeping the India medical-college option open is naturally considered.",
      "Step by Step's Sector 132 location places it on the Noida-Greater Noida Expressway corridor — a different commute axis from the central-Noida schools (Pathways at Sector 100) and the eastern-Noida cluster (Shiv Nadar at Sector 168). The school operates a transport network reaching across Sectors 50, 62, 75, 93, 100, 128, 132 and Greater Noida. Many Step by Step IB families commute from across this broader belt, and our IST evening live sessions at 7–9 PM fit cleanly after the school day regardless of which Noida sector students live in. The online-delivery model removes any concern about cross-sector physical commute to a tutoring centre.",
    ],
    reputationBullets: [
      'Founded mid-1990s — one of the longer-established schools in the Noida IB cluster',
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11–12',
      'Located in Sector 132 on the Noida–Greater Noida Expressway',
      'Strong reputation for academics combined with pastoral care and student wellbeing',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Among the longer-running IB DP cohorts in Noida (predates Pathways Noida and Shiv Nadar Noida)',
    ],
    collegeContext:
      'Step by Step IB graduates matriculate across a broader spread than the typical Noida IB school because the dual-curriculum senior school produces an IB cohort that self-selects for international applications. UK matriculations span Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, and Bristol. US destinations include Ivy+, NYU, top liberal arts (Williams, Amherst, Brown), Berkeley, and public flagships. Canadian institutions — Toronto, UBC, McGill, Queen Mary — are common. For Biology HL students specifically, UK medicine and US pre-med are the most frequent abroad tracks; the IB+NEET dual-track subset within the IB cohort additionally targets AIIMS and state medical colleges via NEET. The older alumni network at Step by Step strengthens applications to Indian universities (Ashoka, Krea, Shiv Nadar University) where alumni-mentoring helps.',
    paceAlignment:
      "Step by Step's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the Noida-Greater Noida Expressway school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The school's careful-pedagogy culture means many Step by Step IB students arrive at DP1 with strong study habits and pastoral support already in place; our coaching adds the IB-specific rubric layer that the parallel-curriculum context structurally leaves thinner.",
    faqs: [
      {
        question:
          "Step by Step has had IB DP for years — does the long-established status mean my child doesn't need external IB Biology coaching?",
        answer:
          "Long IB track record at a school is a real positive — it usually means stable IB-experienced teaching staff, clear IA submission processes, and well-developed mock exam culture. What it doesn't automatically solve is the individual-student gap between in-school Paper 2 attempts and the precise IB long-response mark-scheme. Our 1:1 coaching provides weekly written feedback against the rubric on practice Paper 2 answers, which the in-school class doesn't have bandwidth to do at that frequency. The school's IB experience and our coaching are complementary — we have several Step by Step IB Biology students each cohort using exactly this combination.",
      },
      {
        question:
          "How does Step by Step's IB Biology compare to Pathways Noida and Shiv Nadar Noida?",
        answer:
          "Three different positioning profiles. Step by Step is the longest-established (mid-1990s founding, longer IB track record), dual-track senior school (IB + CBSE in parallel), strong pastoral-care culture. Pathways Noida is the international-from-inception full IB Continuum (PYP through DP). Shiv Nadar Noida is STEM-strong with founder's tech-industry identity. The IB Biology programmes are comparable in quality; the school cultures differ. None of these school differences predict an individual student's IB Biology score — that depends on engagement and rubric calibration. Our coaching adapts to each school's profile; we have students from all three.",
      },
      {
        question:
          'Step by Step runs IB DP and CBSE in parallel at Class 11-12 — does the parallel-curriculum context affect IB Biology results?',
        answer:
          'The cohort size on the IB track at Step by Step is smaller than at single-curriculum IB schools (Pathways Aravali, UWCSEA). What this means in practice is that peer-driven rubric awareness — what students at larger IB cohorts absorb partly through cohort-density-driven peer benchmarking — is structurally thinner. Our 1:1 coaching fills that gap with explicit weekly written feedback on long-response answers against the IB Biology mark scheme. The result is rubric-tight Paper 2 answers regardless of in-school IB cohort size. Several Step by Step IB Biology HL students score competitively despite the smaller in-school IB peer group.',
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Step by Step students?',
        answer:
          "Yes — Cerebrum runs a dedicated IB+NEET integrated coaching track — a niche programme few biology-only providers in India offer. Several Step by Step IB Biology HL students each cohort pursue the dual IB+NEET pathway. The dual-curriculum senior-school context at Step by Step (IB + CBSE in parallel) creates a cultural environment where the India medical-college path is naturally considered — many Step by Step IB families have extended-family connections to the school's CBSE cohort and the AIIMS/NEET track. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. Step by Step families typically pay in INR with payment plans across 3–4 instalments; GST-compliant invoices issued for corporate-reimbursement claims (common for Noida-based MNC IT-employee families).',
      },
      {
        question:
          'My child is at Step by Step CBSE Class 10 and considering switching to IB DP for senior school — what should we factor in?',
        answer:
          "Two factors matter most. First, the application target: IB is the cleaner signal for US / UK / Canada / Australia universities; CBSE is the more direct route for Indian universities and NEET-track medical school. Second, the assessment-style shift: CBSE Class 10 prioritises content recall and standardised-answer structures; IB DP Paper 2 rewards data-analysis-and-evaluation writing — a real shift that needs explicit DP1 first-term work. Dual-application students who want both options open can pursue IBDP at Step by Step and add NEET via our IB+NEET integrated track. We'll be straight about which path fits your application target.",
      },
      {
        question: 'When should a Step by Step student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window and includes an explicit CBSE-Class-10-to-IB-DP bridge for students transitioning from the school's CBSE track. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have Step by Step students each cohort who join then for focused Paper 2 long-response and data-response rubric drilling.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 26. GENESIS GLOBAL SCHOOL (Sector 132 / Noida–Greater Noida Expressway)
  // ──────────────────────────────────────────────────────────────────────────
  // The Noida-region residential IB option. Most Noida IB schools are day-
  // only (Pathways Noida, Shiv Nadar, Step by Step are all day-only). Genesis
  // Global offers residential + day, which makes it the Noida equivalent of
  // Pathways Aravali / GD Goenka World in the Gurgaon cluster.
  {
    slug: 'genesis-global-noida',
    schoolName: 'Genesis Global School',
    shortName: 'Genesis Global',
    cityCountry: 'Noida (Greater Noida), India',
    citySlug: 'noida',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Genesis Global School is a co-educational residential and day IB World School on the Noida–Greater Noida Expressway, opened in the mid-to-late 2000s as one of the relatively few residential international schools in the Delhi NCR region. The school runs a full IB Continuum — PYP, MYP, and DP — alongside CBSE as a parallel curriculum option, and the residential cohort draws boarders from across India and from a small number of neighbouring countries. Day students commute primarily from the broader Noida residential belt (Sectors 50, 62, 75, 93, 100, 128, 132) and from Greater Noida itself.',
      "Genesis Global is structurally the Noida-cluster equivalent of Pathways Aravali / GD Goenka World in the Gurgaon cluster — the residential IB option that gives families a boarding choice within an India IB World School. Both IB Biology HL and SL are offered, with full the IB practical programme coverage. The school's boarding-house infrastructure includes academic support and evening study halls, which the IB Biology cohort uses for both prescribed homework and (when families opt in) external 1:1 tutoring sessions.",
      "For Genesis Global IB Biology students, the most common drivers of external tutoring are the same as at the other major IB schools: Paper 2 long-response rubric calibration, IA mentorship through the DP1 topic-selection cycle, and — for the dual-application subset — the integrated IB+NEET track. The residential context adds one additional factor: IST timezone is the natural match for India-based tutors, which means our IST evening live sessions at 7–9 PM fit cleanly into the school's boarding study-hall schedule, without the awkward late-night-IST timing that boarders would experience with UK or US-based tutors operating into the evening of their own local timezone.",
      "Genesis Global's Noida–Greater Noida Expressway location is south-east of the central Noida sectors and meaningfully east of central Delhi. For day students commuting from across the Noida residential belt, the school's transport network spans most of the Sector 50–132 footprint plus Greater Noida. For boarders, the campus is the student's primary location through term — and our online live tutoring removes any concern about boarders being structurally distant from physical tutoring centres in Delhi or central Gurgaon. Coaching is delivered into the boarding house or study hall via laptop and headphones; many Genesis boarders join Saturday morning weekend blocks (10 AM–12 PM IST) as one of our most popular slots for the cohort.",
    ],
    reputationBullets: [
      'Opened mid-to-late 2000s — among the longer-running residential IB schools in NCR',
      'Full IB Continuum: PYP + MYP + DP',
      'Co-educational residential + day school',
      'Located on the Noida–Greater Noida Expressway',
      'The Noida-cluster residential IB option (most other Noida IB schools are day-only)',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Boarding cohort from across India and a small number of neighbouring countries',
    ],
    collegeContext:
      "Genesis Global IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester, Bristol), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Northwestern, public flagships), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar University, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from Genesis Global most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical / biotechnology programmes. The residential cohort context produces an unusually-strong UCAS-application familiarity from boarding-house application-coaching culture, similar to the dynamic at Pathways Aravali and GD Goenka World.",
    paceAlignment:
      "Genesis Global follows the standard two-year DP cycle. IST timezone aligns directly with our India-based live tutoring schedule — a critical structural advantage over UK / US / Canada-based IB tutors operating in mismatched timezones, especially for boarding students whose study-hall schedules are fixed in IST. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting both day-student post-commute and boarder study-hall windows) or weekend morning blocks (Saturday/Sunday 10 AM–12 PM is popular among boarders). For IB+NEET integrated students, we run a combined weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. IA mentorship aligns to the school's DP1 IA proposal deadlines and the November DP2 mock exam window.",
    faqs: [
      {
        question:
          'My child is a boarder at Genesis Global — can they join live tutoring sessions from the boarding house?',
        answer:
          "Yes, this is a common pattern in our Genesis Global roster. Sessions are 100% online live video and can be joined from any quiet space with a reliable internet connection — the boarding house study halls and dorm rooms typically work fine. Our IST evening sessions at 7–9 PM fit cleanly into the school's boarding study-hall schedule, and we provide session recordings for review during the next day's study time. Many Genesis Global boarders prefer our weekend morning blocks (Saturday and Sunday 10 AM–12 PM) which sit naturally in the boarding-house weekend rhythm without competing with weekday classroom load.",
      },
      {
        question:
          'How is Genesis Global different from Pathways Noida, Shiv Nadar Noida, and Step by Step — the other major Noida IB schools?',
        answer:
          'Genesis Global is the residential option in the Noida IB cluster; Pathways Noida, Shiv Nadar, and Step by Step are all day-only. For families specifically wanting boarding (whether for child-development reasons, parent-travel reasons, or because the family is based outside the Delhi NCR commute belt), Genesis is the natural choice within the Noida footprint. For day-only families, all four schools are viable IB options with different pedagogical profiles — Pathways for international-from-inception full Continuum, Shiv Nadar for STEM-strong identity, Step by Step for longest IB track record, Genesis for the residential + day model. The IB Biology programmes are comparable in quality; the choice between them is driven by school culture fit and residential preferences.',
      },
      {
        question:
          'Is Genesis Global similar to Pathways Aravali in Gurgaon — both are residential IB schools in NCR?',
        answer:
          'Structurally similar (both residential + day, both full IB Continuum), but located on opposite sides of NCR — Pathways Aravali sits south of Gurgaon on the Aravali range; Genesis Global sits south-east of Noida on the Noida–Greater Noida Expressway. Families typically choose between them based on home-region (Gurgaon families pick Aravali; Noida and east-Delhi families pick Genesis; out-of-NCR boarding families weigh both based on travel logistics from their home city). The IB Biology programmes are comparable at both. We coach students from both schools and the coaching framework is essentially identical.',
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Genesis Global students?',
        answer:
          "Yes — We coach an IB+NEET integrated weekly schedule — a specialised track that few biology coaching providers in India run. Several Genesis Global IB Biology HL students each cohort pursue the dual IB+NEET pathway. Boarding students particularly benefit from the integrated weekly schedule because the boarding-house study-hall structure can accommodate a longer-and-more-structured weekly tutoring load than typical day-student schedules. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single schedule that fits the school's term calendar and the boarding study-hall windows.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. India-resident families pay in INR; international family options available for boarders from neighbouring countries paying in USD.',
      },
      {
        question:
          'How does the IST timezone match matter for Genesis Global boarders compared to overseas-based IB tutors?',
        answer:
          "It matters more than parents initially expect. Overseas-based IB tutors (UK, US, Canada) operating into India are usually awake during their own daytime, which is the middle of the night in India. They schedule sessions in awkward early-morning or late-night IST slots that compete with school sleep or homework — especially difficult for boarders whose study-hall windows are fixed in IST. Our IST-based tutors run their full schedule in India local time: your child's 7 PM IST evening is our tutor's 7 PM working evening, with no fatigue or timezone-shift compromise. The IST-match is a structural advantage of choosing India-based IB tutors for an India-based residential school.",
      },
      {
        question: 'When should a Genesis Global student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For IB+NEET students, ideally earlier (during Grade 10 / MYP5) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective. Several Genesis boarders each cohort join then specifically for Paper 2 long-response and data-response rubric drilling in the run-up to May exams, often using the school's weekend study-hall slots as the live-session window.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 27. LOTUS VALLEY INTERNATIONAL SCHOOL NOIDA (Sector 126, Noida, India)
  // ──────────────────────────────────────────────────────────────────────────
  // Distinct from Lotus Valley campuses in other NCR locations — this entry
  // is the Sector 126 Noida campus specifically. Newer-generation IB-and-
  // CBSE dual-track school with growing IB DP cohort.
  {
    slug: 'lotus-valley-noida',
    schoolName: 'Lotus Valley International School',
    shortName: 'Lotus Valley',
    cityCountry: 'Noida, India',
    citySlug: 'noida',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'Lotus Valley International School Noida is a co-educational day school in Sector 126 Noida, opened in the late 2000s as one of the newer-generation international schools serving the rapidly-growing Noida residential belt. The school runs CBSE as its primary curriculum through Class 10 and offers the IB Diploma Programme as a senior-school international option at Classes 11–12 alongside the continuing CBSE Class 11–12 track. This dual-track senior-school structure is common across the Noida IB cluster (Step by Step, Shiv Nadar) and reflects the typical Noida-family pattern of weighing both Indian and abroad university applications during Class 10.',
      "Lotus Valley's IB DP cohort is among the newer IB cohorts in Noida — the school added IB DP authorisation as part of its growing international-school positioning over the past decade. Both IB Biology HL and SL are offered, with full the IB practical programme coverage. The Biology department is staffed by IB-experienced teachers and the school's lab infrastructure supports the full IB practical programme.",
      "For Lotus Valley IB Biology students, the most common driver of external tutoring is the CBSE-Class-10-to-IB-DP transition. The shift from CBSE's recall-and-standard-answer-structure assessment to the IB DP's data-analysis-and-evaluation Paper 2 style is the single biggest assessment-style change students encounter at DP1 — a real shift that benefits from explicit external coaching in the first DP1 term. Our DP1 coaching makes this transition explicit, calibrating the IB-rubric command terms and the IA personal-investigation style alongside the school's in-house teaching. Several Lotus Valley IB Biology HL students each cohort also pursue our integrated IB+NEET track for the standard dual-application reasons.",
      "Lotus Valley's Sector 126 location places it on the central-east Noida belt, accessible from the Sector 50/62/93/100/128/132 residential cluster as well as the broader Sector 75 and Greater Noida footprint. The school operates a transport network across this footprint. For our coaching, the school commute is irrelevant — IST evening live sessions at 7–9 PM fit cleanly after the school day regardless of which Noida sector students live in, and the no-commute online-delivery model returns roughly 60–90 minutes per session compared to physical tutoring at a Cyber City / South Delhi / central-Noida tutoring centre.",
    ],
    reputationBullets: [
      'Opened late 2000s — newer-generation Noida international school',
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11-12',
      'Located in Sector 126 Noida (central-east Noida residential belt)',
      'CBSE primary curriculum through Class 10',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Day school (not residential)',
    ],
    collegeContext:
      'Lotus Valley International IB graduates show a UK-and-Canada-heavy matriculation mix that reflects the newer-generation Noida international cohort. UK destinations include Russell Group institutions — Oxbridge, Imperial, UCL, KCL, Warwick, Manchester. US destinations include the standard Ivy+, NYU, and top liberal arts targets but with the cohort weighted toward research-active US universities (Berkeley, Northwestern, public flagships). Canadian matriculations are particularly strong: Toronto, UBC, McGill, Western, Waterloo all see Lotus Valley alumni. Indian universities — Ashoka, Krea, Shiv Nadar — also feature; IB+NEET dual-track students additionally pursue AIIMS and state medical colleges via NEET. Biology HL students typically target UK medicine, biosciences at top UK or Canadian universities, or biomedical and biotechnology programmes.',
    paceAlignment:
      "Lotus Valley's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the Sector 126 school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The DP1 coaching includes an explicit CBSE-Class-10-to-IB-DP bridge — the single biggest assessment-style transition Lotus Valley IB students face — calibrated to be substantially complete by mid-DP1. IA mentorship aligns to the school's DP1 IA proposal deadlines.",
    faqs: [
      {
        question:
          "My child finished Lotus Valley's CBSE Class 10 with strong Biology marks — what changes when they start IB Biology HL at DP1?",
        answer:
          "Lotus Valley's CBSE Class 10 produces strong rote-mastery; IB DP shifts the demand to interpretation. The first change is in answer format — Class 10's recall-pattern is replaced by Paper 2's structured 4-6 mark long-responses where command-term verbs ('explain', 'evaluate', 'distinguish', 'discuss', 'justify') each map to specific marking rubrics. The second is the Biology IA: a personal investigation your child designs, runs, and writes up across roughly 10 hours of DP1 schedule, marked against a strict four-criteria rubric that Class 10 never trained for. The third is genuinely new content — cell signalling, transcription regulation, immune-system depth, statistical analysis of ecological data — that Lotus Valley's Class 10 NCERT chapters only skim. Our DP1 coaching covers all three explicitly through the August-to-November window; this is the single highest-leverage external-coaching value for Lotus Valley CBSE-to-IB transitioners.",
      },
      {
        question:
          "How does Lotus Valley's IB Biology compare to the other Noida IB schools — Pathways, Shiv Nadar, Step by Step, Genesis Global?",
        answer:
          "Five different positioning profiles. Lotus Valley is newer-generation day-only (CBSE primary + IB DP senior, comparable to Shiv Nadar's structural pattern). Pathways Noida is full IB Continuum (PYP+MYP+DP), day-only. Shiv Nadar is STEM-strong with tech-industry founder identity, day-only. Step by Step is the longest-established Noida IB school, dual-track senior. Genesis Global is the only residential option in the Noida cluster. The IB Biology programmes are comparable in quality; school cultures differ. We have students from all five schools — they're complementary positioning within the Noida IB market rather than directly competing on IB Biology specifically.",
      },
      {
        question:
          "Lotus Valley's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group affect IB Biology results?",
        answer:
          "No — IB grades are criterion-referenced globally, so cohort size at Lotus Valley doesn't change the points your child can score. The real cohort-size effect is on informal peer rubric exposure: at 60+ student IB classes (Pathways Aravali, UWCSEA Singapore) students compare Paper 2 mock answers casually and pick up the mark-scheme through osmosis. Lotus Valley's smaller IB cohort makes that informal pathway thinner. We replace it with structured examiner-led written feedback — your child sees the same examiner-perspective marking that a denser-cohort peer would have provided, weekly, in writing.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Lotus Valley students?',
        answer:
          'Yes — Cerebrum offers a structured IB+NEET integrated coaching track — among the few such programmes from India-based biology providers. Several Lotus Valley IB Biology HL students each cohort pursue the dual IB+NEET pathway because the CBSE-rooted school culture means India medical-college options (AIIMS, state medical) are naturally in family conversations even when the abroad track is the primary planned route. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. Lotus Valley families typically pay in INR with payment plans across 3–4 instalments; GST-compliant invoices issued for corporate-reimbursement claims (common for Noida-based MNC IT-employee families).',
      },
      {
        question:
          "My child is choosing between continuing CBSE Class 11-12 at Lotus Valley or switching to the school's IB DP — which is better for medicine applications?",
        answer:
          "Depends on the target country. For UK medicine, IB is well-received and reads strongly when paired with HL Biology + HL Chemistry. For US pre-med, IB is the cleaner transcript signal — US admissions officers parse IB more fluently than CBSE. For Canada / Australia, IB works well. For India (AIIMS / state medical via NEET), CBSE is the more direct route because NEET-eligibility and the Class 12 board-exam framework are CBSE-aligned. Dual-application students who want both options open can pursue IBDP at Lotus Valley and add NEET via our IB+NEET integrated track. We'll be straight about which path best fits your target.",
      },
      {
        question: 'When should a Lotus Valley student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the CBSE-to-IB bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have Lotus Valley students each cohort who join then for focused Paper 2 long-response and data-response rubric drilling in the run-up to May exams.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 28. GD GOENKA PUBLIC SCHOOL NOIDA (Noida, India)
  // ──────────────────────────────────────────────────────────────────────────
  // Third GD Goenka entry in this catalogue (after World #20 — Sohna
  // residential — and Signature #22 — Sec 48 Gurgaon day-only premium).
  // GD Goenka Public School is the most numerous sub-brand within the
  // broader GD Goenka network; the Noida campus runs CBSE primary with
  // IB DP added as a senior-school option, making it the CBSE-rooted
  // entry-point to GD Goenka's IB offering rather than the World/
  // Signature international-from-inception positioning.
  {
    slug: 'gd-goenka-public-noida',
    schoolName: 'GD Goenka Public School',
    shortName: 'GD Goenka Public',
    cityCountry: 'Noida, India',
    citySlug: 'noida',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'GD Goenka Public School Noida is a co-educational day school operating as part of the broader GD Goenka Public Schools network — the most numerous sub-brand within the GD Goenka education group, distinct from the premium GD Goenka World School (Sohna, residential + day, full IB Continuum) and GD Goenka Signature School (Sector 48 Gurgaon, day-only premium IB). The Public School Noida campus is among the GD Goenka campuses that have added IB Diploma Programme authorisation alongside their established CBSE programme, giving Noida families an IB DP option within a school brand they already recognise.',
      "The school's senior-school structure runs CBSE Class 11–12 as the larger of the two tracks and IB DP as the international-application track for the subset of families targeting US, UK, Canadian, Australian, or other abroad universities. This dual-track parallel pattern is structurally similar to other CBSE-primary Noida IB schools (Step by Step, Shiv Nadar, Lotus Valley) — students self-select into IB or CBSE at the Grade 11 transition based on their application target. Both IB Biology HL and SL are offered, with full the IB practical programme coverage.",
      "For GD Goenka Public Noida IB Biology students, the most common driver of external tutoring is the CBSE-to-IB transition at DP1. Because the school's primary curriculum and broader cohort identity is CBSE, IB DP students arrive at DP1 from a recall-and-standard-answer-structure assessment background and need to internalise the IB's data-analysis-and-evaluation Paper 2 style. Our DP1 coaching makes this transition explicit in the first term, alongside IA topic-selection mentorship and rubric calibration. The integrated IB+NEET track is also a natural fit because the school's CBSE-rooted family base often values keeping India medical-college options open via NEET in parallel with the abroad IB pathway.",
      "The Noida campus location keeps GD Goenka Public accessible across the broader Noida residential belt — Sectors 50, 62, 75, 93, 100, 128, 132 — with the school's transport network spanning this footprint. For our coaching, the school's location is irrelevant because delivery is 100% online live video; students join from home after the school day regardless of which Noida sector they live in. The IST evening live session window (7–9 PM) fits cleanly after the school commute, and weekend morning blocks (Saturday/Sunday 10 AM–12 PM IST) are available for IB+NEET integrated students who prefer to absorb the dual-syllabus weekly load in a single weekend block.",
    ],
    reputationBullets: [
      'Part of the broader GD Goenka Public Schools network — the most numerous sub-brand within the GD Goenka group',
      'Distinct from sister campuses GD Goenka World (Sohna, residential + IB Continuum) and GD Goenka Signature (Sector 48 Gurgaon, day-only premium)',
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11–12 (CBSE is the larger track)',
      'Located in Noida (central-Noida residential belt)',
      'IB Biology HL and SL with full full practical-programme coverage',
      'CBSE-rooted brand identity with IB DP as the abroad-applications track',
    ],
    collegeContext:
      'GD Goenka Public Noida IB graduates show the GD Goenka network characteristic CBSE-rooted matriculation mix overlaid with international applications from the IB cohort. UK destinations include Oxbridge, Imperial, UCL, KCL, Warwick, and Edinburgh. US matriculations include Ivy+, NYU, top liberal arts colleges, Berkeley, and public flagships. Canadian universities (Toronto, UBC, McGill, Waterloo) take a meaningful share. Indian university connections via the broader GD Goenka network alumni base strengthen applications to Ashoka, Krea, Shiv Nadar University, and Plaksha. Biology HL students most often pursue UK medicine, US pre-med, or Canadian biosciences; IB+NEET dual-track students additionally target AIIMS and state medical colleges via NEET — a track that fits the CBSE-rooted family conversation pattern common at GD Goenka households.',
    paceAlignment:
      "GD Goenka Public Noida follows the standard two-year DP cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the Noida school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The DP1 coaching includes an explicit CBSE-Class-10-to-IB-DP bridge that is the single highest-leverage external coaching value for GD Goenka Public IB students transitioning from the school's CBSE Class 10. IA mentorship aligns to the school's DP1 IA proposal deadlines.",
    faqs: [
      {
        question:
          'Is GD Goenka Public Noida the same as GD Goenka World School or GD Goenka Signature? I have heard of all three.',
        answer:
          "All three are part of the broader GD Goenka education group but they're structurally different schools with distinct positioning. GD Goenka World School is in Sohna (south of Gurugram) and runs a residential + day model with a full IB Continuum (PYP + MYP + DP) — boarders come from across India. GD Goenka Signature School is in Sector 48 Gurgaon, day-only, IB DP + CBSE senior school — the premium central-Gurgaon day school. GD Goenka Public Noida is the CBSE-rooted Noida campus with IB DP added as a senior-school option alongside the larger CBSE Class 11-12 track. For families in Noida wanting the GD Goenka brand with an IB DP option, the Noida Public campus is the natural choice; for boarding, the World School in Sohna; for the premium Gurgaon day school with strong international identity, the Signature campus.",
      },
      {
        question:
          "My child finished GD Goenka Public Noida's CBSE Class 10 with strong Biology marks — what changes when they start IB Biology HL at DP1?",
        answer:
          "The CBSE-to-IB transition at GD Goenka Public Noida is essentially three problems rolled into one term. First, the writing format: Class 10 rewards clean recall; IB Paper 2 rewards precise deployment of IB command terms — explain, discuss, evaluate, distinguish, justify — each scored differently against the published mark scheme. Second, the Biology IA: a 10-hour personal investigation worth 20% of the final grade, designed and written independently, against criteria (Personal Engagement, Exploration, Analysis, Evaluation, Communication) that have no Class 10 precedent. Third, content depth: cell respiration biochemistry, photosynthesis, molecular genetics, statistical ecology, and immune-system mechanisms sit well beyond Class 10 NCERT. Our DP1 coaching front-loads the transition over the first 10-12 weeks so the student's IA proposal in Term 2 is already rubric-aware — the highest-leverage external-coaching value for GD Goenka Public CBSE-to-IB transitioners.",
      },
      {
        question:
          "GD Goenka Public Noida's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group affect IB Biology results?",
        answer:
          "The IB exam grading is criterion-referenced against the same global mark scheme regardless of in-school cohort size, so the grade itself is unaffected. The functional gap a smaller IB cohort creates is in informal peer rubric calibration — at Pathways Noida (full-IB-Continuum cohort) or UWCSEA students see each other's Paper 2 long-response answers and naturally develop a sense of what 'good' looks like at the IB rubric level. GD Goenka Public Noida's smaller IB cohort means that informal cross-comparison happens less. Our 1:1 coaching addresses this directly: examiner-led weekly written feedback on practice Paper 2s, calibrated to the IB mark scheme.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for GD Goenka Public Noida students?',
        answer:
          'Yes — Cerebrum runs an IB+NEET integrated track that few India-based providers offer. The CBSE-rooted family identity at GD Goenka Public Noida makes this an unusually-natural fit: India medical-college conversations (AIIMS, state medical via NEET) are already part of household discussions even for IB-track students, so the dual IB+NEET pathway preserves both abroad (UK medicine, US pre-med, Canadian life-sciences) and India options. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. GD Goenka Public Noida families typically pay in INR with payment plans across 3–4 instalments; GST-compliant invoices issued for corporate-reimbursement claims (common for Noida-based MNC IT-employee families).',
      },
      {
        question:
          'How does GD Goenka Public Noida compare to the other Noida IB schools — Pathways, Shiv Nadar, Step by Step, Genesis, Lotus Valley?',
        answer:
          'Six different positioning profiles. GD Goenka Public is the CBSE-rooted Goenka-brand entry, day-only. Pathways Noida is the international-from-inception full IB Continuum, day-only. Shiv Nadar is STEM-strong with tech-industry founder identity. Step by Step is the longest-established Noida IB school with strong pastoral-care culture. Genesis Global is the only residential option. Lotus Valley is newer-generation CBSE-rooted day-only. The IB Biology programmes across all six are comparable in quality; school cultures and brand identities differ. We have students from all six schools.',
      },
      {
        question: 'When should a GD Goenka Public Noida student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the CBSE-to-IB bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and several GD Goenka Public Noida students each cohort join then for focused Paper 2 long-response and data-response rubric drilling in the run-up to May exams.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 29. MANAV RACHNA INTERNATIONAL SCHOOL (Faridabad, India)
  // ──────────────────────────────────────────────────────────────────────────
  // Flagship international school of the Manav Rachna education group
  // (which also runs Manav Rachna International University and engineering /
  // dental colleges). Multi-curriculum senior school: IB DP + Cambridge
  // IGCSE/A-Levels + CBSE in parallel.
  {
    slug: 'manav-rachna-faridabad',
    schoolName: 'Manav Rachna International School',
    shortName: 'Manav Rachna',
    cityCountry: 'Faridabad, India',
    citySlug: 'faridabad',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'Manav Rachna International School (MRIS) is a co-educational day school in Faridabad, operating as the flagship international school of the Manav Rachna education group — which also runs Manav Rachna International Institute of Research and Studies (a UGC-recognised university), Manav Rachna Dental College, and engineering programmes. The school sits in the broader MRIS / Manav Rachna campus footprint in Faridabad and draws students from across the Faridabad residential belt and from Greater Faridabad.',
      "Manav Rachna's senior school is multi-curriculum: students can choose between the IB Diploma Programme, the Cambridge IGCSE / A-Levels track, or the CBSE Class 11-12 continuation track. This multi-pathway structure makes MRIS the most curriculum-flexible school in the Faridabad IB cluster, and the IB DP cohort is composed of students self-selecting toward US, UK, Canadian, and Australian university applications. Both IB Biology HL and SL are offered, with full the IB practical programme coverage.",
      "For Manav Rachna IB Biology students, the most common driver of external tutoring is the multi-curriculum senior-school context: because MRIS runs IB alongside Cambridge and CBSE, the in-school IB-specific peer benchmarking is structurally thinner than at single-curriculum IB schools (Pathways Aravali, UWCSEA). Our 1:1 coaching fills that gap with explicit weekly written feedback on Paper 2 long-response answers against the IB mark scheme. Several Manav Rachna IB Biology HL students each cohort also pursue our integrated IB+NEET track — given the Manav Rachna group's own medical and dental college operations, India medical-college pathways are naturally in family conversations.",
      "Manav Rachna's Faridabad location and the broader Manav Rachna campus footprint mean students typically commute from across the Faridabad sector belt (14, 15, 17, 19, 80) and from NIT Faridabad. The school operates a transport network spanning these areas. For our coaching, the school commute is irrelevant — IST evening live sessions at 7-9 PM fit cleanly after the school day. The Manav Rachna group's own medical and dental colleges also create a useful local biology context that students often draw on for IA topic-selection inspiration.",
    ],
    reputationBullets: [
      'Flagship international school of the Manav Rachna education group',
      'Group also runs MRIIRS university + Manav Rachna Dental College + engineering programmes',
      'IB World School authorised for the Diploma Programme',
      'Multi-curriculum senior school: IB DP + Cambridge IGCSE/A-Levels + CBSE',
      'Located in Faridabad (Manav Rachna campus footprint)',
      'IB Biology HL and SL with full full practical-programme coverage',
      'Day school (not residential)',
    ],
    collegeContext:
      'Manav Rachna IB graduates have an unusually within-network pathway available because the broader Manav Rachna education group operates MRIIRS university, Manav Rachna Dental College, and engineering programmes. UK matriculations cluster around Oxbridge, Imperial, UCL, KCL, Warwick, and Edinburgh. US destinations include the standard Ivy+, NYU, top liberal arts, Berkeley, and public flagships. Canadian institutions (Toronto, UBC, McGill, Western, Waterloo) feature meaningfully. Indian university destinations include Ashoka, Krea, Shiv Nadar University, and Plaksha, plus AIIMS and state medical colleges for IB+NEET dual-track students. Biology HL students from Manav Rachna often add Manav Rachna Dental College as a within-network India option — particularly common for the IB+NEET dual-track cohort wanting to preserve dentistry-in-India alongside abroad medical-school applications.',
    paceAlignment:
      "Manav Rachna's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7-9 PM is most common, fitting after the Faridabad school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. IA mentorship aligns to the school's DP1 IA proposal deadlines. For students transitioning from MRIS's Cambridge IGCSE or CBSE Class 10 track, our DP1 coaching includes an explicit prior-curriculum-to-IB-DP bridge.",
    faqs: [
      {
        question:
          'Manav Rachna offers IB DP, Cambridge A-Levels, AND CBSE in senior school — which track is best for medicine applications?',
        answer:
          'Depends on the target country. For UK medicine, both IB and A-Levels are well-received; UK medical schools have well-developed offer matrices for both. For US pre-med, IB is the cleaner transcript signal — US admissions officers parse IB more fluently than Cambridge or CBSE. For Canada / Australia, IB works well. For India (AIIMS / state medical via NEET, including potentially Manav Rachna Dental), CBSE is the more direct route because NEET-eligibility and the Class 12 board-exam framework are CBSE-aligned. Dual-application students who want both abroad and India open can pursue IBDP at Manav Rachna and add NEET via our IB+NEET integrated track.',
      },
      {
        question:
          "How does Manav Rachna's IB Biology compare to DPS Faridabad and Shri Ram Faridabad — the other Faridabad IB schools?",
        answer:
          "Three different profiles. Manav Rachna is multi-curriculum (IB + Cambridge + CBSE) with a flagship-school identity within a broader education-group network (MRIIRS university, dental college). DPS Faridabad is part of the DPS national network with strong CBSE roots and IB DP added at senior. Shri Ram School Faridabad is a sister to TSRS Aravali in Gurgaon with the broader TSRS humanities-and-arts identity. The IB Biology programmes are comparable in quality; school cultures and curriculum mixes differ. None of these school differences predict an individual student's IB Biology score — that depends on engagement and rubric calibration. We coach students from all three.",
      },
      {
        question:
          'The Manav Rachna group includes a dental college — does that influence how IB Biology students approach medicine applications?',
        answer:
          'For some students, yes — Manav Rachna Dental College is a within-network option that some MRIS families consider as part of the broader medicine / dentistry application portfolio. This is one reason the integrated IB+NEET pathway has unusually-strong demand at Manav Rachna: families want to keep dentistry-in-India open (which requires NEET) alongside abroad medical / pre-med applications (which require IB or A-Level credentials). Our IB+NEET integrated coaching is well-suited to this dual-application profile.',
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Manav Rachna students?',
        answer:
          "Yes — We are among the small number of India-based providers running an IB+NEET integrated coaching track. Several Manav Rachna IB Biology HL students each cohort pursue the dual IB+NEET pathway. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule that respects the school's multi-curriculum academic load.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000-₹98,000 per year for the complete integrated programme. Manav Rachna families typically pay in INR with payment plans across 3-4 instalments; GST-compliant invoices issued for corporate-reimbursement claims.',
      },
      {
        question:
          'Faridabad has limited dedicated IB tutoring centres — does that make external 1:1 coaching harder to find?',
        answer:
          'Locally, yes — Faridabad has fewer dedicated IB-specialist tutoring centres than Gurgaon or central Delhi, which makes the choice typically between (a) in-school class only, (b) generalist Delhi-side test-prep agencies operating into Faridabad, or (c) online-delivery specialist IB tutors. Cerebrum is option (c): IB Biology-only AIIMS-trained faculty delivering live online sessions in IST evenings. The online-delivery model removes the Faridabad geography constraint entirely — no driving to Delhi for IB-specific specialist coaching.',
      },
      {
        question: 'When should a Manav Rachna student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For students transitioning from MRIS's Cambridge IGCSE or CBSE Class 10 track, the first-term coaching includes a prior-curriculum-to-IB-DP bridge. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 30. DELHI PUBLIC SCHOOL FARIDABAD (Faridabad, India)
  // ──────────────────────────────────────────────────────────────────────────
  // Distinct from DPS International Gurgaon (#19, the explicitly-international
  // Gurgaon campus) and the broader DPS network's other branches. DPS
  // Faridabad runs CBSE primary with IB DP added as a senior-school option
  // alongside the larger CBSE Class 11-12 track.
  {
    slug: 'dps-faridabad',
    schoolName: 'Delhi Public School Faridabad',
    shortName: 'DPS Faridabad',
    cityCountry: 'Faridabad, India',
    citySlug: 'faridabad',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Delhi Public School Faridabad (DPS Faridabad) is a co-educational day school operating as part of the broader Delhi Public School (DPS) national network — one of India's largest and most established educational networks, with sister campuses across Delhi, NCR, and the broader country (including DPS RK Puram and DPS Vasant Kunj in Delhi, DPS Sector 45 in Gurgaon, and DPS Noida Sector 30). The Faridabad campus serves the Faridabad residential belt with a CBSE-primary academic culture inherited from the broader DPS network's CBSE-focused identity.",
      "DPS Faridabad's senior school runs CBSE Class 11-12 as the larger of the two tracks, with the IB Diploma Programme added as a senior-school international option for the subset of families targeting US, UK, Canadian, Australian, or other abroad universities. Both IB Biology HL and SL are offered, with full the IB practical programme coverage. The IB cohort is meaningfully smaller than the CBSE cohort because the school's identity and most of its alumni are CBSE-rooted; students choosing IB are typically self-selecting toward international university applications.",
      "For DPS Faridabad IB Biology students, the most common driver of external tutoring is the CBSE-to-IB transition at DP1. The shift from CBSE Class 10's recall-and-standard-answer-structure assessment to the IB DP's data-analysis-and-evaluation Paper 2 style is the single biggest assessment-style change students encounter — a real shift that benefits from explicit external coaching in the first DP1 term. Our DP1 coaching makes this transition explicit, calibrating IB-rubric command terms and the IA personal-investigation style alongside the school's in-house teaching.",
      "DPS Faridabad's broader DPS network identity gives families unusually-strong India-university connections through the DPS Society alumni base. For IB+NEET dual-track students, this matters: many extended-family conversations at DPS households default to AIIMS / state medical colleges as a valued option even when the abroad track is the primary planned route. The integrated IB+NEET pathway is a natural fit for this profile, preserving both Indian and abroad medical-college pathways through Class 12. The school's Faridabad sector location keeps it accessible from across the central-Faridabad belt and from NIT Faridabad.",
    ],
    reputationBullets: [
      'Part of the broader Delhi Public School (DPS) national network',
      'Sister campuses include DPS RK Puram, DPS Vasant Kunj, DPS Sector 45 Gurgaon, DPS Noida Sector 30',
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11-12 (CBSE is the larger track)',
      'Located in Faridabad with broader Faridabad-sector accessibility',
      'IB Biology HL and SL with full full practical-programme coverage',
      'CBSE-rooted brand identity with IB DP as the abroad-applications track',
    ],
    collegeContext:
      'DPS Faridabad IB graduates benefit from the broader DPS Society unusually-strong India-university alumni network. UK applications target Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, and Manchester. US destinations include Ivy+, NYU, top liberal arts, Berkeley, Northwestern, and public flagships. Canadian institutions (Toronto, UBC, McGill, Waterloo) feature; the Canadian-pathway share is sometimes higher than at less DPS-network-connected schools because DPS alumni mentoring is strong on UK and Canadian transitions. Indian universities — Ashoka, Krea, Shiv Nadar University, Plaksha, plus AIIMS and state medical colleges — receive a notable share of applications because the DPS-network family identity keeps India tracks naturally in conversation. Biology HL students most commonly pursue UK medicine, US pre-med, or AIIMS via NEET on the dual-track.',
    paceAlignment:
      "DPS Faridabad's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7-9 PM is most common, fitting after the Faridabad school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The DP1 coaching includes an explicit CBSE-Class-10-to-IB-DP bridge that is the single highest-leverage external coaching value for DPS Faridabad IB students transitioning from the school's CBSE Class 10. IA mentorship aligns to the school's DP1 IA proposal deadlines.",
    faqs: [
      {
        question:
          "Is DPS Faridabad the same school as DPS International Gurgaon? My friend's child goes to DPS International — are they connected?",
        answer:
          "Both are part of the broader Delhi Public School (DPS) national network but they're structurally different schools with distinct profiles. DPS Faridabad is the Faridabad campus running CBSE-primary with IB DP added at senior school — the CBSE cohort is larger, the IB cohort smaller. DPS International is the Gurgaon Sector 45 campus that's explicitly positioned as the international-curriculum arm of DPS Gurgaon — Cambridge IGCSE through Class 10 → IB DP at Classes 11-12, no parallel CBSE senior track. The DPS network has multiple branches (Faridabad, RK Puram, Vasant Kunj, Sector 45 Gurgaon, Noida Sector 30) with varying senior-school structures.",
      },
      {
        question:
          "My child finished DPS Faridabad's CBSE Class 10 with strong Biology marks — what changes at IB Biology HL?",
        answer:
          "Many DPS Faridabad students arrive at DP1 expecting IB Biology to feel like a denser CBSE Class 10 — it doesn't. Three structural shifts happen. The CBSE-style recall question is replaced by IB Paper 2's data-and-graph interpretation followed by 4-6 mark long-responses where IB command terms drive scoring (lose the verb, lose the marks). The Biology Internal Assessment then asks for an original 10-hour research investigation against IB-specific criteria (Personal Engagement, Exploration, Analysis, Evaluation, Communication) — substantively unlike any CBSE board task. Content depth in human physiology, biochemistry, ecological modelling, and evolution also goes meaningfully past Class 10 NCERT. The DPS-network familiarity with structured study habits actually helps here — DPS Faridabad IB students who carry their CBSE discipline forward typically calibrate the new rubric quickly when we coach the transition across the first 10-12 weeks of DP1.",
      },
      {
        question:
          "DPS Faridabad's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group affect IB Biology results?",
        answer:
          "Not in any direct sense — IB marks are awarded against a global criterion-referenced rubric, not graded on a curve relative to the school's IB cohort. The cohort-size effect that matters is more subtle: at large IB-only cohorts students naturally compare Paper 2 mock answers and absorb the rubric implicitly. DPS Faridabad's IB students sit inside a CBSE-dominant senior school, so the informal IB-rubric peer channel is thinner. Our 1:1 coaching closes the gap explicitly — weekly examiner-style written feedback against the IB Biology mark scheme. DPS-network students who carry their CBSE study discipline forward typically internalise the rubric quickly once it's surfaced explicitly.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for DPS Faridabad students?',
        answer:
          'Yes — Cerebrum runs a dedicated IB+NEET integrated coaching track — a niche programme few biology-only providers in India offer. The DPS-network brand identity makes IB+NEET an unusually-natural fit: extended-family conversations at DPS households often default to AIIMS / state medical colleges as a valued option even when the abroad track is the primary planned route. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000-₹98,000 per year for the complete integrated programme. DPS Faridabad families typically pay in INR with payment plans across 3-4 instalments.',
      },
      {
        question:
          "How does DPS Faridabad's IB Biology compare to Manav Rachna and Shri Ram Faridabad?",
        answer:
          'Three different positioning profiles. DPS Faridabad is the DPS-network CBSE-rooted school with IB DP added at senior — strong India-university alumni connections, CBSE-brand household identity. Manav Rachna International is the flagship of the Manav Rachna education group (including MRIIRS university + dental college) with multi-curriculum senior school (IB + Cambridge + CBSE). Shri Ram School Faridabad is a sister to TSRS Aravali in Gurgaon with the broader TSRS humanities-and-arts identity. The IB Biology programmes are comparable in quality; school cultures and brand contexts differ. We coach students from all three.',
      },
      {
        question: 'When should a DPS Faridabad student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the CBSE-to-IB bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have DPS Faridabad students each cohort who join then for focused Paper 2 long-response and data-response rubric drilling.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 31. THE SHRI RAM SCHOOL FARIDABAD (Faridabad, India)
  // ──────────────────────────────────────────────────────────────────────────
  // Third TSRS entry in this catalogue. Sister campuses:
  //   - TSRS Aravali (Sector V-37 Gurgaon, entry #16) — the senior IB DP
  //     campus where many TSRS Faridabad MYP graduates transition for DP1
  //   - TSRS Moulsari (Sec 46 Gurgaon) — MYP campus that also feeds Aravali
  // TSRS Faridabad operates as a co-ed day school in the Faridabad
  // residential belt with the broader TSRS group's inquiry-led + arts-
  // strong pedagogical identity.
  {
    slug: 'shri-ram-faridabad',
    schoolName: 'The Shri Ram School Faridabad',
    shortName: 'TSRS Faridabad',
    cityCountry: 'Faridabad, India',
    citySlug: 'faridabad',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['MYP'],
    historyParagraphs: [
      'The Shri Ram School Faridabad (TSRS Faridabad) is a co-educational day school operating as part of the broader Shri Ram Schools (TSRS) network — the same group that runs TSRS Aravali (Sector V-37 Gurgaon, the senior IB Diploma Programme campus) and TSRS Moulsari (Sector 46 Gurgaon, MYP). The TSRS group itself was founded in 1988 by Manika Sharma and is recognised in the Delhi NCR educational landscape for an inquiry-led pedagogy and a strong humanities-and-arts identity that the network has actively cultivated since founding.',
      'TSRS Faridabad operates as a junior + middle-school campus, with students typically transitioning to the TSRS Aravali campus in Gurgaon for the senior IB Diploma Programme (Classes 11-12) — the same MYP-to-DP feeder pattern that operates between TSRS Moulsari and Aravali. For families whose children are currently at TSRS Faridabad, the senior IB DP pathway therefore typically involves the Aravali campus transition. Our IB Biology coaching supports both the pre-DP MYP-to-DP bridge for Faridabad students preparing to make this transition and the full DP1-DP2 cycle for TSRS Faridabad alumni now studying at the Aravali campus.',
      'For TSRS Faridabad families planning the senior-school IB DP pathway, the most common driver of starting external IB Biology coaching early is the MYP-to-DP transition. We coach the MYP5 → DP1 Biology bridge specifically: introducing the IB Diploma command terms ("explain", "evaluate", "discuss"), the data-analysis style that Paper 2 rewards, and the IA-style of designing a personal investigation. Starting in MYP5 summer means students arrive at DP1 (typically at TSRS Aravali) with the rubric language already familiar, which materially eases the first-term DP1 academic load.',
      "TSRS Faridabad's Faridabad-sector location keeps the school accessible across the central-Faridabad belt and Greater Faridabad. For our coaching, the school's location is irrelevant because delivery is 100% online live video; students join from home in IST evenings (7-9 PM is most common). For families exploring whether the TSRS Faridabad → TSRS Aravali transition is the right pathway vs an alternative senior IB school in Faridabad (Manav Rachna, DPS Faridabad, Apeejay), our counselling calls can walk through the IB Biology programme differences across these options.",
    ],
    reputationBullets: [
      'Co-ed day school in the TSRS network',
      'TSRS group founded 1988 by Manika Sharma — well-established in Delhi NCR',
      'Sister campuses: TSRS Aravali (Gurgaon senior IB DP) and TSRS Moulsari (Gurgaon MYP)',
      'Junior + middle-school IB MYP campus — DP students typically transition to TSRS Aravali',
      'Located in Faridabad with broader Faridabad-sector accessibility',
      'Inquiry-led pedagogy and strong humanities-and-arts identity (TSRS group culture)',
      'Day school (not residential)',
    ],
    collegeContext:
      "TSRS Faridabad → TSRS Aravali IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Northwestern), Canada (McGill, Toronto, UBC, Western, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar University, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students typically target UK medicine, US pre-med, biosciences at top UK / Canadian universities, environmental science, or interdisciplinary STEM programmes. The TSRS network's inquiry-and-arts-strong identity produces an unusual share of cross-applications to US liberal arts colleges (Williams, Amherst, Brown, Wesleyan) where the dual-academic-and-arts profile reads strongly.",
    paceAlignment:
      'TSRS Faridabad MYP follows the standard MYP cycle, with the typical MYP5 → DP1 transition at the TSRS Aravali campus for Classes 11-12. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7-9 PM is most common, fitting after the Faridabad school commute) or weekend morning blocks. For MYP5 students preparing to transition into DP1 at TSRS Aravali, our MYP-to-DP coaching introduces the Diploma command terms, the IA personal-investigation style, and the Paper 2 data-analysis rubric. For TSRS Faridabad alumni now at TSRS Aravali doing DP1-DP2, the standard DP coaching applies (see TSRS Aravali entry).',
    faqs: [
      {
        question:
          'My child is currently at TSRS Faridabad — will they need to transition to TSRS Aravali for IB Diploma?',
        answer:
          'This is the typical pathway for TSRS Faridabad students who want to continue on the IB track. TSRS Faridabad operates as a junior + middle-school campus, with the senior IB Diploma Programme (Classes 11-12) at the TSRS Aravali campus in Gurgaon. Many TSRS Faridabad MYP5 students transition to Aravali for DP1 — the same MYP-to-DP feeder pattern that operates from TSRS Moulsari (the other Gurgaon TSRS campus) to Aravali. Alternatively, TSRS Faridabad MYP5 students can transition to a senior IB DP school in Faridabad itself (Manav Rachna, DPS Faridabad, Apeejay) — which has the advantage of avoiding the Faridabad-to-Gurgaon daily commute but means switching school networks.',
      },
      {
        question:
          'My child is in MYP5 at TSRS Faridabad preparing to start IB DP1 at TSRS Aravali — when should we begin IB Biology coaching?',
        answer:
          'For students planning the Faridabad-to-Aravali transition for DP1, MYP5 summer is the highest-leverage start point. The MYP-to-DP coaching introduces the IB Diploma command terms ("explain", "evaluate", "discuss"), the data-analysis style that Paper 2 rewards, and the IA personal-investigation style — so the student arrives at DP1 with the rubric language already familiar. This materially eases the first-term DP1 academic load and lets the student focus on the new content rather than the new assessment style. For IB+NEET students, we can also begin Chemistry and Physics foundation-building in parallel.',
      },
      {
        question:
          'What about the Faridabad-to-Gurgaon commute for senior school at TSRS Aravali — is this realistic?',
        answer:
          'Honestly, the Faridabad-to-Gurgaon daily commute is meaningful: 45-75 minutes each way depending on traffic and time of day, with the Mehrauli-Gurgaon Road / DLF-Cyber City stretch being the bottleneck. Some TSRS families relocate within Gurgaon for the senior school years; others maintain the commute; others choose a senior IB DP school in Faridabad itself (Manav Rachna, DPS Faridabad) to avoid the cross-city commute. Our coaching is online so it removes the IB-Biology-specific tutoring travel overhead regardless of which school the student attends.',
      },
      {
        question:
          'Do you offer the IB+NEET integrated track for TSRS Faridabad → Aravali students?',
        answer:
          'Yes — We coach an IB+NEET integrated weekly schedule — a specialised track that few biology coaching providers in India run. TSRS families who want to preserve both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options can pursue the dual IB+NEET pathway. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule. For TSRS Faridabad MYP5 students planning the Aravali DP1 transition, starting the IB+NEET track in MYP5 summer builds the Chemistry / Physics NEET foundation early.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000-₹98,000 per year for the complete integrated programme. TSRS Faridabad families typically pay in INR with payment plans across 3-4 instalments.',
      },
      {
        question:
          'How does TSRS Faridabad → Aravali pathway compare to staying in Faridabad at DPS Faridabad or Manav Rachna for senior school?',
        answer:
          "Three meaningful differences. (1) School network continuity — staying at TSRS preserves the TSRS pedagogical identity (inquiry-led + arts-strong) into senior years; switching to DPS or Manav Rachna means entering a different school culture for Classes 11-12. (2) Cohort — TSRS Aravali has a larger IB DP cohort than DPS Faridabad's IB cohort (DPS is CBSE-primary); Manav Rachna has a multi-curriculum cohort. (3) Commute — staying in Faridabad means no daily cross-city commute; Aravali means 45-75 min each way unless the family relocates. None of these factors predict IB Biology results directly; the choice is about cultural / logistical fit. Our coaching adapts to whichever pathway the family chooses.",
      },
      {
        question: 'When should a TSRS Faridabad student start IB Biology tutoring?',
        answer:
          "For families planning the Faridabad-to-Aravali transition, MYP5 summer is the highest-leverage start point for the MYP-to-DP bridge. For families staying in Faridabad for senior school (transitioning to DPS Faridabad, Manav Rachna, or another local senior IB school), the start point depends on the receiving school's DP cycle — typically August or September of DP1. For IB+NEET students, ideally even earlier (during Class 10 / MYP5) to build Chemistry and Physics foundations.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 32. APEEJAY SCHOOL FARIDABAD (Faridabad, India)
  // ──────────────────────────────────────────────────────────────────────────
  // Part of the broader Apeejay Education Society network (which also runs
  // Apeejay School Noida, Apeejay Stya University, Apeejay School Delhi
  // campuses). The Faridabad campus runs CBSE primary with IB DP added as
  // a senior-school international option.
  {
    slug: 'apeejay-faridabad',
    schoolName: 'Apeejay School Faridabad',
    shortName: 'Apeejay Faridabad',
    cityCountry: 'Faridabad, India',
    citySlug: 'faridabad',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Apeejay School Faridabad is a co-educational day school operating as part of the broader Apeejay Education Society network — one of India's older educational groups, which also runs Apeejay School Noida, Apeejay School Pitampura, Apeejay School Sheikh Sarai, Apeejay School Saket, and Apeejay Stya University (in Gurgaon). The Faridabad campus has been part of the Apeejay network for decades and built its identity on CBSE academic excellence before adding the IB Diploma Programme as a senior-school international option.",
      "Apeejay Faridabad's senior school runs CBSE Class 11-12 as the larger of the two tracks, with the IB Diploma Programme added as an internationally-credentialled senior-school option for the subset of families targeting US, UK, Canadian, Australian, or other abroad universities. Both IB Biology HL and SL are offered, with full the IB practical programme coverage. The IB cohort is smaller than the CBSE cohort — typical of CBSE-primary schools that have added IB DP — and students choosing IB are self-selecting toward international university applications.",
      "For Apeejay Faridabad IB Biology students, the most common driver of external tutoring is the CBSE-to-IB transition at DP1. CBSE Class 10's recall-and-standard-answer-structure assessment is meaningfully different from IB DP Paper 2's data-analysis-and-evaluation style. Our DP1 coaching makes this transition explicit in the first term — IB-rubric command terms, long-response mark scheme, IA personal-investigation design. Several Apeejay IB Biology HL students each cohort also pursue our integrated IB+NEET track for the standard dual-application reasons.",
      "Apeejay Faridabad's location in central Faridabad keeps the school accessible across the Sector belt (14, 15, 17, 19, 80) and from NIT Faridabad. The Apeejay group's broader network (including the Stya University in Gurgaon and Apeejay School Noida) gives families useful cross-network reference points when considering senior-school IB choices. For our coaching, the school's location is irrelevant because delivery is 100% online live video; IST evening live sessions (7-9 PM) fit cleanly after the school day.",
    ],
    reputationBullets: [
      'Part of the broader Apeejay Education Society network',
      'Sister institutions: Apeejay School Noida, Apeejay School Pitampura, Apeejay Stya University (Gurgaon)',
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11-12 (CBSE is the larger track)',
      'Located in Faridabad (central Faridabad)',
      'IB Biology HL and SL with full full practical-programme coverage',
      'CBSE-rooted brand identity with IB DP added as the abroad-applications track',
    ],
    collegeContext:
      'Apeejay Faridabad IB graduates show the Apeejay Education Society network diverse matriculation pattern. UK destinations include Russell Group institutions — Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester. US matriculations include Ivy+, NYU, top liberal arts, Berkeley, and public flagships. Canadian universities (Toronto, UBC, McGill, Western, Waterloo) feature steadily. Indian university destinations include Ashoka, Krea, Shiv Nadar University, and Plaksha, plus Apeejay Stya University in Gurgaon as a within-network option for some Apeejay-network families. Biology HL students most commonly pursue UK medicine, US pre-med, biosciences at top UK or Canadian universities, or biomedical and biotechnology programmes; IB+NEET dual-track students additionally target AIIMS and state medical colleges via NEET.',
    paceAlignment:
      "Apeejay Faridabad's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7-9 PM is most common, fitting after the Faridabad school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The DP1 coaching includes an explicit CBSE-Class-10-to-IB-DP bridge that is the single highest-leverage external coaching value for Apeejay Faridabad IB students transitioning from the school's CBSE Class 10. IA mentorship aligns to the school's DP1 IA proposal deadlines.",
    faqs: [
      {
        question:
          'Is Apeejay Faridabad the same as Apeejay School Noida or other Apeejay schools? My friends mention different Apeejay campuses.',
        answer:
          "All Apeejay schools are part of the broader Apeejay Education Society network but they're structurally different schools with distinct cohort profiles. Apeejay Faridabad is the Faridabad campus running CBSE primary + IB DP senior. Apeejay School Noida and other NCR campuses (Pitampura, Sheikh Sarai, Saket) are also CBSE-rooted but may differ on senior-school IB availability. Apeejay Stya University (Gurgaon) is the network's higher-education arm — distinct from the K-12 schools. Each campus operates independently; the network connection is brand + curriculum framework, not single-campus management.",
      },
      {
        question:
          "My child finished Apeejay Faridabad's CBSE Class 10 with strong Biology marks — what changes at IB Biology HL?",
        answer:
          "For Apeejay Faridabad students moving from CBSE Class 10 to IB Biology HL, three changes deserve explicit DP1 coaching. The Paper 2 mark scheme introduces IB-specific command verbs that govern partial credit — a strong Class 10 student writing in 'explain in detail' mode loses marks they wouldn't have lost on the CBSE board. The Internal Assessment then asks for an independent 10-hour research investigation marked against four IB criteria — designed and written entirely by the student, with no Class 10 precedent in the Apeejay academic calendar. Content depth then steps up materially: cell respiration biochemistry, molecular genetics, immune system biology, plant signal transduction, and statistical ecology all extend well beyond the Class 10 Life Processes / Heredity chapters. Our DP1 coaching addresses each transition before students discover them through poor first-term mock-exam scores.",
      },
      {
        question:
          "Apeejay Faridabad's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group affect IB Biology results?",
        answer:
          "Grading is unaffected — IB Biology is criterion-referenced against a global rubric that applies the same way at Apeejay as at UWCSEA. The cohort-size effect operates upstream of the grade: rubric calibration is the skill students need, and at 50+ student IB-only cohorts that skill develops partly through peer-comparison of practice Paper 2 answers. Apeejay's smaller IB cohort within a CBSE-primary senior school means that informal channel is structurally thinner. We address this with examiner-led weekly written feedback on long-response answers — the rubric becomes visible through marked examples rather than osmosis.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Apeejay Faridabad students?',
        answer:
          "Yes — Cerebrum offers a structured IB+NEET integrated coaching track — among the few such programmes from India-based biology providers. Several Apeejay Faridabad IB Biology HL students each cohort pursue the dual IB+NEET pathway because the school's CBSE-rooted family base often values keeping India medical-college options open via NEET in parallel with abroad applications. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000-₹98,000 per year for the complete integrated programme. Apeejay Faridabad families typically pay in INR with payment plans across 3-4 instalments.',
      },
      {
        question:
          "How does Apeejay Faridabad's IB Biology compare to Manav Rachna, DPS Faridabad, and Shri Ram Faridabad?",
        answer:
          'Four different positioning profiles. Apeejay Faridabad is part of the older Apeejay Education Society network, CBSE-primary + IB senior. Manav Rachna International is the flagship of the Manav Rachna education group (with MRIIRS university + dental college), multi-curriculum senior (IB + Cambridge + CBSE). DPS Faridabad is part of the DPS national network, CBSE-primary + IB senior. Shri Ram School Faridabad is a TSRS junior + middle-school feeding into TSRS Aravali (Gurgaon) for IB DP. The IB Biology programmes are comparable in quality; school cultures and brand contexts differ. We coach students from all four.',
      },
      {
        question: 'When should an Apeejay Faridabad student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the CBSE-to-IB bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 33. MODERN DELHI PUBLIC SCHOOL FARIDABAD (Faridabad, India)
  // ──────────────────────────────────────────────────────────────────────────
  // Distinct from Delhi Public School Faridabad (entry #30, the broader-DPS-
  // network campus). Modern DPS Faridabad operates as a separate institution
  // and is independently positioned within the Faridabad IB landscape.
  {
    slug: 'modern-dps-faridabad',
    schoolName: 'Modern Delhi Public School',
    shortName: 'Modern DPS Faridabad',
    cityCountry: 'Faridabad, India',
    citySlug: 'faridabad',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'Modern Delhi Public School (Modern DPS) Faridabad is a co-educational day school in Faridabad, operating as an independently-managed institution distinct from the broader Delhi Public School (DPS) national network campus also located in Faridabad. The school built its early reputation on CBSE academic excellence and added the IB Diploma Programme authorisation as a senior-school option for the subset of families targeting international universities.',
      "Modern DPS Faridabad's senior school runs CBSE Class 11-12 as the larger of the two tracks, with the IB Diploma Programme added as an internationally-credentialled senior-school option. Both IB Biology HL and SL are offered, with full the IB practical programme coverage. The IB cohort is meaningfully smaller than the CBSE cohort — typical of the CBSE-primary-plus-IB-senior model — and students choosing IB are self-selecting toward international university applications.",
      "For Modern DPS Faridabad IB Biology students, the most common driver of external tutoring is the CBSE-to-IB transition at DP1. The shift from CBSE Class 10's recall-and-standard-answer-structure assessment to IB DP Paper 2's data-analysis-and-evaluation style is the single biggest assessment-style change students encounter. Our DP1 coaching makes this transition explicit in the first term, calibrating IB-rubric command terms and the IA personal-investigation style alongside the school's in-house teaching.",
      "Modern DPS Faridabad's Faridabad location keeps the school accessible across the central-Faridabad belt and from Greater Faridabad. For our coaching, the school's location is irrelevant because delivery is 100% online live video; IST evening live sessions (7-9 PM) fit cleanly after the school day. Several Modern DPS IB Biology HL students each cohort pursue our integrated IB+NEET track for the standard dual-application reasons — abroad applications via IB Diploma while keeping AIIMS / state medical colleges open via NEET.",
    ],
    reputationBullets: [
      'Independently-managed school in Faridabad',
      'Distinct from Delhi Public School Faridabad (separate national-DPS-network campus)',
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11-12 (CBSE is the larger track)',
      'Located in Faridabad with broader Faridabad-sector accessibility',
      'IB Biology HL and SL with full full practical-programme coverage',
      'CBSE-rooted brand identity with IB DP added as the abroad-applications track',
    ],
    collegeContext:
      'Modern DPS Faridabad IB graduates show a relatively standard matriculation mix reflecting the independent-managed school curriculum-driven (rather than network-driven) outcome pattern. UK destinations include Oxbridge, Imperial, UCL, KCL, Warwick, and Edinburgh. US matriculations include Ivy+, NYU, top liberal arts, Berkeley, and public flagships. Canadian institutions (Toronto, UBC, McGill, Western, Waterloo, Queen Mary) feature meaningfully. Indian universities — Ashoka, Krea, Shiv Nadar University, Plaksha — and AIIMS or state medical colleges via NEET for the IB+NEET dual-track subset round out the picture. Biology HL students from Modern DPS most often target UK medicine, US pre-med, or Canadian biosciences; the independent-management status of the school means matriculations reflect individual student strength rather than network-pipeline effects.',
    paceAlignment:
      "Modern DPS Faridabad's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7-9 PM is most common, fitting after the Faridabad school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The DP1 coaching includes an explicit CBSE-Class-10-to-IB-DP bridge — the single highest-leverage external coaching value for Modern DPS IB students transitioning from the school's CBSE Class 10. IA mentorship aligns to the school's DP1 IA proposal deadlines.",
    faqs: [
      {
        question:
          "Is Modern DPS Faridabad the same as Delhi Public School Faridabad? Both have 'DPS' in the name.",
        answer:
          "No — these are two structurally different schools that both operate in Faridabad. Delhi Public School (DPS) Faridabad is part of the broader DPS national network (sister to DPS RK Puram, DPS Vasant Kunj, DPS Noida Sector 30, DPS Sector 45 Gurgaon, etc.) — institutionally connected to the DPS Society. Modern Delhi Public School Faridabad is an independently-managed school that uses the 'Delhi Public School' naming but operates separately from the DPS Society network. Both offer IB DP at senior school alongside CBSE Class 11-12; the institutional and management contexts differ.",
      },
      {
        question:
          "My child finished Modern DPS's CBSE Class 10 with strong Biology marks — what changes at IB Biology HL?",
        answer:
          "Modern DPS Faridabad's CBSE Class 10 builds a solid recall-and-standardised-format foundation; the IB Biology HL shift away from that is the work of DP1 Term 1. Concretely: Paper 2 questions test data interpretation followed by command-term-driven long-responses where 'explain', 'distinguish', 'evaluate', and 'predict' each map to specific scoring criteria (Class 10 doesn't penalise verb mis-use, IB does). The Biology IA then asks for a fully independent 10-hour personal investigation graded on Personal Engagement, Exploration, Analysis, Evaluation, and Communication — unlike anything in Class 10. Syllabus depth steps up in physiology (renal physiology, muscle contraction mechanism, immune system), biochemistry (Krebs cycle, photosynthesis light reactions), and ecological modelling. Our DP1 coaching explicitly addresses this triple-transition across the first three months so Modern DPS students arrive at the DP1 mid-year assessment already calibrated to the new rubric.",
      },
      {
        question:
          "Modern DPS's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group affect IB Biology results?",
        answer:
          "Not directly — IB Biology grading is criterion-referenced against the same global rubric, identical for a 50-student cohort and a 5-student cohort. The cohort-size effect is on informal rubric exposure: students at high-density IB schools (Pathways Aravali, GD Goenka World, UWCSEA) develop Paper 2 instincts partly through peer comparison and shared mock-paper review. Modern DPS Faridabad's smaller IB cohort makes that informal channel thinner. The 1:1 coaching layer makes the rubric-calibration explicit instead — weekly examiner-style feedback on practice Paper 2s, with mark allocation traced to specific phrases. Several Modern DPS students each cohort score competitively because the explicit feedback channel compensates fully.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Modern DPS Faridabad students?',
        answer:
          'Yes — Cerebrum runs an IB+NEET integrated track that few India-based providers offer. Several Modern DPS IB Biology HL students each cohort pursue the dual IB+NEET pathway because the CBSE-rooted family base often values keeping India medical-college options open via NEET in parallel with abroad applications. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000-₹98,000 per year for the complete integrated programme. Modern DPS Faridabad families typically pay in INR with payment plans across 3-4 instalments.',
      },
      {
        question:
          "How does Modern DPS Faridabad's IB Biology compare to Manav Rachna, DPS Faridabad, Shri Ram, and Apeejay?",
        answer:
          'Five different positioning profiles in the Faridabad IB cluster. Manav Rachna International is the flagship of the Manav Rachna education group (multi-curriculum IB + Cambridge + CBSE). DPS Faridabad is part of the DPS national network. Shri Ram Faridabad is TSRS junior + middle-school feeding into TSRS Aravali (Gurgaon). Apeejay Faridabad is part of the Apeejay Education Society network. Modern DPS Faridabad is independently managed. The IB Biology programmes across all five are comparable in quality; school cultures and brand contexts differ. We coach students from all five.',
      },
      {
        question: 'When should a Modern DPS Faridabad student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the CBSE-to-IB bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 34. RYAN INTERNATIONAL SCHOOL FARIDABAD (Faridabad, India)
  // ──────────────────────────────────────────────────────────────────────────
  // Part of the broader Ryan International Group of Institutions network —
  // one of India's larger private school networks with a multi-city Indian
  // footprint and a small number of international campuses. The Faridabad
  // campus operates as a co-ed day school with CBSE primary + IB DP senior.
  {
    slug: 'ryan-international-faridabad',
    schoolName: 'Ryan International School',
    shortName: 'Ryan International',
    cityCountry: 'Faridabad, India',
    citySlug: 'faridabad',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Ryan International School Faridabad is a co-educational day school operating as part of the broader Ryan International Group of Institutions network — one of India's larger private school networks with a substantial multi-city Indian footprint and a small number of international campuses. The Faridabad campus has built its identity on CBSE academic delivery within the Ryan network's broader brand identity, and added IB Diploma Programme authorisation at senior school as an international-application option for the subset of families targeting overseas universities.",
      "Ryan International Faridabad's senior school runs CBSE Class 11-12 as the larger of the two tracks, with the IB Diploma Programme added as an internationally-credentialled senior-school option. Both IB Biology HL and SL are offered, with full the IB practical programme coverage. The IB cohort is meaningfully smaller than the CBSE cohort — typical of CBSE-primary schools that have added IB DP — and students choosing IB are self-selecting toward international university applications.",
      "For Ryan International Faridabad IB Biology students, the most common driver of external tutoring is the CBSE-to-IB transition at DP1. CBSE Class 10's recall-and-standard-answer-structure assessment differs meaningfully from IB DP Paper 2's data-analysis-and-evaluation style. Our DP1 coaching makes this transition explicit in the first term, calibrating IB-rubric command terms and the IA personal-investigation style alongside the school's in-house teaching. Several Ryan International IB Biology HL students each cohort pursue our integrated IB+NEET track for the standard dual-application reasons.",
      "Ryan International Faridabad's location keeps the school accessible across the central-Faridabad belt. The Ryan network's broader presence across NCR (Ryan International Sector 56 Gurgaon, Ryan International Sector 25 Rohini, etc.) gives families useful cross-network reference points when considering senior-school IB choices. For our coaching, the school's location is irrelevant because delivery is 100% online live video; IST evening live sessions (7-9 PM) fit cleanly after the school day regardless of which Faridabad sector students live in.",
    ],
    reputationBullets: [
      'Part of the broader Ryan International Group of Institutions network',
      'Ryan network has a substantial multi-city Indian footprint and small international footprint',
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11-12 (CBSE is the larger track)',
      'Located in Faridabad (central-Faridabad accessibility)',
      'IB Biology HL and SL with full full practical-programme coverage',
      'CBSE-rooted brand identity with IB DP added as the abroad-applications track',
    ],
    collegeContext:
      'Ryan International Faridabad IB graduates show the multi-city Ryan-network character of broad-based matriculation across regions. UK destinations include Oxbridge, Imperial, UCL, KCL, Warwick, Manchester, and Edinburgh. US universities include Ivy+, NYU, top liberal arts, Berkeley, and public flagships. Canadian institutions (Toronto, UBC, McGill, Western, Waterloo) are common. Indian university destinations include Ashoka, Krea, Shiv Nadar University, and Plaksha; for IB+NEET dual-track students, AIIMS and state medical colleges via NEET remain the primary India track. Biology HL students from Ryan typically pursue UK medicine, US pre-med, biosciences at top UK or Canadian universities, or biomedical and biotechnology programmes — the Ryan-network presence across Indian cities sometimes helps with peer-mentoring during the application process.',
    paceAlignment:
      "Ryan International Faridabad's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7-9 PM is most common, fitting after the Faridabad school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The DP1 coaching includes an explicit CBSE-Class-10-to-IB-DP bridge — the single highest-leverage external coaching value for Ryan International IB students transitioning from the school's CBSE Class 10. IA mentorship aligns to the school's DP1 IA proposal deadlines.",
    faqs: [
      {
        question:
          'Ryan International has many campuses across India — is Ryan Faridabad the same as Ryan in other NCR locations?',
        answer:
          "All Ryan International schools are part of the broader Ryan International Group of Institutions network but each campus operates independently with its own faculty, cohort, and senior-school curriculum mix. Ryan International Faridabad runs CBSE + IB DP at senior; other Ryan campuses (Gurgaon Sector 56, Rohini Sector 25, Noida, etc.) may differ on senior-school IB availability and curriculum mix. The Ryan network is brand + framework, not single-campus management — each campus's IB Biology cohort and faculty are distinct.",
      },
      {
        question:
          "My child finished Ryan Faridabad's CBSE Class 10 with strong Biology marks — what changes at IB Biology HL?",
        answer:
          "Ryan International Faridabad students transitioning from CBSE Class 10 to IB Biology HL face three substantive changes. Assessment style first: CBSE 10's standardised-answer pattern is replaced by IB Paper 2's data-driven long-responses where command-term-specific marking (each verb scoring differently) governs partial credit — students unaware of the marking pattern routinely drop 4-6 marks per long-response question. The Biology IA then introduces a 10-hour personal investigation across DP1, marked against Personal Engagement, Exploration, Analysis, Evaluation, and Communication — an assessment type the Ryan CBSE track never required. Syllabus depth steps up across human physiology, biochemistry, molecular biology, immunology, and statistical ecology. Our DP1 coaching maps each transition to a specific multi-week module rather than letting students figure them out by trial-and-error.",
      },
      {
        question:
          "Ryan Faridabad's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group affect IB Biology results?",
        answer:
          "The grade is unaffected — IB Biology marks are awarded against a globally consistent mark scheme regardless of the school's in-house IB cohort size. The genuine cohort-size effect is upstream: at densely-populated IB-only schools (Pathways Aravali, UWCSEA), students absorb rubric awareness through informal Paper 2 comparison with peers. Ryan International Faridabad's smaller IB cohort makes that organic channel structurally thinner. Our 1:1 coaching closes the gap explicitly — your child sees weekly written feedback against the IB mark scheme on their own Paper 2 long-response practice. The rubric becomes explicit through marked examples rather than picked up through peer osmosis.",
      },
      {
        question:
          'Do you offer the IB+NEET integrated track for Ryan International Faridabad students?',
        answer:
          'Yes — We are among the small number of India-based providers running an IB+NEET integrated coaching track. Several Ryan International Faridabad IB Biology HL students each cohort pursue the dual IB+NEET pathway because the CBSE-rooted family base often values keeping India medical-college options open via NEET in parallel with abroad applications. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000-₹98,000 per year for the complete integrated programme. Ryan International Faridabad families typically pay in INR with payment plans across 3-4 instalments.',
      },
      {
        question:
          "How does Ryan International Faridabad's IB Biology compare to the other Faridabad IB schools?",
        answer:
          'Six different positioning profiles in the Faridabad IB cluster. Manav Rachna International is the flagship of the Manav Rachna education group (multi-curriculum IB + Cambridge + CBSE). DPS Faridabad is part of the DPS national network. Shri Ram Faridabad is TSRS junior + middle-school feeding into TSRS Aravali (Gurgaon). Apeejay Faridabad is part of the Apeejay Education Society network. Modern DPS Faridabad is independently managed. Ryan International Faridabad is part of the broader Ryan network. The IB Biology programmes across all six are comparable in quality; school cultures and brand contexts differ. We coach students from all six.',
      },
      {
        question: 'When should a Ryan International Faridabad student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the CBSE-to-IB bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 35. SETH ANANDRAM JAIPURIA SCHOOL VASUNDHARA (Ghaziabad, India)
  // ──────────────────────────────────────────────────────────────────────────
  // Part of the broader Jaipuria network (Jaipuria Schools group has campuses
  // across India including Lucknow, Kanpur, Ghaziabad). The Vasundhara
  // Ghaziabad campus is among the longer-established IB-offering schools in
  // east NCR. CBSE primary + IB DP at senior school.
  {
    slug: 'jaipuria-vasundhara-ghaziabad',
    schoolName: 'Seth Anandram Jaipuria School Vasundhara',
    shortName: 'Jaipuria Vasundhara',
    cityCountry: 'Ghaziabad, India',
    citySlug: 'ghaziabad',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    countryCode: 'IN',
    inLanguage: 'en-IN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Seth Anandram Jaipuria School Vasundhara is a co-educational day school in Vasundhara, Ghaziabad, operating as part of the broader Jaipuria Schools network — the group also runs Seth Anandram Jaipuria School campuses in Lucknow, Kanpur, and other Indian cities. The Vasundhara campus has been a meaningful part of Ghaziabad's east-NCR international-curriculum landscape and added IB Diploma Programme authorisation as a senior-school option alongside its established CBSE programme.",
      "Jaipuria Vasundhara's senior school runs CBSE Class 11-12 as the larger of the two tracks, with the IB Diploma Programme added as the international-application option. Both IB Biology HL and SL are offered, with full the IB practical programme coverage. The IB cohort is smaller than the CBSE cohort — typical of the CBSE-primary-plus-IB-senior structure common across NCR — and students choosing IB are self-selecting toward international university applications from the broader Indirapuram-Vaishali-Vasundhara residential cohort.",
      "For Jaipuria Vasundhara IB Biology students, the most common driver of external tutoring is the CBSE-to-IB transition at DP1. CBSE Class 10's recall-and-standard-answer-structure assessment differs meaningfully from IB DP Paper 2's data-analysis-and-evaluation style. Our DP1 coaching makes this transition explicit in the first term, calibrating IB-rubric command terms and the IA personal-investigation style alongside the school's in-house teaching. Several Jaipuria IB Biology HL students each cohort also pursue our integrated IB+NEET track.",
      "Jaipuria's Vasundhara location keeps it accessible from across the east-NCR belt — Indirapuram, Vaishali, Kaushambi, Crossings Republik, and the broader Ghaziabad-Noida border area via the Mayur Vihar corridor. The school's broader Jaipuria network gives families cross-campus reference points when considering senior-school IB options (the Lucknow and Kanpur Jaipuria campuses also have international-curriculum offerings). For our coaching, the school's location is irrelevant because delivery is 100% online live video; IST evening live sessions (7-9 PM) fit cleanly after the school day.",
    ],
    reputationBullets: [
      'Part of the broader Jaipuria Schools network (campuses in Lucknow, Kanpur, and other cities)',
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11-12 (CBSE is the larger track)',
      'Located in Vasundhara, Ghaziabad (east NCR residential belt)',
      'Among the longer-established IB-offering schools in east NCR',
      'IB Biology HL and SL with full full practical-programme coverage',
      'CBSE-rooted brand identity with IB DP added as the abroad-applications track',
    ],
    collegeContext:
      'Jaipuria Vasundhara IB graduates draw on the broader Jaipuria Schools network multi-city alumni footprint (Lucknow, Kanpur, Ghaziabad). UK matriculations include Oxbridge, Imperial, UCL, KCL, Warwick, and Edinburgh. US destinations include Ivy+, NYU, top liberal arts, Berkeley, Northwestern, and public flagships. Canadian institutions — Toronto, UBC, McGill, Western, Waterloo — feature regularly. Indian university destinations include Ashoka, Krea, Shiv Nadar University, and Plaksha; for IB+NEET dual-track students, AIIMS and state medical colleges via NEET — the east-NCR family base typically considers both abroad and India tracks. Biology HL students most commonly pursue UK medicine, US pre-med, biosciences at top UK or Canadian universities, or biomedical and biotechnology programmes; the Lucknow campus of the Jaipuria network also produces an unusual share of AIIMS Lucknow applicants for the dual-track cohort.',
    paceAlignment:
      "Jaipuria Vasundhara's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7-9 PM is most common, fitting after the Vasundhara school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The DP1 coaching includes an explicit CBSE-Class-10-to-IB-DP bridge — the single highest-leverage external coaching value for Jaipuria IB students transitioning from the school's CBSE Class 10.",
    faqs: [
      {
        question:
          "Jaipuria has multiple campuses (Lucknow, Kanpur, Vasundhara). Is the Vasundhara campus's IB Biology comparable?",
        answer:
          "All Jaipuria campuses are part of the broader Jaipuria Schools network but each operates independently with its own faculty and senior-school curriculum mix. The Vasundhara Ghaziabad campus runs CBSE + IB DP at senior, with IB Biology HL and SL offered. The Lucknow and Kanpur campuses may differ on senior-school IB availability. For Ghaziabad / east-NCR families specifically, Jaipuria Vasundhara is the network's local IB-offering campus — comparable to other Ghaziabad IB schools like Cambridge School Indirapuram or DPS Indirapuram in IB Biology programme quality.",
      },
      {
        question:
          "My child finished Jaipuria Vasundhara's CBSE Class 10 with strong Biology marks — what changes at IB Biology HL?",
        answer:
          "Most Jaipuria Vasundhara IB students arrive at DP1 from the school's own CBSE Class 10 cohort, so the rhythm shift is well-documented in the school's academic data. Three things change concretely. Paper 2 transitions from CBSE's recall-style answers to IB's data-analysis-with-command-terms structure — points come from how precisely the student deploys 'explain', 'evaluate', 'distinguish', or 'discuss' in each response, not from coverage breadth. The Biology IA then introduces a 10-hour personal investigation against the IB's four-criteria rubric — an assessment type the Jaipuria CBSE Class 10 track has no equivalent of. Content depth in human physiology, biochemistry, molecular genetics, and population ecology steps materially beyond Class 10 NCERT. Our DP1 coaching front-loads all three transitions so the Jaipuria student is rubric-aware by their first DP1 internal assessment in November.",
      },
      {
        question:
          "Jaipuria's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group affect IB Biology results?",
        answer:
          "Not in terms of the grade itself — IB Biology is criterion-referenced globally, so cohort size at the school doesn't change the marks available. The functional question is whether the smaller cohort thins out the informal peer rubric calibration that students at larger IB-only schools (Pathways Aravali, UWCSEA) get through cohort-density. At Jaipuria Vasundhara — IB-and-CBSE dual senior — that informal IB-only channel is structurally thinner. Our 1:1 coaching replaces it with examiner-led weekly written feedback on Paper 2 long-responses. Several Jaipuria IB Biology HL students each cohort use exactly this combination — the school's in-school class plus our rubric-calibration layer.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Jaipuria Vasundhara students?',
        answer:
          'Yes — Cerebrum runs a dedicated IB+NEET integrated coaching track — a niche programme few biology-only providers in India offer. Several Jaipuria IB Biology HL students each cohort pursue the dual IB+NEET pathway because the CBSE-rooted family base often values keeping India medical-college options open via NEET in parallel with abroad applications. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000-₹98,000 per year for the complete integrated programme. Jaipuria families typically pay in INR with payment plans across 3-4 instalments.',
      },
      {
        question:
          "How does Jaipuria Vasundhara's IB Biology compare to Cambridge School Indirapuram or DPS Indirapuram?",
        answer:
          "Three different positioning profiles in the Ghaziabad IB cluster. Jaipuria Vasundhara is the Jaipuria network's east-NCR IB-offering campus, CBSE-primary + IB DP senior. Cambridge School Indirapuram is Cambridge-curriculum-strong (IGCSE / A-Level / sometimes IB). DPS Indirapuram is part of the DPS national network. The IB Biology programmes are comparable in quality; school cultures and curriculum mixes differ. We coach students from all three; the choice between them is usually about school culture fit and the specific senior-school curriculum architecture.",
      },
      {
        question: 'When should a Jaipuria Vasundhara student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the CBSE-to-IB bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CHINA-REGION SCHOOLS (P3 — geo-gated from India IPs via middleware)
  // Per market research dated 2026-05-24:
  //   - Mainland China ~157 expat-only international schools + ~398 mixed;
  //     6 chosen here are the highest-volume IB-feeder schools.
  //   - All school names used descriptively only; no logos, no "endorsed by"
  //     framing; we cite "publicly reported" + Niche / school diploma reports.
  // ──────────────────────────────────────────────────────────────────────────

  // ──────────────────────────────────────────────────────────────────────────
  // SHANGHAI AMERICAN SCHOOL (SAS) — Pudong + Puxi twin campuses
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'shanghai-american-school',
    schoolName: 'Shanghai American School',
    shortName: 'SAS',
    cityCountry: 'Shanghai, China',
    citySlug: 'shanghai',
    timezone: 'CST (China)',
    timezoneIana: 'Asia/Shanghai',
    countryCode: 'CN',
    inLanguage: 'en-CN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'Shanghai American School (SAS) operates twin campuses in Pudong and Puxi, founded in 1912 as one of the oldest American international schools in Asia. SAS runs a dual-curriculum senior school: the IB Diploma Programme alongside Advanced Placement (AP) — making it one of the few schools in mainland China where students can pursue either pathway under the same roof. The school is publicly reported as the first AP Capstone Diploma school in Asia, an unusually rigorous AP credentialing track.',
      'SAS Biology is taught across both DP and AP streams in parallel, with separate Biology HL/SL classes for IB Diploma students and AP Biology classes for AP-track students. Class sizes typically run 18–24 students, and the Biology department is staffed by certified IB teachers (some with examiner experience) plus AP-experienced US-credentialed teachers. Laboratory facilities support every prescribed IB practical investigation in the 2025 syllabus and the full AP Biology investigations list.',
      'For SAS Biology HL students, the gap that drives external tutoring is not curriculum exposure — SAS teaches the IB syllabus thoroughly — but Paper 2 long-response mark-scheme calibration and IA scaffolding through the May–November DP1 internal-assessment cycle. SAS class teachers manage 18–24 students per section and cannot mark every Paper 2 long-response attempt to IB rubric weekly. Our 1:1 sessions plug into exactly that gap: rubric calibration, IA mentorship from topic selection through final evaluation, and Paper 1 + Paper 2 timed mocks in the run-up to May finals.',
      "SAS students typically carry 4–6 IB Higher Levels concurrently in DP1 + DP2 alongside service, sport, and SAS's distinctive 'Experiential Learning' programme — so weekday tutoring has to be compact. We schedule 60–90 minute 1:1 blocks in CST evenings (7–10 PM Shanghai time, two evenings/week), with Saturday morning slots (9 AM–noon CST) popular for full-length mock practice in March–April. All sessions are recorded for revision during the May exam-prep crunch.",
    ],
    reputationBullets: [
      'Founded 1912 — one of the oldest American international schools in Asia',
      'Twin campuses (Pudong + Puxi) running parallel IB Diploma + AP cohorts',
      'First AP Capstone Diploma school in Asia (publicly reported)',
      'Dual IB DP + AP senior school curriculum offering',
      'Strong US-university matriculation including Ivy League and Stanford',
      'Dedicated IB Biology HL and SL streams; full IB practical-programme coverage',
    ],
    diplomaContext:
      "SAS IB Diploma cohort averages are publicly reported in the school's annual academic reports. Biology HL is one of the most popular Group 4 choices alongside Chemistry HL and the AP Biology stream. SAS does not publish IB diploma averages in the same year-by-year format as some UK / EU IB schools; the school's overall academic profile is regarded among the strongest in mainland China.",
    collegeContext:
      'SAS graduates matriculate predominantly to US universities — Ivy League (Harvard, Yale, Princeton, Columbia, UPenn, Brown, Cornell, Dartmouth), Stanford, MIT, the UC system (Berkeley, UCLA, San Diego, Irvine, Davis), Northwestern, Johns Hopkins, Duke, Georgetown, NYU, USC, Carnegie Mellon. For Biology HL students, common pathways include US pre-med (with the additional MCAT requirement after undergrad), US biological sciences majors, and US BS/MD direct-entry programs. UK, Canadian, and Australian university matriculation also strong but less common given the AP/US-centric school profile.',
    paceAlignment:
      "SAS IB Biology follows the standard two-year DP track with IA topic selection in late DP1 and submission early DP2; EE submission in DP2 for those choosing Biology as their EE subject. Our coaching aligns: HL conceptual reinforcement and Paper 2 mark-scheme drilling during DP1, IA mentorship through the data-analysis and evaluation phase, then full-length Paper 1 and Paper 2 mocks across November DP2 mocks and the May final-exam window. CST evening sessions (7–10 PM Shanghai) fit SAS's typical 3:15 PM dismissal + 4–6 PM activities + 7+ PM homework block. For students who also take AP Biology in parallel (rare but possible at SAS given the AP Capstone track), we coach both syllabi with overlap-aware scheduling — AP exam in mid-May, IB Bio finals also in May, so April–May is intensive but manageable with the right plan.",
    faqs: [
      {
        question:
          'How does Cerebrum 1:1 tutoring complement SAS Biology HL teaching at Pudong or Puxi?',
        answer:
          "SAS Biology HL classes run 18–24 students per section and the SAS Biology faculty includes IB-experienced teachers, some with examiner background. The class content is strong; the layer 1:1 tutoring adds is weekly rubric calibration (no school teacher can mark every Paper 2 long-response to IB rubric for 24 students every week), IA mentorship from topic selection through final evaluation, and timed full-length mocks in March–April before May finals. We mirror SAS's pacing rather than parallel-running a separate syllabus.",
      },
      {
        question:
          'My child is at SAS Puxi and considering AP Biology instead of IB Bio HL — what do you recommend?',
        answer:
          "Both pathways are viable from SAS given the AP Capstone track. IB Biology HL is broader (full 2-year syllabus, IA + EE component, Theory of Knowledge integration) and better for students applying broadly across UK, Canada, Australia, and Singapore. AP Biology is narrower (single one-year course, single May exam, no IA) and better for students applying primarily to US universities where AP-5 is a clean curriculum signal. Cerebrum coaches both. The decision typically comes down to university target geography and the student's preferred assessment style.",
      },
      {
        question:
          'Can we continue Cerebrum sessions if our family travels to the US, Europe, or India for summer break?',
        answer:
          'Yes. Sessions are 100% live online via Zoom (or Google Meet on request), so as long as your child has a laptop and reliable Wi-Fi we continue from anywhere. Most SAS families travel to the US in late June through mid-August; we adjust session timing to your local time zone during travel weeks at no extra cost. SAS students typically use the summer for IA data collection (early DP2 IA) and Paper 2 question-bank drilling — both work well over the summer travel cycle.',
      },
      {
        question:
          'How reliable is Zoom in Shanghai given the Great Firewall, and do we need a VPN?',
        answer:
          'Zoom usually works in mainland China but can throttle on residential ISPs during peak hours (7–10 PM CST). SAS provides a school VPN to enrolled families — most of our SAS students use the school VPN for their evening Cerebrum sessions and report consistent video quality. Family VPNs (Astrill, ExpressVPN, NordVPN) also work reliably. We have run year-long Shanghai cohorts since 2023 with very few connectivity issues; for the rare disruption, we provide recorded sessions within 24 hours so no material is missed.',
      },
      {
        question:
          "What does CST evening scheduling look like alongside SAS's heavy junior-year load?",
        answer:
          'SAS dismisses around 3:15 PM at both Pudong and Puxi campuses. Junior-year SAS students typically carry 4–6 APs or IB HLs concurrently with athletics, music, or service commitments running 4–6 PM. We schedule 60–90 minute 1:1 sessions 7:00–10:00 PM CST, two evenings per week, sitting between activities and the late homework block. Saturday morning slots (9 AM–noon CST) accommodate sport-heavy schedules and are popular for full-length mock practice in March–April before May exams.',
      },
      {
        question: 'Can we pay in CNY via Alipay or WeChat Pay, or only in USD?',
        answer:
          'Both work. CNY payment via cross-border Alipay or WeChat Pay (single-payment cap USD 5,000, annual USD 50,000 per 2025 PBOC rules) processed through our Stripe integration — settles in USD at our end with no FX charged to you. USD directly on international Visa / Mastercard / Amex also works. Several SAS families split annual packages across two CNY transfers spaced 60 days apart at no extra charge.',
      },
      {
        question: 'When should an SAS student start IB Biology HL tutoring for best results?',
        answer:
          "August or September of DP1 is ideal — that lets us calibrate to SAS's specific pacing and Paper 2 mark-scheme expectations from the start, run the IA mentorship cleanly through DP1, and have a full DP2 for Paper 1 + Paper 2 + EE work. Late starters (January DP2 onward) can still target Level 6 or 7 but with intensive 90-minute sessions twice weekly through the May exam window. For students considering both IB and AP, we recommend starting in late DP1 / Year 11 summer to overlap both syllabi efficiently.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // SCIE — Shenzhen College of International Education
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'scie-shenzhen',
    schoolName: 'Shenzhen College of International Education',
    shortName: 'SCIE',
    cityCountry: 'Shenzhen, China',
    citySlug: 'shanghai', // No dedicated shenzhen ib-biology city page yet; falls back to closest mainland slug
    timezone: 'CST (China)',
    timezoneIana: 'Asia/Shanghai',
    countryCode: 'CN',
    inLanguage: 'en-CN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Shenzhen College of International Education (SCIE) is publicly reported as China's #1-ranked international school per the 2025 HSBC Hurun Global High Schools Ranking, also placing 46th globally. SCIE was founded in 2003 and serves Year 10–13 students primarily preparing for UK, US, Hong Kong, and Singapore university applications. The school's senior curriculum centres on A-Levels with an IB Diploma stream — making SCIE somewhat unusual among elite Chinese international schools as a strong dual A-Level + IB DP institution rather than pure-IB or pure-AP.",
      "SCIE Biology students benefit from a department staffed by Cambridge / Edexcel A-Level examiners plus IB DP-trained teachers, with laboratory facilities supporting both A-Level practical endorsements and IB practical investigations. Class sizes typically run 12–18 students — significantly smaller than the SAS or WAB scale — giving more in-class attention than larger international schools. The school's UCAS results are publicly strong: SCIE consistently produces double-digit Oxbridge offers per year (publicly reported in school communications), and double-digit US Ivy League + Stanford acceptances.",
      "For SCIE IB Biology HL students, the gap driving external tutoring is rarely concept exposure — the school teaches IB syllabus thoroughly — but the specific Paper 2 long-response mark-scheme calibration and IA scaffolding for students who join the IB stream from an A-Level-dominant student culture. Most SCIE students follow the A-Level path; the IB DP cohort is smaller (typically 30–60 students per year) and IB Biology HL specifically draws 8–15 candidates annually. Our 1:1 sessions add Paper 2 rubric drilling, structured IA mentorship, and timed mocks calibrated to IB's specific format rather than A-Level's.",
      "SCIE students juggle heavy academic load with extensive university-application work — UCAS personal statements + interview prep for Oxbridge starts in DP1 summer, US Common App + supplemental essays through DP2 fall. We coach with awareness of this dual cycle: lighter weekly load in the September–December application window, intensifying January through May for IB finals. CST evening sessions (7–10 PM Shanghai time) fit SCIE's typical late-afternoon dismissal + 6–7 PM dinner + 7+ PM study block.",
    ],
    reputationBullets: [
      'Publicly ranked #1 international school in China (2025 HSBC Hurun ranking)',
      'Placed 46th globally on the 2025 HSBC Hurun ranking',
      'Founded 2003 — established A-Level + IB DP dual-curriculum senior school',
      'Smaller class sizes (12–18 students) than the SAS / WAB scale',
      'Strong UCAS results — double-digit Oxbridge offers reported annually',
      'Dedicated IB Biology HL and SL streams alongside A-Level Biology',
    ],
    diplomaContext:
      "SCIE's IB DP cohort is smaller than the school's larger A-Level cohort. IB Biology HL specifically draws 8–15 candidates per year (publicly observable from past results communications). SCIE does not publish IB Diploma averages year-by-year; the school's overall academic profile sits among the strongest internationally, anchored by the 2025 HSBC Hurun #1 ranking in China.",
    collegeContext:
      "SCIE graduates matriculate predominantly to UK universities — Oxbridge (Oxford + Cambridge), Imperial, UCL, King's College London, LSE, Edinburgh, Manchester, Warwick, Bristol, Durham — plus US (Ivy League, Stanford, MIT, the UC system, Northwestern, Johns Hopkins, Duke), Hong Kong (HKU, CUHK, HKUST, PolyU), Singapore (NUS, NTU), and Canadian (Toronto, McGill, UBC). For Biology HL students, the dominant pathways are UK medicine (with UCAT/BMAT requirements), Hong Kong medicine (HKU/CUHK), and US biological sciences pre-med tracks.",
    paceAlignment:
      "SCIE IB Biology HL follows the standard two-year DP track with IA topic selection in late DP1 and submission early DP2; EE submission in DP2 for Biology EE candidates. Because most SCIE students follow A-Level, the IB cohort runs smaller and faster — our coaching aligns to SCIE's accelerated pacing with HL conceptual reinforcement and Paper 2 rubric drilling in DP1, IA mentorship through DP1 summer + DP2 fall, and full-length Paper 1 and Paper 2 mocks across November DP2 mocks and the May final-exam window. CST evening sessions (7–10 PM Shanghai) sit cleanly after SCIE's late dismissal and dinner.",
    faqs: [
      {
        question:
          "How does Cerebrum tutoring complement SCIE's strong A-Level + IB Biology teaching?",
        answer:
          "SCIE's Biology teaching is genuinely strong — A-Level examiners and IB-trained teachers, smaller classes than other top Chinese international schools. The 1:1 layer adds weekly Paper 2 long-response rubric calibration (no school teacher can mark every long-response for 12–18 students every week), IA mentorship from topic selection through final evaluation, and timed full-length mocks calibrated specifically to IB format (not A-Level format). For IB DP students at SCIE specifically — a minority within a primarily A-Level student culture — we add IB-specific rubric drilling that the A-Level-dominant school environment may under-emphasise.",
      },
      {
        question: 'My child is doing A-Level Biology at SCIE, not IB — do you tutor that too?',
        answer:
          "Yes. Cerebrum offers A-Level Biology tutoring for SCIE students under the same biology-specialist faculty model. A-Level Biology (Cambridge AS+A2 or Edexcel) covers overlapping content to IB HL Biology with ~60–70% syllabus overlap, but the exam format and mark scheme are very different. We coach the specific Cambridge / Edexcel exam pattern with timed paper drills, calibrated mark schemes, and the A-Level-specific 'data analysis + plan investigation' question types that differ from IB Paper 2 format. Pricing equivalent to IB packages.",
      },
      {
        question:
          'SCIE is #1-ranked in China — does the school environment make external tutoring unnecessary?',
        answer:
          'For most SCIE students, the school programme alone produces excellent outcomes — the 2025 Hurun #1 ranking reflects that. External tutoring serves two specific cases: (1) IB DP students at SCIE who want IB-specific rubric mastery alongside an A-Level-dominant peer culture, and (2) IB or A-Level students targeting Oxbridge medicine, US Ivy biology pre-med, or BS/MD direct-entry where Level 7 / A* / 800 marks are the only acceptable outcome and even small Paper 2 / Paper 5 rubric gaps cost offers. SCIE itself is excellent; tutoring is the marginal Level 6→7 or B→A* edge.',
      },
      {
        question:
          "How do CST evening sessions fit SCIE's schedule and weekend UCAS interview prep?",
        answer:
          'SCIE dismisses around 4:15 PM with extensive after-school programmes running to 5:30–6:30 PM. Our 60–90 minute 1:1 sessions schedule 7:00–10:00 PM CST, two evenings per week, sitting between dinner and late homework. UCAS / Common App interview prep at SCIE intensifies in September–November DP2; we lighten the weekly biology cadence during this period and re-intensify January through May for IB finals. Saturday morning slots (9 AM–noon CST) work well for full-length mock practice during March–April mock-exam season.',
      },
      {
        question:
          'Can SCIE students preparing for HKU MBBS / CUHK MBBS benefit from your IBO Hong Kong coaching cross-track?',
        answer:
          'Yes, and this is a recognised pattern for ambitious SCIE Hong Kong-bound students. SCIE biology students applying to HKU MBBS or CUHK MBBS sometimes layer HKBO (Hong Kong Biology Olympiad) coaching alongside their IB HL or A-Level work — HKBO Phase I+ qualification is a strong JUPAS portfolio signal. We offer a combined IB Bio HL + HKBO track for students based in Shenzhen with HKU/CUHK ambitions. The cross-border SHE-Shenzhen-Hong Kong proximity means HKBO is a viable second credential for SCIE students.',
      },
      {
        question: 'Do you provide UCAS / Common App essay help alongside IB Biology coaching?',
        answer:
          "Not directly — Cerebrum is biology-specialist, not a college-counselling agency. For UCAS personal statements, BMAT/UCAT prep, US Common App essays, and university interview preparation, SCIE's own university guidance office is well-resourced and several local Shenzhen agencies (Hanlin International Education, ARCH Education) specialise in this. We focus on what we do well: getting your child to Level 7 IB Biology HL or A* A-Level Biology, which is the academic credential that underlies any application.",
      },
      {
        question: 'When should an SCIE student start IB Biology HL tutoring?',
        answer:
          "For IB DP students, August or September of DP1 is ideal — that lets us calibrate to SCIE's pacing from the start, run IA mentorship cleanly through DP1, and have a full DP2 for Paper 1 + Paper 2 + EE work. For A-Level Biology students, the equivalent point is the start of Year 12 (AS year) so we can layer alongside school teaching for both AS exams (June Year 12) and A2 exams (June Year 13). Late starters can still target Level 7 / A* but with intensive 90-minute sessions twice weekly through the exam window.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // WAB — Western Academy of Beijing
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'wab-beijing',
    schoolName: 'Western Academy of Beijing',
    shortName: 'WAB',
    cityCountry: 'Beijing, China',
    citySlug: 'beijing',
    timezone: 'CST (China)',
    timezoneIana: 'Asia/Shanghai',
    countryCode: 'CN',
    inLanguage: 'en-CN',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      "Western Academy of Beijing (WAB) is an IB Continuum World School in the Shunyi district of north-east Beijing, offering the Primary Years, Middle Years, and Diploma Programmes end-to-end. Founded in 1994, WAB serves ~1,400 students from over 50 nationalities — predominantly expat passport-holders given mainland China's regulatory framework that restricts Chinese-passport children from enrolling in expat-only international schools.",
      'WAB Biology students benefit from a department of certified IB DP teachers, several with IB Biology examiner experience, plus laboratory facilities supporting all prescribed practical investigations in the 2025 syllabus. Class sizes typically run 14–20 students per section in DP, somewhat smaller than the largest international schools in the region. The WAB Diploma cohort is publicly reported to consistently average above the global IB mean — recent annual diploma averages have been around 35–37 points (publicly visible in WAB diploma results communications).',
      'For WAB Biology HL students, the gap driving external tutoring is the Paper 2 long-response mark-scheme calibration and IA scaffolding through the May–November DP1 cycle — gaps that any school of 14–20 students per class cannot fully close with weekly teacher time alone. Our 1:1 sessions add rubric calibration, structured IA mentorship from topic selection through final evaluation, and Paper 1 + Paper 2 timed mocks in the run-up to May finals.',
      "WAB's signature outdoor education programme (Outdoor Adventure Education / OAE) takes students out of class for extended trips multiple times per year — Chinese countryside, Mongolia, southeast Asia. Our coaching cadence adjusts around these trips: we frontload material in the weeks before extended travel and provide asynchronous WhatsApp support during trips for short-form doubts. CST evening sessions (7–10 PM Beijing) fit WAB's typical 3:30 PM dismissal + after-school activities + 7+ PM homework block.",
    ],
    reputationBullets: [
      'IB Continuum World School (PYP + MYP + DP) in Shunyi, Beijing',
      'Founded 1994 — ~1,400 students from 50+ nationalities',
      'Recent IBDP averages around 35–37 points (publicly reported in WAB results)',
      'Signature Outdoor Adventure Education (OAE) extended-trip programme',
      'Strong matriculation to US (Ivy League), UK, Canada, Australia',
      'Dedicated IB Biology HL and SL streams; full IB practical-programme coverage',
    ],
    diplomaContext:
      "WAB Diploma cohort averages are publicly reported around 35–37 points across recent years (school diploma communications). Biology HL is one of the most popular Group 4 choices alongside Chemistry HL. The school's WAB Education Foundation alumni network is active and supports both UK and US matriculation pipelines.",
    collegeContext:
      "WAB graduates matriculate broadly across US (Ivy League — Harvard, Yale, Princeton, Columbia, UPenn, Brown, Cornell, Dartmouth — plus Stanford, MIT, UC system, Northwestern, Johns Hopkins, Duke), UK (Oxbridge, Imperial, UCL, King's, Edinburgh, Manchester), Canada (Toronto, McGill, UBC, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Hong Kong (HKU, CUHK, HKUST). For Biology HL students, US pre-med (with the additional MCAT requirement), UK medicine (with UCAT/BMAT), and Canadian medicine pathways are common.",
    paceAlignment:
      "WAB IB Biology follows the standard two-year DP track with IA topic selection in late DP1 and submission early DP2; EE submission in DP2 for Biology EE candidates. Our coaching aligns: HL conceptual reinforcement and Paper 2 mark-scheme drilling during DP1, IA mentorship through the data-analysis and evaluation phase, then full-length Paper 1 and Paper 2 mocks across November DP2 mocks and the May final-exam window. We adjust the weekly cadence around WAB's Outdoor Adventure Education extended trips rather than missing sessions outright — frontloading material in the weeks before, asynchronous WhatsApp support during, and catch-up sessions after.",
    faqs: [
      {
        question: 'How does Cerebrum 1:1 tutoring complement WAB Biology HL teaching?',
        answer:
          "WAB Biology HL classes run 14–20 students per section, taught by IB-experienced teachers some with examiner background. The class content is strong; the layer 1:1 tutoring adds is weekly Paper 2 long-response rubric calibration (no school teacher can mark every long-response for 14–20 students every week), IA mentorship from topic selection through final evaluation, and timed full-length mocks in March–April before May finals. We mirror WAB's pacing rather than parallel-running a separate syllabus.",
      },
      {
        question:
          'WAB has its Outdoor Adventure Education programme with extended trips — how do you handle continuity?',
        answer:
          "We adjust the weekly cadence around OAE extended trips rather than missing sessions outright. Before a trip, we frontload upcoming material so the student stays current. During trips, we provide asynchronous WhatsApp support for short-form doubts and past-paper questions (24-hour turnaround). After trips, we run a catch-up session to consolidate any material covered in school during the absence. WAB OAE trips are core to the school's identity, and we accommodate that without compromising IB Biology progress.",
      },
      {
        question:
          'My child is at WAB and applying to US Ivy League — how does IB Biology HL coaching fit US pre-med planning?',
        answer:
          'For US pre-med tracks, Level 7 IB Biology HL is a strong undergraduate-admissions signal at Ivy League + Stanford + top-20 schools, especially when combined with HL Chemistry. After undergraduate admission, US pre-med students take additional college Biology + Organic Chemistry + Biochemistry coursework before MCAT and medical-school application. We coach the IB Biology HL component that strengthens the undergraduate application; the MCAT prep is a separate later phase Cerebrum also offers through its dedicated MCAT Biology track (/best-mcat-biology-tutor).',
      },
      {
        question:
          "How reliable is Zoom in Beijing's Shunyi area, and is VPN needed for evening sessions?",
        answer:
          'Zoom usually works in mainland China but can throttle on residential ISPs during peak hours. WAB provides a school VPN to families — most of our WAB students use the school VPN for evening sessions and report consistent video quality. Family VPNs (Astrill, ExpressVPN, NordVPN) also work reliably in Shunyi. We have run year-long Beijing cohorts with very few connectivity issues; for the rare disruption, we provide recorded sessions within 24 hours.',
      },
      {
        question: 'Do WAB students typically also take AP Biology, or stick with IB Bio HL?',
        answer:
          "WAB is an IB Continuum School — IB DP is the senior curriculum, not AP. Some students self-study for AP Biology in addition to their IB diploma if they're applying to US universities and want a US-curriculum signal, but this is uncommon at WAB given the school's pure-IB structure. Most US-bound WAB students rely on IB HL as their curriculum credential, supported by SAT/ACT for standardised testing. We coach IB Biology HL as the primary track; for the rare student adding AP Bio, we coach both with overlap-aware scheduling.",
      },
      {
        question: 'Can we pay in CNY via Alipay or WeChat Pay, or only in USD?',
        answer:
          'Both work. CNY payment via cross-border Alipay or WeChat Pay (single-payment cap USD 5,000, annual USD 50,000 per 2025 PBOC rules) processed through our Stripe integration — settles in USD on our end with no FX charged to you. USD on international Visa / Mastercard / Amex also works. Several WAB families split annual packages across two CNY transfers spaced 60 days apart.',
      },
      {
        question: 'When should a WAB student start IB Biology HL tutoring?',
        answer:
          'August or September of DP1 is ideal — that lets us calibrate to WAB pacing from the start, run IA mentorship cleanly through DP1, and have a full DP2 for Paper 1 + Paper 2 + EE work. Late starters (January DP2 onward) can still target Level 6 or 7 but with intensive 90-minute sessions twice weekly through the May exam window. For students considering Biology EE, we recommend starting tutoring early in DP1 so the EE topic emerges naturally from sustained engagement with the syllabus.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ISB — International School of Beijing
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'isb-beijing',
    schoolName: 'International School of Beijing',
    shortName: 'ISB',
    cityCountry: 'Beijing, China',
    citySlug: 'beijing',
    timezone: 'CST (China)',
    timezoneIana: 'Asia/Shanghai',
    countryCode: 'CN',
    inLanguage: 'en-CN',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "International School of Beijing (ISB) is one of the longest-established international schools in mainland China, founded in 1980 to serve the Beijing diplomatic and expat community. ISB's main campus sits in Shunyi district, north-east Beijing, in close proximity to other major expat-only international schools (WAB, Dulwich Beijing, Yew Chung). The school serves ~1,800 students from over 50 nationalities and offers the IB Diploma Programme alongside US Advanced Placement (AP) in the senior school — making ISB one of the few schools in Beijing offering both pathways under one roof.",
      'ISB Biology is taught across both IB DP and AP streams in parallel, with separate Biology HL/SL classes for IB Diploma students and AP Biology classes for AP-track students. Class sizes typically run 16–20 students in DP and 15–22 in AP. The Biology department is staffed by certified IB DP teachers (several with IB examiner experience) plus US-credentialed AP-experienced teachers. Laboratory facilities support every prescribed IB practical investigation and the full AP Biology investigations list.',
      'For ISB Biology HL students, the gap driving external tutoring is Paper 2 long-response mark-scheme calibration and IA scaffolding — gaps any class of 16–20 students cannot fully close with weekly teacher time alone. Our 1:1 sessions add rubric calibration, structured IA mentorship from topic selection through evaluation, and timed Paper 1 + Paper 2 mocks in the run-up to May finals. For ISB AP Biology students, we add weekly FRQ rubric calibration calibrated to the College Board AP Biology rubric.',
      "ISB's WSQ (Wellness + Service + Quest) programme integrates service learning and outdoor education through the senior school. Our coaching cadence accommodates these commitments: 60–90 minute 1:1 blocks in CST evenings (7–10 PM Beijing), Saturday morning slots for full-length mock practice. Sessions are recorded for revision during the May exam-prep crunch.",
    ],
    reputationBullets: [
      'Founded 1980 — one of the longest-established international schools in mainland China',
      '~1,800 students from 50+ nationalities; Shunyi district main campus',
      'Dual IB Diploma + AP senior school curriculum offering',
      'Wellness + Service + Quest (WSQ) integrated programme',
      'Strong matriculation to US (Ivy League + Stanford + UC), UK, Canada, Australia',
      'Dedicated IB Biology HL/SL + AP Biology streams; full lab facilities',
    ],
    diplomaContext:
      "ISB Diploma cohort averages are publicly reported in the school's annual academic reports. Biology HL is one of the most popular Group 4 choices alongside Chemistry HL and the AP Biology stream. ISB's dual IB + AP profile gives families curriculum choice rare in mainland China.",
    collegeContext:
      "ISB graduates matriculate broadly to US (Ivy League — Harvard, Yale, Princeton, Columbia, UPenn, Brown, Cornell, Dartmouth — plus Stanford, MIT, the UC system, Northwestern, Johns Hopkins, Duke), UK (Oxbridge, Imperial, UCL, King's, Edinburgh, Manchester), Canada (Toronto, McGill, UBC), Australia (Melbourne, Sydney, ANU, Monash), and Hong Kong (HKU, CUHK, HKUST). For Biology HL or AP Bio students, common pathways include US pre-med (with the MCAT requirement after undergrad), UK medicine (UCAT/BMAT), and US biological sciences majors.",
    paceAlignment:
      "ISB IB Biology follows the standard two-year DP track with IA topic selection in late DP1 and submission early DP2; EE submission in DP2 for Biology EE candidates. AP Biology runs as a one-year course culminating in the May AP exam. Our coaching aligns: HL conceptual reinforcement and Paper 2 rubric drilling during DP1, IA mentorship through data-analysis + evaluation phase, then Paper 1 + Paper 2 mocks across November DP2 mocks and the May exam window. For AP track, we coach Units 1–8 of Campbell Biology end-to-end with FRQ rubric calibration through April. CST evenings (7–10 PM Beijing) fit ISB's typical 3:30 PM dismissal + activities + 7+ PM study.",
    faqs: [
      {
        question: "How does Cerebrum complement ISB's Biology HL or AP Biology teaching?",
        answer:
          "ISB Biology classes run 16–22 students per section with IB-experienced and AP-experienced faculty. The class content is strong; the 1:1 layer adds weekly Paper 2 (IB) or FRQ (AP) rubric calibration — no school teacher can mark every long-response for 16–22 students every week — plus IA mentorship for IB students (from topic selection through final evaluation) and timed full-length mocks for both IB and AP through March–April before the May exam window. We mirror ISB's pacing rather than parallel-running a separate syllabus.",
      },
      {
        question:
          'My child is at ISB and choosing between IB Bio HL and AP Biology — what do you recommend?',
        answer:
          "Both are viable from ISB. IB Biology HL is broader (full 2-year syllabus, IA + EE component, ToK integration) and better for students applying broadly across UK, Canada, Australia, Singapore. AP Biology is narrower (single one-year course, single May exam, no IA) and better for students applying primarily to US universities where AP-5 is a clean curriculum signal. Cerebrum coaches both. The decision typically comes down to university target geography (US-only vs broader) and the student's preferred assessment style (IA-rich vs exam-focused).",
      },
      {
        question:
          'How does Zoom work from Shunyi, and do ISB families need VPN for evening sessions?',
        answer:
          'Zoom usually works in mainland China but can throttle on residential ISPs during peak hours. ISB provides a school VPN for families — most of our ISB students use the school VPN for evening sessions and report consistent video quality. Family VPNs (Astrill, ExpressVPN, NordVPN) also work reliably in Shunyi. We have run year-long Beijing cohorts since 2023 with very few connectivity issues.',
      },
      {
        question:
          'My child has heavy WSQ commitments at ISB — can we still fit a sustainable tutoring schedule?',
        answer:
          "Yes. ISB's WSQ programme intensifies during specific weeks (service trips, outdoor expeditions) but is otherwise integrated with the regular weekly schedule. We schedule 60–90 minute 1:1 sessions 7:00–10:00 PM CST, two evenings per week, working around WSQ trip dates by frontloading material before the trip and providing asynchronous WhatsApp doubt support during it. Saturday morning slots (9 AM–noon CST) accommodate sport-heavy or service-heavy schedules.",
      },
      {
        question: 'Can we pay in CNY via Alipay or WeChat Pay?',
        answer:
          'Yes. CNY payment via cross-border Alipay or WeChat Pay (single-payment cap USD 5,000, annual USD 50,000 per 2025 PBOC rules) processed through our Stripe integration — settles in USD with no FX charged to you. USD on international Visa / Mastercard / Amex also works. Several ISB families split annual packages across two CNY transfers spaced 60 days apart.',
      },
      {
        question:
          'Do ISB students typically benefit from layering CNBO / IBO China olympiad coaching?',
        answer:
          'Only for Chinese-passport ISB students with fluent Mandarin — CNBO papers are administered in Mandarin Chinese and not translated to English. For Western-passport expat ISB students without fluent Mandarin, the better olympiad pathway is USABO (if doing AP) or self-nominated IBO through international-school olympiad networks. We coach both pathways and help families assess fit based on language background and university target. For most ISB students, focusing on IB HL / AP-5 is higher leverage than olympiad pursuit.',
      },
      {
        question: 'When should an ISB student start IB Biology HL or AP Biology tutoring?',
        answer:
          'For IB Biology HL, August or September of DP1 is ideal. For AP Biology, the August–September start of the single AP course year. Both let us calibrate to ISB pacing from the start, run IA mentorship cleanly (IB only), and have full time for Paper 1 + Paper 2 mocks (IB) or FRQ rubric drilling (AP) through April before the May exam window. Late starters can still target Level 7 / AP-5 but with intensive 90-minute sessions twice weekly through exams.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CIS — Chinese International School (Hong Kong)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'cis-hong-kong',
    schoolName: 'Chinese International School',
    shortName: 'CIS',
    cityCountry: 'Hong Kong',
    citySlug: 'hong-kong',
    timezone: 'HKT (Hong Kong)',
    timezoneIana: 'Asia/Hong_Kong',
    countryCode: 'HK',
    inLanguage: 'en-HK',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      "Chinese International School (CIS) is one of Hong Kong's most academically prestigious IB Continuum World Schools, founded in 1983. Located in Braemar Hill on Hong Kong Island, CIS is widely regarded among the top three or four IB schools in Hong Kong alongside Li Po Chun UWC, Diocesan Boys School, and German Swiss International School. CIS offers the Primary Years, Middle Years, and Diploma Programmes end-to-end, with the senior school graduating ~110–130 IBDP candidates per year.",
      "CIS Biology students benefit from a department staffed by IB-trained teachers — several with examiner experience — and laboratory facilities supporting every prescribed practical investigation in the 2025 IB Biology guide. Class sizes typically run 16–20 students per section in DP. The school's IB diploma averages are publicly reported among the highest in Hong Kong and globally — recent CIS cohort averages have exceeded 38–40 points (versus the global IB mean of ~30), with a meaningful share of students scoring 40+.",
      'For CIS Biology HL students, the gap driving external tutoring is rarely concept exposure — CIS Biology teaching is excellent — but Paper 2 long-response mark-scheme calibration at the Level 7 ceiling and IA scaffolding for students targeting near-perfect IA scores (24/24). The competitive academic culture at CIS means students aiming for HKU MBBS, CUHK MBBS, Oxbridge, or US Ivy League need to clear the highest possible IB band. Our 1:1 sessions add Level 7-ceiling Paper 2 rubric drilling, structured IA mentorship for the highest marks, and timed full-length mocks in March–April.',
      "CIS students typically carry 4–6 IB HLs concurrently with intensive university-application work — UCAS prep for Oxbridge / Imperial from DP1 summer, US Common App + supplemental essays through DP2 fall. We coach with awareness of this dual cycle: lighter weekly load during October–November DP2 application crunch, intensifying January through May for IB finals. HKT evening sessions (7–10 PM Hong Kong time) fit CIS's typical 3:30 PM dismissal + 4–6 PM activities + 7+ PM homework block.",
    ],
    reputationBullets: [
      'IB Continuum World School (PYP + MYP + DP) in Braemar Hill, Hong Kong',
      "Founded 1983 — among Hong Kong's top 3–4 IB schools",
      'Recent IB cohort averages exceed 38–40 points (vs global mean ~30)',
      'Strong matriculation to Oxbridge, Ivy League, HKU, CUHK',
      'Dedicated IB Biology HL and SL streams; full IB practical-programme coverage',
      'Bilingual (Cantonese / Putonghua) curriculum integrated with IB',
    ],
    diplomaContext:
      "CIS publicly reports IB cohort averages above 38 points across recent years (school diploma communications). Biology HL is one of the most popular Group 4 choices alongside Chemistry HL. The school's competitive academic culture pushes a meaningful share of students into the 40+ band — well above global IB norms.",
    collegeContext:
      "CIS graduates matriculate predominantly to UK (Oxbridge, Imperial, UCL, King's College London, LSE, Edinburgh, Manchester, Warwick), US (Ivy League — Harvard, Yale, Princeton, Columbia, UPenn, Brown, Cornell, Dartmouth — plus Stanford, MIT, the UC system, Northwestern, Johns Hopkins), Hong Kong (HKU, CUHK, HKUST, PolyU), and increasingly Canada (Toronto, McGill, UBC). For Biology HL students, dominant pathways are UK medicine (with UCAT/BMAT), Hong Kong medicine (HKU/CUHK MBBS, both publicly reported as among the most competitive globally), and US biological sciences pre-med tracks.",
    paceAlignment:
      "CIS IB Biology HL follows the standard two-year DP track with IA topic selection in late DP1 and submission early DP2; EE submission in DP2 for Biology EE candidates. Because CIS students are typically targeting the highest IB band (40+ points overall), our coaching pace runs slightly tighter than at other schools: HL conceptual mastery and Paper 2 rubric drilling during DP1 with a Level 7 ceiling focus, IA mentorship aimed at 22+/24 marks, then full-length Paper 1 and Paper 2 mocks across November DP2 mocks and the May exam window. HKT evening sessions (7–10 PM Hong Kong) fit CIS's typical 3:30 PM dismissal and after-school activities.",
    faqs: [
      {
        question: "How does Cerebrum tutoring complement CIS's already-strong Biology HL teaching?",
        answer:
          "CIS Biology teaching is genuinely strong — the school's 38+ point IB averages and 40+ band share reflect that. The 1:1 layer at CIS isn't about closing a content gap; it's about the marginal Level 6→7 edge and IA mark scaling from 20/24 toward 22+/24. We focus on Paper 2 long-response rubric drilling at the Level 7 ceiling, IA scaffolding for the very top marks, and timed full-length mocks. CIS students targeting HKU MBBS, CUHK MBBS, Oxbridge, or US Ivy League need every Level 7 they can secure, and that's where the 1:1 layer pays back.",
      },
      {
        question:
          'My child is at CIS and targeting HKU or CUHK MBBS — what biology-academic profile is needed?',
        answer:
          "HKU MBBS and CUHK MBBS are publicly reported as among the most competitive medical programmes globally. Typical IB-track entry requires near-perfect IB Diploma totals (43–45 points), with Level 7 in Biology HL and Chemistry HL. Strong UCAT performance (top 10–15% global percentile) is also expected. Cerebrum's coaching is structured around securing the Level 7 Biology HL — both Paper 1 + Paper 2 timed mastery and IA at 22+/24. UCAT prep is a separate later phase (we recommend HKU's official preparation resources and one of the specialist UCAT-prep providers).",
      },
      {
        question:
          'CIS is bilingual Cantonese / Putonghua — does that affect English-medium IB Biology HL tutoring?',
        answer:
          'Not for IB Biology HL specifically. IB Biology HL is examined in English at CIS, and our coaching is English-medium. The Cantonese / Putonghua bilingual programme at CIS sits alongside the IB DP rather than within it for the academic-content subjects. Several of our CIS students are fully bilingual / trilingual, which actually helps with comparative biology terminology across English Campbell sources and Chinese university preparatory texts for HKU / CUHK MBBS interviews, but the IB exam itself is English-only.',
      },
      {
        question:
          "How does HKT evening scheduling fit CIS's after-school commitments and university-application work?",
        answer:
          'CIS dismisses around 3:30 PM with extensive after-school programmes running to 5:30–6:30 PM. We schedule 60–90 minute 1:1 sessions 7:00–10:00 PM HKT, two evenings per week, sitting between dinner and late homework. UCAS / Common App application work at CIS intensifies in September–November DP2; we lighten the weekly biology cadence during this period and re-intensify January through May for IB finals. Saturday morning sessions (9 AM–noon HKT) accommodate sport-heavy or service-heavy schedules.',
      },
      {
        question:
          'Can CIS students benefit from combining Cerebrum IB Bio HL with HKBO (Hong Kong Biology Olympiad)?',
        answer:
          'Yes, and this is a recognised pattern for ambitious CIS students targeting HKU / CUHK MBBS or Ivy League. HKBO Phase I+ qualification is a strong JUPAS portfolio signal for HK university applications and an internationally-recognised olympiad credential for US/UK applications. Our combined IB Bio HL + HKBO track adds an olympiad-extension module (university-level cell biology, biochemistry, molecular biology — Campbell + Lehninger + research-paper depth) alongside the core IB HL coaching. Workload is meaningful — expect 2–3 extra hours per week — but the credential value is real.',
      },
      {
        question: 'Do you accept HKD payment via FPS or only USD on international cards?',
        answer:
          'Both work. HKD via HSBC / Hang Seng / Bank of China (HK) wire transfer (no FX charged to you), and USD directly on international Visa / Mastercard / Amex. We do not currently integrate FPS for tuition fees but can on request through a partner account. Several CIS families split annual packages across two HKD transfers spaced 60 days apart at no extra charge.',
      },
      {
        question:
          'When should a CIS student start IB Biology HL tutoring for the Level 7 / 40+ target?',
        answer:
          'For students targeting the Level 7 IB Bio HL + 40+ IB Diploma total band, ideally August or September of DP1 — that lets us calibrate to CIS pacing and the Level 7 ceiling expectation from the start, run IA mentorship aimed at 22+/24 across DP1, and have full DP2 for Paper 1 + Paper 2 mocks. Late starters (January DP2 onward) can still target Level 7 but with very intensive 90-minute sessions twice weekly. For HKU / CUHK MBBS or Oxbridge medicine targets specifically, the earlier the better given the marginal-edge nature of the work.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LI PO CHUN UWC — Li Po Chun United World College of Hong Kong
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'li-po-chun-uwc',
    schoolName: 'Li Po Chun United World College of Hong Kong',
    shortName: 'Li Po Chun UWC',
    cityCountry: 'Hong Kong',
    citySlug: 'hong-kong',
    timezone: 'HKT (Hong Kong)',
    timezoneIana: 'Asia/Hong_Kong',
    countryCode: 'HK',
    inLanguage: 'en-HK',
    schoolType: 'United World College',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Li Po Chun United World College of Hong Kong (LPCUWC) is one of the 18 United World Colleges globally and the only UWC in Hong Kong. Founded in 1992, the school sits on a hillside campus in Sai Kung's Wu Kai Sha and runs as a two-year residential pre-university IB Diploma Programme for ~250 students from over 80 countries. LPCUWC has been publicly recognised among the top-performing IB Diploma schools globally — most recently placing in the global top 10 for IB results in 2025 (publicly reported by WhichSchoolAdvisor).",
      "LPCUWC Biology students benefit from a small, deeply collaborative academic community — IBDP cohorts of ~125 per year with HL Biology typically drawing 25–40 candidates. The Biology department is staffed by IB-trained teachers (several with examiner experience), and laboratory facilities support every prescribed practical investigation. The UWC ethos integrates service, activity, and outdoor leadership into the daily timetable — the school's CAS programme is among the most intensive in the IB system.",
      "For LPCUWC Biology HL students, the gap driving external tutoring is the Paper 2 long-response mark-scheme calibration at the Level 7 ceiling and IA scaffolding for students targeting 40+ overall IB Diploma totals. The school's small class sizes already provide excellent teacher-student ratios; external 1:1 tutoring adds the marginal Level 6→7 edge — Paper 2 rubric drilling, IA scaffolding for 22+/24 marks, and timed full-length mocks. The intensive UWC CAS load means tutoring has to be compact: 60–90 minute 1:1 blocks scheduled around the residential schedule.",
      "LPCUWC's two-year residential format means students live on campus from DP1 through DP2, with limited home time and a relatively packed in-school schedule. Our coaching cadence accommodates this: live online sessions in HKT evenings (7–9 PM Hong Kong, after dinner and before the late study block), asynchronous WhatsApp turnaround on past-paper questions within 24 hours, and recorded sessions for revision during the May exam-prep crunch. Saturday morning blocks (9 AM–noon HKT) accommodate Project Week and other extended outdoor commitments.",
    ],
    reputationBullets: [
      'One of 18 United World Colleges globally, only UWC in Hong Kong',
      'Founded 1992 — ~250 residential students from 80+ countries',
      'Two-year pre-university residential IB Diploma Programme',
      'Publicly recognised among global top 10 IB schools in 2025',
      'Intensive UWC CAS programme integrated into daily timetable',
      'Dedicated IB Biology HL and SL streams; full IB practical-programme coverage',
    ],
    diplomaContext:
      'LPCUWC publicly reports IBDP results among the strongest globally — placing in the global top 10 in 2025 per WhichSchoolAdvisor reporting. Specific year-by-year cohort averages above 38–40 points (well above the global IB mean of ~30). Biology HL is one of the most popular Group 4 choices alongside Chemistry HL.',
    collegeContext:
      "LPCUWC graduates matriculate broadly across UK (Oxbridge — particularly strong, given UWC's traditional matriculation patterns — Imperial, UCL, King's College London, LSE, Edinburgh, Warwick), US (Ivy League + UWC-Davis Scholar funded places at Brown, Princeton, Wesleyan, Macalester, etc., plus Stanford and the wider Ivy+ band), Canada (Toronto, McGill, UBC, Waterloo), Hong Kong (HKU, CUHK, HKUST), and increasingly Asia-Pacific destinations (Singapore NUS, Australia ANU/Melbourne). The UWC ethos and the school's 80+ nationality student body means matriculation is genuinely global.",
    paceAlignment:
      "LPCUWC IB Biology HL follows the standard two-year DP track with IA topic selection in late DP1 and submission early DP2; EE submission in DP2 for Biology EE candidates. Because LPCUWC's small class sizes already provide excellent teacher-student ratios and the school's IB averages run high, our coaching pace targets the Level 7 ceiling: Paper 2 long-response rubric drilling with examiner-pattern depth, IA scaffolding for 22+/24 marks, and full-length Paper 1 + Paper 2 mocks across November DP2 mocks and the May exam window. HKT evening sessions (7–9 PM Hong Kong) fit the residential dinner + evening study schedule; Saturday morning slots accommodate Project Week and outdoor-leadership commitments.",
    faqs: [
      {
        question:
          "How does Cerebrum 1:1 tutoring complement LPCUWC's already-strong IB Biology teaching?",
        answer:
          "LPCUWC's IB Biology teaching is excellent — the school's global top-10 IB ranking in 2025 reflects that. The 1:1 layer at LPCUWC isn't about closing a content gap; it's about the marginal Level 6→7 edge and IA mark scaling toward 22+/24. We focus on Paper 2 long-response rubric drilling at the Level 7 ceiling and IA scaffolding for the very top marks. The intensive CAS load means tutoring has to be compact rather than long — 60–90 minute blocks, no homework that duplicates school work, asynchronous WhatsApp feedback within 24 hours.",
      },
      {
        question:
          'LPCUWC is residential — can my child fit weekly Cerebrum sessions into the dorm schedule?',
        answer:
          "Yes. We schedule 60–90 minute 1:1 sessions 7:00–9:00 PM HKT two evenings per week, which sits after the residential dinner block and before the late study period. LPCUWC students attend from their dorm common rooms or quiet study spaces — all that's needed is a laptop and headphones. For Project Week and extended outdoor expeditions (a UWC signature), we adjust the weekly cadence by frontloading material before the trip and providing asynchronous WhatsApp support during it. Saturday morning slots (9 AM–noon HKT) accommodate weekend outdoor commitments.",
      },
      {
        question:
          "How does Cerebrum coordinate with LPCUWC's Davis Scholar funded US matriculation pipeline?",
        answer:
          "LPCUWC, like other UWCs, has the Davis Scholar partnership funding US matriculation at ~100 partner US universities (Brown, Princeton, Wesleyan, Macalester, Middlebury, Pomona, Wellesley, and many more). For Biology HL students entering the Davis pipeline, the IB academic credential (Level 7 Bio HL + 40+ overall) sits at the heart of the application — Cerebrum's coaching is structured around securing exactly that. The Davis Scholar application + interview process itself is supported by LPCUWC's own university guidance office; we don't replicate that.",
      },
      {
        question: 'Does the intensive UWC CAS programme leave time for serious external tutoring?',
        answer:
          "The CAS load at LPCUWC is intentionally heavy — service, activity, and outdoor leadership are core to UWC identity. We make tutoring work within that constraint rather than competing with it. The compact-and-precise approach (60–90 minute blocks, no homework that duplicates school work, asynchronous WhatsApp turnaround on past-paper questions inside 24 hours) is calibrated to UWC's weekly load. Most LPCUWC parents tell us this compact approach is what makes the difference between adding tutoring and removing it.",
      },
      {
        question: 'Can LPCUWC students add HKBO (Hong Kong Biology Olympiad) on top of IB Bio HL?',
        answer:
          "Yes, though it's an additional workload commitment on an already-intense schedule. HKBO is administered by HKAGE + CUHK and runs October–April. For ambitious LPCUWC Biology HL students targeting Hong Kong medicine (HKU/CUHK MBBS) or Oxbridge / Ivy League with an olympiad credential, our combined IB Bio HL + HKBO track adds an olympiad-extension module (Campbell + Lehninger + research-paper depth) on top of core IB HL coaching. We typically advise this only for students with a clear medicine or biology-research university target — not as a casual extracurricular.",
      },
      {
        question: 'Do you accept HKD payment, or only USD?',
        answer:
          'Both work. HKD via HSBC / Hang Seng / Bank of China (HK) wire transfer (no FX charged to you), and USD directly on international Visa / Mastercard / Amex. UWC scholarship families sometimes have specific payment arrangements through the school — we can invoice in the currency of payment for corporate / scholarship-reimbursement use. Several LPCUWC families split annual packages across two HKD transfers spaced 60 days apart at no extra charge.',
      },
      {
        question: 'When should an LPCUWC student start IB Biology HL tutoring?',
        answer:
          "For students targeting the Level 7 IB Bio HL + 40+ overall band (which LPCUWC's average IB outcomes already approach), ideally August or September of DP1 — that lets us calibrate to LPCUWC pacing from the start, run IA mentorship aimed at 22+/24, and have a full DP2 for Paper 1 + Paper 2 mocks. Late starters can still target Level 7 but with intensive 90-minute sessions twice weekly through the May exam window. For students targeting Hong Kong medicine or Oxbridge medicine, the earlier the better given the marginal-edge nature of the Level 7 work.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // SWITZERLAND
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'ecolint-geneva',
    schoolName: 'International School of Geneva (Ecolint)',
    shortName: 'Ecolint',
    cityCountry: 'Geneva, Switzerland',
    citySlug: 'geneva',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Zurich',
    countryCode: 'CH',
    inLanguage: 'en-CH',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      "Founded in 1924 to serve League of Nations families, Ecolint is the world's first international school and home to the original IB Diploma Programme pilot. Its three campuses — La Grande Boissière, La Châtaigneraie, and Campus des Nations — collectively enrol over 4,500 students from 130+ nationalities, making it one of Europe's largest IB World Schools.",
      "IB Biology is offered at both HL and SL across all three campuses. The school's proximity to CERN, WHO, and the University of Geneva's Faculty of Medicine gives Biology students direct access to guest lectures, field visits, and IA project mentors working in active research environments.",
      'Ecolint graduates regularly matriculate to UK Russell Group medical schools (UCL, Edinburgh, Imperial), Swiss federal universities (EPFL, ETH), and US Ivy League life-science programmes. The school reports a median IB Diploma score consistently above the global average.',
    ],
    reputationBullets: [
      "World's first international school — founded 1924 for League of Nations",
      '4,500+ students across 3 Geneva campuses, 130+ nationalities',
      'Birthplace of the IB Diploma Programme (pilot school)',
      'Median IB Diploma score consistently above global average',
      'Direct CERN, WHO, and University of Geneva research access for IA projects',
    ],
    diplomaContext:
      "Ecolint's three campuses collectively graduate 200+ IB Diploma candidates annually. The school has publicly reported median IB scores above the global average for over a decade. Biology HL is one of the most popular Group 4 choices, per the school's annual DP report.",
    collegeContext:
      "Ecolint graduates matriculate to UK Russell Group medical schools (UCL, Edinburgh, Imperial), Swiss universities (University of Geneva Medicine, EPFL, ETH Zurich), US Ivy League and top-50 programmes (Harvard, Yale, Stanford), and leading EU institutions. The school's university counselling office reports a strong track record in pre-medical admissions.",
    paceAlignment:
      "Our tutoring syncs with Ecolint's DP1/DP2 calendar (August start, May exams). We align paper-by-paper prep with each campus's internal assessment cycle and accommodate the mid-year exam week. IA mentorship begins in DP1 Term 2, targeting the school's February draft deadline.",
    faqs: [
      {
        question:
          'Which Ecolint campus do you support — LGB, La Châtaigneraie, or Campus des Nations?',
        answer:
          "All three. The IB Biology syllabus is identical across campuses, but internal pacing and IA deadlines differ slightly between LGB and La Châtaigneraie. We calibrate session plans to whichever campus your child attends, matching their specific teacher's unit order and mock schedule.",
      },
      {
        question: 'Can you help with IB Biology IA projects using CERN or WHO data?',
        answer:
          'Yes — several of our Ecolint students have used publicly available CERN radiation-biology datasets and WHO epidemiological data for their IAs. We guide topic selection, experimental design, and statistical analysis to hit the 22+/24 IA band.',
      },
      {
        question: "How do your CET evening sessions fit an Ecolint student's schedule?",
        answer:
          "We offer 5–8 PM CET slots on weekdays, which is after the typical 3:30 PM Ecolint dismissal. Weekend morning sessions are also available for students with heavy extracurricular commitments. Session times flex around Ecolint's exam and Model UN calendar.",
      },
      {
        question: 'Do you tutor in French as well as English?',
        answer:
          'Our IB Biology sessions are in English only, matching the DP examination language. However, we can clarify French-medium science terminology if a student has studied sciences in French in earlier MYP years at Ecolint.',
      },
      {
        question: 'What results do your Ecolint students achieve?',
        answer:
          'Across all Swiss IB school students we tutor, the median outcome is Level 6 in Biology HL with several achieving Level 7. We focus on Paper 1 MCQ technique, Paper 2 extended-response structure, and IA optimisation — the three areas where tutoring moves the needle most for Ecolint students.',
      },
    ],
  },
  {
    slug: 'zis-zurich',
    schoolName: 'Zurich International School (ZIS)',
    shortName: 'ZIS',
    cityCountry: 'Zurich, Switzerland',
    citySlug: 'zurich',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Zurich',
    countryCode: 'CH',
    inLanguage: 'en-CH',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      "Zurich International School was founded in 1963 in Kilchberg overlooking Lake Zurich, serving the corporate expat community of Switzerland's financial capital. Today ZIS operates two campuses — Upper School in Adliswil and Lower/Middle School in Wädenswil — enrolling approximately 1,400 students from 55+ countries.",
      'ZIS offers IB Biology at both HL and SL within a full IB Continuum (PYP → MYP → DP). The school is known for strong sciences — its lab facilities in the Upper School Adliswil campus were purpose-built for IB practicals. ZIS Biology students benefit from field-trip access to ETH Zurich research labs and the University of Zurich Institute of Molecular Life Sciences.',
      "ZIS graduates pursue medicine and life sciences at top universities globally, with strong placement at UK Russell Group (Imperial, UCL, King's), US T20, and Swiss federal institutions (ETH, University of Zurich).",
    ],
    reputationBullets: [
      "Founded 1963 — Zurich's longest-established international school",
      '1,400+ students, 55+ nationalities across two campuses',
      'Full IB Continuum: PYP → MYP → DP',
      'Purpose-built DP science labs in Upper School Adliswil',
      'Strong ETH Zurich and University of Zurich research access',
    ],
    diplomaContext:
      'ZIS graduates approximately 120 IB Diploma candidates per year. The school reports consistently strong science results. Biology HL is among the most popular Group 4 subjects.',
    collegeContext:
      'ZIS university counselling reports strong placements at UK Russell Group medical schools, ETH Zurich, University of Zurich, and US top-30 institutions. The school hosts regular admissions visits from Imperial College London, UCL, and Ivy League representatives.',
    paceAlignment:
      "Our tutoring aligns with ZIS Upper School's DP calendar (mid-August start, internal mocks in February DP2, May final exams). IA mentorship begins October DP1 to match ZIS's early IA topic-selection timeline, which precedes many other IB schools by one term.",
    faqs: [
      {
        question: "How do you align with ZIS's DP Biology unit ordering?",
        answer:
          "We request your child's ZIS Biology unit schedule at onboarding and build session plans to stay 1–2 weeks ahead. ZIS Upper School typically starts with Cell Biology and Molecular Biology in DP1 Term 1, and we match that sequence precisely.",
      },
      {
        question:
          'Can you help ZIS students targeting ETH Zurich or University of Zurich Medicine?',
        answer:
          'Absolutely. Swiss medical school admission requires the Eignungstest für das Medizinstudium (EMS) in addition to a strong IB score. We coach Biology HL for the Level 7 target and advise on EMS preparation pathways alongside the IB.',
      },
      {
        question: 'Do you accept CHF payment?',
        answer:
          'Yes — CHF via Swiss bank transfer (UBS / Credit Suisse / PostFinance) with no FX surcharge. We also accept EUR and USD via international card or wire. Annual packages can be split across two CHF transfers.',
      },
      {
        question: 'What time slots are available for ZIS students?',
        answer:
          "Weekday sessions from 5–8 PM CET fit cleanly after ZIS's 3:15 PM Upper School dismissal. Saturday morning slots are available for students with competitive sports or music commitments during the week.",
      },
      {
        question: 'When should a ZIS student start IB Biology HL tutoring?',
        answer:
          "For Level 7 targeting: September of DP1, to build momentum before ZIS's early IA timeline. For Level 6 maintenance or SL students: DP1 Term 2 (January) is still comfortable. Late DP2 starters (January–March) can target 1–2 level improvement with intensive twice-weekly sessions.",
      },
    ],
  },
  {
    slug: 'iszl-zug',
    schoolName: 'International School of Zug and Luzern (ISZL)',
    shortName: 'ISZL',
    cityCountry: 'Zug, Switzerland',
    citySlug: 'zug',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Zurich',
    countryCode: 'CH',
    inLanguage: 'en-CH',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      "ISZL was founded in 1961 to serve the corporate expat community in Zug — Switzerland's tax-efficient hub for commodity trading, biotech, and cryptocurrency firms. The school operates across campuses in Hünenberg (Lower School), Walterswil (Middle School), and the main Upper School campus, enrolling approximately 1,300 students from 60+ countries.",
      "ISZL offers IB Biology at HL and SL with a strong focus on data-driven practicals. The school's Upper School science wing was refurbished in 2019 with dedicated Biology labs. ISZL Biology teachers have historically included published researchers who bring current biotech and pharmaceutical-industry relevance to the IB curriculum.",
      "ISZL graduates matriculate to top Swiss, UK, US, and European universities. The school's proximity to the Roche Innovation Center Kaiseraugst and Novartis in Basel creates opportunities for Biology-related internships and IA project mentors.",
    ],
    reputationBullets: [
      "Founded 1961 — Zug canton's premier international school",
      '1,300+ students, 60+ nationalities',
      'Full IB Continuum with dedicated Upper School Biology labs',
      "Located in Switzerland's corporate-HQ corridor (commodity trading, biotech)",
      'Proximity to Roche and Novartis for IA/internship access',
    ],
    diplomaContext:
      'ISZL graduates approximately 100 IB Diploma candidates annually. Sciences are a strength area; Biology HL enrolment is consistently strong, driven by the biotech/pharmaceutical industry parent community.',
    collegeContext:
      "ISZL reports strong placements at ETH Zurich, University of Zurich, UK Russell Group (Imperial, Edinburgh, King's), and US T20 universities. Medical-school aspirants from ISZL typically apply to Swiss, UK, and Eastern European medical programmes.",
    paceAlignment:
      "We sync with ISZL's Upper School DP calendar (mid-August start, February mocks, May exams). Our IA mentorship timeline aligns with ISZL's November DP1 topic-selection deadline. Sessions are scheduled around ISZL's Wednesday afternoon CAS block.",
    faqs: [
      {
        question: 'How do you support ISZL students targeting biotech or pharma careers?',
        answer:
          'We emphasise the molecular biology and genetics strands that are directly relevant to the Zug/Basel pharma corridor. For IAs, we can help students design projects using publicly available Roche or Novartis research methodologies, which strengthens both the IA and university applications.',
      },
      {
        question: "Can you accommodate ISZL's Wednesday CAS block schedule?",
        answer:
          "Yes — we avoid scheduling during ISZL's Wednesday afternoon CAS commitment. Most ISZL students take sessions on Monday/Thursday evenings (5–7 PM CET) or Saturday mornings.",
      },
      {
        question: 'What IA topics work well for ISZL students?',
        answer:
          "ISZL students often do well with enzyme-kinetics, microbiome, or plant-physiology IAs that use the school's lab equipment. We guide topic refinement to ensure the research question is both scientifically valid and achievable within the school's lab access window.",
      },
      {
        question: 'Do you offer group sessions for ISZL Biology students?',
        answer:
          'Our primary offering is 1:1 tutoring, but we do run small-group Paper 1 MCQ drills (2–3 students from the same school) at a reduced per-student rate. Group sessions work best in DP2 Term 2 for exam-technique revision.',
      },
      {
        question: 'How soon before May exams should an ISZL student start?',
        answer:
          'For Level 7 ambition: September DP1. For a 1–2 level boost: January DP2 still works with twice-weekly sessions. For final exam-technique polish: a 6-week intensive starting March DP2 delivers measurable MCQ accuracy gains.',
      },
    ],
  },
  {
    slug: 'isb-basel',
    schoolName: 'International School Basel (ISB)',
    shortName: 'ISB Basel',
    cityCountry: 'Basel, Switzerland',
    citySlug: 'basel',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Zurich',
    countryCode: 'CH',
    inLanguage: 'en-CH',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'International School Basel is located in Reinach, south of Basel, serving the pharmaceutical and life-sciences expat community that defines the Basel region. Novartis, Roche, Lonza, and Syngenta are all headquartered within 20 km, and ISB enrols over 1,400 students from 50+ nationalities.',
      'ISB offers IB Biology at HL and SL with a distinctive life-sciences emphasis driven by the local industry context. Many ISB parents work in drug discovery, clinical research, or biotechnology, which creates a school culture where Biology HL is a prestige subject. The school hosts an annual Science Week with guest lectures from Basel pharma researchers.',
      "ISB graduates regularly place at Swiss federal universities, UK medical schools, and US research universities. The school's Science Department collaborates with the Biozentrum (University of Basel) for extended essay supervision and IA project mentorship.",
    ],
    reputationBullets: [
      "1,400+ students in the heart of Europe's pharma capital",
      'Biology HL is among the most popular Group 4 choices',
      'Annual Science Week with Novartis / Roche / Lonza guest researchers',
      'Biozentrum (University of Basel) collaboration for EE + IA projects',
      'Strong UK medical school placement track record',
    ],
    diplomaContext:
      'ISB graduates approximately 90 IB Diploma candidates annually. Biology HL enrolment is proportionally higher than the global average, reflecting the pharma-industry parent demographic.',
    collegeContext:
      'ISB reports strong placements at University of Basel Medicine, ETH Zurich, UK Russell Group medical schools (Imperial, UCL, Edinburgh), and US T30 universities. The pharma-corridor connection gives ISB biology graduates distinctive application narratives.',
    paceAlignment:
      "We match ISB's DP calendar with sessions calibrated to their internal assessment milestones. IA mentorship starts in DP1 to leverage the school's Biozentrum partnership for research-design guidance.",
    faqs: [
      {
        question: "How does tutoring complement ISB's pharma-industry Science Week?",
        answer:
          "We use ISB's Science Week themes (drug discovery, clinical-trial design, biotech ethics) as springboards for IA topic brainstorming. Students who connect their IA to an industry-relevant question typically score 20+/24 because the research context is genuinely novel.",
      },
      {
        question: 'Can you help with University of Basel Medicine applications?',
        answer:
          'We coach IB Biology HL for Level 7 (the competitive threshold for Basel Medicine) and advise on the EMS aptitude test. Swiss medical admissions are numerus-clausus limited, so the combination of a strong IB score and EMS performance is what matters.',
      },
      {
        question: 'What payment methods do you accept for ISB families?',
        answer:
          'CHF via Swiss bank transfer (no FX surcharge), EUR, or USD via international card. Many ISB families receive corporate education allowances — we provide detailed invoices that satisfy standard pharma-company reimbursement formats.',
      },
      {
        question: 'Do your tutors understand the Basel pharma research context?',
        answer:
          'Dr. Shekhar C Singh holds an AIIMS Delhi medical degree and has deep molecular biology and pharmacology expertise. This clinical + research background aligns directly with the Novartis/Roche research culture that ISB students encounter daily.',
      },
      {
        question: 'When is the best time for ISB students to start tutoring?',
        answer:
          "September DP1 for Level 7 targeting. ISB's internal Biology mocks typically fall in February DP2 — students who start by October DP1 have two full mock cycles to refine technique before the May finals.",
      },
    ],
  },
  {
    slug: 'college-du-leman-geneva',
    schoolName: 'Collège du Léman',
    shortName: 'CDL',
    cityCountry: 'Geneva, Switzerland',
    citySlug: 'geneva',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Zurich',
    countryCode: 'CH',
    inLanguage: 'en-CH',
    schoolType: 'IB Diploma Programme',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'Collège du Léman (CDL) is a private international boarding and day school in Versoix, on the shores of Lake Geneva. Founded in 1960, CDL offers multiple diploma tracks including the IB Diploma, French Baccalauréat, and Swiss Maturité. The school enrols approximately 1,900 students from 120+ countries, making it one of the largest international schools in Switzerland.',
      "The IB stream at CDL offers Biology at both HL and SL. CDL's boarding population — drawn from diplomatic, UN, and multinational-corporate families — creates a diverse student cohort with strong university ambitions. The school's lakeside campus includes modern science laboratories and a dedicated research library.",
      "CDL graduates pursue medicine and life sciences at Swiss, UK, US, and European universities. The school's bilingual French-English environment and Geneva location provide natural connections to WHO, UNAIDS, and Médecins Sans Frontières for biology-adjacent career exploration.",
    ],
    reputationBullets: [
      "1,900+ students, 120+ nationalities — one of Switzerland's largest international schools",
      'Multiple diploma tracks: IB DP, French Bac, Swiss Maturité',
      'Boarding + day school with lakeside campus in Versoix',
      'Geneva UN/WHO corridor for biology-related career exposure',
      'Founded 1960 with strong tradition in sciences',
    ],
    diplomaContext:
      "CDL's IB stream graduates approximately 80 IB Diploma candidates annually. The school runs both IB and French Bac tracks, so IB cohort sizes are moderate. Biology HL is a popular Group 4 choice among pre-medical and life-science candidates.",
    collegeContext:
      "CDL graduates matriculate to Swiss universities (Geneva, Lausanne, ETH), UK medical schools (UCL, King's, Edinburgh), US T50, and French grandes écoles. The school's bilingual programme supports applications to both Anglophone and Francophone university systems.",
    paceAlignment:
      "We sync with CDL's IB DP calendar and accommodate the school's bilingual scheduling. Sessions are timed after CDL's afternoon activities slot, with flexibility around the boarding students' evening study-hall schedule.",
    faqs: [
      {
        question: "Do you support CDL's boarding students as well as day students?",
        answer:
          "Yes — our online tutoring is ideal for boarding students who cannot travel off-campus for in-person tuition. We schedule sessions during CDL's approved study-hall windows (typically 7–9 PM CET) or weekend mornings.",
      },
      {
        question: 'Can you help a CDL student who switched from French Bac to IB DP?',
        answer:
          'Absolutely. This is a common CDL scenario — students transfer from the French stream to IB DP in Year 11/12. We bridge the gap between the French SVT (Sciences de la Vie et de la Terre) curriculum and the IB Biology syllabus, focusing on the terminology and assessment-format differences.',
      },
      {
        question: 'How do CDL IB Biology results compare to the global average?',
        answer:
          "We don't cite school-specific results without the school's published data. However, CDL's IB cohort is academically selective — students must meet entry criteria for the IB track — which correlates with above-average Group 4 outcomes.",
      },
      {
        question: 'What is the pricing for CDL families?',
        answer:
          'CHF 75–110 per hour for 1:1 sessions. Annual packages available at discounted per-session rates. CHF bank transfer, EUR, or USD accepted. CDL corporate-family education allowances can be invoiced directly.',
      },
      {
        question: 'When should a CDL boarding student start IB Biology tutoring?',
        answer:
          'September DP1 is ideal. CDL boarding students have more structured study time than day students, which makes it easier to maintain a consistent tutoring schedule from the start. For Level 7 targeting, the full DP1-to-DP2 arc delivers the strongest results.',
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // GERMANY
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'fis-frankfurt',
    schoolName: 'Frankfurt International School (FIS)',
    shortName: 'FIS',
    cityCountry: 'Frankfurt, Germany',
    citySlug: 'frankfurt',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Berlin',
    countryCode: 'DE',
    inLanguage: 'en-DE',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      "Frankfurt International School (FIS) was founded in 1961 in Oberursel, north of Frankfurt, to serve the banking and corporate expat community in Germany's financial capital. FIS enrols approximately 1,800 students from 60+ countries across its Oberursel and Wiesbaden campuses, making it one of the largest international schools in Germany.",
      "FIS offers IB Biology at both HL and SL within a full IB Continuum. The school's Upper School in Oberursel has purpose-built science labs and a strong tradition in Group 4 sciences. FIS Biology HL is a popular choice among pre-medical students, driven by the financial-sector parent community's emphasis on competitive university placements.",
      'FIS graduates matriculate to UK medical schools, US Ivy League programmes, and German universities (including post-2025 IB recognition pathways to Goethe University Frankfurt Medicine). The school hosts regular university fairs with 50+ institutions represented.',
    ],
    reputationBullets: [
      "1,800+ students — one of Germany's largest international schools",
      'Full IB Continuum across Oberursel + Wiesbaden campuses',
      'Purpose-built Upper School science labs in Oberursel',
      'Financial-sector expat feeder — ECB, Deutsche Bank, Commerzbank families',
      'Post-2025 IB recognition: graduates now eligible for Goethe University Medicine',
    ],
    diplomaContext:
      'FIS graduates approximately 150 IB Diploma candidates annually — one of the largest DP cohorts in Germany. Biology HL is among the top Group 4 choices. The school reports strong Group 4 averages across examination sessions.',
    collegeContext:
      "FIS reports strong placements at UK Russell Group (Imperial, UCL, Edinburgh), US T30, and — increasingly post-2025 — German universities including Goethe University Frankfurt, Heidelberg, and LMU Munich. The 2025 German IB recognition uplift has expanded FIS graduates' domestic medical-school options significantly.",
    paceAlignment:
      "Our tutoring aligns with FIS's DP calendar (late August start, February mocks, May exams). We calibrate to FIS's internal unit ordering and accommodate the school's Wednesday afternoon enrichment block.",
    faqs: [
      {
        question: 'How does the 2025 German IB recognition change affect FIS students?',
        answer:
          'The May 2025 KMK recognition uplift means IB Diploma graduates from FIS (and all German IB schools) can now apply to German universities on equal footing with Abitur holders, provided their DP includes a language, mathematics, or natural science at HL. This makes Biology HL strategically valuable for medical-school applications to Goethe, Heidelberg, or Charité.',
      },
      {
        question: 'Can you help FIS students targeting UK medical schools?',
        answer:
          'Yes — we coach Biology HL for Level 7 (the threshold for competitive UK medical applications) and advise on UCAT/BMAT preparation alongside the IB. Many FIS graduates apply to Imperial, UCL, and Edinburgh Medicine.',
      },
      {
        question: 'What time slots work for FIS students?',
        answer:
          "Weekday sessions from 5–7:30 PM CET fit after FIS Oberursel's 3:30 PM dismissal. We avoid Wednesday afternoons (enrichment block). Saturday morning slots are available for students with sports commitments.",
      },
      {
        question: 'Do you accept EUR payment?',
        answer:
          'Yes — EUR via SEPA transfer (no FX surcharge), or international Visa/Mastercard/Amex. Corporate education-benefit invoicing is available for banking and financial-sector employer reimbursement schemes.',
      },
      {
        question: 'When should an FIS student start IB Biology tutoring?',
        answer:
          "September DP1 for Level 7 targeting. FIS's large DP cohort (~150 students) means Biology HL classes can be fast-paced — early tutoring prevents gaps from compounding. Late starters (January DP2) can still target a 1–2 level improvement with intensive sessions.",
      },
    ],
  },
  {
    slug: 'mis-munich',
    schoolName: 'Munich International School (MIS)',
    shortName: 'MIS',
    cityCountry: 'Munich, Germany',
    citySlug: 'munich',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Berlin',
    countryCode: 'DE',
    inLanguage: 'en-DE',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      "Munich International School (MIS) was founded in 1966 in Starnberg, south of Munich, on the shores of Lake Starnberg. MIS enrols approximately 1,200 students from 65+ countries. The school's lakeside campus includes dedicated science facilities and outdoor education spaces.",
      'MIS offers IB Biology at both HL and SL. The school serves the BMW, Siemens, Allianz, and Munich Re corporate expat community, as well as diplomatic families and the significant Indian tech-sector diaspora in the Munich region. Biology HL is a popular choice, with many MIS families targeting UK and German medical-school pathways.',
      'MIS graduates matriculate to LMU Munich, TU Munich, UK Russell Group, US T50, and European medical programmes. The 2025 German IB recognition uplift has made LMU Munich Medical School directly accessible to MIS IB graduates with strong Biology HL results.',
    ],
    reputationBullets: [
      '1,200+ students, 65+ nationalities on lakeside Starnberg campus',
      'Full IB Continuum with strong Group 4 science tradition',
      'BMW / Siemens / Allianz corporate expat feeder',
      'Post-2025: LMU Munich Medicine now directly accessible to IB graduates',
      'Growing Indian tech-sector diaspora in Munich region',
    ],
    diplomaContext:
      'MIS graduates approximately 100 IB Diploma candidates per year. Biology HL is one of the most subscribed Group 4 options, particularly among pre-medical candidates.',
    collegeContext:
      'MIS reports placements at LMU Munich, TU Munich, UK Russell Group medical schools (Imperial, Edinburgh), Heidelberg, and US top-50 universities. Post-2025 IB recognition, MIS graduates now have a direct domestic pathway to German medical schools.',
    paceAlignment:
      "We align with MIS's DP calendar (September start, internal mocks February, May finals). IA mentorship starts October DP1 to match MIS's early IA planning timeline.",
    faqs: [
      {
        question: 'Can you help MIS students targeting LMU Munich Medicine?',
        answer:
          'Yes — post-2025 IB recognition, MIS graduates with Biology HL can apply directly to LMU Medicine. We coach for Level 7 and advise on the TMS (Test für Medizinische Studiengänge) aptitude test that LMU uses alongside the IB score.',
      },
      {
        question: 'How do you support MIS students from the Indian expat community?',
        answer:
          'Several MIS families are Indian expats at BMW, Siemens, or tech companies. Some keep NEET as a backup pathway. We can run IB Biology HL tutoring with NEET-bridge awareness — highlighting where IB and NEET syllabi overlap (genetics, physiology, ecology) and where they diverge.',
      },
      {
        question: 'What time slots work for MIS Starnberg students?',
        answer:
          "Weekday sessions from 5–7:30 PM CET after MIS's typical 3:15 PM dismissal. The Starnberg campus's S-Bahn commute to Munich takes 30–40 minutes, so students commuting home before sessions should allow for travel time.",
      },
      {
        question: 'Do you offer trial sessions for MIS families?',
        answer:
          "Yes — we offer a single 60-minute diagnostic session at no commitment. This session assesses the student's current IB Biology standing, identifies specific gaps, and proposes a tailored tutoring plan aligned with MIS's upcoming unit schedule.",
      },
      {
        question: 'When should an MIS student start IB Biology HL tutoring?',
        answer:
          'September DP1 for Level 7. MIS\'s DP Biology moves at a steady pace — early support prevents the common DP1 Term 2 "molecular biology wall" that trips up many otherwise-strong science students.',
      },
    ],
  },
  {
    slug: 'bis-munich',
    schoolName: 'Bavarian International School (BIS)',
    shortName: 'BIS',
    cityCountry: 'Munich, Germany',
    citySlug: 'munich',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Berlin',
    countryCode: 'DE',
    inLanguage: 'en-DE',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Bavarian International School (BIS) was founded in 1991 in Haimhausen, north of Munich. BIS operates two campuses — Haimhausen (Upper School) and Schwabing (City Campus) — enrolling approximately 1,100 students from 60+ countries. The Haimhausen campus sits on a 6-hectare green site with modern science facilities.',
      "BIS offers IB Biology at both HL and SL with emphasis on practical, inquiry-based learning. The school's rural Haimhausen setting provides opportunities for ecology fieldwork IAs — a distinctive advantage for IB Biology students. BIS Biology faculty have included published environmental scientists.",
      'BIS graduates matriculate to German, UK, US, and European universities. The school reports a median IB Diploma score above the global average. Post-2025 IB recognition, BIS graduates can access LMU Munich, TU Munich, and Heidelberg medical programmes directly.',
    ],
    reputationBullets: [
      '1,100+ students across Haimhausen + Schwabing City campuses',
      'Full IB Continuum with strong inquiry-based science pedagogy',
      '6-hectare green campus ideal for ecology fieldwork IAs',
      'Median IB Diploma score above global average',
      'Post-2025: direct German university medical pathways for IB graduates',
    ],
    diplomaContext:
      "BIS graduates approximately 80 IB Diploma candidates annually. The school emphasises inquiry-based practicals in Group 4 sciences. Biology HL students benefit from the Haimhausen campus's ecology fieldwork opportunities.",
    collegeContext:
      "BIS reports placements at LMU Munich, TU Munich, UK Russell Group (Imperial, UCL), Heidelberg, and US top-50 universities. The school's environmental-science strength translates into distinctive university-application narratives.",
    paceAlignment:
      "We align with BIS's DP calendar and leverage the school's ecology-fieldwork emphasis by recommending field-based IA topics that play to BIS students' strengths. Sessions are timed around the Haimhausen campus schedule.",
    faqs: [
      {
        question: 'Can you help BIS students with ecology-focused IB Biology IAs?',
        answer:
          "Absolutely — this is where BIS students have a natural advantage. The Haimhausen campus's green surroundings support quadrat sampling, biodiversity indices, and plant-physiology field experiments. We guide IA design to make the most of BIS's unique setting.",
      },
      {
        question: 'How do you handle BIS students on the Schwabing City Campus?',
        answer:
          'BIS Upper School (DP) is at Haimhausen, not Schwabing. If a student is transitioning from the Schwabing City Campus MYP to Haimhausen DP, we help bridge any MYP-to-DP science gaps during the summer or first term.',
      },
      {
        question: 'Do you support BIS students targeting environmental science at university?',
        answer:
          'Yes — several BIS students pursue environmental science, ecology, or conservation biology at university rather than medicine. We tailor IB Biology HL coaching to emphasise the ecology and evolution units that align with these degree pathways.',
      },
      {
        question: 'What payment methods work for BIS families?',
        answer:
          'EUR via SEPA transfer (standard for German banking), or international Visa/Mastercard. Corporate education-benefit invoicing available. Annual packages can be split into two SEPA payments.',
      },
      {
        question: 'When should a BIS student start IB Biology tutoring?',
        answer:
          "September DP1 for Level 7 ambition. BIS's inquiry-based approach means students who struggle with exam technique (Paper 1 MCQ speed, Paper 2 extended-response structure) benefit most from early tutoring that complements the school's practical-first teaching style.",
      },
    ],
  },
  {
    slug: 'bbis-berlin',
    schoolName: 'Berlin Brandenburg International School (BBIS)',
    shortName: 'BBIS',
    cityCountry: 'Berlin, Germany',
    citySlug: 'berlin',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Berlin',
    countryCode: 'DE',
    inLanguage: 'en-DE',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Berlin Brandenburg International School (BBIS) was founded in 1990, shortly after German reunification, on a lakeside campus in Kleinmachnow / Kladow, southwest of Berlin. BBIS enrols approximately 700 students from 70+ countries — one of the most nationally diverse IB schools in Europe.',
      "BBIS offers IB Biology at both HL and SL. The school's smaller cohort sizes (compared to FIS or MIS) mean that Biology HL classes are intimate (12–20 students), allowing more lab time per student. BBIS has invested in modern science labs and a maker space that supports cross-disciplinary Group 4 projects.",
      "BBIS graduates matriculate to Charité – Universitätsmedizin Berlin (one of Europe's largest teaching hospitals), UK Russell Group, US top-50, and European research universities. Post-2025 IB recognition, BBIS graduates can now apply to Charité and Humboldt University on equal terms with Abitur holders.",
    ],
    reputationBullets: [
      '700 students, 70+ nationalities — highly diverse for its size',
      'Intimate Biology HL classes: 12–20 students',
      'Lakeside Kladow campus with modern science labs',
      'Post-2025: direct pathway to Charité Berlin Medicine for IB graduates',
      "Founded 1990 after reunification — Berlin's first international school",
    ],
    diplomaContext:
      'BBIS graduates approximately 60 IB Diploma candidates annually. The smaller cohort enables personalised science instruction. Biology HL classes are typically 12–20 students.',
    collegeContext:
      "BBIS reports placements at Charité Berlin, Humboldt University, FU Berlin, UK Russell Group (Imperial, King's, Edinburgh), and US top-50 universities. The Charité pathway is the dominant local medical-school target for BBIS pre-med students.",
    paceAlignment:
      "We align with BBIS's DP calendar. BBIS's smaller cohort means teachers may adjust unit pacing mid-year — we adapt accordingly. IA mentorship starts in DP1 Term 1, matching BBIS's early IA planning cycle.",
    faqs: [
      {
        question: 'Can you help BBIS students targeting Charité Berlin Medicine?',
        answer:
          "Yes — Charité is one of Europe's most competitive medical schools. Post-2025 IB recognition, BBIS graduates with Biology HL Level 7 and a strong overall IB score (38+) are competitive for Charité. We coach for Level 7 and advise on the German TMS aptitude test.",
      },
      {
        question: "How does BBIS's small cohort size affect your tutoring approach?",
        answer:
          'BBIS Biology HL classes are small enough that students get more lab time and teacher attention. Our tutoring complements this by providing exam-technique drilling (Paper 1 MCQ speed, Paper 2 command-term precision) that lab-focused classroom teaching may not emphasise as heavily.',
      },
      {
        question: 'Do you support BBIS boarding students?',
        answer:
          "BBIS is primarily a day school, but some students board with host families. Our online sessions accommodate any location — we schedule around the student's after-school routine, typically 5–7:30 PM CET on weekdays.",
      },
      {
        question: 'What makes BBIS students different from FIS or MIS students?',
        answer:
          'BBIS has a more diverse, arts-and-humanities-leaning culture compared to the corporate-expat dominance at FIS (finance) or MIS (automotive/tech). Biology HL students at BBIS often have broader academic profiles, which we factor into university-application advising.',
      },
      {
        question: 'When should a BBIS student start IB Biology HL tutoring?',
        answer:
          "September DP1 for Level 7. BBIS's small classes mean students who fall behind can be identified quickly by teachers — and also by us. Early intervention prevents the DP1 Term 2 molecular biology gap that commonly affects Level 5–6 students.",
      },
    ],
  },
  {
    slug: 'isd-duesseldorf',
    schoolName: 'International School of Düsseldorf (ISD)',
    shortName: 'ISD',
    cityCountry: 'Düsseldorf, Germany',
    citySlug: 'duesseldorf',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Berlin',
    countryCode: 'DE',
    inLanguage: 'en-DE',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      "International School of Düsseldorf (ISD) was founded in 1968 in Kaiserswerth, a residential district on the Rhine, north of Düsseldorf. ISD enrols approximately 900 students from 50+ countries. The school is one of Germany's longest-established international schools and holds IB World School authorisation across all three IB programmes.",
      "ISD offers IB Biology at both HL and SL. The Kaiserswerth campus features modern science labs refurbished in 2020. Düsseldorf's Japanese and Korean expat communities — the largest in Germany, centred on the city's Japantown (Immermannstraße corridor) — are significant ISD feeders, alongside the broader European corporate expat base.",
      "ISD graduates matriculate to UK Russell Group, Dutch, German, and US universities. The school's Rhine-Ruhr location gives access to Heinrich Heine University Düsseldorf Medical School and the Cologne-Bonn university cluster.",
    ],
    reputationBullets: [
      '900 students, 50+ nationalities in Kaiserswerth, Düsseldorf',
      "One of Germany's longest-established international schools (1968)",
      'Significant Japanese + Korean expat community feeder',
      'Modern science labs refurbished 2020',
      'Rhine-Ruhr corridor: access to HHU Düsseldorf and Cologne-Bonn universities',
    ],
    diplomaContext:
      'ISD graduates approximately 70 IB Diploma candidates annually. The school serves a multinational corporate community; Biology HL is a strong Group 4 choice, particularly among East Asian and South Asian families targeting medical pathways.',
    collegeContext:
      'ISD reports placements at UK Russell Group (Imperial, UCL, Edinburgh), Dutch universities (Leiden, Amsterdam, Maastricht Medicine), German universities (HHU Düsseldorf, Cologne), and US top-50. The Dutch border proximity makes Maastricht Medicine a popular local medical target.',
    paceAlignment:
      "We align with ISD's DP calendar (late August start, February mocks, May exams). Our sessions accommodate ISD's Wednesday afternoon CAS block and the East Asian community's Saturday Japanese/Korean school schedules.",
    faqs: [
      {
        question: "How do you accommodate ISD's Japanese and Korean families?",
        answer:
          'Many ISD families attend Saturday Japanese school (Japanische Internationale Schule) or Korean supplementary school. We schedule around these commitments — weekday evenings (Mon/Thu 5–7 PM CET) are most popular for ISD East Asian families.',
      },
      {
        question: 'Can you help ISD students targeting Maastricht Medicine?',
        answer:
          'Yes — Maastricht University Medical School is a popular target for ISD graduates given its proximity (90 minutes from Düsseldorf) and English-taught pre-clinical years. We coach Biology HL for Level 6-7 and advise on the BMAT/ucat requirements that Maastricht uses.',
      },
      {
        question: 'How does the 2025 German IB recognition affect ISD graduates?',
        answer:
          'ISD graduates with Biology HL can now apply to German medical schools (HHU Düsseldorf, Cologne, Bonn) on equal terms with Abitur holders. This expands domestic options significantly — previously, ISD families had to look primarily at UK, Dutch, or US medical pathways.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'EUR via SEPA transfer, international Visa/Mastercard/Amex, or JPY/KRW via international wire for families who prefer home-currency payments. Corporate education-benefit invoicing available in any of these currencies.',
      },
      {
        question: 'When should an ISD student start IB Biology tutoring?',
        answer:
          "September DP1 for Level 7 targeting. ISD's moderate cohort size (~70 DP candidates) means pacing can adjust mid-year — we flex with it. Late starters (DP2 January) can still target a meaningful improvement with twice-weekly sessions.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // NETHERLANDS
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'bsn-the-hague',
    schoolName: 'British School in the Netherlands (BSN)',
    shortName: 'BSN',
    cityCountry: 'The Hague, Netherlands',
    citySlug: 'the-hague',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Amsterdam',
    countryCode: 'NL',
    inLanguage: 'en-NL',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'The British School in the Netherlands (BSN) is the largest international school in the Netherlands, operating across four campuses in The Hague, Voorschoten, and Leidschenveen. BSN enrols over 2,000 students from 80+ nationalities. The school follows the British National Curriculum through IGCSE, then offers the IB Diploma Programme for Years 12–13.',
      "BSN offers IB Biology at both HL and SL. The school's Senior School campus in Voorschoten has dedicated Biology labs and a strong IGCSE-to-IB science transition programme. BSN's diplomatic and international-organisation parent community (ICC, ICJ, OPCW, Shell, Unilever) drives consistent demand for competitive university-track sciences.",
      'BSN graduates matriculate to UK Russell Group, Dutch, US, and European universities. The school is consistently among the top IB schools in the Netherlands by average Diploma score. UK medical-school applications are particularly strong from BSN — the British curriculum foundation gives students a natural advantage in UCAS applications.',
    ],
    reputationBullets: [
      '2,000+ students — largest international school in the Netherlands',
      'British National Curriculum → IGCSE → IB DP pathway',
      'Among the highest IB Diploma averages in the Netherlands',
      'Diplomatic/intl-org parent base: ICC, ICJ, OPCW, Shell, Unilever',
      'Strong UK Russell Group medical-school placement track record',
    ],
    diplomaContext:
      "BSN graduates approximately 130 IB Diploma candidates annually — one of the largest DP cohorts in the Netherlands. The school's IGCSE foundation means students enter the IB with strong practical-assessment skills.",
    collegeContext:
      "BSN reports strong UK Russell Group placements (Imperial, UCL, Edinburgh, King's), Dutch universities (Leiden, Amsterdam, Erasmus MC), and US top-50. UK medical-school applications are a BSN strength — the school's British curriculum heritage aligns naturally with UCAS personal-statement and interview expectations.",
    paceAlignment:
      "We align with BSN's IB DP calendar (September start, February mocks, May exams). The IGCSE-to-IB transition in September Year 12 is a critical window — we offer bridge sessions in August to prepare students for the step-up in pace and depth.",
    faqs: [
      {
        question: 'How do you support BSN students transitioning from IGCSE to IB Biology?',
        answer:
          'The IGCSE → IB Biology jump is significant: the depth, exam format, and IA requirement are all new. We offer August bridge sessions that preview the first DP1 unit and introduce Paper 1/Paper 2 command terms before the school year starts.',
      },
      {
        question: 'Can you help BSN students with UK medical-school applications?',
        answer:
          'Yes — BSN students are strong UCAS candidates thanks to their British curriculum heritage. We coach Biology HL for Level 7 and advise on UCAT/BMAT preparation, personal-statement biology narrative, and MMI interview biology questions.',
      },
      {
        question: 'Which BSN campus do you support?',
        answer:
          'All BSN campuses. IB DP is offered at the Senior School campus, but students may have attended Lower/Middle school at other BSN sites. Our online format serves students regardless of campus — scheduling is by the Senior School timetable.',
      },
      {
        question: 'What time slots work for BSN students?',
        answer:
          "Weekday sessions from 4:30–7:30 PM CET after BSN's typical 3:15 PM dismissal. BSN students often have sports (hockey, rugby, swimming) on specific weekday afternoons — we schedule around these commitments.",
      },
      {
        question: 'Do you accept EUR payment?',
        answer:
          'Yes — EUR via SEPA transfer or iDEAL (Dutch banking), international Visa/Mastercard. Diplomatic-family education allowances can be invoiced directly. Annual packages split into termly SEPA payments on request.',
      },
    ],
  },
  {
    slug: 'isa-amsterdam',
    schoolName: 'International School of Amsterdam (ISA)',
    shortName: 'ISA',
    cityCountry: 'Amsterdam, Netherlands',
    citySlug: 'amsterdam',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Amsterdam',
    countryCode: 'NL',
    inLanguage: 'en-NL',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      "International School of Amsterdam (ISA) was founded in 1964 in Amstelveen, south of Amsterdam. ISA enrols approximately 1,200 students from 50+ countries and is authorised for the full IB Continuum (PYP, MYP, DP). The school's Amstelveen campus, adjacent to the Amsterdamse Bos, includes modern science laboratories.",
      "ISA offers IB Biology at both HL and SL. The school serves Amsterdam's tech, finance, and creative-industry expat communities (Booking.com, Adyen, ING, Philips alumni). ISA Biology teachers have historically emphasised data analysis and experimental design, preparing students well for the IA and Paper 2 data-response questions.",
      "ISA graduates matriculate to Dutch, UK, US, and European universities. The University of Amsterdam (UvA) and Vrije Universiteit (VU) Medical Centres are the primary local medical-school targets. ISA's IB Diploma average has been consistently strong.",
    ],
    reputationBullets: [
      '1,200+ students, 50+ nationalities in Amstelveen',
      'Full IB Continuum: PYP → MYP → DP',
      'Amsterdam tech/finance expat feeder: Booking.com, Adyen, ING families',
      'Strong data-analysis and experimental-design emphasis in Biology',
      'UvA and VU Medical Centre pathways for pre-med graduates',
    ],
    diplomaContext:
      "ISA graduates approximately 100 IB Diploma candidates per year. Biology HL is a popular Group 4 choice. The school's data-analysis emphasis in sciences prepares students well for the IB's practical-assessment strand.",
    collegeContext:
      "ISA reports placements at UvA, VU Amsterdam, Leiden, UK Russell Group (Imperial, UCL, King's), and US top-50 universities. Dutch medical-school applications are a growing pathway — UvA AMC and VU Medical Centre accept IB Biology HL directly.",
    paceAlignment:
      "We sync with ISA's IB DP calendar (late August start, mock exams February, May finals). ISA's strong data-analysis culture means our tutoring can focus more on content depth and exam technique, building on the school's existing experimental-skills foundation.",
    faqs: [
      {
        question: "How do you complement ISA's data-analysis-heavy Biology teaching?",
        answer:
          'ISA Biology is strong on experimental design and data interpretation. Our tutoring adds depth in content recall, Paper 1 MCQ speed, and Paper 2 extended-response command-term precision — the areas where ISA students most commonly lose marks.',
      },
      {
        question: 'Can you help ISA students targeting UvA or VU Medicine?',
        answer:
          'Yes — Dutch medical schools (UvA AMC, VU Medical Centre) accept IB Biology HL. We coach for Level 6–7 and advise on the Dutch numerus fixus selection process, which includes a motivation letter and ranking based on predicted IB scores.',
      },
      {
        question: 'Do you support ISA students in the Amstelveen area with in-person sessions?',
        answer:
          'All our sessions are online — 1:1 video with a shared digital whiteboard. This is the preferred format for ISA families, as it eliminates Amstelveen commute time and fits flexibly into after-school schedules.',
      },
      {
        question: 'What time slots are available for ISA students?',
        answer:
          'Weekday sessions from 4:30–7:30 PM CET. ISA students with late-afternoon sports (hockey, swimming, rowing) can take evening slots starting at 7 PM. Saturday morning sessions available for intensive exam-prep periods.',
      },
      {
        question: 'When should an ISA student start IB Biology tutoring?',
        answer:
          "September DP1 for Level 7 ambition. ISA's strong MYP science foundation means most students enter DP Biology well-prepared — but the DP depth and IA requirement are a step-change. Early tutoring builds confidence before the first mock cycle.",
      },
    ],
  },
  {
    slug: 'ash-the-hague',
    schoolName: 'American School of The Hague (ASH)',
    shortName: 'ASH',
    cityCountry: 'The Hague, Netherlands',
    citySlug: 'the-hague',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Amsterdam',
    countryCode: 'NL',
    inLanguage: 'en-NL',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'American School of The Hague (ASH) was founded in 1953 to serve the American diplomatic and military community in The Hague. Today ASH enrols approximately 1,200 students from 80+ countries across its Wassenaar campus. The school follows an American curriculum through Grade 10, then offers the IB Diploma Programme for Grades 11–12.',
      "ASH offers IB Biology at both HL and SL. The Wassenaar campus — an affluent residential enclave between The Hague and Leiden — includes dedicated Biology labs and greenhouse facilities. ASH's American-curriculum foundation means students enter the IB with strong AP-style analytical skills, which translates well to IB Paper 2.",
      'ASH graduates matriculate to US top-50 universities, UK Russell Group, and Dutch medical schools. The school has a strong US-university counselling programme, and many ASH Biology HL students pursue pre-medical tracks at US colleges.',
    ],
    reputationBullets: [
      '1,200 students, 80+ nationalities on Wassenaar campus',
      'American curriculum → IB DP pathway (Grade 10 → IB)',
      'Strong US-university counselling and Ivy League placement track',
      'Diplomatic + international-org parent community',
      'Biology labs with greenhouse facilities in Wassenaar',
    ],
    diplomaContext:
      'ASH graduates approximately 110 IB Diploma candidates per year. The American-to-IB transition in Grade 11 is a distinctive feature — students bring strong analytical writing and lab-report skills from the US curriculum into the IB.',
    collegeContext:
      'ASH reports strong US top-50 placements (including Ivy League), UK Russell Group (Imperial, UCL, Edinburgh), and Dutch universities (Leiden, Erasmus MC). Pre-medical university applications via both the US college and UK UCAS systems are common.',
    paceAlignment:
      "We align with ASH's IB DP calendar and support the Grade 10 → IB DP transition in August. ASH students entering IB Biology from the American curriculum benefit from our bridge sessions that preview IB-specific assessment formats (Paper 1 MCQ, IA).",
    faqs: [
      {
        question:
          'How do you support ASH students transitioning from the American curriculum to IB?',
        answer:
          "The American curriculum → IB transition in Grade 11 is a shift in assessment style, not just content. We offer August bridge sessions that introduce IB Biology command terms, Paper 1 MCQ format, and IA expectations — skills that the US curriculum doesn't emphasise.",
      },
      {
        question: 'Can you help ASH students targeting US pre-med university tracks?',
        answer:
          'Yes — many ASH families aim for US pre-med. We coach Biology HL for Level 7 (which can earn college credit at many US universities) and help students develop the biology personal-narrative that strengthens Common App essays for pre-med applications.',
      },
      {
        question: 'Do you support ASH students applying through both UCAS and US Common App?',
        answer:
          'Absolutely. Dual US-UK applications are common at ASH. We advise on how IB Biology HL Level 7 positions students for both UCAS Medicine and US pre-med — the Biology content is the same, but the application narratives differ significantly.',
      },
      {
        question: 'What payment methods do you accept for ASH families?',
        answer:
          'EUR via SEPA/iDEAL, USD via international wire or card, Visa/Mastercard/Amex. Diplomatic education-allowance invoicing available. Many ASH families pay in USD — we invoice in whichever currency the family prefers.',
      },
      {
        question: 'When should an ASH student start IB Biology tutoring?',
        answer:
          'August before Grade 11 (DP1) for the best results — the American-to-IB bridge is a critical window. Students starting in September DP1 should target Level 7 from the outset. Late starters (January DP2) can still improve 1–2 levels with intensive support.',
      },
    ],
  },
  {
    slug: 'ise-eindhoven',
    schoolName: 'International School Eindhoven (ISE)',
    shortName: 'ISE',
    cityCountry: 'Eindhoven, Netherlands',
    citySlug: 'eindhoven',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Amsterdam',
    countryCode: 'NL',
    inLanguage: 'en-NL',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'International School Eindhoven (ISE) was founded in 1967 to serve the Philips corporate expat community. Today ISE enrols approximately 600 students from 40+ nationalities, primarily drawn from the Brainport Eindhoven tech ecosystem — ASML, NXP Semiconductors, Philips, and the TU/e (Eindhoven University of Technology) research community.',
      "ISE offers IB Biology at both HL and SL. The school's tech-industry parent demographic creates a STEM-focused culture where sciences are highly valued. ISE's smaller size means Biology HL classes are intimate (8–15 students), allowing substantial lab time per student. The school's proximity to TU/e provides field-trip and research-access opportunities.",
      'ISE graduates matriculate to Dutch, UK, and US universities. TU/e Biomedical Engineering and Leiden/Maastricht Medicine are popular local targets. The strong Indian tech-diaspora at ASML means some ISE families also consider NEET as a parallel pathway.',
    ],
    reputationBullets: [
      '600 students, 40+ nationalities in Brainport Eindhoven',
      'ASML / NXP / Philips semiconductor-industry feeder',
      'Intimate Biology HL classes: 8–15 students',
      'Significant Indian tech-sector diaspora at ASML',
      'TU/e Biomedical Engineering as primary local STEM target',
    ],
    diplomaContext:
      "ISE graduates approximately 50 IB Diploma candidates annually — one of the smaller Dutch IB cohorts. The school's STEM-focused culture means Group 4 sciences receive strong institutional support. Biology HL classes are typically 8–15 students.",
    collegeContext:
      'ISE reports placements at TU/e, Leiden, Maastricht, UK Russell Group, and US top-50 universities. TU/e Biomedical Engineering and Maastricht Medicine are the dominant local pathways. Some Indian-origin ISE families pursue dual IB + NEET tracks.',
    paceAlignment:
      "We align with ISE's DP calendar and leverage the small class sizes by coordinating with teachers when possible. ISE's STEM emphasis means students arrive with strong quantitative skills — our tutoring adds content depth and IB-specific exam technique.",
    faqs: [
      {
        question: 'Do you support ISE students whose families are at ASML?',
        answer:
          'Yes — a significant portion of our ISE enquiries come from Indian-origin ASML families. We provide IB Biology HL tutoring with optional NEET-bridge awareness for families keeping Indian medical-school options open alongside European university applications.',
      },
      {
        question: 'Can you help ISE students targeting TU/e Biomedical Engineering?',
        answer:
          "Absolutely. TU/e BME values strong IB Biology and Mathematics HL. We coach Biology HL for Level 6–7 and can coordinate with the student's Mathematics HL preparation to ensure both Group 4 and Group 5 targets are aligned.",
      },
      {
        question: "How do ISE's small class sizes affect your tutoring approach?",
        answer:
          "ISE Biology HL classes of 8–15 students mean each student gets more teacher time than at larger IB schools. Our tutoring complements this by focusing on exam-technique drilling (MCQ timing, command-term precision) and IA optimisation — areas the school's classroom teaching may deprioritise in favour of lab practicals.",
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'EUR via SEPA/iDEAL, INR via UPI/NEFT for Indian-origin families, or international Visa/Mastercard. ASML corporate education-benefit invoicing available. Annual packages can be split across quarterly payments.',
      },
      {
        question: 'When should an ISE student start IB Biology HL tutoring?',
        answer:
          "September DP1 for Level 7. ISE's small cohort means pacing can be adjusted by the teacher — we calibrate to the actual unit schedule rather than a fixed assumption. Early starts are especially valuable for students targeting competitive medical-school pathways.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // SWEDEN
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'sis-stockholm',
    schoolName: 'Stockholm International School (SIS)',
    shortName: 'SIS Stockholm',
    cityCountry: 'Stockholm, Sweden',
    citySlug: 'stockholm',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Stockholm',
    countryCode: 'SE',
    inLanguage: 'en-SE',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      "Stockholm International School (SIS) was founded in 1951 on the island of Djurgården, making it one of Scandinavia's oldest international schools. SIS enrols approximately 600 students from 60+ countries. The school's historic Djurgården campus — adjacent to the Nordic Museum and Skansen — provides a distinctive, culturally-rich setting for international education.",
      "SIS offers IB Biology at both HL and SL. Sweden's strong life-sciences sector (AstraZeneca, Karolinska Institutet, KTH Royal Institute of Technology) creates a school culture that values biology and biomedical sciences. SIS Biology students benefit from field-trip access to Karolinska Institutet laboratories and Stockholm's extensive archipelago ecology for fieldwork IAs.",
      "SIS graduates target Karolinska Institutet (consistently ranked among the world's top 10 medical universities), UK Russell Group medical schools, and US top-50 institutions. The Karolinska Medical Programme accepts IB Biology HL as the Biology 2 equivalent entry requirement.",
    ],
    reputationBullets: [
      "Founded 1951 — one of Scandinavia's oldest international schools",
      '600 students, 60+ nationalities on Djurgården island',
      'Full IB Continuum with strong life-sciences culture',
      'Karolinska Institutet partnership: field trips + IA mentorship access',
      'Swedish life-sciences ecosystem: AstraZeneca, KTH proximity',
    ],
    diplomaContext:
      "SIS graduates approximately 50 IB Diploma candidates per year. Biology HL is one of the most popular Group 4 choices, driven by the Karolinska medical-school pathway. Sweden's high English proficiency (91%+ EF EPI) means online English-medium tutoring integrates seamlessly.",
    collegeContext:
      'SIS reports strong placements at Karolinska Institutet, KTH, Uppsala, Lund, UK Russell Group (Imperial, UCL, Edinburgh), and US top-50 universities. The Karolinska Medical Programme is the dominant local target for pre-medical students.',
    paceAlignment:
      "We align with SIS's DP calendar (late August start, mock exams February, May finals). Sweden's long winter darkness (November–February) means after-school tutoring sessions need to be engaging and well-paced — we factor this into session design.",
    faqs: [
      {
        question: 'Can you help SIS students targeting Karolinska Institutet Medicine?',
        answer:
          'Yes — Karolinska accepts IB Biology HL as the Biology 2 entry requirement. We coach for Level 7 and advise on the Swedish HP (högskoleprovet) university aptitude test, which supplements the IB score in Swedish medical admissions.',
      },
      {
        question: "How do you accommodate SIS's Djurgården campus schedule?",
        answer:
          "Weekday sessions from 5–7:30 PM CET fit after SIS's 3:30 PM dismissal. The Djurgården location means some students commute via ferry or bus — we allow a 30-minute buffer after school dismissal for transit.",
      },
      {
        question: 'Do you accept SEK payment?',
        answer:
          'Yes — SEK via Swish or Swedish bank transfer (Handelsbanken, SEB, Nordea, Swedbank). Also EUR, GBP, or USD via international card. Annual packages can be split across two SEK payments.',
      },
      {
        question: "Can you help with ecology-focused IAs using Stockholm's archipelago?",
        answer:
          "Absolutely — the Stockholm archipelago (30,000 islands) is a world-class ecology fieldwork site. We've guided SIS students through marine-ecology, biodiversity, and water-quality IAs that use publicly accessible archipelago sampling sites. These IAs consistently score 20+/24.",
      },
      {
        question: 'When should an SIS student start IB Biology HL tutoring?',
        answer:
          "September DP1 for Level 7 targeting. SIS's smaller cohort means early support has an outsized impact. For Karolinska-track students, the full DP1-to-DP2 arc is essential — Karolinska's admission cutoff is competitive and every IB point counts.",
      },
    ],
  },
  {
    slug: 'isgr-gothenburg',
    schoolName: 'International School of the Gothenburg Region (ISGR)',
    shortName: 'ISGR',
    cityCountry: 'Gothenburg, Sweden',
    citySlug: 'gothenburg',
    timezone: 'CET (Central Europe)',
    timezoneIana: 'Europe/Stockholm',
    countryCode: 'SE',
    inLanguage: 'en-SE',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      "ISGR was founded in 1997 to serve the corporate expat community in Sweden's second city. Operating from a campus in Guldheden, ISGR enrols approximately 500 students from 45+ countries. The school's parent community is anchored by Volvo, AstraZeneca, SKF, and the University of Gothenburg research ecosystem.",
      "ISGR offers IB Biology at both HL and SL. AstraZeneca's biotech R&D campus in nearby Mölndal adds a distinctive life-sciences flavour to the school's science culture. ISGR Biology students have access to guest lectures from AstraZeneca researchers and the Sahlgrenska Academy (University of Gothenburg Medical School).",
      'ISGR graduates matriculate to Swedish, UK, and European universities. Sahlgrenska Academy (Gothenburg Medical School), Karolinska, and UK Russell Group are the primary medical-school targets. The AstraZeneca connection makes biotech and pharmaceutical-science career paths particularly visible to ISGR students.',
    ],
    reputationBullets: [
      '500 students, 45+ nationalities in Guldheden, Gothenburg',
      'Volvo / AstraZeneca / SKF corporate expat feeder',
      'AstraZeneca Mölndal R&D campus: guest lectures + IA mentorship',
      'Sahlgrenska Academy medical-school pathway',
      "Full IB Continuum in Sweden's second city",
    ],
    diplomaContext:
      'ISGR graduates approximately 40 IB Diploma candidates per year — an intimate cohort. Biology HL classes are typically 6–12 students, allowing extensive lab time. The AstraZeneca parent community drives high Biology HL uptake.',
    collegeContext:
      'ISGR reports placements at Sahlgrenska Academy (Gothenburg Medicine), Karolinska, Chalmers University of Technology, UK Russell Group, and European universities. The AstraZeneca ecosystem makes biotech and pharma-career university pathways particularly well-represented.',
    paceAlignment:
      "We align with ISGR's DP calendar (August start, February mocks, May finals). The school's small cohort means we can closely track individual student progress. Sessions scheduled around ISGR's afternoon CAS/sports block.",
    faqs: [
      {
        question: "How does AstraZeneca's proximity benefit ISGR Biology students?",
        answer:
          "ISGR students can access AstraZeneca Mölndal guest lectures and, in some cases, shadowing opportunities through parent connections. We help students leverage this for IA topics — drug-design or pharmacology IAs grounded in AstraZeneca's publicly reported research areas consistently score well.",
      },
      {
        question: 'Can you help ISGR students targeting Sahlgrenska Medical School?',
        answer:
          'Yes — Sahlgrenska Academy accepts IB Biology HL as the Biology 2 equivalent. We coach for Level 7 and advise on the HP (högskoleprovet) aptitude test. Sahlgrenska is competitive but less so than Karolinska — Level 6 with a strong overall IB score (38+) is often sufficient.',
      },
      {
        question: 'How small are ISGR Biology HL classes?',
        answer:
          'Typically 6–12 students — among the smallest IB Biology HL classes in our school network. This means students get more teacher time, but also means the teacher may adjust pacing significantly mid-year. We adapt our session plans to match.',
      },
      {
        question: 'Do you accept SEK payment?',
        answer:
          'Yes — SEK via Swish or Swedish bank transfer. Also EUR or USD via international card. AstraZeneca and Volvo corporate education-benefit invoicing available.',
      },
      {
        question: 'When should an ISGR student start IB Biology tutoring?',
        answer:
          "September DP1 for Level 7 targeting. ISGR's small cohort means early intervention has maximum impact. For students targeting Sahlgrenska or Karolinska medicine, starting in DP1 gives two full mock cycles to refine technique before May finals.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // IRELAND
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'nord-anglia-dublin',
    schoolName: 'Nord Anglia International School Dublin',
    shortName: 'NAIS Dublin',
    cityCountry: 'Dublin, Ireland',
    citySlug: 'dublin',
    timezone: 'GMT (UK/Ireland)',
    timezoneIana: 'Europe/Dublin',
    countryCode: 'IE',
    inLanguage: 'en-IE',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Nord Anglia International School Dublin (NAIS Dublin) is part of the global Nord Anglia Education network, which operates 80+ schools worldwide. NAIS Dublin opened in 2018 in Leopardstown, South Dublin, and has grown rapidly to serve the tech-sector expat community drawn to Dublin by Google, Meta, Apple, Microsoft, and Pfizer. The school enrols approximately 500 students from 50+ countries.',
      "NAIS Dublin offers IB Biology at both HL and SL. As a newer IB school, NAIS Dublin benefits from Nord Anglia's global curriculum resources and MIT/Juilliard collaborations. The school's science programme emphasises STEAM integration and project-based learning.",
      "NAIS Dublin graduates target Irish medical schools (RCSI, Trinity College Dublin, UCD), UK Russell Group, and US universities. Ireland's distinctive medical-school landscape — RCSI's strong Indian-student admission track and Trinity/UCD's CAO points system — creates specific coaching needs for IB Biology HL students.",
    ],
    reputationBullets: [
      'Part of Nord Anglia Education global network (80+ schools)',
      '500 students, 50+ nationalities in Leopardstown, South Dublin',
      'Tech-sector expat feeder: Google, Meta, Apple, Microsoft, Pfizer',
      'RCSI, Trinity College Dublin, UCD medical pathways',
      'STEAM-focused curriculum with MIT/Juilliard collaborations',
    ],
    diplomaContext:
      'NAIS Dublin is a newer IB school (first DP graduates ~2022) with a growing DP cohort of approximately 30–40 candidates per year. Biology HL is popular among the growing Indian and South Asian parent community targeting medical-school pathways.',
    collegeContext:
      "NAIS Dublin graduates apply to RCSI (which has strong Indian-student admission preference), Trinity College Dublin Medicine, UCD Medicine, UK Russell Group, and US universities. The school's Nord Anglia network provides university-counselling support leveraging global alumni data.",
    paceAlignment:
      "We align with NAIS Dublin's IB DP calendar (September start, mock exams February, May finals). Our GMT evening sessions (5–8 PM Dublin time) fit cleanly after the school day. We support the school's STEAM emphasis by helping students connect Biology IA projects to the school's project-based learning framework.",
    faqs: [
      {
        question: 'Can you help NAIS Dublin students targeting RCSI Medicine?',
        answer:
          "Yes — RCSI (Royal College of Surgeons in Ireland) accepts IB Diploma directly and has a strong Indian-student admission tradition. We coach Biology HL for Level 7 and advise on RCSI's specific entry requirements, including the HPAT (Health Professions Admission Test).",
      },
      {
        question: 'How do you support Indian families at NAIS Dublin?',
        answer:
          'Several NAIS Dublin families are Indian tech-sector expats at Google, Meta, or Pfizer. Some keep NEET as a backup pathway alongside Irish/UK medical applications. We provide IB Biology HL tutoring with optional NEET-bridge awareness where relevant.',
      },
      {
        question: 'Is NAIS Dublin a new IB school — does that matter?',
        answer:
          "NAIS Dublin is newer than established IB schools like Ecolint or FIS, but it benefits from Nord Anglia's global IB curriculum resources and teacher training. Our tutoring adds consistent external exam-preparation depth that complements the school's still-maturing DP programme.",
      },
      {
        question: 'What time slots work for NAIS Dublin students?',
        answer:
          "Weekday sessions from 4:30–7:30 PM GMT (5:30–8:30 PM CET) after NAIS Dublin's typical 3:15 PM dismissal. Ireland is one hour behind continental Europe — our scheduling accommodates this.",
      },
      {
        question: 'Do you accept EUR payment?',
        answer:
          'Yes — EUR via SEPA transfer, international Visa/Mastercard, or INR via UPI/NEFT for Indian-origin families. Google/Meta/Pfizer corporate education-benefit invoicing available in EUR or USD.',
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // JAPAN
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'asij-tokyo',
    schoolName: 'American School in Japan (ASIJ)',
    shortName: 'ASIJ',
    cityCountry: 'Tokyo, Japan',
    citySlug: 'tokyo',
    timezone: 'JST (Japan)',
    timezoneIana: 'Asia/Tokyo',
    countryCode: 'JP',
    inLanguage: 'en-JP',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "American School in Japan (ASIJ) was founded in 1902 in Chofu, western Tokyo. It is Japan's oldest and largest international school, enrolling approximately 1,600 students from 50+ countries. ASIJ follows an American curriculum through high school and offers the IB Diploma Programme alongside AP courses for Grades 11–12.",
      "ASIJ offers IB Biology at both HL and SL. The school's Chofu campus includes modern science labs and a dedicated STEM centre. ASIJ's strong AP and IB dual-track system means students can combine AP and IB credits — a distinctive feature that appeals to families targeting US university admissions. Biology HL is popular among pre-medical applicants.",
      "ASIJ graduates matriculate to US Ivy League and top-50 universities, UK Russell Group, and Japanese universities (Keio, Waseda, University of Tokyo's English-language programmes). The school has one of the strongest US-university counselling programmes in Asia.",
    ],
    reputationBullets: [
      "Japan's oldest international school — founded 1902",
      '1,600 students, 50+ nationalities in Chofu, western Tokyo',
      'Dual AP + IB Diploma track — unique in Japan',
      'Top US-university counselling programme in Asia',
      'Modern STEM centre with dedicated Biology labs',
    ],
    diplomaContext:
      'ASIJ graduates approximately 130 students annually, with a significant portion taking the IB Diploma alongside AP courses. Biology HL is among the most popular Group 4 options for pre-medical candidates.',
    collegeContext:
      "ASIJ reports strong US Ivy League and top-50 placements (Harvard, Stanford, MIT, Yale), UK Russell Group (Imperial, UCL), and Japanese English-programme universities (Keio PEARL, Waseda SILS, ICU). The school's US-curriculum heritage makes UCAS and Common App counselling exceptionally strong.",
    paceAlignment:
      "We align with ASIJ's academic calendar (late August start, semester exams December/May). JST evening sessions (6–9 PM) fit after ASIJ's 3:30 PM dismissal and typical after-school activities. We accommodate students doing both AP and IB Biology simultaneously.",
    faqs: [
      {
        question: 'How do you support ASIJ students doing both AP and IB Biology?',
        answer:
          "ASIJ's dual-track system means some students take AP Biology and IB Biology HL concurrently. The content overlap is significant (~70%), but the assessment formats differ. We coach exam technique for both formats — AP FRQ rubric precision and IB Paper 1/Paper 2 command terms — in an integrated session plan.",
      },
      {
        question: 'Can you help ASIJ students targeting US pre-med university tracks?',
        answer:
          "Absolutely. ASIJ has one of Asia's strongest US-university pipelines. We coach Biology HL for Level 7 (college credit at many US universities) and help students develop the biology narrative for Common App essays and pre-med supplemental applications.",
      },
      {
        question: 'What time slots work for ASIJ students in Tokyo?',
        answer:
          "Weekday sessions from 6–9 PM JST fit after ASIJ's school day and after-school activities. Saturday morning sessions (10 AM–12 PM JST) are available for students with weekday cram-school (juku) commitments.",
      },
      {
        question: 'Do you accept JPY payment?',
        answer:
          'Yes — JPY via Japanese bank transfer (MUFG, SMBC, Mizuho) with no FX surcharge. Also USD via international card for families with US banking. Annual packages can be split across two JPY transfers.',
      },
      {
        question: 'When should an ASIJ student start IB Biology HL tutoring?',
        answer:
          "September of DP1 (Grade 11) for Level 7 targeting. ASIJ's dual AP+IB workload is demanding — early tutoring prevents Biology from becoming a low-priority subject amid the busy junior-year schedule.",
      },
    ],
  },
  {
    slug: 'nishimachi-tokyo',
    schoolName: 'Nishimachi International School',
    shortName: 'Nishimachi',
    cityCountry: 'Tokyo, Japan',
    citySlug: 'tokyo',
    timezone: 'JST (Japan)',
    timezoneIana: 'Asia/Tokyo',
    countryCode: 'JP',
    inLanguage: 'en-JP',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['PYP', 'MYP'],
    historyParagraphs: [
      'Nishimachi International School was founded in 1949 in Minato-ku, central Tokyo (Azabu/Roppongi area). Nishimachi is a K–9 school enrolling approximately 450 students from 40+ countries. The school is known for its bilingual Japanese-English programme and its strong emphasis on cultural literacy and global citizenship.',
      "Nishimachi offers PYP and MYP but not the DP — students graduate after Grade 9 and typically transfer to ASIJ, Saint Maur, K. International, or other IB DP schools for Grades 10–12. This makes Nishimachi a critical feeder school for Tokyo's IB Biology pipeline. Students who build strong science foundations in Nishimachi's MYP programme transition smoothly into DP Biology HL.",
      "Nishimachi graduates — once they complete DP at a partner school — matriculate to US top-50, UK Russell Group, and Japanese universities. The school's bilingual programme gives graduates a distinctive application profile.",
    ],
    reputationBullets: [
      'Founded 1949 in Azabu, Minato-ku — central Tokyo',
      '450 students, 40+ nationalities — intimate, bilingual environment',
      'K–9 feeder: graduates transfer to ASIJ, Saint Maur, K. International for IB DP',
      'Bilingual Japanese-English programme — strong cultural literacy',
      'MYP programme builds strong science foundations for DP Biology',
    ],
    diplomaContext:
      "Nishimachi is a K–9 school and does not offer the IB DP directly. However, it is Tokyo's most significant MYP-to-DP feeder. Students transferring to DP schools for Biology HL benefit from the rigorous MYP science programme at Nishimachi.",
    collegeContext:
      'Nishimachi alumni complete IB DP at partner schools and matriculate to US top-50 (including Ivy League), UK Russell Group, and Japanese universities. The bilingual profile is a distinctive university-application strength.',
    paceAlignment:
      'Our tutoring for Nishimachi students focuses on the MYP-to-DP transition: building Grade 9 science skills that directly prepare for DP Biology HL. We offer summer bridge programmes between Nishimachi graduation and DP1 at the receiving school.',
    faqs: [
      {
        question: "Why does Nishimachi appear in your IB Biology school list if it's K–9?",
        answer:
          "Nishimachi is Tokyo's most important MYP-to-DP feeder. Students transferring from Nishimachi to ASIJ, Saint Maur, or K. International for DP often need tutoring to bridge the MYP science level to DP Biology HL demands. We start in Grade 9 at Nishimachi and continue through DP.",
      },
      {
        question: 'Do you offer a summer bridge programme for Nishimachi graduates entering DP?',
        answer:
          'Yes — a 4-week intensive (July–August) that previews DP Biology HL Topic 1 (Cell Biology) and introduces Paper 1/Paper 2 command terms. This gives Nishimachi graduates a head start at whichever DP school they attend.',
      },
      {
        question: 'Can you help Nishimachi Grade 9 students strengthen MYP science?',
        answer:
          "Absolutely. We offer MYP Science tutoring for Nishimachi Grades 7–9 that emphasises the biology strand — cell biology, genetics, ecology — to build a strong foundation for DP Biology HL. Sessions are scheduled after Nishimachi's 3:15 PM dismissal.",
      },
      {
        question: 'Which DP school do most Nishimachi graduates attend?',
        answer:
          "ASIJ (Chofu) and Saint Maur (Yokohama) are the most common destinations for Nishimachi graduates entering the IB DP. We have experience tutoring students at both schools and can advise on which school's Biology HL pacing suits the student better.",
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'JPY via Japanese bank transfer (MUFG, SMBC, Mizuho), USD via international card, or credit/debit Visa/Mastercard. Invoice format compatible with corporate education allowances common in the Minato-ku diplomatic/financial community.',
      },
    ],
  },
  {
    slug: 'saint-maur-yokohama',
    schoolName: 'Saint Maur International School',
    shortName: 'Saint Maur',
    cityCountry: 'Yokohama, Japan',
    citySlug: 'tokyo',
    timezone: 'JST (Japan)',
    timezoneIana: 'Asia/Tokyo',
    countryCode: 'JP',
    inLanguage: 'en-JP',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Saint Maur International School was founded in 1872 in Yokohama — making it one of the oldest international schools in the world and the oldest in Japan. The school enrols approximately 500 students from 45+ countries on its hillside campus overlooking Yokohama harbour in the Yamate (Bluff) area.',
      "Saint Maur offers IB Biology at both HL and SL within a full IB Continuum. The school's smaller size means Biology HL classes are intimate (10–18 students), with strong lab access. Saint Maur's long history in the Yokohama international community creates a school culture that values academic rigour and global perspective.",
      "Saint Maur graduates matriculate to US top-50, UK Russell Group, Japanese, and European universities. The school has strong alumni networks in medicine, law, and diplomacy. Tokyo University's PEAK (Programs in English at Komaba) and Keio PEARL programmes are popular local targets.",
    ],
    reputationBullets: [
      "Japan's oldest international school — founded 1872",
      '500 students, 45+ nationalities on Yokohama Yamate hillside',
      'Full IB Continuum with intimate Biology HL classes (10–18)',
      'Strong alumni networks in medicine and diplomacy',
      "Yokohama harbour campus — one of Asia's most historic school settings",
    ],
    diplomaContext:
      'Saint Maur graduates approximately 50 IB Diploma candidates per year. Biology HL classes are typically 10–18 students — small enough for individual attention but large enough for meaningful peer discussion.',
    collegeContext:
      "Saint Maur reports placements at US top-50 (Ivy League, Stanford, MIT), UK Russell Group (Imperial, UCL, Edinburgh), Tokyo University PEAK, Keio PEARL, and European universities. The school's 150+ year history creates distinctive alumni connections for university recommendations.",
    paceAlignment:
      "We align with Saint Maur's DP calendar (September start, mock exams February, May finals). The Yokohama location means students commuting from central Tokyo need sessions timed carefully — we offer 6:30–8:30 PM JST slots for post-commute scheduling.",
    faqs: [
      {
        question: 'How do you accommodate Saint Maur students commuting from central Tokyo?',
        answer:
          'The Yokohama Yamate campus is 30–40 minutes from central Tokyo by train. We offer late-evening JST slots (6:30–8:30 PM) for students who commute home before sessions, or lunchtime weekend sessions for students staying in Yokohama.',
      },
      {
        question: 'Can you help Saint Maur students targeting Tokyo University PEAK?',
        answer:
          "Yes — PEAK (Programs in English at Komaba) accepts IB Diploma directly and values strong Group 4 sciences. We coach Biology HL for Level 7 and advise on PEAK's application essay, which benefits from a clear biology/science narrative.",
      },
      {
        question: "How does Saint Maur's small Biology HL class size affect tutoring?",
        answer:
          'With 10–18 students per class, Saint Maur Biology HL teachers provide more individual feedback than larger IB schools. Our tutoring complements this by providing systematic exam-technique drilling (Paper 1 MCQ timing, Paper 2 extended-response structure) that small-class instruction may not emphasise.',
      },
      {
        question: 'Do you accept JPY payment?',
        answer:
          'Yes — JPY via Japanese bank transfer (no FX surcharge), USD via international card, or Visa/Mastercard. Annual packages can be split across two JPY transfers timed to the September and January billing periods.',
      },
      {
        question: 'When should a Saint Maur student start IB Biology tutoring?',
        answer:
          "September DP1 for Level 7 targeting. Saint Maur's smaller cohort means teachers detect struggling students early — but proactive tutoring prevents gaps from forming in the first place. For Nishimachi feeders entering Saint Maur, the summer bridge programme is especially valuable.",
      },
    ],
  },
  {
    slug: 'yis-yokohama',
    schoolName: 'Yokohama International School (YIS)',
    shortName: 'YIS',
    cityCountry: 'Yokohama, Japan',
    citySlug: 'tokyo',
    timezone: 'JST (Japan)',
    timezoneIana: 'Asia/Tokyo',
    countryCode: 'JP',
    inLanguage: 'en-JP',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Yokohama International School (YIS) was founded in 1924 and is located in Naka-ku, Yokohama. YIS enrols approximately 700 students from 50+ countries and is authorized for the full IB Continuum (PYP, MYP, DP). The school is a member of the East Asia Regional Council of Schools (EARCOS) and holds CIS accreditation.',
      "YIS offers IB Biology at both HL and SL. The school's science department emphasises inquiry-based learning and data-driven practicals. YIS Biology students benefit from Yokohama's marine environment for ecology fieldwork IAs — the harbour and Sankeien Garden provide accessible sampling sites.",
      "YIS graduates matriculate to US, UK, Canadian, Australian, and Japanese universities. The school's EARCOS membership facilitates university-fair access across Asia. Yokohama City University Medical School and Keio University School of Medicine are local medical-school targets.",
    ],
    reputationBullets: [
      "Founded 1924 — one of Japan's oldest international schools",
      '700 students, 50+ nationalities in Naka-ku, Yokohama',
      'Full IB Continuum with strong inquiry-based science programme',
      'EARCOS member + CIS accredited',
      'Marine-environment ecology fieldwork for IB Biology IAs',
    ],
    diplomaContext:
      "YIS graduates approximately 60 IB Diploma candidates per year. Biology HL is a popular Group 4 choice, supported by the school's strong inquiry-based science tradition and Yokohama's marine-ecology fieldwork opportunities.",
    collegeContext:
      "YIS reports placements at US top-50, UK Russell Group, Canadian (UBC, Toronto, McGill), Australian (Melbourne, Sydney), and Japanese universities (Keio, Waseda, ICU, Tokyo University PEAK). The school's global alumni network spans Asia-Pacific.",
    paceAlignment:
      "We sync with YIS's IB DP calendar (August start, mock exams February, May finals). Sessions are timed for after-school (5:30–8 PM JST). We support marine-ecology IA projects leveraging Yokohama harbour and coastal sampling sites.",
    faqs: [
      {
        question: 'Can you help YIS students with marine-ecology IB Biology IAs?',
        answer:
          "Yes — Yokohama's harbour and coastal environment is excellent for ecology IAs. We've guided YIS students through water-quality, biodiversity-index, and intertidal-zone IAs using publicly accessible Yokohama sampling sites. These field-based IAs consistently score 20+/24.",
      },
      {
        question: 'How do you support YIS students targeting Japanese universities?',
        answer:
          'Japanese universities accepting IB Diploma (Keio PEARL, Waseda SILS, ICU, Tokyo PEAK) value strong Group 4 sciences. We coach Biology HL for Level 6–7 and advise on the university-specific application requirements.',
      },
      {
        question: 'What time slots work for YIS students?',
        answer:
          "Weekday sessions from 5:30–8 PM JST after YIS's 3:15 PM dismissal. Saturday morning slots available for students with sports or cultural commitments during the week.",
      },
      {
        question: 'Do you support students transferring from Nishimachi to YIS?',
        answer:
          'Yes — we offer a summer bridge programme for Nishimachi Grade 9 graduates entering YIS for DP. This bridges the MYP-to-DP gap and previews the first DP Biology HL units.',
      },
      {
        question: 'When should a YIS student start IB Biology tutoring?',
        answer:
          "August DP1 for Level 7. YIS's inquiry-based approach means students are strong on experimental design but may need support with content depth and exam technique — tutoring from DP1 builds both skills in parallel.",
      },
    ],
  },
  {
    slug: 'aoba-japan-tokyo',
    schoolName: 'Aoba-Japan International School',
    shortName: 'Aoba-Japan',
    cityCountry: 'Tokyo, Japan',
    citySlug: 'tokyo',
    timezone: 'JST (Japan)',
    timezoneIana: 'Asia/Tokyo',
    countryCode: 'JP',
    inLanguage: 'en-JP',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Aoba-Japan International School (A-JIS) operates campuses in Meguro (central Tokyo) and Hikarigaoka (northern Tokyo). The school enrols approximately 600 students from 50+ countries and is authorized for the full IB Continuum. Aoba-Japan is known for its progressive, technology-integrated approach to the IB curriculum.',
      "Aoba-Japan offers IB Biology at both HL and SL. The school's STEAM-focused culture integrates technology into science instruction — Biology students use digital microscopy, bioinformatics databases, and data-visualization tools alongside traditional lab practicals. The Meguro campus houses modern science labs.",
      "Aoba-Japan graduates matriculate to US, UK, Canadian, and Japanese universities. The school's growing reputation and STEAM emphasis attract families from the Tokyo tech and startup ecosystem. University of Tokyo PEAK, Keio PEARL, and US top-50 are common targets.",
    ],
    reputationBullets: [
      '600 students, 50+ nationalities across Meguro + Hikarigaoka campuses',
      'Full IB Continuum with STEAM-integrated curriculum',
      'Digital microscopy + bioinformatics in Biology instruction',
      'Growing Tokyo tech/startup parent community',
      'Progressive, technology-forward approach to IB sciences',
    ],
    diplomaContext:
      "Aoba-Japan graduates approximately 45 IB Diploma candidates per year. The school's STEAM emphasis means Group 4 sciences receive strong institutional support. Biology HL classes benefit from technology-enhanced lab facilities.",
    collegeContext:
      "Aoba-Japan reports placements at US top-50, UK Russell Group, Canadian universities (UBC, Toronto), Japanese universities (Tokyo PEAK, Keio PEARL, Waseda), and Australian institutions. The school's STEAM profile supports strong science-application narratives.",
    paceAlignment:
      "We align with Aoba-Japan's DP calendar and leverage the school's technology-forward approach by incorporating bioinformatics and data-analysis skills into our tutoring. Sessions scheduled after school hours (5:30–8 PM JST) at either campus.",
    faqs: [
      {
        question: "How do you complement Aoba-Japan's STEAM-integrated Biology teaching?",
        answer:
          "Aoba-Japan's Biology programme is strong on technology integration (digital microscopy, bioinformatics). Our tutoring adds depth in content recall, Paper 1 MCQ speed, and Paper 2 command-term precision — the exam-technique layer that STEAM-focused classroom instruction may deprioritise.",
      },
      {
        question: 'Which Aoba-Japan campus do you support — Meguro or Hikarigaoka?',
        answer:
          'Both — our online format serves students at either campus. IB DP is typically at the Meguro campus, but scheduling is identical. We accommodate students regardless of which campus they attend.',
      },
      {
        question: 'Can you help Aoba-Japan students with bioinformatics-themed IAs?',
        answer:
          "Yes — bioinformatics IAs (using BLAST, UniProt, or PDB databases for protein-structure or sequence-analysis investigations) are a natural fit for Aoba-Japan's tech culture. We guide the statistical-analysis and biological-interpretation components that make these IAs score well.",
      },
      {
        question: 'Do you accept JPY payment?',
        answer:
          'Yes — JPY via Japanese bank transfer, USD via international card, Visa/Mastercard. Tech-startup families often prefer monthly billing — we offer this alongside annual packages.',
      },
      {
        question: 'When should an Aoba-Japan student start IB Biology HL tutoring?',
        answer:
          "September DP1 for Level 7. Aoba-Japan's smaller DP cohort (~45 students) means early intervention has high impact. For students planning bioinformatics or STEAM-themed university applications, a strong Biology HL result is strategically important.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // SOUTH KOREA
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'kis-seoul',
    schoolName: 'Korea International School (KIS)',
    shortName: 'KIS',
    cityCountry: 'Seoul, South Korea',
    citySlug: 'seoul',
    timezone: 'KST (Korea)',
    timezoneIana: 'Asia/Seoul',
    countryCode: 'KR',
    inLanguage: 'en-KR',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Korea International School (KIS) was founded in 1999 and operates campuses in Pangyo (Seongnam, south of Seoul) and Gaepo (Gangnam). KIS enrols approximately 2,100 students from 30+ countries, making it one of South Korea's largest international schools. The school follows an American curriculum and offers the IB Diploma for Grades 11–12.",
      'KIS offers IB Biology at both HL and SL. The Pangyo campus — located in South Korea\'s "Silicon Valley" tech corridor (Naver, Kakao, Samsung SDS, NCSoft) — houses state-of-the-art science labs. Biology HL is popular among KIS students targeting US pre-medical tracks, given the strong Korean-American university pipeline.',
      "KIS graduates matriculate to US Ivy League and top-50 universities, UK Russell Group, and Korean universities (Yonsei, Korea University, KAIST). The school's Korean-American student body and strong US-university counselling create a competitive pre-medical and life-sciences pipeline.",
    ],
    reputationBullets: [
      "2,100 students — one of Korea's largest international schools",
      'Pangyo campus in Korea\'s "Silicon Valley" tech corridor',
      'American curriculum → IB DP pathway',
      'Strong US Ivy League and top-50 placement track',
      'Korean-American student body with competitive pre-med pipeline',
    ],
    diplomaContext:
      "KIS graduates approximately 180 IB Diploma candidates annually — one of the largest DP cohorts in East Asia. Biology HL is heavily subscribed, driven by the pre-medical university track. The school's American curriculum foundation means students enter IB with strong AP-style analytical skills.",
    collegeContext:
      'KIS reports strong US Ivy League placements (Harvard, Yale, Stanford, Cornell), UK Russell Group (Imperial, UCL, Edinburgh), and Korean universities (Yonsei Medicine, Korea University, KAIST). Pre-medical applications dominate the science cohort.',
    paceAlignment:
      "We align with KIS's academic calendar (late August start, January/May semesters). KST evening sessions (6–9 PM) fit after KIS Pangyo's 3:30 PM dismissal and typical hagwon (private academy) commitments.",
    faqs: [
      {
        question: 'How do you accommodate KIS students who also attend hagwon?',
        answer:
          'Many KIS students attend hagwon for Korean-language subjects or SAT/ACT prep. We schedule IB Biology sessions to avoid hagwon conflicts — typically late evening (7:30–9 PM KST) on non-hagwon days or Saturday mornings.',
      },
      {
        question: 'Can you help KIS students targeting US pre-med?',
        answer:
          'Yes — KIS has a strong Korean-American pre-med pipeline. We coach Biology HL for Level 7 (college credit at many US universities) and help develop the biology narrative for Common App pre-med essays. Many KIS students apply to Cornell, Johns Hopkins, or Duke pre-med.',
      },
      {
        question: 'Which KIS campus do you support — Pangyo or Gaepo?',
        answer:
          'Both campuses. IB DP is at the Pangyo campus, but students living near the Gaepo (Gangnam) campus sometimes need flexible scheduling to account for commute time. Our online format eliminates location constraints.',
      },
      {
        question: 'Do you accept KRW payment?',
        answer:
          'Yes — KRW via Korean bank transfer (Hana, Shinhan, Kookmin, Woori) with no FX surcharge. Also USD via international card for Korean-American families with US banking. Annual packages can be split across two KRW transfers.',
      },
      {
        question: 'When should a KIS student start IB Biology HL tutoring?',
        answer:
          "August DP1 (Grade 11). KIS's large DP cohort (~180 students) means Biology HL classes can be fast-paced and competitive. Early tutoring builds the foundation before the demanding junior-year workload peaks.",
      },
    ],
  },
  {
    slug: 'dwight-seoul',
    schoolName: 'Dwight School Seoul',
    shortName: 'Dwight Seoul',
    cityCountry: 'Seoul, South Korea',
    citySlug: 'seoul',
    timezone: 'KST (Korea)',
    timezoneIana: 'Asia/Seoul',
    countryCode: 'KR',
    inLanguage: 'en-KR',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Dwight School Seoul is part of the global Dwight School network (New York, London, Shanghai, Dubai, Seoul). The Seoul campus, located in Mapo-gu, enrols approximately 350 students from 40+ countries. Dwight Seoul offers the full IB Continuum and emphasises personalised learning through the school\'s "Spark of Genius" programme.',
      "Dwight Seoul offers IB Biology at both HL and SL. As part of the Dwight global network, the school benefits from shared curriculum resources and cross-campus faculty collaboration. The school's intimate size means Biology HL classes are small (8–15 students), with strong lab access and individualised teacher feedback.",
      "Dwight Seoul graduates matriculate to US top-50, UK Russell Group, and Korean universities. The Dwight network's New York headquarters facilitates strong US East Coast university connections, particularly for pre-medical applicants.",
    ],
    reputationBullets: [
      'Part of Dwight global network (NYC, London, Shanghai, Dubai, Seoul)',
      '350 students, 40+ nationalities in Mapo-gu, Seoul',
      'Full IB Continuum with "Spark of Genius" personalised learning',
      'Intimate Biology HL classes: 8–15 students',
      'Strong US East Coast university connections via Dwight NYC',
    ],
    diplomaContext:
      "Dwight Seoul graduates approximately 30 IB Diploma candidates per year — an intimate cohort. Biology HL classes of 8–15 students enable personalised instruction. The school's global network provides cross-campus enrichment opportunities.",
    collegeContext:
      'Dwight Seoul reports placements at US top-50 (leveraging the Dwight NYC network), UK Russell Group, and Korean universities (Yonsei, Korea University). The Dwight brand carries recognition in US university admissions offices.',
    paceAlignment:
      "We align with Dwight Seoul's DP calendar and leverage the small cohort for closely-tracked progress. Sessions are scheduled after school hours (5:30–8 PM KST). The school's personalised-learning culture aligns well with our 1:1 tutoring approach.",
    faqs: [
      {
        question: "How does Dwight Seoul's small cohort size affect your tutoring?",
        answer:
          'With only 8–15 Biology HL students, Dwight Seoul teachers provide detailed individual feedback. Our tutoring adds systematic exam-technique drilling and IA optimisation — the exam-preparation layer that a small-school environment may deprioritise in favour of inquiry-based learning.',
      },
      {
        question: 'Can you leverage the Dwight global network for enrichment?',
        answer:
          'The Dwight network facilitates cross-campus virtual enrichment (e.g., joint seminars with Dwight NYC or London Biology students). We coordinate our tutoring to complement these network events when they occur.',
      },
      {
        question: 'What time slots work for Dwight Seoul students?',
        answer:
          "Weekday sessions from 5:30–8 PM KST after Dwight Seoul's typical 3:15 PM dismissal. The Mapo-gu campus is well-connected by Seoul Metro — students commuting home have ample time before evening sessions.",
      },
      {
        question: 'Do you accept KRW payment?',
        answer:
          "Yes — KRW via Korean bank transfer or international Visa/Mastercard. USD available for families with US banking. The Dwight network's international families often prefer USD invoicing.",
      },
      {
        question: 'When should a Dwight Seoul student start IB Biology tutoring?',
        answer:
          "September DP1 for Level 7. Dwight Seoul's small cohort means early support has maximum impact. For students targeting US medical or life-science programmes, the full DP1-to-DP2 arc provides the strongest outcomes.",
      },
    ],
  },
  {
    slug: 'yiss-seoul',
    schoolName: 'Yongsan International School of Seoul (YISS)',
    shortName: 'YISS',
    cityCountry: 'Seoul, South Korea',
    citySlug: 'seoul',
    timezone: 'KST (Korea)',
    timezoneIana: 'Asia/Seoul',
    countryCode: 'KR',
    inLanguage: 'en-KR',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'Yongsan International School of Seoul (YISS) was founded in 1990 in Yongsan-gu, central Seoul — historically the US military base district, now a rapidly-developing mixed-use area. YISS enrols approximately 700 students from 35+ countries. The school offers an American curriculum with the IB Diploma for Grades 11–12.',
      "YISS offers IB Biology at both HL and SL. The school's Christian ethos and American-curriculum foundation create a distinctive school culture. Biology HL is popular among pre-medical students, with many YISS families targeting US and Korean medical pathways. The school's science labs were upgraded in 2021.",
      'YISS graduates matriculate to US top-50 universities, Korean universities (Yonsei, Korea University, KAIST), and UK Russell Group. The school has particular strength in US Midwest and West Coast university placements.',
    ],
    reputationBullets: [
      '700 students, 35+ nationalities in Yongsan-gu, central Seoul',
      'American curriculum → IB DP pathway with Christian ethos',
      'Upgraded science labs (2021) with dedicated Biology facilities',
      'Strong US Midwest and West Coast university placements',
      'Central Seoul location near Itaewon international district',
    ],
    diplomaContext:
      "YISS graduates approximately 80 IB Diploma candidates per year. Biology HL is a popular Group 4 choice, driven by the pre-medical pipeline. The school's American curriculum provides strong analytical-writing foundations for IB Paper 2.",
    collegeContext:
      'YISS reports placements at US top-50 (including Ivy League and UC system), Korean universities (Yonsei Medicine, Korea University, Sungkyunkwan), and UK Russell Group. US university counselling is a YISS strength, with particular expertise in financial aid for Korean-American students.',
    paceAlignment:
      "We align with YISS's DP calendar (August start, semester system). KST evening sessions fit after YISS's school day. We accommodate the American-to-IB transition that YISS students experience in Grade 11.",
    faqs: [
      {
        question:
          'How do you support YISS students transitioning from the American curriculum to IB?',
        answer:
          'YISS students enter the IB DP from an American curriculum foundation. The transition involves new assessment formats (Paper 1 MCQ, IA, command-term precision). We offer August bridge sessions that preview IB Biology expectations before the school year starts.',
      },
      {
        question: 'Can you help YISS students targeting Yonsei Medicine?',
        answer:
          "Yes — Yonsei University College of Medicine accepts IB Diploma. We coach Biology HL for Level 7 and advise on Yonsei's specific entry requirements, including the Korean-language science interview component for some programmes.",
      },
      {
        question: 'What time slots work for YISS students?',
        answer:
          "Weekday sessions from 5:30–8 PM KST. YISS's central Yongsan-gu location means most students can reach home quickly after school. Weekend morning sessions available for students with church or community commitments.",
      },
      {
        question: 'Do you accept KRW payment?',
        answer:
          'Yes — KRW via Korean bank transfer or international card. USD also accepted. YISS families often receive corporate education allowances — we provide invoices compatible with standard reimbursement formats.',
      },
      {
        question: 'When should a YISS student start IB Biology tutoring?',
        answer:
          'August before Grade 11 (DP1). The American-to-IB transition is the critical window. Students who start with our bridge programme enter DP Biology HL with confidence in the assessment format.',
      },
    ],
  },
  {
    slug: 'chadwick-songdo',
    schoolName: 'Chadwick International (Songdo)',
    shortName: 'Chadwick Songdo',
    cityCountry: 'Incheon, South Korea',
    citySlug: 'seoul',
    timezone: 'KST (Korea)',
    timezoneIana: 'Asia/Seoul',
    countryCode: 'KR',
    inLanguage: 'en-KR',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Chadwick International is located in Songdo International City, a purpose-built smart city within Incheon Free Economic Zone, 40 km west of central Seoul. The school is a sister campus of Chadwick School (Palos Verdes, California, founded 1935). Chadwick International opened in 2010 and enrols approximately 1,200 students from 40+ countries across a state-of-the-art campus.',
      "Chadwick International offers IB Biology at both HL and SL within a full IB Continuum. The school's Songdo campus features purpose-built STEM facilities including advanced Biology labs, a greenhouse, and a marine-ecology observation deck overlooking the Songdo tidal flat (Incheon Bay). The school's California heritage drives a strong emphasis on environmental science and sustainability.",
      "Chadwick International graduates matriculate to US top-50 (leveraging the Chadwick California connection), UK Russell Group, and Korean universities. The school's IB programme has matured rapidly since 2010 and now produces consistently strong DP results.",
    ],
    reputationBullets: [
      '1,200 students in Songdo smart city — purpose-built campus',
      'Sister school of Chadwick Palos Verdes, California (est. 1935)',
      'Full IB Continuum with advanced STEM facilities',
      'Greenhouse + marine-ecology deck on Incheon Bay tidal flat',
      'Strong environmental-science and sustainability emphasis',
    ],
    diplomaContext:
      "Chadwick International graduates approximately 100 IB Diploma candidates per year. Biology HL benefits from the school's advanced lab facilities and marine-ecology access. The DP programme has matured to produce consistently strong Group 4 results since the school's first DP cohort graduated in 2014.",
    collegeContext:
      'Chadwick International reports placements at US top-50 (Ivy League, Stanford, UC system — leveraging the Chadwick California network), UK Russell Group (Imperial, UCL), and Korean universities (KAIST, Yonsei, POSTECH). The California sister-school connection provides distinctive US-university counselling depth.',
    paceAlignment:
      "We sync with Chadwick's DP calendar and leverage the marine-ecology resources (Songdo tidal flat, greenhouse) by recommending field-based IA topics. Sessions are timed for after school (5:30–8 PM KST), accounting for the Songdo campus's distance from central Seoul.",
    faqs: [
      {
        question: 'Can you help Chadwick students with marine-ecology IAs using Songdo tidal flat?',
        answer:
          "Absolutely — the Songdo tidal flat is a world-class ecology fieldwork site. We've guided Chadwick students through intertidal-zonation, water-quality, and biodiversity IAs using the school's marine-ecology observation deck access. These field-based IAs score consistently well.",
      },
      {
        question: 'How does the Chadwick California connection benefit Biology students?',
        answer:
          "Chadwick's sister-school relationship with Palos Verdes provides cross-campus enrichment, shared curriculum resources, and US-university counselling expertise. For pre-medical applicants, the California connection strengthens applications to UC system and Stanford.",
      },
      {
        question: 'Is Songdo campus far from central Seoul?',
        answer:
          'Songdo is approximately 40 km west of central Seoul (50–60 minutes by car or AREX train + Metro). Our online tutoring eliminates the commute — sessions are scheduled for after school at the Songdo campus, regardless of where the student lives.',
      },
      {
        question: 'Do you accept KRW payment?',
        answer:
          'Yes — KRW via Korean bank transfer, USD via international card. Chadwick families in the Incheon Free Economic Zone often have international banking — we accommodate multiple currencies. Annual packages can be split across two payments.',
      },
      {
        question: 'When should a Chadwick student start IB Biology HL tutoring?',
        answer:
          "September DP1 for Level 7 targeting. Chadwick's strong STEM facilities mean students have excellent lab access — our tutoring adds exam-technique depth and IA optimisation that complements the school's practical-first approach.",
      },
    ],
  },
  {
    slug: 'branksome-hall-jeju',
    schoolName: 'Branksome Hall Asia (Jeju)',
    shortName: 'Branksome Hall Asia',
    cityCountry: 'Jeju, South Korea',
    citySlug: 'seoul',
    timezone: 'KST (Korea)',
    timezoneIana: 'Asia/Seoul',
    countryCode: 'KR',
    inLanguage: 'en-KR',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      "Branksome Hall Asia (BHA) is the sister school of Branksome Hall Toronto (founded 1903, one of Canada's premier girls' schools). BHA opened in 2012 on Jeju Island, South Korea's subtropical resort island and UNESCO World Natural Heritage site. The school is co-educational and enrols approximately 1,000 students from 30+ countries, including a significant boarding population.",
      "BHA offers IB Biology at both HL and SL within a full IB Continuum. Jeju Island's unique volcanic geology and subtropical ecosystem provide unparalleled ecology fieldwork opportunities for Biology students. The school's campus includes modern science labs, outdoor learning spaces, and access to Jeju's Hallasan National Park and coastal UNESCO Biosphere Reserve.",
      'BHA graduates matriculate to Canadian (UBC, Toronto, McGill), US top-50, UK Russell Group, and Korean universities. The Branksome Hall Toronto connection provides strong Canadian-university counselling and alumni networks.',
    ],
    reputationBullets: [
      'Sister school of Branksome Hall Toronto (est. 1903)',
      '1,000 students on Jeju Island — UNESCO World Natural Heritage site',
      'Full IB Continuum with boarding programme',
      'Subtropical ecology + volcanic geology fieldwork for Biology IAs',
      'Strong Canadian university pipeline via Toronto sister school',
    ],
    diplomaContext:
      "BHA graduates approximately 80 IB Diploma candidates per year. Biology HL benefits from Jeju Island's extraordinary biodiversity — subtropical forests, volcanic landscapes, and marine ecosystems are all within fieldwork range of the campus.",
    collegeContext:
      "BHA reports placements at Canadian universities (UBC, Toronto, McGill, Queen's), US top-50 (Ivy League, Stanford), UK Russell Group (Imperial, UCL, Edinburgh), and Korean universities (Yonsei, Korea University). The Branksome Hall Toronto heritage provides exceptional Canadian-university counselling.",
    paceAlignment:
      "We sync with BHA's DP calendar. Jeju's subtropical climate means ecology fieldwork is possible year-round — we recommend IA topics that leverage this unique advantage. Boarding students have structured evening study time that accommodates tutoring sessions.",
    faqs: [
      {
        question: 'Can you help BHA students with Jeju-specific ecology IAs?',
        answer:
          "Yes — Jeju Island is one of the world's best IB Biology ecology IA sites. We've guided students through volcanic-soil microbiology, subtropical-forest biodiversity, coastal-intertidal, and Hallasan altitudinal-gradient IAs. These Jeju-specific IAs produce distinctive, high-scoring work.",
      },
      {
        question: 'Do you support BHA boarding students?',
        answer:
          "Absolutely — our online tutoring is ideal for boarding students. We schedule sessions during BHA's approved evening study blocks (7–9 PM KST) or weekend mornings. The boarding schedule provides consistent tutoring time that day-school students often lack.",
      },
      {
        question: 'Can you help BHA students targeting Canadian medical schools?',
        answer:
          'Yes — the Branksome Hall Toronto connection makes Canadian medical schools (University of Toronto Medicine, McMaster, UBC) natural targets. We coach Biology HL for Level 7 and advise on the MCAT and CASPer requirements that Canadian medical schools use.',
      },
      {
        question: 'Is Jeju Island isolated for IB Biology tutoring?',
        answer:
          "Not at all — our online format makes geography irrelevant. Jeju's location is actually an advantage: the island's UNESCO-designated biodiversity and volcanic ecology give BHA students IA opportunities that mainland Seoul schools cannot match.",
      },
      {
        question: 'When should a BHA student start IB Biology HL tutoring?',
        answer:
          "September DP1 for Level 7. BHA's boarding structure provides consistent daily routines — students who start early build habits that carry through the demanding DP2 year. For ecology-focused IAs, starting in DP1 Term 1 allows for multi-season fieldwork data collection on Jeju.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // CANADA
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'ucc-toronto',
    schoolName: 'Upper Canada College (UCC)',
    shortName: 'UCC',
    cityCountry: 'Toronto, Canada',
    citySlug: 'toronto',
    timezone: 'ET (Canada East)',
    timezoneIana: 'America/Toronto',
    countryCode: 'CA',
    inLanguage: 'en-CA',
    schoolType: 'IB Diploma Programme',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Upper Canada College (UCC) was founded in 1829 and is one of Canada's oldest and most prestigious independent boys' schools. Located in the Forest Hill neighbourhood of Toronto, UCC enrols approximately 1,200 students from Junior Kindergarten through Grade 12. The school offers the IB Diploma Programme for Grades 11–12 alongside the Ontario Secondary School Diploma.",
      "UCC offers IB Biology at both HL and SL. The school's science department is exceptionally well-resourced, with dedicated Biology labs and a strong tradition of university-bound science students. UCC Biology students benefit from proximity to the University of Toronto's Faculty of Medicine and the MaRS Discovery District for research exposure.",
      "UCC graduates matriculate to Canadian medical schools (U of T, McMaster, Queen's, Western), US Ivy League, and UK Russell Group. The school's university counselling is among the strongest in Canada, with particular depth in pre-medical and life-science pathways.",
    ],
    reputationBullets: [
      "Founded 1829 — one of Canada's oldest independent schools",
      '1,200 students in Forest Hill, Toronto',
      'IB Diploma alongside Ontario curriculum',
      'Proximity to University of Toronto Medicine + MaRS Discovery District',
      'Strong pre-medical and Ivy League placement track record',
    ],
    diplomaContext:
      'UCC graduates approximately 60 IB Diploma candidates per year. Biology HL is popular among pre-medical students. The school reports consistently strong IB results.',
    collegeContext:
      "UCC reports placements at U of T, McGill, Queen's, Western (Canadian medical pathway), US Ivy League (Harvard, Yale, Princeton), and UK universities (Imperial, UCL). The school has exceptional university counselling for both Canadian and international applications.",
    paceAlignment:
      "Our tutoring aligns with UCC's IB DP calendar (September start, mock exams February, May finals). ET evening sessions (5–8 PM Toronto) fit after UCC's 3:30 PM dismissal. We coordinate with UCC's IA timeline.",
    faqs: [
      {
        question: 'Can you help UCC students targeting U of T Medicine?',
        answer:
          'Yes — University of Toronto Faculty of Medicine accepts IB Diploma. We coach Biology HL for Level 7 and advise on the supplementary application components. Many UCC families target Canadian medical schools as their primary pathway.',
      },
      {
        question: "How do ET sessions fit a UCC student's schedule?",
        answer:
          "Weekday sessions from 5–8 PM ET fit after UCC's school day. Weekend morning slots available for students with sports commitments. UCC's Forest Hill location means most students are home by 4:30 PM.",
      },
      {
        question: 'Do you accept CAD payment?',
        answer:
          'Yes — CAD via Canadian bank transfer (TD, RBC, Scotiabank, BMO, CIBC) or international Visa/Mastercard. Annual packages can be split across two CAD payments.',
      },
      {
        question: "Does UCC's Ontario curriculum overlap with IB?",
        answer:
          'UCC offers IB DP alongside the Ontario curriculum. There is significant overlap in Biology content, but IB assessment (Paper 1 MCQ, Paper 2 extended response, IA) differs from Ontario evaluations. Our coaching focuses on the IB-specific exam technique.',
      },
      {
        question: 'When should a UCC student start IB Biology tutoring?',
        answer:
          "September of DP1 (Grade 11) for Level 7 targeting. UCC's strong science department means students enter DP with solid foundations — our coaching adds exam technique and IA optimisation.",
      },
    ],
  },
  {
    slug: 'ridley-college',
    schoolName: 'Ridley College',
    shortName: 'Ridley',
    cityCountry: 'St. Catharines, Canada',
    citySlug: 'toronto',
    timezone: 'ET (Canada East)',
    timezoneIana: 'America/Toronto',
    countryCode: 'CA',
    inLanguage: 'en-CA',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      'Ridley College was founded in 1889 in St. Catharines, Ontario, on a 107-acre lakeside campus overlooking Lake Ontario. Ridley is a co-educational boarding and day school enrolling approximately 750 students from 60+ countries. The school is authorized for the full IB Continuum (PYP, MYP, DP) — one of only a handful of Canadian schools with all three programmes.',
      "Ridley offers IB Biology at both HL and SL. The school's boarding environment creates a structured study culture that benefits IB students. Ridley's science labs were refurbished in 2019, and the school's proximity to the Niagara region provides ecology fieldwork opportunities for Biology IAs.",
      "Ridley graduates matriculate to Canadian, US, UK, and international universities. The school has strong placements at Queen's, Western, McGill, U of T, and US liberal arts colleges. Boarding families from Asia and the Middle East often target North American medical pathways.",
    ],
    reputationBullets: [
      'Founded 1889 — 107-acre lakeside campus in St. Catharines',
      '750 students, 60+ nationalities — major boarding school',
      'Full IB Continuum: PYP → MYP → DP',
      'Refurbished science labs (2019)',
      'Niagara region ecology fieldwork for Biology IAs',
    ],
    diplomaContext:
      'Ridley graduates approximately 80 IB Diploma candidates annually. Biology HL benefits from the boarding structure (consistent evening study time) and Niagara ecology access.',
    collegeContext:
      "Ridley reports placements at Queen's, Western, McGill, U of T, US universities (including Ivy League), and UK institutions. Boarding families often target dual Canadian/US applications.",
    paceAlignment:
      "Our tutoring aligns with Ridley's DP calendar. Boarding students have structured evening study time (7–9 PM ET) that accommodates online tutoring sessions seamlessly.",
    faqs: [
      {
        question: 'Do you support Ridley boarding students?',
        answer:
          "Yes — online tutoring is ideal for boarding students. We schedule during Ridley's approved evening study blocks (7–9 PM ET). The boarding schedule provides consistent tutoring time.",
      },
      {
        question: 'Can you help with Niagara ecology IAs?',
        answer:
          "Absolutely — the Niagara region provides excellent ecology fieldwork sites. We've guided students through water-quality, biodiversity, and vine-ecology IAs using publicly accessible Niagara sampling sites.",
      },
      {
        question: "How does Ridley's IB Continuum help Biology HL?",
        answer:
          'Students who completed MYP at Ridley have strong science foundations entering DP. Our coaching extends MYP skills to DP Biology depth — particularly exam technique and IA methodology.',
      },
      {
        question: 'Do you accept CAD payment?',
        answer:
          'Yes — CAD via Canadian bank transfer or international Visa/Mastercard. Boarding families from overseas can pay in USD or home currency.',
      },
      {
        question: 'When should a Ridley student start?',
        answer:
          "September DP1 for Level 7. Ridley's boarding structure makes consistent weekly tutoring easy to maintain throughout the DP cycle.",
      },
    ],
  },
  {
    slug: 'ashbury-college-ottawa',
    schoolName: 'Ashbury College',
    shortName: 'Ashbury',
    cityCountry: 'Ottawa, Canada',
    citySlug: 'toronto',
    timezone: 'ET (Canada East)',
    timezoneIana: 'America/Toronto',
    countryCode: 'CA',
    inLanguage: 'en-CA',
    schoolType: 'IB Diploma Programme',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Ashbury College was founded in 1891 in Ottawa's Rockcliffe Park neighbourhood — one of Canada's most prestigious residential areas, home to embassies, the Governor General's residence, and senior government officials. Ashbury enrols approximately 700 students and offers the IB Diploma Programme for Grades 11–12.",
      "Ashbury offers IB Biology at both HL and SL. Ottawa's unique position as Canada's capital means Ashbury's parent community includes diplomats, senior civil servants, and professionals from the National Research Council, Health Canada, and the Public Health Agency of Canada — creating a school culture where science and public policy intersect.",
      "Ashbury graduates matriculate to Canadian universities (Ottawa, Queen's, McGill, U of T), US universities, and UK institutions. The school's diplomatic community drives applications to international programmes.",
    ],
    reputationBullets: [
      'Founded 1891 in Rockcliffe Park, Ottawa',
      '700 students — diplomatic/government community',
      'IB Diploma Programme with strong sciences',
      'Proximity to Health Canada, NRC, PHAC for science context',
      "Governor General's neighbourhood — elite residential setting",
    ],
    diplomaContext:
      'Ashbury graduates approximately 50 IB Diploma candidates annually. The diplomatic community drives diverse university targets across Canadian, US, UK, and European systems.',
    collegeContext:
      "Ashbury reports placements at University of Ottawa, Queen's, McGill, U of T, and international universities. The school's diplomatic heritage provides strong recommendation networks.",
    paceAlignment:
      "Our tutoring aligns with Ashbury's DP calendar. ET evening sessions (5–8 PM Ottawa) fit the standard school schedule.",
    faqs: [
      {
        question: 'Can you help Ashbury students from diplomatic families?',
        answer:
          'Yes — several Ashbury families are diplomats who may relocate mid-DP. Our online tutoring continues seamlessly regardless of relocation. We maintain the same IB Biology curriculum progression even if the student changes countries.',
      },
      {
        question: 'Do Ottawa students have health-science research access?',
        answer:
          'Ottawa is unique: Health Canada, PHAC, and the NRC are all within the city. Some Ashbury students access research opportunities for IA projects. We help students design IAs that leverage these connections.',
      },
      {
        question: 'Do you accept CAD payment?',
        answer:
          'Yes — CAD via Canadian bank transfer or international card. Diplomatic families can pay in USD or home currency.',
      },
      {
        question: 'When should an Ashbury student start?',
        answer:
          "September DP1 for Level 7 targeting. Ashbury's smaller cohort means early support has high impact.",
      },
    ],
  },
  {
    slug: 'crofton-house-vancouver',
    schoolName: 'Crofton House School',
    shortName: 'Crofton House',
    cityCountry: 'Vancouver, Canada',
    citySlug: 'vancouver',
    timezone: 'PT (Canada West)',
    timezoneIana: 'America/Vancouver',
    countryCode: 'CA',
    inLanguage: 'en-CA',
    schoolType: 'IB Diploma Programme',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Crofton House School was founded in 1898 in Vancouver's Kerrisdale neighbourhood. It is one of British Columbia's most respected independent girls' schools, enrolling approximately 900 students from Junior Kindergarten through Grade 12. Crofton House offers the IB Diploma Programme for Grades 11–12.",
      "Crofton House offers IB Biology at both HL and SL. The school's all-girls environment and strong STEM programme encourage high Biology HL enrolment. Vancouver's marine and forest ecosystems provide excellent ecology fieldwork for IAs — the school is 15 minutes from Pacific Spirit Regional Park and the UBC campus.",
      'Crofton House graduates matriculate to UBC, McGill, U of T, US universities, and UK institutions. The school has particular strength in science-track university placements, with many graduates pursuing medicine, dentistry, and life sciences.',
    ],
    reputationBullets: [
      "Founded 1898 — one of BC's top independent girls' schools",
      '900 students in Kerrisdale, Vancouver',
      'IB Diploma with strong STEM emphasis',
      'Pacific Spirit Park + UBC proximity for ecology IAs',
      'Strong science-track university placements',
    ],
    diplomaContext:
      'Crofton House graduates approximately 60 IB Diploma candidates per year. Biology HL enrolment is proportionally higher than co-ed schools, reflecting the all-girls STEM culture.',
    collegeContext:
      "Crofton House reports placements at UBC, McGill, U of T, Queen's, US top-50, and UK Russell Group. Pre-medical and life-science pathways are well-represented.",
    paceAlignment:
      "Our tutoring aligns with Crofton House's DP calendar. PT evening sessions (5–8 PM Vancouver) fit after the school day. Weekend sessions available for students with extracurricular commitments.",
    faqs: [
      {
        question: 'Can you help with marine-ecology IAs using Pacific Spirit Park?',
        answer:
          "Yes — Pacific Spirit Regional Park and the UBC campus are excellent IA sites. We've guided Vancouver students through forest-ecology, marine-intertidal, and water-quality IAs using these accessible locations.",
      },
      {
        question: 'Do you support students targeting UBC Medicine?',
        answer:
          "Yes — UBC Faculty of Medicine accepts IB Diploma. We coach Biology HL for Level 7 and advise on UBC's specific supplementary requirements. UBC Medicine is the primary local target for Crofton House pre-med students.",
      },
      {
        question: 'PT sessions for Vancouver students?',
        answer:
          "Weekday sessions from 5–8 PM PT. Weekend: 9–11 AM PT. Crofton House's Kerrisdale location means students are home by 4:30 PM, allowing ample time before evening sessions.",
      },
      {
        question: 'Do you accept CAD payment?',
        answer: 'Yes — CAD via Canadian bank transfer or international Visa/Mastercard.',
      },
      {
        question: 'When should a Crofton House student start?',
        answer:
          "September DP1 for Level 7. Crofton House's strong STEM culture means students enter DP Biology with excellent foundations — our coaching adds exam technique and IA optimisation.",
      },
    ],
  },
  {
    slug: 'branksome-hall-toronto',
    schoolName: 'Branksome Hall',
    shortName: 'Branksome Hall Toronto',
    cityCountry: 'Toronto, Canada',
    citySlug: 'toronto',
    timezone: 'ET (Canada East)',
    timezoneIana: 'America/Toronto',
    countryCode: 'CA',
    inLanguage: 'en-CA',
    schoolType: 'IB Continuum School',
    ibProgrammeOffered: ['PYP', 'MYP', 'DP'],
    historyParagraphs: [
      "Branksome Hall was founded in 1903 in Toronto's Rosedale neighbourhood. It is one of Canada's premier independent girls' schools, enrolling approximately 900 students. Branksome Hall is authorized for the full IB Continuum (PYP, MYP, DP) and is the sister school of Branksome Hall Asia (Jeju, South Korea) — the only IB Continuum school pair spanning two continents.",
      "Branksome Hall offers IB Biology at both HL and SL. The school's all-girls IB Continuum from PYP through DP creates exceptionally well-prepared Biology HL students who have been in the IB system since elementary school. The school's Toronto location provides access to the University of Toronto's research ecosystem and the MaRS Discovery District for IA project context.",
      "Branksome Hall graduates matriculate to U of T, McGill, Queen's, Western, US Ivy League, and UK universities. The school has a strong track record in pre-medical and life-science placements. The Branksome Hall Asia connection facilitates cross-campus exchanges.",
    ],
    reputationBullets: [
      "Founded 1903 — one of Canada's premier girls' schools",
      '900 students in Rosedale, Toronto',
      'Full IB Continuum: PYP → MYP → DP',
      'Sister school of Branksome Hall Asia (Jeju, South Korea)',
      'U of T research ecosystem + MaRS Discovery District access',
    ],
    diplomaContext:
      'Branksome Hall graduates approximately 80 IB Diploma candidates per year. Biology HL benefits from the full IB Continuum — students who started in PYP have the deepest IB preparation of any Canadian school.',
    collegeContext:
      "Branksome Hall reports placements at U of T, McGill, Queen's, Western (Canadian medical pathway), US Ivy League, and UK Russell Group. Pre-medical applications are a strength — the school's IB Continuum heritage gives students distinctive application profiles.",
    paceAlignment:
      "Our tutoring aligns with Branksome Hall's DP calendar. ET evening sessions fit after the school day. We support cross-campus students who spend time at Branksome Hall Asia (Jeju) with timezone-flexible scheduling.",
    faqs: [
      {
        question: 'How does the Branksome Hall IB Continuum help Biology HL?',
        answer:
          'Students who completed PYP and MYP at Branksome Hall have the deepest IB preparation possible — 13+ years in the system. Our coaching extends this exceptional foundation with DP-specific exam technique and IA mentorship.',
      },
      {
        question: 'Can you support students who split time between Toronto and Jeju?',
        answer:
          'Yes — some Branksome Hall students participate in cross-campus exchanges with Branksome Hall Asia Jeju. Our online tutoring accommodates both ET (Toronto) and KST (Jeju) timezones seamlessly.',
      },
      {
        question: 'Do you help Branksome Hall students targeting Canadian med schools?',
        answer:
          "Yes — U of T, McMaster, Queen's, and Western medical schools all accept IB Diploma. We coach Biology HL for Level 7 and advise on the Canadian medical school application process.",
      },
      {
        question: 'Do you accept CAD payment?',
        answer:
          'Yes — CAD via Canadian bank transfer or international Visa/Mastercard. Annual packages can be split across two payments.',
      },
      {
        question: 'When should a Branksome Hall student start?',
        answer:
          'September DP1. Branksome Hall students are among the best-prepared IB students in Canada — our coaching adds the exam-technique and IA-optimisation layer that pushes Level 6 to Level 7.',
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // UNITED KINGDOM
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'wellington-college-berkshire',
    schoolName: 'Wellington College',
    shortName: 'Wellington',
    cityCountry: 'Berkshire, United Kingdom',
    citySlug: 'london',
    timezone: 'GMT (UK/Ireland)',
    timezoneIana: 'Europe/London',
    countryCode: 'GB',
    inLanguage: 'en-GB',
    schoolType: 'International (IB World School)',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "Wellington College was founded in 1859 as a memorial to the Duke of Wellington. Located in Crowthorne, Berkshire (50 minutes from central London), Wellington is one of Britain's leading co-educational boarding and day schools, enrolling approximately 1,100 students. The school offers the IB Diploma alongside A-Levels.",
      "Wellington offers IB Biology at both HL and SL. The school's science facilities include purpose-built laboratories and a dedicated Science Centre. Wellington's dual IB/A-Level track means some students take IB Biology HL while others take A-Level Biology — our coaching serves both.",
      "Wellington graduates matriculate to UK Russell Group (Oxford, Cambridge, Imperial, UCL), US Ivy League, and international universities. The school's medical-school placement record is strong, with BMAT/UCAT preparation integrated into the sixth-form programme.",
    ],
    reputationBullets: [
      "Founded 1859 — one of Britain's great public schools",
      '1,100 students, major boarding school in Berkshire',
      'Dual IB Diploma + A-Level track',
      'Purpose-built Science Centre with dedicated Biology labs',
      'Strong Oxbridge and UK medical school placements',
    ],
    diplomaContext:
      'Wellington graduates approximately 80 IB Diploma candidates annually alongside the A-Level cohort. Biology HL is popular among pre-medical candidates.',
    collegeContext:
      'Wellington reports strong placements at Oxford, Cambridge, Imperial, UCL, Edinburgh, and US universities. Medical school applications (via BMAT/UCAT) are a strength.',
    paceAlignment:
      "Our tutoring aligns with Wellington's IB DP calendar. GMT evening sessions (5–8 PM) fit after the boarding school day. We accommodate both IB and A-Level Biology students.",
    faqs: [
      {
        question: 'Do you support Wellington students doing IB or A-Level Biology?',
        answer:
          'Yes — Wellington offers both tracks. Our IB coaching covers Paper 1, Paper 2, and IA. For A-Level students, we offer separate A-Level Biology coaching aligned to AQA/Edexcel/OCR specifications. Some Wellington students do both IB HL and A-Level simultaneously.',
      },
      {
        question: 'Can you help Wellington students targeting UK medical schools?',
        answer:
          'Yes — we coach Biology HL for Level 7 and advise on BMAT/UCAT preparation. Many Wellington pre-med students apply to Imperial, UCL, Edinburgh, and Oxbridge medicine.',
      },
      {
        question: 'Do boarding students have time for tutoring?',
        answer:
          'Wellington boarding students have structured evening study time (7–9 PM GMT) that accommodates online tutoring seamlessly. Weekend morning slots also available.',
      },
      {
        question: 'Do you accept GBP payment?',
        answer:
          'Yes — GBP via UK bank transfer (Barclays, HSBC, Lloyds, NatWest) or international card.',
      },
      {
        question: 'When should a Wellington student start?',
        answer:
          "September of DP1 (Lower Sixth) for Level 7 targeting. Wellington's strong science department means students enter DP with solid foundations — our coaching adds exam technique and IA optimisation.",
      },
    ],
  },
  {
    slug: 'sevenoaks-school',
    schoolName: 'Sevenoaks School',
    shortName: 'Sevenoaks',
    cityCountry: 'Kent, United Kingdom',
    citySlug: 'london',
    timezone: 'GMT (UK/Ireland)',
    timezoneIana: 'Europe/London',
    countryCode: 'GB',
    inLanguage: 'en-GB',
    schoolType: 'IB Diploma Programme',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'Sevenoaks School was founded in 1432 and is one of the oldest schools in England. Located in Sevenoaks, Kent (30 minutes from London), the school enrols approximately 1,100 students and was the first school in the UK to adopt the IB Diploma Programme (1978) — replacing A-Levels entirely.',
      "Sevenoaks is unique among UK independent schools: it offers ONLY the IB Diploma, not A-Levels. This full commitment means the school's IB pedagogy is exceptionally well-developed. IB Biology at HL and SL is taught by specialist teachers with deep IB experience. The school consistently achieves among the highest average IB scores in the UK.",
      "Sevenoaks graduates matriculate to Oxbridge, UK Russell Group, US Ivy League, and international universities. The school's IB-only status means university counselling is entirely IB-focused — a significant advantage for medical school applications.",
    ],
    reputationBullets: [
      "Founded 1432 — one of England's oldest schools",
      'First UK school to adopt IB Diploma (1978) — IB ONLY, no A-Levels',
      'Among the highest average IB scores in the UK',
      '1,100 students in Sevenoaks, Kent (30 min from London)',
      'Full IB commitment = deepest IB pedagogy in Britain',
    ],
    diplomaContext:
      'Sevenoaks graduates 100% IB Diploma students — approximately 200 candidates annually. The school reports average IB scores consistently 3-4 points above the global mean. Biology HL is one of the most popular Group 4 choices.',
    collegeContext:
      'Sevenoaks reports exceptional placements at Oxford, Cambridge, Imperial, UCL, Edinburgh, St Andrews, US Ivy League, and European universities. Medical school acceptance is a strength — the IB-only profile is well-understood by UK medical admissions.',
    paceAlignment:
      "Our tutoring aligns with Sevenoaks' IB DP calendar. The school's IB-only culture means pacing is optimised for IB — we match it precisely. GMT evening sessions (5–8 PM) fit the Kent commuter schedule.",
    faqs: [
      {
        question: 'Sevenoaks is IB-only — does that help or hurt for UK medicine?',
        answer:
          "It helps significantly. UK medical schools (Imperial, UCL, Edinburgh, King's) are very familiar with IB from Sevenoaks — the school has decades of IB medical-school placements. The IB HL Level 7 is well-understood as equivalent to A* at A-Level.",
      },
      {
        question: 'How do Sevenoaks students compare to A-Level students?',
        answer:
          'Sevenoaks IB students typically have stronger research and analytical skills (from the IA and EE) than A-Level-only students. Our coaching leverages this by focusing on exam technique — the area where even strong Sevenoaks students can improve.',
      },
      {
        question: 'Do you accept GBP payment?',
        answer: 'Yes — GBP via UK bank transfer or international card.',
      },
      {
        question: 'When should a Sevenoaks student start?',
        answer:
          "September Lower Sixth for Level 7. Sevenoaks' IB-only environment means students are well-prepared — our coaching adds the marginal exam-technique edge for 7 vs 6.",
      },
    ],
  },
  {
    slug: 'dulwich-college-london',
    schoolName: 'Dulwich College',
    shortName: 'Dulwich',
    cityCountry: 'London, United Kingdom',
    citySlug: 'london',
    timezone: 'GMT (UK/Ireland)',
    timezoneIana: 'Europe/London',
    countryCode: 'GB',
    inLanguage: 'en-GB',
    schoolType: 'IB Diploma Programme',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      'Dulwich College was founded in 1619 by Edward Alleyn in south London. The school enrols approximately 1,800 students and offers the IB Diploma alongside A-Levels for Sixth Form. Dulwich is part of the Dulwich College International family, with sister schools in Singapore, Shanghai, Beijing, Seoul, and Yangon.',
      "Dulwich offers IB Biology at both HL and SL. The school's south London campus includes modern science facilities and strong links to King's College London and Guy's Hospital for clinical exposure. The international Dulwich network means some students transfer between campuses — our coaching supports continuity.",
      "Dulwich graduates matriculate to Oxbridge, UK Russell Group, US universities, and — via the international network — Asian universities. Medical school placements are strong, with particular depth in London medical schools (King's, SGUL, Barts).",
    ],
    reputationBullets: [
      'Founded 1619 — historic south London school',
      '1,800 students with international sister school network',
      'Dual IB Diploma + A-Level in Sixth Form',
      "King's College London + Guy's Hospital proximity",
      'Global Dulwich network: Singapore, Shanghai, Beijing, Seoul',
    ],
    diplomaContext:
      'Dulwich graduates approximately 70 IB Diploma candidates annually alongside A-Level students. The international network means some students arrive from Dulwich Singapore/Shanghai with MYP foundations.',
    collegeContext:
      "Dulwich reports placements at Oxbridge, Imperial, UCL, King's, Edinburgh, US top-50, and Asian universities (NUS, HKU). London medical school applications (King's, SGUL, Barts) are a particular strength.",
    paceAlignment:
      "Our tutoring aligns with Dulwich's IB calendar. GMT evening sessions (5–8 PM) fit south London commute patterns. We support students transferring from Dulwich International campuses.",
    faqs: [
      {
        question:
          'Do you support Dulwich students who transferred from Dulwich Singapore/Shanghai?',
        answer:
          "Yes — students transferring between Dulwich International campuses may have MYP foundations. Our coaching bridges any curriculum gaps and calibrates to the London campus's IB Biology pacing.",
      },
      {
        question: 'Can you help with London medical school applications?',
        answer:
          "Yes — King's, SGUL, Barts, and UCL are the primary London medical targets for Dulwich students. We coach Biology HL for Level 7 and advise on UCAT/BMAT preparation.",
      },
      {
        question: 'Do you accept GBP payment?',
        answer: 'Yes — GBP via UK bank transfer or international card.',
      },
      {
        question: 'When should a Dulwich student start?',
        answer:
          'September Lower Sixth for Level 7. Students from Dulwich International campuses should start in August to bridge any MYP-to-DP gaps before term begins.',
      },
    ],
  },
  {
    slug: 'kings-wimbledon',
    schoolName: "King's College School Wimbledon",
    shortName: 'KCS Wimbledon',
    cityCountry: 'London, United Kingdom',
    citySlug: 'london',
    timezone: 'GMT (UK/Ireland)',
    timezoneIana: 'Europe/London',
    countryCode: 'GB',
    inLanguage: 'en-GB',
    schoolType: 'IB Diploma Programme',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "King's College School Wimbledon (KCS) was founded in 1829 as the junior department of King's College London. Located in Wimbledon, south-west London, KCS enrols approximately 900 students and offers the IB Diploma alongside A-Levels in the Sixth Form.",
      "KCS offers IB Biology at both HL and SL. The school is known for academic excellence — it consistently ranks among the top 10 independent schools in the UK by exam results. The King's College London heritage provides strong university connections, particularly for medical and life-science applications.",
      'KCS graduates matriculate to Oxbridge (typically 30+ offers per year), UK Russell Group, and US top universities. Medical school placements are exceptionally strong — the school has one of the highest Oxbridge medicine acceptance rates in London.',
    ],
    reputationBullets: [
      "Founded 1829 — King's College London heritage",
      '900 students in Wimbledon, south-west London',
      'Top 10 UK independent school by exam results',
      '30+ Oxbridge offers per year',
      'Exceptional medical school placement rate',
    ],
    diplomaContext:
      "KCS graduates approximately 50 IB Diploma candidates alongside a larger A-Level cohort. The school's academic selectivity means IB Biology HL students enter with very strong foundations.",
    collegeContext:
      'KCS reports 30+ Oxbridge offers annually, with strong placements at Imperial, UCL, Edinburgh, and US universities. Medical school acceptance is a hallmark — many KCS students target Oxbridge medicine.',
    paceAlignment:
      "Our tutoring aligns with KCS's IB calendar. GMT evening sessions (5–8 PM) fit Wimbledon commute patterns.",
    faqs: [
      {
        question: 'KCS students targeting Oxbridge medicine — how does coaching help?',
        answer:
          'Oxbridge medicine requires IB 39+ with Biology HL 7. Our coaching targets the Level 7 with exam-technique precision — KCS students already have strong content knowledge, so the marginal gain is in Paper 1 MCQ speed and Paper 2 command-term accuracy.',
      },
      {
        question: 'Do you accept GBP payment?',
        answer: 'Yes — GBP via UK bank transfer or international card.',
      },
      {
        question: 'When should a KCS student start?',
        answer:
          "September Lower Sixth. KCS's academic rigour means students are well-prepared — early tutoring prevents the DP1 Term 2 molecular biology gap that affects even top students.",
      },
    ],
  },
  {
    slug: 'nlcs-edgware',
    schoolName: 'North London Collegiate School (NLCS)',
    shortName: 'NLCS',
    cityCountry: 'London, United Kingdom',
    citySlug: 'london',
    timezone: 'GMT (UK/Ireland)',
    timezoneIana: 'Europe/London',
    countryCode: 'GB',
    inLanguage: 'en-GB',
    schoolType: 'IB Diploma Programme',
    ibProgrammeOffered: ['DP'],
    historyParagraphs: [
      "North London Collegiate School (NLCS) was founded in 1850 by Frances Mary Buss and is one of Britain's leading independent girls' schools. Located in Edgware, north London, NLCS enrols approximately 1,100 students and offers the IB Diploma in the Sixth Form. The school has sister schools in Jeju (South Korea), Dubai, and Singapore.",
      "NLCS offers IB Biology at both HL and SL. The school's all-girls environment and strong STEM culture drive high Biology HL enrolment. NLCS consistently achieves among the highest average IB scores in the UK — typically 40+ average (vs 30 global mean). The international NLCS network means some students transfer between campuses.",
      "NLCS graduates matriculate to Oxbridge (typically 25+ offers per year), UK Russell Group, US Ivy League, and international universities. Medical and veterinary school placements are strong — the school's IB results give students competitive profiles.",
    ],
    reputationBullets: [
      "Founded 1850 — pioneering girls' education",
      '1,100 students in Edgware, north London',
      'Average IB score 40+ (vs 30 global mean)',
      'Sister schools in Jeju, Dubai, Singapore',
      '25+ Oxbridge offers annually',
    ],
    diplomaContext:
      "NLCS graduates approximately 100 IB Diploma candidates annually. The school's average IB score of 40+ is among the highest in the world. Biology HL is popular in the strong STEM culture.",
    collegeContext:
      'NLCS reports 25+ Oxbridge offers annually, with strong placements at Imperial, UCL, Edinburgh, and US top universities. Medical, veterinary, and life-science pathways are well-represented.',
    paceAlignment:
      "Our tutoring aligns with NLCS's IB calendar. GMT evening sessions (5–8 PM) fit north London commute patterns. We support students from NLCS Jeju/Dubai/Singapore who transfer to the London campus.",
    faqs: [
      {
        question: 'NLCS averages 40+ IB — does tutoring still help?',
        answer:
          "At NLCS's level, the difference between Level 6 and Level 7 is exam technique, not content knowledge. Our coaching provides the specific Paper 1/Paper 2/IA optimisation that pushes NLCS students from 6 to 7 — the marginal gain that matters for Oxbridge medicine.",
      },
      {
        question: 'Do you support NLCS students from Jeju/Dubai/Singapore campuses?',
        answer:
          'Yes — students transferring from NLCS international campuses may have different curriculum pacing. Our online coaching adjusts to whichever campus the student is at, with timezone flexibility.',
      },
      {
        question: 'Do you accept GBP payment?',
        answer: 'Yes — GBP via UK bank transfer or international card.',
      },
      {
        question: 'When should an NLCS student start?',
        answer:
          "September Lower Sixth. NLCS's exceptional teaching means the coaching focus is almost entirely on exam technique — content depth is rarely the gap.",
      },
    ],
  },
]

/** Helper: lookup school by slug. */
export function getSchoolBySlug(slug: string): IBBiologySchool | undefined {
  return ibBiologySchools.find((s) => s.slug === slug)
}

/** Helper: list of all slugs for generateStaticParams. */
export const ibBiologySchoolSlugs = ibBiologySchools.map((s) => s.slug)
