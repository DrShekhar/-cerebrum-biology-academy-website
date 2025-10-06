# 📚 LMS Implementation Guide - Cerebrum Biology Academy

**Created:** October 7, 2025
**Purpose:** Complete blueprint for implementing PDF distribution & tracking system
**Target:** 50+ students (scalable to 1000+)

---

## 🎯 PROJECT OVERVIEW

### **Business Requirements**

- Upload PDF study materials (notes, assignments, practice papers)
- Organize by Course → Chapter → Topic hierarchy
- Send PDFs to students via WhatsApp + Email
- Track who received, viewed, downloaded each PDF
- Monitor student engagement with materials
- Admin dashboard for bulk operations

### **Technical Scope**

- 4-week implementation (8 milestones)
- Separate feature branch (no disruption to main site)
- PostgreSQL database extension
- Vercel Blob storage for PDFs
- Next.js admin & student portals

---

## 📊 MILESTONE BREAKDOWN

### **✅ Milestone 1: Database Foundation** (Session 1 - CURRENT)

- Update Prisma schema with LMS models
- Create database migration
- Test migration locally
- Commit to feature branch

### **⏳ Milestone 2: File Storage Setup** (Session 2)

- Setup Vercel Blob storage
- Create upload API endpoint
- Test PDF upload & retrieval
- Implement file validation

### **⏳ Milestone 3: Admin Upload Interface** (Session 3)

- Build admin upload page
- Drag-drop component
- Metadata form (title, description, tags)
- Preview before publish

### **⏳ Milestone 4: Material Organization** (Session 4)

- Chapter/Topic management UI
- Material list with filters
- Edit/delete operations
- Access control interface

### **⏳ Milestone 5: Student Portal** (Session 5)

- Student materials browser
- Download tracking
- Progress monitoring
- Bookmarks & notes

### **⏳ Milestone 6: Notification System** (Session 6)

- WhatsApp PDF delivery
- Email notifications
- In-app notifications
- Template system

### **⏳ Milestone 7: Analytics Dashboard** (Session 7)

- Admin analytics (downloads, views)
- Student engagement reports
- Popular content tracking
- Export reports

### **⏳ Milestone 8: Testing & Launch** (Session 8)

- Test with 5 real students
- Fix bugs & performance issues
- Documentation
- Merge to main & deploy

---

## 🗄️ DATABASE SCHEMA (Milestone 1)

### **New Models to Add**

