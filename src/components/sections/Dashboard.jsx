import Art from '../Art.jsx';
import { dashboardBackdrop, dashboardScreenshot, dashboardScreenshotMobile } from '../../lib/art.js';

const PREVIEW_ALT =
  'The DMND dashboard showing live hashrate, worker connection details and combined hashrate across subaccounts.';

export default function Dashboard() {
  return (
    <section className="relative h-[345.33px] overflow-hidden bg-bg-default lg:h-[800px]">
      <Art
        src={dashboardBackdrop}
        width={1672}
        height={941}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-scrim lg:block dark:block"
      />

      <div className="absolute top-[129px] left-1/2 w-[323px] -translate-x-1/2 lg:inset-x-0 lg:top-[133px] lg:mx-auto lg:w-full lg:max-w-[1200px] lg:translate-x-0">
        <Art
          src={dashboardScreenshot}
          srcMobile={dashboardScreenshotMobile}
          alt={PREVIEW_ALT}
          width={323}
          height={217}
          className="h-[217px] w-[323px] max-w-none lg:h-[667px] lg:w-[1198.08px]"
        />
      </div>
    </section>
  );
}
