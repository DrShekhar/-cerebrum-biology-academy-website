'use client'

import { OverseasCityLayout } from '@/components/international/overseas-city/OverseasCityLayout'

interface PageContentProps {
  faqs: Array<{ q: string; a: string }>
}

export default function PageContent({ faqs }: PageContentProps) {
  return (
    <OverseasCityLayout
      cityName="Auckland"
      country="New Zealand"
      heroPill="Online NEET Biology for Auckland students"
      heroTagline="Live online NEET Biology classes for Indian-origin students across Sandringham, Mount Roskill, Papatoetoe, Te Atatu and Greater Auckland. NCEA Level 2/3 + NEET dual prep."
      timezoneLabel="NZST/NZDT"
      timezoneStart="2:30 PM NZST"
      communityStat="~100k"
      communityLabel="Indian-origin in Auckland"
      curriculumLabel="NCEA L2/L3"
      curriculumDescription="NZ senior + NEET"
      nearestCentre="Singapore / KL / India"
      nearestCentreLabel="Nearest NEET centres"
      curriculumBridgeTitle="NCEA Level 2/3 bridge"
      curriculumBridgeBody="NCEA Level 2 and 3 Biology overlap with NEET on cell biology, genetics, ecology and some physiology. We add NEET-specific depth."
      examCentreBody={
        <>
          The NTA does not operate a NEET exam centre in New Zealand. Auckland students typically
          fly from <strong>AKL to Singapore or Kuala Lumpur</strong> (official NEET centres) or to{' '}
          <strong>India</strong> to sit NEET-UG. We help students plan registration and travel.
        </>
      }
      schoolsIntro="Indian-origin students from Auckland's top state and independent schools with strong Indian communities."
      schoolsColumn1Title="Central &amp; West Auckland"
      schoolsColumn1={[
        'Auckland Grammar School',
        'Epsom Girls Grammar School',
        'Mount Roskill Grammar School',
        'Auckland Girls Grammar School',
        'Avondale College',
      ]}
      schoolsColumn2Title="South &amp; East Auckland"
      schoolsColumn2={[
        'Macleans College (Bucklands Beach)',
        'Pakuranga College',
        'Papatoetoe High School',
        'Onehunga High School',
        'One Tree Hill College',
      ]}
      schoolsFooter="Any NCEA, Cambridge (CIE) or IB track is fine — NEET is NCERT-based and we bridge the gap."
      timingsLabelPrimary="Auckland (NZST)"
      timingsPrimaryWeekday="2:30 PM – 5:00 PM"
      timingsLabelSecondary="Auckland (NZDT)"
      timingsSecondaryWeekday="3:30 PM – 6:00 PM"
      timingsPrimaryWeekend="12:30 PM – 3:30 PM"
      timingsSecondaryWeekend="1:30 PM – 4:30 PM"
      timingsFootnote="Every session recorded."
      pricingCityLabel="Auckland"
      faqs={faqs}
      ctaWhatsAppLinkEncoded="from%20Auckland"
      relatedCityKey="auckland"
    />
  )
}
