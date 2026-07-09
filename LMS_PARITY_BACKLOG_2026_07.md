# LMS Parity Backlog — remaining LearnWorlds-gap items (Jul 9, 2026)

Source: owner's LW screenshot review + the ~80% parity scorecard. Items 1–2
(Article lessons, certificate verification) SHIPPED Jul 9. This plans 3–9.
Design rule: never copy LW's style — use our design system (emerald+amber,
CSS-first micro-interactions; Rive/Lottie/canvas-confetti for lively moments,
adopted during the student-dashboard P1 redesign).

## 3. Duplicate course / transfer content (S — next up)

- `POST /api/admin/courses/[id]/duplicate` — one transaction copies the course
  row (name + " (copy)", status DRAFT) + chapters + topics + material LINKS
  (same study_materials reused via new join rows? Materials carry courseId —
  so copy material rows for ARTICLE/TEST refs, RE-POINT uploads by reference:
  duplicate the study_materials rows but share fileUrl/videoLectureId — no
  file re-upload). "Transfer chapter to another course" = PATCH moving a
  chapter's courseId + materials' courseId.
- UI: "Duplicate" in the course workspace header menu; "Move to course…" on
  each chapter's editor.

## 4. Free-preview sections (S–M)

- `chapters.isFreePreview Boolean @default(false)` (additive).
- Enrollment API: locked-course visitors get preview chapters' topics +
  materials with entitlement bypassed ONLY for materials in preview chapters
  (accessLevel FREE at read time). Course page shows "Preview free" badge +
  a locked-state upsell for the rest.
- The try-before-buy hook for self-serve; pairs with the scholarship funnel.

## 5. Course completion → next-course offer (S)

- On 100% course progress (existing progress calc): completion card on the
  student course page — congratulations + certificate claim + ONE next-course
  offer (admin-configured: `courses.nextCourseId` + `nextCourseOfferText`,
  additive cols). Confetti moment (canvas-confetti).
- Pairs with the order-bump/checkout work in PLATFORM_VISION §3.6.

## 6. 1:1 / group mentor-session booking (M)

- NOT Calendly — reuse our demo-slot engine (demo_slots pattern) as
  `mentor_slots`: teacher publishes weekly slots; student books from the
  course page / dashboard ("Book a doubt session"); Zoom link auto-created
  (existing Zoom integration); reminders via the notification stack.
- Counts toward the P5 "chat with mentor" roadmap item.

## 7. Activity matrix (M)

- Teacher view: students × lessons grid per course (✓ done / ▣ in progress /
  · untouched) from material_progress + video_progress + test attempts.
  One API aggregation + a virtualized grid. Feeds "who's stuck where" —
  pairs with attendance follow-up (P6).

## 8. Audio + PPT lesson types (S)

- PPT: accept .ppt/.pptx in BulkUploader, convert to PDF server-side
  (libreoffice on a worker is heavy — pragmatic: reject with "export as PDF"
  message v1, or CloudConvert API if owner wants true conversion).
- Audio: accept .mp3/.m4a → store like PDFs, `materialType: LINK`? No — add
  AUDIO enum value + simple <audio> player row. Low priority.

## 9. AI course insights (M)

- "Ask about this course" box on the workspace Analytics tab: NL question →
  Claude over our own aggregates (enrollments, completion, drop-off, scores).
  Same pattern as the planned CRM NL-analytics (Wave 5.4) — build both on one
  helper.

## Suggested order

3 → 4 → 5 (each S, completes the authoring+selling story) → 7 → 6 → 9 → 8.
Interleave with PLATFORM_VISION Phase B growth work — growth outranks parity.
