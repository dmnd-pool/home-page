/**
 * A close cross, built from the same 9x1 bar the `Add` and `Minus` glyphs use so
 * the three read as one family. The design draws no close affordance -- there is
 * no mobile menu in the file -- so this follows the icon set rather than inventing
 * a new weight.
 */
export default function Close({ className }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="7.5" width="9" height="1" transform="rotate(45 8 8)" fill="currentColor" />
      <rect x="3.5" y="7.5" width="9" height="1" transform="rotate(-45 8 8)" fill="currentColor" />
    </svg>
  );
}
