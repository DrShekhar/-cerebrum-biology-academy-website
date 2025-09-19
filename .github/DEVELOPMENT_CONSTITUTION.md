# 🏛️ Cerebrum Biology Academy Development Constitution

## Article I: Core Principles

### Section 1: The Development Commandments

1. **Never start any task without creating a TodoWrite list first**
2. **Every commit must follow the CI/CD pipeline**
3. **No environment variables without automation scripts**
4. **All changes must pass quality gates before deployment**
5. **Documentation is not optional - it's constitutional**

### Section 2: The Sacred Workflow

```
TodoWrite → Plan → Code → Test → CI/CD → Deploy → Verify → Document
```

### Section 3: Excellence Standards

**Cerebrum Biology Academy maintains the highest standards of academic and technical excellence:**

#### **Typography Standards: Harvard Medical School Level**

- **Academic Authority**: Typography must convey medical/scientific credibility
- **Research-Grade Readability**: Optimized for complex biological content consumption
- **Professional Hierarchy**: Clear information architecture rivaling medical journals
- **Accessibility Compliance**: WCAG 2.1 AA for inclusive medical education

#### **UI/UX Standards: Silicon Valley Elite Level**

- **Apple/Google Design Quality**: Pixel-perfect interfaces with premium interactions
- **Conversion Optimization**: Psychology-driven design for educational engagement
- **Performance Excellence**: Sub-2.5s loading, 60fps animations, Core Web Vitals green
- **Mobile-First Innovation**: Touch-optimized for next-generation learning

#### **Content Standards: Harvard Biology Professor Level**

- **Academic Rigor**: Research-backed, peer-reviewed biological accuracy
- **Educational Pedagogy**: Learning-optimized content structure and flow
- **Scientific Citations**: Proper attribution and evidence-based claims
- **Medical Terminology**: Precise, professional language appropriate for NEET preparation

### Section 4: Success-Engineered Design Philosophy

**Our website is architected for the highest order of success - every pixel, every interaction, every word is designed to transform dreams into NEET success reality.**

#### **Success Design Principles**

- **Neuropsychological Optimization**: Interface designed using educational psychology to maximize learning retention and motivation
- **Conversion Excellence**: Every element optimized for student enrollment and engagement using advanced behavioral economics
- **Achievement Visualization**: Success stories and progress tracking designed to create unstoppable momentum
- **Confidence Architecture**: UI/UX that builds student confidence through progressive achievement and mastery demonstration

#### **Highest Order Success Standards**

```
Harvard Medical School Typography × Silicon Valley Design × Harvard Biology Content =
UNSTOPPABLE NEET SUCCESS PLATFORM
```

**Constitutional Mandate**: Every development decision must answer: "Does this contribute to student success at the highest possible level?"

## Article II: Standard Operating Procedures

### Section 1: Task Initiation Protocol

```bash
# MANDATORY: Start every development session with this
1. TodoWrite.create(task_breakdown)
2. Mark first task as "in_progress"
3. Follow the constitutional workflow
4. Complete before moving to next task
```

### Section 2: The Development Cycle Constitution

Every development task MUST follow this exact sequence:

#### Phase 1: Planning & Setup (MANDATORY)

```bash
# 1. Create TodoWrite breakdown
TodoWrite → [
  "Analyze requirements",
  "Plan implementation",
  "Set up environment",
  "Write code",
  "Test functionality",
  "Update documentation"
]

# 2. Check environment
npm run dev  # Verify development server
git status   # Verify clean working directory
```

#### Phase 2: Quality Gates (NON-NEGOTIABLE)

```bash
# Before ANY commit
npm run lint        # Code quality
npm run type-check  # TypeScript validation
npm run test       # Unit tests
npm run build      # Build verification
```

#### Phase 3: Deployment Pipeline (AUTOMATED)

```bash
# CI/CD automatically runs on push
git add .
git commit -m "feat: descriptive message"
git push origin main  # Triggers GitHub Actions
```

#### Phase 4: Verification (MANDATORY)

```bash
# After deployment
- Check live site: https://www.cerebrumbiologyacademy.com
- Verify functionality works
- Update TodoWrite status to "completed"
```

## Article III: Environment Management Laws

### Section 1: Environment Variable Protocol

