# Assignment Submission Module - Complete Documentation

## Overview

This is a comprehensive assignment management system for both Students and Teachers in the Cerebrum Biology Academy application. The module allows teachers to create, manage, and grade assignments while students can view, submit, and track their assignment progress.

## Table of Contents

1. [Database Schema](#database-schema)
2. [API Endpoints](#api-endpoints)
3. [UI Components](#ui-components)
4. [Pages](#pages)
5. [File Upload System](#file-upload-system)
6. [Setup Instructions](#setup-instructions)
7. [Features Implemented](#features-implemented)
8. [Remaining Tasks](#remaining-tasks)

---

## Database Schema

### New Tables Added

#### `assignments` Table

Stores assignment templates created by teachers.

**Fields:**

- `id` (String, PK): Unique assignment identifier
- `teacherId` (String, FK): Reference to teacher who created it
- `courseId` (String, FK, nullable): Associated course
- `chapterId` (String, FK, nullable): Associated chapter
- `topicId` (String, FK, nullable): Associated topic
- `title` (String): Assignment title
- `description` (Text): Detailed description
- `instructions` (Text, nullable): Instructions for students
- `maxMarks` (Int): Maximum marks for the assignment
- `dueDate` (DateTime): Submission deadline
- `allowLateSubmission` (Boolean): Whether late submissions are allowed
- `allowResubmission` (Boolean): Whether resubmissions are allowed
- `latePenaltyPercentage` (Int): Penalty for late submissions
- `status` (AssignmentStatus): DRAFT, PUBLISHED, or CLOSED
- `attachments` (String[]): URLs of attached files
- `createdAt` (DateTime): Creation timestamp
- `updatedAt` (DateTime): Last update timestamp
- `publishedAt` (DateTime, nullable): Publication timestamp

**Relations:**

- `teacher`: Many-to-one with `users` (TeacherAssignments)
- `course`: Many-to-one with `courses`
- `chapter`: Many-to-one with `chapters`
- `topic`: Many-to-one with `topics`
- `submissions`: One-to-many with `assignment_submissions`

**Indexes:**

- `[teacherId, status]`
- `[courseId, status]`
- `[dueDate, status]`
- `[status, publishedAt]`

#### `assignment_submissions` Table

Stores student submissions for assignments.

**Fields:**

- `id` (String, PK): Unique submission identifier
- `assignmentId` (String, FK): Reference to assignment
- `studentId` (String, FK): Reference to student
- `submittedFiles` (String[]): URLs of submitted files
- `submittedText` (Text, nullable): Additional text submission
- `status` (SubmissionStatus): NOT_SUBMITTED, SUBMITTED, LATE, GRADED, RESUBMIT_REQUIRED
- `submittedAt` (DateTime, nullable): Submission timestamp
- `grade` (Int, nullable): Grade awarded
- `feedback` (Text, nullable): Teacher feedback
- `gradedAt` (DateTime, nullable): Grading timestamp
- `isLate` (Boolean): Whether submission was late
- `resubmissionCount` (Int): Number of resubmissions
- `lastResubmittedAt` (DateTime, nullable): Last resubmission timestamp
- `createdAt` (DateTime): Creation timestamp
- `updatedAt` (DateTime): Last update timestamp

**Relations:**

- `assignment`: Many-to-one with `assignments`
- `student`: Many-to-one with `users` (StudentSubmissions)

**Unique Constraint:**

- `[assignmentId, studentId]` - One submission per student per assignment

**Indexes:**

- `[studentId, status]`
- `[assignmentId, status]`
- `[submittedAt]`
- `[status, gradedAt]`

### Enums Added

```typescript
enum AssignmentStatus {
  DRAFT
  PUBLISHED
  CLOSED
}

enum SubmissionStatus {
  NOT_SUBMITTED
  SUBMITTED
  LATE
  GRADED
  RESUBMIT_REQUIRED
}
```

---

## API Endpoints

### Student APIs (`/api/student/assignments/`)

#### 1. GET `/api/student/assignments`

Get all assignments for student's enrolled courses.

**Query Parameters:**

- `search` (string): Search in title and description
- `courseId` (string): Filter by course
- `chapterId` (string): Filter by chapter
- `status` (string): 'upcoming' or 'overdue'
- `submissionStatus` (string): Filter by submission status
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)

**Response:**

```json
{
  "success": true,
  "assignments": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  },
  "stats": {
    "totalAssignments": 50,
    "pendingSubmissions": 15,
    "submittedAssignments": 30,
    "gradedAssignments": 25,
    "averageGrade": 85.5
  }
}
```

#### 2. GET `/api/student/assignments/[id]`

Get specific assignment details.

**Response:**

```json
{
  "success": true,
  "assignment": {
    "id": "...",
    "title": "...",
    "description": "...",
    "submission": {...},
    "isOverdue": false,
    "canSubmit": true
  }
}
```

#### 3. POST `/api/student/assignments/[id]/submit`

Submit an assignment.

**Request Body:**

```json
{
  "submittedFiles": ["url1", "url2"],
  "submittedText": "Additional notes..."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Assignment submitted successfully",
  "submission": {...}
}
```

#### 4. GET `/api/student/assignments/[id]/submission`

Get student's submission for an assignment.

#### 5. PATCH `/api/student/assignments/[id]/submission`

Update submission before deadline.

---

### Teacher APIs (`/api/teacher/assignments/`)

#### 1. GET `/api/teacher/assignments`

Get all assignments created by teacher.

**Query Parameters:**

- `search` (string): Search query
- `courseId` (string): Filter by course
- `status` (string): Filter by status
- `page` (number): Page number
- `limit` (number): Items per page

**Response:**

```json
{
  "success": true,
  "assignments": [...],
  "pagination": {...},
  "stats": {
    "totalAssignments": 30,
    "draftAssignments": 5,
    "publishedAssignments": 20,
    "closedAssignments": 5,
    "upcomingDeadlines": 10
  }
}
```

#### 2. POST `/api/teacher/assignments`

Create new assignment.

**Request Body:**

```json
{
  "courseId": "...",
  "chapterId": "...",
  "topicId": "...",
  "title": "Assignment Title",
  "description": "Description...",
  "instructions": "Instructions...",
  "maxMarks": 100,
  "dueDate": "2025-12-31T23:59:59Z",
  "allowLateSubmission": true,
  "allowResubmission": false,
  "latePenaltyPercentage": 10,
  "status": "PUBLISHED",
  "attachments": ["url1", "url2"]
}
```

#### 3. GET `/api/teacher/assignments/[id]`

Get assignment with all submissions.

#### 4. PATCH `/api/teacher/assignments/[id]`

Update assignment details.

#### 5. DELETE `/api/teacher/assignments/[id]`

Delete assignment (only drafts without submissions).

#### 6. POST `/api/teacher/assignments/[id]/submissions/[submissionId]/grade`

Grade a submission.

**Request Body:**

```json
{
  "grade": 85,
  "feedback": "Good work!",
  "requireResubmission": false
}
```

---

### File Upload API

#### POST `/api/assignments/upload`

Upload assignment files.

**Request:** Form-data with file
**Response:**

```json
{
  "success": true,
  "fileUrl": "/uploads/assignments/...",
  "fileName": "document.pdf",
  "fileSize": 1024000,
  "mimeType": "application/pdf"
}
```

**Allowed File Types:**

- PDF (.pdf)
- Word Documents (.doc, .docx)
- Text Files (.txt)
- Images (.jpg, .jpeg, .png)

**Max File Size:** 10MB per file

---

## UI Components

### Student Components (`/src/components/student/`)

#### 1. `AssignmentCard.tsx`

Displays individual assignment with status, due date, and submission info.

**Props:**

```typescript
interface AssignmentCardProps {
  assignment: Assignment & {
    submission?: {...}
    isOverdue?: boolean
  }
}
```

**Features:**

- Dynamic status badges
- Due date countdown
- Overdue warnings
- Quick submission access

#### 2. `AssignmentList.tsx`

Lists assignments with search and filter functionality.

**Props:**

```typescript
interface AssignmentListProps {
  assignments: Array<Assignment & {...}>
  loading?: boolean
}
```

**Features:**

- Search by title/description
- Filter by status (pending, submitted, graded, overdue)
- Filter by course
- Empty state handling
- Loading skeletons

---

## Pages

### Student Pages

#### 1. `/student/assignments` (`page.tsx`)

Main assignments dashboard showing all assignments.

**Features:**

- Statistics cards (total, pending, submitted, graded, average grade)
- Assignment list with filters
- Responsive design
- Authentication check
- Role-based access control

#### 2. `/student/assignments/[id]` (`page.tsx`)

Assignment detail and submission page.

**Features:**

- Full assignment details
- Download assignment files
- View submission status and feedback
- File upload interface
- Multiple file support
- Text submission
- Resubmission support
- Grade display
- Late submission warnings

---

### Teacher Pages

#### 1. `/teacher/assignments` (`page.tsx`)

Teacher assignments management dashboard.

**Features:**

- Statistics overview (total, drafts, published, closed, upcoming)
- Create new assignment button
- Search and filter
- Assignment cards with submission stats
- Quick publish action
- Delete draft assignments
- View submissions

---

## File Upload System

### File Upload Utility (`/src/lib/fileUpload.ts`)

**Functions:**

1. `validateFile(file)` - Validates file type and size
2. `formatFileSize(bytes)` - Formats bytes to readable format
3. `getFileExtension(filename)` - Extracts file extension
4. `getFileIcon(mimeType)` - Returns appropriate emoji icon
5. `uploadFile(file)` - Uploads single file
6. `uploadMultipleFiles(files)` - Uploads multiple files

**Validation Rules:**

- Allowed types: PDF, DOC, DOCX, TXT, JPG, PNG
- Max size: 10MB per file
- Sanitized filenames
- Unique file naming with timestamps

**Upload Location:**
`/public/uploads/assignments/`

**File Naming Convention:**
`{timestamp}_{uniqueId}_{sanitizedFileName}`

---

## Setup Instructions

### 1. Database Migration

```bash
# Run migration to create new tables
npx prisma migrate dev --name add_assignments_module

# Or if migration fails due to missing env vars, just generate the client
npx prisma generate
```

**Manual Migration (if needed):**
If automatic migration fails, you'll need to:

1. Set up your `DATABASE_URL` and `DIRECT_DATABASE_URL` in `.env`
2. Run the migration command
3. Restart your development server

### 2. File Upload Directory

Create the uploads directory:

```bash
mkdir -p public/uploads/assignments
```

### 3. Dependencies

Ensure these packages are installed:

```bash
npm install date-fns
```

### 4. Environment Variables

No new environment variables are required. The module uses existing authentication and database connections.

### 5. Run the Application

```bash
npm run dev
```

---

## Features Implemented

### Student Features

- ✅ View all assigned assignments
- ✅ Filter assignments by status, course, and search query
- ✅ View assignment details, instructions, and attachments
- ✅ Download assignment files
- ✅ Submit assignments with multiple file uploads
- ✅ Add text notes to submissions
- ✅ Track submission status (pending, submitted, late, graded)
- ✅ View grades and teacher feedback
- ✅ Resubmit assignments (if allowed)
- ✅ Late submission warnings
- ✅ Assignment statistics dashboard
- ✅ Due date countdown
- ✅ Responsive design

### Teacher Features

- ✅ Create assignments with detailed options
- ✅ Attach files to assignments
- ✅ Set due dates and max marks
- ✅ Configure late submission and resubmission policies
- ✅ Save assignments as drafts
- ✅ Publish assignments to students
- ✅ View all created assignments
- ✅ Filter and search assignments
- ✅ View submission statistics
- ✅ View all student submissions
- ✅ Grade submissions with feedback
- ✅ Request resubmissions
- ✅ Delete draft assignments
- ✅ Update assignment details
- ✅ Close assignments
- ✅ Statistics dashboard

### File Upload Features

- ✅ Multiple file uploads
- ✅ File type validation (PDF, DOC, DOCX, TXT, JPG, PNG)
- ✅ File size validation (10MB max)
- ✅ Progress tracking
- ✅ File preview in cards
- ✅ Remove files before upload
- ✅ Secure file storage
- ✅ Unique file naming

### Security Features

- ✅ Authentication required
- ✅ Role-based access control (Student/Teacher)
- ✅ Students can only view enrolled course assignments
- ✅ Students can only submit their own assignments
- ✅ Teachers can only manage their own assignments
- ✅ File upload validation
- ✅ XSS prevention through sanitization
- ✅ SQL injection prevention through Prisma ORM

---

## Remaining Tasks

### High Priority

1. **Email Notifications**
   - New assignment notification to students
   - Deadline reminder (24 hours before)
   - Grading completion notification
   - Resubmission request notification
   - Late submission alerts

2. **Teacher Assignment Creation Page**
   - Create `/teacher/assignments/create` page
   - Form with rich text editor
   - File attachment interface
   - Course/chapter/topic selection
   - Preview before publishing

3. **Teacher Assignment Detail Page**
   - Create `/teacher/assignments/[id]` page
   - View all submissions
   - Bulk grading interface
   - Download all submissions
   - Export grades to CSV

4. **Teacher Grading Interface**
   - Individual submission view page
   - Grade input with validation
   - Feedback text area
   - View submitted files
   - Resubmission request option

### Medium Priority

5. **Additional Student Components**
   - Assignment calendar view
   - Assignment progress tracker
   - Grade history chart
   - Submission history view

6. **Additional Teacher Components**
   - Assignment analytics dashboard
   - Grade distribution chart
   - Submission timeline
   - Student performance comparison

7. **Enhanced Features**
   - Assignment templates for teachers
   - Rubric support for grading
   - Peer review functionality
   - Assignment categories/tags
   - Bulk operations for teachers

### Low Priority

8. **Advanced Features**
   - Plagiarism detection integration
   - Auto-grading for MCQ assignments
   - Assignment versioning
   - Submission comments/discussion
   - Mobile app integration
   - Push notifications

9. **Reporting**
   - Detailed analytics reports
   - Performance trends
   - Completion rates
   - Grade distribution analysis

10. **Testing**
    - Unit tests for API endpoints
    - Integration tests
    - E2E tests for critical flows
    - Load testing for file uploads

---

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── student/
│   │   │   └── assignments/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           ├── route.ts
│   │   │           ├── submit/route.ts
│   │   │           └── submission/route.ts
│   │   ├── teacher/
│   │   │   └── assignments/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           ├── route.ts
│   │   │           └── submissions/
│   │   │               └── [submissionId]/
│   │   │                   └── grade/route.ts
│   │   └── assignments/
│   │       └── upload/route.ts
│   ├── student/
│   │   └── assignments/
│   │       ├── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
│   └── teacher/
│       └── assignments/
│           └── page.tsx
├── components/
│   └── student/
│       ├── AssignmentCard.tsx
│       └── AssignmentList.tsx
├── lib/
│   └── fileUpload.ts
└── types/
    └── assignment.ts

prisma/
└── schema.prisma (updated)
```

---

## API Response Formats

### Success Response

```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "details": "Detailed error information"
}
```

---

## Database Migration Notes

**IMPORTANT:** Before running the application in production:

1. Backup your existing database
2. Review the migration file
3. Test migration on a staging environment
4. Run: `npx prisma migrate deploy` for production

**Migration includes:**

- New `assignments` table
- New `assignment_submissions` table
- New enums for `AssignmentStatus` and `SubmissionStatus`
- Foreign key relations to existing tables
- Appropriate indexes for query optimization

---

## Security Considerations

1. **File Upload Security**
   - File type whitelist
   - File size limits
   - Sanitized file names
   - Isolated storage directory
   - No executable file types

2. **Access Control**
   - JWT-based authentication
   - Role-based permissions
   - Course enrollment verification
   - Owner verification for modifications

3. **Data Validation**
   - Input sanitization
   - Type checking
   - Range validation for grades
   - Date validation

4. **API Security**
   - CSRF protection (via Next.js)
   - Rate limiting (recommended to add)
   - Request validation
   - Error message sanitization

---

## Performance Considerations

1. **Database Queries**
   - Optimized with proper indexes
   - Selective field inclusion
   - Pagination implemented
   - Aggregate queries for stats

2. **File Uploads**
   - Client-side validation before upload
   - Progress indicators
   - Error handling
   - Multiple file support

3. **UI Performance**
   - Loading skeletons
   - Lazy loading
   - Optimistic updates
   - Debounced search

---

## Next Steps

To complete this module:

1. **Implement email notifications** using your existing email service
2. **Create teacher assignment creation form** with rich text editor
3. **Build teacher assignment detail page** with submission list
4. **Create grading interface** for individual submissions
5. **Add bulk operations** for teachers (export, bulk grade)
6. **Implement assignment templates** for reusability
7. **Add comprehensive testing**
8. **Deploy and monitor** for performance

---

## Support and Maintenance

### Common Issues

**Issue:** File upload fails
**Solution:** Check file size (<10MB), file type (allowed types), and upload directory permissions

**Issue:** Assignment not visible to students
**Solution:** Ensure assignment status is PUBLISHED and student is enrolled in the course

**Issue:** Cannot submit after deadline
**Solution:** Check if `allowLateSubmission` is enabled for the assignment

**Issue:** Grading not saving
**Solution:** Verify grade is within 0 to maxMarks range

---

## Conclusion

This assignment module provides a comprehensive solution for managing assignments in the Cerebrum Biology Academy. The implementation follows best practices for security, performance, and user experience. The modular design allows for easy extension and maintenance.

For any questions or issues, refer to the codebase comments and this documentation.

**Version:** 1.0.0
**Last Updated:** November 21, 2025
**Status:** Core functionality implemented, notifications and additional features pending
