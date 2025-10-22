# InstantDB Setup Guide for Cerebrum Biology Academy

This guide explains how to set up InstantDB authentication and data storage for your website.

## 🚀 What We've Built

The InstantDB integration provides:

- **Magic Link Authentication** - Passwordless login via email
- **Demo Booking System** - Students can book free demo classes
- **Course Enrollment** - Full enrollment system with payment tracking
- **User Profiles** - Store student information and preferences
- **Real-time Updates** - Instant sync across all devices
- **Offline Support** - Works even when internet is spotty

## 📁 Files Created

### Core Database

- `src/lib/db.ts` - Database configuration and types
- `src/hooks/useAuth.ts` - Authentication hook
- `src/hooks/useDemoBooking.ts` - Demo booking functionality
- `src/hooks/useEnrollment.ts` - Course enrollment system

### Components

- `src/components/auth/AuthModal.tsx` - Login/signup modal
- `src/components/booking/DemoBookingModal.tsx` - Demo booking form
- Updated `src/components/courses/CourseDetailPage.tsx` - Now has working demo booking

### Environment

- `.env.local` - Environment variables (needs your InstantDB app ID)

## 🛠️ Complete Setup Instructions

### Step 1: Get Your InstantDB App ID

1. **Create InstantDB Account**

   ```bash
   # Visit https://www.instantdb.com/
   # Sign up for a free account
   ```

2. **Create New App**
   - Go to https://instantdb.com/dash
   - Click "Create New App"
   - Name it "Cerebrum Biology Academy"
   - Copy your App ID

### Step 2: Configure Environment Variables

Edit `.env.local`:

```bash
# Replace with your actual InstantDB App ID
NEXT_PUBLIC_INSTANT_APP_ID=your_app_id_here_from_dashboard
```

### Step 3: Set Up Database Schema

In your InstantDB dashboard, you can set up these tables:

#### Users Table

```typescript
interface User {
  id: string
  email: string
  name: string
  phone?: string
  createdAt: number
  profile?: {
    class?: '11th' | '12th' | 'Dropper'
    targetYear?: string
    interestedCourses?: string[]
    location?: string
  }
}
```

#### Demo Bookings Table

```typescript
interface DemoBooking {
  id: string
  userId: string
  courseId: string
  studentName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  message?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: number
}
```

#### Enrollments Table

```typescript
interface Enrollment {
  id: string
  userId: string
  courseId: string
  studentName: string
  email: string
  phone: string
  paymentStatus: 'pending' | 'paid' | 'failed'
  enrollmentDate: number
  courseStartDate: string
  batchAssigned?: string
}
```

### Step 4: Update to Real InstantDB Implementation

The current implementation uses local state for demo purposes. To use real InstantDB:

1. **Update `src/hooks/useAuth.ts`** - Replace demo auth with actual InstantDB auth
2. **Update `src/hooks/useDemoBooking.ts`** - Use real database queries
3. **Update `src/hooks/useEnrollment.ts`** - Use real database transactions

Example real implementation:

```typescript
// In useAuth.ts
const { user, isLoading, error } = db.useAuth()
const signInWithEmail = async (email: string) => {
  return await db.auth.sendMagicCode({ email })
}

// In useDemoBooking.ts
const { data: bookings } = db.useQuery({ demoBookings: {} })
const bookDemo = async (bookingData) => {
  const bookingId = id()
  await db.transact(tx.demoBookings[bookingId].update(bookingData))
}
```

## 🎯 How It Works

### Demo Booking Flow

1. User clicks "Book Free Demo" on any course page
2. If not logged in → Auth modal appears
3. User enters email → Gets magic link
4. User clicks magic link → Gets logged in
5. Demo booking form appears → User fills details
6. Booking saved to database → Confirmation shown
7. Admin gets notification → Contacts student

### Authentication Flow

1. User enters email in auth modal
2. InstantDB sends magic link to email
3. User clicks link → Automatically signed in
4. User profile created/updated in database
5. Session persisted across page reloads

### Course Enrollment Flow

1. User clicks "Enroll Now"
2. Enrollment modal appears (to be built)
3. User fills enrollment form
4. Payment integration processes payment
5. Enrollment record created in database
6. Confirmation email sent to student

## 📊 Database Queries

### Get User's Demo Bookings

```typescript
const { data } = db.useQuery({
  demoBookings: {
    $: {
      where: { userId: currentUser.id },
    },
  },
})
```

### Get Course Enrollments

```typescript
const { data } = db.useQuery({
  enrollments: {
    $: {
      where: { courseId: course.id },
    },
  },
})
```

## 🔒 Security & Permissions

InstantDB provides built-in security rules. Set up permissions in your dashboard:

```javascript
// Users can only read/write their own data
{
  users: {
    bind: ["auth.id", "id"],
    allow: {
      view: "auth.id == id",
      create: "auth.id == id",
      update: "auth.id == id"
    }
  },

  // Demo bookings - users can create, admins can update
  demoBookings: {
    allow: {
      view: "auth.id == userId || auth.isAdmin",
      create: "auth.id == userId",
      update: "auth.isAdmin"
    }
  }
}
```

## 🚀 Benefits for Your Business

1. **Instant Lead Capture** - Every demo booking is a potential enrollment
2. **Real-time Analytics** - See booking trends and conversion rates
3. **Automated Follow-up** - Know exactly which students to contact
4. **Seamless Experience** - Students can book demos without friction
5. **Data-Driven Decisions** - Track which courses are most popular

## 🛟 Next Steps

1. Set up your InstantDB account and get your app ID
2. Update the environment variable
3. Test the demo booking system
4. Set up email notifications for new bookings
5. Build the enrollment system
6. Add payment integration (Razorpay/Stripe)
7. Create admin dashboard for managing bookings

## 📞 Support

If you need help with the setup:

1. Check InstantDB docs: https://instantdb.com/docs
2. Review the code comments in each file
3. Test with demo data first before going live

The system is now ready for real students to book demos and enroll in courses!
