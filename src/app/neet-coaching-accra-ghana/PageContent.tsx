import { Suspense } from 'react';
import SmartWhatsAppCTA from '@/components/conversion/SmartWhatsAppCTA';
import VideoTestimonialsSection from '@/components/testimonials/VideoTestimonialsSection';
import LocalitySchema from '@/components/seo/LocalitySchema';
import RelatedCityLinks from '@/components/seo/RelatedCityLinks';
import PricingSection from '@/components/city/PricingSection';
import CostComparisonSection from '@/components/city/CostComparisonSection';

export default function PageContent() {
  const cityData = {
    name: 'Accra',
    country: 'Ghana',
    slug: 'neet-coaching-accra-ghana',
    coordinates: {
      latitude: 5.6037,
      longitude: -0.187,
    },
    timezone: 'GMT',
    community: 'Growing Indian business community',
  };

  const faqs = [
    {
      question: 'Why choose Cerebrum Biology Academy for NEET coaching in Accra, Ghana?',
      answer: 'Cerebrum Biology Academy offers a 98% success rate with personalized coaching tailored to the Ghana educational context. Our expert faculty, led by Dr. Shekhar C Singh, uses evidence-based teaching methods proven to maximize student performance.',
    },
    {
      question: 'What is the course duration for NEET preparation in Accra?',
      answer: 'Our comprehensive NEET coaching program is designed for flexibility. We offer both intensive 12-month programs and accelerated 6-month tracks, depending on your current level and target timeline.',
    },
    {
      question: 'Are there Ghana board-specific coaching modules?',
      answer: 'Yes, we provide curriculum customization for Ghana boards while maintaining NEET alignment. Our biology-focused approach ensures mastery of all concepts required for top scores.',
    },
    {
      question: 'What support do students from Accra receive during the coaching?',
      answer: 'Beyond classroom instruction, students get 1-on-1 mentoring, doubt-clearing sessions, mock tests, and personalized study schedules. We also provide nutrition and stress management guidance.',
    },
    {
      question: 'How affordable is NEET coaching in Accra?',
      answer: 'Our pricing is competitive and transparent with no hidden charges. We offer flexible payment plans and scholarships for merit students. Contact us for customized packages.',
    },
    {
      question: 'Can I join from Accra if I'm still in Grade 10 or 11?',
      answer: 'Absolutely! Early-bird enrollment gives students a significant advantage. We offer foundational courses for Grade 10-11 students to build strong fundamentals before intensive NEET prep.',
    },
  ];

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1>NEET Coaching in Accra, Ghana</h1>
          <p className="lead">
            Accra, Ghana's capital, hosts a growing Indian business diaspora and is establishing itself as a leading tech hub in West Africa. Cerebrum Biology Academy brings expert NEET coaching to Accra with a proven 98% success rate and personalized learning paths.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <h3>Community Size</h3>
              <p>Growing Indian business community</p>
            </div>
            <div className="info-card">
              <h3>Timezone</h3>
              <p>GMT</p>
            </div>
            <div className="info-card">
              <h3>Key Schools</h3>
              <p>Ghana International School, Lincoln Community School, Accra Academy & more</p>
            </div>
          </div>

          <SmartWhatsAppCTA 
            ctaText="Get NEET Coaching Details"
            message="Hi! I'm interested in NEET coaching in Accra, Ghana."
          />
        </div>
      </section>

      <section className="highlights-section">
        <div className="container">
          <h2>Why Accra for NEET Coaching?</h2>
          <p>Indian business diaspora, growing tech hub, affordable coaching, West African gateway</p>
          <ul>
              <li>Ghana International School</li>
              <li>Lincoln Community School</li>
              <li>Accra Academy</li>
              <li>Achimota School</li>
          </ul>
        </div>
      </section>

      <Suspense fallback={<div>Loading testimonials...</div>}>
        <VideoTestimonialsSection city="Accra" country="Ghana" />
      </Suspense>

      <section className="faq-section">
        <div className="container">
          <h2>FAQs About NEET Coaching in Accra</h2>
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
        message="I'd like to schedule a free NEET counseling session. I'm from Accra, Ghana."
      />

      <Suspense fallback={<div>Loading pricing...</div>}>
        <PricingSection city="Accra" />
      </Suspense>

      <Suspense fallback={<div>Loading cost comparison...</div>}>
        <CostComparisonSection city="Accra" />
      </Suspense>

      <section className="cta-final">
        <div className="container">
          <h2>Start Your NEET Success Journey in Accra</h2>
          <p>Dr. Shekhar C Singh and the Cerebrum Biology Academy team are ready to guide you to NEET success.</p>
          
          <SmartWhatsAppCTA 
            ctaText="Connect on WhatsApp Now"
            message="Hi Dr. Shekhar! I want to enroll in NEET coaching. I'm based in Accra, Ghana."
          />
        </div>
      </section>

      <Suspense fallback={<div>Loading related cities...</div>}>
        <RelatedCityLinks currentCity="Accra" />
      </Suspense>

      <LocalitySchema 
        city="Accra"
        country="Ghana"
        coordinates={{
          latitude: 5.6037,
          longitude: -0.187,
        }}
      />
    </main>
  );
}
