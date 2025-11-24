# Certificates Generation System Documentation

## Overview

The Certificates Generation System is a comprehensive feature for the Cerebrum Biology Academy Student Dashboard that allows students to view, download, and share their course completion certificates. The system includes certificate generation, verification, and social sharing capabilities.

## Features

### For Students

- ✅ View all earned certificates in a grid layout
- ✅ Download certificates as high-quality PDFs
- ✅ Share certificates on LinkedIn, Facebook, Twitter
- ✅ Verify certificate authenticity
- ✅ Filter certificates by type, course, and date
- ✅ Search certificates by course name or certificate number
- ✅ View detailed certificate information
- ✅ Print certificates
- ✅ Track certificate statistics

### For Admins/Teachers

- ✅ Issue certificates to students
- ✅ Revoke certificates with reason
- ✅ Choose from multiple certificate templates
- ✅ Auto-generate unique certificate numbers and verification codes

### Certificate Types

1. **COURSE_COMPLETION** - Issued when student completes a course
2. **EXCELLENCE** - For top performers (90%+ scores)
3. **PARTICIPATION** - For active course participation
4. **ACHIEVEMENT** - For specific milestones
5. **APPRECIATION** - Special recognition
6. **SPECIAL_RECOGNITION** - Unique achievements

### Certificate Status

- **DRAFT** - Certificate created but not issued
- **ISSUED** - Active and valid certificate
- **REVOKED** - Certificate invalidated (with reason)
- **EXPIRED** - Certificate past validity period

## Database Schema

### certificates Table

```prisma
model certificates {
  id                  String              @id @default(cuid())
  studentId           String
  courseId            String?
  enrollmentId        String?
  templateId          String?
  certificateType     CertificateType
  certificateNumber   String              @unique
  verificationCode    String              @unique
  studentName         String
  courseName          String
  completionDate      DateTime
  issueDate           DateTime
  validUntil          DateTime?
  grade               String?
  percentage          Float?
  duration            String?
  instructorNames     Json?
  achievements        Json?
  qrCodeUrl           String?
  certificatePdfUrl   String?
  thumbnailUrl        String?
  status              CertificateStatus
  revokedAt           DateTime?
  revokedBy           String?
  revokeReason        String?
  downloadCount       Int
  lastDownloadedAt    DateTime?
  viewCount           Int
  shareCount          Int
  metadata            Json?
  createdAt           DateTime
  updatedAt           DateTime
}
```

### certificate_templates Table

```prisma
model certificate_templates {
  id               String            @id @default(cuid())
  name             String
  description      String?
  templateType     CertificateType
  designType       DesignType
  primaryColor     String
  secondaryColor   String
  accentColor      String
  fontFamily       String
  layout           Json
  backgroundImage  String?
  logoUrl          String?
  signatureFields  Json
  customFields     Json?
  isActive         Boolean
  isDefault        Boolean
  usageCount       Int
  createdBy        String?
  createdAt        DateTime
  updatedAt        DateTime
}
```

## API Endpoints

### Student APIs (`/api/student/certificates/`)

#### GET /api/student/certificates

Get all certificates for the logged-in student.

**Query Parameters:**

- `type` - Filter by certificate type
- `status` - Filter by status
- `courseId` - Filter by course

**Response:**

```json
{
  "certificates": [...],
  "stats": {
    "total": 5,
    "byType": { "COURSE_COMPLETION": 3, "EXCELLENCE": 2 },
    "byStatus": { "ISSUED": 5 }
  }
}
```

#### GET /api/student/certificates/[id]

Get details of a specific certificate.

**Response:**

```json
{
  "certificate": {
    "id": "...",
    "certificateNumber": "CBA-202411-ABCD1234",
    "verificationCode": "1234567890ABCDEF",
    "studentName": "John Doe",
    "courseName": "NEET Biology Complete",
    "status": "ISSUED",
    ...
  }
}
```

#### GET /api/student/certificates/[id]/download

Download certificate as PDF.

**Response:** PDF file stream

#### GET /api/student/certificates/[id]/verify

Get verification details for a certificate.

**Response:**

