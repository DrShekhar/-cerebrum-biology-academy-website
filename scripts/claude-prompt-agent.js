#!/usr/bin/env node

/**
 * 🤖 Claude Prompt Agent for Cerebrum Biology Academy
 * Generates detailed, contextual prompts for Claude to execute specific tasks
 *
 * Usage: node scripts/claude-prompt-agent.js [task-type]
 */

import chalk from 'chalk'
import { readFileSync } from 'fs'

const log = {
  success: (msg) => console.log(chalk.green('✅ ' + msg)),
  info: (msg) => console.log(chalk.blue('📋 ' + msg)),
  prompt: (msg) => console.log(chalk.cyan('🤖 ' + msg)),
  divider: () => console.log(chalk.gray('─'.repeat(80))),
}

// Project context for Claude
const PROJECT_CONTEXT = {
  name: 'Cerebrum Biology Academy',
  type: 'Biology Education Platform',
  markets: ['India (NEET, CBSE, ICSE)', 'International (IB, IGCSE)'],
  techStack: 'Next.js 15.5.3, TypeScript, Tailwind CSS, Prisma, PostgreSQL',
  currentPhase: 'Market Domination - Revenue Generation',
  targetRevenue: '₹1Cr+/month by Year 2',
  studentBase: '10,000+ concurrent users',
  successRate: '94.2% NEET qualification rate',
}

