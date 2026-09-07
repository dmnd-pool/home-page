import { cx } from '../lib/cx.js';

/**
 * The design's Tag, in the two variants placed on this page.
 *
 *  - `large`     : 28 tall, fully rounded, 14/20 label. Used for the hero's block
 *                  announcement and the "Foundation" eyebrow.
 *  - `medium`    : 24 tall, square, 12/16 label. Used for "3 hours ago" and
 *                  "FPPS available".
 *  - `smallPill` : 24 tall, fully rounded, 12/16 label. Only the hero badge at
 *                  375, which keeps the pill while dropping to the smaller ramp.
 *
 * The status dot is 6x6 and only appears on the status type; "FPPS available"
 * is drawn without one. Its green is Icons/Success (#00C950), which is a different
 * token from the Badge's Green/500 (#22C55E) even though both are named Icons/
 * Success in the file -- kept distinct here rather than unified.
 *
 * No hover, focus or pressed state is drawn for Tag anywhere in the design.
 *
 * Pass `children` instead of `label` when the copy has to change between
 * breakpoints, so one tag swaps its own text rather than two tags fighting over
 * `display`.
 */
const BY_SIZE = {
  large: 'h-7 rounded-lg px-3 py-1 text-sm',
  medium: 'h-6 rounded-none px-2 py-1 text-xs',
  smallPill: 'h-6 rounded-lg px-2 py-1 text-xs',
};

// Emitted from inside the component so both sets are ours and neither can lose to
// the other on stylesheet order.
const BY_SIZE_LG = {
  large: 'lg:h-7 lg:rounded-lg lg:px-3 lg:py-1 lg:text-sm',
  medium: 'lg:h-6 lg:rounded-none lg:px-2 lg:py-1 lg:text-xs',
  smallPill: 'lg:h-6 lg:rounded-lg lg:px-2 lg:py-1 lg:text-xs',
};

export default function Tag({ size = 'large', sizeLg, dot = false, label, className, children }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 bg-bg-default font-medium text-body-alt shadow-[inset_0_0_0_0.5px_var(--color-border-default)]',
        BY_SIZE[size],
        sizeLg && sizeLg !== size && BY_SIZE_LG[sizeLg],
        className,
      )}
    >
      {dot && <span className="size-1.5 shrink-0 rounded-full bg-icon-success" aria-hidden="true" />}
      {children ?? label}
    </span>
  );
}
