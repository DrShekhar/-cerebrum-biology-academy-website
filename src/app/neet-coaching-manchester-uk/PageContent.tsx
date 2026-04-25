'use client'

import { OverseasCityLayout } from '@/components/international/overseas-city/OverseasCityLayout'

interface PageContentProps {
  faqs: Array<{ q: string; a: string }>
}

export default function PageContent({ faqs }: PageContentProps) {
  return (
    <OverseasCityLayout
      cityName="Manchester"
      country="UK"
      heroPill="Online NEET Biology for Greater Manchester students"
      heroTagline="Live online NEET Biology classes for Indian-origin students across Manchester, Bolton, Rochdale, Stockport and Trafford. A-Level + NEET dual prep."
      timezoneLabel="GMT/BST"
      timezoneStart="4:00 PM GMT"
      communityStat="~70k"
      communityLabel="Indian-origin in Greater Manchester"
      curriculumLabel="A-Level · IB"
      curriculumDescription="Curricula supported"
      nearestCentre="Dubai / India"
      nearestCentreLabel="Nearest NEET centres"
      curriculumBridgeTitle="A-Level + NEET dual prep"
      curriculumBridgeBody="A-Level Biology and NEET Biology share most concepts. Our curriculum covers both simultaneously — one preparation, two exams."
      examCentreBody={
        <>
          The NTA does not operate a NEET exam centre in the UK. Manchester students typically fly
          from <strong>MAN airport to Dubai</strong> (Gulf centre, ~7-hour flight) or to{' '}
          <strong>India</strong> to sit NEET-UG. We help students plan registration and exam-day
          travel.
        </>
      }
      schoolsIntro="Indian-origin students from state comprehensives, grammar schools, sixth-form colleges and independent schools across Greater Manchester."
      schoolsColumn1Title="Manchester city"
      schoolsColumn1={[
        'Manchester Grammar School',
        "Withington Girls' School",
        'Manchester Academy',
        'Parrs Wood High School',
        'Loreto High School (Chorlton)',
      ]}
      schoolsColumn2Title="Greater Manchester"
      schoolsColumn2={[
        'King David High School (Crumpsall)',
        'Abraham Moss Community School',
        'Bolton School',
        'Cheadle Hulme School (Stockport)',
        'Trafford Grammar Schools',
      ]}
      schoolsFooter="Any A-Level, IB, BTEC or GCSE track is fine — our Biology is NCERT-aligned."
      timingsLabelPrimary="Manchester (GMT)"
      timingsPrimaryWeekday="4:00 PM – 6:30 PM"
      timingsLabelSecondary="Manchester (BST)"
      timingsSecondaryWeekday="5:00 PM – 7:30 PM"
      timingsPrimaryWeekend="10:00 AM – 12:30 PM"
      timingsSecondaryWeekend="11:00 AM – 1:30 PM"
      timingsFootnote="After UK school hours; every session recorded."
      pricingCityLabel="Manchester"
      faqs={faqs}
      ctaWhatsAppLinkEncoded="from%20Manchester"
      relatedCityKey="manchester"
    />
  )
}
