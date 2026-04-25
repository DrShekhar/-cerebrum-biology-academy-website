'use client'

import { OverseasCityLayout } from '@/components/international/overseas-city/OverseasCityLayout'

interface PageContentProps {
  faqs: Array<{ q: string; a: string }>
}

export default function PageContent({ faqs }: PageContentProps) {
  return (
    <OverseasCityLayout
      cityName="Brisbane"
      country="Australia"
      heroPill="Online NEET Biology for Brisbane / SE Queensland students"
      heroTagline="Live online NEET Biology classes for Indian-origin students across Sunnybank, Calamvale, Runcorn, MacGregor and Greater Brisbane. Queensland Year 11-12 + NEET dual prep."
      timezoneLabel="AEST"
      timezoneStart="12:30 PM AEST"
      communityStat="~80k"
      communityLabel="Indian-origin in Brisbane"
      curriculumLabel="Queensland Bio"
      curriculumDescription="Yr 11-12 + NEET"
      nearestCentre="Singapore / KL / India"
      nearestCentreLabel="Nearest NEET centres"
      curriculumBridgeTitle="Queensland Year 11-12 bridge"
      curriculumBridgeBody="Queensland Biology in senior years covers many NEET topics. We add NEET-specific depth on human physiology, genetics and ecology. One preparation feeds both."
      examCentreBody={
        <>
          The NTA does not operate a NEET exam centre in Australia. Brisbane students typically fly
          from <strong>BNE to Singapore or Kuala Lumpur</strong> (official NEET centres) or to{' '}
          <strong>India</strong> to sit NEET-UG. We help students plan registration and travel.
        </>
      }
      schoolsIntro="Indian-origin students from Queensland state high schools and select private schools in Brisbane's southeast Indian corridor."
      schoolsColumn1Title="SE Brisbane (Indian corridor)"
      schoolsColumn1={[
        'Sunnybank State High School',
        'Runcorn State High School',
        'Mansfield State High School',
        'MacGregor State High School',
        'Mount Gravatt SHS',
      ]}
      schoolsColumn2Title="Inner Brisbane &amp; west"
      schoolsColumn2={[
        'Brisbane State High School',
        'Kelvin Grove State College',
        'Indooroopilly State High School',
        'Queensland Academies (QASMT)',
        'Calamvale Community College',
      ]}
      schoolsFooter="Any Queensland curriculum (ATAR, IB) is fine — NEET is NCERT-based and we bridge the gap."
      timingsLabelPrimary="Brisbane (AEST)"
      timingsPrimaryWeekday="12:30 PM – 3:00 PM"
      timingsLabelSecondary="IST equivalent"
      timingsSecondaryWeekday="8:00 AM – 10:30 AM"
      timingsPrimaryWeekend="10:30 AM – 1:30 PM"
      timingsSecondaryWeekend="6:00 AM – 9:00 AM"
      timingsFootnote="Every session recorded."
      pricingCityLabel="Brisbane"
      faqs={faqs}
      ctaWhatsAppLinkEncoded="from%20Brisbane"
      relatedCityKey="brisbane"
    />
  )
}
