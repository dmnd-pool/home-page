import { Fragment } from 'react';
import Art from '../Art.jsx';
import Check from '../icons/Check.jsx';
import Close from '../icons/Close.jsx';
import { cx } from '../../lib/cx.js';
import { aerialMap } from '../../lib/art.js';

const HEADERS = ['Features', 'DMND', 'Legacy'];

// "|" marks the U+2028 the design bakes in at 375 only; it becomes a break that
// is hidden from lg up, where every one of these sets on a single line.
const ROWS = [
  ['Block |template', "Built on the |miner's own node", 'Built and controlled |by the pool'],
  ['Transaction |security', 'Binary, AEAD/|Noise-encrypted', 'Unencrypted |JSON-RPC'],
  ['Auditability', 'On-chain, verifiable |every share', 'Opaque, pool-run |dashboards'],
  ['Censorship |risk', 'Extremely Low |', 'High'],
];

const MARKS = [
  null,
  { Glyph: Check, tone: 'text-icon-success' },
  { Glyph: Close, tone: 'text-red-500' },
];

const COL_WIDTH = ['w-[85px]', 'w-[138px]', 'w-[126px]'];
const RULE = 'border-border-default/50';

export default function Comparison() {
  return (
    <section className="relative h-[484px] overflow-hidden bg-bg-default lg:h-[665px]">
      <Art
        src={aerialMap}
        adaptive
        className="pointer-events-none absolute top-[-41.34px] left-0 h-[566px] w-[1005.69px] max-w-none select-none lg:inset-0 lg:h-full lg:w-full lg:object-cover"
      />

      <div className="absolute top-1/2 left-1/2 flex w-[357px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-hidden bg-bg-default lg:inset-x-0 lg:mx-auto lg:w-full lg:max-w-[1200px] lg:translate-x-0 lg:gap-8 lg:p-10">
        <h2 className="px-2 font-heading text-3xl text-body-alt lg:px-6 lg:text-4xl">
          <span className="font-normal italic">Why join</span>{' '}
          <span className="font-medium text-header-default">DMND pool</span>
        </h2>

        <div className="relative flex h-[308px] w-[357px] lg:h-[368px] lg:w-[1120px]">
          {[0, 1, 2].map((col) => {
            const mark = MARKS[col];

            return (
              <div key={col} className={cx('flex flex-col', COL_WIDTH[col], 'lg:w-auto lg:flex-1')}>
                <div
                  className={cx(
                    'flex h-[52px] items-center gap-2 px-2 py-4 lg:h-20 lg:p-6',
                    col === 0 && `border-r-[0.5px] ${RULE}`,
                    col === 2 && `border-l-[0.5px] ${RULE}`,
                  )}
                >
                  <span
                    className={cx(
                      'text-sm font-medium lg:font-heading lg:text-xl lg:leading-8',
                      col === 0 ? 'text-body-alt' : 'text-header-default',
                    )}
                  >
                    {HEADERS[col]}
                  </span>
                  {mark && (
                    <span className={cx('shrink-0 lg:order-first', mark.tone)}>
                      <mark.Glyph />
                    </span>
                  )}
                </div>

                {ROWS.map((r, i) => (
                  <div
                    key={r[0]}
                    className={cx(
                      'flex h-16 flex-col justify-center gap-1 px-2 py-4 lg:h-18 lg:p-6',
                      mark && 'lg:flex-row lg:items-center lg:justify-start lg:gap-2',
                      col === 0 && `border-r-[0.5px] ${RULE}`,
                      col === 2 && `border-l-[0.5px] ${RULE}`,
                      i === 0 && `border-t-[0.5px] ${RULE}`,
                      i < 3 && `border-b-[0.5px] ${RULE}`,
                    )}
                  >
                    {mark && (
                      <span className={cx('hidden shrink-0 lg:block', mark.tone)}>
                        <mark.Glyph />
                      </span>
                    )}
                    <span
                      className={cx(
                        'text-xs lg:text-base',
                        col === 0 ? 'text-body-alt' : 'text-body-default',
                      )}
                    >
                      {r[col].split('|').map((part, n) => (
                        <Fragment key={n}>
                          {n > 0 && <br className="lg:hidden" />}
                          {part}
                        </Fragment>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
