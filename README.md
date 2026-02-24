# Cerebrum Biology Academy Website

Modern, responsive website for Biology coaching and NEET preparation with AI-powered SEO features.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **AI-Powered SEO**: Automated content optimization and meta tag generation
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Course Management**: Comprehensive course catalog and booking system
- **Student Portal**: Authentication and progress tracking
- **Contact Integration**: Multiple call-to-action options including calling and appointments
- **Performance Optimized**: Built with Turbopack for fast development

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Lucide React, Framer Motion
- **Development**: ESLint, Prettier, Husky for code quality
- **Deployment**: Vercel (recommended)

## 🏗️ Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable components
│   ├── ui/          # Base UI components
│   ├── layout/      # Layout components
│   ├── forms/       # Form components
│   └── seo/         # SEO-related components
├── lib/             # Utilities and configurations
│   ├── utils.ts     # Utility functions
│   ├── api/         # API configurations
│   └── seo/         # SEO utilities
├── types/           # TypeScript type definitions
└── data/           # Static data and content
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cerebrum-biology-academy.git
cd cerebrum-biology-academy-website
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 🎯 Development Workflow

1. **Agent-Based Development**: Different agents handle UI, UX, Content, and SEO
2. **Feature Branches**: Use descriptive branch names (`ui/hero-section`, `seo/meta-tags`)
3. **Code Quality**: Pre-commit hooks ensure code quality
4. **Testing**: Comprehensive testing before deployment

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📱 Features Roadmap

- [ ] Homepage with hero section
- [ ] Course catalog and details
- [ ] Student testimonials
- [ ] Faculty information
- [ ] Appointment booking system
- [ ] Contact forms with validation
- [ ] Blog with AI content generation
- [ ] SEO optimization tools
- [ ] Student authentication portal
- [ ] Payment integration

## Domain Consolidation: biologyforneetug.com → cerebrumbiologyacademy.com

`biologyforneetug.com` is a legacy domain that ranks for overlapping NEET Biology keywords, splitting SEO authority. All traffic must be consolidated to the primary domain via **301 permanent redirects**.

### Redirect Mappings

| Source (biologyforneetug.com) | Destination (cerebrumbiologyacademy.com) |
|-------------------------------|------------------------------------------|
| `/` (homepage) | `/` |
| `/shekhar-sir` | `/faculty` |
| `/*` (all other paths) | `/` (catch-all) |

### Implementation Notes

- **301 redirects must be configured at the DNS/hosting level** for biologyforneetug.com (e.g., Vercel redirect rules, Cloudflare Page Rules, or Netlify `_redirects`).
- This repo already handles canonical tags — every page on cerebrumbiologyacademy.com emits `<link rel="canonical" href="https://cerebrumbiologyacademy.com/...">` via the `CanonicalManager` component in the root layout and `alternates.canonical` in page metadata.
- After redirects are live, submit the updated sitemap in Google Search Console and use the **Change of Address** tool to notify Google of the domain migration.
- Monitor Google Search Console for both domains for 6-12 months to ensure full index consolidation.

### Vercel Redirect Example (vercel.json)

```json
{
  "redirects": [
    { "source": "/shekhar-sir", "destination": "https://cerebrumbiologyacademy.com/faculty", "statusCode": 301 },
    { "source": "/(.*)", "destination": "https://cerebrumbiologyacademy.com/", "statusCode": 301 }
  ]
}
```

## Support

For support and questions, contact:

- Email: support@cerebrumbiologyacademy.com
- Phone: +918826444334, +919311946297

---

Built by Cerebrum Biology Academy team
