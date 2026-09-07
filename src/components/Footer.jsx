import Logo from './Logo.jsx';
import Button from './Button.jsx';
import { LINKS } from '../config/links.js';

/**
 * Footer.
 *
 * Desktop is three rows 32px apart inside 120px padding, giving the drawn 368px
 * height, with only the first row horizontally split. Mobile keeps the same three
 * blocks and the same 32px rhythm but splits that first row into two stacked,
 * left-aligned rows 48px apart, inside 80px vertical padding for a 404px height.
 *
 * The mobile column is not pinned to the drawn 343: the section's own 16px gutter
 * produces exactly that width at 375 and then lets the column grow, rather than
 * stranding a phone-width block in the middle of a tablet.
 *
 * The wordmark takes a different grey at each breakpoint because the design draws
 * it that way: #171717 at 375, #374151 at 1440, and #262626 in the nav. Three
 * different greys for one mark, each reproduced as drawn rather than unified. The
 * 375 grey is `header-strong` so it has somewhere to go in dark mode.
 *
 * Copy is verbatim, including the lowercase "pool" and "all rights reserved", and
 * "Linkedin" with a lowercase "in". The links carry no rule under them at either
 * breakpoint -- unlike every other tertiary button on the page, the design gives
 * these no underline node.
 */
const LEGAL = [
  { label: 'Terms of service', href: LINKS.terms },
  { label: 'Privacy policy', href: LINKS.privacy },
];

// Stamped at build time rather than hardcoded, so the notice does not quietly go
// stale on 1 January. The site is statically generated and redeployed on every
// push, so this is the year of the last deploy.
const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-bg-default px-4 py-20 lg:px-6 lg:py-30 xl:px-30">
      <div className="mx-auto flex w-full flex-col gap-8 lg:max-w-[1200px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-center gap-8">
            <a
              href={LINKS.home}
              className="text-header-strong lg:text-header-alt"
              aria-label="DMND home"
            >
              <Logo width={57} height={24} />
            </a>
            <Button variant="tertiary" size="small" href={LINKS.linkedin} label="Linkedin" />
            <Button variant="tertiary" size="small" href={LINKS.x} label="X" />
          </div>

          <div className="flex items-center gap-8">
            {LEGAL.map((l) => (
              <Button key={l.label} variant="tertiary" size="small" href={l.href} label={l.label} />
            ))}
          </div>
        </div>

        {/* A zero-height rule, matching the design's 0-height line with a centred
            0.5px stroke. Browsers round a hairline up to one device pixel when
            painting, so the footer measures ~1px taller than the frame. */}
        <div className="-mb-px h-px w-full bg-border-default/50" />

        <div className="flex flex-col gap-1">
          <p className="text-sm text-header-default">
            &copy; {YEAR} DMND pool. all rights reserved.
          </p>
          <p className="text-xs text-body-alt">
            DMND is a trading name of Guru Protocol Ltd, a company registered in England and Wales
            (Company No. 15235937). Registered office: 85 Great Portland Street, London, England, W1W
            7LT.
          </p>
        </div>
      </div>
    </footer>
  );
}
