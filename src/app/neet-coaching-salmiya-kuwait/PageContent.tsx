'use client'

import { OverseasCityLayout } from '@/components/international/overseas-city/OverseasCityLayout'

interface PageContentProps {
  faqs: Array<{ q: string; a: string }>
}

export default function PageContent({ faqs }: PageContentProps) {
  return (
    <OverseasCityLayout
      cityName="Salmiya"
      country="Kuwait"
      heroPill="Online NEET Biology for Salmiya / Kuwait students"
      heroTagline="Live online NEET Biology classes for Indian students in Salmiya. Kuwait City NEET exam centre (~10 km). Class 9–12 plus droppers."
      timezoneLabel="AST"
      timezoneStart="5:00 PM AST"
      communityStat="~1M"
      communityLabel="Indian community in Kuwait"
      curriculumLabel="CBSE · ICSE"
      curriculumDescription="Boards supported"
      nearestCentre="Kuwait City"
      nearestCentreLabel="NEET exam centre"
      curriculumBridgeTitle="AST (UTC+3) friendly"
      curriculumBridgeBody="Live classes run after Kuwait school hours. Every session is recorded, so exam weeks and family travel never block NEET prep."
      examCentreBody={
        <>
          Salmiya residents sit NEET-UG at the official NTA centre in <strong>Kuwait City</strong>{' '}
          (~10 km). Quick drive or public transport from Salmiya residential areas. We help enrolled
          students plan registration and exam-day logistics.
        </>
      }
      schoolsIntro="We support CBSE and ICSE students from Kuwait schools with strong Indian communities, including the large ICSK and Indian Community School networks."
      schoolsColumn1Title="Salmiya & central Kuwait"
      schoolsColumn1={[
        'Indian Central School (ICSK Salmiya Senior)',
        'Indian Community School Kuwait (ICSK Khaitan)',
        'Carmel School Kuwait',
        'Don Bosco English School',
        "Bhavan's SIS Kuwait",
      ]}
      schoolsColumn2Title="Other Kuwait-wide"
      schoolsColumn2={[
        'Indian Educational School Kuwait',
        'Jabriya Indian School (JIS)',
        'Fahaheel Al-Watanieh Indian Private',
        'Gulf Indian School',
        'United Indian School',
      ]}
      schoolsFooter="Any CBSE, ICSE or IB student from Kuwait is welcome."
      timingsLabelPrimary="Salmiya (AST)"
      timingsPrimaryWeekday="5:00 PM – 7:30 PM"
      timingsLabelSecondary="IST equivalent"
      timingsSecondaryWeekday="7:30 PM – 10:00 PM"
      timingsPrimaryWeekend="10:00 AM – 12:30 PM"
      timingsSecondaryWeekend="12:30 PM – 3:00 PM"
      timingsFootnote="After Kuwait school hours; every session recorded."
      pricingCityLabel="Salmiya"
      faqs={faqs}
      ctaWhatsAppLinkEncoded="from%20Salmiya%20Kuwait"
      relatedCityKey="salmiya"
    />
  )
}
