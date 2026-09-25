import { cx } from '../lib/cx.js';

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
