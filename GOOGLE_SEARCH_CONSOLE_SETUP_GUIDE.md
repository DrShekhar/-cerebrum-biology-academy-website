# Google Search Console Setup Guide

## Cerebrum Biology Academy - Complete Step-by-Step Instructions

**Prepared:** October 21, 2025
**Estimated Time:** 30-45 minutes
**Priority:** P1 HIGH
**Owner:** Dr. Shekhar

---

## Overview

Google Search Console (GSC) is a free tool that helps you monitor, maintain, and troubleshoot your site's presence in Google Search results. This guide will walk you through complete setup for cerebrumbiologyacademy.com.

**Benefits:**

- Monitor search performance (impressions, clicks, CTR)
- Submit sitemaps for faster indexing
- Identify and fix technical SEO issues
- Request indexing for new/updated pages
- Track mobile usability
- Monitor Core Web Vitals

---

## Step 1: Access Google Search Console

### 1.1 Navigate to Search Console

1. Go to: [https://search.google.com/search-console](https://search.google.com/search-console)
2. Sign in with your Google account (use the same account for all Google services - Analytics, Ads, etc.)
3. If you don't have a Google account, create one first

### 1.2 Add Property

1. Click **"Add Property"** or **"Start Now"** if this is your first property
2. You'll see two options:
   - **Domain Property** (Recommended)
   - **URL Prefix Property**

**Choose: Domain Property**

---

## Step 2: Add Domain Property

### 2.1 Enter Your Domain

1. Select **"Domain"** (left option)
2. Enter: `cerebrumbiologyacademy.com` (without https:// or www)
3. Click **"Continue"**

**Why Domain Property?**

- Covers all protocols (http, https)
- Covers all subdomains (www, blog, etc.)
- Single dashboard for all traffic
- Best for comprehensive SEO monitoring

---

## Step 3: Verify Ownership (DNS Method - Recommended)

Google will show you a TXT record to add to your DNS settings.

### 3.1 Copy Verification Code

You'll see something like:

```
google-site-verification=abc123xyz789verylongstringhere
```

**IMPORTANT:** Keep this tab open, don't close it yet!

### 3.2 Access Hostinger DNS Settings

1. Go to: [https://hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Log in to your Hostinger account
3. Navigate to **Domains** → **cerebrumbiologyacademy.com**
4. Click **"DNS / Name Servers"** or **"DNS Zone Editor"**

### 3.3 Add TXT Record

1. Look for **"Add New Record"** or **"Manage DNS Records"**
2. Click **"Add Record"**
3. Fill in the following:

   ```
   Record Type: TXT
   Name: @ (or leave blank)
   Value: google-site-verification=abc123xyz789verylongstringhere
   TTL: 3600 (or default)
   ```

4. Click **"Add Record"** or **"Save"**

### 3.4 Wait for DNS Propagation

- DNS changes can take 5 minutes to 24 hours
- Usually completes within 15-30 minutes
- You can check propagation at: [https://dnschecker.org](https://dnschecker.org)

### 3.5 Verify in Google Search Console

1. Return to the Google Search Console tab
2. Click **"Verify"**
3. If successful, you'll see: **"Ownership verified"** ✓
4. If it fails, wait 15 more minutes and try again

**Troubleshooting:**

- Make sure you copied the entire verification code
- Check for extra spaces in the TXT record
- Wait longer for DNS propagation
- Try clearing your browser cache

---

## Step 4: Alternative Verification Methods

If DNS verification doesn't work, try these alternatives:

### Option A: HTML File Upload (via Vercel)

1. Download the HTML verification file from GSC
2. Upload to: `/public/` folder in your project
3. Commit and push to GitHub
4. Vercel will auto-deploy
5. Verify in GSC

### Option B: HTML Tag (Recommended for Quick Setup)

1. Copy the meta tag from GSC:
   ```html
   <meta name="google-site-verification" content="abc123xyz789" />
   ```
2. Open file: `/src/app/layout.tsx`
3. Find line 72 where it says:
   ```html
   <meta name="google-site-verification" content="your-google-verification-code" />
   ```
4. Replace `your-google-verification-code` with your actual code
5. Save, commit, push to GitHub
6. Wait for Vercel deployment (2-3 minutes)
7. Return to GSC and click **"Verify"**

### Option C: Google Analytics

1. If you already have GA4 installed with the same Google account
2. GSC can auto-verify via GA4
3. Select this option in verification screen

---

## Step 5: Submit Sitemap

Once verified, immediately submit your sitemap.

### 5.1 Navigate to Sitemaps

1. In the left sidebar, click **"Sitemaps"**
2. You'll see: "Add a new sitemap"

### 5.2 Submit Main Sitemap

1. Enter: `sitemap.xml`
2. Click **"Submit"**
3. Status will show "Couldn't fetch" initially - this is normal
4. Wait 24-48 hours for Google to crawl it

### 5.3 Verify Sitemap is Accessible

1. Open new tab: `https://cerebrumbiologyacademy.com/sitemap.xml`
2. You should see XML structure with all URLs
3. If you see error, contact development team

**Current Sitemap Stats:**

- **Total URLs:** ~70+ pages
- **Update Frequency:** Daily (automated)
- **Priority Pages:** Homepage (1.0), Courses (0.9), NEET Repeaters (0.9)

---

## Step 6: Request Indexing for Priority Pages

Force Google to index your most important pages immediately.

### 6.1 URL Inspection Tool

1. Click **"URL Inspection"** in the top search bar
2. Enter the full URL of a page
3. Press Enter

### 6.2 Request Indexing

1. If page shows "URL is not on Google":
   - Click **"Request Indexing"**
   - Wait 1-2 minutes for validation
   - You'll see confirmation message
2. If page shows "URL is on Google":
   - Great! It's already indexed
   - Click "Request Indexing" anyway to update

### 6.3 Priority Pages to Index (Do these first)

**Top 5 Pages - Day 1:**

1. `https://cerebrumbiologyacademy.com/` (Homepage)
2. `https://cerebrumbiologyacademy.com/courses` (Courses)
3. `https://cerebrumbiologyacademy.com/neet-repeaters` (NEET Repeaters)
4. `https://cerebrumbiologyacademy.com/about` (About)
5. `https://cerebrumbiologyacademy.com/contact` (Contact)

**Additional Pages - Day 2:** 6. `https://cerebrumbiologyacademy.com/courses/neet-complete` 7. `https://cerebrumbiologyacademy.com/courses/neet-dropper` 8. `https://cerebrumbiologyacademy.com/courses/class-11` 9. `https://cerebrumbiologyacademy.com/courses/class-12` 10. `https://cerebrumbiologyacademy.com/enrollment`

**Remaining Pages - Week 1:** 11. All other course pages 12. Faculty page 13. Testimonials 14. Resources 15. Demo page

**Note:** You can request indexing for max 10 pages per day (Google limit).

---

## Step 7: Configure Settings

### 7.1 Set Target Country

1. Go to **"Settings"** (gear icon) in left sidebar
2. Scroll to **"Geographic target"**
3. Select **"India"**
4. Click **"Save"**

### 7.2 Set Preferred Domain

1. In Settings, find **"Preferred domain"**
2. Select **"https://cerebrumbiologyacademy.com"** (with www or without - be consistent)
3. Currently set to: **without www**
4. Click **"Save"**

### 7.3 Crawl Rate (Advanced)

1. Generally, leave this at default
2. Google auto-adjusts based on site performance
3. Only change if you have server capacity issues

---

## Step 8: Link Google Analytics (If Not Already)

### 8.1 Associate Analytics

1. Go to **"Settings"** → **"Associations"**
2. Click **"Associate"**
3. Select your GA4 property
4. Click **"Continue"** → **"Associate"**

**Benefits:**

- See GSC data in GA4
- Better conversion tracking
- Unified reporting

---

## Step 9: Set Up Email Notifications

### 9.1 Enable Alerts

1. Go to **"Settings"** → **"Users and permissions"**
2. Make sure your email is listed
3. Go to **"Settings"** → **"Email notifications"**
4. Enable:
   - ✓ Site issues
   - ✓ Manual actions
   - ✓ Security issues
   - ✓ AMP issues (if using AMP)
5. Click **"Save"**

**You'll be notified about:**

- Critical crawl errors
- Manual penalties
- Security breaches
- Mobile usability issues

---

## Step 10: Weekly Monitoring Checklist

Once setup is complete, monitor these weekly:

### Weekly Tasks (15 minutes)

**Monday Morning:**

- [ ] Check **"Performance"** report
  - Impressions trend
  - Clicks trend
  - Average CTR
  - Average position
- [ ] Review **"Coverage"** report
  - Any new errors?
  - Pages excluded from index?
- [ ] Check **"Enhancements"**
  - Core Web Vitals (green = good)
  - Mobile usability
  - Any warnings?

**Weekly Goals:**

- Week 1: Get first 5 pages indexed
- Week 2: 500+ impressions
- Week 3: 50+ clicks
- Week 4: 100+ clicks, improve CTR to 5%+

---

## Expected Timeline

**Day 1 (Today):**

- ✓ Property added
- ✓ Ownership verified
- ✓ Sitemap submitted
- ✓ Top 5 pages indexing requested

**Days 2-7:**

- Sitemap processed by Google
- First impressions start appearing
- First pages appear in search results
- Continue requesting indexing for remaining pages

**Week 2-4:**

- Regular data flow
- Keyword tracking
- CTR optimization
- Coverage improvement

**Month 2+:**

- Rich results appear
- Featured snippets
- Knowledge graph
- Local pack results

---

## Troubleshooting Common Issues

### Issue 1: "URL is not on Google"

**Solution:**

- Request indexing
- Wait 3-7 days
- Check robots.txt isn't blocking
- Verify sitemap includes the page

### Issue 2: "Submitted URL not selected as canonical"

**Solution:**

- Google chose different URL as canonical
- Check for duplicate content
- Add canonical tags to pages
- Usually resolves itself in 2-4 weeks

### Issue 3: "Crawled - currently not indexed"

**Solution:**

- Page quality might be low
- Add more content (500+ words minimum)
- Improve internal linking
- Build backlinks to page
- Be patient (can take weeks)

### Issue 4: "Server error (5xx)"

**Solution:**

- Contact Vercel support
- Check serverless function limits
- Review error logs
- Usually temporary, retry indexing

### Issue 5: "Duplicate without user-selected canonical"

**Solution:**

- Add canonical tags: `<link rel="canonical" href="..." />`
- Already implemented in your site
- Will resolve over time as Google re-crawls

---

## Success Metrics

Track these metrics to measure success:

**Month 1:**

- ✓ Property verified
- ✓ Sitemap submitted and processed
- ✓ 50+ pages indexed
- ✓ 1,000+ impressions
- ✓ 50+ clicks
- ✓ Average position: <50

**Month 2:**

- ✓ 5,000+ impressions
- ✓ 200+ clicks
- ✓ CTR: 4%+
- ✓ Average position: <30

**Month 3:**

- ✓ 10,000+ impressions
- ✓ 500+ clicks
- ✓ CTR: 5%+
- ✓ Average position: <20
- ✓ First page 1 ranking

---

## Resources

**Google Search Console:**

- Dashboard: [https://search.google.com/search-console](https://search.google.com/search-console)
- Help Center: [https://support.google.com/webmasters](https://support.google.com/webmasters)
- Learning Center: [https://developers.google.com/search](https://developers.google.com/search)

**DNS Tools:**

- DNS Checker: [https://dnschecker.org](https://dnschecker.org)
- What's My DNS: [https://whatsmydns.net](https://whatsmydns.net)

**Your URLs:**

- Main Site: https://cerebrumbiologyacademy.com
- Sitemap: https://cerebrumbiologyacademy.com/sitemap.xml
- Robots.txt: https://cerebrumbiologyacademy.com/robots.txt

---

## Next Steps

After GSC setup is complete:

1. **Complete Google My Business Setup** (see `GOOGLE_MY_BUSINESS_SETUP_GUIDE.md`)
2. **Submit to directories** (see `DIRECTORY_SUBMISSION_CHECKLIST.md`)
3. **Monitor weekly** using checklist above
4. **Optimize based on data** - identify low CTR pages and improve titles/descriptions
5. **Build backlinks** - guest posts, Quora, directories
6. **Create content** - blog posts targeting keywords with impressions but no clicks

---

## Support

**Technical Questions:**

- Google Search Central Help: [https://support.google.com/webmasters/community](https://support.google.com/webmasters/community)

**Verification Issues:**

- Hostinger Support: [https://www.hostinger.com/cpanel-login](https://www.hostinger.com/cpanel-login)
- Vercel Support: [https://vercel.com/support](https://vercel.com/support)

**Development Team:**

- Check `/src/app/layout.tsx` for meta tag verification
- Check `/src/app/sitemap.xml/route.ts` for sitemap generation

---

## Completion Checklist

Before moving to next task, verify:

- [ ] Google Search Console property added
- [ ] Ownership verified (green checkmark visible)
- [ ] Sitemap submitted (sitemap.xml)
- [ ] Top 5 pages indexing requested
- [ ] Target country set to India
- [ ] Email notifications enabled
- [ ] Google Analytics linked (if applicable)
- [ ] Screenshot of GSC dashboard saved for records
- [ ] Weekly monitoring scheduled in calendar

---

**Status:** Ready to Execute
**Priority:** P1 HIGH
**Estimated Results:** First impressions within 7 days, first clicks within 14 days

**Good luck! This is the foundation of your SEO success.** 🚀
