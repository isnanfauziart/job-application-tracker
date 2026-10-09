import Link from 'next/link';
import {
  BriefcaseIcon,
  SearchIcon,
  CheckIcon,
  TargetIcon,
  InboxIcon,
  CalendarIcon,
  ChevronRightIcon,
  ExternalIcon,
  SparkIcon,
  ImageIcon,
  CrosshairIcon,
} from './components/icons';
import Pricing from './components/Pricing';

const GITHUB_URL = 'https://github.com/isnanfauziart/job-application-tracker';

const LIVE_FEATURES = [
  {
    icon: <BriefcaseIcon />,
    title: 'Pipeline tracking',
    body: 'Log every application in seconds — company, role, date, posting link, notes. Your entire hunt lives in one place instead of scattered tabs and spreadsheets.',
  },
  {
    icon: <TargetIcon />,
    title: 'A funnel, not a list',
    body: 'Move applications through Applied → Screening → Interview → Offer. The pipeline overview shows exactly where your momentum is — and where it stalled.',
  },
  {
    icon: <SearchIcon />,
    title: 'Search & filters',
    body: 'Find any application instantly. Filter by stage with one click, or search across companies and roles.',
  },
  {
    icon: <InboxIcon />,
    title: 'Private by design',
    body: 'The free tracker stores everything in your browser\u2019s local storage. No servers, no tracking, no data leaving your device — your job search stays yours.',
  },
  {
    icon: <CheckIcon />,
    title: 'No account needed',
    body: 'Open the app and start logging. Nothing to sign up for, nothing to configure, nothing to forget the password to.',
  },
];

const PILLARS = [
  {
    icon: <InboxIcon />,
    title: 'Gmail integration',
    body: 'Huntboard reads your application emails — confirmations, interview invites, rejections — and creates or updates entries automatically. Read-only access you grant and can revoke anytime.',
  },
  {
    icon: <CalendarIcon />,
    title: 'Google Calendar sync',
    body: 'Interviews land on your timeline the moment they\u2019re scheduled. Dates, times, and meeting links flow straight into the right application.',
  },
  {
    icon: <ImageIcon />,
    title: 'Screenshot detection',
    body: 'Screenshot any job posting and Huntboard extracts the company, role, and source — a new entry appears on your board, no typing.',
  },
  {
    icon: <TargetIcon />,
    title: 'Auto-apply tracking',
    body: 'Hit apply anywhere — job portals, company sites, email. Huntboard detects sent CVs and submitted applications and logs them for you.',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Connect',
    body: 'Link Gmail and Google Calendar. Huntboard gets read-only access — granted by you, revocable anytime.',
  },
  {
    n: '02',
    title: 'Hunt as usual',
    body: 'Apply anywhere: job portals, company sites, email. AI detects applications, interviews, and follow-ups, and logs them to your board.',
  },
  {
    n: '03',
    title: 'Stay on autopilot',
    body: 'Your pipeline updates itself as replies come in, and smart reminders nudge you before warm leads go cold.',
  },
];

const PHASES = [
  {
    phase: 'Phase 01',
    badge: 'Up next',
    title: 'Huntboard Pro — the automation suite',
    body: 'Gmail integration, Google Calendar sync, screenshot detection, and auto-apply tracking launch together, with smart follow-up reminders on top.',
  },
  {
    phase: 'Phase 02',
    badge: 'On the roadmap',
    title: 'AI-tailored resumes',
    body: 'Your resume tuned to each job description, so every application speaks the employer\u2019s language.',
  },
  {
    phase: 'Phase 03',
    badge: 'On the roadmap',
    title: 'Interview prep',
    body: 'Prep notes generated from the role and company, drawn from what Huntboard already knows about your hunt.',
  },
];

const FAQS = [
  {
    q: 'Is my data private?',
    a: 'Yes. The free tracker stores everything in your browser\u2019s local storage — your applications are never sent to a server. Pro\u2019s AI features will process only the job-related emails and events you explicitly connect, and never sell or share your data.',
  },
  {
    q: 'How much does Huntboard cost?',
    a: 'Free to start: the complete manual tracker costs Rp0, no account needed. Pro is Rp49.000/month or Rp490.000/year and adds the full AI automation suite — it launches soon.',
  },
  {
    q: 'When do the AI features launch?',
    a: 'They\u2019re in active development right now. The manual tracker is live today and free; Pro — with Gmail, Calendar, screenshot detection, and auto-apply tracking — launches next. Start free now and you\u2019ll be first in line.',
  },
  {
    q: 'How does the Gmail integration handle my privacy?',
    a: 'Read-only access that you grant when connecting, and you can revoke it anytime from your Google account settings. Huntboard only processes job-related mail — applications, interview invites, follow-ups — and ignores everything else.',
  },
  {
    q: 'Do I need an account?',
    a: 'Not for the free tracker — open the app and start logging immediately. Pro\u2019s AI features will connect through your Google account, which you can disconnect anytime.',
  },
  {
    q: 'Can I cancel Pro anytime?',
    a: 'Yes. Cancel in one click — no emails, no retention calls. You keep Pro until the end of your billing period.',
  },
];

