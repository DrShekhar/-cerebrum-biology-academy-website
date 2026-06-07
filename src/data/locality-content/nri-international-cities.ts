/**
 * Rich data for thin international NRI NEET coaching pages.
 * Each entry powers a /neet-coaching-{city-country} page with
 * NRI-specific context (Indian community size, school landscape,
 * time zone, currency, target colleges via NRI quota).
 */

export interface NRIInternationalCity {
  slug: string
  city: string
  country: string
  region: 'Gulf' | 'Africa' | 'Southeast Asia' | 'East Asia'
  timezone: string
  /** Hours offset from IST (negative = behind IST) */
  istOffset: number
  /** Indian diaspora estimate */
  indianCommunitySize: string
  /** Top Indian / international curriculum schools serving NEET aspirants */
  indianSchools: string[]
  /** What batch slot fits this city's local evening */
  localBatchSlot: string
  /** Approximate annual ticket for NRI families paying in foreign currency */
  pricingNote: string
  /** Local context paragraph (100-150 words) */
  cityContext: string
  /** Custom FAQ set */
  faqs: { question: string; answer: string }[]
}

export const NRI_INTERNATIONAL_CITIES: Record<string, NRIInternationalCity> = {
  'accra-ghana': {
    slug: 'accra-ghana',
    city: 'Accra',
    country: 'Ghana',
    region: 'Africa',
    timezone: 'GMT (UTC+0)',
    istOffset: -5.5,
    indianCommunitySize: '~15,000 Indian-origin residents (long-standing business community)',
    indianSchools: ['DPS International Ghana', 'Lincoln Community School Accra', 'Ghana International School', 'Cambridge International School', 'Tema International School', 'Galaxy International School'],
    localBatchSlot: 'GMT 12:00 PM – 2:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year depending on tier. Sibling discounts available.',
    cityContext:
      'Accra hosts one of West Africa\'s most established Indian business communities — generations of Gujarati and Sindhi families have built trading houses serving Ghana since the 1950s. Indian-origin teenagers preparing for NEET typically attend DPS International Ghana, Lincoln Community School, or Ghana International School, all of which use Cambridge IGCSE / A-Level frameworks. Direct NEET-aligned NCERT coaching is non-existent locally, making online live coaching from Cerebrum the only viable path to Indian medical college admissions. NRI quota at AIIMS, JIPMER, and select state colleges gives Accra-based Indian aspirants substantial competitive advantage.',
    faqs: [
      { question: 'What NEET options does an Indian-origin Class 12 student in Accra have?', answer: 'Two paths: (1) NRI quota at AIIMS Delhi / JIPMER Puducherry / select state colleges (15% of seats reserved for NRIs at most colleges), (2) all-India NEET quota competing as any other Indian aspirant. We coach both — biology cut-off targets calibrated to which path you\'re aiming for.' },
      { question: 'My child attends DPS International Ghana / Lincoln. Is there an IGCSE/A-Level + NEET clash?', answer: 'No — we run a parallel track. IGCSE / A-Level Biology is broader; NEET is NCERT-deep. Our Class 11-12 programme bridges from IGCSE / A-Level framing to NCERT line-by-line in the first 4-6 weeks. Students typically manage both syllabi.' },
      { question: 'What\'s the time-zone schedule from Accra (GMT)?', answer: 'GMT 12:00 PM – 2:30 PM matches IST 5:30 PM – 8:00 PM (our India evening batch). 3 days a week + weekend tests. Recordings available for any session.' },
      { question: 'How is study material shipped to Accra?', answer: 'DHL / FedEx tracked courier to Accra address. 10-14 days delivery. Customs duty (if any) is buyer-side per Ghana import regulations.' },
      { question: 'How do we pay from Ghana — INR or USD?', answer: 'USD via international wire / TransferWise / SWIFT. We provide invoice in USD. EMI available 3/6/12 months.' },
    ],
  },
  'nairobi-kenya': {
    slug: 'nairobi-kenya',
    city: 'Nairobi',
    country: 'Kenya',
    region: 'Africa',
    timezone: 'EAT (UTC+3)',
    istOffset: -2.5,
    indianCommunitySize: '~80,000 Indian-origin residents (East Africa\'s largest Indian diaspora)',
    indianSchools: ['Oshwal Academy Nairobi', 'Visa Oshwal Education', 'Premier Academy', 'Brookhouse School', 'Aga Khan Academy Nairobi', 'Hillcrest International School', 'Braeburn International School'],
    localBatchSlot: 'EAT 3:00 PM – 5:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year. Kenya-based families benefit from substantial sibling discounts.',
    cityContext:
      'Nairobi has East Africa\'s largest Indian-origin community — generations of Gujarati Patidar, Punjabi, Goan, and Sindhi families have lived in Kenya since pre-independence. Oshwal Academy, Visa Oshwal Education, and Premier Academy are the dominant feeders for Indian medical aspirants. Many Nairobi NEET students target NRI quota seats at AIIMS Delhi, JIPMER Puducherry, and Karnataka private colleges (Manipal, KMC) where their Kenyan-Indian background opens specific reservation pools. Local coaching options are limited; online live from Cerebrum is the established path.',
    faqs: [
      { question: 'What medical college pathways are open to Indian-origin Nairobi students?', answer: 'Three: (1) NRI quota at AIIMS Delhi / JIPMER / Manipal / KMC Mangalore (15% reservation), (2) all-India quota competing with Indian aspirants, (3) Kenyan domicile path at Kenya medical colleges if OCI status allows. We focus on (1) and (2) — biology cut-off ~330-345/360 for NRI quota at premium colleges.' },
      { question: 'My child is at Oshwal Academy / Premier Academy. Schedule fit?', answer: 'EAT 3:00 PM – 5:30 PM batch slot. School dismissal at Oshwal is typically 3 PM, so 30-min buffer. Premier Academy similar. Works cleanly.' },
      { question: 'How does the time difference work for live classes?', answer: 'EAT is IST minus 2.5 hours. Our India evening batch (5:30-8 PM IST) is 3:00-5:30 PM Nairobi time. Perfect after-school window.' },
      { question: 'Will study material shipping to Nairobi work?', answer: 'Yes — DHL / FedEx tracked courier, 10-12 days. Many current Cerebrum students in Nairobi receive material reliably.' },
      { question: 'NRI quota for Karnataka private medical colleges?', answer: 'KMC Mangalore, Manipal MMMC, JSS Mysuru all reserve NRI seats. Biology cut-off ~325-345/360. Cerebrum biology programme targets 340+/360 to give families options.' },
    ],
  },
  'kampala-uganda': {
    slug: 'kampala-uganda',
    city: 'Kampala',
    country: 'Uganda',
    region: 'Africa',
    timezone: 'EAT (UTC+3)',
    istOffset: -2.5,
    indianCommunitySize: '~15,000 Indian-origin residents (rebuilding community post-1972 expulsion)',
    indianSchools: ['International School of Uganda', 'Aga Khan Academy Kampala', 'Galaxy International School', 'GEMS Cambridge International School', 'Kabira International School'],
    localBatchSlot: 'EAT 3:00 PM – 5:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Uganda\'s Indian community is rebuilding after the 1972 expulsion under Idi Amin. The post-2000 wave of Indian business families in Kampala has grown to ~15,000, concentrated around the Kampala business district, Bugolobi, and Naguru. Children typically attend International School of Uganda, Aga Khan Academy, or Galaxy International. NEET aspirants from Kampala target NRI quota seats and increasingly use online specialist coaching to compensate for local options being limited.',
    faqs: [
      { question: 'Indian community medical-college pathway from Kampala?', answer: 'NRI quota at AIIMS Delhi, JIPMER, Manipal, KMC, plus all-India quota. Biology cut-off ~330-345 for NRI quota premium colleges.' },
      { question: 'Aga Khan Academy / ISU schedule fit with Cerebrum?', answer: 'EAT 3-5:30 PM batch works after Kampala school dismissals.' },
      { question: 'Will printed material reach Kampala?', answer: 'Yes — DHL 10-14 days.' },
      { question: 'How do we handle payment in Uganda?', answer: 'USD wire or TransferWise.' },
    ],
  },
  'dar-es-salaam-tanzania': {
    slug: 'dar-es-salaam-tanzania',
    city: 'Dar es Salaam',
    country: 'Tanzania',
    region: 'Africa',
    timezone: 'EAT (UTC+3)',
    istOffset: -2.5,
    indianCommunitySize: '~50,000 Indian-origin residents (long-standing community)',
    indianSchools: ['HH The Aga Khan Mzizima Secondary School', 'International School of Tanganyika', 'Hindu Mandal Academy', 'Loyola High School', 'Feza Boys Secondary School'],
    localBatchSlot: 'EAT 3:00 PM – 5:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Dar es Salaam has one of East Africa\'s largest Indian-origin communities — primarily Gujarati and Goan families with roots going back to British East Africa era. Hindu Mandal Academy and Aga Khan Mzizima are the dominant feeders for Indian medical aspirants. Tanzania-based Indian students often target NRI quota seats at AIIMS, JIPMER, and Mangalore / Manipal colleges.',
    faqs: [
      { question: 'Pathway from Dar es Salaam to Indian medical college?', answer: 'NRI quota (15% reservation) at AIIMS / JIPMER / private deemed universities; all-India quota; OCI-based Tanzania medical college pathway.' },
      { question: 'Hindu Mandal / Aga Khan Mzizima schedule fit?', answer: 'EAT afternoon batch (3-5:30 PM) fits after-school cleanly.' },
      { question: 'Will material reach Dar es Salaam?', answer: 'Yes via DHL, 10-12 days.' },
      { question: 'Pricing in Tanzanian shilling?', answer: 'We invoice in USD; pay via international wire.' },
    ],
  },
  'al-wakrah-qatar': {
    slug: 'al-wakrah-qatar',
    city: 'Al Wakrah',
    country: 'Qatar',
    region: 'Gulf',
    timezone: 'AST (UTC+3)',
    istOffset: -2.5,
    indianCommunitySize: '~700,000 Indian-origin residents in Qatar (largest expat community)',
    indianSchools: ['Birla Public School', 'DPS Modern Indian School', 'Ideal Indian School', 'MES Indian School', 'Bhavan\'s Public School', 'Olive International School'],
    localBatchSlot: 'AST 3:00 PM – 5:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year. Most Qatari Indian families have substantial coaching budget.',
    cityContext:
      'Al Wakrah is Qatar\'s third-largest city and growing rapidly as Doha satellite. Indian community in Al Wakrah has grown alongside Qatar\'s 700,000+ Indian expat population — concentrated families work in oil + construction + services. Birla Public School, DPS Modern Indian School, MES Indian School, and Bhavan\'s are the dominant CBSE feeders. NEET aspirants from Al Wakrah typically target NRI quota seats at AIIMS / JIPMER / private deemed universities, with substantial coaching investment expected.',
    faqs: [
      { question: 'Birla Public School Al Wakrah student NEET pathway?', answer: 'CBSE / NCERT-aligned schools make NEET transition smooth. NRI quota at AIIMS Delhi / JIPMER / private colleges; all-India quota.' },
      { question: 'AST time zone — class schedule?', answer: 'AST 3-5:30 PM batch matches IST 5:30-8 PM. Excellent after-school fit.' },
      { question: 'Material shipping to Al Wakrah?', answer: 'DHL Qatar 5-7 days delivery.' },
      { question: 'Currency for payment?', answer: 'USD via wire, or QAR equivalent. Sibling discounts available.' },
    ],
  },
  'al-khobar-saudi-arabia': {
    slug: 'al-khobar-saudi-arabia',
    city: 'Al Khobar',
    country: 'Saudi Arabia',
    region: 'Gulf',
    timezone: 'AST (UTC+3)',
    istOffset: -2.5,
    indianCommunitySize: '~2.5 million Indian-origin residents in Saudi Arabia',
    indianSchools: ['International Indian School Dammam', 'Bharatiya Vidya Bhavan', 'Yara International School', 'DPS Modern Indian School Dammam', 'MES Indian School Saudi'],
    localBatchSlot: 'AST 3:00 PM – 5:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Al Khobar is Saudi Arabia\'s Eastern Province hub with substantial Indian community linked to oil + IT + medical services. International Indian School Dammam (which serves Al Khobar families) and Bhavan\'s are the dominant CBSE feeders. Saudi Indian families historically have very high medical-career aspiration; many target NRI quota at AIIMS Delhi and JIPMER Puducherry.',
    faqs: [
      { question: 'Pathway from Al Khobar to AIIMS Delhi?', answer: 'NRI quota at AIIMS Delhi requires NEET biology ~340-355/360. Available to children of Saudi-based Indians with documented OCI / NRI status. Cerebrum biology programme calibrates to this.' },
      { question: 'Schedule for International Indian School Dammam student?', answer: 'AST 3-5:30 PM batch (IST 5:30-8 PM). After school dismissal at 2 PM typical. Excellent fit.' },
      { question: 'Material delivery to Al Khobar?', answer: 'DHL / Saudi Post 5-7 days.' },
      { question: 'Ramadan schedule adjustment?', answer: 'Yes — Ramadan months we shift to 1.5 hour earlier slot accommodating fasting + Iftar.' },
    ],
  },
  'ho-chi-minh-vietnam': {
    slug: 'ho-chi-minh-vietnam',
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
    region: 'Southeast Asia',
    timezone: 'ICT (UTC+7)',
    istOffset: 1.5,
    indianCommunitySize: '~10,000 Indian-origin residents (growing IT + business expat community)',
    indianSchools: ['British International School HCMC', 'International School Ho Chi Minh City', 'European International School', 'Saigon South International School'],
    localBatchSlot: 'ICT 7:00 PM – 9:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Ho Chi Minh City\'s Indian community has grown significantly post-2010 as Indian IT companies and import-export businesses expanded into Vietnam. Children typically attend British International School HCMC or International School Ho Chi Minh City. NEET aspirants from HCMC pursue both NRI quota and all-India quota — Cerebrum live online via Zoom is the established path.',
    faqs: [
      { question: 'NRI quota access from Vietnam?', answer: 'Yes — Indian-origin Vietnam-resident families qualify for 15% NRI quota at AIIMS / JIPMER / private deemed universities, plus all-India quota.' },
      { question: 'British International School / ISHCMC schedule fit?', answer: 'ICT 7-9:30 PM batch matches IST 5:30-8 PM. Fits after school activity end.' },
      { question: 'Material delivery to HCMC?', answer: 'DHL Vietnam 7-9 days.' },
      { question: 'Currency for payment?', answer: 'USD via wire transfer.' },
    ],
  },
  'jakarta-indonesia': {
    slug: 'jakarta-indonesia',
    city: 'Jakarta',
    country: 'Indonesia',
    region: 'Southeast Asia',
    timezone: 'WIB (UTC+7)',
    istOffset: 1.5,
    indianCommunitySize: '~25,000 Indian-origin residents',
    indianSchools: ['Gandhi Memorial International School Jakarta', 'British International School Jakarta', 'Australian International School', 'Singapore Intercultural School', 'Jakarta Intercultural School'],
    localBatchSlot: 'WIB 7:00 PM – 9:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Jakarta has a substantial Indian community with strong Sindhi business roots dating back generations + a newer wave of Indian IT and corporate expats. Gandhi Memorial International School is the legacy Indian-curriculum school; British and Australian International Schools serve the more recent expat wave. NEET aspirants pursue NRI quota at AIIMS, JIPMER, Manipal, and KMC.',
    faqs: [
      { question: 'Pathway from Jakarta to Indian medical college?', answer: 'NRI quota at AIIMS / JIPMER / private deemed universities; all-India quota. Biology cut-off ~330-345/360 for NRI quota.' },
      { question: 'Gandhi Memorial / BIS Jakarta schedule fit?', answer: 'WIB evening (7-9:30 PM) matches IST evening batch.' },
      { question: 'Material shipping?', answer: 'DHL 7-9 days to Jakarta.' },
      { question: 'Time zone for tests?', answer: 'All exams in WIB (Jakarta) time; recordings available.' },
    ],
  },
  'manila-philippines': {
    slug: 'manila-philippines',
    city: 'Manila',
    country: 'Philippines',
    region: 'Southeast Asia',
    timezone: 'PHT (UTC+8)',
    istOffset: 2.5,
    indianCommunitySize: '~20,000 Indian-origin residents',
    indianSchools: ['Brent International School Manila', 'International School Manila', 'Faith Academy', 'Beacon School'],
    localBatchSlot: 'PHT 8:00 PM – 10:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Manila\'s Indian community is concentrated in Makati and Bonifacio Global City, primarily IT and finance professionals. Children attend International School Manila, Brent International, or Faith Academy. Some Manila Indian families also consider direct admission to Philippines medical colleges (which accept international applicants), but for those returning to India for MBBS, Cerebrum NEET coaching with NRI quota access is the path.',
    faqs: [
      { question: 'NEET vs Philippines MBBS direct admission?', answer: 'Both valid paths. Philippines medical colleges accept international applicants; NEET path opens AIIMS / JIPMER / Indian state colleges. We coach for NEET specifically — families assess both based on their preference for India vs Philippines medical practice.' },
      { question: 'Manila evening schedule clash?', answer: 'PHT 8-10:30 PM batch matches IST 5:30-8 PM. After-dinner slot.' },
      { question: 'Material to Makati / BGC?', answer: 'DHL Philippines 7-9 days.' },
      { question: 'How is the all-India NEET attempt managed from Manila?', answer: 'Family typically travels to nearest NEET center in India during exam (May). We coordinate exam-week logistics.' },
    ],
  },
  'lagos-nigeria': {
    slug: 'lagos-nigeria',
    city: 'Lagos',
    country: 'Nigeria',
    region: 'Africa',
    timezone: 'WAT (UTC+1)',
    istOffset: -4.5,
    indianCommunitySize: '~50,000 Indian-origin residents in Nigeria',
    indianSchools: ['Indian Language School Ikoyi', 'Lekki British International School', 'Greensprings School', 'Day Waterman College'],
    localBatchSlot: 'WAT 1:00 PM – 3:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Lagos has one of West Africa\'s largest Indian communities — generations of Gujarati, Sindhi, and Punjabi families have built businesses across textiles, pharmaceuticals, and steel. Indian Language School Ikoyi is the legacy Indian-curriculum school; Lekki British International serves both Indian and other expat families. NEET aspirants pursue NRI quota at AIIMS, JIPMER, Manipal, KMC, and private deemed universities.',
    faqs: [
      { question: 'Pathway from Lagos to Indian medical college?', answer: 'NRI quota at AIIMS / JIPMER / private deemed universities; all-India quota. Biology cut-off ~330-345/360 for NRI premium colleges.' },
      { question: 'Indian Language School Ikoyi / Lekki British schedule fit?', answer: 'WAT 1-3:30 PM batch (IST 5:30-8 PM) fits after-school cleanly.' },
      { question: 'Material delivery to Lagos?', answer: 'DHL / FedEx 12-14 days to Lagos. Customs duty paid by recipient.' },
      { question: 'Travel for NEET exam day?', answer: 'NEET India test centers; we coordinate timing 4-6 weeks in advance.' },
    ],
  },
}
