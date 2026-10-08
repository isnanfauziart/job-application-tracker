'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckIcon } from './icons';

const FREE_FEATURES = [
  'Manual application tracking',
  'Visual pipeline funnel',
  'Search & filters',
  'Private local storage',
  'No account needed',
];

const PRO_FEATURES = [
  { lead: true, text: 'Everything in Free, plus:' },
  { text: 'Gmail auto-tracking — AI reads application emails' },
  { text: 'Google Calendar sync for interviews' },
  { text: 'Screenshot detection for job postings' },
  { text: 'Auto-apply tracking for sent CVs' },
  { text: 'Smart follow-up reminders' },
  { text: 'Priority support' },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      <div className="lp-billing-wrap">
        <div className="lp-billing-toggle" role="group" aria-label="Billing period">
          <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
            Monthly
          </button>
          <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
            Yearly
          </button>
        </div>
      </div>

      <div className="lp-price-grid">
        <article className="lp-price-card">
          <p className="lp-price-tier">Free</p>
          <div className="lp-price">
            <span className="lp-price-amount">Rp0</span>
          </div>
          <p className="lp-price-desc">
            The complete manual tracker. Yours, private, today.
          </p>
          <ul className="lp-price-list">
            {FREE_FEATURES.map((f) => (
              <li key={f}>
                <CheckIcon />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link href="/app" className="btn-primary">
            Start tracking free
          </Link>
        </article>

        <article className="lp-price-card lp-price-card-pro">
          <span className="lp-badge">Coming soon</span>
          <p className="lp-price-tier">Pro</p>
          <div className="lp-price">
            <span className="lp-price-amount">
              {yearly ? 'Rp490.000' : 'Rp49.000'}
            </span>
            <span className="lp-price-period">
              {yearly ? '/year · 2 months free' : '/month'}
            </span>
          </div>
          <p className="lp-price-desc">
            For serious job hunters who want the hunt on autopilot.
          </p>
          <ul className="lp-price-list">
            {PRO_FEATURES.map((f) => (
              <li key={f.text} className={f.lead ? 'lp-list-lead' : undefined}>
                {!f.lead && <CheckIcon />}
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
          <Link href="/app" className="btn-primary">
            Start free
          </Link>
        </article>
      </div>

      <p className="lp-fineprint" style={{ textAlign: 'center' }}>
        Prices in Indonesian Rupiah (IDR). Pro launches with the AI automation
        suite — start free today and upgrade when it lands.
      </p>
    </div>
  );
}
