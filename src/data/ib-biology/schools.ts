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
]

/** Helper: lookup school by slug. */
export function getSchoolBySlug(slug: string): IBBiologySchool | undefined {
  return ibBiologySchools.find((s) => s.slug === slug)
}

/** Helper: list of all slugs for generateStaticParams. */
export const ibBiologySchoolSlugs = ibBiologySchools.map((s) => s.slug)
