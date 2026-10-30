import Minus from '../icons/Minus.jsx';
import Plus from '../icons/Plus.jsx';
import { cx } from '../../lib/cx.js';

const ITEMS = [
  {
    q: 'Can my current machines connect?',
    a: "Yes. Standard SV1 firmware works with DMND's client — no firmware changes required. ",
    open: true,
  },
  {
    q: 'Can I build my own block templates?',
    a: 'Yes, with the self-hosted DMND client (https://github.com/dmnd-pool/dmnd-client) and your own Bitcoin node. This is PPLNS only.',
    open: false,
  },
  {
    q: 'How do payouts work?',
    a: 'Under PPLNS Payouts happen when a block is found. You can\'t know in advance exactly what each share will pay, but DMND provides a projection, and the system is designed so miners always get their fair share, including fees. The cumulative PPLNS view is at https://new-platform.dmnd.work/pplns-projection and shows date, hashrate and sats generated per day. More background: https://blog.dmnd.work/understanding-slice-pplns-jd/. FPPS is available if you prefer that.',
    open: false,
  },
  {
    q: 'Do I need a patched Bitcoin Core?',
    a: 'No. As of Bitcoin Core v30, the official node supports SV2 template providing. A pruned node is fine.',
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
