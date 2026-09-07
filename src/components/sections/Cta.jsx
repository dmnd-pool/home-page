import Button from '../Button.jsx';
import Art from '../Art.jsx';
import { ctaTexture, ctaTextureMobile } from '../../lib/art.js';
import { LINKS } from '../../config/links.js';

/**
 * The closing call to action.
 *
 * This and the efficiency block are the only two sections on the primary
 * background, and this is the only one with a visible border on the section
 * itself -- a real hairline on all four sides, at both breakpoints.
 *
 * Figma exports the artwork pre-clipped to the region the section reveals, and
 * bakes its 50% opacity into the pixels, so each crop is placed at its exported
 * size and full opacity. Re-applying an opacity in CSS would halve it twice.
 * The two breakpoints reveal different regions of the same group -- 824x412 to
 * the right at 1440, 375x483 across the bottom at 375 -- so they are genuinely
 * different crops rather than one image scaled.
 *
 * At 375 the section grows to 799 with NO bottom padding: the artwork runs flush
 * to the bottom edge, and the 10px itemSpacing above it is the only gap in the
 * design that actually applies. The mobile crop is drawn at exactly 375x483, which
 * is 1:1 with its own 2x export, so it takes the viewport width with `object-cover`
 * instead: pixel-identical at 375, and still spanning the frame on a tablet rather
 * than leaving a 375-wide texture stranded in the corner.
 *
 * Two values differ between breakpoints and are built as drawn: the headline's
 * second run is #262626 at 375 but #374151 at 1440, and "Join now" keeps the
 * library's radius-32 pill at 375 where desktop squares it.
 */
export default function Cta() {
  return (
    <section className="relative h-[799px] overflow-hidden bg-bg-primary shadow-[inset_0_0_0_0.5px_var(--color-border-default)] lg:h-[412px]">
      <Art
        src={ctaTexture}
        srcMobile={ctaTextureMobile}
        adaptive
        className="pointer-events-none absolute top-[316px] left-0 h-[483px] w-full max-w-none object-cover object-bottom select-none lg:top-0 lg:left-[616px] lg:h-[412px] lg:w-[824px] lg:object-fill"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pt-20 pb-0 lg:py-30 xl:px-0">
        <div className="flex w-full flex-col gap-8 lg:max-w-[500px]">
          <h2 className="font-heading text-3xl font-semibold text-body-alt lg:text-4xl">
            {'Fair payouts. Full control. '}
            <span className="text-body-default lg:text-header-alt">Stratum V2 starts here.</span>
          </h2>
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:flex-wrap lg:items-center">
            <Button
              variant="primary"
              size="small"
              sizeLg="default"
              pillSm
              href={LINKS.startMining}
              label="Join now"
            />
            <Button
              variant="tertiary"
              size="small"
              sizeLg="default"
              href={LINKS.institutions}
              link
              label="Mining at institutional scale? Talk to us"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
