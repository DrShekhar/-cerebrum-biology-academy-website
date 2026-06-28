/**
 * IBO country data — drives /ibo-coaching-{country} landing pages.
 *
 * The IBO (International Biology Olympiad) is reached through each country's
 * national olympiad. These pages capture the per-country "IBO {country}
 * selection" intent that the AEO layer already cites heavily but had no
 * landing page for (only /ibo-coaching-china existed). Each page is
 * differentiated by the REAL national selection route + national olympiad +
 * time zone, and links to the matching national-olympiad coaching page.
 */

export interface IBOCountryFaq {
  question: string
  answer: string
}

export interface IBOCountry {
  slug: string
  country: string
  flag: string
  /** Short national-olympiad name, e.g. "USABO" */
  nationalOlympiad: string
  /** Full name */
  nationalOlympiadFull: string
  /** Existing coaching page for that national olympiad */
  nationalOlympiadHref: string
  /** Ordered selection ladder to the IBO team */
  selectionSteps: string[]
  timezone: string
  heroBlurb: string
  faqs: IBOCountryFaq[]
  /** Optional related guide (e.g. an informational pathway page) the template links to */
  relatedHref?: string
  relatedLabel?: string
}

export const IBO_COUNTRIES: IBOCountry[] = [
  {
    slug: 'usa',
    country: 'USA',
    flag: '🇺🇸',
    nationalOlympiad: 'USABO',
    nationalOlympiadFull: 'USA Biology Olympiad',
    nationalOlympiadHref: '/usabo-coaching',
    selectionSteps: [
      'USABO Open Exam (February) — 50 MCQ, school-administered',
      'USABO Semifinal (March) — theory + free-response; top ~10% of Open advance',
      'USABO National Finals (late May) — multi-day camp at a host university; top ~20 nationally',
      'Top 4 finalists form Team USA for the International Biology Olympiad',
    ],
    timezone: 'ET / PT',
    heroBlurb:
      'In the USA, the road to the IBO runs through USABO. We coach the full ladder — Open, Semifinal and National Finals — live in your US time zone, with AIIMS-trained biology faculty (AIIMS — India’s apex medical institute, peer to Harvard Medical School in selectivity) and a past-paper-saturation method.',
    relatedHref: '/how-to-make-us-ibo-team',
    relatedLabel: 'How to make the US IBO team — the full USABO pathway, stage by stage',
    faqs: [
      {
        question: 'How does a US student make the IBO team?',
        answer:
          'Through USABO: the Open exam in February, the Semifinal in March (top ~10% of Open advance), then National Finals in late May. The top 4 finalists represent the USA at the International Biology Olympiad. We coach every stage.',
      },
      {
        question: 'Who is eligible for the USABO Open Exam and how do I register?',
        answer:
          'Any student enrolled in a US high school is eligible — there is no age or grade restriction, and homeschool students can usually participate through a registered school. Registration is handled by your school, not the individual: a teacher signs the school up with the Center for Excellence in Education (CEE), which administers USABO. If your school is not yet registered, ask your AP Biology teacher to enroll it — the process is inexpensive and open to any US high school. We help you confirm registration windows (schools typically register in the autumn) so you do not miss the February Open.',
      },
      {
        question: 'What is the USABO Semifinal cutoff?',
        answer:
          'Roughly the top 10% of Open Exam takers advance to the Semifinal — CEE sets the exact cutoff each year from the actual score distribution, so there is no fixed number. Historically the Open cutoff has sat around the high-50s percentage of marks. The Semifinal is a longer, harder paper with free-response questions, which is where undergraduate-level depth (Alberts, Lehninger) starts to matter. We coach to clear the cutoff comfortably rather than scrape it.',
      },
      {
        question: 'How are the USABO National Finals run and how is Team USA selected for the IBO?',
        answer:
          'The top ~20 Semifinal scorers nationally are invited to the National Finals — a multi-day residential training camp at a host university with theory and hands-on lab practical rounds. Performance across that camp determines the final ranking, and the top 4 students are selected as Team USA for the International Biology Olympiad. So the funnel is Open Exam → Semifinal → National Finals (top ~20) → top 4 to the IBO. We prepare candidates specifically for the camp’s lab-practical and free-response demands, not just the written rounds.',
      },
      {
        question: 'What is the USABO timeline through the year?',
        answer:
          'Schools register in the autumn; the Open Exam is held in early-to-mid February; the Semifinal follows in March; National Finals are held as a late-May / early-June camp; and the IBO itself takes place in July. We map your preparation backward from the February Open so foundational reading is done before the new year and the winter is spent on past-paper saturation.',
      },
    ],
  },
  {
    slug: 'uk',
    country: 'UK',
    flag: '🇬🇧',
    nationalOlympiad: 'BBO',
    nationalOlympiadFull: 'British Biology Olympiad',
    nationalOlympiadHref: '/bbo-preparation',
    selectionSteps: [
      'Biology Challenge (Years 9–10) — an entry-level intro round',
      'British Biology Olympiad (BBO) — two timed online papers for sixth-form students',
      'Top BBO performers invited to selection and training',
      'Top 4 form Team UK for the International Biology Olympiad',
    ],
    timezone: 'GMT / BST',
    heroBlurb:
      'In the UK, the IBO route runs through the British Biology Olympiad (BBO). We coach the BBO papers and the selection rounds live in GMT/BST, with AIIMS-trained biology faculty.',
    faqs: [
      {
        question: 'How does a UK student make the IBO team?',
        answer:
          'The BBO is the gateway. Students sit the BBO each January; Gold award winners from UK schools are invited to a further selection exam — sometimes set around a specific scientific paper they must study in advance. Top scorers attend a team-selection assessment (historically held around Easter at the University of Warwick). From there, a final team of four is chosen to represent the UK at the IBO, typically held each July.',
      },
      {
        question: 'Who is eligible for the BBO and how do you register?',
        answer:
          'The BBO is open to students in their final pre-university year: Year 12 or 13 in England/Wales, Year 13/14 in Northern Ireland, or S5/S6 in Scotland. For IBO team selection specifically, students must have studied in the UK for at least two years, must not have previously attended an IBO, and must be under 20. Registration is handled by schools — teachers register via the UKBC online portal. UK school entry is free.',
      },
      {
        question: 'What does the BBO exam involve, and how competitive is it?',
        answer:
          'The BBO comprises two 45-minute multiple-choice papers completed online under teacher supervision, sat within a roughly 10-day window each January. Awards are given at six levels: Gold, Silver, Bronze, Highly Commended, Commended, and Participation; exact score thresholds are not published as fixed percentages and vary by year. Only Gold recipients are invited into IBO team selection. The exam tests A-level biology and frequently extends to first-year university-level content.',
      },
      {
        question: 'What is the BBO-to-IBO timeline?',
        answer:
          'January: BBO sat in schools during a ~10-day window. A few weeks later: results released; eligible Gold recipients invited to a further school-based selection exam. Easter holiday period: team-selection assessments held, from which the final four are chosen. July: IBO held internationally (location changes annually). The full process from sitting the BBO to competing at the IBO spans approximately six months.',
      },
    ],
  },
  {
    slug: 'canada',
    country: 'Canada',
    flag: '🇨🇦',
    nationalOlympiad: 'CBO',
    nationalOlympiadFull: 'Canadian Biology Olympiad',
    nationalOlympiadHref: '/cbo-coaching',
    selectionSteps: [
      'Canadian Biology Olympiad (CBO) national exam',
      'National team selection and training camp',
      'Top 4 form Team Canada for the International Biology Olympiad',
    ],
    timezone: 'ET / PT',
    heroBlurb:
      'In Canada, the IBO route runs through the Canadian Biology Olympiad (CBO). We coach the CBO and the selection process live in Canadian time zones, with AIIMS-trained biology faculty.',
    faqs: [
      {
        question: 'How does a Canadian student make the IBO team?',
        answer:
          'The CBO selects four students to represent Canada at the IBO. Students sit the online CBO exam in their school each April under teacher supervision. Top scorers in the national rankings form the team; no school may contribute more than two members, and the team must represent at least two provinces or territories. Before the IBO, selected students attend a multi-day skills training camp.',
      },
      {
        question: 'Who is eligible for the CBO and how does registration work?',
        answer:
          'Eligible students must be enrolled in a Canadian high school (or first-year CEGEP in Quebec), hold Canadian citizenship or permanent residency, and be under 20 as of July 1 of the competition year. Students must not yet have obtained a university-entry diploma. Schools register for free through a teacher proctor — individual student registrations are not accepted. Invitation letters are sent to schools each January; confirm registration details with your biology teacher.',
      },
      {
        question: 'What does the CBO exam involve?',
        answer:
          'The CBO is a roughly one-hour online exam of about 35 questions, sat at school under teacher supervision. Question types include multiple choice, true/false, fill-in-the-blank, and short calculations. Content is roughly two-thirds theory and one-third practical application, drawn from Campbell Biology at AP/first-year university level; students are also tested on standard lab activities and common laboratory techniques. Rankings follow IBO methodology (top 10% gold, next 20% silver, next 30% bronze).',
      },
      {
        question: 'What is the CBO annual timeline?',
        answer:
          'January: invitation letters sent to registered schools. Early April: CBO exam sat nationwide. Shortly after: national rankings compiled and the top four named to the Canadian IBO team, subject to per-school and provincial representation rules. Around July, before IBO: multi-day skills training camp with the team plus additional invited students. July: IBO held internationally (location changes each year).',
      },
    ],
  },
  {
    slug: 'singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    nationalOlympiad: 'SBO',
    nationalOlympiadFull: 'Singapore Biology Olympiad',
    nationalOlympiadHref: '/sbo-coaching',
    selectionSteps: [
      'Singapore Biology Olympiad (SBO)',
      'National team selection and training',
      'Team Singapore for the International Biology Olympiad',
    ],
    timezone: 'SGT',
    heroBlurb:
      'In Singapore, the IBO route runs through the Singapore Biology Olympiad (SBO). We coach the SBO and selection live in SGT, with AIIMS-trained biology faculty and Campbell-based depth.',
    faqs: [
      {
        question: 'How does a Singapore student make the IBO team?',
        answer:
          "The SBO is Singapore's national pathway to the IBO. A theory test in November shortlists roughly the top 10% of participants (about 32–44 students) for practical tests. From the practical round, 6–10 students are shortlisted for interviews and an intensive training programme run by academics from NUS and NIE. After weekly sessions in April–May and a residential camp at NIE, a final team of 4 plus one reserve is chosen to represent Singapore at the IBO.",
      },
      {
        question: 'Who is eligible for the SBO and how do students register?',
        answer:
          'The SBO is open to JC1/JC2 and IP Year 5–6 students studying H2 Biology in Singapore schools, including both local and international students. Roughly 250–350 students compete annually — about the top 10% of biology pupils per school. Schools are notified by MOE and nominate students; there is no individual direct registration. Competitors must be under 20 as of July 1 of the IBO year and must not have entered tertiary education.',
      },
      {
        question: 'What does the SBO exam involve, and how selective is it?',
        answer:
          'The SBO has two rounds. Round 1 is a 3-hour theory test of 100 multiple-choice questions held in November. The top ~10% of scorers — about 32–44 students — advance to Round 2: four separate 1-hour practical tests at a central venue. Content extends well beyond H2 Biology to university-level material aligned with IBO standards. The funnel is steep: from 250–350 students sitting the theory paper down to just 4 IBO team places.',
      },
      {
        question: 'What is the SBO-to-IBO timeline?',
        answer:
          'October: schools notified by MOE; nominations confirmed. November: SBO theory test (100 MCQ, 3 hours). December onward: practical tests for the ~32–44 shortlisted students; 6–10 invited for training. April–May: weekly group theory sessions with NUS and NIE academics. Late May/early June: residential training camp at NIE. Post-camp: interviews and final team selection (4 students + 1 reserve). July: IBO held internationally.',
      },
    ],
  },
  {
    slug: 'australia',
    country: 'Australia',
    flag: '🇦🇺',
    nationalOlympiad: 'ABO',
    nationalOlympiadFull: 'Australian Biology Olympiad',
    nationalOlympiadHref: '/abo-biology-olympiad-coaching',
    selectionSteps: [
      'Australian Biology Olympiad (ABO) exam — via Australian Science Innovations',
      'Summer School selection for top performers',
      'Top 4 form Team Australia for the International Biology Olympiad',
    ],
    timezone: 'AEST',
    heroBlurb:
      'In Australia, the IBO route runs through the Australian Biology Olympiad (ABO). We coach the ABO and the summer-school selection live in AEST, with AIIMS-trained biology faculty.',
    faqs: [
      {
        question: 'How does an Australian student make the IBO team?',
        answer:
          'Students sit the Australian Science Olympiad (ASO) Biology exam in late July at school. The top 24 eligible scorers are invited to the ASO Summer School in January — a two-week residential programme at the Australian National University involving university-level practicals, theory exams, and field research. From those 24 students, four are selected for the Australian IBO team, traditionally announced at a blazer ceremony between April and June, before the July IBO.',
      },
      {
        question: 'Who is eligible for the ASO Biology exam and how does registration work?',
        answer:
          'Students in Years 9–12 are eligible, provided they are at least 15 years old as of January 1 of the Summer School year and have not yet completed Year 12 at the time of Summer School. Registration is through schools only — individual students cannot apply directly. Teachers register via the ASI Teacher Portal, and a small per-student exam fee applies. Registration typically closes in late July each year.',
      },
      {
        question: 'What does the ASO Biology exam involve, and how selective is the funnel?',
        answer:
          'The ASO Biology exam is a two-hour online assessment taken in school in late July. It tests biology at and beyond Year 12 level, including material typically covered in first-year university courses. Nationally, only the top 24 students are invited to Summer School — making the exam stage very competitive. At Summer School, students face further theory exams and practicals, and from those 24, just 4 are ultimately chosen for the IBO team.',
      },
      {
        question: 'What is the full Australian Biology Olympiad timeline?',
        answer:
          'Late July: ASO Biology exam sat in schools. August–December: results processed and the top 24 eligible students invited to Summer School. January: two-week ASO Summer School at ANU (financial assistance is available from ASI). April: team training programme. April–June: IBO team announced at a blazer ceremony. July: IBO held internationally, with the location changing each year.',
      },
    ],
  },
]

export const IBO_COUNTRY_BY_SLUG: Record<string, IBOCountry> = Object.fromEntries(
  IBO_COUNTRIES.map((c) => [c.slug, c])
)
