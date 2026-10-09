# DESIGN.md — Huntboard "Mission Control" (light revision)

Replacement visual world (2026-10-09); light revision same day — the user
rejected the dark theme, so the world was inverted to a bright control room
while keeping the system, layout, and components. Replaces the warm-paper
editorial identity. Persuade mode on `/`, Operate mode on `/app`. Product
truth lives in PRODUCT.md.

## World

Bright control room. Warm-white ground (`--ground #FAFAF7`) under a fixed
hairline grid texture (1px lines, 56px pitch, ~5.5% ink). Ink near-black text
(`--ink #14171C`); secondary text tinted from ink (`--ink-dim #3E4550`,
`--ink-faint #5B6472`), never pure gray. One amber system in two roles:
vivid amber (`--amber #F59E0B`) for fills, bars, dots, and beacons — always
carrying ink text on fills; deep amber (`--amber-deep #B45309`, ~5:1 on white)
for ALL text, status labels, and icons. Deep green (`--green #15803D`,
~5:1 on white) is reserved for live/automated signals only. Danger is a flat
red (`--danger #DC2626`). Panels are white (`--panel #FFFFFF`) with hairline
borders (`--line #E2E0D7`) and soft offset shadows (offset + blur, never
zero-blur blocks). Solid colors throughout — no linear-gradient color washes.
One faint amber radial instrument glow is allowed at the top of the hero and
CTA band (≤8% alpha).

## Typography

- Display: **Barlow Condensed** 600, uppercase, tight leading (0.95). Headlines
  only. Loaded via `next/font/google`, self-hosted.
- Data: **JetBrains Mono** 400/500/700. Readouts, counts, timestamps,
  micro-labels, status tags, stepper buttons. Tabular numerals everywhere.
- Body/UI: **Inter** 400–700. Prose, buttons, form fields.
- Micro-labels: 10.5–12px mono, 0.08–0.16em tracking, uppercase, `--ink-faint`.
  Never used as kickers above headings (banned) — headings carry their own weight.

## Signature elements

- **Telemetry strip**: five stage clusters (Applied → Screening → Interview →
  Offer, plus Rejected as terminal) with mono counts, conversion readouts, and
  sweep bars on white instrument panels. The furthest active stage gets the
  amber hot beacon (vivid pulsing dot + amber wash + deep-amber count, clearly
  visible on light grounds). Boot-up sequence: clusters rise in stagger,
  bars sweep left→right. Content is visible by default; motion is transform-only.
- **AI pillar chips**: dashed-border white chips with pulsing deep-green
  "listening" dots and `COMING SOON` tags. Listening dots are decorative proof
  of the automation story, never a shipped claim.
- **Spec-sheet rows**: features render as indexed readout rows
  (index / icon / title+body) inside bordered system blocks — never icon-card grids.
- **Status spine**: tracker cards carry a 4px status spine; stage colors are
  flat and light-safe: Applied `#5B6B8C`, Screening `#B45309`,
  Interview `#B45309`, Offer `#15803D`, Rejected `#9AA3B2`.
- **Monograms**: deterministic per company, light washes (`--mg-Nbg`) with
  dark glyphs (`--mg-N`), all pairs ≥4.5:1.

## Components

Sharp corners (`--radius 3px`). Hairline dividers. Primary action: vivid amber
button, ink text; hover softens glow. Secondary: ghost button, deepens to amber
on hover. Inputs: light fields (`--ground`), deep-amber focus ring with 25%
wash; placeholders use `--ink-faint` (≥4.5:1). Status tags and stepper: mono
uppercase pills; active state is amber wash + amber line + deep-amber text.
Command palette (`⌘K`): dimmed ink scrim, 560px white panel, arrow-key
navigation, footer key hints. Delete uses an inline confirm strip, never a modal.

## Motion

One authored moment: the hero telemetry boot sequence. Elsewhere restrained:
hover lifts (≤3px), bar sweeps, pulsing beacons (2.2s). Exponential ease-out.
`prefers-reduced-motion` collapses everything to instant.

## Browser surfaces

Amber text selection; amber caret; thin light scrollbars; 2px amber
focus-visible rings. `color-scheme: light` on form controls.

## Responsive

Desktop-first grid that collapses: telemetry strip scrolls horizontally under
720px min-width; spec rows stack to one column; nav links hide under 760px;
tracker cards stack with full-width delete zone under 640px.

## Contrast spot-checks (white #FFFFFF ground)

- `--ink #14171C` body: ~15:1. `--ink-dim #3E4550`: ~9.7:1.
  `--ink-faint #5B6472`: ~6:1. `--ink-ghost #5F6B7D`: ~5.4:1 (placeholders OK).
- `--amber-deep #B45309` text: ~5:1. `--green #15803D`: ~5:1.
  `--danger #DC2626`: ~4.8:1.
- Vivid `--amber #F59E0B` on white is ~2.1:1 — never used for text; fills carry
  `--amber-ink #14171C` (~7:1 on the fill).
