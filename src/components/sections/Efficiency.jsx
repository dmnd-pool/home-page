import Button from '../Button.jsx';
import Art from '../Art.jsx';
import ArrowRightUp from '../icons/ArrowRightUp.jsx';
import { efficiencyChevron, securityShield, soc2Badge } from '../../lib/art.js';
import { LINKS } from '../../config/links.js';

const HEADING = 'font-heading text-xl leading-8 font-semibold text-header-default';

export default function Efficiency() {
  return (
    <section className="overflow-hidden bg-bg-primary px-4 py-20 lg:px-6 lg:py-30 xl:px-30">
      <div className="mx-auto grid w-full gap-4 lg:max-w-[1200px] lg:grid-cols-2 lg:gap-2">
        <div className="relative min-h-[292px] w-full overflow-hidden bg-bg-default p-6 lg:col-start-1 lg:row-start-1 lg:min-h-60">
          <div className="relative z-10 flex flex-col gap-1 lg:pr-[200px]">
            <h2 className={HEADING}>Up to 10% efficiency gains</h2>
            <p className="text-base text-body-alt">With Stratum V2 block templates.</p>
          </div>
          <Art
            src={efficiencyChevron}
            adaptive
            className="pointer-events-none absolute top-[115px] left-0 h-[160px] w-[160px] max-w-none select-none lg:top-14 lg:right-0 lg:left-auto lg:h-[184px] lg:w-[200px]"
          />
        </div>

        <div className="relative min-h-[385px] w-full overflow-hidden bg-bg-default p-6 lg:col-span-2 lg:row-start-2 lg:min-h-60">
          <div className="relative z-10 flex h-full flex-col justify-between lg:pr-[214px]">
            <div className="flex flex-col gap-1">
              <h2 className={HEADING}>Zero hash-hijack incidents since launch</h2>
              <p className="text-base text-body-alt">
                Legacy Stratum V1 traffic is plaintext and can be redirected in transit. SV2 encrypts
                the connection end-to-end
              </p>
            </div>
          </div>
          <Art
            src={securityShield}
            adaptive
            className="pointer-events-none absolute top-[215px] right-[50.73px] h-[120px] w-[98.27px] max-w-none select-none lg:top-[47px] lg:right-[82.5px] lg:h-[160px] lg:w-[131.5px]"
          />
        </div>

        <div className="relative min-h-[292px] w-full overflow-hidden bg-bg-default p-6 lg:col-start-2 lg:row-start-1 lg:min-h-60">
          <div className="relative z-10 flex h-full flex-col justify-end gap-2 lg:pr-[142px]">
            <h2 className={HEADING}>SOC 2 Type II certified</h2>
            <Button
              variant="tertiary"
              size="default"
              href={LINKS.trustCenter}
              link
              label="Visit our trust center"
            >
              <ArrowRightUp />
            </Button>
          </div>
          <Art
            src={soc2Badge}
            adaptive
            className="pointer-events-none absolute top-[28px] left-[31px] h-[140px] w-[108.1px] max-w-none select-none lg:top-4 lg:right-5 lg:left-auto lg:h-[158px] lg:w-[122px]"
          />
        </div>
      </div>
    </section>
  );
}
