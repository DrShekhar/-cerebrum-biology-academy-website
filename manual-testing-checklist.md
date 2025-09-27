# Manual Testing Checklist for Cerebrum Biology Academy Course Selector

## 🧪 Critical Functional Testing

### Course Selector Component (`FixedCourseSelector.tsx`)

#### Class Selection

- [ ] **Test 1**: Click on "All Classes" tab - should show general course overview
- [ ] **Test 2**: Click on "Class 9th" - should filter to show Foundation courses
- [ ] **Test 3**: Click on "Class 11th" - should show all 3 series (Pinnacle, Ascent, Pursuit)
- [ ] **Test 4**: Click on "Class 12th" - should show advanced courses
- [ ] **Test 5**: Click on "Dropper" - should show specialized dropper courses

#### Series Cards Display

- [ ] **Test 6**: Verify all 3 series cards are displayed when class is selected
- [ ] **Test 7**: Check Pinnacle series shows premium pricing and features
- [ ] **Test 8**: Check Ascent series shows "Most Popular" badge
- [ ] **Test 9**: Check Pursuit series shows foundation-level features

#### Plan Selection Within Series

- [ ] **Test 10**: Click Plan A button - verify UI updates and shows Plan A details
- [ ] **Test 11**: Click Plan B button - verify UI updates and shows Plan B details
- [ ] **Test 12**: Click Plan C button - verify UI updates and shows Plan C details
- [ ] **Test 13**: Verify price updates correctly when switching plans
- [ ] **Test 14**: Verify feature list updates when switching plans

#### Search Functionality

- [ ] **Test 15**: Type "biology" in search box - should show relevant results
- [ ] **Test 16**: Type invalid search - should show "no results" message
- [ ] **Test 17**: Clear search - should restore all courses

#### Demo Booking

- [ ] **Test 18**: Click "Book FREE Demo" button - should open demo modal
- [ ] **Test 19**: Fill demo form and submit - should show success message
- [ ] **Test 20**: Close demo modal - should return to course selector

### Enrollment Component (`StreamlinedEnrollmentPage.tsx`)

#### Multi-Step Flow

- [ ] **Test 21**: Complete Step 1 (Assessment) - should advance to Step 2
- [ ] **Test 22**: Select counseling slot - should advance to Step 3
- [ ] **Test 23**: Choose plan - should advance to Step 4 (enrollment form)
- [ ] **Test 24**: Complete enrollment - should show success page

#### Form Validation

- [ ] **Test 25**: Submit empty required fields - should show validation errors
- [ ] **Test 26**: Enter invalid email format - should show email validation error
- [ ] **Test 27**: Enter invalid phone number - should show phone validation error
- [ ] **Test 28**: Fill all required fields correctly - should allow submission

#### Payment Integration

- [ ] **Test 29**: Click "Secure Enrollment & Payment" - should initiate Razorpay
- [ ] **Test 30**: Test Razorpay integration with test credentials
- [ ] **Test 31**: Verify payment amount calculation is correct
- [ ] **Test 32**: Test payment failure handling

## 🎨 UI/UX Testing

### Responsive Design

- [ ] **Test 33**: Desktop (1920x1080) - all elements properly sized and aligned
- [ ] **Test 34**: Laptop (1366x768) - no horizontal scrolling, proper layout
- [ ] **Test 35**: Tablet (768x1024) - cards stack properly, touch-friendly
- [ ] **Test 36**: Mobile (375x667) - single column layout, readable text
- [ ] **Test 37**: Large mobile (414x896) - optimal use of space

### Animation & Interactions

- [ ] **Test 38**: Card hover effects work smoothly
- [ ] **Test 39**: Class tab switching animates properly
- [ ] **Test 40**: Modal open/close animations are smooth
- [ ] **Test 41**: Page transitions work without glitches
- [ ] **Test 42**: Loading states show appropriate spinners/skeletons

### Visual Design

- [ ] **Test 43**: Color scheme consistent across all components
- [ ] **Test 44**: Typography hierarchy clear and readable
- [ ] **Test 45**: Icons and images load properly
- [ ] **Test 46**: Spacing and padding consistent
- [ ] **Test 47**: Border radius and shadows consistent

## 🔍 Data Validation Testing

### Price Calculations

