// Inline SVG icon set — stroke-based, 1.8px, round caps. No emoji.

function base(props, children) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function BriefcaseIcon(props) {
  return base(
    props,
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M3 12.5h18" />
    </>
  );
}

export function SearchIcon(props) {
  return base(
    props,
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.8-3.8" />
    </>
  );
}

export function PlusIcon(props) {
  return base(
    props,
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  );
}

export function ExternalIcon(props) {
  return base(
    props,
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M19 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5.5" />
    </>
  );
}

export function TrashIcon(props) {
  return base(
    props,
    <>
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M6.5 7l1 13h9l1-13" />
      <path d="M10 11v6M14 11v6" />
    </>
  );
}

export function CloseIcon(props) {
  return base(
    props,
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  );
}

export function ChevronRightIcon(props) {
  return base(
    props,
    <>
      <path d="m9 6 6 6-6 6" />
    </>
  );
}

export function CalendarIcon(props) {
  return base(
    props,
    <>
      <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
      <path d="M4 10h16" />
      <path d="M8.5 3.5v4M15.5 3.5v4" />
    </>
  );
}

export function CheckIcon(props) {
  return base(
    props,
    <>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </>
  );
}

export function TargetIcon(props) {
  return base(
    props,
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </>
  );
}

export function InboxIcon(props) {
  return base(
    props,
    <>
      <path d="M3.5 13.5 6 4.8A1 1 0 0 1 7 4h10a1 1 0 0 1 1 .8l2.5 8.7v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19.5Z" />
      <path d="M3.5 13.5H9a3 3 0 0 0 6 0h5.5" />
    </>
  );
}