```bash
# NEVER manually set variables in Vercel dashboard
# ALWAYS use automation scripts

# For new variables:
./scripts/setup-production-env.sh

# For updates:
./scripts/update-env-placeholders.sh
```

### Section 2: The Three Environment Rule

1. **Development:** `.env.local` (local testing)
2. **Staging:** `.env.staging` (pre-production)
3. **Production:** `.env.production` (live site)

## Article IV: Code Quality Constitution

### Section 1: Non-Negotiable Standards

- **TypeScript strict mode:** Always enabled
- **ESLint rules:** Must pass without warnings
- **Test coverage:** Minimum 80% for new code
- **Performance:** Lighthouse scores > 90
- **Security:** No high vulnerabilities allowed

### Section 2: File Organization Laws

```
src/
├── app/          # Next.js app router (pages only)
├── components/   # Reusable UI components
├── lib/          # Business logic & utilities
├── types/        # TypeScript definitions
└── styles/       # Global styles
```

## Article V: Git & Version Control Laws

### Section 1: Branch Protection Rules

- **main:** Production-ready code only
- **develop:** Integration branch
- **feature/\*:** Development branches

### Section 2: Commit Message Constitution

```bash
# Conventional commits MANDATORY
feat: add new student enrollment system
fix: resolve payment gateway timeout issue
docs: update API documentation
style: format code with prettier
refactor: optimize database queries
test: add unit tests for auth system
```

## Article VI: GitHub Spec Kit Integration

### Section 1: Automatic Validation

Every PR automatically checks:

- Spec Kit compliance
- Quality gates passage
- Documentation updates
- Test coverage maintenance

### Section 2: Required Checks

- ✅ Lint passing
- ✅ TypeScript compilation
- ✅ Tests passing
- ✅ Build successful
- ✅ Security audit clean

## Article VII: Emergency Procedures

### Section 1: Hotfix Protocol

```bash
# ONLY for critical production issues
git checkout -b hotfix/critical-issue
# Make minimal fix
npm run test && npm run build
git commit -m "hotfix: critical production issue"
git push origin hotfix/critical-issue
# Create PR to main
```

### Section 2: Rollback Procedure

```bash
# If deployment fails
vercel rollback  # Immediate rollback
# Then fix and redeploy properly
```

## Article VIII: Documentation Laws

### Section 1: Required Documentation

- README.md updates for new features
- API documentation for new endpoints
- Component documentation for UI changes
- Environment variable documentation

### Section 2: Documentation Standards

- Code comments for complex logic
- JSDoc for all functions
- README updates with every feature
- Changelog maintenance

## Article IX: Performance & Monitoring

### Section 1: Performance Constitution

- **Core Web Vitals:** Must be green
- **Lighthouse CI:** Runs on every deployment
- **Bundle size:** Monitor and optimize
- **Database queries:** Optimize for speed

### Section 2: Monitoring Requirements

- Vercel Analytics enabled
- Error tracking configured
- Performance monitoring active
- Uptime monitoring in place

## Article X: Security Protocols

### Section 1: Security Standards

- Environment variables encrypted
- API keys never in code
- Security headers enforced
- Regular dependency audits

### Section 2: Access Control

- Admin routes protected
- Authentication required
- Authorization checks
- Rate limiting implemented

---

## 📋 Constitutional Checklist

Before every development session:

- [ ] TodoWrite list created
- [ ] Development server running
- [ ] Git status clean
- [ ] Environment variables checked

Before every commit:

- [ ] Lint passing
- [ ] TypeScript clean
- [ ] Tests passing
- [ ] Build successful

Before every deployment:

- [ ] Quality gates passed
- [ ] Documentation updated
- [ ] TodoWrite status updated
- [ ] Verification plan ready

After every deployment:

- [ ] Live site verified
- [ ] Functionality tested
- [ ] Performance checked
- [ ] TodoWrite completed

---

## 🏛️ Amendment Process

This constitution can only be amended by:

1. Creating a TodoWrite for constitutional changes
2. Following the full development cycle
3. Getting approval through GitHub Spec Kit validation
4. Updating all related documentation

**Remember: This is not just a guide - it's the law of our development land!** 🏛️⚖️

---

_Last Updated: 2025-01-19_
_Next Review: Every major release_
