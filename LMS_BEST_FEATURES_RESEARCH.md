# LMS Best-Feature Research vs Our Stack (Jul 6, 2026)

Research inputs: Physics Wallah, Allen Digital, Aakash BYJU'S, Unacademy, Vedantu (Indian NEET market); Khan Academy/Khanmigo, Canvas, Google Classroom, Coursera, Duolingo (global patterns). Compared against `STUDENT_DASHBOARD_ROADMAP.md` inventory. Sources at bottom.

## 1. Feature Landscape by Category

### Learning delivery
| Feature | Best-in-class | What it is |
|---|---|---|
| Recorded lecture library w/ progress | Allen Digital | Every live class auto-recorded, appears in course library same day, resume-where-left |
| Offline downloads | Physics Wallah | Download lectures/notes in-app for low-bandwidth students |
| NCERT-anchored content ("Pitara") | Physics Wallah | Chapter-wise NCERT mastery track: read → video solution → quiz per NCERT paragraph |
| PYQ Hub | Physics Wallah | Chapter-wise previous-year questions with teacher video explanations |
| Regional-language mirrors | Physics Wallah | Same course in Hindi/Hinglish + regional languages (Microsoft AI partnership) |
| Sequential mastery paths | Canvas (MasteryPaths) / Khan Academy | Pre-assessment gates content; prerequisites enforced; mastery % per skill |

### Live classes
| Feature | Best-in-class | What it is |
|---|---|---|
| Live + instant recording + notes bundle | Allen / PW | Join live → recording + class notes PDF auto-posted within hours |
| Real-time in-class polls/doubts | Vedantu (WAVE) | Teacher sees live quiz responses, hotseat, engagement meter during class |
| 1-to-1 / small-group tutoring tier | Vedantu | Premium personal-mentor sessions layered on group courses |
| Live doubt counters (human, long hours) | PW Saarthi | Video-call doubt desks 10am–2am; also non-academic mentoring (timetable, motivation) |

### Practice & assessment
| Feature | Best-in-class | What it is |
|---|---|---|
| Massive filtered question bank | Allen (2L+ questions) | Chapter/difficulty/PYQ filters, step solutions |
| NTA-interface CBT mocks + All-India test series | Unacademy / Allen | Full-length mocks on exam-identical UI with AIR percentile across all test-takers |
| Improvement Booklet (mistake notebook) | Allen | Auto-compiled booklet of YOUR wrong answers, re-served until mastered |
| Flashcards + smart revision | Allen | Spaced flashcards generated from syllabus + student errors |
| Adaptive quizzes | PW (AI Quizzes) | Question difficulty adapts to speed + accuracy in-session |
| DPP (daily practice problems) | Aakash | Small daily problem sets tied to yesterday's class |

### Analytics & AI personalization
| Feature | Best-in-class | What it is |
|---|---|---|
| AI tutor that guides, not answers | Khanmigo | Socratic hints on any exercise, knows student's mastery state + prerequisites |
| Photo-upload doubt solver | PW AI Guru | Snap textbook/problem photo → instant explanation + linked teacher video, 24/7 |
| Post-test deep analysis | Aakash / Allen | Where marks were lost: silly errors vs concept gaps vs unattempted; time-per-question |
| Rank/college predictor | Allen / Aakash / PW | Mock or NEET score → predicted AIR band + eligible college list |
| Predictive at-risk alerts | 2026 LMS trend (Canvas ecosystem) | Inactivity/decline patterns flag dropout risk weeks ahead → human outreach |
| Personalized study schedule | Allen AI companion | Auto weekly plan from syllabus position + weak areas + days to exam |
| Class Snapshot for teachers | Khanmigo | AI summary of what the class struggled with + grouping suggestions |

### Engagement & gamification
| Feature | Best-in-class | What it is |
|---|---|---|
| Streaks + streak freeze | Duolingo | #1 DAU lever; freeze protects a missed day (+48% streak longevity) |
| Weekly leagues (XP leaderboards) | Duolingo | 7-day XP cohorts w/ promotion/demotion; +40% engagement |
| Daily challenge + quests | Duolingo / PW | One bite-size daily task; time-limited events |
| Badges: personal records + awards | Duolingo | Two-track achievements (self-improvement + milestones) |
| Friend/peer mechanics | Duolingo | Friend streaks, challenges — social accountability |

### Parent engagement
| Feature | Best-in-class | What it is |
|---|---|---|
| Dedicated parent app/dashboard | PW Parent App | Attendance, lecture progress, DPP completion, test stats per child; multi-child |
| Daily attendance alerts | PW / Allen | SMS/WhatsApp ping when child misses class |
| Weekly performance report push | PW | Auto report: attendance + test scores + progress delta, sent to parent |
| Announcements hub | PW Parent App | Upcoming tests/PTM/events so parents don't rely on the child |
| Fee/purchase transparency | PW Parent App | All payments + dues visible to parent |

