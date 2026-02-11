import { Suspense } from 'react';
import SmartWhatsAppCTA from '@/components/conversion/SmartWhatsAppCTA';
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection';
import LocalitySchema from '@/components/seo/LocalitySchema';
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks';
import { PricingSection } from '@/components/city/PricingSection';
import { CostComparisonSection } from '@/components/city/CostComparisonSection';

export default function PageContent() {
  const cityData = {
    name: 'Dar es Salaam',
    country: 'Tanzania',
    slug: 'neet-coaching-dar-es-salaam-tanzania',
    coordinates: {
      latitude: -6.7924,
      longitude: 39.2083,
    },
    timezone: 'EAT (UTC+3)',
    community: '50K+ Indian community',
  };

  const faqs = [
    {
      question: 'Why choose Cerebrum Biology Academy for NEET coaching in Dar es Salaam, Tanzania?',
      answer: 'Cerebrum Biology Academy offers a 98% success rate with personalized coaching tailored to the Tanzania educational context. Our expert faculty, led by Dr. Shekhar C Singh, uses evidence-based teaching methods proven to maximize student performance.',
    },
    {
      question: 'What is the course duration for NEET preparation in Dar es Salaam?',
      answer: 'Our comprehensive NEET coaching program is designed for flexibility. We offer both intensive 12-month programs and accelerated 6-month tracks, depending on your current level and target timeline.',
    },
    {
      question: 'Are there Tanzania board-specific coaching modules?',
      answer: 'Yes, we provide curriculum customization for Tanzania boards while maintaining NEET alignment. Our biology-focused approach ensures mastery of all concepts required for top scores.',
    },
    {
      question: 'What support do students from Dar es Salaam receive during the coaching?',
      answer: 'Beyond classroom instruction, students get 1-on-1 mentoring, doubt-clearing sessions, mock tests, and personalized study schedules. We also provide nutrition and stress management guidance.',
    },
    {
      question: 'How affordable is NEET coaching in Dar es Salaam?',
      answer: 'Our pricing is competitive and transparent with no hidden charges. We offer flexible payment plans and scholarships for merit students. Contact us for customized packages.',
    },
    {
      question: "Can I join from Dar es Salaam if I'm still in Grade 10 or 11?",
      answer: 'Absolutely! Early-bird enrollment gives students a significant advantage. We offer foundational courses for Grade 10-11 students to build strong fundamentals before intensive NEET prep.',
    },
  ];

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1>NEET Coaching in Dar es Salaam, Tanzania</h1>
          <p className="lead">
            Dar es Salaam, Tanzania's largest city and former capital, has a historic and thriving Indian community, particularly in the Kariyakoo market area. Cerebrum Biology Academy brings expert NEET coaching to Dar es Salaam with a proven 98% success rate and personalized learning paths.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <h3>Community Size</h3>
              <p>50K+ Indian community</p>
            </div>
            <div className="info-card">
              <h3>Timezone</h3>
              <p>EAT (UTC+3)</p>
            </div>
            <div className="info-card">
              <h3>Key Schools</h3>
              <p>International School of Tanganyika, Dar es Salaam Academy, Aga Khan School Dar & more</p>
            </div>
          </div>

          <SmartWhatsAppCTA 
            ctaText="Get NEET Coaching Details"
            message="Hi! I'm interested in NEET coaching in Dar es Salaam, Tanzania."
          />
        </div>
      </section>

      <section className="highlights-section">
        <div className="container">
          <h2>Why Dar es Salaam for NEET Coaching?</h2>
          <p>Kariyakoo Indian market area, historic Gujarati/Ismaili community, coastal city charm</p>
          <ul>
              <li>International School of Tanganyika</li>
              <li>Dar es Salaam Academy</li>
              <li>Aga Khan School Dar</li>
              <li>United Nations School</li>
          </ul>
        </div>
      </section>

      <Suspense fallback={<div>Loading testimonials...</div>}>
        <VideoTestimonialsSection city="Dar es Salaam" country="Tanzania" />
      </Suspense>

      <section className="faq-section">
        <div className="container">
          <h2>FAQs About NEET Coaching in Dar es Salaam</h2>
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
        message="I'd like to schedule a free NEET counseling session. I'm from Dar es Salaam, Tanzania."
      />

      <Suspense fallback={<div>Loading pricing...</div>}>
        <PricingSection city="Dar es Salaam" />
      </Suspense>

      <Suspense fallback={<div>Loading cost comparison...</div>}>
        <CostComparisonSection city="Dar es Salaam" />
      </Suspense>

      <section className="cta-final">
        <div className="container">
          <h2>Start Your NEET Success Journey in Dar es Salaam</h2>
          <p>Dr. Shekhar C Singh and the Cerebrum Biology Academy team are ready to guide you to NEET success.</p>
          
          <SmartWhatsAppCTA 
            ctaText="Connect on WhatsApp Now"
            message="Hi Dr. Shekhar! I want to enroll in NEET coaching. I'm based in Dar es Salaam, Tanzania."
          />
        </div>
      </section>

      <Suspense fallback={<div>Loading related cities...</div>}>
        <RelatedCityLinks currentCity="Dar es Salaam" />
      </Suspense>

      <LocalitySchema 
        city="Dar es Salaam"
        country="Tanzania"
        coordinates={{
          latitude: -6.7924,
          longitude: 39.2083,
        }}
      />
    </main>
  );
}