```prisma
// ============================================
// COURSE STRUCTURE MODELS
// ============================================

model Chapter {
  id              String   @id @default(cuid())
  courseId        String

  // Chapter Details
  title           String
  description     String?
  orderIndex      Int      // For sorting

  // Status
  isActive        Boolean  @default(true)

  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  course          Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  topics          Topic[]
  materials       StudyMaterial[]

  @@index([courseId, orderIndex])
  @@map("chapters")
}

model Topic {
  id              String   @id @default(cuid())
  chapterId       String

  // Topic Details
  title           String
  description     String?
  orderIndex      Int

  // Status
  isActive        Boolean  @default(true)

  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  chapter         Chapter  @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  materials       StudyMaterial[]

  @@index([chapterId, orderIndex])
  @@map("topics")
}

// ============================================
// STUDY MATERIALS MODEL
// ============================================

model StudyMaterial {
  id              String   @id @default(cuid())

  // Content Details
  title           String
  description     String?
  materialType    MaterialType

  // File Information
  fileUrl         String       // Vercel Blob URL
  fileName        String
  fileSize        Int          // in bytes
  mimeType        String       @default("application/pdf")

  // Classification
  courseId        String?
  chapterId       String?
  topicId         String?
  tags            Json?        // ["NEET 2024", "Important", "Revision"]

  // Access Control
  accessLevel     AccessLevel  @default(ENROLLED)
  requiredCourseId String?     // Null = available to all enrolled

  // Organization
  sortOrder       Int          @default(0)
  category        String?      // "Class Notes", "Practice Papers", "Assignments"

  // Publishing
  uploadedBy      String       // Admin user ID
  isPublished     Boolean      @default(false)
  publishedAt     DateTime?

  // Analytics
  totalDownloads  Int          @default(0)
  totalViews      Int          @default(0)
  avgRating       Float        @default(0)
  ratingCount     Int          @default(0)

  // Timestamps
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  // Relations
  course          Course?      @relation(fields: [courseId], references: [id])
  chapter         Chapter?     @relation(fields: [chapterId], references: [id])
  topic           Topic?       @relation(fields: [topicId], references: [id])
  materialAccess  MaterialAccess[]
  progress        MaterialProgress[]

  @@index([courseId, isPublished])
  @@index([materialType, accessLevel])
  @@index([createdAt])
  @@map("study_materials")
}

// ============================================
// ACCESS CONTROL MODEL
// ============================================

model MaterialAccess {
  id              String   @id @default(cuid())
  materialId      String
  userId          String

  // Access Details
  grantedBy       String   // Admin who granted access
  grantedAt       DateTime @default(now())
  expiresAt       DateTime?
  reason          String?  // "Course enrollment", "Manual grant"

  // Relations
  material        StudyMaterial @relation(fields: [materialId], references: [id], onDelete: Cascade)
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([materialId, userId])
  @@index([userId])
  @@map("material_access")
}

// ============================================
// PROGRESS TRACKING MODEL
// ============================================

model MaterialProgress {
  id              String   @id @default(cuid())
  materialId      String
  userId          String

  // Progress Status
  status          ProgressStatus @default(NOT_STARTED)

  // Engagement Tracking
  firstViewedAt   DateTime?
  lastViewedAt    DateTime?
  downloadedAt    DateTime?
  completedAt     DateTime?

  // Reading Progress (for PDFs)
  currentPage     Int?
  totalPages      Int?
  timeSpent       Int      @default(0) // Total seconds spent

  // Student Feedback
  rating          Int?     // 1-5 stars
  feedback        String?
  notes           String?  // Personal study notes

  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  material        StudyMaterial @relation(fields: [materialId], references: [id], onDelete: Cascade)
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([materialId, userId])
  @@index([userId, status])
  @@index([materialId, updatedAt])
  @@map("material_progress")
}

// ============================================
// NOTIFICATION MODEL
// ============================================

model ContentNotification {
  id              String   @id @default(cuid())

  // Notification Content
  title           String
  message         String
  type            NotificationType

  // Target Audience (JSON arrays of IDs)
  targetUserIds   Json?    // Specific users
  targetCourseIds Json?    // All students in these courses
  sendToAll       Boolean  @default(false)

  // Content Reference
  materialId      String?
  courseId        String?

  // Delivery Channels
  channels        Json     // ["WHATSAPP", "EMAIL", "IN_APP"]

  // Scheduling
  scheduledFor    DateTime?
  sentAt          DateTime?

  // Status & Stats
  status          NotificationStatus @default(DRAFT)
  recipientCount  Int      @default(0)
  deliveredCount  Int      @default(0)
  failedCount     Int      @default(0)

  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([status, scheduledFor])
  @@index([materialId])
  @@map("content_notifications")
}

// ============================================
// ENUMS
// ============================================

enum MaterialType {
  PDF_NOTES
  PDF_ASSIGNMENT
  PDF_PRACTICE_PAPER
  PDF_REFERENCE
  PDF_EBOOK
  VIDEO
  LINK
}

enum AccessLevel {
  FREE              // Available to everyone
  ENROLLED          // Only enrolled students
  PREMIUM           // Premium course students
  SPECIFIC_COURSE   // Specific course only
}

enum ProgressStatus {
  NOT_STARTED
  VIEWED
  IN_PROGRESS
  DOWNLOADED
  COMPLETED
}

enum NotificationType {
  NEW_MATERIAL
  ASSIGNMENT_REMINDER
  COURSE_UPDATE
  ANNOUNCEMENT
  CUSTOM
}

enum NotificationStatus {
  DRAFT
  SCHEDULED
  SENDING
  SENT
  FAILED
  CANCELLED
}
```

