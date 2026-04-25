'use client'

import { OverseasCityLayout } from '@/components/international/overseas-city/OverseasCityLayout'

interface PageContentProps {
  faqs: Array<{ q: string; a: string }>
}

export default function PageContent({ faqs }: PageContentProps) {
  return (
    <OverseasCityLayout
      cityName="Calgary"
      country="Canada"
      heroPill="Online NEET Biology for Calgary / Alberta students"
      heroTagline="Live online NEET Biology classes for Indian-origin students in Calgary — Martindale, Saddle Ridge, Falconridge and across the NE corridor. Alberta Gr 11-12 + NEET dual prep."
      timezoneLabel="MST/MDT"
      timezoneStart="8:30 AM MST"
      communityStat="~80k"
      communityLabel="Indian-origin in Calgary"
      curriculumLabel="Bio 20/30"
      curriculumDescription="Alberta Gr 11-12 + NEET"
      nearestCentre="Dubai / India"
      nearestCentreLabel="Nearest NEET centres"
      curriculumBridgeTitle="Alberta Gr 11-12 bridge"
      curriculumBridgeBody="Alberta Biology 20/30 covers many NEET topics. We add the NEET-specific depth on human physiology, genetics, ecology. One preparation feeds both."
      examCentreBody={
        <>
          The NTA does not operate a NEET exam centre in Canada. Calgary students typically fly from{' '}
          <strong>YYC to Dubai</strong> (official NEET centre) or <strong>to India</strong> to sit
          NEET-UG. We help students plan registration and travel.
        </>
      }
      schoolsIntro="Indian-origin students from Calgary Board of Education and Calgary Catholic School District with strong South Asian communities."
      schoolsColumn1Title="NE Calgary (Indian corridor)"
      schoolsColumn1={[
        'Nelson Mandela High School',
        'Lester B. Pearson High School',
        'Sir John A. Macdonald Junior HS',
        'Crescent Heights High School',
        'James Fowler High School',
      ]}
      schoolsColumn2Title="Other Calgary schools"
      schoolsColumn2={[
        'Ernest Manning High School',
        'Western Canada High School',
        'Centennial High School',
        'Dr. E.P. Scarlett High School',
        'Bishop Carroll &amp; Bishop McNally HS',
      ]}
      schoolsFooter="Any Alberta curriculum (30-level, AP, IB) is fine — NEET is NCERT-based and we bridge the gap."
      timingsLabelPrimary="Calgary (MST)"
      timingsPrimaryWeekday="8:30 AM – 11:00 AM"
      timingsLabelSecondary="Calgary (MDT)"
      timingsSecondaryWeekday="9:30 AM – 12:00 PM"
      timingsPrimaryWeekend="7:00 AM – 10:00 AM"
      timingsSecondaryWeekend="8:00 AM – 11:00 AM"
      timingsFootnote="Every session recorded."
      pricingCityLabel="Calgary"
      faqs={faqs}
      ctaWhatsAppLinkEncoded="from%20Calgary"
      relatedCityKey="calgary"
    />
  )
}
