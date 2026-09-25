import Button from '../Button.jsx';
import ArrowRightUp from '../icons/ArrowRightUp.jsx';
import { cx } from '../../lib/cx.js';
import { LINKS, SECTION_IDS } from '../../config/links.js';
import minerIcon from '../../assets/slice/miner.svg';
import trackedIcon from '../../assets/slice/tracked.svg';
import coinIcon from '../../assets/slice/coin.svg';

const CARDS = [
  {
    icon: minerIcon,
    name: 'Miner',
    title: 'You mine',
    body: 'Your workers submit valid shares to DMND over encrypted Stratum V2.',
    weight: 'font-semibold',
  },
  {
    icon: trackedIcon,
    name: 'Share tracking',
    title: 'Every share is tracked',
    body: 'Each valid share is logged and assigned to your miner profile, verifiable, not a black box.',
    weight: 'font-semibold',
  },
  {
    icon: coinIcon,
    name: 'Payout',
    title: 'Block found, payout calculated',
    body: 'When DMND finds a block, rewards are split by share contribution under SLICE.',
    weight: 'font-medium',
  },
];

export default function Slice() {
  return (
    <section
      id={SECTION_IDS.slice}
      className="relative overflow-hidden bg-bg-default px-6 pt-20 pb-12 lg:px-0 lg:pt-30 lg:pb-16"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 h-px bg-border-default/50 lg:top-30"
      />

      <div className="mx-auto w-full px-3 shadow-[inset_0.5px_0_0_0_var(--color-btn-border),inset_-0.5px_0_0_0_var(--color-btn-border)] lg:max-w-[1200px] lg:px-6 xl:px-0">
        <div className="mx-auto grid w-full gap-[23px] py-12 lg:max-w-[1042px] lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:py-16">
          <div className="flex flex-col gap-1 lg:row-start-1">
            <h2 className="font-heading text-3xl font-medium text-header-alt">
              Slice:<span className="text-body-alt"> Get paid for the block, not just the work</span>
            </h2>
            <p className="w-full max-w-[836px] text-base text-body-alt">
              Purpose-built to guarantee every miner receives their full earnings.
            </p>
          </div>

          <div className="flex flex-col gap-2 lg:col-span-2 lg:row-start-2 lg:flex-row">
            {CARDS.map((c) => (
              <div
                key={c.title}
                className="flex w-full flex-col gap-16 bg-bg-primary p-6 shadow-[inset_0_0_0_0.5px_var(--color-border-default)] lg:h-[236px] lg:flex-1 lg:justify-between lg:gap-0"
              >
                <img className="size-13 shrink-0" src={c.icon} alt={c.name} width="52" height="52" />
                <div className="flex flex-col gap-1">
                  <h3 className={cx('text-lg text-header-default', c.weight)}>{c.title}</h3>
                  <p className="text-sm text-body-alt">{c.body}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="tertiary"
            size="default"
            href={LINKS.sliceDeepDive}
            link
            label="Learn how slice works"
            className="lg:col-start-2 lg:row-start-1 lg:justify-self-end"
          >
            <ArrowRightUp />
          </Button>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-20 h-px bg-border-default/50 lg:bottom-30"
      />
    </section>
  );
}
