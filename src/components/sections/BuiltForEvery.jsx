import Button from '../Button.jsx';
import { LINKS } from '../../config/links.js';

export default function BuiltForEvery() {
  return (
    <section className="overflow-hidden bg-bg-default px-4 pt-12 pb-20 lg:px-6 lg:pt-16 lg:pb-30 xl:px-30">
      <div className="mx-auto flex w-full flex-col justify-between gap-6 lg:max-w-[1200px] lg:flex-row lg:gap-10">
        <h2 className="font-heading text-3xl lg:w-[308px] lg:shrink-0 lg:text-5xl">
          <span className="font-normal italic text-body-alt">Built for</span>
          <span className="font-medium text-header-default">
            {' every '}
            <br />
            {'operation.'}
          </span>
        </h2>

        <div className="flex flex-col justify-end gap-6">
          <p className="w-full max-w-[742px] text-base text-body-alt">
            Every metric that matters, exported the way you want. A public API for programmatic
            integration. A broker dashboard for aggregators.
          </p>
          <p className="w-full max-w-[742px] text-base text-body-alt">
            SOC 2 Type II certified infrastructure, FPPS options, and dedicated support, with full
            control of your hashrate. Build your own block templates, verify every payout with
            SLICE, and connect over encrypted Stratum V2. Your node, your rules.
          </p>
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:flex-wrap lg:items-center">
            <Button
              variant="primary"
              size="default"
              href={LINKS.brokerSignup}
              label="Sign up as a Broker"
            />
            <Button
              variant="tertiary"
              size="default"
              href={LINKS.institutions}
              link
              label="Mining at institutional scale? Talk to us"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