```json
{
  "verification": {
    "isValid": true,
    "certificateNumber": "CBA-202411-ABCD1234",
    "studentName": "John Doe",
    "status": "ISSUED",
    ...
  }
}
```

### Admin/Teacher APIs (`/api/certificates/`)

#### POST /api/certificates/issue

Issue a new certificate to a student.

**Request Body:**

```json
{
  "studentId": "student-id",
  "courseId": "course-id",
  "enrollmentId": "enrollment-id",
  "certificateType": "COURSE_COMPLETION",
  "courseName": "NEET Biology Complete",
  "completionDate": "2024-11-21T00:00:00Z",
  "grade": "A+",
  "percentage": 95,
  "duration": "6 months",
  "instructorNames": ["Dr. Shekhar C Singh"],
  "achievements": ["Outstanding Performance"]
}
```

**Response:**

```json
{
  "message": "Certificate issued successfully",
  "certificate": { ... }
}
```

#### GET /api/certificates/verify/[code]

Public endpoint to verify a certificate (no authentication required).

**Response:**

```json
{
  "verified": true,
  "certificate": { ... },
  "status": {
    "isValid": true,
    "isRevoked": false,
    "isExpired": false,
    "message": "This certificate is valid and verified."
  },
  "issuer": {
    "name": "Cerebrum Biology Academy",
    "website": "https://cerebrumbiologyacademy.com"
  },
  "verifiedAt": "2024-11-21T..."
}
```

#### PATCH /api/certificates/[id]/revoke

Revoke a certificate.

**Request Body:**

```json
{
  "reason": "Student requested certificate revocation due to error in details"
}
```

**Response:**

```json
{
  "message": "Certificate revoked successfully",
  "certificate": { ... }
}
```

## Certificate Generation

### Certificate Templates

Three professional design templates are available:

1. **Modern Template**
   - Clean, minimalist design
   - Gradient borders and colors
   - Modern typography (Inter font)
   - Perfect for digital sharing

2. **Classic Template**
   - Traditional certificate design
   - Gold and blue color scheme
   - Formal fonts (Playfair Display)
   - Double border with seal
   - Best for formal recognition

3. **Premium Template**
   - Dark elegant design
   - Blue gradient theme
   - Decorative corners
   - Premium feel
   - Ideal for excellence awards

### Certificate Features

- **High-Resolution PDF** - Generated at 300 DPI for print quality
- **A4 Landscape Format** - Standard certificate size
- **QR Code** - Embedded verification QR code
- **Unique Certificate Number** - Format: CBA-YYYYMM-XXXXXXXX
- **Verification Code** - 16-character unique code
- **Digital Signatures** - Instructor signatures
- **Academy Seal/Logo** - Professional branding
- **Dynamic Content** - Student name, course, grade, dates
- **Achievements** - Special recognitions
- **Watermark Support** - Optional security watermark

### PDF Generation Library

Location: `/src/lib/certificates/`

Files:

- `certificateGenerator.ts` - Main generation logic
- `certificateTemplates.tsx` - React PDF templates
- `types.ts` - TypeScript type definitions
- `index.ts` - Exports

Key Functions:

```typescript
// Generate certificate number
const certNumber = await CertificateGenerator.generateCertificateNumber()
// Returns: "CBA-202411-ABCD1234"

// Generate verification code
const verCode = await CertificateGenerator.generateVerificationCode()
// Returns: "1234567890ABCDEF"

// Generate QR code
const qrCode = await CertificateGenerator.generateQRCode(verificationCode)
// Returns: Data URL of QR code image

// Generate PDF
const pdfStream = await CertificateGenerator.generateCertificatePDF(certificateData, {
  template,
  includeQRCode: true,
})

// Generate and upload
const { pdfUrl, qrCodeUrl } = await CertificateGenerator.generateAndUploadCertificate(
  certificateData,
  options
)
```

## UI Components

### Student Components (`/src/components/student/`)

#### CertificateCard.tsx

Displays a single certificate in card format.

**Props:**

```typescript
interface CertificateCardProps {
  certificate: Certificate
  onDownload?: (id: string) => void
  onShare?: (id: string) => void
  onView?: (id: string) => void
}
```

**Features:**

- Certificate type icon and color coding
- Student name and course name
- Completion date and grade
- View, Download, and Share buttons
- Hover effects and animations

