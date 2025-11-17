# Visual Testing with Claude Code

This directory contains automated visual testing tools that give Claude "eyes" to check UI issues.

## Quick Start

### 1. Test Local Development

```bash
# Make sure dev server is running
npm run dev

# In another terminal, run visual check
npm run visual:check
```

### 2. Test Production Site

```bash
npm run visual:check:prod
```

## What It Does

The visual check script:

- Captures **full-page screenshots** of all major pages
- Takes both **desktop (1920x1080)** and **mobile (375x667)** screenshots
- Saves images to `/screenshots` directory
- Total: **22 screenshots** (11 pages × 2 viewports)

## Pages Captured

1. **Homepage** (`/`)
2. **Courses** (`/courses`)
3. **Course Details** (4 courses)
   - Class 9th Foundation
   - Class 10th Foundation
   - Class 12th NEET Ascent
   - NEET Dropper Batch
4. **Faculty** (`/faculty`)
5. **About** (`/about`)
6. **Contact** (`/contact`)
7. **Demo Booking** (`/demo-booking`)
8. **Enrollment** (`/enrollment`)

## How to Use with Claude

### Method 1: Automated Screenshots

```bash
# Generate screenshots
npm run visual:check

# Share with Claude
# Screenshots are saved in /screenshots directory
# You can then ask Claude to analyze specific screenshots
```

### Method 2: Manual Screenshots

- Take screenshots of issues you notice
- Share them with Claude in the chat
- Claude can analyze and suggest fixes

## Workflow Example

**Scenario: Check if homepage buttons are working visually**

```bash
# 1. Generate screenshots
npm run visual:check

# 2. Share screenshot with Claude
"Claude, analyze screenshots/home-desktop.png - are all buttons properly styled?"

# 3. Claude reviews and provides feedback
# 4. Make fixes based on Claude's suggestions
# 5. Re-run visual:check to verify
```

## Common Use Cases

### 1. Visual Regression Testing

After making changes, run visual check and compare with previous screenshots:

```bash
npm run visual:check
# Compare new screenshots with previous versions
```

### 2. Responsive Design Check

Compare desktop vs mobile screenshots:

```bash
# Desktop: screenshots/*-desktop.png
# Mobile: screenshots/*-mobile.png
```

### 3. Cross-Page Consistency

Check if design elements are consistent across pages:

```bash
npm run visual:check
# Claude can analyze multiple screenshots for consistency
```

### 4. Bug Reports

When reporting bugs, include screenshots:

```bash
npm run visual:check:prod
# Share screenshots/[page]-desktop.png with team
```

## Configuration

Edit `scripts/visual-check.ts` to:

- Add more pages
- Change viewport sizes
- Adjust wait times
- Add specific element screenshots

Example:

```typescript
const pages = [
  { route: '/new-page', name: 'new-page', description: 'New Page' },
  // ... more pages
]
```

## Tips

1. **Always run dev server first**: `npm run dev`
2. **Screenshots are gitignored**: Won't clutter your repo
3. **Full page captures**: Scrolls automatically to capture entire page
4. **Network idle wait**: Waits for all resources to load
5. **Animation settling**: 1 second delay for animations to complete

## Troubleshooting

### Error: "page.goto: net::ERR_CONNECTION_REFUSED"

**Solution**: Make sure dev server is running (`npm run dev`)

### Screenshots are blank/incomplete

**Solution**: Increase `waitForTimeout` in `visual-check.ts`

### Browser doesn't launch

**Solution**: Reinstall Playwright browsers

```bash
npx playwright install chromium
```

## Advanced: Integrate with CI/CD

Add to your GitHub Actions workflow:

```yaml
- name: Visual Testing
  run: |
    npm run build
    npm run start &
    sleep 5
    npm run visual:check
```

## Files

- `scripts/visual-check.ts` - Main script
- `screenshots/` - Output directory (gitignored)
- `package.json` - Contains `visual:check` scripts

## Future Enhancements

Potential additions:

- [ ] Visual diff comparison with baseline screenshots
- [ ] Automated visual regression in CI/CD
- [ ] Screenshot comparison reports
- [ ] Integration with Percy.io or Chromatic
- [ ] Specific element screenshots (buttons, forms, etc.)
- [ ] Accessibility overlays on screenshots

---

**Last Updated**: November 2025
**Maintained By**: Claude Code + Development Team
