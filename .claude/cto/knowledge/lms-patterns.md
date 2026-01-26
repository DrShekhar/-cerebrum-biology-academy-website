# LMS Best Practices & Patterns

Reference guide for Learning Management System development.

---

## 🏗️ Core LMS Architecture

### Essential Components

```
┌─────────────────────────────────────────────────────────────┐
│                        LMS Platform                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Content    │  │   Learning   │  │  Assessment  │       │
│  │  Management  │  │    Paths     │  │    Engine    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Progress   │  │   Social     │  │   Analytics  │       │
│  │   Tracking   │  │   Features   │  │   & Reports  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Gamifi-    │  │   Notifi-    │  │   Payment    │       │
│  │   cation     │  │   cations    │  │   System     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📚 Content Management

### Content Types

| Type        | Use Case               | Storage                 |
| ----------- | ---------------------- | ----------------------- |
| Video       | Lectures, explanations | CDN (Cloudflare, Bunny) |
| PDF         | Notes, reference       | Object storage (S3)     |
| Interactive | MCQs, simulations      | Database                |
| Live        | Real-time classes      | WebRTC/Zoom/Meet        |
| Text        | Articles, blogs        | Database/MDX            |

### Content Organization

```
Course
├── Module 1
│   ├── Lesson 1.1 (Video)
│   ├── Lesson 1.2 (Video)
│   ├── Practice Quiz
│   └── Assignment
├── Module 2
│   └── ...
├── Final Assessment
└── Certificate
```

### Video Best Practices

- **Resolution**: 1080p max (720p for mobile)
- **Length**: 10-15 min ideal
- **Format**: HLS/DASH for adaptive streaming
- **Chapters**: Timestamp-based navigation
- **Captions**: Auto-generated + manual review
- **Speed Control**: 0.5x to 2x playback

---

## 🛤️ Learning Paths

### Path Types

1. **Linear**: Fixed sequence, complete in order
2. **Branching**: Different tracks based on goals
3. **Adaptive**: AI-selected based on performance
4. **Self-paced**: No deadlines, free exploration

### Progress Tracking Data Model

```typescript
interface Progress {
  userId: string
  courseId: string
  moduleId: string
  lessonId: string
  status: 'not_started' | 'in_progress' | 'completed'
  percentComplete: number
  timeSpent: number // seconds
  lastAccessedAt: Date
  completedAt?: Date
}
```

### Completion Rules

- **Video**: Watched 90%+ (with no skipping detection)
- **Quiz**: Passed with minimum score
- **Assignment**: Submitted and reviewed
- **Certificate**: All modules completed

---

## 📝 Assessment Engine

### Question Types

| Type             | Difficulty | Auto-Gradable |
| ---------------- | ---------- | ------------- |
| MCQ (Single)     | Easy       | ✅ Yes        |
| MCQ (Multiple)   | Medium     | ✅ Yes        |
| True/False       | Easy       | ✅ Yes        |
| Fill in Blank    | Medium     | ✅ Partial    |
| Matching         | Medium     | ✅ Yes        |
| Assertion-Reason | Hard       | ✅ Yes        |
| Numerical        | Hard       | ✅ Yes        |
| Short Answer     | Medium     | ❌ No         |
| Long Answer      | Hard       | ❌ No         |

### Test Settings

```typescript
interface TestConfig {
  duration: number // minutes
  totalQuestions: number
  passingScore: number // percentage
  negativeMarking: boolean
  negativeMarkValue: number
  shuffleQuestions: boolean
  shuffleOptions: boolean
  showResults: 'immediately' | 'after_deadline' | 'manual'
  allowReview: boolean
  maxAttempts: number
  proctoring: boolean
}
```

### NEET-Specific Settings

- Duration: 3 hours 20 minutes
- Questions: 200 (180 to attempt)
- Marking: +4 correct, -1 wrong
- No negative for unattempted

---

## 🎮 Gamification

### XP System

```typescript
const XP_REWARDS = {
  VIDEO_COMPLETE: 10,
  QUIZ_PASS: 25,
  QUIZ_PERFECT: 50,
  DAILY_STREAK: 5,
  WEEKLY_STREAK: 50,
  FIRST_COURSE_COMPLETE: 100,
  HELP_PEER: 15,
  LEADERBOARD_TOP_10: 20,
}
```

### Level Thresholds

| Level | XP Required | Title    |
| ----- | ----------- | -------- |
| 1     | 0           | Beginner |
| 2     | 100         | Learner  |
| 3     | 300         | Student  |
| 4     | 600         | Scholar  |
| 5     | 1000        | Expert   |
| 6     | 1500        | Master   |
| 7     | 2500        | Champion |
| 8     | 4000        | Legend   |

### Streak Mechanics

- Reset at midnight (user's timezone)
- Grace period: 1 day (with streak freeze)
- Minimum activity: 1 quiz or 10 min video
- Rewards compound (7-day, 30-day, 100-day)

### Badges

```typescript
const BADGES = [
  { id: 'first_lesson', name: 'First Step', trigger: 'complete_first_lesson' },
  { id: 'week_streak', name: 'Consistent', trigger: 'streak_7_days' },
  { id: 'perfect_score', name: 'Perfect', trigger: 'quiz_100_percent' },
  { id: 'night_owl', name: 'Night Owl', trigger: 'study_after_midnight' },
  { id: 'early_bird', name: 'Early Bird', trigger: 'study_before_6am' },
]
```

---

## 📊 Analytics

### Student Metrics

- Time spent (total, per module)
- Completion rate
- Quiz scores (average, trend)
- Engagement pattern (daily, weekly)
- Weak topics (based on quiz performance)

### Platform Metrics

- Daily Active Users (DAU)
- Course completion rate
- Average session duration
- Most/least popular content
- Drop-off points

### Predictive Alerts

```typescript
const AT_RISK_INDICATORS = [
  { metric: 'days_inactive', threshold: 7, severity: 'warning' },
  { metric: 'days_inactive', threshold: 14, severity: 'critical' },
  { metric: 'quiz_avg_score', threshold: 40, severity: 'warning' },
  { metric: 'completion_rate', threshold: 20, severity: 'warning' },
]
```

---

## 🔔 Notifications

### Notification Types

| Type            | Channel        | Timing                 |
| --------------- | -------------- | ---------------------- |
| Streak reminder | Push, WhatsApp | Evening if no activity |
| New content     | Email, Push    | On publish             |
| Quiz deadline   | All            | 1 day, 1 hour before   |
| Streak broken   | Push           | Next morning           |
| Achievement     | In-app, Push   | Immediately            |
| Weekly progress | Email          | Sunday evening         |

### Notification Preferences

Allow users to control:

- Channel preferences (email, push, WhatsApp)
- Frequency (real-time, daily digest, weekly)
- Types (marketing vs. transactional)
- Quiet hours

---

## 💳 Payment Patterns

### Pricing Models

1. **One-time Purchase**: Full course access forever
2. **Subscription**: Monthly/yearly recurring
3. **Pay-per-course**: Individual course purchases
4. **Freemium**: Free tier + premium features
5. **Cohort-based**: Time-limited access with group

### Indian Payment Methods

- UPI (PhonePe, GPay, Paytm)
- Credit/Debit Cards
- Net Banking
- Wallets
- EMI (Bajaj, Cardless)

### Pricing Psychology

- ₹999 vs ₹1000 (charm pricing)
- Show original price with discount
- Limited time offers (countdown)
- Bundle discounts
- Early bird pricing

---

## 🔒 Security & Privacy

### Student Data Protection

- Encrypt PII at rest
- HTTPS everywhere
- Session management
- Rate limiting
- Input validation

### Content Protection

- Video DRM (Widevine, FairPlay)
- Watermarking (user ID overlay)
- Download restrictions
- Screen recording detection
- Device limits

### Compliance

- Privacy policy
- Terms of service
- Cookie consent
- Data export (GDPR-style)
- Account deletion

---

## 📱 Mobile Considerations

### PWA Features

- Offline content access
- Push notifications
- Add to home screen
- Background sync
- Camera access (for assignments)

### Performance Targets

- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Bundle size: <500KB initial
- Image lazy loading
- Code splitting by route

---

## 🔗 Integrations

### Common Integrations

| Service            | Purpose        |
| ------------------ | -------------- |
| Zoom/Meet          | Live classes   |
| YouTube            | Video hosting  |
| Razorpay/Stripe    | Payments       |
| SendGrid/Mailgun   | Email          |
| Twilio/Gupshup     | SMS/WhatsApp   |
| Sentry             | Error tracking |
| Mixpanel/Amplitude | Analytics      |
| Intercom/Freshchat | Support        |

### API Standards

- REST for simple CRUD
- GraphQL for complex queries
- WebSocket for real-time
- Webhooks for integrations
