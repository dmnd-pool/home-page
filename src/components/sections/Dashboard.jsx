import Art from '../Art.jsx';
import { dashboardBackdrop, dashboardScreenshot, dashboardScreenshotMobile } from '../../lib/art.js';

/**
 * The product preview.
 *
 * The section paints stacked fills -- a solid base, the halftone artwork scaled to
 * cover, and at 1440 a 35% black scrim -- with the preview card above all of them,
 * so the screenshot keeps its own brightness while the artwork behind it is
 * dimmed. THE SCRIM DOES NOT EXIST AT 375: the mobile frame has two fills, not
 * three, so the photo renders unmuted there.
 *
 * In dark mode the scrim is drawn at both sizes and at a heavier weight. The
 * backdrop is a photograph, so it is the one piece of artwork on the page that
 * cannot simply be inverted; dimming it is what stops the section glowing against
 * the rest of a dark page.
 *
 * Desktop: the card is 1200 wide but its content only 1198.08, leaving a 1.92px
 * gutter on the right where the dimmed artwork shows through, and the content is
 * 686.4 tall against a 667 opening so the last 19.4px fall past the section edge.
 * Mobile drops both wrapper frames, so there is no gutter and the card itself
 * clips its content.
 *
 * Both crops are exported with their clipping already applied, which is why each
 * is placed at its exported size with no wrapper trimming it. The mobile crop is
 * CENTRED rather than pinned to the drawn x26 -- at 375 that is the same 26px, and
 * it keeps the preview composed rather than left-hugging on a tablet. Scaling it
 * instead would stretch a screenshot, which is the one image on the page whose
 * pixels have to stay honest.
 *
 * The card carries a 0.5px bottom stroke in the design that never reaches the
 * screen: the frame paints its stroke before its children, and the overflowing
 * content covers that edge. Nothing is drawn for it here.
 */
const PREVIEW_ALT =
  'The DMND dashboard showing live hashrate, worker connection details and combined hashrate across subaccounts.';

export default function Dashboard() {
  return (
    <section className="relative h-[345.33px] overflow-hidden bg-bg-default lg:h-[800px]">
      <Art
        src={dashboardBackdrop}
        width={1672}
        height={941}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-scrim lg:block dark:block"
      />

      <div className="absolute top-[129px] left-1/2 w-[323px] -translate-x-1/2 lg:inset-x-0 lg:top-[133px] lg:mx-auto lg:w-full lg:max-w-[1200px] lg:translate-x-0">
        <Art
          src={dashboardScreenshot}
          srcMobile={dashboardScreenshotMobile}
          alt={PREVIEW_ALT}
          width={323}
          height={217}
          className="h-[217px] w-[323px] max-w-none lg:h-[667px] lg:w-[1198.08px]"
        />
      </div>
    </section>
  );
}
