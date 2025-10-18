# How to Start a Fresh Website Project

**Last Updated:** October 17, 2025

This guide covers multiple scenarios for starting a new website project, from scratch to migrating existing code.

---

## Option 1: Brand New Next.js Project (Recommended for New Sites)

### Step 1: Create New Project

```bash
# Navigate to your projects directory
cd ~/

# Create new Next.js project with TypeScript and Tailwind
npx create-next-app@latest my-new-website

# During setup, choose:
# ✅ TypeScript: Yes
# ✅ ESLint: Yes
# ✅ Tailwind CSS: Yes
# ✅ src/ directory: Yes
# ✅ App Router: Yes
# ✅ Customize import alias: No (default @/*)
```

### Step 2: Navigate and Start Development

```bash
cd my-new-website
npm run dev
```

**Result:** Your site will be running at http://localhost:3000

### Step 3: Initialize Git

```bash
git init
git add .
git commit -m "Initial commit: Fresh Next.js project"
```

### Step 4: Create GitHub Repository

```bash
# Option A: Using GitHub CLI
gh repo create my-new-website --public --source=. --remote=origin --push

# Option B: Manual
# 1. Go to https://github.com/new
# 2. Create repository named "my-new-website"
# 3. Then run:
git remote add origin https://github.com/YOUR_USERNAME/my-new-website.git
git branch -M main
git push -u origin main
```

### Step 5: Deploy to Vercel

```bash
# Option A: Using Vercel CLI
npm i -g vercel
vercel

# Option B: Via Dashboard (Easier)
# 1. Go to https://vercel.com/new
# 2. Import your GitHub repository
# 3. Click "Deploy"
```

**Done!** Your fresh website is live in ~2 minutes.

---

## Option 2: Clone and Customize a Template

### Popular Templates

#### 1. **Next.js Commerce** (E-commerce)

```bash
npx create-next-app my-store --example https://github.com/vercel/commerce
cd my-store
npm install
npm run dev
```

#### 2. **SaaS Starter** (Business/SaaS)

```bash
git clone https://github.com/nextauthjs/next-auth-example.git my-saas
cd my-saas
npm install
npm run dev
```

#### 3. **Blog Starter** (Content Site)

```bash
npx create-next-app my-blog --example blog-starter
cd my-blog
npm install
npm run dev
```

#### 4. **Portfolio Template**

```bash
npx create-next-app my-portfolio --example https://github.com/vercel/nextjs-portfolio-starter
cd my-portfolio
npm install
npm run dev
```

---

## Option 3: Start Fresh with Different Technology Stack

### A. React + Vite (Faster than Next.js for simple sites)

```bash
npm create vite@latest my-website -- --template react-ts
cd my-website
npm install
npm run dev
```

### B. Astro (Best for Content Sites)

```bash
npm create astro@latest my-website
cd my-website
npm install
npm run dev
```

### C. Remix (Full-stack Framework)

```bash
npx create-remix@latest my-website
cd my-website
npm install
npm run dev
```

### D. SvelteKit (Lightweight Alternative)

```bash
npm create svelte@latest my-website
cd my-website
npm install
npm run dev
```

### E. Static HTML/CSS/JS (Simplest)

```bash
mkdir my-website
cd my-website

# Create basic structure
mkdir -p css js images
touch index.html css/style.css js/script.js

# Initialize git
git init
git add .
git commit -m "Initial commit"
```

---

## Option 4: Migrate Existing Cerebrum Academy to New Project

### Scenario: Start Fresh But Keep Some Features

#### Step 1: Create New Project

```bash
cd ~/
npx create-next-app@latest cerebrum-v2
cd cerebrum-v2
```

#### Step 2: Copy Specific Features You Want to Keep

```bash
# Copy AI features
cp -r ~/cerebrum-biology-academy-website/src/lib/ai ./src/lib/

# Copy payment integration
cp -r ~/cerebrum-biology-academy-website/src/lib/payments ./src/lib/

# Copy WhatsApp integration
cp -r ~/cerebrum-biology-academy-website/src/lib/whatsapp ./src/lib/

# Copy environment variables
cp ~/cerebrum-biology-academy-website/.env.local .env.local

# Copy documentation
cp -r ~/cerebrum-biology-academy-website/docs ./docs
```

#### Step 3: Install Dependencies

```bash
npm install razorpay
npm install openai
npm install @anthropic-ai/sdk
npm install @google-ai/generativelanguage
npm install redis
npm install prisma @prisma/client
```

#### Step 4: Clean Start

```bash
git init
git add .
git commit -m "feat: Initialize Cerebrum v2 with migrated AI features"
```

---

## Option 5: Start Fresh with Current Cerebrum Project

### Scenario: Reset Current Project to Clean State

#### ⚠️ WARNING: This will delete uncommitted changes!

```bash
cd ~/cerebrum-biology-academy-website

# Save current work to backup branch
git branch backup-$(date +%Y%m%d)
git add .
git commit -m "Backup before reset"

# Option A: Reset to specific commit (keep history)
git log --oneline  # Find commit hash you want to go back to
git reset --hard COMMIT_HASH

# Option B: Delete everything and start fresh
rm -rf src/
npx create-next-app@latest . --use-npm

# Option C: Keep structure, delete content
find src/ -type f -name "*.tsx" -not -path "*/layout.tsx" -delete
```

