import { Suspense } from 'react';
import SmartWhatsAppCTA from '@/components/conversion/SmartWhatsAppCTA';
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection';
import LocalitySchema from '@/components/seo/LocalitySchema';
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks';
import { PricingSection } from '@/components/city/PricingSection';
import { CostComparisonSection } from '@/components/city/CostComparisonSection';

export default function PageContent() {
  const cityData = {
    name: 'Al Ain',
    country: 'UAE',
    slug: 'neet-coaching-al-ain-uae',
    coordinates: {
      latitude: 24.2075,
      longitude: 55.7447,
    },
    timezone: 'GST (UTC+4)',
    community: '15+ CBSE schools, family-friendly',
  };

  const faqs = [
    {
      question: 'Why choose Cerebrum Biology Academy for NEET coaching in Al Ain, UAE?',
      answer: 'Cerebrum Biology Academy offers a 98% success rate with personalized coaching tailored to the UAE educational context. Our expert faculty, led by Dr. Shekhar C Singh, uses evidence-based teaching methods proven to maximize student performance.',
    },
    {
      question: 'What is the course duration for NEET preparation in Al Ain?',
      answer: 'Our comprehensive NEET coaching program is designed for flexibility. We offer both intensive 12-month programs and accelerated 6-month tracks, depending on your current level and target timeline.',
    },
    {
      question: 'Are there UAE board-specific coaching modules?',
      answer: 'Yes, we provide curriculum customization for UAE boards while maintaining NEET alignment. Our biology-focused approach ensures mastery of all concepts required for top scores.',
    },
    {
      question: 'What support do students from Al Ain receive during the coaching?',
      answer: 'Beyond classroom instruction, students get 1-on-1 mentoring, doubt-clearing sessions, mock tests, and personalized study schedules. We also provide nutrition and stress management guidance.',
    },
    {
      question: 'How affordable is NEET coaching in Al Ain?',
      answer: 'Our pricing is competitive and transparent with no hidden charges. We offer flexible payment plans and scholarships for merit students. Contact us for customized packages.',
    },
    {
      question: "Can I join from Al Ain if I'm still in Grade 10 or 11?",
      answer: 'Absolutely! Early-bird enrollment gives students a significant advantage. We offer foundational courses for Grade 10-11 students to build strong fundamentals before intensive NEET prep.',
    },
  ];

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1>NEET Coaching in Al Ain, UAE</h1>
          <p className="lead">
            Al Ain, the 'Garden City of the Gulf,' is a family-friendly destination in the UAE with excellent educational infrastructure and more affordable living costs than Abu Dhabi. Cerebrum Biology Academy brings expert NEET coaching to Al Ain with a proven 98% success rate and personalized learning paths.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <h3>Community Size</h3>
              <p>15+ CBSE schools, family-friendly</p>
            </div>
            <div className="info-card">
              <h3>Timezone</h3>
              <p>GST (UTC+4)</p>
            </div>
            <div className="info-card">
              <h3>Key Schools</h3>
              <p>Al Ain Indian School, Al Ain Academy, Emirates Schools & more</p>
            </div>
          </div>

          <SmartWhatsAppCTA 
            ctaText="Get NEET Coaching Details"
            message="Hi! I'm interested in NEET coaching in Al Ain, UAE."
          />
        </div>
      </section>

      <section className="highlights-section">
        <div className="container">
          <h2>Why Al Ain for NEET Coaching?</h2>
          <p>University city, family-friendly, cheaper than Abu Dhabi, UAEU area, Garden City</p>
          <ul>
              <li>Al Ain Indian School</li>
              <li>Al Ain Academy</li>
              <li>Emirates Schools</li>
              <li>Rajagiri International School</li>
              <li>Al Bahar National School</li>
          </ul>
        </div>
      </section>

      <Suspense fallback={<div>Loading testimonials...</div>}>
        <VideoTestimonialsSection city="Al Ain" country="UAE" />
      </Suspense>

      <section className="faq-section">
        <div className="container">
          <h2>FAQs About NEET Coaching in Al Ain</h2>
          <div className="faq-items">
            {faqs.map((faq, idx) => (
              <details key={idx} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SmartWhatsAppCTA 
        ctaText="Schedule Your Free Counseling"
        message="I'd like to schedule a free NEET counseling session. I'm from Al Ain, UAE."
      />

      <Suspense fallback={<div>Loading pricing...</div>}>
        <PricingSection city="Al Ain" />
      </Suspense>

      <Suspense fallback={<div>Loading cost comparison...</div>}>
        <CostComparisonSection city="Al Ain" />
      </Suspense>

      <section className="cta-final">
        <div className="container">
          <h2>Start Your NEET Success Journey in Al Ain</h2>
          <p>Dr. Shekhar C Singh and the Cerebrum Biology Academy team are ready to guide you to NEET success.</p>
          
          <SmartWhatsAppCTA 
            ctaText="Connect on WhatsApp Now"
            message="Hi Dr. Shekhar! I want to enroll in NEET coaching. I'm based in Al Ain, UAE."
          />
        </div>
      </section>

      <Suspense fallback={<div>Loading related cities...</div>}>
        <RelatedCityLinks currentCity="Al Ain" />
      </Suspense>

      <LocalitySchema 
        city="Al Ain"
        country="UAE"
        coordinates={{
          latitude: 24.2075,
          longitude: 55.7447,
        }}
      />
    </main>
  );
}
