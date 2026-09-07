import { useRef, useState } from 'react';
import BrowserMock from '../BrowserMock.jsx';
import Button from '../Button.jsx';
import ArrowRightUp from '../icons/ArrowRightUp.jsx';
import { cx } from '../../lib/cx.js';
import { LINKS } from '../../config/links.js';

/**
 * The capabilities section.
 *
 * A rail of five labels beside a panel describing the selected one.
 *
 * THE RAIL IS A TAB LIST, which the design implies but never wired up. Figma
 * draws MEMPOOL with a filled background, a green dot and darker text while the
 * other four sit plain -- a selected state on a five-item list whose items map
 * one-to-one onto five cards. The original build reproduced that literally: the
 * highlight was hardcoded to the first item, the labels did nothing, and all five
 * cards sat in a column you scrolled. Reading it as a tab list keeps every drawn
 * pixel of the selected and unselected states and makes them mean something.
 *
 * Choosing tabs over the scrolling column also buys the copy room. Each
 * capability now carries a real paragraph rather than the single line that fitted
 * when five cards had to share one 484px window.
 *
 * The rail turns: 282 wide down the left side at 1440, 604 wide across the top at
 * 375, where it is its own horizontal scroll region -- the design laid a 604-wide
 * rail inside a 375 frame and let the overflow crop, which left MERGE MINING and
 * BLOCK rendered past the right edge of the phone with no way to reach them.
 *
 * Scrollbars are hidden because the design draws none, and a classic 15px
 * scrollbar would eat into the column and shift the mockup. The regions stay
 * keyboard-operable: the tabs take arrow keys, Home and End with a roving
 * tabindex, and the panel itself is focusable so its overflow can be scrolled.
 *
 * The block is fluid below lg rather than a fixed 604: the section's 16px gutter
 * reproduces the drawn 343 card width at 375 and then lets it grow.
 *
 * THE SECTION IS TALLER THAN DRAWN -- 568 against 504, and 660 against 600. The
 * drawn heights were sized for cards carrying a single line of copy; a paragraph
 * per capability needs 525 at desktop against the 484 the design allows, which
 * would clip the mockup off the bottom of its own panel. The panel is sized to
 * the TALLEST capability rather than to each one, so switching tabs never jumps
 * the page. `overflow-y-auto` stays as a backstop for a future capability with
 * more to say than these five.
 */

/**
 * Copy is lifted verbatim from DMND's own sources rather than written here, so a
 * capability claims exactly what the product documents.
 *
 *   MEMPOOL       written here. The substance is the dmnd-client README, "7.
 *                 Prioritize Transactions (optional)", and the three use cases
 *                 come from sv2-ui's PrioritizeTransactionsPage lede -- but that
 *                 README is operator documentation, and transcribing its RPC and
 *                 fee-delta mechanics put configuration reference in a panel that
 *                 has to sell the capability.
 *   AUDITING      transparency.dmnd.work
 *   SIGNALING     sv2-ui, JobDeclarationPage -- lede and "Why build your own block?"
 *   MERGE MINING  sv2-ui, MergeMiningPage lede
 *   BLOCK         sv2-ui, JobDeclarationPage lede and BuildYourBlockPage
 *
 * The other four are transcribed as written, including the unspaced em dash in
 * MERGE MINING and the missing article in "validates declared job".
 */
const CAPABILITIES = [
    {
    id: 'block',
    rail: 'BLOCK STAMPING',
    title: 'Block stamping',
    body: [
      'Every block your pool mines gets your name on it — visible on mempool.space.',
    ],
    href: LINKS.postFirstBlock,
    tone: 'default',
    highlight: 'side-2',
    mockRight: true,
    mockLeft: 22,
  },
  {
    id: 'mempool',
    rail: 'TX ACCELERATION',
    title: 'Mempool acceleration',
    body: [
      'You build the block, so you pick what goes in it. Move any valid transaction to the front of the queue on your own node.',
      'Turn control of your block template into a service. Favor an eligible transaction in the template your own node builds; for fee recovery, private inclusion, or a paid inclusion workflow.',
    ],
    href: LINKS.postTransactionPriority,
    tone: 'light',
    highlight: 'tile-1',
    mockRight: true,
    mockLeft: 24,
  },
    {
    id: 'merge-mining',
    rail: 'MERGE MINING',
    title: 'Merge mining & side-chain expansion',
    body: [
      'Your Job Declaration setup already puts the coinbase in your hands. Add a Rootstock commitment and earn rBTC to an address you control using the same ASICs and Bitcoin hash rate\u2014without changing your Bitcoin mining path.',
    ],
    href: LINKS.postMergeMining,
    tone: 'default',
    highlight: 'side-1',
    mockRight: false,
    mockLeft: 22,
  },
  {
    id: 'auditing',
    rail: 'AUDITING',
    title: 'Share auditing',
    body: [
      'Inspect finalized PPLNS slices, pool job candidates, and a random share proof built from a snapshot the browser sees before it chooses the sample.',
      "Wire-job sanity checks compare each endpoint's latest Stratum work with an independent chain tip. They do not validate the complete block template.",
    ],
    href: LINKS.transparency,
    tone: 'default',
    highlight: 'tile-2',
    mockRight: false,
    mockLeft: 22,
  },
  {
    id: 'signaling',
    rail: 'SIGNALING',
    title: 'BIPs signaling',
    body: [
      'Choose what your blocks signal through the nVersion field.',
      "It also gives miners control over block signaling and DMND does not edit a miner's declared transaction selection or nVersion bits.",
    ],
    href: LINKS.postBipSignaling,
    tone: 'default',
    highlight: 'tile-3',
    mockRight: true,
    mockLeft: 22,
  },
];

