import ArrowRightUp from '../icons/ArrowRightUp.jsx';
import { LINKS } from '../../config/links.js';

export default function BlockMilestone() {
  return (
    <section className="bg-bg-default px-4 py-12 lg:px-6 lg:py-16">
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-body-alt uppercase">
          Milestone
        </div>
        <h2 className="font-heading text-2xl font-medium text-header-default lg:text-3xl">
          We mined the first known Bitcoin block using Stratum V2 Job Declaration.
        </h2>
        <a
          href={LINKS.postFirstBlock}
          className="inline-flex items-center gap-1 text-sm font-semibold text-header-default transition-colors hover:text-blue-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Block 955,318
          <ArrowRightUp />
        </a>
      </div>
    </section>
  );
}
