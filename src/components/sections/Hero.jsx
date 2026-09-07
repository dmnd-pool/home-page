import Button from '../Button.jsx';
import Art from '../Art.jsx';
import ArrowRightUp from '../icons/ArrowRightUp.jsx';
import { heroWarehouse, heroWarehouseMobile } from '../../lib/art.js';
import { LINKS } from '../../config/links.js';

/**
 * Hero. The design draws a 1440x800 frame whose first child is the nav, so this
 * section covers the remaining 716 and every offset below is measured from the
 * nav's baseline rather than the frame's.
 *
 * The geometry here is the design's, restored from the original implementation in
 * commit a9f5586. Two columns, not a stack: a 693-wide left column holding the tag
 * and headline, and a 483-wide right column holding the body copy and the button
 * row, separated by a 24px gap.
 *
 * Three things depart from the design on purpose, and all three trace back to one
 * fact: the writeup is not the design's copy, and it is much longer -- seven lines
 * against the two the frame was set with.
 *
 * The block sits 64 below the nav rather than the 120 the design draws, and the
 * columns are TOP-aligned rather than bottom-aligned. The design can bottom-align
 * because its two columns come out nearly the same height; at seven lines the copy
 * column is 212 tall against the headline column's 132, so bottom-aligning shoved
 * the headline 180 below the nav while the copy started at 64. Top-aligning starts
 * both columns together and keeps the whole block tight to the nav.
 *
 * This section switches at xl rather than lg because its two-column layout needs
 * the wider frame; the lg rules restore the intermediate single-column behaviour,
 * where the section grows to fit and reserves the artwork's 323 as bottom padding.
 *
 * The artwork is exported pre-clipped to the band the frame actually reveals, with
 * its 50% group opacity already baked in, so it is placed at full opacity. The two
 * breakpoints reveal DIFFERENT fractions of the same group -- the top 52.8% at
 * 1440 against 74.6% at 375 -- so the desktop file is missing pixels mobile needs
 * and each gets its own crop. Both sit flush to the bottom edge.
 *
 * The crops are exported with a light background composited in, which is why they
 * are `adaptive`: the class inverts them in dark mode rather than shipping a
 * second pair of files.
 *
 * At 375 the content is a single 347-wide column -- an unusual 14px gutter, but
 * that is what centring a fixed 347 in 375 gives -- and the headline drops to the
 * 36/48 ramp while the badge keeps its pill at 12/16.
 *
 * The headline is one text node in two styled runs, a muted lead and a darker
 * payoff. Each run is a string literal so JSX cannot quietly trim the spaces that
 * hold the two runs apart.
 */
export default function Hero() {
  return (
    <section className="relative h-[716px] overflow-hidden bg-bg-default lg:h-auto lg:min-h-[716px] lg:pb-[323px] xl:h-[716px] xl:pb-0 mt-10">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-[14px] pt-16 lg:px-6 xl:absolute xl:inset-x-0 xl:top-16 xl:flex-row xl:items-start xl:px-0 xl:pt-0">
        <div className="flex w-full flex-col gap-2 xl:w-[693px] xl:shrink-0">
          <h1 className="font-heading text-4xl tracking-normal lg:text-5xl">
            <span className="font-medium text-header-alt">You choose<br /></span><span
              className="font-normal text-body-alt"
            > the blocks you mine.<br className="hidden lg:inline " /> <span className="font-medium text-header-alt">Not the pool.</span></span>
          </h1>
        </div>

        <div className="flex flex-1 flex-col gap-6 xl:items-end">
          <p className="w-full text-base text-body-alt xl:w-[483px] xl:text-right">
            Mine with a pool without giving the pool control of your block. Your Bitcoin node
            builds the template; DMND validates declared job, accounts for shares, and pays you
            for pooled mining.
          </p>
          {/* Wraps because the second label is long: at 375 the pair is wider
              than the 347 column, and without this the row would push the button
              past the gutter rather than dropping it to its own line. */}
          <div className="flex flex-wrap items-center gap-2 xl:justify-end">
            <Button variant="primary" size="default" href={LINKS.startMining} label="Start mining" />
            {/* The claim the headline rests on, with the height to check it
                against. Secondary so it reads as evidence beside the primary
                action rather than as a second thing being asked of the reader.

                The height is muted so the claim leads and the proof follows, but
                in `btn-secondary-icon` rather than `body-alt`: body-alt is #737373,
                which lands at 4.31:1 on this button's #f3f4f6 and misses the 4.5
                AA floor for normal text. */}
            <Button
              variant="secondary"
              size="default"
              href={LINKS.postFirstBlock}
              label="We mined first SV2 block"
            >
              <span className="text-btn-secondary-icon">955,318</span>
              <ArrowRightUp />
            </Button>
          </div>
        </div>
      </div>

      {/* The one image above the fold, so it loads eagerly and at high priority
          rather than queueing behind the rest of the page. */}
      <Art
        src={heroWarehouse}
        srcMobile={heroWarehouseMobile}
        adaptive
        loading="eager"
        fetchPriority="high"
        className="pointer-events-none absolute bottom-0 left-0 h-[228px] w-[375px] max-w-none select-none lg:h-[323px] lg:w-[1030.785px]"
      />
    </section>
  );
}