const HAIR = 'var(--color-border-default)';
const CARD_EDGES = `inset 0.5px 0.5px 0 0 ${HAIR}, inset -0.5px -0.5px 0 0 ${HAIR}`;
const NO_SCROLLBAR = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

export default function Mempool() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef([]);
  const active = CAPABILITIES[selected];

  const onKeyDown = (event) => {
    const last = CAPABILITIES.length - 1;
    let next = null;
    // Both axes, because the rail is a row below lg and a column from lg up.
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = selected === last ? 0 : selected + 1;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = selected === 0 ? last : selected - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    if (next === null) return;

    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="relative h-[568px] overflow-hidden bg-bg-default lg:h-[660px]">
      <div className="absolute inset-x-4 top-20 lg:inset-x-0 lg:top-0 lg:mx-auto lg:h-full lg:w-full lg:max-w-[1200px]">
        {/* The rail: a horizontal strip above the panel at 375, a vertical column
            beside it from lg. Only the selected row is filled and boxed. */}
        <div
          className={cx(
            'absolute top-0 left-0 w-full overflow-x-auto lg:top-[120px] lg:w-[282px] lg:overflow-x-visible',
            NO_SCROLLBAR,
          )}
        >
          <div
            role="tablist"
            aria-label="Mining capabilities"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex w-[604px] shadow-[inset_0_0_0_0.5px_var(--color-border-default)] lg:w-full lg:flex-col lg:shadow-none"
          >
            {CAPABILITIES.map((c, i) => {
              const isSelected = i === selected;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${c.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  onClick={() => setSelected(i)}
                  className={cx(
                    'relative flex cursor-pointer items-center px-6 py-6 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-500 lg:h-[72px] lg:w-full lg:py-0',
                    isSelected ? 'bg-bg-primary' : 'hover:bg-bg-primary/60',
                  )}
                  style={{
                    boxShadow: `inset 0.5px 0 0 0 ${HAIR}, inset 0 -0.5px 0 0 ${HAIR}${
                      isSelected ? `, inset 0 0.5px 0 0 ${HAIR}, inset -0.5px 0 0 0 ${HAIR}` : ''
                    }`,
                  }}
                >
                  <span className="flex items-center gap-1">
                    {isSelected && (
                      <span className="size-1.5 shrink-0 rounded-full bg-green-500" aria-hidden="true" />
                    )}
                    <span
                      className={cx(
                        'text-sm whitespace-nowrap lg:text-base',
                        isSelected ? 'text-body-default' : 'text-body-alt',
                      )}
                    >
                      {c.rail}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The panel for whichever capability is selected. */}
        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          tabIndex={0}
          className={cx(
            'absolute top-[68px] left-0 h-[420px] w-full overflow-y-auto lg:top-[120.18px] lg:left-[282px] lg:h-[540px] lg:w-[918px]',
            NO_SCROLLBAR,
          )}
        >
          <div
            className="flex h-full min-h-full flex-col overflow-hidden"
            style={{ boxShadow: CARD_EDGES }}
          >
            <div className="flex flex-col gap-2 px-6 pt-6 pb-4 lg:pt-8">
              <h3 className="font-heading text-xl leading-8 font-medium text-header-alt">
                {active.title}
              </h3>
              {active.body.map((paragraph, i) => (
                <p key={i} className="max-w-[620px] text-sm text-body-alt lg:text-base">
                  {paragraph}
                </p>
              ))}
              {active.href && (
                <Button
                  variant="tertiary"
                  size="small"
                  sizeLg="default"
                  href={active.href}
                  link
                  label="Read more"
                  className="mt-1"
                >
                  <ArrowRightUp />
                </Button>
              )}
            </div>

            {/* The mockup sits at the foot of the panel, flush left or right as
                the design alternates it. */}
            <div
              className={cx(
                'mt-auto flex shrink-0 pb-6 pl-[var(--mock-l)] lg:pb-0 lg:pl-0',
                active.mockRight && 'lg:justify-end',
              )}
              style={{ '--mock-l': `${active.mockLeft}px` }}
            >
              <BrowserMock tone={active.tone} highlight={active.highlight} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
