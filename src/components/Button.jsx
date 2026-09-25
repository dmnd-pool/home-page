import { cx } from '../lib/cx.js';

const FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500';

const HUG = 'w-fit';

const bySize = (variant) => ({
  default: variant === 'tertiary' ? 'text-base' : 'h-11 px-6 py-2.5 text-base',
  small: variant === 'tertiary' ? 'text-sm' : 'h-9 px-5 py-2 text-sm',
});

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
  // Inset shadows preserve the design's inside strokes without changing dimensions.
  const radius = pillSm ? 'rounded-lg lg:rounded-none' : 'rounded-none';
  const filledBase = `inline-flex ${HUG} items-center justify-center gap-2 ${radius} transition-colors ${FOCUS}`;

  const byVariant = {
    primary: `${filledBase} bg-btn-bg text-btn-text shadow-[inset_0_0_0_1px_var(--color-btn-border)] hover:bg-btn-bg-hover`,
    secondary: `${filledBase} bg-btn-secondary text-btn-secondary-text shadow-[inset_0_0_0_0.5px_var(--color-btn-border)] hover:bg-btn-secondary-hover`,
    tertiary: `inline-flex ${HUG} flex-col items-start text-btn-tertiary transition-opacity hover:opacity-80 ${FOCUS}`,
  };

  const classes = cx(
    byVariant[variant],
    bySize(variant)[size],
    sizeLg && sizeLg !== size && bySizeLg(variant)[sizeLg],
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
