# Admin/Counselor UI Checklist

Every dashboard page migrated to (or built on) the kit must satisfy all of
these. The kit lives in `src/components/admin/kit`; the fetch hook in
`src/hooks/useAdminResource.ts`.

1. **PageHeader** — title, one-line subtitle, and at most ONE primary action
   (blue-600). Secondary actions are outline/ghost. No hand-rolled `<h1>`
   blocks.
2. **Loading = skeleton** matching the final layout. NEVER mock data as a
   loading state (the old faculty page rendered three fake doctors while
   fetching — that class of bug is banned).
3. **Empty state** = icon + one sentence + a primary action when there is an
   obvious next step. **Error state** = message + Retry. No silent
   catch-and-keep-stale.
4. **Stats**: kit `StatCard` only, at most 4 per row. A stat without a real
   data source is REMOVED, not defaulted to a made-up number.
5. **Tables**: kit `DataTable` — sticky header, hover rows, contained
   horizontal scroll (`overflow-x-auto` inside the card; the page body never
   scrolls sideways). Below 768px prefer card layouts.
6. **Buttons**: one primary (blue-600) per view; destructive = red +
   confirmation modal; everything else outline/ghost.
7. **Colors** per `DESIGN_REFERENCE.md` — green-500, teal-600, blue-600,
   purple-700, yellow-800 accents; no cyan/pink/emerald.
8. **Typography/spacing**: page title `text-3xl font-bold`, section
   `text-lg font-semibold`, page padding `p-6`, grid gaps `gap-6`.
9. **Mobile**: sidebar is an overlay drawer (chrome handles it); touch
   targets ≥44px; no fixed-width inputs.
10. **No dark mode** (out of scope; do not half-implement it).
11. **No fake affordances**: every button has a working onClick or href;
    every badge/number comes from an API.

## Migration status

| Page                                                 | Status                                                            |
| ---------------------------------------------------- | ----------------------------------------------------------------- |
| /admin/payments (all statuses)                       | ✅ kit (Stage 7)                                                  |
| /admin/settings/\*                                   | ✅ built to spec (Stage 1/7)                                      |
| /admin (home)                                        | ✅ Stage 8                                                        |
| /admin/students/leads                                | ✅ Stage 8 (skeleton, color-tag rings; DataTable rebuild pending) |
| /admin/demo-bookings                                 | ✅ Stage 8                                                        |
| /counselor home, Kanban, detail                      | mostly compliant (rebuilt Jun–Jul 2026); polish opportunistically |
| long tail (gallery, groups, timetable, marketing/\*) | boy-scout rule — migrate on touch                                 |
