import { useState } from 'react';
import { CheckIcon } from './icons';

const STATUSES = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

const STATUS_VARS = {
  Applied: { '--sc': 'var(--st-applied)', '--scw': 'var(--st-applied-wash)' },
  Screening: { '--sc': 'var(--st-screening)', '--scw': 'var(--st-screening-wash)' },
  Interview: { '--sc': 'var(--st-interview)', '--scw': 'var(--st-interview-wash)' },
  Offer: { '--sc': 'var(--st-offer)', '--scw': 'var(--st-offer-wash)' },
  Rejected: { '--sc': 'var(--st-rejected)', '--scw': 'var(--st-rejected-wash)' },
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function ApplicationForm({ onSubmit }) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [dateApplied, setDateApplied] = useState(todayISO());
  const [status, setStatus] = useState('Applied');
  const [jobUrl, setJobUrl] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!company.trim() || !position.trim()) return;
    onSubmit({
      company: company.trim(),
      position: position.trim(),
      dateApplied: dateApplied || todayISO(),
      status,
      jobUrl: jobUrl.trim(),
      notes: notes.trim(),
    });
    setCompany('');
    setPosition('');
    setDateApplied(todayISO());
    setStatus('Applied');
    setJobUrl('');
    setNotes('');
  }

  return (
    <div className="form-card" role="region" aria-label="Log a new application">
      <h3>Log a new application</h3>
      <p>Two fields are all it takes — everything else can be filled in later.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="f-company">Company</label>
            <input
              id="f-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. PT Nusantara Energi"
              required
              autoComplete="off"
            />
          </div>
          <div className="field">
            <label htmlFor="f-position">Position</label>
            <input
              id="f-position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g. HR Operations Officer"
              required
              autoComplete="off"
            />
          </div>
          <div className="field">
            <label htmlFor="f-date">Date applied</label>
            <input
              id="f-date"
              type="date"
              value={dateApplied}
              onChange={(e) => setDateApplied(e.target.value)}
            />
          </div>
          <div className="field">
            <label id="f-status-label">Starting status</label>
            <div
              className="seg"
              role="group"
              aria-labelledby="f-status-label"
            >
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  style={STATUS_VARS[s]}
                  aria-pressed={status === s}
                  onClick={() => setStatus(s)}
                >
                  <span className="swatch" aria-hidden="true" />
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="field full">
            <label htmlFor="f-url">
              Job posting URL <span className="opt">— optional</span>
            </label>
            <input
              id="f-url"
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://…"
              autoComplete="off"
            />
          </div>
          <div className="field full">
            <label htmlFor="f-notes">
              Notes <span className="opt">— optional</span>
            </label>
            <textarea
              id="f-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Recruiter contact, next steps, deadlines…"
            />
          </div>
        </div>
        <div className="form-foot">
          <span className="fine">Saved privately in this browser — nothing leaves your device.</span>
          <button type="submit" className="btn-submit">
            <CheckIcon />
            Add to tracker
          </button>
        </div>
      </form>
    </div>
  );
}
