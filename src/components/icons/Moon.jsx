/**
 * Solar `Moon`, Style=Bold. The dark-mode counterpart to `Sun` in the theme
 * toggle. Drawn on a 24 grid where Sun is drawn on 18, so both are placed at
 * 18x18 and the viewBoxes do the reconciling.
 */
export default function Moon({ className }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill="currentColor"
      />
    </svg>
  );
}
