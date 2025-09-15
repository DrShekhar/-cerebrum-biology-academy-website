# CLAUDE.md - Development Instructions for Cerebrum Biology Academy Website

## Project Overview
Cerebrum Biology Academy is a premium NEET Biology coaching website built with Next.js 15.5.3, TypeScript, and Tailwind CSS. The project focuses on medical entrance exam preparation with specialized courses for different student segments.

## Current Development Status
✅ **Completed:**
- Complete course system with 4 main courses (Class 11, 12, Dropper, Foundation)
- Navigation system with responsive header and footer
- Homepage with hero section, testimonials, faculty profiles
- Mock test system and student portal
- Legal pages (Privacy Policy, Terms, Refund Policy, Disclaimer)
- Deployment to Vercel with GitHub integration

🔄 **In Progress:**
- Board Preparation section (CBSE, ICSE, IGCSE, IB, State Board)
- Services pages (Online Classes, Classroom, International, Doubt Resolution)
- Company pages (Results, Careers)
- Support pages (Help Center, Demo, Brochure, Fees, Admission)

## Key Technologies
- **Framework:** Next.js 15.5.3 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Deployment:** Vercel
- **Repository:** GitHub

## NEET Exam Context
- **Total Marks:** 720 (Biology: 360, Physics: 180, Chemistry: 180)
- **Biology Questions:** 90 questions × 4 marks each = 360 marks
- **Target Biology Score:** 330+ out of 360 for top medical colleges
- **Success Rate:** 94.2% NEET qualification rate

## Development Guidelines

### Code Style
- Follow existing component patterns and naming conventions
- Use TypeScript with proper type definitions
- Implement responsive design with Tailwind CSS
- Include proper SEO metadata for all pages
- Follow Next.js 15 best practices

### File Structure
```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable React components
├── data/               # Static data and content
└── lib/                # Utility functions and types
```

### Common Commands
```bash
npm run dev             # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
npm run type-check     # Run TypeScript checks
```

### Important Notes
- All course pages must include proper metadata for SEO
- Biology scores should always show 330+ out of 360 marks
- Navigation should work across all device sizes
- Footer links must connect to actual pages
- Use consistent color schemes: Blue (primary), Green (foundation), Purple (class 12), Red (dropper)

## Current Priority Tasks
1. Complete Board Preparation section with all board types
2. Create Services section with delivery methods
3. Add Company pages for results and careers
4. Implement Support pages for student assistance
5. Fix any remaining footer navigation links

## Contact Information
- Phone: +91 88264 44334
- Website: www.cerebrumbiologyacademy.com
- Domain Provider: Hostinger