import { InboxIcon, SearchIcon, PlusIcon } from './icons';

export default function EmptyState({ kind, onAdd, onClear }) {
  if (kind === 'blank') {
    return (
      <div className="empty" role="status">
        <InboxIcon />
        <h3>
          Your board is <span className="hl">wide open.</span>
        </h3>
        <p>
          Log your first application and watch the pipeline fill up —
          every step of the hunt, accounted for.
        </p>
        <button type="button" className="btn-primary" onClick={onAdd}>
          <PlusIcon />
          Log your first application
        </button>
      </div>
    );
  }

  return (
    <div className="empty" role="status">
      <SearchIcon />
      <h3>
        Nothing <span className="hl">matches.</span>
      </h3>
      <p>Try a different search term, or clear the status filter to see everything again.</p>
      <button type="button" className="btn-primary" onClick={onClear}>
        Clear search &amp; filters
      </button>
    </div>
  );
}
