import Button from '../Button.jsx';
import Art from '../Art.jsx';
import ArrowRightUp from '../icons/ArrowRightUp.jsx';
import { efficiencyChevron, securityShield, soc2Badge } from '../../lib/art.js';
import { LINKS } from '../../config/links.js';

/**
 * The efficiency / trust cards.
 *
 * Three cards, not four. At 1440 they are two 596-wide on the top row and one
 * full-width below, with an 8px gap in both directions -- not the 24px grid
 * gutter. At 375 they become one column with a 16px gap, and the ORDER CHANGES:
 * efficiency, then hash-hijack, then SOC 2, where desktop puts SOC 2 second.
 * The DOM is written in the mobile order and a grid re-places the other two from
 * lg up, so nothing is duplicated to move it.
 *
 * All three carry a 0.5px border in the file whose paint is switched off, so no
 * border renders on any of them. Corners are square.
 *
 * Each card aligns its content differently -- top, bottom, and space-between --
 * which is what drives the section's visual rhythm, and that holds at both sizes.
 *
 * The illustrations are absolutely positioned escapees that ignore the cards'
 * padding, so each card is a fixed-size positioning context. Their exported
 * opacity is already baked in, so they render at full opacity. On desktop card A's
 * mark overflows the card bottom and is clipped; at 375 none of the three
 * overflows, and the marks move to the left of the card rather than the right.
 *
 * Heights are the drawn ones but written as minimums: the design fixes them to its
 * own line-wrap, and a minimum lands on the same number while growing rather than
 * clipping if a string ever reflows.
 *
 * The mobile column is not pinned to the drawn 343: the section's own 16px gutter
 * produces exactly that width at 375 and then lets the column grow, rather than
 * stranding a phone-width block in the middle of a tablet. Card B's mark is
 * anchored from the RIGHT edge below lg for the same reason: the design places it
 * at x194 in a 343-wide card, which is its right-hand side, and a left offset
 * would walk it back into the middle of the copy as the card widens.
 */
const HEADING = 'font-heading text-xl leading-8 font-semibold text-header-default';

export default function Efficiency() {
  return (
    <section className="overflow-hidden bg-bg-primary px-4 py-20 lg:px-6 lg:py-30 xl:px-30">
      <div className="mx-auto grid w-full gap-4 lg:max-w-[1200px] lg:grid-cols-2 lg:gap-2">
        {/* Card A: content top-aligned. The mark sits left at 375 and right from
            lg, where it also overflows the card bottom by 16 and is clipped. */}
        <div className="relative min-h-[292px] w-full overflow-hidden bg-bg-default p-6 lg:col-start-1 lg:row-start-1 lg:min-h-60">
          <div className="relative z-10 flex flex-col gap-1 lg:pr-[200px]">
            <h2 className={HEADING}>Up to 10% efficiency gains</h2>
            <p className="text-base text-body-alt">With Stratum V2 block templates.</p>
          </div>
          <Art
            src={efficiencyChevron}
            adaptive
            className="pointer-events-none absolute top-[115px] left-0 h-[160px] w-[160px] max-w-none select-none lg:top-14 lg:right-0 lg:left-auto lg:h-[184px] lg:w-[200px]"
          />
        </div>

        {/* Card B: heading block at the top, button pushed to the bottom. */}
        <div className="relative min-h-[385px] w-full overflow-hidden bg-bg-default p-6 lg:col-span-2 lg:row-start-2 lg:min-h-60">
          <div className="relative z-10 flex h-full flex-col justify-between lg:pr-[214px]">
            <div className="flex flex-col gap-1">
              <h2 className={HEADING}>Zero hash-hijack incidents since launch</h2>
              <p className="text-base text-body-alt">
                Legacy Stratum V1 traffic is plaintext and can be redirected in transit. SV2 encrypts
                the connection end-to-end
              </p>
            </div>
            <Button variant="tertiary" size="default" href={LINKS.security} link label="Learn more">
              <ArrowRightUp />
            </Button>
          </div>
          <Art
            src={securityShield}
            adaptive
            className="pointer-events-none absolute top-[215px] right-[50.73px] h-[120px] w-[98.27px] max-w-none select-none lg:top-[47px] lg:right-[82.5px] lg:h-[160px] lg:w-[131.5px]"
          />
        </div>

        {/* Card C: content bottom-aligned. */}
        <div className="relative min-h-[292px] w-full overflow-hidden bg-bg-default p-6 lg:col-start-2 lg:row-start-1 lg:min-h-60">
          <div className="relative z-10 flex h-full flex-col justify-end gap-2 lg:pr-[142px]">
            <h2 className={HEADING}>SOC 2 Type II certified</h2>
            <Button
              variant="tertiary"
              size="default"
              href={LINKS.trustCenter}
              link
              label="Visit our trust center"
            >
              <ArrowRightUp />
            </Button>
          </div>
          <Art
            src={soc2Badge}
            adaptive
            className="pointer-events-none absolute top-[28px] left-[31px] h-[140px] w-[108.1px] max-w-none select-none lg:top-4 lg:right-5 lg:left-auto lg:h-[158px] lg:w-[122px]"
          />
        </div>
      </div>
    </section>
  );
}
