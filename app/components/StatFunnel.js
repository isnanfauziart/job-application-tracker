// Pipeline telemetry strip: Applied → Screening → Interview → Offer,
// plus Rejected as a separate terminal node. Clicking a cluster filters the list.
// The "hot" beacon marks the furthest active stage with applications in it.

const STAGES = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

const STATUS_VAR = {
  Applied: 'var(--st-applied)',
  Screening: 'var(--st-screening)',
  Interview: 'var(--st-interview)',
  Offer: 'var(--st-offer)',
  Rejected: 'var(--st-rejected)',
};

export default function StatFunnel({ counts, filter, onSelect }) {
  const total = counts.All ?? 0;
  const funnelTotal =
    counts.Applied + counts.Screening + counts.Interview + counts.Offer;

  // Furthest non-terminal stage holding applications gets the hot beacon.
  let hot = null;
  for (const s of ['Offer', 'Interview', 'Screening', 'Applied']) {
    if ((counts[s] ?? 0) > 0) {
      hot = s;
      break;
    }
  }

  return (
    <section className="telemetry pipeline" aria-label="Application pipeline overview">
      <div className="telemetry-head">
        <span className="micro">
          <span className="live-dot" aria-hidden="true" />
          Pipeline // live
        </span>
        <span className="tm-stamp" aria-hidden="true">
          {String(total).padStart(3, '0')} SIGNALS
        </span>
      </div>
      <div className="telemetry-inner">
        {STAGES.map((s, i) => {
          const c = counts[s] ?? 0;
          const base = s === 'Rejected' ? total : funnelTotal;
          const pct = base > 0 ? Math.round((c / base) * 100) : 0;
          const selected = filter === s;
          const isHot = hot === s;
          return (
            <button
              key={s}
              type="button"
              className={
                'tm-cluster' +
                (s === 'Rejected' ? ' tm-terminal' : '') +
                (selected ? ' tm-selected' : '') +
                (isHot ? ' tm-hot' : '')
              }
              style={{ '--i': i, '--sc': STATUS_VAR[s], '--w': `${pct}%` }}
              onClick={() => onSelect(selected ? 'All' : s)}
              aria-pressed={selected}
              aria-label={`Filter by ${s}, ${c} applications`}
            >
              <span className="tm-count">{c}</span>
              <span className="tm-label">
                <span className="swatch" aria-hidden="true" />
                {s}
                {isHot && <span className="tm-beacon" aria-hidden="true" />}
              </span>
              <span className="tm-conv" aria-hidden="true">
                {pct}% {s === 'Rejected' ? 'OF TOTAL' : 'OF ACTIVE'}
              </span>
              <span className="tm-bar" aria-hidden="true">
                <i />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
