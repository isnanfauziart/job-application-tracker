# Huntboard

**The job-search command center.** Huntboard helps job seekers track every application through their pipeline — log it, move it through the stages, and walk into every interview knowing exactly where you stand.

🌐 **Live:** [huntboard](https://job-application-tracker-isnan-fauzi-s-projects.vercel.app) · **App:** [/app](https://job-application-tracker-isnan-fauzi-s-projects.vercel.app/app)

## What it does

- **Pipeline tracking** — log every application in seconds: company, role, date, posting link, notes.
- **Status funnel** — move applications through Applied → Screening → Interview → Offer, with Rejected as a separate terminal stage. Click any stage to filter.
- **Search & filters** — find any application instantly by company or role.
- **Private by design** — everything is stored in the browser's local storage. No servers, no tracking, no account.
- **Free, no account needed** — open the app and start logging.

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

The tracker is the foundation. In development:

- **AI-tailored resumes** — suggestions that tailor your resume to each job description
- **Smart follow-up reminders** — nudges when an application has gone quiet
- **Interview prep** — prep notes generated from the role and company you're interviewing with

## License

MIT — see [LICENSE](LICENSE) for details.
