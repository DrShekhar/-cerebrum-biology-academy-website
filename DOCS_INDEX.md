# Documentation Index

## Overview

This index provides a comprehensive guide to all documentation in the Cerebrum Biology Academy project. Documentation is organized into **Active** (current, frequently referenced) and **Archived** (historical, completed) categories.

---

## Active Documentation (Project Root)

### Getting Started

- **README.md** - Project overview, setup instructions, and quick start guide
- **CLAUDE.md** - Instructions for Claude Code development workflow
- **DEVELOPMENT_WORKFLOW.md** - Development processes and best practices

### Current Implementation

- **PRICING_STRATEGY_PROPOSAL.md** - Business pricing strategy (Oct 28, 2025)
- **PRICING_IMPLEMENTATION_PLAN.md** - Technical pricing implementation details
- **RAZORPAY_SETUP_GUIDE.md** - Payment gateway integration guide
- **PAYMENT_TESTING_CHECKLIST.md** - Payment system testing procedures

### Project Management

- **TODO.md** - Current tasks and priorities
- **WEEK1_PROGRESS_SUMMARY.md** - Recent development progress
- **CHANGELOG.md** - Version history and release notes

### Reports & Analysis

- **COMPREHENSIVE_PROJECT_AUDIT_REPORT.md** - Complete system audit (Oct 24, 2025)
- **CRITICAL-ISSUES-REPORT.md** - Known issues and action items

---

## Service Integration Guides

Located in `.docs/services/` (if exists) or check archive for setup guides:

### External Services

- Razorpay (Payment Gateway) → See RAZORPAY_SETUP_GUIDE.md
- WhatsApp Business API → Check `.archive/implementation-plans/WHATSAPP_*.md`
- Vercel (Deployment) → Check `.archive/deployment-history/`
- Supabase (Database) → Check `.archive/implementation-plans/SUPABASE_SETUP_GUIDE.md`
- Google Analytics → Check `.archive/implementation-plans/GA4_SETUP_INSTRUCTIONS.md`

---

## Archived Documentation

Located in `.archive/` directory - organized by category:

### 1. Deployment History (`.archive/deployment-history/`)

Historical deployment guides and procedures. **All deployment documentation is now archived.**

Key files:

- DEPLOYMENT_GUIDE.md
- PRODUCTION_DEPLOYMENT.md
- DEPLOYMENT_CHECKLIST.md
- DEPLOYMENT_TRIGGER.md

**Current Status:** Project auto-deploys via Vercel on push to main branch.

### 2. Implementation Plans (`.archive/implementation-plans/`)

Completed feature implementations and service setup guides.

Categories:

- Task implementations (TASK_01 through TASK_05)
- Service integrations (Supabase, WhatsApp, Google Ads)
- Authentication & Database setup
- AI/ML feature implementations
- LMS setup guides

**Status:** All implementations complete. Reference for understanding system architecture.

### 3. Testing Documentation (`.archive/testing/`)

Quality assurance procedures and test frameworks.

Types:

- Accessibility testing
- NEET compliance testing
- Manual testing checklists
- QA methodologies

**Current Tests:** See `src/__tests__/` directory for active test suites.

### 4. Reports (`.archive/reports/`)

One-time analyses and optimization reports.

Topics:

- Performance optimization
- SEO audits
- Database optimization
- Mobile optimization
- Cost analysis
- CI/CD health

**Purpose:** Historical record of improvements and decisions made.

### 5. Session History (`.archive/session-history/`)

Development session summaries and progress snapshots.

Contains:

- Weekly progress reports
- Session completion summaries
- Agent workflow documentation
- Project state snapshots

**Note:** Historical development context.

### 6. Future Planning (`.archive/future-planning/`)

Long-term architecture and strategic plans.

Includes:

- Microservices migration plans (Phase 3+)
- Enterprise architecture (Phase 4+)
- AI enhancement strategies
- Development roadmaps
- Design system evolution

**Current Phase:** Phase 1 MVP Complete. Future phases are aspirational.

---

## Finding Documentation

### Quick Search Commands

```bash
# Search all active docs in project root
grep -r "keyword" *.md

# Search archived documentation
grep -r "keyword" .archive/

# Find recently modified docs
find . -name "*.md" -mtime -7

# Search specific category
grep -r "deployment" .archive/deployment-history/
grep -r "testing" .archive/testing/
```

### By Topic

| Topic                | Primary Location               | Archive Location                 |
| -------------------- | ------------------------------ | -------------------------------- |
| Payments             | Root (RAZORPAY_SETUP_GUIDE.md) | N/A                              |
| Pricing              | Root (PRICING\_\*.md)          | N/A                              |
| Deployment           | N/A                            | `.archive/deployment-history/`   |
| Testing              | `src/__tests__/`               | `.archive/testing/`              |
| Implementation Plans | N/A                            | `.archive/implementation-plans/` |
| Reports              | Root (COMPREHENSIVE\_\*.md)    | `.archive/reports/`              |
| Service Setup        | Root/Archive mix               | `.archive/implementation-plans/` |

---

## Documentation Lifecycle

### Active → Archived

Documents move to archive when:

- Implementation is complete
- Process is superseded by new approach
- Information is historical/reference only
- Plan is completed or no longer relevant

### Archive → Active

Move documents back to root if:

- Process needs to be reactivated
- Information becomes current again
- Reference needed for active development

---

## Legacy Projects

### Cerebrum Biology Academy (Static Site)

**Location:** `/Users/drshekhar/cerebrum-biology-academy/`
**Status:** Legacy - superseded by Next.js website
**Size:** 512 KB
**Type:** Static HTML/CSS/JS website
**Purpose:** Reference only - original website before migration

---

## Cleanup Summary (Oct 28, 2025)

Recent consolidation efforts removed ~23MB of duplicate content:

1. **Desktop Clone Removed** - Complete duplicate from Oct 18
   - Backup created: `~/Desktop/DeskTop /cerebrum-backup-20251028.tar.gz`
   - All content preserved in main project

2. **Deployment Docs Consolidated** - All in `.archive/deployment-history/`

3. **Archive Index Updated** - See `.archive/INDEX.md` for detailed archive map

---

## Contributing to Documentation

### Adding New Documentation

1. Create file in project root for active/current docs
2. Use clear, descriptive filenames (e.g., `FEATURE_IMPLEMENTATION_GUIDE.md`)
3. Update this index if adding major documentation
4. Follow existing markdown formatting conventions

### Archiving Old Documentation

1. Move completed/superseded docs to appropriate `.archive/` subfolder
2. Update `.archive/INDEX.md` with archive details
3. Add deprecation notice in moved file pointing to current docs
4. Remove from this active index

### File Naming Conventions

- `UPPERCASE_WITH_UNDERSCORES.md` - Major documentation
- `lowercase-with-dashes.md` - Minor guides or notes
- Include date in filename if time-sensitive: `REPORT_2025_10_28.md`

---

## Questions?

For current development:

1. Check this index for topic location
2. Review README.md for getting started
3. Check CLAUDE.md for development workflow
4. See TODO.md for current priorities

For historical context:

1. Browse `.archive/` categories
2. Read `.archive/INDEX.md` for archive map
3. Use grep to search archived content

---

**Last Updated:** October 28, 2025
**Maintained By:** Development Team

**Note:** This index is automatically updated during major documentation reorganizations.
