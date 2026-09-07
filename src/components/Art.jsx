import { cx } from '../lib/cx.js';

/**
 * Every picture on the page goes through here.
 *
 * It exists to solve two problems the section markup kept re-creating:
 *
 *  1. WEIGHT. Nothing was going through an image pipeline at all -- every asset
 *     shipped at source resolution as PNG or JPEG. The encoded variants come from
 *     src/lib/art.js now; this component just offers them in the right order.
 *
 *  2. DOUBLE DOWNLOAD. Where the design draws a separate crop below lg, the two
 *     were both in the DOM with `hidden` / `lg:hidden` deciding which showed.
 *     Browsers fetch `display:none` images, so every visitor paid for both --
 *     around 850KB of it on a phone, which is exactly where it hurts. A `media`
 *     query on a <source> picks one before the fetch instead.
 *
 * AVIF is offered first, WebP second where it earns its place, and the original
 * is always the final fallback.
 *
 * @param {object}  props
 * @param {object}  props.src        Desktop crop, or the only crop.
 * @param {object} [props.srcMobile] A separate crop the design draws below lg.
 * @param {string} [props.alt]       Empty for decoration, which is most of these.
 * @param {boolean} [props.adaptive] Invert in dark mode. Right for line art and
 *   flat texture, which were exported with a light background composited in;
 *   wrong for photographs and for the dashboard screenshot, where it would invent
 *   a dark product UI that does not exist.
 */
const DESKTOP = '(min-width: 1024px)';

export default function Art({
  src,
  srcMobile,
  alt = '',
  className,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  adaptive = false,
}) {
  // With no separate mobile crop the desktop one serves every width, so the
  // media query is dropped rather than duplicated.
  const base = srcMobile ?? src;

  return (
    <picture className="contents [&>source]:hidden">
      {srcMobile && (
        <>
          <source media={DESKTOP} type="image/avif" srcSet={src.avif} />
          {src.webp && <source media={DESKTOP} type="image/webp" srcSet={src.webp} />}
          <source media={DESKTOP} srcSet={src.src} />
        </>
      )}
      <source type="image/avif" srcSet={base.avif} />
      {base.webp && <source type="image/webp" srcSet={base.webp} />}
      <img
        src={base.src}
        alt={alt}
        aria-hidden={alt === '' ? 'true' : undefined}
        width={width ?? base.width}
        height={height ?? base.height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={cx(className, adaptive && 'art-adaptive')}
      />
    </picture>
  );
}