### **Schema Updates Required**

Add these relations to existing models:

```prisma
// In existing Course model, add:
model Course {
  // ... existing fields ...
  chapters        Chapter[]
  materials       StudyMaterial[]
}

// In existing User model, add:
model User {
  // ... existing fields ...
  materialAccess  MaterialAccess[]
  materialProgress MaterialProgress[]
}
```

---

## 🔧 API ENDPOINTS (Milestones 2-6)

### **Admin APIs**

```typescript
// Upload Material
POST /api/admin/lms/upload
Body: FormData { file: File, metadata: JSON }
Response: { materialId, fileUrl, uploadedAt }

// List Materials
GET /api/admin/lms/materials?courseId=X&published=true
Response: { materials: Material[], total: number }

// Update Material
PATCH /api/admin/lms/materials/[id]
Body: { title, description, isPublished, ... }
Response: { material: Material }

// Delete Material
DELETE /api/admin/lms/materials/[id]
Response: { success: true }

// Create Chapter
POST /api/admin/lms/chapters
Body: { courseId, title, description, orderIndex }
Response: { chapter: Chapter }

// Send Notification
POST /api/admin/lms/notify
Body: { materialId, channels, targetUsers, message }
Response: { notificationId, recipientCount }

// Analytics
GET /api/admin/lms/analytics?materialId=X
Response: { downloads, views, avgRating, studentProgress }
```

### **Student APIs**

```typescript
// Get My Materials
GET /api/student/lms/materials?courseId=X
Response: { materials: Material[], hasAccess: boolean }

// Download Material
GET /api/student/lms/materials/[id]/download
Response: Redirect to signed URL or file stream

// Track Progress
POST /api/student/lms/progress
Body: { materialId, status, currentPage, timeSpent }
Response: { progress: Progress }

// Rate Material
POST /api/student/lms/materials/[id]/rate
Body: { rating, feedback }
Response: { success: true }

// Get Progress
GET /api/student/lms/progress?courseId=X
Response: { progress: Progress[], stats: { completed, inProgress } }
```

---

## 🎨 UI COMPONENTS (Milestones 3-5)

### **Admin Components**

```
/src/components/lms/admin/
├── MaterialUploader.tsx       # Drag-drop upload with preview
├── MaterialList.tsx           # Table with filters & search
├── MaterialEditor.tsx         # Edit form (title, tags, access)
├── ChapterManager.tsx         # Tree view for chapters/topics
├── NotificationComposer.tsx   # Send notifications UI
└── AnalyticsDashboard.tsx     # Charts & stats
```

### **Student Components**

```
/src/components/lms/student/
├── MaterialBrowser.tsx        # Grid/list view with filters
├── MaterialCard.tsx           # PDF card with preview
├── MaterialViewer.tsx         # PDF viewer with progress
├── ProgressTracker.tsx        # Personal progress charts
├── NotificationCenter.tsx     # Notifications list
└── BookmarkManager.tsx        # Saved materials
```

---

## 🚀 IMPLEMENTATION CHECKLIST

### **Session 1: Database Foundation** ✅ (TODAY)

- [x] Create `LMS_IMPLEMENTATION.md` (this file)
- [ ] Create `LMS_PROGRESS.md` tracking doc
- [ ] Create branch `feature/lms-foundation`
- [ ] Update `schema.prisma` with LMS models
- [ ] Run migration: `npx prisma migrate dev --name add_lms_system`
- [ ] Generate Prisma client: `npx prisma generate`
- [ ] Test migration success
- [ ] Commit: "feat(lms): add database schema for PDF distribution system"

### **Session 2: File Storage Setup** ⏳