#### CertificateList.tsx

Grid view of multiple certificates with filtering and search.

**Props:**

```typescript
interface CertificateListProps {
  certificates: Certificate[]
}
```

**Features:**

- Search by course name or certificate number
- Filter by certificate type
- Sort by date or type
- Grid layout (responsive)
- Empty state handling
- Download and share handlers

#### CertificateShareButtons.tsx

Social media sharing buttons.

**Props:**

```typescript
interface CertificateShareButtonsProps {
  certificateId: string
  studentName: string
  courseName: string
  certificateType: string
  verificationCode: string
}
```

**Features:**

- LinkedIn share
- Facebook share
- Twitter share
- Copy link to clipboard
- Native Web Share API support

#### CertificateVerificationBadge.tsx

Displays certificate verification status.

**Props:**

```typescript
interface CertificateVerificationBadgeProps {
  status: 'ISSUED' | 'REVOKED' | 'EXPIRED' | 'DRAFT'
  revokeReason?: string | null
  validUntil?: Date | null
  className?: string
}
```

**Features:**

- Color-coded status (green=valid, red=revoked, gray=expired)
- Status icon and message
- Revoke reason display
- Validity period display

## Pages

### Student Pages

#### `/student/certificates` - Main Certificates Page

**Features:**

- Statistics dashboard (total certificates, active, excellence awards)
- Certificate grid with filters
- Search functionality
- Empty state for no certificates

**Statistics Cards:**

- Total Certificates
- Active Certificates
- Excellence Awards
- Course Completions

#### `/student/certificates/[id]` - Certificate Detail Page

**Features:**

- Full certificate preview
- Certificate details (student, course, grade, dates)
- Verification badge
- Download PDF button
- Print button
- Share buttons (LinkedIn, Facebook, Twitter)
- Verification link
- Instructor signatures
- Special achievements

**Actions:**

- View certificate
- Download as PDF
- Print certificate
- Share on social media
- Verify online
- Copy verification link

### Public Pages

#### `/verify-certificate/[code]` - Public Verification Page

**Features:**

- No authentication required
- Certificate verification status
- Certificate details display
- Issuer information
- Verification timestamp
- Status message (valid/revoked/expired)
- Professional design
- Responsive layout

## Security Features

### Verification System

- **Unique Verification Code**: 16-character SHA-256 hash
- **Certificate Number**: Sequential with date prefix
- **QR Code**: Links to public verification page
- **Tamper Detection**: Database-backed verification
- **Revocation**: Certificates can be revoked with audit trail
- **Audit Trail**: Track views, downloads, shares

### Access Control

- Students can only view their own certificates
- Admins/Teachers can issue and revoke certificates
- Public verification requires no authentication
- Download tracking with timestamps

## Social Sharing

### Supported Platforms

- **LinkedIn**: Professional network sharing
- **Facebook**: Social sharing with quote
- **Twitter**: Tweet with certificate link
- **Copy Link**: Clipboard functionality
- **Native Share**: Mobile-friendly Web Share API

### Share Text Format

```
I have successfully completed [COURSE NAME] and earned a [CERTIFICATE TYPE] certificate from Cerebrum Biology Academy!
```

## Usage Examples

### For Students

1. **View Certificates:**
   - Navigate to `/student/certificates`
   - Browse all earned certificates
   - Use filters to find specific certificates

2. **Download Certificate:**
   - Click on a certificate card
   - Click "Download PDF" button
   - Save the high-quality PDF

3. **Share on LinkedIn:**
   - Open certificate details
   - Click LinkedIn share button
   - Add your custom message
   - Post to LinkedIn

4. **Verify Certificate:**
   - Open certificate details
   - Click "Verify Online" button
   - Share the verification link with others

### For Admins/Teachers

1. **Issue Certificate:**

```typescript
POST /api/certificates/issue
{
  "studentId": "student-123",
  "courseId": "course-456",
  "certificateType": "EXCELLENCE",
  "courseName": "NEET Biology Complete",
  "completionDate": "2024-11-21T00:00:00Z",
  "grade": "A+",
  "percentage": 95
}
```

2. **Revoke Certificate:**

