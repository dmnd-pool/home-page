/**
 * A check, drawn to pair with `Close` in the comparison table's pro/con marks.
 *
 * The design contains no check glyph, so this follows the cross's geometry rather
 * than inventing a weight: same 16x16 box, same 1px stroke, and the same 9-unit
 * reach across the middle of the box, with the short arm a third of the long one.
 * It is a stroked path rather than the cross's two rotated bars because a mitred
 * join draws the vertex cleanly, where two overlapping rects leave a notch in it.
 */
export default function Check({ className }) {
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
      <path d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}
