# ⚡ Quick - Vercel Blob Token (2 Minutes)

## 🚀 3 Simple Steps:

### 1️⃣ **Go to Vercel**

```
🌐 https://vercel.com/dashboard/stores
👉 Login if needed
```

### 2️⃣ **Create Blob Store**

```
➕ Click: "Create Database" or "Create Store"
📦 Select: "Blob"
📝 Name: lms-study-materials
🌍 Region: Singapore (or closest)
✅ Click: "Create"
```

### 3️⃣ **Get Token**

```
⚙️ Click: Your blob store name
🔧 Tab: "Settings"
🔑 Find: "Read-Write Token" or "BLOB_READ_WRITE_TOKEN"
📋 Click: "Copy" or "Show"
```

---

## ✅ Your Token Looks Like:

```
vercel_blob_rw_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

## 📤 What to Do Next:

**Share your token with me** and I'll:

1. Add it to `.env.local`
2. Restart the server
3. Test PDF uploads
4. LMS ready! ✅

---

**Or add it yourself:**

1. Open: `.env.local`
2. Find: `BLOB_READ_WRITE_TOKEN=your-vercel-blob-token-here`
3. Replace with your token
4. Save and restart server: `npm run dev`

---

**Stuck?** See detailed guide: `VERCEL_BLOB_SETUP.md`
