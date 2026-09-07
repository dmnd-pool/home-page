import Tag from '../Tag.jsx';

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

// Tailwind scans source statically, so the column count cannot be interpolated --
// `lg:grid-cols-${n}` compiles to nothing and the strip silently collapses to one
// column. The literals have to exist in the file for the scanner to find them.
const COLS = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
};

/**
 * The stats strip.
 *
 * The grid TRANSPOSES between breakpoints. At 1440 it is N columns of
 * value-over-label; at 375 it is N rows of value-beside-label. The mapping is 1:1
 * and in the same order, so one set of cells serves both: each cell is a row on
 * mobile and a column from lg up.
 *
 * THE RULES ARE BORDERS ON THE CELLS, not absolutely-positioned spans. An earlier
 * version drew them as spans at hardcoded fractions -- verticals at n/5, dots at
 * n/5, horizontals at a fixed [76, 152, 228, 304] -- which encoded the cell count
 * and the row height as magic numbers in three separate places. Dropping to four
 * cells left the grid on quarters while the rules stayed on fifths, so every
 * vertical missed its column edge by up to 62px, and the fixed row heights clipped
 * the longer labels. Borders cannot drift from the geometry they are drawn on, so
 * the count is now free to change.
 *
 * Each edge is still painted exactly once: every cell owns its LEFT border, and
 * the grid owns the final right edge. Mobile has no outer border, so the top rule
 * is suppressed on the first cell and the outer verticals never apply.
 *
 * The dots are not floating: each centres on the intersection of a vertical and a
 * horizontal, so each is a child of the cell whose borders form that crossing --
 * at the mid-column vertical on the row's top edge at 375, and at the cell's left
 * edge on the value/label rule from lg. The first cell has neither crossing, which
 * is the same condition at both breakpoints.
 *
 * Heights are minimums rather than fixed. The design's cells held a number and a
 * two-word label and could be pinned to 76/84/72; these hold prose, and cells 3
 * and 4 need 96 and 120 for their labels. Grid and flex stretch settle the rest,
 * so the strip stays flush along the bottom and the value/label rule stays
 * continuous across all columns.
 *
 * The desktop container is 1239 wide, deliberately wider than the page's usual
 * 1200 column, so the section's own side padding is overridden by centring.
 */
export default function Stats() {
  return (
    <section className="overflow-hidden bg-bg-default px-4 py-20 lg:px-6 xl:px-0">
      <div className="mx-auto w-full lg:max-w-[1239px]">
        <div className={`grid grid-cols-1 ${COLS[CELLS.length]} lg:border-r ${RULE}`}>
          {CELLS.map((c, i) => (
            <div
              key={c.label + c.value}
              className={`relative flex ${RULE} ${i > 0 ? 'border-t' : ''} lg:flex-col lg:border-t-0 lg:border-l`}
            >
              {/* value: beside the label on mobile, above it from lg */}
              <div className="flex min-h-[76px] w-1/2 items-start px-2 py-6 lg:min-h-[84px] lg:w-auto lg:p-6">
                <div className="flex items-center gap-1">
                  <span className={VALUE_TYPE}>{c.value}</span>
                  {/* The design sets the separating space one step larger, which
                      overflows this row by 4px; matched to the value instead. */}
                  {c.unit && (
                    <span className="text-sm font-normal text-body-alt lg:text-base lg:font-medium">
                      {' '}
                      {c.unit}
                    </span>
                  )}
                  {c.valueTag && <Tag size="medium" dot={c.valueTag.dot} label={c.valueTag.label} />}
                </div>
              </div>

              {/* label: vertically centred on mobile, top-aligned from lg */}
              <div
                className={`flex min-h-[76px] w-1/2 items-center border-l px-2 py-6 ${RULE} lg:min-h-[72px] lg:w-auto lg:flex-1 lg:items-start lg:border-l-0 lg:border-t lg:p-6`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-sm text-body-alt lg:text-base">{c.label}</span>
                  {c.labelTag && (
                    <Tag size="medium" dot={c.labelTag.dot}>
                      <span className="lg:hidden">{c.labelTag.labelSm}</span>
                      <span className="hidden lg:inline">{c.labelTag.label}</span>
                    </Tag>
                  )}
                </div>
              </div>

              {/* Intersection dot: mid-column on the row rule at 375, cell edge on
                  the value/label rule from lg. The first cell has neither. */}
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
