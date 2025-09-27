# 🚨 BROWSER DEBUGGING COMMANDS - CACHE CLEARING

## IMMEDIATE ACTIONS FOR CACHE ISSUES

### 1. Chrome/Edge DevTools Commands

```javascript
// Open DevTools Console and run:

// Clear all caches
caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)))

// Unregister all service workers
navigator.serviceWorker.getRegistrations().then((registrations) => {
  registrations.forEach((registration) => registration.unregister())
})

// Clear all storage
localStorage.clear()
sessionStorage.clear()

// Force reload without cache
location.reload(true)
```

### 2. Manual Cache Clearing Steps

#### Chrome/Edge/Brave:

1. **F12** → **Application** tab
2. **Storage** → **Clear storage**
3. Check ALL boxes:
   - ✅ Unregister service workers
   - ✅ Local and session storage
   - ✅ Cache storage
   - ✅ IndexedDB
   - ✅ WebSQL
   - ✅ Cookies
4. **Clear site data**
5. **Hard refresh**: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

#### Firefox:

1. **F12** → **Storage** tab
2. Right-click domain → **Delete All**
3. **Network** tab → Check **Disable HTTP Cache**
4. **Hard refresh**: `Ctrl+Shift+R`

#### Safari:

1. **Develop** menu → **Empty Caches**
2. **Force reload**: `Cmd+Shift+R`

### 3. Network Tab Debugging

1. Open **DevTools** → **Network** tab
2. Check **Disable cache**
3. Look for **304 responses** (cached) vs **200 responses** (fresh)
4. Filter by **JS/CSS** to see if assets are cached

### 4. Service Worker Debugging

1. **DevTools** → **Application** → **Service Workers**
2. Check **Bypass for network** (during development)
3. Click **Unregister** to remove service worker
4. **Update on reload** for development

### 5. Incognito Testing

- Open **incognito/private** window
- This bypasses all cache and service workers
- Test your changes here first

### 6. Mobile Browser Cache Clearing

#### iOS Safari:

- Settings → Safari → Clear History and Website Data

#### Android Chrome:

- Menu → Settings → Privacy → Clear browsing data

### 7. Localhost Specific Issues

#### Add Cache-Control Headers

```bash
# For development server, add to next.config.js:
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-cache, no-store, must-revalidate',
        },
      ],
    },
  ]
}
```

### 8. Emergency Nuclear Option

If nothing works:

1. Close all browser windows
2. Clear browser data completely
3. Restart browser
4. Open incognito window
5. Test your changes

### 9. Check for Multiple Tabs

- Close all tabs with your localhost
- Service workers can persist across tabs
- Test in fresh browser instance

### 10. Development Server Issues

```bash
# Restart your dev server with:
npm run dev -- --no-cache
# or
next dev --no-cache

# Clear Next.js cache:
rm -rf .next
npm run dev
```

## PREVENTION FOR FUTURE

1. Always develop with DevTools **Network** → **Disable cache** checked
2. Use **incognito mode** for testing
3. Add cache-busting query parameters: `?v=${Date.now()}`
4. Disable service workers in development environment
