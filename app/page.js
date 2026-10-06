'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import StatFunnel from './components/StatFunnel';
import ApplicationForm from './components/ApplicationForm';
import ApplicationCard from './components/ApplicationCard';
import EmptyState from './components/EmptyState';
import { BriefcaseIcon, PlusIcon, SearchIcon, CloseIcon } from './components/icons';

const STATUSES = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];
const STORAGE_KEY = 'job-application-tracker:v1';

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
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const formRef = useRef(null);

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

  useEffect(() => {
    if (formOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [formOpen]);

  const counts = useMemo(() => {
    const c = { All: 0 };
    for (const s of STATUSES) c[s] = 0;
    for (const a of apps ?? []) {
      c.All += 1;
      if (c[a.status] !== undefined) c[a.status] += 1;
    }
    return c;
  }, [apps]);

  const activePipeline =
    (counts.Applied ?? 0) + (counts.Screening ?? 0) + (counts.Interview ?? 0);

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

  function addApp(fields) {
    const entry = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      ...fields,
      createdAt: new Date().toISOString(),
    };
    setApps((prev) => [entry, ...(prev ?? [])]);
  }

  function updateStatus(id, nextStatus) {
    setApps((prev) =>
      (prev ?? []).map((a) => (a.id === id ? { ...a, status: nextStatus } : a))
    );
  }

  function removeApp(id) {
    setApps((prev) => (prev ?? []).filter((a) => a.id !== id));
  }

  function clearFilters() {
    setFilter('All');
    setQuery('');
  }

  if (apps === null) {
    return (
      <div className="shell">
        <div className="loader" role="status" aria-label="Loading">
          <span className="ring" aria-hidden="true" />
          <span>Preparing your board…</span>
        </div>
      </div>
    );
  }

  const total = counts.All ?? 0;

  return (
    <div className="shell">
      <header className="topbar">
        <div className="wordmark">
          <BriefcaseIcon />
          Huntboard
        </div>
        <div className="topbar-note">
          <span className="dot-live" aria-hidden="true" />
          <span>Private to this browser</span>
        </div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Application tracker</p>
          <h1>
            Every application, <em>accounted for.</em>
          </h1>
          <p>
            <strong>{total} {total === 1 ? 'application' : 'applications'}</strong> tracked
            {activePipeline > 0 && (
              <>
                {' '}· <strong>{activePipeline}</strong> live in the pipeline
              </>
            )}
            . Log them as you go, move them through the stages, and never
            wonder “where did that one go?” again.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          aria-expanded={formOpen}
          onClick={() => setFormOpen((v) => !v)}
        >
          <PlusIcon />
          {formOpen ? 'Close form' : 'Log application'}
        </button>
      </section>

      <StatFunnel counts={counts} filter={filter} onSelect={setFilter} />

      <div
        ref={formRef}
        className={`form-wrap${formOpen ? ' open' : ''}`}
        aria-hidden={!formOpen}
        inert={!formOpen}
      >
        <div className="form-clip">
          <ApplicationForm onSubmit={addApp} />
        </div>
      </div>

      <div className="section-head">
        <h2>Applications</h2>
        <span className="hint">
          {filter !== 'All' ? `Filtered by ${filter}` : 'Newest first'}
        </span>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search company or position…"
            aria-label="Search applications"
          />
          {query && (
            <button
              type="button"
              className="search-clear"
              aria-label="Clear search"
              onClick={() => setQuery('')}
            >
              <CloseIcon />
            </button>
          )}
        </div>
        {filter !== 'All' && (
          <span className="filter-chip">
            {filter}
            <button
              type="button"
              aria-label="Clear status filter"
              onClick={() => setFilter('All')}
            >
              <CloseIcon />
            </button>
          </span>
        )}
        <span className="result-count" aria-live="polite">
          {visible.length} of {total}
        </span>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          kind={total === 0 ? 'blank' : 'noresults'}
          onAdd={() => setFormOpen(true)}
          onClear={clearFilters}
        />
      ) : (
        <section className="list" aria-label="Applications">
          {visible.map((a, i) => (
            <ApplicationCard
              key={a.id}
              app={a}
              index={i}
              onStatusChange={updateStatus}
              onDelete={removeApp}
            />
          ))}
        </section>
      )}

      <footer className="foot">
        <span>Huntboard — a personal board for the job hunt.</span>
        <span>Data lives in this browser · nothing is sent anywhere.</span>
      </footer>
    </div>
  );
}