- [ ] **Test 48**: Plan A pricing displays correctly (₹42,000)
- [ ] **Test 49**: Plan B pricing displays correctly (₹75,000)
- [ ] **Test 50**: Plan C pricing displays correctly (₹125,000)
- [ ] **Test 51**: EMI calculations are accurate
- [ ] **Test 52**: Discount calculations are correct
- [ ] **Test 53**: Total amount calculation includes all fees

### Course Data Integrity

- [ ] **Test 54**: All course features display completely
- [ ] **Test 55**: Batch sizes are realistic and consistent
- [ ] **Test 56**: Duration information is accurate
- [ ] **Test 57**: Success rates and statistics are current
- [ ] **Test 58**: Faculty information is up to date

### Form Data Validation

- [ ] **Test 59**: Student name accepts only valid characters
- [ ] **Test 60**: Email validation follows RFC standards
- [ ] **Test 61**: Phone number accepts Indian format (+91)
- [ ] **Test 62**: Class selection validation works
- [ ] **Test 63**: Required field validation is comprehensive

## 🔗 Integration Testing

### Component Communication

- [ ] **Test 64**: Course selection passes data to enrollment
- [ ] **Test 65**: Plan selection updates enrollment summary
- [ ] **Test 66**: Demo booking integrates with course data
- [ ] **Test 67**: WhatsApp integration works with course context
- [ ] **Test 68**: Call integration passes correct information

### API Integration

- [ ] **Test 69**: Demo booking API creates entries correctly
- [ ] **Test 70**: Enrollment API stores complete data
- [ ] **Test 71**: Payment API integrates with Razorpay
- [ ] **Test 72**: WhatsApp API sends messages correctly
- [ ] **Test 73**: Analytics API tracks events properly

### State Management

- [ ] **Test 74**: Selected course persists across navigation
- [ ] **Test 75**: Form data persists between steps
- [ ] **Test 76**: User preferences are maintained
- [ ] **Test 77**: Shopping cart functionality works
- [ ] **Test 78**: Session state handles refresh properly

## ⚡ Performance Testing

### Loading Times

- [ ] **Test 79**: Initial page load under 3 seconds
- [ ] **Test 80**: Course filter response under 500ms
- [ ] **Test 81**: Plan switching response under 200ms
- [ ] **Test 82**: Search results appear under 300ms
- [ ] **Test 83**: Modal opening response under 100ms

### Bundle Size

- [ ] **Test 84**: JavaScript bundle under 250KB gzipped
- [ ] **Test 85**: CSS bundle under 50KB gzipped
- [ ] **Test 86**: Images optimized and compressed
- [ ] **Test 87**: Font loading doesn't block rendering
- [ ] **Test 88**: Third-party scripts load asynchronously

### Memory Usage

- [ ] **Test 89**: No memory leaks during navigation
- [ ] **Test 90**: Component unmounting cleans up properly
- [ ] **Test 91**: Event listeners are removed correctly
- [ ] **Test 92**: DOM nodes don't accumulate
- [ ] **Test 93**: Browser memory stable during use

## 🔒 Security Testing

### Input Validation

- [ ] **Test 94**: XSS attempts in form fields are blocked
- [ ] **Test 95**: SQL injection patterns are sanitized
- [ ] **Test 96**: File upload restrictions work properly
- [ ] **Test 97**: URL parameter validation prevents injection
- [ ] **Test 98**: JSON payload validation is comprehensive

### Authentication & Authorization

- [ ] **Test 99**: Unauthenticated users can browse courses
- [ ] **Test 100**: Payment requires proper authentication
- [ ] **Test 101**: Admin routes are properly protected
- [ ] **Test 102**: Session handling is secure
- [ ] **Test 103**: CSRF protection is implemented

### Data Protection

- [ ] **Test 104**: Personal data is encrypted at rest
- [ ] **Test 105**: Payment data uses proper encryption
- [ ] **Test 106**: HTTPS is enforced for all transactions
- [ ] **Test 107**: Sensitive data not logged in console
- [ ] **Test 108**: Environment variables properly secured

## ♿ Accessibility Testing

### Keyboard Navigation