```typescript
PATCH /api/certificates/cert-123/revoke
{
  "reason": "Certificate details correction required"
}
```

## Migration Instructions

To add the certificates system to the database:

1. **Update Prisma Schema**: Already done in `prisma/schema.prisma`

2. **Generate Prisma Client**:

```bash
npx prisma generate
```

3. **Run Migration** (when database is available):

```bash
npx prisma migrate dev --name add_certificates_system
```

## Dependencies

### Required NPM Packages

- `@react-pdf/renderer` - PDF generation (already installed)
- `qrcode` - QR code generation (installed)
- `@types/qrcode` - TypeScript types (installed)
- `nanoid` - Unique ID generation (already installed)

### Fonts Used

- **Inter**: Modern, clean sans-serif font
- **Playfair Display**: Classic, elegant serif font
- Both fonts loaded from Google Fonts CDN

## File Structure

```
src/
├── lib/
│   └── certificates/
│       ├── certificateGenerator.ts
│       ├── certificateTemplates.tsx
│       ├── types.ts
│       └── index.ts
├── app/
│   ├── api/
│   │   ├── certificates/
│   │   │   ├── issue/route.ts
│   │   │   ├── verify/[code]/route.ts
│   │   │   └── [id]/revoke/route.ts
│   │   └── student/
│   │       └── certificates/
│   │           ├── route.ts
│   │           └── [id]/
│   │               ├── route.ts
│   │               ├── download/route.ts
│   │               └── verify/route.ts
│   ├── student/
│   │   └── certificates/
│   │       ├── page.tsx
│   │       └── [id]/page.tsx
│   └── verify-certificate/
│       └── [code]/page.tsx
└── components/
    └── student/
        ├── CertificateCard.tsx
        ├── CertificateList.tsx
        ├── CertificateShareButtons.tsx
        └── CertificateVerificationBadge.tsx
```

## Environment Variables

Add to `.env`:

```env
NEXT_PUBLIC_APP_URL=https://cerebrumbiologyacademy.com
VERCEL_BLOB_READ_WRITE_TOKEN=your_token  # For PDF storage
```

## Best Practices

1. **Always verify certificates** before displaying to users
2. **Use proper error handling** for PDF generation failures
3. **Track analytics** (views, downloads, shares)
4. **Implement rate limiting** on certificate generation
5. **Cache generated PDFs** to reduce server load
6. **Validate certificate data** before issuance
7. **Log all certificate operations** for audit trail
8. **Use transactions** when issuing certificates
9. **Implement retry logic** for PDF uploads
10. **Monitor certificate verification** requests

## Future Enhancements

Potential features to add:

- [ ] Certificate templates editor
- [ ] Batch certificate issuance
- [ ] Certificate expiration notifications
- [ ] Certificate analytics dashboard
- [ ] Custom certificate backgrounds
- [ ] Multi-language support
- [ ] Email certificate on issuance
- [ ] Certificate portfolio page
- [ ] Digital signatures with blockchain
- [ ] Certificate NFTs
- [ ] Advanced search and filtering
- [ ] Certificate comparison
- [ ] Print optimization
- [ ] Mobile app integration

## Troubleshooting

### Common Issues

1. **PDF Generation Fails**
   - Check if all required data is present
   - Verify fonts are loading correctly
   - Check memory limits for large PDFs

2. **QR Code Not Showing**
   - Verify qrcode library is installed
   - Check verification code is valid
   - Ensure network connectivity for verification URL

3. **Certificate Not Downloading**
   - Check browser download permissions
   - Verify PDF URL is accessible
   - Check file size limits

4. **Verification Page Not Found**
   - Verify verification code is correct
   - Check database connection
   - Ensure certificate exists and is issued

## Support

For issues or questions:

- Check the documentation above
- Review error logs
- Contact the development team
- Submit issues on GitHub (if applicable)

## Credits

Developed for Cerebrum Biology Academy

- Certificate Design: Modern, Classic, and Premium templates
- PDF Generation: @react-pdf/renderer
- QR Codes: qrcode library
- Fonts: Google Fonts (Inter, Playfair Display)

---

© 2024 Cerebrum Biology Academy. All rights reserved.