/* Synthetic telemetry for the hero strip — illustrative preview, not real data. */
const DEMO_STAGES = [
  { label: 'Applied', count: 12, pct: 60, sc: 'var(--st-applied)' },
  { label: 'Screening', count: 4, pct: 20, sc: 'var(--st-screening)' },
  { label: 'Interview', count: 3, pct: 15, sc: 'var(--st-interview)' },
  { label: 'Offer', count: 1, pct: 5, sc: 'var(--st-offer)' },
  { label: 'Rejected', count: 2, pct: 9, sc: 'var(--st-rejected)', terminal: true },
];

const AI_CHIPS = [
  { icon: <InboxIcon />, label: 'Gmail' },
  { icon: <CalendarIcon />, label: 'Calendar' },
  { icon: <ImageIcon />, label: 'Screenshots' },
];

function TelemetryDemo() {
  return (
    <div>
      <div className="telemetry" aria-label="Pipeline preview">
        <div className="telemetry-head">
          <span className="micro">
            <span className="live-dot" aria-hidden="true" />
            Pipeline // automation preview
          </span>
          <span className="tm-stamp" aria-hidden="true">
            SYNTHETIC DATA
          </span>
        </div>
        <div className="telemetry-inner">
          {DEMO_STAGES.map((s, i) => (
            <div
              key={s.label}
              className={
                'tm-cluster' +
                (s.terminal ? ' tm-terminal' : '') +
                (s.label === 'Interview' ? ' tm-hot' : '')
              }
              style={{ '--i': i, '--sc': s.sc, '--w': `${s.pct}%` }}
            >
              <span className="tm-count">{s.count}</span>
              <span className="tm-label">
                <span className="swatch" aria-hidden="true" />
                {s.label}
                {s.label === 'Interview' && (
                  <span className="tm-beacon" aria-hidden="true" />
                )}
              </span>
              <span className="tm-conv" aria-hidden="true">
                {s.pct}% {s.terminal ? 'OF TOTAL' : 'OF ACTIVE'}
              </span>
              <span className="tm-bar" aria-hidden="true">
                <i />
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="telemetry-cap">
        Illustrative preview — your board, filled by AI
      </p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="lp">
      {/* ————— command bar nav ————— */}
      <header className="lp-nav">
        <div className="lp-nav-inner">
          <Link href="/" className="lp-brand" aria-label="Huntboard home">
            <CrosshairIcon />
            Huntboard
          </Link>
          <span className="lp-sys" aria-hidden="true">
            <i />
            Sys·Online
          </span>
          <nav className="lp-links" aria-label="Sections">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#faq">FAQ</a>
          </nav>
          <Link href="/app" className="lp-cta">
            Launch tracker
          </Link>
        </div>
      </header>

      {/* ————— hero ————— */}
      <section className="lp-hero">
        <div className="lp-hero-copy">
          <h1 className="display">
            Your job hunt, <span className="hl">tracked automatically.</span>
          </h1>
          <p className="lp-lede">
            Huntboard&rsquo;s AI watches your Gmail, Google Calendar, and
            screenshots — every application, interview, and follow-up logged
            without manual entry. Built for Indonesian job seekers who would
            rather land interviews than maintain spreadsheets.
          </p>
          <div className="lp-cta-row">
            <Link href="/app" className="btn-amber">
              Start tracking free
            </Link>
            <a href="#how-it-works" className="lp-cta-secondary">
              See how it works
            </a>
          </div>
          <p className="lp-trust">
            Free to start · No account needed · Cancel Pro anytime
          </p>
        </div>

        <TelemetryDemo />

        <div className="ai-chips" aria-label="AI automation pillars">
          {AI_CHIPS.map((c, i) => (
            <span key={c.label} className="ai-chip" style={{ '--i': i }}>
              {c.icon}
              <span className="listen-dot" aria-hidden="true" />
              {c.label}
              <span className="tag-soon">Coming soon</span>
            </span>
          ))}
        </div>
      </section>

      {/* ————— features ————— */}
      <section className="lp-section" id="features" aria-labelledby="features-h">
        <h2 id="features-h" className="display">
          Live today. <span className="hl">Automating tomorrow.</span>
        </h2>
        <p className="lp-section-sub">
          The manual tracker is live and free right now. The AI automation
          suite is in development and launches as Huntboard Pro.
        </p>

        <div className="spec-block">
          <div className="spec-block-head">
            <span className="micro live">
              <span className="live-dot" aria-hidden="true" />
              Systems // online
            </span>
            <span className="tm-stamp" aria-hidden="true">
              05 MODULES
            </span>
          </div>
          {LIVE_FEATURES.map((f, i) => (
            <div key={f.title} className="spec-row">
              <span className="spec-idx" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="spec-icon" aria-hidden="true">
                {f.icon}
              </span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
        <Link href="/app" className="lp-text-link">
          Open the app <ChevronRightIcon />
        </Link>

        <div className="spec-block" style={{ marginTop: 56 }}>
          <div className="spec-block-head">
            <span className="micro soon">Modules // in development</span>
            <span className="tm-stamp" aria-hidden="true">
              04 INBOUND
            </span>
          </div>
          {PILLARS.map((p, i) => (
            <div key={p.title} className="spec-row dimmed">
              <span className="spec-idx" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="spec-icon" aria-hidden="true">
                {p.icon}
              </span>
              <div>
                <h3>
                  {p.title}
                  <span className="tag-soon">Coming soon</span>
                </h3>
                <p>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="lp-fineprint">
          Automation features are in development and not yet available. Start
          free today — Pro launches with the full suite.
        </p>
      </section>

      {/* ————— how it works ————— */}
      <section className="lp-section" id="how-it-works" aria-labelledby="hiw-h">
        <h2 id="hiw-h" className="display">
          Connect. Hunt. <span className="hl">Autopilot.</span>
        </h2>
        <div className="ops-steps">
          {STEPS.map((s, i) => (
            <article key={s.n} className="ops-step">
              <span className="seq" aria-hidden="true">
                SEQ {s.n}
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              {i < STEPS.length - 1 && (
                <span className="seq-arrow" aria-hidden="true">
                  <ChevronRightIcon />
                </span>
              )}
            </article>
          ))}
        </div>
        <p className="lp-fineprint">
          The automated flow above is in development — the manual tracker is
          live today and free.
        </p>
      </section>

      {/* ————— pricing ————— */}
      <section className="lp-section" id="pricing" aria-labelledby="pricing-h">
        <div className="lp-pricing-head">
          <h2 id="pricing-h" className="display">
            Simple pricing, <span className="hl">built for job seekers.</span>
          </h2>
          <p className="lp-section-sub">
            Start free. Upgrade when you&rsquo;re ready for the hunt to run
            itself.
          </p>
        </div>
        <Pricing />
      </section>

      {/* ————— roadmap ————— */}
      <section className="lp-section" id="roadmap" aria-labelledby="roadmap-h">
        <h2 id="roadmap-h" className="display">
          Shipping in <span className="hl">phases.</span>
        </h2>
        <p className="lp-section-sub">
          The free tracker is live today. Pro — and everything after it —
          ships in phases.
        </p>
        <div>
          {PHASES.map((r) => (
            <article key={r.title} className="phase-row">
              <div className="phase-meta">
                <span className="phase-n">{r.phase}</span>
                <span className="tag-soon">{r.badge}</span>
              </div>
              <div>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="lp-fineprint">
          Roadmap items are in development and not yet available.
        </p>
      </section>

      {/* ————— faq ————— */}
      <section className="lp-section" id="faq" aria-labelledby="faq-h">
        <h2 id="faq-h" className="display">
          Fair <span className="hl">questions.</span>
        </h2>
        <div className="lp-faq">
          {FAQS.map((f) => (
            <details key={f.q} className="lp-faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ————— final CTA ————— */}
      <section className="lp-cta-band" aria-labelledby="cta-h">
        <div className="lp-cta-band-inner">
          <h2 id="cta-h" className="display">
            Your job hunt, <span className="hl">on autopilot.</span>
          </h2>
          <p>
            Start free with the manual tracker today. When Pro&rsquo;s AI
            automation lands, your hunt runs itself.
          </p>
          <Link href="/app" className="btn-amber">
            Start tracking free
          </Link>
        </div>
      </section>

      {/* ————— footer ————— */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <span className="lp-brand">
            <CrosshairIcon />
            Huntboard
          </span>
          <nav className="lp-footer-links" aria-label="Footer">
            <Link href="/app">Open the app</Link>
            <a href="#pricing">Pricing</a>
            <a href="#roadmap">Roadmap</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub <ExternalIcon />
            </a>
          </nav>
          <span className="lp-copy">© 2026 Huntboard</span>
        </div>
      </footer>
    </div>
  );
}
