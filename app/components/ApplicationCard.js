import { useState } from 'react';
import { CalendarIcon, ExternalIcon, TrashIcon } from './icons';

const STATUSES = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

// Deterministic monogram palette index from the company name.
function monogramIndex(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  return h % 8;
}

function initials(name) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  // Skip common corporate prefixes for a more meaningful monogram.
  const skip = new Set(['pt', 'cv', 'ud', 'the']);
  const meaningful = words.filter((w) => !skip.has(w.toLowerCase()));
  const use = meaningful.length >= 2 ? meaningful : words;
  return (use[0][0] + use[1][0]).toUpperCase();
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

function daysAgo(iso) {
  if (!iso) return null;
  const then = new Date(iso + 'T00:00:00').getTime();
  const days = Math.round((Date.now() - then) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days} days ago`;
}

export default function ApplicationCard({ app, index, onStatusChange, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const mg = monogramIndex(app.company || '?');

  return (
    <article
      className="app-card"
      data-status={app.status}
      style={{ '--i': index }}
      aria-label={`${app.position} at ${app.company}`}
    >
      <div
        className="monogram"
        style={{ '--mgc': `var(--mg-${mg})`, '--mgbg': `var(--mg-${mg}bg)` }}
        aria-hidden="true"
      >
        {initials(app.company || '?')}
      </div>

      <div className="card-main">
        <div className="card-top">
          <div>
            <h3>{app.position}</h3>
            <div className="company">{app.company}</div>
          </div>
          <span className="status-tag">
            <span className="swatch" aria-hidden="true" />
            {app.status}
          </span>
        </div>

        <div className="card-meta">
          <span className="meta-item">
            <CalendarIcon />
            {formatDate(app.dateApplied)}
            <span style={{ color: 'var(--faint)' }}>· {daysAgo(app.dateApplied)}</span>
          </span>
          {app.jobUrl && (
            <a
              className="posting-link"
              href={app.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View posting
              <ExternalIcon />
            </a>
          )}
        </div>

        {app.notes && <p className="card-notes">{app.notes}</p>}

        <div className="card-actions">
          <div
            className="stepper"
            role="group"
            aria-label={`Change status for ${app.position} at ${app.company}`}
          >
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={app.status === s}
                onClick={() => app.status !== s && onStatusChange(app.id, s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="delete-zone">
            {confirming ? (
              <span className="confirm-strip" role="alert">
                Delete this application?
                <button
                  type="button"
                  className="yes"
                  onClick={() => onDelete(app.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="no"
                  onClick={() => setConfirming(false)}
                >
                  Keep
                </button>
              </span>
            ) : (
              <button
                type="button"
                className="icon-btn"
                aria-label={`Delete ${app.position} at ${app.company}`}
                title="Delete application"
                onClick={() => setConfirming(true)}
              >
                <TrashIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
