# Huntboard

**AI-powered job tracking for Indonesian job seekers.** Huntboard's AI watches your Gmail, Google Calendar, and screenshots — every application, interview, and follow-up logged automatically. Free to start, with a Pro tier for the full automation suite.

🌐 **Live:** [huntboard](https://job-application-tracker-isnan-fauzi-s-projects.vercel.app) · **App:** [/app](https://job-application-tracker-isnan-fauzi-s-projects.vercel.app/app)

## What it does

**Live today (free):**
- **Pipeline tracking** — log every application in seconds: company, role, date, posting link, notes.
- **Status funnel** — move applications through Applied → Screening → Interview → Offer, with Rejected as a separate terminal stage. Click any stage to filter.
- **Search & filters** — find any application instantly by company or role.
- **Private by design** — the free tracker stores everything in the browser's local storage. No servers, no tracking, no account.

**Pro — coming soon:**
- **Gmail integration** — AI reads application emails and creates/updates entries automatically (read-only, revocable).
- **Google Calendar sync** — interviews land on your timeline and flow into the right application.
- **Screenshot detection** — screenshot any job posting; AI extracts company, role, and source.
- **Auto-apply tracking** — detects sent CVs and submitted applications across portals.
- **Smart follow-up reminders** — nudges before warm leads go cold.

## Pricing (IDR)

| | Free | Pro |
|---|---|---|
| Price | Rp0 | Rp49.000/month or Rp490.000/year |
| Manual application tracking | ✓ | ✓ |
| Visual pipeline, search & filters | ✓ | ✓ |
| AI automation suite (Gmail, Calendar, screenshots, auto-apply) | – | ✓ (coming soon) |
| Smart follow-up reminders | – | ✓ (coming soon) |
| Priority support | – | ✓ (coming soon) |

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19
- Custom CSS design system — editorial "paper" aesthetic (Playfair Display + Inter), zero UI dependencies
- `localStorage` persistence (`job-application-tracker:v1`) — no backend
- Deployed on [Vercel](https://vercel.com/), auto-deploys from `main`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The marketing site is at `/`, the tracker app at `/app`.

## Deploy

Push to the `main` branch — the linked Vercel project builds and deploys automatically. No extra configuration needed.

## Roadmap

- **Phase 01 — Huntboard Pro (up next):** the AI automation suite — Gmail integration, Google Calendar sync, screenshot detection, auto-apply tracking, plus smart follow-up reminders.
- **Phase 02:** AI-tailored resumes — your resume tuned to each job description.
- **Phase 03:** Interview prep — prep notes generated from the role and company.

## License

MIT — see [LICENSE](LICENSE) for details.
