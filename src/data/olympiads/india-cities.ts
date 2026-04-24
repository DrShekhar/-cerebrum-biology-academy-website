/**
 * India city-level biology olympiad pages.
 *
 * Drives the /biology-olympiads/india/[city] dynamic route.
 * 12 metro cities covering Delhi NCR, South India, West India,
 * and major IB-heavy tier-2 cities.
 */

import { indiaOlympiadFAQs } from './india-faqs'

export interface OlympiadCityEntry {
  /** URL slug. */
  slug: string
  /** Display name (e.g., "Delhi", "South Delhi"). */
  city: string
  /** Region within India. */
  region: string
  /** ISO-2 state code (optional, for local SEO signals). */
  state: string
  /** One-line hero pitch. */
  pitch: string
  /** Longer intro paragraph. */
  intro: string
  /** Nearby in-centre option if available. */
  inCentre?: {
    label: string
    href: string
  }
  /** Main schools / student catchment in city. */
  schoolCatchment: string[]
  /** City-specific FAQ (3-5). */
  faqs: Array<{ question: string; answer: string }>
  /** Cross-links (sibling city or related national pages). */
  relatedLinks: Array<{ label: string; href: string }>
  /** City-specific feeder-school context + NSEB participation pattern (100-200 words). */
  localContext?: string
  /** City-specific commute / scheduling notes for offline vs online decision (60-120 words). */
  commuteContext?: string
}

const commonFaqsBase = (city: string) => [
  {
    question: `Do you offer offline Biology Olympiad coaching in ${city}?`,
    answer:
      'Our Biology Olympiad programme runs primarily online across India so students from all cities can access the same senior biology tutors and past-paper archive. Offline classroom coaching is available at our Gurugram, South Extension (Delhi), and Faridabad centres. Students in other cities join the online cohort.',
  },
  {
    question: `Which schools in ${city} register students for NSEB and INBO?`,
    answer:
      'Most CBSE, ICSE, IB, and Cambridge schools in India register their senior students for NSEB (November paper) via IAPT. If your school does not administer NSEB, we help with direct registration through IAPT affiliated centres. Check with your biology teacher first.',
  },
  {
    question: `How much does Biology Olympiad coaching cost for ${city} students?`,
    answer:
      'Complete Olympiad Year programme (9-12 months, covers NSEB and INBO): $4,500 reference price with INR auto-shown on the pricing section (approximately ₹3.8 lakh equivalent). 1:1 Elite Mentoring with a senior olympiad tutor: $90 per hour. Small-Batch Weekend: $50 per hour. Pricing is identical across all India cities.',
  },
  // India-wide registration/process FAQs (shared across all city pages)
  ...indiaOlympiadFAQs,
]

