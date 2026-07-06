# Simultaneous Multi-Teacher Zoom Classes — Plan (Jul 7, 2026)

Goal: N teachers teaching at the same time, embedded in our site. Verified against code: `src/lib/zoom/zoomService.ts` creates ALL meetings via `POST /users/${ZOOM_USER_ID}/meetings` (env, 'me' fallback) under one S2S OAuth app → 1 concurrent class today. Join is embedded via Meeting SDK signature (`/api/zoom/signature`). Recordings webhook (P3/merging) maps `host_id` → teacher via `users.profile.zoomUserId`.

## 1. How Zoom concurrency actually works

- **Concurrency is per USER (host), not per account.** Each Licensed user can host 1 meeting at a time on Pro; Licensed users on Business/Education/Enterprise can host up to 2 simultaneously. ([Zoom KB: hosting multiple meetings](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0068522))
- Starting a meeting beyond the user's limit ENDS the earlier meeting (on Business, a 3rd meeting kills the 1st; on Pro a 2nd start conflicts). This is exactly why our single-user setup breaks with 2 teachers.
- **Therefore: N simultaneous teachers = N Licensed users under ONE Zoom account.** Basic (free) users under a paid account can host only 40-minute, 1-concurrent meetings — not usable for classes.
- Alternative host is NOT a workaround for concurrency: the meeting still counts against the OWNING user's limit; alternative hosts must themselves be Licensed users on the same account.
- Participant caps per meeting: Pro 100, Business 300, Enterprise 500/1000; Large Meeting add-on (per-host, from ~$600/yr) raises a single host to 500/1000. ([participant limits](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0068002))

## 2. Recommended setup for us

**Plan: Zoom Workplace Pro, one license per simultaneously-teaching teacher.** Rationale: concurrency scales with licenses on ANY paid tier; Pro has no minimum (Business requires 10 licenses = ₹19,990/mo — overkill); batch sizes ≤100 fit Pro. Zoom Education is $1,800/yr for a 20-license minimum and eligibility targets schools/districts/higher-ed — a coaching academy likely fails eligibility; ask Zoom sales once, don't plan on it. ([education pricing](https://zoom.us/pricing/education), [eligibility](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0057649))

**License pooling/reassignment**: a license can be moved between users anytime (admin console or `PATCH /users/{userId} {"type": 2}`), so teachers on DIFFERENT shifts can share one license (reassign between morning/evening). Teachers at the SAME hour each need their own. Size licenses to peak simultaneous classes, not headcount.