**Not Recommended** - Better to create new project

---

## Technology Stack Comparison

| Stack            | Best For             | Learning Curve | Performance | Cost                  |
| ---------------- | -------------------- | -------------- | ----------- | --------------------- |
| **Next.js**      | Full-stack apps, SEO | Medium         | Excellent   | Free (Vercel)         |
| **Vite + React** | SPAs, simple sites   | Easy           | Excellent   | Free                  |
| **Astro**        | Content-heavy sites  | Easy           | Fastest     | Free                  |
| **Remix**        | Complex data apps    | Hard           | Excellent   | Free (Vercel/Netlify) |
| **HTML/CSS/JS**  | Landing pages        | Easiest        | Fast        | Free                  |
| **WordPress**    | Blogs, CMS           | Easy           | Slow        | ₹300-500/mo           |

---

## Recommended Workflow for Starting Fresh

### For Education Platform (Like Cerebrum)

```bash
# 1. Create project
npx create-next-app@latest cerebrum-fresh --typescript --tailwind --app --src-dir

cd cerebrum-fresh

# 2. Install core dependencies
npm install prisma @prisma/client
npm install next-auth
npm install razorpay
npm install zod  # Form validation
npm install react-hot-toast  # Notifications

# 3. Install AI dependencies (if needed)
npm install openai @anthropic-ai/sdk @google-ai/generativelanguage redis

# 4. Setup Prisma (Database)
npx prisma init

# 5. Create basic structure
mkdir -p src/components/{ui,forms,dashboard,courses}
mkdir -p src/lib/{auth,db,payments,ai}
mkdir -p src/app/api/{auth,payments,ai}

# 6. Initialize Git
git init
git add .
git commit -m "feat: Initialize Cerebrum fresh project"

# 7. Create GitHub repo
gh repo create cerebrum-fresh --public --source=. --push

# 8. Deploy to Vercel
vercel --prod
```

**Time Required:** 30 minutes to 1 hour

---

## Essential Files for Fresh Project

### 1. `.env.local` (Environment Variables)

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Payment
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."

# AI (Optional)
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
REDIS_URL="redis://..."
```

### 2. `package.json` (Core Dependencies)

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "prisma": "^5.0.0",
    "@prisma/client": "^5.0.0"
  }
}
```

### 3. `tailwind.config.ts` (Styling)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#059669',
      },
    },
  },
  plugins: [],
}

export default config
```

### 4. `tsconfig.json` (TypeScript)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Common Mistakes to Avoid

### ❌ Don't:

1. Start coding without planning structure
2. Mix multiple UI frameworks (Tailwind + Bootstrap)
3. Forget to initialize Git from the start
4. Hardcode secrets in code
5. Skip TypeScript (use it from day 1)
6. Install too many dependencies early
7. Forget to add `.env.local` to `.gitignore`

### ✅ Do:

1. Plan your folder structure first
2. Use one UI framework consistently
3. Initialize Git immediately
4. Use environment variables
5. Use TypeScript for type safety
6. Install dependencies as needed
7. Keep secrets in `.env.local`

---

## Quick Start Commands Reference

```bash
# Create Next.js project
npx create-next-app@latest my-project

# Create Vite project
npm create vite@latest my-project -- --template react-ts

# Create Astro project
npm create astro@latest my-project

# Initialize Git
git init

# Create GitHub repo
gh repo create my-project --public --source=. --push

# Deploy to Vercel
vercel --prod

# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start
```

---

## Learning Resources

### Official Documentation

- **Next.js:** https://nextjs.org/docs
- **React:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Prisma:** https://www.prisma.io/docs
- **Vercel:** https://vercel.com/docs

### Video Tutorials

- **Next.js 15:** https://www.youtube.com/results?search_query=nextjs+15+tutorial
- **Full Stack App:** https://www.youtube.com/results?search_query=nextjs+fullstack+tutorial

### Templates

- **Vercel Templates:** https://vercel.com/templates
- **Next.js Examples:** https://github.com/vercel/next.js/tree/canary/examples

---

## Need Help?

### For Cerebrum-Specific Project:

- **Current Project:** `/Users/drshekhar/cerebrum-biology-academy-website`
- **Documentation:** `/docs/AI_FEATURES.md`, `/docs/README.md`
- **Contact:** +91 88264 44334

### For General Next.js Help:

- **Discord:** https://discord.gg/nextjs
- **GitHub Discussions:** https://github.com/vercel/next.js/discussions
- **Stack Overflow:** Tag `next.js`

---

## Summary: Recommended Path

**For Beginners:**

```bash
npx create-next-app@latest my-website
cd my-website
npm run dev
```

**For Experienced Developers:**

```bash
# Create with specific options
npx create-next-app@latest my-website \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd my-website
npm install prisma @prisma/client next-auth
npx prisma init
npm run dev
```

**For Production-Ready:**

1. Plan database schema
2. Setup authentication
3. Configure payment gateway
4. Add monitoring/analytics
5. Write tests
6. Setup CI/CD

---

**Time to First Deployment:**

- Simple site: **10 minutes**
- With database: **30 minutes**
- Full-featured: **2-4 hours**
- Production-ready: **1-2 weeks**

---

_Last Updated: October 17, 2025_
_For Cerebrum Biology Academy Project Guidance_
