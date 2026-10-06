'use client';

import { useEffect, useMemo, useState } from 'react';

const STATUSES = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];
const STORAGE_KEY = 'job-application-tracker:v1';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function loadApps() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function Home() {
  const [apps, setApps] = useState(null); // null = not loaded yet
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [dateApplied, setDateApplied] = useState(todayISO());
  const [status, setStatus] = useState('Applied');
  const [jobUrl, setJobUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setApps(loadApps());
  }, []);

  useEffect(() => {
    if (apps !== null) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
      } catch {
        // storage unavailable; keep in-memory only
      }
    }
  }, [apps]);

  const counts = useMemo(() => {
    const c = { All: 0 };
    for (const s of STATUSES) c[s] = 0;
    for (const a of apps ?? []) {
      c.All += 1;
      if (c[a.status] !== undefined) c[a.status] += 1;
    }
    return c;
  }, [apps]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (apps ?? [])
      .filter((a) => filter === 'All' || a.status === filter)
      .filter(
        (a) =>
          !q ||
          a.company.toLowerCase().includes(q) ||
          a.position.toLowerCase().includes(q)
      )
      .sort((a, b) => b.dateApplied.localeCompare(a.dateApplied));
  }, [apps, filter, query]);

  function addApp(e) {
    e.preventDefault();
    if (!company.trim() || !position.trim()) return;
    const entry = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      company: company.trim(),
      position: position.trim(),
      dateApplied: dateApplied || todayISO(),
      status,
      jobUrl: jobUrl.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };
    setApps((prev) => [entry, ...(prev ?? [])]);
    setCompany('');
    setPosition('');
    setDateApplied(todayISO());
    setStatus('Applied');
    setJobUrl('');
    setNotes('');
  }

  function updateStatus(id, nextStatus) {
    setApps((prev) =>
      (prev ?? []).map((a) => (a.id === id ? { ...a, status: nextStatus } : a))
    );
  }

  function removeApp(id) {
    const target = (apps ?? []).find((a) => a.id === id);
    const label = target ? `${target.position} at ${target.company}` : 'this application';
    if (window.confirm(`Delete "${label}"?`)) {
      setApps((prev) => (prev ?? []).filter((a) => a.id !== id));
    }
  }

  if (apps === null) {
    return (
      <main className="container">
        <p>Loading…</p>
      </main>
    );
  }

  return (
    <main className="container">
      <header className="page-head">
        <div>
          <h1>Job Application Tracker</h1>
          <p>
            {counts.All} {counts.All === 1 ? 'application' : 'applications'} tracked
            · data stays in this browser
          </p>
        </div>
      </header>

      <section className="stats" aria-label="Status overview">
        {['All', ...STATUSES].map((s) => (
          <button
            key={s}
            className={`stat${filter === s ? ' active' : ''}`}
            onClick={() => setFilter(s)}
          >
            <div className="count">{counts[s] ?? 0}</div>
            <div className="label">{s}</div>
          </button>
        ))}
      </section>

      <section className="card" aria-label="Add application">
        <h2>Add application</h2>
        <form onSubmit={addApp}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="company">Company *</label>
              <input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. PT Harita Nickel"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="position">Position *</label>
              <input
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="e.g. HR Operations Officer"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="dateApplied">Date applied</label>
              <input
                id="dateApplied"
                type="date"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="field full">
              <label htmlFor="jobUrl">Job posting URL (optional)</label>
              <input
                id="jobUrl"
                type="url"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="https://…"
              />
            </div>
            <div className="field full">
              <label htmlFor="notes">Notes (optional)</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Recruiter contact, next steps, deadlines…"
              />
            </div>
          </div>
          <div className="btn-row">
            <button type="submit" className="btn">
              Add application
            </button>
          </div>
        </form>
      </section>

      <div className="toolbar">
        <input
          className="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search company or position…"
          aria-label="Search applications"
        />
      </div>

      {visible.length === 0 ? (
        <div className="empty">
          <strong>No applications found</strong>
          {apps.length === 0
            ? 'Add your first application above to start tracking.'
            : 'Try a different search or status filter.'}
        </div>
      ) : (
        <section className="list" aria-label="Applications">
          {visible.map((a) => (
            <article key={a.id} className="app-card">
              <div className="app-card-top">
                <div>
                  <h3>{a.position}</h3>
                  <div className="company">{a.company}</div>
                </div>
                <span className={`pill pill-${a.status}`}>{a.status}</span>
              </div>
              <div className="meta">
                <span>Applied {formatDate(a.dateApplied)}</span>
                {a.jobUrl && (
                  <a
                    href={a.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn"
                  >
                    View posting
                  </a>
                )}
              </div>
              {a.notes && <div className="notes">{a.notes}</div>}
              <div className="app-card-actions">
                <label htmlFor={`status-${a.id}`} style={{ fontSize: 13, color: '#6b7280' }}>
                  Status:
                </label>
                <select
                  id={`status-${a.id}`}
                  className="status-select"
                  value={a.status}
                  onChange={(e) => updateStatus(a.id, e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button className="delete-btn" onClick={() => removeApp(a.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