// Task-specific prompts for Claude
const CLAUDE_PROMPTS = {
  'google-ads': {
    title: '🎯 Deploy Google Ads for Kota/Delhi Biology Coaching Market',
    context:
      'Target 250K+ students in Tier 1 coaching hubs (Kota, Delhi) with city-specific campaigns',
    prompt: `
You are a Google Ads specialist for Cerebrum Biology Academy, India's leading Biology education platform with 94.2% NEET success rate.

**TASK:** Create comprehensive Google Ads campaigns for Kota and Delhi markets

**CONTEXT:**
- Platform: ${PROJECT_CONTEXT.name} (cerebrumbiologyacademy.com)
- Target: Biology students in Kota (250K+ students) and Delhi NCR markets
- Competitors: Allen, Resonance, Aakash, FIITJEE (position as better alternative)
- Budget: ₹500/day initially, scaling to ₹2000/day
- Goal: 5-10% conversion rate (industry: 2-3%)

**DELIVERABLES NEEDED:**

1. **Campaign Structure:**
   - City-specific ad groups for Kota and Delhi
   - Keyword research targeting "biology coaching [city]", "NEET classes [city]"
   - Competitor comparison ads ("better than Allen", "Resonance alternative")
   - Landing page optimization for each city

2. **Ad Copy Creation:**
   - Headlines emphasizing 94.2% success rate
   - Local testimonials and success stories
   - Pricing advantages over competitors
   - Call-to-action for free demo classes

3. **Landing Page Requirements:**
   - City-specific content with local coaching center comparisons
   - WhatsApp integration for immediate lead capture
   - Student success stories from that city
   - Fee structure with installment options

4. **Implementation Steps:**
   - Google Ads account setup
   - Conversion tracking implementation
   - A/B testing framework
   - Performance monitoring dashboard

**SUCCESS METRICS:**
- Target: 500+ qualified leads/month
- Conversion cost: <₹2000 per enrollment
- ROI: 300%+ (₹50K spend → ₹1.5L revenue)

Please provide detailed implementation plan, ad copy examples, and technical setup instructions.
    `,
    files: [
      '/src/app/locations/[city]/page.tsx',
      '/src/lib/seo/metadataService.ts',
      '/src/components/enrollment/EnrollmentForm.tsx',
    ],
  },

  'whatsapp-automation': {
    title: '💬 Launch WhatsApp Lead Automation System',
    context: 'Automated lead nurturing with WhatsApp Business API for Biology education',
    prompt: `
You are a WhatsApp automation specialist for Cerebrum Biology Academy's lead conversion system.

**TASK:** Implement comprehensive WhatsApp lead automation with follow-up sequences

**CONTEXT:**
- Platform: ${PROJECT_CONTEXT.name} with WhatsApp Business API integration
- Target: Convert website visitors and ad clicks to enrolled students
- Current conversion: Manual process (2-3% industry average)
- Goal: Achieve 5-10% conversion through automation
- Student lifecycle: Lead → Demo → Enrollment → Success

**DELIVERABLES NEEDED:**

1. **Lead Capture Automation:**
   - Instant response for demo bookings (within 30 seconds)
   - City-specific welcome messages
   - Demo class confirmation with calendar links
   - Faculty introduction with credentials

2. **Follow-up Sequences:**
   - Day 1: Demo reminder with prep materials
   - Day 3: Post-demo feedback and curriculum details
   - Day 7: Success stories and testimonials
   - Day 14: Limited-time enrollment offers
   - Day 21: Final follow-up with installment options

3. **Message Templates:**
   - Welcome series for new leads
   - Demo booking confirmations
   - Course information packets
   - Success story sharing
   - Payment reminders and support

4. **Integration Requirements:**
   - WhatsApp Business API setup
   - CRM integration for lead tracking
   - Automated trigger setup from website forms
   - Performance analytics and reporting

**TECHNICAL IMPLEMENTATION:**
- Existing file: /src/lib/whatsapp/whatsappService.ts
- Demo booking: /src/components/DemoBooking.tsx
- Lead capture: /src/components/enrollment/EnrollmentForm.tsx

**SUCCESS METRICS:**
- Response time: <30 seconds for all leads
- Conversion rate: 5-10% (vs 2-3% industry)
- Lead volume: 500+ qualified leads/month
- Revenue impact: ₹2L+ monthly increase

Please provide complete automation workflow, message templates, and technical implementation.
    `,
    files: [
      '/src/lib/whatsapp/whatsappService.ts',
      '/src/components/DemoBooking.tsx',
      '/src/components/enrollment/EnrollmentForm.tsx',
    ],
  },

  'payment-processing': {
    title: '💳 Enable Payment Processing with Razorpay Integration',
    context: 'Complete payment system for Indian market with installment plans',
    prompt: `
You are a payment integration specialist for Cerebrum Biology Academy's revenue system.

**TASK:** Implement comprehensive payment processing with Razorpay for Biology coaching fees

**CONTEXT:**
- Platform: ${PROJECT_CONTEXT.name} serving 10,000+ students
- Market: Primarily Indian students (NEET, CBSE, ICSE preparation)
- Fee structure: ₹25,000-75,000 per course with installment options
- Payment methods: Cards, UPI, Net Banking, EMI options
- Goal: Enable ₹2L+ monthly revenue collection

**DELIVERABLES NEEDED:**

1. **Razorpay Integration:**
   - Complete payment gateway setup
   - Course-specific pricing tiers
   - Installment plan options (monthly/quarterly)
   - Multiple payment method support
   - GST calculation and invoice generation

2. **Payment Features:**
   - One-time full payment with discount
   - Monthly installment plans (6-12 months)
   - Quarterly installment options
   - Family discount for multiple siblings
   - Referral discounts and offers

3. **Student Dashboard:**
   - Payment history and receipts
   - Installment schedule tracking
   - Due date reminders
   - Payment method management
   - Invoice downloads

4. **Admin Features:**
   - Payment tracking and reporting
   - Failed payment handling
   - Refund processing
   - Revenue analytics
   - Student payment status

**TECHNICAL REQUIREMENTS:**
- Existing integration: /src/lib/payments/razorpay.ts
- Enrollment form: /src/components/enrollment/EnrollmentForm.tsx
- Student dashboard: /src/components/dashboard/ (to be created)
- Database schema: Prisma with PostgreSQL

**SECURITY & COMPLIANCE:**
- PCI DSS compliance
- Webhook signature verification
- Payment data encryption
- Audit logging
- Fraud detection

**SUCCESS METRICS:**
- Payment success rate: >95%
- Revenue collection: ₹2L+ monthly
- Installment compliance: >90%
- Processing time: <30 seconds

Please provide complete payment system implementation with security best practices.
    `,
    files: [
      '/src/lib/payments/razorpay.ts',
      '/src/components/enrollment/EnrollmentForm.tsx',
      '/prisma/schema.prisma',
    ],
  },

  'international-testing': {
    title: '🌍 Set up International Market Testing',
    context: 'Expand to USA/UK/UAE markets for IB, IGCSE Biology education',
    prompt: `
You are an international expansion specialist for Cerebrum Biology Academy's global market entry.

**TASK:** Launch international market testing for USA, UK, and UAE Biology education markets

**CONTEXT:**
- Platform: ${PROJECT_CONTEXT.name} expanding from Indian success (94.2% NEET rate)
- Target markets: USA (AP Biology), UK (A-Level), UAE (IGCSE)
- Positioning: Premium Biology education at competitive pricing
- Student base: International school students and university prep
- Goal: 20% of total revenue from international by Year 2

**DELIVERABLES NEEDED:**

1. **Market Research:**
   - Competitive analysis for each country
   - Pricing strategy (USD $299 vs local $500+)
   - Curriculum mapping (AP, A-Level, IGCSE to platform content)
   - Regulatory requirements and certifications
   - Time zone considerations for live classes

2. **Technical Implementation:**
   - Multi-currency payment support (USD, GBP, AED)
   - Stripe integration for international payments
   - Time zone-appropriate class scheduling
   - Country-specific landing pages
   - Local phone number integration

3. **Content Localization:**
   - Curriculum alignment with local standards
   - Example questions from local exam boards
   - Success metrics relevant to each market
   - Local testimonials and case studies
   - Country-specific legal disclaimers

4. **Marketing Strategy:**
   - SEO for international keywords
   - Social media presence in target countries
   - Partnership with international schools
   - Referral programs for overseas students
   - Local influencer collaborations

**PILOT PROGRAM:**
- Start with 50 students per country
- 3-month testing period
- A/B test pricing and messaging
- Collect feedback for full launch
- Track conversion and retention rates

**SUCCESS METRICS:**
- Market penetration: 1,000 international students
- Revenue target: $50K monthly (₹40L)
- Retention rate: >85%
- NPS score: >70

Please provide complete international expansion strategy with implementation timeline.
    `,
    files: [
      '/src/app/international/page.tsx',
      '/src/lib/payments/',
      '/src/lib/seo/metadataService.ts',
    ],
  },

  'performance-optimization': {
    title: '⚡ Performance Optimization for 10K+ Concurrent Users',
    context: 'Scale platform to handle massive concurrent user base efficiently',
    prompt: `
You are a performance optimization specialist for Cerebrum Biology Academy's scaling challenges.

**TASK:** Optimize platform performance to handle 10,000+ concurrent users efficiently

**CONTEXT:**
- Platform: ${PROJECT_CONTEXT.name} (Next.js 15.5.3, TypeScript, Tailwind CSS)
- Current load: Growing from hundreds to thousands of concurrent users
- Peak times: 6-9 PM IST (prime study hours)
- Features: Video streaming, real-time chat, assessments, payment processing
- Goal: Sub-3 second load times during peak traffic

**DELIVERABLES NEEDED:**

1. **Frontend Optimization:**
   - Code splitting and lazy loading implementation
   - Image optimization (WebP/AVIF with fallbacks)
   - Bundle size reduction and tree shaking
   - Service worker for caching strategy
   - Progressive loading of non-critical components

2. **Backend Scaling:**
   - Database query optimization and indexing
   - Redis caching layer implementation
   - API rate limiting and throttling
   - Database connection pooling
   - CDN integration for static assets

3. **Infrastructure:**
   - Vercel Edge Functions optimization
   - Database read replicas setup
   - Auto-scaling configuration
   - Monitoring and alerting system
   - Error tracking and performance metrics

4. **User Experience:**
   - Skeleton loading screens
   - Optimistic UI updates
   - Offline functionality for core features
   - Background sync for form submissions
   - Real-time performance monitoring

**TECHNICAL ANALYSIS:**
- Current build: 16.8s for 111 pages
- Bundle size: 102kB shared JavaScript
- Database: PostgreSQL with Prisma ORM
- Deployment: Vercel with edge functions

**PERFORMANCE TARGETS:**
- Page load time: <3 seconds (currently 3.9s)
- Time to interactive: <2 seconds
- Concurrent users: 10,000+ without degradation
- Database response: <100ms for 95% of queries
- Uptime: 99.9% availability

Please provide comprehensive performance optimization plan with monitoring strategy.
    `,
    files: ['/next.config.js', '/src/lib/db/', '/prisma/schema.prisma', '/public/sw.js'],
  },

  'ai-integration': {
    title: '🤖 AI Integration for Student Support and Learning',
    context: 'Implement AI-powered features for personalized Biology education',
    prompt: `
You are an AI integration specialist for Cerebrum Biology Academy's intelligent learning platform.

**TASK:** Implement comprehensive AI features for personalized Biology education and student support

**CONTEXT:**
- Platform: ${PROJECT_CONTEXT.name} with 10,000+ Biology students
- Subject focus: NEET, CBSE, ICSE, IB Biology curricula
- Current success: 94.2% NEET qualification rate
- Goal: Enhance learning outcomes through AI personalization
- Integration: OpenAI GPT-4, MCP (Model Context Protocol)

**DELIVERABLES NEEDED:**

1. **AI Chatbot for Student Support:**
   - 24/7 doubt resolution system
   - Biology topic explanation with diagrams
   - Exam preparation guidance
   - Study schedule optimization
   - Emotional support for exam stress

2. **Personalized Learning System:**
   - Adaptive difficulty based on student performance
   - Weakness identification and targeted practice
   - Learning path optimization
   - Progress tracking and predictions
   - Intelligent content recommendations

3. **Assessment AI:**
   - Automated question generation
   - Answer evaluation and feedback
   - Performance analytics
   - Predictive scoring for NEET/board exams
   - Comparative analysis with peer performance

4. **Content Intelligence:**
   - Auto-generated study notes
   - Diagram and flowchart creation
   - Multilingual support (English, Hindi)
   - Voice-to-text for accessibility
   - Real-time concept clarification

**TECHNICAL IMPLEMENTATION:**
- AI service integration with OpenAI API
- Vector database for Biology knowledge base
- Real-time chat system with WebSocket
- Machine learning models for performance prediction
- MCP integration for advanced context handling

**FEATURES:**
- Natural language query processing
- Biological concept visualization
- Interactive learning modules
- Intelligent tutoring system
- Performance prediction algorithms

**SUCCESS METRICS:**
- Student engagement: +40% time on platform
- Doubt resolution: <2 minutes average response
- Learning efficiency: +25% faster concept mastery
- Exam performance: Maintain 94.2%+ success rate
- User satisfaction: NPS score >80

Please provide complete AI integration architecture with implementation roadmap.
    `,
    files: ['/src/lib/ai/', '/src/components/chat/', '/src/lib/openai/chatService.ts'],
  },

  'analytics-dashboard': {
    title: '📊 Comprehensive Analytics Dashboard for Business Intelligence',
    context: 'Build data-driven decision making system for education business',
    prompt: `
You are a business intelligence specialist for Cerebrum Biology Academy's data analytics system.

**TASK:** Create comprehensive analytics dashboard for data-driven business decisions

**CONTEXT:**
- Platform: ${PROJECT_CONTEXT.name} with growing student base
- Stakeholders: Founders, marketing team, academic team, students, parents
- Data sources: Website, payments, WhatsApp, student performance, marketing campaigns
- Goal: Optimize operations, marketing ROI, and student outcomes

**DELIVERABLES NEEDED:**

1. **Business Analytics:**
   - Revenue tracking and forecasting
   - Student acquisition cost (CAC) analysis
   - Lifetime value (LTV) calculations
   - Conversion funnel optimization
   - Marketing ROI measurement

2. **Academic Performance Analytics:**
   - Student progress tracking
   - Concept mastery heatmaps
   - Predictive success modeling
   - Dropout risk identification
   - Comparative performance analysis

3. **Marketing Intelligence:**
   - Campaign performance tracking
   - Lead source attribution
   - Conversion rate optimization
   - A/B testing results
   - Social media engagement metrics

4. **Operational Dashboards:**
   - Real-time platform usage
   - System performance monitoring
   - Support ticket analytics
   - Payment processing metrics
   - User experience insights

**TECHNICAL REQUIREMENTS:**
- Google Analytics 4 integration
- Custom event tracking
- Real-time data processing
- Interactive visualizations
- Automated reporting
- Alert system for anomalies

**DASHBOARD FEATURES:**
- Executive summary view
- Department-specific dashboards
- Drill-down capabilities
- Export functionality
- Mobile-responsive design
- Role-based access control

**KEY METRICS TO TRACK:**
- Monthly recurring revenue (MRR)
- Student engagement rates
- Course completion rates
- Exam success predictions
- Support response times
- Platform performance metrics

Please provide complete analytics architecture with implementation plan and key dashboard designs.
    `,
    files: ['/src/lib/analytics/', '/src/components/dashboard/admin/', '/src/lib/tracking/'],
  },

  'free-resources-system': {
    title: '🎁 Free Resources System with AI-Powered Learning Tools',
    context:
      'Create comprehensive free educational resources to attract and engage students long-term',
    prompt: `
You are an educational technology specialist for Cerebrum Biology Academy's free resources system that will drive student acquisition and engagement.

**TASK:** Build a comprehensive free resources platform with AI-powered learning tools that requires zero ongoing operational costs

**CONTEXT:**
- Platform: ${PROJECT_CONTEXT.name} targeting Biology students (NEET, CBSE, ICSE, IB, IGCSE)
- Strategy: Freemium model - attract students with valuable free resources, convert to paid courses
- Target: 50,000+ free users driving 5,000+ paid conversions annually
- Constraint: Must be cost-neutral (no ongoing operational expenses)
- Goal: Market penetration and lead generation through value-first approach

**CORE FREE FEATURES TO IMPLEMENT:**

1. **📚 Read-Only Chapter Notes System:**
   - Complete chapter summaries for all curricula (NEET, CBSE, ICSE, IB, IGCSE)
   - Topics: Cell Biology, Genetics, Ecology, Human Physiology, Plant Biology
   - Format: PDF downloads, interactive web pages, mobile-optimized
   - Content structure: Concept maps, key points, diagrams, quick revision
   - Search functionality across all notes
   - Bookmark and favorites system

2. **🤖 AI-Powered Customized Test Generator:**
   - Student selects: Topic, difficulty level, question count, time limit
   - AI generates unique question papers for each attempt
   - Question types: MCQs, short answers, diagram-based questions
   - Adaptive difficulty based on previous performance
   - Unlimited test generation (no limits)
   - Export tests as PDF for offline practice

3. **📊 Automated Test Evaluation & Analysis:**
   - Instant scoring and detailed performance analysis
   - Strengths/weaknesses identification by topic
   - Comparison with peer performance
   - Personalized improvement recommendations
   - Progress tracking over time
   - Detailed explanations for incorrect answers

4. **📖 Practice Question Bank:**
   - 10,000+ questions across all Biology topics
   - Categorized by: Curriculum, Class, Chapter, Difficulty
   - Previous year questions from NEET, CBSE, ICSE boards
   - Solution explanations with step-by-step approach
   - Tag-based filtering and search
   - Community-contributed questions (moderated)

**ADVANCED FREE FEATURES (Research-Based):**

5. **🎯 Personalized Study Planner:**
   - AI-generated study schedules based on exam dates
   - Topic-wise time allocation based on student weaknesses
   - Daily/weekly/monthly study goals
   - Progress tracking and motivation system
   - Reminder notifications and study streaks

6. **🎮 Gamification Elements:**
   - Points system for completing tests and reading notes
   - Achievement badges for milestones
   - Daily challenges and bonus questions
   - Leaderboards (class-wise, school-wise, city-wise)
   - Virtual rewards and certificates

7. **👥 Social Learning Features:**
   - Study groups creation and management
   - Peer-to-peer doubt sharing and resolution
   - Community forums for each Biology topic
   - Student-generated content sharing
   - Mentor program (senior students helping juniors)

8. **📱 Mobile Learning Tools:**
   - Offline content download for limited internet
   - Voice-based question answering
   - Quick revision flashcards
   - Daily biology facts and tips
   - Push notifications for study reminders

9. **🧠 Conceptual Learning Aids:**
   - Interactive Biology diagrams and animations
   - Concept mapping tools
   - Memory palace techniques for Biology
   - Mnemonics generator for complex processes
   - Visual learning through infographics

10. **📈 Performance Analytics:**
    - Detailed progress reports for students and parents
    - Predictive modeling for exam success probability
    - Weakness analysis with targeted content suggestions
    - Time-based performance trends
    - Comparison with successful NEET toppers

**TECHNICAL IMPLEMENTATION REQUIREMENTS:**

**Cost-Neutral Architecture:**
- Static content generation (no dynamic server costs)
- Client-side AI processing where possible
- Cached responses and offline-first approach
- Efficient database queries with proper indexing
- CDN for content delivery optimization

**Database Schema:**
\`\`\`typescript
// Core entities
interface FreeUser {
  id: string
  email: string
  grade: string
  curriculum: 'NEET' | 'CBSE' | 'ICSE' | 'IB' | 'IGCSE'
  registrationDate: Date
  lastActive: Date
}

interface ChapterNote {
  id: string
  curriculum: string
  grade: string
  chapter: string
  content: string // Markdown format
  downloadCount: number
  rating: number
}

interface Question {
  id: string
  topic: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  type: 'MCQ' | 'Short' | 'Diagram'
  question: string
  options?: string[]
  answer: string
  explanation: string
  tags: string[]
}

interface TestAttempt {
  id: string
  userId: string
  questions: Question[]
  answers: string[]
  score: number
  timeSpent: number
  analysis: PerformanceAnalysis
  generatedAt: Date
}
\`\`\`

**AI Integration Strategy:**
- Use OpenAI API for question generation and evaluation
- Implement smart caching to minimize API costs
- Client-side processing for basic analytics
- Batch processing for performance analysis
- Use free tiers of AI services strategically

**Monetization Integration:**
- Strategic placement of paid course promotions
- "Unlock advanced features" upgrade prompts
- Success story testimonials from paid students
- Limited advanced features (unlock with payment)
- Email nurturing campaigns for free users

**SUCCESS METRICS:**
- Free user registrations: 10,000+ monthly
- Daily active users: 30%+ of registered users
- Test attempts per user: 5+ monthly
- Conversion to paid: 10%+ annually
- User retention: 60%+ after 3 months
- Content engagement: 20+ minutes average session

**IMPLEMENTATION PHASES:**

**Phase 1 (Week 1-2):** Basic Infrastructure
- User registration and authentication
- Chapter notes upload and display system
- Basic question bank structure

**Phase 2 (Week 3-4):** AI Test Generation
- OpenAI integration for question generation
- Test creation interface
- Basic scoring system

**Phase 3 (Week 5-6):** Advanced Analysis
- Performance analytics implementation
- Progress tracking system
- Personalized recommendations

**Phase 4 (Week 7-8):** Social & Gamification
- Community features development
- Gamification elements integration
- Mobile optimization

**TECHNICAL SPECIFICATIONS:**

**Frontend Components Needed:**
- FreeResourcesHub (main dashboard)
- ChapterNotesViewer with PDF export
- CustomTestGenerator with AI integration
- TestAnalysisDisplay with charts
- QuestionBankBrowser with filtering
- ProgressTracker with analytics
- CommunityForum for discussions
- StudyPlannerInterface

**Backend Services Required:**
- AI question generation service
- Test evaluation and analysis engine
- User progress tracking system
- Content management for notes and questions
- Community moderation system
- Analytics and reporting service

**Database Optimization:**
- Proper indexing for fast searches
- Caching layer for frequently accessed content
- Efficient query patterns for analytics
- Data archiving strategy for old attempts

Please provide detailed technical implementation plan, component architecture, database schema, and deployment strategy for this comprehensive free resources system that will drive significant user acquisition while maintaining cost neutrality.
    `,
    files: [
      '/src/app/resources/',
      '/src/components/resources/',
      '/src/lib/ai/questionGenerator.ts',
      '/src/lib/resources/',
      '/prisma/schema.prisma',
    ],
  },
}

