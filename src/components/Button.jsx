import { cx } from '../lib/cx.js';

/**
 * The design's Button, covering the variants actually placed on the landing page.
 * Values are read off the placed instances rather than the library master,
 * because several instances override it.
 *
 * Two overrides worth knowing:
 *  - Primary is SQUARE here (radius 0). The library ships it as a radius-32 pill;
 *    every instance on this page overrides that to 0.
 *  - Stroke weight differs by type: primary 1px and secondary 0.5px.
 *
 * Tertiary is not a padded box at all: it is text with an optional 0.5px rule
 * sitting 2px below it, so it is built with a border-bottom rather than a
 * text-decoration.
 *
 * No hover, focus, pressed, disabled or loading state is drawn anywhere in the
 * file. The hover treatment here is the library's own hover fill for each filled
 * type and an opacity shift on tertiary; focus-visible is added because the design
 * has no focus state at all and shipping without one is a WCAG 2.4.7 failure.
 *
 * @param {object}   props
 * @param {'primary'|'secondary'|'tertiary'} [props.variant]
 * @param {'default'|'small'} [props.size]
 * @param {'default'|'small'} [props.sizeLg] Size from lg up, when the design
 *   draws a different one at each breakpoint. Defaults to `size`.
 * @param {boolean} [props.pillSm] Keeps the library's radius-32 pill below lg and
 *   squares it from lg up. The CTA's "Join now" is the only instance drawn that
 *   way, so it is a one-off rather than a pattern.
 */
const FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500';

// Every button hugs its label in the design. `w-fit` alone stops a column-flex
// parent stretching it, because stretch only applies when the cross size is
// auto. Using `self-start` instead would also override a row parent's vertical
// centring and lift the button off the baseline.
const HUG = 'w-fit';

const bySize = (variant) => ({
  default: variant === 'tertiary' ? 'text-base' : 'h-11 px-6 py-2.5 text-base',
  small: variant === 'tertiary' ? 'text-sm' : 'h-9 px-5 py-2 text-sm',
});

// The lg-and-up size is emitted as its own prefixed utilities so both sets come
// from the component and neither can lose to the other on stylesheet order.
const bySizeLg = (variant) => ({
  default: variant === 'tertiary' ? 'lg:text-base' : 'lg:h-11 lg:px-6 lg:py-2.5 lg:text-base',
  small: variant === 'tertiary' ? 'lg:text-sm' : 'lg:h-9 lg:px-5 lg:py-2 lg:text-sm',
});

export default function Button({
  variant = 'primary',
  size = 'default',
  sizeLg,
  pillSm = false,
  href,
  link = false,
  dim = false,
  label,
  className,
  children,
  ...rest
}) {
  // The design strokes buttons INSIDE the box, so a CSS border is wrong: it
  // would add its width to a hug-sized button and push the box 2px wide. An
  // inset shadow paints the same stroke with no layout cost.
  // Radius lives here rather than in the variant strings so a responsive value
  // can win on emit order instead of fighting an appended class.
  const radius = pillSm ? 'rounded-lg lg:rounded-none' : 'rounded-none';
  const filledBase = `inline-flex ${HUG} items-center justify-center gap-2 ${radius} transition-colors ${FOCUS}`;

  const byVariant = {
    primary: `${filledBase} bg-btn-bg text-btn-text shadow-[inset_0_0_0_1px_var(--color-btn-border)] hover:bg-btn-bg-hover`,
    secondary: `${filledBase} bg-btn-secondary text-btn-secondary-text shadow-[inset_0_0_0_0.5px_var(--color-btn-border)] hover:bg-btn-secondary-hover`,
    // Vertical so the rule sits below the label with a 2px gap, as drawn.
    tertiary: `inline-flex ${HUG} flex-col items-start text-btn-tertiary transition-opacity hover:opacity-80 ${FOCUS}`,
  };

  const classes = cx(
    byVariant[variant],
    bySize(variant)[size],
    sizeLg && sizeLg !== size && bySizeLg(variant)[sizeLg],
    // The underline is a real 0.5px rule 2px under the label, not
    // text-decoration.
    variant === 'tertiary' && link && 'pb-0.5 shadow-[inset_0_-0.5px_0_0_var(--color-btn-tertiary)]',
    // The design dims the inactive nav links to 60%, which lands the label at
    // 4.1:1 on the page background -- under the 4.5:1 AA floor for body text.
    // 65% is the nearest step that clears it, at 4.7:1.
    dim && 'opacity-65',
    className,
  );

  const Element = href ? 'a' : 'button';

  return (
    <Element className={classes} href={href} type={href ? undefined : 'button'} {...rest}>
      <span className="inline-flex items-center gap-1">
        {label}
        {children}
      </span>
    </Element>
  );
}
