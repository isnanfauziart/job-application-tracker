'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { SearchIcon, BoltIcon } from './icons';

export default function CommandPalette({ open, onClose, actions }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      // focus after the open animation frame
      const t = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(t);
    }
  }, [open ]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => (filtered.length ? (a + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) =>
          filtered.length ? (a - 1 + filtered.length) % filtered.length : 0
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = filtered[active];
        if (item) {
          item.run();
          onClose();
        }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, active, onClose]);

  // keep the active item visible
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  return (
    <div
      className="cmdk-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="cmdk"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="cmdk-input-row">
          <SearchIcon />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command…"
            aria-label="Command search"
            autoComplete="off"
          />
        </div>
        <div className="cmdk-list" ref={listRef} role="listbox">
          {filtered.length === 0 && (
            <div className="cmdk-empty">NO MATCHING COMMAND</div>
          )}
          {filtered.map((a, i) => {
            const Icon = a.icon || BoltIcon;
            return (
              <button
                key={a.id}
                type="button"
                role="option"
                aria-selected={i === active}
                data-active={i === active}
                className="cmdk-item"
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  a.run();
                  onClose();
                }}
              >
                <Icon />
                {a.label}
                {a.hint && <span className="cmdk-kbd">{a.hint}</span>}
              </button>
            );
          })}
        </div>
        <div className="cmdk-foot" aria-hidden="true">
          <span>↑↓ NAVIGATE</span>
          <span>↵ RUN</span>
          <span>ESC CLOSE</span>
        </div>
      </div>
    </div>
  );
}
