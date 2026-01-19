# Deployment Playbook

## Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Type check clean: `npm run type-check`
- [ ] Lint clean: `npm run lint`
- [ ] Environment variables verified
- [ ] Database migrations ready

## Deployment Commands
```bash
# Pre-check
npm run deploy:pre-check

# Production deploy
npm run deploy:production

# Verify
npm run verify:production
```

## Rollback Procedure
1. Identify failing deployment
2. Revert to previous deployment in Vercel
3. Investigate root cause
4. Fix and redeploy
