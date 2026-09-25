const CELLS = [
  { value: 'Choose your transactions', label: 'Build the mempool selection you want. No more accepting whatever the pool decides to include.' },
  {
    value: 'Keep the fees',
    label: 'The coinbase is yours, not the pool\'s. Fees other pools leave on the table go straight to you.',
  },
  { value: 'Signal your BIPs', label: 'Your hashpower votes on the soft-forks that shape Bitcoin\'s future fee markets. Not the pool. Not by default.' },
  { value: 'Merge-mine for rBTC', label: 'Same hashpower, rBTC on top. Because you build the block, the Rootstock merge-mining rewards land at your address — not the pool\'s.' },
];

const VALUE_TYPE =
  'text-lg font-bold text-header-default lg:font-heading lg:text-2xl lg:font-semibold lg:tracking-tight';

const RULE = 'border-border-default/50';

export default function Stats() {
  return (
    <section className="overflow-hidden bg-bg-default px-4 py-20 lg:px-6 xl:px-0">
      <div className="mx-auto w-full lg:max-w-[1239px]">
        <div className={`grid grid-cols-1 lg:grid-cols-4 lg:border-r ${RULE}`}>
          {CELLS.map((c, i) => (
            <div
              key={c.label + c.value}
              className={`relative flex ${RULE} ${i > 0 ? 'border-t' : ''} lg:flex-col lg:border-t-0 lg:border-l`}
            >
              <div className="flex min-h-[76px] w-1/2 items-start px-2 py-6 lg:min-h-[84px] lg:w-auto lg:p-6">
                <span className={VALUE_TYPE}>{c.value}</span>
              </div>

              <div
                className={`flex min-h-[76px] w-1/2 items-center border-l px-2 py-6 ${RULE} lg:min-h-[72px] lg:w-auto lg:flex-1 lg:items-start lg:border-l-0 lg:border-t lg:p-6`}
              >
                <span className="text-sm text-body-alt lg:text-base">{c.label}</span>
              </div>

              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-icon-alt lg:top-[84px] lg:left-0"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