- [ ] **Test 109**: Tab order is logical and complete
- [ ] **Test 110**: All interactive elements are keyboard accessible
- [ ] **Test 111**: Escape key closes modals
- [ ] **Test 112**: Enter key activates buttons
- [ ] **Test 113**: Arrow keys navigate between options

### Screen Reader Compatibility

- [ ] **Test 114**: All images have appropriate alt text
- [ ] **Test 115**: Form labels are properly associated
- [ ] **Test 116**: ARIA labels describe interactive elements
- [ ] **Test 117**: Role attributes are used correctly
- [ ] **Test 118**: Status messages are announced

### Visual Accessibility

- [ ] **Test 119**: Color contrast meets WCAG AA standards
- [ ] **Test 120**: Text remains readable at 200% zoom
- [ ] **Test 121**: Focus indicators are clearly visible
- [ ] **Test 122**: No information conveyed by color alone
- [ ] **Test 123**: Reduced motion settings are respected

## 🌐 Cross-Browser Testing

### Desktop Browsers

- [ ] **Test 124**: Chrome (latest) - full functionality
- [ ] **Test 125**: Firefox (latest) - full functionality
- [ ] **Test 126**: Safari (latest) - full functionality
- [ ] **Test 127**: Edge (latest) - full functionality
- [ ] **Test 128**: Chrome (1 version back) - compatibility

### Mobile Browsers

- [ ] **Test 129**: Mobile Chrome - touch interactions work
- [ ] **Test 130**: Mobile Safari - iOS specific features
- [ ] **Test 131**: Mobile Firefox - Android compatibility
- [ ] **Test 132**: Samsung Internet - Samsung device testing
- [ ] **Test 133**: Opera Mobile - alternative browser testing

### Feature Support

- [ ] **Test 134**: CSS Grid support across browsers
- [ ] **Test 135**: Flexbox implementation consistent
- [ ] **Test 136**: Custom properties (CSS variables) work
- [ ] **Test 137**: ES6+ features supported or polyfilled
- [ ] **Test 138**: Touch events properly handled

## 🎯 User Experience Testing

### User Journey Testing

- [ ] **Test 139**: New user can find suitable course in under 2 minutes
- [ ] **Test 140**: Course comparison is intuitive and helpful
- [ ] **Test 141**: Enrollment process feels streamlined
- [ ] **Test 142**: Payment process builds confidence
- [ ] **Test 143**: Success confirmation is clear and actionable

### Error Handling

- [ ] **Test 144**: Network errors show helpful messages
- [ ] **Test 145**: Form errors are specific and actionable
- [ ] **Test 146**: Payment failures provide next steps
- [ ] **Test 147**: 404 pages guide users back to content
- [ ] **Test 148**: Server errors don't break the experience

### Content Quality

- [ ] **Test 149**: Course descriptions are accurate and compelling
- [ ] **Test 150**: Pricing information is clear and complete
- [ ] **Test 151**: Faculty profiles inspire confidence
- [ ] **Test 152**: Success stories are credible
- [ ] **Test 153**: Contact information is easily accessible

---

## 📊 Test Execution Summary

**Total Tests**: 153
**Critical Tests**: 48 (Tests 1-48)
**UI/UX Tests**: 21 (Tests 33-53)
**Integration Tests**: 15 (Tests 64-78)
**Performance Tests**: 15 (Tests 79-93)
**Security Tests**: 15 (Tests 94-108)
**Accessibility Tests**: 15 (Tests 109-123)
**Cross-browser Tests**: 15 (Tests 124-138)
**UX Tests**: 15 (Tests 139-153)

## 🎯 Success Criteria

**Production Ready**: Minimum 90% pass rate on critical tests (Tests 1-48)
**Quality Gate**: Minimum 85% overall pass rate
**Accessibility Gate**: 100% pass rate on accessibility tests
**Security Gate**: 100% pass rate on security tests
**Performance Gate**: All performance benchmarks met

## 🚀 Test Environment Setup

1. **Local Development**: `npm run dev`
2. **Staging Environment**: Deploy to Vercel preview
3. **Production Simulation**: `npm run build && npm run start`
4. **Mobile Testing**: Use Chrome DevTools device simulation
5. **Accessibility Testing**: Use aXe browser extension
6. **Performance Testing**: Use Lighthouse in Chrome DevTools

---

_This checklist should be executed by QA team before any production deployment._
