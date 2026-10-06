import { ChevronRightIcon } from './icons';

// Pipeline overview: the forward funnel (Applied → Screening → Interview → Offer)
// plus Rejected as a separate terminal node. Clicking a stage filters the list.
const FUNNEL = ['Applied', 'Screening', 'Interview', 'Offer'];

const STATUS_VARS = {
  Applied: { '--sc': 'var(--st-applied)', '--scw': 'var(--st-applied-wash)' },
  Screening: { '--sc': 'var(--st-screening)', '--scw': 'var(--st-screening-wash)' },
  Interview: { '--sc': 'var(--st-interview)', '--scw': 'var(--st-interview-wash)' },
  Offer: { '--sc': 'var(--st-offer)', '--scw': 'var(--st-offer-wash)' },
  Rejected: { '--sc': 'var(--st-rejected)', '--scw': 'var(--st-rejected-wash)' },
};

export default function StatFunnel({ counts, filter, onSelect }) {
  const total = counts.All ?? 0;
  const activeTotal = FUNNEL.reduce((n, s) => n + (counts[s] ?? 0), 0);

  return (
    <section className="pipeline" aria-label="Application pipeline overview">
      <div className="pipeline-inner">
        {FUNNEL.map((s, i) => {
          const c = counts[s] ?? 0;
          const pct = activeTotal > 0 ? Math.round((c / activeTotal) * 100) : 0;
          return (
            <div key={s} style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
              <button
                className={`stage${filter === s ? ' active' : ''}`}
                style={STATUS_VARS[s]}
                onClick={() => onSelect(filter === s ? 'All' : s)}
                aria-pressed={filter === s}
                aria-label={`Filter by ${s}, ${c} applications`}
              >
                <span className="stage-count">{c}</span>
                <span className="stage-label">
                  <span className="swatch" />
                  {s}
                </span>
                <span className="stage-bar" aria-hidden="true">
                  <i style={{ width: `${pct}%` }} />
                </span>
              </button>
              {i < FUNNEL.length - 1 && (
                <span className="stage-sep" aria-hidden="true">
                  <ChevronRightIcon />
                </span>
              )}
            </div>
          );
        })}

        <button
          className={`stage stage-terminal${filter === 'Rejected' ? ' active' : ''}`}
          style={STATUS_VARS.Rejected}
          onClick={() => onSelect(filter === 'Rejected' ? 'All' : 'Rejected')}
          aria-pressed={filter === 'Rejected'}
          aria-label={`Filter by Rejected, ${counts.Rejected ?? 0} applications`}
        >
          <span className="stage-count">{counts.Rejected ?? 0}</span>
          <span className="stage-label">
            <span className="swatch" />
            Rejected
          </span>
          <span className="stage-bar" aria-hidden="true">
            <i
              style={{
                width: total > 0 ? `${Math.round(((counts.Rejected ?? 0) / total) * 100)}%` : '0%',
              }}
            />
          </span>
        </button>
      </div>
    </section>
  );
}