**S2S OAuth (no new app needed — extend scopes)**:
- Meetings for any user: `POST /users/{zoomUserId}/meetings` — needs `meeting:write:admin` (granular: `meeting:write:meeting:admin`). Our existing token flow (`zoomService.getAccessToken`) is account-level and already supports this; only the hardcoded `this.userId` blocks it. ([S2S OAuth docs](https://developers.zoom.us/docs/internal-apps/s2s-oauth/))
- Add teachers to the account: `POST /users` (action `create` — invite email) and license assignment via `PATCH /users/{id}` — needs `user:write:admin`. Optional; owner can also do this in the console.
- Note: write scopes only appear in the S2S app's scope picker if the owner's admin role has "View and Edit" on Users/Meetings — known trip-up. ([devforum](https://devforum.zoom.us/t/cannot-access-write-scopes-meetingadmin-useradmin-for-server-to-server-oauth-app-only-read-scopes-visible/138073))

**Code changes (aligns with roadmap P3 per-teacher zoomUserId)**:
1. `zoomService.ts`: add `hostZoomUserId?: string` param to meeting creation; use `/users/${hostZoomUserId ?? this.userId}/meetings` (`zoomService.ts:192`). Demo bookings keep default user; class sessions pass the teacher's.
2. Teacher mapping: `users.profile.zoomUserId` (Json, no migration — same convention the recordings webhook already reads). Set via admin teacher-edit UI or a one-time script; validate with `GET /users/{id}`.
3. Session create (P3 optional Zoom auto-create): resolve teacher → zoomUserId → create meeting under that user; store meetingId + join_url on class_sessions. Fallback: manual meetingLink paste (already supported).
4. `/api/zoom/signature`: NO change needed — Meeting SDK signatures are per-meeting-number JWTs signed with the SDK app credentials; who hosts is irrelevant to the join signature. Embedded joins have no SDK-side concurrency limit (limits are per-meeting participant caps). Scales as-is.
5. **Fix the silent simulation fallback** (`zoomService.ts:203,210`): on API failure it fabricates fake zoom.us URLs that reach students. For class sessions, fail loudly (throw → surface in admin) instead of simulating.
6. Recordings pipeline: already per-teacher via host_id → no change; more teachers just means more webhook events.

## 3. Cost table (₹, Jul 2026 public pricing; Pro ₹1,376/mo monthly or ₹13,764/yr ≈ ₹1,147/mo)

| Simultaneous teachers | Licenses | Pro monthly-billed | Pro annual-billed | Business (10-min) |
|---|---|---|---|---|
| 2 | 2 | ₹2,752/mo | ₹27,528/yr (₹2,294/mo) | n/a (min 10) |
| 4 | 4 | ₹5,504/mo | ₹55,056/yr (₹4,588/mo) | n/a |
| 8 | 8 | ₹11,008/mo | ₹1,10,112/yr (₹9,176/mo) | ₹19,990/mo only if ≥300-student meetings needed |

**Meeting SDK vs Video SDK** (4 teachers × 2h/day × 26 days, ~50 students/class):
- Meeting SDK path (above): **₹5,504/mo** flat, unlimited minutes. SDK itself is free with the account.
- Video SDK: $0.0035/participant-minute ($3.50/1,000), 10,000 free min/mo. Our load = 4 × 120 min × 26 days × ~51 participants ≈ **636k participant-min/mo** → ~$2,190 ≈ **₹1.85L/mo** (free tier covers <2%). Credits model ($100/100 credits) doesn't change the order of magnitude. ([developer pricing](https://zoom.us/pricing/developer), [Video SDK pricing analysis](https://trtc.io/blog/details/zoom-video-sdk-pricing-2026))
- Verdict: **Video SDK is ~30× more expensive at class scale** and needs a full custom classroom rebuild (UI, recording, gallery, chat, breakouts — L/XL effort) plus its own recording storage costs. It buys white-labeling, nothing we need. Stay on Meeting SDK + per-host licenses. Revisit only if Zoom branding ever becomes a business problem.

## 4. Owner checklist (Zoom console → env → code)

1. **Buy licenses**: Zoom admin → Plans & Billing → add N-1 Pro licenses (you have 1). Annual billing saves ~17%.
2. **Create teacher users**: Admin → User Management → Add Users (their real emails, type Licensed). They accept invite, set password. (Or we automate via `POST /users` once `user:write:admin` is scoped.)
3. **S2S app scopes**: marketplace.zoom.us → your S2S OAuth app → Scopes → add `meeting:write:admin`, `user:read:admin` (+ `user:write:admin` if we automate user/license ops; `cloud_recording:read:admin` should already exist for the webhook). If write scopes don't appear, first give your admin role View+Edit on Users & Meetings.
4. **Collect zoomUserIds**: each teacher's userId/email from User Management (we'll store in users.profile.zoomUserId via admin UI/script).
5. **Recording settings** (account-level): keep auto_recording=cloud; enable "Delete cloud recordings after N days" — recommend 7-14 days since our pipeline copies to Cloudflare within hours (5 GB/license is POOLED account-wide: 4 licenses = 20 GB; 2h class ≈ 0.5-1 GB, so 8 classes/day without trimming would overflow in ~3-5 days). Trash keeps deleted recordings 30 days as a safety net. ([storage KB](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0067670))
6. **Per-teacher defaults**: waiting room ON for demo 1:1s, OFF for batch classes (join_before_host OFF + waiting room ON at 60 students = manual admit chaos; use "authenticated users" or passcode instead if needed).
7. **Env**: no new vars required for the core change (`ZOOM_ACCOUNT_ID/CLIENT_ID/CLIENT_SECRET` already set; `ZOOM_USER_ID` becomes the demo-booking default host only).
8. **Code**: ship §2 changes; test = create 2 sessions same time-slot under 2 teacher zoomUserIds, verify both meetings start and both embedded joins work simultaneously.

## 5. Gotchas

- **The killer rule**: same host starting a 2nd (Pro) or 3rd (Business) meeting silently ENDS the earlier one — today's single-user setup would drop Teacher A's live class the moment Teacher B starts. This is the current production risk, not a future one.
- Basic users under the paid account get 40-min caps — never schedule class sessions under an unlicensed teacher user; validate `type===2` when storing zoomUserId.
- Pro cap = 100 participants/meeting. Batches >95 students: either Business (300, 10-license min) or a Large Meeting add-on on just that teacher's license (~$600/yr). Webinars (500/1000) are one-way broadcast — wrong tool for interactive classes.
- License reassignment between shifts works but is manual/API-driven state; if a reassignment is forgotten, that teacher's meeting creation 400s. Keep a small buffer license if shifts overlap unpredictably.
- Cloud storage is pooled, fills fast at multi-class volume; auto-delete (checklist #5) only after confirming the CF pipeline marks copy-success (webhook should trim per-recording via `DELETE /meetings/{meetingId}/recordings` after CF upload — cleaner than blanket auto-delete; keep auto-delete as backstop).
- The recordings webhook download URL token expires — process promptly on receipt (pipeline already does uploadFromUrl on event).
- `zoomService.ts` simulation fallback (§2.5) currently masks API failures with fake join URLs — must not reach class sessions.
- S2S token is account-wide; one token cache (`zoomService.ts:58`) serves all teachers — no per-teacher auth needed. Rate limits are far above our volume.
- Zoom ToS: one login shared by multiple humans is prohibited; separate users per teacher (which we need anyway for concurrency + host_id recording attribution).

## Sources
[Concurrent meetings KB](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0068522) · [Participant limits](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0068002) · [Large Meeting license](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0065116) · [India pricing (Wise.live)](https://www.wise.live/blog/zoom-premium-prices-india/), [itforsme INR](https://www.itforsme.in/pricing/zoom-india/), [zoom.us/pricing](https://zoom.us/pricing) · [Education pricing](https://zoom.us/pricing/education) + [eligibility](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0057649) · [S2S OAuth](https://developers.zoom.us/docs/internal-apps/s2s-oauth/) + [scope visibility](https://devforum.zoom.us/t/cannot-access-write-scopes-meetingadmin-useradmin-for-server-to-server-oauth-app-only-read-scopes-visible/138073) · [Developer/Video SDK pricing](https://zoom.us/pricing/developer), [Video SDK cost analysis](https://trtc.io/blog/details/zoom-video-sdk-pricing-2026) · [Cloud storage](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0067670) + [usage limits](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060832)
