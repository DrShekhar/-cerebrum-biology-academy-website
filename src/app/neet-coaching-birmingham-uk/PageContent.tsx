'use client'

import { OverseasCityLayout } from '@/components/international/overseas-city/OverseasCityLayout'

interface PageContentProps {
  faqs: Array<{ q: string; a: string }>
}

export default function PageContent({ faqs }: PageContentProps) {
  return (
    <OverseasCityLayout
      cityName="Birmingham"
      country="UK"
      heroPill="Online NEET Biology for Birmingham students"
      heroTagline="Live online NEET Biology classes for Indian-origin students across Handsworth, Smethwick, Aston, Sparkhill and Greater Birmingham. A-Level + NEET dual prep."
      timezoneLabel="GMT/BST"
      timezoneStart="4:00 PM GMT"
      communityStat="~200k"
      communityLabel="Indian-origin in Birmingham"
      curriculumLabel="A-Level · IB"
      curriculumDescription="Curricula supported"
      nearestCentre="Dubai / India"
      nearestCentreLabel="Nearest NEET centres"
      curriculumBridgeTitle="A-Level + NEET dual prep"
      curriculumBridgeBody="A-Level Biology and NEET Biology share most concepts. Our curriculum covers both simultaneously — one preparation, two exams."
      examCentreBody={
        <>
          The NTA does not operate a NEET exam centre in the UK. Birmingham students typically fly
          to <strong>Dubai, Abu Dhabi or Sharjah</strong> (Gulf centres, ~7-hour flight) or to{' '}
          <strong>India</strong> to sit NEET-UG. We help students pick the right centre during
          registration and plan the exam-day journey.
        </>
      }
      schoolsIntro="Indian-origin students from state comprehensives, grammar schools and colleges across the city join our Biology batches."
      schoolsColumn1Title="State schools &amp; academies"
      schoolsColumn1={[
        'Handsworth Grammar School',
        'Aston Manor Academy',
        'Broadway Academy',
        'Heartlands Academy',
        'Small Heath Leadership Academy',
      ]}
      schoolsColumn2Title="King Edward VI network &amp; sixth forms"
      schoolsColumn2={[
        'King Edward VI Five Ways',
        'King Edward VI Camp Hill (Boys &amp; Girls)',
        'Handsworth Wood Girls Academy',
        'Lordswood Boys &amp; Lordswood Girls',
        'Arden Academy &amp; Solihull Sixth Form',
      ]}
      schoolsFooter="Any A-Level, IB, BTEC or GCSE track is fine — our Biology is NCERT-aligned."
      timingsLabelPrimary="Birmingham (GMT)"
      timingsPrimaryWeekday="4:00 PM – 6:30 PM"
      timingsLabelSecondary="Birmingham (BST)"
      timingsSecondaryWeekday="5:00 PM – 7:30 PM"
      timingsPrimaryWeekend="10:00 AM – 12:30 PM"
      timingsSecondaryWeekend="11:00 AM – 1:30 PM"
      timingsFootnote="After UK school hours; every session recorded."
      pricingCityLabel="Birmingham"
      faqs={faqs}
      ctaWhatsAppLinkEncoded="from%20Birmingham"
      relatedCityKey="birmingham"
    />
  )
}
