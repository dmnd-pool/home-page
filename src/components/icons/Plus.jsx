
export default function Plus({ className }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3.5" y="7.5" width="9" height="1" fill="currentColor" />
      <rect x="7.5" y="3.5" width="1" height="9" fill="var(--color-icon-default)" />
    </svg>
  );
}
