import { Suspense } from 'react';
import SmartWhatsAppCTA from '@/components/conversion/SmartWhatsAppCTA';
import VideoTestimonialsSection from '@/components/testimonials/VideoTestimonialsSection';
import LocalitySchema from '@/components/seo/LocalitySchema';
import RelatedCityLinks from '@/components/seo/RelatedCityLinks';
import PricingSection from '@/components/city/PricingSection';
import CostComparisonSection from '@/components/city/CostComparisonSection';

export default function PageContent() {
  const cityData = {
    name: 'Kampala',
    country: 'Uganda',
    slug: 'neet-coaching-kampala-uganda',
    coordinates: {
      latitude: 0.3476,
      longitude: 32.5825,
    },
    timezone: 'EAT (UTC+3)',
    community: 'Historic Indian community',
  };

  const faqs = [
    {
      question: 'Why choose Cerebrum Biology Academy for NEET coaching in Kampala, Uganda?',
      answer: 'Cerebrum Biology Academy offers a 98% success rate with personalized coaching tailored to the Uganda educational context. Our expert faculty, led by Dr. Shekhar C Singh, uses evidence-based teaching methods proven to maximize student performance.',
    },
    {
      question: 'What is the course duration for NEET preparation in Kampala?',
      answer: 'Our comprehensive NEET coaching program is designed for flexibility. We offer both intensive 12-month programs and accelerated 6-month tracks, depending on your current level and target timeline.',
    },
    {
      question: 'Are there Uganda board-specific coaching modules?',
      answer: 'Yes, we provide curriculum customization for Uganda boards while maintaining NEET alignment. Our biology-focused approach ensures mastery of all concepts required for top scores.',
    },
    {
      question: 'What support do students from Kampala receive during the coaching?',
      answer: 'Beyond classroom instruction, students get 1-on-1 mentoring, doubt-clearing sessions, mock tests, and personalized study schedules. We also provide nutrition and stress management guidance.',
    },
    {
      question: 'How affordable is NEET coaching in Kampala?',
      answer: 'Our pricing is competitive and transparent with no hidden charges. We offer flexible payment plans and scholarships for merit students. Contact us for customized packages.',
    },
    {
      question: "Can I join from Kampala if I'm still in Grade 10 or 11?",
      answer: 'Absolutely! Early-bird enrollment gives students a significant advantage. We offer foundational courses for Grade 10-11 students to build strong fundamentals before intensive NEET prep.',
    },
  ];

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1>NEET Coaching in Kampala, Uganda</h1>
          <p className="lead">
            Kampala, Uganda's capital, is home to a historic Indian community with strong educational institutions and business presence. Cerebrum Biology Academy brings expert NEET coaching to Kampala with a proven 98% success rate and personalized learning paths.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <h3>Community Size</h3>
              <p>Historic Indian community</p>
            </div>
            <div className="info-card">
              <h3>Timezone</h3>
              <p>EAT (UTC+3)</p>
            </div>
            <div className="info-card">
              <h3>Key Schools</h3>
              <p>Aga Khan School Kampala, Kampala International School, Kampala Senior School & more</p>
            </div>
          </div>

          <SmartWhatsAppCTA 
            ctaText="Get NEET Coaching Details"
            message="Hi! I'm interested in NEET coaching in Kampala, Uganda."
          />
        </div>
      </section>

      <section className="highlights-section">
        <div className="container">
          <h2>Why Kampala for NEET Coaching?</h2>
          <p>Historic Indian community revival, Aga Khan schools network, East African trade hub</p>
          <ul>
              <li>Aga Khan School Kampala</li>
              <li>Kampala International School</li>
              <li>Kampala Senior School</li>
              <li>St. Mary's College Kisubi</li>
          </ul>
        </div>
      </section>

      <Suspense fallback={<div>Loading testimonials...</div>}>
        <VideoTestimonialsSection city="Kampala" country="Uganda" />
      </Suspense>

      <section className="faq-section">
        <div className="container">
          <h2>FAQs About NEET Coaching in Kampala</h2>
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
        message="I'd like to schedule a free NEET counseling session. I'm from Kampala, Uganda."
      />

      <Suspense fallback={<div>Loading pricing...</div>}>
        <PricingSection city="Kampala" />
      </Suspense>

      <Suspense fallback={<div>Loading cost comparison...</div>}>
        <CostComparisonSection city="Kampala" />
      </Suspense>

      <section className="cta-final">
        <div className="container">
          <h2>Start Your NEET Success Journey in Kampala</h2>
          <p>Dr. Shekhar C Singh and the Cerebrum Biology Academy team are ready to guide you to NEET success.</p>
          
          <SmartWhatsAppCTA 
            ctaText="Connect on WhatsApp Now"
            message="Hi Dr. Shekhar! I want to enroll in NEET coaching. I'm based in Kampala, Uganda."
          />
        </div>
      </section>

      <Suspense fallback={<div>Loading related cities...</div>}>
        <RelatedCityLinks currentCity="Kampala" />
      </Suspense>

      <LocalitySchema 
        city="Kampala"
        country="Uganda"
        coordinates={{
          latitude: 0.3476,
          longitude: 32.5825,
        }}
      />
    </main>
  );
}
