# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Indonesian job seekers running an active job hunt — they apply to many roles and lose track of where each application stands. Secondary: startup-program reviewers (e.g. Claude for Startups) evaluating Huntboard as a real company site.

## Product Purpose

Huntboard is a job-search command center: it tracks every application through a visual pipeline from applied to offer, with search, filters, and private-by-design local storage. The landing page persuades visitors to open the tracker and (eventually) go Pro. Success = a visitor understands the product in one viewport and opens the tracker.

## Positioning

"Your job hunt, tracked automatically." Unlike manual spreadsheet/notes trackers, Huntboard is building toward an AI career copilot: Gmail + Google Calendar integrations, screenshot detection, and automatic detection of sent CVs / submitted applications. The automation vision is the differentiator; the tracker works fully today without it.

## Operating Context

Next.js 15 App Router, deployed on Vercel, served at ultah.biz.id (root) with www subdomain. Landing page at `/`, tracker at `/app`. Tracker persists to browser localStorage under the exact key `job-application-tracker:v1`. No backend, no accounts.

## Capabilities and Constraints

- Tracker (live today): add applications; pipeline stages Applied → Screening → Interview → Offer / Rejected; search and status filters; inline status updates; delete confirmation; local persistence.
- Free tier: Rp0 — manual tracker, visual pipeline, search/filters, local storage.
- Pro tier (concept, not yet purchasable): Rp49.000/month or Rp490.000/year — AI automations, smart follow-up reminders, priority support.
- AI capabilities (Gmail, Calendar, screenshot detection, auto-apply detection) are roadmap only and must always be badged coming-soon / in development. Never presented as shipped.
- Never invent testimonials, customer logos, user counts, revenue, traction, team members, email addresses, or contact information.
- Copy is English only; Bahasa Indonesia only for necessary local terms. Direct, no-fluff voice.

## Brand Commitments

Product name: Huntboard. This revamp replaces the previous warm-paper editorial identity with the "Mission Control" visual world in its light revision (bright control-room aesthetic — the user rejected the dark theme). No other binding visual constraints.

## Evidence on Hand

Live product: https://ultah.biz.id and https://www.ultah.biz.id (Vercel project job-application-tracker). Source: ~/workspace/job-application-tracker. GitHub: github.com/isnanfauziart/job-application-tracker.

## Product Principles

1. Private by design — user data stays in their browser; nothing to leak.
2. Honest roadmap — unreleased AI is always labeled coming-soon, never shipped.
3. Automation-first vision — the product's gravity pulls toward "the machine tracks it for you."
4. Indonesian market, IDR pricing — built for local job seekers first.

## Accessibility & Inclusion

No product-specific accessibility requirement established; follow standard web semantics and contrast discipline.
