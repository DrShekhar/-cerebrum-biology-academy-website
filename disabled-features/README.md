# Disabled Features

This directory contains features that have been temporarily disabled. They are kept here for potential future re-enablement.

## Why Features Are Disabled

Features may be disabled for various reasons:
- Not yet production-ready
- Pending design review
- Deprecated in favor of newer implementation
- Requires infrastructure not yet available
- Performance concerns

## Currently Disabled Features

### 1. Adaptive Testing (`adaptive-testing.disabled/`)

**Disabled on**: October 23, 2024
**Reason**: Requires additional AI infrastructure and performance optimization

**Description**: Adaptive testing system that adjusts question difficulty based on student performance in real-time.

**Components**:
- Session management (`[sessionId]/`)
- Session creation (`create-session/`)

**Re-enablement Requirements**:
1. Set up dedicated AI inference infrastructure
2. Performance testing with 100+ concurrent users
3. Database optimization for real-time queries
4. Product team approval

**Notes**:
- Code is functional but not optimized for production scale
- Keep disabled until Q2 2026 infrastructure upgrade

## How to Re-enable a Feature

1. Review the feature code and dependencies
2. Run tests: `npm test src/__tests__/[feature-name]`
3. Update dependencies if needed
4. Move from `disabled-features/` to appropriate `src/` location
5. Update routing in `src/app/`
6. Run full test suite
7. Deploy to staging first
8. Monitor performance for 48 hours before production

## Maintenance

- Review disabled features quarterly
- Remove features disabled for more than 1 year (archive in git history)
- Document all new disablement reasons here