function generatePrompt(taskType) {
  const task = CLAUDE_PROMPTS[taskType]

  if (!task) {
    log.info('Available task types:')
    Object.keys(CLAUDE_PROMPTS).forEach((key) => {
      console.log(`  - ${key}: ${CLAUDE_PROMPTS[key].title}`)
    })
    return
  }

  log.divider()
  log.success(`Generated Claude Prompt: ${task.title}`)
  log.info(`Context: ${task.context}`)
  log.divider()

  log.prompt('COPY THIS PROMPT FOR CLAUDE:')
  log.divider()
  console.log(task.prompt.trim())
  log.divider()

  if (task.files && task.files.length > 0) {
    log.info('Related files to review:')
    task.files.forEach((file) => console.log(`  - ${file}`))
    log.divider()
  }

  log.success('Prompt ready! Copy the above text and paste it to Claude.')
}

function showProjectContext() {
  log.divider()
  log.success('📋 Cerebrum Biology Academy - Project Context')
  log.divider()

  console.log(`🎓 ${PROJECT_CONTEXT.name}`)
  console.log(`📚 Type: ${PROJECT_CONTEXT.type}`)
  console.log(`🌍 Markets: ${PROJECT_CONTEXT.markets.join(', ')}`)
  console.log(`⚙️  Tech Stack: ${PROJECT_CONTEXT.techStack}`)
  console.log(`🚀 Phase: ${PROJECT_CONTEXT.currentPhase}`)
  console.log(`💰 Target: ${PROJECT_CONTEXT.targetRevenue}`)
  console.log(`👥 Users: ${PROJECT_CONTEXT.studentBase}`)
  console.log(`🏆 Success: ${PROJECT_CONTEXT.successRate}`)

  log.divider()
  log.info('Available prompt types:')
  Object.keys(CLAUDE_PROMPTS).forEach((key) => {
    console.log(`  📌 ${key}: ${CLAUDE_PROMPTS[key].title}`)
  })
  log.divider()
}

// Main execution
const taskType = process.argv[2]

if (!taskType) {
  showProjectContext()
} else {
  generatePrompt(taskType)
}
