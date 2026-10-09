'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import StatFunnel from '../components/StatFunnel';
import ApplicationForm from '../components/ApplicationForm';
import ApplicationCard from '../components/ApplicationCard';
import EmptyState from '../components/EmptyState';
import CommandPalette from '../components/CommandPalette';
import {
  CrosshairIcon,
  PlusIcon,
  SearchIcon,
  CloseIcon,
  BoltIcon,
  TargetIcon,
  CheckIcon,
} from '../components/icons';

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

function isTypingTarget(el) {
  return (
    el &&
    (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
  );
}

export default function Home() {
  const [apps, setApps] = useState(null); // null = not loaded yet
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const formRef = useRef(null);
  const searchRef = useRef(null);

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

  // global shortcuts: ⌘K palette, / search, n new application
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      if (isTypingTarget(e.target) || paletteOpen) return;
      if (e.key === '/') {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key.toLowerCase() === 'n' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setFormOpen((v) => !v);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen]);

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

  const paletteActions = useMemo(
    () => [
      {
        id: 'new',
        label: formOpen ? 'Close application form' : 'Log new application',
        hint: 'N',
        icon: PlusIcon,
        run: () => setFormOpen((v) => !v),
      },
      {
        id: 'search',
        label: 'Focus search',
        hint: '/',
        icon: SearchIcon,
        run: () => searchRef.current?.focus(),
      },
      {
        id: 'clear',
        label: 'Clear search & filters',
        icon: CloseIcon,
        run: clearFilters,
      },
      ...['All', ...STATUSES].map((s) => ({
        id: `filter-${s}`,
        label: s === 'All' ? 'Show all applications' : `Filter: ${s}`,
        icon: s === 'All' ? TargetIcon : CheckIcon,
        run: () => setFilter(s),
      })),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formOpen]
  );

  if (apps === null) {
    return (
      <div className="shell">
        <div className="loader" role="status" aria-label="Loading">
          <span className="ring" aria-hidden="true" />
          <span>Booting board…</span>
        </div>
      </div>
    );
  }

  const total = counts.All ?? 0;

  return (
    <div className="shell">
      <header className="topbar">
        <div className="wordmark">
          <CrosshairIcon />
          Huntboard
        </div>
        <div className="topbar-note">
          <span className="dot-live" aria-hidden="true" />
          <span>Private to this browser</span>
        </div>
      </header>

      <section className="hero">
        <div>
          <h1 className="display">
            Every application, <span className="hl">accounted for.</span>
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
        <h2 className="display" style={{ fontSize: '30px' }}>
          Applications
        </h2>
        <span className="hint micro">
          {filter !== 'All' ? `FILTER // ${filter}` : 'SORT // NEWEST FIRST'}
        </span>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <SearchIcon />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search company or position…"
            aria-label="Search applications"
          />
          {query ? (
            <button
              type="button"
              className="search-clear"
              aria-label="Clear search"
              onClick={() => setQuery('')}
            >
              <CloseIcon />
            </button>
          ) : (
            <span className="kbd-hint" aria-hidden="true">
              /
            </span>
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
        <button
          type="button"
          className="filter-chip"
          style={{ cursor: 'pointer' }}
          onClick={() => setPaletteOpen(true)}
          aria-label="Open command palette"
        >
          <BoltIcon />
          ⌘K
        </button>
        <span className="result-count" aria-live="polite">
          {visible.length} / {total}
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

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        actions={paletteActions}
      />
    </div>
  );
}
