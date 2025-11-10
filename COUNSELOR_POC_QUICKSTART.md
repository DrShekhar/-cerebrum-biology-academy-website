# Counselor Dashboard POC - Quick Start Guide

## 🚀 Getting Started (2 Minutes)

### Step 1: Start the Development Server

```bash
npm run dev
```

### Step 2: Open Your Browser

Navigate to: **http://localhost:3000/counselor-poc**

### Step 3: Test the POC

That's it! You should see the Lead Pipeline Board.

---

## 🎯 Quick Demo Flow (5 Minutes)

### 1. Overview

- Notice the **4 stat cards** at the top showing metrics
- See **5 columns** representing different stages
- Each column has a **count badge** showing number of leads

### 2. Drag a Lead

- Find **"Priya Sharma"** in the "New Leads" column (first column)
- **Click and drag** her card to the "Demo Scheduled" column
- **Drop it** and watch the counts update!

### 3. Search Functionality

- Type **"NEET"** in the search bar at the top
- Only leads interested in NEET courses appear
- Clear the search to see all leads

### 4. WhatsApp-First Design

- Notice the **green WhatsApp button** on each card (it's the biggest button)
- Click it to see the interaction
- On mobile, there's a **floating WhatsApp button** in the bottom-right

### 5. Priority System

- Look for **🔥 HOT** badges (red) - high priority leads
- Look for **⚠️ WARM** badges (orange) - medium priority
- Look for **❄️ COLD** badges (blue) - low priority

### 6. Mobile Testing

- Open Chrome DevTools (Press F12)
- Click the device toolbar icon (or Ctrl+Shift+M)
- Select "iPhone 12 Pro" or similar
- See how it adapts to mobile!

---

## 📱 Mobile Preview

1. Open **Chrome DevTools** (F12)
2. Click **Toggle Device Toolbar** (Ctrl+Shift+M)
3. Select **iPhone 12 Pro**
4. Refresh the page
5. Try dragging leads (touch-friendly!)
6. Notice the floating WhatsApp button

---

## ✅ What to Look For

### Design Quality

- [ ] Professional, clean interface
- [ ] HubSpot-style card design
- [ ] Consistent colors and spacing
- [ ] Smooth hover effects

### Functionality

- [ ] Drag and drop works smoothly
- [ ] Count badges update when moving leads
- [ ] Search filters in real-time
- [ ] Buttons show alerts when clicked

### WhatsApp-First

- [ ] Green color prominent throughout
- [ ] WhatsApp button is largest on cards
- [ ] WhatsApp icon clearly visible
- [ ] Floating button on mobile

### Responsive Design

- [ ] Desktop: All 5 columns visible
- [ ] Tablet: 2-3 columns with scroll
- [ ] Mobile: Vertical layout, horizontal scroll
- [ ] Stats cards stack properly

---

## 🎨 Key Features Demonstrated

### 1. Kanban Board

- **5 stages**: New Leads → Demo Scheduled → Demo Completed → Offer Sent → Payment Plan Created
- **30 sample leads** distributed across stages
- **Color-coded columns** for visual clarity

### 2. Lead Cards

- Priority badges (Hot/Warm/Cold)
- Contact info (phone, email)
- Course details
- Last contact & next follow-up
- Quick actions (WhatsApp, Call, View)
- Lead source

### 3. Stats Overview

- New Leads count
- Demos Today count
- Tasks Due count
- Revenue Today

### 4. Search & Filter

- Real-time search
- Search across name, email, phone, course
- Empty state when no results

---

## 🔍 Sample Data to Try

### Hot Leads (High Priority 🔥)

- Priya Sharma - New Lead
- Kavya Reddy - Demo Scheduled
- Ishita Gupta - New Lead

### Search Examples

- Type: "Priya" → Shows Priya Sharma and Priyanka Das
- Type: "NEET Dropper" → Shows all NEET Dropper students
- Type: "+91 98765" → Shows phone number matches
- Type: "Class 12" → Shows Class 12th Biology students

### Drag Examples

1. Move "Priya Sharma" from "New Leads" to "Demo Scheduled"
2. Move "Rohan Kumar" from "Demo Scheduled" to "Demo Completed"
3. Move any lead backwards (it works both ways!)

---

## 💡 Pro Tips

### For Best Experience

1. **Use Chrome or Safari** for best performance
2. **Full screen** to see all columns at once
3. **Try different screen sizes** in DevTools
4. **Drag slowly first** to see the smooth animations
5. **Hover over cards** to see the lift effect

### Demo to Others

1. Start with the stats bar explanation
2. Show the 5-stage pipeline
3. Drag one lead to demonstrate
4. Use search to show filtering
5. Show mobile view in DevTools
6. Click WhatsApp button to show interaction

---

## 📊 What's NOT Included (By Design)

This is a POC, so these are intentionally not implemented:

- ❌ No data persistence (refreshing resets)
- ❌ No API calls (all mock data)
- ❌ No login/authentication
- ❌ No actual WhatsApp integration
- ❌ No form to add new leads
- ❌ No lead detail page

**These will be added in the full implementation!**

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill the process on port 3000
killall node
# Or use a different port
npm run dev -- -p 3001
```

### Page Not Loading

- Check if dev server is running (look for "Ready on http://localhost:3000")
- Try refreshing the page
- Clear browser cache (Ctrl+Shift+R)

### Drag Not Working

- Make sure you're clicking directly on the card
- Try dragging slowly (8px minimum movement required)
- Check if you're on a supported browser (Chrome/Safari/Firefox)

### Mobile Touch Not Working

- Use actual device or Chrome DevTools
- Make sure "Touch" simulation is enabled in DevTools

---

## 📞 Questions to Ask Owner

After the demo, ask:

1. "Does the overall design match your vision?"
2. "Is the drag-and-drop intuitive enough?"
3. "Does the WhatsApp-first approach come through clearly?"
4. "Any specific features missing from this POC?"
5. "Ready to proceed with full development?"

---

## 🎯 Success Criteria

The POC is successful if:

- ✅ Owner can visualize the final product
- ✅ Design quality meets expectations
- ✅ Drag-and-drop feels smooth
- ✅ WhatsApp-first approach is clear
- ✅ Mobile experience is satisfactory
- ✅ Team is excited to build the full version

---

## 📚 More Information

- **Full Documentation**: See `COUNSELOR_POC_README.md`
- **Technical Report**: See `COUNSELOR_POC_REPORT.md`
- **Project Requirements**: See `.ai-memory/COUNSELOR_DASHBOARD_PROJECT.md`

---

## ⚡ Quick Commands

```bash
# Start dev server
npm run dev

# Open POC (Mac)
open http://localhost:3000/counselor-poc

# Open POC (Windows)
start http://localhost:3000/counselor-poc

# Open POC (Linux)
xdg-open http://localhost:3000/counselor-poc
```

---

**Enjoy the demo! 🎉**

If you have any questions or feedback, let's discuss what needs to be improved or changed before proceeding with full development.