export const olympiadCities: OlympiadCityEntry[] = [
  {
    slug: 'delhi',
    city: 'Delhi',
    region: 'Delhi NCR',
    state: 'DL',
    pitch:
      'Biology Olympiad coaching in Delhi — NSEB, INBO, IBO pathway with senior olympiad tutors.',
    intro:
      "Delhi has one of India's highest olympiad-qualifying student concentrations, with DPS RK Puram, Modern School, St Stephens feeder schools, Springdales, and Mount Carmel sending students to NSEB every November. Our programme runs online with Delhi-timezone live classes and offline at our South Extension centre. Complete Campbell Biology coverage, weekly past-paper drills, and 1:1 mentoring with senior biology tutors.",
    inCentre: { label: 'South Extension centre', href: '/biology-classes-delhi' },
    schoolCatchment: [
      'DPS RK Puram',
      'Modern School Barakhamba',
      'Springdales Pusa Road',
      'Mount Carmel School',
      'Sanskriti School',
      'Delhi Public School Vasant Kunj',
    ],
    faqs: [
      ...commonFaqsBase('Delhi'),
      {
        question: 'Can Delhi students attend offline classes?',
        answer:
          'Yes. Our South Extension centre hosts offline olympiad coaching for Delhi students. Online students get identical curriculum access; the offline option is for students who prefer classroom study and in-person lab practicals.',
      },
      {
        question: 'Does Cerebrum have an NSEB-specific track for Delhi?',
        answer:
          'Yes. Our NSEB national programme (see /nseb-coaching) is used by Delhi students. It runs 9-12 months to cover Campbell Biology + 15 years of past papers. Delhi-timezone live classes plus recorded sessions for school-schedule flexibility.',
      },
    ],
    relatedLinks: [
      { label: 'NSEB coaching', href: '/nseb-coaching' },
      { label: 'INBO coaching', href: '/inbo-coaching' },
      {
        label: 'South Delhi (GK, Saket, Vasant Kunj)',
        href: '/biology-olympiads/india/south-delhi',
      },
      { label: 'Rohini (North Delhi)', href: '/biology-olympiads/india/rohini' },
      { label: 'Gurugram (NCR)', href: '/biology-olympiads/india/gurugram' },
      { label: 'Noida (NCR)', href: '/biology-olympiads/india/noida' },
      { label: 'Faridabad (NCR)', href: '/biology-olympiads/india/faridabad' },
      { label: 'Delhi NEET biology classes', href: '/biology-classes-delhi' },
      { label: 'All India cities', href: '/biology-olympiads' },
    ],
    localContext:
      "Delhi is one of India's highest-participation NSEB regions — DPS RK Puram, Modern School Barakhamba, Springdales Pusa Road, Mount Carmel, and Sanskriti all register Class 11-12 students every November via IAPT. Our Delhi cohort leans toward Class 11 students who begin Campbell Biology in Q1 (July-August) and sit their first NSEB in Class 11 as a calibration attempt, then the serious attempt in Class 12. Students at Sanskriti and Vasant Valley (heavy school-week loads) typically choose 1:1 Elite mentoring; students at DPS RK Puram and Modern (with more flexible schedules) often prefer our small-batch weekend programme at the South Extension centre.",
    commuteContext:
      'South Extension centre is accessible from most Delhi neighbourhoods within 25-40 minutes by metro. Pink Line connects directly from INA, Dhaula Kuan, and Rajiv Chowk. Yellow Line via Moolchand serves Greater Kailash, Saket, and Hauz Khas. Violet Line via Mandi House serves Central Delhi and ITO. For students in North and West Delhi (Rohini, Pitampura, Rajouri Garden), expect 45-60 min commute — most choose the online cohort with optional Saturday intensives at the centre for lab practicals.',
  },
  {
    slug: 'south-delhi',
    city: 'South Delhi',
    region: 'Delhi NCR',
    state: 'DL',
    pitch:
      'South Delhi Biology Olympiad coaching at our South Extension centre and online across Greater Kailash, Saket, Vasant Kunj, Hauz Khas.',
    intro:
      'South Delhi has the highest density of IB/IGCSE and CBSE olympiad-track schools in India. Our South Extension centre services Greater Kailash, Defence Colony, Saket, Vasant Kunj, Hauz Khas, Panchsheel Park, and Chanakyapuri. Complete Olympiad Year runs as a blended programme — offline intensive weekends plus online weekday cohort with online-only students across India.',
    inCentre: { label: 'South Extension centre', href: '/biology-classes-south-delhi' },
    schoolCatchment: [
      'Vasant Valley School',
      'Shriram School Aravali',
      'Pathways School Noida (South Delhi feeder)',
      "Mother's International",
      'Sardar Patel Vidyalaya',
      'Step by Step Jasola',
    ],
    faqs: [
      ...commonFaqsBase('South Delhi'),
      {
        question: 'Which South Delhi areas can reach your centre?',
        answer:
          'Our South Extension centre is accessible from Greater Kailash, Defence Colony, Saket, Vasant Kunj, Hauz Khas, Panchsheel Park, Chanakyapuri, Lajpat Nagar, and Green Park within 15-30 minutes by metro or car. South Extension metro (Pink Line) is the closest station.',
      },
    ],
    relatedLinks: [
      { label: 'NSEB coaching', href: '/nseb-coaching' },
      { label: 'INBO coaching', href: '/inbo-coaching' },
      { label: 'South Delhi NEET classes', href: '/biology-classes-south-delhi' },
      { label: 'Delhi olympiad hub', href: '/biology-olympiads/india/delhi' },
    ],
    localContext:
      "South Delhi has one of India's densest IB/IGCSE/Cambridge school clusters — Vasant Valley, Shriram Aravali, Pathways, Mother's International, Sardar Patel Vidyalaya, and Step by Step Jasola are all within a short radius of the South Extension centre. The curriculum overlap between IB HL Biology and NSEB preparation is roughly 75-85% on theme content, so IB students frequently layer NSEB onto their HL coursework without a separate prep stream. Programme schedule accommodates IB mock-exam season (Oct-Nov) alongside the NSEB November paper: HL theme review in September, NSEB past-paper drills in October.",
    commuteContext:
      'Our South Extension flagship centre (D 35, South Extension Part 2) is within 15-25 minutes of Greater Kailash, Defence Colony, Saket, Vasant Kunj, Hauz Khas, Panchsheel Park, Chanakyapuri, and Lajpat Nagar. South Extension metro (Pink Line) is closest; parking available on premises. Most South Delhi students prefer blended delivery — weekday online evenings plus Saturday intensives at the centre for practical lab skills and past-paper mocks.',
  },
  {
    slug: 'gurugram',
    city: 'Gurugram',
    region: 'Delhi NCR',
    state: 'HR',
    pitch:
      'Gurugram Biology Olympiad coaching — offline at our Sector 51 centre plus online cohort.',
    intro:
      "Gurugram has India's largest concentration of IB, Cambridge, and CBSE-International schools — feeding NSEB and INBO registrations heavily every November. Our Sector 51 centre hosts offline olympiad programmes (DLF Phase 1-5, Sohna Road, Sector 51-56, Golf Course Road). Online cohort available for students in Sectors 82+ or Manesar. See /biology-olympiad-coaching-gurugram for the detailed centre page.",
    inCentre: { label: 'Gurugram centre (Sector 51)', href: '/biology-olympiad-coaching-gurugram' },
    schoolCatchment: [
      'Pathways World School Aravali',
      'Heritage Xperiential School',
      'Shri Ram School Aravali',
      'Scottish High International',
      'GD Goenka Global',
      'DPS International Gurugram',
      'Lancers International',
    ],
    faqs: [
      ...commonFaqsBase('Gurugram'),
      {
        question: 'Is your Gurugram centre suitable for DLF Phase 5 students?',
        answer:
          'Yes. Our Sector 51 centre is 8-10 minutes from DLF Phase 5 via Golf Course Road or MG Road. DLF Phase 1-4, Sohna Road, and Sector 56 students reach within 15-20 minutes. The centre is also close to Huda City Centre metro.',
      },
      {
        question: 'Can IB school students in Gurugram benefit from Olympiad prep?',
        answer:
          'Absolutely. Our curriculum is Campbell Biology based, which is also the foundation for IB HL Biology. Olympiad prep is a natural extension for IB students — and many IB HL students use olympiad training to strengthen their theme mastery. Some students combine IB and olympiad tracks.',
      },
    ],
    relatedLinks: [
      { label: 'NSEB Gurugram', href: '/nseb-coaching-gurugram' },
      { label: 'Biology Olympiad Gurugram', href: '/biology-olympiad-coaching-gurugram' },
      { label: 'IBO Preparation Gurugram', href: '/ibo-preparation-gurugram' },
      { label: 'Gurugram NEET classes', href: '/biology-classes-gurgaon' },
    ],
    localContext:
      "Gurugram has one of India's most concentrated IB/Cambridge/CBSE-International school clusters — Pathways World School Aravali, Scottish High, DPS International, Heritage Xperiential, GD Goenka Global, and Lancers International all sit within a 15 km radius. Most of our Gurugram cohort is in IB HL Biology; Campbell Biology is canonical for both IB HL and NSEB, so preparation runs in parallel rather than stacked. Class 11 start in July is ideal; students in DLF Phase 1-5 and Sohna Road who had NEET-focused prep earlier often join mid-Year-11 and follow a compressed track.",
    commuteContext:
      'Sector 51 centre (M2K Corporate Park) is 8-12 minutes from DLF Phase 5 via Golf Course Road, 15-18 minutes from DLF Phase 1-4 and Sohna Road, and 20-25 minutes from Sector 82-92 and Manesar. HUDA City Centre metro is 10 minutes away; Sector 53-54 metro is 5 minutes. Students in outer sectors (93+) or Manesar typically choose the online cohort with optional Saturday intensives. The centre operates blended weekday-evening + Saturday schedules designed to fit around DPS Gurgaon, Pathways, and Scottish High term calendars.',
  },
  {
    slug: 'noida',
    city: 'Noida',
    region: 'Delhi NCR',
    state: 'UP',
    pitch:
      'Noida Biology Olympiad coaching — NSEB, INBO for students across Sectors 15-150 and Greater Noida.',
    intro:
      'Noida has a large CBSE and IB school cohort feeding NSEB registrations. Amity International, DPS Noida, Pathways Noida, Lotus Valley, and The Heritage School are major olympiad feeders. Our programme is online for Noida students with Delhi-timezone live classes; offline option available at our South Extension Delhi centre for students in Sectors 15-50 range.',
    schoolCatchment: [
      'Amity International School',
      'DPS Noida',
      'Pathways School Noida',
      'Lotus Valley International',
      'The Heritage School',
      'Delhi Public School Noida',
    ],
    faqs: [
      ...commonFaqsBase('Noida'),
      {
        question: 'Is there an offline olympiad centre in Noida itself?',
        answer:
          'Currently our closest offline centres are at South Extension (Delhi) and Sector 51 (Gurugram). Noida Sectors 15-50 students often choose South Extension (30-45 min via DND). Greater Noida students typically opt for online cohort due to distance. In-person lab practical sessions are scheduled during intensive weekends in Delhi.',
      },
    ],
    relatedLinks: [
      { label: 'NSEB coaching', href: '/nseb-coaching' },
      { label: 'INBO coaching', href: '/inbo-coaching' },
      { label: 'Noida NEET classes', href: '/biology-classes-noida' },
      { label: 'Delhi olympiad hub', href: '/biology-olympiads/india/delhi' },
    ],
    localContext:
      'Noida and Greater Noida have a fast-growing IB/Cambridge cohort — Amity International, DPS Noida, Pathways Noida, Lotus Valley, and The Heritage School send students to NSEB each November, though total participation is lower than Gurugram and South Delhi (historically 60-100 students across Noida schools). The Noida profile is distinctive because many students are children of professionals working in Delhi/Gurugram corporate hubs — schedule-sensitive, and the parents explicitly choose NSEB as a college-application hedge for US/UK applications. Noida cohort tends to start later (Class 11 Q3 - Q4) because school NEET coaching fills the earlier months. Our programme includes a compressed 6-month sprint track for late-start Noida students targeting NSEB in their Class 12 year.',
    commuteContext:
      'No physical Cerebrum centre in Noida. Students in Sectors 15-50 can reach our South Extension Delhi centre in 35-50 min via DND Flyway. Greater Noida and Sectors 82+ students are too far for offline — standard path is the online cohort with Saturday lab intensives (once monthly) scheduled at the Delhi centre. IST timezone matches the full Noida school day.',
  },
  {
    slug: 'faridabad',
    city: 'Faridabad',
    region: 'Delhi NCR',
    state: 'HR',
    pitch:
      'Faridabad Biology Olympiad coaching with offline centre at Sector 17 plus online cohort.',
    intro:
      'Faridabad students benefit from our Sector 17 offline centre plus the online national cohort. Key feeder schools include Delhi Public School Faridabad, Manav Rachna International School, Modern Delhi Public School, Apeejay, and Ryan International. Our programme is scheduled to avoid school hour conflicts and includes Saturday intensives for practical lab skills.',
    inCentre: { label: 'Faridabad centre (Sector 17)', href: '/biology-classes-faridabad' },
    schoolCatchment: [
      'Delhi Public School Faridabad',
      'Manav Rachna International School',
      'Modern Delhi Public School',
      'Apeejay School',
      'Ryan International',
      'The Shri Ram School Faridabad',
    ],
    faqs: [
      ...commonFaqsBase('Faridabad'),
      {
        question: 'Is your Faridabad centre close to NIT and Old Faridabad?',
        answer:
          'Our Sector 17 centre is 10-15 minutes from NIT Faridabad, Old Faridabad, and Sector 14-19 residential clusters. Greater Faridabad (Sector 80+) and Ballabhgarh students usually join the online cohort.',
      },
    ],
    relatedLinks: [
      { label: 'NSEB coaching', href: '/nseb-coaching' },
      { label: 'INBO coaching', href: '/inbo-coaching' },
      { label: 'Faridabad NEET classes', href: '/biology-classes-faridabad' },
      { label: 'Delhi olympiad hub', href: '/biology-olympiads/india/delhi' },
    ],
    localContext:
      'Faridabad has a strong CBSE+International cohort centred on DPS Faridabad, Manav Rachna International, Modern DPS, Apeejay, and Ryan International. NSEB participation has grown steadily year-over-year as more Faridabad schools formalise olympiad registration via IAPT. The Faridabad profile tends to blend serious NEET aspirants with olympiad track students — we see a higher proportion of students pursuing both simultaneously, which suits our integrated programme design. NSEB qualification from Faridabad sits near the national 1% average with upward trajectory; our students from NIT Faridabad and Sector 14-19 cluster have historically tracked above average due to stronger school-level biology foundations.',
    commuteContext:
      'Sector 17 offline centre is 10-15 minutes from NIT Faridabad, Old Faridabad, and Sectors 14-19. Sector 21, 75, and 86 are 20-30 minutes. Greater Faridabad (Sector 80+), Ballabhgarh, and Surajkund students typically opt for the online cohort due to distance; monthly Saturday lab intensives at the centre cover practical skills. Students from Palwal or more distant NCR townships join online fully.',
  },
  {
    slug: 'rohini',
    city: 'Rohini',
    region: 'Delhi NCR',
    state: 'DL',
    pitch:
      'Rohini Biology Olympiad coaching — online cohort for North Delhi students with offline option at South Extension.',
    intro:
      'Rohini and North Delhi students (Pitampura, Model Town, Ashok Vihar, Shalimar Bagh, Punjabi Bagh) access our programme online with Delhi-timezone live classes. Students who need offline support visit the South Extension centre; Rohini is 25-35 minutes by metro (Red Line → Yellow Line → Pink Line to South Extension).',
    schoolCatchment: [
      'Maharaja Agrasen Model School',
      'Rukmini Devi Public School',
      'Delhi Public School Rohini',
      'MM Public School',
      'Apeejay School Pitampura',
    ],
    faqs: [
      ...commonFaqsBase('Rohini'),
      {
        question: 'How do Rohini students reach the South Extension centre?',
        answer:
          'Rohini East or West metro (Red Line) to Kashmere Gate (Yellow Line) to INA to Moolchand then Pink Line to South Extension — total journey 30-40 minutes. Most Rohini students join online cohort due to commute. Online live classes are scheduled to match Delhi school timings.',
      },
    ],
    relatedLinks: [
      { label: 'NSEB coaching', href: '/nseb-coaching' },
      { label: 'Rohini NEET coaching', href: '/neet-coaching-rohini' },
      { label: 'Delhi olympiad hub', href: '/biology-olympiads/india/delhi' },
      { label: 'All India cities', href: '/biology-olympiads' },
    ],
    localContext:
      'Rohini and North Delhi have a strong CBSE cohort that has traditionally been NEET-focused rather than olympiad-track — students at Maharaja Agrasen Model, Rukmini Devi Public School, DPS Rohini, and MM Public School typically start olympiad prep as a NEET-strengthening exercise rather than a stand-alone goal. This is shifting as Pitampura and Model Town schools push NSEB registration more actively. Most students target NSEB in Class 12 after a dedicated Class 11 foundation year; the Campbell depth carries over into NEET rank improvement even if INBO does not convert.',
    commuteContext:
      'Our Rohini DC Chowk centre serves North Delhi directly (Pitampura, Model Town, Shalimar Bagh, Ashok Vihar within 15-25 min). Students who want access to the flagship South Extension centre travel 30-45 minutes via Red Line → Yellow Line → Pink Line. For most Rohini students, the online cohort with Rohini centre visits for Saturday intensives is optimal — classes scheduled to fit Delhi school afternoon timings.',
  },
  {
    slug: 'mumbai',
    city: 'Mumbai',
    region: 'West India',
    state: 'MH',
    pitch:
      'Mumbai Biology Olympiad coaching — online cohort for students across South Mumbai, Bandra-Worli, Andheri, Thane, and Navi Mumbai.',
    intro:
      'Mumbai has a strong IB and Cambridge school cohort — Dhirubhai Ambani International, Bombay Scottish, Ecole Mondiale, Oberoi International, Jamnabai Narsee, Aditya Birla World Academy. Our programme is online for Mumbai students with Mumbai-timezone live classes scheduled around school hours. The curriculum aligns with IB HL Biology and extends into olympiad-depth topics.',
    schoolCatchment: [
      'Dhirubhai Ambani International School',
      'Bombay Scottish School',
      'Ecole Mondiale World School',
      'Oberoi International School',
      'Jamnabai Narsee School',
      'Aditya Birla World Academy',
      'BD Somani International School',
    ],
    faqs: [
      ...commonFaqsBase('Mumbai'),
      {
        question: 'Does the live class schedule work for Mumbai school timings?',
        answer:
          'Yes. Live weekday classes are scheduled 5:30-8:00 PM IST to accommodate Mumbai school hours. Weekend intensive blocks run Saturday 10:00 AM - 1:00 PM IST. All sessions are recorded for students with school-conflict days.',
      },
      {
        question: 'Is there an offline centre in Mumbai?',
        answer:
          'Not currently. Mumbai students join our online cohort exclusively. For hands-on practical lab sessions we offer optional intensive weekends in Delhi twice a year (travel cost on student).',
      },
    ],
    relatedLinks: [
      { label: 'NSEB coaching', href: '/nseb-coaching' },
      { label: 'INBO coaching', href: '/inbo-coaching' },
      { label: 'IB Biology Mumbai', href: '/ib-biology/mumbai' },
      { label: 'All India cities', href: '/biology-olympiads' },
    ],
    localContext:
      "Mumbai is one of India's top IB/Cambridge school markets — Dhirubhai Ambani International School, Bombay Scottish, Ecole Mondiale, Oberoi International, Jamnabai Narsee, Aditya Birla World Academy, and BD Somani International are all IBDP centres. Most of our Mumbai cohort is in IB HL Biology running NSEB as the parallel Indian credential. NSEB participation in Mumbai is smaller in absolute numbers than Delhi or Gurugram but IB HL students arrive with strong conceptual foundations. Mumbai students often target USABO or IBO alongside NSEB because their profile is typically US-university-bound.",
    commuteContext:
      "No offline Cerebrum centre in Mumbai; fully online cohort. Live weekday classes run 5:30-8:00 PM IST to avoid conflicts with mornings commute from Bandra, Powai, Navi Mumbai, and Thane. All sessions recorded for students in school-exam-week overlap. Twice-yearly Delhi lab intensive weekends available for students who want hands-on practical sessions — travel at student's cost.",
  },
  {
    slug: 'bangalore',
    city: 'Bangalore',
    region: 'South India',
    state: 'KA',
    pitch:
      'Bangalore Biology Olympiad coaching — online for students across Koramangala, Indiranagar, Whitefield, HSR, and Electronic City.',
    intro:
      "Bangalore has one of India's largest IB and Cambridge school cohorts. Indus International, Inventure Academy, Canadian International, Stonehill, Greenwood, Ekya School feed NSEB and INBO registrations. Our programme is online with Bangalore-timezone live classes and same curriculum depth as Delhi NCR students.",
    schoolCatchment: [
      'Indus International School',
      'Inventure Academy',
      'Canadian International School',
      'Stonehill International School',
      'Greenwood High',
      'Ekya School',
      'Trio World Academy',
      'Mallya Aditi International School',
    ],
    faqs: [
      ...commonFaqsBase('Bangalore'),
      {
        question: 'Can my child join from Whitefield / Electronic City given the commute?',
        answer:
          'Yes — the programme is fully online. No commute involved. Live classes run on Bangalore IST timings; recordings available if students have traffic-delayed school schedules.',
      },
    ],
    relatedLinks: [
      { label: 'NSEB coaching', href: '/nseb-coaching' },
      { label: 'INBO coaching', href: '/inbo-coaching' },
      { label: 'IB Biology Bangalore', href: '/ib-biology/bangalore' },
      { label: 'All India cities', href: '/biology-olympiads' },
    ],
    localContext:
      "Bangalore has one of India's larger IB/Cambridge cohorts — Indus International, Inventure Academy, Canadian International, Stonehill International, Greenwood High, Ekya School, Trio World Academy, and Mallya Aditi International all feed NSEB, INBO, and IBO registrations. The Bangalore olympiad profile skews younger than Delhi because Bangalore IB schools often introduce Campbell Biology in pre-IB years, so students arrive with a head start. A secondary CBSE cluster from Koramangala, HSR, Indiranagar, and Whitefield uses olympiad prep primarily as a NEET-rank improvement strategy.",
    commuteContext:
      "No offline centre in Bangalore; fully online cohort. Live weekday classes run 5:30-8:00 PM IST which works across Koramangala, Indiranagar, HSR, Whitefield, and Electronic City school evening windows. Weekend intensive blocks (Saturdays 10 AM - 1 PM IST) work for students at Inventure, Stonehill, Canadian International (which have later school days). Full session recording means traffic delays from Whitefield/E-City don't force missed classes.",
  },
  {
    slug: 'hyderabad',
    city: 'Hyderabad',
    region: 'South India',
    state: 'TG',
    pitch:
      'Hyderabad Biology Olympiad coaching — online programme for students across Banjara Hills, Jubilee Hills, HITEC City, Gachibowli.',
    intro:
      'Hyderabad has a growing IB and CBSE-International school cohort — Chirec International, Oakridge International, Glendale Academy, Indus International, Meridian School. Our online programme serves Hyderabad students with IST live classes and full Campbell coverage.',
    schoolCatchment: [
      'Chirec International School',
      'Oakridge International School',
      'Glendale Academy',
      'Indus International School Hyderabad',
      'Meridian School Banjara Hills',
      'DPS Secunderabad',
    ],
    faqs: [...commonFaqsBase('Hyderabad')],
    relatedLinks: [
      { label: 'NSEB coaching', href: '/nseb-coaching' },
      { label: 'INBO coaching', href: '/inbo-coaching' },
      { label: 'IB Biology Hyderabad', href: '/ib-biology/hyderabad' },
      { label: 'All India cities', href: '/biology-olympiads' },
    ],
    localContext:
      'Hyderabad has a growing IB/Cambridge cluster centred on Banjara Hills, Jubilee Hills, HITEC City, and Gachibowli — Chirec International, Oakridge International, Glendale Academy, Indus International Hyderabad, Meridian School, and DPS Secunderabad are primary feeders. NSEB registration from Hyderabad IB schools has grown year-over-year as schools formalise IAPT submissions. The profile is similar to Bangalore — a mix of IB-track dual students and CBSE NEET aspirants using olympiad prep for rank improvement. Class 11 start is most common; students at Chirec and Oakridge often combine NSEB prep with USABO/IBO targets because of international school orientation.',
    commuteContext:
      'No offline Cerebrum centre in Hyderabad; fully online cohort. Live classes scheduled 5:30-8:00 PM IST which fits standard Banjara Hills / Jubilee Hills school evening windows. HITEC City and Gachibowli students with traffic-heavy commutes rely on recordings. Twice-yearly Delhi lab intensive weekends available for hands-on practical sessions.',
  },
  {
    slug: 'chennai',
    city: 'Chennai',
    region: 'South India',
    state: 'TN',
    pitch:
      'Chennai Biology Olympiad coaching — online programme for students across Adyar, ECR, T Nagar, OMR.',
    intro:
      'Chennai has a concentrated IB/Cambridge cluster — Abacus Montessori, American International School, British International School, Kumon International, Sishya. Our online programme serves Chennai students with IST live classes and full Campbell coverage.',
    schoolCatchment: [
      'American International School Chennai',
      'British International School',
      'Good Shepherd International',
      'Sishya School',
      'Kumon International School',
      'Padma Seshadri Bala Bhavan',
    ],
    faqs: [...commonFaqsBase('Chennai')],
    relatedLinks: [
      { label: 'NSEB coaching', href: '/nseb-coaching' },
      { label: 'INBO coaching', href: '/inbo-coaching' },
      { label: 'IB Biology Chennai', href: '/ib-biology/chennai' },
      { label: 'All India cities', href: '/biology-olympiads' },
    ],
    localContext:
      "Chennai has a concentrated IB/Cambridge cluster along ECR, Adyar, and Nungambakkam — American International School Chennai, British International, Good Shepherd International, Sishya School, and Padma Seshadri Bala Bhavan (IBDP track) are primary feeders. Distinctively, many Chennai students pair NSEB prep with SAT/US-college application preparation, because the Chennai IB cohort is heavily US-bound. Our Chennai cohort's profile includes a significant group pursuing USABO or BBO alongside NSEB for dual credentialing. NSEB participation numbers are modest in absolute terms but qualification rates per participant are above average, especially from AISC and KC High.",
    commuteContext:
      'No offline Cerebrum centre in Chennai; fully online cohort. Live classes scheduled 5:30-8:00 PM IST which works across Adyar, ECR, T Nagar, Nungambakkam, Anna Nagar, and OMR school windows. OMR students with longer commutes use recordings. Saturday 10 AM IST weekend intensives match Chennai Class 12 weekend coaching schedules.',
  },
  {
    slug: 'pune',
    city: 'Pune',
    region: 'West India',
    state: 'MH',
    pitch:
      'Pune Biology Olympiad coaching — online programme for students across Koregaon Park, Viman Nagar, Baner, Kalyani Nagar.',
    intro:
      'Pune has a strong CBSE and growing IB cohort — Mercedes-Benz International, Symbiosis International, Vibgyor High, Victorious Kidss, Indus International. Our online programme runs on IST timings with full Campbell coverage.',
    schoolCatchment: [
      'Mercedes-Benz International School',
      'Symbiosis International School',
      'Vibgyor High School',
      'Victorious Kidss Educares',
      'Indus International School Pune',
      'DPS Pune',
    ],
    faqs: [...commonFaqsBase('Pune')],
    relatedLinks: [
      { label: 'NSEB coaching', href: '/nseb-coaching' },
      { label: 'INBO coaching', href: '/inbo-coaching' },
      { label: 'IB Biology Pune', href: '/ib-biology/pune' },
      { label: 'All India cities', href: '/biology-olympiads' },
    ],
    localContext:
      'Pune has a growing IB/Cambridge cluster serving Koregaon Park, Viman Nagar, Baner, and Kalyani Nagar — Mercedes-Benz International, Symbiosis International, Vibgyor High, Victorious Kidss Educares, Indus International Pune, and DPS Pune are the main olympiad feeders. Pune NSEB participation has historically been moderate but quality is high — the IB cohort here tends to be academically rigorous and arrives at olympiad prep from strong Science-foundation courses. Pune students frequently combine NSEB with NEET rank improvement because many also target state quota medical admissions. Class 11 start is standard.',
    commuteContext:
      'No offline Cerebrum centre in Pune; fully online cohort. Live classes scheduled 5:30-8:00 PM IST which fits Pune school evening windows across Koregaon Park, Viman Nagar, Baner, and Kalyani Nagar. Students in outer Pune clusters (Hinjewadi, Wakad) rely more on recordings due to evening traffic patterns. Saturday 10 AM IST weekend intensives are Pune-friendly.',
  },
  {
    slug: 'kolkata',
    city: 'Kolkata',
    region: 'East India',
    state: 'WB',
    pitch:
      'Kolkata Biology Olympiad coaching — online programme for Salt Lake, New Town, Alipore, Ballygunge students.',
    intro:
      "Kolkata feeds NSEB via CBSE and ICSE schools including La Martiniere, St Xavier's Collegiate, Calcutta International, Modern High, Heritage School. Our online programme delivers the same curriculum as Delhi NCR students with IST live classes.",
    schoolCatchment: [
      'La Martiniere for Boys / Girls',
      "St Xavier's Collegiate School",
      'Calcutta International School',
      'Modern High School for Girls',
      'Heritage School',
      'South Point School',
    ],
    faqs: [...commonFaqsBase('Kolkata')],
    relatedLinks: [
      { label: 'NSEB coaching', href: '/nseb-coaching' },
      { label: 'INBO coaching', href: '/inbo-coaching' },
      { label: 'All India cities', href: '/biology-olympiads' },
    ],
    localContext:
      "Kolkata's olympiad profile is shaped by its legacy ICSE and CBSE schools — La Martiniere for Boys/Girls, St Xavier's Collegiate, Calcutta International School, Modern High School for Girls, Heritage School, and South Point have produced olympiad qualifiers consistently over years. Kolkata students historically lean more toward ICSE depth which translates well to olympiad rigour. NSEB participation from Kolkata schools is moderate in volume but quality is high — strong academic culture, especially in Ballygunge, Alipore, and Salt Lake catchments. Our Kolkata cohort has a notable international-application contingent (US/UK/Singapore) where olympiad credentials are decisive.",
    commuteContext:
      "No offline Cerebrum centre in Kolkata; fully online cohort. Live classes scheduled 5:30-8:00 PM IST works across Salt Lake, New Town, Ballygunge, Alipore, and Rajarhat school evening windows. All sessions recorded for students with school-exam conflict days. Saturday 10 AM IST weekend intensives fit Kolkata's strong weekend coaching culture.",
  },
]

export function findOlympiadCity(slug: string): OlympiadCityEntry | null {
  return olympiadCities.find((c) => c.slug === slug) ?? null
}
