'use client'

import { OverseasCityLayout } from '@/components/international/overseas-city/OverseasCityLayout'

interface PageContentProps {
  faqs: Array<{ q: string; a: string }>
}

export default function PageContent({ faqs }: PageContentProps) {
  return (
    <OverseasCityLayout
      cityName="Ajman"
      country="UAE"
      heroPill="Online NEET Biology for Ajman students"
      heroTagline="Live online NEET Biology classes for Indian students in Ajman. Sharjah and Dubai NEET exam centres nearby. Class 9–12 plus droppers."
      timezoneLabel="GST"
      timezoneStart="4:00 PM GST"
      communityStat="25+ km"
      communityLabel="to Sharjah NEET centre"
      curriculumLabel="CBSE · ICSE · IB"
      curriculumDescription="Boards supported"
      nearestCentre="Sharjah / Dubai"
      nearestCentreLabel="Nearest NEET centres"
      curriculumBridgeTitle="Sharjah / Dubai school commuters"
      curriculumBridgeBody="Live classes work for Ajman students who go to DPS Sharjah, Our Own English or Dubai-based schools. Every session recorded for flexibility."
      examCentreBody={
        <>
          Ajman residents typically sit NEET-UG in <strong>Sharjah (~25 km)</strong>,{' '}
          <strong>Dubai (~35 km)</strong> or <strong>Abu Dhabi</strong>. All three are official NTA
          centres in the UAE. We help students pick the right centre during registration and plan
          exam-day travel.
        </>
      }
      schoolsIntro="We support CBSE, ICSE and IB students from Ajman Indian schools as well as students commuting to Sharjah and Dubai."
      schoolsColumn1Title="Ajman schools"
      schoolsColumn1={[
        'Ajman Indian School',
        'Habitat School Al Jurf',
        'Pakistan Islamia HSS (IB/CBSE tracks)',
        'Ajman Modern School',
      ]}
      schoolsColumn2Title="Commuter schools (Sharjah / Dubai)"
      schoolsColumn2={[
        'DPS Sharjah & DPS Dubai',
        'Our Own English High School (GEMS network)',
        'Indian School Sharjah (ISS)',
        'GEMS schools in Dubai & Sharjah',
      ]}
      schoolsFooter="Any Indian-curriculum, IGCSE or IB student is welcome."
      timingsLabelPrimary="Ajman (GST)"
      timingsPrimaryWeekday="4:00 PM – 6:30 PM"
      timingsLabelSecondary="IST equivalent"
      timingsSecondaryWeekday="5:30 PM – 8:00 PM"
      timingsPrimaryWeekend="10:00 AM – 12:30 PM"
      timingsSecondaryWeekend="11:30 AM – 2:00 PM"
      timingsFootnote="After UAE school hours; every session recorded."
      pricingCityLabel="Ajman"
      faqs={faqs}
      ctaWhatsAppLinkEncoded="from%20Ajman"
      relatedCityKey="ajman"
    />
  )
}
