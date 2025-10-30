# Development Mode for Testing

This document explains how to use **Dev Mode** to bypass authentication and access all dashboards during local development.

## 🔓 What is Dev Mode?

Dev Mode is a testing feature that:

- **Bypasses all authentication checks**
- **Unlocks all premium dashboards** (NEET Prep, Analytics, etc.)
- **Removes upgrade prompts and locked features**
- **Only works in development** (NODE_ENV=development)
- **Never works in production** for security

## 🚀 How to Enable Dev Mode

### Option 1: Browser Console (Recommended)

1. Open your browser's Developer Console:
   - **Chrome/Edge**: Press `F12` or `Ctrl+Shift+J` (Windows) / `Cmd+Option+J` (Mac)
   - **Firefox**: Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
   - **Safari**: Press `Cmd+Option+C`

2. Type this command and press Enter:

   ```javascript
   localStorage.setItem('devMode', 'true')
   ```

3. Refresh the page (`F5` or `Ctrl+R` / `Cmd+R`)

4. You should see in the console:
   ```
   🔓 DEV MODE ACTIVE - All dashboards unlocked for testing
   ```

### Option 2: JavaScript Code

Add this to any page in the browser console:

```javascript
// Enable dev mode
localStorage.setItem('devMode', 'true')
location.reload()
```

## 🔒 How to Disable Dev Mode

In the browser console:

```javascript
localStorage.removeItem('devMode')
location.reload()
```

Or:

```javascript
localStorage.setItem('devMode', 'false')
location.reload()
```

## ✅ What You Can Access in Dev Mode

With dev mode enabled, you can:

1. **Visit any dashboard without authentication:**
   - `/dashboard` - NEET Prep Center (normally requires paid NEET account)
   - `/dashboard/student` - Analytics Dashboard (normally requires paid account)
   - `/student/dashboard` - Simple Dashboard (accessible to all, but shows unlocked features)

2. **All features unlocked:**
   - No upgrade banners
   - No locked action buttons
   - No PRO badges
   - All features act as if you're a paid user

3. **No redirects:**
   - Won't redirect to signin page
   - Won't redirect to onboarding
   - Can navigate freely between all dashboards

## 🧪 Testing Different User Tiers

To test different user experiences:

### Test as Guest User (Dev Mode OFF):

```javascript
localStorage.removeItem('devMode')
// Don't sign in
// Visit: http://localhost:3001/student/dashboard
```

**Expected:** Upgrade banner, locked features, limited data

### Test as Free User (Dev Mode OFF):

```javascript
localStorage.removeItem('devMode')
// Sign in with a test account
// Visit: http://localhost:3001/dashboard
```

**Expected:** Access denied screen with upgrade prompts

### Test as Paid User (Dev Mode ON):

```javascript
localStorage.setItem('devMode', 'true')
location.reload()
// Visit any dashboard
```

**Expected:** Full access, no locks, no banners

## 📋 Useful Testing URLs

With dev mode enabled, test these URLs:

```
http://localhost:3001/dashboard           - NEET Prep Dashboard
http://localhost:3001/dashboard/student   - Analytics Dashboard
http://localhost:3001/student/dashboard   - Simple Dashboard
http://localhost:3001/onboarding/profile  - Onboarding Flow
http://localhost:3001/onboarding/demo     - Demo Onboarding
```

## ⚠️ Important Notes

1. **Dev mode only works locally** - It checks `process.env.NODE_ENV === 'development'`
2. **Refresh after enabling** - Changes take effect after page reload
3. **Console logging** - When active, you'll see dev mode messages in console
4. **Production safe** - This feature is completely disabled in production builds

## 🐛 Troubleshooting

**Dev mode not working?**

1. Check you're in development mode:

   ```javascript
   console.log(process.env.NODE_ENV) // Should be 'development'
   ```

2. Verify localStorage:

   ```javascript
   console.log(localStorage.getItem('devMode')) // Should be 'true'
   ```

3. Check console for the message:

   ```
   🔓 DEV MODE ACTIVE - All dashboards unlocked for testing
   ```

4. Make sure you refreshed the page after setting devMode

5. Clear browser cache if needed:
   - Chrome: `Ctrl+Shift+Delete` (Windows) / `Cmd+Shift+Delete` (Mac)
   - Select "Cached images and files"
   - Click "Clear data"

## 🔐 Security

- Dev mode is **completely disabled in production**
- The code checks `NODE_ENV === 'development'`
- Even if someone sets `localStorage.setItem('devMode', 'true')` in production, it won't work
- Backend API calls still require proper authentication

---

**Happy Testing! 🎉**
