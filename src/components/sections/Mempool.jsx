import { useRef, useState } from 'react';
import BrowserMock from '../BrowserMock.jsx';
import Button from '../Button.jsx';
import ArrowRightUp from '../icons/ArrowRightUp.jsx';
import { cx } from '../../lib/cx.js';
import { LINKS } from '../../config/links.js';

const CAPABILITIES = [
  {
    id: 'block',
    rail: 'BLOCK STAMPING',
    title: 'Block stamping',
    body: ['Every block your pool mines gets your name on it — visible on mempool.space.'],
    href: LINKS.postFirstBlock,
    tone: 'default',
    highlight: 'side-2',
    mockRight: true,
    mockOffset: 'pl-[22px]',
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
    mockOffset: 'pl-6',
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
    mockOffset: 'pl-[22px]',
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
    mockOffset: 'pl-[22px]',
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
    mockOffset: 'pl-[22px]',
  },
];

const CARD_EDGES =
  'shadow-[inset_0.5px_0.5px_0_0_var(--color-border-default),inset_-0.5px_-0.5px_0_0_var(--color-border-default)]';
const TAB_EDGES =
  'shadow-[inset_0.5px_0_0_0_var(--color-border-default),inset_0_-0.5px_0_0_var(--color-border-default)]';
const SELECTED_TAB_EDGES =
  'shadow-[inset_0.5px_0_0_0_var(--color-border-default),inset_0_-0.5px_0_0_var(--color-border-default),inset_0_0.5px_0_0_var(--color-border-default),inset_-0.5px_0_0_0_var(--color-border-default)]';
const NO_SCROLLBAR = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

export default function Mempool() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef([]);
  const active = CAPABILITIES[selected];

  const onKeyDown = (event) => {
    const last = CAPABILITIES.length - 1;
    let next = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = selected === last ? 0 : selected + 1;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = selected === 0 ? last : selected - 1;
    }
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
        <div
          className={cx(
            'absolute top-0 left-0 w-full overflow-x-auto lg:top-[120px] lg:w-[282px] lg:overflow-x-visible',
            NO_SCROLLBAR,
          )}
        >
          <div
            role="tablist"
            aria-label="Mining capabilities"
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
                    isSelected ? SELECTED_TAB_EDGES : TAB_EDGES,
                  )}
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
          <div className={cx('flex h-full min-h-full flex-col overflow-hidden', CARD_EDGES)}>
            <div className="flex flex-col gap-2 px-6 pt-6 pb-4 lg:pt-8">
              <h3 className="font-heading text-xl leading-8 font-medium text-header-alt">
                {active.title}
              </h3>
              {active.body.map((paragraph) => (
                <p key={paragraph} className="max-w-[620px] text-sm text-body-alt lg:text-base">
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

            <div
              className={cx(
                'mt-auto flex shrink-0 pb-6 lg:pb-0 lg:pl-0',
                active.mockOffset,
                active.mockRight && 'lg:justify-end',
              )}
            >
              <BrowserMock tone={active.tone} highlight={active.highlight} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
