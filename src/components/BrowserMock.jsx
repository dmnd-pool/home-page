import { cx } from '../lib/cx.js';

const SIDE_BARS = ['w-[97px]', 'w-[60px]', 'w-[81px]'];

export default function BrowserMock({ highlight, tone, className }) {
  const bar = tone === 'light' ? 'bg-bg-primary' : 'bg-bg-secondary';
  const at = (id) => (highlight === id ? 'bg-bg-info' : bar);

  return (
    <div
      className={cx(
        'h-[148px] w-[300px] max-lg:overflow-hidden lg:h-[296px] lg:w-[600px]',
        className,
      )}
    >
      <div className="flex h-[296px] w-[600px] flex-col bg-bg-default max-lg:origin-top-left max-lg:scale-50">
        <div className="flex h-5 shrink-0 flex-col border-hairline border-border-default px-2.5 py-2">
          <div className="flex h-1 gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1 shrink-0 rounded-full bg-text-disabled"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        <div className="flex h-[276px]">
          <div className="w-[117px] shrink-0 border-x-[0.5px] border-b-[0.5px] border-border-default">
            <div className="mt-4 ml-2.5 flex w-[97px] flex-col gap-2">
              {SIDE_BARS.map((width, i) => (
                <span
                  key={width}
                  className={cx('block h-2', width, at(`side-${i + 1}`))}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 border-r-[0.5px] border-b-[0.5px] border-border-default">
            <div className="mt-4 ml-4 flex w-[450px] flex-col gap-3">
              <span className={cx('block h-2 w-[209px]', bar)} />
              <div className="flex h-20 gap-1">
                {[1, 2, 3].map((i) => (
                  <span key={i} className={cx('block h-20 flex-1', at(`tile-${i}`))} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
