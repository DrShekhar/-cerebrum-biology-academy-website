import { Suspense } from 'react';
import SmartWhatsAppCTA from '@/components/conversion/SmartWhatsAppCTA';
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection';
import LocalitySchema from '@/components/seo/LocalitySchema';
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks';
import { PricingSection } from '@/components/city/PricingSection';
import { CostComparisonSection } from '@/components/city/CostComparisonSection';

export default function PageContent() {
  const cityData = {
    name: 'Al Wakrah',
    country: 'Qatar',
    slug: 'neet-coaching-al-wakrah-qatar',
    coordinates: {
      latitude: 25.166,
      longitude: 51.6047,
    },
    timezone: 'AST (UTC+3)',
    community: 'Growing Indian community',
  };

  const faqs = [
    {
      question: 'Why choose Cerebrum Biology Academy for NEET coaching in Al Wakrah, Qatar?',
      answer: 'Cerebrum Biology Academy offers a 98% success rate with personalized coaching tailored to the Qatar educational context. Our expert faculty, led by Dr. Shekhar C Singh, uses evidence-based teaching methods proven to maximize student performance.',
    },
    {
      question: 'What is the course duration for NEET preparation in Al Wakrah?',
      answer: 'Our comprehensive NEET coaching program is designed for flexibility. We offer both intensive 12-month programs and accelerated 6-month tracks, depending on your current level and target timeline.',
    },
    {
      question: 'Are there Qatar board-specific coaching modules?',
      answer: 'Yes, we provide curriculum customization for Qatar boards while maintaining NEET alignment. Our biology-focused approach ensures mastery of all concepts required for top scores.',
    },
    {
      question: 'What support do students from Al Wakrah receive during the coaching?',
      answer: 'Beyond classroom instruction, students get 1-on-1 mentoring, doubt-clearing sessions, mock tests, and personalized study schedules. We also provide nutrition and stress management guidance.',
    },
    {
      question: 'How affordable is NEET coaching in Al Wakrah?',
      answer: 'Our pricing is competitive and transparent with no hidden charges. We offer flexible payment plans and scholarships for merit students. Contact us for customized packages.',
    },
    {
      question: "Can I join from Al Wakrah if I'm still in Grade 10 or 11?",
      answer: 'Absolutely! Early-bird enrollment gives students a significant advantage. We offer foundational courses for Grade 10-11 students to build strong fundamentals before intensive NEET prep.',
    },
  ];

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1>NEET Coaching in Al Wakrah, Qatar</h1>
          <p className="lead">
            Al Wakrah, Qatar's growing satellite city south of Doha, offers modern educational infrastructure and competitive NEET coaching options. Cerebrum Biology Academy brings expert NEET coaching to Al Wakrah with a proven 98% success rate and personalized learning paths.
          </p>
          
          <div className="info-grid">
            <div className="info-card">
              <h3>Community Size</h3>
              <p>Growing Indian community</p>
            </div>
            <div className="info-card">
              <h3>Timezone</h3>
              <p>AST (UTC+3)</p>
            </div>
            <div className="info-card">
              <h3>Key Schools</h3>
              <p>MES Indian School, Al Wakrah Academy, Qatar International School & more</p>
            </div>
          </div>

          <SmartWhatsAppCTA 
            ctaText="Get NEET Coaching Details"
            message="Hi! I'm interested in NEET coaching in Al Wakrah, Qatar."
          />
        </div>
      </section>

      <section className="highlights-section">
        <div className="container">
          <h2>Why Al Wakrah for NEET Coaching?</h2>
          <p>FIFA World Cup infrastructure, new schools, competitive pricing vs Doha, satellite city advantage</p>
          <ul>
              <li>MES Indian School</li>
              <li>Al Wakrah Academy</li>
              <li>Qatar International School</li>
              <li>Doha Modern Indian School</li>
          </ul>
        </div>
      </section>

      <Suspense fallback={<div>Loading testimonials...</div>}>
        <VideoTestimonialsSection city="Al Wakrah" country="Qatar" />
      </Suspense>

      <section className="faq-section">
        <div className="container">
          <h2>FAQs About NEET Coaching in Al Wakrah</h2>
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
        message="I'd like to schedule a free NEET counseling session. I'm from Al Wakrah, Qatar."
      />

      <Suspense fallback={<div>Loading pricing...</div>}>
        <PricingSection city="Al Wakrah" />
      </Suspense>

      <Suspense fallback={<div>Loading cost comparison...</div>}>
        <CostComparisonSection city="Al Wakrah" />
      </Suspense>

      <section className="cta-final">
        <div className="container">
          <h2>Start Your NEET Success Journey in Al Wakrah</h2>
          <p>Dr. Shekhar C Singh and the Cerebrum Biology Academy team are ready to guide you to NEET success.</p>
          
          <SmartWhatsAppCTA 
            ctaText="Connect on WhatsApp Now"
            message="Hi Dr. Shekhar! I want to enroll in NEET coaching. I'm based in Al Wakrah, Qatar."
          />
        </div>
      </section>

      <Suspense fallback={<div>Loading related cities...</div>}>
        <RelatedCityLinks currentCity="Al Wakrah" />
      </Suspense>

      <LocalitySchema 
        city="Al Wakrah"
        country="Qatar"
        coordinates={{
          latitude: 25.166,
          longitude: 51.6047,
        }}
      />
    </main>
  );
}
