# Cerebrum Biology Academy Constitution

## Core Principles

### I. Education-First Architecture

Every feature must directly enhance student learning outcomes or teacher efficiency. Components must be designed around the learning experience: AI must personalize, platforms must engage, and systems must track meaningful educational progress. No feature exists solely for technical elegance.

### II. Revenue-Driven Development (NON-NEGOTIABLE)

Technology investment scales with revenue growth. Bootstrap approach requires that every feature must demonstrate clear ROI path before implementation. Budget discipline: Month 1-3 (₹50K tech budget), Month 4-6 (₹1L), Month 7-12 (₹2L-4L), Year 2 (₹7L-10L).

### III. Next.js 15.5.3 + TypeScript First

All web development uses Next.js 15.5.3 with App Router, TypeScript strict mode, and Tailwind CSS. Mobile development uses React Native with Expo. Database operations through Prisma ORM with PostgreSQL. AI integration via OpenAI GPT-4 and MCP servers.

### IV. Test-Driven Educational Features

TDD mandatory for all student-facing features: Write tests for learning outcomes → Validate with educators → Tests fail → Implement. Special focus on payment flows, student progress tracking, and AI educational responses.

### V. Indian Market Optimization

All features must work optimally for Indian internet speeds, payment methods (Razorpay), and mobile-first usage patterns. WhatsApp Business API integration required for student communication. City-specific SEO for 12 coaching hubs.

## Technology Stack Requirements

### Mandatory Stack

- **Frontend**: Next.js 15.5.3, React 19.1.0, TypeScript 5+, Tailwind CSS 4
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL
- **Mobile**: React Native with Expo, TypeScript
- **Payments**: Razorpay (Indian market compliance)
- **Communication**: WhatsApp Business API, Email automation
- **AI**: OpenAI GPT-4, MCP integration, Claude Code compatibility
- **Analytics**: Google Analytics 4, Custom learning analytics
- **Deployment**: Vercel (web), App Store/Play Store (mobile)

### Performance Standards

- **Web**: Core Web Vitals in green, <3s load time on 3G
- **Mobile**: <2MB initial bundle, offline capability for core features
- **SEO**: Top 3 ranking for "Biology coaching [city]" in target markets
- **Uptime**: 99.9% availability during NEET preparation months

## Development Workflow

### Quality Gates

1. **Code Quality**: ESLint passing, TypeScript strict mode, Prettier formatting
2. **Testing**: 80%+ coverage for payment flows, 100% for AI educational responses
3. **Performance**: Lighthouse score >90, mobile-first validation
4. **Security**: Payment data compliance, student data protection (GDPR/local laws)
5. **Education**: Learning outcome validation with real student feedback

### AI Integration Requirements

- All AI features must be tested with real biology curriculum content
- AI responses must be factually accurate and curriculum-aligned
- Personalization must improve student performance metrics
- AI agents must support multiple Indian languages for accessibility

### Revenue Tracking

Every feature must track:

- Student enrollment conversion impact
- Retention rate influence
- Revenue per student metrics
- Cost per acquisition changes
- Monthly recurring revenue growth

## Governance

Constitution supersedes all development practices. All features, PRs, and architectural decisions must align with education-first and revenue-driven principles. Complexity must demonstrate clear educational or business value.

**Version**: 1.0.0 | **Ratified**: 2025-09-18 | **Last Amended**: 2025-09-18
