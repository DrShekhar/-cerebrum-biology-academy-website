# Interakt WhatsApp Template - Exact Format

## Copy and Paste These Exact Details into Interakt

### Template Settings

```
Template Name: demo_confirmation
Category: UTILITY
Language: English
```

### Header

```
Type: NONE (No header)
```

### Body Text (Copy this EXACTLY)

```
Hi {{1}}! Your {{2}} NEET Biology demo is confirmed for {{3}} at {{4}}. {{5}} Questions? Call +91 88264 44334. - Cerebrum Academy
```

### Variable Explanations (For reference - don't paste this)

```
{{1}} = Student Name
{{2}} = Demo Type (Free/Premium)
{{3}} = Date (e.g., "Mon, Oct 30, 2025")
{{4}} = Time (e.g., "10:00 AM")
{{5}} = Zoom link or message
```

### Footer

```
Type: NONE (No footer)
OR
Footer Text: Cerebrum Biology Academy
```

### Buttons (OPTIONAL - Add if you want)

```
Button 1:
Type: CALL
Text: Need Help?
Phone: +918826444334

Button 2:
Type: URL
Text: Add to Calendar
URL: {{6}}
(Note: Button URLs need to be dynamic variables)
```

### Sample Values (For testing - Interakt will ask for these)

```
Variable 1: Rahul
Variable 2: Free
Variable 3: Mon, Oct 30, 2025
Variable 4: 10:00 AM
Variable 5: We'll send the Zoom link 30 minutes before
```

## What It Will Look Like to Students

```
Hi Rahul! Your Free NEET Biology demo is confirmed for Mon, Oct 30, 2025 at 10:00 AM. We'll send the Zoom link 30 minutes before. Questions? Call +91 88264 44334. - Cerebrum Academy

[Need Help?] [Add to Calendar]
```

## Important Notes

1. **Template Name MUST be:** `demo_confirmation` (exact match with code)
2. **Category MUST be:** UTILITY (not Marketing or Authentication)
3. **Variables must be in order:** {{1}}, {{2}}, {{3}}, {{4}}, {{5}}
4. **No promotional language** - Keep it factual for Meta approval
5. **Submit and wait:** Meta reviews in 24-48 hours

## After Submission

You'll see one of these statuses:

- 🟡 **PENDING** - Under review by Meta (wait 24-48h)
- 🟢 **APPROVED** - Ready to use! Add credentials to .env.local
- 🔴 **REJECTED** - Edit and resubmit (rare if you follow this exactly)

## Once Approved - Add to .env.local

```bash
INTERAKT_API_KEY="your_api_key_from_step_4"
INTERAKT_PHONE_NUMBER_ID="your_phone_id_from_step_5"
```

Then restart your dev server and test a booking!
