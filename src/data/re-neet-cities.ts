/**
 * Shared config for RE-NEET 2026 city-specific landing pages.
 * Used by /re-neet-2026-{kota,delhi,hyderabad,mumbai}/page.tsx.
 *
 * Each entry produces a BestVerticalConfig-shaped object with the
 * canonical city-specific positioning, pricing and FAQs.
 */

export type ReNEETCityKey = 'kota' | 'delhi' | 'hyderabad' | 'mumbai'

export interface ReNEETCityProfile {
  slug: string
  cityDisplayName: string
  cityLowercase: string
  ribbonContext: string
  introContext: string
  studentVolume: string
  competitorContext: string
  uniqueAngle: string
  testimonialCity: string
}

export const reNEETCityProfiles: Record<ReNEETCityKey, ReNEETCityProfile> = {
  kota: {
    slug: 're-neet-2026-kota',
    cityDisplayName: 'Kota',
    cityLowercase: 'kota',
    ribbonContext: 'Kota Dropper Alternative · Online · No Relocation Required',
    introContext:
      "Kota is India's highest-concentration NEET dropper hub — but the cancellation hit Kota families hardest. Hostel + mess + relocation costs continue while the exam is rescheduled. Cerebrum's online RE-NEET crash course is the no-relocation alternative — same AIIMS-trained biology depth without continuing to pay for Kota infrastructure.",
    studentVolume: '~85,000 NEET aspirants in Kota (largest single-city concentration)',
    competitorContext:
      'XYZ Coaching (largest national NEET chain), the 2nd-largest national NEET chain, other Kota-origin chains — all Kota-based generalist chains',
    uniqueAngle: 'No relocation, no hostel, no mess — same RE-NEET depth from your home',
    testimonialCity: 'Kota',
  },
  delhi: {
    slug: 're-neet-2026-delhi',
    cityDisplayName: 'Delhi NCR',
    cityLowercase: 'delhi',
    ribbonContext: 'Delhi NCR · 6 Offline Centres + Online · AIIMS-Trained Faculty',
    introContext:
      "Delhi NCR has India's second-highest concentration of NEET aspirants (after Kota), spread across South Extension, Rohini, Green Park, Gurugram, Faridabad and Noida. Cerebrum operates 5 offline centres across NCR + online live classes. The 6–8 week RE-NEET window is exactly when small-batch attention matters most.",
    studentVolume:
      '~60,000 NEET aspirants across Delhi NCR (Delhi + Gurugram + Faridabad + Noida + Ghaziabad)',
    competitorContext: 'the 2nd-largest national NEET chain, the largest national NEET chain, other IIT-JEE-first coachings, other online-only platforms Vidyapeeth (offline Delhi centres)',
    uniqueAngle: '6 NCR centres + the same AIIMS-trained faculty online',
    testimonialCity: 'Delhi NCR',
  },
  hyderabad: {
    slug: 're-neet-2026-hyderabad',
    cityDisplayName: 'Hyderabad',
    cityLowercase: 'hyderabad',
    ribbonContext: 'Hyderabad · Online Live · Telugu / English Tracks · AIIMS Faculty',
    introContext:
      "Hyderabad has a large NEET aspirant pool from Telangana + Andhra Pradesh combined. Local coaching chains (other South-Indian chains, a leading national educational institution, the 2nd-largest national NEET chain Hyderabad) dominate offline. Cerebrum's biology-only online RE-NEET crash is the specialist add-on most Hyderabad students lack — AIIMS-trained biology depth that generalist Telugu-speaking institutes cannot match.",
    studentVolume: '~45,000 NEET aspirants in Telangana + AP (Hyderabad hub)',
    competitorContext: 'other South-Indian chains, a leading national educational institution, the 2nd-largest national NEET chain Hyderabad, other IIT-JEE-first coachings',
    uniqueAngle:
      'Biology-only specialist alongside your other South-Indian chains / a leading national educational institution / the 2nd-largest national NEET chain main coaching',
    testimonialCity: 'Hyderabad',
  },
  mumbai: {
    slug: 're-neet-2026-mumbai',
    cityDisplayName: 'Mumbai',
    cityLowercase: 'mumbai',
    ribbonContext: 'Mumbai · Online Live · IST Evening Batches · AIIMS Faculty',
    introContext:
      "Mumbai has a strong NEET aspirant pool concentrated in Andheri, Thane and Borivali. Local coaching (Mahesh Tutorials, the largest national NEET chain Mumbai, the 2nd-largest national NEET chain) dominates offline. Cerebrum's biology-only online RE-NEET crash gives Mumbai students AIIMS-trained biology depth without the Mumbai-traffic commute to offline centres.",
    studentVolume: '~30,000 NEET aspirants in Mumbai (Andheri + Thane + Borivali concentrated)',
    competitorContext: 'Mahesh Tutorials, the largest national NEET chain Mumbai, the 2nd-largest national NEET chain Mumbai, other online-only platforms',
    uniqueAngle: 'No commute, no traffic — same biology depth from home',
    testimonialCity: 'Mumbai',
  },
}