### Teacher tooling
| Feature | Best-in-class | What it is |
|---|---|---|
| Fast grading (SpeedGrader) | Canvas | One-screen submission → rubric → grade → feedback loop |
| Item analysis on quizzes | Canvas | Per-question difficulty/discrimination stats after each test |
| AI lesson/rubric/exit-ticket generation | Khanmigo | Standards-aligned artifacts generated from content library |
| Assignment simplicity | Google Classroom | Create-distribute-collect-grade in minutes, zero training |

### Communication
| Feature | Best-in-class | What it is |
|---|---|---|
| WhatsApp-first updates | Indian coaching norm | Reports, alerts, fee reminders as individual WA template sends |
| In-app notices + push | Allen / PW | Centralized announcements mirrored to app + parent channel |
| Two-way doubt/DM inbox | Unacademy | Student ↔ educator threads attached to courses |

## 2. Gap Table vs Our Stack (per roadmap inventory)

| Capability | Status | Evidence (roadmap §) |
|---|---|---|
| Secure video playback + progress + in-video quiz | HAVE | Cloudflare stack, `/learn/[lectureId]` (§A) |
| Student video LIBRARY (browse all my videos) | MISSING | Build item 2 — no list endpoint |
| Live-class schedule + join | PARTIAL | API + widget real, but mounted only on /student/attendance; dashboards hardcoded (§A) |
| Class recordings auto-pipeline | MISSING | Build item 1 — nothing writes recordingUrl |
| NTA-style CBT mocks + resume + review | HAVE | `/cbt`, `api/cbt/attempts` (§A) |
| AI post-test feedback | HAVE (v1) | CBT AI Coach (Jul 6) — single-test scope, no time/error-type breakdown |
| MCQ bank w/ NCERT class/chapter/difficulty/PYQ filters | HAVE | 10,133 Qs, `api/mcq/*` (§A) |
| Spaced repetition | HAVE (v1) | SpacedReviewWidget — not auto-fed from CBT mistakes |
| Mistake notebook / Improvement Booklet | MISSING | No auto wrong-answer compilation across CBT+MCQ |
| Adaptive question selection (weak-topic aware) | MISSING | Filters are manual; no difficulty adaptation |
| Topic mastery / strengths / weaknesses / percentile | HAVE | `analytics/performance`, `analytics/comparative`, `progress/[userId]` (§A) |
| Readiness meter, study heatmap | HAVE | NEETReadinessMeter, StudyHeatmap (§A) |
| Rank/college predictor | MISSING | tools-registry points to non-existent routes |
| XP / streaks / badges / goals | HAVE | gamification stack + goals real (§A) |
| Streak freeze, weekly leagues | MISSING | No freeze; no cohort leaderboard |
| Daily challenge | HAVE | DailyChallengeCard (§A) |
| Homework: assign → submit → grade → feedback | PARTIAL | Assignments loop FULL; worksheet + test-assignment teacher feedback write paths missing (§A gotchas) |
| Unified feedback feed | MISSING | Build item 4 |
| Materials w/ access gating + tracking | HAVE | study_materials + gates (§A); per-student/group assignment = build item 3/§F |
| Groups/batches + assign content to group | PLANNED | §F design, not built |
| AI doubt chat | HAVE (v1) | CERI/ARIA real Anthropic API — text only, not mastery-aware, no photo upload |
| Human doubt desk / mentor hours | MISSING | No scheduled doubt slots product |
| Parent dashboard (attendance/homework/tests) | HAVE | real per-child (§A) |
| Parent WhatsApp broadcast + weekly report | PLANNED | §F broadcast-list design; W5 sender built; report generation not built |
| Predictive at-risk alerts → CRM | MISSING | No inactivity/decline triggers (CRM + upsertLead exist to receive them) |
| Personalized study plan | MISSING | study_plans model is an orphan (§A) |
| Teacher item analysis / class snapshot | MISSING | No per-question stats or AI class summary |
| Offline / low-bandwidth mode | MISSING | Web-only; no downloads (CF Stream signed URLs complicate this) |
| Regional language content | MISSING | English only |
| Profile photo / student identity | MISSING | Build item 5 |

## 3. Top-10 Recommendations for Cerebrum (NEET, WhatsApp-heavy parents)

Ordered by impact-per-effort; each leverages existing infra. Effort: S ≤1 day, M = 2-4 days, L = 1-2 wks.

