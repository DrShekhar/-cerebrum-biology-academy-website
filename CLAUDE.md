# CLAUDE.md - Development Instructions for Cerebrum Biology Academy

## 🎯 Project Vision

Transform Cerebrum Biology Academy into the world's leading Biology education platform with comprehensive ecosystem including web, mobile apps, LMS, CRM, AI agents, community features, testing platforms, and parental monitoring - all while maintaining a bootstrap approach that scales with revenue.

## 📊 Current Status (MVP Foundation Complete)

### ✅ **Phase 1 Completed (Weeks 1-4):**

- ✅ Basic platform fixes and admin route resolution
- ✅ Streamlined enrollment system with Razorpay payment integration (`/src/lib/payments/razorpay.ts`)
- ✅ WhatsApp Business API for lead nurturing (`/src/lib/whatsapp/whatsappService.ts`)
- ✅ Global SEO optimization for international ranking (`/src/lib/seo/`)
  - City-specific SEO for Indian coaching hubs (Kota, Delhi, Hyderabad, etc.)
  - Automated sitemap generation (`/src/app/sitemap.xml/route.ts`)
  - Metadata service for all page types (`/src/lib/seo/metadataService.ts`)
  - International SEO with hreflang support

### 🔄 **Currently In Progress:**

- 📊 Google Analytics 4 & Search Console setup
- 🎯 Google Ads campaigns (₹500/day budget)
- 👨‍🎓 Basic student portal development
- 📅 Automated demo booking with Zoom integration

## 🏗️ Complete Development Roadmap (40 Weeks)

### **PHASE 1: MVP FOUNDATION (Weeks 1-4) - ✅ COMPLETED**

Revenue Target: ₹2L/month | Tech Budget: ₹50K/month

- ✅ Platform stability & payment integration
- ✅ WhatsApp automation for lead conversion
- ✅ Global SEO for international ranking
- 🔄 Analytics & Google Ads setup
- 🔄 Basic student portal & demo booking

### **PHASE 2: GROWTH & AUTOMATION (Weeks 5-8)**

Revenue Target: ₹5L/month | Tech Budget: ₹1L/month

- 🤖 AI-powered chatbot for student support & lead conversion
- 📧 Automated email sequences for onboarding & retention
- 🎨 Mobile-responsive design optimization for Indian market
- 📝 Basic testing module with auto-evaluation
- 📱 React Native mobile app development
- 🔄 Real-time data synchronization (web-mobile)

### **PHASE 3: ADVANCED FEATURES (Weeks 9-16)**

Revenue Target: ₹10L/month | Tech Budget: ₹2L/month

- 📝 Note-taking tool (Notability-style) for students
- 👥 Two-tier community system (free/paid subscribers)
- 🎥 Zoom integration for live classes with batch management
- 👨‍👩‍👧‍👦 Parental monitoring dashboard with performance tracking
- 💳 Advanced fee management with automated reminders
- 🤖 AI peer teacher bot for topic explanation & emotional support
- 📚 Comprehensive resource collection & organization
- 📋 Assignment tracking with AI bot follow-ups

### **PHASE 4: AI & AUTOMATION EXCELLENCE (Weeks 17-24)**

Revenue Target: ₹20L/month | Tech Budget: ₹4L/month

- 🧠 MCP integration for enhanced AI capabilities
- 🎯 Specialized AI agents for different functions
- 🌐 Automated Google My Business & social media management
- 🏆 Success story video wall & photo gallery automation
- 🎓 AI-powered adaptive learning system
- 📊 Comprehensive analytics & reporting dashboard

### **PHASE 5: SCALING & OPTIMIZATION (Weeks 25-32)**

Revenue Target: ₹35L/month | Tech Budget: ₹7L/month

- 🚀 GitHub Spec Kit for improved development workflow
- 📝 Strapi CMS for content management across platforms
- 🔍 SEO automation with AI content generation
- 🎯 Conversion funnel optimization based on data insights
- 📈 Scale to 10,000+ concurrent users with performance optimization

### **PHASE 6: MARKET DOMINANCE (Weeks 33-40)**

Revenue Target: ₹50L/month | Tech Budget: ₹10L/month

- 🌍 International expansion features
- 🤝 Partner integrations & white-label solutions
- 🏅 Enterprise features for institutional clients
- 📱 Advanced mobile features & offline capabilities
- 🎯 Achieve market leadership position in Biology education

## 🏗️ Technical Architecture

### **Core Technologies**

- **Framework:** Next.js 15.5.3 with App Router
- **Language:** TypeScript with strict type checking
- **Styling:** Tailwind CSS with custom utilities
- **Database:** PostgreSQL with Prisma ORM
- **Payment:** Razorpay integration for Indian market
- **Communication:** WhatsApp Business API
- **Mobile:** React Native with Expo
- **AI/ML:** OpenAI GPT-4, MCP integration
- **Analytics:** Google Analytics 4, Custom dashboard
- **Deployment:** Vercel (web), App Store/Play Store (mobile)

