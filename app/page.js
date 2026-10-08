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

const STATUS_STYLE = {
  Applied: { '--sc': 'var(--st-applied)', '--scw': 'var(--st-applied-wash)' },
  Screening: { '--sc': 'var(--st-screening)', '--scw': 'var(--st-screening-wash)' },
  Interview: { '--sc': 'var(--st-interview)', '--scw': 'var(--st-interview-wash)' },
  Offer: { '--sc': 'var(--st-offer)', '--scw': 'var(--st-offer-wash)' },
};

const MOCK_STAGES = [
  { label: 'Applied', count: 12, pct: 60, style: STATUS_STYLE.Applied },
  { label: 'Screening', count: 4, pct: 20, style: STATUS_STYLE.Screening },
  { label: 'Interview', count: 3, pct: 15, style: STATUS_STYLE.Interview },
  { label: 'Offer', count: 1, pct: 5, style: STATUS_STYLE.Offer },
];

const MOCK_CARDS = [
  {
    initials: 'AC',
    mg: 0,
    company: 'Acme Corp',
    position: 'Product Designer',
    status: 'Interview',
    when: '2 days ago',
  },
  {
    initials: 'GI',
    mg: 3,
    company: 'Globex Inc',
    position: 'Frontend Engineer',
    status: 'Screening',
    when: '5 days ago',
  },
  {
    initials: 'IL',
    mg: 2,
    company: 'Initech LLC',
    position: 'Data Analyst',
    status: 'Applied',
    when: '1 week ago',
  },
];

function Mockup() {
  return (
    <div className="lp-mock" aria-label="Product preview">
      <div className="lp-mock-chrome">
        <span className="lp-mock-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="lp-mock-url">huntboard · your board</span>
      </div>
      <div className="lp-mock-body">
        <div className="lp-mock-funnel">
          {MOCK_STAGES.map((s) => (
            <div key={s.label} className="lp-mock-stage">
              <span className="lp-mock-count">{s.count}</span>
              <span className="lp-mock-label">{s.label}</span>
              <span className="lp-mock-bar">
                <i style={{ ...s.style, width: `${s.pct}%` }} />
              </span>
            </div>
          ))}
        </div>
        <div className="lp-mock-cards">
          {MOCK_CARDS.map((c) => (
            <div key={c.company} className="lp-mock-card">
              <span
                className="monogram lp-mock-mono"
                style={{
                  '--mg': `var(--mg-${c.mg})`,
                  '--mgw': `var(--mg-${c.mg}w)`,
                }}
              >
                {c.initials}
              </span>
              <span className="lp-mock-meta">
                <strong>{c.position}</strong>
                <span>
                  {c.company} · {c.when}
                </span>
              </span>
              <span className="status-tag" style={STATUS_STYLE[c.status]}>
                <span className="swatch" aria-hidden="true" />
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="lp-mock-caption">
        Automation preview — your board, filled by AI · illustrative
      </p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="lp">
      {/* ————— sticky nav ————— */}
      <header className="lp-nav">
        <div className="lp-nav-inner">
          <Link href="/" className="lp-brand" aria-label="Huntboard home">
            <BriefcaseIcon />
            Huntboard
          </Link>
          <nav className="lp-links" aria-label="Sections">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#faq">FAQ</a>
          </nav>
          <Link href="/app" className="lp-cta">
            Open the app
          </Link>
        </div>
      </header>

      {/* ————— hero ————— */}
      <section className="lp-hero">
        <div className="lp-hero-copy">
          <p className="eyebrow">Huntboard — AI-powered job tracking</p>
          <h1>
            Your job hunt, <em>tracked automatically.</em>
          </h1>
          <p className="lp-lede">
            Huntboard&rsquo;s AI watches your Gmail, Google Calendar, and
            screenshots — every application, interview, and follow-up logged
            without manual entry. Built for Indonesian job seekers who would
            rather land interviews than maintain spreadsheets.
          </p>
          <div className="lp-cta-row">
            <Link href="/app" className="btn-primary">
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
        <Mockup />
      </section>

      {/* ————— features ————— */}
      <section className="lp-section" id="features" aria-labelledby="features-h">
        <p className="eyebrow">The product</p>
        <h2 id="features-h">
          Live today. <em>Automating tomorrow.</em>
        </h2>
        <p className="lp-section-sub">
          The manual tracker is live and free right now. The AI automation
          suite is in development and launches as Huntboard Pro.
        </p>

        <h3 className="lp-subhead">Live today</h3>
        <div className="lp-grid">
          {LIVE_FEATURES.map((f) => (
            <article key={f.title} className="lp-card">
              <span className="lp-card-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
        <Link href="/app" className="lp-text-link">
          Open the app <ChevronRightIcon />
        </Link>

        <h3 className="lp-subhead">
          <SparkIcon /> Coming soon: AI automation
        </h3>
        <div className="lp-grid">
          {PILLARS.map((p) => (
            <article key={p.title} className="lp-card lp-card-roadmap">
              <span className="lp-badge">Coming soon</span>
              <span className="lp-card-icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
        <p className="lp-fineprint">
          Automation features are in development and not yet available. Start
          free today — Pro launches with the full suite.
        </p>
      </section>

      {/* ————— how it works ————— */}
      <section className="lp-section" id="how-it-works" aria-labelledby="hiw-h">
        <p className="eyebrow">How it works</p>
        <h2 id="hiw-h">
          Connect. Hunt. <em>Autopilot.</em>
        </h2>
        <div className="lp-steps">
          {STEPS.map((s) => (
            <article key={s.n} className="lp-step">
              <span className="lp-step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
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
          <p className="eyebrow">Pricing</p>
          <h2 id="pricing-h">
            Simple pricing, <em>built for job seekers.</em>
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
        <p className="eyebrow">Roadmap</p>
        <h2 id="roadmap-h">
          Shipping in <em>phases.</em>
        </h2>
        <p className="lp-section-sub">
          The free tracker is live today. Pro — and everything after it —
          ships in phases.
        </p>
        <div className="lp-grid lp-grid-3">
          {PHASES.map((r) => (
            <article key={r.title} className="lp-card lp-card-roadmap">
              <span className="lp-badge">{r.badge}</span>
              <span className="lp-step-n">{r.phase}</span>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </article>
          ))}
        </div>
        <p className="lp-fineprint">
          Roadmap items are in development and not yet available.
        </p>
      </section>

      {/* ————— faq ————— */}
      <section className="lp-section" id="faq" aria-labelledby="faq-h">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-h">
          Fair <em>questions.</em>
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
        <h2 id="cta-h">
          Your job hunt, <em>on autopilot.</em>
        </h2>
        <p>
          Start free with the manual tracker today. When Pro&rsquo;s AI
          automation lands, your hunt runs itself.
        </p>
        <Link href="/app" className="btn-primary">
          Start tracking free
        </Link>
      </section>

      {/* ————— footer ————— */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <span className="lp-brand">
            <BriefcaseIcon />
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