1. **Mistake Notebook (auto Improvement Booklet)** — S/M. Compile every wrong CBT + MCQ answer into a per-student "My Mistakes" deck; feed SpacedReviewWidget from it and re-serve until 2× correct. Allen's most-loved feature; we already store every attempt. Highest learning-outcome ROI in this list.
2. **Weekly parent report via WhatsApp** — M. Cron composes per-child summary (attendance, tests taken, avg score delta, streak, due homework) from existing parent-dashboard queries → individual template sends via W5 sender + NoticeBoard mirror (§F design). This is THE differentiator for Indian parents; no code dependency missing except the composer.
3. **Post-mock deep analysis v2** — S. Extend the CBT AI Coach: classify each wrong answer (silly error / concept gap / unattempted), time-per-question vs topper pace, chapter-wise marks-lost table. Data already captured per attempt; it's a prompt + report layout.
4. **Streak freeze + weekly Biology League** — S/M. Add freeze item (XP-purchasable) to existing streak; weekly XP leaderboard in cohorts of ~20 from existing XP history. Duolingo-verified +40-48% engagement; our gamification tables already hold everything needed.
5. **NEET rank predictor from mocks** — S/M. Static marks→AIR mapping table (NTA published anchors) applied to CBT full-mock scores; show predicted AIR band + trend on Mock Tests tab. Fixes the advertised-but-missing tools-registry route; every big competitor has it; strong retention + lead magnet.
6. **Adaptive Daily Challenge** — M. DailyChallengeCard picks from weakest topics (`analytics/performance`) at difficulty near student's rolling accuracy, mixing in due spaced-review items. Converts existing widgets from generic to personalized — the single biggest "AI personalization" perception win.
7. **At-risk early-warning → CRM task** — M. Nightly job flags enrolled students with N-day inactivity or score decline → creates counselor Task (subsystem fixed Jun 12) + optional parent WA nudge. Retention protection; reuses CRM/task/WhatsApp rails entirely.
8. **Recordings pipeline + video library** — M/L. Already build items 1-2 (Zoom webhook → `cloudflareStreamService.uploadFromUrl` → video_lectures). Elevated here because "missed class → watch recording same day" is table stakes at Allen/PW and our video stack is 90% built.
9. **NCERT syllabus mastery map** — M. Visual chapter grid (Class 11/12 units) colored by mastery from `progress/[userId]` + question coverage; tap → deep-link to Practice tab pre-filtered. NEET is NCERT-gospel; makes 10k-question bank feel like a guided course, not a pile.
10. **ARIA doubt solver upgrades: photo upload + mastery context** — M. Add image input (Anthropic vision) and inject `getStudentContext` + weak topics into the system prompt so answers are Socratic and grade-aware (Khanmigo pattern, PW AI Guru parity). Reuses existing ARIA route.

**Deliberately deferred**: offline downloads (conflicts with signed-URL DRM; low ROI for L effort), regional languages (content op, not code), 1-to-1 tutoring tier (business model change), live in-class polls (needs Zoom app work), friend mechanics (needs critical mass of students).

## Sources
PW: [Saarthi](https://getwhats.net/pw-saarthi-doubt-solving-engine-jee-neet/), [Play Store](https://play.google.com/store/apps/details?id=xyz.penpencil.physicswala), [Microsoft AI tutoring](https://www.microsoft.com/en-us/research/blog/microsoft-research-and-physics-wallah-team-up-to-enhance-ai-based-tutoring/), [Parent App](https://apps.apple.com/in/app/pw-parent-app/id6478144871) · Allen: [allen.in](https://allen.in/), [Top 5 features](https://www.thehansindia.com/life-style/top-5-features-of-allen-digitals-jeeneet-coaching-that-make-it-ideal-for-students-917331), [Rank predictor](https://allen.in/neet-rank-predictor) · Aakash: [JEE/NEET app](https://www.aakash.ac.in/jee-neet-app/), [Rank predictor](https://www.aakash.ac.in/neet-rank-college-predictor) · [Unacademy vs Vedantu (AcademyCheck)](https://academycheck.com/blog/top-online-neet-coaching-for-neet-2025), [Vedantu](https://www.vedantu.com/) · [Khanmigo](https://www.khanmigo.ai/), [Khanmigo teachers](https://www.khanmigo.ai/teachers) · Duolingo: [Trophy case study](https://trophy.so/blog/duolingo-gamification-case-study), [Deconstructor of Fun](https://www.deconstructoroffun.com/blog/2025/4/14/duolingo-how-the-15b-app-uses-gaming-principles-to-supercharge-dau-growth), [StriveCloud](https://www.strivecloud.io/blog/gamification-examples-boost-user-retention-duolingo) · Canvas/GC: [SoftwareFinder](https://softwarefinder.com/resources/canvas-lms-vs-google-classroom), [group.app](https://www.group.app/blog/canvas-vs-google-classroom/) · Trends: [Emerline EdTech 2026](https://emerline.com/blog/edtech-trends), [Devox adaptive 2026](https://devoxsoftware.com/blog/the-next-wave-of-adaptive-learning-and-strategic-roadmap-2026/)
