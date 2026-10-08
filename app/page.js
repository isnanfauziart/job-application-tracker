import Link from 'next/link';
import {
  BriefcaseIcon,
  SearchIcon,
  CheckIcon,
  TargetIcon,
  InboxIcon,
  ChevronRightIcon,
  ExternalIcon,
} from './components/icons';

const GITHUB_URL = 'https://github.com/isnanfauziart/job-application-tracker';

const FEATURES = [
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
    body: 'Everything is stored in your browser\u2019s local storage. No servers, no tracking, no data leaving your device — your job search stays yours.',
  },
  {
    icon: <CheckIcon />,
    title: 'No account needed',
    body: 'Open the app and start logging. Nothing to sign up for, nothing to configure, nothing to forget the password to.',
  },
  {
    icon: <ChevronRightIcon />,
    title: 'Free to use',
    body: 'The tracker is free, with no tiers and no paywalls on your own data.',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Log it',
    body: 'Add an application in under 30 seconds — company, role, where you found it, and anything worth remembering.',
  },
  {
    n: '02',
    title: 'Move it',
    body: 'Update its stage as replies come in: screening, interview, offer. Your funnel always reflects reality.',
  },
  {
    n: '03',
    title: 'Land it',
    body: 'Walk into every interview with full context — notes, links, and history for that exact application at your fingertips.',
  },
];

const ROADMAP = [
  {
    title: 'AI-tailored resumes',
    body: 'Suggestions that tailor your resume to each job description, so every application speaks the employer\u2019s language.',
  },
  {
    title: 'Smart follow-up reminders',
    body: 'A nudge when an application has gone quiet for too long — never let a warm lead go cold again.',
  },
  {
    title: 'Interview prep',
    body: 'Prep notes generated from the role and company you\u2019re interviewing with, drawn from what you already logged.',
  },
];

const FAQS = [
  {
    q: 'Is my data private?',
    a: 'Yes. Huntboard stores everything in your browser\u2019s local storage. Your applications are never sent to a server — we couldn\u2019t see them if we wanted to.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. The application tracker is free to use, with no account required and no paywalls on your own data.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. Open the app and start logging applications immediately. There\u2019s nothing to sign up for.',
  },
  {
    q: 'What\u2019s coming next?',
    a: 'We\u2019re building AI-assisted features on top of the tracker: tailored resumes, follow-up reminders, and interview prep. See the roadmap above — those items are in development, not yet available.',
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
      <p className="lp-mock-caption">A peek at the board — illustrative preview</p>
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
          <p className="eyebrow">Huntboard — your job-search command center</p>
          <h1>
            Every application, <em>accounted for.</em>
          </h1>
          <p className="lp-lede">
            Huntboard is the command center for your job search. Log every
            application, watch it move through your pipeline, and walk into
            every interview knowing exactly where you stand.
          </p>
          <div className="lp-cta-row">
            <Link href="/app" className="btn-primary">
              Open the app
            </Link>
            <a href="#how-it-works" className="lp-cta-secondary">
              See how it works
            </a>
          </div>
          <p className="lp-trust">Free · No account · Your data never leaves your browser</p>
        </div>
        <Mockup />
      </section>

      {/* ————— features ————— */}
      <section className="lp-section" id="features" aria-labelledby="features-h">
        <p className="eyebrow">Features</p>
        <h2 id="features-h">
          Built for the hunt, <em>not the spreadsheet.</em>
        </h2>
        <div className="lp-grid">
          {FEATURES.map((f) => (
            <article key={f.title} className="lp-card">
              <span className="lp-card-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ————— how it works ————— */}
      <section className="lp-section" id="how-it-works" aria-labelledby="hiw-h">
        <p className="eyebrow">How it works</p>
        <h2 id="hiw-h">
          Three steps. <em>Zero chaos.</em>
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
      </section>

      {/* ————— roadmap ————— */}
      <section className="lp-section" id="roadmap" aria-labelledby="roadmap-h">
        <p className="eyebrow">Roadmap</p>
        <h2 id="roadmap-h">
          Where Huntboard <em>is going.</em>
        </h2>
        <p className="lp-section-sub">
          The tracker you see today is the foundation. Next, we bring AI to
          the job search — so the hours around each application get easier too.
        </p>
        <div className="lp-grid lp-grid-3">
          {ROADMAP.map((r) => (
            <article key={r.title} className="lp-card lp-card-roadmap">
              <span className="lp-badge">On the roadmap</span>
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
          Start tracking <em>your hunt.</em>
        </h2>
        <p>Free, private, no account needed. Your first application takes 30 seconds to log.</p>
        <Link href="/app" className="btn-primary">
          Open the app
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