### **SEO & Global Ranking Strategy**

- **City-Specific SEO:** 12 major Indian coaching hubs
  - Tier 1: Kota, Delhi, Hyderabad (250K+ students)
  - Tier 2: Bangalore, Mumbai, Pune, Chennai, Jaipur (80K-150K students)
  - Tier 3: Indore, Lucknow, Patna, Bhubaneswar (40K-70K students)
- **International SEO:** US, UK, Canada, Australia, UAE, Singapore
- **Competitor Analysis:** Allen, Resonance, Aakash, BYJU'S, Unacademy
- **Content Strategy:** 200+ biology topics, exam-specific content
- **Schema Markup:** Course, Organization, LocalBusiness schemas

### **Key File Structure**

```
src/
├── app/                 # Next.js app router pages
│   ├── api/            # API routes (payments, WhatsApp, etc.)
│   ├── admin/          # Admin panel routes
│   ├── courses/        # Course pages
│   ├── locations/      # City-specific landing pages
│   └── sitemap.xml/    # Automated sitemap generation
├── components/         # Reusable React components
│   ├── enrollment/     # Payment & enrollment forms
│   ├── ui/            # Base UI components
│   └── dashboard/     # Student portal components
├── lib/               # Utility functions and services
│   ├── payments/      # Razorpay integration
│   ├── whatsapp/      # WhatsApp Business API
│   ├── seo/          # SEO services & metadata
│   └── ai/           # AI agents & MCP integration
└── data/             # Static content and configurations
```

## 💰 Revenue-First Bootstrap Strategy

**Philosophy:** Scale technology investment with revenue growth

- **Month 1-3:** ₹50K tech budget → Target ₹2L revenue
- **Month 4-6:** ₹1L tech budget → Target ₹5L revenue
- **Month 7-12:** ₹2L-4L tech budget → Target ₹10L-20L revenue
- **Year 2:** ₹7L-10L tech budget → Target ₹35L-50L revenue

## 🎯 Success Metrics & KPIs

- **Enrollment Conversion:** 5-10% (industry standard: 2-3%)
- **Student Retention:** 90%+ (current: 94.2% NEET qualification)
- **Monthly Revenue Growth:** 25-50%
- **Customer Acquisition Cost:** <₹2000 per student
- **Lifetime Value:** ₹75,000+ per student
- **International Market:** 20% of total revenue by Year 2

## 📋 Development Commands

```bash
# Development
npm run dev             # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
npm run type-check     # Run TypeScript checks

# Testing
npm run test           # Run unit tests
npm run test:e2e       # Run end-to-end tests
npm run test:coverage  # Generate coverage report

# Deployment
git push origin main   # Auto-deploy to Vercel
npm run deploy:mobile  # Deploy mobile app updates
```

## 🔧 Environment Variables

```bash
# Payment Integration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret_key

# WhatsApp Business API
WHATSAPP_API_URL=https://graph.facebook.com/v17.0
WHATSAPP_ACCESS_TOKEN=your_access_token

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/cerebrum

# AI Integration
OPENAI_API_KEY=your_openai_key
MCP_ENDPOINT=your_mcp_endpoint

# Analytics
GOOGLE_ANALYTICS_ID=GA4_MEASUREMENT_ID
GOOGLE_SEARCH_CONSOLE_ID=your_gsc_id
```

## 🚀 Claude Plan Recommendation

For your current ambitious project scope with AI integration, real-time development, and global SEO automation, I recommend:

**Claude Pro ($20/month)** for the next 3-6 months because:

- Higher usage limits for extensive codebase work
- Priority access during peak hours for consistent development
- Better for iterative development cycles
- Cost-effective for bootstrap approach (₹1,600/month vs your ₹50K tech budget)

After revenue reaches ₹10L/month (Phase 3), consider **Claude Team** for:

- Collaborative development with team members
- Advanced project management features
- Higher limits for scaling development

## 📞 Contact & Support

- **Phone:** +91 88264 44334
- **Website:** cerebrumbiologyacademy.com
- **Domain:** Hostinger
- **Deployment:** Vercel
- **Repository:** GitHub (private)

## 🎓 NEET Context & Biology Focus

- **Total NEET Marks:** 720 (Biology: 360, Physics: 180, Chemistry: 180)
- **Biology Weightage:** 50% of total marks
- **Target Score:** 330+/360 in Biology for top medical colleges
- **Success Rate:** 94.2% NEET qualification rate
- **Student Base:** 10,000+ enrolled students
- **Geographic Reach:** All India + International markets

---

_Last Updated: December 17, 2024_
_Next Review: End of Phase 1 (Week 4)_
