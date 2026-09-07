import Minus from '../icons/Minus.jsx';
import Plus from '../icons/Plus.jsx';
import { cx } from '../../lib/cx.js';

/**
 * Frequently asked questions.
 *
 * Two full-bleed rules bracket the section. The accordion grid is drawn with
 * per-side row borders rather than divider components: only rows 2-5 carry a top
 * rule, and the list's own left rule comes from the outer frame.
 *
 * Row 1 is drawn expanded, on the primary background with a minus glyph; the rest
 * are collapsed on the default background with a plus. Built as <details> so it
 * works without JavaScript.
 *
 * The first answer's copy ends in a non-breaking space and contains an em dash;
 * both are reproduced verbatim.
 *
 * ONLY THE FIRST ANSWER EXISTS IN THE DESIGN. The other four rows were drawn
 * collapsed with nothing behind them, which shipped as four questions that open
 * onto an empty box. The copy below is written from claims already made elsewhere
 * on this page -- the 1% fee and 13.74 EH/s in the stats strip, SLICE and share
 * logging in the payouts section, the SV1 translation layer in the block-choice
 * section, RSK rewards in the capability cards, "institutional fleets to sovereign
 * solo miners" in the intro -- and states nothing that is not claimed there.
 * It still needs a sign-off from whoever owns the product copy.
 *
 * At 375 the heading moves INSIDE the bordered box, sitting above the rows with
 * no gap, and the box is drawn 800 tall holding only ~736 of content. The leftover
 * slack is deliberate: the closing rule sits at the bottom of the 800, so hugging
 * the content would lift it. The vertical rails therefore run past the last row,
 * which is why they live on the box rather than on the rows. It is a MINIMUM
 * height rather than a fixed one -- the drawn 800 with every row closed, but free
 * to grow now that opening a row reveals something.
 *
 * The mobile heading carries the same scale-down artifact as the hero and the
 * built-for-every heading -- one space left at 36/48 inside an otherwise 30/40
 * node. Every run is built at the section's base size, which is 10px shorter than
 * the drawn box.
 */
const ITEMS = [
  {
    q: 'Can my current machines connect?',
    a: "Yes. Standard SV1 firmware connects through DMND's translation layer — no firmware changes required. Native SV2 firmware unlocks the full feature set. ",
    open: true,
  },
  {
    q: 'Do I need to run a node?',
    a: 'Only to build your own block templates. Job declaration runs against your node, which is what moves template choice from the pool to you. Without one you still connect over encrypted Stratum V2 and are still paid under SLICE.',
    open: false,
  },
  {
    q: 'How do payouts work?',
    a: 'Under SLICE. Every valid share is logged and assigned to your miner profile, and when DMND finds a block the reward is split by share contribution — verifiable on-chain rather than asserted by a dashboard. FPPS is available if you would rather take a fixed payout per share.',
    open: false,
  },
  {
    q: 'Is there a minimum hashrate?',
    a: 'Yes',
    open: false,
  },
];

export default function Faq() {
  return (
    <section className="relative overflow-hidden bg-bg-default py-20 lg:py-30">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 h-px bg-border-default/50 lg:top-30"
      />

      <div className="mx-auto w-full max-w-[1204px] px-6 xl:px-0">
        <div className="flex min-h-[800px] flex-col shadow-[inset_0.5px_0_0_0_var(--color-btn-border),inset_-0.5px_0_0_0_var(--color-btn-border)] lg:min-h-0 lg:flex-row lg:shadow-none">
          <h2 className="w-full self-start p-8 font-heading text-3xl text-body-alt lg:w-[384px] lg:shrink-0 lg:p-0 lg:text-4xl">
            {'Frequently '}
            <br />
            <span className="font-semibold text-header-alt">asked questions</span>
          </h2>

          <div className="w-full shadow-[inset_0.5px_0_0_0_var(--color-border-default),inset_-0.5px_0_0_0_var(--color-border-default)] lg:w-[820px] lg:shadow-[inset_0.5px_0_0_0_var(--color-border-default)]">
            {ITEMS.map((item, i) => (
              <details
                key={item.q}
                open={item.open}
                className={cx(
                  'group p-6 lg:p-8',
                  item.open ? 'bg-bg-primary' : 'bg-bg-default',
                  i > 0 && 'shadow-[inset_0_0.5px_0_0_var(--color-border-default)]',
                )}
              >
                <summary className="flex min-h-8 cursor-pointer list-none items-start justify-between gap-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
                  <span className="text-lg leading-7 font-semibold text-body-default">{item.q}</span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-btn-secondary text-btn-secondary-icon">
                    <span className="group-open:hidden">
                      <Plus />
                    </span>
                    <span className="hidden group-open:block">
                      <Minus />
                    </span>
                  </span>
                </summary>
                {/* The answer shares the question's column rather than the row's
                    full width: the design puts both in one stack beside the icon.
                    That is held as a 56px right inset -- the 32px glyph plus its
                    24px gap -- rather than the drawn fixed 247, which was measured
                    against the one answer that existed and would strand the other
                    four. */}
                <p className="mt-0 pr-14 text-base text-body-alt lg:-mt-1 lg:max-w-[724px] lg:pr-0">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-20 h-px bg-border-default/50 lg:bottom-30"
      />
    </section>
  );
}
