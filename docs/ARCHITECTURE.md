# App Structure

- `app/` Next.js routes (public + admin + API)
- `components/public` public UI components
- `components/admin` admin UI shells
- `components/agents` Grace Guide, Prayer Companion panels
- `lib/agents.ts` extensible recommendation/assistant module layer
- `prisma/schema.prisma` ministry operating system data models

## Component Map
- Shared: `SiteHeader`, `SiteFooter`
- Agents: `GraceGuidePanel`, `PrayerCompanionPanel`
- Admin: `AdminSidebar`
- Public screens: Home sectioned layout, page-specific cards/forms

## Workflow Map
### Reminders
1. Signup through reminder subscription form/API
2. Admin creates manual or automated reminders in Reminders Center
3. Dashboard surfaces due, upcoming, overdue items
4. Email/SMS channels are placeholder-ready in reminder model

### Events
1. Admin creates/edits featured events
2. Public event cards and detail pages expose RSVP + reminders
3. Registration records stored in `EventRegistration`
4. Post-event follow-up reminder can be generated in Reminders Center

### Prayer
1. Request enters queue via Prayer Requests page/API
2. Flags: public/private, urgent, follow-up
3. Admin Prayer Requests screen handles status assignment and follow-up
4. Reminder workflow can trigger care check-ins

### Donations
1. Public donate page highlights Venmo, Cash App, monthly partner options
2. Admin donations/funding screens manage links, causes, campaigns
3. Provision Agent panel suggests campaign/sponsorship opportunities
