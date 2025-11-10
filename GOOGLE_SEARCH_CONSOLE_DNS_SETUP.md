# GOOGLE SEARCH CONSOLE - DNS VERIFICATION SETUP

**Domain:** cerebrumbiologyacademy.com
**DNS Provider:** Vercel DNS
**Verification Code:** L6c1LAGqVg_qEAtFGDcbzqeMzqFdEwT7kKFDgfn2-Sc
**Generated:** 2025-11-10

---

## STEP 1: ADD TXT RECORD TO VERCEL DNS

### Access Vercel DNS Settings

1. **Go to Vercel Dashboard**
   - URL: https://vercel.com/dashboard
   - Login with your Vercel account

2. **Navigate to Domain Settings**
   - Select your project: **cerebrum-biology-academy-website**
   - Click **Settings** tab (top navigation)
   - Click **Domains** in left sidebar

3. **Locate DNS Records Section**
   - Find **cerebrumbiologyacademy.com** in the domains list
   - Click on the domain or scroll to **DNS Records** section
   - You should see your current DNS records (nameservers: ns1.vercel-dns.com, ns2.vercel-dns.com)

### Add the TXT Record

Click **Add** or **Add Record** button and enter:

```
Type: TXT
Name: @
(or leave blank - represents root domain)

Value: google-site-verification=L6c1LAGqVg_qEAtFGDcbzqeMzqFdEwT7kKFDgfn2-Sc

TTL: 3600
(or leave as default - usually 3600 seconds)
```

**Important Notes:**

- Do NOT include quotes around the value
- Copy the entire verification string exactly as shown
- The `@` symbol means "root domain" (cerebrumbiologyacademy.com)
- TTL = Time To Live (how long DNS servers cache the record)

### Save the Record

- Click **Save** or **Add Record**
- Vercel will immediately update the DNS zone
- DNS propagation typically takes 1-5 minutes with Vercel

---

## STEP 2: VERIFY DNS PROPAGATION

### Wait 2-3 Minutes

DNS changes on Vercel are usually instant, but allow 2-3 minutes for global propagation.

### Check TXT Record

Run this command in terminal to verify:

```bash
dig cerebrumbiologyacademy.com TXT +short
```

**Expected output:**

```
"google-site-verification=L6c1LAGqVg_qEAtFGDcbzqeMzqFdEwT7kKFDgfn2-Sc"
```

### Alternative Verification Methods

**Method 1: Online DNS Checker**

- Go to: https://toolbox.googleapps.com/apps/dig/#TXT/cerebrumbiologyacademy.com
- Check if TXT record appears

**Method 2: nslookup (Windows/Mac)**

```bash
nslookup -type=TXT cerebrumbiologyacademy.com
```

**Method 3: host command**

```bash
host -t TXT cerebrumbiologyacademy.com
```

---

## STEP 3: COMPLETE VERIFICATION IN GOOGLE SEARCH CONSOLE

### Access Google Search Console

1. **Go to Search Console**
   - URL: https://search.google.com/search-console
   - Login with your Google account

2. **Add Property (if not already added)**
   - Click **Add Property**
   - Select **Domain** property type
   - Enter: `cerebrumbiologyacademy.com`
   - Click **Continue**

3. **Verify Ownership**
   - Google will show the verification TXT record (should match what you added)
   - Click **Verify**
   - If DNS record is propagated, verification will succeed immediately

### Expected Result

✅ **Success Message:**

```
Ownership verified
cerebrumbiologyacademy.com
Verified on [date]
```

---

## STEP 4: SUBMIT SITEMAP TO SEARCH CONSOLE

Once verification is complete:

### Submit Sitemap

1. **In Google Search Console**
   - Select property: **cerebrumbiologyacademy.com**
   - Click **Sitemaps** in left sidebar
   - Enter sitemap URL: `https://cerebrumbiologyacademy.com/sitemap.xml`
   - Click **Submit**

2. **Verify Sitemap Submission**
   - Status should show: **Success**
   - URLs discovered: Should show 327+ pages
   - Wait 1-2 days for Google to crawl

### Request Indexing for Priority Pages

**High Priority:** Submit manually for faster indexing

1. **Click URL Inspection** (left sidebar)
2. **Submit these URLs first:**
   ```
   https://cerebrumbiologyacademy.com/locations/mumbai
   https://cerebrumbiologyacademy.com/locations/bangalore
   https://cerebrumbiologyacademy.com/compare/kota-vs-online
   https://cerebrumbiologyacademy.com/compare/class-9-vs-class-10-foundation
   ```
3. For each URL:
   - Paste URL → Click **Test Live URL**
   - Wait for test to complete
   - Click **Request Indexing**
   - Confirm request

---

## TROUBLESHOOTING

### Problem: TXT Record Not Showing Up

**Solutions:**

1. Wait 5-10 minutes for DNS propagation
2. Clear your local DNS cache:
   - Mac: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
   - Windows: `ipconfig /flushdns`
   - Linux: `sudo systemd-resolve --flush-caches`
3. Check Vercel DNS settings to confirm record was saved
4. Try verification from a different network/device

### Problem: Verification Fails in Search Console

**Solutions:**

1. Double-check the TXT record value matches exactly
2. Ensure there are no extra spaces or quotes in the value
3. Wait 10-15 minutes and try again
4. Check if TXT record appears in `dig` command
5. Try removing and re-adding the TXT record

### Problem: Multiple Verification Methods

**Note:** You can use alternative verification methods if DNS doesn't work:

- HTML file upload (upload to `/public` folder in Next.js)
- HTML meta tag (add to `<head>` in layout)
- Google Analytics tracking code (if already installed)
- Google Tag Manager (if already installed)

---

## EXPECTED TIMELINE

| Step                           | Time Required         |
| ------------------------------ | --------------------- |
| Add TXT record in Vercel       | 2-3 minutes           |
| DNS propagation                | 1-5 minutes (instant) |
| Search Console verification    | Instant               |
| Sitemap submission             | Instant               |
| Google discovers sitemap       | 1-3 days              |
| Pages start appearing in index | 3-7 days              |
| Pages start ranking            | 2-4 weeks             |
| Traffic impact visible         | Month 2-3             |

---

## POST-VERIFICATION CHECKLIST

After successful verification:

- ✅ **Step 1:** Verify TXT record with `dig` command
- ✅ **Step 2:** Complete verification in Search Console
- ✅ **Step 3:** Submit sitemap (sitemap.xml)
- ✅ **Step 4:** Request indexing for 4 priority pages
- ✅ **Step 5:** Check "Coverage" report after 3 days
- ✅ **Step 6:** Monitor "Performance" report after 7 days
- ✅ **Step 7:** Set up Google Analytics (see GOOGLE_ANALYTICS_MONITORING_SETUP.md)

---

## CURRENT DNS CONFIGURATION

**Domain:** cerebrumbiologyacademy.com
**Registrar:** INWX GmbH
**Name Servers:**

- ns1.vercel-dns.com
- ns2.vercel-dns.com

**DNS Managed By:** Vercel (via Vercel Dashboard)

---

## SUPPORT RESOURCES

- **Vercel DNS Documentation:** https://vercel.com/docs/projects/domains/working-with-domains
- **Google Search Console Help:** https://support.google.com/webmasters/answer/9008080
- **DNS Propagation Checker:** https://dnschecker.org

---

## VERIFICATION STATUS

**Current Status:** ⏳ Pending DNS Record Addition

**Next Action:** Add TXT record in Vercel Dashboard → Wait 2 minutes → Verify in Search Console

---

_Generated: 2025-11-10_
_Project: Cerebrum Biology Academy Website_
