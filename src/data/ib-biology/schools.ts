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
  timezone: 'SGT (Singapore)' | 'GST (Gulf)' | 'ICT (Indochina)' | 'IST (India)'
  /** IANA timezone string for schema.org */
  timezoneIana: string
  /** ISO-3166 alpha-2 country code */
  countryCode: 'SG' | 'AE' | 'TH' | 'IN'
  /** BCP-47 language tag for schema.org `inLanguage` */
  inLanguage: 'en-SG' | 'en-AE' | 'en-TH' | 'en-IN'
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
      'UWCSEA Biology students benefit from a department staffed by IB-trained teachers, several with examiner experience, and laboratory facilities that comfortably support every prescribed Section 6 (Practical Programme) investigation in the 2025 IB Biology guide. Both HL and SL options run in parallel each year, and the school publishes IB diploma averages well above the global mean — recent UWCSEA cohort averages have been around 36 points out of 45, with a meaningful share of students scoring above 40.',
      "For UWCSEA students, the gap that drives external tutoring is rarely concept exposure. The school covers the syllabus thoroughly. The gap is rubric calibration — translating UWCSEA's deep classroom work into the specific Paper 2 long-response mark scheme structure the IB rewards — plus IA scaffolding through the May–November DP1 internal-assessment cycle and final EE submission in early DP2. Our 1:1 sessions plug into precisely those two windows.",
      "UWCSEA's CAS programme is intense by design — the UWC ethos places service, activity, and outdoor leadership at the heart of student life — so weekday tutoring has to be compact and focused rather than long and repetitive. We have spent years calibrating session structure to UWCSEA's weekly load: 60–90 minute 1:1 blocks, no homework that duplicates school work, and asynchronous WhatsApp turnaround on past-paper questions inside 24 hours so students get feedback without losing momentum. This compact-and-precise approach is what most UWCSEA parents tell us made the difference between adding tutoring and removing it.",
    ],
    reputationBullets: [
      'Two campuses (Dover and East) running parallel IBDP cohorts in Singapore',
      'Founding member of the global UWC movement (alongside Atlantic, Pearson, USA, etc.)',
      'Annual IBDP cohort exceeds 1,000 candidates combined (publicly reported)',
      'Recent school-reported diploma averages around 36 points (vs global mean ~30)',
      'Strong matriculation to UK, US, Canadian, Australian, and Singapore universities',
      'Dedicated IB Biology HL and SL streams; full Section 6 practical coverage',
    ],
    diplomaContext:
      "UWCSEA publicly reports IBDP cohort averages around 36 points across both campuses, with a meaningful share of candidates scoring 40+ (publicly reported in the school's annual diploma communications). HL Biology is one of the most popular Group 4 choices.",
    collegeContext:
      "UWCSEA graduates matriculate across UK (Oxbridge, Imperial, UCL, King's, Edinburgh), US (Harvard, Yale, Princeton, MIT, Stanford, the Ivy+ band), Canada (Toronto, McGill, UBC), Australia (Melbourne, Sydney, ANU, Monash), and Singapore (NUS, NTU, SMU, Yale-NUS while it existed). For Biology HL students, common pathways include UK medicine (with the additional UCAT/BMAT requirements), Singapore NUS Medicine, and US pre-med through Ivy+ and Stanford. The school's university guidance reports are published annually.",
    paceAlignment:
      'UWCSEA IB Biology follows the standard two-year DP track with IA topic selection in late DP1 and submission early DP2; EE submission in DP2 for those choosing Biology as their EE subject. Our coaching aligns to this: HL conceptual reinforcement and Paper 2 mark-scheme drilling during DP1, IA mentorship through the data-analysis and evaluation phase, then full-length Paper 1/2/3 mocks across November DP2 mocks and the May final-exam window. Live sessions are scheduled in SGT evenings (7–9 PM) to fit the long UWCSEA school day and CAS commitments; weekend morning blocks accommodate sport-heavy schedules. For students with significant outdoor leadership commitments (Project Week, the UWCSEA outdoor education programme), we adjust the weekly cadence around extended-trip dates rather than missing sessions outright.',
    faqs: [
      {
        question: 'Do UWCSEA students typically need outside IB Biology tutoring?',
        answer:
          "UWCSEA's Biology department is strong, so most students do not need content tutoring. The two specific gaps that drive families to engage us are (1) Paper 2 mark-scheme calibration — converting UWCSEA's deep classroom work into the IB's specific long-response rubric — and (2) IA scaffolding through the topic-to-submission cycle, especially for students aiming for a 6 or 7 with a strong Section 6 connection.",
      },
      {
        question: 'What is the difference between UWCSEA Dover and East for IB Biology coaching?',
        answer:
          "The two campuses follow the same IB Biology syllabus on broadly aligned schedules but have different teacher cohorts and IA submission rhythms. Our 1:1 sessions adapt to your campus's internal calendar — IA deadlines, mock exam windows, and the school's own Section 6 practical schedule — so the coaching does not collide with school-set due dates.",
      },
      {
        question: 'Do you coach Biology HL and SL for UWCSEA students?',
        answer:
          'Yes. HL coaching covers the additional HL-only material (cellular respiration depth, neurobiology, animal physiology, plant biology HL extensions) plus the extra Paper 1 and Paper 2 long-response items. SL coaching focuses on Paper 1 multiple-choice precision and Paper 2 structured-response timing. Both streams use Paper 3 lab-data practice from past papers.',
      },
      {
        question: 'When should a UWCSEA student start IB Biology tutoring?',
        answer:
          'For the integrated 2-year programme, August or September of DP1 is the ideal start — that maximises the IA mentorship window. For students who only need exam-focused coaching, October DP2 (after the November mocks) is still effective for the May final exams, with focus on Paper 2 mark-scheme calibration and Paper 3 lab-data drills.',
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
      "ASD's science department runs IB Biology HL and SL alongside AP Biology, with parallel laboratory facilities that support every prescribed Section 6 investigation. The school has publicly reported strong IB results in its annual school profile, and IB Biology is one of the most-chosen Group 4 subjects for students targeting medicine or biosciences. ASD's university counselling is US-style — Naviance-driven, college-fair-rich — which shapes how the IB Biology cohort thinks about their HL choices.",
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
          'Yes — ASD is one of the few schools globally that runs both the IB Diploma Programme and AP coursework in parallel. Students typically choose one pathway by Grade 10. For IB Biology specifically, the school offers both HL and SL streams with full Section 6 practical coverage. Our coaching is IB-specific — if your student is on the AP track, see our AP Biology pages instead.',
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
          "For the integrated 2-year Complete Programme, August or September of DP1 is the ideal start — that maximises the IA mentorship window through the school's February DP2 internal moderation. For students who only need exam-focused coaching, October DP2 (after the school's first DP2 mock) is still effective for May finals, focusing on Paper 2 mark-scheme calibration and Paper 3 lab-data drills using past papers from 2016 onwards.",
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
      "DAA's IB Biology cohort sits within a large school of around 2,500 students across all sections. The Diploma Programme cohort is typically several hundred students per year, with Biology HL and SL both offered. The science faculty is staffed by experienced IB teachers and the laboratory facilities cover the full Section 6 practical programme. DAA's Biology cohort also sees students who came up through the school's MYP — meaning a meaningful share have already completed three or four years of inquiry-based science before reaching DP.",
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
          'Yes — DAA runs MYP through DP, meaning students who came up through the school typically have several years of inquiry-based science before reaching DP1. This is an advantage: the conceptual framework of "scientific investigation" maps directly onto IB Biology Section 6 (Practical Programme) work. Our coaching builds on that foundation rather than introducing it.',
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
          "Our coaching is DP-focused (Grade 11 and Grade 12). For MYP students, we recommend strong engagement with the school's MYP Sciences and Personal Project — these directly build the scientific-method foundation that pays off in DP1 Section 6 work. We start formal IB Biology coaching at the start of DP1 (August/September of Grade 11).",
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
      "Tanglin's IB Biology runs both HL and SL. The Sixth Form is sited at the Portsdown Road campus, and the school has publicly reported strong IB results — recent diploma averages above the global mean, with a meaningful share of candidates scoring 40+ (publicly reported in the school's annual results communications). The Biology department is staffed by IB-experienced teachers and offers full Section 6 (Practical Programme) coverage. Tanglin's cohort sits inside the highly competitive Singapore IB market alongside UWCSEA, SAS, Dulwich, and Stamford.",
      'For Tanglin students, the most common driver of external tutoring is the dual-track A-Level / IB context: students who chose IB over A Levels often want a tutor who can fully commit to the IB rubric without any A-Level-style "depth-over-breadth" framing creeping in. Our 1:1 sessions are 100% IB-rubric-aligned — Paper 2 mark-scheme calibration, IA mentorship, Paper 3 lab-data drills — and our examiners have experience with both Tanglin\'s internal moderation rhythm and the November DP2 mock cycle.',
      "Tanglin's Sixth Form is academically settled — students have made an active choice between A Levels and IB, which means by the time they reach DP1 they are typically self-motivated and clear about their university targets. Our coaching adapts to that profile: we do not over-explain or duplicate school work; instead, we focus on the highest-leverage rubric and IA components. For Tanglin students aiming for UK medicine, a 7 in Biology HL combined with a strong UCAT score is the standard target, and our 1:1 Elite Tutoring tier is calibrated to that exact endpoint with examiner-led Paper 2 and Paper 3 drilling through the final spring before May exams.",
    ],
    reputationBullets: [
      'Founded 1925 — one of the oldest British international schools in Asia',
      'Dual-pathway Sixth Form: A Levels and IB Diploma both offered',
      'Located at Portsdown Road, Singapore',
      'Recent school-reported IB diploma averages above the global mean',
      'IB Biology HL and SL with full Section 6 practical coverage',
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
          "Yes. UK medicine is the most common matriculation pathway for Tanglin's IB Biology HL students. We coach the Biology HL component (Paper 2 long-response, Paper 3 lab-data, IA at 6/7 level) and coordinate with the school's timing on UCAT/BMAT — but we do not coach UCAT/BMAT directly. For that, your school's university counselling office or a specialist medical-admissions service is the right place.",
      },
      {
        question: 'When should a Tanglin student start IB Biology tutoring?',
        answer:
          'For the integrated 2-year Complete Programme, start in August or September of DP1 — that maximises the IA mentorship window. For students who only need exam-focused coaching, October DP2 (after November mocks) is still effective for May finals, focusing on Paper 2 mark-scheme calibration and Paper 3 lab-data drills.',
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
      "NIST's IB Diploma cohort is one of the larger DP cohorts in Bangkok, with IB Biology HL and SL both offered each year. The school has publicly reported diploma averages well above the global mean — recent NIST cohort averages have been in the 35–37 point range, with a substantive share of students scoring 40+ (publicly reported in the school's annual results communications). The Biology department is staffed by IB-experienced teachers and the laboratory facilities support every prescribed Section 6 investigation.",
      "For NIST students, the most common driver of external tutoring is the same as at the other top regional IB schools: Paper 2 mark-scheme calibration and IA mentorship through the DP1 topic-selection to DP2 final-submission window. Bangkok's ICT timezone overlaps cleanly with our SGT-Asia tutoring schedule, and our 1:1 sessions sit in ICT evenings (7–9 PM) or weekend morning blocks.",
      "NIST students often have a dual application strategy: UK and US universities for most graduates, with a meaningful share also targeting the Mahidol International College direct-entry medical track for students who want to stay in Thailand. This dual strategy shapes how we calibrate Biology HL coaching — a strong 6 or 7 in Biology HL is competitive for both UK medicine (with UCAT/BMAT) and the Mahidol pathway, so the coaching itself is the same; the surrounding application support diverges by destination. We coordinate with NIST's university counselling office on the academic-signal side (Biology HL score, IA quality, EE topic where chosen) and leave the destination-specific application work to specialists.",
    ],
    reputationBullets: [
      'First full IB Continuum school in Thailand (PYP + MYP + DP)',
      'Not-for-profit, founded 1992 with UN community involvement',
      'Located in Sukhumvit, Bangkok',
      'Recent school-reported diploma averages in the 35–37 point range',
      'IB Biology HL and SL with full Section 6 practical coverage',
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
          'Yes — NIST was the first school in Thailand to offer PYP + MYP + DP. Students who came up through NIST typically have a strong inquiry-based science foundation by the time they reach DP1, which makes the Section 6 Practical Programme work more intuitive. Our coaching builds on that foundation rather than introducing the inquiry framework.',
      },
      {
        question: 'How does the ICT timezone affect live tutoring?',
        answer:
          'Bangkok ICT (GMT+7) is one hour behind Singapore SGT and aligns cleanly with our Singapore-based live tutoring schedule. ICT evening slots (7–9 PM) and weekend morning blocks are the most-used sessions. All sessions are recorded for review.',
      },
      {
        question: 'Do you coach NIST students for the Mahidol International medical pathway?',
        answer:
          "Yes for the Biology HL component. Mahidol International College's direct-entry medical track has specific Biology requirements that map well to IB Biology HL with a 6 or 7. We coach the Biology HL syllabus (Paper 2 long-response, Paper 3 lab-data, IA at 6/7 level); the Thai-medical-admissions specifics — interview prep, the Mahidol-specific entrance test — are best handled through your school's counselling office or a specialist Thai medical admissions service.",
      },
      {
        question: 'When should a NIST student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1. For students who only need exam-focused coaching, October DP2 (after November mocks) is still effective for May finals. NIST's strong content delivery means students who join us mid-DP2 already have the core syllabus exposure; we focus on Paper 2 mark-scheme calibration and Paper 3 lab-data drills.",
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
      "Pathways Aravali's IB Biology cohort is one of the larger DP Biology cohorts in the Delhi NCR region. Both HL and SL are offered, and the school has publicly reported strong IB results — recent cohort averages have been at or above the global mean, with a meaningful share of candidates scoring 40+ (publicly reported in the school's annual results communications). The Biology department is staffed by IB-experienced teachers and the laboratory facilities support the full Section 6 (Practical Programme) syllabus.",
      "For Pathways Aravali students, the most common driver of external tutoring is twofold: (1) Paper 2 mark-scheme calibration, where strong classroom answers can still drop points against the IB's specific long-response rubric, and (2) IA mentorship through the DP1 topic-selection cycle. Many Pathways families also want a parallel IB+NEET option — Cerebrum is the only IB Biology tutor in India that runs the integrated IB+NEET track, and a substantive share of Pathways Aravali students pursue that combined pathway.",
      "Pathways Aravali's residential structure shapes tutoring scheduling specifically — day students from DLF, Golf Course Road, and Sohna Road commute up to 60 minutes each way, while boarders study on campus through the evening. Our IST live sessions sit at 7–9 PM, which works for both — day students join from home after the school commute, boarders join from the school's study halls during scheduled evening study time. For IB+NEET students, we also run weekend intensive blocks (Saturday and Sunday mornings, 3 hours each) that compress the additional NEET Chemistry and Physics into manageable weekly batches without colliding with the school's own weekend testing schedule.",
    ],
    reputationBullets: [
      "Full IB Continuum: PYP + MYP + DP since the school's founding",
      'Founded 2003 — among the longer-running full-continuum IB schools in India',
      'Located in the Aravali range south of Gurgaon — residential + day campus',
      'Recent school-reported diploma averages at or above the global mean',
      'IB Biology HL and SL with full Section 6 practical coverage',
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
          'Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. A substantive share of Pathways Aravali Biology HL students pursue the dual IB+NEET pathway because it preserves both the abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options. We coordinate the IB Biology HL syllabus with the NEET Biology + Chemistry + Physics syllabuses on a single weekly schedule.',
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
          'Roughly 60–70% of NEET Biology content overlaps with IB Biology HL (cell biology, plant and human physiology, genetics, ecology, evolution). The remaining 30–40% — primarily kingdom classification depth and certain Indian-context botanical and zoological detail — needs separate NEET-specific coverage. Our integrated weekly schedule layers NEET-specific topics on top of the IB HL content so students do not re-learn material; they extend it.',
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
          "For the IB Biology component — yes. The Davis Scholar network includes 100+ US partner colleges, and a strong IB Biology HL score (6 or 7) is part of the academic signal for the most competitive Davis placements. We coach the Biology HL syllabus (Paper 2 long-response, Paper 3 lab-data, IA at 6/7 level); the Davis application itself and the US-college-specific essays are best handled through the college's university counselling office.",
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
      "Stonehill's IB Diploma cohort is mid-sized for a Bangalore IB school, with IB Biology HL and SL both offered each year. The school has publicly reported diploma averages above the global mean — recent cohort averages have been in the 33–36 point range, with the strongest students scoring 40+ (publicly reported in the school's annual results communications). The Biology department supports the full Section 6 (Practical Programme) syllabus.",
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
      'IB Biology HL and SL with full Section 6 practical coverage',
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
          'Yes. Cerebrum is the only IB Biology tutor in India that runs this integrated track. Stonehill students who want to preserve both the abroad (UK medicine, US pre-med) and India (AIIMS, state medical college) options can pursue the dual IB+NEET pathway with us. The schedule integrates IB Biology HL with NEET Biology + Chemistry + Physics on a single weekly load.',
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
      "Inventure's IB Biology cohort is mid-sized for a Bangalore IB school, with both HL and SL offered. The school has publicly reported diploma results above the global mean — recent cohort averages have been in the 33–35 point range, with the strongest students scoring 40+ (publicly reported in the school's annual communications). The Biology department supports the full Section 6 (Practical Programme) syllabus on the school's Whitefield campus.",
      'For Inventure students, the most common driver of external tutoring is the ICSE-to-IB transition: ICSE Biology is a content-dense, recall-heavy syllabus, while IB Biology HL rewards data analysis, evaluation, and the specific Paper 2 long-response rubric. Students with strong ICSE habits sometimes over-write or over-recall on Paper 2. Our 1:1 sessions explicitly calibrate the ICSE-to-IB writing-style transition and add IA mentorship through the DP1 topic-selection cycle.',
      'The ICSE-to-IB transition has a specific practical implication for IB+NEET-track students at Inventure: ICSE Class 10 already covers a substantive portion of the NEET Biology and Chemistry syllabus (kingdom classification, plant and human physiology, basic organic chemistry), so Inventure students arrive at DP1 with a stronger NEET-relevant base than students from MYP-fed schools. We exploit that advantage in the integrated IB+NEET schedule: the first six months of DP1 emphasise IB Biology HL depth and the IA topic-selection process, with NEET Chemistry and Physics building in parallel rather than starting from zero. By DP2, the integrated programme is in steady-state weekly rhythm.',
      "Inventure's Whitefield location is convenient for the technology-corridor Bangalore IB families but also means commute times to and from school are significant — Inventure students living in Koramangala, Indiranagar, or JP Nagar can spend 60–75 minutes each way during peak traffic. Our online-first tutoring removes that loss: 1:1 sessions run from the student's home desk, with recordings available for next-day review on the commute. For weekend intensive blocks (most relevant in the final spring before May exams), we run Saturday and Sunday morning 2-hour sessions that align with Inventure's lighter weekend testing schedule.",
    ],
    reputationBullets: [
      'K-12 school in Whitefield, Bangalore, founded 2005',
      'ICSE/ISC through Grade 10, then IB Diploma Programme in Grades 11-12',
      'IB Biology HL and SL with full Section 6 practical coverage',
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
          'Yes. Cerebrum is the only IB Biology tutor in India that runs this integrated track. Inventure students with strong ICSE foundations are typically well-positioned for the IB+NEET dual pathway because their ICSE Biology and Chemistry already provide a NEET-relevant base. We coordinate the IB Biology HL syllabus with NEET Biology + Chemistry + Physics on a single weekly schedule.',
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
      "Oberoi's IB Diploma cohort is one of the larger DP cohorts in Mumbai, with IB Biology HL and SL both offered each year across the two campuses. The school has publicly reported strong IB results — recent cohort averages have been at or above the global mean, with a substantive share of candidates scoring 40+ (publicly reported in the school's annual results communications). The Biology departments at both campuses are staffed by IB-experienced teachers and the laboratory facilities support the full Section 6 syllabus.",
      'For Oberoi students, the most common driver of external tutoring is the same as at the other top-tier Mumbai IB schools: Paper 2 mark-scheme calibration and IA mentorship through the DP1 topic-selection cycle. Many Oberoi families also pursue the dual IB+NEET track — Cerebrum is the only IB Biology tutor in India that runs this integrated programme, which is particularly valuable for students who want to preserve both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options.',
      "Oberoi's two-campus structure (JVLR and OGC) is operationally important for tutoring scheduling because the campuses run on broadly aligned but not identical IA submission and mock-exam calendars. We track both campus calendars and our 1:1 examiners adapt session content to the specific campus's deadlines — IA topic-selection windows, mock-exam dates, and the school's own Section 6 practical schedule. For Oberoi students who switch campuses during DP1 (rare but it happens with family relocation within Mumbai), we transition the coaching seamlessly because the underlying IB Biology HL syllabus is identical.",
      "Mumbai's IB market is one of the most concentrated in India — Oberoi, Dhirubhai Ambani International, JBCN, Ecole Mondiale, ASB, Aditya Birla World Academy, and Cathedral all sit within roughly the same Mumbai catchment. Families regularly compare these schools and their respective IB Biology HL outcomes. Our position is that the school choice is upstream of tutoring choice — once enrolled at Oberoi, our 1:1 coaching layers Paper 2 mark-scheme calibration and IA mentorship on top of the school's already-strong content delivery, with no implicit comparison to other Mumbai schools. The coaching is school-specific because the IA submission rhythms and mock-exam calendars are school-specific.",
    ],
    reputationBullets: [
      'Full IB Continuum: PYP + MYP + DP across two campuses',
      'Two Mumbai campuses: JVLR (Goregaon) and OGC (Powai)',
      'Operated by Oberoi Realty on a not-for-profit basis',
      'Recent school-reported diploma averages at or above the global mean',
      'IB Biology HL and SL with full Section 6 practical coverage',
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
          "Yes. The two campuses follow the same IB Biology syllabus on broadly aligned schedules but have different teacher cohorts and IA submission rhythms. Our 1:1 sessions adapt to your specific campus's internal calendar — IA deadlines, mock exam windows, and the school's own Section 6 practical schedule.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Oberoi students?',
        answer:
          'Yes. Cerebrum is the only IB Biology tutor in India that runs this integrated track. Many Oberoi students pursue the dual IB+NEET pathway because it preserves both abroad and India medical-college options. The integrated programme covers IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule, typically ₹60,000–₹98,000 per year for the complete coaching.',
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
      "ASB's IB Biology cohort is smaller than Mumbai's larger IB Continuum schools (Oberoi, Dhirubhai Ambani) because ASB also offers an American-diploma-only pathway — many students choose AP Biology instead. However, the IB students at ASB are typically self-selecting toward the IB's breadth-and-IA assessment model and the international university applications that benefit from it. IB Biology HL and SL are both offered, with full Section 6 (Practical Programme) coverage.",
      "For ASB students, the most common driver of external tutoring is the dual American-and-IB context: the school's academic culture is shaped by both AP and IB rhythms, and IB students sometimes want a tutor who can fully commit to the IB rubric without any AP-style framing creeping in. Our 1:1 sessions are 100% IB-rubric-aligned — Paper 2 long-response calibration, IA mentorship, Paper 3 lab-data drills. We also coach the dual IB+NEET track for students who want to preserve Indian medical college options.",
      "ASB's location in BKC means the school sits at the centre of Mumbai's expat-and-corporate residential belt — students live in BKC itself, Bandra, Worli, and a wider catchment that includes Powai for some families. Commute times are relatively short by Mumbai standards, but the school day plus extracurriculars still pushes many DP students to a 7 PM finish before they start independent study. Our IST live sessions sit at 7:30–9 PM most weekdays, with weekend morning intensives an option during the final March-April push before May exams. For IB+NEET students at ASB, the integrated weekly schedule is heavier and we recommend starting Chemistry and Physics buildup in Grade 10 (the year before DP1).",
    ],
    reputationBullets: [
      'Not-for-profit international school in Mumbai, founded 1981',
      'NEASC-accredited (US) with EARCOS membership',
      'Dual-pathway senior school: American diploma with AP OR IB Diploma',
      'Primary campus in Bandra Kurla Complex (BKC)',
      'IB Biology HL and SL with full Section 6 practical coverage',
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
          'Yes. Cerebrum is the only IB Biology tutor in India that runs this integrated track. ASB IB students who want to preserve both abroad (US pre-med, UK medicine) and India (AIIMS, state medical college) options can pursue the dual IB+NEET pathway with us. The integrated programme covers IB Biology HL + NEET Biology + Chemistry + Physics, typically ₹60,000–₹98,000 per year.',
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
          "DP1: foundational content (cells, biochemistry, genetics, ecology), IA topic-selection in late DP1. DP2: HL extensions (cellular respiration depth, neurobiology, animal and plant physiology), IA submission early DP2, November DP2 mocks, then full-length Paper 1/2/3 mocks January–April leading to May finals. Our 1:1 coaching typically runs 2–3 hours per week through this cycle, calibrated to the school's specific calendar.",
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
      "Stamford American's IB Diploma cohort sits inside the highly competitive Singapore IB market alongside UWCSEA, Tanglin Trust, SAS, and Dulwich. IB Biology HL and SL are both offered, with full Section 6 (Practical Programme) coverage. The school has publicly reported strong IB results — recent cohort averages above the global mean, with a meaningful share of candidates scoring 40+ (publicly reported in the school's annual results communications).",
      'For Stamford American students, the most common driver of external tutoring is Paper 2 mark-scheme calibration and IA mentorship — the same pattern as at the other top Singapore IB schools. The Singapore IB market is small enough that our group batches often include peers from Stamford American, Tanglin Trust, UWCSEA, and SAS sharing the same SGT live-class slot.',
      "Stamford American's distinctive offering — running all four IB programmes including the Career-related Programme (CP) — means a small number of students each year take Biology as part of a CP rather than the full DP. The CP combines two DP subjects with a career-related study and reflective project. For students on this pathway with Biology as one of their DP courses, the academic content is identical to the standard DP Biology HL or SL syllabus, and our 1:1 coaching is the same. The IA workflow differs slightly because CP students have less concurrent DP workload, which sometimes means more time available for IA refinement; we adapt the weekly pacing accordingly.",
      "Stamford American sits inside Cognita Schools, a global international-school network, which means the school's policies and academic calendar are aligned with Cognita's broader systems. For families relocating between Cognita schools (e.g., Stamford American in Singapore to another Cognita school in Bangkok or Hong Kong), the IB Biology DP curriculum transfers cleanly because the IB syllabus is identical worldwide. Our coaching adapts to the new school's specific IA submission rhythm and mock-exam calendar without requiring students to restart any content sequence — a meaningful advantage for the relocating-expat families that make up a substantive share of the Stamford American community.",
    ],
    reputationBullets: [
      'Full IB Continuum + CP: PYP + MYP + DP + Career-related Programme',
      'Founded 2009; campuses at Woodleigh and Early Learning Village',
      'Part of Cognita Schools international network',
      'Recent school-reported diploma averages above the global mean',
      'IB Biology HL and SL with full Section 6 practical coverage',
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
          'For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For exam-only coaching, October DP2 (after November mocks) is still effective for the May session, focusing on Paper 2 mark-scheme calibration and Paper 3 lab-data drills.',
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
      "MGIS's IB Biology cohort is smaller than the larger Delhi NCR and Mumbai IB schools — Ahmedabad has a more concentrated IB market — but the cohort is academically self-selected. IB Biology HL and SL are both offered, with full Section 6 (Practical Programme) coverage. The school has publicly reported diploma results above the global mean, with strong students scoring 40+ (publicly reported in the school's annual results communications).",
      'For MGIS students, the most common driver of external tutoring is the Ahmedabad context: the local IB tutoring market is small, and families want access to examiner-led 1:1 coaching that may not be available locally. Our online IB Biology programme runs in IST and serves Ahmedabad students with the same examiner-led 1:1 model used at Mumbai, Delhi, and Bangalore IB schools. We also coach the dual IB+NEET track for students who want to preserve Indian medical college options.',
      "MGIS's not-for-profit operating model and pedagogical lineage — its Gandhian framing emphasises inquiry, sustainability, and community — give the school a distinct academic culture compared to the more commercial international-school chains in India. Biology HL at MGIS is taught with strong emphasis on ecology and the human-environment systems strand of the syllabus, which is a natural fit for the school's broader pedagogy. Our IA mentorship coordinates well with this: ecology-themed IA topics are common at MGIS, and our examiners have specific experience supervising field-data and longitudinal-ecology IAs through the IB's Section 6 rubric.",
      "Ahmedabad's IB student community is small enough that students often have close cohort relationships across schools (MGIS, Ahmedabad International, others). Our online format makes it practical for two or three friends to join a Group Batch ($40/hour) together — sometimes the same friends from different schools — preserving the peer-discussion benefit even when the local IB ecosystem is geographically compact. For Ahmedabad students who later relocate (a common pattern with parents transferred to Mumbai, Bangalore, or abroad), the IB Biology syllabus transfers cleanly worldwide, so the coaching continues without restart.",
    ],
    reputationBullets: [
      'Full IB Continuum: PYP + MYP + DP (one of the earliest in India)',
      'Founded 1998; DP authorised 2000',
      'Not-for-profit, located in Ahmedabad, Gujarat',
      'IB Biology HL and SL with full Section 6 practical coverage',
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
          'Yes. Cerebrum is the only IB Biology tutor in India that runs this integrated track. MGIS students who want to preserve both abroad and India medical-college options can pursue the dual IB+NEET pathway. The integrated programme covers IB Biology HL + NEET Biology + Chemistry + Physics, typically ₹60,000–₹98,000 per year.',
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
          "Ecology-themed IAs (e.g., abundance studies, population dynamics, plant-community surveys, water-quality biomonitoring) are a natural fit for MGIS's broader pedagogical emphasis on environment and sustainability. Our examiners have specific experience supervising field-data IAs through the IB's Section 6 rubric: research-question precision, ethics and environmental impact framing, data collection rigour, and the evaluation section that distinguishes 6/7 IAs from 5-level work. We coach the rubric specifics, not the Gandhian framing.",
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
      "DAIS's IB Diploma cohort has one of the strongest publicly reported academic profiles in India. Recent cohort averages have been well above the global mean — DAIS has publicly reported diploma averages in the 38–40+ range with multiple candidates each year scoring 44 or 45 (publicly reported in the school's annual results communications and Mumbai-press coverage). IB Biology HL and SL are both offered, with full Section 6 (Practical Programme) coverage.",
      "For DAIS students, the most common driver of external tutoring is the differentiation challenge: the cohort is so academically strong that turning a 6 into a 7 is the marginal value, and that's typically a Paper 2 mark-scheme calibration question. Our 1:1 sessions focus on this exact margin — turning strong classroom answers into 6/7-marker rubric-aligned responses — plus IA mentorship at the 6/7 level where the school's internal moderation rewards distinctive evaluation work.",
      "DAIS's selective admissions process means the cohort enters DP1 with already-exceptional academic preparation, and the school's pace through the two-year DP track is correspondingly fast. Most of the IB Biology syllabus is comprehensively covered by mid-DP2, which leaves February through April of DP2 for full-length Paper 1/2/3 mocks and IA finalisation. Our coaching schedule respects that pace: rather than introducing new content, we use the final spring window for examiner-led mock-exam debriefs, IA polish at the 6/7 level, and Paper 3 lab-data drills using past papers across all 2016–2025 sessions. For DAIS students aiming for Oxbridge medicine or US Ivy+ pre-med, a clean 7 in HL Biology paired with a strong overall DP score is the standard academic-signal target, and our 1:1 Elite Tutoring tier ($75/hour) is calibrated to that endpoint.",
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
      "DAIS's IB Biology follows the standard two-year DP cycle at a pace that's among the fastest in India — most of the syllabus is comprehensively covered by mid-DP2, leaving February–April for full-length Paper 1/2/3 mocks and IA finalisation. IST timezone aligns directly with our tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM) or weekend mornings; the coaching focus is at the 6-to-7 margin rather than building base content.",
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
          'Yes. Cerebrum is the only IB Biology tutor in India that runs this integrated track. A meaningful share of DAIS students pursue the dual IB+NEET pathway because it preserves both abroad and India medical-college options. The integrated programme covers IB Biology HL + NEET Biology + Chemistry + Physics, typically ₹60,000–₹98,000 per year.',
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
          "Given DAIS's strong content delivery, families often start later than at other schools. For students confident in school content but wanting the 6-to-7 margin work, October–December DP2 (focused exclusively on Paper 2 mark-scheme calibration and Paper 3 lab-data drills) is a viable timeline. For students wanting full IA mentorship at the 6/7 level, August or September of DP1 is still the ideal start.",
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
      "Cathedral's IB Diploma cohort is smaller than the dedicated IB Continuum schools in Mumbai (Oberoi, DAIS, Ecole Mondiale) — many Cathedral students continue on the ISC track — but the students who choose IB are self-selecting toward the IB's breadth and IA-driven assessment model. IB Biology HL and SL are both offered, with full Section 6 (Practical Programme) coverage. The school has a strong overall academic reputation in Mumbai and publicly reports diploma results above the global mean for its IB cohort.",
      "For Cathedral students, the most common driver of external tutoring is the dual ISC-and-IB context: the school's academic culture is shaped by both ISC and IB rhythms, and IB students sometimes arrive at DP1 with strong ISC habits — which is a different starting profile than students who came up through MYP. Our DP1 coaching explicitly bridges the ICSE/ISC-to-IB transition, calibrating the IB's data-analysis-driven Paper 2 style. We also coach the dual IB+NEET track for students who want to preserve Indian medical college options.",
      "Cathedral's Fort location and its long-running ICSE/ISC tradition make it different in character from the BKC and western-suburbs IB Continuum schools. Many Cathedral families have multi-generational relationships with the school, and the cultural expectation often includes considering both ISC and IB before committing to one in Grade 11. Students who choose IB are typically self-selecting toward international university applications (UK, US, Canada), while ISC-track students more often stay in India. Our IB Biology coaching adapts to this profile: we work most often with students who have explicitly chosen the international pathway and want a clean 6 or 7 in Biology HL as a key academic-signal input for UK medicine or US pre-med applications.",
      'The ICSE-to-IB transition at Cathedral is sharper than at MYP-fed schools because ICSE Grade 10 is content-dense and finals-focused, while IB DP1 expects students to start producing the data-analysis-and-evaluation style of writing that Paper 2 rewards. Our explicit DP1 coaching includes side-by-side comparisons of ICSE-style answers and IB-rubric-aligned answers on the same biological topic, so students see the writing-style shift concretely. By mid-DP1, most Cathedral IB Biology students have internalised the transition; the remaining DP1 work focuses on IA topic-selection and the standard syllabus content.',
    ],
    reputationBullets: [
      'Founded 1860 — one of the oldest schools in Mumbai',
      'Located in Fort, Mumbai',
      'Tri-curriculum: ICSE through Grade 10, then ISC + IB Diploma in senior school',
      'Dual-pathway senior school (ISC OR IB)',
      'IB Biology HL and SL with full Section 6 practical coverage',
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
          'Yes. Cerebrum is the only IB Biology tutor in India that runs this integrated track. Cathedral students who want to preserve both abroad and India medical-college options can pursue the dual IB+NEET pathway. The integrated programme covers IB Biology HL + NEET Biology + Chemistry + Physics, typically ₹60,000–₹98,000 per year.',
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
      "The Shri Ram School Aravali is the senior campus of The Shri Ram Schools (TSRS) network, founded in 2008 in Sector V-37 Gurugram on the wooded southern edge of the Aravali range. The Shri Ram Schools group itself was founded in 1988 by Manika Sharma, with the original Gurgaon campus at Moulsari (Sector 46) opening earlier and now operating through MYP. TSRS Aravali is the IB Diploma Programme campus — many TSRS students transition from the Moulsari MYP track to the Aravali DP track for Grades 11 and 12, although Aravali also enrols students directly from other schools at the DP entry point.",
      "TSRS Aravali runs a full MYP-to-DP secondary programme and is recognised in the Delhi NCR IB landscape for its progressive pedagogy and a humanities-and-arts-strong identity that the school has actively cultivated since its founding. The Biology department offers both HL and SL with full Section 6 (Practical Programme) coverage, and the school's overall IB Diploma results have publicly read as competitive within the NCR cluster — a meaningful share of each graduating cohort has historically scored at or above the global mean per school communications, though TSRS does not publish per-subject IB Biology distributions in the way some schools do.",
      "For TSRS Aravali students, the most common driver of external IB Biology tutoring is twofold: (1) Paper 2 rubric calibration where TSRS's inquiry-led classroom culture produces conceptually strong students who sometimes still drop marks against the IB's specific long-response mark scheme, and (2) IA topic-selection and mentorship through the DP1 cycle, where Biology IA's design + data-analysis demands often benefit from a one-to-one tutor who has examined IAs against the rubric. Several TSRS Aravali families also pursue the integrated IB+NEET track because the Sector V-37 location keeps the dual-track preserved without an unrealistic commute to a separate NEET coaching centre.",
      "TSRS Aravali's wooded Aravali-range location and its day-school structure (not residential) shape the rhythm of tutoring scheduling. Day students commute from across the Gurgaon catchment — Sohna Road, Golf Course Extension, Sushant Lok, DLF Phase 5, and the newer Sector 70–80 belt — with door-to-door commutes that can run 30–60 minutes each way. Our IST live sessions at 7–9 PM work for this profile: students arrive home, eat, and join the session at the same time they would otherwise be in homework. For IB+NEET integrated students we also offer Saturday weekend intensive blocks (3 hours each morning) so the additional NEET Chemistry and Physics workload sits in a single weekend window rather than spread thinly through the week.",
    ],
    reputationBullets: [
      "Founded 2008 — TSRS group's senior IB Diploma campus in Gurgaon",
      'Part of The Shri Ram Schools network (founded 1988 by Manika Sharma)',
      'IB MYP through DP — sister campus Moulsari runs the junior MYP feed',
      'Located in Sector V-37 on the Aravali range, south Gurgaon',
      'Recognised for inquiry-led pedagogy and a humanities-and-arts-strong identity',
      'IB Biology HL and SL with full Section 6 practical coverage',
      'Day school (not residential) — students commute from across Gurgaon',
    ],
    collegeContext:
      'TSRS Aravali graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Manchester, Edinburgh), US (Ivy+, top liberal arts colleges, NYU, Northwestern), Canada (McGill, Toronto, UBC, Western, Queen\'s), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar, Plaksha, plus AIIMS / state medical colleges for the IB+NEET dual-track students). Biology HL students from TSRS most commonly target UK medicine, US pre-med (followed by Indian medical schools via NEET on the dual-track), or biosciences degrees at top UK and Canadian universities. For TSRS\'s humanities-and-arts cohort, Biology HL is also common as a foundation for environmental science, neuroscience, and public-health degrees.',
    paceAlignment:
      "TSRS Aravali follows the standard two-year DP cycle with the IA submission window centred on DP1-end / early DP2. IST timezone aligns with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule that compresses IB Biology + NEET Biology + NEET Chemistry + NEET Physics into a manageable weekly load that doesn't break either syllabus. IA mentorship aligns to the school's DP1 IA proposal deadlines and the November DP2 mock exam window.",
    faqs: [
      {
        question: 'Do you offer the IB+NEET integrated track for TSRS Aravali students?',
        answer:
          'Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. A meaningful share of TSRS Aravali Biology HL students pursue the dual IB+NEET pathway because it preserves both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options. We coordinate the IB Biology HL syllabus with NEET Biology + Chemistry + Physics on a single weekly schedule.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. India-resident families pay in INR; TSRS Aravali families can opt for either USD international or INR domestic pricing.',
      },
      {
        question: "How does TSRS Aravali's IB Biology compare to Pathways Aravali (the other major IB school in the area)?",
        answer:
          'Both schools run IB Biology HL and SL at a serious level and both campuses sit on the Aravali range within a short driving distance. Pathways Aravali is a residential + day school with a larger full IB Continuum from PYP through DP and a publicly-larger DP Biology cohort. TSRS Aravali is day-only with a smaller, more humanities-and-arts-tilted cohort. Both produce competitive DP scores; the choice between them is typically about school culture fit (boarding option, pedagogical style, peer cohort) rather than the IB Biology programme itself. Our coaching works equally with students from either school.',
      },
      {
        question: 'What is TSRS Aravali\'s IB Diploma cohort average — and is that a useful comparator?',
        answer:
          'TSRS Aravali does not publish per-subject IB Biology distributions in the way some schools do, but the school\'s overall diploma performance has publicly read as competitive within the NCR cluster. Per-school averages are weaker comparators than they look — the more useful question for a specific student is "what is my target score, and what is the gap between my current trajectory and that target". Our DP1 diagnostic identifies the gap and the coaching plan closes it; cohort averages are an aggregate signal, not an individual prediction.',
      },
      {
        question: "When should a TSRS Aravali student start IB Biology tutoring?",
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window and lets the coaching shape the IA topic from proposal to final submission. For IB+NEET students, ideally even earlier (during Grade 10 / MYP5) to build the Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October or November of DP2 (after the school's mocks) is still effective and we have a number of TSRS students who join at that point specifically for Paper 2 + Paper 3 rubric drilling.",
      },
      {
        question: 'Do you tutor TSRS Moulsari MYP5 students preparing to transition into the Aravali DP programme?',
        answer:
          'Yes — pre-DP MYP5 preparation is a useful entry point for students planning the Moulsari-to-Aravali transition. We coach the MYP-to-DP Biology bridge specifically: introducing the IB Diploma command terms ("explain", "evaluate", "discuss"), the data-analysis style that Paper 2 rewards, and the IA-style of designing a personal investigation. Many TSRS families start this in MYP5 summer so the student arrives at DP1 with the rubric language already familiar.',
      },
      {
        question: 'TSRS Aravali is in Sector V-37 — what about the commute and live-class scheduling?',
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
      "Heritage Xperiential Learning School (HXLS) is a co-educational day school in Sector 62 Gurugram, founded in 2002 as the flagship campus of the Heritage Schools group co-founded by Manit Jain and Vishnu Karthik. The school is built around an experiential-learning philosophy that emphasises inquiry, outdoor education, arts and theatre, and project-based assessment in the junior and middle years; in the senior school, students choose between the IB Diploma Programme and the CBSE/Indian board pathway, with the IB DP authorised under the IB World School framework.",
      "Heritage Xperiential's IB Biology cohort is smaller than Pathways Aravali's because the school also runs a CBSE senior-school track and many Heritage students continue on CBSE rather than switching to IB at Grade 11. The students who do choose IB are typically self-selecting toward international university applications — UK, US, Canada, Australia — and want the IB's breadth and IA-driven assessment to read on a Common-App or UCAS transcript. IB Biology HL and SL are both offered, with full Section 6 (Practical Programme) coverage, and the school's senior-school Biology department draws on the broader Heritage commitment to lab-based and field-based inquiry.",
      "For Heritage Xperiential students, the most common driver of external IB Biology tutoring is the transition from the school's inquiry-led junior pedagogy into the rubric-tight assessment style that the IB Diploma demands. Heritage students often arrive at DP1 with strong conceptual instincts and natural enquiry-driven curiosity (the experiential learning culture builds this from K-1), but the IB's command-term vocabulary (\"explain\", \"evaluate\", \"discuss\", \"distinguish\") and the precise mark-scheme structure of Paper 2 long-response answers benefit from explicit calibration. Our DP1 coaching adds that rubric scaffolding without compromising the conceptual fluency the school has built; we are deliberately not trying to convert Heritage students into rote learners, only to help them translate their conceptual strength into the IB-rubric language that scores marks.",
      "Heritage's IA (Internal Assessment) culture is particularly aligned with our coaching model. The school's experiential-learning DNA produces students who genuinely enjoy designing a personal investigation — the IB Biology IA's 10-hour 20-percent-weight independent investigation plays to Heritage students' strengths rather than against them. Our IA mentorship for Heritage students typically focuses less on \"how to design an investigation\" and more on \"how to write up the design + data analysis + evaluation against the four IB-specific assessment criteria\" — converting a strong piece of inquiry into a well-scoring IA report. Several Heritage IB Biology students each cohort also pursue Extended Essay (EE) in Biology; our EE mentorship runs in parallel with the IA work to keep the DP1 research load manageable.",
    ],
    reputationBullets: [
      'Founded 2002 — flagship campus of the Heritage Schools group',
      'Co-founders: Manit Jain and Vishnu Karthik',
      'IB World School authorised for the Diploma Programme',
      'Senior school offers both IB DP and CBSE — students choose at Grade 11',
      'Experiential-learning philosophy: inquiry, outdoor ed, arts, project-based',
      'Located in Sector 62 Gurugram (Sohna-Gurgaon Road corridor)',
      'IB Biology HL and SL with full Section 6 practical coverage',
      'Strong IA / EE culture aligned with the school\'s inquiry-driven pedagogy',
    ],
    collegeContext:
      'Heritage Xperiential IB graduates matriculate to UK (Russell Group, Oxbridge, Imperial, UCL, Edinburgh, Warwick, KCL, SOAS for humanities cross-applicants), US (Ivy+, top liberal arts colleges, NYU, Berkeley, Michigan, Northwestern), Canada (McGill, Toronto, UBC, Western, Queen\'s), Australia (Melbourne, Sydney, ANU), and Indian universities (Ashoka, Krea, Shiv Nadar, Plaksha, plus AIIMS / state medical colleges for the IB+NEET dual-track students). The Heritage profile is unusually strong for liberal-arts-oriented US applications (Williams, Amherst, Pomona, Wesleyan, Brown) because the experiential-learning transcript reads as authentically distinctive on US admissions side. Biology HL students from Heritage most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or interdisciplinary science programmes that reward an inquiry-and-arts profile.',
    paceAlignment:
      "Heritage Xperiential follows the standard two-year DP cycle with the IA submission window in late DP1 / early DP2. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common) or weekend morning blocks. For IB+NEET integrated students, we run a combined weekly schedule that layers NEET Biology + Chemistry + Physics on top of IB Biology HL without doubling the workload — many Heritage students value this efficiency because the school's culture is anti-burnout. IA mentorship aligns to the school's DP1 IA proposal deadlines; EE mentorship runs in parallel for the cohort that takes Biology as their EE subject.",
    faqs: [
      {
        question: "My child is at Heritage Xperiential's experiential-learning programme through Grade 10 — will they adjust to the IB DP's rubric-tight assessment style?",
        answer:
          "Yes, and the adjustment is typically faster than parents expect. Heritage students arrive at DP1 with strong conceptual instincts and a natural inquiry-driven curiosity that the school's K-10 experiential model builds. The IB DP layer is essentially adding rubric vocabulary (\"explain\", \"evaluate\", \"discuss\", \"distinguish\") and Paper 2 long-response structure on top of that conceptual foundation. Most Heritage students internalise the rubric language within the first DP1 term once it is taught explicitly. Our DP1 coaching adds that scaffolding without converting them into rote learners — we are deliberately keeping the conceptual fluency the school has built.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Heritage Xperiential students?',
        answer:
          'Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. Some Heritage IB Biology HL students pursue the dual IB+NEET pathway because it preserves both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule. Heritage students often value this efficiency because the school\'s culture is anti-burnout — we calibrate the integrated load explicitly to avoid the 60-hour weekly trap.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. India-resident families pay in INR; Heritage Xperiential families can opt for either USD international or INR domestic pricing.',
      },
      {
        question: "Heritage's senior school offers both IB and CBSE — when does IB Biology coaching make sense, and when is the student better off staying on CBSE?",
        answer:
          'The honest answer depends on the application target. If your child is realistically applying to UK / US / Canada / Australia universities, IB is the better signal and the workload is justified. If your child is realistically going to study in India (AIIMS, state medical colleges, IITs, Ashoka, Krea), CBSE is the cleaner path — NEET-eligibility and Indian-university processes are CBSE-aligned. The grey zone is dual-application students who want both options open: we work with these students on the IB+NEET integrated track to preserve both paths. We will be straight with you about which track to prioritise based on your application target.',
      },
      {
        question: 'My child is doing Biology IA at Heritage and wants the rubric to actually translate into marks — can you help with that specifically?',
        answer:
          "Yes — IA mentorship is one of our highest-leverage offers for Heritage students because the experiential pedagogy already produces strong investigation design. The gap, when it exists, is in writing up the design + data + evaluation against the four IB-specific assessment criteria (Personal Engagement, Exploration, Analysis, Evaluation, Communication). We work through draft-by-draft rewrites with explicit criterion-by-criterion feedback. Several Heritage Biology IAs each cohort move from low-7s to high-7s with two or three rounds of this feedback, because the underlying inquiry is already strong; the gap is in the formal write-up.",
      },
      {
        question: 'Do you support Biology Extended Essay (EE) for Heritage students taking it as their EE subject?',
        answer:
          'Yes. EE mentorship runs alongside IA mentorship in DP1 so the research load is manageable. Biology EE is a 4,000-word independent research essay marked against the IB EE rubric — distinct from but related to the IA. We help with research-question formulation (a tighter question scores better than a broader one), source-material selection, the EE-specific writing style (more formal than the IA, more open-ended than a school report), and the reflective Researcher\'s Reflection Space (RRS) entries. Several Heritage IB Biology EE candidates each cohort target high-B / low-A scores; this is achievable with focused mentorship from the proposal stage.',
      },
      {
        question: 'When should a Heritage Xperiential student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA + EE mentorship window for Heritage students who take Biology as their EE subject. For IB+NEET students, ideally even earlier (during Grade 10) to build the Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October or November of DP2 (after the school's mocks) is still effective and we have a number of Heritage students who join then specifically for Paper 2 + Paper 3 rubric drilling in the run-up to the May exams.",
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
      "Scottish High runs multiple senior-school pathways in parallel — CBSE, Cambridge IGCSE / A-Levels, and the IB Diploma Programme — so students self-select at the senior-school transition based on their target universities. The IB DP track at Scottish High is smaller than the CBSE and IGCSE/A-Level tracks but is the chosen path for students targeting US, Canadian, and Australian universities specifically, and for the subset of UK applicants who want the IB's six-subject breadth over A-Levels' three-subject depth. IB Biology HL and SL are both offered, with full Section 6 (Practical Programme) coverage, and the school's Biology department is staffed by IB-experienced teachers.",
      "For Scottish High IB Biology students, the most common driver of external tutoring is the parallel-curriculum context: because the school runs IB alongside CBSE and Cambridge, the IB cohort is smaller and the in-school peer benchmark for IB-specific rubric work can feel thinner than at a single-curriculum IB school. Our 1:1 coaching fills that gap with rubric-tight Paper 2 calibration and weekly written feedback on long-response answers — replicating the peer-pressure-driven rubric awareness that students at larger IB cohorts (Pathways, ASD, UWCSEA) get from sheer cohort density.",
      "Scottish High's Sushant Lok II / Sector 57 location keeps the school accessible from across the central Gurgaon residential belt — Sushant Lok I, DLF Phase 1, 2, 3, and 4, Sector 49, Sector 56, Nirvana Country, Malibu Towne, Suncity, Rosewood City. Day-school commutes for IB students are typically in the 20–45 minute range each way. Our IST evening live sessions (7–9 PM) fit cleanly after the school commute. The school's structured academic culture means IB students typically arrive at DP1 with strong study-discipline habits but sometimes need explicit help converting that discipline into the IB-rubric vocabulary, which is what our coaching adds.",
    ],
    reputationBullets: [
      "Founded mid-2000s under Shomie Das (former Doon School + Mayo College principal)",
      'IB World School authorised for the Diploma Programme',
      'Multi-curriculum senior school: CBSE + Cambridge IGCSE/A-Levels + IB DP',
      'Distinctive Scottish identity: tartan uniforms, four-house system',
      'Located in Sector 57 (G Block, Sushant Lok II), central Gurgaon',
      'IB Biology HL and SL with full Section 6 practical coverage',
      'Structured academic culture with strong study-discipline orientation',
    ],
    collegeContext:
      "Scottish High IB graduates matriculate to US (Ivy+, NYU, top liberal arts, public flagships), UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh — the IB-vs-A-Level decision at Scottish High is often driven by exactly this UK university-versus-US application choice), Canada (Toronto, UBC, McGill, Waterloo, Western), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from Scottish High most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical engineering programmes. The school's structured academic culture produces students who are typically strong on standardised-test components (SAT, AP) where Indian-school discipline reads well.",
    paceAlignment:
      "Scottish High's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the central-Gurgaon school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule that compresses IB Biology + NEET Biology + NEET Chemistry + NEET Physics into a manageable weekly load. IA mentorship aligns to the school's DP1 IA proposal deadlines and the November DP2 mock exam window. The structured-discipline study culture at Scottish High typically lets students absorb a tighter weekly tutoring schedule than at more open-ended-pedagogy schools.",
    faqs: [
      {
        question: "Scottish High runs CBSE, Cambridge A-Levels, and IB DP in parallel — does that smaller IB cohort hurt my child's IB Biology results?",
        answer:
          "Not directly — the cohort size at the school does not change the IB exam grading, which is criterion-referenced against the same global rubric every year. What can be thinner at a multi-curriculum school is the peer-driven rubric awareness — students at larger single-curriculum IB schools (Pathways, ASD, UWCSEA) absorb rubric vocabulary partly through cohort-density-driven peer benchmarking. Our 1:1 coaching replaces that peer-driven calibration with explicit weekly written feedback on long-response answers against the IB Biology mark scheme. The result is rubric-tight Paper 2 answers regardless of in-school IB cohort size.",
      },
      {
        question: 'My child is choosing between IB DP and Cambridge A-Levels at Scottish High — which is better for medicine applications?',
        answer:
          "It depends on the target country. For UK medicine, both IB and A-Levels are accepted; UK medical schools have well-developed offer matrices for both, and the choice is often about whether your child wants six-subject breadth (IB) or three-subject depth (A-Levels). For US pre-med, IB reads more cleanly because US admissions officers parse IB transcripts more fluently than A-Level transcripts. For Canada / Australia, both work. For India (AIIMS / state medical via NEET), neither matters directly — NEET is a separate Class 12 + entrance-exam track. We work with Scottish High students on either curriculum but the IB Biology coaching is most directly leveraged on the IB DP track; for A-Level Biology students we have a separate offering.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Scottish High IB students?',
        answer:
          'Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. Scottish High IB Biology HL students who want to preserve both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options can pursue the dual IB+NEET pathway. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule. The structured study-discipline culture at Scottish High typically suits this integrated load well.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. India-resident families pay in INR; Scottish High families can opt for either USD international or INR domestic pricing.',
      },
      {
        question: "How does Scottish High's IB Biology compare to Pathways Aravali or TSRS Aravali?",
        answer:
          "All three run IB Biology HL and SL at a serious level. The differences are in scale and pedagogy: Pathways Aravali has a larger full-IB-continuum cohort with cohort-density-driven peer benchmarking; TSRS Aravali is humanities-and-arts-tilted with a smaller more curated cohort; Scottish High is structured-and-disciplined with a multi-curriculum context. None of these school differences predict an individual student's IB Biology score — that depends on the student's own engagement and the quality of rubric calibration they get. Our coaching adapts to each profile; we have students from all three schools.",
      },
      {
        question: "Sushant Lok II / Sector 57 to anywhere in Gurgaon is a 20–45 minute commute — does that affect tutoring scheduling?",
        answer:
          'Not at all — coaching is 100% online live video, no physical tutoring-centre commute. Your child arrives home from Scottish High (typically between 4:30 and 6 PM depending on school-day end and Sector 57 traffic), eats, and joins the IST evening live session at 7 PM. Sessions run 90 minutes. The no-commute model returns about 60–90 minutes per session compared to driving to a Cyber City or MG Road tutoring centre, which compounds across a year of weekly sessions.',
      },
      {
        question: 'When should a Scottish High IB student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window and gives our coaching time to layer the IB-rubric vocabulary onto the strong study-discipline foundation Scottish High students typically bring. For IB+NEET students, ideally earlier (during Grade 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and many Scottish High students join then for focused Paper 2 + Paper 3 rubric drilling.",
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
      "DPS International offers Cambridge IGCSE through Class 10 and the IB Diploma Programme at Classes 11–12, giving students a clean IGCSE-to-IB Diploma senior-school pathway. Both IB Biology HL and SL are offered with full Section 6 (Practical Programme) coverage, and the Biology department is staffed by IB-experienced teachers. Cohort sizes have grown steadily as DPS network families have increasingly chosen the international route alongside the parallel CBSE option at DPS Sector 45 next door.",
      "For DPS International students, the most common driver of external IB Biology tutoring is the IGCSE-to-DP transition. IGCSE Biology Class 10 is rigorous on content but assessed differently from IB Diploma Biology — IGCSE prioritises clear recall and standard-answer structures, while IB DP requires data-analysis-and-evaluation style writing on Paper 2 and a 20-percent-weight Internal Assessment that asks for personal-investigation design. Our DP1 coaching makes the IGCSE-to-DP bridge explicit so students arrive at the May DP2 exams with rubric-tight Paper 2 answers and a strong IA.",
      "Several DPS International families also pursue the IB+NEET integrated track because the DPS-brand household recognition means many extended-family conversations come back to medical college in India as a valued option, even when the primary application track is abroad. Our IB+NEET coaching for DPS International students preserves the abroad pathway (UK medicine, US pre-med, Canadian biosciences) while keeping AIIMS / state medical colleges via NEET as a parallel option. The integrated weekly schedule sits in IST evenings and weekend mornings to fit around the school's academic load.",
    ],
    reputationBullets: [
      "International arm of the Delhi Public School (DPS) network in Gurgaon",
      'IB World School authorised for the Diploma Programme',
      'Cambridge IGCSE through Class 10 → IB Diploma Programme Classes 11–12',
      'Co-located in Sector 45 Gurgaon with the DPS Sector 45 CBSE flagship',
      'Strong DPS-network feeder pipeline from sister CBSE schools',
      'IB Biology HL and SL with full Section 6 practical coverage',
      'Senior-school IBDP is the school\'s flagship academic track',
    ],
    collegeContext:
      "DPS International IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Michigan, Northwestern, UCLA), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). The DPS-network brand recognition matters for Indian-university applications where the DPS name signals academic rigour; for international applications, the IB transcript is the primary signal. Biology HL students from DPS International most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical / biotechnology programmes.",
    paceAlignment:
      "DPS International follows the standard two-year DP cycle on the IB May exam timeline. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the Sector 45 commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule that compresses IB Biology + NEET Biology + NEET Chemistry + NEET Physics into a manageable weekly load. IA mentorship aligns to the school's DP1 IA proposal deadlines. For DP1 students transitioning from the school's Cambridge IGCSE Class 10, our coaching includes an explicit IGCSE-to-DP bridge so the assessment-style shift doesn't catch students off-guard.",
    faqs: [
      {
        question: "My child finished IGCSE Biology at DPS International with strong grades — what changes when they start IB Biology HL at DP1?",
        answer:
          "Three things change. First, the assessment shifts: IGCSE prioritises clear recall and standard-answer structures, while IB DP Paper 2 rewards data-analysis-and-evaluation style writing — students need to learn the IB-specific command terms (\"explain\", \"evaluate\", \"discuss\", \"distinguish\") and the long-response mark scheme. Second, the Internal Assessment adds a 10-hour personal-investigation worth 20 percent of the final grade — IGCSE has nothing equivalent. Third, the syllabus depth in selected topics (especially cell biology, genetics, and physiology) goes meaningfully beyond IGCSE. Our DP1 coaching makes all three transitions explicit in the first term.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for DPS International students?',
        answer:
          'Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. DPS International IB Biology HL students who want to preserve both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options can pursue the dual IB+NEET pathway. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule. Many DPS-network families value the integrated option because the DPS household identity is closely tied to India university aspirations even when the primary track is abroad.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. DPS International families typically pay in INR; USD pricing is available for families with international payment preferences.',
      },
      {
        question: 'My child is choosing between DPS International (IGCSE/IB) and DPS Sector 45 (CBSE) for senior school — does the IB pathway pay off for medicine applications?',
        answer:
          "Depends on the target country. For UK medicine, IB is well-received; the IB Biology HL + Chemistry HL combination reads strongly. For US pre-med, IB is the cleaner transcript signal — US admissions officers parse IB more fluently than CBSE. For Canada / Australia, IB works well. For India (AIIMS / state medical via NEET), CBSE is the more direct route because NEET-eligibility and the Class 12 board-exam framework are CBSE-aligned. Dual-application students who want both options can do IBDP at DPS International and pursue NEET via our IB+NEET integrated track. We'll be straight with you about which track best fits your application target.",
      },
      {
        question: "How does DPS International compare to Pathways World School (Aravali / Gurgaon) or Scottish High?",
        answer:
          'All four run IB Biology HL and SL at a serious level. The differences are in pedagogy and curriculum mix: Pathways runs a full IB Continuum from PYP through DP with a larger DP Biology cohort; Scottish High runs IB DP alongside Cambridge A-Levels and CBSE; DPS International runs Cambridge IGCSE through Class 10 then IB DP at senior. The DPS-brand network effect is unique — DPS International has structurally stronger India-university connections through the DPS Society alumni base. None of these school differences predict an individual student\'s IB Biology score; that depends on engagement and rubric calibration. Our coaching adapts to each profile.',
      },
      {
        question: "DPS International is in Sector 45 — how does the school commute affect tutoring scheduling?",
        answer:
          "Sector 45 is central Gurgaon and accessible from across the residential belt — DLF, Sushant Lok, Sohna Road, Golf Course Road, Cyber City, MG Road. Day-school commutes are typically 20–45 minutes each way. Coaching is 100% online live video, so the school commute itself doesn't conflict with tutoring scheduling. Students arrive home in the 4:30–6 PM window depending on the day's traffic and join the IST evening live session at 7 PM. Sessions run 90 minutes. The no-commute model returns about 60–90 minutes per session compared to driving to a tutoring centre.",
      },
      {
        question: 'When should a DPS International student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IGCSE-to-DP bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Cambridge IGCSE Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have many DPS International students who join then for focused Paper 2 + Paper 3 rubric drilling.",
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
      "GD Goenka World School is a residential and day co-educational IB World School on the Sohna Road south of Gurugram, founded in the mid-2000s as the flagship international campus of the broader GD Goenka education group. The school sits on a substantial green campus and runs a full IB Continuum — PYP, MYP, and DP — which places it among the longer-running full-continuum IB schools in north India (alongside Pathways Aravali and a small handful of others). Boarders and day students mix in the senior school; many boarders come from across India and from neighbouring countries.",
      "GD Goenka World School's IB Biology cohort has historically been one of the more substantial IB DP Biology cohorts in the Delhi NCR region. Both HL and SL are offered, with full Section 6 (Practical Programme) coverage. The school's biology laboratories support the full IB practical programme, and the Biology department is staffed by IB-experienced teachers. The school publicly reports IB Diploma performance and recent cohort averages have read as competitive within the NCR IB cluster.",
      "For GD Goenka World School students, the two most common drivers of external IB Biology tutoring are: (1) Paper 2 long-response rubric calibration where strong classroom answers can still drop marks against the IB's specific mark scheme, and (2) IA mentorship through the DP1 topic-selection and design cycle. Boarding students also benefit from the timezone match — our IST evening live sessions sit at 7–9 PM, which fits cleanly into the boarding study-hall schedule and removes the bandwidth concern of overseas-based tutors operating in mismatched timezones.",
      "GD Goenka World School's Sohna Road location is south of central Gurgaon, which means day students from DLF Phase 1–5, Golf Course Road, Sushant Lok, and the broader Sector 50–60 belt face a non-trivial commute (40–60 minutes each way in peak hours). For boarding students this is irrelevant; for day students, our online live tutoring removes a second commute on top of the school commute. The residential structure also means many GD Goenka World students stay back through Saturday afternoons; we run weekend morning blocks (Saturday and Sunday 10 AM–12 PM IST) as one of our most popular slots for this cohort.",
    ],
    reputationBullets: [
      'Founded mid-2000s — among the longer-running full-continuum IB schools in north India',
      'IB Continuum: PYP + MYP + DP',
      'Residential + day campus on Sohna Road, south Gurugram',
      'IB Biology HL and SL with full Section 6 practical coverage',
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
        question: 'My child is a boarder at GD Goenka World School — can they join live tutoring sessions from the boarding house?',
        answer:
          "Yes, this is a common pattern in our roster. Sessions are 100% online live video and can be joined from any quiet space with a reliable internet connection — the boarding house study halls and dorm rooms typically work fine. Our IST evening sessions at 7–9 PM fit cleanly into the school's boarding study-hall schedule, and we provide session recordings for review during the next day's study time. Many GD Goenka World boarders prefer our weekend morning blocks (Saturday and Sunday 10 AM–12 PM) which sit naturally in the boarding-house weekend rhythm without competing with weekday classroom load.",
      },
      {
        question: "How does GD Goenka World School's IB Biology compare to Pathways Aravali — both are full IB Continuum schools in Gurugram?",
        answer:
          "Both schools run full PYP + MYP + DP IB Continuums and both have substantial DP Biology cohorts. Differences are in campus model and pedagogical character: GD Goenka World is residential-plus-day on a large Sohna campus; Pathways Aravali is also residential-plus-day but is positioned differently within the IB landscape, with its own pedagogical identity. Both schools produce competitive DP Biology scores. The decision between them for families is usually about school culture fit, residential preferences, and faculty cohort — not the IB Biology programme specifically. Our coaching adapts to either profile; we have students from both schools.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for GD Goenka World School students?',
        answer:
          "Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. GD Goenka World IB Biology HL students who want to preserve both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options can pursue the dual IB+NEET pathway. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule that fits the school's term calendar.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. India-resident families pay in INR; international family options available for boarders from neighbouring countries paying in USD.',
      },
      {
        question: "Sohna Road from central Gurgaon is a 40–60 minute peak-hour commute — does that affect tutoring if my child is a day student at GD Goenka World?",
        answer:
          "Not at all — coaching is 100% online live video, so the school commute itself doesn't add a second commute for tutoring. Day students arrive home from GD Goenka World in the 5–7 PM window depending on Sohna Road traffic, eat, and join the IST evening live session at 7 PM or the slightly later 8 PM slot we keep for the longer-commute cohort. Sessions run 90 minutes. The no-commute tutoring model returns 60–90 minutes per session compared to driving to a Cyber City or MG Road tutoring centre — meaningful over a year of weekly sessions.",
      },
      {
        question: 'When should a GD Goenka World student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For IB+NEET students, ideally earlier (during Grade 10 / MYP5) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have several GD Goenka World students each cohort who join then specifically for Paper 2 + Paper 3 rubric drilling in the run-up to May exams.",
      },
      {
        question: 'How does the IST timezone match matter for GD Goenka World families compared to overseas IB tutors?',
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
      'IB Biology HL and SL with full Section 6 practical coverage',
      'Distinctively traditional-and-cultural identity vs newer progressive IB schools',
    ],
    collegeContext:
      "Shikshantar IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Northwestern, public flagships), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU), and Indian universities (Ashoka, Krea, Shiv Nadar, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from Shikshantar most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical / biotechnology programmes. A subset of Shikshantar's Biology HL students continue music or performing arts as a parallel undergraduate interest, which produces an unusual share of cross-applications to US liberal arts colleges (Williams, Amherst, Brown, Wesleyan) where the dual-academic-and-arts profile reads strongly.",
    paceAlignment:
      "Shikshantar's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the central-Gurgaon Sector 31 school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The DP1 coaching includes an explicit CBSE-Class-10-to-IB-DP bridge so the assessment-style shift doesn't catch students off-guard. IA mentorship aligns to the school's DP1 IA proposal deadlines and the November DP2 mock exam window. Schedule flexibility for students continuing music or performing arts training is built into our slot allocation.",
    faqs: [
      {
        question: "My child finished Shikshantar's CBSE Class 10 with strong Biology marks — what changes when they start IB Biology HL at DP1?",
        answer:
          "Three things change. First, the assessment shifts: CBSE Class 10 prioritises content recall and standardised-answer structures, while IB DP Paper 2 rewards data-analysis-and-evaluation style writing — students learn the IB-specific command terms (\"explain\", \"evaluate\", \"discuss\") and the long-response mark scheme. Second, the Internal Assessment adds a 10-hour personal-investigation worth 20 percent of the final grade — CBSE Class 10 has nothing equivalent. Third, the syllabus depth in selected topics (especially cell biology, genetics, and physiology) goes meaningfully beyond CBSE Class 10. Our DP1 coaching makes all three transitions explicit in the first term.",
      },
      {
        question: "Does my child's parallel music or performing-arts training conflict with IB Biology tutoring scheduling?",
        answer:
          "No — and this is a common pattern in our Shikshantar roster. Many Shikshantar IB students continue serious music or performing-arts training alongside their academics, with rehearsals or classes typically in late-afternoon or early-evening slots. We schedule live tutoring around those commitments — IST evening sessions can move to the 8 PM or 9 PM slot, and weekend morning blocks (Saturday 10 AM–12 PM) are often the cleanest fit for students whose weekday evenings are committed to rehearsals. Schedule flexibility is built into how we allocate slots; the music or performing-arts commitment does not have to be sacrificed for IB Biology coaching.",
      },
      {
        question: "Shikshantar's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group hurt my child's IB Biology results?",
        answer:
          "Not directly — IB exam grading is criterion-referenced against the same global rubric every year, regardless of in-school cohort size. What can be thinner at a CBSE-primary school is the peer-driven rubric awareness that students at larger single-curriculum IB schools (Pathways Aravali, GD Goenka World) absorb partly through cohort-density-driven peer benchmarking. Our 1:1 coaching replaces that peer calibration with explicit weekly written feedback on long-response answers against the IB Biology mark scheme. Many Shikshantar IB students score competitively despite the smaller in-school IB cohort.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Shikshantar students?',
        answer:
          'Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. Several Shikshantar IB Biology HL students each cohort pursue the dual IB+NEET pathway because the school\'s CBSE-rooted identity means household conversations about medical college often default to AIIMS and Indian state medical colleges as a valued option even when the abroad track is the primary planned route. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule that respects the music or performing-arts commitments many Shikshantar students maintain.',
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. Shikshantar families typically pay in INR with payment plans across 3–4 instalments.',
      },
      {
        question: "My child is choosing between Shikshantar's CBSE Class 11–12 and the school's IB DP track — which is better for medicine applications?",
        answer:
          "Depends on the target country. For UK medicine, IB is well-received and reads strongly when paired with HL Biology + HL Chemistry. For US pre-med, IB is the cleaner transcript signal — US admissions officers parse IB more fluently than CBSE. For Canada / Australia, IB works well. For India (AIIMS / state medical via NEET), CBSE is the more direct route because NEET-eligibility and the Class 12 board-exam framework are CBSE-aligned. Dual-application students who want both options can pursue IBDP at Shikshantar and add NEET via our IB+NEET integrated track. We'll be straight with you about which path best fits your application target — not every Shikshantar IB student needs the dual track.",
      },
      {
        question: 'When should a Shikshantar student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the CBSE-to-IB bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have several Shikshantar students each cohort who join then specifically for Paper 2 + Paper 3 rubric drilling in the run-up to May exams.",
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
      "GD Goenka Signature offers IB Biology HL and SL with full Section 6 (Practical Programme) coverage. The IB cohort is smaller than the school's CBSE cohort because the senior school runs both tracks in parallel and many families continue on CBSE. Students choosing IB are typically self-selecting toward US, UK, Canadian, or Australian university applications — and the school's brand recognition from the broader GD Goenka network produces strong India-university connections for dual-application students who want to keep AIIMS / state medical colleges open via NEET.",
      "For GD Goenka Signature IB Biology students, the most common driver of external tutoring is the parallel-track context: because Signature runs IB alongside CBSE in senior school, the in-school IB-rubric peer benchmarking is thinner than at single-curriculum IB schools (Pathways Aravali, UWCSEA). Our 1:1 coaching replaces that with explicit weekly written feedback on Paper 2 long-response answers against the IB mark scheme. Several Signature IB Biology HL students each cohort also pursue our integrated IB+NEET track because the central-Gurgaon family profile often values keeping both abroad and India medical-college routes open through Class 12.",
    ],
    reputationBullets: [
      'Opened mid-2010s — newer day-only campus in the GD Goenka network',
      "'Signature' branding distinguishes premium IB/IGCSE campuses within the broader GD Goenka group",
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11-12',
      'Located in Sector 48 Gurgaon (central-south Gurgaon, Sohna Road side)',
      'Day school (not residential) — sister GD Goenka World at Sohna is residential',
      'IB Biology HL and SL with full Section 6 practical coverage',
    ],
    collegeContext:
      "GD Goenka Signature IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Northwestern, public flagships), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from Signature most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical / biotechnology programmes. The central-Gurgaon working-professional family profile often produces strong dual-application interest — both abroad and India options kept open through Class 12.",
    paceAlignment:
      "GD Goenka Signature's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7-9 PM is most common, fitting after the Sector 48 day-school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. IA mentorship aligns to the school's DP1 IA proposal deadlines and the November DP2 mock exam window. The DP1 coaching can include an explicit prior-curriculum-to-IB-DP bridge for students who transitioned into the IB track from a CBSE Class 10 background.",
    faqs: [
      {
        question: "Is GD Goenka Signature different from GD Goenka World School? My friends mention both as Gurgaon IB options.",
        answer:
          "Yes — they're sister campuses within the broader GD Goenka network, but they're structurally different schools with distinct cohort profiles. GD Goenka World School is in Sohna (significantly further south) and runs a residential + day model with a full IB Continuum (PYP + MYP + DP) — many of its boarders come from across India and from neighbouring countries. GD Goenka Signature is in Sector 48 (more central, Sohna Road side) and is day-only with IB DP + CBSE dual-track senior school. Day families based in DLF, Sushant Lok, or Golf Course Road typically find Signature more accessible; families wanting boarding or full PYP-through-DP go to the World School. Both are part of the GD Goenka brand network.",
      },
      {
        question: 'My child is choosing between Signature\'s IB DP and CBSE tracks at senior school — which is better for medicine applications?',
        answer:
          "Depends on the target country. For UK medicine, IB is well-received and reads strongly when paired with HL Biology + HL Chemistry. For US pre-med, IB is the cleaner transcript signal — US admissions officers parse IB more fluently than CBSE. For Canada / Australia, IB works well. For India (AIIMS / state medical via NEET), CBSE is the more direct route because NEET-eligibility and the Class 12 board-exam framework are CBSE-aligned. Dual-application students can pursue IBDP at Signature and add NEET via our IB+NEET integrated track. We'll be straight with you about which path best fits your application target.",
      },
      {
        question: "Signature's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group affect IB Biology results?",
        answer:
          "Not directly — IB exam grading is criterion-referenced against the same global rubric every year, regardless of in-school cohort size. What can be thinner at a parallel-curriculum school is the peer-driven rubric awareness that students at larger single-curriculum IB schools (Pathways Aravali, GD Goenka World) absorb partly through cohort-density-driven peer benchmarking. Our 1:1 coaching replaces that with explicit weekly written feedback on long-response answers against the IB Biology mark scheme. The result is rubric-tight Paper 2 answers regardless of in-school IB cohort size.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for GD Goenka Signature students?',
        answer:
          "Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. Several Signature IB Biology HL students each cohort pursue the dual IB+NEET pathway because the central-Gurgaon working-professional family profile often values keeping both abroad and India medical-college options open. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule that fits the school's term calendar and the day-student commute window.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000-₹98,000 per year for the complete integrated programme. Signature families typically pay in INR with payment plans across 3-4 instalments.',
      },
      {
        question: "Sector 48 to Cyber City / MG Road tutoring centres is a 25-40 minute peak-hour drive — does that affect tutoring scheduling?",
        answer:
          "Not at all — coaching is 100% online live video, so there is no physical tutoring-centre commute. Your child arrives home from Signature (typically between 4:30 and 6 PM depending on Sector 48 traffic), eats, and joins the IST evening live session at 7 PM. Sessions run 90 minutes. The no-commute model returns roughly 50-80 minutes per session compared to driving to a Cyber City or MG Road tutoring centre — meaningful over a year of weekly sessions, especially for working-professional families coordinating around their own commutes.",
      },
      {
        question: 'When should a GD Goenka Signature student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have several Signature students each cohort who join then specifically for Paper 2 + Paper 3 rubric drilling in the run-up to May exams.",
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
      "Pathways School Noida is a co-educational day school in Sector 100 Noida, opened in the early 2010s as the Noida campus of the Pathways group (sister to Pathways World School Aravali in Gurgaon and Pathways School Gurgaon in Sector 70). The school runs a full IB Continuum — PYP, MYP, and DP — making it one of the longer-established full-continuum IB day schools in the Noida cluster. The Sector 100 location keeps it accessible to families across Sectors 44, 50, 62, 75, 93, 100, 121, 128, and 132, as well as to families coming over the DND Flyway from the Mayur Vihar and IP Extension belt of east Delhi.",
      "Pathways Noida's IB Biology cohort is one of the more substantial Noida-region DP Biology cohorts. Both HL and SL are offered, with full Section 6 (Practical Programme) coverage. The Biology department is staffed by IB-experienced teachers and the school's laboratory facilities support the full IB practical programme. Recent diploma performance has read as competitive within the NCR IB cluster per the school's publicly-reported results, though Pathways group schools tend not to publish per-subject IB Biology distributions in granular form.",
      "For Pathways Noida students, the most common drivers of external IB Biology tutoring are: (1) Paper 2 long-response rubric calibration where strong classroom answers can still drop marks against the IB's specific mark scheme, (2) IA mentorship through the DP1 topic-selection cycle, and (3) the integrated IB+NEET track — a meaningful share of Pathways Noida families want to keep India medical-college options open via NEET while pursuing IB Diploma for abroad applications. Our coaching combines Paper 2 + IA rubric work with the integrated IB+NEET schedule for the dual-application cohort.",
      "Pathways Noida's day-only structure (no boarding option, unlike the Aravali sister campus) shapes scheduling. Day students typically arrive home from Sector 100 in the 4:30–6 PM window depending on the home-sector and Noida-internal traffic, and our IST evening live sessions at 7–9 PM fit cleanly into the post-school routine. For IB+NEET integrated students we also offer weekend morning blocks (Saturday and Sunday 10 AM–12 PM) which sit naturally for the dual-syllabus weekly load. The Sector 100 location is far enough from the DND-Flyway-to-South-Extension axis that physical commute to any Delhi-side tutoring centre would add 75–90 minutes round-trip in peak hours — the online-delivery model removes that overhead entirely.",
    ],
    reputationBullets: [
      'Opened early 2010s — Noida campus of the broader Pathways group',
      'Full IB Continuum: PYP + MYP + DP',
      'Sister campuses: Pathways World School Aravali (Gurgaon, residential + day) and Pathways School Gurgaon (Sector 70, day-only)',
      'Located in Sector 100 Noida (central-east Noida residential belt)',
      'IB Biology HL and SL with full Section 6 practical coverage',
      'Day school (no boarding option — Aravali sister campus is the residential option)',
      'Strong NCR-cluster matriculation to UK, US, Canadian, Australian, and Indian universities',
    ],
    collegeContext:
      "Pathways Noida IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Michigan, Northwestern, UCLA, public flagships), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar — note: distinct from the school of the same name in Noida — Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from Pathways Noida most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical / biotechnology programmes. The Noida tech-corridor family profile produces an unusually-high share of dual-application interest — keeping both abroad and India options open through Class 12.",
    paceAlignment:
      "Pathways Noida follows the standard two-year DP cycle on the IB May exam timeline. IST timezone aligns directly with our India-based live tutoring schedule — a structural advantage over UK / US / Canada-based IB tutors operating in mismatched timezones. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the Sector 100 school commute) or weekend morning blocks. For IB+NEET integrated students, we run a combined weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. IA mentorship aligns to the school's DP1 IA proposal deadlines and the November DP2 mock exam window.",
    faqs: [
      {
        question: 'Is Pathways Noida the same as Pathways Aravali — the IB school in Gurgaon? My friends mention both.',
        answer:
          "They're sister campuses within the broader Pathways group but they're structurally different schools. Pathways World School Aravali is in Sector V-37 Gurgaon (Aravali range, south Gurgaon) and runs a residential + day model — boarders come from across India and from neighbouring countries. Pathways School Noida is in Sector 100 Noida and is day-only — local NCR families predominate. Both run full PYP+MYP+DP IB Continuums with the same pedagogical framework and overlapping faculty network. Day families based in Noida (Sectors 44/50/62/93/100/128/132 + Greater Noida) typically find Pathways Noida more accessible; families wanting boarding go to Aravali; families based in central or south Gurgaon often choose Pathways School Gurgaon (Sector 70). We coach students from all three Pathways campuses.",
      },
      {
        question: "How does Pathways Noida's IB Biology compare to the other Noida IB schools — Shiv Nadar, Step by Step, Genesis Global?",
        answer:
          "All four schools run rigorous IB Biology HL and SL programmes. Differences are in pedagogical character, cohort size, and curriculum mix: Pathways Noida is a long-established full IB Continuum (PYP through DP); Shiv Nadar is a newer school (tech-philanthropist-founded) with strong scientific orientation; Step by Step has the longest senior-school IB track record in the NCR; Genesis Global is residential + day in Greater Noida. None of these school differences predict an individual student's IB Biology score — that depends on engagement and the rubric calibration the student gets. Our coaching adapts to each school's profile; we have students from all four.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Pathways Noida students?',
        answer:
          "Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. A meaningful share of Pathways Noida Biology HL students pursue the dual IB+NEET pathway because the Noida tech-corridor family profile values keeping both abroad (UK medicine, US pre-med, Canadian life-sciences) and India (AIIMS, state medical college) options open through Class 12. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule. The integrated programme is structurally the same as we run for Pathways Aravali students.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          "IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. India-resident Noida families pay in INR; USD pricing available for international payment preferences. GST-compliant invoices issued for corporate-reimbursement claims (common for Noida-based MNC IT-employee families).",
      },
      {
        question: 'Sector 100 to DND Flyway to South Extension is a 75–90 minute peak-hour drive — does that affect tutoring scheduling?',
        answer:
          "Not at all — coaching is 100% online live video, so there is no physical tutoring-centre commute. Your child arrives home from Pathways Noida (typically between 4:30 and 6 PM depending on Sector 100 and inter-sector traffic), eats, and joins the IST evening live session at 7 PM. Sessions run 90 minutes. The no-commute model returns roughly 90 minutes per session compared to driving across the DND Flyway to any Delhi-side tutoring centre — a meaningful saving over a year of weekly sessions, especially for families coordinating around dual-working-parent IT-corridor schedules.",
      },
      {
        question: 'When should a Pathways Noida student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For IB+NEET students, ideally earlier (during Grade 10 / MYP5) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have several Pathways Noida students each cohort who join then specifically for Paper 2 + Paper 3 rubric drilling in the run-up to May exams.",
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
      "Shiv Nadar School Noida runs CBSE as its primary curriculum through Class 10 and offers the IB Diploma Programme as the senior-school international option at Classes 11–12 alongside the CBSE Class 11–12 continuation track. Cambridge IGCSE / A-Level options are also available at some senior-school cohorts. IB Biology HL and SL are both offered with full Section 6 (Practical Programme) coverage; the school's laboratory infrastructure and emphasis on hands-on STEM exploration give the Biology programme a strong investigation-and-data orientation that aligns well with the IB's IA-and-Paper-2 assessment style.",
      "For Shiv Nadar School Noida IB Biology students, the most common drivers of external tutoring are: (1) Paper 2 rubric calibration where the school's strong conceptual culture sometimes produces answers that are scientifically sound but score below their potential against the IB's specific long-response mark scheme, and (2) IA mentorship — the school's STEM-strong culture produces students who genuinely enjoy designing personal investigations, but the IA write-up against the IB-specific four-criterion rubric benefits from explicit external coaching. Several Shiv Nadar IB Biology HL students each cohort also pursue our integrated IB+NEET track for the standard dual-application reasons.",
      "Shiv Nadar School Noida's Sector 168 location keeps it accessible across the Noida residential belt, though Sector 168 is on the eastern Yamuna Expressway side rather than the central Noida sectors that house most of the other IB schools (Pathways at Sector 100, Lotus Valley further west). Many Shiv Nadar families commute from across the broader Noida and Greater Noida footprint, and the school operates a transport network that extends to Sectors 50, 62, 75, 93, 100, 128, 132 and Greater Noida. For our coaching, the school commute is irrelevant — IST evening live sessions at 7–9 PM fit after the school day regardless of which Noida sector students live in.",
    ],
    reputationBullets: [
      'Founded under the Shiv Nadar Foundation (philanthropic arm of HCL Technologies founder)',
      'Opened early 2010s — first of three Shiv Nadar School campuses (Noida / Gurgaon / Faridabad)',
      'CBSE primary curriculum + IB DP at senior school',
      'STEM-and-leadership-strong educational philosophy reflecting founder\'s industrial-scientific roots',
      'Located in Sector 168 Noida (eastern Yamuna Expressway side)',
      'IB Biology HL and SL with full Section 6 practical coverage',
      'Strong laboratory infrastructure for hands-on scientific investigation',
    ],
    collegeContext:
      "Shiv Nadar School Noida IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Michigan, Carnegie Mellon, Northwestern, MIT for the STEM-leaning subset, public flagships), Canada (Toronto, UBC, McGill, Waterloo for the engineering-leaning subset, Western, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar University in Greater Noida — note: a distinct institution from the school, both founded by the Shiv Nadar Foundation — Plaksha IIT, IIITs, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from Shiv Nadar School Noida most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, biomedical / biotechnology programmes, or interdisciplinary STEM tracks combining biology with computer science or data science (a natural fit for the school's STEM identity).",
    paceAlignment:
      "Shiv Nadar School Noida follows the standard two-year DP cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the school day regardless of which Noida sector students live in — the school's transport network spans Sectors 50/62/75/93/100/128/132 + Greater Noida) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. IA mentorship aligns to the school's DP1 IA proposal deadlines. The STEM-strong culture at Shiv Nadar means many students approach the IA as a genuine scientific investigation rather than a tick-box exercise; our coaching adds the rubric scaffolding that converts good investigation into high-scoring write-up.",
    faqs: [
      {
        question: "Shiv Nadar School Noida is STEM-strong with strong lab facilities — does my child really need external IB Biology tutoring?",
        answer:
          "The honest answer depends on the target score. For an AP-4-equivalent target (IB Biology HL score 6), the school's in-house teaching is typically sufficient for engaged students. For an IB-7 target — required for top UK medical schools, US pre-med at Ivies, or competitive Canadian biosciences — the gap is usually rubric mastery: converting strong conceptual understanding into the precise IB Paper 2 long-response mark-scheme structure. The school's STEM-strong culture produces conceptually fluent students; our 1:1 coaching adds the specific rubric calibration that takes a 6 to a 7. Several Shiv Nadar Noida students each cohort use us specifically for this rubric layer alongside the school's strong in-house teaching.",
      },
      {
        question: 'Is Shiv Nadar School Noida the same as Shiv Nadar University (also in Greater Noida)?',
        answer:
          "They're related but distinct institutions, both founded under the Shiv Nadar Foundation. Shiv Nadar School Noida is a co-educational K-12 day school in Sector 168 with CBSE primary + IB DP senior options. Shiv Nadar University (formally Shiv Nadar Institution of Eminence) is an independent private research university in Dadri, Greater Noida (NH-9 / Yamuna Expressway corridor) offering undergraduate and graduate degrees. Several Shiv Nadar School graduates do matriculate to Shiv Nadar University, but the institutions operate as separate entities with separate admissions processes and academic structures.",
      },
      {
        question: 'How does Shiv Nadar School Noida compare to Pathways School Noida for IB Biology?',
        answer:
          "Both run rigorous IB Biology HL and SL programmes. Pathways Noida is a longer-established full IB Continuum (PYP through DP) with a more international-from-inception cohort culture; Shiv Nadar is CBSE-primary with IB DP added at senior school and has a more STEM-strong, leadership-oriented identity that reflects the founder's tech-industry roots. The IB Biology programmes are comparable in quality; the school cultures are genuinely different. Cohort sizes vary year to year. We have students from both schools — they're complementary positioning rather than competing on the IB Biology dimension specifically.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Shiv Nadar School Noida students?',
        answer:
          "Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. Several Shiv Nadar Noida IB Biology HL students each cohort pursue the dual IB+NEET pathway because the STEM-strong school culture produces students who are realistically considering both medical school in India (AIIMS, state medical colleges) and abroad (UK medicine, US pre-med, Canadian life-sciences). We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule that respects the school's STEM-rigour academic load.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. Shiv Nadar Noida families typically pay in INR with payment plans across 3–4 instalments; GST-compliant invoices issued for corporate-reimbursement claims (common for Noida-based MNC IT-employee families, including HCL Technologies employees).',
      },
      {
        question: "Sector 168 is on the Yamuna Expressway side — does that affect tutoring scheduling for my child?",
        answer:
          "Not at all — coaching is 100% online live video, so the school's eastern-Noida location doesn't add any commute overhead for tutoring. Your child arrives home via the school's transport network (which extends across Sectors 50/62/75/93/100/128/132 and Greater Noida) and joins the IST evening live session at 7 PM. Sessions run 90 minutes. For students whose families are based further east on the Yamuna Expressway corridor (where commute to any Delhi-side or central-Noida tutoring centre would be 60+ minutes round-trip), the online-delivery model is structurally the right choice.",
      },
      {
        question: 'When should a Shiv Nadar School Noida student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. The school's STEM-strong Class 10 already builds strong scientific foundations; our IB+NEET coaching layers the NEET-specific content and the IB-specific rubric work on top. For exam-only coaching, October DP2 (after the school's mocks) is still effective and several Shiv Nadar Noida students each cohort join then for Paper 2 + Paper 3 rubric drilling.",
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
      "Step by Step's IB DP cohort has historically been one of the longer-running in the Noida IB cluster — meaningfully predating the newer entrants (Pathways Noida early-2010s, Shiv Nadar Noida 2012). Both IB Biology HL and SL are offered, with full Section 6 (Practical Programme) coverage. The Biology department is staffed by IB-experienced teachers, and the school's emphasis on careful pedagogy and student wellbeing produces an IB cohort culture that is academically serious without being burnout-driven.",
      "For Step by Step IB Biology students, the most common driver of external tutoring is the parallel-curriculum context: because Step by Step runs IB alongside CBSE in senior school, the in-school IB-rubric peer benchmarking is thinner than at single-curriculum IB schools (Pathways Aravali, UWCSEA). Our 1:1 coaching replaces that with explicit weekly written feedback on Paper 2 long-response answers against the IB mark scheme. Several Step by Step IB Biology HL students each cohort also pursue our integrated IB+NEET track because the school's broader student body (with its strong CBSE cohort matriculating to Indian universities and AIIMS) creates a cultural context where keeping the India medical-college option open is naturally considered.",
      "Step by Step's Sector 132 location places it on the Noida-Greater Noida Expressway corridor — a different commute axis from the central-Noida schools (Pathways at Sector 100) and the eastern-Noida cluster (Shiv Nadar at Sector 168). The school operates a transport network reaching across Sectors 50, 62, 75, 93, 100, 128, 132 and Greater Noida. Many Step by Step IB families commute from across this broader belt, and our IST evening live sessions at 7–9 PM fit cleanly after the school day regardless of which Noida sector students live in. The online-delivery model removes any concern about cross-sector physical commute to a tutoring centre.",
    ],
    reputationBullets: [
      'Founded mid-1990s — one of the longer-established schools in the Noida IB cluster',
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11–12',
      'Located in Sector 132 on the Noida–Greater Noida Expressway',
      'Strong reputation for academics combined with pastoral care and student wellbeing',
      'IB Biology HL and SL with full Section 6 practical coverage',
      'Among the longer-running IB DP cohorts in Noida (predates Pathways Noida and Shiv Nadar Noida)',
    ],
    collegeContext:
      "Step by Step IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Northwestern, public flagships), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar University, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from Step by Step most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical / biotechnology programmes. The dual-curriculum senior school context produces an unusually wide range of matriculation destinations — IB students go primarily abroad while their CBSE schoolmates stay in India via AIIMS/IIT/AIIMS-equivalent processes, and the IB+NEET dual-track subset within the IB cohort spans both.",
    paceAlignment:
      "Step by Step's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the Noida-Greater Noida Expressway school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The school's careful-pedagogy culture means many Step by Step IB students arrive at DP1 with strong study habits and pastoral support already in place; our coaching adds the IB-specific rubric layer that the parallel-curriculum context structurally leaves thinner.",
    faqs: [
      {
        question: "Step by Step has had IB DP for years — does the long-established status mean my child doesn't need external IB Biology coaching?",
        answer:
          "Long IB track record at a school is a real positive — it usually means stable IB-experienced teaching staff, clear IA submission processes, and well-developed mock exam culture. What it doesn't automatically solve is the individual-student gap between in-school Paper 2 attempts and the precise IB long-response mark-scheme. Our 1:1 coaching provides weekly written feedback against the rubric on practice Paper 2 answers, which the in-school class doesn't have bandwidth to do at that frequency. The school's IB experience and our coaching are complementary — we have several Step by Step IB Biology students each cohort using exactly this combination.",
      },
      {
        question: "How does Step by Step's IB Biology compare to Pathways Noida and Shiv Nadar Noida?",
        answer:
          "Three different positioning profiles. Step by Step is the longest-established (mid-1990s founding, longer IB track record), dual-track senior school (IB + CBSE in parallel), strong pastoral-care culture. Pathways Noida is the international-from-inception full IB Continuum (PYP through DP). Shiv Nadar Noida is STEM-strong with founder's tech-industry identity. The IB Biology programmes are comparable in quality; the school cultures differ. None of these school differences predict an individual student's IB Biology score — that depends on engagement and rubric calibration. Our coaching adapts to each school's profile; we have students from all three.",
      },
      {
        question: "Step by Step runs IB DP and CBSE in parallel at Class 11-12 — does the parallel-curriculum context affect IB Biology results?",
        answer:
          "The cohort size on the IB track at Step by Step is smaller than at single-curriculum IB schools (Pathways Aravali, UWCSEA). What this means in practice is that peer-driven rubric awareness — what students at larger IB cohorts absorb partly through cohort-density-driven peer benchmarking — is structurally thinner. Our 1:1 coaching fills that gap with explicit weekly written feedback on long-response answers against the IB Biology mark scheme. The result is rubric-tight Paper 2 answers regardless of in-school IB cohort size. Several Step by Step IB Biology HL students score competitively despite the smaller in-school IB peer group.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Step by Step students?',
        answer:
          "Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. Several Step by Step IB Biology HL students each cohort pursue the dual IB+NEET pathway. The dual-curriculum senior-school context at Step by Step (IB + CBSE in parallel) creates a cultural environment where the India medical-college path is naturally considered — many Step by Step IB families have extended-family connections to the school's CBSE cohort and the AIIMS/NEET track. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. Step by Step families typically pay in INR with payment plans across 3–4 instalments; GST-compliant invoices issued for corporate-reimbursement claims (common for Noida-based MNC IT-employee families).',
      },
      {
        question: 'My child is at Step by Step CBSE Class 10 and considering switching to IB DP for senior school — what should we factor in?',
        answer:
          "Two factors matter most. First, the application target: IB is the cleaner signal for US / UK / Canada / Australia universities; CBSE is the more direct route for Indian universities and NEET-track medical school. Second, the assessment-style shift: CBSE Class 10 prioritises content recall and standardised-answer structures; IB DP Paper 2 rewards data-analysis-and-evaluation writing — a real shift that needs explicit DP1 first-term work. Dual-application students who want both options open can pursue IBDP at Step by Step and add NEET via our IB+NEET integrated track. We'll be straight about which path fits your application target.",
      },
      {
        question: 'When should a Step by Step student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window and includes an explicit CBSE-Class-10-to-IB-DP bridge for students transitioning from the school's CBSE track. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have Step by Step students each cohort who join then for focused Paper 2 + Paper 3 rubric drilling.",
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
      "Genesis Global School is a co-educational residential and day IB World School on the Noida–Greater Noida Expressway, opened in the mid-to-late 2000s as one of the relatively few residential international schools in the Delhi NCR region. The school runs a full IB Continuum — PYP, MYP, and DP — alongside CBSE as a parallel curriculum option, and the residential cohort draws boarders from across India and from a small number of neighbouring countries. Day students commute primarily from the broader Noida residential belt (Sectors 50, 62, 75, 93, 100, 128, 132) and from Greater Noida itself.",
      "Genesis Global is structurally the Noida-cluster equivalent of Pathways Aravali / GD Goenka World in the Gurgaon cluster — the residential IB option that gives families a boarding choice within an India IB World School. Both IB Biology HL and SL are offered, with full Section 6 (Practical Programme) coverage. The school's boarding-house infrastructure includes academic support and evening study halls, which the IB Biology cohort uses for both prescribed homework and (when families opt in) external 1:1 tutoring sessions.",
      "For Genesis Global IB Biology students, the most common drivers of external tutoring are the same as at the other major IB schools: Paper 2 long-response rubric calibration, IA mentorship through the DP1 topic-selection cycle, and — for the dual-application subset — the integrated IB+NEET track. The residential context adds one additional factor: IST timezone is the natural match for India-based tutors, which means our IST evening live sessions at 7–9 PM fit cleanly into the school's boarding study-hall schedule, without the awkward late-night-IST timing that boarders would experience with UK or US-based tutors operating into the evening of their own local timezone.",
      "Genesis Global's Noida–Greater Noida Expressway location is south-east of the central Noida sectors and meaningfully east of central Delhi. For day students commuting from across the Noida residential belt, the school's transport network spans most of the Sector 50–132 footprint plus Greater Noida. For boarders, the campus is the student's primary location through term — and our online live tutoring removes any concern about boarders being structurally distant from physical tutoring centres in Delhi or central Gurgaon. Coaching is delivered into the boarding house or study hall via laptop and headphones; many Genesis boarders join Saturday morning weekend blocks (10 AM–12 PM IST) as one of our most popular slots for the cohort.",
    ],
    reputationBullets: [
      'Opened mid-to-late 2000s — among the longer-running residential IB schools in NCR',
      'Full IB Continuum: PYP + MYP + DP',
      'Co-educational residential + day school',
      'Located on the Noida–Greater Noida Expressway',
      'The Noida-cluster residential IB option (most other Noida IB schools are day-only)',
      'IB Biology HL and SL with full Section 6 practical coverage',
      'Boarding cohort from across India and a small number of neighbouring countries',
    ],
    collegeContext:
      "Genesis Global IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester, Bristol), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Northwestern, public flagships), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar University, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from Genesis Global most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical / biotechnology programmes. The residential cohort context produces an unusually-strong UCAS-application familiarity from boarding-house application-coaching culture, similar to the dynamic at Pathways Aravali and GD Goenka World.",
    paceAlignment:
      "Genesis Global follows the standard two-year DP cycle. IST timezone aligns directly with our India-based live tutoring schedule — a critical structural advantage over UK / US / Canada-based IB tutors operating in mismatched timezones, especially for boarding students whose study-hall schedules are fixed in IST. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting both day-student post-commute and boarder study-hall windows) or weekend morning blocks (Saturday/Sunday 10 AM–12 PM is popular among boarders). For IB+NEET integrated students, we run a combined weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. IA mentorship aligns to the school's DP1 IA proposal deadlines and the November DP2 mock exam window.",
    faqs: [
      {
        question: 'My child is a boarder at Genesis Global — can they join live tutoring sessions from the boarding house?',
        answer:
          "Yes, this is a common pattern in our Genesis Global roster. Sessions are 100% online live video and can be joined from any quiet space with a reliable internet connection — the boarding house study halls and dorm rooms typically work fine. Our IST evening sessions at 7–9 PM fit cleanly into the school's boarding study-hall schedule, and we provide session recordings for review during the next day's study time. Many Genesis Global boarders prefer our weekend morning blocks (Saturday and Sunday 10 AM–12 PM) which sit naturally in the boarding-house weekend rhythm without competing with weekday classroom load.",
      },
      {
        question: "How is Genesis Global different from Pathways Noida, Shiv Nadar Noida, and Step by Step — the other major Noida IB schools?",
        answer:
          "Genesis Global is the residential option in the Noida IB cluster; Pathways Noida, Shiv Nadar, and Step by Step are all day-only. For families specifically wanting boarding (whether for child-development reasons, parent-travel reasons, or because the family is based outside the Delhi NCR commute belt), Genesis is the natural choice within the Noida footprint. For day-only families, all four schools are viable IB options with different pedagogical profiles — Pathways for international-from-inception full Continuum, Shiv Nadar for STEM-strong identity, Step by Step for longest IB track record, Genesis for the residential + day model. The IB Biology programmes are comparable in quality; the choice between them is driven by school culture fit and residential preferences.",
      },
      {
        question: 'Is Genesis Global similar to Pathways Aravali in Gurgaon — both are residential IB schools in NCR?',
        answer:
          "Structurally similar (both residential + day, both full IB Continuum), but located on opposite sides of NCR — Pathways Aravali sits south of Gurgaon on the Aravali range; Genesis Global sits south-east of Noida on the Noida–Greater Noida Expressway. Families typically choose between them based on home-region (Gurgaon families pick Aravali; Noida and east-Delhi families pick Genesis; out-of-NCR boarding families weigh both based on travel logistics from their home city). The IB Biology programmes are comparable at both. We coach students from both schools and the coaching framework is essentially identical.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Genesis Global students?',
        answer:
          "Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. Several Genesis Global IB Biology HL students each cohort pursue the dual IB+NEET pathway. Boarding students particularly benefit from the integrated weekly schedule because the boarding-house study-hall structure can accommodate a longer-and-more-structured weekly tutoring load than typical day-student schedules. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single schedule that fits the school's term calendar and the boarding study-hall windows.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. India-resident families pay in INR; international family options available for boarders from neighbouring countries paying in USD.',
      },
      {
        question: "How does the IST timezone match matter for Genesis Global boarders compared to overseas-based IB tutors?",
        answer:
          "It matters more than parents initially expect. Overseas-based IB tutors (UK, US, Canada) operating into India are usually awake during their own daytime, which is the middle of the night in India. They schedule sessions in awkward early-morning or late-night IST slots that compete with school sleep or homework — especially difficult for boarders whose study-hall windows are fixed in IST. Our IST-based tutors run their full schedule in India local time: your child's 7 PM IST evening is our tutor's 7 PM working evening, with no fatigue or timezone-shift compromise. The IST-match is a structural advantage of choosing India-based IB tutors for an India-based residential school.",
      },
      {
        question: 'When should a Genesis Global student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the IA mentorship window. For IB+NEET students, ideally earlier (during Grade 10 / MYP5) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective. Several Genesis boarders each cohort join then specifically for Paper 2 + Paper 3 rubric drilling in the run-up to May exams, often using the school's weekend study-hall slots as the live-session window.",
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
      "Lotus Valley International School Noida is a co-educational day school in Sector 126 Noida, opened in the late 2000s as one of the newer-generation international schools serving the rapidly-growing Noida residential belt. The school runs CBSE as its primary curriculum through Class 10 and offers the IB Diploma Programme as a senior-school international option at Classes 11–12 alongside the continuing CBSE Class 11–12 track. This dual-track senior-school structure is common across the Noida IB cluster (Step by Step, Shiv Nadar) and reflects the typical Noida-family pattern of weighing both Indian and abroad university applications during Class 10.",
      "Lotus Valley's IB DP cohort is among the newer IB cohorts in Noida — the school added IB DP authorisation as part of its growing international-school positioning over the past decade. Both IB Biology HL and SL are offered, with full Section 6 (Practical Programme) coverage. The Biology department is staffed by IB-experienced teachers and the school's lab infrastructure supports the full IB practical programme.",
      "For Lotus Valley IB Biology students, the most common driver of external tutoring is the CBSE-Class-10-to-IB-DP transition. The shift from CBSE's recall-and-standard-answer-structure assessment to the IB DP's data-analysis-and-evaluation Paper 2 style is the single biggest assessment-style change students encounter at DP1 — a real shift that benefits from explicit external coaching in the first DP1 term. Our DP1 coaching makes this transition explicit, calibrating the IB-rubric command terms and the IA personal-investigation style alongside the school's in-house teaching. Several Lotus Valley IB Biology HL students each cohort also pursue our integrated IB+NEET track for the standard dual-application reasons.",
      "Lotus Valley's Sector 126 location places it on the central-east Noida belt, accessible from the Sector 50/62/93/100/128/132 residential cluster as well as the broader Sector 75 and Greater Noida footprint. The school operates a transport network across this footprint. For our coaching, the school commute is irrelevant — IST evening live sessions at 7–9 PM fit cleanly after the school day regardless of which Noida sector students live in, and the no-commute online-delivery model returns roughly 60–90 minutes per session compared to physical tutoring at a Cyber City / South Delhi / central-Noida tutoring centre.",
    ],
    reputationBullets: [
      'Opened late 2000s — newer-generation Noida international school',
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11-12',
      'Located in Sector 126 Noida (central-east Noida residential belt)',
      'CBSE primary curriculum through Class 10',
      'IB Biology HL and SL with full Section 6 practical coverage',
      'Day school (not residential)',
    ],
    collegeContext:
      "Lotus Valley IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Northwestern, public flagships), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar University, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from Lotus Valley most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical / biotechnology programmes. The dual-curriculum senior-school context produces a wider matriculation range than at single-curriculum schools — IB-track students go primarily abroad while their CBSE schoolmates stay in India.",
    paceAlignment:
      "Lotus Valley's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the Sector 126 school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The DP1 coaching includes an explicit CBSE-Class-10-to-IB-DP bridge — the single biggest assessment-style transition Lotus Valley IB students face — calibrated to be substantially complete by mid-DP1. IA mentorship aligns to the school's DP1 IA proposal deadlines.",
    faqs: [
      {
        question: "My child finished Lotus Valley's CBSE Class 10 with strong Biology marks — what changes when they start IB Biology HL at DP1?",
        answer:
          "Three things change. First, the assessment shifts: CBSE Class 10 prioritises content recall and standardised-answer structures, while IB DP Paper 2 rewards data-analysis-and-evaluation style writing — students learn the IB-specific command terms (\"explain\", \"evaluate\", \"discuss\") and the long-response mark scheme. Second, the Internal Assessment adds a 10-hour personal-investigation worth 20 percent of the final grade — CBSE Class 10 has nothing equivalent. Third, the syllabus depth in selected topics (cell biology, genetics, physiology) goes meaningfully beyond CBSE Class 10. Our DP1 coaching makes all three transitions explicit in the first term. This is the single highest-leverage external-coaching value for Lotus Valley CBSE-to-IB transitioners.",
      },
      {
        question: "How does Lotus Valley's IB Biology compare to the other Noida IB schools — Pathways, Shiv Nadar, Step by Step, Genesis Global?",
        answer:
          "Five different positioning profiles. Lotus Valley is newer-generation day-only (CBSE primary + IB DP senior, comparable to Shiv Nadar's structural pattern). Pathways Noida is full IB Continuum (PYP+MYP+DP), day-only. Shiv Nadar is STEM-strong with tech-industry founder identity, day-only. Step by Step is the longest-established Noida IB school, dual-track senior. Genesis Global is the only residential option in the Noida cluster. The IB Biology programmes are comparable in quality; school cultures differ. We have students from all five schools — they're complementary positioning within the Noida IB market rather than directly competing on IB Biology specifically.",
      },
      {
        question: "Lotus Valley's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group affect IB Biology results?",
        answer:
          "Not directly — IB exam grading is criterion-referenced against the same global rubric every year, regardless of in-school cohort size. What can be thinner at a CBSE-primary school is the peer-driven rubric awareness that students at larger single-curriculum IB schools (Pathways Aravali, UWCSEA) absorb partly through cohort-density-driven peer benchmarking. Our 1:1 coaching replaces that with explicit weekly written feedback on long-response answers against the IB Biology mark scheme. Several Lotus Valley IB Biology HL students score competitively despite the smaller in-school IB peer group.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Lotus Valley students?',
        answer:
          "Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. Several Lotus Valley IB Biology HL students each cohort pursue the dual IB+NEET pathway because the CBSE-rooted school culture means India medical-college options (AIIMS, state medical) are naturally in family conversations even when the abroad track is the primary planned route. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. Lotus Valley families typically pay in INR with payment plans across 3–4 instalments; GST-compliant invoices issued for corporate-reimbursement claims (common for Noida-based MNC IT-employee families).',
      },
      {
        question: "My child is choosing between continuing CBSE Class 11-12 at Lotus Valley or switching to the school's IB DP — which is better for medicine applications?",
        answer:
          "Depends on the target country. For UK medicine, IB is well-received and reads strongly when paired with HL Biology + HL Chemistry. For US pre-med, IB is the cleaner transcript signal — US admissions officers parse IB more fluently than CBSE. For Canada / Australia, IB works well. For India (AIIMS / state medical via NEET), CBSE is the more direct route because NEET-eligibility and the Class 12 board-exam framework are CBSE-aligned. Dual-application students who want both options open can pursue IBDP at Lotus Valley and add NEET via our IB+NEET integrated track. We'll be straight about which path best fits your target.",
      },
      {
        question: 'When should a Lotus Valley student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the CBSE-to-IB bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have Lotus Valley students each cohort who join then for focused Paper 2 + Paper 3 rubric drilling in the run-up to May exams.",
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
      "GD Goenka Public School Noida is a co-educational day school operating as part of the broader GD Goenka Public Schools network — the most numerous sub-brand within the GD Goenka education group, distinct from the premium GD Goenka World School (Sohna, residential + day, full IB Continuum) and GD Goenka Signature School (Sector 48 Gurgaon, day-only premium IB). The Public School Noida campus is among the GD Goenka campuses that have added IB Diploma Programme authorisation alongside their established CBSE programme, giving Noida families an IB DP option within a school brand they already recognise.",
      "The school's senior-school structure runs CBSE Class 11–12 as the larger of the two tracks and IB DP as the international-application track for the subset of families targeting US, UK, Canadian, Australian, or other abroad universities. This dual-track parallel pattern is structurally similar to other CBSE-primary Noida IB schools (Step by Step, Shiv Nadar, Lotus Valley) — students self-select into IB or CBSE at the Grade 11 transition based on their application target. Both IB Biology HL and SL are offered, with full Section 6 (Practical Programme) coverage.",
      "For GD Goenka Public Noida IB Biology students, the most common driver of external tutoring is the CBSE-to-IB transition at DP1. Because the school's primary curriculum and broader cohort identity is CBSE, IB DP students arrive at DP1 from a recall-and-standard-answer-structure assessment background and need to internalise the IB's data-analysis-and-evaluation Paper 2 style. Our DP1 coaching makes this transition explicit in the first term, alongside IA topic-selection mentorship and rubric calibration. The integrated IB+NEET track is also a natural fit because the school's CBSE-rooted family base often values keeping India medical-college options open via NEET in parallel with the abroad IB pathway.",
      "The Noida campus location keeps GD Goenka Public accessible across the broader Noida residential belt — Sectors 50, 62, 75, 93, 100, 128, 132 — with the school's transport network spanning this footprint. For our coaching, the school's location is irrelevant because delivery is 100% online live video; students join from home after the school day regardless of which Noida sector they live in. The IST evening live session window (7–9 PM) fits cleanly after the school commute, and weekend morning blocks (Saturday/Sunday 10 AM–12 PM IST) are available for IB+NEET integrated students who prefer to absorb the dual-syllabus weekly load in a single weekend block.",
    ],
    reputationBullets: [
      'Part of the broader GD Goenka Public Schools network — the most numerous sub-brand within the GD Goenka group',
      'Distinct from sister campuses GD Goenka World (Sohna, residential + IB Continuum) and GD Goenka Signature (Sector 48 Gurgaon, day-only premium)',
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11–12 (CBSE is the larger track)',
      'Located in Noida (central-Noida residential belt)',
      'IB Biology HL and SL with full Section 6 practical coverage',
      'CBSE-rooted brand identity with IB DP as the abroad-applications track',
    ],
    collegeContext:
      "GD Goenka Public Noida IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Northwestern, public flagships), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar University, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from GD Goenka Public Noida most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical / biotechnology programmes. The school's CBSE-rooted family base produces an unusually-high share of IB+NEET dual-track students because India medical-college options remain naturally in family conversations alongside the abroad applications.",
    paceAlignment:
      "GD Goenka Public Noida follows the standard two-year DP cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7–9 PM is most common, fitting after the Noida school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The DP1 coaching includes an explicit CBSE-Class-10-to-IB-DP bridge that is the single highest-leverage external coaching value for GD Goenka Public IB students transitioning from the school's CBSE Class 10. IA mentorship aligns to the school's DP1 IA proposal deadlines.",
    faqs: [
      {
        question: "Is GD Goenka Public Noida the same as GD Goenka World School or GD Goenka Signature? I have heard of all three.",
        answer:
          "All three are part of the broader GD Goenka education group but they're structurally different schools with distinct positioning. GD Goenka World School is in Sohna (south of Gurugram) and runs a residential + day model with a full IB Continuum (PYP + MYP + DP) — boarders come from across India. GD Goenka Signature School is in Sector 48 Gurgaon, day-only, IB DP + CBSE senior school — the premium central-Gurgaon day school. GD Goenka Public Noida is the CBSE-rooted Noida campus with IB DP added as a senior-school option alongside the larger CBSE Class 11-12 track. For families in Noida wanting the GD Goenka brand with an IB DP option, the Noida Public campus is the natural choice; for boarding, the World School in Sohna; for the premium Gurgaon day school with strong international identity, the Signature campus.",
      },
      {
        question: "My child finished GD Goenka Public Noida's CBSE Class 10 with strong Biology marks — what changes when they start IB Biology HL at DP1?",
        answer:
          "Three things change. First, the assessment shifts: CBSE Class 10 prioritises content recall and standardised-answer structures, while IB DP Paper 2 rewards data-analysis-and-evaluation style writing — students learn the IB-specific command terms (\"explain\", \"evaluate\", \"discuss\") and the long-response mark scheme. Second, the Internal Assessment adds a 10-hour personal-investigation worth 20 percent of the final grade — CBSE Class 10 has nothing equivalent. Third, the syllabus depth in selected topics (cell biology, genetics, physiology) goes meaningfully beyond CBSE Class 10. Our DP1 coaching makes all three transitions explicit in the first term. This is the highest-leverage external-coaching value for GD Goenka Public CBSE-to-IB transitioners.",
      },
      {
        question: "GD Goenka Public Noida's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group affect IB Biology results?",
        answer:
          "Not directly — IB exam grading is criterion-referenced against the same global rubric every year, regardless of in-school cohort size. What can be thinner at a CBSE-primary school is the peer-driven rubric awareness that students at larger single-curriculum IB schools (Pathways Aravali, UWCSEA) absorb partly through cohort-density-driven peer benchmarking. Our 1:1 coaching replaces that with explicit weekly written feedback on long-response answers against the IB Biology mark scheme. Several GD Goenka Public Noida IB Biology HL students score competitively despite the smaller in-school IB peer group.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for GD Goenka Public Noida students?',
        answer:
          "Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. The CBSE-rooted family identity at GD Goenka Public Noida makes this an unusually-natural fit: India medical-college conversations (AIIMS, state medical via NEET) are already part of household discussions even for IB-track students, so the dual IB+NEET pathway preserves both abroad (UK medicine, US pre-med, Canadian life-sciences) and India options. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000–₹98,000 per year for the complete integrated programme. GD Goenka Public Noida families typically pay in INR with payment plans across 3–4 instalments; GST-compliant invoices issued for corporate-reimbursement claims (common for Noida-based MNC IT-employee families).',
      },
      {
        question: "How does GD Goenka Public Noida compare to the other Noida IB schools — Pathways, Shiv Nadar, Step by Step, Genesis, Lotus Valley?",
        answer:
          "Six different positioning profiles. GD Goenka Public is the CBSE-rooted Goenka-brand entry, day-only. Pathways Noida is the international-from-inception full IB Continuum, day-only. Shiv Nadar is STEM-strong with tech-industry founder identity. Step by Step is the longest-established Noida IB school with strong pastoral-care culture. Genesis Global is the only residential option. Lotus Valley is newer-generation CBSE-rooted day-only. The IB Biology programmes across all six are comparable in quality; school cultures and brand identities differ. We have students from all six schools.",
      },
      {
        question: 'When should a GD Goenka Public Noida student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the CBSE-to-IB bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and several GD Goenka Public Noida students each cohort join then for focused Paper 2 + Paper 3 rubric drilling in the run-up to May exams.",
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
      "Manav Rachna International School (MRIS) is a co-educational day school in Faridabad, operating as the flagship international school of the Manav Rachna education group — which also runs Manav Rachna International Institute of Research and Studies (a UGC-recognised university), Manav Rachna Dental College, and engineering programmes. The school sits in the broader MRIS / Manav Rachna campus footprint in Faridabad and draws students from across the Faridabad residential belt and from Greater Faridabad.",
      "Manav Rachna's senior school is multi-curriculum: students can choose between the IB Diploma Programme, the Cambridge IGCSE / A-Levels track, or the CBSE Class 11-12 continuation track. This multi-pathway structure makes MRIS the most curriculum-flexible school in the Faridabad IB cluster, and the IB DP cohort is composed of students self-selecting toward US, UK, Canadian, and Australian university applications. Both IB Biology HL and SL are offered, with full Section 6 (Practical Programme) coverage.",
      "For Manav Rachna IB Biology students, the most common driver of external tutoring is the multi-curriculum senior-school context: because MRIS runs IB alongside Cambridge and CBSE, the in-school IB-specific peer benchmarking is structurally thinner than at single-curriculum IB schools (Pathways Aravali, UWCSEA). Our 1:1 coaching fills that gap with explicit weekly written feedback on Paper 2 long-response answers against the IB mark scheme. Several Manav Rachna IB Biology HL students each cohort also pursue our integrated IB+NEET track — given the Manav Rachna group's own medical and dental college operations, India medical-college pathways are naturally in family conversations.",
      "Manav Rachna's Faridabad location and the broader Manav Rachna campus footprint mean students typically commute from across the Faridabad sector belt (14, 15, 17, 19, 80) and from NIT Faridabad. The school operates a transport network spanning these areas. For our coaching, the school commute is irrelevant — IST evening live sessions at 7-9 PM fit cleanly after the school day. The Manav Rachna group's own medical and dental colleges also create a useful local biology context that students often draw on for IA topic-selection inspiration.",
    ],
    reputationBullets: [
      'Flagship international school of the Manav Rachna education group',
      'Group also runs MRIIRS university + Manav Rachna Dental College + engineering programmes',
      'IB World School authorised for the Diploma Programme',
      'Multi-curriculum senior school: IB DP + Cambridge IGCSE/A-Levels + CBSE',
      'Located in Faridabad (Manav Rachna campus footprint)',
      'IB Biology HL and SL with full Section 6 practical coverage',
      'Day school (not residential)',
    ],
    collegeContext:
      "Manav Rachna IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Northwestern, public flagships), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar University, Plaksha, plus AIIMS / state medical colleges and Manav Rachna's own dental and medical programmes for the relevant subset of IB+NEET dual-track students). Biology HL students from Manav Rachna most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, biomedical / biotechnology programmes, or dentistry programmes (including the Manav Rachna Dental College option for students who want to stay in the network).",
    paceAlignment:
      "Manav Rachna's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7-9 PM is most common, fitting after the Faridabad school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. IA mentorship aligns to the school's DP1 IA proposal deadlines. For students transitioning from MRIS's Cambridge IGCSE or CBSE Class 10 track, our DP1 coaching includes an explicit prior-curriculum-to-IB-DP bridge.",
    faqs: [
      {
        question: "Manav Rachna offers IB DP, Cambridge A-Levels, AND CBSE in senior school — which track is best for medicine applications?",
        answer:
          "Depends on the target country. For UK medicine, both IB and A-Levels are well-received; UK medical schools have well-developed offer matrices for both. For US pre-med, IB is the cleaner transcript signal — US admissions officers parse IB more fluently than Cambridge or CBSE. For Canada / Australia, IB works well. For India (AIIMS / state medical via NEET, including potentially Manav Rachna Dental), CBSE is the more direct route because NEET-eligibility and the Class 12 board-exam framework are CBSE-aligned. Dual-application students who want both abroad and India open can pursue IBDP at Manav Rachna and add NEET via our IB+NEET integrated track.",
      },
      {
        question: "How does Manav Rachna's IB Biology compare to DPS Faridabad and Shri Ram Faridabad — the other Faridabad IB schools?",
        answer:
          "Three different profiles. Manav Rachna is multi-curriculum (IB + Cambridge + CBSE) with a flagship-school identity within a broader education-group network (MRIIRS university, dental college). DPS Faridabad is part of the DPS national network with strong CBSE roots and IB DP added at senior. Shri Ram School Faridabad is a sister to TSRS Aravali in Gurgaon with the broader TSRS humanities-and-arts identity. The IB Biology programmes are comparable in quality; school cultures and curriculum mixes differ. None of these school differences predict an individual student's IB Biology score — that depends on engagement and rubric calibration. We coach students from all three.",
      },
      {
        question: 'The Manav Rachna group includes a dental college — does that influence how IB Biology students approach medicine applications?',
        answer:
          "For some students, yes — Manav Rachna Dental College is a within-network option that some MRIS families consider as part of the broader medicine / dentistry application portfolio. This is one reason the integrated IB+NEET pathway has unusually-strong demand at Manav Rachna: families want to keep dentistry-in-India open (which requires NEET) alongside abroad medical / pre-med applications (which require IB or A-Level credentials). Our IB+NEET integrated coaching is well-suited to this dual-application profile.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for Manav Rachna students?',
        answer:
          "Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. Several Manav Rachna IB Biology HL students each cohort pursue the dual IB+NEET pathway. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule that respects the school's multi-curriculum academic load.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000-₹98,000 per year for the complete integrated programme. Manav Rachna families typically pay in INR with payment plans across 3-4 instalments; GST-compliant invoices issued for corporate-reimbursement claims.',
      },
      {
        question: "Faridabad has limited dedicated IB tutoring centres — does that make external 1:1 coaching harder to find?",
        answer:
          "Locally, yes — Faridabad has fewer dedicated IB-specialist tutoring centres than Gurgaon or central Delhi, which makes the choice typically between (a) in-school class only, (b) generalist Delhi-side test-prep agencies operating into Faridabad, or (c) online-delivery specialist IB tutors. Cerebrum is option (c): IB Biology-only AIIMS-trained faculty delivering live online sessions in IST evenings. The online-delivery model removes the Faridabad geography constraint entirely — no driving to Delhi for IB-specific specialist coaching.",
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
      "DPS Faridabad's senior school runs CBSE Class 11-12 as the larger of the two tracks, with the IB Diploma Programme added as a senior-school international option for the subset of families targeting US, UK, Canadian, Australian, or other abroad universities. Both IB Biology HL and SL are offered, with full Section 6 (Practical Programme) coverage. The IB cohort is meaningfully smaller than the CBSE cohort because the school's identity and most of its alumni are CBSE-rooted; students choosing IB are typically self-selecting toward international university applications.",
      "For DPS Faridabad IB Biology students, the most common driver of external tutoring is the CBSE-to-IB transition at DP1. The shift from CBSE Class 10's recall-and-standard-answer-structure assessment to the IB DP's data-analysis-and-evaluation Paper 2 style is the single biggest assessment-style change students encounter — a real shift that benefits from explicit external coaching in the first DP1 term. Our DP1 coaching makes this transition explicit, calibrating IB-rubric command terms and the IA personal-investigation style alongside the school's in-house teaching.",
      "DPS Faridabad's broader DPS network identity gives families unusually-strong India-university connections through the DPS Society alumni base. For IB+NEET dual-track students, this matters: many extended-family conversations at DPS households default to AIIMS / state medical colleges as a valued option even when the abroad track is the primary planned route. The integrated IB+NEET pathway is a natural fit for this profile, preserving both Indian and abroad medical-college pathways through Class 12. The school's Faridabad sector location keeps it accessible from across the central-Faridabad belt and from NIT Faridabad.",
    ],
    reputationBullets: [
      'Part of the broader Delhi Public School (DPS) national network',
      'Sister campuses include DPS RK Puram, DPS Vasant Kunj, DPS Sector 45 Gurgaon, DPS Noida Sector 30',
      'IB World School authorised for the Diploma Programme',
      'Senior school: IB DP + CBSE dual-track at Classes 11-12 (CBSE is the larger track)',
      'Located in Faridabad with broader Faridabad-sector accessibility',
      'IB Biology HL and SL with full Section 6 practical coverage',
      'CBSE-rooted brand identity with IB DP as the abroad-applications track',
    ],
    collegeContext:
      "DPS Faridabad IB graduates matriculate to UK (Russell Group including Oxbridge, Imperial, UCL, KCL, Warwick, Edinburgh, Manchester), US (Ivy+, NYU, top liberal arts colleges, Berkeley, Northwestern, public flagships), Canada (Toronto, UBC, McGill, Western, Waterloo, Queen's), Australia (Melbourne, Sydney, ANU, Monash), and Indian universities (Ashoka, Krea, Shiv Nadar University, Plaksha, plus AIIMS / state medical colleges for IB+NEET dual-track students). Biology HL students from DPS Faridabad most commonly target UK medicine, US pre-med, biosciences at top UK / Canadian universities, or biomedical / biotechnology programmes. The DPS-brand network effect matters for Indian-university applications where DPS alumni connections and the brand's academic-rigour signal carry weight; for international applications, the IB transcript is the primary signal.",
    paceAlignment:
      "DPS Faridabad's IB DP follows the standard two-year cycle. IST timezone aligns directly with our India-based live tutoring schedule. Our 1:1 sessions schedule in IST evenings (7-9 PM is most common, fitting after the Faridabad school commute) or weekend morning blocks. For IB+NEET students, we run an integrated weekly schedule covering IB Biology + NEET Biology + NEET Chemistry + NEET Physics. The DP1 coaching includes an explicit CBSE-Class-10-to-IB-DP bridge that is the single highest-leverage external coaching value for DPS Faridabad IB students transitioning from the school's CBSE Class 10. IA mentorship aligns to the school's DP1 IA proposal deadlines.",
    faqs: [
      {
        question: "Is DPS Faridabad the same school as DPS International Gurgaon? My friend's child goes to DPS International — are they connected?",
        answer:
          "Both are part of the broader Delhi Public School (DPS) national network but they're structurally different schools with distinct profiles. DPS Faridabad is the Faridabad campus running CBSE-primary with IB DP added at senior school — the CBSE cohort is larger, the IB cohort smaller. DPS International is the Gurgaon Sector 45 campus that's explicitly positioned as the international-curriculum arm of DPS Gurgaon — Cambridge IGCSE through Class 10 → IB DP at Classes 11-12, no parallel CBSE senior track. The DPS network has multiple branches (Faridabad, RK Puram, Vasant Kunj, Sector 45 Gurgaon, Noida Sector 30) with varying senior-school structures.",
      },
      {
        question: "My child finished DPS Faridabad's CBSE Class 10 with strong Biology marks — what changes at IB Biology HL?",
        answer:
          "Three things change. First, the assessment shifts: CBSE Class 10 prioritises content recall and standardised-answer structures, while IB DP Paper 2 rewards data-analysis-and-evaluation style writing — students learn the IB-specific command terms (\"explain\", \"evaluate\", \"discuss\") and the long-response mark scheme. Second, the Internal Assessment adds a 10-hour personal-investigation worth 20 percent of the final grade — CBSE Class 10 has nothing equivalent. Third, the syllabus depth in selected topics (cell biology, genetics, physiology) goes meaningfully beyond CBSE Class 10. Our DP1 coaching makes all three transitions explicit in the first term.",
      },
      {
        question: "DPS Faridabad's IB cohort is smaller than the CBSE cohort — does the smaller IB peer group affect IB Biology results?",
        answer:
          "Not directly — IB exam grading is criterion-referenced against the same global rubric every year, regardless of in-school cohort size. What can be thinner at a CBSE-primary school is the peer-driven rubric awareness that students at larger single-curriculum IB schools (Pathways Aravali, UWCSEA) absorb partly through cohort-density-driven peer benchmarking. Our 1:1 coaching replaces that with explicit weekly written feedback on long-response answers against the IB Biology mark scheme.",
      },
      {
        question: 'Do you offer the IB+NEET integrated track for DPS Faridabad students?',
        answer:
          "Yes — Cerebrum is the only IB Biology tutor in India that runs this integrated track. The DPS-network brand identity makes IB+NEET an unusually-natural fit: extended-family conversations at DPS households often default to AIIMS / state medical colleges as a valued option even when the abroad track is the primary planned route. We coordinate IB Biology HL + NEET Biology + Chemistry + Physics on a single weekly schedule.",
      },
      {
        question: 'How does pricing differ for IB-only vs IB+NEET tracks?',
        answer:
          'IB-only: Complete IB Biology Programme $6,000 per year (HL + SL, 150+ hours), 1:1 Elite Tutoring $75 per hour, Group Batch $40 per hour. IB+NEET: pricing scales with the additional Chemistry and Physics coaching plus increased Biology hours — typically ₹60,000-₹98,000 per year for the complete integrated programme. DPS Faridabad families typically pay in INR with payment plans across 3-4 instalments.',
      },
      {
        question: "How does DPS Faridabad's IB Biology compare to Manav Rachna and Shri Ram Faridabad?",
        answer:
          "Three different positioning profiles. DPS Faridabad is the DPS-network CBSE-rooted school with IB DP added at senior — strong India-university alumni connections, CBSE-brand household identity. Manav Rachna International is the flagship of the Manav Rachna education group (including MRIIRS university + dental college) with multi-curriculum senior school (IB + Cambridge + CBSE). Shri Ram School Faridabad is a sister to TSRS Aravali in Gurgaon with the broader TSRS humanities-and-arts identity. The IB Biology programmes are comparable in quality; school cultures and brand contexts differ. We coach students from all three.",
      },
      {
        question: 'When should a DPS Faridabad student start IB Biology tutoring?',
        answer:
          "For the integrated 2-year Complete Programme, August or September of DP1 — that maximises the CBSE-to-IB bridge in the first term and the IA mentorship window across DP1. For IB+NEET students, ideally earlier (during Class 10) to build Chemistry and Physics foundations before DP1's heavier weekly load. For exam-only coaching, October DP2 (after the school's mocks) is still effective and we have DPS Faridabad students each cohort who join then for focused Paper 2 + Paper 3 rubric drilling.",
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