- [ ] Install Vercel Blob SDK: `npm install @vercel/blob`
- [ ] Setup Blob storage in Vercel dashboard
- [ ] Add `BLOB_READ_WRITE_TOKEN` to `.env.local`
- [ ] Create `/api/admin/lms/upload/route.ts`
- [ ] Test upload with Postman/curl
- [ ] Implement file validation (max 50MB, PDF only)
- [ ] Commit: "feat(lms): implement PDF upload API with Vercel Blob"

### **Session 3: Admin Upload UI** ⏳

- [ ] Create `/admin/lms/materials/upload/page.tsx`
- [ ] Build `MaterialUploader.tsx` component
- [ ] Add drag-drop with `react-dropzone`
- [ ] Create metadata form (title, description, tags)
- [ ] Preview uploaded PDF
- [ ] Publish/draft toggle
- [ ] Commit: "feat(lms): admin upload interface with drag-drop"

### **Session 4: Material Management** ⏳

- [ ] Create `/admin/lms/materials/page.tsx`
- [ ] Build `MaterialList.tsx` with filters
- [ ] Implement search functionality
- [ ] Edit material modal
- [ ] Delete confirmation dialog
- [ ] Bulk operations (delete, publish)
- [ ] Commit: "feat(lms): admin material management interface"

### **Session 5: Student Portal** ⏳

- [ ] Create `/dashboard/student/materials/page.tsx`
- [ ] Build `MaterialBrowser.tsx` component
- [ ] Implement filters (course, chapter, type)
- [ ] PDF preview modal
- [ ] Download with progress tracking API call
- [ ] Bookmark functionality
- [ ] Commit: "feat(lms): student material browser and download"

### **Session 6: Notification System** ⏳

- [ ] Create `/api/admin/lms/notify/route.ts`
- [ ] WhatsApp notification template
- [ ] Email notification template
- [ ] Notification composer UI
- [ ] Schedule notification feature
- [ ] Delivery status tracking
- [ ] Commit: "feat(lms): multi-channel notification system"

### **Session 7: Analytics** ⏳

- [ ] Create `/api/admin/lms/analytics/route.ts`
- [ ] Build analytics dashboard UI
- [ ] Download/view charts
- [ ] Student engagement reports
- [ ] Export to CSV functionality
- [ ] Commit: "feat(lms): analytics dashboard for material tracking"

### **Session 8: Testing & Launch** ⏳

- [ ] Test complete flow: Upload → Notify → Download → Track
- [ ] Test with 5 real students
- [ ] Performance optimization (lazy loading, caching)
- [ ] Security audit (access control, file permissions)
- [ ] Documentation for admins
- [ ] Merge to `main`
- [ ] Deploy to production
- [ ] Commit: "feat(lms): complete PDF distribution system - production ready"

---

## 🔐 SECURITY CONSIDERATIONS

### **File Access Control**

- Generate signed URLs with 1-hour expiration
- Verify user enrollment before granting access
- Rate limit downloads (10 per hour per user)
- Scan uploaded files for malware

### **Data Privacy**

- Encrypt file URLs in database
- Audit log for all admin actions
- GDPR-compliant data deletion
- Student consent for notifications

---

## 📞 SUPPORT & TROUBLESHOOTING

### **Common Issues**

**Migration fails:**

```bash
# Reset database (development only)
npx prisma migrate reset
npx prisma migrate dev --name add_lms_system
```

**Upload fails:**

```bash
# Check Vercel Blob token
echo $BLOB_READ_WRITE_TOKEN

# Test with curl
curl -X POST https://your-domain.com/api/admin/lms/upload \
  -F "file=@test.pdf" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Performance issues:**

```typescript
// Add indexes in schema.prisma
@@index([courseId, isPublished])
@@index([userId, status])
```

---

## 📚 RESOURCES

- **Vercel Blob Docs:** https://vercel.com/docs/storage/vercel-blob
- **Prisma Docs:** https://www.prisma.io/docs
- **Next.js File Upload:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **React PDF Viewer:** https://react-pdf.org/

---

**Last Updated:** October 7, 2025
**Next Milestone:** Session 2 - File Storage Setup
**Contact:** Dr. Shekhar | +91 88264 44334
